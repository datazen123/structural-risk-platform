# S11 — Data governance, consent, ethics

**Objective:** Ratify ADR-004 and build the consent and governance machinery
that lets this project survive investor diligence, government partnership, and
IRB review.

**Read:** `CLAUDE.md`, `docs/02-constraints.md` (C4),
`docs/decisions/ADR-004-minors-data-governance.md`,
`docs/contracts/telemetry.v1.md`, `research/R5-stakeholders.md`
**Owns:** `docs/governance/`, `apps/game/src/consent/`
**Depends on:** S02 (schema), S01/R5
**Budget:** medium. **Start this early — it runs in parallel with the build.**

## Why early

This gates *launch*, not *build* — so it can run alongside everything. But it
must be finished before any public release, and if it turns out that verifiable
parental consent is unworkable offline in the target markets, that changes the
launch strategy fundamentally. Better to learn that in month one than month ten.

## Tasks
1. **Ratify ADR-004** or amend it with what the research shows.
2. **Consent flow, jurisdiction-aware** — COPPA, GDPR-K (note the 13–16
   member-state variation), Japan APPI, cascade-region regimes. Where no
   framework exists, apply the strictest applicable standard rather than the
   local minimum. That is both right and the thing an agency will check.
3. **Solve offline consent.** Verifiable parental consent on a 2G feature phone
   is the hard open question from ADR-004. Options to evaluate: SMS-based
   verification, school/institutional consent, delayed verification with
   local-only data retention until confirmed, or age-gating to adults in
   jurisdictions where minors' consent cannot be obtained safely.
   **If it cannot be solved for a market, that market does not launch.**
4. **Institutional channel** — evaluate schools/youth programmes as the first
   deployment route. Likely faster, safer, and better for research validity
   than open consumer release. May become the primary strategy.
5. **Plain-language disclosure** — at the reading level of the youngest intended
   player, localized. The frozen schema is the disclosure (C4).
6. **Data protection impact assessment** and a `docs/governance/` pack ready to
   hand to counsel, an IRB, or a government partner without further work.
7. **Erasure and access rights** — verify S06's implementation actually
   satisfies the stated rights, end to end.
8. **Flag legal review** as a real budget line item in the investor materials.
   Naming it before diligence finds it is worth more than the cost of it.

## Done when
- [ ] ADR-004 accepted or superseded.
- [ ] Consent flow implemented and testable offline.
- [ ] Per-market launch matrix: green / conditional / do-not-launch, with reasons.
- [ ] `docs/governance/` pack complete.
- [ ] Erasure verified end-to-end against S06.

**Produces:** `docs/governance/` — the pack that unblocks public launch and
strengthens every conversation in S10.
