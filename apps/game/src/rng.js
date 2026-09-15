// Deterministic PRNG. The sim must never call Math.random (ADR-002 R1).
/** @param {number} seed @returns {() => number} */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** @param {() => number} r @param {number} lo @param {number} hi */
export const ri = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
