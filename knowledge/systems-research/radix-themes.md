---
source: web:https://www.radix-ui.com/themes/docs ; https://www.radix-ui.com/colors/docs ; https://github.com/radix-ui/themes (v3.3.0) ; https://unpkg.com/@radix-ui/themes@3.3.0/tokens/
chapter: Radix Themes + Radix Colors (design system profile)
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, color-scale, tokens, radius, density, dark-mode, saas-ui, radix]
status: studied
---

# Radix Themes + Radix Colors

Machine profile: `system/systems-research/radix-themes.json` (all 31 scales, light + dark hex, gray pairing table). Raw fetches: `corpus/web/systems/radix-themes/` (gitignored). Licence: MIT (Radix Themes 3.3.0, Radix Colors).

## 1. Core ideas

1. **Every colour step has a fixed job.** 12 steps: 1-2 backgrounds, 3-5 component backgrounds (normal, hover, pressed), 6-8 borders and focus ring, 9-10 solid fills, 11-12 text. Because the job is fixed, a component written once works for all 31 hues in both modes. (colors/docs/palette-composition/understanding-the-scale)
2. **Five knobs drive everything:** accentColor, grayColor, radius (none/small/medium/large/full), scaling (90-110%), panelBackground (solid/translucent). Plus `appearance`. Everything else is derived by multiplication (`--scaling`, `--radius-factor`). (themes/docs/theme/overview, theme.props.tsx)
3. **Neutral is a choice with six options:** gray (pure), mauve, slate, sage, olive, sand. `grayColor="auto"` picks the tinted gray nearest the accent hue (table in `get-matching-gray-color.ts`).
4. **Contrast by construction.** Step 11 = APCA Lc 60 and step 12 = Lc 90 on a step-2 background of the same scale. Step 9 carries white text except sky, mint, lime, yellow, amber (dark text). 
5. **Alpha twins.** Every step has an alpha version (`--blue-a1..a12`) built to look identical over the page background; overlays, borders and translucent panels use these so they work on any surface.
6. **Borders are shadows.** Cards and fields draw their 1px outline as `0 0 0 1px gray-a3` spread shadows, not CSS borders; dark mode redefines the stack with stronger black alphas.
7. **Size ladders are rigid and shared.** Button 1-4 = 24/32/40/48px, TextField 1-3 = 24/32/40, Switch 16/~20/24, each pulling radius-N and font-size-N of the same N.
8. **One numeric scale per property**, all multiplied by `--scaling`: space 1-9 (4,8,12,16,24,32,40,48,64), font-size 1-9, line-height 1-9, letter-spacing 1-9, radius 1-6, shadow 1-6.
9. **Radius is semantic through `max(radius-N, radius-full)`** and `--radius-thumb`, so `radius="full"` pills buttons but a Checkbox never becomes a circle (stays distinct from Radio).
10. **Do not edit Radix scales.** Docs: "Radix Colors are not intended to be customised"; add a custom scale beside them (brand), keep Radix for grays and semantic hues.

## 2. Rules

- **RULE** Assign every colour step one job (1-2 background, 3/4/5 component bg normal/hover/pressed, 6 non-interactive border, 7 interactive border, 8 strong border and focus ring, 9 solid, 10 solid hover, 11 low-contrast text, 12 high-contrast text) and have components reference steps, never raw hex.
  **Why** A fixed job per step lets one component recolour across every hue and both themes with no per-hue exceptions.
  **Applies to** SaaS app UI | all
  **Check** grep component CSS for hex literals outside the token layer; every `background`, `border-color`, `color` resolves to a `--accent-N`/`--gray-N` token.
  **Source** radix-ui.com/colors/docs/palette-composition/understanding-the-scale

- **RULE** Use step 11 for secondary text and step 12 for primary text on a step 1-2 background; never use step 9-10 as body text colour.
  **Why** The scale is built so 11 and 12 reach APCA Lc 60 and Lc 90 on step 2; 9-10 are only guaranteed against white or dark foreground.
  **Applies to** all
  **Check** compute APCA/WCAG for each text token against its background; text on step 2 must be >= Lc 60 (secondary) and >= Lc 90 (primary).
  **Source** radix-ui.com/colors/docs/palette-composition/understanding-the-scale

