---
source: web:https://developer.apple.com/design/human-interface-guidelines (+ m3.material.io tokens via material-web, radix-ui/themes, ui.shadcn.com, base-ui.com, coss.com/ui, tailwindcss.com, carbondesignsystem.com, @shopify/polaris-tokens, @primer/primitives, @atlaskit/tokens, vercel.com/geist, open-props, utopia.fyi, every-layout.dev, designtokens.org, linear.app/now, stripe.com/blog)
chapter: How the best design systems specify things (cross-system comparison + measured marketing sites + coss ui conventions)
pages: n/a (web; fetched 2026-10-08)
topic_tags: [design-systems, tokens, spacing, type-scale, radius, sizing, touch-targets, density, z-index, motion, breakpoints, coss-ui, base-ui, tailwind-v4, theming]
status: studied
---

# How the best design systems specify things

Companion file with the token schema and the spacing/radius/sizing rules: `tokens-spacing-radius-sizing.md`.

**Provenance.** Values marked (T) were read from the system's own shipped token/source files (npm package, GitHub raw, registry JSON). (D) = the system's published docs. (M) = measured by this project with Playwright (headless Chromium, 1440 px and 390 px viewports, 2026-10-08) on the live marketing homepage. (E) = `[engine note]`, my own knowledge, not re-verified on the web this session. Anything not marked (T)/(D)/(M) is (E).

## 1. Core ideas

1. **Every mature system is a small number of ramps, not a pile of values.** Space, type, radius, height, duration, z-index are each one named ramp (usually 6-13 steps). Components never use raw numbers, they pick a step. Primer's own agent guide states it as law: "Never use raw values (hex, px, etc.). Only use semantic tokens." (T: `@primer/primitives` DESIGN_TOKENS_GUIDE.md)
2. **Space is a 4 px lattice; hit areas and control heights are on an 8 px (4 px at the small end) lattice.** Tailwind v4 (`--spacing: 0.25rem`), Radix (4,8,12,16,24,32,40,48,64), Carbon (2,4,8,12,16,24,32,40,48,64,80,96,160), Atlassian (2,4,6,8,12,16,20,24,32,40,48,64,80), Polaris (1,2,4,6,8,12,16,20,24,32,40,48,64,80,96,112,128). All are the same lattice with different cuts. The ramp gets coarser as it grows (steps of 2 -> 4 -> 8 -> 16 -> 32), which is what makes it feel proportional.
3. **Name the token after the thing it is, or after its value, never after a vibe.** Polaris `space-400` = 16 px (value x 25 in rem/4px units); Atlassian `space.100` = 8 px; Geist `text-heading-48` = 48 px; Radix 1-9 / 1-12 steps with documented roles; Primer `--control-medium-size`. Value-encoded or role-encoded names let an agent (and a linter) check usage.
4. **Three tiers: primitive -> semantic -> component.** Primer: `--base-size-16` -> `--stack-gap-normal` / `--control-medium-paddingInline-normal` -> component CSS. shadcn/coss: Tailwind palette -> `--primary` / `--muted-foreground` -> `bg-primary`. Only the semantic tier is allowed in feature code.
5. **Every surface token has a paired foreground token.** shadcn/coss: `--card` + `--card-foreground`; Primer: `bgColor-*-emphasis` MUST pair with `fgColor-onEmphasis`; Radix Colors: steps 9/10 pair with white or dark text per hue. Pairing is what guarantees contrast without per-component checks.
6. **Density is a first-class axis, not a redesign.** Primer ships `condensed | normal | spacious` for control padding and stack gaps, and swaps `--control-minTarget` by pointer type (`fine` 16 px, `coarse` 44 px). coss does the same with breakpoints: every control is 4 px taller below `sm` (640 px) and its hit area is expanded to 44 px under `pointer-coarse`. Radix has a global `scaling` (90/95/100/105/110 %) that multiplies the whole space/type/radius system.
7. **Expressiveness comes from a handful of global knobs that derive everything else.** Radix: `radius` (none/small/medium/large/full -> factor 0/0.75/1/1.5/1.5 + full pill), `scaling`, accent + gray scale. shadcn: one `--radius` derives sm/md/lg/xl/2xl... Linear: 98 theme variables collapsed to 3 (base color, accent color, contrast) in LCH. Stripe: color "levels" are contrast positions, so any two hues 5 levels apart are guaranteed >= 4.5:1. Generic output happens when the knobs are left at defaults.
8. **Touch ergonomics are specified separately from visual size.** Visual 32 px button + 44 px hit region (coss `pointer-coarse:after:min-h-11 min-w-11`). Apple: 44x44 pt default, 28 pt minimum (iOS). Material: 48 dp with 8 dp separation. WCAG 2.2 AA: 24x24 CSS px (or 24 px spacing circle). Never enlarge the visible control just to satisfy touch.
9. **Inner radius = outer radius - gap.** Apple builds it into the platform (`ConcentricRectangle`, toolbars have "corner radii that are concentric with bar corners"); coss/shadcn encode it as `calc(var(--radius-lg) - 1px)` for the 1 px border inset highlight. Not following it is the most common "slightly off" tell.
10. **Layering is a short named list, and portals live in their own stacking context.** Primer: behind -1, default 0, sticky 100, dropdown 200, overlay 300, modal 400, popover 500, skipLink 600. Base UI: put `isolation: isolate` on the app root so portaled popups always win and app z-indexes never matter. coss uses `z-50` for all popups and `z-60` for toasts.
11. **Modern marketing type is lighter and tighter than "bold sans" defaults.** Measured: hero weights are 300-510 on 9 of 17 sites (Stripe 300, Shopify 300, Vercel 400, Figma 400, Resend 400, Tailwind 400, GitHub 425, Linear 510, Framer 500), tracking is -0.02em to -0.06em at 54-96 px, line-height is 1.0-1.1. (M)
12. **Machine-readable token format exists now.** W3C Design Tokens Community Group format 2025.10 is the first stable version (28 Oct 2025): `$value` / `$type`, `{group.token}` aliases, structured `dimension` `{value, unit}`, `color` `{colorSpace, components, alpha}`. (D)

## 2. Rules

Each rule: RULE / Why / Applies to / Check / Source.

### 2.1 Spacing

- **RULE** Use a 4 px base unit. Component-internal spacing from {4, 8, 12, 16, 24}; layout gaps from {16, 24, 32, 48, 64}; marketing section padding from {64, 80, 96, 128}. Allow 2 px only for hairline gaps (icon-to-label in dense UI, badge padding).
  **Why** Every top system converges on the same 4/8 lattice; consistent steps make nested spacing additive and diffs reviewable.
  **Applies to** all. **Check** collect computed `padding/margin/gap` on all elements; >= 95 % of non-zero values must be multiples of 4 px (2, 6, 10 allowed only inside controls <= 32 px tall). **Source** Tailwind `--spacing: 0.25rem` (D); Radix `space.css` (T); Carbon spacing (D); Primer `base-size-*` (T).
- **RULE** Spacing between siblings is owned by the parent (flex/grid `gap` or a stack with `> * + *`), not by margins on children.
  **Why** Margin belongs to the relationship between two elements; per-child margins leave orphan space at container ends and break when order changes. Every Layout: "style the context, not the element".
  **Applies to** all. **Check** count of non-zero `margin-top/bottom` on direct children of stacks; should be 0 except `margin-inline: auto`. **Source** every-layout.dev/layouts/stack (D).
