---
source: web:https://lawsofux.com/
chapter: Laws of UX (all 30 law pages, plus llms.txt index)
pages: n/a
topic_tags: [laws-of-ux, psychology, gestalt, cognitive-load, memory, attention, decision, hick, fitts, miller, jakob, doherty, peak-end, von-restorff]
status: studied
---

# Laws of UX (Jon Yablonski), studied in own words

Fetched 2026-10-08 from `https://lawsofux.com/llms.txt` and each law page (served as markdown on request). Raw text in `corpus/web/m3-nng-laws/laws/` (gitignored). The site is licensed CC BY-NC-ND 4.0, so everything below is paraphrased; no passages are copied. Credit: Jon Yablonski, lawsofux.com.

How to read each law block: one RULE (the design consequence in imperative form, with a mechanical check where one exists), then plain lines for the statement, mechanism and misuse. A law whose Check is `visual` cannot be measured by a script; use the render-and-look step.

The site itself says these are psychology heuristics, not engineering constraints. Several rules below carry numbers that the site does not give (marked `[engine note]`); the site states the principle, we add a testable threshold so the check can run.

## 1. Core ideas

1. **Two families.** (a) Perception laws (Gestalt: proximity, similarity, common region, connectedness, Prägnanz) govern how people group what they see before they read; they are the cheapest hierarchy tools. (b) Cognition laws (Hick, Miller, working memory, cognitive load, choice overload, chunking) govern how much a person can hold and decide at once.
2. **Most laws reduce to one move: do less, group more, signal clearly.** Fewer simultaneous choices, chunked content, one clearly distinct primary action, feedback quickly.
3. **Familiarity is a free resource.** Jakob's law and mental models say people bring expectations from other products; matching them costs nothing and breaking them costs learning effort.
4. **Time and emotion bend the experience.** Doherty (about 400 ms), goal-gradient, Zeigarnik and peak-end rule explain why speed, visible progress and the final moment matter more than their share of total time.
5. **Several laws are easy to turn into manipulation** (artificial progress, fake delays, dark-pattern urgency). Section 5 flags them.

## 2. Rules

### Perception and grouping

- **RULE [LUX-PROX]** Make the gap between related items clearly smaller than the gap between unrelated groups: label-to-field and heading-to-body gaps at most about two thirds of the gap between neighbouring groups. [engine note] the ratio is ours.
  **Why** Nearness is read as belonging, before any border or colour is noticed.
  **Applies to** all. **Check** for each label/field pair and heading/paragraph pair, measure the distance to its own content and to the next group; inner gap divided by outer gap is 0.67 or lower. **Source** https://lawsofux.com/law-of-proximity/

- **RULE [LUX-REGION]** To bind a group of elements, put them inside one shared boundary (border or background) and make sure nothing unrelated shares that boundary. Use a container only when spacing alone is not enough, and use it sparingly.
  **Why** Elements sharing an enclosed area are seen as one unit; it overrides weaker cues like colour or spacing.
  **Applies to** all. **Check** group members share an ancestor element with a visible border, background or shadow that non-members do not share; count of nested containers per section at most 2 `[engine note]`. **Source** https://lawsofux.com/law-of-common-region/

- **RULE [LUX-SIM]** Elements that behave alike must look alike (colour, shape, size, orientation); elements that behave differently must differ. In particular, links and nav items must be visually distinguishable from body text.
  **Why** Visual sameness is read as shared function.
  **Applies to** all. **Check** all `a` in body copy have an underline or at least 3:1 contrast against the surrounding text colour; all primary buttons share one computed background and radius; non-interactive text does not reuse the link style. **Source** https://lawsofux.com/law-of-similarity/

- **RULE [LUX-CONN]** Connect things that belong together with a visible line, frame or arrow (timelines, steppers, flow diagrams, grouped controls), and use a connector to carry the eye from one element to the next.
  **Why** A physical link is a stronger grouping cue than nearness or similarity.
  **Applies to** landing page | SaaS app UI. **Check** `visual`; for steppers, each step node is joined by a line/segment element. **Source** https://lawsofux.com/law-of-uniform-connectedness/

- **RULE [LUX-PRAG]** Prefer the simplest shape or figure that conveys the meaning; reduce illustrations, icons and layouts to one clear overall form rather than many competing parts.
  **Why** The eye resolves complex or ambiguous images into the simplest interpretation, so complexity is wasted or misread.
  **Applies to** all. **Check** `visual`; squint/blur the render (about 8 px radius) and confirm the layout resolves into two or three obvious shapes. **Source** https://lawsofux.com/law-of-pr%C3%A4gnanz/

