# S01 — Foundational research

**Objective:** Establish the evidence base that lets every later session and
every investor claim be grounded rather than asserted.

**Read:** `CLAUDE.md`, `docs/00-vision.md`, `docs/02-constraints.md`,
`docs/decisions/ADR-003-region-cascade.md`, `sources/*`
**Owns:** `research/`
**Depends on:** S00
**Budget:** large. **Split into S01a–S01e if needed — this is expected, not a failure.**

> **Write no code this session.** Output is prose and tables with citations.

## Ground rules

- Every non-obvious claim gets an inline source: `[title, org, year, URL]`.
- Anything you could not verify is marked `[UNVERIFIED]` and stays marked.
  Later sessions and the whitepaper inherit that marking. Do not launder it.
- Prefer primary sources: agency publications, standards bodies, peer-reviewed
  work, official open-data portals. Vendor marketing is evidence of a vendor's
  claim, not of the fact.
- Where the literature disagrees, record the disagreement. Do not resolve it by
  picking the convenient side.
- Note the date of every dataset and standard. Disaster tech moves fast and
  stale figures are how a pitch loses a room.

## Threads

### R1 — Regional prioritization → `research/R1-regions.md`
- Earthquake/disaster mortality by region, last ~30 years; where is the loss
  actually concentrated, and is it concentrated by hazard or by building stock?
- Sensor + response-unit density vs. mortality — quantify the gap ADR-003 asserts.
- Seed region (Japan): open geospatial and post-event data availability —
  GSI/国土地理院, NIED, G-空間情報センター, J-SHIS, municipal LiDAR. What is
  actually downloadable, under what licence, at what resolution?
- Cascade regions: for 3–5 candidates (include at least two African and one
  Southeast Asian), what is the *worst* input tier we would have to accept?
  This directly specifies ADR-003 requirement 1.
- **Deliverable: a ranked shortlist with the reasoning, not just a ranking.**

### R2 — Device & network reality in target regions → `research/R2-devices.md`
- Actual Android version / RAM / GPU distribution in target markets. Sources:
  StatCounter, GSMA Mobile Economy, Google/Android device dashboards, operator
  reports. **This validates or breaks the C1 floor spec — the highest-priority
  thread after R1.**
- Data cost as % of median income; prepaid bundle sizes. Our payload budget has
  a cash cost to the player — quantify it.
- WebGL availability and reliability on the floor device class. Is ADR-001's
  "assume no GPU" correct, or conservative?
- PWA install and service-worker support at the floor. Any blockers?
- Web vs. app-store acquisition in these markets — settles the ADR-001 open
  question about a native client.
- **Size the 2G population from authoritative sources** (R-P005-1): ITU
  *Facts and Figures*, GSMA *Mobile Economy* / *State of Mobile Internet
  Connectivity*, World Bank, DataReportal, Pew Global. Report 2G-only vs.
  3G vs. 4G+ splits by region, with the survey year, and note where sources
  disagree — they will, and the disagreement is itself a finding.
- Distinguish three numbers and never conflate them: **covered** (network
  exists), **connected** (has a subscription), **usable** (affordable enough to
  actually spend data on a game). The third is the real market and it is much
  smaller than the first.

### R6 — Addressable attention & minimum viable session → `research/R6-attention.md`
**This thread produces two numbers that drive the game design itself. Treat it
as design input, not background.**
- **Available attention (R-P005-2).** Of the usable population, how many
  plausibly have discretionary time and device access to play at all? Sources:
  time-use surveys, youth mobile-gaming penetration in target markets, school
  and work patterns, shared-device rates (a shared family phone is a hard
  constraint on session length that pure connectivity data hides).
- Report an addressable funnel with explicit assumptions at each step, and a
  low/central/high estimate. A single number here would be false precision.
- **Minimum viable harvest duration (R-P005-3).** Work with S08's metric list:
  for each candidate metric, what is the shortest run that yields a
  statistically useful sample? Reaction latency needs *n* discrete hazard
  events; path efficiency needs one complete traversal; smoothness needs a
  minimum input-sample count. Produce a table: metric → minimum seconds.
