---
source: web:https://preline.co/docs/themes.html ; https://unpkg.com/preline@5.0.0/theme.css ; https://github.com/htmlstreamofficial/preline/tree/main/css/themes ; https://preline.co/docs/buttons.html
chapter: Preline UI 5 system profile (default + 8 premade themes)
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, tailwind-v4, tokens, themes, neutrals, states, oklch]
status: studied
---

# Preline UI 5

Machine profile: `system/systems-research/preline.json`. Raw fetches: `corpus/web/systems/preline/` (theme.css, themes/*.css, LICENSE, docs HTML). Licence: dual MIT + "Preline UI Fair Use License" (no competing product; attribution required for sold derivative templates/themes).

## 1. Core ideas

1. **Three-layer tokens with per-state and per-region sets.** Palette -> `:root` semantic vars -> `@theme inline` utilities. ~170 tokens: background (+1, +2, plain), foreground, inverse, border, `border-line-1..8`, primary ramp 50-950 + primary/hover/focus/active/checked/line/foreground, secondary, layer, surface (+1..5), muted (+foreground 1, 2), destructive, navbar x3, sidebar x3, card, dropdown, select, overlay, popover, tooltip, table, switch, footer, scrollbar, chart-1..10.
2. **Layer vs surface.** `layer` = white element on a white panel (e.g. white button on white card: white fill, gray-200 line, gray-50 hover); `surface` = filled grey element (gray-100 ramp). Explicit names for a distinction most systems leave implicit.
3. **Numbered border lines** (`line-1` gray-100 .. `line-8` gray-800) let a component pick contrast by number.
4. **Themes retint neutrals, not just accents.** harvest uses custom `preline-khaki`; bubblegum and cashmere `preline-mauve`; olive `preline-avocado-soft`; autumn/cashmere stone. The khaki/avocado ramps have very low chroma (0.002-0.03) at fixed hues (88-91, 120).
5. **Retro = two knobs.** radius 0 on every `--radius-*` (plus a `--radius-ui` utility override) and every border/line set to neutral-800, with fuchsia-500 primary carrying a neutral-800 `primary-line`.
6. **Vendor-described personalities:** default "clear, high-contrast blue"; harvest "warm, low-contrast, eye-friendly... long working sessions"; retro "magenta accents with sharp edges"; ocean "cool teal"; autumn "rich amber and golden"; moon "deep navy and muted blue... night-friendly"; bubblegum "bright pink... playful"; cashmere "dusty rose and soft brown... quietly premium"; olive "muted olive-green... grounded".
7. **Behaviour via vanilla JS plugins** (hs-overlay, hs-dropdown, hs-select...), ~80 documented components including heavy ones (datatables, tree view, layout splitter, WYSIWYG).

## 2. Rules

- **RULE** Change a theme's temperature by swapping the neutral ramp (background, border, surface, muted) to a tinted near-grey of chroma 0.002-0.03, not only the accent.
  **Why** Neutrals cover 80-90% of pixels; a khaki or olive-grey neutral changes mood more than any button colour.
  **Applies to** all. **Check** neutral tokens resolve to oklch with chroma > 0 and a shared hue. **Source** preline themes harvest.css, olive.css; theme.css preline-khaki ramp

- **RULE** Tokenise interaction state per role (`primary-hover`, `-focus`, `-active`, `-checked`; `navbar-nav-hover`) so themes own state colours.
  **Why** Opacity-based hovers look muddy on tinted themes; explicit state tokens keep hue control.
  **Applies to** SaaS app UI. **Check** hover colours come from tokens, not `opacity`/`/90` utilities. **Source** theme.css

- **RULE** Distinguish a "layer" style (same colour as its container, separated by a line) from a "surface" style (filled tint) for secondary controls.
  **Why** White-on-white buttons need a border and a hover tint; grey-filled controls need no border; mixing them per component causes inconsistency.
  **Applies to** SaaS app UI. **Check** secondary controls use one of the two recipes consistently. **Source** preline.co/docs/themes.html core tokens

- **RULE** For a brutalist/retro direction set every radius to 0 and draw every border in the foreground colour; keep one saturated accent.
  **Why** Preline's retro theme achieves the whole look with these two moves.
  **Applies to** landing page. **Check** all border-radius 0; border colours = foreground colour. **Source** themes/retro.css

- **RULE** Label low-contrast "comfort" themes as such and verify muted text against AA before using them for body copy.
  **Why** Harvest/cashmere/olive are deliberately low-contrast; their muted-foreground-1 (khaki/stone-500..600) can fall near the AA line.
  **Applies to** all. **Check** contrast(muted-foreground-1, background) >= 4.5 for text under 18px. **Source** preline.co/docs/themes.html; themes/*.css

## 3. Numbers & scales

Default theme: background white; background-1 gray-50; background-2 gray-100; foreground gray-800; border gray-200; primary blue-600 (hover/focus/active blue-700); secondary gray-900 (hover gray-800); destructive red-500 (hover red-600); muted gray-50, muted-foreground gray-400/500/600.

| Theme | light neutrals | primary (light) | dark base | radius |
|---|---|---|---|---|
| harvest | khaki (bg-1 khaki-50, fg khaki-800, border khaki-200) | amber ramp @700 | stone-800/900, primary @300 | default |
| retro | neutral; every border neutral-800 | fuchsia @500, line neutral-800 | neutral-800/900 | 0 |
| ocean | (accent only in light) | cyan @600 | gray-800/900 | default |
| autumn | stone | amber @500 | neutral-900/950, primary @200 | default |
| moon | (accent only) | gray ramp @800; dark: white | n/a | default |
| bubblegum | preline-mauve | pink @600 | neutral-800/900 | default |
| cashmere | stone | preline-mauve @600 | stone-800/900, primary @400 | default |
| olive | avocado-soft | avocado @600 | avocado-soft-800/900, primary @400 | default |

Custom ramps (oklch): preline-khaki 50 98% .002 67.8 .. 950 20.1% .023 91.7; preline-mauve 500 55.9% .045 341; preline-avocado 500 57% .085 120; avocado-soft 500 62.5% .02 120.

Controls (computed from docs classes): button default py-3 px-4 text-sm rounded-lg = 46px; small py-2 px-3 = 38px; input py-2.5 sm:py-3 px-4 = 46px at both sizes (16px text mobile, 14px from sm). Disabled opacity 50%. Extra fonts: Domine (serif), Kode Mono.

## 4. Dos and Don'ts

- Do: theme via `data-theme="theme-harvest"` on `:root` with a matching dark block.
- Don't: assume default `bg-primary` hovers via opacity; Preline uses a darker step (700) token.

## 5. Exceptions & judgement calls

- [engine note] ~170 tokens is too many to hand-author per brand; for the engine use Preline's naming ideas (layer/surface, line-1..8, per-state) on a smaller set.
- The ocean/moon light themes only retint primary; their "cool"/"navy" personality is mostly in dark mode.

## 6. Figures worth keeping

- preline.co/docs/themes.html theme preview switcher (not captured).

## 7. Open questions

- Motion values in plugin CSS (overlay/dropdown transitions) not extracted.
- Default UI font is not set in theme.css; docs pages appear to use Inter (unverified).