### Memory, load and decisions

- **RULE [LUX-HICK]** Limit the number of simultaneously visible choices in any decision, split complex tasks into steps, and highlight a recommended option; do not take simplification so far that meaning disappears.
  **Why** Decision time rises with the number and complexity of alternatives.
  **Applies to** all. **Check** count of sibling choices (nav links, CTAs, plan cards, radio options) per decision group; flag more than 7 nav links, more than one primary CTA per viewport, or more than 4 pricing tiers without a highlighted default `[engine note]`. **Source** https://lawsofux.com/hicks-law/

- **RULE [LUX-CHOICE]** Where users must compare options (plans, products), provide side-by-side comparison, a featured default, and filtering or search up front instead of one long undifferentiated list.
  **Why** Too many options reduce decision quality and satisfaction with the outcome.
  **Applies to** landing page | forms. **Check** pricing section has a comparison layout, exactly one highlighted tier, and 4 or fewer cards visible without scrolling `[engine note]`; catalogues have a filter or search input. **Source** https://lawsofux.com/choice-overload/

- **RULE [LUX-CHUNK]** Break content into visually distinct groups with a clear hierarchy (modules, rules between groups, headings) so users can scan to the part that matches their goal.
  **Why** Grouped information fits working memory and is faster to scan than a flat stream.
  **Applies to** all. **Check** no run of more than 5 consecutive paragraphs without a heading, list or visual break; no ungrouped list longer than 7 items `[engine note]`. **Source** https://lawsofux.com/chunking/

- **RULE [LUX-MILLER]** Organise content into smaller chunks; do not treat 7 plus or minus 2 as a hard cap or as the reason to cut useful features.
  **Why** Short-term capacity is limited and varies with expertise and context.
  **Applies to** all. **Check** `visual`; lists above about 7 items are grouped or subheaded rather than truncated. **Source** https://lawsofux.com/millers-law/

- **RULE [LUX-WMEM]** Put the memory burden on the system: show what the user has already seen or entered (breadcrumbs, visited-link colour, order summary, sticky table headers, carry values forward) instead of asking them to recall it.
  **Why** People hold about 4-7 chunks for 20-30 seconds and are far better at recognising than recalling.
  **Applies to** SaaS app UI | forms | landing page. **Check** pages deeper than two levels have breadcrumbs or a visible current-location marker; multi-step flows repeat chosen options in a summary; long tables keep header row visible (`position: sticky` on `thead th`). **Source** https://lawsofux.com/working-memory/

- **RULE [LUX-LOAD]** Remove elements that consume attention without helping the task (decorative clutter, duplicate controls, competing emphasis) and reduce the information that has to be carried between steps.
  **Why** Intrinsic load (the task itself) is fixed; extraneous load (the interface) is the part a designer controls, and total load beyond capacity causes missed details and overwhelm.
  **Applies to** all. **Check** count of visually emphasised elements (filled buttons, badges, coloured banners) per viewport at most 3 `[engine note]`; one primary action per screen. **Source** https://lawsofux.com/cognitive-load/

- **RULE [LUX-OCCAM]** When two designs solve the task equally, ship the one with fewer elements, fields and assumptions; remove elements until further removal would break the function.
  **Why** Complexity avoided is cheaper than complexity managed.
  **Applies to** all. **Check** `visual` removal test: delete each element in turn and confirm whether the task still works; flag elements whose removal changes nothing. **Source** https://lawsofux.com/occams-razor/

- **RULE [LUX-TESLER]** Absorb the irreducible complexity in the system (smart defaults, autofill, inferred values, sensible presets), not in the user's head; do not design for an idealised rational user.
  **Why** Every process has a core of complexity that someone must handle; making users handle it multiplies the cost by the number of users.
  **Applies to** forms | SaaS app UI. **Check** form fields have defaults or `autocomplete` values where inferable; optional settings are hidden behind a default. **Source** https://lawsofux.com/teslers-law/

- **RULE [LUX-PARK]** Shorten the real duration of a task to match what users expect it to take; use autofill and saved data for critical fields so forms are not padded out.
  **Why** Tasks fill the time they are given; a longer path is perceived as the task, not the design.
  **Applies to** forms. **Check** inputs for name, email, address, phone, card carry the correct `autocomplete` token; step count at or below the number the user would predict `[engine note]`. **Source** https://lawsofux.com/parkinsons-law/

