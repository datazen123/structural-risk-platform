# HANDOFF — S12 (certification, testing & validation)

**Date:** 2026-09-08. **Session:** S12. **Status:** complete.

Written as a separate file because S01 was running concurrently and owns
`sessions/HANDOFF.md`. **Whoever next consolidates: fold this into
`sessions/HANDOFF.md` and delete this file.**

S12 wrote **only** inside `research/` (files `V0`–`V8`) plus this handoff. It did
**not** edit `docs/02-constraints.md`, any ADR, or any session brief. The §C6
text S12 owes is drafted in `research/V0-summary.md` **Appendix A**, for someone
with the write token on `docs/` to apply.

---

## Deliverables

| File | Contents |
|---|---|
| `research/V0-summary.md` | 4 headline findings, **"what this changes"**, ADR-005 recommendation, **draft §C6 (Appendix A)** |
| `research/V1-test-methods.md` | NIST/ASTM E54.09, **DECISIVE**, RoboCup Rescue, World Robot Summit; the discharge table |
| `research/V2-airspace.md` | Japan Civil Aeronautics Act, Levels 3.5/4, **航空法132条の92 disaster path**, deconfliction, Noto 2024, spectrum, SORA 2.5 |
| `research/V3-software-assurance.md` | SORA Annex E, **EASA AI CP Issue 2**, ARP6983/ED-324, ISO/IEC TR 5469, AIST; simulation-as-evidence; the minors-data question; the architecture and the 14-item evidence checklist |
| `research/V4-survey.md` | 建築基準法12条, 告示282号 as amended 2022-01-18, the four-role structure, 点検支援技術性能カタログ, liability, insurance |
| `research/V5-procurement.md` | FDMA, post-Noto financing, **防災協定**, JIS/ISO 21384-3, INSARAG, export control |
| `research/V6-operator-quals.md` | Japan's practical examination in full (measurable competencies), 登録講習機関, the screening/training product analysis **for S14** |
| `research/V7-cascade-regimes.md` | R1 shortlist survey (+3 adjacent regions), **import prohibition finding**, humanitarian code of conduct, **the ADR-003 transferability answer** |
| `research/V8-matrix.md` | Requirements matrix: 60+ rows × {Japan, EU, cascade}, with owning session; **§G lists newly assigned and unowned work** |

---

## The four headline findings

1. **The deliverable is a policy plus a certified envelope.** SORA 2.5 Annex E,
   EASA SRM-01/02 and Japanese disaster doctrine all demand a deterministic
   containment with an independent runtime monitor and fallback. Sub-findings:
   **EASA covers AI Levels 1–2 only, Level 3 is unpublished**; **ARP6983/ED-324
   Issue 1 scopes to non-adaptive, supervised ML up to DAL C** — which puts
   behavioural cloning inside the certifiable path and RL outside it.
2. **Minors' gameplay: representativeness, not consent, is the binding
   constraint.** EASA DM-13-2 requires the data distribution to resemble the
   real input state space; a 2.5D phone game does not. The consent argument in
   ADR-004 is now *sourced* (DM-06 entitlement + SRM cannot compensate ethics
   shortfalls) and stands. Anonymity is fine — DM-13-4 traceability is about
   lineage, not identity, so ADR-004's opaque-ID design **helps**.
3. **Japan's disaster-airspace path is a statutory exemption (航空法132条の92),
   not a permission — available only to the State, local bodies, or parties
   acting at their request.** Notification is a phone call plus an email; the
   latency is minutes. Deconfliction with manned rotary-wing is procedural
   (prefectural 航空運用調整班) and visual (crew gives way, always). **We can never
   be the operator; the milestone is a 防災協定.**
4. **Recognised test methods exist and fit — DECISIVE (free, aerial,
   confined-space, eight benchmarked platforms) and NIST/ASTM E54.09 (E3426
   endurance, E3479 apertures; confined spaces still a draft work item).** The
   **World Robot Summit excludes aerial robots** and the **RoboCup Rescue 2026A
   rules contain no aerial content**, killing both of ADR-005's non-US leads.

---

## ADR-005: **AMEND** (do not accept as written; do not reject)

