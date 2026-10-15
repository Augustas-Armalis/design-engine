---
source: psychology-of-user
chapter: Human factors principles (ergonomics, consistency, familiarity, control, efficiency, error management) and cross-law conflicts
pages: 82-93
topic_tags: [human-factors, ergonomics, consistency, jakob, feedback, control, efficiency, shortcuts, error-handling, undo, dark-patterns, trade-offs]
status: studied
---

# Human factors principles, and where the laws conflict

Page convention: `p.NN` = PDF page (printed = PDF - 2). Section 2 is the book's own seven principles (based on ISO 9241 ergonomics standards, p.83), which "aim at assisting users in engaging with a product and entering a state of flow" (p.83). Section 5 is the cross-law conflict treatment for the whole book and is the part most likely to be used in practice.

## 1. Core ideas

- Human factors = users' interactions with systems, machines, platforms and tasks; military and aviation roots (cockpit complexity raises cognitive burden and causes human-error accidents) (p.82).
- Human factors design (people-centered design) focuses on where interaction occurs (touchscreen phone, desktop tasks) to reduce user errors and give more pleasant experiences (p.82-83). It means understanding human capabilities and limits and applying them to the product (p.83).
- The principles on p.84-90: physical ergonomics, consistency (internal and external), familiarity, sense of control, efficiency, error management (p.84-90). Familiarity and Jakob's Law are covered as PU-MOD-02 in memory-models-learning-effort.md.
- Ergonomics is measured in testing by error rate; failing buttons are enlarged (p.85).
- Consistency lets users transfer acquired skill to other parts of the product (p.85).
- The user, not the system, should be in charge of the interaction (p.87).
- Efficiency is a cognitive-load job: break down tasks, cut unnecessary actions, keep navigation paths minimal, give help up front, group related information, offer shortcuts (p.87-89).
- Errors: prevent, protect against fatal ones, support undo, give useful messages, never blame the user - "it's your design defects that cause users to make mistakes" (p.89-90).

## 2. Rules

### Physical ergonomics

- **RULE [PU-ERG-01]** Evaluate each interaction against three things: the specific action performed (for example entering text into a web form), the physical attributes of the device (size, shape, weight of a phone), and how the user interacts with information on the device in context (p.84).
  **Why** These variables determine whether a product lets users work quickly and efficiently (p.84).
  **Applies to** mobile, forms. **Check** process: each flow lists device, action, and context. **Source** (p.84)

- **RULE [PU-ERG-02]** Size touch controls to reduce incorrect actions; if testing shows users struggle to hit certain buttons, enlarge them. Measure the error rate during user testing (p.84-85).
  **Why** Mobile ergonomic design aims to reduce the possibility of incorrect actions (p.85).
  **Applies to** mobile, forms. **Check** touch target width/height from computed layout; process: error rate in test. The book gives no minimum size; see section 5 engine note. **Source** (p.84-85)

### Consistency

- **RULE [PU-CON-01]** Internal consistency: apply the same conventions and visual appearance to all UI elements throughout the interface (p.85-86).
  **Why** A consistent design lets users transfer an acquired ability to other parts of the product; it is essential for pleasant encounters (p.85).
  **Applies to** all. **Check** computed style variance for components of one role across all pages (button height, radius, font-size, colour); the set of distinct values per property should be small and tokenised. **Source** (p.85-86)

- **RULE [PU-CON-02]** External consistency: use the same design for the product on all platforms, desktop and mobile alike (p.86).
  **Why** Same reason as internal: skills and expectations transfer (p.85-86).
  **Applies to** all (responsive design, native vs web). **Check** compare component styling, labels and flows across breakpoints; same label strings, same iconography. **Source** (p.86)

- **RULE [PU-CON-03]** Use one name and one appearance per concept across screens (see also PU-DIF-06 in why-systems-fail.md) (p.47, 85).
  **Why** Inconsistency forces rote learning (p.47).
  **Applies to** all. **Check** synonym clustering of labels. **Source** (p.47, 85)

### Familiarity

- **RULE [PU-FAM-01]** Prefer familiar concepts and metaphors; do not reinvent conventional patterns for novelty's sake (Jakob's Law). Full rule: PU-MOD-02 in memory-models-learning-effort.md (p.86).
  **Why** Users get accustomed to conventions from other products and expect them (p.86).
  **Applies to** all. **Check** see PU-MOD-02. **Source** (p.86)

### Sense of control

