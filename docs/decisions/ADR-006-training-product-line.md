# ADR-006: Pursue a training/screening product line as the near-term route

**Status:** proposed — evaluated by S14. **S12/V6 finds this ADR understated:
it has funded buyers.** Japan's practical exam defines measurable competencies
our metrics map onto directly (2 m hover circle, 100-point deduction scale,
2-second return-to-path, degraded position-hold as scored subject 4-3), and
FY2024 special local allocation tax measures already fund fire-service licence
acquisition. **Screening is viable now; recognised *training* is not** —
登録講習機関 registration requires physical training airspace and a real
aircraft. The route in is supplying the ~1,500 schools (~500 registrants) or a
管理団体. JUIDA's ドローン防災マネージャー is the incumbent.
**Date:** 2026-09-08
**Session:** S00c (proposal), S14 (evaluation)

## Context

User proposal, 2026-09-08 (R-P005-8), in direct response to the disaster-zone
airspace constraint (C6): rather than fighting toward an autonomous policy
running on a certified airframe in controlled disaster airspace, build — or
optimize what already exists as — a **training and simulation platform for real
human helicopter pilots and for currently-airborne, live-ready SAR and
risk-assessment agencies**.

This is the strongest de-risking idea proposed so far, and it deserves a real
evaluation rather than a footnote.

## Why it is strong

The autonomy path (S09 → field platform) is gated by, in sequence: software
assurance for a learned component (V3), airworthiness, disaster-zone airspace
authority (V2), and procurement (V5). Each is slow, and the last three are
outside our control. **The training path is gated by none of them.**

| | Autonomy path | Training path |
|---|---|---|
| Certification of a learned component | required | not required |
| Airspace authority | required | not required |
| Evidence bar | airworthiness-grade | training-efficacy-grade |
| Time to first agency user | years | months |
| Revenue before certification | none | possible |

And critically: **it consumes the same corpus and the same telemetry
contract.** The skill metrics of S08, the levels of S04, and the sim of S03
are exactly what a training/screening product needs. This is not a pivot away
from the thesis — it is the thesis with a nearer-term customer, and one that
generates *expert-labelled* trajectories from certified professionals, which
is higher-value training data than anything the consumer game collects.

It also inverts the data flow usefully: expert pilots flying our levels give
S09 a professional baseline to measure crowdsourced policies against.

## Proposed decision

Treat training/screening as a **first-class parallel product line**, evaluated
in S14, not as a fallback if the autonomy path fails.

Candidate forms, for S14 to assess:
1. **Screening/selection instrument** — measure the psychomotor and decision
   competencies in remote-pilot certification (V6) at scale, cheaply.
2. **Skills-maintenance trainer** — deployed disaster-response teams practising
   confined-space and survey procedures between real events.
3. **Scenario generator for existing simulators** — do *not* rebuild what
   exists; feed real collapse topography (S04) into simulators agencies already
   own and trust. Likely the fastest route in, and the least threatening to
   incumbents.
4. **Mission rehearsal** — generate a level from fresh post-event data so a
   crew rehearses the actual site before flying it. Highest operational value,
   hardest data-freshness requirement.

## Consequences

- Requires S14 to check honestly whether incumbents already do this well. If
  they do, option 3 (integrate) beats options 1–2 (compete), and we should say
  so rather than build a worse copy.
- Adds a product line to an MVP that already has two components. **Risk: this
  is where the project loses focus.** S14's first job is to recommend
  sequencing, not to greenlight everything.
- Manned helicopter pilots are a different domain from small UAS. Whether our
  4-DOF confined-space model transfers to rotary-wing SAR is an open question
  and probably the weakest link in the user's proposal — S14 must test it
  rather than assume it.
- Changes the S10 pitch from one aspirational chain to a near-term product plus
  a long-term research programme. That is a materially more fundable story.

## Alternatives rejected
- **Autonomy path only** — every gate outside our control, no revenue until
  the last one clears.
- **Training as a fallback** — an option only considered after failure is an
  option built too late to help.
