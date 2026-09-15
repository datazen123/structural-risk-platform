# S03 — Game core (Tier 0)

**Objective:** A playable, genuinely fun 2.5D slice-navigation drone game that
runs inside the C1 budgets on a floor device.

**Read:** `CLAUDE.md`, `docs/01-architecture.md`, `docs/02-constraints.md`,
`docs/decisions/ADR-001-client-stack.md`, `docs/contracts/telemetry.v1.md`,
`docs/contracts/levelpack.v1.md`
**Owns:** `apps/game/`
**Depends on:** S02, S04 (level pack format only — a hand-authored fixture level
unblocks you if S04 is not finished)
**Budget:** large. Expect S03a (sim+render), S03b (feel+content), S03c (PWA).

## Tasks

1. **Sim core** — fixed-step, deterministic, per the S02 contract. 4-DOF
   `(x, y, z, yaw)` + throttle. Momentum, inertia, and rotor-wash near surfaces.
   No wall-clock, no unseeded RNG. Zero rendering knowledge.
2. **Slice renderer** — Canvas 2D, dirty-rect, tile blit. Current z-slice sharp,
   adjacent slices hinted by edge shading so vertical structure is *readable*.
   This is the hardest design problem in the project: make a 3D void legible
   through a 2D window without a 3D renderer. Prototype it early and roughly.
3. **Input** — touch-first (virtual sticks, one-thumb mode), keyboard and
   gamepad as bonuses. **Never** hard-code a 60Hz assumption; input sampling is
   decoupled from frame rate. Latency budget is sacred: this is the dexterity
   signal, and input lag corrupts the science, not just the fun.
4. **Both mission modes** (see `docs/00-vision.md`):
   - *SAR*: timed, victim-finding, hazard-avoidance, degrading comms.
   - *Survey*: systematic coverage, inspection targets, thoroughness-scored.
   Survey mode is not optional and is not a stretch goal — R-P001-8.
5. **Difficulty axes drawn from R3's real failure modes** — comms latency/loss,
   dust occlusion, GPS denial, lighting, battery, partial control loss. Real
   failure modes only. Inventing hazards corrupts the research value.
6. **Feel.** Juice, feedback, readable failure, a 30-second first-run hook.
   Budget real time for this; an unfun game collects no data and the whole
   project is downstream of retention.
7. **Telemetry tap** — `src/sim/tap.ts`, emitting the S02 contract. Sim writes
   to it; the sim never knows about the network.
8. **PWA shell** — service worker, offline-first, install prompt, level cache.

## Watch item from S12

C6 flags that our 2.5D sim is near-certainly inadmissible as certification
evidence, and that a separate narrow high-fidelity validation sim may be
required. That is **not** this session's problem to solve — but keep the sim
core cleanly separable from the renderer and the game loop, so a second
higher-fidelity sim can reuse the contract rather than fork the project.

## Non-negotiable
- No runtime dependencies in the Tier-0 bundle (C4 rule 7, ADR-001).
- **Measure on a real floor device (or throttled emulation) in the first
  quarter of this session, not at the end.** Discovering the frame budget is
  blown after building the content pipeline is the expensive failure.

## Done when
- [ ] Playable start→finish on a floor-device profile, both modes.
- [ ] Initial payload ≤200KB gz; 30fps sustained; cold start ≤5s.
- [ ] Deterministic replay from telemetry reproduces the run bit-exact.
- [ ] Fully playable offline after first load.
- [ ] **Five humans who are not on this project play it and want another run.**
      Record what they said, verbatim, in the handoff. If they don't, the
      session is not done — fix the fun before moving on.

**Produces:** playable build + `apps/game/README.md` + honest fun assessment.
