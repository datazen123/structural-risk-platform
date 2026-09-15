# HANDOFF — S01 (Foundational research)

**Date:** 2026-09-08. **Session:** S01, run as a single pass (not split).
**Wrote:** `research/00-summary.md`, `R1-regions.md`, `R2-devices.md`,
`R3-platforms.md`, `R4-metrics.md`, `R5-stakeholders.md`, `R6-attention.md`.
**Wrote no code.** Touched nothing in `docs/` or `sessions/` other than this
file — S12 was running concurrently, so every change S01's findings require is
**described below rather than made.**

Read `research/00-summary.md` first. It carries the full contradiction table
(C-1 … C-15) with pointers into the detailed files.

---

## 1. Three headline findings

1. **The middle-school-pilot premise is false.** Optimum is ~17–24; the
   strongest predictor is gaming hours, not age. Going 18+ costs ~30% of the
   addressable pool and removes the entire consent/IRB apparatus. (R6 Part A)
2. **Minimum viable harvest duration is ~60 s** — neither the 30 s nor the 3 min
   assumption. Degradation- and load-tolerance metrics need **90–130 s inside a
   single run** because ADR-004 forbids cross-day linking. (R6 Part C)
3. **The 2G-only population is ~4% of humanity, device-poor and sunsetting.**
   The real constraint is affordability and handset absence — in SSA, 42% are
   covered but own no device, and only 19% use mobile internet on a smartphone.
   The byte budgets are right; the stated rationale is not. (R2)

---

## 2. Changes S01 requires but did not make

### 2.1 New ADRs to draft

| Proposed | Supersedes / amends | Substance |
|---|---|---|
| **ADR-007 — Launch cohort is 18+; minors via institutional consent later** | amends C4; resolves the open consent question in **ADR-004** | R6 Part A + R5 §4. Sequencing: 18+ launch → prove pipeline → minors cohort through schools/STEM clubs, which is the only channel where the 45 CFR 46.408(c) parental-permission waiver machinery even exists. Keep every ADR-004 design rule (no PII, opaque ID, kinematic-only) as a differentiator. |
| **ADR-008 — Revised device and network floor** | amends **C1** | Android 8 / Chrome 80 / 2 GB RAM; network floor = congested, intermittent, metered 3G–4G rather than 2G EDGE. **All byte budgets unchanged.** R2 §6 has the full replacement table. |
| **ADR-009 — Telemetry budget is per minute of play** | amends **C1**, informs **ADR-002/S02** | Per-run byte cap is meaningless once run length is a design variable. Restate as bytes/minute + a per-run header allowance. The 8 KB/3-min envelope still holds (+8–15% header overhead at 60 s runs). |
| **ADR-010 — Level-pack data licensing** | new; constrains **ADR-003**, S04 | Maxar Open Data is **CC BY-NC 4.0** — unusable commercially. ODbL is share-alike on derived databases. Take Google Open Buildings' **CC BY 4.0** branch and Microsoft's **CDLA-Permissive-2.0** branch. Needs counsel, not a research file. |
| **ADR-011 — Minimum viable input tier (Tier-D)** | fills **ADR-003 requirement 1** | Copernicus GLO-30 + ML building footprints with no height/typology + OSM + a regional hazard value. Make `provenance.fidelity` an **enum** (A/B/C/D), not free-form. |

### 2.2 Edits to existing docs

- **`docs/02-constraints.md` C1** — replace the floor table per R2 §6; add the
  telemetry-unit change per R6 §C.5. Keep 200 KB / 1.5 MB / offline-first
  verbatim; only the rationale and the device/network rows change.
- **`docs/02-constraints.md` C4** — narrow "target demographic includes
  children" to the phased position in ADR-007.
- **`docs/00-vision.md` — bio-cybernetic scope (required by the S01 brief).**
  Currently listed as out of scope, "a decade-scale hardware programme".
  **Overtaken by events:** Singapore HTX / NTU deployed 10 cyborg cockroaches in
  Myanmar in March–April 2025, the first insect-hybrid robots used in a
  humanitarian field operation; TRL ~6–7. Move from horizon section to a named
  roadmap option, with the honest caveats (10 units, one deployment, no
  independent confirmation of a survivor find). Note that it sits **outside**
  every airspace and airworthiness gate listed in C6, which makes it arguably
  the cheapest insertion point the project has. See R3 §6.
- **`docs/00-vision.md` — retention KPI.** The "median session under 4 minutes →
  no fuel" line is wrong in both directions (industry median is 5–6 min;
  most metrics need 60 s). Replace with runs/session × metric-yield/run ×
  sessions/day.
- **`docs/00-vision.md` — the inversion paragraph.** Narrow it. The largest
  reachable player pools (Nigeria, Ethiopia) have low seismic exposure; those
  players are protected by the **preventative survey** mission, not SAR. That
  makes survey mode the truthful half of the inversion, not only the fundable
  half.
- **`docs/00-vision.md` — the pipeline arrow.** Add the qualification that real
  data constrains the **envelope** (terrain, footprint, storey count, typology,
  damage grade) and **interior voids are simulated**. No open corpus of
  post-collapse interior void geometry was found anywhere. Claiming levels are
  "derived from real collapse topography" without that sentence is an overclaim
  that will not survive a technical room.
