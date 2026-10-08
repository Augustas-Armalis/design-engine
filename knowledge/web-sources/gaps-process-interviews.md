---
source: web:https://designerfund.com/blog/ (ai-design-linear, ai-design-stripe, ai-design-anthropic, ai-design-shopify, ai-in-design-2026, embedding-design-into-the-fiber-of-fintech, the-roi-of-branding, approachable-human-design...) + https://linear.app/now/design-is-more-than-code + https://linear.app/now/output-isn-t-design + https://www.figma.com/blog/our-approach-to-designing-ui3/ + https://www.figma.com/blog/figma-pattern-library/ + https://www.figma.com/blog/updating-our-web-system-for-a-new-era/ + https://www.figma.com/blog/figma-on-figma-how-we-built-figma-dot-coms-design-system/ + https://raycast.com/blog/a-fresh-look-and-feel + https://blog.superhuman.com/superhuman-is-built-for-speed/ + https://www.inverse.com/input/design/the-browser-company-arc-design-interview
chapter: Gap fill - design-process interviews and essays (Designer Fund Craft and Practice, Linear, Stripe, Anthropic, Shopify, Figma, Raycast, Superhuman, Arc)
pages: n/a
topic_tags: [process, taste, ai-design, prototyping, design-systems, critique, change-management, ui3, performance, onboarding, brief-to-render]
status: studied
---

# Gap fill: design process from the teams that ship the best UI

Read 2026-10-08. Raw text in `corpus/web/gaps/` (df-*, linear-*, figma-*, raycast-*, superhuman-*, arc-*). Rule IDs use the prefix PI-. Labels: **[fetched]** read in the source; **(opinion)** one person's view; **[engine note]** my inference.

This file is process-heavy by nature. Rules here are phrased so the engine's brief, render and measure loop can use them: acceptance criteria, constraint of generators, linting copy, zoom reviews. Where a rule has no mechanical check the Check field says so.

Dates matter: the Designer Fund Linear, Stripe, Anthropic and Shopify case studies are August to October 2026 and describe tool habits that will change; the principles about judgement are the durable part. Several statistics come from Designer Fund's own survey (900+ designers, 60+ countries) and are self-reported.

Source quality notes. (a) Designer Fund's "Craft and Practice" category (designerfund.com/resources) lists ten pieces; I read nine. (b) The Raycast and Superhuman material is from each company's own blog; the Superhuman "100 ms" statistics (Amazon, Google) are old third-party figures quoted by the vendor and should be treated as unverified.

## 1. Core ideas

1. **Design is a search for a good fit, not a production step.** Linear's CEO frames design as searching for the form that fits a problem's forces; fast generation of plausible output is not design. Stripe's head of design uses a similar test for AI-made work: would I be proud if it took two weeks to get here? [fetched]
2. **Most design projects fail because the problem is unclear,** not because the solution is bad. People disagree on solutions because they hold different problems in mind. Write the problem, name the stakeholders, and restate the problem when presenting. [fetched, Linear]
3. **Set the criteria before the generation.** AI makes any output feel like progress; without success criteria you can never fail. [fetched, Linear]
4. **Constrain the generator with the design system.** Stripe's ProtoDash exists because off-the-shelf generation used the wrong fonts, invented components and produced what the team called blurple slop; the fix was the component library plus strict usage rules. [fetched]
5. **Automate the checkable parts of taste.** Stripe's Dante reviews screenshots and live code against content standards (sentence case, Oxford commas, en dash versus hyphen) across two to three thousand new strings a day. [fetched]
6. **Speed is a feature of the interface too.** Figma reversed floating panels because they slowed people; Superhuman sets 100 ms as the maximum and aims for under 50 ms. [fetched]
7. **Redesigns need concept, evidence and an off-ramp.** Figma took two years on UI3, reversed decisions after beta data and let users opt out; Linear finished a chrome redesign in about six weeks behind a flag. [fetched]
8. **Prototype with real components and real data.** A prototype cannot hide an awkward transition; Shopify and Anthropic designers stopped sharing static decks. [fetched]
9. **Design systems are maintained by pairs and automation.** Figma's internal system was rebuilt by a paired design/engineering team with token sync via API and Code Connect as a completion gate. [fetched]
10. **Collaboration thins when execution gets fast.** Designer Fund's survey reports collaboration decreased for 20% of respondents (5% a year earlier); teams respond with smaller, more frequent crits and demos over memos. [fetched]

