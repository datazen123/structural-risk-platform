# V0 — S12 summary

**Session:** S12 (certification, testing & validation). **Date:** 2026-09-08.
**Full evidence:** `research/V1`–`V7`. **Matrix:** `research/V8-matrix.md`.
**Appendix A** below is the draft §C6 text — S12 does not edit
`docs/02-constraints.md` directly.

---

## The four findings that matter

### 1. The deliverable is a policy **plus a certified envelope**. Confirmed.

Three independent regimes demand the same architecture, arriving from three
directions:

- **SORA 2.5 Annex E** (the operative EU rule since ED Decision 2025/018/R,
  2025-09-29): **no single failure may take the aircraft outside the ground risk
  buffer**; named means include an **independent flight termination system**, a
  secondary independent emergency flight control system, or a fail-safe health
  monitor triggering on failure of a critical feature **such as navigation**.
- **EASA AI Concept Paper Issue 2** (2024-03-06) provides the *Safety Risk
  Mitigation* block, whose named means is "**monitoring of the output of the
  AI/ML constituent and passivation of the AI-based system with recovery through
  a traditional backup system (e.g. safety net)**", with **independence** from
  the AI/ML constituent, and states the higher the AI level the more likely SRM
  is needed.
- **Japanese disaster doctrine** independently requires the crew to **cease the
  flight or separate** on visual acquisition of a manned aircraft.

Two hard sub-findings:

- **EASA's guidance covers AI Levels 1 and 2 only. Level 3 ("more autonomous
  machine") is explicitly not covered yet.** A policy that flies a search
  pattern without a human approving each decision is Level 3A/3B. There is not a
  bar we would fail — **there is no bar published**. Any roadmap with a date on
  full autonomy is asserting something no regulator has written.
- The one process standard being written for this — **ARP6983 / ED-324**, at
  Draft 7 as at August 2025 — scopes **Issue 1 to non-adaptive ML in supervised
  mode, up to DAL C**. Behavioural cloning is inside that scope. **RL is not.**

→ **S09's scope grows** to include the envelope specification, the runtime
monitor's detection criteria, and the safe fallback states. See V3 §9–§10 for
the architecture and the 14-item evidence checklist.

### 2. Minors' gameplay: the consent problem is real but it is the *second* problem.

EASA's learning-assurance data objectives require **completeness,
representativeness, accuracy, traceability and set independence** against a
defined ODD. **Representativeness is the binding failure**: "a data set is
representative when the distribution of its key characteristics is similar to
the actual input state space for the intended application." Finger inputs to a
2.5D phone abstraction are not the input state space of a rotorcraft in rubble.
**No consent regime fixes that, because the objection is about fidelity.**

On consent, the ADR-004 argument is now *sourced* rather than asserted:
**DM-06 requires the applicant to identify and document entitled data sources**,
and **SRM is explicitly barred from compensating shortfalls in the
trustworthiness blocks including ethics.** Unlawfully collected data is not
"risky" — it is undocumentable at DM-06 and uncompensable by any monitor.

Anonymity itself is *not* a problem: DM-13-4 traceability is a requirement about
**data lineage**, not about identifying the human. **ADR-004's opaque-ID design
is an asset here**, provided S02/S04/S06 preserve immutable, reproducible
lineage.

→ Defensible claim: the corpus is a **human navigation strategy prior** whose
value is shown by downstream evaluation on ODD-representative data. Not "training
data for a certified policy". S10 must not draw the arrow that way.

### 3. Japanese disaster airspace: the path exists, is fast, and is closed to us.

**航空法第132条の92** does not grant permission — it **disapplies** the
prohibited-airspace, flight-method, flight-plan and flight-log rules for **the
State, local public bodies, and persons acting at their request**. Where the
flight is in airport-vicinity, **Emergency Use Airspace**, or ≥150 m airspace, the
duty is to **telephone then email the Airport Office** with eight specified data
items, after which JCAB issues a NOTAM. Elsewhere, **no notification at all**.

