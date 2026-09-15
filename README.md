# Structural Risk Platform — an open working repository

**Buildings do not become dangerous on the day of the earthquake.** They become
dangerous slowly, in public, through changes anyone can see from the street:
air-conditioning plant added to roofs, balconies enclosed, informal storeys
stacked on top, and above all ground-floor walls removed to open a shopfront —
the soft-storey conversion that is among the most reliable predictors of
collapse there is.

Almost nobody watches for those changes continuously. This project is an attempt
to, and to pair that with a second, smaller effort: measuring how people actually
search a collapsed building, so the robots that will do it have something to
learn from.

> **Status: research and early prototype. Nothing here is deployed.**
> 1 of 18 links in the two chains below is demonstrated end-to-end. We would
> rather you learn that from a status board than discover it in a meeting.

| | |
|---|---|
| **Live status board** | https://claude.ai/code/artifact/20e77c3e-b873-4c65-9ee4-54bab0d18742 |
| **Playable prototype** | https://claude.ai/code/artifact/e8c9dc11-43e6-47d9-9c4c-d530d7bfc020 |

---

## What is actually here

**Two research programmes**, both complete, both sourced, with unverified claims
left marked as unverified:

- `research/R1`–`R6` — disaster regions and mortality, device and network
  reality in low-connectivity markets, deployed SAR robotics, pilot-skill
  metrics, the institutional landscape, and addressable attention.
- `research/V1`–`V8` — certification, airspace law, ML assurance, the survey
  regime, procurement, operator qualification, cascade-region legality, and a
  requirements matrix across jurisdictions.
- Start with `research/00-summary.md` and `research/V0-summary.md`. Each ends
  with a list of everything the findings **contradicted** in our own documents.

**A working prototype** — `apps/game/`. A drone search game, 15 KB gzipped,
zero dependencies, no build step, offline after first load. It runs on cheap
Android hardware because the people we most want playing it are on cheap Android
hardware.

**A decision record** — `docs/decisions/`. Seven ADRs, each with the
alternatives that were rejected and why. Several were overturned by research;
those are amended in place rather than quietly deleted.

## The two chains

**Prevention — the primary half.** Passive imagery re-runs a structural
screening estimate whenever a building visibly changes. Continuous integration
for the built environment.

```
imagery (satellite · street · CCTV · phone · drone)
  → building identification → change detection
  → risk signature: mass, stiffness, eccentricity
  → screening estimate + uncertainty → prioritised inspection queue
  → engineer verification → owner guidance, retrofit or enforcement
```

It moves **in both directions**. Replacing a heavy clay-tile roof with light
sheeting removes mass where it does most harm; external bracing, an added shear
wall, or simply placing new roof plant symmetrically all reduce vulnerability.
That matters strategically, not just technically: a platform that only names
dangerous buildings is an accusation, and accusations get buried. One that shows
an owner how the money they are already spending could brace their building is
a service.

**Response — the second half.** Human pilots still beat autonomous systems at
improvising through cluttered, partially-collapsed space. That skill is
abundant, unmeasured, and currently spent entirely on entertainment.

```
collapse topography → procedural level → played session
  → kinematic telemetry → skill metrics → navigation strategy prior
  → policy inside a certified safety envelope → benchmark → partner-operated platform
```

The halves are one system: the observatory produces the inspection queue, and
the drone and its operator are how inspection happens.

## Things we think we have got wrong

Kept current, and the section most worth reading first.

- **Imagery may not see what matters.** Soft-storey conversion is invisible from
  directly overhead; roof-mounted mass is invisible from the street. We have not
  yet mapped our own blind spots.
- **"Added mass is bad" is wrong often enough to discredit us.** Extra mass at
  height lengthens a building's period, which can move it off the site's
  spectral peak or onto it. On soft soil the same change that helps elsewhere
  hurts.
- **Representativeness may be unfixable.** EASA DM-13-2 asks whether training
  data resembles the real input state space. Finger inputs to a phone game are
  not a rotorcraft in rubble, and no dataset size repairs that.
- **Accuracy is not adoption.** A correct risk estimate does not act on itself,
  and everyone who must act on it bears a cost. Retrofit ordinances in wealthy,
  well-governed cities took decades for exactly this reason.
- **Transfer is unproven.** Pilots beat gamers on some teleoperation tasks;
  gamers beat non-gamers on a few robotic-sim metrics. The literature is
  genuinely inconsistent. We treat transfer as our research question, not our
  premise.
- **No open corpus of post-collapse interior void geometry exists anywhere.**
  Our voids are simulated. Every document has to say so.

## Where help would matter most

1. **A city willing to be watched** — one district, one municipality, one
   insurer. Somewhere our risk scores can meet an engineer who knows the streets.
2. **Paired before-and-after damage data** — buildings recorded before an
   earthquake and after. Without the pairing a risk score is an opinion.
3. **Structural engineers who will tell us we are wrong** — especially about
   which risk factors are genuinely visible in imagery.
4. **Post-collapse interior void geometry** — scans, photogrammetry, as-built
   void surveys. One real building unblocks the most-blocked front.
5. **A Japanese disaster-response partner** — we can never legally be the drone
   operator; a standing 防災協定 is the airspace route and the data access at once.
6. **Anyone who tried this and failed** — retrofit ordinances, public risk
   registers, imagery-based screening. If it died politically rather than
   technically, that is what we most need to hear.
7. **Retrofit costs a shop would actually pay**, and **whether an insurer will
   underwrite an operation using a learned navigation component** — possibly the
   sharpest practical gate of all, and nobody appears to have asked.

Open an issue, or use the contact form on the status board.

## Repository map

| Path | Holds |
|---|---|
| `docs/` | Vision, architecture, constraints, glossary, science base |
| `docs/decisions/` | ADRs — the record of *why*, including rejected alternatives |
| `research/` | Both research programmes, sourced, `[UNVERIFIED]` marked |
| `sessions/` | Work decomposition, and `HANDOFF.md` — the running log |
| `apps/game/` | The playable prototype |
| `requirements/` | Requirement IDs that decisions cite back to |
| `sources/` | Source material this project was built from |

## Running the prototype

```bash
cd apps/game && python3 -m http.server 8799   #  →  http://localhost:8799/
```

No install, no build step, no dependencies. `scripts/bundle-game.py` produces
the single-file version that is published as an artifact.

## Conventions we hold ourselves to

- Every claim aimed at an expert audience cites a source in `research/`.
  Unverified assertions stay marked `[UNVERIFIED]` all the way through. We do
  not launder them into facts.
- Every arrow in both chains carries an evidence status: demonstrated, partial,
  or not yet built.
- Where a standard exists, we report in its terms and say *modelled on*, never
  *compliant with*, until we have actually been assessed.
- Decisions are superseded, not deleted.

## Licence

**Not yet chosen** — which means default copyright applies and you cannot yet
reuse this. If you want to build on it, say so in an issue and that will settle
the question quickly.
