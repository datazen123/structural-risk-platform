// 2.5D slice renderer, Canvas 2D only (ADR-001).
// The player navigates a genuinely 3D voxel volume through a 2D window: the
// current z-slice is drawn sharp, and the slices immediately above and below
// are hinted at the edges, so vertical structure stays readable without ever
// rendering 3D geometry. Cost is O(visible tiles), not O(scene).
const C = {
  void:  '#0b0e13',
  floor: '#232c38',
  floorLit: '#31404f',
  drop:  '#12171f',   // air below this slice - a shaft you can descend
  open:  '#3d5163',   // air above this slice - a way up
  wall:  '#59657a',
  wallTop:'#78889e',
  unseen:'#0d1015',
  drone: '#ffb287',
  cone:  'rgba(255,178,135,0.10)',
  sv:    '#5fb397',
  entry: '#6fb3cf'
};
const TILE = 26;
const VIS = 7.4;      // reveal radius, cells

export class View {
  /** @param {HTMLCanvasElement} cv */
  constructor(cv) {
    this.cv = cv;
    this.ctx = /** @type {CanvasRenderingContext2D} */ (cv.getContext('2d', { alpha: false }));
    this.dpr = 1;
    this.resize();
    addEventListener('resize', () => this.resize());
  }
  resize() {
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    const w = this.cv.clientWidth, h = this.cv.clientHeight;
    this.cv.width = Math.round(w * this.dpr);
    this.cv.height = Math.round(h * this.dpr);
    this.w = w; this.h = h;
  }

