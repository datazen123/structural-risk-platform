# S15 — Trade control, insurance & the survey evidence chain

**Objective:** Own the five items S12 finished and found **unowned** — the gaps
that no existing session covers and that can each close a route by themselves.

**Read:** `CLAUDE.md`, `docs/02-constraints.md` (§C6), `research/V0-summary.md`,
`research/V7-cascade-regimes.md`, `research/V4-survey.md`,
`docs/decisions/ADR-003-region-cascade.md`
**Owns:** `research/X*`
**Depends on:** S12
**Budget:** large. Research only, no code. Split freely.

## Threads, in S12's own risk order

### X1 — Export control on autonomy software → `research/X1-export.md`
**S12 rates this the highest-risk unowned item: it can block the deployment
cascade claim outright.** Wassenaar-type regimes, dual-use classification of
autonomous navigation software, Japan's 外為法 / METI end-user controls, EU
dual-use regulation, and what applies when a trained policy is transferred to a
cascade region. Answer concretely: can we lawfully ship the thing ADR-003
promises to ship?

### X2 — Import & national certification per region → `research/X2-import.md`
Morocco prohibits import/possession in principle; Ethiopia's directive is
import-focused; Nigeria's NCAA states no drone is certified in-country. For each
R1 shortlist region: import status, certification status, and whether the
**deployment** cascade is slow, conditional, or closed. Feed the answer into the
V8 matrix and into ADR-003's two-cascade split.

### X3 — Insurance & underwriting → `research/X3-insurance.md`
**S12 calls this possibly the sharpest practical gate of all**, and it is
usually reached before regulation bites. Will an insurer underwrite an operation
using a learned navigation component? What evidence do underwriters ask for, and
does it differ from the certification evidence in V3? Who carries liability for
a missed survivor or a missed structural defect — operator, agency, or software
supplier?

### X4 — Survey evidence chain & its separate schema → `research/X4-survey-chain.md`
V4 established that survey output may need a licensed engineer's sign-off.
That output is **not anonymous kinematic telemetry** — it is an engineering
record with chain-of-custody, retention and evidentiary requirements. It
therefore needs a **second schema**, governed differently from the player
telemetry contract, and ADR-004's minimization rules do not apply to it.
Specify that separation clearly; conflating the two would be a serious error.
Cross-reference `docs/04-science-base.md` §3 — Rapid Visual Screening is the
existing doctrine this chain should implement against.

### X5 — Aerial imagery privacy law → `research/X5-imagery-privacy.md`
Overflight and imaging of private property, per region. Constrains survey mode
in practice and is frequently the first public objection raised.

## Done when
- [ ] `research/X1..X5` written, sourced, `[UNVERIFIED]` marked.
- [ ] `research/X0-summary.md` with a **route-closure verdict**: for each
      shortlist region, is the deployment cascade open, conditional, or closed?
- [ ] V8 matrix extended with trade, insurance and imagery rows.
- [ ] ADR drafted for anything that changes ADR-003's cascade claim.

**Produces:** `research/X0-summary.md`.
