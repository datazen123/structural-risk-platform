# R5 — Institutional landscape

**Session:** S01. **Date:** 2026-09-08.
**Consumed by:** S10 (evidence surface), S11 (governance), S13, S14.
**Weakest of the six threads** — see §5 for what could not be sourced.

---

## 1. The IDRM bodies and how work actually reaches them

| Body | What it is | Route in |
|---|---|---|
| **UNDRR** | UN Office for Disaster Risk Reduction; custodian of the **Sendai Framework for Disaster Risk Reduction 2015–2030**, the first major agreement of the post-2015 development agenda [https://www.undrr.org/implementing-sendai-framework/what-sendai-framework] | **Science and Technology community partnership stream** — the designated entry point for research groups [https://www.undrr.org/implementing-sendai-framework/partners-and-stakeholders/science-and-technology-community]. Not a funder. |
| **INSARAG** | UN OCHA network of international USAR teams; sets the classification (IEC) and the operational doctrine. Ran the largest operation in its 30-year history in Türkiye 2023 (~5,000 rescuers, 90 teams) [AAR 2023, https://insarag.org/wp-content/uploads/2024/04/After-Action-Analysis-and-Recommendations-for-INSARAG-Turkiye-2023.pdf] | Guidelines and AAR process. **Not a procurement body** — it standardises teams, it does not buy equipment. Influence here is doctrinal. |
| **JICA** | Japan's bilateral development agency; holds a **Memorandum of Cooperation with UNDRR (then UNISDR) and UNDP** to jointly promote Sendai implementation [https://www.jica.go.jp/english/our_work/thematic_issues/disaster/activity.html] | Bilateral technical-cooperation projects. **The most plausible first institutional funder for a Japan-seeded programme with a cascade to Africa/SE Asia** — that is literally JICA's mandate shape. |
| **Japan Cabinet Office 防災 (Bōsai)** | National disaster-management policy | `[UNVERIFIED — no primary sourcing done this session]` |
| **ADRC** (Asian Disaster Reduction Center, Kobe) | Regional knowledge/capacity body | `[UNVERIFIED — not sourced this session]` |
| **ASEAN AHA Centre** | ASEAN coordinating centre for humanitarian assistance | `[UNVERIFIED — not sourced this session]` |
| **AU / regional African DRM bodies** | — | `[UNVERIFIED — not sourced this session]` |

**Structural finding.** None of UNDRR, INSARAG or ADRC is a procurement channel.
They are *doctrine and legitimacy* channels. Money for a dual-use game/robotics
programme comes from research councils, bilateral development agencies (JICA),
or national civil-defence budgets. **The correct sequencing is therefore:
credibility from UNDRR/INSARAG-adjacent publication → money from JICA or a
research council → deployment through a national fire service or JDR.** Pitching
UNDRR for funding would be a category error.

This also reinforces R3 §7: Japan's disaster airspace carve-out attaches to
**public organisations**, so the field path runs through an agency operator
regardless. The institutional relationship is not marketing; it is the only
route to a flight.

## 2. Funding instruments

`[UNVERIFIED — this section is a gap.]` No systematic search of research funding
instruments suited to a dual-use game/robotics programme was completed within
this session's budget. What was found:

- Sendai Framework implementation financing is discussed at the level of state
  and local government allocations (e.g. ~$6 bn over 2021–2025 for mitigation
  plus ~$23 bn for preparedness/response/recovery in one national context)
  [https://www.undrr.org/implementing-sendai-framework] — **this is national
  disaster budgeting, not a grant instrument we can apply to.**

**Recommended follow-up (S13/S14):** JSPS KAKENHI and JST (Japan), Horizon
Europe civil-security and Marie Skłodowska-Curie (EU), NSF Smart and Connected
Communities / CRII (US), Wellcome/Gates-style global-health-adjacent instruments
for the youth-participation angle, and JICA's SATREPS programme — which pairs a
Japanese university with a partner-country institution on a development-relevant
research problem and is an almost exact structural match for the Japan→cascade
design. `[UNVERIFIED — SATREPS fit is an inference from its mandate shape, not a
confirmed eligibility finding.]`

## 3. Precedents: gamified / citizen science reaching institutional seriousness

The pattern is consistent across every case in R4 §4.1:

**What got them taken seriously was one real, attributable, peer-reviewed
scientific result — not the platform, not the user numbers, not the deck.**

- Foldit: *de novo* protein designs by players that **expressed in *E. coli* and
  adopted the designed fold**, in *Nature* [https://www.nature.com/articles/s41586-019-1274-4].
- EteRNA: player designs beating algorithmic ones, in *PNAS* / *JMB*
  [https://doi.org/10.1073/pnas.1306643110].
- RoboTurk: a CoRL paper with a released dataset and reproducible policy results
  [https://proceedings.mlr.press/v87/mandlekar18a.html].

Structurally, all three were **hosted inside a university**, published in the
domain venue rather than a games venue, and released the data.

**Direct consequence for this project.** The evidence surface (S10) should be
organised around producing *one* such result — most plausibly: *"a nav policy
trained on N crowd demonstrations beats a classical local planner on a held-out
benchmark of collapse-derived voids, and here is the corpus"* — and everything
else in the deck is supporting material. A platform with a million players and
no result is not institutionally legible; a platform with 5,000 players and a
result is.

Also from the citizen-science literature: the persistent failure modes are
funding dependency, ambiguous developer roles, and **"science–game tensions"**
[https://pmc.ncbi.nlm.nih.gov/articles/PMC10162532/]. Budget for a dedicated
game-design owner who is *not* the research owner. Every project in that study
that conflated the two suffered for it.

## 4. Ethics and consent precedent for research data from minors at scale

This section feeds ADR-004 and S11, and it contains a distinction that matters
enormously and is easy to get wrong.

### 4.1 Research ethics *can* waive parental permission — under narrow conditions

Under US federal research regulations, an IRB may waive the requirement for
parental permission:

- **45 CFR 46.408(c)** — where *"a research protocol is designed for conditions
  or a subject population for which parental or guardian permission is not a
  reasonable requirement to protect the subjects"*, provided *"an appropriate
  mechanism for protecting the children who will participate as research
  subjects is substituted"* and the waiver *"is not inconsistent with Federal,
  State, or local law."*
- **45 CFR 46.116(f)(3)** — the general waiver, requiring **no more than minimal
  risk** and that the research **could not practicably be carried out without
  the waiver**.

[HHS OHRP, Research with Children FAQs,
https://www.hhs.gov/ohrp/regulations-and-policy/guidance/faq/children-research/index.html]

Established precedent exists: waivers of parental permission are **common
practice in minimal-risk research with LGBTQ youth**, specifically to avoid the
selection bias of only recruiting adolescents whose parents know and approve
[https://rci.ucmerced.edu/irb/researchers/research-vulnerable-populations/research-minors].

### 4.2 The distinction that will otherwise be missed

**An IRB waiver of parental permission is not a lawful basis for processing a
child's personal data in a consumer product.**

- 45 CFR 46 governs **federally supported human-subjects research**. It says
  nothing about COPPA, GDPR-K, or Japan's APPI.
- COPPA and GDPR-K attach to the *service*, not the *study*. A game distributed
  to the public is a service. The 46.408(c) waiver route is available for a
  **bounded research protocol with an identified cohort and an institution
  standing behind it** — i.e. the school/STEM-club channel ADR-004 already lists
  — and is **not** available for an open consumer release.
- 46.408(c) also carries the explicit condition that the waiver be *"not
  inconsistent with Federal, State, or local law"*, which is precisely where
  COPPA re-enters.

**So ADR-004's three listed lawful routes are correctly ordered, and R5 adds the
mechanism for route two:** institutional deployment is not merely "faster than
per-parent consent" — it is the *only* channel in which the parental-permission
waiver machinery is even available. That is a substantive strengthening of
ADR-004's argument and should be written into it.

**And per R6 Part A, route three (adults first) makes all of this a phase-two
problem rather than a launch dependency.**

### 4.3 What is still unresolved

- Verifiable parental consent that functions **offline on a low-end phone**.
  ADR-004 flags this as possibly the binding constraint on launch markets.
  Nothing found this session solves it. It remains open, and R6's 18+
  recommendation is partly a way of not having to solve it.
- Whether a corpus of minors' gameplay is admissible **training data under a
  software-assurance regime** — ADR-004 §1 and C6. **That is S12's question**
  and it is the one that could invalidate the corpus retroactively. It is
  another reason the 18+ path is cheaper than it looks.

## 5. Honest statement of this thread's limits

R5 is the thinnest of the six threads. Sourced adequately: UNDRR/Sendai,
INSARAG, JICA–UNDRR cooperation, citizen-science adoption precedent, US
minors-research waiver law. **Not sourced**: ADRC, AHA Centre, AU regional DRM
bodies, Japan Cabinet Office 防災, and — most importantly — **the actual funding
instruments**. If S01 is split, `S01e` should be a dedicated funding-instrument
and partner-mapping pass. Do not let a deck claim an institutional route this
file has not verified.
