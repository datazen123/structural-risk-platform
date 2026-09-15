# S04 — Terrain ingest & procedural level generation

**Objective:** Turn real disaster geodata into deterministic, tiny, playable
level packs — accepting both Japan-quality and degraded inputs (ADR-003).

**Read:** `CLAUDE.md`, `docs/01-architecture.md`,
`docs/decisions/ADR-003-region-cascade.md`, `research/R1-regions.md`,
`research/00-summary.md`
**Owns:** `ingest/`, `procgen/`, `docs/contracts/levelpack.v1.md`
**Depends on:** S01
**Budget:** large. Likely S04a (ingest+voxel), S04b (procgen+tuning).

## Tasks

1. **Two input tiers** — this is ADR-003 requirement 1 made real:
   - **Tier A (rich):** LiDAR point cloud / photogrammetric mesh + building
     footprints + post-event damage classification. Japan sources per R1.
   - **Tier B (degraded):** satellite DEM + OSM footprints + a parametric
     collapse model. **Must produce a playable level.** This is what makes the
     cascade to sensor-poor regions architectural rather than aspirational.
   Tier B is the harder and more important half. Do not leave it for later.
2. **Voxelization** — point cloud/mesh → sparse voxel volume → z-slice stack.
   Pick voxel size from what a drone can actually fit through, not from what
   renders nicely.
3. **Void graph** — extract traversable topology. Gives S08/S09 the optimal-path
   baseline every efficiency metric is measured against.
4. **Procgen** — seeded generator producing *variety* from a real base
   topography. Levels must be recognizably grounded in real collapse geometry
   while never being memorizable — memorized levels produce worthless telemetry.
5. **Survey-mode levels** — intact structures and terrain for the preventative
   mission class (R-P001-8). Different generator, same pipeline.
6. **Level pack format** — `docs/contracts/levelpack.v1.md`, ≤60KB gz per pack,
   octree/RLE compressed, carrying `provenance.fidelity` (ADR-003 req. 2) so
   every downstream claim can be qualified by input quality.
7. **Standard test apparatus geometry** — if S12/V1 identified recognized
   response-robot test lanes/apparatuses, evaluate generating them as levels
   alongside real collapse topography (ADR-005 §4). A policy scored on a
   recognized lane is directly comparable to fielded systems.
8. **Licensing** — record the licence of every dataset used. A level pack whose
   provenance we cannot state is not shippable to an agency.

## Done when
- [ ] Tier A pipeline runs end-to-end on a real Japan dataset.
- [ ] Tier B pipeline produces a playable level for at least one cascade region.
- [ ] Packs within size budget; deterministic from seed.
- [ ] `levelpack.v1.md` frozen; S03 consumes it unmodified.
- [ ] Provenance + licence recorded per source.

**Produces:** `docs/contracts/levelpack.v1.md` + a starter pack library.
