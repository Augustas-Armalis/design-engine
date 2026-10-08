---
source: web:https://benji.org/ ; https://brianlovin.com/ ; https://paco.me/
chapter: Benji Taylor (Family, Honk, Agentation, Liveline, Drawesome, morphing icons), Brian Lovin (writing, sites, App Dissection), Paco Coursey (writing and craft)
pages: n/a (fetched 2026-10-08; raw text in corpus/web/craft-essays/benji-*, lovin-*, paco-*, private)
topic_tags: [fluidity, delight, progressive-disclosure, trays, text-morph, quality, undo, feedback-loop, app-dissection, theme-toggle, underline, clip-path, blur, agents, critique]
status: studied
---

# Benji Taylor, Brian Lovin, Paco Coursey: craft case studies and quality heuristics

Coverage and honesty about depth. The three authors are lower in hard numbers than Emil and Rauno; most value is in named principles, product-level patterns and small CSS tricks.

- **Benji (benji.org):** index lists 7 essays; all read in full: family-values, honkish, agentation, annotating (Annotating for agents), morphing-icons-with-claude, liveline, drawesome. Family Values has almost no numbers (the existing hub already summarised it); this note extracts the rules behind it.
- **Brian Lovin:** /writing lists 47 posts (2019-2026), all fetched (raw saved). Most are career, tooling or personal-site posts with no UI rules; the design-relevant ones are quality-software, design-to-save-people-from-themselves, the-meta-skills-of-product-design, design-critique-for-fun-and-profit, give-your-agent-a-laboratory (pt I and II), give-your-agent-a-stopwatch, hiring-design-minded-frontend-engineers, true-respect-is-the-difference, how-my-website-works. /sites is a curated list of about 290 outbound links to well-made websites (names only, no commentary). /app-dissection lists 22 teardown posts from 2016 (NeuBible, Shorts, Stripe, Pinterest, Hyperlapse, Inbox, Square Order, Android 5.0, Instagram, Tumblr, Carousel, Quartz, Twitter, Paper, Secret, Google Search, Sunrise, Flickr, Skype, Path, SoundCloud, Foursquare); all 22 fetched. Read in full: Stripe Dashboard and Inbox; skimmed section-by-section: all others; Shorts, Skype, SoundCloud, Sunrise, Square Order, Tumblr, Twitter only by section titles/first lines.
- **Paco (paco.me):** index, /writing (20 posts, all fetched), /craft (9 prototypes, all fetched). Most posts are short technical notes.
- Not readable or not applicable: benji.org pages are static and fine; brianlovin.com/sites per-site commentary does not exist. No blocked pages.

Provenance: **(verified)** from the text; **(opinion)** author taste; **[engine note]** my synthesis.

## 1. Core ideas

1. **Benji: simplicity, fluidity, delight, each with a mechanism.** Simplicity = gradual revelation (dynamic trays); fluidity = no static transitions, everything visibly links; delight = selective emphasis tuned to how rarely a feature is used. (family-values)
2. **Fluid means "float rather than walk".** Any element can transform into another if there is a rationale; persistent elements stay and move instead of being duplicated; text morphs through shared letters.
3. **Delight-Impact Curve (Benji):** the potential for delight rises as frequency of use falls. Frequent features get tiny details (commas that slide as you type a number), rare features get bigger moments (confetti after backup, a tumbling trash can). Echoes Rauno and Emil. (family-values)
4. **Uniform polish earns the right to delight.** A fancy restaurant with a dirty bathroom: neglected rare screens make the whole product feel unfinished.
5. **Pointing beats describing (Benji, Agentation):** capture the element (selector, text, bounding box) with the note; calibrate how much context an agent needs.
6. **Agents optimise for "works", not "feels right"** (Benji, morphing icons): the human must watch the transition, name what is off, and supply the insight (arrows should rotate, not morph coordinates).
7. **Lovin: quality = attention x intention.** Developers paying attention to details (contrast in sunlight, 60fps, consistent colour semantics, labelled controls, haptics) and developing with intention (motion, icons and colour used on purpose; knowing when to stop adding features). "We notice quality by the absence of imperfections" ("I know it when I see it").
8. **Lovin: design to save people from themselves.** Persist drafts, warn before destruction, undo, sensible defaults, big tap targets, content scanning.
9. **Lovin (2026): agents are only as good as their feedback loop.** Give them a stopwatch (baseline measurement) or a laboratory (benchmark harness, screenshot compare, iterate and commit). If an agent asks you to check manually, build the missing tool.
10. **Paco: implement it, note the bugs, keep it simple.** Craft pages list known bugs next to each trick; the 2021 redesign chose performance, simplicity, craft over novelty and ships with JavaScript disabled.

## 2. Rules

### 2.1 Benji: fluidity, trays, delight

