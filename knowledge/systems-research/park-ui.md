---
source: web:https://park-ui.com/docs/theming
chapter: Park UI (Panda CSS preset on Ark UI, Radix Colors 12-step scales)
pages: n/a (web; repo chakra-ui/park-ui @ 102769c (2026-02-21), packages/preset; chakra-ui/ark main, @ark-ui/react 5.39.3; Panda preset-panda 2.1.2; studied 2026-10-08)
topic_tags: [design-systems, tokens, recipes, color, radix-colors, variants, sizes, radius, panda]
status: studied
---

# Park UI / Ark UI

Machine-readable profile: `system/systems-research/park-ui.json`. Ark UI is the headless, state-machine (Zag.js) behaviour layer for React, Solid, Vue and Svelte (https://ark-ui.com, MIT, repo github.com/chakra-ui/ark, packages: react, solid, svelte, vue, mcp; about 60 components). Park UI is the styled layer: a Panda CSS preset plus copy-paste recipes for Ark components. Sources: packages/preset/src (index.ts, recipes/*.ts, theme/colors/*.ts, theme/tokens/*.ts, theme/text-styles.ts, theme/layer-styles.ts), website/src/content/docs/theming.mdx and introduction.mdx, https://park-ui.com/docs/theming , https://park-ui.com/docs/introduction , Radix scale docs https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale . Licence MIT. Raw excerpts: `corpus/web/systems/park-ui/`.

## 1. Core ideas

1. **One accent + one gray.** The whole palette is two decisions made at init: an accent (25 chromatic hues or neutral) and a gray (neutral, mauve, olive, sage, sand, slate). Pairings: mauve with tomato/red/ruby/crimson/pink/plum/purple/violet; slate with iris/indigo/blue/sky/cyan; sage with mint/teal/jade/green; olive with grass/lime; sand with yellow/amber/orange/brown; neutral with anything.
2. **12 steps with fixed jobs.** Radix scale: 1 app bg, 2 subtle bg, 3 component bg, 4 hover, 5 pressed/selected, 6 subtle border, 7 interactive border, 8 strong border/focus ring, 9 solid, 10 solid hover, 11 low-contrast text, 12 high-contrast text. Each step is hand-authored for light and dark, so the role stays constant across modes. Steps 11 and 12 are guaranteed APCA Lc 60 / Lc 90 on step 2 of the same scale.
3. **Alpha twins.** Each scale also has a1-a12 (the same colours as transparencies). Variant tints (subtle, surface, outline, plain) use alpha steps so they composite correctly on any surface.
4. **Five variants, same names everywhere.** solid (high-contrast fill; primary CTA), subtle (tinted; badges, tags, selected), surface (tinted + visible border; cards, menu items, selectable lists), outline (border only; secondary, cancel, filters), plain (text/ghost; links, tabs). Every component's recipe addresses `colorPalette.{variant}.{bg|border|fg}.{hover|active}`.
5. **Alignment by size class.** Primary components (Button, Input, Select, Tabs) and secondary components (Badge, Checkbox, Switch) each share one height per size token; a `md` Button and `md` Input are both 40px.
6. **Nested radii.** l1 (2px) sits inside l2 (4px) which sits inside l3 (6px). Controls are l2, panels l3.
7. **Bright palettes get dark text.** amber, yellow, lime, mint, sky solids use gray.12 (light) / gray.1 (dark) as foreground.
8. **Recipes are data owned by the project.** Recipes are copied into the app (CLI) and bind to Ark anatomy parts; state comes from data attributes (data-state open/closed/checked/selected, data-orientation).
9. **Honest sizing ladder.** Primary heights 24 / 32 / 36 / 40 / 44 / 48 / 64 px for 2xs..2xl, default md 40.
10. **Asymmetric motion.** Enter longer than exit: menu, tooltip, popover 150ms in / 100ms out; select 250 in / 50 out; dialog 200 in / 150 out.

## 2. Rules

- **RULE** Build the colour system from one accent hue and one gray whose hue matches it (mauve for pink to violet, slate for blue/indigo/cyan, sage for green/teal, olive for grass/lime, sand for yellow/amber/orange); use plain neutral when the accent is arbitrary.
  **Why** A tinted gray echoes the accent hue, which makes surfaces and borders feel designed rather than assembled; neutral avoids clashes when unsure.
  **Applies to** SaaS app UI | landing page | all
  **Check** In the project spec, the gray ramp's hue angle is within about 30 degrees of the accent hue, or the gray is chroma < 0.01 neutral.
  **Source** https://park-ui.com/docs/theming ("Pairings")

- **RULE** Give every hue and gray a 12-step ramp per mode whose steps have fixed jobs (1 canvas, 2 subtle bg, 3 component, 4 hover, 5 pressed, 6 border subtle, 7 border interactive, 8 border strong/focus, 9 solid, 10 solid hover, 11 low text, 12 high text) and a matching 12-step alpha ramp.
  **Why** Role-bound steps make state colours predictable and make light and dark mode a swap of values, not of logic.
  **Applies to** all
  **Check** For each ramp assert luminance monotonic over steps 1-8 (direction per mode) and step 11 text on step 2 background >= 4.5:1 (measured blue.11 on blue.2 = 4.53:1; red.11 on red.2 = 4.94:1).
  **Source** Radix understanding-the-scale; theme/colors/*.ts

- **RULE** Fix a shared variant vocabulary (solid, subtle, surface, outline, plain) and implement each as bg / border / fg with hover and active tokens, tinted variants from alpha steps (subtle: a3, hover a4, active a5, fg a11; surface: bg a2, border a6, border hover a7; outline: border a7, hover bg a2, active a3; plain: hover a3, active a4).
  **Why** One vocabulary lets any two components sit together; alpha tints stay correct on any canvas.
  **Applies to** SaaS app UI | forms
  **Check** Component spec table: every component lists which of the 5 variants it supports; hover differs from rest by one alpha step.
  **Source** theme/colors/blue.ts; recipes/button.ts, badge.ts

- **RULE** Align heights across component families with two ladders: primary controls 24 / 32 / 36 / 40 / 44 / 48 / 64 px (2xs..2xl) and secondary controls (badge 18-28, switch 16-22, checkbox 18-20) tied to the same size keys; the same size key yields the same height for Button, Input and Select.
  **Why** Adjacent controls of the same size line up on one baseline and keep rhythm in toolbars and forms.
  **Applies to** SaaS app UI | forms
  **Check** Button and Input at size md both measure 40px; the heights set is {24,32,36,40,44,48,64}.
  **Source** recipes/button.ts, input.ts; https://park-ui.com/docs/theming ("Sizing")

- **RULE** Use bright-palette foreground overrides: for amber, yellow, lime, mint and sky solid fills use dark text (gray.12 in light, gray.1 in dark) and keep white text for other hues; document the exception per palette.
  **Why** High-lightness fills cannot carry white text (amber.9 with gray.12 = 10.32:1; white would be 1.58:1).
  **Applies to** all
  **Check** For each solid fill compute both foreground candidates; choose the one with >= 4.5:1 (or >= 3:1 if text >= 18.66px bold); fail the palette otherwise.
  **Source** theme/colors/amber.ts (solid.fg)

- **RULE** Use nested radius tokens l1 < l2 < l3 (2 / 4 / 6 px by default) and apply them by layer: inner elements l1, controls l2, panels/containers l3; the outer radius should be about the inner radius plus the padding between them.
  **Why** Concentric corners only look right when radii step with the nesting depth.
  **Applies to** all
  **Check** For nested rounded boxes, outer radius > inner radius; the set of radii used on the page is a subset of the tokens.
  **Source** https://park-ui.com/docs/theming ("Border Radius"); packages/preset/src/index.ts (radii l1-l3)

- **RULE** Pair open and close durations asymmetrically using a small duration scale (50, 100, 150, 200, 250, 300, 400ms): floating panels 150ms in and 100ms out, selects 250ms in and 50ms out, dialogs 200ms in and 150ms out.
  **Why** Entering needs to be legible; leaving should not block the next action.
  **Applies to** SaaS app UI | landing page
  **Check** Computed animation-duration of [data-state=closed] <= [data-state=open] on every overlay component.
  **Source** theme/tokens/durations.ts; recipes/menu.ts, select.ts, dialog.ts, popover.ts, tooltip.ts

- **RULE** Encode disabled once as a shared layer style (cursor not-allowed, opacity 0.67, grayscale 100%) and focus once as a utility with two geometries (outside for actionables: 2px ring at 2px offset; inside for fields and panels: 1px at 0 offset) coloured with the palette's solid step.
  **Why** One definition prevents per-component drift; the geometry fits each component's edge.
  **Applies to** all
  **Check** Disabled controls compute opacity 0.67 with grayscale filter; focus-visible shows outline-width 2px offset 2px on buttons.
  **Source** theme/layer-styles.ts; recipes/button.ts (focusVisibleRing outside), input.ts (inside)

- **RULE** Keep the preset small and copy recipes into the project; define custom variants by editing the recipe, not by wrapping or overriding the component.
  **Why** The recipe is the single source for variant x size x state; wrappers fragment it.
  **Applies to** all
  **Check** Grep component sources for className overrides of colour/spacing set by recipes; count should be zero in system components.
  **Source** https://park-ui.com/docs/introduction ("Open Code")

- **RULE** Do not assume solid fills meet AA: measured white text on blue.9 is 3.26:1, red.9 3.91:1, green.9 3.16:1; require a darker solid step, bold 18.66px+ text, or a different foreground.
  **Why** [engine note] Radix step 9 is tuned for chroma, not for WCAG 2 contrast with white; the Radix guarantee covers steps 11-12 text on step 2 backgrounds, not step 9 fills.
  **Applies to** all
  **Check** Contrast(fg, solid.bg) >= 4.5:1 for text under 18.66px bold.
  **Source** this study (WCAG 2 relative luminance); Radix docs

## 3. Numbers & scales

| Item | Value |
|---|---|
| spacing | 0.25rem base; keys 0.5 (2px), 1 (4), 1.5 (6), 2 (8), 2.5 (10), 3 (12), 3.5 (14), 4 (16), 4.5 (18), 5 (20), 5.5 (22), 6 (24), 7 (28), 8 (32) ... 96 (384) |
| radii tokens | xs 2, sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24, 4xl 32, full 9999; layers l1 = xs, l2 = sm, l3 = md |
| text styles (px size / line-height) | xs 12/18, sm 14/20, md 16/24, lg 18/28, xl 20/30, 2xl 24/32, 3xl 30/38, 4xl 36/44, 5xl 48/60, 6xl 60/72, 7xl 72/92; tracking -0.02em from 4xl; label 14/20 medium |
| primary control heights | 2xs 24, xs 32, sm 36, md 40, lg 44, xl 48, 2xl 64 |
| button padding-x | 8, 10, 12, 14, 16, 18, 24 |
| badge height | sm 18, md 20, lg 22, xl 24, 2xl 28 |
| switch w x h | xs 32x16, sm 36x18, md 40x20, lg 44x22 |
| durations | fastest 50, faster 100, fast 150, normal 200, slow 250, slower 300, slowest 400 ms |
| easing | default cubic-bezier(0.4,0,0.2,1); in (0.4,0,1,1); out (0,0,0.2,1) |
| z-index | hide -1, base 0, docked 10, dropdown 1000, sticky 1100, banner 1200, overlay 1300, modal 1400, popover 1500, skipLink 1600, toast 1700, tooltip 1800 |
| font weights | button/tabs/heading 600, label/badge 500 |
| disabled | opacity 0.67, grayscale 100%, cursor not-allowed |

Neutral light ramp: #fcfcfc, #f9f9f9, #f0f0f0, #e8e8e8, #e0e0e0, #d9d9d9, #cecece, #bbbbbb, #8d8d8d, #838383, #646464, #202020; dark: #111111, #191919, #222222, #2a2a2a, #313131, #3a3a3a, #484848, #606060, #6e6e6e, #7b7b7b, #b4b4b4, #eeeeee. Blue 9 = #0090ff in both modes (dark 10 = #3b9eff). Semantic aliases: canvas gray.1, fg.default gray.12, fg.muted gray.11, fg.subtle gray.10, border gray.4, error red.9. Measured contrast: gray.11 on canvas 5.77, gray.10 on canvas 3.70, dark gray.11 on gray.1 9.11, dark gray.10 on gray.1 4.46, blue.12 on blue.2 12.00, amber.9 with gray.12 10.32, sky.9 with gray.12 10.99.

## 4. Dos and Don'ts

- Do: `Button variant="solid"` for the single primary CTA, `outline` for cancel, `plain` for text actions. Don't: use `surface` for a primary CTA (low emphasis).
- Do: choose gray = slate when accent = blue. Don't: pair a warm sand gray with a cool iris accent (hue clash).
- Do: write new variants as additional keys in the recipe. Don't: patch a Button with ad-hoc `bg=` overrides.

## 5. Exceptions & judgement calls

- Neutral solid inverts (black fill in light, white in dark) and its hover is gray.12; it is the only palette whose solid is not step 9.
- Park UI ships no typeface or font weights beyond Panda defaults. [engine note] A house system built on this must specify type.
- The docs describe a border-radius picker, but the studied CLI returns a fixed l1/l2/l3 = xs/sm/md mapping. Treat radius as editable tokens, not a working CLI option.
- Ark UI components are unstyled; any "Ark" look is Park UI's recipes. Ark components emit data-scope, data-part, data-state attributes that the recipes' conditions target.
- Alpha tints mean the same token resolves to different final colours on different surfaces; contrast must be checked on the real surface.

## 6. Figures worth keeping

- Park UI docs "Pairings" grid and ComponentSizing graphic (https://park-ui.com/docs/theming): shows heights 32/36/40/44/48/64 with icon sizes.
- Radix scale diagram (understanding-the-scale page): 12 steps and their jobs.

## 7. Open questions

- Card padding and per-size values, Table density and Dialog sizes not extracted.
- Figma kit contents (docs/figma) not reviewed.
- Which Park UI spec is the "default" accent/gray in a fresh init (the CLI prompts; no default read).
- Ark UI has about 60 components; the Park UI doc set lists 59 pages plus extra recipes (listed in the JSON). Counts differ because some recipes are variants or utilities.
