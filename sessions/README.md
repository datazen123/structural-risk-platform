# Session protocol — context window management

Read this before starting any session.

## Why this exists

A Claude Code context window is a budget, and the default failure mode on a
project this size is spending it on *rediscovery* — re-reading the repo,
re-deriving decisions already made, re-litigating settled trade-offs — until
there is no budget left for the actual work.

This directory is the fix. Each brief is a **context prefetch**: it names the
exact files a session must read, so a fresh session reaches full working
knowledge in ~4 file reads instead of 40, and produces a durable artifact that
the *next* session reads instead of re-deriving.

The rule underneath all of it: **knowledge that matters leaves the context
window before the window closes.** If it only exists in the transcript, it is
already lost.

## Session anatomy

Every brief has the same seven fields.

| Field | Purpose |
|---|---|
| **Objective** | One sentence. If it needs two, it is two sessions. |
| **Read** | The complete list of files to load. Nothing else. |
| **Owns** | Paths this session may write. Others are read-only to it. |
| **Depends on** | Sessions whose HANDOFF entry must exist first. |
| **Done when** | Checkable conditions. Not vibes. |
| **Produces** | The durable artifact. What the next session reads. |
| **Budget** | Rough context/effort. Over budget → split, don't push through. |

## Running a session

1. `cd` to repo root. Start a **fresh** Claude Code session. Not a continuation.
2. Prompt: `Run sessions/S03-game-core.md` (nothing more — the brief is the prompt).
3. The session reads `CLAUDE.md` (auto) + its **Read** list. It does not explore.
4. It writes only inside **Owns**.
5. Before finishing, it appends to `HANDOFF.md` and writes its **Produces**.
6. Any decision worth more than 5 minutes of future argument becomes an ADR.

## Rules that keep windows small

- **Never read a whole directory to "get oriented."** The brief already did that
  work. If the brief is wrong, fix the brief — that is a real contribution.
- **Contracts beat conversations.** Two sessions collaborate through a frozen
  file in `docs/contracts/`, never by reading each other's implementation.
- **One session, one seam.** If you find yourself editing across two Owns
  boundaries, stop and write a new brief instead.
- **Push knowledge down, not sideways.** Durable → `docs/`. Decisions → ADR.
  Status → `HANDOFF.md`. Nothing durable stays in chat.
- **When >60% consumed**, stop feature work. Write the handoff, note what is
  half-done and precisely where, and end. A clean handoff at 60% beats a
  truncated one at 95%, every time.
- **Research sessions never write code. Code sessions never browse the web.**
  Mixing them is the fastest way to burn a window with nothing durable to show.

## HANDOFF.md

The rolling state log — the one file that is always safe to read for "where are
we?". Append-only, newest at top, one block per session:

```md
## S03 — game core — 2026-09-11 — status: partial
Done: sim loop, 4-DOF flight model, slice renderer, touch input.
Not done: audio (deferred to S03b), haptics.
Decisions: fixed-point sim math — see ADR-006.
Surprises: floor-device frame budget blown by tile blit; fixed with a dirty-rect
  pass. Anyone touching the renderer should read src/render/dirty.ts first.
Next: S05 can start; telemetry hooks are stubbed at src/sim/tap.ts.
```

The **Surprises** line is the most valuable one. Write it properly.

## The DAG

```
S00 bootstrap ✅
      │
      ├─► S01 research ──┬─► S02 telemetry contract ─┬─► S03 game core ─► S08 metrics ─► S09 policy
      │                  │                           ├─► S05 tele client ─┐            ▲
      │                  └─► S04 ingest + procgen ───┘                    ├─► S07 CI/CD │
      │                                              └─► S06 backend ─────┘             │
      ├─► S12 certification & validation ────────────────────────────────────────────────┘
      │      (parallel with S01; may rewrite C6, S03, S04, S08, S09)
      │                                    └─► S14 training product line
      ├─► S11 governance  (early, parallel — gates public launch, not build)
      ├─► S13 build in public (early; gated on ADR-004 for the player-facing half)
      ├─► S15 trade, insurance & survey evidence chain (after S12; can close routes)
      ├─► S16 STRUCTURAL RISK OBSERVATORY — the preventative half, and the priority
      ├─► S03 game core ✅ playable MVP at apps/game/ (see HANDOFF-S03.md)
      └─► S17 3D client evaluation (reuses the S03 sim unchanged)
      └─► S10 evidence surface (last; consumes everything)
```

**Critical path:** S01 → S02 → S03 → S08 → S09.
**Parallelizable after S02:** S04, S05, S06, S07, S11.
**Start immediately, in parallel with S01:** S12. It is upstream research whose
findings can invalidate downstream specs; discovering that late is the expensive
version. S01 and S12 are independent and should run as two separate sessions at
the same time.

> Session IDs are stable identifiers, **not** an execution order. S12 runs
> early despite its number. Never renumber — ADRs and HANDOFF cite these IDs.

## Naming

`S<nn>-<kebab-slug>.md`. Split a session as `S03a`, `S03b`. Never renumber —
HANDOFF entries and ADRs reference these IDs.