## 2. Rules

### 2.1 Problem, criteria and judgement (Linear, Stripe, Designer Fund)

- **RULE [PI-01]** Start every brief by writing the problem in one or two sentences, the stakeholders and the cost of not solving it; restate the problem when presenting solutions and stop to realign if the room reacts to it.
  **Why** Different problems in different heads produce compromise solutions; feedback is hard to interpret unless you know whether people reject the solution or disagree on the problem.
  **Applies to** all. **Check** brief file has non-empty fields `problem`, `who is affected`, `if we do nothing`; verdict quotes the problem statement. **Source** https://linear.app/now/design-is-more-than-code (December 19, 2025; read 2026-10-08)

- **RULE [PI-02]** Interrogate a request instead of executing it: ask what need is behind it, what assumptions it makes and what happens if it is not built; reframe the ask as the underlying problem (Linear's wiki request was reframed as keeping team context where the work already happens).
  **Why** Customers usually ask for a solution rather than describing the pain.
  **Applies to** all. **Check** process; the brief contains at least one reframing sentence distinct from the literal request. **Source** https://designerfund.com/blog/ai-design-linear (August 12, 2026; read 2026-10-08)

- **RULE [PI-03]** Write the acceptance criteria before generating or building: what good looks like, in checkable terms. Judge each render against that list, not against a feeling that it looks plausible.
  **Why** Without criteria AI output can never fail, so you rationalise whatever comes back.
  **Applies to** all. **Check** a `criteria` list exists with timestamp earlier than the first render; the verdict maps each criterion to pass/fail. **Source** https://designerfund.com/blog/ai-design-linear (read 2026-10-08)

- **RULE [PI-04]** Use a model to gather context rather than to supply opinions, and make it argue against your direction before you commit; evaluate whether its counter-arguments are good.
  **Why** Models lean toward affirming the user, so they confirm unless told to disagree.
  **Applies to** all. **Check** process; critique step includes a "strongest argument against" entry. **Source** https://designerfund.com/blog/ai-design-linear (read 2026-10-08)

- **RULE [PI-05]** Keep copy and critique human in the loop: one Linear designer does not let AI critique her designs or write UI copy because it tends to affirm and its language feels like settling; she runs only about 20 to 30 percent of net-new design work through AI.
  **Why** Visual instincts do not translate cleanly into prompts and chat flow interrupts design flow.
  **Applies to** all. **Check** `visual` and process; (opinion, one designer). **Source** https://designerfund.com/blog/ai-design-linear (read 2026-10-08)

- **RULE [PI-06]** Sequence design in three stages and do not collapse them by default: (1) the problem, (2) the concept (the overall form, in words, on paper, in a design tool, or in throwaway code), (3) execution in production code. Throwaway code sketches are fine for exploration; production code as the first medium tends to force commitment.
  **Why** Code forces constraints early and can box you in before you know the problem.
  **Applies to** all. **Check** process; brief marks which stage each artifact belongs to. **Source** https://linear.app/now/design-is-more-than-code and https://linear.app/now/output-isn-t-design (December 19, 2025 and April 17, 2026; read 2026-10-08) (opinion, CEO's view)

- **RULE [PI-07]** Apply the "two weeks" test to generated work: would you be proud if it had taken two weeks to get here? If not, speed is an invitation to keep going, not evidence of being done. Zoom into generated imagery and check light sources, shadows and impossible structures.
  **Why** A fast first draft is easy to overvalue; Stripe critiques magnify AI images for consistency of light and shadow.
  **Applies to** all. **Check** render generated images at 200 percent and review three crops (focal, edge, hand/text); for UI, review at 200 percent for misalignment. **Source** https://designerfund.com/blog/ai-design-stripe (September 15, 2026; read 2026-10-08)

- **RULE [PI-08]** Take small, reversible "roof shots" before standardising a new pattern; let teams explore independently and consolidate once common patterns emerge.
  **Why** Standardising too early commits an organisation to yesterday's workflow.
  **Applies to** SaaS app UI. **Check** process. **Source** https://designerfund.com/blog/ai-design-stripe (read 2026-10-08) (opinion)

### 2.2 Constraining and checking generated UI (Stripe, Anthropic, Shopify)

- **RULE [PI-09]** Generate UI from the real design-system components and a short set of strict usage rules, not from free-form prompts: ProtoDash's first version was the component library plus rules, then connected to dev infrastructure so setup took under two minutes.
  **Why** Unconstrained generation picks wrong fonts, invents non-existent components and averages toward generic style.
  **Applies to** all. **Check** every rendered element maps to a known component or token; font-family values come from the token list; zero hex colours outside the token set. **Source** https://designerfund.com/blog/ai-design-stripe (read 2026-10-08)

- **RULE [PI-10]** Encode content standards as an automated reviewer: sentence-case headings, Oxford comma, en dash for ranges and hyphen only for compounds; run it on screenshots and on source code and let it propose fixes.
  **Why** Manual review becomes a bottleneck at thousands of strings a day; the system should make the right choice easy ("fall into the pit of success").
  **Applies to** SaaS app UI | landing page. **Check** copy-lint script over text nodes: title-case headings, missing serial comma, hyphen between digits; count = 0. **Source** https://designerfund.com/blog/ai-design-stripe (read 2026-10-08)

- **RULE [PI-11]** Prototype with real components and real (or realistic) data, not placeholder content; a prototype should expose awkward transitions and missing states.
  **Why** A static file glosses over a transition; a working prototype cannot.
  **Applies to** all. **Check** no lorem ipsum, no "Item 1/Item 2" strings, counts and dates varied; every interactive control has a state (hover, focus, disabled, loading, empty, error). **Source** https://designerfund.com/blog/ai-design-anthropic (October 6, 2026; read 2026-10-08)

- **RULE [PI-12]** For each feature idea, render about five variations side by side, ask for a recommendation with rationale, then make your own call; branch from the strongest and repeat.
  **Why** Breadth is cheap now; judgement is the scarce step. Anthropic's designers generate about a dozen interactive variations rather than three drafts.
  **Applies to** all. **Check** at least 3 divergent renders (different layout families) per brief; verdict states the choice and why. **Source** https://designerfund.com/blog/ai-design-anthropic (read 2026-10-08)

- **RULE [PI-13]** Reserve a regular slot (Linear's "Quality Wednesdays") to fix small imperfections: use AI to remove friction in paper cuts and edge-case prototypes, not for the core creative decisions.
  **Why** Small flaws accumulate and degrade the product; a ritual keeps the bar.
  **Applies to** SaaS app UI. **Check** process; a backlog tagged "papercut" with closed count per week. **Source** https://designerfund.com/blog/ai-design-linear (read 2026-10-08)

- **RULE [PI-14]** Bring working prototypes and before/after screenshots into critique rather than memos, and add raw customer quotes when users push back, so the room decides on evidence rather than one person's take.
  **Why** Demos spark debate faster than documents; quote synthesis separates the real problem from reaction.
  **Applies to** SaaS app UI. **Check** process; critique packet includes screenshots plus at least 3 verbatim quotes. **Source** https://designerfund.com/blog/ai-design-linear and https://designerfund.com/blog/ai-design-anthropic (read 2026-10-08)

### 2.3 Interface changes, from Figma UI3 (2024)

- **RULE [PI-15]** In dense creative or work tools prefer fixed, resizable side panels over floating panels over the working surface.
  **Why** Beta data showed floating panels cramped the canvas on smaller screens, let content peek out from behind them and moved rulers away from the work; speed was the deciding factor and Figma reversed it before general release.
  **Applies to** SaaS app UI. **Check** panels do not overlap the main content bounding box at 1280px width. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (October 1, 2024; read 2026-10-08)

- **RULE [PI-16]** Offer a "minimise UI" mode that collapses side panels while keeping tools reachable, rather than only an all-or-nothing hide.
  **Why** Hide-all was blunt; collapsing is better on small and split screens.
  **Applies to** SaaS app UI. **Check** a collapse control exists and tool bar remains reachable by keyboard in the collapsed state. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-17]** Never hide a control's current non-default state behind an icon and a tooltip; show it inline (for example a dropdown that appears once the value changes from default).
  **Why** An icon-only blend-mode control forced users to wait for a tooltip to learn the current setting and slowed workflows.
  **Applies to** SaaS app UI. **Check** controls whose value matters expose it as visible text or a visible badge; no state is conveyed only via `title` or tooltip. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-18]** Use a plain visible checkbox or toggle for a boolean property instead of a dropdown or icon toggle; each extra click for a frequent property costs more than a quiet row.
  **Why** Figma tried a toggle, icon button, menu and dropdown for "clip content" and returned to the checkbox as the clearest, fastest control.
  **Applies to** SaaS app UI | forms. **Check** boolean settings use `input[type=checkbox]` or `role=switch`, not a select with 2 options. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-19]** Show visible text labels for compact controls and make each control's accessible name match its visible label; an early minimalist labelling scheme was rejected because it would harm accessibility.
  **Why** Visible and programmatic names should agree so voice and screen-reader users can operate what they see.
  **Applies to** SaaS app UI | all. **Check** for each control with visible text, `aria-label` (if any) contains that text (WCAG 2.5.3 label in name). **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-20]** Reorder an established panel only for a measured reason: Figma moved component controls above attributes because components became central, but inverting width/height order broke muscle memory in early testing and was revised.
  **Why** Muscle memory is a cost; priority changes need evidence.
  **Applies to** SaaS app UI. **Check** process; a diff of control order versus the previous version with a note per move. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-21]** Ground every interface change in a reason that improves efficiency or coherence; interpret critical feedback by asking if it is a natural reaction to change or a lasting problem, and whether negative and positive feedback arrive in the right ratio.
  **Why** Even small changes feel like upheaval to daily users; a stated reason steadies decisions.
  **Applies to** SaaS app UI. **Check** change log entries each have a `why` field. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-22]** Roll out a major redesign with an opt-out during beta, a gradual rollout and tutorials ready before the old UI is retired.
  **Why** A user with a Friday deadline should be able to keep working in the old interface.
  **Applies to** SaaS app UI. **Check** a feature flag with user-level override exists. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

