# V2 — Airspace, flight authorization, operator licensing

**Session:** S12. **Date:** 2026-09-08.

Same evidence rules as V1. The centre of gravity of this file is §3, the
**disaster-zone authorization path in Japan** — the brief's headline question
(c), and the thing most drone-SAR proposals omit.

---

## 1. Headline answer

**The disaster-zone path in Japan exists, is written down, and is far faster
than a certification path — but it is not open to us.**

Japanese law does not require a private operator to obtain a permission to fly
in a disaster; it **exempts the state, local governments, and parties acting on
their request** from the normal prohibited-airspace and flight-method rules
altogether. There is no application, no approval queue, and no waiting period.
There is a **notification** duty (telephone then email to the relevant Airport
Office) in certain airspace, after which JCAB issues a NOTAM. That is a
minutes-to-hours process, not a weeks-to-months one.

The consequences for this project are blunt:

1. **We can never be the operator.** The exemption attaches to a public body or
   its commissioned agent. Our route to a disaster site is a standing agreement
   with a municipality, prefecture, or fire service — a **procurement and
   partnership problem (V5)**, not a regulatory one.
2. **Deconfliction with manned rotary-wing traffic is procedural and visual,
   not technical.** There is no clearance, no transponder requirement, no
   electronic separation. The prefecture stands up an air-operations
   coordination cell; on the ground, the UAS crew watches for aircraft and
   stops flying. An autonomy stack that cannot be commanded to land instantly
   on a shout is not fieldable, regardless of its navigation quality.
3. **The binding airspace constraint is 緊急用務空域 (Emergency Use Airspace),**
   which is designated *precisely to protect the rescue helicopters* and inside
   which drone flight is prohibited even for holders of prior permissions —
   except under the §3 exemption.

---

## 2. Japan — the baseline regime (non-disaster)

### 2.1 Statute and the 2022 restructuring

The governing statute is the **Civil Aeronautics Act (航空法, Act No. 231 of
1952)**, Chapter 9 Section 4 (無人航空機の飛行), as substantially amended by the
2021 revision **promulgated 2021-06-11 and in force 2022-12-05**
[レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023, https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf].

That amendment renumbered the drone articles. The provisions in force are:

| Article | Subject |
|---|---|
| 132条の85 | Prohibited airspace (飛行の禁止空域) |
| 132条の86 | Flight methods (飛行の方法) |
| 132条の87 | Measures when a third party enters |
| 132条の88 | Flight plan notification (飛行計画) |
| 132条の89 | Flight log (飛行日誌) |
| **132条の92** | **Exception for search, rescue etc.** |

