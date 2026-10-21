# Attio homepage fold: replica notes (internal study)

Reference: `knowledge/benchmarks/attio/fold-home.png` (1440x900 CSS @2x). Replica: `work/replicas/app/src/AttioHero.tsx`, route `#/attio`.
Overlay: `work/replicas/cmp-attio-overlay.png`, side by side: `work/replicas/cmp-attio-side.png`.
Every value below was measured from reference pixels (ink bounding boxes and colour runs at 2x, halved to CSS) and cross-checked against `knowledge/benchmarks/type-buttons/attio.json` (DOM capture).

## What registered
| Element | Reference (CSS px) | Replica | Drift |
|---|---|---|---|
| Banner text ink | x 577.5-842.5, y 19-32 | same | 0 |
| Nav link ink (Platform ... Pricing) | 177 / 288 / 414 / 525.5 / 634.5 | 177 / 288 / 414 / 525.5 / 635 | <=0.5 |
| Nav chevrons | 245.5-254.5, 371.5-380.5 | same | 0 |
| Sign in / Start for free | 1225-1296 / 1306-1416, y 64-100 | same | 0 |
| Pill text + chevron | 591-837, 845.5-849.5 | 591.5-837.5, 845.5-849.5 | 0.5 |
| h1 ink | x 318-1121, y 284-344.5 | identical | 0 |
| Sub, two lines | 525.5-914 / 532.5-907 | 525.5-914.5 / 532.5-907 | <=0.5 |
| CTAs | 606-714 / 724-834, y 446-482 | same | 0 |
| Window ring, traffic lights | ring x 179 / 1260, y 579; lights 194/212/230 | same | 0 |
| Panel borders, sidebar divider | 186.5, 438, 1252.5 | 186.5, 438, 1252 | <=0.5 |
| Header rules (sidebar + main) | y 656.5 | DOM 656.5, paints 657 | 0.5 |
| Main header Home / Configure / Help | 473 / 1106 / 1207.5 | 473 / 1106 / 1207.5 | 0 |
| Composer | 534.5-1157 x 746.5-854 | 535-1157 x 747-854 | 0.5 |
| Composer footer (Auto, slash, send) | 1056 / 1100 / 1122.5 | 1056 / 1099 / 1122 | <=1 |
| Chips row | 699-864, 872-993, y 863-889 | ~same (our copy) | <=1 |
| Stage gradient (8px-averaged samples) | e.g. 100,650 #f1f4fe / 100,895 #e0e6fa | #f2f5fd / #e1e8fc | 1-3 units |

## What did not register (and why)
- **Cookie banner** (18-365 x 731-883 in the capture) is left out on purpose. The sidebar items under it (Notifications ... Sequences) are ours, at a 28px pitch read from `crop-home-hero-window.png`, so they cannot be checked against the fold.
- **Logo**: a neutral placeholder mark plus an "orbit" wordmark, sized to the same 28x24 mark box and roughly 60px wordmark. It is not traced.
- **Window copy** is our own sample data (Brightway workspace, "Good morning, Ada", "Which deals need me before Friday?", "Prep for Lumen demo"). I picked strings with near-identical measured widths so the layout still registers. The headline, sub, nav and CTA copy is kept verbatim only so this internal overlay can register.
- **Glyph-level icons**: lucide stands in for Attio's own icon set. I hand-drew the house and sidebar-toggle glyphs to their measured boxes.
- **Header rule**: the DOM puts it at 656.5, but Chrome paints the 1px rule half a pixel lower than the reference.

## Font substitution
Attio uses `interDisplay` (display) and `inter` (UI). Inter Variable with the opsz axis (`@fontsource-variable/inter/opsz.css`) reproduces both:
- `"opsz" 32` = Inter Display. With it the h1 ink box matched to the pixel (318-1121, cap 284.5, baseline 331).
- `"opsz" 14` for all text below display size. With `font-optical-sizing: auto` the 18px sub rendered 1.7% narrow (382 vs 388.5); pinning opsz 14 fixed it exactly. Attio's text face does not optically size.
- `font-feature-settings: "ss03"` everywhere, as in the capture.

## Measured tokens

