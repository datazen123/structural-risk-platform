# S03 — game core — 2026-09-08 — status: playable MVP

**Built:** `apps/game/` — Tier-0 reach client, "Rubble Run". Zero dependencies,
no build step (ADR-007). Open `apps/game/index.html` over any static server.

**Done**
- Deterministic fixed-step 60Hz sim, 4-DOF (x, y, z, yaw) + throttle. No wall
  clock, no `Math.random` in the sim path.
- Voxel level generator: rooms and corridors per floor, then crush zones that
  pancake floors and breaches that tear vertical shafts. 44×44×5.
- 2.5D slice renderer, Canvas 2D. Current floor sharp; shafts down drawn as
  inset markers, openings up as corner ticks. Fog of war with a facing cone, so
  it is a search problem rather than a maze you can read at a glance.
- Touch (two thumbs) + keyboard. Input sampled per sim tick, not per frame.
- Telemetry tap recording the input stream per ADR-002.
- Offline-first PWA: service worker caches the shell; runs with no network.

**Measured**
| | Result | Budget (C1) |
|---|---|---|
| Initial payload | **11.1 KB gz** | 200 KB |
| Telemetry, human-like input | **0.98 KB** / 90s run | 8 KB |
| Telemetry, random every tick | 21.1 KB | worst case, not representative |
| Level validity | **300/300 seeds** winnable | — |
| Deterministic replay | PASS | required |

**Three bugs found and fixed during testing**
1. Survivors were sampled from the 60 farthest reachable cells, which all
   cluster in one corner, so the separation rule rejected almost all of them —
   mean 1.32 survivors per level. Now shuffles the whole reachable pool and
   takes candidates greedily with a relaxing separation. Mean 3.00.
2. A level with zero survivors satisfied `found === survivors.length` on tick 1
   and instantly reported "extracted". Guarded.
3. int8 axis quantization meant analog jitter broke every run-length and blew
   the telemetry budget. 5-bit axes with the same deadband: 21 KB → 0.98 KB on
   representative input. Resolution is still far finer than human motor
   precision. **S02 should treat this as evidence, not as a settled codec.**

**Surprises**
- Entry point placement was the difference between a broken generator and a
  working one. Forcing entry into a fixed corner let a crush zone seal the
  player in a closet. It now floods from every floor-0 room and enters through
  whichever opens onto the most of the building.
- The payload budget is not the binding constraint it was treated as — we are
  at 5.5% of it with the whole game written. The real budgets to watch are
  frame time on a floor device and telemetry bytes.

**NOT done / known gaps**
- **No visual verification.** The Chrome DevTools MCP was locked by a stale
  profile for this whole session, so the renderer has never been looked at by
  anyone. Logic is verified headlessly across 300 seeds; the *look* is not.
  First job for whoever picks this up: open it and fix what is ugly or unclear.
- No audio. Proximity is visual only; audio is a strong candidate for the
  search signal and costs almost nothing in bytes.
- No survey mode (R-P001-8). SAR mode only. Survey is arguably the more
  important half now (P010) and needs its own level generator.
- Not measured on a real floor device. Frame budget unknown.
- No telemetry upload — the tap summarizes to screen and localStorage only.
  S05/S06 own the queue and ingest.
- Sim math is float, not fixed-point. Cross-platform determinism is unproven;
  that is S02's open question and this build does not settle it.
- No fun assessment. **The S03 done-criteria require five people outside the
  project to play it and want another run. That has not happened.** Until it
  does, this session is not complete by its own definition.

**Playtest 1 (2026-09-08) — two silent failures, both fixed**

Report: flying onto a survivor marker did nothing. Correct behaviour, terrible
design. Off-floor survivors were drawn identically to on-floor ones, so the
marker looked reachable when it was one or more floors away; and the climb
control does nothing where the ceiling is solid, with no signal before or after.
Two silent constraints stacked on each other.

Fixed:
- Find test split into separate horizontal (2.6 cells) and vertical (0.9)
  thresholds — readable, and it can be explained to a player.
- Off-floor survivors now draw as a dashed hollow ring with an explicit
  "▲ 1 floor" / "▼ 2 floors" label. On-floor ones are solid and pulse.
- `canUp` / `canDown` computed every tick from the drone's actual footprint.
- Objective banner, always on screen, that names the next action and says
  whether the climb is available from exactly where the player is hovering.
- Nearby floor-transit cells pulse blue when the target is on another floor.
  Limited to 8 cells' range: levels have 80–260 transit cells per floor-pair,
  so marking them all was noise.
- Floor column showing all five floors, which one you are on, and how many
  people remain on each.
- Found = green flash and an expanding ring, so the pickup is unmissable.

Verified: same-floor pickup PASS, wrong-floor pickup correctly blocked, 200/200
seeds fully staffed, 0/80 levels with a sealed floor-pair, payload 13.2 KB gz.

**Lesson, now a standing rule (R-P014-5): any rule the sim enforces must be
visible in the renderer. A silent constraint is a bug, not a difficulty.**

**Playtest 2 (2026-09-10) — vertical control was unusable**