- **RULE [LUX-POSTEL]** Accept a wide range of input formats and normalise them yourself (spaces, dashes, case, country codes, trailing whitespace); define clear boundaries and give clear feedback when input truly cannot be used.
  **Why** Users do not know your internal format; rejecting reasonable variants creates avoidable errors.
  **Applies to** forms. **Check** phone, card, postcode, date and email fields accept formatted input without `pattern` rejecting spaces or dashes; trim whitespace before validating; type with `inputmode` where relevant. **Source** https://lawsofux.com/postels-law/

### Familiarity and learning

- **RULE [LUX-JAKOB]** Use the layout and interaction conventions people already know (logo links home, search icon, cart top right, checkout sequence, standard form controls); change a familiar pattern only with a reason, and offer a transition path when you must change.
  **Why** People transfer expectations from the many other sites they use.
  **Applies to** all. **Check** header logo is an `a` pointing to `/`; primary nav is at the top; standard controls (`input`, `select`, `button`, checkbox, radio) are real elements, not custom look-alikes; `visual` for the rest. **Source** https://lawsofux.com/jakobs-law/

- **RULE [LUX-MODEL]** Match the interface to users' mental models: use the words, grouping and order they use, and validate with interviews, journey and empathy maps rather than internal assumptions.
  **Why** Users apply a compressed model of how a system works; the closer the interface is to it, the less must be learned.
  **Applies to** all. **Check** `visual` plus research; labels use terms found in user language (card sorting or support transcripts), not internal product names. **Source** https://lawsofux.com/mental-model/

- **RULE [LUX-ACTIVE]** Do not rely on manuals or mandatory tutorials; provide help in context (tooltips, inline hints, empty-state guidance) so people who start acting immediately can learn on the way.
  **Why** Users are driven by their immediate task and skip documentation up front.
  **Applies to** SaaS app UI | forms. **Check** first-run screens allow the primary action without dismissing a tour; help is attached to the control (`aria-describedby`, hint text). **Source** https://lawsofux.com/paradox-of-the-active-user/

### Attention and emphasis

- **RULE [LUX-VONR]** Make the single most important item or action visually distinct from its peers, and use restraint so emphasised items do not compete or resemble ads; never rely on colour alone, and consider motion sensitivity when using motion to stand out.
  **Why** In a set of similar items, the odd one is noticed and remembered; many odd ones cancel the effect.
  **Applies to** all. **Check** at most one primary-emphasis element per group (one filled primary button, one highlighted pricing card); emphasis differs by more than colour (weight, size, shape, border); animated emphasis disabled under `prefers-reduced-motion`. **Source** https://lawsofux.com/von-restorff-effect/

- **RULE [LUX-SELECT]** Guide attention deliberately: do not style content like advertising or place it in ad-typical zones (banners, right rail), and avoid several changes happening at once that compete for a user's eye.
  **Why** People filter out whatever does not match their goal, and miss changes when cues are weak or simultaneous.
  **Applies to** all. **Check** no key content in a right-hand rail styled as a card with ad-like proportions; when state changes (toasts, counters, validation) occur, no more than one unrelated change animates in the same 300 ms window `[engine note]`. **Source** https://lawsofux.com/selective-attention/

- **RULE [LUX-SERIAL]** Place the most important items at the start and end of lists and navigation; put the least important in the middle.
  **Why** People remember the first and last items in a series best.
  **Applies to** landing page | SaaS app UI. **Check** primary CTA or key destinations are first or last in the nav; the least-used destinations occupy middle positions; `visual`. **Source** https://lawsofux.com/serial-position-effect/

### Motor, speed and flow

- **RULE [LUX-FITTS]** Make targets large enough to hit, spaced apart, and placed where they are easy to reach; keep the primary action near the user's attention and thumb zone.
  **Why** Acquisition time rises with distance and falls with target size; small tight targets cause errors.
  **Applies to** mobile | all. **Check** interactive elements are at least 44 by 44 CSS px with at least 8 px between neighbours `[engine note]` (the site gives no numbers); primary mobile CTA sits in the lower half of the viewport. **Source** https://lawsofux.com/fittss-law/

