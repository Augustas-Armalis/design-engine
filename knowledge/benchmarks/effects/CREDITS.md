# Effects & materials benchmarks: credits

Reference captures for `knowledge/web/effects-materials.md`. Everything here is a screenshot or computed-style measurement of a public page, taken 2026-10-10 with Playwright (Chromium 156, 1440x900, no clicks, no logins, cookie banners hidden with CSS only). The work belongs to its owners. Use it for study only; never put it in client deliverables or present it as ours.

## Crops (`*.png`, DPR 2, element + padding)

| File | Site | What it teaches | Measured (computed style) |
|---|---|---|---|
| `raycast-window-glass.png` | raycast.com | Dark glass window over a lit field | bg `rgba(0,0,0,.6)`, `blur(36px)`, `0 4px 40px 8px rgba(0,0,0,.4), 0 0 0 .5px rgba(0,0,0,.8), inset 0 .5px 0 rgba(255,255,255,.3)`, 1px `rgba(142,140,144,.2)`, r12 |
| `raycast-keycaps.png` | raycast.com | Keycap material from five box-shadow layers | `0 1.5px .5px 2.5px rgba(0,0,0,.4), 0 0 .5px 1px #000, inset 0 2px 1px 1px rgba(0,0,0,.25), inset 0 1px 1px 1px rgba(255,255,255,.2)` (157 keys) |
| `raycast-gradient-border-pill.png` | raycast.com | Gradient border via `mask-composite: exclude` | pill r36 and card r30, two `linear-gradient` masks, exclude |
| `linear-frame-edge-light.png` | linear.app | Masked border spotlight on the product frame | duplicate border masked `radial-gradient(200px 200px at 8% 0%, #000, .6 30%, .2 50%, transparent 70%)`; grain overlay .6 |
| `linear-comment-card-edge.png` | linear.app | Edge highlight from one corner | mask `radial-gradient(100px 100px at 0 0, #000 16%, transparent)`, ring `0 0 0 1px rgba(0,0,0,.2)`, 1px white .08 |
| `liveblocks-hero-grain.png` | liveblocks.io | Grain over a WebGL hero | feTurbulence fractalNoise .86, 3 octaves, 180px tile, `soft-light` .045; vignette radial 65% |
| `apple-mbp-glass-controls.png` | apple.com/macbook-pro | Apple glass pill controls | `rgba(66,66,69,.72)` / `rgba(42,42,45,.72)`, `blur(20px)` / `blur(7px)`, r28 on 56px |
| `apple-store-card-shadow.png` | apple.com/store | Apple's only card shadow | `rgba(0,0,0,.08) 2px 4px 12px`, r18 (one of two x-offset shadows in 32 sites) |
| `mercury-glass-pill.png` | mercury.com | Tinted glass over video | `rgba(175,178,206,.2)` + `blur(20px)` + 1px `rgba(175,178,206,.36)`, r40 |
| `clerk-squircle-tiles.png` | clerk.com | Shipped `corner-shape: squircle` | 32x32 tiles, r12, computed `superellipse(2)`, inset ring `oklab(.25 / .1)` |
| `framer-superellipse-card.png` | framer.com | Shipped `corner-shape: superellipse(1.5)` | r20 when supported, fallback `calc(20px * .752)` |
| `stripe-floating-card.png` | stripe.com | Brand-tinted floating shadow | `rgba(50,50,93,.25) 0 30px 45px -30px, rgba(0,0,0,.1) 0 18px 36px -18px` |
| `stripe-glass-window.png` | stripe.com | Light glass browser window | `rgba(248,250,253,.45)`, `blur(12px)`, `rgba(23,23,23,.08) 0 15px 35px`, r6 |
| `stripe-dot-grid.png` | stripe.com | Square-dot texture with vertical fade | SVG 10px tile, 2x2 `#30437F`, opacity .46, mask `linear-gradient(transparent, #737373 50%, transparent)` |
| `attio-frame-shadow.png` | attio.com | Navy-tinted frame ladder | `rgb(11 13 24/.06) 0 0 0 1px, .024 0 1px 2px, .03 0 3px 6px, .035 0 8px 14px, .04 0 16px 28px`, r16 |
| `cal-card-contact-shadow.png` | cal.com | Crisp contact line under a soft lift | `rgba(19,19,22,.7) 0 1px 5px -4px, rgba(34,42,53,.1) 0 0 0 1px, rgba(34,42,53,.05) 0 4px 8px` |
| `granola-tray-ring.png` | granola.ai | Tray halo from a wide 0-blur spread | `rgba(71,67,42,.05) 0 0 0 8px` on r28 |
| `cursor-frame-and-shimmer.png` | cursor.com | Dark frame over art + "working" shimmer | `0 28px 70px .14, 0 14px 32px .1`, ring text .1; shimmer bg 200%, .6 -> .92 at 55%, 1.6-2.5s |
| `affectui-dof-blur.png` | affectui.com | Depth-of-field from 3 masked blur layers | `backdrop-filter: blur(2px / 8px / 6px)` under radial and bottom masks |
| `affectui-card-stage.png` | affectui.com | Card-in-card stage with inset ring | stage `#fafafa` r8, `inset 0 0 0 1px rgba(10,10,10,.055)` |
| `resend-glass-button.png` | resend.com | Glass button with texture | `linear-gradient(104deg, rgba(253,253,253,.05) 5%, rgba(240,240,228,.1))`, `blur(25px)`, 2px white .05, `texture-btn.png` |
| `evervault-live-gradient.png` | evervault.com | Mesh gradient from blurred radials | 6 radials `#fff -> #6633ee 38% -> #010314 78%`, `blur(40px)`, pulse 18s |

