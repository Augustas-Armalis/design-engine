---
source: web:carbondesignsystem.com + github.com/carbon-design-system/carbon-website (docs MDX, Apache-2.0) + npm @carbon/themes 11.83.0, @carbon/type 11.69.0, @carbon/layout 11.61.0, @carbon/motion 11.54.0, @carbon/styles 1.117.0
chapter: IBM Carbon, tokens, type sets, layering, 2x grid, motion, buttons, content
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [design-system, carbon, tokens, themes, layering, type-sets, productive-expressive, 2x-grid, motion, buttons, accessibility, content]
status: studied
---

# IBM Carbon

Machine-readable profile: `system/systems-research/ibm-carbon.json`. Raw copies (untrusted data, gitignored): `corpus/web/systems/carbon-themes/`, `carbon-type/`, `carbon-layout/`, `carbon-motion/`, `carbon-styles/`, and a sparse clone of the docs MDX in `corpus/web/systems/carbon-website/repo/src/pages/` (elements, guidelines, button).

Evidence grading as in `knowledge/web/color-and-surfaces.md`: **[verified]** read from package SCSS or docs MDX source; **[computed]** script-produced (type-scale formula, WCAG luminance); **[secondary]** fetch-tool summary of a page; **[engine note]** my inference.

## 1. Core ideas

1. **Two modes from one token set: productive and expressive.** Productive (suffix `-01`, 14px base, fixed headings) is for focused task work: users complete a job, interactions are active, KPI = time on task and abandonment. Expressive (suffix `-02`, 16px base, fluid headings that change size at breakpoints) is for editorial and marketing: users scan and learn, KPI = click-through. Expressive styles are "distracting if used in product" inside containers; a blend is allowed only as a full-page or full-banner "moment" without containers [verified, typography/overview, style-strategies].
2. **The type scale is a formula.** `y0 = 12px; Yn = Yn-1 + (INT((n-2)/4)+1)*2`, giving 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156 [verified in `_scale.scss`; reproduced by script]. Every named style cites a step number, not a pixel value.
3. **Only three weights: 300, 400, 600.** Light is used for big sizes (42px+ headings, 24px+ expressive paragraph), semibold for small headings and labels, never for long text [verified, `_font-family.scss`].
4. **Tracking is positive on small text and negative only on huge display.** 12px styles carry +0.32px, 14px +0.16px, 16px and above 0; display-03/04 go -0.64px then -0.96px [verified].
5. **Four themes, one role vocabulary.** White, Gray 10, Gray 90, Gray 100; ~211 role tokens constant across themes; "Tokens are universal and never change across themes; roles cannot be changed between themes" [verified, themes/overview + `_themes.scss`].
6. **Layering instead of shadows.** `background`, `layer-01/02/03`, `field-01/02`, with `border-subtle-00..03` stepping per layer. Light themes alternate White/Gray 10; dark themes lighten one palette step per layer (Gray 100: 90, 80, 70) [verified].
7. **State colours are derived by rule.** Hover = half a palette step, active = two steps, selected = one step, focus = 2px border plus a `focus-inset` border to reach 3:1; disabled is gray, takes no hover/focus and is contrast-exempt [secondary, color/overview].
8. **Square geometry.** `border-radius-00` is the default for buttons, modals and inputs; inputs use a single 1px bottom border (`border-strong`) rather than a box; tags are pill-shaped (16px) [verified in `_button.scss`, `_text-input.scss`, `_tag.scss`].
9. **The 2x Grid is the layout system.** Breakpoints 320/672/1056/1312/1584 with 4/8/16/16/16 columns, 8px mini unit, gutters in three modes (wide 32, narrow 16, condensed 1) so containers can hang into the gutter while type never does [verified/secondary].
10. **Component specs are token tables per state.** Each component's Style tab lists element x property x token for rest, hover, focus, active, disabled, for each kind and each icon-only twin [verified, button/style.mdx].
11. **Motion has two personalities and six durations.** Productive easing `0.2,0,0.38,0.9`, expressive `0.4,0.14,0.3,1`; durations 70, 110, 150, 240, 400, 700 ms; entrance/exit/standard curves by situation [verified, `@carbon/motion`].

## 2. Rules

