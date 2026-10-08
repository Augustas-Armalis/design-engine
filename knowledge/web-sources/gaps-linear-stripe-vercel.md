---
source: web:https://linear.app/now (how-we-redesigned-the-linear-ui, a-design-reset, behind-the-latest-design-refresh, linear-liquid-glass, dashboards-best-practices, styling-linear-for-the-future-stylex) + https://stripe.com/blog/accessible-color-systems + https://stripe.com/blog/connect-front-end-experience + https://www.kevinhufnagl.com/how-to-stripe-website-gradient-effect/ + https://vercel.com/design.md + https://vercel.com/geist/*.md
chapter: Gap fill - Linear, Stripe and Vercel published design and engineering write-ups (2017-2026)
pages: n/a
topic_tags: [linear, stripe, vercel, geist, theme-generation, lch, color, gradient, css-grid, animation, chrome-hierarchy, borders, liquid-glass, dashboards, report-pages, typography, spacing]
status: studied
---

# Gap fill: Linear, Stripe and Vercel write-ups

Read 2026-10-08 (all HTTP 200 via curl; raw text saved in `corpus/web/gaps/` as linear-*, stripe-*, vercel-*). Rule IDs use the prefix GLS-. Labels: **[fetched]** read in the source; **(opinion)** author taste; **[engine note]** my inference.

Overlap warning. Earlier notes already cover some of this material: `color-and-surfaces.md` has Linear's 98-to-3 theme variables and Stripe's "5 levels apart" rule; `design-systems.md` has Geist's colour-step semantics, type-class sizes and material radii; `anti-ai-slop.md` mentions Inter Display. I do not repeat those. New here: Linear's 2026 refresh principles, its Liquid Glass build, dashboards study and StyleX contract rationale; Stripe's Connect front-end techniques, the gradient recipe and extra colour details; Vercel's official report-site design guidance and brand-CSS tokens (a large, previously unread, source).

Scope caveat for the Vercel material. `vercel.com/design.md` is Vercel's own instruction file for building Vercel-authored report websites (proposals, benchmarks, calculators). It says outright that these pages should not resemble Vercel product UI or a generic SaaS landing page. Treat its rules as strong guidance for evidence-led, editorial pages, and as one authoritative opinion for landing pages.

## 1. Core ideas

1. **Chrome should recede; content should win.** Linear's 2026 refresh dims the sidebar, shrinks tabs, cuts icons and softens borders on one principle: elements that support orientation must not compete for attention they have not earned. [fetched]
2. **Structure should be felt, not seen.** Borders and separators proliferate quietly; round them, lower their contrast, and remove those that have no reason. [fetched]
3. **A theme is a function of a few inputs.** Linear generates every surface, text, icon and control alias from a base colour, an accent and a contrast value in LCH, which also yields accessibility high-contrast themes for free. [fetched; already in repo notes]
4. **Redesign is a project with a deadline, a flag and a concept.** Linear: concept first (called a concept to lower resistance), stress-test on the main views, dedicate a small team, ship behind a flag, finish in about six weeks. [fetched]
5. **Build the dev tooling that makes judgement cheap.** A toolbar toggle to flip old/new, a colour tool exposing hue, chroma and lightness per token, and token export to Figma shortened iteration from days to minutes. [fetched]
6. **Stripe made accessibility predictable by changing the colour model,** not by darkening swatches: lightness in a perceptual space gives uniform contrast across hues while keeping vibrancy. [fetched]
7. **Stripe landing pages were built with next-generation CSS and APIs for lightness:** grid for decorative stripes, tiny CSS-drawn devices, the Web Animations API, IntersectionObserver play-once. Choose the simplest animation technology that works. [fetched, 2017]
8. **Vercel's report guidance is a restraint manifesto:** monochrome by default, typography before surfaces, tables and charts as evidence, no decorative gradients, no cards-in-cards, no eyebrow labels, one dominant focal object per viewport. [fetched]
9. **A component library needs a styling contract.** Linear's StyleX move was driven by wanting restyling from outside a component to be deliberately hard; the lesson transfers to design-system discipline. [fetched]

## 2. Rules

### 2.1 Chrome hierarchy, borders, icons (Linear 2026 refresh)

- **RULE [GLS-01]** Give navigation chrome (sidebar, tab bar, header bars) less visual weight than the working content area: dim the sidebar a few notches, keep the main pane brightest, and let supporting elements recede once the user has arrived.
  **Why** In a dense product not every element can carry equal visual weight; chrome that stays bright keeps competing after the destination is reached.
  **Applies to** SaaS app UI. **Check** compare text luminance contrast of sidebar labels against main-pane body text: sidebar contrast ratio should be lower than main text by at least one step (a ratio gap of roughly 1.0 to 1.5 is an [engine note]); the main content region has the highest mean luminance contrast of the three zones. **Source** https://linear.app/now/behind-the-latest-design-refresh (March 12, 2026; read 2026-10-08)

