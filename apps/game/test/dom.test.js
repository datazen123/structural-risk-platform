// Browser-side tests. Injected into the running game and executed against the
// real DOM, including synthetic touch. Run via scripts/run-dom-tests (or the
// devtools evaluate harness) after loading the game in a mobile viewport.
//
// These cover what the logic tests cannot: whether a player can actually see
// and operate the controls on a phone.
window.__rubbleRunTests = function (frameDoc, frameWin) {
  const d = frameDoc, w = frameWin;
  const q = (s) => d.querySelector(s);
  const results = [];
  const check = (name, fn) => {
    try { const detail = fn(); results.push({ name, pass: true, detail: detail || '' }); }
    catch (e) { results.push({ name, pass: false, detail: e.message }); }
  };
  const ok = (cond, msg) => { if (!cond) throw new Error(msg); };
  const rect = (s) => q(s).getBoundingClientRect();
  const overlap = (a, b) =>
    a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

  // start the run the way a player does
  if (!q('#intro').hidden) q('#begin').click();

  const app = rect('#app');
  const CONTROLS = ['#stickL', '#stickR', '#fbtn'];

  check('all touch controls exist in the DOM', () => {
    for (const s of CONTROLS) ok(q(s), `${s} missing`);
    return CONTROLS.join(' ');
  });

  check('no control relies on position:fixed', () => {
    for (const s of [...CONTROLS, '#hud', '#stage', '#app', '.sheet']) {
      const el = q(s); if (!el) continue;
      ok(w.getComputedStyle(el).position !== 'fixed',
         `${s} is position:fixed - unreliable inside an iOS iframe`);
    }
    return 'none fixed';
  });

  check('the app box matches the visual viewport', () => {
    const vh = w.visualViewport ? Math.round(w.visualViewport.height) : w.innerHeight;
    ok(Math.abs(Math.round(app.height) - vh) <= 1,
       `app is ${Math.round(app.height)}px but the visible viewport is ${vh}px`);
    return `${Math.round(app.width)}x${Math.round(app.height)}`;
  });

  check('every control is fully inside the visible area', () => {
    const out = [];
    for (const s of CONTROLS) {
      const r = rect(s);
      if (r.bottom > app.bottom + 0.5 || r.top < app.top - 0.5 ||
          r.left < app.left - 0.5 || r.right > app.right + 0.5)
        out.push(`${s} bottom=${Math.round(r.bottom)} vs app bottom=${Math.round(app.bottom)}`);
    }
    ok(out.length === 0, out.join('; '));
    return CONTROLS.map(s => `${s}@${Math.round(rect(s).bottom)}`).join(' ');
  });

  check('controls do not overlap one another', () => {
    for (let i = 0; i < CONTROLS.length; i++)
      for (let j = i + 1; j < CONTROLS.length; j++)
        ok(!overlap(rect(CONTROLS[i]), rect(CONTROLS[j])),
           `${CONTROLS[i]} overlaps ${CONTROLS[j]}`);
    return 'clear';
  });

  check('controls are actually visible, not just present', () => {
    for (const s of CONTROLS) {
      const cs = w.getComputedStyle(q(s));
      ok(cs.display !== 'none', `${s} display:none`);
      ok(cs.visibility !== 'hidden', `${s} visibility:hidden`);
      ok(parseFloat(cs.opacity) >= 0.5, `${s} opacity ${cs.opacity} is too faint to find`);
    }
    return CONTROLS.map(s => w.getComputedStyle(q(s)).opacity).join('/');
  });

  check('the floor button meets a 44px touch target', () => {
    const r = rect('#fbtn');
    ok(r.width >= 44 && r.height >= 44, `${Math.round(r.width)}x${Math.round(r.height)}`);
    return `${Math.round(r.width)}x${Math.round(r.height)}`;
  });

  // ---- synthetic touch --------------------------------------------------
  const stage = q('#stage');
  const touch = (type, pts) => {
    const list = pts.map(p => new w.Touch({
      identifier: p.id, target: stage, clientX: p.x, clientY: p.y }));
    stage.dispatchEvent(new w.TouchEvent(type, {
      touches: type === 'touchend' ? [] : list,
      changedTouches: list, targetTouches: type === 'touchend' ? [] : list,
      bubbles: true, cancelable: true }));
  };
  const frame = () => new Promise(r => w.requestAnimationFrame(() => r()));

  const rc = rect('#stickR'), lc = rect('#stickL');
  const rCx = rc.left + rc.width / 2, rCy = rc.top + rc.height / 2;
  const lCx = lc.left + lc.width / 2, lCy = lc.top + lc.height / 2;

  check('right stick pushed forward produces forward thrust', () => {
    touch('touchstart', [{ id: 1, x: rCx, y: rCy }]);
    touch('touchmove', [{ id: 1, x: rCx, y: rCy - 60 }]);
    const u = w.__input ? w.__input.read() : null;
    ok(u, 'input not exposed for testing');
    ok(u.thrust > 0.9, `thrust was ${u.thrust}`);
    ok(Math.abs(u.yaw) < 0.01, `yaw leaked: ${u.yaw}`);
    touch('touchend', [{ id: 1, x: rCx, y: rCy - 60 }]);
    return `thrust ${u.thrust.toFixed(2)}`;
  });

  check('right stick pushed sideways strafes without turning', () => {
    touch('touchstart', [{ id: 2, x: rCx, y: rCy }]);
    touch('touchmove', [{ id: 2, x: rCx - 60, y: rCy }]);
    const u = w.__input.read();
    ok(u.strafe < -0.9, `strafe was ${u.strafe}`);
    ok(Math.abs(u.yaw) < 0.01, `yaw leaked: ${u.yaw}`);
    touch('touchend', [{ id: 2, x: rCx - 60, y: rCy }]);
    return `strafe ${u.strafe.toFixed(2)}`;
  });

  check('left stick turns without translating', () => {
    touch('touchstart', [{ id: 3, x: lCx, y: lCy }]);
    touch('touchmove', [{ id: 3, x: lCx + 60, y: lCy - 60 }]);
    const u = w.__input.read();
    ok(u.yaw > 0.9, `yaw was ${u.yaw}`);
    ok(u.thrust === 0 && u.strafe === 0, `left stick moved the drone: ${JSON.stringify(u)}`);
    touch('touchend', [{ id: 3, x: lCx + 60, y: lCy - 60 }]);
    return `yaw ${u.yaw.toFixed(2)}`;
  });

  check('the stick knob follows the thumb', () => {
    touch('touchstart', [{ id: 4, x: rCx, y: rCy }]);
    touch('touchmove', [{ id: 4, x: rCx + 40, y: rCy }]);
    if (w.__hud) w.__hud();
    const t = q('#stickR .knob').style.transform;
    ok(/translate\(\s*[1-9]/.test(t), `knob did not move: "${t}"`);
    ok(q('#stickR').classList.contains('on'), 'stick did not light up');
    touch('touchend', [{ id: 4, x: rCx + 40, y: rCy }]);
    return t;
  });

  check('both thumbs work at once', () => {
    touch('touchstart', [{ id: 5, x: lCx, y: lCy }, { id: 6, x: rCx, y: rCy }]);
    touch('touchmove', [{ id: 5, x: lCx + 60, y: lCy }, { id: 6, x: rCx, y: rCy - 60 }]);
    const u = w.__input.read();
    ok(u.yaw > 0.9 && u.thrust > 0.9, `got ${JSON.stringify(u)}`);
    touch('touchend', [{ id: 5, x: lCx + 60, y: lCy }, { id: 6, x: rCx, y: rCy - 60 }]);
    return `yaw ${u.yaw.toFixed(2)} thrust ${u.thrust.toFixed(2)}`;
  });

  check('touching the floor button does not also grab a stick', () => {
    const fb = rect('#fbtn');
    const fx = fb.left + fb.width / 2, fy = fb.top + fb.height / 2;
    ok(!overlap(fb, rect('#stickR')), 'button overlaps the right stick');
    const inStick = fx >= rc.left && fx <= rc.right && fy >= rc.top && fy <= rc.bottom;
    ok(!inStick, 'button centre sits inside the right stick');
    return 'separate';
  });

  return results;
};
