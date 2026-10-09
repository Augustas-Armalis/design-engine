---
source: web:linear.app, vercel.com, raycast.com, attio.com, arc.net, mercury.com, ramp.com, clerk.com, resend.com, supabase.com, framer.com, loom.com, notion.com, figma.com, stripe.com, airtable.com, dropbox.com, slack.com, anthropic.com, perplexity.ai, mistral.ai, runwayml.com, cohere.com, spotify.com, pinterest.com, airbnb.com, apple.com, nike.com, chase.com, db.com, mitsubishi.com + Wikimedia Commons (Mastercard 2019, Deutsche Bank without wordmark, Mitsubishi, Twitter bird, Slack icon 2019, Slack Logo Pre 2019, Claude AI symbol, OpenAI 2025 symbol, Apple logo black) (measured 2026-10-09)
chapter: Logo anatomy, measured: how 32 acclaimed marks are built and how 17 nav lockups pair mark with wordmark
pages: n/a (programmatic measurement; SVGs in knowledge/benchmarks/logos/marks/, renders in renders/, nav crops in nav/, raw numbers in anatomy-measurements.json + anatomy-nav-pairing.json)
topic_tags: [logo, mark, wordmark, lockup, construction, geometry, symmetry, radii, angles, stroke-weight, counters, favicon, 16px, nav, brand]
status: studied
---

# Logo anatomy, measured

Why this note exists: the founder says the engine's logos are terrible. Taste words ("simple", "geometric", "bold") did not fix that, so this note measures how marks that people admire are actually built, and turns the numbers into targets a generator can aim at and a checker can enforce (`system/logo/anatomy.json`, `tools/logo_measure.mjs`). The marks are study references only. Never reuse, trace or lightly modify any of them.

## 0. Method (so the numbers can be trusted and repeated)

- **Sources.** 22 marks taken from the inline SVG in the company's own nav (Playwright, Chromium 1440x900 @2x, non-essential cookies declined or the banner hidden with CSS, nothing accepted, no logins), 2 from the SVG the nav loads as an image (chase.com `logo_chase_headerfooter.svg`, cohere.com `logo.svg`), 1 from an SVG data URI in the nav (Framer), 9 from Wikimedia Commons. Lockups were cropped to the mark by splitting at the widest empty column. Every SVG is stored as data: scripts, handlers, `foreignObject` and external references stripped, rendered only as `<img>` or under a no-script CSP. Header comment in each file names its source.
- **Silhouette.** Each mark is rendered at 1024px on the long side and reduced to one-colour ink. Mode `alpha` (any painted pixel is ink) for 27 marks; `dark` (white fills are knock-outs) for Notion, Pinterest, Deutsche Bank and Arc (whose cream sticker outline is excluded); `light` for Loom (the white burst on the blue tile is the mark). Multi-colour marks are measured as their one-colour silhouette, which is how they meet a favicon, a stamp or a single-ink print; colour counts are recorded separately.
- **Raster metrics** (on a 512px analysis grid): parts = 8-connected ink components, holes = enclosed background components (both ignoring specks < 0.02% of the bbox); ink coverage of the bbox and of the convex hull; symmetry = IoU of the silhouette with its mirror (vertical, horizontal, both diagonals) and with its rotation by 360/n for n = 2,3,4,5,6,8,12 about the centroid or bbox centre; **local thickness** = diameter of the largest inscribed disc that contains each ink pixel (granulometry by opening), reported as area percentiles p5/p25/p50/p95 in % of mark height; the same on background inside the hull for gaps; min separation = the smaller of (shortest distance between two parts, inscribed diameter of the smallest counter).
- **Vector metrics** (sampling every outline at 1px steps with `getPointAtLength` after inlining `<use>`): share of outline length that is straight, constant-curvature arc, or free curve; dominant edge directions (degrees, 0 = horizontal, counter-clockwise); arc radius families in % of height; sharp corners; rounded corners (an arc of 30-200 deg between two straight runs) and their radius.
- **16px.** The silhouette is area-averaged into 16, 32, 64 and 256px squares, long side = N, black on white (`renders/<mark>-<N>.png`, contact sheet `anatomy-renders-sheet.png`). "Holds" by metric = no part or counter with >= 5% weight merges or vanishes and >= 85% of features (sqrt-area weighted) survive. "Holds" by eye = I looked at every 16px render at 4x; the eye verdict wins where they differ (they agree on 26/32).
- **Nav pairing.** Crop of the home link at @2x; ink = colour distance > 70 from the median border colour; the widest empty column splits mark from wordmark; the wordmark's baseline is the lowest row with >= 30% of the peak row count, x-height top the first row with >= 45%. "Cap" below means ink top to baseline of the wordmark line (cap height for Capitalised or CAPS words, ascender or i-dot height for lowercase ones), so for lowercase wordmarks the mark : x-height ratio is the more reliable one. Stem weight = the 35th percentile of horizontal ink runs across the middle of the x-band, divided by cap height; calibrated on Helvetica Neue rendered the same way: 300 = .068, 400 = .123, 500 = .164, 700 = .205.

Evidence grades as elsewhere: **[measured]** = from the script, **[eye]** = my visual verdict from the renders, **[engine note]** = interpretation.

---

## 1. Measurements

### 1a. Marks (32)

%H = percent of the mark's bounding-box height. "Build" = straight if >= 75% of outline length is straight, arc if >= 75% is constant-curvature arc, else mixed. Arc radii are the up-to-3 radius families with the most outline length. "Min separation" is blank for marks with no gaps or counters.

