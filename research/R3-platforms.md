# R3 — SAR robotics: what is actually deployed

**Session:** S01. **Date:** 2026-09-08.

> **Boundary with S12.** This file covers *what exists and how it is
> controlled*. It stops at "what must a drone satisfy to be approved" — that is
> S12. Regulatory notes below are context for the insertion-point question only.

---

## 1. Field reality, not lab reality

The field's founding events are the **1995 Oklahoma City bombing and the Great
Hanshin-Awaji (Kobe) earthquake**, both of which exposed the limits of human
rescuers reaching survivors inside collapsed structures. The first actual robot
deployment was the **2001 World Trade Center collapse**; since then rescue
robots have been used in **at least 28 disasters across six countries**
[Disaster Robotics, Robin R. Murphy, MIT Press, 2014,
https://mitpress.mit.edu/9780262534659/disaster-robotics/;
https://robinrmurphy.com/disaster-robotics/].

That is roughly **one deployment a year, worldwide, across all robot types, over
two and a half decades.** Anyone writing an investor deck should internalise
that number before drawing an arrow to "field platform". The bottleneck has
never been the absence of a nav policy.

Murphy's own record — 29–30 deployments including three building collapses, two
mine disasters, an earthquake, WTC, Fukushima, Hurricane Harvey and Surfside —
is the single largest body of field experience in existence and is the correct
citation for any claim about what actually happens on a rubble pile.

A recurring, sourced criticism to keep in view: devices are *"often tested in
unrealistically robot-friendly labs or via simulations that don't quite
duplicate the realities of real-life situations that involve dirt and sand,
steep changes in elevation, or radio-blocking metal structures"*
[Robots Gear Up For Disaster Response, *Communications of the ACM*,
https://cacm.acm.org/news/robots-gear-up-for-disaster-response/]. **Our 2.5D
slice sim is squarely inside the category this criticism targets.** Say so
before a reviewer does.

## 2. Türkiye 2023 — the largest recent test

- **~5,000 rescuers, 90 INSARAG teams, ~300 lives saved** in the life-saving
  phase; the largest INSARAG operation in 30 years
  [INSARAG After-Action Review, Türkiye 2023, INSARAG/UN OCHA, 2024,
  https://insarag.org/wp-content/uploads/2024/04/After-Action-Analysis-and-Recommendations-for-INSARAG-Turkiye-2023.pdf].
- Robotic contribution was overwhelmingly **COTS multirotors with thermal
  payloads** used for situational awareness — e.g. DJI Mavic 2 Enterprise Dual
  flown by Drone Hizmetleri `[UNVERIFIED — vendor/press sourcing only]`. No
  evidence found of confined-space or ground robots at meaningful scale.

**The gap between "SAR robotics" as a research field and "robots on a Turkish
rubble pile in February 2023" is very large.** The project's pitch must not
imply otherwise.

## 3. Platform classes and their control modality

| Class | Representative | Control modality today | TRL |
|---|---|---|---|
| Collision-tolerant caged indoor UAV | **Flyability Elios 2 / 3** — carbon cage, GPS-free SLAM + LiDAR, 4K + thermal + 3D in one flight | **Full teleop with stabilisation assists**; increasing "confined-space autonomy" claimed on Elios 3 | 9 (in production, in weekly service) |
| Open-frame outdoor multirotor | DJI Enterprise class | Teleop + waypoint autonomy | 9 |
| Legged + flying heterogeneous team | **CERBERUS** (DARPA SubT winner, 2021) | **Supervised autonomy — one human supervisor for the whole team** | 6 |
| Tracked/tethered ground robot | Various fire-service platforms | Full teleop | 8–9 |
| Snake / articulated | Research-stage; "swarm of snake robots" frameworks proposed for first-aid delivery [*Frontiers in Robotics and AI*, 2024, https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2024.1362294/full] | Teleop | 3–4 |
| **Insect-hybrid ("cyborg cockroach")** | HTX / NTU Singapore | Electrical steering of a live insect + sensor backpack | **Now 6–7, see §6** |

**Vendor-sourced caveat:** the Elios claims (collision-tolerant flight
algorithm, GPS-free SLAM+LiDAR, Rotterdam-Rijnmond fire brigade's Team Digital
Exploration deploying it 4–5 times per week, adoption by French RAID) all come
from Flyability's own case studies
[https://www.flyability.com/casestudies/elios-drone-firefighting;
https://www.flyability.com/news/french-elite-law-enforcement-team-raid-adopts-elios-the-collision-tolerant-uav-designed-for-indoor-flight].
**This is evidence of a vendor's claim, not of the fact.** The deployment
*frequency* claim in particular (4–5/week) is the most useful and the least
independently verifiable number in this file.

## 4. Where exactly does a learned nav policy insert?

This is the load-bearing question for S09 and for the last arrow of the pitch.
The DARPA SubT record answers it more usefully than anything else available.

SubT's defining conditions were *"geometric complexity, degraded perceptual
conditions combined with lack of GPS support, austere navigation conditions,
and denied communications"*
[Team CERBERUS Wins the DARPA Subterranean Challenge: Technical Overview and
Lessons Learned, Tranzatto et al., 2022, https://arxiv.org/pdf/2207.04914].

Two lessons matter to us:

1. **Comms loss forces autonomy.** *"Missions with no prior communication
   infrastructure required a certain level of autonomy since the connection with
   the robots might be lost."* Teleoperation is not an option in the deep
   interior of a rubble pile. Whatever we produce has to run onboard.
2. **Teams explicitly asked for adjustable autonomy.** Post-challenge analysis
   records *"the need for incorporating manual tasks to incorporate operator
   guidance into this framework, motivating the need for adjustable levels of
   autonomy to avoid conflicts between the operator's intended actions and
   robot's decision making."*

### The honest insertion point

**Local motion planning and reactive obstacle negotiation, inside a
deterministic safety envelope, under a supervisor who sets goals.** Not global
mission planning, and not full autonomy.

Reasons:
- It is the layer our telemetry actually measures. A game session produces
  *how a human threads a gap under time pressure*, not *which room to search
  next*, and certainly not SLAM.
- Global exploration planning is already well served by classical frontier and
  information-gain planners; a learned policy there would have to beat a strong
  baseline for no clear reason.
- C6 (pending, S12) flags that a learned component may be fieldable only inside
  a deterministic envelope with runtime monitoring. Choosing the local layer
  *now* keeps that option open at no cost. Choosing the global layer would
  foreclose it.

**Corollary for S09 and S10:** the benchmark must therefore be a *local
planning* benchmark — traversal of a cluttered volume against a classical local
planner baseline — not an end-to-end mission benchmark. Framing it as
end-to-end would be both harder and less credible.

## 5. Real failure modes → the game's difficulty axes

All of the following are documented, not invented. This is the list S03 should
build difficulty from.

| Failure mode | Source | Game axis |
|---|---|---|
| Denied / lost communications | SubT, CERBERUS 2022 | Injected latency, dropout, blackout windows |
| GPS denial | SubT, *ibid.* | No global position; dead-reckoning drift |
| Degraded perception (dust, smoke, darkness) | SubT, *ibid.* | Sensor noise, view occlusion, restricted light cone |
| Geometric complexity, austere navigation | SubT, *ibid.* | Void topology; tight-clearance passages |
| Dirt, sand, steep elevation change, radio-blocking metal | Murphy / *CACM* | Slice-transition cost; comms shadow zones |
| Collision as the normal case, not the exception | Flyability design premise | Collision-tolerant flight model; recovery competence metric |
| Operator workload and operator/robot intent conflict | SubT lessons | **Load tolerance** metric; adjustable-autonomy handoff events |

That last row is the interesting one: **operator/robot intent conflict is a
documented real failure mode and is directly gameable** — a mode where the sim
partially overrides the player's input and measures how they recover is both
good play and a genuinely novel dataset. It maps to the "load tolerance" and
"degradation tolerance" metrics that R6 §C identifies as the highest-value and
most time-expensive to harvest.

## 6. Bio-cybernetic / insect-cyborg SAR — the honest read

**The user asked. Answer: it is no longer vapour, and `docs/00-vision.md` is
now out of date on this point.**

- NTU Singapore (Prof. Hirotaka Sato) has worked on cyborg insects for over a
  decade; the platform is a **Madagascar hissing cockroach** carrying a
  lightweight electronic backpack with sensors and a thermal camera, steered by
  gentle electrical stimulation.
- Singapore's **HTX deployed 10 cyborg cockroaches to Myanmar in late March /
  early April 2025**, after the M7.7 earthquake of 28 March 2025, as part of
  SCDF's **Operation Lionheart**. This is described as **the first time
  insect-hybrid robots have been used in a humanitarian field operation**
  [https://www.scmp.com/week-asia/health-environment/article/3305721/myanmar-earthquake-singapore-deploys-cyborg-cockroaches-rescue;
  https://www.thestar.com.my/aseanplus/aseanplus-news/2025/04/05/singapores-cyborg-cockroaches-helping-with-search-and-rescue-efforts-in-myanmar-quake;
  https://www.psd.gov.sg/challenge/articles/from-lab-to-rubble--how-cyborg-cockroaches-saved-lives/].
- The technology had been shown at Milipol Asia-Pacific / TechX in April 2024
  with a planned operational date "from around 2026"; Myanmar caused it to be
  **fast-tracked** out of R&D.

**Honest assessment:**
- **TRL: 6–7**, not 3. It has flown a real mission in a real disaster.
- **Scale: 10 units, one deployment.** `[UNVERIFIED — no independent
  confirmation located that the cyborgs located any survivor; press coverage
  including a headline asserting they "saved lives" is government-communications
  sourced and should not be repeated as fact.]`
- **It belongs in the roadmap, not only the horizon section.**

**And it may be the single best insertion point for a learned nav policy that
this project has.** A cyborg insect has: no airworthiness certification regime,
no airspace authorisation problem, no BVLOS gate, negligible unit cost, and a
control problem — *steer a body you do not fully control through a cluttered
void toward a thermal signature* — that is far closer to what our game actually
measures than a full-size rotorcraft is. Every regulatory objection in C6 is
about aircraft. This is not an aircraft.

Recorded as a strategic option, not a recommendation. S14/ADR-006 (training
product line) and S12 should both see it.

## 7. Regulatory context (pointer only — S12 owns this)

- **Japan.** Level 4 BVLOS over populated areas is legal under the revised Civil
  Aeronautics Act framework administered by MLIT, with national pilot licensing
  and airframe certification
  [https://www.unmannedairspace.info/uncategorized/japanese-revised-drone-laws-to-permit-bvlos-flights-over-people-come-into-effect/].
- **The disaster carve-out is the material fact:** the flight-prohibition
  airspace rules and operational limitations **do not apply to flights for
  search and rescue by public organisations in accidents and disasters**
  [drone-laws.com summary of MLIT rules, 2026,
  https://drone-laws.com/drone-laws-in-japan/ — `[UNVERIFIED: secondary source;
  S12 must confirm against the MLIT primary text]`]. Normal operations require
  application to MLIT, in Japanese, at least **10 working days** in advance.
- **Implication for the product:** the carve-out attaches to *public
  organisations*, not to us. Any field path runs through a fire service, a JDR
  team or an equivalent agency as the operator. That reinforces R5's conclusion
  that the institutional relationship is the asset.
- EU and cascade-region regimes: **deferred to S12** by the session boundary.
