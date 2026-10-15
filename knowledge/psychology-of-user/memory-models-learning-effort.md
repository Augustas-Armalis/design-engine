---
source: psychology-of-user
chapter: Memory, mental models, movement (Fitts), learning, skill, performance load
pages: 59-63, 73-81
topic_tags: [memory, working-memory, miller, recognition-vs-recall, mental-models, jakob, fitts, learning, skill, cognitive-load, kinematic-load, rejection]
status: studied
---

# Memory, mental models, movement, learning, effort

Page convention: `p.NN` = PDF page (printed = PDF - 2). Interference (stop/proactive/retroactive) is in perception-and-attention.md (p.71-72) because it appears between information processing and mental models; read both.

## 1. Core ideas

- Memory is split into short-term (working) and long-term (p.59). Short-term takes data from the senses or from long-term memory, but not both at once (p.60).
- Miller (1956): the limit is "7 2" chunks (printed with the plus-minus sign missing; read 7 +/- 2) (p.59). Later estimates fell to three to four items (Koyani et al., 2004) (p.60). Capacity decreases with age (Laguna and Babcock, 2000) (p.60). Stored info lasts 5 to 30 seconds, the lower figure most probable (p.60).
- What counts as a chunk depends on knowledge, experience and familiarity (English words are easier than the same number of Russian words for an English speaker) (p.60).
- Short-term memory is easily overloaded and is vulnerable to interference from thinking, reciting or listening (p.60-61).
- Long-term memory is assumed unlimited. Learning is transfer from short-term to long-term; it is aided by structured, meaningful, familiar information, repetition and in-depth analysis (p.61).
- Recognition is far stronger than recall: active vocabulary (words that can be remembered) about 2,000 to 3,000 words; passive vocabulary (words that can be identified) about 100,000 (p.61-62). Therefore present lists of alternatives (p.62).
- A mental model is an internal representation of current understanding, built from experience and culture; people cannot usually articulate it (p.73). A system matching it feels "intuitive"; one that does not causes interference and hard learning (p.73-74).
- Fitts' Law (1954): time to acquire a target is a function of its distance and size; larger or closer targets are reached faster (p.75).
- Learning is unfruitful time to users; people prefer to jump in, be active, explore and experiment, and are sensitive to even modest interface changes (p.76-77). That people can learn is no excuse for complex design: "the fact that humans can be taught to walk a tightrope is no reason to utilize them in a design when pathways are available" (p.76-77).
- Skill is precise execution of actions in the exact time sequence; consistency and efficiency of effort; skills are hierarchical and lower-order skills become automatic (p.78-79).
- Performance load = effort required; the greater, the less likely a task is completed (p.79). Two types: cognitive (mental activity) and kinematic (physical activity) (p.79-80). A GUI lowered both: menus to recognise replaced commands to remember; one click replaced typed text (p.79-80). A quick first impression of high effort leads to rejection, as does an anticipated high effort (p.81).

## 2. Rules

### Working memory

- **RULE [PU-MEM-01]** Design every decision point for three to four items held at once, not seven; treat Miller's 7 +/- 2 as an outdated upper bound (p.59-60).
  **Why** The book reports estimates declining from Miller's seven and a half to three to four items (Koyani et al., 2004) and falling with age (p.60).
  **Applies to** all. **Check** count items users must hold or compare simultaneously (steps in a flow visible at once, options in a primary choice, items in a nav level); flag >4 ungrouped. **Source** (p.59-60)

- **RULE [PU-MEM-02]** Do not make users remember information across screens or steps; keep everything needed to complete the job in close proximity (p.62-63). People can only recall a few items for 3 to 4 seconds (p.62).
  **Why** Short-term storage lasts 5 to 30 seconds (lower likely) (p.60) and is erased by competing activity (p.60-61).
  **Applies to** forms, SaaS app UI, checkout. **Check** multi-step flows repeat or summarise prior choices needed later; inputs with instructions put the instruction adjacent, not on another screen. **Source** (p.60-63)

