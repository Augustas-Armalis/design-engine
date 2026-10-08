---
source: web:teardowns (38 live sites, measured)
chapter: Measured teardowns of SaaS / AI-SaaS marketing sites and studio sites
pages: n/a (live web, measured 2026-10-08)
topic_tags: [teardown, typography, spacing, layout, nav, cta, radius, shadow, color, motion, hero]
status: studied
---

# Measured teardowns (per-site data)

Companion file: `teardown-synthesis.md` (medians, ranges, signature-move catalogue). Re-measure with `teardown-measure.js` (Playwright; usage in the synthesis, section 7).

## 0. Method and caveats (read first)

- **Date measured: 2026-10-08.** Sites change weekly. Treat every number as a dated sample, not a constant.
- **How:** headless Chromium (Playwright, Chrome-for-Testing 1243), viewport 1440x900, DPR 1, reduced-motion off, desktop Chrome UA. Page loaded, `networkidle` (15s cap) + 2.5s, scrolled the full page in 700px steps to trigger lazy content, back to top, then `getComputedStyle` on live DOM. All CSS responses captured and regex-analysed (durations, easings, `@font-face`, `:root` variables, feature use). Viewport re-measured at 1920, 1024, 390 for h1 size and nav height.
- **Measured vs inferred:** every number below is read from computed style or captured CSS. Hero *class* and "why distinctive" are my judgement from a 1440x900 screenshot + the data (marked `[engine note]` where interpretive).
- **Known noise:**
  - Cookie banners were present on most sites (not dismissed; clicking consent is out of scope). They do not affect computed type/space but do appear in screenshots.
  - IP geo: Stripe redirected to `/en-lt`. Content/CTAs may differ by locale.
  - "Section padding" = CSS `padding-top/bottom` where set; many sites pad via inner wrappers or margins, so I also report **effective** top gap (section top to first content) as `eff`.
  - `nav` height is the outermost fixed/sticky ancestor of the header. Where an announcement bar lives in the same wrapper it is included and flagged (Attio 116, Ramp 102, Loom 150, Pitch 124).
  - App-first homepages (Perplexity, OpenAI, v0) are a chat/prompt UI, not a marketing page; included for contrast, excluded from the "marketing" medians where noted.
  - Resn and Lusion are WebGL-first: almost no DOM text, so type data is thin.
  - Height.app refused the connection (product shut down); excluded. Raycast and Cal nav height not detected (floating/Framer structures).
  - `h1` can be a visually-small SEO/eyebrow element; I corrected the "hero headline" where the visible headline was a different node (Arc, Descript, Replicate, Lovable) and say so.
- Units: px at 1440 unless stated. `ls` in em = letter-spacing / font-size. `lh` as a ratio of font-size. Radius `pill` = 9999px or larger.

Legend for the compact blocks: **H1** size/weight/lh/ls/family. **H2** typical section heading. **Lede** hero paragraph. **Nav** height, position, structure. **CTA** primary hero button height, radius, fill, label size/weight. **Box** container content width, section padding, grid. **Surface** bg, radius, border, shadow. **Motion** most common CSS transition durations and easings. **Class** = hero class (product proof | campaign | editorial | interactive | prompt-as-hero).

---

## 1. SaaS / AI-SaaS sites

### Linear (linear.app)
- **Class:** product proof (app UI slab under a two-line left-aligned headline). Dark.
- **H1** 64px / 510 / lh 1.0 / ls -0.022em (-1.408px) / Inter Variable. At 1024: 56px, at 390: 38px, 1920: 64px (capped).
- **H2** 48px / 510 / lh 1.0 / ls -0.022em; section headings are `text-wrap: balance`.
- **Lede** 15px / 400 / lh 1.6 (24px) / ls -0.011em, colour `rgb(138,143,152)`, column 505px.
- **Nav** 73px (72 + 1px border), `position: fixed`, transparent bg + `backdrop-filter: blur(20px)`, `border-bottom: 1px solid rgba(255,255,255,.08)`. Links 13px/400. Content spans x=71..1361. 8 items: Product, Resources, Customers, Pricing, Now, Contact, Log in, Sign up.
- **CTA** (header) "Sign up": 32px tall, pill, fill `rgb(229,229,230)` text `rgb(8,9,10)`, 13px/510. Inverted-contrast pill, no brand colour.
- **Box** `--homepage-max-width: calc(1344px + outer padding*2)`; h1 container 1344. Feature sections: **padding 128/128**, each section ~1226-1232px tall (four "chapters" of near-identical height: 1226, 1229, 1232, 1220). Radius tokens: 4, 6, 8, 12, 16, 24, 32, 9999, 50%.
- **Surface** bg `#08090a` (45% of area), cards `rgb(15,16,17)` (34%). Text ramp: `rgb(247,248,248)` / `rgb(208,214,224)` / `rgb(138,143,152)` / `rgb(98,102,109)`. Borders `1px solid rgba(255,255,255,.08)` (61 elements), `.12` for emphasis. Cards radius 12 (8-16). Shadows: `0 0 0 1px rgba(0,0,0,.2)`, `0 2px 32px rgba(0,0,0,.25)`, inset `0 0 12px rgba(0,0,0,.2)`.
- **Type system:** Inter Variable (weights 300/400/510/590 — non-standard variable steps) + Berkeley Mono for code/IDs; loads Tiempos Headline (serif) for accents. 14 distinct sizes: 10,11,12,13,14,15,16,18,20,24,32,48,64,72. Body base is 15px/13px, smaller than the web median.
- **Motion:** 160/200/120/150/300ms; `ease-out` x129, `cubic-bezier(.32,.72,0,1)` x9; 109 keyframes, view-transition, 314 mask-image uses, 177 color-mix, 52 `@property`.
- **Distinctive:** a UI-dense, quiet dark page where the *product* provides all the ornament; headline weight 510 (not 600+), lh 1.0, lowest-luminance bg with hairline white-8% borders instead of shadows.

### Vercel (vercel.com)
- **Class:** editorial / geometric (small left headline, large black triangle, right-column spec list). Light.
- **H1** 64px / 400 / lh 1.0 / ls **-0.06em** (-3.84px) / Geist Sans. 390: 48px.
- **H2** 56px / 450 / lh 1.0 / ls -0.06em (-3.36px).
- **Nav** 64px, sticky, transparent, no border, 14px/400. Content x=16..1416 (wider than content grid). Items: Products, Resources, Enterprise, Pricing, Get a Demo (white, 6px radius), Log In, Sign Up (black, 6px).
- **CTA** hero: 40px, **pill** (radius full), 16/500; black fill white text + white fill black text pair ("Deploy now", "Talk to sales").
- **Box** max-w 1448 with 24px padding = 1392 content; 12-col grid gap 20-24px; sections separated by `mt-40` (160px) rather than padding. Container tokens 20rem / 401 / 601 / 961 / 1200 / 1400.
- **Surface** bg `#fafafa`, text `rgb(23,23,23)` / `rgb(77,77,77)` / `#666`. Border `1px #ebebeb`. Radius 6 (controls), 12, pill. Shadow stack `0 0 0 1px rgba(0,0,0,.08), 0 1px 1px rgba(0,0,0,.02), ...` (ring + micro-drops).
- **Type system:** Geist Sans + Geist Mono + Geist Pixel (Square/Grid/Circle, used for display glyphs). Only 7 distinct sizes.
- **Motion:** 150/200/100/250/300; `ease-out`, `cubic-bezier(.4,0,.2,1)`. 36 clip-path, 5 `@starting-style`.
- **Distinctive:** the heaviest tracking in the set (-0.06em) on a *regular*-weight headline, and a one-colour geometric mark as the hero image. Almost no copy above the fold.

