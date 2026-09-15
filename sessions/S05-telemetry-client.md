# S05 — Telemetry client (offline queue & store-and-forward)

**Objective:** Get telemetry off a 2G device reliably, cheaply, and without ever
touching the gameplay critical path.

**Read:** `CLAUDE.md`, `docs/02-constraints.md`,
`docs/contracts/telemetry.v1.md`, `docs/contracts/ingest-api.v1.md`,
`docs/decisions/ADR-004-minors-data-governance.md`
**Owns:** `apps/game/src/telemetry/`, `packages/queue/`
**Depends on:** S02, S06 (API contract only)
**Budget:** medium

## Tasks
1. **IndexedDB queue** — durable across app close, tab kill, and device reboot.
   Bounded size with a documented eviction policy (oldest-first, but never drop
   a partially-uploaded run).
2. **Opportunistic sync** — `online` events + `navigator.connection` hints.
   Exponential backoff with jitter. Assume uploads may be **days** late and that
   the server may see them out of order. Design for that, don't patch it later.
3. **Resumable, idempotent uploads** — chunked, content-addressed, safe to retry.
   The network will cut mid-upload; that is the normal case, not the edge case.
4. **Honest data cost** — show the player bytes queued and bytes sent. Offer
   Wi-Fi-only mode. On metered prepaid data our upload costs them money; being
   quiet about that is not acceptable (C4 spirit).
5. **Privacy enforcement at the boundary** — the client validates outgoing
   payloads against the frozen schema and **drops any field not in it**. A
   privacy guarantee that only exists in a policy document is not a guarantee.
6. **Never block gameplay.** Sync runs off the critical path; a full or broken
   queue degrades to dropping telemetry, never to a worse game.

## Done when
- [ ] Survives simulated 2G with 40% packet loss and random disconnects.
- [ ] Queue survives forced app kill and device reboot.
- [ ] Duplicate/out-of-order delivery handled idempotently, proven by test.
- [ ] Zero telemetry work on the frame critical path (profiled, not assumed).
- [ ] Schema-violating fields provably dropped at the boundary.

**Produces:** `packages/queue/` + a documented sync state machine.
