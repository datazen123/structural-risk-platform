# Requirements log (public)

Every requirement this project acts on, with a stable ID. Decisions in
`docs/decisions/` cite these IDs, so any design choice can be traced back to the
need that produced it.

The raw source messages are kept privately and are not published; what follows is
the extracted requirement set, which is what the repository actually builds
against. A few entries reference discussions that were resolved by research —
`research/00-summary.md` and `research/V0-summary.md` carry those conclusions.

---

---

## P001 — 2026-09-08 — Initial project direction

- R-P001-1 Context-window management + decomposition into individual Claude Code
  sessions is the *first* deliverable. → `sessions/README.md`
- R-P001-2 CI/CD for an MVP, rapidly. → S07
- R-P001-3 Component 1: a game that is playable, engaging, **entertaining** —
  and feeds the CI/CD. Fun is a requirement, not a nice-to-have. → S03
- R-P001-4 Component 2: presentable to investors, authorities, researchers, and
  IDRM agencies — must *show how* the data is gathered. → S10
- R-P001-5 Harvest "natural ingenuity": reflexes, split-second decisions,
  nimbleness, dexterity, hand-eye coordination. → S08
- R-P001-6 Consider **all** metrics used to rank top-tier ("TOP GUN") pilots.
  User flagged this as deliberately extreme and wants breadth. → S08 / R4
- R-P001-7 Targets are drones, robots and other devices, piloted by humans
  fully **or hybrid-autonomously**. → S09 / R3
- R-P001-8 Two mission classes: SAR (reactive) **and** risk-assessment surveys
  (preventative). *Preventative surveys are currently under-served in the docs —
  carry into S03/S04 level design.*
- R-P001-9 Consider swarms, incl. sensor-enriched cockroaches / bio-cybernetic
  SAR, **if available**. Research first, don't assume. → R3
- R-P001-10 Conduct initial research first, to prioritize the most commonly
  used platforms. → S01
- R-P001-11 Geographic strategy: start where death tolls are highest, **or**
  cascade — begin in sensor-rich regions and transfer R&D, lessons learned,
  SOPs, methodologies and technologies as fast as possible to regions that
  severely lack disaster-sensing and response infrastructure. → ADR-003

---

## P002 — 2026-09-08 — Answers to scoping questions

- R-P002-1 Maximize tolerance for 2G/3G and old mobile devices. **This
  overrides the Unity/Unreal direction in `sources/`.** → C1, ADR-001
- R-P002-2 Explicit target geography for *reach*: Africa and other highly
  un-connected regions. → C1, R2
- R-P002-3 Rationale, in the user's words: younger people are usually trapped in
  poor geo-regions. Maximize reach to reach them. → `docs/00-vision.md`
- R-P002-4 Japan seeds the design, cascade is explicit in the design. → ADR-003
- R-P002-5 Scaffold before research. → S00 then S01

---

## P003 — 2026-09-08 — Track requirements

- R-P003-1 Maintain a verbatim log of all user prompts in a markdown file in a
  subfolder, so the user can track the requirements they have shared. →
  this file. Append every new prompt; never paraphrase, never edit prior
  entries, never delete.

---

## P004 — 2026-09-08 — Certification / testing / validation requirements

- R-P004-1 Identify **testing and validation** requirements for SAR drones. → S12
- R-P004-2 Identify the same for **risk-assessment / survey** drones — the
  preventative mission class, which has a *different* regime (structural
  assessment liability, professional sign-off) from emergency SAR. → S12
- R-P004-3 Cover **Japan and other regions**, consistent with the cascade
  strategy (ADR-003) — including cascade regions where the regime may be
  absent rather than merely different. → S12
- R-P004-4 Cover **both technical and non-technical** requirements/constraints.
  Non-technical explicitly in scope: procurement, liability, insurance,
  doctrine, certification, professional licensure, airspace authority.
- R-P004-5 User's framing: these constraints "could shape our research and
  approach greatly" — therefore this is **upstream, gating research**, run in
  parallel with S01, not a late compliance check. It is expected to generate
  new hard constraints (C6) and to reshape S03, S04 and S09.

---

## P005 — 2026-09-08 — Addressable population, growth, consent, alternate path, parallel execution

- R-P005-1 Use **authoritative org/NGO sources** (ITU, GSMA, UN, World Bank,
  Pew, DataReportal) to size the actual 2G-using population. → S01/R2
