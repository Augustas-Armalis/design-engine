---
source: ui-pedia
chapter: Proximity
pages: 129-140
topic_tags: [proximity, gestalt, grouping, whitespace, forms, navigation, responsive, chunking]
status: studied
---

# Proximity

Proximity is the Gestalt grouping principle: things that sit close together are read as related, things separated by space are read as different groups. The chapter shows it in navigation, text, forms, buttons, mobile skip links, TV UIs and responsive stacking. It gives almost no pixel values; the lesson is the relative size of gaps. It builds directly on the macro/micro whitespace split in 06-whitespace.md.

## 1. Core ideas

1. **Definition.** Items close together are more likely to be seen as belonging to the same group, with similar functions or characteristics; separated items belong to different groups (p.129, p.130).
2. **Origin.** Gestalt psychologists, first half of the twentieth century. Principles include proximity, similarity, closure; later additions such as common region (p.129).
3. **UI depends on it.** Correctly interpreting which items are connected is needed to use an interface, so UI design relies strongly on proximity and other grouping principles (p.130).
4. **Gap size is the signal.** Different amounts of whitespace unite or separate elements (p.131). A 5x3 dot grid with a wider gap after the third column reads as two groups, and the two groups stay distinct even if the shapes inside each differ (p.130-131).
5. **Chunking.** Grouping text into paragraphs/sections, and form fields into clusters, makes content easier to skim and complete (p.133-134).
6. **Grouping can hide.** Putting unrelated items together can hide the item that does not belong (EDD "Add" button) because users sample one item and infer the rest of the group (p.135).
7. **Distance hides.** Far-away elements look unrelated and get missed by task-focused users ("tunnel vision") (p.136-138).
8. **Responsive layouts break proximity.** Scaling down either squeezes gaps or pushes things apart; check groupings at every breakpoint (p.138-139).
9. **Net effect.** Visible groups let task-focused, fast-scanning users find only the UI elements relevant to their work (p.140).

## 2. Rules

- **RULE** Place related elements near each other; separate unrelated elements with clearly larger gaps. Gap *between* groups must be visibly larger than gap *within* a group.
  **Why** Closeness is read as relatedness before any text is read.
  **Applies to** all. **Check** measure intra-group gap vs inter-group gap on siblings; inter-group should be clearly larger. (The book gives no ratio; see judgement calls.) **Source** (p.129-131)

- **RULE** Use different amounts of whitespace to express group membership, including within one row. Example: put the Search field on the same line as the primary navigation but with extra whitespace to its left, so it reads as a different function even though it shares the nav's font treatment.
  **Why** Spacing alone can differentiate functions when type styling is identical.
  **Applies to** headers/navigation. **Check** gap between last nav item and Search > gap between nav items. **Source** (p.131-132 and figure p.131)

- **RULE** If the separating gap cannot be preserved at a smaller viewport, move the item out of the group instead of letting it merge. TfL-style example: on smaller screens the Search was moved up and away from the main nav; on tablet it was shifted up and grouped with the utility-menu items.
  **Why** Cramped space would make Search look like part of the main navigation.
  **Applies to** responsive headers. **Check** at each breakpoint the separation still exists or the item has moved to a different group/row. **Source** (p.132, figure p.132)

