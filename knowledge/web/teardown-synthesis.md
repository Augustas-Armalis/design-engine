---
source: web:teardowns (38 live sites, measured 2026-10-08)
chapter: Synthesis of measured teardowns - ranges, medians, distinctive-vs-median, signature moves
pages: n/a (live web)
topic_tags: [teardown, medians, typography, spacing, layout, nav, cta, radius, shadow, color, motion, hero, signature-moves]
status: studied
---

# Teardown synthesis

Per-site data lives in `teardowns.md` (same folder). Everything below is derived from it. **Measured 2026-10-08**, headless Chromium, 1440x900, 32 SaaS/AI-SaaS marketing sites + 6 studio/portfolio sites (n varies per metric because some values could not be read; n is stated). Sites change; use as priors, not constants.

## 1. Core ideas

1. **There is a measurable "median marketing site"**: 56px headline, weight ~500 at lh ~1.05 and about -0.02em tracking; 64px nav; 1,270px content; 104px section padding; 40px pill-or-8px CTA; 12px card radius; 150-300ms ease-out motion. Most pages sit within one quartile of this on every axis. A page that matches it on every axis is, by construction, indistinguishable.
2. **Distinctive sites do not differ by being "more designed"; they differ in 2-4 deliberate axes and are median on the rest.** Linear is median on container (1344), nav (73), padding (128), radius (12), motion (150-300ms). It is distinctive on weight (510), surface (#08090a with 8%-white hairlines, no shadows) and information density (UI as ornament). Make the deviations few and legible.
3. **Typeface is the biggest single differentiator.** Of 38 sites, **at most 5 headline in a stock web font without a custom/commissioned cut or a distinctive pairing** (Inter in Raycast/Neon/Railway body, Geist in Vercel/Clerk/v0/Basement). Most others ship a bespoke or licensed family: sohne-var (Stripe), Anthropic Sans/Serif, OpenAI Sans, Figma Sans, Notion Inter (custom cut), CursorGothic, Super Sans VF, Camera Plain (Lovable), Cal Sans, quadrant/melange (Granola), arcadia (Mercury), Lausanne (Ramp), Charlie (Loom), Mark Pro (Pitch), Marlin (Arc).
4. **Headline size is a tails game.** 9 of 17 "distinctive" sites sit outside the 48-64px band (26px Cursor, 28 TBC/OpenAI, 36 Arc/PostHog; 86-96 Granola/Descript/Resend/Notion; 180 Pitch; 200 Darkroom), against 4 of 15 for the rest. The median differs little (60.9 vs 54px); the *spread* does. Either shrink the headline until it is quiet, or go very large; 48-64px is where templates live.
5. **Weight has moved to the light/regular end, via variable fonts with non-integer stops.** Headline weights: 300 (Stripe), 400 (Vercel, Resend, Ramp, Neon, Mintlify, Granola, Figma, Cursor), 450-510 (Linear 510, Superhuman 460, Mercury 480, Supabase 500/450, Dub, Framer), 600-700 (Raycast, Notion, Attio, Clerk, Loom, Cal). Median ~500. Fractional steps (320/330, 360/420/480, 460/540, 510/590) are common in the best sites.
6. **Warm paper is the 2025-26 counter to cold-white SaaS.** 10 of 38 use a warm off-white with a warm near-black ink (Cursor `#f7f7f4`/`#26251e`, Anthropic `#faf9f5`/`#141413`, Arc `#fffcec`, PostHog `#eeefe9`, Superhuman `#f7f5f2`, Granola cream `#f7f7f2`, Lovable hue-107 neutrals, Perplexity, Mintlify, TBC `#eeeee7`).
7. **The primary CTA is usually not the brand colour.** Of 24 sites where it was measurable, 12 use a neutral (black, or white-on-dark inverted: Linear `#e5e5e6`, Neon `#fff`, Raycast `#e6e6e6`); 10 use one saturated hue (Stripe `#533afd`, Notion `#0075de`, Loom `#1868db`, Mercury `#5266eb`, Descript `#f73b3b`, Pitch `#5318eb`, Railway `#553f83`, Granola olive `#5b6f00`, PostHog amber `#cd8407`, Superhuman lavender `#d4c7ff`).
8. **Depth is done with hairlines and ring shadows, not blur.** 1px translucent borders (`rgba(255,255,255,.06-.12)` on dark; `#e5e5e5`-class on light) appear on hundreds of elements (Linear 61, Railway 409, Dub 262). Shadows are multi-layer with negative spread or a 1px ring (Stripe, Cursor, Raycast, Clerk, Notion). Anthropic and the studio sites use none.
9. **Motion is boring in CSS and strong in the curve.** Median durations 150/200/300ms (200ms is in the top-3 of 31 of 40 sites); easing is `ease-out` or a strong ease-out bezier (expo/quint/iOS-drawer), not ease-in-out. Signature moves live in scroll/JS/video/canvas, not in transitions.
10. **The hero is one of five classes** (section 4). Product-proof is the plurality; campaign/art is the second; prompt-as-hero is the 2025-26 AI addition.

## 2. Rules (derived; strongest form first)

Each is a prior from the sample, not a law. "Check" is how a script can verify it.

- **RULE** Headline 48-64px at 1440 is the default; to be distinctive, go to <=40px *or* >=84px, never in between. Cap fluid type (`clamp`) at 64px for default-range sites; sites above 80px scale with vw (Darkroom ~13.9vw, Pitch, Granola, Notion).
  **Why** 48-64 is the shared template zone (25% to 75% quartiles = 48 to 64). **Applies to** landing page. **Check** computed `font-size` of the hero headline. **Source** measured n=32.
- **RULE** Headline line-height 0.9-1.15 (median 1.07), never the 1.3+ body ratio. Below 0.95 only above ~64px (Pitch 0.8, Darkroom 0.8, Granola 0.93).
  **Why** large display type reads as a shape; leading is the gap between lines, which looks wider as size grows. **Check** `lineHeight / fontSize` on h1; flag >1.25. **Source** measured n=30, range 0.8-1.25.
- **RULE** Headline tracking -0.02em as default, tightening to -0.04..-0.06em for big/regular-weight display (Vercel -0.06 at 64px/400; Notion -0.048 at 96px/600; Resend h2 -0.05 at 56px). Positive tracking only for uppercase/mono/labels (Rive +0.01, TBC +0.15em, Darkroom labels).
  **Why** large type opens up optically; tight tracking restores density. **Check** `letterSpacing / fontSize` on h1/h2. **Source** measured n=30, median -0.021, IQR -0.04..0.
- **RULE** h2 about 0.74x the h1 (IQR 0.64-0.81); absolute median 44px (range 24-56). Section heading size changes <=1 step across the page (Linear: 48 on all four chapters).
  **Check** h2/h1 and distinct h2 sizes per page. **Source** measured n=25.
- **RULE** Hero lede 16-20px (median 18), lh 1.3-1.5, colour at 60-70% of the ink (Linear `#8a8f98` on `#08090a`; Resend `#a1a4a5`); column 350-640px, not the container width.
  **Why** muted contrast makes the headline the first read. **Check** lede colour contrast vs headline (1.5-2.2x less). **Source** measured n=24 (min 14, max 26.7 Loom).
- **RULE** Nav height 64px (IQR 64-72; range 42-102 incl. banners), sticky or fixed, transparent or bg-matched, with a 1px hairline or `backdrop-filter: blur(16-20px)` *or* nothing; link text 13-16px at weight 400-500. Reserve tall navs (>=96) for brand devices (Arc's 96px blue bar).
  **Check** `getBoundingClientRect().height` of the fixed/sticky ancestor of `header`. **Source** measured n=25.
- **RULE** Hero primary CTA height 38-48px (median 41; range 34-58), 14-16px label, weight 400-600. Radius is one of {pill 7 of 22, 5-8px 7, <=4px 4, 9+px 4}. Pick one radius and use it for CTAs, inputs and chips together.
  **Check** CTA `height`, `border-radius`; consistent across button/input/chip. **Source** measured n=20/22.
- **RULE** Content container 1200-1360px at 1440 (median 1274, range 1048-1392), expressed as `max-width` ~1280 + 24-40px side padding. Narrow text columns inside it: hero text 480-740px.
  **Check** width of h1 ancestor chain. **Source** measured n=29.
- **RULE** Section vertical padding 96-128px (median 104, range 60-160); the set clusters on 96 / 120 / 128 / 160. Keep it uniform across sections (Resend 96 x9, Linear 128 x4 with near-identical section heights 1220-1232px, Framer 120).
  **Check** padding-top/bottom of top-level `section`s; stdev across them. **Source** measured n=25 (effective top gap).
- **RULE** Card radius 8-16px (median 12; 29 sites: min 4, max 24); controls 4-8px; pills only for chips/CTAs. Nested radius = outer minus padding.
  **Check** histogram of `border-radius` on elements >180x100. **Source** measured n=29.
- **RULE** Borders: 1px at 6-12% white on dark, `#e5e5e5`-class on light; shadows only for floated media/popovers (Cursor `0 28px 70px .14`; Stripe `0 30px 45px -30px` tinted `50,50,93`).
  **Check** count of non-"none" box-shadow vs 1px borders. **Source** measured.
- **RULE** Type scale is small and sparse: 7-21 distinct font sizes sitewide (median ~11); Vercel uses 7, PostHog/Neon/Dub ~20.
  **Check** `new Set(computed font-sizes)`. **Source** measured n=40.
- **RULE** Pair a display voice with a mono or utility voice: a monospace face is loaded on ~25 of 38 sites (Linear Berkeley Mono, Cursor Berkeley, Vercel Geist Mono, Resend Commit Mono *outweighing* its body font, Rive/Tomorrow, Darkroom mono at weight 200).
  **Check** `@font-face` families. **Source** measured.
- **RULE** Motion: transitions 150-300ms (200ms is the mode), `ease-out` or a strong bezier: `cubic-bezier(.16,1,.3,1)` (Anthropic, Ramp, OpenAI), `(.22,1,.36,1)` (OpenAI, v0), `(.32,.72,0,1)` (Linear, Granola, Supabase), `(.25,1,.5,1)` (Stripe), `(.23,1,.32,1)` (Raycast, Locomotive), `(.33,1,.68,1)` (Clerk, Mercury). Reserve >=500ms for entrances and decorative loops.
  **Check** parse `transition-duration` and `-timing-function`. **Source** measured n=40 (top durations 200ms x31, 150 x26, 300 x21, 400 x8, 100 x8).
- **RULE** Responsive headline: size at 390px is 0.44-0.89x desktop (median 0.63x); big-type sites scale continuously (Notion 42 -> 89.7 @1024 -> 96; Granola 48 -> 68 -> 110; Darkroom 104 -> 142 -> 267) while default sites step and cap (Vercel/Linear/Stripe cap at 64/64/48 beyond 1440).
  **Check** h1 `font-size` at 390/1024/1440/1920. **Source** measured n=24. One site (Mercury) had horizontal overflow at 1024 and 1920: verify `scrollWidth <= innerWidth`.
- **RULE** Use `text-wrap: balance` on headings: present in 33 of 40 CSS bundles (Notion 84 uses, OpenAI 99, Vercel 41, Linear 28).
  **Check** computed `text-wrap` on h1/h2. **Source** measured.

## 3. Numbers and scales (1440 viewport, 2026-10-08)

Quartiles are 25th / median / 75th; "range" is min-max. n = sites with a readable value.

| Measurable | n | Min | Q1 | **Median** | Q3 | Max | Notes |
|---|---|---|---|---|---|---|---|
| H1 size (px) | 32 | 26 | 48 | **56** | 64 | 180 | excluding Pitch: max 96 |
| H1 weight | 32 | 300 | 400 | **~500** | 600 | 900 | modal 400 (9 sites) |
| H1 line-height (ratio) | 30 | 0.80 | 1.00 | **1.07** | 1.125 | 1.25 | |
| H1 letter-spacing (em) | 30 | -0.060 | -0.040 | **-0.021** | 0 | +0.010 | |
| H2 size (px) | 26 | 24 | 36 | **44** | 48 | 56 | h2/h1 ratio median 0.74 |
| Hero lede size (px) | 24 | 14 | 17 | **18** | 20 | 26.7 | |
| Nav height (px) | 25 | 42 | 64 | **64** | 72 | 102 | excludes banner-inclusive reads |
| Hero CTA height (px) | 20 | 34 | 38 | **41** | 48 | 58 | |
| CTA radius | 22 | 0 | 4 | **8** (or pill) | pill | pill | 7 pill, 7 at 5-8, 4 at <=4, 4 at 9+ |
| Container content width (px) | 29 | 1048 | 1200 | **1274** | 1360 | 1392 | |
| Section top padding (px, eff.) | 25 | 60 | 96 | **104** | 128 | 160 | mode set {96,120,128,160} |
| Card radius (px) | 29 | 4 | 10 | **12** | 16 | 24 | |
| Distinct font sizes per page | 40 | 1 | ~9 | **~11** | ~14 | 21 | |
| H1 at 390 / desktop | 24 | 0.44 | 0.57 | **0.63** | 0.71 | 0.89 | |
| Page height (px) | 40 | 900 | 6.3k | **~8.6k** | ~12k | 17.6k | app-first sites = 900 |

Categoricals (counts, n=38 unless stated):

| Dimension | Result |
|---|---|
| Default theme of hero | dark/saturated ~13, warm-neutral light ~10, cool/pure light ~15 |
| Custom/bespoke or paid headline family | ~30; stock Inter/Geist/Manrope-type ~8 |
| Serif in the headline | 9 (Resend, Granola, Descript, Mintlify, Railway, Anthropic statements, Ueno, Locomotive, TBC); 4 more load a serif for accents (Linear Tiempos, Raycast Instrument Serif, Cursor EB Garamond, Notion Lyon) |
| Mono face loaded | ~25 |
| Hero class | product proof ~14, campaign/art ~10, prompt-as-hero 3 (+3 hybrids Lovable/Replicate/Mintlify), editorial/typographic ~6, interactive/WebGL ~5 |
| Stack (detected) | Next.js 26/40, Tailwind-style utility classes 19/40, Framer-hosted 4 (Cal, Rive, Pitch, Framer), Webflow+GSAP 1 (Anthropic), Lenis 2 (Darkroom, Locomotive), three.js 1 (Resn). Undercounts bundled libs. |
| CSS features in bundles (of 40) | keyframes 39, backdrop-filter 37, clip-path 35, mask-image 35, mix-blend 34, `font-feature-settings` 34, prefers-reduced-motion 34, `text-wrap: balance/pretty` 33, `:has()` 33, color-mix 28, container queries 26, clamp 24, `@property` 23, scroll-driven animation (`animation-timeline`) 14, oklch 11, `@starting-style` 10, view-transition 7, `linear()` easing 5 |
| Hero media | video in/near hero ~14, canvas/WebGL ~15, static screenshot/illustration remainder |

Colour tokens worth keeping (as exact values seen):

| Pattern | Values |
|---|---|
| Dark near-black bg | `#08090a` (Linear), `#07080a` (Raycast), `#000`/`#010101` (Resend, Framer, Neon), `#13111c` (Railway, violet-black), `#171721` (Mercury, navy-black), `#390a1a` (Descript, wine) |
| Light bg | `#fafafa` (Vercel, Dub), `#fbfbfb` (Attio), `#f7f7f8` (Clerk), `#f4f4f4` (Cal) |
| Warm paper | `#f7f7f4` (Cursor), `#faf9f5` (Anthropic), `#f7f5f2` (Superhuman), `#fffcec` (Arc), `#eeefe9` (PostHog), `#eeeee7` (TBC), `#f7f7f2` (Granola) |
| Warm ink | `#26251e` (Cursor), `#141413` (Anthropic), `#27251e`-ish (Perplexity), `#292827` (Superhuman) |
| Dark text ramp (Linear) | `#f7f8f8` / `#d0d6e0` / `#8a8f98` / `#62666d` |
| Dark hairlines | `rgba(255,255,255,.06)` `.08` (Linear, Raycast, Railway .086) `.12`; Resend blue-tinted `rgba(214,235,253,.19)` |
| Neutral CTA | white pill on dark `#e5e5e6` / `#e6e6e6` / `#fff`; black pill on light `#171717` |
| Saturated CTA | `#533afd`, `#0075de`, `#1868db`, `#5266eb`, `#f73b3b`, `#5318eb`, `#553f83`, `#5b6f00`, `#f54e00`/`#cd8407` |

Spacing/radius token systems seen (copyable): Linear radius `4 6 8 12 16 24 32 9999 50%`; Raycast spacing `4 8 12 16 20 24 32 40 48 56 64` (`--spacing-0-5 .. -8`); Arc `--space-4 .. -72` and `--sizes-4`; Stripe heading tokens `--hds-font-heading-{xxs..}-{size,weight,lineHeight,letterSpacing}`; Notion `--tatami-border-radius-{200..800}` = `.25rem .3125 .375 .5 .625 .75 .875rem`.

## 4. How the distinctive sites differ from the median

Distinctive set used: Linear, Vercel, Stripe, Raycast, Resend, Cursor, Arc, Granola, Anthropic, Notion, PostHog, Pitch, Descript, Mercury, Rive, Superhuman, Figma (n=17) vs rest of SaaS (n=15).

| Axis | Median / "template" | What distinctive sites do |
|---|---|---|
| Headline size | 56px, 48-64 band | 9 of 17 outside the band (26-40 or 86-180px); rest 15: 4 |
| Headline tracking | -0.02em | *Not* a differentiator: rest-median is -0.03em, distinctive -0.02em. Tight tracking is now a template trait (Lovable, v0, Neon, Mintlify, Framer all -0.04). |
| Typeface | one sans + mono | bespoke cut, or pairing across roles: serif h1 + grotesk h2 + sans body + mono (Resend: domaine / ABC Favorit / Inter / Commit Mono) |
| Weight | 500-600 | 300-480 with fractional variable stops (Stripe 300, Mercury 480, Superhuman 460, Linear 510) |
| Surface | white or near-black | tinted: warm paper, wine/violet-black, butter cream, olive CTA; or full-viewport colour device (Arc blue bar, TBC blue frame) |
| CTA | 40px, 8px or pill, brand fill | inverted-contrast pill on dark; or oversize (Arc 76px, Loom 58px, Granola 56px, Railway 58px); or the CTA is a form/composer |
| Depth | soft shadow cards | hairline borders + ring/inset shadows (Raycast keycap), or nothing (Anthropic) |
| Hero proof | stock screenshot in a frame | a real component at scale (Clerk, Cal), IDE over a photo wallpaper (Cursor), custom WebGL (Stripe, Resend), OS metaphor (PostHog) |
| Copy volume | 2-3 line headline + lede + 2 CTAs | very little (Vercel: 2 words, Raycast: 4) or very quiet (Cursor 26px) |
| Motion budget | CSS hover/fade only | one authored hero asset (WebGL/video/canvas) + restrained CSS; custom bezier tokens |

Studio sites (Basement, Lusion, Resn, Darkroom, Locomotive, Ueno, TBC) differ by construction: radius ~0 on 6 of 7 (Lusion frames its 3D scene at 15px), full-bleed 12-col grids with 11-28px gaps and 16-40px page padding, display type 70-267px at lh 0.8-1.1 scaled in vw, nav 36-60px with 10-14px labels (or none), WebGL as the first screen, and CSS bundles 57-330KB (vs 350-3,200KB for SaaS). They show what to borrow for *brand* work, but their numbers should not be applied to a product marketing page.

## 5. Exceptions and judgement calls

- **Quiet vs loud is a real fork.** Cursor (26px, warm paper, screenshot) and Pitch (180px, lh 0.8, purple) are both distinctive. The failure mode is the middle: 56px, lh 1.15, weight 600, white, pill CTA, screenshot in a rounded frame.
- **Tracking is saturated.** Everything -0.04em looks like the same stack now; treat extreme tracking as a default to avoid unless the font is a display cut that needs it (domaine, Mark Pro, therma).
- **App-first is a legitimate hero** (OpenAI, Perplexity, v0, Lovable). It trades visual authorship for immediate utility; it only works if the product *is* a single input.
- **Median section padding hides two systems:** uniform-padding sites (Resend 96, Framer 120, Linear 128) vs margin-based rhythm (Vercel `mt-40`, Cursor 4.2rem tokens). Prefer uniform; if copy density varies, vary h2 size, not padding.
- **Radius:** 12px is the card median, but scaled-rem oddities (Supabase 10.667/21.333, OpenAI 6.08, Descript 4.75) show radii often derive from a rem/scale factor; mixed values within one site are normal, mixed *families* (pill + 4px + 24px) without a rule are not.
- **Nav height reads need context:** announcement bars are in the same wrapper on Attio (116), Ramp (102), Loom (150), Pitch (124).
- **Stock font is fine when the system is strict** (Linear Inter Variable + 510 weight + 8%-white borders; Vercel Geist at 400/-0.06em). Typeface alone is not a differentiator; typeface + weight + tracking + surface is.
- `[engine note]` Hero classes and "distinctive" labels are my judgement; the numbers are measured. n for CTAs is small (hero buttons were often not the first matching element or lived in a cookie banner).

## 6. Signature-moves catalogue

Each move: **what**, **where**, **how implemented**, **borrow when**.

1. **Regular-weight, ultra-tight display headline**
   What: 400-weight, lh 1.0, -0.06em headline reads as architecture rather than emphasis.
   Where: Vercel (64px/400/-0.06em), Notion (96px/-0.048em), Resend h2 (-0.05em).
   How: `font-weight:400; line-height:1; letter-spacing:-.06em` in em; `text-wrap:balance`; works because the face has tight metrics (Geist, NotionInter).
   Borrow when: dev-tool/infra tone, short headline (<=4 words per line), light mode with plenty of white.
2. **Fractional variable-font weights**
   What: weights like 320/330, 360/420/480, 460/540, 510/590 tune the page's "temperature".
   Where: Linear 510/590, Mercury 480, Superhuman 460, Figma 320-330, Supabase 450, Vercel 450.
   How: variable font file (`font-weight` accepts any 1-1000); define tokens `--w-body:420; --w-ui:510; --w-head:590`.
   Borrow when: you want "premium but not corporate"; needs a variable font licence.
3. **Serif display over sans UI**
   What: one serif for the hero/statements, sans for interface; produces warmth next to product screenshots.
   Where: Resend (domaine 96px), Granola (quadrant 86-110px), Descript (gamuth 88px), Mintlify (arizonaFlare 50px), Railway (Plex Serif 54px), Anthropic (Serif statements 80px, 24px body).
   How: separate `--font-display` token; apply only to h1/h2/pull quotes; keep buttons, nav, labels in sans/mono.
   Borrow when: the product is about thinking/writing/communication or the brand wants human warmth; avoid for dense data products.
4. **Warm-paper + warm-ink palette**
   What: tinted off-white background and warm near-black text instead of `#fff`/`#000`.
   Where: Cursor `#f7f7f4/#26251e`, Anthropic `#faf9f5/#141413`, Superhuman `#f7f5f2`, Arc `#fffcec`, Granola cream, TBC `#eeeee7`, PostHog `#eeefe9`.
   How: set neutral hue ~85-107 at chroma .003-.01 in oklch (Lovable uses hue 107 for all greys), text at 50/60% alpha of the ink via color-mix rather than separate greys.
   Borrow when: AI/knowledge/creative tools wanting calm; check contrast (ink at 60% on cream is ~5:1).
5. **Hairline-border depth (no shadows)**
   What: depth via 1px translucent borders, ring shadows and inset highlights.
   Where: Linear `1px rgba(255,255,255,.08)` x61; Railway `.086` x409; Raycast ring `0 0 0 1px` + inset; Resend `rgba(214,235,253,.19)`; Anthropic none at all.
   How: `border:1px solid rgb(255 255 255 / .08)`; chips `box-shadow: 0 0 0 1px var(--line), inset 0 1px 0 rgb(255 255 255 / .06)`; surfaces differ by 1-2% lightness (`#08090a` vs `#0f1011`).
   Borrow when: dark UI marketing; needs consistent borders on every container (otherwise it looks unfinished).
6. **Negative-spread tinted lift shadow**
   What: a shadow offset downward with negative spread so it appears only under the object, tinted toward the brand hue.
   Where: Stripe `rgba(50,50,93,.25) 0 30px 45px -30px, rgba(0,0,0,.1) 0 18px 36px -18px`; Cursor `rgba(0,0,0,.14) 0 28px 70px, .1 0 14px 32px`; Pitch coloured glow `rgba(198,165,255,.35) 0 20px 60px -20px`; Attio blue-tinted.
   How: two layers (far soft + near tight), blur 1.5-2x offset, spread = -(offset/1.5).
   Borrow when: floating a product screenshot/card over a page; never on dark.
7. **Product UI as the only ornament**
   What: no illustration; a dense, believable app slab sliced at the fold carries the hero.
   Where: Linear, Clerk (live components), Cursor, Attio, Mintlify, Cal (working booking widget), Framer.
   How: real DOM or high-DPR screenshot at 1100-1300px wide, top radius 12, 1px border, hero text column 480-740px; crop at viewport bottom so it implies more.
   Borrow when: the UI is the differentiator and is attractive at 1x; avoid when the UI is generic tables.
8. **Whisper-small headline**
   What: a 24-32px headline with a huge product shot; quiet confidence.
   Where: Cursor 26px, Replicate semantic h1 24px, TBC 28px, OpenAI 28px, v0 32px.
   How: headline at 1.25 lh, body-adjacent size, spacing carries emphasis (gap 24-40px), CTA hard under it.
   Borrow when: audience is technical and the product is known; do not use when the value prop needs persuasion.
9. **Inverted-contrast primary CTA**
   What: the highest-luminance element on the page is the button (white pill on near-black, black on light) with no brand hue.
   Where: Linear `#e5e5e6`, Neon `#fff`, Raycast `#e6e6e6`, Vercel, Dub/Replicate/Figma (black).
   How: 32-44px pill/8px radius, 13-16px/500 label, no shadow; accent colour reserved for data/links.
   Borrow when: the page has colourful imagery that would clash with a coloured button.
10. **One saturated accent used only on actions/links**
    What: single hue (indigo, blue, purple) appears on buttons and links only.
    Where: Stripe `#533afd`, Notion `#0075de`, Loom `#1868db`, Mercury `#5266eb`, Pitch `#5318eb`.
    How: token ramp 25-700 with alpha variants (Stripe `--hds-color-core-brand-*`); fill 500-600, hover 700.
    Borrow when: default choice for B2B; ensure 4.5:1 for white label on fill.
11. **Colour as architecture (frame/bar)**
    What: a saturated bar or full-viewport frame is the navigation and brand device.
    Where: Arc (96px `#3139fb` top bar, 29% of page area), TBC (viewport border `#0c50ff`).
    How: `position:fixed` bar/frame with brand fill; links inside at 14px/500 white; page body stays cream.
    Borrow when: consumer/product brand with one strong colour; skip for enterprise.
12. **Display type that scales with the viewport**
    What: headline in `vw` so it dominates every width.
    Where: Darkroom 104 -> 142 -> 267px (13.9vw, lh 0.8, -0.05em), Pitch 82 -> 171 -> 180, Granola 48 -> 68 -> 110, Notion 42 -> 90 -> 96, Basement 46 -> 87 -> 98, Locomotive 36 -> 50 -> 79.
    How: `font-size: clamp(2.5rem, 12vw, 12.5rem)`; paired with lh .8-.93 and negative tracking; hero must be one or two words per line.
    Borrow when: a short headline and a brand-first page; test at 390 for overflow (Mercury overflowed at 1024/1920).
13. **Single-colour monochrome system**
    What: one hue for all text and borders on black.
    Where: Darkroom (red on black), Basement (white on black), Rive (greys + one panel).
    How: `--color-primary` used for text, borders and fills; no greys, only opacity steps.
    Borrow when: studio/portfolio/brand pages; hard for product UI states.
14. **Mono as the working voice**
    What: monospace for nav, labels, metadata, UI chrome, even body.
    Where: Resend (Commit Mono carries more characters than Inter), Linear/Cursor (Berkeley Mono), Replicate (JetBrains Mono body 14px), Darkroom (mono weight 200), TBC (Diatype Mono uppercase +0.15em).
    How: `--font-mono` for `kbd`, tags, eyebrow, tables; 11-14px; uppercase + 0.1-0.15em tracking for labels.
    Borrow when: dev/AI/infra products or editorial "specimen" brands.
15. **Prompt-as-hero**
    What: the primary CTA is a working composer; headline is a question.
    Where: OpenAI ("What can I help with?" 28px), Perplexity (24px), v0 (32px), Lovable (composer on gradient).
    How: centered input card radius 16-24, 70-120px tall, chips below (pill, 32-40px), gradient or off-white behind; headline 24-48px -0.04em.
    Borrow when: a single natural-language input is the product; do not fake it.
16. **Ambient hero media behind text**
    What: WebGL/canvas/video loop behind a short headline.
    Where: Stripe (WebGL gradient ribbon), Resend (3D glass cube), Mercury (cinematic landscape), Neon (aurora video), Raycast (red 3D stripes), Lovable (gradient blob).
    How: absolutely-positioned `<canvas>`/`<video muted playsinline>` under 1 text column; text colour fixed; `prefers-reduced-motion` poster fallback.
    Borrow when: brand needs emotion and the asset is bespoke; costs: 350KB-1MB+ CSS/JS and a poster-first load.
17. **Uniform chapter rhythm**
    What: sections of identical padding and near-identical height create a metronome.
    Where: Linear (four sections at 128/128 and 1220-1232px tall), Resend (96/96 x9), Framer (120/120), Figma (80/80).
    How: `section{padding-block:var(--section)}` + sticky left text column and scrolling media; h2 same size every time.
    Borrow when: feature-tour pages; vary only content, not rhythm.
18. **Visible layout grid / blueprint lines**
    What: 1px borders drawn on every container, corner crosses, grid cells exposed.
    Where: Dub (262 elements with `1px #e5e5e5`), Railway (409 outlined), Stripe dashed `1px #362baa` diagram accents.
    How: border on every card/cell; gap 0 with shared borders; `grid-template-columns` 4-12.
    Borrow when: infra/analytics tone; disciplined alignment required.
19. **Keycap / inset-highlight buttons**
    What: buttons look pressed-in or raised via 1-2px rings plus an inset top highlight.
    Where: Raycast (`0 0 0 1px` ring + inset ring + `0 1.5px .5px 2.5px rgba(0,0,0,.4)`), Attio (`inset .2px .2px 2px rgba(255,255,255,.1)` + `0 1.5px 1.5px rgba(0,0,0,.25)`), Cal (`inset 0 2px 0 rgba(255,255,255,.15)`).
    How: layered box-shadow only; no gradient.
    Borrow when: tool/launcher brands where tactility = keyboard.
20. **OS / metaphor shell**
    What: the site is a desktop operating system.
    Where: PostHog (dock rail, windows, hedgehog art, RoundHog 800).
    How: fixed left dock nav, window chrome around sections, custom illustration set; beige `#eeefe9`.
    Borrow when: playful brand that wants friction-free exploration; high build cost.
21. **Accent on the second headline line**
    What: second line of the headline switches to the brand colour or lower contrast.
    Where: Supabase ("Scale to millions" in green), Stripe (headline's last clause), Linear (`h2` first sentence in `#8a8f98`).
    How: `<span class="text-accent">` inside the h1; same size/weight; keep contrast >=3:1 for large text.
    Borrow when: two-part value prop ("Build ... / Scale ...").
22. **Fractional-rem scaled radii and spacing**
    What: radii that derive from a global scale factor (10.667, 21.333; 6.08; 4.75) so proportions hold at any root size.
    Where: Supabase, OpenAI, Descript, Loom (41.7/68.9 squircles from a 1.04x unit).
    How: radius in `rem` multiplied by a CSS variable; one base unit drives padding, radius, font size.
    Borrow when: a design that must scale as a unit; otherwise stick to a px token set (Linear 4/6/8/12/16/24/32).
23. **Oversize friendly CTA**
    What: 56-76px button, 20-24px label, extra horizontal padding.
    Where: Arc (76px, radius 22, 24px label), Loom 58px, Railway 58px (20px label), Granola 56px olive pill, Descript 56px.
    How: `height:56-76px; padding-inline:24-32px; font-size:20-24px; radius ~ height/3.5`.
    Borrow when: consumer/prosumer brand with one action; drop for dense enterprise pages.
24. **Announcement chip above the headline**
    What: a 24-30px pill with release/news sits above h1.
    Where: Cal ("Cal.com launches v6"), Resend ("Join us at Resend Forward"), Mintlify (agent-traffic chip), Dub, Attio banner.
    How: inline-flex pill, 12px text, border 1px, radius full, arrow glyph; links to changelog.
    Borrow when: a shipping cadence is part of the brand.
25. **Authored scroll motion with plain-CSS transitions**
    What: custom-bezier tokens for micro-interactions; scroll effects through JS or `animation-timeline`.
    Where: Stripe `cubic-bezier(.25,1,.5,1)` x40 with 7 scroll-timeline rules; Notion 29 scroll-timeline rules; Granola 19; Linear view-transitions and `(.32,.72,0,1)`; Lusion 32 uses each of two custom beziers.
    How: define `--ease-out: cubic-bezier(.16,1,.3,1)` or `(.32,.72,0,1)`, durations 160/200/300ms; wrap in `@media (prefers-reduced-motion: no-preference)`.
    Borrow when: always (cheap); use scroll-timeline only with a fallback (14 of 40 sites use it).

## 7. Open questions, gaps, how to re-measure

- **Gaps:** hero CTA data missing for Clerk, Anthropic, Pitch, Cursor (header only), Raycast/Cal nav, Lusion/Resn type. Hero "primary CTA" inference picks the first non-header filled/outline button; cookie-banner buttons occasionally polluted the list and were hand-filtered.
- **Not measured:** line length (ch) in body copy, image-to-text area ratio, scroll-linked effects behaviour (needs interaction), dark/light toggle states, hover/focus styles, Lighthouse/CWV, actual page weight. Page-height numbers include lazy-loaded content after a 700px-step scroll.
- **Sampling bias:** all 38 are famous, venture-backed, English-language sites; distribution is skewed toward developer/AI tools (24 of 32). Consumer/finance/health marketing patterns are under-represented (Mercury, Ramp, Loom, Granola only).
- **Dated:** measured 2026-10-08. Sites that changed during 2025-26 (Cursor homepage rebuilt, Arc pivot to Dia, Notion "Jam", Linear "agents" headline) will move again; keep this file's date and re-run before using a number as a hard target.
- **Re-measure:** `node knowledge/web/teardown-measure.js <sites.json>` where `sites.json` = `[{"id":"linear","url":"https://linear.app"}, ...]`. Requires `playwright-core` and a Chromium path (edit `EXE`); writes `out/<id>.json` + `out/<id>.png`. It measures computed type, nav, CTAs, container chain, sections (CSS and effective padding), radius/shadow/border/grid histograms, bg-by-area colours, captured-CSS analysis (durations, easings, features, `:root` vars) and h1/nav at 1920/1024/390.
- **Ideas to add to the engine (not yet done):** a `tools/` check that scores a generated page against the section-3 quartiles and flags "everything median" (all of h1 48-64, container 1200-1360, section pad 96-128, CTA 38-48 / 8px, card radius 12) with no tail axis; a "tail axis" picker for the direction step (choose 2-4 of: headline size tail, typeface, weight, surface tint, hero class, CTA form).
