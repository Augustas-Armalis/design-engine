---
source: web:synthesis of design-systems.md (Tailwind v4, coss ui, Base UI, Radix Themes, shadcn, Primer, Polaris, Atlassian, Carbon, Material 3, Apple HIG, Open Props, Utopia, DTCG 2025.10) + Playwright measurements of 18 live marketing sites
chapter: Token architecture, schema and recommended base (spacing, radius, sizing, type, motion, layers, themeability)
pages: n/a (web; written 2026-10-08)
topic_tags: [tokens, dtcg, spacing, radius, sizing, hit-targets, density, z-index, breakpoints, containers, theming, tailwind-v4, coss-ui]
status: studied
---

# Tokens: spacing, radius, sizing (and the schema for `design-engine/system/`)

Evidence and per-system tables are in `design-systems.md` (same folder). This note turns them into (a) a recommended default for a SaaS marketing site + app UI, (b) a proposed JSON token schema, (c) rules with mechanical checks.

Provenance tags as in `design-systems.md`: (T) read from source/token files, (D) docs, (M) measured, (E) `[engine note]` own knowledge, unverified this session.

## 1. Core ideas

1. **Three tiers, one direction of dependency.** primitive (raw ramps, no meaning) -> semantic (role: `space.stack.md`, `radius.control`, `type.body`) -> component (per-component audit values, e.g. `button.height.md`). Feature code and the generator may only reference semantic tokens (Primer: "Never use raw values... Only use semantic tokens"). (T)
2. **Author compactly, emit strictly.** Author tokens in the DTCG shape (`$type`, `$value`, `$description`, `{alias.path}`) but with compact strings for dimensions (`"16px"`, `"200ms"`); a build step normalizes to the strict W3C 2025.10 form (`{ "value": 16, "unit": "px" }`) and to CSS custom properties. (D) DTCG 2025.10 is the first stable format (28 Oct 2025); media type `application/design-tokens+json`, extension `.tokens` / `.tokens.json`.
3. **Emit into Tailwind v4 namespaces so utilities and coss ui work unchanged.** `--spacing`, `--radius-*`, `--text-*`, `--breakpoint-*`, `--container-*`, `--ease-*`, `--shadow-*`, `--color-*`, `--font-*` inside `@theme`; shadcn/coss semantic colors (`--background`, `--primary`, ...) as plain `:root` / `.dark` variables bridged with `@theme inline`. (D)(T)
4. **Expressiveness = few knobs that derive many tokens.** Same architecture as Radix (`radius`, `scaling`, accent), shadcn (`--radius`), Linear (base + accent + contrast), Stripe (contrast levels). The engine varies ~10 knobs per brief; everything else is `calc()` from them. A site is "generic" when all knobs sit at the library defaults (see 2.8).
5. **Two contexts, one vocabulary.** `context.marketing` and `context.app` remap the same semantic names (body 16/1.6 vs 14/1.43, control 40-48 vs 32/36, section padding, container). Do not build two systems.
6. **Token names carry the unit logic.** Space keys are multipliers of the 4 px unit (`space.4` = 16 px, Tailwind-compatible: `p-4`); control sizes are named `xs..xl` and encode the pixel in the audit file; typography roles name the job, not the size.
7. **Responsive/touch behaviour is part of the token, not a media query in the component.** coss: `h-9 sm:h-8`; Primer: `--control-minTarget-auto` flips by `pointer: coarse`. The schema therefore stores `{fine, coarse}` or `{base, sm}` pairs for sizes.

## 2. Rules

Format per `SCHEMA.md`.

### 2.1 Architecture and naming

- **RULE** Only semantic tokens (or Tailwind utilities that resolve to them) appear in generated markup/CSS. Zero raw `#hex`, zero arbitrary `[13px]`, zero `style="padding: 14px"` outside a token-definition file.
  **Why** Raw values are where inconsistency enters; this is the single most enforced rule in Primer's agent guide.
  **Applies to** all. **Check** regex over generated CSS/HTML for `#[0-9a-f]{3,8}`, `\[\d+px\]`, inline `style=` px values; allowlist = token files. **Source** Primer DESIGN_TOKENS_GUIDE.md (T).
- **RULE** Name pattern: `category.role[.variant][.size]` in JSON; CSS var = dots to hyphens (`space.stack.md` -> `--space-stack-md`). Surface tokens come with `-foreground` partners; the word "background" is omitted (`--card`, `--card-foreground`).
  **Why** Predictable names make lint rules and agent prompts possible; the fg/bg pairing guarantees contrast. **Applies to** all. **Check** every `--color-*`/semantic surface has a `-foreground` twin; contrast(surface, foreground) >= 4.5. **Source** shadcn theming (D); coss `style` registry (T); Primer logic matrix (T).
- **RULE** Map to library namespaces: spacing base -> `--spacing`; radii -> `--radius-xs..4xl`; type -> `--text-*` (+ `--text-*--line-height`); breakpoints -> `--breakpoint-*`; containers -> `--container-*`; fonts -> `--font-sans|mono|heading` (never `--font-geist-sans`); easing -> `--ease-*`.
  **Why** coss/shadcn/Tailwind components read these names; mismatched names silently fall back to defaults (coss docs list the font-variable mismatch as the common pitfall). **Applies to** all. **Check** computed `getComputedStyle(root).getPropertyValue('--font-sans')` non-empty; `--font-heading` defined. **Source** coss get-started (D); Tailwind theme docs (D).

### 2.2 Spacing

- **RULE** Base unit 4 px (`--spacing: 0.25rem`). Allowed step set: 0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160 px (`space.0 .. space.40`). 2, 6, 10, 14 only inside controls <= 40 px and badges.
  **Why** Matches every surveyed ramp; ramp coarsens with size so optical steps stay ~25-50 %. **Applies to** all. **Check** >= 95 % of computed non-zero padding/margin/gap values in the allowed set (or multiples of 4). **Source** design-systems.md 3.1.
- **RULE** Semantic spacing tiers: `inset` (padding inside a container), `inline` (gap in a row), `stack` (gap in a column), `section` (page rhythm). Defaults: inset sm 12 / md 16 / lg 24 / xl 32; inline xs 4 / sm 8 / md 12 / lg 16; stack xs 4 / sm 8 / md 16 / lg 24 / xl 32 / 2xl 48; section sm 48 / md 80 / lg 128 (fluid).
  **Why** Primer `stack-gap` 8/16/24 and `stack-padding` 8/16/24, Polaris `space-card-padding` 16, coss Card `p-6` (24) / Dialog `p-6` / Alert `px-3.5 py-3` (14/12). **Applies to** all. **Check** card padding 16-24 (app) / 24-40 (marketing); intra-card gap <= inter-card gap / 2. **Source** Primer (T); coss (T).
