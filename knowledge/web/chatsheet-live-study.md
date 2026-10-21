---
source: web:https://kargul.studio/work/chatsheet (case page, 5 Chatsheet originals 2880x2070 on cdn.sanity.io, build recording 23dcce9e...webm 1252x900 18 s) + web:https://x.com/marcelkargul/status/2112674079891227129 (same recording as MP4) + web:https://chatsheet.com (301 to getspectra.com, checked 2026-10-21)
chapter: Chatsheet landing (Kargul Studio) measured from the highest-resolution evidence that exists, and what our pixel replica got wrong
pages: n/a (measured 2026-10-21)
topic_tags: [hero, landing, isometric, illustration, scene, serif-headline, pill-buttons, hairlines, rails, light-mode, kargul, replication, benchmark]
status: studied
evidence: knowledge/benchmarks/chatsheet-live/ (CREDITS.md lists every file)
companions: work/replicas/KARGUL-HERO-NOTES.md, work/replicas/app/src/KargulHero.tsx, knowledge/web/isometric-line-art.md, knowledge/web/kargul-micro-details.md
---

# Chatsheet landing: the measured study

> **Credits.** This is study evidence only. The design belongs to Chatsheet and Kargul Studio (kargul.studio). The images in `knowledge/benchmarks/chatsheet-live/` are captures kept for measurement. Do not ship any of it, or any close copy of it, in client work.

## 0. The live site does not exist (read this first)

The brief asked for the live site and its source. **No public deployment of this design exists**, checked on 2026-10-21:

- `chatsheet.com` returns `301 -> https://getspectra.com/`, for a browser user agent and for curl alike. Spectra is a different product: a Next.js site titled "Spectra: Turn your Slack into the ultimate productivity tool", with a different design. `chatsheet-web.vercel.app` serves the same Spectra build, so the company appears to have pivoted and renamed. Spectra is not Kargul's design and is not studied here.
- `run.chatsheet.com` is the app (303 to a login page). Not touched.
- The Wayback Machine has `chatsheet.com/` up to 16 May 2026 as a client-rendered SPA titled "Chatsheet | The AI Spreadsheet". It does not show this design.
- `chatsheet.ai`, `.io`, `.co`, `.net`, `.org`, `.app`, `.so` and similar domains have no DNS record. `chatsheet.netlify.app` is an unrelated hobby SPA. No `*.framer.website` or `*.webflow.io` copy exists. Kargul's case page links no product URL, only `cdn.sanity.io` assets.

**So this study cannot report:** the framework, font files, `font-feature-settings`, CSS rules, hover, active or focus states, asset URLs, or how the scene is implemented in code. Wherever this note names one of those, it is an inference from pixels, marked [I].

**What it uses instead (the best evidence there is):**
1. **The Figma-grade originals**: 5 Chatsheet images at 2880x2070 on Kargul's case page. This is an exact 2x of a 1440x1035 CSS frame, because 1px hairlines render as exactly 2 identical pixels. They are rendered and saved natively as `hero-fold-1440@2x.png` and `section-*-1440@2x.png`. These are 2.3x sharper than our replica's reference (`ref-chatsheet-hero.png`, a 1252x900 video frame). The other 5 originals on that page belong to other projects (SideShift, Hyperliquid, a trading app, a dashboard, Plunio) and are ignored.
2. **The build recording**: an 18 s, 1252x900 scroll-through of the built page, shown on the case page (WebM) and in the X post (MP4). Frames are sampled at 1 s over the whole video and at 100 ms over 0-2.5 s and 16.5-18 s. They are saved as `build-*-1252.png` plus two contact sheets.
3. **No mobile composition exists in any source**, so the 390px fold was not captured. (A Kargul case-page mobile capture would have been the wrong page.)

Tags: [P] pixel-measured on the 2x original (values are CSS px at 1440). [V] read from the build video. [I] inference.

## 1. Core ideas

