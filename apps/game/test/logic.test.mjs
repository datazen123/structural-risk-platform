// Pure-logic tests. No DOM, no browser: these cover the parts of the game that
// must be correct regardless of how it is rendered.
//   node --test apps/game/test/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Level } from '../src/level.js';
import { Sim, DT } from '../src/sim.js';
import { Tap } from '../src/tele.js';

const seeds = (n) => Array.from({ length: n }, (_, i) => (i + 1) * 7919);
const idle = { thrust: 0, strafe: 0, lift: 0, yaw: 0 };

// ---------------------------------------------------------------- level gen
test('every level places exactly three survivors', () => {
  for (const s of seeds(200)) {
    const L = new Level(s);
    assert.equal(L.survivors.length, 3, `seed ${s} produced ${L.survivors.length}`);
  }
});

test('every survivor sits in a voxel reachable from the entry', () => {
  for (const s of seeds(200)) {
    const L = new Level(s);
    for (const v of L.survivors) {
      const i = L.idx(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
      assert.ok(L.reachable[i], `seed ${s}: survivor at ${v.x},${v.y},${v.z} is walled off`);
    }
  }
});

test('the entry voxel is never solid', () => {
  for (const s of seeds(200)) {
    const L = new Level(s);
    assert.ok(!L.solidAt(L.entry.x, L.entry.y, L.entry.z), `seed ${s} spawns inside rubble`);
  }
});

test('no floor pair is ever sealed off from the one above it', () => {
  for (const s of seeds(60)) {
    const L = new Level(s);
    for (let z = 0; z < L.D - 1; z++) {
      let n = 0;
      for (let y = 0; y < L.H; y++)
        for (let x = 0; x < L.W; x++)
          if (!L.get(x, y, z) && !L.get(x, y, z + 1) && L.reachable[L.idx(x, y, z)]) n++;
      assert.ok(n > 0, `seed ${s}: no way from floor ${z} to ${z + 1}`);
    }
  }
});

test('level generation is deterministic from its seed', () => {
  const a = new Level(4242), b = new Level(4242);
  assert.deepEqual([...a.cells], [...b.cells]);
  assert.deepEqual(a.survivors, b.survivors);
  assert.deepEqual(a.entry, b.entry);
});

// ---------------------------------------------------------------- sim
test('identical inputs replay to an identical end state', () => {
  const run = () => {
    const s = new Sim(new Level(777));
    let r = 777;
    const nx = () => { r = (r * 1664525 + 1013904223) >>> 0; return r / 4294967296 * 2 - 1; };
    for (let i = 0; i < 2000; i++)
      s.step({ thrust: nx(), strafe: nx(), lift: i % 150 === 0 ? 1 : 0, yaw: nx() });
    return s;
  };
  const a = run(), b = run();
  assert.deepEqual(a.p, b.p);
  assert.equal(a.hits, b.hits);
  assert.equal(a.dist, b.dist);
});

test('a drone given no input does not drift', () => {
  const L = new Level(999), s = new Sim(L);
  for (let i = 0; i < 600; i++) s.step(idle);
  assert.ok(Math.hypot(s.p.x - L.entry.x, s.p.y - L.entry.y) < 1e-9);
});

test('battery drains in real time and ends the run at zero', () => {
  const s = new Sim(new Level(999));
  for (let i = 0; i < 600; i++) s.step(idle);
  assert.ok(Math.abs(s.battery - 85) < 1e-6, `battery was ${s.battery}`);
  while (!s.over) s.step(idle);
  assert.equal(s.over, 'flat');
});

test('a survivor on the same floor is picked up; one a floor away is not', () => {
  const L = new Level(4242), s = new Sim(L);
  const v = L.survivors[0];
  s.p = { x: v.x, y: v.y, z: v.z };
  s.step(idle);
  assert.equal(s.found, 1, 'same-floor pickup failed');

  const L2 = new Level(4242), s2 = new Sim(L2);
  const w = L2.survivors.find(k => Math.floor(k.z) > 0);
  s2.p = { x: w.x, y: w.y, z: w.z - 1 };
  s2.step(idle);
  assert.equal(s2.found, 0, 'picked up a survivor through a floor');
});

test('one tick of vertical input completes a whole floor change on its own', () => {
  const L = new Level(4242), s = new Sim(L);
  let started = false;
  outer:
  for (let y = 0; y < L.H; y++) for (let x = 0; x < L.W; x++) {
    if (L.get(x, y, 0) || L.get(x, y, 1) || !L.reachable[L.idx(x, y, 0)]) continue;
    s.p = { x: x + 0.5, y: y + 0.5, z: 0.5 }; s.v = { x: 0, y: 0, z: 0 }; s.tr = null;
    s.step(idle);
    if (!s.canUp) continue;
    s.step({ ...idle, lift: 1 });          // one tick only
    let t = 1;
    while (t < 200 && s.tr) { s.step(idle); t++; }   // then hands off
    assert.equal(Math.floor(s.p.z), 1, 'did not arrive on the next floor');
    assert.ok(t / 60 < 0.6, `took ${(t / 60).toFixed(2)}s, should feel instant`);
    started = true;
    break outer;
  }
  assert.ok(started, 'found nowhere to test a traverse from');
});

test('a traverse is refused where the ceiling is solid', () => {
  const L = new Level(4242), s = new Sim(L);
  outer:
  for (let y = 0; y < L.H; y++) for (let x = 0; x < L.W; x++) {
    if (L.get(x, y, 0) || !L.get(x, y, 1) || !L.reachable[L.idx(x, y, 0)]) continue;
    s.p = { x: x + 0.5, y: y + 0.5, z: 0.5 }; s.tr = null;
    s.step(idle);
    assert.equal(s.canUp, false);
    s.step({ ...idle, lift: 1 });
    assert.equal(s.tr, null, 'started a traverse into solid rubble');
    assert.equal(Math.floor(s.p.z), 0);
    break outer;
  }
});

test('the run cannot be won before any survivor is found', () => {
  const L = new Level(4242), s = new Sim(L);
  for (let i = 0; i < 300; i++) s.step(idle);   // parked on the entry marker
  assert.equal(s.over, null);
});

// ---------------------------------------------------------------- telemetry
test('held input compresses to well under the 8 KB per-run budget', () => {
  const L = new Level(555), s = new Sim(L), t = new Tap(555);
  let r = 555;
  const nx = () => { r = (r * 1664525 + 1013904223) >>> 0; return r / 4294967296 * 2 - 1; };
  let u = idle;
  for (let i = 0; i < 5400 && !s.over; i++) {
    if (i % 22 === 0) u = { thrust: nx(), strafe: nx() * 0.5, lift: 0, yaw: nx() };
    t.push(u); s.step(u);
  }
  assert.ok(t.bytes() < 8192, `${t.bytes()} bytes exceeds the budget`);
});

test('repeated identical input extends a run instead of adding one', () => {
  const t = new Tap(1);
  for (let i = 0; i < 100; i++) t.push({ thrust: 1, strafe: 0, lift: 0, yaw: 0 });
  assert.equal(t.runs.length, 1);
  assert.equal(t.n, 100);
});

test('axis quantization is stable and bounded', () => {
  const t = new Tap(1);
  t.push({ thrust: 5, strafe: -5, lift: 0, yaw: 0 });     // out of range
  const [, a, b] = t.runs[0];
  assert.equal(a, 15); assert.equal(b, -15);
});
