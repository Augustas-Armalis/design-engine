---
source: web:https://rauno.me/craft ; https://interfaces.rauno.me/
chapter: Rauno Freiberg - Invisible Details of Interaction Design, Designing Depth, Novelty, Contrasting Aesthetics, Next.js and Vercel craft, Web Interface Guidelines checklist
pages: n/a (fetched 2026-10-08; raw text in corpus/web/craft-essays/rauno-*.txt and https___interfaces.rauno.me_.txt, private)
topic_tags: [interaction-design, motion, frequency, novelty, depth, gestures, accessibility, focus, touch, forms, checklist, grid, performance, reduced-motion]
status: studied
---

# Rauno Freiberg: interaction design, depth, novelty, and the Web Interface Guidelines

Coverage. rauno.me/craft index lists about 25 projects. Written essays read in full: `interaction-design` (title "Invisible Details of Interaction Design", July 2023), `depth` ("Designing Depth", July 2024), `novelty` (Feb 2026), `contrasting-aesthetics` (Jan 2024), `nextjs` ("Crafting the Next.js Website", Apr 2023), `vercel` ("What will you ship?", Dec 2023), `graph-slider`. Prototype pages with no text content (adaptive-precision, copy-paste, exclusion-tabs, flashlight-tabs, fractional-slider, logo-carousel, minimap, precision-slider, radial-menu, vanish-input, vercel-footer, wheel-input) were fetched and contain only demos. The queue slug names `invisible-details-of-interaction-design` and `designing-depth` redirect to `/craft/interaction-design` and `/craft/depth`. `/notes` (Field Notes) rendered empty (client-side). Items listed on the craft index that link out (Devouring Details, History of Software Design, Posters) were not ingested; Devouring Details is paid. The full interfaces.rauno.me checklist ("Web Interface Guidelines") was read.

Provenance legend: **(verified)** stated in the text; **(opinion)** author taste, he says so; **[engine note]** my synthesis.

## 1. Core ideas

