---
source: web:https://www.joshwcomeau.com/ (designing-shadows, introducing-shadow-palette-generator, backdrop-filter, header-blockers, make-beautiful-gradients, css-transitions, linear-timing-function, keyframe-animations, partial-keyframes, starting-style, squash-and-stretch, scroll-driven-animations, color-shifting, 3d-button, a-friendly-introduction-to-spring-physics, css-vs-javascript, dynamic-bezier-curves, react/boop, react/prefers-reduced-motion, react/rainbow-button, color-formats, pixel-perfection, blog/whimsical-animations) - fetched 2026-10-08
chapter: Josh Comeau - CSS depth (shadows, glass), gradients and colour shifting, transitions, easing, springs, keyframes, scroll-driven motion
pages: n/a (web sources; each article was re-read from the saved HTML)
topic_tags: [shadows, elevation, depth, glass, backdrop-filter, gradients, colour-interpolation, transitions, easing, linear-easing, springs, keyframes, starting-style, scroll-driven, reduced-motion, performance, micro-interaction]
status: studied
---

# Josh Comeau: CSS depth and motion

Raw text: `corpus/web/comeau-heckel/comeau/*.html|*.txt` (private, gitignored). Everything below is my own paraphrase; numbers are copied exactly from the articles. Article "last updated" stamps are 2025-2026, so browser-support numbers quoted here are the author's, dated where he dates them. Companion files: `comeau-layout-and-mechanics.md`, `heckel-shaders-and-effects.md`. Rule ids `JC-DM-nn` are stable.

Evidence tags: **[source]** stated in the article; **[verified]** I reproduced it in Chromium 156.0.8078.4 through Playwright (repo `node_modules`) on 2026-10-08; **[engine note]** my own inference. Anything not tagged as verified is [untested] in a browser.

---

## 1. Core ideas

1. **Shadows are an elevation language, not decoration.** A bigger shadow means "closer to the viewer", and the nearer thing pulls the eye first; Comeau uses elevation either to raise the prominence of one element (a dialog over a header) or to make the interface feel tactile. Pick a purpose before adding a shadow.
2. **Build one lit environment.** Every shadow on the page comes from the same far-away light, so they all share one angle (offset ratio). Per-element tinkering produces "a bunch of blurry borders".
3. **Higher = further offset, blurrier, fainter.** Press a hand to a desk and lift it: the shadow moves away, softens and fades. That intuition is the whole rule.
4. **Layering fakes a penumbra.** box-shadow is a cheap one-pass blur; stacking 3 to 5 doubling layers is the nearest thing to a soft real shadow. Cost scales with layer count, so it is a ceiling, not a target.
5. **Black alpha desaturates; a darker same-hue colour glows; the right answer sits between.** Shadow colour is a hue-matched, medium-saturation colour, stored as a variable that you redefine when the backdrop changes.
6. **Frosted glass needs three fixes to look real**: let the blur see nearby content (oversize + mask), stop the stray colour flicker at the viewport edge (opaque-to-clear gradient), and thicken it when it gets distracting (more blur or a semi-opaque fill). An optional second edge strip fakes glass thickness.
7. **Gradients and colour tweens die in a grey dead zone** because browsers average the red, green and blue channels. Complementary-ish endpoints meet in grey. Either interpolate in a perceptual space, or tween the hue itself.
8. **Think in actions, not states.** Hover-in, hover-out, press and release can each get their own duration and curve. Quick on the way in, lazy on the way out; 34 ms (about 2 frames) for a press.
9. **Animate the compositor properties** (transform, opacity, filter). Layout properties (height, margin, top) and paint properties (background-color) cost far more per frame and cannot sub-pixel render. Test on the weakest target device.
10. **CSS-driven motion survives a busy main thread; most JS animation does not.** Motion (formerly Framer Motion) is the exception because it delegates to the Web Animations API. Libraries that merely wrap transitions add weight without capability.
11. **Springs are for movement; `linear()` gets you a static spring in CSS** but cannot inherit velocity when interrupted, so gesture-driven or interruptible motion still needs a real spring engine.
12. **Respect motion preferences by construction**: author motion inside `prefers-reduced-motion: no-preference`, so browsers without the feature default to calm.

---

## 2. Rules

### A. Shadows and elevation

- **RULE [JC-DM-01]** Give every shadow on a page the same light direction: keep the vertical offset at 2x the horizontal offset (e.g. 0.5px 1px, 1px 2px, 2px 4px, 4px 8px) for every layer of every elevation.
  **Why** a distant sun casts parallel shadows; mixed angles read as errors. **Applies to** all. **Check** parse every `box-shadow` layer: y / x is 2 (+-0.1), or x is 0 on all of them; flag any layer that differs.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/
- **RULE [JC-DM-02]** As elevation rises, increase the offsets and the blur radius together and lower the opacity per layer; do not just stretch the blur.
  **Why** lifted objects cast displaced, softer, fainter shadows. Reference single-layer point: `4px 8px 8px hsl(0 0% 0% / 0.38)` at "0.5 elevation". **Applies to** all. **Check** across the shadow tokens, sorted by elevation, offset and blur are non-decreasing and per-layer alpha is non-increasing.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/
- **RULE [JC-DM-03]** Build each elevation from 1 to 5 stacked layers whose offset and blur double each step (1/1, 2/2, 4/4, 8/8, 16/16 px y-offset/blur). Reference palette: small = 1 layer `0.5px 1px 1px` at alpha 0.7; medium = 3 layers (1/2/2, 2/4/4, 3/6/6) at alpha 0.333; large = 5 layers (1/2/2, 2/4/4, 4/8/8, 8/16/16, 16/32/32) at alpha 0.2.
  **Why** the stack approximates a soft penumbra; per-layer alpha shrinks as layers are added so total darkness stays similar. 5 equal layers at alpha 0.075 (0 1px 1px ... 0 16px 16px) is the minimal demo. **Applies to** all. **Check** layers per elevation <= 5; large elevation has more layers than small; sum of (1-alpha) products stays in a similar band across levels.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/
- **RULE [JC-DM-04]** Do not animate a layered shadow. Animate transform or opacity of a separate shadow layer instead.
  **Why** every layer is a separate blur pass per frame (5 layers = 5x the work on cheap phones); Comeau says animating a layered shadow is "probably a bad idea". **Applies to** all. **Check** no `transition`/`animation` on `box-shadow` where the value has more than 2 layers.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/ ; https://www.joshwcomeau.com/animation/3d-button/
- **RULE [JC-DM-05]** Colour shadows to match the surface behind the element: same hue, lowered lightness, reduced-but-not-zero saturation. Do not use transparent black on coloured backgrounds, and do not use the fully saturated darker colour either.
  **Why** black at low alpha desaturates the backdrop ("washed out"); a saturated dark colour looks like a glow. His "just right" example on a `hsl(220 100% 80%)` background is `hsl(220 60% 50%)`; on a `hsl(0 0% 95%)` background he uses mid grey `hsl(0 0% 50%)`. **Applies to** all. **Check** on non-neutral surfaces the shadow colour's hue is within 15 degrees of the surface hue and its chroma is > 0.02 (OKLCH).
  **Source** https://www.joshwcomeau.com/css/designing-shadows/
