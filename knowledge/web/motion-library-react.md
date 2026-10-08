---
source: web:https://motion.dev/docs ; https://gsap.com/docs/v3 ; npm packages motion@14.0.0 / framer-motion@14.0.0 / motion-dom@14.0.0 (source read) ; gsap@3.15.0 ; @gsap/react@2.1.2
chapter: Motion (motion.dev, ex-Framer Motion) and GSAP - APIs, patterns, gotchas
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [motion, framer-motion, gsap, scrolltrigger, spring, layout-animation, animatepresence, variants, drag, stagger, reduced-motion, react]
status: studied
---

# Motion (React) and GSAP: APIs, patterns, gotchas

Versions checked on 2026-10-08 against npm and the Motion changelog: `motion` / `framer-motion` / `motion-dom` **14.0.0** (released 2026-10-02; 14.0.0 only removes internal APIs that 13.5.1 had restored for framer-motion 13.0-13.4, no new features), `gsap` **3.15.0**, `@gsap/react` **2.1.2**. Imports: `import { motion, AnimatePresence, ... } from "motion/react"` (identical API from `"framer-motion"`). React 18 or 19 peer.

Provenance: **(verified)** = docs page or package source read this session. Code blocks were written from the docs/source and checked for API names against `framer-motion@14.0.0` `index.d.ts` exports (`MotionConfig`, `LayoutGroup`, `LazyMotion`, `Reorder`, `useScroll`, `useSpring`, `useTransform`, `useReducedMotion`, `usePresenceData`, `useFollowValue` all present). They were not executed in a browser.

## 1. Core ideas

1. **Two spring forms.** Physics (`stiffness`, `damping`, `mass`; keeps incoming velocity) vs duration-based (`bounce` + `duration` or `visualDuration`; ignores incoming velocity). Setting any physics value overrides `bounce`/`duration`. (verified: docs + `getSpringOptions` source)
2. **`visualDuration`** = when most of the motion is done; bounce mostly happens after it. Derived (verified in source): `zeta = 1 - bounce` (negative bounce = overdamped, added in 13.5.0), `stiffness = (2*pi/(visualDuration*1.2))^2`, `damping = 2*zeta*sqrt(stiffness)`; if `bounce` is omitted with `visualDuration` the source uses `bounce || 0` (critically damped).
3. **Defaults to know** (verified in `springDefaults` / `default-transitions.mjs`): spring physics default `stiffness 100, damping 10, mass 1`; duration-spring defaults `duration 0.8s (800ms), bounce 0.3, visualDuration 0.3s`; `spring(visualDuration=0.3, bounce=0.3)` function default; implicit transition for `x/y/rotate`-type transform props is spring `500/25` (bouncy), for `scale*` a critically-damped `550/~47`, for everything else a tween `[0.25,0.1,0.35,1]` 0.3s, for >2 keyframes tween 0.8s. **Doc discrepancy:** docs table says `bounce` default 0.25 and (apparently) `stiffness` default 1; source says 0.3 and 100. Trust source; always pass explicit values.
4. **Layout animations** animate size/position changes with transforms (FLIP) and can interpolate things CSS cannot (`justifyContent`, `width:auto`). Costs: measurement on each re-render, scale distortion of children/borders, no SVG, blocked during horizontal window resize.
5. **`AnimatePresence`** keeps an exiting child mounted until its `exit` finishes. It must stay mounted itself; direct children need stable unique keys.
6. **Reduced motion**: `<MotionConfig reducedMotion="user">` disables transform and layout animations automatically but keeps `opacity`/`backgroundColor` etc. (verified)
7. **Scroll**: `useScroll` uses native `ScrollTimeline` (GPU, off main thread) when the mapped value is `opacity`, `transform`, `clipPath` or `filter`; otherwise main-thread. (verified) 13.5.0 notes that scroll `offset` animations run on the main thread.
8. **Bundle**: full `motion` component ~34kb; `LazyMotion` + `m` ~4.6kb initial, `domAnimation` +15kb (animations, variants, exit, tap/hover/focus), `domMax` +25kb (adds drag/pan and layout); `useAnimate` mini 2.3kb. (verified)
9. **GSAP** is the choice for timelines with many choreographed targets, ScrollTrigger pin/scrub storytelling, SVG/text splitting. It is framework-agnostic; in React use `useGSAP` for scoping and cleanup.
10. **Licensing:** GSAP's own README (jsDelivr mirror of 3.15.0) states Webflow made GSAP and its former members-only plugins (SplitText, MorphSVG, ...) free including commercial use. The Webflow announcement page failed to load, so confirm on gsap.com before relying on it. Install all plugins from the public `gsap` npm package.

