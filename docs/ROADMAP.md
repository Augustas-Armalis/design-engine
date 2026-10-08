# Roadmap: the front-end brain

## Vision (the founder's words, condensed)
One prompt in, work out at the level of a top professional design system: fully specced, consistent, beautiful, never recognisably AI. The engine carries tens of researched design systems, studied from the best and authored by us, binds a project to one of them, and uses it consistently across every page that project ever ships. It keeps learning from every verdict. Quality bar: AlignUI-level rigor (https://www.alignui.com) with the distinctiveness that neutral kits deliberately lack.

## Architecture in layers
1. **Knowledge** (`knowledge/`): studied books, web sources, systems research. Rules with Why / Check / Source.
2. **Rulebook** (`system/rules/`, `system/defaults/`): the index, then decided defaults per topic where conflicts are resolved.
3. **Systems library** (`system/systems-research/` studied, `system/systems/` house systems): each a full spec: tokens, scales, component matrix, states, density, motion, usage rules, personality, best-for.
4. **Spec-first method** (`system/spec-template/`): before any page, a project gets a fully specced system, chosen from the library or derived from it.
5. **Compiler** (`tools/`): tokens.json to CSS variables / Tailwind v4 theme so every page uses the same tokens.
6. **Direction dealer + diversity gate**: externally dealt directions, fingerprints, ledger.
7. **Render-and-check + judge**: DOM/CSS measurements now; VLM pairwise judge and screenshot sameness next.
8. **Ledger + evals**: founder verdicts, fixed briefs, run-to-run comparison.

## Phases and status
| Phase | What | Status |
|---|---|---|
| 1 | Study the four books page by page, 12 web tracks, rule index (1,300+ rules) | done 2026-10-08 |
| 2 | Tools: check, ledger, deal, score; first end-to-end hero | done |
| 3 | Ingest top free sources (Vercel WIG, Practical Typography, Apple HIG, Emil, Rauno, Comeau, Material 3, NN/g, Laws of UX, web.dev, GOV.UK, a11y); merge Larpo's design research | running |
| 4 | Ecosystem scans: AI design tools, eval benchmarks, reference sources, self-improvement patterns | running |
| 5 | Quality-bar study: AlignUI dissection, Kargul profile, "fully specced" checklist | running |
| 6 | Research ~30 existing design systems into standard JSON profiles + notes | started (16 of ~30) |
| 7 | Seed the ledger from Larpo's documented founder verdicts | next |
| 8 | Decided-defaults pass: resolve conflicts, one rulebook per topic | next |
| 9 | Token compiler + spec-first step in the pipeline | after phase 5 |
| 10 | Author 12+ original house systems on the spec template; each rendered as a kitchen-sink page, checked, pairwise-distinct | after 6, 9 |
| 11 | Eval baseline on all 10 briefs using bound systems | after 10 |
| 12 | VLM judge, screenshot-sameness metric, verdict-to-rule workflow (per ecosystem research) | after 11 |

## Principles for the library
- A system is distinctive or it is not worth adding. Pairwise fingerprints must differ on at least 5 axes (type voice, palette temperature, shape language, density, depth, motion, imagery, nav and CTA grammar).
- Complete beats large: every component in a system has its full variant x size x state matrix before the system counts as done.
- Studied systems are inputs, never templates to clone. Licences are respected; values and structure are studied, component code is not copied.
- Every system must pass `tools/check.mjs` on its own showcase page with 0 fails.
