# V4 — Risk-assessment / survey mission requirements

**Session:** S12. **Date:** 2026-09-08.

The preventative mission class (R-P001-8, R-P004-2). The brief's hypothesis was
that this regime is *different from and probably stricter than* emergency SAR.
**That hypothesis is confirmed, and the reason is exactly the one the brief
gave: the output is an engineering assessment someone acts on.**

---

## 1. Headline answer

**In Japan, drone-based structural survey is already a regulated, admitted
technique — and the regulation defines the drone and its pilot as *subordinate
instruments in a qualified professional's workflow*, explicitly and by name.**

This is not an inference. The governing guideline separates four roles and
assigns responsibility for the *judgement* to a person who is not the pilot.
The product reframing the brief anticipated is therefore correct and is now
sourced.

It also cuts the other way, favourably: **the pathway is open, mature, and
routine.** Unlike disaster SAR, this is a market with published acceptance
criteria, an approved-technology catalogue, a periodic statutory demand cycle,
and existing buyers. **It is the *less* gated of the two mission classes, which
inverts the usual assumption that SAR is the easier entry.**

---

## 2. Japan: building exterior-wall survey — the flagship case

### 2.1 The statutory hook

**Building Standards Act Article 12(1) (建築基準法第12条第1項)** requires periodic
inspection and reporting (定期報告制度) for designated buildings (特定建築物).

