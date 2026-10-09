---
source: web:system token files and component source (Radix Themes, Radix Colors, Primer, Carbon, Material Web M3 tokens, Polaris, Atlassian tokens, shadcn/ui, coss ui, Untitled UI React, Lucide, Heroicons, Phosphor, Radix Icons, Apple HIG JSON, Google Material Symbols docs) + Playwright measurements of 20 live pages + 4 pixel labs, 2026-10-09
chapter: Consistency mechanics: how full design systems guarantee radius, icon centring, control ladders, type, depth and state grammar, and how the engine can specify and measure it
pages: n/a (web)
topic_tags: [consistency, radius, concentric, icons, icon-centering, optical-alignment, control-heights, padding, spacing, type-tuples, tabular-numerals, elevation, shadows, dark-mode, borders, state-grammar, enforcement, lint, check, founder-priority]
status: studied
---

# Consistency mechanics (radius, icon centring, ladders, depth, states, enforcement)

Founder priority (2026-10-09): "CONSISTENCY IS THE BIGGEST THING... roundness and icon centering, that's the main thing that always breaks: if an icon is not centered or anything." This note studies how the best full systems make those two things (and their neighbours) impossible to get wrong, and turns every mechanism into a table the engine fills per brand and a measurement `tools/check.mjs` can run.

Provenance tags used in **Source**: (T) read from a token file or component source; (D) documentation page; (M) measured live with Playwright (data in `knowledge/benchmarks/consistency/`); (L) measured in a controlled pixel lab (same folder); (E) `[engine note]`, our inference or default, not stated by the source. Deeper per-system context lives in `knowledge/systems-research/*.md` and `knowledge/benchmarks/alignui-method.md`; this note does not repeat it.

## 1. Core ideas

1. **The two things the founder sees break are structurally prevented in every serious system.** Across 20 public pages of 14 systems, 326 icon-only buttons were measured: 324 (99.4%) have the svg centre within 0.25 px of the button centre, 326 (100%) within 0.5 px (M). Those pages are built from components that centre with `inline-flex`/`inline-grid` plus fixed height. The icon "not centred" bug is therefore a hand-built-CSS bug (inline svg in a block, padding-based centring, mixed icon sets, odd/even sizes), not a hard problem. The engine should only ever centre through the contract below.
2. **Centring has four independent layers, and each can fail alone:** (a) box layer, the svg box is centred in the control (flex/grid, exact); (b) parity layer, `(box - icon)` is even so the offset is a whole pixel (Radix Themes buttons: 10 of 11 icon-only buttons on its button page have 32 px boxes with 15 px icons, a 0.5 px offset, M); (c) ink layer, the artwork is centred inside its own viewBox (10.4% of 1094 measured icons have ink offset above 0.5 px; Lucide play is +4.2% right on purpose, L); (d) text layer, icon centre vs the label's cap-height centre (up to 1.0 px apart per font at 13-16 px, L). Check all four, not only the first.
3. **Radius is chosen by a ratio knob and a grammar, not by eye.** Control radius / height clusters at 0.125 (Radix), 0.17-0.21 (Primer, Geist, Untitled), 0.22-0.25 (AlignUI), 0.28-0.36 (shadcn/coss), and the founder's soft ladder sits at 0.30-0.375. Systems then choose ONE grammar: constant radius for the whole ladder (Untitled UI 8 px from 32 to 48 px high, Primer 6) or stepped radius (Radix 3/4/6/8, Geist 4/6/6/8). Nested radii follow `outer - inset`, written as `calc()`, never typed.
4. **Heights come from line-height plus padding, never from font metrics.** Primer's `paddingBlock` tokens are exactly `(height - 20) / 2` (2, 4, 6, 10, 14 for 24, 28, 32, 40, 48); Untitled UI's heights 32/36/40/44/48 are `20 or 24 line-height + 2 x padding`; Carbon computes `(height - 1lh) / 2 - 1px`. A `line-height: normal` label makes heights drift (measured fractional control heights on github.com: 29.09 and 26.09 px).
5. **Icon sizes are a function of control height.** Measured icon-only pairs: 24/12, 28/14, 32/16, 36/18-20, 40/20, 44-48/20-24; icon = height / 2 for 24-40, capped at 20 px (24 in 48-56). Two valid families exist (16 px up to 36; or 20 px from 36), one per brand.
6. **Systems bind related values into one name.** Radix `size` sets height, padding, gap, font size, line-height and radius together; Primer `control-medium-*` sets height, padding, gap; AlignUI passes `size` from Root to every sub-part; Geist `text-label-14` sets size/line-height/tracking/weight. Nobody asks a designer to pick six numbers per control.
7. **Depth is a ring plus layers, and dark mode doubles the alphas.** Geist ring `#00000014` (light) becomes `#ffffff25` (dark); Atlassian `raised` shadow `#1E1F2140` becomes `#01040480` and `overlay` gains a 1 px `#BDBDBD1F` ring; Radix redefines all six shadows with `gray-a6` hairlines and `black-a3..a11`.
8. **State grammar is a ladder, not a list of effects.** Radix: bg step 3 default, 4 hover, 5 active; Geist: 1/2/3 fills and 4/5/6 borders; M3: state-layer opacities 0.08 hover, 0.10 focus, 0.10 pressed, 0.16 dragged, 0.38 disabled content. One disabled opacity, one focus recipe, hover never changes geometry.
9. **Enforcement is mostly tooling, then types, then review.** Primer ships stylelint rules for colours, spacing, typography, borders, box-shadow and widths; Carbon `stylelint-plugin-carbon-tokens`; Atlassian `eslint-plugin-design-system` (`ensure-design-token-usage`, `no-html-button`, `no-margin`, `no-dark-theme-vr-tests`); Primer runs Playwright snapshots of every colour swatch per theme (dark and dark-colorblind variants are in its snapshot folder). Primer even embeds LLM usage rules inside token JSON ("Use for small UI elements under 16px height. Do NOT use for buttons or cards."). The engine should do the same: usage constraints live in `tokens.json`, and `check.mjs` verifies the render.
10. **Two failure modes the benchmark systems still have, useful as engine tests:** Radix Themes Checkbox size 1 is a 14 px box with a 9 px indicator (2.5 px inset); shadcn Switch track is `h-[1.15rem]` = 18.4 px around a 16 px thumb (0.2 px slack, fractional). The engine's parity check would flag both.

## 2. Rules

Format per `SCHEMA.md`. Numbers are from the sources named; where a value is an engine default it says so in **Why** with (E).

### 2.1 Radius

- **RULE** Fill one radius table per brand before drawing: radius = round(rho x control height) snapped to the brand's radius ladder, with rho picked from tight 0.125, standard 0.20, soft 0.30, softest 0.375; every control of equal height gets the same radius.
  **Why** Shipped systems sit on these ratios: Radix 3/4/6/8 on 24/32/40/48 (rho 0.125-0.167), Primer 6 on 28 and 32 (0.21, 0.19), Geist 6/6/8 on 32/36/40 (0.19, 0.17, 0.20), AlignUI 10/8 on 40/36 (0.25, 0.22), shadcn and coss 8-10 on 24-36 (0.28-0.42), founder Kestrel 12 on 32 (0.375). A ratio makes "roundness" one decision; rho values are rounded groupings (E).
  **Applies to** all. **Check** for every `button, input, select, [role=button]` 20-72 px high: |radius / height - rho| <= 0.04 (snap tolerance); no two controls of equal height with radii differing by more than 1 px. **Source** Radix button/text-field CSS (T); AlignUI button matrix (T, alignui-system.md); Geist, Primer, Untitled, shadcn, coss docs pages (M); founder Kestrel round 2.

- **RULE** Pick ONE radius grammar per brand, constant or stepped, and record it in DIRECTION.md: constant = one control radius for the whole height ladder; stepped = radius non-decreasing with the size step. Never alternate.
  **Why** Untitled UI measured radius 8 at 32, 36, 40, 44 and 48 px (constant); Primer 6 at 28 and 32 (constant); Radix `--radius-1..4` = 3/4/6/8 per size (stepped); Geist 4/6/6/8 (stepped); M3 Expressive button shapes 12/12/16/28/28 for 32/40/56/96/136 px (stepped). A mixed grammar is how a 32 px field and a 32 px button end up with different corners (shadcn docs page: h32 controls at 10 px and at 16 px in the same page, M).
  **Applies to** all. **Check** distinct control radii across the height ladder = 1 (constant) or sorted by height they never decrease (stepped). **Source** Radix base-button.css (T); M3 `_md-comp-button-*.scss` (T); Untitled React Button source (T); (M).

- **RULE** Derive every nested radius with `calc()`: inner = max(0, outer - padding - border-width); when the inset d is uniform and between 1 px and the outer radius, the child radius must be within 1 px of outer - d.
  **Why** Concentric arcs keep the gap constant around the corner. Radix text-field inner `calc(var(--text-field-border-radius) - var(--text-field-border-width))`; segmented-control thumb `max(0.5px, calc(var(--segmented-control-border-radius) - 1px))`; coss `before:rounded-[calc(var(--radius-lg)-1px)]`; Untitled UI `before:rounded-[7px]` inside `rounded-lg` (8); Catalyst `calc(var(--radius-lg) - 1px)`; HIG toolbars: controls' corner radii "concentric with bar corners".
  **Applies to** all. **Check** nested-corner audit (spec K7 in 3.11): for each rounded child inside a rounded parent with equal insets at a corner, |r_parent - inset - r_child| <= 1 px. **Source** Radix text-field.css, segmented-control.css (T); coss button.tsx (T); Untitled button.tsx (T); HIG toolbars (D).

- **RULE** Give tactile controls a second layer at radius = outer - border-width (1 px): an inner highlight or ring pseudo-element, never at the outer radius.
  **Why** A 1 px inner stroke at the outer radius pinches at the corner. coss primary button uses `before:inset-0` at `calc(var(--radius-lg) - 1px)` with a `0 1px white/16%` inset highlight; Untitled UI `before:absolute before:inset-px before:border before:border-white/12` at 7 px inside 8.
  **Applies to** buttons, inputs, cards with highlights. **Check** pseudo-element `border-radius` = parent radius - 1 (+-0.5 px). **Source** coss, Untitled button source (T).

- **RULE** Keep container radius between 1.25x and 2.0x the radius of the controls it holds: control 8 -> card 12-16 -> dialog 16-24. For soft brands the ladder is class-based and may not be tightened.
  **Why** Ratios in shipped systems: Geist 6 -> 12 (2.0), Primer 6 -> 12 (2.0), coss 8 -> 16 (2.0), AlignUI 10 -> modal 20 (2.0), founder Kestrel round 2 ladder 8 / 12 / 16 / 22 (controls 12 -> cards 16 is 1.33, frame 22). Founder verdict: "Do not tighten it: 4/6/10 and 6/8/12 both read stiff".
  **Applies to** all. **Check** card radius / contained-control radius in [1.25, 2.0]; founder ladder values are allowed even when below 2.0. **Source** Geist materials (D); Primer radius tokens (T); coss registry (T); AlignUI tooltips/modal (T); founder-taste.md.

- **RULE** Tie radius to elevation level, not to content: all surfaces at one shadow level share one radius, and the radius steps up with the level (Geist 6 for base/small/tooltip, 12 for medium/large/menu/modal, 16 for fullscreen).
  **Why** Elevation and corner softness are read together; a modal and a card with different radii at similar depth look unrelated. Geist binds both inside one "material".
  **Applies to** cards, popovers, dialogs. **Check** group floating surfaces by box-shadow signature: radii in a group differ by <= 1 px. **Source** Geist materials page (D); existing study vercel-geist.md.

- **RULE** Drive all radii from one shape switch: a single custom property scales the whole ladder, and pill mode is a `max()` against a full-radius variable so one flip rounds every control at once.
  **Why** Radix `radius` sets `--radius-factor` 0 / 0.75 / 1 / 1.5 / 1.5 (+ `--radius-full: 9999px` for `full`) and every control uses `border-radius: max(var(--radius-N), var(--radius-full))`; Atlassian ships `shape` as its own theme (`--ds-radius-xsmall..xxlarge`, `full`, `tile`). A brand can change roundness without editing a component.
  **Applies to** all. **Check** change the knob in a build: >= 95% of control radii change, 0 hard-coded px radii in component CSS. **Source** Radix radius.css (T); Atlassian `atlassian-shape` theme (T).