- **RULE [PU-CTL-01]** Give proper feedback: use visual and audio cues so users comprehend the present state of the system (p.87).
  **Why** Control of information by the user is at the heart of HCI design; the user, not the system, should be in charge (p.87).
  **Applies to** all. **Check** every async action has visible in-progress and completed states (spinner/skeleton/disabled/toast); focus, hover and active states exist on interactive elements. **Source** (p.87)

- **RULE [PU-CTL-02]** Let users control system operations, including interrupting or terminating them (p.87).
  **Why** Control is the user's, not the system's (p.87).
  **Applies to** SaaS app UI, forms, mobile. **Check** long-running operations (upload, export, generation) have cancel; modals and flows have close/back; no auto-advancing content without pause. **Source** (p.87)

- **RULE [PU-CTL-03]** Personalise content using what you know about the user, to give the appearance that the system responds to their requirements (p.87).
  **Why** Perceived responsiveness raises the sense of control (p.87).
  **Applies to** SaaS app UI, landing page. **Check** process: personalised content has a visible, changeable source (e.g. shows name, recent items, saved settings) and a way to reset or control it. **Source** (p.87)

### Efficiency

- **RULE [PU-EFF-01]** Break difficult tasks into simple steps (p.88).
  **Why** Simplifies decision-making and reduces complexity (p.88).
  **Applies to** forms, onboarding, checkout. **Check** count fields/decisions per step; long forms are sectioned or stepped. No number in the book. **Source** (p.88)

- **RULE [PU-EFF-02]** Remove every unnecessary action and keep navigation paths to a minimum so the user's attention and brainpower go to the task, not the interface (p.88).
  **Why** Interaction should not take a lot of brainpower (p.87-88).
  **Applies to** all. **Check** click depth from landing to each core task; count of optional fields and interstitials. **Source** (p.87-88)

- **RULE [PU-EFF-03]** Give users the information they need to learn the system up front, and anticipate where they will need extra help (p.88).
  **Why** Reduces learning cost at first use (p.88).
  **Applies to** SaaS app UI, forms. **Check** help text, empty states and contextual hints exist at known confusing points (format requirements stated before input, not after). **Source** (p.88)

- **RULE [PU-EFF-04]** Combine related information and arrange UI elements so the most critical information is highlighted; use Gestalt principles to organise information on screens (p.88-89).
  **Why** Grouping and emphasis cut search and cognitive effort (p.88-89).
  **Applies to** all. **Check** see PU-PER-01/02/06. **Source** (p.88-89)

- **RULE [PU-EFF-05]** Offer shortcuts for experienced users, for example keyboard shortcuts that perform tasks without a mouse (p.89).
  **Why** Raises seasoned users' productivity (p.89).
  **Applies to** SaaS app UI. **Check** visible shortcuts for repeated actions (command palette, kbd hints in menus); focusable controls in logical order. **Source** (p.89)

### Error management

- **RULE [PU-ERR-01]** Prevent errors where possible: map user journeys and analyse them to find places where users are likely to have issues (p.89-90).
  **Why** Errors are human; the way a system handles them strongly affects users (p.89).
  **Applies to** forms, SaaS app UI. **Check** input constraints and formatting hints present (input type, masks, inline validation); process: journey walkthrough. **Source** (p.89-90)

- **RULE [PU-ERR-02]** Stop users from making deadly mistakes with protective layers: confirm dialogs for deleting files or an entire account (p.90).
  **Why** Fatal error states should be unreachable by accident (p.90).
  **Applies to** SaaS app UI, forms. **Check** destructive actions (delete, remove, cancel subscription, overwrite) trigger a confirmation that names the object, or are undoable. **Source** (p.90)

- **RULE [PU-ERR-03]** Support "undo": allow actions to be reversed (p.90).
  **Why** Reversibility makes trial and error safe (see PU-DIF-05) (p.46-47, 90).
  **Applies to** SaaS app UI, forms, mobile. **Check** delete/archive/edit actions expose undo (toast with Undo, trash, history). **Source** (p.90)

- **RULE [PU-ERR-04]** When an error occurs, write messages that help users resolve it (p.90).
  **Why** Users need to regain control (p.89-90).
  **Applies to** forms, all. **Check** error text states what is wrong and how to fix it, is adjacent to the field, uses no codes or jargon only; no "Error" alone. **Source** (p.89-90)

- **RULE [PU-ERR-05]** Never hold users responsible for errors; treat them as the design's defects (p.90).
  **Why** User-centered design: it is not the users' fault but design defects that cause mistakes (p.90).
  **Applies to** all (copy). **Check** copy lint on error text: no "you entered an invalid", "you failed", "your mistake"; phrase as what the system needs. **Source** (p.90)

