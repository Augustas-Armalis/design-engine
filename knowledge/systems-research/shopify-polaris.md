---
source: web:polaris.shopify.com (source repo github.com/Shopify/polaris, archived) + shopify.dev/docs/api/app-home/polaris-web-components + npm @shopify/polaris-tokens 9.4.2 + @shopify/polaris 13.9.5
chapter: Shopify Polaris, tokens, density, surfaces, motion, content
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [design-system, polaris, tokens, density, surfaces, color-roles, depth, motion, content, admin-ui, licence]
status: studied
---

# Shopify Polaris

Machine-readable profile: `system/systems-research/shopify-polaris.json`. Raw copies (untrusted data, gitignored): `corpus/web/systems/polaris/` (npm tokens + sparse git clone of `polaris.shopify.com/content` and `polaris-tokens/src`), `corpus/web/systems/polaris-react/`.

Evidence grading as in `knowledge/web/color-and-surfaces.md`: **[verified]** read from package CSS/TS or the docs MDX source in this session; **[computed]** script-produced; **[engine note]** my inference.

**Status and licence first.** `polaris.shopify.com` 301-redirects to `shopify.dev/docs/api/polaris`; the GitHub repo `Shopify/polaris` is archived and described "Polaris React (Deprecated)"; the live system is Polaris web components (`s-button`, `s-text-field`, ...) [verified: api.github.com + WebFetch redirect]. The licence is a MIT variant that limits use to apps that integrate with Shopify and, for stand-alone external apps, requires them to be "dissimilar and visually distinct from Shopify products" [verified: LICENSE.md in both npm packages]. **For this library: study structure, rules and values; never ship a Polaris-lookalike for a non-Shopify product.**

## 1. Core ideas

