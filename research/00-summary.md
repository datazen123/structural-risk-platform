# S01 research summary

**Date:** 2026-09-08. **Read this instead of redoing R1–R6.**
Files: `R1-regions.md`, `R2-devices.md`, `R3-platforms.md`, `R4-metrics.md`,
`R5-stakeholders.md`, `R6-attention.md`. Citations live there.

---

## The three findings that change decisions

### 1. The middle-school premise is false. Launch 18+. (R6 Part A)

`sources/` asserts middle-school-aged youth are optimal pilots. **No evidence
supports it and several lines contradict it.** Processing speed reaches adult
levels around 15; in-game cognitive-motor reaction time is *flat from 16 to 24*
then declines ~10 ms/year (Thompson et al., *PLOS ONE*, 2014, n=3,305); esports
prize earnings peak at ~21; complex fine-motor performance at 11–16 is limited
by biological maturity, and training history predicts it far better than age;
adults show faster online motor learning. The only measured child advantage —
overnight consolidation — is **unobservable under ADR-004's own no-session-
linking rule.**

Caveat, kept marked: **no study directly compares 12–14 with 18–25 on drone
teleoperation.** Strong inference across adjacent literatures, not a direct
finding.

Cost of 18+: **~30% of the addressable pool** (R6 §B.2: 17 M → 12 M in SSA).
Benefit: removes verifiable parental consent, COPPA/GDPR-K exposure at launch,
the IRB critical path, and ADR-004's open consent question — which
never has to be argued, because the data does not require minors.

### 2. Minimum viable harvest duration is ~60 s, not 30 s and not 3 min. (R6 Part C)

| Harvestable in | Metrics |
|---|---|
| **11–30 s** | input entropy, path efficiency (1 traversal), SPARC smoothness |
| **40–60 s** | + reaction latency, decision latency, median clearance, recovery competence |
| **60–100 s** | + spatial memory, search strategy, 10th-percentile clearance |
| **90–130 s, within a single run** | **degradation tolerance, load tolerance** |

The two metrics `docs/00-vision.md` calls "the highest-value data we can
collect" are **difference scores over a within-subject manipulation**, needing
90–130 s *inside one run* — ADR-004 forbids assembling them across days.
**S03: default 60–75 s runs; a 30 s "quick run" flagged in telemetry as
fast-metrics-only; a player-chosen 150–180 s "long mission" carrying the
degradation/load manipulations.** Use SPARC for smoothness — jerk-based metrics
are duration-biased and break once run length varies.

### 3. The 2G population is not the market. Affordability is. (R2 §1–3)

Strictly separated, 2025:
- **Covered:** 96% of the world is inside a mobile-broadband footprint; only
  **~312 M (4%)** are not — that *is* the 2G-only population, nearly half of it
  in Africa, and it is being switched off (25 networks scheduled H2 2026 alone).
- **Connected:** GSMA 4.7 bn (58%) on their own device; **ITU 6.0 bn (75%)** for
  any internet on any device. **A 1.3 bn definitional gap — use GSMA's, because
  a PWA needs a device the player controls.**
- **Usable:** in Sub-Saharan Africa (GSMA, 2023, n=1.19 bn people): 230 M (19%)
  use mobile internet **on a smartphone** — the entire technical market. 90 M
  are on non-smartphones. **500 M (42%) are covered but have no device at all.**
  The 2 GB data basket costs **4.2% of monthly GNI p.c. in Africa, 7.4% in
  low-income economies**, against a 2% affordability target.

Our byte budgets survive — for a better reason. A 1.5 MB install plus a heavy
player's monthly telemetry is **~0.33% of an SSA player's 1.9 GB monthly data**;
a 50 MB native install is 2.6% before play. And **one video ad per session at
5–10 sessions/day is 24–79% of that player's entire month** — ad monetization is
arithmetically impossible here. That is ADR-004's no-ad-tech rule restated as a
commercial argument.

---

## Where the research CONTRADICTS current docs and ADRs