### Audit additions: page images (audit 2026-10-15)

Viewed p.82-90 as images. No new rule. Findings:
- p.83: the book describes human factors as "a synthesis of a variety of disciplines, such as psychology, sociology, engineering, and industrial design". Framing only; it supports PU-PRO-21 (ethics and context-of-use research) in process-and-research.md.
- p.84: the image shows the three ergonomics variables in a callout box under their lead-in sentence; the order in PU-ERG-01 matches the print (resolves the p.84 item in section 7).
- p.86: Jakob's Law is printed under the name "Law of Internet User Experience". Covered by PU-MOD-02.

Viewed, nothing new: p.82 (military/aviation roots), p.85 (consistency internal/external), p.87 (sense of control), p.88-89 (efficiency list), p.90 (error management).

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Human-factors principles listed | 6 (physical ergonomics, consistency [internal/external], familiarity, sense of control, efficiency, error management) | p.84-90 |
| Feedback channels named | visual and audio cues | p.87 |
| Standard referenced | ISO 9241 (ergonomics of human-computer interaction) | p.83 |
| Error-management steps | 5 (avoid, protect from fatal, undo, helpful messages, never blame) | p.89-90 |
| Research methods | 4 (Wizard of Oz, cognitive walkthrough, moderated usability testing, contextual inquiry) | p.91-92 |

No target sizes, time thresholds or contrast values in this book.

## 4. Dos and Don'ts

- Do: confirm deleting a file or the entire account (p.90). Don't: let that be the one-click default.
- Do: undo. Don't: make errors the user's fault in the message (p.90).
- Do: same visual appearance of UI elements throughout the GUI (internal); same design across desktop and mobile (external) (p.85-86).
- Do: keyboard shortcuts so seasoned users skip the mouse (p.89). Don't: force the same slow path on every user.

## 5. Exceptions & judgement calls

Conflicts first (the book rarely states them; the entries marked [engine note] are my additions), then misuse.

### Where the book's own rules pull against each other

| Pair | Conflict | Resolution |
|---|---|---|
| PU-FAM-01 / PU-MOD-02 (be familiar) vs PU-MOD-03 (do not bend your design to old models, p.74) | The book states both (p.74 vs p.86). | Match convention when it fits the task; build one clear new model when it does not. Spend originality on visual identity, not on behaviour. |
| PU-DIF-05 (support trial and error, p.46-47) vs PU-ERR-02 (confirm dangerous actions, p.90) | Exploration needs freedom; protection adds friction. | [engine note] Decide by reversibility: reversible = act immediately and offer undo (PU-ERR-03); irreversible = confirm with a message naming the consequence. Confirming everything trains click-through. |
| PU-EFF-02 (remove unnecessary actions) vs PU-ERR-02 (add confirmations) | Fewer steps vs protective steps. | [engine note] Same: add steps only at irreversible points. |
| PU-EFF-01 (break into steps) vs PU-EFF-02 (minimise time/paths) | More steps vs fewer actions. | [engine note] Break up cognitive complexity, not click count: a multi-step flow with easy steps beats one dense page, but each step must earn its screen; steps that only exist to show more ads or collect optional data violate PU-EFF-02. |
| PU-DIF-01 (do not cram functions, p.44-45) vs PU-SKL-01 / PU-EFF-05 (let skill grow, offer shortcuts) | Simplicity vs power. | [engine note] Progressive disclosure: simple default surface, power under shortcuts and menus. Avoid deleting features experts depend on; the book itself warns that partial use and workarounds are the response to rigid systems (p.50-52). |
| PU-PER-08 / PU-PER-06 (one clear signal, no noise) vs PU-MEM-02 / PU-MEM-03 (keep needed info close, compare side by side) | Minimal screens vs everything at hand. | [engine note] Put what the current task needs on screen; move the rest one click away. The test is the task, not a count of elements. |
| PU-MEM-06 (highlight what matters) vs PU-PER-09 (habituation) | Emphasis stops working when repeated. | [engine note] Emphasise rarely, vary treatment, and keep the primary action singular. |
| PU-CTL-03 (personalisation) vs control / privacy (PU-CTL-01/02) | Personalising without control feels like surveillance or manipulation. | [engine note] Show why content is personalised; allow change and opt-out; the book frames personalisation as appearance of responsiveness (p.87), not as a licence to hide how it works. |
| PU-CON-01/02 (consistency) vs PU-PER-14 (distinct screens recognisable at a glance) | Same everywhere vs distinct per screen. | [engine note] Consistent components, distinct page skeletons: tokens and components shared; layout compositions differ by page purpose. |

