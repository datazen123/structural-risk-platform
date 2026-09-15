# S07 — CI/CD pipeline

**Objective:** Make the constraints in C1 **mechanically unbreakable**, and make
shipping boring.

**Read:** `CLAUDE.md`, `docs/02-constraints.md`, `docs/01-architecture.md`
**Owns:** `.github/workflows/`, `scripts/ci/`, `docs/ci.md`
**Depends on:** S03 (something to build), S06 (something to deploy)
**Budget:** medium

## The point of this session

Every budget in C1 becomes a **hard CI failure**, not a guideline. Budgets that
live in a document get eroded one 12KB dependency at a time; budgets enforced by
a red build do not. This session is where the project's core constraint stops
depending on anyone remembering it.

## Tasks
1. **Gates that fail the build:**
   - Initial payload >200KB gz → fail.
   - Total offline install >1.5MB gz → fail.
   - Any runtime dependency added to the Tier-0 bundle → fail (ADR-001, C4 r7).
   - Frame budget regression on emulated floor device → fail.
   - Telemetry encoded size >8KB for the golden worst-case run → fail.
   - Schema change that is not additive within a major version → fail (ADR-002).
   - Any field outside the frozen schema appearing in a payload → fail (C4).
2. **Determinism CI** — replay golden runs across the browser matrix; any
   divergence fails. This is the guard on the project's central technical bet.
3. **Perf CI** — throttled-CPU + throttled-network run measuring cold start and
   sustained frame time. Chrome DevTools protocol; publish a trend, not a
   pass/fail alone.
4. **Preview deploys** per PR, with a QR code so anyone can open it on a real
   phone in one action. Removes all friction from device testing.
5. **Two deploy targets** — the T0 reach client (CDN, aggressive caching) and,
   later, the T2 demo client. Never let a demo-tier asset leak into T0.
6. **The data flywheel job** — scheduled: new telemetry → feature extraction →
   corpus snapshot → policy retrain → benchmark → dashboard update. This is
   literally the "CI/CD" of the project's thesis (R-P001-2). It should be a
   real, visible, running pipeline before any investor meeting, because "the
   pipeline runs nightly" is a fundamentally different claim from "we plan a
   pipeline."

## Done when
- [ ] Every C1 budget enforced by a failing gate, each verified by a
      deliberately-breaking test PR.
- [ ] Preview deploys with QR working.
- [ ] Flywheel job runs end-to-end on synthetic data.
- [ ] `docs/ci.md` explains each gate and how to legitimately change one.

**Produces:** green pipeline + `docs/ci.md`.
