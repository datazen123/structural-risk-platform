# HANDOFF — rolling state log

Newest first. Append a block when a session ends. See `sessions/README.md`.

---

## S00c — growth, consent challenge, training pivot — 2026-09-08 — status: complete

**Trigger:** user prompt P005.

**Done:** Added S13 (build in public / growth), S14 + ADR-006 (training &
screening product line), S01 thread R6 (addressable attention, minimum viable
harvest duration, and a check of the middle-schooler demographic assumption).
Launched S01 and S12 as parallel Opus 5 sub-agents; their handoffs land in
`HANDOFF-S01.md` and `HANDOFF-S12.md` for merging here.

**Decisions:**
- ADR-006 proposed — training/screening for real pilots and live-ready agencies
  treated as a first-class parallel product line, not a fallback. It routes
  around software assurance, airworthiness, airspace authority and slow
  procurement, while consuming the same corpus and telemetry contract.

**UNRESOLVED:** proceeding without verifiable parental consent was raised as an
option and **not adopted**. The counter-argument is recorded in ADR-004: the
objection is mechanical, not only ethical — unlawfully collected data is *inadmissible* as a training-data
source (S12/V3), so the life-saving data would not be usable for the
life-saving purpose, and the institutional path in R5/S10 closes permanently.
Three lawful routes to the same data are listed there. S01/R6 now tests whether
the middle-schooler premise is even true; if adults perform equivalently the
question largely dissolves. **Do not build player acquisition until resolved.**

**Surprises:** The demographic premise driving every ethical and legal
complication in this project — that middle-schoolers are the optimal pilots —
was inherited from `sources/` and has never been checked. R6 now checks it.
Separately, paid social ads and a 2G audience may be close to disjoint
populations, which would make Instagram the wrong channel for the reach
audience entirely (S13/G3 checks this before anything else in that thread).

**Next:** await S01 + S12 agent results; then S13, S14, S02.

---

## S00b — certification thread added — 2026-09-08 — status: complete

**Trigger:** user requirement P004 — identify testing/validation requirements
for SAR and risk-assessment drones, Japan and other regions, technical and
non-technical.

**Done:** Added `sessions/S12-certification-validation.md` (threads V1–V7 +
requirements matrix), ADR-005 (proposed — benchmark in recognized standard test
methods rather than invented metrics), and `docs/02-constraints.md` §C6 as a
placeholder for the constraints S12 will produce. Wired S12 into the DAG and
into the S03, S04, S08 and S09 briefs. Set the S01/S12 scope boundary so the
two research sessions don't duplicate.

**Decisions:** S12 runs **in parallel with S01**, immediately. It is upstream
research that can invalidate downstream specs; serializing it behind S01 means
finding out late.

**Surprises:** Four risks surfaced that the scaffold had silently assumed away,
now recorded in C6 —
1. our 2.5D sim is near-certainly inadmissible as certification evidence, so a
   separate narrow high-fidelity validation sim may be an unbudgeted component;
2. a learned policy may be fieldable only inside a deterministic safety
   envelope, which would grow S09's scope from "a policy" to "a policy plus a
   certified envelope";
3. whether anonymous minors' gameplay is an **admissible training-data source**
   under an assurance regime is open — this couples ADR-004 to certification and
   could be decisive for the entire approach;
4. disaster-zone airspace authority (manned rotary-wing dominance, controlled
   airspace, deconfliction) is a harder constraint than the project had
   acknowledged.

**Next:** Run `S01-research.md` and `S12-certification-validation.md` as two
parallel fresh sessions.

---

## S00 — bootstrap — 2026-09-08 — status: complete

**Done:** Repo scaffold, `CLAUDE.md` spine, constraints (C1–C5), vision,
architecture, glossary, ADR-001/003 accepted, ADR-002/004 proposed, session
protocol + briefs S01–S11.

**Decisions:**
- ADR-001 — client stack is Canvas 2D PWA, 2.5D slice navigation. This
  *overrides* the Unity/Unreal direction in `sources/`, driven by the user's
  2G/low-end-Android reach constraint. Do not revert without a superseding ADR.
- ADR-003 — Japan seeds data; cascade transferability is an architectural
  requirement, obligating a degraded-input tier in the ingest pipeline.

**Surprises:** The reach constraint inverted the project's own premise in a way
that strengthens it — the players are drawn from the populations the system
protects. That is now the lead of the pitch (`docs/00-vision.md`), and it is
load-bearing for S10.

**Open / unresolved:**
- Codename and public identity — not chosen. Needed before S10.
- ADR-002 (telemetry determinism) is unratified; S02 must confirm the
  fixed-point vs. pinned-float question. It is the main technical risk.
