---
source: web:https://skills.sh/jakubkrehel/skills/better-ui ; https://skills.sh/emilkowalski/skills/emil-design-eng ; github.com/jakubkrehel/skills ; github.com/emilkowalski/skills ; jakub.kr ; emilkowal.ski
chapter: The two agent skills behind Marcel Kargul's CRM polish - better-ui (Jakub Krehel) and emil-design-eng (Emil Kowalski), with the better-typography / better-accessibility / better-layout siblings they defer to
pages: n/a (fetched 2026-10-09 from raw.githubusercontent.com; raw text kept in the session scratchpad, not in the repo)
topic_tags: [polish, motion, animation, easing, springs, stagger, enter-exit, concentric-radius, shadows, borders, optical-alignment, icons, tabular-nums, text-wrap, hit-area, focus, reduced-motion, hover, toast, drawer, tooltip, button, input, skills]
status: studied
---

# better-ui + emil-design-eng: exact polish values and motion judgement

What was read, in full: `jakubkrehel/skills` -> `skills/better-ui/` (SKILL.md, animations.md, enter-exit.md, icon-transitions.md, icons.md, performance.md, surfaces.md) plus the sibling skills better-ui hands off to (better-typography, better-accessibility `hit-areas` / `focus-and-keyboard` / `motion-and-zoom`, better-layout); `emilkowalski/skills` -> `skills/emil-design-eng/SKILL.md`, `skills/review-animations/STANDARDS.md`, `performance-cheatsheet.md`. Authors' writing read: jakub.kr "details that make interfaces feel better", "less is more", "the invisible side of design engineering", work pages (motion gestures, shared layout animations, drag gesture); emilkowal.ski "7 practical animation tips" and "you don't need animations".

**Overlap warning.** The engine already has Emil's essays in `knowledge/web-sources/craft-emil-kowalski.md` and the motion hub `motion-and-animation.md`. This note adds (a) Jakub's exact values, which are new to the engine, (b) the skill-file framing of Emil's rules (decision tables, review checklist, performance claims), and (c) the typography / hit-area / focus / layout rules from the better-* siblings. Rules that restate an existing note are kept (so `select_rules.py` can surface them with a skill source) but tagged "(also in craft-emil-kowalski)".

Provenance legend: **(verified)** = read in the skill/article text; **(opinion)** = author taste; **[engine note]** = my synthesis.

## 1. Core ideas