- **RULE [GLS-02]** Make tab strips compact: not full-width, rounded corners, smaller icon and text size, with icon-only tabs where the label adds nothing.
  **Why** Wide, prominent tabs are chrome; the refresh shrank them to keep the page body primary.
  **Applies to** SaaS app UI. **Check** tab strip width less than the container width unless it scrolls; tab font-size at most one step below body text. **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

- **RULE [GLS-03]** Reduce icon usage: scale icons down, drop icons that restate the label, and remove decorative treatments such as coloured background tiles behind team or project icons.
  **Why** Icons help recognition at a glance, but where they grew excessive they added noise; Linear removed coloured team-icon backgrounds in the refresh.
  **Applies to** SaaS app UI. **Check** count icons per list row (at most 1 leading icon); no icon sits in a filled coloured tile unless it encodes state; icon size at most equal to the label cap-height-plus-2px (the size relation is an [engine note]). **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

- **RULE [GLS-04]** Treat borders and separators as a budget: round their ends, lower their contrast, and remove every separator that has no stated reason.
  **Why** Dividers help orientation but accumulate silently; the refresh reduced noise by softening and cutting them while keeping structure.
  **Applies to** SaaS app UI | all. **Check** count visible 1px separators per screen before/after (target: fewer than one per visible section boundary); border alpha not above about 0.12 in light and 0.10 in dark on neutral surfaces ([engine note]; Vercel's report CSS uses three border alphas, subtle/default/strong, via its gray-alpha 300/400/700 steps). **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

- **RULE [GLS-05]** Keep header actions (share, copy link, open PR and similar) in the same slot and order on every view.
  **Why** Linear's stated trigger for the refresh was that header-bar actions had stopped appearing in predictable places as features were added.
  **Applies to** SaaS app UI. **Check** for each view type, bounding box x-order of the header action cluster is identical (same labels in the same sequence) across at least 5 views. **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

### 2.2 Theme and colour (Linear 2024 and 2026)

- **RULE [GLS-06]** Generate theme colours from three inputs (base colour, accent colour, contrast) in a perceptually uniform space, and expose contrast as a parameter so higher-contrast themes come for free.
  **Why** LCH is uniform, so a red and a yellow at the same lightness look equally light; one contrast variable replaced 98 hand-set variables per theme. Linear's custom-theme builder showed contrast 30 versus 100 as visibly different but coherent themes.
  **Applies to** SaaS app UI. **Check** theme file defines at most about 5 free colour inputs and derives all aliases by function; a contrast input exists and changes text/surface lightness separation monotonically. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui (March 28, 2024; read 2026-10-08)

- **RULE [GLS-07]** Keep neutrals neutral: limit how much of the accent hue ("chrome", blue for Linear) feeds into neutral surfaces, then raise content contrast by making text and neutral icons darker in light mode and lighter in dark mode.
  **Why** Heavily tinted neutrals date quickly; the 2024 change aimed for a more neutral, timeless look with stronger content contrast.
  **Applies to** SaaS app UI. **Check** OKLCH chroma of surface and border neutrals at most about 0.02 (an [engine note]; Linear gives no number); text-on-surface contrast does not decrease between theme versions. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui (read 2026-10-08)

- **RULE [GLS-08]** When warming a gray palette, stop before it turns muddy: step the neutral toward warm in small increments and judge with a live colour tool, not static mocks.
  **Why** Linear's 2026 move from a cool blue-ish gray to a warmer, less saturated gray needed many iterations because too warm looks muddy.
  **Applies to** SaaS app UI | landing page. **Check** hue of neutrals between about 60 and 100 degrees (OKLCH) with chroma at most about 0.015 ([engine note]); `visual` against a mid-gray swatch. **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

- **RULE [GLS-09]** Build a live colour tool into the dev toolbar that exposes hue, chroma and lightness per design token, lets anyone share a "recipe", and exports tokens as JSON for import into the design file.
  **Why** Mock in design tool, implement in a PR, spin a preview, review, repeat was painfully slow; a tool built in a couple of hours with coding agents replaced the loop.
  **Applies to** SaaS app UI. **Check** process; presence of a token-JSON export and an importer into Figma variables. **Source** https://linear.app/now/behind-the-latest-design-refresh (read 2026-10-08)

- **RULE [GLS-10]** Use a display cut for headings and the regular cut for text (Linear: Inter Display for headings, Inter for the rest).
  **Why** Adds expression to headings without hurting body readability.
  **Applies to** SaaS app UI | landing page. **Check** headings at 24px and above use the display/optical-size axis or display family; body does not. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui (read 2026-10-08)

### 2.3 Materials and translucency (Linear mobile, Liquid Glass)

- **RULE [GLS-11]** In dense professional interfaces use translucency, depth and lighting but not refraction; refraction makes dense content harder to read. Build the surface as: backdrop blur base, subtle structural gradient, specular highlight, soft shadow.
  **Why** Linear deliberately skipped Liquid Glass refraction for readability and rebuilt the rest from blur, gradient, an SDF-derived specular highlight, mask and shadow.
  **Applies to** SaaS app UI | mobile. **Check** `backdrop-filter: blur()` present without `url()` displacement filters; text on glass meets 4.5:1 against the worst backdrop. **Source** https://linear.app/now/linear-liquid-glass (October 21, 2025; read 2026-10-08)

- **RULE [GLS-12]** Honour Increase Contrast on translucent surfaces: when `prefers-contrast: more` (or the platform setting) is on, draw solid outlines around glass elements.
  **Why** Apple's system glass does this; Linear mirrored it exactly to preserve legibility.
  **Applies to** all. **Check** CSS contains a `@media (prefers-contrast: more)` branch for every translucent surface class. **Source** https://linear.app/now/linear-liquid-glass (read 2026-10-08)

- **RULE [GLS-13]** Give touchable surfaces small physical feedback: a slight lift on press and a slight elastic distortion when dragged past an edge; apply a variable blur that strengthens toward the scroll edge instead of a hard cut.
  **Why** Physical response makes the UI feel responsive; edge blur matches the system's soft-edge pattern.
  **Applies to** mobile. **Check** `:active` transform with scale/translate under about 2-3% or 2px; scroll-edge mask/blur gradient present on sticky bars. **Source** https://linear.app/now/linear-liquid-glass (read 2026-10-08)

- **RULE [GLS-14]** For professional tools, borrow consumer-grade aesthetics with a "pro-kit" discipline: purpose-built, restrained, focused; flatter gradients and sharper edges in information-dense workflows.
  **Why** The Aqua versus ProKit precedent: dense pro tools traded reflections for clarity.
  **Applies to** SaaS app UI. **Check** `visual`. **Source** https://linear.app/now/linear-liquid-glass (read 2026-10-08) (opinion)

### 2.4 Redesign process and tooling (Linear)

- **RULE [GLS-15]** Run a redesign as a time-boxed project: concept in a design tool first (call it a concept, which lowers early attacks), then stress-test the direction on the main views before implementing; ship behind a feature flag with a toolbar toggle to flip old/new; finish in about six weeks with a dedicated small team; roll out to a percentage of workspaces per day after a private beta.
  **Why** Slow redesigns block every other project and create design debt in newly shipped screens; flag plus toggle makes regressions diagnosable.
  **Applies to** SaaS app UI. **Check** process; flag exists; an A/B toggle in dev tools. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui and https://linear.app/blog/a-design-reset (read 2026-10-08)

- **RULE [GLS-16]** Test hierarchy changes view-type by view-type (list, board, split, fullscreen) with all states, not screen by screen.
  **Why** Working by view type ensures each decision holds in every case.
  **Applies to** SaaS app UI. **Check** screenshot matrix: each layout type times default/empty/loading/error/selected. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui (read 2026-10-08)

- **RULE [GLS-17]** Pay design debt in large sweeps every 2 to 3 years for fast-moving products rather than module by module; incremental restyling makes the product more disjointed.
  **Why** The experience is holistic and visual; users take unpredictable paths and a reset must consider all needs at once.
  **Applies to** SaaS app UI. **Check** process; (opinion, single author). **Source** https://linear.app/blog/a-design-reset (March 27, 2024; read 2026-10-08)

- **RULE [GLS-18]** Make nav chrome work in both an installed shell and a browser: previous/next buttons, history and tabs must be removable without breaking layout; align labels, icons and buttons optically in the sidebar and tab strips.
  **Why** Linear's app runs in Electron and the web; alignment across a tiny dense surface is felt after minutes of use.
  **Applies to** SaaS app UI. **Check** layout renders with those controls removed with no shifted baselines; label left edges share one x across rows. **Source** https://linear.app/now/how-we-redesigned-the-linear-ui (read 2026-10-08)

### 2.5 Dashboards (Linear, 2025)

- **RULE [GLS-19]** Pair every key metric with context: this week, last week and trailing highs and lows (or an equivalent mini chart), so anyone can tell good, bad or normal at a glance. Use the same minimal visuals for all metrics.
  **Why** Numbers without baselines force the viewer to hunt for meaning.
  **Applies to** SaaS app UI. **Check** each KPI tile contains a delta or sparkline with a comparison period; visual encoding is identical across tiles. **Source** https://linear.app/now/dashboards-best-practices (October 7, 2025; read 2026-10-08)

- **RULE [GLS-20]** Design a dashboard for one purpose and audience: strategy dashboards show a handful of slow-moving trends; operations dashboards show more metrics and highlight unexpected change; dashboards read rarely need more annotation than those read daily. Keep the set small (the median workspace creates two) and give each an owner.
  **Why** Dashboards without a purpose collect random charts; adoption falls after two and the rest go stale.
  **Applies to** SaaS app UI. **Check** each dashboard has a declared type, audience and owner field. **Source** https://linear.app/now/dashboards-best-practices (read 2026-10-08)

### 2.6 Component styling contract (Linear, StyleX)

- **RULE [GLS-21]** Components expose an explicit styling contract (variants, slots, tokens); do not restyle a component from outside by wrapping or overriding it (Linear's example: `styled(Button)`).
  **Why** Styling at a distance made the old system hard to reason about and caused a long tail of regressions after the redesign; deterministic, build-time style resolution fixed this.
  **Applies to** SaaS app UI. **Check** grep for `styled\(\s*[A-Z]\w+\)` and for `className` overrides that set padding/size on design-system primitives; counts must be 0 (matches the coss rule not to override component padding and sizing). **Source** https://linear.app/now/styling-linear-for-the-future-stylex (August 26, 2026; read 2026-10-08)

### 2.7 Stripe: accessible colour (2019)

- **RULE [GLS-22]** Audit default small-text colours first: in Stripe's audit none of the default small-text colours except black met 4.5:1. Do not fix this by stepping each colour one shade darker; that gives dark, muddy, indistinguishable hues.
  **Why** Hue-by-hue darkening loses brightness and makes hues hard to tell apart.
  **Applies to** all. **Check** contrast of every text token on its intended backgrounds at least 4.5:1 (3:1 for large text); count of tokens that fail = 0. **Source** https://stripe.com/blog/accessible-color-systems (October 15, 2019; read 2026-10-08)

- **RULE [GLS-23]** Make every text and icon colour pass on white and also on the lightest tint of any hue, because tinted section backgrounds are common.
  **Why** If each colour passes on the lightest tint of every hue, any pairing in the system is predictable.
  **Applies to** all. **Check** compute contrast of each text token against white and against each hue's lightest background token. **Source** https://stripe.com/blog/accessible-color-systems (read 2026-10-08)

- **RULE [GLS-24]** When a light background makes badge variants indistinguishable, shift both background and text up one level together rather than tuning each colour pair by hand.
  **Why** Level arithmetic keeps contrast constant across variants.
  **Applies to** SaaS app UI. **Check** in the ramp, badge fg/bg level distance is constant across variants. **Source** https://stripe.com/blog/accessible-color-systems (read 2026-10-08)

- **RULE [GLS-25]** Use a visual colour tool that shades the "imaginary" (unreproducible) region of the colour space before choosing values; remember that very dark yellow or very light, vibrant royal blue cannot exist.
  **Why** Sliders that silently clip give colours that do not match the requested parameters.
  **Applies to** all. **Check** every OKLCH/HCT token round-trips through sRGB with chroma reduction under about 0.01 (an [engine note] tolerance). **Source** https://stripe.com/blog/accessible-color-systems (read 2026-10-08)

### 2.8 Stripe: landing-page front-end techniques (2017 Connect, 2020 gradient)

- **RULE [GLS-26]** Build tilted decorative stripe backgrounds with CSS Grid (for example `grid: repeat(5, 200px) / repeat(10, 1fr)` and stripes placed by `grid-column`/`grid-area`), then skew the whole container (`transform: skewY(-12deg); transform-origin: 0`).
  **Why** Absolute positioning caused 1px rounding gaps between stripes and verbose media queries; grid places stripes in cells.
  **Applies to** landing page. **Check** background stripe containers use `display:grid`; no `position:absolute` stripes in the same group. **Source** https://stripe.com/blog/connect-front-end-experience (June 19, 2017; read 2026-10-08)

- **RULE [GLS-27]** Choose the animation technology in this order: CSS transitions, CSS animations, Web Animations API, then requestAnimationFrame only when you need springs or independent transforms.
  **Why** Each step up adds engineering cost; the first two run off the main thread. The Express demo was about 5KB total with WAAPI.
  **Applies to** landing page | SaaS app UI. **Check** grep for `requestAnimationFrame` loops animating properties that a CSS transition could handle. **Source** https://stripe.com/blog/connect-front-end-experience (read 2026-10-08)

- **RULE [GLS-28]** Avoid the built-in `ease-in`, `ease-out` and `linear` timing keywords; define a small set of custom `cubic-bezier` variables globally (Stripe's keyboard slide used `cubic-bezier(.2, 1, .2, 1)` at 800ms), animate only `transform` and `opacity`, and keep most animations under about 500ms.
  **Why** Custom curves look more polished; transform and opacity are cheap; long animations get in the way.
  **Applies to** all. **Check** computed `transition-timing-function` not in {ease, ease-in, ease-out, linear} for UI transitions; animated properties subset of {transform, opacity}; duration at most 500ms for UI motion. **Source** https://stripe.com/blog/connect-front-end-experience (read 2026-10-08). Stripe's 800ms is above its own 500ms norm because it is a large keyboard-slide in a demo; see section 5.

- **RULE [GLS-29]** Start a scroll-triggered demo once, when it is fully visible: IntersectionObserver with `threshold: 1`, run the callback, then `disconnect()`.
  **Why** No scroll listeners on the main thread; no replays.
  **Applies to** landing page. **Check** no `scroll` event listener drives the start; observer disconnects after first fire. **Source** https://stripe.com/blog/connect-front-end-experience (read 2026-10-08)

- **RULE [GLS-30]** Disable decorative animation under `prefers-reduced-motion` both in CSS (`animation: none`) and in JS (do not schedule frames).
  **Why** Stripe's rotating cubes used both CSS fades and JS rotation; both paths had to be cancelled.
  **Applies to** all. **Check** a `@media (prefers-reduced-motion: reduce)` rule exists and JS checks `matchMedia` before starting a loop. **Source** https://stripe.com/blog/connect-front-end-experience (read 2026-10-08)

- **RULE [GLS-31]** Draw simple device mockups in CSS (gradient, border-radius, inset shadow) when file size and resolution independence matter; the CSS laptop weighed under 1KB. Choose CSS, SVG, canvas, WebGL or image by performance, accessibility and fallback, not by habit.
  **Why** Tiny, resolution-independent, animatable, with positioned DOM content inside the display.
  **Applies to** landing page. **Check** device hero assets under about 5KB if CSS-drawn; `visual`. **Source** https://stripe.com/blog/connect-front-end-experience (read 2026-10-08)

- **RULE [GLS-32]** For a hero gradient, use one canvas driven by four CSS-variable colours, tilt it (`--section-skew-Y: -12deg`, with the vertical compensation factor set slightly above sin 12 degrees, about 0.212 versus 0.208), pause it when off-screen, and duplicate the headline in layers (a normal text layer above, a blended copy below with a blend mode, and a low-opacity overlay copy) so the colour shows through the type.
  **Why** This is the reverse-engineered recipe of Stripe's 2020 homepage effect; the pause (a ScrollObserver in Stripe's code) saves GPU and battery.
  **Applies to** landing page. **Check** exactly four colour custom properties feed the canvas; canvas has `aria-hidden`; an IntersectionObserver pauses rendering; static fallback under `prefers-reduced-motion`. **Source** https://www.kevinhufnagl.com/how-to-stripe-website-gradient-effect/ (tutorial by a third party reverse-engineering Stripe; read 2026-10-08) (secondary source)

- **RULE [GLS-33]** Personalise code samples with the signed-in user's own values (for example insert the user's API key into a docs snippet, in their preferred language).
  **Why** Stripe's designers cite this as the kind of detail developers love: someone thought about the moment of need.
  **Applies to** SaaS app UI | docs. **Check** `visual`; docs code blocks show real test-mode values when authenticated. **Source** https://designerfund.com/blog/embedding-design-into-the-fiber-of-fintech (September 13, 2021; read 2026-10-08)

### 2.9 Vercel: report-page design guidance (design.md) and brand CSS

- **RULE [GLS-34]** Make the first viewport the argument: the page should expose identity, the reader's question and the strongest evidence at once, not a masthead followed by setup. Apply two checks: a squint test (dominant claim obvious) and a text-mask test (with words blurred, hierarchy still shows identity, emphasis, grouping, progression).
  **Why** If every block has equal weight the page has no focal point; Vercel asks for one focal relationship per reading moment.
  **Applies to** landing page | all. **Check** blur the screenshot with a Gaussian of 8 to 12px and verify the top salient region is the intended claim/evidence; one element occupies the largest visual mass. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-35]** Use a 12-column grid on desktop, 6 on tablet and 4 on mobile; limit reading prose to 6 to 7 columns (about 68 characters per line, `--vbg-reading-width: 68ch`); let tables, charts and major comparisons span all 12; content width 1200px with at least 24px side space (`min(100% - 48px, 1200px)`); column gap 24px.
  **Why** Shared edges and baselines give alignment; prose has a readable measure, evidence gets full width.
  **Applies to** landing page | all. **Check** prose containers `max-width` at most 68ch; tables not narrower than their section; outer container at most 1200px with at least 24px horizontal padding. **Source** https://vercel.com/design.md and https://vercel.com/geist/vercel-brand.css (read 2026-10-08)

