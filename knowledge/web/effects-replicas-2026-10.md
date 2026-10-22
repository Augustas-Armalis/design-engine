---
source: web:https://kargul.studio (case CDN originals at 2x) + web:https://x.com/_heyrico (X name=orig exports at 6x and 2.844x)
chapter: Effect-layer replicas: light, glow, rim, grain, halftone, line-waves, card materials and meters, rebuilt to registration
pages: n/a (8 effect regions, 2026-10-22)
topic_tags: [effects, light, glow, rim-light, grain, dither, halftone, generative, glass, gradient, shadow, meter, dark-mode, light-mode, replication, measurement]
status: studied
evidence: work/replicas/fx/ (cmp-fxr<n>-side/overlay.png, fxr<n>-side.png with dE heat, MEASURES.txt, fxrefs.py crop specs)
replicas: work/replicas/app/src/FxR1..FxR8.tsx (#/fxr1..#/fxr8)
companions: ../../system/effects/fx-recipes.md (the code, R1-R11), effects-materials.md (EF), kargul-heroes.md (KH-08 light from the subject), heyrico-deep-2026-10.md (RD), dark-mode-premium.md, ../founder/canon/designers-eye.md
---

# Effect-layer replicas (2026-10-22)

**Why this note exists.** The founder said "study wayyyyy more of marcel and rico... recreating his work pixel to pixel, shader to shader... learn to use visuals and effects better". The engine's weakest layer is the effect layer:
- light that comes from an object;
- grain that is part of the material;
- generative fields that are also data;
- materials made from two whites and a hairline.

Eight effect regions were cropped from the originals at native density. Each was rebuilt with CSS, SVG filters and canvas only (never the bitmap), and measured until its geometry registered. Every reference name, logo and line of copy stays in the source images. The replicas use neutral labels and generic glyphs.

**Method.**
1. Crop at the native density onto a grid of 2 device px per CSS px (`fxrefs.py`).
2. Read coordinates through a labelled grid (`fxgrid.py`), colours and profiles (`fxprobe.py`), and dot lattices (`fxblobs.py`).
3. Render `#/fxr<n>` at 2x.
4. Measure with `fxmeasure.py`:
   - the phase-correlation shift of the whole layer;
   - CIE76 dE on Lab after a box blur, because grain and dither phase are noise and tone and falloff are the signal.

   Iterate until the shift is under 1px.
5. Write the official overlays with `tools/compare.mjs`.

## 1. Core ideas

1. **Light is a scalar field pushed through one hue's tone ramp.** The dark shaft never mixes colours: every pixel from `#050201` to `#fe6e2f` keeps R:G:B at about 255:96:42. Model it as I(x,y) through a measured LUT and it registers (dE 5.6). A CSS blend of two oranges does not.
2. **Glow is falloff shape, and the shape is never gaussian.**
   - The shaft's along-axis falloff is a power curve with a long tail.
   - Its lower edge decays exponentially.
   - The halftone's light band is a plateau with soft shoulders: .30/.58/.84/.96/1/1/.98/.87/.64/.32 at a 16px pitch.

   Copy the measured table, not a `blur()`.
3. **A rim light can be the frame itself.** The coloured window rim is an 8.5px bezel filled with a radial ramp from one corner:
   - cobalt `#1963d0` at d28;
   - steel `#171c25` from d668.

   One pixel outside the bezel is exactly the page colour: no glow, no bloom, no shadow. The far rim stays steel, never black, so the window reads as one lit object.
4. **Emitted light needs four layers, not one glow.**
   - the source: a white top cap on the glass shell;
   - the body's own vertical ramp: pink-white to electric violet, darkening by 60% of the height, with a bright bottom rim;
   - emission onto what is below: a saturated ellipse under the core;
   - a halo that falls from .85 to 0 within 68px.
5. **Grain belongs to a material and has a measured size and strength.**
   - Painted gradient header: monochrome, std 7-9/255, one device pixel, independent per pixel.
   - Ribbon: an ordered 4x4 Bayer dither at 1 CSS px per cell, 7 levels.
   - Orb: white turbulence at .07.

   Row-correlated noise reads as streaks.
6. **Generative fields are one formula with parameters read off the image.**
   - The line-wave: `y = mid + half * sin(phi + asin(2f-1))`. phi=0 is a flat, evenly spaced sheet; ±pi/2 folds it into a crossing mesh; half=0 pinches it.
   - The halftone: a polar lattice about an off-frame centre, so the row pitch shrinks with radius exactly as measured (16.2 > 14.2 > 12.8).
   - The ribbon: converging translucent strands plus stacked sheets.
7. **Depth without shadows: ghost families and transmitted light.**
   - The line-wave has a second family at 13% opacity, phase-shifted 0.9 and lifted.
   - The glass nodes in the shaft transmit the light (they are not shadowed by themselves) while casting long soft shadows on everything behind them.
8. **Studio materials are two whites and a hairline.** The double card is `#fcfcfa` around `#ffffff`, 1.2% apart. Its edges:
   - a 0.5px ring at about 13%;
   - a 1px-down 2px shadow at 9%;
   - the inner ring at a quarter pixel.

   No shadow tier above a 2px blur.
9. **Meters are segmented on purpose.** 2.33 x 16 rounded ticks on a 5.33 pitch, 83 per row, one saturated hue per row on a `#f0f0f0` track. The sub-pixel width is why they must be SVG: divs snap to device pixels and look uneven.
10. **Half-visible is designed or it is a defect.** In every reference the visual bleeds off the frame (the shaft, the ribbon, the halftone, the orb's dot field). No text is ever cut by an edge or half-faded by a mask. Labels and chips sit unmasked on top of the faded layer. This is now a gate probe: `crop.text-crossing` and `crop.text-half-faded` (designers-eye DE-01, DE-07).

## 2. Rules

- **RULE FX-01** Build a one-light dark field as a scalar intensity through ONE hue's measured tone ramp (10-12 stops from near-black to the clipped peak), never as layered colour gradients.
  **Why** The reference holds R:G:B at ~255:96:42 at every brightness; mixing two colours shifts the hue in the mids and reads as CSS.
  **Applies to** landing/hero, dark. **Check** sample 6 pixels along the light: max hue drift <= 6deg in OKLCH. **Source** work/replicas/fx/refs fxr1 (knowledge/benchmarks/kargul-heroes/originals/case-breez-01.png), FxR1.tsx RAMP

- **RULE FX-02** Shape every falloff from a measured table: the shaft (along: .97/.86/.66/.50/.40/.30/.06 over 700px; lower edge exponential, tau ~95px) and the halftone band (a plateau with soft shoulders). Never use a single gaussian or a CSS blur radius as the falloff.
  **Why** Gaussian falloffs read as "glow effect"; the studio falloffs have plateaus and long tails.
  **Applies to** effects. **Check** `fxmeasure.py ... row/col` profile vs the reference, dE <= 5 per sample on the axis. **Source** FxR1, FxR5 (case-zeroleaks-02.png)

- **RULE FX-03** Cast long soft shadows from occluders toward one light (ray march in the light's direction, opacity 0.12 at contact rising to 1 by 260px). A glass occluder transmits: never shadow its own interior.
  **Why** Shadows that agree with the visible light source are what make the light feel physical.
  **Applies to** hero visuals, dark. **Check** visual: every shadow points away from the brightest region. **Source** FxR1 (field())

- **RULE FX-04** Light a node from the side that faces the light: a 1.5px rim gradient from the lit corner (pale gold `#ffe09a` → hue → .08) plus a 14px hue bloom blurred 6 and displaced by turbulence (freq .06, scale 10) on the lit edges only.
  **Why** A displaced bloom reads as emitted light; an even box-shadow glow reads as a CSS effect.
  **Applies to** dark visuals. **Check** visual: the unlit sides show no glow. **Source** FxR1 (rim, bloom filter)

- **RULE FX-05** A coloured window rim is the bezel's own fill (8-9px, outer r18 / inner r11): a radial ramp from one corner that ends in a cool steel 2x the page lightness, with no outer glow.
  **Why** The rim lights the object without lighting the page; the pixel 1px outside equals the page colour.
  **Applies to** dark product windows. **Check** probe 1px outside the bezel = page colour (±1); the far rim L* >= page L* + 4. **Source** FxR3 (case-am-trades-00.png): bezel dE 3.0, edges <= 0.5px

- **RULE FX-06** Make an emitted-light object from four layers:
  - the source cap (white, the top ~11% of the shell);
  - the body ramp (light to saturated to dark at 60-80% of the height, bright bottom rim);
  - emission under it (a saturated ellipse ~1.07w x .34w, alpha .95 → 0);
  - a halo that dies within ~0.4r.

  **Why** The single-glow orb is the AI-template tell; the studio orb is lit, coloured and grounded.
  **Applies to** hero visuals. **Check** visual + a col profile through the centre: cap L* >= 92, mid L* 40-55, the halo back to the page within 0.42r. **Source** FxR2 (case-stardust-01.png)

- **RULE FX-07** Offset the core 18px (11% of r) down inside its glass shell so that the two are tangent at the bottom. The crescent between them is the lit glass.
  **Why** Concentric circles look flat; the offset makes a thickness that the light can fill.
  **Applies to** orb/sphere visuals. **Check** visual. **Source** FxR2 (shell r164 c(321,310), core r146 c(321,328))

- **RULE FX-08** Shade sphere bands brightest at their outer meridian (meridians at rx = 20k, each band a bbox radial: 0 at 1-1/k → .45 at 1).
  **Why** The outward-bright bands are what turn a striped disc into a sphere lit from behind.
  **Applies to** sphere/globe visuals. **Check** a row profile across the equator alternates dark → bright toward each outer line (ΔL* ~12). **Source** FxR2 row 330 probe

- **RULE FX-09** Give grain a measured size and strength:
  - painted gradients: monochrome noise, std 7-9/255, one device pixel, independent per pixel;
  - generative fields: an ordered 4x4 Bayer dither at 1 CSS px per cell, 5-8 levels;
  - glossy objects: turbulence <= .08.

  Never correlate noise along rows.
  **Why** These three grains are what the references use; row-lagged noise reads as scanlines.
  **Applies to** effects. **Check** std of a flat patch at 2x = 7-9 per channel, channel correlation >= .9. **Source** FxR8 (heyrico-x img 2099121946437071193-0.jpg), FxR4 (case-opsis-partners-07.png)

- **RULE FX-10** Build a soft ribbon from converging translucent strands (16-26 per lobe, 5-9% white each) plus stacked sheets at shrinking widths whose outer sheets run 25-110px past the tip. Start the strands off-frame so no cap shows.
  **Why** Brightness then accumulates toward the tips by itself, and the layered translucent edges read as fabric, not a blurred stroke.
  **Applies to** generative hero fields. **Check** visual: no round caps or strand ends visible inside the frame. **Source** FxR4

- **RULE FX-11** Lay a halftone on a polar lattice about an off-frame centre: columns as arcs (R_k = R0 - 16.9k), rows as shared angles. Let one light band set dot size and colour (a plateau table), and walk the hue across the columns warm to cool (6 stops then grey). Use ring dots (a dark slot at .28).
  **Why** It reads as a lit sphere seen at the edge; a flat grid halftone reads as a pattern fill.
  **Applies to** dark hero side fields. **Check** `fxblobs.py` on the render: row pitch shrinks with radius; centres within 1px of the formula. **Source** FxR5: dot centres within 0.5-1px, dE 0.76

- **RULE FX-12** Draw a line-wave ribbon with `y = mid + half * sin(phi + asin(2f-1))`:
  - about 30 lines, 1px, one ink colour;
  - mid/half/phi as splines through knots;
  - opacity ramping in from the frame edge (.18 at 60px, 1 by 400px);
  - a ghost family at .13 (phase +0.9, lifted up to 30px).

  **Why** One formula gives the flat fan, the folded mesh and the pinch; the ramp and the ghost give depth with no shadow.
  **Applies to** light hero visuals. **Check** lines in the flat parts are evenly spaced (±0.5px). **Source** FxR6 (case-altrina-01.png): shift +1/-0.5

- **RULE FX-13** Build a card hierarchy from two whites, 1-2% apart (`#fcfcfa` outer, `#ffffff` inner inset 4px on three sides), with hairline edges: a 0.5px ring at ~13% and a 1px-down 2px blur at ~9% outside, a 0.25px ring inside. No shadow above a 2px blur.
  **Why** The material is felt, not seen; a heavier shadow breaks the calm.
  **Applies to** product UI cards, light. **Check** computed box-shadow blur <= 2px on cards; the two fills differ by ΔL* 0.5-1.5. **Source** FxR7 (heyrico-x img 2078162365141651752-3.png): dE 0.94

- **RULE FX-14** Draw segmented meters as SVG rects: ticks 2.33 x 16 (fully rounded) on a 5.33 pitch, track `#f0f0f0`, one saturated hue per meter.
  **Why** Sub-pixel ticks rendered as divs snap to device pixels and pulse in width.
  **Applies to** product UI. **Check** tick widths on the 2x render vary <= 1 device px. **Source** FxR7

- **RULE FX-15** Paint a gradient header as 2D:
  - a saturated top row of 15-17 stops, blended into a pastel bottom row through a vertical mask (0 near the top, 1 at the bottom - 3px);
  - monochrome grain on top;
  - a 3px melt into the body.

  Put glass tiles on it (white .16 fill, 1px white .38 inset ring, backdrop blur 6).
  **Why** A 1D gradient reads as a stripe; the 2D blend reads as paint.
  **Applies to** modal/card headers, banners. **Check** visual + 2 row profiles (top, bottom) within dE 6 of the plan. **Source** FxR8: header dE 5.9

- **RULE FX-16** Let only the visual layer be cut. Text, chips and controls sit unmasked on top of a faded or cropped layer, and are never crossed by a frame edge or a fade.
  **Why** Every reference bleeds its visual and never its words; a half-faded label reads as a mistake.
  **Applies to** all. **Check** `node tools/gate.mjs ...`: `crop.text-crossing` = 0 and `crop.text-half-faded` = 0. **Source** all eight references; gate probe tested on #/h4a and #/cproda (pass) and a negative page (3 defects caught)

## 3. Numbers & scales

| Replica | Effect | Reference crop (CSS) | Shift (px) | dE mean / median (blur) | Notes |
|---|---|---|---|---|---|
| FxR1 | one-hue shaft, rim nodes, shadows, fibres | 700x560 at 2x | +1.0 / +1.0 | 5.6 / 2.9 (1.5px) | field registered; fibres are hand-placed waypoints |
| FxR2 | emitted-light orb, glass cards, dot globe | 640x510 at 2x | 0 / -0.5 | 10.0 / 7.6 (1.5px); 8.2 (5px) | meridian phase and dot field dominate the residual |
| FxR3 | bezel rim light | 1140x255 at 2x | edges <= 0.5 | bezel only 3.0 / 2.3 (0.5px) | content is neutral bars, excluded |
| FxR4 | strand ribbon + Bayer dither | 1320x470 at 2x | +0.5 / 0 | 9.4 / 6.9 (3px) | shape approximate (20-40px in places) |
| FxR5 | polar halftone, ring dots | 240x420 at 2x | dot centres 0.5-1 | 0.76 overall; 1.9 lit region | phase-correlation dy +16 is lattice aliasing |
| FxR6 | line-wave ribbon into a node | 1240x480 at 2x | +1.0 / -0.5 | 1.85 (3px) over the line region | right lobe fold approximate |
| FxR7 | two-white card + tick meters | 512x392 (from 6x) | 0 / 0 | 0.94 / 0 | copy neutral |
| FxR8 | grainy 2D gradient header + glass tiles | 510x250 (from 2.844x) | -0.5 / -0.5 | header 5.9 / 4.3 (1.5px) | grain std matched to ±2/255 |

All the parameter values are in `system/effects/fx-recipes.md` (R1-R11) and in the header comment of each `FxR<n>.tsx`.

## 4. Dos and Don'ts

- **Do** sample the light along its axis and across it before writing a gradient (FxR1). **Don't** blur a rotated rectangle and hope the falloff matches: the measured lower edge is exponential, the upper edge is wide.
- **Do** end a coloured rim in steel (FxR3). **Don't** fade it to black or add an outer glow: it either disappears or lights the page.
- **Do** ground an orb with emission underneath (FxR2). **Don't** let it float on a symmetric halo only.
- **Do** start generative strands off-frame (FxR4 round 3). **Don't** let caps or strand ends show: the first FxR4 pass showed rounded starts down the left edge, and they read as a broken brush.
- **Do** keep grain per pixel (FxR8). **Don't** lag-correlate it along rows: the first FxR8 pass did, and it read as scanlines.
- **Do** use SVG for sub-pixel repeated marks (FxR7). **Don't** use divs.

## 5. Exceptions & judgement calls

- [engine note] The blurred-dE number punishes fine structure (meridians, dither, dots) whose phase differs by one pixel. Read the shift and the profiles first. A 5px-blur dE is the fair tone metric for textured fields (FxR2 8.2, FxR4 9.4).
- [engine note] Phase correlation aliases on periodic lattices: FxR5 reports dy +16, which is exactly one row pitch. Use `fxblobs.py` centres for lattices.
- [engine note] FxR4's ribbon and FxR6's right lobe were placed by eye from grids, not fitted. Their tone registers better than their outline. A spline fit to the extracted envelopes (masking the labels) is the next step if an outline-exact ribbon is ever needed.
- Grain strength is per material: the gradient header uses std 8/255, the orb uses turbulence at .07, and the dark shaft uses no grain at all (its streaks are its texture).

## 6. Figures worth keeping

- `work/replicas/fx/fxr<n>-side.png`: reference | ours | dE heat, for each of the eight.
- `work/replicas/fx/cmp-fxr<n>-side.png` and `-overlay.png`: the official `compare.mjs` pairs.

## 7. Open questions

- None of the effects was rated by the founder yet. The registration numbers are ours.
- The floor glow of Kargul hero replica C (`work/replicas/KARGUL-HEROES-NOTES.md`, "not registered") is still open. R1 + R5 (emission under) is the likely recipe.
- Whether to promote FX-16 (text never crossed or half-faded) into each canon page's never-list is for the founder. For now it lives in `canon/designers-eye.md` and the gate.
