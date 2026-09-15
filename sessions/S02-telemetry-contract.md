# S02 — Freeze the telemetry contract

**Objective:** Ratify ADR-002 and publish the frozen telemetry + sim-determinism
contract that unblocks S03, S05, S06 and S08 to proceed in parallel.

**Read:** `CLAUDE.md`, `docs/01-architecture.md`, `docs/02-constraints.md`,
`docs/decisions/ADR-002-telemetry-contract.md`, `docs/decisions/ADR-004-*`,
`research/00-summary.md`, `research/R4-metrics.md`
**Owns:** `docs/contracts/`, `docs/decisions/ADR-002*`, `packages/contract/`
**Depends on:** S01
**Budget:** medium. This is the keystone — spend the window here, not on code.

## Tasks

1. **Settle determinism.** Fixed-point integer sim math vs. pinned float path.
   Test the chosen approach across at least: modern Chrome desktop, Android
   WebView 60-era, iOS Safari. Decide with evidence, record in the ADR.
   *This is the project's main technical risk. If determinism cannot be had
   cheaply, say so now and propose the fallback before anyone builds on it.*
2. **Write the schema.** `docs/contracts/telemetry.v1.md` — every field, type,
   unit, range, quantization, and the reason it exists. Short enough that it
   doubles as the C4/ADR-004 consent disclosure. If it is too long to show a
   child, it collects too much.
3. **Write the wire codec.** Quantize → delta → RLE → framing. Include a
   `sim_ver` / `schema_ver` compatibility matrix and the additive-only rule.
4. **Reference implementation.** `packages/contract/` — encoder, decoder,
   validator, golden test vectors. Shared verbatim by client and server; a
   second implementation of this is a bug.
5. **Budget proof.** Synthesize a worst-case 3-min run and measure encoded
   bytes. Must be under 8KB (C1). Publish the measured number in the contract.
6. **Metric hooks.** With R4 in hand, confirm the schema can support the
   selected metrics. Any metric that needs a field must get it *now* —
   after the freeze it costs a schema version.

## Done when
- [ ] ADR-002 status `accepted`, determinism question answered with evidence.
- [ ] `docs/contracts/telemetry.v1.md` published and marked FROZEN.
- [ ] `packages/contract/` passes golden vectors round-trip.
- [ ] Measured worst-case run size documented and under budget.
- [ ] HANDOFF entry states explicitly which sessions are now unblocked.

**Produces:** `docs/contracts/telemetry.v1.md` — the file S03/S05/S06/S08 read
instead of talking to each other.
