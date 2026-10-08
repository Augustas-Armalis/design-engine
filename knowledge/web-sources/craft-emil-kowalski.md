---
source: web:https://emilkowal.ski/
chapter: Emil Kowalski essays - motion taste, component craft (Sonner, Vaul), clip-path, taste as strict rules
pages: n/a (10 essays on the site index, fetched 2026-10-08; raw text in corpus/web/craft-essays/emil-*.txt, private)
topic_tags: [motion, animation, easing, duration, taste, toast, drawer, clip-path, microinteraction, frequency, press-feedback, popover, agent-skill]
status: studied
---

# Emil Kowalski: motion judgement, Sonner, Vaul, clip-path, taste as rules

Site index lists exactly ten essays, all read in full: you-dont-need-animations, 7-practical-animation-tips, developing-taste, agents-with-taste, building-a-toast-component, building-a-drawer-component, the-magic-of-clip-path, train-your-judgement, friction-as-a-feature, building-an-animation-course. All under `https://emilkowal.ski/ui/<slug>`. The hidden "breakdown" text of train-your-judgement (shown only after you pick A or B) was recovered from the page payload and the demo source, so the exercise answers below are the author's own.

Provenance legend: **(verified)** = stated in the essay or visible in the demo source; **(opinion)** = author taste; **[engine note]** = my synthesis, tune with ledger feedback. Notes are in my own words; numbers are exact.

## 1. Core ideas

