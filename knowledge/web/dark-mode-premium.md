---
source: web:linear.app, linear.app/changelog, vercel.com, vercel.com/ai, raycast.com, resend.com, cursor.com, supabase.com, railway.com, planetscale.com, modal.com, neon.com, basement.studio, liveblocks.io, trigger.dev, inngest.com, unkey.com, axiom.co, zed.dev (measured 2026-10-09, Playwright Chromium 1440x900 @1x, colorScheme dark, cookie banners hidden with CSS only)
chapter: Premium dark mode: what separates it from the "AI dark template", measured per site, with light-construction and product-frame recipes
pages: n/a (live measurement; fold shots + raw JSON in knowledge/benchmarks/dark/<site>-1440.png|json)
topic_tags: [dark-mode, premium, canvas, surface-ladder, borders, text-tiers, accent-restraint, glow, webgl, mask, grain, product-frame, edge-light, buttons, hover, gradient-text, status-chips]
status: studied
extends: knowledge/web/dark-mode-craft.md (read that first; this note does not repeat its rules, it adds new measurements and corrects three of its numbers)
---

# Premium dark mode (extension of dark-mode-craft.md)

`dark-mode-craft.md` already fixes the canvas band, surface steps, hairline alpha, four text tiers, accent band and type-on-dark. This note adds what that one did not measure: **how the light is physically built** (WebGL, video, masks, vignettes, grain, pseudo-elements), **how the product window is edged in dark**, **button construction and hover deltas**, **how much of the fold is allowed to be coloured**, and 8 new sites (Modal, Basement, Liveblocks, Trigger, Inngest, Unkey, Axiom, Zed) plus Linear changelog and Vercel AI.

Method: a Playwright measurement script (session scratchpad, not kept in the repo; its output fields are listed in section 9) reads `getComputedStyle` for the element and its `::before/::after` on every visible fold element, finds frame candidates (>= 560x260, rounded, edged, below the h1), lists every gradient/mask/filter/blend layer, detects `canvas` context type and `video`, then a pngjs pass computes 12x8 block-median OKLCH L and the share of fold pixels with chroma C > 0.08 ("chromatic area") and L > 0.85 ("bright area"). A second script hovered the hero CTAs (no clicks) and diffed computed styles. Evidence grading as in the parent note: **[measured]**, **[visual]**, **[engine note]**.

Rendered **light** with `prefers-color-scheme: dark`, so excluded: clerk.com, warp.dev, browserbase.com, posthog.com, factory.ai, lusion.co (white canvas around a WebGL scene). 19 dark folds remain.

---

## 1. Premium dark vs the "AI dark template", in numbers