1. **Interaction design is making experiences that respond fluidly to human intent.** Questions to ask per gesture: when does a swipe trigger, do gestures keep momentum, what if a finger covers the content, can intent be predicted from context. (interaction-design)
2. **Reuse real-world metaphors; they compound.** Swiping up unlocks, so the interface is a stack of layers, so swipe down means more controls. Pinch starts close together because precision needs the anchor point chosen with pinched fingers.
3. **Interruptibility is a property of real objects.** A page flip in a book can be interrupted; an animation you must wait for breaks the metaphor.
4. **Lightweight actions trigger mid-gesture; destructive actions trigger on release.** Overlays and search reveals fire after some distance during the swipe; the iOS App Switcher never dismisses an app before finger-up, whatever the distance, so a change of mind stays possible.
5. **Responsive gestures apply the delta immediately** (pinch scale tracks the fingers) and only animate after a threshold; a pure 0->1 animation on threshold gives no affordance.
6. **Spatial consistency explains motion.** The app opens from where it came from (icon vs Dynamic Island vs from the right); that tells the user the app's place on the stack. Where there is no ambiguity (only one source), the motion can be simpler.
7. **Frequency x novelty:** the more often an action runs, the less a novel treatment rewards (semantic satiation). Keyboard and mouse input feel more mechanical than touch, so no animation is often fine; context menus on macOS appear instantly and only fade out; the macOS app switcher has no animation and skips the menu entirely if Cmd+Tab is quick. (interaction-design, novelty)
8. **Novelty is an exclamation mark / seasoning / the 10% accent.** Make about 90% of the experience familiar and 10% novel, like the 60/30/10 colour rule in film. Spend novelty on onboarding and one-off moments; do not replay it every visit. (novelty)
9. **Depth is composed, not decorated.** "Dirty the frame": layered foreground and background, blurred inner backgrounds to lower them on Z, fade the bottom edge so boundaries feel infinite. Dim and blur backdrops behind overlays to simulate depth of field. (depth)
10. **Choreography is sequencing in time.** Break an interaction into discrete states (the iOS Home Screen swipe-down has 4) and delay what would compete; reverse the order when the trigger is different (tap on Search puts the input first, Siri suggestions slightly after).
11. **Nature staggers; uniform sync looks mechanical.** Stagger similar siblings slightly (OpenAI's grid load, iOS unlock icons, Control Centre rubber band).
12. **Ship constraint.** For the Vercel homepage the north stars were performance, constraint in visual flair, bridging pages; if an animation did not perform well or felt pompous or off-rhythm it was not built. Universally experienced things: page speed, legible type, honest information, layout stability, scannability, accessible focus states, sensible DOM order. (vercel)
13. **Understanding and articulating why something feels right is the other side of designing it.** The reason can be a spring curve or something innate like a metaphor.

## 2. Rules

### 2.1 Gestures and interaction logic

- **RULE** Fire lightweight, reversible actions (showing an overlay, search reveal, unlock) during the gesture when the moving elements reach their logical resting place; fire destructive or committing actions only on release, regardless of distance.
  **Why** Waiting for finger-up on a light action feels broken; triggering a destructive action mid-swipe removes the chance to change your mind.
  **Applies to** mobile gesture UI, drawers, swipe-to-delete. **Check** `visual`/test: delete/dismiss handlers run in `pointerup`/`touchend`, not `pointermove`. **Source** https://rauno.me/craft/interaction-design (verified)
- **RULE** During a gesture apply the input delta to the element immediately (1:1), then animate to the committed state after a threshold or on release.
  **Why** Immediate tracking tells the user the object is manipulable; a threshold-then-animate response gives no affordance.
  **Applies to** pinch, drag, sheets, sliders. **Check** `visual`; pointermove handler writes transform before any easing. **Source** https://rauno.me/craft/interaction-design (verified)
- **RULE** Gestures and transitions must be interruptible: tapping or swiping back mid-animation reverses or retargets immediately (iOS Settings push is the counterexample). Use transitions/springs rather than fixed keyframe timelines.
  **Why** Real objects are interruptible; waiting for an animation to finish feels unresponsive.
  **Applies to** navigation pushes, panels, menus. **Check** toggle the control twice quickly: state follows the latest input without jump. **Source** https://rauno.me/craft/interaction-design ; https://interfaces.rauno.me/ (verified)
- **RULE** Motion origin follows the semantic source: launch from the object that triggered it (icon, button), or from the side that matches its place in the stack; reserve the generic entrance for cases with only one possible source.
  **Why** Origin shows where the thing lives and how it relates.
  **Applies to** modals, app/page transitions, drawers. **Check** `visual`: `transform-origin` and enter direction match trigger location. **Source** https://rauno.me/craft/interaction-design (verified)
- **RULE** Show feedback near the trigger: inline checkmark on a successful copy (not a notification), highlight the relevant input(s) on form error, start transitions at the trigger location.
  **Why** The system must say "I understood you" where the user is looking.
  **Applies to** forms, copy buttons, search. **Check** copy button swaps its own icon/label for >=1s; error styles are on the invalid field. **Source** https://interfaces.rauno.me/ ; https://rauno.me/craft/depth (verified)
- **RULE** When a finger covers the content being manipulated, show a magnified or enlarged echo (loupe above the caret, enlarged key on press), and keep a drag alive even when the finger leaves a thin control (sliders).
  **Why** Interacting with something you cannot see is uncomfortable.
  **Applies to** touch sliders, text selection, keyboards, scrubbers. **Check** slider track uses pointer capture; `visual` for echo. **Source** https://rauno.me/craft/interaction-design (verified)
- **RULE** Use infinite targets (screen corners/edges) or pointer-centred radial menus for frequently used actions when it fits; place commonly used menus in corners.
  **Why** Fitts's law: time depends on distance and size; targets at the screen edge cannot be overshot.
  **Applies to** desktop apps, dashboards. **Check** primary navigation anchored to an edge or corner; target size >= 44px (touch) or >= 24px (pointer). **Source** https://rauno.me/craft/interaction-design (verified; size thresholds are [engine note])
- **RULE** Predict intent from context where possible (do not ask): adjust brightness for scanning, blur app content in the app switcher when it holds sensitive data, auto-show relevant state.
  **Why** The most natural input is no input.
  **Applies to** mobile, fintech. **Check** `visual`/review. **Source** https://rauno.me/craft/interaction-design (verified)
- **RULE** Inside nested menus use a prediction cone so the pointer can travel diagonally to a submenu without the menu closing.
  **Why** Sloppy pointer paths close menus accidentally.
  **Applies to** desktop nested menus. **Check** submenu close delay or safe-triangle logic present. **Source** https://interfaces.rauno.me/ (verified)

### 2.2 Frequency, novelty, motion budget

- **RULE** Remove motion from high-frequency, low-novelty actions: opening a command menu or right-click menu, adding/deleting list rows, hovering trivial buttons, keyboard-driven focus changes. Menus may fade out gently but not animate in; a quick Cmd+Tab-style trigger can skip the UI entirely.
  **Why** After a few days the animation feels like waiting; removing it makes the whole app feel faster than tuning it.
  **Applies to** SaaS app UI. **Check** `transition-duration` is 0 on menu rows and on open of command menu; enter animations absent on keyboard-initiated opens. **Source** https://rauno.me/craft/interaction-design ; https://interfaces.rauno.me/ ; https://rauno.me/craft/novelty (verified; his own bookmarks app anecdote)
- **RULE** Spend novelty at about 10%: onboarding, first login, rare destinations get the expressive treatment once; return visits show the page instantly. Implement "first time only" with a cookie flag (set on login, read by middleware, flag cleared after the animated variant is served).
  **Why** A welcome flourish on every visit loses its meaning; contrast creates the effect.
  **Applies to** product onboarding, marketing microsites. **Check** animated intro variant gated by a flag; reload shows no animation. **Source** https://rauno.me/craft/novelty (verified; implementation via Next.js rewrite)
- **RULE** Keep rhythm in novelty: do not place two high-novelty animations back-to-back; separate them with quiet interludes. Do not make every element signal itself as novel; reserve the accent colour similarly.
  **Why** When everything announces itself, nothing stands out.
  **Applies to** landing pages. **Check** scroll map of high-novelty sections: no two adjacent. **Source** https://rauno.me/craft/vercel (verified; the "map of novelty" figure)
- **RULE** Animation values stay proportional to the trigger size, and interaction animations stay at or under 200ms to feel immediate.
  **Why** A small control cannot justify a large swoop; long durations feel laggy.
  **Applies to** hover, press, toggles, menus. **Check** computed durations of `:hover`, `:active`, toggle, menu <= 200ms; displacement relative to trigger. **Source** https://interfaces.rauno.me/ (verified; see section 5 for the 300ms comparison)
- **RULE** Do not animate a dialog in from scale 0 -> 1; fade opacity and scale from about 0.8. Do not scale buttons on press from 1 -> 0.8; use about 0.96, or about 0.9 for stronger.
  **Why** Large jumps in scale look cheap; small controlled values feel physical.
  **Applies to** dialogs, buttons. **Check** `scale(0)` grep; press scale in [0.9, 0.98]. **Source** https://interfaces.rauno.me/ (verified; conflicts with Emil, see section 5)
- **RULE** Looping animations pause when off-screen (IntersectionObserver) to offload CPU/GPU; auto-playing videos beyond what the device can take are paused or unmounted off-screen.
  **Why** Many simultaneous loops/videos choke devices, especially iOS.
  **Applies to** landing pages with loops/video. **Check** each infinite `animation` or video has a visibility observer; `playsinline muted` set on iOS autoplay videos. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Disable all transitions and animations while the theme switches; no animated theme toggle.
  **Why** Hover/focus transitions fire on every element when theme variables change, causing a visible mess.
  **Applies to** any site with dark mode. **Check** theme toggle injects a `* {transition: none !important}` style (or uses `next-themes`' disableTransitionOnChange) for one frame. **Source** https://interfaces.rauno.me/ footnote 1 ; Paco: https://paco.me/writing/disable-theme-transitions (verified)
- **RULE** Reduced motion: pause looping complementary animations with `animation-play-state: paused` rather than `animation: none`; keep a blinking caret visible while paused (`opacity: 1 !important`); explicit user inputs are not intentionally reduced when they have no large amplified effect.
  **Why** Abruptly cancelling looks broken; a caret that pauses in its invisible phase vanishes.
  **Applies to** all. **Check** `@media (prefers-reduced-motion: reduce)` rule sets `animation-play-state: paused` on loop classes; caret opacity 1. **Source** https://rauno.me/craft/vercel (verified)

### 2.3 Depth, choreography, stagger

- **RULE** Create depth by layering: blur the inner or back layer to lower it on the Z axis, fade the bottom edge of the container into the page, add offset frames and out-of-focus objects, and make decorative layers use the primary subject to communicate the product idea (Preview Deployments = many offset browser frames).
  **Why** A flat, centred specimen with overlays added as an afterthought reads as sloppy; depth of field is what eyes expect.
  **Applies to** landing hero visuals. **Check** hero has >=2 depth layers (blur/scale/opacity differences); `visual`. **Source** https://rauno.me/craft/depth (verified)
- **RULE** When a modal/menu launches, dim and/or blur the backdrop to de-emphasise it and signal that only the overlay is interactive; tapping the backdrop closes.
  **Why** Depth of field plus honest affordance.
  **Applies to** overlays, context menus. **Check** backdrop has blur or dim; backdrop click closes. **Source** https://rauno.me/craft/depth (verified)
- **RULE** Choreograph by splitting a transition into discrete states and delaying competing elements: blur the underlying layer first, then reveal items that share its space; reverse the order when the trigger differs (tap -> immediate input, suggestions slightly later). Always prioritise the area near the trigger.
  **Why** Parallel revealing causes odd layering and splits attention; sequencing sets a reading order.
  **Applies to** search overlays, command menus (first open only), onboarding. **Check** each element in an overlay entrance has a defined state/timing; the trigger-adjacent element animates first. **Source** https://rauno.me/craft/depth (verified)
- **RULE** Stagger similar siblings by a small amount for loading grids, unlock/reveal, and hover text effects; the interface should not feel slower as a result.
  **Why** Elements do not jarringly appear all at once; users can track what arrived.
  **Applies to** grids/lists on first load, hero text. **Check** per-item delay present; total cascade capped (see hub). **Source** https://rauno.me/craft/depth (verified)
- **RULE** Elements that stay interactive while the rest recedes should slide away without blurring; elements that become inactive blur with the background.
  **Why** Blur communicates "inactive layer"; sliding with full opacity says "still reachable".
  **Applies to** docks, bottom bars, toolbars during overlays. **Check** `visual`. **Source** https://rauno.me/craft/depth (verified)

### 2.4 Forms, inputs, interactivity (interfaces.rauno.me)

- **RULE** Clicking an input's label focuses the input (`<label for>` or wrapping).
  **Why** Larger target and standard behaviour.
  **Applies to** forms. **Check** every `input` has an associated label (`input.labels.length > 0`). **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Wrap inputs in a `<form>` so Enter submits; use semantic `type` (`password`, `email`, ...); use the `required` attribute and HTML validation where it fits; turn off `spellcheck` and `autocomplete` on inputs where they get in the way (most of the time per the source).
  **Why** Native behaviours, mobile keyboards, less custom code.
  **Applies to** forms. **Check** `input` has `form` ancestor; `type` not default text for email/password fields. **Source** https://interfaces.rauno.me/ (verified; autocomplete-off is the source's stance, tension with a11y/autofill, see section 5)
- **RULE** Prefix/suffix decorations (icons) sit absolutely positioned on top of the input with padding and forward clicks to focus the input.
  **Why** One visual field, one focus target.
  **Applies to** search, currency, URL fields. **Check** decoration `pointer-events` forwards to input. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Toggles take effect immediately (no confirm); buttons disable after submission to avoid duplicate requests; interactive elements disable `user-select` on inner content; decorative glows/gradients set `pointer-events: none`; list items have no dead zones between them (grow padding rather than add gaps).
  **Why** Standard polish: no duplicate network calls, no accidental text selection, no hijacked events, continuous hit areas.
  **Applies to** app UI. **Check** `[role=switch]` change handler commits state; submit button disabled during pending; decorative layers computed `pointer-events: none`. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Use optimistic updates: change local state immediately and roll back with feedback on server error. Do authentication redirects on the server before the client loads.
  **Why** Perceived instant response; no janky URL flicker.
  **Applies to** SaaS app UI. **Check** `visual`/code review. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Empty states prompt the next action (create an item), optionally with templates.
  **Why** A blank list is a dead end.
  **Applies to** app UI. **Check** empty-state view contains a primary button. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Style `::selection`; gradient text must unset the gradient on `::selection`.
  **Why** Default selection on gradient clipped text becomes unreadable.
  **Applies to** brand pages. **Check** `::selection` rule exists; gradient-text selectors have `::selection { background-clip: ...; -webkit-text-fill-color: ...}` override. **Source** https://interfaces.rauno.me/ (verified)

### 2.5 Typography (interfaces.rauno.me)

- **RULE** Apply `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`; subset fonts to the needed alphabets; `-webkit-text-size-adjust: 100%` to stop iOS landscape resize.
  **Why** Cleaner rendering on macOS, smaller payload, stable sizes on rotate.
  **Applies to** all. **Check** computed values on `body`. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Font weight must not change on hover or selected state (layout shift); do not use weights below 400; medium-size headings look best at 500-600.
  **Why** Weight changes reflow neighbouring text; thin weights hurt legibility (opinion).
  **Applies to** nav, tabs, headings. **Check** `font-weight` equal across `:hover/[aria-selected]` states; computed weight >= 400 on text. **Source** https://interfaces.rauno.me/ (verified; "below 400" is the source's taste)
- **RULE** Use `clamp()` for fluid headings, e.g. `clamp(48px, 5vw, 72px)` (his Next.js hero used `clamp(48px, 5vw, 76px)`); use `font-variant-numeric: tabular-nums` for tables, timers, and anything that shifts layout.
  **Why** Smooth scaling without breakpoints; stable numerals.
  **Applies to** hero headings, numeric UI. **Check** `font-size` of `h1` uses `clamp(`; numeric columns have `tabular-nums`. **Source** https://interfaces.rauno.me/ ; https://rauno.me/craft/nextjs (verified)
- **RULE** Render pull-quote marks in a serif (Georgia) for finesse and offset the quote with `text-indent: -0.4em` so lines align vertically.
  **Why** A sans quote mark looks default; the hang keeps the text edge straight.
  **Applies to** testimonials. **Check** quote glyph font-family differs from body; `text-indent` negative. **Source** https://rauno.me/craft/nextjs (verified)

### 2.6 Touch (interfaces.rauno.me)

- **RULE** Hover states are only visible on hover-capable devices: wrap in `@media (hover: hover)`.
  **Why** Touch devices flash hover on press.
  **Applies to** all. **Check** every `:hover` that changes visuals is inside the media query. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Input font size >= 16px (iOS zooms on focus otherwise); do not autofocus on touch devices; `muted` + `playsinline` on autoplay videos; set `touch-action` on custom pan/zoom components; if removing the tap highlight (`-webkit-tap-highlight-color: transparent`) replace it with an equivalent.
  **Why** iOS behaviours that break layout or gestures.
  **Applies to** mobile. **Check** computed `font-size >= 16px` on inputs; no `autofocus` attribute on touch UIs. **Source** https://interfaces.rauno.me/ (verified)

### 2.7 Performance (interfaces.rauno.me and essays)

- **RULE** Large `blur()` for `filter` and `backdrop-filter` is slow; scaling and blurring filled rectangles produces banding, so use radial gradients instead; `translateZ(0)` sparingly; toggle `will-change` only for the duration of a janky scroll animation; bypass React re-renders for real-time values (wheel delta in a ref, write DOM directly); adapt to hardware and network.
  **Why** Paint cost and banding.
  **Applies to** hero effects, canvases. **Check** blur radii <= 20px on animated nodes; no permanent `will-change` on many elements. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Animate glows by toggling opacity (and transform) of pseudo-elements that carry the `box-shadow`; never animate `box-shadow` itself.
  **Why** Animating box-shadow repaints every frame; weak phones drop frames.
  **Applies to** glows, switchboard-style lights. **Check** transitions list contains no `box-shadow`. **Source** https://rauno.me/craft/nextjs (verified)
- **RULE** Build hero visuals as layered CSS/SVG that paints without client JS, then progressively enhance with a code-split shader that fades in after load; detect low-power devices and skip the shader.
  **Why** Fast first paint on the hero; the enhancement is optional.
  **Applies to** landing hero. **Check** hero visible with JS disabled; shader loaded via dynamic import. **Source** https://rauno.me/craft/vercel (verified; layer order top to bottom: heading, SVG triangle, CSS grid lines, SVG rays, CSS rainbow gradient, GLSL shader)

### 2.8 Accessibility and focus

- **RULE** Draw focus rings with `box-shadow`: `0 0 0 2px var(--app-background), 0 0 0 4px var(--focus-color)` and `transition: none` on `:focus-visible`; keep one colour/shape app-wide, match the trigger radius, and do not clip on overflow. (Modern Safari honours radius with `outline`, see section 5.)
  **Why** Consistent, radius-following focus is rare; Discord is cited as the model.
  **Applies to** all interactive elements. **Check** every focusable has `:focus-visible` style with visible 2px ring and contrast >= 3:1 against both surfaces; ring not clipped by `overflow:hidden`. **Source** https://rauno.me/craft/nextjs ; https://interfaces.rauno.me/ (verified)
- **RULE** Give focusable text links a small radius with matching padding/negative margin (`border-radius:2px; padding-left:2px; margin-left:-2px`) so the focus ring looks right without moving the text.
  **Why** Rounded corners only show on focus but make the ring nicer.
  **Applies to** inline links, nav. **Check** `visual`. **Source** https://rauno.me/craft/nextjs (verified)
- **RULE** Disabled buttons have no tooltips (they leave the tab order, so keyboard users never hear why); icon-only controls have an explicit `aria-label`; tooltips triggered by hover contain no interactive content; use real `<img>` for images; illustrations built from HTML get one `aria-label` on a `role="img"` wrapper with the inner tree `aria-hidden`.
  **Why** Screen reader output for raw illustration DOM is noise.
  **Applies to** all. **Check** `button[disabled][title], button[disabled][data-tooltip]` absent; icon buttons have accessible name; decorative trees `aria-hidden`. **Source** https://interfaces.rauno.me/ ; https://rauno.me/craft/nextjs ; https://rauno.me/craft/vercel (verified)
- **RULE** List-like focusables are navigable with up/down arrows and deletable with Cmd+Backspace; dropdown menus open on `mousedown` for immediate response (keyboard open still works).
  **Why** Power-user speed.
  **Applies to** SaaS app UI. **Check** keyboard handler tests; `onMouseDown` on menu trigger. **Source** https://interfaces.rauno.me/ (verified)
- **RULE** Accessible code blocks: hide decorative file icon, label the copy button, announce copy success in a visually hidden `role="log"` `aria-live="polite"` region, hide CSS-counter line numbers from screen readers with `content: counter(line) / ""`, wrap complementary code in `<aside aria-label="...">`.
  **Why** Line numbers and unlabeled icons are noise; success must be audible.
  **Applies to** docs, marketing code blocks. **Check** axe + VoiceOver pass; live region exists. **Source** https://rauno.me/craft/vercel (verified)
- **RULE** Use an SVG favicon with an embedded `prefers-color-scheme` style.
  **Why** Visible on dark browser chrome.
  **Applies to** all sites. **Check** `link[rel=icon][type="image/svg+xml"]`. **Source** https://interfaces.rauno.me/ (verified)

### 2.9 Layout and visual craft (Next.js and Vercel pages)

- **RULE** Draw dotted container grid lines with a repeating `linear-gradient` background (1px high, 5px period, colour at 50% then transparent) plus a mask to fade the ends (`--fade-stop: 90%`, `--offset: -100px` to bleed out) instead of `border: dotted`.
  **Why** Precise dot control and edge fade on one element.
  **Applies to** hero containers, section dividers. **Check** `visual`. **Source** https://rauno.me/craft/nextjs (verified)
- **RULE** Build modular grids from guides drawn by `display: contents` wrappers and absolutely positioned guide cells (rows * columns cells), so empty cells still show guides and `auto` placement keeps working. 1080px content with 3 x 360px columns keeps 14-16px text at a comfortable line length. Crosshair marks sit at cell intersections.
  **Why** The "show the frame" aesthetic stays stable across pages, so navigation reads as only content changing.
  **Applies to** marketing pages. **Check** column width 320-400px for 14-16px copy; guides server-rendered. **Source** https://rauno.me/craft/vercel (verified)
- **RULE** Use container queries (`container-type: inline-size`, `@container (max-width: 560px)`) for widgets instead of window width, and label code-driven visuals as `role="img"`.
  **Why** Components know their own space; drop-in reuse.
  **Applies to** reusable visuals/cards. **Check** component-level `@container` rules instead of `@media` in reusable parts. **Source** https://rauno.me/craft/vercel (verified)
- **RULE** Style variants via data attributes (`data-variant="callout"`) instead of toggling many class names.
  **Why** Less duplication; easy CSS.
  **Applies to** component code. **Check** `[data-variant]` selectors. **Source** https://rauno.me/craft/nextjs (verified)
- **RULE** Contrast aesthetics deliberately: introduce one element that differs in form (rotation, hand-drawn, bitmap vs serif, ASCII vs soft 3D) so curiosity asks "why is this different?", but avoid it in productivity software; use for first impressions and tone.
  **Why** Equal-weight elements say nothing; the right amount of contrast invites attention (opinion).
  **Applies to** landing page, brand. **Check** `visual`: exactly one contrast motif per section. **Source** https://rauno.me/craft/contrasting-aesthetics (verified, opinion)
- **RULE** Ship the static version when it is an improvement; follow with animation and adjustments in later PRs.
  **Why** Big PRs stall.
  **Applies to** process. **Check** n/a. **Source** https://rauno.me/craft/nextjs (verified)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Interaction animation max | 200ms | interfaces.rauno.me |
| Dialog enter scale | from about 0.8, never 0 | interfaces.rauno.me |
| Button press scale | about 0.96; about 0.9 allowed; never 0.8 | interfaces.rauno.me |
| Input font-size min | 16px | interfaces.rauno.me |
| Heading weight | 500-600; no weight <400 | interfaces.rauno.me |
| Fluid heading | `clamp(48px, 5vw, 72px)`; Next.js hero `clamp(48px, 5vw, 76px)` | WIG; nextjs |
| Focus ring | `0 0 0 2px bg, 0 0 0 4px focus-color` | nextjs |
| Link focus finesse | radius 2px, padding-left 2px, margin-left -2px | nextjs |
| Quote hang | `text-indent: -0.4em` | nextjs |
| Dotted grid line | 1px high, 5px period, fade-stop 90%, offset -100px | nextjs |
| Glow lights | 1px dot; medium `box-shadow: 0 0 2px 1px rgba(50,145,255,.25)` on #3291FF; high white dot with `0 0 1px 1px rgba(50,145,255,.8), 0 0 2px 1px rgba(50,145,255,.25)`; off #707070 | nextjs |
| Vercel grid | 1080 wide, 360 columns, 14-16px text | vercel |
| Film colour rule | about 60% primary / 30% secondary / 10% accent | novelty |
| Novelty rule | about 90% familiar / 10% novel | novelty |
| Home Screen swipe | 4 discrete states | depth |
| Rotation groups (morph work) | 90 deg arrows/chevrons, 45 deg plus/cross | see Benji note |
| Pixel icon bitmap | 24x24 matrix, about 1KB base64 placeholder each | vercel |
| Gradient trace | animate `x1,x2,y1,y2` of `linearGradient` 2s repeat | nextjs |
| iOS app icon crop | Bluesky ignored safe zone, bottom about 10pt cropped and stretched | interaction-design |
| `offset-path` | `content-box` works Safari 17.2+; circle fallback `path("M 100 0 A 100 100 0 1 1 100 200 A 100 100 0 1 1 100 0")` | vercel |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| Right-click/command menu appears instantly, fades out | Opacity+scale fade on a menu opened thousands of times a day |
| Overlay backdrop dimmed and blurred | Overlay on un-dimmed, fully interactive-looking page |
| Pinch scale tracks fingers, then snaps | Pinch that only triggers a 0->1 animation past a threshold |
| App Switcher: dismiss only on release | Dismiss as soon as swipe distance is reached |
| Copy shows an inline checkmark | Copy shows a toast far from the button |
| Focus ring: radius-matched shadow, 2px offset | Default browser ring on some controls, custom on others |
| Disabled button with explanation text next to it | Tooltip on a disabled button |
| HTML illustration: `role=img` + `aria-label` + inner `aria-hidden` | Screen reader reads 40 divs |
| Pause loops under reduced motion with `animation-play-state` | `animation: none` that snaps visible state, caret frozen invisible |
| First-run animation once via cookie flag | Welcome animation at every login |
| High-novelty and low-novelty sections alternate | Three flashy sections in a row |

## 5. Exceptions & judgement calls

- **Enter scale 0.8 (Rauno/WIG) vs 0.9-0.95 (Emil).** See craft-emil-kowalski.md section 5 conflict A. Recommended: choose by element size using per-edge displacement `(1 - s) * dimension / 2` of about 6-16px; 0.8 acceptable only for small elements; floor 0.85; ban 0. This note's source (interfaces.rauno.me) writes "~0.8" with a tilde, i.e. it is an approximation, not a spec.
- **Duration: 200ms (WIG) vs 300ms (hub).** Resolution: micro <= 200ms, overlays 200-300ms (see Emil conflict B).
- **Focus ring `box-shadow` vs `outline`.** The checklist says box-shadow because Safari ignored border-radius on outlines (as of 2023; Safari 16.4 added support). Today `outline: 2px solid; outline-offset: 2px` follows radius in current browsers and is not clipped by `overflow` like a shadow can be in some contexts, and works with Windows forced-colors. Recommended [engine note]: use `outline` + `outline-offset` as default, keep the shadow ring only where the design already uses it. Forced-colors mode ignores box-shadow, so never rely on shadow alone.
- **`spellcheck`/`autocomplete` off "most of the time".** Autocomplete off on password/email/address fields harms password managers and a11y (WCAG 1.3.5 identify input purpose). Keep `autocomplete` tokens (`email`, `current-password`); turn spellcheck off for non-prose fields. [engine note]
- **Dropdown menus open on `mousedown`.** Fine for pointers; ensure keyboard activation (Enter/Space on `click`) still works and touch is not double-fired.
- **"No weights below 400"** is taste; a light display face at large size can be right in an editorial brand.
- **Novelty rule is explicitly "a grain of salt"** (his words); the 90/10 split is a heuristic, not measurable. Use it as a review question.
- **Depth essay vs hub's "motion explains":** consistent. Choreography detail (delay competing elements) is the how.
- **Interruptible-first vs fixed choreography:** Rauno's choreography uses sequenced delays; make sure each delay is still cancellable (state-based transitions, not timelines).

## 6. Figures worth keeping

Pages whose interaction teaches something text cannot (rebuild in `examples/`): pinch-card responsiveness (threshold vs immediate delta); iOS Home Screen 4-state swipe; Dynamic Island launch origins; macOS context-menu blink-then-fade; scrollbar landmark prototype; radial menu (rauno.me/craft/radial-menu); wheel/fractional/precision sliders; exclusion/flashlight tabs; Vercel footer; Vercel 2023 homepage novelty map (orange vs blue sections); Next.js switchboard lights; gradient-tracing CPU lines; pixelated icon matrices.

## 7. Open questions

- `/notes` (Field Notes) is client-rendered and returned only its title.
- Devouring Details (paid), History of Software Design, Posters, Toolbar Morph, Inline Conversion, X-Ray, Blur Reveal, Word Lookup, SwiftUI Dock were not ingested (external/paid/no text).
- The Rauno checklist is a living document; this is a 2026-10-08 snapshot. The WIG repository version (vercel-labs) may carry additional items.
- Unknown: whether "interaction animations <= 200ms" in the checklist includes overlay transitions or only hover-scale interactions.

## 8. Taste method

Rauno's route from feel to rule:

1. **Deconstruct production work.** Replay hundreds of slow-motion screen recordings; recreate interfaces (SwiftUI MercuryOS, Dynamic Island) to find the invisible choices. Making something fills the headspace; a walk afterwards "stirs the pot".
2. **Ask a standard set of questions of each gesture:** when does it trigger, does it keep momentum, what if a finger covers it, how is intent predicted, what is interruptible, what is the origin. These become reusable review questions.
3. **Contrast pairs in the wild.** iOS Settings vs App Switcher (interruptibility); Clock app vs Spotify launch (origin); App Switcher dismissal vs overlay reveal (trigger timing); Magic Mouse vs MX scroll hijacking. Find the system that did it right and the near-identical one that did not.
4. **Name the vocabulary.** Fidgetability, scroll landmarks, kinetic physics, spatial consistency, fluid morphing, choreography, dirtying the frame, novelty tax. Names make details discussable and checkable.
5. **Hypothesis from a variable, then test on own product.** Frequency vs novelty: formed in 2023, tested on his bookmarks tool (animations felt sluggish after days; removing them felt faster), re-stated in 2026 with cinema ratios (60/30/10) and a "90% familiar / 10% novel" heuristic. He labels it "a grain of salt".
6. **Keep a living checklist.** interfaces.rauno.me: terse imperative items per category with footnotes for the exception or reason. Edits via pull request.
7. **Self-imposed constraint as taste.** "If an animation did not perform well, felt pompous or out of rhythm, we did not build it."
8. **Close the loop with the reason.** "There must be a reason: a spring curve or something innate like metaphors."

## 9. Craft details catalogue

| Name | What | How |
|---|---|---|
| Pinch anchored at close fingers | Zoom origin chosen precisely | start gesture with fingers together; anchor from first contact |
| Mid-swipe unlock | Screen unlocks/locks without lifting finger | fire when titles reach logical final position |
| Peek without commit | Swipe to see another app, change direction to cancel | commit only on release |
| Momentum-preserving dismissal | App flies to icon with the angle it was thrown | carry release velocity vector into the exit spring |
| Stretch-to-icon morph | Rectangle morphs to square icon, stretched from bottom | scale non-uniformly; needs icons with safe zone |
| Context-menu blink | Selected item flashes accent then menu fades | 1 blink, then fade out only |
| Cmd+Tab fast path | Quick press skips overlay and switches | if key delta < threshold, switch immediately |
| Fidget affordance | Pleasant repeated micro-action | friction/tactility on a toggle or knob |
| Scroll landmark | Double tap scrollbar to drop a bookmark in a long page | landmark marker; tap to return |
| Minimap | Page heads-up display | miniature of page with viewport window |
| Loupe | Magnified caret above finger | disappears when finger no longer covers it |
| Key preview | Enlarged key on press | confirms input |
| Magic corners / radial menu | Targets with infinite size | hold and rotate; same distance to every action |
| Scroll capture | Scroll events do not hijack when pointer moves over another window | cancel scroll on focus change |
| Direct-manipulation slider by scroll | Scroll wheel moves slider | one interaction for horizontal gesture |
| Blurred privacy cover | App blurs content in the switcher | `visibilitychange`/blur overlay |
| Blurred inner background | Lowers a layer on Z | `filter: blur()` on back layer; fade bottom edge |
| Backdrop de-emphasis | Dim/blur while menu open | backdrop layer |
| Dock stays crisp | Slides off but not blurred -> still interactive | translate only |
| Staggered rubber band | Rows spring with slightly different configs | per-row spring stiffness offset |
| Text stagger hover | Letters offset by small delays | per-letter delay on hover |
| Switchboard lights | Pseudo-element opacity states `off/medium/high` | `[data-state]` + `::before/::after` shadows |
| Dotted gradient line | Controllable dotted rule with faded ends | repeating gradient + mask |
| Gradient tracing | Light pulse running along a curved path | animate `linearGradient` x1/x2/y1/y2; masks fade ends |
| Random-delay dots | Scatter of dots fades in randomly | JS random delays; hover toggles opacity |
| Pixelated icon | Icon on canvas from 24x24 matrix | draw circles per pixel; base64 placeholder; SVG if above fold |
| Graph slider | Dot rides the curve, grey/colour split reveals | `offset-path` + `offset-distance` %; colour layer clipped with `inset` |
| Orbit rings | Icons orbit along bounding box | `offset-path: content-box` animation 5s linear |
| Serif quote marks | Georgia quotes on sans text | font-family on pseudo + hang `-0.4em` |
| Caret that never vanishes | Blink caret pauses visible | reduced-motion rule sets opacity 1 |
| Cookie-gated intro | Intro animates only after login | middleware rewrite to animated variant, then reset flag |
| Novelty map | Audit sheet colouring sections by novelty | orange = high novelty, blue = low; no two orange adjacent |