1. **Every animation needs a stated purpose.** Valid purposes seen in the essays: explain a feature (the Linear product-intelligence marketing loop), give press feedback (button shrink), spatial consistency (Sonner enters and leaves in the same direction so swipe-down-to-dismiss feels natural), soften an abrupt appearance, or pure delight on something rarely used. If none applies, no animation. (you-dont-need-animations)
2. **Frequency of use is the gate.** Raycast opens hundreds of times a day with zero animation and he calls that optimal. Keyboard-initiated actions are never animated; hover effects used many times a day should get no animation. Delight is only acceptable on rarely used surfaces (the feedback-morph component is fine because it is touched rarely). (you-dont-need-animations, 7-practical-animation-tips #6)
3. **Speed is perceived performance.** 180ms dropdown beats 400ms; UI animation stays under 300ms; a faster spinner makes the load feel shorter. Exception that matters: duration scales with distance travelled, so a full-screen mobile menu needs MORE time than a tooltip (train-your-judgement ex.1: "bigger elements are heavier, a truck takes longer to stop than a bicycle").
4. **Easing is the single most important ingredient.** Same 300ms duration, `ease-in` feels slower than `ease-out` because it is slow exactly when the eye is watching. Built-in CSS curves are too weak; use custom, stronger curves. He ships an easing decision flowchart so an agent does not guess.
5. **Never animate from nothing.** `scale(0)` looks like the element came from nowhere; a deflated balloon still has a shape. Start at 0.9+ (examples use 0.93, skill table says 0.95, tooltips 0.97) with opacity.
6. **Anchored overlays grow from their trigger** (`transform-origin`), not from center. Unseen details compound ("a thousand barely audible voices singing in tune", Paul Graham quote used twice).
7. **Interruptibility beats fancy.** Keyframes cannot retarget mid-flight; CSS transitions can. Sonner switched from keyframes to transitions for exactly this; toggleable UI (menus, modals, accordions, drawers) should be transitions.
8. **Gestures: track 1:1, decide by momentum, add friction at the boundary.** Velocity threshold 0.11 px/ms in Sonner; drawers damp past the limit; ignore extra fingers; keep pointer capture.
9. **Taste is trained instinct, and it can be written down.** Almost every "taste" decision has a logical reason; articulate it, write it strict (tables, flowcharts, numeric bands), give it to agents as a skill. (developing-taste, agents-with-taste, train-your-judgement)
10. **Friction is a feature in building, not in using.** Cheap AI building removed the cost that used to filter ideas; the replacement is deliberate judgement before shipping. (friction-as-a-feature)

## 2. Rules

### 2.1 Purpose, frequency, speed

- **RULE** State one purpose for every animation (explain, feedback, spatial continuity, soften appearance, or rare-moment delight). If you cannot state one, remove it.
  **Why** Motion without purpose is noise that costs attention each time it repeats; unpurposeful motion also makes interfaces feel slow and can reduce trust.
  **Applies to** all. **Check** review: each `transition`/`animation`/Motion usage maps to a one-line purpose in the PR or ledger; unlabelled ones are flagged. **Source** https://emilkowal.ski/ui/you-dont-need-animations (verified)
- **RULE** Run the frequency test before animating: used 100+ times/day or fired by keyboard = no animation; tens of times/day (hover on list rows, menu rows) = no animation or near zero; occasional (modal, drawer, toast) = standard; rare (onboarding, feedback form, celebration) = may delight.
  **Why** Initial delight fades and the animation then slows users down and feels disconnected from the key they pressed.
  **Applies to** SaaS app UI. **Check** handlers bound to `keydown`/shortcut libs/`cmdk`-style lists produce no `transition`/`animation` on the changed element; list-row hover has `transition-duration: 0ms` or none. **Source** https://emilkowal.ski/ui/you-dont-need-animations ; https://emilkowal.ski/ui/train-your-judgement (verified)
- **RULE** Command palettes and keyboard-navigated lists: the highlight moves instantly (0ms). Judgement exercise "frequency of use": a 150ms hover-colour transition on menu rows is the worse choice, the 0ms version is the right one.
  **Why** The highlight lags the key press and the user's flow breaks.
  **Applies to** command palette, menus, selects navigated with arrows. **Check** computed `transition-duration` of `[role=option]`/`[role=menuitem]` backgrounds is `0s` under keyboard modality; `visual` otherwise. **Source** https://emilkowal.ski/ui/train-your-judgement (demo source: 150ms vs 0ms) (verified)
- **RULE** Keep UI animations under 300ms. Recommended bands: micro-interactions 100-150ms; standard UI such as tooltips and dropdowns 150-250ms; modals and drawers 200-300ms.
  **Why** Shorter animation makes the UI feel like it is listening; 180ms select beats 400ms.
  **Applies to** all except marketing hero choreography. **Check** parse computed `transition-duration`/`animation-duration`; flag >300ms on non-hero interactive elements; `visual` for JS springs. **Source** https://emilkowal.ski/ui/you-dont-need-animations ; https://emilkowal.ski/ui/agents-with-taste (verified)
- **RULE** Scale duration with the distance and size of the moving object: larger elements slower, longer travel longer. Exit animations can be about 20% faster than the entrance.
  **Why** Perceived velocity should stay constant; a short duration on a full-screen panel feels jarring.
  **Applies to** drawers, full-screen menus, side panels, modals. **Check** `exit duration <= 0.85 * enter duration` on paired overlays; for panels covering >50% of viewport width, duration >= 300ms is acceptable (demo: full-screen menu 400ms vs 200ms; the longer is the intended answer). **Source** https://emilkowal.ski/ui/agents-with-taste ; https://emilkowal.ski/ui/train-your-judgement (verified; the A/B labels of ex.1 were not mapped with certainty, the explanation text is unambiguous)
- **RULE** Bounce is a brand-personality dial: default to zero; add only a small value (demo compared bounce 0.4 vs 0) when the brand is explicitly playful (learning app yes, finance app no).
  **Why** Bounce reads as playful; zero reads as professional and safe.
  **Applies to** all. **Check** spring `bounce > 0` or overshoot `cubic-bezier` y>1 requires a recorded personality choice; `bounce >= 0.4` flagged. **Source** https://emilkowal.ski/ui/train-your-judgement (verified; demo values 0.4 vs 0)

### 2.2 Easing

- **RULE** Pick easing with this flowchart: entering or leaving the viewport -> ease-out; moving or morphing while staying on screen -> ease-in-out; hover/colour change -> ease; constant motion (marquee, progress, time) -> linear; default -> ease-out.
  **Why** Deceleration at the end is gentle, and the sharp start makes it feel faster.
  **Applies to** all. **Check** classify each transition by role; `linear` only on loops/progress/hold timers; bare `ease-in` on any enter animation is an error. **Source** https://emilkowal.ski/ui/agents-with-taste ; https://emilkowal.ski/ui/building-an-animation-course (verified)
- **RULE** Do not use `ease-in` for UI entering or exiting (the toast exercise: `cubic-bezier(.42,0,1,1)` loses to `cubic-bezier(.25,.1,.25,1)` at identical 400ms).
  **Why** It speeds up at the end, the opposite of what the eye wants; same duration, feels slower.
  **Applies to** all. **Check** computed `transition-timing-function` equals `ease-in` or `cubic-bezier(0.42, 0, 1, 1)` on enter/exit -> fail. **Source** https://emilkowal.ski/ui/7-practical-animation-tips #4 ; train-your-judgement ex.2 (verified)
- **RULE** Prefer stronger custom curves over the CSS keywords `ease-in-out`/`ease-out` for impact; source: easings.co, or the author's set. Curves he uses in the essays: drawer/sheet `cubic-bezier(0.32, 0.72, 0, 1)`; reveal/theme-wipe `cubic-bezier(0.77, 0, 0.175, 1)`; Sonner toast `ease` at 400ms; demo ease-out-cubic `[0.215, 0.61, 0.355, 1]` for staggered list items.
  **Why** Built-in curves are too gentle; "custom easing feels more energetic".
  **Applies to** all. **Check** grep tokens file for named curves; flag raw keyword `ease-in-out` on large moves. **Source** https://emilkowal.ski/ui/7-practical-animation-tips ; the-magic-of-clip-path ; building-a-drawer-component (verified)
- **RULE** Use `linear` only for a deliberately mechanical duration: hold-to-confirm fill is `clip-path` 2s `linear` on press, then release returns in 200ms `ease-out`.
  **Why** Slow where the user is deciding, fast where the system is responding; the linear 2s fill shows exact progress of a held press.
  **Applies to** destructive confirm buttons. **Check** `:active` transition 2s linear + release <=200ms ease-out for hold-to-delete; any other `linear` >200ms is suspect. **Source** https://emilkowal.ski/ui/building-an-animation-course (code sample) (verified)

### 2.3 Press, enter scale, origin, tooltips

- **RULE** Pressable elements shrink on `:active`: `transform: scale(0.97)` with `transition: transform 160ms ease-out`. Do not go to 0.9 (the judgement exercise labels a clearly visible shrink too aggressive).
  **Why** Immediate acknowledgement that the interface heard you.
  **Applies to** buttons, chips, cards. **Check** `:active` rule exists with scale in [0.95, 0.98]; transition 100-160ms. **Source** https://emilkowal.ski/ui/7-practical-animation-tips #1 ; train-your-judgement ex.6 (demo: 0.9 vs 0.97) (verified)
- **RULE** Never animate in from `scale(0)`. Start from a visible shape: default 0.95 + opacity 0; allowed 0.9+ for larger surfaces; tooltips/very small popovers 0.97.
  **Why** Real objects do not appear from a point; a deflated balloon keeps a shape.
  **Applies to** all enter animations. **Check** grep `scale(0)`, `scale: 0`, `initial={{ scale: 0 }}`, `scale-0` on enter states; compute `initial scale >= 0.9` (see section 5 for the 0.8 conflict). **Source** https://emilkowal.ski/ui/7-practical-animation-tips #2 ; agents-with-taste ; train-your-judgement ex.3 (verified)
- **RULE** Anchored popovers, dropdowns and menus set `transform-origin` to the trigger. Base UI: `transform-origin: var(--transform-origin)`; Radix: `transform-origin: var(--radix-dropdown-menu-content-transform-origin)` (use the matching variable per primitive). Center origin is wrong for anchored overlays. Modals stay center-origin.
  **Why** Growth out of the trigger shows causality. The difference shows most when both axes mismatch (top-right).
  **Applies to** popover, menu, select, tooltip. **Check** computed `transform-origin` of anchored popups is not `50% 50%` unless the popup is centered on its trigger. **Source** https://emilkowal.ski/ui/7-practical-animation-tips #5 ; train-your-judgement ex.9 (verified)
- **RULE** Tooltip: delay before the first one opens; once one is open, siblings open instantly with no animation. With Base UI: `[data-instant]{transition-duration:0ms}`. Tooltip enter transition: `transform 0.125s ease-out, opacity 0.125s ease-out`, from `scale(0.97)` and opacity 0, origin = trigger.
  **Why** The delay prevents accidental activation; skipping it for neighbours makes the whole toolbar feel fast.
  **Applies to** icon toolbars, SaaS app UI. **Check** CSS contains a `[data-instant]` (or equivalent) zero-duration rule; tooltip transition is 125ms. **Source** https://emilkowal.ski/ui/7-practical-animation-tips #3 (verified)
- **RULE** Use `will-change: transform` when an animation looks shaky; animate a child instead of the parent when hover causes flicker; give small tap targets a 44px minimum hit area using a pseudo-element.
  **Why** Promotes the layer to the compositor; moving the hovered element changes the hover hit area and re-triggers hover; small hit areas fail touch.
  **Applies to** buttons, icon buttons, hover cards. **Check** icon-only buttons: pseudo-element or padding yields >= 44x44 hit box; `will-change` only toggled on elements that actually animate. **Source** https://emilkowal.ski/ui/agents-with-taste (skill table) (verified, from the author's skill file)
- **RULE** Add a small blur (about 2px) to a crossfade when the two states read as two separate objects and tuning easing/duration did not fix it. Keep blur under 20px.
  **Why** Blur bridges old and new state so the eye reads one morphing object. It is a last resort, not a default.
  **Applies to** icon/label swaps, button state crossfades. **Check** `filter: blur()` in a transition is <= 4px (his demo: 2px); no blur transition on large areas. **Source** https://emilkowal.ski/ui/7-practical-animation-tips #7 ; agents-with-taste (verified; the 4px ceiling is [engine note])
- **RULE** Sequence the layered pieces of an entrance by importance, not uniformly: the least important element (a pill badge) only fades, the headline moves most. Stagger delays must differ per tier; uniform delays flatten hierarchy.
  **Why** Motion encodes importance; uniform stagger looks artificial.
  **Applies to** landing hero, empty states, onboarding. **Check** `visual`: delays differ per hierarchy tier; not all siblings share one step. **Source** https://emilkowal.ski/ui/train-your-judgement ex.10 (verified; demo delays 0.2 / 0.3 / 0.4 / 0.5 s)
- **RULE** Do not layer entrance animations on a panel and its children (panel slides in with a 0.28s delay, children then stagger at 0.05s steps after a 0.3s delayed start). Prefer the single-step version.
  **Why** Layering adds time before the content is usable; the exercise's right answer is the one without layers.
  **Applies to** side panels, menus, sheets. **Check** child `delayChildren`/delay <= the parent's duration; total entrance <= 300ms for panels. **Source** https://emilkowal.ski/ui/train-your-judgement ex.11 (verified, demo source)

### 2.4 Interruptions, removal, state

- **RULE** Toggleable UI (menus, modals, accordions, drawers, toasts) uses CSS transitions or springs, not keyframe animations, so rapid toggling retargets smoothly instead of jumping.
  **Why** A keyframe cannot change its end value while running; a transition can.
  **Applies to** all interactive overlays. **Check** `animation:`/`@keyframes` on elements that toggle on user input -> flag; `transition:` expected. **Source** https://emilkowal.ski/ui/building-a-toast-component ; train-your-judgement ex.8 (verified)
- **RULE** With Motion's `AnimatePresence`, use `mode="popLayout"` when removing items from a flowing list so the exiting item leaves document flow on frame one and siblings reflow in parallel with the exit.
  **Why** Default mode keeps the exiting element in flow until it finishes, so the gap closes after a pause.
  **Applies to** chips, tags, list rows, toasts. **Check** grep `AnimatePresence` around list item removal: `mode="popLayout"` present, children have `layout`. **Source** https://emilkowal.ski/ui/train-your-judgement ex.7 (verified; demo exit `{opacity:0, scale:0.8}`)

### 2.5 Toast (Sonner)

- **RULE** Toast enters from translateY(100%) via a mounted-state flip and a CSS transition (`transform 400ms ease`), not a keyframe; the exit leaves in the same direction as the entrance.
  **Why** Spatial consistency makes swipe-down-to-dismiss feel natural; transitions survive rapid additions.
  **Applies to** toast, snackbar. **Check** `data-mounted` (or `@starting-style`) pattern; entry and exit axis identical. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified; `@starting-style` mentioned as a simpler modern option)