- **RULE [PI-23]** When many surfaces change at once, run 60-minute "speed round" critiques where everyone comments on every surface simultaneously, instead of 30-minute single-designer crits.
  **Why** Everyone mobilises, load-balances visual detail versus flows, and exposes the contexts a shared component must handle (the slider needed numeric values, notches and colour previews).
  **Applies to** SaaS app UI. **Check** process. **Source** https://www.figma.com/blog/our-approach-to-designing-ui3/ (read 2026-10-08)

### 2.4 Design-system practice (Figma, 2020 to 2024)

- **RULE [PI-24]** Structure tokens as primitive colour ramps by hue (steps 100 to 1000) aliased by semantic variables with modes for theme and product; add spacing and radius variables; sync tokens between the design file and code through an API and an automated pull request.
  **Why** One source of truth; new brand colours reached the product with almost no engineer time.
  **Applies to** SaaS app UI. **Check** semantic tokens reference primitive tokens only; no component uses a primitive directly; CI job exists that diffs token JSON. **Source** https://www.figma.com/blog/figma-pattern-library/ (November 21, 2024; read 2026-10-08)

- **RULE [PI-25]** Treat a component as incomplete until it has a code mapping (Code Connect in Figma's case); begin the rebuild with simple, high-usage, accessibility-relevant components (checkbox first) before multi-state ones (buttons, tabs).
  **Why** Design-to-code mapping drives adoption; momentum comes from easy wins.
  **Applies to** SaaS app UI. **Check** each component in the library lists a code import path. **Source** https://www.figma.com/blog/figma-pattern-library/ (read 2026-10-08)

- **RULE [PI-26]** Audit component usage with a script before pruning: Figma's marketing "flex" component had grown to 48 variants and was cut to 24 after seeing real usage; centred text was removed so left-aligned became the default across the web system.
  **Why** Many near-identical options make the right choice hard; defaults carry consistency.
  **Applies to** landing page. **Check** count variants per component (target at most about 24, [engine note]); `text-align:center` appears only in the hero and CTA outro. **Source** https://www.figma.com/blog/updating-our-web-system-for-a-new-era/ (read 2026-10-08)

- **RULE [PI-27]** Organise type styles by role (headline sizes and body sizes) rather than by device; name breakpoints XS to XXL and design each component at every named breakpoint; use colour-pair variables with modes instead of separate light and dark component copies.
  **Why** Reduces duplicate components and catches layout problems before code.
  **Applies to** landing page. **Check** token names contain no device words (`mobile`, `desktop`) for type; component variants for light/dark = 0 (handled by mode). **Source** https://www.figma.com/blog/updating-our-web-system-for-a-new-era/ (read 2026-10-08)

- **RULE [PI-28]** Test new buttons and CTAs in context in prototypes: Figma explored over 50 button prototypes and found that expanding-on-hover buttons failed where a layout needed consistent button width (pricing page).
  **Why** A component that works in isolation can break in a page; only in-context prototypes reveal it.
  **Applies to** landing page. **Check** `visual`; button width does not change on hover (layout-shift 0). **Source** https://www.figma.com/blog/updating-our-web-system-for-a-new-era/ (read 2026-10-08)

- **RULE [PI-29]** Allow deliberate exits from the system (for example a large centred animated homepage headline), but justify each one and assess whether it will recur; if likely, add it to the system.
  **Why** The system should serve ideas that deserve an exception without letting exceptions multiply.
  **Applies to** landing page. **Check** process; list of off-system components with reasons. **Source** https://www.figma.com/blog/figma-on-figma-how-we-built-figma-dot-coms-design-system/ (January 28, 2020; read 2026-10-08)

- **RULE [PI-30]** Inventory fonts, sizes, colours, column widths and layouts first, merge near-duplicates and keep one: Figma replaced 12 heading sizes with H1 to H3, body and technical-copy styles, plus pull-quote and block-quote styles for long form.
  **Why** Repetition reveals the real system; outliers used once do not earn a place.
  **Applies to** landing page. **Check** count of distinct heading font-sizes on the site (target at most 3 headings plus display); unique spacing values align to the scale. **Source** https://www.figma.com/blog/figma-on-figma-how-we-built-figma-dot-coms-design-system/ (read 2026-10-08)

### 2.5 Product craft from Raycast, Superhuman and Arc

- **RULE [PI-31]** Make the single most-used input the largest element in the window, enlarge the leading icon of results so they scan faster, and move a hidden essential feature (the actions menu opened with ⌘K) into an always-visible action bar that shows actions with their keyboard shortcuts for the current context.
  **Why** The search bar is the centre of the app; a feature that is easy for new users to miss should be surfaced; showing shortcuts teaches them.
  **Applies to** SaaS app UI. **Check** the primary input font-size is the largest interactive text in the window; every action in the bar shows a shortcut hint. **Source** https://raycast.com/blog/a-fresh-look-and-feel (July 19, 2022; read 2026-10-08)

- **RULE [PI-32]** Draw an icon set to shared rules: outline style, one stroke width (bolder for prominence), one set of corner radii.
  **Why** Shared rules keep a set balanced and timeless as icons are added.
  **Applies to** SaaS app UI | landing page. **Check** icon SVGs share stroke-width and stroke-linecap/linejoin; count of distinct stroke widths = 1. **Source** https://raycast.com/blog/a-fresh-look-and-feel (read 2026-10-08)

- **RULE [PI-33]** Set an interaction latency budget: treat 100 ms as the maximum and aim for under 50 ms; for rendering a new thread aim for one or two frames (under 32 ms). Measure everything you want to make fast; cache locally, preload and prerender what is likely next; keep animation minimal; offer keyboard shortcuts with in-UI hints and a command palette (⌘K).
  **Why** Superhuman builds speed as a product feature; the vendor cites older third-party figures for latency cost.
  **Applies to** SaaS app UI. **Check** measure input-to-visual-response time on core actions (INP below 100 ms; 50 ms target); `performance.measure` marks on key interactions. **Source** https://blog.superhuman.com/superhuman-is-built-for-speed/ (read 2026-10-08)

- **RULE [PI-34]** Make first-run onboarding a hands-on tutorial that delivers small wins early (game-design skill pacing) and sets the tone of the product, then design it after the main product is finished so you teach what is actually logical and what is not.
  **Why** A person should feel accomplished before they are skilled; designing onboarding last shows which parts need explaining.
  **Applies to** SaaS app UI. **Check** first-run flow has at least one completed action with visible result within the first 3 steps ([engine note] threshold). **Source** https://www.inverse.com/input/design/the-browser-company-arc-design-interview (June 7, 2022; read 2026-10-08)

- **RULE [PI-35]** When product complexity cannot be photographed (payroll, HR), use an ownable illustration and lettering language instead of stock photos, and prove a brand campaign by acting out scripts and mocking up billboards before budget exists.
  **Why** Illustration and lettering differentiate from incumbents and can express emotion where photos cannot show features.
  **Applies to** landing page. **Check** `visual`. **Source** https://designerfund.com/blog/approachable-human-design-illustrator-letterer-bring-gusto-brand-life (May 9, 2017; read 2026-10-08)

### 2.6 Brand investment (Designer Fund)

- **RULE [PI-36]** Define the success metrics for a brand or redesign project before work starts and keep a mix of short-term (conversion, hiring pipeline) and long-term (recurring revenue, recognition) goals.
  **Why** Documented metrics stop the goalposts moving when distractions arrive.
  **Applies to** landing page. **Check** brief has a `metrics` section dated before the first design review. **Source** https://designerfund.com/blog/the-roi-of-branding (read 2026-10-08)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Linear AI usage by one designer | about 20 to 30 percent of net-new design work | ai-design-linear |
| Linear customer-request repository | 40k+ requests used by the /linear-way skill | ai-design-linear |
| Stripe copy volume | 2 to 3 thousand new copy strings a day | ai-design-stripe |
| Stripe ProtoDash setup | under 2 minutes | ai-design-stripe |
| Stripe "AI-cation" days | quarterly | ai-design-stripe |
| Anthropic code authored by Claude | over 80 percent of merged code (as of May 2026) | ai-design-anthropic |
| Anthropic speed gap | engineers about 10x faster; design 3 to 5x | ai-design-anthropic |
| Anthropic crit cadence | up to 4 per week in smaller pods; standups 30 to 90 minutes | ai-design-anthropic |
| Shopify | about 60 percent of designers push code to production (+38 percent since Sept); over 5,500 live prototype sites | ai-design-shopify |
| AI in Design 2026 survey | 900+ designers, 60+ countries, 25+ interviews | ai-in-design-2026 |
| AI use | weekly use for design tasks 54% to 91%; 75% daily; average 7 AI tools (was 3) | ai-in-design-2026 |
| Shipping code | 50 percent of surveyed designers have shipped AI-generated code | ai-in-design-2026 |
| Quality bar | only 5 percent of leaders place less emphasis on execution quality | ai-in-design-2026 |
| Collaboration decreased | 5 percent (2025) to 20 percent (2026) | ai-in-design-2026 |
| Figma UI3 | worked on for more than 2 years; GA October 10, 2024; ~200 hand-drawn icons | our-approach-to-designing-ui3 |
| Figma Pattern Library | 680+ tokens; 22 component sets with 670+ variants; 5 months; 5-person pair team | figma-pattern-library |
| Figma web system | flex component 48 to 24 variants; 29-colour palette (25 as backgrounds); 50+ button prototypes | updating-our-web-system-for-a-new-era |
| Figma 2020 web system | built in a month; idea to live page in under 48 hours | figma-on-figma-how-we-built-... |
| Superhuman latency | 100 ms max; 50 ms aim; under 32 ms render | superhuman-is-built-for-speed |
| Stripe design org (2021) | 100+ designers; 5 program managers | embedding-design-into-the-fiber-of-fintech |
| Stripe long-stale login page | redesigned after nearly a decade; blocked by an extra-click concern | embedding-design-into-the-fiber-of-fintech |

## 4. Dos and Don'ts

- **Do** ask "what is the underlying problem" and write it down. **Don't** accept "add a wiki" as the brief.
- **Do** constrain the generator with the real component library. **Don't** let it invent components or fonts.
- **Do** show current state inline (Figma blend mode). **Don't** hide a changed value behind an icon with a tooltip.
- **Do** keep panels docked and resizable in a dense tool. **Don't** float them over the work.
- **Do** put the actions menu and shortcut hints in view (Raycast action bar). **Don't** bury ⌘K behind a small button.
- **Do** write criteria first. **Don't** call anything a success because it rendered.

## 5. Exceptions & judgement calls

- **Designers and code.** Linear's CEO argues for keeping conceptual stages out of production code; Anthropic requires a pull request in a designer's first week and calls code "the clay". These are compatible if stage two (concept) is protected; they are different weights on the same trade-off. The engine's pipeline, which produces code, should keep an explicit concept and criteria step before the first render (PI-03, PI-06).
- **AI for critique.** Linear's Isha Kumar avoids using AI for critique and copy (PI-05, opinion), while Karri Saarinen asks it to argue against him (PI-04). The shared position: use it as an adversary or an aggregator, not as an author or an affirming judge.
- **Latency numbers.** Superhuman states 100 ms as maximum and under 50 ms as aim; web INP "good" is 200 ms. These do not conflict (the former is a product target, the latter a platform threshold). Check against `motion-a11y-perf-loading.md` for the INP number.
- **Rule 33 and animation.** Superhuman keeps animation minimal for speed; the repo's motion notes recommend short purposeful motion. Both agree animation must never add waiting.
- **Figma's floating-panel reversal** applies to dense work tools; floating chrome is still fine in media-first or presentation contexts (Figma kept it for Slides grid view and FigJam).
- **Hiring and org items** (Shopify apprenticeship, Stripe design program management) are interesting but not UI rules; summarised only in Numbers.
- **Stripe's 2021 "20x more time" statement** is anecdotal (a former head of design describing why Stripe sites were polished). Treat as culture signal, not a benchmark.

## 6. Figures worth keeping

Figma UI3 floating versus fixed panel screenshots; the blend-mode and clip-content iteration images; the FPL token structure diagram; Raycast action bar before/after; Linear sidebar before/concept/after; Anthropic and Stripe screenshots of ProtoDash (not public). Capture later with a browser for `examples/`.

## 7. Open questions

- **Unread or blocked:** Notion public design-system essays: searches found none (Notion's blog "Tools and Craft" is mostly engineering: CRDTs, search indexer; no design-system essay surfaced; `notion.com/blog/how-to-create-a-design-system` is a how-to for readers, not Notion's own system). Not read. The Browser Company's own blog on design philosophy was not found (only the 2022 Inverse interview). Cursor's blog index has no design posts. Resend's blog has "Design Engineering an X Component" (a Satori/ImageResponse technical walkthrough, little UI-rule content) and "agent-experience"; fetched but not distilled. Shopify's case study was read; the Sierra case study was fetched but not read.
- **Dan Hollick:** see `gaps-landing-and-writing.md` section 7; makingsoftware.com sits behind a Vercel bot checkpoint that I did not circumvent.
- The Designer Fund Linear and Stripe case studies also have YouTube versions linked from the pages; not watched.
- Raycast 2.0 (May 2026) mentions Liquid Glass used "in tasteful ways" and a custom indexer for responsiveness; nothing numeric.
- Figma's "Evolving our visual language" and "Figma Sans" posts (linked from the web-system article) were not fetched.
- "Linear Method" (`linear.app/method`) returned only a short page; not studied.
- Unverified claims: Superhuman's Amazon (100 ms = 1 percent of sales) and Google (500 ms = 20 percent traffic) figures are decade-old vendor-quoted statistics; do not cite as current evidence.
