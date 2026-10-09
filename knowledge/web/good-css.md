---
source: web:https://good-css.com/ (Vojta Holik; repo github.com/vojtaholik/good-css, MIT)
chapter: good-css: 47 modern CSS techniques, each with a live specimen (crawled in full 2026-10-09)
pages: n/a
topic_tags: [css, modern-css, reset, oklch, color-mix, light-dark, clamp, fluid-type, grid, subgrid, container-queries, has, logical-properties, text-box, text-wrap, focus-visible, hover, press, hit-area, view-transitions, scroll-driven, anchor-positioning, popover, dialog, starting-style, details, clip-path, property, shadows, scroll-snap, safe-area]
status: studied
---

# good-css.com: modern CSS technique list, studied for the engine

## 0. What the site is, and how fully it was crawled

- good-css.com is a small, static site: one list of **47 techniques in 8 categories** (Foundations 6, Layout 8, Spacing and shape 4, Text and media 5, Interaction 8, Motion 6, Show and hide 4, Scroll and viewport 6). Every entry has the same shape: when to use it, the CSS, why it works, rules, who it is borrowed from, a `Support:` line.
- **Crawl coverage (complete).** `sitemap.xml` lists 51 URLs: the home page, `/about`, `/contact`, `/privacy` and 47 `/specimen/<slug>` pages. There is no RSS or Atom feed (`rss.xml`, `feed.xml`, `atom.xml` all 404). Machine-readable twins exist for every page: `/index.md` (the whole list, 92 KB), `/llms.txt`, `/llms-full.txt` (same body without front matter), `/specimen/<slug>.md`, `/about.md`, `/contact.md`, `/privacy.md`, and `/skills/good-css/SKILL.md` plus eight `references/*.md` files (the same entries with "Why it works" and credits stripped). I read `index.md`, `SKILL.md`, the reference files, about, contact, privacy, the GitHub README, the site stylesheet and one specimen page's HTML. About, contact and privacy have no technique content (about: maintainer Vojta Holik, entries credit their sources; contact: vojta@holik.dev, send corrections by email; privacy: no cookies, no analytics, fonts self-hosted, Vercel hosting).
- **Specimens** are tiny fixtures (a dotted lilac canvas with the entry's own CSS blocks run verbatim inside `@layer demo`-style fixtures). Screenshots of 19 specimens and the home page are in `knowledge/benchmarks/good-css/` (`home-fold.png`, `home-full.png`, `spec-*.png`). They show the technique, not a design to copy.
- **Provenance of the techniques.** None originate on the site. Each credits Kevin Powell, Ahmad Shadeed (Defensive CSS), Heydon Pickering and Andy Bell (Every Layout), Josh Comeau, Una Kravets, Bramus, Adam Argyle, Jhey Tompkins, Emil Kowalski, Rauno Freiberg, Chris Coyier, Stephanie Eckles, Utopia (Gilyead/Mudford) and **Stripe's own stylesheets** (view source of stripe.com: `@property` hover driver, the opacity-crossfaded shadow, `clip-path` nav reveal, `:has()` card focus ring, scroll-timeline overflow detection, anchor-positioned nav indicator). Stripe credits are the entries most relevant to premium SaaS finish.
- **Tested-in-browser claims** on the site (Chrome 150, real Safari 27, 2026-10-01) are marked "site-tested" below. Firefox is often untested by the author. My own checks: Chromium 156 (Playwright 1.64) reports `CSS.supports` true for every property used here (`text-box`, `interpolate-size`, `field-sizing`, `light-dark()`, anchor positioning, `position-area`, scroll timelines, `::details-content`, `:user-invalid`, `pow()`, `1cap`, `1lh`, `@starting-style`, `transition-behavior`), and false for unprefixed `line-clamp`, matching the site. Cross-checked against the engine's MDN snapshot in `implementation-craft.md` 3.1: no disagreement beyond the popover/anchor version note in section 7.
- **The site is also a design artefact** (lilac `oklch(0.851 0.017 297.5)` ground, near-black violet ink `oklch(0.236 0.025 295)`, one sulphur accent `oklch(0.847 0.164 115.5)`, ultra-wide black grotesque wordmark, Inter + Geist Mono, a rendered lime sphere with construction lines as hero art, a dot grid, a header that changes tone as you scroll). It is a dev-tool poster aesthetic, which the founder has rejected as a default (see section 5). Take the techniques, not the look.

## 1. Core ideas

1. **One declaration that adapts beats a breakpoint ladder; a CSS feature beats a script; JS only makes an already-working result nicer.** Every entry is built to work with no script and degrade silently.
2. **The technique is the property and value, not the class name.** Write it in the project's own system (Tailwind utilities, arbitrary properties, plain CSS). Where Tailwind has no shorthand, use an arbitrary property; never swap the technique for a breakpoint. The kit is on Tailwind 4.3.3, which has the logical utilities (`mbs-`, `pe-`, `inset-bs-` need 4.2+).
3. **Components respond to the space they are given** (container queries, intrinsic grids, wrap-on-its-own sidebars), so the same card works in a sidebar, a hero bento slot and a pricing grid.
4. **Spacing is owned by the parent or the pair, not by the child.** `gap`, the `* + *` owl, and neighbour-aware section spacing (`:has(+ x)` / `x + y`) remove per-page overrides and spacer elements.
5. **Colour is derived, not enumerated.** One `oklch()` base, `color-mix(in oklch, ...)` for hover, tint and alpha; grays use the `none` hue so mixes never drift to red; `light-dark()` per token so one set of tokens serves system theme, a manual toggle and an always-dark section.
6. **Polish primitives are CSS, and they are measurable**: cap-height icons, trimmed labels, concentric radii, a hit area built with a pseudo-element, a shadow that fades instead of repainting, a focus ring that moves to the card.
7. **Motion is opt-in.** Movement lives inside `@media (prefers-reduced-motion: no-preference)`; fades may stay outside. Two easing tokens, durations at or under 300ms for UI (200-500ms for modal/drawer), named properties, never `transition: all`, never `ease-in`.
8. **Entry/exit and layout animation are native now**: `@starting-style` + `allow-discrete` for `display: none`, `interpolate-size` for `height: auto` (Chrome only), `::details-content`, anchor positioning for popovers and a sliding nav indicator, cross-document view transitions for multi-page sites. Each has a support caveat that decides whether it is used as the main path or as an enhancement.
9. **The site is honest about gaps**: most entries end "write no fallback" (the page works without the effect) and carry tested support lines, including cases where Safari 27 behaves differently from Chrome.
10. **Things deliberately left out** (decided 2026-10-01, "do not add these back"): the layout half of Travis Arnold's reset (`grid-area` on `*`, a body grid, `display: contents` on divs), a global `text-box: trim-both` (a one-line 16px/1.5 paragraph shrank from 25px to 11px, a button from 40px to 27px), and `text-rendering: optimizeLegibility`.

## 2. Rules

### 2.1 Foundations: reset, colour, fluid type

- **RULE** Start every new build from one small reset: `box-sizing: border-box; min-width: 0` on `*, ::before, ::after`, and give any fixed-size image, icon or avatar in a flex row `flex: none`.
  **Why** Flex and grid items default to `min-width: auto`, so a long word or wide child overflows its track; `min-width: 0` lets them shrink, but then a sized media item shrinks too unless it opts out.
  **Applies to** all. **Check** computed `min-width` is `0px` on a flex child; no horizontal scrollbar at 1440 and 375 with a long unbroken string in a card; fixed media has `flex-shrink: 0`. **Source** good-css.com/specimen/the-reset

- **RULE** Set `text-wrap: pretty` on `:root` (inherits everywhere) and `text-wrap: balance` on h1-h4. Treat `pretty` as an enhancement: Firefox ignores it.
  **Why** `balance` evens heading lines; `pretty` makes the browser spend more effort avoiding a one-word last line (Safari also evens the ragged edge). It also applies to textareas, so set `text-wrap: stable` on a field where lines jump while typing.
  **Applies to** all. **Check** computed `text-wrap` on h1 is `balance`, on p is `pretty`; no last line of a hero subtitle holds a single short word (still hand-break two-line subtitles per founder taste). **Source** good-css.com/specimen/the-reset

- **RULE** Set `font-synthesis: none` and load every weight and style the design uses; use the two macOS smoothing declarations (`-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`) on `:root`.
  **Why** Without it the browser fakes a bold or italic the font lacks; with it a missing weight silently renders as regular, so the font load list must be complete. Grayscale antialiasing renders thinner type that matches Figma.
  **Applies to** all. **Check** every `font-weight` used in the page has a loaded face (document.fonts); `font-synthesis` computes to `none`. **Source** good-css.com/specimen/the-reset

- **RULE** Put `scrollbar-gutter: stable` on `:root`, and pair it with `html:has(dialog:modal) { overflow: hidden }` for scroll-locking.
  **Why** Reserving the gutter stops a sideways page shift when a modal removes the scrollbar or content grows past one screen. Trade-off documented on the site: centred content sits slightly off-centre on a page too short to scroll.
  **Applies to** all. **Check** `body` width unchanged before and after opening a modal; computed `scrollbar-gutter` on `html`. **Source** good-css.com/specimen/the-reset; good-css.com/specimen/has-for-parent-and-page-state

- **RULE** Use `100svh` for documents and heroes, `100dvh` only for app shells that pin UI to the bottom.
  **Why** `svh` is the viewport with mobile toolbars showing, so nothing hides behind them and nothing re-lays out; `dvh` tracks the moving toolbar and re-flows on every change.
  **Applies to** landing page: svh. SaaS app UI: dvh. **Check** grep `100vh` returns nothing; hero `min-height` uses `svh`. **Source** good-css.com/specimen/the-reset

- **RULE** Set form inputs to `font-size: max(16px, 1rem)`; never fix iOS focus zoom with `user-scalable=no` or `maximum-scale=1`.
  **Why** iOS Safari zooms the page on focus of any input under 16px and does not zoom back; disabling zoom takes it away from users who need it.
  **Applies to** all (mobile). **Check** computed font-size of `input, textarea, select` >= 16px; viewport meta has no `user-scalable`. **Source** good-css.com/specimen/the-reset

- **RULE** On controls set `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent`, and give every pressable element its own `:active` state in the same change. Restrict `user-select: none` to controls, never body or links.
  **Why** `manipulation` removes the double-tap-zoom wait so `click` fires at once; removing the tap highlight removes the only native feedback, so `:active` has to replace it; people copy text from body and links.
  **Applies to** all. **Check** every `button, a, [role=button]` has a `:active` rule; `user-select` is not `none` on `body`, `p`, `a`. **Source** good-css.com/specimen/the-reset; good-css.com/specimen/press-feedback

- **RULE** Never add `text-box: trim-both` to `*`, never set `text-rendering: optimizeLegibility`, and never use a reset that puts `display: contents` or one shared grid cell on every element.
  **Why** The site measured the damage: a global trim shrank a one-line 16px/1.5 paragraph from 25px to 11px and a 40px button to 27px; the grid-cell reset stacks everything in one cell and `display: contents` on containers removes their boxes and breaks the breakout grid; MDN recommends `auto` for body text rendering.
  **Applies to** all. **Check** grep the stylesheet for `\* *\{[^}]*text-box`, `optimizeLegibility`, `display: contents` on `div`. **Source** good-css.com/skills/good-css/references/foundations.md ("Left out on purpose")

- **RULE** Write spacing, borders, offsets and alignment with logical properties (`padding-inline`, `margin-block-end`, `inset-inline-end`, `border-inline-start`, `text-align: start`). The four-value shorthands (`margin`, `padding`, `inset`) stay physical, so use the `-inline` / `-block` shorthands.
  **Why** `inline` and `block` follow `dir` and `writing-mode`, so one declaration set renders mirrored in RTL with no second stylesheet.
  **Applies to** all. **Check** grep for `margin-left|margin-right|padding-left|padding-right|left:|right:` in authored CSS (allow in third-party); Tailwind: `mbs-`, `pe-`, `inset-bs-` instead of `mt-`, `pr-`, `top-` (4.2+). **Source** good-css.com/specimen/logical-properties

- **RULE** Define colours in `oklch()` and derive every related colour from one base with `color-mix(in oklch, ...)` (hover: mix with black 15%; subtle tint: 12% of the base in `transparent`). Never hardcode a second hex or an `rgba()` for a hover, tint or alpha.
  **Why** Lightness is perceptual, so scales and contrast are predictable; mixing in OKLCH keeps the hue where sRGB mixing drifts toward gray; one base drives the family.
  **Applies to** all. **Check** hover/tint tokens are `color-mix()` expressions of a base token; no stray `rgba(` for brand tints. **Source** good-css.com/specimen/oklch-color

- **RULE** Write grays, white and black as `oklch(L 0 none)`, with `none` (or the `white` keyword) as the hue, never `oklch(1 0 0)`.
  **Why** A written hue of `0` is red and pulls mixes toward red; the site measured half white `oklch(1 0 0)` and half a hue-264 blue landing at hue 312 in Chrome and Safari, versus staying at 264 with `none`.
  **Applies to** all. **Check** grep `oklch\([^)]* 0 0\)` (chroma 0 with hue 0) in token files. **Source** good-css.com/specimen/oklch-color; good-css.com/specimen/one-set-of-color-tokens-for-light-and-dark

- **RULE** Give each colour token both themes with `light-dark(a, b)`, declare `color-scheme: light dark` on `:root`, switch themes by setting `color-scheme` (on `html`, or on one section for an always-dark band), and add `<meta name="color-scheme" content="light dark">`. Do not redefine the tokens under `.dark`.
  **Why** `light-dark()` resolves per element from the computed scheme, so the same tokens serve the system setting, a manual toggle and a dark section; the meta tag makes the browser paint the right background before CSS loads; `color-scheme` also flips form controls and scrollbars.
  **Applies to** all. **Check** no duplicated token block under a theme class; `light-dark()` takes colours only (images need their own rule); Baseline since May 2024 (Chrome 123, Firefox 120, Safari 17.5). **Source** good-css.com/specimen/one-set-of-color-tokens-for-light-and-dark

- **RULE** Build fluid values as `clamp(min, rem + vw, max)`, never a bare `vw`, with both bounds in `rem`; derive the preferred value from two points (`slope = (max - min) / (wide - narrow)`, `vw = slope * 100`, `rem part = min - slope * narrow`) and put it in a token.
  **Why** `clamp(1rem, 1vw, 1.75rem)` stays at 16px on every screen under 1600px because 1vw is smaller than 1rem until then, and a bare `vw` ignores the reader's font-size setting.
  **Applies to** all. **Check** no `font-size: Nvw`; every fluid token has a `rem` term. **Source** good-css.com/specimen/fluid-sizes-with-clamp

- **RULE** Keep a fluid font size's maximum at or below 2.5 times its minimum.
  **Why** The `vw` part does not grow when the reader zooms, so fluid text grows less than the page; past 2.5x, 500% zoom cannot double the text at some widths, which fails WCAG 1.4.4 (Resize Text).
  **Applies to** all. **Check** for every fluid font token, `max / min <= 2.5`. A 72px-at-1440 hero h1 that shrinks to 40px on mobile is 1.8x and passes. **Source** good-css.com/specimen/fluid-sizes-with-clamp

- **RULE** When a design has more than two or three font sizes, derive the type and space scale from six plain-number inputs (narrow and wide viewport in rem as unitless numbers, base size at each end, ratio at each end) with `pow()`, one `clamp()` for `--fluid`, and components that only read the step tokens.
  **Why** It replaces a per-breakpoint size table and a generator someone must re-run; steps stay within 0.001px of the formula (site-tested Chrome 150, Safari 27). Space pairs (`--space-s-l`) give small-on-phone to large-on-desktop padding (18px to 40px in the example).
  **Applies to** all. **Check** inputs are unitless (Firefox cannot divide length by length); step `n` passes when `(size-wide / size-narrow) * (ratio-wide / ratio-narrow)^n <= 2.5`; a pair is never used for a font size. Support Chrome 120, Firefox 118, Safari 15.4. **Source** good-css.com/specimen/one-fluid-scale-for-type-and-space

### 2.2 Layout

- **RULE** Replace the `section > .container` pair with one content grid on the section: a three-width grid with named lines (`full-width`, `breakout`, `content`), where children default to `grid-column: content` and any child opts into `breakout` or `full-width` with one class. A full-width band uses `grid-template-columns: inherit` so its inner content still aligns to the page column.
  **Why** `min(100% - 2*gutter, max)` shrinks the content column with no media query; `minmax(0, ...)` breakout tracks collapse on small screens so the page cannot overflow; named lines make `grid-column: content` work without numbers. Change widths by overriding `--content`, not the template.
  **Applies to** landing page. **Check** content column x-edges equal the nav and hero left/right edges (the founder's one-left-edge rule); every direct child is placed (an unplaced child lands in the gutter track); no horizontal overflow at 375. **Source** good-css.com/specimen/content-grid-with-breakouts

- **RULE** Lay out equal cards with `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))`; use `auto-fill` instead when the item count changes (filters).
  **Why** The column count follows the container with no breakpoints; `min(100%, 16rem)` lets the minimum shrink to a narrow container; `auto-fit` stretches a short last row, `auto-fill` keeps card size.
  **Applies to** all. **Check** no card-grid breakpoint ladder; a 200px-wide container does not overflow. **Source** good-css.com/specimen/intrinsic-grid

- **RULE** Make card parts line up across a row with subgrid: the grid gives each card `grid-row: span N` and the card uses `grid-template-rows: subgrid` with its own `row-gap`; N equals the number of parts in the card.
  **Why** Each card adopts the parent's row tracks, so the tallest title in a row sets the title height for all cards; titles, bodies and footers align regardless of copy length. Without the span every part piles into one row; without `row-gap` the card inherits the parent's gap.
  **Applies to** landing page feature/pricing cards; SaaS app UI card grids. **Check** footers' top y equal across cards in a row with unequal body lengths. Subgrid: Chrome 117, Firefox 71, Safari 16. **Source** good-css.com/specimen/subgrid-rows-shared-across-cards

- **RULE** For a pair where one side has an ideal width (media object, input plus button, page plus aside), use the wrap-on-its-own sidebar: `flex-wrap: wrap`, sidebar `flex-basis` ideal width with `flex-grow: 1`, main `flex-basis: 0; flex-grow: 999; min-inline-size: 50%`. For a sticky sidebar add `align-self: start`.
  **Why** The huge grow factor gives the main side all free space; below 50% it wraps and both go full width. The wrap point is a share of the container, so changing `min-inline-size` moves it. A stretched sidebar has no room to stick, and a bare `img` as a side stretches and distorts (use `align-items: start`).
  **Applies to** all. **Check** the pair stacks without a media query when the container narrows; sticky sidebar computes `align-self: start`. **Source** good-css.com/specimen/sidebar-that-wraps-on-its-own

- **RULE** Make any component that appears in slots of different widths respond to its container: a `container-type: inline-size` ancestor, `@container (width > 30rem)` for layout changes and `cqi` units in `clamp()` for fluid type per component.
  **Why** A media query only knows the viewport; the same KPI card or pricing card is right in a sidebar and in a wide column. Constraints measured by the author: the container must be an ancestor (an element cannot query itself); never put `container-type` on a shrink-to-fit element (it collapses to zero); a container cannot also be a subgrid, so use separate elements; with no container above, `cqi` falls back to the viewport, so one token serves the page and every slot; never register a `cqi` token with `@property` (it computes once on `:root`).
  **Applies to** SaaS app UI (dashboard widgets) and landing page bento. **Check** widget layout changes when the slot width changes at a fixed viewport; no `container-type` on an inline-sized element. Support Chrome 105, Firefox 110, Safari 16. **Source** good-css.com/specimen/container-queries-with-container-units

- **RULE** Stack overlapping layers by putting them in one grid cell (`display: grid` on the parent, `grid-area: 1 / 1` on children, `place-self` to align each) instead of `position: absolute` offsets; keep `position: absolute` for a layer that must not affect the container's size.
  **Why** Layers stay in flow, so the container takes the size of its largest layer; absolute children add nothing to it. Later DOM children paint on top; use `z-index` only to change that.
  **Applies to** all (text over image, badge on a card, two swapping icons, hero copy over a visual). **Check** the container height equals the tallest layer without a fixed height. **Source** good-css.com/specimen/stack-layers-with-grid

- **RULE** Use `safe` alignment (`justify-content: safe center`) on centred or end-aligned flex rows that can overflow (tab rows, toolbars, vertically centred modals).
  **Why** Plain `center` pushes overflow off the start edge where scrolling cannot reach; `safe` falls back to `start` once content overflows. Auto margins on the item give the same safe centring in every browser with flexbox. Support Chrome 115, Firefox 63, Safari 17.6.
  **Applies to** SaaS app UI. **Check** the first tab is reachable (scrollLeft 0 shows it) when the row overflows. **Source** good-css.com/specimen/safe-alignment

- **RULE** Cut off overflow with `overflow: clip`, not `hidden`, unless a script scrolls the element or it has `resize`; put it on the element that overflows, never on `html` or `body`.
  **Why** `hidden` makes the element a scroll container (and sets the other axis to `auto`), which causes stray scrollbars and breaks `position: sticky` inside it; `clip` cuts and does neither. A cut-off hero visual that bleeds off the frame is the common case.
  **Applies to** landing page hero frames; SaaS app UI. **Check** no `overflow: hidden` on hero or section wrappers that contain sticky children. Support Chrome 90, Firefox 81, Safari 16. **Source** good-css.com/specimen/overflow-clip-over-hidden

### 2.3 Spacing and shape

- **RULE** Give each section its own default `padding-block` and fix awkward meetings with neighbour pair rules: `A:has(+ B)` adjusts A's bottom edge, `A + B` adjusts B's top edge, `:where(A + *)` adds a divider with zero specificity. Name sections by what they are (`.hero`, `.faq`), never by page.
  **Why** The rules describe pairs, not pages, so whatever order an editor picks, each meeting gets the right spacing and every other pair keeps the default; no spacer elements or per-page overrides.
  **Applies to** landing page (reorderable sections, CMS). **Check** zero spacer divs; no per-page padding overrides; the pair list stays short (merge pairs that share a reason, such as equal backgrounds). **Source** good-css.com/specimen/section-spacing-that-depends-on-its-neighbors

- **RULE** Let the parent own vertical space between siblings: `display: flex; flex-direction: column; gap` in components whose children you know, and the margin form (`> * { margin-block: 0 }`, `> * + * { margin-block-start: var(--flow-space, 1em) }`, a heading sets `--flow-space: 2em`, what follows a heading sets 0.5em) for CMS or Markdown content.
  **Why** A margin describes a relation between neighbours, so a child that owns its margin leaves it behind as the last child of a padded box. `gap` leaves nothing above the first or below the last and ignores hidden children (the margin form counts them).
  **Applies to** all. **Check** no `margin-bottom` on children of a stacked container; a flex-column child button gets `align-self: start` (it otherwise stretches full width); keep the `>` in the margin form. **Source** good-css.com/specimen/space-between-siblings-set-by-the-parent

- **RULE** Push one item to the far end of a flex row or column with an auto margin (`margin-block-start: auto` for card actions, `margin-inline-start: auto` for an account link), and centre a title between a header and a footer with `margin-block: auto` inside a `min-block-size: 100svh` column.
  **Why** An auto margin takes all free space on its side; two opposite auto margins split it. It replaces spacer elements and `space-between` on containers with more than two children. `gap` is the minimum when no free space remains. The centred item is centred in the leftover space, not in the section (a footer with no header pulls the title up by half the footer height). Use `min-block-size`, never `block-size`.
  **Applies to** all (card footers, nav actions, full-height hero). **Check** card CTAs share one baseline y across a row of unequal cards. **Source** good-css.com/specimen/push-one-item-away-with-an-auto-margin

- **RULE** Nest rounded elements concentrically: `outer radius = inner radius + padding`, derived with `calc()` from the inner radius (the other way round hits zero once padding exceeds the radius).
  **Why** Two curves look parallel only when they share a centre; equal radii make the corner band look pinched. This is the same rule the engine already enforces (consistency-mechanics.md 2), here with the derive-from-inner direction and a 0.5rem / 1.5rem / 3rem padding demo.
  **Applies to** all (the hero `Frame` shell, image in card, button in input). **Check** `parent radius - child radius` within 1px of the padding. **Source** good-css.com/specimen/concentric-nested-radius

### 2.4 Text and media

- **RULE** Decide for every user or CMS string what happens when it is too long: wrap (`overflow-wrap: break-word` on `:root`), one line with ellipsis (`white-space: nowrap; overflow: clip; text-overflow: ellipsis` on the text element), or N lines (all four of `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: N; overflow: clip`).
  **Why** `break-word` breaks a word only when it cannot fit alone and inherits, so one root declaration covers the page; `min-width: 0` lets the item shrink but does nothing for the word, so the two need each other. Never use `anywhere` on the root: it also shrinks min-content and a content-sized box collapses to one letter per line (use it on table cells, which ignore `break-word`). Put padding on a wrapper, not on the clamped element (the next line shows through bottom padding). Truncate only text readable in full elsewhere.
  **Applies to** SaaS app UI (tables, names, URLs), landing page testimonial cards. **Check** a 60-character unbroken string in every text slot causes no overflow at 375 and 1440. Site-tested: with `overflow: clip` the ellipsis and clamp draw in Chrome 150 and Safari 27; Firefox untested, fall back to `hidden`. **Source** good-css.com/specimen/long-text-that-wraps-truncates-or-clamps

- **RULE** Give every media slot you do not control a stable box: `inline-size: 100%; block-size: auto; aspect-ratio: W / H; object-fit: cover` plus a background colour for the load and failure state; `object-fit: contain` for logos and product shots; avatars `flex: none` with equal sizes.
  **Why** `aspect-ratio` computes height before the file loads (no CLS); `cover` crops where the default stretches. A fixed `height` attribute beats the ratio, an image with transparency must not get a background, and in real Safari 27 a failed image ignores `aspect-ratio` and draws a square (put the ratio on a wrapper where a failed load must not move layout).
  **Applies to** all. **Check** CLS is 0 with images blocked; `object-fit` is `cover` or `contain` on every content image. **Source** good-css.com/specimen/image-box-that-holds-any-upload

- **RULE** Draw the hairline edge of avatars and photos as `outline: 1px solid` at about 10% black (white in dark, via `light-dark()`) with `outline-offset: -1px`.
  **Why** A negative-offset outline sits inside the image edge, takes no space and follows `border-radius` (Chrome 94, Firefox 88, Safari 16.4), so a white avatar on a white card still has an edge; it needs the `color-scheme` from the tokens or it stays black in dark mode.
  **Applies to** all. **Check** computed `outline-offset: -1px` on avatars, alpha <= 0.1. **Source** good-css.com/specimen/image-box-that-holds-any-upload

- **RULE** Use `font-variant-numeric: tabular-nums` on prices, table cells, `time`, timers, counters and chart labels, not globally, and only in a font that ships tabular figures.
  **Why** Equal digit widths align columns and stop a ticking value from shifting its neighbours; proportional digits read better in prose; with no tabular figures in the font nothing changes.
  **Applies to** SaaS app UI; landing page product figures. **Check** computed `font-variant-numeric` includes `tabular-nums` on every `td`, `time`, currency figure; not on `body`. **Source** good-css.com/specimen/tabular-numbers

- **RULE** Centre single-line labels in buttons, badges and chips on their letters with `text-box: trim-both cap alphabetic` on the text element (the `<span>` inside an `inline-flex` button, because it has no effect on a flex or grid container), and raise the padding to keep the height.
  **Why** A line box reserves unequal space above the capitals and below the baseline per font, so equal padding puts letters off-centre; trimming cuts to cap height and baseline so a font swap no longer moves the label. Site measurement: a 0.75rem-padded button went 48px to 35px. I measured Inter 500 18px/1.2 with 12px padding in Chromium 156: 45.6px plain, 37.1px trimmed, so pad up by ~4.25px per side to keep 45.6. Scope it to labels, one line, with no fallback (support Chrome 133, Firefox 154, Safari 18.2).
  **Applies to** all. **Check** button height computed after the change equals the spec (Kaching hero CTA / founder 44px target): re-measure; label ink centre within 0.5px of box centre; never on `*`. **Source** good-css.com/specimen/label-centered-on-its-letters-with-text-box

- **RULE** Size an icon beside a label by the text, not in `px`: in an `inline-flex` row with `align-items: baseline; gap: 0.5em`, give the `svg` `flex: none; block-size: 1cap; inline-size: auto`, and for a notice whose label wraps give it `inline-size: 1em; block-size: 1lh` with `align-items: start`.
  **Why** `1cap` is the capital height so the icon reads as one more capital and resting its bottom on the baseline stands it where a capital stands; `1lh` makes the icon box the height of the first line so it stays beside line one when the text wraps. A 16px icon on 16px text is 5-7px shorter than the capitals of 32px text. Measured by me in Chromium 156: Inter 18px gives a `1cap` icon of 13.09px (cap height 0.727). Needs a `viewBox`; icon sets with built-in padding look small, so raise the number and keep the unit (`1.2cap`). With the trimmed label above, `align-items: center` also lines up at both edges. Support: `cap` Chrome 118, Firefox 97, Safari 17.2; `lh` Chrome 109, Firefox 120, Safari 16.4.
  **Applies to** all. **Check** icon height within 1px of the label's cap height (font-size x cap-height ratio); no icon sized in `px` next to text. **Source** good-css.com/specimen/icon-sized-by-the-text-beside-it

### 2.5 Interaction

- **RULE** Use one global focus style on `:focus-visible`: `outline: max(2px, 0.08em) solid currentColor; outline-offset: 0.25em`. On a filled button set the outline colour to the button's background; for a ring drawn with `box-shadow` keep `outline-color: transparent`, never `outline: none`.
  **Why** The browser decides when a ring helps (keyboard yes, mouse click on a button no, text input always); `currentColor` and `em` make it follow each component; `outline` takes no layout space and survives forced-colors mode, which removes `box-shadow`.
  **Applies to** all. **Check** grep `outline: *none` returns nothing; tab through the page: every interactive element shows a ring with contrast >= 3:1 against its surround. **Source** good-css.com/specimen/one-focus-ring-with-focus-visible

- **RULE** Wrap every `:hover` rule in `@media (hover: hover) and (pointer: fine)`.
  **Why** Touch browsers apply `:hover` on tap and keep it until the next tap elsewhere; `pointer: fine` also rules out styluses and Android devices that claim hover. Tailwind v4's `hover:` variant only wraps `(hover: hover)`, so the full query must be written by hand in custom CSS; touch feedback comes from `:active`.
  **Applies to** all. **Check** every `:hover` selector sits inside the media query (the kit's `.btn-white:hover` currently uses `(hover: hover)` only). **Source** good-css.com/specimen/hover-styles-only-where-hover-exists

- **RULE** Give every button and pressable surface `:active { transform: scale(0.97) }` (range 0.95-0.98) with `transition: transform 160ms var(--ease-out)` inside the reduced-motion query; drive JS feedback from `pointerdown`, not `click`.
  **Why** A native button responds the instant a finger lands, `:active` does the same on every input; feedback on `click` arrives when the finger leaves and reads as lag; `scale()` shrinks label and icon together. Founder: Kaching press scale is 0.98, inside this range.
  **Applies to** all. **Check** computed transform on `:active` is `scale(0.95..0.98)`; transition duration 100-160ms. **Source** good-css.com/specimen/press-feedback

- **RULE** Extend small targets to 44px with a pseudo-element on the button: `position: relative` on the button and `::after { content: ""; position: absolute; inset: min(0px, (100% - 44px) / 2) }`.
  **Why** The pseudo-element belongs to the button so its clicks hit the button, the negative inset grows the area to exactly 44px, and `min(0px, ...)` leaves larger targets alone. It does not work on `<input>` (wrap it in a `<label>`) and `overflow: hidden/clip` on the button cuts it off.
  **Applies to** SaaS app UI icon buttons; landing page close buttons. **Check** `elementFromPoint` 22px outside the visible box of a 28px icon button returns the button. Do not combine with the card-link `::after` or the shadow `::before/::after` on the same element. **Source** good-css.com/specimen/hit-area-larger-than-the-visual

- **RULE** Make a whole card clickable with one real link inside its heading and a stretched `::after` (`position: absolute; inset: 0`) on that link; the card is `position: relative`, other buttons and links get `position: relative; z-index: 1`, and the focus ring moves to the card with `.card:has(.card-link:focus-visible)` while the link's own ring is `2px solid transparent`.
  **Why** It keeps a real link (open in new tab, status-bar URL) and a short accessible name ("Quarterly report", not the whole card read aloud), where a wrapping `<a>` makes a screen reader read every word and a `div` click handler is not a link. No positioned element may sit between the card and the link (the overlay would size to it); text under the overlay cannot be selected; Safari ignores `outline-color` on its default ring so write the full `2px solid transparent`. Hover styles go on `.card:hover` inside the hover query.
  **Applies to** landing page blog/feature/pricing cards; SaaS app UI list rows. **Check** the card's focus ring appears on keyboard focus; the accessible name of the link is the title only; click on the card padding navigates. Support Chrome 105, Firefox 121, Safari 15.4. **Source** good-css.com/specimen/whole-card-clickable-from-one-link

- **RULE** Style a parent by what it contains or the state of a child with `:has()` (`article:has(img)`, `form:has(:focus-visible)`) instead of a script-added class; on the root use it as a page-wide listener (`html:has(dialog:modal) { overflow: hidden }`).
  **Why** `:has()` matches by descendants or following siblings and accepts state pseudo-classes. `:modal` matches `showModal()` only, so a non-modal dialog does not lock the page; keep `scrollbar-gutter: stable` with the lock; `:has()` cannot nest inside `:has()`.
  **Applies to** all. **Check** no JS toggling a class solely to mirror child state. Support Chrome 105, Firefox 121, Safari 15.4. **Source** good-css.com/specimen/has-for-parent-and-page-state

- **RULE** Validate inline with `:user-invalid` / `:user-valid` driven by HTML attributes (`required`, `minlength`, `type`, `pattern`), never blur listeners plus a "touched" class, and pair the colour with text or an icon.
  **Why** `:invalid` matches an empty required field on load; the `:user-` forms match only after the user has edited the field or tried to submit. Colour alone is not enough feedback (WCAG 1.4.1); the server still validates. Support Chrome 119, Firefox 88, Safari 16.5.
  **Applies to** forms in SaaS app UI and funnels. **Check** no error styling visible on first paint of an untouched form; each error state has a text or icon cue. **Source** good-css.com/specimen/form-feedback-with-user-invalid

- **RULE** Grow a textarea with `field-sizing: content`, bounded by `min-height` and `max-height` in `lh` (for example `3lh` to `12lh`) and `resize: none`; to animate the height, let a `ResizeObserver` copy the textarea's border-box height onto a `content-box` wrapper that transitions `height` and clips, with the border and background on the wrapper.
  **Why** The browser measures the text, so the size is right on first paint, paste and resize with no mirror element; the textarea reaches its final height at once and only the wrapper animates. A fixed `height` brings fixed size back; past `max-height` it scrolls; a browser without support shows a fixed scrolling textarea. Support Chrome 123, Safari 26.2, Firefox 152 (Baseline newly available June 2026).
  **Applies to** SaaS app UI (chat/AI composer, comment box). **Check** the composer grows from 3 to 12 lines then scrolls, with no script measuring text. **Source** good-css.com/specimen/textarea-that-grows-with-its-content

### 2.6 Motion

- **RULE** Put every transition that moves or scales something inside `@media (prefers-reduced-motion: no-preference)`; opacity and colour fades may sit outside. Build the state change first and add motion inside the query; never strip motion afterwards with a global `0.01ms` rule.
  **Why** Motion then exists only inside the query, so the default is none; people who never touched the setting match `no-preference` and see it. Script-driven animation checks the same query via `matchMedia`.
  **Applies to** all. **Check** every `transform`/`translate`/`scale` transition is inside the query (the kit's `.press` transition currently sits outside and its `:active` is cancelled by a `reduce` block instead). **Source** good-css.com/specimen/opt-in-motion

- **RULE** Define two easing tokens once and use them everywhere: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for anything entering, leaving or responding, and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for something already on screen that moves; never use `ease-in` on UI.
  **Why** Ease-out starts fast so the interface moves while the user watches; ease-in starts slow and reads as lag; the built-in `ease-out` keywords are weak versions of the same shape. These are Emil Kowalski's curves, in the same family as the kit's `outQuint` `[.22,1,.36,1]` (the hero load-in tokens for Kaching still own the cinematic reveal; these tokens are for CSS-driven UI).
  **Applies to** all. **Check** grep `ease-in[^-]` returns nothing in UI transitions; transitions name their properties. **Source** good-css.com/specimen/motion-tokens

- **RULE** Keep UI transitions at 300ms or less: press 100-160ms, tooltips and small popovers 125-200ms, dropdowns 150-250ms; modals and drawers 200-500ms. Name the properties; never `transition: all`.
  **Why** Longer reads as sluggish and `all` animates properties nobody meant (layout, colours of children). The values match the engine's own motion table, which is the stricter source for hero choreography.
  **Applies to** all. **Check** grep `transition: *all` returns nothing; computed `transition-duration` <= 0.3s except modal/drawer. **Source** good-css.com/specimen/motion-tokens

- **RULE** When one state change should drive several values together, register a typed custom property with `@property` (for example `<number>`, `<angle>`, `<length-percentage>`, `<color>`, with `syntax`, `inherits` and a required `initial-value`), set it in the state selector, derive the children with `calc()`, and transition only the property (`transition: --progress 0.3s var(--ease-out)`); a script only writes the variable.
  **Why** An unregistered custom property is a string and cannot interpolate; registering it lets one transition and one easing drive rotation, scale and opacity in step, which is how Stripe's cards and sales page do it. `rotate`, `scale`, `translate` do nothing on an inline element (give it `inline-block`); a registration is global, so register each name once with a specific name. Support Chrome 85, Firefox 128, Safari 16.4.
  **Applies to** landing page (card hover choreography, conic-gradient border angle, spotlight position) and SaaS app UI. **Check** one `@property` per driven value; hover state changes one variable, not eight declarations. **Source** good-css.com/specimen/transition-a-custom-property-with-property

- **RULE** On cards that lift on hover, cross-fade two pre-painted shadows by opacity instead of transitioning `box-shadow`: `isolation: isolate` on the card; `::before` carries the resting shadow, `::after` the raised one at `opacity: 0`, both `inset: 0; z-index: -1; border-radius: inherit; pointer-events: none`; on hover swap the two opacities.
  **Why** A `box-shadow` transition repaints every frame; each shadow here is painted once and only `opacity` animates on the compositor. The author's Chrome trace of one card showed 12 paint events versus about 78 for a plain shadow transition. The end state is exactly the raised shadow, not the sum of two. The card needs its own background; it consumes both pseudo-elements, so it cannot share them with the hit-area or card-link techniques; for a single small element transition `box-shadow` directly. The engine's founder shadow budget still applies to both layers (blur <= 24px, alpha <= 0.16), which the example's 32px / 0.16 raised layer exceeds.
  **Applies to** landing page grids of many cards, bento. **Check** hover on a 12-card grid triggers no per-frame paint of the shadow (DevTools paint flashing); both layers satisfy founder shadow limits. **Source** good-css.com/specimen/shadow-change-that-fades-and-does-not-repaint

- **RULE** On multi-page sites enable cross-document view transitions with `@view-transition { navigation: auto }` on both pages; add slides only inside the reduced-motion query.
  **Why** On a same-origin navigation the browser snapshots old and new pages and crossfades; unchanged parts such as the header appear to stay put, replacing a router or page-transition script. The default crossfade has no movement so needs no guard. Support Chrome 126, Safari 18.2, Firefox navigates normally (progressive enhancement).
  **Applies to** landing page (multi-page marketing site: home to pricing to blog). **Check** both pages contain the rule; a navigation in Chromium crossfades. **Source** good-css.com/specimen/cross-document-view-transitions

- **RULE** Make the active-item indicator (tab underline, side-nav bar) with anchor positioning: `anchor-scope: --active` on the component root, `anchor-name: --active` on the item carrying `aria-current`, and a pseudo-element on the list with `position-anchor: --active`, `inset-inline-start: anchor(start)`, `inline-size: anchor-size(inline)`, transitioning those two properties.
  **Why** The anchor follows the attribute, so there is no separate active class and no measuring script; a longer label, bigger font or wrapped line needs no new measurement; the bar is one element, so a plain transition slides it. Without `anchor-scope` two navs on one page both follow the last active item. For a vertical list swap axes (`anchor(top)`, `anchor-size(height)`). Give the active item a second cue (weight, colour) because a browser without anchor positioning drops the declarations. Support Chrome 131, Firefox 147 (places the bar but does not slide it), Safari 26; this entry was derived from Stripe's stylesheet only, no rendered Stripe example was found by the author.
  **Applies to** SaaS app UI tab rows; landing page sticky section nav on plain-HTML builds (React builds keep `layoutId`). **Check** the bar's x and width match the `aria-current` item; works with two navs on one page. **Source** good-css.com/specimen/indicator-that-slides-to-the-active-item

- **RULE** Animate a sticky header's tone with registered `<color>` properties and a scroll timeline: `@property --header-ink / --header-ground / --header-accent` (syntax `<color>`, `inherits: true`), a keyframe animation from the light tone to the dark tone, `animation: linear both header-tone; animation-timeline: scroll(); animation-range: 0px var(--header-bar)`, and the header reading those variables.
  **Why** It is how good-css.com's own header turns from lilac to near-black as you scroll, from the site stylesheet (verified in `assets/index-*.css`): no scroll listener, no class toggle, runs off the main thread, and the colours interpolate in sync with scroll distance. Where scroll timelines are missing (Firefox) the header stays in its initial state, so make the initial state a complete, legible design. [engine note] An adaptation of this for a Larpo nav means the pill bar fades to its scrolled state over the first ~80px.
  **Applies to** landing page nav (progressive enhancement). **Check** `getComputedStyle(header).getPropertyValue('--header-ground')` changes between scrollY 0 and 80 in Chromium; header text contrast passes in both end states. **Source** good-css.com stylesheet (header-tone keyframes) and good-css.com/specimen/styles-that-apply-only-when-a-scroller-overflows

### 2.7 Show and hide

- **RULE** Animate dialogs, popovers and anything toggled with `display` natively: base state `opacity: 0` (plus `translate: 0 0.5rem` inside the reduced-motion query) with `transition: opacity, translate, display 0.2s allow-discrete, overlay 0.2s allow-discrete`; open state at opacity 1; and a `@starting-style` block after the open rule that restates the closed values. Give `dialog::backdrop` its own three states and transition.
  **Why** `@starting-style` gives the browser a "before open" state to transition from when the element leaves `display: none` (entry); `allow-discrete` on `display` delays the switch to `none` until the other transitions finish (exit) and `overlay` keeps the element in the top layer meanwhile. The fade is not motion, so it runs for everyone. Never start from `scale(0)` (use `0.95` with opacity 0). Keep `[popover]:popover-open` out of the selector list that opens the dialog (a browser that does not know one selector drops the whole rule and the dialog would open at opacity 0); inside `@starting-style` a shared list is safe. Support: Chrome 117 both directions; **site-tested Safari 27 animates the entry but dialogs and popovers close at once**, an element toggled by a class animates both ways there; Firefox 129 entry only.
  **Applies to** SaaS app UI (dialog, popover, menu); landing page mobile menu. **Check** a freshly opened dialog starts at opacity 0; backdrop fades with the panel; closing keeps it visible for the transition duration in Chromium. **Source** good-css.com/specimen/enter-and-exit-transitions-from-display-none

- **RULE** Anchor dropdown menus and popovers to their trigger with the Popover API plus CSS: `<button popovertarget>`, `[popover] { margin: 0; margin-block-start: 0.5rem; position-area: block-end span-inline-end; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline }` inside `@supports (position-area: block-end)`.
  **Why** `popovertarget` makes the button the anchor with no anchor names, `position-area` places the popover on a 3x3 grid around it and the fallbacks flip it when it would overflow the viewport, replacing a positioning library and `getBoundingClientRect()`. Use `span-*` values, never `center` (Adam Argyle: `center` stops the flips when the popover is wider than its grid cell); a script-opened popover has no anchor and lands top-left unless it passes the trigger as `showPopover({ source: button })`; without support the popover opens centred in the viewport. Support (site): Chrome 133, Firefox 147, Safari 26.
  **Applies to** SaaS app UI menus; landing page product dropdowns. **Check** a menu at the viewport edge flips instead of clipping; `@supports` guard present. **Source** good-css.com/specimen/popover-anchored-to-its-trigger

- **RULE** Animate an accordion's height with `<details>`: `:root { interpolate-size: allow-keywords }`, `details::details-content { height: 0; overflow: clip }`, `details[open]::details-content { height: auto }`, and in the reduced-motion query `transition: height 0.3s var(--ease-out), content-visibility 0.3s allow-discrete`.
  **Why** `::details-content` is the box wrapping everything except the summary; `interpolate-size` allows a transition to `auto`; transitioning `content-visibility` with `allow-discrete` keeps content rendered until the height reaches zero (without it the close snaps). Put padding on an element inside, never on `::details-content` (it would stay visible when closed); give siblings the same `name` for one-open-at-a-time; hide the marker with `list-style: none` plus `::-webkit-details-marker { display: none }`. `interpolate-size` is Chrome 129 only (the others open and close with no animation, which is the intended fallback); `::details-content` is Chrome 131, Safari 18.4, Firefox 143.
  **Applies to** landing page FAQ; SaaS app UI disclosures. **Check** the FAQ keeps keyboard and find-in-page behaviour; padding is on an inner element. **Source** good-css.com/specimen/accordion-that-animates-its-height

- **RULE** For a dropdown or panel that opens over the page and whose height is unknown, unroll it with `clip-path` instead of animating `height`: closed `clip-path: inset(0 -3rem 100%); visibility: hidden`, open `clip-path: inset(0 -3rem -3rem); visibility: visible`, transition both over about 250ms.
  **Why** `inset()` clips from each edge (top, sides, bottom), 100% at the bottom hides the whole box and the percentage refers to the element's own height so nothing measures it; the negative side and bottom insets leave room for the shadow while the top stays at 0 so no shadow shows where the menu meets its trigger; layout never changes; the clipped part takes no pointer events; `visibility` flips to hidden only when the close finishes, removing links from the tab order. Works in every browser. The negative inset must exceed the shadow blur plus offset; it is for overlapping panels (a closed panel in flow leaves a gap, so use the accordion technique there); credited to the Stripe nav menu.
  **Applies to** landing page mega-menu nav; SaaS app UI dropdowns. **Check** a closed menu's links are not focusable; no `height` transition on the panel. **Source** good-css.com/specimen/reveal-with-clip-path

### 2.8 Scroll and viewport

- **RULE** Build horizontal card rows on native scroll: `overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline` equal to `padding-inline`; children `flex: none; scroll-snap-align: start`; `overscroll-behavior-x: contain; scrollbar-width: none`; `scroll-behavior: smooth` only inside the reduced-motion query; arrow buttons call `scrollBy` one card width, with `Math.abs(scrollLeft)` and a direction sign for RTL.
  **Why** The browser does scrolling and landing, so swipe, trackpad, keyboard and momentum all work before any script; `scrollBy` can only scroll the carousel (unlike `scrollIntoView`, which can scroll the page); `overscroll-behavior-x: contain` stops an end-of-row swipe from triggering browser back. Never move slides with `transform` or handle wheel/touch yourself. Chrome 135 can draw arrows and dots with `::scroll-button()` / `::scroll-marker`; Firefox and Safari cannot, so use the script.
  **Applies to** landing page testimonials, logo walls, feature rows. **Check** swipe with no JS loaded works; snapped card x equals the page content edge. **Source** good-css.com/specimen/carousel-on-native-scroll

- **RULE** Build modal, drawer, chat and sidebar bodies as a flex column with a limit (`max-block-size: 80dvh`), a body of `flex: 1; overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable`, and `min-block-size: 0` on any wrapper element between panel and body.
  **Why** A flex item will not shrink below its content except a scroll container, whose minimum is zero; an intermediate form is not a scroll container and keeps content height, pushing the footer out unless it gets the zero minimum; `auto` shows a scrollbar only on overflow; `scrollbar-gutter` does not inherit, so the root declaration covers only the page. Give a fixed-height header or footer `flex: none`. Keep `min-height: 0` out of the global reset (it lets every item of a fixed-height column shrink under its own text).
  **Applies to** SaaS app UI. **Check** with 100 items the footer stays visible; with 2 items the panel hugs content. **Source** good-css.com/specimen/scroll-area-between-a-fixed-header-and-footer

- **RULE** Fade the edges of a possibly-overflowing scroller only when it overflows: `mask-image: linear-gradient(to right, transparent, #000 var(--fade), #000 calc(100% - var(--fade)), transparent)` with `--fade: 0px` by default, and keyframes that set `--fade: 2rem` at both ends bound to `animation-timeline: scroll(self inline)`. To fade only the side with content left, register `--fade-start` and `--fade-end` as `<length>` and use keyframes `from {0, 2rem}`, `10%, 90% {2rem, 2rem}`, `to {2rem, 0}`.
  **Why** A scroll timeline is inactive when nothing scrolls, so the animation has no effect and the default (no fade) applies; once content overflows the keyframes apply. A mask fades the content itself, so it works over any background (an overlay gradient must match the colour behind). Write `animation-timeline` after the `animation` shorthand (the shorthand resets it); declare defaults outside the keyframes; Firefox has no scroll timelines so the row scrolls without the fade. Support `animation-timeline` Chrome 115, Safari 26.
  **Applies to** SaaS app UI tab rows, toolbars, table wrappers, logo marquees. **Check** a short row shows no fade, a long row shows it; mask present on the scroller, not an overlay element. **Source** good-css.com/specimen/styles-that-apply-only-when-a-scroller-overflows

- **RULE** Set `html { scroll-padding-block-start: <header height> }` (one shared custom property with the header) so in-page anchors clear a sticky header; keep it outside the reduced-motion query and put `scroll-behavior: smooth` inside it.
  **Why** The browser offsets every scroll to an anchor by that padding, with no script computing offsets; reduced-motion users still need the offset.
  **Applies to** landing page (anchor nav, pricing-to-FAQ links). **Check** the target heading's top is >= header bottom after navigating to `#id`. **Source** good-css.com/specimen/anchor-targets-that-clear-a-sticky-header

- **RULE** On app-like pages with fixed UI, disable the desktop rubber band with `html { overscroll-behavior-y: none }` and restore it under `@media (any-pointer: coarse) { html { overscroll-behavior-y: auto } }`; use the `-y` longhand and give inner scrollers `overscroll-behavior: contain`.
  **Why** macOS trackpad overscroll stretches the whole page and drags fixed sidebars and headers; touch devices need the default for pull-to-refresh; `any-pointer` checks every input so a touchscreen laptop or a foldable keeps it; `overscroll-behavior-x: none` would also disable swipe-to-go-back; the viewport takes its behaviour from the root element only. Never use a `touchmove` listener with `preventDefault()`.
  **Applies to** SaaS app UI shells. **Check** computed `overscroll-behavior-y` on `html` is `none` with a fine pointer. **Source** good-css.com/specimen/no-rubber-band-bounce-on-desktop

- **RULE** On phone-like UI add `viewport-fit=cover` to the viewport meta and pad fixed headers, bottom bars, toasts and sheets with `env(safe-area-inset-*, 0px)` (inside `calc()` always with the `0px` fallback).
  **Why** By default the browser keeps the page inside the safe area and leaves the notch and home-indicator zones as bare background; `cover` paints edge to edge and `env()` moves content clear while the background still fills the screen; without `cover` every inset is `0px`. Normal page content needs none of it.
  **Applies to** SaaS app UI (mobile). **Check** viewport meta contains `viewport-fit=cover` whenever `env(safe-area-inset` appears in CSS. **Source** good-css.com/specimen/content-clear-of-the-notch

### 2.9 Cross-cutting process

- **RULE** Reach for a declaration that adapts on its own (clamp, auto-fit, flex-wrap, container query, `:has()`) before adding a breakpoint, a wrapper element or a script, and keep JavaScript only for a result that already works without it.
  **Why** Breakpoint ladders break between the breakpoints; adaptive declarations hold at every width and in every slot; this is the stated principle of the whole list.
  **Applies to** all. **Check** media query count per component (target 0-1); no ResizeObserver or scroll listener that a listed CSS technique replaces. **Source** good-css.com/skills/good-css/SKILL.md

- **RULE** Weigh each technique's `Support:` line against the project's browser targets, apply it as the main path only where it holds in all targets, and otherwise write it as an enhancement whose absence is a complete design; tell the user which techniques the build used that a target browser lacks.
  **Why** The list sets no browser floor; several entries behave differently per engine (`interpolate-size` Chrome only, `text-wrap: pretty` not in Firefox, entry/exit of dialogs not in Safari 27, scroll timelines not in Firefox, cross-document view transitions not in Firefox, field-sizing newly available).
  **Applies to** all. **Check** DIRECTION.md lists the enhancement-only techniques used and their fallback; screenshot or run Chromium plus a WebKit pass where the technique differs. **Source** good-css.com/skills/good-css/SKILL.md ("Browser support")

- **RULE** Before writing CSS for a task, read only the technique entries that match it (reset, colour tokens and type scale for a base stylesheet; layout for containers and card grids; interaction for button, link, input and card states; motion and show-hide for dialogs, popovers and accordions; scroll for carousels and app shells), and keep every "Rules" line of an entry you use.
  **Why** The site's own skill is organised as a task-to-file table because the rules are the conditions under which each technique works; applying the CSS without them is how a technique silently fails (for example `text-box` on a flex container does nothing).
  **Applies to** all. **Check** DIRECTION.md names the entries used (by title) for the hero, nav, buttons, cards and any overlay. **Source** good-css.com/skills/good-css/SKILL.md

## 3. Numbers & scales

| Item | Value | Source entry |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | motion-tokens |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | motion-tokens |
| UI transition ceiling | 300ms | motion-tokens |
| Press feedback | 100-160ms, scale 0.95-0.98 | press-feedback, motion-tokens |
| Tooltip / small popover | 125-200ms | motion-tokens |
| Dropdown | 150-250ms | motion-tokens |
| Modal / drawer | 200-500ms | motion-tokens |
| Dialog entry/exit used in the entry | 0.2s, slide 0.5rem, scale start 0.95 (never 0) | enter-and-exit |
| Accordion | 0.3s height; popover reveal 0.25s clip-path | accordion, reveal |
| Indicator slide | 0.25s on `inset-inline-start` and `inline-size` | indicator |
| Hover shadow cross-fade | 0.3s opacity | shadow-change |
| Min tap target | 44px (hit-area formula) | hit-area |
| Focus ring | `max(2px, 0.08em)` width, `0.25em` offset | one-focus-ring |
| Input font size | `max(16px, 1rem)` | the-reset |
| Fluid font max / min | <= 2.5x (WCAG 1.4.4) | fluid-sizes |
| Fluid example | `clamp(1rem, 0.75rem + 1vw, 1.75rem)`: 16px to 400px viewport, 28px from 1600px | fluid-sizes |
| Scale example | narrow 20 (320px), wide 77.5 (1240px), size 1.125 to 1.25 rem (18 to 20px), ratio 1.2 to 1.25; step-4 growth 1.31x | one-fluid-scale |
| Space pair `--space-s-l` | 18px (phone) to 40px (desktop) | one-fluid-scale |
| Content grid | gutter 1.5rem, content 64rem, breakout 80rem | content-grid |
| Intrinsic grid min | `min(100%, 16rem)`, gap 1rem | intrinsic-grid |
| Sidebar | basis 20rem, main grow 999, wrap at 50% | sidebar |
| Concentric demo | radius 0.75rem, padding 0.5/1.5/3rem, outer = inner + pad | concentric |
| Hairline image edge | 1px outline, offset -1px, 10% alpha | image-box |
| Panel height cap | `80dvh` | scroll-area |
| Scroller edge fade | 2rem | styles-that-apply-only-when-a-scroller-overflows |
| Section padding default | `6rem` block, pair adjustments 0 / 2rem / 3rem | section-spacing |
| `text-box` effect | button 48px to 35px (0.75rem pad); my Inter 18px/1.2 + 12px pad: 45.6px to 37.1px | label-centered |
| Shadow repaint | 12 vs ~78 paint events in one Chrome trace | shadow-change |
| Mix hue drift | white `oklch(1 0 0)` + hue-264 blue mixed at 312; `none` stays 264 | oklch-color |
| Cap-height icon | Inter 18px: `1cap` icon = 13.09px (my Chromium 156 measure) | icon-sized |
| Global `text-box` damage | 16px/1.5 paragraph 25px to 11px; button 40px to 27px | left out on purpose |

Support lines as the site gives them (Chrome / Firefox / Safari): `text-wrap: pretty` 117 / none / 26; `scrollbar-gutter` 94 / 97 / 18.2; `interpolate-size` 129 / none / none; `light-dark()` 123 / 120 / 17.5; `pow()` 120 / 118 / 15.4; subgrid 117 / 71 / 16; container queries 105 / 110 / 16; `:has()` 105 / 121 / 15.4; `overflow: clip` 90 / 81 / 16; `text-box` 133 / 154 / 18.2; `cap` 118 / 97 / 17.2; `:user-invalid` 119 / 88 / 16.5; `field-sizing` 123 / 152 / 26.2; `@property` 85 / 128 / 16.4; cross-document view transitions 126 / none / 18.2; anchor-positioned indicator 131 / 147 / 26; popover with `position-area` 133 / 147 / 26; `::details-content` 131 / 143 / 18.4; `animation-timeline` 115 / none (Nightly) / 26; `@starting-style` entry+exit 117 both / 129 entry only / Safari 27 entry only for dialog and popover.

## 4. Dos and Don'ts

- **Do** `clamp(1rem, 0.75rem + 1vw, 1.75rem)`. **Don't** `clamp(1rem, 1vw, 1.75rem)` (stuck at 16px under 1600px, ignores user font size).
- **Do** `oklch(98% 0 none)` for a gray. **Don't** `oklch(98% 0 0)` (hue 0 is red and tints every mix).
- **Do** `html:has(dialog:modal) { overflow: hidden }` plus `scrollbar-gutter: stable`. **Don't** toggle a body class from JS and let the page jump sideways.
- **Do** a `<span>` with `text-box: trim-both cap alphabetic` inside an `inline-flex` button. **Don't** put `text-box` on the flex container (no effect) or on `*` (shrinks every text block).
- **Do** `block-size: 1cap` on an icon beside a label. **Don't** `width: 16px; height: 16px` next to variable text sizes.
- **Do** `outline: 2px solid transparent` to hide a ring you redraw. **Don't** `outline: none` (forced-colors mode loses the ring).
- **Do** `@media (hover: hover) and (pointer: fine) { .btn:hover { ... } }`. **Don't** bare `:hover` (sticks after a tap) or Tailwind's `hover:` alone for pointer-fine intent.
- **Do** stretch a heading link with `::after` over the card. **Don't** wrap the whole card in an `<a>` (screen reader reads every word) or add a click handler to a div.
- **Do** `starting-style` plus `allow-discrete`. **Don't** `scale(0)` as an entry start, or put `[popover]:popover-open` in the same selector list as `dialog[open]`.
- **Do** `position-area: block-end span-inline-end`. **Don't** `center` with flip fallbacks (flips stop when the popover is wider than its cell).
- **Do** `min-block-size` for a column that must grow. **Don't** `block-size` (cuts long content).
- **Do** `overflow: clip` for a bleed. **Don't** `overflow: hidden` on a wrapper with sticky children.
- **Do** keep padding on a wrapper around a line-clamped paragraph. **Don't** pad the clamped element itself.
- **Do** `margin-block-start` via `* + *` in CMS content. **Don't** `margin-bottom` on every child.
- **Do** shared easing tokens and named properties. **Don't** `transition: all 0.3s ease-in`.
- **Do** transition `--progress` once and derive children. **Don't** write eight hover declarations with eight transitions.
- **Do** two cross-fading shadow layers on a card grid. **Don't** `transition: box-shadow` on 20 cards with a 32px blur.

## 5. Exceptions & judgement calls

- **Founder taste outranks the site.** Rules that must be reconciled when building: (a) the site's raised card shadow (`0 12px 32px / 0.16`) breaks the founder's whisper-shadow limit (blur <= 24px, alpha <= 0.16 on cards); use the cross-fade technique with founder-sized layers. (b) Press scale 0.97 on the site versus founder/Kaching 0.98: use 0.98. (c) The `text-box` trim changes control heights; the founder-specified hero CTA and nav control heights (44px / 40px / 43px nav pill) are the targets, so after trimming, pad the control back to the spec and measure; never ship the shorter button. (d) The site's poster look (wide black grotesque wordmark, lilac and sulphur, a rendered sphere hero, dot grid) is the kind of "techy poster" the founder rejected for SaaS defaults; do not borrow it. [engine note]
- **Progressive enhancement means a complete design without the effect.** Safari 27 closes dialogs at once, Firefox does not slide the nav indicator or fade scroller edges, Firefox ignores `text-wrap: pretty`. For a screenshot-driven deliverable (image first, per founder), these differences are invisible; for a shipped site they decide whether to keep a JS path. The engine's React kit keeps Motion's `layoutId` for the nav pill and sliding segmented control because that works in every browser; use anchor positioning for plain-HTML builds and non-React surfaces. [engine note]
- **`interpolate-size` is Chrome-only**, so an accordion that animates height is a Chrome-level polish and a Safari/Firefox snap. For a premium SaaS FAQ where the founder will look in Safari, consider Motion's height animation or accept the snap. [engine note]
- **Container queries versus the engine's fixed 1440x900 hero canvas.** Desktop-first hero images are drawn at a fixed width, so container queries earn their place in reusable dashboard widgets and in responsive production builds, not in a one-off fixed hero. [engine note]
- **The fluid scale (`pow()` six numbers) and the engine's measured type ladders overlap.** The engine's founder-binding values (hero h1 sizes, 18px button labels at -0.54px tracking, tracking per size) are fixed numbers; the fluid scale is for the long page below the hero and for responsive production, and it must still hit the same rendered sizes at 1440. [engine note]
- **The site's `light-dark()` advice versus the engine's default light canvas.** The founder's default direction is a light AlignUI-like canvas; `light-dark()` tokens cost nothing and keep a dark variant available, but do not ship a dark hero as default. [engine note]
- **Cross-document view transitions** are a multi-page technique; the engine's hero/landing deliverables are usually single pages or SPAs (React with Vite), so this applies to marketing sites with real navigation, not to the kit. [engine note]
- **Hedges and opinions the author states**: the `scrollbar-gutter: stable` off-centre trade-off ("accept it"); text selection under a stretched card link ("accept it"); `text-wrap: pretty` on everything is a house rule; the 2.5x fluid limit comes from Smashing's accessibility article and WCAG 1.4.4, not from the spec.
- **Left out on purpose, for good reasons**: see section 1 item 10. Respect it; the site records the decision as final.

## 6. Figures worth keeping

All in `knowledge/benchmarks/good-css/` (2x unless noted; the specimens are small fixtures, so only a few teach visually):
- `home-fold.png` (home, 1440x900): the site's own hero; use only as a look-reference for what the founder rejected as a default (dev-tool poster).
- `home-full.png` (1x, full page): the entry list drawn with live specimens in frames.
- `spec-label-centered-on-its-letters-with-text-box.png`: four buttons with highlighted text boxes, readout of heights (35.6px, 48px, 48px, 40px); the clearest visual of what `text-box` trims.
- `spec-concentric-nested-radius.png`: the same padded card at 0.5, 1.5 and 3rem padding, outer radius derived from inner.
- `spec-indicator-that-slides-to-the-active-item.png`: two tab rows with the anchored underline.
- `spec-shadow-change-that-fades-and-does-not-repaint.png`: three cards at rest.
- Also saved: `spec-the-reset`, `spec-oklch-color`, `spec-one-set-of-color-tokens-for-light-and-dark`, `spec-content-grid-with-breakouts`, `spec-subgrid-rows-shared-across-cards`, `spec-icon-sized-by-the-text-beside-it`, `spec-whole-card-clickable-from-one-link`, `spec-enter-and-exit-transitions-from-display-none`, `spec-popover-anchored-to-its-trigger`, `spec-accordion-that-animates-its-height`, `spec-reveal-with-clip-path`, `spec-styles-that-apply-only-when-a-scroller-overflows`, `spec-carousel-on-native-scroll`, `spec-container-queries-with-container-units`, `spec-one-fluid-scale-for-type-and-space`. Interactive states (hover, open, scroll) were not captured; read the CSS in section 8 for those.

## 7. Open questions

- **Popover/anchor first-support version.** The site's support line says Chrome 133 for the popover entry; the engine's MDN snapshot lists `anchor-name` at Chrome 125 and `position-area` at 129. The 133 figure likely reflects a combined feature set the author tested (Chrome 150); I did not re-derive it. Treat anchor positioning as Chrome 129+, Firefox 147, Safari 26 until checked against current MDN.
- **Safari 27 and Firefox behaviour** quoted from the site's own tests (2026-10-01) were not independently reproduced here (I only had Chromium 156). Firefox is untested by the author on several entries (`overflow: clip` with ellipsis/line-clamp, for example).
- **"Chrome 150 / Safari 27"** appear in the site's text; I cannot verify those exact releases from here, so I carry them as "site-tested".
- **The shadow paint count (12 vs ~78)** is one Chrome trace by the author, not a benchmark; the direction is credible (opacity is compositor-only), the exact numbers are not general.
- **`text-box` on Firefox 154** is listed as supported by the site and by the engine's MDN snapshot; Firefox 154 may be newer than the environment this engine renders in (Chromium 156 only), so keep the engine's measured padding fallback for cross-engine screenshots.
- **Indicator entry** is derived from Stripe's stylesheet alone, as the site says; no live Stripe component was found by the author.
- **Not on the site**: no coverage of `corner-shape`, `if()`, `sibling-index()`, `view()` scroll timelines for reveals, `@scope`, `contrast-color()`, `calc-size()`, `linear()` springs, CSS nesting practice, `mask`/gradient text effects, `backdrop-filter`, `@layer` strategy, blend modes or border-gradient tricks. The site is a polish-and-robustness list, not an effects catalogue; for effects use `art-direction-moves.md`, `motion-css-native.md`, `color-and-surfaces.md`. The brief expected gradients, text effects and masks; the only mask technique on the site is the overflow edge fade.
- Pages with no technique content: `/about`, `/contact`, `/privacy` (about the maintainer, correction email, no tracking).
- The agent-install claim on the home page ("scores 100/100 on is-agentic", `npx skills@latest add vojtaholik/good-css`) was read, not run or verified; nothing was installed.

## 8. Recipes the engine should reuse

Short, attributed to the entries above; adapt names and numbers per brand.

**Base reset (good-css, the-reset; trimmed to what the engine adopts)**
```css
*, *::before, *::after { box-sizing: border-box; min-width: 0; }
:root {
  scrollbar-gutter: stable; text-wrap: pretty; overflow-wrap: break-word;
  font-synthesis: none; -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent;
  interpolate-size: allow-keywords;            /* Chrome only: enhancement */
}
h1, h2, h3, h4 { text-wrap: balance; }
img, svg, video { display: block; max-width: 100%; height: auto; }
input, textarea, select { font-size: max(16px, 1rem); }
button, a, [role="button"] { touch-action: manipulation; }
```

**Tokens: one base, derived states, both themes (oklch-color, one-set-of-color-tokens)**
```css
:root {
  color-scheme: light dark;
  --accent: oklch(55% 0.19 265);
  --accent-hover: color-mix(in oklch, var(--accent), black 15%);
  --accent-subtle: color-mix(in oklch, var(--accent) 12%, transparent);
  --canvas: light-dark(oklch(0.985 0 none), oklch(0.145 0 none));
  --ink: light-dark(oklch(0.145 0 none), oklch(0.985 0 none));
}
[data-theme="dark"] { color-scheme: dark; }   /* or any section: always-dark band */
```

**Motion tokens (motion-tokens, opt-in-motion)**
```css
:root { --ease-out: cubic-bezier(0.23, 1, 0.32, 1); --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); }
@media (prefers-reduced-motion: no-preference) { .btn { transition: transform 160ms var(--ease-out), background-color 160ms var(--ease-out); } }
.btn:active { transform: scale(0.98); }        /* founder: 0.98 */
@media (hover: hover) and (pointer: fine) { .btn:hover { background: var(--accent-hover); } }
```

**Button label centred on its letters, height kept (label-centered-on-its-letters, icon-sized)**
```css
.btn { display: inline-flex; align-items: center; gap: .5em; min-block-size: 44px; padding-inline: 18px; }
.btn > .label { text-box: trim-both cap alphabetic; }
.btn > svg { flex: none; block-size: 1cap; inline-size: auto; }   /* 1.2cap for padded icon sets */
```
Measure the height; the trim removes about 8.5px at Inter 18px/1.2 in Chromium 156, so set an explicit `min-block-size` rather than padding.

**Focus, hit area (one-focus-ring, hit-area-larger-than-the-visual)**
```css
:focus-visible { outline: max(2px, .08em) solid currentColor; outline-offset: .25em; }
.icon-btn { position: relative; }
.icon-btn::after { content: ""; position: absolute; inset: min(0px, (100% - 44px) / 2); }
```

**Whole card clickable (whole-card-clickable-from-one-link; Heydon Pickering, Stripe)**
```css
.card { position: relative; }
.card-link::after { content: ""; position: absolute; inset: 0; }
.card-link:focus-visible { outline: 2px solid transparent; }
.card:has(.card-link:focus-visible) { outline: 2px solid currentColor; outline-offset: 2px; }
.card :is(button, a:not(.card-link)) { position: relative; z-index: 1; }
```

**Card shadow cross-fade with founder-sized layers (shadow-change-that-fades; Stripe resource cards)**
```css
.card { position: relative; isolation: isolate; background: #fff; border-radius: 18px; }
.card::before, .card::after { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none; }
.card::before { box-shadow: var(--shadow-ring); }
.card::after  { box-shadow: 0 0 0 1px rgb(23 23 23 / .07), 0 8px 20px -12px rgb(23 23 23 / .16); opacity: 0; }
@media (hover: hover) and (pointer: fine) { .card:hover::before { opacity: 0; } .card:hover::after { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) { .card::before, .card::after { transition: opacity .3s var(--ease-out); } }
```

**Concentric frame (concentric-nested-radius)**: `.frame { --r: 16px; --pad: 6px; padding: var(--pad); border-radius: calc(var(--r) + var(--pad)); } .frame > * { border-radius: var(--r); }`

**Content grid with breakouts (content-grid-with-breakouts; Kevin Powell, Ryan Mulligan)**
```css
.content-grid { --gutter: 1.5rem; --content: 64rem; --breakout: 80rem; display: grid;
  grid-template-columns: [full-width-start] minmax(var(--gutter), 1fr) [breakout-start] minmax(0, calc((var(--breakout) - var(--content)) / 2))
    [content-start] min(100% - var(--gutter) * 2, var(--content)) [content-end] minmax(0, calc((var(--breakout) - var(--content)) / 2)) [breakout-end] minmax(var(--gutter), 1fr) [full-width-end]; }
.content-grid > * { grid-column: content; } .content-grid > .breakout { grid-column: breakout; }
.content-grid > .full-width { grid-column: full-width; display: grid; grid-template-columns: inherit; }
```

**Intrinsic grid + subgrid cards**: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` on the parent; on the card `display: grid; grid-row: span 3; grid-template-rows: subgrid; row-gap: .5rem`.

**Neighbour-aware section spacing**: `section { padding-block: 6rem } .logos:has(+ .features) { padding-block-end: 2rem } .hero + .logos { padding-block-start: 2rem }`

**@property hover driver (transition-a-custom-property; Stripe)**
```css
@property --p { syntax: "<number>"; inherits: true; initial-value: 0; }
@media (hover: hover) and (pointer: fine) { .tile:hover { --p: 1; } }
.tile:focus-within { --p: 1; }
.tile .arrow { display: inline-block; rotate: calc(var(--p) * 45deg); }
.tile .more { opacity: var(--p); }
@media (prefers-reduced-motion: no-preference) { .tile { transition: --p .3s var(--ease-out); } }
```

**Active indicator (indicator-that-slides-to-the-active-item; Stripe)**
```css
.tabs { anchor-scope: --active; }
.tabs ul { position: relative; display: flex; }
.tabs [aria-current="page"] { anchor-name: --active; }
.tabs ul::after { content: ""; position: absolute; position-anchor: --active; inset-block-end: 0;
  inset-inline-start: anchor(start); inline-size: anchor-size(inline); block-size: 2px; background: currentColor; }
@media (prefers-reduced-motion: no-preference) { .tabs ul::after { transition: inset-inline-start .25s var(--ease-out), inline-size .25s var(--ease-out); } }
```

**Dialog / popover entry and exit (enter-and-exit-transitions; Una Kravets, Joey Arhar)**
```css
dialog { opacity: 0; transition: opacity .2s var(--ease-out), display .2s allow-discrete, overlay .2s allow-discrete; }
dialog[open] { opacity: 1; }
dialog::backdrop { opacity: 0; transition: opacity .2s var(--ease-out), display .2s allow-discrete, overlay .2s allow-discrete; }
dialog[open]::backdrop { opacity: 1; }
@starting-style { dialog[open], dialog[open]::backdrop { opacity: 0; } }
/* slide goes inside prefers-reduced-motion: no-preference; keep [popover]:popover-open in its own rule */
```

**Anchored popover**: `@supports (position-area: block-end) { [popover] { margin: 0; margin-block-start: .5rem; position-area: block-end span-inline-end; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline; } }`

**Accordion**: `details::details-content { height: 0; overflow: clip; } details[open]::details-content { height: auto; }` with `transition: height .3s var(--ease-out), content-visibility .3s allow-discrete` in the reduced-motion query.

**Clip-path menu reveal (Stripe nav)**: `.menu { clip-path: inset(0 -3rem 100%); visibility: hidden; } .menu.is-open { clip-path: inset(0 -3rem -3rem); visibility: visible; } transition: clip-path .25s var(--ease-out), visibility .25s;`

**Scroller edge fade only when overflowing (Stripe nav; Bramus)**
```css
@keyframes overflowing { from, to { --fade: 2rem; } }
.scroller { --fade: 0px; overflow-x: auto; animation: overflowing linear; animation-timeline: scroll(self inline);
  mask-image: linear-gradient(to right, transparent, #000 var(--fade), #000 calc(100% - var(--fade)), transparent); }
```

**Sticky header tone driven by scroll (good-css.com stylesheet)**: `@property --header-ground { syntax: "<color>"; inherits: true; initial-value: #fff; }` with a keyframe from the light to dark tone and `animation: linear both header-tone; animation-timeline: scroll(); animation-range: 0px 80px;`

**Sticky-header anchors, rubber band, safe area**
```css
html { scroll-padding-block-start: var(--header-h, 5rem); overscroll-behavior-y: none; }
@media (any-pointer: coarse) { html { overscroll-behavior-y: auto; } }
.sheet { padding-block-end: calc(1rem + env(safe-area-inset-bottom, 0px)); }   /* needs viewport-fit=cover */
```

**Cross-document view transition**: `@view-transition { navigation: auto; }` on every page.

**Textarea composer**: `textarea { field-sizing: content; min-height: 3lh; max-height: 12lh; resize: none; }`

**Where each technique lands on a Larpo page (mapping)**

| Place | Techniques |
|---|---|
| Hero, nav, CTAs | trimmed labels + cap icons; hover/press grammar; focus ring; scroll-timeline nav tone; `svh`; `text-wrap: balance`; concentric `Frame` |
| Product frame / dashboard | container queries for widgets; tabular-nums; subgrid KPI rows; auto-margin card actions; `field-sizing` AI composer; `overflow: clip`; hairline outline on avatars; sliding indicator on tabs (plain HTML) |
| Feature / pricing / bento cards | intrinsic grid + subgrid; whole-card link; shadow cross-fade; `@property` hover driver; `:has()` card variants |
| Long page | content grid with breakouts; neighbour-aware section spacing; fluid scale; FAQ accordion; anchor offset |
| Menus and overlays | popover + anchor; dialog entry/exit; clip-path mega-menu; scroll panel; scroller edge fade for logo/tab rows |
| Multi-page site | view transitions; `scroll-padding`; carousel on native scroll |
| Theme and tokens | oklch base + `color-mix`; `light-dark()`; `color-scheme` on dark bands |

## 9. What the engine kit should adopt

For `system/kits/product-hero/template/src/index.css` and `kit.tsx` (kit stack: Tailwind 4.3.3, React 19, Motion 14). Founder rules win wherever they conflict.

**index.css**
1. Add the base reset block (min-width 0, `font-synthesis: none`, `scrollbar-gutter: stable`, `text-wrap` on `:root`, input 16px, `touch-action: manipulation`). Today only `h1-h3` balance, `p` pretty, `.tnum` and font smoothing on `body` exist.
2. Add `--ease-out` / `--ease-in-out` tokens (and keep `motion.ts` for Framer choreography) so CSS transitions share a curve.
3. Change `.btn-white:hover` and any new hover rule to `@media (hover: hover) and (pointer: fine)`; move `.press` transition inside `prefers-reduced-motion: no-preference` and keep the `0.98` scale.
4. Replace `.hit` with the good-css `inset: min(0px, (100% - 44px) / 2)` formula (the current rule centres a max-size box; both work, the new one leaves larger targets alone).
5. Upgrade `:focus-visible` to the `max(2px, .08em)` / `.25em` ring, with the accent colour for filled buttons.
6. Add `color-scheme: light dark` plus `light-dark()` tokens as an optional layer (`--canvas`, `--ink`), and derive `--accent-hover` / `--accent-subtle` with `color-mix(in oklch, ...)` instead of hardcoded hex/rgba in the brand layer. Keep the founder's light default.
7. Add the `.card` shadow cross-fade (with `--shadow-ring` and a founder-sized raised layer) as a `.lift` class for bento and feature grids.
8. Add `.label` trim (`text-box: trim-both cap alphabetic`) and `.btn svg { block-size: 1cap }` as an opt-in with measured `min-block-size`, since the founder's button heights are fixed.
9. Add a `.scroll-fade` class (overflow-only mask), `.content-grid` breakout grid, the `@property` hover driver and the `html { scroll-padding-block-start }` rule.
10. Add an optional `@property` header-tone (scroll-timeline nav) snippet, labelled progressive enhancement, with a legible initial state.

**kit.tsx**
1. `Frame`: already concentric (`outer = inner + pad`); add the derive-from-inner comment and an `outline: 1px solid` hairline option for images/avatars inside it.
2. `PillNav` / `Segmented`: keep `layoutId` for React (cross-browser); add a CSS-only anchor-positioned variant (`aria-current` + `anchor-name`) for plain-HTML concept pages.
3. `CountUp` already uses `tabular-nums`; add `font-variant-numeric: tabular-nums` to KPI figures and table cells by default, and `text-wrap: balance` on KPI titles.
4. Add a `Card` primitive: relative card, heading link with stretched `::after`, `:has()` focus ring, shadow cross-fade, concentric inner media.
5. Add a `Label` helper for trimmed button text and a `Icon` wrapper (`1cap`, `flex: none`, `align-items: baseline`/`center`) so the founder rule "icons from Phosphor/Lucide" and the cap-height rule combine.
6. For dashboard widgets in `Frame`, wrap widgets in `container-type: inline-size` slots and use `@container` + `cqi` for type; keep one-off hero layout fixed.
7. Menus and dialogs: add native `<dialog>` / `[popover]` primitives with the entry/exit CSS and anchored `position-area`, as the non-React alternative to Radix/Base UI popups when a build is plain HTML.

**Process / checker (no change to founder rules)**
- Add checks: no `outline: none`; no `transition: all`; no `ease-in`; every `:hover` inside the pointer query; every fluid font token max/min <= 2.5; `viewport-fit=cover` with any `env(safe-area-inset`; no `* { text-box` / `optimizeLegibility`.
- DIRECTION.md should name which good-css entries the build uses and which are enhancements with a fallback.
