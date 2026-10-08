---
source: web:https://claude.com/blog/improving-frontend-design-through-skills, web:https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics, web:https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md, web:https://www.anthropic.com/engineering/harness-design-long-running-apps, web:https://www.adriankrebs.ch/blog/design-slop/, web:https://github.com/AdrianKrebs/design-slop-cop, web:https://github.com/pbakaus/impeccable, web:https://github.com/Leonxlnx/taste-skill, web:https://superdesign.dev/blog/why-ai-design-looks-generic, web:https://capitalandcompute.net/blog/fix-ai-slop-design/, web:https://pxlnv.com/linklog/claude-aesthetic/, web:https://www.ibtimes.sg/why-so-many-ai-built-websites-are-starting-look-same-91292, web:https://arxiv.org/abs/2603.13036, web:https://arxiv.org/abs/2510.01171
chapter: Why AI sites look like AI - mechanism, tells, evidence, and what it means for the Larpo grammar
pages: n/a (web)
topic_tags: [ai-slop, convergence, tells, typography, color, layout, copy, evidence, source-ledger]
status: studied
---

# Why AI-generated sites look like AI (mechanism, tells, evidence)

Companion notes: `anti-ai-slop-process.md` (techniques that force divergence, tools and repos, studio evidence) and `anti-ai-slop-detector.md` (measurable AI-tell detector spec). Larpo already holds `anti-ai-design-playbook-2026-08-28/` and `2026-09-01-hero-divergence-and-design-research.md`; this note does NOT repeat their taxonomy (eyebrow, pill nav, spectacle headline, atmosphere stacking, template waterfall, transplant test, divergence matrix, reference triad, screenshot similarity check). It adds mechanism, measured thresholds, an ecosystem-level finding, and process evidence they lack.

Reading conventions: `[verified-local]` = read in source/files on this machine. `[fetched]` = WebFetch of a primary page (summarised by a small model, so quotes are short and numbers should be re-checked before they become canon). `[secondary]` = someone else's report of the primary. `[engine note]` = my inference, not in a source.

## 1. Core ideas