- **RULE** Group an icon with its label by proximity or shared region (the book's own criticism of the sample site: Search label and its icon are not grouped).
  **Why** The label-icon pair is one control and should read as one unit.
  **Applies to** all. **Check** icon-label gap smaller than gaps to neighbouring controls. **Source** (p.132)

- **RULE** In text, group sentences into paragraphs divided above and below by whitespace; put a heading closer to the text beneath it than to the preceding section's text.
  **Why** The spacing around headings tells you which paragraphs they belong to; groupings are discernible even without reading (the grey-bar version of the figure still shows heading+paragraph chunks).
  **Applies to** all text. **Check** space above heading > space between heading and its first paragraph; paragraph gap > line gap. **Source** (p.133 and figure p.133)

- **RULE** Cluster related form fields. 12 fields as one block look too difficult; the same 12 fields as three groups of four look straightforward.
  **Why** Chunking makes the form easier to skim and complete.
  **Applies to** forms. **Check** forms with more than about 6-8 fields have visible group breaks (the book's example is 12 fields into 3 x 4; the threshold is derived, not stated). **Source** (p.133, p.134)

- **RULE** Make the groupings meaningful: shipping information in one group and billing information in another. Do not group arbitrarily just to create gaps.
  **Why** Groups must reflect real relationships to help.
  **Applies to** forms. **Check** each group has a label/heading or a clear single purpose. **Source** (p.134)

- **RULE** Keep a top-aligned label very close to its own field and put a bigger gap before the next label-field pair.
  **Why** Minimal spacing label-to-field makes that relationship obvious; the bigger gap after separates pairs.
  **Applies to** forms. **Check** label-to-field gap < field-to-next-label gap. **Source** (p.133-134)

- **RULE** Never place a button or control among unrelated controls. Group only related actions; put the primary on-page action next to the content it acts on. The EDD example: the "Add" button (adds a required employer) sits amid Next, Save as Draft and Cancel on the right, so it is hidden.
  **Why** Users glance at one item in a perceived group and assume the other items in it are the same kind.
  **Applies to** forms, SaaS app UI. **Check** each action cluster contains one kind of action (navigation vs data entry vs cancel). **Source** (p.135, figure p.135)

- **RULE** Group controls that belong together (Previous and Next are connected: grouping them would improve usability).
  **Why** The book's suggested fix for the EDD page.
  **Applies to** wizard/stepper navigation. **Check** Previous and Next adjacent. **Source** (p.135)

- **RULE** Put links, buttons and information that users need next to the main content and primary calls to action, not far away in a corner.
  **Why** Task-focused users expect all relevant information and controls to be close together and selectively attend to a focal area; things "in plain sight" outside it are missed (tunnel vision).
  **Applies to** mobile, TV, all. **Check** secondary-but-required controls within the primary action's zone; not in a distant screen corner. **Source** (p.136)

- **RULE** Do not put the "skip" or opt-out option far from the main call to action. Mobile example: Kayak puts "Skip" at top-left of a dark screen while the CTA (Sign in with Apple) and "View other sign in options" sit near the bottom; users think they must sign in.
  **Why** Far-away options look unrelated and invisible.
  **Applies to** mobile onboarding/auth. **Check** distance between skip link and primary CTA; place skip with or beside the CTA group. **Source** (p.136, p.137)

- **RULE** On large/TV UIs, keep interaction hints next to the content they refer to, and keep them legible over images. Hulu on Apple TV: "Click" / "Click and hold" instructions at the lower right corner, far from the show information on the left, and the photo background hides the text.
  **Why** Distance plus low legibility makes the hints invisible, worse on large screens.
  **Applies to** TV / large screens. **Check** hint within the same region as the item; text contrast over imagery. **Source** (p.137, p.138)

- **RULE** Re-check proximity at every breakpoint. When columns stack, items that were side-by-side comparable become far apart. TfL example: on desktop "Ultra Low Emission Zone" and "Low Emission Zone" links sit side by side; on mobile they are separated by other stacked content and the second may never be seen.
  **Why** Responsive reflow either squeezes the gap or pushes items apart and breaks grouping relationships.
  **Applies to** responsive. **Check** screenshot at mobile/tablet/desktop; for each group, confirm members are still adjacent in DOM order and visual order. **Source** (p.138, p.139)

- **RULE** Show categories/groups visibly so task-focused users scanning fast can locate only what matters to their task.
  **Why** Groups cut scanning cost.
  **Applies to** all. **Check** visual squint test: with text blurred or replaced by bars, the groups should still be countable (p.133 right panel). **Source** (p.133, p.140)

## 3. Numbers & scales

The chapter has no pixel values, line-heights or ratios. Only counts that matter:

| Item | Value | Source |
|---|---|---|
| Dot demo | 5 columns x 3 rows, gap after the 3rd column -> two groups of 3x3 and 2x3 (dots drawn about 65px, gaps within about 20px, gap between groups about 65px in the figure; derived, not stated) | p.130 |
| Form chunking | 12 fields -> 3 groups of 4 | p.133, p.134 |
| Form figure | left: 12 label+input rows evenly spaced with heading above; right: 4 rows, bigger gap, 4 rows, bigger gap, 4 rows (the gap between groups is roughly 2x the gap between rows in the drawing; derived) | p.134 |
| Gestalt principles named | proximity, similarity, closure, common region | p.129 |
| Responsive nav states | desktop: Search same line as nav with big gap; smaller screens: Search moved up | p.131-132 |

## 4. Dos and Don'ts

- **Dots (p.130):** 5x3 dot grid; first three columns solid dark navy, last two columns purple-blue gradient; extra gap after column 3. Reads as two groups. Lesson: the gap, not the colour, created the split; groups survive different shapes inside (p.130-131).
- **Desktop header (p.131):** dark band with "Website" logo left and a stacked mini-list (Service A-Z, Do it online, Contact us/Fix it, Maps) at far right; below it white nav row: Services (dropdown), Events, Recreation, Have your say, Your Council, About Us, left-aligned in even spacing; then a wide empty gap; then a rounded Search field with purple round search icon button. Good: Search separated by extra space.
- **Tablet header (p.132):** Search field moved up into the dark band beside the logo (no longer in the nav row); nav row has the same links; the stacked utility links (Service A-Z, Do it online, Contact us/Fix it, Maps) now sit at the right end of the nav row after About Us. NOTE: the text says Search was "grouped with other utility-menu items", but the picture shows Search in the header band and the utility stack in the nav row; the figure does not literally group them. Take the principle (move rather than merge), not the layout.
- **Text (p.133 figure):** left panel: two sections ("Brightness", "Contrast") each with a bold heading directly above its paragraph and more space above the heading than below it; right panel: the same layout as blue bars, showing the heading+paragraph chunks are readable without any text.
- **Forms (p.134 figure):** left panel (grey): 12 label/input pairs in one evenly spaced block under one title bar; right panel (blue): same 12 pairs in three clusters of 4 with visible gaps between clusters. The book's caption sentence says the three-group version looks "more overwhelming" than one huge group, which contradicts its own text on p.133 and the figure's intent; see Open questions.
- **EDD (p.135):** a government form with the buttons "Previous" (left) and then "Next | Add | Save as Draft | Cancel" as one row of identical dark-blue buttons at the right; "Add" is in the middle of the group and unnoticed. Lesson: wrong grouping hides the function that does not belong.
- **Kayak (p.137):** dark mobile screen; tiny "Skip" text in top-left, logo, orange globe, headline "Sign in to track prices...", white "Sign in with Apple" button, "View other sign in options" below. Skip is far from the CTAs.
- **Hulu on Apple TV (p.138):** menu at top, show info (Homeland, "Watch next episode", S6 E3 summary) at left, large photo at right; "Click: Select" and "Click and hold: Details" hints tiny in the lower right over the photo.
- **Transport for London (p.139):** desktop two-column; ULEZ and LEZ links side by side; mobile shows one narrow column with ULEZ near the top and LEZ much further down after other links.

## 5. Exceptions & judgement calls

- The book never says how much larger the inter-group gap must be. [engine note] A working heuristic is inter-group gap at least about 1.5-2x the intra-group gap; with the gap in the p.134 form figure roughly 2x the row gap. This is derived and labelled as an engine heuristic, not book content.
- Proximity is one of several grouping tools: the book repeatedly names similarity and common region (shared container) and says the design could be improved by grouping "by proximity or shared region" (p.129, p.132). When space cannot create the separation (tight responsive layouts), use a container, divider or reposition instead.
- Splitting a form into groups only helps if groups are meaningful (p.134).
- The "skip" and "instructions" examples show that distance can be wrong even when the information is nominally present; placement rather than existence is the fault (p.136-138).
- The book states proximity in responsive layouts can improve or degrade depending on stack order; it does not prescribe a stacking order (p.138-139).

## 6. Figures worth keeping

- p.129: header illustration (nav items bracketed in red, list items bracketed, card row bracketed: proximity as the grouping idea in a UI).
- p.130: 5x3 dot grid, two groups from one gap.
- p.131: desktop header with Search separated from primary nav by whitespace.
- p.132: tablet header, Search moved to header band.
- p.133: text heading/paragraph grouping, and blank-bar version showing groups without text.
- p.134: 12 fields in one block vs 3 clusters of 4.
- p.135: EDD "Add" button hidden among Next / Save as Draft / Cancel.
- p.137: Kayak "Skip" in top-left, far from CTAs.
- p.138: Hulu TV instruction hints far away over a photo.
- p.139: Transport for London desktop vs mobile stacking.

Copied to /Users/augustas/dev/design-engine/examples/ui-pedia/proximity/.

## 7. Open questions

- p.134 caption: "The same amount of fields divided out into three groupings appear more overwhelming than 12 form fields in one huge group (left) (right) respectively." The wording is inverted (likely meant the 12 ungrouped fields look more overwhelming than the three groups, as p.133 text and the figure imply). Treat the p.133 sentence ("12 fields too difficult, three-part form with four fields each straightforward") as the rule.
- p.132: the text says Search was grouped with utility-menu items on tablet; the figure shows Search in the header band and the utility links in the nav row. The relationship in the image is ambiguous.
- p.138-139: the Hulu key hint labels in the screenshot are very small; the image text appears to read "Click: Select" and "Click & hold: Details" but is barely legible at this resolution; the caption only confirms "Click and Hold ... Details".
- p.133 OCR: the figure's embedded text (headings "Brightness", "Contrast" and lorem-like sentences about colour variation) is an irrelevant sample; no rule content.
- Coverage: all pages p.129-140 read. p.129 (title, definition, Gestalt history), p.136 (tunnel vision text), p.140 (closing note) have rule content only as summarised above; p.140 is the "Point to Be Noted" summary with no new rule.
- No numeric spacing values anywhere in this chapter.
