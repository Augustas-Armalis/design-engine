---
source: web:https://www.anthropic.com/engineering/harness-design-long-running-apps, web:https://arxiv.org/abs/2510.01171, web:https://github.com/pbakaus/impeccable, web:https://github.com/Nutlope/hallmark, web:https://github.com/Leonxlnx/taste-skill, web:https://superdesign.dev/blog/fix-generic-ai-landing-page, web:https://superdesign.dev/blog/why-ai-design-looks-generic, web:https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics, web:https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website, web:https://resend.com/design/brand/typography, web:https://linear.app/now/how-we-redesigned-the-linear-ui, web:https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web, web:https://www.inverse.com/input/design/the-browser-company-arc-design-interview, web:https://arxiv.org/abs/2603.13036, web:https://mcpmarket.com/tools/skills/nxion-design-divergence-engine
chapter: Process and tooling that force divergence; what skills and repos exist; what the quality studios actually do
pages: n/a (web)
topic_tags: [process, prompting, divergence, critique-loop, skills, repos, studios, evals]
status: studied
---

# Process techniques that force divergence, tools that exist, and studio evidence

Companion to `anti-ai-slop.md` (mechanism and tells) and `anti-ai-slop-detector.md` (measurable checks). Larpo's 2026-09-01 note already prescribes: reference triad, divergence matrix, batch rejection rules, grayscale/blur similarity, five internal skills (reference-triangulation, hero-divergence-gate, brand-mark-from-mechanism, typography-role-sampler, visual-similarity-qa). This note adds evidence for *which mechanisms actually work*, and four mechanisms Larpo does not yet have: external randomness, persistent cross-run memory, a calibrated evaluator agent, and distribution-style prompting.

Tags as in the main note: `[verified-local]`, `[fetched]`, `[secondary]`, `[engine note]`.

## 1. Core ideas

1. **A model cannot roll its own dice.** Impeccable's `concept-seed.mjs` header documents a measurement: "30/35 identical concepts across 16 prompt framings", because a single model's resonance ranking is deterministic and it always builds its #1. Fix: randomness from *outside* the model (a seeded script deals which candidate gets built plus six "challenger" forms from three tiers: graphic system, instrument language, atmosphere world), with re-roll chains reproducible from one base key. Also used earlier for a "palette seed". [verified-local: ~/.agents/skills/impeccable/scripts/concept-seed.mjs]. This is the strongest single piece of evidence in this research for *procedural* (not prompt-level) divergence.
2. **Memory across runs.** Hallmark stamps every output with its structural fingerprint (`/* Hallmark · macrostructure: <name> · tone: <tone> · anchor hue: <hue> */`), logs to `.hallmark/log.json`, and the next build must differ from the last three entries; nav (N1a-N13) and footer (Ft1-Ft8) archetypes rotate too; consecutive themes must differ on at least one of paper band (dark/mid/light), display style, accent hue. [fetched github.com/Nutlope/hallmark; MIT, Together AI, ~29.8k stars; 21 macrostructures, 21 themes, 57 or 58 "slop-test gates" depending on page; gate list itself in references/slop-test.md, not read]. This directly implements the design-engine README's "direction (must diverge from recent work)".
3. **A separate, calibrated evaluator beats self-critique.** Anthropic's long-running-app harness is a GAN-style generator/evaluator pair; the evaluator drives the live page via Playwright MCP, scores four criteria, writes a critique fed to the next iteration, and the generator chooses to refine or pivot aesthetic. [fetched anthropic.com/engineering/harness-design-long-running-apps]
   - Criteria (same text given to both agents): **Design quality** (coherent whole vs collection of parts), **Originality** (evidence of custom decisions; penalises template layouts, library defaults, AI-generated patterns; fails "unmodified stock components" and "purple gradients over white cards"), **Craft** (type hierarchy, spacing consistency, colour harmony, contrast; a competence check), **Functionality**. Design quality and originality weighted above craft and functionality because Claude already does craft/function well by default. No numeric weights published.
   - Calibration: few-shot examples with detailed score breakdowns to align the judge with the human and reduce drift.
   - 5-15 iterations per generation; up to four hours per run. Scores improve then plateau; the middle iteration is sometimes better than the last. Even iteration 1 beat the no-prompt baseline: criteria wording alone shifts output.
   - Museum example: by iteration 9 a clean dark landing page ("polished but expected"); at iteration 10 the generator discarded it and built a CSS-perspective 3D gallery room with doorway navigation. Pivot-or-refine as an explicit decision is the divergence mechanism.
