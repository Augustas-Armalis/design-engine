---
source: web:multi (nngroup.com, lawsofux.com, github.com/vercel-labs/web-interface-guidelines, practicaltypography.com, animations.dev, emilkowal.ski, css-for-js.dev, joshwcomeau.com, rauno.me, benji.org, developer.apple.com/design, m3.material.io, web.dev/learn, a11yproject.com, every-layout.dev, learnui.design, refactoringui.com, design-system.service.gov.uk, and others listed in section 8)
chapter: Best UI/UX/design-engineering courses, books, articles - what they teach
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [curriculum, hierarchy, typography, color, spacing, depth, motion, interaction, accessibility, forms, layout, taste, process]
status: studied
---

# Courses, books and articles: what they actually teach

How to read this note. Section 2 holds rules in the SCHEMA.md shape, grouped by theme. Section 8 is the source-by-source digest (URL, format, audience, principles, rating). The prioritised ingestion queue lives in `ingestion-queue.md` next to this file.

Provenance labels used everywhere:
- **[fetched]** I read the page this session (via fetch tooling, which summarises through a small model, so numbers were cross-checked where two sources agree).
- **[engine note]** from my own prior knowledge, NOT verified this session. Treat as a hypothesis until a source is ingested.
- **(opinion)** the author expresses taste, not a measured result.
- Nothing here reproduces source text beyond one short quote; everything is paraphrased.

## 1. Core ideas

1. **The best sources agree on a small kernel.** Hierarchy by contrast and spacing (not decoration), one consistent system of scales, restraint in motion, defaults that respect accessibility, and explainable taste. Every rule below is a version of one of these. (Refactoring UI, Apple HIG, NN/g, Vercel WIG, Emil all converge.)
2. **Taste is trained and can be articulated.** Emil's "Developing Taste" and "Agents with Taste" argue that good taste has a reason behind it, and that writing the reason as strict, numeric rules is what makes it transferable to an agent. This is exactly the design-engine thesis. [fetched]
3. **Rules with numbers beat adjectives.** The most reusable sources (Practical Typography, Vercel WIG, Material tokens, Apple HIG tables, a11y checklist) give thresholds a script can check. Sources that stay at "make it clean" (most Medium/listicle content) are low value for ingestion.
4. **Frequency decides how much motion/delight to spend.** Emil, Rauno (Invisible Details), Benji (Family Values) and Apple HIG independently say: frequent actions get little or no animation; rare moments earn elaborate delight. [fetched]
5. **Interfaces are physical.** Apple's fluid-interface talk, Rauno and Emil converge on: respond within a frame to input, keep gestures interruptible, preserve momentum, show spatial origin, use springs with damping near 100% unless the gesture carried momentum. [fetched]
6. **Layout = guiding the browser, not dictating.** Every Layout, Josh Comeau's CSS for JS Devs and web.dev Learn CSS all teach: learn the layout algorithms, set tolerances (max-width in `ch`, `clamp()`, flex/grid) instead of fixed pixel values. [fetched]
7. **Accessibility is a design input, not an audit.** a11yproject, web.dev Learn Accessibility, Apple HIG, GOV.UK, Inclusive Components and Adrian Roselli agree on: native elements first, visible focus, contrast thresholds, reduced motion, 44px-class targets, no colour-only signalling. [fetched]
8. **Systems are languages.** Kholmatova (Design Systems), GOV.UK, Geist and Material all frame a design system as shared vocabulary + principles + patterns, evolved with the product rather than built up front. Principles must be specific enough to settle arguments. [fetched for GOV.UK/Smashing page; Kholmatova detail is [engine note]]
9. **Process sources matter for an agent too.** Shape Up (appetite, breadboarding, fat-marker sketches), GOV.UK principles ("do the hard work to make it simple") and NN/g (squint test, plan hierarchy first) give the brief -> direction -> assemble loop its early steps. [fetched]
10. **Reference libraries (Mobbin, Awwwards, Sites lists) teach by exposure, not rules.** They are best used as retrieval corpora for the "examples/" layer, with the evaluation criteria (Awwwards weights design 40, usability 30, creativity 20, content 10) as a coarse scoring prior. [fetched]

## 2. Rules

Grouped by theme. Each rule keeps the SCHEMA shape. Source tags point to section 8 entries (S-numbers).

### 2.1 Hierarchy and composition

- **RULE** Establish hierarchy with at most three size steps per view (small/medium/large) and at most two "large" elements; the most important element is the largest.
  **Why** Size is the first thing the eye ranks; too many large things cancel each other. NN/g also caps colour treatments at about four in simple UIs and three contrast treatments in complex ones.
  **Applies to** all. **Check** count distinct computed font-size bands per viewport screenshot; count elements above 1.5x body size. **Source** S1 (NN/g visual hierarchy) [fetched]

- **RULE** De-emphasise by lowering contrast or size, not by lowering font-weight below 400; keep UI weights at 400 and 500-700 for emphasis.
  **Why** Thin weights lose legibility; contrast and size are safer levers. Apple also says avoid Ultralight/Thin/Light for system text.
  **Applies to** SaaS app UI | landing page. **Check** computed `font-weight >= 400` on all text. **Source** S2 (Refactoring UI tips), S14 (Apple HIG typography), S3 (Vercel Interfaces: avoid weights below 400) [fetched]

- **RULE** Separate elements with spacing or background-tone shifts before reaching for borders; when borders are needed make them semi-transparent.
  **Why** Borders add visual noise and flatten hierarchy; the Refactoring UI headline tactic is "use fewer borders". Vercel WIG adds semi-transparent borders+shadows for crisp edges.
  **Applies to** all. **Check** ratio of bordered containers to total containers; lint for `border` on adjacent siblings that already have a gap. **Source** S2, S3 [fetched]

- **RULE** Do not put grey text on a coloured background. Use white at reduced opacity or a same-hue tint adjusted by eye.
  **Why** Grey lowers contrast on white, but on colour it looks dirty and fails contrast.
  **Applies to** all. **Check** for each text node on non-neutral background, compute hue distance between text and background; flag text with saturation <5% on background saturation >20%. **Source** S2 [fetched]

- **RULE** Group by proximity first, enclosure second: more space around groups than within them; a heading sits closer to its own content than to the previous section.
  **Why** Gestalt proximity (Laws of UX) and NN/g grouping guidance; boxes are used only when whitespace alone fails.
  **Applies to** all. **Check** gap(heading, following block) < gap(preceding block, heading) on every section. **Source** S1, S4 (Laws of UX: Proximity, Common Region) [fetched]

- **RULE** Run the squint/blur test on every composition and verify the intended focal point still wins; test with real content, not filler.
  **Why** A strong image or colour in placeholder content can silently override the planned hierarchy.
  **Applies to** all. **Check** render, gaussian-blur 8-12px, saliency-model or manual look: top-salient region equals the intended primary CTA/headline. **Source** S1 [fetched]

- **RULE** Order content by importance toward the top and leading edge; align deliberately so indentation reads as subordination; use progressive disclosure to cut initial density.
  **Why** People scan in reading order and assume aligned items are related.
  **Applies to** all. **Check** visual; also count controls visible at first paint per section. **Source** S14 (HIG Layout) [fetched]

- **RULE** On text-heavy pages put the key point in the first two paragraphs, begin headings with the most informative words, and break runs of text with lists and bolded terms.
  **Why** Users scan in F-shaped/layer-cake patterns and miss the right and lower lines.
  **Applies to** landing page | docs. **Check** first heading text begins with a noun phrase from the topic; no paragraph over ~5 lines without a structural break. **Source** S1 (NN/g F-pattern) [fetched]

### 2.2 Typography

- **RULE** Body text: 15-25 px on the web; line spacing 120-145% of font size; line length 45-90 characters (Every Layout caps the measure at 60ch as its single axiom).
  **Why** Longer lines need more leading; the eye loses its place past ~90 characters.
  **Applies to** all. **Check** computed font-size, line-height/font-size, and `ch` width of `p` (characters per line from rendered text). **Source** S5 (Practical Typography), S11 (Every Layout) [fetched]

