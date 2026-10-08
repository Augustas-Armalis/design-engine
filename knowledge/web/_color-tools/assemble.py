import json
tables=open('palette_tables.md').read()
mins=open('mins.md').read()
dv=json.load(open('dv_out.json'))
P=json.load(open('palettes_out.json'))
def dvtab(k,bg):
    v=dv[k]
    rows="| # | oklch | hex | WCAG vs bg |\n|---|---|---|---|\n"+'\n'.join(f"| {i+1} | `{c['oklch']}` | `{c['hex']}` | {c['wcag_vs_bg']} |" for i,c in enumerate(v['colors']))
    return f"**{k}** on `{bg}`, min weighted pairwise distance x100 = {v['score']}\n\n"+rows+"\n"
head='''---
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

'''
head2='''

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

'''
tail='''
## 6. Categorical data-viz sets [computed]

Generated by hill-climbing hue and lightness (12 restarts) to maximise the minimum pairwise OKLab distance x100 across normal vision and simulated protan/deutan/tritan vision (Machado 2009 severity-1.0 matrices; CVD distances weighted x1.25 to allow slightly lower values), subject to >= 3:1 against the background. They are machine-searched, not art-directed: shuffle order for pleasant adjacency, swap series 1 for the brand accent when it already passes, and always add direct labels, markers or patterns (not a clinical CVD guarantee).

'''+dvtab('light-6','#ffffff')+'\n'+dvtab('dark-6','#141414')+'\n'+dvtab('light-8','#ffffff')+'\n'+dvtab('dark-8','#141414')+'''
Reference (secondary): Okabe-Ito `#E69F00 #56B4E9 #009E73 #F0E442 #0072B2 #D55E00 #CC79A7 #000000` scores 9.5 on the same metric and its yellow is 1.32:1 on white (needs an outline on light backgrounds).

Sequential recipe: one hue (`accent_hue` or neutral hue), L from 0.96 to 0.35 in 6-9 steps, chroma bell peaking mid-ramp (use the `*_ramps.accent` steps 2-12). Diverging: two hues from different families at equal L endpoints meeting at `surface-sunken`. Use `info`/`danger` hues only for meaning, never as arbitrary series.

## 7. Open items

- Palettes are not yet rendered/eyeballed on real layouts (no screenshot in this session): the swatch-level sanity (page vs card vs sunken steps, soft tints) comes from numbers only. Run through the render loop and log accept/reject in `ledger/`.
- `*_ramps` steps are not contrast-gated; only the 29 tokens are.
- State hues are shared defaults with small per-palette overrides; brand-specific state colours (e.g. a green brand) need the override pattern shown in `botanical-muted`.
- `signal-orange` and `chalk-chartreuse` intentionally sit at the lower end of APCA for the label on fill; see `color-and-surfaces.md` section 5.
- Weak spots to review by eye: `mono-ultramarine` dark accent (white label at WCAG 4.51, Lc 74, just above the gate), warning/ochre colours on `-soft` backgrounds in dark mode, and whether `chalk-chartreuse` light needs a visible boundary on `surface-page` (accent fill is 1.2:1 against it).
'''
open('knowledge/web/palette-recipes.md','w').write(head+mins+head2+tables+'\n'+tail)
print('ok')