1. **Our reference was 0.88x scale.** The video frame is the page at about 0.88 (h1 line 525 px in the video against 595 CSS px in the 2x original; the nav container measures 914 against 1038.5). Every replica number registered at 1252 is 12-14% under the real token. The real tuples are below. [P][V]
2. **One neutral page colour.** The page, the nav and the hero share one colour, `#f5f6f7`, which is neutral and not lilac. The lilac `#f6f5f8` we read was an H.264 chroma shift. Layers are separated only by 1px alpha hairlines (`#dee0e3` on `#f5f6f7`, about 9% navy ink), and crossings read darker (`#c9ccd1`). That is the alpha signature. [P]
3. **A sheet frame.** 1px rails sit at x 39.5 and x 1400 in the original, a 1360 frame. A 1px rule runs under the 70px nav. A second rule at y 930 runs only in the gutters outside the rails, like corner ticks. In the build, the hero box clips the scene at a full-width rule (video y 805, about 915 CSS). [P][V]
4. **Content sits on a 1040 column.** The logo's left edge (x 201), the nav pill's right edge (1239.5) and the bento's outer edges (201 / 1238.5) all sit on one 1040px column centred at 720. [P]
5. **A serif voice on a sans body.** A moderate-contrast text serif sets the h1, the section h2s, card titles and the wordmark, at weight 400 in navy ink `#0c1833`. The x-height to cap ratio measures 0.71, closest to Lora among the free faces tested; it is not Source Serif 4 (0.68, higher contrast at display opsz). A neo-grotesk sets everything else (Inter-like [I]) in one grey, `#525b6e`, used for both the sub and the nav links. [P][I]
6. **Every control is a pill.** The primary CTA, the secondary CTA and the nav "Book a Free Call" are all fully round. No control in the page has radius 12. [P]
7. **The primary button is flat brand blue with an inset bevel.** The fill is `#3d79fe` with no gradient. The top inner edge is darker (`#3468d9` falling to `#3972ee` over about 3 device px) and the bottom inner edge is lighter (`#7aa3fe` to `#a0bdfe`). It reads as a soft pressed lozenge, the opposite of the usual light-on-top highlight. [P]
8. **The scene is outline-drawn in the brand blue.** Every tile, card, coin and plate has a 1px `#3d79fe` contour, on the top face and again on the bottom edge of the side. Faces are white or `#dee8ff`/`#d5e2ff` blue tints. Shadows are barely present: a faint blue lift, never a grey blur. The look is iso line-art with flat tint fills (the same family as `isometric-line-art.md`), not soft 3D renders. [P]
9. **(Superseded by the corrected CSL-11: one projection, true iso throughout.)** Original reading, kept for the record: The coin and the workflow cards are true isometric: the coin's top ellipse is 243.5 x 140.5, so ry/rx = 0.577 = tan 30°, and the card edges run at 29-30° both ways. The floor tiles are flatter: a diamond ratio of 0.46-0.47 (YouTube 164x77, Gmail 198x92 at 2x), about 25° dimetric, with a 5-6.5px side. The hero object and its output face the viewer more than the inputs do. [P]
10. **The cards are spreadsheets.** Each workflow card is a white sheet with 0.5px (1 device px) `#dde7ff` grid lines at about 25px row pitch, source-app icons laid flat in the first column, and one thick 3D pill label (`#3d79fe`, with a `#e1eaff` under-plate) on its front edge, set in the plane. The product ("the AI spreadsheet") is drawn into the scene, not decorated around it. [P]
11. **Logos lie in the tile plane.** The AWS, YouTube, Gmail, Excel and LinkedIn marks are projected onto the tile faces (skewed, reading up-right), not squared to the screen. [P]
12. **The scene at rest is static; the page is scroll-recorded.** In the build video, frames 17.0-18.0 s at rest differ by 0.05-0.3 mean levels, which is codec noise, except for sub-pixel changes around the Slack and PDF plates and the coin face (a very slow float or a twinkle [I]). The recording opens on a settled page, so no load-in is visible. Copy, coin and cards scroll together; the left tile cluster moves at most about 4% faster, which is not a designed parallax. The inertial scroll (each flick settles in about 1 s, remaining distance falling about 25% per 100 ms) may come from the recorder rather than the site. [V]

## 2. Rules

