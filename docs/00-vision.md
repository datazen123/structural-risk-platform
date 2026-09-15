# Vision

Derived from `sources/Gamified_Drone_Search_and_Rescue_System.md`, sharpened by
the constraints in `docs/02-constraints.md`.

## The thesis, in two halves — and the second one matters more

**The preventative half (primary).** Buildings do not become dangerous on the
day of the earthquake. They become dangerous slowly, in public, through changes
anyone can see from the street: air-conditioning plant and water tanks added to
roofs and facades, balconies enclosed, informal storeys stacked on top, and
above all ground-floor walls removed to open a shopfront — the soft-storey
conversion that is among the most reliable predictors of collapse there is.
Every one of those changes is externally visible, and essentially nobody watches
for them continuously.

Crucially, this moves **in both directions**. A building's risk signature is a
distribution of mass and stiffness, and every visible modification shifts it —
sometimes for the worse, sometimes for the better. Replacing a heavy clay-tile
roof with light sheeting removes mass exactly where it does most harm. External
bracing, added shear walls, removing an informal top storey, or simply placing
new roof plant symmetrically rather than all on one side, all reduce
vulnerability. A local business installing an awning or a canopy is already
spending money and already hiring a contractor; the marginal cost of the
risk-reducing configuration is often small.

That bidirectionality is not a technical footnote — it decides whether the
system is adopted. A platform that only names dangerous buildings is an
accusation, and accusations get buried. A platform that tells an owner how the
investment they are already making could also brace their building is a service.
Same pipeline, opposite politics.

Rapid Visual Screening already exists as professional doctrine for exactly this
judgement, and it was designed for an engineer walking a street with a
clipboard. Passive imagery — satellite, street-level, CCTV, ordinary phone
cameras, and drone survey where it is available — makes that screening
continuous and city-scale. The output is **a collapse-risk estimate per
building that re-runs whenever the building visibly changes**: continuous
integration for the built environment. That is a system that saves lives every
year rather than during the week after an earthquake, and it is the half that
disaster-risk agencies actually budget for.

**The reactive half.** Human pilots still beat autonomous systems at improvised
navigation through cluttered, partially-collapsed three-dimensional space — the
problem post-disaster SAR presents. That skill is abundant, unmeasured, and
currently spent entirely on entertainment. A genuinely fun game, set in levels
derived from real collapse topography and instrumented, turns every play session
into a measured demonstration of expert confined-space navigation.

**The two halves are one system.** The observatory produces a prioritised queue
of structures that need a closer look; the drone and its operator are how the
closer look happens, and survey-mode gameplay is where the prioritisation and
inspection skill is learned and measured. The reactive half is what you do when
prevention has already failed — which is why it cannot be the headline.

## Why prevention leads

- It runs 365 days a year. SAR runs for roughly 72 hours, twice a decade, in
  any given place.
- It is what integrated disaster-risk-management agencies procure against.
- It needs no airspace authorisation, no airworthiness certification, and no
  learned component inside a safety envelope — the four gates that stand
  between the reactive half and a field deployment (see §C6).
- It is the honest half of the reach argument: the largest reachable player
  populations are not the most seismically exposed, but every city has building
  stock that changes.
- And the losses are concentrated where enforcement of building practice is
  weakest, more than where shaking is strongest — governance quality predicts
  collapse deaths better than seismicity does [Ambraseys & Bilham, *Nature*
  2011, via `research/R1-regions.md`]. Prevention is the lever that acts on the
  stronger of those two variables.

**The hardest constraint on this half is not technical: accuracy is not
adoption.** A correct risk estimate does not act on itself, and the people who
must act on it are usually the ones it costs — an owner facing repair bills, a
municipality facing liability once it has been formally told, a tenant facing
displacement, an insurer facing repricing. Every one of those is a reason a true
finding sits unused, and none of them requires anyone to behave badly. Seismic
retrofit ordinances in wealthy, well-run cities took decades for exactly these
reasons.

So the design question is not "can we produce a correct score" but "**who
receives it, what can they do about it, and what makes acting easier than
ignoring it**". S16 owns that, and it is the reason the bidirectional framing
matters so much: guidance an owner can act on profitably is adopted; a verdict
they can only comply with expensively is resisted.

## The inversion that makes it work

The naive version harvests players in rich countries to help victims in poor
ones. The version we are building runs on 2G and eight-year-old Android phones,
which means the largest player populations are in the regions with the *least*
SAR infrastructure and the *highest* disaster mortality.

The people generating the ingenuity are the people it protects. That is the
pitch, and it is also true, which is why it is the pitch.

## Two mission classes, not one

