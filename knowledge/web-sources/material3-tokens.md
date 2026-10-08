---
source: web:https://github.com/material-components/material-web/tree/main/tokens
chapter: Material 3 design tokens (motion, typescale, shape, colour, elevation, state, window size classes)
pages: n/a
topic_tags: [material-3, tokens, motion, easing, duration, spring, typography, typescale, shape, radius, color, elevation, state-layer, focus, breakpoints, window-size-classes]
status: studied
---

# Material 3 design tokens (material-web, Apache-2.0)

Fetched 2026-10-08 from `tokens/versions/v0_192/` (M3 v0.192, 2023) and `tokens/versions/latest/sass/` (design system v34.0.21, copyright 2026, adds springs and the extra-large corner steps). Raw SCSS saved to `corpus/web/m3-nng-laws/m3/`. Machine-readable twin: `material3-tokens.json` (same folder as this note). Licence is Apache-2.0, so exact numbers are reproduced here. The window size class values come from the Android developer docs (`use-window-size-classes`), because m3.material.io is JS-rendered and returned no usable text.

## 1. Core ideas

1. **Tokens are semantic ladders, not free values.** Motion has 16 durations and 10 easings, type has 15 styles, shape has 10 corners, elevation has 6 levels. A component picks a rung; it never invents a number. That is why M3 UI feels coherent.
2. **Duration steps are 50 ms wide up to 400 ms, then 50 ms up to 600, then 100 ms up to 1000.** Short (50-200) is for small utility changes, medium (250-400) for most component transitions, long (450-600) and extra-long (700-1000) for large or page-level movement. The size-to-bucket mapping is M3 guideline prose, not in the token files (see section 7).
3. **Easing is chosen by direction.** Standard (0.2, 0, 0, 1) for movement that stays on screen, decelerate for entering, accelerate for leaving. Emphasized-decelerate and emphasized-accelerate are the expressive pair. In the web SCSS the token named `easing-emphasized` is simply aliased to `easing-standard`, because the true emphasized curve is a path rather than one cubic-bezier.
4. **Springs split into spatial and effects.** Spatial springs (position, size, shape) use damping 0.9, a small overshoot. Effects springs (opacity, colour) use damping 1.0, no overshoot. Only stiffness changes between fast, default and slow.
5. **State is an overlay, not a new colour.** Hover, focus, pressed and dragged are a translucent layer of the content colour over the container. Opacities moved between versions (focus and pressed 0.12 in v0.192, 0.10 in the latest set).
6. **Colour is role-based with tone arithmetic.** Each role maps to a tone of a key palette (primary, secondary, tertiary, neutral, neutral-variant, error). Light and dark are different tone choices, not inverted values. Every fill role has an `on-` partner.
7. **Depth in M3 is mostly tonal.** Six surface-container steps (lowest to highest) plus dim and bright carry hierarchy; elevation shadows are 0, 1, 3, 6, 8, 12 dp and most resting components sit at level 0.
8. **Control sizes are small fixed numbers.** Button 40 high, pill shaped; outlined field 4 px corners; dialog 28; card 12; switch track 52 by 32; checkbox 18; slider handle 20 with 4 px tracks.

## 2. Rules

### Motion

- **RULE [MDX-01]** Snap every transition and animation duration to the M3 ladder: 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 700, 800, 900, 1000 ms. Do not use values between rungs (e.g. 180, 220, 320, 375).
  **Why** A closed ladder makes motion feel like one system and makes review mechanical.
  **Applies to** all. **Check** collect computed `transition-duration` and `animation-duration` (and JS-driven durations) and flag any value not in the set. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss

