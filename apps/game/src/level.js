// Voxel level: a collapsed building as a stack of z-slices.
// Generated deterministically from a seed so a run replays exactly.
import { mulberry32, ri } from './rng.js';

export const SOLID = 1, AIR = 0;

export class Level {
  /** @param {number} seed */
  constructor(seed) {
    this.seed = seed >>> 0;
    this.W = 44; this.H = 44; this.D = 5;
    this.cells = new Uint8Array(this.W * this.H * this.D).fill(SOLID);
    this.seen = new Uint8Array(this.W * this.H * this.D);
    /** @type {{x:number,y:number,z:number,found:boolean}[]} */
    this.survivors = [];
    /** @type {any[][]} */ this.rooms = [];
    this.entry = { x: 2.5, y: 2.5, z: 0.5 };
    this.#generate();
  }

  idx(x, y, z) { return (z * this.H + y) * this.W + x; }
  inside(x, y, z) {
    return x >= 0 && y >= 0 && z >= 0 && x < this.W && y < this.H && z < this.D;
  }
  /** Solid test in continuous coords. Out of bounds counts as solid. */
  solidAt(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    if (!this.inside(xi, yi, zi)) return true;
    return this.cells[this.idx(xi, yi, zi)] === SOLID;
  }
  get(x, y, z) {
    return this.inside(x, y, z) ? this.cells[this.idx(x, y, z)] : SOLID;
  }
  carve(x, y, z) { if (this.inside(x, y, z)) this.cells[this.idx(x, y, z)] = AIR; }

  #generate() {
    const r = mulberry32(this.seed);

    // 1. Each floor starts as a set of rooms joined by corridors - the building
    //    as it was, before anything fell on it.
    for (let z = 0; z < this.D; z++) {
      const rooms = [];
      const n = ri(r, 5, 7);
      for (let i = 0; i < n; i++) {
        const w = ri(r, 6, 12), h = ri(r, 6, 12);
        const x = ri(r, 1, this.W - w - 2), y = ri(r, 1, this.H - h - 2);
        rooms.push({ x, y, w, h, cx: (x + w / 2) | 0, cy: (y + h / 2) | 0 });
        for (let yy = y; yy < y + h; yy++)
          for (let xx = x; xx < x + w; xx++) this.carve(xx, yy, z);
      }
      for (let i = 1; i < rooms.length; i++) {
        const a = rooms[i - 1], b = rooms[i];
        const wide = r() < 0.35 ? 1 : 0;
        for (let x = Math.min(a.cx, b.cx); x <= Math.max(a.cx, b.cx); x++)
          for (let t = -wide; t <= wide; t++) this.carve(x, a.cy + t, z);
        for (let y = Math.min(a.cy, b.cy); y <= Math.max(a.cy, b.cy); y++)
          for (let t = -wide; t <= wide; t++) this.carve(b.cx + t, y, z);
      }
      this.rooms[z] = rooms;
    }

    // 2. Then it collapses. Crush zones pancake floors into rubble; breaches
    //    tear vertical shafts between them. Voids are what is left over.
    const crushes = ri(r, 4, 7);
    for (let i = 0; i < crushes; i++) {
      const cx = ri(r, 4, this.W - 5), cy = ri(r, 4, this.H - 5);
      const rad = ri(r, 4, 8), z0 = ri(r, 0, this.D - 2);
      for (let z = z0; z < Math.min(this.D, z0 + 2); z++)
        for (let y = cy - rad; y <= cy + rad; y++)
          for (let x = cx - rad; x <= cx + rad; x++) {
            const d = Math.hypot(x - cx, y - cy);
            if (d < rad * (0.55 + r() * 0.45) && this.inside(x, y, z))
              this.cells[this.idx(x, y, z)] = SOLID;
          }
    }
    const breaches = ri(r, 9, 13);
    for (let i = 0; i < breaches; i++) {
      const cx = ri(r, 2, this.W - 3), cy = ri(r, 2, this.H - 3);
      const rad = r() < 0.4 ? 2 : 1;
      for (let z = 0; z < this.D; z++)
        for (let y = cy - rad; y <= cy + rad; y++)
          for (let x = cx - rad; x <= cx + rad; x++)
            if (Math.hypot(x - cx, y - cy) <= rad) this.carve(x, y, z);
    }
    // Scattered debris - the tight squeezes that make flying interesting.
    for (let z = 0; z < this.D; z++)
      for (let i = 0; i < 40; i++)
        this.cells[this.idx(ri(r, 1, this.W - 2), ri(r, 1, this.H - 2), z)] = SOLID;

