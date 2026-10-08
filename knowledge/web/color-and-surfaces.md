---
source: web:bottosson.github.io/posts/oklab + evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl + radix-ui.com/colors/docs + stripe.com/blog/accessible-color-systems + linear.app/now/how-we-redesigned-the-linear-ui + material-color-utilities (scheme.dart) + github.com/Myndex/apca-w3 + w3.org WCAG 2.2 + tailwindcss.com/docs (colors, box-shadow, background-image) + joshwcomeau.com (designing-shadows, backdrop-filter, color-formats) + web.dev/backdrop-filter + impeccable.style/slop + Jonauskaite 2020 / Elliot 2007 replication literature (search summaries)
chapter: Color, gradients, shadows, blur, borders and surfaces for web
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [color, oklch, palette, contrast, wcag, apca, dark-mode, gradients, shadows, elevation, glass, backdrop-filter, borders, grain, dataviz, ai-tells]
status: studied
---

# Color, gradients, shadows, blur, borders and surfaces

Companion data file: `knowledge/web/palette-recipes.md` (JSON schema + 10 filled light/dark palettes) and machine-readable `knowledge/web/palettes.json`. Generator, contrast maths and Radix analysis scripts: `knowledge/web/_color-tools/` (move to `tools/` when convenient).

Evidence grading used in this note (same convention as `implementation-craft.md`):
- **[verified]** read from a primary or near-primary source in this session (fetched page or repo file).
- **[computed]** produced by the scripts in `_color-tools/` in this session (WCAG 2.2 formula, APCA-W3 0.0.98G-4g constants, Ottosson Oklab matrices). Sanity anchors reproduced: black on white = 21:1 / Lc 106.04, white on black = Lc -107.88, `#f3f7fa` = `oklch(0.974 0.006 240)` (Evil Martians says 0.97 0.006 240), `#767676` on white = 4.54:1 / Lc 71.6.
- **[secondary]** from a search summary or blog quoting a primary; treat as a lead.
- **[engine note]** my own knowledge or heuristic; not sourced here.

---

## 1. Core ideas

1. **Work in OKLCH, ship hex (plus an optional P3 upgrade).** L is perceptual lightness 0-1, C is chroma (practically < 0.37 even in P3), H is 0-360 (red ~20, yellow ~90, green ~140, blue ~220, purple ~320). Equal L means equal perceived lightness across hues, which HSL does not give (`hsl(60 100% 50%)` yellow looks far lighter than `hsl(240 100% 50%)` blue) [verified: Evil Martians, Comeau]. Ottosson built Oklab because CIELAB/CIELUV mispredict hue (blue drifts to purple when blended with white) and HSV is poor on lightness; reported hue RMS error 0.49 vs 0.69 (CIELAB) vs 1.10 (HSV), lightness RMS 0.20 vs 1.70 (CIELAB), with the caveat that the reference data came from CAM16, not new human experiments [verified]. Plain `lch()` has the same blue-to-purple hue shift between hue 270 and 330 that OKLCH removes [verified: Evil Martians].
2. **A palette is a lightness ladder first, a hue choice second.** Stripe moved to CIELAB and equalised lightness per hue so that "any two colours 5 levels apart pass small-text contrast, 4 levels apart pass icons and large text", even on the lightest tint of any hue [verified]. Radix does the same with 12 steps where each step has a job (below). Because contrast is a function of lightness, a ladder with fixed L per step gives contrast guarantees by construction; hue and chroma are then free parameters.
3. **Semantic tokens, not colour names.** Linear cut a theme from 98 variables to 3 inputs (base colour, accent colour, contrast) and generates surfaces, text, icons and controls from them, with light and dark using the same generation process [verified]. For this engine: `surface/ink/border/accent/state` tokens are the contract; palettes are data that fill them (see `palette-recipes.md`).
4. **Dark mode is a second design, not an inversion.** Lightness ladders do not mirror: Radix dark step 1 is L ~0.18 and its text step 12 is ~0.95, accent text steps move lighter and less chromatic, and dark surfaces separate by lightness steps rather than shadows [verified: Radix files, computed]. Contrast metrics also disagree between modes: a grey at WCAG 4.5:1 on white is APCA Lc 72, but the same 4.5:1 on near-black is only Lc 32 [computed]. WCAG 2.x alone therefore under-protects dark-mode body text; gate both metrics.
5. **Accent is a scarcity effect, not a percentage.** 60-30-10 is an interior-design heuristic ported to UI; no study tests 10% as optimal [secondary]. What the rule gets right: one dominant calm neutral field, a supporting surface, and a rare saturated accent whose rarity makes it read as "action". Where it misleads: it ignores that accent *text* needs far darker/lighter values than accent *fills*, and that data-heavy products need multiple chromatic hues.
6. **Neutrals carry the brand more than the accent does.** Pure grey (C = 0) reads as unconsidered unless it is deliberately Swiss/mono. Tailwind v4 ships tinted greys (slate C up to 0.046, zinc <= 0.017, stone <= 0.013, taupe <= 0.021, mauve, mist, olive) and Radix ships mauve/slate/sage/olive/sand next to pure gray, with "natural" pairing = pick the gray whose hue is nearest the accent [verified]. Radix warns against strongly saturated grays as dark-mode app backgrounds because coloured components clash [verified].
7. **Depth is made from 4 mechanisms, use at most two per surface**: lightness step (surface-N), hairline edge (ring), shadow (blur layers), highlight (inset 1px light top edge). The "hairline border plus wide soft shadow on the same card" combination is flagged as a generic tell [verified: impeccable.style].
8. **Gradients look cheap when they cross hue families at full chroma, interpolate in sRGB, band, or sit behind text without a contrast check.** Good ones are tonal (same hue, ΔL 0.04-0.10), hue-drifting (ΔH <= 40-60 at constant L/C), or layered radials with same-hue transparent ends, finished with noise to kill banding.
9. **Blur is a cost, not a style.** `backdrop-filter` forces re-compositing of everything behind the element every frame; use it on a few small/sticky surfaces, keep radius <= ~20px on large areas, never animate the radius [secondary].
10. **Colour psychology is weak evidence for design decisions.** Colour-emotion *associations* are fairly universal (30 nations, N = 4,598, pattern similarity r = .88), but the claim that a colour *changes behaviour or performance* (e.g. red impairs test performance) has failed several close replications [secondary]. Pick colour for category fit, legibility and differentiation; do not justify it with "blue builds trust".

---

## 2. Rules

### A. Colour spaces, scales, gamut

- **RULE** Author every colour as `oklch(L C H)`; emit hex (sRGB-mapped) as the default declaration and optionally a wider `oklch()` or `color(display-p3 ...)` inside `@media (color-gamut: p3)`. Keep a fallback declaration first.
  **Why** hex/rgb/hsl are sRGB-only in CSS; OKLCH has no gamut cap, and out-of-gamut values are mapped by the browser (CSS Color 4 specifies chroma reduction at constant L/H, which preserves hue; older engines clipped RGB channels and shifted hue) [verified: Evil Martians; browser behaviour has been changing, re-test].
  **Applies to** all. **Check** every `oklch()` in CSS parses; a script converts it to sRGB and flags `max(r,g,b) > 1` unless it sits inside a `color-gamut: p3` block.
  **Source** Evil Martians; Comeau color-formats.
- **RULE** Quote lightness as 0-1 (`oklch(0.62 ...)`) or % consistently; `%` does not work inside `calc()` or relative colour syntax, so tokens meant for `calc(l + .1)` use decimals.
  **Why** relative-colour hover rules (`oklch(from var(--accent) calc(l - 0.06) c h)`) silently fail with `%` mixing.
  **Applies to** all. **Check** grep for `oklch(` with `%` in tokens used by `from`.
  **Source** Evil Martians [verified].
- **RULE** Build scales as fixed lightness ladders, not `lighten()/darken()` at runtime. 12-step UI scale (Radix semantics): 1 app bg, 2 subtle bg, 3 component bg, 4 hover, 5 pressed/selected, 6 subtle border, 7 border on interactive, 8 strong border/focus ring, 9 solid fill (purest), 10 solid hover, 11 low-contrast text, 12 high-contrast text.
  **Why** fixed ladders make contrast predictable (steps 11/12 are documented as at least APCA Lc 60 / Lc 90 on step 2 of the same scale), and Refactoring UI says to define the set up front and tweak by eye rather than generating on the fly [verified].
  **Applies to** all. **Check** scale has 9-12 entries; L is monotone except step 9/10 on bright hues (yellow, amber, lime, sky, mint, whose step 9 is *lighter* than step 8 by design).
  **Source** Radix understanding-the-scale; Refactoring UI building-your-color-palette.
