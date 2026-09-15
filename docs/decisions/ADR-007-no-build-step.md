# ADR-007: Tier-0 ships as plain ES modules with no build step

**Status:** accepted
**Date:** 2026-09-08
**Session:** S03

## Context

CLAUDE.md conventions say "TypeScript, strict". ADR-001 forbids runtime
dependencies in the Tier-0 bundle and C1 caps the initial payload at 200KB gz.

A bundler exists to solve problems we do not have: we have no dependency graph
to resolve, no JSX to transform, no tree-shaking to do, and a payload target a
bundler cannot help us reach because we are already writing every byte.

## Decision

Tier-0 ships as **plain ES modules loaded natively by the browser**. No bundler,
no transpiler, no `node_modules` at runtime or build time.

Types are kept via **JSDoc annotations checked with `npx tsc --checkJs`** — full
type checking in CI, zero build artefacts. Source is `.js` that runs as written.

## Consequences

- `git clone` and open `index.html`. No install, no build, no toolchain drift.
- The file the browser runs is the file we wrote — stack traces and profiles
  point at real lines, which matters when chasing a frame budget on a slow phone.
- Service-worker caching is trivial: the module list *is* the asset list.
- Cost: no minification. Measured against the 200KB budget, hand-written module
  code plus gzip has ample headroom; if that stops being true, revisit — this
  ADR is cheap to supersede because nothing depends on the absence of a build.
- Cost: more HTTP requests. Mitigated by the service worker after first load,
  and HTTP/2 multiplexing before it.

## Alternatives rejected

- **Vite + TypeScript** — the default choice, and it would add an install step,
  a lockfile, and a toolchain to maintain for a project whose defining
  constraint is minimalism.
- **Single concatenated file** — smallest payload, worst to work in.
