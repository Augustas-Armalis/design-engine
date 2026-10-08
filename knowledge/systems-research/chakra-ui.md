---
source: web:https://chakra-ui.com/docs/theming/overview
chapter: Chakra UI v3 (tokens, semantic tokens, colorPalette, recipes and slot recipes)
pages: n/a (web; repo chakra-ui/chakra-ui @ f799e4d, @chakra-ui/react 3.37.0, studied 2026-10-08)
topic_tags: [design-systems, tokens, semantic-tokens, recipes, color, variants, sizes, dark-mode]
status: studied
---

# Chakra UI v3

Machine-readable profile: `system/systems-research/chakra-ui.json`. Primary sources: packages/react/src/theme (tokens/, semantic-tokens/, recipes/, text-styles.ts, layer-styles.ts, global-css.ts), packages/react/src/preset-base.ts (focus ring utilities); docs https://chakra-ui.com/docs/theming/overview , https://chakra-ui.com/docs/theming/semantic-tokens , https://chakra-ui.com/docs/theming/recipes , https://chakra-ui.com/docs/theming/slot-recipes . Licence MIT. Raw excerpts: `corpus/web/systems/chakra-ui/`.

## 1. Core ideas

1. **Three-tier tokens.** Raw tokens (colors.blue.600, spacing.4, radii.sm) are never used by components. Semantic tokens (bg, fg.muted, border.emphasized, colorPalette.solid) are the public API and carry `{_light, _dark}` values. Recipes consume only semantic tokens.
2. **colorPalette is a virtual colour.** Setting `colorPalette="blue"` on any element makes `colorPalette.solid`, `.fg`, `.subtle`, `.muted`, `.emphasized`, `.contrast`, `.focusRing`, `.border` resolve to blue. One recipe serves every hue; colour is a third axis independent of variant and size.
3. **Every palette honours the same 8-role contract.** contrast, fg, subtle, muted, emphasized, solid, focusRing, border (see semantic-tokens/colors.ts). Light blue: fg 700, subtle 100, muted 200, emphasized 300, solid 600, border 500, focusRing 500. Dark blue: fg 300, subtle 900, muted 800, emphasized 700, solid 600, border 400.
4. **Recipes encode variant x size (x palette) as data.** Button: variants solid, subtle, surface, outline, ghost, plain; sizes 2xs-2xl; defaultVariants size md, variant solid. Slot recipes do the same per anatomy part (root, title, description, header, body, footer for Card).
5. **Neutral hierarchy by name.** bg / bg.subtle / bg.muted / bg.emphasized / bg.panel / bg.inverted, fg / fg.muted / fg.subtle / fg.inverted, border / .muted / .subtle / .emphasized / .inverted, plus status variants (error, warning, success, info) for each.
6. **Radius is semantic.** l1 = xs (2px), l2 = sm (4px), l3 = md (6px): controls l2, containers l3, nested pieces l1.
7. **Text style = size + leading (+ tracking).** `textStyle="sm"` is 14/20, `md` 16/24, `4xl` 36/44 with -0.025em. Leading and size cannot be separated.
8. **Borders as inset shadows.** Surface and outline variants use `0 0 0 1px` inset shadow in palette muted/border so no layout shift.
9. **Focus is a utility with three geometries.** `focusVisibleRing: outside` (2px, 2px offset), `inside` (1px, 0 offset, border coloured), `mixed` (3px at 40% alpha). Colour is `colorPalette.focusRing`.
10. **Shadows adapt to mode.** Light: gray.900 at 10% plus a 1px hairline at 30%; dark: black at 64% plus a 1px inset light edge (gray.300 at 20-30%).

## 2. Rules

- **RULE** Specify every colour with the same eight roles (contrast, fg, subtle, muted, emphasized, solid, focusRing, border), each defined for light and dark, so any component recipe can be written once and re-hued by swapping the palette.
  **Why** Uniform role names remove per-hue special cases and make adding a brand colour mechanical.
  **Applies to** SaaS app UI | all
  **Check** For each palette in the system spec, assert all 8 role keys exist for both modes; assert solid vs contrast >= 4.5:1 in both modes.
  **Source** semantic-tokens/colors.ts; https://chakra-ui.com/docs/theming/semantic-tokens