- **RULE** Express measure in `ch` with `max-inline-size`, store it in one custom property on `:root`, and exempt layout wrappers instead of hand-classing every element.
  **Why** `ch` tracks font size so the line length stays correct under zoom; pixel widths do not.
  **Applies to** all. **Check** grep for `max-width` on text containers in px; require `ch`/`rem`. **Source** S11 [fetched]

- **RULE** Add 5-12% extra letter-spacing to all-caps and small-caps text; use all caps for less than one line.
  **Why** Capitals are designed to sit next to lowercase and look cramped when set solid.
  **Applies to** all. **Check** `text-transform: uppercase` elements have `letter-spacing >= 0.05em`. **Source** S5 [fetched]

- **RULE** Use typographic punctuation: curly quotes, real ellipsis `…`, proper dashes, non-breaking spaces in `10 MB` and `⌘ K`; headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
  **Why** Detail signals care and prevents orphans and awkward breaks.
  **Applies to** all. **Check** regex for straight quotes `"..."` in text nodes; computed `text-wrap`. **Source** S5, S3, S9 (Josh CSS reset) [fetched]

- **RULE** Use `font-variant-numeric: tabular-nums` wherever numbers update or are compared (tables, timers, prices).
  **Why** Proportional digits make columns and counters jitter.
  **Applies to** SaaS app UI. **Check** computed property on numeric table cells and live counters. **Source** S3 [fetched]

- **RULE** Pick one or two typefaces; do not use system-default Times/Arial as a design choice; avoid underline except links; never combine bold and italic.
  **Why** Typeface count and default fonts dominate the "unconsidered" look. Apple also says minimise typefaces to protect hierarchy.
  **Applies to** all. **Check** unique computed `font-family` count <= 2 (plus mono). **Source** S5, S14 (opinion in part) [fetched]

- **RULE** Platform minimums: never ship text under 11 pt/px on mobile (HIG iOS minimum 11, default 17) and keep text enlargeable to 200% without clipping.
  **Why** Legibility and low-vision support.
  **Applies to** mobile | all. **Check** computed font-size >= 11px (>=12 recommended); 200% text zoom screenshot has no overflow/clipping. **Source** S14 [fetched]

- **RULE** Mobile `<input>` font-size >= 16px; never disable zoom.
  **Why** iOS auto-zooms smaller inputs; blocking zoom harms low-vision users.
  **Applies to** mobile | forms. **Check** computed font-size on inputs; viewport meta lacks `user-scalable=no` / `maximum-scale=1`. **Source** S3 [fetched]

### 2.3 Color and contrast

- **RULE** Normal text contrast >= 4.5:1, large text (>=18pt, or bold 14pt) >= 3:1, icons and input borders >= 3:1; consider APCA as the better predictor.
  **Why** WCAG AA minimums; Vercel WIG prefers APCA, Apple lists the same AA values.
  **Applies to** all. **Check** contrast script over all text/background pairs including hover/focus states. **Source** S6 (a11yproject), S3, S14 [fetched]

- **RULE** Raise contrast on `:hover`, `:active` and `:focus` states, never lower it.
  **Why** State changes must be more visible than rest state.
  **Applies to** all. **Check** compute contrast delta per interactive state. **Source** S3 [fetched]

- **RULE** Design in grayscale first; add one accent (or one hue in several shades) with intent; define palettes in HSB/HSL (or OKLCH) rather than hex.
  **Why** Solving structure without colour exposes real hierarchy; perceptual spaces make shade ramps predictable.
  **Applies to** all. **Check** palette tokens defined as hue + ramp; count distinct hues in screenshot (<= 3 outside data viz). **Source** S2, S7 (Learn UI) [fetched]

- **RULE** Never rely on colour alone for status; pair with icon, shape or text. Use the same colour for the same meaning everywhere.
  **Why** Colour-blind users, cultural variance, and consistency of meaning.
  **Applies to** all. **Check** status components include text or glyph; one token per semantic. **Source** S14, S6 [fetched]

- **RULE** Supply light, dark and increased-contrast variants for every custom colour; set `color-scheme` and match `theme-color` to the page background; give native `<select>` explicit colours.
  **Why** Prevents mismatched browser chrome and unreadable native controls.
  **Applies to** all. **Check** `color-scheme` on `:root`; meta `theme-color` equals background token. **Source** S14, S3 [fetched]

- **RULE** Tint borders, shadows and neutral text toward the background hue instead of using pure black/grey.
  **Why** Hue-matched neutrals look intentional; pure black shadows look dirty.
  **Applies to** landing page | SaaS app UI. **Check** neutral tokens carry a non-zero chroma consistent with the brand hue. **Source** S3, S8 (Josh shadows) [fetched]

### 2.4 Spacing, layout and responsiveness

- **RULE** Treat whitespace as the default and add elements deliberately; as a starting point set spacing roughly double what looks "cramped" (examples in the source: padding equal above/below a 12px label; 15-25px between list groups).
  **Why** Default HTML is cramped; generous space is the cheapest route to "premium".
  **Applies to** all. **Check** compare padding/gap scale against a 4px/8px token ladder; flag components with padding < 0.5em. **Source** S7 (opinion; numbers are examples) [fetched]

- **RULE** Spacing comes from a single tokenised ladder; choose spacing by layout and component, not ad hoc pixels.
  **Why** Consistency is what makes a UI feel systematic (Refactoring UI, web.dev Spacing, GOV.UK).
  **Applies to** all. **Check** all margin/padding/gap computed values belong to the ladder. **Source** S2, S10 (web.dev Learn CSS), S12 (GOV.UK) [fetched]

- **RULE** Prefer flex/grid and intrinsic sizing over JS measurement; use `clamp()`, `min()`, `max()` and container queries so components respond without media queries.
  **Why** Browser algorithms are more robust than hand-tuned breakpoints; "guide the browser" is the shared thesis of Every Layout and CSS for JS Devs.
  **Applies to** all. **Check** grep for `resize` listeners and layout reads in JS; count fixed-px widths on containers. **Source** S9, S10, S11 [fetched]

- **RULE** Verify at mobile, laptop and ultra-wide (simulate ultra-wide by zooming to 50%); respect `env(safe-area-inset-*)`; kill unintended horizontal scroll.
  **Why** Layout bugs live at the extremes.
  **Applies to** all. **Check** screenshots at 375, 1440 and 2560 widths; `document.scrollingElement.scrollWidth <= innerWidth`. **Source** S3 [fetched]

- **RULE** Give truncating flex children `min-width: 0`, handle empty, short, average and very long user content, and always design empty/sparse/dense/error states.
  **Why** Most production layout bugs come from content extremes.
  **Applies to** SaaS app UI. **Check** inject 3-length fixtures and an empty array; look for clipping. **Source** S3 [fetched]

- **RULE** Use a modern reset: border-box, margin 0, body line-height 1.5, media `display: block; max-width: 100%`, form controls inherit font, `overflow-wrap: break-word`, `isolation: isolate` on the app root.
  **Why** Removes recurring surprises before design starts.
  **Applies to** all. **Check** computed values on probe elements. **Source** S9 [fetched]

- **RULE** Use `px`-free layout primitives (Stack, Sidebar, Switcher, Cluster, Cover, Center, Grid, Frame, Reel, Imposter, Box, Icon) as the layout vocabulary.
  **Why** Composable primitives make intent legible and responsive by construction.
  **Applies to** all. **Check** visual/structural: every section maps to a primitive. **Source** S11 [fetched; list of 13 verified]

### 2.5 Depth, shadows and surfaces

- **RULE** Pick one light source for the whole UI; shadow offset y ~ 2x x; scale offset+blur up and opacity down as elevation rises.
  **Why** Inconsistent light direction breaks the physical metaphor.
  **Applies to** all. **Check** parse `box-shadow` offsets: sign and ratio consistent across components. **Source** S8 [fetched]