- **RULE** Fluid values via `clamp(min, intercept + slope*vw, max)` with vmin = 360 px and vmax = 1280 px only for: display/h1/h2 type, section padding, page gutter. Everything else is stepped.
  **Why** Utopia method; fluid body type/controls change layout unpredictably and break pixel snapping. **Applies to** landing page. **Check** `clamp(` appears only in tokens flagged `fluid`. **Source** utopia.fyi (D).
- **RULE** Density knob = `--scale` (0.9 / 0.95 / 1 / 1.05 / 1.1) multiplying `--spacing`. Warn: in Tailwind-based libraries (including coss) it also scales every `h-*`/`size-*` including control heights, so keep the 44 px coarse hit-area expander in absolute `rem` (coss uses `min-h-11`, which is spacing-based: 11 x spacing).
  **Why** Radix `scaling` precedent; same mechanics. **Applies to** SaaS app UI. **Check** with scale != 1, `min-h-11` expander still >= 44 px or add `--hit-min: 44px`. **Source** Radix Themes spacing (D); Tailwind (D).

### 2.3 Radius

- **RULE** Radius is derived from one knob `radius.base` (default 8 px; presets sharp 0-2, tight 4, default 8, soft 12-16, pill 9999). Roles: `radius.control = base`, `radius.chip = max(2px, base/2)`, `radius.surface = min(base*1.5, 24px)`, `radius.overlay = min(base*2, 28px)`, `radius.full = 9999px`.
  **Why** shadcn derives sm/md/lg/xl/2xl/3xl/4xl from `--radius` by 0.6/0.8/1/1.4/1.8/2.2/2.6x; Radix multiplies a ramp by `radius-factor` (0, 0.75, 1, 1.5, 1.5+full). Observed role relationships: control 6-10, card 12-16, dialog 16 (coss), M3 dialog 28. **Applies to** all. **Check** control radius / card radius in [0.4, 0.8]; card < overlay. **Source** shadcn (D), Radix (T), coss (T), (M).
- **RULE** Nested radius: `radius.inner = max(0, radius.outer - padding - border-width)` (CSS: `max(0px, calc(var(--r-outer) - var(--pad) - 1px))`). If padding >= outer radius, inner = 0 and clip the child.
  **Why** concentric arcs; coss uses `calc(var(--radius-lg) - 1px)` for its inset highlight; Apple toolbars use radii concentric to the bar. **Applies to** card > image/input/button, popover > item, segmented tabs. **Check** for each rounded child fully inside a rounded parent: |parentR - gap - childR| <= 1 px. **Source** HIG toolbars (T); coss (T).
- **RULE** Pills (`9999px`) only when `radius.base` preset is `pill`/brand signature; then inputs are also pill or a clearly different surface (search), cards cap at 24 px.
  **Why** mixing pill CTAs with 4 px inputs reads as unplanned; measured pill-brands (Linear, Shopify, Atlassian, Apple) keep cards at 12-28 px. **Applies to** landing page. **Check** if any element has radius >= 999 px then >= 80 % of buttons do. **Source** (M).

### 2.4 Sizing and hit targets

- **RULE** Control height ladder (px) `xs 24 / sm 28 / md 32 / lg 36 / xl 40 / 2xl 44 / 3xl 48 / 4xl 56`; each also has a `coarse` value +4 (`24->28, 28->32, 32->36, 36->40, 40->44`), applied below `sm` (640 px) as in coss. Defaults: app control `md` (32 / 36 coarse); marketing hero CTA `3xl` (48) or `2xl` (44), nav-bar CTA `lg` (36); input height = button height in the same row.
  **Why** coss/Primer 24-48 ladders; Carbon 32/40/48; Apple 44. Measured hero CTAs 44-56. **Applies to** all. **Check** element heights in the ladder (+-0.5 px); input and button heights equal when inline. **Source** design-systems.md 3.4.
- **RULE** Minimum hit region: `--hit-min-fine: 24px` (WCAG 2.5.8 AA), `--hit-min-coarse: 44px` (Apple 44, Primer 2.75rem, WCAG 2.5.5 AAA; Material 48 dp). Implement with `@media (pointer: coarse)` + `::after { min-width: 44px; min-height: 44px; }` (coss pattern). Adjacent targets >= 8 px apart (12 px coarse).
  **Why** accessibility and mis-tap prevention; keeps visible controls compact. **Applies to** all. **Check** axe `target-size`; with `isMobile+hasTouch` emulation every `a,button,[role=button],input,select` hit rect >= 44x44. **Source** HIG accessibility (T); Primer (T); WCAG 2.2 (D); coss (T).
- **RULE** Icon sizes: 12 (badge/xs), 14, 16 (default beside 14 px text; coss desktop), 18 (beside 16 px text; coss mobile), 20, 24 (nav/feature), 32+ (illustrative). Stroke weight scales with size (1.5 px at 16-20, 1.25 at 24+ for 24 px grids). Icon-only buttons are square, same height as the control (`icon` = `size-8 sm:size-7` in coss).
  **Why** icon:text ratio ~1.14; coss derives `size-4.5 sm:size-4`. **Applies to** all. **Check** icon width in [1.0, 1.35] x adjacent `font-size`. **Source** coss (T).
- **RULE** Containers: page `80rem` (1280 px) border-box with fluid gutter 16 -> 32 px; narrow `48rem` (768); prose `65ch` (<= 42rem); wide bleed `90rem` (1440) for media only. App shell: sidebar 16 rem (256 px) expanded / 3 rem (48 px) icon-collapsed / 18 rem on mobile sheet (shadcn sidebar constants, E).
  **Why** measured marketing content widths: median ~1264 (1200-1280 for 10 of 18 sites), prose columns 680-1080. Tailwind `max-w-7xl` = 80 rem. **Applies to** landing page, app. **Check** widest centered container at 1440 viewport in [1180, 1300] px; prose paragraphs <= 80 characters wide. **Source** (M); Tailwind (D).
- **RULE** Breakpoints = Tailwind v4 defaults (640 / 768 / 1024 / 1280 / 1536). Do not redefine `--breakpoint-sm`.
  **Why** coss density, text-size and dialog-sheet switches are keyed to `sm` (640). Changing it silently changes control heights, font sizes and dialog layout. **Applies to** all with coss. **Check** `--breakpoint-sm` computed = 40rem. **Source** coss registry (T); Tailwind (D).

