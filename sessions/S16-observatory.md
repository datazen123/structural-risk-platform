# S16 — The structural risk observatory (preventative half)

**Objective:** Specify the continuous, multi-source, passive pipeline that turns
ordinary imagery of a city's buildings into a collapse-risk estimate that
re-runs whenever a building visibly changes.

**Read:** `CLAUDE.md`, `docs/00-vision.md` (thesis + "Why prevention leads"),
`docs/04-science-base.md`, `research/V4-survey.md`, `research/R1-regions.md`,
`research/X4-survey-chain.md` *(from S15)*
**Owns:** `research/O*`, `docs/contracts/riskscore.v1.md`
**Depends on:** S12. S15/X4 and X5 strongly recommended first — the evidence
chain and imagery-privacy findings shape what this may collect.
**Budget:** large. Expect S16a (sources + change detection), S16b (risk model),
S16c (who receives it).

> Set by user requirement R-P010, 2026-09-08: **this is the more important
> half of the project.** Treat it accordingly.

## The idea in one line

Continuous integration for the built environment: every visible change to a
building re-runs its risk assessment.

## The chain this session specifies

```
passive imagery (satellite · street-level · CCTV · phone · drone survey)
  → building identification & footprint
  → change detection over time
  → risk-relevant feature extraction (RVS-derived)
  → fusion with structural metadata (GeoI · MatI · ModI)
  → collapse-propensity estimate + honest uncertainty
  → prioritised inspection queue
  → engineer verification and sign-off
  → retrofit, enforcement, or insurance action
```

Note where the reactive half attaches: the **prioritised inspection queue** is
what dispatches a drone and an operator. Survey-mode gameplay is where the
prioritisation and inspection skill is learned and measured. One system.

## Threads

### O1 — Imagery sources and what each can actually see → `research/O1-sources.md`
For each of satellite (optical and SAR), street-level, CCTV, crowd/phone photos,
and drone survey: resolution, revisit interval, cost, licence, coverage in both
seed and cascade regions, and — the question that matters — **which
risk-relevant features are visible at all** from that vantage. Roof-mounted
plant is invisible from street level; soft-storey conversion is invisible from
directly overhead. State the blind spots per source explicitly; a fused system
that does not know its own blind spots produces confident nonsense.

### O2 — Change detection → `research/O2-change.md`
Prior art in building change detection from remote sensing and street-level
imagery. What detection rates are actually achieved, on what change classes?
Distinguish **risk-relevant** change from cosmetic change — repainting is not
added mass. False positives here waste an inspector's day; false negatives
leave a soft-storey building unflagged.

### O3 — The risk signature: mass, stiffness, and their eccentricity → `research/O3-signature.md`

**Reframed 2026-09-08 (R-P012).** The model is not a checklist of bad features.
It is an estimate of how a structure's **mass and stiffness are distributed**,
and every visible modification moves that distribution — sometimes for the
worse, sometimes for the better.

Get the physics right, because the naive version ("added mass is bad") is
wrong often enough to discredit the whole system:

- **Mass at height.** Base shear scales with effective mass; overturning moment
  with mass × height. Roof plant, water tanks and added storeys raise the centre
  of mass and are penalised disproportionately by height.
- **Period shift is not monotonic.** T ≈ 2π√(m/k), so added top mass lengthens
  the fundamental period — which may move the structure *off* the site spectrum's
  peak or *onto* it. On soft soil with long-period amplification the same change
  that helps elsewhere hurts. **Site-dependent; do not sign it globally.**
- **Torsion may matter more than centre-of-gravity height.** Eccentricity
  between the centre of mass and the centre of rigidity is a major documented
  collapse driver. Asymmetric AC placement, or a glazed shopfront on the street
  face with solid walls behind, creates exactly that eccentricity.
- **Vertical irregularity.** Soft and weak storeys; codes commonly flag a storey
  whose mass exceeds ~150% of its neighbour.
- **Short-column effect** from partial infill — a stiffness change that
  concentrates shear demand and fails brittly.

Then, and only then, map to doctrine: RVS scoring and the FEMA P-154 lineage,
and ask which factors are observable from imagery. Candidates:
- **Soft/weak storey** from ground-floor infill removal for retail. Likely the
  single highest-value observable; check how strongly the literature supports it.
- **Added mass high on the structure** — AC plant, water tanks, roof additions.
- **Informal vertical extension** — storeys added beyond the original design.
- **Plan and vertical irregularity**, pounding risk from adjacent buildings,
  short-column conditions from partial infill.
- **Visible deterioration** — spalling, exposed reinforcement, cracking.
Mark each: reliably observable / partially observable / not observable. Do not
carry an unobservable factor into the model and hope.

### O4 — The risk model and its uncertainty → `docs/contracts/riskscore.v1.md`
How features become an estimate. Non-negotiables:
- **Calibrated uncertainty, published with every score.** A confident wrong
  answer about a building is worse than no answer.
- Fuse structural metadata per `docs/04-science-base.md` §4 — geometry alone
  reached 58.7% in the reference study; metadata reached 76.1%.
