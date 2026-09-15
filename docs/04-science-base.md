# Science base

Project-relevant extraction from `sources/source-synthesis-report.md` (20-source
synthesis, compiled 2026-09-08). Ingested S00d. Bracketed numbers are that
report's source IDs; chase them there for the maths and citations.

This is **not** a summary of the report. It is the subset that changes what we
build, plus what each item obligates.

---

## 1. Android Earthquake Alerts is our closest precedent — and our sharpest warning

**[10]** Google's AEA crowdsources MEMS accelerometers in ordinary Android
phones. On the 2025-04-23 Mw 6.2 Marmara Sea event: detection in **5.31 s**,
median location error **3.0 km**, and across 36M residents a **90% true-positive
rate, 1% false positive, 99% precision**, median 56 s of warning.

**Why it matters more than anything else in the report:** it is population-scale
crowdsourced sensing, on exactly our target device class, in a target region,
already accepted institutionally. Our thesis is no longer speculative by
analogy — the harder version of it is deployed.

**And the failure mode is the one that should scare us.** AEA's magnitude
estimate **saturated below the true value** (Mw 6.04 vs 6.2), so the "Take
Action" polygon was under-dimensioned and **failed to reach inland populations
before severe shaking**. The crowdsourced system degraded precisely at the
extreme where it mattered most.

**Obligates:**
- S09 must test the crowd corpus at the *tail*, not the mean. A policy trained
  on abundant ordinary runs may saturate exactly on the rare hard geometry that
  SAR actually consists of. Make this an explicit benchmark axis.
- S10 may cite AEA as precedent **only** alongside its saturation failure.
  Citing the 99% precision and omitting the inland miss is the kind of selective
  quotation that ends credibility with this audience.
- Strategic: Google already owns a phone-based crowdsourced disaster-sensing
  channel in our regions. Partner, differentiate, or be surprised later.

## 2. SIP4D is the integration target the institutional front was missing

**[19, 17]** Japan's NIED runs **SIP4D**, a standardized "information pipeline"
connecting otherwise incompatible organizational databases during emergencies,
distributing through **NIED-CRS** (public) and **ISUT-SITE** (rescue agencies,
SDF, municipal centres). Standardization runs through **ISO TC 268/SC1/WG6**,
**ISO TR 6030** and the forthcoming **ISO IS 37179**, mapped to Sendai Framework
priorities.

V5 asked what format an incident command system expects. This is the answer, it
is named, and it is standards-backed.

**Obligates:**
- S04's level-pack and S10's survey output get a **SIP4D-compatible export
  path**. Interoperability with the pipeline agencies already run beats any
  capability argument we could make.
- ISO 37179 / TR 6030 join the V8 requirements matrix.
- Agencies is our lowest-confidence, highest-potential front (R5 came back
  empty). This is the first concrete route into it.

## 3. Rapid Visual Screening is the doctrine the whole preventative half implements

*Upgraded 2026-09-08 (P010): this is no longer a note about survey mode. It is
the methodological core of the project's primary half.*

**[1]** Computer vision and deep learning for concrete structural inspection,
3D semantic parsing of indoor/outdoor space, and **Rapid Visual Screening (RVS)**
for regional seismic risk assessment.

The preventative mission class (R-P001-8) has been the least specified half of
the project. RVS is its existing professional doctrine.

**Obligates:**
- S03 survey mode is scored against RVS procedure, not invented criteria.
- Ties directly to V4's finding that survey output may need a licensed
  engineer's sign-off: RVS is exactly such a screening instrument.

## 4. Geometry alone is insufficient — carry structural metadata

**[13]** Population-based SHM across heterogeneous building stock. Damage
classification from response-only features reaches **58.7%** accuracy; adding
geometric metadata **65.3%**; plus material **66.8%**; plus modal properties
**76.1%** — a 29.6% accuracy and 44.3% F1 improvement. Modal metadata is
marginal in simulation but **critical on the physical shake-table specimen**,
bridging sim-to-reality discrepancy.

**This is also the machinery for centre-of-gravity tracking (R-P012).** The
report does not use that phrase, but modal properties are the measurable proxy:
bolt plant onto a roof and the fundamental frequency falls; add bracing and it
rises; shift mass asymmetrically and the mode shapes reveal the torsional
eccentricity. Effective stiffness degradation (`T_KPRX`) and the pushover
capacity curve are how a *change* in the risk signature becomes a number rather
than an adjective. That modal metadata drove the largest accuracy jump, and
mattered most on the physical specimen rather than in simulation, is the single
most encouraging result in the report for the observatory.

