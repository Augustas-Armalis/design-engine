---
source: web:https://primer.style/ (plus untitledui.com, catalyst.tailwindui.com, ui.shadcn.com, radix-ui.com, vercel.com/geist, linear.app, supabase.com/design-system, carbondesignsystem.com, atlassian.design, shopify.dev/docs/api/polaris, stripe.com/blog, kargul.studio)
chapter: What "fully specced" consists of; spec package for a marketing site; neutral vs distinctive
pages: n/a (web, fetched 2026-10-08)
topic_tags: [benchmark, design-system, spec, audit, tokens, states, a11y, motion, marketing-site, distinctiveness]
status: studied
---

# The "fully specced" bar

Evidence tags used below: **[V]** read on the live page this session. **[S]** from search snippets only. **[E]** engine note: general knowledge, not re-verified today. Where a page was too long or blocked, that is stated rather than guessed. Companion: `marcel-kargul-profile.md`.

## 1. Core ideas

1. **"Fully specced" means a stranger can build or review any screen without asking the author.** The tier differs from ordinary work by what is written down and enforced, not by how pretty the screenshots are.
2. **The largest gap is semantic tokens, not components.** Radix, Geist, Atlassian, shadcn and Linear all assign meaning to a numbered or named step (what step 9 is for, what `color.text.subtle` is for). Most project work has hex values and ad-hoc spacing.
3. **State matrices and per-component accessibility are the second gap.** Carbon publishes a test-status table per component; Primer publishes a per-component accessibility page with test checklists. Most projects show default and hover only.
4. **Parity (light/dark, Figma/code, desktop/mobile) is what users feel as "consistent".** Untitled UI sells Figma-to-code alignment; Atlassian ships light, dark and high-contrast as token themes; Radix Themes derives light/dark from the same scale.
5. **The best systems shrink the input surface.** Linear went from 98 theme variables to 3 (base, accent, contrast) [V]. Radix Themes is configured with five props (accent, gray, panel background, scaling, radius) [V]. A spec is strongest when a few decisions generate the rest.
6. **Governance is the invisible part:** naming, status labels, deprecation, changelog, ownership. Primer has component status; Polaris React was formally replaced by web components with versioned migration guides [S]; Untitled UI promises lifetime updates with a changelog [V].
7. **Marketing sites are a different spec problem from product UI.** GitHub split Primer into Product UI and Brand UI, with Brand covering hero, river, bento, pricing, FAQ, testimonial, animation guide [V]. Kargul Studio's starter spec covers marketing concerns (type scale in base layer, section-padding tokens, asset pipeline, SEO layer) [V via summary].
8. **Kits are neutral on purpose. Distinctiveness is a small set of owned decisions layered on a spec**, never an absence of one (section 6).

## 2. Comparison table: what each system specifies that most work does not