- **RULE** Layer 3-5 shadows with doubling offsets/blur (e.g. 1, 2, 4, 8, 16px) at 0.075-0.2 opacity each; add at least two layers (ambient + direct). Tint with the background hue.
  **Why** Real shadows have soft falloff; one hard shadow looks synthetic.
  **Applies to** landing page | SaaS app UI. **Check** `box-shadow` has >= 2 comma-separated layers on elevated components. **Source** S8, S3 [fetched]

- **RULE** Define shadows as elevation tokens with a CSS variable for shadow colour so each background tints automatically.
  **Why** Keeps depth consistent across light/dark and coloured sections.
  **Applies to** all. **Check** no literal `rgba(0,0,0,...)` shadow values outside tokens. **Source** S8 [fetched]

- **RULE** Nested radii: child radius <= parent radius, ideally parent = child + padding (concentric corners).
  **Why** Mismatched corners look sloppy at a glance.
  **Applies to** all. **Check** for each nested rounded pair compute parent-radius minus padding vs child radius. **Source** S3 [fetched]

- **RULE** To push content back use blur/dim on the backdrop and stagger what appears next; give feedback nearest the trigger first.
  **Why** Choreographed layering conveys depth and focus (Rauno, Designing Depth).
  **Applies to** landing page | SaaS app UI. **Check** visual; backdrop of modal has blur or dim token. **Source** S16 (Rauno) [fetched]

- **RULE** Light comes from above: tops of raised elements lighter, bottoms darker; inset elements (inputs, pressed buttons) invert.
  **Why** Cheap, strong affordance cue.
  **Applies to** SaaS app UI. **Check** visual. **Source** S7 (opinion; Learn UI) [fetched]

### 2.6 Motion

- **RULE** Animate only with purpose: to explain cause and effect, show spatial relationships, or add deliberate delight. Otherwise do not animate.
  **Why** Gratuitous motion distracts (Apple) and slows the product (Emil).
  **Applies to** all. **Check** each animation in code has a stated purpose comment/token (process rule). **Source** S13 (Emil), S14 (HIG Motion) [fetched]

- **RULE** The more often an interaction occurs, the less it should animate; never animate keyboard-triggered actions or high-frequency surfaces (command menus, context menus, list edits).
  **Why** Repetition turns charm into delay. Rauno removed motion from a frequently used tool and felt faster.
  **Applies to** SaaS app UI. **Check** list of animated components minus frequency table; keyboard-open menus have `transition: none`. **Source** S13, S16, S14 [fetched]

- **RULE** UI transitions run under 300ms (Emil: ~180ms feels better than 400ms for a select; Vercel Interfaces: under 200ms for interactions; exits slightly faster than entrances; scale duration with distance).
  **Why** Short motion reads as responsiveness.
  **Applies to** SaaS app UI | landing page (marketing may run longer). **Check** parse `transition-duration`/`animation-duration`; flag > 300ms on interaction components. **Source** S13, S16 [fetched]

- **RULE** Use ease-out for entering elements; ease-in only for elements that leave the screen; ease-in-out for looping motion; prefer custom ease-out curves over built-in CSS ones.
  **Why** Ease-out front-loads movement, so the UI responds sooner for the same duration.
  **Applies to** all. **Check** classify easing by property context. **Source** S13, S8b (Josh transitions) [fetched]

- **RULE** Button press: scale to about 0.96-0.97 on `:active`. Entering elements start at scale ~0.9-0.95 or higher, not 0 (dialog example from Vercel Interfaces starts near 0.8).
  **Why** Things in the real world do not materialise from nothing; subtle press scale confirms input.
  **Applies to** SaaS app UI. **Check** `:active` transform on buttons; any `scale(0)` start is a failure. **Source** S13, S16 [fetched]

- **RULE** Set `transform-origin` to the trigger (origin-aware popovers) so motion starts where it physically belongs.
  **Why** Spatial consistency.
  **Applies to** SaaS app UI. **Check** popover transform-origin not `center` when anchored. **Source** S13, S3 [fetched]

- **RULE** Tooltips: keep the first-hover delay, but open neighbouring tooltips instantly (0 ms) once one is open.
  **Why** Prevents accidental triggers without making scanning slow.
  **Applies to** SaaS app UI. **Check** second-tooltip transition-duration 0. **Source** S13, S3 [fetched]

- **RULE** Animate only `transform` and `opacity`; never `transition: all`; list properties explicitly; use `will-change` sparingly; prefer CSS, then WAAPI, then JS libraries.
  **Why** Compositor-only properties avoid layout and paint; `transition: all` animates unintended changes.
  **Applies to** all. **Check** grep for `transition: all` and for transitions on `width|height|top|left`. **Source** S3, S8b [fetched]

- **RULE** Honour `prefers-reduced-motion` with a reduced variant or none; keep essential motion but slow or simplify it; any motion over 5 s alongside content needs pause/stop controls; at most 3 flashes per second.
  **Why** Vestibular and seizure safety (WCAG 2.2.2, 2.3.1, 2.3.3).
  **Applies to** all. **Check** media query present in CSS for every animation; flash analysis. **Source** S3, S6, S14 [fetched]

- **RULE** Make gestures and animations interruptible and retargetable: prefer CSS transitions (retargetable) over keyframes for state-driven motion; model springs with damping (start at 100% damping, lower to ~80% only when the gesture carries momentum) rather than fixed durations.
  **Why** Seamless motion never snaps; bounce only fits momentum.
  **Applies to** mobile | SaaS app UI. **Check** rapid-toggle test: trigger twice within 100 ms, no jump. **Source** S15 (WWDC18 803), S13 (Sonner) [fetched]

- **RULE** Gesture dismissal: decide on distance OR velocity threshold (flicks work over short distance), apply drag directly to transform, damp (rubber-band) beyond limits, ignore extra touches, and only let drawers drag when inner content is scrolled to top (100 ms lockout).
  **Why** Matches native expectations; prevents accidental close.
  **Applies to** mobile. **Check** manual gesture test. **Source** S13 (Sonner, Vaul posts) [fetched]

- **RULE** Auto-dismissing toasts last ~4 s, pause on hover and when the tab is hidden.
  **Why** Users must not miss messages left in background tabs.
  **Applies to** SaaS app UI. **Check** timer logic uses `visibilitychange`/hover. **Source** S13 [fetched]

- **RULE** Stagger sibling reveals with small offsets and trigger the element nearest the input first.
  **Why** Staggering reads as natural and layered without lengthening total time.
  **Applies to** landing page | SaaS app UI. **Check** nth-child delay increments small (tens of ms). **Source** S16 [fetched]

- **RULE** Blur ~2px during crossfades can hide the seam when states don't align; use it as a last resort. Large blur values are expensive; prefer radial gradients.
  **Why** Perceptual smoothing vs GPU cost.
  **Applies to** all. **Check** `filter: blur()` radius and area. **Source** S13, S16b (interfaces.rauno.me) [fetched]

- **RULE** Do not animate theme switches; use skeletons that mirror final layout; pause looping animations off-screen.
  **Why** Theme flashes are disorienting; skeleton shift causes CLS; off-screen loops waste battery.
  **Applies to** all. **Check** `IntersectionObserver` pause on loops. **Source** S16b, S3 [fetched]

### 2.7 Interaction, forms and feedback

- **RULE** Interactive hit targets >= 24px (WCAG-class) and 44px on mobile (Apple default 44x44 pt, minimum 28x28; WCAG 2.5.5 AAA is 44x44 CSS px); expand hit areas rather than enlarging visuals; space adjacent targets.
  **Why** Fitts's law and motor accuracy; spacing matters as much as size.
  **Applies to** mobile | all. **Check** bounding-box width/height of every interactive element incl. pseudo-expansions. **Source** S3, S14, S6, S4 [fetched]

- **RULE** Responses: under 0.1 s feels instant (no extra feedback), up to 1 s keeps flow (show activity cue if slower), up to 10 s needs progress and cancel. Doherty threshold ~400 ms. Show loaders after a 150-300 ms delay and keep them for 300-500 ms minimum to avoid flicker.
  **Why** Human perception limits, not implementation.
  **Applies to** SaaS app UI. **Check** instrumented timings; loader timing constants. **Source** S1 (NN/g response times), S4, S3 [fetched]