- **RULE** Space between groups must be at least 2x the space inside groups (proximity). Typical ladder: 8 inside label+field, 16 between fields, 32 between field groups, 64-96 between sections.
  **Why** Gestalt proximity needs a visible ratio; Carbon/Primer define this as `stack-gap-condensed/normal/spacious` = 8/16/24 for components and larger section tokens above.
  **Applies to** all. **Check** ratio between inter-group gap and intra-group gap >= 2. **Source** Primer `--stack-gap-*` (T); Carbon (D).
- **RULE** Marketing section vertical padding: 64 px at 360-390 px viewport scaling to 128 px at >= 1280, via `clamp(4rem, 2.4348rem + 6.957vw, 8rem)`. Dense sections (logos strip, stats) use half. Do not go below 48 or above 160.
  **Why** Measured section padding: Linear 128, Resend 96, Framer 120, Figma 80, Shopify 64, Atlassian 48, Apple 110-160. Below 64 the page reads as an app, above 160 it reads as filler. (M)
  **Applies to** landing page. **Check** `padding-block` of top-level `section` between 64 and 160 (desktop). **Source** (M).
- **RULE** Page gutter (inline padding): 16 px < 480 px, 24 px >= 640, 32 px >= 1024. `clamp(1rem, 0.6087rem + 1.739vw, 2rem)` is the fluid equivalent.
  **Why** Measured mobile gutters: 16 (Stripe, Notion, Figma, Raycast, coss), 20 (Framer), 23-24 (Linear, Vercel, Supabase, Resend). Apple iOS standard margin is 16 pt (E). (M)
  **Applies to** all. **Check** left edge of H1/p at 390 px viewport is 16-24 px; no horizontal scroll (`scrollWidth == innerWidth`). **Source** (M).

### 2.2 Type

- **RULE** App UI base text is 14 px / 20 px (desktop). Marketing/prose base is 16 px / 24-26 px. On touch viewports (< 640 px) form controls use 16 px.
  **Why** 14 px is the base of Primer, Carbon productive, Atlassian, GitHub (14 px body measured), coss desktop. Inputs below 16 px trigger iOS Safari zoom; coss therefore uses `text-base sm:text-sm` on every control. Apple default size on iOS is 17 pt, minimum 11 pt.
  **Applies to** SaaS app UI, forms, mobile. **Check** computed `font-size` of `input, select, textarea` >= 16 px at 390 px viewport. **Source** coss registry (T); Apple HIG typography (T); Primer `base-text-size-sm` 14 px (T).
- **RULE** Hero/display type: size 48-72 px desktop (96 only for one-word-impact brands), line-height 1.0-1.1, letter-spacing -0.02em to -0.04em, weight 400-600 (not 700+).
  **Why** Measured heroes: Linear 64/64 -0.022em w510; Vercel 64/64 -0.06em w400; Stripe 48 -0.02em w300; GitHub 64 -0.035em w425; Figma 56 -0.022em w400; Framer 54 -0.04em w500; Notion 96 -0.048em w600; Tailwind 96 -0.05em w400. Large type needs negative tracking to hold optical density. Apple's SF tracking table is negative from 13 pt to 23 pt (-0.08 pt to -0.45 pt) and turns positive again from 24 pt up (a function of SF's optical sizing, [engine note]; apply negative tracking to web display type only for fonts without optical sizes). (M) (T)
  **Applies to** landing page. **Check** H1 computed `letter-spacing / font-size` in [-0.06, -0.015] when size >= 48 px; `line-height / font-size` <= 1.12. **Source** (M); Apple HIG tracking table (T).
- **RULE** Body line-height 1.5-1.6 at 14-18 px; paragraph measure 60-75 characters (`max-width: 65ch` or ~ 680 px); subtitle/lead 18-24 px at 1.4-1.5.
  **Why** Primer: normal 1.5 default, relaxed 1.625 for 12-13 px, snug 1.375 for display, tight 1.25 for single-line labels. Measured marketing paragraphs: 15/24 (Linear), 16/24 (GitHub), 16/22.4 at weight 300 (Stripe). (T) (M)
  **Applies to** all. **Check** `line-height/font-size` of paragraphs in [1.4, 1.7]; `width / (font-size*0.5)` <= 80 chars. **Source** Primer `base-text-lineHeight-*` (T).
- **RULE** Use at most two families plus mono; weights from {400, 500, 600} for UI and {300-600} for display. Avoid Light/Thin below 17 px.
  **Why** Apple: "avoid Ultralight, Thin, and Light font weights" at small sizes; "minimize the number of typefaces". Polaris uses variable weights 450/550/650/700; Linear 510 (variable). **Applies to** all. **Check** distinct `font-family` first-family count <= 3; weights in use <= 4. **Source** HIG typography (T); Polaris (T); (M).

### 2.3 Sizing and hit targets

- **RULE** Control heights come from one ladder: 24, 28, 32, 36, 40, 44-48. Default control in app UI is 32 px desktop / 36 px touch; marketing CTA is 44-48 px; nav-bar buttons 32-36 px.
  **Why** coss default 32 (36 mobile); shadcn 36; Radix 32; Primer 32; Carbon 40 default / 32 small / 48 large; measured hero CTAs: Stripe 48, Atlassian 48, Resend 48, Figma 46, Linear 44, GitHub 40-48, Shopify 56/44, Vercel 40. (T) (M)
  **Applies to** all. **Check** `getBoundingClientRect().height` of `button, a.btn, input, select` falls on {24,28,32,36,40,44,48,56} (+-0.5). **Source** see 3.4.
- **RULE** Every interactive target has a >= 44x44 CSS px hit region on coarse pointers, and >= 24x24 on fine pointers, regardless of its visible size. Implement with an `::after` hit-area expander, not by inflating the visible control.
  **Why** Apple 44x44 pt default / 28 pt iOS minimum; Material 48 dp with >= 8 dp between targets; WCAG 2.2 AA 2.5.8 = 24x24 CSS px (or a 24 px circle not touching other targets), AAA 2.5.5 = 44x44; Primer `--control-minTarget-coarse: 2.75rem (44 px)`, `fine: 1rem`. **Applies to** all, mobile especially. **Check** axe `target-size` rule + measure `pointer: coarse` emulation; no two targets closer than 8 px. **Source** HIG accessibility (T); Primer size-coarse.css (T); WCAG 2.2 (D); coss button source (T).
- **RULE** Spacing between adjacent controls: 8 px minimum (12 px on touch); Apple: about 12 pt around bezeled elements, about 24 pt around bezel-less elements.
  **Why** Mis-tap prevention; Primer `controlStack-*-gap-auto` = 8 px (fine) / 12 px (coarse) / 16 px for small controls on touch. **Applies to** forms, mobile. **Check** gap between sibling interactive rects >= 8 px (12 px at coarse). **Source** HIG accessibility (T); Primer (T).
