# D1 — The three 3D references, reproduced and assessed

**Session:** S17 (thread D1). **Date:** 2026-09-21.
**Status:** complete. D2 (stack bake-off) and D3 (Noto morphology) were
descoped from this run and are **not** started.
**Question:** for each reference — rendering technique, dependencies, payload,
does it need WebGL, and what would it take to render a rubble void instead of
its current subject.

Every non-obvious claim carries an inline source. Unverified items are marked
`[UNVERIFIED]` and must stay marked downstream.

---

## Published artifacts

Each reference runs live, on a phone, with its technique and WebGL status
stated on the page.

| # | Reference | Artifact |
|---|---|---|
| 1 | gist `lordsean/afdd4f5f` | https://claude.ai/code/artifact/3b6464d6-0dcf-4a4c-9940-a2b6b7034190 |
| 2 | codepen `MadeByArne/BaWxOaR` | https://claude.ai/code/artifact/488698a8-8ddc-43d7-90d1-1b4b96b9ba98 |
| 3 | kirupa animated 3D starfield | https://claude.ai/code/artifact/19fcc176-33d9-454f-96b8-d26c24166631 |

Faithful minimal reproductions, and the script that builds them, are in
`research/D1-repros/`. Run `python3 research/D1-repros/build.py` to regenerate
them and print the payload figures below.

---

## Finding first: the brief lists three references but only two techniques

**References 1 and 2 are the same effect by the same original author.**

