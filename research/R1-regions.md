# R1 — Regional prioritization

**Session:** S01 (research). **Date:** 2026-09-08.
**Status:** first pass. Every non-obvious claim carries an inline source.
Unverified items are marked `[UNVERIFIED]` and must stay marked downstream.

---

## 1. Where the mortality actually is, and what causes it

### 1.1 Concentration by region

- Over 1998–2017, disasters killed ~1.3 million people; **563 earthquakes and
  related tsunamis account for 56% of that total (747,234 deaths)** — the single
  largest killer category in the period
  [Economic Losses, Poverty & Disasters 1998–2017, UNDRR/CRED, 2018,
  https://www.undrr.org/news/un-20-year-review-earthquakes-and-tsunamis-kill-more-people-while-climate-change-driving].
- Asia carried ~58.6% of natural-disaster fatalities in 2024
  [EM-DAT / CRED annual reporting, 2024–2025, https://www.emdat.be/].
- Since 1900, twelve earthquakes have killed ≥50,000 people in a single event;
  **five of those twelve occurred in 2000 or later** — including
  Kahramanmaraş 2023 (>50,000 in Türkiye, ~8,700 in NW Syria), where the
  mechanism was mass collapse of vulnerable multi-storey buildings
  [Earthquakes resource page, Center for Disaster Philanthropy, 2024,
  https://disasterphilanthropy.org/cdp-resource/earthquakes/].

**Read:** the loss is concentrated in Asia and the eastern Mediterranean /
Anatolian belt, and it is increasingly a *single-event, urban, multi-storey
collapse* phenomenon rather than a diffuse one.

### 1.2 Concentration by hazard or by building stock?

The literature is unusually clear here, and it favours **building stock**.

- Ambraseys & Bilham found that **83% of all deaths from building collapse in
  earthquakes over the preceding 30 years occurred in countries that are
  anomalously corrupt** relative to their per-capita income
  [Corruption kills, Ambraseys & Bilham, *Nature* 469:153–155, 2011,
  https://www.nature.com/articles/469153a].
- Cross-country econometric work reaches the same conclusion from a different
  direction: fatalities track institutional quality and construction practice,
  not shaking intensity alone
  ["Earthquakes don't kill, built environment does", *Economic Modelling*, 2018,
  https://www.sciencedirect.com/science/article/abs/pii/S0264999317312579].

**Consequence for this project.** The variable that determines whether a person
survives is the *geometry and failure mode of the structure that fell on them* —
pancake collapse, soft-storey, unreinforced masonry rubble — far more than the
seismology. That is fortunate: it means the procedural generator should be
parameterised by **construction typology and collapse mechanism**, not by
seismic source model. It also means the seed corpus must include
non-code-compliant building stock, which Japan largely does not have.
**This is a real limitation of the Japan-seed decision and is not recorded in
ADR-003.** See §4.

---

## 2. Sensor and response-unit density vs. mortality — quantifying ADR-003's gap

ADR-003 asserts a gap between where the data is and where the deaths are.
It is real, and it can be quantified crudely, but **not with a single clean
published index — no source found that directly ratios SAR units to exposed
population by country.** Treat the following as a constructed argument, and the
composite ratio as `[UNVERIFIED]`.

| Proxy | Data-rich seed (Japan) | Cascade candidate |
|---|---|---|
| National LiDAR / DEM | GSI + G-空間情報センター airborne LiDAR, sub-metre in places (§3) | Indonesia DEMNAS 0.27 arc-sec (~8 m) national mosaic [BIG, 2018, https://www.big.go.id/en/content/product/demnas] |
| National seismic hazard model | J-SHIS, public API, mesh-level [NIED, https://www.j-shis.bosai.go.jp/en/] | Global fallback only (GEM) for most of Africa |
| International USAR capacity | JDR; INSARAG-classified teams | Mostly recipient, not provider |
| Best available terrain if nothing local | — | Copernicus DEM GLO-30, 30 m, free licence [ESA/Copernicus, 2021– , https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM] |

The 2023 Türkiye response is the best-documented scale reference: **~5,000
rescuers in 90 INSARAG teams, ~300 lives saved during the life-saving phase** —
the largest INSARAG operation in its 30-year history
[INSARAG After-Action Review, Türkiye 2023, INSARAG/UN OCHA, 2024,
https://insarag.org/wp-content/uploads/2024/04/After-Action-Analysis-and-Recommendations-for-INSARAG-Turkiye-2023.pdf].

Set 300 lives against >50,000 deaths and the ratio is the argument for the whole
project — **and also a caution.** The binding constraint in Türkiye was not
sensing; it was time, access and sheer volume of collapsed structures. A better
nav policy helps at the margin of an already tiny margin. Say that honestly in
the deck rather than implying robots would have changed the order of magnitude.

---

## 3. Seed region (Japan): what is actually downloadable

| Source | Content | Resolution | Licence | Date |
|---|---|---|---|---|
| GSI (国土地理院) tiles, 基盤地図情報 | Topographic base map, DEM, aerial photography, admin layers | 5 m / 10 m DEM nationwide; finer locally | GSI Website Terms of Use v2.0, **compatible with CC BY 4.0**, attribution required [https://www.gsi.go.jp/ENGLISH/page_e30286.html] | current |
| G-空間情報センター (G-Spatial Information Center) | Aggregator; hosts prefectural **airborne LiDAR**, incl. pre-event Noto 2020 LiDAR | varies, point-cloud grade | per-dataset; **not uniformly open** — must be checked dataset by dataset `[UNVERIFIED]` | current |
| NIED J-SHIS | National seismic hazard maps, mesh hazard info; **public Web API in XML/GML/JSON/GeoJSON** | ~250 m mesh | Public API; the OpenQuake-converted model (v2021.0.0 / v2025.0.0) requires a **licence request** from NIED, terms depending on use case [https://www.j-shis.bosai.go.jp/en/, https://www.globalquakemodel.org/product/japan-hazard] | v2025.0.0 current |
| GSI ALOS-2 InSAR products (Noto 2024) | Coseismic deformation, coastline change | — | GSI terms [https://www.gsi.go.jp/uchusokuchi/20240101noto_insar-e.html] | 2024 |
| Noto 2024 building-damage dataset | Multi-source visual damage assessment, per-building | building level | Published in ESSD, open; mirrored on Zenodo [https://essd.copernicus.org/articles/17/5259/2025/, https://zenodo.org/records/15192949] | 2025 |
| Post-event Noto LiDAR | Post-earthquake airborne LiDAR | high | **Provided by Nakanihon Air Service Inc. and Ishikawa Prefecture — commercial/agency provenance, not open by default** [Airborne LiDAR for post-disaster recovery in Japan, *GeoHorizons*, 2025, https://www.lyellcollection.org/doi/full/10.1144/gh2025-10] | 2024–25 |

### 3.1 The hole in the middle of the seed decision

**Every dataset above is exterior or top-down.** DEMs, footprints, damage
grades, deformation fields, even airborne LiDAR point clouds describe the
*outside* of a collapsed structure and the terrain around it.

The game's premise — navigating *voids inside a rubble pile* — requires
**interior collapse geometry, which none of these datasets contain.**

No open corpus of post-collapse interior void geometry was found for any
earthquake, anywhere. `[UNVERIFIED — absence of evidence; a targeted search of
RoboCup Rescue and NIST USAR test-fixture geometry may find synthetic
equivalents, which S12 is separately looking at.]`

This does not kill the approach, but it changes what the procgen pipeline
honestly *is*: real data constrains the **envelope** (terrain, footprint,
storey count, typology, damage grade), and the **interior voids are simulated
from a structural collapse model**, not observed. ADR-003 and any investor
material must say that in those words. Claiming levels are "derived from real
collapse topography" without that qualification is the kind of overclaim that
loses a technical room permanently.

---

## 4. Cascade regions: the worst input tier we must accept

ADR-003 requirement 1 needs a concrete floor. Here it is.

### 4.1 The global fallback stack (available for essentially every land pixel)

| Layer | Product | Resolution | Licence | Date |
|---|---|---|---|---|
| Terrain | **Copernicus DEM GLO-30** | 30 m global | free and open licence | 2021 release, 2024_1 revision [https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_DEM_GLO30_2024_1] |
| Buildings | **Google Open Buildings V3** — 1.8bn detections across Africa, S/SE Asia, LatAm & Caribbean, inferred May 2023 | footprint polygons | **CC BY 4.0 or ODbL 1.0** [https://sites.research.google/gr/open-buildings/] | 2023 |
| Buildings | **Microsoft GlobalMLBuildingFootprints** — 1.2bn+ global, 500m+ in Africa | footprint polygons | **CDLA-Permissive-2.0 or ODbL** [https://github.com/microsoft/GlobalMLBuildingFootprints] | rolling |
| Buildings/roads | OpenStreetMap | variable, urban-biased | **ODbL** | rolling |
| Post-event imagery | **Copernicus EMS Rapid Mapping** — earthquake products delivered in hours–days, publicly downloadable | vector damage grading | free [https://mapping.emergency.copernicus.eu/about/rapid-mapping-portfolio/] | on activation |
| Post-event imagery | **Maxar (Vantor) Open Data Program** | 30–50 cm | **CC BY-NC 4.0 — NON-COMMERCIAL** [https://registry.opendata.aws/maxar-open-data/] | on activation |

### 4.2 Two licence findings that need an ADR

1. **Maxar Open Data is CC BY-NC 4.0.** A commercially funded platform cannot
   ship level packs derived from it. It is fine for a research paper and fatal
   for the product. Nothing in the repo currently records this.
2. **ODbL is share-alike on derived databases.** Level packs generated from
   OSM / Open Buildings-under-ODbL may themselves be a "derived database",
   which would oblige us to publish them under ODbL. Google Open Buildings is
   dual-licensed and **CC BY 4.0 is the branch to take**; Microsoft's
   CDLA-Permissive-2.0 branch is likewise the safe one. This needs counsel, not
   a research file. `[UNVERIFIED — legal characterisation, not a factual claim.]`

### 4.3 Candidate cascade regions, ranked

Ranking criterion: (mortality exposure × player-population reachability ×
data floor achievable) ÷ (institutional friction).

| # | Region | Why | Worst input tier we must accept | Player-side |
|---|---|---|---|---|
| 1 | **Indonesia** | High seismic mortality, dense urban informal stock, national geospatial agency with a public product | **DEMNAS ~8 m national DEM** [BIG, 2018] + Open Buildings + OSM — *better than the global floor*, so it is a good second seed, not a stress test | Large young smartphone population; SE Asian mobile-gaming market is mature |
| 2 | **Philippines** | Seismic + typhoon; strong national LiDAR history (Phil-LiDAR / DREAM programmes) `[UNVERIFIED — current public availability and licence of Phil-LiDAR archives not confirmed this session]` | national LiDAR where it exists, global floor elsewhere | Very high mobile-gaming engagement `[UNVERIFIED]` |
| 3 | **Morocco** (Al Haouz 2023 as corpus) | Rural stone/earth masonry — a construction typology absent from Japan and central to global mortality | **Global floor only**: Copernicus GLO-30 + Open Buildings + Copernicus EMS activation products | Modest; a data region more than a player region |
| 4 | **Ethiopia** | Largest single reachable youth cohort in East Africa; 97m smartphone connections forecast by 2030 [GSMA ME SSA 2024] | **Global floor only.** Assume: 30 m DEM, ML-inferred footprints, no storey count, no structural typology | Very large; the strategic player region |
| 5 | **Nigeria** | Largest smartphone market in SSA — 230m connections forecast by 2030 [GSMA ME SSA 2024] | Global floor only; **low seismic hazard**, so it is a *player* region and a *survey-mode* region, not a SAR-data region | Largest in Africa |

**The specification ADR-003 requirement 1 was missing:**

> **Minimum viable input tier (Tier-D, "degraded"):** a 30 m global DEM
> (Copernicus GLO-30), ML-inferred building footprint polygons with no height
> and no typology attribute, an OSM road graph of unknown completeness, and a
> regional seismic hazard value. No storey count, no material, no interior, no
> post-event observation. The generator must produce a playable, honestly
> labelled level from exactly that and nothing more.

Everything above Tier-D is upside. Japan is Tier-A. Indonesia is Tier-B.
Nigeria and Ethiopia are Tier-D. **`provenance.fidelity` should therefore be an
enumerated tier, not a free-form field** — S04 needs this to be enforceable.

### 4.4 The uncomfortable observation about the pitch

The regions with the largest reachable player populations (Nigeria, Ethiopia)
are **not** the regions with the highest earthquake mortality (Indonesia,
Türkiye, Iran, Afghanistan, Nepal, China). The vision doc's inversion —
"the people generating the ingenuity are the people it protects" — is true for
Indonesia and the Philippines and *substantially weaker* for West Africa, where
the reachable population is large and the seismic exposure is low.

The honest framing that survives scrutiny: West African players are protected by
the **preventative survey** mission class (flood, landslide, structural
inspection), not by the SAR mission class. That makes the survey mode
load-bearing for the pitch, not a secondary feature. `docs/00-vision.md` already
argues survey mode is the fundable half; R1 says it is also the *truthful* half
of the inversion claim.

---

## 5. Ranked shortlist, with reasoning

1. **Japan — seed.** Confirmed correct, for the reason ADR-003 gives (data
   quality determines MVP speed) but with a caveat ADR-003 does not state: Japan
   has code-compliant building stock and therefore does **not** contain the
   failure modes that cause most global mortality. Japan seeds *geometry and
   pipeline*; it cannot seed *collapse typology*.
2. **Indonesia — second corpus, first cascade proof.** Real national data
   (DEMNAS), real mortality, informal stock. Proves the pipeline degrades from
   Tier-A to Tier-B gracefully.
3. **Türkiye 2023 — best documented collapse corpus.** ADR-003 rejected it as
   seed on partner-path grounds; that stands. But it is the best available
   source of *modern reinforced-concrete pancake collapse* — the dominant global
   mortality mechanism — and should be an explicit corpus target even if it is
   never a partner region.
4. **Ethiopia / Nigeria — player regions, Tier-D data, survey mission.**
5. **Morocco 2023 — typology corpus** for masonry/earth construction.

---

## 6. Open questions for later sessions

- Does any open corpus of *interior* post-collapse void geometry exist? (§3.1)
- Is a level pack derived from ODbL sources itself a derived database? (§4.2)
- Phil-LiDAR current availability and licence.
- A defensible sensor-density-vs-mortality index. Nothing publishable was found;
  if the deck wants that chart, someone has to build it from ITU/GSMA coverage
  data crossed with EM-DAT mortality, and label it as our own construction.
