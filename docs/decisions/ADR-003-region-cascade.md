# ADR-003: Japan seeds the data; cascade transferability is a design requirement

**Status:** accepted
**Date:** 2026-09-08
**Session:** S00

## Context

Candidate seed regions: Japan (best open geospatial/seismic record, mature SAR
doctrine, existing contact per source doc), Indonesia (higher mortality, sparse
sensing), Türkiye 2023 (excellent documented collapse corpus).

User decision 2026-09-08: Japan first, **with cascade made explicit in the design**.

## Decision

Japan (Kumamoto 2016, Noto 2024 as candidates) seeds the procedural generation
corpus, because data quality determines how fast the MVP exists.

**Cascade is a first-class architectural requirement, not a later port.**
Concretely, this obligates:

1. The ingest pipeline declares a **minimum viable input tier**. It must produce
   a playable level from degraded inputs — e.g. satellite DEM + OSM footprints +
   a hazard model — not only from dense LiDAR. Japan-quality data is the *best*
   case the pipeline accepts, never the *required* case.
2. Level packs carry a `provenance.fidelity` field. Any metric or claim derived
   from them is qualified by input fidelity, in the dashboard and the paper.
3. Nothing in the sim, schema, or metrics may hard-code Japan-specific building
   typology, units, or coordinate reference.
4. The cascade is a named section of the whitepaper and deck: methodology, SOPs
   and trained policy transfer outward from data-rich to sensor-poor regions,
   and the reach client means the sensor-poor regions supply the pilots.

## Amendment, 2026-09-08 (S12/V7) — separate the two cascades

The ADR silently conflated two different things, and three of R1's five
shortlisted regions **gate at the border**: Morocco prohibits import and
possession in principle; Ethiopia's directive is import-focused; Nigeria's NCAA
states no drone is certified in-country.

Therefore, permanently distinguish:

- **The data / player cascade** — people in any region play, and their
  trajectories join the corpus. Gated only by connectivity and consent.
  This is the cascade the reach thesis actually rests on, and it survives.
- **The deployment cascade** — hardware and a certified policy operating in a
  region. Gated by import control, national certification, and airspace
  authority. In several target regions this is currently **closed**, not slow.

Also unaddressed and now owned by S15: **export control on autonomy software**.
S12 rates it the highest-risk unowned item, because it can block the deployment
cascade claim outright.

S10 must not present a single undifferentiated "cascade". Validation in Japan
carries no automatic regulatory weight elsewhere; what transfers is methodology,
SOPs and the corpus — say precisely that.

## Consequences

- The ingest pipeline is harder: two input tiers, not one. Accepted.
- Gives investors and IDRM agencies the answer to "does this only work in
  Japan?" up front, with an architectural answer rather than a promise.
- S01 research must cover data availability in *both* the seed and cascade
  regions, or requirement 1 has no spec.

## Alternatives rejected

- **Indonesia first** — larger humanitarian delta, but we would be building the
  data layer before the game; delays the MVP past the point of usefulness.
- **Türkiye first** — strong corpus, weaker partner path for this team.
- **Japan-only, cascade deferred** — cheapest now, but retrofitting region
  portability after the schema and procgen calcify is the expensive version.
