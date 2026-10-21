# Canon: review and fix (existing work)

Decided defaults, 2026-10-21. Mode B of the engine: render, measure, rank, fix in place, sweep, prove. Evidence: `founder-taste L<n>`, `feedback-playbook.md` (cited `playbook`), the consistency contract in `knowledge/web/consistency-mechanics.md` sections 3.10-3.11 (K0-K18). Gate numbers: `system/canon/audit.json` are the engine defaults used only when the work has no kit of its own; a client's kit or `work/<name>/spec/contract.json` replaces them.

## Floor references
- **Review format:** `work/kaching-landing-review/REVIEW.md` (r29: findings ranked, computed evidence, the accepted sibling as the comparison, before/after).
- **Consistency contract:** `knowledge/web/consistency-mechanics.md` 3.10 (knobs + tables A-G) and 3.11 (K0-K18 thresholds).
- **App audit precedent:** Sellify `studio.cjs AUDIT=1` (L476).

## Reading set (5 files)
1. this page
2. `knowledge/web/consistency-mechanics.md` sections 3.10-3.11
3. `knowledge/web/borders-and-nesting.md` section 4 (BN-01..12)
4. the work's own kit or design system (for a client app: `client-app.md` + its repo kit; Kaching: `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md`)
5. the last approved version of the work (commit or URL) and its verdict quote

## Decided method

| Step | Default | Source |
|---|---|---|
| 1. Render | `node tools/check.mjs <url> --name <name>` + full-page and fold screenshots at 1440, 1100 and 390, light and dark, DPR 2; every state and overlay opened | playbook rule 5; L476 |
| 2. Diagnose the crop | when the founder sends a crop, crop the same region of our render at 2x+, state the measured cause in one line, change only that | playbook core idea 1-2, rule 1 |
| 3. Census (the founder's axes) | edges/shadows, radius ladder, type tuples, colour, button grammar, state language, icon family, volume | L199, L476; K6-K14 |
| 4. Write `work/<name>/REVIEW.md` | findings ranked HIGH / MED / LOW, consistency first; each with selector, computed value, crop path and the exact fix; mark what is deliberately left alone | CLAUDE.md review mode; Kaching r29 |
| 5. Fix in source | in the shared owner component or token, never per screen | L491 |
| 6. Sweep | grep the whole diff and the surrounding screens for the same class of drift (off-accent colours, hex values, one-off radii, off-scale sizes and weights, stray shadows); fix them all in the same round and list them | L482; SDP core idea 5 |
| 7. Prove | computed-style diff before/after per element (only intended properties changed), census at 0 FAIL, before/after crops at the same zoom | playbook rule 2; L409 |

## Census thresholds (engine defaults)

| Census | FAIL when | Source |
|---|---|---|
| Shadow strings | > 3 distinct `box-shadow` strings per page; any element with `0 0 0 1px` AND `inset 0 1px 0`; any element with a visible border AND a ring | L199, L467; BN-04 |
| Overlay edge | an overlay with a visible border plus a ring, or a blur > 32px | L491 |
| Radius | a control-height band off the ladder (`product-ui.json`), two radii in one band, nested radius off by > 1px from outer - inset, squircle share < 90% | L166, L373; K6, K7 |
| Fields | text field, textarea, select trigger and custom triggers not sharing one height and one radius | L476 |
| Type | > 4 sizes in a product view, weights outside the system's set, two sans families in one fold, Inter display without opsz | L199, L232, L452 |
| Colour | > 2 accent hue families (photos excluded), canvas chroma >= 0.01, ringed boxes > 25 in a product fold, > 2 surface fills | L391 |
| Buttons | primaries not sharing one computed recipe; a secondary with a leading icon; radius < 0.3 x height on a soft product; hover changing size | L154, L170; HC-14 |
| States | hover, selected and focus using different languages across components; a pointer missing on a clickable | L476; playbook phrase book |
| Icons | more than one icon library; icon brighter than its label | L310, L331; KMD-12 |
| Dividers | a divider stopping short of the card ring; dividers between parts of one card | L380; BN-05 |
| Volume | clipping or overflow at 1 / 4 / 12 / 40 items or a 60-character name; a scroll container without max-height | L473 |
| Space | dead white space opening inside a sibling when one item grows | L485 |

## Decided defaults for judgement calls
- **Praise marks the floor:** keep everything the founder did not name; restore exactly when he says a past version "had it right" (playbook core idea 3; L461).
- **A reference image changes only the thing it was sent for** (L409).
- **Revise one approved visual at a time** with a side-by-side against its original (L250).
- **A content reference is content only:** redesign structure and add what is missing; a re-skin is a reject (L234).
- **Default when asked to "improve if needed": leave alone** what is not broken, and say so (Kaching r29).

## Never (rejected, with evidence)
- Letting the founder find a mismatched field (Sellify ENG-2079, L476).
- Fixing one crop and leaving the same drift elsewhere (ENG-2080, L482 "EVERYWHERE check for this").
- "Normalising" classes or radii in an accepted build without a computed diff (Kestrel r3-4, playbook rule 2).
- Restyling palette or ground from an unrelated reference (Perch r3, L409).
- Regenerating a whole approved set in parallel from a new system (Kaching round 2, L250).
- Replacing an accepted bento with a "systemised" grid (L242).

## Pre-delivery checklist
1. REVIEW.md exists with ranked findings, each with selector + computed value + crop + fix.
2. Census at 0 FAIL at 1440, 1100 and 390, light and dark.
3. Computed-style diff attached: only the properties in the findings changed.
4. Sweep list: patterns grepped, hit count, fixed, deliberately kept and why.
5. Before/after crops at the same zoom; live URL; one verdict question.

## Open
- `tools/gate.mjs --kind audit` and `tools/style_diff.mjs` do not exist yet (audit section 6, P3 and P7); until they do, run `check.mjs` plus a hand-written computed-style diff.