- **RULE** Reveal progressively: put fundamentals at hand and surface everything else when it becomes relevant (confirmations, warnings, education) in small step-by-step trays rather than a full-screen flow.
  **Why** Complex products that show all features at once overwhelm newcomers; contextual trays "appear in the right place at the right time".
  **Applies to** mobile, fintech/AI-SaaS onboarding and confirmations. **Check** count of controls visible on first screen of a flow; destructive/confirm steps are trays/dialogs, not new routes (`visual`). **Source** https://benji.org/family-values (verified)
- **RULE** Tray/sheet system rules: user-initiated only; each tray in a sequence differs in height from the previous so the change is unmistakable; every tray has a title and an icon (the icon dismisses if it is the first tray and goes back otherwise); one piece of content or one primary action per tray; the visual theme adapts to context (dark flow = dark tray); transient actions use trays, persistent destinations use full screens; a tray emerges from the component that triggered it.
  **Why** Height change makes progress legible; context is preserved because the tray overlays rather than replaces.
  **Applies to** mobile sheets and multi-step dialogs. **Check** heights of consecutive steps differ by > 8px [engine note: threshold]; exactly one primary button per step. **Source** https://benji.org/family-values (verified)
- **RULE** Avoid static transitions between views: tab switches move directionally (tap a tab to the left, content moves left; right, right), "we fly instead of teleport". Every transition must be justified by a known navigation relationship; treat the app as having unbreakable physical rules.
  **Why** Orientation: users know where they came from and where they are going.
  **Applies to** mobile app UI, onboarding. **Check** tab/page change has a direction that matches index delta; `visual`. **Source** https://benji.org/family-values (verified; see section 5 for the frequency conflict)
- **RULE** Morph text that changes meaning in place (Continue -> Confirm, counters on a button) by animating only the differing letters and keeping shared letters ("Con") still; apply to labels that mark a significant step.
  **Why** An instant label swap hides that the user is about to confirm something serious.
  **Applies to** primary action buttons in multi-step flows, financial actions. **Check** CTA label changes use a keyed text transition; no hard swap on the confirm step; `visual`. **Source** https://benji.org/family-values (verified)
- **RULE** Do not duplicate a component that persists across a transition; move or morph the existing one, and keep unchanged parts of text (empty states) constant while only the changed part updates.
  **Why** Duplication on screen is jarring; continuity signals the same object.
  **Applies to** shared-element transitions, card flows. **Check** same `layoutId`/`view-transition-name` across views for persistent components. **Source** https://benji.org/family-values (verified)
- **RULE** Show consequences with motion: grouped items visibly organise into place, price chart scrubbing flips the arrow direction with the numbers, a spinner moves into the nav to show where the pending item lives, and an amount carries visually from entry to confirm.
  **Why** Money is on the line; users need to see that what they entered is what is being sent.
  **Applies to** fintech flows. **Check** `visual`: each irreversible step shows continuity between input and confirmation. **Source** https://benji.org/family-values (verified)
- **RULE** Distribute delight inversely to frequency: add small details to frequent flows (sliding thousand-separator commas, an overflow easter egg) and larger moments to rare ones (first wallet creation, backup confetti, QR code ripple); apply the same level of polish to every screen.
  **Why** Specialness decays with repetition; neglected corners lower perceived quality.
  **Applies to** product UI. **Check** inventory of rare screens (settings, empty, error, success) each has custom copy and a styled state, not a default. **Source** https://benji.org/family-values (verified)
- **RULE** Add sound where it confirms a state change (trash action, arrival), designed with the interaction's timing rather than after the fact.
  **Why** Honk and Family composed audio to match each interaction's timing.
  **Applies to** consumer apps (optional). **Check** `visual`/audio review; respects mute/OS settings [engine note]. **Source** https://benji.org/family-values ; https://benji.org/honkish (verified)
- **RULE** Express presence and urgency with the component itself: avatar border fills on arrival, dashed outline for partial attention, notification border that visibly counts down its remaining life, colour-coded trays (red for destructive).
  **Why** Status is felt without text.
  **Applies to** real-time or collaborative products. **Check** `visual`. **Source** https://benji.org/honkish (verified)
- **RULE** Place shared reactions with relative coordinates (e.g. 10% X, 20% Y) so they land on the same content across screen sizes.
  **Why** Absolute pixels drift between devices.
  **Applies to** collaborative overlays, annotation. **Check** stored coordinates are 0-1 or percentages. **Source** https://benji.org/honkish (verified)
- **RULE** Insert deliberate friction where accountability matters (sign your name on screen before chatting with strangers) and use slower anticipation moments for discovery (slot machine, star field).
  **Why** The pause reduced bad behaviour; contrast makes immediacy elsewhere feel faster.
  **Applies to** social, risky actions. **Check** `visual`. **Source** https://benji.org/honkish (verified)