- **RULE** Icon size steps with the text it sits beside: 12 px icon beside 11-12 px text, 14-16 px beside 13-14 px, 18 px beside 16 px, 20 px beside 18-20 px, 24 px for standalone (nav, feature) icons. coss encodes this as `size-4.5` (18 px) below `sm` and `size-4` (16 px) from `sm`, matching its 16 px -> 14 px text switch; badges use 14 -> 12 px.
  **Why** Icon optical weight should match the text's x-height/cap height; a 16 px icon next to 14 px text is the standard ratio (~1.14). Apple SF Symbols match text weight automatically. **Applies to** all. **Check** `svg` width within [1.0, 1.35] x the adjacent text `font-size`. **Source** coss button/badge/select source (T); HIG typography (T).

### 2.4 Radius

- **RULE** One radius family per product. Pick a base (4, 6, 8, 10, 12, 16, or pill) and derive control = base, card = base + 4 to 6, modal/sheet = base + 8, chip/badge = base - 4 (min 2). Never mix a pill CTA with square-ish inputs unless the pill is a deliberate brand signature (Linear, Shopify, Apple, Atlassian do).
  **Why** Measured control radii: 4 (Stripe), 6 (Vercel, GitHub), 8 (Notion, Figma, Framer, Supabase, Raycast), 10 (coss), pill (Linear, Shopify, Atlassian, Apple CTA); cards 12-24. Mixed radii read as unconsidered. (M)
  **Applies to** all. **Check** histogram of `border-radius` on elements > 40x24 px: <= 4 distinct values besides 0 and 9999 px. **Source** (M).
- **RULE** Nested radius: inner = max(0, outer - padding - border). Optical exception: if padding >= outer radius, inner radius is 0 (or clip the child).
  **Why** Concentric arcs share a centre so the gap stays constant round the corner. Apple: toolbar controls use radii "concentric with bar corners". **Applies to** cards containing images/inputs/buttons, popovers, tabs. **Check** for each rounded child fully inside a rounded parent: |parentRadius - parentPad - childRadius| <= 1 px. **Source** HIG toolbars (T); coss `calc(var(--radius-lg)-1px)` (T); dev.to concentric-radius write-up (D).

### 2.5 Layers, motion, depth

- **RULE** Keep a named z-index scale and use `isolation: isolate` on the app root so portaled popups (Dialog, Menu, Popover, Select, Tooltip) are always above content. Suggested: base 0, raised 10, sticky 100, dropdown 200, overlay 300, modal 400, popover/tooltip 500, toast 600, skip-link 700. When using coss ui unchanged: popups `z-50`, toasts `z-60`; keep sticky headers at `z-40`.
  **Why** Prevents z-index wars; Base UI quick-start requires the isolation root. **Applies to** SaaS app UI. **Check** grep for z-index values not in the scale; none > 700 except skip links. **Source** Base UI quick start (D); Primer z-index.css (T); coss source (T).
- **RULE** Durations: 100 ms (hover, focus, color), 150-200 ms (toggle, expand, tooltip, popup exit), 250-300 ms (popup/dialog enter, drawer), 400-500 ms (large layout shifts, page-level). Enter uses decelerating ease-out, exit uses accelerating ease-in and is shorter (~0.66x). Respect `prefers-reduced-motion`.
  **Why** Primer micro 100 / short 200 / medium 300 / long 500; M3 short1-4 = 50/100/150/200, medium1-4 = 250/300/350/400, long1-4 = 450/500/550/600; coss dialog 200 ms, toast 250 ms. **Applies to** all. **Check** `transition-duration` values in {0, 100, 150, 200, 250, 300, 400, 500} ms. **Source** Primer motion.css (T); material-web `_md-sys-motion.scss` (T); coss (T).
- **RULE** Interaction states as alpha overlays: hover 8 %, focus 12 %, pressed 12 %, dragged 16 % (M3). coss/shadcn use `accent` = black/white at 4 % and `/50`, `/90` opacity steps on solid fills.
  **Why** Overlays work on any base color so themes do not need per-state colors. **Applies to** all. **Check** hover state changes background by an overlay of 4-10 %; focus ring 2 px, offset 1-2 px, visible (>= 3:1). **Source** material-web `_md-sys-state.scss` (T); Primer `focus-outline-width: 2px` (T).

## 3. Numbers & scales (comparison tables)

### 3.1 Spacing ramps (px)

| Step | Tailwind v4 (`--spacing` x n) | Radix Themes | Carbon | Primer base-size | Atlassian `space.*` | Polaris `space-*` | Open Props `size-px` |
|---|---|---|---|---|---|---|---|
| unit | 4 | 4 (x scaling) | 8 mini-unit (2x grid) | 4 | 8 (`100`) | 4 (`100`) | n/a |
| 1 | 4 | 4 | 2 | 2 | 2 (025) | 1 (025) | 4 |
| 2 | 8 | 8 | 4 | 4 | 4 (050) | 2 (050) | 8 |
| 3 | 12 | 12 | 8 | 6 | 6 (075) | 4 (100) | 16 |
| 4 | 16 | 16 | 12 | 8 | 8 (100) | 6 (150) | 20 |
| 5 | 20 | 24 | 16 | 12 | 12 (150) | 8 (200) | 24 |
| 6 | 24 | 32 | 24 | 16 | 16 (200) | 12 (300) | 28 |
| 7 | 28 | 40 | 32 | 20 | 20 (250) | 16 (400) | 32 |
| 8 | 32 | 48 | 40 | 24 | 24 (300) | 20 (500) | 48 |
| 9 | 36 | 64 | 48 | 28 | 32 (400) | 24 (600) | 64 |
| 10 | 40 | - | 64 | 32 | 40 (500) | 32 (800) | 80 |
| 11 | 44 | - | 80 | 36 | 48 (600) | 40 (1000) | 120 |
| 12 | 48 | - | 96 | 40 | 64 (800) | 48 (1200) | 160 |
| 13+ | 56, 64, 72, 80, 96... | - | 160 | 44,48,64,80,96,112,128 | 80 (1000) | 64, 80, 96, 112, 128 | 240-480 |

Sources: Tailwind theme docs (D); Radix `space.css` (T); Carbon spacing page (D); Primer `base/size/size.css` (T); Atlassian `atlassian-spacing` (T); Polaris `styles.css` v9.4.2 (T); Open Props `sizes` (T). Primer semantic spacing: `space-xxs 2 / xs 4 / sm 8 / md 12 / lg 16 / xl 24` (T). Polaris component spacing: `space-card-padding 16`, `space-card-gap 16`, `space-button-group-gap 8`, `space-table-cell-padding 6` (T). Primer `stack-gap` 8/16/24 and `stack-padding` 8/16/24 for condensed/normal/spacious (T).

### 3.2 Type scales

**Apple HIG (pt; 1 pt = 1 CSS px for planning)** (T)

| Style | iOS "Large" default: size / leading / weight | macOS: size / leading / weight |
|---|---|---|
| Large Title | 34 / 41 / Regular | 26 / 32 / Regular |
| Title 1 | 28 / 34 / Regular | 22 / 26 / Regular |
| Title 2 | 22 / 28 / Regular | 17 / 22 / Regular |
| Title 3 | 20 / 25 / Regular | 15 / 20 / Regular |
| Headline | 17 / 22 / Semibold | 13 / 16 / Bold |
| Body | 17 / 22 / Regular | 13 / 16 / Regular |
| Callout | 16 / 21 / Regular | 12 / 15 / Regular |
| Subhead(line) | 15 / 20 / Regular | 11 / 14 / Regular |
| Footnote | 13 / 18 / Regular | 10 / 13 / Regular |
| Caption 1 | 12 / 16 / Regular | 10 / 13 / Regular |
| Caption 2 | 11 / 13 / Regular | 10 / 13 / Medium |

