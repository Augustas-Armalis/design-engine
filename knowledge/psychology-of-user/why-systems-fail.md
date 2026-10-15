---
source: psychology-of-user
chapter: Human action cycle, why people struggle with systems, responses to poor design
pages: 40-53
topic_tags: [action-cycle, feedback, errors, jargon, consistency, flexibility, frustration, abandonment, designer-bias]
status: studied
---

# Human action cycle and why people struggle with systems

Page convention: `p.NN` = PDF page (printed = PDF - 2). The material is adapted from Norman (1988) via Stone et al. (2005) (p.40) and reads as late-1990s/2000s enterprise-software HCI. The mechanisms transfer; examples ("abend", "filespec") are dated.

## 1. Core ideas

- People are goal-oriented. Any action cycle has three stages: set a goal, carry out activities, assess the result (p.40-41).
- Execution has three sub-steps: choose general approach (cognitive), plan the action sequence (cognitive), carry it out with controls (physical) (p.41-42).
- Evaluation has three sub-steps: perceive and understand the outcome, interpret it against expectations, compare it to the goal (p.42).
- If goals are not met the cycle repeats or the goal is changed; multiple iterations are possible. Interfaces should let the cycle be completed "as quickly and precisely as possible" (p.43).
- Designers (programmers, analysts, graphic artists) usually have technical training but little behavioural or usability training (p.43-44). Their intuition "is far too shaky a foundation" for design decisions, and specialised knowledge creates "a false sense of security" (p.44).
- Users want to get work done, a task completed, a need met. They would rather use a computer than learn how to use one; they may be hostile (p.53). Designers overestimate user technical competence (p.52).
- People remember the one thing that goes wrong, not the many things that go right, so problems get abnormally high priority (p.47-48). Error rates for commands, tasks or transactions in computer systems have been reported "as high as 46%" (p.48).
- People abandon, partly use, or work around systems when effort and negative emotion outweigh perceived reward (p.50-52).

## 2. Rules

### Action cycle

- **RULE [PU-ACT-01]** For every user goal, make all three stages visible: (1) what the goal can be, (2) what controls carry it out, (3) what the outcome was. After any control activation, show a perceivable outcome that can be compared with what the user expected (p.40-43).
  **Why** The user perceives the result, interprets it by expectation, then compares it with the goal (p.42); if any step is opaque, cycles repeat or goals are dropped (p.43).
  **Applies to** all. **Check** for every `button`, `a[role=button]`, form submit: a DOM or visual state change within the interaction (loading/disabled/success/toast/navigation); script a click and diff DOM. **Source** (p.40-43)

- **RULE [PU-ACT-02]** Minimise the steps and time the interface adds to a task's action cycle; design for the cycle to finish quickly and precisely (p.43).
  **Why** Cycle length ranges from seconds to hours; interface should not add to it (p.43).
  **Applies to** all. **Check** count clicks/fields from landing to goal completion; compare against baseline of the simplest flow. **Source** (p.43)

- **RULE [PU-ACT-03]** Give each goal one obvious route, or if several routes exist, make them behave identically. Do not make the same outcome depend on when or how an action is performed (p.43, 46).
  **Why** "Exceptional differences" (different results from the same action depending on timing) are minor, hard to notice and cause errors (p.46).
  **Applies to** SaaS app UI, forms. **Check** same-label controls resolve to same destination/behaviour across the site; visual. **Source** (p.43, 46)

### Causes of difficulty (what makes systems hard)

- **RULE [PU-DIF-01]** Do not cram functionality in when user needs are not understood. Each added function adds complexity; "as a system's versatility grows, its usability declines" (p.44-45).
  **Why** Higher complexity needs more learning and lowers performance efficiency (p.45).
  **Applies to** SaaS app UI, landing page (feature lists). **Check** count of top-level actions per screen and nav items; flag screens where primary action is not distinguished from the others. **Source** (p.44-45)

