---
source: web:https://developer.apple.com/design/human-interface-guidelines/typography (data read from the HIG JSON feed, fetched 2026-10-08)
chapter: Apple HIG - Typography (plus type-related lines from Accessibility, Labels, Text views, Branding)
pages: n/a (web source)
topic_tags: [typography, apple-hig, dynamic-type, type-scale, tracking, leading, system-font, sf-pro, new-york, text-size, accessibility]
status: studied
---

# Apple HIG - Typography

Raw text: `corpus/web/apple-hig/typography.txt` (private, gitignored). Everything below is written in my own words; numbers are copied exactly from Apple's tables. Pages used: typography, accessibility, labels, text-views, branding, dark-mode, writing.

**Unit translation [engine note].** HIG sizes are in iOS/macOS points (pt). In Safari on iPhone/iPad and in any browser on macOS, 1 CSS px equals 1 logical pt, so the numbers below can be used as CSS px 1:1 for sizes, leading and tracking-in-em. What does NOT carry over: Dynamic Type (a system setting) has no CSS equivalent except browser text zoom / user font-size, so on the web use `rem` plus a 200% zoom test; and Apple's own system font applies its optical-size and tracking curves automatically, whereas a webfont does not.

## 1. Core ideas
1. Legibility floor first: Apple publishes a default and a minimum text size per platform (iOS 17 / 11 pt, macOS 13 / 10 pt). Below the minimum, nothing is acceptable regardless of contrast.
2. Light weights are discouraged: use Regular, Medium, Semibold, Bold; avoid Ultralight, Thin, Light, especially small. If a custom font is thin, size up.
3. Hierarchy is made with weight + size + colour together, and it must survive text-size changes (relative order and distinctness preserved).
4. Few typefaces: more faces blur hierarchy and make the UI feel inconsistent.
5. Named text styles (Large Title ... Caption 2) bundle size + weight + leading, and each scales with the user's text-size setting. Designers pick a role, not a number.
6. Leading is tuned per size, not one global ratio: it is tighter at big sizes (1.18-1.21 for Large Title / Caption 2) and looser at small ones (1.33-1.39 for Subhead / Footnote). Loose leading helps wide columns and long passages; tight leading is allowed for constrained rows but never for three or more lines.
7. Tracking is a function of point size, not a style: SF Pro is loose below 12 pt, tightest around 17 pt (-0.026 em), then crosses zero near 23-24 pt and goes mildly positive at large sizes before returning to 0 at 80 pt+. The serif (New York) instead stays negative at every size above 15 pt.
8. Larger text must not hide content: aim to show as much useful text at the biggest accessibility size as at the biggest standard size; switch to stacked layouts and fewer columns rather than truncating.
9. Not all text should scale equally: when someone enlarges text they want their content bigger, not the tab titles or transient numbers.
10. Brand fonts are fine for headlines; system fonts remain best for body and captions at small sizes (Branding page).

## 2. Rules

