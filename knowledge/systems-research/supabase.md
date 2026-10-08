---
source: web:https://supabase.com/design-system ; https://github.com/supabase/supabase (packages/ui/build/css/source/semantic.css, themes/dark.css, themes/light.css, compat.css; packages/config/css/theme.css; apps/design-system/content/docs/*.mdx) ; https://supabase.com
chapter: Supabase Design System profile (public repo + measured live)
pages: n/a (repo files read via raw.githubusercontent.com, live site measured, 2026-10-08)
topic_tags: [design-system, oklch, tokens, theming, contrast, focus, accessibility, copywriting, density, saas, developer-tools]
status: studied
---

# Supabase Design System

Machine profile: `system/systems-research/supabase.json`. Raw repo files and measurements: `corpus/web/systems/supabase/` (gitignored). Licence Apache-2.0 for the repo (marks excluded). Provenance: mixed (public spec + live measurement). The studio dashboard needs a login and was not measured; DS site components (60 doc pages) and the marketing site were.

## 1. Core ideas

1. **A semantic colour system derived in OKLCH from a few inputs.** `semantic.css` header: themes override a small set of inputs; every semantic colour is derived in OKLCH. Inputs: `--hue`/`--primary-hue`, `--surface-hue-offset`, `--chroma`, `--surface`, `--foreground-lightness`, muted/tertiary levels, `--contrast`, `--elevation-step`, `--field-alpha`. Dark: surface L 0.19, foreground L 0.95; light: surface L 0.995, foreground L 0.10 (`themes/dark.css`, `light.css`).
2. **Light surface hue is complementary to the spot colour.** `--surface-hue-offset: 180` on light (brand green 157.5 becomes canvas tint 337.5, with chroma 0 on light the tint is currently invisible), 0 on dark so the canvas carries a subtle brand tint.
3. **One contrast knob.** `--contrast` 0-1 (dark 0.5, light 0.53): foreground reaches `--foreground-lightness` at 0.5, eases to a floor of 0.9 below; border alpha is `(0.05 + 0.95*contrast)^2` so most of the range lives near full strength.
4. **Elevation is lightness steps with fixed ratios.** card = +step*1, popover = +step*1.5, secondary = +step*2, tertiary = +step*3; dark step 0.025, light step 0.024 so "higher = lighter" in both modes. Muted/accent/tertiary fills are foreground at alpha tuned to the same lightness delta, so they composite correctly on any plate.
5. **Accent is split by job.** `--primary` (readable ink: links, labels, step dots; AA on app surfaces), `--primary-solid` (button plate; darker than ink in dark so buttons do not read lime, equal to ink in light), `--primary-bright` (focus rings, selected controls), `brand-default` (fixed identity green, does not follow the hue). Source: `color-usage.mdx`.
6. **Status colours are expressive, not neutral-derived.** One shared chroma 0.14; hues clamped (warning 65-95, destructive 12-42, info 272-302) with a 0.15 pull toward the brand hue; lightness anchors per mode (dark 0.80/0.55/0.70, light 0.55/0.52/0.54); text on a fill flips at L 0.62 via `clamp(0.12, (0.62 - l)*100, 0.99)`.
7. **Focus is a recipe.** `focus-ring` = `focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background`; `focus-inset` = 2px outline offset -2px for table rows (Safari skips box-shadow on `tr`); focus properties are excluded from transitions so the ring appears instantly (`accessibility.mdx`).
8. **Disabled controls can stay focusable.** `disabled` + `focusableWhenDisabled` with a tooltip for permission or plan gates.
9. **Copy is specified.** Verbs not nouns, outcome-specific button text, sentence case for UI text and title case for page names, "Postgres" not "PostgreSQL", no exclamation marks except destructive confirmations, no marketing words (`copywriting.mdx`).
10. **Migration is explicit.** `compat.css` maps old names (`--foreground-light`, `--background-surface-100`, `--border-strong`) onto the new semantics and says "delete entries as consumers move; the file goes away when empty". The docs also admit the brand scale is not uniform and `brand-200` in dark is bad.

## 2. Rules

- **RULE** Derive every semantic colour (background, foreground, card, popover, muted, accent, border, input, ring, status) from a short list of theme inputs in OKLCH; themes are files that set inputs, never lists of finished colours.
  **Why** Keeps ratios (elevation, text contrast, border strength) identical across themes and lets one hue change re-skin the product.
  **Applies to** SaaS app UI | all
  **Check** theme file declares at most 12 inputs; grep that no semantic token in a theme file is a literal colour except stepped scales.
  **Source** packages/ui/build/css/source/semantic.css (header comment)

