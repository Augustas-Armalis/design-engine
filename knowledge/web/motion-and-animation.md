---
source: web:https://emilkowal.ski/ui/you-dont-need-animations ; https://www.nngroup.com/articles/animation-duration/ ; https://m3.material.io/styles/motion ; https://developer.apple.com/videos/play/wwdc2018/803/ ; https://www.joshwcomeau.com/animation/css-transitions/ ; https://github.com/vercel-labs/web-interface-guidelines
chapter: Motion and animation - principles, perception, tokens by UI role (HUB)
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [motion, animation, easing, duration, spring, stagger, frequency, tokens, microinteractions, disney, apple-hig, material-3, emil-kowalski]
status: studied
---

# Motion and animation: principles, perception, tokens (hub)

Companion files (read as one set, see `INDEX.md`):
- `motion-library-react.md` : Motion (motion.dev) + GSAP APIs, code verified against v14.0.0 / GSAP 3.15.0
- `motion-css-native.md` : transitions, keyframes, `@starting-style`, `linear()`, scroll-driven, view transitions
- `motion-a11y-perf-loading.md` : reduced motion, WCAG, performance/INP, skeletons, optimistic UI, scroll storytelling, page-load orchestration
- `motion-tokens.json` : design-engine-ready token proposal

Provenance legend: **(verified)** = read in primary docs/source this session; **(opinion)** = author's taste; **[engine note]** = my synthesis, not from a source, treat as a default to tune.

## 1. Core ideas