The template column is an [engine note]: the recurring defaults in generated dark landing pages (and in the engine's own Vigil/Nocturne). The premium column is [measured] across the 19 folds.

| Axis | AI dark template | Premium (measured) |
|---|---|---|
| Where the light comes from | CSS `radial-gradient` colour blobs (purple/blue, alpha .3-.5, `blur(100px+)`) behind the headline | A real object or scene: WebGL 7/19 (Raycast, Resend, Modal, Liveblocks, Axiom, Basement, Zed's product), video 3/19 (Neon, Unkey, Trigger), 2D canvas 1/19 (Vercel prism), framed painting/illustration 2/19 (Cursor, Railway); 6/19 have no light at all (Linear, Linear changelog, Vercel AI, Supabase, PlanetScale, Inngest). **0/19 light the hero with CSS colour blobs.** Radial gradients in the fold are used to *darken* (vignettes, masks), not to light. |
| Coloured area of the fold | 10-30% of pixels tinted | Chromatic pixels (C > .08): **0.0%** Linear, Resend, Vercel, Vercel AI, Unkey, changelog; **0.1-1.0%** Cursor, Basement, Liveblocks, Axiom, Railway, Supabase, Zed; 2.3-6.7% Trigger, Neon, Inngest, PlanetScale, Modal; 19.2% Raycast (its signature red field is the whole idea). Median **0.6%**. |
| Bright area (L > .85) | big white cards, glowing borders | 0.1-5.5% of the fold, median 1.8%: the headline, one inverse button, logo row. |
| Headline | purple-to-blue gradient text, 72-96px, weight 700 | Solid near-white 17/19. Gradient text 1/19 (Resend: white to white .5, **no hue**). Colour used as a second-line or keyword tint 3/19 (Supabase line 2 `#4acd8b` L .76, Modal "production AI" `#7fee64` L .85, Zed whole h1 pale blue at weight 320). Weights 320-600, sizes 44-96. |
| Borders | `white/10`-`white/20` on everything, often a gradient border | Resting hairline white .05-.10 (Linear .08 on 37 elements, Supabase oklch .95/.075 on 246, Cursor .10 on 67, Modal .10/.05/.03); strong .12-.25 only on controls. Solid-hex borders are as common as alpha (Trigger `#1c1e21`, Unkey `#2e3038`, Zed oklch .266). |
| Cards | glassmorphism, `backdrop-blur` on every card, drop shadow-xl | Opaque lightness steps or 1-5% white overlays; `backdrop-filter` only on nav (Linear `blur(20px)`); drop shadows only on the product window. |
| Primary button | gradient purple-pink pill with coloured glow | Inverse near-white fill 10/19 (L .92-1.0), deep/mid chromatic fill 7/19, glass 1/19 (Resend), outline-only 1/19 (PlanetScale/Unkey secondaries). Coloured CTA glow at rest: **0/19**. White glow on hover only: Resend. |
| Grain | none (banding in big gradients) or heavy | 6/19 add grain, always at low strength and only over light: Neon noise.svg as mask at opacity .075, Vercel noise layer .42 `multiply` over the prism, Liveblocks `soft-light` .045, Zed .012-.05, Inngest `soft-light`, Resend a texture PNG inside the CTA `::after`. |
| Canvas | `#000` or `#0a0a0a` with no hue | 6/19 true black; 13/19 tinted near-black with a hue the brand owns (H 49 warm, 94 olive, 145 green, 246-274 blue, 285-292 violet). |
| Product UI | floating cards with fake charts | Full product window with real rows; 11/19 folds show product UI or code (Linear, Cursor, Supabase, Railway, Axiom, Zed, Inngest, Trigger, Raycast keycaps, Linear changelog, Neon none). |

The single most predictive check: **if you remove every gradient from the fold and the hero still has a light source, it is premium; if the light disappears, it was a template.**

---

## 2. Per-site palette ladders (measured)

Format: canvas (OKLCH L, C, H) / surfaces (hex, L) / borders (alpha or hex, flattened ΔL over canvas) / text tiers (hex, L, WCAG on its surface) / accent and how much / light construction / product frame / CTA. Full data in `knowledge/benchmarks/dark/<site>-1440.json`.

### Linear (linear.app) [measured]
- Canvas `#08090a` L .139 C .003 H 246; meta theme-color = canvas.
- Surfaces `#090a0b` .144, `#0f1011` .172, `#101112` .177 (frame), `#161718` .204 (panel); overlays white .01/.04/.05.
- Borders white .08 (37 el, ΔL +.090), .05 (ΔL +.057), .12 (ΔL +.131), solid `#2e2e32`.
- Text `#f7f8f8` .978 (18.7) / `#d0d6e0` .874 (13.6, 15px UI) / `#8a8f98` .649 (6.1) / `#62666d` .509 (3.4, 12px only).
- Accent: none in the fold (0.0% chromatic). Inverse CTA `#e5e5e6` L .922, hover to `#fff` in .16s `cubic-bezier(.25,.46,.45,.94)`; ghost "Log in" hover bg 0 -> white .08, text `#8a8f98` -> `#f7f8f8`.
- Light: none on the page. Inside the product: `nav::after` 232x704 with `filter: blur(80px)` (a soft sidebar glow), and the frame's own top-left **border spotlight**: a duplicate bordered layer (1px white .08, r12) masked with `radial-gradient(200px 200px at 8% 0%, #000 0%, rgba(0,0,0,.6) 30%, rgba(0,0,0,.2) 50%, transparent 70%)`. A 1416x768 layer under the frame runs `linear-gradient(#08090a 10%, #d0d6e0 100%)` under `radial-gradient(52.53% 57.5% at 50% 100%, transparent, rgba(8,9,10,.5))`.
- Frame `#101112` (+.038 L), 1px white .08, radius 12, shadows `0 2px 32px rgba(0,0,0,.25)`, ring `0 0 0 1px rgba(0,0,0,.2)`, inset `0 0 0 1px rgba(255,255,255,.05)`.
- Nav transparent, `blur(20px)`, header gradient `linear-gradient(rgba(11,11,11,.8), oklab(.15 0 0 / .76))`, bottom hairline .08.

### Linear changelog [measured]
- Same canvas and text set; flat (spread .016). The search field is the best measured **dark input recipe**: bg `#141516` (L .195, +.056), radius 100, `inset 0 0 0 1px rgba(255,255,255,.03), inset 0 1px 0 rgba(255,255,255,.04), 0 0 0 1px rgba(0,0,0,.6), 0 4px 4px rgba(0,0,0,.1)` (top light + black outer ring).
- Post images sit in r8 frames with no border; dates use an orange dot as the only colour.

### Vercel [measured]
- Canvas `#000`; secondary button `#0a0a0a` L .145 with `0 0 0 1px #2e2e2e`; inverse `#ededed` .946.
- Text `#ededed` / `#a1a1a1` .709 (8.1). 0.0% chromatic.
- Light: 2D canvas 1080x720 (the prism), an `img` with `mix-blend-mode: luminosity`, and a repeating noise div at opacity .42 `multiply` over it. Fold spread .173, max L .36.
- Hover: inverse `#ededed` -> `#cccccc` (darker, ΔL -.09); secondary `#0a0a0a` -> `#1f1f1f` (+.08 L); .15s `cubic-bezier(.4,0,.2,1)`.

### Vercel AI (vercel.com/ai) [measured]
- Canvas `#000`; the fold is pure type: spread **0.000**, zero light devices, centred 64px/450 Geist at -6% tracking, two pills, logo row. It works only because the brand is Vercel; for a client it would read empty (see rule R2).
- Cards below: `0 0 0 1px rgba(255,255,255,.145), 0 1px 2px rgba(0,0,0,.16), 0 0 0 1px #000` and an elevated variant adding `0 8px 16px -4px rgba(0,0,0,.04), 0 24px 32px -8px rgba(0,0,0,.06)`. Border `#292929` ΔL +.28.

### Raycast [measured]
- Canvas `#07080a` L .134 H 262; overlays white .05/.10, steel `rgba(158,190,215,.1)`; borders `rgba(142,140,144,.2)` (16 el), white .10/.08/.06, .20 at 2px for keycaps.
- Text `#fff` 64px/600 with `text-shadow: 0 4px 4px rgba(0,0,0,.15)` (separates it from the stripes) / `#9c9c9d` .693 (7.3).
- Light: WebGL canvas 2400x1934 (the red stripes) + an `::after` vignette of three canvas-coloured gradients: `linear-gradient(rgba(7,8,10,.125) 0%, rgba(7,8,10,.125) 90%, #07080a 100%)`, plus left and right fades to `#07080a`. Chromatic area 19.2% (the field), spread .443.
- Floating cards: `0 4px 40px 8px rgba(0,0,0,.4), 0 0 0 .5px rgba(0,0,0,.8), inset 0 .5px 0 rgba(255,255,255,.3)` (a hairline top highlight at half a pixel).
- CTA `#e6e6e6` r8 36px, label `#2f3031`: `0 0 0 2px rgba(0,0,0,.5), 0 0 14px rgba(255,255,255,.19), inset 0 -1px .4px rgba(0,0,0,.2), inset 0 1px .4px #fff`.
- Nav: floating pill 1204x76, `linear-gradient(137deg, rgba(17,18,20,.75) 4.87%, rgba(12,13,15,.9) 75.88%)`.

### Resend [measured]
- Canvas `#000`; one surface `#0b0e14` (announcement chip). Borders `oklab(1 0 0 / .05)` at 2px (8 el), `rgba(214,235,253,.19)` (cool slate) on the r24 section frame.
- Text `#f0f0f0` / `#a1a4a5` .717 (8.4). 0.0% chromatic.
- H1 Domaine 96/400 with `background: linear-gradient(to right bottom, #fff 30%, rgba(255,255,255,.5)); -webkit-background-clip: text; -webkit-text-fill-color: transparent`.
- Light: WebGL 648x550 (obsidian cube) + a 1440x900 background image at opacity .8 masked `linear-gradient(to top, transparent 15%, #000 25%)`.
- Announcement pill: `linear-gradient(19.4deg, rgba(2,252,239,.44), rgba(255,181,43,.44) 50%, rgba(160,43,254,.44))` border-ish fill with a `::after` copy at full colour, `blur(20px)`, opacity 0 (the glow exists only on hover).
- Glass CTA: `linear-gradient(104deg, rgba(253,253,253,.05) 5%, rgba(240,240,228,.1))`, 2px white .05 border, r16, 48px, label `#fff` 600, `::after` = `texture-btn.png`. Hover: fills white .9, label black, glow `0 0 4px rgba(255,255,255,.06), 0 1px 14px rgba(255,255,255,.12), 0 3px 32px rgba(255,255,255,.18)`.

### Cursor [measured]
- Canvas `#14120b` L .182 C .014 H 94 (warm); meta theme-color is the *light* `#f7f7f4` (a flash risk).
- Surfaces `#1b1913` .214 (24 el), `#201e18` .235, `#26241e` .260 (secondary button), `#4a443b` .390 (the art frame).
- Borders text-colour `#edecec` at .10 (67 el), .20 (20 el), .025.
- Text `#edecec` .944 (15.9) / alpha .6 -> `#969592` .670 (6.25, 11px) / alpha .4 -> `#6b6965` .522 (3.4). Accent only in diff counts `#1f8a65`, `#cf2d56` and a `#c08532` "Build" pill; 0.1% chromatic.
- Light: a painting (photographic image) inside a rounded panel; no gradients, no WebGL. Spread .359, max .76.
- Frame bg = canvas, r10, `0 28px 70px rgba(0,0,0,.14), 0 14px 32px rgba(0,0,0,.10), 0 0 0 1px oklab(.944 0 0 / .1)`; works because it floats over the bright painting.
- Hover: inverse `#edecec` -> `#d7d6d5`; secondary `#26241e` -> `#2b2923`; transitions 0s (instant).

### Supabase [measured]
- Canvas `#131413` L .190 H 145; surfaces `#181a19` .215 (16 el), `#1b1d1c` .228; overlay oklch(.95 / .033).
- Borders `oklch(.95 .0015 157.5 / .075)` (246 el, ΔL +.071), `/ .135` (strong).
- Text `oklch(.95 .00275 157.5)` / `#989a99` .684 (6.5, 16px/450) / `#bcbdbc` .797. Line 2 of the h1 in `#4acd8b` L .76.
- Cards get a **top-lit gradient border**: background `linear-gradient(oklch(.95 / .075) 0px, oklch(.215 .0025 157.5) 100%)` (the hairline colour at the top edge fading into the surface).
- CTA `oklch(.436 .11 157.5)` r9.3, `0 1px 3px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.04), 0 0 0 1px rgba(255,255,255,.06)`, plus `linear-gradient(rgba(255,255,255,.016), rgba(0,0,0,.01))`; hover L .436 -> .476 in .2s `cubic-bezier(.22,1,.36,1)`. Secondary alpha .033 -> .049 on hover.

### Railway [measured]
- Canvas `#13111c` L .186 C .022 H 292; art panel `#1b2132` .250; product pane `#0d0c14` .160 (sunken, -.026).
- Borders white .15/.25 (buttons), .10 (pane), `#33323e`.
- Text `#fff` serif 54/500 / subtitle `rgba(255,255,255,.8)` -> `#d0cfd2` .857 / nav `#dcdce0` .896.
- Light: illustrated sky image inside a 1400x1700 rounded panel with `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.05))` over it. Spread .169.
- Frame: inset 1px white .10, r10, a five-layer warm shadow `0 100px 191px rgba(62,45,45,.24), 0 36.5px 69.7px .165, 0 17.7px 33.8px .133, 0 8.7px 16.6px .106, 0 3.4px 6.6px .075`, and a separate **upward** cool glow `0 -12px 127px rgba(65,78,166,.10), 0 -4.38px 46.4px rgba(65,78,166,.07), 0 -2.1px 22.5px rgba(65,78,166,.06)`.
- CTA deep `#553f83` L .425, white label, 1px white .15, r8, 58px tall; secondary `rgba(0,0,0,.35)` + 1px white .25.

### PlanetScale [measured]
- Canvas `#111111` .178; no surfaces, no shadows, radius 0; borders `#c1c1c1` full (220 el); mono 16px everything; yellow banner `#fbca00` (6.0% chromatic), orange CTA `#f35815`, links `#47b7f8`. Brutalist outlier, as noted in the parent file.

### Modal [measured]
- Canvas `#040804` **L .126** C .015 H 145 (green-black); surface `#10120f` .179; overlay white .05.
- Borders white .10/.05/.03; inset rings via box-shadow (24 elements carry a 5-layer shadow stack with only the ring active).
- Text `#e3e5e1` .919 (tinted white, 14.9) / `#a8aba6` .737 (8.7) / `#6c6e6a` .535 (3.9). Keyword in h1 `#7fee64` L .854 C .204; top banner same lime (6.7% chromatic, mostly the banner).
- Light: WebGL 1440x1080 (dot-lattice cube) + `section::before` `radial-gradient(50% 100% at 50% 100%, rgba(20,26,19,.7), transparent)` with `mix-blend-mode: plus-lighter` (a floor light that adds, not paints).
- CTA inverse tinted `#e3e5e1` r48 36px, label `#10120f`, hover -> `#fff`; secondary white .05 + inset ring .05, hover .10. 

### Neon [measured]
- Canvas `#000`; surfaces `#111315` .185, `#18191b` .213; borders solid `#61646b`, `#494b50`, `#303236` (no alpha).
- Text `#fff` / `#94979e` .676 (7.2) / `#797d86` .589 (5.1, 10px caps) / `#c9cbcf` .842.
- Light: a 1920x832 **video** (signal bars) with a bottom fade `linear-gradient(transparent, #000)` 88px; the highlighted word spans carry a noise SVG as `mask-image` at opacity .075; logo marquee edges fade with `linear-gradient(to right in oklab, #000, transparent)`. Spread .289, chromatic 3.0%.
- CTA `#fff` pill 44px, label `#1a1a1a`, hover -> `#c9cbcf`; outline secondary 1px `#61646b`, hover border -> `#fff`.

### Basement (basement.studio) [measured]
- Canvas `#000`, the whole fold is a WebGL 3D room (1440x900) with a second canvas overlay; h1 Geist 87/600 -4% at `#e6e6e6`; nav 36px with a 1px grid made of two linear gradients; one hot accent `#ff4d00` L .668 C .224 on a 13px label = 0.5% chromatic. The studio pattern: one lit scene + one hot colour.

### Liveblocks [measured]
- Canvas `#000`; h1 suisse 60/500 `#fff`; one keyword wrapped in a live multiplayer selection (name tag in `#ecd365`); chromatic 0.6%.
- Light: WebGL 1440x900 scene + vignette `::before` = `linear-gradient(90deg, #000, transparent 5%, transparent 95%, #000), radial-gradient(65% 65%, transparent 52%, rgba(0,0,0,.35) 68%, #000 88%)` + `::after` grain `soft-light` opacity .045 + a 12px-blurred text band masked `linear-gradient(rgba(0,0,0,.65) 0, .65 44px, #000)`. Section top fade `linear-gradient(#000 50%, transparent)`.
- CTA `#fff` r8 44px, label `#000`; announcement pill 1px `rgba(253,252,252,.16)`.

### Trigger.dev [measured]
- Canvas `#121317` L .187 C .008 H 274; surface `#212327` .256; borders solid `#1c1e21` (71 el, ΔL +.047), `#3b3e45`.
- Text `#e8e9ec` 60/600 / `#b5b8c0` .783 (9.4, 18px) / nav `#d7d9dd`.
- Light: a 1440x600 **video** feathered with a double mask `linear-gradient(transparent 0%, #000 11.875%, #000 88.125%, transparent 100%), linear-gradient(to right, transparent, #000 50%, transparent)`. Chromatic 2.3%.
- CTA **bright lime fill `#a8ff53` L .912 C .218 with dark label** (`#121317`): a measured exception to the parent note's "no bright fill with dark label" rule. It survives because it is the only saturated thing above the fold (214x40px), the canvas is neutral, and the rest of the brand (badge `#481abd`, `#bab2ff`) stays small.

### Inngest [measured]
- Canvas `#0c0a09` L .147 H 49 under a page layer `#1c1c1c` .226 with grain (`soft-light`); h1 WhyteV1 72/400 caps, third line outlined.
- Text `#fff` / `#b3b3b3` .767 (8.1, 20px) / `#9b9b9b` .689 (code). Accent coral `#f65c4f` L .675 (CTA, eyebrow) and a full-width coral banner (4.2% chromatic).
- Code panel uses status rails: `inset 2px 0 0 #66bd8b`, chip `rgba(102,189,139,.14)` + `inset 0 0 0 1px rgba(102,189,139,.4)`.
- Buttons r6: outline via `inset 0 0 0 2px #fff`; coral fill with white label (5.3:1 at 12px/600 caps).

### Unkey [measured]
- Canvas `#040406` **L .108** C .007 H 285. Text `#fff` / `#9194a1` .668 C .019 (6.8). No accent (0.0%).
- Light: a 1469x918 **video** (grainy monochrome) + a darkening `radial-gradient(132% 112% at 24% 100%, rgba(4,4,6,.9), rgba(4,4,6,.72) 46%, rgba(4,4,6,.32) 78%, rgba(4,4,6,.1) 90%, transparent)` with `filter: blur(40px)` under the copy, plus a bottom fade. Spread .420.
- Buttons radius 0: `#fff` fill / 1px `#fff` outline. Nav pills are white blocks with dark labels.

### Axiom [measured]
- Canvas `#090909` L .140 C 0. Nav `lab(2.48)` + bottom hairline oklab(.24 / .5).
- Text `lab(98.26)` 64/500 Geist -1.5% / nav `lab(100 / .63)` -> `#a4a4a4` .719 (8.0) / `#7b7b7b` .583 (4.5). Accent orange `#da5c2b` L .628 on the CTA with white label (3.8:1) and code tokens `#ffa057` .789, `#70b8ff` .764.
- Light: WebGL 1208x670 (thin golden light streaks).
- **Bezel frame**: outer `lab(2.48)` (= canvas) r16 with 1px `lab(5.06)` and a canvas-coloured halo `0 0 40px 20px oklab(.14 0 0)` (it knocks the streaks back around the frame), inner panel `lab(3.32)` L .154 r10 with 1px `lab(13.2)` (ΔL +.11), 7px gap. Right and bottom edges fade into canvas with `linear-gradient(to left|top, lab(2.48), transparent)`.
- Secondary button: transparent with `linear-gradient(transparent, lab(5.06))` and 1px `lab(11.84)`.

### Zed [measured]
- Canvas `#111216` L .183 C .008 H 274; product chrome `#282c33` .292, `#2f343e` .324, frame `#3b414d` .375 (the editor is rendered by WebGL, 2240x1540).
- Borders `oklch(.266 .011 263)` solid (112 el), oklab(.64 / .1), white .2.
- H1 IBM Plex Serif 48/**320** italic in pale blue `lab(77.5 -6.5 -36.4)`; body `#a8adb7` .747 (8.3).
- Frame ring `0 0 0 1px oklab(.81 / .4)` (a strong 40% ring) + `0 20px 25px -5px rgba(0,0,0,.2), 0 8px 10px -6px rgba(0,0,0,.2)`, r6.
- CTA blue `lab(36.3 31.2 -81)` (`#1348dc` L .479 C .23) with a **bottom bevel** `inset 0 -2px 0 #053794` + `0 1px 3px rgba(0,0,0,.4)`; secondary `oklab(.75 / .05)` + 1px `/.2` + `inset 0 -2px 0 rgba(169,176,188,.08)`, hover bg .05 -> .10 and the bevel drops.
- Background: blue `oklab(.38 -.01 -.15 / .03)` floor gradient, an SVG grid at opacity .06 masked to fade upward, grain layers at .012/.05.

### Fold luminance and colour budget (pngjs, 12x8 block medians, 1440x900)

| Site | median L | p5 | p95 | max | spread | chromatic % | bright % |
|---|---|---|---|---|---|---|---|
| Linear | .139 | .139 | .222 | .230 | .083 | 0.0 | 1.9 |
| Linear changelog | .139 | .139 | .155 | .200 | .016 | 0.0 | 0.5 |
| Vercel | .000 | .000 | .173 | .360 | .173 | 0.0 | 1.5 |
| Vercel AI | .000 | .000 | .000 | .000 | .000 | 0.0 | 1.9 |
| Resend | .097 | .000 | .196 | .226 | .196 | 0.0 | 0.7 |
| Unkey | .153 | .108 | .528 | .770 | .420 | 0.0 | 5.5 |
| Cursor | .182 | .182 | .541 | .760 | .359 | 0.1 | 1.6 |
| Basement | .147 | .067 | .236 | .394 | .169 | 0.5 | 0.3 |
| Axiom | .140 | .140 | .154 | .154 | .015 | 0.6 | 1.3 |
| Liveblocks | .097 | .000 | .310 | .435 | .310 | 0.6 | 2.2 |
| Railway | .236 | .160 | .329 | .427 | .169 | 0.7 | 0.8 |
| Supabase | .190 | .190 | .215 | .215 | .026 | 0.9 | 0.6 |
| Zed | .196 | .187 | .324 | .324 | .137 | 1.0 | 0.1 |
| Trigger | .191 | .187 | .247 | .325 | .059 | 2.3 | 2.7 |
| Neon | .067 | .000 | .289 | .556 | .289 | 3.0 | 3.1 |
| Inngest | .256 | .173 | .316 | .345 | .143 | 4.2 | 1.7 |
| PlanetScale | .178 | .178 | .178 | .661 | .000 | 6.0 | 7.0 |
| Modal | .126 | .126 | .211 | .238 | .085 | 6.7 | 4.5 |
| Raycast | .138 | .134 | .577 | .578 | .443 | 19.2 | 1.8 |
| Nocturne (ours) | .160 | .117 | .329 | .537 | .212 | 1.4 | 3.3 |
| Vigil (ours) | .139 | .139 | .139 | .162 | .000 | 0.9 | 1.1 |

Nocturne's colour budget was in range; its failure was stacking and staging, not chroma (see parent note J).

---

## 3. How the light is built (construction inventory)

| Device | Sites | Exact recipe measured |
|---|---|---|
| WebGL scene/object | Raycast, Resend, Modal, Liveblocks, Axiom, Basement, Zed (product) | `<canvas>` at DPR 2 (Raycast 2400x1934 for a 1200x967 box); always under a vignette or mask |
| Video | Neon, Unkey, Trigger | `<video>` 1440-1920 wide, feathered by mask or gradient overlay |
| 2D canvas | Vercel | 1080x720 + `luminosity` image + noise `multiply` .42 |
| Framed art | Cursor (painting), Railway (pixel sky) | rounded panel; Railway dims with `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.05))` |
| Feather mask | Trigger, Resend, Linear, Zed, Liveblocks | `mask-image: linear-gradient(transparent, #000 12%, #000 88%, transparent), linear-gradient(to right, transparent, #000 50%, transparent)`; `linear-gradient(to top, transparent 15%, #000 25%)`; radial `200px at 8% 0%` |
| Vignette in canvas colour | Raycast, Liveblocks, Unkey, Neon, Axiom | `linear-gradient(to left/right, <canvas>, transparent)`; `radial-gradient(65% 65%, transparent 52%, rgba(0,0,0,.35) 68%, #000 88%)`; blurred 40px darkening radial behind copy |
| Additive floor light | Modal | `radial-gradient(50% 100% at 50% 100%, rgba(20,26,19,.7), transparent)` + `mix-blend-mode: plus-lighter` |
| Catch-light | Resend (parent note) | `radial-gradient(41% 8% at 50% 0%, rgba(255,255,255,.1), transparent)` |
| Grain | Neon, Vercel, Liveblocks, Zed, Inngest, Resend | noise SVG as `mask-image` op .075; noise div `multiply` .42; `soft-light` .045; op .012-.05 |
| Blur glow | Linear (inside product), Resend (hover only) | `filter: blur(80px)` on a 232px pseudo; `blur(20px)` on a gradient `::after` at opacity 0 -> 1 on hover |
| Text separation | Raycast | `text-shadow: 0 4px 4px rgba(0,0,0,.15)` on a white h1 over the field |

Pattern: **object (WebGL/video/canvas/image) + feather (mask) + vignette (canvas-coloured gradient) + optional grain**. Four layers, one light. Gradients are the *edges* of the light, never the light.

---

## 4. Product window in dark (frame recipes)

| Site | Frame bg vs canvas | Edge | Depth | Radius |
|---|---|---|---|---|
| Linear | +.038 L | 1px white .08 + masked spotlight copy of the border (top-left) + inset white .05 | `0 2px 32px rgba(0,0,0,.25)`, black ring .2 | 12 |
| Cursor | = canvas | ring text-colour .10 | `0 28px 70px .14, 0 14px 32px .10` over a bright painting | 10 |
| Railway | -.026 (sunken pane) | inset 1px white .10 | 5-layer warm shadow to `0 100px 191px .24` + upward cool glow `0 -12px 127px rgba(65,78,166,.1)` | 10 |
| Axiom | = canvas outer, +.014 inner | outer 1px ΔL +.04, inner 1px ΔL +.11, 7px bezel gap | canvas-coloured halo `0 0 40px 20px` | 16 / 10 |
| Zed | +.19 (chrome) | ring oklab .81 / .40 | `0 20px 25px -5px .2, 0 8px 10px -6px .2` | 6 |
| Vercel AI cards | = canvas | ring white .145 + outer black 1px | `0 1px 2px .16` (+ `0 24px 32px -8px .06` elevated) | 6-12 |
| Raycast floats | overlay | `0 0 0 .5px rgba(0,0,0,.8)` + `inset 0 .5px 0 rgba(255,255,255,.3)` | `0 4px 40px 8px rgba(0,0,0,.4)` | 12-16 |
| Supabase cards | +.025 | top-lit gradient `linear-gradient(<hairline> 0px, <surface> 100%)` | none | 16 |

Findings: (1) every frame has a 1px edge, 6 of 8 add either a top highlight or a light-side spotlight; (2) black drop shadows appear only when the frame sits over something lighter (art, field) or are pushed to .25-.40 alpha; (3) two sites knock the field back *around* the frame (Axiom canvas halo, Raycast/Liveblocks vignettes) so the product reads as the brightest crisp thing; (4) a darker-than-canvas pane is valid (Railway) when the page around it is lit.

---

## 5. Buttons on dark (construction + measured hover)

| Grammar | Rest | Hover delta | Sites |
|---|---|---|---|
| Inverse pill/rect | fill L .92-1.0, label = canvas | brighter to `#fff` (Linear, Modal) or darker ΔL -.06 to -.09 (Vercel `#ededed`->`#ccc`, Neon `#fff`->`#c9cbcf`, Cursor `#edecec`->`#d7d6d5`) | Linear, Vercel, Cursor, Modal, Neon, Liveblocks, Unkey, Raycast |
| Deep chromatic | fill L .42-.48, light label, 1px white .06-.15, inset top .04 | +.04 L (Supabase .436->.476) | Supabase, Railway, Zed |
| Mid/bright chromatic | fill L .63-.91 | n/a | Axiom, Inngest (white label, 3.8-5.3:1), Trigger lime (dark label) |
| Glass | white .05-.10 gradient, 2px white .05, texture | fills white .9 + white glow .06/.12/.18 | Resend |
| Ghost/secondary | white .033-.05 or +.04-.08 L solid, ring .05-.10 | alpha x1.5-2 (Supabase .033->.049, Modal .05->.10, Zed .05->.10, Linear 0->.08) or +.02-.08 L | Supabase, Modal, Zed, Vercel, Cursor, Linear |
| Outline | 1px solid `#61646b` / `#fff` / inset 2px white | border to `#fff` | Neon, Unkey, Inngest |
| Bevel | `inset 0 -2px 0 <darker>` + `0 1px 3px .4` | bevel removed | Zed |
| Keycap | 2px black .5 ring, white glow .19 14px, inset top white, inset bottom black .2 | n/a | Raycast |

Transition: .1-.2s, `cubic-bezier(.4,0,.2,1)` (Vercel, Neon, Modal, Resend), `(.25,.46,.45,.94)` (Linear), `(.22,1,.36,1)` (Supabase); Cursor and Zed snap at 0s.

---

## 6. Rules

- **RULE** Light the hero with an object, not with gradients: a WebGL/video/2D-canvas scene, a lit 3D object, a framed painting/illustration, or the product window itself. Use CSS gradients only as the feather, vignette or catch-light around that object.
  **Why** 13 of 19 dark folds have a real light source (WebGL 7, video 3, canvas 1, framed art 2) and the other 6 have none at all; 0 of 19 light the hero with CSS colour blobs. Radial gradients measured in folds are darkening vignettes (Liveblocks `radial-gradient(65% 65%, transparent 52%, .35 68%, #000 88%)`, Unkey blurred 40px darkening radial) or masks (Linear spotlight).
  **Applies to** landing page hero. **Check** delete every `background-image: *gradient*` in the fold; the hero must still have a visible light source or a product frame >= 1000px wide. Count of `radial-gradient` layers with a chromatic stop at alpha > .15 = 0. **Source** raycast, resend, modal, liveblocks, axiom, basement, neon, unkey, trigger, vercel, cursor, railway; linear, supabase as product-only [measured]

- **RULE** Spend colour like money: chromatic pixels (OKLCH C > .08) <= 3% of the 1440x900 fold unless the coloured field *is* the signature visual; bright pixels (L > .85) 0.5-5%.
  **Why** median chromatic area across 19 premium folds is 0.6% (Linear, Resend, Vercel, Unkey 0.0%; Cursor 0.1%; Basement 0.5%; Supabase 0.9%; Zed 1.0%). Only signature fields exceed it (Raycast 19.2% red stripes, Modal 6.7% with a lime banner, PlanetScale 6.0% brutalist yellow). Bright area median 1.8%.
  **Applies to** landing page. **Check** pngjs pass on the fold (12x8 block medians plus per-pixel OKLCH, as in knowledge/benchmarks/dark/scripts/lum.mjs extended with a C > .08 count): chromatic% <= 3 or DIRECTION.md names the coloured field as the signature; bright% in [0.5, 5.5]. **Source** all 19 folds [measured]

- **RULE** Feather every light source into the canvas with a mask or a canvas-coloured gradient; never let a field end on a hard rectangle or at the viewport edge unframed.
  **Why** every WebGL/video field measured is feathered: Trigger video `mask-image: linear-gradient(transparent 0, #000 11.875%, #000 88.125%, transparent), linear-gradient(to right, transparent, #000 50%, transparent)`; Resend image `mask: linear-gradient(to top, transparent 15%, #000 25%)`; Raycast `::after` three gradients to `#07080a`; Neon 88px fade to `#000`; Axiom edge fades and a `0 0 40px 20px` canvas halo around the frame. Framed art (Cursor, Railway) uses a rounded panel instead.
  **Applies to** landing page. **Check** each canvas/video/hero image has `mask-image`, an overlay gradient ending in the exact canvas colour, or a rounded frame; vignette stop colour == canvas hex. **Source** trigger, resend, raycast, neon, axiom, liveblocks, cursor, railway [measured]

- **RULE** Canvas floor revised: a tinted canvas may go to L .105-.13 only when the hero carries a lit WebGL/video field and the first surface step is >= +.05 L; otherwise keep the parent band L .134-.195 or true `#000`.
  **Why** Modal `#040804` L .126 (WebGL lattice, surface `#10120f` +.053) and Unkey `#040406` L .108 (video, spread .42) both read premium, contradicting the parent note's hard L .13 floor; Nocturne `#05060a` L .123 failed with a CSS star sky and a +.037 surface step.
  **Applies to** all. **Check** if L(canvas) < .134 and not #000: a canvas/video light source exists in the fold and min(surface) - canvas >= .05. **Source** modal, unkey vs nocturne [measured]

- **RULE** Edge the product window with three things: a 1px ring (white .08-.145, or .40 when the frame is lighter chrome), a light-side highlight (inset top 1px white .04-.06, a half-pixel top line at .25-.30, or a masked border spotlight), and depth only where it can show (black .25-.45 at 30-70px blur when the frame floats over a field; a canvas-coloured halo when it sits on one).
  **Why** Linear: ring .08 + masked spotlight `radial-gradient(200px 200px at 8% 0%, #000, transparent 70%)` + `0 2px 32px .25`; Raycast: `inset 0 .5px 0 rgba(255,255,255,.3)` + `0 4px 40px 8px .4`; Cursor `0 28px 70px .14` works only over its painting; Axiom halo `0 0 40px 20px <canvas>`; Zed ring .40 on L .375 chrome; Vercel AI ring .145 + outer black 1px.
  **Applies to** hero product proof. **Check** frame computed `box-shadow` contains a 0-blur 1px ring and one inset/top-light layer; any black shadow alpha >= .25 or sits over a region with block L >= .25. **Source** linear, raycast, cursor, axiom, zed, vercel/ai [measured]

- **RULE** Light a card's top edge, not its whole face: either a gradient border `background: linear-gradient(<hairline colour> 0px, <surface> 100%)` / `inset 0 1px 0 rgb(255 255 255 / .04-.06)`, or a black outer ring under a white inner ring for inputs.
  **Why** Supabase cards use `linear-gradient(oklch(.95 / .075) 0px, oklch(.215) 100%)`; Linear changelog's search input stacks `inset 0 0 0 1px white .03, inset 0 1px 0 white .04, 0 0 0 1px rgba(0,0,0,.6), 0 4px 4px .1`; Supabase buttons `inset 0 1px 0 white .04`. One light direction (top) for every surface keeps the page physically coherent.
  **Applies to** all. **Check** raised surfaces have exactly one top-light device, alpha <= .08; no bottom highlights. **Source** supabase, linear, raycast [measured]

- **RULE** Hover on dark moves lightness, not colour: inverse fills go to `#fff` or drop ΔL .06-.09; deep chromatic fills +.04 L; ghost buttons and rows multiply their white alpha by 1.5-2 (.033 -> .05, .05 -> .10, 0 -> .08); outlines go to the ink colour. Duration .1-.2s, ease-out curve.
  **Why** measured hover diffs: Linear `#e5e5e6`->`#fff` and ghost 0->.08; Vercel `#ededed`->`#ccc`, `#0a0a0a`->`#1f1f1f`; Neon `#fff`->`#c9cbcf`, border `#61646b`->`#fff`; Supabase L .436->.476 and .033->.049; Modal .05->.10; Zed .05->.10; Cursor `#26241e`->`#2b2923`. None change hue; only Resend adds a glow, and only on hover.
  **Applies to** all interactive controls. **Check** hover state ΔL in [.02, .10] or alpha ratio in [1.4, 2.2]; hue unchanged; `transition-duration` <= .2s. **Source** linear, vercel, neon, supabase, modal, zed, cursor, resend [measured]

- **RULE** Glow belongs to hover and to data, never to the resting primary button. If the CTA needs presence on dark, use an inverse fill, a deep fill with a 1px white .06-.15 ring, or a keycap/bevel built from inset light (Raycast inset top `#fff` .4px + inset bottom black .2; Zed `inset 0 -2px 0 <darker>`).
  **Why** 0/19 rest-state CTAs carry a coloured glow; Raycast's white `0 0 14px .19` is the only rest glow and is white; Resend's white glow (`.06 4px, .12 14px, .18 32px`) and its gradient pill's `blur(20px)` `::after` appear only on hover (opacity 0 at rest).
  **Applies to** landing page. **Check** resting CTA shadow layers with blur > 4px are white/black only, alpha <= .2; coloured blur layers exist only under `:hover`. **Source** raycast, resend, zed, supabase, railway [measured]

- **RULE** A bright, high-chroma CTA fill (L > .80, C > .15) with a dark label is allowed only if it is the sole saturated element above the fold, <= 10,000px² in area, on a neutral canvas (C <= .01), and the brand's other colours stay small.
  **Why** Trigger's `#a8ff53` (L .912, C .218) 214x40 lime button with `#121317` label on `#121317` canvas (C .008) reads premium at 2.3% chromatic area; Vigil's lime (L .849) failed alongside a mono -6% headline, 3D shadow and flat field. The parent note's blanket ban is too strict; the constraint is isolation, not the colour.
  **Applies to** landing page. **Check** if primary fill L > .8 and C > .15: no other element with C > .15 and area > 2,000px² in the fold; canvas C <= .01. **Source** trigger vs vigil [measured]

- **RULE** Headline on dark is solid near-white (L .93-1.0) by default; colour may enter as one tinted keyword or second line at L .74-.86 (C .14-.21), or the whole h1 as a pale tint at L .75-.80 in a light weight; gradient text only as white-to-white-alpha (end >= .5) with no hue shift.
  **Why** 17/19 h1s are solid near-white; Supabase line 2 `#4acd8b` L .76; Modal keyword `#7fee64` L .854; Zed whole h1 `lab(77.5 -6.5 -36.4)` at weight 320; the only gradient h1 is Resend `linear-gradient(to right bottom, #fff 30%, rgba(255,255,255,.5))`. No measured site uses a hue-to-hue gradient headline.
  **Applies to** landing page. **Check** h1 `background-image` gradient stops all share hue (C < .02) and end alpha >= .5; tinted spans L in [.74, .86]; at most one tinted span. **Source** supabase, modal, zed, resend + 15 solid [measured]

- **RULE** Add grain wherever a smooth dark gradient or blurred light covers > 20% of the fold, at one layer: noise SVG as `mask-image` at opacity .05-.08, or a noise tile with `mix-blend-mode: soft-light` at .03-.05 (or `multiply` .4 over a bright object); no grain on flat canvas.
  **Why** 6/19 use grain and each puts it exactly over a light region: Neon .075 noise mask on highlighted spans, Liveblocks `soft-light` .045 over the WebGL vignette, Vercel `multiply` .42 on the prism, Zed .012-.05 behind the hero gradient, Inngest `soft-light` on the page layer, Resend a texture inside the glass CTA. (Corrects the parent note's "9 of 11 use none".)
  **Applies to** landing page. **Check** if a gradient/blurred layer > 20% of fold area exists, one grain layer overlaps it with opacity <= .08 (soft-light/mask) or <= .45 (multiply); grain count <= 2. **Source** neon, liveblocks, vercel, zed, inngest, resend [measured]

- **RULE** Keep the accent out of status semantics: if the accent hue sits within 35° of a status hue (danger ~25, warning ~80, success ~150), status chips use their own hues and "info/preview" uses a neutral blue (H ~250); status chips are hue text at L .78-.82 on the same hue at .12-.14 alpha with a .20 inset ring.
  **Why** in the engine's specimen the green-black and warm/true-black palettes made "Preview" indistinguishable from "Live"/"Failed" until separated [visual, system/variety/dark-specimen.html]; measured chips follow the alpha recipe (Inngest `rgba(102,189,139,.14)` + `inset 0 0 0 1px .4`; Linear/Framer .07-.20 in the parent note). Brands with green/red accents (Supabase, Neon, Basement, Raycast) keep their accent off status chips in the fold.
  **Applies to** SaaS app UI and product-in-hero. **Check** min hue distance between accent and each status hue > 35°, or info/preview chips do not use the accent. **Source** inngest, linear, specimen [measured + visual]

- **RULE** Dark buttons and inputs read as one family: secondary = white .033-.05 fill + 1px ring .05-.10 (or a +.04-.08 L solid with a 1px darker/lighter border), primary = one of inverse / deep / glass; both share height (36-44px) and radius; the radius family is one of pill (Vercel, Cursor, Modal, Neon, Linear), 6-10px (Supabase 9.3, Railway 8, Liveblocks 8, Axiom 6, Inngest 6), 16 (Resend) or 0 (Unkey, PlanetScale).
  **Why** every measured pair shares height and radius (Vercel 40/pill, Modal 36/48, Supabase 38/9.3, Railway 58/8, Unkey 44/0, Zed 36/4); the secondary is always quieter by fill, never by size.
  **Applies to** landing page. **Check** primary and secondary heights equal, radii equal, secondary fill alpha <= .05 or ΔL <= .08. **Source** vercel, modal, supabase, railway, unkey, zed, cursor, axiom [measured]

- **RULE** Separate the white headline from a busy field with the field, not with a scrim on the text: a vignette that darkens the field behind the copy (Unkey blurred 40px radial at .9 -> .1, Liveblocks radial to #000 at 88%, Raycast stripes faded at the bottom) or, at most, `text-shadow: 0 4px 4px rgb(0 0 0 / .15)`.
  **Why** no measured site puts a box or blur panel behind its h1; the three busiest fields (Raycast 19% chroma, Unkey spread .42, Liveblocks .31) all darken the field locally and keep the h1 at WCAG 17-21:1.
  **Applies to** landing page. **Check** h1 WCAG against the darkest-to-lightest pixels behind it >= 7:1; no element with background behind the h1 except the canvas. **Source** unkey, liveblocks, raycast [measured]

- **RULE** A zero-effect dark fold (spread < .02, no product, no light) is reserved for brands whose name is the proof; client work needs either a light source or a product window.
  **Why** Vercel AI measures spread .000 and Axiom .015 (with a product frame), Linear changelog .016 (an index page). Vercel AI works because of Vercel's logo strip and authority; Vigil (spread .000, no product) was rejected as "ass".
  **Applies to** landing page hero. **Check** spread >= .08 or product frame >= 1000px wide in the fold, unless DIRECTION.md records the override with the reason. **Source** vercel/ai, axiom, vigil [measured]

- **RULE** Choose one of six bound dark recipes (`system/variety/dark-recipes.json`) per client and keep its hue through canvas, surfaces, hairlines, greys and frame shadow; do not mix a neutral grey ramp into a tinted canvas.
  **Why** every tinted site keeps hue constant: Cursor canvas H94 and surfaces H94-96; Railway canvas H292 and its frame shadow tinted; Zed borders `oklch(.266 .011 263)` on canvas H274; Modal text `#e3e5e1` tinted green. The recipes encode these as six measured families (graphite, blue-black, warm, green, plum, true black).
  **Applies to** all. **Check** every neutral token's hue within ±30° of the canvas hue when canvas C >= .008. **Source** cursor, railway, zed, modal, linear [measured]

---

## 7. Corrections to dark-mode-craft.md

1. Canvas floor L .13 is too strict: Modal L .126 and Unkey L .108 are premium (see rule above). Keep the floor for CSS-only heroes.
2. "9 of 11 sites use no grain" -> 6 of 19 use grain once the measurement includes pseudo-elements and mask-images.
3. "A bright high-chroma fill with a dark label is not used by any benchmark" -> Trigger uses `#a8ff53` with a dark label; the constraint is isolation (rule above).

## 8. Dark recipes (system/variety/dark-recipes.json)

| Recipe | Canvas | Surfaces | Ink / sub / soft | Accent | Primary | Basis |
|---|---|---|---|---|---|---|
| Graphite instrument | `#0a0a0b` L .145 | `#111212 #18191a #212222` | `#eff0f1` / `#a2a3a6` 7.9 / `#6f7074` 4.0 | `#65afff` | inverse pill | Linear, Axiom, Vercel |
| Midnight ink | `#090b12` L .151 H266 | `#101319 #181b21 #21242a` | `#f0f2f7` / `#9da3b0` 7.8 / `#6b717e` 4.0 | `#8c9bff` | inverse pill | Linear, Zed, Trigger |
| Ember walnut | `#130f0a` L .170 H68 | `#1a1612 #221e19 #2a2622` | `#f1edea` / `#aaa49d` 7.7 / `#7a736c` 4.1 | `#f96e31` | inverse pill | Cursor, Inngest, Axiom |
| Phosphor forest | `#090f0b` L .160 H152 | `#111612 #181e19 #202622` | `#ebf1ec` / `#9fa8a1` 7.9 / `#6c766e` 4.1 | `#56dc85`, deep `#046339` | deep fill | Modal, Supabase |
| Plum dusk | `#120e19` L .174 H300 | `#191620 #211d27 #292630` | `#f3f1f7` / `#a9a4b3` 7.8 / `#787383` 4.2 | `#c396f5`, deep `#584083` | deep fill | Railway |
| Void + signal | `#000` | `#0b0b0b #141414 #1c1c1c` | `#ededed` / `#a1a1a1` 8.1 / `#6d6d6d` 4.1 | `#ff5727` | inverse pill | Vercel, Resend, Basement |

Specimen: `system/variety/dark-specimen.html`, screenshot `knowledge/benchmarks/variety/dark-specimen.png`. The tiles test palette, controls, chips and the product frame; they deliberately omit a signature light object, so they are not hero references. Two fixes came from looking at the render: status chips collided with green/orange accents (now rule "accent out of status semantics"), and the warm canvas at H 80 read olive, so it moved to H 68.

## 9. Files

- Folds: `knowledge/benchmarks/dark/<site>-1440.png` (19 sites, 1440x900 @1x).
- Raw measurements: `knowledge/benchmarks/dark/<site>-1440.json` (canvas, surfaces, overlays, borders, shadows, text tiers, h1, CTAs with pseudo-elements, nav, light devices, media, noise, frames, accent use, radii).
- Open questions: hover was measured for 10 sites' hero CTAs only (not rows, inputs or focus rings); WebGL scenes vary per load; Zed served two different homepages during the session (data is from the "Your last next editor" variant); the "AI template" column is an engine synthesis, not a measured corpus.
