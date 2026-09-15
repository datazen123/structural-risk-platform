# S06 — Backend: ingest API, storage, corpus

**Objective:** Accept telemetry from unreliable clients, validate it by
re-simulation, and store a versioned corpus researchers can actually cite.

**Read:** `CLAUDE.md`, `docs/01-architecture.md`,
`docs/contracts/telemetry.v1.md`, `docs/decisions/ADR-002*`, `ADR-004*`
**Owns:** `services/ingest/`, `docs/contracts/ingest-api.v1.md`, `infra/`
**Depends on:** S02
**Budget:** medium

## Tasks
1. **Ingest API** — idempotent, replay-safe, resumable chunk upload. Rejects
   schema violations loudly. Publish `ingest-api.v1.md` **early** in the
   session; S05 is blocked on the contract, not the implementation.
2. **Re-simulation validation** (ADR-002 R3) — replay the input stream
   server-side against the pinned `sim_ver`. Sample-and-verify rather than 100%;
   set and document the rate against a stated compute budget.
3. **Storage** — raw runs in object storage (immutable, content-addressed);
   derived features in Timescale/Postgres. Raw is never mutated: every metric
   S08 invents later must be re-derivable from runs collected today.
4. **Corpus versioning** — datasets are tagged, immutable snapshots with a
   manifest. A paper citing "corpus v3" must get byte-identical data in 2030.
5. **Erasure** — deletion by opaque player ID, propagating to derived tables and
   corpus snapshots (ADR-004 rule 6). Build it now; retrofitting erasure into a
   snapshot system is brutal.
6. **Abuse handling** — bots and replay-farming will happen once there is a
   leaderboard. Re-simulation catches impossible runs; document what it misses.

## Done when
- [ ] API contract published and frozen; S05 integrated against it.
- [ ] Re-simulation rejects a tampered run in test.
- [ ] Out-of-order and duplicate delivery handled correctly.
- [ ] Erasure verified end-to-end including a corpus snapshot.
- [ ] Load-tested at a stated target runs/sec, with the number recorded.

**Produces:** `docs/contracts/ingest-api.v1.md` + a deployable service.
