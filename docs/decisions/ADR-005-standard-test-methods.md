# ADR-005: Benchmark in the responders' vocabulary, not ours

**Status:** AMENDED and accepted, 2026-09-08, by S12/V1
**Date:** 2026-09-08
**Session:** S00 (proposal), S12 (ratification)

## Context

User requirement R-P004-1/2 (2026-09-08): identify testing and validation
requirements for SAR and risk-assessment drones, technical and non-technical,
in Japan and other regions — on the grounds that they "could shape our research
and approach greatly."

They do. S09 must produce a benchmark showing a crowdsourced nav policy beats a
baseline. The default engineering instinct is to invent metrics that fit our
sim. That instinct produces a number no fire service, procurement officer, or
INSARAG-classified team can interpret, compare, or act on.

Standardized test methods for response robots plausibly already exist — NIST/
ASTM work, World Robot Summit disaster-robotics tasks, RoboCup Rescue arenas
(all `[UNVERIFIED]` here; V1 confirms what is real and current). If so, agencies
already have a vocabulary for exactly the capability we claim to improve.

## Amendment, 2026-09-08 (S12/V1) — read this before the original text

The principle held; the named standards were mostly wrong.

- **Headline vocabulary is DECISIVE** — *DECISIVE Test Methods Handbook v1.1*
  (UMass Lowell / US Army DEVCOM-SC, Oct 2022). Free, sUAS, GPS-denied, ≤91 cm,
  subterranean and constrained-indoor, with published confined-space and
  aperture-navigation metrics and **eight platforms already benchmarked**. It
  fits our problem better than anything else found.
- **NIST/ASTM E54.09 geometry is mirrored, never claimed.** Current published
  aerial standards are **E3426-24** (endurance) and **E3479-25** (apertures);
  confined spaces is still draft work item **WK85836**. ASTM texts are
  paywalled, NIST guides are free. Language is *"modelled on"* — never
  *"compliant with"*. This distinction is not pedantry; claiming compliance
  with a standard we have not been assessed against is the single fastest way
  to lose a procurement audience.
- **World Robot Summit and RoboCup Rescue are dead leads for aerial work** —
  WRS states aerial robots are not acceptable; RoboCup Rescue 2026A rules
  contain no aerial content. Deleted, reason recorded. Keep two ideas from
  RoboCup: its anti-race framing, and its 10:1 autonomous-to-teleoperated
  scoring weight.
- **Adopt NIST's four-element structure** — apparatus / procedure / metric /
  fault condition — and report repetitions-per-time with trial counts and
  confidence intervals.
- **Publish the discharge table**: what simulation cannot prove.
- **Preventative line gets a real target**: accuracy equal to or better than
  test-hammer tapping.

## Original proposed decision (superseded in its specifics, upheld in principle)

Where a recognized standard test method covers a capability we claim, **the
benchmark reports in that method's terms.** Private metrics are permitted only
as a supplement, never as the headline, and never where a standard exists.

Concretely:
1. S12/V1 produces the list of applicable methods and their metrics.
2. S09's benchmark harness implements those it can, in simulation, and states
   plainly which parts of each method simulation cannot discharge.
3. Where no standard covers a capability, we define our own — and say so
   explicitly rather than letting it blend in with the standardized results.
4. S04 should evaluate generating level geometry that reproduces standard test
   apparatus configurations alongside real collapse topography. A policy scored
   on a recognized test lane is directly comparable to fielded systems.

## Consequences

Makes easy:
- Results are legible to procurement, doctrine and IEC/IER classification, which
  is the actual path to deployment (V5).
- Comparison against existing fielded systems, rather than only against our own
  baselines — a far stronger claim, and one a skeptical audience can check.
- Gives S10 numbers an authority already knows how to read.

Makes hard:
- We may score badly against a mature standard. That is information, not
  failure, and S09 is already designed to make a negative result publishable.
- Constrains S04's generator and S09's harness to shapes we did not choose.
- Standards may be paywalled, US-centric, or a poor fit for confined-space
  aerial navigation specifically. V1 must check rather than assume; if the fit
  is genuinely bad, **reject this ADR** — a forced mapping onto an inappropriate
  standard is worse than an honest private metric.

## Alternatives rejected (provisionally)

- **Invent our own metrics only** — faster, self-flattering, and illegible to
  every audience in R5.
- **Wait until after S09 to consider standards** — retrofitting a benchmark is
  how a result becomes unusable exactly when it is needed.