- R-P005-2 Estimate not just reachable population but **available attention** —
  how many of those users would plausibly try the game for even seconds or
  minutes. Addressable ≠ reachable. → S01/R6
- R-P005-3 Determine the **minimum session duration that yields useful
  harvestable data**. This is a design-driving number: if it is 30s, the game
  is designed around 30s runs, not 3-minute ones. → S01/R6 + S08
- R-P005-4 Evaluate **Instagram ads targeted at teens** (and social growth
  generally) as a spread/virality and traffic channel. → S13
- R-P005-5 Growth targeting (R-P005-4) must be reconciled with the minors' data
  position in ADR-004. Proceeding without verifiable parental consent was raised
  as an option and **not adopted**; the argument against it is mechanical rather
  than moral — unlawfully obtained data is inadmissible as a training-data source
  under EASA DM-06, so it could not serve the purpose it was proposed for.
  **Status: open pending S11 and legal review.** See ADR-004.
- R-P005-6 Identify X.com / LinkedIn / social accounts of the relevant
  authorities and communities, to **build in public** and invite reality-checks
  and guidance from them as the project develops. → S13
- R-P005-7 Consider creating YouTube and Instagram accounts for the project. → S13
- R-P005-8 **Alternate path in response to the airspace blocker:** build (or
  optimize what already exists as) a **training / simulator platform for real
  human helicopter pilots and currently-airborne, live-ready SAR and
  risk-assessment agencies.** → ADR-006, S14. *Potentially the strongest
  de-risking move proposed so far — it routes around airworthiness
  certification entirely.*
- R-P005-9 Run S01 and S12 in parallel as independent sub-agents on Opus 5.

---

## P006 — 2026-09-08 — Public sharing, code names, resume, new source

- R-P006-1 The Front Rose artifact must be publicly shareable. *Root cause was
  the `db` runtime capability, not the labels — a page holding stored data
  cannot be set to public. Resolved by republishing without `db`; scores are
  now updated by republishing instead of in-page editing.*
- R-P006-2 Keep public-facing naming and framing appropriate for an open
  audience. → applied to the artifact; codified in S13/G4 posture.
- R-P006-3 Resume and land the prior work — merge S01 and S12 research into the
  repo docs, ADRs and briefs.
- R-P006-4 Ingest `sources/source-synthesis-report.md` into the plan. →
  `docs/04-science-base.md`

---

## P007 — 2026-09-08 — Front Rose as a build-in-public beacon

- R-P007-1 Surface `sources/source-synthesis-report.md` in the Front Rose. →
  new "Sensor OED" front + the Evidence base panel.
- R-P007-2 Make the artifact attractive to **contributors** — it must invite
  participation, not just report status. → "Open calls" panel.
- R-P007-3 Gain public interest while becoming *more* readable and meaningful,
  not less. Honesty and legibility are the draw. → "The chain we have to prove"
  with per-link evidence labels; "Where we're probably wrong" panel.
- R-P007-4 It is the project's **build-in-public beacon/dashboard**. Treat it as
  the public face of S13 and keep it current as each session lands.

---

## P008 — 2026-09-08 — Working contact route on the beacon

- R-P008-1 The "leave a comment" call-to-action must be real, not decorative —
  either a working input or removed entirely.
- R-P008-2 All inbound contact routes to the user's address. *A published
  artifact cannot send mail or POST to an external service (CSP), and storing
  submissions needs the `db` capability, which blocks public sharing. Resolved
  with a mailto link + copyable address; the address is assembled in JS so it is
  absent from the page source, reducing harvesting.*
- R-P008-3 **Open item:** a project-specific alias is the durable replacement
  for a personal address on a public page. → S13

---

## P009 — 2026-09-08 — Hide the address, add a real send box

- R-P009-1 The email address must not be exposed anywhere on the public page.
  *Implemented: address is base64-encoded in the script and decoded only at send
  time. Verified zero email-pattern matches in the page source. This is
  obfuscation, not encryption — it defeats automated scraping, not a human
  reading the script.*
- R-P009-2 Provide a text box that sends messages to the user's email.
  *A published artifact cannot send mail: no mail capability, CSP blocks POST to
  any external service, and in-page storage (`db`) is mutually exclusive with
  public sharing. Implemented as a compose-and-hand-off form — structured fields
  build a mailto payload opened in the visitor's own mail client. Nothing is
  transmitted by the page and no third party sees the message.*