- **RULE** Components may reference only semantic tokens (bg.*, fg.*, border.*, colorPalette.*), never raw scale steps; raw steps appear only inside the semantic layer.
  **Why** A single indirection point makes dark mode, rebrands and white-labelling a token edit.
  **Applies to** all
  **Check** Grep component CSS/recipes for raw scale references (blue.600, #hex); count must be zero outside the semantic token file.
  **Source** https://chakra-ui.com/docs/theming/recipes ("Common tokens: bg, fg, border, colorPalette.*")

- **RULE** Encode each component as a recipe with explicit axes: variant (solid, subtle, surface, outline, ghost, plain), size (e.g. 2xs 24, xs 32, sm 36, md 40, lg 44, xl 48, 2xl 64 px heights), and palette as an independent third axis; declare defaultVariants.
  **Why** Separating axes prevents variant x colour x size explosions and makes the spec complete by construction.
  **Applies to** SaaS app UI | forms
  **Check** For each component, list variant, size and state coverage in the spec; every cell of the grid must be defined or explicitly marked not-applicable.
  **Source** theme/recipes/button.ts, input.ts, badge.ts

- **RULE** Derive hover from the variant, not from a global dim: solid hovers to solid at 90%, subtle and surface hover to the muted step, outline and ghost hover to the subtle step; expanded uses the same colour as hover.
  **Why** Each emphasis level moves one step in its own ramp, keeping hierarchy under interaction.
  **Applies to** SaaS app UI | landing page
  **Check** Computed hover background of each variant differs from rest by one ramp step (or 10% alpha) and never crosses into another variant's rest colour.
  **Source** theme/recipes/button.ts

- **RULE** Couple font-size to line-height (and, from 36px upward, to -0.025em tracking) in a named text style: 12/16, 14/20, 16/24, 18/28, 20/30, 24/32, 30/38, 36/44, 48/60, 60/72, 72/92.
  **Why** A size without its leading is a common source of cramped or loose type; naming the pair enforces consistency.
  **Applies to** all
  **Check** For every text element, (font-size, line-height) must match one of the style pairs; headings at >= 36px must have letter-spacing <= -0.02em.
  **Source** theme/text-styles.ts

- **RULE** Use three semantic radius layers: inner l1 (2px), control l2 (4px), container l3 (6px), such that the container radius equals the inner radius plus its padding intent; tune brand character by re-pointing the three tokens.
  **Why** Nested rounded shapes only look concentric when radii step consistently.
  **Applies to** all
  **Check** Inspect border-radius for nested pairs (card > button); inner radius < outer radius.
  **Source** theme/semantic-tokens/radii.ts; park-ui docs https://park-ui.com/docs/theming

- **RULE** Draw outline and surface borders as 1px inset box-shadow (not CSS border) in the palette's muted or border role, and keep a real 1px border only where the element needs focus-inside geometry (inputs).
  **Why** No 1px layout shift between variants; borders stack cleanly with other shadows.
  **Applies to** SaaS app UI
  **Check** Compare offsetWidth/Height of the same component rendered in solid vs outline variant; they must be equal.
  **Source** theme/recipes/button.ts (surface, outline), alert.ts, badge.ts

- **RULE** Disabled is a single shared layer style (opacity 0.5 plus a dedicated cursor token not-allowed) applied by condition, not re-specified per component; define cursor tokens (button pointer, checkbox default, disabled not-allowed, menuitem default).
  **Why** One rule keeps disabled consistent and keeps native-feeling cursors on form primitives.
  **Applies to** forms | SaaS app UI
  **Check** Every :disabled control computes opacity 0.5 and cursor not-allowed; checkbox/radio/option cursor is default.
  **Source** theme/layer-styles.ts (disabled), tokens/cursor.ts

- **RULE** Pick focus geometry per component class: outside ring (2px, offset 2px) for buttons and links, inside (1px, no offset, border recoloured) for text fields and tab panels, in the palette's focusRing colour at 500.
  **Why** Rings that match the component's edge condition stay visible without overlapping neighbours.
  **Applies to** all
  **Check** On :focus-visible, outline-width >= 1px; buttons show outline-offset 2px; inputs show border-color changed to the focus colour.
  **Source** preset-base.ts (createFocusRing)

- **RULE** Make exit animations shorter than enter animations (select: fast 150ms in, fastest 50ms out; popover and menu: fast 150ms in, faster 100ms out) and tie durations to a named scale (50, 100, 150, 200, 300, 400, 500ms).
  **Why** Closing feels responsive while entering reads as intentional.
  **Applies to** SaaS app UI | landing page
  **Check** Computed animation-duration for [data-state=closed] <= that of [data-state=open] on popovers and selects.
  **Source** theme/tokens/durations.ts; theme/recipes/select.ts, popover.ts, menu.ts

- **RULE** Give shadows a dark-mode counterpart: light = gray.900 at 10% soft layer plus a 1px hairline at 20-30%; dark = black at 64% plus a 1px inset light edge (gray.300 at 20-30%).
  **Why** Drop shadows vanish on dark surfaces; an inner highlight edge preserves elevation.
  **Applies to** all
  **Check** In dark mode, elevated surfaces have an inset 1px light-alpha edge or a lighter surface step; box-shadow alone on #09090B is insufficient.
  **Source** theme/semantic-tokens/shadows.ts

## 3. Numbers & scales

| Scale | Values |
|---|---|
| spacing base | 0.25rem = 4px; keys 0.5 (2px), 1 (4), 1.5 (6), 2 (8), 2.5 (10), 3 (12), 3.5 (14), 4 (16), 4.5 (18), 5 (20), 6 (24), 7 (28), 8 (32), 9 (36), 10 (40), 11 (44), 12 (48), 14 (56), 16 (64), 20 (80), 24 (96) |
| radii | none 0, 2xs 1, xs 2, sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24, 4xl 32, full 9999 |
| font sizes | 2xs 10, xs 12, sm 14, md 16, lg 18, xl 20, 2xl 24, 3xl 30, 4xl 36, 5xl 48, 6xl 60, 7xl 72, 8xl 96, 9xl 128 |
| line-height tokens | shorter 1.25, short 1.375, moderate 1.5, tall 1.625, taller 2 |
| letter-spacing | tighter -0.05em, tight -0.025em, wide 0.025em, wider 0.05em, widest 0.1em |
| durations | 50, 100, 150, 200, 300, 400, 500ms |
| easings | ease-in (0.42,0,1,1), ease-out (0,0,0.58,1), ease-in-out (0.42,0,0.58,1), ease-in-smooth (0.32,0.72,0,1) |
| breakpoints | sm 480, md 768, lg 1024, xl 1280, 2xl 1536 px |
| z-index | hide -1, base 0, docked 10, dropdown 1000, sticky 1100, banner 1200, overlay 1300, modal 1400, popover 1500, skipNav 1600, toast 1700, tooltip 1800 |
| control heights (Button/Input) | 2xs 24, xs 32, sm 36, md 40 (default), lg 44, xl 48, 2xl 64 |
| Button padding-x | 2xs 8, xs 10, sm 14, md 16, lg 20, xl 20, 2xl 28 |
| Badge min-height | xs 16, sm 20, md 24, lg 28 |
| Card padding | sm 16, md 24, lg 28 |
| shadow ramp | xs 0 1 2 / sm 0 2 4 / md 0 4 8 / lg 0 8 16 / xl 0 16 24 / 2xl 0 24 40 (gray.900 at 10%, 2xl 16%) + 0 0 1 at 30% |
| border widths | 0.5, 1, 2, 4, 8px |

Colour scale: neutrals are zinc (#fafafa, #f4f4f5, #e4e4e7, #d4d4d8, #a1a1aa, #71717a, #52525b, #3f3f46, #27272a, #18181b, #111111); canvas dark = #09090B. Measured contrast: white on blue.600 5.17, white on red.600 4.83, black on yellow.300 15.09, blue.700 on blue.100 7.63, fg.muted on white 7.73, fg.subtle on white 2.56.

## 4. Dos and Don'ts

- Do: `<Button colorPalette="red" variant="subtle">`; the same recipe yields red.100 bg, red.700 text, hover red.200. Don't: hard-code `bg="red.100"` in a component.
- Do: pair `fg.muted` for secondary text (7.73:1). Don't: use `fg.subtle` for body copy (2.56:1).
- Do: use the surface variant for tinted bordered chips with inset shadow border. Don't: add `border` to one variant and not another (size jump).

## 5. Exceptions & judgement calls

- Yellow's contrast token is black in both modes and orange's flips with mode; contrast cannot be assumed white. [engine note] Our spec per palette must state the contrast colour explicitly.
- Sizes sm and md share the same text style (14px) while height changes 36 to 40; sizes xl and lg share 16px. The ladder is height-led, not type-led.
- No compoundVariants are used in the shipped theme (colour comes from colorPalette), although the API supports them.
- Inter is the named font but is not bundled. [engine note] A house system must ship or self-host its fonts.
- Hover colours use opacity (solid/90) which can change perceived hue on non-white surfaces. [engine note]

## 6. Figures worth keeping

n/a (web source).

## 7. Open questions

- Pressed/active states are not specified in the default recipes. Unknown whether intended.
- Precise 700-950 hand-tuned colour generation method not documented (values read directly from tokens/colors.ts).
- Component-level durations for toast, drawer and tabs indicator were not exhaustively read; the table above lists those verified.
- v2 versus v3 visual comparison not verified.