1. **better-ui is a lookup table of exact numbers, not a philosophy.** Its stance: values are exact (`0.96` is not `0.95`; `cubic-bezier(0.2,0,0,1)` is not Material's `(0.4,0,0.2,1)`); only optical nudges and the concentric-padding cutoff are judged by eye. It also says a consistent project convention (for example a no-shadow style) is a preference, but the same detail done two ways inside one project is a finding.
2. **emil-design-eng is a decision framework run in order:** should it animate (frequency) -> purpose -> easing -> duration -> then physicality (press scale, no scale(0), origin-aware) -> interruptibility (transitions/springs over keyframes) -> performance. Its review output is a strict Before / After / Why table.
3. **Both agree on the spine:** high-frequency interactions get no or near-zero animation; use transitions/springs (retargetable) not keyframes for state; ease-out for enter/exit; never `transition: all`; never scale from 0; hover motion only on hover-capable pointers; reduced motion keeps an opacity fade.
4. **Polish is built from small, individually invisible, exactly specified details**: concentric radii, three-layer transparent shadow rings instead of borders, 1px pure black/white image outlines at 10%, 2px optical padding trims, tabular numbers, `text-wrap: balance/pretty`, stroke weight matched to text weight. Emil: unseen details compound ("a thousand barely audible voices").
5. **Polish never outranks a broken interaction.** better-ui severity: HIGH = keyframe toggle that cannot reverse, hover stuck on touch, motion ignoring reduced-motion, or a state change carried by motion alone. MEDIUM = visible inconsistency. LOW = isolated polish.
6. **Marketing is the exception to "stay under 300ms".** Emil's table says marketing/explanatory motion can be longer; better-ui's staged-entrance recipe (300ms, 100ms stagger) is itself for infrequent first-load moments. The engine's Kaching tokens (1.2s travel) sit in this exception.
7. **Restraint is a design value.** Jakub's "less is more": do not animate by default; the arithmetic that made it concrete is a context menu opened 200 times a day with a 300ms animation costs about a minute a day, over six hours a year.
8. **Agents need the taste written as strict rules** (both authors ship their taste as skills with tables and detection patterns). The engine is doing the same; the "Before you finish" detection tables below are directly liftable into `tools/check.mjs`.

## 2. Rules

### 2.1 Whether, why, and how often to animate

- **RULE** Run the frequency test before writing any motion: 100+ times a day (keyboard shortcuts, command palette) = none; tens a day (row hover, list navigation) = remove or drop to a 100-150ms opacity or background-color change; occasional (modal, drawer, toast) = standard animation; rare or first-time (onboarding, empty state, success, celebration) = may add delight.
  **Why** Delight fades with repetition while the delay cost stays; frequent motion makes the product feel slower than it is.
  **Applies to** SaaS app UI. **Check** list every `transition`/`animation` on repeatedly-used controls (rows, tabs, menu items); only colour/opacity <=150ms remains. **Source** emil-design-eng "Animation Decision Framework" + better-ui "High-frequency interactions get no animation" (also in craft-emil-kowalski)
- **RULE** Never animate a keyboard-initiated action: no open/close animation for a command palette, shortcut-toggled panel or arrow-key list highlight; the highlight moves instantly.
  **Why** Hundreds of repeats a day; animation reads as lag between keypress and result. Emil's reference is Raycast, which has no open animation.
  **Applies to** SaaS app UI. **Check** handlers bound to `keydown`/shortcuts toggle state with no transition on the result. **Source** emil-design-eng "Should this animate at all?" (also in craft-emil-kowalski)
- **RULE** Give every animation a one-line purpose from this list: spatial consistency, state indication, explanation, feedback, or preventing a jarring appearance/disappearance. "It looks cool" on something seen often is not a purpose.
  **Why** Purposeless motion is noise that repeats; the purpose also tells you the duration and easing.
  **Applies to** all. **Check** DIRECTION.md or PR notes map each animated element to a purpose; unmapped ones are cut. **Source** emil-design-eng "What is the purpose?"
- **RULE** Pair every animated state change with a static cue (colour, icon or label); motion is never the only feedback channel.
  **Why** Users with reduced motion, fast users who interrupt, and screenshots all lose the motion. better-ui escalates a motion-only state change to HIGH.
  **Applies to** all. **Check** with `*{animation:none!important;transition:none!important}` injected, every state is still distinguishable. **Source** better-ui "High-frequency interactions get no animation"
- **RULE** Do not animate by default: add a transition only after naming the product moment it serves, and judge reviews by what was removed as much as what was added.
  **Why** Quality comes from many deliberate decisions; AI makes adding effects free, so the missing filter is judgement.
  **Applies to** all. **Check** `visual` review; count animated elements per viewport and justify each. **Source** jakub.kr "Less is more" (opinion)
- **RULE** Reserve expressive motion (stagger, blur-in, morph, bounce) for infrequent moments: first load of a view, a success state, an empty state. Routine interactions get instant or <=150ms feedback.
  **Why** Expressive motion is only special if rare.
  **Applies to** SaaS app UI, landing page. **Check** `visual`; entrance choreography exists on first-load surfaces only, not on tab switches or row hover. **Source** better-ui "High-frequency interactions get no animation"
- **RULE** Match motion personality to the product: a professional dashboard is crisp and fast, a playful consumer product may be bouncier, and one library should use one easing family and one duration scale.
  **Why** Cohesion makes motion read as identity; Sonner is deliberately a bit slower and uses `ease` because it fits its whole look.
  **Applies to** all. **Check** a single token file for easings/durations (the kit's `motion.ts`); no stray literals. **Source** emil-design-eng "Cohesion matters" (also in craft-emil-kowalski)

### 2.2 Easing, duration, perceived speed

- **RULE** Choose easing by this order: entering or exiting the screen = ease-out; moving or morphing while staying on screen = ease-in-out; hover / colour change = plain `ease`; constant motion (marquee, progress) = `linear`; when unsure = ease-out.
  **Why** Ease-out front-loads movement, which is the moment the eye is watching, so it feels responsive.
  **Applies to** all. **Check** computed `transition-timing-function` per role. **Source** emil-design-eng "What easing should it use?" (also in craft-emil-kowalski)
- **RULE** Never use `ease-in` for UI that enters, exits or responds to a click. A 300ms `ease-in` dropdown feels slower than a 300ms `ease-out` one.
  **Why** Ease-in is slow during the first frames, exactly when the user is looking.
  **Applies to** all. **Check** grep `ease-in(?!-out)` and `cubic-bezier(.42,0,1,1)` in UI components. **Source** emil-design-eng + emilkowal.ski "7 practical animation tips" tip 4
- **RULE** Prefer stronger custom curves over the weak CSS keywords. Emil's set: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)`, iOS drawer `cubic-bezier(0.32, 0.72, 0, 1)`. Jakub's soft icon curve: `cubic-bezier(0.2, 0, 0, 1)`. Take variants from easing.dev or easings.co instead of inventing.
  **Why** Built-in curves lack punch; a strong ease-out is the cheapest way to make a stock animation feel designed.
  **Applies to** all. **Check** tokens file defines named curves; no bare `ease-out` on hero/overlay motion. **Source** emil-design-eng + better-ui "Cross-fade contextual icons" (also in craft-emil-kowalski)
- **RULE** Keep UI animation under 300ms: button press 100-160ms, tooltip/small popover 125-200ms, dropdown/select 150-250ms, modal/drawer 200-500ms. Marketing or explanatory motion may run longer.
  **Why** A 180ms select feels more responsive than a 400ms one for the same result; a faster spinner even makes loading feel shorter.
  **Applies to** SaaS app UI. **Check** computed durations of app components; flag >300ms except drawers/sheets and marketing. **Source** emil-design-eng "How fast should it be?" (also in craft-emil-kowalski)
- **RULE** Make pressing slow only where the user is deciding and release always fast: a hold-to-confirm fill runs about 2s `linear` on press and snaps back in about 200ms `ease-out`.
  **Why** Slow where the human is committing, fast where the system is responding.
  **Applies to** SaaS app UI. **Check** distinct press vs release transition on hold controls. **Source** emil-design-eng "Asymmetric enter/exit timing"
- **RULE** Make exits shorter and smaller than enters: exit with opacity, 4px blur and a fixed -12px `translateY` over 150ms `ease-out`, never the full container height. Slide fully out only where the destination carries meaning (a drawer closing, a card returning to its list), around 200ms; remove instantly when motion adds no information.
  **Why** The element already did its job; a loud exit steals attention from what comes next.
  **Applies to** all. **Check** exit duration <= enter duration; exit translate magnitude <= 12px unless drawer/return. **Source** better-ui "Exits are shorter and smaller than enters"; enter-exit.md
- **RULE** For a subtle drawer or panel exit, move to about -70% plus fade and 4px blur instead of sliding fully out; for the full version use a spring of duration 0.45, bounce 0, from `calc(-100% - 4px)`.
  **Why** Partial exit keeps the motion legible without a long travel.
  **Applies to** SaaS app UI. **Check** `visual`. **Source** jakub.kr "Details that make interfaces feel better" (exit animations section)

### 2.3 Press, enter scale, origin, tooltips

- **RULE** Pressable elements scale on `:active`. better-ui: `0.96` over `150ms` `ease-out`; emil-design-eng: `0.97` over `160ms` `ease-out`; allowed band 0.95-0.98. Never below 0.95 (`scale-90`, `active:scale-95` flagged), and never on a disabled button (`enabled:active:` or `:not(:disabled):active`).
  **Why** Instant physical feedback makes the UI feel like it is listening; a disabled control that squishes lies about being clickable.
  **Applies to** all. **Check** computed `scale`/`transform` on `:active` in [0.95, 0.98]; none on `:disabled`. **Source** better-ui "Press scales to 0.96"; emil-design-eng "Buttons must feel responsive". [engine note] founder-taste fixes the marketing CTA at 0.98 (Kaching), which is inside the band and wins on marketing buttons.
- **RULE** Give pressable components an opt-out for the scale (a `static` prop or a variant), for buttons where movement distracts, such as a submit that triggers a loading morph.
  **Why** A scale on a button that is also animating its own content double-moves.
  **Applies to** SaaS app UI. **Check** component API exposes the opt-out. **Source** better-ui animations.md "Static prop pattern"
- **RULE** Animate only the transform property you mean: use the `scale` property (`transition-property: scale`) for press, not `transition: all` or a wide `transform` list.
  **Why** Narrow property lists avoid animating colours on a theme flip and avoid layout work.
  **Applies to** all. **Check** `transition-property` lists named properties. **Source** better-ui "Transition only what changes"
- **RULE** Never animate in from `scale(0)`; start at 0.95 with opacity 0 (0.9-0.93 acceptable for larger surfaces; tooltips 0.97).
  **Why** Nothing real appears from zero size; a barely-visible starting shape reads like a deflated balloon, not a conjuring trick.
  **Applies to** all. **Check** grep `scale(0)`, `scale-0`, `initial={{ scale: 0`. **Source** emil-design-eng "Never animate from scale(0)"; emilkowal.ski tip 2 (also in craft-emil-kowalski). [engine note] the kit's `Route` end-node (`scale: 0`) and Rails nodes break this; they are 7px SVG dots paired with opacity, a justified exception to record in DIRECTION.md.
- **RULE** Anchored popovers, dropdowns and menus scale from their trigger: `transform-origin: var(--transform-origin)` (Base UI) or the Radix `--radix-*-content-transform-origin` variable. Modals stay `center`.
  **Why** The default centre origin is wrong for nearly every popover; the mismatch is most visible for top-right triggers.
  **Applies to** SaaS app UI. **Check** computed `transform-origin` on popovers differs from 50% 50% and points at the trigger. **Source** emil-design-eng "Make popovers origin-aware" (also in craft-emil-kowalski)
- **RULE** Tooltips: delay the first one; once one is open, neighbouring tooltips open instantly with no animation (`[data-instant]{transition-duration:0ms}` in Base UI). Tooltip transition 125ms `ease-out`, start/end opacity 0 and scale 0.97.
  **Why** The initial delay stops accidental opens; removing it afterwards makes a toolbar feel faster.
  **Applies to** SaaS app UI. **Check** hover tooltip A then B within 300ms: B has 0 delay and 0 duration. **Source** emil-design-eng "Tooltips: skip delay on subsequent hovers" (also in craft-emil-kowalski)
- **RULE** Use a 2px blur on a crossfade only when two overlapping states read as two objects and easing/duration tuning failed; keep animated blur under 20px (blur is costly, especially in Safari).
  **Why** Blur blends the old and new image into one perceived morph.
  **Applies to** SaaS app UI. **Check** `filter: blur(` values <= 20px; used as a last resort. **Source** emil-design-eng "Use blur to mask imperfect transitions"; emilkowal.ski tip 7 (also in craft-emil-kowalski)

### 2.4 Interruptibility and springs

- **RULE** Drive interactive state (hover, toggle, open/close, add/remove) with CSS transitions or springs, not keyframe animations, so it retargets and reverses when the user changes their mind mid-flight. Keep keyframes for sequences that run once (enters, loaders).
  **Why** Transitions interpolate toward the latest state; keyframes follow a fixed timeline and snap or restart. This is better-ui's HIGH severity item.
  **Applies to** all. **Check** grep `animation:` inside `:hover`, `.open`, `[data-open]`, `.active` toggled classes. **Source** better-ui "Transitions, not keyframes"; emil-design-eng "Use CSS transitions over keyframes" (also in craft-emil-kowalski)
- **RULE** Use springs for drag with momentum, gestures the user can interrupt, elements that should feel alive, and decorative pointer tracking; set `bounce: 0` for everything functional. If bounce is used, 0.1-0.3, for drag-to-dismiss or playful products.
  **Why** Springs keep velocity when retargeted; bounce in a work tool reads as toy-like.
  **Applies to** SaaS app UI. **Check** grep spring configs; functional UI has `bounce: 0`. **Source** better-ui "Cross-fade contextual icons"; emil-design-eng "Spring Animations"
- **RULE** Declare springs in duration-and-bounce form (`{ type: "spring", duration: 0.3, bounce: 0 }`; Emil's playful example is `duration: 0.5, bounce: 0.2`), reserving mass/stiffness/damping for when you need finer control.
  **Why** Duration/bounce is easier to reason about and tune than physics parameters.
  **Applies to** all. **Check** spring tokens use `duration`+`bounce`. **Source** emil-design-eng "Spring configuration". [engine note] the kit's `spring` uses stiffness 420 / damping 36, which is a critically damped fit (bounce 0); keep it but also expose a duration/bounce token.
- **RULE** Decorative pointer-following (tilt, parallax, cursor glow) goes through a spring (`useSpring`), not a direct 1:1 mapping; for anything functional (a chart in a banking app) use no animation at all.
  **Why** Direct mapping feels mechanical, springs add momentum; but decoration must not impede reading data.
  **Applies to** landing page. **Check** `visual`. **Source** emil-design-eng "Spring-based mouse interactions"
- **RULE** Skip default-state animation on first render for toggles, tabs, icon swaps and segmented controls (`AnimatePresence initial={false}`), but never around an intentional staged entrance such as a hero.
  **Why** Otherwise the resting UI animates in on every page load; the opposite mistake skips the hero choreography entirely.
  **Applies to** SaaS app UI. **Check** full-page refresh: toggles do not animate; hero still does. **Source** better-ui "Skip state animations on first render"
- **RULE** Use `mode="popLayout"` when an item leaves a flowing list, so the exiting item leaves document flow on the first frame and siblings reflow immediately.
  **Why** Otherwise the list has a ghost-sized gap until exit finishes.
  **Applies to** SaaS app UI. **Check** `visual` removing a row in a list. **Source** better-ui icon-transitions.md (used on every swap) (also in craft-emil-kowalski)
- **RULE** Combine opacity and height changes for lists by trial: there is no formula; tune until the fade and the collapse feel like one move.
  **Why** Opacity finishing before height closes (or the reverse) reads as a pop.
  **Applies to** SaaS app UI. **Check** `visual` at 10% playback speed. **Source** emil-design-eng "The opacity + height combination"

### 2.5 Staged entrances (hero and first-load)

- **RULE** For a staged entrance, split content into semantic chunks (title, description, actions), stagger them 100ms apart, and enter each with opacity 0->1, 4px blur->0 and 12px `translateY` over 300ms ease-out. For word-by-word headlines use 80ms between words.
  **Why** Sequence expresses hierarchy; short chunks are readable quickly; blur softens the rise.
  **Applies to** landing page. **Check** per-chunk delays are multiples of 100ms (80ms for words) and total settles in about 1s. **Source** better-ui "Stagger infrequent entrances by 100ms"; enter-exit.md. [engine note] the kit's Kaching tokens (70ms, 28px, 6px, 1.2s) are the shipped, founder-approved variant and win for heroes; use these numbers for in-app first-load panels.
- **RULE** Jakub's own site recipe for a hero enter: keyframes from `translateY(8px)`, `blur(8px)`, `opacity 0` over 800ms with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` and `both` fill, delay = base x index; description as one block, buttons individually.
  **Why** Slower and softer than the skill's default; suits a calm editorial/marketing page.
  **Applies to** landing page. **Check** `visual`. **Source** jakub.kr "Details that make interfaces feel better" (opinion; conflicts with the skill's 300ms default, see section 5)
- **RULE** Keep stagger gaps short (30-80ms for list items) and never block interaction while a stagger plays.
  **Why** Long cascades make the page feel slow; stagger is decoration.
  **Applies to** SaaS app UI. **Check** per-item delay <= 80ms; no `pointer-events:none` during the cascade. **Source** emil-design-eng "Stagger Animations"
- **RULE** Put the hidden state in the `from` keyframe (with `animation-fill-mode: both`), never `opacity:0` in a base rule that only an animation reveals.
  **Why** If the animation never runs (reduced motion, JS failure, print) the content must still be visible.
  **Applies to** all. **Check** grep base rules with `opacity: 0` and no matching `@keyframes ... from`. **Source** better-ui "Before you finish" table; enter-exit.md
- **RULE** To enter from `display: none` (popover, dialog), use `@starting-style` plus `transition-behavior: allow-discrete` and `transition-property: opacity, translate, display, overlay`; set the longer duration on the open state and the shorter on the closed state. Fall back to a mounted-flag `data-mounted` pattern where unsupported.
  **Why** There is no prior style to interpolate from otherwise; separating open/closed durations gives free asymmetric timing.
  **Applies to** SaaS app UI. **Check** popover CSS has `@starting-style`; `overlay` is Chromium-only so verify the Safari/Firefox fallback is an instant show. **Source** better-ui enter-exit.md "Entering from display: none"; emil-design-eng "Animate enter states with @starting-style"

### 2.6 Icon and content swaps

- **RULE** Cross-fade an icon that swaps on an infrequent state change (play/pause, copy/copied, like/liked): scale 0.25 -> 1, opacity 0 -> 1, blur 4px -> 0, spring `{ duration: 0.3, bounce: 0 }`. Without a motion library keep both icons in one grid cell and cross-fade 300ms with `cubic-bezier(0.2, 0, 0, 1)`.
  **Why** The overlap of shrinking and growing, blurred glyphs reads as one icon morphing rather than two swapping.
  **Applies to** SaaS app UI. **Check** the icon button uses a grid-stacked pair or `AnimatePresence mode="popLayout"`. **Source** better-ui "Cross-fade contextual icons"; icon-transitions.md
- **RULE** Do not animate tab or navigation icon swaps, hover-revealed row actions, or decorative always-visible icons; those swap instantly or with a <=150ms opacity change.
  **Why** They are high-frequency.
  **Applies to** SaaS app UI. **Check** nav/tab icon components have no spring. **Source** better-ui icon-transitions.md "Which icons animate"
- **RULE** Animate icons in a toolbar that appears on selection, loading and success indicators; these are infrequent and benefit from the cross-fade.
  **Why** They mark real state changes users should notice.
  **Applies to** SaaS app UI. **Check** `visual`. **Source** better-ui icon-transitions.md
- **RULE** Use a clip-path duplicate for colour-inverting tab indicators: duplicate the tab row with active styling, clip it to the active tab, and animate the clip on change (also for hold-to-delete fills, image reveals with `inset(0 0 100% 0)` to `inset(0)`, comparison sliders).
  **Why** Colour transitions on individual labels never line up with a moving indicator; a clip reveals the pre-coloured copy exactly.
  **Applies to** SaaS app UI, landing page. **Check** `visual`; duplicate is `aria-hidden` with `tabindex=-1`. **Source** emil-design-eng "clip-path for Animation" (also in craft-emil-kowalski)

### 2.7 Performance of motion

- **RULE** Name the exact properties in `transition-property` (`scale, opacity`, `box-shadow`, `background-color`) and never write `transition: all` or Tailwind `transition-all`. Bare Tailwind `transition` is a curated list, still wider than most elements need.
  **Why** `all` animates unintended properties (colours on theme flip) and re-runs layout on width/padding.
  **Applies to** all. **Check** grep `transition:\s*all|transition-all`. **Source** better-ui "Transition only what changes"; performance.md; emil-design-eng review checklist
- **RULE** Animate only `transform` (including `translate`, `scale`, `rotate`) and `opacity`; `filter` and `clip-path` with care. Avoid animating `width`, `height`, `padding`, `margin`, `top`, `left`.
  **Why** Compositor properties skip layout and paint.
  **Applies to** all. **Check** animated properties in computed transitions/keyframes. **Source** emil-design-eng "Performance Rules"; performance-cheatsheet.md (also in motion-a11y-perf-loading)
- **RULE** Add `will-change` only after you see a first-frame stutter, name the property (`scale`, `transform`, `opacity`, `filter`), and never use `will-change: all`; never put it on layout or paint properties (`background-color`, `padding`, `top`). Note it makes the element a containing block for `position: fixed` descendants and creates a stacking context.
  **Why** Each promoted layer costs memory; a will-change on a modal's ancestor breaks its fixed tooltip.
  **Applies to** all. **Check** grep `will-change`. **Source** better-ui "Name the animated property in will-change"; performance.md
- **RULE** While dragging or scroll-linking, write `element.style.transform` on the moved element directly; do not update an inherited CSS custom property on a parent of a large subtree, and in React write to `ref.current.style` rather than state.
  **Why** An inherited variable forces style recalculation on every descendant; state causes a re-render per frame.
  **Applies to** SaaS app UI. **Check** pointermove handler. **Source** emil-design-eng "CSS variables are inheritable"; performance-cheatsheet.md (also in craft-emil-kowalski)
- **RULE** Prefer CSS (or WAAPI) for predetermined motion and JS libraries only for dynamic, interruptible motion; test motion while the page is still loading. Emil claims Motion's shorthand props (`x`, `y`, `scale`) run on the main thread and recommends the full `transform` string for GPU acceleration.
  **Why** rAF-driven animation drops frames when the main thread is busy loading; CSS runs off-thread. Vercel's tab animation fixed this by moving to CSS.
  **Applies to** landing page, SaaS app UI. **Check** record a trace of the hero load with CPU throttling and look for dropped frames in `Reveal`/`Word`. **Source** emil-design-eng "Framer Motion hardware acceleration caveat"; "CSS animations beat JS under load" (contested, see section 5)
- **RULE** Use WAAPI (`element.animate`) for programmatic animation that needs CSS-level performance and interruptibility without a library.
  **Why** Hardware accelerated and cancellable.
  **Applies to** all. **Check** n/a. **Source** emil-design-eng "Use WAAPI for programmatic CSS animations"
- **RULE** Suppress all transitions during a theme switch: inject `*,*::before,*::after{transition:none !important}`, force a style flush (`void document.body.offsetHeight`), remove the style after two `requestAnimationFrame`s. `next-themes` offers `disableTransitionOnChange`.
  **Why** Otherwise every colour-transitioned element fires at once and the switch smears.
  **Applies to** SaaS app UI. **Check** toggling theme shows no fade on borders/backgrounds. **Source** better-ui "Suppress transitions on theme switch"; animations.md

### 2.8 Reduced motion and input capability

- **RULE** Under `prefers-reduced-motion: reduce`, keep a short opacity cross-fade and remove movement, scale, blur and parallax; do not remove the element instantly. Pattern: base style transitions opacity 150ms; inside `@media (prefers-reduced-motion: no-preference)` add `translate, scale, filter` at 300ms.
  **Why** Reduced motion targets vestibular triggers, not comprehension; a fade preserves the change cue.
  **Applies to** all. **Check** emulate reduced motion: no transform or filter animation, opacity fades remain. **Source** better-ui "Gate motion behind the reduced-motion preference"; animations.md; emil-design-eng "Accessibility"; better-accessibility motion-and-zoom.md
- **RULE** In Motion, `MotionConfig reducedMotion="user"` disables transform and layout animation but still runs `filter` (blur), so branch on `useReducedMotion()` wherever a recipe animates blur.
  **Why** Blur in/out is motion for sensitive users and the global switch does not cover it.
  **Applies to** landing page, SaaS app UI. **Check** grep `filter: 'blur` in motion props and confirm it is conditional. **Source** better-ui animations.md "Reduced-motion fallback". [engine note] the kit's `reveal(..., {blur:true})` and `Word` currently animate blur under reduced motion; fix.
- **RULE** Disable (not merely reduce): parallax, autoplaying video/GIF/looping decoration, large travel. Replace: slide/scale/zoom with fades, smooth scroll with instant jump, auto-rotating carousels start paused. Keep: spinners, progress, instant hover/focus colour, press feedback.
  **Why** Distinguishes vestibular triggers from feedback.
  **Applies to** landing page. **Check** emulated reduced motion walkthrough. **Source** better-accessibility motion-and-zoom.md "What to disable vs reduce"
- **RULE** Put hover styling behind `@media (hover: hover) and (pointer: fine)` (Tailwind 4's `hover:` already compiles under `hover: hover`; Tailwind 3's does not). Where a control draws its own pressed state, set `-webkit-tap-highlight-color: transparent`.
  **Why** On touch, `:hover` latches after a tap and looks like a stuck selected state.
  **Applies to** all. **Check** grep `:hover` outside the media query in plain CSS; on an emulated touch device a tapped card does not stay in hover. **Source** better-ui "Hover effects only on hover-capable pointers"; emil-design-eng "Touch device hover states". [engine note] kit components that set hover via `onMouseEnter` (`PillNav`) latch on touch too.
- **RULE** Anything that moves by itself for more than 5 seconds (muted looping hero video, ticker, auto-carousel) needs a visible pause control.
  **Why** WCAG 2.2.2.
  **Applies to** landing page. **Check** visible control exists. **Source** better-accessibility motion-and-zoom.md "Autoplay and timed UI"

### 2.9 Surfaces: radius, shadow, outline, optical alignment

- **RULE** Nested surfaces with a visible even inset use concentric radii: outer radius = inner radius + padding + border width (12 inner + 8 padding = 20 outer). Beyond about 24px of padding, or with deliberately asymmetric padding, treat the layers as separate surfaces.
  **Why** Equal radii on nested rounded boxes make the gap look pinched at the corners.
  **Applies to** all. **Check** for parent with padding p and child radius r: parent computed radius ~ r + p (+ border). **Source** better-ui "Outer radius equals inner radius plus padding"; surfaces.md; jakub.kr. [engine note] the kit's `Frame` already does this (inner 16 + pad 6 = 22).
- **RULE** Where a border exists only for depth, use a layered, transparent `box-shadow` ring instead. Light mode, three layers: `0 0 0 1px oklch(0 0 0/.06)`, `0 1px 2px -1px oklch(0 0 0/.06)`, `0 2px 4px 0 oklch(0 0 0/.04)`; hover steps to .08 / .08 / .06. Dark mode keeps one ring `0 0 0 1px oklch(1 0 0/.08)`, hover .13. Transition `box-shadow` 150ms ease-out.
  **Why** Transparent layers adapt to any background (photos, gradients), a solid border colour does not; depth shadows vanish on dark so dark mode needs only a white ring.
  **Applies to** SaaS app UI, landing page. **Check** computed card `box-shadow` has 3 layers in light, 1 in dark; no solid border colour used for elevation. **Source** better-ui "Shadows for elevation, borders for structure"; surfaces.md "Shadow recipes"; jakub.kr
- **RULE** Under every shadow ring keep `border: 1px solid transparent`.
  **Why** Forced-colors mode removes `box-shadow`; the transparent border is painted instead, and keeps the box size equal to the border it replaced.
  **Applies to** SaaS app UI. **Check** elements with shadow ring have a transparent border. **Source** better-ui surfaces.md "Usage"
- **RULE** Keep real borders for dividers, separators, table cells, selected states and form inputs (input boundary needs 3:1 non-text contrast).
  **Why** Those borders carry structure, not depth.
  **Applies to** SaaS app UI. **Check** inputs have a contrasting border. **Source** better-ui "Shadows for elevation, borders for structure"
- **RULE** Give content images (photos, screenshots, avatars) a 1px inset outline in pure black or white at 10% opacity: `outline: 1px solid oklch(0 0 0 / .1); outline-offset: -1px`, white at .1 in dark mode. Never a tinted neutral, palette near-black or the accent colour; skip transparent artwork such as logos.
  **Why** Tinted outlines show as a coloured fringe on the image edge; an outline never changes layout size, unlike a border, and follows the corner radius.
  **Applies to** SaaS app UI, landing page. **Check** `img` outline colour is `rgba(0,0,0,.1)` or `rgba(255,255,255,.1)`, offset -1px. **Source** better-ui "Outline images in pure black or white"; surfaces.md "Image outlines"
- **RULE** In a button with an icon, give the icon side about 2px less padding than the text side (for example `ps-4 pe-3.5`), and judge by eye.
  **Why** Equal padding makes the icon look pushed outward.
  **Applies to** all. **Check** `visual`: crop the button and compare optical margins. **Source** better-ui "Align optically where geometry looks off"; surfaces.md
- **RULE** Nudge play triangles about 2px toward their point (physical `translateX(2px)`), and fix asymmetric glyphs (stars, arrows, carets) in the SVG path or `viewBox`; only nudge the wrapper when the asset cannot change.
  **Why** A triangle's geometric centre sits left of its visual centre.
  **Applies to** all. **Check** `visual` on icon buttons at 2x. **Source** better-ui surfaces.md "Optical alignment"
- **RULE** The same surface detail must not be done two ways in one project (two radii for the same card, two shadow recipes); a deliberate project convention is preference, inconsistency is a finding.
  **Why** Polish reads as consistency.
  **Applies to** all. **Check** grep distinct radius/shadow values per component family. **Source** better-ui "Exact values, optional polish"

### 2.10 Icons

- **RULE** Match icon stroke to the adjacent text weight, in rendered pixels: 1.5px beside regular (400) 14-16px text, 2px beside medium/semibold (500-600), 2.5px beside bold or an emphasised standalone icon. Scaled SVGs shrink stroke (24px grid drawn at 16px paints `stroke-width="2"` as about 1.33px), so use the library's absolute-stroke option or `vector-effect: non-scaling-stroke`.
  **Why** Mismatched stroke and weight makes icon and label look drawn by different hands.
  **Applies to** all. **Check** rendered stroke width of icons next to labels vs the text `font-weight`. **Source** better-ui "Match icon stroke to text weight"; icons.md
- **RULE** Use one icon library per surface; size inline icons 1em-1.25em of the adjacent text; use the 16/20/24 grid that matches the render size; test recognisability at 16px; always SVG.
  **Why** A 24px drawing scaled down lands off the pixel grid and renders soft.
  **Applies to** all. **Check** one icon package per page; sizes in the grid. **Source** better-ui icons.md "Design at render size"
- **RULE** Draw icons with `currentColor` and take hover, selected and disabled from CSS colour and opacity (disabled about 0.4); strip hard-coded `fill="#..."` / `stroke="#..."` on import.
  **Why** One asset recoloured by state keeps variants in sync.
  **Applies to** all. **Check** grep `fill="#` in icon SVGs. **Source** better-ui "One SVG, recolored per state"
- **RULE** Use outline as the default icon state and fill as the active/selected state (active tab, toggled bookmark, liked heart); cross-fade only for infrequent toggles, swap instantly for tabs.
  **Why** The variant becomes a state cue that survives without colour.
  **Applies to** SaaS app UI. **Check** active nav item uses solid variant. **Source** better-ui icons.md "Outline default, fill active"
- **RULE** Under `dir="rtl"` mirror only icons whose meaning follows reading direction (back/forward arrows, nav chevrons, list/indent glyphs, send); leave logos, checkmarks, physical objects and media playback alone; use one flip mechanism per element.
  **Why** Two flips compound back to unflipped.
  **Applies to** all (if RTL is in scope). **Check** `[dir=rtl]` screenshot. **Source** better-ui icons.md "Icons in RTL"

### 2.11 Type details (from better-typography, which better-ui defers to)

- **RULE** Apply `text-wrap: balance` to headings and short descriptions (not paragraphs; Chromium ignores it past about 6 lines) and `text-wrap: pretty` to paragraphs to avoid a single word on the last line.
  **Why** Even line lengths read as designed; orphans read as unfinished.
  **Applies to** landing page, SaaS app UI. **Check** computed `text-wrap` on `h1-h3`, `p`. **Source** better-typography "Wrap deliberately"; jakub.kr "Details that make interfaces feel better"
- **RULE** Use `font-variant-numeric: tabular-nums` on counters, timers, prices and numeric table columns (not prose); right-align numeric columns. Some fonts (Inter) change numeral shapes when it is on, so check the face.
  **Why** Changing digits otherwise shift neighbours sideways.
  **Applies to** SaaS app UI. **Check** computed `font-variant-numeric` includes `tabular-nums` on number cells and `CountUp`. **Source** better-typography "Tabular numbers on changing values"; jakub.kr
- **RULE** Set `-webkit-font-smoothing: antialiased` (and `-moz-osx-font-smoothing: grayscale`) once on the root, never per component.
  **Why** Thinner, crisper text on macOS; per-component values drift.
  **Applies to** all. **Check** exists on `body`/`html` only. **Source** better-typography "Font smoothing on the root"
- **RULE** Line-height by role: display 1.1, headings 1.2-1.3, body 1.5-1.6, always unitless; anything that can wrap to 3+ lines is at least 1.4. Letter-spacing in `em`: headings from 24px up -0.01em to -0.02em, uppercase labels at 14px or less +0.05em, body 0.
  **Why** Fixed px leading breaks when font size changes; tight leading is for short text.
  **Applies to** all. **Check** computed line-height ratio per role. **Source** better-typography "Line-height by role", "Letter-spacing by size". [engine note] the kit's h1 is -4.5% (founder-approved), tighter than this band for 72px display; heroes are the exception.
- **RULE** Below 18px use weight 400 or heavier; weights 100-300 only at 28px+ and checked on the background. Cap long-form measure at 60-75 characters. Rarely more than three fonts.
  **Why** Light weights fall apart at small sizes; long lines lose the eye.
  **Applies to** all. **Check** computed weight vs size; `max-width` in `ch`. **Source** better-typography "Fewer fonts, sizes and weights", "Cap the measure"
- **RULE** Inputs render at 16px minimum on mobile (iOS Safari zooms the page below 16px): either `text-base sm:text-sm`, or keep 16px and shrink with `transform: scale()` inside a wrapper that draws the field surface.
  **Why** iOS auto-zoom on focus breaks the layout.
  **Applies to** SaaS app UI, landing page (email capture). **Check** computed input font-size >= 16 at 375px. **Source** better-typography "Inputs at 16px on mobile"; details-and-accessibility.md
- **RULE** Use typographic punctuation in rendered strings: curly quotes, en dash in ranges, em dash for asides, the `...` ellipsis character `…`, and non-breaking spaces between value and unit. Store text in natural case and apply case with `text-transform`.
  **Why** Keyboard stand-ins look unfinished; natural-case storage survives redesigns.
  **Applies to** all. **Check** grep rendered strings for `...`, ` -- `, straight quotes. **Source** better-typography "Natural case, typographic punctuation"
- **RULE** Use `font-weight` and `font-variant-numeric` properties, not raw `font-variation-settings`/`font-feature-settings` tags; leave `font-optical-sizing: auto`; load every face the design uses so the browser does not synthesise weights.
  **Why** Properties keep working when a non-variable fallback renders; synthesised faces look distorted.
  **Applies to** all. **Check** grep `font-variation-settings`, `font-feature-settings: "tnum"`. **Source** better-typography "Properties over raw tags", "Load the faces the design uses"
- **RULE** Trim text-box in tight components (`text-box: trim-both cap alphabetic`) as progressive enhancement to remove the extra space above caps in buttons and badges.
  **Why** Font metrics reserve space that makes labels sit low (Chromium 133+, Safari 18.2+).
  **Applies to** all. **Check** visual centring of label in 32-40px controls. **Source** better-typography "Trim text boxes in tight containers"

### 2.12 Hit areas, focus, targets, timed UI (from better-accessibility)

- **RULE** Keep targets at least 24x24 (WCAG AA), aiming for 44x44 on touch; if the visible element is smaller, expand the hit area with a pseudo-element on a wrapper or the `<button>` (not on the `<input>`), centred with `top/left:50%` and `translate(-50%,-50%)`. Shrink the pseudo-element where it would collide with a neighbour; two 20px targets need a 4px gap.
  **Why** The visible size can stay small while the hit area stays usable; form controls do not render pseudo-elements reliably.
  **Applies to** SaaS app UI. **Check** computed bounding box (or pseudo-element box) >= 24px (44px touch); no overlapping hit areas. **Source** better-accessibility hit-areas.md
- **RULE** Give each decorative layer over interactive content (scrim, glow, sheen, full-bleed `::after`) `pointer-events: none`; leave it on a layer the user must hit (a dismissing modal scrim).
  **Why** Invisible layers swallow clicks: the control looks live and does nothing.
  **Applies to** landing page, SaaS app UI. **Check** `elementFromPoint` at each CTA centre returns the CTA. **Source** better-accessibility hit-areas.md "Decorative layers" (matches `interaction.blocked-targets` in check.mjs)
- **RULE** Keep the browser focus ring or define one explicitly: `:focus-visible { outline: 2px solid <token>; outline-offset: 2px }`; never `outline:none` without a replacement; check the ring's contrast against every surface it crosses.
  **Why** Keyboard users need to see where they are; bare `currentColor` outlines can fail on coloured surfaces.
  **Applies to** all. **Check** tab through the page; ring visible on every control. **Source** better-accessibility focus-and-keyboard.md "Focus rings"
- **RULE** Pad sticky chrome: `scroll-padding-top` equal to the sticky header height (and `scroll-padding-bottom` for sticky footers/banners), plus `scroll-margin-top` on anchor targets.
  **Why** Focused or jumped-to elements otherwise land hidden behind the header.
  **Applies to** landing page, SaaS app UI. **Check** Tab to a form field under a sticky header: it is visible. **Source** better-accessibility "Focus not obscured"
- **RULE** Give scrollable dialogs, drawers, menus and side panels `overscroll-behavior: contain`.
  **Why** Scrolling past the end otherwise scrolls the page behind.
  **Applies to** SaaS app UI. **Check** computed `overscroll-behavior` on overlays with `overflow:auto`. **Source** better-ui "Contain scroll inside overlays"
- **RULE** Toasts: use auto-dismiss only for low-stakes confirmations; a toast that carries an action, an error or information the user may need stays until dismissed; if it times out, at least 5 seconds, paused while hovered or focused; never put the only link to an undo in a timed toast.
  **Why** A vanished toast with the only undo is data loss on a timer.
  **Applies to** SaaS app UI. **Check** toast config has hover/focus pause and persistent variant for error/action. **Source** better-accessibility motion-and-zoom.md "Autoplay and timed UI"

### 2.13 Layout hygiene (from better-layout)

- **RULE** Group with space first, background shapes second, hairline separators last; the gap between groups is at least 2x the gap within a group (8px inside, 16px+ between).
  **Why** Proximity carries the structure; lines used to compensate for uniform spacing add noise.
  **Applies to** all. **Check** measure inter-group vs intra-group gaps. **Source** better-layout "Group with space, not lines"
- **RULE** Controls must look different from content: action text gets a background, border, underline or consistent placement; a non-clickable badge shaped like the buttons beside it collects dead clicks.
  **Why** Affordance.
  **Applies to** all. **Check** `visual`. **Source** better-layout "Keep controls distinct from content"
- **RULE** Use logical properties for anything that mirrors (`ms-4`, `pe-6`, `text-start`, `inset-inline-start`); `translateX` and `background-position` have no logical form and need `[dir=rtl]` overrides.
  **Why** Physical left/right breaks in RTL.
  **Applies to** all (if RTL in scope). **Check** grep `ml-|mr-|pl-|pr-|text-left`. **Source** better-layout "Logical properties"
- **RULE** Prefer `100dvh` over `100vh` on full-height mobile panes, `width:100%` over `100vw`, `minmax(0,1fr)` / `min-width:0` for tracks holding long text, container queries inside reusable components; size text containers with `min-height`/`max-width`, never fixed height.
  **Why** Avoids toolbar/keyboard overlap, horizontal scroll from scrollbar width, and grid blowout.
  **Applies to** all. **Check** grep for `100vh`, `100vw`, fixed `height` on text boxes. **Source** better-layout "Before you finish"
- **RULE** Give each view one primary action; once secondary actions exceed 3 put them behind a menu.
  **Why** Focus and decision speed.
  **Applies to** SaaS app UI. **Check** count of primary-styled buttons per viewport = 1. **Source** better-layout "One primary action per view"

### 2.14 Component craft (buttons, inputs, menus, toasts, drawers)

- **RULE** Buttons: pressed scale (2.3), named-property transitions (`transition-[scale,background-color]`), `static` opt-out, a loading state that morphs content (with 2px blur on the cross-fade if it looks like two objects), and hover colour only on hover-capable pointers.
  **Why** The sum of these is what a polished button feels like.
  **Applies to** all. **Check** component source has `:active` scale, no `transition-all`, loading variant. **Source** better-ui + emil-design-eng composite
- **RULE** Menus and popovers: origin-aware scale from 0.95 with opacity, 125-200ms ease-out in, shorter out; item hover is a <=100ms background change (or none); keyboard navigation moves highlight instantly; open/close not animated if the menu is a high-frequency right-click or command surface.
  **Why** Combines the frequency, origin and speed rules; Jakub's macOS context menu example animates only closing and skips item hover colour.
  **Applies to** SaaS app UI. **Check** computed transition per state. **Source** emil-design-eng + jakub.kr "Less is more" example
- **RULE** Toasts (Sonner pattern): enter from `translateY(100%)` via a mounted flag or `@starting-style` with a CSS transition (about 400ms `ease`), leave in the same direction, stacked toasts offset about 14px with scale 1 - 0.05 x index, 4s default lifetime paused on hover and on `document.hidden`, bridge gaps with a pseudo-element, imperative API with one mount point.
  **Why** Same-direction enter/exit makes swipe-to-dismiss intuitive; transitions survive rapid adds; hidden-tab pause prevents missed toasts.
  **Applies to** SaaS app UI. **Check** `visual` + timers. **Source** emil-design-eng "The Sonner Principles" (also in craft-emil-kowalski). [engine note] the 4s default conflicts with the accessibility rule in 2.12 for action/error toasts; follow 2.12.
- **RULE** Drawers and sheets: use `translateY(100%)`/percentage translates instead of pixel values; `cubic-bezier(0.32, 0.72, 0, 1)` at around 500ms for finger-driven sheets; damping past the boundary; ignore extra touches after the first.
  **Why** Percentages adapt to content height; the iOS curve plus damping feels native.
  **Applies to** SaaS app UI (mobile). **Check** computed curve; test on a physical device. **Source** emil-design-eng "CSS Transform Mastery", "Gesture and Drag Interactions" (also in craft-emil-kowalski)
- **RULE** Ship good defaults over options and handle edge cases invisibly (pause timers when the tab is hidden, bridge hover gaps, capture pointer during drag); users never notice and that is the goal.
  **Why** Most users never customise; the default is the product.
  **Applies to** all. **Check** review checklist. **Source** emil-design-eng "The Sonner Principles"

### 2.15 Gestures and drag

- **RULE** Dismiss by velocity as well as distance: dismiss if `abs(distance) >= threshold` or `abs(distance)/elapsedMs > 0.11`; apply damping/friction past the boundary rather than a hard stop; call `setPointerCapture` once a drag starts; ignore additional touch points after the drag begins.
  **Why** A flick should be enough; invisible walls and finger-switch jumps feel broken.
  **Applies to** SaaS app UI (touch). **Check** drag handler has velocity branch, capture, multi-touch guard. **Source** emil-design-eng "Gesture and Drag Interactions" (also in craft-emil-kowalski)
- **RULE** Swipe rows (Jakub's iOS-style example): `drag="x"` with `dragElastic` about 0.05 and `dragMomentum={false}` so the row lands on snap points (-116, 0, +116 px); commit threshold 58px; reveal action 1 at 44px and action 2 at 88px (pixel thresholds, not percentages); action buttons enter from opacity 0 / scale 0.5; indicators scale 0.75 with the origin at their corner; spring 0.3s bounce 0.
  **Why** Fixed snap points make the outcome predictable; pixel thresholds are easy to tune.
  **Applies to** SaaS app UI (touch). **Check** `visual` on device. **Source** jakub.kr work "Drag gesture" (opinion/recipe)
- **RULE** Give every drag a single-pointer alternative (move up/down buttons, a menu) and set `touch-action: none` only on the surface that implements its own gesture, not at page level.
  **Why** WCAG 2.5.7 and 2.5.1; page-level `touch-action:none` disables scrolling.
  **Applies to** SaaS app UI. **Check** keyboard path exists for reorder. **Source** better-accessibility hit-areas.md "Gestures and dragging"
- **RULE** With shared layout animations give each moving element its own `layoutId`, keep elements that should not fade outside `AnimatePresence`, and pass animated border radius through `animate`, not `className`.
  **Why** Same `layoutId` on two elements in one state breaks the animation; className radius cannot interpolate.
  **Applies to** SaaS app UI. **Check** `PillNav` / `Segmented` unique ids; radius set in `animate` where it changes. **Source** jakub.kr work "Shared layout animations"

### 2.16 Review and process

- **RULE** Report review findings as a table `Severity | Location | Before | After | Why` grouped by the violated principle, one row per root cause, and finish with Block (any HIGH remains) or Approve; mark checks you could not run as Not verified.
  **Why** Forces specificity and prevents approving unseen coverage.
  **Applies to** all. **Check** review output format. **Source** better-ui "Reporting"; emil-design-eng "Review Format"
- **RULE** Review animations at 10% speed (DevTools Animations panel) or 2-5x duration, frame by frame, on a real device for touch, and again the next day; check colour crossfades, easing starts, `transform-origin`, and sync of coordinated properties.
  **Why** Timing drift between coordinated properties is invisible at full speed.
  **Applies to** all. **Check** the ledger entry says it was slow-motion reviewed. **Source** better-ui "Verification"; emil-design-eng "Debugging Animations", "Review your work the next day"
- **RULE** Detection table to run mechanically before finishing: padded parent + child with equal radius; `box-shadow: 0 0 0 1px` ring without transparent border; `outline-slate/zinc` or hex on `img`; `transition-all`; `animation` on a toggled class; `active:scale-95`/`scale-90`/`whileTap` below 0.96; scale on `:active` without `:disabled` exclusion; `bounce` != 0; transform/filter animation without reduced-motion gate; colour transitions with a theme toggle and no suppression; `will-change: all`; hex `fill`/`stroke` in icon SVG; `:hover` outside `@media (hover: hover)`; overlay with `overflow:auto` and no `overscroll-behavior`.
  **Why** Each is a known regression pattern with a one-line fix.
  **Applies to** all. **Check** add as grep checks in `tools/check.mjs` (see section 8). **Source** better-ui "Before you finish"

## 3. Numbers & scales

| Item | better-ui (Jakub) | emil-design-eng (Emil) | Engine today (kit / founder) |
|---|---|---|---|
| Press scale | 0.96, 150ms, ease-out | 0.97 (band 0.95-0.98), 160ms ease-out | 0.98 in 220ms (founder, Kaching) |
| Enter from scale | n/a (icons 0.25) | never 0; 0.95 + opacity; tooltip 0.97 | Stage 0.97; Route nodes 0 |
| Stagger | 100ms chunks; 80ms words | 30-80ms items; 50ms in the CSS example | 70ms (Kaching) |
| Enter | 300ms, y 12px, blur 4px, ease-out | 300ms, y 8px (CSS sample) | 1.2s travel, 0.9s fade, y 28, blur 6 text-only |
| Exit | 150ms, y -12px, blur 4px, ease-out; full slide 200ms | exit faster than enter (e.g. 2s in / 200ms out for holds) | none defined |
| Icon swap | scale .25->1, blur 4->0, spring .3 bounce 0, or 300ms (0.2,0,0,1) | n/a | none |
| Hover on rows | <=150ms opacity/bg, or none | tens/day: remove or reduce; color change uses `ease` | 220ms colour on nav and buttons |
| Strong ease-out | `ease-out`; icon crossfade (0.2,0,0,1); Jakub's hero (0.25,0.46,0.45,0.94) | (0.23,1,0.32,1) | outQuint (0.22,1,0.36,1) ~ Emil's |
| Ease-in-out | n/a | (0.77,0,0.175,1) | inOut (0.65,0,0.35,1) |
| Drawer | spring 0.45 bounce 0 (exit) | (0.32,0.72,0,1), 200-500ms | n/a |
| Max blur | 4px in recipes | under 20px; 2px mask | 6px text reveal |
| Spring | duration/bounce, bounce 0 always | duration/bounce; bounce 0.1-0.3 if any | stiffness 420 / damping 36 |
| Concentric radius | outer = inner + padding + border (cutoff ~24px padding) | n/a | Frame: 16 + 6 = 22 |
| Shadow ring (light) | 0 0 0 1px .06; 0 1px 2px -1px .06; 0 2px 4px 0 .04 (oklch black) | n/a | `--shadow-ring` 1px .07 + 0 1px 2px .05 (tinted) |
| Shadow ring (dark) | 0 0 0 1px white .08; hover .13 | n/a | n/a |
| Image outline | 1px, offset -1px, black/white at 10% | n/a | none |
| Icon stroke | 1.5 / 2 / 2.5px for 400 / 500-600 / 700 | n/a | not specified |
| Hit area | 24 min, 44 aim | n/a | nav 36 (founder), buttons 40-44 |
| Line-height | display 1.1, heading 1.2-1.3, body 1.5-1.6, wrap 3+ lines >= 1.4 | n/a | h1 1.04 at 72px |
| Swipe | threshold 58px; reveals 44 / 88; snaps -116, 0, 116 | velocity 0.11 px/ms | n/a |
| Toast | >=5s if timed; pause on hover/focus | 4s Sonner; 400ms transition | n/a |
| Frequency bands | tens/day -> instant or <=150ms | 100+ none; tens remove; occasional standard; rare delight | n/a |

## 4. Dos and Don'ts

- **Concentric radius.** Good: card `border-radius: 20px; padding: 8px` around an inner element of `12px`. Bad: both `12px`, so the gap pinches at the corners.
- **Shadow vs border.** Good: three-layer transparent shadow ring that darkens one step on hover. Bad: a solid grey border used to fake depth on a card over a photo.
- **Image outline.** Good: `outline: 1px solid oklch(0 0 0/.1); outline-offset:-1px`. Bad: `outline-slate-200` or the accent colour (coloured fringe).
- **Press.** Good: `enabled:active:scale-[0.96]` with a 150ms ease-out `scale` transition. Bad: `active:scale-90` or scale on a disabled button.
- **Drawer toggle.** Good: `transform: translateX(-100%)` with `.open` setting `translateX(0)` and a 200ms transition (reverses mid-flight). Bad: `.open { animation: slideIn ... forwards }` (closing snaps).
- **Row hover.** Good: `background-color` 100ms ease-out. Bad: `.row:hover .icon { animation: bounceIn 500ms }`.
- **Exit.** Good: opacity + 4px blur + -12px translate in 150ms. Bad: `translateY(-100%) scale(.5)` with `transition: all 400ms`.
- **Icon swap.** Good: both icons stacked in a grid cell cross-fading scale .25->1 with blur. Bad: the new icon popping in with no overlap, or animating tab icons.
- **Stagger around `initial={false}`.** Good: `initial={false}` on a toggle swap. Bad: the same prop around the hero stagger, which deletes the entrance.
- **Icon button padding.** Good: `ps-4 pe-3.5`. Bad: symmetric `px-4` so the arrow looks pushed out.
- **Card description line-height.** Good: 1.4 on text that wraps to 3 lines. Bad: the heading's 1.1.
- **Drag handler.** Good: write `element.style.transform`. Bad: `setProperty('--swipe-amount')` on a parent with many children.

## 5. Exceptions & judgement calls

- **Press scale numbers disagree.** 0.96 (Jakub), 0.97 (Emil), 0.98 (founder-taste, Kaching). All inside Emil's 0.95-0.98 band; the engine uses 0.98 for hero CTAs. [engine note] use 0.97 for dense app UI buttons and 0.98 for marketing CTAs; record in DIRECTION.md if different.
- **Stagger and enter values disagree.** Skill: 100ms, 300ms, y 12, blur 4. Jakub's site: 800ms, y 8, blur 8, `(0.25,0.46,0.45,0.94)`. Emil: 30-80ms. Kaching/kit: 70ms, 1.2s, y 28. The founder has approved the Kaching variant for heroes and rejected the same stagger repeated on every brand ("noobish"); so these numbers are for in-app first-load panels and secondary blocks, and the hero stays a per-brand concept.
- **"Under 300ms" vs hero.** Both authors exempt marketing/explanatory motion. Engine hero entrances run over 1s deliberately; keep copy readable by ~300ms per the kit's own discipline.
- **Hover on rows.** Emil: tens/day = remove or drastically reduce; Jakub: up to 150ms colour. The engine's earlier rule says <=100ms. Use 100ms in dense lists, 0ms in keyboard-driven lists.
- **Easing choice.** better-ui mostly writes plain `ease-out`; Emil insists on stronger custom curves and calls built-ins too weak. For a premium feel prefer the strong curves (the kit's `outQuint` is within a hair of Emil's). Jakub's `(0.2,0,0,1)` is a soft, long-tail curve intended for icon crossfades.
- **Reduced motion.** better-ui: replace with opacity fade, "never remove instantly". Emil: fewer and gentler, not zero. Compatible. better-accessibility adds that spinners and press feedback stay.
- **Motion library performance claim is contested.** Emil says `x`/`y`/`scale` shorthands are main-thread rAF and drop frames under load; Jakub's motion-gestures page says Motion animates `transform`, `clipPath` and `filter` on the compositor like CSS, almost identically. [engine note] Modern Motion only accelerates opacity, clip-path, filter and a full `transform` string via WAAPI, not independent transform shorthands; verify with a throttled trace before rewriting `Reveal`/`Word`.
- **Borders vs shadows.** better-ui itself keeps borders for dividers, table cells, selected states and inputs; in forced-colors a shadow-only ring disappears. The engine's `--shadow-ring` already follows the shadow-ring pattern; add the transparent border.
- **Pure-black shadow colour vs tinted.** better-ui uses neutral black/white alpha so shadows adapt to any background. The engine's rings use ink-tinted rgba (`rgba(23,23,23,.07)`); acceptable on a neutral canvas, but over photos or coloured surfaces switch to pure black alpha.
- **Concentric radius cutoff.** Past about 24px of padding, or with asymmetric padding, do not force concentric radii; keep each layer's token radius.
- **Blur is both a recipe and a last resort.** better-ui uses 4px blur systematically in enter/exit; Emil treats blur as a fix of last resort at 2px. Fine on short text, expensive on large surfaces (Safari).
- **Polish never outranks interaction.** A beautiful animation on a control that cannot be interrupted, or a hover that sticks on touch, is a HIGH finding even if the polish is perfect.
- **Skills include a mandatory-first-response quirk.** emil-design-eng instructs "respond only with" a fixed greeting when invoked without a question, and forces a strict table review format; harmless, but the main session should know it is part of the skill.

## 6. Figures worth keeping

No figures (text-only repos). The code recipes worth copying verbatim into the engine kit (they are MIT licensed): `surfaces.md` shadow variables, `animations.md` theme-transition suppression component and `@media (prefers-reduced-motion: no-preference)` pattern, `icon-transitions.md` grid-stacked CSS cross-fade, `enter-exit.md` `@starting-style` popover.

## 7. Open questions

- Whether the 13 skills in Marcel's boilerplate include better-ui and which siblings; the Kargul profile says "mostly from jakubkrehel/skills" without listing. Check the `.agents/skills` folder in his repos if still visible.
- Jakub's `less-is-more` says it lists "principles of working with agents" but the extracted text contained no list; may be client-rendered. Not verified.
- Emil's "animations on the web" course (animations.dev) content is paid; only the free preview/tips were read. Sonner/Vaul principle detail is already in `craft-emil-kowalski.md`.
- better-ui values were checked against the repo at `main` pushed 2026-10-06; the skills.sh page shows the same SKILL.md. Later pushes may change numbers.
- The Motion-library compositor claim conflict (section 5) needs a measured trace.
- `jakub.kr/writing` listing returned 404; articles were found from the homepage links (`/writing/details-that-make-interfaces-feel-better`, `/writing/less-is-more`, `/writing/the-invisible-side-of-design-engineering`, `/work/*`).

## 8. How the engine should use these skills

Compared against `system/kits/product-hero/GUIDE.md`, `template/src/motion.ts`, `template/src/kit.tsx`, `template/src/index.css`, and `knowledge/founder/founder-taste.md`.

**What already matches (keep):** concentric `Frame` (outer = inner + pad); strong ease-out family (`outQuint` ~ Emil's); `MotionConfig reducedMotion="user"` + `useReducedMotion()` for loops; `tabular-nums` on `CountUp`; `-webkit-font-smoothing: antialiased` on body; `:focus-visible` outline with offset; named-property transitions (`transition-colors`, never `all`); shadow-ring tokens; pointer-events rule for header/main layers (hit-area "decorative layers" rule); looping elements start invisible.

**Gaps and concrete changes (ordered by value):**

1. **Press feedback is missing from the kit's CSS.** GUIDE says "presses scale to 0.98 in 220ms" but `.btn-ink` / `.btn-white` in `index.css` have no `:active` rule and `kit.tsx` has no `whileTap`. Add `transition-property: scale, background-color, box-shadow` and `.btn-ink:not(:disabled):active, .btn-white:not(:disabled):active { scale: 0.98 }` (0.97 for app-density buttons), with a `data-static` opt-out. Changes: `index.css`, GUIDE.
2. **Blur ignores reduced motion.** `reveal(..., {blur:true})` and `Word` animate `filter` even under `MotionConfig reducedMotion="user"`. Gate blur on `useReducedMotion()` (return opacity-only transitions). Changes: `motion.ts`/`kit.tsx`.
3. **Hover without hover-capability.** `PillNav` uses `onMouseEnter`/`onFocus`; on touch the pill latches. Use `onPointerEnter` filtered by `pointerType === 'mouse'` (or `matchMedia('(hover: hover)')`), and wrap CSS hovers (`.btn-white:hover`) in `@media (hover: hover)`. Changes: `kit.tsx`, `index.css`.
4. **`scale: 0` entries.** `Route` end-node and `Rails` nodes start at `scale: 0`. Change to 0.6 + opacity (the pulse already starts at 0.6) or document the exception. Changes: `kit.tsx`.
5. **Shadow ring details.** Rings in `index.css` are ink-tinted and borderless. Add `border: 1px solid transparent` (or a `--shadow-ring-*` variant with `border-color: transparent`) on ring components; add a dark-mode ring token (`0 0 0 1px rgba(255,255,255,.08)`, hover .13) for dark builds; consider switching to pure black alpha for rings that sit on imagery. Add the image-outline token `--image-outline: oklch(0 0 0 / .1)` with `outline-offset:-1px`, and apply it in hero collages/photos. Changes: `index.css`, `Frame` inner.
6. **Exit and in-app first-load recipes are not in the kit.** Add `motion.ts` tokens: `exit = { duration: .15, y: -12, blur: 4, ease: ease-out }`, `enterApp = { duration: .3, y: 12, blur: 4, stagger: .1 }` and an `iconSwap` spring (`duration: .3, bounce: 0`, scale .25 -> 1, blur 4 -> 0) plus a CSS twin. Product UI inside heroes (toggle buttons, copy/copied, play/pause) should use these.
7. **Springs in duration/bounce form.** `spring` is stiffness 420/damping 36. Add `springSoft = { type:'spring', duration: .3, bounce: 0 }` and keep the existing for `layoutId` pills. Changes: `motion.ts`.
8. **Easing set.** Keep Kaching curves; add Emil's `drawer (0.32,0.72,0,1)` and `inOutStrong (0.77,0,0.175,1)` to `ease`, and note the near-equivalence of `outQuint` to Emil's `(0.23,1,0.32,1)`. Changes: `motion.ts`, `knowledge/web/motion-tokens.json`.
9. **Typography details.** `App.tsx` h1 lacks `text-wrap: balance`; subtitle lacks `text-wrap: pretty`. Add `h1,h2,h3{text-wrap:balance} p{text-wrap:pretty}` to the base layer. Add `font-variant-numeric: tabular-nums` to dashboard KPI/table cells in templates. Changes: `index.css`.
10. **Hit areas and overlays.** Add a `.hit-44::after` utility (centred 44px pseudo-element) for small icon buttons and checkboxes in dashboard mock UI, and `overscroll-behavior: contain` on any overlay panel. Add `scroll-padding-top` equal to the nav height on `html`. Changes: `index.css`.
11. **Motion-library performance check.** Run a throttled trace of the hero load; if `Word`/`Reveal` (which animate `y`/`scale`/`filter` via Motion shorthands) drop frames, port them to CSS keyframes or WAAPI with full `transform` strings. Do this before the next hero (it affects LCP and INP). Changes: `kit.tsx` (conditional).
12. **Theme switch.** For dark/light builds, include the `DisableThemeTransitions` effect (or `next-themes disableTransitionOnChange`). Changes: add to kit when a build has a theme toggle.
13. **Hierarchy of motion rules.** Add a short "Frequency & purpose gate" step to the pipeline in `CLAUDE.md` and DIRECTION.md template: for each motion state purpose + frequency band (section 2.1). It also supports the founder's "no generic load-in parade" rule.
14. **Checker additions (`tools/check.mjs` and `tools/thresholds.json`).** Mechanical, from the detection table: fail `transition: all`/`transition-all`; warn `ease-in` on UI; warn `scale(0)`/`scale-0` initial; warn press scale <0.95 or on disabled; warn `bounce` != 0; warn `animation:` inside toggled classes; warn animated `filter`/`transform` without a reduced-motion gate; warn `:hover` outside `@media (hover:hover)` (plain CSS); warn `will-change: all`; warn hex `fill`/`stroke` in inline SVG icons; warn `overflow:auto` overlays without `overscroll-behavior`; info on missing `text-wrap` for `h1`; info on non-`tabular-nums` numeric cells; report image outline colour not black/white alpha.
15. **Conflicts to resolve with the founder before codifying:** press scale (0.98 vs 0.97), hero stagger (70ms vs 100ms vs 80ms), and whether dense in-app hover colour should be 100ms or none. Default to existing founder-taste values; add skill values only for app UI.
16. **Install decision (for the main session).** Both repos are MIT. The Claude environment already lists `emil-design-eng`, `animation-vocabulary`, `apple-design` and `make-interfaces-feel-better` (the Jakub details skill, an older packaging), so better-ui may be the only real addition. Installing adds an agent-facing review table format; vendoring this note into the engine gives the same numbers to `select_rules.py` without the greeting quirk. Recommendation: vendor the rules (this file) and optionally install `better-ui` for review runs; skip a second copy of Emil's skill if `emil-design-eng` is already available.

### Install and licence facts

| Skill | Source repo | Licence | skills.sh install command | Installs / stars shown |
|---|---|---|---|---|
| better-ui | github.com/jakubkrehel/skills (`skills/better-ui`) | MIT (GitHub API `spdx_id: MIT`, LICENSE file present) | `npx skills add https://github.com/jakubkrehel/skills --skill better-ui` (whole pack: `npx skills add jakubkrehel/skills`; Claude Code plugin: `/plugin marketplace add jakubkrehel/skills` then `/plugin install interfaces@interfaces`) | 33.4K installs, 7.6K stars, first seen 2026-07-10, Gen Agent Trust Hub / Socket / Snyk: Pass |
| emil-design-eng | github.com/emilkowalski/skills (`skills/emil-design-eng`) | MIT (GitHub API `spdx_id: MIT`, LICENSE file present) | `npx skills add https://github.com/emilkowalski/skills --skill emil-design-eng` | 335.5K installs, 44.4K stars, first seen 2026-03-16, audits: Pass |
