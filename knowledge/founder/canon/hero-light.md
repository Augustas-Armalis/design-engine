# Canon: light SaaS hero

Decided defaults, 2026-10-21. Every value below traces to a founder verdict (`founder-taste L<n>`, the line of the RULE bullet) or to an accepted build. The log in `founder-taste.md` is the evidence; this page is the answer. Gate numbers: `system/canon/hero-light.json`.

## Floor references
- **Default (split, product-first):** Quorum v6.6, `knowledge/engine-accepted/quorum/quorum-fold@2x.png` + `README.md` (ledger `2026-10-15-quorum`, "perfected... see how clean and professional this looks").
- **Alternate (centred over product):** Kestrel, `knowledge/engine-accepted/kestrel/kestrel-fold@2x.png` (ledger `2026-10-08-kestrel`, "fucking amazing... top tier"); numbers in `system/kits/product-hero/GUIDE.md`.

## Reading set (5 files, nothing else is mandatory)
1. this page
2. `knowledge/engine-accepted/quorum/README.md`
3. `system/kits/product-hero/GUIDE.md` (Kestrel numbers, timeline discipline)
4. `knowledge/founder/canon/product-ui.md` (the app inside the hero)
5. the last 5 ledger rounds (`ledger/entries/`, newest first)

## Decided numbers

| Part | Default | Source |
|---|---|---|
| Canvas | 1440x900 fold, page `#fff` (split) or `#f7f7f7` (centred); neutral, chroma < 0.01 | Quorum, Kestrel; L391 |
| Type family | Inter Variable **display cut** (`@fontsource-variable/inter/opsz.css`), `font-optical-sizing:auto`, `cv11` `ss01`; one family in the fold, hero and product alike | L452 |
| h1, split | 58 / 550 / -0.045em / lh 1.03, top ~207px | Quorum; L293 (top 200-210) |
| h1, centred | 68-72 / 550 / -0.045em / lh 1.04, top ~150px (80-90px under the nav) | Kestrel 72; L122, L142, L452 |
| h1 copy | Title Case, 2 lines max, no full stop, <= 5 words with an idea in them | L30, L98, L433 |
| Subtitle | 17/27 (split) or 18/28, colour `#5d6168`-class sub grey, 2 hand-set balanced phrase lines, last line >= 40% of the first, measure <= 620px | Quorum; L361, L400, L455 |
| Rhythm | h1 -> sub 20; sub -> CTA 32; CTA -> next element 96 (split composer) or 64-96 (frame top, centred) | Quorum 20/32/96; L186-189, L297; HC-01 |
| CTAs | 2: primary + secondary. Primary 44-48 tall, radius 12-14 (squircle), **tactile ink**: gradient body, 1px top light, crisp rim. Secondary raised white with a hairline ring, **text only**. Hover moves lightness only; press scale 0.98; no lift | Quorum 48/r12, Kestrel 44/r14; L154, L170, L280, L367 |
| Nav | plain text: wordmark left, 5 links 14/500 sub grey, 32px apart, 48px after the logo; right side text only ("Sign in" grey, "Start free →" ink with draw-in underline). Nav 72-88 tall, inset 64 | Quorum; L300 |
| Above the h1 | nothing (no chip, no eyebrow) | L142, L430 |
| Product | the real app's core screen at Kargul detail: <= 3 regions, >= 10 meaningful data points, >= 8 rows visible (Quorum 13), running to the bleed or dissolving (mask + 140px progressive blur 2/4/8px) | L276, L284, L297, L316, L352, L503 |
| Product placement | split: stage x572 y124 856 wide, r24, stage top ~40px above the h1 cap line, bleeds off the bottom; centred: frame >= 1000 wide, top <= 520px, cut by the fold | Quorum; L130, L284, L418 |
| Background | ONE quiet layer: split = smooth gradient stage behind the product only (Paper GrainGradient at noise 0, blurred 26px); centred = 16px dot grid inside the rails, faded behind the headline | Quorum; L150, L297, L313 |
| Floaters | at most one, and only if it says what the product is doing now; default zero (Quorum final cut the status bar) | L291, L294, Quorum README |
| Copy-side substance | split: one real product element under the CTAs (the Ask composer, 470 wide, 17/550 question), never bullets or icon rows | L281, L288, L294 |
| Colour | ink `#111214`, one accent (Quorum indigo `#5056f0`) for selection and strong data; tag colours only on tags | Quorum README |
| Edges and depth | 1px ink-alpha rings (6-10%), one edge per box, <= 3 shadow recipes on the page, accessories at ~20% intensity (edge alpha .2, shadows .14-.18) | L199, L376, L467; Quorum README |
| Corners | squircle on every rounded non-capsule box; ladder in the JSON | L373, L166 |
| Element budget | nav, copy (h1 + sub + CTAs), one composer or proof element, one product stage. 5 units, 7 max | Quorum README; HC-05 |
| Motion | none. Deliver screenshots. If motion is asked, `canon/motion.md` | L358, L512 |
| Delivery | 2x still, a localhost URL, a change list mapped to the founder's words; on a fresh hero brief also the switchable `?layout=` / `?font=` build | L406; playbook |

