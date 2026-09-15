# S13 — Build in public: community, growth & channels

**Objective:** Map the public communities, institutions and individuals whose
reality-checks the project needs, and stand up channels to build in public —
plus assess paid growth honestly against the constraints.

**Read:** `CLAUDE.md`, `docs/00-vision.md`, `docs/02-constraints.md`,
`docs/decisions/ADR-004-minors-data-governance.md`, `research/R5-stakeholders.md`
**Owns:** `research/G*`, `docs/comms/`
**Depends on:** S01/R5 helps but does not block. Can start now.
**Budget:** medium

## Why build in public

The project's largest risk is not engineering, it is **being wrong about the
domain in ways no one on the team can see**. Disaster response has deep
institutional knowledge, hard-won doctrine, and a long history of technologists
arriving with confident solutions to problems responders do not have.

Building in public converts that risk into free expert review — but only if the
posture is genuinely "here is what we think, tell us where we're wrong," not
"here is our announcement." Get the posture right and this is the cheapest
de-risking available. Get it wrong and it burns exactly the relationships S10
depends on.

## Threads

### G1 — Who to follow and engage → `research/G1-accounts.md`
Produce a concrete, linked list — handles and URLs, not categories:
- **X.com / Bluesky / Mastodon:** disaster-robotics researchers, USAR
  practitioners, humanitarian UAS operators, seismic engineers, response
  agencies. Include the academics behind the V1 standard test methods and the
  RoboCup Rescue / World Robot Summit communities.
- **LinkedIn:** agency staff, INSARAG-classified team leads, IDRM programme
  managers, drone-SAR vendors, procurement officers.
- **Institutional accounts:** UNDRR, INSARAG, JICA, ADRC, AHA Centre, NIED,
  消防庁, CRASAR, regional African/SE-Asian DRM bodies.
- **Communities:** relevant subreddits, Discords, mailing lists, conferences
  (ISCRAM, SSRR, WCDRR-adjacent), and open-data communities for R1's datasets.
- For each: **why they matter** and **what we'd want to learn from them.** A
  list without that is a follower list, not a research asset.

### G2 — Channel strategy → `docs/comms/channels.md`
- Recommend which channels to actually run. **Running three well beats seven
  badly** — say which three, and which to skip.
- **X/LinkedIn:** dev-log posture, open questions, "tell us where we're wrong."
  LinkedIn reaches the agency/procurement audience; X reaches researchers.
- **YouTube (R-P005-7):** highest-value format is probably *not* trailers —
  it is short technical build logs and, later, side-by-side benchmark runs.
  Doubles as evidence material for S10.
- **Instagram (R-P005-7):** the player-acquisition channel, not the
  institutional one. See G3 before committing.
- **Publish cadence and who writes it.** An abandoned channel is worse than no
  channel, especially to an institutional audience.
- Draft the first three posts, including the honest "here is what we don't
  know yet" one. That post is the one that earns replies from experts.

### G3 — Paid growth & virality → `research/G3-growth.md`
- Evaluate Instagram/Meta ads and equivalents (R-P005-4) for reach in target
  regions: cost per install, whether the platforms even reach a 2G audience
  (**they may not — heavy ad platforms and 2G users are close to disjoint
  populations, which would make paid social the wrong channel for the reach
  audience entirely**). Check this before anything else in this thread.
- Alternative acquisition for low-connectivity regions: operator zero-rating
  partnerships, offline/sideload sharing, school and youth-programme
  distribution, radio and community channels, SMS. These may dominate paid ads.
- **Hard gate (ADR-004):** ad targeting of minors is constrained by
  platform policy *and* by law in most target jurisdictions, independently of
  our own consent design. Establish what is actually permitted before
  proposing any teen-targeted campaign. If S01/R6 finds adults perform
  equivalently, the whole targeting question simplifies — check R6 first.
- Recommend an acquisition strategy consistent with C1 **and** the resolution
  of ADR-004, and state plainly which parts are blocked pending that.

### G4 — Public posture & risk → `docs/comms/posture.md`
- What we publish openly vs. hold: corpus, schema and methods are strong
  candidates for open; anything touching player data is not.
- **Do not publish claims marked `[UNVERIFIED]`.** Public overclaiming is
  unrecoverable with this audience and it is the specific way this kind of
  project loses credibility.
- Prepare for the hardest public question — "you are harvesting data from
  children" — with a truthful, documented answer *before* it is asked, not
  after. If ADR-004 is unresolved, that is itself a reason not to launch the
  public channels yet, and this session should say so.
- Attribution and credit norms for advice received publicly. People who
  reality-check us for free must be credited properly.

## Done when
- [ ] `research/G1-accounts.md` — linked, annotated, with the "why" per entry.
- [ ] `docs/comms/channels.md` — a recommendation, not a menu; first 3 posts drafted.
- [ ] `research/G3-growth.md` — including the 2G/ad-platform reach reality check.
- [ ] `docs/comms/posture.md` — including the prepared answer to the hard question.
- [ ] Explicit go/no-go on launching public channels now vs. after ADR-004 resolves.

**Produces:** `docs/comms/` + an annotated engagement list.