- **RULE [GLS-36]** Use this report-page type and spacing scale unchanged: sizes display 3rem, page title 2.5rem, title 2rem, section 1.5rem, subsection 1.25rem, lede 1.125rem, body 1rem, compact 0.875rem, label and metadata 0.8125rem; leading display 56px, page title 48px, title 40px, section 32px, subsection 26px, lede 28px, body 24px, compact 20px, caption 18px; weights regular 400, heading 450, medium 500, semibold 600; spacing 4/8/12/16/20/24/32/40/48/64px; radii 6px and 8px; control height 36px (44px on touch).
  **Why** Published tokens from Vercel's own CSS; heading at weight 450 shows variable-font fractional weights are in use at the biggest brand.
  **Applies to** landing page | all. **Check** computed sizes and line-heights lie in the listed sets (tolerance 0); heading weight between 400 and 500. **Source** https://vercel.com/geist/vercel-brand.css (read 2026-10-08)

- **RULE [GLS-37]** Set gaps by relationship: heading to its first paragraph close; within-group gaps 8 to 16px (`--vbg-space-2` to `-4`); between groups 24 to 32px (`-6` to `-8`); section turns 32 to 48px (`-8` to `-12`); reserve 64px for a true chapter break. One element owns each gap (a stack/grid sets it, children add no competing margins).
  **Why** Spacing expresses relationships; double margins and uniform spacing flatten hierarchy.
  **Applies to** landing page | all. **Check** measured gap heading to first paragraph is smaller than the gap above the heading; no element has both its own margin and a parent `gap` on the same axis. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-38]** Design in monochrome first and add colour only where it adds meaning to state, action or data, paired with a non-colour cue. The page is one continuous canvas; add a surface or border only when it communicates selection, interaction, warning, contrast or a real grouping spacing cannot express.
  **Why** Surfaces and colour should be earned; prefer spacing, alignment, type and density change before borders and boxes.
  **Applies to** landing page | all. **Check** number of distinct non-neutral hues in the screenshot at most 2 outside charts; ratio of bordered containers to sections under 0.5 ([engine note]). **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-39]** Hard-reject on report-style pages: decorative gradients, gradient text, glows, blobs, stripes, textures, grid backgrounds, glass, paper simulations, coloured side rails, ornamental shadows and fake depth. A gradient is acceptable only as a labelled continuous data scale.
  **Why** These are the recognisable generated-design reflexes; they decorate without evidence.
  **Applies to** landing page (report/evidence pages) | all. **Check** CSS contains no `linear-gradient`/`radial-gradient` on non-data elements, no `background-clip:text`, no `box-shadow` with blur above 24px or spread colour on non-modal elements ([engine note] thresholds). **Source** https://vercel.com/design.md (read 2026-10-08). Conflicts with the Stripe gradient (GLS-32): see section 5.