### Type tuples (size / weight / line-height / tracking / colour)
| Role | Tuple |
|---|---|
| h1 | Inter Display 64 / 600 / 60.8 (0.95) / -1.28px (-0.02em) / #1c1d1f, one line, 805px wide |
| Sub | Inter 18 / 500 / 23.4 (1.3) / -0.18px / #6f7988, max-width 486 (27em), balanced, 2 lines |
| Nav links | Inter 15 / 500 / 22 / -0.16px / #2e3238 |
| Buttons | Inter 14 / 500 / 20 / -0.07px (-0.005em) |
| Pill | Inter 13 / 500 / 18 / -0.16px / #232529 |
| Banner | Inter 13 / 500 / 20 / -0.16px / #fff on #000 |
| App greeting | 18.6 / 600 / 24 / -0.19px / #242629 |
| App UI text | 13 / 500 / 20 / -0.13px; primary #242629, muted #737373 (rgba(0,0,0,.55)) |
| Workspace name | 15 / 600 / -0.15px |

The window's UI text measures 13px. The DOM capture says 14px, which means the window is rendered at about 0.93 scale. Every rendered width (Home 35, Configure 59.5, Help 27) matches 13px.

### Colours
- Ink ramp, all cool and slightly blue: h1 #1c1d1f, pill #232529, nav #2e3238, sub #6f7988, tertiary #8f99a8.
- Lines: nav rule #e4e7ec; secondary button border #cad0d9; pill border #edeff3; app rules #eeeff1; panel border #efefef.
- Primary button: fill #202124, border #505967 (lighter than the fill), text #f3f4f6. Hover swaps the fill to `radial-gradient(at 50% -10%, #505967, #202124)`.
- Stage: white to y 470, then a vertical wash #fbfcfe, #f3f5fd (470), #ebf0fc (590), #e4eafc (700), #dfe6fc (900). The centre stays whiter (radial). 1px lighter rules every 8px (x = 0 mod 8) fade in below about y 470.
- App: chrome #f3f4f8, sidebar #fbfbfb, active item #eeeff1, content #fff. Accent blue #266df0 on the send button; focus border #b9d0fa.
- Traffic lights: #ff5b59 / #f5bb0c / #1ac480.
- Chip tints: blue #e5eeff with #215bc4; pink #feecf3 with #b81c5d.

### Radii (rendered)
| Element | Radius |
|---|---|
| Buttons (36h) | 10 |
| Pill (30h) | 13 (not a full capsule) |
| Window | 16 |
| Inner panel | ~11 |
| Composer | 14 |
| QA box, search box, chips, send button, sidebar item | 8 |
| Kbd | ~5 |
| Workspace mark | 6.5 |
| Chip icon square | 4 |

All corners are plain circular arcs. The replica resets the engine's global squircle to `corner-shape: round` inside the page.

### Shadows
- Window: `0 0 0 1px rgba(11,13,24,.06), 0 1px 2px rgba(11,13,24,.024), 0 3px 6px rgba(11,13,24,.03), 0 8px 14px rgba(11,13,24,.035), 0 16px 28px rgba(11,13,24,.04)`. Five layers, none above 6% alpha, tinted navy, not black.
- Composer: `1px solid #b9d0fa` + `0 12px 30px rgba(0,0,0,.04)`.
- QA/search fields: `0 0 2px rgba(28,40,64,.18), 0 1px 3px rgba(0,0,0,.04)`. A blurred hairline instead of a border.
- Send button: `0 2px 4px -2px rgba(15,107,233,.12), 0 3px 6px -2px rgba(15,107,233,.08)`, a tinted drop, plus `1px solid rgba(0,0,0,.1)`.
- Banner: `0 1px 2px oklch(0 0 0/.01), 0 2px 4px -1px oklch(0 0 0/.02), 0 4px 8px -2px oklch(0 0 0/.03)`.

### Vertical rhythm (CSS px)
| Band | Value |
|---|---|
| Banner | 0-48 |
| Nav | 48-116 (68 tall, 1px rule at 115) |
| Nav to pill | 96 |
| Pill | 212-242 |
| Pill to h1 box | 36 |
| h1 box | 278-338.8 |
| h1 to sub | 36 |
| Sub | 375-422 |
| Sub to CTAs | 24 |
| CTAs | 446-482 |
| CTAs to window | 98 |
| Window top | 580 |
| Window visible in fold | 320 of 900 |

### Horizontal grid
| Item | Value |
|---|---|
| Logo | x 28 |
| Nav anchors | 14px padding, 6px gaps |
| Nav buttons | end 24px from the right edge (1416) |
| Gap between buttons | 10 |
| Window | 1080 wide (75% of viewport), x 180-1260 |
| h1 | 805 wide (56%) |
| Sub | 486 max |
| Composer column | 622, centred in the 814px main pane |