| mark | group | aspect | parts | holes | colours | symmetry (best IoU) | build | straight/arc/free % | angle peaks (deg) | arc radii %H | corners sharp / round (r %H) | stroke p50 %H | thinnest p5 %H | min separation %H | ink % bbox | 16px: thinnest px | 16px verdict (metric / eye) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| vercel | saas | 1.15 | 1 | 0 | 1 | mirror+rot3 (1.00) | straight | 99/0/1 | 119/59/0 | - | 3 / 0 | 65.2 | 23.8 | - | 50 | 3.31 | holds / holds |
| framer | saas | 0.67 | 1 | 0 | 1 | none (0.51) | straight | 98/0/2 | 0/134/89 | - | 10 / 0 | 33 | 13.8 | - | 58 | 2.21 | holds / holds |
| slack-2019 | saas | 1.00 | 8 | 0 | 4 | rot4 (0.99) | mixed | 37/60/3 | 0/89 | 10.5 | 4 / 8 (10.5) | 20.6 | 20.6 | 5.3 | 51 | 3.29 | loses 6/8 / detail lost |
| apple | classic | 0.81 | 2 | 0 | 1 | none (0.78) | arc | 1/82/17 | 126/157/22 | 21.3/54.8/26.8 | 4 / 0 | 64.7 | 12.1 | 4.9 | 64 | 1.94 | loses 1/2 / holds |
| linear | saas | 1.00 | 4 | 0 | 1 | mirror-diag (1.00) | mixed | 64/32/5 | 134 | 50/1.5 | 0 / 0 | 49.4 | 7.6 | 7.5 | 60 | 1.22 | loses 1/4 / holds |
| raycast | saas | 1.00 | 6 | 0 | 1 | mirror-diag (0.98) | straight | 95/0/5 | 134/44/0 | - | 41 / 0 | 15.8 | 7.6 | 3.1 | 30 | 1.22 | holds / detail lost |
| attio | saas | 1.22 | 2 | 2 | 1 | none (0.46) | straight | 82/15/4 | 57/121/0 | 8.3/4.6/1.4 | 2 / 12 (4.7) | 28.7 | 3.7 | 5.8 | 45 | 0.49 | loses 2/4 / detail lost |
| arc | saas | 1.15 | 1 | 1 | 4 | none (0.71) | mixed | 39/56/5 | 115/64 | 10.5/30/53.8 | 16 / 2 (10.5) | 27.2 | 20.8 | 7.3 | 40 | 2.89 | holds / holds |
| mercury | saas | 1.00 | 1 | 17 | 1 | rot4 (0.96) | arc | 0/93/7 | 0/89/28 | 48.6/15.8/38.6 | 48 / 0 | 3.3 | 3.1 | 7.2 | 31 | 0.5 | loses 17/18 / fails |
| ramp | saas | 1.17 | 2 | 0 | 1 | none (0.70) | mixed | 35/47/18 | 0/134 | 94.2/74.7 | 13 / 0 | 22.5 | 12.4 | 7.5 | 30 | 1.7 | loses 1/2 / detail lost |
| clerk | saas | 0.79 | 3 | 0 | 7 grad | near-mirror (0.87) | arc | 13/86/2 | 44/134 | 50/15.6/28.1 | 0 / 0 | 22.1 | 20.6 | 12.5 | 54 | 3.3 | holds / holds |
| supabase | saas | 0.97 | 1 | 0 | 8 grad | rot2 (1.00) | straight | 83/15/2 | 51/90/0 | 8.8/4.4 | 3 / 6 (8.8) | 37.7 | 18 | - | 41 | 2.88 | holds / holds |
| loom | saas | 1.00 | 1 | 1 | 1 | mirror+mirrorH+mirror-diag+rot12 (1.00) | straight | 85/10/5 | 0/119/149 | 15.2 | 36 / 0 | 10.6 | 10.6 | 30.2 | 45 | 1.7 | holds / holds |
| notion | saas | 0.96 | 2 | 2 | 1 | none (0.54) | straight | 84/10/7 | 3/89/122 | 11.7/3.5/7.3 | 14 / 12 (3.4) | 8.7 | 5.8 | 7.2 | 51 | 0.93 | loses 1/4 / holds |
| figma | saas | 0.67 | 1 | 1 | 5 | none (0.65) | mixed | 40/57/2 | 89/0 | 16.7/14.7 | 7 / 1 (16.7) | 33 | 33 | 5.1 | 72 | 5.28 | holds / holds |
| airtable | saas | 1.19 | 3 | 0 | 1 | none (0.61) | straight | 84/14/2 | 22/157/89 | 3.6/14.2/7.1 | 1 / 7 (7.1) | 42 | 16.4 | 6.4 | 56 | 2.21 | loses 2/3 / detail lost |
| dropbox | saas | 1.18 | 3 | 0 | 1 | mirror (1.00) | straight | 97/0/3 | 147/31 | - | 20 / 0 | 29.8 | 12.5 | 0.5 | 47 | 1.7 | loses 1/3 / detail lost |
| slack-2013 | saas | 1.00 | 1 | 1 | 8 | rot4 (1.00) | straight | 78/20/2 | 17/107 | 8.9 | 16 / 8 (8.9) | 19.3 | 16.9 | 19.5 | 50 | 2.7 | holds / holds |
| claude | ai | 1.00 | 1 | 0 | 1 | none (0.54) | straight | 88/0/12 | 53/176/84 | 10.4 | 66 / 0 | 8.7 | 5.8 | - | 40 | 0.93 | holds / detail lost |
| openai | ai | 1.01 | 1 | 7 | 1 | rot6 (0.98) | mixed | 46/50/5 | 89/150/29 | 24.8/18.4 | 24 / 8 (3.8) | 6.7 | 6.3 | 10.9 | 41 | 1 | holds / detail lost |
| perplexity | ai | 0.91 | 1 | 6 | 1 | none (0.78) | straight | 92/5/4 | 89/0/134 | 2.8 | 30 / 9 (2.8) | 5.5 | 5.5 | 12.9 | 38 | 0.88 | loses 4/7 / fails |
| mistral | ai | 1.40 | 1 | 2 | 5 | mirror (1.00) | straight | 96/0/4 | 0/89 | - | 40 / 0 | 25.2 | 19.3 | 20.2 | 57 | 2.21 | holds / holds |
| cohere | ai | 0.97 | 3 | 0 | 3 | none (0.73) | arc | 21/76/3 | 0/23 | 17/20.1/30.2 | 0 / 0 | 49.4 | 33 | 5.8 | 78 | 5.28 | loses 1/3 / detail lost |
| mastercard | classic | 1.62 | 1 | 0 | 3 | mirror+mirrorH+rot2 (1.00) | arc | 0/99/1 | - | 50 | 2 / 0 | 100.2 | 100.2 | - | 84 | 9.91 | holds / holds |
| chase | classic | 0.97 | 4 | 0 | 1 | rot4 (1.00) | straight | 94/3/3 | 89/0/46 | 3.5 | 12 / 4 (3.5) | 27 | 12.9 | 4.1 | 57 | 2.06 | loses 3/4 / detail lost |
| deutschebank | classic | 1.00 | 2 | 1 | 1 | rot2 (0.95) | straight | 99/0/1 | 0/89/53 | - | 12 / 0 | 13.8 | 13.8 | 8.2 | 58 | 2.21 | holds / holds |
| mitsubishi | classic | 1.16 | 1 | 0 | 1 | mirror+rot3 (1.00) | straight | 98/0/3 | 0/120/59 | - | 12 / 0 | 31.3 | 13.1 | - | 34 | 1.81 | holds / holds |
| airbnb | classic | 0.93 | 1 | 2 | 1 | mirror (0.98) | mixed | 31/60/10 | 116/64 | 22.8/17.7/14.9 | 4 / 0 | 7.6 | 7.6 | 19.7 | 32 | 1.22 | holds / holds |
| pinterest | classic | 1.01 | 1 | 0 | 1 | none (0.84) | arc | 5/94/1 | 76 | 50/30.8/21.8 | 4 / 0 | 18.2 | 9.3 | - | 59 | 1.48 | holds / holds |
| spotify | classic | 1.00 | 1 | 3 | 1 | none (0.82) | arc | 0/99/1 | - | 50/77.8/63.3 | 0 / 0 | 23.6 | 7.6 | 6.1 | 64 | 1.22 | holds / holds |
| nike | classic | 2.86 | 1 | 0 | 1 | none (0.29) | mixed | 61/33/6 | 22/14 | 31.8/71.5/81.5 | 2 / 0 | 32.5 | 10 | - | 26 | 0.56 | holds / holds |
| twitter | classic | 1.23 | 1 | 0 | 1 | none (0.63) | arc | 1/92/7 | 3/10 | 25.3/71.5/50.9 | 13 / 0 | 53.2 | 13.9 | - | 60 | 1.81 | holds / holds |

