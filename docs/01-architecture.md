# Architecture

Target shape for MVP. Owned by S02/S03; amend via ADR.

## System diagram

```
 ┌─ INGEST (offline, batch) ──────────────────────────────────────────┐
 │  Japan open geodata (GSI/NIED/G-空間) , post-event LiDAR, OSM       │
 │        │                                                           │
 │        ▼  ingest/  (Python)                                        │
 │  point cloud → voxel volume → z-slice stack → void graph           │
 │        │                                                           │
 │        ▼  procgen/                                                 │
 │  seeded generator → LEVEL PACK  (~40KB gz, deterministic seed)     │
 └────────┬───────────────────────────────────────────────────────────┘
          │  CDN, resumable, one pack at a time
          ▼
 ┌─ CLIENT (PWA, offline-first) ──────────────────────────────────────┐
 │  T0 Canvas2D 2.5D-slice  │ T1 +fx │ T2 WebGL (demo)                │
 │        │  same sim core, same input model, same telemetry          │
 │        ▼                                                           │
 │  sim/  fixed-step 4-DOF flight model + collision                   │
 │  tele/ ring buffer → quantize → delta → IndexedDB queue            │
 └────────┬───────────────────────────────────────────────────────────┘
          │  batched, compressed, store-and-forward (may be days late)
          ▼
 ┌─ BACKEND ──────────────────────────────────────────────────────────┐
 │  ingest API (idempotent, replay-safe) → object store + Timescale   │
 │        │                                                           │
 │        ▼  metrics/   skill feature extraction (S08)                │
 │        ▼  corpus/    trajectory dataset, versioned                 │
 │        ▼  policy/    IL/RL training + benchmark harness (S09)      │
 └────────┬───────────────────────────────────────────────────────────┘
          ▼
 ┌─ EVIDENCE SURFACE (S10) ───────────────────────────────────────────┐
 │  live dashboard · benchmark report · whitepaper · deck             │
 └────────────────────────────────────────────────────────────────────┘
```

## Why 2.5D slice navigation

The floor device cannot render a 3D collapse volume. But the *problem* is
irreducibly 3D — voids, ceilings, vertical shafts.

Resolution: voxelize the collapse volume, render the player's current
horizontal z-slice in Canvas 2D (cheap: tile blit), and make altitude a control
axis that moves the camera between slices, with the adjacent slices hinted via
edge shading. The player navigates a real 3D volume through a 2D window.

Consequences, all favourable:
- Render cost is O(visible tiles), not O(geometry). Runs on anything.
- Telemetry is honestly 4-DOF `(x, y, z, yaw)` + throttle — directly comparable
  to a real drone's state vector.
- Level packs are voxel-sparse, which compresses brutally well (RLE + octree).
- The T2 WebGL demo client renders the *same* voxel volume in 3D. The investor
  sees the pretty version of literally the same level the field player flew.

## Determinism

The sim is fixed-step and deterministic given `(level seed, input stream)`.
Therefore a session replays exactly from telemetry alone. This gives us:
- Telemetry compression: we ship inputs, not positions (positions are derived).
- Server-side validation and anti-cheat without trusting the client.
- Reproducible research: any published metric is re-derivable from raw input.

This is the single highest-leverage decision in the client. Do not break it.
See `docs/decisions/ADR-002-telemetry-contract.md`.

## Workstream boundaries (what lets sessions run in parallel)

| Seam | Frozen by | Consumers |
|---|---|---|
| Level pack format | S04 | S03 game, S09 training |
| Telemetry schema | S02 | S03, S05, S06, S08 |
| Ingest API | S06 | S05, S07 |
| Metrics definitions | S08 | S09, S10 |

Once a seam is frozen, both sides can be built in separate sessions without
either reading the other's code.
