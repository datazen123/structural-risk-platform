# V7 — Cascade-region reality

**Session:** S12. **Date:** 2026-09-08.

**Scope note.** S12 began before S01/R1 delivered its cascade shortlist, so §2
was originally researched against a provisional set. **R1 landed during this
session** with the ranked shortlist **Indonesia (1), Philippines (2), Morocco
(3), Ethiopia (4), Nigeria (5)**. §2 has been revised to lead with that set;
**Türkiye, Nepal and Kenya are retained in §2B** because they were researched,
because ADR-003 names Türkiye, and because Kenya produces a finding (operator
nationality restriction) that generalises.

The **structural** findings in §4–§6 are region-independent and survive any
change of list.

---

## 1. Headline answer — the transferability question ADR-003 needs

**A policy validated in Japan carries essentially zero regulatory weight in a
cascade region. Each region restarts from zero. The cascade transfers
methodology, SOPs and the trained artefact — not certification.**

The reasoning is structural, not a matter of any one country's rules:

1. **There is no mutual recognition of UAS approvals between Japan and any
   cascade region examined.** Japan's 機体認証 / 型式認証 and 技能証明 are domestic
   instruments under the Civil Aeronautics Act. Nothing in them is recognised by
   DGCA Indonesia, CAAP, SHGM, CAAN or KCAA.
2. **The thing being transferred is not a certified artefact anyway.** V3
   establishes that a learned policy is fieldable only inside a containment
   envelope, and that the assurance evidence attaches to *an operation* (SORA) or
   *a product type* (EASA/Part 21), not to a policy in the abstract. **There is
   no object called "a certified navigation policy" to carry across a border.**
3. **What *does* travel is standards-shaped, not approval-shaped:** ISO 21384-3
   operational procedures, ISO/IEC TR 5469 architecture patterns, the
   NIST/ASTM/DECISIVE test-method vocabulary, and the Humanitarian UAV Code of
   Conduct. All are international, none confer approval, and all are things a
   cascade-region authority can *read*.

**S10's deck must say this precisely.** The claim is: *"we transfer a
methodology, a benchmark vocabulary, an SOP and a trained artefact; each region's
authority remains the approving body, and we have designed so that the evidence
package can be re-presented rather than re-created."* Not: *"validated in Japan,
deployable in the cascade."* The second sentence is false and an aviation
regulator in any of these countries would know it within one question.

**One important asymmetry in our favour**, which is the honest good news: the
regions with the weakest UAS frameworks also have the **lowest** evidentiary
bars in practice. The gate in a low-capacity jurisdiction is rarely a
certification standard — it is host-nation permission, import clearance and
coordination. That is a *relationship* problem, which the project can address,
rather than an *assurance* problem, which takes years.

---

## 2. Regional survey

Sources for this section are, with the exception of the Kenyan statute, mostly
**secondary** (law-firm summaries, aviation-authority portals, industry
trackers). They are adequate to establish *whether a framework exists and of
what shape*; they are **not adequate for operational planning** and every entry
should be re-verified against the authority's own text before use.

### 2.0 The finding that dominates §2

**Three of R1's five shortlisted regions restrict or block the *import and
possession* of drones, independently of any flight rule.** Morocco prohibits
importation, possession and use in principle; Ethiopia's directive was written
specifically to control importation; Nigeria's regulator has stated that no
drone is certified for use in the country.

**This inverts the usual analysis.** The project has been reasoning about
airspace and certification. In the cascade regions the first gate is customs,
and it can be absolute. A trained navigation policy is software and may travel;
**the aircraft it runs on may not be lawfully importable at all.** Combined with
the unresolved Japanese export-control exposure (V5 §6), the cascade's hardware
leg is the least examined and most likely to fail of any part of the thesis.

---

## 2A. The R1 shortlist

### 2.1 Indonesia — R1 rank 1