- **RULE [MDX-02]** Pick the duration bucket by how much of the screen changes: small utility changes (state, icon, toggle) 50-200 ms; component enter/exit and expansion 250-400 ms; large panels and full-screen transitions 450-600 ms; extra-long 700-1000 ms only for page-level or choreographed moments. [engine note] This size-to-bucket mapping is M3 guideline prose recalled from memory, not part of the token files; the engine's own ceiling for ordinary UI is lower (see section 5).
  **Why** Perceived speed depends on distance and area; the same duration feels slow on a small element and abrupt on a big one.
  **Applies to** all. **Check** computed duration against the element's bounding-box area: icon or control under 100 px wide should be at or below 200 ms; full-viewport panel at or above 300 ms. **Source** https://m3.material.io/styles/motion/overview (not readable; prose recalled) plus the token ladder above.

- **RULE [MDX-03]** Use `cubic-bezier(0.2, 0, 0, 1)` (standard) for movement that stays on screen, `cubic-bezier(0, 0, 0, 1)` (standard-decelerate) for entering, `cubic-bezier(0.3, 0, 1, 1)` (standard-accelerate) for leaving.
  **Why** Entering elements should arrive fast and settle; leaving ones should start slow and clear out; the curve encodes direction.
  **Applies to** all. **Check** computed `transition-timing-function` on entering elements equals the decelerate curve and on exiting elements equals the accelerate curve; no bare `ease` or `ease-in-out` on UI transitions. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss

- **RULE [MDX-04]** For expressive or hero motion use `cubic-bezier(0.05, 0.7, 0.1, 1)` (emphasized-decelerate) to enter and `cubic-bezier(0.3, 0, 0.8, 0.15)` (emphasized-accelerate) to exit, with durations from the medium-long range (see MDX-02). Do not treat the token `easing-emphasized` as a separate curve: in the web tokens it equals standard.
  **Why** The emphasized pair has a longer settle tail, which reads as intentional rather than utilitarian.
  **Applies to** landing page | SaaS app UI. **Check** stylesheet contains the exact emphasized pair when the page uses expressive entrances; `easing-emphasized` is not mapped to a third curve. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-motion.scss

- **RULE [MDX-05]** Use `cubic-bezier(0, 0, 1, 1)` (linear) only for motion with no spatial meaning: progress bars, spinners, scrubbing, colour or opacity cross-fades driven by time.
  **Why** Linear speed looks mechanical for objects that move through space, and natural for things that fill or rotate at constant rate.
  **Applies to** all. **Check** `linear` appears only on `progress`, spinner, or opacity/colour transitions. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss

- **RULE [MDX-06]** Do not mix easing families. The "legacy" family (0.4, 0, 0.2, 1 / decelerate 0, 0, 0.2, 1 / accelerate 0.4, 0, 1, 1) is the Material 2 set; a product uses either legacy or standard/emphasized, not both.
  **Why** Two families on one screen make equivalent interactions feel different.
  **Applies to** all. **Check** count distinct easing families in the stylesheet: no page uses both the legacy and standard bezier sets. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss

- **RULE [MDX-07]** When a spring is used, spatial properties (transform, size, border-radius) take damping 0.9 with stiffness 1400 (fast), 700 (default) or 300 (slow); effect properties (opacity, colour, blur) take damping 1.0 with stiffness 3800 (fast), 1600 (default) or 800 (slow).
  **Why** Overshoot on position reads as life; overshoot on opacity or colour is invisible or wrong (opacity cannot exceed 1), so effects must be critically damped.
  **Applies to** SaaS app UI | landing page. **Check** spring config for opacity/colour has damping ratio 1 (bounce 0); spatial springs have damping between 0.8 and 1. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-motion.scss

### State, focus, disabled

- **RULE [MDX-08]** Interactive state is a translucent overlay of the content colour on the container: hover 8%, focus 10%, pressed 10%, dragged 16% (latest tokens). The older v0.192 set used focus 12% and pressed 12%; pick one set and use it everywhere.
  **Why** An overlay keeps contrast relationships intact in light and dark and works on any container colour without defining extra colours per state.
  **Applies to** all. **Check** `:hover` styling uses an overlay (`color-mix`, `::before` with opacity, or an alpha-composited background) whose alpha is 0.08 plus or minus 0.01; focus and pressed alphas equal 0.10 (or 0.12 if the product pinned v0.192). **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-state.scss