- **RULE** Split the accent into four tokens with separate contrast jobs: ink (small text and indicators, 4.5:1), plate (button fill under its own foreground, 4.5:1), bright (focus ring, selected state, 3:1 non-text), fixed brand (identity surfaces only).
  **Why** A single accent cannot be both a readable text colour and a button fill in both modes; in dark the readable ink is too bright to be a plate.
  **Applies to** SaaS app UI | landing page
  **Check** compute: ink on canvas >= 4.5:1; plate-foreground on plate >= 4.5:1 (Supabase measured 5.02:1 / 4.96:1 light, 9.14:1 / 6.40:1 dark); ring vs canvas >= 3:1.
  **Source** color-usage.mdx; contrast computed 2026-10-08 from OKLCH values

- **RULE** Express elevation as `background lightness + signed step * ratio` with shared ratios (1, 1.5, 2, 3) and a step per theme (dark +0.025, light +0.024 from a soft-grey canvas), so higher surfaces are lighter in both modes.
  **Why** One direction of elevation in both modes avoids dark-mode inversion bugs; a soft-grey light canvas leaves headroom to brighten toward white.
  **Applies to** SaaS app UI
  **Check** card, popover, secondary lightness strictly increase; light canvas L <= 0.995 (not pure white) when elevation uses brightening.
  **Source** semantic.css elevation block; light.css

- **RULE** Give status colours one shared chroma and clamp each hue to its perceptual category, anchored at mode-specific lightness; choose on-fill text by a hard flip at L 0.62.
  **Why** Warning must always read amber and destructive always red under any brand hue; shared chroma keeps them from out-shouting each other; the flip guarantees legible text without per-colour picks.
  **Applies to** SaaS app UI
  **Check** warning hue in [65,95], destructive in [12,42], info in [272,302]; on-fill contrast >= 4.5:1 for each.
  **Source** semantic.css (status hue and expressive chroma comments)

- **RULE** Define focus as two shared recipes (offset ring for controls, inset outline for dense rows), colour it from the bright accent at about 55% alpha, and keep outline and ring properties out of transition lists.
  **Why** Consistent focus is recognised instantly; transitioning it delays feedback for keyboard users; inset avoids clipping in tables and flush surfaces.
  **Applies to** all
  **Check** every `:focus-visible` style resolves to one of two recipes; `transition-property` on interactive elements excludes outline-*, box-shadow ring when used for focus.
  **Source** accessibility.mdx (Focus ring recipe)

- **RULE** Give every control a complete state set in the spec: rest, hover, focus-visible, disabled (opacity .5, pointer-events none), invalid (aria-invalid bg and border plus hover and focus variants), read-only; and let unavailable-with-reason actions stay focusable.
  **Why** Unspecified states are where inconsistent one-off styles appear.
  **Applies to** SaaS app UI | forms
  **Check** component spec has a row per state; input has aria-invalid and read-only styles; disabled with tooltip uses aria-disabled or focusableWhenDisabled.
  **Source** packages/ui src input.tsx, button.tsx; accessibility.mdx (Disabled controls)

- **RULE** Write the UI copy rules next to the component rules: action verbs on buttons, sentence case for labels and headings, title case for page names, one sentence for tooltips, no exclamation marks outside destructive confirmations, no marketing vocabulary.
  **Why** Voice drift is as visible as spacing drift and is checkable.
  **Applies to** SaaS app UI | forms
  **Check** lint button labels (starts with a verb), reject `!` in toasts except destructive, reject words from the avoid-list.
  **Source** copywriting.mdx

- **RULE** When migrating tokens, ship a compatibility alias file that maps old names onto the new semantics, forbid new references to it, and delete entries as consumers move.
  **Why** Prevents big-bang rewrites while keeping the new model clean.
  **Applies to** SaaS app UI (design-system maintenance)
  **Check** grep: zero new references to names listed in compat.css in files changed in the last N commits.
  **Source** compat.css header comment