### 2.5 Type

- **RULE** Roles, not raw sizes. Marketing: `display` 40 -> 72, `h1` 34 -> 56, `h2` 28 -> 44, `h3` 22 -> 28, `h4` 18 -> 20, `lead` 18 -> 22, `body` 16/1.6, `caption` 12/1.33. App: stepped `2xs 11, xs 12, sm 14 (base), base 16, lg 18, xl 20, 2xl 24, 3xl 30`, headings `app-title 20/1.3 600`, `section-title 16/1.4 600`.
  **Why** Sec 3.2 of design-systems.md. **Applies to** all. **Check** computed font sizes on the page fall on the role scale +-0.5 px (marketing fluid sizes excepted); distinct sizes on a page <= 9 (marketing) / <= 7 (app). **Source** Apple/M3/Primer/Polaris (T).
- **RULE** Display tracking and leading: `letter-spacing: -0.035em` at >= 56 px, `-0.03em` at 40-55, `-0.02em` at 28-39, `-0.01em` at 20-27, 0 below 20; negative tracking only for fonts without optical sizing; leading 1.04-1.12 for display/h1/h2, 1.2-1.3 for h3/h4, 1.5-1.6 for body.
  **Why** measured heroes: -0.02em (Linear/Stripe/Figma) to -0.06em (Vercel); Primer snug 1.375/tight 1.25 ladder. **Applies to** landing page. **Check** per-role `letter-spacing/font-size` and `line-height/font-size`. **Source** (M); Primer (T).
- **RULE** Weights: UI 400/500/600; display weight is a knob (300-600, default 500); 700+ only for tiny caps/labels or heavy brand fonts.
  **Why** measured hero weights cluster 400-510. **Applies to** all. **Check** distinct weights on page <= 4. **Source** (M).

### 2.6 Motion, layers, depth

- **RULE** Durations `instant 0 / micro 100 / short 150 / base 200 / medium 300 / long 500`. Enter: 200-300 ms decelerate `cubic-bezier(0,0,0,1)`; exit: 150-200 ms accelerate `cubic-bezier(0.3,0,1,1)`; move/morph: `cubic-bezier(0.2,0,0,1)`; hover/color: 100-150 ms. Popups scale 0.98 -> 1 + opacity (coss), sheets translate 16 px.
  **Why** M3 and Primer duration ladders; coss values. **Applies to** all. **Check** every `transition-duration` in the set; none > 500 ms except explicit page transitions; `@media (prefers-reduced-motion: reduce)` disables transforms. **Source** (T).
- **RULE** Z-index tiers: in-page (inside `isolation: isolate` root) `behind -1 / base 0 / raised 10 / sticky 40`; portals `popup 50 / toast 60 / skip-link 70` (matches coss `z-50` / `z-60`).
  **Why** Base UI portals render outside the root stacking context; sticky headers at 40 stay below popups even without isolation. **Applies to** SaaS app UI. **Check** all z-index values in the allowed set. **Source** Base UI quick start (D); coss (T); Primer (T).
- **RULE** Depth recipe is a theme choice (`depth.style`): `border` (1 px at 8 % alpha + `shadow-xs/5`), `soft` (Tailwind shadow-sm/md/lg at <= 10 % alpha), `flat` (border only), `crisp` (1 px ring + 0/1 px offset hard shadow). Dark mode: borders white 6-10 %, drop shadows replaced by a 1 px top highlight (`0 -1px white/6 %`).
  **Why** coss recipe; Radix `shadow-*` starts with a 1 px ring; shadows on dark backgrounds are invisible. **Applies to** all. **Check** no shadow with alpha > 0.25; dark theme has no `box-shadow` as only separator. **Source** coss (T); Radix (T).

### 2.7 Density modes and contexts

- **RULE** Provide `density: compact | default | comfortable` which changes control padding and stack gaps (Primer: 8/12/16 px inline padding; 8/16/24 stack) but not control heights; `scale` is a separate global multiplier (2.2). App default = `default`; data tables use `compact`; marketing forms use `comfortable`.
  **Why** Primer precedent; keeps hit targets stable. **Applies to** SaaS app UI. **Check** row height in tables 32-40 px (compact), 40-48 (default). **Source** Primer (T).

### 2.8 Making the system expressive (themeable, not generic)

- **RULE** Every brief must set these knobs explicitly (none left at library default): `brand.hue/chroma` (+ neutral tint toward the brand hue, chroma 0.005-0.02), `font.display` + `font.body` (+ mono), `display.weight` + `display.tracking`, `radius.base`, `depth.style`, `density`, `motion.personality`, `contrast`, plus one *signature* (a distinctive component treatment: e.g., pill CTAs, hairline grid, mono labels, oversized numerals, asymmetric 7/5 split).
  **Why** all the surveyed sites differ on those axes: weight (300-700), tracking (0 to -0.06em), CTA radius (4-pill), content width (980-1416), depth (hairline vs shadow vs fill). Generic output = defaults on all axes (Inter, 8 px radius, shadow-md, neutral gray, blue-600, 3-up icon cards). **Applies to** landing page first. **Check** knob file has no `null`; similarity checker compares the knob vector with the last N sites and requires distance > threshold on >= 3 axes. **Source** (M); Linear/Radix/shadcn precedent (D).
- **RULE** Express through *constraints that cascade*, not per-element overrides: change the knob, rebuild tokens, re-render. Never fix "looks generic" by adding one-off classes.
  **Why** Linear collapsed 98 theme variables to 3; Radix lets `radius` re-skin every component. **Applies to** all. **Check** diff of generated CSS between two themes touches only token files. **Source** Linear (D); Radix (D).
- **RULE** Neutral ramps are tinted (OKLCH chroma 0.005-0.02 at the brand hue) except for deliberately achromatic brands; semantic status colors (info/success/warning/destructive) keep their own hues and are defined in OKLCH with fg partners (coss adds these four to shadcn).
  **Why** Linear's "warmer gray... less saturated" refresh; coss/shadcn neutral base is pure gray (the generic baseline to deviate from). **Applies to** all. **Check** `oklch` chroma of `--background`, `--muted`, `--border` > 0.003 unless `neutral.tint: none`. **Source** Linear refresh post (D); shadcn theming (D).

## 3. Numbers & scales: recommended defaults (SaaS marketing site + app UI)