4. **Ask for a distribution, not an answer.** Verbalized Sampling: prompt the model to produce N candidates *with stated probabilities* ("five ... with their probabilities") instead of one; single-answer prompts return the modal answer, distribution prompts approximate the pretraining diversity. Training-free; reported gains on creative writing, dialogue, QA, synthetic data. [arXiv 2510.01171; abstract-level read; the "1.6-2.1x" figure seen on Medium is unverified]. `[engine note]` For direction generation: "List 8 art directions for this brief with the probability each would be the first thing a typical model proposes; then build one whose probability is < 0.10 and which scores highest on audience fit." Untested on design; see eval E-2.
5. **Separate the three jobs.** Taste direction, divergent exploration (several options before any code), and pinning the winner as a reusable spec (DESIGN.md-style). One conflated prompt averages. [Superdesign, vendor but consistent with arXiv 2603.13036 "reflective prompting ... show alternative cultural mood boards before generating code"].
6. **Derive the look from the audience's world, including non-web artifacts.** Impeccable new-work: name the mechanism in one sentence, then list seven concrete visual systems/artifacts/places/rituals the audience knows ("notation, publications, identity programs, data graphics, interfaces"; "what did its world look like before the web?"), ordered by resonance; note the category's default page and its predictable opposite and keep *both* out of the list; then roll. [verified-local reference/new-work.md]. Arc is the cleanest human precedent: designer Varshavskaya was introduced to artist Robert Irwin's theatre-scrim work, which became the gently lit frame around the whole browser window [secondary: inverse.com interview via search summary]. Naz Hamid's reported answer to "what feels fundamentally me" was blueprints, indigo dyes, selvedge denim [secondary].
7. **Commit; do not hedge.** Impeccable: "Land the first build fully committed; committing is the hard part, and the passes that follow exist to make the committed thing clear and effective, never to dilute it." and "In unattended work, the safe rendition is the known risk." Hero memory test: "if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, the concept has not committed yet." [verified-local]
8. **Constrain by a real, strict system, then deviate once.** The Qt anecdote (Section 5 of main note) and Anthropic's own advice to "lock a theme" for consistency and "vary between light and dark themes, different fonts, different aesthetics" across generations [cookbook, fetched].
9. **Plan in tokens first, review the plan against the default, only then build.** Anthropic SKILL.md process: (1) Plan: 4-6 named hex values, typefaces and roles, one-sentence layout concept + ASCII wireframes with alignment guidance, principles that make the page unique; (2) Review: if any part reads as the generic default for a similar page, revise and state what changed and why; (3) Build only after the plan is distinctive. End with "remove one accessory" and keep notes on what was tried so later passes do not repeat. [fetched raw SKILL.md]
10. **Where the studios' distinctiveness actually sits (evidence is thin; be honest).** Searches and fetches returned almost no process write-ups from Locomotive, Active Theory or Basement (portfolio copy, job ads, a 403). What can be stated:
    - *Resend* (official brand page): three-voice stack by strict role (editorial display for large headlines only, heading face, body/UI face, mono for code), sentence case everywhere including buttons/labels/navigation, no faux bold/italic, no mono for titles. Core palette Resend Black #000000 and Resend White #FDFDFD; semantic red/amber/green/blue reserved for states only. [fetched resend.com/design/brand/typography and search summary]
    - *Linear* (own blog): LCH theme generator, 98 per-theme variables cut to three inputs (base, accent, contrast); Inter Display for headings, Inter for the rest; effort on alignment of labels/icons/buttons that "users feel more than see"; concept-first in Figma, hundreds of screens narrowed to a few, stress tests across main views, ~6 weeks, team of a few. [fetched linear.app/now/how-we-redesigned-the-linear-ui]
    - *Stripe* (secondary, AI-generated summary of a podcast with Stripe's head of design; treat as unverified): homepage gradient came from a custom generator tool with controls for blur, grain, rotation, thickness, texture, colour; AI used to explore ~20 ideas in the time previously spent on 2, "AI does not replace craft, taste, or attention to detail"; motion restrained; site framed as a manifesto of care. Stripe job listings confirm a "Collective" pod of design engineers on animation/interaction across stripe.com, Sessions, Press, Link.
    - *basement.studio*: bespoke type (Basement Grotesque drawn from the wordmark, early-19th-century grotesque specimens + contemporary brutalism; Geist for Vercel; Adhesion blackletter), quarterly self-initiated hackathons as the place new site ideas are prototyped. [fetched/search summaries]
    - *Arc/Browser Co.*: product framed as emotional, "Tesla of browsers"; distinctive frame from Irwin scrims; later reversed its own radical redesign as too complex for most users [secondary]. Distinctiveness has a usability cost; measure it.
    - Common thread `[engine note]`: bespoke assets (type, generators, illustration, photography) created *for the one brand*, roles enforced by a system, and rigour in alignment, rather than a stack of fashionable effects. Nothing in the reachable evidence shows these studios using prompt tricks; their moat is custom assets plus a human art director.

## 2. Rules

- **RULE [new]** Never let the generating model pick between its own candidate directions. Deal them from outside: a seeded script chooses which candidate index is built, plus 2-6 challenger forms from different tiers (graphic system / instrument language / atmosphere world); store the seed and allow reproducible re-roll.
  **Why** Measured 30/35 identical concepts across 16 prompt framings when the model chose. Same logic reduces Larpo's "5 of 7 concepts use Geist".
  **Applies to** all new directions. **Check** seed present in output comment + `grep` in the built HTML (Impeccable requires the seed key to survive the production build). **Source** Impeccable concept-seed.mjs; new-work.md section 5 [verified-local].

- **RULE [new]** Keep a persistent ledger of structural fingerprints (macrostructure, nav archetype, footer archetype, type voice, ground band, accent hue, CTA silhouette, headline size band) and make the next build differ on >= 1 declared axis from the last three. Write the stamp into the page and into `ledger/`.
  **Why** Hallmark does this; it is the only mechanism found that addresses cross-run sameness.
  **Applies to** all pipeline runs. **Check** compare stamp to last 3 ledger entries (script). **Source** Hallmark [fetched].

- **RULE [new]** Use a separate evaluator agent that renders the page (Playwright), scores Design quality, Originality, Craft, Functionality against written criteria that explicitly penalise stock components and AI-generated patterns, and is calibrated with several few-shot graded examples drawn from the ledger. Allow the generator to pivot aesthetic, not only refine. Cap iterations (5-15) and keep the best iteration, not the last.
  **Why** Anthropic's harness; originality and design quality needed explicit weight; scores plateau; middle iteration sometimes better.
  **Applies to** all. **Check** evaluator transcript + per-criterion scores stored with the ledger entry. **Source** Anthropic engineering post [fetched].

- **RULE [new]** Before layout, produce >= 7 candidate world-references for the audience, including print/instrument/notation/identity-system artifacts from before the web; delete the category default and its predictable opposite; let the dice pick.
  **Why** Forces source material that is not the web median; Arc/Irwin precedent.
  **Applies to** new brand or replacement look. **Check** artifact list present with one line each; no more than 3 of 7 share one material. **Source** Impeccable new-work.md [verified-local].

- **RULE [new]** Write the direction contract (<= 150 words) as an HTML comment at the top of `<body>` in the emitted markup: THESIS (one idea + the category default refused), OWN-WORLD, FIRST VIEWPORT, signature interaction, seed. Grep the built output to prove it survived the build.
  **Why** Makes the commitment auditable and lets a reviewer diff promise vs behaviour.
  **Applies to** all. **Check** `grep` built HTML for seed key. **Source** Impeccable new-work.md section 5 [verified-local].

- **RULE [new]** When generating options, ask for 5-8 with self-estimated "typicality" and require the build candidate to be low-typicality but high audience-fit (Verbalized-Sampling style).
  **Why** Targets the preference-data typicality bias.
  **Applies to** direction exploration. **Check** record the list in the ledger; run E-2. **Source** arXiv 2510.01171; adaptation is `[engine note]`.

- **RULE [new]** Pre-build plan = 4-6 named colours, type roles, one-sentence layout concept + ASCII wireframe, "what makes it unique"; a review step compares it with the default look for that category and logs what changed.
  **Why** Catches convergence before code exists, when changing is free.
  **Applies to** all. **Check** plan file exists; diff vs the fingerprint ledger. **Source** Anthropic SKILL.md [fetched].

- **RULE [new]** Write criteria wording deliberately and test it: adjectives such as "museum quality" or "premium" steer toward one look.
  **Why** Observed convergence side effect in Anthropic's harness.
  **Applies to** evaluator and generator prompts. **Check** A/B the criteria on 3 briefs and compare fingerprints. **Source** Anthropic engineering post.

- **RULE [new]** Use image-first exploration only when the comp is treated as a spatial contract and the code is verified against it; otherwise the code drifts back to template.
  **Why** Taste-skill `image-to-code` (one image per section, extract layout/type/spacing/colour values, build, compare in a real browser) and Impeccable "comp is king" both flag that "generic coded reinterpretation after the image step" is the failure mode. Impeccable requires a pixel-overlap reproduction check of the first viewport (saved as `.impeccable/review/hero-repro.png`) before building further.
  **Applies to** hero/landing. **Check** screenshot-diff vs comp at the comp's dimensions. **Source** taste-skill image-to-code listing [secondary]; Impeccable new-work.md [verified-local].

- **RULE** Bounded verification: build fully, inspect once in a batched round (desktop + mobile), fix everything in one batch, confirm with at most one more round, then stop; hand the remaining finds to a fresh-context reviewer.
  **Why** Open-ended self-QA "burns the user's money doing worse what the finish handoffs do better"; a fresh reviewer finds more than the builder.
  **Applies to** all. **Check** round counter in the run log. **Source** Impeccable SKILL.md [verified-local].

- **RULE** Capture validity before critique: settle or disable entrance animation first, capture full-page from the document top, open every file and confirm it shows what its name says. An invalid capture invalidates the review.
  **Why** An element hidden by animation timing reads as missing and gets "fixed" into a regression.
  **Applies to** render-and-check. **Check** screenshot sanity (no blank/black regions; non-zero variance). **Source** Impeccable new-work.md.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Evaluator iterations | 5-15 per generation; up to ~4 h wall time | Anthropic harness [fetched] |
| Seed challengers per roll | 6 (2 per tier x 3 tiers); candidates considered 5-7; 3 dealt at surface scope | Impeccable concept-seed.mjs / new-work.md [verified-local] |
| Impeccable direction contract | <= 150 words, 5 short blocks | new-work.md |
| Hallmark | 21 macrostructures, 21 themes (sources say 20-21), 57/58 gates + pre-emit self-critique scoring Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety 1-5 (<3 forces revision; stamp e.g. `P5 H4 E5 S4 R5 V5`); must differ from last 3 log entries | Hallmark README/summaries [fetched/secondary] |
| taste-skill dials | DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 4 by default; presets SaaS landing 7/6/4, agency 9/8/3, premium consumer 7/6/3, designer portfolio 8/7/3, developer portfolio 6/5/4, editorial 6/4/3, public sector 3/2/5; variance 4-10 collapses to single column < 768px | taste-skill SKILL.md [fetched]. Dials are numeric so output can be self-checked; the numbers are preference, not evidence |
| Anthropic aesthetics prompt | ~400 tokens, delivered as a skill loaded on demand | Anthropic blog [fetched] |
| Superdesign loop | 6 steps; 3 hero variants; 2-4 feature sections of different sizes; "4+ of 6 generic tells = average page" (heuristic, unsupported) | superdesign.dev [fetched] |
| Linear theme inputs | 98 -> 3 variables (base, accent, contrast), LCH | linear.app [fetched] |
| Geist | 9 weights, 825 sans + 852 mono glyphs, 9 stylistic sets, 368 languages | basement.studio [fetched] |
| Stripe exploration speed | ~20 ideas vs ~2 with AI | [secondary, unverified] |

## 4. Dos and Don'ts

| Don't | Do |
|---|---|
| Re-roll the whole page with a longer prompt (yields another average page) | Keep what works; fix the promise first (30-second headline edit is "fastest single change" per Superdesign), break the default hero, make features specific and asymmetric, constrain visual system, reorder for the argument, generate 3 hero variants and branch from the strongest |
| Ask "make it more premium / cleaner" | Make a concrete decision; negotiating vibes signals no design decision was made (Superdesign) |
| Install another broad "taste" skill and hope | Add the missing capability: dice, ledger, evaluator, fingerprint compare (Larpo 2026-09-01 conclusion, now corroborated by Hallmark/Impeccable architecture) |
| Trust "I removed the tells" | Run the detector and the guess-the-aesthetic blind test (category alone; category + avoidance) |
| Put rules only in prompt text | Make them executable: hook that scans edits (Impeccable supports Claude Code, Copilot, Codex, Cursor, Grok Build hooks; exit 2 when primary findings exist) so a failing scanner cannot be ignored (claim from capitalandcompute.net, README-sourced, [secondary]) |

## 5. Exceptions & judgement calls

- **Persuade vs Operate.** Impeccable splits Persuade/Operate/Read/Experience and says Operate surfaces (dashboards, tools) are "well served by system stacks and workhorse UI faces; ... brand lives in precise details". Do not force dice-driven novelty onto a product UI whose users need familiar affordances. Hero-level divergence is for Persuade/Experience.
- **The standing exit.** Impeccable always offers "the category standard, played straight" as one quiet permanent alternative the *user* may choose, never recommended by the agent; if taken, the canon is executed at full fidelity "without irony or smuggled quirk". Worth copying: it prevents divergence becoming a dogma that overrides a client who wants familiar.
- **Seeds can land on unviable ideas.** Impeccable requires every dealt candidate to be viable first (truth of claims, real palette, achievable within assets and performance); a candidate failing on truth is replaced *before* the roll. Randomness acts only after viability filtering.
- **Evaluator cost and drift.** 4 hours per run is not a pipeline default; use fewer iterations and the plateau rule. Judges are poorly calibrated on idiosyncratic preferences ("Artificial Hivemind" reports LMs, reward models and LM judges less calibrated on items eliciting differing individual ratings) so keep a human accept/reject in the ledger as the ground truth.
- **Image models for exploration.** Superdesign lists Nano Banana Pro, FLUX.2, Ideogram, Imagen 4 Ultra, Recraft for divergent mockups [vendor]. Image comps are not subject to the same CSS defaults but have their own (see Larpo's rejected "generated photo + one UI panel"); keep them as exploration, not final.
- **Cost of divergence.** Arc's distinctiveness hurt adoption for most users. Add a usability gate to the evaluator (Functionality criterion).

## 6. Tools, skills and repos (inventory)

| Name | What it is | Useful idea | Caution | Reliability |
|---|---|---|---|---|
| Impeccable (pbakaus/impeccable, Apache-2.0, installed v4.1.1 at ~/.agents/skills/impeccable) | One skill + ~24 commands + deterministic detector (59 rules in README; registry lists more) + live browser iteration + hooks; Rust engine, Node shim | `concept-seed` dice, PRODUCT.md/DESIGN.md split, `detect <url>` on rendered DOM via Chrome, finish-reviewer sub-agent, craft-floor, direction contract | Hooks run outside tool-approval and can download an engine binary; review before enabling. One author's taste. Its rules already flag Geist/cream so it will flag Larpo's grammar | High for mechanics [verified-local] |
| Anthropic frontend-design skill (anthropics/claude-code plugin; anthropics/skills) | ~400-token aesthetics guidance as a skill; newer text adds plan/review/build, copy rules, restraint, defaults-to-avoid | Plan -> review-against-default -> build; "remove one accessory" | General foundation; its own avoid-list may lag the next wave | High (primary) |
| taste-skill (Leonxlnx; MIT; 9-10 variants incl. image-to-code, redesign, minimalist, brutalist, stitch) | Numeric dials, hard hero/layout caps, banned copy/production tells, icon/image rules | Numeric self-checkable caps; strict pre-flight list; image-per-section workflow | Recommends Geist and cream-family palettes; a convergence source (Core idea 4). Opinion not evidence | Medium |
| Hallmark (Nutlope; MIT; Together AI) | build/audit/redesign/study verbs; 21 macrostructures; fingerprint stamp + log; 57/58 gates | Ledger-based anti-repetition; `study` extracts macrostructure/type pairing/colour anchor from a URL/screenshot to `design.md` | Gate list not inspected | Medium-high (popular, MIT, rules unread) |
| design-slop-cop (AdrianKrebs; MIT) | 14 Playwright DOM/CSS pattern checks, score 0-100 | Cleanest minimal detector architecture; per-pattern files with `extract` + thresholds | Small, 5-10% FP | Medium-high |
| avoid-ai-design (funboy322) | Audit/rewrite skill, `detect.mjs` no-LLM scanner, exit code 2 on P0/P1 (claimed) | CI-gate pattern | 81 stars, unverified | Low-medium |
| Gesso anti-slop (gesso-build/skills) | 73 rules, regex + markup parse, auto-fixes; reported to run on rendered HTML | Auto-fix per rule | Not inspected | Low-medium |
| no-slop-ui, anti-slop-design, Anti-AI-UI, signs-of-ai-design, design-distinctive-ui, frontend-agent-skills, anti-ai-slop-skills | Rule-list skills | Cross-check sets | Heavy overlap (Larpo 2026-09-01 already reviewed) | Low |
| NXION Design Divergence Engine (mcpmarket listing; zoeyefe/nxion-skills) | Requires a "Divergence Contract" over 12 "Design DNA axes" (spatial grammar, hero topology, typography regimes, motion, interaction models) + ban lists + archetype collision + bespoke copy constraints, before code | Same shape as Larpo's divergence matrix; no randomisation | Page lacks contract fields; repo not read | Low |
| awesome-design-md (VoltAgent) + Google Stitch DESIGN.md | Brand design-system markdown files extracted from real sites (Stripe, Vercel, Linear, Cursor ... 59-70+ sites; sources disagree), sections: visual theme, colour roles, type hierarchy, component states, layout, depth, do/don't, responsive, agent prompt guide | Concrete references an agent can obey instead of adjectives; an experiment rebuilt Stripe/Linear/Vercel as spec files and the generated pages differed from each other "with surprising precision" tracking the source differences (opendesigner.io, secondary) | Cloning a reference becomes the template ("everything looks like Linear"); use for rule extraction (triad) not page cloning | Medium |
| ui-skills (ibelick; MIT) incl. baseline-ui | Small review skills (Tailwind, a11y, animation <= 200ms, text-balance, tabular-nums) | Quick deslop pass | Not a divergence tool | Medium |
| Claude Design (Anthropic Labs, research preview) | Canvas tool; inherits org design system; official help says attach real examples ("a finished landing page ... tells Claude more about a brand's feel than a palette alone") | Real-example anchoring | Source of the "Claudian sameness" look if used without a system | Medium |
| Verbalized Sampling prompts | Text prompt pattern | Distribution prompting | Design transfer untested | Medium (peer-reviewed venue) |

## 7. Open questions

- E-1 (eval): Re-run Larpo's seven r5 prompts with (a) current pipeline, (b) +Impeccable-style external dice for direction index, (c) +ledger rule (differ from last 3), (d) +evaluator loop. Measure detector tell-count and batch fingerprint distance (detector note, Part B). Hypothesis: (b)+(c) account for most of the divergence gain.
- E-2 (eval): Distribution prompting vs single-answer prompting for "propose 8 art directions". Metric: number of distinct values on the divergence-matrix axes (hero class, structure, type voice, palette temperature, CTA grammar, proof mode, logo mechanism, signature behaviour) per 8 proposals, across 5 briefs.
- E-3 (eval): "Constraint-system" prompts (Qt-like): does a strict named native system (e.g. a strict instrument/notation vocabulary) reduce detector tells and raise human accept rate in the ledger? Single-author anecdote only so far.
- Hallmark's gate list and Impeccable's remaining ~45 rule bodies were not read in full; do before importing wholesale.
- Locomotive / Active Theory / Basement process evidence was not reachable; commission a targeted pull of their Awwwards/Codrops/FWA case-study "credits and process" pages and conference talks (KIKK 2021 Active Theory talk exists) if studio method matters for the engine.
- Does external dice hurt client trust when the brief implies a conventional look? Keep the "standing exit".
