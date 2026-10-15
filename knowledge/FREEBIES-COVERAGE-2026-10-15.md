# Freebie books: coverage record (2026-10-15)

Founder's question: were the three Pixsel Academy freebies studied "absolutely everything without missing a point"? This file is the evidence. Page numbers are PDF pages. Sources: `/Users/augustas/Documents/UI Pedia/Freebies/`.

## Summary

| Book | PDF pages | Text read | Page images viewed | Rules in `system/rules/index.json` | Added in this pass |
|---|---|---|---|---|---|
| 101 Dos & Don'ts of UI Design | 106 | 106 | 106 (earlier audit); 15 tip pages re-viewed today as a spot check | 110 (`dos-and-donts/dos-and-donts.md`) | 0 rules; 1 source note (T74 sample-data slip) |
| Psychology of User | 93 | 93 | 93 (60 of them today: p.13-18, 31-60, 67-90) | 102 (5 files in `psychology-of-user/`) | 7 rules, 3 number rows, 1 source gap, 1 source error, 3 open questions resolved |
| What to do Next | 120 | 120 | 120 (102 of them today: p.1-18, 25-102, 115-120) | 76 (4 files in `what-to-do-next/`) | 10 rules, 1 block of platform facts, 1 page-offset correction |
| Total | 319 | 319 | 319 | 288 | 17 rules |

Method today: each page was rendered from the PDF with PyMuPDF into 2-up and 4-up composites (about 700 px per page width, fully legible) and opened with the Read tool. Every figure, callout box, list, number and screenshot was compared against the notes by grep before anything was added.

## 1. Psychology of User (93 pages)

Earlier pass: all text, plus images of p.1-12, 19-30, 61-66, 91-93. This pass: images of p.13-18, 31-60, 67-90. Every page image is now viewed.

Added (all under `### Audit additions: page images (audit 2026-10-15)` in the note named):

| Page | Point | Where |
|---|---|---|
| p.14-16 | Analysis and synthesis alternate through every stage (Tim Brown, *Change by Design*) | PU-PRO-20, process-and-research.md |
| p.38-39 | Ethics callout box (context-of-use research, design-test for usability, ethics of HCI/UI/UX) and the Dickard quote ("push back on dominant narratives ... that might harm people") | PU-PRO-21, process-and-research.md |
| p.41-42 | Worked action-cycle examples and their evaluation questions (letter; electrical-device deal) | PU-ACT-04, why-systems-fail.md |
| p.48 | Confusion = perceived structure overwhelmed by detail | PU-RES-06, why-systems-fail.md |
| p.49 | "Systems that are rigid and harsh are a primary source of annoyance" | PU-RES-07, why-systems-fail.md |
| p.50 | Abandonment is available to almost everyone "thanks to the Internet" | PU-RES-08, why-systems-fail.md |
| p.79 | Performance load = principle of least effort / least resistance (Lidwell 2003) | PU-LOD-04, memory-models-learning-effort.md |
| p.54 | "Individual variances" listed as a key human characteristic but never covered by the book | source gap, perception-and-attention.md section 7 and INDEX gaps |
| p.17 | Book calls Ideation "the third and final step" (it is third of five) | source error, process-and-research.md section 7 |
| p.74, p.78, p.84 | Duplicate paragraph is in the print; p.78 list is a sidebar box; p.84 variables sit in a callout box | open questions resolved in section 7 of the matching notes |
| p.83, p.86 | Human factors as a synthesis of psychology, sociology, engineering, industrial design; Jakob's Law printed as "Law of Internet User Experience" | human-factors-principles.md audit block (framing, no rule) |

Viewed, no new content: p.13, 15-16 (beyond PU-PRO-20), 17-18, 31-37, 40, 43-47, 51-53, 55-60, 67-78, 80-82, 84-90. Each is listed in the audit block of its note.

## 2. What to do Next (120 pages)

Earlier pass: all text, plus images of p.19-24, 103-114. This pass: images of p.1-18, 25-102, 115-120. Every page image is now viewed.

Added:

