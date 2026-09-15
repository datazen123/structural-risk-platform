// Telemetry tap. Records the INPUT stream, not positions (ADR-002): the sim is
// deterministic, so inputs plus the level seed replay the run exactly. A 90 s
// run at 60 Hz is 5400 ticks x 4 axes, delta+RLE encoded - a few KB, well
// inside the 8 KB budget in C1.
// 5-bit signed axes (-15..15). Human stick input is smooth and held; the extra
// 3 bits of an int8 encode jitter we do not want and cannot use, and they break
// every run-length. Resolution stays far finer than human motor precision.
const q = (v) => Math.max(-15, Math.min(15, Math.round(v * 15)));

export class Tap {
  /** @param {number} seed */
  constructor(seed) {
    this.seed = seed;
    /** @type {number[][]} */ this.runs = [];   // [count, t, s, l, y]
    this.last = null;
    this.n = 0;
  }
  /** @param {import('./sim.js').Input} u */
  push(u) {
    const f = [q(u.thrust), q(u.strafe), q(u.lift), q(u.yaw)];
    this.n++;
    if (this.last && f.every((v, i) => v === this.last[i]) && this.runs.length) {
      this.runs[this.runs.length - 1][0]++;
      return;
    }
    this.runs.push([1, ...f]);
    this.last = f;
  }
  /** Encoded size in bytes on the wire: 1 count byte + 4 axes packed in 20
   *  bits, rounded to 3 bytes. Header carries seed, sim_ver and schema_ver. */
  bytes() { return this.runs.length * 4 + 16; }
  /** @param {import('./sim.js').Sim} sim */
  summary(sim) {
    return {
      schema: 'telemetry.v0-draft', seed: this.seed, tier: 0,
      ticks: this.n, runs: this.runs.length, wireBytes: this.bytes(),
      outcome: sim.over, found: sim.found, hits: sim.hits,
      impact: +sim.impact.toFixed(2), pathLen: +sim.dist.toFixed(1),
      seconds: +sim.t.toFixed(1)
    };
  }
}