## Contradictions resolved (audit 4.1)

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Headline tuple | 58/550/-0.045 split, 68-72/550/-0.045 centred, Inter display | 52/500 only when the brief says "minimal" and the founder confirms; never 84px | L262 (84/500), L268 (52/500), L270, L430 (~52, <= 56), L443 (60/450), L446 (56/500 two-tone); CLAUDE.md "56/500" |
| Chip above h1 | off | the brief names an announcement: then a custom pill from `system/variety/buttons-2/`, never the stock "[New] text →" capsule, and drop it first when the fold is tight | L364 ("not off by default") |
| Hero button | tactile ink r12-14 + raised white text-only, 44-48 | full pill only when the product's own buttons are pills (dark Kite) | L58 (Kaching 18px label: Kaching brand only), L262 (flat ink r12), L270 (r10 grey) |
| Nav | plain text links, text-only nav CTAs | Kaching pill nav (L94) only on Kaching work or when DIRECTION declares the pill as an owned decision | L38 (divided pill), L94 as default, L146 (44 track: Kestrel only) |
| Default layout | Quorum split | Kestrel centred when the previous light build was a split (range rule, L182/L253); Altrina panel never by default | L130 (centred as THE default), L262 (Altrina), L268 (Lightfield numbers; the layout survives as Quorum) |
| Product density | one view at Kargul detail (<= 3 regions, >= 10 data points, >= 8 rows) | none | L18 / L54 (simple card: Tideline-era hero card only) |
| Background | one quiet layer (stage or rail dot grid) | a bespoke generative field only when DIRECTION names it as the signature AND it sits behind the product only | L62 (signature field >= 30% of fold), L430 hatch/grid variants as defaults |
| Motion | none | `motion: asked` in DIRECTION | L174 (every hero animated word by word) |
| Diversity vs floor | the floor above is fixed; divergence = layout alternation + at most 3 owned decisions (button effect, product world, stage material) | — | L182/L253 read as "change type voice and everything" |

## Never (rejected, with evidence)
- Abstract art as the main visual: ribbons, sound landscapes, line sheets (Quorum v4/v4.1, L265, L268 "what even is this hero").
- Tilted product frames at rest (Perch, L394); stacked floaters or popovers over the product (L291).
- Bullet or icon-row lists under the CTAs; "how it works" steps in the hero (Ferry hero, L288, L313).
- Contour, globe or busy patterns behind the copy (Ferry, Kite landing, L313, L418).
- Heavy 600-700 h1 with crushed tracking; poster didone serif (Tracewell, Quillwork, L322, L355).
- Plain `@fontsource-variable/inter` at display size; two grotesks in one fold (L452).
- Hard white corners where the product stops (Quorum v6, L284).
- A full page when a hero was asked (Quorum v1, Kite landing, L253, L424).
- Nav dots or markers beside links (Quorum v4, L265).

## Pre-delivery checklist (measure, do not eyeball)
1. Scope matches the words: one 1440x900 fold, no video, no animation unless asked.
2. `node tools/design_view.mjs <url> --kind hero-light --name <name>`: 0 FAIL; read the PNG next to Quorum and Kestrel.
3. h1 computed size/weight/tracking in range, opsz file loaded, one family, Title Case, no full stop, <= 2 lines.
4. Subtitle 2 lines, last line >= 40%, width <= 620.
5. Gaps measured with getBoundingClientRect: 20 / 32 / 64-96.
6. Nothing between nav and h1; nav CTAs differ from hero CTAs.
7. Box-shadow census <= 3 strings; no element with ring + inset top highlight; no border + ring.
8. Radii per height band match the ladder; squircle share >= 90%.
9. Product frame transform is identity; product >= 20% of the fold; no fade-to-white before the bleed.
10. Round 2+: computed-style diff against the last liked version, only named properties changed (playbook rule 2, L409).