| Token area | Marketing context | App context | Evidence |
|---|---|---|---|
| Base unit | 4 px | 4 px | Tailwind, Radix, Primer |
| Space steps (px) | 4 8 12 16 24 32 48 64 80 96 128 | 4 8 12 16 20 24 32 40 48 | all ramps |
| Page gutter | 16 (<640) -> 24 (640+) -> 32 (1024+) | 16 / 24 | (M) 16-24 mobile |
| Page max width | 1280 (80rem), prose 65ch | fluid; content 1440 max | (M) median 1264 |
| Section padding-y | clamp(4rem, 2.4348rem + 6.957vw, 8rem) = 64 -> 128 | 24-32 between panels | (M) 64-128 |
| Breakpoints | 640 / 768 / 1024 / 1280 / 1536 | same | Tailwind (D) |
| Body | 16 / 1.6 | 14 / 1.43 (20 px) desktop, 16 on inputs < 640 | Primer, coss, HIG |
| H1 / display | 34 -> 56 (h1), 40 -> 72 (display); w500; lh 1.04-1.1; ls -0.03em | 20-24 / 1.3 / w600 | (M) |
| Control height | CTA 44-48; nav 36 | 32 (36 coarse) | coss/Primer/Apple |
| Hit region | >= 44 coarse, >= 24 fine | same | HIG, WCAG |
| Icon | 16-24; 20 in feature rows | 16 (18 coarse) | coss |
| Radius | control 8, card 12, overlay 16, chip 4 (base 8) | same | shadcn/Radix/coss |
| Border | 1 px at 8-10 % alpha; 2 px selected/focus | same | Atlassian, Primer |
| Focus ring | 2 px, offset 1-2 px, `ring/24` halo 3 px on inputs | same | Primer, coss |
| Shadows | card `0 1px 2px / 5 %`; popup `lg / 5 %` | same | coss |
| Motion | 100 hover, 200 popup, 300 sheet; reveal-on-scroll 500-700 max | 100-200 only | M3, Primer |
| z-index | 0 / 10 / 40 / 50 / 60 / 70 | same | coss, Primer |

Fluid formulas (vmin 360, vmax 1280) generated from `(max-min)/(vmax-vmin)`:

| Role | min -> max px | CSS |
|---|---|---|
| display | 40 -> 72 | `clamp(2.5rem, 1.7174rem + 3.478vw, 4.5rem)` |
| h1 | 34 -> 56 | `clamp(2.125rem, 1.5870rem + 2.391vw, 3.5rem)` |
| h2 | 28 -> 44 | `clamp(1.75rem, 1.3587rem + 1.739vw, 2.75rem)` |
| h3 | 22 -> 28 | `clamp(1.375rem, 1.2283rem + 0.652vw, 1.75rem)` |
| h4 | 18 -> 20 | `clamp(1.125rem, 1.0761rem + 0.217vw, 1.25rem)` |
| lead | 18 -> 22 | `clamp(1.125rem, 1.0272rem + 0.435vw, 1.375rem)` |
| section-y | 64 -> 128 | `clamp(4rem, 2.4348rem + 6.957vw, 8rem)` |
| gutter | 16 -> 32 | `clamp(1rem, 0.6087rem + 1.739vw, 2rem)` |
| space-lg | 24 -> 48 | `clamp(1.5rem, 0.9130rem + 2.609vw, 3rem)` |
| space-xl | 40 -> 80 | `clamp(2.5rem, 1.5217rem + 4.348vw, 5rem)` |

Token-to-CSS mapping (what the build emits):

| JSON path | CSS custom property (Tailwind v4 `@theme`) | Utility it enables |
|---|---|---|
| `space.unit` | `--spacing` | `p-4`, `gap-6`, `h-8`, `size-9` |
| `radius.xs..4xl` | `--radius-xs..4xl` | `rounded-md`, `rounded-2xl` |
| `type.size.*` | `--text-xs` + `--text-xs--line-height` | `text-sm` |
| `font.family.*` | `--font-sans`, `--font-mono`, `--font-heading` | `font-sans` |
| `breakpoint.*` | `--breakpoint-sm..2xl` | `sm:`, `md:` |
| `container.*` | `--container-*` | `max-w-7xl`, `@lg:` |
| `motion.easing.*` | `--ease-*` | `ease-out` |
| `shadow.*` | `--shadow-*` | `shadow-md` |
| `color.*` semantic | `:root{--background...}` + `@theme inline{--color-background: var(--background)}` | `bg-background` |
| `z.*`, `hit.*`, `context.*` | plain `:root` custom properties | `z-(--z-sticky)` |

## 4. Proposed token schema for `design-engine/system/`

Layout:

```
system/
  tokens/
    primitive.tokens.json     # block A: ramps (no meaning)
    semantic.tokens.json      # block B: roles + contexts
    component.tokens.json     # block D: audit values per component/size (what the checker expects)
  themes/
    _knobs.schema.json        # allowed ranges for block C
    <theme-name>.theme.json   # block C instance: ~10 knobs per brief
  build/
    tokens.css                # generated @theme + :root (never hand-edited)
    tokens.strict.json        # generated W3C 2025.10 normalized output
```

Conventions: `$type` inherits from the nearest group. `$value` strings use compact units (`px`, `rem`, `em`, `ms`); `{path.to.token}` is an alias; formulas live in `$extensions["engine"].calc` as CSS `calc()` strings referencing `var(--...)` so themes recompute without a rebuild. `fluid` tokens carry `{min, max, vmin, vmax}`; the build computes the clamp.

### Block A: primitive.tokens.json (recommended base)

