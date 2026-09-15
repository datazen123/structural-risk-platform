// Bootstrap and the fixed-step loop.
// Rendering runs at whatever the device manages; the sim always advances in
// fixed DT increments, so the physics and the telemetry are frame-rate
// independent and the run replays exactly from its input stream (ADR-002).
import { Level } from './level.js';
import { Sim, DT } from './sim.js';
import { Input } from './input.js';
import { View } from './render.js';
import { Tap } from './tele.js';

const $ = (id) => document.getElementById(id);

// iOS overlays its toolbars on top of a position:fixed inset:0 box, so anything
// anchored to the bottom - the thumbsticks especially - lands underneath the tab
// bar and is simply not there for the player. Drive the HUD box from
// visualViewport, which reports the area actually visible.
(function fitViewport() {
  const vv = window.visualViewport;
  const app = document.getElementById('app');
  const sync = () => {
    // Prefer the visual viewport; fall back to innerHeight. Never rely on % of
    // an ancestor, because inside an iframe that ancestor may be the expanded
    // document rather than the screen.
    const h = Math.round(vv ? vv.height : innerHeight);
    const w = Math.round(vv ? vv.width : innerWidth);
    if (h > 0) { app.style.height = h + 'px'; app.style.width = w + 'px'; }
    if (typeof onViewport === 'function') onViewport();
  };
  sync();
  if (vv) { vv.addEventListener('resize', sync); vv.addEventListener('scroll', sync); }
  addEventListener('resize', sync);
  addEventListener('orientationchange', () => setTimeout(sync, 250));
  addEventListener('load', sync);
})();
const cv = /** @type {HTMLCanvasElement} */ ($('cv'));
const view = new View(cv);
const input = new Input($('stage'));

let L, sim, tap, acc = 0, prev = 0, raf = 0, running = false;
let frames = 0, fpsT = 0, fps = 0;

function start(seed) {
  L = new Level(seed >>> 0);
  sim = new Sim(L);
  tap = new Tap(L.seed);
  acc = 0; prev = performance.now(); running = true;
  $('over').hidden = true;
  $('seed').textContent = '#' + L.seed.toString(16).padStart(6, '0').slice(-6);
  view.reveal(L, sim);
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(loop);
}

function loop(now) {
  raf = requestAnimationFrame(loop);
  let dt = (now - prev) / 1000;
  prev = now;
  if (dt > 0.25) dt = 0.25;          // tab was backgrounded; do not fast-forward
  frames++;
  if (now - fpsT > 500) { fps = Math.round(frames * 1000 / (now - fpsT)); frames = 0; fpsT = now; }

  if (running) {
    acc += dt;
    let steps = 0;
    while (acc >= DT && steps < 8) {
      const u = input.read();
      tap.push(u);
      sim.step(u);
      view.reveal(L, sim);
      acc -= DT; steps++;
      if (sim.over) { running = false; finish(); break; }
    }
  }
  view.draw(L, sim);
  hud();
}

function traverseDir() {
  const z = Math.floor(sim.p.z);
  const next = L.survivors.find(v => !v.found);
  if (next) {
    const dz = Math.floor(next.z) - z;
    if (dz !== 0) return dz > 0 ? 1 : -1;
  }
  if (sim.canDown && !sim.canUp) return -1;
  if (sim.canUp && !sim.canDown) return 1;
  return 1;
}

function task() {
  const t = $('task'), tt = $('taskt'), ts = $('tasks');
  const z = Math.floor(sim.p.z);
  const next = L.survivors.find(v => !v.found);
  t.className = '';
  if (!next) {
    const d = Math.hypot(sim.p.x - L.entry.x, sim.p.y - L.entry.y).toFixed(0);
    t.className = 'done';
    tt.textContent = 'All found — get out';
    ts.textContent = `Fly back to the dashed blue square. ${d} cells away.`;
    return;
  }
  const dz = Math.floor(next.z) - z;
  const dh = Math.hypot(next.x - sim.p.x, next.y - sim.p.y);
  if (dz === 0) {
    tt.textContent = dh < 6 ? 'Survivor on this floor — very close' : 'Survivor on this floor';
    ts.textContent = `Fly onto the solid green dot. ${dh.toFixed(0)} cells away.`;
  } else {
    const dir = dz > 0 ? 'up' : 'down';
    const open = dz > 0 ? sim.canUp : sim.canDown;
    t.className = open ? '' : 'warn';
    tt.textContent = `Survivor ${Math.abs(dz)} floor${Math.abs(dz) > 1 ? 's' : ''} ${dir}`;
    ts.textContent = open
      ? `Press SPACE to go ${dir} — you can do it from right here.`
      : `No opening here. Fly to a pulsing blue dot, then press SPACE.`;
  }
}

