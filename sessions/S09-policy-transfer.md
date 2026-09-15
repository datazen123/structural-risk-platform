# S09 — Trajectory corpus → navigation policy

**Objective:** Close the last arrow of the thesis: human gameplay produces a nav
policy that measurably beats a baseline. Or find out honestly that it does not.

**Read:** `CLAUDE.md`, `docs/00-vision.md`, `research/R3-platforms.md`,
`research/R4-metrics.md`, `docs/contracts/metrics.v1.md`,
`docs/contracts/telemetry.v1.md`
**Owns:** `services/policy/`, `docs/contracts/benchmark.v1.md`
**Depends on:** S06, S08, **S12** (assurance + standard test methods —
`research/V0-summary.md`, `research/V3-software-assurance.md`, ADR-005). If S12
finds that a learned component is only fieldable inside a deterministic safety
envelope, this session's scope grows to include that envelope. Read V0 first.
**Budget:** large

## The honest framing

This session carries the project's central scientific risk. Everything upstream
is engineering that will work. This is the part that might not.

Design it so that a **negative result is still a publishable, fundable
outcome** — "here is a rigorous benchmark showing where crowdsourced human
demonstration does and does not transfer to confined-space autonomous
navigation" is a real contribution. A pipeline built to only be able to report
success will not be believed by the audiences in R5, and correctly so.

## Tasks
1. **Corpus curation** — select high-performing trajectories using S08 metrics.
   Document the selection criteria; selection *is* a modelling choice and the
   most likely place to accidentally manufacture a result.
2. **Baselines first, before any learned policy.** Classical planners
   (A*/RRT*/frontier exploration) on the void graph. If you build the learned
   policy first you will have nothing to compare it to and every incentive to
   grade it generously.
3. **Learn** — behavioural cloning first; then IL/RL variants. Keep it boring
   and reproducible.
4. **Benchmark harness** (`benchmark.v1.md`): **report in the terms of any
   recognized standard test method S12/V1 identified (ADR-005)** — private
   metrics supplement, never headline. Then: held-out levels the policy never
   trained on, plus at least one cascade-region Tier-B level to test geographic
   transfer. Metrics: success rate, path efficiency, collision rate, time,
   robustness under the R3 failure modes (comms loss, sensor dropout).
5. **Sim-to-real gap** — state it explicitly. Our sim is a 2.5D game, not a
   physics-accurate rotorcraft model. Quantify what that costs, and specify
   what a real hardware validation would require. Do not let the deck imply
   we have crossed a gap we have only described.
6. **Field-insertion analysis** — from R3 **and V3/V5**, where in a real
   platform's control stack does this policy actually go? Full autonomy, shared
   autonomy, or operator assist? Answer concretely, per platform, and state the
   assurance evidence each insertion point would require.

## Done when
- [ ] Baselines implemented and benchmarked first.
- [ ] Learned policy benchmarked on held-out and cross-region levels.
- [ ] Result reported honestly, positive or negative, with confidence intervals.
- [ ] Sim-to-real gap documented with a concrete validation plan.
- [ ] Benchmark reproducible from a corpus tag by a third party.

**Produces:** `docs/contracts/benchmark.v1.md` + benchmark report. The single
most important input to S10.
