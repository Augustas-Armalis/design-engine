---
source: web:bottosson.github.io/posts/oklab + radix-ui.com/colors + material-color-utilities + stripe.com/blog/accessible-color-systems + linear.app/now/how-we-redesigned-the-linear-ui + tailwindcss.com/docs/colors + Myndex apca-w3 + W3C WCAG 2.2 (formulae re-implemented in _color-tools/clib.py); palettes are engine-authored data
chapter: Palette recipes (schema + 10 verified light/dark palettes + data-viz sets)
pages: n/a (generated data, date-stamped 2026-10-08)
topic_tags: [palette, oklch, tokens, light-mode, dark-mode, contrast, wcag, apca, archetypes, dataviz, brand-fit]
status: studied
---

# Palette recipes

Rules, evidence and the reasoning behind every number live in `knowledge/web/color-and-surfaces.md`. This file is **data**: a schema, 10 complete palettes with light and dark tokens in `oklch()` and hex, their contrast results, and two categorical data-viz sets. The same data is in machine-readable form in `knowledge/web/palettes.json`. Generator + checkers: `knowledge/web/_color-tools/` (`clib.py` colour maths and WCAG/APCA, `gen.py` palette builder, `pals.json` palette specs, `dv.py` data-viz search, `emit.py` writer).

Evidence tags: **[computed]** = produced by the scripts in this session; **[engine note]** = design judgement.

## 1. What "verified" means here

Every palette was built by a solver, not by eye, then re-measured from the *emitted hex values* (after sRGB gamut mapping), so the numbers below describe what ships. Both metrics are gated, because WCAG 2.x alone under-protects dark-mode text (a 4.5:1 grey on near-black is only APCA Lc 32; see `color-and-surfaces.md` section 3.3).

| Token pair | WCAG 2.2 | and APCA Lc (absolute value) |
|---|---|---|
| `ink-1` on page/card | set by lightness, verified >= 12 (measured >= 14.3) | verified >= 90 (measured >= 93) |
| `ink-2` on page/card/sunken | >= 7 | >= 75 |
| `ink-3` on page/card/sunken | >= 4.5 | >= 60 |
| `accent-text`, `accent2-text`, `success/warning/danger/info` on page, card, own `-soft` | >= 4.5 | >= 60 |
| `accent-on` on `accent` and `accent-hover` | >= 4.5 | >= 60 (`signal-orange`: >= 50, big/bold labels only) |
| `border-strong`, `ring` on page and card | >= 3 | >= 30 |
| `border-subtle`, `accent` as a bare fill | decorative, not gated | `accent` vs page reported only |

Minimum measured across all 10 palettes [computed]:

| pair | light min WCAG | light min Lc | dark min WCAG | dark min Lc |
|---|---|---|---|---|
| accent-on on accent | 5.10 | 50 | 4.51 | 56 |
| accent-on on accent-hover | 6.18 | 56 | 5.48 | 62 |
| accent-text on accent-soft | 4.50 | 65 | 7.89 | 60 |
| accent-text on surface-page | 4.93 | 68 | 8.99 | 62 |
| accent2-on on accent2 | 6.15 | 64 | 8.50 | 60 |
| accent2-text on accent2-soft | 4.59 | 66 | 7.84 | 60 |
| accent2-text on surface-page | 4.94 | 69 | 9.15 | 62 |
| border-strong on surface-card | 3.15 | 58 | 3.94 | 30 |
| border-strong on surface-page | 3.01 | 53 | 4.26 | 30 |
| danger on danger-soft | 4.55 | 66 | 7.87 | 60 |
| danger on surface-page | 4.93 | 69 | 8.96 | 61 |
| info on info-soft | 4.52 | 66 | 7.77 | 60 |
| info on surface-page | 4.91 | 69 | 9.02 | 61 |
| ink-1 on surface-card | 15.54 | 99 | 14.32 | 93 |
| ink-1 on surface-page | 14.43 | 94 | 15.46 | 94 |
| ink-2 on surface-sunken | 7.00 | 75 | 12.33 | 76 |
| ink-3 on surface-sunken | 4.50 | 64 | 9.36 | 60 |
| ink-inverse on surface-inverse | 14.21 | 97 | 14.50 | 91 |
| ring on surface-page | 3.02 | 54 | 4.40 | 31 |
| success on success-soft | 4.53 | 67 | 7.72 | 60 |
| success on surface-page | 4.89 | 69 | 9.04 | 61 |
| warning on surface-page | 4.93 | 69 | 9.00 | 61 |
| warning on warning-soft | 4.54 | 66 | 7.80 | 60 |

Reading the table: the rows sit at the gate by construction (solver stops at the lightest/least extreme value that passes). The deliberately failing item is `accent` as a bare fill on the page (1.23:1 for `chalk-chartreuse` light), which is why a fill is never used as text or as the only boundary.

## 2. JSON schema

```jsonc
{
  "schema": "design-engine/palette@1",
  "id": "mineral-cool",                     // kebab-case, unique
  "name": "Basalt & Glacier",
  "archetype": "mineral cool",              // one of the archetypes in section 4
  "mood": "calm, precise, cold-clean",
  "suits": "devtools, infra/security, ...", // product/brand types it fits
  "avoid": "food, kids, luxury warmth",
  "accent_hue": 205,                        // OKLCH H of accent family
  "light": { "<token>": { "oklch": "oklch(0.520 0.089 205)", "hex": "#007781" } },
  "dark":  { "<token>": { "oklch": "...", "hex": "..." } },
  "light_p3_accent": "oklch(0.520 0.112 205)",   // optional wide-gamut upgrade, null if not displayable beyond sRGB
  "dark_p3_accent": "oklch(0.760 0.112 205)",
  "light_contrast": [ { "fg": "ink-2", "bg": "surface-sunken", "wcag": 7.09, "apca": 78.0 } ],
  "dark_contrast":  [ ... ],
  "light_ramps": { "neutral": [ /*12 x {oklch,hex}*/ ], "accent": [ /*12*/ ] },
  "dark_ramps":  { "neutral": [ ], "accent": [ ] }
}
```

Token list (29 per palette, 33 when `accent2*` present):

| group | tokens | job |
|---|---|---|
| surface | `surface-page`, `-card`, `-sunken`, `-raised`, `-inverse` | page bg; cards/panels; wells, inputs, code; popovers and dialogs; inverted chips/toasts |
| ink | `ink-1`, `ink-2`, `ink-3`, `ink-inverse` | headings/body; secondary body; captions, placeholders, metadata; text on `surface-inverse` |
| border | `border-subtle`, `border-strong` | dividers (decorative); input/control edges (non-text contrast) |
| accent | `accent`, `accent-on`, `accent-hover`, `accent-soft`, `accent-text`, `ring` | fill (button, active tab); label on fill; hover fill; tinted bg (selected row, badge); accent as text/icon on surfaces; focus ring |
| accent2 (optional) | `accent2`, `accent2-on`, `accent2-soft`, `accent2-text` | secondary identity (tags, charts), never a CTA |
| state | `success`, `warning`, `danger`, `info` (+ `-soft`) | fg (text/icon, passes on page, card and its soft bg); tinted bg |

`*_ramps` are illustrative 12-step UI scales (Radix step roles: 1-2 bg, 3-5 component, 6-8 borders, 9-10 solid, 11-12 text) generated from the measured Radix ladders; the *tokens* above are the verified contract, ramps are for hover/selected/chart-tint needs and have not been contrast-gated.

CSS wiring (tokens as CSS variables, theme via `color-scheme` + attribute):

```css
:root {
  color-scheme: light dark;
  --surface-page: light-dark(#f1f8fd, #0b1116);   /* hex fallback values come from the table */
  --ink-1:        light-dark(#171b1e, #e8f0f5);
  --accent:       light-dark(#007781, #57c3cf);
  /* ...all tokens... */
}
@media (color-gamut: p3) {
  :root { --accent: light-dark(oklch(0.520 0.112 205), oklch(0.760 0.112 205)); }
}
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"]  { color-scheme: dark; }
```
`light-dark()` needs Chrome 123 / Firefox 120 / Safari 17.5 (see `implementation-craft.md`); for older engines emit two blocks under `prefers-color-scheme`.

## 3. Generator (how the numbers were produced) [computed]

