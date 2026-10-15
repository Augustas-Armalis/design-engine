---
source: psychology-of-user
chapter: Perception, gestalt, figure-ground, sensory storage, visual acuity, foveal/peripheral vision, information processing, interference
pages: 54-58, 63-72
topic_tags: [perception, gestalt, proximity, similarity, figure-ground, attention, habituation, visual-acuity, peripheral-vision, interference, noise, scanning]
status: studied
---

# Perception, attention and information processing

Page convention: `p.NN` = PDF page (printed = PDF - 2). Source material is Galitz-style screen-design psychology (Bouma 1970, Tullis 1983, Danchak 1976, Mori and Hayashi 1993, Lind et al. 1992, Lidwell et al. 2003). The book states perceptual "characteristics" as definitions; the design consequence is mostly implied. Where the book gives the consequence it is quoted; where I derive it, the Rule's **Why** says so.

## 1. Core ideas

- Perception is shaped by experience: people classify stimuli against models in memory and associate sensations with what they already know (p.54).
- Proximity: near items are perceived as belonging together. Similarity: items sharing colour, size, shape, brightness or orientation are perceived as belonging together (p.55).
- Closure: perception is synthetic, it makes wholes; "Unity": closed shapes are seen as a group; Continuity: shortened lines are extended automatically (p.55-56).
- Balance: people seek stability; vertical, horizontal and right angles are most pleasing and easy to look at (p.56).
- 3D projection and light from above: overlapping, smaller-of-similar and darkened objects are seen as further away; shaded parts read as shadow from a top light source; top-down lighting is natural, other orientations unnatural (p.56).
- Expectancy and context bias perception: we see what we expect (the missed typo while proofreading); same-length lines look different depending on surrounding lines (p.57).
- Figure-ground: a screen element is "signal" or "noise" depending on the user's current task; noise obstructs signals "to the extent that they are similar to one another" (p.57-59). Design should let elements assume signal or noise status readily as tasks change (p.58-59).
- Sensory storage is an unconscious radar, fast to detect change ("cocktail party effect"), but excessive repeated stimulation wears it down (habituation) (p.63-64).
- Visual acuity falls with angular distance from fixation: half at 2.5 degrees (Bouma 1970); a 5-degree circle around fixation is the high-acuity area (p.64-65).
- Peripheral vision both helps (hints where to look next, from patterns, forms and alignments) and competes (visual noise; moving or dynamic peripheral content degrades foveal-window performance) (p.67-68).
- Two levels of processing: a slow, sequential, conscious level for reading and reasoning, and a fast lower level for familiar information (look and perceive, not read). A cluttered screen loses distinctiveness and can only be recognised by reading (p.68-70).
- Interference (stop, proactive, retroactive) slows or blocks processing when conflicting signals or memories collide (p.71-72).

## 2. Rules

### Gestalt grouping and structure

- **RULE [PU-PER-01]** Put related items closer to each other than to unrelated items; use gap size to encode relatedness (proximity) (p.55).
  **Why** Near items are perceived as belonging together (p.55); this is the primary grouping cue.
  **Applies to** all. **Check** measure inter-item gap within a group vs between groups; within-group gap < between-group gap for every adjacent pair (ratio of the two is the metric; book gives no number). **Source** (p.55)

- **RULE [PU-PER-02]** Give items that function alike the same visual feature (colour, size, shape, brightness, orientation) and give items that function differently a different one (similarity) (p.55).
  **Why** Shared visual feature reads as belonging together (p.55).
  **Applies to** all (buttons of the same level, cards, nav items, tags). **Check** computed style comparison across sibling components of the same role: same font-size/weight/colour/radius; differing roles differ in at least one property. **Source** (p.55)

- **RULE [PU-PER-03]** Do not draw every grouping explicitly; let closure and continuity complete shapes and lines, but enclose items with a border or container when they must read as one unit (unity) (p.55-56).
  **Why** Perception creates logical wholes even from incomplete closed shapes; closed shapes are viewed as groups (p.55-56).
  **Applies to** all. **Check** visual: groups containing 2+ related controls share a container or alignment axis. **Source** (p.55-56)

- **RULE [PU-PER-04]** Prefer vertical, horizontal and right-angle alignment for structure and keep layouts balanced (p.56).
  **Why** These angles are "most visually pleasing and easy to look at"; people seek stability or equilibrium (p.56).
  **Applies to** all. **Check** share of elements whose edges align to a small set of x/y axes (count distinct left edges per section); visual for balance. **Source** (p.56)

