# Kargul hero replica: Chatsheet (study only)

> **CORRECTION 2026-10-21:** this replica was measured from a compressed video frame, which plays the page at about 0.88. Several values below are wrong:
> - every token is 12-14% small;
> - the page is `#f5f6f7`, not lilac;
> - the coin is true isometric 0.577, not 0.43;
> - the buttons are pills;
> - the closest free headline font is Lora.
>
> The authoritative measurements are the 2880x2070 design originals and `knowledge/web/chatsheet-live-study.md` (CSL-01..17).
>
> Lesson: never measure from video or a social-media recompression when an original exists. Find the source asset first (case page, CDN originals), and check the scale against a known dimension.

Source (rebuilt 2026-10-21): Kargul's design original `knowledge/benchmarks/chatsheet-live/hero-fold-1440@2x.png` (2880x2070 = 1440x1035 CSS) and its crops, plus `knowledge/web/chatsheet-live-study.md`. Replica: `work/replicas/app/src/KargulHero.tsx` (route `#/khero`, 1440x1035). Overlay: `work/replicas/cmp-khero-overlay.png`, side by side: `cmp-khero-side.png`. Every value is CSS px at 1440, measured on the 2x PNG with `tools/probe.mjs` and line fits over sampled contour pixels, then re-measured on our 2x render with the same boxes (CSL-01, CSL-02). Study only; never ship this or a close copy.

