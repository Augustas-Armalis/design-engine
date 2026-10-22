# Canon: feature section / bento

Decided defaults, 2026-10-21. Evidence: `founder-taste L<n>`, Cadence bento v3 ("nowww we talking, yess this style is amazing", L518-519), the Kargul cell replica (ISO-31..38), Kaching's accepted bento (L242). Gate numbers: `system/canon/section-bento.json`.

## Floor references
- **Grammar and layout:** Cadence bento v3, `git show 1c22c95:work/replicas/cadence-bento@2x.png` (source `git show 1c22c95:work/replicas/app/src/Bento.tsx`). The file at HEAD is v6, which has no verdict yet.
- **Construction:** Kargul services bento, `knowledge/benchmarks/bento/kargul-services-bento.png`, and our registered replica `work/replicas/cmp-kargul-iso-overlay.png` (route `#/kiso`, `work/replicas/app/src/KargulIso.tsx`).
- **Product-visual bentos (animated product scenes, existing brands):** Kaching homepage bento, `knowledge/larpo-shipped/kaching-full.png`, rules L199, L207, L242.

## Reading set (5 files)
1. this page
2. `knowledge/web/isometric-line-art.md` sections 3, 10, 11 (ISO numbers, ISO-19..38)
3. `system/iso/iso.tsx` (kit header) and `system/iso/demo.png`
4. `git show 1c22c95:work/replicas/app/src/Bento.tsx` (the accepted cell component)
5. the last 5 ledger rounds

## Decided numbers (1440 desktop, light page)

| Part | Default | Source |
|---|---|---|
| Section head | centred h2 44 / 550 / -0.04em / lh 1.06, Title Case, at top 96; subtitle 17/26 `#5c5c5c`, 2 hand-set lines | Cadence v3 |
| Grid | 3 cells 392x434 over 2 cells 600x387, gap 24, container x 108 (1224 wide), grid top 300 | Cadence v3 (from the Kargul services bento) |
| Cell | `#f6f6f6`, r24 squircle, ring `0 0 0 1px rgb(0 0 0/.05)`, no shadow, faint dashed perspective lines (ink 4.5%, dash 2/5) | Cadence v3 |
| Cell copy | title 18 / 600 / -0.02em at 24px inset top-left; body 14/22 `#5c5c5c` pinned 24px from the bottom; caps chip row 16px under it (26px pills, 11/600 caps +0.02em, white, 7% ink ring, 6px gap) | Cadence v3; L518 |
| Art box | top 36, height 250 (tall cells) / 230 (wide cells), centred, drawn of the **product's own object** | Cadence v3; L524 |
| Construction | true 30° iso flat sheets (no side faces, no face shading by default); depth by stacking, drop ~0.37 x the sheet's short side | ISO-31; L527 |
| Stroke ladder | every stroke 1px; hierarchy by alpha only: light focal ink 55-62%, lower sheets ink 20-30%, guides ink ~14% dashed 3/3 (cell perspective lines 4.5%); dark = Kargul's white 62 / 30 / 14% on `#313131` | Cadence v3 L/F tokens; ISO-32, ISO-37 |
| Nodes | small iso diamonds on sheet corners only (half-width 4.5, ratio 0.58); never circles or edge-midpoint dots | ISO-33 |
| Texture | hatch (1px at ~2.2 unit pitch), dot fill or grain only on the hidden lower sheet, clipped to its plane quad | ISO-36 |
| Marks | one solid mark per cell, drawn in plane coordinates and projected; no skewed screen icons, no Lucide in the art | ISO-34, ISO-35 |
| Colour | greys by default; ONE accent per cell, only on the answer (the moved meeting, the found slot), plus at most one callout chip that names it | L518, L524; ISO-38 |
| Shading | none by default; on the one focal answer object only, the light tint family (top .985/.06C, lit .935/.26C, shade .865/.36C) when DIRECTION declares it | L524; ISO-27 |
| Responsive | tablet/phone: every cell the same height; sibling pages keep the identical grid | L203, L242 |
| Motion | none unless asked; if asked, one signature build-in per cell on shared tokens (explode/collapse 8-16 units, 600-900ms), <= 1 moving element at a time | L207, L388; isometric-line-art section 5 |

## Contradictions resolved (audit 4.1: five bento rules)

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Bento style | Kargul services-bento grammar in light mode (Cadence v3 layout + ISO-31..38 construction), drawing the product's own objects | product-visual bento (Kaching grammar: copy top, visual on the copy's left edge, fixed gap, no stage box, dither only in the lead cell) when the cells show animated product UI or the brand already owns that bento | L515 (lit object scenes: Cadence v1/v2 were "straight up ass"/"noobish") |
| Linear vs Kargul | take Linear's precision and restraint (one stroke weight, nothing decorative), keep Kargul's subject and construction | a Linear FIG triptych (2:1 dimetric hairlines, `mode="hairline" kind="dimetric"`) only for a technical brand whose DIRECTION asks for it; never mix iso and dimetric on one site | L521's "no callouts, no colour, geometry alone" (reversed by L524) |
| Callouts | at most one per cell, naming the answer | none | L521 |
| Shading | flat sheets | subtle tint on one focal object (above) | L524's shading as a default, ISO-19..30 face ramps as a default |
| Replication | done once (`cmp-kargul-iso-overlay.png` registered); re-run when a new construction (towers, extrusions) is introduced | — | — (L527 stands) |
| Kargul's own numbers (38 bento and section images measured, KC-16..19) | Cadence v3 values above (founder-accepted) | when the brief asks for Kargul's grammar itself: gap 12-18 light or 16-18 dark, or a 0-gap ruled hairline table (his most common light construction, 13/32); cell r10-14 or 0; padding 24; one edge per cell (a `#f7f7f7` fill with no ring, or a white cell with a ring on `#fafafa`); title ~19 / 400-500; heading ~50 / 500, ~54 above the grid | none; the measured corpus contradicts r24 / gap 24 / fill + ring as *his* numbers, but they are the founder-accepted floor |

