// Deterministic fixed-step flight sim. 4-DOF: x, y, z, yaw.
// No wall clock, no Math.random, no rendering knowledge (ADR-002).
export const TICK_HZ = 60;
export const DT = 1 / TICK_HZ;

const ACCEL = 26;      // body-frame thrust, cells/s^2
const LIFT = 3.2;      // vertical rate, slices/s
const YAW_ACCEL = 11;  // rad/s^2
const DRAG = 3.1;      // linear damping
const YAW_DRAG = 6.0;
const MAX_SPD = 9.5;
const RADIUS = 0.30;   // drone half-width, cells
const BATTERY = 95;    // seconds
const FIND_R = 2.6;

/** @typedef {{thrust:number,strafe:number,lift:number,yaw:number}} Input */

export class Sim {
  /** @param {import('./level.js').Level} level */
  constructor(level) {
    this.L = level;
    this.t = 0;
    this.tick = 0;
    this.p = { ...level.entry };
    this.v = { x: 0, y: 0, z: 0 };
    this.yaw = 0;
    this.yawV = 0;
    this.battery = BATTERY;
    this.hits = 0;
    this.impact = 0;          // accumulated collision energy
    this.dist = 0;
    this.found = 0;
    this.over = null;         // null | 'extracted' | 'flat'
    this.lastHit = -99;
    this.foundAt = -99;
    this.blocked = -99;
    this.canUp = false;
    this.canDown = false;
    /** @type {{dir:number,target:number}|null} */
    this.tr = null;
  }

  /** @param {Input} u */
  step(u) {
    if (this.over) return;
    const L = this.L;

    // --- rotation
    this.yawV += u.yaw * YAW_ACCEL * DT;
    this.yawV -= this.yawV * YAW_DRAG * DT;
    this.yaw += this.yawV * DT;

    // --- body-frame thrust into world frame
    const c = Math.cos(this.yaw), s = Math.sin(this.yaw);
    this.v.x += (u.thrust * c - u.strafe * s) * ACCEL * DT;
    this.v.y += (u.thrust * s + u.strafe * c) * ACCEL * DT;
    // Vertical movement is a committed traverse, not a held climb. The old
    // continuous model rose at 0.58 floors/sec, so a floor change took nearly
    // two seconds with no visible change until the slice flipped - which reads
    // as a broken control, not a slow one.
    if (!this.tr && Math.abs(u.lift) > 0.5) {
      const dir = u.lift > 0 ? 1 : -1;
      if ((dir > 0 && this.canUp) || (dir < 0 && this.canDown))
        this.tr = { dir, target: Math.floor(this.p.z) + dir + 0.5 };
    }
    this.v.z = 0;
    this.v.x -= this.v.x * DRAG * DT;
    this.v.y -= this.v.y * DRAG * DT;

    const sp = Math.hypot(this.v.x, this.v.y);
    if (sp > MAX_SPD) { this.v.x *= MAX_SPD / sp; this.v.y *= MAX_SPD / sp; }

    // --- swept move, axis by axis, so a wall stops one axis not all three
    const before = { ...this.p };
    this.#axis('x', this.v.x * DT);
    this.#axis('y', this.v.y * DT);
    if (this.tr) {
      const rate = 3.2;                       // ~0.31 s per floor
      const nz = this.p.z + rate * DT * this.tr.dir;
      if (this.#blockedZ(nz - this.p.z)) {
        this.tr = null;                       // drifted under a beam mid-climb
        this.blocked = this.t;
      } else {
        const done = this.tr.dir > 0 ? nz >= this.tr.target : nz <= this.tr.target;
        this.p.z = done ? this.tr.target : nz;
        if (done) this.tr = null;
      }
    }
    this.dist += Math.hypot(this.p.x - before.x, this.p.y - before.y,
                            (this.p.z - before.z) * 2);

    // --- battery, survivors, end conditions
    this.battery -= DT;
    // Separate horizontal and vertical thresholds. The old single 3D distance
    // with a z multiplier was correct but unreadable, and made it impossible to
    // tell a player WHY hovering over a marker did nothing.
    for (const sv of L.survivors) {
      if (sv.found) continue;
      const dh = Math.hypot(sv.x - this.p.x, sv.y - this.p.y);
      const dz = Math.abs(sv.z - this.p.z);
      if (dh < FIND_R && dz < 0.9) {
        sv.found = true; this.found++; this.foundAt = this.t;
      }
    }

    // Can we change floor from where we are standing? The player needs to know
    // this BEFORE pressing the control, or a blocked climb is a silent failure.
    this.canUp = !this.#blockedZ(0.75);
    this.canDown = !this.#blockedZ(-0.75);
    if (u.lift > 0.3 && !this.canUp) this.blocked = this.t;
    if (u.lift < -0.3 && !this.canDown) this.blocked = this.t;
    const home = Math.hypot(this.p.x - L.entry.x, this.p.y - L.entry.y);
    if (L.survivors.length > 0 && this.found === L.survivors.length && home < 3.5)
      this.over = 'extracted';
    else if (this.battery <= 0) this.over = 'flat';

    this.t += DT;
    this.tick++;
  }

  /** True if the drone's footprint cannot occupy z + dz. */
  #blockedZ(dz) {
    const z = this.p.z + dz;
    if (z < 0.2 || z > this.L.D - 0.2) return true;
    for (const ox of [-RADIUS, RADIUS])
      for (const oy of [-RADIUS, RADIUS])
        if (this.L.solidAt(this.p.x + ox, this.p.y + oy, z)) return true;
    return false;
  }

  /** @param {'x'|'y'|'z'} ax @param {number} d */
  #axis(ax, d) {
    if (d === 0) return;
    const n = { ...this.p };
    n[ax] += d;
    const r = ax === 'z' ? 0.22 : RADIUS;
    const lo = n[ax] - r, hi = n[ax] + r;
    const probe = (val) => {
      const q = { ...n }; q[ax] = val;
      // sample the drone's footprint, not just its centre point
      for (const dx of [-RADIUS, RADIUS])
        for (const dy of [-RADIUS, RADIUS]) {
          if (ax === 'z') { if (this.L.solidAt(q.x + dx, q.y + dy, q[ax])) return true; }
          else if (this.L.solidAt(
            ax === 'x' ? q.x : q.x + dx,
            ax === 'y' ? q.y : q.y + dy,
            q.z)) return true;
        }
      return false;
    };
    if (probe(d > 0 ? hi : lo)) {
      const imp = Math.abs(this.v[ax]);
      if (imp > 0.8 && this.t - this.lastHit > 0.18) {
        this.hits++; this.impact += imp; this.lastHit = this.t;
      }
      this.v[ax] *= -0.18;   // slight bounce, mostly absorbed
      return;
    }
    this.p[ax] = n[ax];
  }
}
