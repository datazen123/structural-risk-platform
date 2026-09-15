# S08 — Skill metrics ("TOP GUN" extraction)

**Objective:** Turn raw input streams into validated, defensible measures of
piloting skill — and be honest about which ones our projection can support.

**Read:** `CLAUDE.md`, `docs/00-vision.md` (§TOP GUN),
`research/R4-metrics.md`, `docs/contracts/telemetry.v1.md`,
`docs/decisions/ADR-001-client-stack.md` (the projection warning)
**Owns:** `services/metrics/`, `docs/contracts/metrics.v1.md`
**Depends on:** S02, S03, S06, S01/R4
**Budget:** large. Likely S08a (extraction), S08b (validation).

## Tasks
1. **Implement the metric set** selected in R4, computed from replayed runs
   server-side (never client-side — ADR-002 rejected that).
2. **Classify every metric honestly** into three buckets, and publish the
   classification:
   - **Supported** — cleanly derivable from 4-DOF in a 2.5D slice view.
   - **Attenuated** — derivable but weakened by the projection; state how.
   - **Not supported** — requires fidelity we do not have. Say so. Do not
     ship a metric in this bucket with a caveat buried in a footnote; that is
     exactly how a technical audience decides the whole deck is unreliable.
3. **Validate, don't assume.** For each metric: test–retest reliability, does it
   separate novices from experienced players, does it improve with practice
   (and is that learning or is it memorization of the level?).
4. **Anchor to existing competency frameworks** where S12/V6 found any. A
   metric that maps onto a recognized remote-pilot certification competency is
   anchored; one we invented is not. Note which of ours are which.
5. **Composite skill profile** — a vector, not a single number. Different SAR
   roles need different profiles; a scalar throws away the interesting signal.
   Include the survey-mode profile (thoroughness, coverage, inspection
   discipline), which is a genuinely different axis from reaction speed.
5. **Population statistics** for S10 — distributions, percentile curves, and
   the honest sample size and its biases.
6. **Design for unlinked sessions.** ADR-004 forecloses per-player longitudinal
   tracking by default. Metrics must work without it; longitudinal analysis is
   an opt-in cohort, not the baseline.
7. **Re-derivability.** Every metric must be recomputable from archived raw
   runs, so a future metric can be applied retroactively to today's data.

## Done when
- [ ] `docs/contracts/metrics.v1.md` — each metric with definition, units,
      derivation, support bucket, and validation evidence.
- [ ] Extraction runs over the corpus in the CI flywheel.
- [ ] Reliability + discriminant validity reported with real numbers.
- [ ] Every unsupported/attenuated metric explicitly listed. Loudly.

**Produces:** `docs/contracts/metrics.v1.md` — cited by S09, S10, whitepaper.