- **RULE [SYS-CARBON-01]** Pick the type set by the user's task: productive (14px base, fixed headings, compact body) for task-focused product pages; expressive (16px base, fluid headings) for reading, exploring and marketing; blend only with a full-width "moment" that contains no containers, and never use fluid or display styles inside a container.
  **Why** Dense task work needs predictable sizes; reading and persuasion need larger, responsive type; mixing inside boxes breaks both.
  **Applies to** SaaS app UI | marketing | design systems
  **Check** computed font-size of text inside `.card/.tile/.modal` containers <= 32px and not from a fluid style; display/fluid classes have no container ancestor.
  **Source** carbondesignsystem.com/elements/typography/style-strategies

- **RULE [SYS-CARBON-02]** Generate sizes from a scale formula (or a documented ladder) and pair compatible body/heading tokens: body-compact-01 with heading-compact-01; body-01 with heading-01; body-compact-02 with heading-compact-02; body-02 with heading-02.
  **Why** Pre-paired leading values keep baselines consistent when body and heading sit next to each other.
  **Applies to** all
  **Check** sizes in {12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92}; adjacent heading/body pair use same family of line-heights.
  **Source** @carbon/type `_scale.scss`, `_styles.scss`; style-strategies

- **RULE [SYS-CARBON-03]** Limit weights to 300, 400, 600; use semibold for headers and labels only, not for long text; use light weight only where the size is much larger than body; use italic only for emphasis; keep running text neutral and reserve colour for links, status and code.
  **Why** A heavier weight at the same size is stronger, but a lighter weight can outrank it if much larger; colour as decoration lowers signal.
  **Applies to** all
  **Check** computed `font-weight` ∈ {300, 400, 600}; weight 300 only at font-size >= 24px.
  **Source** carbondesignsystem.com/elements/typography/overview

- **RULE [SYS-CARBON-04]** Add positive tracking to small text (12px: 0.32px, 14px: 0.16px), none at 16px and above, and tighten (-0.64px, -0.96px) only on display sizes above about 60px.
  **Why** Small sizes need extra letter spacing for legibility; huge type looks loose without negative tracking.
  **Applies to** all
  **Check** computed `letter-spacing` vs font-size: 12px ≈ 0.0267em, 14px ≈ 0.0114em, >= 16px 0, display >= 60px negative.
  **Source** @carbon/type `_styles.scss`

- **RULE [SYS-CARBON-05]** Use a layering model: page = `background`; first container = `layer-01`; nested container = `layer-02`; third = `layer-03`; in light themes alternate White and Gray 10; in dark themes step one palette grade lighter per layer; never make a component darker than its background in a dark theme unless using high-contrast inverse.
  **Why** One rule creates visible hierarchy without shadows and keeps contrast predictable at any nesting depth.
  **Applies to** SaaS app UI
  **Check** nested container luminance differs from parent by one step; in dark mode child luminance >= parent luminance.
  **Source** carbondesignsystem.com/elements/color/overview; @carbon/themes `_themes.scss`

- **RULE [SYS-CARBON-06]** Derive interaction colour by rule: hover half a step, active two steps, selected one step, focus 2px `focus` border with a 1px `focus-inset` so the ring holds 3:1, disabled in the gray family with no hover or focus.
  **Why** A rule scales to every component and theme without hand-picking values.
  **Applies to** all
  **Check** state colours differ from rest by the expected step; focus indicator contrast >= 3:1 vs adjacent colours.
  **Source** carbondesignsystem.com/elements/color/overview [secondary]; button/style.mdx

- **RULE [SYS-CARBON-07]** Never use midtone fills in light themes, never use hover colours outside hover, and never use a component token outside its component.
  **Why** Midtones fail contrast; reusing hover or component tokens couples unrelated parts and breaks theming.
  **Applies to** design systems
  **Check** lint: `button-*` and `tag-*` tokens appear only in their own component files; hover tokens only in `:hover`.
  **Source** carbondesignsystem.com/elements/color/overview [secondary]

