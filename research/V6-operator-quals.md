# V6 — Human-operator qualification

**Session:** S12. **Date:** 2026-09-08.
**Primary consumer: S14 / ADR-006 (training & screening product line).**
Secondary consumer: S08 (skill metrics).

---

## 1. Headline answers

**(i) Do operator certification schemes define *measurable* competencies, rather
than pass/fail task completion?**

**Yes — emphatically, in Japan, and in a form our telemetry can compute
directly.** Japan's remote-pilot practical examination is a **100-point
deduction-scored** test with **geometrically defined tolerance zones** (a 2 m
diameter circle for takeoff/landing and hovering; 5 m for the <25 kg limitation
variant; a ~5 m diameter figure-eight), **hard time limits per subject** (8 min /
8 min / 6 min), and an **enumerated deduction schedule** with values of
不合格 / 10 / 5 / 1 points against named fault categories. This is not a rubric.
It is a specification.

**(ii) Is there an accepted competency framework our composite skill profile
could be validated against?**

**Yes.** The Japanese 減点細目 (deduction categories) are, almost item for item, a
list of the constructs the vision document proposes to measure — including
**smoothness**, **heading discipline**, **monitoring/attention allocation**, and
most strikingly **flight under degraded position-hold**, which is a *scored
examination subject*, not an exotic research condition.

**S08's metrics can stop being invented and start being anchored.** That is the
most valuable single finding in this file.

**(iii) Could the game become a recognised training or screening instrument?**

**Screening: yes, and it is the strongest near-term claim. Recognised training:
not on its own — the registration criteria require a physical practical-training
airspace and a real training aircraft.** But there is a specific, named,
high-value route in: the practical *examination* is **waived** for candidates who
complete a course at a **registered training organisation (登録講習機関)** and pass
its completion assessment. We do not have to be that organisation. We can be the
instrument inside ~1,500 of them.

---

## 2. Japan — the certification architecture

### 2.1 Structure

The national qualification is **無人航空機操縦者技能証明**, in two classes:
**一等無人航空機操縦士** (first class, required for Level 4) and **二等無人航空機操縦士**
(second class), with limitation variants (rotorcraft multirotor / rotorcraft /
aeroplane; BVLOS; night; ≥25 kg MTOW). Second-class examinations opened
**2022-12-08**, first-class **2023-01-16**
[レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023-03-17, https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf].

Two routes to the certificate [ibid.]:

| Route | Path |
|---|---|
| **Via a registered training organisation** | Course at a 登録講習機関 → pass its **完了審査 (completion assessment)** → **practical examination waived** → sit the written exam and medical |
| **Direct examination** | Medical + written (CBT) + **practical examination** conducted by the examining body |

Written exam: computer-based, three-option multiple choice, **first class 70
questions / ~75 min**, **second class 50 questions / ~30 min**; subjects are
pilot code of conduct, related regulations, operations, safety management
systems, limitation-related knowledge; **valid for 2 years after passing**
[ibid.].

### 2.2 The practical examination is precisely specified — and it is public