- **RULE [JC-DM-06]** Store the shadow colour as HSL channels in a variable (`--shadow-color: 220deg 60% 50%`) and write every elevation as `hsl(var(--shadow-color) / alpha)`. Redefine the variable on any container whose background differs, and re-declare the elevation token there (or generate tokens from a preprocessor/CSS-in-JS).
  **Why** a nested card on a different background must not inherit the outer tint; vanilla CSS cannot recompute a token that already resolved at `:root`. **Applies to** all. **Check** shadow declarations contain `var(--shadow-color`; any element whose background hue differs by > 30 degrees from its parent either sets `--shadow-color` or uses a neutral one.
  **Source** https://www.joshwcomeau.com/css/introducing-shadow-palette-generator/
- **RULE [JC-DM-07]** Ship three named elevations (low / medium / high) as the default palette; only add more with a documented use.
  **Why** the Shadow Palette Generator outputs exactly three cohesive shadows per project, reasoning that a palette is easier to keep consistent than free-form values. **Applies to** all. **Check** distinct non-focus `box-shadow` strings in the stylesheet <= 3 elevation levels (+ states).
  **Source** https://www.joshwcomeau.com/css/introducing-shadow-palette-generator/
- **RULE [JC-DM-08]** Use `filter: drop-shadow()` (not box-shadow) when the shadow must follow a non-rectangular outline such as a tooltip with its arrow or a PNG with transparency; stack three for depth: `1px 2px 3px`, `2px 4px 6px`, `4px 8px 12px`, each at alpha 0.3.
  **Why** drop-shadow contours the painted alpha; box-shadow stays rectangular. Safari can add input lag when a filter wraps a text input. **Applies to** tooltips, popovers, image cutouts. **Check** non-rectangular clip-path/arrow elements use drop-shadow; no `filter` on an ancestor of an `<input>`.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/
- **RULE [JC-DM-09]** Fake a physical push button with three stacked layers inside the `<button>`: a stationary edge layer, a shadow layer, and a front layer that slides on `translateY`. Idle front = -4px (shadow +2px); hover front = -6px (shadow +4px); active front = -2px (shadow +1px). Put a horizontal gradient on the edge (`16%` lightness at both ends, `32%` between 8% and 92%) so rounded corners reflect less light, and a `blur(4px)` on the shadow layer.
  **Why** transform on layers is compositor-cheap; animating box-shadow or border is expensive. **Applies to** landing page CTAs, playful products. **Check** no `transition` on `box-shadow`/`border-width` in button styles; button moves via `transform`.
  **Source** https://www.joshwcomeau.com/animation/3d-button/
- **RULE [JC-DM-10]** Use elevation to direct attention: the layer meant to be seen first (modal, popover) gets a visibly larger shadow than the chrome behind it.
  **Why** the eye goes to the element that looks closest. **Applies to** dialogs, menus. **Check** overlay elevation token > header/card elevation token.
  **Source** https://www.joshwcomeau.com/css/designing-shadows/

### B. Glass (backdrop-filter)

- **RULE [JC-DM-11]** For a frosted header, put `backdrop-filter` on a pointer-transparent child that is twice the header height (`position:absolute; inset:0; height:200%`) and trim it with `mask-image: linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)`. Use mask, not `overflow:hidden`, `overflow:clip` or `clip-path`.
  **Why** backdrop-filter only samples pixels directly behind the element; oversizing lets nearby content tint the blur like real glass. In Chrome the clipping happens before the filter, so overflow/clip-path remove the extra sampling area; masking runs after. **Applies to** sticky headers, floating bars. **Check** element with `backdrop-filter` has `mask-image` and `pointer-events:none`, and neither it nor its parent uses `overflow:hidden`/`clip-path` as the trim.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-12]** Always set `pointer-events: none` on the oversized backdrop child, and keep the header (with nav links) itself pointer-enabled.
  **Why** a masked-out element still catches clicks and blocks text selection in the content below. **Applies to** all. **Check** hit-test (`elementFromPoint`) just under the header returns the content, not the backdrop.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-13]** Cover the flicker where content leaves the top of the viewport by giving the backdrop a background gradient from the page colour (opaque at the top) to transparent at 50%.
  **Why** backdrop-filter never samples off-screen pixels, so colours pop in and out at the very top edge. **Applies to** sticky headers. **Check** the backdrop has a `linear-gradient(to bottom, <page colour>, transparent 50%)` background.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-14]** If blurred content behind glass hurts legibility, either raise the blur radius above the 16px default (cost grows with radius) or give the header a semi-opaque background (white at alpha 0.5 in the final code, 0.6 in the "thicker glass" demo). Fallback without backdrop-filter support: white at alpha 0.95.
  **Why** busy text behind a transparent header competes with nav and title. **Applies to** sticky headers. **Check** header background alpha in [0.5, 0.95]; an `@supports not (backdrop-filter: blur(1px))` branch exists with alpha >= 0.9.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-15]** Tune glass filters by art direction, not by formula. Starting values from the source: main pane `blur(16px)` (cupcake demo `blur(8px) brightness(90%) saturate(140%)`); edge strip `blur(8px) brightness(120%)` (alternatives `blur(6px) brightness(110%) saturate(120%)` and `blur(12px) brightness(0.96)`); strip thickness 3 to 6px; pane tint `hsl(0 0% 100% / 0.1)`.
  **Why** saturation partly restores colour lost to blur ("more art than science"). **Applies to** glass headers. **Check** filter chain contains blur plus at least one of brightness/saturate for glass over photography.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-16]** To fake glass thickness, add a second element: `top:0; height:100%` masked to the first `--thickness` px (`black 0, black var(--thickness), transparent var(--thickness)`), shifted down with `translateY(100%)`, with its own smaller backdrop blur.
  **Why** a visible bright lower edge reads as the cut edge of a glass slab. **Applies to** hero glass bars. **Check** visual.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-17]** The mask trick kills rounded corners (the hidden bottom is what gets rounded). If you need a radius, use an SVG `<mask>` with a white `rect rx="8"` referenced as `mask-image: url(#id)`, or clip a non-rectangular glass pane with a hand-tuned `clip-path: polygon()`.
  **Why** border-radius rounds the oversized box, not the visible slice; backdrop-filter on an `<img>` blurs the whole image box, so clip it to the opaque shape. **Applies to** rounded glass cards. **Check** visual.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/ ; https://www.joshwcomeau.com/blog/whimsical-animations/
- **RULE [JC-DM-18]** Ship glass with prefixed + unprefixed declarations inside `@supports ((backdrop-filter: blur(16px)) or (-webkit-backdrop-filter: blur(16px)))`, and nest the mask refinement inside a second `@supports (mask-image: none) or (-webkit-mask-image: none)`.
  **Why** the unsupported path keeps a legible, opaque header. Support reported Dec 2024: backdrop-filter above 97%, mask-image 96.3%. **Applies to** all. **Check** both `@supports` blocks and a ~0.95-alpha fallback exist.
  **Source** https://www.joshwcomeau.com/css/backdrop-filter/