### Misuse and overuse

- [engine note] **Dark patterns exploit the book's own mechanisms.** The book shows that people minimise effort, remember the one failure, and follow defaults. Each can be inverted: effort reduction used to hide costs (pre-ticked add-ons, consent defaulted on); "sense of control" removed by hiding cancel or unsubscribe paths (violates PU-CTL-02); confirmation dialogs written to shame ("No, I don't want to save money") instead of inform (violates PU-ERR-05, the no-blame spirit, and PU-EFF-03); similarity used to disguise ads as content or a decline button as inert text (abuses PU-PER-02); false urgency (violates PU-PER-09's habituation logic and trust). Test: if the design works only because the user did not notice, understand, or could not leave, do not ship it. This also protects long-term outcomes: the book says users abandon or work around systems when effort exceeds reward (p.50-52).
- [engine note] **Over-simplification.** PU-DIF-01, PU-LOD-01 and PU-EFF-02 can be read as "less is always better". The book qualifies this: it targets cramming caused by not understanding user needs (p.44-45), and it warns of boredom when abilities are underused and tasks are overly simple (p.49-50). Remove noise and unrequested features; keep the capability the task requires. Hiding all secondary information behind icons lowers visible clutter but breaks recognition-over-recall (PU-MEM-07), because icons without labels are recalled, not recognised.
- [engine note] **Over-literal numbers.** Miller's 7 +/- 2 and the 5-degree acuity circle are research parameters, not layout specs; the book itself says the numbers changed (p.60) and were derived on early screens (p.66). Use the *direction* (small chunks, small high-acuity zone), not the number.
- [engine note] **Fitts' law misapplied.** Bigger-is-better makes the destructive action as easy as the intended one; space it away from primary actions. On touch there is no edge-pinning.
- [engine note] **Familiarity misapplied** to produce generic sites. Convention governs behaviour; identity can still differ (see PU-PER-18 note).
- [engine note] **Gestalt over-boxing.** Proximity and similarity already group; drawing a box around everything adds lines (noise, PU-PER-08). Use whitespace first, containers when needed.
- [engine note] **Landing pages vs SaaS UI.** The book's sample is task software and enterprise systems (p.43-53). For marketing pages the user's goal is evaluation not task completion; rules about reducing steps map to "time to understand the offer and reach one next step", not to showing less persuasive content. Persuasion, trust cues, motivation and social proof are not in this book (see section 7); do not infer rules for them from it.
- [engine note] **Numbers the book does not give**, supplied from standard references so the checks are usable (verify before encoding as hard rules): WCAG 2.2 target size minimum 24 x 24 CSS px (criterion 2.5.8, AA); common touch-target guidance about 44 x 44 pt (Apple) and 48 x 48 dp (Material). Response-time heuristics (about 0.1 s feels instant, 1 s keeps flow, 10 s loses attention) come from Nielsen/Miller, and Doherty threshold is about 400 ms. None are from this book.

## 6. Figures worth keeping

None in this range. Page 87 checked: text only with a bullet list. No UI examples anywhere in the 93-page book.

## 7. Open questions

- p.84: the list of three ergonomics variables is separated from its lead-in sentence in the extraction (the lead-in "...Human factors experts consider the following variables" precedes it); order restored here.
- p.85: "Maintaining internal and external consistency is also critical" is followed by bullet markers in the OCR; two bullets recovered.
- p.88-89: "Assist the user" is written as "give your user all the information they need to learn how to utilise the system up front" - kept as PU-EFF-03.
- Gap: the book contains no coverage of motivation, persuasion, trust, social proof, scarcity, Hick's Law, Hick-Hyman, Doherty, Von Restorff, Zeigarnik, peak-end rule, Postel's law, dark patterns, colour psychology, reading patterns (F or Z), or accessibility standards. Anything on these in this folder is marked [engine note].
- p.91: Wizard of Oz description appears on p.91 and cognitive walkthrough on p.92 (reversed order with its heading "Cognitive Walkthrough"); content mapped by text.
- p.93: "Points To Remember" paragraph restates the thesis; no rule content.
- (audit 2026-10-15, page images) Every page image p.82-93 has now been viewed (p.82-90 in this pass, p.91-93 earlier). No new rules. Resolved: the p.84 ergonomics variables sit in a callout box under their lead-in; the order in PU-ERG-01 matches the print. Viewed, no new content: p.82-90 (details in the section 2 audit block).