- **RULE** Stacked toasts: position absolute; y offset = 14px * index (the `lift` gap), scale = 1 - 0.05 * index (0.95, 0.9 ...); in stacked mode all toasts take the height of the front toast so edges line up; hovering the area expands to real heights (offset = sum of preceding heights + gap * index).
  **Why** Scale and offset create depth; uniform height keeps the stack tidy.
  **Applies to** toast stacks. **Check** computed transforms of toast N: `translateY(-14px*N) scale(1-0.05N)` (14px, 0.05 are Sonner defaults, tune with brand). **Source** https://emilkowal.ski/ui/building-a-toast-component (verified)
- **RULE** Toast lifetime is 4 seconds by default; pause the timer while hovered and while `document.hidden` is true (visibilitychange).
  **Why** A toast fired in a background tab expires unseen.
  **Applies to** toast. **Check** timer logic reads `document.hidden`; `duration` default 4000ms. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified)
- **RULE** Swipe-to-dismiss is momentum-based: remove if `abs(distance) >= SWIPE_THRESHOLD` OR `velocity = abs(distance) / elapsedMs > 0.11`. Update a CSS variable (`--swipe-amount`) during the move; capture the pointer at drag start so dragging continues outside the element; allow upward drag with friction (slows and stops) instead of a hard block.
  **Why** A fast short flick expresses intent; hard walls feel broken; pointer capture prevents dropped gestures.
  **Applies to** toast, sheet, drawer, mobile cards. **Check** velocity branch exists; `setPointerCapture` on pointerdown; reverse-direction drag is damped. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified; 0.11 found by trial and error per the author)