- **RULE [LUX-DOHERTY]** Give feedback to every action within 400 ms; for longer work, show progress or a skeleton immediately and use perceived-performance tricks. Do not add artificial delay to fake effort.
  **Why** Below roughly 400 ms the user and the system do not wait on each other, which keeps attention and productivity high.
  **Applies to** all. **Check** time from input event to first visual change at most 400 ms (measure with Event Timing / `PerformanceObserver`); async actions show a pending state (`aria-busy`, spinner, skeleton) within 100 ms. **Source** https://lawsofux.com/doherty-threshold/

- **RULE [LUX-FLOW]** Balance challenge and skill: show feedback for every action, remove needless friction, and make features discoverable so the user is neither bored nor blocked.
  **Why** Full engagement needs a task that is neither too hard nor too easy, with immediate feedback.
  **Applies to** SaaS app UI. **Check** `visual`; every primary action has a visible success or failure state. **Source** https://lawsofux.com/flow/

### Motivation and emotion

- **RULE [LUX-GOAL]** In multi-step flows show how far the user has come and what remains (step indicator, progress bar, checklist); start the indicator ahead of zero when real progress has been made.
  **Why** Effort accelerates as the goal gets closer, so visible progress sustains motivation.
  **Applies to** forms | funnels. **Check** flows with 3 or more steps expose a `role="progressbar"` or a "step n of N" label that updates per step. **Source** https://lawsofux.com/goal-gradient-effect/

- **RULE [LUX-ZEIG]** Signal unfinished content or tasks (progress, a partly visible next section, a to-do state) so people are invited to continue.
  **Why** Interrupted or incomplete items stay in mind longer than finished ones.
  **Applies to** landing page | SaaS app UI. **Check** the next section peeks above the fold at 1440 x 900 and 390 x 844; incomplete setup shows an explicit state. **Source** https://lawsofux.com/zeigarnik-effect/

- **RULE [LUX-PEAKEND]** Design the emotional peaks and the final moment on purpose (first success, confirmation, completion) and eliminate negative peaks (stressful waits, error dead-ends).
  **Why** People judge an experience mainly by its most intense point and its ending, and recall negative moments more strongly.
  **Applies to** all. **Check** every flow ends in a designed confirmation state with a next step; wait states over 1 s have progress or reassurance copy. **Source** https://lawsofux.com/peak-end-rule/

- **RULE [LUX-AESTH]** Invest in visual quality because users read it as usability, but verify usability separately by testing, since polish can hide real problems.
  **Why** Attractive design raises perceived ease and tolerance for minor faults, which also masks them in studies.
  **Applies to** all. **Check** `visual`; run a task-based usability pass that is independent of the visual rating. **Source** https://lawsofux.com/aesthetic-usability-effect/

- **RULE [LUX-PARETO]** Spend effort and screen space on the features that serve most users, using analytics to find the few causes behind most of the outcomes.
  **Why** Inputs and outputs are lopsided; a minority of causes drives most results.
  **Applies to** SaaS app UI | landing page. **Check** top 20% of used features are reachable in the first level of navigation (needs analytics); `visual` otherwise. **Source** https://lawsofux.com/pareto-principle/

- **RULE [LUX-BIAS]** Treat every design judgement as vulnerable to bias (confirmation, anchoring, familiarity); validate with evidence from users instead of conviction.
  **Why** Mental shortcuts speed decisions but produce systematic errors, in designers as well as in users.
  **Applies to** all. **Check** `visual` (process): decisions logged with evidence and a falsifier. **Source** https://lawsofux.com/cognitive-bias/

### 2b. Mechanism and misuse, law by law