- **RULE** Use these empirical OKLCH lightness ladders as defaults (see section 3 for the full measured table): light steps 1-12 L = 0.993, 0.982, 0.960, 0.938, 0.905, 0.863, 0.810, 0.734, fill, fill-0.027, ~0.556 (text), ~0.324 (strong text); dark L = 0.194, 0.213, 0.274, 0.320, 0.367, 0.416, 0.474, 0.541, fill, fill+0.04, ~0.764, ~0.907.
  **Why** measured from Radix's blue scale converted to OKLCH [computed]; they reproduce Radix's contrast behaviour.
  **Applies to** all. **Check** compare generated ramp L to table within +-0.02.
  **Source** Radix colors repo (light.ts, dark.ts) [computed].
- **RULE** Chroma follows a bell over the ladder: near 0 at steps 1-2, ~0.25-0.35 of peak at steps 4-6, peak at step 9, ~0.85 of peak at step 11, ~0.5 at step 12 (light). Dark mode peaks the same at step 9 but carries relatively *more* chroma in the low steps (0.13-0.55 of peak at steps 1-6) because tinted surfaces need to read as the hue.
  **Why** measured Radix blue: C/peak light = .016 .047 .104 .181 .264 .352 .461 .627 1 .948 .839 .497; dark = .130 .155 .342 .503 .549 .585 .632 .725 1 .876 .653 .264 [computed].
  **Applies to** all. **Check** C(step 9) is the max of the ramp (+-5%).
  **Source** Radix colors repo [computed].
- **RULE** Allow hue to drift <= ~10-15 degrees along a ladder for most hues; yellow/amber need up to ~45 degrees (drift toward orange/brown as they darken). Do not "rotate hue to brighten" blindly.
  **Why** measured drift: blue 235-259, green 155-165, red 14-25, indigo 267-286, amber 100 -> 54 from step 3 to 12 [computed]. A dark yellow at constant hue turns olive/green.
  **Applies to** all. **Check** hue range of the ramp; for hue 80-110 check step 11/12 hue <= 70.
  **Source** Radix colors repo [computed].
- **RULE** Brand/accent step 9 should be chosen from the hue's gamut peak, then lightness is set by the label colour: 20 of Radix's scales are tuned for white text on step 9, 5 (sky, mint, lime, yellow, amber) for dark text.
  **Why** bright hues cannot hold white text at 4.5:1 without turning muddy.
  **Applies to** all. **Check** `contrast(label, fill) >= 4.5` and Lc >= 60 (see C).
  **Source** Radix composing-a-palette [verified].
- **RULE** Material 3 reference: tones are HCT lightness 0-100; light roles use tone 40 (primary), 100 (on-primary), 90 (container), 10 (on-container), 99 (surface/background), 10 (on-surface), 50 outline, 80 outline-variant, 90 surface-variant; dark roles use 80, 20, 30, 90, 10 (surface), 90 (on-surface), 60 outline, 30 outline-variant/surface-variant [verified: scheme.dart]. Core palette chroma [engine note, HCT units differ from OKLCH]: primary max(48, source), secondary 16, tertiary 24 at hue+60, neutral 4, neutral-variant 8, error hue 25 chroma 84.
  **Why** shows the mature pattern: one tone ladder per palette, role = (palette, tone) and dark = different tones, not inverted ones.
  **Applies to** all. **Check** n/a (reference).
  **Source** material-color-utilities scheme.dart.

### B. Semantic tokens and modes

- **RULE** Every UI colour is one of 29 tokens: `surface-{page,card,sunken,raised,inverse}`, `ink-{1,2,3,inverse}`, `border-{subtle,strong}`, `accent`, `accent-{on,hover,soft,text}`, `ring`, optional `accent2*`, and `{success,warning,danger,info}` each with `-soft`. No raw hex in components.
  **Why** lets a palette swap or a dark mode change every pixel consistently; Linear's 3-input generator is the same idea.
  **Applies to** all. **Check** grep components for `#[0-9a-f]{3,8}` / `oklch(` outside the token file (allow SVG illustrations).
  **Source** Linear; Radix. See `palette-recipes.md`.
- **RULE** Separate *fill* accent from *text* accent. `accent` (fill) and `accent-text` (accent as text/icon on surfaces) are different tokens; `accent-text` is solved for contrast, `accent` is solved for the label on top of it.
  **Why** lime, orange and amber fills have 1.2-2:1 against white; as link text they must be darkened by 0.3-0.4 L. One token cannot do both (chalk-chartreuse light: fill `#c0f447` is 1.23:1 on its page, `accent-text` is a dark olive) [computed].
  **Applies to** all. **Check** `contrast(accent-text, page|card|accent-soft) >= 4.5 and |Lc| >= 60`.
  **Source** [computed]; Radix scale roles.
- **RULE** Light surface ladder: page L 0.965-0.985, card 0.99-1.0 (cards slightly brighter than the page = "closer to the light"), sunken 0.93-0.955 (wells, code, inputs), raised/popover 0.99-1.0, inverse 0.20-0.25. Dark: page 0.145-0.19, card +0.035, raised +0.07, sunken -0.03, inverse 0.93-0.96. Never pure `#000` page with pure `#fff` text.
  **Why** dark elevation is communicated by lightness (Material 2 formalised this as white overlays 5%..16% on `#121212`); pure black/white maximises halation and the "OLED hole" look [secondary: M2 spec; engine note on halation].
  **Applies to** SaaS app UI, landing page. **Check** `L(page_dark) in [0.14,0.20]`, `L(ink-1_dark) <= 0.97`.
  **Source** Material 2 dark theme (via search summary), Radix dark ladder [computed].
- **RULE** Dark mode accent: raise L (0.70-0.82), lower C by ~0-25% versus light, and flip the on-fill colour to dark ink if the fill is now light.
  **Why** saturated mid-tone accents vibrate on dark surfaces; M3 moves primary from tone 40 to tone 80 for the same reason [verified].
  **Applies to** all. **Check** dark `accent` L - light `accent` L >= 0.10 for deep light accents.
  **Source** scheme.dart; [computed] palettes.
- **RULE** Re-verify *every* pair in dark mode; do not assume the light verification carries over.
  **Why** the same WCAG ratio is a weaker APCA contrast on dark (section 3 divergence table).
  **Applies to** all. **Check** run the token contrast matrix for both modes in CI (script in `_color-tools/gen.py` `build_mode`).
  **Source** [computed].
