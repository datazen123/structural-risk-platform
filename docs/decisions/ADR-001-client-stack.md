# ADR-001: Client stack is Canvas 2D PWA with 2.5D slice navigation

**Status:** accepted
**Date:** 2026-09-08
**Session:** S00

## Context

Source doc proposed Unity/Unreal. The user then set the governing constraint
(2026-09-08): maximize reach on 2G/3G and old mobile devices in highly
un-connected regions, because the youth demographic with the target reflexes is
concentrated in poor geo-regions — which are also the regions most exposed to
disaster and least served by SAR infrastructure.

That constraint is incompatible with every engine the source doc named:
- Unity WebGL: multi-MB payload, needs working WebGL2, heavy heap.
- Unreal: installer or Pixel Streaming; both require bandwidth we do not have.
- Three.js: still needs WebGL, which on cheap Android is absent, blacklisted, or
  present-but-broken in ways that are worse than absent.

## Decision

**Tier 0 (default, the product):** offline-first PWA, TypeScript, **Canvas 2D**
renderer, zero runtime framework dependencies, 200KB gzipped initial payload.

**Navigation model: 2.5D slice.** Voxelize the collapse volume; render the
player's current horizontal z-slice as 2D tiles; altitude is a control axis
moving between slices, with adjacent slices hinted by edge shading. The player
navigates a genuinely 3D volume through a 2D window.

**Tier 2 (demo):** a WebGL client rendering the *same* voxel volumes, built
later, for investor/authority/researcher presentation only. It is never a
prerequisite for data collection.

Both tiers run the same deterministic sim core and emit the same telemetry.

## Consequences

Makes easy:
- Runs on effectively any device with a browser made after 2015.
- Sim/render separation is forced, so the WebGL tier is additive, not a rewrite.
- Telemetry stays 4-DOF and physically meaningful despite the 2D presentation.
- Voxel-sparse levels compress well enough to ship over 2G.

Makes hard:
- Visual spectacle. The T0 client will never look impressive; the pitch must
  lead with the T2 demo and the data, not with T0 screenshots.
- Some proprioceptive skill dimensions (true 3D depth judgement) are attenuated
  in a slice view. S08 must be honest about which metrics survive the projection
  and which do not. Do not claim what the projection cannot support.
- We write our own renderer, input, and audio. Budgeted; that is the trade.

Forecloses:
- Photoreal fidelity as a T0 feature. Permanently. Do not propose it.

## Alternatives rejected

- **Unity / Unreal** — violates C1 by 1–2 orders of magnitude on payload.
- **Three.js / WebGL as T0** — cheap-Android GPU driver reality; WebGL presence
  is not a reliable capability signal.
- **Native Android APK as T0** — better offline story, but Play Store
  distribution, per-device build matrix, and update latency all slow the CI/CD
  flywheel the project exists to prove. Revisit post-MVP if store distribution
  turns out to beat web acquisition in target regions (open question for S01).
- **SMS/USSD or feature-phone client** — genuinely maximal reach, but cannot
  capture the continuous dexterity signal that is the entire point.
