# Constraints

These are design inputs, not preferences. A change to any of them requires an ADR.

## C1 — Reach: 2G/3G and low-end devices

**Set by the user, 2026-09-08:** maximize reach to highly un-connected regions
(Africa and comparable), on old mobile hardware, because the youth demographic
with the reflexes we want is disproportionately located in poor geo-regions —
which are also the regions with the least SAR infrastructure.

### Target device floor
| Axis | Floor |
|---|---|
| OS | Android 5.0 (Lollipop), Chrome/WebView 60+ |
| RAM | 1 GB, ~150MB usable to the tab |
| CPU | quad-core ARM Cortex-A53 ~1.2GHz |
| GPU | **assume none.** WebGL may be absent, blacklisted, or lying. |
| Screen | 480x800, touch only, no gamepad |
| Network | 2G EDGE (~50 kbps, 300–800ms RTT), intermittent |

### Budgets (enforced in CI, see S07)
| Budget | Limit |
|---|---|
| Initial payload (gz) | **200 KB** |
| Total offline install (gz) | 1.5 MB |
| One level pack (gz) | 60 KB |
| Cold start → interactive, on floor device | 5 s |
| Frame budget, floor device | 33 ms (30fps) |
| Telemetry per 3-min run, on wire | **8 KB** |
| Peak JS heap | 60 MB |

**Rationale for 200KB:** at 50 kbps effective, 200KB ≈ 32s download. Above
~500KB the abandonment rate on 2G makes acquisition uneconomic, and many users
are on metered per-MB prepaid data where our payload has a literal cash cost.

## C2 — Offline-first

Streaming is impossible at the floor. Therefore:

- Service worker caches the full game shell + a level rotation on first load.
- Zero network calls are on the gameplay critical path.
- Telemetry writes to IndexedDB, batched, and syncs on `online` +
  `navigator.connection` heuristics; survives app close and device reboot.
- Level packs pull incrementally, newest-first, resumable, one pack at a time.
- The app must be honest about data cost: show bytes before any optional pull.

## C3 — One telemetry contract across tiers

| Tier | Renderer | Audience | Notes |
|---|---|---|---|
| **T0** | Canvas 2D, 2.5D slice view | reach / data volume | the default |
| **T1** | Canvas 2D + effects | mid-range mobile | cosmetic only |
| **T2** | WebGL / high fidelity | investors, authorities, researchers | demo client |

All tiers emit the **identical** telemetry schema. Tier is recorded as a field,
never as a schema variant. This is what lets the pitch honestly claim that the
beautiful thing on the projector and the data flywheel in the field are one
system. Frozen in `docs/contracts/` by session S02.

## C4 — Minors' data governance

The target demographic explicitly includes middle-school-aged children. This is
the single largest non-technical risk to the project: it is the thing that ends
investor diligence, government partnership, and university IRB review if it is
handled late.

Hard rules, from day one:
- No PII. No name, email, phone, precise geolocation, camera, or microphone.
- Player identity is a locally-generated opaque ID. No account required to play.
- Telemetry is **kinematic only**: control inputs, trajectories, timings.
- Consent flow is jurisdiction-aware (COPPA / GDPR-K / Japan APPI / regional).
- Data minimization is auditable: the schema *is* the disclosure.

Full treatment: `docs/decisions/ADR-004-minors-data-governance.md`. Session S11.

## C5 — Region transferability

Japan seeds the data because its open geospatial and seismic record is the best
available. But the cascade to sensor-poor regions is a design requirement and a
stated investor/authority talking point, not a future port. See ADR-003.

## C6 — Certifiability and validation

*Specified by S12, 2026-09-08. Sources in `research/V0`–`V8`.*

