# R6 — Addressable attention & minimum viable session

**Session:** S01. **Date:** 2026-09-08.
**Two of this session's three priority questions live here.** This thread is
design input, not background.

---

## PART A — Validating the demographic assumption

> `sources/Gamified_Drone_Search_and_Rescue_System.md` asserts the project should
> target *"optimal pilot demographics such as middle-school aged youth and
> gamers"* and speaks of *"the hyper-responsive motor control, spatial reasoning,
> and rapid reaction times of target demographics (middle school students and
> digital gamers)."*
>
> **This assumption is not supported by the literature. On every axis we can
> find evidence for, 18–25-year-olds match or beat 12–14-year-olds.**

This matters more than any other finding in S01, because it is the assumption
that creates C4, ADR-004, the S11 governance workstream, the IRB dependency,
the jurisdiction-aware consent machinery, and the largest single item of
non-technical risk in the programme.

### A.1 Reaction time and processing speed peak *after* middle school, not during

- Processing speed improves steeply from ~5 to ~15 years and **reaches adult
  levels around age 15**. One analysis found the regression coefficient falling
  from 1.82 in 10-year-olds to 1.00 in 15-year-olds and young adults — i.e.
  10-year-olds are ~1.8× slower than adults — and **no significant differences
  between the 15–18 and 20–30 groups**
  [Case Study: Reaction Time of Children According to Age, *Procedia
  Engineering*, 2017,
  https://www.sciencedirect.com/science/article/pii/S1877705817319239].
- Reaction time improves roughly **three-fold across ages 4–17**
  ["Speeding-up while growing-up", 2021,
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8443039/].
- **Disagreement recorded:** the same *Procedia* study reports no significant
  difference between its 8–9 and 10–14 bands, which would place middle-schoolers
  in the still-developing plateau rather than at adult level. Other analyses put
  convergence at ~15. Either reading places **12–14 at or below adult
  performance, never above it.** No source found placed a middle-school peak.

### A.2 In an ecologically valid game task, performance is flat to 24, then declines

The best-matched study in existence for our question analysed **870 hours of
StarCraft II from 3,305 players aged 16–44** (mean 21.7) and fitted a piecewise
regression to within-game, self-initiated response time:

- The breakpoint is **age 24** (likelihood-ratio CI [20, 29]).
- **Before the breakpoint there is "no evidence of a general effect of age" —
  the trajectory is flat.**
- After it, decline is persistent regardless of skill: a Bronze player at 39 is
  ~150 ms slower than an otherwise-equal 24-year-old (~10 ms/year).
- Older players compensate with strategy — more unique hotkeys per timestamp,
  more offscreen actions, simpler unit compositions, better minimap use (all
  p<0.001).

[Over the Hill at 24: Persistent Age-Related Cognitive-Motor Decline in Reaction
Times in an Ecologically Valid Video Game Task Begins in Early Adulthood,
Thompson, Blair & Henrey, *PLOS ONE* 9(4):e94215, 2014,
https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0094215]

**Note the sample floor: 16.** This study cannot speak about 12–14 at all. What
it establishes is that **16–24 is a flat plateau**, so there is no age gradient
inside the young-adult band that a 12–14 cohort could beat.

Adult-lifespan data agrees on the direction: simple RT latencies rise only
**20–40 ms between ages 20 and 65**, and choice RT rises ~2.80 ms/year, with
>80% of the age effect in central processing rather than motor output
[Factors influencing the latency of simple reaction time / Age-related slowing
of response selection and production, Woods, Wyma, Yund, Herron & Reed,
*Frontiers in Human Neuroscience* 9, 2015,
https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00193/full].

### A.3 Revealed preference: elite competitive gaming peaks at ~21, not ~13

Prize-earnings analysis across esports 1997–2023 puts **peak earnings at age
21.2**, with Battle Royale and sports titles peaking ~19 and FPS/MOBA/fighting
~21 [The Golden Age of Esports Players: Age, Prize Distributions, and
Competitive Lifespans From 1997 to 2023, Kang, *Simulation & Gaming*, 2026,
https://journals.sagepub.com/doi/10.1177/10468781251371070 — abstract accessed
via secondary summary; the article itself is paywalled `[UNVERIFIED: exact
figures not read in the primary text]`].

If middle-schoolers were the optimal pilots, an industry that pays millions for
reaction speed and spatial reasoning would have found them. It has not.

### A.4 Fine motor control is *not* mature at 12–14

- In 225 adolescents aged 11.1–16.5 (mean 13.5) — squarely the target band —
  **biological maturity (bone age), not chronological age, predicted complex
  sequential fine-motor performance**, explaining 79.8% of sequential
  finger-tapping variance on the dominant hand versus 20.2% for chronological
  age. Where musical training existed, **experience** became the dominant
  predictor (62–80% of variance)
  [The contributions of biological maturity and experience to fine motor
  development in adolescence, *Scientific Reports*, 2026,
  https://pmc.ncbi.nlm.nih.gov/articles/PMC12894658/].
- The same paper cites adult-lifespan work finding a **U-shaped distribution of
  repetitive fine-motor speed peaking at around age 38**.

Two consequences. First, a 12–14 cohort is *heterogeneous in maturation*, which
adds nuisance variance to exactly the metrics we want. Second, **training
history dominates age** — which points at recruiting for gaming experience, not
for youth.

### A.5 Motor learning rate does not favour children either

- **Adults show greater reductions in response time during practice** than
  children; children and adults improve at similar *rates* across blocks but
  adults start and stay ahead
  [Developmental contributions to motor sequence learning,
  https://pubmed.ncbi.nlm.nih.gov/19363605/].
- The one genuine child advantage found: **offline consolidation.** Children
  show the largest gains across 5 h and 24 h rest intervals
  [Children exhibit a developmental advantage in the offline processing of a
  learned motor sequence, *Communications Psychology*, 2024,
  https://www.nature.com/articles/s44271-024-00082-9].

**And ADR-004 forecloses our ability to observe that advantage anyway.** Rule 4
of ADR-004 bans session-linking across days without consent, so cross-day
consolidation is unmeasurable in our default configuration. The single axis on
which children out-perform adults is the one axis our own governance rules make
invisible to us.

### A.6 Are gamers as good as pilots? Not on the tasks that matter

- **Pilots significantly outperformed both video-game players and controls on
  multi-attribute cognitive tasks** in a 30-participant, three-group study of
  UAS-relevant tasks
  [Operator selection for unmanned aerial systems: comparing video game players
  and pilots, McKinley, McIntire & Funke, *Aviat Space Environ Med* 82(6), 2011,
  https://pubmed.ncbi.nlm.nih.gov/21702315/].
- In robotic-surgery simulation, gamers (≥6 h/week) beat non-gamers on **3 of 24
  performance metrics** — a real but narrow effect
  [A prospective study of the effect of video games on robotic surgery skills
  using the high-fidelity VR RobotiX simulator, 2019,
  https://pmc.ncbi.nlm.nih.gov/articles/PMC6699361/]. Other studies report
  larger gaming effects (e.g. ~33% higher overall robotic performance scores)
  [Video gaming improves robotic surgery simulator success, *J Robot Surg*,
  2023, https://link.springer.com/article/10.1007/s11701-023-01540-y].
  **The literature disagrees on effect size; it agrees the effect is positive
  and modest.**

### A.7 Adolescents are not even reliably more impulsive in the useful direction

Adolescents are an *intermediate* phenotype: children prefer risky options most,
adolescents are intermediate, young adults are most risk-averse; and in
known-probability tasks adolescents take **fewer** risks than children and only
slightly more than adults
[Decision-Making Under Risk in Children, Adolescents, and Young Adults,
*Frontiers in Psychology* 2:72, 2011,
https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2011.00072/full].
The adolescent risk effect is strongest in **arousing, peer-observed contexts** —
which a solo mobile game is not.

### A.8 Verdict

| Axis | Who wins | Confidence |
|---|---|---|
| Simple / choice reaction time | 15–24 ≥ 12–14 | **High** |
| In-game cognitive-motor RT | flat 16–24; nothing supports <16 | **High** |
| Peak competitive performance | ~19–21 | Moderate-high |
| Complex fine motor control | 18–25 > 12–14 (maturity-limited) | **High** |
| Motor learning rate (online) | adults | Moderate |
| Offline consolidation | children | Moderate — **and unmeasurable under ADR-004** |
| Gaming expertise as a predictor | training history ≫ age | **High** |

**The premise is false as stated.** Nothing in the accessible literature
supports middle-schoolers as optimal pilots; several lines of evidence place the
optimum at roughly **17–24**, and the strongest single predictor is not age at
all but **hours of prior gaming**.

**Honest caveat, stated once and kept:** `[UNVERIFIED]` — **no study was found
that directly compares 12–14-year-olds with 18–25-year-olds on a drone
teleoperation or confined-space navigation task.** The verdict above is an
inference across adjacent literatures (developmental RT, ecological game RT,
fine-motor maturation, motor learning, operator selection). It is a strong
inference and it points one way, but it is an inference. Do not present it as a
direct finding.

### A.9 What this buys the project

Launching **18+ first** (or at the local age of digital consent):

- Removes verifiable parental consent — which ADR-004 already identifies as
  possibly *the binding constraint on launch markets*, and which is genuinely
  unsolved offline on a low-end phone.
- Removes COPPA / GDPR-K exposure at launch. Keeps the design rules (no PII,
  opaque ID, kinematic-only) as a *differentiator* rather than a *requirement*.
- Removes the IRB critical path before first data.
- Resolves the open question in ADR-004 **without needing to argue about it** —
  the data does not require minors, so the trade never has to be made.
- Costs, by the funnel in Part B, roughly **30% of the addressable pool** in
  Sub-Saharan Africa. Not zero. Not decisive.

Recommended sequencing: **18+ launch → prove the pipeline → add a minors' cohort
via institutional consent (schools, STEM clubs) once the machinery and legal
review exist.** That is ADR-004's own third listed route, and R6 now supplies
the evidence that taking it costs almost nothing scientifically.

---

## PART B — Available attention (R-P005-2)

### B.1 The funnel, Sub-Saharan Africa

Base: R2 §1.3 — 230 m people in SSA use mobile internet on a smartphone (2023).
That is the technical ceiling; everything below is a further discount.
**Every step's assumption is stated. Steps 3–7 are assumptions, not data.**

| # | Step | Basis | Low | Central | High |
|---|---|---|---|---|---|
| 1 | SSA population | GSMA ME SSA 2024 | 1,190 m | 1,190 m | 1,190 m |
| 2 | **Uses mobile internet on a smartphone** | GSMA ME SSA 2024 Fig 1 — *data* | 230 m | 230 m | 230 m |
| 3 | × share aged 10–24 among smartphone users | Africa median age 19.5, ~60% under 25 [UN WPP 2024 via Pew, https://www.pewresearch.org/short-reads/2026/05/19/5-facts-about-africas-population-growth/]; youth over-represented among smartphone users — **assumption 33 / 40 / 48%** | 76 m | **92 m** | 110 m |
| 4 | × plays mobile games at all | Africa 304 m mobile players, 95% of gamers on smartphone/tablet [Carry1st/Newzoo Africa Games Industry Report 2024, https://www.carry1st.com/press/africas-gaming-market-reaches-1-8bn-sixfold-growth-vs-row-driven-by-32mn-new-gamers-in-2024] — implies near-saturation; **assumption 55 / 70 / 85%** | 42 m | **64 m** | 94 m |
| 5 | × can afford discretionary data | ITU: data unaffordable in ~60% of LMICs; 2 GB = 4.2% of GNI p.c. in Africa vs 2% target [ITU 2024] — **assumption 25 / 40 / 60%** | 10.5 m | **26 m** | 56 m |
| 6 | × has exclusive-enough device access for a multi-minute session | Household phone sharing ~39–40% in Nigeria/Kenya vs 8–9% in Japan `[UNVERIFIED — SPUX consumer survey via secondary aggregation; primary not located]`; minors typically use a parent's handset — **assumption 50 / 65 / 80%** | 5.3 m | **17 m** | 45 m |
| 7 | **Addressable attention pool (10–24, SSA)** | | **~5 m** | **~17 m** | **~45 m** |
| 8 | × realistic 3-year cumulative install penetration | **assumption 0.5 / 2 / 6%** | 26 k | **340 k** | 2.7 m |

**A single number here would be false precision.** The band that matters is
step 7: **5–45 million, centrally ~17 million** people in Sub-Saharan Africa are
plausibly reachable at all. Step 8 is a marketing estimate and should be treated
as the least reliable line in this file.

### B.2 The 18+ variant — what the consent-free path costs

Recomputing steps 3–6 for **18–25 only** (population share of SSA ≈ 15%;
assume 22% of smartphone users, since young adults are the most over-represented
smartphone-owning cohort; device exclusivity rises to ~85% because adults own
their handset):

| Step | 10–24 (central) | 18–25 only (central) |
|---|---|---|
| Age-band smartphone users | 92 m | 50 m |
| × plays games (70%) | 64 m | 35 m |
| × affordable data (40%) | 26 m | 14 m |
| × device exclusivity | 17 m (65%) | **12 m (85%)** |

**Going 18+ costs about 30% of the pool and removes 100% of the consent
apparatus.** That is the trade, quantified. It is not close.

### B.3 What we could not source

`[UNVERIFIED]` — no usable time-use survey data was found for discretionary
leisure time among 10–24-year-olds in Sub-Saharan Africa or Southeast Asia, nor
school-day structure data at a useful granularity. Steps 5–6 above therefore
carry the weight that time-use data should have carried. If the deck needs a
defensible attention figure, this is the gap to close, most likely via national
statistical office time-use modules or the ILO. The GSMA Consumer Survey
microdata would also close the device-sharing gap properly.

Also recorded as a disagreement: Carry1st/Newzoo report **349 m gamers in Africa
(304 m on mobile) in 2024**, which is larger than GSMA's 320 m mobile-internet
users in SSA for 2023. The definitions differ (Africa vs SSA; "gamer" includes
offline and preinstalled play; different years), but the two figures cannot both
be read as the same population. **Use GSMA for market sizing and Carry1st only
for market *growth* narrative.**

---

## PART C — Minimum viable harvest duration (R-P005-3)

### C.1 Method and stated assumptions

This table is a **derivation**, not a citation. The statistical requirements are
sourced; the game-design parameters are our assumptions and are labelled.

Assumptions:
1. Input sampling at **30 Hz** (matches C1's 33 ms frame budget).
2. Within-subject SD of hazard-response latency in a noisy game context
   **σ ≈ 100 ms**. Grounded on: mean simple RT ~231 ms with age effects of
   20–40 ms across four decades [Woods et al. 2015], and a ~150 ms spread across
   15 years of age in an ecological game task [Thompson et al. 2014]. The
   effects we want to resolve are therefore **tens of milliseconds**.
3. Target precision on a per-run mean: **±35 ms usable, ±25 ms good**.
   SEM = σ/√n ⇒ n = 8 and n = 16 respectively.
   Supporting: standardised psychomotor RT protocols report test–retest
   ICC 0.95 (0.97 excluding trial 1) and stabilise in 2–3 trials
   [Reliability and Minimal Detectable Change of the Standardized Assessment of
   Reaction Time, 2023, https://pmc.ncbi.nlm.nih.gov/articles/PMC10496444/].
   Our σ is larger than a clinical protocol's, so we take n ≥ 8 as the floor.
   **Warning inherited from the literature:** *difference* scores need
   order-of-magnitude more trials than means [Hedge, Powell & Sumner, The
   reliability paradox, *Behav Res Methods* 50, 2018,
   https://link.springer.com/article/10.3758/s13428-017-0935-1]. Every
   degradation/load metric below is a difference score. This is why they cost so
   much time.
4. Hazard events requiring a discrete corrective input every **~5 s**; obstacle
   encounters every **~2 s**; junctions every **~7 s**. Dense but playable.
5. One designed traversal ≈ **25 s**.

### C.2 The table

| Metric | Statistical requirement | Min seconds (usable) | Seconds (good) |
|---|---|---|---|
| Input entropy / deadband use | ≥10 samples per bin, 32 bins @30 Hz | **11 s** | 30 s |
| Path efficiency (flown vs optimal) | ≥1 complete traversal (≥3 for a stable mean) | **25 s** | 75 s |
| Control smoothness — **SPARC** | ≥10 movement segments; metric is **independent of movement amplitude and duration** by construction | **30 s** | 60 s |
| Control smoothness — dimensionless jerk | **duration-biased** — see C.3 | **unusable with variable run length** | — |
| Reaction latency (hazard → first corrective input) | n ≥ 8 events (±35 ms); n ≥ 16 (±25 ms) | **40 s** | 80 s |
| Decision latency at branching | n ≥ 6 junctions | **40 s** | 70 s |
| Clearance discipline — *median* margin | n ≈ 20 encounters | **40 s** | 80 s |
| Recovery competence (time-to-stable after disturbance) | n ≥ 5 disturbances × ~8 s each | **40 s** | 80 s |
| Spatial memory (revisit / backtrack cost) | one exploration episode over a level larger than the view | **60 s** | 120 s |
| Search strategy (sweep-pattern classification) | ≥2–3 sweep periods | **60 s** | 150 s |
| Victim-detection rate per metre | ≥3 detection events | **60 s** | 120 s |
| Clearance discipline — *10th-percentile* margin | n ≈ 50 encounters (quantile SE) | **100 s** | 150 s |
| **Degradation tolerance** | **paired within-run**: 2 blocks each meeting the base requirement | **90 s** | 160 s |
| **Load tolerance** | 3 load levels each meeting the base requirement | **130 s** | 240 s |

### C.3 Why the smoothness metric choice is load-bearing

SPARC (spectral arc length) *"quantifies movement intermittencies but is
independent of its amplitude or duration"*, and was designed specifically to
remove the duration bias and noise sensitivity of earlier metrics
[A robust and sensitive metric for quantifying movement smoothness,
Balasubramanian et al., *IEEE TBME*, 2012,
https://pubmed.ncbi.nlm.nih.gov/22180502/].

Jerk-based metrics are duration-dependent. **If run length is a player-facing
variable — which it will be — a jerk-based smoothness score silently encodes run
length and is not comparable across runs.** S08 must use SPARC (or an explicitly
duration-normalised equivalent) and say so in `metrics.v1.md`.

### C.4 The design consequence, stated plainly

**The answer is neither 30 seconds nor 3 minutes. It is ~60 seconds, with a
mode structure.**

- **A 30-second run harvests: input entropy, path efficiency (one traversal),
  and a marginal smoothness estimate.** It does *not* yield reaction latency,
  clearance discipline, recovery competence, or anything in the degradation /
  load family. A game built entirely of 30-second runs would collect a thin
  slice of the metric set and would not support the project's headline research
  claim.
- **A 60–75-second run harvests the entire "supported" core** — everything down
  to and including victim-detection rate.
- **The two metrics `docs/00-vision.md` explicitly names as "the highest-value
  data we can collect" and "the least studied" — degradation tolerance and load
  tolerance — require 90 s and 130 s respectively, and require it *within a
  single run*.** They are difference scores over a within-subject manipulation,
  and ADR-004 rule 4 forbids linking sessions across days by default, so the
  comparison cannot be assembled from separate short runs.

**This is a direct, unnoticed collision between ADR-004 and the vision
document's own statement of what the research contribution is.** It is
resolvable, but only deliberately, and the options are:
1. Make the default run long enough (≥90 s) to carry a within-run manipulation.
2. Ship a distinct, player-chosen **"long mission"** mode at 150–180 s that is
   where degradation/load data is harvested, and accept a lower sample rate.
3. Add an **opt-in linked cohort** (ADR-004 already contemplates this) and
   assemble the comparison across runs for consenting players only.

**Recommendation to S03: default run 60–75 s; a 30-second "quick run" that is
explicitly flagged in telemetry as fast-metrics-only; and a player-chosen
"long mission" at 150–180 s carrying the degradation/load manipulations.**
Option 3 as a later addition, not a launch dependency.

This is compatible with the market: median mobile game session is **5–6 minutes
in 2025**, top-quartile titles 8–9 minutes, hypercasual **3–5 minutes with 5–10
sessions per day**
[2025 Mobile Gaming Benchmarks / GameAnalytics, 2025,
https://files.gameindustrylibrary.com/documents/mobile-gaming-benchmarks-2025.pdf;
https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks].
A 5-minute session comfortably contains four to five 60-second runs.

### C.5 Effect on the C1 telemetry budget

C1 caps telemetry at **8 KB per 3-minute run**; ADR-002 estimates 2–4 KB. Under
the recommended structure the same 6 minutes of play produces six 60-second runs
instead of two 3-minute runs — i.e. **three times as many per-run headers**
(`schema_ver, level_seed, sim_ver, tier, opaque_player_id, started_at_bucket,
outcome, integrity_digest`).

At an assumed ~150-byte header, that is roughly **+300 bytes per 3 minutes of
play, an 8–15% overhead increase on ADR-002's estimate. It stays inside the
8 KB cap.** C1 is not broken.

**But C1's *unit* is wrong.** A per-run byte cap penalises short runs and is
meaningless once run length is a design variable. **C1 should be restated as
"bytes per minute of play, plus a per-run header allowance."** That is an
amendment, and per the project's own convention it needs an ADR — not a quiet
edit.