| Law | Mechanism | Misuse to avoid |
|---|---|---|
| Aesthetic-Usability | pleasant look triggers a positive response that is read as ease | treating a polished mock as proof it works; skipping usability tests |
| Choice Overload | each extra option adds evaluation cost and regret risk | hiding needed options, or cutting plans below what segments need |
| Chunking | grouping turns many items into a few units that fit memory | one-item chunks, or grouping without labels so structure is unreadable |
| Cognitive Bias | heuristics save effort but skew judgement | blaming users for biases, or exploiting them (dark patterns) |
| Cognitive Load | working capacity is finite; interface effort competes with task effort | stripping so much that necessary context is lost |
| Doherty Threshold | prompt responses keep attention and a sense of control | fake delays to simulate work; chasing 400 ms while ignoring correctness |
| Fitts's Law | movement time grows with distance and shrinks with target size | oversized targets that crowd out content, or ignoring keyboard users |
| Flow | challenge matched to skill plus fast feedback sustains focus | gamified streaks that lock users in; interruptions that break flow |
| Goal-Gradient | motivation rises as the end nears | progress bars that lie or stall; endowed progress used to trap |
| Hick's Law | decision time grows with the number and complexity of options | cutting options until the interface becomes vague; hiding choices instead of ordering them |
| Jakob's Law | expectations are transferred from familiar products | freezing every pattern, or copying a competitor's dark pattern |
| Common Region | an enclosed area reads as one group | boxing everything so nothing is grouped; boundary contradicting proximity |
| Proximity | near items are read as related | uniform spacing that groups nothing; stray elements that sit near the wrong group |
| Prägnanz | the eye picks the simplest organisation of a figure | over-simplifying until meaning or affordance is lost |
| Similarity | alike items are read as related | styling unrelated items alike (all buttons, all cards), or non-links that look like links |
| Uniform Connectedness | a physical connector outranks nearness and likeness | connectors that imply a sequence or hierarchy that does not exist |
| Mental Model | people predict system behaviour from a stored model | designing from the team's own model and calling users wrong |
| Miller's Law | short-term memory span is about seven items | citing seven as a hard limit for menus or navigation |
| Occam's Razor | extra assumptions add risk and cost | deleting needed features or context to look minimal |
| Paradox of the Active User | people act first and read later, even when reading would save time | burying help, or forcing a tutorial before the first action |
| Pareto | a minority of inputs yields most results | ignoring the long tail that matters to key accounts or accessibility |
| Parkinson's Law | work expands to the time or steps allowed | rushing users with artificial countdowns |
| Peak-End | memory weights the most intense moment and the ending | polishing the finale while leaving a painful middle; manipulative emotional peaks |
| Postel's Law | tolerate varied input, send clean output | accepting ambiguous input silently and storing it wrong |
| Selective Attention | goal-irrelevant stimuli are filtered out | flooding the page with competing signals; ad-like styling on real content |
| Serial Position | first and last items are remembered best | placing a critical item in the middle, or stuffing both ends with promos |
| Tesler's Law | complexity cannot be removed, only moved | pushing complexity onto users, or removing it so far that power users lose control |
| Von Restorff | the odd one out is noticed and remembered | highlighting everything; relying on colour alone; flashing emphasis |
| Working Memory | a small buffer decays within seconds | requiring users to remember values across screens |
| Zeigarnik | open loops hold attention | nagging badges and fake incompleteness to force engagement |

## 3. Numbers & scales

The site gives very few numbers. All of them:

| Law | Number | Meaning |
|---|---|---|
| Doherty Threshold | 400 ms | response time at which user and system stop waiting on each other (replaced the earlier 2 s standard, 1982) |
| Miller's Law | 7 plus or minus 2 | short-term memory span (1956); the site warns against using it as a hard design limit |
| Working Memory | 4-7 chunks, 20-30 s | capacity and fade time per the site |
| Pareto | 80 / 20 | roughly 80% of effects come from 20% of causes |
| Aesthetic-Usability study | 26 ATM UI variants, 252 participants | Kurosu and Kashimura, 1995 |
| Peak-End study | 14 C water 60 s, then 30 s at 15 C | the longer trial was chosen to repeat because its ending was milder |

### Law index (30 pages)

| Law | One-line meaning (own words) | Group |
|---|---|---|
| Aesthetic-Usability Effect | pretty reads as easier | perception |
| Choice Overload | too many options lowers decision quality | decision |
| Chunking | group items into meaningful units | memory |
| Cognitive Bias | systematic thinking shortcuts that err | cognition |
| Cognitive Load | mental effort a UI demands | cognition |
| Doherty Threshold | respond within 400 ms | time |
| Fitts's Law | time to hit a target grows with distance, shrinks with size | motor |
| Flow | challenge matched to skill gives immersion | emotion |
| Goal-Gradient Effect | effort rises near the finish | motivation |
| Hick's Law | more choices, slower decisions | decision |
| Jakob's Law | users expect your site to work like others | familiarity |
| Law of Common Region | shared boundary equals group | gestalt |
| Law of Proximity | near equals related | gestalt |
| Law of Prägnanz | eye picks the simplest reading | gestalt |
| Law of Similarity | alike looks related | gestalt |
| Law of Uniform Connectedness | linked looks related | gestalt |
| Mental Model | users carry an expectation of how a system works | familiarity |
| Miller's Law | about 7 plus or minus 2 items in short-term memory | memory |
| Occam's Razor | fewest assumptions wins | simplicity |
| Paradox of the Active User | people start using without reading | learning |
| Pareto Principle | a few causes drive most effects | strategy |
| Parkinson's Law | tasks expand to fill the time | time |
| Peak-End Rule | experiences are judged by peak and end | emotion |
| Postel's Law | be liberal in what you accept | robustness |
| Selective Attention | people filter what is not goal-relevant | attention |
| Serial Position Effect | first and last items are remembered best | memory |
| Tesler's Law | complexity is conserved; someone bears it | simplicity |
| Von Restorff Effect | the distinctive item is remembered | attention |
| Working Memory | small, short-lived workspace for the task | memory |
| Zeigarnik Effect | unfinished tasks stay in mind | motivation |