- **RULE [PU-DIF-02]** Use the user's vocabulary, not system jargon. Book's examples of opaque terms: filespec, abend, segment, boot (p.45).
  **Why** Learning a system should not require learning a new language (p.45).
  **Applies to** all (labels, error text, nav). **Check** lint copy against a jargon list; nav and button labels use words a first-time user would produce; visual/copy review. **Source** (p.45)

- **RULE [PU-DIF-03]** Make cause and effect evident: show results immediately and visibly; avoid hidden prerequisites and invisible overall architecture (p.45-46).
  **Why** Unexpected design is non-intuitive; results are then not linked to the acts that produce them (p.45-46).
  **Applies to** SaaS app UI, forms. **Check** every state-changing control has visible result; disabled controls state why (text or tooltip adjacent). **Source** (p.45-46)

- **RULE [PU-DIF-04]** Avoid distinctions that have no practical importance and make the important distinctions at the point where they matter (p.46).
  **Why** Book's example: a user said difficulties came from pressing Enter "in the wrong way" (p.46).
  **Applies to** forms, SaaS app UI. **Check** visual: no two near-identical controls with different outcomes. **Source** (p.46)

- **RULE [PU-DIF-05]** Support trial-and-error: let people act, observe, and correct. Do not rely on them reading instructions first (p.46-47).
  **Why** People learn by practice, often do not read instructions, and solve problems by "error-correcting" (p.46). Early systems used an "error-prevention" approach assuming people would act only when sure, which left people in one-way situations that were hard or impossible to escape (p.47).
  **Applies to** SaaS app UI, forms, mobile. **Check** every destructive or navigational action offers undo, cancel, back or an exit; no modal without a close/cancel; keyboard Esc closes. **Source** (p.46-47)

- **RULE [PU-DIF-06]** Use one label, one behaviour, one information order per concept. Bad: "Save" vs "keep", "write" vs "list" for the same action; "not legal" vs "not legitimate" for the same outcome; same data in different order on different screens (p.47).
  **Why** Inconsistency turns learning into rote memorisation; meaningful learning becomes very difficult (p.47).
  **Applies to** all. **Check** collect all button/link/label strings; cluster synonyms; same concept = one string. Table columns/fields in same order across screens. **Source** (p.47)

### Responses to poor design

- **RULE [PU-RES-01]** Treat every error, delay or confusing state as having outsized weight: users remember what went wrong, not what went right (p.47-48). Budget polish accordingly: error states, empty states, slow states.
  **Why** Problems get abnormally high priority in memory (p.47-48).
  **Applies to** all. **Check** each flow has designed error, loading and empty states; no raw browser/stack error visible. **Source** (p.47-48)

- **RULE [PU-RES-02]** Never let a response to an action be irreversible and unexplained; frustration rises when an unanticipated response cannot be reversed or what happened cannot be determined (p.49).
  **Why** Named cause of frustration (p.49).
  **Applies to** SaaS app UI, forms. **Check** destructive actions: undo or confirmation; result messages state what happened. **Source** (p.49)

- **RULE [PU-RES-03]** Avoid the named causes of annoyance: roadblocks to tasks or requirements, design inconsistencies, slow response times, difficulty accessing information fast, outdated information, visual screen distractions (p.48-49).
  **Why** Annoyance becomes frustration when annoyances accumulate or goals cannot be communicated (p.49).
  **Applies to** all. **Check** performance budget (slow responses); stale content/date check; visual for distractions. **Source** (p.48-49)

- **RULE [PU-RES-04]** Do not leave users waiting under pressure without response: long response times while the user has a deadline or an unhappy customer create panic and anxiety (p.49). Also avoid underload: slow pace and long download times cause boredom, and "a bored person is more likely to make mistakes" (p.49-50).
  **Why** Both overload and underload harm concentration (p.49-50).
  **Applies to** SaaS app UI, landing page. **Check** measure interaction latency; any wait has a loading indicator; visual. **Source** (p.49-50)