## Raw measurements (`raw/`)

`raw/<site>.json` + `raw/<site>-fold.png` (1440x900 @1x) for 32 pages: apple-home, apple-iphone, apple-mac, apple-store, vision (apple.com/apple-vision-pro), stripe, linear, vercel, raycast, attio, affectui, clerk, framer, comeau-shadows (joshwcomeau.com/css/designing-shadows), ahlin (tobiasahlin.com/blog/layered-smooth-box-shadows), resend, liveblocks, cursor, neon, mintlify, mercury, evervault, github-copilot, supabase, cal, arc, family, rauno, folk, figma, granola, lightfield. Each JSON lists every distinct box-shadow (count + example element, size, radius, fill), radii by frequency, backdrop-filters, blend modes, masks (with composite), filters, gradients (with size/clip), url backgrounds (noise files), computed `corner-shape`, clip-paths, animations, `@property` rules, inline SVG filters, and a grep of all loaded CSS for corner-shape / superellipse / feTurbulence / mask-composite / backdrop-filter / `in oklab` / conic / plus-lighter / offset-path. `raw/liveblocks-spotlight-hover.png` is the pointer spotlight captured mid-hover.

## Scripts

- `scripts/effects-measure.mjs <name> <url> [--scheme dark]`: the measurement pass above.
- `scripts/crops.mjs [name]`: regenerates the crops.

## Written sources (read, not captured)

Figma, "Desperately seeking squircles" (Daniel Furse, 2018); phamfoo/figma-squircle src/draw.ts + distribute.ts (MIT); PaintCode, "Code for iOS 7 rounded rectangles" (UIBezierPath continuous-corner constants); CSS Borders 4 draft (`corner-shape`) + MDN + Chrome blog "Implementing corner-shape" (Noam Rosenthal, 2026); Smashing Magazine "Beyond border-radius" (2026-03); Josh Comeau, "Designing beautiful shadows" + shadow palette generator + "Next-level frosted glass"; Tobias Ahlin, "Smoother & sharper shadows" + "How to animate box-shadow"; Vercel Web Interface Guidelines; Linear, "How we redesigned the Linear UI"; Apple Newsroom + WWDC25 session 219 (Liquid Glass); kube.io "Liquid glass in CSS and SVG"; CSS-Tricks "Grainy gradients" (Jimmy Chion) + "Easing linear gradients" (Andreas Larsen); css-tip.com border-gradient (Temani Afif); Ryan Mulligan "@property"; Magic UI sources (magic-card, animated-shiny-text, border-beam, shine-border); ibelick background-snippets; vanilla-tilt.js source.