- **RULE [AH-TY-01]** Body text defaults to 17 px on touch-first app UI (iOS default) and 13 px on dense desktop/Mac-style UI; never ship body or label text below the platform minimum: 11 px (touch) / 10 px (desktop), and treat 12 px as the practical floor for anything other than caps labels.
  **Why** Apple's default/minimum pair is the legibility floor Apple tests against; footnote/caption styles bottom out at 12 and 11. **Applies to** web: SaaS app UI, mobile web, forms.
  **Check** computed `font-size` on text nodes: fail < 11 px; warn < 12 px unless `text-transform: uppercase`. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-02]** Avoid font weights below 400 for UI text; prefer 400, 500, 600, 700. If a thin or light weight is part of the brand, raise the size above the platform default for that role.
  **Why** hairline strokes disappear at small sizes and in poor lighting. **Applies to** web: all (display headlines >= 40 px are the usual exception). **Check** computed `font-weight` < 400 on text under 24 px -> fail; 300 only allowed >= 24 px with a justification. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-03]** Build hierarchy with size, weight and colour together, and keep the ladder distinguishable at every user text size (a larger setting must not collapse heading and body to the same visual weight).
  **Why** people read hierarchy from relative difference; scaling breaks it if only one axis carries it. **Applies to** web: all. **Check** render at browser zoom 100% and 200%: heading/body size ratio stays >= 1.2 and weights stay distinct; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-04]** Use as few typefaces as possible: one UI family plus at most one display or serif voice, plus mono if code appears.
  **Why** extra faces obscure hierarchy and make the product feel stitched together. **Applies to** web: all. **Check** count distinct computed `font-family` first-entries per page: > 3 -> fail. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-05]** Define named text roles (Large Title, Title 1-3, Headline, Body, Callout, Subhead, Footnote, Caption 1-2) as tokens that each carry size, weight and line-height together, and use roles instead of ad-hoc sizes.
  **Why** one token per role keeps the scale consistent and lets the whole scale shift as a unit. **Applies to** web: design tokens. **Check** distinct (size, weight, line-height) triples on a page <= 9; each matches a token. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-06]** Default role scale for a touch-first app (Apple "Large" Dynamic Type setting), in px/line-height: Large Title 34/41 Regular (Bold emphasised), Title 1 28/34, Title 2 22/28, Title 3 20/25 (Semibold emphasised), Headline 17/22 Semibold, Body 17/22, Callout 16/21, Subhead 15/20, Footnote 13/18, Caption 1 12/16, Caption 2 11/13.
  **Why** this is Apple's tested default ladder; ratios between steps are about 1.18-1.25. **Applies to** web: mobile-first SaaS UI. **Check** token file contains each role within +-1 px of these values. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-07]** Default role scale for a dense desktop UI (macOS), px/line-height: Large Title 26/32, Title 1 22/26, Title 2 17/22, Title 3 15/20, Headline 13/16 (Bold), Body 13/16, Callout 12/15, Subheadline 11/14, Footnote 10/13, Caption 1 10/13, Caption 2 10/13 (Medium).
  **Why** desktop pointer UIs run about 4 px smaller than touch UIs and rely on tighter leading. **Applies to** web: dense data tables, admin tools, inspector panels. **Check** table cell font 12-13 px with line-height 15-16 px only inside data-dense surfaces. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-08]** Emphasis inside a role steps weight one level up rather than changing size: Body/Callout/Subhead/Footnote/Caption go Regular -> Semibold; Large Title/Title 1/Title 2 go Regular -> Bold; Title 3 goes Regular -> Semibold; Headline is already Semibold.
  **Why** keeps line breaks and layout stable while adding emphasis. **Applies to** web: all (use 600 for semibold, 700 for bold). **Check** `<strong>`/`<b>` computed weight 600-700 with same font-size as parent. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-09]** Choose leading per size: below 16 px use about 1.30-1.39x (Subhead 20/15, Footnote 18/13, Caption 1 16/12); 16-22 px use about 1.25-1.31x (Body 22/17, Callout 21/16, Title 3 25/20); above 24 px use about 1.18-1.27x (Title 2 28/22, Title 1 34/28, Large Title 41/34).
  **Why** larger type needs proportionally less leading; Apple's UI leading is tighter than long-form web reading. **Applies to** web: app UI labels, list rows, cards (NOT long-form articles, see section 5). **Check** computed line-height / font-size within the band for the size bucket. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-10]** Use loose leading for wide columns and long passages; use tight leading only where height is constrained (list rows), and never tight leading on three or more lines.
  **Why** loose leading keeps the eye on the right line in long measures; tight three-line blocks read as a grey slab. **Applies to** web: all. **Check** any text block with 3+ rendered lines has line-height >= 1.25 x font-size. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-11]** Do not apply Apple's SF Pro tracking curve to non-SF fonts. On Apple devices `font-family: system-ui, -apple-system` already gets the curve from the OS; for webfonts use the font's own metrics or the engine's tracking rules.
  **Why** the table is calibrated to SF glyph spacing; applying it to Inter or a serif double-tightens or loosens it. **Applies to** web: all. **Check** if `font-family` is not system-ui/-apple-system/SF, `letter-spacing` is not copied from the SF table. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-12]** When mocking SF Pro by hand, track by size (1/1000 em): 11 px +6, 12 px 0, 13 px -6, 14 px -11, 15 px -16, 16 px -20, 17 px -26, 20 px -23, 22 px -12, 24 px +3, 28 px +14, 34 px +12, 40 px +10, 48 px +8, 64 px +4, 80 px and above 0. Small sizes below 12 px get loosened (6 px +41, 8 px +26, 10 px +12).
  **Why** SF is spaced for text; it is tightest at 17 pt and opens up again at large sizes where the display cut is already tight. **Applies to** web: only when SF Pro itself is the face (design mockups, Apple-platform fidelity). **Check** `letter-spacing` in em at each size within +-0.004 em of the table. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-13]** For SF Pro Rounded, loosen more at small sizes: +0.052 em at 11 px, +0.046 em at 12 px, +0.040 em at 13 px, +0.030 em at 15 px, +0.022 em at 17 px, +0.018 em at 20 px, +0.015 em at 24 px, +0.012 em at 34 px, 0 from 80 px.
  **Why** the rounded cut has softer, tighter-looking joins that need extra air. **Applies to** web: only if a rounded SF face is used. **Check** as above. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-14]** For New York (Apple's serif) use negative tracking that deepens with size: +0.011 em at 11 px, +0.004 em at 13 px, 0 at 15 px, -0.004 em at 17 px, -0.010 em at 20 px, -0.011 em at 24 px, -0.012 em at 28 px, -0.014 em at 34-48 px, -0.016 em at 80 px and up.
  **Why** serifs at display sizes look loose without it; this matches common web serif-display practice. **Applies to** web: only if New York is the face. **Check** as above. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-15]** Support user text enlargement of at least 200%: size type in `rem`, never fix container heights that clip text, and verify the layout at 200% browser zoom and at a 2x root font-size.
  **Why** Apple asks for at least 200% enlargement (140% on watch); iOS tops out at AX5, where Body is 53 pt instead of 17 pt (3.1x). **Applies to** web: all. **Check** Playwright at `fontSize` x2 and page zoom 200%: no horizontal scroll at 390 px width, no clipped/overlapping text. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-TY-16]** At large text sizes, stack horizontally adjacent text and secondary items (glyphs, timestamps), reduce the number of columns, and keep the primary element near the top.
  **Why** inline items crowd text and force truncation; losing the primary item breaks orientation. **Applies to** web: responsive components, list rows, cards. **Check** at 200% zoom/2x font, row flex-direction changes to column or wraps; no `text-overflow: ellipsis` on primary text. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-17]** Aim to show the same amount of useful text at the largest accessibility size as at the largest regular size; avoid truncation in scrollable regions unless a detail view can show the rest.
  **Why** truncation hides the meaning people enlarged the text to read. **Applies to** web: lists, tables, nav. **Check** count of elements with `scrollWidth > clientWidth` and ellipsis at 200% zoom: 0 for primary text. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-18]** Scale content text with the user setting but do not inflate chrome: tab titles, transient values (hit damage, toasts) and fixed navigation can stay put or scale less.
  **Why** people raise text size for their content; scaling every label starves layout. **Applies to** web: nav bars, tabs, badges. **Check** visual; nav/tab bars use a clamped size (e.g. `min(1rem, 1.25rem)`) while article/body use `rem`. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-19]** Scale meaningful icons with the text size; decorative glyphs can stay fixed.
  **Why** an icon that carries meaning must stay perceivable when text grows. **Applies to** web: inline SVG icons next to text. **Check** icon `width`/`height` in `em`, not px, for inline-with-text icons. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-20]** Custom fonts must honour the same behaviours as the system font: legible at the minimums above, scale with user text size, respond to a bold-text preference, and be supported at all weights you use.
  **Why** system fonts get these for free; custom fonts silently drop them. **Applies to** web: all. **Check** font sizes are `rem`/`em`; `@media (prefers-contrast: more)` or a bold-text toggle raises weight by one step; load fonts with metric fallback so size changes do not shift layout. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-21]** Brand typeface for headlines and subheads, system/neutral face for body and captions.
  **Why** the system face is tuned for legibility at small sizes (Apple Branding guidance). **Applies to** web: landing page, SaaS UI. **Check** `font-family` differs between `h1-h3` and `p, label, input` only when the display face has a legible text companion. **Source** https://developer.apple.com/design/human-interface-guidelines/branding