1. **The cause is distributional, not a missing instruction.** Anthropic's own write-up names it "distributional convergence": models sample from the high-probability centre of web training data, where safe, universal choices dominate; unguided output is therefore recognisable and dismissible. [fetched: claude.com/blog/improving-frontend-design-through-skills]. A NeurIPS 2025 best-paper result ("Artificial Hivemind") finds the effect is also *inter-model*: different models give strikingly similar open-ended outputs [secondary search summary; abstract only]. So switching model or provider does not fix it.
2. **The root of the "mode" is partly human preference data.** Verbalized Sampling (Zhang, Yu, Chong, Sicilia, Tomz, Manning, Shi; arXiv 2510.01171) argues mode collapse is driven by "typicality bias" in preference data (humans prefer familiar text), and that asking for a *distribution* of answers recovers diversity. Tested on writing/dialogue/QA, not on design. [secondary + abstract; design transfer is an `[engine note]` hypothesis].
3. **Every anti-slop fix becomes the next slop (the replacement trap, now with evidence).** The first-wave tells were Inter + purple/indigo gradient + centred hero + three icon cards. The "fix" of warm cream ground + high-contrast/italic serif + terracotta accent became the second wave. The New Yorker (Kyle Chayka) reportedly calls the Claude-Design look as recognisable as em-dash tics: warm off-white grounds, rust-orange accents, large italic serif headlines, letter-spaced subheads, ticker-style text bars [secondary: pxlnv.com quoting the article; ibtimes.sg]. Anthropic's current frontend-design SKILL.md itself lists "warm cream background, high-contrast serif, terracotta accent (near #D97757)" and "near-black with one acid-green or vermilion accent" as *defaults to avoid* [fetched raw SKILL.md]. Anthropic's cookbook admits "you still tend to converge on common choices (Space Grotesk, for example)" [fetched].
4. **Skill ecosystems are a convergence source.** `[engine note, evidence below]` Taste-skill's typography section names **Geist** as a *preferred* font ("Preferred: Geist, Outfit, Cabinet Grotesk, Satoshi"), pairs "Geist + Geist Mono", and offers "Cobalt and Cream" and "Terracotta and Slate" as palette *alternatives to rotate* [fetched raw taste-skill SKILL.md]. Impeccable v4.1.1 (installed locally) lists `geist`, `fraunces`, `instrument serif/sans`, `plus jakarta sans`, `space grotesk`, `mona sans`, `recoleta` in its OVERUSED_FONTS and has a `cream-palette` rule [verified-local]. Larpo's observed grammar (Geist everywhere, cream/coral/cobalt/dark) is almost exactly the intersection of what popular "anti-slop" skills recommend and what newer detectors flag. Lesson: any list of "good alternatives" shipped to many agents becomes the new default for all of them.
5. **Per-element rules cannot see macro-sameness.** Every rule in the public detectors is page-local (font X, shadow Y). Larpo's batch looked the same because the *combination* (headline size band, edge padding, nav archetype, control shape, proof format, palette) repeated. No published detector measures cross-page fingerprint distance; the nearest practice is Hallmark's persistent `.hallmark/log.json` + in-CSS stamp that forces the next build to differ from the last three (see process note). This is the gap the detector spec fills.
6. **The sameness is largely the Tailwind/shadcn/Inter/Lucide stack plus the median of 2019-2024 SaaS pages.** Widely repeated causal story: Tailwind UI's `bg-indigo-500` default spread through tutorials into training data (indigo-500 #6366F1, violet-500 #8B5CF6, purple-500 #A855F7). The Adam Wathan "apology" tweet is reported by several secondary pieces but I could not retrieve the original, and view counts conflict (1M vs ~68k). Treat as plausible folklore, not established. [secondary: superdesign.dev, prg.sh, search summaries].
7. **Direct vendor-neutral measurement exists for one population.** Adrian Krebs scored recent Show HN landing pages with deterministic Playwright DOM/CSS checks (no screenshots, no LLM): 1,590 submissions scored; 22% High (4+ patterns), 32% Medium (2-3), 46% Low (0-1); manual QA false-positive estimate 5-10% [fetched adriankrebs.ch]. The repo README uses 14 patterns and different tier cut-offs (5+ High, 3-4 Medium, 1-2 Low, 0 None; score = round(100 x flagged/total)) [fetched github]; the blog text says 15/16 patterns. Use the repo, not the blog, for exact criteria.
8. **Slop is a layer, not a style.** An HN author (204 pts, "Slightly reducing the sloppiness of AI generated front-end") restyled one app under many named design directions and found slop persisted in all of them; only "make it look like a Qt app" removed most of it [fetched via prismix mirror; comments not available]. Reading: a named *constraint-heavy native design system* (strict widgets, density, no decoration) beats an adjective brief. Superdesign repeats this and frames it as one-word taste direction with no reusable spec [fetched]. Subjective, single-author, one app. Useful as a hint about constraints, not as a rule.
9. **Process failure is conflation.** Superdesign's diagnosis: one prompt is asked to set taste, explore options and write the final spec, so each step is left open and the model averages. Fix = separate (a) taste direction, (b) divergent exploration, (c) pin the winner in a reusable spec [fetched; vendor with a product to sell, but the separation is sound].
10. **Design-homogenization research agrees on the remedy but has no numbers.** "Interrogating Design Homogenization in Web Vibe Coding" (Shin et al., arXiv 2603.13036) is a conceptual/qualitative paper (63 sources, 6 tools walked through, no measurements). Its recommendations: reflective prompting that shows alternative cultural mood boards *before* code; anchor generation in tokens/brand/live URL and flag generic conventions in feedback; "productive friction" (trade speed for reflection) [fetched].

## 2. Rules

Format per SCHEMA. Rules marked **[new]** are not in the Larpo playbook or 2026-09-01 note. `Check` columns reference `anti-ai-slop-detector.md` ids.