- **RULE [PU-RES-05]** Keep perceived effort below perceived reward. When effort plus negative emotions exceed the reward, people abandon the system, use only part of it (the easiest or highest-benefit tasks), use an intermediary, change the task, add compensatory work (manual reformatting), abuse the system, or reprogram it (p.50-52).
  **Why** People want the advantages to outweigh the expense or effort (p.50).
  **Applies to** all. **Check** visual + process: for each task, list effort (fields, steps, reading) against reward; flag features that will be "partly used". **Source** (p.50-52)

### Designer bias

- **RULE [PU-BIA-01]** Never trust designer intuition about user skill. Assume users lack the context clues and system knowledge the designer has; assume they will not "think" the system is usable just because the designer can use it (p.44, 52-53).
  **Why** Specialised knowledge creates a false sense of security; the designer cannot imagine someone unable to use the system they built (p.44, 53).
  **Applies to** all. **Check** process: test with a naive task walkthrough ("first-time user, no context"). **Source** (p.43-44, 52-53)

- **RULE [PU-BIA-02]** Design for users whose main goal is to get a task done, who are busy and may be hostile or technically unsophisticated. Do not require them to learn technology (p.53).
  **Why** "He or she would rather use a computer than learn how to utilise one" (p.53). Many people also now expect a certain amount of design expertise (p.53).
  **Applies to** all. **Check** visual: primary task visible without scrolling/explanation. **Source** (p.53)

### Audit additions: page images (audit 2026-10-15)

Found by viewing the page images of p.40-53.

- **RULE [PU-ACT-04]** For each user goal, write down the evaluation questions the user will ask of the outcome, and make the result screen answer them at a glance. The book's worked examples: for "type and print a letter", "Is the letter well formatted, with accurate and complete content?" then "Has the letter been accurately printed?"; for "find a good deal on an electrical device" (comparison shopping, searching sources, comparing prices), "Are the costs for the correct equipment displayed?" then "Is the price reasonable?".
  **Why** Evaluation has three steps (perceive, interpret against expectation, compare to the goal); each example shows that the user checks the outcome against a concrete expectation, so the screen must show that evidence (p.41-42).
  **Applies to** all (confirmation screens, search results, pricing, checkout). **Check** process: each primary flow lists its 1-2 evaluation questions; visual: the success/result state shows the data that answers them (what was saved, the price, the item). **Source** (p.41-42) (audit 2026-10-15)

- **RULE [PU-RES-06]** Keep the structure perceivable above the detail: show the overall model (sections, steps, hierarchy) before or alongside the detail so users can find meaningful patterns.
  **Why** The book defines Confusion as "the perceived structure is overwhelmed by detail"; the conceptual model "cannot be grasped", so meaningful patterns are hard to find (p.48).
  **Applies to** SaaS app UI, landing page, long forms. **Check** visual/blur test: section structure is visible at a squint; every long view has headings or a step indicator. **Source** (p.48) (audit 2026-10-15)

- **RULE [PU-RES-07]** Do not make the system rigid and harsh (no way around a blocked path, curt or punitive responses).
  **Why** "Systems that are rigid and harsh are a primary source of annoyance" (p.49); frustration rises when an unanticipated response cannot be reversed or explained (PU-RES-02).
  **Applies to** all. **Check** blocked states offer an alternative route or an explanation; error and refusal copy is neutral (see PU-ERR-05). **Source** (p.49) (audit 2026-10-15)

- **RULE [PU-RES-08]** Assume abandonment costs the user nothing on the web: when effort outweighs reward, people use other sources of information instead, and "almost all people can use this option thanks to the Internet". Treat every extra step as a chance to lose the visitor to an alternative.
  **Why** Abandonment used to need an available alternative and the authority to reject the system (managers in corporate systems); the Internet removed both conditions (p.50).
  **Applies to** landing page, signup, onboarding. **Check** process: count steps and fields before the first reward; visual: the first screen shows the reward (PU-LOD-03). **Source** (p.50) (audit 2026-10-15)