- Reference 1 is a gist titled *"Single element pure CSS 3D starfield"* whose
  own accompanying markdown credits it as *"A Pen by Keith Clark"*, pen
  `JjWyBb` [gist lordsean/afdd4f5fa31748100ca3d25513abb015, 2019,
  https://gist.github.com/lordsean/afdd4f5fa31748100ca3d25513abb015].
- Reference 2 is titled *"Pure CSS animated starfield"* and its own HTML
  comment reads *"Forked from https://codepen.io/keithclark/pen/ibEnk and
  edited so that it complies with
  https://sass-lang.com/documentation/breaking-changes/color-units"*
  [codepen MadeByArne/BaWxOaR, https://codepen.io/MadeByArne/pen/BaWxOaR].

Their SCSS is identical in every load-bearing parameter: `$stars: 350`,
`$depth: 300`, `$speed: 3s`, `$width: 3000`, `$height: 960`,
`perspective: 340px`, and the same three `@keyframes` blocks. The differences
are four cosmetic or structural tweaks, tabulated under reference 2 below.

Which Keith Clark pen is ancestor of which — `JjWyBb` or `ibEnk` — is
`[UNVERIFIED]` and does not affect the assessment.

**Consequence:** D1 evaluated two candidate techniques, not three. One of them
is a renderer and one of them is not.

---

## Reference 1 — gist `lordsean/afdd4f5fa31748100ca3d25513abb015`

*"Single element pure CSS 3D starfield"*

| Field | Finding |
|---|---|
| **Technique** | CSS `box-shadow` point cloud on three rigid parallel planes, transformed by the compositor |
| **Dependencies** | **None at runtime.** Sass at build time (`@import "compass/css3"` is present but unused by the output) |
| **Payload, `gzip -9`** | **2.79 KB** (10,742 B raw) |
| **Needs WebGL** | **No** |
| **Frame time @ 6× CPU** | **Not measured** — see *Measurement and its limits* |

### What it does

One empty `<div>`, 2 px square. Its `box-shadow` carries 351 shadow copies of
that square at different `(x, y)` offsets, emitted by a compile-time Sass
`@for` loop. `:before` and `:after` take `box-shadow: inherit`, so the same 351
points reappear at `translateZ(-300px)` and `translateZ(-600px)`.

The entire scene is therefore **1,053 points on exactly three flat planes**. An
ancestor sets `perspective: 340px`; the parent animates `translateZ` from 0 to
300 px over 3 s and loops. The loop is seamless because after 300 px of travel
each plane has arrived where the plane behind it began. Opacity keyframes on the
two pseudo-elements fade the far plane in so nothing visibly pops.

Note `@for $i from 0 through $stars` is inclusive — 351 shadows, not 350.

### What it would take to render a rubble void

Five structural blocks, none of which is a matter of effort:

1. **Every point needs its own depth.** A `box-shadow` list can only place
   points sharing the element's single Z. Three depths is the hard ceiling —
   one element, two pseudo-elements. Arbitrary depths means one DOM node per
   voxel, order 10³, each with its own transform: the workload CSS 3D handles
   worst.
2. **No occlusion.** Shadows composite in paint order with no depth buffer.
   White dots on black conceal this; opaque rubble faces would show the far one
   through the near one. Within a `preserve-3d` context the browser does sort
   children by transformed Z — a free painter's sort — but only between whole
   elements, and it fails on interpenetrating geometry.
3. **The camera cannot yaw.** `sim.yaw` exists and looking around is the
   drone's core verb. Rotating three flat billboards reads as a tilting card:
   there is no parallax between the 351 points sharing a plane.
4. **Geometry is frozen at build time.** Levels come from `Level(seed)` at
   runtime; CSS point positions come from the Sass compiler. Driving this live
   means assembling a multi-kilobyte `box-shadow` string per level and
   re-parsing it on assignment — and anything per-frame (fog-of-war reveal,
   survivor pulse) re-parses it every frame.
5. **Paint area is the union of every shadow's bounding box** — here
   3000×960 px, rasterised to a texture at device pixel ratio before the
   compositor transforms it. Scaled to a rubble field filling the view, that is
   heap the 60 MB C1 budget does not have.

**Verdict:** not a renderer. It draws one fixed point set on a few rigid planes
sliding along one axis. Viable as an **ambient background** — menu, loading,
telemetry-upload screen — at 2.79 KB and zero JavaScript. Not a candidate for
the gameplay renderer.

---

## Reference 2 — codepen `MadeByArne/BaWxOaR`

*"Pure CSS animated starfield"* — a fork of reference 1's technique.

| Field | Finding |
|---|---|
| **Technique** | Identical to reference 1 |
| **Dependencies** | **None at runtime.** Sass at build time |
| **Payload, `gzip -9`** | **2.81 KB** (10,801 B raw) |
| **Needs WebGL** | **No** |
| **Frame time @ 6× CPU** | **Not measured** — same reason as reference 1 |

### The complete delta

| Change | Ref 1 | Ref 2 | Why |
|---|---|---|---|
| Star shape | square | `border-radius:50%` | Cosmetic — the author's note says "rounded stars" |
| `hsl()` units | `hsl(90,0,75+random(25))` | `hsl(90,0*1%,…*1%)` | Modern Sass requires `%` on saturation and lightness. Same output: greys, 76–100% lightness |
| Container | `<body>` owns perspective + `overflow:hidden` | `.stars-wrapper` owns them at `height:100vh` | Makes the effect embeddable rather than document-wide |
| Body | `height:100%` | `margin:0` | Consequence of the wrapper |

### The one change that matters to this project

The wrapper is a genuine improvement — an effect that owns `<body>` cannot be
composed into a game screen. But it sizes that wrapper with **`height: 100vh`**,
and that is the exact construct that has already broken this project.

iOS Safari expands a cross-origin iframe to content height and anchors layout to
the document rather than the visible viewport. `sessions/HANDOFF-S03.md` records
four consecutive playtest defects of this family, the worst being touch controls
rendered behind the browser toolbar — present in the DOM, invisible on the
device, and **not reproducible under device emulation**, because an emulated
viewport has no browser chrome. `scripts/test.sh` now hard-fails on
`position:fixed` for the same reason.

Any adoption of this technique must replace `100vh` with a measured pixel
height. Both published artifacts do.

### What it would take to render a rubble void

The same five blocks as reference 1, unchanged — the fork alters presentation
only. One addition: `border-radius: 50%` rounds all 351 shadows into
anti-aliased discs rather than axis-aligned rectangles, which is a slower raster
path and the wrong silhouette for a voxel face.

**Verdict:** the better-engineered of the two CSS references and the one to copy
if the technique is ever used, with `100vh` replaced. It does not change D1's
conclusion.

---

## Reference 3 — kirupa, *Creating an Animated 3D Starfield Effect*

[kirupa.com, https://www.kirupa.com/animations/animated_3d_starfield_effect.htm]

| Field | Finding |
|---|---|
| **Technique** | **Canvas 2D perspective projection of points** — a real `x/z` divide, no GPU |
| **Dependencies** | **None** |
| **Payload, `gzip -9`** | **1.19 KB** (3,504 B raw) |
| **Needs WebGL** | **No** — `getContext('2d')` only |
| **Frame time @ 6× CPU** | Measured on a derived probe, see below |

### What it does

500 stars, each holding `(x, y)` in camera-centred coordinates and a `counter`
that decrements per frame. The counter is depth. Screen position is:

```js
starX = remap(this.x / this.counter, 0, 1, 0, canvasWidth)
// reduces to:  starX = (x / z) * canvasWidth
```

**That is the perspective divide** — divide a world coordinate by its depth,
multiply by a focal length, and the 3D point is on the 2D plane. It is the same
operation a GPU performs in its vertex stage, done in two lines of JavaScript on
a canvas that never requests a WebGL context. This reference is the existence
proof that real 3D maths does not require a GPU.

Four things in it are degenerate, and naming them precisely matters more than
the enthusiasm:

- **Focal length is not a parameter.** It is whatever `canvasWidth` happens to
  be, because `remap(…, 0, 1, 0, canvasWidth)` is a multiply in disguise.
  Resizing the canvas silently changes the field of view.
- **Size falloff is linear in depth** (`remap(counter, 0, canvasWidth,
  radiusMax, 0)`). True perspective falls off as `1/z`. Fine for dots, wrong for
  surfaces.
- **No camera basis.** The eye sits at the origin looking down one axis
  forever. No position, no rotation, no view transform.
- **No depth sort and no near-plane clip.** Neither is missed: every star is the
  same white dot so paint order is invisible, and the respawn at `counter < 1`
  stands in for clipping.

Those absences are the difference between a starfield and a renderer. Each is
cheap to close.

### What it would take to render a rubble void

**This was built, not argued.** `research/D1-repros/void-projection-probe.html`
is a standalone page that projects a seeded voxel rubble field — carved
corridors, side chambers, vertical breaches, scattered debris — using the same
`x/z` divide, Canvas 2D only, with the seven additions below. It is also the
second live stage inside the reference-3 artifact. **It is D1 evidence, not the
prototype:** it generates its own volume and does *not* import `apps/game/src/*`.
Whole page, including the generator: **3.64 KB gz**.

1. **A camera basis.** Replace the fixed origin with the sim's
   `(p.x, p.y, p.z, yaw)`. Rotate world into view about the vertical axis, then
   divide. ~10 lines, and **it requires no change to the sim** — the 4-DOF state
   is already published, so ADR-002's determinism and the telemetry contract are
   untouched.
2. **An explicit focal length**, `focal = (H/2) / tan(fov/2)`, so field of view
   survives a resize or orientation change.
3. **Near-plane clipping.** Real geometry crosses the eye plane constantly and a
   point at `z ≈ 0` projects to infinity and smears the canvas. Reject
   `z < zNear` *before* dividing.
4. **A depth sort.** Opaque rubble needs one or far surfaces paint over near
   ones. A comparison sort of ~10³ points is real money in 33 ms, so bucket by
   quantised depth: `O(n)`, and the bucket doubles as the shading key, which
   collapses thousands of `fillStyle` assignments into one per bin.
5. **Area instead of points.** Splats sized `focal/z` read as a voxel dust
   cloud; projected quads per exposed face read as solid and cost more. Use
   `fillRect`, not `ctx.arc()` — **on correctness grounds**, because a rectangle
   is the right silhouette for a voxel face. The performance argument for that
   swap is **not supported by this session's measurements**; see below.
6. **Depth-keyed shading, pre-baked.** A palette array built once at load and
   indexed by depth bin. Never assemble an `rgb()` string inside the frame loop —
   that is one allocation per voxel per frame, a plausible route to GC pressure
   against the 60 MB budget. *Mechanism, not measured this session.*
7. **Culling, before all of the above.** A 44×44×5 level is 9,680 voxels and
   must never all be projected. Two cheap filters do most of the work: keep only
   **surface-shell** voxels (a solid cell with ≥1 air neighbour — a fully buried
   cell is invisible by definition), and index those by position so each frame
   touches only the slab near the camera. The existing fog-of-war radius is
   already the right shape for the second.

**Verdict:** the only one of the three that is a renderer, and the only
technique that clears the constraint disqualifying the obvious answer. Qualifier
kept explicit: what is promising is the **technique class** — Canvas 2D
perspective projection — not these particular forty lines, of which perhaps a
dozen survive contact with a real scene.

---

## Measurement and its limits

### What was measured

**The void probe at 6× CPU throttle**, emulated 412×915 mobile viewport,
DPR 2, Chrome DevTools CPU throttling:

| Metric | Result | C1 budget |
|---|---|---|
| Sustained frame rate | 120 fps | 30 fps |
| Main-thread draw time | 0.07–0.16 ms/frame | 33 ms |
| Splats drawn | 160–250 | — |
| JS heap | 9.5 MB | 60 MB |

Read narrowly. This is the **JavaScript projection cost only** — it excludes
rasterisation and compositing — on a desktop CPU divided by six, **not** a
1 GB Cortex-A53. It says the projection maths is close to free. It does not say
the renderer is. `[UNVERIFIED — no measurement on real floor-class hardware;
R2-devices.md §4.3 already records that no published figure exists for WebGL
context-creation failure rates on low-end African Android either, and this
project should beacon both.]`

### A claim this session tried to make and could not support

An early draft asserted that `ctx.arc()` + `fill()` is "the single most
expensive habit" in the reference and that `fillRect` costs "a fraction". A
microbenchmark at 6× throttle, 480×480 canvas, **contradicted itself across two
runs**:

| Run | N | `arc` | `fillRect` | Direction |
|---|---|---|---|---|
| 1 | 500 | 0.692 ms | 0.526 ms | arc 31% **slower** |
| 2 | 500 | 0.522 ms | 0.650 ms | arc 20% **faster** |
| 2 | 1,500 | 1.197 ms | 1.684 ms | arc 29% **faster** |
| 2 | 2,500 | 1.900 ms | 2.680 ms | arc 29% **faster** |

Two runs of the same measurement disagreed on the sign. **The claim is
withdrawn and is not reported as a finding.** Both calls stay far inside budget
at these counts. The shape choice stands on correctness; the timing question
goes to D2 with a better method than a naive loop against a GPU-composited
canvas.

### What was not measured, and why

**Frame time for references 1 and 2 is not reported.** A compositor-driven CSS
transform does its work off the main thread, so the `requestAnimationFrame`
probe used for reference 3 measures approximately nothing there and would
flatter CSS by measuring the wrong thread. Comparing the two techniques honestly
needs trace-level compositor and raster timings. That is D2's job and it has not
been run.

Also not run: cold start, payload-over-2G timing, real-device testing, and any
comparison against raycast columns, hand-written WebGL1 or Three.js.

---

## Recommendation

**Reference 3 — the kirupa Canvas 2D perspective projection — is the only
viable basis for a Tier-0 3D renderer, and it is a strong one.**

The reasoning is a single elimination followed by a single confirmation.

**The elimination.** C1 assumes no usable WebGL: on the target device class it
may be absent, blacklisted, or present-but-broken. That assumption hardened
since ADR-001 was written — Chromium is removing the SwiftShader software
fallback, so *"WebGL context creation fail[s] instead of falling back"*, and
SwiftShader **was never used on mobile at all** [Intent to Remove: SwiftShader
Fallback, blink-dev / Chromium, 2024,
https://groups.google.com/a/chromium.org/g/blink-dev/c/yhFguWS_3pM;
https://chromestatus.com/feature/5166674414927872; summarised in
`research/R2-devices.md` §4.3 and `research/00-summary.md` C-10]. On Android
WebGL is hardware-backed or it fails outright, and `getContext('webgl')`
returning non-null is not a capability signal. Any stack whose only path is
WebGL fails the floor. All three references pass this test — **none of them
needs WebGL** — so it does not separate them. What separates them is whether
they can render a volume at all.

**The confirmation.** References 1 and 2, being one technique, cap out at three
rigid planes with no depth buffer, no camera rotation and build-time-frozen
geometry. They cannot express a rubble void; the limit is structural, not
budgetary. Reference 3 performs the actual perspective divide, and the gap
between it and a working renderer is seven standard, individually cheap
additions — all of which were implemented and are running in
`research/D1-repros/void-projection-probe.html` at **3.64 KB gz**, holding
**120 fps** at 6× CPU throttle with a **9.5 MB** heap.

Against C1's budgets — 200 KB gz, 30 fps, 60 MB heap — the headroom is roughly
two orders of magnitude on payload and one on frame time, with the caveats in
*Measurement and its limits* fully applied.

Three further points argue for it beyond the numbers:

- **It reuses the existing backend unchanged.** The camera basis reads
  `(p.x, p.y, p.z, yaw)` — state `sim.js` already publishes. No sim fork, no
  `sim_ver` bump, no telemetry-contract change. This is exactly the property
  ADR-001 and ADR-002 were designed to buy, and it holds.
- **It fits ADR-007.** Plain ES modules, no build step, no runtime dependency.
  References 1 and 2 would *introduce* a build step — Sass — to a project that
  deliberately has none.
- **It is one file.** `render.js` is the only file in `apps/game/` that draws.
  A Canvas 2D perspective renderer is a sibling to it, not a rewrite.

**Carry forward as the standing qualifier:** what is recommended is the
technique class, not the forty lines. Reference 3 is a proof of concept. And
this is a recommendation against *two* techniques, not three — D1's reference
list contained a duplicate, so the comparison set is thinner than the brief
assumed. **Raycast column rendering, hand-written WebGL1 and Three.js have not
been evaluated at all.** D2 must still run before ADR-008 can be written; the
Tier-2 question in particular is entirely untouched by D1.

---

## Files

| Path | Holds |
|---|---|
| `research/D1-repros/build.py` | Rebuilds refs 1–3 and prints payload figures |
| `research/D1-repros/ref1-gist-css-starfield.html` | Ref 1, faithful, full-page |
| `research/D1-repros/ref2-codepen-css-starfield.html` | Ref 2, faithful, full-page, `100vh` intact |
| `research/D1-repros/ref3-kirupa-canvas-starfield.html` | Ref 3, tutorial's final listing verbatim |
| `research/D1-repros/void-projection-probe.html` | The seven additions, running. **D1 evidence, not the prototype** |
