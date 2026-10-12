---
source: web:taxo.ai, grainient.supply (home, 6 collections, shader.grainient.supply), inspirux.com, hipandflo.com, framer.com/@basit-a-khan (15 template previews: oberion.framer.ai, fuchsia.framer.ai, greenvest, eventverse, archar, monarque, bellavista, bellevoire, archform, troscan, gaststatte, minimaline, peterkenworth, victorr, nothingdesignstudio, alienstudio), dribbble.com/BasitAkhan (32 of 96 shots)
chapter: Hero and marketing-site craft of Basit A. Khan (@basit_designs; Inspirux; Grainient): rendered light fields and grain, display type, layered buttons, cropped product framing, Framer motion grammar
pages: n/a (web; Playwright 1440x900 DPR 2, getComputedStyle, document.getAnimations(), Framer appear-animation JSON, pixel high-pass noise and colour grids)
topic_tags: [hero, saas-marketing, ai-saas, dark-mode, light-field, grain, grainy-gradient, webgl, unicorn-studio, shader, typography, tracking, serif, two-tone-headline, buttons, glass, nav, product-framing, depth-of-field, 3d-render, motion, framer, spring, stagger, benchmark, basit]
status: studied
---

# Basit A. Khan: measured craft study

Credit: everything studied here is by **Basit A. Khan** (Framer Expert, Saudi Arabia; co-founder of **Inspirux Design Studio**; founder of **Grainient**, a paid library of grainy, smooth, dithered and animated gradients plus a shader tool). The founder calls his work "incredible". We study the grammar. We never ship his assets, Grainient gradients, copy or layouts.

Evidence tags: **[M]** = measured with getComputedStyle / getAnimations / Framer appear JSON on the live page; **[P]** = measured from pixels (high-pass noise std, 0-255 luma, pixel minus 5x5 mean; 5x4 colour grids); **[V]** = read by eye from a screenshot or Dribbble image (numbers are estimates at 1440 equivalent). Captures: `knowledge/benchmarks/basit/` (see `CREDITS.md`). Tokens: `system/variety/basit-tokens.json`.

## 0. The one-paragraph answer