### Button anatomy
| Part | Value |
|---|---|
| Height / padding | 36h, 0 12px |
| Radius / border | 10, 1px border on both variants |
| Secondary | white, border #cad0d9, text #2e3238 |
| Primary | #202124, border #505967, text #f3f4f6 |
| Widths | Sign in 71, Talk to sales 108, Start for free 110 |
| Hover, secondary | border darkens to #6f7988 |
| Active, secondary | fill #f3f4f6 |
| Transition | 0.3s cubic-bezier(.2,0,0,1) |

There is no shadow, no glow and no gradient at rest.

### Window chrome
- Outer box: 1080 wide, radius 16, fill #f3f4f8, the five-layer shadow above.
- Title bar: 32px, holding three 12px lights at x +14, +32, +50 and y +10 (18px pitch).
- Inner panel: inset 6 at left, right and bottom; 1px #efefef border; radius ~11.
- Sidebar: 251px plus a 1px #eeeff1 divider.
- Header rows: 43.5px plus a 1px rule.
- Sidebar rows:
  - 26px controls; field to first item 9px.
  - Items 26px tall with an #eeeff1 active fill.
  - 12-13px line icons with a 5.5px icon-to-label gap.

## What makes it look premium (with the measured evidence)
1. **One ink, one weight step.** The h1 is 64/600 at -0.02em and line-height 0.95. Everything else is 500 weight between 13 and 18px. There is no third weight in the fold apart from the app greeting at 600, so the hierarchy comes from size and colour, not from boldness.
2. **Cool greys, never neutral grey.** Every text and line colour carries a blue tint (lab b* from -1.5 to -9.6): #1c1d1f, #2e3238, #6f7988, #cad0d9, #e4e7ec. The stage ends in lavender #dfe6fc. The page reads as one material because nothing is pure #888 or #eee.
3. **The sub is a different colour, not a lighter weight.** It is 18/500 in #6f7988 (contrast 4.41, just over AA) and capped at 27em, so it balances into two lines of 388 and 374px under an 805px headline, a 2:1 width ratio.
4. **Small, exact controls.** Nav and hero buttons are 36px tall with radius 10 and 12px padding, on a 1440 canvas. The primary's 1px border (#505967) is lighter than its fill (#202124), so the button has an edge without a shadow. The resting state has no glow at all.
5. **Generous, stepped air above the fold.** The gaps run 96 (nav to pill), 36 (pill to h1), 36 (h1 to sub), 24 (sub to CTAs), then 98 to the window. Big, small, small, smaller, big: the copy block is held tight and separated from the chrome and the product by roughly 100px on each side.
6. **The product is large and cropped by the fold.** The window is 1080 wide (75% of the viewport) and starts at y 580, so only its top 320px show. The fold sells "there is a real app below", not a screenshot postage stamp.
7. **Shadows are stacks of whispers.** The window uses five layers, the largest 0 16px 28px at 4% alpha, tinted navy rgba(11,13,24). Its 1px ring is 6% alpha. Nothing exceeds 6%, yet the frame lifts clearly off the lavender wash.
8. **Real app density inside the frame.** UI text is 13px (it measures as 14px scaled about 0.93), controls are 26px, the header is 44px and the sidebar 251px. Those are real product proportions, not marketing-inflated ones, which is why it reads as a live product.
9. **One accent, used once.** Blue #266df0 appears only on the 26px send button, and its focus echo is the #b9d0fa composer border. The two chip tints (#e5eeff and #feecf3) are 14px squares. The coloured pixel area in the fold is well under 1%.
10. **Texture you feel, not see.** The stage has 1px lighter rules every 8px, about 4/255 brighter, fading in from y 470. They break up the gradient banding and give a faint "graph paper" quality only noticeable at 2x.
11. **A single moving detail.** The announcement pill carries a 1px blue-to-cyan light (#709ff4 to #8de2ec) about 90px long travelling along its bottom border. It is the only "effect" in the copy block.
12. **Hairlines as a family.** The rules are #e4e7ec (nav), #edeff3 (pill), #eeeff1 (app) and #efefef (panel), all 1px. Field outlines are a 2px blur at 18% instead of a border. No element has two different edges.
