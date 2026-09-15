# V5 — Procurement & doctrine fit

**Session:** S12. **Date:** 2026-09-08.

The brief's framing is right and is worth restating before the evidence: *a tool
that does not fit an existing procedure does not get used, regardless of
capability.* This file finds that the procedure is being written **right now**,
in Japan, in the aftermath of Noto — which is unusually good timing and an
unusually narrow window.

---

## 1. Headline answer

**Japan is actively financing municipal and fire-service drone capability, and
the money is routed through mechanisms that fund *local governments*, not
vendors selling to a national programme.**

Three consequences for the project's go-to-market, all of them at odds with the
implicit assumption in the current documents that we ship a policy to a
"platform":

1. **The buyer is a municipality or a fire bureau, and its purchase is
   subsidised through local-finance instruments** — bonds and tax measures, not
   a central procurement catalogue. Sales motion is 1,700+ municipalities, not
   one ministry.
2. **The subsidy explicitly covers *people*, not just hardware** — national
   remote-pilot licence acquisition costs for fire personnel and volunteer
   firefighters attract a special local allocation tax measure. **That is public
   money already flowing toward exactly what S14's training product sells.**
3. **The doctrine slot exists and is named:** 航空運用調整 (air operations
   coordination) at prefectural level, with an acknowledged capability gap at
   municipal level. That gap is a product opportunity, and it is a *coordination
   and training* opportunity, not an autonomy one.

On the international side: **INSARAG classification does not, so far as I could
verify, mandate or standardise UAS capability**, which means it neither helps us
nor blocks us — and any claim that our system "supports IEC/IER classification"
is currently unsupported.

---

## 2. Japan — who buys, and with what money

### 2.1 The Fire and Disaster Management Agency (消防庁 / FDMA)

FDMA is the national agency; the operators are municipal fire bureaus (消防本部)
and the **緊急消防援助隊 (Emergency Fire Response Teams)** for inter-prefectural
mobilisation.

Verified provisions:

