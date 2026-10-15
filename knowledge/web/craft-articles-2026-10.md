---
source: web:multi (learnui.design, anthonyhobday.com, refactoringui.com, mattstromawn.com, lea.verou.me, developer.chrome.com, web.dev, evilmartians.com, ishadeed.com, defensivecss.dev, nngroup.com, baymard.com, smashingmagazine.com, pimpmytype.com, cloudfour.com, nerdy.dev, developer.apple.com, blogs.vmware.com, atomicdesign.bradfrost.com, vercel.com, blog.logrocket.com, shud.in, marketingexamples.com)
chapter: Free craft articles and essays on interface and marketing-site design (34 pieces, studied 2026-10-15)
pages: n/a
topic_tags: [spacing, typography, tracking, optical-size, colour, oklch, palettes, contrast, buttons, button-states, shadows, depth, hero, false-floor, text-over-image, motion, density, polish, copy, landing-page]
status: studied
---

# Craft articles, October 2026: free essays turned into engine rules

Rule IDs are `CA-<group><nn>`: S spacing, T type, C colour, B buttons, D shadows/depth, L layout/hero, M motion, P details/polish, W copy.

**Scope and dedupe.** These pieces were picked because the engine had not studied them yet. Already studied elsewhere, so only cross-referenced here: Emil Kowalski's essays, Sonner and Vaul (`web-sources/craft-emil-kowalski.md`, `skills-better-ui-and-emil.md`); Rauno's Invisible Details and interfaces checklist (`web-sources/craft-rauno-freiberg.md`); Paco Coursey (`web-sources/craft-benji-lovin-paco.md`); Josh Comeau on shadows and gradients (`web-sources/comeau-css-depth-motion.md`); Linear's redesign posts, Stripe's accessible colour post and gradient (`web-sources/gaps-linear-stripe-vercel.md`); Evil Martians' study of 100 dev-tool landing pages (`web-sources/gaps-landing-and-writing.md`); NN/g heuristics, visual hierarchy and F-pattern (`web-sources/nngroup-core.md`); Vercel Web Interface Guidelines; Apple HIG.

**Provenance.** Every source below was fetched and read on 2026-10-15 unless it is marked **[S]**, which means the content came from a secondary summary. Everything here is paraphrased, with no long quotes. Raw HTML for the two Ström pages is in `corpus/web/craft-articles-2026-10/`, which is gitignored. My own synthesis is marked **[engine note]**. Section 5 records where these sources lose to `knowledge/founder/founder-taste.md`, which outranks everything here.

## 0. Sources read

| # | Article | Author | Date | URL | Rules |
|---|---|---|---|---|---|
| 1 | 7 Rules for Creating Gorgeous UI, Part 1 (2024 update) | Erik D. Kennedy | updated 2024-06-15 | https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html | S04, C01, D01 |
| 2 | 7 Rules for Creating Gorgeous UI, Part 2 (2024 update) | Erik D. Kennedy | updated 2024-06-15 | https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-2.html | T05, T09, T11, L04 |
| 3 | Color in UI Design: A (Practical) Framework | Erik D. Kennedy | updated 2024-06-15 | https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html | C06 |
| 4 | Visual design rules you can safely follow every time | Anthony Hobday | undated (online by 2023-02, per a Gigazine write-up) | https://anthonyhobday.com/sideprojects/saferules/ | S01-03, S08, T01-02, T08-09, T12, C03, C08, C11, B04, D02-04, D06, L05-06, P01, P04 |
| 5 | Building your color palette (book preview) | Refactoring UI (Wathan, Schoger) | undated | https://www.refactoringui.com/previews/building-your-color-palette | C02 |
| 6 | What UI density means and how to design for it | Matthew Ström-Awn | 2024-05-20 | https://mattstromawn.com/writing/ui-density/ | L10, M04, P04 |
| 7 | How to generate color palettes for design systems | Matthew Ström-Awn | 2024-04-20 | https://mattstromawn.com/writing/generating-color-palettes/ | C05, C10 |
| 8 | LCH colors in CSS: what, why, and how? | Lea Verou | 2020-04-04 | https://lea.verou.me/blog/2020/04/lch-colors-in-css-what-why-and-how/ | C04 |
| 9 | On compliance vs readability: Generating text colors with CSS | Lea Verou | 2024-05-17 (updated 2026-10) | https://lea.verou.me/blog/2024/contrast-color/ | C07 |
| 10 | High definition CSS color guide | Adam Argyle | updated 2023-02-02 | https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide | C04, C09 |
| 11 | OKLCH in CSS: why we moved from RGB and HSL | Andrey Sitnik, Travis Turner (Evil Martians) | 2025-09-17 | https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl | C03, C06, C07, C09, C10 |
| 12 | Building a button component | Adam Argyle | updated 2022-05-18 | https://web.dev/articles/building/a-button-component | B04, B06, D05, M01 |
| 13 | Using CSS to fix the irradiation illusion | Adam Argyle | 2025-11-29 | https://nerdy.dev/adjust-perceived-typepace-weight-for-dark-mode-without-layout-shift | T10, T11 |
| 14 | Spacing in CSS | Ahmad Shadeed | 2020-04-19 | https://ishadeed.com/article/spacing-in-css/ | S06, S07 |
| 15 | Handling Text Over Images in CSS | Ahmad Shadeed | 2021-03-23 | https://ishadeed.com/article/handling-text-over-image-css/ | L04 |
| 16 | Defensive CSS (index of tips) | Ahmad Shadeed | undated (2022-24) | https://defensivecss.dev/ | P02 |
| 17 | Button States: Communicate Interaction | Kelley Gordon (NN/g) | 2025-04-25 | https://www.nngroup.com/articles/button-states-communicate-interaction/ | B03, B05, M05 |
| 18 | Flat UI Elements Attract Less Attention and Cause Uncertainty | Kate Moran (NN/g) | 2017-09-03 | https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/ | B02 |
| 19 | OK-Cancel or Cancel-OK? | Jakob Nielsen (NN/g) | 2008-05-26 | https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/ | B07, W06 |
| 20 | Homepage Design: 5 Fundamental Principles | Huei-Hsin Wang (NN/g) | 2024-03-15 | https://www.nngroup.com/articles/homepage-design-principles/ | L01, L02, L03, M07, W05 |
| 21 | The Illusion of Completeness | Kim Flaherty (NN/g) | 2016-01-17 | https://www.nngroup.com/articles/illusion-of-completeness/ | L02, S08 |
| 22 | Button Design: Best Practices | Christian Holst (Baymard) | 2021-12-15 | https://baymard.com/learn/button-design | B01, B03, B08, B09 |
| 23 | Typographic Hierarchies | Alma Hoffmann (Smashing) | 2022-10-26 | https://www.smashingmagazine.com/2022/10/typographic-hierarchies/ | T04 |
| 24 | Practical Design Tips And Guidelines For Beginner Designers | Laurent Baumann (Smashing) | 2023-05-22 | https://www.smashingmagazine.com/2023/05/practical-design-tips-guidelines-beginner-designers/ | S05, T06-08, T12, B04, L06, P01 |
| 25 | Typographic Hierarchy in Print, Web & App Design | Oliver Schöndorfer | 2023-01-31 (updated 2023-02-24) | https://pimpmytype.com/?p=11275 | S02, T04, B03 |
| 26 | Responsive Letter Spacing | Tyler Sticka (Cloud Four) | 2025-11-20 | https://cloudfour.com/thinks/responsive-letter-spacing/ | T01 |
| 27 | The details of UI typography (WWDC20 session 10175) | Loïc Sander and Jiang (Apple) | 2020-06 | https://developer.apple.com/videos/play/wwdc2020/10175/ | T01-03 |
| 28 | Intro to the 8-Point Grid System (republished) | Elliot Dahl (orig. Built to Adapt) | 2016-12-14 | https://blogs.vmware.com/tanzu/intro-to-the-8-point-grid-system-2/ | S01 |
| 29 | Atomic Design, chapter 2 | Brad Frost | 2016 | https://atomicdesign.bradfrost.com/chapter-2/ | L08, S06 |
| 30 | Design Engineering at Vercel | Hitchcock, Heffernan, Phamous, Freiberg, Pessoa | 2024-03-29 | https://vercel.com/blog/design-engineering-at-vercel | P03, M08 |
| 31 | Linear design: the SaaS design trend that's boring and bettering UI | Daniel Schwarz (LogRocket) | 2025-06-07 (2025 update) | https://blog.logrocket.com/ux-design/linear-design/ | L09, C03 |
| 32 | On UI Animations, plus Good Design and On Dynamic Island | Shu Ding | undated (posts list On UI Animations 2020-05-27, Good Design 2022-11-05, Dynamic Island 2025-07-16) | https://shud.in/thoughts/on-ui-animations ; /thoughts/good-design ; /thoughts/on-dynamic-island | M01-03, M06, M08, P05 |
| 33 | My step-by-step guide to landing pages that convert | Harry Dry (Marketing Examples) | undated | https://marketingexamples.com/landing-page/guide | L07, W01, W04, W05 |
| 34 | 17 tips for great copywriting | Harry Dry (Marketing Examples) | undated | https://marketingexamples.com/copywriting/tips | W03 |