| # | Doc | What it says | What R-findings say |
|---|---|---|---|
| **C-1** | `sources/`, C4, ADR-004, S11 | Middle-school youth are the optimal pilot demographic | **False.** Optimum is ~17–24; strongest predictor is gaming hours, not age. Launch 18+. (R6 A) |
| **C-2** | C1 floor: Android 5.0 / Chrome 60 / 1 GB RAM | The reach floor | **Wrong tail.** Africa, Aug 2026: top six Android versions are all 11+ and sum to ~85%; Android 5 ≈ 1.5% worldwide. Go-edition minimum RAM has been 2 GB since Android 13 Go. Recommend **Android 8 / Chrome 80 / 2 GB**, keeping all byte budgets unchanged. (R2 §4) |
| **C-3** | C1 network floor: 2G EDGE 50 kbps | The binding network constraint | **Wrong constraint.** 2G-only is 4% of humanity, device-poor, sunsetting. Bind on **congested/intermittent, expensive 3G–4G**. Same engineering, defensible rationale. (R2 §2) |
| **C-4** | C1: telemetry ≤ 8 KB per 3-min run | Budget unit | **Unit is wrong** once run length is a design variable. Restate as **bytes per minute of play + a per-run header allowance.** The cap itself holds (+8–15% header overhead at 60 s runs). (R6 C.5) |
| **C-5** | `docs/00-vision.md`: "if median session length is under 4 minutes… the research programme has no fuel" | Fun KPI | **Contradicted twice.** Industry median mobile session is 5–6 min and hypercasual 3–5 min, so 4 min is near the market median, not a floor; and R6 C shows most metrics need 60 s, not 4 min. Replace with **runs/session × metric-yield/run × sessions/day.** |
| **C-6** | `docs/00-vision.md`: bio-cybernetic swarms are "a decade-scale hardware programme… horizon section, not MVP" | Scope | **Overtaken by events.** Singapore HTX/NTU deployed 10 cyborg cockroaches in Myanmar, **March–April 2025** — first insect-hybrid robots in a humanitarian field operation. TRL ~6–7. And they sit *outside* every airspace/airworthiness gate in C6, which makes them arguably the **cheapest insertion point the project has.** (R3 §6) |
| **C-7** | ADR-003 | Japan seeds because its data is best | **True but incomplete, twice over.** (a) Every open Japanese dataset is exterior/top-down; **no open corpus of post-collapse *interior* void geometry exists anywhere.** Real data constrains the envelope; **the voids are simulated.** Say that in those words. (b) Japan's code-compliant stock lacks the failure modes causing most global mortality — 83% of building-collapse deaths over 30 yrs were in anomalously corrupt countries (Ambraseys & Bilham, *Nature*, 2011). Japan seeds *pipeline*, not *typology*. (R1 §3.1, §1.2) |
| **C-8** | ADR-003 req. 1 ("minimum viable input tier") | Unspecified | Now specifiable — **Tier-D: Copernicus GLO-30 + ML building footprints with no height/typology + OSM + a regional hazard value.** Make `provenance.fidelity` an **enum**, not free-form. (R1 §4.3) |
| **C-9** | ADR-003 / any level-pack plan | — | **Licence problem, previously unrecorded.** Maxar Open Data is **CC BY-NC 4.0 — non-commercial**; unusable in a commercial product. ODbL sources (OSM, some Open Buildings) are **share-alike on derived databases**; take Google Open Buildings' **CC BY 4.0** branch and Microsoft's **CDLA-Permissive-2.0** branch. Needs counsel. (R1 §4.2) |
| **C-10** | ADR-001 "assume no GPU… WebGL may be blacklisted or lying" | Rationale | **Decision right, rationale stale.** Chromium is *removing* the SwiftShader fallback: WebGL context creation now **fails outright** rather than degrading, and SwiftShader was never used on mobile anyway. Rewrite the rationale; keep the decision. (R2 §4.3) |
| **C-11** | ADR-001 open question: native vs web | Unresolved | **Resolve to web**, but on our own byte arithmetic. The widely cited Jumia PWA numbers are vendor marketing — mark `[UNVERIFIED]` or drop. (R2 §5) |
| **C-12** | `docs/00-vision.md` "the inversion that makes it work" | Players are the protected population | **Only partly.** The largest reachable player pools (Nigeria, Ethiopia) have low seismic exposure; the high-mortality regions (Indonesia, Türkiye, Iran, Nepal) are different places. West African players are protected by the **preventative survey** mission, not SAR. That makes survey mode the *truthful* half of the inversion, not just the fundable half. (R1 §4.4) |
| **C-13** | `docs/00-vision.md` pipeline: players → corpus → policy | Stated as an arrow | **It is pure offline behavioural cloning, the regime the literature says degrades on long-horizon tasks via covariate shift.** But ADR-002's determinism already contains the fix: replay a policy, find divergence states, **generate a level starting there and let a player correct it** — DAgger where the expert query *is the game*. S09 should make this central; it is also the project's most defensible novelty claim. (R4 §4.3) |
| **C-14** | ADR-004 route 2 ("institutional consent is faster") | Asserted on speed grounds | **Stronger than stated.** 45 CFR 46.408(c)/46.116(f)(3) permit an IRB to waive parental permission for minimal-risk research — but **only for a bounded protocol with an institution behind it, never for an open consumer release**, and never displacing COPPA/GDPR-K. Institutional deployment is the *only* channel where that machinery exists. (R5 §4) |
| **C-15** | `docs/00-vision.md` §TOP GUN | Metric list | Several are **attenuated** (clearance is *in-plane only*; degradation tolerance splits into transferable latency/dropout and non-transferable perceptual parts) or **unsupported** (3D depth judgement, force/contact, aerodynamic handling). Transfer evidence is genuinely weak and inconsistent — pilots beat gamers on UAS tasks (McKinley 2011); gamers beat non-gamers on **3 of 24** robotic-sim metrics in one study and by ~33% in another. State transfer as **a research objective, not a claim.** (R4 §2–3) |

---

## Reality checks to keep in the deck

- Rescue robots: **~28 disasters, six countries, since 2001** — about one a year
  worldwide, all types. The bottleneck has never been the nav policy. (R3 §1)
- Türkiye 2023: ~5,000 rescuers, 90 INSARAG teams, **~300 lives saved** against
  >50,000 deaths. A better local planner helps at the margin of an already tiny
  margin. Say it that way. (R1 §2)
- **RoboTurk favours us**: 137.5 h / 2,200+ teleoperated demonstrations
  crowdsourced over phones, with the explicit finding that *poor network
  conditions did not substantially impair demonstration quality* — C1/C2
  validated by someone else's experiment. (R4 §4.2)
- UNDRR and INSARAG are **legitimacy channels, not procurement channels.** Money
  is JICA / research councils; deployment runs through a national agency
  operator. Foldit, EteRNA and RoboTurk earned institutional standing through
  **one peer-reviewed result each**, not user numbers. Organise S10 around
  producing one. (R5)

## Known gaps, marked and inherited

`[UNVERIFIED]` — no direct 12–14 vs 18–25 teleoperation study; no time-use data
for youth discretionary time in SSA/SEA; no published measurement of WebGL
context-creation failure rates on low-end African Android (we should beacon it);
no open interior-void corpus; **funding instruments not surveyed at all** (R5 §5
— this is the biggest single hole and warrants an S01e).
