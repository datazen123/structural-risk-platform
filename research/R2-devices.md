# R2 — Device & network reality in target regions

**Session:** S01. **Date:** 2026-09-08.
**Priority thread.** This validates or breaks the C1 floor spec. It breaks part
of it.

---

## 0. Headline

The C1 floor spec is **right about the budgets and wrong about the floor
device and the network**. The 200 KB payload, the offline-first architecture
and the no-dependency bundle are all vindicated — but by *affordability and
device cost*, not by 2G radio. The 2G-only population is roughly 4% of humanity,
is disproportionately device-less, and is being switched off. Meanwhile
`Android 5.0 / 1 GB RAM` describes ~1–2% of African web traffic. We are paying
engineering cost to reach a population that is not the market, while the actual
market — 3.1 billion people covered by mobile broadband who do not use it — is
gated by handset price and data price.

---

## 1. Covered vs. connected vs. usable — kept strictly separate

These three numbers are routinely conflated in pitch decks. They are not the
same and the third is much the smallest.

### 1.1 Global, 2025

| Layer | Number | % of world | Source |
|---|---|---|---|
| **Covered** — lives inside a mobile-broadband (3G+) footprint | ~7.8 bn | **96%** | [Facts and Figures 2025 — Mobile network coverage, ITU, 2025-11-17, https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-mobile-network-coverage/] |
| **Not covered** (2G or nothing is the best available) | **~312 m** | 4% | ITU FF25, *ibid.* GSMA independently reports ~300 m / 4% [State of Mobile Internet Connectivity 2025, GSMA Intelligence, 2025, https://www.gsmaintelligence.com/research/the-state-of-mobile-internet-connectivity-2025-trends-in-mobile-internet-connectivity] |
| **Connected** — uses mobile internet on their *own device* | **4.7 bn** | 58% | GSMA SOMIC 2025 (data year 2024; +200 m during 2024) |
| **Connected** — used *the internet*, any device, last 3 months | **6.0 bn** | ~75% | [Facts and Figures 2025, ITU, 2025-11-17, https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx] |
| **Usage gap** — covered but not using mobile internet | **3.1 bn** | 38% | GSMA SOMIC 2025 |
| **Offline entirely** (ITU definition) | 2.2 bn | 27% | ITU FF25 |

### 1.2 The ITU / GSMA disagreement, recorded rather than resolved

**ITU says 6.0 bn internet users. GSMA says 4.7 bn mobile internet users. The
gap is 1.3 bn people.** This is a definitional difference, not an error:

- ITU counts *any* internet use in the last three months, on *any* device,
  including a shared or borrowed one, largely from household surveys and
  modelled estimates for countries without surveys.
- GSMA counts unique individuals using mobile internet **on their own device**,
  built up from operator data.

**For this project GSMA's definition is the correct denominator**, because a
PWA has to be installed on a device the player controls. Using ITU's 6 bn in a
deck would inflate the addressable market by ~28% and is exactly the kind of
number a technical reviewer checks. Use GSMA; cite both; state the difference.

ITU itself flags the affordability caveat: **data remains unaffordable in
approximately 60% of low- and middle-income countries** [ITU FF25].

### 1.3 Sub-Saharan Africa, decomposed (the cleanest data available)

GSMA publishes an exact five-way split for SSA. Data year **2023**;
total ≈ 1.19 bn people.
[The Mobile Economy Sub-Saharan Africa 2024, GSMA Intelligence, 2024, Figure 1,
https://event-assets.gsma.com/pdf/GSMA_ME_SSA_2024_Web.pdf]

| Segment | People | % | Can they run our Tier-0 PWA? |
|---|---|---|---|
| Connected to mobile internet **with a smartphone** | **230 m** | 19% | **Yes — this is the entire technical market** |
| Connected to mobile internet, **not via smartphone** | 90 m | 8% | No — feature phone / KaiOS class |
| Covered, has a phone, **not using** mobile internet | 210 m | 18% | Not today; conversion target |
| **Covered, but no device** at all | **500 m** | **42%** | No. Unreachable by any client we can build |
| **Not covered** by a mobile broadband network | 160 m | 13% | No |

- **Covered** = 1,030 m (87%)
- **Connected** = 320 m (27%)
- **Usable (device-capable)** = **230 m (19%)**

Mobile internet penetration in SSA was 27% at end-2023 against a **usage gap of
60%**; unique mobile subscriber penetration was 44% (527 m subscribers)
[GSMA ME SSA 2024]. Country spread is enormous: below 15% penetration in Chad,
CAR and Mozambique; above 50% in South Africa and Seychelles.

**The single most important line in this file:** in Sub-Saharan Africa the
largest bloc — 500 million people, 42% — is *covered but has no device*. Our
payload budget does not help them. Nothing we build helps them. Any claim that
the reach client "reaches the unconnected" must be narrowed to "reaches the
low-end-smartphone-owning fraction of the connected", which in SSA is 19% of
the population.

---

## 2. Sizing the 2G population (requirement R-P005-1)

### 2.1 Coverage-side

The 2G-only population **is** the coverage gap: ~300–312 m people worldwide for
whom 2G or nothing is the best available network, of whom **nearly half are in
Africa** [ITU FF25 mobile network coverage, 2025]. In SSA specifically, 160 m
(13%) are outside mobile broadband coverage [GSMA ME SSA 2024].

Africa's mobile-broadband picture, 2025: 5G reaches 12% of the African
population, against 55% globally; low-income countries are at 4% for 5G and
**56% for 4G**; rural 4G coverage globally is 84% vs 99% urban [ITU FF25].

### 2.2 Connection-side (a different quantity — shares of SIMs, not people)

| Geography | 2G share of connections | Year | Source |
|---|---|---|---|
| Sub-Saharan Africa | forecast **2% by 2030**; 3G is currently the largest single share and 4G overtakes 3G in **2027** | 2024 report, 2030 forecast | GSMA ME SSA 2024, Figure 2 |
| Africa (whole continent) | ~15% in 2024 → ~4% by 2030 | 2024–2030 | `[UNVERIFIED — reached via a secondary summary of GSMA Mobile Economy Africa, not read in the primary PDF this session]` |

SSA 2030 mix: **4G 50%, 3G 31%, 5G 17%, 2G 2%** [GSMA ME SSA 2024, Fig 2].

### 2.3 2G is being switched off

- GSA counts **25 networks planned for 2G/3G shutdown in H2 2026 alone**, on top
  of **37 already in the process of switching off**, with further tranches
  scheduled through 2030 [GSA / industry sunset trackers, 2026,
  https://iot.cards/en/resources/guides/sunset-2g].
- South Africa — the only SSA country to announce sunset of *both* 2G and 3G —
  has pushed the date to **2027** [GSMA ME SSA 2024; Connecting Africa, 2025,
  https://www.connectingafrica.com/regulation/south-africa-pushes-2g-3g-sunset-to-2027].
- Vietnam operators (MobiFone, Viettel, VinaPhone) at 2026-09-30; Nepal
  2026-12-31; Israel Cellcom 2026-03-31.

### 2.4 The three numbers, for 2G specifically

| | Global | Sub-Saharan Africa |
|---|---|---|
| **Covered** by 2G only | ~300–312 m | ~160 m are outside MBB coverage entirely; some fraction of these have 2G |
| **Connected** on 2G (has a SIM on a 2G network) | shrinking; SSA heads to 2% of connections by 2030 | — |
| **Usable** — 2G-only *and* has a smartphone *and* can afford to spend data on a game | **effectively nil** | **effectively nil** |

**Conclusion.** Designing the product's *network* floor around 2G EDGE optimises
for a population that (a) is 4% of humanity, (b) overwhelmingly does not own a
smartphone, (c) is the least able to afford discretionary data, and (d) is
being decommissioned. The correct network floor is **congested, intermittent,
expensive 3G/4G at the edge of coverage** — which imposes the *same* engineering
discipline (small payload, offline-first, resumable, no gameplay network calls)
for reasons that survive contact with a reviewer.

---

## 3. Data cost as a fraction of income — what our payload actually costs a player

All figures ITU, **2024**, expressed as a share of **monthly** GNI per capita
[Measuring digital development: The affordability of ICT services 2024, ITU,
2025, https://www.itu.int/dms_pub/itu-d/opb/ind/D-IND-ICT_PRICES.01-2025-PDF-E.pdf].

| Basket | World | Africa | Low-income economies | High-income |
|---|---|---|---|---|
| Data-only mobile broadband, **2 GB** | — | **4.2%** | **7.4%** | 0.4% |
| Data-only, 1 GB | — | — | 5.5% | — |
| Data-only, 5 GB | — | — | 12.3% | — |
| Data-only, 10 GB | — | — | 20.4% | — |
| Mobile cellular low-usage (70 min + 20 SMS) | 0.9% | 3.4% | 5.2% | — |

Broadband Commission target: **≤2% of monthly GNI per capita.** Africa and the
low-income group both miss it on every mobile basket; ITU notes African mobile
baskets range **3–7% of average income** and fixed broadband 14%.

Actual consumption, for scale:
- Global average **13.0 GB/month per connection**; **Sub-Saharan Africa 1.9
  GB/month** (2023), forecast to 8.0 GB by 2030 [GSMA ME SSA 2024, Fig 4].
- ITU: average monthly use exceeded 13 GB worldwide in 2024, while actual use in
  low-income economies averaged ~2 GB/month.

### 3.1 Our budgets, converted to player cost

*Our arithmetic, from the ITU low-income 1 GB figure of 5.5% of monthly GNI p.c.
Stated as a derivation, not a cited fact.*

| Item | Bytes | % of a low-income month's income | Share of an SSA player's 1.9 GB monthly allowance |
|---|---|---|---|
| Initial payload (C1) | 200 KB | 0.0011% | 0.010% |
| Full offline install (C1) | 1.5 MB | 0.0083% (≈ 3.6 minutes of average income) | 0.077% |
| Telemetry, heavy player, 600 runs/month @ 8 KB | 4.8 MB | 0.026% | 0.25% |
| **Total, month one, heavy player** | **~6.3 MB** | **~0.035%** | **~0.33%** |

**A typical native mobile game install (~50 MB) is 2.6% of an SSA player's
monthly data before they play a single round.** That, and not aesthetics, is
the argument for the web client.

### 3.2 A finding that independently confirms ADR-004's "no ad tech" rule

A single 30-second mobile video ad is roughly 3–5 MB `[UNVERIFIED — industry
rule of thumb, no primary source located]`. At one ad per session and the
industry-typical 5–10 sessions/day for a short-session game (§6), that is
**450–1,500 MB per month — 24% to 79% of an SSA player's entire monthly data
consumption.** Ad-supported monetization is not merely ethically awkward in this
market; it is arithmetically impossible. ADR-004 rule 7 gets a bandwidth
justification to go with the child-safety one, and it is the one that will
convince a commercial audience.

---

## 4. Device reality — where C1's floor is wrong

### 4.1 Android version distribution

**Africa, mobile + tablet, August 2026** [StatCounter GlobalStats,
https://gs.statcounter.com/android-version-market-share/mobile-tablet/africa]:

| Version | Share |
|---|---|
| Android 16.0 | 19.49% |
| Android 13.0 | 15.21% |
| Android 14.0 | 14.41% |
| Android 15.0 | 14.26% |
| Android 12.0 | 12.10% |
| Android 11.0 | 9.53% |
| **Top six subtotal (all Android 11+)** | **~85.0%** |

Worldwide, **Android 5.0 Lollipop held ~1.57%** in November 2025
[StatCounter, via secondary aggregation,
https://commandlinux.com/statistics/android-version-distribution/ —
`[UNVERIFIED: the underlying StatCounter series was not read directly; the
Africa figures above were]`].

**Methodological caveat, which cuts in C1's favour and must be stated:**
StatCounter measures *page views*, not devices. Old, slow, data-constrained
phones generate far fewer page views per device than new ones, so StatCounter
systematically **under-counts** the legacy tail. Even applying a generous 2–3×
correction, Android 5 remains low single digits.

### 4.2 RAM

**2 GB has been the mandated minimum for Android (Go edition) devices since
Android 13 (Go edition)** [Android (Go edition), Android Developers,
https://developer.android.com/guide/topics/androidgo]. C1's 1 GB floor is below
the specification of any currently-shipping new device. It describes 2016–2019
hardware still in circulation.

### 4.3 WebGL — is ADR-001's "assume no GPU" correct or merely conservative?

**Correct, and more correct in 2026 than when written — but for a different
reason than ADR-001 gives.**

Chromium is **removing the SwiftShader software fallback for WebGL**. The
consequence is explicit: *"automatic fallback to WebGL backed by SwiftShader is
being removed, with WebGL context creation failing instead of falling back"* —
because software WebGL "provides an unusable experience" and the JIT in the GPU
process is a security risk [Intent to Remove: SwiftShader Fallback,
blink-dev, https://groups.google.com/a/chromium.org/g/blink-dev/c/yhFguWS_3pM;
https://chromestatus.com/feature/5166674414927872]. SwiftShader accounted for
~2.7% of WebGL contexts and **was never used on mobile at all**.

So on Android there is no software fallback and never was: WebGL is either
hardware-backed or it fails. Combined with the documented pattern of low-end
mobile GPU drivers (e.g. Vivante) failing context creation *without a usable
error* [three.js forum / WHATWG archive discussion,
https://discourse.threejs.org/t/why-android-device-is-not-good-for-webgl/20878],
`getContext('webgl')` returning non-null is not a reliability signal.

**Recommendation:** keep the decision, rewrite the rationale in ADR-001 from
"blacklisted or lying" to "no software fallback exists on mobile; context
creation fails outright, and success does not imply usable performance."
`[UNVERIFIED: no source found quantifying the share of *low-end African*
Android devices on which WebGL context creation fails. This number does not
appear to be published. If the pitch needs it, we must measure it ourselves via
a capability beacon — which is cheap and would be a genuinely novel datum.]`

### 4.4 PWA / service worker at the floor

- Service workers shipped in Chrome 40 (2015); installability / Add to Home
  Screen from Chrome 57. **Chrome 60+ is comfortably sufficient** — no blocker.
- On Android 5+, Chrome and the WebView are updated through Play Services
  independently of the OS, so a 2015 handset can run a 2026 Chrome. The real
  blocker is **devices without Google Play Services** — some AOSP builds,
  regional Chinese-market devices, and the entire KaiOS feature-phone class,
  which cannot run a PWA at all. That class maps onto the 90 m SSA users who use
  mobile internet *not* via a smartphone. `[UNVERIFIED — no source located
  quantifying the non-Play-Services share of African Android devices.]`

---

## 5. Web vs. app-store acquisition — settling ADR-001's open question

**Answer: web/PWA. Confidence: moderate-high on arithmetic, low on published
evidence.**

The strong argument is §3.1: a native install is 1–2 orders of magnitude more
bytes than a PWA, and bytes are the scarce resource. Play Store distribution
also adds a per-device build matrix and update latency that slows the CI/CD
flywheel the project exists to demonstrate — ADR-001 already says this.

The commonly cited supporting evidence is **weak and should not be put in a
deck as fact**: the widely repeated Jumia PWA result (33% higher conversion,
50% lower bounce, 12× more users than the native app) originates in vendor and
agency marketing, not a primary or audited source
[e.g. https://www.mobiloud.com/blog/progressive-web-app-examples/].
Mark it `[UNVERIFIED]` wherever it is used, or drop it and lead with the byte
arithmetic, which we can compute ourselves and defend.

---

## 6. Recommended replacement for the C1 floor table

Proposed to S03/S07 as an ADR (drafting it is out of this session's write scope
— see `sessions/HANDOFF-S01.md`).

| Axis | C1 today | R2 recommendation | Why |
|---|---|---|---|
| OS | Android 5.0, Chrome/WebView 60+ | **Android 8.0, Chrome 80+** | Android 5 is ~1–2% of an already-small pool; supporting it costs modern-JS ergonomics for negligible reach |
| RAM | 1 GB, 150 MB to the tab | **2 GB, 150 MB to the tab** — keep the tab budget | 2 GB is the Go-edition minimum since Android 13 Go; the *tab* budget is what actually protects us |
| GPU | assume none | **unchanged** | strengthened by the SwiftShader removal |
| Screen | 480×800, touch only | **unchanged** | fine |
| Network | 2G EDGE 50 kbps | **congested/intermittent 3G–4G at cell edge; assume 100–400 kbps effective and 300 ms+ RTT; assume metered per-MB prepaid** | 2G is 4% of population, device-less, and sunsetting |
| Payload 200 KB gz | keep | **keep, unchanged** | justified by data *cost*, not data *rate* |
| Offline install 1.5 MB gz | keep | **keep, unchanged** | 0.077% of an SSA monthly allowance |
| Offline-first | keep | **keep, unchanged** | intermittency, not absence, is the failure mode |
| Telemetry 8 KB / 3-min run | — | **restate as bytes per minute of play + a per-run header allowance** | run length becomes a design variable in R6; a per-run cap silently penalises short runs |

**Nothing that makes the product good gets relaxed.** The budgets stay. Only the
device and network *descriptions* change, and they change from a story that a
GSMA-literate reviewer will challenge to one they will recognise.
