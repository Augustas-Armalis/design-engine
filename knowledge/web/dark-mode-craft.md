---
source: web:linear.app + raycast.com + vercel.com + cursor.com + supabase.com + resend.com + railway.com + framer.com + github.com + neon.com + planetscale.com (measured 2026-10-09, Playwright Chromium 1440x900 @2x, colorScheme dark) + work/nocturne + work/vigil
chapter: Dark mode craft for SaaS marketing pages and product UI (measured)
pages: n/a (live measurement; screenshots, filmstrips and raw JSON in knowledge/benchmarks/dark/)
topic_tags: [dark-mode, color, surfaces, elevation, borders, text-contrast, accent, glow, gradient, noise, shadows, typography, product-ui, charts, motion, load-in, art-direction, vigil, nocturne]
status: studied
---

# Dark mode craft for SaaS marketing pages and product UI

Why this note exists: the engine's dark builds fell short. Vigil (dark mono poster with a lens shader) was rejected as "ass"; Nocturne (dark product hero over a generated night sky) was "not bad but not up to our quality levels... everything is just loading in, a bit noobish", and the founder said dark mode "needs way more research". This note replaces guesses with measurements from 11 shipped dark pages.

Evidence grading: **[measured]** = read from computed styles, CSS custom properties, or screenshot pixels in this session (raw files: `knowledge/benchmarks/dark/<site>.measure.json`, `<site>-fold-1440x900@2x.png`, `<site>-s1..s3-y*@2x.png`, `<site>-film.png`). **[visual]** = read off a screenshot by eye. **[engine note]** = my synthesis; tune with ledger verdicts. OKLCH values are converted from the measured sRGB hex (Oklab matrices from Ottosson, same maths as `_color-tools/clib.py`). "L" is OKLCH lightness 0-1, "C" chroma, "H" hue.

Sites that were in the brief but have **no dark theme** on their marketing page (they rendered light even with `colorScheme: 'dark'`, so nothing dark could be measured): clerk.com, warp.dev, arc.net, attio.com, posthog.com (dark toggle lives in an in-app menu I could not reach), kargul.studio (light `#efefef` page with dark `#232323`/`#313131` panels, not a dark mode), convex.dev. height.app is offline. They are excluded from every number below. Extra dark sites measured instead: neon.com, planetscale.com.

---

## 1. Core ideas