Report: Shift/Ctrl appeared not to work; then "it works, I have to hold it —
make it instant, holding is too hard."

Root cause: vertical motion was a continuous held climb with terminal velocity
0.58 floors/sec, so a floor change took ~1.7 s of sustained holding and showed
no visible change until `floor(z)` flipped. Correct physics, unusable control.

Fixed: one key (`Space`), one tap, committed snap traverse — the sim takes one
tick of vertical input, commits the whole floor change, and drives it to
completion in ~0.32 s regardless of what the player does next. Direction is
chosen by the game from the nearest unfound survivor, falling back to whichever
way is open. Encoded on the existing lift axis, so the telemetry contract still
has four axes. Touch gets one round button that appears only when the move is
available, so its presence is the availability signal.

Verified: single-tap traverse PASS, determinism PASS, payload 14.1 KB gz.

**Second instance of R-P014-5 in two playtests.** Both failures were the sim
being right and the client saying nothing about it. Worth treating as the
project's default bug shape rather than a coincidence.

**Playtest 3 (2026-09-10) — "how do you go up/down on mobile?"**

The question was the bug. `fb.hidden = !open` removed the floor button whenever
there was no gap above or below, which is most of the time, so on touch there
was usually no vertical control on screen at all and no way to discover one
existed.

Fixed: the button is always on screen during play — dimmed and labelled
`NO GAP` when unavailable, `UP`/`DOWN` when available. Added a second touch
path: a firm right-thumb flick up or down, deadzoned at 0.6 so turning never
triggers it (verified: 300 ticks of full-yaw input fire zero traverses).

**Three playtests, three defects, one shape.** Off-floor survivors drawn as
reachable; a climb that worked but showed nothing while working; a control
hidden exactly when the player needed to learn it. Every one was the sim being
right and the client saying nothing. The rule now reads: *disabled and visible
beats correct and absent.*

**Playtest 4 (2026-09-15) — controls invisible on iPhone 17 Pro**

Report: no joysticks visible in either Safari or Chrome on iOS.

Root cause: the HUD was `position:fixed; inset:0`, which sizes to the *layout*
viewport. iOS overlays its bottom toolbar on top of that box, so the sticks —
anchored 58px from the bottom — rendered underneath the tab bar. Both browsers
failed identically because Chrome on iOS is WebKit. **Device emulation did not
reproduce it**, because emulated viewports have no browser chrome; the bug was
only findable by reasoning about the real device or testing on one.

Fixed: HUD box is now driven by `visualViewport` (height and offsetTop) with
resize/scroll/orientation listeners, so it tracks the area actually visible.
Bottom offsets reduced to suit. Resting opacity raised 0.40 → 0.72 on the
sticks and 0.55 → 0.80 on the floor button; grey-on-near-black at 40% read as
"no controls" even where it was technically on screen. Stick captions moved
above the rings, which were colliding with the stats row.

Verified against a simulated 90px toolbar: sticks and button both clear, HUD
height tracks the visible viewport.

**Fourth playtest, fourth defect, same shape.** New standing rule: never anchor
an interactive control to the bottom of a `position:fixed; inset:0` box on
mobile — the browser puts its own chrome there.

**Playtest 5 (2026-09-15) — "still not working", and a real test suite**

The previous two fixes were wrong, and both were shipped on inference rather
than reproduction. Opacity was a real problem but not *the* problem;
`visualViewport` sizing helped but left the actual cause in place.

**Actual cause:** iOS Safari expands a cross-origin iframe to its content height
and anchors `position:fixed` to the *document* rather than the viewport. Inside
the artifact viewer, bottom-anchored controls therefore render far below the
visible area. Chrome on iOS is WebKit, so it failed identically.

Fix: **no `position:fixed` anywhere.** Everything lives inside `#app`, an
absolutely positioned box whose pixel height JS sets from the visual viewport.

Tests written and run:
- `test/logic.test.mjs` — 15 tests, all passing. Level validity over 200 seeds,
  determinism, idle drift, battery, pickup on/across floors, single-tap
  traverse and its refusal, telemetry budget.
- `test/dom.test.js` — 13 browser checks, all passing at 320x568, 402x874 and
  landscape 874x402, run against a faithful reproduction of the artifact
  environment (publish wrapper inside an iframe). Includes synthetic
  `TouchEvent` drives proving each stick produces the right axes with no
  cross-talk, both thumbs at once, and the knob tracking the thumb.
- End-to-end: synthetic touch on the right stick moved the drone 1.33 cells
  from spawn at speed 4.31. Not inferred — measured.
- `scripts/test.sh` runs the logic suite, the payload budget, and a layout
  invariant that fails the build if `position:fixed` returns.

**Process lesson, now a rule:** a fix for a device-specific defect is not done
until a test reproduces the failure, or the environment is faithfully rebuilt —
publish wrapper and iframe included. Emulated viewports have no browser chrome
and will not show this class of bug.

**Next:** play it again; then S02 (freeze the contract against this codec evidence),
then survey mode, then a floor-device frame measurement.
