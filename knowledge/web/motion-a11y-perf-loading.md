---
source: web:https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html ; https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html ; https://web.dev/articles/prefers-reduced-motion ; https://www.joshwcomeau.com/react/prefers-reduced-motion/ ; https://web.dev/articles/inp ; https://www.nngroup.com/articles/skeleton-screens/ ; https://web.dev/articles/animations-guide
chapter: Accessibility (reduced motion, vestibular, WCAG), performance (jank, layout thrash, INP), loading and optimistic UI, scroll storytelling, page-load orchestration
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [accessibility, prefers-reduced-motion, wcag, vestibular, performance, inp, jank, skeleton, optimistic-ui, loading, scrollytelling, page-load, landing-page]
status: studied
---

# Motion: accessibility, performance, loading, scroll storytelling, page-load orchestration

## 1. Core ideas

1. **Reduce, don't remove.** `prefers-reduced-motion: reduce` means "minimize movement", not "kill every state change". Replace translate/scale/parallax with opacity/color; keep functional feedback. (web.dev; Apple HIG; Josh Comeau: "motion-free alternatives")
2. **Two authoring approaches.** *Reduce approach*: animate by default, switch off under `reduce`. *No-preference approach*: animate only inside `@media (prefers-reduced-motion: no-preference)`; users who opted out and browsers without the query get the static design. web.dev and Josh Comeau recommend the latter as the more considerate default. (verified)
3. **Don't blanket-kill.** A global `* { transition-duration: 0.01ms !important }` removes harmless motion and makes JS-driven springs *faster*. Prefer per-effect handling. (Josh Comeau, verified)
4. **WCAG levels.** 2.2.2 Pause, Stop, Hide (**A**): auto-starting moving/blinking/scrolling content that lasts >5s and sits alongside other content needs a pause/stop/hide mechanism, unless essential; auto-updating content needs control too (no 5s threshold). "Starts automatically" includes things triggered indirectly by hover, focus or scrolling into view. 2.3.3 Animation from Interactions (**AAA**): motion triggered by interaction must be disable-able unless essential; parallax is the canonical example; blur effects may count (errata). 2.3.1 Three Flashes (**A**): no more than 3 flashes per second (or below thresholds). (all verified)
5. **Main-thread discipline wins.** Compositor-only properties (`transform`, `opacity`), CSS/WAAPI for predetermined motion, Motion/GSAP for dynamic motion, never block input. INP good <=200ms, poor >500ms at p75. (web.dev, verified)
6. **Perceived speed is a motion problem.** Fast spinner = faster app (Emil); skeleton screens reduce perceived waiting when they mirror the layout; animations must never extend time-to-interactive.
7. **Scroll storytelling is the highest-risk motion pattern**: it combines parallax (vestibular), scroll hijacking (control), pinning (mobile viewport units), and heavy main-thread JS. Enhance native scroll, never replace it.
8. **Landing-page entrance is a performance budget decision**, not just choreography: a hero that starts only after hydration, or hides the LCP element until JS runs, makes the page feel slower and measures slower.

## 2. Rules

### 2.1 Reduced motion and vestibular safety

- **RULE** Implement reduced motion at three layers: CSS (`@media`), JS libs (`MotionConfig reducedMotion="user"`, `useReducedMotion`, `gsap.matchMedia`), and media (autoplay video/Lottie/GIF).
  **Why** CSS media queries don't affect JS-driven animation; web.dev: "For JavaScript animations you must listen for changes yourself". **Applies to** all. **Check** emulate `prefers-reduced-motion: reduce` (DevTools Rendering panel, or Command Palette; resets when DevTools closes) and walk every page: no slide/scale/parallax/autoplay remain. **Source** web.dev, Josh Comeau (verified)
- **RULE** Behaviour map under `reduce`:

| Normal | Under reduce |
|---|---|
| Slide / translate enter | Fade (opacity 0.2s) |
| Scale pop / bounce | None; opacity or color change only |
| Parallax, scroll-linked transform | Static (set `y: 0`) |
| Scroll-driven pinned story | Stacked static layout (all content visible) |
| Stagger cascade | Single group fade, no delays |
| Route view-transition | Crossfade only or none |
| Infinite decorative loops, animated gradients, aurora backgrounds | Stop (static frame) |
| Skeleton shimmer | Static grey blocks or very slow opacity pulse |
| Spinner | Keep (essential progress), slow rotation fine |
| Auto-play video / GIF / Lottie | Poster frame, user-initiated play |
| `scroll-behavior: smooth`, smooth-scroll libraries | `auto` |
| Confetti / celebration | Static check + text |
| Counters ticking | Set final value |
  **Source** web.dev; Apple HIG (via mirrors); Motion docs; Vercel guideline "muted decorative loops must stop under prefers-reduced-motion" (verified). Table composition is [engine note].
- **RULE** Distance token trick: drive travel distances from a variable that collapses under reduce, so one keyframe serves both. [engine note]
```css
:root { --travel: 16px; --reveal-ms: 600ms; }
@media (prefers-reduced-motion: reduce) { :root { --travel: 0px; --reveal-ms: 200ms; } }
@keyframes rise { from { opacity: 0; transform: translateY(var(--travel)); } }
.hero > * { animation: rise var(--reveal-ms) var(--ease-out-expo) both; }
```
- **RULE** SSR-safe JS hook defaults to *reduced* on the server then corrects in an effect (Josh Comeau); in non-SSR apps read `matchMedia` synchronously. With Motion use `useReducedMotion()` (`boolean | null`).
- **RULE** Offer a site-level override where practical (Motion `reducedMotion={userSetting}`; GSAP `gsap.matchMediaRefresh()` after toggling).
- **RULE** Autoplaying/looping content longer than 5s next to other content needs a visible pause control (WCAG 2.2.2, Level A) regardless of OS setting; a mechanism that only stops while focused doesn't count; one control may serve the whole page. Preloaders can be "essential" when the user cannot interact during that phase.
  **Check** any `animation-iteration-count: infinite` / looping video outside a loading indicator => needs control or `reduce` stop. **Source** WCAG Understanding 2.2.2 (verified)
- **RULE** No flashing above 3 per second; avoid full-viewport strobe/fast alternating high-contrast transitions. **Source** WCAG 2.3.1 glossary summary via 2.2.2 page (verified)
- **RULE** Vestibular triggers to avoid or isolate: parallax (differential speeds), large zoom/scale, full-screen slides, scroll-jacking, spinning/rotating large elements, swim/wobble effects, auto-scrolling carousels. **Source** web.dev; WCAG 2.3.3; NN/g ("avoid flashing, parallax, scroll-jacking") (verified)
- **RULE** Motion is not the only information channel: pair with static cue; pair with focus management (focus moves to the new dialog/page heading regardless of animation). **Source** Apple HIG "optional"; make-interfaces-feel-better (verified)

### 2.2 Performance, jank, layout thrash, INP

- **RULE** Budget: 16.6ms/frame (60Hz), 8.3ms (120Hz) [engine note for 120Hz]. Profile with DevTools Performance (Summary > Rendering should be ~0 for transform-only animation) and the FPS meter ("Frames" ~99%). Check Paint flashing. **Source** web.dev (verified)
- **RULE** Eliminate layout thrash: never interleave DOM reads (`offsetWidth`, `getBoundingClientRect`, `scrollTop`, `getComputedStyle`) with writes in loops; batch reads, then writes, in `requestAnimationFrame`; use FLIP (First-Last-Invert-Play) rather than animating geometry (Motion `layout` and GSAP Flip do it). [engine note; standard practice, not fetched]
  **Check** DevTools Performance "Forced reflow" warnings; Long Animation Frames (LoAF).