The governing documents are the **無人航空機操縦士実地試験実施基準** (implementation
standard) and per-class, per-aircraft-type **実施細則** (detailed rules). The
second-class rotorcraft-multirotor detailed rules were **enacted 2022-10-07
(国空無機第209322号) and amended 2025-12-05 (国空無機第298768号)** — i.e. they are
current
[二等無人航空機操縦士実地試験実施細則 回転翼航空機（マルチローター）, 国土交通省航空局安全部無人航空機安全課, 2022-10-07 / rev. 2025-12-05, https://www.mlit.go.jp/koku/content/001971375.pdf].

**Scoring.** Deduction scoring from **100 starting points**; a candidate passes a
subject by retaining **≥70 points (second class)** / **≥80 points (first class)**
at its end [ibid., §I.2];
[「無人航空機操縦士実地試験実施基準」の一部改正について, 国土交通省, https://www.mlit.go.jp/koku/content/001971849.pdf].

**Spatial tolerances are physical and marked out on the ground.** The examination
site must have the **減点区画 (deduction zone)** and **不合格区画 (failure zone)**
clearly marked so deviation from the flight path can be detected. Half or more
of the airframe entering the deduction zone is a deduction; half or more
entering the failure zone **terminates the test as a fail**. An examiner's
assistant is stationed to call zone entries but does **not** score
[実施細則, 2025-12-05, §I.3–6, §II.2-5–2-6].

**The defined circle:** for hovering and landing, the specified zone is a circle
of **2 m diameter** centred on the takeoff/landing point (or **5 m diameter** for
the <25 kg MTOW limitation variant) [ibid., note 2].

### 2.3 The deduction schedule — this is the competency framework

Reproduced from the second-class multirotor detailed rules, practical-test
section [ibid., §II.2]:

| Deduction category (減点細目) | Points | Trigger (abridged) |
|---|---|---|
| 航空法等の違反 | **Fail** | Alcohol/drugs; unregistered aircraft; no registration mark; flying without required permission/approval or certificate |
| 危険な飛行 | **Fail** | Dangerous speed (**roughly ≥5 m/s**); approaching examiner/persons/objects to a distance the examiner judges dangerous; not holding the controller with both hands without reason |
| 墜落、損傷、制御不能 | **Fail** | Crash; collision with pylon/flag/wall/net; damaging the aircraft; loss of control; **in figure-eight or circular flight, orbiting without enclosing the centre of the set circular path** |
| 飛行空域逸脱（不合格区画） | **Fail** | ≥half the airframe enters the failure zone |
| 制限時間超過 | **Fail** | Exceeding the subject's time limit |
| 操作介入 | **Fail** | Examiner or assistant takes over the controls for safety |
| 不正行為 | **Fail** | Receiving advice/assistance; obstructing the test; (BVLOS limitation) visually acquiring the aircraft without instruction |
| **飛行経路逸脱** | **5** | ≥half the airframe enters the deduction zone; **or, in hovering and landing, half the airframe leaves the defined circle** |
| **指示と異なる飛行** | **5** | Different procedure or direction from the examiner's instruction; different attitude change; **heading continuously off-instruction to the next waypoint**; moving before receiving the instruction; **failing to return to the flight path within roughly 2 seconds of being told to**; flying at an altitude clearly different from that instructed |
| 離着陸不良 | **5** | Hard impact on touchdown; tipping the aircraft on takeoff/landing |
| **監視不足** | **5** | In VLOS, fixating on the camera image or otherwise not sufficiently monitoring the aircraft and surroundings; in BVLOS, not attending to the camera image |
| **安全確認不足** | **5** | In BVLOS, moving without checking destination and surroundings on camera; taking off without confirming airspace and weather are safe; landing without confirming the landing point and surroundings |
| **ふらつき** | **1** | Large wobble on the instructed path/altitude; large wobble or attitude change on landing; sliding on touchdown |
| **不円滑** | **1** | Abrupt acceleration/deceleration or abrupt turn without reason; abrupt stop without reason; **inability to stabilise speed** |
| **機首方向不良** | **1** | Momentary heading deviation from instruction; large heading wobble |

Grace provision worth noting: for the **first** entry into a deduction zone on
each path segment, no deduction is applied if the candidate returns to the flight
path **within roughly 2 seconds** of being notified [ibid., notes 1 and 4].

### 2.4 The examination subjects

Second-class rotorcraft-multirotor practical test [ibid., §4]:

| # | Subject | Content | Time limit |
|---|---|---|---|
| 4-1 | **スクエア飛行** (square flight) | Position-hold aids **ON**; take off nose forward, climb to **3.5 m**, hover **5 s**; fly the examiner's verbally instructed path in straight lines **with the nose always in the direction of travel**; land | **8 min** |
| 4-2 | **8の字飛行** (figure-eight) | Position-hold aids **ON**; climb to **1.5 m**, hover 5 s; **two continuous figure-eights** with nose in the direction of travel; **circle diameter approx. 5 m**; land | **8 min** |
| 4-3 | **異常事態における飛行** (flight in abnormal conditions) | Position-hold aids **OFF** (GNSS, vision sensors); climb to **3.5 m**, hover 5 s; fly at least one round trip in a straight line **moving laterally with the nose held constantly toward the examiner**; on the examiner's declaration of an emergency, **interrupt and hover in place**; on the instruction to make an emergency landing, **transit at constant altitude by the shortest path to the designated landing point**; land | **6 min** |

The stated purpose of 4-3: to judge whether the candidate has the skill to
**continue flight safely and land when the horizontal position-stabilisation
function malfunctions** [ibid.].

Also examined orally: pre-flight inspection, with a fault schedule of its own
(inspection omission −10; daily inspection record omission or error −5; minor
recording error −1) and its own fail conditions [ibid., §II.1]. Confirmation
items include control link and **GNSS communications**, battery reserve, **Remote
ID function operating normally**, propulsion, and automatic-control/manual-control
systems verified by hovering directly above the takeoff point and exercising each
control axis [ibid.].

First-class rules exist in parallel (一等無人航空機操縦士実地試験実施細則, enacted
2022-10-07, amended 2022-11-14) and add **automatic flight, emergency operations
and post-flight measures** to the practical subjects, plus an oral examination,
and a medical examination by a physician for the ≥25 kg variant
[レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023-03-17, https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf].
The first-class detailed rules PDF was not retrievable at the URL found
`[UNVERIFIED — retrieve current 一等実施細則 before S14 builds on it]`.

---

## 3. Mapping the certification competencies onto our metrics

This is the table S08 and S14 need. Left column is the regulator's construct;
right column is ours.

| Japanese deduction category | Vision-doc metric | Computable from 4-DOF telemetry? |
|---|---|---|
| 飛行経路逸脱 (path deviation from marked zone) | Path efficiency; **DECISIVE path deviation** (V1) | **Yes** — needs a reference path per level (S04 must emit one) |
| ホバリング outside the 2 m circle | Precision hold / clearance discipline | **Yes** — station-keeping error distribution |
| ふらつき (wobble) | **Control smoothness** (jerk/snap spectra) | **Yes** — this is literally our metric |
| 不円滑 (abrupt accel/decel/turn/stop; cannot stabilise speed) | Control smoothness; input entropy | **Yes** |
| 機首方向不良 (heading deviation/wobble) | *Not currently in our list* — **add it** | **Yes** |
| 指示と異なる飛行: return to path within ~2 s | **Reaction latency** (correction onset → recovery) | **Yes**, and note the regulator's threshold is **2 seconds** |
| 制限時間超過 (per-subject time limits) | Task completion time | **Yes** |
| 危険な飛行: speed ≳5 m/s near persons | Speed discipline / clearance | **Yes** |
| 墜落・衝突 | Collision rate | **Yes** |
| **4-3 異常事態: position-hold OFF** | **Degradation tolerance** — the vision doc's highest-value metric | **Yes**, and this is the headline mapping |
| 監視不足 / 安全確認不足 (attention allocation, camera vs. aircraft) | Situational awareness / load tolerance | **Partly** — needs an attention proxy the game can induce; DECISIVE's *Interface-Afforded Attention Allocation* test is the reference [V1] |
| 飛行前点検 (pre-flight inspection, oral) | *Not gameplay* | **No** |

**Three actions fall out of this table:**

1. **S08 must add a heading-discipline metric.** It is a scored competency in the
   national examination and we do not measure it.
2. **S08's "reaction latency" should be reported against the regulator's 2-second
   recovery threshold**, because that turns an invented number into a
   comparison against a published standard.
3. **The vision document's claim that "degradation tolerance … matters most and
   is least studied" needs a correction.** It is not unstudied — it is a
   **scored subject in Japan's national remote-pilot practical examination**
   (subject 4-3, position-hold OFF, 6-minute limit). The honest and stronger
   claim is: *the regulator agrees this is the competency that matters, tests it
   once, pass/fail, on one aircraft — and we can measure it continuously, at
   scale, across a population.* That is a better argument than the original.

---

## 4. Could the game be a recognised training or screening instrument?

### 4.1 The registered training organisation route — and its wall

**登録講習機関 (registered training organisations)** are private operators
registered by MLIT against published criteria. Registration criteria and course
specifications [レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023-03-17,
https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf]:

**Registration requirements (登録基準):**
- **A practical training airspace (実習空域) of a certain size**
- Instructors aged 18+ with recent flight record:
  - First class: **≥1 year flight experience in the last 2 years and ≥100 flight
    hours**, plus **≥1 year as an instructor**
  - Second class: **≥6 months in the last 2 years and ≥50 flight hours**, plus
    **≥6 months as an instructor**
- **A training aircraft (実習機) capable of safely and fairly conducting the
  completion assessment**
- Facilities, equipment and teaching materials required for the course

**Curriculum hours (学科 / 実地):**

| Class | Academic | Practical (basic) | Practical (BVLOS) |
|---|---|---|---|
| First class | ≥18 h (≥9 h experienced) | **≥50 h (≥10 h experienced)** | ≥7 h (≥5 h experienced) |
| Second class | ≥10 h (≥4 h experienced) | **≥10 h (≥2 h experienced)** | ≥2 h (≥1 h experienced) |

MLIT published a **教則 (official textbook basis)** as the course text baseline.
Organisations register at one of three levels — first-class-capable,
second-class-only, and renewal-course-only — and there is a **管理団体
(managing body)** tier that provides materials, training and audit to affiliated
organisations, used for external audit of course delivery [ibid.].

**Market size:** approximately **1,500 drone schools nationally**, of which
**approximately 500 had applied** for registration as at March 2023 [ibid.].

**The wall:** registration requires a **physical practical training airspace and
a real training aircraft**. A game, however good, cannot satisfy those. **We
cannot become a 登録講習機関 on software alone.** Whether simulator hours may
substitute for any portion of the 実地 hours is **`[UNVERIFIED]` — I could not
find a MLIT position either way, and it is the single question that most changes
S14's answer.** Recommend S14 resolve it directly with MLIT or a 管理団体.

### 4.2 What we can be — three viable positions, in order of strength

**(1) A screening and selection instrument. Strongest, and available now.**

The examination measures constructs we can compute from gameplay (§3). Screening
does not require accreditation — it requires **predictive validity**, i.e.
evidence that game performance predicts examination or operational performance.
That is a study, not a regulatory process.

The concrete, fundable proposition: **a 50-hour first-class practical course is
an expensive way to discover someone cannot fly.** An instrument that predicts
completion-assessment outcome before a candidate is enrolled has direct, arguable
economics for the ~500 registering schools and for **fire services whose
personnel's licence costs are publicly subsidised** (V5 §2.2).

The evidence needed is a correlation study: game metrics vs. completion-assessment
outcome, on a cohort at one or more 登録講習機関. That is a small, cheap, highly
credible piece of research and it should be S14's first concrete proposal.

**(2) A supplement inside an existing 登録講習機関's course. Strong, and it routes
around the wall.**

We do not need accreditation to be the pre-training and between-session practice
tool a registered school hands its students, or the material a **管理団体**
distributes to its affiliates. The 管理団体 tier exists precisely to supply
materials, training and audit downward — **it is a distribution channel with a
named regulatory shape.** ADR-006's option 3 ("do not rebuild what exists; feed
into what agencies already own") is the right instinct and this is its Japanese
form.

**(3) Skills maintenance and currency. Plausible, needs a hook.**

Certificates require renewal courses (there is a registered-renewal-organisation
tier), and instructor eligibility is defined by **recency**: recent flight
experience within the last 2 years plus hour thresholds [ibid.]. Anything
denominated in *recency and currency* is a natural fit for a lightweight,
frequently-played instrument. But note: currency is defined in **flight hours on
a real aircraft**, so a game cannot accrue it. The play is **readiness
maintenance** — arguing to a fire service that its drone-qualified personnel stay
sharp between the two annual exercises they actually fly.

### 4.3 The competitor S14 must look at

**JUIDA announced a 「ドローン防災マネージャー」 (drone disaster-prevention manager)
education programme for release within FY2024**, explicitly to train people who
perform **drone air-operations coordination in disasters**, alongside prefectural
disaster agreements and a standing private disaster-response drone organisation
[能登半島地震におけるドローンの組織的活用と課題, JUIDA (内閣府防災 災害対応検討WG 第5回 資料3), 2024-09-04, https://www.bousai.go.jp/jishin/noto/taisaku_wg_02/pdf/siryo5_3.pdf].

That is the incumbent occupying the exact adjacent space, run by the
organisation that ran Noto's drone response and holds Japan's ISO/TC 20/SC 16
domestic secretariat (V5 §2.4). **S14's honest options are compete or partner,
and partner looks obviously right.**

### 4.4 The radio licence gap nobody sells against

A professional Japanese SAR drone operation needs **two** qualifications: the
MLIT skill certificate **and** a MIC **第三級陸上特殊無線技士** for the 169 MHz /
2.4 GHz / 5.7 GHz power classes a real link uses (V2 §2.5). Any training product
positioned as "everything you need to fly professionally" that omits the radio
licence is incomplete. Conversely, it is an unglamorous gap in every competitor's
offering.

---

## 5. EU — for comparison

Not researched to primary sources this session; the Japanese material was
richer, more measurable, and more directly relevant to a Japan-seeded project,
and the search for EASA remote-pilot competency material failed technically.

Known structure, flagged as **`[UNVERIFIED]` pending a proper pass**:
Regulation (EU) 2019/947 open category subcategories A1/A2/A3 with an **A2
Certificate of Competency** (theory exam plus declared self-practical training);
**Standard Scenarios STS-01/STS-02** with associated remote-pilot theoretical and
practical skill training and assessment; specific-category training driven by
the operational authorisation.

**S14 should commission a proper EU pass if the training product targets EU
customers.** The specific question worth answering there: EASA's framework leans
more on *declared self-practical training* than Japan's does, which is a very
different opening for a software instrument — potentially a much better one.

---

## 6. Constraints and obligations this thread generates

1. **S08's metrics are anchored, not invented — and must be reported that way.**
   Wherever a metric corresponds to a Japanese deduction category, name the
   category. It converts "we made up a number" into "we measure what the
   national examination scores".
2. **S08 must add heading discipline.** Currently absent; a scored competency.
3. **S08's reaction-latency metric should be reported against the 2-second
   return-to-path threshold** used in the examination.
4. **S03/S04 must be able to reproduce the examination geometries** — the 2 m
   circle, the ~5 m figure-eight, the square path, the 3.5 m and 1.5 m altitudes,
   the marked deduction and failure zones — as a level archetype. Cheap, and it
   makes a screening claim demonstrable.
5. **S03 must support a position-hold-degraded mode** as a first-class game
   condition, because it is examination subject 4-3 and it is the project's
   highest-value research metric.
6. **We cannot be a 登録講習機関.** Any S14 plan that assumes accreditation of a
   software-only product is assuming something the registration criteria
   exclude.
7. **The vision document's "least studied" claim about degradation tolerance
   needs correcting** (see §3).

---

## 7. Open items

- **Does MLIT accept simulator hours against any part of the 実地講習 hours?**
  The single highest-value open question for S14.
- Current **一等無人航空機操縦士実地試験実施細則** — the URL found returned 404.
- 修了審査 (completion assessment) criteria at 登録講習機関 — are they the same
  deduction schedule? Probably, but unverified.
- Current counts of licence holders and registered organisations (2023 figures
  used throughout; see V2 §2.4).
- EASA remote-pilot competency framework, properly sourced.
- Any published **predictive-validity** literature linking game or simulator
  performance to UAS pilot certification outcome. **Not searched. Directly
  determines whether S14's screening claim is novel or already answered.**