1. **Inputs per palette and mode**: neutral hue `nh` and chroma `nc`; surface lightnesses `[page, card, sunken, raised, inverse]`; `ink-1` lightness; accent `{L, C, on: light|dark, lc?}` and accent hue; optional `accent2`; optional state hue overrides (e.g. botanical moves `success` to hue 185 so the accent is not the success colour).
2. **Surfaces** = `oklch(L nc nh)` gamut-mapped by chroma reduction at constant L and H.
3. **Solver** `solve(C, H, backgrounds, wcag_target, start, direction, apca_min)` scans L in 0.002 steps from the soft end toward the strong end and returns the first L whose *hex* passes every listed background on both metrics. Used for `ink-2`, `ink-3`, `border-strong`, `ring`, `accent-text`, `accent2-text`, and each state `fg` (against page, card, sunken and its own soft bg).
4. **Accent fill** starts at the requested L; if the label (light ink or dark ink, chosen by `on`) fails WCAG 4.5 or Lc 60, the fill L is moved away from the label colour until it passes. `accent-hover` = fill L -0.045 (light-label fills) or +0.04 (dark-label fills), re-verified.
5. **Soft tints**: light `L 0.94-0.955` at `C <= 0.045` (state softs 0.022-0.040); dark `L = page + 0.05..0.09`, `C 0.040`.
6. **Borders**: `border-subtle` = page L -0.075 (light) / +0.085 (dark), chroma x1.2; `border-strong` solved for 3:1 and Lc 30.
7. **P3 upgrade**: same L and H, chroma raised up to the P3 gamut limit, capped at 1.12x the requested chroma; emitted only when it exceeds the sRGB-mapped chroma by > 0.012.
8. **APCA**: APCA-W3 0.0.98G-4g constants (soft-clamp 0.022/1.414, normBG .56, normTXT .57, revTXT .62, revBG .65, scale 1.14, offset .027); anchors reproduced: black on white Lc 106.04, white on black -107.88. **WCAG**: standard relative luminance with the 0.04045 threshold, no rounding.

Defaults reused across palettes: state hues success 150, warning 82, danger 27, info 240 (overrides per palette); state fg chroma 0.13 (warning 0.12); on-label ink `oklch(0.19 ~0 nh)`, on-label light `oklch(0.985 ~0 nh)`.

## 4. Archetype guide: which palette for which brief

| palette id | archetype | neutral (light) | accent (light fill) | good for | avoid for | Read as |
|---|---|---|---|---|---|---|
| `mineral-cool` | mineral cool | H235 C.010 | `oklch(0.52 0.09 205)` teal-steel | devtools, infra, security, climate data, architecture studios | food, kids, warmth-led luxury | calm, exact |
| `botanical-muted` | botanical muted | H135 C.012 | `oklch(0.46 0.09 150)` moss | wellness, food/drink, sustainability, outdoor, supplements | urgency, nightlife, fintech | grounded, quiet |
| `warm-paper` | warm paper | H85 C.016 | `oklch(0.42 0.13 25)` oxblood | editorial, publishing, journals, law/consulting, culture | high-energy consumer, red-state dashboards | literate, tactile |
| `signal-orange` | high-chroma signal | H60 C.004 | `oklch(0.70 0.19 48)` safety orange (dark label) | consumer apps, logistics, sport, creator tools, launches | healthcare, legal, calm premium | loud, utilitarian |
| `nocturnal-low-chroma` | nocturnal low-chroma (dark-first) | dark H265 C.020 | `oklch(0.74 0.13 80)` amber | trading/finance terminals, audio/film tools, photo apps, observability, luxury | kids, healthcare, long-form daytime reading | hushed, instrument-panel |
| `mono-ultramarine` | monochrome + one accent | H90 C.002 | `oklch(0.50 0.24 265)` ultramarine | portfolios, studios, type-led software, docs | warm hospitality, playful brands | rational, poster-like |
| `mulberry-blush` | warm romantic muted | H15 C.011 | `oklch(0.45 0.14 352)` mulberry | beauty, fashion, venues, events, boutique hospitality | industrial, infra, dev tools | soft, intimate |
| `chalk-chartreuse` | high-chroma signal (acid) | H110 C.006 | `oklch(0.90 0.20 125)` chartreuse (dark label) | AI/dev tools wanting a non-blue identity, climate-tech, music, design tooling | conservative finance, healthcare | fresh, irreverent |
| `adobe-dual` | warm earth, two accents | H60 C.016 | `oklch(0.52 0.13 42)` terracotta + `oklch(0.48 0.07 112)` olive | restaurants, ceramics/home DTC, hospitality, craft food | cold technical products | sun-baked, handmade |
| `grape-jewel` | credible purple (flat jewel) | H310 C.010 | `oklch(0.42 0.15 305)` grape + ochre `oklch(0.78 0.13 85)` | creative software, arts, education with character, community, premium consumer | any brief whose only idea is violet-blue gradient | deep, a little theatrical |

Selection and diversity rules:
- Choose by **product type + desired mood**, then run a diversity check against recent outputs: accent hue distance >= 40 degrees **or** neutral hue distance >= 60 degrees from the last N palettes (the ledger holds N).
- Palettes are starting points. To brand-fit: change `accent_hue` and re-run `gen.py` (the solver re-derives text/hover/ring/soft/state tokens), keep neutrals tinted toward the new hue +-30 degrees.
- Dark-first brief -> start from `nocturnal-low-chroma`; light-first with an optional dark -> any other; both are fully specified.
- AI-tell escape routes [engine note]: need purple -> `grape-jewel` (flat, no gradient); need cream -> `warm-paper`/`adobe-dual` (non-coral accents); need dark/techy -> `nocturnal-low-chroma` or `chalk-chartreuse` dark (no glow, no cyan); need blue -> `mono-ultramarine` on pure neutrals (no violet drift, no gradient).

## 5. Palettes

All values are `oklch()` after sRGB gamut mapping and the hex of that colour; `-soft` tokens are tinted backgrounds, `-on` is a label colour. Table "key pair" cells read `WCAG / |Lc|`.

### 1. `mineral-cool` — Basalt & Glacier (mineral cool)

- **Mood** calm, precise, cold-clean. **Suits** devtools, infra/security, B2B SaaS, climate-data, architecture studios. **Avoid** food, kids, luxury warmth.
- **Accent hue** 205. Neutral hue/chroma: light 235/0.01, dark 240/0.014.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.520 0.112 205)`; dark `oklch(0.760 0.112 205)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.975 0.010 235)` | `#f1f8fd` | `oklch(0.175 0.014 240)` | `#0b1116` |
| surface-card | `oklch(0.995 0.003 235)` | `#fcfeff` | `oklch(0.210 0.014 240)` | `#13191e` |
| surface-sunken | `oklch(0.945 0.010 235)` | `#e7eef3` | `oklch(0.145 0.014 240)` | `#050b0f` |
| surface-raised | `oklch(0.990 0.006 235)` | `#f8fcff` | `oklch(0.245 0.014 240)` | `#1b2127` |
| surface-inverse | `oklch(0.250 0.006 235)` | `#1f2224` | `oklch(0.940 0.014 240)` | `#e3edf4` |
| ink-1 | `oklch(0.220 0.008 235)` | `#171b1e` | `oklch(0.950 0.011 240)` | `#e8f0f5` |
| ink-2 | `oklch(0.424 0.010 235)` | `#494f53` | `oklch(0.848 0.014 240)` | `#c5cfd5` |
| ink-3 | `oklch(0.528 0.010 235)` | `#666c70` | `oklch(0.768 0.014 240)` | `#acb5bc` |
| ink-inverse | `oklch(0.970 0.008 235)` | `#f0f6fa` | `oklch(0.220 0.011 240)` | `#161b1f` |
| border-subtle | `oklch(0.900 0.012 235)` | `#d7dfe5` | `oklch(0.260 0.017 240)` | `#1d252b` |
| border-strong | `oklch(0.648 0.013 235)` | `#879095` | `oklch(0.572 0.018 240)` | `#6f7a82` |
| accent | `oklch(0.520 0.089 205)` | `#007781` | `oklch(0.760 0.100 205)` | `#57c3cf` |
| accent-on | `oklch(0.985 0.005 235)` | `#f7fbfd` | `oklch(0.190 0.011 240)` | `#0f1518` |
| accent-hover | `oklch(0.475 0.081 205)` | `#006972` | `oklch(0.800 0.100 205)` | `#65d0dc` |
| accent-soft | `oklch(0.955 0.045 205)` | `#cefaff` | `oklch(0.235 0.040 205)` | `#002327` |
| accent-text | `oklch(0.520 0.089 205)` | `#007781` | `oklch(0.762 0.100 205)` | `#58c4d0` |
| ring | `oklch(0.520 0.089 205)` | `#007781` | `oklch(0.760 0.100 205)` | `#57c3cf` |
| success | `oklch(0.514 0.130 150)` | `#1a7b3c` | `oklch(0.756 0.130 150)` | `#6ec783` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.235 0.040 150)` | `#0f2314` |
| warning | `oklch(0.534 0.110 82)` | `#8c6500` | `oklch(0.772 0.120 82)` | `#dbad53` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.235 0.040 82)` | `#271c06` |
| danger | `oklch(0.546 0.130 27)` | `#af4d45` | `oklch(0.784 0.126 27)` | `#ff988d` |
| danger-soft | `oklch(0.955 0.022 27)` | `#ffebe8` | `oklch(0.235 0.040 27)` | `#2e1614` |
| info | `oklch(0.528 0.121 240)` | `#0072a9` | `oklch(0.764 0.130 240)` | `#5abdfc` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.235 0.040 240)` | `#0a202f` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 16.16 / 99 | 16.47 / 97 |
| ink-2 on surface-sunken | 7.09 / 78 | 12.5 / 76 |
| ink-3 on surface-sunken | 4.54 / 66 | 9.51 / 61 |
| accent-on on accent | 5.1 / 78 | 8.86 / 63 |
| accent-text on surface-page | 4.95 / 71 | 9.24 / 62 |
| accent-text on accent-soft | 4.74 / 68 | 8.05 / 60 |
| danger on surface-page | 4.93 / 71 | 9.16 / 62 |
| border-strong on surface-page | 3.03 / 55 | 4.32 / 31 |