Platform default / minimum text size: iOS+iPadOS 17 / 11 pt, macOS 13 / 10, tvOS 29 / 23, visionOS 17 / 12, watchOS 16 / 12. iOS leading is ~1.2-1.3x (Body 17/22 = 1.29). SF tracking (pt): 11 -> +0.06, 12 -> 0, 13 -> -0.08, 15 -> -0.23, 17 -> -0.43, 20 -> -0.45, 22 -> -0.26, 24 -> +0.07, 28 -> +0.38 (i.e. 17 pt = -26/1000 em).

**Material 3 type scale (px/rem; line-height; weight; tracking px)** (T `material-web` v0_192)

| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| Display L / M / S | 57/64, 45/52, 36/44 | 400 | -0.25, 0, 0 |
| Headline L / M / S | 32/40, 28/36, 24/32 | 400 | 0 |
| Title L | 22/28 | 400 | 0 |
| Title M / S | 16/24, 14/20 | 500 | +0.15, +0.1 |
| Label L / M / S | 14/20, 12/16, 11/16 | 500 (prominent 700) | +0.1, +0.5, +0.5 |
| Body L / M / S | 16/24, 14/20, 12/16 | 400 | +0.5, +0.25, +0.4 |

**Radix Themes `font-size-1..9` (x scaling)** (T): 12 / 14 / 16 / 18 / 20 / 24 / 28 / 35 / 60 px; `line-height-1..9`: 16 / 20 / 24 / 26 / 28 / 30 / 36 / 40 / 60; heading line-heights 16 / 18 / 22 / 24 / 26 / 30 / 36 / 40 / 60; `letter-spacing-1..9`: +0.0025em, 0, 0, -0.0025, -0.005, -0.00625, -0.0075, -0.01, -0.025em; weights 300/400/500/700; default size = step 3 (16 px).

**Tailwind v4 `--text-*`** (D): xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36, 4xl 36/40, 5xl 48/1, 6xl 60/1, 7xl 72/1, 8xl 96/1, 9xl 128/1.

**Carbon productive** (D; base 14): body-compact-01 14/18 +0.16px; body-01 14/20 +0.16px; heading-compact-01 14/18 600; heading-03 20/28; heading-04 28/36; heading-05 32/40; heading-06 42/50 weight 300; heading-07 54/64 weight 300; label-01 12/16 +0.32px. Expressive (base 16): body-02 16/24; heading-02 16/24 600; fluid-display-01 54/64 w300; display-03 60/70 -0.64px; display-04 92/102 -0.64px. Font is IBM Plex Sans. (The fetched summary listed productive heading-02 as missing; productive heading-02 is 16/22 600 per my memory (E).)

**Primer** (T): sizes xs 12, sm 14, md 16, lg 20, xl 32, 2xl 40; line-height ratios tight 1.25, snug 1.375, normal 1.5, relaxed 1.625, loose 1.75; weights 300/400/500/600; roles: body-small 12/relaxed(1.625), body-medium 14/1.5 (20 px), body-large 16/1.5, title-small 16 w600, title-medium 20 w600 (32 px line), title-large 32 w600, display 40 w500 snug (1.375), caption 12/1.25.

**Polaris** (T): font-size steps 275..1000 = 11, 12, 13, 14, 16, 18, 20, 22, 24, 30, 32, 36, 40 px; line-heights 12, 16, 20, 24, 28, 32, 40, 48; weights 450 / 550 / 650 / 700; heading-3xl 36/48 w700 letter-spacing densest, 2xl 30/40, xl 24/32, lg 20/24 w650, md 14/20 w650, sm 13/20, xs 12/16; body-lg 14/20, md 13/20, sm 12/16, xs 11/12.

**Atlassian** (T): heading xxlarge 32/36, xlarge 28/32, large 24/28, medium 20/24, small 16/20, xsmall 14/20, xxsmall 12/16, all weight 653; body-large 16/24, body 14/20, body-small 12/16 at 400; weights 400/500/600/653.

**Geist** (D; sizes encoded in class names, values not published): heading 72/64/56/48/40/32/24/20/16/14, label 20/18/16/14/13/12 (+mono), copy 24/20/18/16/14/13, button 16/14/12. (M) Vercel hero 64/64 -0.06em w400, h2 56 w450 -0.06em; body copy 24/32 w450, UI 14/20.

**Open Props** (T): font-size 0..8 = 12, 16, 17.6, 20, 24, 32, 40, 48, 56 px (`size-00` 8 px); line-height 0.95, 1.1, 1.25, 1.375, 1.5, 1.75, 2; letter-spacing -0.05em, 0.025, 0.05, 0.075, 0.15, 0.5em...; fluid sizes `max(.75rem, min(2vw, 1rem))`.

**Fluid (Utopia)** (D): choose min viewport (e.g. 360) and max viewport (e.g. 1240), a base size and ratio at each (e.g. 18 px / 1.2 at 360; 20 px / 1.25 at 1240), and every step gets `clamp(minRem, interceptRem + slopeVw, maxRem)` where slope = (max - min)/(vmax - vmin) and intercept = min - slope x vmin. Space scale multipliers: 3xs 0.25, 2xs 0.5, xs 0.75, s 1, m 1.5, l 2, xl 3, 2xl 4, 3xl 6 of base "s". Every Layout: modular ratio 1.5 as example (golden 1.618 also common), "the specific ratio matters less than consistency", base spacing = body line-height (1.5 rem).

### 3.3 Shape: radius ramps (px)

| System | Ramp | Default for controls / cards |
|---|---|---|
| Tailwind v4 (T) | xs 2, sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24, 4xl 32 | - |
| shadcn (D) | `--radius` 10 px base; sm = 0.6x (6), md = 0.8x (8), lg = 1x (10), xl = 1.4x (14), 2xl = 1.8x (18), 3xl = 2.2x (22), 4xl = 2.6x (26). Older shadcn: lg = radius, md = radius - 2, sm = radius - 4. | controls: md-lg (8-10), card xl (14), `rounded-xl` in New York v4 card source |
| coss (T) | `--radius: 0.625rem` (10 px) defined, but components use Tailwind's `rounded-lg` (8 px), `rounded-2xl` (16 px) for Card/Dialog, `rounded-md` (6) for xs buttons/tooltips, `rounded-sm` (4) badges/menu items, `rounded-xl` (12) alerts. Measured on coss.com: buttons 10 px, cards 14-16 | button 8 (docs site 10), card 16, dialog 16 |
| Radix Themes (T) | radius-1..6 = 3, 4, 6, 8, 12, 16 x `radius-factor` (none 0, small 0.75, medium 1, large 1.5, full 1.5 + pill) | control size 2 = radius-2 (4)... scales with factor |
| Material 3 (T) | none 0, extra-small 4, small 8, medium 12, large 16, extra-large 28, full 9999 | buttons full, cards medium (12), dialogs extra-large (28) |
| Primer (T) | small 3, medium 6 (default), large 12, full | 6 |
| Atlassian (T) | xsmall 2, small 4, medium 6, large 8, xlarge 12, xxlarge 16, full, tile 25 % | - |
| Polaris (T) | 0, 050 = 2, 100 = 4, 150 = 6, 200 = 8, 300 = 12, 400 = 16, 500 = 20, 750 = 30, full | 8 (card), 4-6 (button) |
| Geist (D) | material-base/small/tooltip 6; medium/large/menu/modal 12; fullscreen 16 | 6 |
| Open Props (T) | 2, 5, 16, 32, 64, 128 + round | - |
| Apple (E/D) | concentric, device- and bar-relative; capsule preferred for lone buttons in Liquid Glass | capsule |

