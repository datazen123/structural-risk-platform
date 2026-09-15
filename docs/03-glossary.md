# Glossary

Shared vocabulary so sessions don't drift. Add terms as they stabilize.

| Term | Meaning |
|---|---|
| **Tier / T0,T1,T2** | Client fidelity tier. T0 = Canvas2D reach client (default), T2 = WebGL demo client. See C3. |
| **Floor device** | The device spec we guarantee: Android 5, 1GB RAM, no WebGL, 2G. See C1. |
| **Slice** | One horizontal z-layer of a voxelized collapse volume; what T0 renders. |
| **Void graph** | Traversable-space topology extracted from the voxel volume; used for optimal-path baselines. |
| **Level pack** | Deterministic, seeded, compressed level bundle. ~40KB gz. |
| **Run / session (game)** | One play attempt, start to crash/extract/timeout. ~3 min target. |
| **Session (Claude)** | One brief in `sessions/`, one fresh context window. Disambiguate in writing. |
| **Kinematic telemetry** | Control inputs + derived state only. Explicitly excludes PII, media, geolocation. See C4. |
| **Skill metric** | A validated scalar extracted from a run. See vision doc §TOP GUN. |
| **Corpus** | Versioned aggregate trajectory dataset used for policy training. |
| **Policy** | A learned nav controller trained on the corpus. |
| **IDRM** | Integrated Disaster Risk Management — the agency category we present to. |
| **Cascade** | The transfer of methodology from data-rich (Japan) to sensor-poor regions. See ADR-003. |
| **Store-and-forward** | Telemetry queued offline, uploaded opportunistically, possibly days later. |