    // 3. Entry sits at the centre of a real room on floor 0, cleared of rubble,
    //    so it is always attached to the room network. Flood from there; only
    //    reachable voids get survivors, so every run is winnable without
    //    regenerating the level.
    // A crush zone can land on any given room, so try every room on floor 0 and
    // enter through whichever one opens onto the most of the building. Cheap,
    // deterministic, and it removes the degenerate "sealed in a closet" level.
    let best = null;
    for (const rm of this.rooms[0]) {
      for (let y = rm.cy - 2; y <= rm.cy + 2; y++)
        for (let x = rm.cx - 2; x <= rm.cx + 2; x++) this.carve(x, y, 0);
      const f = this.#flood(rm.cx, rm.cy, 0);
      let n = 0; for (let i = 0; i < f.length; i++) n += f[i];
      if (!best || n > best.n) best = { n, f, cx: rm.cx, cy: rm.cy };
    }
    const ex = best.cx, ey = best.cy;
    this.entry = { x: ex + 0.5, y: ey + 0.5, z: 0.5 };
    const reach = best.f;
    this.reachCount = best.n;
    const pool = [];
    for (let z = 0; z < this.D; z++)
      for (let y = 0; y < this.H; y++)
        for (let x = 0; x < this.W; x++)
          if (reach[this.idx(x, y, z)]) {
            const d = Math.hypot(x - this.entry.x, y - this.entry.y) + z * 5;
            if (d > 16) pool.push({ x, y, z, d });
          }
    // Walk the whole reachable pool in a deterministic shuffled order and take
    // the first candidates that are far enough apart. Sampling only the very
    // farthest cells clusters every survivor into one corner of the building.
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    const want = 3;
    for (const sep of [11, 8, 5, 0]) {
      for (const c of pool) {
        if (this.survivors.length >= want) break;
        if (this.survivors.some(s =>
          Math.hypot(s.x - c.x - 0.5, s.y - c.y - 0.5) < sep &&
          Math.floor(s.z) === c.z)) continue;
        if (this.survivors.some(s => s.x === c.x + 0.5 && s.y === c.y + 0.5 && Math.floor(s.z) === c.z)) continue;
        this.survivors.push({ x: c.x + 0.5, y: c.y + 0.5, z: c.z + 0.5, found: false });
      }
      if (this.survivors.length >= want) break;
    }
    this.reachable = reach;
  }

  #flood(sx, sy, sz) {
    const seen = new Uint8Array(this.cells.length);
    const q = [this.idx(sx, sy, sz)];
    seen[q[0]] = 1;
    const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    while (q.length) {
      const i = q.pop();
      const z = (i / (this.W * this.H)) | 0;
      const y = ((i - z * this.W * this.H) / this.W) | 0;
      const x = i - z * this.W * this.H - y * this.W;
      for (const [dx, dy, dz] of dirs) {
        const nx = x + dx, ny = y + dy, nz = z + dz;
        if (!this.inside(nx, ny, nz)) continue;
        const j = this.idx(nx, ny, nz);
        if (seen[j] || this.cells[j] === SOLID) continue;
        seen[j] = 1; q.push(j);
      }
    }
    return seen;
  }
}