- **RULE** Forms: Enter submits; textarea submits on Cmd/Ctrl+Enter; never block paste; keep submit enabled until request starts, then show spinner and keep the label; validate after typing, show inline errors beside fields, focus the first error on submit.
  **Why** Avoids dead ends and lost input.
  **Applies to** forms. **Check** e2e script: Enter submit, paste, error focus. **Source** S3 [fetched]

- **RULE** Every input has a programmatically associated label, correct `type`, `autocomplete`, `name`, and `inputmode`; errors link via `aria-describedby`; placeholders show example patterns, not labels; disable spellcheck for emails/codes.
  **Why** Autofill, assistive tech and mobile keyboards depend on them.
  **Applies to** forms. **Check** axe + attribute lint. **Source** S3, S6 [fetched]

- **RULE** Use optimistic UI with rollback or Undo; confirm destructive actions or offer an Undo window; warn before losing unsaved changes.
  **Why** Perceived speed and reversibility (Nielsen: user control and freedom, error prevention).
  **Applies to** SaaS app UI. **Check** destructive buttons route to confirm or undo toast. **Source** S1 (heuristics 3, 5), S3 [fetched]

- **RULE** URL reflects state (filters, tabs, pagination, expanded panels); navigation uses real `<a href>`; Back restores scroll; if it looks clickable it must be clickable.
  **Why** Deep-linking, middle-click and trust.
  **Applies to** SaaS app UI. **Check** no `div onClick` navigation; link `href` present. **Source** S3, S17 (Roselli decision path) [fetched]

- **RULE** Feedback appears near the trigger (inline checkmark after copy, field highlight for invalid input); empty states prompt creating the first item.
  **Why** Proximity of cause and effect.
  **Applies to** SaaS app UI. **Check** visual. **Source** S16b [fetched]

- **RULE** Nested menus use a prediction cone so diagonal pointer movement does not close the submenu; open dropdowns on `mousedown`; support arrow-key navigation in lists.
  **Why** Prevents frustrating menu loss; speeds access.
  **Applies to** SaaS app UI. **Check** manual diagonal-move test. **Source** S16b [fetched]

- **RULE** Delight scales inversely with frequency: rarely used features get elaborate touches, frequent ones get subtle ones; keep persistent elements consistent rather than duplicated; use motion to show where the user is and is going.
  **Why** Prevents delight fatigue; keeps spatial model coherent.
  **Applies to** all. **Check** visual/process. **Source** S18 (Benji Family Values) [fetched]

### 2.8 Accessibility and semantics

- **RULE** Prefer native elements (`button`, `a`, `label`, `table`, `dialog`) over ARIA; use `<a href>` to navigate, `<button type=button>` to change the page, submit for forms; never `div`/`span` as controls.
  **Why** Native semantics bring keyboard and AT behaviour for free.
  **Applies to** all. **Check** lint: interactive handlers on non-interactive elements. **Source** S17, S6, S3 [fetched]

- **RULE** Keep a visible `:focus-visible` ring on every focusable element (never `outline: none` without replacement); focus order matches visual order; no positive `tabindex`; provide a skip link; trap, move and return focus for dialogs.
  **Why** Keyboard users must see where they are.
  **Applies to** all. **Check** tab through page; computed focus outline; axe. **Source** S6, S3, S17 [fetched]

- **RULE** One `h1` per page, no skipped heading levels, unique `<title>` and `lang` on `<html>`, landmarks (`nav`, `main`), `alt` on every image (empty for decorative).
  **Why** Navigation by structure for AT and SEO.
  **Applies to** all. **Check** DOM lint. **Source** S6, S3 [fetched]

- **RULE** Icon-only buttons need an accessible name; do not rely on tooltips for essential info and do not attach tooltips to disabled buttons.
  **Why** Unlabelled icons are unusable by AT; disabled elements are unfocusable.
  **Applies to** all. **Check** each `button` has text content or `aria-label`. **Source** S3, S16b, S6 [fetched]

- **RULE** Cards/rows with whole-region click targets must still expose one real link; don't convert tables to ARIA grids just for clickable rows.
  **Why** Preserves link semantics and table navigation.
  **Applies to** SaaS app UI. **Check** each clickable card has exactly one `<a>` anchor. **Source** S17 [fetched via search snippets; verify at source]

- **RULE** Error messages state the problem in plain language and a fix; no dead ends; always offer a next step.
  **Why** Heuristic 9 and Vercel copy guidance.
  **Applies to** all. **Check** copy lint for "Something went wrong" without action. **Source** S1, S3 [fetched]

### 2.9 Process, systems and taste

- **RULE** Write design principles that are specific enough to settle disagreements, and document them with the pattern/component they govern; grow the system alongside the product instead of building it all up front.
  **Why** Vague principles ("be simple") do not constrain decisions.
  **Applies to** all (engine process). **Check** each principle has a testable example. **Source** S19 (Kholmatova, Smashing page), S12 [fetched for existence; deeper content [engine note]]

- **RULE** Encode taste as strict, numeric, decision-flow rules (e.g. easing chosen by enter/exit/move/hover; durations by element type) and let the agent critique its own output against them.
  **Why** Strictness gives consistency; articulated reasons transfer.
  **Applies to** engine. **Check** every skill rule has a numeric or flowchart form. **Source** S13 (Agents with Taste) [fetched]

- **RULE** Before designing, state the appetite (time budget), the elements/affordances (breadboard) and a fat-marker layout; shape solutions that are rough, solved and bounded.
  **Why** Structure before pixels avoids polishing the wrong thing.
  **Applies to** engine process. **Check** brief contains appetite + affordance list before direction step. **Source** S20 (Shape Up) [fetched]

- **RULE** Do the hard work to make it simple; be consistent, not uniform (shared patterns, flexible application); iterate with real users early.
  **Why** Simplicity is an output of effort; rigid uniformity harms context fit.
  **Applies to** all. **Check** process. **Source** S12 (GOV.UK principles) [fetched]

- **RULE** Study excellent work analytically: ask why a detail works, then copy the mechanism not the pixels; pair exposure to references with making things.
  **Why** Judgment is built by explanation plus practice.
  **Applies to** engine ingestion. **Check** every `examples/` entry has a "why" field. **Source** S13 (Developing Taste), S16 [fetched]

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Body font size (web) | 15-25 px | Practical Typography (S5) |
| Line height | 120-145% | S5; Josh reset says 1.5 for body (S9) |
| Line length | 45-90 chars; 60ch cap (Every Layout) | S5, S11 |
| Caps letter-spacing | +5-12% | S5 |
| First-line indent | 1-4x font size, or 4-10 pt paragraph space, not both | S5 |
| Heading/body sizes (NN/g) | body 14-16 px, subheads 18-22 px, headers up to 32 px | S1 |
| Apple default / minimum text | iOS 17/11 pt, macOS 13/10, tvOS 29/23, visionOS 17/12, watchOS 16/12 | S14 |
| Apple control size | iOS 44x44 default, 28x28 min; macOS 28x28 / 20x20 | S14 |
| Text enlargement support | at least 200% (140% watchOS) | S14 |
| Contrast | 4.5:1 normal, 3:1 large/bold, 3:1 icons + input borders | S6, S14 |
| Hit target | >= 24 px desktop, 44 px mobile | S3 |
| Mobile input font | >= 16 px | S3 |
| Response time limits | 0.1 s / 1 s / 10 s | S1 |
| Doherty threshold | ~400 ms | S4 |
| Loader show delay / min visible | 150-300 ms / 300-500 ms | S3 |
| Mutation budget | < 500 ms | S3 |
| UI animation duration | < 300 ms (Emil); < 200 ms interactions (Vercel Interfaces) | S13, S16b |
| Hover enter/exit example | 125 ms in, 450 ms out (Josh) | S8b |
| Button press scale | 0.96-0.97 | S13, S16b |
| Start scale for entrances | 0.9-0.95+, dialogs from ~0.8 | S13, S16b |
| Tooltip transition example | 125 ms ease-out, start/end scale 0.97; follow-up tooltips 0 ms | S13 |
| Toast auto-dismiss | ~4 s, pause on hover and hidden tab; enter ~400 ms | S13 |
| Gesture hysteresis | ~10 pt before swipe begins | S15 |
| Spring defaults | damping 100% for taps; ~80% for momentum gestures | S15 |
| Material 3 durations (ms) | short 50/100/150/200; medium 250/300/350/400; long 450/500/550/600; extra-long 700/800/900/1000 | S21 (material-web tokens) |
| Material 3 easings | standard cubic-bezier(0.2,0,0,1); standard-accelerate (0.3,0,1,1); standard-decelerate (0,0,0,1); emphasized-accelerate (0.3,0,0.8,0.15); emphasized-decelerate (0.05,0.7,0.1,1); legacy (0.4,0,0.2,1) | S21 |
| Shadow layering | 3-5 layers, doubling offsets (1,2,4,8,16 px), 0.075-0.2 opacity each; y offset ~2x x | S8 |
| Virtualise lists | > 50 items | S3 |
| Reading-level for plain language | ~8th grade (AAA 3.1.5) | S6 |
| Awwwards weights | design 40 / usability 30 / creativity 20 / content 10; 18+ jurors, 3 outliers dropped; Honorable Mention at 6.5+; developer award at 7+ | S22 |
| Custom easing budget | if custom curves exceed ~20% of animations, expand tokens | S8b |