### 1b. Nav lockups and wordmarks (30 navs)

Pixel values are CSS px. Mark-only and wordmark-only navs are listed so the size of a solo mark or a solo wordmark is on record too. Nike's nav crop rendered blank (mark animates in) and Mastercard, Mitsubishi and Cohere's nav images were not measured for pairing; Mitsubishi's nav is a mark plus the words "Official Site".

| site | wordmark | mark H px | wordmark cap/asc px | x-height px | mark / cap | mark / x | gap px | gap / mark H | gap / cap | mark centre vs cap-band centre (% mark) | stem / cap | letter gap / cap |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| linear | Linear | 22 | 16 | 11.5 | 1.38 | 1.91 | 10 | 0.45 | 0.63 | 0 | 0.188 | 0.094 |
| attio | attio | 23.5 | 21.5 | 15.5 | 1.09 | 1.52 | 6.5 | 0.28 | 0.3 | 0 | 0.186 | 0.047 |
| mercury | MERCURY | 32 | 11.5 | - | 2.78 | - | 12 | 0.38 | 1.04 | 1 | 0.174 | 0.391 |
| ramp | ramp | 16 | 12 | 11.5 | 1.33 | 1.39 | 2.5 | 0.16 | 0.21 | -13 | 0.25 | 0.167 |
| clerk | clerk | 18 | 15 | 11 | 1.2 | 1.64 | 3.5 | 0.19 | 0.23 | 0 | 0.2 | 0.067 |
| supabase | supabase | 24 | 16 | 11 | 1.5 | 2.18 | 9 | 0.38 | 0.56 | 10 | 0.188 | 0.125 |
| loom | Loom (under ATLASSIAN) | 48 | 20 | 15.5 | 2.4 | 3.1 | 10 | 0.21 | 0.5 | -17 | 0.15 | 0.1 |
| airtable | Airtable | 21.5 | 18 | 13 | 1.19 | 1.65 | 4.5 | 0.21 | 0.25 | 3 | 0.167 | 0.056 |
| dropbox | Dropbox | 40 | 17.5 | 13 | 2.29 | 3.08 | 12 | 0.3 | 0.69 | 6 | 0.2 | 0.086 |
| slack | slack | 25.5 | 22 | 15.5 | 1.16 | 1.65 | 6.5 | 0.25 | 0.3 | 7 | 0.227 | 0.068 |
| mistral | Mistral | 15.5 | 15.5 | 11.5 | 1 | 1.35 | 5.5 | 0.35 | 0.35 | 0 | 0.161 | 0.065 |
| cohere | cohere | 20 | 20 | 15 | 1 | 1.33 | 6 | 0.3 | 0.3 | 0 | 0.15 | 0.075 |
| pinterest | Pinterest | 18 | 15 | 11 | 1.2 | 1.64 | 3 | 0.17 | 0.2 | 0 | 0.233 | touching |
| airbnb | airbnb | 32 | 17 | 12 | 1.88 | 2.67 | 4 | 0.13 | 0.24 | 2 | 0.176 | 0.088 |
| chase | CHASE | 24 | 19 | - | 1.26 | - | 6.5 | 0.27 | 0.34 | 0 | 0.211 | 0.105 |
| raycast | Raycast | 24 | 12 | 9.5 | 2 | 2.53 | 7 | 0.29 | 0.58 | 0 | 0.208 | 0.083 |
| framer | Framer | 24 | 10.5 | 7.5 | 2.29 | 3.2 | 10.5 | 0.44 | 1 | 1 | 0.19 | 0.095 |
| stripe | stripe | - | 20.5 | 15 | - | - | - | - | - | - | 0.22 | 0.049 |
| resend | Resend | - | 17 | 12 | - | - | - | - | - | - | 0.206 | 0.059 |
| anthropic | ANTHROP\C | - | 16 | - | - | - | - | - | - | - | 0.219 | 0.125 |
| runway | runway | - | 15 | 15 | - | - | - | - | - | - | 0.333 | 0.067 |
| deutschebank | Deutsche Bank | - | 14.5 | 10.5 | - | - | - | - | - | - | 0.138 | 0.069 |
| vercel | (mark only) | 18 | - | - | - | - | - | - | - | - | - | - |
| notion | (mark only) | 30 | - | - | - | - | - | - | - | - | - | - |
| figma | (mark only) | 28 | - | - | - | - | - | - | - | - | - | - |
| perplexity | (mark only) | 21 | - | - | - | - | - | - | - | - | - | - |
| arc | (mark only) | 27.5 | - | - | - | - | - | - | - | - | - | - |
| spotify | (mark only) | 32 | - | - | - | - | - | - | - | - | - | - |
| apple | (mark only) | 16 | - | - | - | - | - | - | - | - | - | - |