- **RULE [PU-PER-05]** Use depth cues consistently: overlapped, smaller or darker objects read as further; shadows and shading imply light from above (p.56).
  **Why** Top-down lighting is natural; other orientations are unnatural (p.56).
  **Applies to** all (elevated cards, buttons, inset fields). **Check** computed `box-shadow` offset-y > 0 (shadow falls downward) for raised elements; inset shadows shade top. **Source** (p.56)

### Figure-ground, signal-to-noise

- **RULE [PU-PER-06]** Make the important element (the signal for the user's current task) distinguishable from its surroundings; reduce similarity between signal and background noise (p.57-58).
  **Why** "Noise obstructs signal perception to the extent that they are similar to one another" (p.58); even an important signal can be obscured by noise.
  **Applies to** all. **Check** contrast of primary CTA / key data vs adjacent elements (colour, size, weight, whitespace); visual: a squint/blur test should still reveal the primary element. **Source** (p.57-58)

- **RULE [PU-PER-07]** Let element prominence follow task phase: screen title is the signal when a screen first appears, data becomes the signal during use and the title recedes (p.58).
  **Why** Elements change role between signal and noise as user needs change moment to moment (p.58-59).
  **Applies to** SaaS app UI. **Check** visual: page title is smaller/quieter than the data region once content is on screen; heading is not the loudest thing in a data view. **Source** (p.58-59)

- **RULE [PU-PER-08]** Give every element on a screen a clear function; remove elements without one (p.64).
  **Why** Reducing interface noise makes crucial details less likely to be overlooked; excessive, repeated stimulation causes habituation and the user can no longer tell important from irrelevant (p.64).
  **Applies to** all. **Check** for each visible element: label its function; unlabelled elements are candidates for removal; count of distinct visual-weight levels per viewport. **Source** (p.64)

- **RULE [PU-PER-09]** Do not repeat attention-grabbing stimuli (repeated banners, pulsing badges, constant alerts) so often that users stop seeing them (p.64).
  **Why** Habituation: sensory storage becomes less alert and cannot discriminate crucial from irrelevant information (p.64).
  **Applies to** SaaS app UI, landing page. **Check** count of simultaneously animated or flagged ("new", red dot, pulse) elements per viewport; the book gives no number. **Source** (p.64)

### Acuity, fovea, periphery

- **RULE [PU-PER-10]** Treat the zone around the fixation point as a small "visual chunk" and make screen groups roughly that size or smaller; screens contain very few such chunks (p.64-66).
  **Why** Relative acuity is half at 2.5 degrees from fixation; the optimum area is a 5-degree diameter circle (p.64-65). At 19 in (475 mm) viewing distance this is 1.67 in (41.8 mm) in diameter, holding 88 characters (15 on the widest line, seven rows) (p.65). Optimum viewing distance with modern screens is roughly 24 inches (p.66).
  **Applies to** all. **Check** visual; angular-size calculation is possible: diameter = 2 x distance x tan(2.5 deg). **Source** (p.64-66)

- **RULE [PU-PER-11]** Avoid fill patterns of closely spaced lines or dots (hatching, fine dots, moire-like stripes) that shimmer; choose fill patterns carefully (p.66-67).
  **Why** Eye tremor aids edge detection but makes close line/dot patterns shimmer, which is "distracting and upsetting" (p.66-67).
  **Applies to** all (backgrounds, charts, patterned fills). **Check** visual; flag repeating patterns with period under a few px. The book gives no number. **Source** (p.66-67)

- **RULE [PU-PER-12]** Use peripherally visible patterns, shapes and alignments to lead the eye through a screen in a methodical order (p.67-68).
  **Why** Peripheral vision gives hints of where the eye should go next in visual search (p.67-68).
  **Applies to** all. **Check** visual: consistent alignment axes and repeated shapes create a path; count distinct left-edges (fewer = stronger). **Source** (p.67-68)

- **RULE [PU-PER-13]** Do not put moving or dynamic content beside content the user is actively reading or working in (p.68).
  **Why** Mori and Hayashi (1993): with peripheral windows present, performance on the foveal window deteriorates, and degradation is greater when the peripheral information is dynamic or moving (p.68).
  **Applies to** landing page (auto-playing carousels, tickers beside copy), SaaS app UI (live feeds beside forms). **Check** detect CSS animations/autoplay media/marquee within the same viewport as primary text or forms; require pause control or reduced-motion respect. **Source** (p.68)

### Processing level and recognisability

- **RULE [PU-PER-14]** Make each screen visually distinct in shape and structure so familiar users can recognise it with a glance instead of reading it. Avoid cluttering screens until they lose individuality (p.69-70).
  **Why** Lower-level processing handles familiar information quickly without conscious effort; clutter forces slower, thought-interrupting reading (p.69-70).
  **Applies to** SaaS app UI, landing page. **Check** visual: blur test, each page type has distinct layout skeleton; repeated layout across pages of different purpose is a flag. **Source** (p.69-70)

- **RULE [PU-PER-15]** For unfamiliar screens, give concrete identifying aspects: a title, the controls and the information it provides (p.69-70).
  **Why** Unfamiliar users must use higher-level processing and rely on these cues to check "this is the right screen" (p.69-70).
  **Applies to** SaaS app UI (new users), landing page (h1). **Check** each route has an `h1` or title that names its purpose. **Source** (p.69-70)

### Interference

- **RULE [PU-PER-16]** Do not use colour that contradicts meaning (stop interference): no green for stop/destructive, red for go/confirm (p.71).
  **Why** Naming the colour of a word printed in a different colour takes longer; a green Stop sign with a red Go sign creates mental conflict (p.71).
  **Applies to** all. **Check** destructive buttons/states use red-family hue; success/confirm use green-family; no reversed semantics; label text colour does not name a different colour. **Source** (p.71)

- **RULE [PU-PER-17]** Avoid code combinations that cause distraction, such as colour and iconography meaning different things (p.72).
  **Why** Interference arises when perception and cognition must reconcile opposing mental processes (p.71-72).
  **Applies to** all. **Check** visual: icon meaning and its colour agree (e.g. no green "x" for delete). **Source** (p.72)

- **RULE [PU-PER-18]** Follow the conventions of previously learned systems; do not reuse a familiar pattern with a different meaning, and expect old habits to interfere with new rules (proactive interference), and new learning to disturb old (retroactive) (p.71-72).
  **Why** Prior interaction procedures hamper learning new ones; learning a new system disturbs a learned one (p.71-72).
  **Applies to** all. **Check** compare controls (icons, gestures, shortcuts) against platform/industry convention; flag reuse of a standard icon for a nonstandard action. **Source** (p.71-72)

### Audit additions: page images (audit 2026-10-15)

Viewed p.54-58 and p.67-72 as images. No new rule. Two findings:
- p.54 lists "individual variances" among the human characteristics that matter in design, next to perception, memory, acuity, vision, sensory storage, processing, learning and skill. The book never treats it in any later section (gap in the source; see section 7).
- p.72 callout box ("Avoid code combinations that cause distraction, such as colour and iconography"; "Understand and apply a person's taught mental models") restates PU-PER-17 and PU-MOD-01. Covered.

Viewed, nothing new: p.55-56 (gestalt list), p.57-58 (expectancies, context, signal/noise, hidden-word puzzle analogy), p.67-68 (tremor shimmer; foveal vs peripheral; Mori and Hayashi), p.69-70 (two processing levels, Lind et al. 1992), p.71 (Lidwell interference).

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Relative acuity at 2.5 degrees from fixation | half (Bouma, 1970) | p.64 |
| Optimum acuity area | 5 degree diameter circle around fixation (Tullis 1983; Danchak 1976) | p.65 |
| Viewing distance in that study | 19 in (475 mm) | p.65 |
| Optimum acuity circle on screen at 19 in | 1.67 in (41.8 mm) diameter | p.65 |
| Characters in circle | 88; widest line 15 characters; 7 rows | p.65 |
| Identification at circle boundary | 50/50 chance | p.66 |
| Optimum viewing distance with modern screens | roughly 24 inches | p.66 |
| Levels of information processing | 2 (conscious/sequential/slow, and fast/automatic) | p.69 |
| Interference types | 3 (stop, proactive, retroactive) | p.71-72 |
| Perceptual characteristics listed | 14 (proximity, similarity, pattern matching, succinctness, closure, unity, continuity, balance, 3D projection, lighting from above, expectancies, context, noise vs signals) | p.55-58 |

Printed figure (p.65): a diamond of digits 0-7 radiating from a central 0, rows `3 2 1 3 1 2 3 / 5 4 3 2 1 2 1 2 3 4 5 / 6 5 4 3 2 1 1 1 2 3 4 5 6 / 7 6 5 4 3 2 1 0 1 2 3 4 5 6 7 / ...` (symmetric), captioned "Size of area of optimum visual acuity on a screen". It shows acuity decay by distance, 7 rows tall, 15 wide.

## 4. Dos and Don'ts

- Do: group related controls tightly and separate groups with larger gaps (p.55). Don't: equal spacing between everything (derived from proximity).
- Don't: build screens whose key content looks like its surroundings. The book's analogy is a hidden-word puzzle where meaningful letters are buried in a matrix of nonsense letters (p.58).
- Don't: show a green Stop sign and a red Go sign (p.71).
- Don't: put a shimmering fine hatch or dotted fill behind content (p.67).
- Do: let alignments and repeated forms lead the eye through the screen (p.68). Don't: dynamic peripheral content next to the working area (p.68).

## 5. Exceptions & judgement calls

- The book's gestalt entries are definitions; the design consequences above are stated as consequences, but no numeric thresholds (gap ratios, contrast) are given. Numbers here must come from `system/` or other sources.
- "Succinctness" (people regard objects as having a perfect or simple shape because simplicity is easier to remember, p.55) and "pattern matching" (same shape in various sizes reads the same, p.55) are given without consequence; both support a small reusable icon/shape set.
- Source hedge on acuity: studies were done on early-generation screens before wide variation in text sizes and styles; exact chunk size and readable character count are "challenging" to calculate today. What holds: screens have very few visual chunks (p.66). Treat the 88-character figure as illustrative, not a design constant.
- [engine note] The acuity derivation scales: at 24 in the 5-degree circle is about 2.1 in (about 53 mm) across (2 x 24 x tan 2.5 deg). On mobile (closer viewing, roughly 12-16 in, my estimate) the zone is smaller in physical terms, which supports shorter lines and fewer simultaneous elements. Not from the book.
- [engine note] Signal/noise (PU-PER-06, PU-PER-08) conflicts with "keep everything needed close and visible" (PU-MEM-02, PU-MEM-07 in memory-models-learning-effort.md) and with marketing urges to emphasise many things. If five things are bold, none is the signal. Resolve by one dominant signal per viewport and one secondary.
- [engine note] Habituation (PU-PER-09) is the mechanism behind banner blindness; it also argues against decorative motion everywhere. It conflicts with attention-grabbing tactics (badges, urgency timers) used in persuasion; the same mechanism makes overuse self-defeating, and sustained false urgency counts as a dark pattern (see human-factors-principles.md section 5).
- [engine note] Convention-following (PU-PER-18) conflicts with the engine's goal of non-generic output. Apply convention to *behaviour and semantics* (where nav is, what a trash icon does, colour meaning) and spend novelty on visual identity (type, colour palette, imagery, composition). The book says the same in the mental-model caveat (p.74).
- [engine note] Top-down lighting (PU-PER-05) is a perceptual convention, not a law: flat design and neo-brutalist hard shadows deliberately break depth cues. Keep the direction consistent within a design.
- [engine note] Colour-meaning (PU-PER-16) interacts with cultural meaning and colour-blindness; never rely on colour alone (not in book).

## 6. Figures worth keeping

- p.65: acuity diamond of digits (see section 3). The only data figure in this range. Image checked; it matches the OCR.

## 7. Open questions

- p.55 "Succinctness" and p.55-56 "Unity" are stated with no examples; OCR "Unity." appears as a sentence on p.56 and might be part of the Closure item; kept as separate characteristics.
- p.57 "Context" example (two same-length lines look different) has no figure in the book.
- p.65-66: citation line "(Tullis, 1983). (Danchak, 1976)." is garbled in the source; both are cited for the 5-degree recommendation.
- p.66-67: page text continues across pages with the printed page number embedded in the extraction (64, 65, 66); no content missing.
- p.70: "Interference is a phenomena that can stymie higher-level processing." is a lead-in to p.71.
- No page in this range has rule-free content except that p.63 first half belongs to memory (see memory-models-learning-effort.md).
- (audit 2026-10-15, page images) Every page image in this note's range (p.54-58, p.63-72) has now been viewed (p.54-58 and p.67-72 in this pass, p.63-66 earlier). No new rules. Gap in the source: p.54 names "individual variances" as an important human characteristic in design, but no section of the book covers it; do not cite this book for individual differences (age is mentioned only for working memory, p.60).