- **RULE** Fill the gaps between stacked toasts with an `:after` pseudo-element so the hover state does not drop when the pointer crosses a gap.
  **Why** Gaps belong to no toast, so the expanded state would collapse.
  **Applies to** stacked or gapped hover groups (toasts, toolbars, nested menus). **Check** hover container has no dead gaps; pseudo-element bridges them. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified)
- **RULE** API for imperative UI: expose a function you can call anywhere (`toast("text")`), one mount point (`<Toaster />`), and a promise form with three states (loading, success, error). No hooks or context required of the caller.
  **Why** Developer experience decided adoption; the other half of Sonner's success was beautiful defaults and animation.
  **Applies to** component libraries. **Check** `visual`/API review: one import, one mount. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified; opinion on cause of success)

### 2.6 Drawer (Vaul)

- **RULE** Sheet/drawer motion: `transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)` (matches the iOS sheet curve from Ionic). 500ms is correct here even though general UI stays under 300ms, because it mimics the native sheet and follows a finger.
  **Why** Matching the native curve and duration makes it feel native.
  **Applies to** mobile drawers/sheets. **Check** computed curve equals `cubic-bezier(0.32, 0.72, 0, 1)`; duration 500ms for finger-driven sheet only. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** During a drag write `transform: translateY(npx)` directly on the dragged element; do not update an inherited CSS custom property.
  **Why** Changing an inherited variable recalculates style for every descendant; with a ~20+ item list the drag dropped frames, direct style fixed it.
  **Applies to** any drag or scroll-linked update at 60fps. **Check** pointermove handler writes `element.style.transform`, not `style.setProperty('--x')` on a parent of a large subtree. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** Drag vs scroll: only start dragging the drawer when its inner content is scrolled to the top; after a fast scroll reaches the top, block drag for 100ms so momentum does not close it by accident. Dragging up past the top is damped (the farther you drag the less it moves).
  **Why** Mirrors native sheets; real objects slow before they stop.
  **Applies to** scrollable drawers. **Check** `shouldDrag` guard; 100ms lockout; damping function. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** Ignore touches after the first one until release (multi-touch guard); keyboard avoidance uses `visualViewport` resize: set drawer height to `visualViewport.height - OFFSET` and `bottom = max(innerHeight - visualViewport.height, 0)`.
  **Why** A second finger makes the drawer jump; the browser's default scroll-to-input hides content.
  **Applies to** mobile sheets with inputs. **Check** test on a physical device: open drawer, focus input, content stays visible; second finger does nothing. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** Snap points: on release, snap to the nearest point (fractions of viewport or fixed px; px for inputs that must stick out evenly); flick velocity may skip points or dismiss.
  **Why** Matches iOS Maps-style sheets, momentum-aware.
  **Applies to** bottom sheets. **Check** nearest-point logic + velocity. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** Background-scale effect: while a drawer opens, scale the page wrapper and animate its border radius from the drag progress (dragging 40% down gives 60% of the max radius).
  **Why** Makes the page read as a lower sheet.
  **Applies to** mobile drawers. **Check** `visual`. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)