- **RULE CSL-01** Measure tokens on the sharpest source and at true CSS scale. When the only sharp source is a video, solve for its scale factor first: divide a known width (the nav container or an h1 line) by its value at 1440. Never register a replica at video pixels and treat the numbers as tokens.
  **Why** The Chatsheet replica registered to 1-3px at 0.88 scale, and every type, control and spacing token came out 12% small. **Applies to** replication. **Check** state `scale = video_px / css_px` in the notes; tokens are reported as CSS px at 1440. **Source** [P] h1 595 vs 525, container 1038.5 vs 914.
- **RULE CSL-02** Never sample brand colours from H.264 video. Sample from a PNG original or the live DOM. If only video exists, label the colours "video, chroma-shifted".
  **Why** 4:2:0 chroma turned neutral `#f5f6f7` into lilac `#f6f5f8`, and the hairlines into `#efeef1`. **Applies to** all. **Check** each token cites a PNG or DOM source. **Source** [P] vs `ref-chatsheet-hero.png`.
- **RULE CSL-03** A framed light page uses one ground colour for page, nav and hero. Separate them only with 1px ink-alpha hairlines (about 9% navy on a near-white ground), and let crossings darken naturally.
  **Why** A separate nav band and opaque rules read as a template. Alpha hairlines read as one drawn sheet. **Applies to** landing. **Check** nav `background` equals page `background`; rules are `rgb(ink / .08-.10)`; no 2px rules. **Source** [P] `#dee0e3` on `#f5f6f7`, crossing `#c9ccd1`.
- **RULE CSL-04** Rails sit 40px inside the viewport at 1440, 1px wide, from the nav rule down through the hero. Close the hero with a rule that runs only in the gutters (ticks), or with a full rule that clips the scene, but not both.
  **Why** It frames the hero as a sheet without boxing the art. **Applies to** hero. **Check** rail `left` 39.5-40; the scene overflows nothing outside the rails. **Source** [P] rails at 39.5/1400, rule at 930 in the gutters; [V] build clips at about 915.
- **RULE CSL-05** Put nav, bento and footer content on one 1040 column centred on the frame. The hero copy centres on the same axis.
  **Why** One column makes the logo, the pill and the bento edges line up down the page. **Applies to** landing. **Check** logo left = bento left = (vw - 1040)/2 ±1. **Source** [P] 201 / 1239.5 / 201 / 1238.5.
- **RULE CSL-06** For a serif-voiced SaaS hero, set the h1 at about 76/68 (lh 0.9, weight 400) in navy ink, not black. Set the sub at 17/28 in one cool grey that the nav links share.
  **Why** That is the measured tuple. One grey token for the sub and the nav keeps the frame quiet. **Applies to** hero. **Check** h1 cap height ≈ 51.5px (T top 155.5, baseline 207) and line pitch 68; `p` and `nav a` share one colour. **Source** [P] `#0c1833`, `#525b6e`.
- **RULE CSL-07** Choose a text serif with a large x-height (x/cap ≈ 0.71) and moderate contrast for a two-line display h1. Do not use a display-optical-size cut, which goes high-contrast and narrow.
  **Why** The reference holds weight at 76px. Source Serif 4 at opsz 60 is thinner and narrower, and we compensated by enlarging it. **Applies to** hero type. **Check** render the candidate at a matched line width over a crop of the original and compare stems, x-height and the M splay. **Source** [P] x/cap 0.71; Lora 0.74, Source Serif 4 0.68 (tested 2026-10-21).
- **RULE CSL-08** Make every control on such a page a pill: the nav CTA about 148x37.5, the hero CTAs 45-46 tall, a 12px gap, the primary about 220 wide and the secondary about 146.
  **Why** Pills are the page's button grammar. Radius 12 on a 46px control is a different product. **Applies to** buttons. **Check** `border-radius >= height/2` on every `a`/`button` with a fill or ring. **Source** [P] CTA 534-753.5 x 415-460, 766-911.5 x 414-460.5; nav pill 1092-1239.5 x 13-50.5.
- **RULE CSL-09** Draw the primary as a flat brand fill with an inset bevel: a dark inner top edge (about 1.5px, brand blue darkened about 15%), a light inner bottom edge (brand blue lightened about 30%), and no gradient fill. Draw the secondary as white, with a 1px ring `#e4e5e8`, slightly darker on top (`#d0d1d3`), and navy text.
  **Why** That is the measured edge profile. The usual white-top-highlight on a gradient reads as stock. **Applies to** buttons. **Check** sample the vertical edge profile on a 2x capture: top band darker than the fill, bottom band lighter. **Source** [P] `#3468d9 -> #3d79fe -> #a0bdfe`.