- **RULE [SYS-CARBON-08]** Meet 4.5:1 for text under 24px (19px semibold), 3:1 for large text, UI components, graphics and focus indicators, and never rely on colour alone.
  **Why** WCAG AA; in this system chroma semantics (red/yellow/green) are reinforced by icon shape.
  **Applies to** all
  **Check** computed contrast; each status has an icon or text as well as colour. Note [computed] `support-warning #f1c21b` on white is 1.68:1, so a yellow status needs a dark glyph or container.
  **Source** carbondesignsystem.com/guidelines/accessibility/color (carbon-website MDX)

- **RULE [SYS-CARBON-09]** Lay out on the 2x Grid: 4, 8, 16, 16, 16 columns at 320, 672, 1056, 1312, 1584; margins 0 (sm), 16, 16, 16, 24; 8px mini unit; default wide gutter 32px, narrow 16px, condensed 1px; fixed components with labels (inputs, dropdowns) must use the wide gutter; type never hangs into the gutter; containers may hang in narrow and condensed modes.
  **Why** Hanging containers align text inside and outside boxes without moving type off the columns; forms need breathing room.
  **Applies to** SaaS app UI | marketing
  **Check** column count at breakpoint; text left edges coincide with column edges; form field containers do not extend into the gutter.
  **Source** carbondesignsystem.com/elements/2x-grid/overview; carbon-website `2x-grid/usage.mdx` "Gutter modes"

- **RULE [SYS-CARBON-10]** Space with the scale 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160 px; use Stack for equal gaps; use percentages only for page division and max/min widths; avoid increments outside the scale; do not change tokens by breakpoint, step up or down the scale instead.
  **Why** One scale across components and layout keeps rhythm; exceptions are allowed but "should be avoided".
  **Applies to** all
  **Check** padding/margin/gap values ∈ scale.
  **Source** carbondesignsystem.com/elements/spacing/overview

- **RULE [SYS-CARBON-11]** Fix control heights to 24 (xs), 32 (sm), 40 (md), 48 (lg), 64 (xl), 80 (2xl) and pair sizes: small button with small input, medium with medium, large with 14px body (productive) or 16px body (expressive); never mix sizes in a button group.
  **Why** Equal heights align rows; mismatched sibling controls look broken.
  **Applies to** forms | SaaS app UI
  **Check** computed height of controls ∈ set; same-row controls share height.
  **Source** carbon-website `components/button/style.mdx` "Size"; @carbon/styles `utilities/_layout.scss`

- **RULE [SYS-CARBON-12]** Limit button hierarchy: one primary per page (not counting app header, modals, side panels); secondary only paired with a primary; ghost and tertiary for lower emphasis; danger kinds for destructive actions and never icon-only; more than three actions go into a menu button; icon-only buttons need a tooltip; use {verb}+{noun} labels in sentence case; left-align labels; never truncate (wrap).
  **Why** A clear emphasis ladder removes choice friction; an icon alone is ambiguous.
  **Applies to** all
  **Check** primary buttons per page <= 1; button group size <= 3; tooltip on `[aria-label]`-only buttons.
  **Source** carbondesignsystem.com/components/button/usage [secondary]; carbon-website `button/style.mdx`

- **RULE [SYS-CARBON-13]** Order button groups by context: on full-page designs put the primary first (left); in dialogs and wizards put the primary last (right); equal widths in a group set by the longest label; stacked groups put the primary on top; gutter between grouped buttons 16px.
  **Why** Reading order and thumb position decide where the most likely action should sit.
  **Applies to** forms | SaaS app UI
  **Check** DOM order and flex direction of group by container type; equal computed widths.
  **Source** carbondesignsystem.com/components/button/usage [secondary]

- **RULE [SYS-CARBON-14]** Give buttons the asymmetric geometry padding-left 16px / padding-right 64px (label then trailing icon), icon 16px (20px expressive), at least 16px between label and icon, 1px inset focus, and label never within 16px of an edge.
  **Why** Reserving the right side for an icon aligns label baselines across a column of buttons and signals direction.
  **Applies to** design systems | enterprise UI
  **Check** computed paddings; icon size; focus ring is inset.
  **Source** carbon-website `components/button/style.mdx` "Structure"

