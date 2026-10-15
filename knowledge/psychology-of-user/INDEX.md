# Psychology of User (Pixsel Academy) - knowledge index

Source: `corpus/psychology-of-user/` (93 PDF pages; printed page = PDF page - 2). Status: all 93 pages read, and every one of the 93 page images viewed (final pass 2026-10-15 viewed p.13-18, 31-60, 67-90; see `knowledge/FREEBIES-COVERAGE-2026-10-15.md`).

Character of the book: a short generic HCI primer (design thinking, Norman action cycle, Galitz-style perception/memory/acuity, ISO 9241 human factors). It has no UI screenshots. Its numbers are few (listed in each file's section 3). It does **not** cover persuasion, trust, motivation, Hick's Law, colour psychology or reading patterns; see "Gaps".

| File | Pages | Content | Rules |
|---|---|---|---|
| `process-and-research.md` | 1-39, 91-93 | Design thinking stages, problem statement, empathy map, ideation, prototyping, testing, research methods | 21 (PU-PRO; 4 added in audit 2026-10-15, 2 more from page images) |
| `why-systems-fail.md` | 40-53 | Human action cycle, six causes of difficulty, psychological and behavioural responses to poor design, designer bias | 20 (PU-ACT, DIF, RES, BIA; 4 added from page images 2026-10-15) |
| `perception-and-attention.md` | 54-58, 63-72 | Gestalt (proximity, similarity, closure...), figure-ground, habituation, acuity (5 degree zone), peripheral vision, interference | 18 (PU-PER) |
| `memory-models-learning-effort.md` | 59-63, 73-81 | Working memory (3-4 items; Miller 7+/-2), recognition vs recall, mental models, Jakob's Law, Fitts' Law, learning, skill, cognitive and kinematic load | 24 (PU-MEM, MOD, FIT, LRN, SKL, LOD; 1 added from page images 2026-10-15) |
| `human-factors-principles.md` | 82-93 | Ergonomics, consistency, control, efficiency, error management; **cross-law conflicts, dark patterns, over-simplification** (section 5) | 19 (PU-ERG, CON, FAM, CTL, EFF, ERR) |

Total: 102 rules (4 added in the text audit 2026-10-15, 7 more in the page-image pass the same day). Rule ids (`PU-xxx-nn`) are stable cross-references.

## Highest-value rules for landing pages and SaaS UI

- Proximity and similarity encode grouping: PU-PER-01, PU-PER-02.
- One dominant signal; remove elements with no function: PU-PER-06, PU-PER-08.
- No moving content beside reading/working content: PU-PER-13.
- Colour must not contradict meaning (red go / green stop): PU-PER-16.
- Working memory 3-4 items, not 7: PU-MEM-01; recognition over recall: PU-MEM-07.
- Follow convention (Jakob), or teach one clear new model: PU-MOD-02, PU-MOD-03.
- Large targets for critical functions, edge bleed: PU-FIT-01, PU-FIT-02.
- One label per concept; consistent components: PU-DIF-06, PU-CON-01.
- Visible feedback for every action; cancel/undo; helpful, blameless errors: PU-CTL-01/02, PU-ERR-02..05.
- Effort must stay below perceived reward: PU-RES-05, PU-LOD-03.

## Gaps

- Not in the book (any related guidance in these files is marked [engine note]): persuasion, trust, motivation, Hick's Law, Doherty, scarcity/social proof, dark-pattern taxonomy, accessibility standards, reading patterns, colour psychology.
- No numeric thresholds for target size, spacing ratios, contrast, or response time are given by the book.
- The "7 +/- 2" glyph is missing from the source (printed "7 2"); flagged in memory-models-learning-effort.md.
- No figures worth copying into `examples/` (only the p.65 acuity diamond, as text).
- p.54 lists "individual variances" as an important human characteristic, but the book never covers it (found in the 2026-10-15 page-image pass).