- **`docs/decisions/ADR-001`** — keep the decision, rewrite the WebGL rationale:
  Chromium is removing the SwiftShader fallback, so context creation now fails
  outright and there never was a mobile software path. Also close the
  native-vs-web open question in favour of web, citing our own byte arithmetic
  (R2 §3.1) rather than the vendor-marketing Jumia figures.
- **`requirements/user-prompts.md`** — S01 received no new user prompt, so
  nothing to append. If the parent session received one, it still needs
  appending per CLAUDE.md.

---

## 3. Direct instructions to downstream sessions

- **S02 (telemetry contract).** Adopt the per-minute budget unit. Size the
  per-run header deliberately — at 60 s runs it is 3× more frequent than the
  ADR-002 estimate assumed. Add a field distinguishing quick / standard / long
  run class so S08 can filter.
- **S03 (game core).** Build around **60–75 s default runs**, a 30 s quick run,
  and a 150–180 s long mission. Difficulty axes must come from R3 §5 — they are
  all documented real failure modes (comms denial, GPS denial, degraded
  perception, geometric complexity, radio-shadow, collision-as-normal, and
  operator/robot intent conflict). Do not invent axes.
- **S04 (ingest/procgen).** Tier-D is the spec (R1 §4.3). `provenance.fidelity`
  is an enum. Interior voids are generated from a collapse model, not observed —
  make that explicit in the pack metadata so S10 cannot accidentally overclaim.
- **S08 (metrics).** Use **SPARC**, not dimensionless jerk — jerk metrics are
  duration-biased and break once run length varies. R4 §2 has the
  supported / attenuated / unsupported buckets pre-drafted; "clearance
  discipline" must be renamed **in-plane clearance**. Path efficiency anchors
  cleanly onto surgical robotics' economy-of-motion, which is the best-validated
  teleoperation metric in any field — use that anchor.
- **S09 (policy transfer).** The pipeline as written is pure offline behavioural
  cloning, which the literature says degrades on long-horizon tasks via
  covariate shift. ADR-002's determinism already supplies the fix: replay the
  policy, find divergence states, **generate a level starting at the divergence
  point and let a player correct it** — DAgger where the expert query *is the
  game*. Make this central. It is also the project's most defensible novelty
  claim. Benchmark against a **classical local planner**, not end-to-end.
- **S10 (evidence surface).** Organise around producing **one** peer-reviewed,
  reproducible result. That is what got Foldit, EteRNA and RoboTurk taken
  seriously — not user counts. State transfer (game skill → real teleoperation)
  as a research objective with a pre-registered design and a published negative
  result if that is the outcome; the literature is genuinely inconsistent.
- **S11 (governance).** R5 §4 contains the distinction that will otherwise be
  missed: an IRB waiver of parental permission is **not** a lawful basis under
  COPPA/GDPR-K for a consumer service. It is available only for a bounded
  institutional protocol.
- **S12 (certification).** Cross-references only, no duplication: R3 §7 (Japan's
  disaster carve-out attaches to *public organisations*, so the field path runs
  through an agency operator) and R3 §6 (insect-hybrid platforms sit outside the
  airworthiness/airspace regime entirely — worth a line in the C6 rewrite).
- **S14 (training product line).** R4 §1.1 gives the RPA selection-battery
  validity ceiling (r ≈ .5) — do not promise better. The USAF's own stated
  measurement gap is **time-sharing / multitasking**, which is exactly the load
  tolerance axis; that is the strongest claim the training product has.

---

## 4. `[UNVERIFIED]` items that must stay marked

- No study directly compares 12–14 with 18–25 on drone teleoperation. The R6
  Part A verdict is inference across adjacent literatures.
- No time-use data for youth discretionary time in SSA or SE Asia — R6 §B steps
  5–6 carry weight that time-use data should have carried.
- No published measurement of WebGL context-creation failure rates on low-end
  African Android. We should beacon it ourselves; it would be a novel datum.
- No open corpus of post-collapse interior void geometry, anywhere.
- Africa-wide 2G connection share (~15% → 4%) came via a secondary summary.
- The Jumia PWA conversion figures are vendor marketing.
- Kang 2026 esports peak-age figures read via secondary summary (paywalled).
- Phone-sharing prevalence figures (Kenya 40%, Nigeria 39%) via an unidentified
  secondary aggregation.
- The Flyability deployment-frequency claim (4–5/week) is vendor-sourced.
- Press claims that the Myanmar cyborg cockroaches "saved lives" are
  government-communications sourced; no independent confirmation of a survivor
  find.

---

## 5. Recommended follow-up session

**S01e — funding instruments and partner mapping.** R5 is the thinnest thread
and its funding section is empty. ADRC, ASEAN AHA Centre, AU regional DRM
bodies and Japan Cabinet Office 防災 were not sourced at all. Candidate
instruments to check: JSPS KAKENHI, JST, **JICA SATREPS** (structurally an
almost exact match for the Japan→cascade design), Horizon Europe civil security,
NSF S&CC. Do not let a deck claim an institutional route R5 has not verified.