```json
{
  "$description": "Primitive ramps. No semantics. Feature code must not reference these.",
  "space": {
    "$type": "dimension",
    "unit": { "$value": "4px", "$description": "--spacing. Tailwind v4 base; all multiples below are x this unit." },
    "0":   { "$value": "0px" },
    "px":  { "$value": "1px" },
    "0.5": { "$value": "2px" },
    "1":   { "$value": "4px" },
    "1.5": { "$value": "6px" },
    "2":   { "$value": "8px" },
    "3":   { "$value": "12px" },
    "4":   { "$value": "16px" },
    "5":   { "$value": "20px" },
    "6":   { "$value": "24px" },
    "8":   { "$value": "32px" },
    "10":  { "$value": "40px" },
    "12":  { "$value": "48px" },
    "16":  { "$value": "64px" },
    "20":  { "$value": "80px" },
    "24":  { "$value": "96px" },
    "32":  { "$value": "128px" },
    "40":  { "$value": "160px" }
  },
  "size": {
    "$type": "dimension",
    "control": {
      "$description": "Control heights. fine = pointer:fine or >=640px; coarse = touch / <640px (coss: +4px).",
      "xs":  { "fine": { "$value": "24px" }, "coarse": { "$value": "28px" } },
      "sm":  { "fine": { "$value": "28px" }, "coarse": { "$value": "32px" } },
      "md":  { "fine": { "$value": "32px" }, "coarse": { "$value": "36px" } },
      "lg":  { "fine": { "$value": "36px" }, "coarse": { "$value": "40px" } },
      "xl":  { "fine": { "$value": "40px" }, "coarse": { "$value": "44px" } },
      "2xl": { "fine": { "$value": "44px" }, "coarse": { "$value": "44px" } },
      "3xl": { "fine": { "$value": "48px" }, "coarse": { "$value": "48px" } },
      "4xl": { "fine": { "$value": "56px" }, "coarse": { "$value": "56px" } }
    },
    "icon": {
      "xs": { "$value": "12px" }, "sm": { "$value": "14px" }, "md": { "$value": "16px" },
      "lg": { "$value": "18px" }, "xl": { "$value": "20px" }, "2xl": { "$value": "24px" }, "3xl": { "$value": "32px" }
    },
    "hit": {
      "fine":   { "$value": "24px", "$description": "WCAG 2.2 SC 2.5.8 AA" },
      "coarse": { "$value": "44px", "$description": "Apple HIG default / WCAG 2.5.5 AAA / Primer 2.75rem" },
      "gap":    { "$value": "8px",  "$description": "min distance between adjacent targets (12px coarse)" }
    },
    "border": {
      "hairline": { "$value": "1px" },
      "thick":    { "$value": "2px" },
      "focus":    { "$value": "2px" }
    }
  },
  "radius": {
    "$type": "dimension",
    "$description": "Static ramp for Tailwind utilities. Roles in semantic tier are derived from radius.base.",
    "none": { "$value": "0px" },
    "xs": { "$value": "2px" }, "sm": { "$value": "4px" }, "md": { "$value": "6px" }, "lg": { "$value": "8px" },
    "xl": { "$value": "12px" }, "2xl": { "$value": "16px" }, "3xl": { "$value": "24px" }, "4xl": { "$value": "32px" },
    "full": { "$value": "9999px" }
  },
  "type": {
    "size": {
      "$type": "dimension",
      "2xs": { "$value": "11px" }, "xs": { "$value": "12px" }, "sm": { "$value": "14px" }, "base": { "$value": "16px" },
      "lg": { "$value": "18px" }, "xl": { "$value": "20px" }, "2xl": { "$value": "24px" }, "3xl": { "$value": "30px" },
      "4xl": { "$value": "36px" }, "5xl": { "$value": "48px" }, "6xl": { "$value": "60px" }, "7xl": { "$value": "72px" },
      "8xl": { "$value": "96px" }
    },
    "weight": {
      "$type": "fontWeight",
      "light": { "$value": 300 }, "regular": { "$value": 400 }, "medium": { "$value": 500 },
      "semibold": { "$value": 600 }, "bold": { "$value": 700 }
    },
    "leading": {
      "$type": "number",
      "none": { "$value": 1 }, "display": { "$value": 1.04 }, "snug": { "$value": 1.12 }, "tight": { "$value": 1.25 },
      "heading": { "$value": 1.3 }, "ui": { "$value": 1.43 }, "normal": { "$value": 1.5 }, "relaxed": { "$value": 1.6 },
      "loose": { "$value": 1.75 }
    },
    "tracking": {
      "$type": "dimension",
      "$description": "em units. Build converts to px per role for strict DTCG.",
      "display-xl": { "$value": "-0.035em" }, "display": { "$value": "-0.03em" }, "heading": { "$value": "-0.02em" },
      "subheading": { "$value": "-0.01em" }, "normal": { "$value": "0em" }, "caps": { "$value": "0.04em" }
    }
  },
  "breakpoint": {
    "$type": "dimension",
    "sm": { "$value": "640px", "$description": "coss density / dialog / text-size switch is keyed here. Do not change." },
    "md": { "$value": "768px" }, "lg": { "$value": "1024px" }, "xl": { "$value": "1280px" }, "2xl": { "$value": "1536px" }
  },
  "container": {
    "$type": "dimension",
    "narrow": { "$value": "48rem" }, "prose": { "$value": "42rem", "$description": "~65ch at 16px" },
    "page": { "$value": "80rem" }, "wide": { "$value": "90rem" },
    "sidebar": { "$value": "16rem" }, "sidebar-icon": { "$value": "3rem" }, "sidebar-mobile": { "$value": "18rem" }
  },
  "motion": {
    "duration": {
      "$type": "duration",
      "instant": { "$value": "0ms" }, "micro": { "$value": "100ms" }, "short": { "$value": "150ms" },
      "base": { "$value": "200ms" }, "medium": { "$value": "300ms" }, "long": { "$value": "500ms" }
    },
    "easing": {
      "$type": "cubicBezier",
      "standard":   { "$value": [0.2, 0, 0, 1],   "$description": "M3 standard: move/morph" },
      "enter":      { "$value": [0, 0, 0, 1],     "$description": "M3 standard-decelerate: appear" },
      "exit":       { "$value": [0.3, 0, 1, 1],   "$description": "M3 standard-accelerate: disappear" },
      "linear":     { "$value": [0, 0, 1, 1] }
    }
  },
  "z": {
    "$type": "number",
    "$description": "page.* live inside the isolation:isolate app root; portal.* match coss ui z-50/z-60.",
    "page":   { "behind": { "$value": -1 }, "base": { "$value": 0 }, "raised": { "$value": 10 }, "sticky": { "$value": 40 } },
    "portal": { "popup": { "$value": 50 }, "toast": { "$value": 60 }, "skip": { "$value": 70 } }
  },
  "state": {
    "$type": "number",
    "$description": "State-layer opacities (Material 3).",
    "hover": { "$value": 0.08 }, "focus": { "$value": 0.12 }, "pressed": { "$value": 0.12 }, "dragged": { "$value": 0.16 }
  },
  "shadow": {
    "$type": "shadow",
    "xs": { "$value": [{ "color": "rgb(0 0 0 / 0.05)", "offsetX": "0px", "offsetY": "1px", "blur": "2px", "spread": "0px" }] },
    "sm": { "$value": [{ "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "1px", "blur": "3px", "spread": "0px" },
                       { "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "1px", "blur": "2px", "spread": "-1px" }] },
    "md": { "$value": [{ "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-1px" },
                       { "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "2px", "blur": "4px", "spread": "-2px" }] },
    "lg": { "$value": [{ "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "10px", "blur": "15px", "spread": "-3px" },
                       { "color": "rgb(0 0 0 / 0.10)", "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-4px" }] },
    "highlight-light": { "$value": [{ "color": "rgb(0 0 0 / 0.04)", "offsetX": "0px", "offsetY": "1px", "blur": "0px", "spread": "0px" }],
                         "$description": "coss inner top highlight (pseudo-element, radius-1px)" },
    "highlight-dark":  { "$value": [{ "color": "rgb(255 255 255 / 0.06)", "offsetX": "0px", "offsetY": "-1px", "blur": "0px", "spread": "0px" }] }
  }
}
```