- **RULE [MDX-09]** Draw the keyboard focus indicator as a 3 px ring offset 2 px outside the component (inner variant: 3 px inset, offset -3 px).
  **Why** A thick offset ring stays visible against both the component and the surface; it exceeds the WCAG 2.2 minimum focus appearance of 2 px.
  **Applies to** all. **Check** computed `outline-width` on `:focus-visible` is at least 3px (2px is the WCAG floor) and `outline-offset` is 2px; outline colour contrast against adjacent colours is at least 3:1. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-state-focus-indicator.scss

- **RULE [MDX-10]** Disabled controls: content (label, icon) at 38% opacity of `on-surface`; container fill at 12% of `on-surface`. Do not remove the control's shape.
  **Why** Two distinct opacities keep a disabled button recognisable as a button while clearly inactive.
  **Applies to** forms | SaaS app UI. **Check** disabled button computed label opacity or alpha is 0.38 and fill alpha 0.12 (filled variants). **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-filled-button.scss

### Shape and elevation

- **RULE [MDX-11]** Use only these corner radii: 0, 4, 8, 12, 16, 20, 28, 32, 48 px and full (9999px). The 20, 32 and 48 steps exist only in the latest set. Directional variants: extra-small-top 4/4/0/0, large-top 16/16/0/0, large-start 16/0/0/16, large-end 0/16/16/0, extra-large-top 28/28/0/0.
  **Why** A closed radius scale prevents arbitrary 6, 10, 14 px drift.
  **Applies to** all. **Check** all computed `border-radius` values (excluding 50% and 9999px pills) are in the set. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-shape.scss

- **RULE [MDX-12]** Map component classes to corners: buttons, chips-as-pills, switch track, slider track and handle, nav indicator = full; assist chip = 8; cards (elevated, filled, outlined) = 12; outlined text field and menu = 4; filled text field = 4 top only; dialog = 28; checkbox box = 2.
  **Why** Corner size scales with component size and prominence: small controls get small or full radii, big floating surfaces get large radii.
  **Applies to** SaaS app UI | forms. **Check** computed `border-radius` of `button`, `.card`, `dialog`, `input` against this map. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-dialog.scss (and the sibling component files for card, button, text field, chip, checkbox)

- **RULE [MDX-13]** Elevation levels are 0, 1, 3, 6, 8, 12 dp. Resting buttons and cards sit at level 0; filled button rises to level 1 on hover; reserve levels 3 and above for menus, dialogs, FABs and floating UI.
  **Why** Shadows signal "this floats above the content"; using them on everything removes the signal.
  **Applies to** SaaS app UI. **Check** `box-shadow` blur radius of non-floating cards and buttons is at most 1-3 px or none; floating layers (menu, dialog, popover) have a stronger shadow than the page content. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-elevation.scss

### Colour

- **RULE [MDX-14]** Build surfaces from the container ladder, not from arbitrary greys. Light: lowest #ffffff, low #f7f2fa, container #f3edf7, high #ece6f0, highest #e6e0e9, dim #ded8e1, base surface #fef7ff. Dark: lowest #0f0d13, low #1d1b20, container #211f26, high #2b2930, highest #36343b, bright #3b383e, base surface #141218. (Baseline purple scheme; the tone numbers are neutral 100/96/94/92/90/87/98 light and 4/10/12/17/22/24/6 dark.)
  **Why** Equal-step tonal surfaces create reliable layering and keep nested cards distinguishable in both themes.
  **Applies to** SaaS app UI. **Check** nested surfaces (page, card, popover) differ by at least one container step; adjacent same-tone surfaces need a border. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-ref-palette.scss