- **RULE** Test touch components on a real phone (USB plus Safari devtools) or the Xcode simulator, not by shrinking a desktop window.
  **Why** Keyboard, momentum, safe areas and multi-touch only exist on device.
  **Applies to** mobile/gesture UI. **Check** ledger entry names the device. **Source** https://emilkowal.ski/ui/building-a-drawer-component (verified)

### 2.7 Clip-path

- **RULE** Prefer animating `clip-path: inset(...)` over width/height for reveals, comparison sliders, tab indicators and scroll-progress lines: no layout shift, compositor-friendly, no extra overflow wrapper.
  **Why** The element already occupies its space; only visibility changes.
  **Applies to** image reveal, before/after slider, tabs, progress line, theme wipe. **Check** reveal animations animate `clip-path`/`transform`/`opacity`, not `height`/`width`. **Source** https://emilkowal.ski/ui/the-magic-of-clip-path (verified)
- **RULE** Image reveal: start `clip-path: inset(0 0 100% 0)` -> `inset(0 0 0 0)`, 1s, `cubic-bezier(0.77, 0, 0.175, 1)`, trigger once when at least 100px of the image is in view (`useInView({ once: true, margin: "-100px" })`, or IntersectionObserver).
  **Why** Triggered at viewport entry or the user never sees it.
  **Applies to** landing page imagery. **Check** observer or `useInView` present, `once`; duration 1000ms is a hero value, not UI (see section 5). **Source** https://emilkowal.ski/ui/the-magic-of-clip-path (verified)
- **RULE** Tabs with a colour-inverting indicator: duplicate the tab list with active styling (blue background, white text), `aria-hidden` and `tabIndex=-1`, and clip it to the active tab with `inset(0px R% 0px L% round 17px)`; animate that value on change. Do not rely on a text-colour transition.
  **Why** The text and background change in one stroke; colour transitions never match the sliding indicator.
  **Applies to** segmented controls, tab bars. **Check** overlay copy is `aria-hidden`; clip uses offsetLeft/offsetWidth percentages. **Source** https://emilkowal.ski/ui/the-magic-of-clip-path (verified)
- **RULE** Scroll-progress line: map `scrollYProgress` (offset `["start end", "end end"]`) to clip `inset(0 0 X% 0)` with X from 100% to 0%.
  **Why** Looks drawn like SVG but is a clipped div; the offset prevents reversal after the section passes.
  **Applies to** timelines, vertical rails. **Check** `visual`. **Source** https://emilkowal.ski/ui/the-magic-of-clip-path (verified)

### 2.8 Taste and process

- **RULE** Turn each taste decision into a written rule with the reason, numbers, and a decision table or flowchart; keep it strict so an agent does not invent its own rules. Package per aspect (animation, typography, layout, icons, colour) as skill files.
  **Why** "That's the why. There's no magic." Strict rules transfer taste to agents.
  **Applies to** the engine's own knowledge notes. **Check** every taste rule in `knowledge/` has Why and a Check or `visual`. **Source** https://emilkowal.ski/ui/agents-with-taste (verified)
- **RULE** Calibrate taste by studying, not liking: do not label things good or bad; explain why a specific interaction feels good; keep a curated list of respected makers; practise building; ask critique from the right person.
  **Why** "Taste is a trained instinct", not personal preference.
  **Applies to** process. **Check** ledger notes contain a reason for each approval or rejection. **Source** https://emilkowal.ski/ui/developing-taste (verified)
- **RULE** Train judgement with paired comparisons: view A and B, pick, write the reason in words, then compare to a reference breakdown. Cover size, easing, entry, intent, frequency, scale, removal, interruption, popover origin, stagger, layering.
  **Why** Writing why builds the skill of articulating judgement; AI-generated motion "works but feels mediocre".
  **Applies to** critique step. **Check** each A/B decision in review logs includes a one-line reason tied to a rule id. **Source** https://emilkowal.ski/ui/train-your-judgement (verified)
- **RULE** Keep deliberate friction in the build process: for each AI-generated section or effect write what it is for and drop it if it has no reason.
  **Why** Cheap generation removed the cost that filtered weak ideas; unthought output "exists but is not designed".
  **Applies to** engine pipeline. **Check** brief-to-render ledger lists a purpose per section. **Source** https://emilkowal.ski/ui/friction-as-a-feature (verified; the application to the pipeline is [engine note])