- R-P009-3 "Cybersecurity safe" is treated as a standing requirement for
  anything public-facing: no third-party form backends, no analytics SDKs, no
  stored visitor data, no plaintext contact details. Consistent with C4 rule 7.
- R-P009-4 **Open item for S13:** a self-hosted intake (Cloudflare Worker or a
  form the user owns) is the only way to hide the recipient from senders and to
  accept messages from visitors with no mail client configured.

---

## P010 — 2026-09-08 — Preventative primacy; the passive structural observatory

- R-P010-1 **Preventative measures are the more important half.** The thesis,
  the artifact and every front must reflect that primacy. Reactive SAR is no
  longer the headline. → `docs/00-vision.md`, Front Rose
- R-P010-2 Assessment must extend **beyond drones**: CCTV, any cameras,
  satellite imagery, street-level imagery — any passive observation source. The
  drone becomes one sensor among many, and not the primary one.
- R-P010-3 A **CI/CD for building structures**: a building's collapse-risk
  estimate updates continuously as the building visibly changes, the way a
  build pipeline re-runs on every commit.
- R-P010-4 Externally visible modifications are the signal: added air-
  conditioning plant and other roof/facade mass, changes to external appearance,
  upgrades and alterations — anything that makes a structure more or less prone
  to collapse.
- R-P010-5 Weave this through **all** fronts, not as a new isolated front.

---

## P011 — 2026-09-08 — Send button blocked by CSP