## Open (no founder evidence yet; not in the JSON)
- Light-hero colourful-pixel budget: the Quorum stage is a lavender gradient and was never measured; no cap is set.
- Font-size count in a hero fold: not measured on Quorum or Kestrel.
- Whether the rail dot grid is the default for every centred light hero (playbook open question 7).

## Founder verdict 2026-10-22 (cadence-hero r1, reject): supersedes "nothing above the h1" and "one quiet layer"
Founder: "this feels empty... no stuff below the buttons, none above the title and nothing in the background happening... inconsistent roundness... nav bar out of place and size... generic... not polished... you don't double check... mostly playing with fonts, layouts, bg colours, roundness, but always professional, sleek and consistent".

Decided now (these replace the matching rows above):
- **Above the h1:** one element is REQUIRED: an announcement pill, an eyebrow or a small product-proof pill. It is always custom (from `system/variety/buttons-2/`), never the stock capsule. Supersedes L142 and L430.
- **Below the CTAs:** one product element is REQUIRED: the Ask composer, a live mini-result, or factual metadata (free tier, setup time). Never fake logos or customer counts.
- **Background:** a living signature layer, still allowed: a gradient stage behind the product, a tinted canvas with a light field, or product-element texture. A plain dot grid alone fails.
- **Roundness:** ONE ladder for the whole fold, derived from the product's scale. If the product is zoomed by z, hero chrome radii = product radii x z: frame = window radius x z, CTAs and composer = card radius x z, inner = outer - inset. Measure every box (gate `radius.*` + `nested`).
- **Nav:** sits on the same content edges as the h1 block and the product frame (one grid). Size is proportionate: logo mark 22-24, links 15, nav CTAs 36 tall. Check that the nav's left/right x equals the frame's left/right x within 1px.
- **Delivery:** give 2-3 variants that differ in font, layout, background colour and roundness, all on the same consistency rules, so the founder can pick.

## Founder verdict 2026-10-22 (cadence-hero r2, reject all three variants)
- **Repetition:** "identically looking" to past builds, so a new hero must not reuse a past fold's composition.
- **Spacing:** the gaps pill → h1 and CTAs → proof were wrong. The founder's own hero spacing must be measured from lunor.design and Marcel's heroes and set from that measurement, never invented.
- **Missing visual:** "no extra visual or proper layout or proper font with bg ideas". A product screenshot plus a gradient is not a visual idea. Every hero needs a signature visual concept of its own.
- **The editorial variant:** "ugly" even with a good layout. Type and colour taste fails are fails, whatever the structure.
- **Process:** study lunor.design (the founder's and Rico's work) and Marcel's hundreds of heroes before the next hero, and build from them.

## Applied 2026-10-22 from the founder's own library (lunor.design, 98 founder heroes measured, LN-01..36)
These replace the numbers above wherever they conflict. Source: `knowledge/web/lunor-founder-style.md`.
- **h1:** 50-60 (54 default), weight 450-500, tracking -0.02 to -0.04em, line height 1.1-1.2, 2 lines, up to 8 words. Sentence case is allowed.
- **Gaps grow in order:** pill → h1 (~12-16 CSS) ≈ h1 → sub (12-16) < sub → CTAs (40-48) < CTAs → fourth element (80-100).
- **Sub:** 17-18px, 2 lines, ≤ 440 wide.
- **CTAs:** 38-44 tall, radius 9-11 or a pill, 9 apart. Light primary is tactile ink; the secondary is white, text only.
- **Nav:** links 15-16, plus a 36-tall "Log in" + "Sign up" pair.
- **Composition:** every fold has a fourth element (product, scene, logos or stats) 80-100 below the CTAs. One named background idea per hero.
- **Fonts:** rotate per brief (Inter, Manrope, Aspekta, Inter Tight, Geist, Jakarta, Switzer); size and spacing stay fixed.
- **Open (founder to decide):** the pill above the h1 appears in only 32 of 98 founder heroes, while the r1 verdict asked for something above the title. Use it when the brief has news, otherwise put the weight on the fourth element.

