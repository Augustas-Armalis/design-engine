# Reshoot hero: DIRECTION

**Brief (one line):** Reshoot (fictional) turns a rough phone photo of a product into studio-lit ad creatives in every format; for ecommerce marketers and small DTC teams; one action: try it free with your own photo; the proof they need is a believable before -> after from a single shot.

**Assumption:** the visitor's objection is "AI product shots look fake / will not look like my product". So the proof must keep the *same* product recognisable from the messy input to every output.

**System:** bound to Halftone (`system/systems/halftone/theme.css` + its Google Fonts href). Tokens only.

## Hero class
**Product proof.** The transformation is the product; nothing explains it faster than input and outputs side by side (LDP-02: interface/result proves value -> product dominates).

## Concept
The hero is a light table: your kitchen-counter snapshot on the left, the finished ad set on the right, and the promise plus the drop slot sitting in the gap between them, so the copy literally reads as the step from before to after.

## Reference triad
| role | reference | rule taken |
|---|---|---|
| structural | Take / Mise (ledger accepts) | the whole frame belongs to the product world: the stage is a Reshoot project canvas, not a page with a screenshot on it |
| type / identity | Halftone GUIDE | Bricolage 800 with optical size as the only display voice; magenta reserved for the one action |
| proof / material | photographer's contact sheet and crop marks | the CTA is a cropped drop slot (corner crop marks), outputs carry format chips like a proof sheet |

## Divergence row (vs last 8 ledger entries: rejects first)
| axis | this hero | differs from |
|---|---|---|
| structure | triptych: input / copy-as-bridge / output board on one sunken stage | not left-copy/right-dashboard (LHS-06), not big-copy-above/photo-below (LHS-07), not Linecheck's photo+headline+right panel |
| type voice | Bricolage 800 at display-lg (max 72px) in a 448px column, Hanken body, DM Mono metadata | headline is a column, not a frame-dominating grotesk (LHS-01); Baton/Linecheck used 73px Geist/Geologica across the frame |
| palette temperature | warm neutral canvas, product colour (sauce red, from danger role as product material only) and four tinted studio sets; magenta on one button | not sterile monochrome (LHS-11, Baton), not dark-neon (LHS-12), not loud poster (Phase) |
| CTA grammar | photo drop slot with crop marks holding one magenta 8px-radius button with an add-photo glyph | not a capsule (LHS-04), not plain rectangle + arrow (LHS-05) |
| nav grammar | edge-docked bar flush to the top, hairline below, wordmark + 4 links + Sign in | not floating pill (LHS-04); normal capitalisation (LHS-02) |
| motion signature | outputs spring in once (ease-enter, single overshoot, staggered 90ms); reduced motion = opacity only | static stills elsewhere; no scroll theatrics (LHS-18) |

Chosen deal: candidate #2 (seed 303) for structure *product-window-as-canvas*, *high-chroma-signal* (as product colour, not UI colour) and *edge-dock-not-pill* nav. Not taken: *code-or-terminal* proof (wrong subject, replaced by output board), *text-action-underline* CTA (Halftone owns a magenta primary action; the underline grammar survives only on "See a sample set" which was cut to keep one action), *mono-plus-sans* survives as metadata layer under the Bricolage display.

## Tokens used
- Fonts: `--font-display` Bricolage Grotesque 800 (h1, wordmark, ad lines), `--font-sans` Hanken Grotesk, `--font-mono` DM Mono.
- Type roles: display-lg, heading-md, heading-sm, body-lg, body-md, label-md, label-sm, mono-sm.
- Colour roles: surface-canvas/raised/sunken/active/inverse, text-strong/body/muted/inverse, border-hairline/control, accent-solid(+hover) for the single CTA, focus-ring; danger-solid/danger-text as *product material* (the sauce bottle), warning/info/success tints as studio set colours.
- Radius: sm 8 (button, chips), md 12 (creatives), lg 16 (photo print), xl 24 (stage). Depth: shadow-raised on chips, shadow-float on outputs and the photo print.
- Spacing: Halftone scale only (8-96). Motion: dur-slow + ease-enter.

## Rule slate (trimmed to 36 that apply)
Kept: WCSS-39, VWI-04, LDP-16, SYS-POLARIS-09, web.courses-and-curricula#24, #62, web.color-and-surfaces#13, #37, a11y-checklist#54, PT-SZ-08, AH-TY-01, AH-TY-05, LHS-01, -02, -04, -05, -06, -07, -09, -10, -11, -12, -15, -16, -17, -18, -19, -20, AH-CO-01, ui-pedia.13-buttons#45, landing-page-anatomy#4, LAI-73, LAI-39, NNG-16, LDP-02, MCB-14, ui-pedia.07-proximity#5, AH-TY-10, AH-MO-03.
Dropped (do not apply to a static single hero): LBC-09 (Larpo self-description), magic-ui#5 (no marquee), a11y-checklist#27 / GOV-68 (skip link kept anyway, simply implemented), AH-AX-36 (RTL), PT-SZ-11, AH-CO-02/03/11 (theme.css owns twins), SYS-PRIMER-15, Emil toast rule, GOV-03, implementation-craft#45 (no raster images), marcel-kargul #2/#5, ui-pedia typography #15/#17/#20/#25 (covered by Halftone's role table), AH-WR-04, LAI-44 (applied in critique, not a build rule).

## Overrides
- override: Halftone "magenta only on the primary action and selection" is kept, but **danger-solid / danger-text are used as product material** (the red hot-sauce bottle and cap). because the product in the sample needs a colour of its own and the GUIDE forbids a second *accent* hue; danger is an existing role, used here as pigment of an illustrated object, never as UI meaning. No danger colour appears on any control or message.
- override: hero width uses the full 1440 frame minus 48px gutters instead of `--content-max` 1200 because the triptych needs ~1250px of stage to keep the headline column at a readable 448px.

## Check notes (WARN answers)
- Run 1: 2 FAIL (story ad line measured against the page, not its dark set: gave `.story` a surface-inverse background-color), 4 WARN (radius count 11: bottle/mug/cable radii moved onto the xs-xl ramp; purple-blue gradient: banner set moved from info-tint to success-tint; mobile targets: skip link and wordmark given 44px min-height).
- Run 2-4: 0 FAIL, 0 WARN, 45 PASS. Diversity gate: ok (3/8 shared with Baton and Linecheck: headline size, nav height, rhythm, accent hue; structure, CTA and palette differ).

## Critique log
1. Before photo read as a tidy illustration, not a rough phone shot -> tungsten multiply cast + 0.6px soft focus + steeper tilt, so the relight is visible.
2. Three columns centred on different heights read as a random wave -> top-aligned all three on one horizon line (Before tag / h1 / After tag).
3. Drop-slot note orphaned "card." / "here." -> shortened to one line; slot now hugs its content.
4. Mobile tags wrapped to two lines -> short "Before" / "After" labels on mobile; CTA moved above the before/after pair.
Remaining weakness: the illustrated bottle is the same flat drawing in input and outputs, so the "studio quality" jump is told by sets and light, not by the product rendering itself; a real licensed sample photo pair would be far more convincing.