function floors() {
  const z = Math.floor(sim.p.z);
  let html = '';
  for (let i = 0; i < L.D; i++) {
    const on = L.survivors.filter(v => Math.floor(v.z) === i);
    const found = on.filter(v => v.found).length;
    const mark = on.length
      ? `<span class="m ${found === on.length ? 'ok' : 'sv'}">${'●'.repeat(found)}${'○'.repeat(on.length - found)}</span>`
      : '<span class="m"></span>';
    html += `<div class="fl${i === z ? ' here' : ''}"><span class="n">L${i + 1}</span>${mark}</div>`;
  }
  $('floors').innerHTML = html;
}

const STICK = 96, KNOB_R = 30;   // base diameter, knob travel

/** Draw the two thumbsticks where the thumbs actually are. */
function drawSticks() {
  const s = input.sticks();
  for (const [side, el] of [['l', $('stickL')], ['r', $('stickR')]]) {
    const t = s[side];
    const knob = el.querySelector('.knob');
    if (!t) {
      el.classList.remove('on');
      el.style.left = el.style.top = el.style.right = el.style.bottom = '';
      knob.style.transform = 'translate(0,0)';
      continue;
    }
    el.classList.add('on');
    // float to the thumb
    el.style.left = (t.ox - STICK / 2) + 'px';
    el.style.top = (t.oy - STICK / 2) + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    // knob follows, clamped to the ring; the left stick turns only, so its
    // knob never leaves the horizontal axis - the control shows its own limits
    let dx = t.x - t.ox, dy = side === 'l' ? 0 : t.y - t.oy;
    const d = Math.hypot(dx, dy);
    if (d > KNOB_R) { dx *= KNOB_R / d; dy *= KNOB_R / d; }
    knob.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`;
  }
}

function hud() {
  task(); floors(); drawSticks();
  input.traverseDir = traverseDir();
  const dir = input.traverseDir;
  const open = dir > 0 ? sim.canUp : sim.canDown;
  const fb = $('fbtn');
  fb.hidden = !!sim.over;
  fb.className = sim.tr ? 'go' : (open ? '' : 'off');
  $('fbtnA').textContent = dir > 0 ? '▲' : '▼';
  $('fbtnL').textContent = open ? (dir > 0 ? 'UP' : 'DOWN') : 'NO GAP';
  const pct = Math.max(0, sim.battery / 95);
  $('bat').style.width = (pct * 100).toFixed(1) + '%';
  $('bat').style.background = pct < 0.25 ? 'var(--warn)' : 'var(--accent)';
  $('batn').textContent = Math.max(0, sim.battery).toFixed(0) + 's';
  $('found').textContent = sim.found + '/' + L.survivors.length;
  $('depth').textContent = 'L' + (Math.floor(sim.p.z) + 1) + '/' + L.D;
  $('spd').textContent = Math.hypot(sim.v.x, sim.v.y).toFixed(1);
  $('hits').textContent = String(sim.hits);
  $('fps').textContent = fps + 'fps';
  $('bytes').textContent = (tap.bytes() / 1024).toFixed(1) + 'KB';
}

function finish() {
  const s = tap.summary(sim);
  const win = sim.over === 'extracted';
  $('otitle').textContent = win ? 'Extracted' : 'Battery flat';
  $('osub').textContent = win
    ? `All ${L.survivors.length} found and returned to the entry point.`
    : `${sim.found} of ${L.survivors.length} found. You need to be back at the entry marker before the battery dies.`;
  $('ostats').innerHTML = [
    ['Time', s.seconds + 's'], ['Found', `${s.found}/${L.survivors.length}`],
    ['Path', s.pathLen + ' cells'], ['Contacts', String(s.hits)],
    ['Impact', s.impact.toFixed(1)], ['Telemetry', (s.wireBytes / 1024).toFixed(2) + ' KB']
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('ojson').textContent = JSON.stringify(s, null, 1);
  $('over').hidden = false;
  try { localStorage.setItem('fr.last', JSON.stringify(s)); } catch (e) {}
}

const fb = $('fbtn');
const hold = (v) => (e) => { e.preventDefault(); input.buttonHeld = v; };
fb.addEventListener('pointerdown', hold(true));
addEventListener('pointerup', hold(false));
addEventListener('pointercancel', hold(false));

$('again').addEventListener('click', () => start((Math.random() * 0xffffff) | 0));
$('retry').addEventListener('click', () => start(L.seed));
$('begin').addEventListener('click', () => { $('intro').hidden = true; start((Math.random() * 0xffffff) | 0); });
addEventListener('keydown', e => {
  if (e.key === 'r' && !running) start(L.seed);
  if (e.key === 'Enter' && !$('intro').hidden) { $('intro').hidden = true; start((Math.random() * 0xffffff) | 0); }
});

// Test hooks. The browser suite in test/dom.test.js drives these to verify the
// controls actually move the drone, which is the one thing static inspection of
// the DOM cannot establish.
window.__input = input;
window.__hud = hud;
window.__sim = () => sim;
window.__level = () => L;

// Draw one frame behind the intro so the first thing anyone sees is the game.
start((Math.random() * 0xffffff) | 0);
running = false;

if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