### 3.4 Control height ladders (px, desktop unless stated)

| System | xs | sm | default | lg | xl | Notes |
|---|---|---|---|---|---|---|
| coss ui (T) button | 24 (mobile 28) | 28 (32) | **32 (36)** | 36 (40) | 40 (44) | icon sizes identical (`size-8 sm:size-7` etc.) |
| coss ui input / select (T) | - | 28 (32) | **32 (36)** | 36 (40) | - | input: inner h-7.5 + 1 px borders x 2 = 32; select `min-h-9 sm:min-h-8` |
| shadcn New York v4 (T) | 24 | 32 | **36** | 40 | - | input 36; `icon` 36 |
| Radix Themes (T) text-field | 24 (size 1) | 32 (2) | 40 (3) | 48? (E) | - | `--text-field-height: space-5/6/7` = 24/32/40; button likewise (E) |
| Primer (T) `--control-*-size` | 24 | 28 | **32 (medium)** | 40 | 48 | min target 16 px fine, 44 px coarse |
| Carbon (D) button | - | 32 | **40 (md)** | 48 | 64 / 80 (2XL) | padding 16 left; 64 right if no icon |
| Atlassian (E) | - | 24 compact | 32 | 40 | - | spacious/default 32-40 |
| Polaris (E) | slim 28 | - | 36 | 44 | - | |
| Material 3 (E) | - | 32 (dense) | 40 | 56 FAB | - | 48 dp touch target |
| Apple visionOS (T) | 28 mini | 32 small | 44 regular | 52 large | 64 XL | iOS min hit 44x44 (28 min), macOS 28 (20 min) |
| Geist (D) | tiny | small | medium | large | - | pixel values not published |

### 3.5 Breakpoints and containers

| System | Breakpoints (px) | Container / max width |
|---|---|---|
| Tailwind v4 (T/D) | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 (40/48/64/80/96 rem) | `--container-*`: 3xs 256 ... md 448, lg 512, xl 576, 2xl 672, 3xl 768, 4xl 896, 5xl 1024, 6xl 1152, 7xl 1280 |
| Primer (T) | xsmall 320, small 544, medium 768, large 1012, xlarge 1280, xxlarge 1400 | overlay widths xs 192, s 320, m 480, l 640, xl 960 |
| Carbon (D) | small 320 (4 col), medium 672 (8), large 1056 (16), x-large 1312 (16), max 1584 (16) | gutter 32 px (16 + 16), margin 0 / 16 / 24 |
| Polaris (T) | xs 0, sm 490, md 768, lg 1040, xl 1440 | - |
| Radix Themes | breakpoints 520, 768, 1024, 1280, 1640 (E); containers (T) | `container-1..4` = 448, 688, 880, 1136 |
| Open Props (T) | size-xs 360, sm 480, md 768, lg 1024, xl 1440, xxl 1920; content 20ch / 45ch / 60ch; header 20ch / 25ch / 35ch | - |
| Bootstrap (E) | 576, 768, 992, 1200, 1400 | 540, 720, 960, 1140, 1320 |

**Measured marketing sites at 1440 px (M)**

| Site | Content width (centered) | H1 size / weight / lh / tracking | Section pad-y | Nav h | Hero CTA h / radius | Card radius |
|---|---|---|---|---|---|---|
| Linear | 1344 (max 1436) | 64 / 510 / 1.0 / -0.022em | 128 | 73 | 44 / pill | 12 |
| Vercel | 1392 (inner 1080) | 64 / 400 / 1.0 / -0.06em | n/a | 64 | 40 / 6 | 6-12 |
| Stripe | 1232-1264 | 48 / 300 / 1.15 / -0.02em | n/a | 76 | 48 / 4 | 6 |
| Notion | 1229-1252 (960 inner) | 96 / 600 / 1.04 / -0.048em | n/a | 64 | 38 / 8 | 12 |
| GitHub | 1280 | 64 / 425 / 1.08 / -0.035em | 72 | 72 | 40-48 / 6 + pill 60 | 16-24 |
| Figma | 1360 | 56 / 400 / 1.0 / -0.022em | 80 | 78 | 46 / 8 | 24 |
| Framer | 1200 | 54 / 500 / 1.0 / -0.04em | 120 | 64 | 34-50 / 8 | 18-20 |
| Supabase | 1280 (1088 inner) | 46 / 500 / 1.0 / normal | n/a | 65 | 38 / 8 | 10-21 |
| Resend | 1280 (1232) | 96 / 400 / 1.0 / -0.01em | 96 | 58 | 48 / 16 | 16 |
| Cal.com | 1200 (1048) | 64 / 600 / 1.1 / normal | n/a | n/a | 35 / 7 + pill | 12-16 |
| Clerk | 1264 (1200) | 56 / 700 / 1.14 / -0.035em | 164 (hero) | 42 | 40 / 6-8 | 8-12 |
| Raycast | 1204 | 64 / 600 / 1.1 / normal | n/a | n/a | 36 / 8 | 11-16 |
| Shopify | 1260 | 96 / 300 / 1.08 / -0.02em | 64-128 | 72 | 56 / pill | 12 |
| Atlassian | 1168 (768 prose) | 64 / 500 / 1.04 / -0.02em | 48 | 68 | 48 / pill | 20 |
| Apple (MacBook Air) | 980 (817 narrow) | 28 / 600 (page h1) + 56 / 600 (h2) | 110-160 | 44 | 36-54 / pill 980 | 28 |
| Tailwind | 1360 | 96 / 400 / 1.0 / -0.05em | n/a | n/a | 40 / 4-32 | 8-16 |
| shadcn/ui | 1392 (max 1400 / 1600) | 48 / 600 / 1.1 / -0.05em | n/a | 64 | 32 / 18 | 18-24 |
| coss.com | 1416 (max 1416) | 48 / 700 / 1.0 / normal | n/a | 64 | 32-40 / 10 | 14-16 |

Takeaway: **page max width clusters at 1200-1280 px** (median ~1264), with 1344-1416 on "app-like" product sites; text/hero inner column 680-1080 px. At 390 px the H1 is 34-48 px (mode 36), gutters 16-24 px, hero CTAs 44 px (Linear, Stripe) or 38-40 px, nav 64-66 px (Figma 72). Mobile H1 samples: Linear 38, Vercel 48, Stripe 34, Notion 42, GitHub 40, Figma 36, Framer 36, Supabase 34, Raycast 36, Shopify 56, Tailwind 36, coss 36. (M)

### 3.6 Z-index