- R-P011-1 Fix the root cause, not the symptom.
  *Root cause: the form delivered via `window.location.href = "mailto:…"`. Inside
  the artifact's sandboxed iframe that is a frame navigation, which the
  `frame-src` CSP forbids, so the frame was replaced with the block page.
  Fixed by making Send a real `<a target="_blank" rel="noopener"  rebuilt on every input — a user click on an anchor opens a separate context
  and is not a frame navigation. Added a clipboard fallback that copies the
  recipient without ever rendering it, plus a manual-copy textarea if the
  clipboard API is blocked too.*
- R-P011-2 Standing rule for artifacts: **never navigate via script inside the
  artifact frame.** External protocols and links go through user-clicked
  anchors. Applies to any future artifact in this project.

---

## P012 — 2026-09-08 — Centre of gravity; risk signatures move both ways

- R-P012-1 **Centre of gravity is a first-class quantity.** The observatory's
  risk model is a mass-and-stiffness distribution, not a checklist of bad
  features. → S16/O3, `riskscore.v1.md`
- R-P012-2 **Risk signatures change continuously and in BOTH directions.** The
  earlier framing (visible change = added risk) was wrong by omission. Some
  owner-installed upgrades make a structure *more* earthquake-resistant.
- R-P012-3 Scope is **rural through urban**, not city building stock alone.
  Rural typologies (heavy-roof timber houses, unreinforced masonry, informal
  construction) have different signatures and different beneficial upgrades.
- R-P012-4 Research whether beneficial modifications are real and detectable.
  **Assessed viable, 2026-09-08** — well-established structural engineering with
  a documented Japanese example. → S16/O7
- R-P012-5 Strategic consequence: a system that can tell an owner their planned
  investment could also make the building safer is a **service**, not an
  accusation. This directly addresses the political failure mode in S16/O5.

---

## P013 — 2026-09-08 — Reframe the adoption problem; build the Reach Game

- R-P013-1 Avoid politically polarizing framing in public-facing material.
  Readers must not be distracted onto political corruption. *Reframed as
  "accuracy is not adoption" — the same substance, universal rather than
  accusatory, and more accurate given that retrofit-ordinance failures are well
  documented in wealthy, well-governed cities.*
- R-P013-2 **Standing editorial rule:** where a point can be made through
  incentives rather than through blame, make it through incentives.
- R-P013-3 Build the Reach Game MVP now; do prerequisite research only where
  genuinely needed. → S03, `apps/game/`

---

## P014 — 2026-09-08 — Survivor pickup gave no feedback

- R-P014-1 A survivor on another floor must be visually distinct from one on the
  current floor. *Root cause: off-floor survivors were drawn as a bright solid
  dot identical to an on-floor one, with only a tiny arrow glyph inside. Flying
  onto it correctly did nothing, and nothing explained why.*
- R-P014-2 Changing floors must never fail silently. *The climb control does
  nothing where the ceiling is solid, with no indication before or after.*
- R-P014-3 The player must always be told what to do next, in the game, not only
  in an intro screen they have already dismissed.
- R-P014-4 Instructions must cover: what a found survivor does, how to reach
  another floor, and what to do once all are found.
- R-P014-5 **Standing rule for the game:** any rule the sim enforces must be
  visible in the renderer. A silent constraint is a bug, not a difficulty.

---

## P015 — 2026-09-10 — Floor traversal must be one key, and instant

- R-P015-1 Changing floors must be **one key**, not a modifier combination.
  → `Space` (and one round on-screen button on touch).
- R-P015-2 It must be **instant — a single tap, no holding.**
  *Root cause: vertical movement was a continuous held climb at 0.58 floors per
  second, so a floor change needed ~1.7 s of holding with no visible change
  until the slice index flipped. It read as a broken control rather than a slow
  one. Replaced with a committed snap traverse: one tick of input commits the
  move and the sim drives it to completion in ~0.32 s.*
- R-P015-3 The game decides the useful direction; the player presses one
  control. Direction follows the nearest unfound survivor, falling back to
  whichever way is open. Still encoded on the existing lift axis, so the
  telemetry contract keeps its four axes.
- R-P015-4 The floor button is only shown when the move is actually available,
  so the control's presence is itself the availability signal.
- R-P015-5 Time budget is tight — prefer the change that removes friction over
  the change that adds expressiveness.

---

## P016 — 2026-09-10 — Mobile vertical control was undiscoverable

- R-P016-1 Vertical control on touch must be **discoverable without reading the
  intro**. *Root cause: `fb.hidden = !open` removed the floor button from the
  screen whenever no opening was above or below. Since the player is usually
  standing on solid floor, the control was absent most of the time and there
  was no way to learn it existed. The availability signal had eaten the
  discoverability signal.*
- R-P016-2 The control is now **always on screen during play**, dimmed and
  labelled `NO GAP` when unavailable, `UP`/`DOWN` when available.
- R-P016-3 Second touch path added: a firm flick up or down with the right
  thumb also changes floor, deadzoned at 0.6 so turning never triggers it.
- R-P016-4 **Pattern, third occurrence.** All three playtest defects have the
  same shape: the sim behaves correctly and the client communicates nothing
  about it (P014 off-floor survivors, P015 slow held climb, P016 hidden
  button). Treat "state the client hides" as this project's default bug.
  Generalises R-P014-5: *disabled and visible beats correct and absent.*

---

## P017 — 2026-09-11 — Deploy the game to the Front Rose

- R-P017-1 The reach game must be reachable from the Front Rose beacon.
- R-P017-2 Delivered as a **standalone artifact plus a prominent linked panel**
  on Front Rose rather than an inline embed. *Reason: the game captures touch
  and fills the viewport, which fights a scrolling status board; and a separate
  URL is independently shareable, which R-P005-4/P006 need. Inline embed
  remains available on request.*
- R-P017-3 Build path: the ES-module game is concatenated to a single
  dependency-free file for publication (`scratchpad/rubble-run.html`).
  `apps/game/` stays the source of truth; the bundle is a build artefact.
  **Both must be republished together or they drift.**

---

## P018 — 2026-09-14 — Mobile twin-stick control layout

- R-P018-1 **Left stick: yaw only.** Turn left / right. No translation.
- R-P018-2 **Right stick:** up = forward, down = reverse, left/right = strafe.
- R-P018-3 Both sticks are **on-screen and floating** — visible controls that
  jump to wherever the thumb lands.
- R-P018-4 **Floor-traverse button sits to the right of the right stick.**
- R-P018-5 *This inverts the previous mapping* (left was move, right was turn).
  The right-thumb flick for floor changes (R-P016-3) is removed: the right
  stick's vertical axis is now forward/reverse and would collide with it. The
  button is the only touch path for vertical, which is why R-P016-2 keeping it
  permanently visible matters more now, not less.
- R-P018-6 Touch-zone split moved from 50% to **42%** of viewport width. At 50%
  the right stick's own resting position fell in the left zone on a 360px
  phone, the most common Android width.