| System | Distinctive specification (verified unless tagged) | Gaps / caveats |
|---|---|---|
| **Untitled UI** (Figma + React) | Claims 10,000+ components/variants, 900+ styles and variables, 29 colours, 420+ page examples, "100% Auto Layout 5.0", WCAG claims by default, colour variables for dark mode (paid tiers), lifetime updates + changelog [V, vendor claims]. React version built on React Aria (a11y primitives) and copied into your repo [V]. | Intro page did not state variants/states/tokens/naming conventions; its own pages disagree on version numbers [V]. Many figures are marketing claims. |
| **Tailwind UI / Catalyst** | Copy-in React + Tailwind components, Headless UI behaviour, fixed icon sizes (16px most components, 20px for navbar/sidebar items), layouts (Sidebar, Stacked, Auth), font via `--font-sans`; relies on Tailwind default theme, major theme changes mean editing components [V]. | Docs page does not discuss accessibility or dark-mode configuration [V]. Spec lives in code, not in a token layer. |
| **shadcn/ui and themes** | Surface/`-foreground` token pairs, `:root` + `.dark` same token names, `--radius` base with derived sm to 4xl, chart-1..5, sidebar group, base colours (Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe), `@theme inline` to add tokens, presets via shadcn/create [V]. | Per-component state/a11y/content guidance is thin (it is a code distribution, not a guidelines site) [E]. |
| **Radix Themes / Colors** | 12-step scales with defined jobs (1-2 backgrounds, 3-5 component bg normal/hover/active, 6-8 borders, 9-10 solid, 11-12 text) and APCA guarantees: steps 11 and 12 reach Lc 60 and Lc 90 on step 2 [V]. Theme from props: accentColor, grayColor, panelBackground, scaling, radius [V]. | Page did not detail dark parity text; implied by the colour docs [E]. |
| **Vercel Geist** | 10-step colour per hue (100-300 backgrounds default/hover/active, 400-600 borders, 700-800 high-contrast bg, 900 secondary text, 1000 primary text) [V]. Type as named classes: Heading 72 to 14, Label 20 to 12 (mono at 14/13/12), Copy 24 to 13, Button 16/14/12, Subtle/Strong modifiers, tabular figures on Label 13 [V]. Material presets with radii: base/small 6px, medium/large 12px, tooltip 6, menu 12, modal 12, fullscreen 16, tooltip has a stem [V]. Docs available as Markdown by appending `.md` [V]. | Shadow values given only relatively on the page [V]. |
| **Linear** | LCH theme generation; each theme needs 3 variables (base, accent, contrast) instead of 98; contrast variable allows very high contrast themes; Inter Display for headings, Inter for text [V]. | Linear's component docs are not public (no public spec) [E]. |
| **Supabase Design System** | Four layers: foundations (accessibility, colour usage, copywriting, icons, theming, typography), UI patterns (forms, modality, empty states, tables, layout), fragment components (26, assembled from atoms), atom components (about 50). Source in the open repo; inspired by Radix, shadcn, Geist [V]. | No visible status scheme or token list on the landing page [V]. |
| **GitHub Primer** | Component status page, Figma libraries, per-component Overview / Guidelines / Accessibility, props with defaults and deprecations. Button accessibility page: labels, scheme-not-sole-cue, 24x24px minimum target, avoid disabled, loading state with live region, explicit integration and component test checklists [V]. Brand UI for marketing (Hero, River, Bento, Pricing, FAQ, animation guide; v0.78.0) [V]. | Primer's own button page still offers design/code parity labels per platform, but numeric tokens were not visible in the excerpt [V]. |
| **Shopify Polaris** | Content guidelines per component, tokens, Polaris React formally deprecated for web components with 60+ migration pages; 2025-07 last API version supporting React UI extensions [S]. | The old polaris-react.shopify.com now redirects to shopify.dev [V]; detailed tokens and content pages not re-read. Treat as governance example, not as a style source. |
| **Atlassian** | Tokens named foundation.property.modifier (`color.icon.success`), types: colour, elevation, opacity, space, typography, motion; themes light/dark/high contrast plus density (cozy, comfortable, compact), reduced motion, custom typography; rule: choose by meaning not by value [V]. Button page: one primary per area, sentence case, verb-first labels, avoid disabled buttons, no tooltips on disabled buttons [V]. | Versioning/deprecation not on the pages read [V]. |
| **IBM Carbon** | Motion tokens: fast-01 70ms, fast-02 110, moderate-01 150, moderate-02 240, slow-01 400, slow-02 700; productive vs expressive easing with explicit cubic-beziers; reduced-motion guidance [V]. Per-component accessibility page: keyboard interactions, design annotations, development considerations, and a test-status table (default state, advanced states, keyboard navigation, screen-reader manual test with JAWS, VoiceOver, NVDA) [V]. | Bar is high but heavy for a marketing site. |
| **Material 3** | Three token tiers (reference, system, component) and state layers (one layer at a time). Opacities hover 8%, focus 10%, pressed 10%, dragged 16% [E; search could not confirm, pages blocked]. | Our fetch of m3.material.io returned only titles. Numbers need verification before being turned into a rule. |
| **Apple HIG** | Platform-aware guidance per control; 44x44pt minimum target; Liquid Glass materials in 2025 releases [E; page bodies not retrievable]. | Not verified today. Use the `apple-design` skill for web translation. |
| **Stripe** | Colour scales rebuilt in CIELAB so text/icon colours pass WCAG on white and on the lightest tint of each hue; steps >= 5 apart pass for small text, >= 4 for icons and large text; Badge shifts both bg and text up one level [V]. | Blog post (not a live spec); product UI guidelines not re-read. |
| **Kargul Studio starter** | Type scale in base layer, section-padding tokens, em max-widths, button explicit variant, `Asset` pipeline (AVIF, Rive gated by LCP), Figma layer directives, shared easing, SEO layer (`lib/seo.ts`, sitemap, robots, llms.txt), OG image 1200x630 [V via summaries; CONVENTIONS.md not public]. | No public component state or a11y doc found. |