- **RULE [new]** Do not use a font or palette because an "anti-slop" list recommended it. For every typeface and every ground/accent pair, check it against the current overused sets (Section 3) and against the last N builds; a recommendation list is a prior, not a decision.
  **Why** The anti-slop skill ecosystem seeds Geist, "cobalt and cream", "terracotta and slate" into thousands of agents (Core idea 4).
  **Applies to** all. **Check** D-FONT-1, D-COLOR-3, B-AXIS-*. **Source** taste-skill SKILL.md; Impeccable OVERUSED_FONTS.

- **RULE [new]** Ban lists must always be paired with a positive, specific, non-listed destination derived from the brief's own world; never "avoid X" alone.
  **Why** Negative-only instruction relocates the mode (Space Grotesk after Inter; terracotta after purple; Anthropic cookbook line quoted above). Impeccable's self-check: "if someone could guess your aesthetic from the category alone, or from category-plus-avoidance, rework until neither answer is obvious" [verified-local, reference/new-work.md].
  **Applies to** all. **Check** visual + guess-the-aesthetic blind test (process note P-7).

- **RULE [new]** Treat the cream ground, italic/high-contrast serif display, and terracotta/coral accent as ONE combined tell, and near-black + single neon accent as a second. Allowed only if the brief pins it; otherwise the free axis must not be spent on them.
  **Why** Named by Anthropic's own skill, Impeccable ("cream-palette" rule + "calibration" paragraph), and press coverage of "Claudian sameness".
  **Applies to** landing page. **Check** D-COLOR-3 (cream bg test), D-FONT-3 (italic serif H1). **Source** Anthropic SKILL.md; Impeccable reference/new-work.md; pxlnv.com.

- **RULE [new]** Keep display tracking at or above -0.04em (prefer -0.02 to -0.03em) and display size at or below 96px (6rem); a full-sentence H1 at >=72px that covers >=28% of viewport height or >=25% of viewport area is flagged.
  **Why** Impeccable craft-floor: "display max 6rem, tracking floor -0.04em"; its detector fires `extreme-negative-tracking` at <= -0.05em and `oversized-h1` at >=72px with >=40 characters and viewport dominance. Larpo's observed -0.052 to -0.064em at 62-83px sits on the wrong side of both.
  **Applies to** landing page. **Check** D-TYPE-1, D-TYPE-2. **Source** [verified-local] impeccable reference/craft-floor.md and scripts/detector/rules/checks.mjs.

- **RULE [new]** No tracked all-caps eyebrow/kicker, no "WORD - fragment" labels, no middle-dot meta strings, no arrows appended to links and buttons, no monospace small labels as decoration, unless they encode real information.
  **Why** Anthropic SKILL.md lists these as "template chrome". Impeccable `kicker-above-heading` is an outright ban ("no brief earns it back"). The reflexive arrow on the CTA is on Anthropic's list and was one of the rejected-yet-recurring Larpo items.
  **Applies to** landing page. **Check** D-LAYOUT-5, D-CTA-1. **Source** Anthropic SKILL.md [fetched]; Impeccable registry [verified-local].

- **RULE [new]** Do not accent a single word in the headline by switching font, italicising, or recolouring it.
  **Why** Anthropic SKILL.md names it a tell; slop-cop `hero_font_mix` fires when the biggest heading near the top mixes two families, roman+italic, or two text colours (min 32px, <=140 chars).
  **Applies to** landing page. **Check** D-TYPE-3. **Source** SKILL.md; slop-cop src/patterns/hero-font-mix.js.

- **RULE [new]** Count tells per page and per batch; use pattern-count tiers (0-1 / 2-3 / 4+) as a triage signal, not a score to maximise.
  **Why** In 1,590 Show HN pages 22% hit 4+ patterns; tiers are what the only open measurement used. False-positive rate 5-10%, so a single hit proves nothing.
  **Applies to** all. **Check** run detector (Section 3 of detector note). **Source** adriankrebs.ch.

- **RULE [new]** A page where **three or more sections end on a short rebuttal or manufactured contrast** ("X. No Y.", "Not a feature. A platform.", "Stop guessing. Start winning.") fails the copy check; one is fine.
  **Why** Impeccable `aphoristic-cadence`; ban lists across several secondary sources flag "It's not X, it's Y", "No fluff. No filler. Just results.", manufactured-suspense hooks ("The secret?", "Here's the thing"), and openers ("In today's fast-paced...").
  **Applies to** all copy. **Check** D-COPY-1..4. **Source** Impeccable registry [verified-local]; Gartner community and other lists [secondary, anecdotal].