- **RULE [JC-DM-19]** For a header that changes colour as you scroll past sections (blue hero, white body) without JS, keep the header transparent and `position:fixed`, and place colour-matched `position: sticky; top: 0` "blocker" strips inside each section; each blocker unsticks at the end of its section so the next one takes over. Reserve empty space at the top of each section at least as tall as the header (5rem on his blog).
  **Why** sticky elements leave when their container ends, which gives a free hand-off. **Applies to** content sites with a coloured hero. **Check** header background is transparent and each section has a sticky blocker with `top:0`, `height` = header height.
  **Source** https://www.joshwcomeau.com/css/header-blockers/

### C. Gradients and colour shifting

- **RULE [JC-DM-20]** Name the interpolation space in every colour gradient: `linear-gradient(to right in oklch, a, b)` (about 91% support in late 2025), with a plain gradient declared first as fallback.
  **Why** default sRGB averaging of R, G and B drives complementary pairs to grey. [verified] yellow to blue in sRGB: midpoint pixel is rgb(127,127,127); `in oklab` is rgb(107,171,199); `in oklch` is rgb(0,206,188) (clean green-aqua). **Applies to** all. **Check** every `gradient(` contains ` in `.
  **Source** https://www.joshwcomeau.com/css/make-beautiful-gradients/
- **RULE [JC-DM-21]** When you need identical results in browsers without `in <space>`, precompute many intermediate stops in the chosen colour space (chroma.js, 10+ midpoints) and pass them all to the gradient; adjacent stops are close enough that RGB interpolation between them is invisible.
  **Why** the grey zone comes from long RGB hops; short hops are fine. Comeau also shapes stop distribution with an easing curve in his generator. **Applies to** hero backgrounds. **Check** gradients between hues > 60 degrees apart have >= 5 stops or an `in` clause.
  **Source** https://www.joshwcomeau.com/css/make-beautiful-gradients/
- **RULE [JC-DM-22]** To tween colours across a large hue distance, do not transition `background-color` between two hsl() values. Use one of: (a) `filter: hue-rotate()` keyframes; (b) a registered `@property --hue { syntax:'<angle>' }` transitioned in CSS and read by `hsl(var(--hue) ...)`.
  **Why** background-color transitions interpolate the resolved RGB values, so opposite hues pass through grey; and `hsl(0 ...)` to `hsl(360 ...)` resolve to the same RGB, so nothing animates. [verified] `hsl(0 100% 65%)` to `hsl(180 100% 65%)` transition midpoint = rgb(167,164,164) (grey). `@property --hue` from 0deg to 180deg at t = 50% = rgb(134,255,0) (a saturated yellow-green). Hue-rotate gives darker results than true HSL hue changes, so start from lighter, less saturated colours. **Applies to** particles, accent shifts, rainbow effects. **Check** `transition: ... background` between colours > 90 degrees apart on hue is flagged; hue-rotate range 180 to 540deg in practice (720deg demo was "a bit much").
  **Source** https://www.joshwcomeau.com/animation/color-shifting/
- **RULE [JC-DM-23]** filter-based colour shifts beat repainting: `filter: hue-rotate()` reuses the previous paint and applies a cheap per-frame tint; changing `background-color` repaints every frame. Fine for 10 to 20 particles either way; matters at scale.
  **Why** headroom for effects with many elements. **Applies to** particle effects. **Check** many (> 20) animated coloured elements use hue-rotate/opacity rather than background-color transitions.
  **Source** https://www.joshwcomeau.com/animation/color-shifting/
- **RULE [JC-DM-24]** Animate gradients by registering the colour stops as typed custom properties (`@property --c1 { syntax:'<color>'; inherits:false; initial-value:... }`) and transitioning the variables (e.g. 3 variables, 1000-2000 ms, linear), not the `background` itself. Provide a static gradient fallback outside the `no-preference` media query.
  **Why** gradients cannot be transitioned directly; typed variables can. Measured by the author at 6x CPU throttle: ~0.3 ms repaint per frame, about 2% of the 16.6 ms budget, because there is no layout and the paint is small. **Applies to** CTAs, hero accents. **Check** an `@property` rule exists for every transitioned variable; motion lives inside `prefers-reduced-motion: no-preference`.
  **Source** https://www.joshwcomeau.com/react/rainbow-button/ ; https://www.joshwcomeau.com/css/css-variables-for-react-devs/
- **RULE [JC-DM-25]** Add small random variation to repeated effects (per-element twinkle duration, twinkle amount, hue) through custom properties set per element, so copies do not flicker in lockstep.
  **Why** uniform timing reads as mechanical. **Applies to** particles, sparkles. **Check** repeated animated items do not share identical `animation-duration`.
  **Source** https://www.joshwcomeau.com/animation/color-shifting/ ; https://www.joshwcomeau.com/animation/partial-keyframes/

### D. Transitions and easing

- **RULE [JC-DM-26]** Never use `transition: all`. List the properties (and their own durations): `transition: transform 250ms, opacity 400ms`.
  **Why** unexpected properties start animating when someone edits the component later; "animation is like salt". **Applies to** all. **Check** grep `transition:\s*all|transition-property:\s*all`.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/
- **RULE [JC-DM-27]** Choose the built-in curve by what the element is doing: `ease-out` when something arrives from off-screen; `ease-in` only when it leaves the viewport or ends invisible (a sudden stop is jarring); `ease-in-out` for symmetric loops; default `ease` for ordinary on-screen movement; `linear` almost never (exceptions: spinners, hue cycling).
  **Why** each curve maps to a physical story. Equivalents: ease-in `cubic-bezier(0.42,0,1,1)`, ease-out `(0,0,0.58,1)`, ease-in-out `(0.42,0,0.58,1)`. **Applies to** all. **Check** `ease-in` appears only on exits that leave the screen or hit opacity 0; `linear` only on rotation/hue loops.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/ ; https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion
- **RULE [JC-DM-28]** Give hover-in and hover-out different timings: quick in, slow out. Example: lift of -10px with 125 ms on `:hover` and 450 ms on the base state. For a modal: enter with `ease-out`, leave with a quicker `ease-in`.
  **Why** think in actions (mouse-enter, mouse-leave), not states. **Applies to** marketing hover lifts, modals. **Check** the `:hover` rule's `transition-duration` is shorter than the base rule's.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/
- **RULE [JC-DM-29]** For hover menus, bridge the diagonal mouse path with a close delay: closed state `opacity 0; transition: opacity 400ms; transition-delay: 300ms`, open state `transition: opacity 100ms; transition-delay: 0ms`.
  **Why** the cursor leaves the hover area while moving diagonally to a child; the delay lets it re-enter before the menu hides. **Applies to** hover dropdowns. **Check** hover menus have a delay >= 200 ms on the closing transition.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/
- **RULE [JC-DM-30]** Give a button separate press feel: rest/return `600ms cubic-bezier(.3,.7,.4,1)`, hover `250ms cubic-bezier(.3,.7,.4,1.5)` (slight overshoot), active `34ms` (about 2 frames at 60 fps).
  **Why** real buttons snap down fast and settle slowly. **Applies to** playful CTAs. **Check** `:active` transition-duration <= 50 ms.
  **Source** https://www.joshwcomeau.com/animation/3d-button/