- **RULE [AH-TY-22]** Use the four label tones for text importance: primary (full contrast), secondary (subheading/supplement), tertiary (unavailable items or behaviour), quaternary (watermarks only). Do not use quaternary for anything that must be read.
  **Why** four named tiers keep text colours semantic and adaptable to dark mode and increased contrast. **Applies to** web: all (map to `--text-1..4`). **Check** every text colour resolves to one of four tokens; tertiary/quaternary contrast is documented as exempt only for disabled/decorative text. **Source** https://developer.apple.com/design/human-interface-guidelines/labels

- **RULE [AH-TY-23]** Make useful static text selectable and copyable (error messages, IDs, IP addresses, serial numbers).
  **Why** people need to paste these into support or a terminal. **Applies to** web: all. **Check** no `user-select: none` on error/ID/code text. **Source** https://developer.apple.com/design/human-interface-guidelines/labels

- **RULE [AH-TY-24]** Prefer system label colours and system views for text on varying backgrounds; avoid custom-drawn text where a native text element exists.
  **Why** native elements adapt vibrancy, contrast and appearance automatically. **Applies to** web: use semantic tokens and real DOM text, never text baked into images. **Check** no text inside `<img>` or canvas for UI copy. **Source** https://developer.apple.com/design/human-interface-guidelines/dark-mode