### 2.2 Benji: components and agent workflow

- **RULE** Live data components: interpolate between updates so sparse data looks smooth (target 60fps); update high-frequency numbers by direct DOM writes, not React state; when direction changes, fade out the old momentum arrow fully before fading in the new one; show a breathing flat line while loading that morphs into the chart; support paused state that catches up on resume; derive the full palette (line, fill, glow, badge, grid labels) from one colour via HSL.
  **Why** Smoothness and legibility under streaming data.
  **Applies to** dashboards, live charts. **Check** no `setState` per tick for value overlay; loading state exists; palette generated from a single input. **Source** https://benji.org/liveline (verified)
- **RULE** Make defaults the shipped version: opinionated, feel right with zero tuning; options exist only to switch things off or move them.
  **Why** The ideal component needs two lines and no configuration to look finished.
  **Applies to** component libraries. **Check** component renders acceptably with default props only. **Source** https://benji.org/drawesome ; https://benji.org/liveline (verified)
- **RULE** A toolbar changes shape rather than swapping panels: colour pick turns the pen row into a palette, size controls become two sliders, minimise rolls into a disc that keeps the current tool; on screens under 680px stand the bar vertically on the left edge and trim tools. Tools behave like what they are named after (pens thin with speed, fountain pen by direction); Shift locks strokes to 8 directions.
  **Why** Shape-morphing keeps spatial orientation; skeuomorphic objects beat icon rows.
  **Applies to** floating toolbars, creative tools. **Check** `visual`; narrow breakpoint 680px for toolbar reflow. **Source** https://benji.org/drawesome (verified)
- **RULE** Give agents visual feedback by pointing, not describing: attach selector/class/text, bounding box and optionally computed styles; offer four detail levels (compact: selector + note; standard: + position and selected text; detailed: + bounding boxes and nearby context; forensic: everything including computed styles) and let the agent design the format; support pausing CSS animations to annotate a transient state.
  **Why** "Make the avatar smaller" is ambiguous; `img.sid-avatar` is not. Precision decays from observation to description.
  **Applies to** the engine's critique-to-fix loop. **Check** every critique item names a selector and a measured value, not an adjective. **Source** https://benji.org/agentation ; https://benji.org/annotating (verified)
- **RULE** For morphing icons constrain to a shared structure (every icon = exactly three lines; unused lines collapse to an invisible point at the centre, e.g. `{x1:7,y1:7,x2:7,y2:7}` with opacity 0); icons that are the same shape at different angles live in a rotation group and rotate (arrows and chevrons 90 degrees apart, plus and cross 45 degrees apart) instead of interpolating coordinates.
  **Why** Coordinate morphing bends rotated shapes; rotation looks natural.
  **Applies to** icon buttons that change state (menu to close, play to pause). **Check** icon swaps use shape morph or rotation, not a crossfade (`AnimatePresence` of two SVGs flagged); `visual`. **Source** https://benji.org/morphing-icons-with-claude (verified)
- **RULE** Never rely on the agent's own sense of "looks right": have it expose a sequencer or test harness, review the transitions yourself, and describe each wrong one with the reason.
  **Why** The model "optimised for working rather than feeling right"; after the reason is given it improves.
  **Applies to** engine's animate step. **Check** ledger contains human or measured verdict per animation. **Source** https://benji.org/morphing-icons-with-claude (verified)

### 2.3 Brian Lovin: quality, safeguards, agents

- **RULE** Check quality along two axes: attention (contrast in varied light, 60fps, colour semantics consistent, objects consistent, accessible labels, appropriate haptics) and intention (motion/icons/colour serve orientation, communication or a goal; shadow exists to show depth or affordance; know when to stop adding features).
  **Why** Quality is noticed by its absence; intent distinguishes polish from decoration.
  **Applies to** all. **Check** review checklist: each effect (shadow, animation, colour) has a stated function. **Source** https://brianlovin.com/writing/quality-software-YA7uK4E (verified)
- **RULE** Be fast and honest about speed: cache data, first paint feels instant, interactions respond in milliseconds, make optimistic guesses to prefetch/pre-render, and show status when slowness is unavoidable.
  **Why** Respecting attention.
  **Applies to** SaaS app UI. **Check** LCP/INP budgets; loading states present on every async view. **Source** https://brianlovin.com/writing/quality-software-YA7uK4E (verified)
- **RULE** Be forgiving: destructive actions are presented clearly and are undoable; errors are never dead ends and use plain language; invalid inputs are highlighted; failed requests are retried; changes queue locally on network loss; avoid indistinguishable colour pairs or offer an override; minimise personal data.
  **Why** Humans are messy and distractible.
  **Applies to** forms, apps. **Check** every delete has undo or confirm; error text contains a next step; invalid field has visible state. **Source** https://brianlovin.com/writing/quality-software-YA7uK4E (verified)
