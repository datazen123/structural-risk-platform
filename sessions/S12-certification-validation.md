# S12 — Certification, testing & validation landscape

**Objective:** Map the technical and non-technical requirements a SAR or
risk-assessment drone (and the software in it) must satisfy to be tested,
validated, certified, procured and flown — in Japan and in cascade regions — and
convert them into hard project constraints.

**Read:** `CLAUDE.md`, `docs/00-vision.md`, `docs/02-constraints.md`,
`docs/decisions/ADR-003-region-cascade.md`,
`docs/decisions/ADR-005-standard-test-methods.md`, `sources/*`
**Owns:** `research/V*`, `docs/02-constraints.md` (§C6), `docs/decisions/ADR-005*`
**Depends on:** S00. **Runs in parallel with S01 — do not serialize behind it.**
**Budget:** large. Split V1–V7 across S12a…S12x freely.

> **Write no code.** Output is sourced prose, tables, and new constraints.
> Same evidence rules as S01: primary sources, `[UNVERIFIED]` markings that
> survive into downstream documents, dates on every standard.

## Why this session is upstream, not compliance cleanup

The project's final arrow is "nav policy → field platform." If that arrow is
blocked by a certification regime nobody checked, then S03's sim fidelity,
S04's provenance model, S08's metric definitions and S09's entire benchmark
design were all specified against the wrong target. Those are expensive to
redo and cheap to get right the first time.

Two specific ways this session is expected to reshape the project:

1. **Benchmark legibility.** If recognized standard test methods for response
   robots exist, S09's benchmark should *mirror them* rather than invent private
   metrics. A result expressed in the vocabulary responders already use for
   procurement is worth vastly more than a better result expressed in ours.
   See ADR-005 (proposed).
2. **Simulation admissibility.** If a regime accepts simulation as validation
   evidence, it will specify what kind. Our 2.5D game sim will almost certainly
   not qualify — which would mean a separate, narrow, high-fidelity validation
   sim is a required component we have not budgeted. **Find this out now.**

## Threads

Leads below are starting points to **verify, correct, or discard** — several may
be outdated, misnamed, or superseded. Treat them as search terms, not findings.

### V1 — Standard test methods for response robots → `research/V1-test-methods.md`
- NIST / ASTM E54.09 (formerly F45-adjacent) standard test methods for response
  robots — the standardized test lanes, apparatuses and metrics used by US&R
  teams. What exists, what it measures, is it used outside the US?
- ASTM F38 / ISO 21384 series for UAS generally; JIS equivalents in Japan.
- Japan-specific: NIED / 消防庁 (Fire and Disaster Management Agency) evaluation
  regimes, World Robot Summit disaster-robotics standard tasks and their scoring
  rubrics — these were explicitly designed as SAR robot benchmarks.
- RoboCup Rescue league arenas and metrics.
- **Key question: can our benchmark harness (S09) be expressed in these terms?**
  If yes, that is a major credibility asset and probably an ADR.
- **Second question: do any of these define confined-space *navigation*
  performance in a way a learned policy can be scored against?**

### V2 — Airspace, flight authorization, operator licensing → `research/V2-airspace.md`
- Japan: Civil Aeronautics Act as amended, 航空法; the Level 3.5 / Level 4
  flight categories; DIPS registration; remote-pilot skill certification
  (一等/二等 無人航空機操縦士); JUIDA/JUAV roles. Current status as of 2026.
- **Disaster-zone specifics.** In an active response, airspace is typically
  controlled and manned rotary-wing traffic dominates. What is the actual
  authorization path for a UAS in a declared disaster in Japan? Who grants it,
  how fast, and under what deconfliction rules? *This may be the single hardest
  real-world constraint and it is frequently omitted from drone-SAR pitches.*
- EU: SORA / JARUS methodology, U-space, specific vs. certified category.
- Cascade regions: what regime exists, if any. Where none exists, what do
  international responders (INSARAG teams) operate under when deployed?
- Spectrum/radio licensing for control and video links, per region.

### V3 — Software, autonomy & ML assurance → `research/V3-software-assurance.md`
- What assurance regime applies to autonomous/assistive flight software?
  DO-178C and its applicability (or non-applicability) to small UAS; emerging
  ML-specific guidance (EASA AI roadmap / concept papers, SAE G-34 / EUROCAE
  WG-114, ISO/IEC TR 5469 on AI functional safety).
- **The core question for S09:** what evidence is required to field a *learned*
  navigation policy? Is a non-deterministic learned component acceptable at all,
  or only inside a deterministic safety envelope / runtime monitor?
