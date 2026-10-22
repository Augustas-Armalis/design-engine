---
source: web:https://x.com/marcelkargul (850 media posts, 4 Jun - 22 Oct 2026, via api.fxtwitter.com /media) + web:https://x.com/kargulstudio (67) + web:https://kargul.studio/swipe-file (all 632 items) + web:https://kargul.studio/work (32 cases, 299 gallery originals)
chapter: The Kargul corpus - every reachable Marcel Kargul / Kargul Studio image, classified, censused and measured; corrections to KH and KMD; X post formats; signature visuals per category; change over time
pages: n/a (2002 files, 1236 unique images, 255 hand-measured rows, 1235 census rows; captured and measured 2026-10-22)
topic_tags: [benchmark, founder-bar, hero, x-post, social, product-ui, dashboard, bento, landing, mobile, brand, signature-visual, layout-family, type, spacing, radius, colour, dark-mode, light-mode, trend]
status: studied
evidence: knowledge/benchmarks/kargul-corpus/ (CREDITS.md, manifest.tsv, classification.tsv, census.tsv, measure/*.tsv, sheets/*.jpg, _scripts/)
companions: kargul-heroes.md (KH), kargul-micro-details.md (KMD), kargul-saas-playbook.md (KS), x-design-posts.md (XP), lunor-founder-style.md (LN), ../benchmarks/marcel-kargul-profile.md
---

# The Kargul corpus: what thousands of his images teach

**Why this note exists.** The founder said: "study marcel better - and a LOT MORE OF HIM... just study his thousands of works everything please". The earlier studies each read a slice:
- 55 heroes (KH);
- about 40 product screens (KMD);
- 223 X posts (KS).

This note reads everything that is publicly reachable. Every image was looked at, every unique one was classified by hand, and 255 were measured on the originals. Where the bigger sample disagrees with KH or KMD, the corrected numbers are in §8.

**What was read** (`kargul-corpus/CREDITS.md`):

| Source | Files | Unique | Range |
|---|---|---|---|
| @marcelkargul X media | 1004 (899 photos, 105 video posters) from 850 posts | 527 | 4 Jun - 22 Oct 2026 |
| @kargulstudio X media | 67 | 15 | Aug 2025 - Oct 2026 |
| kargul.studio swipe file | 632 (web 158, brand 161, product 313) | 398 | undated |
| Case-study galleries | 299 (32 cases) | 295 | undated |
| Dribbble / Layers / Behance / Contra / Figma / read.cv | 0 (404, 403, 402, or an empty unverified Behance) | - | - |
| **Total** | **2002** | **1236** | |

The mirror serves 1004 of the 3611 media items his profile reports. Anything he posted before 4 Jun 2026 that never became a case or swipe item is not covered (§10).

**Unique images by kind** (light / dark):

| Kind | Unique | Light | Dark |
|---|---|---|---|
| product app screen | 210 | 162 | 48 |
| brand or logo | 196 | 106 | 90 |
| dashboard | 150 | 118 | 32 |
| X post format | 145 | 120 | 25 |
| mobile | 124 | 111 | 13 |
| landing section | 111 | 62 | 48 |
| hero | 75 | 41 | 34 |
| bento | 54 | 21 | 33 |
| illustration | 30 | 20 | 10 |
| component | 29 | 17 | 12 |
| other (not his design: photos, screenshots of X, LinkedIn or DMs, third-party sites) | 112 | 52 | 60 |

**The answer in one paragraph.** Marcel's output is about 70% product UI: app screens, dashboards and phones. Only about 6% is heroes. That UI is extremely consistent:
- light grey canvas, white surfaces, 1px rings, no resting blur;
- one accent in the chrome (85% of app screens hold one hue family or none);
- a 32-36 control and a 52-60 two-line row;
- radii near 8 / 11 / 17.

The variety lives in three places only:
1. **The hero's visual concept.** It literalises the product's name or verb.
2. **The brand layer.** Posters, marks, paintings and 3D: the most colourful thing he makes.
3. **The X presentation format.** How a finished screen is cut, framed and staged for the feed.

He presents almost nothing raw. The same product screen comes back as:
- three 1:2 strips on `#dddddd`;
- a window on a macOS wallpaper with the dock;
- four 2x zoomed slices;
- a 2x2 collage;
- an annotated spec;
- a font card.

Format choice measurably moves views: a desktop-wallpaper window has a median of 43.2k views against 13.8k for a plain screenshot (§6).

## 1. Core ideas

1. **He is a product-UI studio that markets with heroes and posters.** The X stream is 224 product screens, 166 dashboards and 144 phones against 34 heroes. The heroes and brand work carry the colour and the ideas; the product carries the trust. The engine's floor should copy that balance: product screens built to his consistency, with heroes and posts as the place for invention.
2. **Light heroes are centred; dark heroes are split or visual-first.** Of the 41 light heroes, 30 (73%) are centred: F1 10, F2 11, F7 5, F10 2, F6 2. Of the 34 dark heroes, 22 (65%) put the copy beside or under the visual: F3 13, F4 6, F5 3. Dark heroes need room for a light source away from the type (KH-28). Light heroes have none to place, so they centre over a scene or the product.
3. **The type tuple is fixed and the visual moves.** 13 new pixel-precise heroes reproduce KH's 64 / 500 / -0.03em median exactly. Variety never came from type.
4. **Rhythm: tight above, generous below.** h1 → sub is about 20, sub → CTA about 38, CTA → next element about 89. The new heroes put h1 → sub nearer 20 than KH's 24 (§8.1).
5. **Product chrome is one hue, charts are not.** App screens:
   - 85% hold at most one saturated hue bin;
   - the median saturated-pixel share is 0.8%.

   Dashboards:
   - only 53% hold one hue;
   - the median saturated share is 2.6%;
   - data series use 3-5 categorical hues (p169, p232, p175).

   The accent is rationed in the chrome, not in the data.
6. **Presentation is a format, and the format is chosen for the feed.** 25 format types were seen. The strongest per post:
   - the desktop window: 43.2k median views, 225 bookmarks;
   - Do / Don't: 28.5k;
   - the 2x2 collage: 24.3k;
   - the font card: 24.0k, with the most bookmarks of any common type (336);
   - strips on wallpaper: 21.6k.

   The outliers are teaching posts:
   - a spacing redline spec: 547k;
   - an AI-vs-studio comparison pair: 219k.
7. **He teaches with numbers.** The format type he posted most is the annotated spec: callout lines to shadow X / Y / blur / spread, fill, stroke and glass values. Other teaching formats:
   - font cards with tracking values ("Geist -6%", "Inter -8%", "Manrope -5%", "SF Pro Rounded 1%");
   - the concentric-radius explainer (inner 9 + padding 10 = outer 19);
   - his own X media size cheat sheet.

   These posts show the values he wants people to copy, so they are his stated rules, not inferred ones.
8. **Brand work is the colour reservoir.** Brand images run a 15-16% saturated share, against 1-3% for UI. He uses:
   - neo-brutalist and Swiss posters;
   - highlighter-box headlines;
   - cinematic paintings and photo key art;
   - glossy 3D badges and icons;
   - line-construction marks on grids.

   The product of the same client stays grey.
9. **Things drifted calmer and more product-led over five months.**
   - **June-July:** brand, mobile and teaching formats dominate. 26% of X images are formats; the UI saturated share is 2.1%.
   - **August-September:** heroes, product and 1:2 strip carousels take over.
   - **October:** 55% of all images are app screens and dashboards. The UI saturated share falls to 1.1-1.2%. The formats move to desktop windows, font cards and wallpaper strips.

## 2. Rules

### Heroes

- **RULE KC-01** Pick the layout family by theme first. Light heroes default to a centred family (F1 over the product, F2 over a scene, F7 typographic). Dark heroes default to split or visual-first (F3, F4, F5), with the light source on the far side of the copy.
  **Why** 30/41 light heroes are centred and 22/34 dark heroes are split or visual-first.
  **Applies to** landing hero. **Check** DIRECTION names `family:` and `theme:`; if they cross (dark centred, light split), write an `override:` line. **Source** classification.tsv heroes; §3.1

- **RULE KC-02** Keep the h1 at 56-72 (64 median) / 500 / -0.03em, 2 lines and 6 words. Use 3 lines in only two ways:
  - a long statement (10-19 words) set small, 40-53;
  - a 5-word ad headline set big, about 73-77 at 1440, at 600-700 with 1-2 words per line.
  **Why** 13 new pixel-precise folds give 64 / 500 / -0.03em, the same as KH-03. The 3-line folds are of exactly these two kinds:
  - long statements: kargul.studio v3 at 46-53 / 700 with 10 words, and Opsis at 40 / 400 with 19 words;
  - ad headlines: Magic Ads about 73 / 600 and Loopara about 77 / 700, 5 words each.
  **Applies to** hero. **Check** computed `h1` size, weight and letter-spacing. **Source** measure/heroes.tsv P rows; KH-03

- **RULE KC-03** Space the copy block 16-24 h1 → sub (20 default), 30-46 sub → CTA (38), and 64-110 CTA → the next element (89 median). When the visual surrounds the copy, the next element may start at 24.
  **Why** New medians are 19.7 / 38.8 / 89, against KH's 24 / 38 / 70. The first and last gaps were off.
  **Applies to** hero. **Check** ink-to-ink with `getBoundingClientRect`. **Source** heroes.tsv; corrects KH-04 (§8.1)

- **RULE KC-04** When something sits above the h1, put it 16-31 above the h1 ink (26 median). Use it in at most a third of heroes. It is usually a fact (a stat, an announcement, a backer). A short slogan pill is allowed in ad and consumer brands.
  **Why** The new rows give 16-31 (n=4), against KH-09's 34.5. Magic Ads uses two slogan pills, so "facts only" is a tendency, not a law.
  **Applies to** hero. **Check** gap above h1 ≤ 32. **Source** heroes.tsv (xm-2066661539369619771-0, swipe-web-020); corrects KH-09

- **RULE KC-05** Primary CTA 40-52 tall (47 median), with a 37 floor for compact technical brands and up to 54-59 for studio or editorial folds. Use pill, radius 0 or r6-15 in about equal thirds.
  **Why** The new P rows give 47 (37-52) with corners 4 pill / 4 square / 4 r6-15. Altrina's case CTA is 54, not 30. kargul.studio's latest is about 59.
  **Applies to** hero. **Check** rendered height and radius. **Source** heroes.tsv; corrects KH-08 (§8.1)

- **RULE KC-06** Nav: a 54-73 bar (70 median), or a floating centred pill 37-40 tall, optionally under a 36-38 announcement bar. The nav CTA is always smaller than the hero CTA (32-40).
  **Why** KH-19 did not cover the floating pill nav (swipe-web-020, xm-2087768341389656531-0) or the announcement bars (RunInfra, MFC, kargul.studio).
  **Applies to** hero. **Check** nav height; nav CTA height < hero CTA height. **Source** heroes.tsv nav_h, nav_style

- **RULE KC-07** Every hero still needs one signature visual drawn from the product's name or verb (KH-01). In the new set the mechanisms run:
  - isometric objects: 7;
  - real product UI: 6;
  - generative fields: 4;
  - glowing objects on dark: 3-4;
  - photo or painting: 3;
  - type trick: 1.

  Choose the mechanism by product category (§5), not by habit.
  **Why** The same mechanisms recur per category across 75 heroes, 54 bentos and 111 landing sections.
  **Applies to** hero, bento. **Check** DIRECTION names the category recipe from §5 used. **Source** heroes.tsv signature_visual; classification notes

### Product UI

- **RULE KC-08** Present light product UI on a `#fafafa` or `#ffffff` page with white surfaces, `#ececec`-class rings (`#e7e7e9`, `#ebebeb`), text `#171717` / `#757575` / `#a1a1a1` (or `#5c5c5c` / `#a3a3a3`), and no resting blur on desktop cards.
  **Why** 24 of 34 light screens are ring-only at rest. `#757575` + `#a1a1a1` is the most common secondary pair (16/34), and `#5c5c5c` appears in 7.
  **Applies to** SaaS app UI, light. **Check** computed colours against the two greys pairs; card box-shadow has no blur > 0. **Source** measure/product-ui.tsv; extends KMD-01/03

- **RULE KC-09** Dark product UI: page `#000`-`#141414`, rings `#141414` / `#1c1c1c` / `#242424` one step above the surface, no resting shadow anywhere. A dragged or floating item may take a heavy drop (about `0 4px 16px .45`).
  **Why** All 14 dark screens are flat at rest. p235 shows the one exception, which is in motion.
  **Applies to** SaaS app UI, dark. **Check** no blur shadow on resting dark surfaces. **Source** product-ui.tsv dark rows; confirms KMD-06

- **RULE KC-10** Controls: 32-36 in toolbars (32 dark, 33 light at precise scale). Form inputs: 42-51. One height per toolbar.
  **Why** The precise light controls are 32-33. Inputs in forms measure 42-51 (lemon-04, ecom-jobs-00, p157). AM's New button is 28 and Plunio's buttons are 38.
  **Applies to** SaaS app UI. **Check** controls in one toolbar share a height; inputs ≥ 40. **Source** product-ui.tsv control_h; refines KMD-11

- **RULE KC-11** Row pitch follows content:
  - 38-40 for one-line dense tables (the CRM, ListKit);
  - 52-61 for his default tables, which carry an avatar, logo or second line;
  - 68+ for avatar + two-line rows in dark.
  **Why** No sampled table measured 38-40. Precise ones measure 52 (sf-tensor-00), 55.5 (p332) and 60 (clokora-06); the light median is 55.5 (n23) and dark is 68.
  **Applies to** SaaS app UI. **Check** pitch per row type is constant. **Source** product-ui.tsv row_pitch; corrects KMD-16's default (§8.2)

- **RULE KC-12** Radius ladder by element:
  - light: card 17-18, control 11, chip 8, pills for status;
  - dark: card 14-15, control 8, chip 5.

  Phone screens: frame 393 wide (6/10), cards about 18, pill controls 42-53. Some products go all-square (r0: zeroleaks-07, opsis-08) or all-pill (p035, p331). Pick one family per product and stay in it.
  **Why** Medians over 39 light and 12 dark cards.
  **Applies to** SaaS app UI, mobile. **Check** rendered radius per element class against the ladder. **Source** product-ui.tsv r_card, r_control, r_chip; KMD-10

- **RULE KC-13** One accent in the chrome. Charts may carry 3-5 categorical hues, but only inside the plot area. Keep the saturated pixels of an app screen near 1% and a dashboard under about 3%.
  **Why**
  - App screens: 85% have ≤ 1 hue bin, median saturation 0.8%.
  - Dashboards: 53% have ≤ 1 hue bin, median 2.6%.
  - Only 9 of 34 light screens are strictly one-hue.
  **Applies to** SaaS app UI, dashboards. **Check** pixel pass: saturated share per region (chrome vs plot). **Source** census.tsv by kind; product-ui.tsv accent_count; refines KMD-06/KS

- **RULE KC-14** KPI numerals can be 600 (28-44 px) or regular (28/400). Choose one per product and never mix the two.
  **Why** p149, p089, p035 and agent-arcade-01 set KPIs at about 600 (44 px in Agent Arcade). Clokora and ZeroLeaks are 400.
  **Applies to** SaaS app UI. **Check** all KPI values share one weight. **Source** product-ui.tsv kpi_size_weight; corrects KMD-18 as a universal

- **RULE KC-15** Sidebar 230-270 wide (266 median light, 233 dark). Labels 14-15. The active item is a fill step, never a bar.
  **Why** 22 light and 6 dark sidebars measured.
  **Applies to** SaaS app UI. **Check** sidebar width; active row has a background, no border-left. **Source** product-ui.tsv sidebar_w, active_nav

### Bento and sections

- **RULE KC-16** A Kargul bento gap is small: 12-18 in light, 16-18 in dark. The most common light construction is a 0-gap hairline table: ruled cells sharing 1px rules (13 of 32 measured).
  **Why** volcano-02 12, web-071 16, defendlab-04 18, web-084 17 (P), rork 18. Ruled tables: mobile-first, chatsheet, gopher, txtcart, web-001.
  **Applies to** bento. **Check** grid gap; or 1px shared rules with gap 0. **Source** measure/bento-section.tsv

- **RULE KC-17** Cell radius 10-14 when rounded (light r12-14, dark r12 precise), or 0 in ruled tables. Inner padding 24. One edge per cell: either a `#f7f7f7` fill with no ring, or a white cell with a ring on `#fafafa`.
  **Why** The P/E rows give 10-14. Only crop estimates reach about 20. defendlab-04, 43-03 and volcano-02 each use one edge.
  **Applies to** bento. **Check** rendered radius; a fill and a ring never sit on the same cell. **Source** bento-section.tsv r_cell, cell_edge, cell_pad

- **RULE KC-18** Cell type: title about 19 / 400-500, body 14-15 with line height 20-24. Section heading about 50 / 500 (or a 400 serif), heading → grid about 54 (35-97).
  **Why** Medians over the measured rows.
  **Applies to** bento, landing section. **Check** computed sizes. **Source** bento-section.tsv

- **RULE KC-19** Light bento visuals:
  - iso illustration or line art (9 of 16);
  - big planes filled with one saturated brand hue (mobile-first, volcano, chatsheet);
  - product fragments.

  Dark bento visuals:
  - product UI in dark glass or glossy 3D objects (13 of 22);
  - big numbers (4: "89%", "10k", "$27B", "24/7");
  - teal pixel or iso art.

  Dark light always comes from an object in a cell, plus a top-edge-brighter 1px ring. Never from a page blob.
  **Why** Visual kinds over 38 bento and section images.
  **Applies to** bento. **Check** each cell's visual is one of these kinds; dark cells are 5-11 L above a `#000`-`#111` page. **Source** bento-section.tsv visual_kind, notes

### X posts

- **RULE KC-20** Post product screens through a format, not as a bare screenshot. Plain screenshot posts get a 13.8k median and 63 bookmarks. Format posts get 17.9k and 116. Choose from the recipes in §6.
  **Why** 95 top-level format posts against 269 plain image posts, same account, same period.
  **Applies to** X post. **Check** the post matches one §6 recipe by name. **Source** measure/x-formats-summary.tsv

- **RULE KC-21** For the strongest format, place a 1440 CSS app window at about 2.1x on a 4096x2660 macOS desktop composite: wallpaper (photo or abstract gradient), menu bar and dock. The window is 74% of the width, with insets L = R 12.8%, top 6.1%, bottom 12.4% (the dock), radius 15-18 CSS, and no added shadow.
  **Why** 7 posts, median 43.2k views and 225 bookmarks, the best of any common type (xm-2111472960452038719 91.6k, xm-2112558891242230163 67.6k, xm-2076793337328128129 57.8k).
  **Applies to** X post, product screen. **Check** composite 4096x2660 (1.54); window width / composite 0.72-0.76. **Source** x-posts.tsv desktop rows

- **RULE KC-22** For a carousel of one screen, cut one composite into equal thirds with no overlap or gap:
  - **Grey canvas:** 3 x 2048x4096 (or 1024x2048) on `#dddddd` (dark: `#3c3c3c` / `#505050`). The window (1365 CSS on a 1536x1024 artboard at 4x) is inset L = R 5.6% and T = B 2.6% of the composite. No shadow, radius 0-16.
  - **Full-bleed:** 3 x 960x2048 strips of a 1440x1024 CSS frame at 2x.

  UI text then reads at about 12 px in the 514 px feed tile.
  **Why** 8 grey-canvas posts at 20.0k median, and 5 wallpaper-strip posts at 21.6k. Strips replaced 16:9 slices from 31 Aug 2026.
  **Applies to** X post. **Check** 3 images, aspect 0.47-0.50, seams fall on exact thirds. **Source** x-posts.tsv strips (xm-2096568932379373852, xm-2111515571179122856, xm-2094519838005764103)

- **RULE KC-23** Teaching formats name real values:
  - **Annotated spec:** a centred subject on `#f7f7f7`-`#ffffff` with a faint cell grid, orange (or red) 1px callout lines to label columns giving shadow X / Y / blur / spread / colour / opacity, fill, stroke and glass.
  - **Font card:** the family name centred at 48-83% of the width, with one grey line under it: "Letter spacing: -6%".
  - **Do / Don't:** two cards 100 px apart on `#f7f7f7`, with a green check and a red cross.
  - **Step tutorial:** 2x2 steps on `#f5f5f5` in `#f9f9f9` cells.

  Only post values the build really uses.
  **Why** The annotated spec is the most-used type (10 posts). The font card has the most bookmarks (336). A spacing redline reached 547k.
  **Applies to** X post. **Check** every number in the media matches the computed style of the subject. **Source** x-formats-summary.tsv; xm-2066174499049844750, xm-2077093536000864257, xm-2076795540545642643

- **RULE KC-24** Use his own size table:
  - 1 image: 1080x1350 (4:5), 1080x1080 or 1080x608 (16:9);
  - 2 images: 1050x1200 (7:8) each;
  - 3 images: 1080x1215 (8:9) on the left plus 1080x608 pairs on the right;
  - 4 images: 1080x608 each.

  Export at 2-4x these sizes. His own single images run 1.25-1.54 landscape (58%), 1:2 strips (7%) and 1:1 (6%).
  **Why** His cheat-sheet post (xm-2079249421049491477, 20 Jul 2026), and the aspect census of 917 media posts.
  **Applies to** X post. **Check** image aspect equals one slot of the table. **Source** x-formats-summary.tsv; manifest dims

- **RULE KC-25** Framing: product formats are inset equally on opposite sides (L = R, T = B) and do not bleed. Bleed right + bottom appears only in two-page full-scroll pairs and zoomed detail crops.
  **Why** Strips, desktop windows, collages and the token sheet (which bleeds right only) measured that way. Equal L/T with R+B bleed is 6 of 77 posts.
  **Applies to** X post. **Check** inset_l ≈ inset_r and inset_t ≈ inset_b, unless the format is a scroll pair or a detail crop. **Source** x-posts.tsv insets and bleed (conflicts with a founder verdict; see §9)

- **RULE KC-26** A 2x2 collage sits on flat grey (`#aaaaaa`-`#e5e5e5`) at 4096 wide, with the outer margin equal to the gutter (1.5-1.8% of the width) and square or about r20 tiles with no shadow.
  **Why** 5 posts, 24.3k median.
  **Applies to** X post. **Check** margin = gutter ±2 px. **Source** x-posts.tsv collage rows (xm-2107524099018764393)

- **RULE KC-27** Feed legibility is a secondary concern for his best formats. Desktop windows put UI text at about 3 px in the feed tile, and collages at about 2 px, yet they rank top. The read is the whole composition, not the labels. Keep the engine's 6.5 px gate for component posts only.
  **Why** Measured feed label sizes against views.
  **Applies to** X post. **Check** apply `feed legibility` only to `post-component`. **Source** x-posts.tsv feed_min_label_px

### Brand and corpus discipline

- **RULE KC-28** Keep the client's product grey and spend colour in the brand layer: posters, social tiles, key art and marks. Brand images run a 15-16% saturated share, against about 1% for the product.
  **Why** census.tsv medians: brand 0.153-0.158, app screens 0.008-0.010.
  **Applies to** branding, full website. **Check** product views saturation ≤ 3%; colour budget documented for the brand layer. **Source** census.tsv

- **RULE KC-29** When replicating from this corpus, measure the scale on a hairline first. Swipe exports range 1.10-1.44 px/CSS, many product exports are zoomed crops, and X originals vary from 1x to 4x.
  **Why** Only DefendLab matched the 1.1042 that KH assumed for all swipe exports.
  **Applies to** replication. **Check** `kh.py hair` shows a crisp N-px rule before any size is read. **Source** heroes.tsv header; corrects KH-29 and kargul-heroes CREDITS

- **RULE KC-30** Never take content from the corpus: no client names, logos, copy, scenes or the studio's own wordmark. Take the grammar (family, tuple, rhythm, ladder, format recipe) and invent the world anew.
  **Why** The founder's plagiarism rule.
  **Applies to** all. **Check** DIRECTION lists what was borrowed (numbers and grammar only). **Source** CREDITS.md

## 3. Numbers and scales

### 3.1 Heroes (75 unique; 42 measured rows, 13 pixel-precise new desktop folds)

| Family | All | Light | Dark |
|---|---|---|---|
| F3 split copy / visual | 21 | 8 | 13 |
| F2 centred over a scene | 13 | 11 | 2 |
| F1 centred over the product | 13 | 10 | 3 |
| F4 visual first, copy at the bottom | 9 | 3 | 6 |
| F7 typographic | 5 | 5 | 0 |
| F10 generative field | 4 | 2 | 2 |
| F6 prompt-first | 4 | 2 | 2 |
| F9 system diagram | 3 | 0 | 3 |
| F5 split header over the product | 3 | 0 | 3 |
| F8 flat brand panel | 0 in the unique set (1 in KH) | | |

| Measure (new P rows) | Median | Range |
|---|---|---|
| h1 size / weight / tracking | 64 / 500 / -0.03em | 40-97 / 400-700 / -0.06..0 |
| lines / words | 2 / 6 | 1-3 / 3-19 |
| h1 cap top | 206 (168 for centred and split) | 134-641 |
| above-h1 → h1 | 26 | 16-105.5 |
| h1 → sub | 19.7 | 9.2-34 |
| sub → CTA | 38.8 | 22.5-57.9 |
| CTA height | 47 | 37-52 (54-59 outside the P set) |
| CTA → next | 89 | 24-341 |
| nav bar | 70 | 54-73; floating pill nav 37-40 |

### 3.2 Product UI (58 measured: 34 light desktop, 14 dark, 10 mobile)

| | Light | Dark | Mobile |
|---|---|---|---|
| Control height | 33 at precise scale (28-42) | 32 | pill 42-53 |
| Form input | 42-51 | - | - |
| Row pitch | 55.5 (49-66) | 68 | - |
| Radius card / control / chip | 17-18 / 11 / 8 | 14.5 / 8 / 5 | card ~18, screen 29 (precise) to 37-45 |
| Page / surface | `#fafafa` or `#fff` / `#fff` | `#000`-`#141414` | presentation canvas `#5e5e5e`, `#2e2e2e` or white |
| Ring | `#ececec`, `#e7e7e9`, `#ebebeb` | `#141414`, `#1c1c1c`, `#242424` | - |
| Text 1 / 2 / 3 | `#171717`-`#22222a` / `#757575` / `#a1a1a1` | - | - |
| Accent count | 2 (9/34 strictly one) | 2.5 | 3 |
| Resting card shadow | ring only in about 24/34 | none (14/14) | ring + 2-3 px drop |
| Sidebar | 266 (n22) | 233 (n6) | frame 393 (6/10), 402, 375 |
| Labels | 14-15 | 14 | - |

### 3.3 Bento and sections (38 measured; 32 with grid metrics; precision 8 P / 10 E / 20 crop)

| Measure | Median | Range |
|---|---|---|
| Gap, separated cells | 17 | 12-35 (P/E 12-28); 0 in 13 ruled tables |
| Cell radius | 10-14 (P/E) | ~17-22 on crops |
| Inner padding | 24 | 18-36 (editorial frames 44-56) |
| Section heading | ~50 / 500 or 400 serif | 36-61 |
| Heading → grid | ~54 | 35-97 |
| Cell title / body | 19 / 14-15 | 16-24 / lh 20-24 |
| Patterns | 2x2 (and checkerboard) 6, 3+2 6, one row 5, 3+3 2, wide visual over cells 2, pinwheel 1 | |

### 3.4 Census over 1235 unique images (automatic)

| Kind | Median saturated share | ≤ 1 hue bin | Canvas solid |
|---|---|---|---|
| Product app screen, light / dark | 0.8% / 1.0% | 85% / 85% | 80% / 60% |
| Dashboard, light / dark | 2.6% / 1.8% | 53% / 53% | 81% / 59% |
| Mobile, light | 3.8% | 44% | 92% |
| Hero, light / dark | 2.9% / 2.7% | 73% / 62% | 68% / 56% |
| Bento, light / dark | 1.8% / 2.5% | 67% / 64% | 90% / 94% |
| Brand, light / dark | 15.3% / 15.8% | 47% / 62% | 84% / 72% |

The commonest presentation canvases behind product screenshots are `#2e2e2e`, `#5e5e5e` and white. Behind X formats they are white, `#f7f7f7` and `#dddddd`, or dark `#3c3c3c`.

## 4. How his work changed over time (X dates; swipe and cases are undated)

| Period | X images | Mix (top kinds) | Dark share | UI saturated share | Formats |
|---|---|---|---|---|---|
| Jun-Jul 2026 | 281 | formats 26%, mobile 14%, brand 11%, dashboards 11%, sections 9% | 26% | 2.1% | teaching (annotated specs, token sheets, tutorials, Do / Don't), 16:9 four-slice carousels, no 3-image posts |
| Aug-Sep 2026 | 267 | app screens 21%, brand 13%, formats 13%, mobile 11%, heroes 7% | 38% | 1.1% | 1:2 strip carousels from 31 Aug; teaching stops; screen-recorded builds (the CRM build video, 14 Sep, 1.9M views; the open-source release followed on 4 Oct, 616k) |
| Oct 2026 | 498 | app screens 32%, dashboards 23%, mobile 16% | 25% | 1.2% | desktop-wallpaper windows, font cards, wallpaper strips, 2x2 collages; a ~300-image product gallery thread |

What this says:
1. The product grammar is stable over the period. Rings, greys and ladders do not drift. The colour in the UI halved after July.
2. Presentation evolved fastest: from teaching cards to strips to desktop composites. This is where he experiments.
3. The new heroes in the X stream (June-October) add:
   - big 3-line ad headlines (Magic Ads, Loopara);
   - floating pill navs and announcement bars (kargul.studio v3, RunInfra v2);
   - slogan pills above the h1 (Magic Ads).

   The newest folds are a little more "ad-like" than the case studies.
4. His hero stream is thin. Only 34 of 1004 X media are heroes, and most re-show case folds. The case gallery remains his hero archive.

## 5. Signature visuals per product category (recipes the engine can build; never his scenes, copy, names or logos)

Each recipe names the mechanism. Fill the world for the new brand.

| Category | Mechanism the corpus repeats | Family | Theme | Build notes |
|---|---|---|---|---|
| Developer tools / infrastructure | Isometric black line art of the system (browsers, servers, forms) wired to the brand object on a dotted floor grid; or pixel / voxel art of the product name dithering into the next section; or a system diagram converging on a glowing core | F3, F9 | light line art; dark pixel or core | 1px strokes, one accent on the core or lead-ins (KH-24..26); pixel grid of 16 CSS |
| Data infrastructure | Source tiles in one silhouette, wired symmetric to a central core with a floor glow | F9 | dark | 2 x 8 tiles, 7 px nodes, accent < 3% (KH-26) |
| Cybersecurity | Hex-dot world map with glowing threat nodes and mono labels; one glowing hex token throwing rays; circuit traces with the product in a glass frame on a green field; halftone dot arcs | F4, F5, F3, F1 | dark (map, token); light (circuits) | Light only from the nodes and token; the canvas stays `#000`-`#121212` |
| Fintech / crypto | Dot-matrix market chart cleared around the copy; cinematic monolith or landscape key art; 3D ledger or coins with beams; conveyor of documents (tax) | F10, F3, F2 | light dots; dark key art | Two-tone quantised dots on a cream page; key art fills the right 55-60% |
| AI agents / automation | Isometric target or hub with app tiles flowing in; prompt composer as the CTA with results fanned below; integration discs on rings | F2, F6, F1 | light | Composer 640 x 110-185; backer row under it |
| Voice AI / calls | Fibre streaks from a node graph; isometric dark phone with one glowing call button; waveform cards | F3, F4 | dark | Glow on the far side of the copy (KH-28) |
| Healthcare / bio | Woven line-wave ribbon with node labels; cell lattice in line; serif h1 | F4, F3 | light | Teal or green ink family; serif for trust (KH-17) |
| VC / professional services | Cinematic painting as a window (cave mouth, doorway); grain-particle ribbon with constellation points | F2, F10 | dark | Serif 400 h1; painting is the only colour |
| Consumer / creator mobile | Fan of phones on a sky gradient; glossy 3D badges and icons; toggle-word h1 | F3, F7, F6 | light | Photo-real faces in the UI; sky gradient stage |
| Ecommerce / messaging | One h1 word in the brand blue; phone on a blue sky stage | F1 | light | Product phone is the hero |
| Productivity / B2B app | The real product in a browser or window on a sky or desktop field, sometimes with a dock | F1, F5 | light | Product at Kargul density (KC-08..15) |
| Studio / launch / sub-page | Type only, with one trick (struck number, toggle word, gradient text, availability pill) | F7 | light | Larger CTAs 54-59 |

Brand-layer recipes, for posters and social tiles:
- highlighter-box headline on cream with flat donut and bar shapes;
- Swiss grid posters (blue, red, green) with oversized caps;
- neo-brutalist orange and black type posters with pixel numerals;
- serif statement tiles on a deep brand colour with a constellation of dots;
- line-construction marks on a visible grid;
- wordmarks over grayscale ring renders or cinematic landscapes.

## 6. X post formats (95 top-level format posts; 77 measured)

| Format | Posts | Median views | Median bookmarks | Recipe |
|---|---|---|---|---|
| App window on a desktop wallpaper | 7 | 43.2k | 225 | KC-21 |
| Do / Don't | 3 | 28.5k | 258 | two cards on `#f7f7f7`, 100 px gutter, check and cross |
| 2x2 collage on grey | 5 | 24.3k | 259 | KC-26 |
| Font / type card | 7 | 24.0k | 336 | white or `#f7f7f7`; name at 48-83% width; one grey line with the tracking value |
| 3 strips on a wallpaper | 5 | 21.6k | 193 | halftone or grain gradient (blue → orange) or a macOS wallpaper; 1440 window at 2-3x; equal insets 2-8% |
| 3 strips on a flat canvas | 8 | 20.0k | 85 | KC-22 |
| Token sheet beside the UI | 6 | 15.4k | 94 | `#f6f6f6`, token panel `#eeeeee`; the UI bleeds right only |
| Full-page scroll pair or triptych | 8 | 14.4k | 69 | 2-3 long pages on grey `#8d8d8d`-`#cacaca`; margin 2-6.5%; gutter = margin |
| Annotated spec | 10 | 13.2k | 142 | KC-23 |
| Screens grid (3+ across) | 5 | 13.8k | 91 | white or mid grey; gutter 0.5-1x the margin |
| 4-slice zoomed carousel | 3 | 9.7k | 50 | four 16:9 slices (1440x800 or 2880x1600), each about 720x400 CSS at 2x; cards cut by 1-2 edges |
| Zoomed detail crop | 5 | 7.5k | 19 | 1:1-1.23; L/T 3-6%; bleed right and bottom |
| Step tutorial | 2 | 34.7k | 278 | 2x2 cells, 21 px frame = gutter |
| Comparison pair (AI vs studio) | 2 | 134k | 354 | two 7:8 (3154x3604) on white; label on top; screenshot L = R 4.3% |
| Redline spacing spec | 2 | 297k | 1093 | subject centred; pink or red measurement pills; guides run to the edges (xm-2076795540545642643, 547k) |
| Baseline: plain product image posts | 269 | 13.8k | 63 | - |
| Baseline: video posts | 102 | 14.5k | 92 | his biggest (CRM build 1.9M, brand portal 871k, open-source 616k) are screen recordings |

Other measured facts:
- 93% of media posts carry one image; 16 carry 2, 15 carry 3 and 36 carry 4.
- 3-image posts have a 21.6k median against 13.2k for single images.
- 374 self-replies (mostly textless gallery dumps) have a median of 77 views. Volume dumps do not travel.

## 7. Dos and Don'ts (from the corpus)

- **Do** present one finished screen in a format (strips, desktop composite, collage). **Don't** post the raw 2880 export on white (plain posts: 13.8k against 17.9k).
- **Do** keep the app chrome at one accent and let the chart carry the hues (p169, p232). **Don't** colour the sidebar, the chips and the chart all at once (the founder's Settle reject agrees, L391).
- **Do** put the dark hero's light on the far side of the copy (13 dark F3s). **Don't** centre a dark hero over a glow behind the h1 (0 instances).
- **Do** use a ruled hairline table for a light feature section (13 of 32). **Don't** box every light cell with both a fill and a ring (0 instances).
- **Do** state real values in teaching posts (annotated spec, font card). **Don't** post a spec whose numbers the build does not use.

## 8. Corrections to the earlier studies

### 8.1 `kargul-heroes.md` (KH)

| KH | Said | Corpus says | Evidence |
|---|---|---|---|
| KH-04 h1 → sub | 24 (12-37.5) | **19.7** (9.2-34); use 16-24, default 20 | 13 new P folds |
| KH-04 CTA → next | 70 | **89** (24-341) | heroes.tsv |
| KH-08 CTA height | 44-47 (36-57) | 47 (37-52); Altrina is **54**, not 30; kargul.studio v3 about 59; RunInfra v2 37.3; Opsis 38 | case-altrina-00 and its video poster |
| KH-09 above-h1 gap | 34.5 (16-46) | **26** (16-31); slogans exist (Magic Ads) | xm-2066661539369619771-0 |
| KH-19 nav | 54-81 bars | 70 median bars **plus** floating pill navs 37-40 and 36-38 announcement bars; RunInfra nav CTA 32 | swipe-web-020, xm-2087768341389656531-0 |
| KH-29 / CREDITS swipe scale | all 1.1042 | **1.10-1.44**: DefendLab 1.104, Allo 1.150, Opero / Lemon / Gopher 1.20, Ostium 1.345, Supermetal 1.401, Tessa 1.441 | heroes.tsv header |
| measured.tsv rows | Opsis h1 top 185; Rork composer +22 / 175; Minto 96 / CTA 44 | Opsis **158.5**; Rork case composer **+38 / 185.5** (KH used live values); Minto's CTA is 0.75x the h1, so the row does not fit | spot checks |
| Families | F3 15, F2 10, F1 9 ... (55) | F3 21, F1 13, F2 13, F4 9, F7 5, F6 4, F10 4, F9 3, F5 3 (75 unique); Hunt "find" is **F5** | classification.tsv |
| KH-03 | 2 lines | 3-line h1s exist in two kinds: long statements at 40-53 (kargul.studio v3, Opsis) and 5-word ad headlines at about 73-77 (Magic Ads, Loopara) | heroes.tsv |

The swipe-only KH rows (Allo, Cashflow, TeamOS, Adam 3D, Valius, Minto, campaigns, Scraper, hgrid, specs) used the 1.1042 assumption. Allo reads about 4% big. The others are unchecked and should be treated as ±15%.

### 8.2 `kargul-micro-details.md` (KMD)

| KMD | Said | Corpus says | Evidence |
|---|---|---|---|
| KMD-16 default table row | 38-40 | **52-61** for his usual tables (52 sf-tensor-00, 55.5 p332, 60 clokora-06, all P); 38-40 only in dense CRM and ListKit | product-ui.tsv |
| KMD-01 secondary grey | `#5c5c5c` | `#757575` + `#a1a1a1` is the most common pair (16/34); `#5c5c5c` in 7 | product-ui.tsv |
| KMD-18 KPI weight | regular, never bold | 600 in several (p149, p089, p035, agent-arcade-01 at 44 px); one weight per product | product-ui.tsv |
| KMD-10 radius families | sharp, medium, soft | also **all-r0** (zeroleaks-07, p196, opsis-08) and **all-pill** (p035, p331) | product-ui.tsv |
| KMD-03 no resting blur | absolute | true on desktop; exceptions p158 step cards `0 1px 3px .09`, p016 nodes `0 .5px 2px .065`; phones (p094, p100, p271) add a 2-3 px drop | product-ui.tsv |
| Clokora WAITING chip | r0 | **about r4** | clokora-06, pixel by pixel |
| AM table / New button | r9.75 / 32 | **r12.1 / 28** | am-trades-07 |
| Plunio buttons | 36 / r9.75 | **38 / r12** | plunio-02 |
| Controls 28-36 | toolbars | holds for toolbars; form inputs are **42-51** | lemon-04, ecom-jobs-00, p157 |
| One accent | always | strictly one in only 9/34 light screens; charts carry 3-5 hues | census, product-ui.tsv |

## 9. Exceptions and judgement calls

- **The post framing conflict.** The founder's 2026-10-22 verdict (cadence-xpost r1) asks for equal left/top insets and bleed off the right and bottom. Marcel's product formats are symmetric with no bleed (KC-25); R+B bleed is 6 of 77 posts. The founder's verdict outranks the corpus. KC-25 is filed as evidence for the founder to decide, not applied (`canon/post-component.md` Open).
- **Wallpapers and device chrome.** The engine's XP-08 bans wallpapers and browser chrome behind a component. Marcel's best-performing format is exactly that, for a full product screen. [engine note] Keep XP-08 for component posts, and allow the desktop composite for product-screen posts (canon edited with that scope).
- **Bento numbers against the accepted Cadence v3.** Cadence v3 (gap 24, r24, `#f6f6f6` fill plus a 5% ring, title 18/600) was accepted by the founder ("nowww we talking"), and it was built from one Kargul services bento. The wider corpus says Kargul's own bentos are tighter and squarer, with one edge per cell. The founder's accept stands as the default. KC-16..18 are the alternative when replicating Kargul's grammar.
- **Hue count.** KC-13 lets charts carry 3-5 hues. The founder rejected a product with 5 accent hue families (L391, Settle), but that was colour in the chrome. [engine note] Keep the canon's ≤ 2 hue families for chrome; the chart allowance is flagged, not applied.
- **The swipe product set is one template.** About 150 light dashboards (project-164..332) share one grammar. Treat their medians as one design system weighted many times, not as 150 independent votes. That is why light accent and chart numbers lean on them.

## 10. Figures worth keeping

- `kargul-corpus/sheets/hero-01..02.jpg`: every unique hero, light and dark, by family.
- `sheets/X-post-format-01..03.jpg`: every format post (strips, wallpaper composites, specs, font cards).
- `sheets/product-app-screen-*.jpg`, `dashboard-*.jpg`, `mobile-*.jpg`: the product grammar at volume.
- `sheets/brand-or-logo-*.jpg`: the colour reservoir.
- Originals worth opening at full size:
  - `xm-2111472960452038719-0` (desktop window);
  - `xm-2096568932379373852-0..2` (strips on `#dddddd`);
  - `xm-2079249421049491477-0` (size cheat sheet);
  - `xm-2066174499049844750-0` (annotated spec);
  - `xm-2077769887586427319-0` (concentric radius explainer);
  - `xm-2108967996190244979-0..1` (Geist -6% / Inter -8% cards).

## 11. Open questions

- The X mirror serves 1004 of 3611 media items, back to 4 Jun 2026. Older posts are unreachable without login. No other public portfolio exists (`portfolios/CREDITS.md`).
- **Swipe and case dates are unknown.** The time trend rests on X only.
- **Font-card values versus his heroes.** The font cards say Inter -8% and Geist -6% at display size. His measured hero h1s sit at about -0.03em. The cards are likely for 80-100 px specimens, but it is not verified at hero size.
- **Video posters were not measured for motion.** His most viewed posts are screen-recording videos (CRM, kanban, workflow editor). Motion timing needs the videos, which were not downloaded.
- **De-dup precision.** One false merge was found and fixed. Similar-layout dashboards could still be merged, which would undercount unique dashboards slightly.
- **For the founder:** post framing (§9), chart hues in dashboards (KC-13), and whether Kargul's tighter bento numbers (KC-16..18) should replace Cadence v3's for future bentos.