- **RULE** Scroll handling: no `scroll`/`wheel` listeners that read layout; use `IntersectionObserver`, CSS scroll-driven animations, Motion `useScroll`/`inView`, or GSAP ScrollTrigger; mark listeners `passive`. [engine note]
- **RULE** Keep animation work off the main thread when the main thread is busy: during page load, hydration, route change, data fetch. CSS/WAAPI animations continue; rAF-driven JS animations drop frames (Emil: Vercel dashboard tab animation dropped frames during page loads until moved to CSS).
- **RULE** Responsiveness (INP): animation must not delay the next paint after input. INP measures worst interaction latency (input delay + handler + next frame) at p75: **good <=200ms, needs improvement 200-500ms, poor >500ms**. Long tasks delay event handling; don't start heavy JS animation setup inside click handlers; yield (e.g., `scheduler.yield()`), and don't gate UI updates on animation completion.
  **Check** field INP / CrUX; lab: DevTools "Interactions" track. **Source** web.dev/inp (verified; yielding advice per page links, not detailed)
- **RULE** Limit simultaneously animating elements and layers: large blurred/shadowed elements and many `will-change` layers consume GPU memory; test on a low-end phone. **Source** Josh Comeau, web.dev (verified)
- **RULE** Never delay interaction: elements must be clickable/focusable during their entrance animation (don't set `pointer-events:none` for the whole stagger). **Source** Emil: "never block interaction while stagger animations are playing" (verified)
- **RULE** No layout shift from motion: animate with `transform`; reserve space for skeleton->content swaps and image dimensions; `scrollbar-gutter: stable` (Motion layout docs). **Source** verified.

### 2.3 Loading, skeletons, optimistic UI

- **RULE** Pick the indicator by expected wait (NN/g): **<1s: nothing** (a flash of skeleton/spinner is worse); **2-10s**: spinner (single module/card) or skeleton (full-page); **>10s**: progress bar with duration estimate; process tasks (upload/convert) use progress bars. Don't use skeletons for non-page processes and never as a substitute for performance work. **Source** nngroup.com/articles/skeleton-screens (verified)
- **RULE** Skeletons mirror the real layout (header/footer-only frames are just spinners). Show only after a ~200-300ms grace period and keep at least ~400ms once shown, to avoid flash [engine note]. Shimmer: left-to-right linear gradient 1.5-2s loop (DoorDash example; NN/g warns pulse/shimmer can distract or cause a11y problems -> stop under reduce).
```css
.skeleton { background: linear-gradient(90deg, var(--sk-a) 25%, var(--sk-b) 50%, var(--sk-a) 75%); background-size: 200% 100%; }
@media (prefers-reduced-motion: no-preference) { .skeleton { animation: shimmer 1.6s linear infinite; } }
@keyframes shimmer { to { background-position: -200% 0; } }
```
  (animating `background-position` repaints; for many items animate a single transformed overlay instead [engine note]).
- **RULE** Content replacing skeleton: opacity cross-fade 150-200ms, same dimensions, no stagger, no slide. **Why** Replacement happens on every navigation; frequency rule. [engine note]
- **RULE** Spinners: fast rotation (~0.8-1s per turn) reads as faster loading (Emil: same load time, different perception). `linear`.
- **RULE** Optimistic UI: apply the change instantly (<100ms), mark it subtly pending only if latency can exceed ~1s, reconcile silently on success, and on failure revert with a visible, non-modal explanation (toast + restore); do not animate the success path beyond the normal state change. React 19: `useOptimistic`. [engine note]
```tsx
const [optimisticItems, addOptimistic] = useOptimistic(items, (state, next: Item) => [...state, { ...next, pending: true }]);
async function onAdd(next: Item) { addOptimistic(next); await save(next); }   // revert is automatic when the action settles
```
- **RULE** Progress that tracks reality: match animation duration to the real operation (upload animation duration matches file size, IxDF "Timing" principle). Fake progress bars that stall at 99% look cheap.
- **RULE** Button loading state: keep width (no layout shift), swap label for spinner with opacity/blur/scale (0.25->1, opacity 0->1, blur 4px->0, `spring duration .3 bounce 0`, per make-interfaces-feel-better) or keep label + inline spinner. **Source** make-interfaces-feel-better skill (verified)

### 2.4 Page-load orchestration for landing pages

[engine notes unless marked; the principles of staging/stagger/frequency are sourced in the hub]

- **RULE** Plan the load as a short, ordered sequence with one focal point at a time (Disney "staging"): (0) navigation and layout are static; (1) background/media settles (0-150ms); (2) eyebrow -> headline -> sub (80-100ms apart, 600-700ms each, `ease-out-expo`); (3) primary CTA; (4) hero visual; (5) secondary elements below the fold wait for scroll. Total <= ~1.2s to final state; user can interact at t=0.
- **RULE** Prefer **CSS keyframes (with `animation-fill-mode: both`) for the first-paint hero** over a hydration-dependent JS library: CSS runs before hydration and off the main thread, so it starts at first paint. Use Motion/GSAP for what happens after load (interaction, scroll, layout).
  **Why** Emil's observation that CSS beats JS animation while the page is busy; hydration-gated entrance makes content pop in late. **Check** Performance trace: first animation frame near FCP; no long task overlapping the entrance.
- **RULE** Do not hide the LCP element behind `opacity:0`: Chrome ignores `opacity:0` elements for LCP, so a 700ms fade-in on the LCP candidate is added to the metric. [engine note, based on the web.dev LCP definition, not fetched this session] Animate the LCP element with transform only (or a very short fade <=150ms), and animate the non-LCP supporting elements more freely.
- **RULE** SSR: render the *initial* hidden state in CSS/HTML only if the animation is guaranteed to run; otherwise render the final state and add motion as enhancement (no-JS and reduced-motion get the final state). `initial={false}` on `AnimatePresence`; Motion server-renders `initial` styles.
- **RULE** Wait for fonts before animating text (or `font-display: optional/swap` with size-adjusted fallbacks) so glyph reflow doesn't happen mid-animation; split by line/word, not by character, for headlines longer than ~3 words (per-character stagger at 30ms*40 chars = 1.2s). `document.fonts.ready`.
- **RULE** Run the hero entrance once per session/visit; skip on same-session repeat navigations (frequency rule). Reveal below-the-fold sections on scroll with `once`.
- **RULE** Keep total JS cost of motion libs in the budget: `LazyMotion` + `m` (~4.6kb) or CSS-only for marketing pages. GSAP core + ScrollTrigger only if scroll storytelling is the product.

### 2.5 Scroll storytelling pitfalls

Sources: search-result syntheses (tessl/skills pages, The Pudding responsive-scrollytelling process page), MDN/Chrome docs for APIs; the checklist is mostly [engine note].

- **RULE** Enhance native scroll, never replace it: keep the real scrollbar, wheel/trackpad speed, keyboard (Space/PgDn/arrows/Home/End), in-page anchors, find-in-page, back button, and focus-into-view working. If a smooth-scroll library is used, disable it under reduced motion and for keyboard focus jumps.
  **Check** Tab through the page: focus ring is never offscreen/hidden by a pinned layer; browser find works; `scroll-behavior`/lib off under `reduce`.
- **RULE** Every beat's content must be reachable without the animation: in reduced-motion, no-JS, and unsupported-browser states render a stacked static version. Never hide essential text behind scrubbed opacity.
- **RULE** One idea per scroll beat; pin length <= ~2 viewport heights per beat; total pinned journey short enough to scroll past in seconds; always provide a way to skip (anchor links, nav). Animation overload is the most common failure (distracting, slow, fatiguing).
- **RULE** Size sticky stages with `svh` (or `dvh`) with a `vh` fallback and test with the iOS address bar visible; `100vh` overflows the visible area on phones. WebKit bug 266835 (dvh scroll jank, NEW at capture) means test on a real iPhone; avoid `dvh` on elements that also use scroll-snap.
```css
.stage { height: 100vh; height: 100svh; position: sticky; top: 0; }
```
- **RULE** Scrub on `transform`/`opacity` only; prefer CSS scroll-driven animations or Motion `useScroll` (GPU `ScrollTimeline` path) or ScrollTrigger with `scrub: 0.5-1`; call `ScrollTrigger.refresh()` after fonts/images load; use `invalidateOnRefresh` for computed starts.
- **RULE** Parallax: small differential only (<= ~10-20% speed delta) on decorative layers, never on text or controls, off under `reduce` (WCAG 2.3.3 AAA calls it out). Mobile: usually remove.
- **RULE** Decide mobile strategy up front: keep the scroll interaction (consistent, works when transitions carry meaning) or stack content (The Pudding's two options). Phones have less perf headroom; test on real devices.
- **RULE** Scroll-snap: avoid `mandatory` on content taller than the viewport (traps users); use `proximity`.
- **RULE** Time content to reading speed, not scroll distance: text that disappears before it can be read at normal scroll speed is a failure; allow dwelling (no auto-advance).
- **RULE** Contrast over moving media must hold in every frame (check worst frame), text over video needs a scrim.

### 2.6 Testing recipes

- Slow motion: set durations x2-5, or DevTools Animations panel at 10% speed; frame-step. What looks wrong at 10% is subtly wrong at 100%. (Emil, make-interfaces-feel-better)
- Real devices for gestures and perf (Safari remote debugging / Xcode simulator second best).
- CPU 4x throttle + Slow 4G while loading the landing page; watch hero entrance, check INP interactions.
- Reduced motion emulation in DevTools; `forced-colors`; keyboard-only pass; screen-reader pass for focus after animated route/dialog changes.
- Review the next day with fresh eyes (Emil).
- Mechanical lint candidates: `transition:\s*all`, `scale\(0\)`, `ease-in` on enter, durations >300ms outside tokens, `infinite` without `reduce` guard, `will-change: all`, `bounce:\s*(0\.[4-9]|1)`, `animate=\{\{\s*(height|width|top|left|margin|padding)`.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| INP | good <=200ms; NI 200-500; poor >500 (p75, field) | web.dev |
| WCAG 2.2.2 | >5s auto-start moving content needs control (A) | W3C |
| WCAG 2.3.1 | <=3 flashes/second | W3C |
| WCAG 2.3.3 | interaction-triggered motion disable-able (AAA) | W3C |
| Skeleton/spinner thresholds | <1s none; 2-10s spinner/skeleton; >10s progress + estimate | NN/g |
| Reduced-motion fade | 0.2s opacity swap | Emil / Motion docs |
| Hero entrance total | <=1.2s (engine) | engine |
| Grace period before skeleton | 200-300ms (engine) | engine |
| Parallax delta | <=10-20% (engine) | engine |
| Pinned beat length | <=2 viewport heights (engine) | engine |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| `@media (prefers-reduced-motion: no-preference)` around decorative motion | Global `transition-duration: 0.01ms !important` kill switch |
| Hero in CSS keyframes, visible without JS | Hero hidden at `opacity:0` until hydration |
| Skeleton after 250ms, mirrored layout | Spinner for 300ms waits; header-only skeleton |
| Optimistic add with revert + toast | Blocking spinner for a like/toggle |
| Pinned story with stacked fallback | Pinned story as the only way to read content |
| `svh` stage + real-device test | `100vh` stage on iOS |
| Parallax on a decorative background only | Parallax on text blocks |
| `IntersectionObserver` / scroll timeline | `window.onscroll` reading `getBoundingClientRect` |

## 5. Exceptions & judgement calls

- **Spinners are usually exempt** from reduce-motion removal because progress indication is essential (WCAG 2.2.2 "preload animation can be essential"), but slow and simplify them.
- **Reduced motion vs brand experience**: awwwards-style sites commonly ignore it; the engine should not. If the concept depends on motion (a scroll film), deliver the reduced-motion variant as a designed alternative (stills + captions), not a broken page.
- **Blur and WCAG**: errata brought blurring into "motion animation" for 2.3.3; treat large animated blurs under `reduce` as motion.
- **Hover-intent delays** conflict with INP-style responsiveness; keep delay for tooltips only.
- **A faster skeleton exit vs layout stability**: reserve final dimensions even if it makes the skeleton taller than the minimum content.

## 6. Figures worth keeping

n/a.

## 7. Open questions

- Opacity-0 / LCP behaviour, FLIP details, Long Animation Frames, `scheduler.yield()`: stated from general knowledge, not fetched. Verify before encoding as hard checks.
- The Pudding article and the "scroll experience" skill pages were only seen as search snippets; no numbers were drawn from them.
- No measured data was found on how many users enable Reduce Motion (web.dev article gives none).
- WebKit bug 266835 status unknown; Safari 26 behaviour of `svh/dvh` with sticky + scroll timelines untested.