- **Then state the design consequence plainly.** If the answer is ~30s, S03
  must be designed around 30-second runs and *not* the 3-minute assumption
  currently written into `docs/02-constraints.md`. Changing that assumption is
  cheap now and expensive after the game exists. If the number contradicts the
  8KB/3-min telemetry budget, say so — C1 gets amended, not quietly ignored.
- **Validate the demographic assumption itself.** The source doc asserts
  middle-school-aged youth are the optimal pilots. *That is an untested
  assumption, and it is the single assumption creating all of the project's
  legal and ethical complexity.* Find the evidence on age vs. reaction time,
  psychomotor learning rate, and video-game expertise — the literature on
  peak reaction time and gaming performance may well point at 18–25, not 12–14.
  **If adults perform equivalently, the consent problem largely dissolves and
  the project gets faster.** This is a high-value question; answer it carefully
  and report it prominently in the summary regardless of which way it falls.

### R3 — SAR robotics: what is actually deployed → `research/R3-platforms.md`
- Platforms genuinely used in post-earthquake SAR: confined-space and
  collapsed-structure UAVs, ground/snake robots, tethered systems. Who fields
  them (JDR, INSARAG teams, FEMA US&R, fire services), at what TRL?
- Their control modality: full teleop, shared autonomy, supervised autonomy.
  **Where exactly does a learned nav policy insert?** This is the load-bearing
  question for S09 and for the pitch's last arrow.
- Known failure modes in real deployments: comms loss in rubble, dust, GPS
  denial, lighting, operator workload. These become the game's difficulty axes,
  so they must be real, not invented.
- Regulatory: BVLOS and disaster-zone flight authority in Japan, EU, and
  cascade regions.
- Bio-cybernetic / insect-cyborg SAR (cyborg-cockroach work, e.g. Nanyang
  Technological University / RIKEN lines): current TRL, honest read on whether
  it belongs in a horizon section or is vapour. The user asked; answer squarely.

### R4 — Pilot skill metrics: the "TOP GUN" question → `research/R4-metrics.md`
- What does the literature actually measure in expert pilots and teleoperators?
  Aviation selection batteries, USAF/NASA operator-performance work, surgical
  robotics dexterity metrics (OSATS, dV-Trainer), esports performance research.
- Which of those are computable from a 4-DOF input stream in a 2.5D slice game?
  **Be strict.** A metric we cannot honestly derive from our projection must be
  marked as such — ADR-001 already warns about this.
- Transfer evidence: does game-derived skill predict real teleoperation
  performance? Find the studies, including negative results. If the transfer
  literature is weak, say so — it becomes a research question the project
  answers rather than a claim it assumes.
- Prior art on crowdsourced human demonstration → robot policy (Foldit,
  EteRNA, Eyewire, RoboTurk, DAgger-style human-in-loop, learning-from-
  demonstration surveys). What worked, what failed, and why.

> **Boundary with S12.** Certification, testing, validation, airspace,
> licensure and procurement regimes are **S12's** scope, not yours. R3 covers
> what platforms exist and how they are controlled; R5 covers who the
> institutions are. Stop at the point where the question becomes "what must a
> drone satisfy to be approved" — that is S12. Cross-reference, don't duplicate.

### R5 — Institutional landscape → `research/R5-stakeholders.md`
- IDRM bodies and their funding/procurement routes: UNDRR (Sendai Framework),
  INSARAG, JICA, Japan Cabinet Office 防災, ADRC, ASEAN AHA Centre, AU/regional
  African DRM bodies.
- Which research funding instruments fit a dual-use game/robotics programme.
- Precedents: gamified/citizen-science projects that reached institutional
  adoption. How they were structured, and what got them taken seriously.
- Ethical and consent precedent for research data collection from minors at
  scale — feeds ADR-004 and S11.

## Done when

- [ ] `research/R1..R5-*.md` all exist, sourced, `[UNVERIFIED]` marked.
- [ ] `research/00-summary.md` — max 2 pages: top findings, and every place the
      research **contradicts** current docs or ADRs. Contradictions are the
      point of this session; surface them loudly.
- [ ] ADR drafted for anything research overturns (esp. C1 floor spec if R2
      says the floor is wrong).
- [ ] `docs/00-vision.md` scope section updated with the honest read on
      bio-cybernetic swarms.
- [ ] HANDOFF entry written.

**Produces:** `research/00-summary.md` — the file every later session reads
instead of redoing this work.