For exterior tile / stone (excluding dry-process) and mortar finishes,
**MLIT Notification No. 282 of 2008 (平成20年国土交通省告示第282号)** requires
hammer-tapping (打診) within arm's reach approximately every 6 months to 3 years,
**plus a full hammer-tap survey (全面的な打診等) approximately every 10 years** of
any portion whose fall could injure pedestrians
[建築：定期報告制度における外壁のタイル等の調査について, 国土交通省, n.d., https://www.mlit.go.jp/jutakukentiku/build/jutakukentiku_house_tk_000161.html].

### 2.2 The 2022 amendment that admitted drones

**Notification No. 282 was amended on 2022-01-18 by 令和4年国土交通省告示第110号**,
clarifying that, as an alternative to hammer-tapping, an **infrared survey by
unmanned aircraft (無人航空機による赤外線調査)** is permitted **provided it has
accuracy equal to or better than test-hammer tapping (テストハンマーによる打診と
同等以上の精度)** [ibid.].

The implementing document is the **定期報告制度における赤外線調査（無人航空機による
赤外線調査を含む）による外壁調査ガイドライン**, produced March 2022 by the
「赤外線装置を搭載したドローン等による外壁調査手法に係る体制整備検討委員会」, secretariat
一般財団法人日本建築防災協会, chaired by Prof. Emeritus Kenji Motohashi (Shibaura
Institute of Technology), with members from Tokyo University of Science, Kobe
University, **MLIT's National Institute for Land and Infrastructure Management
(国土技術政策総合研究所)** and the **Building Research Institute (建築研究所)**
[定期報告制度における赤外線調査による外壁調査 ガイドライン, 赤外線装置を搭載したドローン等による外壁調査手法に係る体制整備検討委員会 / 日本建築防災協会, 2022-03, https://www.mlit.go.jp/jutakukentiku/build/content/001474154.pdf].

Its stated purpose: to define what is necessary to conduct such surveys **"at
accuracy equal to or better than test-hammer tapping"** as positioned in the
Notification [ibid., §1.1].

### 2.3 The four roles — this is the product reframing, in the source's words

The guideline defines a role structure [ibid., §2]:

| Role | Requirement | Responsibility |
|---|---|---|
| **外壁調査実施者** (exterior-wall survey performer) | — | Oversees the whole survey; **determines from the delamination findings whether "significant delamination" (著しい浮き) exists** |
| **赤外線調査実施者** (infrared survey performer) | Sufficient knowledge of buildings and of infrared survey, **and practical experience in building surveys** | Performs the thermal imaging (**including where an assistant or the pilot captures it under this person's direction**), the analysis, and the delamination determination — **and bears responsibility for them** |
| **ドローン調査安全管理者** (drone survey safety manager) | Knowledge of building surveys **and** of drone flight | Oversees all drone management/operation work; controls the pilot and assistants; **bears responsibility for drone-related duties** |
| **操縦者** (pilot) | Well-versed in drone flight technique, with piloting experience; staffed with sufficient support for the building's scale | Flies the aircraft |

Read the second row again: the thermal image may be **captured by the pilot,
under the direction of the infrared survey performer**, who retains
responsibility for the analysis and the determination.

**That is, in the regulator's own construction, a drone-as-instrument model.**
The pilot does not assess. The drone does not assess. The person with building
survey experience assesses, and is liable.

And above all of them sits the 定期報告 itself, which under Article 12 must be
made by a qualified investigator — a **建築士** (licensed architect) or a
**特定建築物調査員**. The answer to the brief's question "does the output require a
licensed/chartered engineer's sign-off?" is therefore **yes**.

### 2.4 What this means for the product

- **We are not selling an assessor. We are selling an instrument, and possibly a
  workflow, to a qualified professional who signs.** Everything in S10's
  preventative-mission narrative must be rewritten in those terms.
- **The acceptance criterion is comparative, not absolute:** "equal to or better
  than test-hammer tapping". That is a benchmark we could, in principle, target
  and evidence. It is also a benchmark against a *human with a hammer*, which is
  an unusually concrete and checkable claim.
- **Combined use with hammer-tapping is contemplated** — the guideline has
  sections on 打診との併用の必要性 (necessity of combined use) for both the general
  infrared and drone-infrared cases [ibid., §3.2.2, §4.2.2]. The realistic
  product is *augmentation*, not replacement.
- **The safety manager role is a named, staffed position.** Any drone survey
  offering that does not include an identified person who is competent in *both*
  building survey and drone flight does not fit the guideline's structure. That
  is a training/screening product opportunity — **flag to S14 alongside V6**.

### 2.5 Applicability conditions are a real limit

The guideline devotes sections to 適用条件 — the conditions under which infrared
survey is applicable at all [ibid., §3.2.1, §4.2.1]. Infrared delamination
detection depends on solar loading, thermal gradient, surface material, weather,
and viewing angle. The details were not extracted this session
`[UNVERIFIED — retrieve §3.2.1/§4.2.1 before any product claim]`, but the
structural point stands: **this technique has a declared envelope, and operating
outside it invalidates the survey.** An autonomy product that flies a survey
pattern must know that envelope and refuse outside it — which is, note, exactly
the ODD/out-of-distribution requirement V3 derives from the assurance side.

---

## 3. Japan: infrastructure inspection — the catalogue mechanism

For roads, bridges and tunnels, MLIT operates a **点検支援技術性能カタログ
(Inspection Support Technology Performance Catalogue)** — a published register
of inspection-support technologies with stated performance, used to promote
their use in periodic inspection
[道路：点検支援技術性能カタログ, 国土交通省, n.d., https://www.mlit.go.jp/road/sisaku/inspection-support/].

Growth of the catalogue:

| Date | Action | Cumulative technologies |
|---|---|---|
| 2019-02 | Draft catalogue issued, from NETIS-registered technologies | — [点検支援技術性能カタログ（案）, 国土交通省, 2019-02, https://www.mlit.go.jp/road/sisaku/yobohozen/tenken/yobo5_2.pdf] |
| 2025-04 | +60 technologies (bridges, tunnels, pavement, road patrol) | 375 [国交省が道路点検支援カタログ拡充, ITmedia BUILT, 2025-04-21, https://built.itmedia.co.jp/bt/articles/2504/21/news141.html] |
| 2026-04-01 | +54 technologies (bridges, tunnels, earthworks, pavement, road patrol) | **407** [国土交通省が「点検支援技術性能カタログ」を拡充、54技術を追加, ドローンジャーナル, 2026, https://drone-journal.impress.co.jp/docs/news/1188398.html] |

The bridge section includes **31 technologies**, among them non-destructive
detection of delamination from drone-mounted infrared camera imagery, and
GNSS-based measurement of expansion-joint displacement [ibid.].

**Two readings, both true:**

1. *Favourable:* there is a defined, published, government-operated route by
   which a drone-based inspection technology becomes officially recognised and
   procurable. It is a real door with a real handle.
2. *Sobering:* **407 technologies are already through it, 31 of them for
   bridges.** This is not an empty market. Our differentiator cannot be "a drone
   inspects a bridge"; it must be the *navigation* capability in spaces the 407
   cannot reach — which is, at least, consistent with the project's actual
   thesis.

The catalogue is the correct target for a preventative-mission commercial claim
and S14 should treat catalogue listing as a concrete, dated milestone.
Bridge/tunnel periodic inspection procedures themselves (道路橋定期点検要領) were not
retrieved this session `[UNVERIFIED]`.

---

## 4. Data chain-of-custody, retention, and evidential force

Where an assessment has legal force under 定期報告, the guideline requires a
**report (報告書)** as the terminal step of both the infrared and drone-infrared
processes, preceded by a **survey plan document (調査計画書)** and a **preliminary
survey (事前調査)** [ガイドライン, 2022-03, §3.3–3.7, §4.3–4.7].

So the mandated artefact chain is: **preliminary survey → survey plan → survey
execution (with hammer-tap cross-check where required) → delamination
determination from thermal imagery → report.**

**Project consequence, and it is a direct one for S02/S04/S06:** a survey
product's data model is not a telemetry stream. It is a **plan-to-report
evidence package with a named responsible person at each step**. Our telemetry
contract (C3) captures kinematics; it does not capture plan, determination, or
attribution — nor should it, given C4. **A survey product needs a second,
separate, non-anonymous evidence schema.** That is a genuine architectural
finding and it is currently unowned by any session.

Specific retention periods, and whether the imagery itself (as opposed to the
report) must be retained, were **not established** `[UNVERIFIED]`.

---

## 5. Liability and insurance

### 5.1 Liability for a missed defect

The guideline's allocation is explicit: the **infrared survey performer bears
responsibility (その責任を負う)** for the imaging, analysis and delamination
determination; the **drone survey safety manager bears responsibility** for
drone-related duties [ガイドライン, 2022-03, §2.1, §2.2].

Liability for a missed defect therefore attaches to **people in defined roles**,
not to the equipment vendor, under the guideline's own scheme. A software or
autonomy supplier's exposure would arise separately (product liability,
contract), and I did not research Japanese product-liability case law on
inspection software `[UNVERIFIED]`.

**The strategically important consequence:** because a named professional carries
the liability, that professional will demand explainability and reviewability
from any tool that influences their determination. **A black-box learned
component in the assessment path is commercially unsellable here even where it
is legally permissible** — which converges again on V3's conclusion that our
learned output belongs in the navigation/coverage layer, not the judgement
layer.

### 5.2 Insurance as a gate

Third-party liability insurance for drones in Japan is **not generally mandated
by statute**, with no legally prescribed minimum sum; operators are expected to
set adequate cover for the conditions and risks on their own responsibility
[ドローン保険の加入は義務？, MOTTOBE, n.d., https://drone-roofer.com/mottobe/topics/column/565/].

**But it becomes a hard condition in specific regimes:**

- **Level 3.5 flight requires enrolment in third-party liability insurance
  (第三者賠償責任保険)** as one of three named conditions, alongside onboard-camera
  confirmation and holding a remote-pilot skill certificate
  [カテゴリーⅡ飛行(レベル3.5飛行)の制度について, 国土交通省航空局, 2024-02, https://www.mlit.go.jp/koku/content/001725836.pdf].
- For **Level 4**, insurance enrolment is separately confirmed
  [レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023-03-17, note 3, https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf].

So the brief's suspicion that insurance is "often the *de facto* gate, ahead of
regulation" is **half-right in Japan**: it is not merely de facto, it has been
written into the conditions for the flight categories a survey operation would
actually use.

`[UNVERIFIED]`: whether insurers will underwrite an operation using a learned
navigation component, and on what terms. **This is potentially the sharpest
practical gate of all and it is entirely unresearched.** Recommend it as a
named question for S14 and for any investor conversation — an insurer's refusal
would foreclose deployment faster than any regulator.

---

## 6. Privacy and surveillance law for aerial imagery

Not researched to primary sources this session. Known anchors, stated as
pointers rather than findings:

- Japan's **APPI (個人情報保護法)** governs personal data in imagery; MIC has
  historically published guidance on drone imagery and privacy `[UNVERIFIED]`.
- EU: GDPR applies to identifiable persons in aerial imagery; member-state
  aerial-photography rules vary.

**Relevant project note:** ADR-004/C4 forbids camera and raw imagery in the
*game* telemetry, which neatly means the consumer product has no aerial-imagery
privacy exposure at all. The exposure exists only in a fielded survey product,
which is a different data plane (see §4). Keep them separate in the
architecture and in the pitch; conflating them creates a privacy problem we do
not currently have.

---

## 7. Comparison: SAR regime vs. survey regime

| Dimension | Emergency SAR | Preventative survey |
|---|---|---|
| Legal basis for flight | 航空法132条の92 statutory exemption (V2 §3) | Ordinary regime: permission/approval, Level 3/3.5, insurance |
| Who may operate | State/local body or its commissioned party **only** | Any competent operator |
| Speed of authorisation | Phone call; minutes | Normal application cycle |
| Output's legal force | Operational information | **Statutory report; professional sign-off** |
| Acceptance criterion | None published | "Equal to or better than test-hammer tapping" |
| Recognised-technology route | None found | **点検支援技術性能カタログ (407 technologies)** |
| Demand cadence | Episodic, unpredictable | **Statutory, ~10-year full-tap cycle + 6mo–3yr partial** |
| Existing competitors | Very few (V2 §3.7: FPV interior survey was a Japan-first in 2024) | **Many (31 bridge technologies alone)** |
| Liability | Diffuse, public-body-led | **Named individuals, defined roles** |
| Gate on learned components | Assurance (V3) | **Commercial: professional demands explainability** |

The vision document's assessment that the preventative case "is the less exciting
half and the more fundable one" is **supported by this evidence** — it has
budget lines, a statutory cadence and an admission route. The corrective is that
it is also the **more crowded and more procedurally constrained** half, and that
its regulatory shape makes our system a component of someone else's workflow.

---

## 8. Constraints this thread generates

1. **Survey output is not ours to sign.** Any preventative-mission claim names
   the qualified professional (建築士 / 特定建築物調査員 / 赤外線調査実施者) who signs,
   and positions our system beneath them.
2. **A survey product requires a second evidence schema** — plan, execution,
   determination, report, with named responsible parties — separate from and
   incompatible with the anonymous kinematic telemetry contract (C3/C4).
3. **A survey autonomy component must know and enforce its applicability
   envelope** (the guideline's 適用条件), and refuse outside it. Same requirement
   as V3's ODD monitor, arrived at independently.
4. **Explainability is a commercial requirement in the assessment path**,
   because a named individual carries the liability. Learned components go in
   the navigation/coverage layer only.
5. **Insurance is a written condition**, not merely prudent, for Level 3.5 and
   Level 4 operations.

---

## 9. Open items

- Infrared survey 適用条件 (§3.2.1 / §4.2.1 of the guideline) — the operating
  envelope. **Retrieve before any preventative-mission product claim.**
- Retention periods and whether raw imagery must be kept.
- 道路橋定期点検要領 (bridge periodic inspection procedure) and the catalogue's
  entry criteria.
- **Whether insurers will underwrite operations using a learned navigation
  component.** Highest-value unresearched question in this file.
- Japanese product-liability exposure for inspection software vendors.
- Equivalents outside Japan (chartered engineer sign-off regimes in EU/UK, and
  in cascade regions — see V7).
- Aerial-imagery privacy law, Japan and EU.