- **RULE [MDX-15]** Always pair a fill role with its `on-` role (on-primary on primary, on-primary-container on primary-container, on-surface on surface, and so on); do not put `on-surface` text on a primary fill. Baseline measured contrast: on-surface on surface 16.2:1 light / 14.4:1 dark; on-primary on primary 6.44 / 7.71; on-primary-container on primary-container 13.3 / 7.2; on-error on error 6.54 / 7.66.
  **Why** Pairs are generated with a fixed tone gap (e.g. 40 against 100, 90 against 10), which guarantees contrast; ad-hoc pairs lose that guarantee.
  **Applies to** all. **Check** compute contrast of every text/background pair: at least 4.5:1 for text under 24 px (or 18.66 px bold), 3:1 for large text and UI components. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-color.scss (ratios computed by the engine from the resolved hex)

- **RULE [MDX-16]** Control boundaries (outlined field, outlined button, checkbox, switch outline) use the `outline` role: tone 50 light (#79747e, 4.33:1 on surface) / tone 60 dark (#938f99, 5.87:1). Use `outline-variant` (tone 80 light #cac4d0, 1.62:1; tone 30 dark #49454f, 1.99:1) only for dividers and decoration.
  **Why** WCAG 1.4.11 needs 3:1 for the boundary of an interactive control; `outline-variant` deliberately fails that.
  **Applies to** forms | SaaS app UI. **Check** `border-color` on input, select, outlined button contrasts at least 3:1 with its surface; `hr`, card dividers may be lower. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-color.scss (contrast computed)

- **RULE [MDX-17]** Dark theme is a separate tone assignment: primary tone 80 (#d0bcff) on surface tone 6 (#141218), containers tone 30, on-colours tone 20 or 90; dark primary is lighter and less saturated than light primary (tone 40 #6750a4). Do not simply invert or reuse the light hex values.
  **Why** Perceived brightness and halation differ on dark; tone-based assignment keeps contrast and saturation balanced.
  **Applies to** all. **Check** dark `--primary` has higher luminance than the dark surface by at least 4.5:1 and lower chroma than the light primary. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-color.scss

### Typography

- **RULE [MDX-18]** Use the 15-style type scale as-is: display 57/64, 45/52, 36/44; headline 32/40, 28/36, 24/32; title 22/28, 16/24, 14/20; body 16/24, 14/20, 12/16; label 14/20, 12/16, 11/16 (size/line-height in px). Pick a role, do not pick a size.
  **Why** A fixed set of size-and-leading pairs keeps hierarchy discrete; one role equals one look.
  **Applies to** SaaS app UI | landing page. **Check** distinct computed `font-size` values on a page are a subset of {57, 45, 36, 32, 28, 24, 22, 16, 14, 12, 11} (apps) and each `line-height` equals the paired value. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-typescale.scss

- **RULE [MDX-19]** Body copy is 16/24 (ratio 1.5) or 14/20 (ratio 1.43); small body 12/16 (1.33). Never set running text below 12 px; the 11 px label-small is for single-line labels only.
  **Why** Leading ratio 1.33-1.5 holds for sizes up to 16 px; below 12 px legibility drops sharply on non-retina or low vision.
  **Applies to** all. **Check** computed `font-size` of `p`, `li`, `td` is at least 14px (12px allowed for captions); `line-height / font-size` at least 1.33. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-typescale.scss

- **RULE [MDX-20]** Apply the scale's tracking: display-large -0.25 px, headline and display-medium/small and title-large 0, title-medium +0.15, title-small and label-large +0.1, body-large +0.5, body-medium +0.25, body-small +0.4, label-medium and label-small +0.5 px. Small text gets positive tracking; only the largest display size gets negative.
  **Why** Small sizes need extra air for letterform separation; large sizes look gappy and are tightened.
  **Applies to** SaaS app UI | landing page. **Check** computed `letter-spacing` at font-size 11-16 px is greater than or equal to 0; below 0 only when font-size is at least 48 px. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-typescale.scss

- **RULE [MDX-21]** Weights: display, headline, title-large and body are 400; title-medium/small and all labels are 500. For emphasised text step up one rung (400 to 500, 500 to 600) rather than jumping to 700; 700 appears only as the static-font bold reference (the emphasized label-large maps to it).
  **Why** One-step weight changes preserve texture; strong jumps create banding on screens at small sizes.
  **Applies to** all. **Check** computed `font-weight` on body text is 400; heading weights are within {400, 500, 600}; no more than three distinct weights on a page. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-typescale-emphasized.scss

- **RULE [MDX-22]** When the font is variable, set the optical size axis to roughly the pixel size (opsz 57 for 57 px down to 11 for 11 px) and keep wdth 100.
  **Why** Optical sizing gives small text sturdier forms and large text finer ones without changing family.
  **Applies to** all. **Check** `font-variation-settings` or `font-optical-sizing: auto` present on a variable font that exposes opsz. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/latest/sass/_md-sys-typescale.scss

### Layout and component dimensions

- **RULE [MDX-23]** Choose layout by window width class, not by device: compact 0-599, medium 600-839, expanded 840-1199, large 1200-1599, extra-large 1600 and up (dp or CSS px). Height classes: compact below 480, medium 480-899, expanded 900 and up. Treat width as the primary axis and consult height only for landscape phones.
  **Why** Foldables, split screen and browser windows make device type meaningless; the available window is what constrains the layout.
  **Applies to** all. **Check** media queries or container queries use breakpoints at 600 / 840 / 1200 / 1600 px (or document why Tailwind's 640 / 768 / 1024 / 1280 / 1536 is used instead). **Source** https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes

- **RULE [MDX-24]** Component sizes: button 40 px high, label 14/20 weight 500, 18 px icon; text field icons 24 px, outline 1 px resting and 2 px focused; navigation bar 80 px high with a 64 by 32 pill indicator and 24 px icons; switch track 52 by 32 with handle 16 (off) / 24 (on) / 28 (pressed); checkbox box 18 with a 2 px outline and 2 px corner; slider handle 20, track 4; assist chip 32 high with 1 px outline; icon button icon 24.
  **Why** These are the fixed visual sizes; touch hit areas are enlarged separately without changing the visual size (M3 web components use an invisible larger target; the exact figure is not in the token files).
  **Applies to** SaaS app UI | forms | mobile. **Check** computed heights of `button` at 40px visual with hit area at least 44px through padding or a pseudo-element; switch width 52. **Source** https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-filled-button.scss (and the sibling `_md-comp-*` files)

## 3. Numbers & scales

### 3.1 Motion durations (identical in v0_192 and latest)

| Token | ms | Token | ms |
|---|---|---|---|
| short1 | 50 | long1 | 450 |
| short2 | 100 | long2 | 500 |
| short3 | 150 | long3 | 550 |
| short4 | 200 | long4 | 600 |
| medium1 | 250 | extra-long1 | 700 |
| medium2 | 300 | extra-long2 | 800 |
| medium3 | 350 | extra-long3 | 900 |
| medium4 | 400 | extra-long4 | 1000 |

### 3.2 Easing

| Token | cubic-bezier | Use |
|---|---|---|
| standard | 0.2, 0, 0, 1 | on-screen movement |
| standard-decelerate | 0, 0, 0, 1 | entering |
| standard-accelerate | 0.3, 0, 1, 1 | leaving |
| emphasized | 0.2, 0, 0, 1 | alias of standard in these tokens |
| emphasized-decelerate | 0.05, 0.7, 0.1, 1 | expressive entering |
| emphasized-accelerate | 0.3, 0, 0.8, 0.15 | expressive leaving |
| legacy | 0.4, 0, 0.2, 1 | M2 standard |
| legacy-decelerate | 0, 0, 0.2, 1 | M2 entering |
| legacy-accelerate | 0.4, 0, 1, 1 | M2 leaving |
| linear | 0, 0, 1, 1 | non-spatial |

### 3.3 Springs (latest only)

| Speed | Spatial damping / stiffness | Effects damping / stiffness |
|---|---|---|
| fast | 0.9 / 1400 | 1 / 3800 |
| default | 0.9 / 700 | 1 / 1600 |
| slow | 0.9 / 300 | 1 / 800 |

### 3.4 Type scale (px at 16 px root; weight regular / emphasized; tracking in px)

| Style | Size | Line height | Ratio | Tracking | Weight | Emph. | opsz | Family |
|---|---|---|---|---|---|---|---|---|
| display-large | 57 | 64 | 1.123 | -0.25 | 400 | 500 | 57 | brand |
| display-medium | 45 | 52 | 1.156 | 0 | 400 | 500 | 45 | brand |
| display-small | 36 | 44 | 1.222 | 0 | 400 | 500 | 36 | brand |
| headline-large | 32 | 40 | 1.25 | 0 | 400 | 500 | 32 | brand |
| headline-medium | 28 | 36 | 1.286 | 0 | 400 | 500 | 28 | brand |
| headline-small | 24 | 32 | 1.333 | 0 | 400 | 500 | 24 | brand |
| title-large | 22 | 28 | 1.273 | 0 | 400 | 500 | 22 | brand |
| title-medium | 16 | 24 | 1.5 | +0.15 | 500 | 600 | 16 | plain |
| title-small | 14 | 20 | 1.429 | +0.1 | 500 | 600 | 14 | plain |
| body-large | 16 | 24 | 1.5 | +0.5 | 400 | 500 | 16 | plain |
| body-medium | 14 | 20 | 1.429 | +0.25 | 400 | 500 | 14 | plain |
| body-small | 12 | 16 | 1.333 | +0.4 | 400 | 500 | 12 | plain |
| label-large | 14 | 20 | 1.429 | +0.1 | 500 | 600 | 14 | plain |
| label-medium | 12 | 16 | 1.333 | +0.5 | 500 | 600 | 12 | plain |
| label-small | 11 | 16 | 1.455 | +0.5 | 500 | 600 | 11 | plain |

Reference typeface: brand and plain are both Roboto; weights regular 400, medium 500, bold 700. Sizes are identical between v0_192 and latest.

### 3.5 Shape

| Token | px | Token | px |
|---|---|---|---|
| none | 0 | large-increased (latest) | 20 |
| extra-small | 4 | extra-large | 28 |
| small | 8 | extra-large-increased (latest) | 32 |
| medium | 12 | extra-extra-large (latest) | 48 |
| large | 16 | full | 9999 |

### 3.6 Elevation and state

| Level | dp | | State | v0_192 | latest |
|---|---|---|---|---|---|
| 0 | 0 | | hover layer | 0.08 | 0.08 |
| 1 | 1 | | focus layer | 0.12 | 0.10 |
| 2 | 3 | | pressed layer | 0.12 | 0.10 |
| 3 | 6 | | dragged layer | 0.16 | 0.16 |
| 4 | 8 | | disabled content | 0.38 (component) | 0.38 |
| 5 | 12 | | disabled container | 0.12 (component) | | 

Focus indicator: thickness 3 px, outer offset 2 px, inner offset -3 px.

### 3.7 Window size classes (Android docs)

| Width class | Range (dp) | Typical device |
|---|---|---|
| compact | below 600 | phones in portrait |
| medium | 600 to below 840 | tablets in portrait, large unfolded in portrait |
| expanded | 840 to below 1200 | tablets in landscape |
| large | 1200 to below 1600 | large tablet displays |
| extra-large | 1600 and up | desktop displays |

| Height class | Range (dp) |
|---|---|
| compact | below 480 (phones in landscape) |
| medium | 480 to below 900 |
| expanded | 900 and up |

### 3.8 Colour (baseline scheme; hex resolved from the reference palette)

| Role | Light (tone, hex) | Dark (tone, hex) |
|---|---|---|
| primary | 40 #6750a4 | 80 #d0bcff |
| on-primary | 100 #ffffff | 20 #381e72 |
| primary-container | 90 #eaddff | 30 #4f378b |
| on-primary-container | 10 #21005d | 90 #eaddff |
| secondary | 40 #625b71 | 80 #ccc2dc |
| secondary-container | 90 #e8def8 | 30 #4a4458 |
| tertiary | 40 #7d5260 | 80 #efb8c8 |
| tertiary-container | 90 #ffd8e4 | 30 #633b48 |
| error | 40 #b3261e | 80 #f2b8b5 |
| error-container | 90 #f9dedc | 30 #8c1d18 |
| on-error | 100 #ffffff | 20 #601410 |
| surface / background | n98 #fef7ff | n6 #141218 |
| on-surface | n10 #1d1b20 | n90 #e6e0e9 |
| on-surface-variant | nv30 #49454f | nv80 #cac4d0 |
| outline | nv50 #79747e | nv60 #938f99 |
| outline-variant | nv80 #cac4d0 | nv30 #49454f |
| inverse-surface | n20 #322f35 | n90 #e6e0e9 |
| inverse-on-surface | n95 #f5eff7 | n20 #322f35 |
| inverse-primary | 80 #d0bcff | 40 #6750a4 |
| scrim, shadow | 0 #000000 | 0 #000000 |
| surface-variant | nv90 #e7e0ec | nv30 #49454f |

Key-palette tones available: 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100 for primary, secondary, tertiary, error, neutral-variant; neutral adds 4, 6, 12, 17, 22, 24, 87, 92, 94, 96. Full JSON in `material3-tokens.json` (roles and key palettes). Fixed roles (primary-fixed, on-primary-fixed, ...) have the same value in light and dark.

Measured contrast (engine-computed from the hex): light on-surface/surface 16.23, on-surface-variant/surface 8.88, primary/surface 6.12, on-primary/primary 6.44, on-primary-container/primary-container 13.32, outline/surface 4.33, outline-variant/surface 1.62. Dark: on-surface/surface 14.35, on-surface-variant/surface 10.91, primary/surface 10.91, on-primary/primary 7.71, on-primary-container/primary-container 7.23, outline/surface 5.87, outline-variant/surface 1.99, inverse-primary/inverse-surface 4.97.

### 3.9 Component dimensions (v0_192 tokens)

| Component | Values |
|---|---|
| Filled / outlined / text button | height 40, shape full, label-large, icon 18, outline 1 (outlined) |
| Elevated / filled / outlined card | shape medium 12, icon 24, outline 1 (outlined) |
| Dialog | shape extra-large 28, headline-small, supporting body-medium, action label-large, icon 24 |
| Filled text field | shape extra-small-top, indicator 1 resting / 2 focused, input body-large, label body-large shrinking to body-small, supporting body-small, icons 24 |
| Outlined text field | shape extra-small 4, outline 1 resting / 2 focus, same type as filled |
| Assist chip | height 32, shape small 8, outline 1, label-large, icon 18 |
| Navigation bar | height 80, indicator 64 by 32 (full), icon 24, label-medium, container shape none |
| Switch | track 52 by 32, outline 2, handle 16 off / 24 on or with icon / 28 pressed, icon 16 |
| Checkbox | box 18, outline 2 (unselected), corner 2, icon 18 |
| Slider | active and inactive track 4, handle 20 by 20, value label container 28, tick 2, label-medium |
| Menu | container shape extra-small |

## 4. Dos and Don'ts

- Do: card hover that adds an 8% on-surface overlay and nothing else. Don't: swap the card to a different hex colour per state; the dark theme then needs a second set.
- Do: an outlined field with the `outline` colour at 1 px that thickens to 2 px on focus, plus the 3 px focus ring when keyboard-focused. Don't: use `outline-variant` for the field border; at 1.6:1 it is invisible to many users.
- Do: a dialog with 28 px corners, headline-small title, body-medium text and label-large actions. Don't: stretch a 12 px card radius onto a dialog or a 28 px radius onto a card.
- Do: enter a menu with standard-decelerate over 200-250 ms and leave with standard-accelerate over 100-150 ms. Don't: use the same duration for both, or `ease-in-out` for both.
- Do: fade a scrim with a short linear or standard transition and slide the panel with emphasized-decelerate. Don't: spring the opacity.

## 5. Exceptions & judgement calls

- **Token versions disagree.** v0_192 focus and pressed layers are 0.12; the latest set says 0.10. Neither is wrong; they are different releases. Pin one in `tokens/` and note it.
- **`easing-emphasized` is not an independent curve on web.** Both SCSS versions define it as equal to standard. If a spec says "use emphasized" the engineer-safe reading is the decelerate/accelerate pair, chosen by direction.
- **Conflict with `knowledge/web/motion-tokens.json`:** that file caps ordinary UI at 300 ms ("moderate", UI ceiling) and uses 400-800 ms only for hero reveals, while M3 treats 250-400 ms as the normal medium bucket and goes to 1000 ms. The engine ceiling is a taste choice; M3 durations are not wrong for a mobile app, but 700-1000 ms on a landing page is risky. Also that file's default enter curve is `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out-quint) versus M3 standard `cubic-bezier(0.2, 0, 0, 1)`; both are decelerating, so mixing them within one product is the real error.
- **Conflict with `knowledge/web/design-systems.md` radius rule** (control = base, card = base + 4-6, modal = base + 8): M3 gives control full, card 12, dialog 28 (about card + 16). The engine's generic rule produces smaller modal radii than M3. Neither is a hard rule; check the relationship (modal radius larger than card larger than control) rather than the exact offsets.
- **Conflict with `knowledge/web/design-systems.md` breakpoints** (Tailwind 640 / 768 / 1024 / 1280 / 1536; coss keys on `sm` 640): M3 classes switch at 600 / 840 / 1200 / 1600. No need to copy M3 for web; keep coss's `sm` and add M3 only for Android or Compose targets. `knowledge/web/courses-and-curricula.md` line 542 lists only compact/medium/expanded as an [engine note]; section 3.7 here supersedes it and adds large (1200) and extra-large (1600).
- **Type-scale caution.** M3 sizes are app-oriented: body-large 16 px, display-large 57 px. Landing-page heroes routinely exceed 57 px; treat the scale as a floor for readable app text, not a ceiling for marketing display type. Negative tracking is only used at 57 px here, which agrees with `design-systems.md` (letter-spacing -0.015 to -0.06 em at 48 px and up) in direction but not in size: -0.25 px at 57 px is about -0.004 em, far gentler than the engine's rule.
- **Weight emphasis.** The emphasized scale shifts every weight up one step (500 and 600); it is a deliberate accessibility and brand knob, not a default.

## 6. Figures worth keeping

- No figures; this is a token source. The easing curves would be worth rendering as a single plot in `examples/` (all 10 curves, bezier editor style).

## 7. Open questions

- Update: `gaps-material3-color-and-breakpoints.md` (another pass, rendered with Playwright) now covers window size classes, margins (16/24), panes and HCT tone arithmetic and agrees with section 3.7 here; read it for layout. Still unread from m3.material.io: the motion guideline prose. Original note: `m3.material.io` pages (motion overview, window size classes, layout columns/margins) are JS-rendered and not readable by plain fetch. The size-to-duration-bucket mapping (MDX-02) and per-class margins and column counts (compact 4 columns / 16 margin, medium 8 / 24, expanded 12 / 24 are my recollection) are therefore unverified and not stated as rules.
- The component token files for FAB and primary tab returned no size values; their dimensions are missing from section 3.9.
- `md-sys-state` in the latest set lists no `disabled-container` value; the 0.12 figure comes from the filled-button component token.
- Spring tables for the "expressive" scheme (damping 0.6 etc.) in `knowledge/web/motion-tokens.json` are not present in the web SCSS fetched here; the web file only has the standard-scheme springs shown in 3.3, which match the "standard" set in that JSON.
