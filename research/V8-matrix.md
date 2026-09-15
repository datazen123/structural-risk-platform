# V8 — Requirements matrix

**Session:** S12. **Date:** 2026-09-08.

Rows are requirements a SAR or risk-assessment drone system (and its software)
must satisfy. Columns are jurisdictions. Cells use exactly four values:

| Value | Meaning |
|---|---|
| **applies** | The requirement exists and binds in substantially the form stated |
| **differs** | A requirement of this kind exists but its form or threshold differs materially |
| **absent** | Researched; no such requirement found |
| **unknown** | Not established this session. **Not the same as "absent"** |

Cascade columns use **S01/R1's ranked shortlist**: **ID** = Indonesia,
**PH** = Philippines, **MA** = Morocco, **ET** = Ethiopia, **NG** = Nigeria.
Where all five are identical the cell is given once as **CASC**. (V7 §2B also
covers Türkiye, Nepal and Kenya, which R1 did not shortlist.)

"Owner" is the project session responsible for satisfying or discharging the
requirement. **Bold owners are newly assigned by S12 and are not currently in
that session's brief.**

---

## A. Airspace and flight authorization

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| A1 | Aircraft registration before flight | applies | applies | ID applies; PH applies; MA differs (import/possession prohibited in principle); ET applies (import-focused directive); NG applies | S14 / partner | V2 §2.4, V7 §2 |
| A2 | Remote-pilot qualification for commercial/BVLOS operation | applies (一等/二等) | applies (A2 CofC / STS / operational authorisation) | ID applies; PH applies (RPL, practical test, 5-yr); MA unknown; ET unknown; NG applies (age 16+) | **S14** | V2 §2.3, V6, V7 §2 |
| A3 | Separate **radio operator** qualification for professional link power classes | applies (第三級陸上特殊無線技士) | unknown | unknown | **S14** | V2 §2.5 |
| A4 | Airworthiness/type certification for flight over uninvolved persons | applies (第一種機体認証; 1 type cert / 4 airworthiness certs as at 2023-03-15) | applies (certified category) / differs (specific category = SORA, no type cert) | unknown | out of scope for MVP | V2 §2.4, §4.3 |
| A5 | Operational risk assessment before a non-standard operation | differs (permission/approval under 132条の85/86) | applies (**SORA 2.5**, ED Decision 2025/018/R, 2025-09-29) | unknown | **S09 + S14** | V2 §2.2, §4.2 |
| A6 | **Prohibition of flight in airspace reserved for emergency manned aircraft** | applies (緊急用務空域; overrides prior permissions) | unknown | absent (none found) | S14 / partner | V2 §2.2 |
| A7 | **Disaster-specific statutory exemption from flight rules** | **applies (航空法132条の92)** | unknown | **absent (none found in any cascade region)** | — | V2 §3, V7 §2.9 |
| A8 | Exemption restricted to the State / local bodies / their commissioned parties | applies | n/a | n/a | **S14 (防災協定)** | V2 §3.2 |
| A9 | Urgency test — exemption unavailable if there is time to apply | applies | n/a | n/a | S10 (claim discipline) | V2 §3.4 |
| A10 | Notification to the Airport Office + NOTAM issuance for certain airspace | applies (8 specified data items, phone then email) | unknown | unknown | S14 / partner | V2 §3.5 |
| A11 | **Crew duty to cease flight or separate on visual acquisition of a manned aircraft** | applies | unknown | unknown | **S09 (override design)** | V2 §3.6 |
| A12 | Multi-agency air operations coordination cell at prefecture/region level | applies (航空運用調整班, 防災基本計画 §4-4, FOCS) | unknown | absent (ad hoc; OCHA/UAViators coordination) | S14 / partner | V2 §3.6, V7 §4 |
| A13 | Third-party liability insurance as a condition of the flight category | applies (Level 3.5 condition; confirmed for Level 4) | unknown | unknown | S14 | V4 §5.2 |
| A14 | Operator nationality/residency restriction | differs (public-body commissioning, not nationality) | absent | unknown for all five (KE, outside the shortlist, applies — V7 §2.8) | S14 | V7 §2.8, §6 |