- **RULE** Put dark text (not white) on solid step 9/10 fills for sky, mint, lime, yellow and amber; white on all other hues. Store the on-solid colour as its own token (`--accent-contrast`: amber #21201c, lime #1d211c, mint #1a211e, sky #1c2024, yellow #21201c, else white).
  **Why** Light, high-luminance hues fail contrast with white text at step 9.
  **Applies to** forms | SaaS app UI | landing page
  **Check** contrast of button label on its step-9 fill >= 4.5:1 for each hue used.
  **Source** radix-ui.com/colors/docs/palette-composition/composing-a-palette ; tokens/colors/*.css

- **RULE** Choose the neutral to match the accent: tinted gray nearest hue (tomato/red/ruby/crimson/pink/plum/purple/violet -> mauve; iris/indigo/blue/sky/cyan -> slate; teal/jade/mint/green -> sage; grass/lime -> olive; yellow/amber/orange/brown/gold/bronze -> sand), or pure gray for a neutral look. Avoid saturated grays as app backgrounds when many coloured badges appear, especially in dark mode.
  **Why** Matching tints harmonise; saturated grays clash with many coloured components.
  **Applies to** SaaS app UI | landing page
  **Check** `grayColor` equals pairing table or is `gray`; visual check badges on app background in dark mode.
  **Source** get-matching-gray-color.ts ; colors/docs/palette-composition/composing-a-palette

- **RULE** Give every step an alpha variant and use alphas (not opaque greys) for borders, hover overlays and translucent panels.
  **Why** An alpha step composites to the right colour over any surface, so one token survives card-on-background and dark mode.
  **Applies to** all
  **Check** overlay/border tokens are `rgba`/`#rrggbbaa`; no opaque grey borders on cards.
  **Source** tokens/colors/gray.css (--gray-a1..a12)

- **RULE** Draw component outlines as `0 0 0 1px <gray-a3|a6>` spread shadows layered with soft drop shadows, and redefine the whole shadow stack for dark mode with stronger black alphas.
  **Why** A shadow-border does not change box size, and alpha tint adapts to the surface; dark shadows need more opacity to read.
  **Applies to** SaaS app UI | landing page
  **Check** card/popover computed `border-width: 0` with a `box-shadow` containing a 1px spread; dark theme shadow alpha greater than light.
  **Source** tokens/base.css (--shadow-1..6)

- **RULE** Define control sizes as a single ladder where size N sets height, font-size-N, radius-N and padding together (Button 24/32/40/48, TextField 24/32/40) and allow responsive size props.
  **Why** One decision per control instead of four, and mixed controls on one row align without manual tweaks.
  **Applies to** forms | SaaS app UI
  **Check** measure `height` of Button/Input/Select of the same size; must match within 0px.
  **Source** styles.css (.rt-BaseButton, .rt-TextFieldRoot size classes)

- **RULE** Multiply all spacing, font-size and line-height tokens by one `--scaling` factor (0.9, 0.95, 1, 1.05, 1.1) to offer density without redesign.
  **Why** Keeps proportions identical while letting a dense admin and a comfortable settings page share components.
  **Applies to** SaaS app UI
  **Check** token values equal base x scaling; no px literals in components.
  **Source** themes/docs/theme/spacing ; tokens/base.css

- **RULE** Express shape with one multiplier (`--radius-factor`: none 0, small 0.75, medium 1, large 1.5, full 1.5 + `--radius-full`) over a 6-step base (3, 4, 6, 8, 12, 16px), and let panels (Card, Dialog, Popover) inherit the theme radius rather than take a prop.
  **Why** A brand's shape language is one switch; panels with their own radius props drift.
  **Applies to** all
  **Check** all component radii resolve to `--radius-N`; none hard-coded.
  **Source** themes/docs/theme/radius ; styles.css [data-radius]

- **RULE** Focus ring is `outline: 2px solid var(--focus-8)` with `outline-offset: 2px` (and Radix uses accent step 8), shown on :focus-visible for every interactive element.
  **Why** One token, consistent in every hue, visible against both surfaces.
  **Applies to** all
  **Check** tab through page; each focusable element gets a 2px outline offset 2px; contrast of ring vs adjacent >= 3:1.
  **Source** styles.css (outline: 2px solid var(--focus-8))

- **RULE** Do not modify the vendor scales; add a separate named custom scale (12 steps light + dark + alpha + surface/indicator/track/contrast) for a brand hue and alias it to `accent`.
  **Why** Hand-edited steps break the contrast guarantee and the pairing between steps.
  **Applies to** landing page | SaaS app UI
  **Check** custom scale complete: 12 solid, 12 alpha, 4 helper tokens in each mode.
  **Source** radix-ui.com/themes/docs/theme/color

## 3. Numbers & scales

| Token set | Values |
|---|---|
| space 1-9 | 4, 8, 12, 16, 24, 32, 40, 48, 64 px |
| font-size 1-9 | 12, 14, 16, 18, 20, 24, 28, 35, 60 px |
| line-height 1-9 | 16, 20, 24, 26, 28, 30, 36, 40, 60 px |
| heading line-height 1-9 | 16, 18, 22, 24, 26, 30, 36, 40, 60 px |
| letter-spacing 1-9 | +0.0025, 0, 0, -0.0025, -0.005, -0.00625, -0.0075, -0.01, -0.025 em |
| radius 1-6 | 3, 4, 6, 8, 12, 16 px x factor |
| weights | 300, 400, 500, 700 |
| container 1-4 | 448, 688, 880, 1136 px |
| section padding 1-4 | 24, 40, 64, 80 px |
| Card size 1-5 padding | 12, 16, 24, 32, 48 px (radius 8, 8, 12, 12, 16) |
| Breakpoints | 0, 520, 768, 1024, 1280, 1640 px |
| durations seen | 30, 40, 100, 120, 140, 160, 200, 800 ms; ease cubic-bezier(0.16,1,0.3,1) |
| scaling | 90%, 95%, 100%, 105%, 110% |
| Accent options | 26 (gray, gold, bronze, brown, yellow, amber, orange, tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, cyan, teal, jade, green, grass, lime, mint, sky) |

Sample (blue): light 1-12 `#fbfdff #f4faff #e6f4fe #d5efff #c2e5ff #acd8fc #8ec8f6 #5eb1ef #0090ff #0588f0 #0d74ce #113264`; dark `#0d1520 #111927 #0d2847 #003362 #004074 #104d87 #205d9e #2870bd #0090ff #3b9eff #70b8ff #c2e6ff`. Other scales in the JSON profile.

## 4. Dos and Don'ts

- Do: `<Theme accentColor="indigo" grayColor="slate" radius="large" scaling="100%">` and let components inherit. Don't: restyle a Button's padding; change `size`.
- Do: Badge with `color="red"` and variant soft on a gray-2 background (alpha step compositing). Don't: opaque `#fee` tints that break on dark.
- Do: `highContrast` prop for stronger emphasis. Don't: swap to step 12 by hand per component.

## 5. Exceptions & judgement calls

- Default system-font stack gives no identity; for brand work override `--default-font-family` and `--heading-font-family` and consider `--heading-letter-spacing`.
- Translucent panels (default) use blur(64px) and lower effective contrast; choose `panelBackground="solid"` where text sits on busy backgrounds.
- Docs contradict themselves on step 7 vs 8 for borders/focus; source CSS uses `--focus-8`. Follow the CSS.
- [engine note] 12 steps x 31 hues is more than a marketing site needs; ship only accent + one gray + red/green/amber semantic scales to keep CSS small (colour CSS is about 20% of the bundle per docs).

## 6. Figures worth keeping

None captured (colour scales are data). See JSON profile.

## 7. Open questions

- Authoring colour space of the scales (OKLCH vs P3 HSL) is not stated; hex and display-p3 are shipped.
- Per-component state (hover/active) colour recipes not fully extracted (filters such as `brightness(0.92) saturate(1.1)` on solid active).
- Radius docs give no per-option px table; derived here from `base.css`.
