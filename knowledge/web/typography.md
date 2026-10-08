---
source: web:utopia.fyi, practicaltypography.com, developer.mozilla.org, web.dev, developer.chrome.com, smashingmagazine.com, w3.org/WCAG22, baymard.com, typewolf.com, fonts.google.com/metadata, api.fontshare.com, rsms.me/inter, github.blog, live-site measurements (Playwright/Chromium, Oct 2026)
chapter: Typography for web, SaaS and landing pages
pages: n/a (web research)
topic_tags: [typography, type-scale, fluid-type, clamp, line-height, letter-spacing, measure, optical-size, variable-fonts, font-loading, CLS, tabular-nums, text-wrap, font-pairing, hierarchy, ai-tells]
status: studied
companion: knowledge/web/font-catalogue.md
---

# Typography for web, SaaS and landing pages

Evidence tags used below:
- **[M]** measured by me on the live site with headless Chromium, computed styles, viewports 1440x900 and 390x844, Oct 2026. Sample: 27 SaaS/product/consumer marketing sites loaded (Linear, Vercel, Stripe, GitHub, Notion, Figma, Resend, Cal.com, Supabase, Anthropic, Framer, Raycast, Ramp, Mercury, PostHog, Clerk, Cursor, Attio, Apple, Tailwind, Basecamp, Every, Substack, Duolingo, Intercom, Arc, Superhuman; OpenAI blocked bots), of which 20 had a clean hero H1 and form the aggregates (n=20). Marketing pages change; re-measure before citing a specific number as "what X does today".
- **[P]** read in a primary source (spec, MDN, vendor docs, the book itself) during this research.
- **[S]** secondary/third-party summary; plausible but not verified against the primary.
- **[E]** `[engine note]` my own design judgement, not from a source.

## 1. Core ideas

1. **Hierarchy is mostly the size jump between H1 and body, then weight and tone.** Across 20 sites at 1440px the H1 is a median 64px (range 42-96, IQR 54.5-64) against 16-18px body, i.e. roughly 3.5x. At 390px the median H1 is 38px (range 27.5-64); the mobile H1 is a median 0.62x of the desktop H1 (0.38-0.75). [M]
2. **Display and text are two different typographic jobs.** Display (>=40px): leading 0.9-1.15 (median 1.0), tracking negative (median -0.024em, down to -0.06em), weight usually 400-600 (median 500, range 300-800). Text (14-20px): leading 1.4-1.65, tracking ~0. Using one setting for both is the most common amateur tell. [M]
3. **Tracking is a function of size.** Inter's published "dynamic metrics" curve is `letter-spacing = -0.0223em + 0.185em * e^(-0.1745 * fontSizePx)`; it gives +0.0048em at 11px, -0.011em at 16px, -0.0195em at 24px and flattens at -0.0223em from ~48px up. Linear's 64px H1 measures -0.022em (-1.408px), which sits on that asymptote. Apple.com body 17px measures -0.022em (-0.374px) with SF Pro Text. [P: inter-metrics npm example 16px -> -0.011; the constants are from memory of the Inter dynamic-metrics page, which now 404s, but reproduce the npm example] [M]
4. **Fluid type is interpolation between two fixed type scales.** Utopia's method: pick a scale at a small viewport (e.g. 1.2 at 320px) and one at a large viewport (1.333 at 1500px) and let the browser interpolate. In CSS this is `clamp(minRem, interceptRem + slopeVw, maxRem)`. [P]
5. **A `clamp()` must contain a rem term and respect max <= 2.5 x min** or it risks failing WCAG 1.4.4 (zoom to 200% via 500% browser zoom). A vw-only size guarantees a failure (F94). [P: Roselli; Barvian/Smashing]
6. **Measure (line length) is 45-90 characters including spaces** (Butterick), with 50-75 the common web target (Baymard, crediting Emil Ruder 50-60). [P]
7. **Weight and colour carry hierarchy more cheaply than size**, and variable fonts allow in-between weights. Shipped examples of fractional weights: Linear 510, GitHub H1 425/440, Figma body 330/340, Superhuman 460/540, Supabase body 450. [M]
8. **Most SaaS stacks are one workhorse sans plus one mono.** Of the sites measured: Linear (Inter + Berkeley Mono), Vercel (Geist + Geist Mono), Stripe (Sohne + Source Code Pro), GitHub (Mona Sans + Mona Sans Mono), Figma (figmaSans + figmaMono), Intercom (Saans + Saans Mono), Tailwind (Inter + IBM Plex Mono), Raycast (Inter + Geist Mono/JetBrains Mono), Supabase (Manrope + Inter + Source Code Pro), Cal.com (Cal Sans + Inter + mono). A serif display over a sans body is the "editorial-tech" move: Resend (Domaine 96px/1.0 over Inter), Every (Signifier 64px/0.9), Anthropic (serif body 20px + sans headline), Notion (Lyon Text accents). [M]
9. **The "same grotesk everywhere" problem is a decision problem, not a font problem.** An Inter-only page with tuned weight (510), tracking (-0.022em) and a 64px H1 reads as authored (Linear); the same font at default tracking, a 12/14/16/18/24/30/36/48/60/72 ladder and a centred hero reads as generated. A scan of ~1,590 Show HN pages (headless Chromium + computed-style checks) put 22% in the "4+ AI patterns" tier, with Inter-for-everything, Space Grotesk/Instrument Serif/Geist combos and "serif italic accent word in an otherwise-Inter hero" among the listed type patterns. [S: adriankrebs.ch]
10. **Font loading is a layout problem first.** Self-hosted WOFF2, preload only the 1-2 faces used above the fold, `font-display: swap` plus a metric-matched fallback (`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`). Real shipped fallbacks for Inter over Arial: `size-adjust 107.12%; ascent-override 90.44%; descent-override 22.52%; line-gap-override 0%` (Supabase) and `107.89% / 89.79% / 22.36% / 0%` (Tailwind). [M] [P: Chrome font-fallbacks formulae]
11. **Modern CSS removes most hand-tuning**: `text-wrap: balance` (headings), `text-wrap: pretty` (paragraphs), `font-variant-numeric: tabular-nums`, `hanging-punctuation` (Safari only), `text-box-trim` (leading trim), `font-optical-sizing: auto` (default). [P]
12. **Typography signals before the copy is read**: serif-led = editorial/craft/trust, grotesk + mono = tech, geometric rounded = friendly/consumer, heavy condensed = loud/sports, handwritten = human/playful. Use the signal on purpose (section 3.14).

## 2. Rules

Each rule: **RULE** / **Why** / **Applies to** / **Check** / **Source**. IDs are stable so `ledger/` can cite them.

### 2.1 Scale and hierarchy

- **RULE T-SC-01** Build a hand-set scale of 6-9 sizes seeded from a ratio, then adjust by eye. Landing/marketing: 1.2 at 360px interpolating to 1.333 at 1440px. Product UI: 1.125-1.2, fixed px steps. Never ship a ladder that is purely the framework default.
  **Why** Ratios give coherence; hand adjustment gives fit (Refactoring UI advocates hand-picked scales over calculated ones [S]). Utopia's default pair is 1.2 -> 1.333 [P].
  **Applies to** all. **Check** collect distinct computed `font-size` across visible text; 6-12 distinct values expected (more than 12 = T04b; all on the Tailwind ladder 12/14/16/18/20/24/30/36/48/60/72/96 with >=8 values = T04). **Source** utopia.fyi; section 3.1.
- **RULE T-SC-02** Limit any single component to 2-3 font sizes and 2-3 weights.
  **Why** More levels inside a card blur which element matters. **Applies to** all. **Check** per card/section container, count distinct (size, weight) pairs <= 4. **Source** [S] Refactoring UI; [E].
- **RULE T-SC-03** H1:body ratio on desktop >= 2.5 (typical 3-4), mobile >= 2.0; H2:body >= 1.6; H1:H2 >= 1.25.
  **Why** Measured median H1 64px vs body 16-18px = 3.6-4.0x; below ~2.2x the page reads as flat (impeccable "flat type hierarchy" rule). **Applies to** landing. **Check** `getComputedStyle(h1).fontSize / median(p).fontSize`. **Source** [M] [S: impeccable.style/slop].
- **RULE T-SC-04** Body text: 16px minimum on mobile; 16-20px on desktop landing pages; app UI body 14px (13px dense tables), never below 12px except caps labels (11px). Inputs 16px on iOS to prevent focus-zoom.
  **Why** Butterick: web body 15-25px; shipped marketing body measured 16-20px (GitHub 18/27, Resend 18/27, Notion 20/28, Tailwind 16/28). **Applies to** all. **Check** median computed size of `p` with >100 chars; any `font-size < 11px` text. **Source** practicaltypography.com/point-size.html [P]; [M].
- **RULE T-SC-05** Weights: use <= 4 distinct weights per page; 400 body, 500 UI/emphasis, 600 headings; avoid <=300 below 18px and >=800 for anything except display.
  **Why** Thin weights fail at small sizes on low-DPI/dark UI; Refactoring UI warns against 300 and 800+ for UI [S]. Exceptions: Stripe ships 300 at 16-22px with a custom face designed for it [M]. **Applies to** all. **Check** distinct `font-weight` among text elements <= 5; flag weight<=300 with size<16. **Source** [S] [M].
- **RULE T-SC-06** Make secondary information lighter in tone before making it smaller: three text tones (primary, secondary, tertiary), every tier >= 4.5:1 against its background (3:1 only for >=24px, or >=18.66px bold).
  **Why** Size steps add scale-bloat; tone keeps the grid tight. **Applies to** all. **Check** contrast ratio of each text colour. **Source** WCAG 1.4.3 [P]; [E].