- **RULE [PU-MEM-03]** Place information that must be compared next to each other (p.63).
  **Why** Avoids straining memory (p.63).
  **Applies to** landing page (pricing plans), SaaS app UI (tables, diffs). **Check** compared items (plan features, before/after) appear in the same viewport and aligned rows. **Source** (p.63)

- **RULE [PU-MEM-04]** Do not require working-memory tasks while the user needs to read fast: when screen-reading speed is critical, avoid asking for other jobs that use memory (p.63).
  **Why** Short-term memory is overwritten by thinking, reciting or listening (p.60-61).
  **Applies to** all. **Check** visual: no instruction text that disappears (auto-dismiss toast carrying required info; placeholder-only labels). **Source** (p.60-61, 63)

- **RULE [PU-MEM-05]** Organise, structure and present knowledge meaningfully and in familiar terms; give the user control over how information is presented (p.62).
  **Why** Structured, meaningful, familiar information transfers to long-term memory and reduces demand on short-term (p.61-62).
  **Applies to** SaaS app UI, landing page. **Check** headings/groups present; data views offer sort/filter/density control where tables exceed the chunk budget. **Source** (p.61-62)

- **RULE [PU-MEM-06]** Make significant items unique or unusual (highlight crucial elements) to increase the chance they are remembered (p.63).
  **Why** Distinctiveness aids recall (p.63).
  **Applies to** all. **Check** one or two highlighted elements per section; if more than that are highlighted none is (see section 5). **Source** (p.63)

### Recognition over recall

- **RULE [PU-MEM-07]** Prefer recognition to recall: present lists of alternatives (menus, selects, suggestions, recent items) instead of requiring users to produce names or commands from memory (p.61-62, 80).
  **Why** Active vocabulary (recallable) is about 2,000 to 3,000 words, passive vocabulary (recognisable) about 100,000; recognition provides memory cues for searching long-term memory (p.61-62). A GUI cut cognitive load by replacing commands to remember and format with menu commands only recognised (p.79-80).
  **Applies to** forms, SaaS app UI. **Check** free-text inputs where a finite option set exists (country, plan, role, date) should be a select/combobox/picker; commands exposed in menus not only via typed syntax. **Source** (p.61-62, 79-80)

- **RULE [PU-MEM-08]** Use words from the user's passive vocabulary: familiar words recognised at a glance; chunk size depends on the user's familiarity (p.60-62).
  **Why** Familiarity enlarges chunk size (p.60).
  **Applies to** all (copy). **Check** copy review; jargon list. **Source** (p.60-62)

### Mental models and familiarity

- **RULE [PU-MOD-01]** Match the user's existing mental model: use familiar visual and usage expectations from other systems; a design that follows existing models is much easier to learn (p.73-74, 86).
  **Why** Users carry expectations and prejudices from other systems and daily tasks; when the system matches, the model is reinforced and use feels intuitive; if not, interference arises (p.73-74).
  **Applies to** all. **Check** compare nav placement, icon semantics, form patterns, checkout, auth flows to common conventions; deviation requires a stated reason. **Source** (p.73-74, 86)

