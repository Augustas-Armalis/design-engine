# Cadence bento, founder (lunor) grammar
scope: one bento section, still (route `#/cbentol`, `work/replicas/app/src/CadenceBentoL.tsx`)
motion: none
kind: section-bento

- grammar: founder Plasma/Inkflow dark product-fragment bento (LN-23..29), the default for "my style" (lunor section 9 row 16). Copy is pinned top-left at 24 in every cell (Inkflow); each cell holds a real Cadence fragment cropped by the cell edge.
- grid: container 1200 (x 120), gap 12 (LN-23). Row 1: hero 796x440 + 392x440; row 2: three 392x360.
- radius: hero r24, small cells r20 (founder 2026-10-22: "I like more rounded stuff"; above lunor's measured 10-20, inside canon 10-32). Fragment panels r14, events r8, wells r10, chips r6-8.
- surfaces: page #0c0c0d, cell #131315 + one 1px ring #222226 drawn on top (LN-25; no top highlight: L467). Fragments use Kargul R4's dark system: panel #18181b, one raised step #202024, one rule #232327, ring #27272c; the only blur shadows are the two floating layers (popover, chart tooltip).
- type: Geist only (founder pool). Section h2 40/500 -0.03em, two lines, left (LN-29). Cell title 20/500, desc 15/22 grey (0.75x, LN-26). Product text 400 with 500 for titles and values, 11-14.5 in half steps.
- colour: grey/ink plus one violet (#8b8cf0-class, LN-28/32), used only on the answers (found slot, best option, moved meeting, focus series) and one soft glow around the found slot. Colourful pixels 0.26% of the fold.
- data: sample only (names, times, hours), labelled "Sample team, calendars and hours" beside the head. No logos, customers or metrics.
- WARN radius.ladder.product (justified): the chart bars are r4 by design (LN-32 bars rounded on top, Kargul R4 3px), and "Personal calendar" is a 40px r9 row whose bounding box reads 97px tall only because the availability list is tilted (rotateX 22, rotateZ 9).
- standalone route: the default export wraps the section in `main` with a visually hidden h1 so the page passes check.mjs; `CadenceBentoSection` is the section alone for composing under a hero that owns the h1.