| System | Scale |
|---|---|
| Primer (T) | behind -1, default 0, sticky 100, dropdown 200, overlay 300, modal 400, popover 500, skipLink 600 |
| Polaris (T) | 1 = 100, 2 = 400, 3 = 510, 4 = 512 ... 12 = 520 |
| Open Props (T) | layer-1..5 = 1..5, layer-important = 2147483647 |
| coss ui (T) | popups (Dialog/Sheet/Menu/Popover/Select/Tooltip) z-50; toast z-60; tabs indicator z-10; Select scroll arrows z-50 |
| Tailwind (D) | z-0/10/20/30/40/50 |
| Base UI (D) | `isolation: isolate` on app root; on iOS 26+ Safari add `position: relative` to `body` |

### 3.7 Motion

| Token | Primer (T) | M3 (T) | Polaris (T) | coss (T) |
|---|---|---|---|---|
| micro | 100 ms ease `(.25,.1,.25,1)` | short2 100 | 100 | hover `transition-shadow` default 150 |
| short | 200 ms easeInOut `(.6,0,.2,1)` | short4 200 | 200 | dialog 200 ease-in-out; sheet 200 |
| medium | 300 ms, enter easeOut `(.3,.8,.6,1)` | medium2 300 | 300 | toast 250 |
| long | 500 ms | long2 500 | 500 | - |
| easing set | enter `(.3,.8,.6,1)`, exit `(.7,.1,.75,.9)`, move `(.6,0,.2,1)` | standard `(.2,0,0,1)`, standard-decel `(0,0,0,1)`, standard-accel `(.3,0,1,1)`, emphasized-decel `(.05,.7,.1,1)`, emphasized-accel `(.3,0,.8,.15)` | ease-out `(.19,.91,.38,1)`, ease-in `(.42,0,1,1)` | popup scale .98 -> 1 + opacity; mobile sheet `translate-y-4` |

Tailwind v4 eases (D): in `(.4,0,1,1)`, out `(0,0,.2,1)`, in-out `(.4,0,.2,1)`. Atlassian entrance patterns: slide 8 px, scale 95 -> 100 %, fade 0 -> 100 (T).

### 3.8 Elevation / depth

- M3 elevation levels in dp: 0, 1, 3, 6, 8, 12. State layers: hover 0.08, focus 0.12, pressed 0.12, dragged 0.16. (T)
- Tailwind shadows (D): 2xs `0 1px rgb(0 0 0/.05)`; xs `0 1px 2px`; sm `0 1px 3px, 0 1px 2px -1px` (.1); md `0 4px 6px -1px, 0 2px 4px -2px`; lg `0 10px 15px -3px, 0 4px 6px -4px`; xl `0 20px 25px -5px, 0 8px 10px -6px`; 2xl `0 25px 50px -12px /.25`.
- Radix Themes `shadow-1..6` (T) always start with a 1 px ring `0 0 0 1px var(--gray-a3)` plus soft layers; shadow-1 is an inset field shadow (inputs). Shadows are alpha-based, so they work on any surface.
- coss depth recipe (T): `border` + `shadow-xs/5` (5 % opacity!) + an inner 1 px top highlight made with a `before:` pseudo-element at `calc(var(--radius) - 1px)`: light `0 1px black/4 %`, dark `0 -1px white/6 %`; popups `shadow-lg/5`; backdrops `bg-black/32 backdrop-blur-sm`.
- Apple materials (T): iOS standard materials ultra-thin / thin / regular / thick; Liquid Glass regular vs clear; dim clear glass with 35 % dark layer over bright content; "use Liquid Glass sparingly".
- Geist materials (D): base/small = surface radius 6; medium/large radius 12; floating tooltip 6, menu 12, modal 12, fullscreen 16. Tooltips are the only element with a stem.

### 3.9 Color-system structure (number of steps and roles)

| System | Structure |
|---|---|
| Radix Colors (D) | 12 steps: 1 app bg, 2 subtle bg, 3 UI element bg, 4 hover bg, 5 active/selected bg, 6 subtle border/separator, 7 interactive border/focus ring, 8 stronger border/focus ring, 9 solid bg (purest), 10 hover solid, 11 low-contrast text (Lc 60 on step 2), 12 high-contrast text (Lc 90 on step 2). Sky, Mint, Lime, Yellow, Amber use dark text on step 9. |
| Geist (D) | 10 steps: 100 resting bg, 200 hover bg, 300 active bg, 400 resting border, 500 hover border, 600 active border, 700 high-contrast bg, 800 its hover, 900 secondary text/icons, 1000 primary text/icons. |
| shadcn / coss (D/T) | ~19 semantic pairs (background/foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1..5, sidebar-*). coss adds `info`, `success`, `warning`, `destructive-foreground`, each with `-foreground`. Neutral light: foreground neutral-800, muted-foreground neutral-500 mixed 10 % black, border black/8 %, input black/10 %, ring neutral-400; dark: foreground neutral-100, border white/6 %, input white/8 %. |
| Stripe (D) | Level number = contrast position: any two colors >= 5 levels apart give >= 4.5:1 (small text), >= 4 apart give 3:1 (icons/large text), identical across hues (CIELAB). |
| Linear (D) | LCH; theme = base color + accent color + contrast number (replaced 98 variables). |
| Primer (T) | `fgColor/bgColor/borderColor` x `default | muted | emphasis | accent | success | danger ...`, 13 theme files incl. high-contrast, dimmed, colorblind, tritanopia. |

### 3.10 Density modes

| System | Mechanism |
|---|---|
| Primer (T) | `condensed / normal / spacious`: control inline padding 8 / 12 / 16 px (medium); stack gap 8 / 16 / 24; overlay padding 8 / 16; control heights fixed, so density changes padding not height. |
| coss ui (T) | breakpoint density: below 640 px controls +4 px height, text 16 px, icons 18 px; from 640 px compact. Pointer-coarse hit-area expander to 44 px. |
| Radix Themes (T) | `scaling` 90-110 % multiplies space, type, radius, control size. |
| Material (E) | density scale 0 / -1 / -2 / -3, each step -4 dp component height, touch target stays 48 dp. |
| Apple (T) | Dynamic Type 7 sizes + 5 accessibility sizes; layouts reflow (stack vertically), do not shrink icons. |
| Carbon (D) | size tokens sm 32 / md 40 / lg 48 are the density control. |

### 3.11 Recommended defaults for a SaaS marketing site + app UI (summary; full token set in `tokens-spacing-radius-sizing.md`)

| Property | Marketing site | App UI | Basis |
|---|---|---|---|
| Space unit / steps | 4 px; 4 8 12 16 24 32 48 64 80 96 128 | 4 px; 4 8 12 16 20 24 32 40 48 | all ramps (3.1) |
| Gutter | 16 / 24 / 32 px (<640 / 640+ / 1024+) | 16 / 24 | (M) |
| Page width | 1280 px (80rem), prose 65ch | fluid, content <= 1440 | (M) median 1264 |
| Section padding-y | 64 -> 128 px fluid | 24-32 px between panels | (M) |
| Breakpoints | 640 / 768 / 1024 / 1280 / 1536 | same (do not alter `sm`: coss keys on it) | Tailwind, coss |
| Body | 16 / 1.6 | 14 / 1.43; 16 px on inputs < 640 | Primer, coss, HIG |
| Display/H1 | 40-72 / 34-56 px, weight 500, lh 1.04-1.12, tracking -0.03 to -0.035em | 20-24 px, 600, lh 1.3 | (M) |
| Control height | CTA 44-48, nav 36 | 32 (36 touch) | coss, Primer, HIG |
| Hit region | >= 44 coarse / >= 24 fine | same | HIG, WCAG 2.2 |
| Radius (base 8) | control 8, chip 4, card 12, overlay 16, nested = outer - pad - bw | same | shadcn/Radix/coss |
| Borders | 1 px @ 8-10 % alpha; focus 2 px ring offset 1-2 | same | coss, Primer |
| Shadows | <= 10 % alpha; card `shadow-xs/5` + inner 1 px highlight | same | coss |
| Motion | 100 hover / 200 popup / 300 sheet / <= 700 reveal | 100-200 | M3, Primer, coss |
| z-index | page 0/10/40, popup 50, toast 60, skip 70, `isolation: isolate` root | same | coss, Base UI |

