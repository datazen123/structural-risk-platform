# ADR-002: Telemetry is a deterministic input stream, not a position log

**Status:** proposed — to be accepted and frozen by session S02
**Date:** 2026-09-08
**Session:** S00 (proposal), S02 (ratification)

## Context

C1 caps telemetry at ~8KB on the wire per 3-minute run. A naive position log at
60Hz — `(x,y,z,yaw,t)` as float32 — is 180 KB/min before framing. That is 20x
over budget and, on metered prepaid data in target regions, has a real cash cost
to the player.

Separately, the research claim requires that any published metric be
re-derivable from raw data by a third party, or authorities and reviewers will
not accept it.

## Proposed decision

The sim is **fixed-step and deterministic** given `(level seed, input stream)`.
Therefore ship the **inputs**, not the state. State is re-derived by replaying
the sim server-side.

```
run = { schema_ver, level_seed, sim_ver, tier, opaque_player_id,
        started_at_bucket, input_stream, outcome, integrity_digest }
```

`input_stream` is quantized (8-bit axes), delta-encoded, and run-length
compressed at the sim tick rate. Expected ~2–4 KB per 3-min run, well inside
budget, with headroom for the derived-metric summary block.

### Rules this creates
- **R1** The sim core is versioned and immutable per version. A behavioural
  change to the sim is a `sim_ver` bump, never an in-place edit.
- **R2** Any client tier may render however it likes; none may alter sim inputs
  or timing. Tier is a recorded field, never a schema branch.
- **R3** The server re-simulates on ingest. Client-reported outcomes are hints,
  not truth. This is anti-cheat and validation in one mechanism, for free.
- **R4** Schema changes are additive-only within a major version.

## Consequences

- Fits the 2G budget with room to spare — the constraint that motivated it.
- Gives exact replay: research reproducibility, anti-cheat, and the ability to
  re-extract *new* metrics from *old* sessions after S08 changes its mind. That
  last property is worth more than the bandwidth saving.
- Cost: the sim must be genuinely deterministic. No wall-clock, no unseeded
  RNG, no float non-determinism across platforms (fixed-point or a pinned
  deterministic float path — S02 decides which). This is a real engineering
  burden and the main risk of this ADR.
- Server-side re-simulation is a compute cost that scales with player count.
  Sample-and-verify rather than re-simulating 100%; S06 sets the rate.

## Alternatives rejected

- **Position log, downsampled** — loses exactly the high-frequency micro-input
  detail that constitutes the dexterity signal. Downsampling destroys the asset.
- **Client-side metric extraction only** — cheap on wire, but unauditable,
  untrustworthy, and freezes the metric set forever on day one.