## 2. Rules

### 2.1 Motion: setup and springs

- **RULE** Set one app-wide `MotionConfig` with `reducedMotion="user"` and a default `transition` token, so no component falls back to the implicit 500/25 spring.
  **Why** Implicit defaults are bouncy and ignore reduced motion unless configured. **Applies to** all React. **Check** `MotionConfig` exists at the root; grep `<motion.` usages with transform props and no `transition`. **Source** motion.dev/docs/react-accessibility; source default-transitions.mjs (verified)
```tsx
// app/providers.tsx   (motion@14.0.0)
"use client";
import { MotionConfig } from "motion/react";
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"   // "user" | "always" | "never"
      transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}
    >
      {children}
    </MotionConfig>
  );
}
```
- **RULE** Define springs once as tokens and reference them.
```ts
// motion-tokens.ts   (motion@14.0.0; see motion-tokens.json for the source of truth)
export const spring = {
  press:   { type: "spring", visualDuration: 0.15, bounce: 0 },    // ~190ms, no overshoot
  small:   { type: "spring", visualDuration: 0.2,  bounce: 0 },    // tooltip, popover
  layout:  { type: "spring", visualDuration: 0.3,  bounce: 0 },    // layout/reorder/tab indicator
  panel:   { type: "spring", visualDuration: 0.4,  bounce: 0 },    // drawer/sheet
  release: { type: "spring", visualDuration: 0.3,  bounce: 0.2 },  // drag release (~80% damping, Apple)
  playful: { type: "spring", visualDuration: 0.3,  bounce: 0.3 },  // celebratory ceiling
} as const;
export const tween = {
  fast:   { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
  base:   { duration: 0.2,  ease: [0.23, 1, 0.32, 1] },
  exit:   { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
  reveal: { duration: 0.6,  ease: [0.19, 1, 0.22, 1] },
} as const;
```
  **Why** Consistent character (Apple). **Check** no literal `stiffness:`/`damping:` outside this file. **Source** WWDC18, motion source (verified)
- **RULE** Use tweens (not springs) for `opacity`/`color`; springs for transform/layout.
  **Why** M3 uses non-overshooting "effects" springs for color/alpha; overshoot on opacity is meaningless. **Check** `opacity` entries with `type:"spring"` and `bounce>0`. **Source** M3 tokens; Josh Comeau (verified)
- **RULE** `bounce` is capped at 0.3 for product UI; 0-0.2 typical. Negative bounce (>= 13.5.0) gives overdamped, no-overshoot, slower tail.
  **Check** grep `bounce:`. **Source** Apple WWDC18; motion changelog 13.5.0 (verified)
- **RULE** For transform-heavy work that must survive a busy main thread (page load, route change), animate the full `transform` string or use CSS/WAAPI (`animate()` from `motion`), not independent `x`/`y`/`scale` MotionValues.
  **Why** Motion docs say independent transforms are fast but only a direct `transform` string gets hardware acceleration; Emil's Vercel experience: shared layout animation dropped frames during page loads, CSS fixed it. **Check** profile with 4x CPU throttle while loading. **Source** motion.dev/docs/react-animation; emil-design-eng skill (verified, but see 7: version drift)
```tsx
<motion.div animate={{ transform: "translateX(100px)" }} />   // hardware accelerated
<motion.div animate={{ x: 100 }} />                           // convenient, main-thread
```

### 2.2 Motion: enter / exit / presence