- Primary instrument: **Ministry of Transportation Regulation PM 37/2020**,
  governing all UAV operations in Indonesian airspace — altitude limits,
  controlled airspace, pilot certification
  [Regulasi Drone: PM 37/2020, Terra Drone Indonesia, n.d., https://terra-drone.co.id/regulasi-drone-pm-37-2020/].
- Recreational <2 kg: uncontrolled airspace, ≤120 m, VLOS, daylight. Commercial
  operation requires an **Indonesian Remote Pilot Certificate**
  [Drone Laws in Indonesia, Dronesgator, 2026, https://dronesgator.com/drone-laws-in-indonesia].
- **Framework: present. BVLOS/confined-space/disaster provisions: not
  established.** `[UNVERIFIED]`

### 2.2 Philippines — R1 rank 2

- Primary instrument: **Philippine Civil Aviation Regulations (PCAR) Part 11**,
  administered by **CAAP**
  [RPAS Regulations, Civil Aviation Authority of the Philippines, n.d., https://www.caap.gov.ph/rpas-regulations/].
- Commercial operation, or recreational operation of drones **≥7 kg**, requires a
  CAAP **Remote Pilot Licence (RPL)** — training, knowledge exam, practical test,
  **5-year validity**
  [Philippines Drone Laws 2026, drone-laws.com, 2026, https://drone-laws.com/drone-laws-in-the-philippines/].
- **Notable:** the Philippines is the only cascade candidate surveyed with a
  *practical test* in its licensing structure, which makes it the one where V6's
  screening product has a comparable hook.

### 2.3 Morocco — R1 rank 3. **The hardest finding in this file.**

- **Drone operations are reported as not regulated by the DGAC**; the Directorate
  General of Civil Aviation, under the Ministry of Equipment, Transport,
  Logistics and Water, sets and enforces rules and grants permissions
  [Morocco Drone Laws 2026, drone-laws.com, 2026, https://drone-laws.com/drone-laws-in-morocco/].
- **Critically: the importation, possession and use of drones are, in principle,
  prohibited throughout the national territory**, under a measure implemented in
  **2015 by a statement from the Head of Government**, to mitigate security risks
  and infringement of citizens' property and privacy
  [Drone legislation in Morocco: What you need to know, Drone & Cam, n.d., https://droneandcam.com/en/post/drone-legislation-in-morocco-what-you-need-to-know/];
  [Drone Laws in Morocco, UAV Coach, 2023, https://uavcoach.com/drone-laws-in-morocco/].
  Case-by-case authorisation exists in practice (film-permit intermediaries
  operate) but the default is prohibition.
- **R1 selected Morocco for the Al Haouz 2023 corpus and its rural stone/earth
  masonry typology — a data region, not a player region.** That selection is
  unaffected by this finding: **we can ingest Moroccan collapse data without
  flying anything there.**
- **But any Morocco *deployment* narrative is unsupportable.** A default national
  prohibition on importation and possession is a categorically different obstacle
  from a licensing regime, and S10 must not list Morocco as a deployment
  cascade target.
  Primary-source verification of the 2015 measure and its current status is
  `[UNVERIFIED]` — **it is important enough to verify properly.**

### 2.4 Ethiopia — R1 rank 4

- The **Ethiopian Civil Aviation Authority (ECAA)** finalised a remotely piloted
  aircraft directive after roughly **seven years in development**, enabling it to
  control **importation and operations**, covering permits for importation and
  manufacture, use and operation, altitude and permitted public places, and
  privacy and security
  [New Regulation Comes To Light To Govern Drone Operation, Imports, The Reporter Ethiopia, n.d., https://www.thereporterethiopia.com/28031/];
  [Ethiopia launches drone legislation and registration programme to support UAS operations, Unmanned Airspace, n.d., https://www.unmannedairspace.info/emerging-regulations/ethiopia-launches-drone-legislation-and-registration-programme-to-support-uas-operations/].
- Directive number, enactment date and current text **not established**
  `[UNVERIFIED]`.
- **Reading:** a framework now exists where none did, and it is import-focused.
  R1 selects Ethiopia as **the strategic player region** (largest reachable East
  African youth cohort). **That role is unaffected** — playing a game is not a
  drone operation. Only a hardware deployment story would be gated.

### 2.5 Nigeria — R1 rank 5

- **Part 21 of the Nigeria Civil Aviation Regulations 2023** governs Remotely
  Piloted Aircraft Systems; operators must hold a **remote pilot licence**,
  issuable from age **16** on passing the stipulated tests
  [Regulation of Drone Use in Nigeria: The Road Ahead, Templars ThoughtLab, 2025, https://www.templars-law.com/app/uploads/2025/07/Regulation-of-Drone-Use-in-Nigeria.pdf];
  [Remotely Piloted Aircraft System Certification Services, Nigeria Civil Aviation Authority, n.d., https://ncaa.gov.ng/services/airworthiness/remotely-piloted-aircraft-system-certification-services/].
- **The NCAA has publicly stated that no drone is certified for use in Nigeria**
  [NCAA says no drone certified for use in Nigeria, The Guardian Nigeria, n.d., https://guardian.ng/business-services/aviation-business/ncaa-says-no-drone-certified-for-use-in-nigeria/];
  [No drone is certified to operate in Nigeria – NCAA, Daily Trust, n.d., https://dailytrust.com/no-drone-is-certified-to-operate-in-nigeria-ncaa/].
  Date and current status `[UNVERIFIED]`; it may since have changed.
- R1 classifies Nigeria as a **player and survey-mode region, not a SAR-data
  region** (low seismic hazard). **That classification survives this finding
  intact** — and the finding reinforces it.

---

## 2B. Adjacent regions researched (not on the R1 shortlist)

Retained because ADR-003 names Türkiye, because Nepal supplies the clearest
documented humanitarian-coordination precedent, and because Kenya's operator
nationality restriction generalises to a structural constraint (§6.3).

### 2.6 Türkiye

- Primary instrument: **SHT-İHA (Unmanned Aircraft System Instruction)**,
  administered by **SHGM (Directorate General of Civil Aviation)**, covering
  registration, importation, operations, pilot authorisations, manufacturer and
  importer responsibilities, and inspection
  [Türk Sivil Havacılık Hukukunda Drone (İHA) Mevzuatı, Kılınç Law & Consulting, n.d., https://kilinclaw.com.tr/turk-hukukunda-drone-iha-mevzuat-shgm/].
- Registration required for systems **≥500 g** in the SHGM İHA Kayıt Sistemi;
  flight permits required outside free-flight zones
  [SHGM İHA Kayıt Sistemi, SHGM, n.d., https://iha.shgm.gov.tr/public/index?language=2].
- A revised instruction is reported to have entered into force, described as
  affecting "90,000 drones and 2 million pilots", and an İHA tracking system
  (İHATTYS) is reported as forthcoming
  [SHGM'den İHA düzenlemesinde yeni dönem, AeroNews24, n.d., https://www.aeronews24.com/shgmden-iha-duzenlemesinde-yeni-donem-90-bin-drone-ve-2-milyon-pilotu-ilgilendiren-talimat-yururluge-girdi];
  [SHGM İHA Takip Sistemi Geliyor, droneegitimi.com, n.d., https://droneegitimi.com/blog/shgm-iha-takip-sistemi-ihattys].
  Dates and instruction numbers **not established** `[UNVERIFIED]`.
- **Türkiye has the most developed framework of any region surveyed, plus the
  2023 Kahramanmaraş collapse corpus ADR-003 names — and R1 did not shortlist
  it.** It is arguably not a "cascade" region in the sensor-poor sense; it is a
  second seed. **Flag back to S01/R1 as a classification question.**

### 2.7 Nepal

- **CAAN** classifies by all-up weight: micro (<250 g), mini (250 g–2 kg),
  standard (>2 kg); as of 2026 **every drone is expected to be registered
  regardless of weight**; maximum 120 m AGL, above which explicit CAAN approval
  is required
  [Nepal Drone Regulations 2025 — Complete CAAN Guide, GarudX, 2025, https://garudx.com/blog/nepal-drone-regulations-caan-2025];
  [Nepal Drone Laws 2026, drone-laws.com, 2026, https://drone-laws.com/drone-laws-in-nepal/].
- **Historical precedent of direct relevance:** in the April/May 2015
  earthquakes "an unprecedented number of UAVs were used", and **UN OCHA
  encouraged UAV teams to coordinate through the Humanitarian UAV Network**
  [CHAPTER 6: UAVs and Humanitarian Response, New America, n.d., http://drones.newamerica.org/primer/Chapter%206.pdf].
  That is the clearest documented instance of §4's mechanism operating.

### 2.8 Kenya

- Primary instrument: **The Civil Aviation (Unmanned Aircraft Systems)
  Regulations, 2020** (Legal Notice 42 of 2020), in force from 2020-04-03 — a
  full statutory instrument, not guidance
  [The Civil Aviation (Unmanned Aircraft Systems) Regulations, 2020, Kenya Law, 2020, https://new.kenyalaw.org/akn/ke/act/ln/2020/42/eng@2020-04-03];
  [Unmanned Aircraft Systems (Drones), Kenya Civil Aviation Authority, n.d., https://www.kcaa.or.ke/safety-security-oversight/unmanned-aircraft-systems].
- Ownership/operation restricted to Kenyan citizens or residents aged ≥18, under
  licence; **Remote Pilot Licence required for categories B and C**; 5 km airport
  exclusion without special permission
  [Kenya Passes Significant Unmanned Aircraft (Drones) Legislation, DLA Piper Africa / IKM Advocates, 2020, https://www.dlapiperafrica.com/en/kenya/insights/2020/Kenya-Passes-Significant-Unmanned-Aircraft-Drones-Legislation.html].
- **The citizenship/residency restriction is a material finding** and the kind of
  provision that quietly blocks a foreign-operator model. Where a comparable
  restriction exists, our only lawful presence is **through a local operator** —
  which happens to be the same conclusion as Japan's (V2 §3.2), reached by a
  completely different route.

### 2.9 What no cascade region has

Across all eight regions surveyed: **I found no disaster-specific UAS exemption comparable to
Japan's 航空法132条の92**, and no published emergency-response drone doctrine
equivalent to Japan's 防災基本計画 §4-4 air operations coordination provisions.
`[UNVERIFIED]` in the sense that absence of evidence here is weak evidence of
absence — but the search did not surface one, and the humanitarian literature's
emphasis on ad hoc coordination (§4) suggests the gap is real.

**Japan is therefore not a representative seed for the airspace question.** It
is unusually *well* provisioned. Anything the project learns about disaster
airspace in Japan generalises poorly outward, and the deck must not imply
otherwise.

---

## 3. Import and hardware movement

**Upgraded from "flagged" to "primary finding" by §2.0.** Three of R1's five
shortlisted regions gate at the border: **Morocco** prohibits importation and
possession in principle (§2.3); **Ethiopia's** directive was written to control
importation (§2.4); **Nigeria's** regulator states no drone is certified for use
(§2.5). Türkiye's instruction likewise covers importation and importer
responsibilities (§2.6).

**Import control, not airspace law, is the first gate in the cascade.** No
project document currently acknowledges this.

Interacts with **V5 §6 (export control)**: our exposure is symmetric — Japanese
export control on the way out, host-nation import control on the way in, and the
autonomy software is potentially caught by both. `[UNVERIFIED]` — **unowned and
should not stay that way.**

---

## 4. What governs where regulation is absent or overwhelmed

Three layers, in the order they actually bind.

**Layer 1 — host-nation permission.** In every framework surveyed, the state
retains approval authority and, in Kenya's case, restricts operator eligibility
by nationality/residency. There is no humanitarian override of national aviation
law. An international responder flies because the host state permits it.

**Layer 2 — humanitarian coordination.** The **Humanitarian UAV Code of Conduct**
was launched by the **Humanitarian UAV Network (UAViators) in 2014**, reviewed by
UN OCHA, WFP, UNHCR, DPKO, ICRC, ECHO and the American Red Cross among others,
and revised by **more than 60 organisations** across multi-stakeholder
consultations over two years; guidelines were produced on four priority areas —
**data ethics, community engagement, effective partnerships, conflict
sensitivity**. An updated Code was launched in **2020** with online training on
disaster-response drone use and community engagement, and in **2021** a digital
solution for **rapid drone coordination and authorization for disaster
response** was launched
[Humanitarian Drone Code of Conduct, WeRobotics, n.d., https://werobotics.org/blog/humanitarian-code-of-conduct];
[Humanitarian UAV Code of Conduct, uavcode.org, n.d., https://uavcode.org/].

**Note the "data ethics" pillar.** It is the international humanitarian sector's
own instrument on exactly the question ADR-004 and V3 §6 wrestle with. If the
project wants an *international, non-regulatory* legitimacy anchor for its data
governance, this is it, and adopting the Code publicly is cheap and defensible.
**Recommend S11 evaluate formal adoption.**

**Layer 3 — the UN coordination architecture.** UN OCHA encouraged UAV teams in
the 2015 Nepal response to coordinate through the Humanitarian UAV Network
[CHAPTER 6: UAVs and Humanitarian Response, New America, n.d., http://drones.newamerica.org/primer/Chapter%206.pdf].
INSARAG's OSOCC/Virtual OSOCC architecture is the standing mechanism for
international USAR coordination — **not verified in detail this session**
`[UNVERIFIED]`, and see V5 §4 for the finding that INSARAG classification does
not appear to standardise UAS capability.

**Synthesis:** in a cascade region the governing instruments are, in practice,
*host-nation permission* + *a voluntary code of conduct* + *an ad hoc
coordination cell*. That is a materially weaker structure than Japan's, and it
means **our SOP and our data-governance posture are the substitute for the
regulation that isn't there.** That is a real contribution and it should be
positioned as one.

---

## 5. What actually transfers — the ADR-003 answer, itemised

| Asset | Transfers? | Why |
|---|---|---|
| Japanese 機体認証 / 型式認証 | **No** | Domestic instrument; no mutual recognition found |
| Japanese 技能証明 | **No** | Same |
| A "certified navigation policy" | **No — the object does not exist** | Assurance attaches to an operation or a type, not to a policy (V3) |
| **Benchmark results in DECISIVE / NIST-ASTM vocabulary** | **Yes** | International vocabulary; readable by any technical authority (V1) |
| **The containment architecture** (policy + monitor + independent fallback) | **Yes** | It is the pattern ISO/IEC TR 5469 and SORA both describe (V3) |
| **SOPs and the operational-procedures framing** | **Yes** | ISO 21384-3:2023 is an international standard (V5 §2.4) |
| **Data-governance posture** | **Yes, and it is an asset** | Humanitarian UAV Code of Conduct is the international peg (§4) |
| **The trained artefact itself** | **Yes, subject to export control** | The unresolved risk in V5 §6 |
| **The aircraft it runs on** | **Often no** | Import prohibition or absence of any certified airframe in 3 of 5 shortlisted regions (§2.0, §3) |
| **The game and the player population** | **Yes — and this is the actual cascade** | C1's reach constraint puts the players *in* the cascade regions already |

That last row deserves emphasis because it is the project's real transferability
story and it is not a regulatory story at all. **ADR-003's inversion — that the
people generating the ingenuity are the people it protects — is unaffected by
any finding in this file.** The regulatory non-portability constrains the
*deployment* arrow, not the *data* arrow.

---

## 6. Constraints this thread generates

1. **State regional non-portability explicitly and everywhere.** Validation in
   Japan confers no regulatory standing elsewhere. S10 must say this in the
   deck, not in a footnote — an audience that catches us implying otherwise
   discounts everything else.
2. **Design the evidence package for re-presentation, not re-creation.** Since
   each authority restarts, the marginal cost of region *n+1* should be
   assembling existing artefacts, not generating new ones. Concretely: keep
   benchmark results in an international vocabulary (V1), keep the containment
   architecture separable from the platform, keep SOPs in ISO 21384-3 shape.
3. **Assume a local operator is mandatory.** Kenya restricts by
   citizenship/residency; Japan restricts by public-body commissioning. Two very
   different regimes, same operational conclusion. Build for it.
3a. **Never present Morocco, Ethiopia or Nigeria as deployment targets.** R1
   selects them as a data region and two player regions respectively, and those
   roles are unaffected — but each gates hardware at the border. Keep the *data
   and player* cascade rigorously separate from the *deployment* cascade in
   every document. They are not the same list.
4. **Adopt the Humanitarian UAV Code of Conduct.** Cheap, international,
   directly addresses the data-ethics question, and gives S11 an external anchor.
5. **Resolve import/export control before the cascade claim ships** (V5 §6, §3
   here).
6. **Re-run this thread against S01/R1's actual shortlist.**

---

## 7. Open items

- **Primary-source verification of Morocco's 2015 import/possession
  prohibition and its current status.** The single most consequential unverified
  claim in this file.
- Ethiopia's ECAA directive: number, enactment date, current text.
- Whether the NCAA's "no drone certified" position still holds.
- Whether Türkiye should be classified as a second seed rather than a cascade
  region (§2.6), given R1 did not shortlist it.
- Primary-source verification of every regional entry in §2 — all but Kenya rest
  on secondary sources.
- Import control regimes per region, properly sourced (now a primary question,
  not a footnote).
- Whether any surveyed region has a disaster-specific UAS exemption. Searched,
  not found, weakly evidenced.
- Import control regimes per region.
- INSARAG OSOCC / Virtual OSOCC coordination detail.
- Spectrum/radio licensing per cascade region — **not researched at all**, and
  it is a hard blocker in practice (Japan alone requires a separate MIC operator
  qualification, V2 §2.5). Every region will have its own.
- Whether the 2021 "digital solution for rapid drone coordination and
  authorization for disaster response" (§4) is operational and what it is. If it
  works, it is the coordination layer a cascade deployment would plug into.
