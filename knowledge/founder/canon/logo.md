# Canon: logo mark and lockup

Decided defaults, 2026-10-21. Evidence: `founder-taste L<n>`, the accepted traced marks (Kestrel flower, Quorum loops "nice logo pick", Kite K-star). Gate numbers: `system/canon/logo.json` (the schema has no lockup keys; the lockup numbers live in the table below and in `tools/logo.mjs present`).

## Floor references
- **Traced from a Pinterest pick:** Quorum, `work/quorum/brand/quorum-mark.svg` + `trace-compare.png` + `ref/SOURCE.txt` (L256 "nice logo pick").
- **Traced from a founder-supplied image:** Kestrel flower (`work/kestrel/brand/`, L162), Kite K-star (`work/kite/brand/`, L449, L461).
- Presentation bar: logosystem.co references in `knowledge/benchmarks/logos/process/` (L346, L349).

## Reading set (5 files)
1. this page
2. `.claude/skills/logo-from-image/SKILL.md` (source, trace, use)
3. `system/logo/drawing-method.md` sections 7-9 (wordmark, tests, what not to do) when a mark must be drawn
4. `knowledge/web/logo-craft.md` sections 5-6 (presentation)
5. the last 5 ledger rounds

## Decided route

| Situation | Route | Source |
|---|---|---|
| Founder supplies an image | trace it to SVG unchanged (`tools/trace_logo.mjs`), square viewBox, `fill=currentColor`, ink on light | L162, L449 |
| Fictional or demo brand | pick an abstract mark from Pinterest (via Bing `site:pinterest.com`), trace it, record `brand/ref/SOURCE.txt`, mark it placeholder in DIRECTION; the founder swaps it if he dislikes it; never Logoipsum | L256; logo-from-image |
| Real client, asked to draw | `system/logo/drawing-method.md`: 8-12 concepts from 4+ sources, 30+ cell sweep judged at 16px, 3-4 routes, drawn contour with tension, optical pass, `logo_curves` + `logo_measure` | CLAUDE.md logo rule; L349 |
| Anything else | do not draw; ask | L349 |

## Decided numbers

| Part | Default | Source |
|---|---|---|
| Mark | one shape, solid, high contrast, no text, reads at 16px, one colour (ink); accent only if the brand system says so | L22; logo-from-image |
| Container | none: no rounded square, disc or shield behind the mark | L26; drawing-method section 9 |
| Nav lockup | mark = 1.43 x the wordmark's cap height, gap = 0.28 x mark height, wordmark >= 20px (Kite: 26px mark + 23/600 wordmark) | L26, L346, L461 |
| Wordmark | the build's display face (Inter display 20-23 / 600 / about -0.035em) unless a drawn wordmark was asked (then 1-3 measured edits on a base face with character) | L461; drawing-method section 7 |
| Presentation | each finalist on white, on the brand colour and on ink, at 32 / 24 / 16px, in the real nav lockup, with its one-sentence idea; then in place in the live build (nav, favicon, product assistant avatar) | L346 |
| Reuse | the same mark in the nav, the product (assistant tile, favicon) and the closing section | L162; logo-from-image |
| Trace quality | the trace sheet (source crop / 256 / 64 / 32 / 16) matches silhouette, counters and corner softness; 16px still reads | logo-from-image step 2 |

## Contradictions resolved

| Topic | Default | Superseded lines |
|---|---|---|
| Construct vs trace | trace (supplied image or Pinterest pick) | L22's "construct the mark with `tools/logo.mjs` from exact geometry" as a default route (L349: primitive-built finalists "pretty awful"; L256 later) |
| Lockup ratio | 1.43 x cap height, gap 0.28 x mark | logo-from-image "cap height + 20%, 10px gap" |

## Never (rejected, with evidence)
- Two overlapping rounded squares, sparkles, hexagons, swirls, icon-set glyphs as a mark (L22 "straight up dogshit").
- Icon in a box; a 17px wordmark (Tideline, L26).
- Marks built from textbook primitives: a disc with slits, two half discs, circles in a row (Tandem T-cut and Halves, L349 "pretty awful").
- Compass-built marks that read as road signs (CLAUDE.md, LD-20); a letter in a container; mirror-symmetric one-weight marks.
- A famous brand's mark as the pick (logo-from-image).
- Restyling the palette or page from a logo reference (Perch r3, L409 "nouuu not green").
- Presenting a fictional mark as client work (hard stop).

## Pre-delivery checklist
1. Route matches the situation table; `brand/ref/SOURCE.txt` exists for a Pinterest pick.
2. Trace sheet read; 16px version reads; one evenodd path, `currentColor`.
3. Lockup measured in the nav: mark / cap ratio 1.43 (±0.1), gap 0.28 x mark, wordmark >= 20px.
4. `node tools/logo.mjs present` sheet: white, brand field, ink, 32/24/16.
5. In place: nav, favicon, product avatar screenshot attached.
6. A logo reference changed only the logo (diff palette tokens against the last liked round, L409).

## Open
- No engine-drawn mark has ever been accepted; the drawing method is unproven with the founder.
- Wordmark drawing (edits on a base face) has no verdict.