## 4. Dos and Don'ts

- **Do** `h-9 sm:h-8` style responsive density (36 -> 32) with `pointer-coarse:after:min-h-11 min-w-11` hit-area expander. **Don't** set a constant `h-8` button and call it mobile-ready: 32 px is below Apple's 44 pt default and Material's 48 dp.
- **Do** inner radius `calc(var(--radius-lg) - 1px)` on a 1 px-bordered card's inner highlight. **Don't** give a 16 px padded child the same 16 px radius as its 16 px parent; the gap pinches at the corner.
- **Do** `gap-*` on the parent for sibling spacing. **Don't** `mb-4` on every child (orphan space at the end of the container, wrong when reordered).
- **Do** neutral borders at 6-10 % alpha of foreground (coss: black 8 %, white 6 %), so they work on any surface. **Don't** `border-gray-200` hex on a tinted surface.
- **Do** display type at weight 400-510 with -0.02 to -0.04em tracking and 1.0-1.1 line-height. **Don't** 700 weight, 1.2+ line-height, normal tracking at 64 px (reads as a default template).
- **Do** `isolation: isolate` on the app root and a named z-scale. **Don't** `z-[9999]`.
- **Do** a button pair of equal size with style (not size) as emphasis (Apple: "Use style, not size, to visually distinguish the preferred choice"). **Don't** a small secondary next to a large primary in the same row.
- **Do** token-only color in feature code (`bg-card text-card-foreground`). **Don't** `bg-white text-neutral-800` in components: breaks dark mode and theming.

## 5. Exceptions & judgement calls