- **RULE [SYS-CARBON-15]** Match motion to mode: productive easing (`0.2,0,0.38,0.9`) for tasks, expressive (`0.4,0.14,0.3,1`) for rare significant moments; use entrance easing for appearing, exit easing for removed, standard easing when the element stays visible or leaves but stays near (side panel); micro-interactions 70-110ms; small expansions 150ms; toasts and system messages 240ms; large expansion 400ms; background dim 700ms.
  **Why** Distance and significance should drive duration; an element that stays on screen should not use exit curves.
  **Applies to** all
  **Check** computed `transition-timing-function` ∈ the six curves; micro-interaction duration ≤ 110ms.
  **Source** carbondesignsystem.com/elements/motion/overview [secondary]; @carbon/motion `generated/_tokens.scss`

- **RULE [SYS-CARBON-16]** Write all UI text in sentence case; do not use title case or all-caps; capitalise only proper nouns, products and trademarked names; do not treat UI elements as proper nouns; use short, everyday words and consistent action labels from the glossary.
  **Why** Title case needs subjective "importance" decisions that drift across a large org; all-caps slows reading and wastes space.
  **Applies to** all
  **Check** regex on UI strings for Title Case buttons/labels and `text-transform: uppercase` on body-length text.
  **Source** carbon-website `guidelines/content/writing-style.mdx`

- **RULE [SYS-CARBON-17]** Document each component with four tabs (Usage, Style, Code, Accessibility) and in Style publish structure tables (px / rem / spacing token) and colour tables (element, property, token) for every state and kind.
  **Why** If the spec is tabular, completeness is checkable: a missing cell is a visible gap.
  **Applies to** design systems | this engine
  **Check** for each component spec: every kind x state cell filled; every padding has a token.
  **Source** carbon-website `components/button/style.mdx`

## 3. Numbers & scales

| Group | Values |
|---|---|
| Type scale steps (px) | 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156 |
| Productive styles (px/lh) | caption/label/helper/legal-01 12/16 (+0.32px); body-compact-01 14/18; body-01 14/20 (+0.16px); heading-compact-01 14/18 w600; heading-01 14/20 w600; body-compact-02 16/22; body-02 16/24; heading-compact-02 16/22 w600; heading-02 16/24 w600; heading-03 20/28; heading-04 28/36; heading-05 32/40; heading-06 42/50 w300; heading-07 54/64 w300; code-01 12/16; code-02 14/20 |
| Expressive fluid | heading-03 20 to 24; heading-04 28 to 32; heading-05 32/36/42/48/60; heading-06 same, semibold; paragraph-01 24/28/32 w300; quotation-01 20/24/28/32 serif; quotation-02 32 to 60 serif w300; display-01 42/54/60/76 w300; display-03 42/54/60/76/84; display-04 42 to 156 |
| Spacing (px) | 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160; layout 16, 24, 32, 48, 64, 96, 160; container 24, 32, 40, 48, 64; fluid 0, 2vw, 5vw, 10vw |
| Size tokens (px) | xs 24, sm 32, md 40, lg 48, xl 64, 2xl 80; icon 16 / 20 |
| Radius (px) | 0 (default), 2, 4, 8, 16, 24, max; tags 16 pill |
| Grid | breakpoints 320/672/1056/1312/1584; columns 4/8/16/16/16; margins 0/16/16/16/24; padding 16; mini unit 8; gutters 32 / 16 / 1; aspect 1:1, 2:1, 2:3, 3:2, 4:3, 16:9 |
| Density | padding-inline normal 16 / condensed 8 |
| Motion (ms) | fast-01 70, fast-02 110, moderate-01 150, moderate-02 240, slow-01 400, slow-02 700 |
| Easings | standard productive `0.2,0,0.38,0.9`, expressive `0.4,0.14,0.3,1`; entrance `0,0,0.38,0.9` / `0,0,0.3,1`; exit `0.2,0,1,0.9` / `0.4,0.14,1,1` |
| Z-index | hidden -1, footer 5000, overlay 6000, floating 6000, header 8000, modal 9000, dropdown 9100 |
| Shadow | `0 2px 6px rgba(0,0,0,.3)` (0.8 in Gray 90/100) |
| Colours (White) | bg `#fff`, layer-01 `#f4f4f4`, layer-02 `#fff`, border-subtle-01 `#c6c6c6`, border-strong `#8d8d8d`, text `#161616`, secondary `#525252`, helper `#6f6f6f`, interactive/Blue 60 `#0f62fe`, focus `#0f62fe`, error `#da1e28`, success `#24a148`, warning `#f1c21b`, info `#0043ce` |
| Colours (Gray 100) | bg `#161616`, layer-01 `#262626`, layer-02 `#393939`, layer-03 `#525252`, border-strong `#6f6f6f`, text `#f4f4f4`, secondary `#c6c6c6`, link `#78a9ff`, interactive `#4589ff`, focus `#fff`, error `#fa4d56` |
| Contrast [computed] | text on white 18.1; secondary 7.81; helper 5.02; white on `#0f62fe` 5.0; strong border 3.32; subtle border on layer 1.2; warning yellow on white 1.68; Gray 100 secondary 10.59 |