- **RULE** Ship documentation that lets people touch the component: interactive examples with copy-ready code, built before launch.
  **Why** Lowers the barrier; part of why Sonner won.
  **Applies to** component libraries, design system docs. **Check** every component doc has a live demo. **Source** https://emilkowal.ski/ui/building-a-toast-component (verified)
- **RULE** Typography rules from his skill file: cap body text near 65ch; `tabular-nums` on price/number columns; use the ellipsis character `…` not `...`; loosen letter-spacing on uppercase labels; declare a fallback stack with matching x-height and weight to avoid layout shift; underline only links; prefer bold over italic for interface emphasis.
  **Why** Each one protects reading rhythm, alignment, or an affordance.
  **Applies to** all. **Check** `max-width` of text blocks <= 70ch; `font-variant-numeric: tabular-nums` on numeric columns; uppercase labels have `letter-spacing > 0`; non-link elements have no `text-decoration: underline`. **Source** https://emilkowal.ski/ui/agents-with-taste (verified)

## 3. Numbers & scales

| Item | Value | Source essay |
|---|---|---|
| UI animation ceiling | < 300ms | you-dont-need-animations, 7 tips |
| Dropdown comparison | 180ms feels better than 400ms | 7 tips #6 |
| Micro-interactions | 100-150ms | agents-with-taste skill table |
| Tooltips / dropdowns | 150-250ms | agents-with-taste |
| Modals / drawers | 200-300ms | agents-with-taste |
| Exit vs enter | about 20% faster exit | agents-with-taste |
| Press scale | 0.97 on `:active`, `transition: transform 160ms ease-out` | 7 tips #1, course snippet |
| Too-strong press scale | 0.9 (marked worse) | train-your-judgement ex.6 |
| Enter-from scale | 0.9+; 0.93 example; 0.95 skill table; tooltip 0.97; popover demo 0.85 | tips #2, agents-with-taste, ex.9 demo |
| Chip exit | `opacity 0, scale 0.8` in the popLayout demo | ex.7 demo |
| Tooltip enter | `transform .125s ease-out, opacity .125s ease-out`, scale 0.97, `[data-instant]` 0ms | tips #3 |
| Popover demo | opacity + scale 0.85 -> 1, 0.15s, `[0.32, 0.72, 0, 1]`, origin top left vs center | ex.9 |
| Blur mask | `blur(2px)` on crossfade; cap under 20px | tips #7, skill |
| Min hit area | 44px (pseudo-element) | agents-with-taste |
| Toast lifetime | 4s; paused on hover and hidden tab | toast |
| Toast enter | `translateY(100%) -> 0`, `transform 400ms ease` | toast |
| Toast stack | y = 14px * index; scale 1 - 0.05 * index | toast |
| Swipe velocity | > 0.11 px/ms (distance / elapsed ms) | toast |
| Drawer | `transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)` | drawer |
| Drawer scroll lockout | 100ms after reaching top | drawer |
| Drawer theme-color demo | 50 interpolation steps every 10ms = 500ms; use `bezier-easing` with the same curve; linear for drag | drawer |
| Drawer drag perf trap | inherited CSS variable on list >~20 items | drawer |
| Image reveal | 1s `cubic-bezier(0.77, 0, 0.175, 1)`, `inset(0 0 100% 0)` -> `inset(0 0 0 0)`, margin -100px | clip-path |
| Tab clip | `inset(0px 75% 0px 0% round 17px)` example | clip-path |
| Hold-to-delete | press: `clip-path` 2s linear + `scale(0.97)`; release 200ms ease-out; track `inset(0 100% 0 0)` -> `inset(0 0 0 0)` | animation-course snippet |
| Mobile menu demo | duration 0.2 vs 0.4 with `[0.32, 0.72, 0, 1]` | ex.1 |
| Stagger demo | list items 0.05s step, delayChildren 0.3, item 0.3s `[0.215, 0.61, 0.355, 1]`, y 8 | ex.11 |
| Hero hierarchy demo | pill fades (no travel), headline moves; blur(10px) -> 0, translateY 30% / 20%, 1s `[0.25, 0.1, 0.25, 1]` | ex.10 |
| Course easing set (6 of 18 shown) | breeze `.55,.085,.68,.53`; silk `.52,.062,.64,.21`; swift `.86,.04,.67,.24`; nova `.73,.065,.82,.08`; crisp `.92,.06,.77,.045`; glide `.58,.06,.95,.32` (all ease-in-style; other 12 are paid) | animation-course |
| Body measure | ~65ch | agents-with-taste |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| Command palette opens and moves highlight instantly | Fade-and-scale on a command menu opened hundreds of times a day |
| Button `:active` scale 0.97, 160ms ease-out | Press scale 0.9 that is visibly a shrink |
| Popover scale 0.9-0.95 + opacity from trigger origin | `scale(0)` or center origin for an anchored popover |
| `ease-out`-family curve at 300ms | `ease-in` at 300ms on an enter animation |
| Transitions on toggleable menus; Motion `popLayout` on list removal | Keyframes that jump when retargeted; default AnimatePresence exit that delays sibling reflow |
| Full-screen mobile menu 400ms with a strong ease-out | Same 200ms as a tooltip on a screen-size panel |
| Hero where badge only fades and headline moves most | Uniform 100ms stagger on four elements |
| Single-step panel entrance | Panel delay then child stagger layered on top |
| Bounce 0 default, small bounce for explicitly playful brands | Bounce 0.4 on a finance product |
| Direct `transform` writes during drag | CSS variable updated on a parent with 20+ children |
| Pause toast timer when tab hidden | Fixed 4s timer that expires while the tab is in the background |

