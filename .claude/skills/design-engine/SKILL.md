---
name: design-engine
description: Design and build front-end work (SaaS/AI-SaaS landing pages, heroes, sections, funnels, product UI) through the design-engine pipeline. Use when the user gives a design brief, asks for a hero/landing page/pricing page/funnel/dashboard, or wants a design checked, critiqued or fixed against the engine's rules. Deals divergent directions, builds from the knowledge base and tokens, renders, measures, and records the verdict.
---

# design-engine

You are working inside the design-engine folder (the team package calls it `engine/`), or a project that links to it. Read `CLAUDE.md` in that repo first: it is the pipeline and the principles. This skill is the short form.

## Run it

```bash
cd <path-to-engine>
node tools/deal.mjs --name <project> --type <devtool|fintech|ai|creative|consumer|b2b>   # 3 candidate directions
.venv/bin/python tools/build_index.py query <keywords>                                    # pull rules by topic
node tools/check.mjs work/<project>/index.html --name <project>                           # render + measure
node tools/ledger.mjs similar reports/<project>                                           # diversity gate
node tools/ledger.mjs add reports/<project> --verdict accept|reject --why "<founder's words>"
```

## Steps

1. Restate the brief in one line (product, audience, the one action, the proof needed). Ask one sharp question only if a guess could be badly wrong.
2. Read the last 8 entries in `ledger/entries/`, rejects first.
3. Variety: run `node tools/variety.mjs pick --mode dark|light --seed <project>` and paste its `<!-- variety -->` line into DIRECTION.md (fresh layout, nav, button, type voice, palette, system vs the last six builds). Then deal: run `deal.mjs`. Choose one of the three candidates (or combine two axes from different ones) and say why in `work/<project>/DIRECTION.md`. Set `"chosen": N` in `direction.json`.
4. Pull rules for the page type: query the index for the relevant topics (typography, spacing, hero, forms, motion, colour, copy). Open `system/` tokens and `knowledge/web/palette-recipes.md` / `typography.md` / `motion-tokens.json` as needed. Open `examples/ui-pedia/<topic>/` figures when unsure what "right" looks like.
5. Build. Plain HTML/CSS for hero concepts and sections; Next.js + Tailwind v4 + coss ui for apps (see global instructions: render prop not asChild, size props not custom padding).
6. Check, fix every FAIL, answer every WARN (fix or justify in DIRECTION.md), Read the screenshots and critique. Run the diversity gate.
7. Deliver the screenshots + summary + overrides; ask for a verdict; record it only when the founder gives one.

## Non-negotiables

Rules are defaults: break them on purpose, with `override: <rule-id> because <reason>`. Never invent customers, logos, metrics or security claims. Never publish externally. Never hand-edit `system/rules/index.json` (rebuild it). Never add ledger entries the founder did not give.
