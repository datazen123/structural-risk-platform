# R4 — Pilot skill metrics: the "TOP GUN" question

**Session:** S01. **Date:** 2026-09-08.
**Consumed by:** S08 (metric selection and validation), S09, S10.

---

## 1. What the literature actually measures

### 1.1 Aviation and RPA operator selection

The strongest predictive-validity evidence for *remotely piloted* operators —
which is our exact case, not manned aviation:

- ASVAB composites used for USAF **sensor operator** training qualification
  showed corrected validities of **r = .54/.54** (Basic Sensor Operator Course,
  n=461), **r = .58/.55** (MQ-1 IQT/RQT, n=430) and **r = .36/.33** (MQ-9
  IQT/RQT, n=249)
  [Predictive Validity of UAS/RPA Sensor Operator Training Qualification
  Measures, *International Journal of Aerospace Psychology* 25(1), 2015,
  https://www.tandfonline.com/doi/abs/10.1080/10508414.2015.981487].
- A combination of **cognitive, psychomotor and aviation-knowledge/experience**
  measures predicted completion of an initial RPA training course at **r = .48**.
- A unit-weighted composite of **multitasking + psychomotor + spatial** test
  scores related to final academic and flight grades at **r = .59**
  [Identifying Best Bet Entry-Level Selection Measures for USAF RPA Pilot and
  Sensor Operator Occupations,
  https://www.academia.edu/69124927/].

**Three things to take from this.** First, the construct that predicts RPA
performance is a *composite* — multitasking, psychomotor, spatial — not raw
reaction speed. Second, r ≈ .5 is the ceiling that a well-funded, decades-old
selection science achieves; nothing we build should promise better. Third,
**"multitasking / time-sharing ability" is repeatedly named as the measurement
gap** the USAF had to build new instruments for. That is precisely the *load
tolerance* axis in `docs/00-vision.md`, and it is the strongest argument that
our metric set has something genuinely new in it.

### 1.2 Surgical robotics — the best-developed teleoperation metric set

Robotic surgery is the mature science of *measuring a human driving a machine
through a screen*, and its metrics transfer conceptually better than aviation's.

- The **dV-Trainer** VR simulator has established face and construct validity;
  experts beat novices on most parameters, and **the most discriminative were
  "time to complete" and "economy of motion" (p < 0.001)**
  [Validation of a Novel Virtual Reality Simulator for Robotic Surgery,
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3926253/].
- **Economy of motion (EOM)** = total instrument path length. The *ratio* form
  (rEOM = trainee path length ÷ attending path length) is used to judge trainee
  entrustment in live colorectal surgery
  [https://pubmed.ncbi.nlm.nih.gov/41101034/].
- Objective performance indicators are grouped as **wrist articulation,
  instrument movement, energy, smoothness, clutching, instrument time**
  [Technical Skills Assessment in Robotic Surgery: A Review of Recent Methods,
  *Methodist DeBakey Cardiovascular Journal*,
  https://journal.houstonmethodist.org/articles/10.14797/mdcvj.1667].
- **R-OSATS** (Robotic Objective Structured Assessment of Technical Skills)
  is the human-rated companion: respect for tissues, dexterity, fluency,
  knowledge, accuracy.

**Path length ÷ optimal path length is the single best-validated
teleoperation-skill metric in any field.** Our "path efficiency" is the same
construct. That is a real anchor and S08 should say so explicitly — it is one of
the few metrics we can honestly claim is *not* invented here.

### 1.3 Movement smoothness

**SPARC** (spectral arc length) is the current standard: it *"quantifies
movement intermittencies but is independent of its amplitude or duration"* and
was designed to remove the duration bias and noise sensitivity of jerk-based
metrics [A robust and sensitive metric for quantifying movement smoothness,
Balasubramanian, Melendez-Calderon & Burdet, *IEEE TBME*, 2012,
https://pubmed.ncbi.nlm.nih.gov/22180502/]. It is in routine use in stroke,
Parkinson's and gait research.

Use SPARC. Do not use dimensionless jerk. See R6 §C.3 for why this is
load-bearing rather than a detail.

---

## 2. Which of these survive a 4-DOF stream in a 2.5D slice view?

ADR-001 warns explicitly that some proprioceptive dimensions are attenuated by
the projection and that S08 must be honest about it. Being strict:

### Supported — cleanly derivable
| Metric | Anchor |
|---|---|
| Reaction latency (hazard onset → first corrective input) | RT literature; RPA psychomotor batteries |
| Decision latency under branching | — (ours) |
| **Path efficiency** (flown ÷ optimal) | **EOM / rEOM, surgical robotics — strong anchor** |
| Time to complete | dV-Trainer's most discriminative parameter |
| **Control smoothness (SPARC)** | **Balasubramanian 2012 — strong anchor** |
| Input entropy / deadband use | — (ours) |
| Recovery competence (time-to-stable after induced disturbance) | loosely, "fluency" in R-OSATS |
| Revisit rate / backtrack cost | — (ours) |
| Coverage completeness (survey mode) | — (ours); closest anchor is inspection-discipline literature |
| Sweep-pattern classification | — (ours) |
| **Load tolerance / time-sharing under concurrent task** | **named as the USAF's own measurement gap — anchored as a construct, not as an instrument** |

### Attenuated — derivable but weakened; state how, every time
| Metric | How the projection weakens it |
|---|---|
| Clearance discipline | The slice view shows in-plane margin. Out-of-plane (altitude-axis) margin is hinted by edge shading only. Our clearance metric is therefore an **in-plane** clearance metric and must be named that way in `metrics.v1.md`. |
| Spatial memory | Navigating a 3D volume through a 2D window changes the memory task itself — the player memorises slices, not a volume. Comparable within our sim, not comparable to field data. |
| Degradation tolerance | Real degradation is perceptual (dust, glare, motion blur). Ours is synthetic (latency, dropout, noise injection). The *latency and dropout* components transfer; the *perceptual* components do not. Split the metric. |
| Victim-detection rate per metre | Detection in the game is a designed affordance, not a perception problem. It measures search *strategy*, not detection *ability*. Rename accordingly. |

### Not supported — say so loudly, do not ship with a footnote
- True 3D depth judgement and proprioceptive estimation.
- Visual-inertial state estimation under motion blur.
- Force / contact / compliance skill.
- Anything requiring photometric realism.
- Physiological workload (no camera, no microphone, no wearables — C4 forbids it
  and correctly so).
- **Manual flight skill in the aerodynamic sense.** Our sim has no rotor
  dynamics, no wind, no ground effect. A "pilot skill" claim that implies
  aircraft handling is not supportable and must not appear in the deck.

---

## 3. Transfer evidence — does game skill predict real teleoperation?

**The honest answer: the effect is real, positive, small, and inconsistent.
This is a research question the project answers, not a claim it assumes.**

Evidence *against* a strong claim:
- **Pilots significantly outperformed video-game players and controls on
  multi-attribute cognitive tasks** relevant to unmanned flight, in a 30-person
  three-group study. Gaming did not substitute for aviation training
  [Operator selection for unmanned aerial systems: comparing video game players
  and pilots, McKinley, McIntire & Funke, *Aviat Space Environ Med* 82(6):635-42,
  2011, https://pubmed.ncbi.nlm.nih.gov/21702315/].
- In a prospective study on a high-fidelity VR robotic surgery simulator, gamers
  (≥6 h/week) beat non-gamers on **3 of 24 performance metrics**
  [https://pmc.ncbi.nlm.nih.gov/articles/PMC6699361/].

Evidence *for*:
- Multi-clinic work reports video gaming associated with better robotic
  simulator performance and lower cognitive load, with one study reporting
  **~33% higher overall robotic performance scores** for participants with a
  gaming history [Video gaming improves robotic surgery simulator success,
  *J Robot Surg*, 2023,
  https://link.springer.com/article/10.1007/s11701-023-01540-y;
  The impact of video gaming and playing a musical instrument on robotic
  surgical simulator performance (RS3), 2024,
  https://www.sciencedirect.com/science/article/pii/S2949711624000224].

**The disagreement is recorded, not resolved.** 3-of-24 and +33% are not
reconcilable as effect sizes; they differ in task, cohort, and what "gamer"
means. The defensible position for the whitepaper:

> Prior gaming experience is a modest positive predictor of initial
> teleoperation performance. It is not a substitute for domain training. Whether
> skill measured in *our* sim predicts performance on *a real confined-space
> platform* is unmeasured, and establishing it is a stated research objective of
> this programme, with a pre-registered design and a published negative result
> if that is what we find.

That paragraph is stronger with investors and far stronger with agencies than
any claim we could currently make instead.

---

## 4. Prior art: crowdsourced human demonstration → machine capability

### 4.1 Citizen-science games — what worked

| Project | Outcome | What it proves |
|---|---|---|
| **Foldit** | Citizen scientists produced **de novo protein designs that express in *E. coli* and adopt the designed structure in solution**, published in *Nature* [De novo protein design by citizen scientists, *Nature* 570, 2019, https://www.nature.com/articles/s41586-019-1274-4] | Non-experts can produce a *primary scientific result*, not just labels |
| **EteRNA** | Players' RNA designs outperformed algorithmic ones; published in *J. Mol. Biol.* and PNAS [Solving tough problems with games, *PNAS*, 2013, https://doi.org/10.1073/pnas.1306643110] | Human intuition beat the solver on a real optimisation problem |
| **Eyewire / Galaxy Zoo / Phylo** | Very successful at collection, annotation and processing | But — see below |

**The critique that matters to us**, from the literature itself: these projects
*"have proven very successful for data collection, annotation and processing,
but for the most part have harnessed human pattern-recognition skills rather
than human creativity"*
[Revisiting Citizen Science Through the Lens of Hybrid Intelligence, 2021,
https://arxiv.org/pdf/2104.14961].

**Our project is claiming the harder thing.** We claim to harvest *ingenuity* —
improvised motor strategy — not pattern recognition. Foldit and EteRNA are the
only two precedents that support that claim, and both are highly structured
puzzle domains with a computable objective function. Ours has one too (traverse
the void), which is the reason to think it can work. Cite Foldit and EteRNA
specifically; do not cite Galaxy Zoo, which proves a different and weaker thing.

Documented failure modes across the field: ambiguous developer roles, limited
resources and funding dependency, absence of a shared community, and
**"science–game tensions"** — the constant pull between the game being fun and
the game being an instrument
[Practical recommendations from a multi-perspective needs and challenges
assessment of citizen science games, 2023,
https://pmc.ncbi.nlm.nih.gov/articles/PMC10162532/]. CLAUDE.md's "if the game is
not fun, there is no data" is the same observation, arrived at independently.

### 4.2 RoboTurk — the closest precedent, and it is encouraging

**RoboTurk is the single most relevant prior art in existence** for this
project's core mechanism.

- A crowdsourcing platform for **6-DoF trajectory teleoperation via ordinary
  mobile phones**.
- Collected **137.5 hours of manipulation data / 2,200+ successful task
  demonstrations in 22 hours of wall-clock system usage** from remote workers.
- **"Poor network conditions, such as low bandwidth and high delay links, do not
  substantially affect the remote users' ability to perform task demonstrations
  successfully on RoboTurk."**
- More demonstrations produced **better policy performance and greater learning
  consistency** on multi-step sparse-reward tasks.

[ROBOTURK: A Crowdsourcing Platform for Robotic Skill Learning through
Imitation, Mandlekar et al., CoRL 2018,
https://proceedings.mlr.press/v87/mandlekar18a.html;
Scaling Robot Supervision to Hundreds of Hours with RoboTurk, 2020]

Three direct consequences:
1. The **crowd → demonstrations → policy** chain has been demonstrated end to
   end by a credible lab. Our arrow is not novel in kind, only in domain and
   scale. That is a *good* thing for credibility.
2. The **bad-network finding is directly supportive of C1/C2** and should be in
   the deck. Someone has already tested whether high-latency links destroy
   demonstration quality; they do not.
3. RoboTurk's throughput sets an expectation: 2,200 demonstrations from a
   modest crowd in 22 hours of system usage. Our scale claim should be
   benchmarked against that, not invented.

### 4.3 Learning-from-demonstration limits — what breaks

- **Behavioural cloning suffers covariate shift**: small errors move the robot
  off the demonstrated distribution, after which the policy is queried
  out-of-distribution and errors compound. *"Especially acute for long-horizon"*
  tasks [A Survey of Imitation Learning, 2023,
  https://arxiv.org/pdf/2309.02473; Feedback in Imitation Learning: The Three
  Regimes of Covariate Shift, https://arxiv.org/pdf/2102.02872].
- **DAgger** (Ross et al., 2011) fixes this by collecting *corrective* labels in
  states the learner actually visits — but its three known limitations are
  tedium for supervisors, danger of visiting bad states on a physical robot, and
  cost of repeated policy updates [https://arxiv.org/pdf/1811.02184].

**This is the technical risk nobody in the repo has written down yet.** Our
pipeline as described in `docs/00-vision.md` is *pure offline behavioural
cloning*: players demonstrate, we aggregate, we train, we ship. That is exactly
the regime the literature says degrades on long-horizon tasks — and confined
space navigation is a long-horizon task.

**The good news is that our architecture already contains the fix and does not
know it.** ADR-002 makes the sim deterministic and re-simulable from the input
stream. That means we can **replay a learned policy into a level a human already
solved, find the states where it diverges, and generate a targeted level whose
start state is that divergence point** — a DAgger-style interactive loop where
the "expert query" is served to a *player as a new level*, not to a paid
annotator. The supervisor tedium problem dissolves because the correction is the
game.

**S09 should treat this as its central design idea, not as an optimisation.**
It is also, incidentally, the most defensible novelty claim the project has.
