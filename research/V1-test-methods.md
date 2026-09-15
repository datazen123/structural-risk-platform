# V1 — Standard test methods for response robots

**Session:** S12. **Date:** 2026-09-08. **Status:** complete for the questions
ADR-005 needs answered; gaps flagged inline.

Evidence rule for this file: every non-obvious claim carries an inline
`[title, org, year, URL]`. Claims I could not verify against a primary source
are marked `[UNVERIFIED]` and stay marked downstream.

---

## 1. Headline answer

**Yes — recognized standard test methods for response robots exist, they cover
aerial systems, and several of them measure exactly confined-space navigation.
ADR-005 is viable, but not in the form it was proposed.**

The proposal assumed one coherent body of "standard test methods" we would map
onto. In reality there are **four distinct bodies**, with different legal
weight, different costs, and very different fit:

| Body | What it is | Aerial? | Confined-space nav? | Free? | Fit for us |
|---|---|---|---|---|---|
| **DHS/NIST/ASTM E54.09** | Consensus standards + free fabrication guides | Yes | Yes (Level 5 lanes; E3479 apertures) | Guides free, ASTM standards paywalled | **Good** |
| **DECISIVE (UMass Lowell / US Army DEVCOM-SC)** | Open handbook of test methods for sUAS in subterranean/constrained indoor space | Yes, exclusively | Yes, explicitly | Yes, fully open | **Best fit** |
| **RoboCup Rescue Robot League** | Annual competition arenas built from the NIST/ASTM methods | **No — ground only, as of 2026A rules** | n/a | Yes | Poor (see §5) |
| **World Robot Summit (Japan/NEDO)** | Disaster-robotics standard performance tests | **No — aerial robots excluded in 2020 rules** | n/a | Yes | Poor (see §6) |

The correction that matters most: **the two Japanese/competition routes the
ADR-005 draft leaned on are the two that do not admit aerial robots.** The two
that do are both American. That is a real problem for a Japan-seeded project
and it is dealt with in §7 and in the ADR-005 recommendation.

---

## 2. DHS / NIST / ASTM E54.09 — the procurement-grade body

### 2.1 What it is and its current status

NIST develops standard test methods for emergency response robots, sponsored by
the DHS Science & Technology Directorate, and standardises them through **ASTM
International Committee E54 on Homeland Security Applications, Subcommittee
E54.09 on Response Robots**. Their stated purpose is to "facilitate quantitative
comparisons of different robot models based on statistically significant robot
capabilities data … to guide purchasing decisions" and to "support operator
proficiency training"
[Standard Test Methods for Response Robots, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots].