So: **the latency is a phone call, not a permitting cycle.** The gate is
*eligibility*, not speed. **We can never be the operator.** Our route in is a
standing **防災協定** with a prefecture or municipality — which is simultaneously
the sales channel (V5), the airspace authorisation, and the data-access route.

Deconfliction with manned rotary-wing is **procedural and visual**: the
prefecture stands up an **航空運用調整班** (police, fire, MLIT, Coast Guard, SDF,
DMAT) which may request NOTAMs and **Emergency Use Airspace designation**; on the
ground the drone crew watches, and gives way, always. There is no electronic
separation and no clearance.

Ground truth: at Noto (January 2024) the drone response was run by **JUIDA from
inside Wajima City's disaster HQ, 26 organisations, 100+ sorties in a month,
entirely volunteer-based**, coordinating **by telephone**. FPV survey of collapsed
building interiors was a **Japan-first**. Our reference class is nearly empty.

### 4. Standard test methods exist and fit — but not the ones ADR-005 assumed.

- **Best fit, and free: the DECISIVE Test Methods Handbook v1.1** (UMass Lowell
  for US Army DEVCOM-SC, October 2022) — test methods for sUAS **without GPS,
  ≤91 cm wide, in subterranean and constrained indoor environments**, with
  published metrics for *Navigation Through Confined Spaces*, *Navigation Through
  Apertures*, *Position and Traversal Accuracy*, obstacle avoidance and
  **autonomy ranking**. It benchmarked **eight real fielded platforms**.
- **Procurement-grade: DHS/NIST/ASTM E54.09.** Free NIST fabrication guides;
  published aerial standards are **E3426/E3426M-24 (endurance)** and
  **E3479/E3479M-25 (fly through apertures)**; **confined spaces is still a draft
  work item (WK85836)**. ASTM texts are paywalled.
- **Both leads the ADR-005 draft leaned on are dead for aerial work.** The
  **World Robot Summit** Standard Disaster Robotics Challenge states **"aerial
  robots are not acceptable"**; the **RoboCup Rescue 2026A rules contain no
  aerial content at all** (the words "aerial", "UAV", "flying" do not occur).
- ASTM **E54.09 is current**; the brief's "(formerly F45-adjacent)" is wrong.

→ **ADR-005 recommendation: AMEND, not accept and not reject.** See §"ADR-005".

---

## What this changes

Every item below is invalidated, superseded or materially incomplete as written.