- **RULE** Put the condition inside `AnimatePresence`, give direct children stable unique `key`s, and pass `initial={false}` when children are present on first render and must not animate in.
  **Why** If `AnimatePresence` unmounts, exits cannot run; index keys break reorder tracking. **Check** `{cond && <AnimatePresence>` is a bug; keys not equal to index. **Source** motion.dev/docs/react-animate-presence (verified)
- **RULE** Exits: shorter and with a smaller offset than enters. `mode="wait"` (one child only) for route-level swaps; `mode="popLayout"` for list removals paired with `layout`.
  **Why** Hierarchy of attention; `wait` doubles perceived duration, so keep each half <=150-200ms. Pairing an `easeIn` exit with `easeOut` enter yields an in-out feel per docs. **Check** `wait` + durations sum <=350ms. **Source** docs (verified)
- **RULE** For `popLayout` with custom components, wrap in `forwardRef` (or pass `ref`) so the DOM node is measured; ensure the parent has a non-static `position` when it carries a transform.
  **Source** docs caveats (verified)
- **RULE** Exiting children cannot receive new props: use `custom` on `AnimatePresence` + `usePresenceData()` for direction-aware exits (carousels, steppers).

```tsx
// Popover: origin-aware, asymmetric enter/exit   (motion@14.0.0)
import { AnimatePresence, motion } from "motion/react";

<AnimatePresence>
  {open && (
    <motion.div
      key="popover"
      style={{ transformOrigin: "var(--transform-origin, top left)" }}  // Base UI var, or set from trigger rect
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}
    />
  )}
</AnimatePresence>

// Modal: centered origin, backdrop separate
<AnimatePresence>
  {open && (
    <>
      <motion.div key="backdrop" className="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }} />
      <motion.div key="dialog" role="dialog" aria-modal="true"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
        exit={{ opacity: 0, scale: 0.98, y: 4, transition: { duration: 0.16 } }} />
    </>
  )}
</AnimatePresence>
```
Base UI integration (verified, base-ui.com/react/handbook/animation): prefer CSS `[data-starting-style]` / `[data-ending-style]` (cancellable, interruptible). For Motion: make the component controlled, wrap `Portal` in `AnimatePresence` with `keepMounted`, use `render={<motion.div .../>}` on `Popup`; Base UI waits on `element.getAnimations()`; an animation that does not touch opacity should animate opacity to ~`0.9999` so it is detected.

### 2.3 Motion: layout and shared layout

- **RULE** Drive layout changes through `style`/`className`/DOM structure and add `layout`; do not animate layout properties with `animate`/`whileHover`.
  **Why** `layout` already animates the delta; double-driving fights. **Source** docs (verified)
- **RULE** Use `layout="position"` for text/images whose aspect ratio changes (so size snaps instead of stretching); add `layout` to direct children to counter-scale; set `borderRadius`/`boxShadow` via `style` or animate props so Motion can correct them; replace borders on animating boxes with a padded parent.
- **RULE** `layoutId` for shared elements (tab underline, selected pill, card->modal). The `transition` of the element being animated *to* wins. Wrap in `AnimatePresence` if the shared element must animate out before unmount.
- **RULE** Scrollable ancestors need `layoutScroll`; `position: fixed` ancestors need `layoutRoot`; use `<LayoutGroup>` to sync components that do not re-render together; reserve scrollbar width with `scrollbar-gutter: stable` on `body`.
  **Check** layout animation inside overflow container without `layoutScroll` = drift bug. **Source** docs (verified)
- **RULE** Not for SVG, not `display:inline`, not during horizontal resize; use `layoutDependency` to restrict measurements when many items re-render.
```tsx
// Tab indicator (shared layout)   (motion@14.0.0)
{tabs.map(t => (
  <button key={t.id} onClick={() => setActive(t.id)} style={{ position: "relative" }}>
    {t.label}
    {active === t.id && (
      <motion.span layoutId="tab-underline" className="underline"
        transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }} />
    )}
  </button>
))}

// List add/remove with siblings reflowing immediately
<LayoutGroup>
  <motion.ul layout style={{ position: "relative" }}>
    <AnimatePresence mode="popLayout" initial={false}>
      {items.map(i => (
        <motion.li key={i.id} layout
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }} />
      ))}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
```
- Newer in 12.x-13.x (changelog, verified): `layoutAnchor` (12.38), axis-locked `layout="x" | "y"` (12.36), curved layout paths `transition={{ layout: { path: arc() } }}` (12.40), `Reorder` multidimensional/auto axis/RTL (13.1), `AnimateView` / `animateView` view-transitions integration (13.4 / 12.41) built on React `ViewTransition` (React 19.3 canary-era API, check status).