Accent 12-step ramp (light): `#fcfdfd` `#f6fafb` `#eaf4f5` `#ddeef0` `#cce5e8` `#b8d9dd` `#9fcacf` `#79b5bc` `#007781` `#006f78` `#147780` `#003237`

Accent 12-step ramp (dark): `#0e1617` `#101b1c` `#102c2f` `#083a3f` `#11474d` `#1c555b` `#29666d` `#327b83` `#57c3cf` `#74ced9` `#7fbec5` `#cfe7ea`

### 2. `botanical-muted` — Fern & Bark (botanical muted)

- **Mood** organic, grounded, quiet. **Suits** wellness, food and drink, sustainability, outdoor, supplements, slow-living. **Avoid** fintech urgency, nightlife.
- **Accent hue** 150. Neutral hue/chroma: light 135/0.012, dark 150/0.014.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): dark `oklch(0.744 0.112 150)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.965 0.012 135)` | `#f0f5ed` | `oklch(0.170 0.014 150)` | `#0b110c` |
| surface-card | `oklch(0.985 0.012 135)` | `#f7fcf4` | `oklch(0.205 0.014 150)` | `#131914` |
| surface-sunken | `oklch(0.930 0.012 135)` | `#e4eae2` | `oklch(0.140 0.014 150)` | `#060b06` |
| surface-raised | `oklch(0.990 0.012 135)` | `#f8fef6` | `oklch(0.240 0.014 150)` | `#1b211c` |
| surface-inverse | `oklch(0.240 0.007 135)` | `#1e201d` | `oklch(0.940 0.014 150)` | `#e5eee6` |
| ink-1 | `oklch(0.230 0.010 135)` | `#1b1e19` | `oklch(0.945 0.011 150)` | `#e8efe9` |
| ink-2 | `oklch(0.414 0.012 135)` | `#494d46` | `oklch(0.848 0.014 150)` | `#c7d0c8` |
| ink-3 | `oklch(0.518 0.012 135)` | `#656a63` | `oklch(0.766 0.014 150)` | `#adb6ae` |
| ink-inverse | `oklch(0.970 0.010 135)` | `#f2f7f0` | `oklch(0.220 0.011 150)` | `#171c18` |
| border-subtle | `oklch(0.890 0.014 135)` | `#d7ddd4` | `oklch(0.255 0.017 150)` | `#1d251f` |
| border-strong | `oklch(0.640 0.016 135)` | `#888e85` | `oklch(0.570 0.018 150)` | `#707b72` |
| accent | `oklch(0.460 0.090 150)` | `#2e663c` | `oklch(0.744 0.100 150)` | `#7dbe8a` |
| accent-on | `oklch(0.985 0.006 135)` | `#f8fbf7` | `oklch(0.190 0.011 150)` | `#101511` |
| accent-hover | `oklch(0.415 0.090 150)` | `#205930` | `oklch(0.784 0.100 150)` | `#89cb97` |
| accent-soft | `oklch(0.945 0.045 150)` | `#d9f6dd` | `oklch(0.230 0.045 150)` | `#0b2311` |
| accent-text | `oklch(0.510 0.090 150)` | `#3c744a` | `oklch(0.760 0.100 150)` | `#82c38f` |
| ring | `oklch(0.460 0.090 150)` | `#2e663c` | `oklch(0.744 0.100 150)` | `#7dbe8a` |
| success | `oklch(0.510 0.090 185)` | `#00766d` | `oklch(0.752 0.130 185)` | `#15c9b9` |
| success-soft | `oklch(0.955 0.040 185)` | `#d3f9f4` | `oklch(0.230 0.040 185)` | `#00231f` |
| warning | `oklch(0.522 0.108 80)` | `#8a6100` | `oklch(0.772 0.120 80)` | `#ddac54` |
| warning-soft | `oklch(0.955 0.040 80)` | `#ffeed3` | `oklch(0.230 0.040 80)` | `#271b05` |
| danger | `oklch(0.534 0.130 28)` | `#ab4a40` | `oklch(0.782 0.127 28)` | `#ff978a` |
| danger-soft | `oklch(0.955 0.022 28)` | `#ffebe8` | `oklch(0.230 0.040 28)` | `#2d1512` |
| info | `oklch(0.518 0.130 245)` | `#016dad` | `oklch(0.766 0.128 245)` | `#66bbff` |
| info-soft | `oklch(0.955 0.023 245)` | `#e4f2ff` | `oklch(0.230 0.040 245)` | `#0b1f2e` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 15.24 / 97 | 16.33 / 96 |
| ink-2 on surface-sunken | 7.05 / 76 | 12.55 / 76 |
| ink-3 on surface-sunken | 4.52 / 64 | 9.52 / 61 |
| accent-on on accent | 6.53 / 85 | 8.44 / 60 |
| accent-text on surface-page | 5.01 / 71 | 9.23 / 62 |
| accent-text on accent-soft | 4.8 / 68 | 8.04 / 60 |
| danger on surface-page | 5.02 / 70 | 9.13 / 61 |
| border-strong on surface-page | 3.04 / 54 | 4.33 / 31 |

Accent 12-step ramp (light): `#fcfdfc` `#f7faf8` `#eef4ee` `#e3eee5` `#d5e4d7` `#c4d8c7` `#afc9b3` `#90b396` `#2e663c` `#295e37` `#45724f` `#182f1d`

Accent 12-step ramp (dark): `#111612` `#141b15` `#1b2c1e` `#1f3a25` `#29472f` `#34553b` `#416649` `#4f7b58` `#7dbe8a` `#90c99b` `#94bd9b` `#d6e7d8`

### 3. `warm-paper` — Ink & Oxblood (warm paper)

