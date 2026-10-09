---
name: design-engine-project
description: "Augustas's standalone front-end design \"brain\" repo at ~/dev/design-engine: what it is, where things live, how it differs from the Larpo knowledge base"
metadata:
  node_type: memory
  type: project
  originSessionId: c7ae5869-cc65-4450-bbb6-04aec004ab65
  modified: 2026-10-08T15:06:14.640Z
---

`/Users/augustas/Documents/Larpo front-end engine` (alias symlink `~/dev/design-engine`, no spaces) is Augustas's standalone front-end design engine (built 2026-10-08). Augustas wants everything built in that Larpo front-end engine folder. Goal: one prompt in, a well-designed, consistent, non-AI-looking SaaS/AI-SaaS site, hero, funnel or app UI out, with the engine improving from every project. It is separate from `~/dev/larpo/larpo-knowledge-base` (company ops, X posting, Telegram bot), which holds earlier design research and a feedback ledger that is not yet merged in.

Contents: studied UI Pedia (626 pages, image-only PDF, OCR'd with macOS Vision) and three Freebies books; ~20 web-research notes in `knowledge/web/`; `system/` (rule index of ~1,300 rules, tokens, 134-font catalogue, direction axes); tools `check.mjs` (Playwright render + measure), `ledger.mjs`, `deal.mjs` (direction dealer), `score.mjs`; fixed eval briefs in `evals/`. Entry points: `CLAUDE.md`, `docs/HOWTO.md`, skill `.claude/skills/design-engine`.

**Why:** the Larpo team's earlier prose-rules approach still produced one grammar for every brand; the model cannot randomise itself, so directions are dealt externally and every output is measured and compared with recent work.
**How to apply:** when Augustas gives a design brief, work in that repo and follow its CLAUDE.md pipeline. Rules are defaults that may be broken on purpose with a written override. Only record ledger verdicts the founders actually gave.