- ADR-004 (minors' governance) unratified; the offline verifiable-parental-
  consent problem may bind which markets can launch at all.
- No engineering estimate yet for the Tier-0 render budget on a real floor
  device. S03 should measure early, not late.

**Next:** Run `sessions/S01-research.md` in a fresh session. *(Superseded by
S00b: run S01 and S12 in parallel.)*

---

## S00d — S01 + S12 merged, synthesis report ingested — 2026-09-08 — status: complete

**Done:** Installed S12's §C6 into `docs/02-constraints.md`. Amended ADR-003
(two cascades), ADR-004 (representativeness outranks consent), ADR-005 (DECISIVE,
not WRS/RoboCup), ADR-006 (understated; has funded buyers). Corrected three
errors in `docs/00-vision.md`. Ingested `sources/source-synthesis-report.md` as
`docs/04-science-base.md`. Added S15 for the five items S12 left unowned.
Republished the Front Rose without the `db` capability so it can be made public.

**Full research detail:** `research/00-summary.md` (S01) and
`research/V0-summary.md` (S12); per-session handoffs in `HANDOFF-S01.md` and
`HANDOFF-S12.md`. Do not re-derive — read those.

**Surprises:**
- The vision's arrow chain was wrong in three places at once: it omitted the
  safety envelope, overstated "corpus", and assumed we operate the aircraft.
  We are never the operator; the milestone is a standing 防災協定.
- Representativeness (EASA DM-13-2) sits *above* consent. Even perfectly lawful
  minors' data would not make phone gameplay the input state space of a
  rotorcraft in rubble. Reframed as a navigation strategy prior.
- Both non-US standards leads were dead for aerial work. DECISIVE, which nobody
  had named, fits better than anything we proposed.
- Three of five shortlisted cascade regions gate at the border. The data cascade
  survives; the deployment cascade is closed, not slow, in several.
- Android Earthquake Alerts is a far closer precedent than anything in
  `sources/` — and its failure mode (magnitude saturation at the extreme,
  missing inland populations) is exactly the risk our crowd corpus carries.

**Next:** S02 (unblocked), S15, S13, S14.

---

## S03 — game core — 2026-09-08 — status: playable MVP, unverified visually

Built `apps/game/` — deterministic sim, 2.5D slice renderer, touch+keyboard,
telemetry tap, offline PWA. 11.1 KB gz (5.5% of budget), 0.98 KB telemetry per
run, 300/300 seeds winnable, deterministic replay passes. Three real bugs found
and fixed in test — see `HANDOFF-S03.md`, especially the telemetry codec change,
which S02 needs.

**Caveat that matters: nobody has looked at it.** The browser tooling was locked
all session, so the renderer is logically correct and visually unverified.

**Next:** open it, then S02.

---

## S03b — reach client deployed — 2026-09-11 — status: live

Rubble Run published as a standalone artifact and linked from the Front Rose
beacon. Single-file bundle, 13.9 KB gz, zero dependencies, no build step.

- Game: https://claude.ai/code/artifact/e8c9dc11-43e6-47d9-9c4c-d530d7bfc020
- Beacon: https://claude.ai/code/artifact/20e77c3e-b873-4c65-9ee4-54bab0d18742

Chain two link 03 "Played session" moves from *not yet built* to
**demonstrated** — the first demonstrated link in either chain.

**Drift risk to watch:** `apps/game/` is the source; the published artifact is a
concatenated bundle of it. They are not linked. Any change to the game must be
re-bundled and republished, or the beacon silently serves an old build. S07
should own this as a CI step rather than leaving it to memory.

**Still open on the game:** no survey mode, no audio, no floor-device frame
measurement, float rather than fixed-point sim math, no telemetry upload path.
And the S03 done-criteria remain unmet — five outside players wanting another
run has not been tested.

---

## S03c — twin-stick mobile controls — 2026-09-14 — status: live

Mobile control layout rebuilt to the user's spec (P018). Left stick yaw only,
right stick forward/reverse/strafe, floor button to the right of the right
stick. Sticks are now *visible* — faint at rest so a first-time player can see
they exist, then they float to the thumb. Left stick's knob is locked to the
horizontal axis so the control shows its own limits.

Removed the right-thumb flick for floor changes: the right stick's vertical
axis is forward/reverse now and would collide.

**Layout bug caught before publishing:** the 50% touch-zone split put the right
stick's own resting centre in the *left* zone on a 360px-wide viewport — Pixel
and most Androids. Split moved to 42%; geometry verified at 320/360/390/414/768
for stick-stick overlap, stick-button overlap, and resting-centre-in-own-zone.

Added `scripts/bundle-game.py` so the artifact bundle is reproducible rather
than hand-assembled. Still not wired into CI — the drift risk from S03b stands.

Payload 14.8 KB gz. Determinism PASS. Axis mapping verified by unit test on the
Input class with a stubbed touch surface.

---

## S00e — published publicly — 2026-09-15 — status: live

Repository: https://github.com/datazen123/structural-risk-platform (public)
67 files, 2 research programmes, 7 ADRs, a working prototype.

**Redactions made before publishing.** Three things could not go public:
1. `requirements/user-prompts.md` — the verbatim prompt log, which carries a
   personal email address and a private remark about proceeding without
   parental consent. Now gitignored; kept locally.
2. That remark, quoted and attributed in `ADR-004`.
3. Two research files referencing it as a stated position.

In each case the *analysis* was preserved and the *attribution* removed — the
argument that unlawfully obtained data is inadmissible under EASA DM-06 is worth
publishing; a private remark that reads badly out of context is not. A redacted
`requirements/requirements.md` keeps every requirement ID so ADR cross-references
still resolve.

**Left undecided on purpose:** no licence. Default copyright applies, so nobody
can legally build on this yet. The README states it. This is an owner decision
with commercial consequences and should not be made by default.

**Drift risk, third mention:** `apps/game/` is the source, the published
artifact is a bundle of it, and nothing enforces sync. `scripts/bundle-game.py`
makes it reproducible but not automatic. S07 should own it.