- **RULE** Make pill shape all-or-nothing inside one control family: the share of pill-radius (>= height/2) interactive elements on a page is 0% or >= 80%; inputs next to pill buttons are pill too, or sit in a visibly different surface.
  **Why** Measured pill shares: Linear home 91% (marketing grammar; its app uses 8 px), Stripe 0%, Untitled UI 0%, Primer 0%, shadcn home 80%; mixed pages (GitHub home 53%, Polaris docs 43%) read less resolved (M). Linear's own note: use pill for marketing navigation and CTAs, 8 px for dense app rows, and do not mix them in one bar.
  **Applies to** landing page, app UI. **Check** pill share of buttons/inputs in one bar is 0 or 1; page-wide pill share not in (0.15, 0.80) unless two named grammars exist. **Source** (M) linear-home, stripe-home, shadcn-home, github-home, polaris-button; existing study linear.md.

- **RULE** Size selection-control radii from the box: checkbox radius <= 25% of its side, never fully round; radio is the only circle; switch track is pill.
  **Why** Radix checkbox sizes 14/16/20 with radius 0.875/1/1.25 x `--radius-1` and a separate `--radius-thumb` (0.5 px at none/small, 9999 px from medium) so checkboxes stay distinct from radios; M3 checkbox 18 px with 2 px (11%); shadcn 16 px with 4 px (25%); AlignUI 16 px rounded square rx 4 (25%).
  **Applies to** forms. **Check** checkbox computed radius / width <= 0.25; radio radius = 50%. **Source** Radix checkbox.css (T); M3 `_md-comp-checkbox.scss` (T); shadcn checkbox.tsx (T); AlignUI (T).

- **RULE** Round icon and avatar tiles at 25% of their side.
  **Why** Atlassian's shape theme has a dedicated `--ds-radius-tile: 25%`, so a 24, 32 or 48 px tile scales its corner with it instead of reusing a control radius.
  **Applies to** icon tiles, logo tiles, app icons. **Check** tile radius / side in [0.22, 0.28] unless circle. **Source** Atlassian `atlassian-shape.js` (T).

- **RULE** Square the inner corners of joined controls (button group, segmented, input with addon), keep the outer corners at the control radius, and overlap 1 px so two borders do not double.
  **Why** Polaris groups set `border-top-left-radius: var(--p-border-radius-0)` on non-first buttons and `margin-left: calc(-1 * var(--p-space-025))` (1 px) on segmented primary buttons; Untitled UI `in-data-input-wrapper:in-data-leading:-mr-px ... rounded-r-none` plus the inner pseudo-element `before:rounded-r-none`.
  **Applies to** button groups, input groups. **Check** joined siblings: inner corner radii 0, shared edge width 1 px. **Source** Polaris Button.module.css (T); Untitled button.tsx (T).

- **RULE** Cap the vocabulary: <= 6 distinct non-pill radii on a page and <= 3 on interactive elements.
  **Why** Radix, Atlassian and Primer expose 6 steps (3/4/6/8/12/16; 2/4/6/8/12/16; 3/6/12); measured interactive vocabularies are 1-3 on all pages except AlignUI marketing (7, a known loose layer) (M).
  **Applies to** all. **Check** count distinct `border-radius` values after rounding to integers. **Source** Radix, Atlassian, Primer (T); (M).

### 2.2 Icons: grid, size, stroke, centring

- **RULE** Centre every icon with a flex or grid box, `display: block` svg, never with inline layout: container `display: inline-flex; align-items: center; justify-content: center` (or `inline-grid; place-content: center`), svg `flex-shrink: 0; display: block`.
  **Why** Lab (L, standards mode, 16 px icon in a 32 px box, ink centre vs box centre): flex or grid = 0.00 px both axes; inline svg in a fixed-height block = -8.00 px (it rides the first line); inline svg with `vertical-align: middle` and `line-height` = box height = +1.00 px; UA `<button>` with inline svg = -1.00 px. Primer IconButton uses `display: inline-grid; place-content: center`; Carbon icon-only `align-items: center; justify-content: center; padding: 0`; Radix BaseButton `inline-flex; align-items: center; justify-content: center`.
  **Applies to** all. **Check** container of every icon-only svg has computed display in {flex, inline-flex, grid, inline-grid} and svg display not `inline`; |dx|, |dy| <= 0.25 px. **Source** (L) centering-lab; Primer ButtonBase.module.css, Carbon `_button.scss`, Radix base-button.css (T).

- **RULE** Make `(box size - icon size)` an even number on both axes (same parity), or the icon lands 0.5 px off a pixel line.
  **Why** Lab: 15 px icon in a 32 px box and 16 px icon in a 33 px box give +0.50 px ink offset (the other axis too when both are odd); 16 in 32, 20 in 36, 14 in 28 and 15 in 33 are exact (L). Live: Radix Themes button page has 10 icon-only buttons with 32/15 boxes (M). AlignUI sets are even by construction: switch 32 x 20 with 28 x 16 track and 12 thumb, checkbox 20 with 16 inner.
  **Applies to** all. **Check** for every centred icon: ((boxW - svgW) % 2 == 0) and ((boxH - svgH) % 2 == 0); if the icon set is on an odd grid (Radix 15) use odd boxes (e.g. 31/33) or switch to a 16 px set. **Source** (L); Radix Icons README 15x15 (D); AlignUI (T); radix-themes-button (M).

- **RULE** Size the icon box from the control height with the ladder 12 (24 px high), 14 (28), 16 (32), 18-20 (36), 20 (40, 44, 48): icon = height / 2 up to 40 px, then hold at 20 (24 only for >= 56).
  **Why** Measured icon-only pairs across pages: 24/12 (Atlassian), 28/14 (Linear), 32/16 (shadcn, Primer, Radix, coss, Untitled), 36/20 and 40/20 (Untitled), 44/20, 48/20 (Untitled), 48/24 (AlignUI). M3 button: 40 -> 20, 56 -> 24, 96 -> 32, 136 -> 40. coss desktop: 24 -> 14, 28 -> 16, 32 -> 16, 36 -> 16, 40 -> 18; mobile +2. Icon/height lands in 0.42-0.57.
  **Applies to** all. **Check** icon size / control height in [0.4, 0.58] and icon in the brand table; one icon size per control size on a page. **Source** (M) 20 pages; M3 `_md-comp-button-*.scss` (T); coss button.tsx (T); Untitled button.tsx (T).

- **RULE** Keep icon size within 1.0-1.35 x the adjacent label font size and use one icon size per label size.
  **Why** Median icon / font-size across pages: 1.07-1.14 (Radix, shadcn, Atlassian, Polaris, Carbon, coss), 1.25 (Untitled), 1.33 (Primer 16 over 12), 1.43 (AlignUI 20 over 14) (M). Larger than ~1.4 makes the icon outweigh the label.
  **Applies to** all. **Check** svgH / label font-size in [1.0, 1.43] for icon+text rows. **Source** (M) iconToFont medians in summary.json.

- **RULE** Render strokes at a constant 1.25-1.75 px, whatever the icon size; compute `stroke-width = target_px x viewBox / rendered_px`.
  **Why** Lucide is 2 px on a 24 grid (1.33 px at 16, 1.67 at 20); Heroicons outline 1.5 on 24; Phosphor regular 16/256 = 1.5 at 24; Untitled UI sets `stroke-[2.25px]` on 16 px icons (2.25 x 16/24 = 1.5) to compensate; Carbon draws 16 px icons on a pixel grid. A fixed rendered stroke keeps small and large icons the same weight.
  **Applies to** stroke icon sets. **Check** computed `stroke-width x (rendered size / viewBox)` in [1.25, 1.75], equal within 0.25 px for all icons on the page. **Source** Lucide code-conventions and design-principles (D); Heroicons play.svg 1.5 (T); Phosphor play.svg 16/256 (T); Untitled button.tsx (T).

- **RULE** Draw or render icons only at integer multiples of their native grid (24 -> 24 or 48; 16 -> 16 or 32; 15 -> 15 or 30; 20 -> 20), or use a set that ships the size you need; always screenshot at DPR >= 2.
  **Why** Lab, Lucide `menu` (three 2-unit strokes), grey-pixel share of the line pixels: at 24 px 0% grey at DPR 1 and DPR 2; at 16 px 100% grey at DPR 1 and 50% at DPR 2; at 20 px 100% at DPR 1 (L). Material Symbols solve this with an optical-size axis (20-48) and weight axis (100-700); Heroicons ship 24 outline plus 24/20/16 solid; Carbon 16/20/24/32; SF Symbols ship nine weights tied to text weight.
  **Applies to** all, esp. deliverable screenshots. **Check** icon size is a divisor or multiple of the icon set's viewBox, else WARN "soft at 1x"; screenshot DPR >= 2. **Source** (L) icon-crispness; Material Symbols docs (D); Heroicons readme (D); HIG SF Symbols (D).

- **RULE** Centre the box, not the ink, and never add a translate on top of a stock icon: optical offsets are already inside the viewBox of the set.
  **Why** Raster-measured ink bbox centre vs viewBox centre (L), play glyph: Lucide +4.2% right (mass centre -4.2%: halfway between bbox-centred and centroid-centred), Phosphor +9.4% (mass -0.3%: centroid-centred), Radix +3.3%, Heroicons +0.7%. Symmetric glyphs (plus, minus, x, menu, info, circle, square) are 0.0% in all four sets. A manual nudge on top double-corrects.
  **Applies to** all. **Check** no `transform`/`translate`/`position` offset on icon svgs of a stock set; ink offset |dx|, |dy| <= 0.02 x size for plus/minus/x/menu/circle. **Source** (L) glyph-centering.json; HIG icons "asymmetric ones can look unbalanced when centred geometrically" (D).

- **RULE** Use ONE icon family per product surface, and normalise any second family by its measured ink offset.
  **Why** The same chevron-right sits at +0.0% (Lucide, Heroicons), +3.1% (Phosphor) and +5.8% (Radix) of its viewBox, i.e. up to 0.9 px at 15 px, and download arrows differ in mass by 10-16% (L). HIG: all interface icons need "consistent size, level of detail, stroke thickness (or weight), and perspective".
  **Applies to** all. **Check** icon-family fingerprint per page = 1 (viewBox + stroke-linecap/join + stroke-width signature), brand marks exempt. **Source** (L); HIG icons (D); founder-taste.md (professional icon set, Phosphor or Lucide).

- **RULE** For a hand-placed asymmetric glyph (play, send, chevron), nudge it toward its mass centroid by 40-50% of the bbox-to-centroid distance; for a right-pointing triangle that is about w/12.
  **Why** Sets place the nudge at 50% (Lucide play), 35% (Radix), 8% (Heroicons), 97% (Phosphor) of the bbox-to-centroid distance (L). A triangle's centroid is w/3 from its base while its bbox centre is w/2, a gap of w/6; 50% of it is w/12 (E). HIG: icons "slightly" adjusted until "optically centred".
  **Applies to** custom glyphs, play buttons. **Check** ink bbox centre offset of the glyph within [0.4, 0.5] x (centroid offset); circle play button: ink centre within 1 px of the circle centre after nudge. **Source** (L) glyph-centering.json; HIG icons (D); (E).

- **RULE** Align icon and label on the line box and verify the label's cap-height centre: icon centre within 0.5 px of the control centre, cap-height centre of the label within 0.5 px of the control centre (WARN above 0.75).
  **Why** `align-items: center` puts the icon on the line-box centre, but the cap centre sits above or below it by font metrics. Pixel lab over 18 fonts x 3 sizes (13/20 in 32, 14/20 in 40, 16/24 in 48): cap-centre offset of "HOME" ranges -1.0 to +0.75 px, mean |offset| 0.43 px (L). Live: icon+text rows have icon centre within 0.5 px of box centre in 77-100% of rows on most pages (M).
  **Applies to** all. **Check** per spec K2/K10 in 3.11. **Source** (L) text-centering.json; (M).

- **RULE** Trim the label to cap height when the control has a fixed height: `<span>` label with `text-box: trim-both cap alphabetic` inside the flex box, fallback `padding-top: 0.5px` only where measured.
  **Why** Same lab with the trim applied: mean |offset| 0.23 px (from 0.43), max 0.50 px (from 1.00); Chromium 156 supports it and Safari 18.2+ (E). Radix Themes already hand-patches this: text-field `padding-bottom: 0.5px` with the comment that Chrome computes input text height as 16.5 px on @2x; Carbon `padding-block-start: 1.5px` on xs buttons.
  **Applies to** buttons, tabs, chips, badges. **Check** `getComputedStyle(label).textBoxTrim` is set, or measured cap-centre offset <= 0.5 px. **Source** (L); Radix text-field.css (T); Carbon `_button.scss` (T).