- **RULE [GLS-40]** Reject these reflexes: all-caps or tracked eyebrows, decorative numbered section labels, em dashes, pills or badges for ordinary metadata, cards inside cards, a dark rounded rectangle around every chart, icon tiles, repeated metric boxes where one composed relationship is clearer, generic centred hero followed by a card grid, identical section silhouettes for unrelated reader questions.
  **Why** Vercel lists these as the defaults a generated page shows; they signal template.
  **Applies to** landing page | all. **Check** regex for `text-transform: uppercase` with letter-spacing above 0.05em on elements above the H1; count of `—` characters in copy = 0; nested `.card .card` = 0. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-41]** Write sentence-case headings that state the customer-specific claim or question (what happened, what changes, or what decision is needed); do not name the genre ("Overview", "Report"). Sentence-case is also Stripe's content standard (alongside Oxford commas and en dashes).
  **Why** Headings are the executive path through a page.
  **Applies to** landing page | docs. **Check** headings not in Title Case (not more than 2 consecutive capitalised words beyond proper nouns); heading text not in {overview, introduction, summary, report}. **Source** https://vercel.com/design.md and https://designerfund.com/blog/ai-design-stripe (read 2026-10-08)

- **RULE [GLS-42]** Tables are evidence: semantic `<table>` with caption and head; full section width by default; text columns left-aligned, numeric columns and their headers right-aligned with tabular numerals; body cells aligned to the first-line baseline (not vertically centred); consistent units and precision; do not spend a column repeating the same category for a run of rows (use row groups); five or more columns or wrapped headers means full width.
  **Why** Header and cell alignment, a shared baseline and full width make lookup reliable.
  **Applies to** SaaS app UI | landing page. **Check** header `text-align` equals cell `text-align` per column; numeric cells have `font-variant-numeric: tabular-nums`; `vertical-align: baseline` on `td`. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-43]** For charts and bars: use zero baselines for length encodings; give repeated bars one shared label lane, plot lane and value lane via a parent grid/subgrid; prefer direct labels to legends; add a caption stating what to notice and what the chart does not establish; provide a table or text alternative; give the primary proof chart the width and contrast to carry the first read (chart minimum width 640px in Vercel's CSS).
  **Why** Honest encoding and aligned lanes avoid misleading small differences and ragged layouts.
  **Applies to** SaaS app UI | landing page. **Check** SVG bars all begin at the same x; each bar track has identical width; a `<figcaption>` and a table or `aria-describedby` exist. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-44]** Default to stillness: no marquees, simulated typing cursors, decorative pulsing indicators, reveal-on-scroll for every section, bounce, parallax or sound. Add motion only to explain a state change, preserve continuity or confirm an action.
  **Why** Motion is evidence-bearing only when it carries information; the page must be complete without it.
  **Applies to** landing page (report/evidence pages) | all. **Check** count of infinite CSS animations = 0 on non-loader elements; reduced-motion media query present. **Source** https://vercel.com/design.md (read 2026-10-08). Compare section 5 (Stripe and the repo's motion notes allow more).