[航空法第132条の85（飛行の禁止空域）, Lawzilla, n.d., https://lawzilla.jp/law/327AC0000000231?n=ln132_85&mode=only];
[航空法第132条の92（捜索、救助等のための特例）, Lawzilla, n.d., https://lawzilla.jp/law/327AC0000000231?n=ln132_92&mode=only]

**Any project document still citing 航空法132条の3 for the SAR exemption is
using pre-2022 numbering and is out of date.** The MLIT guideline's supplementary
provisions record the transition from 132条の3 to 132条の92 effective 2022-12-05
[航空法第132条の92の適用を受け無人航空機を飛行させる場合の運用ガイドライン, 国土交通省航空局安全部無人航空機安全課, 制定2015-11-17 / 最終改正2024-11-29 (国空無機第68754号), https://www.mlit.go.jp/common/001110204.pdf].

### 2.2 Prohibited airspace (132条の85)

Flight is prohibited, absent the Minister's permission, in: the vicinity of
airports; **緊急用務空域 (Emergency Use Airspace)**; at or above 150 m AGL/AMSL;
and over densely inhabited districts (DID)
[航空：無人航空機の飛行禁止空域と飛行の方法, 国土交通省, n.d., https://www.mlit.go.jp/koku/koku_fr10_000041.html].

The critical asymmetry, stated explicitly by MLIT: **a permission for airport
vicinity, >150 m, or DID does not authorise flight in Emergency Use Airspace.**
Operators must check before every flight that the intended airspace has not
been designated as such [ibid.].

**Emergency Use Airspace is defined as** airspace designated by the Minister of
Land, Infrastructure, Transport and Tourism as requiring protection for the safe
flight of aircraft used by MLIT, the Ministry of Defense, the National Police
Agency, prefectural police, local government **fire and disaster-management
organs**, and other relevant agencies, when those aircraft are conducting
search, rescue or other emergency duties
[運用ガイドライン, 国土交通省, 2024, note 3, https://www.mlit.go.jp/common/001110204.pdf].

That definition is the whole deconfliction story in one sentence: when the
rescue helicopters arrive, MLIT draws a box and drones are excluded from it.

### 2.3 Categories and flight levels

Operations are sorted into Category I / II / III. The colloquial "Levels" map on
as follows:

- **Level 1–2** — VLOS, manual or automated.
- **Level 3** — BVLOS over unpopulated areas, with third-party entry control
  (assistants, signage).
- **Level 3.5** — created December 2023 following the 1st Digital
  Administrative and Fiscal Reform Council (2023-10). It removes *only* the
  assistant/signage entry-control requirement, substituting **onboard-camera
  confirmation that no pedestrians are beneath the route**, conditional on the
  pilot **holding a remote-pilot skill certificate (either class)** and
  **carrying third-party liability insurance**. It eases temporary crossing of
  roads, railways, vehicles and vessels. It **does not** authorise flight over
  populated areas, and it is formally classified as **Category II (Level 3)
  flight**
  [カテゴリーⅡ飛行(レベル3.5飛行)の制度について, 国土交通省航空局, 2024-02, https://www.mlit.go.jp/koku/content/001725836.pdf].
- **Level 4 (Category III)** — BVLOS without assistants over populated areas,
  i.e. over uninvolved third parties. Requires **一等無人航空機操縦士** (first-class
  remote pilot certificate) **and 第一種機体認証** (first-class airworthiness
  certification of the aircraft)
  [無人航空機レベル4飛行ポータルサイト, 国土交通省, n.d., https://www.mlit.go.jp/koku/level4/].

The brief's leads on Level 3.5 and Level 4 are **verified and current**. The
brief's framing of them as the route to disaster flight is **wrong** — see §3.

### 2.4 Registration, DIPS, and volume

Aircraft registration and the permission/approval workflow run through the
**DIPS** portal. Scale as at the dates given:

| Item | Figure | As at |
|---|---|---|
| Permissions/approvals issued | 69,257 per year | CY2022 |
| Registered aircraft | 331,202 | 2023-02-28 |
| Registered inspection bodies | 1 | 2023-03-15 |
| **Type certificates (型式認証) issued** | **1** | 2023-03-15 |
| **Airworthiness certificates (機体認証) issued** | **4** | 2023-03-15 |
| Registered training providers | 178 bodies / 244 schools | 2023-03-15 |
| Second-class licences issued | 145 (1,853 written-exam applications) | 2023-03-15 |
| First-class licences issued | 21 (740 written-exam applications) | 2023-03-15 |

[レベル４飛行の制度概要及び施行状況について, 国土交通省, 2023-03-17, https://www.mlit.go.jp/seisakutokatsu/freight/content/001600205.pdf]

These are **2023 figures and are certainly stale in 2026** — I could not locate
a 2026 restatement from a primary source, so current counts are `[UNVERIFIED]`.
But the *shape* is the finding and it will not have inverted: **one type
certificate and four airworthiness certificates against 331,202 registered
aircraft.** Level 4 is a narrow, expensive door. Any project plan that assumes
our target platform will be Level-4 certified is assuming something that has
happened a handful of times in the country.

### 2.5 Spectrum

Control and video links are governed by the Radio Act and require a **技適
(technical conformity) mark**; equipment without it is unlawful to operate
[ドローン等に用いられる無線設備について, 総務省 電波利用ポータル, n.d., https://www.tele.soumu.go.jp/j/sys/others/drone/].

MIC allocated **2.4 GHz and 5.7 GHz** as primary bands for high-quality video
downlink, **169 MHz** as a backup link, and added **73 MHz** for control
[ドローンに係る電波利用に関する検討状況, 総務省総合通信基盤局, 2018-04, https://www.cas.go.jp/jp/seisakukaigi/kogatamujinki/kanminkyougi_dai7/s1-5.pdf].
Operating 169 MHz at 10 mW, or 2.4/5.7 GHz up to 1 W, requires a **第三級陸上特殊
無線技士** operator qualification and a radio station licence
[無線システム名称/無線局種 一覧, 国土交通省, n.d., https://www.mlit.go.jp/common/001154535.pdf].

**Project consequence:** the *pilot qualification* for a professional Japanese
SAR drone operation is two certificates, not one — the MLIT skill certificate
**and** a MIC radio operator qualification. V6 and any S14 training product must
say so; a training product that ignores the radio licence is incomplete.

Post-Noto, MIC **expanded the 5 GHz-band wireless-LAN frequencies usable by
drones**, listed as one of four government improvements delivered after the
earthquake
[能登半島地震におけるドローンの組織的活用と課題, JUIDA (内閣府防災 災害対応検討WG 第5回 資料3), 2024-09-04, https://www.bousai.go.jp/jishin/noto/taisaku_wg_02/pdf/siryo5_3.pdf].

---

## 3. Japan — the disaster path (the headline question)

### 3.1 The mechanism: statutory exemption, not authorization

**航空法第132条の92 (捜索、救助等のための特例)** disapplies, for qualifying
flights, the rules on prohibited airspace (132条の85), flight methods (132条の86,
except paragraph 1), third-party-entry measures (132条の87), flight plan
notification (132条の88) and flight logs (132条の89)
[運用ガイドライン, 国土交通省航空局, 制定2015-11-17 / 最終改正2024-11-29, §1, https://www.mlit.go.jp/common/001110204.pdf].

Its stated rationale: search and rescue of human life on the occasion of an
accident or disaster is "extremely urgent and highly public", so the rules are
disapplied **to accelerate rescue** [ibid.].

Critically, the guideline is explicit that the exemption **does not release the
operator from the primary duty of safety assurance**: the exempted party must,
on its own responsibility, voluntarily achieve "a level of safety equivalent to
that of a flight conducted under permission" [ibid., §1]. And the criminal law
on endangering aviation (航空の危険を生じさせる行為等の処罰に関する法律, Act No. 87
of 1974) continues to apply [ibid., note 1].

### 3.2 Who it covers — and why we are not covered

Per 航空法施行規則第236条の88, the exemption applies to:

- **国 (the State) or 地方公共団体 (local public bodies)**; and
- **persons carrying out search or rescue at the request of the State or a local
  public body** (国又は地方公共団体の依頼により捜索又は救助を行う者)

[運用ガイドライン, 国土交通省航空局, 2024, §2, https://www.mlit.go.jp/common/001110204.pdf]

**This is the single most important sentence in V2 for product strategy.** A
private company, a research group, or a volunteer cannot self-authorise into a
disaster zone. It is inside the tent by invitation of a public body, or it is
not there. That converts the "disaster airspace" problem from a certification
problem into a **standing-agreement problem** — and standing agreements are
signed in peacetime, over years, through the channels V5 describes.

### 3.3 What counts as "search or rescue" — wider than expected

施行規則第236条の89 sets the purpose as "捜索又は救助". MLIT interprets this as
measures to avoid a crisis to human life (**including disaster-related death**)
or damage to property where there is imminent danger following an accident or
disaster — **explicitly including the conduct of surveys, inspections and
investigations (調査・点検、捜査等の実施を含む)** [ibid., §2].

For large-scale disasters, MLIT further states the exemption covers:

- transport of medicines, sanitary supplies, food and drinking water to isolated
  areas;
- **survey and inspection of dangerous locations (危険を伴う箇所での調査・点検)**;
- monitoring of housing and neighbourhoods after residents evacuate, for crime
  prevention. [ibid., §2]

**This matters to the preventative/survey product line (V4).** Structural and
slope survey inside a disaster response is squarely inside the exemption. The
same survey performed 51 weeks a year, outside a disaster, is not — it falls
under the ordinary regime plus the Building Standards Act machinery in V4.

### 3.4 The urgency test — the real gate

The exemption applies only where taking the measure is **urgent**, and MLIT
defines urgency narrowly:

> 緊急性がある場合とは、飛行の許可・承認申請の対応窓口への申請を行う手段又はいとまが
> ない状況をいう。
> *("Urgent" means a situation in which there is no means, or no time, to apply
> to the permission/approval desk.)*

[運用ガイドライン, 国土交通省航空局, 2024, §2 note 2, https://www.mlit.go.jp/common/001110204.pdf]

That is a genuine constraint and it cuts against a planned, repeatable,
productised operation. If you have time to file, you must file. A drone-SAR
proposal that describes routine disaster-zone operations under 132条の92 is
misreading it.

### 3.5 The notification procedure and its speed

Where the flight is in **132条の85(1)(i) airspace** — airport vicinity,
**Emergency Use Airspace**, or ≥150 m — the exempted party must, **after
coordinating with the airspace's managing agency**, telephone and then email
the Airport Office having jurisdiction, providing eight items:

| # | Item | Example given in the guideline |
|---|---|---|
| a | Flight purpose | mountain rescue (search for a fall victim) |
| b | Flight area — location, lat/long (WGS-84) | within 500 m radius of Mt. ○○ |
| c | Maximum altitude, AGL **and** AMSL | ○○○ m AGL, △△△△ m AMSL |
| d | Date/time (state if end time undetermined) | "from now, end time TBD" |
| e | Number of aircraft flown simultaneously | 2 |
| f | Aircraft specifications (type, weight) | multicopter, 10 kg |
| g | Contact for the flight principal | company, name, mobile |
| h | Requesting body, if on request | ○○ Prefecture △△ Fire Bureau |

JCAB then issues **aeronautical information (航空情報 / NOTAM) under 航空法第99条**,
and the airport manager takes the necessary safety measures for aircraft in the
area.

**Outside that airspace class, no notification to the Airport Office is
required at all** (航空法第132条の85第1項第1号の空域以外で…通知は不要)
[運用ガイドライン, 国土交通省航空局, 2024, §3(1), https://www.mlit.go.jp/common/001110204.pdf].

**Answer to "how fast": a phone call.** The gating latency is not regulatory
processing; it is (i) getting a public body to commission you and (ii) the
NOTAM propagation to manned crews. This is the opposite of the usual assumption
and it should be corrected wherever the project has assumed otherwise.

### 3.6 Deconfliction with manned rotary-wing — two layers

**Layer 1 — the crew's own visual duty.** The guideline states that in
search-and-rescue conditions, manned aircraft are *to be expected* in the same
airspace; the operator must **monitor the flight airspace**, and on sighting an
aircraft must ensure its safe navigation is not impaired — for example, if the
sighted aircraft is conducting rescue activity, **cease the UAS flight or keep
sufficient distance**
[運用ガイドライン, 国土交通省航空局, 2024, §3(2), https://www.mlit.go.jp/common/001110204.pdf].

That is see-and-avoid discharged by the ground crew, with the drone as the
give-way party in every case. **Design consequence:** any autonomy the project
ships must have an unconditional, latency-bounded, human-triggered
land/hold/retreat that supersedes the policy. This is the same requirement V3
derives from the assurance side, arriving from a completely different direction.

**Layer 2 — the prefectural air operations coordination cell.** The **防災基本計画
(Basic Disaster Management Plan), Part 2 Ch. 2 §4-4 (航空機の運用調整等)**
provides that prefectures shall establish an **航空運用調整班 (Air Operations
Coordination Team)** within the disaster response headquarters, coordinating
with the on-site HQ, to manage the use of aircraft **and unmanned aircraft** for
information gathering, rescue, firefighting and medical activity. The team is
constituted with participants from **the police, fire services, MLIT, the Japan
Coast Guard, the Self-Defense Forces, and the prefectural DMAT coordination
headquarters**, coordinates activity areas and missions, and uses the **FOCS
(航空機運用総合調整システム, aircraft operations integrated coordination system)** in
concert with the government HQ / Cabinet Office response room.

The same section provides that the coordination team shall, as necessary,
**request MLIT to issue a NOTAM**, and — to protect aircraft engaged in
emergency response from unmanned aircraft — **request MLIT to designate
Emergency Use Airspace**; once designated, the team coordinates flight-permission
matters for designated public institutions and press organisations
[防災基本計画 第2編第2章第4節4, quoted in 能登半島地震におけるドローンの組織的活用と課題, JUIDA (内閣府防災 WG 第5回 資料3), 2024-09-04, https://www.bousai.go.jp/jishin/noto/taisaku_wg_02/pdf/siryo5_3.pdf].

The MLIT guideline adds, at advisory strength, that in a large-scale disaster it
is **desirable (望ましい)** to coordinate flight timing and location through the
**現地災害対策本部 (on-site disaster response headquarters)**
[運用ガイドライン, 国土交通省航空局, 2024, §5, https://www.mlit.go.jp/common/001110204.pdf].

So: **prefecture-level, multi-agency, procedural, and only advisory for the
drone operator.** There is no technical UTM layer in this loop.

### 3.7 Ground truth: Noto Peninsula earthquake, January 2024

The best available evidence that this machinery works — and how — is JUIDA's
report to the Cabinet Office disaster-response working group
[能登半島地震におけるドローンの組織的活用と課題, JUIDA (内閣府防災 災害対応検討WG 第5回 資料3), 2024-09-04, https://www.bousai.go.jp/jishin/noto/taisaku_wg_02/pdf/siryo5_3.pdf]:

- JUIDA established a **drone disaster support headquarters inside the Wajima
  City disaster response HQ**, and **performed the drone air-operations
  coordination itself**, acting on support requests from Wajima and Suzu cities
  and under a disaster-cooperation agreement with the JGSDF 10th Division.
- It coordinated **26 drone-related organisations**.
- **Over 100 support sorties between 4 January and 7 February 2024** — about a
  month. **Entirely volunteer-based (全てボランティアベース).**
- Of 12 identified needs, 10 were met. Three were **firsts for Japan in a real
  disaster**: FPV survey of the interior of damaged/collapsed buildings; BVLOS
  transport of medicines and supplies; and unmanned monitoring of a landslide
  dam. Others: survey of isolated areas, confirmation of missing persons,
  landslide-precursor survey, road/port survey, bridge inspection.
- Coordination in practice ran through **telephone contact to the regional civil
  aviation bureau**, plus information-sharing at the **Ishikawa Prefecture DMAT
  headquarters**
  [能登半島地震でドローン支援を統括、JUIDAが見た成果と課題, Drone Journal (Impress), 2024, https://drone-journal.impress.co.jp/docs/special/1185961.html].

**Read this carefully — it is a warning as much as a proof.** The first
organised drone response in a major Japanese earthquake was run by an industry
association, staffed by volunteers, coordinating by telephone. That is the
maturity level our product will be inserted into. It is an opportunity (the
niche is open, the doctrine is being written now) and a risk (there is no
budgeted buyer with a defined requirement — see V5).

Note also the **FPV interior survey of collapsed buildings** is a Japan-first
that happened in 2024. That is our exact use case, and it has been performed
once, manually, by volunteers. Our benchmark's real-world reference class is
approximately empty.

### 3.8 Post-Noto reforms (2024) — the direction of travel is favourable

Following the **答申 of the Regulatory Reform Promotion Council, 2024-05-31**,
four ministries delivered changes [JUIDA, 2024-09-04, ibid.]:

| Ministry | Change | Effect |
|---|---|---|
| MHLW (厚労省) | Clarified that the caveats in the drone medicine-delivery guideline do not necessarily apply in a disaster | smoother emergency pharmaceutical transport |
| **MLIT (国交省)** | **Clarified that 132条の92 "search, rescue and other urgent matters" covers supply transport, survey/inspection of dangerous locations, and post-evacuation housing monitoring** | improved predictability of disaster drone use |
| MIC (総務省) | Expanded the 5 GHz WLAN band available to drones | improved operability |
| Cabinet Office (防災) / **FDMA (消防庁)** | Notice requesting local governments to position drones in their regional disaster plans; **防災基本計画 amended so that local governments secure UAS transport means and FDMA supports them**; FDMA notice "地方公共団体の防災部局における災害対応ドローンの活用について" specifying support measures | concrete national policy for public-sector drone use |

The **防災基本計画 was revised 2024-06-28** to specify the use of drones for
damage assessment and relief-supply transport
[能登半島地震でドローン支援を統括、JUIDAが見た成果と課題, Drone Journal (Impress), 2024, https://drone-journal.impress.co.jp/docs/special/1185961.html].

JUIDA's own four recommendations to government were: modify the operation of
the Disaster Relief Act's "rescue items" to promote drone use; make private-sector
technology sustainably usable; **promote drone operational coordination capacity
at the basic-municipality level**; and have the public sector support a private
disaster-response drone organisation. JUIDA committed to prefectural disaster
agreements (starting with Ōita, June 2024), a **"ドローン防災マネージャー" training
programme**, and a standing private disaster-response drone organisation
[JUIDA, 2024-09-04, ibid.].

**That "ドローン防災マネージャー" training programme is a direct competitor and a
direct partner candidate for the S14 product line. S14 must look at it.**

---

## 4. EU — for comparison and for the cascade argument

### 4.1 Structure

Regulation (EU) 2019/947 sorts operations into **open**, **specific** and
**certified** categories. The specific category is governed by the **Specific
Operations Risk Assessment (SORA)**, developed by **JARUS**.

### 4.2 SORA 2.5 is now the operative version — this is a 2025 change

**EASA incorporated SORA 2.5 into the AMC & GM to Regulation (EU) 2019/947 by
ED Decision 2025/018/R, published 2025-09-29.** It became immediately applicable
across the EU, with member states permitted a transition of up to six months
during which SORA 2.0 applications are still accepted; authorisations granted
under SORA 2.0 in that window remain valid for up to two years
[ED Decision 2025/018/R, EASA, 2025, https://easa.europa.eu/en/document-library/agency-decisions/ed-decision-2025018r];
[EASA publishes SORA 2.5 implementation guidance, Unmanned Airspace, 2025, https://www.unmannedairspace.info/latest-news-and-information/easa-publishes-sora-2-5-implementation-guidance/].

The consolidated text is carried in the **Easy Access Rules for Unmanned
Aircraft Systems, revision of June 2026**
[Easy Access Rules for Unmanned Aircraft Systems — Revision from June 2026, EASA, 2026, https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-unmanned-aircraft-systems-regulations-eu].

**Any project material citing SORA 2.0 as current is out of date as of
2025-09-29.**

### 4.3 What SORA 2.5 requires

The method assigns a **Specific Assurance and Integrity Level (SAIL), I to VI**,
from the final Ground Risk Class and residual Air Risk Class; the SAIL then
determines which of **17 Operational Safety Objectives (OSOs)** must be met and
at what robustness
[JARUS guidelines on SORA, Edition 2.5, Main Body (JAR_doc_25), JARUS, 2024-06, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Main-Body-Release-JAR_doc_25.pdf].
The OSO count was reduced from 24 to 17 by merging redundancies
[EASA publishes SORA 2.5 implementation guidance, Unmanned Airspace, 2025, https://www.unmannedairspace.info/latest-news-and-information/easa-publishes-sora-2-5-implementation-guidance/].

Robustness = integrity × **level of assurance**, where assurance is graded:
**Low** = applicant declaration; **Medium** = supporting evidence, typically by
testing, analysis, **simulation**, inspection, design review or operational
experience; **High** = verification by the competent authority
[JARUS guidelines on SORA Annex E, Edition 2.5 (JAR_doc_28), JARUS, 2024-06, http://jarus-rpas.org/wp-content/uploads/2024/06/SORA-v2.5-Annex-E-Release.JAR_doc_28pdf.pdf].

The learned-component and simulation implications of Annex E are in **V3 §4–5**
and they are the most consequential findings in this session.

### 4.4 U-space

U-space (Regulation (EU) 2021/664 and companions) provides a service-based
airspace framework. I did not research it to depth this session; the reason is
that it is **not on the critical path for a confined-space, low-altitude, inside-
a-collapsed-structure operation**, which is largely below and inside the
structures U-space arbitrates over. Flagged as a deliberate scope decision, not
an omission. `[UNVERIFIED]` for anything downstream may want about U-space
disaster provisions.

---

## 5. Cascade regions

Covered in **V7**. Summary position for this file: no cascade region examined
has a disaster-specific UAS exemption comparable to 航空法132条の92, and in the
absence of a domestic regime the governing instruments are host-nation
permission plus the humanitarian coordination architecture — again see V7.

---

## 6. Constraints this thread generates

Numbered for reuse in §C6 (drafted in V0-summary).

1. **We are never the disaster operator.** Every field-deployment claim must
   name a public-body operator or a standing agreement with one. Any deck slide
   showing our system flying a disaster site without naming the commissioning
   authority is unsupportable.
2. **An unconditional operator override is mandatory, at the airspace layer as
   well as the assurance layer.** Cease-and-separate on visual acquisition of a
   manned aircraft is a legal duty of the crew; the policy must be
   interruptible within human reaction time.
3. **Emergency Use Airspace is a hard exclusion for anyone outside the
   exemption.** Prior permissions do not survive it.
4. **The urgency test forecloses "routine" disaster operations under the
   exemption.** Anything plannable must be filed normally.
5. **Level 4 is not a plan.** One type certificate and four airworthiness
   certificates existed nationally as at 2023-03-15. Design for Category II /
   Level 3–3.5 class operations and for operation under a public body's
   exemption; treat Level 4 as a long-horizon option.
6. **Two licences, not one.** MLIT remote-pilot skill certificate plus a MIC
   radio operator qualification (第三級陸上特殊無線技士) for the bands a
   professional SAR link uses.
7. **SORA 2.5, not 2.0**, is the EU baseline as of 2025-09-29.

---

## 7. Open items

- 2026 counts of 型式認証 / 機体認証 / 一等・二等 licences. `[UNVERIFIED]`
- Whether any prefecture has yet published a standing 132条の92 commissioning
  framework a private party can apply to join, versus ad hoc agreements.
  **High value for V5 and for S14.** Not found.
- Whether FOCS ingests unmanned aircraft tracks or only manned. Not found;
  the 防災基本計画 text places UAS in the coordination team's remit but names FOCS
  in the aircraft sentence. `[UNVERIFIED]`
- U-space disaster/emergency provisions. Not researched.
- Number and typical duration of 緊急用務空域 designations in a major event. Not
  found.