- **RULE** Protect drafts: warn on losing unsaved changes, autosave in the background (docked composer, restored comment box after refresh), or make drafts a first-class object.
  **Why** Losing typed content is a horrible feeling.
  **Applies to** composers, forms, editors. **Check** reload during typing restores the field; leaving with dirty state prompts. **Source** https://brianlovin.com/writing/design-to-save-people-from-themselves-SVZYQV4 (verified)
- **RULE** Destructive actions: red, require confirmation, and put the destructive confirm away from the thumb (iOS action sheets list it at the top); for the highest stakes require typing the name of the thing (GitHub repo deletion). Prefer Undo for reversible changes (archive, swipe) and a delayed send ("magic undo", Gmail) over a confirm dialog.
  **Why** Confirmation fatigue vs real protection; undo is cheaper than asking.
  **Applies to** all. **Check** destructive buttons use destructive colour token; high-stakes flows require typed confirmation. **Source** https://brianlovin.com/writing/design-to-save-people-from-themselves-SVZYQV4 (verified)
- **RULE** Minimum tap targets 44pt (Apple) / 48 (Google); "minimum" means going bigger is fine and good when no competing element is adjacent.
  **Why** Touch accuracy.
  **Applies to** mobile. **Check** `getBoundingClientRect` of interactive elements >= 44x44 on touch layouts. **Source** https://brianlovin.com/writing/design-to-save-people-from-themselves-SVZYQV4 (verified)
- **RULE** Prefer sensible defaults over decisions; repeat an entry point in context when users need it there (notification preferences link on the Notifications screen), accepting the DRY violation in the UI; scan content for omissions (missing attachment) and warn before sending.
  **Why** Convention over configuration reduces mistakes; discoverability beats purity.
  **Applies to** settings, composers. **Check** `visual`/flow review. **Source** https://brianlovin.com/writing/design-to-save-people-from-themselves-SVZYQV4 (verified)
- **RULE** Give coding agents a measurement tool before asking for improvement: phases of instrument (benchmark harness, baseline numbers), diagnose (top 3-5 bottlenecks with hypotheses), iterate (one change at a time, re-measure, commit each success), report (before/after HTML).
  **Why** A "run faster" request with no stopwatch has no feedback; the human becomes the slow, unreliable loop.
  **Applies to** engine process. **Check** every optimisation task starts with a recorded baseline in `reports/`. **Source** https://brianlovin.com/writing/give-your-agent-a-laboratory-jH5ryjC ; .../give-your-agent-a-stopwatch-zNa2M3o (verified)
- **RULE** Design-to-code refinement loop: pull the design source, build a first pass (expect it to be wrong), screenshot via browser tooling and inspect properties, list every difference (spacing, colour, typography, radius, shadows, borders, alignment, responsive behaviour), fix one by one verifying in the browser, and stop only when no differences are found; ask rather than guess on ambiguity.
  **Why** The gap between "close enough" and "correct" is where polish lives.
  **Applies to** engine render-measure loop. **Check** the loop produces an enumerated diff list per iteration. **Source** https://brianlovin.com/writing/give-your-agent-a-laboratory-jH5ryjC (verified)
- **RULE** Screen candidates for design-engineering by a small task (a multi-select dropdown): strong candidates think about reordering selected items, keyboard navigation and shortcuts without being asked; build a team culture of naming why something is wrong (janky animation, dropped frame, misaligned element, wrong colour).
  **Why** Intuition for "good" and "correct" is built by repeatedly describing defects.
  **Applies to** process, critique rubric. **Check** critique prompts require a reason per defect. **Source** https://brianlovin.com/writing/hiring-design-minded-frontend-engineers-61rbXSV (verified)
- **RULE** Ask for blunt feedback from people with relevant expertise and good taste, after you have exhausted your own ability, and praise with the same candour.
  **Why** Early feedback is co-design; flattery blocks growth.
  **Applies to** critique process. **Check** n/a. **Source** https://brianlovin.com/writing/true-respect-is-the-difference-z6xPQaA (verified, opinion)

### 2.4 Brian Lovin: App Dissection patterns

Each is an observation from a teardown, written as a rule. Treat as opinion unless noted. Source pages are https://brianlovin.com/app-dissection/<slug>.

- **RULE** Use tinted shadows rather than pure black (Stripe uses semi-transparent blue on a blue theme); 1px depth lines separate stacked cards.
  **Why** Brand-coloured depth reads more refined than default black.
  **Applies to** SaaS app UI. **Check** `box-shadow` colour has hue matching theme; alpha <= 0.25 [engine note]. **Source** .../app-dissection/stripe-dashboard-ios (verified, opinion)
