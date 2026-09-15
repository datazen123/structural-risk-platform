# V3 — Software, autonomy & ML assurance

**Session:** S12. **Date:** 2026-09-08.

This file carries two of the four questions the brief flagged as decisive:

- **(a)** What evidence is required to field a *learned* navigation policy? Is a
  non-deterministic learned component fieldable at all, or only inside a
  deterministic safety envelope with runtime monitoring?
- **(b)** Is a corpus of anonymous minors' gameplay an admissible training-data
  source under an assurance regime?

Both are answered below with primary-source evidence. Both change the project.

---

## 1. Headline answers

**(a) A learned navigation policy is fieldable — but only as a *contained*
component. The deliverable is a policy plus an envelope. Confirmed, not
inferred.**

Three independent regimes converge on the same architecture:

1. **SORA 2.5 Annex E** (the operative EU rule since 2025-09-29) requires that
   **no single failure of the UAS or any supporting external system shall lead
   to operation outside the ground risk buffer**, and that software whose
   development error could *directly* cause that must be developed to a
   recognised industry standard. Example means it names: an **independent Flight
   Termination System**, a **secondary independent emergency flight control
   system**, a **tether**, or a **fail-safe health monitoring system that
   triggers on failure of a critical feature such as navigation**
   [JARUS guidelines on SORA Annex E, Edition 2.5 (JAR_doc_28), JARUS, 2024-06, Containment criterion #4, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Annex-E-Release.JAR_doc_28pdf.pdf].
2. **EASA's AI guidance** provides a whole building block for it —
   **Safety Risk Mitigation (SRM)** — whose named means is "**monitoring of the
   output of the AI/ML constituent and passivation of the AI-based system with
   recovery through a traditional backup system (e.g. safety net)**", and which
   states "**the higher the AI level, the more likely it is that SRM will be
   needed**"
   [EASA Concept Paper: guidance for Level 1 & 2 machine learning applications, Issue 02, EASA, 2024-03-06, Objectives SRM-01/SRM-02, https://www.easa.europa.eu/en/downloads/137631/en].
3. **Japanese disaster operating doctrine** independently requires the crew to
   cease the flight or separate on visual acquisition of a manned aircraft
   (V2 §3.6) — a human-triggered override that must supersede the policy.

So the envelope is not a compliance nicety. It is required by the airspace rule,
by the assurance guidance, and by the operating doctrine, arriving from three
directions. **S09's scope grows accordingly.**

**(b) Not on the grounds the project expected. The minors question is real but
it is the *second* problem. The first is that a 2.5D mobile game corpus is not
representative of the operational domain, and representativeness is a hard,
explicit, published requirement.**

EASA's learning-assurance data objectives require data **completeness**,
**representativeness** ("the distribution of its key characteristics is similar
to the actual input state space for the intended application"), **accuracy**,
**traceability** and **set independence**, all judged against a defined
**Operational Design Domain (ODD)**
[EASA Concept Paper Issue 02, EASA, 2024-03-06, Objectives DM-01…DM-13 and anticipated MOC DM-13-1…DM-13-5, https://www.easa.europa.eu/en/downloads/137631/en].

A corpus of anonymous minors' gameplay fails or strains **four** of those before
the lawfulness question is even reached. Details in §6. **The lawfulness point
in ADR-004 stands and is reinforced, but it is not the binding constraint —
representativeness is.**

---

## 2. Which regime actually applies

The brief's DO-178C lead needs correcting, so state the map plainly.

| Regime | Applies to | Applies to us? |
|---|---|---|
| **DO-178C / ED-12C** | Software in **type-certificated aircraft** (Part 21 / certified category) | **No, not directly.** Only if the platform enters the certified category |
| **SORA 2.5 + Annex E OSOs** | EU **specific category** UAS operations | **Yes** — the realistic EU regime for a SAR/survey drone |
| **EASA AI Concept Paper Issue 2** | AI/ML constituents in EASA-regulated products; guidance, not binding rule | **Yes as the anticipated bar**, no as a present legal requirement |
| **ARP6983 / ED-324** | Process standard for certification of AI-implementing aeronautical products | **Not yet — still in draft** |
| **ISO/IEC TR 5469:2024** | Cross-industry AI + functional safety | Advisory, useful framing |
| **航空法 機体認証 / 型式認証** | Japanese Level 4 aircraft | Only if we chase Level 4 (V2 §2.4 says: don't) |
| **AIST 機械学習品質マネジメントガイドライン** | Japanese ML quality management, non-aviation-specific | Useful as the Japanese-facing vocabulary |

**DO-178C is not the gate for a small SAR UAS.** SORA 2.5 does not name it. What
Annex E says instead is that software whose development error(s) may cause or
contribute to hazardous or catastrophic failure conditions shall be "developed
to an **industry-standard or a methodology considered adequate by the competent
authority** and/or in accordance with means of compliance acceptable to that
authority" (OSO #05, High robustness)
[SORA Annex E 2.5, JARUS, 2024-06, OSO #05, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Annex-E-Release.JAR_doc_28pdf.pdf].
That is deliberately open. DO-178C is *one* acceptable answer, not *the*
requirement.

---

## 3. SORA 2.5 in detail — where a learned policy sits

### 3.1 SAIL and the OSO set

SORA assigns a **SAIL (I–VI)** from the final Ground Risk Class and residual Air
Risk Class; the SAIL determines which of the **17 OSOs** apply and at what
robustness level. "The SAIL represents the level of confidence that the UAS
operation will stay under control", and it is qualitative, not quantitative
[SORA 2.5 Main Body (JAR_doc_25), JARUS, 2024-06, §4.7, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Main-Body-Release-JAR_doc_25.pdf].

Robustness = integrity × assurance, and assurance is graded **Low** (applicant
declaration), **Medium** (supporting evidence — testing, analysis, **simulation**,
inspection, design review, operational experience), **High** (verification by the
competent authority) [SORA Annex E 2.5, ibid.].

### 3.2 The safety-and-reliability objective (OSO #05)

At High robustness, OSO #05 requires, among other things:

- Hazardous failure conditions no more frequent than Extremely Remote;
  catastrophic no more frequent than Extremely Improbable;
- **no single failure can lead to a catastrophic failure condition**;
- software and airborne electronic hardware whose development errors may cause
  or contribute to hazardous or catastrophic failure conditions developed to a
  recognised industry standard or authority-accepted methodology.

Safety objectives may be derived from **JARUS AMC RPAS.1309 Issue 2 Table 3**,
or an equivalent risk-based methodology. As an example, at SAIL III the UAS and
supporting systems' contribution to loss-of-control-of-operation could be
**10⁻⁴/FH**
[SORA Annex E 2.5, JARUS, 2024-06, OSO #05 and notes, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Annex-E-Release.JAR_doc_28pdf.pdf].

**Read the architecture that implies.** "No single failure can lead to a
catastrophic failure condition" plus "software whose error could directly cause
an exit from the ground risk buffer must be developed to a recognised standard"
means: put the learned policy where its failure is not single-point
catastrophic, and put a simple, independent, assurable mechanism where it is.

### 3.3 SORA says nothing about machine learning — and that is the finding

I searched the full text of the SORA 2.5 Main Body and Annex E. The strings
"machine learning", "artificial intelligence", "neural" and "non-deterministic"
**do not appear**. "Autonomous" appears only incidentally.

Interpretation, stated as interpretation: **SORA is architecture-agnostic.** It
does not ban a learned component and it does not have a category for one. It
asks what the operation's risk is and what evidence you have that the operation
stays in control. A learned policy is not disqualified; it is simply *not
creditable* as assurance evidence on its own, and the burden shifts to the
containment and to the evidence you can produce about the operation.

This is genuinely good news for the project — but only if the project stops
describing its output as "a nav policy" and starts describing it as "a nav
policy with a stated insertion point in a contained architecture".

---

## 4. EASA AI guidance — the anticipated bar for a learned component

### 4.1 Document status, and the Level 3 gap

The **EASA Artificial Intelligence Concept Paper Issue 2, "Guidance for Level 1
& 2 machine learning applications", published 2024-03-06**
[EASA publishes Artificial Intelligence Concept Paper Issue 2, EASA, 2024-03-06, https://www.easa.europa.eu/en/newsroom-and-events/news/easa-publishes-artificial-intelligence-concept-paper-issue-02-guidance].

It is a **Concept Paper — guidance, not a binding certification basis.** The
follow-on is integration into generic rules and AMC via **Rulemaking Task
RMT.0742** [ibid.].

Its AI classification, verbatim from the paper
[EASA Concept Paper Issue 02, EASA, 2024-03-06, §Classification, https://www.easa.europa.eu/en/downloads/137631/en]:

| Level | Name | Human oversight |
|---|---|---|
| 1A | Automation support to information acquisition | Full human authority |
| 1B | Automation support to decision-making | Full |
| 2A | Overseen and overridable automatic decision | Full |
| 2B | Overseen and overridable automatic decision | Partial |
| **3A** | **Supervised automatic decision** | **Upon alerting only** |
| **3B** | **Non-supervised automatic decision** | **Not applicable** |
| **Autonomous** | **Non-supervised automatic action implementation** | **Not applicable** |

And the scope statement: the paper is "**covering Level 1 and Level 2 AI
applications, but not covering yet Level 3 AI applications**" [ibid.]. Level 3
guidance is deferred to a future document, and the paper notes "**future work on
Level 3 is likely to increase the number of objectives**" [ibid.].

**This is the single most consequential sentence in V3 for S09.**

An autonomous confined-space navigation policy that flies a search pattern
without a human approving each decision is **EASA AI Level 3A at best and 3B in
its natural form**. There is, as of this session, **no published EASA guidance
for that level at all.** There is not a hard bar we would fail; there is *no
bar defined yet*.

Practically this means:

- **A Level 1B / 2A framing is fieldable now.** "Operator-assist": the policy
  proposes a route or a next waypoint, a human accepts or overrides, full human
  authority retained. Guidance exists, objectives are enumerable, evidence is
  producible.
- **A Level 3 framing has no route to approval in the EU on a known timetable.**
  Not "difficult" — **undefined**. Any roadmap with a date on full autonomy is
  asserting something no regulator has published.

The boundary EASA draws between 2B and 3A is precisely about oversight: at 2B
the human oversees every decision and/or action implementation; at 3A they do
not, and are involved only upon alerting. The 3A/3B boundary "will be refined
when developing the level 3 AI guidelines" [ibid.].

### 4.2 Safety Risk Mitigation — the envelope, named

**Objective SRM-01:** once all other building blocks are defined, the applicant
should determine whether coverage of the explainability and learning-assurance
objectives is sufficient, or whether "**an additional dedicated layer of
protection, called hereafter safety risk mitigation (SRM)**" is needed to bring
residual risk to an acceptable level. Considerations include coverage of the
explainability and learning-assurance blocks, in-service experience, **AI level
(the higher the level, the more likely SRM is needed)**, and criticality of the
AI/ML constituent
[EASA Concept Paper Issue 02, EASA, 2024-03-06, §5.2, https://www.easa.europa.eu/en/downloads/137631/en].

**Objective SRM-02**, anticipated MOC: means that may be used include
"**monitoring of the output of the AI/ML constituent and passivation of the
AI-based system with recovery through a traditional backup system (e.g. safety
net)**", and where relevant, giving the end user the ability to switch the ML
function off. The SRM functions "should be evaluated as part of the safety
assessment", and "**this may include independence requirements to guarantee an
appropriate level of independence of the SRM architectural mitigations from the
AI/ML constituent**" [ibid.].

The paper also states the underlying intent plainly: "until field service
experience is gained, appropriate safety precautions should be implemented to
reduce the risk to occupants, third parties and critical infrastructure" [ibid.].

And a limit that matters: **"SRM is solely meant to address a partial coverage
of the applicable explainability and learning assurance objectives. SRM is not
aimed at compensating partial coverage of objectives belonging to the
trustworthiness analysis building blocks (e.g. safety assessment, information
security, ethics-based objectives)."** [ibid.]

**You cannot buy your way out of bad data with a good monitor.** The envelope
buys down residual risk from imperfect learning assurance; it does not excuse
the safety assessment, the security case, or the ethics assessment. That
directly closes the escape hatch the project might otherwise reach for on the
minors-data question.

### 4.3 The learning-assurance objectives S09 must plan against

The framework is the **W-shaped learning process**, refined in Issue 2
[EASA publishes Artificial Intelligence Concept Paper Issue 2, EASA, 2024-03-06, https://www.easa.europa.eu/en/newsroom-and-events/news/easa-publishes-artificial-intelligence-concept-paper-issue-02-guidance].
EASA's **MLEAP** research project exists specifically "to identify concrete
means of compliance for the 'Learning Assurance' block", and proposed a generic
development pipeline as a practical implementation of the W-shape
[Machine Learning Application Approval — MLEAP, EASA, n.d., https://www.easa.europa.eu/en/research-projects/machine-learning-application-approval];
[MLEAP Final Report, EASA research project EASA.2021.C38, https://www.easa.europa.eu/sites/default/files/dfu/mleap-d4-public-report-issue01.pdf].

The Data Management objectives, which are the ones that bite for us
[EASA Concept Paper Issue 02, EASA, 2024-03-06, §3.1.3, https://www.easa.europa.eu/en/downloads/137631/en]:

| Obj. | Requirement (paraphrased, verbs preserved) |
|---|---|
| DM-01 | Define the parameters pertaining to the AI/ML constituent's ODD |
| DM-02 | Capture Data Quality Requirements (DQRs) for all data in the pipeline |
| DM-03 | Capture requirements on data to be pre-processed |
| DM-04/05 | Validate correctness and completeness of operating parameters |
| **DM-06** | **Identify data sources and collect data in accordance with the defined ODD, satisfying the DQRs, to drive selection of training/validation/test sets** |
| DM-07 | Ensure high quality of annotated/labelled data |
| DM-08…DM-11 | Data preparation, pre-processing, transformations, normalisation |
| DM-12 | Distribute data into three separate and independent sets |
| **DM-13** | **Validate and verify the data** |

The anticipated means of compliance under DM-13 are the operative tests:

- **DM-13-1 Data completeness**
- **DM-13-2 Data representativeness** — "A data set is representative when the
  distribution of its key characteristics is similar to the actual input state
  space for the intended application"
- **DM-13-3 Data accuracy, correctness**
- **DM-13-4 Data traceability** — "The applicant should establish an
  **unambiguous traceability from the data sets to the source data, including
  intermediate data. Each operation should be shown to be reproducible.**"
- **DM-13-5 Data sets independence** — for highly critical applications, the
  test set must share **no common data point** with training/validation, and
  "**should be ideally collected from real data**, complemented by synthetic
  data where appropriate"

[ibid.]

DM-06 explicitly contemplates external sources, "open-source or sourced via a
contract to be established between the applicant and the data provider", and
explicitly permits data augmentation and **synthetic data (e.g. coming from
models, digital twins, virtual sensors)** to address gaps in completeness or
representativeness [ibid.].

**That last clause is our best available foothold and it should be read
carefully.** Synthetic and model-derived data are contemplated — as a
*complement* to real data addressing a *stated gap*, not as the primary corpus,
and never for the independent test set of a highly critical application.

---

## 5. Simulation as evidence — the answer, and the bill

**Yes, simulation is accepted as assurance evidence in the EU specific
category — conditionally, and the condition is the expensive part.**

SORA 2.5 Annex E, at Medium level of assurance, permits the applicant to
evidence integrity "by testing, analysis, **simulation**, inspection, design
review or through operational experience", with the recurring proviso, repeated
across OSOs #05, #08, #19, #20 and the containment criteria:

> **"When simulation is used, the validity of the simulation needs to be
> justified."**
>
> and, in the containment/testing context: "**When simulation is used, the
> suitability of the targeted environment used in the simulation needs to be
> justified.**"

At **High** assurance, the requirement escalates: "**The procedures, flight
tests and simulations are validated by a competent third party.**"
[SORA Annex E 2.5, JARUS, 2024-06, OSO #05, #08, #19, #20 and Containment, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Annex-E-Release.JAR_doc_28pdf.pdf]

So the chain is: simulation → justify the simulator's validity → justify the
suitability of the simulated environment → at high robustness, have both
validated by an independent competent third party.

**Consequences, which C6 must carry:**

1. **The C6 placeholder was right.** Our 2.5D game sim will not qualify. It is
   not a rotorcraft model, it does not model aerodynamics in ground effect or in
   confined spaces (a real and documented effect — DECISIVE tests hallway wind
   eddy currents specifically, see V1), and its "targeted environment" is a
   procedural abstraction of collapse topography, not a validated model of one.
2. **A separate, narrow, high-fidelity validation simulator is a required and
   currently unbudgeted component.** Not a nice-to-have. It is the artefact that
   converts gameplay-derived policy into anything an authority can look at.
3. **Third-party validation of that simulator is a line item** — money and
   calendar time, from an entity that is not us.
4. There is a cheaper intermediate: use the game sim to *generate and select*
   policy, and the validation sim only to *evaluate* it. That splits the
   fidelity problem so that only the evaluation path needs justification. S09
   and S03 should adopt this split explicitly.

Also relevant: EASA's DM-13-5 states the test set "should be ideally collected
from **real data**". A validation programme that is simulation end-to-end, with
no real flight data anywhere, will not clear a high-criticality bar.

---

## 6. Question (b): is a corpus of anonymous minors' gameplay admissible?

Answer in three parts, in the order the objections actually bite.

### 6.1 First objection: representativeness (DM-13-2). This is the binding one.

The ODD of the target application is *a physical rotorcraft in a partially
collapsed structure, with real sensors, real aerodynamics, real degraded comms*.
The corpus is *finger inputs to a 2.5D abstraction on a low-end Android phone*.

"A data set is representative when the distribution of its key characteristics
is similar to the actual input state space for the intended application"
[EASA Concept Paper Issue 02, DM-13-2, EASA, 2024-03-06].

Under any honest reading, the input state space of the game is **not** the input
state space of the aircraft. The dynamics differ, the observation model differs,
the failure modes differ, the action space differs.

**This is not fatal, but it forces a reframing.** The defensible claim is not
"this corpus is training data for a certified navigation function". It is:

> The corpus is a source of **human navigation strategy priors** in a
> topologically faithful abstraction of collapse voids. It is used to shape
> policy search. The policy is then evaluated against ODD-representative data in
> a validated simulator and, ultimately, real flight.

That claim survives DM-13-2 because the corpus is no longer being offered as
the ODD-representative training set; it is a **strategy prior** whose value is
demonstrated by downstream evaluation on representative data. It is a weaker,
truer, and much more defensible claim than the one currently implied by the
vision document's arrow chain.

**S10 must not draw the arrow "gameplay → training data → certified policy"
without this qualification.** Doing so invites the exact objection that ends the
conversation.

### 6.2 Second objection: traceability (DM-13-4). Solvable, and ADR-004 helps.

DM-13-4 requires "unambiguous traceability from the data sets to the source
data, including intermediate data. Each operation should be shown to be
reproducible."

Read precisely, this is a requirement about **the data lineage**, not about
**identifying the human**. A session record with an opaque ID, a schema version,
a level-pack hash, a client tier and a reproducible transform chain satisfies
traceability. Anonymity does not defeat it.

**ADR-004's design is therefore an asset here, not a liability** — provided S04
and S06 preserve immutable lineage (source session → intermediate transforms →
training set membership) and can reproduce every operation. That is a concrete,
cheap engineering requirement and it should be written into the telemetry and
provenance contracts now.

**Caveat, marked:** whether an authority would read "source data" as requiring
attributable provenance of the *data provider* (as in DM-06's contemplation of a
contract between applicant and data provider) rather than just of the *record*
is **`[UNVERIFIED]`**. It is the kind of question that gets settled in a
pre-application meeting, not from the text. Flag it as an open legal question,
do not resolve it optimistically.

### 6.3 Third objection: lawfulness of collection. ADR-004's analysis stands.

Nothing in the aviation assurance framework speaks to child data protection
directly. But two mechanisms make unlawfully-collected data an *assurance*
problem, not merely a legal one:

1. **DM-06 requires the applicant to identify data sources and to have them
   under a defined arrangement** — "open-source or sourced via a contract to be
   established between the applicant and the data provider"
   [EASA Concept Paper Issue 02, DM-06, EASA, 2024-03-06]. A corpus you cannot
   show you were entitled to collect is a data source you cannot document.
2. **SRM cannot compensate.** Issue 2 states SRM is "not aimed at compensating
   partial coverage of objectives belonging to the trustworthiness analysis
   building blocks (e.g. safety assessment, information security, **ethics-based
   objectives**)" [ibid., §5.2]. The concept paper carries an **ethics-based
   assessment** block precisely so that this cannot be engineered around.

**This confirms point 1 of the mechanical argument in ADR-004 against
proceeding without verifiable parental consent.** The
finding to report is not "it would be risky" — it is:

> Under the applicable assurance guidance, data you cannot document a lawful
> basis for is data you cannot enter into DM-06, and no amount of runtime
> monitoring compensates, because SRM is explicitly barred from compensating
> ethics-block shortfalls. **The life-saving data would be inadmissible for the
> life-saving purpose.**

That sentence is now sourced. ADR-004 should cite it.

### 6.4 Net answer to (b)

**A corpus of anonymous minors' gameplay is admissible as a strategy prior with
documented lineage and a lawful basis. It is not admissible as the
ODD-representative training set for a safety-related navigation function, and no
consent regime fixes that — because the objection is about fidelity, not
consent.**

Two independent obligations follow: get the consent architecture right
(ADR-004, S11), *and* stop claiming the corpus is the training set for a
certified function (S10, and the vision document's arrow chain).

---

## 7. ARP6983 / ED-324 — the standard that will matter, and its ceiling

**AS6983 / ARP6983 (SAE) and ED-324 (EUROCAE)**, "Process Standard for
Development and Certification/Approval of Aeronautical Safety-Related Products
Implementing AI", is being developed by the joint **SAE G-34 / EUROCAE WG-114**
committee, created in 2019
[EUROCAE WG114 / SAE G34 — AS6983, StandICT.eu, n.d., https://standict.eu/standards-repository/eurocae-wg114-sae-g34-artificial-intelligence-aviation-as6983-process-standard].

Status as of August 2025: **Draft 7 finalised**, presented at the FAA AI/ML
Technical Exchange Meeting
[ED-324/ARP6983 presentation, FAA AI-ML Tech Exchange Meeting, 2025-08, https://na.eventscloud.com/file_uploads/115fca49330a77ce92d7fe04e9874faf_Day1-Jahn-202508ED-324ARP6983presFAAAI-MLTechExchangeMeeting_8-5-25-Read-Only.pdf].

**Its Issue 1 scope is the critical fact:** development assurance focused on
learning assurance, covering airborne and ATM/ANS domains for crewed and
uncrewed aircraft, with **Issue 1 limited to non-adaptive ML in supervised
mode, up to DAL C / AL 3 / SWAL 2** [ibid.].

Three things follow:

1. **Non-adaptive only.** A policy that learns or adapts in the field is outside
   Issue 1 entirely. Our policy must be **frozen at deployment**, versioned, and
   updated only through a controlled re-qualification cycle. Online learning on
   a fielded SAR drone is out of scope of the only process standard being
   written for this.
2. **Supervised mode only.** Behavioural cloning from demonstrations sits inside
   supervised learning; **reinforcement learning does not obviously**. S09's task
   3 currently reads "behavioural cloning first; then IL/RL variants" — the BC
   path is inside the emerging standard's scope and the RL path is outside it.
   That is a strong argument for keeping BC as the *shippable* line and RL as
   the *research* line, and it should be stated in S09's brief.
3. **DAL C ceiling.** Functions requiring DAL A/B assurance are outside Issue 1.
   Which is another way of stating the envelope conclusion: put the learned
   component where DAL C is sufficient, and put the DAL A/B burden on the simple
   deterministic containment.

Prior committee outputs: **ER-022 / AIR6988** (Statement of Concerns, published
2021-04-30) and **ER-027 / AIR6987** (Taxonomy, published 2024-12-12) [ibid.].

---

## 8. ISO/IEC TR 5469:2024 and the Japanese ML-quality track

**ISO/IEC TR 5469:2024, "Artificial intelligence — Functional safety and AI
systems"**, published January 2024, is a **Technical Report** (guidance, not a
requirements standard). Its scope covers three cases: **use of AI inside a
safety-related function**; **use of non-AI safety-related functions to ensure
safety of AI-controlled equipment**; and use of AI systems to design and develop
safety-related functions. It is industry-agnostic and references IEC 61508,
ISO 26262, IEC 62061, ISO 13849 and IEC 61511
[ISO/IEC TR 5469:2024 Artificial intelligence — Functional safety and AI systems, ISO/IEC, 2024, https://www.iso.org/standard/81283.html];
[Artificial intelligence — Functional safety and AI systems (ISO/IEC TR 5469:2024), AI Standards Hub, 2024, https://aistandardshub.org/ai-standards/artificial-intelligence-functional-safety-and-ai-systems-iso-iec-tr-54692024/].

Note its **second scope case is exactly our envelope**: a non-AI safety-related
function ensuring the safety of AI-controlled equipment. TR 5469 is therefore
the right general-audience citation for the architecture, and it is
international rather than EU-specific, which matters for the cascade argument
(V7). It is paywalled.

**Japan's equivalent vocabulary** is the AIST **機械学習品質マネジメントガイドライン
(Machine Learning Quality Management Guideline)**, 4th edition, Rev 4.2.0
(2024-04-02), produced under the NEDO "next-generation AI evolving with humans"
programme
[機械学習品質マネジメントガイドライン 第4版 Rev.4.2.0, 産業技術総合研究所 デジタルアーキテクチャ研究センター, 2024-04-02, https://www.digiarc.aist.go.jp/publication/aiqm/AIQuality-requirements-rev4.2.0.0113-signed.pdf];
[産総研が最新の「機械学習品質マネジメントガイドライン 第4版」を公表, NEDO, https://www.nedo.go.jp/news/other/ZZCD_100059.html].
The industry consortium **QA4AI** publishes a parallel *AIプロダクト品質保証
ガイドライン*, 2025.04 edition [QA4AI, 2025, https://www.qa4ai.jp/].

Neither is aviation-specific and neither is a certification basis. Their value is
**audience fit**: a Japanese agency or research partner reads AIST/NEDO
vocabulary natively. S10 should present the assurance story in EASA terms for
international audiences and AIST terms for Japanese ones, and say they are
consistent.

---

## 9. The concrete architecture this file mandates

Stated once, for S09 to build against and S10 to draw.

```
   ┌──────────────────────────── contained architecture ───────────────────────┐
   │                                                                           │
   │  [learned nav policy]  ──proposed action──▶  [runtime monitor]            │
   │   frozen, versioned,                          - ODD / out-of-distribution │
   │   non-adaptive,                                 detection                 │
   │   supervised-trained                          - envelope check (geometry, │
   │   ≤ DAL C equivalent                            speed, clearance, energy) │
   │                                               - plausibility of action    │
   │                                                        │                  │
   │                                        pass ◀──────────┴───────▶ fail     │
   │                                          │                        │       │
   │                                    [actuation]        [passivation → safe]│
   │                                                        deterministic      │
   │                                                        fallback:          │
   │                                                        hold / retreat /   │
   │                                                        land / FTS         │
   │                                                                           │
   │  independent of the policy:  operator override (unconditional, bounded    │
   │  latency) ── required by V2 §3.6 as well as by SRM-02                     │
   └───────────────────────────────────────────────────────────────────────────┘
```

Everything in the right-hand column is deterministic, simple, independently
developed, and carries the development-assurance burden. Everything in the left
column is the thing our corpus produces.

**Therefore: the project's deliverable is a policy plus a certified envelope.**
S09's scope grows to include the envelope's specification (not necessarily its
certification), the runtime monitor's detection criteria, and the definition of
the safe fallback states.

---

## 10. Evidence checklist for fielding a learned nav policy

The answer to question (a), rendered as the list S09 should be able to tick.

| # | Evidence item | Source of the requirement |
|---|---|---|
| 1 | A defined **ODD** for the navigation function | EASA DM-01; SORA ConOps |
| 2 | **Data Quality Requirements** and a documented data pipeline | EASA DM-02/03 |
| 3 | Documented, entitled **data sources** | EASA DM-06 |
| 4 | Evidence of data **completeness, representativeness, accuracy, traceability, set independence** | EASA DM-13-1…-5 |
| 5 | **Frozen, non-adaptive, supervised-mode** model at deployment | ARP6983/ED-324 Issue 1 scope |
| 6 | A **generalisation guarantee** argument (in-sample ≈ out-of-sample error) | EASA learning-assurance block |
| 7 | **Out-of-distribution detection** at runtime | EASA (OoD discriminator, OoD test cases) |
| 8 | An **independent runtime monitor** with passivation to a traditional backup | EASA SRM-02 |
| 9 | **Independence** of the monitor from the AI/ML constituent | EASA SRM-02 |
| 10 | **Containment**: no single failure exits the ground risk buffer; FTS or equivalent | SORA Annex E containment criterion #4 |
| 11 | Software with catastrophic-contribution potential developed to a **recognised industry standard** | SORA Annex E OSO #05 |
| 12 | **Simulation validity justification** for any simulated evidence; third-party validation at high robustness | SORA Annex E, repeated |
| 13 | An **unconditional operator override** with bounded latency | EASA SRM-02; 航空法132条の92 guideline §3(2) |
| 14 | **Ethics-based assessment**, not compensable by SRM | EASA Issue 2 §5.2 |

Items 1–4 are S04 + S06 + S11 work. Items 5–9 are S09. Items 10–13 are new and
currently unowned. Item 14 is S11.

---

## 11. Open items

- Whether ARP6983/ED-324 has been published since Draft 7 (Aug 2025).
  `[UNVERIFIED]` — **re-check before S09 starts**, this is fast-moving.
- Whether EASA has published anything on **Level 3** since 2024-03-06.
  `[UNVERIFIED]` — same.
- Whether "source data" traceability under DM-13-4 implies attributable data-
  provider provenance. `[UNVERIFIED]`, §6.2.
- MLEAP final report's concrete means of compliance — retrieved as a citation
  but not read in depth. Worth a pass before S09 designs its evidence artefacts.
- Japan: whether JCAB has any published position on ML in 機体認証. Not found.
  `[UNVERIFIED]`.
- UL 4600 (autonomous product safety case) — not researched; may be a useful
  additional framing. Flagged, not claimed.