| Artefact | What is now wrong | Fix |
|---|---|---|
| **`docs/02-constraints.md` §C6** | Placeholder; all six live risks are now resolved or sharpened | Replace with Appendix A |
| **`docs/00-vision.md`** — the arrow chain `…trajectory corpus → nav policy → benchmark → field platform` | Omits the envelope; implies the corpus is certifiable training data; implies a field platform we can operate | Insert the envelope; requalify the corpus as a strategy prior; name the public-body operator |
| **`docs/00-vision.md`** — "degradation tolerance … the highest-value data we can collect … the least studied" | **Wrong.** Degraded position-hold flight is a **scored subject (4-3) in Japan's national remote-pilot practical examination**, 6-minute limit | Rewrite: the regulator agrees it matters and tests it once, pass/fail; we measure it continuously at population scale. Stronger claim |
| **`docs/00-vision.md`** — TOP GUN metric list | Missing **heading discipline** and **minimum time-to-collision**, both recognised | Add both |
| **`ADR-003`** (region cascade) | Silent on regulatory non-portability, on export control, and on **import prohibition** | Supersede or amend: Japan validation carries **zero** regulatory weight elsewhere; the cascade transfers methodology, SOPs, benchmark vocabulary and the artefact — not certification. **And the *data/player* cascade must be separated from the *deployment* cascade: three of R1's five shortlisted regions (Morocco, Ethiopia, Nigeria) gate drones at the border, Morocco by default prohibition** (V7 §2.0). Export-control exposure unresolved |
| **`ADR-004`** (minors' data) | Argument correct but unsourced; and it misses that representativeness, not consent, is the binding constraint | Cite EASA DM-06 / DM-13-2 / §5.2; add the representativeness finding; note that the opaque-ID design **satisfies** DM-13-4 traceability |
| **`ADR-005`** (benchmark vocabulary) | WRS and RoboCup Rescue leads are dead for aerial systems; assumed one coherent standards body | **Amend** (text below) |
| **`ADR-006`** (training product line) | Understated: it now has *funded* buyers and a *named* doctrinal gap | Strengthen with V5 §2.2 and V6 |
| **`sessions/S03-game-core.md`** | No validation simulator; no position-hold-degraded mode | Add both. **Third-party simulator validation is an unbudgeted line item** |
| **`sessions/S04-ingest-procgen.md`** | No reference paths, no condition descriptors, no test-apparatus geometry | Add: per-level reference path; DECISIVE condition descriptors; NIST Level-5 / aperture / examination geometries |
| **`sessions/S08-skill-metrics.md`** | Metrics presented as invented | Anchor each to a Japanese deduction category; add heading discipline and min-TTC; report reaction latency against the regulator's **2-second** return-to-path threshold |
| **`sessions/S09-policy-transfer.md`** | Scope too small | **Grows** to include containment, runtime monitor, OoD criteria, fallback states; BC becomes the shippable line and RL the research line; adopt DECISIVE metrics as headline |
| **`sessions/S10-evidence-surface.md`** | Would carry three unsupportable claims | Drop INSARAG IEC/IER relevance; drop incident-command interoperability; state regional non-portability explicitly |
| **`sessions/S11-governance.md`** | Data governance framed as legal-only | Add: data-source entitlement as an **assurance artefact**; adopt the Humanitarian UAV Code of Conduct |
| **`sessions/S14-training-product-line.md`** | Missing the funded market and the incumbent | Add: FY2024 subsidies for licence acquisition; the **1,500 schools / 500 registrants** channel; **JUIDA's ドローン防災マネージャー** as incumbent; the radio-licence gap; the **登録講習機関 wall** (physical airspace + real aircraft required) |
| **`docs/contracts/` (S02)** | No lineage fields | Add immutable, reproducible data lineage (EASA DM-13-4) |

**Unowned work created by S12** (no session covers it): export control on autonomy
software (**highest risk — blocks the cascade claim**); import control per region;
the survey evidence chain and its separate non-anonymous schema; aerial-imagery
privacy law; **whether insurers will underwrite an operation using a learned
navigation component**.

---

## ADR-005 recommendation: **AMEND**

Reject is wrong — the fit is good, just not where the draft looked. Accept as
written is wrong — two of its three named leads do not admit aerial robots.

Amendments:

1. **Headline vocabulary is DECISIVE**, not ASTM. It is open, free, aerial-only,
   confined-space-specific, and has a published eight-platform comparison set.
2. **Mirror, do not claim.** Reproduce NIST Level-5 and ASTM E3479 apparatus
   geometry; never write "compliant with" a paywalled standard we do not execute.
3. **Delete the World Robot Summit and RoboCup Rescue leads** for aerial work,
   recording why (V1 §5–§6). Keep two ideas from RoboCup: the explicit anti-race
   framing (repetitions for reliability, not speed) and the **10:1 autonomous:
   teleoperated** scoring weight.
4. **Adopt NIST's four-element method structure** — apparatus, procedure, metric,
   fault condition — and report *repetitions/time* with trial counts and stated
   confidence, not point scores.
5. **Publish the discharge table** (V1 §7): what simulation can and cannot
   discharge, per metric, stated plainly.
6. Add a second recognised target for the preventative line: **"accuracy equal to
   or better than test-hammer tapping"**, the acceptance criterion in Japan's
   drone infrared wall-survey regime.

---

## Appendix A — draft §C6 for `docs/02-constraints.md`

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