1. **Motion explains, it does not decorate.** Valid purposes: spatial consistency (where did it come from / go), state indication, feedback ("the UI heard you"), explanation, and softening an otherwise jarring appearance/disappearance. If the only reason is "looks cool" and the user sees it often, don't animate. (Emil Kowalski; Apple HIG: "purposeful", "optional", "realistic", "brief")
2. **Frequency decides everything.** Seen 100+ times/day or keyboard-initiated: no animation. Tens/day (hover, list nav): remove or drastically reduce. Occasional (modal, drawer, toast): standard. Rare (onboarding, celebration): may delight. Raycast opens hundreds of times a day with no animation, and Emil calls that the optimal experience. (verified: emilkowal.ski/ui/you-dont-need-animations)
3. **Speed is a feature.** UI animation under 300ms. A 180ms select feels more responsive than 400ms. NN/g range: 100-500ms overall, ~100ms for checkbox/toggle feedback, 200-300ms for modals/screen changes, >500ms "feels like a drag", 400ms reserved for big movement across large screens. (verified)
4. **Entering things use ease-out (fast start, soft landing); perceived speed comes from the first 100ms of movement.** `ease-in` at the same duration feels slower because it delays exactly the moment the eye is watching. Built-in CSS keywords are weak; use stronger custom curves. (verified: Emil, NN/g)
5. **Exit is quieter and faster than enter.** NN/g: popup ~300ms in, 200-250ms out. Emil: "slow where the user is deciding, fast where the system is responding" (hold-to-delete 2s linear press, 200ms release). Exit uses a smaller offset than enter.
6. **Springs for anything interactive/interruptible/gesture-driven; tweens (CSS transitions) for simple state changes.** Springs keep velocity when retargeted so reversals look continuous; keyframes restart from zero. Apple: "start with no bounce" (damping ratio 100%); add bounce only when the gesture itself carried momentum (swipe-dismiss ~80% damping). (verified: WWDC18 #803)
7. **Interruptibility is the real quality bar.** The user must be able to change their mind mid-motion (Rauno, Apple, Vercel guidelines: "Animations interruptible-respond to user input mid-animation"). CSS transitions and springs retarget; CSS keyframes and long timelines do not.
8. **Origin-awareness.** Popovers/tooltips/menus grow from their trigger (`transform-origin`), modals stay centered. Things leave along the path they came from (Apple "spatial consistency", symmetric paths).
9. **Never animate from nothing.** `scale(0)` reads as appearing from nowhere; start at 0.9-0.97 plus opacity. (Emil)
10. **Consistency creates character.** One easing family + one duration scale + one spring family per product ("cohesive character", Apple; Emil's Sonner is deliberately slower with `ease` to match its elegant personality). Tokens, not per-component magic numbers.
11. **Reduced motion means less and gentler, not zero.** Keep opacity/color; remove translate/scale/parallax/auto-play. (Apple HIG, web.dev, Motion default, WCAG 2.3.3)
12. **Compositor-only properties (`transform`, `opacity`; plus `filter`/`clip-path` with care) or it is not shippable.** (web.dev, Emil, Vercel guidelines)

## 2. Rules

Format: RULE / Why / Applies to / Check / Source.

### 2.1 Whether to animate

- **RULE** Do not animate keyboard-initiated actions (command palette open/close, shortcut toggles, list navigation by arrow keys, tab switching via keyboard).
  **Why** Repeated hundreds of times/day; animation makes the UI feel delayed and disconnected from input. Rauno found removing motion from frequent keyboard actions made the UI feel faster even when the animations had been tuned.
  **Applies to** SaaS app UI. **Check** For handlers fired by `keydown`/shortcut libs, no `transition`/`animate` on the result; `visual`. **Source** emilkowal.ski/ui/you-dont-need-animations; rauno.me/craft/interaction-design (verified)
- **RULE** Run the frequency table before writing any animation: 100+/day = none; tens/day = remove or <=100ms opacity/color only; occasional = standard tokens; rare = may add delight.
  **Why** The "initial delight fades and the animation slows users down". **Applies to** all. **Check** `visual` review against the table. **Source** Emil (verified)
- **RULE** Motion must never be the only carrier of state. Pair every animated change with a static cue (color, icon, label).
  **Why** Reduce Motion users, fast users who interrupt, screenshots. **Applies to** all. **Check** Disable all animation (`*{animation:none!important;transition:none!important}` in devtools): every state change is still legible. **Source** Apple HIG "optional" (third-party mirror of official page); make-interfaces-feel-better skill

### 2.2 Duration

- **RULE** UI transitions <=300ms; target by role (section 3.1). Exceed 300ms only for large-distance movement, hero/marketing orchestration, or drawers/sheets that mimic native (500ms).
  **Why** Perceived responsiveness; NN/g says >500ms drags. **Applies to** all. **Check** Parse computed `transition-duration`/`animation-duration` of interactive components; flag >300ms on non-hero elements; `visual` for JS springs (estimate settle time, section 3.3). **Source** Emil, NN/g (verified)
- **RULE** Make exit shorter than enter (roughly 60-75% of enter).
  **Why** Entering needs a moment for the eye to register; leaving is the system getting out of the way. **Applies to** popovers, modals, toasts, drawers. **Check** `exit duration <= enter duration` for every paired overlay. **Source** NN/g (popup 300ms in / 200-250 out), Emil (verified)
- **RULE** Scale duration with distance/area travelled, not one value for everything. [engine note] Tiers: <=48px move: 120-150ms; 48-200px: 180-250ms; 200-500px: 250-350ms; full-screen: 300-400ms; never >500ms without a stated reason.
  **Why** Perceived speed should be roughly constant; larger objects need longer to read as the same velocity. NN/g: 400ms only for big movement on large screens. **Applies to** all. **Check** `visual`; lint max duration by element area. **Source** NN/g (verified, qualitative); tiers are [engine note]
- **RULE** Hover-in is fast, hover-out may be slower (Josh Comeau: 125ms in / 450ms out for a lift-on-hover) for forgiving, non-flickery feel. (opinion)
  **Why** Action-driven timing: user intent is clear on enter, uncertain on leave. **Applies to** landing page hover effects only; skip for dense app UI. **Check** `visual`. **Source** joshwcomeau.com/animation/css-transitions (verified)

### 2.3 Easing

- **RULE** Enter and most exits: custom strong ease-out. Default token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (ease-out-quint, Penner CSS values).
  **Why** Starts fast (responsive), settles softly. **Applies to** all. **Check** Computed `transition-timing-function` is not the keyword `ease-in`/`linear` on enter/exit of UI; prefer not the bare keyword `ease-out`/`ease` either (weak). **Source** Emil, emil-design-eng skill (verified); curve identity verified against Penner CSS easings
- **RULE** On-screen movement/morph (element moves between two visible positions): strong ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out-quart) or a spring.
  **Why** Needs both acceleration and deceleration. **Applies to** layout shifts, tab indicators, reorder. **Check** `visual`. **Source** Emil skill (verified)
- **RULE** Use `ease-in` (or M3 emphasized-accelerate `0.3,0,0.8,0.15`) only for an element that exits the viewport entirely and ends invisible.
  **Why** Accelerating away is natural only when leaving; Josh Comeau: "ease-in rarely right unless the element ends off-screen". **Applies to** full-screen exits, swipe-away. **Check** `ease-in` present => element must end off-screen or at opacity 0. **Source** joshwcomeau.com (verified)
- **RULE** `linear` only for constant-speed things: spinners, marquees, progress fills, scrub-bound scroll animations, hold-to-confirm press.
  **Why** Linear motion looks mechanical otherwise. **Applies to** all. **Check** `linear` outside those uses is a smell. **Source** NN/g, Emil (verified)
- **RULE** Avoid bouncy/elastic/back easings on UI chrome; reserve overshoot for playful or gesture-momentum moments.
  **Why** Apple: bounce only when the gesture has momentum. **Applies to** all. **Check** `cubic-bezier` with y>1 or <0, `bounce > 0.3`, `back`/`elastic`/`anticipate` named easings. **Source** WWDC18 #803 (verified)

### 2.4 Springs

- **RULE** Start every spring at no overshoot (Motion `bounce: 0`, i.e. damping ratio 1). Add `bounce` 0.1-0.25 only for drag-release, swipe-dismiss or deliberately playful elements; never above 0.3 on product UI.
  **Why** Apple: damping ratio 100% for taps; ~80% (= Motion bounce 0.2) for momentum gestures. Motion maps `bounce` to damping ratio as `1 - bounce` (verified in motion-dom 14.0.0 source: `bounceToDampingRatio`). **Applies to** all. **Check** grep `bounce:` > 0.3; grep `stiffness`/`damping` pairs and compute ratio = damping / (2*sqrt(stiffness*mass)) >= 0.7 for chrome. **Source** WWDC18 #803; motion-dom source (verified)
- **RULE** Prefer duration-like spring params (`visualDuration` + `bounce`) over raw stiffness/damping/mass in product code; keep raw physics only when matching a reference.
  **Why** Designer-legible; `visualDuration` states when the bulk of motion is done. Note raw `stiffness`/`damping`/`mass` override `bounce`/`duration` (verified, docs + source). **Applies to** Motion users. **Check** Springs in code are tokens from `motion-tokens.json`. **Source** motion.dev/docs/react-transitions (verified)
- **RULE** Do not use the Motion default transition on x/y by accident: its implicit transform spring is `stiffness 500 / damping 25` (damping ratio 0.56, ~12% overshoot), `scale` is critically damped `550/~47` (verified in source `default-transitions.mjs`).
  **Why** The implicit x/y overshoot is the single most common "bouncy template" look. **Applies to** Motion users. **Check** Every `animate`/`whileX` with transform props specifies a `transition` (or a `MotionConfig transition` default is set). **Source** motion-dom/framer-motion 14.0.0 source (verified)
- **RULE** Springs for opacity/color are usually wrong; use tween (`duration`, ease-out) for opacity/color.
  **Why** Spring overshoot on opacity clamps or causes flicker; Josh Comeau avoids springs for color/opacity (opinion). **Applies to** Motion users. **Check** `type:"spring"` on `opacity`/`color`. **Source** joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics (verified)

### 2.5 Interaction feedback

- **RULE** Pressable elements: `transform: scale(0.97)` on `:active` (allowed band 0.95-0.98), 100-160ms ease-out. Never below 0.95.
  **Why** Immediate feedback that the UI is "listening". Sources differ: Emil 0.97, make-interfaces-feel-better 0.96 (opinion). **Applies to** buttons, cards, chips. **Check** `:active` rule exists with scale in [0.95, 0.98]. **Source** emilkowal.ski/ui/7-practical-animation-tips (verified)
- **RULE** Hover animation only behind `@media (hover: hover) and (pointer: fine)`.
  **Why** Touch fires hover on tap = false positives. (Motion's own `whileHover` already ignores `pointerType === "touch"`, verified in source `gestures/hover.mjs`; CSS `:hover` does not.) **Applies to** all. **Check** every `:hover` that moves/scales is inside the media query. **Source** Emil skill; motion-dom source (verified)
- **RULE** Tooltips: first one delayed (hover intent), subsequent siblings open instantly with no animation (`data-instant` in Base UI). Tooltip animation 125ms ease-out, `scale(0.97)` + opacity.
  **Why** Prevents accidental activation yet makes the whole toolbar feel fast. **Applies to** SaaS app UI. **Check** `[data-instant]{transition-duration:0ms}` present; open delay token. **Source** emilkowal.ski/ui/7-practical-animation-tips (verified)
- **RULE** Popovers/menus/selects set `transform-origin` to the trigger (`var(--transform-origin)` in Base UI, `--radix-*-content-transform-origin` in Radix); modals stay `center`.
  **Why** Growth from the trigger shows causality. **Applies to** anchored overlays. **Check** computed `transform-origin` != `50% 50%` for anchored popups. **Source** Emil (verified)
- **RULE** Never `scale(0)`; start at 0.9-0.97 + opacity 0.
  **Why** Nothing real appears from nowhere. **Applies to** all. **Check** grep `scale(0)`, `scale: 0`, `initial={{ scale: 0 }}`. **Source** Emil (verified)
- **RULE** Gesture UI: show immediate 1:1 tracking during the gesture, animate only after commit; dismissal by velocity (Sonner: swipe distance >= threshold OR velocity > 0.11 px/ms), with friction (not a wall) past boundaries.
  **Why** Delay in tracking = "disconnected"; hard stop at a boundary reads as broken. **Applies to** drawers, sheets, toasts, carousels (mobile). **Check** `visual` + test on a real device. **Source** emilkowal.ski/ui/building-a-toast-component; building-a-drawer-component; WWDC18 (verified)
- **RULE** Destructive/irreversible commits wait for release (pointer up); lightweight reversible ones may fire mid-gesture.
  **Why** Change-of-mind costs. **Applies to** mobile/gesture UI. **Check** `visual`. **Source** rauno.me/craft/interaction-design (verified)

### 2.6 Stagger and orchestration

- **RULE** Stagger sibling entrances 30-80ms per item for routine lists; ~80-120ms for a staged hero/semantic chunks; cap the total cascade at ~400ms for lists (clamp index: `delay = min(i, 8) * step`) and ~1s for a hero.
  **Why** Cascade guides the eye in reading order; long cascades block perceived readiness. Emil: 30-80ms; make-interfaces: ~100ms for staged chunks; the cap is [engine note]. **Applies to** landing page; lists on first load only. **Check** `step <= 120ms`; `last delay + duration <= 1200ms` on heroes. **Source** Emil skill; make-interfaces-feel-better skill (verified); cap [engine note]
- **RULE** Never stagger on high-frequency or user-triggered repeat updates (filter results, typing, tab switch). Never block interaction while a stagger plays.
  **Why** Attention cost repeats each time. **Applies to** SaaS app UI. **Check** `visual`. **Source** Emil skill; make-interfaces-feel-better (verified)
- **RULE** Prefer the library's stagger over hand-written `nth-child` delays: Motion `delayChildren: stagger(0.05)`; GSAP `stagger: 0.05`; CSS `--i` custom property + `animation-delay: calc(var(--i) * 50ms)`.
  **Why** Survives item-count changes. **Applies to** all. **Check** no >10 hardcoded `nth-child` delays. **Source** motion.dev/docs/stagger (verified)

### 2.7 Disney's 12 principles mapped to UI (IxDF mapping)

| Principle | UI use | Do/Don't |
|---|---|---|
| Squash & stretch | Press compress (`scale 0.97`), subtle overshoot on momentum release | Don't squash text-heavy cards visibly |
| Anticipation | Tiny wind-up before a big action, hover nudge | Keep < 100ms; skip on frequent actions |
| Staging | One focal motion at a time; keep other motion minimal | Two simultaneous attention-grabbing loops = noise |
| Pose-to-pose | Design component states (default/hover/pressed/loading/success) then tween between | |
| Follow-through / overlapping | Image leads, title/description follow 40-80ms later | Same as stagger rules |
| Slow in / slow out | Easing (ease-out for enter) | See 2.3 |
| Arcs | Curved paths for large moves (Motion `path: arc()`, v12.40+), dock-like magnification | Straight lines for short moves are fine |
| Secondary action | Confetti/check after submit | Rare events only |
| Timing | Duration communicates weight/importance; upload animation matching size | |
| Exaggeration | Personality moments | Keep product chrome restrained |
| Solid drawing | Consistent shadows/perspective during motion | Mismatched shadow mid-flight looks broken |
| Appeal | Mascots/characters | Brand-level only |
(source: ixdf.org UI animation article, verified; the Do/Don't column is [engine note])

### 2.8 Microinteractions (Dan Saffer structure)

- **RULE** Design each microinteraction as Trigger -> Rules -> Feedback -> Loops & Modes. Feedback must reveal the (invisible) rules; give feedback within ~100ms of the trigger [engine note: the 0.1s figure is the classic Nielsen response limit, not fetched here]. Long-lived loops should decay: the 50th occurrence must be quieter than the 1st.
  **Why** Rules are invisible; feedback is how users learn them (Saffer). **Applies to** all. **Check** each interactive component has trigger state, feedback state, and a repeat-use behavior defined in its spec. **Source** search summaries of Saffer's *Microinteractions* (O'Reilly 2013); book itself NOT read, see section 7.

## 3. Numbers & scales

### 3.1 Token table by UI role (proposal; machine-readable copy in `motion-tokens.json`)

All values are defaults to be overridden by brand personality (section 5). Durations in ms. "Out" = `--ease-out` `cubic-bezier(0.23,1,0.32,1)`.

| UI role | Enter | Exit | Easing / spring | Transform & opacity | Notes / source |
|---|---|---|---|---|---|
| Hover (color, bg, border) | 120-150 | same | `ease` (CSS default) | color/bg only | App UI: consider none for dense lists. Josh: landing lift can be 125 in / 450 out |
| Hover (lift/scale, landing only) | 150-200 | 250-450 | out | translateY(-2..-4px) or scale 1.02-1.05 | Gate with `(hover:hover)`; Emil skill uses 1.05 |
| Press (:active) | 100-160 | 160 | out | scale 0.97 (0.95-0.98) | Emil; spring alt: `visualDuration 0.15, bounce 0` |
| Focus ring | 0-100 | 0-100 | ease | outline/box-shadow | never delay focus visibility |
| Toggle / checkbox / switch | 100-150 | 100-150 | out or spring `visualDuration .2, bounce 0` | thumb translate | NN/g: ~100ms |
| Tooltip | 125 | 100 (or instant when `data-instant`) | out | opacity + scale 0.97, origin = trigger | Emil (verified); open delay ~400-700ms [engine note], subsequent 0 |
| Dropdown / select / menu / popover | 150-200 | 100-150 | out | opacity + scale 0.95-0.97, origin = trigger | Emil: dropdowns 150-250ms; 180ms select example |
| Modal / dialog | 200-300 | 150-200 | out | opacity + scale 0.96->1 (+ translateY 8-16px), origin center; backdrop opacity 200 | Emil 200-500 range; stay <=300 [engine note] |
| Drawer / sheet (mobile) | 500 | 300-400 | `cubic-bezier(0.32,0.72,0,1)` (Vaul/iOS sheet, verified) or spring `visualDuration .4, bounce 0` | translateY(100%)->0 | gesture-tracked; velocity dismiss |
| Side panel (desktop) | 250-300 | 200 | out / M3 standard `0.2,0,0,1` | translateX | |
| Toast | 400 | 200-300 | `ease` (Sonner choice, deliberately slower) | translateY(100%)->0; stack offset 14px/index, scale -0.05/index | display 4000ms, pause on hover/hidden tab (Emil, verified) |
| Accordion / collapse | 200-250 | 150-200 | out | height via `interpolate-size`/grid-rows; opacity | avoid animating `height` on long lists |
| Tab indicator / segmented control | 200-250 | | in-out `0.77,0,0.175,1` or spring `visualDuration .3, bounce 0` | shared layout (`layoutId`) | |
| List reorder / layout shift | spring `visualDuration .3, bounce 0` (k~305,c~35) | | spring | `layout` | exit of removed item 150-200 opacity |
| List item add/remove | 200 | 150 | out | opacity + translateY 8px; `popLayout` | |
| Page / route transition (app) | 200-300 | 150-200 | M3 standard `0.2,0,0,1` / out | opacity + translateY 8px; or View Transitions 250-350 | content fades, chrome stays static |
| Page / route transition (marketing) | 350-500 | 250 | M3 emphasized decel `0.05,0.7,0.1,1` | | |
| Hero entrance (landing) | 600-800 per element | n/a | `cubic-bezier(0.19,1,0.22,1)` (ease-out-expo) or out | opacity + translateY 16-24px; stagger 80-100ms; total <= ~1.2s | [engine note] |
| Scroll reveal (once, viewport-triggered) | 500-700 | none | out | opacity + translateY 16-24px; trigger when ~20% visible | `once: true`; no exit; [engine note] |
| Scroll-linked (scrubbed) | follows scroll | | linear (progress), optional spring smoothing | transform/opacity only | don't ease a scrubbed value twice |
| Skeleton shimmer | 1500-2000 loop | | linear | background-position / transform | static under reduced-motion |
| Spinner | 800-1000 / rotation | | linear | rotate | |
| Number tick / counter | 300-600 | | out | tabular-nums | rare use |
| Success / celebration | 400-800 | | spring bounce .2-.3 | | rare events only |

### 3.2 Easing tokens

| Token | Value | Use | Source |
|---|---|---|---|
| `--ease-out` (ease-out-quint) | `cubic-bezier(0.23, 1, 0.32, 1)` | default enter / UI interactions | Emil skill; Penner CSS (verified) |
| `--ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | hero / reveal (long settle) | Penner CSS (verified, easings-css pkg) |
| `--ease-out-cubic` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | gentle ease-out | Penner CSS |
| `--ease-out-quad` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | subtle | Penner CSS |
| `--ease-in-out` (quart) | `cubic-bezier(0.77, 0, 0.175, 1)` | on-screen movement/morph | Emil skill |
| `--ease-in-out-cubic` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | softer morph | Penner CSS |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | sheets/drawers, iOS-like | Ionic via Vaul (verified) |
| `--ease-in` (cubic, only for leaving viewport) | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | exit off-screen | Penner CSS |
| CSS `ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | color/hover; Sonner toast | CSS spec |
| CSS `ease-out` keyword | `cubic-bezier(0, 0, 0.58, 1)` | weak; avoid | CSS spec |
| CSS `ease-in` keyword | `cubic-bezier(0.42, 0, 1, 1)` | avoid | CSS spec |
| Motion default tween | `[0.25, 0.1, 0.35, 1]`, 0.3s | implicit for non-transform values | motion-dom source (verified) |
| `linear` | `linear` | spinners, scrub, hold | |

### 3.3 Spring presets and their measured behaviour

Computed by numerical integration of `m x'' = -k x - c x'` with unit step (script not shipped; formulas: damping ratio zeta = c / (2 sqrt(k m)); settle = last time |error| > 1%). Motion's duration mapping, verified in source: with `visualDuration` vd and `bounce` b: `zeta = 1 - b`, `stiffness = (2*pi / (vd*1.2))^2`, `damping = 2*zeta*sqrt(stiffness)` (when `bounce` is omitted alongside `visualDuration`, source uses `bounce || 0`, so it is critically damped).

| Preset (Motion params) | stiffness / damping (mass 1) | zeta | settle (1%) | overshoot | Use |
|---|---|---|---|---|---|
| `visualDuration .15, bounce 0` | 1218 / 70 | 1.00 | ~190ms | 0% | press, toggle thumb |
| `visualDuration .2, bounce 0` | 685 / 52 | 1.00 | ~255ms | 0% | tooltip/popover spring |
| `visualDuration .25, bounce 0` | 439 / 42 | 1.00 | ~320ms | 0% | menu, small panel |
| `visualDuration .3, bounce 0` | 305 / 35 | 1.00 | ~380ms | 0% | layout shifts, tab indicator, reorder |
| `visualDuration .4, bounce 0` | 171 / 26 | 1.00 | ~510ms | 0% | drawer, large panel |
| `visualDuration .3, bounce .2` | 305 / 27.9 | 0.80 | ~360ms | ~1.5% | drag release, playful toggle |
| `visualDuration .3, bounce .3` | 305 / 24 | 0.70 | ~375ms | ~4.5% | celebratory, upper limit |
| Motion implicit x/y | 500 / 25 | 0.56 | ~380ms | ~12% | **avoid** (default look) |
| Motion implicit scale | 550 / 46.9 | 1.00 | ~285ms | 0% | fine |
| Motion `spring()` default | 100 / 10 | 0.50 | ~880ms | ~16% | **avoid** for UI |
| Josh Comeau sandbox (m 1.75, 200/12) | | 0.32 | ~1300ms | ~35% | demo only |

Material 3 spring tokens (verified, androidx.compose.material3 `StandardMotionTokens` / `ExpressiveMotionTokens` v0_14_0; mass 1, damping is a ratio; "spatial" = position/size, "effects" = color/alpha):

| Token | Standard scheme (ratio / stiffness) | Expressive scheme |
|---|---|---|
| fast spatial | 0.9 / 1400 | 0.6 / 800 |
| default spatial | 0.9 / 700 | 0.8 / 380 |
| slow spatial | 0.9 / 300 | 0.8 / 200 |
| fast effects | 1.0 / 3800 | 1.0 / 3800 |
| default effects | 1.0 / 1600 | 1.0 / 1600 |
| slow effects | 1.0 / 800 | 1.0 / 800 |
Convert to Motion: `damping = 2 * ratio * sqrt(stiffness)` (mass 1). Standard default spatial = k700, c47.6, settles ~195ms, 0.1% overshoot. Lesson: M3 spatial springs overshoot slightly (or none in "standard"); effects springs never overshoot. Same split applies on the web: spring for transform, tween/critically-damped for opacity/color.

### 3.4 Material 3 duration and easing tokens (verified; material-web `v0_192/_md-sys-motion.scss`, android Motion.md)

| Duration token | ms | | Duration token | ms |
|---|---|---|---|---|
| short1 | 50 | | long1 | 450 |
| short2 | 100 | | long2 | 500 |
| short3 | 150 | | long3 | 550 |
| short4 | 200 | | long4 | 600 |
| medium1 | 250 | | extra-long1 | 700 |
| medium2 | 300 | | extra-long2 | 800 |
| medium3 | 350 | | extra-long3 | 900 |
| medium4 | 400 | | extra-long4 | 1000 |

| Easing token | CSS | Meaning |
|---|---|---|
| standard | `cubic-bezier(0.2, 0, 0, 1)` | utility motion that begins and ends on screen |
| standard-decelerate | `cubic-bezier(0, 0, 0, 1)` | utility, enters screen |
| standard-accelerate | `cubic-bezier(0.3, 0, 1, 1)` | utility, exits screen |
| emphasized | CSS web value `cubic-bezier(0.2, 0, 0, 1)`; Android uses a path `M0,0 C0.05,0,0.133333,0.06,0.166666,0.4 C0.208333,0.82,0.25,1,1,1` | expressive, begins and ends on screen |
| emphasized-decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | enters screen |
| emphasized-accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | exits screen |
| legacy | `cubic-bezier(0.4, 0, 0.2, 1)` (+ decelerate `0,0,0.2,1`, accelerate `0.4,0,1,1`) | M2 "fast-out-slow-in" |
| linear | `cubic-bezier(0, 0, 1, 1)` | simple non-stylized |

M3 typical pairing (read from Android docs): container transform incoming 300ms / outgoing 250ms with `legacy` easing; fade-through incoming 150 / outgoing 75ms linear [engine note: Android doc table text lists `motionDurationLong1` for "300ms" though the token is 450ms, treat the ms numbers in that table as defaults and the token names as unreliable]. Mapping to the web: enter = decelerate, exit = accelerate, on-screen = standard/emphasized. The M3 rule "decelerate to enter, accelerate to exit" differs from Emil's "ease-out for both"; see section 5.

### 3.5 Other numbers worth keeping

| Item | Value | Source |
|---|---|---|
| UI animation ceiling | 300ms | Emil |
| NN/g general range | 100-500ms; feedback ~100ms; modal 200-300ms; big move 400ms; >500 drags | NN/g (verified) |
| Press scale | 0.97 (band .95-.98); never <0.95 | Emil / make-interfaces |
| Enter-from scale | >= 0.9 (0.93-0.97 typical) | Emil |
| Tooltip enter scale | 0.97 | Emil |
| Blur to mask crossfade | `blur(2px)`; keep under 20px; heavy blur costs in Safari | Emil |
| Toast duration / stacking | 4s; 14px offset and 0.05 scale per index; velocity dismiss > 0.11 px/ms | Emil (Sonner) |
| Drawer curve/duration | `cubic-bezier(0.32,0.72,0,1)`, 500ms | Emil (Vaul) |
| Tap cancel on drag | pointer moves >3px cancels tap (Motion) | motion.dev gestures |
| iOS swipe hysteresis | ~10pt before recognizing swipe | WWDC18 |
| Double-tap cost | ~0.5s delay of single tap if double-tap supported | WWDC18 |
| 60fps frame budget | 16.6ms | Josh Comeau |
| INP | good <=200ms, poor >500ms (p75) | web.dev |
| Skeleton/spinner thresholds | <1s none; 2-10s spinner (single module) or skeleton (full page <10s); >10s progress bar with estimate | NN/g |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| `transition: transform 160ms var(--ease-out), opacity 160ms var(--ease-out)` | `transition: all 300ms` (animates unintended props, Vercel guideline) |
| Popover `scale(.95)->1` + opacity from trigger origin, 150-200ms | Popover scaling from center, 400ms, `ease-in` |
| Modal fade + 8-16px rise + `scale(.96)` centered, exit 150-200ms | Modal that flies in from `scale(0)` with 500ms bounce |
| Press `scale(0.97)` 100-160ms | No press state, or `scale(0.9)` |
| Sibling tooltips instant after first | Every tooltip repeats delay + animation |
| Toast enter via CSS transition (retargets when many added) | Toast via keyframes (jumps when added rapidly) |
| Hero: 4-6 chunks, 80ms stagger, total <1.2s, content readable without JS | Letter-by-letter headline over 3s, LCP text hidden until JS runs |
| Reduced-motion: swap slide for fade 0.2s | Reduced-motion: speed everything up (JS springs get faster, big motion stays) |
| Skeleton mirroring real layout after 200-300ms delay | Frame-only skeleton, or spinner for <1s waits |
| Use spring for drag-release with velocity | Use fixed-duration tween that ignores release velocity |

## 5. Exceptions & judgement calls

- **Exit easing conflict.** Emil / make-interfaces-feel-better: ease-out for both enter and exit. Material 3: decelerate in, accelerate out. Josh Comeau: ease-in only if the element leaves the viewport. Resolution [engine note]: default to ease-out for both (responsiveness), use accelerate only for full-viewport exits and swipe-away continuations.
- **Press scale.** 0.97 (Emil) vs 0.96 (make-interfaces skill). Both inside the .95-.98 band. Pick one globally via token.
- **Hover-out asymmetry.** Josh: slow out (450ms). Emil: remove hover animation if used many times a day. For app UI follow Emil; for marketing hover lifts follow Josh.
- **300ms ceiling vs native-feeling drawers.** Drawers/sheets at 500ms are correct when they follow a finger (iOS sheet), wrong for desktop popovers.
- **Personality overrides the table.** Sonner is intentionally slower (400ms, `ease`) to feel elegant. A playful consumer brand may use `bounce .2-.3` springs and 400ms durations; a dense B2B dashboard should sit at the low end (120-200ms). Choose a "motion personality" (crisp / balanced / expressive) per brief and scale all durations by 0.8 / 1.0 / 1.25 and bounce 0 / 0.1 / 0.25. [engine note]
- **Blur to mask crossfades** is an opinionated trick (Emil); verify it does not blur text legibility on slow devices.
- **Staggered entrance vs INP/LCP.** Stagger is decorative; never delay the LCP element's first paint (see `motion-a11y-perf-loading.md`).
- **WCAG 2.3.3 is AAA**: many teams only meet 2.2.2 (A). The engine should still implement `prefers-reduced-motion` by default since it is cheap.

## 6. Figures worth keeping

n/a (web sources, no page figures). Interactive references worth reproducing in `examples/`: Sonner toast stack (sonner.emilkowal.ski), Vaul drawer (vaul.emilkowal.ski), Raycast no-animation command palette, Family app drawer/morphing text (benji.org/family-values), Rauno interaction design essays (rauno.me/craft/interaction-design), WWDC18 #803 demos (PiP projection, Flashlight bounce hint).

## 7. Open questions

- **Apple HIG Motion page** is client-rendered; the official text could not be fetched. Summary (purposeful, optional, realistic feedback, brief, Reduce Motion minimization) comes from search-result mirrors and WWDC18 #803, which was fetched. Re-verify quotes against developer.apple.com/design/human-interface-guidelines/motion.
- **Material 3 tokens page** (m3.material.io) is also client-rendered; numbers above come from the Android Material Components docs, `material-web` SCSS tokens and androidx source (all primary, Google-owned). M3 "emphasized" has no single cubic-bezier; web implementations approximate it with `0.2,0,0,1`.
- **Dan Saffer** and **Disney 12 principles** were obtained via secondary summaries (IxDF article was fetched; the book was not). Treat the 100ms feedback guidance as classic HCI knowledge, not Saffer-sourced.
- **Benji Taylor / Paco Coursey**: benji.org/family-values was fetched (principles: purposeful directional transitions, morphing text keeping shared letters, persistent elements stay consistent, motion as trust signal, selective delight) but gave no numbers. No Paco Coursey primary source with motion numbers was found; his craft is mainly cmdk (command palette with no open animation) and sidebar/Next-themes `disable transitions on theme switch` trick. Treat as unverified.
- **animations.dev** course content is paywalled; only the syllabus was visible (Module 1 theory: easing, springs, timing, purpose, taste; Module 2 CSS; Module 3 Motion; Module 4 good vs great: emotional transfer, orchestration, a11y, performance). Emil's numeric rules in this file come from his free blog posts and the `emil-design-eng` skill installed locally (`~/.agents/skills/emil-design-eng/SKILL.md`), which is a second-hand encoding.
- **Distance-based duration tiers** (section 2.2) are my heuristic; M3 states that duration scales with size/distance but the page was not readable.

## 8. "Looks cheap" motion mistakes (checklist for generate + critique)

Each item: symptom -> fix -> mechanical check. Sources are the rules above; ordering is by how often models/templates produce them [engine note].

| # | Mistake | Fix | Check |
|---|---|---|---|
| 1 | Everything fades up on scroll, same 24px, same delay, every section | Reveal only 2-3 key beats; vary by content role; the rest static | count `whileInView`/`.reveal` per page > 6 |
| 2 | Default Motion bounce: `animate={{ x }}` with no `transition` (500/25 spring, ~12% overshoot) or `type:"spring"` with `bounce>0.3` | Token springs, `bounce: 0` default | grep `<motion` w/o transition; `bounce` > 0.3 |
| 3 | `transition: all 0.3s ease` everywhere | Explicit properties, token easing | grep `transition:\s*all` |
| 4 | `ease-in` or `linear` on enter/hover | `--ease-out` | computed timing fn |
| 5 | Durations 500ms-1s on buttons, menus, tabs | <=300ms; role table | computed durations |
| 6 | Hover scale-up on cards/buttons >1.05 with shadow jump, also on touch | scale 1.02-1.03 or lift 2px; `(hover:hover)` gate; none in dense lists | `:hover` transforms outside media query |
| 7 | `scale(0)` / `initial={{scale:0}}` pop-ins | start 0.95 + opacity | grep |
| 8 | Popovers/dropdowns animate from center | trigger `transform-origin` | computed origin |
| 9 | Exit as slow as enter, or no exit (elements vanish) | exit 60-75% of enter, smaller offset | enter/exit pair durations |
| 10 | Staggering 20+ items at 100-150ms (cascade takes 3s), letter-by-letter H1 | cap total, 30-80ms, group by lines | last delay + duration |
| 11 | Parallax on text, multi-speed layers, mobile included | decorative only, tiny delta, off on reduce/mobile | grep `useTransform` y on text containers |
| 12 | Scroll-jacked full-page sections / hijacked wheel speed / snap-mandatory on tall content | native scroll, `proximity` | JS `wheel` preventDefault; `scroll-snap-type: ... mandatory` |
| 13 | Infinite decorative loops (floating blobs, pulsing glows, marquee) all competing | one ambient loop max, stops on reduce, no pulse on CTA | count `infinite` |
| 14 | Gradient/aurora background animated via `background-position` / large blur on main thread | static or transform-only layer; paused offscreen | paint flashing, FPS |
| 15 | Glow/blur/backdrop-filter animated on hover with large radius | animate opacity of a pre-rendered layer | `filter`/`backdrop-filter` in transition lists |
| 16 | Animating `height/width/top/left/margin` | transform, grid-rows, `interpolate-size`, `layout` | grep properties in transitions |
| 17 | Animation on keyboard-driven / high-frequency actions (command palette, list nav, tab switching) | none | handler review |
| 18 | Same animation for every element type (fade-up everywhere) -> no hierarchy | staging: one primary motion, others subordinate | visual |
| 19 | Fake loading: spinner for instant results, 800ms artificial delay, skeleton of wrong shape | thresholds; no artificial delay; matched layout | visual / timing |
| 20 | Content hidden (`opacity:0`) before JS; flash then hide; LCP delayed | final state default; CSS keyframes; `fill-mode: both` | no-JS screenshot; LCP trace |
| 21 | Layout shift during/after animation (image loads, skeleton swap, scrollbar appearing) | reserve space; `scrollbar-gutter` | CLS |
| 22 | Mismatched personality: bouncy playful motion on a banking dashboard, or sterile linear fades on a playful brand | choose motion personality (crisp/balanced/expressive) | brief alignment |
| 23 | Inconsistent timing: five different durations/easings per page | tokens only | distinct computed (duration, easing) pairs > 6 |
| 24 | Carousels auto-advancing, no pause, <5s dwell | no autoplay or pause control (WCAG 2.2.2) | grep autoplay |
| 25 | Cursor-follower blobs, magnetic buttons everywhere, custom cursors replacing the native one | at most one, desktop fine-pointer only, never on forms | `pointer: fine` guard |
| 26 | Animated counters/typewriters on every stat and headline | static; animate one hero number once | count |
| 27 | Reduced-motion "support" = `animation-duration: 0.01ms` global | per-effect swap to fade | grep `0.01ms` |
| 28 | Page transitions that block navigation (500ms+ blank wipe) | 150-300ms crossfade, content only | route change timing |
| 29 | Press feedback missing or exaggerated (`scale(.9)`) | `0.97` | `:active` rule |
| 30 | Gesture UI that animates after release only (no 1:1 tracking), no velocity | track pointer, spring on release with velocity | `visual` on device |