**Obligates:**
- S04 level packs carry a structural metadata block, not just voxels:
  `GeoI` (stories, bays, story height, bay width, member dimensions),
  `MatI` (f'c, Ec, fy, Ey, dead/live loads), `ModI` (damping ratio, f1, f2).
- That last sentence is a direct warning to S03's validation-simulator problem:
  the metadata that looks marginal in simulation is what closes the gap to
  physical reality. Do not drop it because sim results don't need it.

## 5. Swarm search theory gives S09 baselines it currently lacks

**[18]** Particle swarm, ant colony, and Grey Wolf optimizers for collaborative
search, search-space optimization and target tracking.

**Obligates:** S09's baseline set widens beyond A*/RRT*/frontier to include
swarm search. ADR-006 and the Bio-Swarm front need an *algorithmic* story, not
only a hardware one — this is it.

## 6. Optimal Experimental Design is a search-strategy metric, and a cascade tool

**[8, 5, 7]** D-optimal sensor placement for linear time-invariant hyperbolic
systems via a multi-GPU Schur-complement greedy algorithm, inside extreme-scale
Bayesian digital twins for tsunami forecasting.

Two independent uses for us:
- **Search as information gain.** "Where should the drone look next" is an OED
  problem. This gives S08 a principled, publishable formulation of search
  strategy rather than a heuristic sweep-pattern classifier.
- **The cascade, quantified.** ADR-003 argues sensor-poor regions should receive
  transferred methodology. D-optimal placement answers *where the few sensors a
  poor region can afford should go* — a concrete, fundable deliverable for the
  Cascade front that does not depend on the game at all.

## 7. Synthetic-vs-real distribution shift is measurable — and we need it to be

**[9]** Out-of-distribution benchmarking of classifiers distinguishing real
disaster imagery from latent-diffusion synthetic imagery.

This lands directly on **S12's binding finding**: EASA DM-13-2 representativeness
— a training set must resemble the actual input state space. S01 separately
found **no open corpus of post-collapse interior void geometry exists anywhere**,
so our voids are necessarily simulated.

**Obligates:** we cannot assert representativeness; we must **measure** the gap
between our generated voids and real collapse geometry, using OOD methodology,
and publish the number. That measurement is itself a research contribution and
is the honest form of the claim S12 says we otherwise cannot make.

## 8. Smaller, but recorded

- **[12]** An MCP agentic server over OpenQuake / ESHM20 / ESRM20 computing
  hazard, damage and loss **with full data provenance**. Both a possible tool in
  S04's ingest and a provenance precedent to imitate.
- **[15]** Geospatial liquefaction ML for highway networks under M9 Cascadia —
  a hazard layer for survey mode and a Tier-B cascade input.
- **[4]** Dragon-king theory: the deadliest events are endogenous outliers that
  *violate* Gutenberg-Richter. Level generation sampled from GR statistics will
  systematically under-represent the events that actually kill. Reinforces
  S01's C-12.
- **[16]** Biomimicry taxonomy — nature-based vs bio-inspired; bionics /
  biomimetics / biomimicry; organism / behaviour / ecosystem levels. Gives the
  Bio-Swarm front rigorous vocabulary instead of "cyborg cockroaches".
- **[2, 11]** ELM seismicity regression and information-theoretic GMPE ranking
  (LLH / Kullback-Leibler) — hazard-layer inputs, not core path.

---

## Net effect on the plan

| Front / session | Change |
|---|---|
| Agencies (S10) | SIP4D + ISO 37179 is the first concrete integration route. Confidence up. |
| Survey (S03/S04) | RVS is the doctrine to implement against. Specified at last. |
| Terrain (S04) | Level packs must carry GeoI/MatI/ModI structural metadata. |
| Autonomy (S09) | Tail-performance benchmark axis; swarm-search baselines added. |
| Metrics (S08) | Search strategy reformulated as optimal experimental design. |
| Cascade | D-optimal sensor placement is a standalone fundable deliverable. |
| Cert (S12/C6) | Representativeness gap becomes measurable via OOD methodology. |
| Bio-Swarm | Gains an algorithmic half and a rigorous taxonomy. |