- **Mood** considered, literate, tactile. **Suits** editorial, publishing, bookshops, journals, law and consulting, cultural institutions. **Avoid** high-energy consumer, dashboards with many red states.
- **Accent hue** 25. Neutral hue/chroma: light 85/0.016, dark 70/0.012.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.420 0.146 25)`; dark `oklch(0.768 0.146 25)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.965 0.016 85)` | `#f8f3e8` | `oklch(0.190 0.012 70)` | `#17130e` |
| surface-card | `oklch(0.985 0.016 85)` | `#fffaee` | `oklch(0.225 0.012 70)` | `#1f1b16` |
| surface-sunken | `oklch(0.935 0.016 85)` | `#eee9de` | `oklch(0.160 0.012 70)` | `#110c08` |
| surface-raised | `oklch(0.990 0.010 85)` | `#fffbf4` | `oklch(0.260 0.012 70)` | `#28231e` |
| surface-inverse | `oklch(0.250 0.010 85)` | `#24211c` | `oklch(0.940 0.012 70)` | `#f1eae3` |
| ink-1 | `oklch(0.220 0.013 85)` | `#1d1a14` | `oklch(0.940 0.010 70)` | `#efeae4` |
| ink-2 | `oklch(0.418 0.016 85)` | `#514c43` | `oklch(0.850 0.012 70)` | `#d3cdc6` |
| ink-3 | `oklch(0.522 0.016 85)` | `#6e695f` | `oklch(0.770 0.012 70)` | `#b9b3ac` |
| ink-inverse | `oklch(0.965 0.013 85)` | `#f7f3ea` | `oklch(0.220 0.010 70)` | `#1e1a16` |
| border-subtle | `oklch(0.890 0.019 85)` | `#e1dacd` | `oklch(0.275 0.014 70)` | `#2c2720` |
| border-strong | `oklch(0.642 0.021 85)` | `#938c7f` | `oklch(0.578 0.016 70)` | `#807870` |
| accent | `oklch(0.420 0.130 25)` | `#862726` | `oklch(0.768 0.130 25)` | `#fc9189` |
| accent-on | `oklch(0.985 0.008 85)` | `#fdfaf4` | `oklch(0.190 0.010 70)` | `#17130f` |
| accent-hover | `oklch(0.375 0.130 25)` | `#77171a` | `oklch(0.808 0.109 25)` | `#ffa49d` |
| accent-soft | `oklch(0.945 0.027 25)` | `#ffe6e4` | `oklch(0.250 0.045 25)` | `#341816` |
| accent-text | `oklch(0.536 0.130 25)` | `#ac4a46` | `oklch(0.786 0.124 25)` | `#ff9991` |
| ring | `oklch(0.420 0.130 25)` | `#862726` | `oklch(0.768 0.130 25)` | `#fc9189` |
| success | `oklch(0.508 0.130 150)` | `#17793a` | `oklch(0.760 0.130 150)` | `#6fc884` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.250 0.040 150)` | `#132717` |
| warning | `oklch(0.526 0.111 75)` | `#8f6000` | `oklch(0.776 0.120 75)` | `#e3ab57` |
| warning-soft | `oklch(0.955 0.036 75)` | `#ffedd6` | `oklch(0.250 0.040 75)` | `#2d1f0a` |
| danger | `oklch(0.538 0.130 10)` | `#ab495d` | `oklch(0.788 0.126 10)` | `#ff96a7` |
| danger-soft | `oklch(0.955 0.023 10)` | `#ffeaed` | `oklch(0.250 0.040 10)` | `#32191d` |
| info | `oklch(0.518 0.119 240)` | `#006fa5` | `oklch(0.768 0.130 240)` | `#5cbefe` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.250 0.040 240)` | `#0e2433` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 15.68 / 97 | 15.46 / 94 |
| ink-2 on surface-sunken | 7.04 / 76 | 12.33 / 76 |
| ink-3 on surface-sunken | 4.51 / 64 | 9.36 / 61 |
| accent-on on accent | 8.64 / 91 | 8.4 / 60 |
| accent-text on surface-page | 4.97 / 70 | 8.99 / 62 |
| accent-text on accent-soft | 4.63 / 65 | 7.93 / 60 |
| danger on surface-page | 4.94 / 70 | 8.96 / 62 |
| border-strong on surface-page | 3.01 / 54 | 4.26 / 31 |

Accent 12-step ramp (light): `#fefcfc` `#fdf8f7` `#fbefed` `#fae5e3` `#f6d7d4` `#efc7c3` `#e5b3ae` `#d8958f` `#862726` `#7b2221` `#a3524d` `#4b211e`

Accent 12-step ramp (dark): `#1c1211` `#221514` `#3a1e1c` `#4f2421` `#5f2f2b` `#703a37` `#844844` `#9f5853` `#fc9189` `#ffa49d` `#eba49e` `#ffe2df`

### 4. `signal-orange` — Safety Orange (high-chroma signal)

- **Mood** loud, kinetic, utilitarian. **Suits** consumer apps, logistics, sport, creator tools, launches, anything needing one unmissable action. **Avoid** healthcare, legal, calm/premium positioning.
- **Accent hue** 48. Neutral hue/chroma: light 60/0.004, dark 60/0.004.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.706 0.213 48)`; dark `oklch(0.740 0.202 48)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.985 0.004 60)` | `#fcf9f7` | `oklch(0.160 0.004 60)` | `#0f0d0c` |
| surface-card | `oklch(1.000 0.000 60)` | `#ffffff` | `oklch(0.200 0.004 60)` | `#171614` |
| surface-sunken | `oklch(0.955 0.004 60)` | `#f2efed` | `oklch(0.130 0.004 60)` | `#080706` |
| surface-raised | `oklch(1.000 0.000 60)` | `#ffffff` | `oklch(0.235 0.004 60)` | `#201e1c` |
| surface-inverse | `oklch(0.220 0.002 60)` | `#1b1a19` | `oklch(0.950 0.004 60)` | `#f0eeec` |
| ink-1 | `oklch(0.200 0.003 60)` | `#171615` | `oklch(0.960 0.003 60)` | `#f3f1f0` |
| ink-2 | `oklch(0.432 0.004 60)` | `#52504e` | `oklch(0.848 0.004 60)` | `#cfccca` |
| ink-3 | `oklch(0.536 0.004 60)` | `#6f6d6b` | `oklch(0.766 0.004 60)` | `#b5b2b0` |
| ink-inverse | `oklch(0.970 0.003 60)` | `#f7f5f3` | `oklch(0.200 0.003 60)` | `#171615` |
| border-subtle | `oklch(0.910 0.005 60)` | `#e4e0de` | `oklch(0.245 0.005 60)` | `#22201e` |
| border-strong | `oklch(0.656 0.005 60)` | `#93908e` | `oklch(0.574 0.005 60)` | `#7b7875` |
| accent | `oklch(0.706 0.190 48)` | `#fb7209` | `oklch(0.740 0.172 48)` | `#ff843b` |
| accent-on | `oklch(0.190 0.003 60)` | `#151312` | `oklch(0.190 0.003 60)` | `#151312` |
| accent-hover | `oklch(0.746 0.167 48)` | `#ff8742` | `oklch(0.780 0.140 48)` | `#ff9a64` |
| accent-soft | `oklch(0.955 0.025 48)` | `#ffece2` | `oklch(0.240 0.045 48)` | `#30180b` |
| accent-text | `oklch(0.550 0.150 48)` | `#b44f00` | `oklch(0.782 0.138 48)` | `#ff9b65` |
| ring | `oklch(0.670 0.160 48)` | `#e1712d` | `oklch(0.740 0.172 48)` | `#ff843b` |
| success | `oklch(0.522 0.130 150)` | `#1e7d3e` | `oklch(0.756 0.130 150)` | `#6ec783` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.220 0.040 150)` | `#0b2010` |
| warning | `oklch(0.538 0.111 82)` | `#8e6600` | `oklch(0.772 0.120 82)` | `#dbad53` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.220 0.040 82)` | `#241803` |
| danger | `oklch(0.548 0.130 27)` | `#b04e46` | `oklch(0.782 0.127 27)` | `#ff978b` |
| danger-soft | `oklch(0.955 0.022 27)` | `#ffebe8` | `oklch(0.220 0.040 27)` | `#2b1310` |
| info | `oklch(0.530 0.121 240)` | `#0073aa` | `oklch(0.762 0.130 240)` | `#59bcfc` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.220 0.040 240)` | `#061d2b` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 17.24 / 102 | 17.22 / 99 |
| ink-2 on surface-sunken | 7.01 / 79 | 12.6 / 76 |
| ink-3 on surface-sunken | 4.5 / 66 | 9.55 / 61 |
| accent-on on accent | 6.63 / 50 | 7.6 / 56 |
| accent-text on surface-page | 4.94 / 72 | 9.35 / 62 |
| accent-text on accent-soft | 4.52 / 66 | 8.03 / 60 |
| danger on surface-page | 4.98 / 72 | 9.28 / 61 |
| border-strong on surface-page | 3.03 / 56 | 4.42 / 31 |

Accent 12-step ramp (light): `#fffcfb` `#fff7f4` `#feeee7` `#ffe4d7` `#fdd6c3` `#f8c6ac` `#f0b090` `#e69164` `#fb7209` `#ed6d11` `#b44f00` `#552100`

Accent 12-step ramp (dark): `#1d110b` `#24150d` `#3f1d09` `#552100` `#672b01` `#78360c` `#8e4418` `#aa531e` `#ff843b` `#ff9a64` `#f5a074` `#ffe2d3`

### 5. `nocturnal-low-chroma` — Ledger Night (nocturnal low-chroma (dark-first))