- **RULE** Mode switching via `color-scheme: light dark` + `light-dark()` or a `[data-theme]` attribute; default follows `prefers-color-scheme`; the user override persists. Images/logos get a dark variant or a `filter` only if verified.
  **Why** see `implementation-craft.md` for support floors.
  **Applies to** all. **Check** both modes screenshot with no unthemed regions (any element whose computed background equals the other mode's page colour).
  **Source** [engine note].

### C. Contrast

- **RULE** Gate text on WCAG 2.2 AND APCA: body/secondary text >= 4.5:1 (7:1 for ink-2 targets) **and** |Lc| >= 60 (75 for the primary reading colour). Large text (>= 18pt = 24px, or >= 14pt bold = ~18.7px) may use 3:1 under WCAG.
  **Why** WCAG's formula treats light-on-dark mid-greys too generously; APCA models polarity (Lc 32 for the 4.5:1 grey on `#0f0f0f`) [computed]. Myndex thresholds: Lc 15 invisibility point for some viewers, 30 minimum for any spot/non-text use, 45 large fluent text or sub-fluent minimum, 60 medium text >24px, 75 minimum body text, 90 preferred body [verified]. Rounding is not allowed in WCAG: 4.499:1 fails [verified].
  **Applies to** all. **Check** per pair: `wcag >= T && |apca| >= A`.
  **Source** W3C Understanding 1.4.3; Myndex apca-w3.
- **RULE** Non-text UI (input borders, icon-only controls, focus rings, chart marks that carry meaning) >= 3:1 against adjacent colours (WCAG 1.4.11); APCA |Lc| >= 30 as the floor.
  **Why** a 1px input border at 1.5:1 disappears for low-vision users and in sunlight.
  **Applies to** forms, SaaS UI. **Check** `contrast(border-strong, page|card) >= 3`.
  **Source** WCAG 1.4.11 (as referenced in 1.4.3 page); Myndex.
- **RULE** Decorative hairlines (`border-subtle`) may be 1.1-1.6:1 but must never be the only thing separating interactive regions.
  **Why** no requirement for pure decoration, but dividers that define a tappable area count as UI.
  **Applies to** all. **Check** inputs/buttons use `border-strong` or a fill, not `border-subtle`.
  **Source** WCAG 1.4.3/1.4.11 exceptions [verified].
- **RULE** Text over gradients/images is checked at the *worst* stop inside its bounding box, and over glass at the worst plausible backdrop.
  **Why** one passing sample point is not a pass. Worked numbers in section 3 (glass table).
  **Applies to** landing page heroes, glass nav. **Check** sample the rendered pixels behind each text node (Playwright screenshot crop), take the min contrast.
  **Source** [computed], Impeccable "images hidden under overlays".
- **RULE** APCA font-size/weight table (older SAPC list; verify against the current `fontLookupAPCA` in apca-w3 before quoting as final): 16px/400 needs ~85, 16px/500 ~80, 16px/700 ~70, 18px/400 ~80, 24px/400 ~73, 24px/700 ~58, 32px/400 ~60, 48px/400 ~47, 64px/400 ~40; sizes below 14px/400 want 90-100. Serif: use next heavier column [verified: Myndex silver method page].
  **Why** weight and size change the needed contrast; WCAG ignores this.
  **Applies to** typography choices. **Check** map each text node (size, weight) to the minimum and compare |Lc|.
  **Source** Myndex Method-font-characteristic-contrast.
- **RULE** Accept that small labels on bright fills trade APCA for punch: a dark label on a pure safety-orange fill is 6.6:1 WCAG but only Lc ~50; use it only for >= 16px/600 (ideally >= 18px/700) labels, or switch to a deeper fill with a white label.
  **Why** honest accounting of the exception [computed: palette `signal-orange`].
  **Applies to** high-chroma signal palettes. **Check** label font-size/weight vs Lc table.
  **Source** [computed].
- **RULE** Colour is never the only carrier of state (error, success, selected): add icon, text or shape.
  **Why** WCAG 1.4.1; ~8% of men have a colour-vision deficiency [engine note].
  **Applies to** all. **Check** state components contain an icon or text node in addition to colour.
  **Source** WCAG 1.4.1 [engine note on prevalence].

### D. Accent usage and neutrals

- **RULE** One accent hue per surface family; accent fills cover <= ~10% of a viewport's pixels and appear on <= 2-3 simultaneous elements (primary CTA, active state, one highlight). Count chromatic pixels, not elements.
  **Why** scarcity makes accent read as "act here"; the 60-30-10 figure is an untested heuristic [secondary], but the failure mode of five equal-weight coloured buttons is observable.
  **Applies to** landing page, SaaS UI. **Check** screenshot: share of pixels with C > 0.08 on the page <= 10-15% (excluding photography); count of filled accent elements above the fold <= 3.
  **Source** secondary; [engine note].
- **RULE** Two-accent palettes assign roles, not decoration: accent 1 = action, accent 2 = secondary identity (tags, charts, highlights); accent 2 never appears on a CTA.
  **Why** removes the "which colour means click" ambiguity; `adobe-dual` and `grape-jewel` follow this.
  **Applies to** all. **Check** accent2 tokens absent from button/link selectors.
  **Source** [engine note].
- **RULE** Tint neutrals. Surface chroma budget: light surfaces C 0.003-0.016, dark surfaces C 0.004-0.022, mid/ink greys C 0.004-0.04; C < 0.003 reads as dead grey unless the brief is deliberately mono/Swiss. Use the accent hue +-30 degrees, or a deliberate complement (warm paper under a cool accent).
  **Why** Radix "natural" pairing and Tailwind's slate/stone/mauve/olive; Linear limited blue in its neutrals for a "more neutral, timeless look". Over-saturated dark greys clash with coloured badges [verified: Radix].
  **Applies to** all. **Check** `C(page) in [0.003, 0.016]` light; `C(page) in [0.004, 0.022]` dark; hue difference page vs accent <= 30 or documented.
  **Source** Tailwind colors; Radix; Linear.
- **RULE** Greys that carry text stay low-chroma and share the surface hue; do not put a pure grey (`#888`) on a tinted surface.
  **Why** chroma mismatch makes text look "dirty"; Impeccable lists "gray text on coloured background" as a tell and prescribes a darker tint of the surface hue [verified].
  **Applies to** all. **Check** hue(ink-2) within 20 degrees of hue(surface) when C(ink-2) > 0.004.
  **Source** impeccable.style/slop.

### E. Gradients

- **RULE** Always declare the interpolation space: `linear-gradient(in oklab 160deg, a, b)` for rectangular blends or `in oklch shorter hue` for controlled hue travel. Do not rely on the default.
  **Why** hex/rgb endpoints interpolate in sRGB (muddy mid-tones: red to green gives brown; in Oklab it gives a clean olive) [secondary]; Tailwind v4 sets `in oklab` by default for `bg-linear-*`, `bg-radial`, `bg-conic` and offers `/srgb /oklch /longer /shorter /increasing /decreasing` modifiers [verified]. MDN grammar: `in <rectangular|polar space> [shorter|longer|increasing|decreasing hue]`. The CSS default for mixed/legacy colours is not verified here; specify it.
  **Applies to** all. **Check** every `gradient(` string contains ` in `.
  **Source** MDN linear-gradient; Tailwind background-image.
- **RULE** Complementary endpoints pass through grey in any rectangular space (Oklab just keeps that grey from being dark). Add a hand-picked intermediate stop, or travel the long way (`in oklch longer hue`) at lowered chroma, or avoid complements.
  **Why** averaging opposite hues cancels chroma; the long hue arc leaves the sRGB gamut and is clipped [secondary].
  **Applies to** hero backgrounds. **Check** sample mid-stop: C >= 0.5 x average endpoint C.
  **Source** secondary summary of CSS WG discussions; [engine note].
- **RULE** Three gradient families that look expensive: (1) **tonal** same hue, ΔL 0.04-0.10, ΔC <= 0.02; (2) **hue-drift** ΔH <= 40-60 degrees, constant L (+-0.04) and C; (3) **layered radial** 3-4 blobs `oklch(L C H / .5)` fading to the *same colour at alpha 0*, over a flat surface colour.
  **Why** limited perceptual distance reads as light, not as a "gradient effect". Recipes with CSS in section 3.
  **Applies to** landing page. **Check** endpoints: ΔE_ok (OKLab distance x100) <= 25 for backgrounds; ΔH <= 60.
  **Source** [engine note]; Linear/Stripe practice (qualitative).
- **RULE** Transparent stops use the same colour at alpha 0 (`oklch(0.7 0.12 250 / 0)`), not the keyword `transparent`.
  **Why** `transparent` is transparent black; in non-premultiplied or oklab interpolation it drags a grey/dark fringe through the fade [engine note; MDN page fetched did not address it].
  **Applies to** all. **Check** grep `transparent` inside gradients that fade a coloured layer.
  **Source** [engine note].
- **RULE** Banding: a smooth gradient over W px with N distinct 8-bit levels bands every W/N px. If W/N > ~8-10px visible, overlay grain at opacity 0.03-0.08 (+-1-2 levels) or break the gradient into layers. More stops do not add precision.
  **Why** 8-bit channels; noise dithers the steps invisible. Computed examples: `#0f1115` to `#151a24` across 1440px = 15 levels = 96px bands; `#fcf9f7` to `#f2efed` = 10 levels = 144px bands [computed].
  **Applies to** large dark gradients especially. **Check** compute max channel delta between stops; flag W/N > 10 without a noise layer.
  **Source** [computed]; Frontend Masters / Tudor via search [secondary].
- **RULE** Gradient text only when the gradient spans <= 0.10 L and <= 30 degrees of hue, both ends pass 4.5:1; otherwise use a solid colour.
  **Why** Impeccable lists gradient text as a tell ("emphasis through size or weight instead") [verified]; two ends = two contrast checks.
  **Applies to** headings. **Check** `background-clip: text` present -> contrast at both ends.
  **Source** impeccable.style/slop.

### F. Shadows and elevation

- **RULE** One light source: every shadow on the page shares one angle (Comeau: vertical offset = 2x horizontal offset per layer; here usually pure vertical).
  **Why** inconsistent angles are read as error even by non-designers.
  **Applies to** all. **Check** the sign/ratio of x:y offsets across `box-shadow` values (all x >= 0 and y > 0, or all x = 0).
  **Source** Comeau designing-shadows [verified].
- **RULE** Higher elevation = larger offset, larger blur, *lower* opacity per layer. Layer 2-5 shadows with offsets/blurs roughly doubling; add negative spread (-y/2) on the large layers so the shadow does not leak at the sides.
  **Why** one shadow looks like a CSS effect; layered shadows approximate a real penumbra. Each layer costs paint time; 3-5 is the practical ceiling [verified: Comeau, Tailwind v4 uses 2 layers for sm-xl].
  **Applies to** all. **Check** opacity decreases with elevation level across the token set; layers <= 5.
  **Source** Comeau; Tailwind v4 shadow tokens.
- **RULE** Tint the shadow with the surface hue (low L, C 0.02-0.05, same H as the neutral), not `rgb(0 0 0 / x)`, on light surfaces. On dark surfaces use true black at 2-3x the alpha and rely on ring + lightness for separation.
  **Why** black at low alpha looks washed/grey on tinted surfaces; on dark surfaces a black shadow is nearly invisible [verified: Comeau; secondary on dark].
  **Applies to** all. **Check** `--shadow-color` hue within 20 degrees of surface hue in light mode.
  **Source** Comeau.
- **RULE** Use this default scale (section 3 has the CSS): `e0` flat (no shadow), `e1` cards/inputs, `e2` hover-raised cards, `e3` popovers/menus, `e4` dialogs, `e5` drag/float. Hover raises one level, never more. Most product UI uses e0-e2 only.
  **Why** limiting the set keeps depth meaningful; "same soft shadow on every card" is a tell.
  **Applies to** all. **Check** distinct shadow strings in the stylesheet <= 6 (+ focus rings).
  **Source** [engine note]; Impeccable "card kit".
- **RULE** Shadow that is not rendered in the dark theme must be replaced, not removed: dark e1+ = 1px light ring (white at 8-10%) + optional inset top highlight (white at 5-6%) + the surface lightness step.
  **Why** otherwise cards vanish into the page; Radix's dark shadows add a `gray-a6` ring and raise black alphas (e.g. `black-a7`) [verified].
  **Applies to** dark mode. **Check** dark-mode cards have a distinguishable edge (ΔL >= 0.03 to page or ring alpha >= .08).
  **Source** Radix shadow.css; Material 2 overlays.
- **RULE** Colour-glow shadows (accent-coloured blur around buttons/cards) are only for light emitting objects (a LED, a "live" dot, a lit card in a game UI); never as default hover decoration.
  **Why** neon glow on black is the default "cool" AI look [verified: Impeccable].
  **Applies to** all. **Check** `box-shadow` colours with C > 0.08 on non-indicator elements.
  **Source** impeccable.style/slop.

### G. Borders, rings, inner highlights

- **RULE** Pick one edge definition per surface: hairline ring OR shadow OR lightness step. If both ring and shadow exist, the ring is part of the shadow stack (`0 0 0 1px var(--ring)` as its first layer) so it follows radius and costs no layout.
  **Why** `box-shadow` with 0 blur and 1px spread acts as a border, follows `border-radius`, takes no layout space; a second border on top doubles the edge [secondary]. Radix and Tailwind both start elevated shadows with a 1px ring or use `ring-1` [verified].
  **Applies to** cards, popovers. **Check** element has `border-width: 0` when ring-in-shadow is used; no both `border` and `0 0 0 1px` layers.
  **Source** Radix shadow.css; search summaries.
- **RULE** Forced-colors: a ring made with `box-shadow` disappears; add `outline: 1px solid transparent` (shows in forced-colors) on elements that depend on ring-as-border.
  **Why** box-shadow is not rendered in forced-colors mode (see `implementation-craft.md`).
  **Applies to** all. **Check** forced-colors screenshot shows edges.
  **Source** [engine note] + implementation-craft rule.
- **RULE** Ring colours: light = surface ink at 8-12% alpha (tinted shadow ink), dark = white at 8-12% (about 0.18 at the high end only for very dark surfaces); the ring must differ from the *surface it surrounds* by ΔL >= 0.04 to be visible.
  **Why** a ring that matches its own fill disappears; one source uses 0.18 white on dark and flags 0.07 as marginal [secondary].
  **Applies to** all. **Check** compute composited ring colour vs card and page.
  **Source** secondary.
- **RULE** Inner highlight: `inset 0 1px 0 oklch(1 0 0 / 0.05-0.08)` on dark raised surfaces and primary buttons; on light buttons use `inset 0 1px 0 oklch(1 0 0 / 0.5)` over a fill that is darker than the highlight. Only the top edge.
  **Why** simulates a bevel catching overhead light; it is the cheapest "premium" cue and is invisible when subtle.
  **Applies to** dark UI, buttons. **Check** exactly one inset layer, top edge only, alpha <= 0.10 on dark.
  **Source** secondary example; [engine note].
- **RULE** Accent borders: a thick coloured border or a left "side-tab" stripe on an ordinary card is a tell; reserve for actual status (alert, callout).
  **Why** flagged as tell: makes cards read as alerts [verified: Impeccable].
  **Applies to** cards. **Check** `border-left-width >= 3px` with chromatic colour only on `[role=alert|status]`.
  **Source** impeccable.style/slop.
- **RULE** Image outlines: images on tinted surfaces get a 1px inset ring at 6-10% ink (`outline: 1px solid oklch(0 0 0 / .08); outline-offset: -1px`) to keep edges crisp when the image's border colour matches the surface.
  **Why** prevents edge bleed on white-on-white photos.
  **Applies to** photography, product shots. **Check** screenshot crop of image edges.
  **Source** [engine note].

### H. Glass, blur, backdrop

- **RULE** `backdrop-filter` is an overlay material for a few surfaces that genuinely sit over moving/varied content (sticky nav, command palette, floating toolbars, media captions). Maximum ~3-4 glass layers visible in a viewport; blur <= ~20px on large areas; never animate blur radius, animate opacity instead.
  **Why** the browser re-composites everything behind the element each frame; Safari is the usual weak point; numbers are practitioner heuristics, not vendor guidance [secondary; web.dev says "test before deploying"].
  **Applies to** all. **Check** count elements with `backdrop-filter` in viewport <= 4; no transition on `backdrop-filter`.
  **Source** web.dev; search summaries.
- **RULE** Glass recipe: `background: oklch(1 0 0 / 0.72)` (light) or `oklch(0.2 0.01 H / 0.75)` (dark) + `backdrop-filter: blur(16px) saturate(1.4-1.8)` + 1px inner ring (white 50% light / white 8% dark). Provide a solid fallback inside `@supports not (backdrop-filter: blur(1px))` at alpha 0.95.
  **Why** blur averages colours and drains saturation, so saturate() restores it; Comeau's defaults blur(16px), demo `blur(8px) brightness(90%) saturate(140%)`; the overlay must be at least partly transparent or the filter has nothing to show [verified: Comeau, web.dev]. Support: Chrome 76, Edge 79, Firefox 103, Safari 18 unprefixed (earlier Safari needs `-webkit-`) [verified: web.dev].
  **Applies to** all. **Check** alpha < 1, filter present with both prefixed and unprefixed declarations, fallback block exists.
  **Source** Comeau backdrop-filter; web.dev.
- **RULE** Contrast on glass is computed against the worst backdrop. Light glass (white) with `#1b1a19` ink: alpha 0.6 gives 6.1:1 over black, 0.7 gives 8.2:1, 0.8 gives 10.8:1; ink-2 (`#52504e`) needs alpha >= 0.9 over black for 6.4:1. Dark glass (`#171614`) with `#f3f1f0` ink: alpha 0.6 gives 4.2:1 over white, 0.7 gives 5.9:1, 0.8 gives 8.5:1.
  **Why** text legibility must hold over any content that scrolls underneath [computed].
  **Applies to** nav bars, overlays. **Check** `alpha >= 0.7` for body text over unknown content, or constrain the backdrop.
  **Source** [computed].
- **RULE** Header blur edge: put the backdrop on a child that extends below the header and mask it (`mask-image: linear-gradient(to bottom, black 50%, transparent)`), `pointer-events: none`; `overflow: hidden`/`clip-path` can remove the blur source in Chrome. Add an opaque-to-transparent gradient at the top of the backdrop to hide flicker from off-screen content.
  **Why** backdrop-filter only samples the element's own box and ignores off-screen content [verified: Comeau].
  **Applies to** sticky headers. **Check** visual.
  **Source** Comeau backdrop-filter.
- **RULE** Do not use glass because "glass looks modern"; use it where a layer needs to stay legible while keeping spatial context. "Glassmorphism everywhere" (blur, glow borders, glowing orbs) is a tell.
  **Why** [verified: Impeccable].
  **Applies to** all. **Check** glass surfaces <= 2 on a marketing page.
  **Source** impeccable.style/slop.

### I. Grain and texture

- **RULE** Grain: a 150-250px tiling SVG `feTurbulence` (`type='fractalNoise' baseFrequency=0.8-0.9 numOctaves=2-3 stitchTiles='stitch'`) desaturated with `feColorMatrix type='saturate' values='0'`, at opacity 0.03-0.08, `pointer-events: none`, on a fixed pseudo-element (or tiled PNG, 2-6 KB). Above ~3 octaves the cost outweighs the look; above 0.15 opacity it reads as dirt.
  **Why** fixes banding and removes the "flat vector" feel; full-screen SVG filters are expensive to rasterise, tiled bitmap is cheaper [secondary].
  **Applies to** hero, dark gradients, paper palettes. **Check** one grain layer per page; opacity in [0.03, 0.10].
  **Source** Frontend Masters / CSS-Tricks via search [secondary]; tune by eye.
- **RULE** Set `color-interpolation-filters='sRGB'` on the filter and use a data-URI or external file (id references to inline SVG from CSS do not work).
  **Why** linearRGB default gives inconsistent results cross-browser [secondary].
  **Applies to** grain. **Check** visual.
  **Source** Ana Tudor via search [secondary].

### J. Data visualisation colour

- **RULE** Categorical: <= 6 hues on a page, <= 8 ever (Okabe-Ito has 8 incl. black; ColorBrewer qualitative maxima are Set1 9, Paired 12, Set3 12 and interpolating beyond them hurts distinguishability). Beyond 6, use direct labels/small multiples instead of more hues.
  **Why** working-memory and CVD limits.
  **Applies to** dashboards. **Check** distinct series colours <= 6.
  **Source** ColorBrewer docs, Okabe-Ito via search [secondary].
- **RULE** Use the computed sets in `palette-recipes.md` (6 or 8 colours, light and dark) as defaults: each colour >= 3:1 on its background, min pairwise OKLab distance x100 >= 14.6 (6-set) / 11.1 (8-set), and CVD-simulated (protan/deutan/tritan, Machado 2009 matrices, severity 1.0) distance weighted 1.25x. Okabe-Ito scores 9.5 on the same metric and its yellow is 1.3:1 on white, so it needs outlines on light backgrounds.
  **Why** [computed]; not a clinical CVD guarantee, always add direct labels, patterns or markers.
  **Applies to** charts. **Check** run `dv.py score()`.
  **Source** [computed].
- **RULE** Sequential: single hue, lightness carries the value (light = low), L from ~0.95 down to ~0.35 in >= 5 steps; diverging: two hues meeting at a neutral mid, equal L at both ends. Never rainbow for ordered data.
  **Why** lightness ordering is the one thing the eye reads reliably as magnitude [ColorBrewer summary, secondary].
  **Applies to** heatmaps, choropleths. **Check** L monotone along the scale.
  **Source** ColorBrewer docs [secondary].
- **RULE** Series 1 = brand accent; error/success states are not reused as series colours.
  **Why** red/green series are read as good/bad.
  **Applies to** dashboards. **Check** hue distance of series colours to state hues >= 25 degrees, or documented.
  **Source** [engine note].

### K. Colour psychology and escaping the "AI palette"

- **RULE** Do not assert "colour X causes Y" in a design rationale. Use: category convention (finance = restrained, food = warm), cultural fit, differentiation from the three nearest competitors, and legibility.
  **Why** associations are consistent (N = 4,598, 30 nations, r = .88) but behavioural effects are fragile; Elliot et al. 2007 effect sizes d = -0.51 to -1.14 failed several close replications [secondary].
  **Applies to** all. **Check** rationale text contains no unsourced causal colour claims.
  **Source** Jonauskaite et al. 2020; replication summaries (search).
- **RULE** Delete the default tells unless the brief earns them: purple/indigo-to-blue gradient on buttons, text and backgrounds; cyan or neon on near-black; radial glow halo / spotlight behind content; gradient headline text; reflexive cream/beige page; glow borders; nested cards each with shadow; grid-line decorative backgrounds; repeating-gradient stripes; hairline border plus wide shadow on the same card.
  **Why** these are the statistically common defaults (Tailwind's long-time `indigo-500` demo colour is the commonly cited origin, though the attribution is secondhand) so they signal "generated" [verified list: Impeccable; origin story secondary].
  **Applies to** all. **Check** detectors: gradient with both hue in [250,300] and L diff > 0.1; `background-clip:text` + gradient; `box-shadow` with chromatic colour on non-indicator; page background hue 70-95 with C 0.01-0.03 and L > 0.95 **and** a coral/terracotta accent (hue 25-45) simultaneously.
  **Source** impeccable.style/slop; prg.sh / dev.to summaries.
- **RULE** Escape by constraint, not by contrarianism: (1) choose the palette from the brand archetype table in `palette-recipes.md`, (2) pick a hue *outside* 240-300 unless the brief demands it, (3) if purple is right, make it a deep jewel (L 0.42, C 0.15) with warm ochre secondary and **no gradient** (`grape-jewel`), (4) if cream is right, pair it with a non-coral accent (ink-blue, oxblood, olive) and a real typographic voice (`warm-paper`, `adobe-dual`), (5) if dark is right, drop chroma and glows and let one amber/phosphor accent do the work (`nocturnal-low-chroma`).
  **Why** each tell is a default of *combination*, not of single colours; changing two of {hue, gradient, glow, surface} usually breaks the pattern credibly.
  **Applies to** all. **Check** palette ID recorded in brief; similarity check against last N palettes (hue distance of accent >= 40 degrees or neutral hue distance >= 60).
  **Source** [engine note] built on Impeccable list.
- **RULE** The inverse also holds: a distinct palette with generic layout is still a template. Colour variety does not replace type, composition and imagery decisions.
  **Why** the tells co-occur with stock page order and identical fade-and-slide motion [secondary].
  **Applies to** all. **Check** n/a (judgement).
  **Source** search summary of "7 Tells that a UI is AI-Generated" [secondary].

---

## 3. Numbers & scales

### 3.1 Measured Radix 12-step ladders in OKLCH [computed from radix-ui/colors light.ts, dark.ts]

| Step | Role | gray L (light) | blue L / C / H (light) | gray L (dark) | blue L / C / H (dark) |
|---|---|---|---|---|---|
| 1 | app bg | 0.991 | 0.993 / 0.003 / 248 | 0.178 | 0.194 / 0.025 / 256 |
| 2 | subtle bg | 0.982 | 0.982 / 0.009 / 243 | 0.213 | 0.213 / 0.030 / 261 |
| 3 | component bg | 0.955 | 0.960 / 0.020 / 239 | 0.252 | 0.274 / 0.066 / 254 |
| 4 | hover | 0.931 | 0.938 / 0.035 / 235 | 0.285 | 0.320 / 0.097 / 252 |
| 5 | pressed | 0.907 | 0.905 / 0.051 / 240 | 0.313 | 0.367 / 0.106 / 251 |
| 6 | subtle border | 0.885 | 0.863 / 0.068 / 243 | 0.348 | 0.416 / 0.113 / 252 |
| 7 | border | 0.851 | 0.810 / 0.089 / 243 | 0.402 | 0.474 / 0.122 / 253 |
| 8 | strong border/ring | 0.792 | 0.734 / 0.121 / 243 | 0.489 | 0.541 / 0.140 / 253 |
| 9 | solid | 0.643 | 0.649 / 0.193 / 252 | 0.538 | 0.649 / 0.193 / 252 |
| 10 | solid hover | 0.610 | 0.622 / 0.183 / 252 | 0.583 | 0.688 / 0.169 / 251 |
| 11 | low-contrast text | 0.503 | 0.556 / 0.162 / 252 | 0.770 | 0.764 / 0.126 / 249 |
| 12 | high-contrast text | 0.244 | 0.324 / 0.096 / 259 | 0.949 | 0.907 / 0.051 / 238 |

Measured contrast of text steps on step 2 of the same scale [computed, my APCA implementation]:

| scale | step 12 WCAG / Lc | step 11 WCAG / Lc |
|---|---|---|
| gray light | 15.5 / 100 | 5.6 / 76 |
| blue light | 12.0 / 95 | 4.5 / 69 |
| green light | 11.7 / 94 | 4.5 / 69 |
| amber light | 10.9 / 93 | 4.4 / 69 (just under 4.5 WCAG) |
| red light | 11.8 / 94 | 4.9 / 70 |
| gray dark | 15.2 / 96 | 8.5 / 61 |
| blue dark | 13.5 / 87 | 8.4 / 60 |
| green dark | 13.7 / 88 | 9.4 / 66 |
| amber dark | 14.6 / 93 | 11.5 / 78 |

Radix documents step 11/12 as >= Lc 60 / Lc 90 on step 2; measured values meet or exceed these with the constants used here. Note that amber step 11 on step 2 is 4.4:1 by WCAG, i.e. Radix steps are not WCAG-AA-guaranteed for every hue [computed].

Radix amber hue by step (light): 85, 99, 100, 98, 98, 93, 87, 77, 84, 81, 64, 54. Red: 17, 17, 14, 16, 17, 18, 18, 19, 23, 24, 25, 17.

Radix gray (pure, C = 0) hex, light: `#fcfcfc #f9f9f9 #f0f0f0 #e8e8e8 #e0e0e0 #d9d9d9 #cecece #bbbbbb #8d8d8d #838383 #646464 #202020`; dark: `#111111 #191919 #222222 #2a2a2a #313131 #3a3a3a #484848 #606060 #6e6e6e #7b7b7b #b4b4b4 #eeeeee` [verified: repo files].

### 3.2 Tinted neutrals: Tailwind v4 reference (L / C / H) [verified: tailwindcss.com/docs/colors]

| ramp | 50 | 200 | 500 | 800 | 950 |
|---|---|---|---|---|---|
| slate | 98.4% 0.003 248 | 92.9% 0.013 256 | 55.4% 0.046 257 | 27.9% 0.041 260 | 12.9% 0.042 265 |
| zinc | 98.5% 0 0 | 92% 0.004 286 | 55.2% 0.016 286 | 27.4% 0.006 286 | 14.1% 0.005 286 |
| neutral | 98.5% 0 0 | 92.2% 0 0 | 55.6% 0 0 | 26.9% 0 0 | 14.5% 0 0 |
| stone | 98.5% 0.001 106 | 92.3% 0.003 49 | 55.3% 0.013 58 | 26.8% 0.007 34 | 14.7% 0.004 49 |
| taupe | 98.6% 0.002 68 | 92.2% 0.005 34 | 54.7% 0.021 43 | 26.8% 0.011 37 | 14.7% 0.004 49 |
| mauve | 98.5% 0 0 | 92.2% 0.005 326 | 54.2% 0.034 323 | 26.3% 0.024 320 | 14.5% 0.008 326 |
| mist | 98.7% 0.002 197 | 92.5% 0.005 214 | 56% 0.021 214 | 27.5% 0.011 217 | 14.8% 0.004 229 |
| olive | 98.8% 0.003 107 | 93% 0.007 107 | 58% 0.031 107 | 28.6% 0.016 107 | 15.3% 0.006 107 |

Other Tailwind 500s: blue `oklch(62.3% 0.214 260)`, emerald `oklch(69.6% 0.17 162)`, amber `oklch(76.9% 0.188 70)`, rose `oklch(64.5% 0.246 16)` (chromas that exceed sRGB; Tailwind targets P3 with sRGB fallback) [verified].

### 3.3 Contrast metrics

| Fact | Value | Status |
|---|---|---|
| WCAG normal text | 4.5:1 | verified |
| WCAG large text | 3:1 where large = >= 18pt (24px) or >= 14pt bold (~18.7px) | verified |
| WCAG non-text UI | 3:1 | verified (1.4.11) |
| WCAG formula | (L1+0.05)/(L2+0.05); L = .2126R+.7152G+.0722B; channel = c/12.92 if c <= 0.04045 else ((c+.055)/1.055)^2.4; no rounding | verified |
| APCA Lc anchors | 15 invisibility, 30 spot/non-text min, 45 large fluent/sub-fluent min, 60 medium >24px, 75 body min, 90 body preferred; max 90 for text > 24px at weight >= 300 | verified (Myndex) |
| APCA adjustments | body text: add 15 to table values below 75; sub-fluent -15 (not below 30); non-fluent spot text (placeholder, disabled, copyright) -25 (not below 30) | verified |
| Stripe lightness rule | 5 levels apart = small text; 4 levels = icons / large text | verified |
| Approx WCAG to APCA | 3:1 ~ Lc 45, 4.5:1 ~ Lc 60, 7:1 ~ Lc 75 only near `#9e9e9e`; elsewhere they diverge | secondary (Myndex) |

**WCAG vs APCA divergence on neutral greys** [computed]:

| WCAG target | grey on white | Lc on white | grey on `#0f0f0f` | Lc on `#0f0f0f` | grey on `#1a1a1a` | Lc on `#1a1a1a` |
|---|---|---|---|---|---|---|
| 3:1 | `#949494` | 57 | `#5f5f5f` | -20 | `#666666` | -22 |
| 4.5:1 | `#767676` | 72 | `#7b7b7b` | -32 | `#828282` | -34 |
| 7:1 | `#595959` | 84 | `#9d9d9d` | -49 | `#a5a5a5` | -52 |
| 12:1 | `#363636` | 98 | `#cdcdcd` | -76 | `#d7d7d7` | -81 |

Reverse: Lc 60 needs WCAG 3.28 on white but WCAG 9.04 on `#0f0f0f`; Lc 75 needs 5.10 on white but 11.94 on `#0f0f0f`; Lc 90 needs 8.86 vs 15.08. Practical consequence used by the palettes: dark-mode secondary text sits at L ~0.85 and tertiary at ~0.77 (WCAG 9-12), not at the WCAG-minimum L ~0.6.

**APCA minimum Lc by size/weight (older SAPC table, Myndex silver method page)** [verified; confirm constants against current apca-w3]:

| px | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|
| 12 | n/a | 100 | 90 | 85 | 80 | 75 | 70 |
| 14 | n/a | 90 | 85 | 80 | 75 | 70 | 65 |
| 16 | n/a | 85 | 80 | 75 | 70 | 65 | 60 |
| 18 | 100 | 80 | 75 | 70 | 65 | 60 | 58 |
| 20 | 90 | 77 | 70 | 65 | 60 | 58 | 57 |
| 24 | 80 | 73 | 67 | 60 | 58 | 57 | 56 |
| 28 | 70 | 67 | 60 | 56 | 54 | 56 | 52 |
| 32 | 60 | 60 | 55 | 52 | 50 | 49 | 48 |
| 36 | 58 | 53 | 50 | 48 | 47 | 46 | 44 |
| 48 | 54 | 47 | 46 | 45 | 44 | 43 | 42 |
| 64 | 50 | 40 | 40 | 40 | 40 | 40 | 40 |

(weights 100/200 omitted: need very large sizes; e.g. 36px/100 = 120, 24px/200 = 100.)

### 3.4 Material tone roles [verified: material-color-utilities scheme.dart]

| Role | Light tone | Dark tone |
|---|---|---|
| primary / on-primary | 40 / 100 | 80 / 20 |
| primary container / on-container | 90 / 10 | 30 / 90 |
| background = surface / on-surface | 99 / 10 | 10 / 90 |
| surface variant / on-surface variant | 90 / 30 | 30 / 80 |
| outline / outline variant | 50 / 80 | 60 / 30 |
| inverse surface / inverse on-surface | 20 / 95 | 90 / 20 |
| inverse primary | 80 | 40 |
| shadow, scrim | 0 | 0 |

Material 2 dark elevation overlays (white on `#121212`) [secondary]: 0dp 0%, 1dp 5%, 2dp 7%, 3dp 8%, 4dp 9%, 6dp 11%, 8dp 12%, 12dp 14%, 16dp 15%, 24dp 16%; body text on surface >= 15.8:1. M3 replaced overlays with a "surface tint".

### 3.5 Shadow token sets (exact)

**Tailwind v4 defaults** [verified]
```css
--shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
--inset-shadow-xs:  inset 0 1px 1px rgb(0 0 0 / 0.05);
--inset-shadow-sm:  inset 0 2px 4px rgb(0 0 0 / 0.05);
```

**Josh Comeau (light source offset x:y = 1:2, blur = y, opacity falls with elevation)** [verified]
```css
/* --shadow-color: hsl components of the surface hue at lowered saturation/lightness */
small:  0.5px 1px 1px hsl(var(--shadow-color) / 0.7);
medium: 1px 2px 2px hsl(var(--shadow-color) / 0.333), 2px 4px 4px hsl(var(--shadow-color) / 0.333), 3px 6px 6px hsl(var(--shadow-color) / 0.333);
large:  1px 2px 2px hsl(var(--shadow-color) / 0.2), 2px 4px 4px hsl(var(--shadow-color) / 0.2), 4px 8px 8px hsl(var(--shadow-color) / 0.2), 8px 16px 16px hsl(var(--shadow-color) / 0.2), 16px 32px 32px hsl(var(--shadow-color) / 0.2);
```

**Radix Themes `--shadow-1..6`, light** [verified: themes repo tokens/shadow.css; `a` = alpha steps of the scale]
```css
--shadow-1: inset 0 0 0 1px var(--gray-a5), inset 0 1.5px 2px 0 var(--gray-a2), inset 0 1.5px 2px 0 var(--black-a2); /* inset: inputs */
--shadow-2: 0 0 0 1px var(--gray-a3), 0 0 0 0.5px var(--black-a1), 0 1px 1px 0 var(--gray-a2), 0 2px 1px -1px var(--black-a1), 0 1px 3px 0 var(--black-a1);
--shadow-3: 0 0 0 1px var(--gray-a3), 0 2px 3px -2px var(--gray-a3), 0 3px 12px -4px var(--black-a2), 0 4px 16px -8px var(--black-a2);
--shadow-4: 0 0 0 1px var(--gray-a3), 0 8px 40px var(--black-a1), 0 12px 32px -16px var(--gray-a3);
--shadow-5: 0 0 0 1px var(--gray-a3), 0 12px 60px var(--black-a3), 0 12px 32px -16px var(--gray-a5);
--shadow-6: 0 0 0 1px var(--gray-a3), 0 12px 60px var(--black-a3), 0 16px 64px var(--gray-a2), 0 16px 36px -20px var(--gray-a7);
```
Dark (same shape, stronger): ring `gray-a6`, black alphas 3-7, e.g. `--shadow-3: 0 0 0 1px var(--gray-a6), 0 2px 3px -2px var(--black-a3), 0 3px 8px -2px var(--black-a6), 0 4px 12px -4px var(--black-a7);` `--shadow-4: 0 0 0 1px var(--gray-a6), 0 8px 40px var(--black-a3), 0 12px 32px -16px var(--black-a5);`. With `color-mix` support the ring becomes `color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%)`.

**Material 3 elevation geometry (key shadow + ambient shadow, offset-y / blur / spread px)** [verified from material-web `_elevation.scss` comments; colour = shadow colour token, M3 spec opacities key .30 / ambient .15 are an engine note]

| level | key | ambient |
|---|---|---|
| 0 | 0 0 0 | 0 0 0 0 |
| 1 | 0 1 2 0 | 0 1 3 1 |
| 2 | 0 1 2 0 | 0 2 6 2 |
| 3 | 0 1 3 0 | 0 4 8 3 |
| 4 | 0 2 3 0 | 0 6 10 4 |
| 5 | 0 4 4 0 | 0 8 12 6 |

**Engine elevation scale** [engine note, derived from the patterns above: layer y doubles, blur = 2y, spread = -y/2 on large layers, alpha falls with elevation; not yet rendered/eyeballed, verify in the render loop]. `--sh-h` = the palette's neutral hue.

```css
:root {                                   /* light */
  --sh-h: 235;
  --sh: 0.30 0.04 var(--sh-h);            /* L C H of the shadow ink */
  --ring: oklch(var(--sh) / 0.10);
  --e0: none;
  --e1: 0 0 0 1px var(--ring), 0 1px 2px -1px oklch(var(--sh) / 0.14);
  --e2: 0 0 0 1px var(--ring), 0 1px 1px oklch(var(--sh) / 0.04), 0 2px 4px -1px oklch(var(--sh) / 0.08), 0 4px 8px -2px oklch(var(--sh) / 0.08);
  --e3: 0 0 0 1px var(--ring), 0 2px 2px oklch(var(--sh) / 0.04), 0 6px 12px -3px oklch(var(--sh) / 0.10), 0 14px 28px -8px oklch(var(--sh) / 0.12);
  --e4: 0 0 0 1px var(--ring), 0 4px 4px oklch(var(--sh) / 0.04), 0 12px 24px -6px oklch(var(--sh) / 0.12), 0 32px 64px -16px oklch(var(--sh) / 0.20);
  --e5: 0 0 0 1px var(--ring), 0 8px 8px oklch(var(--sh) / 0.04), 0 20px 40px -10px oklch(var(--sh) / 0.14), 0 56px 96px -24px oklch(var(--sh) / 0.28);
}
[data-theme="dark"] {                     /* dark: ring + top highlight + heavier black */
  --ring: oklch(1 0 0 / 0.09);
  --hl: inset 0 1px 0 oklch(1 0 0 / 0.05);
  --e0: none;
  --e1: 0 0 0 1px var(--ring), var(--hl);
  --e2: 0 0 0 1px var(--ring), var(--hl), 0 2px 4px -1px oklch(0 0 0 / 0.40), 0 4px 8px -2px oklch(0 0 0 / 0.35);
  --e3: 0 0 0 1px var(--ring), var(--hl), 0 6px 12px -3px oklch(0 0 0 / 0.45), 0 14px 28px -8px oklch(0 0 0 / 0.40);
  --e4: 0 0 0 1px var(--ring), var(--hl), 0 12px 24px -6px oklch(0 0 0 / 0.50), 0 32px 64px -16px oklch(0 0 0 / 0.55);
  --e5: 0 0 0 1px var(--ring), var(--hl), 0 20px 40px -10px oklch(0 0 0 / 0.55), 0 56px 96px -24px oklch(0 0 0 / 0.65);
}
```
Surface pairing: e1 on `surface-card`, e2 on hovered card, e3 on `surface-raised` (popover, menu), e4 on `surface-raised` (dialog), e5 on dragged item. In dark mode raise the surface lightness +0.035 per level as well (page 0.17, card 0.205, raised 0.24).

### 3.6 Gradient recipes (CSS)

Replace `--h` with the palette neutral/accent hue. All use explicit interpolation.

```css
/* G1 tonal wash (page or section): same hue, ΔL ~0.04, ΔC ~0.01 */
background: linear-gradient(in oklab 180deg, oklch(0.985 0.006 var(--h)) 0%, oklch(0.945 0.014 var(--h)) 100%);

/* G2 hue drift (hero card or button sheen): constant L/C, ΔH 40 */
background: linear-gradient(135deg in oklch shorter hue, oklch(0.78 0.11 var(--h)), oklch(0.74 0.11 calc(var(--h) + 40)));

/* G3 soft aurora (layered radials, light surface): same-hue transparent ends, no 'transparent' keyword */
background:
  radial-gradient(60% 50% at 15% 10%, oklch(0.88 0.08 var(--h) / 0.55), oklch(0.88 0.08 var(--h) / 0) 70%),
  radial-gradient(50% 45% at 85% 20%, oklch(0.90 0.07 calc(var(--h) + 35) / 0.45), oklch(0.90 0.07 calc(var(--h) + 35) / 0) 70%),
  radial-gradient(70% 60% at 50% 110%, oklch(0.92 0.05 calc(var(--h) - 30) / 0.50), oklch(0.92 0.05 calc(var(--h) - 30) / 0) 70%),
  oklch(0.985 0.006 var(--h));

/* G4 dark vignette, directional (light from above), alpha <= 0.14. NOT a centred neon halo */
background:
  radial-gradient(120% 70% at 50% -20%, oklch(0.50 0.10 var(--h) / 0.14), oklch(0.50 0.10 var(--h) / 0) 60%),
  oklch(0.17 0.014 var(--h));

/* G5 edge-light sheen on a dark card (pair with ring + top highlight, no second border) */
background:
  linear-gradient(180deg in oklab, oklch(1 0 0 / 0.06), oklch(1 0 0 / 0) 40%),
  oklch(0.205 0.014 var(--h));

/* G6 conic sheen ring (gradient border, low chroma). Needs mask-composite; keep chroma <= 0.06 */
.sheen { position: relative; }
.sheen::before { content:""; position:absolute; inset:0; padding:1px; border-radius:inherit;
  background: conic-gradient(from 210deg in oklch, oklch(0.80 0.04 var(--h)), oklch(0.95 0.01 var(--h)), oklch(0.70 0.05 calc(var(--h) + 40)), oklch(0.80 0.04 var(--h)));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }

/* G7 eased scrim for text on photos (bottom up). Linear black ramps show a visible edge; ease-in-out cubic alpha stops, max 0.8 */
background: linear-gradient(to top in oklab,
  oklch(0.15 0.02 var(--h) / 0.800) 0%,   oklch(0.15 0.02 var(--h) / 0.794) 12.5%,
  oklch(0.15 0.02 var(--h) / 0.750) 25%,  oklch(0.15 0.02 var(--h) / 0.631) 37.5%,
  oklch(0.15 0.02 var(--h) / 0.400) 50%,  oklch(0.15 0.02 var(--h) / 0.169) 62.5%,
  oklch(0.15 0.02 var(--h) / 0.050) 75%,  oklch(0.15 0.02 var(--h) / 0.006) 87.5%,
  oklch(0.15 0.02 var(--h) / 0) 100%);

/* G8 grain overlay (one per page). Tiled SVG feTurbulence, unrendered here: tune opacity 0.03-0.08 by eye */
.grain::after { content:""; position:fixed; inset:0; pointer-events:none; opacity:.06; mix-blend-mode: multiply; /* overlay on dark */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
```
Eased-scrim stops are the computed `easeInOutCubic` values at 12.5% steps times 0.8 [computed]. Mesh-gradient honesty: CSS has no mesh primitive; G3 (3-4 radials over a flat colour) is the lightweight equivalent, a canvas/WebGL shader is the real thing (see `motion-and-animation.md`).

### 3.7 Glass recipes

```css
.glass { background: oklch(1 0 0 / 0.72); backdrop-filter: blur(16px) saturate(1.5); -webkit-backdrop-filter: blur(16px) saturate(1.5);
  box-shadow: 0 0 0 1px oklch(1 0 0 / 0.5) inset, var(--e3); }
[data-theme="dark"] .glass { background: oklch(0.20 0.012 var(--h) / 0.75); box-shadow: 0 0 0 1px oklch(1 0 0 / 0.08) inset, var(--e3); }
@supports not (backdrop-filter: blur(1px)) { .glass { background: oklch(0.99 0.004 var(--h) / 0.95); } }
```

Worst-case glass contrast [computed]: light glass = white at alpha over backdrop; ink `#1b1a19` / ink-2 `#52504e`.

| alpha | over black | over `#808080` | over white | over `#2563eb` |
|---|---|---|---|---|
| 0.5 | 4.4 / 2.0 | 9.6 / 4.4 | 17.4 / 8.0 | 8.1 / 3.8 |
| 0.6 | 6.1 / 2.8 | 10.8 / 5.0 | 17.4 / 8.0 | 9.6 / 4.4 |
| 0.7 | 8.2 / 3.8 | 12.3 / 5.7 | 17.4 / 8.0 | 11.2 / 5.2 |
| 0.8 | 10.8 / 5.0 | 13.9 / 6.4 | 17.4 / 8.0 | 13.1 / 6.0 |
| 0.9 | 13.9 / 6.4 | 15.5 / 7.2 | 17.4 / 8.0 | 15.1 / 7.0 |

Dark glass = `#171614` at alpha over backdrop, ink `#f3f1f0`: alpha 0.5: 17.5 black / 7.7 grey / 3.1 white; 0.6: 17.2 / 9.2 / 4.2; 0.7: 17.0 / 10.7 / 5.9; 0.8: 16.7 / 12.6 / 8.5; 0.9: 16.4 / 14.3 / 12.2.

### 3.8 Banding arithmetic [computed]

| from | to | width | distinct levels | band width |
|---|---|---|---|---|
| `#0f1115` | `#151a24` | 1440px | 15 | 96px |
| `#0b0b0f` | `#1a1a24` | 1440px | 21 | 69px |
| `#fcf9f7` | `#f2efed` | 1440px | 10 | 144px |
| `#ffffff` | `#e8eaf0` | 1440px | 23 | 63px |

### 3.9 Categorical data-viz sets [computed; see `palette-recipes.md` for hex/oklch]
6-colour sets reach min pairwise OKLab distance x100 of 14.6 (light) / 15.3 (dark); 8-colour sets reach 11.1 / 11.2. Okabe-Ito (`#E69F00 #56B4E9 #009E73 #F0E442 #0072B2 #D55E00 #CC79A7 #000000`) scores 9.5 on the same metric [hex secondary].

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Tonal page: `oklch(0.975 0.010 235)` with card `oklch(0.995 0.003 235)` | `#ffffff` page + `#f3f4f6` cards + `#e5e7eb` borders at pure grey | tint reads as chosen; pure grey stack reads as default |
| Dark page `oklch(0.17 0.014 240)`, ink-1 `oklch(0.95 0.011 240)` | `#000` page + `#fff` text, or `#0a0a0a` + neon | halation, glow tells |
| Dark secondary text at L ~0.85 / tertiary ~0.77 | Dark secondary text at `#6b7280` (4.5:1 but Lc ~35) | WCAG passes, APCA fails |
| `accent` fill and `accent-text` as two tokens | One lime/orange token used for both a button and a link | fill vs text have different L requirements |
| Shadow stack starting with a 1px ring then 2-4 soft layers, hue-tinted | `box-shadow: 0 4px 6px rgba(0,0,0,.3)` on every card + a 1px border | single dark shadow + border = double edge |
| `linear-gradient(in oklab 160deg, ...)` | `linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)` | indigo-violet-pink is the tell; sRGB mid-tone mud |
| Layered radials fading to same-colour alpha 0, then 4-6% grain | One huge centred blue/purple glow behind the hero | halo = tell, banding |
| Glass on a sticky nav only, alpha >= 0.7, blur 12-16px | Every card frosted, blur 40px, animated on hover | cost + "glass everywhere" tell |
| Status by icon + text + colour | Red/green dots only | WCAG 1.4.1 |
| 5-6 data hues with direct labels | 10 pastel hues + legend | distinguishability |

---

## 5. Exceptions & judgement calls

- **Lime/orange/yellow brands vs APCA.** A dark label on a pure signal fill passes WCAG easily but sits at Lc ~50 (orange) because APCA penalises small text on mid-luminance fills. Options: larger/bolder label (>= 18px/700), deeper fill with white label, or accept as a documented brand exception. Do not "fix" by washing the fill to peach unless the brand allows it (`signal-orange` demonstrates the trade-off: Lc 60 forces `#ff9359`).
- **APCA is not (yet) a legal standard.** WCAG 2.x is what conformance tests use; APCA is the better perceptual model and is in WCAG 3 drafts. Gate on both; if they conflict on a specific pair, WCAG 2 AA is the floor and APCA the target. The older SAPC size/weight table above may differ from the latest `fontLookupAPCA` constants.
- **Purple/indigo is not wrong, it is overused.** The tell is the *combination* (violet-blue gradient + glow + dark). Jewel purple with flat fills and a warm secondary is a legitimate identity. Hue 240-300 is also the safest hue for "info"; only the accent role needs differentiation.
- **Cream/beige backgrounds** are tells only when they are the *only* idea. Paper palettes carry content-heavy, editorial brands credibly when the typographic system and accent (oxblood, ink, olive) are specific.
- **Mono/Swiss palettes** deliberately use C <= 0.002 neutrals. That is a different intent from dead grey; it needs strong type and one saturated accent to work.
- **Radix says do not customise its scales** (customisation likely breaks balance and accessibility) and its 12-step jobs do not guarantee WCAG AA on every hue (amber step 11 = 4.4:1). Use them as proven ladders, but verify each shipped pair.
- **Dark mode shadows vs lightness steps.** Some systems (Tailwind guidance in one source) prefer borders over shadows on dark; Radix keeps shadows but adds a ring. Both agree the ring/border carries the edge. Pick the lightness-step + ring route for flat product UI; use shadow only for floating layers.
- **Hue-shift "warmer highlights, cooler shadows"** (Refactoring UI's heuristic of rotating hue when lightening/darkening) is not in the page text fetched here; the measured Radix ladders show only small drift except amber/yellow. Treat hue rotation as optional and verify by eye.
- **Perceptual uniformity is approximate.** Oklab was fitted to CAM16-derived data, not new human experiments; blue at high chroma still looks darker than its L suggests to many viewers. Always check the render.
- **Gamut mapping behaviour of browsers is in flux.** The source article reports Chrome/Safari clipped at the time of writing while CSS Color 4 requires chroma reduction; assume neither and keep production chroma in sRGB with the P3 upgrade as optional.

---

## 6. Figures worth keeping

Web research note, no corpus pages. Worth capturing as `examples/` screenshots when the render tool exists: Radix colors scale page (12-step grid), Linear before/after theme, Stripe accessible-colour-system diagrams, Comeau's shadow demos, Tailwind palette page.

---

## 7. Open questions

1. **Shadow scale unrendered.** The engine elevation scale (3.5) and the glass/grain/gradient snippets were reasoned from verified patterns, not eyeballed. A render-and-compare pass (light + dark, 3 backgrounds) should confirm opacities.
2. **CSS default gradient interpolation** for mixed/legacy colours is not verified in this session; the rule says to always declare it.
3. **Current APCA constants.** The size/weight table is from an older Myndex page; re-read `fontLookupAPCA` output from the current `apca-w3` before encoding thresholds as hard checks. Radix's Lc 60/90 claim reproduced as "at least" with the constants used here.
4. **Material 3 core-palette chroma values** are quoted from memory (engine note); `scheme.dart` only referenced `CorePalette`. HCT chroma units are not OKLCH chroma.
5. **Browser perf of backdrop-filter** has no primary benchmark; the "<= 20px, 3-4 layers" numbers are practitioner heuristics.
6. **"Cream + coral" as an AI tell** is only partly supported: cream/beige is listed (Impeccable); coral specifically was not found in any source. Treated here as "cream + an unconsidered accent".
7. **Tailwind indigo-500 origin story** and the "Wathan apology" are secondhand; use only as colour on the explanation, not as a cited fact.
8. **60-30-10** has no empirical test found; the 10% accent cap in rule D is an engine heuristic to be tuned against the ledger.
9. **Colour-vision simulation** uses Machado 2009 severity-1.0 matrices typed from memory of the published values (engine note); validate with a library (e.g. colorspace/culori) before relying on the numbers.
10. **Refactoring UI** full palette chapter (hue rotation, saturating greys, "don't rely on colour") was not accessible in the preview page; only the 9-shade method was verified. Pull from the book corpus if available.
