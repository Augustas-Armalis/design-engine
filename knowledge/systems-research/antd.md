---
source: web:https://ant.design (docs/react/customize-theme, docs/spec/*, migration-v6) + github.com/ant-design/ant-design (components/theme/**) + github.com/ant-design/ant-design-colors (src/generate.ts) + npm antd@5.29.3 and antd@6.6.5 (getDesignToken output dumped locally)
chapter: Ant Design 5/6: seed -> map -> alias token derivation, palette generation, dark and compact algorithms
pages: n/a (web, repo source and npm packages, fetched 2026-10-08)
topic_tags: [design-system, tokens, ant-design, algorithm, palette-generation, dark-mode, compact, density, enterprise, css-in-js, color]
status: studied
---

# Ant Design 5 / 6 (token derivation algorithm)

Machine profile: `system/systems-research/antd.json`. Raw fetches: `corpus/web/systems/antd/` (src/themes/** = verbatim theme source from master, src/generate.ts = palette generator, tokens-v5.json / tokens-v6.json = `theme.getDesignToken()` for default / dark / compact / dark+compact of antd 5.29.3 and 6.6.5, docs/*.md = spec and migration pages, comp/*.ts = component token files). Licence: MIT (antd, @ant-design/colors 8.0.1, cssinjs, fast-color, icons). antd is currently **6.6.5** (`latest`); **5.29.3** is `latest-5`. v6 is "primarily a technical upgrade" (React >= 18, CSS variables by default, `zeroRuntime` static CSS, semantic `classNames`/`styles` slots, DOM changes); the token algorithm below is unchanged: diffing `getDesignToken()` between 5.29.3 and 6.6.5 shows only added keys (`blueHover/Active` for each preset, `colorBorderDisabled`, `colorShadow`, `dropShadowPopover`, `focusOutline`, `screenXXXL`) and a slightly stronger `boxShadowTertiary` (alpha .05/.03/.03 vs .03/.02/.02).

Evidence grading: **[verified]** read from source or computed from the real package output; **[computed]** my script on those values; **[engine note]** my judgement.

## 1. Core ideas

1. **The theme is a function.** `theme.algorithm` takes seed tokens and returns map tokens; `defaultAlgorithm`, `darkAlgorithm`, `compactAlgorithm` are alternative functions and can be composed as an array (`[darkAlgorithm, compactAlgorithm]`); compact receives the previous map and rewrites only size, font and height [verified: themes/compact/index.ts].
2. **Three layers with an explicit owner.** Seed (designer intent: about 35 inputs) -> Map (algorithmic gradients, e.g. `colorPrimaryHover`) -> Alias (developer-facing renames and small expressions). Merge precedence "Seed (designer) > Derivative (designer) > Alias (developer)" [verified: util/alias.ts]. Component tokens sit beside this, overriding per component and (>= 5.8) optionally re-running an algorithm.
3. **One colour in, a full role family out.** For each of colorPrimary, Success, Warning, Error, Info and Link, a 10-swatch palette is generated and mapped to fixed role names by index: Bg = 1, BgHover = 2, Border = 3, BorderHover = 4, Hover = 5, base = 6, Active = 7, TextHover = 8, Text = 9, TextActive = 10 [verified: genColorMapToken.ts]. For `#1677ff`: `#e6f4ff #bae0ff #91caff #69b1ff #4096ff #1677ff #0958d9 #003eb3 #002c8c #001d66` [verified: tokens-v6.json].
4. **Neutrals are alphas, not a ramp.** Text = text-base at 88 / 65 / 45 / 25 %, fills = text-base at 15 / 6 / 4 / 2 %; surfaces are the background base shifted by HSL lightness (light: layout -4 %, border -15 %, border-secondary -6 %; dark: container +8, elevated +12, spotlight +26, border +26, border-secondary +19). Any bg/text base re-derives the lot [verified: default/colors.ts, dark/colors.ts].
5. **Size system from three numbers.** `sizeUnit` 4 x `sizeStep` 4 -> size 16; `sizeXXL = unit x (step + 8)` = 48, XL 32, LG 24, MD 20, MS 16, SM 12, XS 8, XXS 4. `controlHeight` 32 -> SM 24 (x0.75), XS 16 (x0.5), LG 40 (x1.25). Compact: `sizeStep - 2` and `controlHeight - 4` (28, 21, 14, 35) [verified: genSizeMapToken.ts, genControlHeight.ts, compact/genCompactSizeMapToken.ts].
6. **Font scale from a formula.** `size_i = base x e^((i-1)/5)`, floor (ceil for i <= 1), snap to even; line box = size + 8px. Base 14 gives 12, 14, 16, 20, 24, 30, 38, 46, 56, 68 with line heights 20, 22, 24, 28, 32, 38, 46, 54, 64, 76 [verified: genFontSizes.ts; matches getDesignToken].
7. **Motion and radius are single seeds with derived siblings.** `motionUnit` .1 and `motionBase` 0 -> Fast .1s / Mid .2s / Slow .3s; `borderRadius` 6 -> XS 2, SM 4, LG 8, Outer 4 via a piecewise function [verified: genCommonMapToken.ts, genRadius.ts].
8. **The system's weak spot is contrast.** White text on the default primary is 4.10:1 (fails 4.5:1 for small text); `colorSuccess` 2.27:1, `colorWarning` 1.90:1, `colorError` 3.27:1 as text on white; default border `#d9d9d9` is 1.41:1; tertiary text (.45) is 3.36:1 [computed].
9. **Component state is token-driven but sizes are only three** (small / middle / large) with variants outlined / filled / borderless / underlined (inputs, ConfigProvider) and solid / outlined / dashed / filled / text / link (Button) [verified in v6 `.d.ts`].
10. **Specs are older and philosophical:** four values (Natural, Certain, Meaningful, Growing); layout inspired by Le Corbusier, 8px grid unit, 24-column grid, 1440 board; typography "dynamic order" with the natural-log scale; colour via HSB; shadow 4 layers (none, low, medium, high) [verified: docs/spec/*].

## 2. Rules

- **RULE** Model the theme as `algorithm(seed) -> map -> alias` with algorithms as swappable, composable functions (default, dark, compact), so a dark or compact variant is generated from the same seeds instead of hand-maintained.
  **Why** Consistency across variants is guaranteed by construction, and a brand change is a seed change.
  **Applies to** SaaS app UI | all (system architecture).
  **Check** Project token build has an input file of <= 40 seeds and an output file generated for each of light, dark, compact; diff of hand-edited generated values is empty.
  **Source** components/theme/themes/{default,dark,compact}/index.ts; docs/react/customize-theme

- **RULE** Generate every hue as a 10-step ramp with fixed role indices (1 tint bg, 2 bg hover, 3 border, 4 border hover, 5 hover, 6 base, 7 active, 8 text hover, 9 text, 10 text active) and pick text-on-white colour from step 9, never from step 6.
  **Why** Step 6 colours (green `#52c41a` 2.27:1, gold `#faad14` 1.90:1) fail as text; step 9 (`#135200`, `#874d00`) passes by construction.
  **Applies to** all.
  **Check** Every `*Text` token resolves to step 9 of its ramp and has >= 4.5:1 against the container background; filled buttons with white text use a base whose white-on-base contrast >= 4.5:1 (default blue fails: 4.10).
  **Source** genColorMapToken.ts; [computed] contrast values

- **RULE** Define neutral text and fills as one base colour at fixed alphas (text 88 / 65 / 45 / 25 %, fill 15 / 6 / 4 / 2 %) and derive borders from the container colour by a fixed lightness delta.
  **Why** The same four steps work on any surface and in dark mode with the base flipped.
  **Applies to** all.
  **Check** Token file has 4 text alpha steps and 4 fill alpha steps from one base; swapping base light/dark changes no other definitions.
  **Source** default/colors.ts, dark/colors.ts

- **RULE** Do not rely on the third and fourth text steps for required reading: tertiary (.45, 3.36:1) is for descriptions and icons only, quaternary (.25, 1.84:1) for placeholder and disabled; raise the alphas (tertiary >= .55 gives 4.74:1) if the product must pass AA for body descriptions.
  **Why** Alpha neutrals look harmonious but quietly drop below 4.5:1.
  **Applies to** forms | SaaS app UI.
  **Check** Contrast of every `text-*` alpha step flattened over its surface; mark < 4.5:1 steps as "non-essential only".
  **Source** [computed] on `rgba(0,0,0,.45)` over white = 3.36:1

- **RULE** Give border and outline colours a 3:1 floor for controls even if the system default is lighter: raise `colorBorder` from `#d9d9d9` (1.41:1) to at least `#8c8c8c`-class for inputs/selects/checkboxes, keep the light border for dividers and cards.
  **Why** Default Ant borders fail WCAG 1.4.11 for form fields.
  **Applies to** forms.
  **Check** Contrast of `input`/`select` border vs background >= 3:1.
  **Source** [computed] `#d9d9d9` on white 1.41:1; spec/colors "neutral color definition ... WCAG 2.0"

- **RULE** Derive control sizes from a single `controlHeight` seed with fixed multipliers (SM 0.75, XS 0.5, LG 1.25) and derive compact by subtracting 4px from the seed and 2 steps from the size scale; keep the base font 14 -> 12 in compact.
  **Why** All controls stay aligned in any density; one number retunes the system.
  **Applies to** SaaS app UI | forms.
  **Check** Control heights on a page are within {controlHeight x 0.5, 0.75, 1, 1.25}; compact page uses controlHeight 28.
  **Source** genControlHeight.ts; compact/index.ts

- **RULE** Express motion speed as one unit (`motionUnit` 0.1s) with Fast = 1x, Mid = 2x, Slow = 3x and a global off switch that zeroes all three; additionally honour `prefers-reduced-motion`.
  **Why** One multiplier retunes all transitions; Ant's `motion:false` is global but not wired to the OS preference, so the second clause is the project's job.
  **Applies to** all.
  **Check** Transition durations in {0.1, 0.2, 0.3}s; `@media (prefers-reduced-motion: reduce)` sets them to 0.
  **Source** genCommonMapToken.ts; util/alias.ts motion===false branch

- **RULE** Derive a radius family from one seed with a piecewise function (6 -> XS 2, SM 4, LG 8, Outer 4) and use SM for small controls, base for default, LG for cards and modals.
  **Why** Related radii stay in proportion when a brand picks sharper or rounder corners.
  **Applies to** SaaS app UI.
  **Check** All `border-radius` values on page in {XS, SM, base, LG} from one seed; outer container radius = inner radius + gap or the Outer token.
  **Source** genRadius.ts

- **RULE** Build a type scale from a formula, not by eye: size = floor(14 x e^(i/5)) snapped to even, line box = size + 8px; restrict a product to 3-5 sizes, weights 400 and 500 (600 only for bold Latin), tabular numerals for numbers.
  **Why** Natural-log steps give about 20 % increments and predictable line boxes.
  **Applies to** SaaS app UI | landing page.
  **Check** Distinct font-size values <= 5 per page; line-height px = size + 8 for the scale sizes.
  **Source** genFontSizes.ts; docs/spec/font

- **RULE** Make dark mode a second derivation with its own palette function: mix each light swatch into the dark background (#141414) by a fixed percentage table, re-map hover/active direction (hover lighter, active darker), invert neutral alphas (text base white .85 / .65 / .45 / .25), and override selected-row background to the primary border step so it stays visible.
  **Why** Light-mode tints on dark are either invisible or glaring; hover direction flips.
  **Applies to** dark mode.
  **Check** Dark primary `#1668dc`, hover lighter than base, active darker; `colorPrimaryBg` (#15325b) visibly distinct (1.44:1) from container `#141414`.
  **Source** dark/colors.ts, dark/index.ts, generate.ts darkColorMap

- **RULE** Use shadows in three layers (offset + soft + wide) with downward direction inside components, upward for bottom bars, left/right for drawers and fixed table columns; define four elevation layers (none for inputs, low for hover, medium for dropdowns, high for dialogs).
  **Why** Layer semantics tell a developer which shadow a component gets; direction signals attachment.
  **Applies to** SaaS app UI.
  **Check** `box-shadow` values on page are in the 8 declared tokens (boxShadow, Secondary, Tertiary, Card, Drawer x4, tabs overflow).
  **Source** util/alias.ts; docs/spec/shadow

## 3. Numbers & scales

### The palette generator (@ant-design/colors `generate`) [verified: src/generate.ts]

Constants: hueStep 2, saturationStep 0.16 (light side), saturationStep2 0.05 (dark side), brightnessStep1 0.05, brightnessStep2 0.15, lightColorCount 5, darkColorCount 4. Work in HSV from the seed colour (swatch 6).

```
for i = 5 .. 1  (light swatches 1..5)
  hue:  if round(h) in [60, 240]:  h - 2*i   else  h + 2*i      (wrap 0..360)
  sat:  s - 0.16*i   (clamp: if i == 5 and result > 0.10 -> 0.10; floor 0.06; grey (h=0,s=0) unchanged)
  val:  min(1, v + 0.05*i)
swatch 6 = seed
for i = 1 .. 4  (dark swatches 7..10)
  hue:  if round(h) in [60, 240]:  h + 2*i   else  h - 2*i
  sat:  i == 4 ? s + 0.16 : s + 0.05*i        (cap 1)
  val:  max(0, v - 0.15*i)
all values rounded to 2 decimals
dark theme: take the 10 swatches p[0..9]; output[k] = mix(#141414, p[index_k], amount_k)
  (index, amount) = (7,15) (6,25) (5,30) (5,45) (5,65) (5,85) (4,90) (3,95) (2,97) (1,98)   // 0-based index into p
```

Hue direction: cool hues (60-240) get cooler/bluer going lighter and warmer going darker; warm hues the opposite, so light tints drift toward yellow/green and dark shades toward red/violet. Swatch 6 seeds: blue `#1677FF`, purple `#722ED1`, cyan `#13C2C2`, green `#52C41A`, magenta `#EB2F96`, red `#F5222D`, orange `#FA8C16`, yellow `#FADB14`, volcano `#FA541C`, geekblue `#2F54EB`, gold `#FAAD14`, lime `#A0D911`.

### Map from palette to semantic tokens (light / dark) [verified]

| Slot | Light index | Dark index (of dark palette) |
|---|---|---|
| Bg | 1 | 1 (primary only: colorPrimaryBg overridden to the Border value = swatch 3) |
| BgHover | 2 | 2 (primary only: overridden to BorderHover = swatch 4) |
| Border / BorderHover | 3 / 4 | 3 / 4 |
| Hover | 5 | 7 |
| base (colorPrimary) | 6 | 6 |
| Active | 7 | 5 |
| TextHover / Text / TextActive | 8 / 9 / 10 | 7 / 6 / 5 |
| Success / Info / Warning Hover | 4 | 4 |
| Error Hover | 5 | 7 (same slot map as primary) |

Resulting default tokens [verified, antd 6.6.5]: colorPrimary `#1677ff`, Bg `#e6f4ff`, BgHover `#bae0ff`, Border `#91caff`, BorderHover `#69b1ff`, Hover `#4096ff`, Active `#0958d9`, Text `#1677ff`... (TextHover `#4096ff`, TextActive `#0958d9`); Success `#52c41a`, Warning `#faad14`, Error `#ff4d4f`, Info = Link = `#1677ff`. Dark: Primary `#1668dc`, Bg `#15325b`, Hover `#3c89e8`, Active `#1554ad`, Success `#49aa19`, Warning `#d89614`, Error `#dc4446`.

### Other scales

| Group | Default | Compact | Dark |
|---|---|---|---|
| Font sizes | SM 12, 14, LG 16, XL 20; H5 16, H4 20, H3 24, H2 30, H1 38 | SM 10, 12, LG 14, XL 16; H5 14, H4 16, H3 20, H2 26, H1 32 | = default |
| Line height (unitless) | 1.5714 body, SM 1.6667, LG 1.5; H1 1.2105, H2 1.2667, H3 1.3333, H4 1.4, H5 1.5 | body 1.6667, SM 1.8, LG 1.5714 | |
| Control height | 32 / SM 24 / XS 16 / LG 40 | 28 / 21 / 14 / 35 | |
| size scale (XXS..XXL) | 4, 8, 12, 16, 16(MS), 20, 24, 32, 48 | 4, 4, 8, 8, 12, 16, 16, 32, 48 | |
| Content padding (H x V) | 16 x 12; SM 16 x 8; LG 24 x 16 | 12 x 8 | |
| Radius | XS 2, SM 4, base 6, LG 8, Outer 4 | same | |
| Line widths | 1, bold 2, focus ring 3, control outline 2 | same | |
| Motion | .1 / .2 / .3 s; eases: out-circ (0.08,0.82,0.17,1), in-out-circ (0.78,0.14,0.15,0.86), out (0.215,0.61,0.355,1), in-out (0.645,0.045,0.355,1), out-back (0.12,0.4,0.29,1.46), in-back (0.71,-0.46,0.88,0.6), in-quint (0.755,0.05,0.855,0.06), out-quint (0.23,1,0.32,1) | same | |
| Breakpoints | xs 480, sm 576, md 768, lg 992, xl 1200, xxl 1600, xxxl 1920 (v6) | | |
| z-index | base 0, popup base 1000 | | |
| Alias recipes | controlItemBgHover = colorFillTertiary; controlItemBgActive = colorPrimaryBg; colorSplit = border-secondary alpha over container; colorTextHeading = colorText; colorIcon = tertiary; controlInteractiveSize = controlHeight/2 | | |
| Light neutrals | text .88/.65/.45/.25; fill .15/.06/.04/.02; layout `#f5f5f5`; border `#d9d9d9`; border-secondary `#f0f0f0`; mask rgba(0,0,0,.45); spotlight rgba(0,0,0,.85) | | text .85/.65/.45/.25; fill .18/.12/.08/.04; layout `#000`; container `#141414`; elevated `#1f1f1f`; spotlight `#424242`; border `#424242`; border-secondary `#303030` |
| Shadows | popup: `0 6px 16px 0 .08, 0 3px 6px -4px .12, 0 9px 28px 8px .05`; tertiary: `0 1px 2px 0 .05, 0 1px 6px -1px .03, 0 2px 4px 0 .03`; card: `0 1px 2px -2px .16, 0 3px 6px 0 .12, 0 5px 12px 4px .09`; button 'drop-line' `0 2px 0 rgba(0,0,0,.02)` | | base colour rgba(255,255,255,.2) |
| Button | paddingInline 15 (16-1), SM 7, content font 14 (SM 14 default, LG 16), 43 component tokens | | |
| Contrast [computed] | primary 4.10:1 white-on-blue; #4096ff 2.99; #0958d9 6.16; text .88 16.5; .65 7.0; .45 3.36; .25 1.84; border 1.41 | white on dark primary `#1668dc` 5.19; `#1668dc` on `#141414` 3.55 | |

## 4. Dos and Don'ts

- **Do** keep brand blue at palette swatch 6 and let hover (5) and active (7) be generated; **Don't** hand-pick hover colours.
- **Do** use `colorTextBase`/`colorBgBase` as the only neutral seeds; **Don't** define a grey ramp in addition.
- **Do** pass an algorithm array in order (`[theme.darkAlgorithm, theme.compactAlgorithm]`); **Don't** assume ConfigProvider affects static `message.xxx`/`Modal.xxx` calls (use the hook variants).
- **Do** use `Space.Compact` instead of deprecated `Button.Group` (v6).
- **Don't** override Seed values via `token` for component-only needs; use Component Token (docs: component tokens "can only override global token and will not be derived based on Seed Token" unless `algorithm` is enabled).

## 5. Exceptions & judgement calls

- The docs claim an AAA 7:1 target for body text; true only for text and secondary text. Primary buttons with white labels (4.10:1) and borders (1.41:1) fall short of AA, so a bound project using Ant defaults must override `colorPrimary` (e.g. darker blue `#0958d9` = 6.16:1 under white text) or use dark text on yellow/lime fills. [engine note]
- The palette generator works in HSV with hand-tuned steps; OKLCH would equalise perceived lightness across hues (the yellow seed `#FADB14` is itself only 1.38:1 on white, so a generated yellow ramp has no usable text step before swatch 8). Use OKLCH if a project wants guaranteed per-step contrast. [engine note]
- Dark mode mixes into a fixed `#141414`; custom dark backgrounds need Ant's separate dark palette generator (spec/dark mentions a tool that takes primary and page background).
- Compact is a global algorithm; it shrinks base font to 12px and does not change radius or motion. Pair with component `size="small"` only if you need 21-24px controls.
- The layout spec says 8px grid unit and `y = 8 + 8n` vertical rhythm, while tokens use 4px size units. Both hold: 4 is the token atom, 8 the layout unit.
- Hue names (volcano, geekblue, gold, lime) and 12 hues make a wide categorical set, but only blue/green/gold/red carry semantic roles.

## 6. Figures worth keeping

n/a. Worth opening on ant.design: /docs/spec/colors (base palettes), /docs/spec/shadow (layer table), /theme-editor (live seed tweaking).

## 7. Open questions

- The exact HSL definition of `FastColor.darken/lighten` was inferred from outputs (`#fff` darken 4 -> `#f5f5f5`); source of `@ant-design/fast-color` not read.
- v6 CSS-variable mode names (`--ant-*`) and their cascade were not studied.
- Per-component token values (Table, Modal, Form, Menu etc.) were not extracted; only Button and Input token files were read (others returned 404 at the guessed path).
- Wireframe seed (`wireframe: true`) effects: not studied.
- Total token count: default `getDesignToken()` returns 501 keys in 5.29.3 and 536 in 6.6.5 (includes 12 presets x ~22 each) [computed]; seed token count (about 35) is approximate.