- **RULE [GLS-45]** Do not use stock imagery, decorative AI illustrations, abstract shapes or fake product screenshots on evidence pages; use supplied screenshots or diagrams only when they are evidence; prefer text labels to icons unless the icon is established; never put icons in coloured tiles.
  **Why** Imagery that carries no evidence adds noise.
  **Applies to** landing page (report/evidence pages) | all. **Check** images have a source in the brief; `visual`. **Source** https://vercel.com/design.md (read 2026-10-08)

- **RULE [GLS-46]** Label icon-only buttons with an `aria-label` that names action and target ("Copy deployment URL", not "Copy"), and do not put `aria-label` on a button that already has visible text. Name destructive buttons Verb plus Noun ("Delete Project") and pair them 1:1 with their toast ("Project deleted"). Use `loading` state on the button instead of swapping to a spinner so it stays focusable.
  **Why** Screen-reader labels should match actions; swapped spinners drop focus and busy semantics.
  **Applies to** SaaS app UI. **Check** every button with no visible text node has an `aria-label` of at least two words; buttons with visible text have no `aria-label` that differs from the text. **Source** https://vercel.com/geist/button.md (read 2026-10-08)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Linear redesign length | about 6 weeks; five milestones (stress tests, behaviour definitions, sidebar/chrome refresh, private beta, GA) | how-we-redesigned-the-linear-ui |