- **RULE [JC-DM-31]** Animate `transform`, `opacity` and `filter`. Treat `height`, `width`, `margin`, `top/left` as layout-expensive and `background-color` as paint-expensive. Replace `margin-top` or `left` animation with `translate`.
  **Why** transform skips layout and paint and can sub-pixel render; margin-top steps to whole pixels. **Applies to** all. **Check** keyframes/transitions list; flag layout properties. Test on the lowest-end device you target.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/ ; https://www.joshwcomeau.com/react/animating-the-unanimatable/
- **RULE [JC-DM-32]** Add `will-change: transform` only to elements you will animate with transform, to avoid the small snap when the browser hands work between CPU and GPU. Never blanket it across static elements.
  **Why** hardware-accelerated layers use video memory (his budget phone test, Xiaomi Redmi 7A, was fine). Caveat [verified]: `will-change: transform` creates a stacking context, which can trap z-index children (see layout file JC-LM-12). **Applies to** buttons, cards that animate. **Check** `will-change` appears only on animated elements and never as `all`.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/
- **RULE [JC-DM-33]** Avoid the hover "doom flicker": when the effect moves the element out from under the cursor, put the hover trigger on a stationary parent and animate a child.
  **Why** element moves away, hover ends, element falls back, hover starts again, many times per second (a photosensitivity risk). **Applies to** all lift-on-hover. **Check** the element under `:hover` that receives `translate` is not the same box that defines the hit area.
  **Source** https://www.joshwcomeau.com/animation/css-transitions/
- **RULE [JC-DM-34]** Enable animating to `auto` and other keywords with `html { interpolate-size: allow-keywords }` inside `@media (prefers-reduced-motion: no-preference)`, and still prefer `transform: scale` over height/width where possible.
  **Why** `height: 0` to `auto` transitions need no JS measuring. [verified] Chromium 156: a `height:0 -> auto` transition under 600 ms linear measured 38.9 px at 250 ms. The author noted (Mar 2025) only Chromium supported it. **Applies to** accordions, disclosures. **Check** unsupported-browser fallback is "no animation" (acceptable).
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/

### E. Springs, linear() and JS libraries

- **RULE [JC-DM-35]** Generate `linear()` springs from a tool (Linear() Easing Generator by Jake Archibald and Adam Argyle, or Easing Wizard) rather than by hand; use 25 to 50+ points. A hand-traced 11-point spring looks robotic; a 50-point one looks right; 25 points with explicit time percentages is about equal.
  **Why** springs have fine detail that sparse linear segments cannot represent. **Applies to** all. **Check** `linear(` values with < 20 points are flagged for review.
  **Source** https://www.joshwcomeau.com/animation/linear-timing-function/
- **RULE [JC-DM-36]** Put each `linear()` spring in a CSS variable with its duration variable (`--spring-smooth` and `--spring-smooth-time`), declared first as a `cubic-bezier` approximation and overwritten inside `@supports (animation-timing-function: linear(0,1))`; comment the stiffness/damping used (e.g. stiffness 235, damping 10). Use at least 80% token timing functions; if custom curves exceed 20% the token set needs work.
  **Why** a `var()` is "valid" to the parser even if `linear()` is not, so a duplicate-declaration fallback does not work with variables; `@supports` overwriting bakes the fallback in once. Cost measured: three 75-point springs added about 3.8 kB raw to a 63.3 kB CSS bundle (63.3 kB to 67.1 kB; gzip 10.2 kB to 11.5 kB, about 1.3 kB). linear() support ~88% (Oct 2025), in all majors since Dec 2023. **Applies to** all. **Check** `linear(` appears only in custom-property definitions; share of transitions using `var(--` timing tokens >= 80%.
  **Source** https://www.joshwcomeau.com/animation/linear-timing-function/
- **RULE [JC-DM-37]** Use `linear()` springs for static enter/hover states; use a real spring engine (Motion) for anything gesture-driven or interruptible.
  **Why** CSS transitions shorten an interrupted reversal by a "reversing shortening factor", so a 1600 ms spring may replay in ~400 ms and feel tight; the CSS version also turns around instantly instead of carrying inertia. A zero-friction spring is impossible because transitions need a finite duration. **Applies to** drag, toggles that can be re-triggered quickly. **Check** a `linear()` transition on an element that can be re-triggered mid-flight is flagged.
  **Source** https://www.joshwcomeau.com/animation/linear-timing-function/
- **RULE [JC-DM-38]** Use springs for motion (position, scale, rotation), not for colour or opacity.
  **Why** the physical metaphor only applies to movement; colour changes gain nothing from overshoot. **Applies to** all. **Check** spring/bounce easing on `opacity`/`color`/`background` is flagged.
  **Source** https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/
- **RULE [JC-DM-39]** Spring starting points from the source (React Spring / Motion naming): stiffness/tension 300 with damping/friction 10 to 12 for small icon motion (stretchy arrow: 300/12; "boop": 300/10); explorer default 200 tension, 12 friction, mass 1.75; `--spring-smooth` example stiffness 235, damping 10. Mass slows and adds inertia, tension (stiffness) tightens and bounces, friction (damping) removes bounce and gives "buttery molasses" when high.
  **Why** concrete values to tune from. **Applies to** micro-interactions. **Check** n/a (reference).
  **Source** https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/ ; https://www.joshwcomeau.com/animation/squash-and-stretch/ ; https://www.joshwcomeau.com/react/boop/
- **RULE [JC-DM-40]** Prefer native CSS animations for basic transitions. Add a JS animation library only for what CSS cannot do (spring physics, SVG shape morphing, gesture velocity) and prefer one that runs on the Web Animations API (Motion), which keeps animating when the main thread is blocked. Sizes quoted: Motion 48 kB gzipped, GSAP 27 kB gzipped (more with plugins).
  **Why** CSS and WAAPI animations run off the main thread; rAF loops and GSAP-style tickers stutter and can drift out of sync when the thread is busy. Libraries that only wrap transitions add bundle weight for no capability. **Applies to** all. **Check** if an animation library is in the bundle, list which effects need it; flag libraries used only for fades/slides.
  **Source** https://www.joshwcomeau.com/animation/css-vs-javascript/
- **RULE [JC-DM-41]** Express "boop" micro-interactions as events, not states: on pointer-enter apply the transformed state for a short burst (about 150 ms) then revert regardless of whether the pointer is still there. Use a spring (tension 300, friction 10), animate rotation/scale/translate together, and do not trigger it on focus (decorative).
  **Why** symmetric hover transitions feel flat; a quick pop is playful. **Applies to** icon buttons, playful brands. **Check** decorative effect is attached to pointer-enter and wrapped by a reduced-motion check.
  **Source** https://www.joshwcomeau.com/react/boop/ ; https://www.joshwcomeau.com/animation/squash-and-stretch/
- **RULE [JC-DM-42]** Squash and stretch: keep the effect subtle in production. In the bouncing-ball demo the "squash/stretch amount" is about 25 to 50% of the exaggerated setting; extreme demo values were ratio 1.5 (squash) and 1.25 (stretch). Keep the origin on the contact edge (`transform-origin: center bottom`), and pause on the ground for about 5% of the bounce so the squash does not happen in mid-air.
  **Why** elasticity reads as life only when it is believable. **Applies to** icons, arrows, buttons. **Check** scale ratios in production CSS <= ~1.25 unless the brand is explicitly cartoonish.
  **Source** https://www.joshwcomeau.com/animation/squash-and-stretch/