## 4. Dos and Don'ts

- **Do** use `0 1px 2px` for a flat card shadow and larger offset/blur/lower opacity for a raised card; **Don't** use one `0 0 20px #000` blob (looks grey and unrealistic). (S8)
- **Do** grow a toast from 100% off-screen via CSS transition; **Don't** use keyframes if rapid additions must retarget mid-motion. (S13)
- **Do** let a fast flick close a drawer even if the drag distance is small; **Don't** decide purely on position. (S13, S15)
- **Do** show a 150-300 ms-delayed spinner that stays at least 300-500 ms; **Don't** flash a loader for a 50 ms request. (S3)
- **Do** use `text-wrap: balance` on headings; **Don't** leave a one-word last line. (S9, S3)
- **Do** use `<a href>` for navigation (middle-click works); **Don't** use `div onClick`. (S3, S17)
- **Do** write placeholders as example patterns ending in an ellipsis; **Don't** use placeholders as labels. (S3)
- **Do** pair colour status with an icon or text; **Don't** show red/green dots alone. (S14, S6)
- **Do** scale hierarchy with size and contrast; **Don't** make everything bold. (S1, S2)
- **Do** keep a 4.5:1 minimum for body text on tinted surfaces; **Don't** use light grey on white for secondary text without measuring. (S6)

## 5. Exceptions & judgement calls

- **Animation duration ceiling.** Emil says under 300ms; Vercel Interfaces under 200ms for interactions; Material allows up to 1000 ms tokens for large transitions. Resolution: tie duration to element size and travel distance (small controls 100-200 ms, panels/drawers 250-400 ms, page-level or marketing up to ~600+). Emil himself excludes marketing sites from the speed rule. [fetched + engine note]
- **Entering-scale start.** Emil: ~0.9-0.95; Vercel Interfaces: dialogs from ~0.8. Both agree "not 0". Choose by element size: larger surfaces tolerate a bigger scale jump.
- **Shadows vs borders.** Refactoring UI says prefer shadows/space to borders; Vercel WIG likes semi-transparent border + shadow combos; dense data UIs (tables, dashboards) often still need hairlines. Use borders when a shared edge carries meaning (table rows) and zero fill contrast exists.
- **Hit target size.** Vercel says 24 px (WCAG 2.2 AA), Apple says 28-44 pt, WCAG AAA says 44 px. Use 44 for touch-primary and 24-32 for dense pointer UIs, with spacing compensation.
- **Contrast model.** WCAG 2 ratios are mechanical; APCA (preferred by Vercel) is more perceptual but not yet a legal standard. Use WCAG as the gate, APCA as a second opinion for thin/light type.
- **"Double your whitespace" (opinion).** Learn UI's numbers are illustrative; denser apps (Linear-like tooling) deliberately run tighter than marketing pages. The rule is "never accidentally cramped", not "always airy".
- **Frequency rule vs delight.** Pure speed advocates (remove all motion from high-frequency actions) clash with brand-heavy products that use motion as identity. Resolve per surface: identity motion on first-run and rare moments, none on repeated actions.
- **Creative-dev showpieces (Awwwards/FWA).** Heavy WebGL and scroll-jacking score well with juries (design 40%) but often fail Vercel/WCAG norms (reduced motion, performance). Use them as ambition references, not as defaults. [engine note]
- **Laws of UX caveat.** Many "laws" (Miller's 7+-2, Hick's) are descriptive heuristics from lab settings; use as sanity checks, not hard constraints. [engine note]
- **Tone of Vercel copy rules.** Title Case buttons are Vercel house style, not a universal rule; sentence case is common elsewhere. Treat as brand-specific. (S3)

## 6. Figures worth keeping

Not applicable to a web digest (no PDF pages). Candidate screenshots for `examples/` when the sources are visited:
- S11 Every Layout: the Stack/Sidebar/Switcher diagrams.
- S8 Josh Comeau "Designing Beautiful Shadows": the elevation ramp interactive.
- S16 Rauno "Designing Depth": the iOS search blur-sequence frames.
- S9 `interfaces.rauno.me`: the prediction-cone diagram.
- S2 Refactoring UI: before/after tweak images from the Medium tips article.

## 7. Open questions

