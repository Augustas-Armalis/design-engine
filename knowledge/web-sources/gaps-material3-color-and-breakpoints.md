---
source: web:https://m3.material.io (breakpoints, layout, spacing, color system pages, read through a headless browser) + https://github.com/material-foundation/material-color-utilities (TypeScript: hct.ts, dislike_analyzer.ts, dynamic_scheme.ts, color_spec_2021.ts, contrast_curve.ts, tonal_palette.ts) + https://developer.android.com/develop/ui/compose/layouts/adaptive/window-size-classes
chapter: Gap fill - Material 3 breakpoints (window size classes), layout, spacing, density, and HCT colour (tone arithmetic, palette chroma, contrast levels)
pages: n/a
topic_tags: [material-3, hct, tone, contrast, color-roles, tonal-palette, breakpoints, window-size-classes, panes, margins, spacing, density, touch-targets]
status: studied
---

# Gap fill: Material 3 colour (HCT) and breakpoints, from official pages and source

Read 2026-10-08. The previous pass could not read m3.material.io because the site is client-rendered; this pass used Playwright to render the pages and read the TypeScript source of Material Color Utilities (Apache-2.0, so exact numbers are reproduced). Raw text is in `corpus/web/gaps/` (m3-site-*, m3-*-ts, m3-android-*). Rule IDs use the prefix MCB-. This note complements `material3-tokens.md` (motion, typescale, shape, role hex values) and supersedes its open question about breakpoint margins.

Labels: **[fetched]** read on the official page or in the source; **[computed]** I calculated it here; **[engine note]** my inference. Dates: the m3.material.io layout pages say "May 2026" for the latest layout-scaffold update and rename "window size classes" to "breakpoints" and "responsive layout" to "adaptive design". The colour utilities default to the 2021 spec on a phone platform; the 2025 and 2026 specs exist in the same repository.

Units. Material says its breakpoints "apply to Android and web". For web, treat dp as CSS px (the density page defines dp as one physical pixel at density 160, which is the CSS reference pixel in practice). [engine note]

## 1. Core ideas

1. **Design for breakpoints, not for devices.** The window is dynamic (split screen, unfolding, free-form windows), so layouts must adapt at runtime; size classes are not an `isTablet` test. [fetched]
2. **Five breakpoints, one majority device each.** Compact under 600, medium 600 to 839, expanded 840 to 1199, large 1200 to 1599, extra-large 1600 and up. Width matters most; height classes are rarely needed. [fetched]
3. **Panes are the unit of adaptation:** 1 pane at compact, 1 (or 2 for low-density content) at medium, 2 at expanded and large, 1 to 3 at extra-large. [fetched]
4. **Five questions guide each step up:** what to reveal, how to divide the screen, what to resize, what to reposition, what to swap. [fetched]
5. **Colour is arithmetic on tone.** HCT separates hue, chroma and tone; tone is CIE L* lightness, so contrast is a function of the tone difference, which lets one tone gap guarantee a contrast ratio and makes light, dark and higher-contrast schemes simple re-assignments of tones. [fetched in source comment]
6. **One source colour generates five palettes** with fixed chroma recipes per variant; roles then pick tones from them. [fetched in source]
7. **Density is opt-in and never goes below a 48 by 48 CSS pixel target by default.** [fetched]
8. **Spacing lives on the parent:** padding and gaps on the container, margins only in layouts; an 8dp scale. [fetched]

## 2. Rules

### 2.1 Breakpoints and panes

- **RULE [MCB-01]** Use these width breakpoints for adaptive web and app layouts: compact below 600, medium 600 to 839, expanded 840 to 1199, large 1200 to 1599, extra-large 1600 and above (CSS px). Height classes (compact below 480, medium 480 to 899, expanded 900 and above) matter only for phones in landscape or foldables.
  **Why** Each class is the majority case for a device family (compact: 99.96 percent of portrait phones; medium: 93.73 percent of portrait tablets; expanded: 97.22 percent of landscape tablets), and they map to Material's layout guidance.
  **Applies to** all. **Check** the stylesheet's media or container queries include breakpoints at 600, 840, 1200 and 1600 (or the project documents why Tailwind's 640/768/1024/1280/1536 is used instead); no UA sniffing. **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes and https://developer.android.com/develop/ui/compose/layouts/adaptive/window-size-classes (read 2026-10-08)

