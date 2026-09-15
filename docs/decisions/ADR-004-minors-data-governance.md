# ADR-004: Minors' data governance — designed in, not bolted on

**Status:** proposed — to be accepted by session S11
**Date:** 2026-09-08
**Session:** S00 (proposal), S11 (ratification)

## Context

The source doc names middle-school-aged youth as a target demographic. The reach
constraint (C1) extends that to minors in jurisdictions with varying, and in
some cases absent, data protection regimes.

Stated plainly, once: a project that collects behavioural data from children
across borders, and whose pitch decks say so, will be examined on exactly this
point by every investor's diligence counsel, every government partner, and every
university IRB. Handled from day one it is a differentiator and a moat. Handled
late it is the thing that ends the project after the engineering is done.

It is also, independently, the right way to build it.

## Proposed decision

Design constraints, enforceable in the schema and testable in CI:

1. **No PII, structurally.** No name, email, phone, precise geolocation, camera,
   microphone, contacts, or device advertising ID. Not "not collected by
   policy" — not present in the schema, so it cannot be collected by accident.
2. **Opaque local identity.** A device-generated random ID. No account needed to
   play. The ID is rotatable by the player and rotation is not penalized.
3. **Kinematic data only.** Control inputs and derived flight state. The schema
   is short enough to print in the consent screen and in the whitepaper. The
   schema *is* the disclosure document.
4. **Coarse everything else.** Timestamps bucketed to the hour; region at
   country level at finest; no session-linking across days without consent.
5. **Jurisdiction-aware consent**, resolved at runtime: COPPA (US), GDPR-K
   (EU, verifiable parental consent, age of digital consent 13–16 by member
   state), Japan APPI, and the regimes of cascade regions — several of which
   have no framework, where we apply the strictest applicable standard rather
   than the local minimum.
6. **Deletion works offline.** A player can purge local queue and request
   server-side erasure; erasure must be executable given only the opaque ID.
7. **No ad tech, no third-party analytics SDKs, ever.** This is also why the
   Tier-0 bundle has no runtime dependencies — a supply chain we do not have is
   a supply chain that cannot exfiltrate a child's data.
8. **Research use is disclosed in plain language**, at the reading level of the
   youngest intended player, in the local language.

## Consequences

- Forecloses some monetization models. Correct trade; the asset is the corpus
  and the institutional relationships, not ad impressions.
- Forecloses per-player longitudinal study without an explicit, separate,
  consented opt-in. S08 must design metrics that work on unlinked sessions by
  default.
- Requires legal review before any public launch. That is a real dependency with
  a real cost — flag it in the investor materials as a known line item rather
  than discovering it during diligence.
- Gives us something most consumer data plays cannot say to a government
  partner: here is the complete list of everything we collect, it fits on one
  screen, and none of it identifies a child.

## Amendment, 2026-09-08 (S12/V3) — representativeness outranks consent

The consent argument below is now **sourced** rather than asserted: EASA DM-06
requires documented, entitled data sources, and §5.2 explicitly bars Safety Risk
Mitigation from compensating an ethics-block shortfall. Unlawfully obtained data
is undocumentable and uncompensable.

But S12 found a **larger** problem sitting above consent. EASA **DM-13-2**
requires a training set to be *representative* — its key-characteristic
distribution must resemble "the actual input state space for the intended
application." Finger inputs to a 2.5D phone game are not the input state space
of a rotorcraft in rubble. **No consent regime fixes that.**

Two consequences:
- The defensible framing is that the corpus is a **human navigation strategy
  prior**, not training data for a certified function. S09 and S10 adopt this
  wording.
- Anonymity is *not* a problem: DM-13-4 traceability governs data lineage, not
  identification of humans. ADR-004's minimization actively helps here.

## The option of proceeding without parental consent — considered, not adopted

An option raised early in the project was to proceed without verifiable
parental consent, on the reasoning that the data saves lives. It was considered
and **not adopted**. The reasoning against it is recorded here because it is a
question any project in this space has to answer, and because the argument is
mechanical rather than moral.

The objection is not primarily ethical, it is **mechanical — the plan defeats
its own goal**:

1. **Admissibility.** S12/V3 asks whether anonymous minors' gameplay is an
   admissible training-data source under a software-assurance regime. Data
   collected from children without lawful basis is not "risky" — it is
   *inadmissible*. A corpus that cannot be used to certify a policy cannot save
   anyone. The life-saving data would not be usable for the life-saving purpose.
2. **The institutional path closes.** Every audience in R5 — agency, IRB,
   government partner, investor's counsel — checks this specific point first.
   One unlawful collection ends the procurement conversation permanently, and
   the corpus plus those relationships *are* the asset (S10).
3. **Targeted ads make it worse, not neutral.** Deliberately advertising to
   teens to collect behavioural data without consent converts a passive
   compliance question into demonstrated intent, in jurisdictions with
   meaningful penalties (COPPA, GDPR-K). It is also the fact pattern most
   likely to be reported on.
4. **It is probably unnecessary.** The middle-schooler premise is an *untested
   assumption* inherited from `sources/`. S01/R6 now tests it. If 18–25s
   perform equivalently — plausible on the reaction-time literature — the
   consent problem largely dissolves.

**Lawful routes to the same data, in rough order of speed:**
- **Age-gate to the age of digital consent** (13/16 by jurisdiction) or to 18.
  Costs some reach; costs zero legal exposure.
- **Institutional consent** — schools, youth programmes, STEM clubs. At scale
  this is *faster* than per-parent consent, not slower, and it comes with
  research validity, a distribution channel, and an agency-friendly story.
- **Adults first, minors later** — launch to 18+, prove the pipeline, then add
  a minors' cohort once the consent machinery and legal review exist.

**This ADR stays `proposed` pending S11 and legal review.** Any decision to
collect from minors must be recorded here explicitly with its date, cleared by
counsel before collection begins, and reflected in the S11 launch matrix. It is
a decision that gets made on the record or not at all.

## Open questions for S11
- Verifiable parental consent mechanisms that function offline on a 2G feature
  phone. This is genuinely hard and may be the binding constraint on launch
  markets.
- Whether school/institutional deployment (consent via institution) is a faster
  and safer first channel than open consumer release.