- **RULE** Make icon-only controls square by construction: `width = height = control height`, padding 0 (or padding = (height - icon) / 2), `aspect-ratio: 1`.
  **Why** Radix IconButton `width: var(--base-button-height)`; Carbon icon-only `inline-size: layout.size('height')`; Primer IconButton `width: var(--control-medium-size)`; Untitled UI icon-only padding = (height - icon) / 2: `p-2` for 16 px at 32, `p-2` for 20 at 36, `p-2.5` at 40, `p-3` at 44, `p-3.5` at 48. 326 measured icon-only buttons: 100% within 0.5 px of centre (M).
  **Applies to** all. **Check** |width - height| <= 0.5 px for single-svg buttons; padding-left = padding-top. **Source** Radix icon-button.css, Carbon `_button.scss`, Primer ButtonBase.module.css, Untitled button.tsx (T); (M).

- **RULE** Pull the icon toward the edge by 2-4 px when it leads or trails a label: side padding next to an icon = text padding - 2 to 4 px (negative margin on the icon is the same thing).
  **Why** shadcn `px-4` -> `has-[>svg]:px-3` (-4), `px-3` -> `px-2.5` (-2), `px-6` -> `px-4` (-8 at lg); coss `[&_svg]:-mx-0.5` (-2); AlignUI `margin -4 px` on 20 px icons; Polaris `.Icon { margin: calc(-1 * var(--p-space-050)) 0 }` (-2 px vertical) around a 20 px icon so the button's line box stays 16; (Catalyst uses `items-baseline` with a self-centred icon, existing study). The glyph, not its box, should sit at the padding line.
  **Applies to** buttons, badges, tags. **Check** distance from control edge to glyph ink = distance from the opposite edge to text ink +-1 px. **Source** shadcn button.tsx, coss button.tsx (T); AlignUI (T); Polaris Button.module.css (T).

- **RULE** In rows with multi-line text, put the leading icon in a box whose height equals the first line's line-height and centre inside that box.
  **Why** Radix Callout sets the icon container `height: var(--callout-icon-height)` = `--line-height-2`, so the icon follows line one however long the text wraps.
  **Applies to** callouts, alerts, list items. **Check** icon centre y - first-line centre y within 0.5 px. **Source** Radix callout.css (T).

- **RULE** Colour the icon with its own token at 60-90% of the label's strength, and keep the same opacity for every icon in the family.
  **Why** Radix `svg { opacity: 0.9 }` on non-ghost buttons; coss `[&_svg:not([class*='opacity-'])]:opacity-80`; Untitled UI icon colours `fg-quaternary` (secondary/tertiary) and `white/60` on primary; Primer separate `iconColor` tokens.
  **Applies to** all. **Check** computed icon colour/opacity: one value per variant across all sizes. **Source** Radix button.css, coss button.tsx, Untitled button.tsx (T).

- **RULE** Match icon stroke weight to label weight (400 text -> light/regular stroke, 600 -> heavier), using the family's weight axis if it has one.
  **Why** HIG: nine SF Symbols weights "correspond to a weight of the San Francisco system font"; scales (small/medium/large) are defined relative to cap height. Material Symbols expose wght 100-700 and GRAD -50..200.
  **Applies to** Apple-style and Material-style systems. **Check** icon stroke class equals label weight class in the brand table. **Source** HIG SF Symbols (D); Material Symbols docs (D).

### 2.3 Control height ladders, padding, gaps

- **RULE** Derive control height as `line-height + 2 x padding-block (+ 2 x border)` with one shared line-height token, and write the height as an explicit token as well; padding-block = (height - line-height - 2 x border) / 2 must be a whole number.
  **Why** Primer: line-height 20 for all sizes, `paddingBlock` 2/4/6/10/14 for heights 24/28/32/40/48 (exactly (h - 20) / 2). Untitled UI: `py-1.5/2/2.5/2.5/3` + 20 or 24 line-height = 32/36/40/44/48. Carbon: `padding-block: (height - 1lh) / 2 - 1px`.
  **Applies to** all. **Check** (H - lh - 2 x border) / 2 is an integer >= 0 for every control size in the brand table. **Source** Primer size.json5 (T); Untitled button.tsx (T); Carbon `_button.scss` (T).

- **RULE** Never let the font decide height: set `line-height` in px (or a tokenised unitless value that multiplies to an integer) and a fixed `height`/`min-height`; no `line-height: normal` on controls.
  **Why** Measured fractional control heights on github.com home (29.09 and 26.09 px, Mona Sans with `line-height: normal`) and Radix playground (22, 23 px); across 838 buttons the other pages have 0.4% fractional heights (M). Fractional heights put icons and borders on fractional pixels.
  **Applies to** all. **Check** control heights integer (+-0.02); computed `line-height` != `normal`. **Source** (M) github-home, radix-themes-playground; Primer ButtonBase.module.css `height: var(--control-medium-size)` (T).

- **RULE** Choose the control height ladder from {24, 28, 32, 36, 40, 44, 48, 56} and use at most four rungs per project; base unit is 4 px.
  **Why** Radix 24/32/40/48; Primer 24/28/32/40/48; Carbon 24/32/40/48/64/80; Polaris 24/28/32/36/40 (height-600..1000); AlignUI 28/32/36/40; coss desktop 24/28/32/36/40 (+4 on touch); Untitled 32/36/40/44/48; M3 Expressive 32/40/56/96/136; HIG visionOS 28/32/44/52/64. Measured page heights concentrate on 32, 36, 40, 44, 48 (M).
  **Applies to** all. **Check** distinct control heights on the page <= 4 and each in the table; none at 29-31, 33-35, 37-39. **Source** (T) the token files named; (M).

- **RULE** Give button, input, select, textarea-row, segmented control and badge row the same height per size word, and put them on one baseline when they sit in one row.
  **Why** Radix TextField heights `--space-5/6/7` equal Button heights at size 1/2/3; Primer inputs and buttons both read `--control-*-size`; coss and Catalyst use the same class strings (`h-9 sm:h-8`; 44 px -> 36 px). Founder Kestrel round 2: "adjacent controls have equal heights; segment widths equal".
  **Applies to** forms, toolbars. **Check** siblings in one flex row that are controls: |h_i - h_j| <= 0.5 px. **Source** Radix text-field.css, button CSS (T); Primer (T); founder-taste.md.

- **RULE** Set side padding at 0.30-0.38 x height for text-only buttons (8/10/12/14/16 for 24/28/32/36/40; 16 and 18 for 44 and 48).
  **Why** Measured text-button padding-right / height: Untitled 10/32, 12/36, 14/40, 16/44, 18/48 (0.31-0.375); coss 7/24, 9/28, 11/32, 13/36 (+1 border = 8, 10, 12, 14); Radix 8/24, 12/32, 16/40, 24/48; Primer 8 at 28, 12 at 32; Atlassian 12 at 32; Catalyst 11 + 1 at 36 (M)(T).
  **Applies to** all. **Check** pad-x / height in [0.29, 0.40] for non-icon buttons. **Source** (M) untitledui-react, coss-button, radix-themes-playground, github-primer-docs, atlassian-button, catalyst-docs; Radix button.css (T).

- **RULE** Write bordered paddings as token minus border (`calc(var(--px) - 1px)`) and give every variant of a size the same 1 px border box (transparent on ghost/secondary).
  **Why** coss `px-[calc(--spacing(3)-1px)]` on every size with `border` on all variants; Catalyst `(14-1)px x (10-1)px`; Carbon `calc(layout.density('padding-inline') - 1px)`; Radix `calc(var(--space-2) - var(--text-field-border-width))`. Otherwise outline vs filled vs ghost buttons differ by 2 px in outer size and the row jitters.
  **Applies to** all. **Check** heights and widths of the same-size primary/outline/ghost at equal label: |dH| = 0, padding+border sum equal. **Source** coss, Catalyst, Carbon, Radix (T).

- **RULE** Gap between icon and label: 4 px up to 28 px high, 6-8 px at 32-40, 8-12 px at 44+; the gap is a size token.
  **Why** Radix gap 4/8/12/12 for sizes 1-4; Primer 4/4/8/8/8 for xsmall..xlarge; coss `gap-1`, `gap-1.5`, `gap-2` (4/6/8); Untitled measured 6 (4 gap + `px-0.5` on the label span); Atlassian measured 6; M3 `icon-label-space` 8; AlignUI 12 on 40. Gap / height lands 0.14-0.30.
  **Applies to** all. **Check** icon-to-text gap per size matches the table (+-1 px). **Source** (T) the token files; (M) gap_mode in summary.json.

- **RULE** Give every ladder a coarse-pointer variant (+4 px) or a 44 px hit-area expander, and keep icon-only hit area >= 24 px (fine) / 44 px (coarse).
  **Why** coss `h-9 sm:h-8` plus `pointer-coarse:after:min-h-11 min-w-11`; Primer `control-minTarget` fine 16 / coarse 44; Catalyst 44 px -> 36 px at 640; HIG 44 x 44 pt hit region (60 in visionOS); WCAG 2.5.8 24 px.
  **Applies to** all. **Check** with `isMobile+hasTouch`, every control hit rect >= 44 x 44; desktop >= 24 x 24. **Source** coss button.tsx (T); Primer size-fine/size-coarse (T); HIG buttons (D).

- **RULE** Lock the size of a loading control: spinner is absolutely centred, label becomes transparent, width and height unchanged.
  **Why** coss `data-loading:text-transparent` with an absolutely positioned Spinner; Polaris `.Spinner { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) }`; Radix `.rt-loading { position: relative }`.
  **Applies to** buttons. **Check** bounding box of the control is identical before and after setting loading (|dW|, |dH| = 0). **Source** coss, Polaris, Radix (T).

### 2.4 Spacing and line-height grid

- **RULE** Use a closed spacing list on a 4 px base with a declared 2 px sub-step used only inside controls: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.
  **Why** Atlassian `--ds-space-0/025/050/075/100/150/200/250/300/400/500/600/800/1000` = 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80; Carbon spacing-01..13 = 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160; Radix `--space-1..9` = 4, 8, 12, 16, 24, 32, 40, 48, 64.
  **Applies to** all. **Check** >= 95% of padding, margin and gap values are in the list. **Source** Atlassian `atlassian-spacing.js`, Carbon `layout.json`, Radix space.css (T).

- **RULE** Put UI line-heights on a 4 px grid: 12/16, 14/20, 16/24, 20/24 or 28, 24/28 or 32, 32/36 or 40.
  **Why** Atlassian tokens: body 14/20 (and 12/16, 16/24), headings 12/16, 14/20, 16/20, 20/24, 24/28, 28/32, 32/36; Polaris text-style line-heights 12, 16, 20, 24, 32, 40, 48; Radix breaks the grid at 18/26 and 24/30 (a measured exception). Controls then stack to heights on the ladder.
  **Applies to** all. **Check** computed line-height % 4 == 0 for text <= 32 px in UI regions. **Source** Atlassian `atlassian-typography.js` (T); Polaris text.ts (T); Radix typography.css (T).

- **RULE** Keep a negative-space token for optical overhang, so icon alignment never needs a raw number.
  **Why** Atlassian ships `--ds-space-negative-025..400` (-2, -4, -6, -8, -12, -16, -20, -24, -32); Radix ghost buttons compute margins from `--margin-*-override: calc(var(--margin-top) - var(--button-ghost-padding-y))` so ghost buttons align their text with neighbours.
  **Applies to** all. **Check** negative margins in generated CSS come from tokens (-2/-4/-6/-8...), none arbitrary. **Source** Atlassian spacing (T); Radix button.css (T).

- **RULE** Change density by padding and gap only, never by control height.
  **Why** Primer `paddingInline` condensed 8 / normal 12 / spacious 16 at constant heights 24-48; Carbon density only alters `padding-inline`.
  **Applies to** app UI. **Check** control heights identical across density modes. **Source** Primer size.json5 (T); Carbon `_button.scss` (T).

### 2.5 Type tuples for product UI

- **RULE** Define product text as pre-bound tuples (size / line-height / weight / tracking / numerals) and forbid ad hoc font-size, weight or tracking on text; <= 9 tuples per page (marketing), <= 7 (app).
  **Why** Geist `text-label-14`, `text-copy-14`, `text-button-14`; Polaris `text-body-md`, `text-heading-sm` (size, weight, letter-spacing, line-height bundled); Atlassian `font.body = normal 400 0.875rem/1.25rem`; Radix `size` -> font-size, line-height, letter-spacing together; HIG text styles bundle weight, size and leading.
  **Applies to** all. **Check** the (size, line-height, weight, letter-spacing) set of all text nodes is a subset of the brand table; count <= limit. **Source** Geist type (D); Polaris text.ts (T); Atlassian (T); Radix typography.css (T); HIG typography (D).