> ## C6 — Certifiability and validation
>
> Set by S12 (2026-09-08) from `research/V0`–`V8`, against user requirement
> R-P004. Same status as C1–C5: a change requires an ADR.
>
> ### C6.1 The deliverable is a policy **plus an envelope**
> A learned navigation component ships only inside a deterministic containment
> architecture: an **independent runtime monitor** (out-of-distribution
> detection, envelope check, action plausibility) that **passivates** the learned
> component and recovers through a **traditional, independently developed
> fallback** (hold / retreat / land / flight termination). The monitor and
> fallback are independent of the learned component and carry the
> development-assurance burden. **No single failure may take the aircraft outside
> the ground risk buffer.** [SORA 2.5 Annex E containment #4; EASA AI CP Issue 2
> SRM-01/02]
>
> ### C6.2 The model is frozen at deployment
> Non-adaptive, supervised-trained, versioned, updated only through a controlled
> re-qualification cycle. No online learning on a fielded aircraft. Behavioural
> cloning is the shippable line; reinforcement learning is the research line and
> is stated as such. [ARP6983/ED-324 Issue 1 scope, Draft 7, 2025-08]
>
> ### C6.3 An unconditional operator override is mandatory
> Human-triggered hold/land/retreat, bounded latency, supersedes the policy
> unconditionally. Required independently by EASA SRM-02 and by the Japanese
> duty to cease flight or separate on sighting a manned aircraft.
> [航空法132条の92 運用ガイドライン §3(2)]
>
> ### C6.4 The game sim is not validation evidence; a second simulator is required
> Simulation is admissible, but its **validity must be justified**, the
> suitability of the simulated environment must be justified, and at high
> robustness both must be **validated by a competent third party**. A separate,
> narrow, high-fidelity validation simulator is therefore a **required and
> currently unbudgeted component**. The game sim generates and selects policy;
> the validation sim evaluates it. Any end-to-end-simulated validation claim is
> insufficient — the test set should ideally include real data.
> [SORA 2.5 Annex E; EASA DM-13-5]
>
> ### C6.5 Training data is a strategy prior, not a certifiable training set
> Gameplay telemetry is **not representative of the operational design domain**
> and must never be presented as the training set for a safety-related
> navigation function. It is a source of human navigation strategy priors, whose
> value is demonstrated by downstream evaluation on ODD-representative data.
> [EASA DM-13-2]
>
> ### C6.6 Data provenance is an assurance artefact, not only a legal one
> Every corpus must have a **documented, entitled source** and **unambiguous,
> reproducible lineage** from data set to source data including intermediate
> data. Anonymity is compatible with this; **absence of lawful basis is not** —
> data without a documented entitlement cannot enter the pipeline, and no
> runtime mitigation compensates, because safety-risk mitigation may not offset
> ethics-block shortfalls. [EASA DM-06, DM-13-4, §5.2; C4, ADR-004]
>
> ### C6.7 We are never the disaster operator
> Japanese disaster-zone flight is a statutory exemption available only to the
> State, local public bodies, or parties **acting at their request**. Every
> field-deployment claim names the commissioning public body. The primary
> institutional milestone is a standing **防災協定**, ranked above any
> certification milestone. [航空法132条の92; 施行規則236条の88]
>
> ### C6.8 Benchmark in a recognised vocabulary; mirror, never claim
> Headline results are reported in **DECISIVE** metrics; apparatus geometry
> mirrors NIST Level 5 and ASTM E3479; we write "modelled on", never "compliant
> with", for standards we do not execute. Every result states apparatus,
> procedure, metric, fault condition, trial count and confidence. A published
> table states what simulation cannot discharge. [ADR-005 as amended]
>
> ### C6.9 Survey output is an instrument reading, not an assessment
> Where a survey product's output has legal force, a qualified professional
> signs it and bears the liability. Our system is an instrument in their
> workflow. Learned components go in the navigation and coverage layers, never
> the judgement layer. A survey product requires a **separate, non-anonymous
> evidence schema** (plan → execution → determination → report) distinct from
> and incompatible with the anonymous kinematic telemetry contract of C3/C4.
> [建築基準法12条; 告示282号 as amended 2022-01-18; 赤外線調査ガイドライン §2]
>
> ### C6.10 Regional validation does not port
> Validation in Japan carries **no regulatory weight** in any cascade region.
> The cascade transfers methodology, SOPs, benchmark vocabulary and the trained
> artefact; each region's authority remains the approving body. Evidence
> packages are designed for **re-presentation, not re-creation**. Every claim to
> the contrary is removed from project materials. A local operator is assumed
> mandatory. Export- and import-control exposure on the artefact is **unresolved
> and must be resolved before the cascade claim is published.**