- **RULE [new]** Numbers must be sourced or labelled sample. "Fake-perfect" stats (`99.99%`, `4.1x`, `10K+ users` rows) are tells.
  **Why** taste-skill bans fake-precise numbers; slop-cop `stat_banner_row` (3-6 sibling cards, number font >=22px, text <=10 chars, row >=300px wide); Anthropic SKILL.md: don't default to big number + small label + supporting stats + gradient accent.
  **Applies to** landing page. **Check** D-LAYOUT-6. **Source** all three [fetched].

- **RULE [new]** Do not add a FAQ accordion, numbered 1-2-3 steps, or a logo/stat strip by template habit; add only if the visitor's actual objection requires it.
  **Why** Both are slop-cop patterns (`faq_accordion`: >=3 `<details>` or "FAQ"-headed uniform question items in the lower half; `numbered_steps`: >=3 ascending numeric markers). Larpo's playbook covers the template waterfall in prose; these are the measured forms.
  **Applies to** landing page. **Check** D-LAYOUT-7, D-LAYOUT-8. **Source** design-slop-cop.

- **RULE [new]** Style the browser-owned surfaces: text selection, caret, scrollbars, focus ring, underline offset, tabular numerals.
  **Why** Impeccable craft-floor: the cheapest signal that a page was built rather than assembled, "the one models skip most reliably". Not on any other list.
  **Applies to** all. **Check** D-CRAFT-1 (`::selection`, `caret-color`, `scrollbar-color/width`, `text-underline-offset`, `font-variant-numeric: tabular-nums` present in computed/stylesheet rules). **Source** [verified-local] reference/craft-floor.md.

- **RULE [new]** Pick light vs dark from a physical use scene (who, where, ambient light), not from category.
  **Why** Impeccable: "Dark or light is never a default." Perma-dark + grey body is a slop-cop pattern.
  **Applies to** landing page. **Check** visual; D-COLOR-4 for the grey-on-dark half. **Source** Impeccable craft-floor + slop-cop perma-dark-mode.js.

## 3. Numbers & scales

### 3.1 Overused sets (as of the sources' dates, Oct 2026)

| Set | Members | Source |
|---|---|---|
| Impeccable OVERUSED_FONTS | inter, roboto, open sans, lato, montserrat, arial, helvetica, fraunces, instrument sans, instrument serif, geist, geist sans, geist mono, mona sans, plus jakarta sans, space grotesk, recoleta (brand-owned domains exempt: geist on vercel.com/nextjs.org/v0.app, mona sans on github.com) | [verified-local] scripts/detector/shared/constants.mjs |
| Impeccable new-work "training-data defaults" (display) | Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans | [verified-local] reference/new-work.md |
| slop-cop `slop_fonts` | Space Grotesk, Instrument Serif, Fraunces, Bricolage Grotesque, Sora, Young Serif, Bodoni, Syne (fires if >=25% of text or the heading font) ; README prose also names Geist | [fetched] src/patterns/slop-fonts.js |
| slop-cop `center_aligned_hero` generic sans | Inter, Inter Variable, -apple-system, system-ui, ui-sans-serif, Helvetica, Helvetica Neue, Arial, DM Sans, Plus Jakarta Sans, Manrope, SF Pro Display | [fetched] src/patterns/centered-hero.js |
| taste-skill banned-as-default serif | Fraunces, Instrument Serif | [fetched] |
| taste-skill banned premium-consumer hexes | bg #f5f1ea #f7f5f1 #fbf8f1 #efeae0 #ece6db #faf7f1 #e8dfcb; accent #b08947 #b6553a #9a2436 #9c6e2a #bc7c3a #7d5621; text #1a1714 #1a1814 #1b1814 | [fetched] |
| Anthropic SKILL.md default-look #1 | cream ground (~#F4F1EA per secondary), high-contrast serif, terracotta ~#D97757 | [fetched] |
| Anthropic SKILL.md default-look #2 | near-black ground + one acid-green or vermilion accent | [fetched] |
| Anthropic SKILL.md default-look #3 | broadsheet: hairline rules, zero radius, dense columns | [fetched] |