- **Mood** hushed, instrument-panel, expensive. **Suits** trading/finance terminals, audio and film tools, photo apps, luxury, observability. **Avoid** children, healthcare, daytime-reading content.
- **Accent hue** 80. Neutral hue/chroma: light 265/0.01, dark 265/0.02.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.760 0.146 80)`; dark `oklch(0.800 0.134 80)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.965 0.010 265)` | `#f0f3fa` | `oklch(0.155 0.020 265)` | `#080c15` |
| surface-card | `oklch(0.990 0.005 265)` | `#fafcff` | `oklch(0.190 0.020 265)` | `#0f141d` |
| surface-sunken | `oklch(0.930 0.010 265)` | `#e4e8ef` | `oklch(0.125 0.020 265)` | `#04060e` |
| surface-raised | `oklch(0.995 0.002 265)` | `#fdfdff` | `oklch(0.225 0.020 265)` | `#171c25` |
| surface-inverse | `oklch(0.220 0.006 265)` | `#191b1d` | `oklch(0.930 0.020 265)` | `#e1e8f6` |
| ink-1 | `oklch(0.200 0.008 265)` | `#14161a` | `oklch(0.940 0.016 265)` | `#e6ebf6` |
| ink-2 | `oklch(0.416 0.010 265)` | `#494c52` | `oklch(0.846 0.020 265)` | `#c6cdda` |
| ink-3 | `oklch(0.518 0.010 265)` | `#65686e` | `oklch(0.766 0.020 265)` | `#adb3c0` |
| ink-inverse | `oklch(0.960 0.008 265)` | `#eff2f7` | `oklch(0.200 0.016 265)` | `#12161d` |
| border-subtle | `oklch(0.890 0.012 265)` | `#d7dbe3` | `oklch(0.240 0.024 265)` | `#1a1f2b` |
| border-strong | `oklch(0.640 0.013 265)` | `#888c94` | `oklch(0.572 0.026 265)` | `#707888` |
| accent | `oklch(0.760 0.130 80)` | `#dca744` | `oklch(0.800 0.120 80)` | `#e6b55d` |
| accent-on | `oklch(0.190 0.008 265)` | `#121417` | `oklch(0.190 0.016 265)` | `#10141b` |
| accent-hover | `oklch(0.800 0.130 80)` | `#e9b452` | `oklch(0.840 0.120 80)` | `#f4c26a` |
| accent-soft | `oklch(0.945 0.045 80)` | `#fdeacc` | `oklch(0.225 0.045 80)` | `#271901` |
| accent-text | `oklch(0.522 0.108 80)` | `#8a6100` | `oklch(0.772 0.120 80)` | `#ddac54` |
| ring | `oklch(0.646 0.130 80)` | `#b78311` | `oklch(0.800 0.120 80)` | `#e6b55d` |
| success | `oklch(0.504 0.130 150)` | `#157839` | `oklch(0.752 0.130 150)` | `#6dc682` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.215 0.040 150)` | `#0a1f0f` |
| warning | `oklch(0.522 0.108 82)` | `#886200` | `oklch(0.768 0.120 82)` | `#daac52` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.215 0.040 82)` | `#231702` |
| danger | `oklch(0.534 0.130 27)` | `#ab4a42` | `oklch(0.780 0.129 27)` | `#ff968a` |
| danger-soft | `oklch(0.955 0.022 27)` | `#ffebe8` | `oklch(0.215 0.040 27)` | `#29120f` |
| info | `oklch(0.514 0.118 240)` | `#006ea3` | `oklch(0.762 0.130 240)` | `#59bcfc` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.215 0.040 240)` | `#051c2a` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 16.31 / 98 | 16.37 / 94 |
| ink-2 on surface-sunken | 7.01 / 76 | 12.67 / 76 |
| ink-3 on surface-sunken | 4.55 / 64 | 9.62 / 61 |
| accent-on on accent | 8.48 / 60 | 9.78 / 67 |
| accent-text on surface-page | 4.99 / 70 | 9.41 / 62 |
| accent-text on accent-soft | 4.7 / 66 | 8.24 / 60 |
| danger on surface-page | 4.99 / 70 | 9.3 / 61 |
| border-strong on surface-page | 3.04 / 54 | 4.41 / 31 |

Accent 12-step ramp (light): `#fdfdfb` `#fbf9f5` `#f7f1e8` `#f3e9d9` `#ecdec7` `#e2cfb1` `#d6bd95` `#c4a46d` `#dca744` `#d19f43` `#8a6100` `#3b2800`

Accent 12-step ramp (dark): `#18140d` `#1e180f` `#32250e` `#432f07` `#513b0f` `#60471a` `#725725` `#89692e` `#e6b55d` `#efc379` `#cfb07b` `#f1e3ce`

### 6. `mono-ultramarine` — Swiss Ultramarine (monochrome + one accent)

- **Mood** rational, exact, poster-like. **Suits** portfolios, studios, software with strong typography, documentation, fashion-adjacent product. **Avoid** playful or warm hospitality.
- **Accent hue** 265. Neutral hue/chroma: light 90/0.002, dark 90/0.002.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.500 0.269 265)`; dark `oklch(0.570 0.246 265)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.985 0.002 90)` | `#fafaf9` | `oklch(0.145 0.002 90)` | `#0a0a09` |
| surface-card | `oklch(1.000 0.000 90)` | `#ffffff` | `oklch(0.180 0.002 90)` | `#121211` |
| surface-sunken | `oklch(0.960 0.002 90)` | `#f2f2f0` | `oklch(0.120 0.002 90)` | `#060605` |
| surface-raised | `oklch(1.000 0.000 90)` | `#ffffff` | `oklch(0.215 0.002 90)` | `#1a1918` |
| surface-inverse | `oklch(0.200 0.001 90)` | `#161615` | `oklch(0.960 0.002 90)` | `#f2f2f0` |
| ink-1 | `oklch(0.180 0.002 90)` | `#121211` | `oklch(0.960 0.002 90)` | `#f2f2f0` |
| ink-2 | `oklch(0.436 0.002 90)` | `#525150` | `oklch(0.844 0.002 90)` | `#ccccca` |
| ink-3 | `oklch(0.538 0.002 90)` | `#6e6e6d` | `oklch(0.762 0.002 90)` | `#b2b2b0` |
| ink-inverse | `oklch(0.980 0.002 90)` | `#f9f8f7` | `oklch(0.180 0.002 90)` | `#121211` |
| border-subtle | `oklch(0.910 0.002 90)` | `#e2e1df` | `oklch(0.230 0.002 90)` | `#1d1d1c` |
| border-strong | `oklch(0.658 0.003 90)` | `#929190` | `oklch(0.570 0.003 90)` | `#787776` |
| accent | `oklch(0.500 0.240 265)` | `#1d4ce9` | `oklch(0.570 0.220 265)` | `#3568f6` |
| accent-on | `oklch(0.985 0.001 90)` | `#fafaf9` | `oklch(0.985 0.001 90)` | `#fafaf9` |
| accent-hover | `oklch(0.455 0.240 265)` | `#123bd9` | `oklch(0.525 0.220 265)` | `#2959e6` |
| accent-soft | `oklch(0.955 0.021 265)` | `#e9f0ff` | `oklch(0.235 0.045 265)` | `#141d33` |
| accent-text | `oklch(0.542 0.160 265)` | `#4068cb` | `oklch(0.774 0.114 265)` | `#92b4ff` |
| ring | `oklch(0.500 0.240 265)` | `#1d4ce9` | `oklch(0.574 0.160 265)` | `#4972d6` |
| success | `oklch(0.524 0.130 150)` | `#1f7e3f` | `oklch(0.752 0.130 150)` | `#6dc682` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.205 0.040 150)` | `#081c0d` |
| warning | `oklch(0.538 0.111 82)` | `#8e6600` | `oklch(0.768 0.120 82)` | `#daac52` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.205 0.040 82)` | `#201501` |
| danger | `oklch(0.548 0.130 27)` | `#b04e46` | `oklch(0.780 0.129 27)` | `#ff968a` |
| danger-soft | `oklch(0.955 0.022 27)` | `#ffebe8` | `oklch(0.205 0.040 27)` | `#270f0d` |
| info | `oklch(0.534 0.122 240)` | `#0074ac` | `oklch(0.762 0.130 240)` | `#59bcfc` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.205 0.040 240)` | `#041927` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 17.95 / 102 | 17.67 / 99 |
| ink-2 on surface-sunken | 7.07 / 80 | 12.6 / 76 |
| ink-3 on surface-sunken | 4.55 / 67 | 9.54 / 60 |
| accent-on on accent | 6.16 / 83 | 4.51 / 74 |
| accent-text on surface-page | 4.95 / 72 | 9.62 / 62 |
| accent-text on accent-soft | 4.52 / 66 | 8.13 / 60 |
| danger on surface-page | 5.0 / 72 | 9.41 / 61 |
| border-strong on surface-page | 3.01 / 56 | 4.43 / 30 |

Accent 12-step ramp (light): `#fcfdff` `#f6f9ff` `#ecf2ff` `#e1ebff` `#d1e0ff` `#bdd2ff` `#a3c0ff` `#7ea6ff` `#1d4ce9` `#1a46d8` `#3362e2` `#122a6c`

Accent 12-step ramp (dark): `#0e1422` `#111929` `#15254c` `#162d6a` `#1f397e` `#294691` `#3456a9` `#4068ca` `#3568f6` `#4979f5` `#92b4ff` `#dae6ff`

### 7. `mulberry-blush` — Mulberry & Blush (warm romantic muted)