The subcommittee designation **E54.09 is current, not superseded** — it remains
the live jurisdiction listing on ASTM's site
[Subcommittee E54.09 on Response Robots, ASTM International, n.d., https://www.astm.org/jurisdiction-e5409].
The S12 brief's parenthetical "(formerly F45-adjacent)" is wrong: ASTM F45
covers driverless automatic guided industrial vehicles and is a separate
committee. **Discard that lead.**

Roughly 30 ground-robot test methods have been adopted "widely across the U.S.
and internationally"
[Standard Test Methods for Response Robots, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots].
The aerial suite is younger: NIST describes "roughly twenty sUAS test methods
under development", ten of which are documented as measures of operator
proficiency for **NFPA 2400**
[Aerial Drone Tests, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/aerial-drone-tests-0].

### 2.2 The structural definition of a "standard test method"

NIST defines every method as four elements: **apparatus, procedure, metric,
fault condition**. Metrics measure "completeness of 10 continuous repetitions of
a task or distance traversed", reduced to *tasks/time* or *distance/time*
[Aerial Drone Tests, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/aerial-drone-tests-0].

This is the single most portable idea in V1 and S09 should adopt it verbatim:
**a result is not a score, it is (repetitions completed / time) with a stated
fault condition and a stated number of trials.** Our benchmark can express that
in simulation without owning a single bucket.

### 2.3 The aerial test-lane hierarchy

Five progressive levels plus a sensor lane
[Aerial Drone Tests, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/aerial-drone-tests-0]:

- **Level 1** — Basic Proficiency Trial (BPERP, Basic Proficiency Evaluation for
  Remote Pilots)
- **Level 2** — Maneuvering Trials
- **Level 3** — Open Test Lanes and Scorable Scenarios
- **Level 4** — Obstructed Lanes and Scorable Scenarios
- **Level 5** — Confined Test Lane and Scenarios
- **Sensor Test Lane**

The Open Test Lane apparatus is deliberately cheap: omni-directional bucket
stands made from 7.5 litre (2-gallon) white buckets with sticker targets inside
[NIST sUAS Open Test Lane Fabrication Guide (v2020B), NIST, 2020, https://www.nist.gov/system/files/documents/2023/09/19/NIST%20sUAS%20Open%20Test%20Lane%20-%20Fabrication%20Guide%20(v2020B).pdf].

### 2.4 Level 5 — the one that matters to us

**Level 5 Confined Test Lane and Scenarios** is the closest published thing to
what our game measures
[Level 5 Confined Test Lane and Scenarios, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/aerial-drone-tests/level]:

- **Apparatus:** dual bucket alignments — pairs of 1-litre buckets with 10 cm
  recessed targets, spaced 1 m apart, forming a right triangle where bucket
  separation equals aircraft standoff. Black and white pairs force the pilot to
  manage camera exposure.
- **Five tests:** Perch, Wall, Ground, Alley, Post. Each guides the pilot
  through 10 positions, orientations and perches.
- **Procedure:** alignment rings inside 90° buckets define the flight path; 45°
  buckets mark the safe standoff where the pilot holds position and works the
  interface to resolve small features.
- **Scoring:** up to 10 points per dual bucket alignment — **5 maneuvering
  points** (alignment ring visible in the full-zoom image) plus **5 acuity
  points** (resolving five gap sizes down to 1 mm). A full trial is 20 bucket
  alignments, **100 points maximum**.

Note the shape of that score: it is 50% *flight precision* and 50% *sensing
payload performance*. Our game measures the first half and cannot measure the
second at all. Any claim we make against Level 5 must say so.

### 2.5 Published ASTM aerial standards — what is real

Verified published designations:

- **ASTM E3426/E3426M-24**, *Standard Test Method for Evaluating Aerial Response
  Robot Endurance* — specifies apparatuses, procedures and performance metrics
  to measure mission endurance for remotely operated aerial response robots
  [E3426/E3426M Standard Test Method for Evaluating Aerial Response Robot Endurance, ASTM International, 2024, https://store.astm.org/e3426_e3426m-24.html].
- **ASTM E3479/E3479M-25**, *Standard Test Method for Evaluating Aerial Response
  Robot Capabilities: Fly Through Apertures* — published 2025; the aperture
  method, i.e. the single most relevant published standard to a confined-space
  navigation claim
  [Subcommittee E54.09 on Response Robots, ASTM International, 2025, https://www.astm.org/membership-participation/technical-committees/committee-e54/subcommittee-e54/jurisdiction-e5409].

Still **work items, not standards** (i.e. drafts, no designation, cannot be
cited as a satisfied standard):

- **WK85836** — New Test Method for Evaluating Aerial Response Robot
  Capabilities: Maneuvering: **Fly Through Confined Spaces**
  [WK85836, ASTM International, n.d., https://www.astm.org/membership-participation/technical-committees/workitems/workitem-wk85836].
- **WK58934** — New Test Method for Evaluating Aerial Response Robot
  Capabilities: Maneuvering: Fly Through Apertures — the work item that appears
  to have become E3479
  [WK58934, ASTM International, n.d., https://www.astm.org/membership-participation/technical-committees/workitems/workitem-wk58934].

Ground-robot standards that the aerial suite reuses and that we may cite:

- **ASTM E2566-17a**, *Standard Test Method for Evaluating Response Robot
  Sensing: Visual Acuity* — used by DECISIVE as the reference method for camera
  stream resolution
  [DECISIVE Test Methods Handbook v1.1, UMass Lowell / US Army DEVCOM-SC, 2022, https://arxiv.org/abs/2211.01801].
- **ASTM E2853/E2853M-22**, Ground Response Robot Capabilities: Search Tasks
  [E2853/E2853M, ASTM International, 2022, https://store.astm.org/e2853_e2853m-22.html].
- **ASTM E2854-12 / E2855-12(2021)**, Radio Communication: Line-of-Sight and
  Non-Line-of-Sight Range
  [E2854, ASTM International, 2012, https://www.astm.org/Standards/E2854.htm];
  [E2855, ASTM International, 2012 (reapproved 2021), https://store.astm.org/e2855-12r21.html].

**The corrected mental model:** the *published* aerial standards are endurance
and apertures. Everything else in the aerial suite — including Level 5 and
"fly through confined spaces" — exists as free NIST fabrication guides and
draft work items, **not as citable ASTM standards**. That distinction is exactly
the kind of thing a procurement officer checks, so S09 and S10 must not blur it.

### 2.6 Cost and access

NIST fabrication guides, forms books and overview decks are **free PDFs** on
nist.gov (all cited above are open). ASTM standards themselves are **paywalled,
sold per document** via store.astm.org. Exact prices not verified
`[UNVERIFIED]`. Practically: we can implement and cite the *methods* from the
free NIST material, but we cannot reproduce ASTM normative text, and claiming
"tested per ASTM E3479" without owning and following the standard would be
misrepresentation.

### 2.7 Is it used outside the US?

NIST asserts adoption "widely across the U.S. and internationally" for the
ground suite
[Standard Test Methods for Response Robots, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots].
E54.09 meetings have been held in Toronto and elsewhere
[2017.06 ASTM E54.09, Toronto, Canada, NIST, 2017, https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/events-and-meetings-7].
The World Robot Summit explicitly positioned its own standard performance tests
as "complementary to the current NIST STMs for USAR and EOD"
[Standard Disaster Robotics Challenge, World Robot Summit / NEDO, 2018, https://wrs.nedo.go.jp/en/wrc2018/disaster/standard.html] —
which is direct evidence that Japanese disaster-robotics researchers know and
reference the NIST body.

**But:** I found no evidence of formal adoption of E54.09 methods by a Japanese
procuring authority (消防庁, prefectural fire services, MLIT). Treat "Japanese
fire services procure against ASTM E54.09" as **false until shown otherwise**;
the honest claim is "the vocabulary is recognised by Japanese disaster-robotics
researchers", not "it is the Japanese procurement standard". `[UNVERIFIED]` in
the stronger form.

---

## 3. DECISIVE — the best available fit, and it is free

**DECISIVE Test Methods Handbook: Test Methods for Evaluating sUAS in
Subterranean and Constrained Indoor Environments, Version 1.1**, 21 authors led
by Adam Norton, University of Massachusetts Lowell, under U.S. Army DEVCOM
Soldier Center contract W911QY-18-2-0006, dated October 2022, approved for
public release (PAO #PR2022_47058)
[DECISIVE Test Methods Handbook v1.1, UMass Lowell / US Army DEVCOM-SC, 2022, https://arxiv.org/abs/2211.01801].

### 3.1 Why it is the best fit

Its scope assumptions are almost exactly our problem statement: sUAS that
**(1) operate without GPS** and **(2) are ≤91 cm prop-tip to prop-tip** (i.e.
fit through a typical doorway). Nine categories: communications, field
readiness, interface, obstacle avoidance, **navigation**, mapping, **autonomy**,
trust, situation awareness. Every method follows *Purpose / Summary / Apparatus
and Artifacts / Equipment / Metrics / Procedure / Example Data*
[ibid.].

It was used to benchmark eight real platforms — Cleo Robotics Dronut X1P, FLIR
Black Hornet PRS, Flyability Elios 2 GOV, Lumenier Nighthawk V3, Parrot ANAFI
USA GOV, Skydio X2D, Teal Golden Eagle, Vantage Robotics Vesper — with results
in a separate benchmarking data report
[ibid.]. **That is a published comparison set of fielded systems**, which is
precisely the thing ADR-005 wanted and which private metrics cannot buy.

### 3.2 The metrics S09 should report in

**Navigation Through Confined Spaces** and **Navigation Through Apertures**
share a metric set [ibid.]:

| Metric | Definition (verbatim sense) |
|---|---|
| **Duration** | Time from full body crossing into side B until crossing back into side A after the desired number of trials |
| **Efficacy** | Whether the sUAS can successfully navigate the space at all (A→B→A) |
| **Completion** | Successful trials / attempted, as a percentage — reported *with* the implied probability of success and confidence level (e.g. 10 successes, 0 failures → 85% probability of success at 80% confidence) |
| **Average navigation speed** | Total traversed length / test duration, in m/s |
| **Collisions** | Whether the sUAS contacted the apparatus boundaries (overhead or lateral) |

Conditions to be *declared*, not assumed: aperture type (doorway, window,
manhole) or confined-space type (hallway, tunnel, stairwell/incline, shaft);
lighting on each side (lighted, dark); wall and floor surface textures;
indoor/outdoor on each side [ibid.].

**Position and Traversal Accuracy** decomposes into wall following (parallel and
perpendicular, at 1 m and 2 m standoff), waypoint navigation, linear path
traversal, hallway navigation (in-place 90° turns), corner navigation, and
aperture navigation, with metrics **path deviation** (deviation from a defined
straight-line path) and **waypoint accuracy and precision** [ibid.].

**Obstacle avoidance** metrics: number of collisions across 5 flights; **minimum
distance to obstacle** averaged over 5 flights; **minimum time to collision
(TTC)**, defined as distance-to-obstacle ÷ speed at instant *t*, minimum over
the flight, averaged over 5 flights [ibid.].

**Autonomy** is ranked two ways: **Non-Contextual Autonomy Potential (NCAP)**,
built from an **sUAS Autonomy Level (NAL)** scored 0–4 over Perception,
Modeling, Planning, Execution, combined with a component-potential score; and
**Contextual Autonomy Ranking** over three axes — Environmental Complexity,
Mission Complexity, Human Independence — explicitly "similar to the Autonomy
Levels for Unmanned Systems (ALFUS) framework" [ibid.].

### 3.3 Direct mappings to project artefacts

| DECISIVE metric | Our equivalent | Owner |
|---|---|---|
| Completion (% with confidence) | S09 benchmark success rate | S09 |
| Average navigation speed | S09 time metric | S09 |
| Path deviation | vision doc "path efficiency" | S08 |
| Minimum distance to obstacle | vision doc "clearance discipline" | S08 |
| Minimum time to collision (TTC) | *new* — we do not currently compute this and should | S08 |
| Collisions | S09 collision rate | S09 |
| NAL (Perception/Modeling/Planning/Execution) | field-insertion analysis, S09 task 6 | S09 |
| Declared lighting / surface texture / space type | level-pack `provenance` fields | S04 |

The last row is the cheapest high-value change in this file: **S04's level packs
should carry DECISIVE's condition descriptors as declared fields** (space type,
lighting, surface texture, aperture class), because that is what makes a
simulated result comparable to a physical one.

### 3.4 Honest limits

- DECISIVE is a **handbook**, not a consensus standard. It has US Army
  provenance and public-release clearance, but no ASTM/ISO designation and no
  procurement mandate. It is *credible*, not *binding*.
- It measures a physical aircraft. Several metrics (minimum distance to
  obstacle, TTC, mapping accuracy, visual acuity) require a real sensor and a
  real tracking system. In our 2.5D sim, path deviation, completion, speed and
  collisions are computable; **acuity and mapping are not**, and TTC is only
  computable against sim geometry, which is not the same claim.
- Version 1.1 is dated October 2022. Whether a later version exists is
  `[UNVERIFIED]`; the arXiv record shows a January 2023 revision of v1.1.

---

## 4. Do any of these score a *learned* policy?

This was the brief's second key question. Answer: **partially, and only
DECISIVE.**

- The NIST/ASTM aerial methods are written around **remote pilots** and
  **airframe/payload capability**. Level 1 is literally "Basic Proficiency
  Evaluation for **Remote Pilots**". They score a *system*, and are agnostic to
  whether a human or an autonomy stack is flying — but they contain no autonomy
  vocabulary and no way to state what the policy did.
- **DECISIVE's autonomy category is the only one that lets you say what kind of
  autonomy you have** (NAL over perception/modeling/planning/execution, plus
  the contextual environment/mission/human-independence axes). That is the
  vocabulary S09 needs to say "our policy is NAL-3 executing in a
  low-human-independence configuration", rather than "our policy is good".
- **RoboCup Rescue supplies the sharpest single number:** in the 2026A rules a
  lane traverse scores **1 point teleoperated and 10 points autonomous**
  (hands off the interface, end-to-end), with the operator permitted to take
  over and finish for the 1 point
  [RoboCupRescue Robot League Rules 2026A (draft), RoboCup Rescue Robot League, 2025, https://rrl.robocup.org/wp-content/uploads/2025/12/RoboCupRescue-Rules-2026A_Draft.pdf].
  That is the responder community pricing autonomy at 10× teleoperation on an
  identical task. It is a *rhetorically* useful number for S10 even though the
  league is ground-only.

No method in any of the four bodies asks for, or accepts, evidence about *how*
the policy was trained. Training-data provenance is an assurance question, not
a test-method question — see V3.

---

## 5. RoboCup Rescue Robot League — correct the lead

The league builds its arenas from "standardized obstacles based on
DHS-NIST-ASTM International Standard Test Methods for Response Robots"
[RoboCup Rescue, NIST, n.d., https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/robot-competitions-0],
which makes it a useful free proxy for the NIST body.

**But the 2026A rules are ground-robot only.** I searched the full 2026A rules
text: the strings "aerial", "UAV", "flying" and "airborne" do not occur. Robots
are ≤80 kg, "small" is defined as fitting a 30 cm square opening, tethers and
cable handlers are regulated, tasks are valve rotation, key insertion, E-stop
pressing, stair climbing at 35°/40°/45°, and the Best-in-Class awards are
Autonomy, Autonomous Mobility, Autonomous Dexterity, Autonomous Mapping, and
Small Robot
[RoboCupRescue Robot League Rules 2026A (draft), RoboCup Rescue Robot League, 2025, https://rrl.robocup.org/wp-content/uploads/2025/12/RoboCupRescue-Rules-2026A_Draft.pdf].

Secondary sources describing an "Aerial Arena … for small unmanned aerial
systems under 2 kg … station-keeping, obstacle avoidance and line following"
and a "Best-in-Class Small Unmanned Aerial System" award appear to describe an
**earlier edition**; that description is **not** supported by the 2026A rules
and is marked `[UNVERIFIED]` and probably historical.

Structural features worth stealing regardless:

- **Trial cadence:** 5 min setup / 20 min operation / 2 min sensor assessment /
  3 min exit, trials every 30 minutes.
- **Explicit anti-race framing:** "Trial Time Limits are not intended to make it
  a race. Rather, there is enough time for a capable robot to demonstrate a
  statistically significant number of task repetitions. This provides a measure
  of reliability." That is the correct philosophy for S09's harness and it is
  the opposite of a leaderboard.
- **Radio degradation as a scored condition**, with an open-hardware Radio
  Degradation Box from TU Dortmund. Directly relevant to the vision document's
  "degradation tolerance" metric, which V1 now shows is a *recognised* axis and
  not an invention of ours. [ibid.]
- **Pre-mapping is allowed except in the maze** — a clean, checkable definition
  of "held-out" that S09 should mirror.

---

## 6. World Robot Summit — correct the lead harder

The WRS Disaster Robotics Category (NEDO, Japan) comprised the **Plant Disaster
Prevention Challenge**, the **Tunnel Disaster Response and Recovery Challenge**,
and the **Standard Disaster Robotics Challenge**, the last of which "assesses,
in the form of a contest, the standard performance levels of a robot that are
necessary for disaster prevention and emergency response" and develops standard
performance test methods (STMs) "complementary to the current NIST STMs for
USAR and EOD"
[Standard Disaster Robotics Challenge, World Robot Summit / NEDO, 2018, https://wrs.nedo.go.jp/en/wrc2018/disaster/standard.html].

**The disqualifying fact:** the WRS 2020 Standard Disaster Robotics Challenge
rules state a maximum weight of 130 kg, a 1.2 m × 1.2 m start footprint, one
robot only, remote or autonomous, operated without direct line of sight — and
**"Aerial robots are not acceptable."**
[Standard Disaster Robotics Challenge, World Robot Summit / NEDO, 2020, https://wrs.nedo.go.jp/en/wrs2020/challenge/disaster/standard.html]

Achievements of the 2018 preliminary competition are documented in the
peer-reviewed literature
[The World Robot Summit disaster robotics category – achievements of the 2018 preliminary competition, Advanced Robotics, 2019, https://www.tandfonline.com/doi/full/10.1080/01691864.2019.1627244].

Whether a WRS event after WRS 2020 (held 2021) has taken place or is scheduled,
and whether any later edition admits aerial robots, is `[UNVERIFIED]` — I could
not confirm a post-2021 edition from a primary source. **Do not put WRS in a
deck as a live benchmark venue for an aerial system without re-checking.**

Japan-specific regimes I looked for and did **not** find as published,
citable evaluation standards for aerial SAR robots: a 消防庁 (FDMA) robot
evaluation standard, and a NIED aerial-robot test method. FDMA's activity that I
*could* verify is procurement and training, not test-method publication — see
V5. Treat "Japan has its own SAR-drone test standard" as **unsupported**.

---

## 7. Can S09's benchmark be expressed in these terms?

**Yes, for a defined subset, and the subset should be stated as a table of what
simulation can and cannot discharge.** Draft of that table, for S09 to adopt:

| Method / metric | Sim can discharge? | Note |
|---|---|---|
| DECISIVE Completion (% + confidence) | **Yes** | Requires ≥10 trials per configuration to state confidence honestly |
| DECISIVE Duration, Average navigation speed | **Yes** | Sim time only; state that it is not wall-clock flight |
| DECISIVE Collisions | **Yes** | Against sim geometry |
| DECISIVE Path deviation | **Yes** | Needs a defined reference path per level — S04 must emit one |
| DECISIVE Minimum distance to obstacle | **Partly** | Computable, but 2.5D geometry ≠ real clearance |
| DECISIVE Minimum TTC | **Partly** | Same caveat; still worth reporting |
| DECISIVE NAL / contextual autonomy ranking | **Yes** | It is a declaration about architecture, not a measurement |
| DECISIVE mapping accuracy/resolution, visual acuity | **No** | Requires real sensors and photogrammetry |
| NIST Level 5 maneuvering points (5/alignment) | **Approximable** | If S04 can generate the dual-bucket alignment geometry |
| NIST Level 5 acuity points (5/alignment) | **No** | We have no imaging payload |
| ASTM E3479 apertures | **Approximable, not claimable** | We can mirror the task; we cannot claim conformance to a paywalled standard we do not execute |
| ASTM E3426 endurance | **No** | Battery/physics, not gameplay |
| RRL autonomous-vs-teleop 10:1 weighting | **Yes** | Adopt as a reporting convention |

The rule S09 should follow: **report DECISIVE metrics as the headline, mirror
NIST Level 5 and E3479 geometry as apparatus, and never write "compliant with"
where "modelled on" is the true statement.**

---

## 8. What this means for other sessions

- **S04 (procgen)** — new obligation: generate (a) NIST Level-5-style dual
  bucket alignment geometry and (b) DECISIVE aperture/confined-space apparatus
  geometry as level archetypes, alongside real collapse topography; and emit a
  **reference path** per level so path deviation is computable, plus declared
  condition descriptors (space type, lighting, surface texture).
- **S08 (skill metrics)** — add **minimum time-to-collision** and **path
  deviation from a defined reference path** to the metric set; both are
  recognised, both are currently missing.
- **S09 (benchmark)** — adopt the four-element method structure (apparatus,
  procedure, metric, fault condition); report repetitions/time with trial counts
  and confidence, not point scores; publish the discharge table above.
- **S10 (deck)** — the strongest available line is not "we score X" but "we
  score in the same units as the eight platforms benchmarked in the US Army
  DECISIVE report", which a responder can check.

---

## 9. Open items

- Exact ASTM per-standard pricing and whether an academic/consortium licence
  exists. `[UNVERIFIED]`
- Whether DECISIVE v1.2+ or a successor exists. `[UNVERIFIED]`
- Whether any Japanese authority procures against E54.09 methods. `[UNVERIFIED]`
- Whether a post-2021 World Robot Summit edition exists and whether it admits
  aerial robots. `[UNVERIFIED]`
- The DECISIVE Benchmarking Data Report [Norton et al., 2023] — the actual
  eight-platform numbers. Not retrieved. **High value: it is the baseline our
  benchmark would be compared against.** Retrieve before S09 starts.
