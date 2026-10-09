---
source: web:logosystem.co (159 curated marks, designer-credited), svgl.app (87 shipped tech marks + 67 wordmark lockups), dribbble.com/tags/logo-construction, paulrand.design (Rand 1991 "Logos, Flags, and Escutcheons"), logodesignlove.com (Sagi Haviv interview), Geismar/Haviv talks via secondary summaries, typographica.org + emails.typography.com (Studer, Hoefler on stroke optics), en.wikipedia.org Overshoot (typography), fastcompany.com (AI hexagon/swirl trend), nngroup.com (AI sparkles icon), Taschen Logo Modernism TOC (library records)
chapter: Logo craft: how studio-grade abstract and geometric marks are constructed, measured, paired with a wordmark and tested
pages: n/a (captured 2026-10-09 with Playwright Chromium; evidence in knowledge/benchmarks/logos/, numbers in knowledge/benchmarks/logos/measurements.json)
topic_tags: [logo, brand-mark, symbol, monogram, wordmark, lockup, construction, geometry, optical-correction, favicon, one-colour, negative-space, radial, grid, cliche, ai-slop]
status: studied
---

# Logo craft

Why this note exists: the founder called every engine logo "straight up dogshit". The engine's marks were two overlapping rounded squares, or a generic icon-set glyph next to a wordmark. That is an icon, not a mark. A mark is **one constructed idea, built from 1-4 primitives with one consistent geometry, that still reads at 16px in one colour**. This note is how to build one.

Evidence (study only, never copy; credits in `knowledge/benchmarks/logos/CREDITS.md`):
- `knowledge/benchmarks/logos/logosystem-*.png`: 55 credited marks across all families.
- `knowledge/benchmarks/logos/svgl-*.png`: 25 shipped tech marks (Linear, Notion, Slack, Vercel, Supabase, OpenAI, Anthropic, PlanetScale, Railway, Deno, Webflow...).
- `knowledge/benchmarks/logos/lockups/`: 67 shipped mark + wordmark lockups.
- `knowledge/benchmarks/logos/scale-test-1x.png`: 22 shipped marks at 16/24/32/64px, one colour, inverse, plus a stroke ladder.
- `knowledge/benchmarks/logos/measurements.json`: pixel measurements (parts, coverage, stroke and gap as a fraction of mark height, gap/stroke, and for lockups mark/cap, gap/mark, stroke match, vertical offset). Script: `measure-marks.mjs`.
- `knowledge/benchmarks/logos/sheets/`: contact sheets (all 159 logosystem captures, all SVGL marks and lockups, Dribbble construction page).

Pinterest search showed a login wall, so per the brief it was not used; Logosystem, SVGL and Dribbble replaced it.

## 1. Core ideas