The source doc and most of the discussion centre on SAR — the reactive case,
after a building has already fallen on someone. But the user's requirement
(R-P001-8) names a second class that is easy to lose and worth more lives:

- **Reactive — SAR.** Navigate a collapsed structure, find survivors, fast,
  under time pressure and degraded comms. High drama, high stakes, and the
  natural fit for a game.
- **Preventative — risk-assessment survey.** Systematically inspect intact
  structures and terrain *before* an event: facade and joint condition, slope
  instability, drainage, access routes, structural retrofit verification.

The preventative case is the less exciting half and the more fundable one —
it runs 365 days a year rather than twice a decade, it is what IDRM agencies
actually budget for, and it demands a different and complementary skill
profile: thoroughness, systematic coverage, and inspection discipline rather
than reaction speed. It is also how a player's skill stays measurable between
disasters.

Both must be playable game modes and both must be in the pitch. Designing for
SAR alone is the obvious mistake to avoid; S03 and S04 own this.

## Two deliverables, one system

### 1. The game (must be fun on its own merits)
Nobody plays a data-collection instrument. Retention is the data pipeline. If
median session length is under 4 minutes and D1 retention is under 20%, the
research programme has no fuel. Fun is an engineering requirement with a number
attached, not a nice-to-have.

### 2. The evidence pipeline (must be legible to non-gamers)
Investors, civil-defence authorities, seismic researchers, and IDRM agencies
need to see the causal chain, end to end, with real numbers:

```
real collapse topography → procedural level → played session
   → kinematic telemetry → skill metrics → trajectory corpus
   → navigation strategy prior → policy INSIDE a certified safety envelope
   → benchmark vs. baseline → field platform operated by a partner agency
```

Three corrections forced by S12 (2026-09-08), all of which the earlier chain got
wrong and all of which matter to how this is presented:

1. **The envelope is part of the deliverable, not an implementation detail.**
   SORA 2.5 Annex E and EASA AI Concept Paper Issue 2 converge independently:
   a learned navigation component is fieldable only behind an independent
   monitor with passivation and recovery to a traditional backup. We ship a
   policy *plus* an envelope, or we ship nothing.
2. **"Corpus" overstated it.** Under EASA DM-13-2 representativeness, phone
   gameplay is not the input state space of a rotorcraft in rubble. The
   defensible term is **navigation strategy prior**. Use it.
3. **We are never the operator.** Japan's 航空法132条の92 is a statutory
   exemption available to the State, local bodies, or parties acting *at their
   request*. The milestone is a standing 防災協定 — which is simultaneously the
   sales channel, the airspace route, and the data access.

Every arrow in that chain must be demonstrable, not asserted. Where an arrow is
still aspirational, the deck says so. Credibility with authorities is
lost exactly once.

## What "TOP GUN metrics" means here, concretely

The source doc asks for every measurable dimension of pilot skill. Decomposed
into things a 4-DOF telemetry stream can actually support (candidate list;
S08 selects and validates):

- **Reaction latency** — hazard onset → first corrective input.
- **Decision latency under branching** — time at a junction before commitment.
- **Path efficiency** — flown length vs. optimal, per void topology.
- **Clearance discipline** — margin distribution vs. obstacle geometry.
- **Control smoothness** — jerk/snap spectra, input entropy, deadband use.
- **Recovery competence** — time-to-stable after induced disturbance.
- **Spatial memory** — revisit rate, backtrack cost, coverage without a map.
- **Search strategy** — sweep pattern class, victim-detection rate per metre.
- **Degradation tolerance** — performance under injected latency, sensor
  dropout, wind, partial control loss. *Correction (S12/V6): this is NOT
  understudied, as this document previously claimed — it is scored examination
  subject 4-3 in Japan's national practical test. That is better news than the
  original claim: an existing certification scheme already measures it, so our
  metric can be anchored rather than invented.*
- **Heading discipline** and **minimum time-to-collision** — both scored in the
  Japanese practical exam, both missing from this list until S12.
- **Load tolerance** — skill retention as concurrent-task pressure rises.

The last two matter most and are the least studied. They are also cheap to
induce in a game and expensive to study in the field. That asymmetry is the
research contribution.

## Explicitly out of scope for MVP

Recorded here so no session re-opens them:

- Bio-cybernetic / insect-cyborg swarms. Real research area, genuinely relevant
  long-term, but it is a decade-scale hardware programme. It belongs in the
  whitepaper's horizon section, not the MVP. Revisit after S01 research.
- Real-time control of live field drones by game players. Regulatory
  non-starter for MVP; the pipeline is offline policy transfer.
- Physical drone hardware of our own.