- **RULE [JC-DM-43]** Stretchy arrow recipe: shaft path `h14` to `h17`, tip path from `M12,5 l7,7 l-7,7` to `M15,7 l7,5 l-7,5` (the tip is also pulled inward so the arrow looks thinner as it lengthens). CSS `d: path()` transitions are not supported in Safari (about 79% support, April 2026); use Motion for full coverage.
  **Why** cheap SVG-level elasticity. **Applies to** link/CTA arrows. **Check** visual; Safari fallback is static.
  **Source** https://www.joshwcomeau.com/animation/squash-and-stretch/

### F. Keyframes, enter animations, scroll-driven motion

- **RULE [JC-DM-44]** For enter animations prefer keyframes with only the `from` block (or only `to`), so the animation inherits the element's resting value: `@keyframes fadeFromTransparent { from { opacity: 0 } }`.
  **Why** a full `from { opacity:1 } to { opacity:0 }` pair snaps elements whose resting opacity is 0.6 or 0.7 to 1 first. Partial keyframes also let two animations drive the same property (a fade-in on top of an endless twinkle). Older iOS Safari (before 17) runs them sequentially. **Applies to** all. **Check** keyframes that list both ends of `opacity` for elements with non-1 resting opacity.
  **Source** https://www.joshwcomeau.com/animation/partial-keyframes/
- **RULE [JC-DM-45]** When an animation has a delay, add `animation-fill-mode: backwards` (or `both`); `forwards` keeps the end state. Define per-instance amounts with custom properties inside keyframes, e.g. `translateX(calc(var(--amount) * -1))` to `translateX(var(--amount))`.
  **Why** without `backwards`, the element shows its final style during the delay; variables make one keyframe reusable. Timing functions apply per keyframe step, not across the whole animation. **Applies to** all. **Check** `animation-delay` > 0 comes with fill-mode backwards/both.
  **Source** https://www.joshwcomeau.com/animation/keyframe-animations/ ; https://www.joshwcomeau.com/animation/partial-keyframes/
- **RULE [JC-DM-46]** `@starting-style` is not promoted like keyframes: it follows normal specificity. An inline style, an `#id` selector or a JS-set `style.transform` beats it, and the enter transition silently never runs. Fix with custom properties (`transform: translate(var(--x), var(--y))` with `@starting-style` below it), `!important` inside the at-rule, or plain keyframes.
  **Why** transitions need a changed value; the starting value was never applied. Benefit of `@starting-style`: it handles a quick open-close of a `<dialog>` without a flicker, fading out from half-opacity. Support ~86% (Sep 2025). **Applies to** dialogs, dynamic lists. **Check** elements with `@starting-style` have no inline `style` or higher-specificity overrides for the same property.
  **Source** https://www.joshwcomeau.com/css/starting-style/
- **RULE [JC-DM-47]** Scroll-driven reveals: use `animation: x linear both; animation-timeline: view(); animation-range: entry` (or `cover`/`contain`/`exit`, or explicit `cover 0% cover 50%`), and add `backwards` fill when the range starts late. Gate it inside `@media (prefers-reduced-motion: no-preference)`; parallax needs the strictest gate.
  **Why** the timeline maps scroll position onto keyframes; no JS observer. Several elements moving at different speeds can trigger vestibular symptoms. Support quoted: ~85%, Firefox behind a flag when written; `animation-trigger` (scroll-triggered) Chromium-only as of May 2026. Linked timelines require `timeline-scope` on a shared ancestor. [verified] `CSS.supports('animation-timeline','view()')` is true in Chromium 156. **Applies to** landing pages. **Check** every `animation-timeline` is inside a no-preference block; content stays visible when unsupported.
  **Source** https://www.joshwcomeau.com/animation/scroll-driven-animations/
- **RULE [JC-DM-48]** Custom easing on scroll-driven motion works like any keyframe animation; the source uses `cubic-bezier(0.15, 0.75, 0.35, 1)` as an exaggerated ease-out and warns that a `linear()` spring on scroll is "kind of cursed".
  **Why** scroll-linked motion should stay simple. **Applies to** scroll effects. **Check** n/a.
  **Source** https://www.joshwcomeau.com/animation/scroll-driven-animations/

### G. Reduced motion, focus, touch, polish

- **RULE [JC-DM-49]** Author transitions and animations inside `@media (prefers-reduced-motion: no-preference)`. In JS, test the same query (`!matchMedia('(prefers-reduced-motion: no-preference)').matches` means reduce) and listen for its `change` event to stop running animations.
  **Why** browsers that lack the media query get no animation, which is the safe default. **Applies to** all. **Check** every `transition`/`animation` declaration sits inside a no-preference block, or is opacity-only.
  **Source** https://www.joshwcomeau.com/react/prefers-reduced-motion/
- **RULE [JC-DM-50]** Do not blanket-zero motion with `* { animation-duration: 0.01ms !important }`. Handle per effect, keep harmless fades, and provide motion-free alternatives so reduced-motion users still get a polished experience.
  **Why** fades involve no movement; the global override also speeds JS springs up. Note 0.01 ms is used instead of 0 because some engines treat 0 as falsy. About 35% of US adults 40+ report some vestibular dysfunction (5% chronic). **Applies to** all. **Check** no global `!important` duration override.
  **Source** https://www.joshwcomeau.com/react/prefers-reduced-motion/
- **RULE [JC-DM-51]** Never remove the focus outline without a replacement. Use `:focus-visible` (outline `revert` or a custom ring with `outline-offset: 4px`); hide it only for non-keyboard focus.
  **Why** keyboard users rely on it; `outline-offset` is ignored on Firefox default rings. **Applies to** all. **Check** `outline: none` only paired with `:focus-visible` styling.
  **Source** https://www.joshwcomeau.com/animation/3d-button/ ; https://www.joshwcomeau.com/css/has/
- **RULE [JC-DM-52]** On press-style buttons, set `-webkit-tap-highlight-color: transparent` (the button already gives feedback) and `user-select: none` to stop iOS from selecting label text on long press; use these properties rarely.
  **Why** double feedback and accidental selection. **Applies to** mobile CTAs. **Check** both only on elements with their own pressed state.
  **Source** https://www.joshwcomeau.com/animation/3d-button/
- **RULE [JC-DM-53]** Measure spacing and alignment from the rendered page, not from the design tool, and fix optical misalignment (e.g. glyph side-bearings, a "1" in a circle) with a tiny `transform: translate()` rather than margins. Never call a designer's requested shifts "nits".
  **Why** design tools lay out leading from the baseline up (print heritage) while CSS pads line-height around the text; margins pull siblings along, transform does not. **Applies to** high-traffic pages. **Check** visual overlay against the mock.
  **Source** https://www.joshwcomeau.com/css/pixel-perfection/