- **Mood** soft, intimate, editorial. **Suits** beauty, fashion, cultural venues, weddings/events, boutique hospitality. **Avoid** industrial, infra, developer tools.
- **Accent hue** 352. Neutral hue/chroma: light 15/0.011, dark 10/0.014.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.450 0.157 352)`; dark `oklch(0.770 0.134 352)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.972 0.011 15)` | `#fdf3f3` | `oklch(0.180 0.014 10)` | `#170f10` |
| surface-card | `oklch(0.992 0.004 15)` | `#fffbfb` | `oklch(0.215 0.014 10)` | `#1f1718` |
| surface-sunken | `oklch(0.940 0.011 15)` | `#f2e8e9` | `oklch(0.150 0.014 10)` | `#10090a` |
| surface-raised | `oklch(0.995 0.002 15)` | `#fffdfd` | `oklch(0.250 0.014 10)` | `#281f20` |
| surface-inverse | `oklch(0.250 0.007 15)` | `#252021` | `oklch(0.940 0.014 10)` | `#f4e8e9` |
| ink-1 | `oklch(0.230 0.009 15)` | `#211b1c` | `oklch(0.945 0.011 10)` | `#f4eaeb` |
| ink-2 | `oklch(0.422 0.011 15)` | `#534b4c` | `oklch(0.852 0.014 10)` | `#d7cbcc` |
| ink-3 | `oklch(0.526 0.011 15)` | `#716868` | `oklch(0.770 0.014 10)` | `#bdb1b2` |
| ink-inverse | `oklch(0.970 0.009 15)` | `#fbf3f3` | `oklch(0.220 0.011 10)` | `#1f1919` |
| border-subtle | `oklch(0.897 0.013 15)` | `#e6dada` | `oklch(0.265 0.017 10)` | `#2d2223` |
| border-strong | `oklch(0.648 0.014 15)` | `#978b8c` | `oklch(0.578 0.018 10)` | `#847677` |
| accent | `oklch(0.450 0.140 352)` | `#8b2b5d` | `oklch(0.770 0.120 352)` | `#ef93bc` |
| accent-on | `oklch(0.985 0.005 15)` | `#fef9f9` | `oklch(0.190 0.011 10)` | `#181213` |
| accent-hover | `oklch(0.405 0.140 352)` | `#7d1c51` | `oklch(0.810 0.120 352)` | `#fda0c9` |
| accent-soft | `oklch(0.950 0.029 352)` | `#ffe7f0` | `oklch(0.245 0.045 352)` | `#311723` |
| accent-text | `oklch(0.542 0.140 352)` | `#aa4778` | `oklch(0.788 0.120 352)` | `#f599c2` |
| ring | `oklch(0.450 0.140 352)` | `#8b2b5d` | `oklch(0.770 0.120 352)` | `#ef93bc` |
| success | `oklch(0.510 0.130 150)` | `#187a3b` | `oklch(0.760 0.130 150)` | `#6fc884` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.240 0.040 150)` | `#102515` |
| warning | `oklch(0.526 0.108 82)` | `#8a6300` | `oklch(0.774 0.120 82)` | `#dcae54` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.240 0.040 82)` | `#291d07` |
| danger | `oklch(0.540 0.130 30)` | `#ad4c3f` | `oklch(0.784 0.126 30)` | `#ff9988` |
| danger-soft | `oklch(0.955 0.022 30)` | `#ffebe7` | `oklch(0.240 0.040 30)` | `#301814` |
| info | `oklch(0.520 0.119 240)` | `#0070a6` | `oklch(0.768 0.130 240)` | `#5cbefe` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.240 0.040 240)` | `#0b2230` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 15.58 / 98 | 16.02 / 95 |
| ink-2 on surface-sunken | 7.06 / 77 | 12.49 / 76 |
| ink-3 on surface-sunken | 4.51 / 65 | 9.47 / 61 |
| accent-on on accent | 7.74 / 89 | 8.43 / 60 |
| accent-text on surface-page | 4.97 / 70 | 9.19 / 62 |
| accent-text on accent-soft | 4.62 / 66 | 8.0 / 60 |
| danger on surface-page | 4.97 / 70 | 9.14 / 62 |
| border-strong on surface-page | 3.02 / 54 | 4.35 / 31 |

Accent 12-step ramp (light): `#fefcfd` `#fdf7f9` `#faeef3` `#f9e4ec` `#f4d6e2` `#edc5d5` `#e3b0c5` `#d492af` `#8b2b5d` `#802655` `#a15076` `#4b2034`

Accent 12-step ramp (dark): `#1a1215` `#20151a` `#371f29` `#4a2536` `#593043` `#693b50` `#7d4960` `#965974` `#ef93bc` `#f6a5c8` `#e2a6bf` `#fde2ed`

### 8. `chalk-chartreuse` — Chalk & Chartreuse (high-chroma signal (acid on neutral))

- **Mood** fresh, technical, slightly irreverent. **Suits** AI/dev tools wanting non-blue identity, climate-tech, music, design tooling, hackathon/community brands. **Avoid** conservative finance, healthcare.
- **Accent hue** 125. Neutral hue/chroma: light 110/0.006, dark 120/0.008.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.900 0.224 125)`; dark `oklch(0.880 0.213 125)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.985 0.006 110)` | `#fafaf6` | `oklch(0.165 0.008 120)` | `#0e0f0b` |
| surface-card | `oklch(1.000 0.000 110)` | `#ffffff` | `oklch(0.200 0.008 120)` | `#151713` |
| surface-sunken | `oklch(0.955 0.006 110)` | `#f0f0ec` | `oklch(0.135 0.008 120)` | `#080906` |
| surface-raised | `oklch(1.000 0.000 110)` | `#ffffff` | `oklch(0.235 0.008 120)` | `#1d1f1a` |
| surface-inverse | `oklch(0.220 0.004 110)` | `#1b1b19` | `oklch(0.950 0.008 120)` | `#eeefe9` |
| ink-1 | `oklch(0.200 0.005 110)` | `#161614` | `oklch(0.950 0.006 120)` | `#eeefea` |
| ink-2 | `oklch(0.432 0.006 110)` | `#50514d` | `oklch(0.848 0.008 120)` | `#cccec8` |
| ink-3 | `oklch(0.534 0.006 110)` | `#6d6d69` | `oklch(0.766 0.008 120)` | `#b2b4ae` |
| ink-inverse | `oklch(0.970 0.005 110)` | `#f5f5f2` | `oklch(0.200 0.006 120)` | `#161613` |
| border-subtle | `oklch(0.910 0.007 110)` | `#e1e2dc` | `oklch(0.250 0.010 120)` | `#21221d` |
| border-strong | `oklch(0.656 0.008 110)` | `#91918c` | `oklch(0.572 0.010 120)` | `#777972` |
| accent | `oklch(0.900 0.200 125)` | `#c0f447` | `oklch(0.880 0.190 125)` | `#bbec4c` |
| accent-on | `oklch(0.190 0.005 110)` | `#141412` | `oklch(0.190 0.006 120)` | `#131411` |
| accent-hover | `oklch(0.940 0.173 125)` | `#d1ff74` | `oklch(0.920 0.190 125)` | `#c8fa5c` |
| accent-soft | `oklch(0.950 0.045 125)` | `#e7f4d4` | `oklch(0.235 0.045 125)` | `#192208` |
| accent-text | `oklch(0.526 0.132 125)` | `#597700` | `oklch(0.760 0.160 125)` | `#9ac242` |
| ring | `oklch(0.644 0.160 125)` | `#779d07` | `oklch(0.880 0.190 125)` | `#bbec4c` |
| success | `oklch(0.522 0.130 150)` | `#1e7d3e` | `oklch(0.756 0.130 150)` | `#6ec783` |
| success-soft | `oklch(0.955 0.040 150)` | `#def8e2` | `oklch(0.225 0.040 150)` | `#0d2111` |
| warning | `oklch(0.538 0.111 82)` | `#8e6600` | `oklch(0.772 0.120 82)` | `#dbad53` |
| warning-soft | `oklch(0.955 0.040 82)` | `#feeed3` | `oklch(0.225 0.040 82)` | `#251a04` |
| danger | `oklch(0.548 0.130 27)` | `#b04e46` | `oklch(0.782 0.127 27)` | `#ff978b` |
| danger-soft | `oklch(0.955 0.022 27)` | `#ffebe8` | `oklch(0.225 0.040 27)` | `#2c1411` |
| info | `oklch(0.530 0.121 240)` | `#0073aa` | `oklch(0.764 0.130 240)` | `#5abdfc` |
| info-soft | `oklch(0.955 0.024 240)` | `#e2f3ff` | `oklch(0.225 0.040 240)` | `#071e2c` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 17.32 / 102 | 16.64 / 97 |
| ink-2 on surface-sunken | 7.0 / 79 | 12.58 / 76 |
| ink-3 on surface-sunken | 4.55 / 67 | 9.54 / 61 |
| accent-on on accent | 14.29 / 88 | 13.4 / 84 |
| accent-text on surface-page | 4.94 / 72 | 9.31 / 62 |
| accent-text on accent-soft | 4.5 / 66 | 7.98 / 60 |
| danger on surface-page | 4.99 / 72 | 9.21 / 61 |
| border-strong on surface-page | 3.03 / 56 | 4.36 / 31 |