- **RULE** Product-UI body ladder: 12/16, 13/20 (dense), 14/20, 16/24; control labels use the 14/20 or 13/20 tuple at weight 500 (or 550-600 on variable fonts), and heading tuples sit on 20/24, 24/32, 30/40, 36/48.
  **Why** Atlassian body-small 12/16, body 14/20, body-large 16/24; Polaris body-sm 12/16, body-md 13/20, body-lg 14/20, heading-lg 20/24, xl 24/32, 2xl 30/40, 3xl 36/48; Primer control text 14/20 (and 12/20 small, derived from padding math); live control labels 12/16, 14/20, 16/24 at weight 500-600 (Radix, Untitled, coss, Atlassian, Geist 14/21) (M).
  **Applies to** SaaS app UI. **Check** control label tuples in the table; label font-size 12-16, weight 500-600. **Source** Atlassian, Polaris, Primer (T); (M).

- **RULE** Bind tracking to the tuple and scale it with size: 0 at <= 13 px, about -0.011 to -0.02em at 14-15 px, -0.01 to -0.015em at 20-36 px for fonts without optical sizes; display sizes follow the brand's headline rule.
  **Why** Polaris -0.2 / -0.3 / -0.54 px at 24-20 / 30 / 36 px (about -0.8% to -1.5%) and 0 for body; Geist -0.02em at 14 px, -0.04em at 32, -0.06em at 40-72 (existing study); Linear -0.011 to -0.013em at 14-15; Radix text-size letter-spacing 0.0025em at 12 to -0.025em at 60; HIG "the system font dynamically adjusts tracking at every point size" (optical sizing).
  **Applies to** all. **Check** letter-spacing / font-size per tuple within the table; no positive tracking on text > 16 px outside uppercase labels. **Source** Polaris font.ts (T); Radix typography (T); Linear/Geist studies; HIG typography (D).