| Design reset cadence | every 2 to 3 years for fast products | a-design-reset |
| Linear theme inputs | 3 (base, accent, contrast), replacing 98 variables | how-we-redesigned-the-linear-ui |
| Linear dashboards | median workspace creates 2; more than half of enterprise workspaces have at least 1; one third of viewers weekly, two thirds monthly | dashboards-best-practices |
| Linear StyleX migration | more than 1,000 PRs; share of files on StyleX went 0% (Mar 8, 2026) to 97% (Aug 2, 2026) | styling-linear-for-the-future-stylex |
| Stripe colour contrast | WCAG 2.0 thresholds 4.5 small, 3.0 large | accessible-color-systems |
| Stripe Connect grid | `repeat(5, 200px) / repeat(10, 1fr)`, skewY(-12deg) | connect-front-end-experience |
| Stripe cube | 100px sides, `translateZ(50px)`, `perspective: 600px`, max 3 faces visible | connect-front-end-experience |
| Stripe easing example | `cubic-bezier(.2, 1, .2, 1)`, 800ms, `fill: forwards` | connect-front-end-experience |
| Stripe gradient | 4 colours, skew -12deg, container 1080px, spacing 24px, padding 120px, title margin 100px | kevinhufnagl.com |
| Vercel spacing tokens | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px | vercel-brand.css |
| Vercel flow gaps | tight 8, copy 16, group 32, section 64 | vercel-brand.css |
| Vercel measures | reading 68ch, display 20ch, title 24ch, compact title 30ch | vercel-brand.css |
| Vercel contrast surface | `oklch(0.205 0 0)` with text `oklch(0.946 0 0)` and secondary `oklch(0.72 0 0)` | vercel-brand.css |
| Vercel breakpoints in CSS | 599, 600-800, 640, 800/801, 900, 1000 px media queries; one container query at 32rem | vercel-brand.css |
| Vercel control heights | 36px, 44px touch | vercel-brand.css |
| Geist button | sizes tiny, small, medium (default), large; labels in Title Case verb plus noun | geist/button.md |