## B. Software, autonomy and ML assurance

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| B1 | Defined **Operational Design Domain** for the learned function | unknown | applies (EASA DM-01) | unknown | **S09** | V3 §4.3 |
| B2 | Data Quality Requirements captured for the whole data pipeline | unknown | applies (DM-02/03) | unknown | **S04 + S06** | V3 §4.3 |
| B3 | Data sources identified and entitled | unknown | applies (DM-06) | unknown | **S11** | V3 §4.3, §6.3 |
| B4 | Data **completeness** evidenced | unknown | applies (DM-13-1) | unknown | **S04** | V3 §4.3 |
| B5 | Data **representativeness** vs. the ODD evidenced | unknown | applies (DM-13-2) | unknown | **S09** | V3 §6.1 |
| B6 | Data **traceability** — unambiguous lineage to source data, every operation reproducible | unknown | applies (DM-13-4) | unknown | **S02 + S04 + S06** | V3 §6.2 |
| B7 | Training/validation/test **set independence**; test set ideally real data | unknown | applies (DM-12, DM-13-5) | unknown | **S09** | V3 §4.3 |
| B8 | Model **frozen and non-adaptive** at deployment | unknown | differs (ARP6983/ED-324 Issue 1 scope; draft) | unknown | **S09** | V3 §7 |
| B9 | **Supervised learning mode only** in the certifiable path | unknown | differs (same, draft) | unknown | **S09** | V3 §7 |
| B10 | Generalisation-guarantee argument (in-sample ≈ out-of-sample error) | unknown | applies (learning assurance) | unknown | **S09** | V3 §10 |
| B11 | **Out-of-distribution detection at runtime** | unknown | applies (EASA OoD discriminator / OoD test cases) | unknown | **S09** | V3 §4.2, §10 |
| B12 | **Independent runtime monitor with passivation to a traditional backup** | unknown | applies (EASA SRM-02) | unknown | **S09 — new scope** | V3 §4.2 |
| B13 | Independence of the monitor from the AI/ML constituent | unknown | applies (SRM-02) | unknown | **S09 — new scope** | V3 §4.2 |
| B14 | **Containment: no single failure exits the ground risk buffer; FTS or equivalent** | unknown | applies (SORA Annex E containment criterion #4) | unknown | **S09 — new scope** | V3 §1, §3.2 |
| B15 | Software with catastrophic-contribution potential developed to a recognised industry standard | unknown | applies (SORA OSO #05) | unknown | **S09 — new scope** | V3 §3.2 |
| B16 | DO-178C / ED-12C compliance | absent for small UAS | absent for specific category | absent | — | V3 §2 |
| B17 | **Simulation validity must be justified** where simulation is used as evidence | unknown | applies (SORA Annex E, repeated) | unknown | **S03 + S09** | V3 §5 |
| B18 | **Third-party validation of simulations** at high robustness | unknown | applies (SORA Annex E) | unknown | **S03 — new scope, unbudgeted** | V3 §5 |
| B19 | Ethics-based assessment, **not compensable by runtime mitigation** | differs (AIST/QA4AI guidance, non-binding) | applies (EASA Issue 2 ethics block) | unknown | **S11** | V3 §4.2, §6.3 |
| B20 | Guidance for **non-supervised autonomous decision** (EASA AI Level 3) | unknown | **absent — not yet published** | unknown | S10 (roadmap honesty) | V3 §4.1 |
| B21 | Unconditional operator override with bounded latency | applies (via A11) | applies (via SRM-02) | unknown | **S09** | V3 §10 |

## C. Test methods and benchmark

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| C1 | Recognised standard test methods exist for aerial response robots | differs (NIST/ASTM known to researchers; no national adoption found) | differs (no EU-specific equivalent found) | unknown | S09 | V1 §2.7 |
| C2 | Published standard for **fly-through-apertures** capability | absent | absent | absent | S09 (mirror ASTM E3479/E3479M-25) | V1 §2.5 |
| C3 | Published standard for **fly-through-confined-spaces** | absent (ASTM WK85836 is a draft work item) | absent | absent | S09 (mirror DECISIVE) | V1 §2.5 |
| C4 | Open, citable test methods for sUAS in confined indoor/subterranean space | n/a — international | n/a | n/a | **S09 (adopt DECISIVE metric set)** | V1 §3 |
| C5 | Aerial robots admitted to the national disaster-robotics benchmark competition | **absent (WRS 2020: "aerial robots are not acceptable")** | absent (RoboCup Rescue 2026A is ground-only) | absent | — | V1 §5, §6 |
| C6 | Level-5 confined-lane style scoring (maneuvering + acuity, 100 pts) | n/a | n/a | n/a | **S04 (apparatus geometry) + S09** | V1 §2.4 |

## D. Survey / risk-assessment missions

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| D1 | Statutory periodic inspection creating recurring demand | applies (建築基準法12条1項; 告示282号, ~10-yr full-tap cycle) | unknown | unknown | S14 | V4 §2.1 |
| D2 | Drone infrared survey admitted as an alternative to hammer-tapping | applies (告示282号 as amended by 令和4年告示110号, 2022-01-18) | unknown | unknown | S14 | V4 §2.2 |
| D3 | Acceptance criterion: **accuracy equal to or better than test-hammer tapping** | applies | unknown | unknown | **S09 (benchmark target)** | V4 §2.2 |
| D4 | **Licensed professional sign-off on the assessment** | applies (建築士 / 特定建築物調査員; 赤外線調査実施者 bears determination responsibility) | unknown | unknown | S10 (product framing) | V4 §2.3 |
| D5 | Named drone safety manager competent in both building survey and drone flight | applies | unknown | unknown | **S14 (training product)** | V4 §2.3 |
| D6 | Declared applicability envelope for the survey technique | applies (適用条件) | unknown | unknown | **S09 (ODD refusal)** | V4 §2.5 |
| D7 | Mandated evidence chain: preliminary survey → plan → execution → determination → report | applies | unknown | unknown | **unowned — needs a session** | V4 §4 |
| D8 | Government catalogue of recognised inspection-support technologies | applies (点検支援技術性能カタログ; 407 technologies as at 2026-04-01) | unknown | unknown | S14 (listing = milestone) | V4 §3 |

## E. Procurement, doctrine and trade

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| E1 | Standing disaster-cooperation agreement as the route to operate | applies (防災協定) | unknown | unknown | **S14 — primary milestone** | V5 §2.3 |
| E2 | Public subsidy for local-government drone acquisition | applies (緊急防災・減災事業債 from FY2024; 消防防災施設整備費補助金) | unknown | unknown | S14 | V5 §2.2 |
| E3 | Public subsidy for **operator qualification costs** | applies (特別交付税措置, rate 0.5, fire personnel and 消防団員) | unknown | unknown | **S14 — funded buyer today** | V5 §2.2 |
| E4 | Service-quality standard for drone service providers | applies (JIS, 2024-09-18; designation unknown) | differs (ISO 21384-3:2023) | unknown | S14 | V5 §2.4 |
| E5 | International operational-procedures standard | differs (ISO 21384-3 via JUIDA secretariat) | applies (ISO 21384-3:2023) | unknown | S14 | V5 §2.4 |
| E6 | UAS capability mandated by international USAR team classification | absent (INSARAG IEC/IER classifies teams, not equipment) | absent | absent | S10 (do not claim) | V5 §4 |
| E7 | Specified data format for handoff to incident command | **absent** (Noto ran on telephone) | unknown | absent | S10 (do not claim) | V5 §5 |
| E8 | Export control on autonomy software | unknown (外為法 / METI) | unknown | n/a | **unowned — highest-risk gap** | V5 §6 |
| E9 | **Import control / import prohibition on UAS hardware** | unknown | unknown | **MA applies (prohibition in principle); ET applies; NG differs (no certified drone); ID/PH unknown** | **unowned — now a primary gate** | V7 §2.0, §3 |
| E10 | Voluntary humanitarian code of conduct | n/a | n/a | applies in practice (Humanitarian UAV Code of Conduct) | **S11 (adopt)** | V7 §4 |

## F. Data governance (interaction with C4 / ADR-004)

| # | Requirement | Japan | EU | CASC | Owner | Source |
|---|---|---|---|---|---|---|
| F1 | Lawful basis for collecting behavioural data from minors | applies (APPI) | applies (GDPR-K) | differs / absent by region | S11 | ADR-004, V3 §6.3 |
| F2 | Documented entitlement to the training-data source, as an **assurance** requirement | unknown | applies (DM-06) | unknown | **S11 + S09** | V3 §6.3 |
| F3 | Runtime mitigation **may not** compensate for ethics-block shortfalls | unknown | applies (EASA §5.2) | unknown | S11 | V3 §6.3 |
| F4 | Data lineage preserved and every transform reproducible | unknown | applies (DM-13-4) | unknown | **S02 + S04 + S06** | V3 §6.2 |
| F5 | Separate non-anonymous evidence schema for survey products | applies (implied by D7) | unknown | unknown | **unowned** | V4 §4 |
| F6 | Aerial-imagery privacy/surveillance law | unknown | applies (GDPR) | unknown | **unowned** | V4 §6 |

---

## G. Summary of newly assigned and unowned work

**Newly assigned to an existing session (must be added to its brief):**

- **S02** — B6, F4: data lineage fields in the telemetry contract.
- **S03** — B17, B18: a validation simulator whose validity can be justified, and
  budget for third-party validation. Also V6 §6: position-hold-degraded mode.
- **S04** — B2, B4, F4; V1 §8: reference paths per level, DECISIVE condition
  descriptors, NIST Level-5 and aperture apparatus geometry, examination
  geometries.
- **S08** — V1 §8, V6 §3: minimum time-to-collision, path deviation from a
  reference path, heading discipline; report reaction latency against the
  regulator's 2-second threshold.
- **S09** — B1, B5, B7–B15, B21, C4, C6, D3, D6: **scope grows to include the
  containment envelope, the runtime monitor and the OoD criteria.**
- **S10** — A9, B20, E6, E7, V7 §6: claim discipline; state regional
  non-portability; drop unsupported INSARAG and interoperability claims.
- **S11** — B3, B19, F1–F3, E10: data-source entitlement as an assurance
  artefact; adopt the Humanitarian UAV Code of Conduct.
- **S14** — A2, A3, D5, E1, E3: the 防災協定 as primary milestone; the funded
  operator-qualification market; the radio-licence gap.

**Unowned — no session currently covers these:**

- **E8 export control** on autonomy software under 外為法 / Wassenaar, including
  deemed-export exposure. **Highest-risk gap; blocks ADR-003's cascade claim.**
- **E9 import control** per cascade region. **Upgraded to a primary gate by V7
  §2.0: three of five shortlisted regions block at the border, not in the air.**
- **D7 / F5** the survey evidence chain and its separate, non-anonymous schema.
- **F6** aerial-imagery privacy law.
- **Insurability of an operation using a learned navigation component** (V4 §5.2)
  — potentially the sharpest practical gate of all.

Every "unknown" cell in the Japan and EU columns is a research debt, not a
finding. The cascade columns are mostly unknown by design: **V7 §1 establishes
that they restart from zero regardless**, so the cost of leaving them unknown is
low until S01/R1 fixes the shortlist.