## 4. Dos and Don'ts

Examples named by the site, described in our words:

- Hick: Google's home page strips everything except the query box (good). Slack's onboarding hides all features except the message input until the user has learned messaging with a bot, then reveals more (progressive).
- Proximity: Google results use spacing to cluster each result as one unit.
- Uniform connectedness: Google wraps videos and featured snippets in a border to bind and elevate them.
- Jakob: YouTube's 2017 redesign let desktop users preview the new design and revert, avoiding mental-model shock.
- Peak-end: Mailchimp turns the confirmation moment for first-time users into a branded, humorous moment; Uber reduced cancellations by managing how waiting felt.
- Don't: pack ten equal-weight CTAs on a hero (Hick, Von Restorff, cognitive load).
- Don't: use a decorative stepper with no real progress (goal-gradient abused).

## 5. Exceptions & judgement calls

Flagged conflicts with existing notes in `knowledge/` (checked by grep):

- **Working-memory numbers.** `psychology-of-user/INDEX.md` records working memory as 3-4 items with Miller as 7 plus or minus 2; this site says 4-7 chunks and warns against treating 7 as a cap. Resolution: use 4 as the safe figure for items that must be held simultaneously, 7 as an upper bound for scannable lists, and never cut features to hit a number.
- **Hick versus visible navigation.** Hick's law is often quoted for hiding nav behind a hamburger. `dos-and-donts/dos-and-donts.md` rule T81 (opinion) recommends a hamburger over visible links, while `web/landing-page-anatomy.md` cites NN/g data that hidden nav is used far less. Hick supports fewer choices, not hidden ones: reduce the number of items, keep the remaining ones visible. T81 is the weaker claim.
- **Doherty versus a deliberate delay.** The site notes that adding delay can raise perceived value. This conflicts with `web/motion-*` and `web/funnels-and-conversion.md`, which treat latency as cost, and with honesty norms (fake progress). Rule LUX-DOHERTY therefore forbids artificial delay; use short, honest feedback instead.
- **Goal-gradient, Zeigarnik, Parkinson as dark-pattern fuel.** Artificial progress, nags for incomplete profiles and fake time pressure all abuse these laws; `psychology-of-user/human-factors-principles.md` already makes this point in an [engine note]. Rule: progress and incompleteness must reflect real state.
- **Jakob versus distinctiveness.** `web/art-direction-moves.md` and `web/creative-direction.md` push unconventional layouts. Jakob's law says convention is free usability. Resolve by splitting: be conventional on navigation, forms, checkout and controls; be distinctive on hero, imagery, motion and type.
- **Von Restorff versus the anti-slop rules.** A single loud element is endorsed; `web/anti-ai-slop.md` warns against gradient-glow templates. A restrained distinct element (size, weight, position) satisfies both.
- **Aesthetic-usability versus evaluation.** The site itself says polish can hide faults; do not use a good render as evidence of usability. This supports the engine's separate measure step.
- **Soft numbers.** `web/courses-and-curricula.md` line 393 already tells agents to treat Miller and Hick as descriptive heuristics, not hard constraints; all `[engine note]` thresholds above are ours.

## 6. Figures worth keeping

- None; the site's poster graphics are copyrighted (CC BY-NC-ND), do not copy to `examples/`.

## 7. Open questions

- The site's "Further Reading" and "Source" links were not followed (primary papers); claims about studies are as reported by the site.
- `lawsofux.com/articles/` and `/book/` were not read (the task scope was law pages and llms.txt).
- The Hick's law page lists examples (Google, Apple TV remote, Slack) only; no quantitative formula (log2(n+1)) is given there, so none is encoded as a rule.
- No page was unreadable: all 30 law pages and llms.txt returned 200.
