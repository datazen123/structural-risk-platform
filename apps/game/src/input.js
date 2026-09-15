// Touch-first input. Sampling is decoupled from frame rate: the sim asks for
// the current axis values every fixed tick, so input latency does not vary with
// rendering load (C1 - the dexterity signal is the asset).
const clamp = (v) => Math.max(-1, Math.min(1, v));

export class Input {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.axes = { thrust: 0, strafe: 0, lift: 0, yaw: 0 };
    // One control for floors. The game decides which way is useful and sets
    // this; the player just presses the button. Encoded on the existing lift
    // axis, so the telemetry contract keeps its four axes.
    this.traverseDir = 0;
    this.buttonHeld = false;
    this.keys = new Set();
    /** @type {Map<number,{id:number,side:'l'|'r',ox:number,oy:number,x:number,y:number}>} */
    this.touches = new Map();
    this.root = root;
    this.hasTouch = false;

    addEventListener('keydown', e => {
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      this.keys.add(e.key.toLowerCase());
    });
    addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
    addEventListener('blur', () => this.keys.clear());

    const opt = { passive: false };
    root.addEventListener('touchstart', e => this.#start(e), opt);
    root.addEventListener('touchmove', e => this.#move(e), opt);
    root.addEventListener('touchend', e => this.#end(e), opt);
    root.addEventListener('touchcancel', e => this.#end(e), opt);
  }

  #start(e) {
    e.preventDefault(); this.hasTouch = true;
    for (const t of e.changedTouches) {
      // 42%, not 50%: the right stick rests left of centre-right to leave room
      // for the floor button, and on a 360px phone a half-split would put its
      // own resting position in the left zone.
      const side = t.clientX < innerWidth * 0.42 ? 'l' : 'r';
      this.touches.set(t.identifier,
        { id: t.identifier, side, ox: t.clientX, oy: t.clientY, x: t.clientX, y: t.clientY });
    }
  }
  #move(e) {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const s = this.touches.get(t.identifier);
      if (s) { s.x = t.clientX; s.y = t.clientY; }
    }
  }
  #end(e) {
    e.preventDefault();
    for (const t of e.changedTouches) this.touches.delete(t.identifier);
  }

  /** Sticks for the HUD to draw. */
  sticks() {
    const out = { l: null, r: null };
    for (const s of this.touches.values()) out[s.side] = s;
    return out;
  }

  /** @returns {import('./sim.js').Input} */
  read() {
    const R = 62; // stick throw, px
    let thrust = 0, strafe = 0, lift = 0, yaw = 0;
    for (const s of this.touches.values()) {
      const dx = clamp((s.x - s.ox) / R), dy = clamp((s.y - s.oy) / R);
      // Left thumb turns, right thumb flies. Vertical movement is the button
      // only - the right stick's vertical axis is forward/reverse now, so a
      // flick gesture would collide with it.
      if (s.side === 'l') { yaw = dx; }
      else { thrust = -dy; strafe = dx; }
    }
    if (this.buttonHeld) lift = this.traverseDir;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) thrust = 1;
    if (k.has('s') || k.has('arrowdown')) thrust = -1;
    if (k.has('a')) strafe = -1;
    if (k.has('d')) strafe = 1;
    if (k.has('q') || k.has('arrowleft')) yaw = -1;
    if (k.has('e') || k.has('arrowright')) yaw = 1;
    // A tap is enough: the sim commits the whole floor change on the first
    // tick it sees this, then drives it to completion on its own.
    if (k.has('shift')) lift = 1;
    if (k.has('control') || k.has('c')) lift = -1;
    if (k.has(' ') || k.has('f')) lift = this.traverseDir || 1;
    return { thrust: clamp(thrust), strafe: clamp(strafe), lift: clamp(lift), yaw: clamp(yaw) };
  }
}