## 5. Exceptions & judgement calls

- **Conflict A: entering scale 0.8 vs 0.9-0.95.** Vercel Web Interface Guidelines (and the interfaces.rauno.me checklist) say fade dialogs in from "~0.8" scale; Emil says start at 0.9+ (examples 0.93 / 0.95 / 0.97) and his own popover demo uses 0.85, his chip exit uses 0.8. The sources disagree because the visual effect depends on pixel displacement, not on the number: displacement per edge = `(1 - s) * dimension / 2`. A 0.8 scale on a 200px popover moves each edge 20px, on a 560px dialog 56px (a huge swoop). Recommended resolution [engine note]: keep a per-edge displacement of about 6-16px. Tokens: tooltip/small chip 0.95-0.97; menus and popovers (<= 320px) 0.9-0.95; dialogs and sheets (>= 400px) 0.96-0.98 or no scale (fade + 8-16px rise); absolute floor 0.85 for anything other than a small exit; never `scale(0)`. Lint: fail if `initial scale < 0.85`, warn if `(1 - s) * width / 2 > 20px`. Reason: it honours both authors (0.8 is acceptable on small elements, 0.9+ on large) and has a mechanical check. To be confirmed by a rendered test in `evals/` (ingestion-queue gap 6).
- **Conflict B: duration ceiling.** Rauno/Vercel guidelines: interaction animations not more than 200ms; Emil: under 300ms; hub: <= 300ms. Resolution: micro-interactions (hover, press, toggle, tooltip, menu) <= 200ms; overlays 200-300ms; finger-driven sheets 500ms; full-screen panels 300-400ms (Emil's own mobile menu answer); hold-to-confirm 2s linear is a deliberate exception. Reason: the ceilings measure different things (feel of a response vs travel of a large object); distance scaling is Emil's explicit rule.
- **Conflict C: press scale.** Emil 0.97 vs hub note on 0.96 vs interfaces.rauno.me "~0.96, ~0.9, or so". Emil's own exercise marks 0.9 too strong. Keep the band 0.95-0.98 and ban 0.9. Reason: a visible shrink reads as a state change, not feedback.
- **Conflict D: default easing.** Hub token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; Emil's demos use the sheet curve `(0.32, 0.72, 0, 1)` for popovers and panels and plain CSS `ease` for Sonner. Both are strong decelerating curves. Keep `--ease-out` for general UI and `--ease-sheet = (0.32, 0.72, 0, 1)` for panels, popovers and sheets; accept `ease` only for hover colour and slower, personality-driven components. Do not treat the three as errors.
- **Conflict E: stagger.** Hub rule: `delay = min(i, 8) * step` with 30-80ms uniform step; Emil says uniform stagger removes hierarchy. Reconcile: keep an index-based step for repeated lookalike items (lists, grids); use tiered, non-uniform delays for semantically different hero elements.
- **Conflict F: 300ms ceiling vs Sonner 400ms `ease`.** Emil states under 300ms but ships 400ms for toasts on purpose. Personality override; note in ledger.
- **Image reveal 1s and theme wipe 1s** are showcase effects, not UI; do not use them on frequent actions.
- **Blur trick (opinion).** Emil recommends blur to mask imperfect crossfades; Vercel guidelines warn large blur is slow and Paco notes `filter: blur()` bleeds light at edges. Keep it small (<= 4px) and animate on small elements only.
- **Taste vs speed.** Course tweets (shadcn: "design engineering is mostly deciding what not to animate") reinforce rule 2.1; but Benji argues for motion in low-frequency flows (see craft-benji-lovin-paco.md): consistent with the frequency gate.

## 6. Figures worth keeping

Interactive references to reproduce in `examples/`: Sonner stacked toast (sonner.emilkowal.ski); Vaul drawer with background scale (vaul.emilkowal.ski); the keyboard-list animation vs no-animation toggle (you-dont-need-animations); the 11 A/B exercises of train-your-judgement (best single source of "what does wrong look like" for critique tests); clip-path tabs and the hold-to-delete button; Family-style drawer rebuilt with Vaul.

## 7. Open questions

- The exact SWIPE_THRESHOLD in Sonner is a constant not given in the essay (the source code uses a pixel threshold; unverified here). Do not hardcode without checking the library.
- Exercise 1 and 5 A/B labels could not be mapped with certainty to the demo components, so the rule uses the explanation text.
- 12 of the 18 course easings and the full animations.dev skill file are paid or not on the pages read.
- Rendered test needed to settle conflict A in `evals/`.

## 8. Taste method

How Emil turns taste into checkable rules:

1. **Observe, then explain.** Do not label things good or bad; ask why a specific interaction feels good ("scale(0) feels wrong because it appears from nowhere; a balloon keeps its shape"). The explanation is the rule's Why.
2. **Compare in pairs, change one variable.** Every exercise differs in exactly one thing (duration, easing, origin, scale, mode). He asks the reader to write the reason before revealing his breakdown. This is a trainable loop: pick, justify in words, check against a reference.
3. **Name the variable and give it a band.** 0.97 press, 0.9+ enter, under 300ms, 125ms tooltip, 4s toast, 0.11 px/ms velocity: every claim is a number with a trial-and-error origin, not an adjective.
4. **Turn the number into a decision structure.** Easing flowchart (enter/exit -> ease-out; on-screen move -> ease-in-out; hover -> ease; constant -> linear; default ease-out), duration table by element type, "scenario -> solution" practical-tips table. Structures are what an agent can follow without guessing.
5. **Frequency as the master variable.** Before any style choice, ask how often the user will see this; it overrides novelty and polish.
6. **Context decides the dial.** Bounce, duration and curve are brand-personality parameters (learning app vs finance app), so the rule states a default and the condition for deviating.
7. **Package and test.** Strict rules in skill files; run the agent against a real component and read its issue list plus before/after table.
8. **Keep friction before shipping.** State a purpose per element; cheap generation needs deliberate judgement gates.

How the engine can use it: every motion rule needs Why + number + role + deviation condition; critique prompts should be paired comparisons with a written reason.

## 9. Craft details catalogue

| Name | What | How |
|---|---|---|
| Press shrink | Button scales down while held | `.button:active{transform:scale(0.97)}`, `transition: transform 160ms ease-out` |
| Origin-aware popover | Popover grows from its trigger | `transform-origin: var(--transform-origin)` (Base UI) or Radix content transform-origin variable |
| Instant sibling tooltip | Second tooltip opens with no delay and no animation | `[data-instant]{transition-duration:0ms}` |
| Blur bridge | Crossfade looks like one object | add `filter: blur(2px)` on the swap, also scale 0.97 on press |
| Hit-area extender | 44px tap target on small control | pseudo-element larger than visible control |
| Hover without flicker | Hover target stays stable | animate a child element, not the hovered parent |
| Hidden-tab pause | Toast timer stops when tab not visible | `document.hidden` + `visibilitychange` |
| Gap bridge | Stacked toasts keep hover across gaps | `:after` pseudo-element filling the gap |
| Pointer capture drag | Drag continues outside element | `setPointerCapture` at drag start |
| Boundary friction | Dragging past limit slows then stops | damping function, not a clamp |
| Momentum dismiss | Short fast flick closes | `abs(dist)/ms > 0.11` |
| Equal-height stack | Different-height toasts stack neatly | all toasts take front toast height in stacked mode |
| Promise toast | One call covers loading, success, error | `toast.promise(promise, {loading, success, error})` |
| Scroll-vs-drag guard | Drawer drags only at scroll top | `shouldDrag` + 100ms lockout after reaching top |
| Page-as-sheet | Background scales and rounds while drawer opens | wrapper transform + radius driven by drag progress (40% drag = 60% max radius) |
| Snap points | Drawer rests at fractions or px | nearest point on release; flick may skip |
| Keyboard-aware drawer | Content not hidden by virtual keyboard | `visualViewport` resize -> height and bottom |
| One-finger rule | Second touch ignored | `if (isDragging) return` on press |
| Safari theme-colour sync | Browser bar tint follows overlay | precompute 50 non-transparent colours, update `meta[name=theme-color]` every 10ms for 500ms, easing via `bezier-easing`; linear for drag (not shipped in Vaul, idea only) |
| Comparison slider | Before/after on one stack | overlay two images, clip top one with `inset(0 X% 0 0)` |
| Text mask effect | Dashed vs filled halves of text | two overlapped copies clipped `inset(0 0 50% 0)` / `inset(50% 0 0 0)` by pointer |
| Image reveal on scroll | Image wipes in once | `inset(0 0 100% 0)` -> `inset(0)` 1s `cubic-bezier(0.77,0,0.175,1)`, `useInView once margin -100px` |
| Drawn line on scroll | Vertical line grows with scroll | `useScroll` + `useTransform` + `useMotionTemplate` into `clip-path` |
| Clip-path tabs | Indicator that inverts text colour | duplicate list clipped to active tab, `aria-hidden` |
| Theme wipe | Dark/light revealed by wiping | duplicate page layers, animate `clip-path` (View Transitions API is the modern route) |
| Hold to delete | Press-and-hold fills the button | overlay `clip-path` 2s linear on `:active`, 200ms ease-out back |
| Chip removal | Siblings close the gap immediately | `AnimatePresence mode="popLayout"` + `layout` |
| Hero hierarchy | Importance encoded in motion | least important element only fades; headline travels farthest |
| Stripe-style docs | Touchable docs | interactive demos with copy code |
| Melting logo easter egg | Course logo melts as enrolment closes | animated SVG path progress tied to time (animations.dev) |
| Motion Passport | Personalised onboarding artefact | welcome page after enrolment (animations.dev) |
