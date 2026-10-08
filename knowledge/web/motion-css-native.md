---
source: web:https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style ; https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear ; https://developer.chrome.com/docs/css-ui/scroll-driven-animations ; https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using ; https://developer.chrome.com/docs/web-platform/view-transitions ; https://web.dev/articles/animations-guide ; https://www.joshwcomeau.com/animation/css-transitions/
chapter: CSS-native motion - transitions, keyframes, @starting-style, linear(), scroll-driven animations, View Transitions, performance
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [css, transitions, keyframes, starting-style, linear-easing, scroll-driven-animations, view-transitions, interpolate-size, will-change, compositor]
status: studied
---

# CSS-native motion

Support facts are as read on 2026-10-08. Always wrap newer features in `@supports` and make the no-support state a complete, static, correct design.

## 1. Core ideas

1. **Transitions for state changes, keyframes for staged one-shots.** Transitions retarget mid-flight (interruptible); keyframes restart from zero. Use transitions for anything the user can trigger rapidly (toasts, toggles, hover). (Emil, verified)
2. **`@starting-style` + `transition-behavior: allow-discrete` + `overlay`** now let pure CSS animate entering/leaving of `display:none`, popover and `<dialog>` top-layer elements. **Baseline 2024 / newly available** for `@starting-style` (MDN). It replaces the React `useEffect(() => setMounted(true))` pattern. (verified)
3. **`linear()`** easing (Baseline widely available since Dec 2023, MDN) approximates springs/bounces in plain CSS by listing sampled points. A CSS spring has a fixed duration and cannot inherit velocity (not interruptible like a real spring), so use it for non-gesture UI springs only.
4. **Scroll-driven animations** (`animation-timeline: scroll()|view()`, `animation-range`) run off the main thread. Chrome/Edge 115+, Safari 26+; **Firefox stable does not ship it** (still behind `layout.css.scroll-driven-animations.enabled` at Firefox 152 per caniuse-derived reporting June 2026; on in Nightly). Treat as progressive enhancement. MDN marks `animation-timeline` "Limited availability".
5. **View Transitions API**: same-document `document.startViewTransition()` (Chrome 111, Edge 111, Safari 18, Firefox 144) and cross-document `@view-transition { navigation: auto }` (Chrome 126, Edge 126, Safari 18.2, no Firefox). Snapshots old/new state, animates pseudo-elements with CSS. Unique `view-transition-name` per element. (Chrome docs, verified)
6. **Only `transform` and `opacity` stay on the compositor** (plus `filter`/`clip-path` in some engines and in scroll timelines). Animating `top/left/width/height/margin/padding` triggers layout and paint every frame. (web.dev, verified)
7. **Individual transform properties** (`translate`, `scale`, `rotate`) animate independently, so one transition can drive scale while another drives translate without clobbering. Tailwind's `transition-transform` covers `transform, translate, scale, rotate`. (make-interfaces-feel-better skill, verified)

## 2. Rules

### 2.1 Transitions and keyframes

- **RULE** List properties explicitly. Never `transition: all` (and never `transition-property: all` via utility classes).
  **Why** Unexpected properties (width, filter, color from a later rule) start animating; also hides cost. **Applies to** all. **Check** grep `transition:\s*all|transition-all`. **Source** Vercel Web Interface Guidelines; Josh Comeau (verified)
```css
.btn {
  transition:
    transform 160ms var(--ease-out),
    background-color 150ms ease,
    box-shadow 150ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .btn:hover { background-color: var(--accent-hover); }
}
.btn:active { transform: scale(0.97); }
```
- **RULE** Keyframe animations that should hold their end state need `animation-fill-mode: both` (or `backwards` for delayed starts); otherwise the element is fully visible during `animation-delay`.
  **Why** Without `backwards`, the base styles show during the delay and the element flashes then animates. **Check** any `animation-delay` on an entering element must come with fill-mode `backwards|both`. **Source** joshwcomeau.com/animation/keyframe-animations (verified)
- **RULE** Put per-element variation in custom properties, not duplicated keyframes: `animation-delay: calc(var(--i) * 60ms)`, `--bounce-height`. Keep keyframes generic and reusable; keyframe names are global.
```css
@keyframes rise-in { from { opacity: 0; transform: translateY(var(--rise, 16px)); } }
.reveal > * { animation: rise-in 600ms var(--ease-out-expo) both; animation-delay: calc(var(--i, 0) * 80ms); }
```
  (React: `style={{ "--i": index } as React.CSSProperties}`.) Cap `--i` at ~8 [engine note].