Counts: 211 role tokens (White, Gray 10), 206 (Gray 90, Gray 100); 235 token declarations in `_tokens.scss`; ~60 named type styles; 41 documented components (stable); ~91 style modules in `@carbon/styles`.

## 4. Dos and Don'ts

- **Do** use tokens (`$layer`, `$border-subtle`, `$support-error`); **Don't** use hex codes.
- **Do** align type to columns; **Don't** take type off the column structure to achieve alignment.
- **Do** use narrow gutter mode (the most common product choice) so containers hang 16px into the gutter; **Don't** let form-field labels hang.
- **Do** use ghost/tertiary buttons on reading or filtering pages; **Don't** put two high-emphasis buttons together or secondary with non-primary.
- **Do** write "First name", "Email address", "Secure your enterprise applications with Padlock."; **Don't** write "Secure your Enterprise Applications".
- **Don't** use SemiBold for long text; **Don't** use expressive styles inside product containers; **Don't** apply colour to type for decoration.

## 5. Exceptions & judgement calls

- Odd column counts: legacy products can keep three-column scaffolding on the 2x Grid; the system "highly recommends" refactoring to groups of four but supports 12-column [verified, 2x-grid/usage].
- A fully gutterless grid is allowed for closely related content; condensed mode (1px gutter) is for tiles/cards that should read as one unit [verified].
- Dense data visualisation uses fixed mini-unit spacers instead of fluid columns [verified].
- Full-bleed buttons (xl 64, 2xl 80) exist only inside modals, side panels and tearsheets.
- Side panel buttons at 480px or less may go full width.
- [engine note] Carbon's flat, square, layered look is easy to over-apply: for consumer or brand work, take the layer/state-derivation logic and token-table rigor, not the 0-radius + bottom-border inputs.
- Warning yellow fails contrast; the system compensates with icons/dark text; do not use `support-warning` as a text colour on white.
- `prefers-reduced-motion` is not explicit in the motion overview (it says to provide static alternatives for state transitions).

## 6. Figures worth keeping

None captured. Candidates: layering diagram per theme (colour overview), gutter-mode diagrams (2x-grid/usage), button size/kind matrix (button/usage), type-set comparison (type-sets).

## 7. Open questions

- Condensed layout density: only `padding-inline` (8px vs 16px) was recovered from `@carbon/styles/utilities/_layout.scss`; documented condensed sizes for each component are unknown.
- Whether "Gray 10" layering starts at White or Gray 10 for `layer-01` is inverted vs White (verified in token maps: Gray 10 layer-01 `#ffffff`).
- Carbon for IBM.com / IBM Products (page-header, tearsheet, side-panel): partially in `@carbon/styles`; docs gated for IBMers (PAL).
- Exact heights/states of non-button components (text input 40px default via `layout.size`, others) not tabulated here.
- Hover half-step rule: the docs describe it relative to the IBM palette; numeric hex deltas per token were not verified beyond samples (layer-hover-01 `#e8e8e8` vs `#f4f4f4`).
- IBM Plex font licence: SIL OFL 1.1 assumed from public knowledge, not re-verified in this session.
- URLs: https://carbondesignsystem.com/elements/{typography/overview,2x-grid/overview,motion/overview,spacing/overview,color/overview}/, https://carbondesignsystem.com/components/{button/usage,overview/components}/; repo https://github.com/carbon-design-system/carbon-website; npm @carbon/themes, type, layout, motion, styles.