- **RULE CSL-10** In a brand-blue iso scene, outline every solid with a 1px brand-blue contour, on the top face and again on the bottom edge of its side. Fill faces white or with one or two tints of the same blue. Keep shadows to a faint same-hue lift.
  **Why** The contour carries the drawing. Grey blurred shadows turn line-art into a muddy render. **Applies to** illustration. **Check** sample one tile edge: `#3d79fe` 1px, top `#fff`, side `#dae6ff`, bottom contour `#3d79fe`. **Source** [P] YouTube tile at x 735, y 1372-1460 (2x).
- **RULE CSL-11 (corrected 2026-10-21)** Project everything lying on the floor (tiles, cards, coin base) in one true isometric (0.575-0.577, edges 29.7-30.1°). The earlier "tiles at 0.46" reading came from measuring a tile's bounding box, which includes its side band; the replica on the design original measured the top-face edges at 30°. Lay every logo or label into its plane; never square it to the screen.
  **Why** It is the measured construction. In-plane marks are what make tiles read as objects lying on a floor. **Applies to** iso scenes. **Check** coin ellipse ry/rx, tile diamond h/w, logo baseline angle equal to the plane edge angle. **Source** [P] coin 280/487, tiles 77/164 and 92/198.
- **RULE CSL-12** Draw the product's own artefact into the scene: here the workflow cards are mini spreadsheets (0.5px `#dde7ff` grid at about 25px pitch, app icons in column 1, one thick in-plane pill label on the front edge).
  **Why** The scene proves the product (an AI spreadsheet) rather than decorating. This is the "product-specific detail" owned decision. **Applies to** hero art. **Check** each card shows a grid and a label that names a real workflow step. **Source** [P] card column x 2016 (2x): grid at 893, 943, 956, 993.
- **RULE CSL-13** Make the hero object a branded coin: the brand mark (concentric rings broken into a labyrinth by two aligned gaps) as raised light rings `#b2cafe`-`#c3d6ff` over blue grooves `#3d79fe`, with darker inner groove edges `#3972ef`, a white bevel rim with a 1px blue contour, a navy `#0c1833` base with a stepped cut-out, and a few white sparkle dots.
  **Why** One dark mass (the navy base) anchors a white-and-blue page. The cut-out and grooves give it machined depth without a render. **Applies to** hero object. **Check** exactly one navy mass in the fold; the coin face uses only brand blue and its tints. **Source** [P] crop-coin@2x.png.
- **RULE CSL-14** Light the hero with two flat floor ellipses (`#f7f8f9` outer, `#fbfbfc` inner), a lavender contact disc under the object (`#eaeffc`), and one soft blue glow (`#e3eaf9`) between the CTAs and the object. Never put a colour blob behind the headline.
  **Why** Light comes from the object and the floor. The type stays on a clean ground. **Applies to** light heroes. **Check** pixels behind the h1 bbox equal the page ground. **Source** [P] probes at (1700,1300), (1440,1560), (1440,1050) at 2x.
- **RULE CSL-15** Down the page, keep the serif for every heading (h2 about 48/41, card titles about 22-24) and the grey sans for every body (about 15-16/21.5). Use hairline bento cells: white `#fff`, 1px `#e7e8eb` shared borders, square corners, inside the 1040 column on the grey ground.
  **Why** The page is one sheet of ruled cells, not floating cards. **Applies to** sections. **Check** bento cells `border-radius: 0`, borders shared (collapsed), cell fill `#fff` on a `#f5f6f7` ground. **Source** [P] section-examples: cell edge at x 402-403 / y 426-427 (2x).
- **RULE CSL-16** Give each section's art the same iso line-art kit (blue contours, white/tint faces, dashed `#3d79fe` connectors, at most one navy accent) and vary only the composition. Use solid flat brand-blue planes (`#3d79fe`) for emphasis in at most one band (here "Enterprise-Grade").
  **Why** One illustration grammar carried through 5 sections is what makes the landing look commissioned. **Applies to** landing. **Check** every illustration's contour colour equals the brand token. **Source** [P] section-enterprise, section-examples, build-steps frames.