- **RULE T-SC-07** Uppercase only for labels of <= 3 words (<= ~25 chars), always with +0.05 to +0.12em letter-spacing; never for sentences or paragraphs.
  **Why** Caps are set tight by default; Butterick: add 5-12% to all caps/small caps, and headings should not be all caps. **Applies to** all. **Check** `text-transform: uppercase` elements: letter-spacing/font-size >= 0.04, text length <= 30. **Source** practicaltypography.com/letterspacing.html, /headings.html [P].
- **RULE T-SC-08** Heading levels in prose: <= 3; make headings stand out with space (more above than below, ~1.5-2:1) before adding bold or caps. Butterick: headings need only a small size bump (12 -> 12.5-13pt) in print; on web landing pages the jump is larger because headings double as display.
  **Why** Space groups; the heading belongs to what follows. **Check** `margin-top / margin-bottom` of h2/h3 >= 1.4. **Source** practicaltypography.com/headings.html [P]; ratio [E].

### 2.2 Fluid type with clamp()

Let `minVw`, `maxVw` be the viewport range (px), `minPx`, `maxPx` the sizes. Then
`slope = (maxPx - minPx) / (maxVw - minVw)`, `slopeVw = slope * 100`, `interceptPx = minPx - slope * minVw`, and
`font-size: clamp(minPx/16 rem, interceptPx/16 rem + slopeVw vw, maxPx/16 rem)`.
Example (body, 360 -> 1440, 16 -> 18): slope 0.001852; `clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)`; gives 16.1px at 390, 16.8 at 768, 17.2 at 1024, 18 at 1440. Utopia's own body example (320 -> 1500px, 17 -> 20px) reduces to `clamp(1.0625rem, 1.0117rem + 0.2542vw, 1.25rem)`. [P]

- **RULE T-FL-01** The preferred value must combine a rem (or em) term and a vw term; never `font-size: 5vw`.
  **Why** vw ignores user zoom/default-size; Roselli measured a vw heading growing only 64 -> 68px at 200% zoom and calls it a guaranteed WCAG failure (1.4.4, F94). **Applies to** all. **Check** regex: computed clamp contains `rem|em` and `vw`; no bare `vw` font-size. **Source** adrianroselli.com/2019/12/responsive-type-and-zoom.html [P].
- **RULE T-FL-02** Keep `maxPx <= 2.5 * minPx` for every fluid token.
  **Why** Barvian derives it from z5(v) >= 2 z1(v): 2*maxFont <= 5*minFont. 16 -> 40 passes, 16 -> 48 can fail. **Applies to** all. **Check** parse clamp: max/min <= 2.5. Still test at 200% and 500% zoom in Chrome and Firefox (Safari can differ). **Source** smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type [P].
- **RULE T-FL-03** Make display and headings fluid (H1, H2, H3, lead, stat figures); keep body to a gentle 16 -> 18; keep product-UI text and controls fixed in px/rem.
  **Why** Display is where viewport changes matter; UI density should not breathe. **Applies to** landing (fluid), SaaS app (fixed). **Check** computed H1 at widths 360/480/768/1024/1440: >= 4 distinct values (fluid) vs stepped. **Source** [E]; shipped sites mostly step at breakpoints (Notion 96 -> 42, Vercel 64 -> 48).
- **RULE T-FL-04** Pick tokens (section 3.2) rather than ad-hoc clamps; one source of truth in `:root`.
  **Check** count of distinct `clamp(` literals in CSS <= 10. **Source** [E].