1. **A logo identifies; it does not explain.** Rand: a logo "doesn't sell (directly), it identifies", its subject matter "is of relatively little importance", and it only works "after it becomes familiar" (Rand 1991). A literal picture of the product (a brain for AI, a chat bubble for chat, a shield for security) is the amateur instinct. Every strong reference here is an abstract or letter-derived form whose meaning is lent to it by the name and the product.
2. **Simple, distinctive, appropriate.** Chermayeff & Geismar & Haviv's test: it must be simple enough to render at any size, distinctive enough to stick (the "doodle test": could someone draw it from memory), and appropriate to the client (Haviv; Geismar adds "flexible: works in different sizes and contexts"). Haviv also says "there has to be a good reason for a symbol"; without one, lead with the name (a wordmark). (Haviv interview, Logo Design Love.)
3. **Meaning is supplied by the viewer.** Bierut: logos are "primitive and yet we invest them with so much meaning"; much of the meaning "happens in our own mind" (It's Nice That, Indaba talk). Practical consequence: don't try to pack the product story into the mark. One idea, executed precisely, beats three ideas combined.
4. **Measured: a shipped mark is one solid object about half full.** Across 63 shipped tech marks: median ink coverage of the bounding box 0.48 (p25-p75 0.38-0.56), bbox aspect ~1.0 (p25-p75 0.98-1.14), **median 1 connected part, p75 3, p90 4**. The engine's failures (two overlapping rounded squares, an icon glyph) are within the numbers but carry no idea; the numbers are necessary, not sufficient.
5. **Stroke and gap have three regimes, and good marks commit to one.** Gap/stroke ratio across 52 shipped marks: p10 0.13, median 0.71, p90 2.28, clustering into (a) **slit** 0.07-0.3: one object cut by hairline gaps (Slack 0.09, Figma 0.07, WorkOS 0.12, Webflow 0.14, Clerk 0.16, Xata 0.17, Convex 0.23); (b) **band** 0.4-1.2: equal stripes of ink and air (Turborepo 0.43, Spotify 0.46, Railway 0.68, PlanetScale 0.98, Linear 1.0, Svelte 1.07); (c) **airy line** 1.5-5: monoline drawing (OpenAI 1.53, Airbnb 2.17, Neon 2.56, Perplexity 3.0, Prisma 3.2, Laravel 4.9). Mixing regimes inside one mark is what makes it look assembled.
6. **Two stroke weights, never in between.** Filled marks (coverage >= 0.4): stroke p25-p75 0.13-0.22 of mark height, median 0.17. Line marks (coverage < 0.4): median 0.075, p25 0.056. At 16px a 0.075 stroke is 1.2px and survives; at 0.03-0.05 it dissolves (Perplexity 0.027, Laravel 0.032, OpenAI 0.062 all turn to mush at 16px in `scale-test-1x.png`; the synthetic ring reads from 9% up).
7. **Construction is a family, then a rule, then one deviation.** Every reference reduces to: pick a family (radial, grid, monogram, cut, interlock, bars, orbit, blob, fold, line), choose 1-3 primitives, fix one angle set (0/90, 45, 30/60, or 360/n) and one radius rule, then make **one** deliberate break (a cut, a shifted bar, a missing petal) that becomes the identity. The break is the brand; the system is what makes it look designed.
8. **Construction grids are often theatre.** The Apple golden-ratio grid is post-rationalised: Janoff drew it "pretty much freehand", Landor later geometrised it, and Cole showed it fits the golden ratio only if the definition becomes "so vague as to be worthless" (Fast Company, Gizmodo). Dribbble's logo-construction genre (`sheets/dribbble-logo-construction.png`) overlays circles after the fact. Real construction is a small set of shared measurements (one stroke, one radius, one gap, one angle), not decorative circles.
9. **Optical correction is what separates drawn from typed.** Round forms overshoot flat ones by about 1-3% of height (type designers' norm; Karow recommends 3% for O, 5% for A apexes). Horizontal strokes look heavier than vertical ones of equal width; a peer-reviewed study (de Waard, Van der Burg, Olivers in *Vision*, reported by Hoefler) found the balanced square had verticals nearly 7% thicker than horizontals; a type designer's own test found about 1%. White on black reads bolder (irradiation) and needs thinning by eye (Hochuli via Studer; LogoGeek).
10. **Pairing is measurable and tight.** Across 47 shipped lockups: mark height = **1.43x cap/ascender height** (p25-p75 1.19-1.64), gap = **0.28x mark height** (p25-p75 0.22-0.33), i.e. 0.37x cap height; mark vertically centred on the letters (median offset -0.01 of word height); mark stroke = **1.29x wordmark stem** (p25-p75 0.89-1.65); wordmark stem = 0.178x cap height (p25-p75 0.154-0.205), a medium-to-semibold grotesk. A parallel study (`system/logo/anatomy.json`, 32 marks: coverage median 0.505, aspect median 1.0, 1 part preferred) and its nav measurement `knowledge/benchmarks/logos/nav-pairing.json` agree (Linear mark/cap 1.38, Attio 1.09; gap/mark 0.28-0.45; stem/cap 0.186-0.188).
11. **The AI category has a uniform: hexagon, swirl, sparkle, gradient.** Fast Company's trademark analysis: hexagons appear in AI logos about 4.6x as often as in logos generally, and an implied rotation around a centre is "a hallmark" (DeepMind, Stability, Synthesia). NN/g found users read the four-point sparkle as "optimization" or "favourite", not AI; in one study none of 106 people read it as AI. Our own captures confirm it (`sheets/logosystem-ai-fold.png`: asterisks, sparkles, swirls, hexagons, gradient glass). An AI mark that uses any of these must earn it with a genuinely owned construction (Claude's irregular asterisk, OpenAI's interlaced knot), never as the default.
12. **Gradient and 3D are finishes, never the idea.** The gradient-glass references (Atlas, Snaptix, Diamond, Soul Sessions) only work where the flat silhouette already works. Convex, Figma and Slack are multi-colour but each pass the 1-colour test because colour sits on a valid flat shape.

## 2. Mark families: construction recipes

Numbers are fractions of mark height H unless stated. "Refs" point to files in `knowledge/benchmarks/logos/`. Generator parameters are in `system/logo/families.json`.

### F1 Radial / rotational
- **Recipe.** Draw one module (petal, chevron, blade, loop, L-corner, dash). Rotate it n times by 360/n about the centre. Leave a central void or a central dot.
- **Primitives.** Module = rounded rectangle, chevron, circle arc, teardrop, L.
- **Counts.** Solid modules n = 3-8 (Convex 3, 1228 6, Hudello 6, OpenAI 6 interlaced, Slack 4 rotated 90deg, Collab 4, Wayfinder 4, Zeero 4 L-corners, Craft 4 loops, Loom 8). Thin rays n = 12-32 (Maddison & Walker ~12, Syntage ~24 in rings, Stylish Rent ~24).
- **Ratios.** Inner void radius 0.18-0.35 of outer radius. Solid modules: stroke 0.12-0.2 H, gap between modules 0.4-1.6 stroke (1228 1.56, Loom 0.4, Turborepo 0.43). Rays: ray width 0.04-0.07 H; ray tips on one circle; rays never touch the centre.
- **Corners.** One rule: all sharp (1228, Wayfinder) or all fully round caps (Craft, Hudello).
- **Good vs amateur.** Good: the module itself is distinctive (Slack's capsule-plus-dot, Zeero's corner brackets around a diamond) and n is low. Amateur: an 8-12 point asterisk or sparkle with equal arms (the AI default; Fuse, Star-1), random rotation offsets, modules overlapping in mush at 16px.
- **Refs.** `logosystem-1228`, `-craft`, `-uniqode`, `-syntage`, `-stylish-rent-symbol`, `-maddison-walker`, `-collab`, `-wayfinder`; `svgl-slack`, `-turborepo-icon-light`, `-openai`, `-convex`.

### F2 Modular grid / pixel
- **Recipe.** Choose a unit grid (3x3 to 5x5, or 2x4 for a letter). Fill cells to draw a letter, step or figure. Optionally replace a cell with a quarter-circle or triangle; never more than two cell shapes.
- **Ratios.** Cell gap 0 (cells merge into one shape: Mistral, Better Auth) or >= 0.15 unit (TBD, Pad-res, Vive dots). Corner radius 0 or 0.5 unit (full round), one value only. Coverage 0.45-0.75.
- **Good vs amateur.** Good: the grid is visible but the figure is a recognisable letter or step (38's stacked bars, TBD's three glyphs, Harv's square/triangle/quarter set). Amateur: random checkerboard, cell sizes that drift, a "pixel" mark rendered with anti-aliased off-grid edges.
- **Refs.** `logosystem-38`, `-tbd`, `-harv`, `-pad-res`, `-vive`; `svgl` Mistral and Better Auth in `sheets/saas-*`; Conductor in `lockups/`.

### F3 Letter-derived monogram
- **Recipe.** Take the initial. Reduce it to 1-3 strokes of one weight. Keep the letter's counter as the signature negative shape. Make one cut or terminal decision (flat, 45deg, round) and apply it everywhere.
- **Ratios.** Stroke 0.16-0.34 H (Deno 0.20, Clerk 0.22, Anthropic 0.22, Mastra 0.22, xAI 0.17, Webflow 0.34, WorkOS 0.34). Counter >= 0.8 stroke so it stays open at 16px. Aspect 0.8-1.2.
- **Good vs amateur.** Good: the letter is found inside a simpler geometric figure (Daimon: a square with a circular counter = D; Gobji: one spiral = G; Bonia: an oval plus a stem = b; Granola: a spiral G; Swell: two parallel S strokes). Amateur: a typed letter from a font in a rounded square (the founder rejected icon-in-a-box), a letter with mixed stroke weights, ligature-style overlaps.
- **Refs.** `logosystem-daimon`, `-gobji`, `-bonia`, `-beron`, `-axiom`, `-ambiance-creators`, `-granola`, `-swell`, `-codecraft`, `-ringback`, `-d-shaped`; `svgl-notion`, `-webflow`, `-deno`, `-clerk-icon-light`, `-anthropic_black`, `-framer`.

### F4 Negative space / cut
- **Recipe.** Start with one solid primitive (circle, square, superellipse, triangle). Subtract 1-4 shapes: parallel slits, a second circle, a quarter, a wedge. The subtracted shape is the idea.
- **Ratios.** Parallel cuts: band regime, cut width = ink band width (Linear gap/stroke 1.0, PlanetScale 0.98, Railway 0.68, Spotify 0.46). Single cut: width 0.05-0.09 H, at one angle (45deg Linear/PlanetScale, 0deg Railway/Spotify). Inner circle for "circle-in-square": diameter 0.45-0.6 of the square (Amina, Element, Daimon).
- **Good vs amateur.** Good: the cut creates a second reading (Jinxed: a disc whose cut becomes a swoosh; Logo Darel Studio: a cube read from a cut square). Amateur: cuts at random angles, cuts that leave slivers thinner than 0.05 H, decorative holes with no reading.
- **Refs.** `logosystem-jinxed`, `-amina`, `-element`, `-logo-darelstudio`, `-eye`, `-makanat`, `-pearl-box`; `svgl-linear`, `-planetscale`, `-railway`, `-spotify`.

### F5 Interlock / link
- **Recipe.** Two (rarely three) identical modules; the second is the first rotated 180deg or mirrored. Overlap them and show the over-under with a break in one stroke.
- **Ratios.** Break gap 0.25-0.6 of stroke (Convex 0.23, Upstash 0.83 is airy). Stroke 0.11-0.2 H. Overlap 20-40% of module width.
- **Good vs amateur.** Good: the module is not a plain square (Bontrust: two hexagon halves; Upstash/Svelte: an S of two hooks; VM: metaball nodes). Amateur: two overlapping rounded squares with a transparency blend (the exact engine failure; `logosystem-people-face` shows how even a skilled designer needs an extra idea, the face cut, to make stacked outlines work).
- **Refs.** `logosystem-bontrust`, `-manifold`, `-datachain`, `-zynk`, `-vm`; `svgl-convex`; Upstash, Svelte, SST in `sheets/saas-*`.

### F6 Stacked bars / steps
- **Recipe.** 3-5 bars of equal thickness h. Apply one progressive transform: shift (stairs), bend (Depot), taper, or skew. Bars may share a rounded cap rule.
- **Ratios.** Bar thickness 0.14-0.22 H (Depot 0.145, Intlayer 0.21, PostHog 0.22). Gap between bars 0.5-1.0 h. Count 3-5 (Depot 4, Intlayer 3, Sileon 3, Abstract-logo 4).
- **Good vs amateur.** Good: the transform carries the idea (Depot's bars bend into a funnel; Handled's two chevrons interleave). Amateur: three plain horizontal lines (reads as a menu icon), unequal bar weights.
- **Refs.** `logosystem-abstract-logo`, `-buildingls`, `-handled`, `-sileon`, `-38`; `svgl-depot-light`, `-posthog`.

### F7 Orbit / arc / ring
- **Recipe.** A ring or arc with one interruption: a break, a satellite dot, an inner offset circle, or a second arc.
- **Ratios.** Ring stroke 0.12-0.2 of diameter (Coinbase 0.15, Turborepo 0.13); satellite dot diameter 1.0-1.5x ring stroke; break angle 30-60deg.
- **Good vs amateur.** Good: the interruption is unique (Opera's offset inner ellipse, Coinbase's C as a cut ring). Amateur: concentric rings with no break, planets with orbit ellipses (literal "global").
- **Refs.** `logosystem-osiro`; Coinbase, Opera, Zen, Turborepo in `sheets/saas-*`.

### F8 Blob / superellipse / metaball
- **Recipe.** 2-5 circular nodes joined by tangent fillets (metaball), or one superellipse with a single bite.
- **Ratios.** Fillet radius 0.3-0.6 of node radius; node count 2-5 (Mastra 5, VM 5); coverage 0.5-0.6.
- **Good vs amateur.** Good: nodes on a strict grid or triangle, one fillet value (Mastra's M of dots). Amateur: freehand blobs, mixed fillets, "cloud with a face".
- **Refs.** `logosystem-vm`, `-bonia`; `svgl-mastra-icon-light`, `-deno`.

### F9 Folded ribbon / pseudo-3D
- **Recipe.** 2-4 flat facets that imply a fold or a solid, using either two tones of one hue or a gap at the fold line. One projection only (30deg isometric or 45deg shear).
- **Ratios.** Fold gap 0.03-0.06 H, or tone step >= 25% lightness between facets. Facets 2-4 (Framer 3, Prisma 2, Supabase 2 halves offset).
- **Good vs amateur.** Good: works flat in one colour because the gap carries the fold (Rise Ads, One Stack, Supabase). Amateur: drop shadows, bevels, fake glass that collapses to a blob in one colour.
- **Refs.** `logosystem-one-stack`, `-lexit`, `-rise-ads`, `-logo-darelstudio`; `svgl-framer`, `-supabase`; Prisma, Laravel in `sheets/saas-*`.

### F10 Monoline drawing
- **Recipe.** One continuous constant stroke with round caps and joins; one curvature family.
- **Ratios.** Stroke 0.06-0.10 H at display size (Airbnb 0.067, Linear lines 0.075, OpenAI 0.062). **Needs a heavier small-size variant if stroke < 0.09 H.**
- **Good vs amateur.** Good: one gesture (Aprile's ribbon, Airbnb's Bélo). Amateur: hairline construction drawings (Perplexity mark at 0.027 H is a brand-system piece, not a favicon), mixed stroke widths.
- **Refs.** `logosystem-aprile`, `-legg`, `-perplexity`, `-people-face`; `svgl-airbnb`, `-openai`, `-perplexity`.

### F11 Gradient-glass finish (modifier, not a family)
- **Recipe.** Build the mark in F1-F10 first. Apply the gradient or glass as a second rendering for hero or app-icon use only.
- **Rule.** The flat 1-colour version is the logo; the gradient one is a variant.
- **Refs.** `logosystem-atlas`, `-snaptix`, `-diamond`, `-soulsessions`; Gemini, Figma, Convex in `sheets/saas-*`.

### F12 Cliché bucket (avoid unless owned)
Equal-armed 4-12 point sparkle or asterisk, generic hexagon, swirl or whirlpool, brain, lightbulb, chat bubble with dots, rocket, globe with orbit, shield with check, infinity loop, two overlapping rounded squares, a Lucide/Phosphor glyph next to a wordmark. Refs showing the uniform: `logosystem-fuse`, `-star-1`, `-kode` (hexagon), `-atlas` (brain), `sheets/logosystem-ai-fold.png`.

## 3. Numbers & scales

| Measure | Value (n) | Source |
|---|---|---|
| Ink coverage of bbox, standalone marks | p10 0.27, p25 0.38, **median 0.48**, p75 0.56, p90 0.71 (63) | measurements.json `marks_svgl` |
| Bbox aspect | p25 0.98, median 1.00, p75 1.14, p90 1.61 (63) | same |
| Connected parts | median 1, p75 3, p90 4 (63) | same |
| Gap / stroke | p10 0.13, p25 0.27, median 0.71, p75 1.22, p90 2.28 (52) | same |
| Gap / H | p10 0.036, median 0.084, p90 0.18 (52) | same |
| Stroke / H, filled marks | p25 0.13, **median 0.17**, p75 0.22 (47) | same |
| Stroke / H, line marks | p25 0.056, **median 0.075**, p75 0.10 (15) | same |
| Mark height / cap (tallest letter) in lockups | p10 1.02, p25 1.19, **median 1.43**, p75 1.64, p90 1.79 (47) | `lockups_svgl` |
| Mark height / x-ish letter height | median 1.60 (47) | same |
| Gap / mark height | p10 0.19, p25 0.22, **median 0.28**, p75 0.33, p90 0.40 (47) | same |
| Gap / cap height | p25 0.30, **median 0.37**, p75 0.50 (47) | same |
| Mark stroke / wordmark stem | p25 0.89, **median 1.29**, p75 1.65 (40, solid fills excluded) | same |
| Wordmark stem / cap height | p25 0.154, **median 0.178**, p75 0.205 (47) | same |
| Mark centre offset vs word bbox centre | median -0.01 of word height (47) | same |
| Round overshoot | 1-3% of height; O 3%, apex 5% (Karow) | Wikipedia Overshoot |
| Horizontal vs vertical stroke | horizontals ~1-7% thinner for equal look | Hoefler/de Waard et al.; Scanner Licker |
| AI-logo hexagon frequency | ~4.6x baseline (crypto 5.4x) | Fast Company |
| Readable minimum at 16px (1-colour) | stroke >= 0.09 H (1.5px), gap >= 0.06 H (1px) | `scale-test-1x.png` ladder + shipped marks |

Engine nav size derived from the founder floor (wordmark >= 20px) and the pairing medians: Geist/Inter cap height is about 0.71-0.73 em, so a 20px wordmark has a ~14.5px cap; **mark 18-23px tall (1.25-1.6x cap), gap 5-7px (0.28x mark)**, mark centred on the cap band.

## 4. Amateur vs pro checklist

| Amateur (what the engine did) | Pro (what the references do) |
|---|---|
| Icon-set glyph (Lucide sparkle, layers, hexagon) next to the name | A constructed form from 1-4 primitives with one owned break |
| Two overlapping rounded squares, transparency blend | Two identical modules, one rotated 180deg, explicit over-under gap 0.25-0.6 stroke |
| Mark inside a filled rounded-square tile in the nav | Bare mark on the canvas; tile only for app icon / avatar contexts |
| 5+ parts, mixed stroke weights | Median 1 part, max 4; one stroke value (two at most, ratio >= 1.6) |
| Random corner radii (4, 6, 10 on one mark) | One radius rule: 0, or one value, or full round |
| Hairlines 1-3% H that vanish at 16px | Filled stroke 0.13-0.22 H; line stroke >= 0.06 H plus a small-size variant |
| Gradient or glow carries the idea | Idea survives flattened to one colour and inverted |
| Literal metaphor (brain, chat bubble, shield, rocket) | Abstract or letter-derived; meaning from the name |
| Golden-ratio circle overlay as justification | A short spec: unit, stroke, gap, radius, angle |
| Mark sized by eye: tiny next to big type, or huge | Mark 1.2-1.65x cap height, gap 0.22-0.33 mark |
| Mark stroke thinner than the wordmark stem | Mark stroke 0.9-1.65x wordmark stem |
| Mark aligned to the text bbox incl. descenders | Mark centred on the cap / x band |
| Default font for the wordmark at default tracking | Wordmark weight matched to the mark, tracking set by hand (usually -1% to -3% at 20-32px) |

## 5. Pairing spec (mark + wordmark lockup)

1. **Height.** Mark H = 1.25-1.6x the wordmark cap height (median measured 1.43). Lowercase-only wordmarks: 1.4-1.8x x-height. Below 1.15 the mark looks like a bullet; above 1.8 it dominates.
2. **Gap.** 0.22-0.33x mark H (median 0.28), equivalently 0.3-0.5x cap height. Never less than the wordmark's own letter gap x 2.
3. **Vertical alignment.** Centre the mark on the cap band (baseline to cap line), or on the x band for all-lowercase words; ignore descenders. Round marks overshoot this band by 1-3%.
4. **Weight.** Mark stroke 0.9-1.65x the wordmark stem; wordmark stem 0.15-0.21 of cap height (a medium to semibold grotesk). A line mark pairs with a regular weight; a heavy filled mark pairs with semibold to bold.
5. **Tracking.** Set the wordmark tracking by hand; tighten 1-3% at 20-32px; check the gap between the mark and the first letter separately from the letter gaps.
6. **Clear space.** At least 0.5x mark H on every side (engine default; brand guides commonly use the mark height or a letter height as the unit [engine note, verify against a brand guide before quoting]).
7. **Nav.** Founder floor: wordmark >= 20px, no container behind the mark. So mark 18-23px, gap 5-7px.

## 6. Test protocol (run on every mark before it ships)

1. **Size ladder.** Render at 16, 24, 32, 64, 256px on white and on the build's canvas. At 16px no stroke < 1.5px and no gap < 1px; every part still separate.
2. **One colour.** Fill every path with `currentColor`. Counters must be real holes (boolean subtract or `fill-rule: evenodd`), never white shapes on top: in `scale-test-1x.png` Notion and Raycast collapse to solid blobs under `brightness(0)` because their whites are fills.
3. **Inverse.** White on #0a0a0a and on the dark canvas. Thin the inverse by eye (irradiation); check it does not bloat at 16px.
4. **Favicon.** Export 16 and 32px PNG and SVG favicon; if the mark fails step 1, draw a small-size variant (heavier stroke, fewer parts), not a different mark.
5. **Doodle test.** Can the mark be described in one sentence and redrawn from memory in under 30 seconds with <= 6 primitives?
6. **Silhouette / blur test.** Blur 2px at 32px: the silhouette must still differ from a circle, a square and the engine's last 6 marks.
7. **Cliché test.** Compare against section F12. If the mark is a sparkle, hexagon, swirl, brain, bubble, shield, rocket, globe or overlapping squares, it needs a written reason in `DIRECTION.md` or it is redone.
8. **Ownability.** It must not resemble any file in `knowledge/benchmarks/logos/` closely enough that a viewer would name the reference.
9. **Lockup check.** Measure mark/cap, gap/mark, stroke ratio and offset against section 5.

## Rules (LG-01 to LG-28)

- **RULE** LG-01 A mark is one constructed idea: 1-4 parts (shipped median 1, p90 4), built from at most 3 primitive types.
  **Why** More parts dissolve at small size and read as assembled. **Applies to** all brand marks. **Check** count connected ink components in the 1-colour SVG render; fail if > 4 or > 3 primitive types in the source. **Source** measurements.json `marks_svgl` (63 marks).
- **RULE** LG-02 Never use an icon-set glyph (Lucide, Phosphor, Heroicons, emoji) as a brand mark, and never put the mark in a filled rounded tile in the nav.
  **Why** Icons are shared vocabulary, not identity; the founder rejected icon-in-a-box. **Applies to** brand marks, nav. **Check** the logo SVG path is not imported from an icon package; no filled ancestor with radius behind the mark. **Source** founder-taste (Tideline), Haviv distinctiveness.
- **RULE** LG-03 Pick exactly one family from `system/logo/families.json` and write it in DIRECTION.md with its parameters.
  **Why** Marks without a construction system read as random. **Applies to** all. **Check** DIRECTION.md has `logo: family=<id> params=...`. **Source** section 2 synthesis [engine note].
- **RULE** LG-04 Give the mark one owned break (a cut, a missing module, a shifted bar, an offset counter) and only one.
  **Why** Pure symmetry is generic; two breaks are noise. **Applies to** all. **Check** visual; the DIRECTION.md spec names the break. **Source** references 1228, Zeero, Linear, Coinbase, Opera [engine note].
- **RULE** LG-05 Avoid literal metaphors (brain, bubble, shield, rocket, lightbulb, globe, cloud) and the AI uniform (equal-armed sparkle or asterisk, hexagon, swirl) unless DIRECTION.md argues why this one is owned.
  **Why** A logo identifies rather than explains; hexagons are ~4.6x over-represented in AI marks; users do not read sparkles as AI. **Applies to** all, AI products especially. **Check** cliché list in F12. **Source** Rand 1991; Fast Company; NN/g.
- **RULE** LG-06 Use one stroke weight for filled marks at 0.13-0.22 H (median 0.17); if a second weight is used, the ratio is >= 1.6.
  **Why** Near-equal weights look like a mistake; the measured band is where shipped marks sit. **Applies to** filled marks. **Check** stroke/H in measure script within range. **Source** measurements.json (47 filled marks).
- **RULE** LG-07 Line marks use a constant stroke >= 0.06 H with round caps, and ship a heavier small-size variant when stroke < 0.09 H.
  **Why** 3-5% strokes vanish at 16px. **Applies to** monoline marks. **Check** render at 16px: no stroke < 1.5px. **Source** scale-test-1x.png (Perplexity 0.027, Laravel 0.032 fail).
- **RULE** LG-08 Commit to one gap regime: slit (gap 0.07-0.3 of stroke), band (0.4-1.2) or airy line (1.5-3); never mix two in one mark.
  **Why** Mixed gaps make the mark look assembled; shipped marks cluster in these three. **Applies to** all. **Check** gap/stroke per gap in the construction spec. **Source** measurements.json (52 marks).
- **RULE** LG-09 Minimum gap 0.06 H in single-colour marks (1px at 16px); colour-separated marks may go to 0.02 H only if they also ship a 1-colour version that passes.
  **Why** Sub-pixel gaps close at favicon size. **Applies to** all. **Check** 16px render shows every gap. **Source** scale-test-1x.png; Slack gap 0.018 H relies on colour.
- **RULE** LG-10 Keep the mark roughly square: bbox aspect 0.8-1.25 (wide marks up to 1.7 only for lettered or bar marks), ink coverage 0.35-0.65.
  **Why** Square marks fit favicons, avatars and nav slots; coverage outside the band reads as hairline or blob. **Applies to** symbols. **Check** bbox and coverage from the measure script. **Source** measurements.json (median aspect 1.0, coverage 0.48).
- **RULE** LG-11 One corner rule per mark: all sharp, one radius value, or full round; radius values are fractions of the stroke (0, 0.25, 0.5 or 1.0 stroke).
  **Why** Random rounding is the clearest amateur tell. **Applies to** all. **Check** list radii in the SVG source; fail if more than one non-zero value. **Source** references 1228, Wayfinder (sharp), Craft, Mastra (round) [engine note].
- **RULE** LG-12 Fix one angle set: 0/90, 45, 30/60, or 360/n for radial; no free angles.
  **Why** Shared angles are what make a construction feel inevitable. **Applies to** all. **Check** all edge angles in the SVG are multiples of the chosen step. **Source** Linear/PlanetScale 45deg cuts, Railway 0deg, Convex 120deg [engine note].
- **RULE** LG-13 Radial marks: 3-8 solid modules, or 12-32 thin rays; inner void 0.18-0.35 of outer radius; the module itself must be distinctive, not a plain petal.
  **Why** 9-11 solid petals clog; a plain-petal asterisk is the AI cliché. **Applies to** F1. **Check** module count; 16px render. **Source** F1 refs.
- **RULE** LG-14 Grid marks: one unit, 3x3 to 5x5, cell gap 0 or >= 0.15 unit, radius 0 or 0.5 unit, at most two cell shapes, edges on whole pixels at 16/32px.
  **Why** Grid marks live or die on exactness. **Applies to** F2. **Check** coordinates are integer multiples of the unit. **Source** F2 refs.
- **RULE** LG-15 Monograms reduce the letter to 1-3 strokes of one weight (0.16-0.34 H) and keep its counter >= 0.8 stroke wide.
  **Why** The counter is the identity and closes first at small size. **Applies to** F3. **Check** counter width in the spec; 16px render. **Source** Deno, Clerk, Anthropic, Webflow, Daimon.
- **RULE** LG-16 Interlocks use identical modules (the second rotated 180deg or mirrored) with an explicit over-under break of 0.25-0.6 stroke; never translucent overlap.
  **Why** Transparency overlaps are the "two overlapping squares" failure; the break is what reads as craft. **Applies to** F5. **Check** no opacity < 1 or blend mode in the mark. **Source** Convex, Bontrust, Upstash; founder Tandem round 2.
- **RULE** LG-17 Overshoot round forms 1-3% beyond flat ones, extend apexes up to 5%, and thin horizontals 1-5% versus verticals.
  **Why** Mathematically equal shapes look unequal. **Applies to** all. **Check** spec lists the corrections; visual. **Source** Overshoot (Karow 3%/5%); Hochuli via Studer; Hoefler/de Waard.
- **RULE** LG-18 Build the inverse version separately and thin it by eye for white-on-dark.
  **Why** Irradiation makes white on black look bolder. **Applies to** dark builds. **Check** a `-inverse.svg` exists or the spec states the thinning. **Source** LogoGeek optical corrections; dark-mode-premium.
- **RULE** LG-19 The logo is the flat 1-colour shape; gradient, glass and 3D are optional variants and the idea must survive without them.
  **Why** Gradients carrying the idea collapse in favicons, print and inverse. **Applies to** all. **Check** 1-colour render passes the test protocol. **Source** F11 refs; Gemini/Figma/Convex pass flat.
- **RULE** LG-20 Counters are true holes (boolean subtract or evenodd), never white shapes on top.
  **Why** White fills break one-colour, inverse and coloured backgrounds. **Applies to** all SVG marks. **Check** `brightness(0)` render keeps the counters (Notion and Raycast fail this). **Source** scale-test-1x.png.
- **RULE** LG-21 Lockup: mark height 1.25-1.6x the wordmark cap height (median 1.43), gap 0.22-0.33x mark height (median 0.28), mark centred on the cap band.
  **Why** Measured across 47 shipped lockups. **Applies to** nav, footer, all lockups. **Check** measure script `combo` values. **Source** measurements.json `lockups_svgl`; nav-pairing.json.
- **RULE** LG-22 Match weights: mark stroke 0.9-1.65x the wordmark stem; wordmark stem 0.15-0.21 of cap height.
  **Why** A heavy mark next to a light word (or the reverse) splits the lockup. **Applies to** lockups. **Check** `markStrokeToWordStroke`, `wordStrokeToTall`. **Source** measurements.json (median 1.29 and 0.178).
- **RULE** LG-23 Set the wordmark by hand: chosen weight, tracking tightened 1-3% at 20-32px, the mark-to-first-letter gap set separately.
  **Why** Default tracking at display size looks loose and generic. **Applies to** wordmarks. **Check** computed letter-spacing is not 0 on the wordmark. **Source** type-voices.md; lockup refs [engine note].
- **RULE** LG-24 In the nav the wordmark is >= 20px and the mark 18-23px tall with a 5-7px gap, no container.
  **Why** Founder floor plus pairing medians. **Applies to** marketing nav. **Check** computed sizes. **Source** founder-taste (Tideline); section 3.
- **RULE** LG-25 Run the full test protocol (section 6) and save `brand/mark-test.png` (16/24/32/64/256, 1-colour, inverse) before showing the founder.
  **Why** Passing at 256px proves nothing. **Applies to** all. **Check** file exists and every size passes. **Source** Haviv/Geismar simplicity and flexibility; scale-test-1x.png.
- **RULE** LG-26 No decorative construction grids or golden-ratio overlays as justification; the spec is unit, stroke, gap, radius, angle, break.
  **Why** Golden-ratio grids are post-rationalised theatre. **Applies to** presentations and DIRECTION.md. **Check** spec has those six values. **Source** Fast Company/Gizmodo (Apple logo); Dribbble construction genre.
- **RULE** LG-27 Prefer a wordmark alone when there is no good reason for a symbol (short distinctive name, single product, no app icon need).
  **Why** "There has to be a good reason for a symbol." **Applies to** brand decisions. **Check** DIRECTION.md states the reason for a symbol. **Source** Haviv interview.
- **RULE** LG-28 Diverge from the engine's last 6 marks: different family or different primitive and angle set.
  **Why** The founder's standing complaint is sameness. **Applies to** all. **Check** compare the family and params with the last 6 builds' DIRECTION.md. **Source** CLAUDE.md variety principle.

## 7. Dos and Don'ts (from the references)

- **Do**: Zeero (`sheets/rad-00.png`) and Wayfinder (`logosystem-wayfinder`): four identical L or stepped corners rotated 90deg around a void. One module, one angle set, crisp at 16px.
- **Do**: Daimon (`logosystem-daimon`): a square with a circular counter offset right = D. Two primitives, one subtraction.
- **Do**: Linear and PlanetScale (`svgl-linear`, `svgl-planetscale`): a disc cut by 45deg bands where cut width equals band width (gap/stroke ~1.0).
- **Do**: Bontrust (`logosystem-bontrust`): two identical hexagon-halves interlocked with a consistent break; the hexagon is owned because it is split.
- **Do**: Depot (`svgl-depot-light`): four equal bars, one progressive bend.
- **Don't**: People Face (`logosystem-people-face`): three stacked offset outlines are close to the engine's overlapping-squares failure; it only survives because of the face cut. Without an extra idea this construction is generic.
- **Don't**: Fuse, Star-1, Kode (`logosystem-fuse`, `-star-1`, `-kode`): equal-armed sparkle, ray-burst star, plain hexagon; competent but interchangeable across the AI category.
- **Don't**: Atlas (`logosystem-atlas`): brain built from coloured ribbons; literal metaphor, and the idea is in the colour.
- **Don't** (small size only): Perplexity, Laravel, OpenAI at 16px in `scale-test-1x.png`: hairline construction dissolves; shipped brands survive through use and app-icon variants, a new brand will not.

## 8. Exceptions & judgement calls

- Hexagons, sparkles and asterisks are not banned; they are the most contested ground. Claude's asterisk works because its rays are irregular and hand-tuned; Bontrust's hexagon works because it is split and interlocked. Use them only with a measurable twist and a written override (`override: LG-05 because ...`).
- Multi-colour marks (Slack, Figma, Google) can have sub-pixel gaps because colour separates parts; a new brand cannot rely on that, so ship the 1-colour version first.
- Very wide marks (Posthog 1.8, Mastra 1.6, Webflow 1.6) work when they are lettered or rhythmic; give them a square crop for the favicon.
- Wordmark-only (Cursor, Stripe, Resend, Anthropic wordmark) is often the more premium answer; LG-27.
- Founder rule (founder-taste, Tideline round 1): "Never hand-draw icons or logos in SVG paths; use a professional icon set or supplied/traced artwork." [engine note] A mark generated parametrically from `system/logo/families.json` (computed geometry, booleans, one spec) is not freehand path drawing, and icon-set glyphs are exactly what LG-02 forbids for brand marks. These two rules pull against each other; until the founder rules on it, (a) use supplied or traced artwork whenever the founder supplies a logo, (b) present constructed marks as options with their spec and test sheet, never as a silent default.

## 9. Figures worth keeping

- `scale-test-1x.png`: the clearest lesson; which shipped marks survive 16px, one colour and inverse, and the stroke ladder (3-16%).
- `sheets/sym-00..02.png`: pure symbols large enough to read construction.
- `sheets/rad-00.png`: the radial family side by side (1228, Collab, Hudello, Maddison & Walker, Stylish Rent, Syntage, Uniqode, Wayfinder, Zeero).
- `sheets/lock-00..02.png`: 67 shipped lockups for pairing by eye.
- `sheets/logosystem-ai-fold.png`: the AI uniform in one screen.
- `sheets/dribbble-logo-construction.png`: construction-grid presentation genre (theatre vs spec).

## 10. Open questions

- The founder's "never hand-draw logos in SVG paths" rule vs constructed marks (section 8): needs a founder verdict.
- Clear-space unit (0.5x mark H here) is an engine default; not measured from brand guides.
- David Airey's *Logo Design Love* "elements of iconic design" chapter was not read (book not in corpus); Haviv's "small size / one colour" wording comes from secondary summaries of his talk, not a primary text.
- Measurements are from anti-aliased renders with a colour-distance threshold; photo or gradient backgrounds (many logosystem shots) were excluded. Stroke/gap values are ±10%.
- Bierut's "empty vessel" phrasing could not be verified in a primary source; only the It's Nice That paraphrase is cited.

## Sources

- Rand, "Logos, Flags, and Escutcheons" (1991): https://paulrand.design/writing/articles/1991-logos-flags-and-escutcheons.html
- Sagi Haviv interview, Logo Design Love: https://www.logodesignlove.com/sagi-haviv-interview
- Haviv "3 rules" talk summary: https://production-blue.amara.org/videos/Jd0UC4Jk5HxE/info/the-3-rules-of-good-logo-design
- Bierut at Design Indaba, It's Nice That: https://www.itsnicethat.com/articles/michael-bierut-logos-indaba
- Overshoot (typography): https://en.wikipedia.org/wiki/Overshoot_(typography)
- Studer, "Is What I See What I Get? Math & Optics in Type Design": https://typographica.org/on-typography/is-what-i-see-what-i-get-math-and-optics-in-type-design
- Hoefler & Co. note on the *Vision* study: https://emails.typography.com/2019_01/index.html
- Scanner Licker, The Art of Eyeballing IV: https://scannerlicker.net/writings/2014/10/25/the-art-of-eyeballing-iv-the-stroke-optics/
- LogoGeek, optical corrections: https://logogeek.uk/?p=2617
- Fast Company, AI logo hexagon/swirl trend: https://www.fastcompany.com/90869029/ai-boom-logo-trend-swirling-hexagon
- NN/g, AI sparkles icon problem: https://nngroup.com/articles/ai-sparkles-icon-problem/
- Fast Company, debunking Apple golden ratio: https://www.fastcompany.com/1672682/debunking-the-myth-of-apple-s-golden-ratio
- Logo Modernism (Müller, Taschen) table of contents: https://library.bracu.ac.bd/vufind/Record/39131/TOC (chapters Geometric / Effect / Typographic; Effect includes Rotation, Overlay, Positive/negative, Three-dimensional, Split, Grid)
- Galleries: https://www.logosystem.co, https://svgl.app, https://dribbble.com/tags/logo-construction