## 4. Dos and Don'ts

- **Do** (Linear 2026) make sidebar tabs compact and rounded with smaller text and icon-only variants. **Don't** leave a full-width bright tab strip competing with the page body.
- **Do** (Linear) show Linear's coloured team icons without background tiles. **Don't** wrap every icon in a coloured square.
- **Do** (Stripe) darken a hue by moving along a lightness-equalised ramp. **Don't** just step one shade darker per hue.
- **Do** (Stripe) draw stripes in a CSS grid and skew the container. **Don't** position each stripe absolutely.
- **Do** (Vercel) put the numeric table header right above right-aligned numbers. **Don't** centre or left-align a header over right-aligned values.
- **Do** (Vercel) show a calculator as the dominant first-viewport object when manipulating assumptions is the job. **Don't** precede it with a static restatement.

## 5. Exceptions & judgement calls

- **Gradients: Vercel versus Stripe versus repo notes.** Vercel's report guidance hard-rejects decorative gradients; Stripe's homepage gradient (GLS-32) is the canonical decorative gradient hero; `color-and-surfaces.md` allows tonal gradients (same hue, small lightness delta). Resolution [engine note]: Vercel's rule is scoped to evidence/report pages; for brand-led landing pages a single hero gradient is fine if it is tonal, paused off-screen and not the only thing carrying the hierarchy.
- **Eyebrows.** Vercel rejects tracked all-caps eyebrows; Evil Martians and `copy-and-ux-writing.md` CW-12 allow a short informative one. See `gaps-landing-and-writing.md` section 5.
- **Motion.** Vercel: default to stillness; `motion-and-animation.md` and Stripe allow delight on rare moments. Both agree on never gating reading behind animation and respecting reduced motion.
- **Label case.** Geist's button guidance uses Title Case labels ("Deploy Project"), while Vercel's report guidance and Stripe's content standard use sentence case. Product buttons and report headings follow different conventions at Vercel itself; pick one per surface and keep it consistent. `copy-and-ux-writing.md` should be checked for its own default.
- **Heading weight.** Vercel's CSS sets heading weight 450. `typography.md` already notes fractional variable weights; this confirms them. Do not round 450 to 400 or 500 when the font is variable.
- **Body size and leading.** Vercel body is 16px/24px (1.5), at the low end of the repo's 1.5 to 1.65 band; consistent.
- **Measure.** 68ch (Vercel) versus 60ch (Every Layout) versus 40 to 60 characters (Material, see the Material file): choose per surface; marketing prose at 60 to 68ch is safe.
- **Stripe's 800ms** is a showcase animation in a demo; the same post advises staying under about 500ms for UI motion. Treat 800ms as a decorative-moment exception.
- **Date risk.** Stripe Connect (2017) predates `prefers-reduced-motion` support in most browsers and uses `requestIdleCallback` and polyfills; modern equivalents (container queries, `@starting-style`, view transitions) would replace some techniques. The principles (cheap properties, play once, reduced motion) still hold.
- **Linear is a product-UI source.** Its refresh principles are for dense B2B app UI; a marketing page does not need dimmed sidebars. Use GLS-01 to GLS-05 for app screens in the engine's SaaS UI mode.