- **RULE [MCB-02]** Base layout decisions on the available window size at runtime, not on device type; recompute when the window is resized, rotated, folded or split.
  **Why** A phone in split screen or an app in a resizable window changes class during its life.
  **Applies to** all. **Check** resize the viewport through 5 widths (360, 700, 900, 1300, 1700) and capture screenshots; layout changes occur at the breakpoint widths, with no overflow at any width. **Source** https://developer.android.com/develop/ui/compose/layouts/adaptive/window-size-classes (read 2026-10-08)

- **RULE [MCB-03]** Choose pane count by breakpoint: compact 1; medium 1 (or 2 only for low-density content such as settings); expanded 1 or 2 (2 recommended); large 1 or 2 (2 recommended); extra-large 1 to 3. Never use more than three panes.
  **Why** Two panes at medium width with dense content reduce usability; extra-large space supports a third pane (a standard side sheet).
  **Applies to** SaaS app UI. **Check** count of columns of independently scrolling content per breakpoint matches; at 600 to 839 px a two-pane layout only if rows are low-density. **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes (read 2026-10-08)

- **RULE [MCB-04]** Margins: 16 at compact; 24 at medium, expanded, large and extra-large. The spacer (gutter) between panes is 24 at every size from medium up.
  **Why** Official values from the per-breakpoint pages; a consistent spacer keeps panes visually separate.
  **Applies to** SaaS app UI | landing page. **Check** computed `padding-inline` of the page container is 16px below 600px and 24px at 600px and above; gap between panes 24px. **Source** https://m3.material.io/foundations/layout/applying-layout/compact and .../medium, .../expanded, .../large-extra-large (read 2026-10-08)

- **RULE [MCB-05]** In a two-pane layout at medium width give each pane 50 percent of the window and avoid custom widths; a drag handle may expand a pane to 100 percent. At expanded width use a fixed-plus-flexible layout with the fixed pane 360 wide (412 at large and extra-large); in a split-pane layout keep the spacer visually centred even when an expanded navigation rail is present by shrinking the leading pane.
  **Why** Predictable pane widths make adaptation repeatable; centred spacer avoids lopsided composition.
  **Applies to** SaaS app UI. **Check** pane widths computed: 50/50 at 600 to 839; the fixed pane equals 360 (840 to 1199) or 412 (1200 and up) px. **Source** https://m3.material.io/foundations/layout/applying-layout/medium and .../expanded and .../large-extra-large (read 2026-10-08)

- **RULE [MCB-06]** Navigation by breakpoint: compact uses a bottom navigation bar or a modal expanded rail; medium uses a rail for single pane or a bar for two panes; expanded, large and extra-large use a collapsed or expanded navigation rail (expanded rail suits extra-large). Put sorting, filtering and secondary navigation as tabs or controls inside the pane.
  **Why** Controls near the edge are easier to reach; rails use wide windows better than bottom bars.
  **Applies to** SaaS app UI. **Check** bottom tab bar present only below 600px; sidebar/rail present at 840px and up. **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes (read 2026-10-08)

- **RULE [MCB-07]** Swap components across breakpoints for the same job: communication dialogs become full-screen at compact and simple dialogs from medium up; actions that use a bottom sheet at compact use a menu from medium up.
  **Why** Ergonomics and available space change what the right container is.
  **Applies to** SaaS app UI | mobile. **Check** modal containers at 360px are full-screen or bottom sheet; at 840px they are centred dialogs or popovers. **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes (read 2026-10-08)

- **RULE [MCB-08]** When stepping up a breakpoint, ask five questions in order: what should be revealed (a rail open by default, a second pane); how should the screen be divided; what should be resized (cards, feeds, lists, panes, with type and margins adjusted); what should be repositioned (actions from bottom to leading edge, a second column, more negative space); what should be swapped (bottom bar to rail). Additional space is not just the same thing bigger.
  **Why** A systematic checklist prevents stretched mobile layouts on desktop.
  **Applies to** all. **Check** at each breakpoint, the screenshot differs structurally from the previous (a new pane, a swapped component or a repositioned control), not only in scale. **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes (read 2026-10-08)