- **RULE** Size controls from a named ladder and keep one ladder per product layer; do not mix two ladders in one surface (Supabase has 26/34/38/42/50px legacy and 36/40/44px shadcn layers coexisting; treat that as a defect to avoid).
  **Why** Mixed ladders produce adjacent controls that differ by 2-4px.
  **Applies to** SaaS app UI
  **Check** set of control heights on one screen has at most 3 values and all come from one ladder.
  **Source** packages/ui constants.ts (SIZE.height) vs shadcn button.tsx

## 3. Numbers & scales

| Item | Value |
|---|---|
| Dark canvas | oklch(0.19 0.0025 157.5) = #131413; text oklch(0.95 0.00275 157.5) = #edefee |
| Light canvas | oklch(0.995 0 337.5) = #fdfdfd; text oklch(0.1 0 337.5) = #030303; muted text L .52065 = #696969 (5.40:1) |
| Primary ink | dark oklch(0.76 0.15 157.5) ~#4acd8b; light oklch(0.525 0.12 157.5) ~#0e7e4e |
| Primary plate | dark oklch(0.43627 0.11 157.5) ~#006338; light = ink |
| Brand green | hsl(153.1 60.2% 52.7%) dark; hsl(152.9 60% 52.9%) light; rendered #3fcf8e |
| Status L (dark/light) | warning .80/.55; destructive .55/.52; info .70/.54; chroma .14; hue 75(58 light)/25/288 |
| Type (px/lh) | 12/16, 13/18.57, 15/22.5, 16/24, 18/25.2, 22/29.33, 28/33.6, 34/37.78, 46/46, 70/70 |
| Weights | 300, 450 (normal), 500, 600, 700, 800 |
| Radius | 2, 4, 6 (md), 8, 12, 16; panel 6; item = md-2 |
| Spacing | 4px base; 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64, 128 |
| Control heights | legacy 26/34/38/42/50; shadcn 36/40/44; dashboard input 28; grid row 28 |
| Motion | 150ms default; 200ms buttons (.22,1,.36,1); ease-in-out (.4,0,.2,1); ease-enter (.16,1,.3,1); ease-move (.87,0,.13,1) |
| Breakpoint | xs 480px; content width 1128px (xl); marketing container 1088px at 1440 |
| Icons | 24x24 frame, glyph about 18x18, stroke 1.5, UI sizes 12/16/18 |
| Documented components | 58 pages + 10 UI-pattern pages |

## 4. Dos and Don'ts

- Do: primary Button uses `bg-primary-solid text-primary-solid-foreground hover:bg-[var(--primary-solid-hover)]` so dark mode gets the deep plate. Don't: use `bg-primary` for a dark-mode button (reads lime).
- Do: Input = `bg-field` (sunk, black at 1.5% light / 12% dark) with `border-control` and hover border. Don't: fill inputs with a solid surface token that vanishes on light sheets.
- Do: interactive table row = `focus-inset`. Don't: put `focus-ring` or `ring-*` on a `<tr>` (Safari skips box-shadow on table rows) or add `outline-hidden` beside `focus-inset`.
- Do: data-grid empty space uses `bg-alternative` to add depth. Don't: leave large empty grid areas on the plain surface.
- Do: custom icons exported 24x24, glyph about 18x18, `stroke="currentColor"` width 1.5 on the root svg. Don't: hardcode stroke colours in child paths (the build rejects it).

## 5. Exceptions & judgement calls

- The marketing radii measure about 1.333x the DS scale (5.33, 10.67, 21.33px); treat marketing and app as two density/radius profiles rather than one.
- Body weight 450 requires a variable Inter; with static Inter use 400 or 500.
- [engine note] Light-mode chroma 0 means the 180-degree complementary surface tint exists in code but renders neutral; copy the mechanism, not the visual claim.
- [engine note] Library entry should expose `primary-hue` and `contrast` as the two public knobs and keep the rest derived; the legacy aliases should not be copied.

## 6. Figures worth keeping

- `corpus/web/systems/supabase/home-1440-fold.png`: marketing hero with green-ink second headline line, white card grid, small cookie card.
- `corpus/web/systems/supabase/ds-1440-fold.png`: DS site shell (search 256x32, 13px sidebar).

## 7. Open questions

- Studio (dashboard) measured values: not accessible; token files cover it but real row heights and paddings are unconfirmed.
- Marketing radius multiplier source not found in the token files.
- Backdrop blur and shadows for popovers are not declared in the DS theme (button shadow tokens are empty); confirm whether any layer uses them.
- `--text-7xl` (70px) usage not observed.
- Whether the light surface hue offset is meant to become visible (chroma 0 today).
