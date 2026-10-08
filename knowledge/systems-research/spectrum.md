---
source: web:https://spectrum.adobe.com + github.com/adobe/spectrum-design-data (packages/tokens/src/*.json, docs/s2-docs/**) + unpkg @spectrum-css/tokens@16.0.2 (animation tokens)
chapter: Adobe Spectrum 2 (S2): token taxonomy, scales, colour, layering, density, component state tables
pages: n/a (web + open-source repo, fetched 2026-10-08)
topic_tags: [design-system, tokens, spectrum, adobe, color, typography, spacing, density, layers, dark-mode, attention-hierarchy, component-states]
status: studied
---

# Adobe Spectrum 2

Machine profile: `system/systems-research/spectrum.json`. Raw fetches: `corpus/web/systems/spectrum/` (tree.json, raw/docs__s2-docs__*.md = 150+ design and component pages, raw/packages__tokens__src__*.json = 91 token files, 2,500 tokens). Licence: Apache-2.0 for tokens, schemas, React Spectrum. **Adobe Clean / Adobe Clean Spectrum VF are restricted to Adobe products and served only through Adobe Fonts** (fonts.md): the typeface, and therefore the typographic identity, is not available to us. The repo was renamed `spectrum-tokens` -> `spectrum-design-data` (npm names unchanged).

Evidence grading: **[verified]** read from a token file or docs page this session; **[computed]** script output; **[secondary]** value from the Spectrum 1 CSS package; **[engine note]** my judgement.

## 1. Core ideas