- **RULE [AH-TY-25]** Keep text 2D and legible: avoid heavy shadows or depth effects on text that people must read.
  **Why** apple notes extra depth reduces readability. **Applies to** web: avoid stacked text-shadow / 3D transforms on body copy; native-only for the spatial (visionOS) specifics. **Check** `text-shadow` absent on body/labels; contrast re-measured if present. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

- **RULE [AH-TY-26]** Text over images needs a contrast aid (shadow, scrim or background layer) and a measured contrast check.
  **Why** compositing text on a picture reduces both text clarity and image clarity. **Applies to** web: hero, cards with photos. **Check** worst-stop contrast >= 4.5:1 (see color note); scrim present. **Source** https://developer.apple.com/design/human-interface-guidelines/image-views

- **RULE [AH-TY-27]** Use title-style capitalisation for button, menu and column-heading labels in Apple-style UI; use sentence style for alert titles that are full sentences and for tooltips, notification body and text-field labels. Pick one style per element type and apply it consistently.
  **Why** Apple varies by component; consistency is the real rule (Writing page). **Applies to** web: depends on brand; see section 5 conflict with engine sentence-case default. **Check** per element type, all labels pass one casing test. **Source** https://developer.apple.com/design/human-interface-guidelines/writing

- **RULE [AH-TY-28]** (native-only) macOS has no Dynamic Type and uses named dynamic font variants (control content, label, menu, menu bar, message, palette, title bar, tool tips, user font, fixed-pitch user font); iOS/iPadOS/tvOS/visionOS/watchOS use Dynamic Type; visionOS adds Extra Large Title 1-2 and bolder Body/Title.
  **Why** records what does not translate. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/typography

## 3. Numbers & scales

Default and minimum sizes (pt; use as px, see unit note):

| Platform | Default | Minimum |
|---|---|---|
| iOS, iPadOS | 17 | 11 |
| macOS | 13 | 10 |
| tvOS | 29 | 23 |
| visionOS | 17 | 12 |
| watchOS | 16 | 12 |

iOS / iPadOS Dynamic Type, size/leading in pt (Body and Headline share size; Headline is Semibold, all others Regular):