- **RULE [JC-DM-54]** For colour in animated or dynamic contexts HSL is acceptable (author's own choice, with a planned move to OKLCH); pastel particles use `hsl(h 100% 80%)`. Keep colour fragments in variables and recombine with `calc()` (`--red-lit` minus 20%, saturation minus 30%).
  **Why** hex is hard to read and cannot be adjusted on the fly; modern spaces matter less when you do not need P3 or perceptual uniformity. **Applies to** effects. **Check** n/a (see conflicts in section 5).
  **Source** https://www.joshwcomeau.com/css/color-formats/ ; https://www.joshwcomeau.com/animation/color-shifting/

---

## 3. Numbers and scales

| Item | Value | Source |
|---|---|---|
| Shadow offset ratio | y = 2 x horizontal | designing-shadows |
| Shadow palette (3 elevations) | small 1 layer `0.5px 1px 1px` @0.7; medium 3 layers `1px 2px 2px`, `2px 4px 4px`, `3px 6px 6px` @0.333; large 5 layers `1/2/2`, `2/4/4`, `4/8/8`, `8/16/16`, `16/32/32` @0.2 | designing-shadows |
| Minimal layered shadow | `0 1px 1px`, `0 2px 2px`, `0 4px 4px`, `0 8px 8px`, `0 16px 16px`, each hsl(0 0% 0% / 0.075) | designing-shadows |
| Single-layer reference | `4px 8px 8px hsl(0 0% 0% / 0.38)` at 0.5 elevation | designing-shadows |
| Tooltip drop-shadows | `1px 2px 3px`, `2px 4px 6px`, `4px 8px 12px` at alpha 0.3, hsl(220 60% 50%) | designing-shadows |
| Shadow hue example | background hsl(220 100% 80%) -> shadow hsl(220 60% 50%); too grey = black @0.5; too bright = hsl(220 100% 50%) | designing-shadows |
| Same shadow in OKLCH [engine note, computed] | hsl(220 60% 50%) = oklch(0.532 0.168 262.3); hsl(220 100% 80%) = oklch(0.793 0.104 263.7); hsl(0 0% 50%) = oklch(0.600 0 0) | computed |
| Glass blur | 16px main; 8px / 6px / 12px edge strips; edge thickness 3 to 6px (final code uses `--thickness: 4px`) | backdrop-filter |
| Glass extras | `brightness(90%) saturate(140%)` main; `brightness(110%) saturate(120%)` edge; edge `brightness(120%)`; `brightness(0.96)` | backdrop-filter |
| Header backdrop height | 200% of header, mask stops 50% | backdrop-filter |
| Glass fill alpha | 0.1 (pane tint), 0.5 (supported header), 0.6 ("thicker"), 0.95 (fallback) | backdrop-filter |
| Header height (blockers) | 5rem (80px) with 5rem reserved space | header-blockers |
| Hover lift | -10px, 125 ms in / 450 ms out | css-transitions |
| Hover menu close | delay 300 ms, fade 400 ms; open fade 100 ms, delay 0 | css-transitions |
| 3D button translate | idle -4px/+2px, hover -6px/+4px, active -2px/+1px; durations 600 / 250 / 34 ms | 3d-button |
| 3D button curves | rest `cubic-bezier(.3,.7,.4,1)`; hover `cubic-bezier(.3,.7,.4,1.5)` | 3d-button |
| 3D button hover brightness | `filter: brightness(110%)`, 250 ms in / 600 ms out | 3d-button |
| 3D edge gradient | hsl(340 100% 16%) 0%, hsl(340 100% 32%) 8% and 92%, hsl(340 100% 16%) 100%; front hsl(345 100% 47%); shadow hsl(0 0% 0% / 0.25) | 3d-button |
| Frame budget | 60 fps = 16.6 ms per frame; blink = 100 to 300 ms | css-transitions |
| Gradient anim repaint | ~0.3 ms/frame at 6x CPU throttle (~2% of budget) | rainbow-button |
| Rainbow button | palette of 7 to 10 hues; 3-colour moving window; update interval 1000 to 2000 ms; hues e.g. 1, 25, 40, 130, 230, 240, 260 deg | rainbow-button |
| Hue-rotate | 180 to 540deg recommended; 720deg = 2 full turns (too much) | color-shifting |
| Pastel hsl | `hsl(<random> 100% 80%)` | color-shifting |
| Twinkle demo | opacity 0.25 to 0.75, 250 ms alternate; fade-in 2000 ms | partial-keyframes |
| linear() sample (11 pts, ease) | `linear(0, 0.1, 0.25, 0.5, 0.68, 0.8, 0.88, 0.94, 0.98, 0.995, 1)` | linear-timing-function |
| linear() spring tokens | 40+ points typical; mention 75-point spring = ~1.3 kB gzip each batch of 3 | linear-timing-function |
| Spring params | tension 200 / friction 12 / mass 1.75 (explorer); boop 300 / 10; stretchy arrow stiffness 300 / damping 12; smooth 235 / 10 | spring-physics, boop, squash |
| Boop | rotation e.g. 20deg, timing 150 ms | boop |
| Squash/stretch demo | squash 1.5, stretch 1.25, bounce curve `cubic-bezier(0.123, 0.5, 0.5, 1)`, 400 ms bounce / 800 ms squash cycle, ground pause 5%, squash peak at 10% | squash-and-stretch |
| Squash/stretch in practice | 25 to 50% of demo exaggeration | squash-and-stretch |
| Scroll easing | `cubic-bezier(0.15, 0.75, 0.35, 1)` | scroll-driven |
| Support quotes | linear() 88% (Oct 2025); @starting-style 86% (Sep 2025); gradient `in <space>` ~91% (late 2025); backdrop-filter >97%, mask-image 96.3% (Dec 2024); scroll timelines ~85% (written when Firefox was behind a flag); :has ~92% (Sep 2024); CSS `d: path()` transitions ~79% (Apr 2026); anchor positioning 81% (Jul 2026) | various |
| Reduced-motion global override | 0.01ms, iteration-count 1, `!important` (not recommended) | prefers-reduced-motion |
| Vestibular stat | up to 35% of US adults 40+ with some dysfunction, 5% chronic | prefers-reduced-motion |
| JS lib weights | Motion 48 kB gz, GSAP 27 kB gz | css-vs-javascript |

---

## 4. Dos and Don'ts

- **Do**: a card on a blue backdrop gets `hsl(220 60% 50% / .2)` x 5 layers. **Don't**: the same card with `0 6px 6px hsl(0 0% 0% / .3)` (one grey layer; looks like a fuzzy border).
- **Do**: oversized blurred child + mask. **Don't**: blur the header itself or trim with `overflow:hidden` (no nearby colour spill in Chrome).
- **Do**: `linear-gradient(in oklch, yellow, blue)`. **Don't**: `linear-gradient(yellow, blue)` (grey mid).
- **Do**: `transition: transform 250ms`. **Don't**: `transition: all 250ms`.
- **Do**: hover transition 125 ms in / 450 ms out. **Don't**: one shared duration for both directions when the lift can flicker.
- **Do**: spring tokens in variables. **Don't**: paste a 70-point `linear()` string into 40 rules.
- **Do**: `@keyframes x { from { opacity: 0 } }`. **Don't**: `from { opacity: 0 } to { opacity: 1 }` on an icon whose resting opacity is 0.7.
- **Do**: fix "height: 50% does nothing" by switching the parent to grid/flex so the child fills (see `comeau-layout-and-mechanics.md`). **Don't**: nest more percentages.
- **Don't**: animate `height` with JS measuring when `interpolate-size` is available (fallback = no animation).

---

## 5. Exceptions and judgement calls

- **Spring token vs real spring.** `linear()` is a recorded curve with fixed duration; a gesture-release needs a velocity-aware engine. Use tokens for hover/enter, Motion for drag [source + engine note].
- **Doom flicker vs boop.** The boop deliberately fires once per pointer-enter, so it never loops even if the element moves away; but keep it off keyboard focus (decorative).
- **`will-change` guidance differs by source.** Comeau recommends `will-change: transform` on animated elements to prevent the CPU/GPU "snap"; `motion-css-native.md` says only add it after observing first-frame stutter and never broadly. Rule JC-DM-32 sides with: scope it to the animated element, never `all`, and remember the stacking-context side effect.
- **Press timing.** 34 ms for `:active` is effectively instantaneous. Fine for tactile CTAs, not a general UI duration.
- **Drop-shadow performance.** Comeau says `filter: drop-shadow` "can be" faster than box-shadow because filters can be GPU-handled, but also notes Safari struggles. Treat as a lead, not a rule; measure on target devices [untested].
- **Frosted glass legibility.** Comeau's remedies (bigger blur or semi-opaque fill) fit the `color-and-surfaces.md` glass table (alpha >= 0.7 for body text over unknown content). His header fill is only 0.5 alpha because the header text is large nav, not body text.

### Conflicts and tensions with existing notes

1. **Colour space (vs `knowledge/web/color-and-surfaces.md` section 1.1, "author every colour as OKLCH").** Comeau authors in HSL (and moves to OKLCH later) because for effects like pastel particles he does not need perceptual uniformity, and finds HSL easier to reason about. Not a real contradiction for tokens, but for dynamic effects the engine should accept HSL. More important correction found by testing: [verified] in Chromium 156, a *transition* between `oklch(0.75 0.15 20)` and `oklch(0.75 0.15 200)` passes through `oklab(0.75 0.0023 0.0009)`, i.e. also grey. So switching to OKLCH does not by itself rescue a 180-degree hue tween; the hue must be driven explicitly (`@property <angle>` or hue-rotate, JC-DM-22). `color-and-surfaces.md` section E only discusses gradients; add this transition caveat.
2. **Shadow tint chroma (vs color-and-surfaces section F).** The note says tint shadows with the surface hue at low lightness and chroma 0.02 to 0.05. Comeau's "just right" tint is much more chromatic: `hsl(220 60% 50%)` = oklch(0.53 0.17 262). Reconcile: on neutral SaaS surfaces use the engine's low-chroma tint; on strongly coloured surfaces (hero blue, brand panels) Comeau's higher chroma at mid lightness gives better results. Both are checked by "hue within 15 to 20 degrees of the surface"; they differ in chroma, so the Check should be chroma proportional to surface chroma.
3. **Elevation opacity rule.** The note's "lower opacity per layer at higher elevation" matches (0.7 -> 0.333 -> 0.2) but only because layer count rises; total darkness is roughly constant. State the rule per layer, not per shadow.
4. **Overshoot easing (vs `motion-and-animation.md` rule about y > 1 curves).** The 3D button hover uses `cubic-bezier(.3,.7,.4,1.5)` and the boop uses a spring with friction 10. The existing note allows overshoot only with gesture momentum and flags `cubic-bezier` with y > 1. Resolution: allowed in the "expressive" motion personality for tactile CTAs; forbidden for dense B2B UI.
5. **Hover asymmetry (vs motion section 5).** Already captured there (Josh: slow out; Emil: drop hover animation on frequent actions). Concrete numbers are 125 in / 450 out; the menu close delay (300 ms) is a different, functional use.
6. **Exit easing.** Comeau says `ease-in` only if the element leaves the viewport and `ease-out` for entering; consistent with the existing "Exit easing conflict" resolution (default ease-out both ways; accelerate only for full-viewport exits).
7. **Line count of glass.** `color-and-surfaces.md` says at most 2 glass surfaces on a marketing page; Comeau's glassy-edge technique uses two backdrop nodes for one header. Count surfaces, not nodes.
8. **`prefers-reduced-motion` approach.** Fully consistent with `motion-a11y-perf-loading.md` (no-preference authoring, no global kill). No conflict.
9. **Scroll-driven support numbers.** `motion-css-native.md` records newer support (Safari 26, Firefox); Comeau's "85% / Firefox behind a flag" was true when written (the page carries a June 2026 update stamp with `animation-trigger` Chromium-only). Use the engine note's newer figure and re-check caniuse.

---

## 6. Figures worth keeping

Interactive widgets worth screenshotting for `examples/` (they cannot be extracted as text): designing-shadows (elevation slider, "Reveal" dialog with/without shadow); backdrop-filter (cupcake header with Default/Tweaked toggle, glass thickness slider); make-beautiful-gradients (RGB vs HSL scrubber); color-shifting (grey midpoint scrubber); 3d-button (layer reveal slider); squash-and-stretch (ball slider, arrow with/without squeeze); header-blockers (reveal slider); spring physics (mass/tension/friction explorer); linear() graph with 11/25/50 points; scroll-driven (progress boxes). All URLs under https://www.joshwcomeau.com/.

---

## 7. Open questions

- Coverage: read in full: designing-shadows, introducing-shadow-palette-generator, css-transitions, linear-timing-function, starting-style, header-blockers, squash-and-stretch, scroll-driven-animations, color-shifting, backdrop-filter, make-beautiful-gradients, 3d-button, a-friendly-introduction-to-spring-physics, css-vs-javascript, keyframe-animations, partial-keyframes, react/boop, react/prefers-reduced-motion, react/rainbow-button (to the accessibility section), color-formats, pixel-perfection, css-variables-for-react-devs, dynamic-bezier-curves (first half; SVG/React tutorial from 2018, no rules). Skimmed only: react/animated-sparkles-in-react (SVG twinkle: scale + rotate keyframes, periodic cleanup, random size/position), react/folding-the-dom (3D fold: two half images, perspective in px (smaller = stronger), rotateX), blog/whimsical-animations (multi-sample sound variation, clip-path polygon for glass shapes, layered gradients/shadows "CSS art"), react/dark-mode (2020; see layout file).
- Not read for rules (no design content): hands-free-coding, how-i-built-my-blog, how-to-learn-stuff-quickly, local-testing-on-an-iphone, the-end-of-frontend-development, the-post-developer-era, why-my-blog-is-closed-source; career/*, javascript/*, svg/* (friendly-introduction-to-svg and interactive-guide-to-paths were not fetched), and the non-visual react/* posts (data-binding, server-components, use-deferred-value, etc.).
- animation/css-vs-javascript says Motion keeps running during main-thread blocking; I did not measure it.
- animation-timeline support numbers are from the article; Chrome 156 supports it [verified], other engines not checked.
- The hue-rotate lightness shift ("tends to produce darker color variations") is stated qualitatively; no numbers.
- Whether drop-shadow is faster than box-shadow: unverified.

---

## 8. Recipes

All CSS here is my own rewrite of the technique; values come from the source unless marked. [verified] = parsed/behaved correctly in Chromium 156 via Playwright; [untested] = visually not checked in a browser.

### 8.1 Depth: layered, tinted, tokenised shadows [verified: parses, computes as 5 layers]
```css
:root {
  --shadow-color: 220deg 60% 50%;          /* channels, redefine per surface */
  --elev-low:  0.5px 1px 1px hsl(var(--shadow-color) / 0.7);
  --elev-mid:  1px 2px 2px hsl(var(--shadow-color) / 0.333),
               2px 4px 4px hsl(var(--shadow-color) / 0.333),
               3px 6px 6px hsl(var(--shadow-color) / 0.333);
  --elev-high: 1px 2px 2px hsl(var(--shadow-color) / 0.2),
               2px 4px 4px hsl(var(--shadow-color) / 0.2),
               4px 8px 8px hsl(var(--shadow-color) / 0.2),
               8px 16px 16px hsl(var(--shadow-color) / 0.2),
               16px 32px 32px hsl(var(--shadow-color) / 0.2);
}
.card { box-shadow: var(--elev-mid); }
.on-blue { --shadow-color: 220deg 60% 50%; background: hsl(220 100% 80%); }
.on-grey { --shadow-color: 0deg 0% 50%;   background: hsl(0 0% 95%); }
/* NOTE: custom properties used inside --elev-* resolve where the token is DECLARED.
   To make a nested surface use its own colour, re-declare the --elev-* tokens inside it
   (or put the tokens on every surface class). */