Accent 12-step ramp (light): `#fcfdfb` `#f7faf4` `#eef5e6` `#e5efd5` `#d7e6c1` `#c7dba8` `#b3cc8a` `#97b75a` `#c0f447` `#b9ea4a` `#597700` `#243300`

Accent 12-step ramp (dark): `#12170a` `#161b0c` `#202d03` `#293900` `#344700` `#3f5500` `#4d6700` `#5d7c00` `#bbec4c` `#cbf874` `#9fbf63` `#d9e8c4`

### 9. `adobe-dual` — Adobe & Olive (warm earth with two accents)

- **Mood** sun-baked, handmade, hospitable. **Suits** restaurants, ceramics/home goods DTC, hospitality, craft food, architecture-for-homes. **Avoid** cold technical products.
- **Accent hue** 42. Neutral hue/chroma: light 60/0.016, dark 50/0.014.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.520 0.146 42)`; dark `oklch(0.766 0.146 42)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.955 0.016 60)` | `#f9eee6` | `oklch(0.185 0.014 50)` | `#18110d` |
| surface-card | `oklch(0.980 0.012 60)` | `#fff7f0` | `oklch(0.220 0.014 50)` | `#201915` |
| surface-sunken | `oklch(0.925 0.016 60)` | `#efe4dc` | `oklch(0.155 0.014 50)` | `#110b07` |
| surface-raised | `oklch(0.985 0.009 60)` | `#fff9f4` | `oklch(0.255 0.014 50)` | `#29211d` |
| surface-inverse | `oklch(0.250 0.010 60)` | `#25211d` | `oklch(0.940 0.014 50)` | `#f3e9e3` |
| ink-1 | `oklch(0.240 0.013 60)` | `#241e19` | `oklch(0.940 0.011 50)` | `#f2e9e5` |
| ink-2 | `oklch(0.412 0.016 60)` | `#524942` | `oklch(0.852 0.014 50)` | `#d6ccc6` |
| ink-3 | `oklch(0.514 0.016 60)` | `#6e655e` | `oklch(0.770 0.014 50)` | `#bcb2ac` |
| ink-inverse | `oklch(0.960 0.013 60)` | `#f9f0e9` | `oklch(0.220 0.011 50)` | `#1f1916` |
| border-subtle | `oklch(0.880 0.019 60)` | `#e1d5cb` | `oklch(0.270 0.017 50)` | `#2d241f` |
| border-strong | `oklch(0.636 0.021 60)` | `#95887f` | `oklch(0.578 0.018 50)` | `#837770` |
| accent | `oklch(0.520 0.130 42)` | `#a54a24` | `oklch(0.766 0.130 42)` | `#f8966f` |
| accent-on | `oklch(0.985 0.008 60)` | `#fef9f5` | `oklch(0.190 0.011 50)` | `#18120f` |
| accent-hover | `oklch(0.475 0.130 42)` | `#963d14` | `oklch(0.806 0.116 42)` | `#ffa684` |
| accent-soft | `oklch(0.940 0.032 42)` | `#ffe5db` | `oklch(0.250 0.045 42)` | `#341a10` |
| accent-text | `oklch(0.528 0.130 42)` | `#a74d26` | `oklch(0.786 0.130 42)` | `#ff9c75` |
| ring | `oklch(0.520 0.130 42)` | `#a54a24` | `oklch(0.766 0.130 42)` | `#f8966f` |
| accent2 | `oklch(0.480 0.070 112)` | `#5e6231` | `oklch(0.752 0.080 112)` | `#afb478` |
| accent2-on | `oklch(0.985 0.008 60)` | `#fef9f5` | `oklch(0.190 0.011 50)` | `#18120f` |
| accent2-soft | `oklch(0.940 0.040 112)` | `#ebeed0` | `oklch(0.250 0.040 112)` | `#22230b` |
| accent2-text | `oklch(0.510 0.070 112)` | `#676a39` | `oklch(0.770 0.080 112)` | `#b5ba7e` |
| success | `oklch(0.500 0.124 155)` | `#007742` | `oklch(0.758 0.130 155)` | `#64c98c` |
| success-soft | `oklch(0.955 0.040 155)` | `#dcf9e5` | `oklch(0.245 0.040 155)` | `#0f2618` |
| warning | `oklch(0.516 0.106 88)` | `#816300` | `oklch(0.774 0.120 88)` | `#d5b153` |
| warning-soft | `oklch(0.955 0.040 88)` | `#fbefd2` | `oklch(0.245 0.040 88)` | `#281f07` |
| danger | `oklch(0.530 0.130 20)` | `#aa474c` | `oklch(0.786 0.124 20)` | `#ff9898` |
| danger-soft | `oklch(0.955 0.022 20)` | `#ffebea` | `oklch(0.245 0.040 20)` | `#311818` |
| info | `oklch(0.508 0.108 235)` | `#006e9a` | `oklch(0.768 0.130 235)` | `#51c0fa` |
| info-soft | `oklch(0.955 0.025 235)` | `#e1f3ff` | `oklch(0.245 0.040 235)` | `#0a2331` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 14.43 / 94 | 15.61 / 94 |
| ink-2 on surface-sunken | 7.03 / 75 | 12.39 / 76 |
| ink-3 on surface-sunken | 4.56 / 64 | 9.4 / 61 |
| accent-on on accent | 5.57 / 80 | 8.46 / 60 |
| accent-text on surface-page | 4.93 / 68 | 9.13 / 62 |
| accent-text on accent-soft | 4.68 / 65 | 7.89 / 60 |
| danger on surface-page | 4.95 / 69 | 9.07 / 62 |
| border-strong on surface-page | 3.01 / 53 | 4.3 / 31 |

Accent 12-step ramp (light): `#fefcfc` `#fdf8f6` `#faefeb` `#f9e6de` `#f5d9ce` `#edc9bb` `#e4b5a3` `#d69881` `#a54a24` `#994521` `#9f5335` `#482111`

Accent 12-step ramp (dark): `#1b120f` `#211612` `#3a2015` `#4e2616` `#5e311f` `#6e3d29` `#824b36` `#9d5b42` `#f8966f` `#fea785` `#e9a88f` `#ffe3d8`

### 10. `grape-jewel` — Grape & Ochre (credible purple (jewel tone, flat))

- **Mood** deep, inky, a little theatrical. **Suits** creative software, arts, education with personality, community platforms, premium consumer. **Avoid** any brief where purple-to-blue gradient is the only idea.
- **Accent hue** 305. Neutral hue/chroma: light 310/0.01, dark 305/0.016.
- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): light `oklch(0.420 0.168 305)`; dark `oklch(0.766 0.134 305)`.