| Page | Point | Where |
|---|---|---|
| p.89 | Ask an over-capacity client whether they are willing to wait; schedule ahead | brief-scope-and-delivery-process.md |
| p.42, p.46 | Win work with success stories; build "a beautiful and informative professional profile" | presenting-work-portfolio-and-case-studies.md |
| p.96-97 | The book's own UI verdicts on job boards: small font is hard to read for long periods; vivid full-row colour gets "visually heavy after a time" | presenting-work-portfolio-and-case-studies.md |
| p.115-116 | Three-circle diagram for explaining your process (know the subject; work process and issue handling; thought process) | career-skills-and-positioning.md |
| p.44-45 | Three Experience self-check questions | career-skills-and-positioning.md (human-only) |
| p.63 | Start an agency with the service you already sell, expand later | freelance-business-and-agency.md |
| p.64 | Catapult Creative (Daniel Rizer): build a referral network before hiring in-house | freelance-business-and-agency.md |
| p.69, p.74-75 | Choose HQ early (state-level law); TESS trademark search; advice is US-only | freelance-business-and-agency.md |
| p.81 | Keep a new agency simple; not at full capacity at first | freelance-business-and-agency.md |
| p.47, 50, 56 | Money-talk discomfort: ask other freelancers, practise speaking (TED.com) | freelance-business-and-agency.md (human-only) |
| p.31-41 | Platform facts (Fiverr $5 origin, "Elance Desk", Kimp 3-designer team, Onlinejobs.ph 2008, Freelancer.com 2009, ManyPixels vs Kimp, DesignCrowd price band) | freelance-business-and-agency.md, data only |
| p.112-120 | Printed-page offset changes (printed 111 used twice) | career-skills-and-positioning.md section 7 |

Viewed, no new content: p.1-6 (cover, contents, intro), 7-18 (freelancing definition, skills, communication; already covered), 25-30 (buffer, chunking, awards, project choice), 43, 47-62 (six keys, money, time, networking, closing points, agency definitions), 65-68 (niche, digital marketing), 70-73 (remote staff, Hubstaff, naming), 76-80 (structure, roles, suppliers, survival budget), 82-88 (timesheets, staged invoicing, exceptions, proposals, client communication), 90-95 and 98-102 (job boards, job-listing intro), 117-120 (interview questions 3-5, closing).

## 3. 101 Dos & Don'ts of UI Design (106 pages)

Earlier audit: every one of the 106 page images viewed and all 101 tips confirmed present. This pass: 15 random tips re-viewed as images (seed 20261015): T2, T4, T6, T25, T26, T28, T51, T55, T57, T62, T68, T74, T79, T84, T89. Page = tip + 4 held for all 15. Every number (200-500 tone levels, x / 2x button padding, default shadow 0/2/4 #000 50% vs 0/8/24 #000 15%) and every described visual matched the note. No fixes were needed. One source detail was recorded: in the T74 good mock the "Address:" field holds an email.

## Honest verdict

- **Coverage is complete.** All 319 pages of the three books have been read as text and seen as images. No page was skipped. Every page has either a rule or an explicit "viewed, no new content" entry.
- **"Every point" means every teachable point, not every sentence.** Anecdotes, motivational lines, author quotes that restate a rule, and platform marketing copy were checked and recorded as data or as "no rule content", not turned into rules. That is deliberate: a rule nobody can apply or check adds noise to `select_rules.py`.
- **This pass found 17 new rules.** None of them changes a visual default. Most are process or business points (What to do Next) or sharper wording of mechanisms the notes already used (Psychology of User). The highest-value ones for builds are PU-ACT-04 (outcome screens answer the user's evaluation question), PU-RES-06 (structure above detail), PU-RES-08 (abandonment is free on the web), PU-PRO-21 (the book's own ethics basis for refusing dark patterns), and the reading-fatigue rule from the job-board reviews.
- **The books' limits are unchanged.** Psychology of User gives almost no numeric thresholds and no UI screenshots, and it skips individual differences. What to do Next has no layout, type or colour rules. The numeric and visual rules come from 101 Dos & Don'ts and UI Pedia. The spot check confirms that note matches its pages.
- **Residual risk:** the Dos & Don'ts spot check covered 15 of 101 tips in this pass. The other 86 rely on the earlier full image audit.
