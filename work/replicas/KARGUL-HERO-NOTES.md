# Kargul hero replica: Chatsheet (study only)

Source: Marcel Kargul's X post 2112674079891227129 (20 Oct 2026, "this is what a $15,000 landing page looks like"), video frame at `work/replicas/ref-chatsheet-hero.png` (1252x900). Replica: `work/replicas/app/src/KargulHero.tsx` (route `#/khero`), overlay `work/replicas/cmp-khero-overlay.png`. Measured with `tools/probe.mjs`.

## Registered (measured, ours vs his)
- h1 line boxes 525x53 / 476x49 vs 524x50 / 477x48; baselines 169 / 229 both (pitch 60).
- sub 393x14 vs 391x15 at y 262-264; buttons 195x40 and 128x40 at y 351; coin column top 518-526, side 611-636 both.

## What the hero is made of (the recipe)
- **Copy is quiet and centred; the scene is loud.** A transitional serif h1 (~70px set on a 60px pitch, so lh 0.86, weight 400, ink #0e1330 navy, not black) carries the brand voice, with a 15/25 grey sub (#55586a) and two 40px CTAs (blue gradient #3a74f4 to #4680f8 with a 1px darker ring, white with a #dcdce1 ring). Radius 12 on a 40px control.
- **Page and frame.** The page is #f6f5f8 (cool lilac-grey, not white). The nav is a #f9f9fb band with a 2px #ebebed rule. 2px #efeef1 rails at x 26 and 1224 and a rule at y 803 frame the hero like a sheet.
- **One projection for the hero object, a steeper one for things nearer the viewer.** The coin is a 25deg dimetric (ry/rx 0.43). Tiles lower on the page read steeper (0.53). That is real perspective, not one iso matrix. The cards climb up-right and were fitted to their measured corners.
- **One hero object, one brand colour.** A navy coin with a blue left sheen and a bevelled light rim carries the brand's own logo (open concentric rings) on its face. Everything else is white or glass.
- **Supporting cast tells the story left to right.** Tool tiles (thin white slabs, a blue underside edge, a soft contact shadow, big flat logos) sit on a dotted path that flows into the coin. Glass workflow cards (white-to-#edf2ff, #d3ddf6 edge, a #dbe4fa under-plate 5px lower) climb away up-right, each with one blue pill label that overhangs its edge, and fade out at the right.
- **Light.** A pale blue halo (#bcd0ff to transparent) above the coin and a white floor bloom under it. There are no coloured blobs behind the type.
- **Depth of field.** One small tile at top-left is blurred (stdDeviation ~2.4) and translucent, which sells the 3D space cheaply.

## Lessons for the engine
1. Measure before drawing: `probe.mjs box` gives the exact text boxes, so font size and baseline can be solved instead of guessed (two passes to 1-3px).
2. A narrower substitute font is fixed by matching the measured line width, not the cap height.
3. Fit 3D props to measured corners (affine from L, T, Bt) when the scene uses perspective; a single iso matrix cannot register it.