### Stripe (stripe.com, /en-lt)
- **Class:** campaign (WebGL gradient ribbon canvas) with long statement headline. Light.
- **H1** 48px / **300** / lh 1.15 / ls -0.02em (-0.96px) / sohne-var; spans 959px (4 lines of a paragraph-length headline, last clause in a different colour). 390: 34px.
- **H2** 32px / 300 / lh 1.1 (-0.02em) for subsections; 56px/300 for big statements.
- **Lede** 18px/300, lh 1.4.
- **Nav** 76px, `position: relative` (not sticky at top), 14px/400. Items: Products, Solutions, Developers, Resources, Pricing, Sign in, Contact sales. "Contact sales" button 40px, radius 4px, `#533afd`.
- **CTA** hero "Get started": 48px, **radius 4px**, fill `#533afd`, 16/400, padding 15.5/24. Secondary "Sign up with Google": 48px, white 65% bg with `1px solid #b9b9f9`.
- **Box** hero container 1232 inside a 1266 `section-container` (16px side pad). Section **eff padding 80-96** top and bottom. Grids 4col/3col with 10-14px gaps for card tiles.
- **Surface** bg white; navy `rgb(13,23,56)` sections (16% area); cool grey card `rgb(229,237,245)`. Ink `rgb(6,27,49)`, secondary `rgb(80,97,122)`, tertiary `rgb(100,116,141)`. Links/accents `#533afd` (`--hds-color-core-brand-600`; full 25-700 ramp with alpha variants). Radius 4/6 (81 each) – small. Border `1px #e5edf5`; dashed `1px #362baa` for diagram accents.
- **Shadow recipe:** `rgba(50,50,93,.25) 0 30px 45px -30px, rgba(0,0,0,.1) 0 18px 36px -18px` (the classic "bluish lift": negative spread, tinted `50,50,93`) and `rgba(23,23,23,.08) 0 15px 35px`.
- **Type system:** sohne-var (variable 1-1000) + Source Code Pro; heading tokens `--hds-font-heading-*` carry size/weight/lh/ls per step; lh 1.2 for small headings.
- **Motion:** 300ms (50x), 150/500/200; `cubic-bezier(.25,1,.5,1)` x40 (strong ease-out). `--navigation-duration: 240ms`. Scroll-timeline CSS present (7).
- **Distinctive:** light (300) weight display type at body-like size; one tinted shadow recipe reused everywhere; saturated indigo only on actions; hero image is a custom WebGL gradient, not a screenshot.

### Raycast (raycast.com)
- **Class:** campaign (diagonal red 3D-ish light stripes on near-black), centered headline, tiny download CTA. Dark.
- **H1** 64px / 600 / lh 1.1 (70.4px) / ls normal / Inter, centered, column 540px. 390: 36px.
- **H2** 20px/500 (feature labels are small; the page uses small headings + big imagery).
- **Lede** 18px/400, ls +0.011em (0.2px), column ~786px.
- **Nav** floating bar (not detected as full-width; screenshot shows a bordered inset pill bar). Links ~14px.
- **CTA** "Download" 36px, **radius 8px**, fill `#e6e6e6`, text `#2f3031`, 14/500, padding 8/12.
- **Box** hero text 818 max with 16px pad. 2-col grids gap 24. 
- **Surface** bg `#07080a` (`--grey-900`); grey ramp 50-900: `#e6e6e6 #cdcece #9c9d9d #6a6b6c #434345 #2f3031 #1b1c1e #111214 #0c0d0f #07080a`. Radius 11 (159x!), 8, 6, 12, 20, 16. Border `1px rgba(255,255,255,.1)` and `.06`. Shadow = **ring+inset stack**: `rgb(27,28,30) 0 0 0 1px, rgb(7,8,10) 0 0 0 1px inset` and keycap-like `rgba(0,0,0,.4) 0 1.5px .5px 2.5px, rgb(0,0,0) 0 0 .5px 1px`; warm glow `rgba(215,201,175,.05) 0 0 20px 5px`.
- **Type:** Inter + Geist Mono + JetBrains Mono; Instrument Serif loaded (accent).
- **Motion:** 300ms (139x), 200 (113x), 150; `ease-in-out` x60, `cubic-bezier(.23,1,.32,1)` x21, `(.4,0,.22,.96)` x10. 130 backdrop-filter, 215 masks.
- **Distinctive:** keycap shadows (2.5px ring + inset hairline) on UI chips; 11px radius as a house value; hero art is the only colour.