- **RULE [MCB-09]** Keep text between 40 and 60 characters per line across breakpoints by adjusting margins and type styles.
  **Why** Material's guidance for readability on resizing layouts; large and extra-large windows especially need line-length control.
  **Applies to** all. **Check** measure characters per line of body paragraphs at 5 widths: 40 to 60 in apps (see section 5 for the 45 to 90 band elsewhere in this repo). **Source** https://m3.material.io/foundations/layout/applying-layout/window-size-classes (read 2026-10-08)

- **RULE [MCB-10]** Limit interactions in the top quarter of a tablet-sized screen and avoid essential controls hard against the bottom edge; comfortable reach is the middle and lower-middle.
  **Why** On landscape tablets and unfolded foldables the upper 25 percent is out of reach unless the grip changes.
  **Applies to** mobile. **Check** for viewports 600 to 1199px tall-and-touch, count primary actions whose bounding box top is in the first 25 percent of the viewport (target 0 for primary actions); `visual`. **Source** https://m3.material.io/foundations/layout/applying-layout/medium (read 2026-10-08)

- **RULE [MCB-11]** Start from one of three canonical layouts: feed (cards in a configurable grid), list-detail (two side-by-side panes), supporting pane (primary area about two thirds, supporting content the rest). For feeds, let columns follow width with a minimum column size (Compose example: adaptive grid with 180dp minimum).
  **Why** Tested starting points for common patterns across all breakpoints.
  **Applies to** SaaS app UI. **Check** feed grid uses `repeat(auto-fill, minmax(180px, 1fr))` or equivalent; supporting pane ratio about 2:1. **Source** https://m3.material.io/foundations/layout/canonical-examples and https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts (read 2026-10-08)

- **RULE [MCB-12]** Place layout regions on the grid in this order: bars and rails at the edges first, then panes in the remaining space. Keep surface colour mappings the same per region across breakpoints (body = surface, navigation = surface container); more surface-container levels may be added at larger sizes if applied consistently.
  **Why** Edge regions define the usable area; consistent region colours keep the identity across sizes.
  **Applies to** SaaS app UI. **Check** computed background of the nav region and main region equals across breakpoints. **Source** https://m3.material.io/foundations/layout/grids-spacing/grids and https://m3.material.io/styles/color/roles (read 2026-10-08)

### 2.2 Spacing and density

- **RULE [MCB-13]** Use an 8dp-based spacing scale where space100 equals 8dp; define only the recommended steps and extend when needed. Put padding and gaps on the parent container and avoid margins on child elements; use margins mainly in page layouts.
  **Why** Child margins are rarely uniform and require more tokens; parent-owned gaps are consistent.
  **Applies to** SaaS app UI | all. **Check** CSS uses `gap` on containers; child `margin` declarations inside components count at most about 5 percent of spacing declarations ([engine note] threshold). **Source** https://m3.material.io/m3/pages/spacing/overview (read 2026-10-08)

- **RULE [MCB-14]** Group by proximity and rhythm: close spacing links related items (image and caption), larger spacing separates unrelated items, similar elements share identical spacing and size, leading elements (thumbnails, avatars, icons) align, and key actions and titles appear in consistent places across pages.
  **Why** Spacing is the first grouping tool; consistent focal points make a product recognisable.
  **Applies to** all. **Check** gap(inside group) < gap(between groups) for each repeating group; thumbnails in a list share width and height. **Source** https://m3.material.io/foundations/layout/grids-spacing/spacing (read 2026-10-08)

- **RULE [MCB-15]** Keep interactive targets at least 48 by 48 CSS px by default, even when the visible icon is smaller; do not scale components below that unless the user opts in to density.
  **Why** Dense components can be inaccessible; the target, not the glyph, sets the size.
  **Applies to** all. **Check** computed hit-area of buttons, toggles and links at least 48 by 48 on touch layouts (WCAG 2.5.8 requires 24 by 24 as the floor; Apple 44; see section 5). **Source** https://m3.material.io/foundations/layout/grids-spacing/density (read 2026-10-08)