### 3.2 Measured thresholds (use directly in the detector)

| Check | Threshold | Source |
|---|---|---|
| cream background | min(r,g,b) >= 209, r >= g >= b, 6 <= (r - b) <= 48 | Impeccable checks.mjs `isCreamColor` [verified-local] |
| crushed tracking | letter-spacing <= -0.05em on text with > 20 chars | checks.mjs [verified-local] |
| craft floor tracking | >= -0.04em; -0.02 to -0.03em "usually reads better" | craft-floor.md |
| oversized H1 | font >= 72px AND >= 40 chars AND (height >= 0.28 viewport or area >= 0.25 viewport) | checks.mjs constants [verified-local] |
| display ceiling | 6rem (96px) | craft-floor.md |
| flat type hierarchy | >= 3 distinct sizes and max/min < 2.0 (Impeccable runtime note says aim for >= 1.25 between steps) | checks.mjs [verified-local] |
| monotonous spacing | >= 10 spacing declarations (rounded to 4px), one value > 60% and <= 3 distinct values | checks.mjs [verified-local] |
| em-dash saturation (advisory) | >= 8 em-dashes (or --) at roughly 1 per 500 chars of body text | registry [verified-local] |
| card radius | 12-16px; pills only for small controls; declare elevation once (border OR shadow; "ghost card" = 1px border + wide soft shadow) | craft-floor.md |
| side-stripe | colored border-left/right > 1px on cards/callouts, or ::before/::after stripe 2-10px, full-edge ratio >= 0.6, saturation >= 0.2, elements >= 40x20 | craft-floor + slop-cop accent-stripe.js |
| glassmorphism | backdrop-filter blur >= 2px, background alpha 0.02-0.9, element 150-820 wide and 40-900 tall, excluding sticky edge bars (20px) | slop-cop glassmorphism.js |
| coloured glow | non-grey box-shadow with blur >= 15px, trigger count >= 2 | slop-cop colored-glows.js |
| gradients | hero H1 with background-clip:text + gradient, or >= 4 elements with gradient backgrounds | slop-cop gradients.js |
| headline pill/eyebrow | label 40-600 x 16-56px within 220px above the H1, text 3-80 chars, bg alpha >= 0.05, border >= 1px at alpha >= 0.15; or uppercase tracked text <= 320px wide | slop-cop hero-eyebrow-pill.js |
| perma-dark | dark surface luminance < 0.2; fires when >= 12% of body text (12-20px, weight <= 600) is < 7:1 contrast on it (>= 20% in the dark-hero-on-light-page fallback) | slop-cop perma-dark-mode.js |
| emoji nav | >= 40% of >= 3 sidebar links carry an emoji | slop-cop sidebar-emoji.js |
| type measure | body 65-75ch; < 80 chars max (Anthropic) | craft-floor; SKILL.md |
| contrast | body/placeholder >= 4.5:1, large >= 3:1 | craft-floor |
| hero density (opinion, taste-skill) | headline <= 2 lines desktop; subtext <= 20 words and <= 4 lines; <= 4 text elements; hero top padding <= pt-24; `text-7xl/8xl` never on headlines > 6 words | taste-skill 4.7 [fetched] |
| layout repetition (opinion, taste-skill) | eyebrow count <= ceil(sections/3); zigzag image+text split max 2 in a row; >= 4 distinct layout families in 8 sections; max 1 marquee | taste-skill 4.7, 5 |
| nav (opinion, taste-skill) | one line at lg (1024px); height <= 80px (default 64-72px) | taste-skill |
| Anthropic extreme-contrast type (opinion) | weights 100/200 vs 800/900 not 400 vs 600; size jumps of 3x+ not 1.5x | cookbook [fetched] |

### 3.3 Frequencies