1. **Attention hierarchy is the organising idea.** Every part of the UI (type weight, colour contrast, elevation, object style) communicates at a level of attention. "Only one element or group of elements should have high attention on a page"; the plus-button example shows selected nav competing with the primary action as a failure [verified: attention-hierarchy.md].
2. **Gray-first UI, accent rationed.** Page background is `gray-25` (white / `#111111`), controls are gray, selected state is a `gray-800` fill by default, and the blue accent is an option (`isEmphasized`) for narrowly-scoped contexts [verified: states.md, grays.md].
3. **Perceptual scales, not a linear grid.** Spacing 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96 px is a rounded geometric progression because "the difference between 72 and 80 is almost imperceptible"; type is a Major Second (x1.125) from 14px; radius follows the same scale per component size [verified: layout-spacing.md, typography-system.md, rounding.md].
4. **Two spacing tracks.** Layout spacing (between components, `spacing-100..1000`) and component spacing (inside components, semantic tokens like `base-padding-vertical-large`, `container-padding-medium`, `group-gap-small`) scale at different rates, and each component is composed from structural templates: base, accessory, group, list, container, banner [verified: component-spacing.md, design-tokens.md].
5. **Spacing replaces dividers.** S2 groups content with proximity tokens and section titles; borders only "when necessary" and only two widths: 2px default, 1px in dense components [verified: spacing.md, border-width.md].
6. **Layered backgrounds with dark-mode mapping.** Base / layer-1 / layer-2 / pasteboard / elevated, with explicit light and dark tokens (`layer-2` is gray-25 in light, gray-75 in dark; `pasteboard` gray-100 / gray-25) and different layer recipes for editing vs browsing contexts [verified: background-layers.md; color-aliases.json].
7. **Light and dark share a step vocabulary.** gray-800 is `#292929` light and `#dbdbdb` dark; a token name means the same job in both themes. Colours are generated with the Leonardo tool from key colours plus target contrast ratios, not hand-tuned [verified: colors.md, color-palette.json].
8. **Density belongs to collections and containers only.** Compact = every spacing token one step down, spacious = one step up; basic controls (buttons, text fields) have no density variants, only size [verified: component-spacing.md].
9. **Every component page carries a state-support table.** Default / Hover / Down / Keyboard focus / Disabled / Selected / Dragged / Error each marked Supported or Not supported, plus options, behaviours, content standards, i18n and a WCAG 2.2 table [verified: components/*.md].
10. **Down state resizes instead of recolouring** in S2 (buttons shrink slightly), implemented by tokens `component-size-difference-down` (-2px), `component-size-width-ratio-down` (0.3333), perspective min/max 24/96px [verified: layout.json].

## 2. Rules

- **RULE** Allow exactly one high-attention element or group per view: one filled accent action, one emphasized (shadowed) container group; every other control uses the neutral/gray style and selected nav items must not compete with the primary action.
  **Why** Attention is a signal-to-noise budget; two loud elements cancel each other.
  **Applies to** SaaS app UI | landing page.
  **Check** Count elements with the accent fill + elements with elevated shadow per viewport screenshot; fail if > 1 accent-filled button or > 1 emphasized container group (visual + `[data-accent]` count).
  **Source** spectrum.adobe.com/foundations/attention-hierarchy (attention-hierarchy.md)

- **RULE** Group with proximity before borders: separate sections with a spacing step (e.g. items `spacing-75` 4px, section gap `spacing-400` 24px, card groups `spacing-300` 16px / `spacing-500` 32px) and a section title; add a divider or border only when spacing cannot do it, and use at most two border widths (2px, 1px dense).
  **Why** Borders fill and disrupt negative space; proximity is the cheaper, calmer grouping cue.
  **Applies to** SaaS app UI | landing page.
  **Check** Count of distinct border widths <= 2; number of elements with a visible border per card group; ratio of inter-group gap to intra-group gap >= 2.
  **Source** docs spacing.md; border-width.md

- **RULE** Pick spacing from a perceptually stepped scale (1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96) and grow small gaps with component size (base-gap 4px in extra-small/small controls, 6px medium to extra-large, 8px for 2XL+; accessory-gap 3 -> 9px).
  **Why** Fixed 8px multiples crowd small components and make large values indistinguishable (4 to 8 is +100%, 72 to 80 is +11%).
  **Applies to** all.
  **Check** All margin/padding/gap values belong to the scale above (tolerance 0); adjacent steps differ by 10-100%.
  **Source** layout-spacing.md; layout.json spacing-25..1000

- **RULE** Use the Major Second (x1.125) type scale from a 14px base: 10, 11, 12, 14, 16, 18, 20, 22, 25, 28, 32, 36, 40, 45, 51, 58, 65, 73px; take sizes only from this list.
  **Why** Custom sizes break the hierarchy relationships the styles were built on.
  **Applies to** all.
  **Check** Every computed `font-size` is in the list; headings use Heading (weight 800), titles 700, body 400, detail 500 uppercase +0.06em.
  **Source** typography-system.md; typography.json font-size-25..1500

- **RULE** Set Body and Code line height to 1.5x; give Heading, Title and Detail per-size even-pixel line heights from 130% down to 115% (14 -> 18, 20 -> 24, 28 -> 32, 36 -> 42, 73 -> 84); never fully justify text; aim for about 70 characters per line (50-120 hard range).
  **Why** Tight display lines vs open reading lines; line height must shrink as size grows.
  **Applies to** all.
  **Check** `line-height / font-size` for `p` = 1.5; for h1-h3 between 1.15 and 1.3; `text-align` not `justify`; `max-width` of paragraphs 50-120ch.
  **Source** typography-system.md (line height); applying-the-type-system.md

- **RULE** Use tabular numerals for numbers in components and tables, right-align numeric columns, and reserve all caps for Detail text (11-18px, weight 500, +0.06em, gray-600) or long-form marketing.
  **Why** Equal digit width stops values jittering; all caps harms accessibility inside components.
  **Applies to** SaaS app UI | forms.
  **Check** `font-variant-numeric: tabular-nums` on table cells and counters; `text-transform: uppercase` only on elements with letter-spacing >= 0.05em.
  **Source** applying-the-type-system.md; detail.json (detail-letter-spacing 0.06em, text-transform uppercase)

- **RULE** Use only the supplied colour steps and never transform them (no lighten/darken/opacity hacks); build tints and shades by choosing another step. Pair roles by index: text on a layer uses gray-700..1000 (light) and the matching step in dark; colour fills with white text use the 900/800 index, and yellow/orange/chartreuse/celery fills take black text.
  **Why** Steps are perceptually uniform and contrast-tested; programmatic changes break both.
  **Applies to** all.
  **Check** No `color-mix`, `lighten()`, `rgba()` derived from tokens in component CSS; contrast of each text/background pair >= 4.5:1 (3:1 for large and non-text).
  **Source** colors.md ("Programmatic color changes", "Provide sufficient contrast")

- **RULE** Never rely on colour alone: every colour-coded state (negative, positive, notice, informative) carries a label or icon; two-tone pairs use the 100 step for background and the 900 step (light) for the glyph.
  **Why** CVD users cannot separate red/green/orange by hue; Spectrum flags two-tone pairs as not CVD safe.
  **Applies to** forms | SaaS app UI.
  **Check** Each element using a status colour contains text or an svg/icon.
  **Source** colors.md ("Communicating with color", "Two-tone color pairing")

- **RULE** Build page surfaces from layers: base gray-25, layer-1 gray-50, layer-2 (gray-25 light / gray-75 dark), pasteboard (gray-100 light / gray-25 dark), elevated (gray-25 / gray-75 plus drop shadow) and map each to a distinct dark-theme value rather than inverting.
  **Why** Dimensionality has to survive the theme switch; a layer is a role, not a colour.
  **Applies to** SaaS app UI | dark mode.
  **Check** Page uses <= 4 distinct background tokens; each has a dark counterpart in the token file.
  **Source** background-layers.md; color-aliases.json (background-layer-*-color)

- **RULE** Compose shadows from three layers (key = edge, transition, ambient = depth) in black, give containers no shadow by default (emphasized, hover, elevated, dragged are the only four), and triple the opacity in dark theme (8/12/16% -> 24/36/48%); omit the shadow when an overlay already separates the element.
  **Why** A three-layer shadow keeps the edge crisp while the depth stays soft; dark needs more opacity; overlay + shadow double counts.
  **Applies to** SaaS app UI | landing page cards.
  **Check** `box-shadow` values on page match one of four tokens; layer count 3; dark alpha ~3x light.
  **Source** drop-shadow.md; color-aliases.json drop-shadow-*

- **RULE** Radius scales with component size and nests: small controls 4px, most components 8px, panels/large cards 10px, dialogs 16px, full (height/2) for buttons, avatars, search; when nesting use inner = outer - gap for focus rings, optical balance elsewhere.
  **Why** Larger objects carry larger radii so gaps look even; a formula mismatch in cards looks worse than optical tuning.
  **Applies to** SaaS app UI | landing page.
  **Check** Child radius <= parent radius in nested boxes; distinct radii <= 6.
  **Source** rounding.md; layout.json corner-radius-*

- **RULE** Use density as a property of collections and containers only: compact = spacing tokens one step down, spacious = one step up (e.g. table item padding compact spacing-100 8px / regular spacing-200 12px / spacious spacing-300 16px; card edge-to-content medium 12 / 16 / 20); do not make buttons or text fields taller to "be spacious" (use the size ladder instead).
  **Why** Density and size are orthogonal; conflating them destroys the size hierarchy.
  **Applies to** SaaS app UI.
  **Check** Control heights stay on {20, 24, 32, 40, 48, 56, 64}; table row padding is one of the three densities.
  **Source** component-spacing.md; table.json table-item-padding-*; card.json card-edge-to-content-*

- **RULE** For every component write the state-support table (Default, Hover, Down, Keyboard focus, Disabled, Selected, Dragged, Error) and mark unsupported states explicitly; an unsupported state is a decision recorded, not a gap.
  **Why** Teams otherwise improvise missing states differently.
  **Applies to** all.
  **Check** Spec file for each component contains all eight state keys with supported/not-supported values.
  **Source** components/button.md, text-field.md, tabs.md States sections

- **RULE** Button content standard: verb label, 1-2 words (max 4), < 20 characters, sentence case, no punctuation, same word as elsewhere in the flow ("Sign up" not "Submit"); min width 2.25x height; horizontal padding = half the height; pending state only for actions expected under 5 seconds and only after a 1 second delay.
  **Why** Labels name the outcome; the delay avoids spinner flicker.
  **Applies to** landing page | forms | SaaS app UI.
  **Check** Button text length <= 20 chars, no trailing punctuation, starts with a verb (lint list); computed `min-width >= 2.25 x height`.
  **Source** components/button.md (Behaviors, Content standards)

## 3. Numbers & scales

| Group | Values |
|---|---|
| Type sizes (desktop / mobile) | 10/12, 11/13, 12/15, 14/17, 16/19, 18/22, 20/24, 22/27, 25/31, 28/34, 32/39, 36/44, 40/49, 45/55, 51/62, 58/70, 65/79, 73/88 |
| Line heights (desktop) | 10 -> 12; 11 -> 14; 12 -> 16; 14 -> 18; 16 -> 20; 18 -> 22; 20 -> 24; 22 -> 26; 25 -> 30; 28 -> 32; 32 -> 36; 36 -> 42; 40 -> 46; 45 -> 52; 51 -> 58; 58 -> 66; 65 -> 74; 73 -> 84; body/code 1.5; CJK 1.5 and 1.7 |
| Weights | heading 800 (light 300, heavy 900), title 700, body 400, detail 500, code 400 |
| Spacing | 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96 |
| Container padding | spacing-100 8 XS card; 200 12 high-density panel / small card; 300 16 medium; 400 24 low-density panel, large card, mobile dialogs; 500 32 desktop dialogs; 600 40 takeover dialog |
| Component heights (desktop / mobile) | 20/26, 24/30, 32/40 (default), 40/50, 48/60, 56/70, 64/80 |
| Radius | 0, 3, 4, 5, 6, 7, 8, 9, 10, 16, full = height/2; defaults small 4, medium 8, large 10, XL 16 |
| Border | 1, 2 (default), 4 px; focus indicator 2px thick, 2px gap; side indicator 4px |
| Shadows | emphasized `0 2px 8px 8% / 0 1px 4px 4% / 0 0 1px 8%`; emphasized-hover & elevated `0 4px 12px 8% / 0 2px 6px 4% / 0 0 2px 12%`; dragged `0 12px 16px 8% / 0 6px 8px 4% / 0 0 6px 16%`; dark x3 |
| Durations [secondary] | 0, 130, 160, 190, 220, 250, 300, 350, 400, 450, 500, 1000, 2000, 3000 ms |
| Easings [secondary] | ease-in-out (0.45,0,0.4,1); ease-in (0.5,0,1,1); ease-out (0,0,0.4,1); linear |
| Neutral light | gray-25 `#ffffff`, 50 `#f8f8f8`, 75 `#f3f3f3`, 100 `#e9e9e9`, 200 `#e1e1e1`, 300 `#dadada`, 400 `#c6c6c6`, 500 `#8f8f8f`, 600 `#717171`, 700 `#505050`, 800 `#292929`, 900 `#131313`, 1000 `#000000` |
| Neutral dark | gray-25 `#111111`, 50 `#1b1b1b`, 75 `#222222`, 100 `#2c2c2c`, 200 `#323232`, 300 `#393939`, 400 `#444444`, 500 `#6d6d6d`, 600 `#8a8a8a`, 700 `#afafaf`, 800 `#dbdbdb`, 900 `#f2f2f2`, 1000 `#ffffff` |
| Accent | blue-900 light `#3b63fb`, dark 800 `#4069fd`; hover 1000 / 700; focus ring blue-800 |
| Semantic 900 | negative `#d73220`, positive `#05834e`, notice `#c24e00` (light) |
| Contrast [computed] | gray-600 4.88:1, gray-500 3.23:1, blue-900 4.81:1 on white |
| Sizes of controls | switch 26x16 (M), checkbox 16 (M), workflow icon 18 (M); toast max-width 336, height 52; tooltip max 160, tip 10x5; side nav 192 wide (144-240); standard dialog 288 min, 400/480/640 max |
| Icon stroke | 1.5px (outline icons) |

## 4. Dos and Don'ts

- **Do** use gray-25 as the base and let the accent colour be the only chroma in a view; **Don't** also colour the selected nav item blue next to a blue primary button.
- **Do** place static black on yellow/orange/chartreuse/celery fills; **Don't** place white text on them.
- **Do** keep a single border width; **Don't** vary widths to "add interest".
- **Do** use tokens with a name that states a purpose (`accent-content-color-default`); **Don't** pick `blue-900` directly unless no semantic token fits.
- **Do** let fully rounded end caps sit on floating dividers and square caps on edge-to-edge dividers.
- **Don't** apply a drop shadow to every container: "generally only one group at a time should be emphasized".

## 5. Exceptions & judgement calls

- Adobe Clean is not licensable outside Adobe. The scale (14px base, per-size line heights, weights 800/700/500/400) can be reproduced with a different face, but Adobe Clean "is generally a size smaller than system fonts" (docs), so bind a substitute with about +1px optical size or re-check sizes. [engine note on the docs remark]
- Heading default weight is 800, with Black (900) only >= 18px for brand headings (Adobe Express does this): a deliberate weight contrast against body 400 that other systems here do not use.
- Down-state shrink tokens (-2px, 0.3333 ratio, 24-96px perspective clamp) exist but their exact application formula is not documented in the pages read. Treat as "press scales the control slightly", unverified.
- Border/focus numbers are in the dev tokens (2px/2px) but the S2 docs also state focus rings use `outer radius - gap = inner radius`; both hold.
- S1 CSS animation tokens are the only public numeric motion values; S2 docs describe motion only qualitatively. Mark as best public.
- "Wireframe" is a third palette set (blue-tinted grays) next to light and dark; not described in docs read. unknown purpose beyond wireframing.

## 6. Figures worth keeping

n/a (images not downloaded). Worth opening: spectrum.adobe.com/foundations/attention-hierarchy (button and card attention scale), /foundations/layout-and-structure/spacing/overview (proximity diagrams), /foundations/color/grays (light/dark gray ladders with contrast chart).

## 7. Open questions

- Exact S2 mobile vs desktop breakpoint rule (the tokens give two scales; docs say responsive guidance "in progress").
- Whether S2 documents an easing curve: not found; `animation-*` values come from Spectrum 1 CSS tokens (`@spectrum-css/tokens` 16.0.2).
- Control sizes per component name (XS..XL) map to component-height-50..300 by sequence; confirmed for tabs (`tab-item-compact-height-small = component-height-75`, medium 100, large 200, XL 300) but not read for every component.
- Whether the hue list (18 families) is all supported in dark theme guidance for data visualisation: the docs point to a separate categorical palette.