Viewed, nothing new beyond the rules above: p.40 (action-cycle intro, Norman 1988, Stone et al. 2005), p.43-47 (designer intuition, six difficulty factors, error prevention vs error correcting, inconsistency; image confirms the printed wording "Is this a last-ditch effort? Restart the computer after turning it off." on p.47), p.48-49 remaining reactions, p.51-53 (other bodily responses; People and Their Tasks).

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Action cycle stages | 3 (goal, execute, evaluate) | p.40 |
| Execution sub-steps | 3 (approach, sequence, act) | p.41-42 |
| Evaluation sub-steps | 3 (perceive, interpret via expectation, compare to goal) | p.42 |
| Reported error magnitude in computer systems (commands/tasks/transactions) | as high as 46% | p.48 |
| Difficulty factors | 6 (too much flexibility, jargon, unexpected design, exceptional differences, differences in problem-solving approach, inconsistency) | p.44-47 |
| Psychological reactions | 5 (confusion, annoyance, frustration, panic/anxiety, boredom) | p.48-50 |
| Behavioural responses | 7 (abandonment, partial use, indirect use, task modification, compensatory activity, abuse, direct programming) | p.50-52 |
| Worked action-cycle examples | 2 (type and print a letter; find a good deal on an electrical device) (audit 2026-10-15, page images) | p.41-42 |

## 4. Dos and Don'ts

- Don't: label the same action "Save" in one place and "keep" in another, or show the same information in a different order on different screens (p.47). Do: one term, one order.
- Don't: bury functions to cover unclear needs (p.44-45). Do: understand needs, expose what serves them.
- Don't: assume the user will read instructions before acting (p.46). Do: make actions reversible so trial and error is safe.
- Don't: offer a one-way path the user cannot back out of (p.47). Do: provide an exit.

## 5. Exceptions & judgement calls

- Source hedge: usability "declines as versatility grows" (p.45) is stated as a tendency ("in general"). Pro tools legitimately have density; see PU-DIF-01 vs progressive disclosure below.
- [engine note] PU-DIF-05 (trial and error) and the later "stop users making deadly mistakes" confirmation rule (human-factors-principles.md PU-ERR-02) pull in opposite directions: free exploration says do not block; protection says confirm. Resolve by blast radius: reversible = no confirmation, offer undo; irreversible = confirmation that names the consequence. Over-confirming trains users to click through.
- [engine note] "Remove everything unnecessary" (reduce flexibility) can be overapplied into a product that cannot do the job; experts, who are the paying users in SaaS, are among the "partial use / workaround" population the book describes. Hide by default, never delete; offer shortcuts (human-factors-principles.md PU-EFF-05).
- [engine note] The "people remember the one thing that goes wrong" rule is a reason to invest in error/empty/loading states, but must not be used to justify dark-pattern friction when users try to leave (cancel flows). The book's own stance is that users should be able to control and terminate operations (p.87).
- [engine note] The book's remark that users are hostile or unwilling to learn is a design constraint for acquisition pages, but in-product onboarding for power workflows may reasonably teach; judge by task frequency.

## 6. Figures worth keeping

None. Pages 40-53 carry no figures (p.48 image checked; the others have no figure content in the extracted text).

## 7. Open questions

- p.47: the original text reads "Restart the computer after turning it off" for the one-way-path example; the sentence "Is this a last-ditch effort?" is unclear as printed. Meaning (dead-end states forced a reboot) is clear.
- p.48: "as high as 46%" has no source or definition of unit; treat as an old enterprise-software figure, not a benchmark for web.
- p.52: the heading "People and Their Tasks" is followed by a sentence fragment ("understanding of the problems that the computer can help solve...") so the opening is truncated; the sense is that users lack understanding of what computers can solve for them.
- p.40: the book attributes the model to Norman (1988) and Stone et al. (2005); no figure is included.
- Pages with no extractable rule content: p.38 and p.39 (HCI/UX motivation, a Drexel alumnus quote) are covered in process-and-research.md.
- (audit 2026-10-15, page images) Every page image p.40-53 has now been viewed. Added PU-ACT-04 (p.41-42), PU-RES-06 (p.48), PU-RES-07 (p.49), PU-RES-08 (p.50). Viewed, no new content: p.40, p.43-47, p.51-53. The p.47 "last-ditch effort" sentence is printed exactly as quoted above (not an OCR fault).
