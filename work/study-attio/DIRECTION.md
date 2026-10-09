# Study Attio: direction (private study, not a client build)

**Brief:** 1:1 recreation of Attio's Deals records table (sidebar + view bar + sort/filter bar + table + footer aggregates) to train product-UI craft after the founder rejected `work/acquisity-dashboard` as "nothing like Attio... too noobish". Credit: Attio. Not for publication.

**Reference:** `ref/reference.png` = attio.com/platform/data "sales-screen" image, served at 4536x2252 (1134x563 CSS @4x). Copy in `knowledge/benchmarks/attio/img/data-sales-screen-original-4536x2252.png`.

**Method:** measure the reference at 4x (hairline scan, ink-band scan, point colour sampling: `tools/lines.cjs`, `tools/bands.cjs`, `tools/probe.cjs`), build at native 1134x563 in plain React + CSS (`app/src/App.tsx`, `app/src/study.css`), render @4x, compose reference | render | 50% onion | difference (`tools/compare.cjs <N>` writes `round-N.png` + `round-N.json`), read the gap per zone, fix, repeat. Company logos and people photos are cropped from the reference (`app/public/ref-assets/`) so the overlay measures layout, not photography.

**Rounds:** 1 -> 6, pixels off (>24/255 mean channel diff) 5.18% -> 1.78%; mean abs diff 8.59 -> 2.19. Lessons are rules in `knowledge/web/attio-product-ui.md` (section 2.8 and section 4).

**Residual gap (accepted):** Attio's own icon glyphs (sort arrows with a plus, the select/"Source" icon, the sidebar toggle with two dots) have no exact public equivalent; sub-pixel text rasterisation differs (their PNG was rendered by their own pipeline). Everything else lands within 0.5 px.

**Overrides:** founder rule "use a professional icon set" kept: nearest Lucide/Remix/Phosphor glyphs used, no hand-drawn SVG.

Run: `cd app && npx vite build && node ../tools/compare.cjs 7`.