- **RULE** Navigate with layers that stack and swipe off (cards as views) when you want a sense of "never leaving the dashboard"; give sign-out its own graceful transition (settings card slides left, login appears).
  **Why** Hierarchy shown by stack; rare screens get the same care.
  **Applies to** mobile apps. **Check** `visual`. **Source** .../app-dissection/stripe-dashboard-ios (verified, opinion)
- **RULE** Tie choreography to input where possible (Carousel's photos fall into alignment according to scroll speed, not a timer); lead the user with motion toward the intended action (Foursquare logging in).
  **Why** Tracking input proves the system is responsive.
  **Applies to** onboarding, hero scroll. **Check** scroll-linked progress rather than time-based for onboarding sequences. **Source** .../app-dissection/carousel-ios ; foursquare-ios (verified, opinion)
- **RULE** Undoing should feel instant rather than a reversed animation: Inbox lets removed rows slide away on done, but undo snaps the restored items back so the user sees the mistake corrected at once (author's reading, hedged).
  **Why** Speed to remedy matters more than symmetry; reversal can make users wonder if undo completed.
  **Applies to** list actions with undo. **Check** `visual` (undo transition <= 100ms). **Source** .../app-dissection/inbox-ios (verified; author unsure)
- **RULE** Apply the same micro-interaction to every control of the same kind (Instagram's follow/like buttons bounce and scale identically everywhere); rare screens (about page, settings, empty groups) get a detail too; pairing meaning with colour keeps location legible (Inbox: green done, yellow snoozed, blue inbox).
  **Why** Consistency teaches the pattern; colour as navigation.
  **Applies to** all. **Check** all `button` of a variant share the same `:active` transform and transition; colour semantics map documented. **Source** .../app-dissection/instagram-ios ; inbox-ios ; neubible-ios (verified, opinion)
- **RULE** Open to the content the user came for (NeuBible launches into the text), remember position, and let reading settings return the user to where they were; teach by doing (Quartz has users perform the gestures); prime permission prompts with an explainer before the OS dialog (Carousel/Dropbox).
  **Why** Time-to-value and trust.
  **Applies to** onboarding, reading apps. **Check** time from launch to primary content; permission explainer precedes OS prompt. **Source** .../app-dissection/neubible-ios ; quartz-ios ; carousel-ios (verified, opinion)
- **RULE** Contextual copy: change search placeholder with the active filter; unliking can use a distinct icon (broken heart) so the reverse action has its own personality.
  **Why** Small contextual cues are free polish.
  **Applies to** search, toggles. **Check** `placeholder` varies with filter state. **Source** .../app-dissection/flickr-ios ; pinterest-ios (verified, opinion)

### 2.5 Paco Coursey: CSS and craft tricks

- **RULE** Disable all transitions for the frame in which the theme changes: inject `* { transition: none !important }`, toggle the theme, force style recalc by reading `getComputedStyle(styleEl).opacity`, then remove the style. `requestAnimationFrame` is not reliable here.
  **Why** Transitioning every element to new theme values hurts performance and cannot animate images/icons anyway.
  **Applies to** any theme switch. **Check** toggle code path contains the injected style and a forced reflow; or `next-themes` with `disableTransitionOnChange`. **Source** https://paco.me/writing/disable-theme-transitions (verified)
- **RULE** Custom link underline: `background-image: linear-gradient(c,c); background-size: 100% 1px; background-position: left bottom; background-repeat: no-repeat`; offset with `left 1.05em`; weight via height (e.g. `0.25em`); hide the line behind descenders with `text-shadow: 0.1em 0 var(--background), -0.1em 0 var(--background)` and reset `text-shadow: none` in `::selection`; dashed via `repeating-linear-gradient` with `background-size: 1ch 1px`.
  **Why** `text-decoration` offers insufficient control; works across wrapped lines.
  **Applies to** editorial links. **Check** `visual`. **Source** https://paco.me/writing/custom-text-underlines (verified)
- **RULE** Inputs with a prefix that should react to input focus: place the prefix after the input in the DOM and visually reorder with flex `order`, then use `input:focus + .prefix` (or `:focus-within` now).
  **Why** CSS has no previous-sibling selector.
  **Applies to** compound inputs. **Check** n/a (implementation hint). **Source** https://paco.me/writing/css-previous-sibling-selector (verified)
- **RULE** Segmented tabs with a moving, colour-inverting highlight use two stacked lists and animate `clip-path` with the Web Animations API; mark the duplicate `aria-hidden`.
  **Why** No `mix-blend-mode` hacks, any colours work.
  **Applies to** tab bars. **Check** duplicate list `aria-hidden="true"`. **Source** https://paco.me/craft/tabs (verified)
- **RULE** Nested menu items that expand in place (iOS 16 style) reveal with `clip-path`, counter-scale the child with `transform: calc(1 / var(--transform))`, and tint the backdrop gray so text and background dim at different rates.
  **Why** In-place expansion is ergonomic and keeps context.
  **Applies to** dropdown menus. **Check** `visual`; known bugs: border flicker, Safari subpixel jitter animating `font-variation-settings`, Firefox needs `:has`. **Source** https://paco.me/craft/ios-menu (verified)
- **RULE** Be aware that `filter: blur()` bleeds light at element edges, `backdrop-filter` on a pseudo-element breaks `border-radius`, and an SVG filter fix (`feGaussianBlur` + `feComponentTransfer` + `feFuncA`) introduces banding; animating `stdDeviation` with SMIL `<animate>` works while Chrome has issues animating `backdrop-filter`.
  **Why** Blur entrances/exits are trending; each approach has a trade-off.
  **Applies to** blur reveal animations. **Check** test on Chrome and Safari before shipping blur transitions; prefer small blur radii. **Source** https://paco.me/craft/blur (verified)
- **RULE** Reveal sidebars with `transform: translateX` plus negative `margin-right` so inner content is not skewed; accept it is not purely GPU-accelerated (Linear uses it).
  **Why** Content shifting layout cannot be done with compositor-only properties.
  **Applies to** app sidebars. **Check** `visual`; INP test on mid-range device. **Source** https://paco.me/craft/windows (verified)
- **RULE** Drag affordances on dense timelines appear only when hovering the edges after a short delay (pseudo-elements with `animation-delay`).
  **Why** Keeps the dense view clean.
  **Applies to** timeline UIs. **Check** `visual`. **Source** https://paco.me/craft/timeline (verified)
- **RULE** Safari dark mode shows a white favicon background when the favicon lacks contrast; brighten the primary colour (Linear: `#6E79D6` -> `#8299FF` fixed it), reduce white space or add a border; flush the Favicon Cache to test.
  **Why** Safari aggressively adjusts low-contrast icons.
  **Applies to** all sites. **Check** favicon primary colour luminance high enough against `#000` and `#282828`. **Source** https://paco.me/writing/safari-favicon-showing-white-background (verified; exact threshold unknown)
- **RULE** Use `rem` for type so the user's browser font-size setting is honoured; note browser scaling and zooming are different; a hard-coded `html { font-size }` or `px` opts out; measure the user's default with `font-size: medium` (16px typical, 24px at "Very Large").
  **Why** Almost no sites respect browser font scaling; scaling only main content (as cnn.com did) is a compromise.
  **Applies to** all. **Check** `html` has no `px` font-size; body text sizes in `rem`/`em`. **Source** https://paco.me/writing/px-vs-rem ; https://paco.me/writing/browser-default-font-size (verified; "no reason to use rem when scaling is ignored" is his note)
- **RULE** Command palette quality bar: render hundreds of items at reasonable performance (original test set 249 items, goal 2,000); keyboard-first with compound components.
  **Why** The component is used constantly; jank is felt every time.
  **Applies to** command menus. **Check** open with 2,000 items < 100ms [engine note: threshold]. **Source** https://paco.me/craft/command (verified)
- **RULE** Custom video controls need YouTube-style shortcuts: Space/K play-pause, 1-9 seek to 10-90%, Left/Right/J/L jump, `.` and `,` frame step, plus fullscreen.
  **Why** Power-user parity with native players.
  **Applies to** media UIs. **Check** key handlers present. **Source** https://paco.me/craft/video (verified)
- **RULE** Keep personal/product sites simple: prefer performance, simplicity and craft over adding animations and features; static documents can ship with JavaScript disabled.
  **Why** Maintainability; "my previous site felt disingenuous and abandoned".
  **Applies to** portfolios, marketing sites. **Check** page renders with JS disabled. **Source** https://paco.me/writing/redesign-2021 (verified, opinion)
- **RULE** Re-render only for state keys a component actually reads (hook-getter via Proxy, SWR style).
  **Why** Fewer renders in shared state.
  **Applies to** React state libraries. **Check** profiler: components reading only `name` do not render when `username` changes. **Source** https://paco.me/writing/hook-getter (verified)
- **RULE** In Electron mac windows position the traffic lights at `{ x: 19, y: 18 }` for a native feel.
  **Why** Native alignment.
  **Applies to** Electron apps. **Check** `trafficLightPosition` set. **Source** https://paco.me/craft/windows (verified)

### 2.6 Reference sets

- **RULE** Seed `examples/` and teardown candidates from Lovin's /sites list (about 290 links) and the 22 App Dissection posts; treat them as inspiration targets, not rules, and record why each is good before copying anything.
  **Why** Taste calibrates against respected work and needs the reason (Emil).
  **Applies to** engine research. **Check** each example entry has a "why" line. **Source** https://brianlovin.com/sites ; https://brianlovin.com/app-dissection (verified list)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Toolbar vertical breakpoint | under 680px | benji.org/drawesome |
| Rotation increments | arrows/chevrons 90deg; plus/cross 45deg | morphing-icons |
| Icon structure | exactly 3 lines; collapsed line = point at centre, opacity 0 | morphing-icons |
| Icon set size | 21 icons, any to any | morphing-icons |
| Agentation detail levels | 4 (compact, standard, detailed, forensic) | agentation |
| Live chart | 60fps; value overlay via direct DOM | liveline |
| Reaction coordinates | relative, e.g. 10% X / 20% Y | honkish |
| Tap target | 44pt Apple, 48 Google (minimum) | design-to-save-people |
| Lovin Crit pricing | not UI relevant | n/a |
| Underline | 1px; position 1.05em; weight 0.25em; descender shadow +-0.1em; dash 1ch | paco custom-text-underlines |
| Default browser font | 16px; Very Large = 24px; allowed scale 9-72px | paco px-vs-rem |
| Linear favicon fix | #6E79D6 -> #8299FF | paco |
| Command palette test | 249 items original, 2,000 goal | paco craft/command |
| Electron traffic lights | x 19, y 18 | paco craft/windows |
| Honk typing split | two simultaneous typers split screen 50/50 | honkish |
| Agent iteration cadence | commit after each successful change | lovin laboratory |
| Audio lab result (example of method) | 47% cost cut at 1.75x playback | lovin laboratory pt II |

## 4. Dos and Don'ts

| Do | Don't |
|---|---|
| Continue morphs into Confirm, shared "Con" stays still | Instant label swap on the confirming step |
| Tab switch moves in the direction of the tab | Teleporting content between tabs |
| Persistent wallet card slides between screens | Duplicate card fades in on the next screen |
| Each rare screen has a designed state | Default empty state with dirty-bathroom polish gap |
| Annotated feedback with selector and value | "The sidebar looks off" |
| One theme toggle with transitions disabled for a frame | Animating every element during dark-mode switch |
| Hang-free custom underline that clears descenders | Underline that cuts through descenders |
| Arrow-right to arrow-down by rotating 90deg | Interpolating coordinates, bending the arrow |
| Delete with undo or typed confirmation for high stakes | Confirm dialog on every action |

## 5. Exceptions & judgement calls

- **Benji "avoid static transitions" vs Emil/Rauno frequency rule.** Family animates nearly every transition because it is a mobile wallet where each screen visit is infrequent and orientation matters; Emil/Rauno remove motion for keyboard-driven, high-frequency desktop actions. Resolution [engine note]: use continuity motion for navigation between distinct views on touch (<= 300ms, interruptible, directional), and none for keyboard shortcuts, list highlights and repeated actions. Benji's Delight-Impact Curve is the same frequency variable.
- **Benji does not give durations**, so "fluid" cannot be linted by numbers; checks are structural (shared element ids, direction logic, morphing text), not timing.
- **Paco blur vs Emil blur trick.** Emil adds 2px blur to hide crossfade; Paco documents edge-bleed, radius and banding problems. Use only on small elements and verify on Chrome + Safari.
- **rem vs px (Paco).** He notes there is no accessibility reason for `rem` when a site ignores browser scaling. That is true only if nothing else scales; WCAG 1.4.4 and user zoom still favour relative units for type. Recommend: type in `rem`, borders/hairlines in `px`. [engine note]
- **Lovin's "undo should snap"** is his interpretation of Inbox ("I'm likely overthinking this"); treat as hypothesis, test with users.
- **Tap targets:** 44pt/48dp (Lovin) vs WCAG 2.5.8 minimum 24 CSS px vs 2.5.5 AAA 44px. Use 44px for primary touch targets.
- **Honk/Family are consumer products with a strong playful brand;** do not transplant delight density to B2B dashboards.
- **Lovin 2020-2022 posts predate current tooling;** his agent posts (2026) are the useful ones for the engine.

## 6. Figures worth keeping

Family tray sequence and Continue->Confirm morph; wallet card travelling between screens; QR sequin easter egg; Honk presence animations (avatar border fill, dashed outline); Agentation four output modes; three-line morphing icon sequencer (21 icons); Liveline loading breathing line -> chart; Drawesome toolbar shape-shifts; Stripe Dashboard card stack and sign-out transition; Inbox undo vs done; Paper (Facebook) bounce/fold set; Path pull-to-refresh and clock; Pinterest unlike broken heart; Paco exclusion tabs, iOS menu, blur experiments.

## 7. Open questions

- Benji's Family videos show timing but the page text has none; durations unknown (need frame-by-frame capture to get numbers).
- Shorts, Skype, SoundCloud, Sunrise, Square Order, Tumblr, Twitter dissections were skimmed only by their section titles; no rule extracted.
- Lovin's sites list has per-item "likes" counters whose meaning is unclear; ignored.
- Paco's /notes style micro-posts "Thoughtless", "Good Writers", "On Gaming", "Write it down" contain no UI rules.

## 8. Taste method

How these three turn feel into checkable rules:

- **Benji: principles with mechanisms, then ablation.** Start from three values (simplicity, fluidity, delight); each gets a concrete system (tray rules, "avoid static transitions", shared-letter text morph, delight-impact curve). To prove the value he removed fluidity from selected interactions (not merged) and shows with/without pairs ("digital whiplash"). Rule of thumb he uses: if the user cannot tell where they came from or what happened to their input, add continuity. Also: consistent polish everywhere is a precondition for delight.
- **Brian Lovin: teardown with captions and axes.** App Dissection: record each interaction as video, one heading per moment, say what works and what feels off ("light bouncing", "line height too loose", "gradients overlap"), and keep noticing imperfection because "we notice quality by the presence of imperfections". Quality axes (attention x intention, users x developers) give a review frame; hiring exercise and "name why it is wrong" culture build the vocabulary. For agents: make the loop measurable (stopwatch, laboratory) and force an enumerated diff list.
- **Paco: implement, document the bugs, minimal prose.** Each craft page names the trick (clip-path tabs, counter-transform) and honestly lists known bugs; a technique becomes a rule only once it works across browsers.
- **Shared habit:** credit the people you learned from (Emil, Rauno, Paco, Glenn cross-reference each other), and always state the reason in one sentence, which is what lets the engine store a Why.

## 9. Craft details catalogue

| Name | What | How |
|---|---|---|
| Tray height differentiation | Sequential trays differ in height | set explicit height per step; animate height |
| Directional tab transition | Content flies toward the tapped tab | direction = sign(newIndex - oldIndex) |
| Chevron morph | Chevron changes form between screens | rotate/morph line pair |
| Shared-letter text morph | Only changed letters animate | diff old/new string, keep common prefix/suffix |
| Persistent card travel | Same card moves between screens | shared layout id / view-transition-name |
| Sliding commas | Thousand separators shift as digits are typed | animate position of separators on input |
| Overflow easter egg | Amount above balance triggers a playful response | validation hook |
| QR ripple/sequin | Tap ripples; swipe reveals sequin dots | pointer-driven dot transforms |
| Tumbling trash | Items drop into a skeuomorphic bin with sound | physics-ish keyframes + audio |
| Stealth shimmer | Concealed values shimmer while updating | subtle gradient sweep |
| Chart scrub arrow flip | Arrow direction follows scrubbed delta | derived state |
| Presence border fill | Avatar ring fills on friend arrival | stroke-dashoffset animation + sound |
| Wave goodbye | Contextual emoji burst on exit | skin tone from profile |
| Countdown border | Notification border shrinks to show remaining time | animated border/conic mask |
| Slot-machine search | Discovery animates like a slot machine | vertical reel easing |
| Signature gate | Sign name before stranger chat | friction by design |
| Emoji physics | Emoji collide on screen | tiny physics engine |
| Magic words | Typed words trigger in-place emoji bursts | text match + positioned animation |
| Annotation markers | Numbered markers on elements | store selector + offset |
| Animation freeze | Pause CSS animations for annotation | `animation-play-state: paused` globally |
| Output modes | Compact/standard/detailed/forensic | choose detail by problem type |
| Momentum arrows | Live dot with direction arrows fading sequentially | out-then-in fade |
| Breathing loading line | Flat line pulses until data arrives, then morphs | interpolate to data |
| Candlestick morph | Line and candle views morph | shared data interpolation |
| Orderbook stream | Labels spawn, drift up, fade; speed follows churn | velocity from momentum |
| Shape-shifting toolbar | Bar becomes palette, sliders, or disc | layout morph with shared children |
| Pen behaviours | Width follows speed or direction | stroke model per tool |
| Rotation-group icons | Same-shape icons rotate | group id + angle |
| Rage shake | Shake triggers undo or bug report | motion sensor (iOS undo) |
| Clipboard-access toast | OS tells user when an app reads clipboard | trust affordance |
| Stripe ink on iOS | Material ripple outside Material | radial gradient scale from touch point |
| Custom pull-to-refresh | Brand moment in refresh gesture (Flickr, Path, Pinterest) | drag-progress driven animation |
| Time-of-day illustration | Illustration reflects hour (Google Now) | time-keyed asset |
| Bookmark flies to tab | Saved item moves to where it lives (Foursquare) | animate to tab icon position |
| Gradient underline | Controllable underline | see Paco rule |
| Flex-order previous sibling | Style prefix on input focus | DOM order vs `order` |
| Forced-reflow theme toggle | Transition-free theme change | injected style + `getComputedStyle` |
| Edge-hover drag handles | Handles appear after short hover delay | pseudo-element + `animation-delay` |
| Traffic-light inset | Native macOS feel in Electron | `trafficLightPosition` |