### Block B: semantic.tokens.json (roles, contexts, typography composites)

Aliases `{font.display}`, `{font.body}`, `{font.mono}`, `{font.display-weight}` are intentionally unresolved here: they are supplied by the theme file (Block C) at build time.

```json
{
  "$description": "Semantic roles. Only these (and Tailwind utilities that resolve to them) are used by generated code.",
  "space": {
    "$type": "dimension",
    "inset":  { "sm": { "$value": "{space.3}" }, "md": { "$value": "{space.4}" }, "lg": { "$value": "{space.6}" }, "xl": { "$value": "{space.8}" } },
    "inline": { "xs": { "$value": "{space.1}" }, "sm": { "$value": "{space.2}" }, "md": { "$value": "{space.3}" }, "lg": { "$value": "{space.4}" } },
    "stack":  { "xs": { "$value": "{space.1}" }, "sm": { "$value": "{space.2}" }, "md": { "$value": "{space.4}" },
                "lg": { "$value": "{space.6}" }, "xl": { "$value": "{space.8}" }, "2xl": { "$value": "{space.12}" } },
    "section": {
      "sm": { "$value": "{space.12}", "$extensions": { "engine": { "fluid": { "min": "40px", "max": "80px", "vmin": 360, "vmax": 1280 } } } },
      "md": { "$value": "{space.20}", "$extensions": { "engine": { "fluid": { "min": "56px", "max": "104px", "vmin": 360, "vmax": 1280 } } } },
      "lg": { "$value": "{space.32}", "$extensions": { "engine": { "fluid": { "min": "64px", "max": "128px", "vmin": 360, "vmax": 1280 } } } }
    },
    "gutter": { "$value": "{space.4}", "$extensions": { "engine": { "fluid": { "min": "16px", "max": "32px", "vmin": 360, "vmax": 1280 } } } }
  },
  "radius": {
    "$type": "dimension",
    "base":    { "$value": "8px", "$description": "THE knob. Presets: sharp 2px, tight 4px, default 8px, soft 12px, pill 9999px." },
    "control": { "$value": "{radius.base}" },
    "chip":    { "$value": "{radius.base}", "$extensions": { "engine": { "calc": "max(2px, calc(var(--radius-base) * 0.5))" } } },
    "surface": { "$value": "{radius.base}", "$extensions": { "engine": { "calc": "min(calc(var(--radius-base) * 1.5), 24px)" } } },
    "overlay": { "$value": "{radius.base}", "$extensions": { "engine": { "calc": "min(calc(var(--radius-base) * 2), 28px)" } } },
    "inner":   { "$value": "{radius.base}", "$extensions": { "engine": { "calc": "max(0px, calc(var(--radius-outer) - var(--pad) - var(--bw, 1px)))",
                "$description": "Set --radius-outer, --pad on the parent. Nested children use this." } } }
  },
  "size": {
    "$type": "dimension",
    "control": {
      "default": { "$value": "{size.control.md.fine}" },
      "cta":     { "$value": "{size.control.3xl.fine}" },
      "nav":     { "$value": "{size.control.lg.fine}" }
    },
    "hit-min": { "$value": "{size.hit.coarse}" }
  },
  "border": {
    "width":   { "$type": "dimension", "$value": "{size.border.hairline}" },
    "color":   { "$type": "color", "$value": "{color.border}" }
  },
  "type": {
    "$type": "typography",
    "$description": "Marketing roles are fluid (vmin 360 / vmax 1280). App roles are stepped. fontFamily aliases resolve from theme knobs.",
    "display": {
      "$value": { "fontFamily": "{font.display}", "fontSize": "{type.size.7xl}", "fontWeight": "{font.display-weight}", "letterSpacing": "{type.tracking.display-xl}", "lineHeight": "{type.leading.display}" },
      "$extensions": { "engine": { "fluid": { "min": "40px", "max": "72px", "vmin": 360, "vmax": 1280 }, "context": "marketing" } }
    },
    "h1": {
      "$value": { "fontFamily": "{font.display}", "fontSize": "{type.size.5xl}", "fontWeight": "{font.display-weight}", "letterSpacing": "{type.tracking.display}", "lineHeight": "{type.leading.snug}" },
      "$extensions": { "engine": { "fluid": { "min": "34px", "max": "56px", "vmin": 360, "vmax": 1280 }, "context": "marketing" } }
    },
    "h2": {
      "$value": { "fontFamily": "{font.display}", "fontSize": "{type.size.4xl}", "fontWeight": "{font.display-weight}", "letterSpacing": "{type.tracking.heading}", "lineHeight": "{type.leading.snug}" },
      "$extensions": { "engine": { "fluid": { "min": "28px", "max": "44px", "vmin": 360, "vmax": 1280 }, "context": "marketing" } }
    },
    "h3": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.2xl}", "fontWeight": "{type.weight.semibold}", "letterSpacing": "{type.tracking.subheading}", "lineHeight": "{type.leading.tight}" },
      "$extensions": { "engine": { "fluid": { "min": "22px", "max": "28px", "vmin": 360, "vmax": 1280 } } }
    },
    "h4": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.xl}", "fontWeight": "{type.weight.semibold}", "letterSpacing": "{type.tracking.subheading}", "lineHeight": "{type.leading.heading}" },
      "$extensions": { "engine": { "fluid": { "min": "18px", "max": "20px", "vmin": 360, "vmax": 1280 } } }
    },
    "lead": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.xl}", "fontWeight": "{type.weight.regular}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.normal}" },
      "$extensions": { "engine": { "fluid": { "min": "18px", "max": "22px", "vmin": 360, "vmax": 1280 }, "context": "marketing" } }
    },
    "body": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.base}", "fontWeight": "{type.weight.regular}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.relaxed}" }
    },
    "body-ui": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.sm}", "fontWeight": "{type.weight.regular}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.ui}" },
      "$extensions": { "engine": { "context": "app", "touch-size": "16px", "$description": "App base. Inputs/controls become 16px below 640px (iOS zoom + coss text-base sm:text-sm)." } }
    },
    "label": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.sm}", "fontWeight": "{type.weight.medium}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.ui}" }
    },
    "caption": {
      "$value": { "fontFamily": "{font.body}", "fontSize": "{type.size.xs}", "fontWeight": "{type.weight.regular}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.relaxed}" }
    },
    "code": {
      "$value": { "fontFamily": "{font.mono}", "fontSize": "{type.size.sm}", "fontWeight": "{type.weight.regular}", "letterSpacing": "{type.tracking.normal}", "lineHeight": "{type.leading.normal}" }
    }
  },
  "color": {
    "$description": "Structural slots only. Values come from the theme (OKLCH). Every surface has a -foreground partner. Names match shadcn/coss so components work unchanged. Base values below = shadcn neutral (T) as the generic baseline to deviate from.",
    "background": { "$type": "color", "$value": "oklch(1 0 0)", "dark": "oklch(0.145 0 0)" },
    "foreground": { "$type": "color", "$value": "oklch(0.145 0 0)", "dark": "oklch(0.985 0 0)" },
    "card": { "$type": "color", "$value": "oklch(1 0 0)", "dark": "oklch(0.205 0 0)" },
    "card-foreground": { "$type": "color", "$value": "oklch(0.145 0 0)", "dark": "oklch(0.985 0 0)" },
    "popover": { "$type": "color", "$value": "oklch(1 0 0)", "dark": "oklch(0.205 0 0)" },
    "popover-foreground": { "$type": "color", "$value": "oklch(0.145 0 0)", "dark": "oklch(0.985 0 0)" },
    "primary": { "$type": "color", "$value": "oklch(0.205 0 0)", "dark": "oklch(0.922 0 0)" },
    "primary-foreground": { "$type": "color", "$value": "oklch(0.985 0 0)", "dark": "oklch(0.205 0 0)" },
    "secondary": { "$type": "color", "$value": "oklch(0.97 0 0)", "dark": "oklch(0.269 0 0)" },
    "secondary-foreground": { "$type": "color", "$value": "oklch(0.205 0 0)", "dark": "oklch(0.985 0 0)" },
    "muted": { "$type": "color", "$value": "oklch(0.97 0 0)", "dark": "oklch(0.269 0 0)" },
    "muted-foreground": { "$type": "color", "$value": "oklch(0.556 0 0)", "dark": "oklch(0.708 0 0)" },
    "accent": { "$type": "color", "$value": "oklch(0.97 0 0)", "dark": "oklch(0.269 0 0)" },
    "accent-foreground": { "$type": "color", "$value": "oklch(0.205 0 0)", "dark": "oklch(0.985 0 0)" },
    "destructive": { "$type": "color", "$value": "oklch(0.577 0.245 27.325)", "dark": "oklch(0.704 0.191 22.216)" },
    "destructive-foreground": { "$type": "color", "$value": "oklch(0.505 0.213 27.518)", "dark": "oklch(0.704 0.191 22.216)", "$description": "coss addition: text/icon colour for destructive-outline/menu/field errors (red-700 / red-400)" },
    "info": { "$type": "color", "$value": "oklch(0.623 0.214 259.815)", "dark": "oklch(0.623 0.214 259.815)", "$description": "coss addition (blue-500); -foreground blue-700 / blue-400" },
    "success": { "$type": "color", "$value": "oklch(0.696 0.17 162.48)", "dark": "oklch(0.696 0.17 162.48)", "$description": "coss addition (emerald-500); -foreground emerald-700 / 400" },
    "warning": { "$type": "color", "$value": "oklch(0.769 0.188 70.08)", "dark": "oklch(0.769 0.188 70.08)", "$description": "coss addition (amber-500); -foreground amber-700 / 400" },
    "border": { "$type": "color", "$value": "oklch(0 0 0 / 8%)", "dark": "oklch(1 0 0 / 6%)", "$description": "coss: black 8% / white 6%. shadcn: oklch(0.922 0 0) / white 10%" },
    "input": { "$type": "color", "$value": "oklch(0 0 0 / 10%)", "dark": "oklch(1 0 0 / 8%)" },
    "ring": { "$type": "color", "$value": "oklch(0.708 0 0)", "dark": "oklch(0.556 0 0)" }
  },
  "context": {
    "$description": "Remaps for the two product surfaces; same names, different values. Applied via [data-context=marketing|app] on the root.",
    "marketing": {
      "type.body": "type.body", "space.section": "space.section.lg", "container": "container.page",
      "size.control.default": "size.control.3xl.fine", "radius.control": "radius.control", "motion.reveal-max": "700ms"
    },
    "app": {
      "type.body": "type.body-ui", "space.section": "space.stack.xl", "container": "container.wide",
      "size.control.default": "size.control.md.fine", "radius.control": "radius.control", "motion.reveal-max": "200ms"
    }
  }
}
```