## Applied 2026-10-22 from Marcel's heroes (KH-01..33, `knowledge/web/kargul-heroes.md`; numbers re-measured on 75 unique heroes, KC-01..07, `knowledge/web/kargul-corpus-2026-10.md`)
- **The cause of "empty" was the missing signature visual,** not the space above the h1 (KH-01). Every hero turns the product's name or headline verb into a picture. A screenshot on a gradient does not count. Pick the mechanism from the category recipe table (KC-07, corpus §5).
- **Above the h1:** OPTIONAL. Marcel uses it in 15/55 (KH) and 4/13 (new folds); the founder uses it in 32/98. When it is used, it sits 16-31 above the h1 ink (26 median), not 34.5 (KC-04). This supersedes the r1 "required" line.
- **Copy rhythm (Marcel's measured medians, KC-03):** h1 → sub ~20, sub → CTA ~38, CTA → next element ~89. The h1 → sub value agrees with the Quorum 20 in the table above. Where sub → CTA differs (Quorum 32, lunor 40-48), the founder-accepted rows above win.
- **CTA:** 40-52 tall (47 median), pill, square or r6-15 in equal thirds (KC-05). The canon's tactile ink 44-48 sits inside this range.
- **Nav:** a 54-73 bar, or a floating centred pill nav 37-40 tall, optionally under a 36-38 announcement bar (KC-06). The nav CTA is always smaller than the hero CTA.
- **Below the CTAs:** proof or a product action only (KH-10).
- **Layout:** pick the family first and never repeat the last build's family or visual world (KH-02). For a light hero, default to a centred family (F1, F2, F7): Marcel's light heroes are centred in 30/41 (KC-01). Recipes: `kargul-heroes.md` §6.
- **Light and colour:** in dark heroes the light comes from the visual itself; in light heroes colour rises from the bottom or sides, and copy sits on near-white (KH-12/13). One accent, in ≤ 3 places.

## Founder verdict 2026-10-22 (h4a r1, partial: "finally sth new and getting somewhere")
- **The fold ends on purpose.** The product either dissolves into the field (a mask fade over its last ~190px) or is cut on a deliberate line. Never an accidental hard crop ("no fade bottom or if not then proper cut off").
- **Whole or absent:** no element may be half-faded by a mask, clipped by the page edge, or partly hidden ("random stuff visible"). Decorative chips sit outside every mask, in inner columns, at least 16px from the page edge. A designer's-eye pass before delivery hunts for exactly this.
- **Replicate to learn, then move away.** Take one structure and the numbers from a reference. The field, signature visual, brand, mark, name and copy are ours. Never a 1:1 layout with a re-skin ("DONT MAKE IT ONE TO ONE COPY CUZ IT THEN GETS CAUGHT").
- **Product in a hero:** one ink primary per view. The product's AI-suggested actions use a soft accent material, and the colour budget stays calm (founder: "buttons and colorways... sth is off" when four black buttons and several hues met in one view).

## Founder verdict 2026-10-22 (h4a r2, partial)
- **Fold exit = progressive blur, no colour:** four backdrop-blur bands (2/4/8/14px), each masked to start lower, then a fade to the page colour. Never a saturated glow under the product ("so stupid and vibrant... either blur fade out or none").
- **Background visual stays quiet:** a fine 20px dot lattice at the sides only, masked clear of the copy and the nav, with at most four lit points carrying meaning. No grids of chips around the copy ("shouldn't be so distracting... I liked the points or bubbles").
- **Nav:** a 72px band on the product frame's edges. Wordmark left, links centred 15/450, and a 36px "Log in" ghost + "Sign up" white pair on the right. No full-width rule.
- **h1:** 56/500/-0.032em, lh 62.

## Founder verdict 2026-10-22 (h4a r5-r6: "okay now it's wayy better... but now good")
- **Above the h1: an announcement pill, never a gimmick.** The avatar-stack pill read "too AI and stupid", but the fold read "empty" without any element (r6). So use a plain announcement: 32px pill, a soft accent "New" tag inset 4px, one product-fact line, an arrow. No avatars, no metrics. The gap to the h1 equals h1 to subtitle (16).
- **Optical centring:** button labels are lifted 1px (Inter's ink sits low in a centred line box). The founder caught the geometric version: "top padding looks bigger than the bottom".
- **Rounder controls:** 36px nav buttons r13, 46px CTAs r16 (bands widened in `system/canon/hero-light.json`).
- **Avatar stacks** overlap by 17% of their size, so no initial is half-covered.
- `tools/clipscan.cjs <url> <w> <h>` runs before delivery. It catches text cut by its box, SVG shapes outside their viewBox (the sparkline end dot), and children leaving a clipped parent.