### 2.4 Motion: variants, stagger, scroll reveal

- **RULE** Orchestrate with variants: parent `transition: { delayChildren: stagger(0.08) }`. `staggerChildren`/`staggerDirection` are deprecated since 12.22.0. `stagger(duration, { startDelay, from: "first"|"center"|"last"|index, ease })`. Dynamic variants via `custom`.
```tsx
// Hero entrance (landing)   (motion@14.0.0)
import { motion, stagger } from "motion/react";
const container = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08, { startDelay: 0.05 }) } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};
<motion.div variants={container} initial="hidden" animate="show">
  <motion.p variants={item}>Eyebrow</motion.p>
  <motion.h1 variants={item}>Headline</motion.h1>
  <motion.p variants={item}>Sub</motion.p>
  <motion.div variants={item}>CTA</motion.div>
</motion.div>

// Scroll reveal (once)
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}  // amount: "some" | "all" | 0..1
  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
/>
```
  **Why** `once:true` avoids re-triggering/flicker; `amount` 0.2-0.3 avoids early triggers on tall blocks. **Check** no `whileInView` without `viewport.once` on non-looping reveals. **Source** docs (verified); numeric defaults [engine note]
- **RULE** Gate hero entrance so content is visible without JS and LCP is not delayed (see `motion-a11y-perf-loading.md` section 2.4).

### 2.5 Motion: scroll-linked

- **RULE** Scroll-linked values go straight into `opacity`/`transform`/`clipPath`/`filter` for GPU path; smooth with `useSpring` only when the raw mapping feels steppy; disable parallax under reduced motion.
```tsx
// Progress bar + parallax   (motion@14.0.0)
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

const { scrollYProgress } = useScroll();                 // page; or { target: ref, offset: ["start end","end start"] }
const smooth = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.5 }); // ~critically damped
const reduce = useReducedMotion();                        // boolean | null
const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

<motion.div style={{ scaleX: smooth, transformOrigin: "0 50%" }} />
<motion.div style={{ y: reduce ? 0 : y }} />
```
  `offset` takes `[targetPoint containerPoint]` pairs: names `start|center|end`, numbers 0-1, `px`, `%`, `vh`, `vw`. Default `["start start","end end"]`. `target` progress ignores CSS transforms (uses layout position). `trackContentSize` (default false) for changing content size. **Source** motion.dev/docs/react-use-scroll (verified). The `useSpring` values are my pick: damping ratio = 40 / (2*sqrt(300*0.5)) = 1.63, i.e. overdamped, so it smooths without overshoot [engine note].
- **RULE** Do not ease a scrubbed value twice (CSS easing + spring + scrub smoothing).

### 2.6 Motion: gestures and drag