Live-text check: 21 of 22 measured wordmarks are artwork, not live text (19 outlined SVG paths, 2 raster images: Slack, Deutsche Bank). The only live-text wordmark is Framer (`Inter Variable`, `opsz 32, wght 600`, 14px, letter-spacing -0.01px, mark 16x24px, gap 10px). Apple's nav carries the hidden text "Apple" (SF Pro Text 600 17px, -0.374px) for accessibility, not as a visible wordmark.

---

## 2. Patterns, with numbers

1. **One silhouette.** 19/32 marks are a single connected shape; 5 have two parts, 4 three, 2 four, 1 six (Raycast), 1 eight (Slack 2019). Median 1, p75 2.25. [measured]
2. **Multi-part marks follow one of two grammars.** Either one dominant part (>= 55% of ink) plus small accents: Apple .95/.05, Deutsche Bank .84/.16, Ramp .79/.21, Notion .73/.27, Linear .72 + three stripes, Attio .70/.30, Clerk .57/.25/.18. Or identical parts repeated by rotation: Chase 4 x .25, Slack 2019 4 x .18 + 4 x .07, Dropbox .40/.40/.20, Airtable .44/.40/.16. Nothing in the set has 3+ unrelated parts of similar size. [measured]
3. **Complexity budget.** Marks that hold at 16px have parts + holes median 2, max 4, and an outline perimeter median 7.45x the mark height (p75 8.7, max 12). The two that fail at 16px are the most complex: Mercury 18 features and an 18.6H outline, Perplexity 7 features and 11.2H. [measured + eye]
4. **Thickness floor.** The thin end of the stroke (p25 local thickness) is >= 7.1% of height in every mark that holds at 16px (median 21%); the two failures sit at 3.3% (Mercury) and 5.5% (Perplexity). 7.5% of height is 1.2px at 16px. [measured + eye]
5. **Separation is what kills detail.** Marks that keep their interior at 16px have a min separation median 7.85% H; the ten that lose interior detail have median 5.8% (Raycast 3.1, Chase 4.1, Slack 2019 5.3, Cohere 5.8, Attio 5.8, Airtable 6.4, Dropbox 0.5 where rhombi meet at their tips). Their strokes are fine (median p50 24.8% H); the gaps close. [measured + eye]
6. **Ink coverage sits near half.** Median 50.5% of the bbox (IQR 40-58%, 18/32 in 40-60%, 28/32 in 30-65%). Below 30%: only Nike (26%, one gesture). Above 70%: only pure solids (Figma 72, Cohere 78, Mastercard 84). Hull coverage median 64.5%. [measured]
7. **Square-ish.** Aspect median 1.00 (IQR 0.97-1.16), 26/32 within 0.8-1.25. The exceptions are exact constructions: Framer and Figma 2:3 (0.666), Vercel and Mitsubishi 2:sqrt3 (1.151, 1.161; equilateral geometry), Mastercard 1.617 (two equal circles), Mistral 1.40 (pixel grid), Nike 2.86 (one swoosh). [measured]
8. **Fills, not strokes.** 31/32 marks are filled shapes; Spotify's single stroke is a 4.2% H hairline in the fill colour. Line-looking marks (Airbnb, OpenAI, Perplexity, Mercury) are outlined. [measured]
9. **Few edge directions.** Of 25 marks with >= 30% straight outline, 19 put >= 97% of straight length into <= 3 directions. Families: orthogonal 0/90 (Mistral, Figma, Deutsche Bank, Slack 2019, Notion, Perplexity; Framer and Chase add 45-degree cuts), triangle/hex 30-60-120 (Vercel 0/60/120, Mitsubishi 0/59/120, OpenAI 29/89/150, Dropbox 31/147, Attio 57/121, Loom 30-degree spokes), diagonal 45 (Linear 134, Raycast 134/44, Clerk's cuts), or one off-axis tilt kept everywhere (Slack 2013 17/107, Airtable 22/157, Airbnb 64/116 and Arc 64/115 as mirrored pairs, Supabase 51). The outliers are radial (Loom, rot12) and hand-cut (Claude, 6+ directions). [measured]
10. **Circles: few radii, simple ratios, not phi.** Arc-built marks use 1-3 radius families when geometric (Slack 2019 one radius 10.5% H = half its 20.6% bar; Figma 16.7% H = H/6 on a 3-row grid; Mastercard 50%; OpenAI 24.8/18.4; Clerk 50/28.1/15.6). Adjacent radius ratios (top 3 families per mark, 23 pairs over 13 arc-built marks) run 1.14-2.86, median 1.41. A full-height circle (r = 50% H) frames 6 marks (Linear, Clerk, Pinterest, Spotify, Mastercard, Mercury 48.6). Only one of the 23 ratios is golden: Pinterest 50/30.8 = 1.62. Twitter's famous "golden circles" bird measures 25.3/50.9/71.5% H = 1 : 2.0 : 2.8; Apple measures 21.3/26.8/54.8. Organic marks (Apple, Nike, Airbnb, Twitter) are free Beziers with 3-5 apparent radii. [measured]
11. **Corners: three treatments.** Dead sharp (Vercel, Framer, Mitsubishi, Deutsche Bank, Mistral, Dropbox, Raycast, Linear); round terminals with r = 0.45-0.6 x stroke, i.e. pill ends (Slack 2019 .51, Figma .51, Slack 2013 .46, Perplexity .5, OpenAI .57); or softened corners with r = 0.13-0.25 x stroke = 3.5-9% H (Chase .13, Attio .16, Airtable .17, Supabase .23). Rounded corner radius across the 11 marks that have them: median 7.1% H (2.8-16.7). [measured]
12. **Symmetry is decided, not drifted into.** 16/32 are exactly symmetric (best IoU >= 0.95): rotation only 7 (Slack 2013 and 2019 rot4, Mercury rot4, Chase rot4, OpenAI rot6, Supabase rot2, Deutsche Bank rot2), mirror only 5 (Dropbox, Mistral, Airbnb, Linear and Raycast on the diagonal), both 4 (Vercel, Mitsubishi, Mastercard, Loom). The asymmetric 16 stay clearly asymmetric: best IoU 0.29-0.84 except Clerk 0.87. In product marks rotation beats mirror (pinwheels: Slack, Supabase, Chase, OpenAI). [measured]
13. **One colour first.** 23/32 are one colour. Multi-colour marks colour whole parts (Slack 4, Figma 5, Mastercard 3 including the overlap, Mistral 5 bands, Cohere 3); only Clerk and Supabase use a gradient, and both read in one flat colour. [measured]
14. **16px.** By eye: 20 hold, 10 keep the silhouette but lose interior detail (Slack 2019, Claude, Cohere, Airtable, Ramp, OpenAI, Raycast, Attio, Chase, Dropbox), 2 fail (Mercury, Perplexity). Every mark that holds has its thin stroke (p25) >= 1.1px at 16px, and its separations >= ~1px except where the merge keeps the idea (Apple's leaf 0.8px, Figma's centre 0.8px). [eye + measured]
15. **Nav lockup proportions.** Mark height = 1.33x the wordmark's cap/ascender height (median; IQR 1.19-2.0; range 1.0 Mistral and Cohere to 2.78 Mercury) = 1.65x x-height (IQR 1.58-2.6). Gap = 0.28x mark height (IQR 0.21-0.35; range 0.13 Airbnb to 0.45 Linear) = 0.34x cap height; 6.5px median (4.5-10). Mark heights 20-25.5px (IQR), median 24px; wordmark cap 15-18.75px, median 16px. [measured]
16. **The mark is centred on the cap band.** Mark centre vs the centre of (cap top to baseline): median 0% of mark height, IQR 0-2%, 12/17 within +-3%. Since the mark is taller than the caps it hangs below the baseline, median 13% of its height (IQR 8-25%). Exceptions: Ramp sits on the baseline (-13%), Loom's tile centres on a two-line stack. [measured]
17. **Wordmarks are medium-to-bold and tight.** Stem/cap median 0.195 (IQR 0.174-0.217), which is Helvetica Neue 500-700; 21/22 are heavier than Helvetica Neue Regular (.123): only Deutsche Bank (0.138) is near regular; Runway (0.333) is black. Letter gap / cap median 0.083 (IQR 0.067-0.10); Pinterest's letters touch. Caps wordmarks open up: Chase 0.105, Anthropic 0.125, Mercury 0.39 (with a 2.78x emblem). 13/22 wordmarks are lowercase. [measured]
18. **Line marks match the wordmark's stem.** Where the mark is built from strokes, its stroke at nav size is 0.8-1.4x the wordmark stem (Airbnb .81, Pinterest .87, Ramp .98, Slack 1.05, Mistral 1.2, Clerk 1.33, Attio 1.38). Solid marks are 2-4x (Supabase, Framer, Dropbox, Cohere) and pair through mass instead. Mercury's emblem line is 0.53x its stem and is the one that falls apart. [measured]
19. **A lockup is optional.** 7/30 navs show the mark alone (Vercel 18px, Apple 16px, Perplexity 21px, Arc 27.5px, Figma 28px, Notion 30px, Spotify 32px) and 5 show the wordmark alone (Stripe, Resend, Anthropic, Runway, Deutsche Bank, cap heights 14.5-20.5px). [measured]

---

## 3. Rules

- **LA-01 RULE** Build the mark as filled geometry and outline every stroke before it ships; no visible `stroke` in the final SVG.
  **Why** 31/32 measured marks are fills; strokes scale with the viewBox inconsistently, join differently per renderer and cannot carry tapered or cut ends.
  **Applies to** all marks. **Check** `tools/logo_measure.mjs` LA-01 (counts shapes with a stroke). **Source** pattern 8 (Spotify the only stroke, a 4.2% H hairline).

- **LA-02 RULE** Default to one silhouette. If the idea needs parts, use either one dominant part >= 55% of the ink plus 1-2 accents, or 2-8 identical parts placed by rotation. Never 3+ unrelated parts of similar size.
  **Why** One connected shape is what a favicon, a stamp and a glance read; equal unrelated parts read as a cluster of icons.
  **Applies to** all marks. **Check** `parts` and `partAreas` in the tool output: largest share >= .55, or shares equal within .05 and `rotOrder` >= 2. **Source** pattern 1-2 (19/32 single; Apple .95/.05, Ramp .79/.21, Chase 4 x .25, Slack 4+4).

- **LA-03 RULE** Keep parts + counters <= 4 per module (rotational repeats count once) and the total outline <= 10x the mark height; above 6 features or 12H of outline the mark will not survive small sizes.
  **Why** Every edge must resolve at 16px; the two failing marks are the two most complex (Mercury 18 features and 18.6H, Perplexity 7 and 11.2H).
  **Applies to** marks, app icons, favicons. **Check** tool LA-03. **Source** pattern 3.

- **LA-04 RULE** Make the thin strokes >= 7.5% of the mark height (p25 local thickness), and nothing thinner than 5.5% anywhere that carries meaning.
  **Why** 7.5% H = 1.2px at 16px; every mark that holds at 16px is >= 7.1%, both failures are <= 5.5%.
  **Applies to** all marks. **Check** tool `thicknessPctH.p25` (fail < 5.5, warn < 7.5). **Source** pattern 4 (Airbnb 7.6 holds, Notion 7.1 holds, Perplexity 5.5 and Mercury 3.3 fail).

- **LA-05 RULE** Make every gap between parts and every counter >= 7.5% of the mark height (>= 1.2px at 16px). A narrower gap is acceptable only if, when it closes, the merged shape is still the same idea (Apple's leaf 4.9%, Figma's centre 5.1%).
  **Why** Gaps, not strokes, are what close up first: marks that lose detail at 16px have min separation median 5.8% against 7.85% for those that hold.
  **Applies to** all marks. **Check** tool `minPartGapPctH`, `minCounterPctH` (fail < 4, warn < 7.5). **Source** pattern 5 (Raycast 3.1, Chase 4.1, Slack 5.3 lose interior; Deutsche Bank 8.2, Clerk 12.5 hold).

- **LA-06 RULE** Aim for 40-60% ink in the bounding box (allowed 30-65%). Go below 30% only for a single gesture, above 70% only for a pure geometric solid.
  **Why** Near-half coverage gives the mark the same optical weight as a heavy letter beside it; thin open marks look faint at nav size and dense marks look like a blot.
  **Applies to** all marks. **Check** tool `coverageBBox`. **Source** pattern 6 (median 50.5%, IQR 40-58; Nike 26, Mastercard 84).

- **LA-07 RULE** Fit the mark to a square: aspect 0.8-1.25. Use a non-square box only when the geometry itself defines it exactly (2:3 grid, 2:sqrt3 triangle, two equal circles) or when the mark is one horizontal gesture.
  **Why** Marks live in square slots (favicon, avatar, app icon); the wide or tall exceptions in the set are exact constructions, not accidents.
  **Applies to** all marks. **Check** tool `aspect`. **Source** pattern 7 (median 1.00; Framer and Figma .666, Vercel 1.151, Mastercard 1.617).

- **LA-08 RULE** Choose one angle system before drawing and put >= 95% of straight edge length into <= 3 directions: orthogonal (0/90), triangle-hex (0/30/60/90/120/150), diagonal (45/135), or one deliberate tilt (15-25 deg, or a mirrored pair like 64/116) used for every straight edge. Radial marks (rotOrder >= 5) are exempt.
  **Why** A shared angle set is what makes separate edges look like one drawing; free angles look hand-placed.
  **Applies to** marks with >= 30% straight outline. **Check** tool LA-08 (`anglePeaks`). **Source** pattern 9 (19/25 marks >= 97% in <= 3 directions; Slack 2013 17/107, Airtable 22/157).

- **LA-09 RULE** Build curves from circles: 1-3 radius families, adjacent radii in simple ratios (1:1.25 to 1:2; 1:2, 2:3, 1:sqrt2 are the safe ones), terminals at half the stroke, and the full-height circle (r = 50% H) as the default frame. Do not claim golden-ratio construction unless the radii measure it.
  **Why** Shared radii make arcs and stroke ends belong together; the measured ratios are simple, and phi appears once in 32 marks.
  **Applies to** geometric marks (organic Bezier marks like Apple or Nike are the exception, and they compensate by being one solid silhouette). **Check** tool `arcRadii` (info when > 3 families). **Source** pattern 10 (Slack r 10.5 = bar/2; Figma r = H/6; Twitter 1 : 2.0 : 2.8; Pinterest's 1.62 the only phi in 23 ratios).

- **LA-10 RULE** Use one corner treatment for the outer silhouette: dead sharp, round terminals (r = 0.45-0.6 x stroke), or softened corners (r = 0.13-0.25 x stroke, i.e. 3.5-9% H). Sharp internal cuts are allowed where parts meet or interlace.
  **Why** Mixed corner logics look like two drawings stuck together; the softened band is large enough to read at 64px and small enough not to turn the shape into a blob at 16px.
  **Applies to** all marks. **Check** tool `cornerRadiusPctH` / `thicknessPctH.p50`; `sharpCorners` vs `roundedCorners`. **Source** pattern 11 (Chase .13, Attio .16, Supabase .23; Slack .51, Figma .51).

- **LA-11 RULE** Decide symmetry explicitly: either exact (best mirror or rotation IoU >= 0.94, built by mirroring or rotating one module) or clearly broken (<= 0.88, one directional gesture). For a product mark prefer rotation over mirror.
  **Why** Exact symmetry reads as built; near-symmetry (0.88-0.94) reads as a drawing error. The admired product marks are pinwheels more often than mirror images.
  **Applies to** all marks. **Check** tool LA-11 (`symmetry`). **Source** pattern 12 (rot only 7, mirror only 5, both 4, asymmetric 16 with max 0.87).

- **LA-12 RULE** Construct from one module and its transforms: a rotated, mirrored or gridded copy of a single part (a pill, a rhombus, a quarter, a grid cell), with every coordinate on a grid of H/12 or finer.
  **Why** A module gives the mark a reason; it is the difference between "constructed" and "drawn". 18/32 marks are one module and its transforms or a grid: the 16 exact mirror/rotation marks plus Figma's H/3 grid and Framer's 8-unit grid.
  **Applies to** generated marks. **Check** `rotOrder` >= 2 or mirror IoU >= 0.95, or vertices on a grid (Framer: every vertex on an 8-unit grid of a 16x24 box). **Source** patterns 2, 7, 12.

- **LA-13 RULE** Design and judge the mark in one flat colour first. Colour whole parts, never a gradient across one part, and make sure the one-colour silhouette still separates every part (LA-05).
  **Why** 23/32 marks are one colour; the multi-colour ones colour whole parts (Slack, Figma, Mastercard, Mistral) and still hold in one ink.
  **Applies to** all marks. **Check** render in `--mode alpha` black on white; tool reports `colours`, `gradient`. **Source** pattern 13.

- **LA-14 RULE** Gate every candidate at 16px: render black on white (tool `--renders`), and reject it if a part or counter with >= 5% weight merges or vanishes, or the thinnest meaningful feature is < 1.2px. A mark that only fails on interior detail needs a simplified favicon cut, decided now, not later.
  **Why** 10/32 admired marks lose interior detail at 16px and 2 fail outright; the engine's marks must not add to that list by accident.
  **Applies to** all marks. **Check** tool LA-14 (`survival[16]`), then look at `renders/<name>-16.png` at 4x. **Source** pattern 14.

- **LA-15 RULE** In a nav lockup make the mark 1.2-1.5x the wordmark cap height (or 1.5-2.2x its x-height for a lowercase wordmark). Go to 2-2.8x only for an emblem or a tile.
  **Why** The mark should lead by about a third without making the wordmark look like a caption.
  **Applies to** nav, footer, brand sheet. **Check** measure crop at @2x: mark ink height / wordmark (ink top to baseline). **Source** pattern 15 (median 1.33; Linear 1.38, Clerk 1.2, Chase 1.26; Mercury 2.78 emblem, Loom 2.4 tile).

- **LA-16 RULE** Set the mark-to-wordmark gap at 0.2-0.35x the mark height (0.25-0.6x the cap height), which is 4-10px in a 20-26px nav lockup.
  **Why** Tighter than 0.2 fuses the two into one word; wider than 0.45 splits them into two logos.
  **Applies to** lockups. **Check** widest empty column between mark and wordmark / mark height. **Source** pattern 15 (median 0.28; Airbnb 0.13 to Linear 0.45).

- **LA-17 RULE** Centre the mark vertically on the cap band (cap top to baseline), not on the line box and not on the x-height; let it overhang below the baseline (typically 8-25% of its height).
  **Why** 12/17 lockups centre within +-3%; centring on the line box drops the mark, centring on x-height lifts it.
  **Applies to** lockups. **Check** (mark centre - cap-band centre) / mark height within +-3%. **Source** pattern 16.

- **LA-18 RULE** Set the wordmark medium-to-bold (stem 0.17-0.22x cap height, roughly weight 500-700 in a grotesk), tightly spaced (letter gaps 0.05-0.10x cap height; 0.1-0.4 for an all-caps word), outlined to paths for the delivered SVG, and lowercase unless the brand voice needs caps.
  **Why** 21/22 measured wordmarks have stem/cap >= 0.15 (heavier than a regular grotesk) and the median gap is 0.083 cap; a light, loosely tracked wordmark looks like nav text rather than a name.
  **Applies to** wordmarks, lockups. **Check** stem/cap and letter-gap/cap on a @2x crop. **Source** pattern 17 (median .195 and .083; Deutsche Bank .138 the only regular).

- **LA-19 RULE** If the mark is built from lines, make its stroke 0.8-1.4x the wordmark stem at nav size; if it is a solid, let it be 2-4x heavier and pair through mass.
  **Why** Matched stroke weight makes mark and word one family; a hairline mark beside a bold word looks like a different brand (Mercury 0.53x is the one that falls apart).
  **Applies to** lockups. **Check** mark `thicknessPctH.p25` x mark height px / wordmark stem px. **Source** pattern 18.

- **LA-20 RULE** Size a mark at 20-26px tall in a nav lockup and 18-32px when it stands alone; a solo wordmark at cap height 15-20px. Decide per brand whether the nav carries the lockup, the mark alone (only if the mark is already known or the name is in the hero) or the wordmark alone.
  **Why** Those are the measured bands; 12/30 admired navs drop one half of the lockup.
  **Applies to** nav. **Check** nav crop ink heights. **Source** patterns 15 and 19.

---

## 4. Numbers & scales

| Quantity | Measured (n) | Target (anatomy.json) |
|---|---|---|
| Aspect (w/h) | median 1.00, IQR 0.97-1.16, 0.67-2.86 (32) | 0.8-1.25, hard 0.6-3.0 |
| Silhouette parts | median 1, p75 2.25, max 8 (32) | 1 preferred, <= 4 |
| Parts + holes per module | holds-at-16: median 2, max 4; fails: 7-18 | <= 4, fail > 6 |
| Outline length / height | holds: median 7.45, p75 8.7, max 12; fails 11.2-18.6 | <= 10, fail > 12 |
| Ink / bbox | median 0.505, IQR 0.40-0.58 (32) | 0.40-0.60 core, 0.30-0.65 allowed |
| Ink / convex hull | median 0.645, IQR 0.55-0.74 | info |
| Stroke p50 (% H) | median 26.1, IQR 15.3-34.2 | line marks 7.5-25, solids 25-100 |
| Thin stroke p25 (% H) | holds min 7.1, median 21.4; fails 3.3, 5.5 | >= 7.5, fail < 5.5 |
| Min separation (% H) | holds median 7.85 (min 4.9); detail-lost median 5.8 | >= 7.5, fail < 4 |
| Straight-edge directions | 19/25 put >= 97% in <= 3 | <= 3 directions hold >= 95% |
| Arc radius families | geometric marks 1-3; adjacent ratios 1.14-2.86, median 1.41 (23 pairs) | <= 3, ratios 1.25-2 |
| Rounded corner radius | median 7.1% H (2.8-16.7), n = 11 | softened 3.5-9% H = 0.13-0.25 x stroke; terminals 0.45-0.6 x stroke |
| Symmetry | exact 16/32, asymmetric max IoU 0.87 | exact >= 0.94 or broken <= 0.88 |
| Colours | 23/32 one colour | design in 1 |
| 16px thinnest feature | holds >= ~1.1px | >= 1.2px |
| Lockup mark / cap | median 1.33, IQR 1.19-2.0 (17) | 1.2-1.5 |
| Lockup mark / x-height | median 1.65, IQR 1.58-2.6 (15) | 1.5-2.2 |
| Gap / mark height | median 0.28, IQR 0.21-0.35 (17) | 0.2-0.35 |
| Gap / cap height | median 0.34, IQR 0.25-0.58 | 0.25-0.6 |
| Gap px | median 6.5, IQR 4.5-10 | 4-10 |
| Mark centre vs cap-band centre | median 0%, IQR 0-2% of mark | +-3% |
| Mark below baseline | median 13%, IQR 8-25% of mark | follows from centring |
| Wordmark stem / cap | median 0.195, IQR 0.174-0.217 (22) | 0.17-0.22 |
| Wordmark letter gap / cap | median 0.083, IQR 0.067-0.10 (21) | 0.05-0.10 (caps 0.1-0.4) |
| Nav mark height | lockup median 24px (IQR 20-25.5); solo median 27.5 (16-32) | 20-26 / 18-32 |
| Wordmark cap height | median 16px, IQR 15-18.75 | 15-19 |

Exact constructions found in the set: Vercel equilateral triangle (aspect 1.151 = 2/sqrt3, edges 0/60/120); Mitsubishi three rhombi at rot3 (1.161, edges 0/59/120, vertex-touching); Framer on an 8-unit grid in a 16x24 box (from the path: every vertex a multiple of 8); Figma five shapes on an H/3 grid with r = H/6; Slack 2019 bar 20.6% H, pill radius 10.5% H = half the bar, gap 5.3% H; Mastercard two equal circles, box 1.617.

---

## 5. Dos and Don'ts

- **Do** build a module and rotate it (Slack 2019: one pill + one stub, 4 rotations; Chase: one quarter, 4 rotations; OpenAI: one link, 6 rotations). **Don't** draw four different shapes and arrange them in a square.
- **Do** keep a line mark's stroke >= 7.5% H (Airbnb 7.6%, one continuous line, 2 counters, holds at 16px). **Don't** draw emblem linework at 3% H (Mercury: 17 counters at 3.3% H, mush at 16px and 32px reveals only a ring).
- **Do** leave >= 7.5% H between parts (Deutsche Bank 8.2%, Clerk 12.5%). **Don't** separate parts by hairlines (Raycast 3.1% and Dropbox's tip-to-tip rhombi go grey at 16px; Chase's 4.1% slots close).
- **Do** pick one angle family (Vercel 0/60/120 only). **Don't** mix 45-degree cuts into an orthogonal mark unless they are the idea (Chase's 46/135 cuts are 25% of its straight edges and it is one of the ten that lose detail).
- **Do** centre the mark on the cap band and let it hang below the baseline (Linear, Clerk, Chase, Pinterest at 0%). **Don't** align mark bottom to baseline by default (only Ramp does, and its mark is a baseline ramp by concept).
- **Do** set the wordmark at stem 0.17-0.22 cap (Linear .188, Chase .211, Stripe .22). **Don't** use regular-weight nav text as the wordmark.

---

## 6. Exceptions & judgement calls

- **Detail that does not survive is sometimes fine.** Slack 2019, Chase, Airtable, Raycast and Attio lose interior gaps at 16px and remain famous. They are big brands with separate small-size assets or so much recognition that the silhouette suffices. [engine note] A new client brand does not have that recognition; the engine should meet LA-04/05 or ship a favicon cut.
- **Organic marks break the circle rules.** Apple, Nike, Twitter and Airbnb are free Beziers with 3-5 apparent radii. They work because each is one solid silhouette with a single idea (LA-02, LA-06 and LA-04 hold). [engine note] The engine should not generate freehand curves; its strength is construction. Treat organic curves as out of scope unless a designer supplies them.
- **Claude's spark** breaks LA-08 on purpose (rays at 6+ directions, deliberately irregular, 66 sharp corners) and loses its core at 16px into a blot. It is a brand-voice decision (handmade warmth) that the engine should not imitate by default.
- **Mark-only and wordmark-only navs** (12/30) are a brand-maturity decision, not a size rule. [engine note] For a new client, ship the full lockup unless the name is already in the hero.
- **Coverage band is a tendency, not a law.** Nike (26%) and Mastercard (84%) are both outside and both iconic; they are the extremes of "one gesture" and "pure solid".
- **Near-symmetry exception.** Clerk (0.87) sits at the boundary of "broken": its C is horizontally almost mirrored with the dot and bar breaking it. The checker warns only between 0.88 and 0.94.

---

## 7. Figures worth keeping

- `knowledge/benchmarks/logos/anatomy-marks-sheet.png`: all 32 extracted marks side by side.
- `knowledge/benchmarks/logos/anatomy-renders-sheet.png`: each mark at 16 and 32px actual size, 16 and 32 at 4x pixelated, and 256: the 16px column is the whole argument for LA-04/05/14.
- `knowledge/benchmarks/logos/renders/mercury-16.png` vs `airbnb-16.png`: two line marks, 3.3% vs 7.6% H stroke.
- `knowledge/benchmarks/logos/renders/slack-2019-16.png`: a 5.3% H gap turning grey.
- `knowledge/benchmarks/logos/nav/*-nav.png`: the 29 nav crops the pairing numbers come from.

---

## 8. Open questions

- The x-height and baseline finder is a row-count heuristic; for lowercase words the "cap" figure includes ascenders or the i-dot (Attio's 21.5px is the i-dot), which is why mark : x-height is reported too. Not hand-verified per site beyond the contact sheet.
- Arc radii come from sampled curvature of Bezier approximations, +-10%; small rounded corners under ~1.5% H are below resolution.
- Raycast's nav measured at 93x24 (SVG box) because its home link reports a zero box; Nike's nav crop rendered blank, so Nike has no pairing row.
- Mastercard, Deutsche Bank, Mitsubishi, Twitter, Slack (both), Claude, OpenAI and Apple come from Wikimedia Commons redraws of the official marks, not the owners' sites; small geometry differences from the masters are possible.
- Not measured: optical overshoot (do round marks extend past the square?) and how marks are placed inside app-icon tiles. Both would need the owners' brand kits.
- The eye verdicts at 16px are mine, one viewer, 4x pixelated view; the metric verdict agrees on 26/32.