- **Not reachable or not found by tooling:** Julian Shapiro's design material (julian.com lists only writing/health/startup guides; no design guide found); Dan Hollick (searches returned nothing relevant, the `designingdan.com` hit is a different person) - re-search with the exact handle or product name before ingesting; Brian Lovin's writing titles (site exposes `/writing` and RSS but no titles surfaced); Codrops (403 to fetcher); Kevin Powell YouTube (consent redirect); Apple HIG HTML pages (JS-rendered; JSON endpoints worked).
- **Verify before relying:** Roselli's decision rules and "clickable region" guidance come from search snippets, not a full page read. Alla Kholmatova's book content beyond the publisher blurb is [engine note]. Krug's trunk test, Norman's discoverability/constraints detail, Cooper's four postures beyond what was surfaced are [engine note] or secondary-source.
- **Licensing:** exact licences for web.dev (believed CC BY 4.0 for content), a11yproject (believed MIT), Apple HIG (no open licence; use for private study only) need confirming in the ingestion step.
- **Price data may be stale:** course prices were read 2026-10-08 and change per enrolment cycle (animations.dev enrolment currently closed, next window expected 2027).
- **Contradiction to resolve:** Vercel WIG (AGENTS.md) says dialogs fade in from about 0.8 scale while Emil recommends ~0.9-0.95; settle by testing.
- **Does Laws of UX have a named author?** The fetched page did not show one (the book is Jon Yablonski's per my memory [engine note]).

## 8. Source-by-source digest

Rating scale: A+ = ingest first, rules are numeric and widely verified; A = high value; B = useful but opinion/narrow; C = low signal or inaccessible. "Free text?" = full text legally readable online without payment.

### S1 - Nielsen Norman Group (NN/g) articles + 10 Usability Heuristics
- **URL** https://www.nngroup.com/articles/ten-usability-heuristics/ , also /response-times-3-important-limits/ , /visual-hierarchy-ux-definition/ , /f-shaped-pattern-reading-web-content/ , /usability-101-introduction-to-usability/
- **Format** Articles (research-backed), plus paid reports and training. **Audience** designers, PMs, researchers; beginner to advanced.
- **Heuristics (paraphrased)** 1 show system status; 2 match the real world; 3 give user control and an exit; 4 be consistent with platform and industry standards; 5 prevent errors; 6 recognition over recall; 7 offer shortcuts for experts; 8 minimalist design; 9 help users diagnose and recover from errors; 10 help and documentation when needed. Original 1994 (Nielsen, with Molich 1990), refreshed 2020; stable since.
- **Top transferable principles** (a) 0.1/1/10 s response limits; (b) hierarchy is contrast, not hue, cap colours ~4 and contrast treatments at 3 in complex UIs; (c) three sizes, at most two large elements; (d) proximity/enclosure for grouping; (e) squint test; (f) F-pattern: key info early, informative first words, lists and bold; (g) descriptive links; (h) recognition over recall; (i) error messages with fix; (j) test across sizes since reading flow changes.
- **Free text?** Articles are free to read; NOT licensed for redistribution. Ingest summaries only; paraphrase. **Rating** A (heuristics and response-time limits A+; research-methods articles C for this engine).

### S2 - Refactoring UI (Adam Wathan, Steve Schoger)
- **URL** https://www.refactoringui.com/ ; free sample tips at https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886 (fetch returned 403; tips known via search snippets)
- **Format** 218-page PDF book + 3 videos + component gallery, palettes, fonts, icons ($99 Essentials / $149 Complete as listed; 60-day refund). Chapters: Starting from Scratch; Hierarchy is Everything; Layout and Spacing; Designing Text; Working with Color; Creating Depth; Working with Images; Finishing Touches; Leveling Up. **Audience** developers who design.
- **Transferable principles** use fewer borders; hierarchy via size/weight/colour with contrast as the lever; do not use thin weights, de-emphasise via colour or size; no grey text on colour; add vertical offset to shadows rather than bigger blur; establish type scale and spacing ladder up front; shadows express elevation; treat labels as last resort; HSL over hex; limit choices with systems (palette, scale); start with a feature, not a layout; design in grayscale; finishing touches (accent borders, backgrounds, empty states).
- **Free text?** No (paid). Free: Medium tips + public Twitter threads. **Rating** A+ for the tactics; ingestion limited to our own paraphrase of purchased material if the founders own it.

### S3 - Vercel Web Interface Guidelines (and Rauno's interfaces.rauno.me, see S16b)
- **URL** https://github.com/vercel-labs/web-interface-guidelines ; raw: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/AGENTS.md ; ships a `web-design-guidelines` skill. MIT licensed, ~950 stars.
- **Format** Checklist (rules), framework-agnostic with some React/Next. **Audience** front-end engineers and agents.
- **Principles** (see section 2) keyboard + focus-visible; 24/44 px targets; 16 px mobile inputs; form behaviour; URL as state; optimistic UI; compositor-only animation; reduced motion; explicit transitions; ellipsis and curly quotes; tabular nums; layered shadows; nested radii; APCA; color-scheme; virtualise > 50; CLS-safe images; skeletons mirror content; copywriting voice rules (active, numerals, 0 or 2 decimals).
- **Free text?** YES, MIT. **Rating** A+ (most directly checkable of everything surveyed).

### S4 - Laws of UX (Jon Yablonski) 
- **URL** https://lawsofux.com/ (30 laws), https://lawsofux.com/llms.txt (exists per page).
- **Format** Curated reference site + book. **Audience** designers and product people, beginner.
- **Laws** Aesthetic-Usability, Choice Overload, Chunking, Cognitive Bias, Cognitive Load, Doherty Threshold (~400 ms), Fitts's, Flow, Goal-Gradient, Hick's, Jakob's, Common Region, Proximity, Prägnanz, Similarity, Uniform Connectedness, Mental Model, Miller's (7 plus/minus 2), Occam's Razor, Paradox of the Active User, Pareto, Parkinson's, Peak-End, Postel's, Selective Attention, Serial Position, Tesler's, Von Restorff, Working Memory, Zeigarnik.
- **Most transferable** proximity/common region/similarity for grouping; Fitts for target size and placement; Hick for menu size and choice reduction; Jakob for convention; Doherty for response speed; Peak-End for onboarding and completion moments; Von Restorff for a single highlighted CTA; Postel for forms (accept varied input); Tesler for moving complexity not deleting it.
- **Free text?** YES to read (copyright held by site; confirm licence before bulk ingest). **Rating** A (breadth and clarity; shallow on evidence; see exceptions).

### S5 - Practical Typography (Matthew Butterick)
- **URL** https://practicaltypography.com/ ; summary https://practicaltypography.com/summary-of-key-rules.html
- **Format** Free web book (pay-what-you-like), plus fonts. **Audience** anyone who sets text; beginner to intermediate. [Authorship attribution is from memory; page content fetched.]
- **Principles** point size 15-25 px web (10-12 pt print); line spacing 120-145%; line length 45-90 chars; caps +5-12% tracking; first-line indent OR paragraph space, not both (indent 1-4x size, space 4-10 pt); pick a professional font, avoid defaults like Times New Roman/Arial; curly quotes; one space after a period; no multiple spaces; no underlining except links; no bold+italic; centred text sparingly; hyphenate justified text; real small caps only; keep kerning on; proper dashes, ellipses and symbols.
- **Free text?** YES to read. Copyrighted; ingest as own-words notes plus short quotes. **Rating** A+.

### S6 - The A11Y Project checklist + WCAG-based guidance
- **URL** https://www.a11yproject.com/checklist/
- **Format** Checklist mapped to WCAG levels. **Audience** developers/designers.
- **Principles** plain language; descriptive link/button text; `lang`, unique `title`; don't disable zoom; landmarks; logical focus order, no positive tabindex; visible focus; one `h1`, no skipped levels; alt rules; semantic buttons/links; skip link; table markup; form labels, fieldset/legend, autocomplete, linked errors; no autoplay; captions; <= 3 flashes/s; reduced motion; contrast 4.5/3/3; avoid horizontal scroll; 44 px (AAA); allow all orientations.
- **Free text?** YES. **Rating** A+.

### S7 - Learn UI Design / Erik D. Kennedy
- **URL** https://www.learnui.design/blog/ ; https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html
- **Format** Free blog + free tools + paid courses (Learn UI Design, Learn UX Design, Landing Page Academy); newsletter ~60k readers per site. **Audience** self-taught designers, devs.
- **Principles** light comes from above; design in black and white first; double your whitespace; HSB colour thinking; accessible colour generator; font size guides for iOS/Material/web; font pairing steps.
- **Free text?** blog free to read; not licensed for reuse. **Rating** B+ (accessible, some opinion; numbers are illustrative).

### S8 - Josh W. Comeau: CSS for JS Devs, Whimsical Animations, blog
- **URLs** https://css-for-js.dev/ ; https://whimsy.joshwcomeau.com ; https://www.joshwcomeau.com/ ; articles: /css/designing-shadows/ , /animation/css-transitions/ (S8b) , /css/custom-css-reset/ (S9) , /animation/linear-timing-function/ , /css/interactive-guide-to-flexbox/ , /css/interactive-guide-to-grid/ , /css/header-blockers/ , /css/starting-style/ , /animation/squash-and-stretch/ , /animation/scroll-driven-animations/ , /svg/interactive-guide-to-paths/
- **CSS for JS Devs** modules 0-9: fundamentals; rendering logic I (cascade, box model, flow); rendering logic II (positioning, stacking, overflow); component architecture; flexbox; responsive + functional CSS (calc/clamp/variables); typography and images; grid; animation and interaction; little big details (gradients, shadows, clipping, filters). ~200 lessons, ~40 h, tiers Basic/Pro/Ultimate, lifetime access, 30-day refund. Core framing: CSS is an implicit language; learn layout algorithms, not properties.
- **Whimsical Animations** parts: particle effects; SVG magic; advanced interactions (cursor, scroll, View Transitions); Canvas. Basic $299 / Pro $449 / Ultimate $649 (as listed). Principles: animation must improve UX, be accessible, fit orchestration and respond to user action.
- **Blog principles** one light source and layered tinted shadows with elevation tokens; ease-out in, ease-in out, ease-in-out for loops; transform/opacity only; avoid `transition: all`; separate hover trigger from moving element; delay close for diagonal pointer paths; `will-change` sparingly; reduced-motion; `linear()` for springs with fallback; reset rules (border-box, 1.5 line-height, `text-wrap: balance/pretty`, `isolation: isolate`).
- **Free text?** Blog YES (read free; copyright Josh); courses paid. **Rating** A+ (courses A+ for CSS-mechanics learners; blog A+).

### S9 - (reset article above; see S8)

### S10 - web.dev Learn (Chrome team): Learn CSS (39 articles), Learn Accessibility (21 modules), Learn Design / Responsive (17 modules), Learn Forms, Images, Performance
- **URL** https://web.dev/learn/css , /learn/accessibility , /learn/design , /learn/forms , /learn
- **Format** Free text courses with quizzes and badges. **Audience** beginners to intermediate devs.
- **Principles** cascade/specificity/inheritance; logical properties; custom properties; spacing choice by layout; focus management; z-index/stacking; anchor positioning; popover and dialog; View Transitions; container queries; ARIA vs native HTML; contrast palettes; reduced motion; responsive images; theming; interaction across mouse/keyboard/touch.
- **Free text?** YES (content believed CC BY 4.0, verify). **Rating** A (breadth, current, authoritative; less taste, more mechanics). Chrome Developers CSS/UI hub: https://developer.chrome.com/docs/css-ui (new APIs: anchor positioning, animate to auto, `text-wrap`, wide-gamut colour, scroll-driven animations, `linear()`).

### S11 - Every Layout (Heydon Pickering, Andy Bell)
- **URL** https://every-layout.dev/ ; free: https://every-layout.dev/rudiments/axioms/ plus Stack, Sidebar, Switcher chapters.
- **Format** Paid ($69 as listed) site + EPUB + custom-element components; 13 layouts: Stack, Box, Center, Cluster, Sidebar, Switcher, Cover, Grid, Frame, Reel, Imposter, Icon, Container. Third edition. **Audience** CSS-fluent devs.
- **Principles** set axioms (e.g. 60ch measure); guide the browser; tolerances not fixed sizes; `ch` over px; apply rules through selectors; exception-based styling; centralise values; composite layouts inherit; embrace emergent results.
- **Free text?** Partial (rudiments + 3 layouts). **Rating** A.

### S12 - GOV.UK Design System and Design Principles
- **URL** https://design-system.service.gov.uk/ ; https://www.gov.uk/guidance/government-design-principles ; source repo alphagov/govuk-design-system on GitHub.
- **Format** Component/pattern library with research notes; Open Government Licence v3 for most content. **Audience** service teams; all levels.
- **Principles (11)** start with user needs; do less; design with data; do the hard work to make it simple; iterate; for everyone; understand context; build services not websites; consistent not uniform; open; minimise environmental impact. System sections: Styles, Components, Patterns (names, addresses, accounts); accessibility core.
- **Free text?** YES under OGL v3. **Rating** A (patterns: forms and errors are best-in-class).

### S13 - Emil Kowalski: animations.dev, emilkowal.ski essays, Sonner, Vaul
- **URLs** https://animations.dev/ ; https://emilkowal.ski/ui/you-dont-need-animations ; /7-practical-animation-tips ; /developing-taste ; /agents-with-taste ; /building-a-toast-component ; /building-a-drawer-component ; /the-magic-of-clip-path ; /train-your-judgement ; /friction-as-a-feature
- **animations.dev** interactive video course (enrolment closed; next window expected 2027; 15 AI skills included): animation theory (easing, springs, timing, purpose, taste), CSS animations, Motion (ex Framer Motion), good vs great animations, walkthroughs (Family drawer, Dynamic Island, nav menu, SVG).
- **Principles** purpose; frequency; speed < 300 ms; button press 0.97; no scale(0) start (~0.9+); tooltip delay then instant; ease-out for enter/exit with custom curves; origin-aware popovers; ~2px blur to mask crossfade seams; CSS transitions for retargetable motion; momentum and velocity dismissal; damping/rubber-banding; pause timers when hidden; drag only at scroll top; taste is trained and explainable; write strict agent skills with flowcharts and numbers.
- **Free text?** Essays YES (read); course paid. **Rating** A+ (closest to our thesis; also available as the installed `emil-design-eng` skill in this environment).

### S14 - Apple Human Interface Guidelines (Foundations)
- **URL** https://developer.apple.com/design/human-interface-guidelines/ ; machine-readable JSON (worked): https://developer.apple.com/tutorials/data/design/human-interface-guidelines/{typography|color|layout|motion|accessibility|materials|foundations}.json . Foundations index: Accessibility, App icons, Branding, Color, Dark Mode, Icons, Images, Immersive experiences, Inclusion, Layout, Materials, Motion, Privacy, Right to left, SF Symbols, Spatial layout, Typography, Writing.
- **Format** Documentation by platform. **Audience** Apple-platform designers, but the foundations transfer.
- **Principles** default/minimum text sizes table; avoid light weights; minimise typefaces; text styles form hierarchy; support Dynamic Type/200% enlarge; colour consistency of meaning, light/dark/increased-contrast variants, do not rely on colour alone, avoid hard-coding values, test outdoors; layout: importance order, alignment+indentation, group, progressive disclosure, differentiate controls from content, adapt to size classes/text size/locale; motion: purposeful, optional, realistic and brief feedback, avoid on frequent interactions, let people cancel; accessibility: 44x44 default control (28x28 min), spacing as important as size, AA ratios, VoiceOver, reduce motion.
- **Free text?** Free to read; Apple retains copyright and no open licence. Ingest only for private study with attribution. **Rating** A+ (authority, tables of numbers). Related: WWDC18 "Designing Fluid Interfaces" (S15).

### S15 - Apple WWDC18 "Designing Fluid Interfaces"
- **URL** https://developer.apple.com/videos/play/wwdc2018/803/
- **Format** 30-ish min talk with transcript. **Audience** interaction designers and engineers.
- **Principles** responsiveness; interruptibility; spatial consistency; hinting; lightweight input, amplified output; rubber-banding; smooth frames (motion blur/stretch); behaviour-driven motion; springs via damping and response (start at 100% damping); projection from velocity and deceleration rate; ~10 pt hysteresis; parallel gesture recognition; teach gestures with cues; prototype interactively.
- **Free text?** Free transcript; copyright Apple. **Rating** A+.

### S16 - Rauno Freiberg: craft pieces, Devouring Details
- **URLs** https://rauno.me/craft ; /craft/invisible-details-of-interaction-design ; /craft/designing-depth ; https://devouringdetails.com/ ; https://interfaces.rauno.me/ (S16b)
- **Format** Essays and prototypes free; Devouring Details ($249 listed; 23 chapters with React components; Principles: inferring intent, metaphors, ergonomics, physics, choreography, responsive interfaces, contained gestures, inspiration). **Audience** design engineers.
- **Principles** respond to intent; metaphors; physics and interruptibility; destructive actions fire at gesture end; apply input directly and animate on threshold; spatial origin; frequency and novelty; Fitts's corners; support obscured content; preserve state; depth: layer ambient elements, blur for depth of field, choreograph sequences, trigger nearest element first, stagger siblings.
- **S16b interfaces.rauno.me** a living checklist: label click focuses input; form wrapper for Enter; no animated theme switches; interaction animation < 200 ms; dialogs from ~0.8 scale; buttons shrink to ~0.96 on press; skip animation for frequent actions; pause off-screen loops; hover only on hover-capable devices; 16 px inputs; no tooltips on disabled buttons; box-shadow focus rings (outline ignores radius in older engines); prediction cone; optimistic updates; `::selection`; feedback near trigger; empty states prompt creation.
- **Free text?** Essays and checklist YES to read (attribution). **Rating** A+.

### S17 - Adrian Roselli (adrianroselli.com), Inclusive Components (Heydon Pickering), Resilient Web Design (Jeremy Keith)
- **URLs** https://adrianroselli.com ; https://inclusive-components.design/ ; https://resilientwebdesign.com/
- **Roselli** blog; decision path: URL change = `<a href>`, page-state change = `<button>`, submit = submit control; define `:focus` wherever `:hover` is; avoid ARIA grids for clickable table rows; card/block-link guidance; link target warnings; file-type labelling. [from search snippets; verify]
- **Inclusive Components** 11 case studies: Cards, Data Tables, Notifications, Content Slider, Collapsible Sections, Tabbed Interfaces, Theme Switcher, Tooltips and Toggletips, Menus and Menu Buttons, Todo List, Toggle Buttons. A blog "trying to be a pattern library"; book updated.
- **Resilient Web Design** Jeremy Keith; free online/PDF/EPUB under CC BY-SA 4.0; chapters Foundations, Materials, Visions, Languages, Layers, Steps, Challenges; progressive enhancement and the web's history.
- **Free text?** All three YES (Resilient CC BY-SA; the other two to read). **Rating** Roselli A, Inclusive Components A, Resilient Web Design B+ (philosophy more than rules).

### S18 - Benji Taylor (benji.org)
- **URL** https://benji.org/ ; https://benji.org/family-values
- **Format** Essays on product craft (Family wallet, Honk). **Audience** design engineers.
- **Principles** simplicity (show core up front, tray-based progressive disclosure); fluidity (motion tells where you are/going, purposeful, persistent elements stay consistent, morphing labels); delight (placed deliberately, scaled inverse to frequency, requires consistent polish); craft costs launch speed.
- **Free text?** YES (read). **Rating** B+ (principles are high-level; strong taste signal). Titles also include Agentation, Annotating for agents, Morphing icons with Claude (2026) which are directly agent-relevant [titles only, not read].

### S19 - Design Systems (Alla Kholmatova, Smashing, 2017)
- **URL** https://www.smashingmagazine.com/design-systems-book/ (ebook https://www.smashingmagazine.com/ebooks/design-systems-ebook/)
- **Format** Book (~280 pages), free PDF sample (chapter on qualities of effective design principles). **Audience** product design teams.
- **Principles (publisher blurb + engine note)** a system is a shared language of patterns; principles must be specific and testable; evolve with the product; interviews with Airbnb, Atlassian, Eurostar, TED, Sipgate. Pattern types (functional vs perceptual) [engine note].
- **Free text?** Sample only. **Rating** A (conceptual; limited numeric rules).

### S20 - Shape Up (Ryan Singer, Basecamp)
- **URL** https://basecamp.com/shapeup
- **Format** Free web book; print edition sold. **Audience** product/engineering leads.
- **Principles** appetite instead of estimates; shaping (rough, solved, bounded); breadboarding (affordances and connections without styling); fat-marker sketches; pitch; hill charts; scope mapping; circuit breaker. Design-engine relevance: brief -> direction step.
- **Free text?** YES (read online; reuse terms unconfirmed). **Rating** B+ (process, not UI craft).

### S21 - Material Design 3 (m3.material.io) and material-web tokens
- **URL** https://m3.material.io/foundations ; motion tokens (Apache-2.0): https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss
- **Format** Design guidelines (JS-rendered site; page text did not fetch) + open-source token files. **Audience** Android/web teams.
- **Principles** tokenised duration/easing ladders (see Numbers); emphasized vs standard motion; adaptive layout by window size classes (compact < 600, medium 600-839, expanded 840+ dp [engine note]); elevation by tone; accessibility baked into components.
- **Free text?** Tokens YES (Apache-2.0); site text read-only. **Rating** A- (numbers excellent; text needs a browser to ingest).

### S22 - Awwwards, FWA, Codrops and "how it was built" case studies
- **URLs** https://www.awwwards.com/about-evaluation/ ; https://tympanus.net/codrops/ (403 to fetcher; use a real browser) ; example breakdown blog https://www.hontran.dev/blog/tag/awwwards ; Maxime Heckel https://blog.maximeheckel.com ; Bruno Simon https://threejs-journey.com/
- **Format** Awards with transparent weights; tutorials/case studies; paid courses. **Audience** creative developers.
- **Awwwards** weights: design 40, usability 30, creativity 20, content 10; developer award 7+; at least 18 jurors with the 3 furthest removed; Honorable Mention 6.5+.
- **Case-study stack pattern** (hontran.dev examples): Next.js + GSAP + Prismic/Strapi + targeted WebGL/Three.js; Lenis smooth scroll; performance care for LCP/INP/CLS. [secondary source, one developer's account]
- **Maxime Heckel** long-form interactive posts: Study of Shaders with R3F, Particles, Caustics, Refraction/Dispersion, On Shaping Light, Shades of Halftone, Field Guide to TSL and WebGPU, painterly/dithering/Moebius shaders; plus Framer Motion layout animations.
- **Bruno Simon - Three.js Journey** (listed): Three.js course $95 (66 lessons, ~93 h), WebGPU & TSL $45 (21 lessons, ~24 h), bundle $120; basics, techniques, shaders, post-processing, performance, R3F, Blender portal scene.
- **Free text?** Awwwards criteria YES; case studies vary; Heckel blog YES (read); Journey paid (some previews). **Rating** B for rules (ambition reference), A for shader/creative-dev learning (Heckel, Journey).

### S23 - Kevin Powell and YouTube-style CSS teaching
- **URL** https://www.kevinpowell.co/ ; YouTube channel (consent wall blocked fetch)
- **Format** Free videos (1000+ per his site) and paid + free courses; focus on CSS layout, specificity, cleaner code. **Audience** beginners to intermediate.
- **Principles** [engine note] practical layout recipes, responsive without media queries, modern CSS features; verify with a transcript pull.
- **Free text?** Video transcripts via YouTube only (check licensing). **Rating** B+ (superb teaching, poor for text ingestion).

### S24 - Mobbin, Designer Fund, Figma resource library, Smashing Magazine
- **Mobbin** https://mobbin.com/ - searchable library (~621,500 screens cited), free tier limited, Pro adds flows, animations, MCP access. Use as an **examples/** retrieval source; paid tiers; do not mass-scrape (terms). **Rating** A for reference breadth, C for rule extraction.
- **Designer Fund** https://www.designerfund.com/ - newsletter, guides (fundraising, hiring), Craft and Practice articles incl. design at Stripe and Linear, Designer Founders stories. **Rating** B-.
- **Figma resource library** https://www.figma.com/resource-library/ (topics: design basics, UI/UX principles, typography, color theory, web design, design token architecture). Free articles; vendor content marketing. **Rating** B.
- **Smashing Magazine** https://www.smashingmagazine.com/category/design - free articles (UX patterns, front-end craft, AI and design), paid books/courses; Vitaly's design-patterns video courses. **Rating** B+ with high variance by article.

### S25 - The classic books (not fetched; engine notes)
- **Don't Make Me Think** (Steve Krug; 2000, 2nd ed 2005, Revisited 2013 adds mobile; 216 pp, 700k+ copies per Wikipedia). Fetched: users satisfice (take first workable choice); book meant to be readable in a two-hour flight; sequel Rocket Surgery Made Easy on DIY usability tests. [engine note] clarity > cleverness, scanning not reading, self-evident or self-explanatory pages, billboard design, the trunk test, 3 DIY tests per month. **Free text?** No. **Rating** A.
- **The Design of Everyday Things** (Don Norman; 1988 as POET, retitled 2002, revised 2013 introducing signifiers). Fetched: affordance, signifier, mapping, feedback, conceptual model, gulf of execution/evaluation, seven stages of action. [engine note] constraints, discoverability, error as design failure. **Free text?** No. **Rating** A+ (best conceptual foundation).
- **About Face** (Alan Cooper et al.; 1995 as Essentials of User Interface Design; 3rd ed 2007; 4th ed 2014). Secondary-source summary: goal-directed design, personas, application posture (sovereign, transient, daemonic, parasitic; web adds informational and transactional). Sovereign apps: full-screen, conservative style, rich feedback; transient: one job, large clear controls. [engine note beyond that] **Free text?** No. **Rating** A- (long; best for app UI structure decisions).

### S26 - Not located / unverified in this pass
- Julian Shapiro design material (julian.com offers writing/startup/health guides, none on design), Dan Hollick, Paul Stamatiou-style essays, Brian Lovin's individual essays, Paco Coursey's essays beyond cmdk/Next Themes/Writer and "Redesign 2021" (paco.me fetched: Paco is webmaster at Linear, previously Vercel design system). Treat these as TODO re-search; no rules derived.