| Style | xS | S | M | **L (default)** | xL | xxL | xxxL | AX1 | AX2 | AX3 | AX4 | AX5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Large Title | 31/38 | 32/39 | 33/40 | **34/41** | 36/43 | 38/46 | 40/48 | 44/52 | 48/57 | 52/61 | 56/66 | 60/70 |
| Title 1 | 25/31 | 26/32 | 27/33 | **28/34** | 30/37 | 32/39 | 34/41 | 38/46 | 43/51 | 48/57 | 53/62 | 58/68 |
| Title 2 | 19/24 | 20/25 | 21/26 | **22/28** | 24/30 | 26/32 | 28/34 | 34/41 | 39/47 | 44/52 | 50/59 | 56/66 |
| Title 3 | 17/22 | 18/23 | 19/24 | **20/25** | 22/28 | 24/30 | 26/32 | 31/38 | 37/44 | 43/51 | 49/58 | 55/65 |
| Headline | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Body | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Callout | 13/18 | 14/19 | 15/20 | **16/21** | 18/23 | 20/25 | 22/28 | 26/32 | 32/39 | 38/46 | 44/52 | 51/60 |
| Subhead | 12/16 | 13/18 | 14/19 | **15/20** | 17/22 | 19/24 | 21/28 | 25/31 | 30/37 | 36/43 | 42/50 | 49/58 |
| Footnote | 12/16 | 12/16 | 12/16 | **13/18** | 15/20 | 17/22 | 19/24 | 23/29 | 27/33 | 33/40 | 38/46 | 44/52 |
| Caption 1 | 11/13 | 11/13 | 11/13 | **12/16** | 14/19 | 16/21 | 18/23 | 22/28 | 26/32 | 32/39 | 37/44 | 43/51 |
| Caption 2 | 11/13 | 11/13 | 11/13 | **11/13** | 13/18 | 15/20 | 17/22 | 20/25 | 24/30 | 29/35 | 34/41 | 40/48 |

Emphasised weights (all iOS sizes): Large Title, Title 1, Title 2 -> Bold; Title 3, Headline, Body, Callout, Subhead, Footnote, Caption 1, Caption 2 -> Semibold. Observations: the whole scale grows 1.0-1.3x across the standard range (Body 14 -> 23) and about 3.1x at AX5 (Body 53); Body leading ratio stays 1.29-1.33 across standard sizes and tightens to 1.17-1.21 at AX3-AX5.

macOS built-in styles (pt, size/line): Large Title 26/32 Regular (emph. Bold), Title 1 22/26, Title 2 17/22 (emph. Bold), Title 3 15/20 (emph. Semibold), Headline 13/16 Bold (emph. Heavy), Body 13/16, Callout 12/15, Subheadline 11/14, Footnote 10/13, Caption 1 10/13 (emph. Medium), Caption 2 10/13 Medium.

tvOS (for completeness): Title 1 76/96 Medium, Title 2 57/66, Title 3 48/56, Headline 38/46, Subtitle 1 38/46 Regular, Callout 31/38, Body 29/36, Caption 1 25/32, Caption 2 23/30.

Tracking tables (1/1000 em; points = em x size):

| px | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 20 | 22 | 24 | 28 | 34 | 40 | 48 | 64 | 80+ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| SF Pro | +6 | 0 | -6 | -11 | -16 | -20 | -26 | -25 | -23 | -12 | +3 | +14 | +12 | +10 | +8 | +4 | 0 |
| SF Pro Rounded | +52 | +46 | +40 | +35 | +30 | - | +22 | - | +18 | - | +15 | +13 | +12 | +10 | +8 | +3 | 0 |
| New York | +11 | +6 | +4 | - | 0 | - | -4 | - | -10 | - | -11 | -12 | -14 | -14 | -14 | - | -16 |

Small-size SF Pro: 6 px +41, 7 px +34, 8 px +26, 9 px +19, 10 px +12. macOS tracking table has the same values as iOS SF Pro. Typeface families: SF Pro, SF Compact, SF Arabic/Armenian/Georgian/Hebrew, SF Mono, New York; rounded variants of SF Pro/Compact/Arabic/Armenian/Georgian/Hebrew; nine weights Ultralight to Black; widths from Condensed to Expanded for SF.