- **RULE CSL-17** Draw connectors dashed in the brand blue (about 0.5-1px, short dashes), not grey.
  **Why** In a monochrome-blue scene, grey dashes read as dirt. **Applies to** iso scenes. **Check** connector stroke hue equals the brand hue. **Source** [P] crop-tiles@2x.png.

## 3. Numbers & scales

All values are CSS px at 1440 from `hero-fold-1440@2x.png` unless marked.

| Token | Value | Evidence |
|---|---|---|
| Page / nav / hero ground | `#f5f6f7` (one colour) | [P] rows 64, 1000 |
| Hairline (rails, nav rule, section rules) | 1px `#dee0e3` (≈ ink 9%); crossings `#c9ccd1` | [P] col 40, row 140/1860 |
| Rails | x 39.5 and 1400 (1360 frame); build ≈ 29.5 at its 1423 viewport | [P] / [V] |
| Nav | 70 tall, no band; rule at y 70 | [P] |
| Content column | 1040 (200-1240), centred 720 | [P] |
| Ink (h1, wordmark, secondary text) | `#0c1833` | [P] |
| Body / sub / nav link grey | `#525b6e` | [P] |
| Brand blue (CTA, logo, contours, pills) | `#3d79fe` | [P] |
| Logo | 25px concentric rings: ring, gap, ring, gap, dot, all `#3d79fe` (closed rings) + serif wordmark | [P] x 201-358.5, y 19.5-44.5 |
| h1 | serif 400, ≈76/68, ink; line 1 width 595, cap 51.5 (T top 155.5, baseline 207), line 2 baseline 275 | [P] |
| Sub | sans ≈17/28, `#525b6e`; line 1 width 445 (x 500-944.5), line 1 baseline ≈ 328 | [P] |
| h1 → sub | baseline 275 → sub ascender top 313 (≈38) | [P] |
| Sub → CTA | sub line-2 bottom 356.5 → CTA top 415 (≈58) | [P] |
| Primary CTA | pill 220 x 45, `#3d79fe`, inner top `#3468d9`, inner bottom `#a0bdfe`, white label ≈17px | [P] |
| Secondary CTA | pill 146 x 46.5, `#fff`, ring `#e4e5e8` (top `#d0d1d3`), label `#0c1833` | [P] |
| CTA gap | 12 | [P] |
| Nav CTA | pill 148 x 37.5, white, ring `#e4e5e8`, label `#0c1833` ≈16px | [P] |
| Nav links | ≈16-17px, `#525b6e`, x 501-940 (4 links) | [P] |
| Coin | top ellipse 243.5 x 140.5 (ry/rx 0.577), centre x 722; rim contour 1px `#3d79fe`; rings `#3d79fe` / `#b2cafe`-`#c3d6ff`, groove edge `#3972ef`; navy base `#0c1833` | [P] |
| Floor tiles | diamond h/w 0.46-0.47, side 5-6.5px `#dae6ff`, contours 1px `#3d79fe` top and bottom | [P] |
| Workflow cards | iso 30°, `#fff` with 0.5px `#dde7ff` grid (~25px pitch), 1px `#5589fd` contour, under-plate `#d5e2ff`; pill `#3d79fe` + `#e1eaff` under-plate | [P] |
| Floor light | outer ellipse `#f7f8f9`, inner `#fbfbfc`, contact disc `#eaeffc`, glow `#e3eaf9` | [P] |
| Section h2 | serif ≈48/41, two lines, centred | [P] section-examples |
| Bento | cells `#fff`, 1px `#e7e8eb`, radius 0, title serif ≈22-24, body sans ≈15-16/21.5 | [P] |
| Emphasis plane | flat `#3d79fe` (Enterprise band) | [P] |
| Scroll settle | ≈1 s per flick, remaining distance ×0.75 per 100 ms (may be the recorder) | [V] |