| token | light oklch | light hex | dark oklch | dark hex |
|---|---|---|---|---|
| surface-page | `oklch(0.975 0.010 310)` | `#f9f5fc` | `oklch(0.170 0.016 305)` | `#110e15` |
| surface-card | `oklch(0.995 0.003 310)` | `#fefdff` | `oklch(0.205 0.016 305)` | `#19151d` |
| surface-sunken | `oklch(0.945 0.010 310)` | `#efebf2` | `oklch(0.140 0.016 305)` | `#0b080e` |
| surface-raised | `oklch(0.995 0.003 310)` | `#fefdff` | `oklch(0.240 0.016 305)` | `#211d25` |
| surface-inverse | `oklch(0.240 0.006 310)` | `#201e21` | `oklch(0.940 0.016 305)` | `#ede9f4` |
| ink-1 | `oklch(0.220 0.008 310)` | `#1c1a1d` | `oklch(0.945 0.013 305)` | `#efebf4` |
| ink-2 | `oklch(0.426 0.010 310)` | `#504d53` | `oklch(0.848 0.016 305)` | `#cfcbd6` |
| ink-3 | `oklch(0.530 0.010 310)` | `#6d6a70` | `oklch(0.766 0.016 305)` | `#b5b1bb` |
| ink-inverse | `oklch(0.970 0.008 310)` | `#f7f4f9` | `oklch(0.220 0.013 305)` | `#1c191f` |
| border-subtle | `oklch(0.900 0.012 310)` | `#e0dce4` | `oklch(0.255 0.019 305)` | `#25212a` |
| border-strong | `oklch(0.650 0.013 310)` | `#918d95` | `oklch(0.574 0.021 305)` | `#7b7683` |
| accent | `oklch(0.420 0.150 305)` | `#612f8d` | `oklch(0.766 0.120 305)` | `#c59ff0` |
| accent-on | `oklch(0.985 0.005 310)` | `#fbf9fd` | `oklch(0.190 0.013 305)` | `#151218` |
| accent-hover | `oklch(0.375 0.150 305)` | `#54217f` | `oklch(0.806 0.120 305)` | `#d2acfe` |
| accent-soft | `oklch(0.950 0.030 305)` | `#f3eaff` | `oklch(0.235 0.045 305)` | `#23182f` |
| accent-text | `oklch(0.542 0.150 305)` | `#8454b4` | `oklch(0.782 0.120 305)` | `#caa4f6` |
| ring | `oklch(0.420 0.150 305)` | `#612f8d` | `oklch(0.766 0.120 305)` | `#c59ff0` |
| accent2 | `oklch(0.780 0.130 85)` | `#ddb049` | `oklch(0.820 0.130 85)` | `#ebbd57` |
| accent2-on | `oklch(0.190 0.008 310)` | `#151317` | `oklch(0.190 0.013 305)` | `#151218` |
| accent2-soft | `oklch(0.950 0.040 85)` | `#fbedd1` | `oklch(0.235 0.040 85)` | `#271c05` |
| accent2-text | `oklch(0.530 0.109 85)` | `#886600` | `oklch(0.772 0.130 85)` | `#dbae46` |
| success | `oklch(0.512 0.127 155)` | `#007b45` | `oklch(0.756 0.130 155)` | `#64c88b` |
| success-soft | `oklch(0.955 0.040 155)` | `#dcf9e5` | `oklch(0.230 0.040 155)` | `#0b2214` |
| warning | `oklch(0.534 0.116 70)` | `#975f00` | `oklch(0.776 0.120 70)` | `#e7a85b` |
| warning-soft | `oklch(0.955 0.033 70)` | `#ffedd9` | `oklch(0.230 0.040 70)` | `#291906` |
| danger | `oklch(0.544 0.130 25)` | `#af4c48` | `oklch(0.784 0.126 25)` | `#ff9890` |
| danger-soft | `oklch(0.955 0.022 25)` | `#ffebe9` | `oklch(0.230 0.040 25)` | `#2d1513` |
| info | `oklch(0.522 0.111 235)` | `#0072a0` | `oklch(0.764 0.130 235)` | `#50bff9` |
| info-soft | `oklch(0.955 0.025 235)` | `#e1f3ff` | `oklch(0.230 0.040 235)` | `#06202d` |

| key pair | light WCAG / Lc | dark WCAG / Lc |
|---|---|---|
| ink-1 on surface-page | 16.05 / 99 | 16.27 / 95 |
| ink-2 on surface-sunken | 7.06 / 78 | 12.48 / 76 |
| ink-3 on surface-sunken | 4.52 / 66 | 9.45 / 61 |
| accent-on on accent | 8.73 / 91 | 8.48 / 60 |
| accent-text on surface-page | 4.99 / 71 | 9.25 / 62 |
| accent-text on accent-soft | 4.61 / 66 | 8.17 / 60 |
| danger on surface-page | 4.94 / 71 | 9.24 / 62 |
| border-strong on surface-page | 3.02 / 55 | 4.34 / 31 |

Accent 12-step ramp (light): `#fdfcfe` `#faf8fd` `#f4effb` `#efe6fa` `#e6daf5` `#dacaee` `#cbb6e5` `#b79ad9` `#612f8d` `#582a81` `#805aa9` `#3a264f`

Accent 12-step ramp (dark): `#16131a` `#1b1720` `#2c2238` `#3a2a4b` `#47355b` `#55426b` `#66517e` `#7b6298` `#c59ff0` `#cfaef6` `#c3ace1` `#ede4fa`


## 6. Categorical data-viz sets [computed]

Generated by hill-climbing hue and lightness (12 restarts) to maximise the minimum pairwise OKLab distance x100 across normal vision and simulated protan/deutan/tritan vision (Machado 2009 severity-1.0 matrices; CVD distances weighted x1.25 to allow slightly lower values), subject to >= 3:1 against the background. They are machine-searched, not art-directed: shuffle order for pleasant adjacency, swap series 1 for the brand accent when it already passes, and always add direct labels, markers or patterns (not a clinical CVD guarantee).

**light-6** on `#ffffff`, min weighted pairwise distance x100 = 14.6

| # | oklch | hex | WCAG vs bg |
|---|---|---|---|
| 1 | `oklch(0.507 0.104 95)` | `#786400` | 5.8 |
| 2 | `oklch(0.651 0.140 112)` | `#929712` | 3.15 |
| 3 | `oklch(0.639 0.140 263)` | `#5e89e0` | 3.43 |
| 4 | `oklch(0.486 0.140 274)` | `#4855ad` | 6.61 |
| 5 | `oklch(0.450 0.140 356)` | `#8d2a58` | 8.06 |
| 6 | `oklch(0.625 0.140 360)` | `#c95f84` | 3.85 |

**dark-6** on `#141414`, min weighted pairwise distance x100 = 15.3

| # | oklch | hex | WCAG vs bg |
|---|---|---|---|
| 1 | `oklch(0.782 0.130 7)` | `#fe93a9` | 8.74 |
| 2 | `oklch(0.850 0.130 97)` | `#e6ce62` | 11.73 |
| 3 | `oklch(0.672 0.130 110)` | `#9b9c2c` | 6.3 |
| 4 | `oklch(0.802 0.130 223)` | `#46d0fb` | 10.24 |
| 5 | `oklch(0.627 0.130 251)` | `#458cd4` | 5.22 |
| 6 | `oklch(0.620 0.130 360)` | `#c36183` | 4.7 |

**light-8** on `#ffffff`, min weighted pairwise distance x100 = 11.1

| # | oklch | hex | WCAG vs bg |
|---|---|---|---|
| 1 | `oklch(0.648 0.140 26)` | `#d66861` | 3.49 |
| 2 | `oklch(0.461 0.128 47)` | `#8f3c00` | 7.46 |
| 3 | `oklch(0.569 0.131 62)` | `#ac6200` | 4.67 |
| 4 | `oklch(0.450 0.080 184)` | `#00635a` | 7.16 |
| 5 | `oklch(0.613 0.104 196)` | `#009799` | 3.57 |
| 6 | `oklch(0.562 0.140 295)` | `#7c61bd` | 4.88 |
| 7 | `oklch(0.450 0.140 301)` | `#633d95` | 7.98 |
| 8 | `oklch(0.680 0.140 306)` | `#ad80dc` | 3.04 |

**dark-8** on `#141414`, min weighted pairwise distance x100 = 11.2

| # | oklch | hex | WCAG vs bg |
|---|---|---|---|
| 1 | `oklch(0.620 0.130 2)` | `#c46180` | 4.71 |
| 2 | `oklch(0.850 0.130 90)` | `#eeca61` | 11.63 |
| 3 | `oklch(0.712 0.130 95)` | `#bca130` | 7.26 |
| 4 | `oklch(0.850 0.130 165)` | `#70e9b8` | 12.31 |
| 5 | `oklch(0.640 0.130 274)` | `#7485db` | 5.37 |
| 6 | `oklch(0.850 0.078 287)` | `#c9c7ff` | 11.49 |
| 7 | `oklch(0.753 0.130 291)` | `#af9ffb` | 8.05 |
| 8 | `oklch(0.757 0.130 355)` | `#f08cb4` | 8.0 |

Reference (secondary): Okabe-Ito `#E69F00 #56B4E9 #009E73 #F0E442 #0072B2 #D55E00 #CC79A7 #000000` scores 9.5 on the same metric and its yellow is 1.32:1 on white (needs an outline on light backgrounds).

Sequential recipe: one hue (`accent_hue` or neutral hue), L from 0.96 to 0.35 in 6-9 steps, chroma bell peaking mid-ramp (use the `*_ramps.accent` steps 2-12). Diverging: two hues from different families at equal L endpoints meeting at `surface-sunken`. Use `info`/`danger` hues only for meaning, never as arbitrary series.

## 7. Open items

- Palettes are not yet rendered/eyeballed on real layouts (no screenshot in this session): the swatch-level sanity (page vs card vs sunken steps, soft tints) comes from numbers only. Run through the render loop and log accept/reject in `ledger/`.
- `*_ramps` steps are not contrast-gated; only the 29 tokens are.
- State hues are shared defaults with small per-palette overrides; brand-specific state colours (e.g. a green brand) need the override pattern shown in `botanical-muted`.
- `signal-orange` and `chalk-chartreuse` intentionally sit at the lower end of APCA for the label on fill; see `color-and-surfaces.md` section 5.
- Weak spots to review by eye: `mono-ultramarine` dark accent (white label at WCAG 4.51, Lc 74, just above the gate), warning/ochre colours on `-soft` backgrounds in dark mode, and whether `chalk-chartreuse` light needs a visible boundary on `surface-page` (accent fill is 1.2:1 against it).
