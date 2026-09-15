# S10 — Evidence surface: dashboard, whitepaper, deck

**Objective:** Make the whole chain legible and credible to investors,
authorities, researchers, and IDRM agencies (R-P001-4).

**Read:** `CLAUDE.md`, `docs/00-vision.md`, `research/00-summary.md`,
`research/R5-stakeholders.md`, `docs/contracts/metrics.v1.md`,
`docs/contracts/benchmark.v1.md`, `sessions/HANDOFF.md`
**Owns:** `apps/dashboard/`, `docs/whitepaper/`, `docs/deck/`
**Depends on:** S08, S09 (and ideally S11)
**Budget:** large. Split: S10a dashboard, S10b whitepaper, S10c deck.

## The rule that governs this session

**Every arrow in the chain is labelled with its evidence status:**
demonstrated / partial / aspirational. No exceptions, in any artifact.

These four audiences all contain someone whose job is finding the overclaim.
Credibility with a civil-defence authority is lost exactly once and is not
recoverable. A deck that clearly marks two arrows as aspirational is far more
fundable than one that implies all six are done — because the first one can be
checked and survives the checking.

## Tasks
1. **Live dashboard** — the chain, end to end, with real numbers: levels
   ingested, sessions played, hours of telemetry, metric distributions, corpus
   versions, policy benchmark trend. Live beats claimed, by a wide margin.
   Publish as an Artifact so it can be shared as a link.
2. **The T2 demo client** — WebGL rendering of the *same* voxel volumes the
   field players fly (ADR-001, C3). The moment where the projector shows the
   beautiful version of the identical level. Cosmetic only; it must not fork
   the sim or the schema.
3. **Whitepaper** — *Gamified Crowdsourced Human Telemetry for Autonomous
   Disaster Robot Navigation*. Method, schema, metrics, benchmark, limitations,
   ethics, cascade strategy. The limitations section is the one that gets it
   taken seriously; write it first.
4. **Deck** — audience variants share a spine but differ in ask:
   - *Investors*: market, moat (corpus + institutional relationships), traction.
   - *Authorities / IDRM*: capability, doctrine fit, procurement path,
     sovereignty and data governance.
   - *Researchers*: method, reproducibility, corpus access, open questions.
   - *Agencies*: the cascade — how Japan-derived methodology, SOPs and policy
     transfer to sensor-poor regions, and how those regions supply the pilots.
5. **The reach story is the lead.** Not a footnote: the system runs on a 2G
   phone in the regions with the highest mortality and the least SAR
   infrastructure, so the people generating the ingenuity are the people it
   protects (P002). That is the differentiating claim and it is true.
6. **Traceability** — every number cites a corpus version or a `research/`
   source. Nothing marked `[UNVERIFIED]` in `research/` may appear as fact.

## Done when
- [ ] Dashboard live with real pipeline data, published as an Artifact.
- [ ] Whitepaper complete including limitations and ethics.
- [ ] Four deck variants.
- [ ] Every claim traced to a source or a corpus version.
- [ ] Evidence status labelled on every arrow, in every artifact.

**Produces:** the presentable half of the MVP.