## Never (rejected, with evidence)
- White cards with UI rows inside and no styling (Cadence v1, L515-516 "nothing cool about them").
- Abstract slabs, combs and bars with shading (Cadence v5-shaded, L524 "interesting yet stupid").
- Kit-drawn icons, circles, coloured tints and dot points on shaded slabs (cadence-bento r5: "very very much off ... from icons like you drew to circles to colors to points ... generic"). Fix: replicate one Kargul cell to registration first (ISO-31..38), then draw only in his construction.
- Invented icons, circles as nodes, random colours, violet glows (Cadence v4-shaded, L527 "generic and not good at all").
- Grey stage boxes around a visual inside the cell; visuals centred in a tall box (Kaching, L242).
- Small centred node diagrams in a wide cell (Kaching MCP, L384); box-in-box-in-box (L388).
- Replacing an accepted bento with a "systemised" grid without diffing against it (L242).
- Photo/art ramps off the section's own hue (L211).

## Pre-delivery checklist
1. Scope: only the bento section unless the page was asked.
2. Overlay one cell with the accepted v3 cell (`tools/compare.mjs`) at the same zoom; grid rects match the decided numbers within 2px.
3. Every stroke 1px; three alpha steps; diamonds only on corners; textures only on hidden sheets.
4. One accent family per cell, only on the answer; zero coloured guides or connectors.
5. Every figure is recognisably the product's own object and names its answer (L524).
6. Cell copy positions identical across cells (title inset, body bottom, chip row).
7. Box-shadow census <= 3; cell rings 5%; chips 7%.
8. Tablet and phone: equal cell heights; sibling pages identical rects (L203).

## Open
- Dark-mode feature bento in our own builds: no dark bento of ours has a verdict. Marcel's 22 measured dark bentos and sections (KC-19):
  - **Canvas:** the page is `#000`-`#111`, with cells 5-11 L above it.
  - **Light:** it comes only from objects in the cells (glass product UI, glossy 3D, a glowing shield or orb) and from a 1px ring that is brighter on the top edge. There are no page blobs.
  - **Cells:** a big number ('89%', '$27B', '24/7') carries one cell in 4 of the 22.
  - **Canvas tone:** none of these dark bentos sits on `#313131`.
- Cadence v6 (five Kargul constructions via SVG plane matrices) has no founder verdict; do not treat it as the floor until it does.

## Grammars beyond Kargul iso (2026-10-21)
The bento canon above decides the Kargul iso grammar. Two more measured grammars are allowed as alternatives, both built from pixel replicas:
- **Linear FIG triptych (dark):** `work/replicas/LINEAR-BENTO-NOTES.md`, LA-01..15, kit `work/replicas/app/src/lineart.tsx`. Mono FIG labels are allowed as a second family. Weight 510 is allowed.
- **Attio ruled sheet (light):** `work/replicas/ATTIO-BENTO-NOTES.md`, AB-01..15. Tinted signal chips may add a second hue family. Product cells are tagged `data-product`.

Both references' own secondary text fails AA: Attio's `#8f99a8` at about 2.8:1 and Linear's FIG labels at 40%. We darken ours to pass; we never copy an accessibility bug.

## Founder verdict 2026-10-22: the replicas land
On the Linear FIG, AlignUI Features-04 and affectUI 3-up pixel replicas, the founder said: "plus those were cool" (ledger `replica-linear-fig`, `replica-alignui-features04`, `replica-affectui-3up`). Two decisions follow:
1. These three grammars are approved bento floors.
2. The replicate-to-registration-first method is the confirmed way to reach the bar.

Build new bentos on a replica's own primitives (`work/replicas/app/src/{LinearBento,AlignBento,AffectBento,lineart}.tsx`), never from memory.

## Founder verdict 2026-10-22 (cadence-bento-rico r1, partial)
"Not bad, just meh. I like more rounded stuff." The Rico-grammar replicas were "cool". Bentos lean rounder: outer cards 24-32, inner wells concentric. Measure lunor.design's bentos (the founder's own style) and use them as the floor.

## Founder verdict 2026-10-22 (cbentol r2, partial: "not bad... looking nice")
- **No stray lines:** a connector, rule or gridline never crosses or touches another element. Break the gridline around a connector (panel-coloured backing). Selected or tinted fills are pre-blended solid colours, never alpha over rules ("in the maya like the line crosses over like cmonnnn").
- **The section header is the heading alone.** No 5-word subtitle or sample note on the right of a bento header. Sample labelling lives in aria labels and DIRECTION.
- Dark lunor grammar kept: r24 hero cell / r20 cells, 12px gap, product fragments cropped by the cell.