### Resend (resend.com)
- **Class:** campaign (3D glass cube canvas right, serif headline left). Dark (#000).
- **H1** **96px** / 400 / lh 1.0 / ls -0.01em / `domaine` (serif display), left-aligned, 480px wide (3 lines). 390: 64px.
- **H2** 56px / 400 / lh 1.2 (67.2px) / ls **-0.05em** (-2.8px) / ABC Favorit (grotesk) — serif h1, grotesk h2.
- **Lede** 18px/400 lh 1.5, `rgb(161,164,165)`, 480px.
- **Nav** 58px sticky, transparent, links 14px/500, "Get started" 40px outlined radius 16 with 2px `oklab(1 0 0 / .05)` border.
- **CTA** hero "Get started": 48px, **radius 16px**, transparent with 2px 5%-white border, 16/600, padding 0/20; "Documentation" ghost beside it.
- **Box** `section.mx-auto` max 1280 + 24px pad = 1232; **section padding 96/96** uniform across 9 sections. Grids 3col gap 32/80.
- **Surface** `#000`, `--color-forge-canvas #010101`, line `#1a1a1a`, ink-muted `#d8eaf161`, green `#44ffa4`, red `#fe4e54`. Borders `1px solid rgba(214,235,253,.19)` / `.145` (blue-tinted white). Radius pill (191x), 16, 24, 8, 6. 
- **Type:** four voices — domaine (serif h1), ABC Favorit (h2/20px labels), Inter (body 14/18), **Commit Mono (528 chars, more than Inter)** for UI chrome and code.
- **Motion:** 150ms (61x), 200, 300, 400; custom `cubic-bezier(.66,.06,.36,.96)`. 12 `@starting-style`, 956 color-mix.
- **Distinctive:** 96px serif regular headline on pure black (extreme size/contrast), blue-tinted hairlines, monospace as the working voice.

### Clerk (clerk.com)
- **Class:** product proof (live auth component mock + tabs). Light cool grey.
- **H1** 56px / **700** / lh 1.14 (64px) / ls -0.035em (-1.96px) / Geist-based `geistNumbers`, left, 598px. 390: 32px.
- **Lede** 18px/400 lh 1.55, `rgb(94,95,110)`.
- **Nav** 42px sticky, **floating inset pill** (content x=118..1326), 13px/500 (the tightest nav measured); announcement bar above it.
- **Box** `mx-auto` 1264 w/ 32px pad (1200 content); **section padding 128/172** (asymmetric: more below).
- **Surface** bg `#f7f7f8`, white cards, ink `#131316`, secondary `#5e5f6e`. Radius pill (116x), 6, 8, 12, 16. Shadow: ring `rgba(19,19,22,.024) 0 0 0 1px` + soft drops with negative spread (`0 1px 1px -.5px`) — ultra-subtle layered.
- **Type:** Geist-numbers (body), Suisse (display weights 400-600 loaded), Soehne Mono. Tailwind v4 tokens.
- **Motion:** 100/200/80/300/450ms; `linear()` easing x8 (spring-like), `cubic-bezier(.33,1,.68,1)`.
- **Distinctive:** 700-weight tight headline on cool grey with real component mocks at product scale; whisper-level shadow stack.

### Cursor (cursor.com)
- **Class:** product proof (IDE screenshot floating on a wallpaper photo). Warm light.
- **H1** **26px** / 400 / lh 1.25 / ls -0.0125em / CursorGothic (custom). The *smallest* hero headline of any marketing site measured. Left, 658px. 390: 24.4px.
- **Lede** 16px/400, lh 1.5 (heading is almost body-sized).
- **Nav** 52px fixed, solid bg `#f7f7f4`, no border, 14px/400, content x=67..1370. Items: Models, Product, Enterprise, Pricing, Resources, Sign in, Contact sales; "Download" button dark, radius ~4.
- **CTA** hero buttons ~32-34px, radius 4px (square-ish). `Download for macOS` dark / `Request a demo` ghost.
- **Box** `.container` max 1300; **section padding 67.2/67.2** (4.2rem; 112 hero top). Sections h 700-1086px; `--spacing-*` tokens `g0.25...g3`; 24-col grid with 10px gap (10 uses).
- **Surface** bg `#f7f7f4` (warm paper), card `#f2f1ed`, ink `#26251e` (warm near-black; text at 60%/50% alpha via oklab). Radius 4 (66x), 10, 8, 12. Border `1px oklab(0.263 -.002 .012 / .1)`. Shadow: `rgba(0,0,0,.14) 0 28px 70px, rgba(0,0,0,.1) 0 14px 32px` (large soft lift under screenshot) and `0 22px 70px 4px .3`.
- **Type:** CursorGothic (custom), Berkeley Mono (184 chars), system-ui in the mock UI, EB Garamond loaded (accent), `cursorDisplay`.
- **Motion:** 120/200/300/100/150; `ease-in`, `ease`, `spring` x10.
- **Distinctive:** whisper-small headline + warm paper + huge soft shadow under a real product screenshot over a photographic wallpaper. Confidence through restraint.

### Arc / The Browser Company (arc.net, thebrowser.company)
- **Class:** campaign (arc.net now leads with "Meet Dia, the next evolution of Arc", a single-product CTA + product shot) / editorial (thebrowser.company).
- **arc.net headline** (measured via text node, the DOM `h1` is a testimonial lower on the page): 36px / 700 / lh 1.0 / ls -0.02em / Exposure VAR; centered. Testimonial h1: 45.5px/700 Marlin Soft SQ (rounded).
- **Nav** 96px fixed, **solid brand blue `#3139fb`** bar (29% of page area is this blue), links 14px/500 white, 36px tall, radius 8.
- **CTA** "Try Dia" 76px tall, radius 22px, `rgba(0,0,0,.85)` fill, 24px. Oversized, tactile.
- **Box** 1200 content; sections padding 128/128; text column 760.
- **Surface** bg `#fffcec` (butter cream), blue `#3139fb`, deep `#2702c2`. 12-step colour ramps (`--colors-primary1..12`, secondary). Radius 8/10/22. Shadows `0 5px 5px .1`, `0 2px 8px .25`.
- **Type:** Marlin Soft SQ (rounded humanist), Inter variable for UI, ABC Favorit Mono. Fonts are the brand.
- **Motion:** 200/150/100 (very little CSS; media-driven). 264KB CSS, the lightest of the SaaS sites.
- **thebrowser.company:** 100% viewport, bg `#eeeee7`, a full-viewport **blue (#0c50ff) frame as the nav**, 28px EB Garamond italic centered, 14px ABC Diatype Mono links uppercase +0.15em (2.1px), 2px dotted borders, radius 0, canvas seal. 57KB CSS. Letterpress/editorial.
- **Distinctive:** colour as architecture (a saturated bar/frame is the nav), rounded custom display face, giant tactile button.

### Attio (attio.com)
- **Class:** centered statement + product proof (browser-frame UI under CTA pair). Light, cool.
- **H1** 64px / 600 / lh 0.95 (60.8px) / ls -0.02em (-1.28px) / Inter Display, centered, 805px. 390: 40px.
- **H2** 40px / 500 / lh 1.1 / ls -0.01em.
- **Lede** 18px/500 lh 1.3 ls -0.01em; colour `lab(50 -1 -9.6)` (cool blue-grey).
- **Nav** 116px *including* a ~36px announcement bar (nav proper ~80); sticky; links 16px/500 ls -0.01em.
- **CTA** "Start for free" 36px, **radius 10px**, dark fill, 14/500, padding 0/12; "Talk to sales" outline 10px radius.
- **Box** 24-col and 12-col grids; **effective section padding 152** (large), hero 96 top. cards radius 12/16, 8 for chips.
- **Surface** bg `lab(99.9987 ...)` ≈ `#fbfbfb`; ink `#242629`; borders `1px #eeeff1`. Multi-layer shadows `rgba(0,22,62,.01) 0 0 1px 1px, rgba(0,22,62,.04) 0 4px 12px -1px` (blue-tinted) and button recipe `rgba(255,255,255,.1) .2px .2px 2px inset, rgba(0,0,0,.25) 0 1.5px 1.5px` (inset highlight + drop).
- **Type:** Inter + Inter Display (optical size split), JetBrains Mono. Weights 500 default (heavier than Linear).
- **Motion:** 500ms (22x), 300, 200, 1000 (11x); `ease`, `cubic-bezier(0,0,0,1)`. 321 masks, 455 SVGs.
- **Distinctive:** lh 0.95 on a 64px bold headline; blue-tinted shadows; very large vertical rhythm (152).

### Granola (granola.ai)
- **Class:** editorial + product collage (serif headline, floating notepad UI + photos). Warm cream.
- **H1** **86.4px** / 400 / lh **0.93** (80.4px) / ls -0.02em / `quadrant` (custom serif). **Fluid:** 48px @390, 68px @1024, **110px @1920**. 562px column, left.
- **H2** 48px/400 lh 1.0 ls -0.015em; a decorative **160px** section word ("For the doers"), 108px elsewhere.
- **Lede** 20px/400 lh 1.4, `melange` (custom sans).
- **Nav** 56px fixed, 14px/400 ls +0.01em, rich mega-menu items (title + description). "New Granola for Apple Watch" pill.
- **CTA** "Download for free": **56px**, pill, fill **`#5b6f00` (olive)**, text `#fcfcf8`, 16/430, padding 9/24.
- **Box** `section.flex max-w 1280, px 40` -> 1200 content; section padding 112-160 (`pt/pb 160`, 120, 112). 3-col cards gap 24, 2-col gap 12/32.
- **Surface** bg white / cream `#f7f7f2` (20%) / dark `#292929` (17%) / lime `#b2c248` (11%). Border `1px oklab(0 0 0 / .1)` (55x), `rgba(71,67,42,.2)` warm. Radius pill (21), 4, 8, 16, 28. 
- **Type:** quadrant (serif) + melange (sans). Fluid vw type.
- **Motion:** 300/200/150/500; 94 keyframes; 19 scroll-timeline; `cubic-bezier(.32,.72,0,1)`.
- **Distinctive:** serif display with fluid scaling to 110px, olive CTA (a non-tech colour), 160px decorative section words.

### Anthropic (anthropic.com)
- **Class:** editorial (type-led; hand-drawn underline strokes; canvas illustration). Warm ivory.
- **H1** 60.9px / ~700 / lh 1.1 (66.95px) / ls normal / Anthropic Sans, left, 736px (7 of 12 columns). 390: 40.3px, 1024: 52.7px, 1920: 64px (clamped).
- **H2** display statement **79.7px**/400 lh 1.157 ls -0.015em (Anthropic **Serif**); card titles 24/600 lh 1.3.
- **Body** 24px / lh 1.4 and 22.4px serif paragraphs (very large body).
- **Nav** 68px sticky, transparent; "Try Claude" dark split button.
- **Box** `.u-container` 1284.5; **12-col grid gap 31.5px**; hero 736 text col; sections eff padding ~91; cards radius 24 (and 8, 16, 12).
- **Surface** bg `#faf9f5` (`--swatch--ivory-light`), `#f0eee6` ivory-medium (102% area = layered), `#e8e6dc` ivory-dark; ink `#141413`; clay `#d97757`, accent `#c6613f`, olive `#788c5d`. Muted text `#b0aea5`. Border `1px rgba(20,20,19,.1)`. **No shadows** at all (shadow list empty).
- **Type:** Anthropic Sans (headlines, UI), Anthropic Serif (reading + display statements), Anthropic Mono. Built in Webflow + GSAP (the only GSAP site in the set).
- **Motion:** 200ms (78x), 300/500; `cubic-bezier(.16,1,.3,1)` (expo-out), `(.165,.84,.44,1)`.
- **Distinctive:** flat (no shadow/gradient) ivory paper + clay accent, serif for long-form reading, giant body copy (24px).

### OpenAI (openai.com)
- **Class:** prompt-as-hero (chat composer + suggestion chips); the product *is* the homepage. White.
- **Hero text** 28px / 600 / lh 1.21 / ls +0.01em / OpenAI Sans, centered ("What can I help with?"). Section display `48/500`.
- **Nav** 64px fixed, solid white, links 17px/400 ls -0.01em (large for a nav), "Try ChatGPT" 36px pill (radius 40, black).
- **CTA** composer-first; chips 40px, pill, 14/500.
- **Box** `max-w-container` 1440 with 32px pad (1376); grids 3-4col gap 24.
- **Surface** white, ink black, secondary `rgba(0,0,0,.6)`. Radius 6.08 (39x — a fractional, rem-derived value), 9999, 40, 24. Border `1px rgba(0,0,0,.12)`. Shadows none visible.
- **Motion:** 200/150/300/180; `cubic-bezier(.22,1,.36,1)` and `(.16,1,.3,1)`; 158 keyframes, 99 `text-wrap` uses, 180 container queries (the heaviest container-query user).
- **Distinctive:** custom sans + a homepage that is a working input; massive restraint.

### Perplexity (perplexity.ai)
- **Class:** prompt-as-hero in an app shell (left sidebar nav 900px tall, centered search card). Off-white.
- **Heading** 24px/400 lh 1.33 pplxSans "What do you want to know?"; UI 14/16px.
- **Nav** = persistent left sidebar (no top bar).
- **Surface** bg `#fcfcf9`, ink `rgb(39,37,30)` (warm), border `1px color(srgb .153 .102 0 / .14)` (warm). Radius 12/16 cards, 9999 chips, 8 buttons.
- **Distinctive:** warm-ink + warm-paper (same family as Cursor); no marketing chrome whatsoever.

### Mercury (mercury.com)
- **Class:** campaign (full-bleed cinematic landscape video/photo; centered headline). Dark navy.
- **H1** 49.3px / **480** / lh 1.1 (54.3px) / ls normal / `arcadiaDisplay`. **Fluid:** 28px@390, 38px@1024, **62px@1920**. Horizontal overflow at 1024 and 1920 (`overflowX: true`) flagged.
- **H2** 42px/480 lh 1.15 ls **+0.01em** (positive tracking).
- **Lede** 21px/360 lh 1.35 (light weight).
- **Nav** 72px sticky, transparent, 16px/420 links, "Open account" 40px pill radius 32 `#5266eb`.
- **CTA** "Open account" 40px radius 32, fill `#5266eb`, 16/420, padding 0/20; "Launch demo" ghost `rgba(175,178,206,.2)`, radius 40.
- **Box** 32px side padding -> 1376; **16-col grid gap 32**; section eff padding ~100-150.
- **Surface** bg `#171721` (74%), `#1e1e2a`; beige ramp `--color-beige-base-0..300` (`#fff #fcfcfa #f6f5f2 #efeee9 #e0ded7 #c8c4b8`); text `#ededf3`/`#c3c3cc`. Border `1px rgba(175,178,206,.36)`. Radius 12 (27), 4 (22), pill, 40.
- **Type:** arcadia Display/Text (custom), variable weights 360/420/480 (non-standard steps) — light, calm; IBM Plex Mono.
- **Motion:** 300/500/600/150; `cubic-bezier(.2,.7,.2,1)`, `(.33,1,.68,1)`, `(.8,0,.5,1)`.
- **Distinctive:** a bank that opens with a photograph of a desk in a mountain valley; variable-weight light type (360-480).

### Ramp (ramp.com)
- **Class:** product proof + live data (spend ticker strip, UI cards, email capture). Light.
- **H1** 64px / 400 / lh 1.0 / ls ~0 / Lausanne, left, 1050px wide (fits on 1 line: "Time is money. Save both."). 390: 40px.
- **H2** 40px/400 lh 1.05; 28/400 section subheads.
- **Lede** 18px/400 lh 1.33.
- **Nav** 102px (includes ~36px banner "New: AI Token Spend..."; 66px proper), static.
- **CTA** lime/yellow-green "Get started for free" inside an email-capture input row (the CTA is a form).
- **Box** `mx-auto` max 1440, 64px pad -> 1312; cards radius 16 (22), 12, 8, 6.
- **Surface** white; ink `lab(2.8 .4 1)`; dark band `#1f1f1d`; borders `1px lab(83 1 2)`/`lab(91.6 -.2 -2.3)`. Text secondary at 60% alpha.
- **Motion:** 200/150/300/400; `cubic-bezier(.16,1,.3,1)` x17 (expo-out), `.4,0,.2,1`.
- **Distinctive:** a live "spend processed" counter strip and a headline that reads as a single short line; CTA is the form.

### Loom (loom.com)
- **Class:** centered statement + product video frame (Atlassian-era). White.
- **H1** 63.3px / 700 / lh 1.03 / ls normal / Charlie Display. Fluid: 35@390, 45.8@1024, **70@1920**.
- **Lede** 26.7px/400 lh 1.52 (very large, 878px).
- **Nav** 150px incl. top promo bar (nav proper ~100), sticky. Large 16px links.
- **CTA** "Get Loom for free": **58px**, pill, `#1868db`, 15.6/700, padding 15.6/23.4. Second CTA outlined.
- **Box** `max-w-screen` 1600 with 36px pad -> 1368; hero section **padding 111/111**; feature cards radius 41.7-68.9 (huge "squircle" cards) and 12.
- **Surface** white; blue-tint `#e9f2fe`; ink `#292a2e`; accent orange `#ffab00` borders. `--thd-color-grey-10..50` tokens. Radius pill (54), 68.9, 41.7.
- **Motion:** 200ms x152, 300 x105; `ease-in-out` x136 (default curves, no custom easing).
- **Distinctive:** type is scaled by a base unit (111px = 1 "xl" spacing; radius 41.7/68.9 are multiples) — a ratio system; oversize pill CTA.

### Descript (descript.com)
- **Class:** campaign (serif display headline, red CTA, UI collage). Dark maroon.
- **Display headline** **88px** / 400 / `gamuthDisplay` (serif; "AI-editing for every kind of video"), centered, 892px. Eyebrow `h1` is an 18px uppercase label (ls +0.04em, `brett`). h2 56px/700 lh 1.1.
- **Lede** 18px lh 1.5.
- **Nav** 102px fixed, bg `#fff7fa` + `blur(16px)`; "Sign up" 54px, radius 12, `#772a4d`.
- **CTA** "Get started for free" **56px**, radius **12px**, fill `#f73b3b`, text `#fff7fd`, 16/400, padding 16/32.
- **Box** 940 hero column; **section padding 100-104** (top 160 on hero). Cards radius 4 (4.75 / 3.56 — scaled px).
- **Surface** bg `#390a1a` (77%) / `#190308` / black; text `#d1c7cb`/`#fff7fa`; red ramp `--Red-0..400`. Border `1px #e4dde0`.
- **Type:** gamuthDisplay (serif) + booton (sans) + brett (eyebrow caps). 22 scroll-snap elements, 21 videos.
- **Distinctive:** wine/maroon dark instead of black; serif display + saturated red button; heavy video use.

### Lovable (lovable.dev)
- **Class:** prompt-as-hero on a pastel gradient (WebGL/canvas blob). Warm light.
- **Headline** ~48px / 600 / lh 1.1 / ls **-0.04em** (-1.92px) / Camera Plain Variable ("Build something Lovable"); DOM `h1` is an invisible 18px "AI App Builder" SEO node.
- **H2** 36px/600 lh 1.1 ls -0.04em.
- **Nav** 64px sticky, centered group (x=321..863), 15px/400.
- **CTA** = prompt composer (white card radius 16, ~76px tall) over the gradient.
- **Box** sections padding **160/160** (and 80); content 1120-1328; text column 576.
- **Surface** bg `oklch(.9699 0 107)` (warm), ink `oklch(.1 0 0)`, secondary `oklch(.5 .001 107)`; **oklch used 467 times**; `color-mix` ink ramps. Radius 8/16/pill/6. Border `1px oklab(0 0 0 / .06)`.
- **Motion:** 150ms x75, 200, 100, 400; `ease-out`, `(0,0,.2,1)`. 164 container queries, 67 keyframes.
- **Distinctive:** gradient as brand surface; the input is the CTA; hue 107 (yellow-warm) used for all neutrals.

### v0 (v0.app)
- **Class:** prompt-as-hero (composer + template gallery); app shell. Light.
- **Heading** 32px / 600 / lh 1.25 / ls **-0.04em** (-1.28px) / Geist Sans, centered, "What do you want to create?". h2 24px/600 ls -0.04em.
- **Nav** 50px, `relative`, `border-bottom: 1px oklch(.961 0 0)`, 14px/500 Inter.
- **Box** 24px pad, 1392; template cards 3-col gap 24, card radius 12 (also 8, 16); chips pill (92x). 
- **Surface** `oklch(.985 0 0)`, ink `oklch(.205 0 0)`, secondary `oklch(.51 0 0)`; border `1px oklch(.94 0 0)` (80x). **Vercel house tracking -0.04em.**
- **Motion:** 200/150/500/520; `cubic-bezier(.22,1,.36,1)`; 415 oklch uses.

### Supabase (supabase.com)
- **Class:** product proof (feature tile grid). Light neutral, green accent.
- **H1** 46px / 500 / lh 1.0 / ls normal / **Manrope**, left, two lines, **second line in brand green** ("Scale to millions"). 390: 34px. 
- **Lede** 14-16px/450 (variable weight 450).
- **Nav** 65px sticky, `border-bottom: 1px oklch(.1 0 337 / .081)`, 14px/500 Inter, GitHub star count (111.2K) as a nav item, "Start your project" green button.
- **Box** `section-container` 1280 w/ 96px pad = 1088 content; **section padding 96** (eff 80-96); grids 5-col gap 8, 6-col gap 24/40, 12-col gap 12. 
- **Surface** bg `oklch(.995 0 337.5)`, ink `oklch(.1 0 337.5)`; radius **10.667px (71x)** and **21.333px (16x)** — values are `*4/3` of 8 and 16 (a scaled rem system), pill 26. Border `1px oklch(.1 0 337 / .081)` (90x).
- **Motion:** 200/400/300/500; `cubic-bezier(.075,.82,.165,1)` x32 (ease-out-circ), a bounce `(.68,-.55,.27,1.55)` x8.
- **Distinctive:** the 2-line headline whose second line switches to accent colour; weight 450; scaled radii; star count in nav.

### PostHog (posthog.com)
- **Class:** interactive / metaphor (a fake desktop OS: dock sidebar, windows, illustrated hedgehog). Beige.
- **H1** 36px / **800** / lh 1.11 / ls -0.025em / RoundHog (custom rounded), left, 474px. 
- **Lede** 17px/500 lh 1.5.
- **Nav** = left dock rail (full-height) + top menu; "OS"-style.
- **CTA** "Get started - free": 47px, radius 8, fill `#cd8407` / `#eb9d2a` amber, ink `#111`, 18/500.
- **Surface** bg `#eeefe9`; border `1px #bfc1b7`; amber borders `#b17816`; radius 4 (24x), 6, 8, pill. 
- **Type:** RoundHog + IBM Plex Sans Variable + Source Code Pro; "Fairytale", "Squeak" novelty faces.
- **Distinctive:** most radical metaphor in the set: the marketing site is an operating system; hand-drawn art; weight 800.

### Figma (figma.com)
- **Class:** campaign collage (layered UI + illustration in a stack). White.
- **H1** 56px / 400 / lh 1.0 / ls -0.022em / figmaSans (variable, weights 320/330/400). Fluid 36@390, 56@1024, **64@1920**. Left, 328px column (narrow!).
- **H2** 44px/400 and 30px/400 lh 1.2 ls -0.022em.
- **Lede** 18px / **330** lh 1.4 ls -0.008em.
- **Nav** 78px fixed, white, 18px/330 links (large), "Get started for free" 46px black radius 8.
- **CTA** black, **radius 8**, 18/330, padding 12/22 (large light-weight label).
- **Box** 40px side pad -> 1360; **section padding 80/80** consistent; 2-3 col 16px gaps.
- **Surface** white + black; radius pill, 24 (cards), 8; ring `oklch(0 0 none / .16) 0 0 0 1px inset`. 
- **Motion:** 250ms x473, 200 x222, 400, 150; `ease-in-out` x410, `ease-out` x356 (plain keywords, no custom bezier). 3.2MB CSS (largest).
- **Distinctive:** light-weight (320-330) variable type for body *and* UI; a narrow 328px headline column with a huge collage right.

### Rive (rive.app)
- **Class:** interactive (Rive-driven animated panels, uppercase Orbitron). Black.
- **H1** 40px / **900** / lh 1.2 / ls **+0.01em** / Orbitron, uppercase, 631px. 390: 21px.
- **Lede** 16px lh 1.6 Inter, `#999`.
- **Nav** 64px fixed, 12px uppercase Tomorrow font, content x=220..1220 (inset).
- **CTA** 40px, **radius 4**, `#1d1d1d`, uppercase 12px.
- **Surface** bg `#000`, panels `#111`/`#121212`, text `#999`/`#fff`; radius 4 (71), 5, 8. 
- **Distinctive:** a sci-fi display face (Orbitron 900) + the product's own animation runtime as hero art; framer-built.

### Pitch (pitch.com)
- **Class:** campaign (maximal type on purple) + prompt box. 
- **H1** **180px** / 700 / lh **0.8** (144px) / ls -0.04em (-7.2px) / Mark Pro Bold, centered, 1060px. **Fluid:** 82@390, 171@1024, 180@1920. By far the biggest hero type measured.
- **H2** 48px/700 lh 1.2 ls -0.04em.
- **Nav** 124px incl. ~36px promo bar; fixed; bg transparent over purple; "Log in" white pill (radius 30, 44px tall) and a lime-green "Sign up" pill.
- **CTA** (generate) 36px radius 4; consent "Agree" 57px radius 12 `#5318eb`.
- **Box** hero 1060, features 1224; padding 80-120. Radius 20/24/32/40 (soft large).
- **Surface** `#5318eb` (10%), deep `#280f62` (38%), white 46%; shadows `rgba(198,165,255,.35) 0 20px 60px -20px` (coloured glow) and `rgba(12,2,28,.18) 0 24px 60px, .08 0 4px 12px`.
- **Type:** Mark Pro (headings) + Eina 03 (body) + Space Mono; framer-built.
- **Distinctive:** type as the hero image (180px at lh 0.8) with coloured glow shadows.

### Replicate (replicate.com)
- **Class:** campaign gradient + code-proof tab. Pink/orange gradient.
- **Headline** **72px** / 700 / lh 1.0 / ls -0.025em / `rb-freigeist-neue` ("Run AI with an API."); semantic `h1` is a 24px supporting sentence in basier-square. h2 48/400.
- **Body** 14px / lh 1.43 **JetBrains Mono** (monospace body copy).
- **Nav** 72px, relative, 14px/400; "Try for free" black **square** button.
- **CTA** 54px, **radius 0**, black, 18/400, padding 12/16. One of two sharp-cornered CTAs.
- **Box** `.container` max **1920**, 64px pad (1312 at 1440); section padding ~100-160; 3-col grid for model cards.
- **Surface** white content; hero gradient; border `1px #202020`, pill chips; radius pill (58) + 4 only.
- **Motion:** 150/300/200/500; plain `ease`. 252KB CSS.
- **Distinctive:** brutalist/square UI with monospace body; gradient hero; code tabs as the demo.

### Neon (neon.com)
- **Class:** campaign cinematic (green vertical-line aurora video under headline). Black.
- **H1** 56px / 400 / lh 1.125 (63px) / ls **-0.04em** (-2.24px) / Inter, left, spans 1152px. Fluid 32@390, 52@1024, **64@1920**.
- **H2** 44px/400 lh 1.125 ls -0.04em; large closers 64-72px.
- **Nav** 64px sticky, **solid black**; mega-menu items carry title + description.
- **CTA** "Get started" **44px**, pill, **white** fill `#1a1a1a` text, 16/500, padding 0/28; "Read the docs" ghost pill.
- **Box** `.mx-auto` max **1600** w/ 32px pad -> 1376; section padding **128/128**; 2-col gap 128.
- **Surface** `#000`, pale-green panel `rgb(228,241,235)` (20%), `#18191b`; text `#94979e`. Radius 4 + pill. Border `1px #494b50`.
- **Motion:** 200/300/150; `ease-out`. 7 videos, 4 canvases, 16 snap points.
- **Distinctive:** inverted white pill on black, pale-mint contrast panels, 56px at -0.04em.

### Railway (railway.com)
- **Class:** illustrative campaign (pixel-art night sky) + product proof. Dark violet.
- **H1** 54px / 500 / lh 1.12 / ls **-0.036em** / **IBM Plex Serif**, centered ("Ship software peacefully"). 390: 40px.
- **H2** 36px/400 lh 1.33 ls -0.02em, Inter.
- **Lede** 20px/400 lh 1.4.
- **Nav** 72px sticky, solid `#13111c`, 16px/400, content x=405..945 (centered cluster, 540px wide).
- **CTA** "Deploy →" **58px**, radius 8, `#553f83` purple, 20/500, padding 12/24; "Agents" `rgba(0,0,0,.35)`.
- **Box** max 1696 / 1400; section padding 96-112; **12-col grid gap 32**.
- **Surface** bg `#13111c` (89%), `#1f2b2e`, `#1b2132`; text `#f7f7f8`/`#6b7280`. **409 elements with `1px rgba(255,255,255,.086)`** (everything is outlined). Radius **4px on 1016 elements** (default), 8, 12, pill.
- **Distinctive:** serif h1 on a violet-black UI with hairlines everywhere; radius 4 default.

### Mintlify (mintlify.com)
- **Class:** product proof + canvas line art (flowing green strands). Light.
- **H1** 50px / 400 / lh 1.04 / ls **-0.04em** (-2px) / arizonaFlare (serif), left, 352px (3 lines, narrow).
- **Lede** 18px lh 1.33.
- **Nav** 65px sticky, `border-bottom: 1px #f1f0ee`, 14px/500; "Contact sales" black.
- **CTA** "Get started" **42px**, **radius 4px**, black, 14/500, padding 12/12.
- **Box** `max-w` 1088; 24-col grid gap 16; hero eff pad 80. 
- **Surface** `#f9f6f3`-ish warm white; text green `lab(51 -41.6 15.4)`≈ emerald; chip `paperMono`. Radius 4 (38), 6, 12, 2.
- **Distinctive:** serif display at -0.04em, narrow 352px column, tiny radii, 15 canvas elements (line art).

### Dub (dub.co)
- **Class:** centered + product UI under a tab strip; **visible grid lines** (blueprint). Light.
- **H1** 48px / 500 / lh 1.15 / ls normal / satoshi, centered, 509px. 390: 36px.
- **H2** 48px/500 lh 1.0.
- **Lede** 20px/400 lh 1.4.
- **Nav** 56px sticky centered cluster (x=484..956), 14px/500.
- **CTA** "Start for free" **38px**, **radius 8**, black, 14/500, padding 8/20.
- **Box** 1080 grid-section, 4-col grids gap 16; radius 12 (125x) / 8 (91) / pill (89).
- **Surface** `#fafafa`; **262 elements with `1px #e5e5e5`** (the grid is drawn); ink `#171717`, grey `#737373`. 
- **Distinctive:** drawn 1px layout grid + corner crosses; satoshi at 500.

### Notion (notion.com)
- **Class:** centered statement with inline pill ("Jam") + illustrated mascots + product UI. White.
- **H1** **96px** / 600 / lh 1.04 (100px) / ls **-0.048em** (-4.6px) / NotionInter, centered, 1252px (2 lines). **Fluid**: 42@390, 89.7@1024, 96@1920.
- **H2** 54px/700 lh 1.04 ls -0.035em; 22px/700 card titles.
- **Lede** 20px/400 lh 1.4 ls -0.006em, `rgba(0,0,0,.9)`.
- **Nav** 64px sticky, 16px/400, no border. 
- **CTA** "Get Notion free" **38px**, **radius 8**, `#0075de`, 16/500, padding 6/15 with a **1px transparent white border**; "Request a demo" light-blue `#e6f3fe` / `#005bab` text.
- **Box** 1252 hero; section padding **96/96**; page 4507px (shortest of the long-form marketing sites).
- **Surface** white; warm greys `#f9f9f8`, `#f6f5f4`; ink `rgba(0,0,0,.95)`; border `1px rgba(0,0,0,.1)`; radius 8 (52), 12, 4, pill. **Shadows ultra-faint multi-layer** (`rgba(0,0,0,.01) 0 .175px 1.04px, .02 0 .8px 2.9px, ...`).
- **Type:** NotionInter (custom Inter cut), Lyon Text (serif, accents), iA Writer Mono. `font-feature-settings` used 3053 times. `oklch` 1560 uses.
- **Motion:** 150/200/250/100/300; `ease-in-out` x31. 29 scroll-timeline rules. 84 `text-wrap` uses.
- **Distinctive:** the largest *sans* headline (96px) with -0.048em tracking; inline pill inside the headline.

### Superhuman (superhuman.com)
- **Class:** product proof carousel. Warm paper + dark plum bands.
- **Headline** 49px / 460 / lh 1.2 / ls -0.0275em / Super Sans VF (custom variable; weights 460/540/600).
- **Lede** 18px/540 lh 1.5; 25px/460 lh 1.2.
- **Nav** 67px sticky, white, `border-bottom: 1px color(srgb .45 .44 .43 / .2)`; 16px/460 links; "Love" as a nav item.
- **CTA** "Get Mail" **36px**, radius 8, **lavender `#d4c7ff`** with dark text, 14/600.
- **Box** max 1280, 80px pad (1280 content in 1344); **section padding 96** (eff 96-128); 4-col gap 12, 3-col gap 32.
- **Surface** warm `#f7f5f2` (86%), plum `#421d24`, indigo `#281647`, lavender `#e8e0ff`; radius 12 (21), 8. Border `1px color(srgb .988 .98 .968 / .08)` (warm).
- **Distinctive:** non-integer variable weights (460/540), lavender CTA with dark text (anti-convention), plum content bands.

### Cal.com (cal.com)
- **Class:** product proof (a live booking widget inside a white rounded shell on grey). Light grey.
- **H1** 64px / 600 / lh 1.1 / ls normal / Cal Sans (custom display), left, 500px (3 lines). 390: 40px.
- **H2** 48px/600 lh 1.1.
- **Lede** 16px / **300** lh 1.5 / Cal Sans UI Variable Light, `#898989`.
- **CTA** full-width dark "Sign up with Google" bar (~40px) + light "Sign up with email".
- **Box** 1048 shell; cards radius 12/16; 4-col gap 24; announcement pill 24px tall (`Cal.com launches v6.`).
- **Surface** `#f4f4f4`, white shell, ink `#242424`, secondary `#898989`; shadow `rgba(36,36,36,.7) 0 1px 5px -4px, rgba(36,36,36,.05) 0 4px 8px`; inset `rgba(255,255,255,.15) 0 2px 0` button highlight.
- **Motion:** minimal (150/200/400). Built on Framer.

### Framer (framer.com)
- **Class:** product proof (CMS UI with blue glow) + hero video. Black.
- **H1** 54px / 500 / lh 1.0 / ls -0.04em (-2.16px) / GT Walsheim Medium, left, 721px. Fluid 36@390, 42@1024, 54@1920.
- **H2** 44px/500 lh 1.1 ls -0.04em.
- **Lede** 18px/400 lh 1.35, `rgba(255,255,255,.6)`.
- **Nav** 64px fixed; 12px (default link style) with logo-menu.
- **CTA** "Get started for free" 34px, **radius 8**, white fill, 12px.
- **Box** 1200 content; **section padding 120/120**; radius 8 (134x), 15-25 cards.
- **Surface** `#000`, `#111`, `#171717`; blue `#0099ff` borders; shadows `rgba(0,0,0,.2) 0 26px 41.6px` and `0 35.9px 57.4px`. Border `1px rgba(255,255,255,.06)`.
- **Distinctive:** a no-code tool whose own site is built in itself (framer-* classes; `--token-uuid` variables); lowest CSS-feature use of the dark set.

---

## 2. Studio / portfolio sites (contrast)

### Basement Studio (basement.studio)
- **Class:** interactive (3D game-room WebGL scene, tiny HUD nav). Black.
- **H1** 87px / 600 / lh **0.9** (78px) / ls -0.04em (-3.48px) / Geist; below the fold (top 916). 390: 46px, 1024: 87px, 1920: 98px. h2 76px/600 lh 0.9 ls -0.04em.
- **Nav** **36px** fixed, 12px/600 Geist; 7 links + "Online" status.
- **Box** `section.grid-layout` max 1920, 16px pad; **12-col gap 12px**; full-bleed.
- **Surface** `#000`; text `#e6e6e6`; radius 0 (only 3 pills); no shadows. 118KB CSS.
- **Distinctive:** hero is an explorable canvas; headline relegated below it.

### Lusion (lusion.co)
- **Class:** interactive (WebGL 3D object field fills the viewport; scroll-triggered).
- **Text** Aeonik 36px/400 lh 1.1 (fluid: 23@390, 25@1024, 48@1920); micro-labels 13-14px; 12-col grid gap 28.8px.
- **Nav** tiny logo + "LET'S TALK" pill (45px, radius 87.5) + MENU pill; full-screen menu overlay.
- **Motion:** 400ms x50, 250, 500; `cubic-bezier(.4,0,.1,1)`, `(.35,0,0,1)` x32 (heavy custom easing). 328KB CSS.
- **Distinctive:** the entire first screen is a 3D scene in an inset rounded frame; DOM text is almost ornamental.

### Darkroom Engineering (darkroom.engineering)
- **Class:** typographic / retro-terminal (red display type on black, mono details). Lenis smooth scroll.
- **H1** **200px** / 400 / lh 0.8 (160px) / ls -0.05em / `therma` condensed display, uppercase, 1408px wide; fluid ~13.9vw (104@390, 142@1024, **267@1920**). h2 120px/700 lh 0.8 ls -0.05em. "sauce" 251px display glyphs.
- **Body** `mono` 14px / **weight 200** / lh 1.2 / ls -0.01em; labels 10px.
- **Nav** fixed rail with mono links ("WORK / ABOUT / CONTACT").
- **Grid** 8-col gap 16 (45 grids); padding 16; radius 0 everywhere; no shadows. 75KB CSS.
- **Surface** black + one red (`lab(49.9 73.4 57)` ≈ `#e0392a`) used for *all* text; 1px borders in dark red.
- **Distinctive:** single-colour design (red-on-black), type 14vw with lh 0.8, zero radius.

### Locomotive (locomotive.ca)
- **Class:** typographic campaign (glitch-scrambled display type; emoji; Lenis). White/black.
- **H1** 70px / 400 / lh 1.1 / `LocomotiveNew` (serif), plus hero glitch text at **110px**; fluid 36@390, 50@1024, **79@1920** for the measured node. Nav 26px centered (Work, Agency, Careers, Store) in HelveticaNow Display. 12-col grid gap 20; padding 40.
- **Motion:** 300ms x42; `cubic-bezier(.215,.61,.355,1)` x45 (easeOutCubic), `(.23,1,.32,1)`.
- **Surface** radius 0; 2px black borders; menu bg `#312dfb` (electric blue).
- **Distinctive:** text scramble/glitch on load; nav links set at 26px (display-size nav).

### Resn (resn.co.nz)
- **Class:** interactive (full-screen three.js scene; nothing else). Black; `canvas` x6, `three` global; DOM text = one 10px uppercase label ("VIEW ALL PROJECTS", Fort-Medium, ls +0.1em). CSS 67KB. Fonts: Fort family (Extralight-Bold).
- **Distinctive:** the page is the experiment; no nav/DOM hierarchy to measure.

### Ueno (ueno.co)
- **Class:** editorial (statement in a serif, full-bleed video). Squarespace.
- **H1** 57.9px / 400 / lh 1.25 (72.7px) / ls -0.03em (-1.74px) / Castoro (serif), 713px left; fluid 41@390, 45@1024, **72.9@1920**. Body Bitter 13px.
- **Nav** 85px absolute (scrolls away), Bitter 13px; 26-col grid gap 11.
- **Surface** black and white split; radius ~0; 1.8MB CSS (builder).
- **Distinctive:** "Hi. We're a strategic design and innovation studio." as the hero — voice-first, serif.

### The Browser Company (thebrowser.company)
See Arc entry. 28px EB Garamond (italic in places) centered, mono 14px uppercase (+0.15em) links, `#eeeee7` paper, `#0c50ff` full-viewport frame, 2px dotted borders, radius 0, 57KB CSS, canvas seal.

---

## 3. Raw summary table (1440 viewport, 2026-10-08)

h1 = marketing hero headline px (visible headline, see notes). `w` = weight, `lh` = ratio, `ls` = em. Nav in px (b = includes banner). CTA = hero primary height / radius.

| Site | h1 | w | lh | ls | h1 family (class) | Nav | CTA h / r | Container | Sec pad (eff) | Bg | Hero class |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Linear | 64 | 510 | 1.0 | -.022 | Inter Var | 73 | 32 / pill | 1344 | 128 | #08090a | product proof |
| Vercel | 64 | 400 | 1.0 | -.06 | Geist | 64 | 40 / pill | 1392 | 160 (mt) | #fafafa | editorial/geo |
| Stripe | 48 | 300 | 1.15 | -.02 | sohne-var | 76 | 48 / 4 | 1232 | 80-96 | #fff | campaign (WebGL) |
| Raycast | 64 | 600 | 1.1 | 0 | Inter | n/m | 36 / 8 | 818 txt | n/m | #07080a | campaign |
| Resend | 96 | 400 | 1.0 | -.01 | domaine (serif) | 58 | 48 / 16 | 1232 | 96 | #000 | campaign (3D) |
| Clerk | 56 | 700 | 1.14 | -.035 | Geist-numbers | 42 | n/m | 1200 | 128 / 172 | #f7f7f8 | product proof |
| Cursor | 26 | 400 | 1.25 | -.0125 | CursorGothic | 52 | ~34 / 4 | 1300 | 67 | #f7f7f4 | product proof |
| Arc | 36 | 700 | 1.0 | -.02 | Exposure VAR | 96 | 76 / 22 | 1200 | 128 | #fffcec | campaign |
| Attio | 64 | 600 | .95 | -.02 | Inter Display | 116b | 36 / 10 | 1362 | 152 | #fbfbfb | centered + UI |
| Granola | 86.4 | 400 | .93 | -.02 | quadrant (serif) | 56 | 56 / pill | 1200 | 112-160 | #fff / #f7f7f2 | editorial |
| Anthropic | 60.9 | ~700 | 1.1 | 0 | Anthropic Sans | 68 | n/m | 1285 | 91 | #faf9f5 | editorial |
| OpenAI | 28 | 600 | 1.21 | +.01 | OpenAI Sans | 64 | 36 / pill | 1376 | n/m | #fff | prompt |
| Perplexity | 24 | 400 | 1.33 | 0 | pplxSans | sidebar | n/a | n/m | n/a | #fcfcf9 | prompt |
| Mercury | 49.3 | 480 | 1.1 | 0 | arcadiaDisplay | 72 | 40 / 32 | 1376 | ~100-150 | #171721 | campaign (video) |
| Ramp | 64 | 400 | 1.0 | 0 | Lausanne | 102b | form | 1312 | ~133 | #fff | product proof |
| Loom | 63.3 | 700 | 1.03 | 0 | Charlie Display | 150b | 58 / pill | 1368 | 111 | #fff | centered + video |
| Descript | 88 | 400 | ~1.0 | 0 | gamuthDisplay | 102 | 56 / 12 | 1248 | 100 | #390a1a | campaign |
| Lovable | 48 | 600 | 1.1 | -.04 | Camera Plain | 64 | composer | 1120 | 160 | warm #fcfbf8 | prompt |
| v0 | 32 | 600 | 1.25 | -.04 | Geist | 50 | composer | 1392 | n/m | #fafafa | prompt |
| Supabase | 46 | 500 | 1.0 | 0 | Manrope | 65 | n/m | 1088 | 96 | #fcfcfc | product proof |
| PostHog | 36 | 800 | 1.11 | -.025 | RoundHog | dock | 47 / 8 | 979 | n/m | #eeefe9 | metaphor |
| Figma | 56 | 400 | 1.0 | -.022 | figmaSans | 78 | 46 / 8 | 1360 | 80 | #fff | campaign |
| Rive | 40 | 900 | 1.2 | +.01 | Orbitron | 64 | 40 / 4 | 1000 | 60 | #000 | interactive |
| Pitch | 180 | 700 | .8 | -.04 | Mark Pro | 124b | n/m | 1224 | 80-120 | #5318eb | campaign type |
| Replicate | 72 | 700 | 1.0 | -.025 | rb-freigeist | 72 | 54 / 0 | 1312 | 100-160 | white+grad | campaign |
| Neon | 56 | 400 | 1.125 | -.04 | Inter | 64 | 44 / pill | 1376 | 128 | #000 | campaign (video) |
| Railway | 54 | 500 | 1.12 | -.036 | IBM Plex Serif | 72 | 58 / 8 | 1274 | 96-112 | #13111c | campaign + proof |
| Mintlify | 50 | 400 | 1.04 | -.04 | arizonaFlare | 65 | 42 / 4 | 1088 | 80 | warm white | proof |
| Dub | 48 | 500 | 1.15 | 0 | satoshi | 56 | 38 / 8 | 1080 | n/m | #fafafa | centered + grid |
| Notion | 96 | 600 | 1.04 | -.048 | NotionInter | 64 | 38 / 8 | 1252 | 96 | #fff | centered |
| Superhuman | 49 | 460 | 1.2 | -.0275 | Super Sans VF | 67 | 36 / 8 | 1280 | 96 | #f7f5f2 | proof |
| Cal | 64 | 600 | 1.1 | 0 | Cal Sans | n/m | ~40 / 8 | 1048 | 48 | #f4f4f4 | proof |
| Framer | 54 | 500 | 1.0 | -.04 | GT Walsheim | 64 | 34 / 8 | 1200 | 120 | #000 | proof |
| Basement | 87 | 600 | .9 | -.04 | Geist | 36 | n/a | 1408 | n/a | #000 | interactive |
| Darkroom | 200 | 400 | .8 | -.05 | therma | rail | n/a | 1408 | n/a | #000 | typographic |
| Locomotive | 70/110 | 400 | 1.1 | 0 | LocomotiveNew | 60 | n/a | 1360 | n/a | #fff | typographic |
| Ueno | 57.9 | 400 | 1.25 | -.03 | Castoro | 85 | n/a | ~1300 | n/a | #000/#fff | editorial |
| TBC | 28 | 400 | 1.2 | 0 | EB Garamond | frame | n/a | 376 | n/a | #eeeee7 | editorial |
| Lusion / Resn | n/m | | | | Aeonik / Fort | | | | | | interactive |

`n/m` = not measurable / not detected. `n/a` = not applicable.
