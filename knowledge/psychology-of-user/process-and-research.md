---
source: psychology-of-user
chapter: Design thinking process and research methods
pages: 1-39, 91-93
topic_tags: [process, research, empathy, problem-statement, prototyping, usability-testing, cognitive-load]
status: studied
---

# Design thinking process and research methods

Page convention: `p.NN` is the PDF page index (printed page = PDF page - 2). This is the book's most generic section: it is process, not UI. Most rules here are about what an agent should do *before and around* layout (brief, direction, critique loop), so most checks are artefact checks, not DOM checks.

## 1. Core ideas

- The book's thesis is on the cover: "Pay Attention to What Users Do, Not What They Say." (p.1). The empathy map separates Says / Thinks / Does / Feels (p.9).
- Most systems are built by people more concerned with the technology than the people who will use it (p.3). The user is the most important aspect of any computer system (p.3).
- Design thinking has five stages: Empathize, Define, Ideate, Prototype, Test (p.6). It is "a method, not magic" (Bill Burnett, p.7) and is not a one-rule-fits-all technique (p.7).
- The five stages are not linear. It is an iterative loop; stages can run in parallel; testing can send the team back to brainstorming and a new prototype (p.36).
- Empathize = analysis (break observations into what / why / how); Define = synthesis (reassemble into one problem statement). Both recur across all stages (p.14-16).
- The problem statement is the "north star" for the whole process; without it you are "fumbling around in the dark" (p.13, 17).
- Success of a product is judged on three axes: attractiveness (human-centric), viability (business), feasibility (technical) (p.11-12). An unattractive product cannot make profit (p.12).
- Ideation values quantity over quality and defers judgment; the more creative the idea, the higher the risk of betting on it (p.20-22).
- Prototyping removes uncertainty and misunderstanding cheaply, and breaks a complicated problem into smaller testable parts (p.31). Decisions made on assumptions and prejudice fail to connect with people; prototypes test the assumptions (p.31).
- Testing is where honest user input steers development; a flawless answer is hard to get immediately (p.35). "Test early, test often" (p.33).
- Reducing cognitive load is the priority in UI/UX: the more brainpower the product demands, the less pleasurable the experience; testing should locate high-load areas (p.34-35).

## 2. Rules

### Brief and problem definition