## 3. Ranked list: what "fully specced" consists of

Ranking = leverage per hour of writing for a marketing site, with a nod to what separates this tier. Each item is auditable.

| # | Spec element | What "done" looks like | Seen in |
|---|---|---|---|
| 1 | **Semantic colour tokens with defined jobs** | Every colour referenced by role (bg-default/subtle, surface, border-subtle/strong, text-primary/secondary, accent, accent-hover, focus ring, success/warn/danger), not by hex. A step table says what each step is for. | Radix, Geist, Atlassian, shadcn |
| 2 | **Type scale as named roles** | Named styles (display, h1-h3, lede, body, label, caption, button, mono) with size, line height, tracking, weight, for mobile and desktop; set once on tags/classes; one tracking rule for display sizes. | Geist, Kargul starter |
| 3 | **Spacing / section rhythm tokens** | 4px base scale; 3-4 named section paddings; one gutter; one max content width; measure (line length) in em. | Kargul starter, Atlassian (space tokens) |
| 4 | **State matrix per interactive component** | Default, hover, focus-visible, active/pressed, disabled-or-inactive, loading, error, selected, with drawn or specified values (not "same as hover"). | Primer, Carbon, Material (state layers) |
| 5 | **Accessibility per component + tested** | Keyboard map, accessible name rule, target size (24px WCAG 2.2 floor, 44px comfortable), focus visible, contrast pairs listed, reduced motion, plus a recorded test result. | Primer, Carbon |
| 6 | **Dark-mode / theme parity** | Same token names, both modes screenshotted for every component; contrast pairs checked in both; no raw hex in components. | shadcn (`.dark`), Radix, Atlassian |
| 7 | **Radius, border, elevation (materials)** | A named set (e.g. 6/12/16px) with intended use; nested radius rule; shadow/fill recipe per elevation; focus ring spec. | Geist materials, Kargul (fill-contrast depth) |
| 8 | **Motion tokens + reduced-motion rule** | Duration set (about 70/110/150/240/400/700ms is Carbon's), 1-3 easings, what animates and what must never animate, `prefers-reduced-motion` behaviour, interruptibility. | Carbon, Kargul (single curve) |
| 9 | **Content guidelines** | Label case (sentence), verb-first buttons, length limits, number/date format, error-message pattern, empty-state pattern, forbidden phrases, alt-text rule. | Atlassian, Polaris [S], Supabase (copywriting) |
| 10 | **Density / size modes** | A `size` prop or scaling factor that moves everything coherently (cozy/comfortable/compact; Radix `scaling`; coss `size`), instead of per-instance padding. | Atlassian, Radix Themes |
| 11 | **Naming and token governance** | Name pattern foundation.property.modifier; "choose by meaning not by value"; no one-off tokens without review. | Atlassian, shadcn |
| 12 | **Imagery / illustration / icon spec** | Icon grid + stroke weight + sizes (Catalyst: 16 and 20px), illustration style rules, screenshot treatment (crop, radius, frame), image formats and budgets. | Catalyst, Kargul (Asset pipeline, avatar set) |
| 13 | **Layout grid + breakpoints + mobile as its own composition** | Columns, gutters, max widths, breakpoint list, what reflows, mobile type scale, touch targets. | Geist (grid), Kargul (mobile CTAs full width) |
| 14 | **Status and versioning** | Each component labelled alpha/beta/ready/deprecated; changelog; deprecation path. | Primer, Polaris [S], Untitled UI (changelog) |
| 15 | **Code/design parity and handoff protocol** | Figma variable names = code token names; layer-name directives or Code Connect; one source of truth. | Untitled UI, Kargul (`[[hover]]`, `[[export]]`) |
| 16 | **Performance and SEO budgets** | LCP target, image budget, font loading, metadata layer, OG image spec, sitemap/robots. | Kargul starter (OPTIMIZATION.md, `lib/seo.ts`) |
| 17 | **Pattern layer** | Forms, modals, empty states, tables, navigation patterns written as decisions (when to use what). | Supabase (UI patterns), Primer |
| 18 | **Voice and brand layer** | Personality, tone examples, do/don't, one distinctive owned device. | (system-specific; see section 6) |

## 4. Audit checklist (agent-runnable)

Score each: 0 absent, 1 partial or undocumented-but-consistent, 2 documented and enforced. A project is "fully specced" for a marketing site at >= 28/34 with no 0 in items 1-6. Mechanical checks use `tools/check.mjs` where it exists; otherwise Playwright `getComputedStyle`.

- [ ] **A1 Colour roles.** All `color`/`background-color`/`border-color` values resolve to <= 14 distinct values per mode; each maps to a named token. *Check:* collect computed colours, compare to token file; count unmapped.
- [ ] **A2 Step table.** Token file or doc states the job of each scale step. *Check:* doc present.
- [ ] **A3 Contrast pairs.** Every text/background token pair used on the site has a recorded ratio >= 4.5 (>= 3 for >= 24px or bold >= 18.66px). *Check:* compute from tokens, not screenshots.
- [ ] **A4 Type roles.** `h1-h3,p,small,button` computed sizes/line-heights/tracking identical across all pages. *Check:* crawl pages, diff the set.
- [ ] **A5 Type scale.** Distinct font sizes across site <= 12; every one in the scale file. (Kargul home uses 12.)
- [ ] **A6 Mobile type.** Separate mobile values exist for h1-h3; h1 at 390px <= 0.65 of desktop unless justified.
- [ ] **A7 Spacing.** Every margin/padding/gap on a 4px base; <= 4 section paddings; one gutter value. *Check:* modulo 4 on computed spacing, count unique section padding.
- [ ] **A8 Measure.** Body line length 45-75 characters; heading max-width in em.
- [ ] **A9 States.** Each interactive component has hover, focus-visible, active, disabled/inactive, loading (if async), error (if input) written or drawn. *Check:* Playwright `:hover`, `:focus-visible` snapshots diff against default (must differ).
- [ ] **A10 Focus.** Focus ring >= 2px, >= 3:1 against adjacent colours, never removed without replacement.
- [ ] **A11 Targets.** Interactive targets >= 24x24 CSS px (WCAG 2.2), >= 44 on touch. *Check:* bounding boxes at 390px.
- [ ] **A12 Accessible names.** Every icon-only control has an accessible name; button text states the action. *Check:* axe-core (installed) plus name audit.
- [ ] **A13 Reduced motion.** Every animation has a `prefers-reduced-motion` branch. *Check:* grep and emulate.
- [ ] **A14 Motion tokens.** <= 6 durations and <= 3 easings across the stylesheet. *Check:* collect `transition` and `animation` values (Kargul home: 2 easings).
- [ ] **A15 Dark/theme parity.** If a second mode exists, token names identical; screenshots of every section in both; no hard-coded colours in components.
- [ ] **A16 Radius set.** <= 5 distinct radii plus pill; nested radius rule documented.
- [ ] **A17 Elevation.** Elevation recipe table (fill/border/shadow per level) present; no ad-hoc box-shadow strings. *Check:* distinct `box-shadow` values <= 4.
- [ ] **A18 Icons and imagery.** One icon family, one stroke weight; image formats, sizes, aspect ratios specified; alt-text rule.
- [ ] **A19 Content rules.** Label case, CTA grammar, banned-phrase list (see `tools/thresholds.json`), error/empty text patterns.
- [ ] **A20 Grid.** Columns, max width, breakpoints written; mobile composition described separately.
- [ ] **A21 Naming.** Token and component names follow one pattern; no `Final2`, no numeric one-offs.
- [ ] **A22 Parity/handoff.** Design tool variable names equal code token names, or a mapping table exists.
- [ ] **A23 Status/versioning.** Components have status; changelog exists for the project's own system.
- [ ] **A24 Performance.** LCP, CLS targets stated; hero assets inlined or preloaded; Rive/Lottie/video gated.
- [ ] **A25 SEO/meta.** Title/description/canonical/OG (1200x630)/sitemap/robots derive from one config.
- [ ] **A26 Landmarks.** One h1, `<main>`, nav, footer, skip link, `lang`.
- [ ] **A27 Responsive proof.** Screenshots at 390, 768, 1440; no horizontal overflow at any.
- [ ] **A28 Pattern layer.** Forms, modals, empty/error states each have one written decision.
- [ ] **A29 Distinctive device.** At least 3 owned decisions from section 6 are written down and visible on the fold.
- [ ] **A30 Override log.** Every broken rule logged in `DIRECTION.md` as `override: <rule-id> because <reason>`.
- [ ] **A31 Sample-data label.** Any invented number, logo, testimonial or metric is labelled sample (CLAUDE.md principle 4).
- [ ] **A32 Ownership.** One named owner per token file and per component set.
- [ ] **A33 Decision log.** Why the type pair, palette and radius were chosen, in one line each.
- [ ] **A34 Review artefact.** Final screenshots plus the measured table of A4-A17 attached to delivery.

## 5. Minimum viable spec package for one marketing site

Write these **before** building any page. Target: one `DIRECTION.md` plus one `tokens.css` (or the equivalent in `system/`) of about 2-3 pages total. The first six are the load-bearing ones.

1. **Brief line and reference triad** (one structural, one type/identity, one proof/material/motion reference; the one rule taken from each). Already in CLAUDE.md pipeline step 3.
2. **Colour tokens**: background (default, subtle), surface, border (subtle, strong), text (primary, secondary), accent (+hover), focus ring, status colours; light and dark if shipping both; step meaning stated; contrast table.
3. **Type roles table**: display, h1, h2, h3, lede, body, small, label, button, mono; size / line-height / tracking / weight for 390 and 1440; font names, weights loaded, fallbacks; measure limits in em.
4. **Spacing and layout tokens**: 4px base scale, gutter, content max-width, 3-4 named section paddings, grid/columns, breakpoints (at least 390, 768, 1440).
5. **Shape and depth**: radius set with use (control, card, panel, pill), nesting rule, elevation recipe (fill/border/shadow per level), focus ring.
6. **Component inventory with states**: nav, hero, CTA button (primary/secondary/ghost), card, logo strip, feature block, pricing, FAQ/accordion, form field, footer. For each: variants, states (default, hover, focus-visible, active, disabled, loading, error), sizes. Mark which ones the pages actually use; spec only those.
7. **Motion**: durations (about 3: 150, 240, 400), easings (1-2, named), what animates (hover, enter, scroll reveal), what never animates, reduced-motion behaviour.
8. **Imagery and asset rules**: icon family and stroke, illustration/photo/screenshot treatment (crop, radius, frame), formats and weight budgets, alt-text rule, one `Asset`-style wrapper if the stack allows.
9. **Content rules**: CTA grammar, label case, headline pattern, banned phrases, proof rules (never invent proof), error/empty strings.
10. **Page map and section order**: routes, for each page the section sequence and the one action; SEO config (title/description/OG) from one file.
11. **Distinctive device list**: 3-5 owned decisions (section 6) with one sentence each on what makes them this brand's.
12. **Overrides and acceptance**: rules deliberately broken; the measured checks that must pass (A4-A17 subset); screenshot set to capture.

### Rules (SCHEMA format)

- **RULE** Do not write page code until items 2-6 of the spec package exist as tokens in code (CSS variables), not as prose.
  **Why** Specs that are not executable drift; the Kargul starter and Geist/Radix/shadcn all ship tokens as code.
  **Applies to** landing page | marketing site | SaaS UI. **Check** `tokens.css` or `system/` file exists with >= colour, type, spacing, radius groups before first `index.html` commit; computed styles resolve to those variables. **Source** this note, sections 2-5.

- **RULE** Name colours by job and define every scale step's job; refuse raw hex inside components.
  **Why** Radix steps 1-12 and Geist 100-1000 are the reason themes and dark mode stay consistent; Atlassian says choose tokens by meaning, not by value.
  **Applies to** all. **Check** grep for `#[0-9a-f]{3,8}` and `rgb(` in component CSS/TSX = 0 outside token files. **Source** Radix Colors, Geist Colors, Atlassian tokens.

- **RULE** Specify and screenshot hover, focus-visible, active and disabled (or inactive) for every interactive component; do not disable submit buttons by default, explain what is missing instead.
  **Why** Primer, Atlassian and Carbon all treat disabled buttons as an accessibility problem (not focusable, no tooltip); the state matrix catches omissions.
  **Applies to** forms | landing page | SaaS UI. **Check** per component, compare computed style of `:hover` and `:focus-visible` to default (>= 1 property differs); search for `disabled` on submit buttons. **Source** Primer button a11y; Atlassian button usage.

- **RULE** Give every control an accessible name, a focus ring (>= 2px, >= 3:1), and a target of at least 24x24 CSS px (44px on touch layouts).
  **Why** 24px is the WCAG 2.2 floor Primer cites [V]; 44px is Apple's recommendation [E].
  **Applies to** all. **Check** axe-core on rendered page; bounding boxes at 390px. **Source** Primer button a11y.

- **RULE** Limit motion to <= 6 durations and <= 3 easings; ship a `prefers-reduced-motion` branch for every animation.
  **Why** Carbon uses 6 duration tokens (70 to 700ms) and two easing families; unlimited values mean no system.
  **Applies to** all. **Check** collect `transition-duration`/`animation-duration`/timing functions from stylesheets. **Source** Carbon motion.

- **RULE** Derive many values from few inputs: base, accent, contrast (colour), one `--radius`, one scale/size factor.
  **Why** Linear moved from 98 theme variables to 3; shadcn derives radius sm to 4xl from `--radius`; Radix Themes uses five props. Fewer inputs, fewer inconsistencies.
  **Applies to** all. **Check** count of independent colour variables in tokens file is <= 20 for a marketing site; radii derived by calc from one base. **Source** Linear redesign; shadcn theming; Radix Themes.

- **RULE** Generate colour scales in a perceptually uniform space (OKLCH, LCH or CIELAB) and check text pairs by contrast, not by eye.
  **Why** HSL lightness is not perceptual; Stripe rebuilt its scales in CIELAB so same-step colours share contrast, and Linear moved to LCH.
  **Applies to** all. **Check** token pairs computed contrast table passes A3. **Source** Stripe accessible colour systems; Linear.

## 6. Beautiful and consistent versus beautiful, consistent AND distinctive

### 6.1 Why kits are neutral

Untitled UI, Catalyst, shadcn base colours, Radix defaults and the Kargul studio shell are designed to be adopted by anyone, so they minimise opinion: one grotesk or neo-grotesk (Inter, Geist), grayscale or one accent, 6-12px radii, soft borders, shallow shadows. This produces beautiful, consistent, and interchangeable output: swapping the logo yields another company's site. This is the failure CLAUDE.md principle 2 names.

### 6.2 What the distinctive systems did (verified examples)

| System | Owned decision(s) that make it recognisable | Still fully specced? |
|---|---|---|
| **Linear** | Display type voice (Inter Display for headings vs Inter for text), an LCH-derived theme with a restrained near-neutral chrome (blue chroma deliberately limited), 3-variable theming [V] | Yes, and the spec is what lets the opinion stay consistent. |
| **Vercel Geist** | Own typeface (Geist Sans/Mono), the grid as a visual motif ("core part of the Vercel aesthetic"), material presets with deliberate radii (6/12/16), high-contrast black and white [V] | Yes: classes, scales and materials are named. |
| **Stripe** | Vibrant hues kept vibrant while meeting contrast, via per-hue lightness curves in CIELAB [V] | Yes: colour is the owned decision. |
| **GitHub Primer Brand** | A separate marketing system (Hero, River, Bento, animation guide) with its own illustration set ("Mona") beside the product system, so marketing can be expressive while product stays dense [V] | Yes. |
| **Supabase** | Starts from Radix/shadcn/Geist inspiration, then adds its own patterns/fragments layer (copywriting, empty states, connect interstitials) [V] | Yes. |
| **Kargul Studio portfolio** | Neutral shell, but each client's site gets a different type voice, palette, imagery and motion (Hunt dark network graph, Ostium warm amber photography, Altrina pale editorial AI, 43.io photographic) [V from screenshots] | Studio shell is spec-led; per-client identities presumably have their own specs (not published). |
| **Material 3** [E] | Expressive theming from a seed colour (dynamic colour), tonal palettes | Yes, but the default look is recognisably "Material". |
| **Apple HIG** [E] | Platform-native materials and motion (Liquid Glass in 2025 releases) | Platform-level distinctiveness. |

### 6.3 Pattern: neutral skeleton, owned decisions

[engine note] Across the verified cases, distinctiveness comes from 3-5 owned decisions placed in the most visible 10% of the system, with everything else left neutral and fully specced. Candidate decision slots, in the order they show on the fold:

1. **Type voice**: a display face or optical size that is not the default grotesk (Linear's Inter Display; Geist; Primer's Mona Sans [E]).
2. **Colour temperature and curve**: a hue family and lightness curve that is not blue-on-white or neutral gray (Stripe's vibrant-but-accessible scales).
3. **Material signature**: radius set, border/fill/shadow recipe (Geist's 6/12/16 materials; Kargul's nested 18/36 slabs).
4. **Motion signature**: one named curve and one scroll/hover behaviour used everywhere.
5. **Imagery system**: illustration style, screenshot framing, photography rules (Primer's Mona; Kargul's isometric line art and avatar set).
6. **Structural move**: one layout idea not shared with the last 8 ledger entries (nav grammar, section order, hero class).
7. **Voice**: copy patterns specific to the brand.

### 6.4 Rules (SCHEMA format)

- **RULE** After the neutral spec exists, pick 3-5 distinctive decisions from the slots in 6.3, write each in `DIRECTION.md` with the reason, and make at least two visible above the fold at 390 and 1440.
  **Why** Spec gives consistency; owned decisions give recognisability. Neutral kits stop at the first.
  **Applies to** landing page | marketing site. **Check** `DIRECTION.md` lists >= 3 decisions with reason; fold screenshots visibly differ from last 8 ledger entries on >= 2 slots (`tools/ledger.mjs similar`). **Source** sections 6.2-6.3.

- **RULE** Do not use a kit's default type family, default accent and default radius together on a brand site; change at least one of the three on purpose.
  **Why** Defaults in all three are what make kit output interchangeable.
  **Applies to** marketing site. **Check** compare computed `font-family`, primary colour and card radius to the kit's defaults (Geist or Inter; #232323/#171717 neutral; 10px = `--radius .625rem` in shadcn/Kargul). **Source** kargul.studio measured values; shadcn theming.

- **RULE** Keep the shell neutral only when something else carries the brand (client work, product screenshots, illustration). If there is no such content, the shell must carry the distinctive decisions.
  **Why** Kargul's shell works because 30 case studies and illustrations carry colour; a product with only text and a hero has nothing else to hold identity.
  **Applies to** marketing site. **Check** visual: remove the logo; can a stranger tell which company this is from type, colour, imagery? **Source** kargul.studio screenshots.

- **RULE** A distinctive decision still needs spec: tokens, state, a11y and mobile behaviour for it.
  **Why** Linear's opinionated look stays coherent because the theme derives from three inputs; expressive devices without a spec decay across pages.
  **Applies to** all. **Check** each decision from 6.3 maps to a token or a named component. **Source** Linear, Geist.

## 7. Exceptions, judgement calls and open questions

- A one-page campaign site does not need all 34 audit items. Items 1-8 of the ranked list (colour, type, spacing, states, a11y, dark parity if shipped, materials, motion) plus the pattern for forms are the floor; the rest scale with page count. [engine note]
- Density modes (Atlassian cozy/comfortable/compact; Radix `scaling`) matter for product UI more than marketing; keep them in the audit but weight low for marketing sites.
- Content guidelines are best-evidenced in Atlassian (verified for buttons) and Polaris (search snippet only); `design:ux-copy` and `tools/thresholds.json` already cover part.
- **Not verified:** Material 3 state-layer opacities; Apple HIG specifics; Polaris content/tokens text; Tailwind UI Pro marketing blocks spec; whether Untitled UI Figma variable names equal React token names (page did not say). Do not turn these into rules without a second source.
- Fetcher limits: x.com returns HTTP 402; Figma community pages 403; several long docs truncated. Claims depending on them are tagged [S] or [E].
- Open: which AlignUI/Kargul URLs the founder means by "the quality of Marcel Kargul"; pin the bar to named pages and measured numbers (see profile note) rather than to a person.