Accessibility minima tied to type: enlarge text by at least 200% (140% watchOS); contrast 4.5:1 up to 17 pt, 3:1 at 18 pt and for bold text.

## 4. Dos and Don'ts
- **Do** keep the heading/body distinction when the user enlarges text (Apple's table keeps Title 3 3 px above Body at the default setting, 20 vs 17, and 3 px up to xxxL where it is 26 vs 23); **Don't** let a heading token and the body token resolve to the same size and weight at any text-size setting.
- **Do** use a stacked layout when an inline timestamp would force a title to truncate at large sizes; **Don't** truncate the primary line to keep a trailing glyph.
- **Do** use Semibold for emphasis in a paragraph; **Don't** switch the whole run to Ultralight or Thin for style.
- **Do** keep a single face for a dense UI; **Don't** mix four faces to "add personality".

## 5. Exceptions & judgement calls
- **Leading conflict with `web/typography.md` T-LH-01.** Apple UI leading is 1.18-1.39 (Body 17/22 = 1.29), where the engine specifies body 1.5-1.65 (landing) or 1.4-1.5 (dense). Reconcile by scope: Apple ratios hold for UI labels, list rows, controls, data tables; the engine ratios hold for multi-line reading text. A 17/22 paragraph of 60+ characters will read tight. `[engine note]`
- **Tracking conflict with `web/typography.md` T-LS-01.** T-LS-01 prescribes negative tracking at display sizes (-0.02 em at 48+). Apple's SF Pro table is positive from 24 px upward (+0.014 em at 28, +0.008 em at 48, 0 at 80) because the optical size gets tighter by design. The two agree only for text sizes (14-20 px negative) and for serifs (New York goes steadily negative). Do not apply T-LS-01 to SF Pro rendering on Apple devices; the OS already does the right thing.
- **Measured vs HIG.** `web/typography.md` records apple.com marketing body at 17/25 with -0.022 em `[M]`; the HIG app UI table says 17/22 with -0.026 em (SF Pro at 17). The marketing page deliberately uses looser leading than the app text style. Marketing is not an app style table.
- **Minimum size vs web norms.** Apple allows 11 pt (Caption 2). The engine's T-SC-04 rule says never below 12 px except caps labels at 11 px; consistent in spirit. Default body 17 vs the web 16 px minimum on mobile: Apple's default is slightly larger; 16 px on web remains fine because inputs must be >= 16 px to prevent iOS zoom.
- **Casing conflict with `web/copy-and-ux-writing.md` CW-10.** CW-10 defaults to sentence case; Apple uses title-style for buttons (Buttons page), menu items, segmented labels, column headings, tab labels, and sentence style for alert titles that are sentences, tooltips and notification bodies. Apple's actual rule is "choose one and be consistent" (Writing page). Treat Apple-style title case as a brand option, not a default.
- Apple does not publish px conversions or line-length numbers (no measure guidance in this page); the 45-75 ch measure rules in `web/typography.md` stand alone.
- Weight thresholds (Regular and up) are guidance, not tested thresholds; Apple does not give an x-height or stroke-width criterion.

## 6. Figures worth keeping
- Typography page: dynamic type size tables (tabs per category) and the SF Pro / Rounded / NY tracking tables. Text only, no images needed.
- Foundations typography intro image (type specimen) - not text.

## 7. Open questions
- Apple publishes SF Pro "Text" vs "Display" tracking as a single continuous curve; the opsz boundary is not stated numerically. Verify with a rendered test before using the table to simulate SF in non-SF fonts.
- Weight names map to CSS 100-900 but the page does not give numeric equivalents; assumed Regular 400, Medium 500, Semibold 600, Bold 700, Heavy 800, Black 900 `[engine note]`.
- Pages: no rule content: `foundations` (index page, 91 bytes).