- **RULE** Set numeric data columns, prices and counters in tabular figures (`font-variant-numeric: tabular-nums`, or the font's mono for dashboards).
  **Why** Of six public pages scanned for numeric text, Stripe sets `tabular-nums`/`tnum` on 15 of 19 numeric nodes and AlignUI uses Geist Mono for 115 of 173; Linear and Untitled UI set none on 29 and 4 nodes (M, numerals scan; GitHub and Vercel pages returned no numeric text in the window). Founder: money in hero UI is bold sans, tabular, decimals muted.
  **Applies to** tables, KPIs, prices. **Check** numeric text nodes (/^[$EUR]?\d[\d,.]*%?$/) inside tables/cards have `tabular-nums` or `tnum` or a mono family. **Source** (M) raw-numerals; founder-taste.md.

- **RULE** Pick UI weights from a short list per brand (400 / 500 / 600, or 450 / 550 / 650 on variable fonts) and use at most three on a page.
  **Why** Polaris weights 450 / 550 / 650 / 700; Atlassian 400 / 500 / 600 / 653; AlignUI 500 and 550; live control labels are 500 (Radix, shadcn, coss, Atlassian, Geist) or 600 (Untitled) (M).
  **Applies to** all. **Check** distinct font-weight values <= 3 for UI text. **Source** Polaris font.ts, Atlassian typography (T); (M).

- **RULE** Use Label tuples (tight line-height) for single-line UI and Copy tuples (looser) for paragraphs so icons and controls align to a known line box.
  **Why** Geist Label has small line-height (16-20 at 12-16 px), Copy a larger one; single lines need the line box to equal the control's inner height.
  **Applies to** all. **Check** single-line labels: line-height / font-size <= 1.45; paragraphs >= 1.35. **Source** existing study vercel-geist.md (D).

### 2.6 Elevation and shadow systems

- **RULE** Define a shadow ladder of <= 5 named levels, each built from the same three parts: 1 px ring, contact shadow, ambient shadow; reuse the ring token for borders.
  **Why** Radix `--shadow-1..6`, each starts with `0 0 0 1px gray-a3`; Geist `--ds-shadow-border` + `small/medium/large/tooltip/menu/modal/fullscreen`; Atlassian only three (`raised`, `overlay`, `overflow`); Polaris `shadow-100..600` + bevel/inset/button; Untitled `xs..3xl`; M3 levels 0/1/3/6/8/12.
  **Applies to** all. **Check** every computed `box-shadow` on cards/popovers/dialogs matches one of the table's strings; <= 5 distinct. **Source** (T) the token files named.

- **RULE** Size layers so offset-y is 0.5-1.0 x blur and spread is about -blur/4 on floating shadows.
  **Why** Geist modal `0 8px 16px -4px` and `0 24px 32px -8px`; Untitled lg `0 12px 16px -4px`, xl `0 20px 24px -4px`, 2xl `0 24px 48px -12px`; Polaris 400 `0 8px 16px -4px`, 500 `0 12px 20px -8px`, 600 `0 20px 20px -8px`. Negative spread keeps the shadow from leaking sideways.
  **Applies to** cards, popovers, dialogs. **Check** parse each layer: y / blur in [0.5, 1.0], spread in [-blur/2, 0]. **Source** Geist, Untitled, Polaris tokens (T).

- **RULE** Cap shadow strength by level: rest and card layers alpha <= 0.16 and blur <= 24 px; menus and modals alpha <= 0.28.
  **Why** Polaris alphas run 0.07 (100, 200), 0.20 (300), 0.22, 0.24, 0.28 (600); Geist small/medium/large shadows are 0x0a = 4% black over a 7.8% ring; founder Tideline round 4: "why so massive shadow and unprofessional stuff" (quiet depth: 1 px ring + `0 8px 20px -12px` at 12% ink).
  **Applies to** all. **Check** max alpha per layer by level; founder cap applies to cards, chips and popovers. **Source** Polaris shadow.ts, Geist (T); founder-taste.md.

- **RULE** In dark mode, replace the shadow with a lighter 1 px ring and roughly double the shadow alphas.
  **Why** Geist ring `#00000014` (7.8% black) -> `#ffffff25` (14.5% white); Atlassian raised `#1E1F2140` + ring-less -> `0 0 0 1px #00000000, 0 1px 1px #01040480` (alpha 0x40 -> 0x80), overlay `0 8px 12px #1E1F2126` -> `0 0 0 1px #BDBDBD1F, 0 8px 12px #0104045C` (0x26 -> 0x5C, plus ring), overflow 0x29 -> 0x8F; Radix redefines all six with `gray-a6` rings and `black-a3..a11`; Linear uses 1 px `rgba(255,255,255,.05-.15)` hairlines instead of shadows.
  **Applies to** dark themes. **Check** dark theme: every floating surface has a ring entry (alpha >= 0.1 light-on-dark); no surface relies on a blur-only shadow. **Source** Geist, Atlassian `atlassian-light/dark.js`, Radix shadow tokens, Linear (T).

- **RULE** Use elevation tint or ring, not larger blur, to separate dark surfaces: M3 uses a primary surface-tint overlay per level; Carbon uses layered surface tokens (layer-01/02/03).
  **Why** Shadows are barely visible on near-black; a ring or a lighter surface is.
  **Applies to** dark themes. **Check** adjacent dark surfaces differ by >= 1.05 contrast or have a ring. **Source** M3 `_md-sys-elevation.scss` (levels 0, 1, 3, 6, 8, 12 and `$surface-tint-color: primary`) (T); Carbon (D, existing study).

- **RULE** Draw component borders as spread-ring shadows or inset shadows so toggling them never changes layout.
  **Why** Primer's own description of `boxShadow.thin = inset 0 0 0 1px`: "used instead of a border to prevent layout shift"; Radix draws all field borders as `inset 0 0 0 1px gray-a5`; Geist `0 0 0 1px`; Polaris `shadow-border-inset 0px 0px 0px 1px rgba(0,0,0,0.08) inset`.
  **Applies to** all. **Check** hover/selected/focus toggles change no element's width, height or sibling offsets. **Source** Primer border.json5 (T); Radix, Geist, Polaris (T).

### 2.7 Borders and dividers

- **RULE** Make borders and dividers alpha colours of the foreground ink: about 8% black in light, 10-15% white in dark, from one token.
  **Why** Geist `#00000014` (7.8%) / `#ffffff25` (14.5%); Polaris border inset `rgba(0,0,0,0.08)`; Linear hairlines `rgba(255,255,255,0.05-0.15)`; coss black 8-10%; Radix `gray-a3..a7`. Alpha borders sit correctly on any surface tint.
  **Applies to** all. **Check** border colours are rgba with alpha 0.06-0.16, no opaque grey borders; one divider token. **Source** Geist, Polaris, Linear, coss, Radix (T).

- **RULE** Use only three border widths: 1 px default, 2 px for selected and focus, 4 px for emphasis; no 1.5 px.
  **Why** Primer `borderWidth.thin/thick/thicker` = 1/2/4 with thick "MUST use for focus rings"; Atlassian `--ds-border-width: 0.0625rem`, `selected` and `focused` 0.125rem; Polaris `border-width-025/050/100` = 1/2/4 (plus a 0.66 px hairline token).
  **Applies to** all. **Check** computed border widths on the page in {0, 1, 2, 4}. **Source** Primer, Atlassian, Polaris tokens (T).

- **RULE** Let dividers span their container edge to edge with the same radius logic as the surface, and draw them behind artwork, never on top of it.
  **Why** Founder: rails and dividers must be continuous and deliberate; they pass BEHIND artwork. Atlassian divider is a border token, not an extra element.
  **Applies to** marketing rails, lists. **Check** divider z-index below hero visual; both rails full height. **Source** founder-taste.md rails rules.

- **RULE** Add a 1 px top highlight (white 12-16%) on filled tactile controls and remove the outer shadow on press.
  **Why** coss primary `inset-shadow-[0_1px_white/16%]` and `[:active]:inset-shadow-[0_1px_black/8%]` + `shadow-none` on press; Untitled `before:border-white/12 before:mask-b-from-0%`; Radix classic `inset 0 2px 3px -1px white-a4`.
  **Applies to** filled buttons. **Check** highlight alpha <= 0.16; pressed shadow is `none` or inset. **Source** coss, Untitled, Radix (T).

### 2.8 State grammar

- **RULE** Express states as adjacent steps of one ramp: default n, hover n+1, pressed/selected n+2; borders move on their own ramp the same way.
  **Why** Radix Colors: 3 UI element bg, 4 hovered, 5 active/selected, 6 subtle border, 7 border/focus ring, 8 hovered border, 9 solid, 10 hovered solid, 11-12 text (11 guarantees APCA Lc 60, 12 Lc 90 on step 2); Geist 1-3 component bg default/hover/active and 4-6 borders default/hover/active.
  **Applies to** all. **Check** for each interactive component, hover fill = next ramp step; pressed = step after. **Source** Radix Colors "understanding the scale" (D); Geist colors (D).

- **RULE** Where states are overlays, use fixed layer opacities: hover 8%, focus 10%, pressed 10%, dragged 16%, disabled content 38%.
  **Why** Material Web tokens `$hover-state-layer-opacity: 0.08`, `focus 0.1`, `pressed 0.1`, `dragged 0.16`, `disabled-state-layer-opacity: 0.38`, button `disabled-container-opacity: 0.1`, `disabled-label-text-opacity: 0.38`.
  **Applies to** all (overlay-style systems). **Check** hover overlay alpha 0.06-0.10, pressed 0.10-0.12. **Source** Material Web `_md-sys-state.scss`, `_md-comp-button.scss` (T).

- **RULE** One disabled recipe, one opacity token, applied to the whole control: 0.4 (Atlassian), or 0.38 (M3) / 0.5 (shadcn, Untitled UI), with `pointer-events: none` and a not-allowed cursor.
  **Why** Atlassian `--ds-opacity-disabled: 0.4` (and `loading: 0.2`); shadcn `disabled:opacity-50`; Untitled `disabled:opacity-50`; coss `disabled:opacity-64`. Four values means four disabled looks.
  **Applies to** all. **Check** one distinct disabled opacity across the page (0.38-0.5). **Source** Atlassian tokens, shadcn, Untitled, coss (T); M3 (T).

- **RULE** Use one focus recipe on every control: `:focus-visible` only, 2 px ring, 2 px gap in the surface colour, ring >= 3:1 against both neighbours.
  **Why** Primer thick 2 px "MUST use for focus rings"; Atlassian focused border 2 px; M3 `thickness: 3px`, `outer-offset: 2px`; shadcn `ring-[3px] ring-ring/50`; coss `ring-2 ring-offset-1 ring-offset-background`; Untitled `outline-2 outline-offset-2`; Catalyst outline-2 offset-2; Geist 2 px gap + 2 px ring.
  **Applies to** all. **Check** focus ring width 2-3 px, offset 2 px (or 1 px offset + 2 px ring), identical across 5 control types; contrast >= 3:1. **Source** (T) as named.

- **RULE** Hover, focus and pressed never change geometry: width, height, border width, padding and sibling positions stay identical (+-0 px).
  **Why** coss keeps a 1 px border on every variant; Primer/Radix draw borders as inset shadows; Radix classic uses `--base-button-classic-active-padding-top` only inside the box.
  **Applies to** all. **Check** hover each control (Playwright `hover()`): bounding box before == after. **Source** coss, Primer, Radix (T).

- **RULE** Pressed state changes one channel: inset shadow or scale 0.98 or darker fill, not two.
  **Why** coss pressed = remove outer shadow + `inset 0 1px black/8%`; Polaris primary pressed `0px 3px 0px 0px rgb(0,0,0) inset`; Radix classic `brightness(0.92) saturate(1.1)`; founder/Kaching: press scale 0.98.
  **Applies to** buttons. **Check** compare computed styles pressed vs rest: at most one of {transform, box-shadow, background-color} differs materially. **Source** coss, Polaris, Radix (T); founder-taste.md.

- **RULE** Transition named properties only (color, background-color, box-shadow, transform) at 100-150 ms; no `transition: all` on interactive controls.
  **Why** coss `transition-shadow`; Untitled `transition duration-100 ease-linear`; shadcn uses `transition-all` (a measured weak spot in an otherwise tidy system); Linear 100-160 ms (existing study).
  **Applies to** all. **Check** computed `transition-property` != `all`; duration 100-200 ms. **Source** coss, Untitled, shadcn (T).

### 2.9 Enforcement

- **RULE** Lint raw values out: stylelint/eslint rules that only allow tokens for colour, spacing, typography, border, shadow, radius and motion.
  **Why** Primer `primer/colors`, `primer/spacing`, `primer/typography`, `primer/borders`, `primer/box-shadow`, `primer/responsive-widths` (320 px); Carbon `carbon/theme-use`, `layout-use`, `type-use`, `motion-duration-use`, `motion-easing-use`; Atlassian `ensure-design-token-usage`, `no-deprecated-design-token-usage`, `no-margin`.
  **Applies to** all. **Check** run `tools/check.mjs` token audit: raw `#hex`, `\d+px` radius/gap/padding outside token files = 0, or listed overrides. **Source** Primer stylelint-config README, `stylelint-plugin-carbon-tokens` README, `@atlaskit/eslint-plugin-design-system` README (D).

- **RULE** Make illegal combinations unrepresentable in the component API: size/variant props map to complete rows, children inherit size from the root, and raw `<button>`/`<input>` are banned in favour of the component.
  **Why** AlignUI passes `size` from Root to Icon/Label (`recursiveCloneChildren`); Atlassian `no-html-button`, `no-html-text-input`, `no-html-select`; Untitled `sortCx` size tables; Radix `data-radius` + `size` props.
  **Applies to** React builds. **Check** grep generated JSX for `<button`/`<input` outside the component files; every size prop yields a row of the contract. **Source** AlignUI (T, existing study); Atlassian README (D); Untitled button.tsx (T).

- **RULE** Store usage constraints beside the token value, in the token file, in words an agent can read.
  **Why** Primer token JSON carries `org.primer.llm` blocks: `borderRadius.small` "Use for small UI elements under 16px height. Do NOT use for buttons or cards."; `borderRadius.medium` "Default choice for most components"; `borderWidth.thick` "MUST use for focus rings on interactive elements. Do NOT use for subtle dividers."
  **Applies to** engine tokens. **Check** `tokens.json` entries for radius, border-width, icon size and shadow each have `usage` and `rules` strings. **Source** Primer radius.json5, border.json5 (T).

- **RULE** Gate on rendered measurements, not only on source: run the centring, parity, radius-by-height, nested-radius and fractional-height audits (3.11) on every build and treat FAIL as blocking.
  **Why** Source can pass while the render drifts (Radix 14/9 checkbox, shadcn 18.4 px switch). Carbon ships conformance tests over its layout tokens; Primer snapshots every colour swatch in Playwright (dark, light, colour-blind variants).
  **Applies to** all. **Check** `check.mjs` emits the K-series results (3.11) and exits non-zero on FAIL. **Source** Primer repo `.playwright/snapshots` (T); Carbon `packages/layout/__tests__` (T); (E).

- **RULE** Declare the theme x size x state matrix that visual regression covers, and lint it, instead of testing whatever happens to be on screen.
  **Why** Primer snapshots every colour swatch per theme (file names include dark and dark-colorblind variants in `.playwright/snapshots`); Atlassian ships a lint rule, `no-dark-theme-vr-tests` ("Disallow using dark colorScheme in VR tests"), i.e. which colour schemes VR may use is an explicit, enforced policy.
  **Applies to** all. **Check** screenshots exist for every row of theme x size x state x variant listed in `contract.json`; a missing row fails. **Source** Primer repo `.playwright/snapshots` (T); `@atlaskit/eslint-plugin-design-system` README (D).

- **RULE** Write the contract (3.10) as `work/<name>/spec/contract.json` before building and validate it: parity, ratios, derived padding and radius all computed, none typed.
  **Why** The founder's repeated failures (roundness, icon centring) are decided in these tables, once. AlignUI's mini-spec method (ALM-01) already makes tokens come before pages.
  **Applies to** every brief. **Check** `contract.json` passes spec K0 (3.11) and `check.mjs` renders match it within tolerances. **Source** (E); alignui-method.md.

- **RULE** Re-measure after any edit to a shared token: radius, icon size or height changes re-run the full K-series, because one token touches every control.
  **Why** Radix scaling and radius knobs multiply into every component; a half-pixel scale (`--scaling: 0.95`) turns 15 px icons in 24 px boxes into fractional offsets.
  **Applies to** all. **Check** scaling factors keep icon/box parity (K3) and integer heights (K15). **Source** Radix space.css (T); (E).

## 3. Numbers & scales

### 3.1 Radius, per system (px)

| System | Scale | Controls by height | Containers | Source |
|---|---|---|---|---|
| Radix Themes | 3, 4, 6, 8, 12, 16 x `--radius-factor` (0, 0.75, 1, 1.5, 1.5+full) | 24 -> 3, 32 -> 4, 40 -> 6, 48 -> 8 | Card 8/12/16 (sizes 1-2 / 3-4 / 5) | radius.css, base-button.css (T) |
| Primer | 3 (small), 6 (medium, default), 12 (large), full | 28, 32 -> 6 | dialog 12 | primer radius.json5 (T), (M) |
| Geist | 6 / 8 marketing / 12 / 16 | 32, 36 -> 6; 40 -> 8 | menu, modal 12; fullscreen 16 | materials (D), (M) |
| Untitled UI | Tailwind scale | 32, 36, 40, 44, 48 -> 8 (constant), inner 7 | cards 12-16 | button.tsx (T), (M) |
| shadcn / coss | `--radius` 0.625rem, sm..4xl derived | shadcn 28-36 -> 8-10; coss 24 -> 8, 28-36 -> 10 | coss containers 16 | button.tsx (T), (M) |
| AlignUI | 4, 6, 8, 10, 20 | 40 -> 10; 36, 32, 28 -> 8; chips 6 | modal 20 | alignui-system.md (T) |
| Atlassian | 2, 4, 6, 8, 12, 16, full, tile 25% | 32 -> 6 (live) | xlarge 12, xxlarge 16 | atlassian-shape.js (T), (M) |
| Polaris | 0, 2, 4, 6, 8, 12, 16, 20, 30, full | button `border-radius-200` = 8 | 12-16 | polaris border.ts, Button.module.css (T) |
| Carbon | 0, 2, 4, 8, 16, 24, max | buttons 0 (measured) | tags pill | carbon layout.json (T), (M) |
| M3 (Expressive buttons) | 0, 4, 8, 12, 16, 20, 28, 32, 48, full | square shapes: 32 -> 12, 40 -> 12, 56 -> 16, 96 -> 28, 136 -> 28; pressed 8/8/12/16/16 | dialogs 28 | `_md-comp-button-*.scss`, `_md-sys-shape.scss` (T) |
| Catalyst | xs 2 .. 4xl 32 | 36 -> 8; inner `calc(lg - 1px)` | - | (M) catalyst-docs; existing study |
| Stripe | 2, 3, 4, 5, 6, 8, 12, 14, 16.5 | 32-48 -> 4 | - | (M) stripe-home |
| Linear | 2, 4, 6, 8, 9, 12, 16, 24, 32, 50%, 9999 | marketing CTAs pill; app rows 8 | frame 12 | existing study + (M) |

Radius / height ratios measured (M), modal radius at each height:

| page | 24 | 28 | 32 | 36 | 40 | 44 | 48 |
|---|---|---|---|---|---|---|---|
| Radix playground | 3 | - | 4 | - | 6 | - | 6 |
| Primer docs | - | 6 | 6 | - | - | - | - |
| Geist docs | 4 | - | 6 | 6 | 8 | - | - |
| Untitled React | - | - | 8 | 8 | 8 | 8 | 8 |
| shadcn docs | 8 | 8 | 10 | 10 | - | - | - |
| coss docs | 8 | 10 | 10 | 10 | - | - | - |
| Atlassian | - | - | 6 | - | - | - | - |
| Catalyst | - | - | - | 8 | - | - | - |
| Stripe | - | - | 4 | - | 4 | - | 4 |
| Carbon | - | - | - | - | 0 | - | 0 |

Rho presets and the radii they produce on the ladder (snapped to {4, 6, 8, 10, 12, 14, 16, 18}; engine contract):

| height | tight 0.125 | standard 0.20 | soft 0.30 | softest 0.375 |
|---|---|---|---|---|
| 24 | 3 | 4 | 8 | 8 |
| 28 | 4 | 6 | 8 | 10 |
| 32 | 4 | 6 | 10 | 12 |
| 36 | 4 | 8 | 10 | 14 |
| 40 | 6 | 8 | 12 | 14-16 |
| 44 | 6 | 8-10 | 14 | 16 |
| 48 | 6 | 10 | 14 | 18 |

(Matches: tight = Radix; standard = Primer/Geist/Untitled; soft = coss 24-32, Kaching CTA 14 at 44-48; softest = founder Kestrel 12 at 32.)

### 3.2 Control height, padding, gap, icon, font by system (px)

| System | size -> height / padX / gap / icon / label | Source |
|---|---|---|
| Radix Themes | 1 -> 24 / 8 / 4 / 15 / 12-16; 2 -> 32 / 12 / 8 / 15 / 14-20; 3 -> 40 / 16 / 12 / 15 / 16-24; 4 -> 48 / 24 / 12 / 15 / 18-26 | button.css (T), (M) |
| Radix TextField | 1 -> 24, 2 -> 32, 3 -> 40; padding `space-N - border`; radius-2, radius-2, radius-3 | text-field.css (T) |
| Radix Badge | 1: pad 2/6 gap 6 r3; 2: pad 4/8 gap 6 r4; 3: pad 4/10 gap 8 r4 | badge.css (T) |
| Primer | xsmall 24 / 8 / 4; small 28 / 12 (condensed 8) / 4; medium 32 / 12 / 8; large 40 / 12 / 8; xlarge 48 / 12 / 8; icon 16 live; paddingBlock 2/4/6/10/14 with 20 line-height | size.json5 (T), (M) |
| Carbon | xs 24, sm 32, md 40, lg 48, xl 64, 2xl 80; icon 16 (token icon-size-01), 20 (icon-size-02); expressive icon 20 | layout.json, `_button.scss` (T) |
| Polaris | micro 28 (24 at md-up), slim/medium 32 (28 at md-up), large 36 (32 at md-up); padding 4x8, 6x12, 6x12; icon 20 with -2 px vertical margin | Button.module.css (T) |
| Atlassian | default 32 / pad 6x12 / gap 6 / icon 16; compact 24 (icon-only 24 with 12 or 24 icon) | (M) atlassian-button |
| AlignUI | 40 / 14 / 12 / 20 / r10; 36 / 12 / 12 / 20 / r8; 32 / 10 / 10 / r8; 28 / 8 / 10 / r8; icon margin -4 | alignui-system.md (T) |
| shadcn v4 | default 36 (px-4, 3 with icon), xs 24, sm 32, lg 40; icon 16 (12 at xs); radius-md | button.tsx (T) |
| coss (desktop) | xs 24 / 8 / 4 / 14 / r md; sm 28 / 10 / 6 / 16; default 32 / 12 / 8 / 16; lg 36 / 14 / 8 / 16; xl 40 / 16 / 8 / 18 (text 16); touch +4 | button.tsx (T) |
| Untitled UI | xs 32 / 10 / 4(+2) / 16 / 14-20; sm 36 / 12 / 20; md 40 / 14 / 20; lg 44 / 16 / 20 / 16-24; xl 48 / 18 / 20 / 16-24; weight 600 | button.tsx (T), (M) |
| Catalyst | 36 desktop / 44 mobile; padding (12-1) x (6-1) desktop; icon 16 desktop, 20 mobile; line-height 24 | existing study (M of class strings) |
| M3 | classic 40 / 24 / icon 20 / gap 8; Expressive 32 / 12 / 20; 40 / 16 / 20; 56 / 24 / 24; 96 / 48 / 32; 136 / 64 / 40; icon button 40 state layer, 24 icon | `_md-comp-button*.scss`, icon-button (T) |
| Geist | tiny 24, small 32, medium 40 (live 36), large 48; icon 14-16 live | (D) + (M) |
| HIG | visionOS 28 / 32 / 44 / 52 / 64; hit region >= 44 x 44 pt (60 visionOS) | buttons (D) |

### 3.3 Icon grids, strokes, weights

| Set | grid | native sizes | stroke / weight | optical rules | Source |
|---|---|---|---|---|---|
| Lucide | 24 x 24, 1 px safe zone | 24 | 2 px, round caps and joins, centred strokes | 2 px corner radius (>= 8 px shapes), 1 px (< 8), 2.41 for diagonal right angles; >= 2 px gaps; "visual weight like circle/square"; asymmetric glyphs adjusted optically | design-principles.md, code-conventions.md (D) |
| Heroicons | 24 | 24 outline (1.5), 24 / 20 / 16 solid | 1.5 px | - | README, play.svg (T) |
| Phosphor | 256 | one grid, 6 weights (regular = 16 units = 1.5 px at 24) | 16/256 | - | play.svg (T) |
| Radix Icons | 15 x 15 | 15 | filled paths | odd grid | README (D) |
| Carbon | pixel grids | 16 / 20 / 24 / 32 | - | - | layout.json (T) |
| Material Symbols | 24 | optical size 20-48 | weight 100-700, grade -50..200, fill 0-1 | stroke weight adapts with optical size | Google Fonts docs (D) |
| SF Symbols | - | scales small / medium / large vs cap height | 9 weights = text weights | negative side margins for optical alignment | HIG (D) |
| Untitled UI | 24 | 16 (stroke 2.25), 20 | 2 (1.5 rendered at 16) | - | button.tsx (T) |

Glyph centring, ink offset from viewBox centre as % of viewBox (bbox centre dx,dy | mass centre dx,dy), raster-measured (L):

| glyph | Lucide | Phosphor | Heroicons | Radix Icons |
|---|---|---|---|---|
| play | +4.2, 0 \| -4.2, 0 | +9.4, 0 \| -0.3, 0 | +0.7, 0 \| -7.2, 0 | +3.3, 0 \| -6.3, 0 |
| chevron-right | 0, 0 \| -1.1, 0 | +3.1, 0 \| +2.3, 0 | 0, 0 \| -0.9, 0 | +5.8, 0 \| +5.0, 0 |
| check | 0, -2.1 \| +0.1, +0.8 | +1.6, +3.1 \| +1.6, +6.7 | 0, 0 \| +1.8, +4.4 | +0.8, 0 \| +2.4, +3.2 |
| arrow-up-right | 0, 0 \| +4.5, -4.5 | 0, 0 \| +6.7, -6.7 | 0, 0 \| +8.8, -8.8 | +1.7, -1.7 \| +8.4, -8.4 |
| star (bbox dy) | -1.9 | -1.6 | -0.5 | -4.3 |
| heart (bbox dy) | +2.0 | +3.2 | 0 | 0 |
| plus, minus, x, menu | 0 | 0 | 0 | 0 (-0.1) |

Nudge of the play glyph as a share of the bbox-to-centroid distance: Lucide 50%, Radix 35%, Heroicons 8%, Phosphor 97% (L).

### 3.4 Text centring in a fixed-height flex button (L)

Pixel-measured ink centre of the caps label "HOME" relative to the box centre (px; + = low), 500 weight, DPR 4. Sizes: 13/20 in 32, 14/20 in 40, 16/24 in 48. "trim" = label span with `text-box: trim-both cap alphabetic`.

| font | normal 13 / 14 / 16 | trim 13 / 14 / 16 |
|---|---|---|
| Inter | +0.125 / -0.25 / +0.125 | same |
| Geist | -0.625 / 0 / -0.75 | +0.375 / 0 / +0.25 |
| DM Sans | -0.625 / +0.125 / -0.625 | +0.375 / +0.125 / +0.375 |
| Manrope | +0.25 / -0.125 / +0.125 | same |
| Plus Jakarta Sans | +0.125 / +0.75 / 0 | +0.125 / -0.25 / 0 |
| IBM Plex Sans | -0.5 / +0.125 / +0.375 | +0.5 / +0.125 / +0.375 |
| Roboto | -0.75 / -0.125 / -0.75 | +0.25 / -0.125 / +0.25 |
| Space Grotesk | -0.625 / +0.125 / -0.625 | +0.375 / +0.125 / +0.375 |
| Instrument Sans | +0.125 / -0.125 / +0.25 | same |
| Figtree | -0.625 / -0.875 / -0.625 | +0.375 / +0.125 / +0.375 |
| Outfit | +0.375 / 0 / +0.375 | same |
| Sora | -0.875 / -0.25 / -1.0 | +0.125 / -0.25 / 0 |
| Public Sans | -0.875 / -0.25 / -0.75 | +0.125 / -0.25 / +0.25 |
| Onest | -0.75 / -0.125 / -0.75 | +0.25 / -0.125 / +0.25 |
| Hanken Grotesk | -0.5 / +0.125 / -0.625 | +0.5 / +0.125 / +0.375 |
| Bricolage Grotesque | -0.375 / -0.625 / -0.375 | -0.375 / +0.375 / -0.375 |
| Albert Sans | -0.625 / -1.0 / -0.75 | +0.375 / 0 / +0.25 |
| system-ui (SF) | +0.375 / 0 / +0.25 | same |

Mean |offset| 0.43 px normal, 0.23 px trim; max 1.0 normal, 0.5 trim. Residual +/-0.25-0.5 px is device-pixel snapping of the baseline. Mixed-case labels with ascenders and descenders measure 1.0-2.25 px lower by ink bbox (x-height words sit low by design); the engine's rule is cap-height centring.

### 3.5 Centring lab (L): icon ink centre minus box centre, DPR 1 and 2 identical

Icon, box: 16/32, 15/32, 16/33, 15/33, 20/36, 14/28.

| recipe | 16/32 | 15/32 | 16/33 | 15/33 | 20/36 | 14/28 |
|---|---|---|---|---|---|---|
| inline-block box + inline svg (baseline trap) | 0, -8.0 | +0.5, -8.5 | +0.5, -8.5 | 0, -9.0 | 0, -8.0 | 0, -6.0 |
| same + `display:block; margin:auto` + manual top | 0, 0 | +.5, +.5 | +.5, +.5 | 0, 0 | 0, 0 | 0, 0 |
| `line-height: 0` + inline svg | 0, -8.0 | +0.5, -8.5 | +0.5, -8.5 | 0, -9.0 | 0, -8.0 | 0, -7.0 |
| `vertical-align: middle` | 0, +1.0 | +.5, +1.5 | +.5, +.5 | 0, +1.0 | 0, +1.0 | 0, +1.0 |
| `line-height` = box height + `vertical-align: middle` | 0, +1.0 | +.5, +1.5 | +.5, +.5 | 0, +1.0 | 0, +1.0 | 0, +1.0 |
| inline-flex, center both | 0, 0 | +.5, +.5 | +.5, +.5 | 0, 0 | 0, 0 | 0, 0 |
| inline-grid, place-items center | 0, 0 | +.5, +.5 | +.5, +.5 | 0, 0 | 0, 0 | 0, 0 |
| UA `<button>` + inline svg | 0, -1.0 | +.5, -1.5 | +.5, -1.5 | 0, -1.0 | 0, -1.0 | 0, -1.0 |
| `<button>` inline-flex center, padding 0 | 0, 0 | +.5, +.5 | +.5, +.5 | 0, 0 | 0, 0 | 0, 0 |

Stroke crispness (Lucide `menu`, grey share of line pixels; lower = crisper, `icon-crispness.json`): DPR 1: 24 px 0%, 32 px 50%, 14 px 50%, 15 px 67%, 16 px 100%, 18 px 75%, 20 px 100%; DPR 2: 24 px 0%, 32 px 33%, 16 px 50%, 20 px 50%. Chromium snaps svg boxes to device pixels, so a half-CSS-pixel box offset shows as a 0.5 px shift, not as blur; blur comes from stroke geometry.

### 3.6 Live measurement summary (M), 20 pages, 1440 x 900, DPR 2

| page | icon-only buttons | within 0.25 px | odd parity | ink offset > 0.5 px (icons) | buttons | fractional heights |
|---|---|---|---|---|---|---|
| AlignUI home | 12 | 12 | 0 | 1 / 89 | 36 | 0 |
| Atlassian button docs | 49 | 49 | 0 | 0 / 130 | 21 | 0 |
| Carbon button docs | 70 | 70 | 0 | 0 / 89 | 9 | 0 |
| Catalyst docs | 0 | - | 0 | 0 / 3 | 30 | 0 |
| coss button docs | 3 | 3 | 0 | 0 / 13 | 77 | 0 |
| GitHub home | 6 | 6 | 0 | 19 / 38 | 18 | 2 (29.09, 26.09) |
| Primer docs | 1 | 1 | 0 | 2 / 56 | 76 | 0 |
| Linear features | 1 | 1 | 0 | 8 / 9 | 2 | 0 |
| Linear home | 15 | 15 | 1 | 6 / 96 | 10 | 0 |
| Material 3 buttons | 0 | - | 0 | 0 / 2 | 0 | 0 |
| Polaris button docs | 3 | 3 | 0 | 0 / 3 | 5 | 0 |
| Radix Themes button docs | 11 | 11 | 10 (32 box / 15 icon) | 0 / 31 | 41 | 0 |
| Radix Themes playground | 58 | 58 | 0 | 64 / 193 | 112 | 1 |
| shadcn home | 5 | 4 | 0 | 0 / 45 | 24 | 0 |
| shadcn button docs | 11 | 10 | 0 | 0 / 32 | 173 | 0 |
| Stripe home | 6 | 6 | 0 | 7 / 63 | 33 | 0 |
| Untitled UI home | 13 | 13 | 0 | 0 / 17 | 38 | 0 |
| Untitled UI React | 50 | 50 | 0 | 5 / 139 | 79 | 0 |
| Vercel Geist docs | 12 | 12 | 0 | 1 / 34 | 53 | 0 |
| Vercel home | 0 | - | 0 | 1 / 12 | 1 | 0 |
| total | 326 | 324 (99.4%) | 11 | 114 / 1094 (10.4%) | 838 | 3 (0.4%) |

Ink offset above 0.5 px are mostly intentional optical shifts in asymmetric icons (Radix playground chevrons, Linear marketing glyphs, GitHub octicons at 16/18 px); they are the reason K5 has a per-glyph allowance. Numerals: Stripe 15/19 tabular, AlignUI 115/173 mono, Linear 0/29, Untitled 0/4.

### 3.7 Shadow tables (light and dark)

| System | Level | Light | Dark |
|---|---|---|---|
| Geist | border | `0 0 0 1px #00000014` | `0 0 0 1px #ffffff25` |
| Geist | small | border + `0 2px 2px #0000000a` | - |
| Geist | medium | border + `0 2px 2px #0000000a, 0 8px 8px -8px #0000000a` | - |
| Geist | large | border + `0 2px 2px #0000000a, 0 8px 16px -4px #0000000a` | - |
| Geist | tooltip | border + `0 1px 1px #00000005, 0 4px 8px #0000000a` | - |
| Geist | menu | border + `0 1px 1px #00000005, 0 4px 8px -4px #0000000a, 0 16px 24px -8px #0000000f` | - |
| Geist | modal | border + `0 1px 1px #00000005, 0 8px 16px -4px #0000000a, 0 24px 32px -8px #0000000f` | - |
| Atlassian | raised | `0 1px 1px #1E1F2140, 0 0 1px #1E1F214F` | `0 0 0 1px #00000000, 0 1px 1px #01040480, 0 0 1px #01040480` |
| Atlassian | overlay | `0 8px 12px #1E1F2126, 0 0 1px #1E1F214F` | `0 0 0 1px #BDBDBD1F, 0 8px 12px #0104045C, 0 0 1px 1px #01040480` |
| Atlassian | overflow | `0 0 8px #1E1F2129, 0 0 1px #1E1F211F` | `0 0 12px #0104048F, 0 0 1px #01040480` |
| Polaris | 100 / 200 | `0 1px 0 0 rgba(26,26,26,.07)` / `0 3px 1px -1px rgba(26,26,26,.07)` | - |
| Polaris | 300 / 400 | `0 4px 6px -2px rgba(26,26,26,.20)` / `0 8px 16px -4px rgba(26,26,26,.22)` | - |
| Polaris | 500 / 600 | `0 12px 20px -8px rgba(26,26,26,.24)` / `0 20px 20px -8px rgba(26,26,26,.28)` | - |
| Untitled UI | xs / sm | `0 1px 2px rgba(0,0,0,.05)` / `0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)` | - |
| Untitled UI | lg / xl | `0 12px 16px -4px rgba(0,0,0,.08) + 2 layers` / `0 20px 24px -4px rgba(0,0,0,.08) + 2 layers` | - |
| M3 | levels | 0, 1, 3, 6, 8, 12 (dp) | + primary surface tint |
| Radix | shadow-1..6 | each begins `0 0 0 1px gray-a3` ... `0 12px 60px black-a3` | gray-a6 ring, black-a3..a11 |

Alpha doubling in dark (Atlassian): raised 0x40 -> 0x80, overlay 0x26 -> 0x5C, overflow 0x29 -> 0x8F; Geist ring 0x14 -> 0x25 (white).

### 3.8 Borders, states, focus

| Item | Values |
|---|---|
| Border widths | Primer 1 / 2 / 4; Atlassian 1 (default), 2 (selected, focused); Polaris 0.66 (hairline), 1, 2, 4 |
| Border alpha | light 8% (Geist 7.8%, Polaris 8%); dark 14.5% white (Geist), 5-15% (Linear) |
| Disabled | Atlassian 0.4 (loading 0.2); M3 label/icon 0.38, container 0.1; shadcn, Untitled 0.5; coss 0.64 |
| State layers (M3) | hover 0.08; focus 0.10; pressed 0.10; dragged 0.16 |
| Focus | M3 3 px, outer offset 2; shadcn 3 px ring at 50%; coss 2 px ring + 1 px offset; Untitled 2 px outline, offset 2; Primer 2 px; Atlassian 2 px; Geist 2 px gap + 2 px ring |
| Ramp roles (Radix) | 1 app bg, 2 subtle bg, 3 element bg, 4 hover, 5 active, 6 subtle border, 7 border/focus ring, 8 hovered border, 9 solid, 10 hovered solid, 11 low-contrast text (Lc 60 on step 2), 12 high-contrast text (Lc 90) |
| Ramp roles (Geist) | 1-3 component bg default/hover/active, 4-6 border default/hover/active, 7-8 solid bg and hover, 9 secondary text/icon, 10 primary text/icon |

### 3.9 Type tuples (px size / line-height; weight; tracking)

| System | Tuples |
|---|---|
| Atlassian | body-small 12/16 400, body 14/20 400, body-large 16/24 400; heading xxsmall 12/16, xsmall 14/20, small 16/20, medium 20/24, large 24/28, xlarge 28/32, xxlarge 32/36, all 653 |
| Polaris | body-xs 11/12, sm 12/16, md 13/20, lg 14/20 (450); heading-xs 12/16, sm 13/20, md 14/20 (650), lg 20/24 (650, -0.2px), xl 24/32 (700, -0.2px), 2xl 30/40 (700, -0.3px), 3xl 36/48 (700, -0.54px) |
| Radix | 12/16 (+0.0025em), 14/20 (0), 16/24 (0), 18/26 (-0.0025em), 20/28 (-0.005em), 24/30 (-0.00625em), 28/36 (-0.0075em), 35/40 (-0.01em), 60/60 (-0.025em) |
| Primer | control text 14/20 (medium+), 12/20 (small, derived from padding), 16/24 large |
| Geist | label/copy 14/20, 13/18, 16/24; headings 14/20 -0.28px ... 72/72 -4.32px, weight 600 (existing study) |
| Live control labels | Radix 12/16, 14/20, 16/24 @500; Untitled 14/20, 16/24 @600; coss 12/16, 14/20 @500; Atlassian 14/20 @500; Geist 14/21, 16/24 @500; Primer 12, 14 @500 |

### 3.10 The consistency contract (the engine fills this per brand, in `work/<name>/spec/contract.json`)

Knobs (all required, none left at a library default):

| knob | allowed values | default if founder silent |
|---|---|---|
| `rho` | tight 0.125, standard 0.20, soft 0.30, softest 0.375 | soft 0.30 (founder: product UI soft) |
| `radiusGrammar` | constant, stepped | stepped |
| `radiusLadder` | closed list <= 6 | 4, 6, 8, 10, 12, 14, 16, 22 |
| `iconFamily` | one of Lucide, Phosphor, Heroicons, Radix Icons, Carbon, Material Symbols, SF Symbols (brand marks exempt) | Lucide or Phosphor |
| `iconStrokePx` | 1.25-1.75 rendered | 1.5 |
| `baseLineHeight` | 16, 20, 24 | 20 |
| `density` | compact, default, comfortable (padding and gap only) | default |
| `touch` | fine only, fine + coarse (+4) | fine + coarse |

Table A: control ladder (fill every row; every cell is computed or looked up, none typed):

| size | height H | line-height | label tuple | pad-y = (H - lh - 2b)/2 | pad-x text | pad-x with icon | gap | icon box | stroke-width attr | radius | coarse H |
|---|---|---|---|---|---|---|---|---|---|---|---|
| xs | 24 | 16 | 12/16 500 | 3 (b=1) | 8 | 6 | 4 | 12-14 | computed | f(rho, 24) | 28 |
| sm | 28 | 20 | 13 or 14/20 500 | 3 | 10 | 8 | 6 | 14-16 | computed | f(rho, 28) | 32 |
| md | 32 | 20 | 14/20 500 | 5 | 12 | 10 | 8 | 16 | computed | f(rho, 32) | 36 |
| lg | 40 | 20-24 | 14/20 or 16/24 500 | 9-7 | 16 | 14 | 8 | 20 (18 coss) | computed | f(rho, 40) | 44 |
| xl | 48 | 24 | 16/24 500-600 | 11 | 18-24 | 16-20 | 8-12 | 20-24 | computed | f(rho, 48) | 52 |

Reference fill 1 (coss desktop, source-verified): 24 / 8 / 4 / 14; 28 / 10 / 6 / 16; 32 / 12 / 8 / 16; 36 / 14 / 8 / 16; 40 / 16 / 8 / 18. Reference fill 2 (Untitled UI, source-verified): 32 / 10 / 16; 36 / 12 / 20; 40 / 14 / 20; 44 / 16 / 20; 48 / 18 / 20 with radius 8 constant. Reference fill 3 (Radix Themes): 24 / 8 / 4 / 3; 32 / 12 / 8 / 4; 40 / 16 / 12 / 6; 48 / 24 / 12 / 8 with 15 px icons.

Table B: radius by class (for brands with a class-based ladder, e.g. founder Kestrel): item/badge/tooltip 8; 32 px header and panel controls 12; card, chat bubble, app surface 16; outer frame 22; hero CTA 14 at 44; nav button 12 at 40. Rule: the next class up is 1.25-2.0x the previous; a child inside a padded parent uses parent - padding.

Table C: icon size by control size (from Table A) and by text size: icon / label font-size in [1.0, 1.43]; icon-only buttons square at control height.

Table D: spacing list (2.4), line-heights on the 4 px grid, one density mode.

Table E: type tuples (3.9 shape): <= 9 marketing, <= 7 app, each with tracking, weight, numerals.

Table F: shadow ladder, light and dark (3.7 shape): levels 0-3 (flat ring, raised, floating, modal) x {light layers, dark layers}; ring alpha 0.08 light, 0.145 dark; card alpha <= 0.16 and blur <= 24; modal alpha <= 0.28.

Table G: borders (1 / 2 / 4 px), dividers (one alpha token), focus (2 px ring, 2 px gap), disabled opacity (0.4), hover/pressed steps (n+1, n+2) or overlays (0.08, 0.10).

### 3.11 `tools/check.mjs` additions: what to measure and the thresholds

Port `PAGE_FN` from `knowledge/benchmarks/consistency/measure-live.mjs` (about 120 lines; icon container discovery, svg vs box centre, ink bbox from child shapes, Range + canvas `measureText` for cap centre, radius with CSS clamp, nested-corner audit). Run at DPR 2, 1440 x 900, then at 390 x 844. Severity: FAIL blocks delivery, WARN needs a line in DIRECTION.md.

| id | measure | how | PASS | WARN | FAIL |
|---|---|---|---|---|---|
| K0 | contract completeness | `contract.json` has every knob and Tables A-G; padding, radius, icon computed | all present | - | any blank cell |
| K1 | icon-only centring | svg rect centre - container border-box centre, container = nearest button/a/[role]/chip with chrome | max(abs dx, abs dy) <= 0.25 px | <= 0.5 | > 0.5 |
| K2 | icon+text vertical | svg centre y - container centre y; svg centre y - label cap-centre y | box <= 0.5; cap <= 0.5 | cap <= 1.0 | box > 0.5 or cap > 1.0 |
| K3 | parity | ((boxW - svgW) and (boxH - svgH)) are even integers | both even | one odd | - |
| K4 | icon ladder | svg size in Table A for that control height; icon/height in [0.4, 0.58]; icon/font-size in [1.0, 1.43]; one size per control size | all | one outside | two or more |
| K5 | ink offset | union of child shape rects centre - svg centre | symmetric glyph <= 0.02 x size; asymmetric <= 0.10 x size | up to 0.15 | beyond |
| K6 | radius ladder | radius/height vs rho +-0.04; same height same radius; grammar monotone/constant | all | one stray | two or more stray |
| K7 | nested radius | child at uniform inset d (1 <= d <= r_parent): abs(r_parent - d - r_child) | <= 1 px | <= 2 | > 2 |
| K8 | pill consistency | pill share of buttons/inputs per bar and page | 0 or >= 0.8 | mixed in one bar | pill button beside non-pill input in one row |
| K9 | row heights | controls in one flex row: max h - min h | 0 | <= 0.5 | > 0.5 |
| K10 | label cap-centring | cap-centre - control centre (button, tab, chip, badge) | <= 0.5 px | <= 0.75 | > 1.0 |
| K11 | state stability | hover/focus/active bounding box vs rest, per control type | 0 | - | any change |
| K12 | shadow ladder | box-shadow strings vs Table F; max alpha, blur by level; dark ring present | all in table | one off-table | alpha/blur over caps, no ring in dark |
| K13 | icon family and stroke | distinct (viewBox, stroke-linecap, stroke-linejoin, stroke-width x scale) fingerprints | 1 family, rendered stroke within +-0.25 | 2 | 3+ |
| K14 | type tuples | (size, line-height, weight, letter-spacing) of text nodes in table; tabular on numeric tables | all | one off | > 2 off |
| K15 | integer geometry | control heights integer (+-0.02); lh % 4 == 0 for UI text <= 32 px | all | - | any fractional control height |
| K16 | half-pixel layout | control or icon rect left/top fractional part at DPR 2 not in {0, 0.5}; at DPR 1 not 0 | all | - | - |
| K17 | variant box stability | same size, primary vs outline vs ghost: outer W/H and content offsets | identical | - | differs |
| K18 | focus recipe | `:focus-visible` ring width 2-3 px, offset 2 px (or ring + 1 px offset), same across 5 control types, contrast >= 3:1 | all | contrast 2.5-3 | missing |

K1/K2/K10 reference implementation exists in `measure-live.mjs`; `measure-text-centering.mjs` shows the pixel-exact alternative (screenshot clip, scan rows for ink) for unit-testing a component in isolation.

## 4. Dos and Don'ts: the common centring and radius bugs, with the fix

Each bug lists symptom, cause, fix. Fixes were verified in the lab (L) where noted.

1. **Icon rides the top of its box (inline svg).** Cause: svg is `display: inline; vertical-align: baseline` inside a block; the line box, not the container, positions it (-8 px in a 32 px box, L). Fix:
   ```css
   .icon-box { display: inline-flex; align-items: center; justify-content: center; width: var(--h); height: var(--h); }
   .icon-box > svg { display: block; flex: none; width: var(--icon); height: var(--icon); }
   ```
   ```jsx
   <button className="grid size-8 place-content-center rounded-lg"><PlayIcon className="size-4 shrink-0" /></button>
   ```
2. **Icon 1 px low or high after "fixing" with `vertical-align: middle` or `line-height`.** Cause: `middle` aligns to baseline + half x-height of the parent font (+1.0 px with Arial 14 px, L). Fix: flex or grid only; delete `vertical-align` hacks.
3. **Half-pixel icon (odd minus even).** Cause: 15 px icon in a 32 px box, 16 in 33 (L); Radix Themes ships 15 px icons in even boxes (M). Fix: choose icon = even for even boxes. Guard:
   ```js
   if ((box - icon) % 2 !== 0) throw new Error(`icon ${icon} in box ${box}: odd parity`)
   ```
   ```css
   .btn { --h: 32px; --icon: 16px; /* (32-16)/2 = 8, whole */ }
   ```
4. **Icon squeezed into an oval inside a tight flex row.** Cause: svg is a flex item with `flex-shrink: 1`. Fix: `flex: none` (or `shrink-0`) and explicit width and height attributes (shadcn `[&_svg]:shrink-0`, coss `[&_svg]:shrink-0`).
5. **Label looks low or high next to the icon although both are "centred".** Cause: line box centre != cap-height centre (-1.0 to +0.75 px across 18 fonts, L). Fix:
   ```css
   .btn { display: inline-flex; align-items: center; height: var(--h); }
   .btn > .label { text-box: trim-both cap alphabetic; } /* mean error 0.43 -> 0.23 px, max 1.0 -> 0.5 (L) */
   ```
   Fallback when unsupported: measure the offset once with `measure-text-centering.mjs` and add `padding-top: 0.5px` (Radix input pattern); record it in the contract.
6. **Control heights drift with font or fallback font.** Cause: height from `line-height: normal` + padding (github.com: 29.09 px). Fix: `height: var(--h); line-height: var(--lh); padding-block: 0;` and let flex centre the content; or derive `padding-block: calc((var(--h) - var(--lh)) / 2 - var(--bw))`.
7. **Outline button 2 px bigger than primary (or narrower).** Cause: border present on one variant only. Fix: every variant has `border: 1px solid transparent`, padding `calc(var(--px) - 1px)`.
8. **Pinched corners on nested shapes.** Cause: child radius equals parent radius although inset by padding. Fix:
   ```css
   .card { --r: 16px; --pad: 8px; border-radius: var(--r); padding: var(--pad); }
   .card > .media { border-radius: max(0px, calc(var(--r) - var(--pad))); }       /* 8px */
   .btn::before { inset: 0; border-radius: calc(var(--r-btn) - 1px); }              /* inner highlight */
   ```
   If padding >= radius the child radius is 0 and the child needs `overflow: hidden` on the parent.
9. **Same-height controls with different radii (button 10, field 8, select 12).** Cause: radius picked per component. Fix: radius comes from the height-keyed table: `--r: var(--r-32)` for every 32 px control; check K6.
10. **Pill CTA beside rectangular input.** Cause: mixing grammars. Fix: pill is a theme switch; `border-radius: max(var(--radius-3), var(--radius-full))` as Radix does, or keep CTAs and fields on the same rho.
11. **Play triangle looks left-heavy in a circle.** Cause: bbox-centred triangle; centroid sits w/6 left of bbox centre. Fix for stock sets: do nothing (Lucide already +4.2%, Phosphor +9.4%, Heroicons +0.7%, Radix +3.3%); for a custom triangle:
   ```css
   .play-glyph { translate: calc(var(--w) / 12) 0; } /* 50% of the w/6 bbox-to-centroid gap */
   ```
12. **Double-nudged icon.** Cause: translate added on a stock icon whose optical offset is already in the viewBox. Fix: delete the translate; verify with ink offset K5.
13. **Chevron looks off after swapping icon sets.** Cause: set offsets differ (+0.0 / +3.1 / +5.8 % of viewBox). Fix: one family per surface (K13); if mixing, subtract the measured offset.
14. **Icon too light at small size.** Cause: `stroke-width: 2` on a 24 grid drawn at 16 px = 1.33 px. Fix: `stroke-width: calc(1.5 * 24 / var(--icon-px))` (or `vector-effect: non-scaling-stroke` with `stroke-width: 1.5px`).
15. **Fractional switch or checkbox parts.** Cause: track `h-[1.15rem]` = 18.4 px around a 16 px thumb (shadcn), Radix checkbox 14 box / 9 indicator. Fix: even minus even (AlignUI: 20 box / 16 inner; 32x20 switch / 28x16 track / 12 thumb).
16. **Hover makes the control jump.** Cause: border or padding added on hover. Fix: reserve the border box in every state; draw rings with `box-shadow: 0 0 0 1px` or `inset`.
17. **Icon colour and weight differ between variants.** Fix: one opacity per variant (0.9 Radix, 0.8 coss) and one stroke target for the family.
18. **Dark-mode cards look flat or muddy.** Cause: blur-only shadow on a near-black surface. Fix: 1 px light ring (Geist `#ffffff25`) and ~2x shadow alpha (Atlassian 0x40 -> 0x80).
19. **Founder Kestrel regression: "if the product is that rounded why the buttons are so stiff".** Fix: CTA radius >= 0.3 x height and within 4 px of the product card radius; nav buttons 12.

Do / Don't pairs:

- **Do** compute the icon box as `height / 2` snapped to even and keep `(box - icon)` even (Untitled UI 32/16, 36/20, 40/20). **Don't** pick 15 or 18 px icons for a 32 px control (Radix Themes buttons, shadcn 18 px sidebar icon in 32 px boxes) unless the box is odd too.
- **Do** write `padding-inline: calc(var(--px) - 1px)` on bordered controls (coss, Catalyst). **Don't** reuse the same padding with and without a border.
- **Do** make the radius a function of height or class and compute inner radii (Radix text field). **Don't** hand-type 7, 9, 11 radii page by page (AlignUI marketing page has 14 distinct radii at 1440).
- **Do** centre with flex or grid and `display: block` on the svg (Primer IconButton `inline-grid; place-content: center`). **Don't** centre with `text-align: center; line-height: Npx` (the +1.0 px lab result).

## 5. Exceptions & judgement calls

- **Constant vs stepped radius:** both are consistent. Constant (Untitled 8, Primer 6, Catalyst 8) is calmer and simpler to check; stepped (Radix, Geist) keeps small chips visibly rounder in proportion. Soft brands usually want stepped because 8 px on a 48 px CTA reads stiff (founder Kestrel round 1: "if the product is that rounded why the Start for free ... are so stiff").
- **Founder ladder vs ratio rule:** the founder's soft product ladder (8 / 12 / 16 / 22) is class-based and its control ratio (12 / 32 = 0.375) is above every surveyed system. It outranks the ratio table; the engine reads rho from the founder ladder when it exists.
- **Optical vs geometric centring:** the checks centre the box exactly (K1) and allow bounded ink offsets (K5), because stock sets already contain the optical shift. For play, send and arrow glyphs the right answer is a family-specific offset (Lucide +4.2%, Phosphor +9.4%), so the allowance is per glyph class, not zero.
- **Cap-height vs x-height centring:** designers usually align icons to the cap-height centre for caps/numbers and to a point between x-height and cap centre for lowercase; the lab measures cap centre because it is the stricter and font-independent reference. Lowercase words measure 1.0-2.25 px lower by ink bbox (descenders and the x-height weighting), so do not use a mixed-case ink-bbox centre as the target.
- **`text-box-trim` support:** works in Chromium 133+ (measured on 156) and Safari 18.2+, not Firefox as of this study [engine note]; keep the measured padding fallback and keep the K10 check authoritative.
- **Hairlines on 1x displays:** Chromium snaps svg boxes to device pixels; crispness at DPR 1 depends on stroke geometry (24 px native is the only size that was fully crisp in the lab), so deliver screenshots at DPR 2.
- **Fully-specced vs craft:** AlignUI's marketing layer breaks its own kit with 14 radii and 23 type tuples (alignui-method.md); that looseness is a warning for the checker (WARN), not an accepted style.
- **Pill hero CTAs with 8 px app UI (Linear):** two grammars are allowed when the boundary is stated (marketing pill, product 8 px) and never mixed in one bar.
- **Tabular numerals:** only Stripe among the sampled pages sets them on numeric text; this is a rule of the engine and the founder (money cards), not a measured industry default.

## 6. Figures worth keeping

- `knowledge/benchmarks/consistency/summary.md` and `summary.json`: per-page tables (icon centring, text centring, heights, radius by height, nested radius).
- `knowledge/benchmarks/consistency/raw/*.json`: row-level measurements for 20 pages (icons, controls, radii).
- `knowledge/benchmarks/consistency/glyph-centering.json`: ink and mass offsets for 20 glyphs in four icon sets.
- `knowledge/benchmarks/consistency/text-centering.json`: 324 pixel measurements, 18 fonts x 3 sizes x normal/trim x 3 labels.
- `knowledge/benchmarks/consistency/centering-lab.json`: 9 CSS recipes x 6 icon/box pairs x DPR 1 and 2.
- `knowledge/benchmarks/consistency/icon-crispness.json`: stroke crispness by size, offset, stroke mode, DPR.
- `knowledge/benchmarks/consistency/measure-*.mjs`: the scripts that produced the data; `PAGE_FN` in `measure-live.mjs` is the starting implementation for K1-K10.
- Source files read for this note (not stored): Radix Themes `button.css`, `_internal/base-button.css`, `icon-button.css`, `text-field.css`, `segmented-control.css`, `callout.css`, `_internal/base-checkbox.css`, `tokens/radius.css`, `tokens/space.css`; Primer `size.json5`, `radius.json5`, `border.json5`, `ButtonBase.module.css`; Carbon `_button.scss`, `layout.json`; Material Web `_md-comp-button*.scss`, `_md-sys-shape.scss`, `_md-sys-state.scss`, `_md-sys-elevation.scss`, `_md-comp-checkbox.scss`, `_md-comp-icon-button.scss`; Polaris `Button.module.css`, `border.ts`, `shadow.ts`, `size.ts`, `text.ts`, `font.ts`; Atlassian `atlassian-shape.js`, `atlassian-spacing.js`, `atlassian-typography.js`, `atlassian-light.js`, `atlassian-dark.js`; shadcn `button.tsx`, `input.tsx`, `badge.tsx`, `checkbox.tsx`, `switch.tsx`; coss `button.tsx`; Untitled UI React `button.tsx`; Lucide `design-principles.md`, `code-conventions.md`; Apple HIG JSON pages (buttons, toolbars, icons, sf-symbols, typography, app-icons); Google Material Symbols docs.

## 7. Open questions

- Vercel Geist, Linear, Stripe and Apple HIG do not publish component source or token JSON (Geist: docs page names sizes only; Linear/Stripe: live measurement only). Their rows come from rendered pages and docs text; their internal radius-by-size tables are unverified.
- Tailwind Catalyst is a paid product: its numbers come from the public docs page class strings (existing study) and one live page (36 px buttons, radius 8); its component source was not read.
- Material 3 web (m3.material.io) returned almost no component instances in the measurement (JS-rendered demos); M3 values come from the Material Web token files, not from the live page.
- Apple HIG: control heights for iOS/macOS are not stated in the fetched HIG JSON (only visionOS 28/32/44/52/64 and the 44 pt hit region); the macOS control size ladder was not verified and is not used.
- Text-centring lab used macOS Chromium 156 with Google Fonts web fonts; Windows and Linux rasterisers snap baselines differently. Re-run `measure-text-centering.mjs` in the CI environment that produces deliverable screenshots.
- The `rho` presets are groupings of measured ratios (tight 0.125, standard 0.20, soft 0.30, softest 0.375); the boundaries are an engine choice. The founder has given absolute radii (his own ladder), not a ratio.
- Live measurement caveat: `capDy` uses canvas font metrics for the baseline (fast, within about 0.3 px of the pixel lab on Geist/Inter); use the pixel method when a decision is within 0.5 px.
- GitHub and Vercel marketing pages returned no numeric text nodes in the numerals scan (dynamic content); tabular-numeral evidence rests on Stripe, AlignUI, Linear and Untitled UI.
- Not studied: RTL mirroring of icon offsets, high-contrast/forced-colors icon behaviour, and animation of radius morphing (M3 pressed shapes).