### Block C: theme knobs (the expressive layer; one file per brief)

```json
{
  "$schema": "./_knobs.schema.json",
  "name": "example-signal",
  "brand":   { "hue": 262, "chroma": 0.19, "lightness-light": 0.52, "lightness-dark": 0.72 },
  "neutral": { "tint-chroma": 0.012, "tint-hue": "brand" },
  "contrast": 1.0,
  "font": {
    "display": "'Instrument Sans', var(--font-sans)",
    "body": "'Inter Variable', var(--font-sans)",
    "mono": "'Geist Mono', ui-monospace, monospace",
    "display-weight": 500
  },
  "display": { "tracking": "display", "leading": "display", "case": "sentence" },
  "radius":  { "base": "10px", "preset": "default" },
  "depth":   { "style": "border", "elevation": 1 },
  "density": "default",
  "scale": 1,
  "motion":  { "personality": "snappy", "duration-multiplier": 1 },
  "signature": "hairline grid + mono eyebrow labels",
  "$allowed": {
    "contrast": [0.9, 1.3],
    "scale": [0.9, 0.95, 1, 1.05, 1.1],
    "radius.preset": ["sharp", "tight", "default", "soft", "pill"],
    "depth.style": ["border", "soft", "flat", "crisp"],
    "density": ["compact", "default", "comfortable"],
    "motion.personality": ["calm", "snappy", "springy"],
    "font.display-weight": [300, 400, 500, 600, 700]
  }
}
```

### Block D: component audit values (what the checker expects; coss-aligned)

When coss ui is the component library these numbers are **not authored** (they live in the coss source and flip at `sm`); this file only declares the expected measurements so `tools/check` can assert them.