1. **Dark premium is made of lightness steps, hairlines and one light source, not of black plus effects.** Across the 11 sites the page canvas sits at L 0.134-0.195 (or true `#000`) and every raised thing is a *small* lightness step above it (card +0.025 to +0.048 L, raised +0.065 to +0.10 L) outlined by a white hairline at 6-10% alpha. Nothing else carries structure. [measured]
2. **The ladder has depth; amateur dark has two grays.** Linear uses 5 neutral steps in its first sections (`#08090a #090a0b #0f1011 #101112 #161718`), Raycast 6 (`#07080a ... #434345`), Cursor 6, Framer 6. Nocturne's fold has 2 opaque neutrals (`#05060a`, `#0b0d13`) plus three alpha overlays. [measured]
3. **Text is a four-level alpha/grey system with a measured floor.** Primary L 0.944-0.978 (rarely pure `#fff` for body), secondary L 0.65-0.72 (WCAG 6.1-8.4:1, APCA Lc 42-53), tertiary L 0.51-0.53 (WCAG 3.4-5.1:1, Lc 23-33), and nothing readable below that. [measured]
4. **Type does not change between light and dark.** Vercel, Cursor and Supabase use the identical h1 size, weight, tracking and body weight in both modes (Vercel 64px/400/-3.84px both; Supabase body weight 450 both). There is no "thinner in dark" correction at these sites. [measured]
5. **The accent for text and lines goes up in lightness, not in saturation.** Vercel green L 0.515 -> 0.731 (C 0.125 -> 0.142); Supabase violet L 0.504 -> 0.775 (C 0.233 -> 0.130). Dark accents sit at L 0.65-0.78, C 0.13-0.21. Brand *fills* with a light label can stay identical across modes (Cursor orange `#f54e00` and Supabase green `#3ecf8e` do) or drop to a deep fill L 0.43-0.44 (Supabase button, Railway button). [measured]
6. **Sites light the hero in one of three ways and never stack them**: a single lit object on a void (Vercel prism, Resend obsidian cube), a generative/illustrated field behind a crisp product (Neon signal bars, Railway pixel sky, Raycast stripes, Cursor painting), or a flat canvas with the product frame doing the work (Linear, Supabase, Framer). 8 of 10 dark heroes carry exactly one signature field. [measured + visual]
7. **Shadows nearly disappear; rings replace them.** Cards use `0 0 0 1px rgba(255,255,255,.05-.145)` rings or inset 1px highlights. Real drop shadows appear only on floating layers and demo windows (black alpha .14-.40, blur 20-70px). [measured]
8. **Motion lives in the scene, copy is present immediately.** In filmstrips at FCP+0/300/800/1500/2500ms the headline is readable by 300ms on 7 of 10 dark heroes; 2 more by 800ms; only Linear holds it to ~1.5s. The moving parts are the object: Neon's bars loop, Framer's prompt types, Railway's sky crossfades, Raycast's stripes arrive after the text. [measured from CDP screencast]
9. **Dark pages repeat one grammar of controls**: either an inverse pill (fill L 0.92-1.0, label in canvas colour; Linear, Vercel, Raycast, Neon, Framer, Cursor) or a deep chromatic fill (L ~0.43) with a light label (Supabase, Railway), or a translucent glass button (Resend). A bright high-chroma fill with a dark label (Vigil's lime) is not used by any benchmark. [measured]
10. **Charts and status colours on dark are mid-light and mid-chroma**: series at L 0.57-0.86, C 0.10-0.20; status chips are the hue at 7-20% alpha behind hue-coloured text. [measured]
11. **Type size and weight are restrained**: display weights 400-600 (median 500), tracking -1% to -4% for sans, 0 to -1% for mono and large serif. [measured]
12. **Light-on-dark figure/ground is fragile**: Vigil failed with a flat field (fold luminance range p95-p5 = 0.000) and a mono headline at -6% tracking; Nocturne stacked star field + horizon rim + gradient text + amber button glow + staged load-in, which reads as "effects loading in" rather than a finished product. See section 4.

---

## 2. Rules

### A. Canvas and surface ladder

- **RULE** Pick the canvas from one of two measured families. Family 1, tinted near-black: page L 0.134-0.195 (Linear `#08090a` L 0.139, Raycast `#07080a` 0.134, GitHub `#0d1117` 0.176, PlanetScale `#111111` 0.178, Cursor `#14120b` 0.182, Railway `#13111c` 0.186, Supabase `#131413` 0.190). Family 2, true `#000` canvas (Vercel, Resend, Framer, Neon) where every raised surface is an opaque step at L 0.145-0.22. Do not invent a canvas at L < 0.13 that is not true black.
  **Why** below L ~0.13 a tinted canvas stops separating from OLED black and the card step has no room; true black works only because the next step is large (+0.145 to +0.21) and carries the structure.
  **Applies to** all. **Check** compute page background OKLCH L: in [0.134, 0.195] or exactly #000 with first surface L in [0.145, 0.22]. Nocturne `#05060a` = L 0.123 (outside both). **Source** linear, raycast, github, planetscale, cursor, railway, supabase, vercel, resend, framer, neon [measured]

- **RULE** Give the canvas a hue and a small chroma: C 0.003-0.022 (Linear 0.003 H 246, Raycast 0.005 H 262, Supabase 0.003 H 145, GitHub 0.014 H 258, Cursor 0.014 H 94 warm, Railway 0.022 H 292 indigo). Pure neutral C = 0 is fine only for Vercel/Framer/PlanetScale-style monochrome systems.
  **Why** tint is what makes a dark page read as a material instead of "unstyled black"; warm (H 94) and indigo (H 292) canvases are the cheapest way to differ between brands without changing structure.
  **Applies to** all. **Check** C(page) in [0.003, 0.022] unless the brand is deliberately mono; document hue. **Source** linear, raycast, cursor, railway, github [measured]

- **RULE** Build the surface ladder as lightness steps over the canvas: card = canvas +0.025 to +0.048 L, raised/popover = +0.065 to +0.10 L, sunken well = -0.025 to -0.035 L. Measured: Linear `#0f1011` +0.033 and `#161718` +0.065; Raycast `#0c0d0f` +0.025, `#111214` +0.048, `#1b1c1e` +0.092; Supabase `#181a19` +0.025, `#1b1d1c` +0.038; Cursor `#1b1913` +0.032, `#26241e` +0.078; GitHub `#151b23` +0.044, inset `#010409` -0.072; Railway pane `#0d0c14` -0.026.
  **Why** at ~+0.03 L a card is visible to the eye but not "gray boxes on black"; beyond +0.10 L it reads as a different theme.
  **Applies to** all. **Check** compute L of each opaque surface minus L(page); every step in [0.02, 0.10] (sunken in [-0.08, -0.02]). **Source** linear, raycast, supabase, cursor, github, railway [measured]

- **RULE** Use at least 4 distinct opaque neutral steps (canvas, card, raised, plus one of sunken/hover) in the first two screens, and a fifth for the product frame if it differs. Counts measured: Linear 5, Raycast 6, Cursor 6, Framer 6 (`#000 #111 #121212 #171717 #1a1a1a #242424`); Supabase has only 3 opaque steps (`#131413 #181a19 #1b1d1c`) and leans on alpha overlays.
  **Why** two grays plus alpha overlays (Nocturne) cannot express frame, panel, row, hover and popover, so the UI flattens.
  **Applies to** all. **Check** count distinct opaque background hexes with area > 2,500px in the first 1800px: >= 4. **Source** linear, raycast, cursor, framer, supabase [measured]

- **RULE** Express cards, hovers and selected rows as white overlays at 1-7% alpha over the canvas (Linear `rgba(255,255,255,.01/.02/.04/.05/.07)`, Cursor .03/.06, Raycast .02/.05, Railway .05/.10), not as new solid colours, whenever the panel sits over a gradient or image; use 10-20% only for chips on coloured tint (Framer `.10/.15`, GitHub `.15/.20`).
  **Why** alpha surfaces inherit the glow and tint behind them so panels look lit by the same light; solid steps stay flat over a gradient.
  **Applies to** all. **Check** overlay panels use white alpha <= 0.07 (cards/hover) or <= 0.20 (chips). **Source** linear, cursor, raycast, railway, framer, github [measured]

- **RULE** The primary inverse CTA fill is L 0.92-0.95 (`#e5e5e6` 0.922, `#e6e6e6` 0.925, `#edecec` 0.944, `#ededed` 0.946) or `#fff`, and its label is the canvas colour (`#08090a`, `#0a0a0a`, `#2f3031`). One such fill per viewport.
  **Why** a slightly dimmed white sits inside the same luminance range as the text and does not bloom; two white fills split the focal point.
  **Applies to** landing page. **Check** at most one element with background L >= 0.92 and area < 40,000px in the fold. **Source** linear, vercel, raycast, cursor, neon, framer [measured]

- **RULE** Body copy is never `#fff`; use L 0.944-0.978 (`#f7f8f8` 0.978, `#f0f0f0` 0.955, `#edefee` 0.950, `#ededed` 0.946, `#edecec` 0.944). `#fff` appears only on display headings >= 54px and on button labels (Framer, Raycast, Neon, Railway, GitHub use `#fff` headings).
  **Why** pure white on near-black maximises halation on small text; the 2-5% step down is free contrast headroom for the other three levels.
  **Applies to** all. **Check** computed color of `p`, `li`, UI text L <= 0.98 and not `#ffffff`. **Source** linear, vercel, supabase, resend, cursor [measured]

- **RULE** Set the page `<meta name="theme-color">` and the `<html>` background to the same canvas value so there is no light flash before first paint (equal at Linear `#08090a`, Vercel `#000`, Resend `#000`, Railway `#13111C`, Neon `#000`, PlanetScale `#111`; mismatched at Cursor `#f7f7f4`, GitHub `#1e2327`).
  **Why** white-to-dark flashes are the cheapest tell of an unfinished dark build, and they land exactly in the first-paint window reviewers watch.
  **Applies to** landing page. **Check** meta theme-color == `getComputedStyle(html).backgroundColor`; `color-scheme: dark` on `:root`. **Source** linear, vercel, resend, railway, neon [measured]

### B. Borders, rings, edges

- **RULE** Hairline border = white (or the canvas-hued light) at 6-10% alpha. Measured: Linear .08 (268 elements) and .05/.06; Cursor .10/.08/.06; Supabase .075 (373 elements); Railway .086 (2,212 elements); Raycast .06/.10; Framer .06/.08; Vercel gray-alpha .06/.09; Nocturne .07; Vigil .08/.09. On the canvas this flattens to L +0.07 to +0.10 (Linear `#1c1d1e` L 0.230, Cursor `#2a2822` 0.277, Supabase `#232423` 0.259, Railway `#272530` 0.271).
  **Why** below 5% the edge is invisible on most monitors; above 12% every card looks wireframed.
  **Applies to** all. **Check** dominant border colour alpha in [0.05, 0.10]; flattened L - L(page) in [0.06, 0.11]. **Source** linear, cursor, supabase, railway, raycast, framer, vercel [measured]

- **RULE** Strong/active border (inputs, focused, selected, outline buttons) = alpha 12-20%: Linear .12, Supabase .135, Resend `rgba(214,235,253,.145)` and `.19`, Cursor .20, Railway .20, Vercel gray-alpha-300/400 `#ffffff21/24` (.13/.14), Raycast keycap ring .20 at 2px.
  **Why** the interactive edge must beat the resting hairline by ~2x to read as state without colour.
  **Applies to** SaaS app UI. **Check** ratio strong/hairline alpha in [1.5, 2.5]. **Source** linear, supabase, resend, cursor, railway, vercel, raycast [measured]

- **RULE** Borders are 1px. Allow 2px only on outline buttons (Resend `2px rgba(255,255,255,.05)`; Neon `1px #61646b` with a 2px variant), keycaps (Raycast), and focus rings. Prefer `box-shadow: 0 0 0 1px` rings or `inset 0 0 0 1px` for cards so layout does not shift (Vercel `0 0 0 1px rgba(255,255,255,.145)`, Framer `0 0 0 1px rgba(255,255,255,.08)`, Linear `inset 0 0 0 1px rgba(255,255,255,.05)` and `inset 0 0 0 .5px rgba(255,255,255,.08)`, Supabase `inset 0 0 0 1px rgba(255,255,255,.12)`, Railway inset 1px .10 and 1.5px .20).
  **Why** thick borders turn a dark UI into a wireframe; rings in box-shadow are crisper on 2x displays at 0.5px.
  **Applies to** all. **Check** border-width <= 1px on cards and rows; count of 2px borders <= 5 in the fold. **Source** vercel, framer, linear, supabase, railway, resend, raycast [measured]

- **RULE** Tint border hue toward the canvas hue and keep its chroma <= 0.012; a cool slate tint is acceptable on true black (Resend `rgba(214,235,253,.19)`, `rgba(217,237,254,.145)`, Radix slate-a scale).
  **Why** a pure-white alpha on a tinted canvas goes grey-green or grey-pink; a matched tint keeps edges inside the material.
  **Applies to** all. **Check** flattened border C <= 0.012; hue within +-40 deg of canvas H unless neutral. **Source** resend, linear, supabase, cursor [measured]

- **RULE** Add a top-edge light to raised controls and frames: `inset 0 1px 0 rgba(255,255,255,.04-.08)` on panels and buttons (Supabase button `.04`, Raycast `.05` on panels); allow up to `.20` only on small skeuomorphic keycaps with a paired bottom `inset 0 -1px 0 rgba(0,0,0,.2-.25)` (Raycast `inset 0 1px 1px 1px rgba(255,255,255,.2)` + `inset 0 2px 1px 1px rgba(0,0,0,.25)` + outer `0 1.5px .5px 2.5px rgba(0,0,0,.4)`).
  **Why** a lit top edge is the one highlight that survives on dark and tells the eye which side the light is on.
  **Applies to** all. **Check** exactly one top inset layer per surface, alpha <= 0.08 (<= 0.20 for keycaps <= 64px). **Source** supabase, raycast, linear [measured]

- **RULE** Seam sections with a 1px hairline at the same alpha as card borders (Linear section seams and nav border-bottom `rgba(255,255,255,.08)`, Supabase nav `.075`) instead of changing the background colour between sections.
  **Why** one continuous canvas with hairline seams keeps the lit areas (object, product frame) as the only brightness events on the page.
  **Applies to** landing page. **Check** consecutive section backgrounds equal within ΔL 0.01 and a divider exists. **Source** linear, supabase [measured + visual]

### C. Text levels and contrast

- **RULE** Define four text levels with these lightness ranges: primary L 0.944-0.978; secondary L 0.65-0.72 (`#8a8f98` 0.649, `#94979e` 0.676, `#9198a1` 0.677, `#999` 0.683, `#989a99` 0.684, `#9c9c9d` 0.693, `#a1a1a1` 0.709, `#a1a0ab` 0.710, `#a1a4a5` 0.717); tertiary L 0.51-0.53 (`#62666d` 0.509, `#6a6b6c` 0.527); disabled/decor <= 0.39 (`#434345` 0.384, never for reading).
  **Why** the same four-step ladder appears independently at 8 sites, so it is the perceptual sweet spot between "everything shouts" and "grey mush".
  **Applies to** all. **Check** collect distinct text colours: 3 readable levels + primary, each in range. **Source** linear, raycast, vercel, supabase, resend, github, neon, framer [measured]

- **RULE** Hold secondary text at WCAG >= 6:1 (measured 6.13-8.37) and tertiary at >= 3.4:1 (measured 3.45-5.09), and use tertiary only for <= 13px metadata, timestamps, axis labels and ticket IDs, never for a sentence. Report APCA beside WCAG: secondary measures Lc 42-53, tertiary Lc 23-33.
  **Why** WCAG flatters grey-on-black (the same 4.5:1 is Lc 32 on near-black vs Lc 72 on white); the benchmarks keep secondary around Lc 45-52, which is enough only for supporting copy.
  **Applies to** all. **Check** WCAG(secondary, surface) >= 6 and APCA |Lc| >= 42; tertiary elements have font-size <= 13px. **Source** linear (Lc -41.8, -22.8), vercel (-51.4), raycast (-48.7/-25.1), resend (-52.7/-25.6), supabase (-46.7), neon (-46.1) [measured]

- **RULE** Reading paragraphs (> 2 lines, >= 15px) go brighter than the secondary level: Linear's 15px/510 interface text and its large section paragraphs use `#d0d6e0` (L 0.874, 13.6:1, Lc -81); keep the 0.65-0.72 greys for subtitles, nav and captions.
  **Why** Lc 42-50 is below APCA's body-text guidance (Lc 60-75); it works for one-line captions and fails for paragraphs.
  **Applies to** all. **Check** text blocks with >= 3 lines have |Lc| >= 60 against their surface. **Source** linear [measured] + APCA thresholds in color-and-surfaces.md [engine note]

- **RULE** Tint the greys with the canvas hue at C 0.011-0.016 when the canvas is tinted (Linear secondary/tertiary `#8a8f98`/`#62666d` C 0.015/0.012 H 262 on canvas H 246; Railway `#a1a0ab` C 0.016 H 290 on canvas H 292; GitHub `#9198a1` C 0.016 H 255; Neon `#94979e` C 0.011 H 267); use pure neutral greys only on a neutral canvas (Vercel, Framer, PlanetScale).
  **Why** neutral greys on a tinted canvas look dirty or "pasted on".
  **Applies to** all. **Check** text grey hue within +-30 deg of canvas hue when canvas C >= 0.008. **Source** linear, railway, github, neon, vercel [measured]

- **RULE** Use alpha text tokens when copy sits on gradients, imagery or glass (Railway hero subtitle `rgba(255,255,255,.8)` over the sky; Cursor `#edecec` at .60/.55/.50/.40); use solid hex otherwise (Linear, Vercel, Raycast).
  **Why** alpha text automatically takes the tint of what is behind it, so it never looks like a flat grey sticker on an image.
  **Applies to** landing page. **Check** text over image/gradient uses color alpha; others solid. **Source** railway, cursor [measured]

- **RULE** Set `-webkit-font-smoothing: antialiased` on the root in dark themes (10 of 11 sites; GitHub is the exception) and keep body weight identical to light mode (Supabase body 450 in both modes; Vercel and Cursor 400 in both).
  **Why** subpixel smoothing makes light-on-dark text look heavy on macOS; antialiased restores the intended weight, so no weight reduction is needed.
  **Applies to** all. **Check** computed `-webkit-font-smoothing` is `antialiased` on body; body weight in dark equals light. **Source** linear, vercel, cursor, supabase, raycast, resend, railway, framer, neon [measured]

### D. Accent, status and data colour

- **RULE** Accent for text, links, icons and lines on dark: L 0.65-0.78, C 0.13-0.21. Measured: Cursor `#f54e00` L 0.652 C 0.214; Framer `#0099ff` 0.669/0.184; Raycast `#ff6363` 0.700/0.191; Vercel `#62c073` 0.731/0.142; Linear link `#8fa6ff` 0.744/0.131; Supabase `#3ecf8e` 0.762/0.154; Neon `#34d59a` 0.778/0.155. Above L 0.80 with C > 0.19 (Vigil lime `#a3e635` L 0.849 C 0.207) the accent vibrates against the canvas.
  **Why** saturated mid-tones shimmer on near-black and very light high-chroma colours bloom; the benchmark band is where hue still reads and edges stay crisp.
  **Applies to** all. **Check** accent L in [0.65, 0.80] and C in [0.12, 0.22]. **Source** cursor, framer, raycast, vercel, linear, supabase, neon; vigil as negative [measured]

- **RULE** When a brand already has a light-mode accent, raise its lightness by 0.20-0.27 for dark text/links and change chroma by -45% to +15%: Vercel green `#297a3a` (L 0.515, C 0.125) -> `#62c073` (0.731, 0.142); Supabase violet L 0.504 C 0.233 -> `#bda4ff` 0.775 C 0.130.
  **Why** the same hue needs a different luminance to hold ~7:1 on the new surface; high-chroma violets/blues lose chroma, greens do not.
  **Applies to** SaaS app UI. **Check** dark accent L - light accent L in [0.2, 0.28]. **Source** vercel, supabase [measured]

- **RULE** Keep brand fills that carry a white label identical across modes only if the fill is already mid-dark or saturated (Cursor orange `#f54e00` and Supabase green `#3ecf8e` are byte-identical in light and dark); for large buttons on dark use a deep fill L 0.42-0.44 with a light label (Supabase `oklch(.436 .11 157.5)` with label L 0.95; Railway `#553f83` L 0.425 with white label and a 1px white .15 border).
  **Why** a deep fill gives a calm, premium button that does not out-shout the hero object, and the label keeps > 7:1.
  **Applies to** landing page. **Check** if primary button is chromatic: fill L in [0.40, 0.46], label L >= 0.94, WCAG >= 7. **Source** supabase, railway, cursor [measured]

- **RULE** Choose one primary-button grammar per page from three measured families: (a) inverse pill (fill L 0.92-1.0, canvas-coloured label; Linear 32px 13/510, Vercel 40px 16/500, Neon 44px 16/500, Raycast 36px r8 14/500, Framer, Cursor); (b) deep chromatic fill with light label (Supabase, Railway); (c) translucent glass (Resend: `linear-gradient(104deg, rgba(253,253,253,.05) 5%, rgba(240,240,228,.1) 100%)`, `2px` border white .05, label `#fff` 600, radius 16). A bright neon fill with a dark label is not in the benchmark set.
  **Why** the primary control is the one place the engine kept repeating (lime/acid fills, 3D push buttons); the benchmark vocabulary is narrower and quieter.
  **Applies to** landing page. **Check** primary CTA matches (a), (b) or (c); not (fill L >= 0.80 and C >= 0.15). **Source** linear, vercel, neon, raycast, framer, cursor, supabase, railway, resend; vigil lime as negative [measured]

- **RULE** Use one chromatic hue family in the fold plus neutrals: Supabase green, Cursor orange, Raycast red, Railway purple, Framer blue, Neon green; Vercel uses none. Status colours (red, amber, green) appear only inside product UI.
  **Why** one hue keeps the lit object and the CTA tied together; a second hue reads as a separate system.
  **Applies to** landing page. **Check** distinct hue clusters (C > 0.10) in fold excluding product UI <= 1. **Source** supabase, cursor, raycast, railway, framer, neon, vercel [visual]

- **RULE** Make status chips from the hue at 7-20% alpha behind hue-coloured text at L 0.64-0.76: Linear green `rgba(39,166,68,.07)` -> flat `#111b15` and red `rgba(243,78,82,.10)` -> `#261618`; Railway `rgba(66,148,110,.10)`; Framer blue `rgba(0,153,255,.18-.20)`; text e.g. Linear `#27a644` L 0.637, `#f34e52` 0.655.
  **Why** an alpha tint takes the surface under it and stays quiet; a solid pastel chip would be the brightest thing on the row.
  **Applies to** SaaS app UI. **Check** chip background alpha <= 0.20 and text L in [0.60, 0.80]. **Source** linear, railway, framer [measured]

- **RULE** Chart series on dark: lines/bars at L 0.57-0.86, C 0.10-0.20, hue-separated (Railway: gold `#f1cd69` L 0.859 C 0.126; green `#42946e` 0.605/0.100; orange `#ef9352` 0.747/0.137; red `#d2352b` 0.571/0.195; lime `#83cd29` 0.771/0.200). A brand single-hue ramp runs L 0.28, 0.44, 0.76, 0.84 at H 156-168 (Supabase `#00331a #00623b #42ce8c #84debd`). Gridlines are dotted/dashed white at <= 10% alpha.
  **Why** series below L 0.55 sink into surfaces at 1px stroke; above 0.86 or C 0.2 they glare; ramps need a ~0.3 L spread to separate steps.
  **Applies to** SaaS app UI. **Check** each series L in [0.55, 0.88]; ramp spread >= 0.3; gridline alpha <= 0.10. **Source** railway, supabase, linear (`#00b8cc` L 0.716 C 0.123), raycast (`#63a1ff` 0.709/0.153) [measured]

- **RULE** Syntax highlight colours on a dark code surface sit at L 0.80-0.92 (Linear `#f79ce0` 0.805, `#f7bf8b` 0.843, `#ffdf9f` 0.916 on `#0f1011`); diff rows tint the whole row at 7-10% of green/red.
  **Why** code is read in small mono text, so every token colour needs the same luminance headroom as secondary text.
  **Applies to** SaaS app UI. **Check** token colours L >= 0.78 on the code surface. **Source** linear [measured]

### E. Depth: shadows, glows, blur

- **RULE** Resting cards, rows and buttons get a ring or lightness step, not a drop shadow. Allow outer shadows only on floating layers (popover, window, demo frame, dropdown) as black at alpha 0.14-0.40 with 20-70px blur: Cursor `0 28px 70px rgba(0,0,0,.14), 0 14px 32px rgba(0,0,0,.10)` and `0 8px 30px rgba(0,0,0,.35)`; Linear `0 2px 32px rgba(0,0,0,.25)`; Neon `0 8px 20px rgba(0,0,0,.4)`; Framer `0 31px 50px rgba(0,0,0,.2)`.
  **Why** on near-black a black shadow is almost invisible, so it only helps where a layer overlaps something lighter; on resting elements it just muddies edges.
  **Applies to** all. **Check** resting elements have no shadow with blur > 8px; floating shadows alpha in [0.14, 0.40]. **Source** cursor, linear, neon, framer [measured]

- **RULE** Recess wells (inputs, code wells, tracks) with an inner vignette `inset 0 0 12px rgba(0,0,0,.2)` plus a ring (Linear: 7 elements use this, with `0 0 0 1px rgba(0,0,0,.2)` on 8).
  **Why** the same black that vanishes outside the element reads as depth inside it.
  **Applies to** SaaS app UI. **Check** recessed element has an inset black layer alpha <= 0.25. **Source** linear [measured]

- **RULE** Button glow, if any, is white at <= 0.20 alpha and <= 14px blur (Raycast Download: `0 0 14px rgba(255,255,255,.19)` plus a `2px rgba(0,0,0,.5)` ring); coloured glow (Railway node `0 0 6px rgba(180,40,180,.25), 0 0 16px rgba(102,43,223,.25)`) belongs to data nodes and focus, not the primary hero button.
  **Why** a tinted halo behind a CTA is the commonest "AI landing page" tell; the benchmark glow is a faint white lift.
  **Applies to** landing page. **Check** CTA shadow chroma ~0 (white/black only); glow alpha <= 0.2. **Source** raycast, railway; nocturne `0 8px 24px -8px rgba(245,178,107,.35)` as negative [measured]

- **RULE** Limit `backdrop-filter` to the nav and floating layers; transparent nav with `blur(20px)` + 1px bottom hairline .08 (Linear) or a solid canvas-coloured nav (Cursor, Railway, Neon). Counts of backdrop elements: Linear 2, Resend 4, Framer 8, GitHub 9, Raycast 21 (floating keycaps/cards).
  **Why** blur re-composites everything behind per frame; on dark it also shows banding on gradients.
  **Applies to** landing page. **Check** backdrop-filter elements <= 3 in the fold; radius <= 20px. **Source** linear, cursor, railway, neon [measured]

### F. Glow, gradient, noise, imagery

- **RULE** Light the hero with exactly one signature field. Measured set: Vercel (lit prism on a void; block-median max L 0.364), Resend (obsidian 3D cube + soft floor sweep; max 0.222), Raycast (red shader stripes; max 0.529), Neon (generative signal bars + halftone; max 0.297), Railway (pixel-art night sky in a rounded frame; max 0.425), GitHub (indigo/violet radial bloom with mascots; max 0.757), Cursor (painting behind dark app windows; max 0.760), Framer (blue glowing prompt box; max 0.251). Linear and Supabase use no field and let the product frame carry the fold.
  **Why** one light source keeps the composition coherent; stacking stars, rim, bloom and gradient text makes the page look like a showcase of effects.
  **Applies to** landing page. **Check** DIRECTION.md names one signature field; the number of simultaneous atmosphere devices (stars, rim light, bloom, gradient text, coloured button glow) <= 2. **Source** vercel, resend, raycast, neon, railway, github, cursor, framer, linear, supabase [measured + visual]

- **RULE** Calibrate fold luminance. Ambient glows peak at block-median L 0.22-0.36; saturated shader/art fields at 0.43-0.53; photo/painting fields up to 0.76 only inside a rounded frame so the page edge stays dark. Spread p95-p5 of 12x8 block medians: flat-field sites Linear 0.083 and Supabase 0.026 (depth comes from a product frame >= 1000px wide), lit-field sites Vercel 0.178, Resend 0.187, Framer 0.225, Neon 0.211, Railway 0.166, Cursor 0.257, GitHub 0.317, Raycast 0.355.
  **Why** a dark hero needs either a visible product frame or a visible light field; neither means a dead void.
  **Applies to** landing page. **Check** pixel-sample the 1440x900 fold on a 12x8 grid: spread >= 0.16 (lit field) or <= 0.09 with a product frame >= 1000px wide. Vigil measured spread 0.000. **Source** all folds [measured via pngjs, scripts/lum.mjs]

- **RULE** Spotlight and panel glow recipes (measured): white spotlight `radial-gradient(circle, rgba(255,255,255,.03-.04) 0%, transparent 50-90%)` on panels (Linear); top glow `radial-gradient(70% 80% at 50% 0%, rgba(255,255,255,.06) 3%, transparent 70%)` and `radial-gradient(41% 8% at 50% 0%, rgba(255,255,255,.10), transparent)` as a top-edge catch-light over `linear-gradient(#101010, rgba(0,0,0,.8))` (Resend); chromatic `radial-gradient(100% 50% at 50% 0%, rgba(0,163,255,.13), transparent 50%)` (Resend); Raycast `radial-gradient(85.8% 50% at 51% 5%, rgba(255,150,150,.11), rgba(222,226,255,.08) 46%, rgba(241,242,255,.02))`. Cap white at 0.10 and chromatic at 0.13 alpha.
  **Why** at these alphas a gradient is felt, not seen; above ~0.15 it becomes a coloured blob behind text.
  **Applies to** landing page. **Check** panel glow gradients: max stop alpha <= 0.13; end stop transparent in the same hue (not `transparent` black fringe on coloured glows). **Source** linear, resend, raycast [measured]

- **RULE** Gradient-filled headings are rare and subtle: Resend (10 headings) uses `linear-gradient(to right bottom, #fff 30%, rgba(255,255,255,.5))` at 96px; Neon 1 heading; 8 of 11 sites use none. If used, end stop >= 0.5 white alpha and only at >= 56px.
  **Why** below ~56px the faded end drops under Lc 60 and the line looks unfinished.
  **Applies to** landing page. **Check** text gradient end alpha >= 0.5; font-size >= 56px. **Source** resend, neon [measured]

- **RULE** Photographic or painted imagery on a dark page stays at full brightness inside a framed panel (Cursor's landscape painting behind dark windows, Framer's blue-graded photos); do not darken photos with a black overlay to "fit" the theme, and grade product UI frames to the same canvas hue.
  **Why** dimming imagery desaturates it into mud; a bright image in a dark frame is the contrast that makes the UI window feel lit.
  **Applies to** landing page. **Check** visual: images not under a > 0.3 black overlay. **Source** cursor, framer [visual]

- **RULE** Prefer generative or illustrated scenes with their own craft (Neon signal bars with halftone dither, Railway pixel-art clouds, Raycast stripes + isometric blueprint illustrations, Supabase wireframe art at <= 12% white) over stock gradient orbs; logos and wordmark strips are monochrome (white at L 0.7-0.95).
  **Why** founder-approved bespoke visuals (Strata engraving) are the differentiator; stock aurora gradients are what reads as templated.
  **Applies to** landing page. **Check** visual + DIRECTION.md names the scene and why it fits the product. **Source** neon, railway, raycast, supabase; founder-taste Strata [visual]

- **RULE** Grain/halftone, if used, is a single layer at 3-10% and visible only in the glow region (Neon halftone dither, Vercel noise layer flagged in CSS); 9 of 11 sites use none.
  **Why** grain kills banding in large dark gradients; elsewhere it is dirt.
  **Applies to** landing page. **Check** one noise layer, opacity <= 0.10. **Source** neon, vercel [measured]

### G. Type on dark

- **RULE** Reuse the light-mode type spec in dark: same family, weight and tracking (Vercel 64px/400/-3.84px in both; Cursor 26px/400/-0.325px; Supabase 46px/500/normal with 450 body). Do not thin headings or add letter-spacing "to compensate".
  **Why** no benchmark changes weight between modes; antialiased smoothing already corrects the perceived weight.
  **Applies to** all. **Check** h1 font-weight and letter-spacing equal in light and dark builds. **Source** vercel, cursor, supabase [measured]

- **RULE** Display headings: weight 400-600 (Linear 510, Vercel 400, Cursor 400, Neon 400, Resend 400, GitHub 425, Framer 500, Railway 500, Supabase 500, Raycast 600), size 54-96px for product heroes (Linear 64, Vercel 64, Raycast 64, GitHub 64, Neon 56, Railway 54, Framer 54, Supabase 46, Resend 96; Cursor is the 26px outlier).
  **Why** heavy weights on dark bloom; the benchmark is regular-to-medium with size doing the work.
  **Applies to** landing page. **Check** h1 weight in [400, 600] and size in [46, 96] (or documented). **Source** all dark sites [measured]

- **RULE** Track sans display headings -1% to -4% (Linear -2.2%, Framer -4.0%, Neon -4.0%, GitHub -3.5%, Railway -3.6% serif, Vercel -6.0%, Resend -1.0% serif, Raycast 0, Cursor -1.25%); track mono headings at -2% or looser (PlanetScale `normal`). Vigil's mono h1 at -6% (-4.44px at 74px) is outside the mono range.
  **Why** negative tracking tightens a grotesk; the same value on a monospaced face collapses its fixed rhythm and glyphs touch.
  **Applies to** landing page. **Check** letter-spacing / font-size in [-0.06, 0] for sans; [-0.02, 0] for mono. **Source** linear, framer, neon, github, railway, vercel, resend, raycast, cursor, planetscale; vigil as negative [measured]

- **RULE** Small UI text on dark (12-15px) uses weight 450-510 rather than 300-400: Linear 12-15px at 510, Supabase 12-16px at 450, Raycast 14px at 500, Resend 14px at 500-600.
  **Why** thin strokes of light-on-dark text break up at small sizes; a 50-110 unit weight bump restores stroke mass without looking bold.
  **Applies to** SaaS app UI. **Check** computed weight of text <= 13px in [450, 600]. **Source** linear, supabase, raycast, resend [measured]

- **RULE** A serif or high-contrast display face is a valid premium differentiator on black: Resend Domaine at 96px/400, Railway IBM Plex Serif at 54px/500 (-3.6%). Pair it with a neutral sans for UI and body.
  **Why** 2 of 10 benchmarks use it, and both read less "dev-tool template" than yet another grotesk.
  **Applies to** landing page. **Check** DIRECTION.md states the display family and a UI family. **Source** resend, railway [measured]

### H. Product UI inside a dark page

- **RULE** Nest the product ladder in 0.03-0.04 L steps: canvas L 0.139 -> frame L 0.177 (`#101112`) -> panel L 0.204 (`#161718`) -> row hover overlay white .05-.07 (Linear). A darker "canvas pane" inside a lighter page is also valid for node/canvas tools (Railway `#0d0c14` L 0.160 on page 0.186, with a dot grid).
  **Why** each container must read as one step closer to the viewer (or deliberately one step deeper); mixing the two in one frame confuses depth.
  **Applies to** hero product proof. **Check** frame, panel, row steps each differ by ΔL in [0.02, 0.05] with consistent sign. **Source** linear, railway [measured]

- **RULE** Run the product UI on the same hairline and alpha set as the page (.08 hairlines, white overlays .02-.07, text levels identical) so the screenshot looks native instead of pasted in; the frame gets a 1px ring and, only when floating over art, a black shadow `0 28px 70px rgba(0,0,0,.14)`.
  **Why** a UI window with its own stronger borders or lighter text looks composited from another system.
  **Applies to** landing page. **Check** product borders alpha within 0.02 of page hairline; text levels share the page tokens. **Source** linear, cursor, railway [measured + visual]

- **RULE** Show real, dense-but-clean workflow rows in the frame: ID in tertiary (Linear `ENG-926` 12px `#62666d`), title in primary, status icon in the hue family, avatar, label chips; the frame starts at 350-530px from the top of a 900px fold (read from screenshots: Cursor ~350, Framer ~370, Supabase ~450, Railway ~500, Linear ~530) and is cut by the fold.
  **Why** believable specificity is what separates product proof from a dark mockup; the frame position keeps the headline and the proof in one view.
  **Applies to** landing page. **Check** frame top in [330, 560] at 1440x900; first row text contains a real-looking ID, title, status. **Source** linear, cursor, framer, supabase, railway [visual]

- **RULE** Navigation on dark is either a transparent bar with a 1px hairline (.075-.08) and optional blur(20px) (Linear 73px, Supabase 65px) or a solid canvas-coloured bar (Cursor 52px, Railway 72px, Neon 64px), or a floating pill (Raycast); never a bar that is a distinct lighter surface. Link colour = secondary level, hover = primary.
  **Why** the nav should not compete with the hero object, and a lighter bar breaks the single-canvas read.
  **Applies to** landing page. **Check** nav bg is transparent or equal to canvas, or a floating pill with ring; link rest colour L in [0.65, 0.72]. **Source** linear, supabase, cursor, railway, neon, raycast [measured]

### I. Load-in and motion on dark

- **RULE** Have the hero headline readable within 300ms of first contentful paint (7 of 10 benchmarks: Vercel, Cursor, Supabase, Railway, Framer, GitHub, Neon show it at FCP) and at the latest within 800ms (Raycast fades 0 -> 800ms; Resend 300 -> 800ms). Linear's ~1.5s blur-in is the slow outlier; do not copy it as a default.
  **Why** the founder called Nocturne's staged "everything is loading in" a noobish tell; the market median is copy-first.
  **Applies to** landing page. **Check** CDP screencast filmstrip FCP+0/300/800: h1 opacity >= 0.9 at 300ms (or concept note). **Source** vercel, cursor, supabase, railway, framer, github, neon, raycast, resend, linear [measured via scripts/film.mjs]

- **RULE** Put the motion in the scene, not in the layout: Neon's signal bars loop from the first frame; Framer's glowing prompt box types ("Create a slee|") after copy is already placed; Railway's sky image crossfades behind pre-painted canvas between ~300 and ~650ms; Raycast's stripes arrive after its headline (not yet visible at FCP+2.5s in the filmstrip).
  **Why** a living object signals "product alive" without delaying the message.
  **Applies to** landing page. **Check** at most one choreographed reveal (object) plus <= 2 quick text groups within 1.2s. **Source** neon, framer, railway, raycast [measured]

- **RULE** Paint the dark canvas and any hero-image frame colour before the image decodes, then crossfade the image in <= 500ms; never let a white or transparent frame flash (Railway's rounded frame paints dark at 0ms and the sky fades in by ~650ms).
  **Why** a dark page that flashes grey/white on load looks broken before it looks premium.
  **Applies to** landing page. **Check** first screencast frame has no pixel with L > 0.5 outside intended UI. **Source** railway [measured]

- **RULE** Product UI inside the fold appears with the page, with at most one typed/animated moment inside it (Framer prompt typing, Linear's panel fading up to L ~0.2 by FCP+2.5s); reserve staggered row-by-row reveals for scroll sections.
  **Why** row-by-row hero staging repeats on every build; benchmarks rarely do it.
  **Applies to** landing page. **Check** hero product rows visible at FCP+800ms >= 80% of final. **Source** framer, linear, vercel, cursor [measured + visual]

### J. Composition and anti-patterns (Vigil / Nocturne)

- **RULE** Do not ship a dark hero with a flat field and no product frame: Vigil's fold measured p95-p5 luminance spread 0.000 (every block L 0.139), the only light being a lens shader of ~3,400 dots, with no product UI above 1000px.
  **Why** with neither a lit field nor a product frame the page has no focal depth; the shader is decoration, and the founder rejected it.
  **Applies to** landing page. **Check** luminance spread >= 0.16 or product frame >= 1000px wide in the fold. **Source** vigil work/vigil/hero-1440x900@2x.png [measured]

- **RULE** Do not use a mono display face with heavy negative tracking and a lime fill as the whole identity (Vigil: Geist Mono 74px/600, -4.44px, `#a3e635` L 0.849 C 0.207 CTA with a hard 3D shadow). If mono is the voice, keep tracking >= -2%, accent L <= 0.78, and make the CTA a benchmark grammar (inverse pill, deep fill, glass).
  **Why** the combination exceeds every benchmark on at least three axes (tracking -6%, accent lightness +0.07 over the max, fill L 0.85 with dark label).
  **Applies to** landing page. **Check** the three numeric checks above. **Source** vigil vs linear, raycast, supabase [measured]

- **RULE** Do not stack five atmosphere devices in one hero (Nocturne: star field, horizon rim glow, amber dawn gradient, gradient-filled 72px headline `#fff 30% -> rgba(255,255,255,.8)`, amber-tinted CTA shadow `0 8px 24px -8px rgba(245,178,107,.35)` and amber chart bars). Keep <= 2, one of which is the signature field.
  **Why** each device is fine alone; together they read as effects arriving one by one, which is exactly how the staged load-in felt.
  **Applies to** landing page. **Check** count devices; <= 2. **Source** nocturne vs vercel, resend, linear [measured + visual]

- **RULE** Give a dark product hero a fuller surface ladder than Nocturne's: the fold had two opaque neutrals (`#05060a` L 0.123 page, `#0b0d13` L 0.160 frame) and one repeated 3.5-4% white overlay with a single border alpha (.07). Add canvas, frame, panel, raised and sunken steps (rule in A), a strong-border alpha (.12-.20) for controls, and a tertiary text level.
  **Why** the UI inside read as one flat slab; the benchmark UIs have 4-6 steps and two border strengths.
  **Applies to** hero product proof. **Check** rules A.3/A.4 and B.2. **Source** nocturne vs linear, raycast [measured]

- **RULE** Do not spend dark effort on a pure-black canvas at L < 0.13 with a decorative sky; if the concept is atmospheric, use the illustrated-night family at L 0.16-0.19 with a rounded frame (Railway) so the frame, not the sky, sets the page edge.
  **Why** Railway keeps the atmosphere inside a rounded panel on a `#13111c` page; Nocturne ran the sky edge to edge.
  **Applies to** landing page. **Check** visual: art lives in a framed panel or fades to canvas at the page edge by mask. **Source** railway; nocturne [visual]

- **RULE** Keep at most one inverted (light) block per dark page, and make it a deliberate moment (Neon `#e4f1eb` L 0.947 section; Linear's lime customer card `#e4f222` L 0.92 C 0.20).
  **Why** a light block resets the eye; more than one turns the page into a two-theme collage.
  **Applies to** landing page. **Check** sections with background L >= 0.85 and height > 300px <= 1. **Source** neon, linear [measured]

- **RULE** Limit radius to a ladder per page (measured examples: Linear 8/12/pill; Raycast 6/8/11/12/20; Vercel 6/pill; Supabase 8/10.7/16/21; Resend 6/8/16/24) and match the CTA radius to the product frame radius family (Resend CTA 16 with 16 cards; Vercel pills with pill chips).
  **Why** dark UIs hide errors less than light ones; unmatched radii next to hairlines show immediately.
  **Applies to** all. **Check** distinct radii <= 5 in the fold; CTA radius in the same family as the product card radius. **Source** linear, raycast, vercel, supabase, resend [measured]

---

## 3. Numbers & scales

### 3.1 Measured dark tokens per site (1440x900 dark, computed styles; L = OKLCH lightness)

Ladders are the first sections of each page (full-page scan after scrolling). "Border" is the dominant 1px colour as alpha, flattened L in brackets. Text is primary / secondary / tertiary hex with WCAG contrast.

| Site | Canvas (L, C, H) | Surface steps (hex, L) | Border (alpha, flattened L) | Text 1 / 2 / 3 (WCAG) | Accent | Shadow / depth device |
|---|---|---|---|---|---|---|
| Linear | `#08090a` .139 .003 246 | `#0f1011` .172, `#101112` .177, `#161718` .204; white overlays .01-.07 | .08 (.230), .12 (.272), .05 | `#f7f8f8` .978 18.7 / `#8a8f98` .649 6.1 / `#62666d` .509 3.4; body ui `#d0d6e0` 13.6 | link `#8fa6ff` .744/.131; yellow card `#e4f222` | rings inset .05/.08, black inset `0 0 12px .2`, drop `0 2px 32px .25`; nav blur 20 |
| Raycast | `#07080a` .134 .005 262 | `--grey-800 #0c0d0f` .159, `-700 #111214` .182, `-600 #1b1c1e` .226, `-500 #2f3031` .309, `-400 #434345` .384; overlays white .02/.05, `rgba(158,190,215,.1)` | .10 (flat `#202123`), .06; keycap ring .2 @2px | `#fff` / `#9c9c9d` .693 7.3 / `#6a6b6c` .527 3.75 | `#ff6363` .700/.191 | 5-layer keycap bevel, white glow `0 0 14px .19`; 190 radial gradients; stripes shader |
| Vercel | `#000` (bg-200), `#0a0a0a` .145 (bg-100) | Geist gray HSL L: 100 10%, 200 12%, 300 16%, 400 18%, 500 27%, 600 53%, 700 56%, 800 49%, 900 63%, 1000 93%; alpha: `#ffffff0f 17 21 24 3d 82 8a 78 9c eb` | ring `0 0 0 1px rgba(255,255,255,.145)`; `#2e2e2e` .301 | `#ededed` .946 16.9 / `#a1a1a1` .709 8.1 / `#888` 5.9 | green `#62c073` .731/.142 (light `#297a3a` .515/.125) | rings only; lit prism canvas, block max L .364 |
| Cursor | `#14120b` .182 .014 94 (warm) | `#1b1913` .214, `#201e18` .235, `#26241e` .260, `#4a443b` .39 (frames) ; alpha `rgba(28,28,26,.62)`, `rgba(38,38,38,.84)` | `#edecec` at .10 (.277), .08, .06, .20 | `#edecec` .944 15.9 / `#edecec` at .60 (6.25) / at .40 (3.4) | `#f54e00` .652/.214 (same in light) | demo window shadows `0 28 70 .14`, `0 22 70 .30`; painting image |
| Supabase | `#131413` .190 .003 145 | `#181a19` .215, `#1b1d1c` .228; overlay `oklab .684 / .10` | `oklch(.95 .0015 157.5 / .075)` (.259), `/.135` (.316) | `#edefee` .950 13.5 / `#989a99` .684 6.5 / alpha .6-.7 | green `#3ecf8e` .762/.154; button fill `oklch(.436 .11 157.5)` | `inset 0 1px 0 rgba(255,255,255,.04)` + `0 1px 3px .2`; inset ring .12 |
| Resend | `#000` | Radix gray dark: `#141517 #191b1e #212629 #293034 #333b3e #3b4345 #434a4d #52595b #6e7679 #878d8f #a1a4a5 #f0f0f0` (L .195 .221 .265 .304 .346 ... .717 .955); alpha slate-2..12 `#d8f4f609 ... #fcfdffef` | `rgba(214,235,253,.19)` (.294), `.145` (.250) | `#f0f0f0` .955 16.9 / `#a1a4a5` .717 8.4 / `#6c6c6c` 4.0 | status `#3b9eff #46fea5 #ffc446 #ff9592`; | ring `0 0 0 1px rgba(24,25,28,.88)`; top glow gradients; 3D cube |
| Railway | `#13111c` .186 .022 292 (`hsl(250 24% 9%)`) | gray scale HSL: 50 `13%` ... 950 `97%` at hue 246-248, sat 21% -> 4%; pane `#0d0c14` .160; overlay white .05/.10 | .086 (.271), .10, .20 | `#fff` / `#a1a0ab` .710 6.6 / alpha .8, .65, .5 | purple fill `#553f83` .425; chips green .1 | inset ring .10 / 1.5px .20; pixel-sky image |
| Framer | `#000` | `#111` .178, `#171717` .205, `#1a1a1a` .218, `#242424` .260; blue tint overlays `rgba(0,153,255,.18-.2)` | .06, .08 | `#fff` / `#999` .683 7.4 / `#666` 3.3 | `#0099ff` .669/.184 | ring .08, `0 2px 6px .2`; blue glow prompt |
| GitHub | `#0d1117` .176 .014 258 | `#151b23` .220, inset `#010409` .104, `#3d444d` .384 (emphasis) | `#21262d`, `#3d444d`, `rgba(255,255,255,.1)` | `#f0f6fc` .970 / `#9198a1` .677 / | green fill `#08872b`, link `#a2daff` .863/.077 | almost no shadows (1 element); indigo bloom, max L .757 |
| Neon | `#000` | `#111315` .185, `#151617` .200, `#18191b` .213 | `#242628`, `#303236` .317, `#494b50`, `#61646b` | `#fff` / `#94979e` .676 7.2 / `#797d86` 5.1 | `#34d59a` .778/.155 | ring white .05 + inset `#303236`; `0 8 20 .4`; halftone |
| PlanetScale | `#111111` .178 | flat; 1px `#c1c1c1` grid | `#c1c1c1` full | `#e1e1e1` / `#a1a1a1` | link `#47b7f8`, CTA `#f35815`, banner `#fbca00` | none (0 shadows), radius 0, mono everything |
| Nocturne (ours) | `#05060a` .123 .011 | `#0b0d13` .160; overlays white .035/.04/.07 | .07 only | `#f5f6f8` / alpha .62 (7.3) / .5 (5.6) | `#f5b26b` .812/.118 | amber button shadow, star field, horizon rim |
| Vigil (ours) | `#07090c` .139 .008 | `#0a0e13` (oklab .167 / .85) | .08-.09; lime .4 | `#eef4fc` / `#8d939a` 6.4 / `#6f7a85` 4.6 | lime `#a3e635` .849/.207 | inset white .45 top on CTA, hard 3D shadow |

### 3.2 Recommended dark surface ladder, border and text set [engine note, derived from the medians above]

| Token | OKLCH L (range) | Example (cool tinted) | Measured basis |
|---|---|---|---|
| canvas | 0.134-0.195 (or `#000`) | `oklch(0.14 0.005 255)` | 11 sites |
| sunken | canvas -0.025 to -0.035 | `oklch(0.11 0.006 255)` | GitHub inset, Railway pane |
| surface-1 (card) | canvas +0.025 to +0.048 | `oklch(0.172 0.005 255)` | Linear, Raycast, Supabase, Cursor, GitHub |
| surface-2 (raised, popover) | canvas +0.065 to +0.10 | `oklch(0.205 0.005 255)` | Linear `#161718`, Raycast `#1b1c1e`, Cursor `#26241e` |
| surface-3 (hover/selected) | canvas +0.10 to +0.14, or white overlay .04-.07 | `rgb(255 255 255 / .06)` | Linear overlays |
| hairline | white alpha .06-.10 (flat +0.07 to +0.10 L) | `rgb(255 255 255 / .08)` | Linear, Supabase, Railway, Cursor |
| strong border | white alpha .12-.20 | `rgb(255 255 255 / .14)` | Resend .145/.19, Supabase .135 |
| text-1 | 0.944-0.978 | `oklch(0.96 0.004 255)` | 7 sites |
| text-2 | 0.65-0.72 (alpha .6-.62 of text-1) | `oklch(0.70 0.012 260)` | 9 sites |
| text-3 | 0.51-0.53 (alpha .4-.5) | `oklch(0.52 0.012 260)` | Linear, Raycast, Cursor |
| accent text/line | L 0.65-0.78, C 0.13-0.21 | e.g. `oklch(0.74 0.15 250)` | 7 sites |
| accent deep fill (white label) | L 0.42-0.44, C 0.10-0.11 | `oklch(0.436 0.11 157.5)` | Supabase, Railway |
| status chip bg | hue at alpha .07-.20 | `rgb(39 166 68 / .07)` | Linear, Framer |
| inverse CTA fill | L 0.92-0.95 or #fff; label = canvas | `#ededed` | 6 sites |

Warm and indigo variants: Cursor canvas `#14120b` (H 94, C 0.014); Railway `#13111c` (H 292, C 0.022). Keep hue constant across canvas, surfaces, borders and greys.

### 3.3 Light vs dark pairs (same site, both modes, measured)

| Site | Primary text | Secondary text | Accent text | Page bg | Type spec |
|---|---|---|---|---|---|
| Vercel | `#171717` -> `#ededed` | `#4d4d4d` -> `#a1a1a1` | `#297a3a` L .515 C .125 -> `#62c073` L .731 C .142 | `#fafafa` -> `#000` | h1 64/400/-3.84 same; body 16/400 same |
| Cursor | `#26251e` -> `#edecec` | alpha .6 (both modes) | `#f54e00` same | `#f7f7f4` -> `#14120b` | h1 26/400/-0.325 same; body 16/400 same |
| Supabase | `#030303` -> `#edefee` | `#696969` -> `#989a99` | violet L .504 C .233 -> `#bda4ff` L .775 C .130; brand green `#3ecf8e` same | `#fdfdfd` -> `#131413` | h1 46/500 same; body weight 450 same; border alpha .081/.146 -> .075/.135 |

### 3.4 Hero contrast measurements

| Pair | WCAG | APCA Lc |
|---|---|---|
| Linear primary `#f7f8f8` on `#08090a` | 18.73 | -103.0 |
| Linear `#d0d6e0` | 13.64 | -81.3 |
| Linear secondary `#8a8f98` | 6.13 | -41.8 |
| Linear tertiary `#62666d` | 3.45 | -22.8 |
| Vercel `#a1a1a1` / `#888` on `#000` | 8.13 / 5.92 | -51.4 / -38.6 |
| Raycast `#9c9c9d` / `#6a6b6c` on `#07080a` | 7.30 / 3.75 | -48.7 / -25.1 |
| Resend `#a1a4a5` / `#6c6c6c` on `#000` | 8.37 / 4.00 | -52.7 / -25.6 |
| Supabase `#989a99` on `#131413` | 6.52 | -46.7 |
| Neon `#94979e` / `#797d86` on `#000` | 7.18 / 5.09 | -46.1 / -33.3 |
| Cursor `#edecec` at .6 / .4 on `#14120b` | 6.25 / 3.79 | -44.5 / -26.9 |
| Nocturne sub (.62) / soft (.5) on `#05060a` | 7.30 / 5.56 | -48.3 / -37.6 |
| Vigil sub / tertiary on `#07090c` | 6.43 / 4.56 | -43.6 / -31.2 |

### 3.5 Fold luminance map (12x8 block medians, OKLCH L)

| Site | median | p5 | p95 | max | spread p95-p5 |
|---|---|---|---|---|---|
| Linear | .139 | .139 | .222 | .231 | .083 |
| Supabase | .190 | .190 | .215 | .215 | .026 |
| Resend | .097 | .000 | .187 | .222 | .187 |
| Vercel | .000 | .000 | .178 | .364 | .178 |
| Framer | .000 | .000 | .225 | .251 | .225 |
| Neon | .067 | .000 | .211 | .297 | .211 |
| Railway | .236 | .160 | .326 | .425 | .166 |
| Cursor | .182 | .182 | .439 | .760 | .257 |
| GitHub | .203 | .172 | .489 | .757 | .317 |
| Raycast | .138 | .134 | .489 | .529 | .355 |
| Nocturne (ours) | .160 | .117 | .325 | .534 | .208 |
| Vigil (ours) | .139 | .139 | .139 | .162 | .000 |

### 3.6 Heading type, measured at 1440px

| Site | Family | Size | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Linear | Inter Variable | 64 | 510 | -1.408px (-2.2%) | `#f7f8f8` |
| Vercel | Geist Sans | 64 | 400 | -3.84px (-6.0%) | `#ededed` |
| Raycast | Inter | 64 | 600 | normal | `#fff` |
| Cursor | CursorGothic | 26 | 400 | -0.325px (-1.25%) | `#edecec` |
| Supabase | Manrope | 46 | 500 | normal | `oklch(.95 .00275 157.5)` |
| Resend | Domaine (serif) | 96 | 400 | -0.96px (-1.0%) | `#f0f0f0` + gradient to .5 |
| Railway | IBM Plex Serif | 54 | 500 | -1.96px (-3.6%) | `#fff` |
| Framer | GT Walsheim Medium | 54 | 500 | -2.16px (-4.0%) | `#fff` |
| GitHub | Mona Sans | 64 | 425 | -2.24px (-3.5%) | `#fff` |
| Neon | Inter | 56 | 400 | -2.24px (-4.0%) | `#fff` |
| Nocturne (ours) | Geist Variable | 72 | 560 | -3.24px (-4.5%) | `#f5f6f8` + gradient to .8 |
| Vigil (ours) | Geist Mono | 74 | 600 | -4.44px (-6.0%) | `#eef4fc` |

### 3.7 Hero load-in timing (CDP screencast, dark, 1x; times after first contentful paint)

| Site | At FCP | +300ms | +800ms | +1500ms / +2500ms | What moves |
|---|---|---|---|---|---|
| Vercel | all copy, CTAs, prism, logos | same | same | same | nothing in 2.5s |
| Cursor | all copy, product window | same | same | same | static (4 frames total) |
| Supabase | all copy, card grid | same | same | cookie banner at 1.5s | nothing |
| GitHub | all copy, form | same | same | same | bloom only |
| Framer | all copy, prompt box glow | same | same | prompt types text by 2.5s | prompt typing |
| Neon | all copy, logos | bars already animating | same | bars keep animating | generative bars (loop) |
| Railway | copy + dark frame | same | sky image crossfaded in (~650ms) | same | image fade |
| Raycast | headline faint (33ms) | headline mid-grey | headline full, nav complete | subtitle at 1.5s; stripes not yet visible at 2.5s | headline fade 0-800ms |
| Resend | nav only | headline/CTAs ~30% | all copy done | same | copy fade 300-800ms |
| Linear | nav only | nav only | nav only | blurred headline ~1.5s; sharp + product panel by 2.5s | headline blur-in, panel fade |

### 3.8 Chart and data colours on dark (OKLCH)

| Site | Colours (hex L / C / H) |
|---|---|
| Railway | `#f1cd69` .859/.126/90; `#42946e` .605/.100/161; `#296852` .470/.074/167; `#ef9352` .747/.137/54; `#d2352b` .571/.195/29; `#83cd29` .771/.200/132 |
| Linear | `#00b8cc` .716/.123/209; `#27a644` .637/.175/147; `#f0bf00` .825/.169/90; `#5e6ad2` .567/.159/275 |
| Supabase ramp | `#00331a` .282/.069/156; `#00623b` .437/.102/158; `#42ce8c` .760/.153/159; `#84debd` .835/.099/168 |
| Raycast blues | `#02193b` .219; `#143ca3` .402/.172/264; `#63a1ff` .709/.153/258 |
| GitHub | `#a2daff` .863/.077/238; `#a371f7` .661/.193/298; `#d29922` .720/.140/80; `#f85149` .665/.205/27 |

---

## 4. Dos and Don'ts

**Do (measured at the benchmarks)**

1. Do put a hairline at 8% white on every card, row, divider and nav bottom (Linear 268 elements, Supabase 373, Railway 2,212). Do not use 20%+ borders at rest.
2. Do build four or more opaque neutral steps and use the fifth for the product frame (Raycast, Cursor, Framer have 6).
3. Do keep one inverse button per viewport and make the label the canvas colour.
4. Do light the page with one object or field and let the product do the explaining (Vercel prism, Resend cube, Neon bars, Railway sky).
5. Do keep the type spec you designed in light mode: same weights, same tracking.
6. Do tint greys toward the canvas hue and keep chroma 0.011-0.016.
7. Do render chips as hue at 7-20% alpha with hue text at L 0.64-0.76.
8. Do put the headline on screen at first paint and animate the object (Framer typing, Neon bars, Railway sky crossfade).
9. Do set `color-scheme: dark`, meta theme-color = canvas, and `antialiased` smoothing.
10. Do use a rounded frame to contain illustrated or photographic art on the page (Railway, Cursor).

**Don't (with the engine's own failures)**

1. Don't build a flat dark field with a shader as the only visual (Vigil: fold luminance spread 0.000, no product, mono h1 at -6%, lime fill L 0.849 with a hard 3D shadow).
2. Don't stack star field + horizon rim + dawn gradient + gradient text + amber button glow (Nocturne).
3. Don't ship a 2-neutral UI ladder (Nocturne's `#05060a` + `#0b0d13` + 3.5% overlay, one border alpha .07, no strong border, no tertiary level in the product).
4. Don't choose a canvas below L 0.13 without being true black (Nocturne `#05060a` L 0.123).
5. Don't stage the hero as a parade (stars first, then dawn, then rows, then summary). Seven of ten benchmark heroes show the headline at first paint.
6. Don't use `#fff` for body text, secondary greys under 6:1, or tertiary text for sentences.
7. Don't add coloured glow to the primary button (Nocturne amber `0 8px 24px -8px rgba(245,178,107,.35)`; benchmark glow is white <= .19, 14px).
8. Don't drop weights or add tracking "for dark"; no benchmark does.
9. Don't use mono headings with sans-style negative tracking (Vigil).
10. Don't darken photos with a black scrim to fit the theme.

---

## 5. Exceptions & judgement calls

- **Near-black vs true black.** True black (Vercel, Resend, Framer, Neon) works when the first surface is a large step and the page has a lit field or a bright product frame; near-black tinted (Linear, Supabase, Cursor, Railway) is the safer default for product-led heroes because the card steps have room. [engine note]
- **Pure white headings are allowed.** Five of the sites use `#fff` for display text; the rule is "not for body text", not "never". The risk grows with size of surrounding black.
- **Secondary text at Lc 42-53 ships on major sites** even though APCA body guidance is Lc 60-75. Those greys are used for subtitles, nav and captions; paragraphs use brighter text (Linear `#d0d6e0`). Where the engine writes real paragraphs on dark, go to Lc >= 60.
- **Alpha vs solid.** Resend and Radix-style systems define the whole ladder as alpha (slate-a2..a12); Linear/Vercel use solids; Cursor/Railway use alpha text. All three work; do not mix within one component.
- **Heavy, saturated hero fields** (Raycast red stripes, GitHub violet bloom, Cursor painting) break the "one dim glow" band by design. They stay premium because the text, nav and frame use the standard ladder and the field is a single object. Use sparingly; the founder's default direction is clean product-led.
- **Founder taste still wins.** The engine's default hero is centred, light, AlignUI-clean with a full dashboard; the founder asked for dark *at that quality*, not for a poster. Railway (centred h1, two CTAs, dashboard window running off the fold, inside a rounded art frame) and Linear/Framer (product frame filling the lower fold) are the closest dark equivalents. [engine note]
- **PlanetScale is a valid brutalist outlier**: `#111`, 1px `#c1c1c1` grids, radius 0, no shadows, yellow banner and orange CTA, mono body. It reads as a distinct brand rather than a premium SaaS gloss; high risk for the engine, mention only for a deliberately editorial-mono brief.
- **Screenshots are headless Chromium at 1440x900 @2x on the day measured**, cookie banners dismissed where possible (Supabase/Neon/Framer banners still appear in some filmstrip frames). Dynamic content (Raycast stripes, GitHub mascots, Neon bars) differs per load.
- **Marcel Kargul dark work.** kargul.studio itself renders as a light `#efefef` page with dark `#232323`/`#313131` panels (text `#efefef` at 13.7:1 on `#232323`); I found no dark theme to measure. The dark-panel-on-light idea is a legitimate alternative to a fully dark page for Larpo's AlignUI-leaning taste. [engine note]

### Named dark art directions that read premium

1. **Instrument black** (product is the hero; flat tinted canvas, hairlines, one hue, big tight type). Linear, Supabase, Cursor (warm variant), Framer (true-black variant). Canvas L 0.139-0.19; luminance spread <= 0.09 with a product frame >= 1000px; no glow.
2. **Lit object on the void** (true black, one rim-lit 3D or CSS object, quiet UI, gradient-faded display type). Vercel prism, Resend cube. Canvas `#000`; object max block L 0.22-0.36; two-weight copy.
3. **Illustrated night** (mid-dark chromatic canvas L 0.16-0.19 with a painted/pixel/generative scene inside a rounded frame and the product window cut by the fold). Railway (indigo `#13111c` + pixel sky), Cursor (warm `#14120b` + landscape painting), GitHub (indigo bloom). Closest to the founder's centred product-over-canvas default.
4. **Luminous generative field** (a shader/data field is the brand: Neon's signal bars with halftone, Raycast's stripes, Framer's glowing prompt). Copy at first paint, field alive from frame 1, one hue.
5. **Terminal brutalist** (PlanetScale: mono, `#111`, 1px light grids, hard accent; no radius or shadows). High risk, only when the brief is editorial-mono.

---

## 6. Figures worth keeping

All in `knowledge/benchmarks/dark/` (raw JSON next to each: `<site>.measure.json`; scripts in `scripts/`).

- `linear-fold-1440x900@2x.png`: instrument black: flat `#08090a`, 64px/510 headline, product frame with ring, white pill CTA; slices `linear-s1/s2/s3`: section seams at .08, code diff rows with 7-10% red/green row tint.
- `raycast-fold-1440x900@2x.png`: shader stripes hero with floating pill nav and keycap button; `raycast-s2`: bento cards with alpha surfaces and blueprint illustrations.
- `vercel-fold-1440x900@2x.png`: lit prism on a void, logo strip in white; `vercel-s1/s2`: black sections with ringed UI cards.
- `cursor-fold-1440x900@2x.png`, `cursor-s2`: warm `#14120b` canvas with a bright painting behind dark app windows.
- `supabase-fold-1440x900@2x.png`, `supabase-s1`: flat canvas, deep-green button, card grid with hairlines, product editor inset.
- `resend-fold-1440x900@2x.png`, `resend-s1/s2`: serif display at 96px with gradient fade, glass CTA, obsidian 3D cube, pure black sections.
- `railway-fold-1440x900@2x.png`, `railway-s1/s2`: illustrated night frame, dashboard cut by the fold, chart colours on a dark pane.
- `framer-fold-1440x900@2x.png`, `framer-s1/s2`: pure black with `#111` cards, blue glowing prompt, 6-level ladder.
- `github-fold-1440x900@2x.png`: indigo gradient bloom with mascots, green CTA, form pill.
- `neon-fold-1440x900@2x.png`, `neon-s1`: generative signal bars with halftone, pill CTAs, one light section.
- `planetscale-fold-1440x900@2x.png`: terminal brutalist.
- `<site>-film.png` (10 sites): 5-frame contact sheets at FCP+0/300/800/1500/2500ms.
- Own work for comparison: `work/nocturne/hero-1440x900@2x.png`, `work/vigil/hero-1440x900@2x.png`; re-measured copies `nocturne-fold-*`, `vigil-fold-*` and `.measure.json` in this folder.

---

## 7. Open questions

- No dark theme found, and therefore not measured: clerk.com, warp.dev, arc.net, attio.com, posthog.com, kargul.studio, convex.dev (they render light regardless of `prefers-color-scheme`; posthog's dark toggle was not reachable). Height.app is offline. Clerk's dark dashboard/docs surface is a better source than its marketing page.
- Hover, focus and pressed states in dark were not measured; the 6-10% / 12-20% border pair and white overlay steps are inferred from resting states.
- Linear's design tokens are hashed (`--sx-*`), so its ladder comes from rendered colours, not source tokens; Supabase exposes no custom properties.
- Linear's headline entrance (~1.5s) may include a cookie/analytics delay; one run per site, so timings are +-100ms.
- Block-median luminance includes UI and text blocks; treat the spread numbers as comparative.
- Whether a gradient-faded display heading (Resend) beats a solid white heading on conversion or taste is untested; use sparingly until a founder verdict exists.
- The 22px-ish frame radius for Railway's art panel is read from the screenshot, not computed.
- Nocturne's and Vigil's scores in section 3.1 come from their built `dist` pages (served locally at 1440x900); their DIRECTION.md deliberately differs from several benchmark numbers, so check whether any override was recorded before changing them.