## 6. Figures worth keeping

Linear before/concept/after sidebar screenshots (how-we-redesigned-the-linear-ui), the LCH vs HSL comparison and the contrast 30 versus 100 theme comparison; the new tab bar and borders figures in behind-the-latest-design-refresh; Stripe's colour-space diagrams (lightness curves per hue before and after); Stripe Connect cube and CSS laptop; Vercel Geist report pages (live). Capture via browser later for `examples/`.

## 7. Open questions

- **Not readable:** Next.js Conf design talks (video, not fetched); Stripe Press site design write-up (no blog post found; `stripe.com/blog/stripe-press-website` returned 404). Searches for Vercel "design engineering" posts returned only Geist docs; no dated Vercel blog post on design was found in the search results.
- **Geist colour hex values** were not in the Markdown (only the step semantics); `vercel-brand.css` contains `--vbg-gray-*` OKLCH values that were not extracted; extract with a script if needed.
- `vercel.com/geist/spacing.md` is 404 (no separate spacing doc); spacing comes from the brand CSS tokens above.
- The Stripe gradient recipe is a third-party reverse engineering (Kevin Hufnagl) of Stripe's minified code; "ScrollObserver" and "minigl" names are as he reports them.
- Linear 2026 post says the refresh uses coding agents (named in the post); not relevant to the rules but relevant to process; summarised in `gaps-process-interviews.md`.
- A check in GLS-01 (relative contrast gap) and GLS-07 (chroma 0.02) are my thresholds; Linear publishes no numbers for them.