Section order (build video): hero → white band "01. You Tell Us What You Do / 02. We Design Automations / 03. You Scale Without Busywork" (text and iso illustration alternate sides, each step with its own pill CTA; grey serif numerals "01.") → "Examples of What You Can Automate With Chatsheet" (3 + 2 hairline bento) → "Enterprise-Grade Automation, 100% Done-for-You" (3 columns, blue planes, centred pill CTA) → "Ready to Save Hours Every Week?" (white panel, left copy, right orbit rings with logo discs on dashed orbits) → footer (serif wordmark, Terms / Master subscription agreement / Privacy policy, ©2025).

## 4. Dos and Don'ts

- **Do** pill CTAs with an inset bevel (crop-ctas@2x.png). **Don't** use a radius-12 gradient button with a white top highlight (our replica).
- **Do** use the same ground under the nav. **Don't** use a lighter nav band with a 2px opaque rule (our replica, read from the video).
- **Do** draw blue 1px contours on white and tint faces. **Don't** use pale grey strokes (`#dfe5f3`) with navy blurred contact shadows (our replica's tiles).
- **Do** put logos in the tile plane. **Don't** square them to the screen (our replica: `rotate(-45)` inside the plane matrix, which cancels the plane's rotation and leaves the glyph upright and squashed).
- **Do** draw cards as spreadsheets with grids. **Don't** use glass cards holding only a few coloured mini-chips (our replica).

## 5. Exceptions & judgement calls

- The 2x originals are Figma exports, and the build differs from them in places: the build clips the scene at the hero rule, its rails sit closer to the edge at its recorded viewport, and the light columns above the Slack and PDF plates in the original are faint or absent in the video. When the two disagree, the original carries the craft and the video carries the behaviour. [engine note]
- The two-projection scene (tiles at 0.46, coin and cards at 0.577) breaks the "one projection" rule in `isometric-line-art.md`. It works here because the tiles are a separate group on the floor and the coin is a hero object tilted to show its face. Treat it as an owned decision, not a default. [engine note]
- The font identity is inferred. Before building anything that depends on it, confirm with a side-by-side render (CSL-07), or ask the founder whether Kargul's Figma names it. [engine note]

## 6. Figures worth keeping

- `hero-fold-1440@2x.png`: the canonical hero; `crop-coin@2x.png`, `crop-tiles@2x.png`, `crop-cards@2x.png`, `crop-ctas@2x.png`, `crop-nav@2x.png`, `crop-h1@2x.png`: the details at native resolution.
- `section-examples-1440@2x.png`: hairline bento with square cells and serif titles.
- `section-enterprise-1440@2x.png`: flat blue planes with dashed outlines, iso tiles on a dashed grid.
- `section-cta-footer-1440@2x.png`: orbit CTA with logo discs (stacked-disc edges) on dashed orbits.
- `section-steps-illustrations-1440@2x.png`: the three step illustrations.
- `build-*-1252.png`, `build-scroll-sheet-0-18s.png`, `build-scroll-frames-0-2.5s.png`: the built page and its scroll behaviour.

## 7. What our replica got wrong

Compared against `work/replicas/app/src/KargulHero.tsx` and `work/replicas/KARGUL-HERO-NOTES.md`, point by point.