```

### 8.2 Depth: push button with moving layers [untested visually]
```html
<button class="push"><span class="sh"></span><span class="edge"></span><span class="front">Push me</span></button>
```
```css
.push{position:relative;border:0;background:transparent;padding:0;cursor:pointer;outline-offset:4px;
      transition:filter 250ms;-webkit-tap-highlight-color:transparent;user-select:none}
.sh,.edge{position:absolute;inset:0;border-radius:12px}
.sh{background:hsl(0 0% 0% / .25);filter:blur(4px);will-change:transform;transform:translateY(2px);
    transition:transform 600ms cubic-bezier(.3,.7,.4,1)}
.edge{background:linear-gradient(to left,hsl(340 100% 16%),hsl(340 100% 32%) 8% 92%,hsl(340 100% 16%))}
.front{display:block;position:relative;padding:12px 42px;border-radius:12px;font-size:1.25rem;color:#fff;
       background:hsl(345 100% 47%);will-change:transform;transform:translateY(-4px);
       transition:transform 600ms cubic-bezier(.3,.7,.4,1)}
.push:hover{filter:brightness(110%)}
.push:hover .front{transform:translateY(-6px);transition:transform 250ms cubic-bezier(.3,.7,.4,1.5)}
.push:hover .sh{transform:translateY(4px)}
.push:active .front{transform:translateY(-2px);transition:transform 34ms}
.push:active .sh{transform:translateY(1px);transition:transform 34ms}
@media (prefers-reduced-motion:reduce){.push *{transition:none}}
```

### 8.3 Glass header [untested visually; declarations parse]
```css
header{position:sticky;top:0;background:hsl(0 0% 100% / .95)}          /* fallback */
@supports ((backdrop-filter:blur(16px)) or (-webkit-backdrop-filter:blur(16px))){
  header{background:hsl(0 0% 100% / .5)}
  .glass{position:absolute;inset:0;pointer-events:none;
         -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
         background:linear-gradient(to bottom,var(--page-bg),transparent 50%)}  /* hides top flicker */
  .glass-edge{position:absolute;left:0;right:0;bottom:0;height:4px;pointer-events:none;transform:translateY(100%);
         background:hsl(0 0% 100% / .1);-webkit-backdrop-filter:blur(12px) brightness(.96);backdrop-filter:blur(12px) brightness(.96)}
}
@supports (mask-image:none) or (-webkit-mask-image:none){
  .glass{height:200%;-webkit-mask-image:linear-gradient(to bottom,#000 0 50%,transparent 50% 100%);
         mask-image:linear-gradient(to bottom,#000 0 50%,transparent 50% 100%)}
}
```

### 8.4 Transitions: action-driven, explicit properties [untested visually]
```css
.lift{transition:transform 450ms var(--ease-out,ease)}              /* slow settle (on leave) */
@media (hover:hover) and (prefers-reduced-motion:no-preference){
  .lift:hover{transform:translateY(-10px);transition-duration:125ms}  /* quick on enter */
}
.menu{opacity:0;transition:opacity 400ms 300ms}                      /* delay bridges the mouse path */
.menu-wrap:hover .menu,.menu-wrap:focus-within .menu{opacity:1;transition:opacity 100ms 0ms}
/* avoid doom flicker: hover on the wrapper, move the inner child */
.lift-wrap:hover .lift-inner{transform:translateY(-10px)}
```

### 8.5 Easing tokens with spring fallback [verified: linear() accepted by Chromium 156]
```css
html{
  --spring-smooth:cubic-bezier(.34,1.56,.64,1); --spring-smooth-time:700ms;   /* fallback overshoot */
  @supports (animation-timing-function:linear(0,1)){
    /* stiffness 235, damping 10 -> regenerate with the Linear() Easing Generator */
    --spring-smooth:linear(0,0.12,0.38,0.7,0.98,1.12,1.14,1.08,1.02,0.99,1);   /* placeholder 11 pts: replace with 40+ generated points */
  }
}
@media (prefers-reduced-motion:no-preference){ .pop{transition:transform var(--spring-smooth-time) var(--spring-smooth)} }
```
Note: the 11-point list above is a stand-in; Comeau's own test shows hand-written sparse points look robotic (JC-DM-35).

### 8.6 Hue animation without the grey dead zone [verified: mid-hue colour is saturated]
```css
@property --hue{syntax:'<angle>';inherits:false;initial-value:0deg}
.chip{--hue:0deg;background:hsl(var(--hue) 100% 80%);transition:--hue 2000ms linear}
.chip:hover,.chip:focus-visible{--hue:540deg}
/* or: @keyframes spin-hue{to{filter:hue-rotate(540deg)}} .p{animation:spin-hue 1000ms} */
```

### 8.7 Gradients [verified: `in oklch` accepted; midpoint is clean]
```css
.hero{background:linear-gradient(to right,#ff0,#00f);                 /* fallback */
      background:linear-gradient(to right in oklch,#ff0,#00f);}      /* clean mid-tones */
```

### 8.8 Enter animation that survives specificity [untested visually]
```css
@keyframes pop-from-centre{from{transform:translate(0,0)}}          /* partial keyframe: inherits the end value */
.particle{transform:translate(var(--x),var(--y));animation:pop-from-centre 300ms backwards}
```

### 8.9 Scroll-driven reveal [verified: property accepted]
```css
@media (prefers-reduced-motion:no-preference){
  @supports (animation-timeline:view()){
    .reveal{animation:fade-in linear both;animation-timeline:view();animation-range:entry 0% entry 60%}
  }
}
@keyframes fade-in{from{opacity:0;translate:0 24px}}
```

### 8.10 Grain/noise (not in these articles) [engine note]
Comeau does not cover grain. Related technique from Heckel (dithering to break banding) is in `heckel-shaders-and-effects.md` section 8; the CSS tiled-SVG-noise recipe lives in `knowledge/web/color-and-surfaces.md` section I.