- **RULE** Timing functions in keyframes apply per segment, not to the whole animation (use `linear` for spinners; set easing on each keyframe if shaping a multi-step path). `alternate` halves keyframe work for back-and-forth. (Josh Comeau, verified)
- **RULE** Delay-on-leave trick for hover menus: 300ms `transition-delay` on the hidden state, 0 on the shown state, so diagonal mouse travel toward a submenu does not close it.
```css
.dropdown { opacity: 0; transition: opacity 400ms; transition-delay: 300ms; }
.wrapper:hover .dropdown { opacity: 1; transition: opacity 100ms; transition-delay: 0ms; }
```
  **Source** joshwcomeau.com/animation/css-transitions (verified)
- **RULE** Don't let the animated element be its own hover trigger when it moves away from the cursor (flicker loop). Hover the stationary parent, transform the child.
  **Source** Josh Comeau "doom flicker" (verified)
- **RULE** Set `transform-origin` deliberately (trigger-anchored for popovers; `center` for modals). For SVG, put transforms on a `<g>` wrapper with `transform-box: fill-box; transform-origin: center`. **Source** Emil; Vercel guidelines (verified)

### 2.2 @starting-style, discrete transitions, top layer

- **RULE** Order matters: a standalone `@starting-style` block has the same specificity as the rule it modifies and must come **after** it; nested form is `selector { @starting-style { ... } }`. It applies only to CSS transitions (CSS animations don't need it). It supplies "from" values on first render and on `display:none` -> visible. It is **not** used on the way out; exit goes to the element's default state, so entry/exit can differ.
- **RULE** To animate exit of `display` or top-layer elements, transition `display` and `overlay` with `allow-discrete` (shorthand `transition: all 0.7s allow-discrete` also works).
  **Why** Without `overlay` the element leaves the top layer immediately, so the exit looks broken. **Check** popover/dialog exit works: close it and watch it fade rather than vanish. **Source** MDN @starting-style (verified)
```css
/* Popover / dialog entry+exit in pure CSS  (MDN pattern, tuned to our tokens) */
[popover], dialog {
  opacity: 0; transform: scale(0.96);
  transition:
    opacity 150ms var(--ease-out),
    transform 150ms var(--ease-out),
    overlay 150ms allow-discrete,
    display 150ms allow-discrete;
}
[popover]:popover-open, dialog[open] {
  opacity: 1; transform: scale(1);
  transition-duration: 200ms;           /* enter slower than exit */
}
@starting-style {
  [popover]:popover-open, dialog[open] { opacity: 0; transform: scale(0.96); }
}
[popover]::backdrop, dialog::backdrop {
  background-color: transparent;
  transition: background-color 200ms, overlay 200ms allow-discrete, display 200ms allow-discrete;
}
[popover]:popover-open::backdrop, dialog[open]::backdrop { background-color: rgb(0 0 0 / 0.25); }
@starting-style {
  [popover]:popover-open::backdrop, dialog[open]::backdrop { background-color: transparent; }
}
```
  (MDN notes nesting with `&` is not supported for pseudo-elements, so the backdrop starting style is a standalone block.) The `dialog[open]` selector is the MDN dialog pattern; not re-fetched this session.
- **RULE** Base UI / Radix components expose `data-starting-style`, `data-ending-style`, `data-instant`, `--transform-origin`; use those instead of re-implementing. (verified)
```css
.tooltip { transition: transform 125ms ease-out, opacity 125ms ease-out; transform-origin: var(--transform-origin); }
.tooltip[data-starting-style], .tooltip[data-ending-style] { opacity: 0; transform: scale(0.97); }
.tooltip[data-instant] { transition-duration: 0ms; }
```
- **RULE** Animating to `height: auto`: set `interpolate-size: allow-keywords` on `:root` and transition `height` between a length and `auto|max-content|fit-content`; one end must be a length. MDN status: **Experimental / limited availability**, so provide a fallback (instant change, or `grid-template-rows: 0fr -> 1fr` trick [engine note, unverified here]).
```css
:root { interpolate-size: allow-keywords; }
.panel { height: 0; overflow: clip; transition: height 220ms var(--ease-out); }
.panel[data-open] { height: auto; }
```

### 2.3 linear() springs and bounces

- **RULE** Generate `linear()` springs from physics rather than hand-typing; keep ~20-40 points; first point `0`, last `1`; values may exceed 1 for overshoot; percentages must ascend. Use Jake Archibald's generator (linear-easing-generator.netlify.app) or sample your own spring. Fixed duration = settle time.
  **Source** MDN linear() (verified syntax); generator named by MDN. The three curves below were generated for this file by sampling the same mass-spring model (stiffness/damping, mass 1) at 21 points; check visually before shipping.
```css
:root {
  /* ~209ms, zeta 0.9, no visible overshoot  == M3 "standard default spatial" (k700, c47.6) */
  --spring-snappy: linear(0, 0.034, 0.114, 0.216, 0.325, 0.432, 0.531, 0.619, 0.696, 0.76, 0.814, 0.856, 0.891, 0.919, 0.941, 0.957, 0.97, 0.98, 0.987, 0.992, 1);
  --spring-snappy-duration: 210ms;
  /* ~400ms, zeta 0.7, peak 1.045 (Motion visualDuration .3 / bounce .3) */
  --spring-bouncy: linear(0, 0.053, 0.176, 0.331, 0.489, 0.636, 0.76, 0.859, 0.933, 0.985, 1.018, 1.036, 1.044, 1.045, 1.041, 1.035, 1.028, 1.021, 1.014, 1.009, 1);
  --spring-bouncy-duration: 400ms;
  /* ~570ms, zeta 1.0 (Motion visualDuration .4 / bounce 0) */
  --spring-gentle: linear(0, 0.057, 0.176, 0.312, 0.443, 0.559, 0.657, 0.736, 0.8, 0.849, 0.887, 0.916, 0.938, 0.954, 0.966, 0.975, 0.982, 0.987, 0.99, 0.993, 1);
  --spring-gentle-duration: 570ms;
}
.card { transition: transform var(--spring-snappy-duration) var(--spring-snappy); }
```
  **Why** Real springs (Motion) keep velocity on interruption; this does not. Use for static hover/entry states, not drag release. **Check** `linear(` used on transitions that can be interrupted by gesture => switch to Motion.
- **RULE** Fallback: declare a `cubic-bezier` `transition` first, then override inside `@supports (transition-timing-function: linear(0, 1))` if you need to guard older engines (support is widely available since Dec 2023, so usually unnecessary).

### 2.4 Scroll-driven animations (Chrome/Edge 115+, Safari 26+)

- **RULE** Timelines: `scroll(<scroller> <axis>)` with scroller `nearest|root|self`, axis `block|inline|x|y`; `view(<axis> <inset>)` for an element's progress through its scrollport. Named: `scroll-timeline-name`/`view-timeline-name: --x` + `animation-timeline: --x`; `timeline-scope` hoists names to an ancestor (support lagged: Chrome 116 flag at first).
- **RULE** `animation-duration` must be `auto` (the default in the shorthand when omitted; if you set it for the fallback, scroll-driven code needs `auto`/`1ms` per MDN's example); **declare `animation-timeline` after the `animation` shorthand** because the shorthand resets it to `auto`.
- **RULE** Use `animation-range` to define the active window: names `cover | contain | entry | exit | entry-crossing | exit-crossing` (plus offsets: `entry 0% cover 40%`, `entry 10% exit -25%`). A bare name means 0%-100% of that range. Use `animation-fill-mode: both` to hold styles outside the range.
  **Source** MDN animation-range/animation-timeline; Chrome docs (verified)
```css
/* Scroll progress bar */
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.progress { transform-origin: 0 50%; animation: grow linear both; animation-timeline: scroll(root block); }

/* Reveal as the element enters the viewport: runs once from entering to 40% covered */
@keyframes reveal { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 35%; }
  }
}
```
  Scrubbed animations use `linear` (the scroll position is the easing); easing here only shapes the response to the scroll position. View ranges use the untransformed principal box, so `transform` doesn't change range calculation and cannot cause flicker. (Chrome docs, verified)
- **RULE** No-support state (Firefox stable): the `.reveal` element must be visible and in place (the snippet only sets `animation` inside `@supports`). Never ship a pattern where JS-less/unsupported browsers see `opacity:0`.
- **RULE** Animate only `transform`/`opacity` (and `clip-path`/`filter` sparingly) with scroll timelines, to stay compositor-driven.
- JS: `new ScrollTimeline({ source: document.documentElement, axis })`, `new ViewTimeline({ subject, axis, inset })`, `el.animate(kf, { timeline, rangeStart: "entry 25%", rangeEnd })`.

### 2.5 View Transitions

- **RULE** Same-document: feature-detect, then wrap the DOM update. If page visibility is `hidden` the transition is skipped. Duplicate `view-transition-name` values at once reject `ready` and skip the transition.
```js
function go(update) {
  if (!document.startViewTransition) return update();
  document.startViewTransition(() => update());
}
```
  (React: wrapping `flushSync` for the DOM update is the usual companion; or use React's `<ViewTransition>` inside `startTransition`, see `motion-library-react.md`/React docs where `enter/exit/update/share/default` props map to CSS classes and React does NOT auto-handle reduced motion.)
- **RULE** Default animation is cross-fade + smooth geometry; customise with `::view-transition-group(name)`, `-image-pair`, `-old`, `-new`. Targeting `*` styles all snapshots. Keep durations to the motion tokens: 250-350ms for route changes.
```css
@keyframes fade-in  { from { opacity: 0; } }
@keyframes fade-out { to   { opacity: 0; } }
::view-transition-group(root) { animation-duration: 280ms; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
::view-transition-old(root) { animation: 140ms ease-in both fade-out; }
::view-transition-new(root) { animation: 280ms var(--ease-out) both fade-in; }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```
  The reduced-motion block is my application of React's documented approach (their docs set `animation: none` under the media query) [engine note: for a minimal-change variant keep a crossfade only].
- **RULE** Cross-document (MPA): add `@view-transition { navigation: auto; }` on both pages (same origin). Name shared elements in `pageswap` (outgoing) and `pagereveal` (incoming), and **clear the names afterwards** (`await e.viewTransition.finished`) so bfcache back-navigation doesn't produce duplicate names. For stable first frames use render blocking: `<link rel="expect" href="#lead-content" blocking="render">` and `<script blocking="render">` in `<head>`, optionally with `media` per viewport. `PageSwapEvent.activation` is `null` if the redirect chain includes a cross-origin URL.
  **Source** MDN Using View Transitions (verified)
- **RULE** Custom JS animation on the pseudo-elements (e.g., circular reveal for theme toggle) requires `transition.ready.then(() => documentElement.animate({ clipPath: [...] }, { duration, easing, pseudoElement: "::view-transition-new(root)" }))` and neutralising the default (`animation: none; mix-blend-mode: normal; display: block` on old/new; `isolation: auto` on image-pair).
- **RULE** Use shared-element names for hero image -> detail, nav indicator, grid filter reorder; otherwise stay with root cross-fade. Don't name 100s of elements (each is a snapshot).
- Transition **types** (`transition.types`, `:active-view-transition-type()`) and `view-transition-class` exist for per-direction animation (React's `ViewTransition` maps them); not read in detail this session, see 7.

### 2.6 Performance (CSS side)

- **RULE** Animate `transform`/`opacity` only. If a layout property must change (accordion height), prefer `interpolate-size` / grid-rows trick, contain the subtree (`overflow: clip`, `contain: layout paint`), and keep it short.
  **Why** 60fps = 16.6ms budget; layout+paint each frame blows it. web.dev measured a `top/left` example at 37ms rendering and 50% dropped frames vs 0 and ~1% for `transform`. **Check** Chrome DevTools Performance: Rendering time in summary should be ~0; Rendering tab "Frame Rendering Stats"; Paint flashing. **Source** web.dev/articles/animations-guide (verified)
- **RULE** `will-change`: only on elements that are about to animate and only when you've observed first-frame stutter; values limited to `transform`, `opacity`, `filter`; never `will-change: all`. For occasional animations, set it just before via JS and remove after; keep it permanently only for always-changing elements. Each promoted layer costs GPU memory (matters on low-end phones).
  **Source** web.dev; Josh Comeau; make-interfaces-feel-better (verified)
- **RULE** CSS variables inherit: updating a custom property on a container (e.g., `--swipe-amount` on a drawer root) invalidates style for all descendants; write `transform` on the specific element instead.
  **Source** Vaul article/Emil (verified)
- **RULE** Blur: <=20px, short-lived; heavy blur/backdrop-filter animation is expensive, especially in Safari. `filter: blur(2px)` crossfade masking is fine. **Source** Emil (verified)
- **RULE** Prefer CSS/WAAPI for predetermined animations (off-thread), JS for dynamic/interruptible ones. WAAPI snippet with `fill: "forwards"` and a custom easing string is hardware accelerated for compositor properties:
```js
el.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }],
  { duration: 600, fill: "forwards", easing: "cubic-bezier(0.77, 0, 0.175, 1)" });
```
- CSS property cost cheat sheet [engine note, from the well-known CSS Triggers model; not fetched]: composite-only = `transform`, `opacity` (and `translate/scale/rotate`); paint-only = `color`, `background-color`, `box-shadow`, `border-radius`, `outline`, `visibility`; layout+paint = `width/height/top/left/margin/padding/font-size/border-width/flex-basis`. Josh Comeau also ranks `background-color` as moderately expensive and `height` as to-avoid (verified).

### 2.7 Clip-path reveals and press-and-hold

- **RULE** `clip-path: inset(top right bottom left)` is a high-quality animatable reveal (hold-to-delete overlay: press 2s `linear`, release 200ms `ease-out`; image reveal on scroll from `inset(0 0 100% 0)`; comparison slider; tabs with duplicated "active" layer clipped to the active tab for perfect colour transitions). (Emil skill, verified)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Hover color transition | 120-150ms `ease` | engine default; Josh: 250ms baseline example |
| Hover-in / hover-out (landing lift) | 125ms / 450ms | Josh Comeau |
| Leave delay for submenus | 300ms | Josh Comeau |
| Tooltip | 125ms ease-out, scale 0.97 | Emil |
| Popover | 150-200ms in, 100-150 out | Emil/NN/g |
| Hold-to-confirm | 2s linear press, 200ms ease-out release | Emil |
| Skeleton shimmer | 1.5-2s linear loop | engine |
| View transition (route) | 250-350ms | engine |
| Frame budget | 16.6ms @60Hz | Josh Comeau |
| Browser support (as read) | `@starting-style` Baseline 2024; `linear()` widely available (Dec 2023); same-doc VT Chrome 111/Safari 18/Firefox 144; cross-doc VT Chrome 126/Safari 18.2/no Firefox; scroll-driven Chrome 115/Safari 26/Firefox flag; `interpolate-size` limited, experimental | MDN, Chrome docs, caniuse report |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| `transition-property` list + `@starting-style` for entry | `useEffect` mount flag + `transition: all` |
| `@media (hover:hover) and (pointer:fine)` around hover transforms | Hover scale on touch (sticky hover after tap) |
| `animation-timeline` declared after `animation` shorthand | Shorthand after longhand (timeline resets to `auto`) |
| Scroll reveal inside `@supports` + `prefers-reduced-motion: no-preference` | `opacity:0` baseline relying on animation support |
| Clear `view-transition-name` after pageswap/pagereveal | Leave names set; bfcache back nav silently skips transition |
| `overlay` + `display` `allow-discrete` for popover exit | Exit animation that never plays because top-layer element disappears |
| `transform: translateY(100%)` for off-canvas | `translateY(-340px)` hardcoded |

## 5. Exceptions & judgement calls

- **CSS spring vs real spring.** `linear()` is great for hover/enter states; Motion/WAAPI + velocity for drag/interrupt.
- **View transitions vs component animation.** Root cross-fade with 250ms is cheap polish; shared-element morphs add snapshots (cost) and can fight with sticky/fixed headers (give the header its own `view-transition-name` to keep it static).
- **Scroll-driven CSS vs Motion/GSAP.** CSS is smoother and cheaper but unsupported in Firefox stable; if Firefox parity matters and the effect is essential, use Motion `useScroll` or GSAP ScrollTrigger and treat CSS as an enhancement elsewhere.
- **`transition-delay` for "intent" (menus)** adds latency to close; balance 300ms (Josh) vs 100-150ms for tighter UIs [engine note].

## 6. Figures worth keeping

n/a.

## 7. Open questions

- `interpolate-size` per-browser versions (MDN table truncated), `view-transition-class` and `transition.types` support, and whether Firefox has since shipped scroll-driven animations (>152) were not confirmed.
- `dialog[open]` entry/exit pattern is from MDN's dialog page, not re-fetched; test in Safari (top-layer transition support lagged historically).
- WebKit bug 266835 (dvh causes scroll jank, status NEW at capture) matters for pinned full-height stages; re-check.
- The `animation-duration: auto` rule: Chrome docs say scroll-driven animations need `auto` duration; MDN's example uses `1ms` for a fallback. Both appear in the wild; test.