```json
{
  "$description": "Expected rendered boxes (fine = >=640px, coarse = <640px). Based on coss ui registry source, read 2026-10-08.",
  "button": {
    "xs": { "height": [24, 28], "padding-x": 8, "icon": [14, 16], "radius": "chip" },
    "sm": { "height": [28, 32], "padding-x": 10, "icon": [16, 18], "radius": "control", "gap": 6 },
    "default": { "height": [32, 36], "padding-x": 12, "icon": [16, 18], "radius": "control", "gap": 8 },
    "lg": { "height": [36, 40], "padding-x": 14, "icon": [16, 18], "radius": "control" },
    "xl": { "height": [40, 44], "padding-x": 16, "icon": [18, 20], "radius": "control", "font": [16, 18] },
    "icon": { "box": [32, 36] }, "icon-sm": { "box": [28, 32] }, "icon-lg": { "box": [36, 40] }, "icon-xl": { "box": [40, 44] }, "icon-xs": { "box": [24, 28] }
  },
  "input": { "sm": { "height": [28, 32] }, "default": { "height": [32, 36] }, "lg": { "height": [36, 40] }, "padding-x": [10, 12], "font": [14, 16], "border": 1 },
  "select": { "sm": { "min-height": [28, 32] }, "default": { "min-height": [32, 36] }, "lg": { "min-height": [36, 40] } },
  "badge": { "sm": { "height": [16, 20] }, "default": { "height": [18, 22] }, "lg": { "height": [22, 26] }, "font": { "sm": [10, 12], "default": [12, 14], "lg": [14, 16] } },
  "card": { "radius": "2xl (16px)", "padding": 24, "title": "18px / font-heading 600" },
  "dialog": { "radius": "2xl (16px)", "max-width": 512, "padding": 24, "mobile": "bottom sheet, no side radius" },
  "menu-item": { "min-height": 32, "padding": [8, 4], "radius": "sm (4px)" },
  "switch": { "track": [38, 22], "thumb": 20 },
  "checkbox": { "box": 18, "icon": [14, 12], "radius": 4 },
  "tooltip": { "font": 12, "radius": "md (6px)", "padding-y": 4 },
  "alert": { "radius": "xl (12px)", "padding": [14, 12] },
  "table-head": { "height": 40, "padding-x": 10 },
  "z": { "popup": 50, "toast": 60 },
  "tolerance": 0.5
}
```

## 5. Dos and Don'ts

- **Do** put `data-context="marketing|app"` on the root and let tokens remap. **Don't** hand-tune per-section font sizes with arbitrary values.
- **Do** change `radius.base` and rebuild. **Don't** replace `rounded-lg` with `rounded-[14px]` on seven components.
- **Do** emit `--font-heading` and `--font-sans` even if both are the same face (coss reads both). **Don't** keep the Next.js starter name `--font-geist-sans`.
- **Do** keep `--breakpoint-sm: 40rem`. **Don't** set `sm` to 480 or 520 "to be mobile-first"; coss controls will resize at the wrong width.
- **Do** author the 44 px expander as `pointer-coarse:after:min-h-11 min-w-11` on small controls. **Don't** make every button 44 px tall on desktop (fails dense app UI and looks like a marketing template).
- **Do** declare neutral borders as alpha colors (`oklch(0 0 0 / 8%)`). **Don't** use a hex border on tinted surfaces.
- **Do** use `max(0px, calc(R - pad - bw))` for inner radius. **Don't** give the inner and outer elements the same radius.

## 6. Exceptions & judgement calls

- **Why base 8 px radius when coss/shadcn use 10 px?** `radius.base` is the generic baseline; 8 is closer to the measured control median (6-8 on 8 of 18 sites) while 10 is the coss/shadcn flavor. Choose per brief; the *relationships* (chip 0.5x, surface 1.5x, overlay 2x) are the rule.
- **coss uses fixed Tailwind radii** (`rounded-lg` etc.), not role tokens. To make `radius.base` drive coss, remap `--radius-lg = var(--radius-control)`, `--radius-2xl = var(--radius-overlay)`, `--radius-xl = var(--radius-surface)`, `--radius-md`, `--radius-sm` in `@theme`. Verify the visual result (card `rounded-2xl`, dialog `rounded-2xl` become the same overlay size).
- **Section padding** below 64 px is acceptable for dense "feature list" sections and above 128 px only for hero/CTA closers (Apple 160). Rhythm beats the number: alternate 96 / 128 / 96, don't use one value everywhere.
- **Spacing 2/6/10/14 px.** Allowed inside controls because Tailwind's ramp includes `0.5`, `1.5`, `2.5`, `3.5` and coss uses `px-[calc(--spacing(2.5)-1px)]` (border compensation). Outside controls they violate the 4 px lattice.
- **Type scale: 15 px** is used by Linear for UI text (15/24) and Polaris has 13; if the brand wants a 15 px base, add `type.size.15` rather than rounding.
- **DTCG limits.** Strict DTCG has no `calc`, no `em` dimensions, no fluid/clamp, no light/dark variants, no `context` remaps, no breakpoints-as-tokens semantics. The `$extensions.engine` and `dark` keys are our extensions; the build emits (1) a strict file with only spec-valid tokens, (2) CSS with the extensions resolved. The DTCG Resolver/theming module was not reviewed (spec text fetched did not cover it).

## 7. Open questions

- DTCG 2025.10 final report was read only partially (the fetched draft mirror covered sections through Shadow; typography/gradient came from the final report excerpt). Confirm `dimension` allowed units (`px`, `rem` only?) and the theming/resolver module before locking `build/tokens.strict.json`.
- Verify in the installed coss `@coss/style` CSS whether `--radius-lg` etc. are remapped to `var(--radius)`; measurement on coss.com suggests button radius 10 px, which Tailwind's default `lg` (8 px) would not produce.
- Verify the coss `Slider` value type (array vs scalar) in the installed source; official migration page says arrays, user global skill says scalar.
- shadcn sidebar width constants (16 rem, 18 rem mobile, 3 rem icon) are from memory (E); confirm in coss `sidebar.tsx`.
- Mobile hero H1 size (34-48 px measured) vs the `h1` token minimum 34 px and `display` minimum 40 px: validate with real brand copy lengths (long headlines need 32-34 px).
- Decide whether `scale` (0.9-1.1) should ever apply to marketing contexts; Radix applies it globally, but measured marketing sites never scale controls.
- The similarity "knob vector" distance threshold is not yet defined; needs a corpus of >= 20 generated sites to calibrate.
