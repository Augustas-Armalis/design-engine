# Canon: the designer's eye (pre-delivery hunt list)

**Decided 2026-10-22.** The founder asked the engine to "develop a designer's eye for random clipping and half-visible things".

This page is the list to hunt through on **every** render before delivery, whatever the kind. It sits on top of the kind's own canon page and its checklist; it does not replace them.

Each item says how to detect it, by eye or by script, and what fixes it.

**Evidence:**
- the eight effect replicas: `knowledge/web/effects-replicas-2026-10.md`, rule FX-16. Every studio reference bleeds its visual and never its words;
- the Tempra hero h4a, where the chips were moved on top of the masked grid so that none is half-visible;
- the cadence-product verdicts recorded in `founder-taste.md` (no lines behind elements, one weak grey, one ink primary).

## How to run it

1. **Gate.** Run `node tools/gate.mjs <url> --kind <kind> --name <name> [--w --h at the work's real size]`. Two of the items below are gate checks:
   - `align/crop.text-crossing`
   - `align/crop.text-half-faded`

   Both must PASS.
2. **Look.** Open the 2x fold (`reports/<name>/gate-fold.png`) and zoom to 200% on:
   - each edge of the frame;
   - each card edge;
   - each mask or fade boundary.

   Walk the list below and write one line per item in DIRECTION.md: `eye: DE-01 ok, DE-02 ok ...`.
3. **Fix the class, not the instance.** A half-faded chip means every element on that layer is suspect. Move all text off the masked layer.

## The list

| ID | Hunt for | Detect | Fix |
|---|---|---|---|
| DE-01 | **An element half-faded by a mask:** a label, chip, card or icon whose top is crisp and bottom gone, or whose middle runs through a fade edge. | **Script:** gate `crop.text-half-faded`. Alpha is measured from three screenshots (as is / mask off / layer hidden). It flags alpha that varies by more than 0.35 across a line, or a mean alpha of 0.12-0.6. **Eye:** look for any glyph cut by a gradient. | Put text and chips on a layer above the mask (h4a pattern). Mask only the visual. A gentle fold fade of the whole product is fine; it varies under 0.1 per line. |
| DE-02 | **Clipping at a page or card edge:** a card, avatar, chip or button cut by the frame or by its container, where nothing else on that edge is cut. | **Eye:** walk the four frame edges and every `overflow:hidden` box. One cut thing on an edge is an accident; a deliberate bleed cuts one big visual by at least 25% of its size. **Script (text only):** gate `crop.text-crossing`. | Either bring it fully in, or commit to the bleed: one large visual cut by at least 25%, never a small element cut by a few px. |
| DE-03 | **Lines running behind or through elements:** gridlines, connectors, rails or chart guides visible through or under a card, chip, label or node. | **Eye:** zoom to 200% on every element that sits over a line layer; look for the line continuing inside the element's box or touching its text. **Script (manual):** screenshot with the line layer hidden and diff inside the element boxes. Any changed pixel inside an opaque element is a leak. | Give the element an opaque fill, or break the line at the element: stop it a gap of 4-8px short. The canon line is "nothing runs behind an element" (product-ui, section-bento). |
| DE-04 | **Alpha fills showing gridlines:** a translucent card, glass tile or tint that lets a grid, dots or text show through. | **Eye:** check every rgba/backdrop fill that sits over a pattern. **Script:** `getComputedStyle(el).backgroundColor` alpha < 1 while an element with a repeating background or lines lies under its box. | Use a solid tint (mix the alpha colour onto the page colour by hand: `color-mix(in oklab, tint x%, page)`), or a real backdrop blur of at least 6px that dissolves the pattern. |
| DE-05 | **Inconsistent greys across surfaces:** two or three near-identical greys for fills, borders or text that should be one token. | **Script:** gate colour census plus `tools/style_diff.mjs`. List the distinct computed `background-color` / `border-color` values with OKLCH L within 0.02 of each other; more than one per role is drift. **Eye:** put two "same" surfaces side by side at 200%. | Bind one weak-grey token per role (fill, line, muted text) and replace the strays (cadence r2: "one weak grey for every fill"). |
| DE-06 | **Several heavy primaries in one view:** two or more filled ink or accent buttons, or a filled chip that competes with the primary. | **Script:** gate `buttons.*.primary-count` and `primary-recipe`. **Eye:** squint: how many solid dark or saturated blocks pull first? More than one per view is a fail. | Keep one ink primary per view; the rest become secondary (white plus hairline) or text. Suggestions use the soft material (Tempra: "one ink primary"). |
| DE-07 | **Text crossing a crop:** a headline, label, number or chart tick cut by the frame, a card edge, a scroll box or the edge of a screenshot crop. | **Script:** gate `crop.text-crossing`. Text line boxes (Range rects) that are 2-98% visible against the viewport's left, right or top edge or any clipping ancestor. The fold bottom is exempt; ellipsis truncation is exempt. **Eye:** for social crops and bento cells, check every crop edge by hand. | Move or shorten the text, or crop the frame so that the cut falls between elements. For X-post crops, re-cut at a gutter. |
| DE-08 | **A fade edge running through the subject:** the dissolve of a product or visual starting in the middle of a key element (a KPI, the primary row, a face). | **Eye:** find where the mask reaches about 50% and check what sits on that line. | Move the fade start into a gutter or below the last key row (h4a: the fade starts at y 845 and only reaches about 0.7 by the 900px fold, so no row is half-gone). |
| DE-09 | **Light from nowhere:** glow, rim or bloom with no visible source, or shadows that disagree with the brightest region. | **Eye:** point at the light source; every highlight and shadow must agree with it (FX-03, FX-05, KH-12). | Remove it, or give it a source object (FX-06). |
| DE-10 | **Visible construction:** strand ends, round caps, tile seams, repeating noise tiles or the edges of the gradient canvas inside the frame. | **Eye:** zoom on the edges of every generative layer. | Start strokes off-frame (FX-10); make the noise as large as the canvas; extend gradients past the frame. |

## Never

- Never ship a gate FAIL on `crop.text-crossing` or `crop.text-half-faded`. If the cut is the concept (a giant headline running off the page as a brand device), write `override: crop.text-crossing because <reason>` in DIRECTION.md.
- Never fix DE-01..DE-04 on one element only. Sweep the whole layer.

## Gate calibration (2026-10-22)

| Page | Result |
|---|---|
| Tempra hero `#/h4a` (hero-light, 1440x900) | `crop.text-crossing` 0; `crop.text-half-faded` 0/56 masked lines. The product fold fade, alpha 1 to ~0.7 per line, passes. |
| Cadence product `#/cproda` (product-ui, at its real 1600x1200) | 0 and 0/0. At the wrong 1440 viewport it reports 5 crossings at viewport-right: run the gate at the work's real size. |
| Negative page (a text cut at viewport-left, a label clipped by a card bottom, a phrase run through a horizontal mask; plus a fully visible masked line and an ellipsis as controls) | Exactly the 3 defects are flagged; both controls pass. |
