# ADR-009: The product is the telemetry contract; the game is a reference implementation

**Status:** accepted
**Date:** 2026-09-23
**Session:** S00f

## Context

Set by the project owner, 2026-09-23 (R-P024): this is a concept skeleton on
which **the surface can be any game, built by any studio**, as long as it
captures human input that benefits search-and-rescue and preventative
earthquake risk management.

Until now the repository has been organised as though the game were the
deliverable. It is not.

### The terms of art

- **Field:** *human computation*, and within it *Games With A Purpose (GWAP)* —
  Luis von Ahn's framing, where real work is performed as a side effect of play.
  Foldit, EteRNA and Eyewire are the canonical precedents.
- **What we are building:** *middleware*, delivered as an **SDK**. A studio
  keeps its own game and integrates a layer, the way Havok supplies physics or
  Wwise supplies audio.
- **In standards language:** a *reference architecture* plus an *open telemetry
  specification*.

Full phrase, for the whitepaper: **a human-computation middleware and open
telemetry specification for games with a purpose in disaster risk management.**

## Decision

**The product is the telemetry contract and the pipeline behind it.** Rubble Run
is the **reference implementation**: the artifact that proves the contract
works, demonstrates integration, and seeds the corpus before any third party
exists.

Consequences that follow immediately and are binding:

1. **S02 is promoted.** Freezing `telemetry.v1` is now the highest-value
   unbuilt thing in the project, not a dependency of the game. A contract a
   studio cannot integrate against is a project with no second participant.
2. **The contract must be integrable by someone who did not write our sim.**
   It cannot assume our voxel level format, our flight model, or our renderer.
   It describes *human control of a vehicle through constrained space*, and
   anything sim-specific belongs in a profile, not the core schema.
3. **`sim_ver` generalises to `impl_ver`.** Every emitting implementation
   identifies itself so a third-party title is distinguishable in the corpus
   and its data can be weighted or excluded on its own merits.
4. **Determinism (ADR-002) becomes an integration requirement, not an internal
   nicety.** Server-side re-simulation is how we validate data from an
   implementation we do not control. Without it, third-party telemetry is
   unauditable and therefore inadmissible under the assurance findings in C6.
5. **Two conformance tiers.** *Core* — the kinematic stream every integrator
   must emit. *Extended* — optional blocks (search strategy, inspection
   discipline) a title may emit if its design supports them. Metrics declare
   which tier they require.
6. **Governance (ADR-004) extends to integrators.** Our minimisation rules are
   worth nothing if a partner title collects more. Conformance includes the data
   a title must *not* send.

## Consequences

- Reframes the pitch from "fund our game" to "fund the standard this category
  will need", which is a materially stronger position with agencies and a
  materially harder one with consumer-game investors. S10 must pick its
  audience accordingly.
- Makes the corpus the durable asset and the game a demonstration — meaning
  Rubble Run does not have to win a market, only prove a mechanism.
- Costs us the option of contract shortcuts that only work because we control
  both ends. Several are tempting and all of them foreclose integration.
- Raises a question this ADR does not settle: **licensing.** A specification
  intended for third-party adoption needs one, and the repository currently has
  none. See README.

## Alternatives rejected

- **Ship a game, extract a standard later.** Standards retrofitted onto a
  single implementation encode that implementation's accidents. The time to
  design for a second integrator is before there is one.
- **Publish a schema with no reference implementation.** Unproven schemas do not
  get adopted; the game is the proof and the on-ramp.