Basit's heroes look expensive because **the light is a rendered object, not a CSS effect**, and everything else stays plain enough to let it work. Each hero gets one full-bleed field: a WebGL grain shader (Taxo, Grainient: Unicorn Studio), a raster grainy gradient from his own Grainient library (Fuchsia's violet floor), a 3D render (glass pills, chrome objects, phones in a light beam) or a cinematic photo. The field is **one hue ramp**, lit from off-axis, grainy in the midtones (noise std 6-15) and clean in the blacks (std about 1), and it falls off to the canvas colour exactly where the copy or the product sits. On top of it: a centred skeleton, big display type tracked **-0.05em** (on 10 of 12 sites measured), sentence case, 400-500 weight for SaaS. Then 48-56px CTAs with their own light (inset white glow, a cursor-tracked radial), and a product window that starts at **48-66% of the fold** so only its top band shows, sitting in the light. Motion is Framer appear effects: lines rise 20-200px on springs (1-1.5s, bounce 0) 0.2s apart, and the field or photo arrives last, settling from scale 1.2 to 1. His product UI is ordinary (Fuchsia's hero literally shows an "Untitled UI" kit dashboard), and his template copy is generic. The premium is art direction: light, type and timing.

## 1. Sources and what was measured

| Surface | What | Evidence |
|---|---|---|
| taxo.ai (client, agentic AI for healthcare) | grain shader hero, serif display, ringed pill CTA, appear timeline | `taxo-fold.jpg`, `-s01..04`, `-full.jpg`, `frames/taxo-load-*.jpg`, `measure/taxo(-deep).json` [M][P] |
| oberion.framer.ai (AI / fintech template) | light SaaS hero with dashboard, Switzer, square purple CTA, colour-blend wash | `oberion-*`, `frames/oberion-load-*` [M] |
| fuchsia.framer.ai (dark Web3/SaaS) | violet raster floor glow, glass nav capsule, gradient-clipped headline, glass buttons, ecliptic section arcs | `fuchsia-*`, `frames/fuchsia-load-*` [M][P] |
| greenvest.framer.website (SaaS / fintech app) | avatars inside the headline, arrow pill, phone + card 3D entrance | `greenvest-*` [M] |
| grainient.supply + 6 collections + shader tool | Unicorn Studio light wave in an inset container, collection palettes, shader defaults | `grainient-*` [M][P] |
| inspirux.com, hipandflo.com, 13 more templates | wordmark heroes, photo settle, type tuples, nav grammars | `<id>-fold/full/s01`, `measure/<id>-deep.json` [M] |
| Dribbble (32 SaaS / AI / fintech / dark shots) | Lowpro, Tasker, Equals, Catalyst, MPA, Q-Chat, NoteGPT, AI app builder, Recognito, Logistics, AuraCard, GloviseAI ... | `dribbble-*.{png,jpg}` (video shots: frames at about 4.5 s and 8.5 s) [V][P] |

## 2. What makes his work special (concrete, with numbers)

1. **The light is a rendered field, one per hero.** Taxo and Grainient run Unicorn Studio scenes on a canvas (`unicornStudio.umd.js@v2.1.0`; Taxo canvas 1440x900 behind the hero, Grainient 1410x823 inside a 15px-inset r20 container) [M]. Fuchsia's glow is a full-bleed 1440x1072 PNG, not CSS [M]. Oberion washes its lower corners with a raster layer at `mix-blend-mode: color` [M]. The Dribbble SaaS heroes use 3D renders (blurred iridescent glass, chrome, a cube) or photos [V]. No hero relies on CSS radial blobs.
2. **One hue, off-axis source, falloff to the canvas.** Taxo's colour grid runs `#d9e5f5` (top right) -> `#2365a4` -> `#0a2f5f` -> `#040506`. One blue, lit from the top right, gone into black across the bottom 40%, and the CTA sits on that transition [P]. Grainient Hero Gradients V3 tiles are each one hue with a bright top band falling to near-black (copper `#621214 -> #100101`, indigo `#251262 -> #09021e`) [P]. Fuchsia does the reverse: violet rises from the bottom corners (`#614e94`) under a `#040011` canvas [P].
3. **Grain lives in the light, not in the black.** High-pass noise std: Taxo lit blue patch **14.6**, Taxo black floor **1.2**; Fuchsia glow **6.8**; Grainient "Spectral darks" **1.15-1.5**; Lowpro / Equals light fields **11-13.5** [P]. Grainient's shader-tool defaults are speed 0.3, noise strength 2 (0-10), noise density 1.5 (0.1-5), frequency 9.6, pixel density 2, FOV 45 [M].
4. **Display type is tracked -0.05em, almost everywhere.** Taxo 120px -6px; Oberion 54 -2.7; Greenvest 60 -3; Bellavista 120 -7.2 (-0.06); Archar 176 -10.57 (-0.06); Peter 150 -7.5; Gaststätte 360 -18; Alien 365 -21.9 (-0.06); Monarque 180 -9; Fuchsia 56 -2.24 (-0.04) [M]. Section h2 is 36px w500 -1.08px (-0.03em), line-height 1.0-1.1 (Fuchsia, Oberion) [M]. h1:h2 is 1.5.
5. **SaaS display is 400-500 and sentence case; campaign display mixes styles.** Oberion and Fuchsia are w500. Taxo sets "*Intelligent* healthcare": Source Serif 4 Variable 120/156 w400, the first word italic, the second roman, one line [M]. Lowpro, Tasker and Catalyst read at about 400 [V]. Headlines are sentence case ("Productivity meets possibility.", "The unified platform for billing through revenue close") [M][V].
6. **Two-tone headlines set the reading order.** Fuchsia clips `linear-gradient(110deg, #fff 38.46%, #020202 100%)` into the text, so the line fades into the dark at its end [M]. Catalyst greys its second clause, and Lowpro greys its first line and keeps the second near-black [V].
7. **Sub-copy is small and close.** Hero sub 14-16px at 300-400 weight. The gap from h1 to sub is **14-20px** (Taxo 14, Oberion 20) and from sub to CTA 30-41px. The h1:sub size ratio is 3.9 (Oberion) to 7.5 (Taxo) [M]. The headline carries everything.
8. **CTAs are 48-56px and carry their own light.** Taxo has a 56px white pill: a `rgba(255,255,255,.1)` outer ring, a white fill inset 3px, and a blue radial "glow" (blur 15px) plus a radial "stroke" that move to the pointer and grow on hover (25% -> 42.8%) [M]. Fuchsia uses 55px r10 buttons: `linear-gradient(#8b55ff, #373fe0)`, an inset `0 4px 20px rgba(255,255,255,.64)`, `backdrop-filter: blur(25.8px)`, and on hover the inset glow grows to `0 10px 30px` [M]. Every Framer template rolls the duplicated label up one line on hover [M].
9. **Nav is a floating object or a frosted bar, never a boxed strip.** Fuchsia keeps the logo free on the left, puts the links in a 629x71 capsule (r100, `rgba(0,0,0,.05)`, blur 22.7px, inset `0 4px 30px rgba(255,255,255,.18)`) 32px from the top, and leaves the CTA free on the right [M]. Taxo uses a 70px bar at `rgba(8,8,8,.7)` with blur 20px [M]. Lowpro splits into three pills (logo, links, CTA) and Catalyst joins logo and links into one capsule [V]. Oberion's bar has 1px vertical rails at the container edges [M].
10. **The product is cropped by the fold and lit from behind.** The product top sits at 531px (Oberion), 513 (Greenvest phone), 787 (Fuchsia) [M], and at about 48% (Lowpro), 57% (Equals) and 66% (Tasker) of the first viewport [V]. Width is 60-80% of the viewport. Tasker puts a white rim light behind the product's top edge (`#555` -> `#646464` band over `#040404`) [P]. Fuchsia's product is a raster with r30 and blur(35px) glass, sitting in the violet light [M]. The visible slice holds header, KPI cards and the first chart, and the bottom dissolves into the canvas [V].
11. **Depth of field does the separation on light pages.** Lowpro's iridescent pills are blurred (std 0.4 inside a shape: optically smooth) behind a pin-sharp white dashboard [P][V]. Equals floats multiplayer name chips (Martha, Ronnie, Latham) with cursors around the headline [V]. MPA puts a blurred 3D cube behind sharp glass bento cards [V].
12. **Motion is a Framer appear timeline: rise on springs, the field arrives last.** Census of 120+ appear effects: tween 0.5s `[0.44,0,0.56,1]` x15, spring 0.6s bounce 0.2 x14, spring 1.5s bounce 0 x10, spring 1s bounce 0.2 x9, spring 2s bounce 0 x7 [M]. Taxo's timeline: nav at 0s (y -80); "Intelligent" at 0.2s and "healthcare" at 0.4s (y 120, spring 1.2s); sub at 0.8s; CTA at 1.0s; the WebGL holder at **1.5s, scale 1.2 -> 1 over 1.5s** [M]. Hero photos settle from scale 1.2 (1.4 on Archar) over 1.5-2s on 7 sites [M]. Logo marquees run at about 90-100px/s [M].
13. **Surfaces in dark are lit from inside.** Fuchsia cards use `inset 0 6px 25px rgba(255,255,255,.1)` x20 with no drop shadow [M]. Grainient cards use a 0.5px top highlight `inset 0 .5px .5px rgba(255,255,255,.4)` plus a stacked dark drop (0 70/30 .05, 0 40/25 .25, 0 20/20 .25, 0 5/10 .35) [M]. On light pages Victor tints a 4-layer drop with the object hue (`rgba(255,129,19, .02/.08/.14/.17)`) [M].
14. **Radii come from a short, round ladder: 5 / 10 / 15 / 20 / 30 / 50.** Fuchsia: 15 x23, 50 x10, 10 x9, 30 product. Grainient: 5, 15, 8, 50, 10, 20 [M]. Buttons are either a full pill or r10.
15. **Honest limits.** His template copy is generic and sometimes broken: "Pricings", "STUDO", a sub-paragraph split mid-word ("eff / ortlessly"). The logos and testimonials are placeholders, and Fuchsia's product is an Untitled UI kit [M][V]. We take his light, type, framing and timing. We do not take his proof or copy habits (engine principle 4).

## 3. Visual grammar

### 3.1 Type
- **Families:** one per site, or one display + one UI. SaaS: Inter / Inter Display, Switzer, Geist, SF Pro Rounded. Campaign and brand: Source Serif 4 (low-contrast text serif at display size), Instrument Serif, Funnel Sans 300, Aboreto, PP Mori [M].
- **Tuples:** SaaS h1 54-60px, line 1.0-1.2, w500, -0.05em. Campaign h1 120/156 w400 -0.05em, italic + roman. Wordmark h1 120-365px, line 0.76-0.9, -0.05 to -0.06em. h2 36 / 1.0-1.1 / w500 / -0.03em. Sub 14-16 / 1.4 / w300-400. Eyebrow 12px w300-400 [M].
- **Case:** sentence case on SaaS heroes, all caps only on wordmark/brand heroes (BUILT DIFFERENT, DISCOVER BELLAVISTA) [M].

### 3.2 Light and colour
- **Canvas:** `#080808` (Taxo), `#040011` (Fuchsia, violet-black), `#000` (Grainient), `#101012` (Inspirux), `#f7f5f3` (Oberion, warm off-white) [M].
- **Field coverage:** 40-100% of the fold is lit (Taxo's top 60% is saturated blue). This is the "coloured field is the signature visual" exception in `dark-mode-premium.md` (rule at line 255), not a contradiction of the 3% rule. Accent elsewhere stays tiny: one CTA, one dot.
- **Recipe:** one hue ramp from near-white to the canvas colour, a source off-axis (top right, bottom corners), falloff before the reading zone, grain at midtone std 6-15 that is about 0-2 in black.

### 3.3 Depth
- Dark: inset white glows (10-18%) and 0.5px top highlights; one stacked 4-layer drop on floating cards; glass (`backdrop-filter` 20-35px) on nav, eyebrow and secondary buttons [M].
- Light: depth of field (blurred 3D field, sharp product), and tinted multi-layer drops [V][M].

### 3.4 Composition
- Centred SaaS stack: eyebrow pill -> h1 (2 lines) -> sub (1-2 lines) -> two CTAs -> product cropped by the fold. Variants: a split with a tilted 3D device (Catalyst), an inset framed stage (Grainient 15px gutter r20; MPA about r40; Tasker's page as a card on a photo), and wordmark editorial heroes (Archar, Monarque, Gaststätte) [M][V].

### 3.5 Motion (measured)
See `system/variety/basit-tokens.json` `motion`. Order: nav -> eyebrow -> headline lines -> sub -> CTAs -> product or field. 0.1-0.2s stagger, rise 20-200px, springs with bounce 0 for big moves and 0.2 for small UI, and the field or photo last with a scale settle from 1.2.

## 4. Hero patterns (strongest six)

1. **Grain-field campaign hero:** a full-bleed one-hue WebGL grain field, a centred serif headline (italic + roman, 120px, -0.05em), one ringed pill CTA, no product. `taxo-fold.jpg`, `frames/taxo-load-{300,700,1200,2000}.jpg`.
2. **Centred stack + cropped product in a lit floor (dark):** violet or white light rising behind the product's top edge, with only the top band of the window in the fold. `fuchsia-fold.png`, `dribbble-tasker-landing-page-design.jpg`, `dribbble-fuchsia-landing-page-design.jpg`, `dribbble-notegpt-ai-for-meeting-notes.png`.
3. **Light depth-of-field hero:** a blurred iridescent 3D or mesh field behind a pin-sharp white dashboard, with a two-tone headline. `dribbble-lowpro-landing-page-design.jpg`, `dribbble-saas-product-landing-page-redesign.jpg`, `dribbble-fintech-landing-page-design.png`, `oberion-fold.png`.
4. **Object-in-a-beam split:** left copy, and one 3D device or object tilted 25-35 degrees inside a light beam. `dribbble-catalyst-landing-page-design.jpg`, `dribbble-ai-based-infrastructure-web3-landing-pag.jpg`, `dribbble-auracard-landing-page-design.jpg`.
5. **Framed stage:** the hero lives in an inset rounded panel (15px gutter, r20-40) with the light inside it. `grainient-fold.jpg`, `dribbble-landing-page-redesign-for-mpa.jpg`.
6. **Giant wordmark over a settling image (brand):** 176-365px type, line 0.76-0.9, -0.05 to -0.06em, photo from scale 1.2 to 1. `archar-fold.jpg`, `monarque-fold.jpg`, `gaststatte-fold.jpg`, `alien-fold.png`.
- Also seen: the **AI input hero** (Q-Chat: "Ask anything!" headline, a single input with a Continue button, a phone below), `dribbble-q-chat-landing-page-design.jpg`.

## 5. What separates his heroes from ours (honest comparison)

Same probes on `reports/<name>/desktop-fold.png`, and the extra block `engine_gap_2026_10_11` in the tokens file.

| | Basit | Quillwork (rejected "dogshit") | Weekline | Halyard ("not bad for uniqueness") |
|---|---|---|---|---|
| Light | one rendered field, 40-100% of the fold, one hue, off-axis | faint lamp vignette; the paper does the lighting | flat `#0a0a0b`, haze above product `#0f1114 -> #13171c` (4 levels) | none; the pixel service map is a diagram |
| Grain | midtone std 14.6, black 1.2 | std **16 on near-black** `#1a1510` (dirt), floor 1.15 | 0 | dot grid 4.6 |
| h1 | -0.05em, 400-500, sentence case, serif = low-contrast text serif | Bodoni Moda 84px w500 -0.025em Title Case, a costume Didone | Host Grotesk 68 w400 -0.035em | Instrument Sans 60 w500 -0.032em |
| Object / product | none, a real render, or a cropped real-looking window in the light | a flat cream rectangle, tilted, with grey placeholder bars (wireframe) | full calendar starting at 585px, no edge light | a three-region workspace below a diagram (too much product) |
| CTA | 48-56px, inset light or cursor-tracked glow | an app-tile "Download for Mac" card button | plain 44px pills [V] | mono caps 42px white block |
| Motion | lines rise 120px on a 1.2s spring; the field arrives at 1.5s with a scale settle | n/a | kit T timeline (good), but no field to arrive | n/a |

What this means: **Weekline is the right skeleton with no light.** Quillwork had the right instinct (one lit object, grain), but the grain sat in the black, the light was too weak to be a scene, the object was a placeholder and the Didone read as costume. Halyard's density and dev-tool grammar are the opposite of his register. The fastest gain is to give the Weekline / Kestrel skeleton a Basit field, then crop and backlight the product.

## 6. Rules

- **RULE** BA-01 Give every hero exactly one rendered light field (a WebGL shader plane, a pre-rendered grainy gradient image, a 3D render or a photo) that covers 40-100% of the fold; never build the hero light from CSS radial blobs.
  **Why** Taxo and Grainient run Unicorn Studio canvases, Fuchsia a 1440x1072 PNG, Lowpro, MPA and Catalyst 3D renders; no measured hero uses CSS blobs [M][V].
  **Applies to** heroes (dark and light). **Check** the hero has a canvas, video or a background img >= 70% of the fold width; no element with a radial-gradient + blur > 40px is the main light. **Source** taxo.ai, grainient.supply, fuchsia.framer.ai, Dribbble Lowpro / Catalyst / MPA

- **RULE** BA-02 Build the field from one hue ramp (near-white highlight -> saturated mid -> canvas colour), lit from off-axis, and let it fall to the canvas colour before the reading zone or the product.
  **Why** Taxo's grid runs #d9e5f5 -> #2365a4 -> #0a2f5f -> #040506, top right to bottom left; Grainient V3 tiles are single-hue top-to-black [P].
  **Applies to** heroes. **Check** sample a 5x4 grid of the fold: one hue family (OKLCH hue spread <= 30 degrees excluding neutrals); the brightest cell is in a corner or edge band, not behind the h1. **Source** taxo.ai, grainient.supply collections

- **RULE** BA-03 Put grain in the light, not in the black: midtone high-pass noise std 6-15 (0-255 luma), black areas <= 2.
  **Why** Taxo lit patch 14.6 vs floor 1.2; Fuchsia glow 6.8; Spectral darks 1.15-1.5. Quillwork's 16 on near-black #1a1510 reads as dirt [P].
  **Applies to** any grain or noise texture. **Check** run measure/grain-analysis-style high-pass on a lit patch and a black patch of the fold. **Source** taxo.ai, fuchsia.framer.ai, grainient.supply; reports/quillwork

- **RULE** BA-04 Track display type at -0.05em (allow -0.04 to -0.06em) from 54px up; section h2 at -0.03em.
  **Why** 10 of 12 measured display headlines sit at -0.05 to -0.06em (Taxo 120/-6, Oberion 54/-2.7, Bellavista 120/-7.2, Archar 176/-10.57); h2 36/-1.08 on Fuchsia and Oberion [M]. Ours run -0.025 to -0.035em.
  **Applies to** hero and section headlines. **Check** letter-spacing / font-size of h1 in [-0.06, -0.04]; of h2 about -0.03. **Source** 12 Basit sites

- **RULE** BA-05 Set SaaS hero headlines at 400-500 weight, 54-80px, two lines, line-height 1.0-1.2; keep 600-900 for wordmark and brand heroes.
  **Why** Oberion and Fuchsia w500 at 54-56; Lowpro, Tasker and Catalyst read at about 400; the 600-900 weights appear only on portfolio and brand wordmarks [M][V].
  **Applies to** SaaS heroes. **Check** h1 weight 400-500 and size 54-80 at 1440; 2 rendered lines. **Source** oberion, fuchsia, Dribbble SaaS shots

- **RULE** BA-06 When a serif carries a SaaS or AI hero, use a low-contrast text serif at display size (Source Serif 4, Instrument Serif class) and make the move with style (one italic word + roman), not with a high-contrast Didone.
  **Why** Taxo: Source Serif 4 Variable 120/156 w400 -0.05em, "Intelligent" italic + "healthcare" roman [M]; Quillwork's Bodoni Moda was rejected.
  **Applies to** campaign and editorial heroes. **Check** serif h1 family is not a Didone (Bodoni, Didot, Playfair) unless DIRECTION.md overrides; italic used on <= 1-2 words. **Source** taxo.ai; ledger 2026-10-10-quillwork

- **RULE** BA-07 Give the headline a reading order with value: either a gradient clip that fades the line into the canvas at its end, or one clause / line set at 45-60% value.
  **Why** Fuchsia clips linear-gradient(110deg, #fff 38.46%, #020202 100%) [M]; Catalyst greys its second clause, Lowpro its first line [V].
  **Applies to** heroes (optional, one per page). **Check** h1 contains spans of two colours, or background-clip:text with a 2-stop gradient; the lighter part is >= 4.5:1 against the field behind it. **Source** fuchsia.framer.ai, Dribbble Catalyst, Lowpro

- **RULE** BA-08 Keep the sub-copy small and close: 14-16px at 300-400 weight, 14-20px under the h1, 30-41px above the CTAs; h1:sub size ratio >= 3.5.
  **Why** Taxo 16/22.4 w300 at a 14px gap (ratio 7.5); Oberion 14/19.6 w400 at 20px (ratio 3.9); sub to CTA 30-41px [M].
  **Applies to** heroes. **Check** computed gaps h1->sub and sub->CTA; h1 size / sub size >= 3.5. **Source** taxo.ai, oberion, fuchsia

- **RULE** BA-09 Make hero CTAs 48-56px tall (taller than the nav buttons) with one filled and one quiet button.
  **Why** Taxo 56, Fuchsia 55, Oberion 49, Greenvest 48; nav buttons 38-49 [M]. Our heroes sit at 42-44px.
  **Applies to** hero CTAs. **Check** hero CTA height 48-56 and > nav CTA height. **Source** taxo, fuchsia, oberion, greenvest

- **RULE** BA-10 On dark, the primary button carries its own light: a ring + inset fill construction, or an inset white glow (0 4px 20px at 18-64%), or a cursor-tracked radial; never an outer coloured glow at rest.
  **Why** Taxo: rgba(255,255,255,.1) ring + 3px-inset white fill + blue radial glow (blur 15px) that follows the pointer; Fuchsia: inset 0 4px 20px rgba(255,255,255,.64) on a #8b55ff -> #373fe0 fill [M].
  **Applies to** dark CTAs. **Check** primary has >= 2 painted layers or an inset box-shadow; box-shadow at rest has no outer spread in a chromatic colour. **Source** taxo.ai, fuchsia.framer.ai

- **RULE** BA-11 Hover moves light or text, not colour: the label rolls up one line, the glow follows the pointer or grows, or the fill scales to 1.05; a halo ring (0 0 0 5px at 20% accent) is the strongest allowed.
  **Why** every Framer template duplicates the label for a roll; Taxo's radial grows 25% -> 42.8%; Oberion's fill scales 1.05; Grainient adds a 5.18px 20% lime ring [M].
  **Applies to** buttons. **Check** hover diff touches transform, background-position/size or inset shadow, not the fill hue. **Source** taxo, oberion, grainient, greenvest

- **RULE** BA-12 Float the nav: either a frosted full-width bar (rgba(canvas,.7) + blur 20px) or segmented pills (logo, link capsule, CTA as separate objects, the capsule glass with an inset white glow); never a boxed, bordered strip.
  **Why** Taxo 70px bar rgba(8,8,8,.7) blur 20; Fuchsia capsule 629x71 r100 rgba(0,0,0,.05) blur 22.7 inset 0 4px 30px rgba(255,255,255,.18), 32px from the top; Lowpro three pills [M][V].
  **Applies to** marketing navs. **Check** nav background alpha < .8 with backdrop-filter, or the links sit in a capsule separate from the logo and CTA; no 1px border around the whole nav. **Source** taxo, fuchsia, Dribbble Lowpro / Catalyst

- **RULE** BA-13 Crop the hero product with the fold: its top edge at 48-66% of the first viewport, width 60-80% of the viewport, so only the header, KPI row and first chart show; dissolve its bottom into the canvas.
  **Why** Oberion top 531px, Greenvest 513, Fuchsia 787 [M]; Lowpro about 48%, Equals 57%, Tasker 66% [V]; widths 1100-1150 of 1440. Founder on Halyard: "nobody shows that much product".
  **Applies to** product heroes. **Check** product.top / 900 in [0.48, 0.66]; product.width / 1440 in [0.6, 0.8]; a mask or overlay gradient on its lower edge. **Source** oberion, fuchsia, greenvest, Dribbble Lowpro / Equals / Tasker

- **RULE** BA-14 Put the product in the light: the field's brightest band sits behind or just above the product's top edge (a backlight or rim), and in dark the window takes the field's hue.
  **Why** Tasker's white rim rises behind the dashboard (#555 -> #646464 over #040404) [P]; Fuchsia's violet floor holds the window [P]. Weekline's product has no light at all.
  **Applies to** product heroes. **Check** the 40px band above the product's top edge is >= 6 L* brighter than the canvas; product surfaces share the field hue (hue delta <= 20 degrees). **Source** Dribbble Tasker, fuchsia.framer.ai

- **RULE** BA-15 On light pages, separate product and field by depth of field: the field (3D shapes, mesh, iridescence) optically blurred and saturated at the edges, the product pin-sharp and white.
  **Why** Lowpro's glass pills are smooth inside (std 0.4) behind a sharp dashboard; Equals and the AI app builder use pastel meshes behind crisp UI [P][V].
  **Applies to** light SaaS heroes. **Check** the field layer has blur >= 20px or is a pre-blurred render; product text renders crisp (no filter). **Source** Dribbble Lowpro, Equals, AI app builder

- **RULE** BA-16 Show one product view at hero scale, and accept a standard, clean dashboard; spend the effort on the light and the framing, not on more panels.
  **Why** Oberion, Lowpro and Equals show sidebar/header + 3-5 KPI cards + one chart; Fuchsia ships an Untitled UI kit raster [M][V]; matches the founder's "show one view" rule.
  **Applies to** product heroes. **Check** visible product regions <= 3, components <= 12 (see the founder rule from Halyard). **Source** oberion, fuchsia, Dribbble Lowpro / Equals

- **RULE** BA-17 Tilt only real 3D objects (phone, card, laptop) and only 25-35 degrees inside a light beam; keep dashboards flat.
  **Why** Catalyst, Logistics, Recognito and AuraCard tilt rendered devices into a beam; every SaaS dashboard hero is flat [V]. Quillwork tilted a flat paper rectangle and read as a placeholder.
  **Applies to** object heroes. **Check** transform rotate on a product window = 0; any tilted element is a device render or a 3D-styled object with its own lighting. **Source** Dribbble Catalyst, Logistics, Recognito, AuraCard

- **RULE** BA-18 Choose the inset framed stage when the light needs edges: the hero sits in a rounded panel 15px (up to 120px on concept shots) from the viewport, r20-40, with the field inside it.
  **Why** Grainient: 1410x823 container at a 15px inset, r20, linear-gradient(#000, #141414) with the Unicorn wave inside [M]; MPA about r40 [V].
  **Applies to** heroes with a strong field. **Check** the hero container has border-radius 20-40 and a margin 12-24px from the viewport edge at 1440. **Source** grainient.supply, Dribbble MPA, Tasker

- **RULE** BA-19 Light dark surfaces from inside: cards get an inset white glow (0 6px 25px at 10%) or a 0.5px top highlight plus one stacked 4-layer dark drop; no grey borders as the only edge.
  **Why** Fuchsia cards inset 0 6px 25px rgba(255,255,255,.1) x20; Grainient inset 0 .5px .5px rgba(255,255,255,.4) + 0 70/30 .05, 0 40/25 .25, 0 20/20 .25, 0 5/10 .35 [M].
  **Applies to** dark cards and panels. **Check** dark card box-shadow contains an inset white layer. **Source** fuchsia.framer.ai, grainient.supply

- **RULE** BA-20 On light pages, tint a floating object's drop shadow with its own hue in 4 stacked layers (about 4/10, 18/18, 40/24, 72/29 at .17/.14/.08/.02).
  **Why** Victor: 0 72px 29px rgba(255,129,19,.02), 0 40px 24px .08, 0 18px 18px .14, 0 4px 10px .17 [M].
  **Applies to** light-page floating objects. **Check** the shadow colour hue matches the object's fill. **Source** victorr.framer.website

- **RULE** BA-21 Use a round radius ladder: 10 or full-pill buttons, 15-20 cards, 20-30 product frames, 50 chips; do not mix in 6/8/12 Tailwind defaults.
  **Why** Fuchsia 15 x23, 50 x10, 10 x9, 30 product; Grainient 5/15/8/50/10/20; Greenvest 20/50/30 [M].
  **Applies to** marketing pages. **Check** radius histogram's top 4 values fall in {5, 10, 15, 20, 30, 50, pill}. **Source** fuchsia, grainient, greenvest

- **RULE** BA-22 Animate the hero as a Framer appear timeline: nav at 0s, eyebrow at 0.1-0.2s, headline lines 0.2s apart rising 20-120px on a 1.0-1.2s spring with bounce 0, sub at 0.6-0.8s, CTAs at 0.8-1.1s, and the product or field last at 1.2-1.8s.
  **Why** Taxo 0 / 0.2 / 0.4 / 0.8 / 1.0 / 1.5 s; Fuchsia 0 / 0.1 / 0.4 / 0.9 / 1.1 / 1.3 / 1.7 s; Oberion 0 / 0.2 / 0.6 / 0.8 / 1.0 / 1.2 s [M].
  **Applies to** hero load-in. **Check** filmstrip at 0.3/0.7/1.2/2.0 s: type first, field or product visible only from about 1.2 s. **Source** taxo, fuchsia, oberion appear JSON

- **RULE** BA-23 Let the field or hero photo arrive last with a scale settle: opacity 0 -> 1 and scale 1.2 -> 1 (1.4 for a portrait photo) over 1.5-2 s on a spring with bounce 0.
  **Why** Taxo WebGL holder scale 1.2, delay 1.5 s, 1.5 s spring; Archform, Bellevoire, Hip&Flo and Bellavista photos 1.2 -> 1 over 1.5-2 s; Archar 1.4 [M].
  **Applies to** heroes with a field or photo. **Check** the field layer's first frame transform scale >= 1.15 and it settles by <= 3.5 s. **Source** taxo, archform, bellevoire, hipandflo, bellavista, archar

- **RULE** BA-24 Rise headline lines through a mask by a large distance (about 1x the line height: Taxo 120px for 156px lines), not a 10px nudge.
  **Why** Taxo y 120 per word; Nothing y 200 per line; the 700 ms frame shows Taxo's words clipped mid-rise [M].
  **Applies to** campaign and wordmark heroes. **Check** headline line containers have overflow clip and the initial y >= 0.6 x line-height. **Source** taxo.ai, nothingdesignstudio, frames/taxo-load-700.jpg

- **RULE** BA-25 Small UI elements spring with a little bounce (0.2, 0.4-0.6 s); big moves and fields use bounce 0; colour and opacity tweens use [0.44, 0, 0.56, 1] at 0.5 s.
  **Why** census: spring 0.6 s bounce 0.2 x14 (Victor UI), spring 0.4 s bounce 0.2 on Oberion CTAs, spring 1.5-2 s bounce 0 on images x17, tween 0.5 s [0.44,0,0.56,1] x15 [M].
  **Applies to** all motion. **Check** motion tokens in the build: bounce > 0 only on elements < 200px. **Source** appear JSON across 17 sites

- **RULE** BA-26 Re-light each dark section with the same field language (an eclipse arc, a horizon glow, a light ribbon) instead of leaving later sections as flat black.
  **Why** Fuchsia re-lights the features, pricing and CTA sections with planet-horizon arcs (Grainient "Ecliptic"); Taxo's security card reuses the hero's blue grain [V].
  **Applies to** dark landing pages. **Check** every second dark section has one lit element from the hero field family. **Source** fuchsia-full.jpg, taxo-full.jpg

- **RULE** BA-27 Keep his visuals, not his proof: no placeholder logos, invented user counts, fake ratings or typo-ridden template copy, even when copying the composition of a Basit-style hero.
  **Why** his templates ship "1.5M Creators ... already joined!", "Rated 4.7/5", generic logo rows and typos ("Pricings", "STUDO") [M]; engine principle 4 forbids invented proof.
  **Applies to** all builds. **Check** every number and logo in the hero is labelled sample or real; copy passes tools/thresholds.json clichés. **Source** fuchsia, greenvest, nothing; CLAUDE.md principle 4

## 7. Numbers & scales

See `system/variety/basit-tokens.json` for the full set: type tuples per site, light-field recipes (Taxo grid, Fuchsia floor, Grainient collections and shader defaults), six button recipes, nav shells, product framing, radius histograms, shadows, the appear census and the Taxo timeline, spacing, and our gap numbers.

## 8. Exceptions & judgement calls

- **Title Case vs sentence case.** The founder rule (founder-taste.md) says hero headlines are Title Case. Basit's SaaS heroes are sentence case. The founder rule wins until he says otherwise; the -0.05em tracking, weight and field rules apply either way. [engine note]
- **3% chroma rule.** `dark-mode-premium.md` already exempts a coloured field that is the signature visual. A Basit field qualifies only if it is a rendered scene (shader, raster, render) with one hue and grain. A CSS blob never qualifies.
- **Product density.** His cropped, standard dashboards suit the founder's latest rule ("show one view"). They do not lower the bar for product craft set by Marcel, Rico and Attio. Crop more, but what shows must still be Kargul-grade.
- **WebGL cost.** Unicorn Studio fields cost GPU time and need a static poster for reduced motion and low-power devices. Use a pre-rendered grain image when the field does not need to move. [engine note]

## 9. Captured files

`knowledge/benchmarks/basit/` (149 files): `<site>-fold.(png|jpg)` (2x), `<site>-s01..s04.jpg` (2x), `<site>-full.jpg` (1x), `frames/<site>-load-{300,700,1200,2000}.jpg`, `dribbble-*.{png,jpg}` (32 shots), `measure/*.json`. URL per file: `CREDITS.md`.

## 10. What could not be measured

- X / Twitter and Instagram need a login: not visited. Behance was not checked.
- Dribbble shots are images or video frames: their type and spacing are estimates [V]; the full motion of video shots was not frame-stepped.
- Unicorn Studio scene parameters (Taxo, Grainient) are inside the remote scene JSON; the field was measured from pixels instead. Grainient's own gradient files are paid and were not downloaded.
- Taxo's FAQ and some scroll-triggered sections did not render in the headless full-page capture; Taxo's cookie banner shows in its full capture (nothing was accepted).
- Fuchsia template ("Fuchsia" on the marketplace) is not listed for sale; the live site was studied.