1. **"Pro design language."** Four stated pillars: assign meaning (colour roles heightened: red means danger, green means go), increase density (space optimised for data-rich views), craft "juicy" interactions (physical-feeling presses), make it predictable (similar-looking objects behave the same) [verified, design/pro-design-language.mdx].
2. **Colour is described as relationships between six roles**, not as swatches: background (baseline, never has another background above it), surface (cards, tables, banners, modals; the most versatile), fill (small, vibrant, with strict `on-fill` text), border (tables only), text (default/secondary/tertiary, link), icon (standalone only) [verified, design/colors/using-color.mdx].
3. **Palette = 13 ramps x 16 steps in HSLuv lightness** (docs say 12 colours), so the same step of any hue has identical contrast against the same neutral; swapping hue in a role is a no-risk edit [verified: palettes-and-roles.mdx; polaris-tokens colors.ts has gray, azure, blue, cyan, green, lime, magenta, orange, purple, red, rose, teal, yellow + black/white alpha].
4. **Brand is near-black, not a colour.** Role `brand` is `#303030` fill (`#1a1a1a` hover) so the primary action is the only heavy object on the page; blue is demoted to `emphasis` (links, focus) [verified in styles.css].
5. **Density is a task decision.** High density for index pages, data tables, popovers and action lists; low density for focused editing (product detail) with one card per context. Rules: do not suddenly change density inside an action list; do not mix low-density copy with a high-density table in one card [verified, design/layout/density.mdx].
6. **Surfaces divide space, lines do not.** "Divider lines are reserved for data and index tables"; elsewhere nest tinted surfaces (secondary `#f7f7f7`, tertiary `#f3f3f3`) in a 2x2 or list pattern [verified, spacial-organization.mdx].
7. **Nested radius shrinks.** Inset surfaces get a smaller radius than the parent; never equal or larger; never change a button's or badge's radius just to nest it [verified].
8. **Depth is lighting.** Shadows plus multi-layer inset "bevels" make primary controls look physically raised; pressed controls darken and drop; selected/active pages brighten; a screen should have few layers (menu -1, background 0, card 1, popover 2) [verified, depth/creating-depth.mdx].
9. **Type is 4px-aligned with two scales (heading, body)**, tight tracking only on large bold headings, tabular numerals mandatory for money, and a mobile theme that raises body from 13 to 16px [verified: tokens].
10. **Content design is a first-class discipline**: keep it lean (Jenga test), write like merchants talk (7th-grade reading level, contractions), inspire action (verbs first, one next step), errors that say what to do [verified, content/*.mdx].

## 2. Rules

- **RULE [SYS-POLARIS-01]** Treat colour as roles with allowed adjacencies: use a background only at the page level and never stack backgrounds; put cards, tables, banners and modals on surface colours; use fills only on small areas (buttons, badges); use borders for tables; use icon colours only for standalone icons.
  **Why** Strict adjacency keeps hierarchy legible in a dense UI and keeps contrast guarantees valid.
  **Applies to** SaaS app UI
  **Check** DOM audit: element using a fill token has area below a threshold (for example < 5% viewport) and is not a full-page or full-card background; no nested `bg` tokens.
  **Source** polaris design/colors/using-color.mdx (repo Shopify/polaris, content)

- **RULE [SYS-POLARIS-02]** Use `on-fill` text and icon tokens only on their own fill (for example `text-success-on-bg-fill` only on `bg-fill-success`); never put plain `text` on a fill.
  **Why** On-fill pairs are contrast-tuned per fill; mixing "might not pass minimum contrast ratio".
  **Applies to** all
  **Check** pair table: every text over a `bg-fill-*` background uses the matching `*-on-bg-fill` token; computed contrast >= 4.5:1.
  **Source** polaris design/colors/using-color.mdx

- **RULE [SYS-POLARIS-03]** Give each semantic role one job and a refusal list: critical = impossible, blocked or error only; warning = needs intervention (strongest non-blocking); caution = stalled or not started, never announcements; success = everything is OK, never promotions; info = tips and incentives, never urgent; brand = one primary action per area.
  **Why** If red or yellow is used decoratively, merchants stop trusting it; scarcity keeps the role legible.
  **Applies to** SaaS app UI
  **Check** visual / content review: critical colour appears only with an error/blocked message; at most one `bg-fill-brand` control per region.
  **Source** polaris design/colors/palettes-and-roles.mdx

- **RULE [SYS-POLARIS-04]** Choose density per task: high density (tables, index pages, option lists, popovers) with 28px controls and 13px body; low density (focused editing) with larger targets and one card per context; never switch density suddenly inside an action list and never put a high-density table inside a low-density text card without a separate card.
  **Why** Density signals the kind of work; unexpected shifts break scanning rhythm.
  **Applies to** SaaS app UI | admin
  **Check** within one list/card the set of row heights has one value; table card contains no free-form long text blocks.
  **Source** polaris design/layout/density.mdx

- **RULE [SYS-POLARIS-05]** Divide surfaces with nested tinted surfaces (list or 2x2 grid, symmetric); reserve horizontal divider lines for data and index tables.
  **Why** Lines everywhere create visual noise and make a UI look like a document; tinted insets group without extra ink.
  **Applies to** SaaS app UI
  **Check** count of `border-top/bottom` separators inside non-table cards = 0; inset surfaces use `bg-surface-secondary` or `tertiary`.
  **Source** polaris design/layout/spacial-organization.mdx

- **RULE [SYS-POLARIS-06]** Make nested radii strictly smaller than the parent (card 12px with inset 8px or 4px) and do not change the radius of buttons or badges to fit a container.
  **Why** Concentric corners read as purpose-built; equal radii at different depths look like misalignment.
  **Applies to** all
  **Check** computed `border-radius` of any child with a visible background < parent's radius.
  **Source** polaris spacial-organization.mdx "Nesting"

- **RULE [SYS-POLARIS-07]** Name spacing by multiplier of the 4px base (`space-100` = 4px, `space-400` = 16px), restrict space tokens to margin/padding/gap, and prefer semantic tokens (`space-card-padding`, `space-button-group-gap`, `space-table-cell-padding`) used only on the CSS property they name.
  **Why** A name that equals the maths removes lookup errors; semantic tokens let a component change spacing in one place.
  **Applies to** all
  **Check** all padding/margin/gap values multiples of 4 (allow 2 and 6 half-steps from scale); no space token used for `width`/`height`.
  **Source** polaris design/layout/layout-tokens.mdx; polaris-tokens space scale

- **RULE [SYS-POLARIS-08]** Align all line-heights to a 4px multiple (12, 16, 20, 24, 28, 32, 40, 48) and use tabular numerals for currency and any numeric table column; never fake it with a mono font.
  **Why** Stable bounding boxes make vertical rhythm predictable; tabular digits align decimals.
  **Applies to** SaaS app UI | tables
  **Check** computed `line-height` % 4 = 0; `font-variant-numeric: tabular-nums` on `td`/price spans.
  **Source** polaris design/typography/using-type.mdx; tokens font-line-height-300..1200

- **RULE [SYS-POLARIS-09]** Use shadows and bevels only on important interactive objects, in one consistent style, with few layers per screen; darken on press, brighten when raised or active; do not use layering as the first emphasis tool and do not invent unique inset styles for footers.
  **Why** Overused depth turns the page into clutter; consistent lighting is what makes depth read as physical.
  **Applies to** SaaS app UI
  **Check** distinct `box-shadow` values per page <= 4 families; pressed state darker than rest.
  **Source** polaris design/depth/creating-depth.mdx

- **RULE [SYS-POLARIS-10]** Animate one element with a meaningful direction (deeper = right-to-left, back = left-to-right), keep feedback motion simple (a checkbox tick, not a scaling halo), avoid per-element staggered page transitions, and use a spinner that spins rather than a static hourglass.
  **Why** Many simultaneous moves disorient; motion that contradicts spatial direction misleads.
  **Applies to** SaaS app UI
  **Check** visual; at most one animated property group per transition; durations from {50..500ms} tokens.
  **Source** polaris design/motion/using-motion.mdx, creating-motion.mdx

- **RULE [SYS-POLARIS-11]** Ship a mobile theme as a diff on the same tokens: below 768px raise body-md from 13 to 16px (lh 24), heading-md to 16px, controls one step taller (28 to 32, 32 to 36), card gap 8px, and replace bevels with 1px ring borders.
  **Why** Touch needs larger text and targets; keeping one token vocabulary avoids a second design system.
  **Applies to** mobile
  **Check** computed body font-size >= 16px and button height >= 32px at 375px width.
  **Source** polaris-tokens `light-mobile` theme; styles.css Polaris-Button size media rules

- **RULE [SYS-POLARIS-12]** Write buttons as a short imperative in sentence case with no article and no punctuation ("Add tags", "Save", not "Save product" or "Add a tag(s)"); use an icon-only or plus-sign label when the icon is universal; put a red button only on actions that are hard or impossible to undo; lead with one primary action.
  **Why** Predictable, minimal labels are scanned faster and reduce choice paralysis.
  **Applies to** all
  **Check** regex on button text: Title Case, leading articles, trailing punctuation.
  **Source** polaris components/actions/button.mdx; content/grammar-and-mechanics.mdx

- **RULE [SYS-POLARIS-13]** Write errors as: what is wrong, what to do, specific data, no "invalid", no over-apology, no "we" unless the platform caused it; multiple errors lead with the fix ("To save this product, make 2 changes:" then a list); place the error next to what needs fixing; red for must-fix-now, yellow for workflow warnings.
  **Why** Error text is a task instruction; jargon and apologies add reading time without fixing anything.
  **Applies to** forms | SaaS app UI
  **Check** regex: `invalid`, `Sorry`, `Oops`; each error contains an imperative verb.
  **Source** polaris content/error-messages.mdx

- **RULE [SYS-POLARIS-14]** Do not move focus programmatically without a user action, except to interrupt; move focus to an overlay the user opened, to the error summary after a failed submit, and to content a same-page link points at.
  **Why** Unexpected focus jumps break screen-reader and keyboard flow.
  **Applies to** all
  **Check** code review: `.focus()` calls only in handlers tied to a user event or error submit.
  **Source** polaris foundations/accessibility.mdx

- **RULE [SYS-POLARIS-15]** Respect the system's licence boundary: when a third-party system forbids lookalikes (Polaris requires non-Shopify apps to be dissimilar and visually distinct), borrow principles and number ranges only and diverge in palette, shape language and type voice.
  **Why** Legal exposure and, separately, sameness: this engine's first principle is divergence.
  **Applies to** design systems | this engine
  **Check** licence field recorded in the system profile; direction file lists what differs.
  **Source** LICENSE.md, @shopify/polaris 13.9.5

## 3. Numbers & scales

| Group | Values |
|---|---|
| Space (px) | 0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128 (names 0, 025, 050, 100, 150, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2400, 2800, 3200) |
| Semantic space | card-padding 16, card-gap 16 (8 mobile), button-group-gap 8, table-cell-padding 6 |
| Radius (px) | 0, 2, 4, 6, 8, 12, 16, 20, 30, full; buttons 8, cards 12 |
| Border width (px) | 0, 0.66, 1, 2, 4 |
| Breakpoints (px) | xs 0, sm 490, md 768, lg 1040, xl 1440 |
| Z-index | 100, 400, 510, 512 ... 520 |
| Type, desktop (px/lh/weight) | h3xl 36/48/700 (-0.54px); h2xl 30/40/700 (-0.3px); hxl 24/32/700 (-0.2px); hlg 20/24/650 (-0.2px); hmd 14/20/650; hsm 13/20/650; hxs 12/16/650; body-lg 14/20/450; body-md 13/20/450; body-sm 12/16/450; body-xs 11/12/450 |
| Type, mobile theme | h2xl 32/40; hxl 22/28; hlg 18/24; hmd 16/20; hsm 14/20; body-lg 18/28; body-md 16/24; body-sm 14/20; body-xs 12/16 |
| Button heights (px) desktop / mobile | micro 24/28; slim 28/32; medium 28/32; large 32/36; padding-inline 8 (micro) 12 (others); gap 2 |
| Motion (ms) | 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 5000 |
| Easings | ease `0.25,0.1,0.25,1`; in `0.42,0,1,1`; out `0.19,0.91,0.38,1`; in-out `0.42,0,0.58,1` |
| Shadow ramp | 100 `0 1px 0 .07`, 200 `0 3px 1px -1px .07`, 300 `0 4px 6px -2px .20`, 400 `0 8px 16px -4px .22`, 500 `0 12px 20px -8px .24`, 600 `0 20px 20px -8px .28` (all rgba(26,26,26)) |
| Gray ramp (1-16) | `#fff #fdfdfd #fafafa #f7f7f7 #f3f3f3 #f1f1f1 #ebebeb #e3e3e3 #d4d4d4 #ccc #b5b5b5 #8a8a8a #616161 #4a4a4a #303030 #1a1a1a` |
| Key light roles | bg `#f1f1f1`, surface `#fff`, text `#303030`, text-secondary `#616161`, border `#e3e3e3`, brand fill `#303030`, emphasis blue `#005bd3`, critical fill `#c70a24`, success fill `#047b5d`, warning fill `#ffb800`, info fill `#91d0ff`, magic `#8051ff` |
| Contrast [computed] | text on surface 13.2; text-secondary 6.19; link 6.11; icon-secondary 3.45; text-disabled 2.05 (exempt); hairline border 1.28; text-critical on critical surface 8.09; dark text 10.28 |

Counts: 452 unique `--p-*` custom properties in tokens CSS; 67 documented public components in 11 categories (+ internal-only, deprecated); 122 component folders in the React build; web components catalogue lists 51 elements in 7 groups.

## 4. Dos and Don'ts

- **Do** "Save", "Add tags", "Buy new domain". **Don't** "Save product", "Add a tag(s)", "Buy New Domain".
- **Do** "To save this product, make 2 changes: Enter title / Add weight". **Don't** "There are 2 errors on this page. Invalid title".
- **Do** "Couldn't deposit payout / The bank account we have on file was closed... / Update bank account". **Don't** "Invalid bank account ... / Next".
- **Do** nest tables in cards with other content; **Don't** nest a table in a card where it is the only content.
- **Do** use different body sizes and colours to build hierarchy in complex components; **Caution** using the same body size everywhere hides key elements.
- **Don't** use mono to align numbers; use tabular numerals.
- **Don't** use more than one "learn more" link per screen; **Don't** use "click here".

## 5. Exceptions & judgement calls

- Breaking alignment is allowed "rarely", only between separate containers (never within one), using imaginary keylines so containers look aligned even if maths differs [verified, spacial-organization.mdx].
- Tabular numbers may be dropped for very large promotional numbers (plans page) [verified].
- High density is the default; low density is not a separate theme but a layout choice.
- Dark and high-contrast themes are marked experimental; do not copy them as finished specs. [engine note] The structure (white-alpha fills, bevel highlights at 8-16%) is still a useful reference for dark treatment of raised controls.
- Body 13px is intentionally small for admin density. [engine note] Do not carry it to marketing or reading surfaces; use at least 16px there.
- The interaction-states prose page is flagged "currently being reworked for v12"; rely on CSS (`--pc-button-*` state matrix) for truth.

## 6. Figures worth keeping

No images captured. Source MDX references figures under `/images/design/...` (layout density do/don't, spatial organisation nesting, depth layers, pro design language) that were not fetched.

## 7. Open questions

- The exact web-components token set (shopify.dev) vs the React-era `--p-*` tokens: unverified whether values diverged; page text did not describe theming or tokens.
- Button radius 8px and card radius 12px are read from compiled CSS/JS defaults; Figma kit values unverified.
- Focus ring: `outline: 2px solid border-focus; offset 1px` [verified]; no documented contrast target beyond "WCAG 2.1 A and AA".
- Whether "dark-experimental" shipped to merchants: unknown.
- Which web-component tokens replaced `bg-fill-brand` near-black; unknown.
- Palette docs say 12 colours x 16; source ramps list 13: unresolved (docs lag source).
- URLs: https://polaris.shopify.com (redirects), https://shopify.dev/docs/api/app-home/polaris-web-components, https://github.com/Shopify/polaris (content under polaris.shopify.com/content/{design,content,foundations,components,tokens}), npm @shopify/polaris-tokens, @shopify/polaris.