## Registered (ours vs his, same probe boxes)
- **h1** line 1 ink box 425.5..1020.5 x 151.5..207.5 vs 426..1021 x 151.5..207.5; line 2 453.5..994 vs 452.5..993, baselines 207 / 275 both (pitch 68).
- **Sub** 499.5..944.5 x 313..329.5 vs 500..945 x 313..329; line 2 width 387.5 vs 387.
- **CTAs** pills at y 414..461 (47 tall); primary 534.5..753.5, secondary 767..911; labels 553.5..735.5 and 784.5..893 vs 553.5..735.5 and 785..893. Edge profiles match device pixel for device pixel (top #557ed8 / #3467d8 / #376ce2, bottom #588cfe / #a5c1fe; secondary top #d0d1d3 / #e5e5e5, bottom #e7e8eb).
- **Nav** link boxes within 0-0.5px (501 / 622 / 724 / 880, widths 95 / 75 / 129.5 / 60.5); nav pill 1092..1239.5 x 13..50.5 identical; wordmark 232..359.5 vs 232..359; mark 201..227 x 20..46 vs 19.5..45.
- **Coin**: every groove, ring and rim boundary on the centre column within 0.5px (rim top 564, groove walls 599-603.5 and 621-625.5, centre 625.5-639); side 703..731.5 vs 703.5..731.5; notch band and cut face identical at x 607.
- **Tiles**: left/right/top/bottom extremes of all 8 floor tiles within 0.5-1px.
- **Cards and pills**: all long and short edges sit on the measured lines (onion shows single contours); pill labels within about 1px after the text was moved off-centre.

## Not registered / known gaps
- **Sans proportions**: Inter is not the original sans. Word widths differ (Inter "How it Works" is wider and "Become a Partner" narrower than his), so each nav link has its own letter-spacing (-0.44 to +0.2px) to match its measured width. Inside the sub the line ends register but individual words drift 1-3px (ghosting in the overlay).
- **Serif**: Lora at 72px with -0.0305em matches both line widths and the ink height. At the size that matched width alone (69px), the caps were 2px short. Glyph shapes (T serifs, a, M splay) still differ in the overlay.
- **Brand glyphs** are my rough approximations, not the marks, so the logo interiors don't register (by design).
- **Card 3 fade** is close but not exact: his far card stays crisper on the left and fades along the top. **Glow** near the coin's back rim is about 3% lighter than his.
- **Standing plates** (Slack, PDF glass) are fitted by eye to their extreme points within about 2-3px; the blurred far plate is approximate.

## The corrected recipe (measured)
- **Ground and frame (CSL-03/04/05).** Page, nav and hero are all `#f5f6f7`. Hairlines are 1px `#dee0e3`; crossings render `#c9ccd1` on their own. Rails at x 39-40 and 1399.75-1400.75 run from y 0 to 1016, through the nav. The nav rule is at y 70. Gutter ticks at y 930 run only from 0 to 41 and from 1400 to 1440. The white next section starts at 1017 under a `#e7e8eb` rule. The copy axis is x 722.5, not 720.
- **Type (CSL-06/07).** h1: Lora 400, 72/68, -0.0305em, `#0c1833`. Sub: Inter 17/28 +0.065px, `#525b6e`, the same grey as the nav links. Nav links: Inter 16. CTA labels: Inter 500 17. Wordmark: Lora 27.7.
- **Buttons (CSL-08/09).** Every control is a pill. Primary: 219x47, flat `#3d79fe`, 1px border (top `#557ed8`, sides `#4a7fee`, bottom `#a5c1fe`), inset top `#3467d8` + `#376ce2`, inset bottom `#588cfe`. Secondary: 144x47 white, border `#d7d8da` (top `#d0d1d3`, bottom `#e7e8eb`), inset top `#e5e5e5`. Gap 13.5. Nav pill: 147.5x37.5, same white grammar.
- **Logo.** Two broken rings (r 11.5 and 6.5, 2.5 stroke, round caps) and a 2.75 dot, all `#3d79fe`. The outer gap is at about 1-2 o'clock, the inner gap at about 7-8 o'clock. The rings are broken, not closed: this corrects the study's §3 "closed rings".
- **One iso frame for everything flat on the floor (corrects CSL-11).** Tiles, cards and pills all measure true isometric: edges at 29.7-30.1°, and the YouTube top face is 68x39.5 (0.58). The study's 0.46 tile ratio was a misread. In code: `u = y + x/√3`, `v = y - x/√3` (plan coords read straight off the screen), screen = `((u-v)·√3/2, (u+v)/2 - z)`. Logos and labels lie in the plane via `matrix(√3/2 -½ √3/2 ½ x y)` (local x reads up-right, local y runs down-right). Every edge is a constant-u or constant-v line, so you can fit a card from two line scans.
- **Tiles (CSL-10).** Rounded squares, r ≈ 0.2 s. Small: s 44.5 (68 wide). Large: s 52.3 (80 wide). LinkedIn: s 57.6. Side 5.5-7.7 with a `#eef3ff`-to-`#d3e0ff` gradient. A 1px `#3d79fe` contour runs round the top face and the whole extruded silhouette (drawn as the convex hull of the top outline and its shifted copy). The face is white with a fine blue dot grain. A faint `#e6eaf7` lift sits to the lower right.
- **Coin (CSL-13).** Top ellipse centre (722.25, 633.25), rx 121.75, ry/rx 0.575, 1px blue contour. Rim r 97-121.75 (gradient `#bfd3ff` at back-right to `#fdfeff` at front-left). Raised rings `#c2d5ff`→`#a9c3fe`. Groove 1 is r 76.5-97 with a 9-wide bridge at the back; groove 2 is r 39.5-60.5 with its bridge at the front; the centre pit is r 22.5. Groove ends are round caps of the groove. Walls: draw the opening in `#3972ef`, then the floor `#3d79fe` shifted 4.5px down and masked by the opening. That alone gives the measured 4.5px dark band on the upper side of every groove. Side: navy `#0c1833`, 29.75 deep. The front-left notch from 115.4° to 164.4° keeps only a 9px top plate. A `#3d79fe` radial cut face at 164.4°, 25.25 deep, shows as the small blue wedge at x 605-615. There is no bottom contour.
- **Floor light (CSL-14).** Ellipse `#f7f8f9` 243.5x139 and ellipse `#fbfbfc` 186.5x106.5, both centred (722.5, 677). Contact disc `#eaeffc` 129x70 at (722.5, 676). One radial glow `#dbe4f9` behind the coin and a second `#d6e2fc` glow over the near card ends.
- **Cards (CSL-12).** One strip, u 992.6..1143.1 (screen-plan units). Far to near: v -475..-273.5 (card 3, u 988.5..1132.4, fades to the upper right), -256..-54.7, -38.4..162. That makes each card 201 long, with 16-18 gaps. Corner r 16-19, 3px side, contour `#5f90fd` (card 3 `#97b6fb`). Grid rows along v every 25 (u 1028.5, 1053.5, ...), columns at the near end +49/+109/+169. App icons sit in column 1 at the near end +28.5, 25.2 pitch.
- **Pills.** Stadium, half width 17.25, raised. The under-plate is the same shape 11px lower in `#e1eaff`. Pill 1 is on centre line u 1102, v -47..68. Pill 2 is on u 1106, v -259..-155, overhangs its card and runs `#3d79fe`→`#6e9bfe`. Labels are Inter 500 13.3, in plane, nudged 6.5 toward the far end and 2.5 down the plane.
- **Connectors (CSL-17).** Brand-blue dashes 0.9px, 4/4, at 0.75 alpha: an S-curve AWS→Slack→PDF→YouTube→Drive, a straight -v line PDF→Excel→Gmail→Drive, and a vertical Drive→Sheets→LinkedIn line.

## Lessons for the engine
1. **Re-measure the study, too.** The study (written from the same PNG) still had two misreads: tile ratio 0.46 (every tile measures 0.575) and a "closed rings" logo (the rings are broken). A replica overlay is the check on a study, not the other way round.
2. **Read iso plan coordinates straight off the screen.** With `u = y + x/√3` and `v = y - x/√3`, every iso edge is a constant, so one least-squares fit over 8-10 sampled contour pixels gives an edge to 0.1px. Cards that looked like "climbing, perspective-fitted" objects turned out to be one axis-aligned strip.
3. **Draw raised relief with mask and shift, not shadows.** The groove opening goes in the wall colour, and the floor is shifted by the relief height and masked by the opening. That reproduces the measured wall bands exactly (CSL-13).
4. **Extrude convex solids as a hull.** The silhouette is hull(top ∪ top + extrusion), filled with the side and stroked, with the top face on it. That gives the blue contour round the bottom and the vertical ends that CSL-10 asks for, with no hand-drawn side paths.
5. **A substitute font is solved on two numbers.** Set the size from the ink height and the tracking from the line width (Lora: 72px and -0.0305em matched both lines at once). Fixing only width (69px) leaves the caps 2px short. When word widths inside a line still drift, the font is wrong, and per-word letter-spacing hides it only for single-word items like nav links.