| Stat | Value | Source |
|---|---|---|
| Show HN pages scored | 1,590 (blog intro says ~1,400) | adriankrebs.ch |
| High / Medium / Low | 22% (347) / 32% (508) / 46% (735), tiers 4+/2-3/0-1 | adriankrebs.ch |
| Earlier 500-page run (Korean write-up, secondary) | 21% 5+ patterns, 46% 2-4, 33% 0-1 | wikidocs.net summary [secondary] |
| False positives | 5-10% (about 150 hand-labelled sites per README) | repo README |
| Impeccable detector rule count | 59 (v3.3.0 release notes: 58; installed v4.1.1 registry lists ~70 entries incl. quality + design-system drift rules) | [fetched]/[verified-local] |
| Impeccable concept diversity measure | "30/35 identical concepts across 16 prompt framings; the model cannot roll its own dice" | concept-seed.mjs header [verified-local] |

## 4. Dos and Don'ts

| Don't (tell) | Do instead |
|---|---|
| Same radius (16px) and padding (24px) on every element, equal card heights | Vary weight, proximity and size so the primary element is bigger, closer, heavier; secondary recede (Canatselis, hey.com) |
| Reaching for a "premium" palette from a recommended list | Derive the palette from the subject's materials and use scene; Naz Hamid reportedly drew his from "blueprints, indigo dyes, selvedge denim" after the Chayka piece [secondary: bubbles.town] |
| Display face = whatever the skill said was safe | One display face that carries the personality + one readable body face, applied by role (Resend: Domaine Display Narrow for large editorial headlines only, never in product; Favorit for headings; Inter for body/UI; CommitMono for code; sentence case everywhere incl. buttons and nav) [fetched resend.com/design/brand/typography] |
| Stock copy ("Scale without limits", "Your all-in-one platform", mad-lib "The AI-powered X for modern Y") | A line the founder would say aloud; outcome + number + named workflow ("Cut reconciliation time from 6 hours to 30 minutes" beats "transform your workflow") [hey.com; secondary copy guides] |
| Stock section order hero-logos-features-testimonial-pricing-CTA | Reorder to the argument; put proof before features if it is stronger (Superdesign step 5) |
| Emoji/unicode glyphs as icons | One real icon family, one stroke weight (Impeccable; taste-skill) |
| Image hover scale/rotate, bounce/elastic easing, pulsing "live" dots, auto-marquee | One authored motion moment; state-driven motion only (Impeccable `image-hover-transform`, `bounce-easing`, `pulsing-dot`, `marquee`) |
| Decorative radial halo / spotlight / dark glow / repeating-stripe / grid-line backgrounds | Solid or subtly shifted ground; texture only from the subject's world (canvas, map, blueprint) |

## 5. Exceptions & judgement calls

- **Detectors measure frequency, not fault.** Impeccable's README states a clean run is "evidence, not proof". Krebs's checks carry a 5-10% false-positive rate and he excludes sticky nav/footer blur because Linear, Vercel and GitHub use frosted headers legitimately. A tell is only a tell when unreasoned and clustered.
- **The brief outranks the list.** Impeccable: "Honor pinned aesthetics, eras, materials, fonts, and palettes even when they conflict with a saturated-pattern warning." Anthropic SKILL.md: "When the brief explicitly asks for one of these looks, follow the brief." Do not redirect a clear client brief to our taste.
- **Distinctive is not the same as exotic.** Linear's 2024 UI redesign kept Inter (Inter Display for headings), simplified theme generation from 98 variables to three (base, accent, contrast) in LCH, and attributes quality to alignment, hierarchy and density [fetched linear.app/now/how-we-redesigned-the-linear-ui]. Resend uses Inter for body. The studios that look distinctive do not win on the font alone; they win on a system with roles, restraint and rigour. Critics of "Linear-style" imitation argue copies keep the dark/gradient/glow surface and lose the restraint [secondary: rectangle.substack.com "The Linear effect", search summary; original not read].
- **Open-sourcing a bespoke face turns it into a default.** `[engine note]` Geist was commissioned from basement.studio as "a bespoke typeface that would resonate with [Vercel's] brand values" and released free/open-source (references: Univers, SF Mono, SF Pro, Inter, Suisse International; 9 weights, 825 sans + 852 mono glyphs, 368 languages) [fetched basement.studio]. Free + good + Vercel-adjacent = ubiquitous in AI output, and now flagged by detectors on non-Vercel domains. A face is "distinctive" only relative to how few other sites use it.
- **Human-made signalling is a counter-trend with limits.** 2026 trend pieces (Canva "Imperfect by Design", Landor "Anti-AI Crafting": "the marks of the maker become signal") push visible hand marks, custom type, candid photography [secondary, mostly agency blogs; the "73% of consumers can spot AI" statistic is unsourced, do not use]. They also warn it suits poorly where trust/clarity is first (health, finance) and that imperfection must look chosen. Crafted imperfection is itself a style that models will absorb; do not treat it as an exit.
- **Wording side effects.** In Anthropic's evaluator harness, adding "the best designs are museum quality" pushed outputs toward one visual convergence [fetched]. Adjectives in a criteria prompt are steering inputs; test them.
- **Qt finding is thin.** One author, one app, subjective. Do not generalise to "make it look like Qt"; generalise to "give the agent a real, opinionated, constraint-rich system to obey".