Headline vocabulary becomes DECISIVE; NIST/ASTM geometry is **mirrored, never
claimed**; the WRS and RoboCup leads are deleted with the reason recorded; NIST's
four-element method structure and repetitions/time-with-confidence reporting are
adopted; a discharge table is published; and a second recognised target is added
for the preventative line ("accuracy equal to or better than test-hammer
tapping"). Full amendment text: `research/V0-summary.md` §"ADR-005
recommendation".

---

## Downstream sessions now affected

| Session | Change |
|---|---|
| **S02** | Telemetry contract needs immutable, reproducible **data lineage** fields (EASA DM-13-4) |
| **S03** | **A second, narrow, high-fidelity validation simulator is required and unbudgeted**, plus third-party validation of it. Also: add a **position-hold-degraded** game mode (it is national examination subject 4-3) |
| **S04** | Emit a **reference path** per level; carry DECISIVE **condition descriptors**; generate NIST Level-5 / ASTM E3479 / Japanese examination **apparatus geometry** as level archetypes |
| **S08** | Anchor metrics to Japanese deduction categories; **add heading discipline and minimum time-to-collision**; report reaction latency against the regulator's **2-second** return-to-path threshold |
| **S09** | **Scope grows**: containment envelope, runtime monitor, OoD criteria, fallback states. BC = shippable line, RL = research line. Report in DECISIVE metrics. Read V3 §9–§10 first |
| **S10** | Remove unsupported claims (INSARAG IEC/IER relevance; incident-command interoperability). State regional non-portability explicitly. Requalify the corpus arrow |
| **S11** | Data-source entitlement is an **assurance** artefact; adopt the **Humanitarian UAV Code of Conduct**; cite EASA §5.2 in ADR-004 |
| **S14** | Strongest single input: **public money already funds operator qualification** (特別交付税措置, rate 0.5); ~1,500 schools / ~500 registrants as a channel; **we cannot be a 登録講習機関** (physical airspace + real aircraft required); **JUIDA's ドローン防災マネージャー is the incumbent**; the radio-licence gap is unserved. Read **V6** and **V5 §2** |
| **S01** | R1 landed during S12; **V7 §2 has been revised to R1's shortlist**. Two questions back: **is Türkiye a second seed rather than an unlisted region?** (it has the most developed framework surveyed plus the Kahramanmaraş corpus ADR-003 names), and **should the *data/player* cascade be a different list from the *deployment* cascade?** — Morocco, Ethiopia and Nigeria all gate drones at the border, which does not affect their R1 roles but does forbid a deployment story |

---

## Actions S12 could not take (needs `docs/` write access)

1. **Apply Appendix A of `research/V0-summary.md` as `docs/02-constraints.md`
   §C6.** This is the session's formal deliverable and it is drafted, not
   applied.
2. **Amend ADR-005** per the recommendation above and move it from `proposed`.
3. **Amend or supersede ADR-003** to record regulatory non-portability and the
   unresolved export-control exposure.
4. **Amend ADR-004** to cite EASA DM-06 / DM-13-2 / DM-13-4 / §5.2 and to record
   that representativeness — not consent — is the binding constraint.
5. **Correct `docs/00-vision.md`**: the "degradation tolerance is least studied"
   claim is wrong (it is a scored national examination subject); the arrow chain
   omits the envelope and overstates the corpus; the metric list is missing
   heading discipline and min-TTC.
6. **Append this session's prompt to `requirements/user-prompts.md`** per the
   CLAUDE.md convention. S12 did not, to avoid a write conflict with S01.

---

## Unowned work S12 created

No session currently covers these. All are in `research/V8-matrix.md` §G.

- **Export control on autonomy software** under 外為法 / Wassenaar, including
  deemed-export exposure. **Highest risk — it blocks ADR-003's cascade claim.**
- **Import control per cascade region — upgraded to a *primary* gate.** Morocco
  prohibits importation and possession in principle (2015 Head of Government
  measure); Ethiopia's directive is import-focused; the NCAA states no drone is
  certified for use in Nigeria. **Three of R1's five shortlisted regions block
  at the border, not in the air, and no project document says so.**
- The **survey evidence chain** (plan → execution → determination → report) and
  its separate, non-anonymous schema — incompatible with C3/C4 by design.
- Aerial-imagery privacy/surveillance law.
- **Whether insurers will underwrite an operation using a learned navigation
  component.** Potentially the sharpest practical gate of all, and entirely
  unresearched.

---

## Research debts inside S12's own output

Marked `[UNVERIFIED]` throughout and listed per-file under "Open items". The
five worth chasing first:

1. **The DECISIVE Benchmarking Data Report [Norton et al., 2023]** — the actual
   eight-platform numbers. It is the baseline our benchmark would be compared
   against. **Retrieve before S09 starts.**
2. **Has ARP6983/ED-324 been published since Draft 7 (2025-08)? Has EASA
   published anything on Level 3 since 2024-03-06?** Both fast-moving; both
   change §1 of V0.
3. **Does MLIT accept simulator hours against any part of the 実地講習 hours?**
   Single highest-value question for S14.
4. **Do the INSARAG Guidelines name UAS in the ASR/reconnaissance methodology?**
   Cheap to check; decides whether V5 §4 stays negative.
5. Infrared wall-survey **適用条件** (V4 §2.5) — the operating envelope, needed
   before any preventative-mission product claim.