- **RULE [PU-MOD-02]** Use familiar concepts and metaphors rather than inventing new ones (Jakob's Law): users spend most of their time on other products and expect conventional patterns; reinventing lengthens the learning curve (p.86).
  **Why** Unfamiliar usage forces more time learning (p.86).
  **Applies to** all. **Check** visual/pattern review: standard patterns for navigation, search, cart, forms. **Source** (p.86)

- **RULE [PU-MOD-03]** When the existing mental model does not fit your goal, do not bend the design to it; give the user a clear and consistent new model to learn (p.74).
  **Why** "Never compromise your goals or design to fit into pre-existing mental frameworks" (p.74).
  **Applies to** all (novel products). **Check** process: new concept has one consistent name, one visual treatment, introduced once with onboarding. **Source** (p.74)

### Movement and Fitts' law

- **RULE [PU-FIT-01]** Make targets for critical functions large; time to acquire a target depends on its distance and size (p.75-76).
  **Why** Larger or closer targets are acquired faster (p.75); large buttons beat small buttons because they give a broader target (p.76).
  **Applies to** all, mobile especially. **Check** computed bounding box of primary actions and touch targets; primary action larger than secondary actions; no numeric minimum is given in the book. **Source** (p.75-76)

- **RULE [PU-FIT-02]** Use the screen's sides, top, bottom and corners ("pinning") for frequent controls, and let controls extend ("bleed") to the screen edge instead of leaving a one-pixel non-clickable border (p.75-76).
  **Why** The edge stops the pointer at the control, so movement is much faster; a one-pixel edge needs careful positioning (p.76).
  **Applies to** SaaS app UI (toolbars, sidebars, top bars), desktop. **Check** edge-docked bars: clickable area reaches the viewport edge (no padding between hit area and edge). **Source** (p.75-76)

- **RULE [PU-FIT-03]** Size touch controls to reduce the possibility of incorrect actions; in testing measure error rate and enlarge buttons users miss (p.84-85).
  **Why** Physical ergonomics: touch targets that are too small cause errors (p.85).
  **Applies to** mobile, forms. **Check** touch target dimensions and spacing; process: error rate in test. **Source** (p.84-85, see also human-factors-principles.md)

### Learning

- **RULE [PU-LRN-01]** Do not justify a complex design by users' ability to learn; where a simpler pathway exists, use it (p.76-77).
  **Why** Humans can learn almost anything given time (the tightrope example), but unproductive learning time is usually avoided (p.76-77).
  **Applies to** all. **Check** process: for each flow, compare the actual number of concepts to learn to the minimum. **Source** (p.76-77)

- **RULE [PU-LRN-02]** Support jump-in, explore-and-experiment use: let people act immediately and discover; do not front-load massive amounts to learn (p.77).
  **Why** People prefer to be active and experiment; the prospect of learning massive volumes deters some from using a system at all (p.77).
  **Applies to** SaaS app UI (onboarding), landing page. **Check** time/steps to first meaningful action; mandatory tutorials before first action are a flag. **Source** (p.77)

- **RULE [PU-LRN-03]** Keep interface changes between versions or screens minimal; people are very sensitive to even modest changes (p.77).
  **Why** Such changes cause problems when switching systems (p.77).
  **Applies to** SaaS app UI, design systems. **Check** diff across screens/versions for moved or renamed primary controls. **Source** (p.77)

- **RULE [PU-LRN-04]** Make the location of recurring items predictable by design consistency, so experienced users can start moving the cursor to a target before it appears (p.78).
  **Why** Anticipating location is a by-product of learning; achieved through consistency, detailed and timely feedback, and phased learning (a person need only know what is required at that point) (p.78).
  **Applies to** SaaS app UI. **Check** the same control occupies the same position/size across screens (compare bounding boxes of header, primary CTA, nav across routes). **Source** (p.78)

- **RULE [PU-LRN-05]** Transfer skills: where possible let abilities learned in one setting apply in a similar situation elsewhere (p.77).
  **Why** Learning is boosted by transfer (p.77).
  **Applies to** all. **Check** same component = same behaviour everywhere. **Source** (p.77)

### Skill and efficiency growth

- **RULE [PU-SKL-01]** Design screens so skilled performance can grow: allow gradual learning of shortcuts and better ways of working, and keep consistency so lower-order skills become automatic (p.78-79).
  **Why** Skill is precise execution in exact time sequence; skills are hierarchical and lower ones become automatic (p.78-79).
  **Applies to** SaaS app UI. **Check** frequent actions have keyboard shortcuts or quick paths; shortcut shown in menus/tooltips. **Source** (p.78-79)

### Performance load and rejection

- **RULE [PU-LOD-01]** Cut cognitive load: keep screens free of noise and superfluous information; format and organise information properly; provide tools that rely on recognition not recollection; automate memory-intensive tasks (p.80).
  **Why** The greater the effort required, the less likely a task is completed (p.79).
  **Applies to** all. **Check** visual: count of distinct elements/weights per viewport; autofill/defaults/remembered values for memory-heavy fields. **Source** (p.79-80)

- **RULE [PU-LOD-02]** Cut kinematic load: reduce the steps to complete tasks, minimise control actions and movements, automate mundane jobs (p.80).
  **Why** Physical effort has a cost like mental effort; the GUI replaced multi-letter commands with one click (p.80).
  **Applies to** all. **Check** click/keystroke/field count per task; pointer travel distance between consecutive controls. **Source** (p.80)

- **RULE [PU-LOD-03]** Make the first use feel low-effort: a quick first impression that effort is not worth the reward ends in rejection, and so does merely believing it will take a lot of effort (p.81).
  **Why** Perceived effort drives adoption as much as actual effort (p.81).
  **Applies to** landing page (above the fold), SaaS signup. **Check** visual: first screen shows the job and one clear entry step; required fields at signup minimised (no number in the book). **Source** (p.81)

### Audit additions: page images (audit 2026-10-15)

Found by viewing the page images of p.59-60 and p.73-81.

- **RULE [PU-LOD-04]** Name and budget performance load as one quantity, the "principle of least effort" (also "principle of least resistance", Lidwell et al., 2003): for every flow, write the cognitive load (what must be remembered, read, decided) and the kinematic load (clicks, keystrokes, pointer travel) and reduce whichever is larger first.
  **Why** The book gives these as three names for the same principle and splits it into exactly two loads (p.79-80); naming it lets the critique step cite it.
  **Applies to** all. **Check** process: critique lists both loads per core flow. **Source** (p.79-80) (audit 2026-10-15)

Viewed, nothing new: p.59-60 (Miller, Koyani, Laguna and Babcock, 5-30 s; the image confirms "7 2" has no plus-minus glyph), p.73-74 (mental models; the image confirms the caveat paragraph is printed twice on p.74, a layout error in the book, not an OCR artefact), p.75-76 (Fitts callout box), p.77-78 (the p.78 box "design consistency / detailed and timely feedback / is phased" is a free-standing sidebar box with no lead-in in print, which explains the cut sentence flagged in section 7), p.80 (cognitive/kinematic callout box, covered by PU-LOD-01/02), p.81 (rejection; covered by PU-LOD-03).

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Miller 1956 working-memory limit | "7 2" chunks (read 7 +/- 2; symbol lost in print) | p.59 |
| Modern working-memory estimate | three to four items (Koyani et al. 2004) | p.60 |
| Short-term retention | 5 to 30 seconds; lower figure most likely | p.60 |
| Items recalled over short time | a few items for 3 to 4 seconds | p.62 |
| Active vocabulary (recallable words) | 2,000 to 3,000 words | p.61-62 |
| Passive vocabulary (recognisable words) | around 100,000 words | p.62 |
| Fitts' law year | 1954 | p.75 |
| Edge "pinning" gap that hurts | one-pixel non-clickable border | p.76 |
| Performance load types | 2 (cognitive, kinematic) | p.79-80 |
| Memory-load reduction methods listed | 7 (organise/structure/familiarise/present meaningfully; user control of presentation; keep needed info close; compare items adjacent; no extra memory tasks when reading speed matters; make significant items unusual/highlight) | p.62-63 |
| Other names for performance load | principle of least resistance; principle of least effort (Lidwell et al., 2003) (audit 2026-10-15, page images) | p.79 |

No numeric minimum for target size is given anywhere in this book.

## 4. Dos and Don'ts

- Do: toolbar icons that bleed into the screen edge so the pointer is stopped on the control. Don't: leave a one-pixel non-clickable edge along the display edge (p.76).
- Do: show lists of alternatives so people recognise their options (p.62). Don't: require typed commands that must be remembered and formatted (p.79-80).
- Do: give detailed, timely feedback and teach in phases (p.78). Don't: demand that people learn massive volumes up front (p.77).
- Do: follow the model the user already has; if it does not fit, build a clear and consistent new one (p.74).

## 5. Exceptions & judgement calls

- Source hedge: the book first cites Miller's 7 +/- 2, then says estimates are now three to four items (p.59-60); modern pages should use the lower number. [engine note] The 7 +/- 2 figure is commonly misapplied to menu length or nav item count. It is a limit on items held in working memory while reasoning, not a rule that lists must have seven items; recognition (PU-MEM-07) lets long lists work when scannable.
- Source hedge: "Never compromise your goals or design to fit into pre-existing mental frameworks" (p.74) sits against "Designers that reinvent the wheel lengthen users' learning curve" (p.86). The book resolves it by: match when the model fits; build a new clear, consistent one when it does not.
- [engine note] Fitts (PU-FIT-01) and recognition (PU-MEM-07) are in tension with density: big targets and visible lists use space; dense SaaS UI shrinks both. Resolve by tiering: primary and destructive-adjacent actions larger, tertiary smaller; and by density settings. Do not shrink touch targets for visual neatness.
- [engine note] Fitts says bigger and closer is faster; applied blindly it makes the destructive button (delete, cancel subscription) the easiest to hit. Make *intended* actions easy; for dangerous ones add distance, not size, and a confirmation.
- [engine note] "Pinned at screen edges" holds for pointer devices with an edge stop; it does not apply to touch where there is no edge stop; use thumb-reach instead (not in book).
- [engine note] "Make significant items unusual" (PU-MEM-06) conflicts with PU-PER-08 (one dominant signal) if many items are marked "important". Cap emphasis: roughly one primary per viewport and few secondary; the book gives no number, so this cap is a heuristic.
- [engine note] Hick's Law (choice time grows with the number of choices) is not in the book but is its natural sibling to PU-DIF-01 and PU-MEM-01. It is routinely overapplied to strip choices; where users have a clear goal and know the options (expert menus, pricing comparisons) more options visible can be faster than extra clicks to reach them.
- [engine note] Recognition-over-recall can be overused as "put everything on screen"; combine with grouping so a long list stays scannable (PU-PER-01).
- [engine note] "Reduce effort" (PU-LOD-01/02) and "reduce first-use effort" (PU-LOD-03) can be gamed: removing friction at signup while hiding cost, or defaulting consent/upsell to on, reduces effort for the business, not the user; see dark patterns in human-factors-principles.md section 5.

## 6. Figures worth keeping

None in this range; checked p.59 (text only) and p.75 (text with a callout box for Fitts' consequences).

## 7. Open questions

- p.59: "7 2" in the page image is as printed, no plus-minus glyph; interpreted as 7 +/- 2 (Miller's well-known result). Flagged, not guessed beyond that.
- p.62: heading reads "Minimize the need for a might memory" (a typo in the source; likely "mighty"/"much memory"); content is the list of memory-load reduction methods.
- p.62-63: the list item "Giving the user control over the presentation of information" lacks a direct mechanism in the book.
- p.74: the caveat paragraph is duplicated in the source text.
- p.75: "(1954)" attribution is given after Fitts' Law in the text; the law is stated without formula.
- p.78: sentence "This is achieved through design consistency. Provides detailed and timely feedback. Is phased" is a bullet list whose lead-in was cut; reconstructed as three means of supporting anticipation.
- p.78-79: sentence on skill ("better ... ") is cut at the page break; remainder on p.79 reads "Many fundamental abilities..." with no loss of rule content.
- p.81: no figure; short page.
- p.63: second half covers sensory storage (see perception-and-attention.md).
- (audit 2026-10-15, page images) Every page image in this note's range (p.59-63, p.73-81) has now been viewed (p.59-60 and p.73-81 in this pass, p.61-63 earlier). Added PU-LOD-04 (least-effort naming, p.79-80). Resolved: the p.74 duplicate paragraph is printed twice in the book; the p.78 "consistency / feedback / phased" list is a sidebar box without a lead-in. Viewed, no new content: p.59-60, p.73-78, p.80-81.