## 6. Figures worth keeping

n/a (no page images). Artifacts worth saving into `examples/`: (a) a screenshot set of the same brief rendered by 3 agents under the 2024-style default (Inter/purple), 2025 default (cream/serif/terracotta) and Larpo's current grammar (Geist/coral/cobalt) to calibrate the eye; (b) the Impeccable detector JSON output for each of Larpo's seven r5 concepts, as a baseline.

## 7. Open questions

- **Source reliability, one line each (most to least reliable):**
  - [verified-local] Impeccable v4.1.1 source (Apache-2.0): deterministic code, strongest for thresholds; by one author (Paul Bakaus) so the *selection* of rules is one person's taste; rule ids in its registry are authoritative, README counts differ by version.
  - Anthropic blog + cookbook + SKILL.md + harness article (primary, vendor): authoritative on mechanism and its own prompts; SKILL.md text was read via WebFetch of the raw file, so verify wording before quoting; the "September 2026 update" date and the cream/terracotta passage history could not be confirmed (a mirror dated 2026-07-26 already had the passage).
  - Krebs / design-slop-cop (primary, independent, MIT): good method, small repo (17 stars), counts inconsistent between blog (15/16 patterns, 4+ High) and README (14 patterns, 5+ High).
  - arXiv 2510.01171, 2603.13036, NeurIPS Artificial Hivemind (peer-reviewed / preprint): credible; design relevance is by analogy; I read abstracts and the homogenization paper's method, not full results.
  - taste-skill (opinionated, 46-65k stars depending on aggregator; one author): rules are preference, not evidence; its numbers (pt-24, ceil(sections/3)) are heuristics.
  - capitalandcompute.net, 925studios, polshai, superdesign, mindstudio, ohhwells, kompozy: vendor/agency blogs, no named authors or sells a fix; used only for corroboration or for process ideas, never for numbers.
  - New Yorker / Chayka, Naz Hamid, Ethan Marcotte, Adam Wathan tweet: never read at the primary; every claim here is relayed. Do not quote.
- **Not obtained (session limit hit before fetch):** Sailop "AI Slop in 2026 (100-page report)" for frequency data; Frank Chimero "Beyond the Machine" (frankchimero.com/blog/2025/beyond-the-machine/); Linear homepage critiques (anthonyhobday.com 404'd); Codrops interviews with Basement/Locomotive/Active Theory (403). Studio process material I could reach was portfolio copy with little method (Locomotive K72 page: no process; Active Theory: only job postings). Treat the "how studios create distinctiveness" evidence as thin; see process note for what is solid (Arc, Stripe, Resend, Linear, basement).
- Is the Impeccable `cream-palette` rule (warm tint, light) too broad for legitimate warm brands? It will flag any #FAF7F2-style ground. Needs a per-brief override (config `ignoreRules`).
- Whether Verbalized Sampling transfers to design direction generation is untested; propose an eval in the process note.
- Larpo's 46-52px edge padding, 13px radius and logo-left/links-center/CTA-right nav appear in none of the published lists. They are Larpo-specific convergence. Only a cross-batch fingerprint (detector Part B) can see them.