- **RULE T-FL-05** Use `rem` for the bounds and avoid `min()`/`max()` caps lower than 2x base for body copy (Roselli's minimum-conformance floor is a max of at least twice the base size).
  **Source** adrianroselli.com [P].

### 2.3 Line-height and letter-spacing by role

- **RULE T-LH-01** Display (>=40px): line-height 0.95-1.15 unitless (median 1.0). Headings 24-40px: 1.1-1.25. Lead 18-24px: 1.3-1.5. Body 16-20px: 1.5-1.65 (landing) or 1.4-1.5 (dense UI). Small/caption 12-14px: 1.4-1.5. Buttons/badges: 1.0-1.25.
  **Why** Large type needs proportionally less leading; Butterick's single rule is 120-145% for body; Refactoring UI gives 1.5-1.75 body, 1.2-1.3 headings, 1.0-1.2 UI [S]. Measured H1 leading median 1.0 (0.9-1.15), mobile 1.1 (0.9-1.17); measured body 1.5-1.75. **Applies to** all. **Check** `lineHeight / fontSize` per role; flag H1 > 1.25 at >=40px (loose) and body < 1.3 or > 1.85. **Source** [P] [M].
- **RULE T-LH-02** Always unitless `line-height`; never `line-height: normal` for authored text.
  **Why** Unitless scales with inheritance; `normal` varies per font (Raycast body measured `normal`, 18px). **Check** computed `line-height !== 'normal'`. **Source** practicaltypography.com/line-spacing.html [P].
- **RULE T-LH-03** Add ~0.05-0.1 leading for: lines > 70ch, fonts with large x-height (>0.54), and light-on-dark text; remove ~0.05 for small x-height serifs (<0.45).
  **Why** Butterick: fonts that appear large need more spacing. **Check** visual. **Source** practicaltypography.com/line-spacing.html [P]; amounts [E].
- **RULE T-LS-01** Tracking by size (em): <=12px +0.005 to +0.02; 14-16px 0 to -0.011 (Inter dynamic metrics -0.006 at 14, -0.011 at 16); 18-24px -0.014 to -0.02; 32-40px about -0.022; >=48px -0.02 to -0.05; never tighter than -0.06em.
  **Why** Glyph spacing is drawn for text sizes; at display sizes the same gaps look loose. Measured H1 tracking: Notion 96px -0.048em, Tailwind 96px -0.05, Vercel 64px -0.06, GitHub 64px -0.035, Framer 54px -0.04, Intercom 80px -0.03, Figma 56px -0.022, Linear 64px -0.022, Stripe 48px -0.02, Resend serif 96px -0.01; some ship 0 (Cal Sans, Raycast, Anthropic, Supabase). **Applies to** all. **Check** `letterSpacing / fontSize` per role; flag display with 0 and any < -0.06. **Source** [M] [P: inter-metrics].
- **RULE T-LS-02** Uppercase/small-caps/labels: +0.05 to +0.12em. Lowercase body: 0 (positive tracking on lowercase only below ~9pt, or never on web). Mono: 0.
  **Why** Butterick. **Check** as T-SC-07. **Source** practicaltypography.com/letterspacing.html [P].
- **RULE T-LS-03** If the font has an optical-size axis, let `font-optical-sizing: auto` do the work and use less manual negative tracking (a display opsz cut is already tighter).
  **Why** Avoid double-tightening. Inter (opsz 14-32 on Google Fonts), Bricolage (12-96), Fraunces (9-144), Newsreader (6-72). **Check** compare computed `font-variation-settings`/opsz and letter-spacing. **Source** Google Fonts metadata [P]; [E].

### 2.4 Measure

- **RULE T-ME-01** Body paragraphs: 45-90 characters per line, target 60-70; implement as `max-width: 65ch` (or 36-42em) on the text column, not on the container.
  **Why** Too wide: hard to find the next line; too narrow: eye travels back too often (Baymard). **Applies to** all long-form; hero subheads 35-55 characters. **Check** canvas-measure average glyph width and divide the paragraph width; flag > 90 or < 30 (desktop). **Source** practicaltypography.com/line-length.html, baymard.com [P].
- **RULE T-ME-02** Headlines: aim for 2-3 lines on desktop and <= 4-5 on mobile; with `text-wrap: balance`. Set a max-width that gives ~18-35 characters per line at desktop and 12-20 at mobile.
  **Why** One-word runts and 6-line mobile headlines weaken the hero. Measured at 390px a 38px H1 gets ~19 characters per line (343px wide). **Check** line count via range rects. **Source** [M] [E].
- **RULE T-ME-03** Centre-aligned text only for <= 3 lines / <= ~60ch (heroes, CTAs, short quotes); left-align everything longer. Justify only with `hyphens: auto` and `lang` set.
  **Why** Centring removes the left reading edge; justify without hyphenation creates rivers. **Check** `text-align:center` on `p` > 200 chars; `text-align: justify` with `hyphens !== auto`. **Source** [E]; practicaltypography.com/headings.html (don't centre) [P].

### 2.5 Numerals and tabular figures

- **RULE T-NU-01** Any number that is compared, summed, animated, or aligned (tables, prices, KPIs, timers, counters, version numbers) uses `font-variant-numeric: tabular-nums`; running prose keeps proportional lining figures.
  **Why** Equal-width digits stop columns jittering when values change. **Applies to** SaaS app, pricing, dashboards. **Check** numeric-only cells without `tabular-nums` and not in a mono face. **Source** MDN font-variant-numeric [P] (Baseline since Jan 2020).
- **RULE T-NU-02** Verify the chosen face has tabular figures (catalogue field `tnum`: `default` = digits already tabular, `yes` = feature works, `not-detected` = not in the served web font); if absent, set numbers in the mono face.
  **Why** The property is ignored if the font lacks `tnum`. Measured: Inter, Geist, Manrope, Plus Jakarta, Satoshi, Source Serif work; DM Sans, Instrument Serif, Playfair Display, Fraunces, General Sans do not (as served). **Source** [M] font-catalogue.md.
- **RULE T-NU-03** Use `slashed-zero` in IDs/codes/mono, `lining-nums` default in UI, `oldstyle-nums` only in serif prose; `ordinal`/`diagonal-fractions` when the font supports them.
  **Source** MDN [P].

### 2.6 Wrapping, punctuation, spacing details

- **RULE T-WR-01** `h1, h2, h3, h4, figcaption, blockquote, .lead { text-wrap: balance; }`
  **Why** Balances line lengths; limited to <= 6 lines in Chromium and <= 10 in Firefox because it is expensive; do not use on long body. **Support** Chrome 114, Firefox 121, Safari 17.5 (MDN BCD / caniuse). **Check** computed `text-wrap`/`text-wrap-style` on headings = `balance`; runt last line (< 20% of longest line) = fail. **Source** MDN text-wrap-style, developer.chrome.com [P].
- **RULE T-WR-02** `p, li { text-wrap: pretty; }` as progressive enhancement.
  **Why** Avoids single-word last lines (orphans in the CSS sense); does not fix widows or rag. **Support** Chrome 117, Safari 26, Firefox no (as of MDN BCD). Slower layout; acceptable on article bodies, skip on huge lists. **Source** developer.chrome.com/blog/css-text-wrap-pretty [P].
- **RULE T-WR-03** Pull quotes and blockquotes: `hanging-punctuation: first last;` plus a `text-indent: -0.4em` style fallback only where support matters.
  **Support** Safari 17.4 only (caniuse); Chrome/Firefox none. Progressive enhancement; never rely on it. **Source** MDN, caniuse [P].
- **RULE T-WR-04** Typographic characters: curly quotes ` " ' `, en dash for ranges (10-20), em dash for breaks, true ellipsis, multiplication sign for dimensions (4 x 6 uses the real sign), non-breaking space between a number and its unit and before short last words, true minus. Use ` ` or `&nbsp;`.
  **Check** regex on text nodes (T19 in the detector): `"..."`, `\s-\s`, `...`, `\d x \d`, double space. **Source** practicaltypography.com (typographic quotes, dashes) [S].
- **RULE T-WR-05** Trim the font's built-in leading when you need exact visual padding: `text-box: trim-both cap alphabetic` on buttons/badges/headings.
  **Support** Chrome 133, Safari 18.2; Firefox arrived later per caniuse (verify). **Source** caniuse [P]; use [E].
- **RULE T-WR-06** Set `lang` on `<html>`; hyphenation, quotes, and `text-wrap` heuristics depend on it. `overflow-wrap: anywhere` on user-generated strings; `hyphens: manual` for headings.
  **Source** [E].

### 2.7 Fonts, loading and CLS

- **RULE T-FO-01** Self-host WOFF2 (Fontsource, `next/font`, or manual); do not hot-link fonts.googleapis.com.
  **Why** WOFF2 (Brotli) is the format to ship ("use only WOFF2" - Bram Stein); a Munich court (LG Munchen I, 20 Jan 2022, 3 O 17493/20) awarded EUR 100 against a site embedding Google Fonts remotely because the visitor's IP reaches Google. **Check** no request to `fonts.googleapis.com`/`fonts.gstatic.com`; all `src` are `.woff2`. **Source** web.dev/font-best-practices [P]; ruling [S: not legal advice].
- **RULE T-FO-02** Variable font when you use >= 3 weights or need an axis (opsz, wdth); otherwise 2-3 static WOFF2 files.
  **Why** Variable files are larger than one static style but cheaper than 3+ styles. **Source** web.dev [P].
- **RULE T-FO-03** `<link rel="preload" as="font" type="font/woff2" href="..." crossorigin>` for at most the 1-2 faces used in the first viewport (roman text/display); never preload italics, mono, or below-the-fold faces.
  **Why** Preload competes with other critical resources and requires `crossorigin` even for same-origin fonts; it bypasses `unicode-range` negotiation. **Check** count `link[rel=preload][as=font]` in 1-2 and each has `crossorigin`. **Source** web.dev [P].
- **RULE T-FO-04** `font-display: swap` (brand/display fonts) or `optional` (body, when CLS matters most), always with a metric-matched fallback `@font-face`:
  `size-adjust = avgCharWidth(web)/avgCharWidth(fallback)`; `ascent-override = ascent/(UPM*size-adjust)`; `descent-override = descent/(UPM*size-adjust)`; `line-gap-override = lineGap/(UPM*size-adjust)`.
  Worked example (Chrome docs, Poppins over Arial): size-adjust 60.85%, ascent 164.34%, descent 57.52%, line-gap 16.43%. Shipped Inter/Arial: 107.12 / 90.44 / 22.52 / 0 (Supabase), Manrope/Arial 103.19 / 103.31 / 29.07 / 0, Source Code Pro/Arial 134.59 / 73.11 / 20.28 / 0, figmaSans/Arial 98.16 / 93.72 / 19.36 / 0. [M] [P]
  **Check** each `@font-face` has `font-display`; fallback family declared in `font-family` stack; Lighthouse CLS < 0.1; PerformanceObserver `layout-shift` sources in text nodes. **Source** developer.chrome.com/blog/font-fallbacks, web.dev [P].
- **RULE T-FO-05** Subset to the scripts you serve (`unicode-range`, e.g. `U+0000-00FF,U+0131,U+0152-0153,...` for Latin); Google Fonts and Fontsource ship pre-split subsets.
  **Source** web.dev [P].
- **RULE T-FO-06** Budget: <= 2 families + 1 mono (3 is the ceiling), <= 4-6 font files total, <= ~100-150 KB of fonts on the critical path.
  **Why** Every file is a request and a repaint; shipped sites above load 2-4 families (Resend 4, Notion 3-4 incl. an accent). **Check** `document.fonts` loaded faces <= 8, families <= 3. **Source** [E].
- **RULE T-FO-07** End every stack with a generic (`system-ui`, `sans-serif`, `serif`, `ui-monospace, monospace`). Use `font-synthesis: none` so the browser never fakes bold/italic; load the real weights you use.
  **Check** `fontFamily` ends in a generic; no computed weight outside loaded faces. **Source** [E].
- **RULE T-FO-08** Request axes explicitly. Google CSS2 syntax: tags alphabetical with lowercase first, ranges with `..`: `family=Inter:ital,opsz,wght@0,14..32,100..900&display=swap`; static: `family=Instrument+Serif:ital@0;1`. Fontsource: `@fontsource-variable/<name>` (wght axis by default, extra axes via `/opsz.css`-style imports).
  **Source** fonts.google.com API [P]; Fontsource docs [S].
- **RULE T-FO-09** Leave `font-optical-sizing: auto` (default). Do not override `opsz` with `font-variation-settings` unless art-directing; `font-variation-settings` also resets other axes.
  **Why** In CSS, `opsz` follows the used font-size in px, so size changes switch designs automatically. **Source** MDN font-optical-sizing [P]; px mapping per CSS Fonts 4 [S].
- **RULE T-FO-10** Dark mode: the same text looks bolder on dark; drop weight ~20-40 (variable) or use the `GRAD` axis where present (Roboto Flex GRAD -200..150; Google Sans Flex 0..100) and add ~0.05 leading.
  **Source** [E].

### 2.8 Pairing

- **RULE T-PA-01** Two voices plus a mono: one **display/voice** face and one **text/UI** face, plus a mono for code, numerals and labels. A single family used across roles is fine (Vercel, GitHub) if weight, tracking and size carry the contrast.
  **Why** Three faces already cost three downloads and three personalities. **Source** observed [M]; Typewolf pairs two faces [P].
- **RULE T-PA-02** Pair by **contrast on one axis** (serif vs sans, geometric vs humanist, condensed vs normal, wide vs narrow) or by **shared skeleton** (same designer/superfamily, similar proportions). Do not pair two faces that are nearly but not quite the same (Inter + Geist, Poppins + Montserrat).
  **Why** Near-misses read as mistakes. Typewolf: faces with similar underlying skeletons feel harmonious; humanist sans suit old-style serifs; two serifs work only if each has a distinct strength. **Source** typewolf.com/blog/google-fonts-combinations [P].
- **RULE T-PA-03** Match x-height: |xHeight_display - xHeight_text| <= 0.04 em, otherwise scale the smaller-looking face (+4-10%) or use `font-size-adjust` (Chrome 127, Firefox 118, Safari 17). Scale inline mono to `xHeight_text / xHeight_mono` em (typically 0.9-0.95em).
  **Why** At the same px a small-x-height serif looks tiny beside a sans (Crimson Pro 0.42, EB Garamond 0.405, Cormorant 0.386 vs Inter 0.546). Values are measured in the catalogue. **Check** compare computed x-heights via canvas `actualBoundingBoxAscent('x')`. **Source** [M].
- **RULE T-PA-04** Display-only faces (Syne, Unbounded, Clash Display, Bebas, Anton, Instrument Serif, Playfair, Bodoni Moda, Abril) appear only at >= 32px (hairline serifs >= 36px) and never in nav, buttons, forms or tables.
  **Source** [E].
- **RULE T-PA-05** An italic serif "accent word" inside a sans headline is acceptable only when the serif family has a true italic, appears once per page, and is part of the identity; as a reflex it is a listed AI tell.
  **Check** `h1 em/i` with a different family. **Source** [S: impeccable.style/slop; adriankrebs.ch].
- **RULE T-PA-06** Handwritten/script faces are accents: <= 1 per viewport, >= 28px, annotations/arrows/signatures only, never for body or UI. Notion ships Permanent Marker this way. [M]
- **RULE T-PA-07** Role mapping by token, not by element: `--font-display`, `--font-text`, `--font-mono`; components reference tokens, which makes swapping a pairing a one-line change.
  **Source** [E].

### 2.9 Signals (what the typography says)

- **RULE T-SG-01** Choose the typographic signal deliberately and keep it consistent with the product (table 3.14). Trust/finance: neutral grotesk or humanist sans, weight 400-500 (Stripe's 300 is a licensed custom face), modest tracking, serif for long text. Tech/dev tool: grotesk + mono, tight display tracking, mono labels. Editorial/craft: serif display (400, lh 0.9-1.05, -0.01 to -0.04em), grotesk text. Playful: rounded/geometric, heavy weights (PostHog 800), larger body (18/32). Luxury: Didone/flared serif display with generous space and wide-tracked small caps.
  **Check** `visual` + catalogue `signals`. **Source** [M] observed; [E].

### 2.10 Typographic tells of amateur/AI work (checkable by script)

A single flag is not a verdict; score by density. Calibration on Linear, Stripe, Vercel and Tailwind: T09, T13b and T03 fire on embedded product mock-ups and screenshots, so restrict them to text outside `[role=img]`, `svg`, `figure` and iframes in production use. [M]

| ID | Tell | Check (script) |
|---|---|---|
| T01 | Default font on both H1 and body (Inter, Roboto, Open Sans, Arial/Helvetica, system-ui, Poppins, Montserrat, Space Grotesk, Geist, Instrument Serif, DM Sans, Plus Jakarta Sans) | first family of computed `font-family` for `h1` and the median paragraph in the watch-list |
| T02 | One family for everything | distinct first-family of h1, h2, p, button, code is 1 |
| T03 | Flat hierarchy | h1/body < 2.5 (desktop) or h1/h2 < 1.2 |
| T04 | Default Tailwind ladder (12/14/16/18/20/24/30/36/48/60/72/96) with >= 8 of them used and nothing else | set equality; T04b = > 12 distinct sizes |
| T05 | Loose display leading (> 1.25 at >= 40px) or clipped (< 0.88) | lineHeight/fontSize |
| T06 | Body leading outside 1.3-1.85 | lineHeight/fontSize on paragraphs > 100 chars |
| T07 | Untracked display (0 at >= 48px) or crushed (< -0.06em) or tracked body (> +-0.02em) | letterSpacing/fontSize |
| T08 | Measure > 90 or < 30 characters per line | canvas-measured avg glyph width |
| T09 | Text < 11px or mobile body < 16px | computed size |
| T10 | Numeric cells without tabular-nums and not in a mono face | >= 4 numeric-only elements |
| T11 | Runt last line (< 20% of longest) in heading/paragraph without `text-wrap` | Range client rects |
| T12 | Caps overuse (> 8 uppercase elements), untracked caps (< 0.04em), uppercase paragraphs | `text-transform` + letterSpacing |
| T13 | > 5 distinct weights; weight <= 300 below 16px | computed `font-weight` |
| T14 | > 3 families or > 8 faces loaded; `@font-face` without `font-display` | `document.fonts`, CSSOM |
| T15 | No generic fallback in the font stack | regex on `font-family` |
| T16 | Gradient-filled headings (`background-clip: text`) | computed style |
| T17 | Uppercase eyebrow above every section H2 (>= 3) | previousElementSibling check |
| T18 | Italic serif accent word inside a sans H1 | `h1 em/i/span` family differs and italic |
| T19 | ASCII punctuation: straight quotes, `x` for x, spaced hyphen as dash, three dots, double spaces | regexes on text nodes |
| T20 | Centred paragraph > 200 chars; justify without `hyphens: auto` | computed `text-align`/`hyphens` |

Other non-script tells (visual review): badge pill above the H1; icon-in-rounded-square above every feature title; identical three-up cards; stat-banner row; centred hero + two buttons; purple/indigo gradient + Inter; "VibeCode Purple". [S: adriankrebs.ch, impeccable.style]

Runnable detector (Playwright/DevTools `page.evaluate`): see section 8.

## 3. Numbers and scales

### 3.1 Modular ratios and when to use them

| Ratio | Name | Value | Use | Notes |
|---|---|---|---|---|
| 1.067 | minor second | 1.067 | micro-steps for data-dense UI (tables) | Too subtle for hierarchy; use only between 11-16px |
| 1.125 | major second | 1.125 | product UI, docs sidebars, dashboards | 12, 13.5, 15, 17, 19... hand-round to 12/13/14/16/18 |
| 1.2 | minor third | 1.2 | default for body-heavy sites; mobile end of fluid marketing scale | Utopia small-screen default [P] |
| 1.25 | major third | 1.25 | balanced SaaS marketing, one scale across breakpoints | 16, 20, 25, 31, 39, 49, 61 |
| 1.333 | perfect fourth | 1.333 | desktop end of fluid marketing scale; editorial | Utopia large-screen default [P] |
| 1.414 | augmented fourth | 1.414 | bold single-page sites with few levels | 16 -> 23 -> 32 -> 45 -> 64 |
| 1.5 | perfect fifth | 1.5 | heroes/posters; skip steps | Top steps exceed 100px quickly |
| 1.618 | golden | 1.618 | display-only decisions (hero vs body) | Not a usable full scale |

Real sites are not modular: Linear 72/64/48/24/16, Vercel 64/56/16/14, Stripe 56/48/32/22/16. They hand-pick 4-6 levels. [M] Tailwind v4's default text scale is rem 0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3, 3.75, 4.5, 6, 8 (12...128px) and is what generated sites use unchanged [S].

### 3.2 Fluid token set (viewport 360 -> 1440, scale 1.2 -> 1.333 from base 16 -> 18)

Generated from the formula in 2.2. Steps below +0 are hand-fixed because a 1.2 ladder goes below 12px.

| Token | Min @360 | Max @1440 | CSS | @390 | @768 | @1024 |
|---|---|---|---|---|---|---|
| `--step--2` (caption) | 12 | 12 | `0.75rem` | 12 | 12 | 12 |
| `--step--1` (small/UI) | 13.33 | 13.5 | `clamp(0.8333rem, 0.8298rem + 0.0157vw, 0.844rem)` | 13.3 | 13.4 | 13.4 |
| `--step-0` (body) | 16 | 18 | `clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)` | 16.1 | 16.8 | 17.2 |
| `--step-1` (lead) | 19.2 | 24.0 | `clamp(1.2rem, 1.1001rem + 0.4439vw, 1.5rem)` | 19.3 | 21.0 | 22.1 |
| `--step-2` (H4/H3 small) | 23.04 | 31.98 | `clamp(1.44rem, 1.2537rem + 0.8281vw, 1.999rem)` | 23.3 | 26.4 | 28.5 |
| `--step-3` (H3) | 27.65 | 42.63 | `clamp(1.728rem, 1.4158rem + 1.3877vw, 2.665rem)` | 28.1 | 33.3 | 36.9 |
| `--step-4` (H2) | 33.18 | 56.83 | `clamp(2.074rem, 1.5808rem + 2.1902vw, 3.552rem)` | 33.8 | 42.1 | 47.7 |
| `--step-5` (H1 compact) | 39.81 | 75.76 | `clamp(2.488rem, 1.7395rem + 3.3281vw, 4.735rem)` | 40.8 | 53.4 | 61.9 |
| `--step-6` (H1 hero) | 47.78 | 100.98 | `clamp(2.986rem, 1.8775rem + 4.9267vw, 6.312rem)` | 49.3 | 67.9 | 80.5 |
| `--step-7` (statement) | 57.33 | 134.61 | `clamp(3.583rem, 1.9732rem + 7.1557vw, 8.413rem)` | 59.5 | 86.5 | 104.8 |

Max/min ratios: step-6 2.11, step-7 2.35 (both <= 2.5). Step-6 at 360px is 47.8px, which is large for a phone; for most heroes use a purpose-built hero token:

| Token | Range (360 -> 1440) | CSS | max/min | @390 | @768 | @1024 |
|---|---|---|---|---|---|---|
| `--hero-std` | 36 -> 72 | `clamp(2.25rem, 1.5rem + 3.3333vw, 4.5rem)` | 2.00 | 37.0 | 49.6 | 58.1 |
| `--hero-big` | 40 -> 96 | `clamp(2.5rem, 1.3333rem + 5.1852vw, 6rem)` | 2.40 | 41.6 | 61.2 | 74.4 |
| `--hero-quiet` | 32 -> 56 | `clamp(2rem, 1.5rem + 2.2222vw, 3.5rem)` | 1.75 | 32.7 | 41.1 | 46.8 |
| `--h2` | 28 -> 48 | `clamp(1.75rem, 1.3333rem + 1.8519vw, 3rem)` | 1.71 | 28.6 | 35.6 | 40.3 |
| `--h3` | 20 -> 28 | `clamp(1.25rem, 1.0833rem + 0.7407vw, 1.75rem)` | 1.40 | 20.2 | 23.0 | 24.9 |
| `--lead` | 18 -> 24 | `clamp(1.125rem, 1rem + 0.5556vw, 1.5rem)` | 1.33 | 18.2 | 20.3 | 21.7 |
| `--stat` | 40 -> 80 | `clamp(2.5rem, 1.6667rem + 3.7037vw, 5rem)` | 2.00 | 41.1 | 55.1 | 64.6 |
| `--quote` | 22 -> 36 | `clamp(1.375rem, 1.0833rem + 1.2963vw, 2.25rem)` | 1.64 | 22.4 | 27.3 | 30.6 |

Leave a 1.5x sizing headroom beyond 1440 by not capping hero tokens below the observed max of 96px; for >= 1920px screens raise `maxVw` to 1920 (recompute) or cap the container (`max-width` 1280-1440) instead of growing type.

### 3.3 Role table: marketing / landing (font-size / line-height; tracking in em)

Mobile 390, tablet 768, desktop 1440. "Modal" values come from the measured sample plus rules above.

| Role | Mobile 390 | Tablet 768 | Desktop 1440 | Weight | Leading | Tracking | Family role |
|---|---|---|---|---|---|---|---|
| Statement / Display XL | 40-48 | 64-72 | 88-96 | 400-600 | 0.95-1.0 | -0.04 to -0.05 | display |
| H1 hero | 34-42 | 48-56 | 56-72 (64 modal) | 500-600 (400 serif/light) | 1.0-1.1 | -0.02 to -0.035 | display |
| H2 section | 28-32 | 34-40 | 40-56 | 500-600 | 1.05-1.15 | -0.02 to -0.03 | display |
| H3 card/feature | 20-22 | 22-24 | 24-32 | 600 | 1.2-1.3 | -0.01 | display or text |
| H4 / item title | 17-18 | 18 | 18-20 | 600 | 1.3 | -0.005 | text |
| Lead / subhead | 18 | 19-20 | 20-24 | 400 | 1.3-1.5 | -0.01 | text |
| Body | 16 | 16-17 | 17-18 | 400 (330-450 var) | 1.5-1.65 | 0 (-0.011 Inter@16) | text |
| Small / secondary | 14 | 14 | 14-15 | 400-450 | 1.45-1.55 | 0 | text |
| Caption / legal | 12-13 | 12-13 | 12-13 | 400 | 1.4-1.5 | +0.005 to +0.02 | text |
| Button | 15-16 | 15-16 | 14-16 | 500-600 | 1.25 (or 1 + padding) | 0 | text/UI |
| Nav link | 15-16 | 14-15 | 14-15 | 500 | 1.25 | 0 | UI |
| Eyebrow / overline | 12 | 12 | 12-13 | 500-600, caps | 1.3 | +0.06 to +0.12 | text or mono |
| Stat figure | 40-48 | 56 | 64-80 | 500 | 1.0 | -0.02 | display, tabular |
| Pull quote | 22 | 26-28 | 32-40 | 400 (serif ok) | 1.25-1.35 | -0.01 | display |
| Inline code | 0.9em | 0.9em | 0.9em | 400 | inherit | 0 | mono |
| Code block | 13 | 13-14 | 14 | 400 | 1.6 | 0 | mono |

Caption and tracking numbers: Apple.com caption 12px/16px -0.01em; Mercury small copy 12/16.8 +0.02em; Apple body 17/25 -0.022em. [M]

### 3.4 Role table: SaaS application UI (fixed px; line-height in px)

| Role | Size / line-height | Weight | Tracking (em) | Notes |
|---|---|---|---|---|
| Page title | 24 / 32 (20/28 compact) | 600 | -0.01 | |
| Section title | 18 / 28 (16/24) | 600 | -0.005 | |
| Body / cell | 14 / 20 | 400-450 | -0.006 | Inter dynamic @14 = -0.0062 |
| Dense table | 13 / 18 (12/16) | 400 | 0 | `tabular-nums` |
| Caption / helper | 12 / 16 | 400 | +0.005 | |
| Label (form) | 13 / 16 | 500 | 0 | |
| Button | 14 / 20 (16/24 mobile) | 500 | 0 | |
| Input | 14 / 20 desktop; 16 / 24 on iOS | 400 | 0 | 16px avoids iOS focus zoom |
| Tooltip / badge | 12 / 16 | 500 | +0.005 | |
| Kbd | 11-12 mono | 500 | 0 | |
| Code | 13 / 20 | 400 | 0 | |
| KPI number | 28-36 / 36-40 | 600 | -0.02 | `tabular-nums`, `slashed-zero` for IDs |

### 3.5 H1 size bands per breakpoint (headline writing)

Measured H1 across 20 sites [M] and the resulting bands:

| Viewport | Observed range | Median | Recommended band | Max lines | Chars/line target |
|---|---|---|---|---|---|
| 360-479 (mobile) | 27.5-64 | 38 | 32-44 | 4-5 | 12-20 |
| 480-767 | n/a (interpolated) | n/a | 40-56 | 3-4 | 18-26 |
| 768-1023 (tablet) | n/a | n/a | 48-72 | 3 | 22-32 |
| 1024-1439 | n/a | n/a | 56-88 | 2-3 | 24-38 |
| >= 1440 | 42-96 | 64 | 56-96 (64 modal; 96 only for <= 8-word statements) | 2-3 | 24-45 |

Copy length that fits: measured H1 copy runs 18-62 characters (Resend "Email for developers" 20; Vercel "Agentic Infrastructure" 22; Figma 30; Notion 38; Cal.com 40; Stripe 45; Intercom 52; Tailwind ~61). Rule of thumb: <= 8 words for 96px statements; 8-12 words at 56-72px; > 12 words only at <= 48px. Mobile/desktop ratio: 0.62 median (0.38-0.75); Resend keeps 64px mobile only because the line is "Email for developers".

Per-breakpoint examples (px): Linear 64 -> 38; Vercel 64 -> 48; Stripe 48 -> 34; GitHub 64 -> 40; Notion 96 -> 42; Figma 56 -> 36; Cal.com 64 -> 40; Raycast 64 -> 36; Framer 54 -> 36; Tailwind 96 -> 36; Intercom 80 -> 40; Every 64 -> 40; Attio 64 -> 40; Ramp 64 -> 40; Clerk 56 -> 32; Arc 46 -> 32; Basecamp 42 -> 27.5. [M]

### 3.6 Measured H1 typography in shipped products (1440 desktop; Oct 2026) [M]

| Site | Face | Size / leading ratio | Tracking | Weight | Mobile H1 |
|---|---|---|---|---|---|
| Linear | Inter Variable | 64 / 1.00 | -0.022 | 510 | 38 |
| Vercel | Geist Sans | 64 / 1.00 | -0.060 | 400 | 48 |
| Stripe | Sohne var | 48 / 1.15 | -0.020 | 300 | 34 |
| GitHub | Mona Sans | 64 / 1.08 | -0.035 | 425 | 40 |
| Notion | NotionInter (Inter-based) | 96 / 1.04 | -0.048 | 600 | 42 |
| Figma | figmaSans | 56 / 1.00 | -0.022 | 400 | 36 |
| Resend | Domaine (serif) | 96 / 1.00 | -0.010 | 400 | 64 |
| Cal.com | Cal Sans | 64 / 1.10 | 0 | 600 | 40 |
| Supabase | Manrope | 46 / 1.00 | 0 | 500 | 34 |
| Anthropic | Anthropic Sans | 60.9 / 1.10 | 0 | 700 | 40.3 |
| Framer | GT Walsheim Medium | 54 / 1.00 | -0.040 | 500 | 36 |
| Raycast | Inter | 64 / 1.10 | 0 | 600 | 36 |
| Ramp | Lausanne | 64 / 1.00 | ~0 | 400 | 40 |
| Intercom | Saans | 80 / 1.00 | -0.030 | 400 | 40 |
| Clerk | `geistNumbers` (Geist-derived; unverified) | 56 / 1.14 | -0.035 | 700 | 32 |
| Attio | Inter Display | 64 / 0.95 | -0.020 | 600 | 40 |
| Tailwind | Inter | 96 / 1.00 | -0.050 | 400 | 36 |
| Every | Signifier (serif) | 64 / 0.90 | -0.040 | 400 | 40 |
| Arc | Marlin Soft SQ | 45.5 / 0.93 | -0.040 | 700 | 32 |
| Basecamp | Graphik | 42.1 / 1.15 | -0.026 | 800 | 27.5 |

Aggregate (n=20): size median 64 (IQR 54.5-64), leading median 1.00 (0.90-1.15), tracking median -0.024 (0 to -0.06), weight median 500 (300-800). Body text (the longest paragraph picked automatically, so partly cookie/legal text; treat as indicative): GitHub 18/27 +0.01em; Resend 18/27; Notion hero copy 20/28 -0.006em; Figma 18/25.2 at 330 weight; Tailwind 16/28; Framer 18/24.3 -0.011em; Intercom 16/22.4 at 300; Supabase 15/22.5 at 450. Apple.com: body 17/25, -0.022em, SF Pro Text; display "iPhone" 56/60, 600, -0.005em, SF Pro Display. [M]

### 3.7 Material 3 type scale (sp = px at 1x)  [S: sizes cross-checked in Android docs; line height/tracking from the M3 token set, verify against m3.material.io]

| Role | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| Display Large | 57 | 64 | -0.25 | 400 |
| Display Medium | 45 | 52 | 0 | 400 |
| Display Small | 36 | 44 | 0 | 400 |
| Headline Large | 32 | 40 | 0 | 400 |
| Headline Medium | 28 | 36 | 0 | 400 |
| Headline Small | 24 | 32 | 0 | 400 |
| Title Large | 22 | 28 | 0 | 400 |
| Title Medium | 16 | 24 | +0.15 | 500 |
| Title Small | 14 | 20 | +0.1 | 500 |
| Body Large | 16 | 24 | +0.5 | 400 |
| Body Medium | 14 | 20 | +0.25 | 400 |
| Body Small | 12 | 16 | +0.4 | 400 |
| Label Large | 14 | 20 | +0.1 | 500 |
| Label Medium | 12 | 16 | +0.5 | 500 |
| Label Small | 11 | 16 | +0.5 | 500 |

Tracking is in sp (not em). Observation: M3 leading is ~1.12-1.4 for display/headline and 1.43-1.5 for body/label; positive tracking on small text, none on large. M3 is a mobile-app scale: do not copy its 57px display to a web hero without fluidity.

### 3.8 Apple iOS built-in text styles at default Dynamic Type (pt)  [S: widely published iOS table; Apple page is JS-rendered and could not be fetched here; macOS values: Body 13 regular/semibold emphasized, Headline 13 bold, Title 1 22 regular (gist/WWDC20), leading unverified]

| Style | Size | Weight | Leading | Tracking (pt) |
|---|---|---|---|---|
| Large Title | 34 | Regular | 41 | +0.37 |
| Title 1 | 28 | Regular | 34 | +0.36 |
| Title 2 | 22 | Regular | 28 | +0.35 |
| Title 3 | 20 | Regular | 25 | +0.38 |
| Headline | 17 | Semibold | 22 | -0.43 |
| Body | 17 | Regular | 22 | -0.43 |
| Callout | 16 | Regular | 21 | -0.32 |
| Subhead | 15 | Regular | 20 | -0.24 |
| Footnote | 13 | Regular | 18 | -0.08 |
| Caption 1 | 12 | Regular | 16 | 0 |
| Caption 2 | 11 | Regular | 13 | +0.07 |

SF behaviour: SF Pro Text below ~20pt, SF Pro Display from ~20pt, tracking varies smoothly (no hard breakpoint) between ~17 and 28pt (WWDC20 session notes [S]); Apple's font page states SF has "variable optical sizes ... and dynamic tracking". Apple.com on the web shows SF Pro Text at 17px with -0.022em and SF Pro Display at 56px with -0.005em. [M] Lessons for web: size-dependent tracking and optical size are part of the system; leading is ~1.29-1.47 at text sizes (Apple.com body 17/25 = 1.47).

### 3.9 Font features and axes quick reference

| Need | CSS | Notes |
|---|---|---|
| Tabular figures | `font-variant-numeric: tabular-nums` | OpenType `tnum`; Baseline Jan 2020 |
| Slashed zero | `font-variant-numeric: slashed-zero` | `zero` |
| Lining/oldstyle | `lining-nums` / `oldstyle-nums` | |
| Fractions/ordinals | `diagonal-fractions`, `ordinal` | |
| Small caps | `font-variant-caps: all-small-caps` | needs `smcp`/`c2sc`; fake small caps are a tell |
| Stylistic sets | `font-feature-settings: "ss01", "cv11"` | Inter: cv11 single-storey a, ss01 open digits, case [E]; Stripe enables Sohne `ss01` [S] |
| Optical size | `font-optical-sizing: auto` | opsz axis; value tracks px |
| Weight/width | `font-weight: 100 900`, `font-stretch: 75% 125%` | wdth axis: Mona/Hubot Sans 75-125, Archivo 62-125, Bricolage 75-100, Roboto Flex 25-151 |
| Grade | `font-variation-settings: "GRAD" n` | weight-like change without reflow; Roboto Flex, Google Sans Flex |
| Variable axes (Google registry, 54 tags) | wght, wdth, opsz, ital, slnt, GRAD, ROND, SOFT, WONK, CASL, CRSV, MONO, XOPQ, YOPQ... | Fraunces: opsz 9-144, SOFT 0-100, WONK 0-1; Recursive: MONO, CASL, CRSV, slnt; Shantell Sans: BNCE, INFM, SPAC |

### 3.10 Browser support (Oct 2026, caniuse/MDN BCD)

| Feature | Chrome | Firefox | Safari |
|---|---|---|---|
| `text-wrap: balance` | 114 | 121 | 17.5 |
| `text-wrap: pretty` | 117 | not supported | 26 |
| `hanging-punctuation` | no | no | 17.4 |
| `font-size-adjust` | 127 | 118 | 17.0 |
| `text-box` / `text-box-trim` | 133 | later (caniuse lists 154; verify) | 18.2 |
| `font-display` | 60 | 58 | 11.1 |
| variable fonts | 66 | 62 | 11 |
| `size-adjust`/`*-override` descriptors | Chromium, Firefox, Safari 17+ [S: re-check caniuse] | | |

### 3.11 Font loading values

| Item | Value | Source |
|---|---|---|
| Format | WOFF2 only | web.dev [P] |
| `font-display` | `swap` display/brand; `optional` body when CLS-critical; `block` only for very short icon-like text | web.dev [P] |
| Preload | `rel=preload as=font type=font/woff2 crossorigin` for 1-2 faces | web.dev [P] |
| Fallback overrides | `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` computed from UPM and avg char width | developer.chrome.com [P] |
| Shipped Arial fallbacks | Inter 107.12/90.44/22.52/0; Inter 107.89/89.79/22.36/0; Manrope 103.19/103.31/29.07/0; Source Code Pro 134.59/73.11/20.28/0; Plex Mono 131.49/77.95/20.91/0; figmaSans 98.16/93.72/19.36/0 (size-adjust/ascent/descent/line-gap %) | [M] |
| Tools | Capsize, fontaine, `next/font` (generates the above automatically) | developer.chrome.com [S] |
| Google CSS2 | alphabetical axis tags, lowercase first: `Inter:ital,opsz,wght@0,14..32,100..900` | fonts.google.com [P] |

### 3.12 Reference real-product stacks (Oct 2026, from @font-face + computed styles) [M]

| Product | Display/heading | Text/UI | Mono | Accent | Pattern |
|---|---|---|---|---|---|
| Linear | Inter Variable (510) | Inter Variable | Berkeley Mono (commercial) | | one family, tuned |
| Vercel | Geist Sans (400, -0.06em) | Geist Sans | Geist Mono | Geist Pixel (5 variants) | own family + pixel accent |
| Stripe | Sohne var (300) | Sohne var | Source Code Pro | | custom light weight |
| GitHub | Mona Sans (425) | Mona Sans | Mona Sans Mono | Hubot Sans (brand) | two OFL siblings |
| Notion | NotionInter | NotionInter | iA Writer Mono | Lyon Text (serif), Permanent Marker (hand) | sans + serif + hand accent |
| Figma | figmaSans | figmaSans (330-340) | figmaMono | | own family, light body |
| Resend | Domaine (serif 96px) + ABC Favorit (H2) | Inter | Commit Mono (OFL) | | serif display over Inter |
| Cal.com | Cal Sans (600) | Inter / Cal Sans UI Light (300) | Roboto Mono, Fragment Mono | Matter | open display face |
| Supabase | Manrope (500) | Inter (450) | Source Code Pro | | geometric head + neutral body |
| Anthropic | Anthropic Sans (700) | Anthropic Serif (20px body) | Anthropic Mono / JetBrains Mono | Anthropic Serif headlines | serif body + sans heads |
| Framer | GT Walsheim Medium | Inter | Input Mono / JetBrains Mono / Azeret Mono | Chillax, EB Garamond | commercial geometric + Inter |
| Raycast | Inter (600) | Inter | Geist Mono / JetBrains Mono | | Inter + mono |
| Intercom | Saans | Saans (300) | Saans Mono | | one family + mono |
| Tailwind | Inter (400, -0.05em) | Inter | IBM Plex Mono | | Inter + Plex Mono |
| Clerk | Geist | Geist / Suisse | Sohne Mono | | |
| Every | Signifier (serif, lh 0.9) | Switzer | | | serif display + Swiss text |
| Basecamp | Graphik (800) | Graphik | Martian Mono | | heavy sans + wide mono labels |
| Arc | Marlin Soft SQ (700) | Inter | ABC Favorit Mono | | rounded display + Inter |
| Apple | SF Pro Display | SF Pro Text | | | optical-size pair |

Typewolf Site of the Day (Dec 2025 batch, fonts only): Grenette + Styrene; Cardinal + Sweet Sans + Baskerville; Swear + DM Mono; DaVinci + Suisse Int'l; Kabel + Neue Haas Grotesk; Editorial Old + Neue Montreal; Tobias + Diatype + Diatype Mono; Signifier + Switzer; Arizona Flare + Dia. [P: typewolf.com] Pattern: serif/character display + neutral grotesk text, optional mono. Typewolf's own cheatsheet "most popular" list: Apercu, GT America, Futura, Founders Grotesk, Neue Haas Grotesk, Canela, Graphik, Proxima Nova, GT Walsheim, Avenir, Maison Neue, Circular, Brandon Grotesque, Ogg, Helvetica Neue. [P]

### 3.13 Free equivalents of the popular commercial faces  [E: approximations, check by eye]

| Commercial | Closest free | Why |
|---|---|---|
| Sohne / Neue Haas / Helvetica Now | Hanken Grotesk, Instrument Sans, Switzer, General Sans | neo-grotesque, calm |
| Styrene | Schibsted Grotesk, Host Grotesk, Cabinet Grotesk | slightly quirky grotesque |
| GT America / Graphik / Suisse | Public Sans, Libre Franklin, Mona Sans | sturdy grotesque |
| GT Walsheim / Circular / Avenir | Plus Jakarta Sans, Figtree, Outfit (use sparingly) | friendly geometric |
| Tiempos / Lyon / Canela Text | Newsreader, Source Serif 4, Gambetta, Sentient | transitional/old-style text serif |
| Signifier / Editorial New | Instrument Serif (overused), Newsreader display, Gloock, Boska | contemporary display serif |
| Domaine / Canela | Bodoni Moda, Libre Bodoni, Gloock, DM Serif Display | high-contrast display |
| Berkeley Mono / Sohne Mono | Commit Mono, JetBrains Mono, Geist Mono, IBM Plex Mono | |
| Cooper / Recoleta | Fraunces (SOFT 100), Young Serif | soft serif |

### 3.14 What typography signals

| Signal | Typical choices | Settings that sell it |
|---|---|---|
| Trust / finance / health | Neutral grotesque or humanist (Public Sans, IBM Plex Sans, Source Sans 3, Hanken); serif for text (Source Serif 4, Literata) | weight 400-500, tracking -0.01 to -0.02 at 48+, lh 1.5-1.6, generous measure control |
| Craft / luxury | Didone or flared serif display (Bodoni Moda, Boska, Gloock), grotesk text | large size, lh 0.95-1.05, small-caps labels +0.08-0.12em, lots of space |
| Tech / developer | Grotesk + mono (Geist, Inter, Mona Sans + JetBrains/Geist Mono) | tight display tracking -0.03 to -0.06, mono eyebrows, tabular numerals |
| Editorial | Serif display + grotesk text (Newsreader, Sentient, Fraunces + Inter/Switzer) | serif 400, lh 0.9-1.05, italics for emphasis, measure 55-65ch |
| Playful / consumer | Rounded or heavy geometric (Figtree, Plus Jakarta, Outfit, Gabarito, PostHog's 800 weight), hand accent | weight 700-800, bigger body (18), loose caps labels |
| Loud / sports / events | Condensed or wide display (Barlow Condensed, Archivo wdth 62, Anton, Unbounded) | uppercase optional, lh 0.9-1.0, +0.01em |
| Accessible / civic | Atkinson Hyperlegible Next, Public Sans, Lexend | body 18+, lh 1.6, no light weights |

## 4. Dos and don'ts

- **Do** a 64/1.0/-0.03em/500 H1 over an 18/1.6/0/400 body with a 20px lead between. **Don't** 64/1.5/0/800 over 14/1.2 (loose, untracked, heavy, cramped body).
- **Do** `text-wrap: balance` on the H1 so the last line is not "…and teams" alone. **Don't** hand-insert `<br>` to fix wrapping.
- **Do** a serif display (Newsreader/Sentient, 56-72px, lh 1.0, -0.02em) with a quiet grotesk (Hanken/Switzer) body. **Don't** combine two display fonts (Bricolage + Clash) or two near-twin sans (Inter + Geist).
- **Do** let weight move in 20-50 increments with a variable font (body 420, UI 480, headline 560). **Don't** jump 400 -> 800 for emphasis at body size.
- **Do** tabular-nums for pricing/stat/table columns. **Don't** leave `$1,111` and `$8,888` jittering.
- **Do** uppercase labels at 12px with +0.08em. **Don't** uppercase a sentence at 16px with 0 tracking.
- **Do** a metric-matched fallback so the font swap moves nothing. **Don't** ship `font-display: swap` with default Arial and accept 0.2 CLS.
- **Do** set the paragraph at 65ch. **Don't** let body run the full 1200px container (about 130 characters).
- **Do** `font-size: clamp(rem + vw)`. **Don't** `font-size: 5vw`.
- **Do** curly quotes, en dash ranges, real ellipsis, `&nbsp;` before units. **Don't** `"quotes"`, `10-20`, `...`.

## 5. Exceptions and judgement calls

- **Light display weights** (Stripe 300, Figma 400, Vercel 400) work only with faces drawn for them and at >= 32px; at body size they fail contrast on lower-DPI screens. Do not copy the weight without the face.
- **Zero tracking on display** is shipped by Cal.com, Raycast, Anthropic and Supabase: those faces (Cal Sans, Inter Display/opsz, custom sans) carry tight spacing in the design, or use an opsz axis. Rule T-LS-01 applies to neutral text grotesks set large (Inter, Geist, Hanken). Check by eye, not by number.
- **Very tight leading** (0.9-0.95: Every, Attio, Arc) works for 1-2 line headlines without descender collisions; any 3+ line headline at < 1.0 needs checking for ascender/descender clashes.
- **Serif body on landing pages** (Anthropic, Notion) is a deliberate brand voice; the rest of the sample uses sans body. Serif body requires +1-2px for low x-height faces (Crimson Pro 0.42, EB Garamond 0.405).
- **Fractional weights** are a craft signal but fragile: fall back to the nearest static if variable files fail to load. Keep a token ladder (e.g. 380/450/520/600) rather than random values.
- **Overused fonts are not wrong**, they are unmarked: Inter/Geist are excellent. The remedy is a deliberate second voice (serif, mono, a distinctive display) or distinctive tuning, not swapping to another default. Swapping Inter for the "next default" (Space Grotesk, Instrument Serif, Geist) just moves the tell (coding agents "fall back to a second set of defaults" [S]).
- **Fluid vs stepped**: shipped sites mostly step at breakpoints (Notion 96 -> 42). Fluid is better for in-between widths and zoom behaviour only if the clamp rules are respected; stepped tokens are simpler to QA. Choose one per project.
- **Justified text** is acceptable only with `hyphens: auto` and `lang`; most web builds should not justify.
- **Ratios vs hand-set**: Butterick (print) says increase heading size only slightly; web heroes need much larger jumps because H1 is display. Use the role of the text, not the print rule.
- **Material/Apple numbers** are for apps. Their tracking values are in sp/pt, not em, so do not paste them into CSS `letter-spacing`.

## 6. Figures worth keeping

For `examples/` (screenshots at 1440 and 390; capture computed styles beside the image):
- linear.app hero (Inter 510, 64/-0.022em, mono labels) - tuned single-family.
- vercel.com hero (Geist 64/-0.06em, Geist Pixel accent).
- stripe.com hero (Sohne 300, 48/1.15).
- resend.com hero (Domaine 96px serif + Inter body) - serif over grotesk.
- notion.com hero (96px/-0.048em, Lyon Text accent, Permanent Marker accent).
- every.to hero (Signifier 64/0.9).
- tailwindcss.com hero (Inter 96/-0.05em) vs a generated default-ladder SaaS page (bad reference).
- adriankrebs.ch/blog/design-slop and impeccable.style/slop (the tell catalogues).

## 7. Open questions

- Material 3 line-height/tracking and Apple HIG tables were taken from the common published values (secondary) because m3.material.io and developer.apple.com are JS-rendered and returned only titles to the fetcher. Re-verify before citing in a ledger entry.
- The Inter dynamic-metrics constants (-0.0223, 0.185, -0.1745) are from memory of the (now 404) Inter site page; they reproduce the inter-metrics npm example at 16px (-0.011) and match Linear's measured 64px tracking (-0.022). Treat as a good approximation.
- `text-wrap: pretty` Firefox status was `false` in MDN BCD at the time of reading; recheck.
- Firefox `text-box-trim` shipping version: caniuse data returned 154, which looks like a data artefact; verify.
- ITF Free Font License (Fontshare): terms on self-hosting/embedding were not retrievable; third-party summaries disagree. Default to Fontshare's own CSS/CDN delivery unless the licence text confirms self-hosting.
- Stripe product UI vs marketing font: sources disagree; only the marketing site was measured here.
- WCAG: the 2.5x rule is Barvian's derivation for clamp-based fluid type, not a normative number; manual zoom testing remains the arbiter.
- Body-text figures in 3.6 are from the longest paragraph on each page and may be legal/cookie copy; re-measure the hero subhead explicitly if used for a ledger.
- Sites where the first `h1` was not the hero (Apple, Substack, Duolingo, OpenAI, PostHog, Cursor, Mercury) were excluded from aggregates. Apple/Mercury/Cursor values are reported separately.

## 8. Runnable detector (Playwright / DevTools)

Run it as an expression in `page.evaluate` (wrap the arrow function in parentheses and call it) at 1440 and 390 widths. Returns `{vw, bodyFont, sizes, out:[{id,sev,msg,data}]}`. Tested without errors on tailwindcss.com, linear.app, stripe.com, vercel.com (Oct 2026).

```js
() => {
  const out = []; const flag = (id, sev, msg, data) => out.push({ id, sev, msg, data });
  const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const fam = e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
  const px = v => parseFloat(v), vw = innerWidth;
  const ownText = e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
  const all = [...document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,label,td,th,span,div,code,pre,blockquote,figcaption,small')].filter(e => vis(e) && ownText(e).length > 2);
  const h1 = [...document.querySelectorAll('h1')].find(vis), h2 = [...document.querySelectorAll('h2')].find(vis);
  const paras = [...document.querySelectorAll('p')].filter(e => vis(e) && ownText(e).length > 120);
  const body = paras.slice().sort((a, b) => b.textContent.length - a.textContent.length)[0] || document.body;
  const pf = paras.map(e => px(getComputedStyle(e).fontSize)).sort((a, b) => a - b); const bfs = pf.length ? pf[Math.floor(pf.length / 2)] : px(getComputedStyle(document.body).fontSize);
  // T01 overused default family
  const OVER = ['inter', 'inter variable', 'roboto', 'open sans', 'arial', 'helvetica', 'helvetica neue', 'system-ui', '-apple-system', 'segoe ui', 'poppins', 'montserrat', 'space grotesk', 'geist', 'instrument serif', 'dm sans', 'plus jakarta sans'];
  [h1, body].forEach((e, i) => { if (e && OVER.includes(fam(e))) flag('T01-overused-font', 'warn', (i ? 'body' : 'h1') + ' uses ' + fam(e), fam(e)); });
  // T02 single family
  const fams = new Set([h1, h2, body, document.querySelector('button'), document.querySelector('code,pre')].filter(Boolean).map(fam));
  if (fams.size === 1) flag('T02-single-family', 'info', 'One family for h1/h2/body/button/code', [...fams]);
  // T03 flat hierarchy
  if (h1 && vw >= 1024) { const r = px(getComputedStyle(h1).fontSize) / bfs; if (r < 2.5) flag('T03-flat-hierarchy', 'warn', 'h1/body = ' + r.toFixed(2) + ' (<2.5 on desktop)', r); }
  if (h1 && h2) { const a = px(getComputedStyle(h1).fontSize), b = px(getComputedStyle(h2).fontSize); if (a / b < 1.2) flag('T03-flat-hierarchy', 'warn', 'h1/h2 = ' + (a / b).toFixed(2), a / b); }
  // T04 Tailwind ladder
  const sizes = [...new Set(all.map(e => Math.round(px(getComputedStyle(e).fontSize))))].sort((a, b) => a - b);
  const LADDER = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];
  if (sizes.length >= 8 && sizes.every(s => LADDER.includes(s))) flag('T04-default-ladder', 'warn', 'every size sits on the Tailwind ladder', sizes);
  if (sizes.length > 12) flag('T04b-too-many-sizes', 'warn', sizes.length + ' distinct font sizes', sizes);
  // T05/T07 display leading + tracking, body leading + tracking
  all.forEach(e => {
    const s = getComputedStyle(e), fs = px(s.fontSize), lh = s.lineHeight === 'normal' ? 1.2 : px(s.lineHeight) / fs, ls = s.letterSpacing === 'normal' ? 0 : px(s.letterSpacing) / fs, t = ownText(e);
    const tag = e.tagName.toLowerCase() + ':' + t.slice(0, 24);
    if (fs >= 40 && lh > 1.25 && t.length > 25) flag('T05-loose-display-leading', 'warn', tag + ' lh ' + lh.toFixed(2), lh);
    if (fs >= 28 && lh < 0.88) flag('T05b-clipped-leading', 'warn', tag + ' lh ' + lh.toFixed(2), lh);
    if (fs >= 48 && ls === 0 && /^h[1-3]$/.test(e.tagName.toLowerCase())) flag('T07-untracked-display', 'info', tag + ' ls 0 at ' + fs + 'px (expect -0.02..-0.05em)', ls);
    if (ls < -0.06) flag('T07b-crushed-tracking', 'warn', tag + ' ' + ls.toFixed(3) + 'em', ls);
    if (t.length > 100 && (lh < 1.3 || lh > 1.85)) flag('T06-body-leading', 'warn', tag + ' lh ' + lh.toFixed(2), lh);
    if (t.length > 100 && (ls > 0.02 || ls < -0.02)) flag('T07c-body-tracking', 'warn', tag + ' ls ' + ls.toFixed(3) + 'em', ls);
    if (fs < 11 && !/sup|sub/.test(e.tagName.toLowerCase())) flag('T09-tiny-text', 'warn', tag + ' ' + fs + 'px', fs);
  });
  // T08 measure (chars/line from canvas avg width)
  const cv = document.createElement('canvas').getContext('2d');
  paras.slice(0, 8).forEach(e => { const s = getComputedStyle(e); cv.font = s.fontStyle + ' ' + s.fontWeight + ' ' + s.fontSize + ' ' + s.fontFamily; const aw = cv.measureText('the quick brown fox jumps over the lazy dog').width / 43, cpl = e.getBoundingClientRect().width / aw; if (cpl > 90 || (cpl < 30 && vw >= 1024)) flag('T08-measure', 'warn', Math.round(cpl) + ' chars/line', cpl); });
  if (bfs < 16 && vw < 768) flag('T09-small-body', 'warn', 'body ' + bfs + 'px on mobile', bfs);
  // T10 numerals without tabular-nums
  const nums = all.filter(e => /^[\s$€£+\-−]?[\d.,]+\s?[%kKMB]?$/.test(ownText(e)) && ['TD', 'TH', 'SPAN', 'DIV', 'LI'].includes(e.tagName));
  const bad = nums.filter(e => !/tabular/.test(getComputedStyle(e).fontVariantNumeric) && !/mono|courier/.test(getComputedStyle(e).fontFamily.toLowerCase()));
  if (bad.length >= 4) flag('T10-no-tabular-nums', 'warn', bad.length + ' numeric cells lack tabular-nums', bad.slice(0, 3).map(e => ownText(e)));
  // T11 runt last line in headings/paragraphs without balance/pretty
  [...document.querySelectorAll('h1,h2,h3,p')].filter(vis).slice(0, 40).forEach(e => {
    const tw = getComputedStyle(e).textWrap || getComputedStyle(e).textWrapStyle || ''; const n = e.firstChild; if (!n || n.nodeType !== 3) return;
    const r = document.createRange(); r.selectNodeContents(e); const rects = [...r.getClientRects()]; const lines = {}; rects.forEach(q => { const k = Math.round(q.top / 4); lines[k] = (lines[k] || 0) + q.width; });
    const ws = Object.keys(lines).sort((a, b) => a - b).map(k => lines[k]); if (ws.length >= 2 && ws.length <= 6 && ws[ws.length - 1] < Math.max(...ws) * 0.2 && !/balance|pretty/.test(tw)) flag('T11-runt-last-line', 'warn', e.tagName + ' last line ' + Math.round(100 * ws[ws.length - 1] / Math.max(...ws)) + '% of longest, text-wrap: ' + tw, ownText(e).slice(0, 40));
  });
  // T12 caps
  const caps = all.filter(e => getComputedStyle(e).textTransform === 'uppercase');
  if (caps.length > 8) flag('T12-caps-overuse', 'warn', caps.length + ' uppercase elements', caps.length);
  caps.forEach(e => { const s = getComputedStyle(e), ls = s.letterSpacing === 'normal' ? 0 : px(s.letterSpacing) / px(s.fontSize); if (ls < 0.04) flag('T12b-untracked-caps', 'warn', ownText(e).slice(0, 24) + ' ls ' + ls.toFixed(3), ls); if (ownText(e).length > 90) flag('T12c-caps-paragraph', 'warn', 'long uppercase text', ownText(e).slice(0, 30)); });
  // T13 weights
  const ws = [...new Set(all.map(e => getComputedStyle(e).fontWeight))];
  if (ws.length > 5) flag('T13-weight-sprawl', 'warn', ws.length + ' distinct weights', ws);
  all.forEach(e => { const s = getComputedStyle(e); if (px(s.fontWeight) <= 300 && px(s.fontSize) < 16) flag('T13b-light-small', 'warn', ownText(e).slice(0, 24) + ' wt ' + s.fontWeight + ' @' + s.fontSize, s.fontWeight); });
  // T14 font payload + display
  const faces = [...document.fonts].filter(f => f.status === 'loaded'); const famsLoaded = new Set(faces.map(f => f.family.replace(/["']/g, '')));
  if (famsLoaded.size > 3) flag('T14-too-many-families', 'warn', famsLoaded.size + ' families loaded', [...famsLoaded]);
  if (faces.length > 8) flag('T14b-too-many-faces', 'warn', faces.length + ' faces loaded', faces.length);
  try { [...document.styleSheets].forEach(ss => { try { [...ss.cssRules].forEach(r => { if (r.type === 5 && !r.style.getPropertyValue('font-display')) flag('T14c-no-font-display', 'warn', r.style.fontFamily, null); }); } catch (e) {} }); } catch (e) {}
  if (!/(sans-serif|serif|monospace|system-ui|ui-sans-serif)\s*$/.test(getComputedStyle(document.body).fontFamily)) flag('T15-no-generic-fallback', 'warn', getComputedStyle(document.body).fontFamily.slice(0, 60), null);
  // T16 gradient text
  [...document.querySelectorAll('h1,h2')].filter(vis).forEach(e => { const s = getComputedStyle(e); if ((s.webkitBackgroundClip || s.backgroundClip) === 'text') flag('T16-gradient-heading', 'info', e.tagName + ':' + ownText(e).slice(0, 24), null); });
  // T17 eyebrow above every section heading
  const eyebrows = [...document.querySelectorAll('h2')].filter(vis).filter(h => { const p = h.previousElementSibling; return p && px(getComputedStyle(p).fontSize) <= 14 && getComputedStyle(p).textTransform === 'uppercase'; });
  if (eyebrows.length >= 3) flag('T17-eyebrow-everywhere', 'warn', eyebrows.length + ' uppercase eyebrows over h2', eyebrows.length);
  // T18 serif italic accent inside sans h1
  if (h1) h1.querySelectorAll('em,i,span').forEach(x => { const a = fam(x), b = fam(h1); if (a !== b && getComputedStyle(x).fontStyle === 'italic') flag('T18-italic-accent-word', 'warn', 'italic ' + a + ' inside ' + b + ' h1: ' + x.textContent.slice(0, 20), null); });
  // T19 ASCII punctuation
  const txt = all.filter(e => !/code|pre/i.test(e.tagName)).map(ownText).join('\n');
  const chk = { 'straight-quotes': /"[A-Za-z][^"\n]{2,}"/g, 'straight-apostrophe': /[A-Za-z]'[a-z]/g, 'spaced-hyphen-as-dash': /\s-\s/g, 'three-dots': /\.\.\./g, 'x-for-times': /\d\s?x\s?\d/g, 'double-space': /[^\s]  [^\s]/g };
  for (const k in chk) { const m = txt.match(chk[k]); if (m && m.length >= 2) flag('T19-ascii-' + k, 'info', m.length + ' x', m.slice(0, 3)); }
  // T20 alignment
  paras.forEach(e => { const s = getComputedStyle(e); if (s.textAlign === 'center' && ownText(e).length > 200) flag('T20-centered-paragraph', 'warn', 'centered >200 chars', ownText(e).slice(0, 30)); if (s.textAlign === 'justify' && s.hyphens !== 'auto') flag('T20b-justify-no-hyphens', 'warn', 'justify without hyphens:auto', null); });
  return { vw, bodyFont: bfs, sizes, out };
}
```