- FDMA equipped the Emergency Fire Response Teams with **camera drones capable
  of producing map imagery from aerial photography**, plus video transmission
  devices for inter-agency information sharing — **one set per prefecture**
  [消防の動き 2022年10月号, 総務省消防庁, 2022-10, https://www.fdma.go.jp/publication/ugoki/items/rei_0410_05.pdf].
  Optional functions listed as desirable include **thermal imaging (熱画像撮影
  機能)** [ibid.].
- From **FY2022**, acquisition costs for drone airframes and related materials
  at fire departments have been supported through **local financial measures
  (地方財政措置)**; the fire-department equipment subsidy programme began covering
  **aerial** drones in FY2022 and **expanded to underwater drones in FY2025**
  `[UNVERIFIED — reported via secondary summary of FDMA materials; primary FDMA
  budget documents not fully extracted]`.
- The standing subsidy instruments are the **消防防災施設整備費補助金** and the
  **緊急消防援助隊設備整備費補助金**
  [消防防災施設整備費補助金及び緊急消防援助隊設備整備費補助金（告示、要綱等）, 総務省消防庁, n.d., https://www.fdma.go.jp/about/others/post-9.html].

### 2.2 The post-Noto financing changes — the important part

Following the January 2024 Noto Peninsula earthquake:

- **From FY2024, disaster-response drones managed and operated by local
  governments' disaster-prevention departments for supplying materials to
  isolated areas became eligible for the 緊急防災・減災事業債 (Emergency Disaster
  Prevention and Mitigation Bond).** Support for developing the staff who
  operate them is provided, and FDMA's **「災害対応ドローン運用推進事業」
  (Disaster Response Drone Operation Promotion Project)** is available
  [事務連絡 令和6年2月21日, 消防庁総務課, 2024-02-21, https://www.fdma.go.jp/laws/tutatsu/items/240221_soumu_jimu1.pdf].
- **Costs of acquiring the national drone pilot qualification for fire
  department personnel and volunteer firefighters (消防団員) attract a special
  local allocation tax measure (特別交付税措置), at a measurement rate of 0.5**
  [ドローン活用人材の育成を通じた災害対応能力強化, 内閣府 地方分権改革 提案募集, 2024, https://www.cao.go.jp/bunken-suishin/teianbosyu/doc/r06/tb_r6fu_07mic_278_2.pdf].
- The **防災基本計画** was amended so that **local governments shall secure
  unmanned-aircraft transport means and the State (FDMA) shall support them**,
  and FDMA issued the notice **「地方公共団体の防災部局における災害対応ドローンの活用に
  ついて（通知）」** specifying support measures
  [能登半島地震におけるドローンの組織的活用と課題, JUIDA (内閣府防災 WG 第5回 資料3), 2024-09-04, https://www.bousai.go.jp/jishin/noto/taisaku_wg_02/pdf/siryo5_3.pdf].
- FDMA is running **advanced training for drone technology advisors** and
  **first-class licence acquisition training for fire department staff**
  `[UNVERIFIED — secondary summary]`.

**Read §2.2 as a whole and the strategic conclusion is unavoidable: the fastest
route to Japanese public money in this space, today, is a training and
capability-building product for municipal and fire-service personnel — because
that is what the FY2024 instruments were specifically created to fund.** This is
independent corroboration of ADR-006 from the budget side, and S14 should have
it.

### 2.3 What the procurement actually looks like

Synthesised, and marked as synthesis rather than a single source:

| Element | Reality |
|---|---|
| Buyer | Municipal fire bureau; prefectural disaster-prevention department; occasionally FDMA centrally for 緊急消防援助隊 sets |
| Money | Local financial measures; 緊急防災・減災事業債; 消防防災施設整備費補助金; 特別交付税措置 for qualifications |
| Cycle | Japanese fiscal year, April–March; budget requests submitted the preceding August (FDMA's 概算要求 is published each August) [令和７年度消防庁予算 概算要求について, 総務省消防庁, 2024-08, https://www.fdma.go.jp/pressrelease/info/items/240830_soumu_1.pdf] |
| Approved-supplier list | **None found for drones.** The nearest analogue is MLIT's 点検支援技術性能カタログ on the infrastructure side (V4 §3) |
| Trial route | Disaster-cooperation agreements (防災協定) with prefectures/municipalities — the JUIDA model (V2 §3.8) |

**No national approved-supplier list for SAR drones was found.** If one exists it
is `[UNVERIFIED]`. The functional equivalent is a **防災協定** — a standing
disaster-cooperation agreement — which is also the legal vehicle that makes an
organisation a "person acting at the request of a local body" under 航空法132条の
92 (V2 §3.2).

**This is the single most actionable finding in V5: the 防災協定 is simultaneously
the sales channel, the airspace authorisation, and the data-access route.** It
should be treated as the project's primary institutional milestone, ahead of any
certification milestone. JUIDA began signing these at prefectural level with
Ōita in June 2024 [JUIDA, 2024-09-04, ibid.].

### 2.4 Japanese quality standard for drone service providers

On **2024-09-18** the Japanese Standards Association issued a **JIS for drone
service providers**, defining the processes and requirements needed to ensure a
level of quality in the services they provide — guidelines for building a
service-provision system, delivering services, and conducting reviews for
continuous improvement. It was developed by the **Fukushima Innovation Coast
Framework Promotion Organization**
[Japan Sets New Standards for Drone Services: JIS Certification, DroneLife, 2024-11-05, https://dronelife.com/2024/11/05/japan-sets-new-standards-for-drone-services-jis-certification-promises-quality-and-safety-across-industries/];
[Japan establishes quality standards for drone services, Unmanned Airspace, 2024, https://www.unmannedairspace.info/latest-news-and-information/japan-establishes-quality-standards-for-drone-services/].

The exact JIS number was **not established** `[UNVERIFIED]`. It is a *service
quality management* standard, not a technical performance standard — i.e. it is
the Japanese analogue of an ISO 9001-shaped credential for drone service
delivery, and would plausibly be a procurement discriminator for a service
offering. **Retrieve the designation before any claim.**

Japan participates in **ISO/TC 20/SC 16 (Unmanned Aircraft Systems)** through
JUIDA, which has held the domestic committee secretariat since 2024
[International Activities, JUIDA, n.d., https://uas-japan.org/en/international_activities/].
The relevant ISO output is **ISO 21384-3:2023, Unmanned aircraft systems —
Part 3: Operational procedures** (2nd edition, October 2023; the 2019 edition is
withdrawn; the standard is flagged for revision), which specifies requirements
for safe commercial UAS operations including the safety-critical C2 link
[ISO 21384-3:2023, ISO, 2023, https://www.iso.org/standard/80124.html].

**This matters for the transferability argument in V7:** ISO 21384-3 is a
genuinely international operational-procedures standard, and JUIDA holds the
Japanese secretariat — so a Japan-seeded methodology expressed in ISO 21384-3
terms has a plausible international carry that a Japan-specific one does not.

---

## 3. Doctrine — where a drone sits in the SOP

### 3.1 Japan

The doctrinal slot is defined in the **防災基本計画, Part 2 Ch. 2 §4-4 (航空機の運用
調整等)**, quoted in full in V2 §3.6. Summary of the doctrinal position:

- Prefectures establish an **航空運用調整班** in the disaster HQ, coordinating
  aircraft **and unmanned aircraft** for information gathering, rescue,
  firefighting and medical activity.
- Participants: police, fire, MLIT, Japan Coast Guard, Self-Defense Forces,
  prefectural DMAT coordination HQ.
- Tools: **FOCS** (航空機運用総合調整システム).
- Powers: request NOTAM issuance; request **Emergency Use Airspace designation**;
  coordinate flight permission matters for designated public institutions and
  press.

**The acknowledged gap:** JUIDA's report states that because drones can be used
in large numbers and flexibly, it is effective for the **basic municipality
(基礎自治体)** — the actual response actor — to operate them independently, and
therefore **drone air-operations coordination capability is needed at the
municipal level too**. Its recommendation ③ is explicitly "planning of measures
to promote drone operational coordination at basic municipalities"
[JUIDA, 2024-09-04, ibid.].

**That is a named, government-acknowledged capability gap at the level where the
buying happens.** It is a coordination/training/decision-support gap, not an
autonomy gap. Any product roadmap that ignores it in favour of autonomy is
optimising for the harder problem with less money behind it.

### 3.2 The uncomfortable ground truth

Recorded here because S10 must not overstate: the first organised drone response
in a major Japanese earthquake (Noto, January 2024) was coordinated by an
industry association from inside a city disaster HQ, ran **over 100 sorties in
about a month**, met 10 of 12 identified needs, produced **three Japan-firsts**
including FPV survey of collapsed building interiors — and was **entirely
volunteer-based (全てボランティアベース)**
[JUIDA, 2024-09-04, ibid.].

There was, at that moment, no funded procurement, no doctrine below prefectural
level, and no standing capability. That is the market we are entering. It is
forming, not formed.

---

## 4. INSARAG — what classification actually constrains

The **INSARAG External Classification (IEC)** is a **voluntary, independent peer
review** ensuring only qualified international USAR resources deploy; teams are
classified **Light, Medium or Heavy**; **INSARAG External Reclassification (IER)**
is required every fifth calendar year to maintain Medium or Heavy status
[IEC, INSARAG, n.d., https://insarag.org/iec/];
[Background of INSARAG External Classification (IEC), INSARAG, n.d., https://insarag.org/iec/background-of-insarag-external-classification-iec/].

The methodology sits in the **INSARAG Guidelines Volume II: Preparedness and
Response**, with Manual B (Operations) and Manual C (IEC and IER)
[INSARAG Guidelines, INSARAG, n.d., https://insarag.org/methodology/insarag-guidelines/];
[INSARAG Guidelines Vol II Manual C — IEC and R, INSARAG, https://preparecenter.org/wp-content/uploads/2021/03/INSARAG-Guidelines-V2-Manual-C-IEC-and-R.pdf].

**What I could and could not establish:**

- Drones appear among the **equipment aspects evaluated** in classification
  materials `[UNVERIFIED — surfaced in search summaries; I did not verify it
  against the primary Manual C or the IEC/IER checklist text]`.
- I found **no evidence of a mandated UAS capability, a UAS performance
  standard, or UAS-specific classification criteria** in the INSARAG Guidelines.
- An IEC/IER review report annexed in 2025 exists
  [Annex E. IECR review report V2.0, INSARAG, 2025, https://insarag.org/wp-content/uploads/2025/11/Annex-E.-IECR-review-report-V2.0-1.pdf]
  but was not read.

**Conclusion, stated conservatively:** INSARAG classification is a *team*
credential, not an *equipment* credential. It neither requires nor certifies our
class of system. **Therefore: do not claim that our benchmark or system
"supports IEC/IER classification" — it is unsupported.** The honest positioning
is that a classified team is a *customer* whose declared capability we could
extend, and that our results being expressed in a recognised test-method
vocabulary (V1) is what would let them evaluate it.

**Open and worth closing:** whether the current INSARAG Guidelines edition
(2020, with subsequent annexes) names UAS in the reconnaissance/ASR
(Assessment, Search and Rescue) methodology. If it does, that is the doctrinal
hook for the international market and it is cheap to check. Not done this
session.

---

## 5. Interoperability and data handoff to incident command

**Not established.** I did not find a specified data format or interface for
handing UAS survey/SAR output into a Japanese incident command system.

What is known:

- **FOCS** is the aircraft operations coordination system used by the prefectural
  air operations coordination team [JUIDA, 2024-09-04, ibid.]. Whether it ingests
  UAS tracks is `[UNVERIFIED]` (also flagged in V2 §7).
- In Noto, coordination happened by **telephone to the regional civil aviation
  bureau plus information sharing at the prefectural DMAT HQ**
  [能登半島地震でドローン支援を統括、JUIDAが見た成果と課題, Drone Journal (Impress), 2024, https://drone-journal.impress.co.jp/docs/special/1185961.html] —
  i.e. no system-to-system interoperability at all.
- Internationally, INSARAG operates coordination through the **OSOCC/Virtual
  OSOCC** architecture `[UNVERIFIED in detail this session]`.

**Project consequence:** there is no incumbent format to conform to, which is
both freedom and risk. Freedom, because we cannot be excluded on format grounds.
Risk, because "integrates with incident command" is currently an unfundable
claim — there is nothing to integrate with. **S10 must not assert
interoperability we cannot name a counterparty for.**

---

## 6. Dual-use export control exposure

Anchors, not findings — this is the thinnest section in V5 and should be
treated as a flag, not an answer.

- The **Wassenaar Arrangement** dual-use list is the multilateral baseline;
  **Category 7 covers Navigation and Avionics**
  [List of Dual-Use Goods and Technologies and Munitions List, The Wassenaar Arrangement, 2023, https://www.wassenaar.org/app/uploads/2023/12/List-of-Dual-Use-Goods-and-Technologies-Munitions-List-2023-1.pdf].
- Japan implements export control through the **Foreign Exchange and Foreign
  Trade Act (外為法)** administered by **METI**, which has additionally imposed
  unilateral controls to "supplement the Wassenaar Arrangement" and prevent
  military diversion
  [International Unilateral Export Controls—An Increased Focus on Advanced Technologies, Akin, n.d., https://www.akingump.com/en/insights/alerts/international-unilateral-export-controls-an-increased-focus-on-advanced-technologies].

**The exposure to check, not yet checked:** whether autonomous navigation
software for UAS, and/or a trained navigation policy shipped to a cascade
region, is a controlled item or controlled technology under 外為法 / the Wassenaar
list, and whether the **deemed-export** rules (disclosure of controlled
technology to foreign nationals, including remote contributors) bite on an
open-source-adjacent development model. `[UNVERIFIED]`

**This is a material risk to ADR-003's cascade thesis and it is unowned.** A
project whose entire strategic argument is "transfer navigation autonomy from a
data-rich country to sensor-poor ones" needs a definite answer here before it
puts that in a deck. Recommend it becomes a named task with a legal input.

---

## 7. Constraints this thread generates

1. **The primary institutional milestone is a 防災協定 (disaster-cooperation
   agreement) with a Japanese prefecture or municipality** — it is the sales
   channel, the airspace authorisation route (V2 §3.2) and the data-access route
   simultaneously. Rank it above certification milestones in the roadmap.
2. **The buyer is local, the money is local-finance-instrument money, and the
   cycle is the Japanese fiscal year with August budget requests.** Plan
   engagement to that calendar.
3. **Public money is already earmarked for pilot qualification and operator
   capability building.** Any product line addressing that (S14) has a funded
   buyer today; the autonomy line does not.
4. **Do not claim INSARAG IEC/IER relevance.** Unsupported.
5. **Do not claim incident-command interoperability.** No counterparty format
   established.
6. **Resolve export-control exposure before publishing the cascade thesis.**

---

## 8. Open items

- FDMA FY2025/FY2026 budget lines for drones — primary documents not extracted.
- The JIS drone-service-provider standard's designation number.
- Whether the INSARAG Guidelines name UAS in ASR/reconnaissance methodology.
  **Cheap to check, decides §4.**
- Whether FOCS ingests UAS tracks.
- Export control classification of autonomy software under 外為法 / Wassenaar,
  including deemed-export exposure. **Highest-risk open item in this file.**
- Whether any prefecture publishes an open call for 防災協定 partners, and its
  criteria.
- Self-Defense Forces and municipal DRM procurement — not researched; FDMA and
  municipal channels dominated the evidence and were prioritised.