  /** Reveal what the drone can currently see. Called from the sim tick. */
  /** @param {import('./level.js').Level} L @param {import('./sim.js').Sim} s */
  reveal(L, s) {
    const z = Math.floor(s.p.z);
    const cx = Math.floor(s.p.x), cy = Math.floor(s.p.y);
    const R = Math.ceil(VIS);
    for (let y = cy - R; y <= cy + R; y++)
      for (let x = cx - R; x <= cx + R; x++) {
        if (!L.inside(x, y, z)) continue;
        const d = Math.hypot(x + 0.5 - s.p.x, y + 0.5 - s.p.y);
        if (d > VIS) continue;
        // a cone in the facing direction sees further than the ambient bubble
        const ang = Math.atan2(y + 0.5 - s.p.y, x + 0.5 - s.p.x);
        let da = Math.abs(((ang - s.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        if (d > 3.4 && da > 1.05) continue;
        L.seen[L.idx(x, y, z)] = 1;
      }
  }

  /** @param {import('./level.js').Level} L @param {import('./sim.js').Sim} s */
  draw(L, s) {
    const ctx = this.ctx;
    ctx.save();
    ctx.scale(this.dpr, this.dpr);
    ctx.fillStyle = C.void;
    ctx.fillRect(0, 0, this.w, this.h);

    const z = Math.floor(s.p.z);
    const camX = s.p.x * TILE - this.w / 2;
    const camY = s.p.y * TILE - this.h / 2;
    const x0 = Math.max(0, Math.floor(camX / TILE) - 1);
    const y0 = Math.max(0, Math.floor(camY / TILE) - 1);
    const x1 = Math.min(L.W - 1, Math.ceil((camX + this.w) / TILE));
    const y1 = Math.min(L.H - 1, Math.ceil((camY + this.h) / TILE));

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const px = Math.round(x * TILE - camX), py = Math.round(y * TILE - camY);
        if (!L.seen[L.idx(x, y, z)]) { ctx.fillStyle = C.unseen; ctx.fillRect(px, py, TILE, TILE); continue; }
        const here = L.get(x, y, z);
        if (here) {
          ctx.fillStyle = C.wall;
          ctx.fillRect(px, py, TILE, TILE);
          // top edge catches the light, so walls read as mass not as holes
          ctx.fillStyle = C.wallTop;
          ctx.fillRect(px, py, TILE, 3);
        } else {
          const below = z > 0 ? L.get(x, y, z - 1) : 1;
          const above = z < L.D - 1 ? L.get(x, y, z + 1) : 1;
          const d = Math.hypot(x + 0.5 - s.p.x, y + 0.5 - s.p.y);
          ctx.fillStyle = below ? (d < 4 ? C.floorLit : C.floor) : C.drop;
          ctx.fillRect(px, py, TILE, TILE);
          if (!below) {   // shaft down - inset marker
            ctx.strokeStyle = 'rgba(111,179,207,0.30)'; ctx.lineWidth = 1;
            ctx.strokeRect(px + 5.5, py + 5.5, TILE - 11, TILE - 11);
          }
          if (!above) {   // opening up - bright corner ticks
            ctx.fillStyle = C.open;
            ctx.fillRect(px + 2, py + 2, 4, 1.5); ctx.fillRect(px + 2, py + 2, 1.5, 4);
            ctx.fillRect(px + TILE - 6, py + TILE - 3.5, 4, 1.5);
            ctx.fillRect(px + TILE - 3.5, py + TILE - 6, 1.5, 4);
          }
        }
      }
    }

    // entry / extraction point
    const ex = L.entry.x * TILE - camX, ey = L.entry.y * TILE - camY;
    ctx.strokeStyle = C.entry; ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(ex - 12, ey - 12, 24, 24);
    ctx.setLineDash([]);

    // Survivors. A survivor on THIS floor is solid and reachable. One on
    // another floor is drawn hollow with an explicit label, because a bright
    // dot under the drone that does nothing when you fly onto it is the single
    // most confusing thing this renderer can do.
    ctx.font = 'bold 10px ui-monospace,monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const sv of L.survivors) {
      const dh = Math.hypot(sv.x - s.p.x, sv.y - s.p.y);
      const dz = Math.floor(sv.z) - z;
      if (!sv.found && dh > 13) continue;
      const sx = sv.x * TILE - camX, sy = sv.y * TILE - camY;
      const near = Math.max(0.3, 1 - dh / 13);

      if (sv.found) {
        ctx.globalAlpha = 1; ctx.fillStyle = C.sv;
        ctx.beginPath(); ctx.arc(sx, sy, 7, 0, 7); ctx.fill();
        ctx.fillStyle = '#0b0e13'; ctx.fillText('✓', sx, sy + 0.5);
      } else if (dz === 0) {
        // same floor: solid, pulsing, go get it
        ctx.globalAlpha = near; ctx.fillStyle = C.sv;
        ctx.beginPath(); ctx.arc(sx, sy, 6, 0, 7); ctx.fill();
        const pulse = 9 + (Math.sin(s.t * 5.2) + 1) * 7;
        ctx.strokeStyle = C.sv; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(sx, sy, pulse, 0, 7); ctx.stroke();
      } else {
        // another floor: hollow ring + how far, and in which direction
        ctx.globalAlpha = near * 0.85;
        ctx.strokeStyle = C.sv; ctx.lineWidth = 1.8;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.arc(sx, sy, 6, 0, 7); ctx.stroke();
        ctx.setLineDash([]);
        const tag = (dz > 0 ? '▲ ' : '▼ ') + Math.abs(dz) + (Math.abs(dz) > 1 ? ' floors' : ' floor');
        const w = ctx.measureText(tag).width + 10;
        ctx.fillStyle = 'rgba(11,14,19,.88)';
        ctx.fillRect(sx - w / 2, sy + 10, w, 15);
        ctx.fillStyle = C.sv;
        ctx.fillText(tag, sx, sy + 18);
      }
      ctx.globalAlpha = 1;
    }

    // When the nearest target is on another floor, mark the ways through.
    // Without this the player is told to change floor with no idea where.
    const target = L.survivors.find(v => !v.found);
    if (target && Math.floor(target.z) !== z) {
      const want = Math.floor(target.z) > z ? 1 : -1;
      const nz = z + want;
      // A level has 80-260 transit cells per floor-pair, so outlining them all
      // is noise. Mark only the ones close enough to act on, as small dots.
      const pulse = 0.45 + (Math.sin(s.t * 3.4) + 1) * 0.2;
      ctx.fillStyle = `rgba(111,179,207,${pulse.toFixed(2)})`;
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          if (Math.hypot(x + 0.5 - s.p.x, y + 0.5 - s.p.y) > 8) continue;
          if (!L.seen[L.idx(x, y, z)]) continue;
          if (L.get(x, y, z) || L.get(x, y, nz)) continue;
          const px = x * TILE - camX + TILE / 2, py = y * TILE - camY + TILE / 2;
          ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 7); ctx.fill();
        }
    }

    // the drone, and where it is looking
    const dx = s.p.x * TILE - camX, dy = s.p.y * TILE - camY;
    ctx.save();
    ctx.translate(dx, dy); ctx.rotate(s.yaw);
    ctx.fillStyle = C.cone;
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.arc(0, 0, VIS * TILE, -1.05, 1.05); ctx.closePath(); ctx.fill();
    const flash = s.t - s.foundAt;
    ctx.fillStyle = flash < 0.6 ? C.sv : C.drone;
    ctx.beginPath();
    ctx.moveTo(11, 0); ctx.lineTo(-7, 6.5); ctx.lineTo(-4, 0); ctx.lineTo(-7, -6.5);
    ctx.closePath(); ctx.fill();
    ctx.restore();
    if (flash < 0.6) {
      ctx.strokeStyle = C.sv; ctx.lineWidth = 2.5;
      ctx.globalAlpha = 1 - flash / 0.6;
      ctx.beginPath(); ctx.arc(dx, dy, 14 + flash * 70, 0, 7); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }
}