- **Marketing vs app density.** Marketing CTAs are 44-56 px and type is 16-18 px body; app UI is 32 px controls and 14 px body. A SaaS product site uses both: one token set with two *contexts* (`context.marketing`, `context.app`) that remap the same semantic tokens, rather than two systems.
- **Pill vs rounded-rect CTAs.** Pills are a brand signature (Linear, Shopify, Apple, Atlassian, GitHub secondary 60 px). Apple's own guidance prefers capsule for lone buttons. Rounded rects 6-10 px are the developer-tool norm (Vercel 6, GitHub 6, Stripe 4, Notion/Figma/Framer 8). Choose once; don't mix on one page.
- **Strict modular ratio vs curated steps.** Every Layout wants one ratio; Tailwind, Carbon, Radix, Apple, M3 all use hand-tuned steps with ratios drifting 1.12-1.3. A curated table beats a pure ratio at small sizes (11-16 px) because of pixel snapping; use a ratio (1.2-1.25) only to generate display sizes.
- **Fluid vs stepped type.** Fluid clamp() (Utopia) is best for marketing heroes; apps should stay stepped since density predictability matters more than smoothness. Measured: no major site is fully fluid; most step at 1-2 breakpoints.
- **Line-height 1.0 for display.** Safe only for single/two-line headings without descenders colliding; use 1.05-1.1 when headings wrap to 3+ lines or contain mixed case with descenders (g, y, p).
- **Light weights (300).** Stripe/Shopify use 300 at 48-96 px with their own display fonts (Sohne, Shopify Sans); in Inter-class fonts 300 at < 32 px fails legibility. Apple says avoid Light at small sizes.
- **coss text switches (16 -> 14 px).** coss uses `text-base sm:text-sm` on everything; copy this for forms, but for dense app screens on tablet-sized touch devices (>= 640 px wide, coarse pointer) you may want 16 px: coss does not handle that case, only the 44 px hit region.
- **shadcn heights vs coss heights.** coss docs say "to match shadcn's original heights, use the next size up" (shadcn default 36 = coss `lg` on desktop). Never mix both in one app.
- **Radix Themes `scaling` vs Tailwind `--spacing`.** Equivalent knobs (`--scaling` multiplies every token; Tailwind v4's `--spacing` base makes every `p-4`, `h-8`, `size-9` scale at once). Changing `--spacing` also changes component heights in Tailwind-based libraries, including coss.

## 6. coss ui conventions (Augustas's mandated component library)

Source: `coss.com/ui/llms.txt`, component docs (`/ui/docs/components/<name>.md`), the shadcn registry JSON at `coss.com/ui/r/<name>.json` (read 2026-10-08), `radix-shadcn-migration`, `get-started`. (T)(D)

**What it is.** React components on **Base UI** (`@base-ui/react`) + **Tailwind v4**, copy-paste ownership via the shadcn CLI: `npx shadcn@latest init @coss/style` (new project: neutral color system, sidebar vars, base styles, Inter + Geist Mono), `add @coss/ui` (all primitives), `add @coss/style`, `add @coss/colors-neutral`, or per component `add @coss/<name>`. Three layers: **Primitives** (Base UI wrappers), **Particles** (assembled, e.g. auth form, table, date picker), **Atoms** (particles + services). "Opinionated for production: dense-UI defaults, extended variants." Not a re-implementation of shadcn. Written to be readable by AI.

**API conventions (hard rules):**

1. **`render`, never `asChild`.** `<DialogTrigger render={<Button />}>Open</DialogTrigger>`, `<Button render={<Link href="/login" />}>`. Custom components used in `render` must forward `ref` and spread all props. `render` also accepts `(props, state) => JSX`. Applies to Avatar, Badge, Button, Checkbox, Collapsible, Dialog, Menu, Popover, Preview Card, Progress, Radio Group, Scroll Area, Select, Sheet, Slider, Switch, Toggle, Tooltip, triggers and closes. Internals use `useRender` + `mergeProps` from Base UI.
2. **`onClick`, not `onSelect`** on `MenuItem` etc.
3. **Sizes via the `size` prop, never custom padding/height.** Button: `xs | sm | default | lg | xl` + `icon | icon-xs | icon-sm | icon-lg | icon-xl`. Input/Select/Textarea/ToggleGroup/Badge: `sm | default | lg` (Input also takes a number = native `size` attr). Heights desktop (<= 640 px +4): button xs 24 / sm 28 / default 32 / lg 36 / xl 40; input and select 28 / 32 / 36; badge sm 16 / default 18 / lg 22 px. Don't add `px-*`, `py-*`, `h-*` to these; the built-in padding is `calc(spacing(n) - 1px)` to account for the 1 px border.
4. **Variants.** Button: `default | destructive | destructive-outline | ghost | link | outline | secondary`. Badge/Alert add `info | success | warning | error` (needs `--info`, `--success`, `--warning` + `-foreground` tokens). **Cancel = `variant="ghost"`**, not outline.
5. **Naming:** `*Content` -> `*Popup` / `*Panel` (`DialogPopup`, `SheetPopup`, `PopoverPopup`, `TooltipPopup`, `SelectPopup`, `MenuPopup`, `PreviewCardPopup`, `AccordionPanel`, `CardPanel`, `CollapsiblePanel`, `TabsTab`/`TabsPanel`, `Radio`). Legacy names still exported. `dropdown-menu` -> `@/components/ui/menu`; `hover-card` -> `preview-card`.
6. **Dialog structure is strict:** `DialogPopup > DialogHeader + DialogPanel + DialogFooter`. `DialogPanel` is the scrollable middle (ScrollArea with scroll fade). **Forms inside dialogs:** keep `DialogHeader` outside, wrap `DialogPanel + DialogFooter` in `<Form className="contents">`. `AlertDialog` has no Panel; use `AlertDialogClose` with `render`. Dialog is bottom-sticky on mobile (`bottomStickOnMobile`, full-width, no side borders, rises 16 px), centered on >= 640 px, `max-w-lg` (512 px), `rounded-2xl`, backdrop `bg-black/32 backdrop-blur-sm`, 200 ms.
7. **Select is data-driven:** `<Select items={items}>`, `SelectItem value={itemObject}`; `{label, value}`; `value: null` for placeholder; `alignItemWithTrigger` lives on `SelectPopup`. Command also `items`-driven (no cmdk); `CommandCollection` for groups.
8. **Value props:** Accordion/ToggleGroup use boolean `multiple` + array `defaultValue`; Slider is an array in coss migration docs (`value={[50]}`); note the user-level skill says scalar, **conflict, verify in the installed `slider.tsx` before use** (the official migration page I fetched says arrays).
9. **Toasts:** `toastManager.add({ title, description, type, actionProps })` from `@/components/ui/toast`; wrap the app in `ToastProvider` (+ `AnchoredToastProvider`). Never render `<Toast>` directly. Position default bottom-right; z-60; 250 ms.
10. **`portalProps`** on every popup: `{ keepMounted, container }`. In monorepos import `useRender`, `mergeProps`, `CSPProvider`, `DirectionProvider` from `@coss/ui/base-ui/*`.
11. **Group** requires `GroupSeparator` between all controls. **InputGroup** has no `InputGroupButton`; put `Button` inside `InputGroupAddon`. **Tabs** `TabsList variant="default|underline"`. **OTPField** uses `length`, `onValueChange`, `size="lg"`. **Progress** with children needs `ProgressTrack` + `ProgressIndicator`. **Field** (`Field, FieldLabel, FieldDescription, FieldError`) wraps inputs for labels/validation.
12. **Tokens:** shadcn-compatible CSS variables plus `--destructive-foreground`, `--info`, `--success`, `--warning` (+ `-foreground`), `--code*`, `--sidebar*`, `--radius: 0.625rem`. Fonts: `--font-sans`, `--font-mono`, `--font-heading` (defaults to `var(--font-sans)`, used by Dialog/AlertDialog/Card titles); **do not** leave `--font-geist-sans` from the Next starter. `--alpha(var(--x) / 10%)` Tailwind v4 helper used for translucent tokens. Dark mode via `.dark` class tokens.
13. **Responsive/touch built in:** `text-base sm:text-sm`, `h-9 sm:h-8`, `size-4.5 sm:size-4` icons, `pointer-coarse:after:min-h-11 min-w-11` hit area; do not re-implement.
14. **Visual recipe:** border + `shadow-xs/5` + `before:` inner highlight (`calc(var(--radius-*) - 1px)`), `not-dark:bg-clip-padding`, `disabled:opacity-64`, `focus-visible:ring-[3px] ring-ring/24` (inputs) or `ring-2 ring-offset-1` (buttons), placeholder `text-muted-foreground/72`. Card `rounded-2xl`, header `p-6`, title `font-heading font-semibold text-lg leading-none`. Table head `h-10 px-2.5`. Menu item `min-h-8 px-2 py-1 rounded-sm`. Tooltip `text-xs rounded-md`. Alert `rounded-xl px-3.5 py-3`. Switch thumb `size-5` (20 px) track 38x22.
15. **Base UI platform rules to keep:** app root `isolation: isolate`; on iOS 26+ Safari `body { position: relative }`; style by `data-*` state attributes (`data-pressed`, `data-highlighted`, `data-starting-style`, `data-ending-style`, `data-disabled`) and CSS variables (`--anchor-width`, `--available-height`, `--transform-origin`); `className` may be a function of state.

**Why this matters for the engine.** coss gives sizes (heights, radii, paddings) as *already responsive and already touch-safe*; the engine's job is to pick `size`/`variant`, set tokens (radius, hue, fonts), and add layout, never to restyle component internals. Marketing-only layout code (hero, bento) may use plain Tailwind but must use the same tokens.

## 7. Figures worth keeping

- Apple HIG Typography: Dynamic Type size tables (xSmall -> xxxLarge + 5 accessibility sizes) and SF tracking table; worth screenshotting the "Specifications" section.
- Apple HIG Buttons: visionOS size table (mini 28 -> XL 64) and "hit region at least 44x44 pt".
- Radix Colors "Understanding the scale" 12-step diagram.
- Vercel Geist Materials page (surface vs floating, radii 6/12/16).
- Material 3 Shape page (corner scale diagram) and Motion page (duration/easing token chart): the pages are JS-rendered; token values here come from `material-web`.
- Carbon 2x Grid page (breakpoint column diagram).

## 8. Open questions

- **Apple HIG** margins/layout guide values (iOS standard 16 pt compact / 20 pt regular readable margins) and corner radius numbers are not in the HIG text; (E) only. Liquid Glass radius is dynamic.
- **Material 3** page text is JS-rendered and was not fetched; scale values come from the `material-web` token files (`v0_192`), whose tracking values are in rem (converted). Expressive shape additions (20, 32, 48...) are unverified. Density -4 dp/step and 48 dp targets: (E) from M2/M3 knowledge plus Google Android accessibility docs.
- **Radix Themes** button height not published; text-field heights (24/32/40) read from CSS, size-4 (48?) unverified.
- **Carbon** type page summary dropped productive heading-02 (16/22 w600 expected) and 'fluid' details; revisit `@carbon/type`.
- **Polaris** Shopify moved docs to `shopify.dev` (web-components era); token package read is `@shopify/polaris-tokens` 9.4.2 (React era). Button heights (28/36/44) are (E).
- **Geist** publishes no numeric type/spacing values; Vercel values here are measurements only.
- **coss Slider** value shape: official migration page says array; the global skill says scalar. Verify against installed source.
- **coss `--radius` (10 px) vs component classes** (`rounded-lg` = 8 px by Tailwind default): need to confirm in `@coss/style` whether `@theme inline` remaps `--radius-lg` to `var(--radius)`; the measured coss.com button radius is 10 px, which suggests yes.
- **Measurements** are one load per site at one time (A/B tests, cookie banners such as Figma's/Shopify's, and lazy sections can skew); treat as +-4 px. "Content width" is the most common centered container incl. padding.
- **Linear / Stripe / Geist talks:** only the redesign posts were readable (no pixel specs published). Linear: 3-variable LCH themes, Inter Display headings; Stripe: level-based contrast system.