- **RULE [MCB-16]** Offer density as a user setting on a numbered scale (0 default, then -1, -2, -3, each typically reducing a component's height or vertical padding by 4dp), keep text size unchanged when a container scales, and keep the settings controls themselves at default size. Do not apply density by default, do not densify focused-task components (menu choice) or alert components (snackbars, dialogs), and do not change density automatically across breakpoints.
  **Why** Higher density helps scanning tables and dashboards but hurts targets and urgency.
  **Applies to** SaaS app UI. **Check** `data-density` attribute (or equivalent) is set from user preference only; text size identical across density modes; menu items stay at least 48px tall. **Source** https://m3.material.io/foundations/layout/grids-spacing/density (read 2026-10-08)

### 2.3 Colour: tone, contrast and palettes (HCT)

- **RULE [MCB-17]** Use tone (HCT tone, which equals CIE L*) as the contrast control: in the library's own comment, a tone difference of 40 gives a contrast ratio of at least 3.0 and a difference of 50 gives at least 4.5. Compute the foreground and background L* and require the difference.
  **Why** L* is perceptually linear, so contrast becomes a subtraction; fixed tone gaps make accessible pairs by construction.
  **Applies to** all. **Check** compute L* = 116 f(Y) - 16 for each text/background pair; require |ΔL*| at least 50 for body text and at least 40 for large text/graphics, then confirm with the actual WCAG ratio. Caveat [computed]: the 50-gap claim holds from about 4.48 to 5.73 depending on position (50 against 100 gives 4.48, just under 4.5) and 40-gap pairs range from 3.17 to 4.15, so always verify the real ratio near the extremes. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/hct/hct.ts (read 2026-10-08)

- **RULE [MCB-18]** Treat the colour model as three independent axes: hue 0 to 360 (circular), chroma from 0 (gray) to a hue- and tone-dependent maximum (HCT values top out at roughly 120), tone 0 (black) to 100 (white). Changing hue or chroma at constant tone does not change contrast. Expect chroma to drop when a requested hue/tone cannot render that chroma.
  **Why** Unlike HSL or RGB, HCT lets you move hue and chroma without moving lightness.
  **Applies to** all. **Check** when generating ramps keep L* constant per step across hues (variance of L* per step below 1); clamp chroma by gamut rather than clipping channels. **Source** https://m3.material.io/styles/color/system/how-the-system-works (read 2026-10-08)

- **RULE [MCB-19]** Generate a scheme from one source colour into five tonal palettes (primary, secondary, tertiary, neutral, neutral-variant), plus a fixed error palette (hue 25, chroma 84). Tone steps run 0, 10 through 100 by 10, plus 95, 98, 99 (neutral palettes add further steps, see `material3-tokens.md`).
  **Why** A small recipe produces a complete, accessible system from one input.
  **Applies to** all. **Check** palette file lists exactly these keys; error hue and chroma match. **Source** https://m3.material.io/styles/color/system/how-the-system-works and dynamic_scheme.ts (read 2026-10-08)

- **RULE [MCB-20]** For the default "tonal spot" scheme (2021 spec, phone): primary chroma 36 at the source hue; secondary chroma 16 at the source hue; tertiary hue plus 60 degrees at chroma 24; neutral chroma 6; neutral-variant chroma 8. The 2025 spec lowers primary to chroma 32 (26 for dark on phone), keeps secondary at 16, uses neutral chroma 5 on phone and 10 elsewhere, neutral-variant 1.7 times that, and picks the tertiary hue from a rotation table (chroma 28 on phone, 32 otherwise).
  **Why** Low-to-medium colourfulness with a related tertiary is the Android 12 and 13 default look; the numbers let a brand palette be built reproducibly.
  **Applies to** SaaS app UI | landing page. **Check** a palette script reproducing these chroma values from a seed hue; neutrals have chroma at most 10 in HCT. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dynamiccolor/dynamic_scheme.ts (read 2026-10-08)

- **RULE [MCB-21]** Other scheme variants for reference (2021 spec primary / secondary / tertiary / neutral / neutral-variant chroma): neutral 12 / 8 / 16 / 2 / 2; vibrant 200 / 24 / 32 / 10 / 12 (secondary and tertiary hues rotated by lookup tables); expressive 40 at hue plus 240 / 24 / 32 / 8 / 12; rainbow 48 / 16 / (hue plus 60) 24 / 0 / 0; fruit salad primary 48 at hue minus 50; monochrome all 0; content and fidelity use the source chroma for primary and derived values for the rest (secondary = max(chroma minus 32, half of chroma); neutral = chroma / 8; neutral-variant = chroma / 8 plus 4).
  **Why** A menu of recipes from restrained to vivid.
  **Applies to** SaaS app UI. **Check** `visual`; scripted palette tests per variant. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dynamiccolor/dynamic_scheme.ts (read 2026-10-08)

- **RULE [MCB-22]** Avoid the universally disliked colour: dark yellow-green. Treat a colour as disliked when rounded hue is 90 to 111, rounded chroma above 16 and rounded tone below 65, and fix it by lifting tone to 70 (hue and chroma unchanged).
  **Why** Colour-preference research (cited in the source: Palmer and Schloss) shows distaste for dark yellow-greens.
  **Applies to** all. **Check** for each brand/accent colour convert to HCT and fail if the three conditions hold. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dislike/dislike_analyzer.ts (read 2026-10-08)

- **RULE [MCB-23]** Treat these HCT hue bands specially in palette logic: blue 250 to 270, yellow 105 to 125, cyan 170 to 207. Blue seeds get higher chroma in some 2025-spec variants (for example the neutral scheme's primary palette is chroma 12 for blue versus 8 otherwise on phone), and tone 99 of a yellow palette is averaged from tones 98 and 100 to avoid an off-white artifact.
  **Why** Blue and yellow behave differently in gamut and perception.
  **Applies to** all. **Check** palette generator special-cases these bands. **Source** hct.ts and tonal_palette.ts (read 2026-10-08)

- **RULE [MCB-24]** Assign light and dark roles by tone, not by inversion. Light/dark tones (2021 spec): surface 98/6; on-surface 10/90; surface-variant 90/30; on-surface-variant 30/80; primary 40/80; on-primary 100/20; primary-container 90/30; on-primary-container 30/90; outline 50/60; outline-variant 80/30; inverse-surface 20/90; inverse-on-surface 95/20; shadow and scrim 0. Surface containers: lowest 100/4, low 96/10, container 94/12, high 92/17, highest 90/22; surface-dim 87/6; surface-bright 98/24.
  **Why** Tone assignment keeps contrast and perceived brightness balanced across themes; containers form an ordered elevation ladder.
  **Applies to** SaaS app UI. **Check** the token file's L* for each role matches these tones within 1; nested surfaces differ by at least one container step. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dynamiccolor/color_spec_2021.ts (read 2026-10-08)

- **RULE [MCB-25]** Support contrast levels through role curves rather than new palettes. The library interpolates between values defined at contrast levels -1, 0, 0.5 and 1. Default (0) targets: on-surface 7:1 (4.5 low, 11 medium, 21 high), on-surface-variant 4.5:1 (3, 7, 11), primary against its surface 4.5:1 (3, 7, 7), outline 3:1 (1.5, 4.5, 7), outline-variant 1:1 (1, 3, 4.5). Containers shift: light surface-container-high 92 to 88 to 85, dark 17 to 21 to 25.
  **Why** One scheme serves standard, medium and high contrast; hierarchy (high and low contrast elements) is preserved at standard.
  **Applies to** all. **Check** token set provides `prefers-contrast: more` overrides that raise body text to 7:1 or more and borders to 3:1 or more. **Source** https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dynamiccolor/color_spec_2021.ts and contrast_curve.ts (read 2026-10-08). The m3.material.io prose describes medium contrast as 3:1 minimum and high as 7:1, which describes a different slice than the code's per-role values; see section 5.

- **RULE [MCB-26]** Use colour roles only in their intended pairs and layers: a container role is a fill, never a text or icon colour; "on" roles are for content on the matching fill; surface, on-surface and on-surface-variant are the default content colours on any surface or surface-container. Do not remap roles for visual effect.
  **Why** Pair-based tones keep contrast when the user changes contrast level; ad hoc mappings break it.
  **Applies to** SaaS app UI. **Check** lint: no `text-*` using a `*-container` token; each fill token used with its `on-*` partner. **Source** https://m3.material.io/styles/color/roles (read 2026-10-08)

- **RULE [MCB-27]** Clustered controls (a row of buttons) need at least 3:1 between the control's container colour and the background; standalone prominent elements (a floating action button) and disabled states are exempt.
  **Why** Elements in a cluster must be distinguished from the group; prominent standalone elements are already distinguishable.
  **Applies to** all. **Check** contrast of button container versus page background at least 3:1 for buttons with siblings. **Source** https://m3.material.io/foundations/designing/color-contrast (read 2026-10-08)

- **RULE [MCB-28]** Give each accent role a fixed job: primary for the most important actions and active states, secondary for less urgent elements (selected nav icon, tonal button, filter chip), tertiary for small contrasting accents (a badge, an input field) at the designer's discretion, error for error states and kept static (it does not change with the source colour, but still adapts to light and dark).
  **Why** Emphasis follows importance; error must stay recognisable.
  **Applies to** SaaS app UI. **Check** count of primary-filled controls per viewport at most 1 to 2; error colour constant across brand variants. **Source** https://m3.material.io/styles/color/roles (read 2026-10-08)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Width breakpoints (dp = CSS px) | 0-599 compact; 600-839 medium; 840-1199 expanded; 1200-1599 large; 1600+ extra-large | m3.material.io breakpoints |
| Height breakpoints | under 480; 480-899; 900+ | Android window size classes |
| Device coverage | compact 99.96% of portrait phones; medium 93.73% of portrait tablets; expanded 97.22% of landscape tablets; compact height 99.78% of landscape phones | Android window size classes |
| Margins | compact 16; medium/expanded/large/extra-large 24 | per-breakpoint pages |
| Spacer between panes | 24 (medium and up) | per-breakpoint pages |
| Pane widths | medium two-pane 50/50; fixed pane 360 (expanded), 412 (large, xl); side sheet max 400; max 3 panes | per-breakpoint pages |
| Line length | 40-60 characters | breakpoints overview |
| Reach | top 25% of tablet screen hard to reach | medium page |
| Spacing scale | 8dp base; space100 = 8dp; search example: 8 vertical padding, 8 horizontal gap, 24 margin (12 when focused) | spacing system |
| Density scale | 0, -1, -2, -3; 4dp per step; target at least 48 x 48 | density page |
| HCT | hue 0-360; chroma 0 to ~120; tone 0-100 | how-the-system-works |
| Tone-gap rule | 40 -> contrast 3.0; 50 -> 4.5 (source comment; see check caveat) | hct.ts |
| Pairing examples | tones 50 and 98 give a 3:1 minimum (computed 4.27:1); tones 30 and 98 give a 7:1 target (computed 8.89:1) | how-the-system-works + [computed] |
| Disliked colour | hue 90-111, chroma over 16, tone under 65 -> lift to tone 70 | dislike_analyzer.ts |
| Special hues | blue 250-270; yellow 105-125; cyan 170-207 | hct.ts |
| Error palette | hue 25, chroma 84 | dynamic_scheme.ts |
| Tonal spot (2021) | primary 36; secondary 16; tertiary hue +60 chroma 24; neutral 6; neutral-variant 8 | dynamic_scheme.ts |
| Tonal spot (2025, phone) | primary 32 (dark 26); secondary 16; tertiary chroma 28; neutral 5; neutral-variant 8.5 | dynamic_scheme.ts |
| Contrast levels | -1 (low), 0 (standard), 0.5 (medium), 1 (high) | contrast_curve.ts |
| Colour roles | 26 standard roles, plus add-on surface and fixed roles | how-the-system-works |

[computed] contrast values for tone gaps, using the WCAG formula with L* converted to luminance: gap 40 gives 3.17 to 4.15 across the range; gap 50 gives 4.48 to 5.73.

## 4. Dos and Don'ts

- **Do** use the same surface roles for body and navigation at compact and at medium (surface and surface container). **Don't** switch to a different colour mapping for the same region at a new size.
- **Do** use a container role for a button fill with the matching "on container" role for its label. **Don't** map primary, primary container, secondary container and on-surface independently; the pairs break as contrast level changes.
- **Do** keep a 48 by 48 target when the icon is 24. **Don't** shrink buttons for density in menus, dialogs or snackbars.
- **Do** place a two-pane layout at medium only for low-density content (settings). **Don't** put a dense table beside a list at 700px.
- **Do** put padding and gaps on the container. **Don't** add margins to each child.

## 5. Exceptions & judgement calls

- **Conflict with `design-systems.md` and `implementation-craft.md` breakpoints.** Tailwind/coss use 640/768/1024/1280/1536; Material uses 600/840/1200/1600. Keep coss's `sm` (640) as the density hinge; use Material's classes when targeting Android or Compose, or when pane count must change: the Material values are structural (pane count, nav type) while Tailwind's are utility hooks. The Vercel brand CSS uses yet another set (about 600, 640, 800, 900, 1000). [engine note]
- **Margins, previously unverified.** `material3-tokens.md` said compact 16 and medium/expanded 24 were from memory; they are now verified by the official pages, and large and extra-large are also 24. Grid column counts (4, 8, 12) are still not stated on the pages read and remain unverified.
- **Line length 40 to 60 versus the repo's 45 to 90 (Practical Typography) and 60 to 68ch (Every Layout, Vercel).** Material's figure is for adaptive app layouts and mobile-first text; for web marketing prose use 60 to 68ch; for narrow app panes 40 to 60 is fine.
- **Target size.** Material says 48 by 48; Apple HIG says 44 by 44 (see `apple-hig-layout-and-spacing.md`); WCAG 2.5.8 requires only 24 by 24 CSS px (AA). The repo's coss density hinge expands pointer-coarse hit areas to 44. Use 44 as the web floor and 48 for Android-targeted UI. [engine note]
- **Contrast prose versus code.** The colour-system page says medium contrast gives a minimum 3:1 and high contrast 7:1 for those who need it, while the per-role code curves give default 7:1 for on-surface text (21:1 at high) and 4.5:1 for secondary text. Both are true for different roles; the prose is a summary. When implementing, copy the per-role curves.
- **Tone-gap claim is approximate.** Gap 50 gives 4.48 at the 50 to 100 extreme (below 4.5). Use tone gaps for fast generation and verify the actual ratio.
- **Dynamic colour from wallpaper** is Android-specific; for web brands use the hand-picked source colour path and static schemes.
- **Higher density is a user choice, but coss makes controls taller on small viewports** (touch), which is consistent with not changing density by breakpoint only if that is the touch-size adaptation, not the density setting. [engine note]
- **HCT versus OKLCH.** The repo's palettes are authored in OKLCH (`color-and-surfaces.md`). HCT tone (L*) differs from OKLCH L; do not mix the two tone scales. The Stripe and Linear posts use Lab/LCH-style uniform lightness similarly. A converter is a small script if HCT tone gaps are wanted.

## 6. Figures worth keeping

The m3.material.io breakpoint diagrams (five width classes), pane layouts per class, the reach-region map on the medium page, and the tonal-palette stripes (0 to 100) on the colour pages. Capture via Playwright screenshot later for `examples/`.

## 7. Open questions

- Grid column counts and gutters per breakpoint are not on the pages read (the "Grids" page describes behaviour but not numbers). Possible source: Material Design Kit in Figma, or the Compose `Rulers` documentation.
- `m3.material.io/foundations/layout/grids-spacing` pages mention a spacing token page ("Applying spacing", "Spacing tokens"); only the overview was read. Web implementations of the spacing system are listed as unavailable.
- The 2026 colour spec (`color_spec_2026.ts`, 27 KB) and the "CMF" variant exist in the repository but were not studied; the 2025 spec (42 KB) was only skimmed for palette chroma.
- Typescale/shape/motion are covered in `material3-tokens.md`; the m3.material.io motion pages were not re-read.
- Hex swatch values of the baseline scheme are in `material3-tokens.md`, not repeated.
