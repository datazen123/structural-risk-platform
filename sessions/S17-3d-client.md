# S17 — 3D client: tech-stack evaluation and a rubble-morphology prototype

**Objective:** Find a 3D rendering approach that survives the C1 device floor,
reusing the existing sim unchanged, and test whether real Noto morphology can
drive a convincing rubble field.

**Read:** `CLAUDE.md`, `docs/02-constraints.md` (C1, C2),
`docs/decisions/ADR-001-client-stack.md`, `ADR-002`, `ADR-007`,
`research/R1-regions.md` (§Japan datasets), `research/R2-devices.md`,
`apps/game/src/*`
**Owns:** `apps/game3d/`, `research/D*`, `docs/decisions/ADR-008-*`
**Depends on:** S03 (the running Tier-0 client)
**Budget:** large. Split S17a (reproduce references), S17b (stack bake-off),
S17c (Noto morphology).

## The one architectural fact that makes this cheap

ADR-001 and ADR-002 already forced sim/render separation, and it holds:
`sim.js`, `level.js`, `tele.js` and `rng.js` contain **zero rendering
knowledge**. `render.js` is the only file that draws. A 3D client therefore
reuses the entire backend unchanged — same deterministic sim, same telemetry
contract, same levels, same replay — and swaps one file.

**Do not fork the sim.** If a 3D approach requires changing sim behaviour, that
is an ADR and a `sim_ver` bump, not a quiet edit. Determinism and the telemetry
contract are worth more than any renderer.

## The constraint that rules out the obvious answer

C1 assumes **no usable WebGL**: on the target device class WebGL may be absent,
blacklisted, or present-but-broken, and Chromium has been removing the
SwiftShader software fallback, so context creation now fails outright rather
than degrading (see `research/00-summary.md`, C-10). Any stack whose *only* path
is WebGL fails the floor. Budgets: 200 KB gz initial, 30fps, ≤60 MB heap.

> **Sequencing note, 2026-09-21.** The first attempt at this session stalled
> after fetching the references, with D1+D2+D3+prototype in a single run. Split
> it: D1 is its own run and publishes each artifact **as it works**, not in a
> batch at the end. D2, D3 and `apps/game3d/` follow as separate runs. The
> deliverable that matters is a reviewable artifact, not a complete report.

## Thread D1 — Reproduce the three references → `research/D1-references.md`

Get each running, read the technique, and write down what it actually does.

1. `https://gist.github.com/lordsean/afdd4f5fa31748100ca3d25513abb015`
2. `https://codepen.io/MadeByArne/pen/BaWxOaR`
3. `https://www.kirupa.com/animations/animated_3d_starfield_effect.htm`

For each: rendering technique, dependencies, payload, whether it needs WebGL,
measured frame time under 6x CPU throttle, and — the question that matters —
**what it would take to render a rubble void instead of its current subject.**

Publish each as its own artifact so they can be reviewed on a phone.

**The starfield is the interesting one.** It is perspective projection of points
in Canvas 2D — real 3D maths, no GPU. That is the shape of the answer this
session is most likely to arrive at, so test it hardest rather than assuming it.

## Thread D2 — Stack bake-off → `research/D2-stacks.md`

Build the *same* small rubble scene in each candidate and measure, don't argue:

- **Canvas 2D perspective point/voxel projection** with painter's-algorithm
  depth sorting. No GPU. Likely baseline.
- **Canvas 2D textured-quad / raycast** (Wolfenstein- or Doom-style column
  casting) — cheap, genuinely 3D-feeling in corridors, well suited to voids.
- **WebGL1 minimal**, hand-written, no framework — the capable-device tier.
- **Three.js**, to quantify the payload cost of the obvious choice honestly.
- Anything D1 turns up that beats these.

Measure per candidate: payload gz, cold start, sustained frame time at 6x CPU
throttle, heap, and whether it runs with WebGL disabled. Publish the table.

**Recommend one Tier-0 renderer and one Tier-2 renderer**, with the tier
recorded in telemetry as C3 requires — never as a schema variant.

## Thread D3 — Noto morphology → `research/D3-noto.md`

Goal: procedural rubble whose *shape statistics* match a real collapse site.

Confirmed naming: **2024 Noto Peninsula earthquake / 令和6年能登半島地震**,
1 January 2024, M7.6.

Data position, already established in `research/R1-regions.md` — read it before
searching:
- **Open and directly usable:** the Noto 2024 per-building damage dataset,
  published in ESSD with a Zenodo mirror. Building-level damage classes.
- **Open:** GSI ALOS-2 InSAR coseismic deformation and coastline change.
- **Not open by default:** post-event airborne LiDAR — Nakanihon Air Service /
  Ishikawa Prefecture, commercial-agency provenance. Pre-event Noto 2020 LiDAR
  sits on G-空間情報センター but is not uniformly open; check per dataset.

So the honest approach is probably **statistics, not scans**: derive rubble
morphology parameters — debris slope angles, void size distribution, collapse
typology mix, pancake vs lean-to vs V-shape frequencies — from open damage data
and the USAR literature, then drive the generator with those. That yields levels
that are *defensibly Noto-like* and shippable, where a licensed scan would be
neither.

Note the standing constraint: **no open corpus of post-collapse interior void
geometry exists anywhere** (`research/00-summary.md`, C-7). Interiors are
simulated whatever we do, and every artifact must say so.

## Done when
- [ ] `research/D1-references.md` — all three reproduced, technique documented,
      each published as a reviewable artifact.
- [ ] `research/D2-stacks.md` — measured bake-off table, one Tier-0 and one
      Tier-2 recommendation.
- [ ] `research/D3-noto.md` — morphology parameter set with sources, and an
      honest statement of what is open and what is not.
- [ ] `apps/game3d/` — a prototype using the winning stack and the existing
      sim, published as an artifact.
- [ ] `docs/decisions/ADR-008-3d-renderer.md`.
- [ ] Tests: the S03 suite must still pass, and the 3D client must reuse the
      sim without modification. Add renderer-level checks to `test/`.
- [ ] Handoff to `sessions/HANDOFF-S17.md`.

**Produces:** ADR-008 + a playable 3D prototype sharing the Tier-0 backend.
