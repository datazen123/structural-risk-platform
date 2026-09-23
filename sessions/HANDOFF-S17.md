# S17 — 3D client — 2026-09-21 — status: **D1 only. PARTIAL.**

Scope was cut mid-session. **D1 is complete; D2, D3 and `apps/game3d/` were
never started.** Whoever picks this up inherits an unfinished brief, not a
finished one.

## Done — thread D1

All three references reproduced, documented, and published as reviewable
artifacts. Full write-up: `research/D1-references.md`.

| # | Reference | Artifact |
|---|---|---|
| 1 | gist `lordsean/afdd4f5f` | https://claude.ai/code/artifact/3b6464d6-0dcf-4a4c-9940-a2b6b7034190 |
| 2 | codepen `MadeByArne/BaWxOaR` | https://claude.ai/code/artifact/488698a8-8ddc-43d7-90d1-1b4b96b9ba98 |
| 3 | kirupa Canvas starfield | https://claude.ai/code/artifact/19fcc176-33d9-454f-96b8-d26c24166631 |

| Ref | Technique | Deps | Payload gz | Needs WebGL |
|---|---|---|---|---|
| 1 | CSS `box-shadow` points on 3 rigid planes | none (Sass at build) | 2.79 KB | No |
| 2 | identical to ref 1 | none (Sass at build) | 2.81 KB | No |
| 3 | Canvas 2D perspective `x/z` divide | none | 1.19 KB | No |

**Recommendation: reference 3.** The brief predicted this and it survived being
tested hardest. See `research/D1-references.md` §Recommendation.

## Three things the next session needs to know

1. **The reference list contained a duplicate.** Refs 1 and 2 are the same
   effect by the same original author (Keith Clark); ref 2's own HTML comment
   names its parent pen. D1 compared **two** techniques, not three, so the
   candidate set is thinner than the brief assumed.

2. **The seven missing renderer pieces were built, not argued.**
   `research/D1-repros/void-projection-probe.html` projects a seeded voxel
   rubble field with a camera basis, explicit focal length, near clip, bucket
   depth sort, `fillRect` splats, pre-baked depth palette and shell+slab
   culling. 3.64 KB gz, 120 fps at 6× CPU throttle, 9.5 MB heap.
   **It is D1 evidence and NOT the prototype** — it generates its own volume
   and does not import `apps/game/src/*`. Do not let it drift into being
   `apps/game3d/` without wiring the real `Level`/`Sim`.

3. **A claim was made, measured, and withdrawn.** The draft asserted
   `ctx.arc()` is much more expensive than `fillRect`. Two microbenchmark runs
   at 6× throttle disagreed *on the sign* (arc 31% slower, then 20–29%
   faster). The claim is withdrawn and marked as such in the artifact and the
   doc. The `fillRect` recommendation now rests on correctness — a rectangle
   is the right silhouette for a voxel face — not speed. **Do not re-launder
   the performance version of this claim into D2 without a better method.**

## NOT done

- **D2 stack bake-off — not started.** No raycast column renderer, no
  hand-written WebGL1, no Three.js, no comparison table, no Tier-0/Tier-2
  recommendation. `research/D2-stacks.md` does not exist.
- **D3 Noto morphology — not started.** `research/D3-noto.md` does not exist.
  `research/R1-regions.md` §3 already catalogues the datasets; read it before
  searching. The standing constraints still hold: post-event Noto airborne
  LiDAR is **not open** (Nakanihon Air Service / Ishikawa Prefecture), the
  per-building damage dataset **is** open (ESSD + Zenodo), and **no open corpus
  of post-collapse interior void geometry exists anywhere**
  (`research/00-summary.md`, C-7) — so interiors are simulated whatever we do
  and every artifact must say so in those words.
- **`apps/game3d/` — not started.** Nothing was built against the real sim.
- **ADR-008 — not written.** It cannot be written yet: D1 alone cannot decide
  the renderer, because the Tier-2 question is entirely untouched and three of
  the five candidate stacks were never evaluated.
- **No real-device measurement.** Everything is emulated throttling on a
  desktop CPU. `[UNVERIFIED]` on floor-class hardware.
- **Frame time for refs 1 and 2 not measured** — CSS animation runs on the
  compositor, so the rAF probe used for ref 3 measures the wrong thread and
  would flatter CSS. Needs trace-level raster/compositor timings in D2.

## Constraints respected

- `apps/game/` **not modified**. Verified by `git status`.
- The sim was not forked and not touched; ADR-002 determinism and the C3
  telemetry contract are untouched.
- `./scripts/test.sh` passes: 15/15 logic tests, payload 15.5 KB gz (7.8% of
  the C1 budget), no `position:fixed`.
- No `position:fixed` and no `100vh` in any published artifact — the S03 iOS
  iframe lesson. Ref 2's faithful reproduction keeps its `100vh` so the defect
  stays visible in the record; the artifact version does not.