- If the answer is "only inside an envelope," then the product is not a policy —
  it is a policy *plus* a certified envelope, and S09's scope changes.
- Simulation-as-evidence: which regimes accept it, and what fidelity, validation
  and V&V of the simulator itself do they demand?
- Data provenance requirements for training data. Would a corpus of anonymous
  children's gameplay be admissible as a training-data source? **Ask this
  question explicitly — it couples V3 to ADR-004 and could be decisive.**

### V4 — Risk-assessment / survey mission requirements → `research/V4-survey.md`
This is the preventative class (R-P001-8, R-P004-2) and its regime is
*different from and probably stricter than* emergency SAR — because its output
is an engineering assessment someone acts on, not a rescue someone witnesses.
- Structural inspection: does the output require a licensed/chartered engineer's
  sign-off? (Japan 建築士; equivalents elsewhere.) If so, the drone and its
  software are *instruments in an engineer's workflow*, not decision-makers —
  which reframes the product.
- Standards for drone-based structural/infrastructure inspection: accuracy,
  coverage, evidence retention, repeatability, calibration.
- Data chain-of-custody and retention where an assessment has legal force.
- Liability and professional indemnity: who is responsible for a missed defect?
- Privacy/surveillance law for aerial imagery over private property, per region.
- Insurance requirements — often the *de facto* gate, ahead of regulation.

### V5 — Procurement & doctrine fit → `research/V5-procurement.md`
- How do Japanese fire services, 消防庁, self-defence forces, and municipal DRM
  bodies actually buy this class of equipment? Framework agreements, trials,
  approved-supplier lists, tender cycles, typical timelines.
- INSARAG External Classification (IEC/IER) — does equipment or methodology need
  to fit a classified team's declared capability? What does that constrain?
- Doctrine: where does a drone sit in existing SAR SOPs? A tool that does not
  fit an existing procedure does not get used, regardless of capability.
- Interoperability and data-format expectations for handing survey/SAR output to
  an incident command system.
- Dual-use export control exposure (Wassenaar-type regimes) for autonomy
  software shipped to cascade regions.

### V6 — Human-operator qualification → `research/V6-operator-quals.md`
**Directly couples to S08.** If operator certification schemes already define
and measure piloting competencies, then our skill metrics should map onto them
where possible.
- Remote-pilot certification syllabi and practical test standards, Japan and EU.
- Do any define *measurable* competencies (reaction, precision, situational
  awareness) rather than pass/fail task completion?
- Is there an accepted competency framework our composite skill profile could
  be validated against? That would turn S08's metrics from invented to anchored.
- **Speculative but high-value: could the game become a recognized training or
  screening instrument for operator certification?** That is a second product
  and possibly a faster institutional route in than the autonomy pipeline.

### V7 — Cascade-region reality → `research/V7-cascade-regimes.md`
- For the R1 cascade shortlist: is there a civil aviation authority with a UAS
  framework? An emergency-response drone doctrine? Import restrictions?
- Where regulation is absent, what governs in practice — host-nation permission,
  UN/OCHA coordination, ad hoc military control?
- What do humanitarian UAS operators actually do today (e.g. UAV coordination
  cells in past responses)? Existing humanitarian codes of conduct for UAS.
- **The transferability question ADR-003 needs answered:** does a policy
  validated in Japan carry any regulatory weight elsewhere, or does each region
  restart from zero? If it restarts, the cascade's value is methodology and
  SOPs, not certification — and S10's deck must say that precisely.

## Done when
- [ ] `research/V1..V7-*.md` written, sourced, `[UNVERIFIED]` marked.
- [ ] `research/V0-summary.md` — max 2 pages. Must contain a **"what this
      changes"** section naming every existing doc, ADR or session brief the
      findings invalidate. That section is the deliverable.
- [ ] **`docs/02-constraints.md` §C6 written** — certification and validation
      constraints, in the same enforceable form as C1–C5.
- [ ] ADR-005 accepted, amended, or rejected on evidence.
- [ ] A **requirements matrix**: `research/V8-matrix.md` — rows = requirements,
      columns = {Japan, EU, cascade-region-1..n}, cells = {applies / differs /
      absent / unknown}, plus which project session owns satisfying it.
- [ ] S09's brief updated if the assurance findings change what a benchmark
      must prove. Same for S03 (sim fidelity) and S04 (provenance).
- [ ] HANDOFF entry naming every downstream session now affected.

**Produces:** `research/V0-summary.md`, `research/V8-matrix.md`, and §C6.