| # | Replica | Real (measured) | Fix |
|---|---|---|---|
| 1 | Built at 1252 video pixels as if they were CSS | The video is the page at ≈0.88; tokens are 12-14% larger | Rebuild at 1440 from `hero-fold-1440@2x.png` (CSL-01) |
| 2 | Page `#f6f5f8` "cool lilac-grey" | `#f5f6f7` neutral; the lilac was codec chroma | Re-sample from the PNG (CSL-02) |
| 3 | Nav band `#f9f9fb` + 2px `#ebebed` rule, 48 tall | No band; 1px `#dee0e3` rule at y 70 | CSL-03 |
| 4 | Rails 2px `#efeef1` at x 26/1224; a full-width rule at 803 | 1px alpha hairline at 39.5/1400; gutter-only ticks at 930 (build: full rule clipping the scene) | CSL-04 |
| 5 | h1 Source Serif 4 (auto opsz → display), 70/60 at video scale (≈80/68 real) | Moderate-contrast serif, x/cap 0.71 (closest Lora), ≈76/68, weight 400, `#0c1833` | CSL-06/07; the size was inflated to make up for a narrow font |
| 6 | Sub 15/25 `#55586a` | ≈17/28 `#525b6e` (same token as nav links) | CSL-06 |
| 7 | CTAs radius 12, primary gradient `#3a74f4 → #4680f8` + white inset top highlight + 1px `#3463d4` ring | Pills; flat `#3d79fe`; dark inner top, light inner bottom | CSL-08/09 |
| 8 | Nav CTA 128x34 radius 11 | Pill 148x37.5 | CSL-08 |
| 9 | Logo: filled blue disc with a white ring and a white dot | Open line mark: blue ring, gap, blue ring, gap, blue dot | Redraw from crop-nav@2x.png |
| 10 | Coin dimetric ry/rx 0.43 (notes: "25deg"); the notes read the top ellipse as 215x92 | True iso 0.577 (243.5x140.5 CSS; 214x124 in the video too). The 92 was a mis-read edge | CSL-11 |
| 11 | Coin face: two open arcs rotated (dasharray) on a pale disc | Labyrinth: concentric raised light rings broken by two aligned gaps (top and bottom), blue grooves with darker inner edges, white bevel rim with a 1px blue contour, sparkle dots | CSL-13 |
| 12 | Coin side: navy gradient with a blue left sheen, uniform height | Navy `#0c1833` base with a stepped cut-out on the front-left, plus a blue-lit narrow face at the cut | CSL-13 |
| 13 | Tiles k = 0.53 "steeper because perspective" | 0.46-0.47 consistently; the coin and cards are steeper (0.577) | CSL-11 |
| 14 | Tile strokes `#dfe5f3` grey, stacked `#f4f6fc` side, `#bccbef` underside, navy blurred shadow | 1px `#3d79fe` contour top and bottom, `#dae6ff` side, white face with fine dot grain, a faint blue lift | CSL-10 |
| 15 | Logos squared to the screen (`rotate(-45)` inside the plane matrix) | Logos in the plane, reading up-right | CSL-11 |
| 16 | Missing tiles: AWS (left edge), LinkedIn, a second PDF; tiles in the wrong slots | AWS, Slack (standing), PDF (standing glass), YouTube, Drive, Gmail, Sheets, Excel, PDF, LinkedIn | Re-place from crop-tiles@2x.png |
| 17 | Dotted path grey `#b7bccd` | Blue dashed connectors (brand blue at reduced alpha) | CSL-17 |
| 18 | Cards: glass gradient `#f7f9ff → #edf2ff`, a few mini chips, thin 21-unit pills | White spreadsheet sheets with a 0.5px `#dde7ff` grid, icons in column 1, thick 3D pills with an under-plate; the third card and its pill fade to white at the right | CSL-12 |
| 19 | Halo: a radial `#bcd0ff` blob above the coin | A softer `#e3eaf9` glow; flat stepped floor ellipses `#f7f8f9`/`#fbfbfc`; contact disc `#eaeffc` | CSL-14 |
| 20 | Scene construction "one 25deg dimetric plane; every object through the same matrix" | Two projections; line-art contours; product artefact (sheets) in the scene | CSL-10..12 |
| 21 | Motion: none modelled (correct) | No load-in exists in any source; at rest it is static apart from sub-pixel float or twinkle near the Slack/PDF plates and the coin | Keep it static; at most a 6-8 s float of ±2px on the standing plates [I] |
| 22 | Scope: hero only | The page has 5 more sections in the same iso kit (§3) | If the landing is replicated, use the section originals |

## 8. Open questions

- **Framework, fonts and CSS are not documented.** No public deployment exists (§0). Ask the founder whether Kargul has a live link, or whether the founder can get a staging URL. Until then the font family, feature settings, hover/active/focus states and asset formats are unknown.
- **Scene format (SVG vs raster vs canvas) is not documented.** The crisp 1-device-px contours and the flat fills fit a Figma vector export (SVG or 2x PNG layers) [I]. No WebGL or 3D motion appears in the build video.
- **Mobile composition is not documented.**
- **Scroll smoothing:** site (Lenis-like) or recorder (Screen-Studio-like)? Not determinable from the video.
- The Slack and PDF "light columns" in the original are faint in the build. They may be a hover or highlight state.