- **RULE [PU-PRO-01]** Before designing, write a problem statement that is about the user and their need, not about technology, revenue or product specs. Book's example: not "boost food sales to seniors by 5%" but "elders need meal delivery to have access to nutritious meal alternatives" (p.17-19).
  **Why** A human-centered statement steers every later decision toward the user; a business-metric statement steers toward the company's bottom line (p.19).
  **Applies to** all (landing page: the hero/offer; SaaS: each screen's job). **Check** process: brief contains a one-sentence user-need statement; it contains no KPI percentages, tech names or feature specs. **Source** (p.17-19)

- **RULE [PU-PRO-02]** Keep the problem statement in a middle band: broad enough not to prescribe the solution or include technical requirements, narrow enough to be manageable. "Improve the human condition" is too broad (p.18).
  **Why** Too narrow kills alternative solutions; too broad overwhelms the team (p.18-19).
  **Applies to** all. **Check** process: statement does not name a UI pattern or technology; statement could be tested with a concrete task. **Source** (p.18-19)

- **RULE [PU-PRO-03]** Evaluate any design on three axes at once: human attractiveness, business viability, technical feasibility. Failing the first means the other two cannot rescue it (p.11-12).
  **Why** An unappealing product to its audience cannot generate profit (p.12).
  **Applies to** all. **Check** process: critique output scores all three; visual for attractiveness. **Source** (p.11-12)

### Understanding users

- **RULE [PU-PRO-04]** Build an empathy map with four quadrants (Says, Thinks, Does, Feels) around the user before the first web design phase, and give *Does* (observed behaviour) more weight than *Says* (p.1, 9).
  **Why** Cover tagline: attention to what users do. Stated and actual behaviour diverge.
  **Applies to** landing page, SaaS app UI. **Check** process: four filled quadrants exist; each design claim traces to one. **Source** (p.1, 9)

- **RULE [PU-PRO-05]** Ask what users want, how they behave, where their pain points are, what their online habits are, and which wants must be met, before choosing a direction (p.9). Empathy techniques listed: What-How-Why, the 5 Whys, empathic interviews, photo/video studies, brainstorming, engaging users, journey map, analogies (p.11).
  **Why** Answers give a strong start and prevent solving the wrong problem (p.9, 12).
  **Applies to** all. **Check** process: list of the above answers present in brief. **Source** (p.9, 11)

- **RULE [PU-PRO-06]** Lay aside assumptions and own biases; examine what you see instead of rejecting it and do not seek only evidence that confirms prejudices (p.8, 10).
  **Why** Biases enter how we interpret the world and the scenarios we investigate (p.10).
  **Applies to** all. **Check** process: critique step lists at least one assumption that was tested rather than assumed. **Source** (p.8, 10)

### Ideation

- **RULE [PU-PRO-07]** Generate many candidate directions before selecting one; judge viability only afterwards. Ground rules: one conversation at a time; quantity over quality; encourage wild ideas; no judgment during generation; visualise (p.20-24).
  **Why** Creativity appears when volume is prioritised; judgment blocks it (p.20, 23).
  **Applies to** all (the engine's "direction must diverge" step). **Check** process: more than one distinct direction logged before commit. The book gives no number. **Source** (p.20-24)

- **RULE [PU-PRO-08]** When mapping ideas, use keywords not long sentences, link every item to the central problem, and use images, colour and radial hierarchy for emphasis (p.25).
  **Why** A map must give a quick cue to the concept; reading long statements wastes time (p.25).
  **Applies to** all (planning artefacts). **Check** visual. **Source** (p.24-25)

### Prototype and test

- **RULE [PU-PRO-09]** Start with low-fidelity prototypes (storyboarding, drawing, Wizard of Oz, card sorting; paper-based, cheap). Use high-fidelity, computer-based prototypes when the product nears completion, because they give more genuine performance data (p.28-29).
  **Why** Cheap models test many concepts without extra money, time or effort (p.31).
  **Applies to** all. **Check** process: low-fi artefact precedes hi-fi render. **Source** (p.28-29, 31)

- **RULE [PU-PRO-10]** Test early and often, and treat test findings as grounds to revise the problem statement and loop back; do not treat the process as linear (p.33, 36).
  **Why** Planned products rest on designer assumption until tested; later insights change earlier decisions (p.33, 36).
  **Applies to** all. **Check** process: at least one render-critique-revise iteration recorded. **Source** (p.33, 36)

- **RULE [PU-PRO-11]** In moderated usability testing, let the moderator ask clarifying questions and ask participants to think aloud; most valuable with a high-fidelity prototype (p.34, 92).
  **Why** Reveals why participants act the way they do (p.34).
  **Applies to** all. **Check** process. **Source** (p.34, 92)

- **RULE [PU-PRO-12]** Use focus groups of six to nine members to study attitudes toward a specific solution (for example how onboarding makes users feel) (p.34).
  **Why** Group debate surfaces feelings, not task performance. **Applies to** SaaS app UI (onboarding), landing page. **Check** process: group size 6-9. **Source** (p.34)

- **RULE [PU-PRO-13]** Critique with precise, practical recommendations (constructive criticism) rather than verdicts (p.34).
  **Why** It is the most effective way to give input on design solutions (p.34). **Applies to** all (the engine's own critique step). **Check** process: each critique item carries a concrete fix. **Source** (p.34)

- **RULE [PU-PRO-14]** Use testing to find where cognitive load is high; if high, the experience gets less pleasurable (p.34-35).
  **Why** Load is the amount of brainpower required (p.34). **Applies to** all. **Check** visual + process (task walkthrough). **Source** (p.34-35)

- **RULE [PU-PRO-15]** Pick method by phase: Wizard of Oz in user research (p.91); cognitive walkthrough in prototyping, working through tasks from the user's perspective (p.92); moderated testing with hi-fi prototype (p.92); contextual inquiry after launch, observing users in their natural setting (p.92).
  **Why** Each keeps focus simple or realistic for its phase (p.91-92). **Applies to** all. **Check** process. **Source** (p.91-92)

### Audit additions (audit 2026-10-15)

- **RULE [PU-PRO-16]** Before designing, profile the user on four named axes and write each down: knowledge and experience level; the features of their needs, duties and jobs; psychological qualities; physical attributes. Pair this with knowing how people interact with computers and the important human aspects in design, then use research strategies to fill the profile.
  **Why** The book lists these seven steps as what "the designer must always perform" to develop a fully usable system; skipping any leaves a dimension of the user guessed.
  **Applies to** all. **Check** process: brief/DIRECTION has an entry for each of the four axes (experience level, tasks/duties, psychological traits, physical attributes/device context). **Source** (p.4) (audit 2026-10-15)

- **RULE [PU-PRO-17]** Run ideation as a team session with stakeholders and use named techniques beyond plain brainstorming: body-storming, reverse thinking and "worst possible idea"; colour-code sticky notes by idea type; categorise ideas only after generation.
  **Why** Design thinking "is not a solitary activity": people with diverse expertise give original ideas before the group narrows them to feasible solutions; worst-idea and reverse techniques free people to be creative with their answers.
  **Applies to** all (direction exploration). **Check** process: ideation log names the technique used and contains ideas from more than one technique before narrowing. **Source** (p.6, p.20-21, p.26) (audit 2026-10-15)

- **RULE [PU-PRO-18]** Build prototypes for four purposes, not only to test functionality: empathy (understand the design space and user before any solution), explore (think through a wide range of options by making them), user testing and refinement (prototype plus its environment), and demonstrating the vision to coworkers, clients, customers and investors. Give each prototype one variable to explore so a complicated problem is split into small testable parts.
  **Why** Prototyping removes uncertainty and misunderstanding cheaply; isolating a variable makes the result of each test attributable.
  **Applies to** all. **Check** process: each prototype/variant states its purpose and the single variable it tests. **Source** (p.30-31) (audit 2026-10-15)

- **RULE [PU-PRO-19]** In testing, hand participants the prototype and ask them to carry out typical tasks; record what issues they hit and how they feel, then approve, enhance or reject each solution one by one on that feedback.
  **Why** Testing shows how real users engage with the product, what problems they encounter and how they feel; until then the design runs on the designer's assumption.
  **Applies to** all. **Check** process: test script lists typical tasks; findings logged per solution with an approve/enhance/reject decision. **Source** (p.27, p.32-33) (audit 2026-10-15)

### Audit additions: page images (audit 2026-10-15)

Found by viewing the page images of p.13-18 and p.31-39 (printed page = PDF page - 2).

- **RULE [PU-PRO-20]** Alternate analysis and synthesis throughout the work, not once: break observations into what / why / how (analysis), reassemble them into a problem statement (synthesis), then re-synthesise after every new finding into a more complex synthesis. Do not freeze the problem statement after the Define stage.
  **Why** Tim Brown (IDEO, *Change by Design*) is quoted that analysis and synthesis are "equally important" in creating options and making choices; the book adds that they "frequently occur concurrently" across all stages (p.14-16).
  **Applies to** all. **Check** process: DIRECTION.md or the critique log shows the problem statement revisited after render/critique, not only written at the start. **Source** (p.14-16) (audit 2026-10-15)

- **RULE [PU-PRO-21]** Treat ethics as part of the design brief: research the context of use with social, cognitive and data-driven evidence; design, prototype and test for usability; and refuse or push back on "dominant narratives and ways of thinking that might harm people". Start from the people who will use the product, not from a solution or a tool the company wants for itself.
  **Why** The p.38 callout box lists three things HCI/UX/UI practitioners learn (context-of-use research; design-prototype-test for usability; issues including "the ethics of HCI, UI and UX"), and the p.39 Dickard (Drexel / Vanguard) quote says many companies "start with solutions" and build tools for themselves rather than for users.
  **Applies to** all (this is the book's only explicit basis for the dark-pattern stance in human-factors-principles.md section 5). **Check** process: the brief names the user context it was researched from; any pattern that works only because the user did not notice is flagged (see human-factors-principles.md section 5). **Source** (p.38-39) (audit 2026-10-15)

Viewed, nothing new beyond the rules above: p.13 (Define stage intro), p.17-18 (three characteristics of a problem statement, the 5% example; covered by PU-PRO-01/02), p.31 ("Demonstrate your vision"; covered by PU-PRO-18), p.32 (figure "User Testing, Do Users Need My App..?": four user avatars with three ticks and one cross; it pictures the per-participant verdict of PU-PRO-19, no new content), p.33-36 (covered by PU-PRO-10..14), p.37 (design thinking nurtures creativity, cooperation, innovation in organisations: framing).

## 3. Numbers & scales

| Item | Value | Page |
|---|---|---|
| Design thinking stages | 5 (Empathize, Define, Ideate, Prototype, Test) | p.6 |
| Empathy map quadrants | 4 (Says, Thinks, Does, Feels) | p.9 |
| Success criteria | 3 (attractiveness, viability, feasibility) | p.11-12 |
| Focus group size | 6 to 9 members | p.34 |
| Example metric rejected in a problem statement | boost food sales to seniors by 5% | p.18 |
| Empathy methods listed | 8 | p.11 |
| Prototype fidelity classes | 2 (low, high) | p.28-29 |
| Human-factors research methods | 4 (Wizard of Oz, cognitive walkthrough, moderated usability testing, contextual inquiry) | p.91-92 |
| Designer's must-do steps for a usable system | 7 (familiar with human-computer interaction; human aspects; user knowledge and experience level; needs, duties and jobs; psychological qualities; physical attributes; use research strategies) (audit 2026-10-15) | p.4 |
| Named ideation techniques | 3 besides brainstorming (body-storming, reverse thinking, worst possible idea) (audit 2026-10-15) | p.20 |
| Prototype purposes | 4 (empathy, explore, user testing and refinement, demonstrate vision) (audit 2026-10-15) | p.30-31 |
| HCI/UX/UI practitioner skills (callout box) | 3 (context-of-use research; design-prototype-engineer-test for usability; issues incl. collaborative learning, social computing, ethics) (audit 2026-10-15, page images) | p.38 |

## 4. Dos and Don'ts

- Do: "Elders need meal delivery to have access to nutritious meal alternatives." Don't: "Boost food sales to seniors by 5%." (p.18-19). Why: first is user-need, second is company-need.
- Do: mind map with the problem in the centre, one keyword per branch, every item connected to the hub. Don't: long sentences scattered without links (p.25).
- Do: ideation sheet with sticky notes colour-coded by idea type (p.26). Don't: judge ideas while brainstorming (p.23).
- Do: Wizard of Oz (a person acts as the computer) to elicit natural interaction (p.91). Don't: wait for a finished product to validate (p.28).

## 5. Exceptions & judgement calls

- The book itself hedges: design thinking "does not always succeed" and is not one-rule-fits-all (p.7); innovation carries risk proportional to creativity (p.22).
- Defining the problem narrowly without naming a solution sits in tension with delivering a specific landing page quickly; for a bounded request ("build a pricing page") the statement can be short, but still user-framed.
- [engine note] For an automated agent, the empathy and testing steps cannot be run with real users. Substitutes: cognitive walkthrough against the brief, render-and-measure, and founder accept/reject ledger. Do not claim user validation that did not happen.
- [engine note] "Quantity over quality" in ideation conflicts with the engine's diversity goal only if quantity means near-duplicates; require directions to differ on layout structure, type, and colour logic, not wording.
- [engine note] "Pay attention to what users do" does not mean metrics alone; behavioural data without a theory of why produces the over-optimisation described in the persuasion / dark-pattern notes in human-factors-principles.md section 5.

## 6. Figures worth keeping

All diagrams in this range are decorative or process diagrams with no UI content. Optional: p.9 (empathy map four-quadrant layout, user circle in centre); p.8 (Empathy tree: see their world / appreciate them / understand their feelings / communicate your understanding); p.19 (ideation hub diagram). None teach visual rules.

## 7. Open questions

- p.28: text is duplicated in the extraction (OCR artefact: the "Why is Prototyping Important?" paragraph appears twice). No content lost.
- p.34: "Here's how to hold focus groups" / "Here's how to criticize a product or a website" are link texts to external articles; the content is not in the book.
- p.1: no rule content (cover). p.2: no rule content (contents; page numbers 01, 36, 03, 38, 52, 80, 89 are printed pages of sections).
- p.5, p.37, p.38, p.39: framing only; claims about Samsung/Google adoption, Drexel quote (p.38-39). No rules.
- Unknown: p.10 sentence "The goal of the empathize stage is to understand the people" continues on p.11; no loss.
- Page-level gaps: none.
- (audit 2026-10-15) Gap pass over all 93 pages of text (images spot-checked via contact sheets of p.1-30, 61-66, 91-93; the book has no UI figures). Gaps found and added: p.4 designer checklist, p.20-21 named ideation techniques, p.30-31 prototype purposes, p.27/p.32 task-based test and per-solution verdict. The other four notes in this folder were checked against p.40-90 and had no missing teachable points.
- (audit 2026-10-15) No rule content: p.1 cover, p.2 contents, p.3 and p.5 framing, p.37-39 HCI motivation and Drexel quote, p.93 "Points To Remember" summary.
- (audit 2026-10-15, page images) Every page image in this note's range (p.1-39, p.91-93) has now been viewed: p.13-18 and p.31-39 in this pass, the rest in the earlier pass. Added PU-PRO-20 (analysis/synthesis loop, p.14-16) and PU-PRO-21 (ethics and context-of-use research, p.38-39). Viewed, no new content: p.13, p.17-18, p.31-37 (listed in the section 2 audit block).
- (audit 2026-10-15, page images) Source error: p.17 calls Ideation "the third and final step of the Design Thinking process"; p.6 and p.36 list five stages with Ideate third. Treat "final" as a slip.