**Tried and not obtained** (see section 7): Refactoring UI, "7 Practical Tips for Cheating at Design" (Medium 403; only secondary summaries exist). Nathan Curtis, "Space in Design Systems" (Medium 403). "The rise of Linear style design" (Medium, design-bootcamp). Google Fonts Knowledge pages on optical size (rendered client-side, so no body text). Baymard's product-page CTA guidelines (Premium). Ahmad Shadeed's hero-section article (404). Framer and Webflow hero posts: search turned up only SEO listicles, so they were skipped as low quality. Lenny's landing-page posts were not attempted because they sit behind a paywall.

## 1. Core ideas

1. **Rules you can safely follow exist, and most of them are numeric.** Hobday's list (28 rules) is the closest thing to a checkable taste floor: off-black and off-white, neutrals tinted under 5% saturation, shadow blur = 2x the Y offset, outer padding >= inner padding, nested radius = outer - gap, button padding at 2:1. They are defaults, not style. (Hobday)
2. **Hierarchy comes from contrast plus space, and you set the base first.** Fix the body or functional style, then add contrast by weight before size, then group with spacing (closer for related things, further for unrelated ones). Keep 3 size levels in a composition and at most 5 heading levels. (Schöndorfer, Hoffmann, Baumann)
3. **Type is size-dependent.** Tracking and leading tighten as size grows, and optical size switches the letterforms (Apple's SF goes from Text to Display between 17 and 28 pt). A single letter-spacing value for every size is a defect. (WWDC20, Sticka, Hobday)
4. **Colour has to be built in a perceptual space.** HSL lightness lies, since yellow and blue at L 50% look nothing alike. OKLCH, OKHsl and LCH make lightness steps, hover deltas and contrast predictable, and Ström's formula turns a contrast ratio into a scale step. (Verou, Argyle, Evil Martians, Ström)
5. **Fix the palette up front: 8-10 greys and about 9 shades per hue, never runtime lighten() or darken().** The base 500 is chosen as a button background, 900 for text and 100 for tinted surfaces. (Refactoring UI)
6. **Clickability needs signifiers.** In NN/g's eyetracking study, weak (flat or ghost) signifiers cost 22% more time and 25% more fixations. The primary action gets styling no other control uses. (NN/g 2017, Baymard)
7. **States are part of the button.** A complete button has rest, hover, focus-visible, pressed, loading and disabled. Feedback lands within 100-150 ms, and focus is an outline, never colour alone. (NN/g 2025, Baymard, Argyle)
8. **Depth is one consistent physical model.** Light comes from above, recessed things sit inset and raised things outset. Use one depth technique per interface. Closer elements get lighter, with softer and lower-opacity shadows. (Kennedy, Hobday)
9. **A hero must say what the product is and avoid false floors.** Logo top-left, a plain tagline, a real product visual, the next content peeking above the fold, and no generic welcome. (NN/g 2016 and 2024, Harry Dry)
10. **Density means value per unit of time and space, not packing more in.** Group by Gestalt instead of padding, keep responses under 100 ms, and match the progress UI to how long the user waits. (Ström)
11. **Motion should be quiet by default.** About 200 ms ease for style changes, tooltips and menus open instantly and fade out on close, layout animation shows structure, and anything that costs frames is cut. (Shu Ding, Vercel)
12. **Copy is visual design.** Lead with value, name the product and the mechanism, match proof to the promise, and cut landing-page words and adjectives. (Harry Dry)

## 2. Rules

### Spacing

- **CA-S01 RULE** Size and space everything on a 4/8 scale: heights, widths, margins, paddings and gaps are multiples of 8, with 4 for fine steps (icon gaps, tight controls). No odd values.
  **Why** Most screen sizes divide by 8, and odd values land on half pixels at 1.5x scaling. A small set of steps also lets developers stay consistent without measuring. **Applies to** all. **Check** computed `margin|padding|gap|height` on visible elements: value % 4 == 0 (excluding 1px hairlines and borders). Flag odd px values. **Source** Dahl/VMware 2016 (#28); Hobday rule 11 (#4).
- **CA-S02 RULE** Inside < between: a container's outer padding is >= the gap between its children, and related items sit closer than unrelated groups. Schöndorfer's worked example is 25px before a subheading and 10px after it and between list rows, replacing a uniform 15px.
  **Why** Proximity is the cheapest grouping signal, and uniform spacing erases the grouping. **Applies to** all. **Check** for each card or section, `padding >= gap(children)`; for heading + list, `margin-before(h) > margin-after(h)` by >= 1.5x. **Source** Hobday rule 19 (#4); Schöndorfer (#25); Baumann (#24). Same as `borders-and-nesting.md` BN rules.
- **CA-S03 RULE** Measure spacing between the high-contrast points (cap height or x-height of text, the visible edge of a shape), not between bounding boxes. Trim text boxes (`text-box: trim-both cap alphabetic` where supported) or compensate by hand.
  **Why** Line-box half-leading adds invisible space, so box-equal gaps look unequal. **Applies to** all. **Check** visual; on an h1/p pair, compare the rendered glyph gap with the intended token. **Source** Hobday rule 14 (#4).
- **CA-S04 RULE** On marketing scaffolding, start from too much whitespace and remove it. Nav and menu items carry vertical padding about equal to their text height on each side (12px text: 12px above and below). A list heading sits further above its rule than the cap height (15px in the example), with about 25px between lists.
  **Why** Cramped layouts are the commonest amateur tell; air reads as confidence. **Applies to** landing page (not product dashboards; see section 5). **Check** menu-item `padding-block >= font-size`. **Source** Kennedy Part 1 (#1).
- **CA-S05 RULE** An image inside a box gets a margin of at least half its shortest side (wide image: half its height; tall image: half its width).
  **Why** Less than that, and the image crowds its frame and reads as cropped by accident. **Applies to** cards, bento cells, logo walls. **Check** for `img` in a padded parent, `min(padding) >= 0.5 x min(img.w, img.h)`, unless the image intentionally bleeds. **Source** Baumann (#24).
- **CA-S06 RULE** Reusable components carry no outer margin. The parent (a stack, grid or flex with `gap`) owns spacing between siblings. If margins are needed, use one direction only (`margin-block-end`) and logical properties.
  **Why** Outer margins leak, collapse and fight in new contexts, so the layout can no longer be predicted from the component. **Applies to** all code. **Check** grep component root classes for `m-`, `mt-`, `mb-`, `margin`; flag them. **Source** Shadeed, Spacing in CSS (#14); Frost, Atomic Design ch.2 (#29).
- **CA-S07 RULE** Default grid and flex gap is 16px (24px rows / 16px columns when they differ). A fluid gap that should scale with the viewport is capped (`min(2vmax, 32px)` pattern). Header side padding is never below 16px.
  **Why** Content touching the viewport edge or neighbouring cards is the most visible spacing failure on mobile. **Applies to** all. **Check** mobile 375px: `header` padding-inline >= 16; grid gaps from the token set. **Source** Shadeed (#14).
- **CA-S08 RULE** Never put two hard visual divides next to each other (a border against a background change, a rule against a section edge). Don't end a section with a full-width rule plus a large empty gap that looks like the page is over.
  **Why** Double edges read as an error, and strong breaks create false floors that stop scrolling. **Applies to** landing page, cards. **Check** visual; DOM: a `border-*` on an element whose adjacent sibling has a different `background-color`. **Source** Hobday rule 25 (#4); Flaherty (#21).

### Type

- **CA-T01 RULE** Tracking depends on size: 0 at or below body size, tightening as the size grows, to about -0.05em by 32px and held there. Small all-caps labels get positive tracking. Default formula when no house system says otherwise: `letter-spacing: clamp(-0.05em, calc((1em - 1rem) / -10), 0em)`.
  **Why** Large type has too much built-in sidebearing and small type too little; one value for every size is wrong at both ends. Apple ships per-size tracking tables for the same reason. **Applies to** all. **Check** for each text node: font-size <= 16 -> letter-spacing >= 0; font-size >= 32 -> letter-spacing <= -0.02em; flag a positive value on anything >= 32px. **Source** Sticka (#26); WWDC20 (#27); Hobday rule 6 (#4).
- **CA-T02 RULE** Leading falls as size rises. Display text gets tight leading (about 1.0-1.15) and body text loose (1.4-1.6). If you need a tight or loose variant of a style, change the leading by about 2pt (Apple's tight/loose), not by a new style.
  **Why** Large lines are long in absolute terms, so they need less relative leading; small text needs more to keep the eye on the line. **Applies to** all. **Check** computed line-height/font-size: h1 <= 1.2; body >= 1.4. **Source** Hobday rule 6 (#4); WWDC20 (#27). Engine numbers in `typography.md`.
- **CA-T03 RULE** Use the optical size. With a variable font that has `opsz`, keep `font-optical-sizing: auto` so the axis follows the size. With SF, the Text-to-Display transition runs from 17 to 28 pt. If a tool's opsz slider doesn't match the point size, set it by hand to the nearest value.
  **Why** Text cuts have wider spacing and larger vertical proportions for legibility; display cuts are tighter and finer. Using the wrong one makes headlines look clumsy and small text look cramped. **Applies to** all. **Check** the h1's font has an opsz axis (`document.fonts` / the font file), and `font-optical-sizing` is not `none`. **Source** WWDC20 (#27). Engine: the founder's Inter `opsz.css` rule.
- **CA-T04 RULE** Set the base style first (app functional text about 14px/500, marketing body >= 16px/400). Build hierarchy with weight before size, then space. Keep about 3 size levels per text block (body, subhead or accent, title) and at most 5 heading levels in a document.
  **Why** Every extra level dilutes the others, and weight changes emphasis without disturbing the flow. **Applies to** all. **Check** count distinct `font-size` values inside one card or section <= 4 (including the eyebrow); headings h1-h6 used <= 5 levels. **Source** Schöndorfer (#25); Hoffmann (#23).
- **CA-T05 RULE** Balance up-pop and down-pop. A page title is all up-pop. A big number gets size but a lighter weight or a lower-contrast colour. A small label gets uppercase, weight, tracking and margin so it is found without dominating.
  **Why** Stacking every emphasis tool on one element makes it shout; offsetting one with another gives hierarchy with calm. **Applies to** all, especially KPI cards and stat rows. **Check** visual; for a stat >= 32px, weight <= 600 or colour lighter than the primary text. **Source** Kennedy Part 2 (#2).
- **CA-T06 RULE** When pairing weights from one family, skip a step: 400 with 600, not 400 with 500.
  **Why** Adjacent weights look like a rendering mistake rather than a deliberate contrast. **Applies to** all (exception: a display line where size already does the work; see section 5). **Check** in a single line or label pair of the same size, the weight delta is >= 200. **Source** Baumann (#24).
- **CA-T07 RULE** Heading levels step by a constant ratio, each level about 2/3 to 3/4 of the one above (ratio 1.33-1.5).
  **Why** A constant ratio reads as a system, while random sizes read as assembled. **Applies to** content pages, docs, blog. **Check** consecutive heading sizes: ratio within 1.2-1.6 and consistent within ±0.1. **Source** Baumann (#24).
- **CA-T08 RULE** Body text >= 16px. Measure is about 70 characters, or 8-12 words per line. Sidebars, captions and narrow columns run 5-6 words.
  **Why** Below these, readers lose their place; above them, line returns get hard. **Applies to** landing page, docs. **Check** `p` font-size >= 16; chars per line 45-90 (see `typography.md`). **Source** Hobday rules 20-21 (#4); Baumann (#24).
- **CA-T09 RULE** No more than two typeface families per site (a mono for meta doesn't count). Professional UI defaults to clean, neutral faces; distinctive faces are for brands with a strong personality. Use the thinnest weights rarely.
  **Why** More families dilute the voice, and hairline weights fail at UI sizes. **Applies to** all. **Check** distinct computed `font-family` stacks (minus mono) <= 2. **Source** Hobday rule 23 (#4); Kennedy Part 2 (#2).
- **CA-T10 RULE** In dark mode, reduce perceived weight to cancel the irradiation illusion. With a `GRAD` axis, use `--GRAD: -50` in dark (more contrast: +150, less: -150). Without GRAD, drop to a lighter weight only if it doesn't change width, or accept a hand-tuned weight per theme.
  **Why** Light text on dark looks bolder than the same weight on light. GRAD changes stroke weight without changing advance widths, so nothing reflows. **Applies to** all dark surfaces. **Check** dark theme: if the font has GRAD, `font-variation-settings` includes GRAD < 0 on body and headlines. **Source** Argyle, irradiation (#13).
- **CA-T11 RULE** A state change (hover, selected, active tab) never changes font size or weight. It changes colour, background, underline, shadow, or GRAD.
  **Why** Weight and size changes shift layout and make neighbours jump. **Applies to** all. **Check** compare computed `font-weight`, `font-size`, `width` at rest and in `:hover` / `[aria-selected]`: they must be equal. **Source** Kennedy Part 2 (#2); Argyle (#13).
- **CA-T12 RULE** Icons beside text match its stroke weight and sit one contrast step lower than the label.
  **Why** A heavier or darker icon steals emphasis from the words it labels. **Applies to** nav, buttons, menus, sidebars. **Check** icon `stroke-width` at 16px is 1.5-2 for 400-500 text; icon colour is lighter than the label colour. **Source** Baumann (#24); Hobday rule 28 (#4).

### Colour

- **CA-C01 RULE** Lay out in greyscale first. Add colour last and only where it carries meaning: one accent, or greys plus shades of one hue.
  **Why** Hierarchy that only works in colour falls apart for colour-blind users and in dim light, and colour added early hides layout problems. **Applies to** all. **Check** render with `filter: grayscale(1)`: the primary CTA and h1 must still dominate. **Source** Kennedy Part 1 (#1).
- **CA-C02 RULE** Fix the palette before designing: 8-10 greys (darkest text grey to an off-white, no pure black), and 5-10 shades (9 ideal) per primary or accent hue. Choose 500 as the colour that works as a button background, 900 for text and 100 for tinted backgrounds (try them on an alert). Fill in 700 and 300, then 800/600/400/200. Never generate shades at runtime with lighten() or darken(), and add new shades rarely.
  **Why** A finite palette keeps screens consistent, and runtime maths produces muddy, off-hue shades. **Applies to** all systems. **Check** count of unique colours in computed styles <= palette size; no `color-mix`/Sass `darken` outside token files. **Source** Refactoring UI (#5).
- **CA-C03 RULE** Neutrals are tinted, never pure: off-black and off-white, with greys tinted by the palette hue at HSB saturation < 5% (OKLCH chroma about 0.005-0.01). Pick warm or cool for the whole set, never both. A dark canvas is the brand hue at about 1-10% lightness, never #000.
  **Why** Pure black and white vibrate and look unfinished, while a shared tint makes every surface feel like one material. **Applies to** all. **Check** no computed `#000`/`#fff` on large surfaces or body text (allow `#fff` for elevated cards on a tinted canvas); neutral chroma 0.003-0.02 with all neutral hues on one side of the wheel. **Source** Hobday rules 1, 2, 10 (#4); Evil Martians (#11); Schwarz/LogRocket (#31).
- **CA-C04 RULE** Build colour scales and hover deltas in a perceptual space (OKLCH/OKHsl/LCH), never HSL. Equal L means equal perceived lightness; maximum chroma depends on hue (LCH at L50: cyan about 35, magenta about 77, purple about 108).
  **Why** HSL L=50% yellow and blue differ hugely in brightness, so HSL scales give uneven steps and broken contrast. **Applies to** all. **Check** token files: no `hsl(` in scale definitions; scale lightness steps are monotonic and evenly spaced in OKLCH L. **Source** Verou 2020 (#8); Argyle HD colour (#10).
- **CA-C05 RULE** When a scale has to guarantee contrast, derive it from contrast. Use Ström's target `r(x) = e^(3.04x)` on a normalised step x in 0-1, so steps 0.5 apart (500 apart on a 0-1000 scale) reach 4.5:1. Drift hue by `+5 x (1 - n)` degrees to counter the Bezold-Brücke shift. Shape chroma as a parabola peaking mid-scale (`S = -4n² + 4n`), with neutrals capped near 20% saturation. Flip the lightness direction on dark backgrounds (background Y < 0.18).
  **Why** Then any two tokens 500 apart are an accessible text/background pair, and the rule can be checked by maths instead of by eye. **Applies to** design systems, product UI. **Check** compute contrast for every (n, n+500) pair >= 4.5. **Source** Ström-Awn, palettes (#7) (builds on Stripe's accessible colour post, already in `gaps-linear-stripe-vercel.md`).
- **CA-C06 RULE** Variants of one colour move mostly along lightness. In OKLCH, hover is L ±0.1 with C and H fixed, done with relative colour syntax so one rule covers every variant. In HSB (Kennedy), a darker variant is lower brightness plus higher saturation, a lighter one higher brightness plus lower saturation. If hue moves at all, it drifts toward the nearest of red/green/blue when darkening and yellow/cyan/magenta when lightening. Never darken by laying black over a colour.
  **Why** A black overlay only lowers brightness and makes the colour dirty, while perceptual lightness moves keep it clean. **Applies to** all interactive states. **Check** hover token: ΔL in 0.06-0.12, ΔH <= 5°. **Source** Evil Martians (#11); Kennedy colour (#3). See section 5 for the saturation disagreement.
- **CA-C07 RULE** Choose black or white text on a coloured fill by OKLCH lightness. White is guaranteed to pass WCAG 2.1 when the fill's L <= 62.3% (any hue). For readability (APCA), switch at about 70%. Alternatively, switch at XYZ Y = 0.36. A light surface at L >= 0.87 takes black text.
  **Why** WCAG 2.1 produces false negatives for white text; these thresholds let a badge or button keep white text when you deepen its fill. **Applies to** badges, buttons, chips, tags. **Check** for every fill with white text, OKLCH L <= 0.623 (or APCA Lc >= 60 for UI text). **Source** Verou 2024 (#9); Evil Martians (#11). Matches the founder's rule that a "New" badge keeps white text and deepens its fill.
- **CA-C08 RULE** Every palette colour gets a distinct brightness, so the palette still separates in greyscale.
  **Why** Two hues at the same lightness merge for colour-blind users and in charts. **Applies to** data viz, status colours, categorical tags. **Check** pairwise ΔL (OKLCH) between categorical colours >= 0.08. **Source** Hobday rule 9 (#4).
- **CA-C09 RULE** Use wide gamut as progressive enhancement: an sRGB value first, then `@media (color-gamut: p3)` with the same L and H and higher C (worked examples: C 0.155 -> 0.176, 0.19 -> 0.26). Gradients name their interpolation space (`in oklch` or `in display-p3`) so midpoints don't grey out.
  **Why** P3 shows about 50% more colours, and browsers clip out-of-gamut values (shifting hue). sRGB interpolation desaturates the middle of a gradient. **Applies to** brand accents, gradients. **Check** grep `linear-gradient(` without `in ` on brand gradients; P3 colours sit inside a gamut media query (stylelint-gamut). **Source** Evil Martians (#11); Argyle HD colour (#10).
- **CA-C10 RULE** Every colour is a custom property, and components use semantic aliases (button-bg -> action -> blue-500), never raw values. Themes swap variables, not component media queries.
  **Why** A single formula or alias change then re-themes the product, and drift becomes greppable. **Applies to** all code. **Check** grep component files for hex/rgb/hsl/oklch literals: zero outside token files. **Source** Ström-Awn (#7); Evil Martians (#11).
- **CA-C11 RULE** A container border is lighter than both the container and the background on dark UIs, and darker than both on light UIs. A container differs in brightness from its background by at most about 12% on dark and 7% on light.
  **Why** Larger surface jumps break a surface into islands; a border on the wrong side of both tones reads as a gap. **Applies to** cards, panels, product frames. **Check** compute the relative-luminance (or HSB B) delta between card and canvas: <= 0.12 dark, <= 0.07 light. **Source** Hobday rules 7, 18 (#4). Consistent with `borders-and-nesting.md` (1px alpha rings).

### Buttons

- **CA-B01 RULE** The primary action has a style no other control uses, a consistent position, and a descriptive label. Use one primary per view. When several buttons share a view, separate the primary visually and spatially.
  **Why** Baymard found 48% of ecommerce sites neglect one or more of: unique styling, prominence, consistent placement, descriptive microcopy. **Applies to** all. **Check** count of elements styled with the primary token in one viewport = 1; the label is not "Submit", "OK" or "Learn more". **Source** Holst/Baymard (#22).
- **CA-B02 RULE** Interactive things must look interactive. A ghost, flat or text-only button is only acceptable beside a strong primary, never as the only route to a key action. Links don't share body-text styling, and non-interactive headings don't look clickable.
  **Why** In NN/g's 71-person eyetracking study, weak signifiers cost 22% more task time and 25% more fixations, and some users never found the target. **Applies to** all. **Check** every `a` in prose differs from body text by colour and underline; a page's key CTA has a filled background. **Source** Moran/NN/g 2017 (#18).
- **CA-B03 RULE** Design the full state set: rest, hover, focus-visible, pressed, loading and disabled. Hover shifts the fill one step (darker on a light theme). Pressed feedback lands within 100-150 ms. Focus is an outline (not colour alone) and shows within 100-150 ms. Loading keeps the enabled look and adds a spinner left of the label (optionally morphing to a check). Disabled uses `aria-disabled` (still focusable), is muted but legible, and explains why in a tooltip. A primary label needs >= 4.5:1 (3:1 is acceptable only for large text).
  **Why** A missing state reads as broken or ignored input, and late feedback causes double submits. **Applies to** all. **Check** a state matrix for each button variant; computed `outline` on `:focus-visible` != none; label contrast >= 4.5. **Source** Gordon/NN/g 2025 (#17); Holst/Baymard (#22); Schöndorfer (#25).
- **CA-B04 RULE** Horizontal padding is about 2x vertical (Argyle's recipe: 1.75ch inline / 0.75ch block). The label is optically centred on the x-height, with equal visible space above, below and to the sides of the glyphs, not of the line box.
  **Why** A 2:1 ratio makes a button read as a button rather than a tag. Line-box centring sits text visibly high or low in many fonts. **Applies to** all buttons and chips. **Check** padding-inline / padding-block between 1.6 and 2.6 for text buttons; render and measure glyph-top and glyph-bottom gaps within 1px. **Source** Hobday rule 22 (#4); Argyle button (#12); Baumann (#24).
- **CA-B05 RULE** Content revealed on hover (menus, preview cards, tooltips) waits on hover intent of about 90-200 ms. A button's own hover colour responds immediately. Never rely on hover alone, because touch has none.
  **Why** Intent delay stops accidental pop-ups while the pointer passes through; a delayed colour change feels laggy. **Applies to** desktop nav, toolbars. **Check** menu open delay 90-200 ms; button `transition-delay` 0. **Source** Gordon/NN/g 2025 (#17) (150-200 ms); Kaching uses 90 ms on menus (`larpo-shipped/kaching-DESIGN-SYSTEM.md`) [engine note].
- **CA-B06 RULE** Button craft details: native `<button>` with an explicit `type`; transition only `box-shadow`, `outline-offset`, background and transform (Argyle uses 145 ms ease); a focus ring with about 5px offset that contracts on press; `touch-action: manipulation`; `user-select: none`; `-webkit-tap-highlight-color: transparent`; decorative icons `aria-hidden`; icons `flex-shrink: 0`.
  **Why** These remove the tap flash, accidental text selection, double-tap delay and icon squash that make web buttons feel non-native. **Applies to** all. **Check** computed styles on `button`: tap highlight transparent, user-select none, `type` attribute present. **Source** Argyle, Building a button (#12).
- **CA-B07 RULE** Button order follows the platform the product lives on, and one product keeps one order. A risky or destructive action is never the Enter-key default, while the most common safe action is. Ordered pairs follow reading logic (Previous left, Next right).
  **Why** Consistency matters more than any marginal gain from a particular order; a destructive default turns a keystroke into data loss. **Applies to** dialogs, forms, wizards. **Check** dialogs: one order across the product; `autofocus` or default never on a destructive button. **Source** Nielsen 2008 (#19).
- **CA-B08 RULE** Put reassurance microcopy next to commitment buttons: whether the click is final, whether a card is needed, what happens next. The label states the outcome ("Continue to review", "Start free trial"), not a vague verb.
  **Why** Uncertainty at the moment of commitment drives abandonment. **Applies to** checkout, sign-up, pricing CTAs. **Check** within 24px of a primary CTA on a payment or sign-up step, either a reassurance line or a descriptive label exists. **Source** Holst/Baymard guideline 586 (#22); Harry Dry (#33).
- **CA-B09 RULE** Mobile tap targets are >= 7 x 7 mm physically. Engine floor: 40-44 CSS px controls, with small links getting an invisible hit area rather than a bigger visible size.
  **Why** Smaller targets cause mistaps and checkout abandonment. **Applies to** mobile. **Check** `getBoundingClientRect` of interactive elements >= 40px on 375px width. **Source** Holst/Baymard (#22); Kaching spec.

### Shadows and depth

- **CA-D01 RULE** Light comes from above. Raised elements (buttons, cards, popovers, slider knobs) get a slightly lighter top edge and a darker underside or soft drop. Recessed elements (inputs, slider tracks, unchecked boxes, pressed buttons) look inset. A pressed button sits flush and slightly darker.
  **Why** One consistent light model lets users read what is pressable and what is a well without thinking. **Applies to** all. **Check** inputs have no outer drop shadow (inset or flat only); buttons in `:active` lose their lift. **Source** Kennedy Part 1 (#1).
- **CA-D02 RULE** Shadow blur = 2x the Y offset. Closer (higher) elements get a larger offset but lower opacity, and their surfaces get lighter as they come closer.
  **Why** That is how real diffuse light behaves; a dense shadow far from its object reads as cheap. **Applies to** all elevated surfaces. **Check** parse `box-shadow`: blur/y in 1.5-3; opacity decreases as y increases across tiers. **Source** Hobday rules 15-16 (#4). Compare `system/effects/shadows.css` tiers and Comeau's layered shadows.
- **CA-D03 RULE** Pick one depth technique per interface (shadow, border, or surface tint) and use it everywhere. Structural lines and shadows stay low contrast; high contrast is reserved for things the user must notice.
  **Why** Mixed depth languages make a product look assembled from several kits. **Applies to** all. **Check** the floating-surface inventory shares one shadow token family; `check.mjs` consistency probes. **Source** Hobday rules 3, 27 (#4). Same as the founder's "one depth and shape language".
- **CA-D04 RULE** (Hobday, strong form) Don't use visible drop shadows on dark interfaces; get depth from lighter surfaces and light borders. **Engine reading:** the founder allows soft drops on dark but forbids glows and ring-plus-inner-highlight stacks (section 5).
  **Why** Dark shadows on dark backgrounds are invisible or muddy; elevation on dark is lightness. **Applies to** dark UI. **Check** dark elevated surfaces are lighter than the canvas (ΔL > 0); drop-shadow alpha is not the only elevation cue. **Source** Hobday rule 26 (#4).
- **CA-D05 RULE** A layered button-depth recipe, as a starting point: a 1px bevel in the border colour, `0 1px 2px -1px` (tight contact), then `0 3px 5px -2px` plus `0 7px 14px -5px` (ambient), with label text-shadow `0 1px 0` in the border colour. Shadow strength is about 1% base on light and 25% on dark.
  **Why** Several short, negatively spread layers give crisp contact and soft ambience without a blurry halo. **Applies to** buttons, chips. **Check** the button shadow has >= 2 layers with a negative spread. **Source** Argyle, Building a button (#12).
- **CA-D06 RULE** Complex background, simple foreground, and the reverse. Never put a complex foreground on a complex background.
  **Why** Two busy layers cancel each other's legibility. **Applies to** heroes with textures and shaders, bento. **Check** visual; where a shader or dither field runs, the copy block above it is a single colour and a single weight. **Source** Hobday rule 17 (#4).

### Layout and hero

- **CA-L01 RULE** The first screen says who you are and what you do: the logo top-left (not centred), a short plain-language tagline stating what the product does and how it differs, and an informative visual. Never a generic welcome message.
  **Why** In NN/g studies, visitors decide fast; generic hero copy pushes the company brief below the fold. **Applies to** landing page. **Check** the nav logo's x is within the left content gutter; the h1/subtitle contains a product noun, not just an abstract benefit. **Source** Wang/NN/g 2024 (#20).
- **CA-L02 RULE** No false floors. Some of the next content (the product frame, the next section's top) shows above the fold at 1440x900 and at 375x812. Avoid full-viewport heroes that look complete, and avoid strong breaks plus a big gap at section ends.
  **Why** In NN/g's study, 6 of 8 users did not realise they could scroll past a page that looked complete. **Applies to** landing page. **Check** at 1440x900 an element of the product frame or section 2 intersects y in [700, 900]. **Source** Flaherty/NN/g 2016 (#21); Wang/NN/g 2024 (#20).
- **CA-L03 RULE** The hero visual is the real product, or the product in use, not an abstract illustration or decorative stock.
  **Why** A real product is proof; abstraction asks the visitor to trust and imagine. **Applies to** landing page. **Check** visual; the hero contains a product frame or real screenshot. **Source** Harry Dry (#33); Wang/NN/g (#20). Same as the founder's "the hero must say what the product is in one glance".
- **CA-L04 RULE** Text over imagery: only when the image is dark and low-edge and the text is white. Otherwise use one of: a full overlay (Upstart uses 35% black); a floor fade from 0 to about 20% black at the bottom; an elliptical scrim behind the text; an eased multi-stop gradient (0 -> 0.8 alpha) taller than the text block; or blur under the text. Add `text-shadow: 0 2px 3px rgba(0,0,0,.3)`. Test by putting pure white behind the overlay: the text must still reach >= 4.5:1.
  **Why** Photos change at every breakpoint, so the overlay must guarantee contrast for any crop. **Applies to** heroes, cards with photos. **Check** sample the darkest and lightest pixel under the text bounding box at 3 widths; contrast >= 4.5:1. **Source** Kennedy Part 2 (#2); Shadeed 2021 (#15).
- **CA-L05 RULE** Every element aligns with at least one other, for a reason. Horizontal layouts sit on a 12-column grid. Visual weight descends inward, with the heaviest items at the outer edges of a group.
  **Why** Alignment is what makes a layout look designed rather than placed. **Applies to** all. **Check** collect element left/right edges in the fold; every edge is shared by >= 2 elements (±1px). **Source** Hobday rules 8, 12, 13 (#4).
- **CA-L06 RULE** Nested radius = outer radius - the gap between the edges. Never reuse the outer radius inside.
  **Why** Equal radii make the gap pinch at the corners. **Applies to** all. **Check** child radius == parent radius - inset (±1px), as rendered. **Source** Hobday rule 24 (#4); Baumann (#24). Already BN-level in `borders-and-nesting.md`; listed here as corroboration.
- **CA-L07 RULE** Landing page skeleton (Harry Dry's 10 steps). Above the fold: title (value), subtitle (product + how), visual (real product), proof (credibility), CTA (value-led, handling the main hesitation). Below: features that make the title concrete plus objections in customers' words, proof that motivates (outcomes, numbers), FAQ, a second CTA restating why, and a founder's note.
  **Why** Each block answers the next question a sceptical visitor has; visitors decide in about 5 seconds. **Applies to** landing page (full pages only; the founder's scope rule says build only what was asked). **Check** section inventory against the 10 steps; missing proof is flagged, never faked. **Source** Harry Dry guide (#33).
- **CA-L08 RULE** Design templates for content variance: short and long headlines, 0 and many items, missing images, long names. Test the page stage with real content and fix problems at the level they come from (atom, molecule, organism).
  **Why** Happy-path samples hide every layout failure. **Applies to** all. **Check** run the stress fixtures (2x copy length, empty states) and `check.mjs` overflow. **Source** Frost, Atomic Design ch.2 (#29); Defensive CSS (#16). Same as the founder's "design for content volume".
- **CA-L09 RULE** "Linear style" is sequential, one-dimensional layout, few CTAs, near-monochrome palettes with very few accents, and a dark canvas tinted by the brand hue. Linear itself removed even more colour in 2025. Use it as a base and add a real brand identity, or it reads as a clone.
  **Why** The style turned into a commodity, and differentiation is the edge. **Applies to** dark SaaS heroes. **Check** the ledger diversity gate; the accent covers <= 3% of the fold (see `dark-mode-premium.md`). **Source** Schwarz/LogRocket 2025 (#31).
- **CA-L10 RULE** Judge density as value per unit of time and space. On product surfaces, group by proximity and similarity instead of padding, keep structural signposts, and remove decoration that carries no information.
  **Why** Visual density is an unreliable proxy; a compact, well-grouped screen can feel calmer than a sparse, ungrouped one. **Applies to** product UI. **Check** visual; a product screen has no box-in-box-in-box and no labels repeating the obvious. **Source** Ström-Awn, UI density (#6). Same as the founder's "busy is a defect" and the compact-dashboard rules.

### Motion

- **CA-M01 RULE** The default for small style changes (opacity, colour, shadow) is about 150-200 ms with a standard ease, defined once as variables. The change is just big enough to signal appeared, changed or interactive.
  **Why** Short, subtle transitions confirm cause and effect without delaying the user. **Applies to** product UI and controls (hero load-ins have their own tokens). **Check** control `transition-duration` 120-220 ms; durations come from variables. **Source** Shu Ding (#32) (200 ms ease); Argyle (#12) (145 ms).
- **CA-M02 RULE** Tooltips and menus appear instantly and fade out on close. Moving between items of an open hover menu or toolbar doesn't re-fade.
  **Why** Content should be readable the moment it is asked for; repeated fades make a menu feel like several menus. **Applies to** tooltips, menus, toolbars. **Check** tooltip enter duration 0 (or <= 100 ms) and exit > 0; with a tooltip already open, the next one skips its delay. **Source** Shu Ding (#32). Agrees with Emil (`craft-emil-kowalski.md`).
- **CA-M03 RULE** Layout animation shows structure: expand/collapse for disclosures, slide for menu layers. Measure the target size before animating to auto (or use `interpolate-size`), use springs for dynamic layouts, and re-measure on resize (ResizeObserver).
  **Why** Motion that follows the spatial model explains where things went. **Applies to** accordions, drill-in menus, toasts. **Check** no `height: auto` jump; animated height uses a measured value or `interpolate-size: allow-keywords`. **Source** Shu Ding (#32).
- **CA-M04 RULE** Match feedback to the wait. Under 100 ms: no animation needed (it feels instant). 100 ms-1 s: bridge with motion or a state change. 1-10 s: indeterminate indicator. 10 s-1 min: determinate progress with time left (moving stripes made waits feel about 11% shorter in a cited study). Over 1 min: let the user leave and notify them.
  **Why** Perceived speed is a design property (temporal density). **Applies to** product UI, AI generation flows. **Check** every async action has a state matching its p95 duration band. **Source** Ström-Awn, UI density (#6); NN/g response-time limits (`nngroup-core.md`).
- **CA-M05 RULE** Pressed and clicked feedback arrives within 100-150 ms of input.
  **Why** Late feedback makes users press again. **Applies to** all controls. **Check** `:active` styles have transition <= 100 ms (or none). **Source** Gordon/NN/g 2025 (#17).
- **CA-M06 RULE** Centralise motion variables so one switch (`prefers-reduced-motion`, or a `.reduce-motion` class) disables or shortens everything.
  **Why** Scattered literals make reduced motion impossible to guarantee. **Applies to** all. **Check** grep for literal `ms` in component code outside token files. **Source** Shu Ding (#32).
- **CA-M07 RULE** On a homepage, critical content (logo, tagline, headline) must not keep moving, and anything that moves for more than 5 s has a pause control (WCAG 2.2.2). No autoplaying video with sound, and no splash screens.
  **Why** Motion on the elements users need to read delays comprehension and fails WCAG. **Applies to** landing page. **Check** no infinite animation on h1, logo or subtitle; autoplay video has a pause control. **Source** Wang/NN/g 2024 (#20). See section 5 for the founder's one-shot load-in exception.
- **CA-M08 RULE** Cut any animation that drops frames or costs page speed, or move it to video, canvas or SVG. Prototype interactions in code before committing, because motion can't be judged in Figma.
  **Why** Janky motion is worse than none, and interaction feel only exists in the medium. **Applies to** all. **Check** a performance trace of the load-in: no long tasks > 50 ms during animation; CLS 0. **Source** Shu Ding (#32); Vercel design engineering (#30).

### Details and polish

- **CA-P01 RULE** Align optically when the maths looks wrong. Centre text on its x-height, centre triangles and stars on the circle through their points (a play icon shifts right), and give round shapes a slight overshoot.
  **Why** Geometric centring ignores visual mass. **Applies to** icons in circles, buttons, avatars. **Check** visual at 2x crop. **Source** Hobday rule 5 (#4); Baumann (#24).
- **CA-P02 RULE** Write defensive CSS: long words and names wrap or truncate, images keep their ratio (`object-fit`), flex rows wrap with gaps, grids use the right one of `auto-fit` and `auto-fill`, background images set `no-repeat`, CSS variables have fallbacks, and fixed grid values are avoided.
  **Why** Real content breaks optimistic CSS. **Applies to** all code. **Check** run the 2x-length content fixture; `check.mjs` overflow probe. **Source** Shadeed, defensivecss.dev (#16).
- **CA-P03 RULE** No dropped frames and no cross-browser inconsistencies. Support touch, pointer and keyboard, and respect user preferences. Prefer shipping continuous improvement over chasing perfection.
  **Why** That is Vercel's stated bar for design engineering; the invisible details count as much as the visible ones. **Applies to** all shipped work. **Check** test in Chrome and Safari (WebKit) at 1x and 2x, keyboard-only pass, reduced-motion pass. **Source** Vercel (#30).
- **CA-P04 RULE** Every choice is deliberate (whitespace, alignment, size, colour, shadow). Question each element: if it carries no information and no needed structure, cut it.
  **Why** Defaults that were never decided are the AI-slop signature. **Applies to** all. **Check** visual critique: for each element, name the job it does. **Source** Hobday rule 4 (#4); Ström-Awn (#6).
- **CA-P05 RULE** Complexity is not quality. Each effect (light, glow, indicator, motion cue) must solve a real problem; trends are a moving target.
  **Why** Ornament competes with content and dates quickly. **Applies to** all. **Check** at most two looping effects per screen (engine rule); each effect is listed with a purpose in DIRECTION.md. **Source** Shu Ding, Good Design and On Dynamic Island (#32).

### Copy

- **CA-W01 RULE** The title states the value. If the product is unique, say plainly what it does. If not, attack the biggest objection, or claim the niche in one confident line. The subtitle names the product and explains how it delivers the title.
  **Why** The title earns the next 5 seconds; the subtitle turns the claim into a mechanism. **Applies to** landing page. **Check** the subtitle contains the product name or category noun and a verb of mechanism. **Source** Harry Dry (#33). Founder form constraints apply (section 5).
- **CA-W02 RULE** Test each line three ways: can a reader picture it, could it be proven false, and could only this company say it? Replace general claims with the specific fact behind them ("replies in under 10 minutes", not "better service").
  **Why** Concrete words are remembered and abstract ones slide off. **Applies to** all marketing copy. **Check** human pass; flag lines without a number, a noun the reader can picture, or a proper noun. **Source** Harry Dry via secondary summaries **[S]**.
- **CA-W03 RULE** Cut stock "landing-page words" (unlock, empower, supercharge and the like), adverbs and adjectives, and passive voice. Prefer short sentences, more full stops and fewer commas, and make the first line short.
  **Why** Real people don't talk like that, and the words cost trust. **Applies to** all copy. **Check** run the cliché list in `tools/thresholds.json`; add unlock, empower and supercharge if missing; flag passive constructions. **Source** Harry Dry, 17 tips (#34).
- **CA-W04 RULE** Proof sits next to the promise and matches it (a smile promise gets smiling customers; a sales promise gets sales numbers). Proof first builds credibility; later proof motivates through outcomes. Proof is always real: if there is none, leave the slot out.
  **Why** An unbacked claim is easy to write and easy to dismiss. **Applies to** landing page. **Check** each claim in the fold has adjacent proof, or no proof slot at all; never placeholder logos (engine principle 4). **Source** Harry Dry (#33).
- **CA-W05 RULE** CTA and link labels describe the outcome. Never "Click here" or "Learn more" alone. CTA copy either states the value or handles the main hesitation, or pairs an email field with the button and collects the rest during onboarding.
  **Why** Vague labels lower information scent, and value-led labels convert better than bare actions. **Applies to** all CTAs. **Check** grep visible link and button text for `learn more|click here|read more|submit` without context. **Source** Wang/NN/g 2024 (#20); Harry Dry (#33).
- **CA-W06 RULE** Dialog buttons say what they do ("Save", "Delete project"), not "OK" or "Yes".
  **Why** A specific verb lets users act without re-reading the question. **Applies to** dialogs, confirmations. **Check** no button text in `ok|yes|no` inside `[role=dialog]`. **Source** Nielsen 2008 (#19).

## 3. Numbers and scales

### Spacing and layout

| Item | Value | Source |
|---|---|---|
| Base grid | 8 (4 for fine steps); even values only | Dahl 2016; Hobday |
| Menu-item vertical padding | about 1x text height above and below (12px text: 12/12) | Kennedy P1 |
| Heading-to-rule gap / between lists | 15px (> cap height) / 25px | Kennedy P1 |
| Group spacing example | 25px before subhead, 10px after and between rows (was uniform 15px) | Schöndorfer |
| Image margin in a box | >= 0.5 x shortest image side | Baumann |
| Grid gap default | 16px; rows 24 / cols 16 when differing; fluid `min(2vmax, 32px)` | Shadeed |
| Header side padding | >= 16px | Shadeed |
| Grid | 12 columns | Hobday |
| Outer vs inner padding | outer >= inner | Hobday |
| Nested radius | outer - gap | Hobday; Baumann |
| Container vs canvas brightness delta | <= 12% dark, <= 7% light | Hobday |
| False-floor study | 6 of 8 users didn't realise they could scroll | NN/g 2016 |

### Type

| Item | Value | Source |
|---|---|---|
| Tracking formula | `clamp(-0.05em, calc((1em - 1rem) / -10), 0em)`: 0 at <= 16px, -0.8px at 24px, -0.05em from 32px | Sticka 2025 |
| SF optical transition | Text below 20pt (static fonts); variable SF Pro moves Text -> Display across 17-28pt | WWDC20 |
| Apple tight / loose leading | -2pt / +2pt (watchOS ±1pt); body 22 -> 20 / 24 | WWDC20 |
| Body size floor | 16px | Hobday |
| Line length | about 70 chars; 8-12 words; narrow columns 5-6 words | Hobday; Baumann |
| Size levels per composition | 3 (body 8-12pt print, display > 14pt) | Hoffmann |
| Heading levels | <= 5 (proposal cut from 10 to 5) | Schöndorfer |
| Heading ratio | each level 2/3-3/4 of the previous one | Baumann |
| Weight pairing | skip one step (400 + 600) | Baumann |
| App base text | 14px / 500 | Schöndorfer |
| Typefaces | <= 2 | Hobday |
| Thick header tracking (Source Sans) | about -1% | Kennedy P2 |
| Dark-mode GRAD | -50 (contrast more: 150; less: -150; light contrast more: 700) | Argyle 2025 |

### Colour

| Item | Value | Source |
|---|---|---|
| Greys | 8-10 shades | Refactoring UI |
| Shades per hue | 5-10 (9 ideal); 500 base, 900 text, 100 tint; fill 700, 300, then 800/600/400/200 | Refactoring UI |
| Neutral tint | HSB S < 5%; OKLCH C 0.005-0.01 | Hobday; Evil Martians |
| Dark canvas | brand hue at 1-10% lightness, never #000 | LogRocket |
| OKLCH roles (example) | light surface 0.96-1, primary text 0, secondary text 0.54; dark surface 0, raised 0.29, text 1; accents L 0.57-0.7, C 0.14-0.18; danger L 0.59 C 0.23 | Evil Martians |
| Hover delta | OKLCH L ±0.1, C and H fixed | Evil Martians |
| Hue anchors (OKLCH) | red 20, yellow 90, green 140, blue 220, purple 320 | Evil Martians |
| P3 boost | same L and H; C 0.155 -> 0.176, 0.19 -> 0.26 | Evil Martians |
| Max chroma | < about 0.37 in sRGB/P3; LCH L50: cyan 35, magenta 77, purple 108 | Evil Martians; Verou |
| White-text threshold | OKLCH L <= 62.3% (WCAG 2.1 for any hue); about 70% (APCA, 68.7-71.6); Y = 0.36 | Verou 2024 |
| Black text on light | L >= 0.87 | Evil Martians |
| Contrast-derived scale | r(x) = e^(3.04x); 500 apart = 4.5:1; hue +5(1-n); chroma -4n² + 4n; neutrals capped 20%; dark flip at Y < 0.18 | Ström-Awn |
| Overlay for text on photos | 35% black full; floor fade 0 -> about 20%; eased 0 -> 0.8 gradient; text-shadow 0 2px 3px / 0.3 | Kennedy P2; Shadeed |
| Gamut | sRGB about 30% of visible colours; P3 about 50% more than sRGB | Argyle |

### Buttons and states

| Item | Value | Source |
|---|---|---|
| Padding ratio | horizontal = 2x vertical (Argyle 1.75ch / 0.75ch) | Hobday; Argyle |
| Hover intent (revealed content) | 150-200 ms (Kaching menus: 90 ms) | NN/g 2025; Kaching |
| Pressed feedback / focus show | within 100-150 ms | NN/g 2025 |
| Button transition | 145 ms ease on box-shadow, outline-offset | Argyle |
| Focus offset | 5px, contracting on press | Argyle |
| Label contrast | 4.5:1 (3:1 only for large text); 1.7:1 fails | Schöndorfer |
| Mobile target | >= 7 x 7 mm | Baymard |
| Sites neglecting primary-button basics | 48% | Baymard |
| Weak-signifier cost | +22% time, +25% fixations (n = 71) | NN/g 2017 |

### Depth

| Item | Value | Source |
|---|---|---|
| Blur vs offset | blur = 2 x Y | Hobday |
| Elevation opacity | lower opacity as elevation rises | Hobday |
| Button shadow stack | 1px bevel; 0 1px 2px -1px; 0 3px 5px -2px + 0 7px 14px -5px; text-shadow 0 1px 0 | Argyle |
| Shadow strength | about 1% light, 25% dark | Argyle |

### Motion and time

| Band | Treatment | Source |
|---|---|---|
| < 100 ms | instant, no animation needed | Ström-Awn |
| 100 ms - 1 s | bridge with motion or state | Ström-Awn |
| 1 - 10 s | indeterminate loader | Ström-Awn |
| 10 s - 1 min | determinate with time left; moving stripes about 11% shorter perceived | Ström-Awn |
| > 1 min | let the user leave, notify on completion | Ström-Awn |
| Style-change default | about 200 ms ease (Shu Ding); 145 ms (Argyle) | Shu Ding; Argyle |
| Moving content | pause control if > 5 s (WCAG 2.2.2) | NN/g 2024 |
| Load-time cost | bounce likelihood +32% from 1 s to 3 s load (Google, cited) | NN/g 2024 |

## 4. Dos and Don'ts

| Do | Don't | Why | Source |
|---|---|---|---|
| Darken a colour by lowering lightness (and, in HSB, raising saturation) | Lay black at x% over it | A black overlay muddies the colour | Kennedy colour |
| Use one full-image overlay, a floor fade or a scrim under hero text | Put white text straight onto a busy photo (Kennedy's Otter Surfboards example) | Contrast changes with every crop | Kennedy P2; Shadeed |
| Make the overlay taller than the text block with eased stops | Fit a two-stop gradient exactly to the text | A hard edge shows, and tall text escapes the dark zone | Shadeed |
| Show the selected state with colour or background | Bold the selected tab | Weight shifts layout | Kennedy P2 |
| Give a big KPI size plus a lighter weight or colour | Make it big, bold and black | All up-pop shouts | Kennedy P2 |
| Use a contrasting, underlined link | Style links like body text, or use a lone ghost CTA | Weak signifiers cost time | NN/g 2017 |
| Keep white text on a badge and deepen the fill to L <= 62% | Flip the text to black because WCAG flagged it | Thresholds show where white works | Verou; founder |
| Let the next section peek above the fold | A 100vh hero with nothing below the fold line | False floor | NN/g 2016 |
| Give tooltips an instant open and a fade-out close | Fade in every tooltip after a delay as the pointer moves along a toolbar | Content late; menu feels fragmented | Shu Ding |
| Show real product UI in the hero | Abstract illustration or stock people | Proof beats metaphor | Harry Dry; NN/g |
| Write a specific claim with a number | "Unlock your potential" | Cliché words cost trust | Harry Dry |
| Use 9 fixed shades per hue | `darken($c, 10%)` in components | Unlimited palette, muddy shades | Refactoring UI |
| Tint all neutrals one way (warm or cool) | Mix warm greys and cool greys | Surfaces stop feeling like one material | Hobday |

## 5. Exceptions and judgement calls (founder taste outranks all of these)

1. **Hero load-in vs "don't animate the headline" (NN/g CA-M07).** The founder requires every hero to load in as one orchestrated timeline that includes the h1 (Kaching tokens, settling in about 2.5 s, one conceptual reveal). **The founder wins.** Reconcile: the motion is one-shot, finishes by about 2.5 s, never loops on h1, logo or subtitle, and shows the final state at once under reduced motion. NN/g's rule still binds for loops and autoplay.
2. **Kennedy's "light from the sky" bevels (CA-D01) vs the founder's quiet depth.** The founder accepts inner effects inside a button (gloss, inner glow, white top highlight on the Kite pill) but forbids stacking a 1px outer ring with an inset top highlight on the same dark box, forbids large blurry drops, and uses "1px hairline ring plus a faint lift" for cards. Use Kennedy's light model for direction (lighter top, darker bottom), at the founder's intensity.
3. **Hobday's "no shadows in dark" (CA-D04) vs the founder and `dark-mode-premium.md`.** Engine dark recipes edge product windows with a ring, a highlight and a dark drop, and the founder's dark rule allows "ONE light ring plus soft drop shadows". **The founder wins:** soft drops are allowed, but elevation must also read through a lighter surface, and glows are banned ("less is more on dark heroes").
4. **Kennedy's "double your whitespace" (CA-S04) vs compact product UI.** The founder wants product dashboards in the compact Rico/Kargul grammar ("one size smaller") and calls dead white space between related things a defect. Apply CA-S04 to marketing scaffolding (nav, sections, hero copy) only. Product UI follows CA-L10 (Ström: density as value).
5. **Kennedy's nav text at about 20% of bar height vs the Kaching nav** (15px links in a 43px pill, about 35%). **The founder wins.** Kennedy's ratio describes app top bars of 2014-era mobile UI.
6. **Tracking defaults (CA-T01) vs measured founder values.** Sticka's formula gives 0 at 18px and -0.05em at 60px. The founder's Kaching button label is 18px at -0.54px (-0.03em), and the dark-hero h1 is -0.04em at 60px. House or founder values win; the Sticka formula is the fallback when no bound system specifies tracking.
7. **Two typefaces (CA-T09) vs the founder's "4-5 display fonts on one switchable build".** The switcher is a selection tool for the founder. The shipped page still uses at most 2 families, plus mono for meta (the founder reserves mono for times and IDs, never for headline figures).
8. **Saturation on darker variants.** Kennedy raises saturation as a colour darkens (HSB). Evil Martians keep C fixed in OKLCH. The founder says hover moves lightness, not colour (`dark-mode-premium.md`), and Kaching's ink primary hovers to #303030. Engine default: OKLCH L only, C fixed. Kennedy's saturation rise is an option for illustrative shading (shadows on coloured surfaces), not for control states.
9. **NN/g's "hover darkens the background" vs Kaching's ink primary that lightens on hover.** The direction depends on the fill: dark fills lighten, light fills darken, and either way the change is in lightness. The founder's Kaching spec wins for the default nav and CTA.
10. **Button order (CA-B07).** Nielsen's 2008 web default is the Windows order (OK then Cancel). The engine's coss dialogs put Cancel (ghost) before the primary, the macOS order. Consistency wins, so keep the coss order everywhere in a product.
11. **Proof above the fold (Harry Dry, CA-L07, CA-W04) vs the founder's "no chip by default" and the engine's "never invent proof".** Use proof only when it is real and supplied. For fictional briefs, leave the proof slot out instead of faking logos or numbers. That is a deliberate deviation from Dry's 10 steps.
12. **Copy form.** Dry wants a bold, value-first title. The founder fixes the form: Title Case, 3-5 words with an idea, two lines maximum, no full stop, and a hand-broken balanced two-line subtitle. Apply Dry's content tests (value, specific, unique) inside the founder's form.
13. **Ghost and text-only secondary buttons (CA-B02).** The founder wants hero secondary buttons text-only with no icon. That is compatible with NN/g as long as a strong filled primary sits beside it; the secondary must still read as interactive (contrast >= 4.5:1, hover underline).
14. **Body >= 16px (CA-T08) vs hero product UI at about 11-12px.** A dashboard rendered inside a hero is an image of an app at about 0.8 zoom (founder rule). The 16px floor applies to the site's own reading text, not to text inside a product frame.
15. **Linear style (CA-L09).** LogRocket recommends bolder, less common typefaces. The founder's dark heroes use Inter 600 at 60px or 400-550 (`dark-mode-premium.md`), plus "no glows, no texture". The overlap is restraint: Linear's 2025 move to less colour matches the founder's dark rules.
16. **Hoffmann's "3 sizes" (CA-T04).** Count it per text block (card, hero copy), not per page, since a hero with nav, h1, subtitle and buttons already uses 3-4 sizes. **[engine note]**
17. **Hobday's 12-column grid** is a default for marketing layouts. Founder rails and centred product heroes use their own grids, and bento siblings must keep identical grids. A deliberate grid override goes in DIRECTION.md.

## 6. Figures worth keeping

None copied (all copyrighted). Pages whose images teach more than their text:
- Kennedy, Color framework: wall-shadow hue-shift swatches (coral 21° -> 0°, teal 194° -> 240°).
- Kennedy Part 2: before/after of five overlay techniques (overlay, box, blur, floor fade, scrim).
- Shadeed, text over images: eased-gradient and radial-overlay demos, plus the white-background contrast test.
- NN/g 2017: heatmap pairs (strong vs weak signifiers; Brilliant Earth case, 86% vs 50% finding the target).
- Ström-Awn, palettes: interactive charts of the contrast curve and chroma parabola.

## 7. Open questions

- **Refactoring UI, "7 Practical Tips for Cheating at Design" (2018-12-03, Medium):** blocked by a 403 on Medium, the scribe mirror (404), the archive (tool-blocked) and freedium (TLS error). Secondary summaries mention extra whitespace, fewer borders, a hint of colour, and emphasis by de-emphasising the surroundings. Not ruled; it needs a manual read.
- **Nathan Curtis, "Space in Design Systems" (EightShapes, Medium):** blocked (403). The inset, squish, stretch, stack and inline vocabulary and its ratios aren't captured here; check against `tokens-spacing-radius-sizing.md` before adding.
- **"The rise of Linear style design" (design-bootcamp, Medium):** not fetched. Its claims are known only via a search summary (dark canvas, linear gradients, blur, micro-motion).
- **Google Fonts Knowledge on optical size:** the pages render client-side and returned no text. Optical-size guidance here relies on WWDC20 and the founder's Inter rule.
- **Ström's toe function:** his text gives k2 = 0.003 but his code uses 0.03. Ottosson's OKHsl uses 0.03 (to verify in code before implementing CA-C05).
- **Hobday's "12% / 7%" container-brightness rule:** the page doesn't define the unit (HSB brightness or relative luminance). The check above assumes HSB B; validate against Kestrel and the dark benchmarks before turning it into a FAIL.
- **Dates:** Hobday, Refactoring UI's colour preview, Harry Dry's pages and Shu Ding's individual posts are undated on the page itself. The dates in section 0 come from listing pages or secondary sources, as marked.
- **NN/g's 150-200 ms hover delay:** stated for hover states in general. The engine applies it to revealed content only (CA-B05); it was not tested against founder preference.
- **Baymard's product-page and CTA guidelines** sit behind Premium; only the free 2021 button article was used.
- **Harry Dry's "visualise / falsify / unique" test** came only from secondary write-ups [S]; his "Four ways to write a CTA" lives in an image that wasn't read.
- Not attempted: Lenny's newsletter (paywalled), Framer and Webflow hero posts (low-quality SEO results), Config talk transcripts (none found free in text form).
