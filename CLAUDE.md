# CLAUDE.md — always-loaded project spine

Structural risk platform with two coupled halves. **Prevention leads** (P010).

**The preventative half — primary.** Passive imagery (satellite, street-level,
CCTV, phone, drone) watching a city's buildings for the visible changes that
raise collapse risk — roof plant, informal storeys, soft-storey shopfront
conversions — and re-running a screening estimate whenever a building changes.
Continuous integration for the built environment. See S16.

**The reactive half.** A game that harvests human piloting ingenuity and turns
it into navigation capability for SAR robots. It is also how the preventative
half's inspection queue gets serviced.

**What it is, precisely:** a human-computation middleware and open telemetry
specification for games with a purpose (ADR-009). The surface can be any game by
any studio; we supply the layer beneath. Rubble Run is the **reference
implementation**, not the product — which makes S02, freezing the telemetry
contract, the highest-value unbuilt thing here.

Deliverables:

1. **A game that is actually fun**, playable on 2G/3G and low-end Android, that
   harvests human piloting ingenuity.
2. **An evidence pipeline** presentable to investors, authorities, researchers,
   and integrated disaster-risk-management (IDRM) agencies, showing how that
   ingenuity becomes flight/nav policy for real SAR robots.

If the game is not fun, there is no data. If the pipeline is not credible, there
is no deployment. Neither half is optional.

A third, near-term product line — training/screening for real pilots and
live-ready agencies — is under evaluation in S14 (ADR-006). It routes around
the certification and airspace gates that block the autonomy path.

## Non-negotiable constraints

Full text: `docs/02-constraints.md`. Summary:

- **C1 Reach.** Tier-0 client must run on Android 5+, ~1GB RAM, no WebGL, over
  2G. Initial payload budget **200KB gzipped**, hard-fail in CI above it.
- **C2 Offline-first.** Playable with zero connectivity after first load.
  Telemetry queues locally, store-and-forwards opportunistically.
- **C3 One telemetry contract.** Every client tier emits the same versioned
  schema. See `docs/contracts/`. Changing it requires an ADR.
- **C4 Minors' data.** Target demographic includes children. No PII, no raw
  audio/video/location, consent-gated, jurisdiction-aware. See ADR-004.
- **C5 Transferability.** Japan seeds the data; region-portability is a
  first-class design requirement, not a later port. See ADR-003.
- **C6 Certifiability.** *Pending, specified by S12.* Testing, validation,
  airspace, licensure and assurance regimes for real SAR and survey drones.
  Treat as live risk: do not build in ways that foreclose these options.

## How work is done here

Work is split into **sessions**. One session = one fresh Claude Code context
window = one brief in `sessions/`.

- Read `sessions/README.md` before starting any session.
- Read **only** the files your brief's *Read* list names. Do not explore.
- Write your outcome into `sessions/HANDOFF.md` before finishing.
- Decisions go in `docs/decisions/` as ADRs. Never re-litigate an accepted ADR;
  supersede it with a new one instead.

## Repo map

| Path | Holds |
|---|---|
| `sources/` | Original human-authored input. Read-only. |
| `requirements/` | **Verbatim log of every user prompt**, with extracted requirement IDs. Append-only. |
| `docs/` | Durable knowledge: vision, architecture, constraints, glossary. |
| `docs/decisions/` | ADRs. The record of *why*. |
| `docs/04-science-base.md` | Extracted science base + what each finding obligates. |
| `docs/contracts/` | Frozen interfaces between workstreams. |
| `sessions/` | Session briefs + `HANDOFF.md` rolling state log. |
| `research/` | Research outputs, with sources cited. |

## Conventions

- TypeScript, strict. No framework in the Tier-0 game bundle.
- Every claim aimed at investors/authorities must cite a source in `research/`.
  Unverified assertions are marked `[UNVERIFIED]` inline. Do not launder them.
- Dates absolute (2026-09-08), never "last month".
- **Every new user prompt is appended verbatim to `requirements/user-prompts.md`**
  before the session ends, with an ID and extracted requirements. Never
  paraphrase, never edit prior entries. ADRs cite these IDs.