- Validate against observed post-event damage where such data exists (Le Teil
  and the Türkiye 2023 corpus are candidates).
- Site hazard is a separate layer, not a building property — liquefaction, Vs30,
  amplification.
- **Say what a score is not.** It is a screening prior that prioritises an
  engineer's attention. It is not a structural assessment and must never be
  presented as one.

### O7 — Beneficial modifications, and the incentive inversion → `research/O7-beneficial.md`
**Set by R-P012-4/5. Assessed viable before this session opened; the task is to
quantify and detect, not to establish that it exists.**

Externally visible changes that *reduce* seismic vulnerability. Confirm each
against the literature, quantify the effect, and state its detectability:

- **Replacing heavy roofs with light roofing.** The strongest seed-region case:
  traditional Japanese clay-tile-on-mud-bedding roofs on timber houses are a
  documented contributor to collapse, notably in Kumamoto. Replacing them
  removes mass exactly where it does the most harm, and it is plainly visible
  from above. **Start here.**
- **External steel bracing and exoskeleton retrofits** — designed to be visible.
- **Added shear walls, buttresses, column jacketing.**
- **Removal of informal upper storeys.**
- **Seismic gaps** introduced between adjacent buildings, reducing pounding.
- **Plan symmetrisation** — modifications that pull the centre of rigidity back
  toward the centre of mass.
- **Infill masonry: genuinely ambiguous.** Properly tied, it adds lateral
  stiffness and strength; badly placed, it creates short columns or a soft storey
  above. It must be modelled as sign-ambiguous, never as an improvement.

Also research **rural typologies** (R-P012-3): heavy-roof timber, unreinforced
masonry, adobe, informal construction. Different signatures, different
beneficial upgrades, and often no permit trail at all — imagery may be the only
record that a change happened.

#### The incentive inversion — the reason this thread matters strategically

O5 identifies the political failure mode: a system that publicly names which
buildings will kill people is adverse to whoever profited from making them that
way, and gets buried. Bidirectionality inverts it.

The same pipeline that says *"this building got more dangerous"* can say
*"the canopy you are about to install could brace that facade for a little more,
and here is the detail"*. That is a service to the owner rather than an
accusation against them — and a local business installing signage, an awning, a
canopy or roof plant is already spending money and already hiring a contractor.
The marginal cost of doing it in the risk-reducing configuration is often small.

Specify: what an owner-facing output looks like, whether insurers or
municipalities would price or subsidise the difference, and whether this is the
route to adoption that a pure risk register can never be. **If it is, it
reorders the whole deployment strategy**, and S10's deck leads with it.

### O5 — Who receives this, and what happens next → `research/O5-governance.md`
**The hardest thread. Do not treat it as compliance.**
- Who may see a per-building risk score: owner, tenant, municipality, insurer,
  the public? Each answer has a different failure mode — property value
  destruction, tenant displacement, insurance redlining, or a list that gets
  quietly buried.
- Liability: what does a municipality owe once it has been told, and does that
  create an incentive *not* to be told? This is a real and documented dynamic.
- **Accuracy is not adoption — treat this as the central question.** A correct
  score does not act on itself, and every party who must act on it bears a cost:
  repair bills, liability once formally notified, displacement, repricing. None
  of that requires anyone to behave badly; it is ordinary incentive
  misalignment, and it is why retrofit ordinances in wealthy, well-governed
  cities took decades. Design for "what makes acting easier than ignoring it",
  not for "how do we publish the truth louder".
- **Protection for local partners.** Where enforcement is weak, an
  uncomfortable finding can carry professional or personal cost for whoever
  surfaces it. Ask what the operating model owes the people who report.
- Precedents worth studying: seismic retrofit ordinances with public building
  lists (Los Angeles, Istanbul, Christchurch), and what each got right or wrong.
- Imagery privacy and surveillance law — coordinate with S15/X5. CCTV reuse in
  particular is legally distinct from satellite.

### O6 — Where it plugs in → `research/O6-integration.md`
SIP4D and ISO 37179 as the publication route (`docs/04-science-base.md` §2).
OpenQuake / ESHM20 / ESRM20 as the hazard-and-loss engine, including the
provenance-preserving MCP server [12]. And optimal experimental design as the
formal basis of the inspection queue: **which building, inspected next, most
reduces uncertainty about the city?** That is the same mathematics as the
Sensor OED front and should share an implementation.

## Done when
- [ ] `research/O1..O6` written and sourced.
- [ ] `docs/contracts/riskscore.v1.md` — features, model, uncertainty, and an
      explicit statement of what the score is not.
- [ ] A blind-spot table: risk factor × imagery source × observable?
- [ ] `research/O0-recommendation.md` — a **staged deployment recommendation**,
      including which city or district is the honest first pilot and why, and
      the go/no-go conditions from O5.
- [ ] Vision, Front Rose and S10's deck updated to lead with this half.

**Produces:** `research/O0-recommendation.md` and `riskscore.v1.md`.