- `whileHover` ignores `pointerType === "touch"` (source, `gestures/hover.mjs`) and is blocked during drag; `whileTap` also works with keyboard Enter on focusable elements; tap cancels if pointer moves >3px inside a draggable; `whileFocus` follows `:focus-visible`; `propagate={{ tap: false }}` stops parent tap. (verified)
- Drag props: `drag` (`true|"x"|"y"`), `dragConstraints` (px box or ref), `dragElastic` default 0.5, `dragMomentum` default true, `dragSnapToOrigin`, `dragTransition` for the release inertia (`{ bounceStiffness: 600, bounceDamping: 10 }`). (verified)
```tsx
// Swipe-to-dismiss with velocity rule (Sonner: dismiss if distance>=threshold OR velocity>0.11 px/ms)
<motion.div
  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
  onDragEnd={(_, info) => {
    const v = Math.abs(info.velocity.x) / 1000;        // px/ms  (info.velocity is px/s)
    if (Math.abs(info.offset.x) > 100 || v > 0.11) dismiss();
  }}
  whileDrag={{ scale: 0.98 }}
/>
```
  `info.offset`/`info.velocity` are the standard drag event payload (not re-fetched this session). Dismiss rule from Sonner (verified via Emil's article).
- **Reorder**: `Reorder.Group axis values onReorder` / `Reorder.Item value`; handle-only dragging with `dragListener={false}` + `useDragControls`; `values` and item `value` must match; `onReorder` must set state; item `z-index` needs non-static position; auto-scrolls container near edges; axis auto-detected incl. grids ("xy") since 13.1. (verified)

### 2.7 Motion: reduced motion

- **RULE** `MotionConfig reducedMotion="user"` globally; for custom swaps use `useReducedMotion()` (returns `boolean | null`) to replace slides with fades, disable parallax, and not autoplay video. `"always"` / `"never"` override; pass a user setting to let visitors override the OS.
```tsx
const reduce = useReducedMotion();
const animate = open
  ? (reduce ? { opacity: 1 } : { x: 0 })
  : (reduce ? { opacity: 0 } : { x: "-100%" });
```
  **Source** motion.dev/docs/react-accessibility (verified). Note the docs import from `framer-motion`; `motion/react` exports the same.

### 2.8 GSAP + ScrollTrigger (3.15.0)

- **RULE** In React use `useGSAP` (`@gsap/react` 2.1.2) with a `scope` ref; wrap handlers created after mount in `contextSafe`; register `gsap.registerPlugin(useGSAP, ScrollTrigger)` once.
  **Why** Cleanup/revert on unmount; React 18 Strict Mode double-invokes effects, which corrupts `from()` tweens. **Check** no bare `useEffect(() => gsap.to(...))` without `gsap.context`/`useGSAP`. **Source** gsap.com/resources/React (verified)
```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Story() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { motion } = ctx.conditions!;
        if (!motion) { gsap.set(".step", { opacity: 1, y: 0 }); return; }   // static fallback
        gsap.timeline({
          scrollTrigger: { trigger: ".stage", start: "top top", end: "+=1500", scrub: 1, pin: true, anticipatePin: 1 },
        })
          .from(".step-1", { opacity: 0, y: 40 })
          .from(".step-2", { opacity: 0, y: 40 }, "+=0.5");
      }
    );
    return () => mm.revert();     // matchMedia creates its own context (3.11.0+)
  }, { scope: root });
  return <div ref={root}>…</div>;
}
```
- **ScrollTrigger config (verified defaults)**: `start` default `"top bottom"` (or `"top top"` with `pin:true`), `end` default `"bottom top"`, `toggleActions` default `"play none none none"` (onEnter, onLeave, onEnterBack, onLeaveBack), `anticipatePin` 0 (1 typical), `scrub` true or a number of seconds of catch-up (0.5-1.5 smooths), `pinSpacing` adds padding (false in flex), `snap` object `{ snapTo, duration:{min,max}, ease, delay, directional(true) }`, `once`, `markers`, `invalidateOnRefresh`, `horizontal`, `clamp()` for `end` (3.12+). Callbacks receive the instance (`progress`, `direction`, `isActive`, `getVelocity()`). `ScrollTrigger.batch(targets, vars)` batches enter callbacks for staggered reveals. `ScrollTrigger.matchMedia` is deprecated; use `gsap.matchMedia()`.
```js
// Staggered reveal of a grid using batch
ScrollTrigger.batch(".card", {
  start: "top 85%", once: true,
  onEnter: els => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, overwrite: true }),
});
```
- **Eases:** GSAP default ease `power1.out`; `power1..4` = quad/cubic/quart/quint; `expo`, `circ`, `sine`, `back`, `elastic`, `bounce`, `steps`, CustomEase. `.out` is deceleration. Mapping to tokens [engine note, from standard Penner equivalence]: `power3.out` ~ ease-out-cubic, `power4.out` ~ ease-out-quart, `power4.out`/`expo.out` for hero. Default duration is 0.5s (documented widely; the Eases page itself did not state it, unverified here).
- **Gotchas** [engine note, widely documented ScrollTrigger practice, not fetched this session]: call `ScrollTrigger.refresh()` after fonts/images/layout change; don't pin inside a transformed ancestor; avoid animating the pinned element's own layout; revert on route change; dynamic `start` values via functions + `invalidateOnRefresh`.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Motion spring physics default | stiffness 100, damping 10, mass 1 | motion-dom 14.0.0 source |
| Motion duration/bounce defaults | duration 800ms, bounce 0.3, visualDuration 0.3s | source |
| Motion rest thresholds | restSpeed default 2 (0.01 granular), restDelta 0.5 (0.005 granular); docs table lists 0.1 / 0.01 | source vs docs |
| Spring duration limits | min 0.01s, max 10s; min damping ratio 0.05 | source |
| Implicit transform transitions | x/y 500/25 restSpeed 10; scale 550 / (2*sqrt(550) to 0, else 30) | source |
| Implicit non-transform | tween 0.3s `[0.25,0.1,0.35,1]`; keyframes>2: 0.8s | source |
| `whileInView` viewport | `once`, `root`, `margin` default "0px", `amount` default "some" | docs |
| `dragElastic` | 0.5 default | docs |
| Tap cancel distance | 3px | docs |
| GSAP ScrollTrigger snap | delay default 0.1 (half of scrub if numeric), directional true, ease "power3" | docs |
| Bundle | motion 34kb; m+LazyMotion 4.6kb (+15kb domAnimation, +25kb domMax); useAnimate mini 2.3kb | docs |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| `transition={spring.layout}` token everywhere | Raw `stiffness:400, damping:10` copied from a demo |
| `initial={false}` on AnimatePresence at mount | Page-load flicker as every list item animates in |
| `layout="position"` on text inside a resizing card | Text stretched mid-animation (scale distortion) |
| `useReducedMotion` swap to opacity | Disable all feedback under reduced motion |
| `ScrollTrigger` inside `gsap.matchMedia()` with a reduce branch | Pinned scrubbed sequence forced on reduced-motion users |
| `LazyMotion features={domAnimation} strict` + `m.div` on marketing pages | Full `motion` import in a 30kb JS budget landing page |
| One `AnimatePresence mode="wait"` for route content with 150ms exit | Wait-mode transitions whose exit+enter exceed 400ms |

## 5. Exceptions & judgement calls

- **Motion vs CSS vs GSAP.** CSS (transitions, `@starting-style`, view transitions, scroll-driven animations) first for state changes and simple reveals: off-main-thread, zero JS. Motion for interruptible springs, gestures, layout/shared-layout, orchestrated React presence. GSAP for long scrubbed/pinned timelines and SVG/text work. Do not mix two libraries driving the same element.
- **Next.js App Router page transitions** with `AnimatePresence` are commonly fragile because the old route unmounts before exit; prefer View Transitions (`motion-css-native.md`) or `AnimateView` where available [engine note, unverified].
- **x/y hardware acceleration advice** (Emil's skill: shorthand not accelerated) predates Motion's recent acceleration work (12.34 accelerated `useScroll`, 12.43 accelerated backgroundColor/SVG). Treat as conservative guidance for load-critical animation; verify with a trace.
- **Layout animation cost on large lists**: keep `layout` off items that do not move; use `layoutDependency`; consider CSS `view-transition-name` (`motion-css-native.md`) for big grids.

## 6. Figures worth keeping

n/a.

## 7. Open questions

- Motion docs vs source disagree on `bounce` default (0.25 vs 0.3) and show `stiffness: 1` default (almost certainly doc error). Re-check when upgrading past 14.0.0.
- `layoutDependency` is documented on the component API page but not on the layout page; behaviour (measure only when value changes) taken from the component page.
- `onDragEnd` `info.velocity` unit (px/s) and `useSpring` options are standard Motion API but were not re-fetched; the snippet's math should be tested.
- GSAP default duration (0.5s) and the Webflow "free" announcement were not read from primary pages.
- `AnimateView` / React `ViewTransition` stability: React docs page pins `19.3.0-canary` builds and does not call it stable.
