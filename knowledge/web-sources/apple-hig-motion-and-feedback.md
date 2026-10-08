---
source: web:https://developer.apple.com/design/human-interface-guidelines/motion (also feedback, loading, progress-indicators, launching, playing-haptics, gestures, drag-and-drop, undo-and-redo, sf-symbols, accessibility; fetched 2026-10-08)
chapter: Apple HIG - Motion, feedback, loading, progress, gestures, haptics
pages: n/a (web source)
topic_tags: [motion, animation, reduced-motion, feedback, loading, progress, haptics, gestures, drag-and-drop, undo, launch, apple-hig]
status: studied
---

# Apple HIG - Motion and Feedback

Raw text: `corpus/web/apple-hig/{motion,feedback,loading,progress-indicators,launching,playing-haptics,gestures,drag-and-drop,undo-and-redo,sf-symbols,accessibility,pointing-devices,page-controls}.txt` (private). Written in my own words.

**Supersedes a gap.** `web/motion-and-animation.md` and `web/INDEX.md` record that the Apple HIG motion page was client-rendered and unreadable, with Apple claims taken from mirrors and WWDC18 #803. The JSON feed is readable (fetched 2026-10-08). Result: the page is purely qualitative. It contains NO durations, easing curves, spring parameters or distances. The only numbers across the motion-related pages are: 30-60 fps for games, avoid ~0.2 Hz sustained oscillation (visionOS), a drag image appears after about 3 pt of movement, tips about once per 24 h, ratings prompts no more often than every 1-2 weeks, Time Sensitive = relevant within an hour. Duration/easing tokens for the engine must keep coming from the other sources already in `motion-and-animation.md`.

## 1. Core ideas
1. Motion has to earn its place: purposeful, supporting, never gratuitous, because excess animation distracts and can make people physically uncomfortable.
2. Motion is optional: it must not be the only carrier of important information; add haptics, sound, text or static state.
3. Feedback motion should be realistic and follow the gesture: if a view slides in from the top, it leaves back toward the top, not sideways.
4. Short and precise beats prominent: brief feedback animations carry information without taking attention from the task.
5. Skip motion for high-frequency interactions on custom elements; people should not pay a time cost every time.
6. Never make people wait for an animation to finish before they can act; let them cancel/interrupt.
7. Feedback must be proportional: passive status is displayed quietly and checked on demand; a data-loss warning interrupts.
8. Warn for unexpected irreversible loss, not for expected deletion; confirm completion only for significant tasks (people assume success, so they only need to hear failure).
9. Progress should be honest and moving: determinate when possible, even pacing, never stationary, switch from indeterminate to determinate when you learn the duration, never switch from spinner to bar.
10. The best loading is the one that finishes before anyone notices; otherwise show something immediately and let people do other things.
11. Launch instantly and restore previous state; a launch screen is not a branding moment.
12. Reduce Motion means fewer automatic/repetitive animations and no travel; replace slides with fades, tighten springs, track gestures directly, avoid animating depth or blur.

## 2. Rules

- **RULE [AH-MO-01]** Add motion only when it supports comprehension (state change, spatial continuity, feedback), never for decoration.
  **Why** gratuitous motion distracts and may cause discomfort. **Applies to** web: all. **Check** every animation maps to one of: state change, feedback, spatial continuity, attention; delete the rest; visual. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-02]** Never use animation as the only way to communicate something important; pair with text, a static state change, sound or haptics.
  **Why** people who disable or cannot perceive motion would miss it. **Applies to** web: errors, success, new content. **Check** disable all animations (`*{animation:none!important;transition:none!important}`) - every state is still legible. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-03]** Make feedback motion physically consistent with the gesture and the entrance: it exits the way it came in, and a drag moves content with the finger.
  **Why** inconsistent paths disorient. **Applies to** web: drawers, sheets, toasts, menus, page transitions. **Check** enter and exit animations use mirrored transforms (same axis, opposite sign); `transform-origin` matches the trigger. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-04]** Keep feedback animations brief and precise.
  **Why** short, tightly-tied feedback conveys the result without making users wait. **Applies to** web: button presses, toggles, success ticks. **Check** feedback transitions <= 200-300 ms `[engine note: Apple gives no ms; use motion-tokens.json]`. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-05]** Do not animate custom UI that users trigger many times per session.
  **Why** repeated motion costs time and attention every time. **Applies to** web: command palettes, list navigation by keyboard, tab switches, filter changes. **Check** no animation on keyboard-driven navigation; frequency audit. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-06]** Never block input while an animation plays; allow cancel and interruption.
  **Why** waiting for animations is the quickest way to make an interface feel slow. **Applies to** web: dialogs, page transitions, toasts. **Check** during transition, click/key events reach the target; no `pointer-events:none` for the whole duration. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-07]** Under reduced-motion, reduce automatic and repeating animation including zoom, scale and peripheral motion; apply the five tactics: tighten springs (less bounce), tie animation directly to the gesture, avoid animating depth in layered z-space, replace x/y/z transitions with fades, avoid animating into and out of blur.
  **Why** Apple's concrete list for people prone to dizziness or seizures. **Applies to** web: `@media (prefers-reduced-motion: reduce)`. **Check** media block replaces `transform`/blur transitions with opacity-only; no infinite loops. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-MO-08]** Avoid fast-moving and blinking animations; honour a "dim flashing lights" preference in video and never flash more than three times per second.
  **Why** can cause dizziness and, in some cases, seizures. **Applies to** web: autoplay video, banners, loaders. **Check** no animation period < 333 ms that alternates high contrast; `prefers-reduced-motion` stops loops. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-MO-09]** Give users control over audio and video playback; no autoplay of audio/video without visible, discoverable play/stop controls, and offer a global opt-out.
  **Why** unexpected media is disruptive for cognitive and attentional needs. **Applies to** web: hero video, embedded media. **Check** `<video autoplay>` is muted, has controls or a pause button; `prefers-reduced-motion` pauses it. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-MO-10]** Minimise time-boxed UI: prefer dismissing views by explicit action rather than auto-dismiss timers.
  **Why** people who need more time or use assistive technology lose the message. **Applies to** web: toasts, banners, inline success messages; see conflict in section 5. **Check** every auto-dismissing element pauses on hover/focus and has a persistent copy (notification list or log) `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/accessibility

- **RULE [AH-MO-11]** Animate symbols/icons only with a purpose that matches the effect: appear/disappear for presence, bounce for "action happened", scale for selection, pulse/breathe for ongoing activity, variable colour for progress, replace for state change, wiggle for a missed call to action, rotate for work in progress, draw for progress or direction.
  **Why** each preset has a distinct meaning; too many overwhelm. **Applies to** web: icon micro-interactions (Lottie/CSS); native for exact SF Symbols effects. **Check** one animated icon per region; each animation has a stated reason. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-MO-12]** Every custom button needs a visible pressed state.
  **Why** without it the button feels dead. **Applies to** web: all custom buttons/cards used as buttons (`:active`). **Check** `:active` computed style differs from default (background, transform or shadow). **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-MO-13]** Respond to gestures immediately and continuously, showing the extent and type of movement needed; show when a gesture or control is unavailable (locked item, disabled button looks different).
  **Why** direct manipulation needs instant feedback; silent failure reads as freeze. **Applies to** web: drag, swipe, pull. **Check** pointermove updates transform within the same frame; disabled state visibly distinct (not just opacity .5 without cursor) `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/gestures

- **RULE [AH-MO-14]** Keep standard gestures meaning standard things (tap = activate, swipe = scroll/reveal/dismiss, drag = move, long-press = more controls, double-tap = zoom, pinch = zoom, rotate = rotate); never repurpose them for unrelated actions.
  **Why** people expect consistent meaning across contexts. **Applies to** web: touch and pointer interactions. **Check** custom gestures list reviewed; each has a button alternative. **Source** https://developer.apple.com/design/human-interface-guidelines/gestures

- **RULE [AH-MO-15]** Add a custom gesture only if it is discoverable, easy to perform, distinct from others, and not the only way to do the task; teach it in context.
  **Why** hidden gestures strand users and assistive technologies. **Applies to** web: swipe-to-delete, long-press. **Check** each gesture action has a visible button or menu item. **Source** https://developer.apple.com/design/human-interface-guidelines/gestures

- **RULE [AH-MO-16]** Match the significance of a message to its delivery: passive status inline or in a status area; warnings of data loss as interrupting dialogs; failures near the action.
  **Why** over-interrupting trains users to ignore alerts. **Applies to** web: all. **Check** modal dialogs only for irreversible-action confirmation or blocking errors; status uses inline/toast. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-17]** Deliver feedback through more than one channel (colour, text, icon, sound, haptics) so it works with muted devices, looking away or screen readers.
  **Why** accessibility and context variety. **Applies to** web: use text + icon + `aria-live`; haptics optional. **Check** success/error messages have text and role=status/alert; colour not sole signal. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-18]** Put status feedback next to the thing it describes (toolbar counter, row badge, field-level message) so people see it without leaving context.
  **Why** unobtrusive but available. **Applies to** web: all. **Check** status text DOM-adjacent (within the same container) to its subject. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-19]** Warn only before unexpected, irreversible data loss; do not warn when loss is the expected result of a deliberate action that can be undone.
  **Why** warnings on routine deletes cause fatigue; undo is better. **Applies to** web: SaaS delete flows; prefer undo toast over confirm for reversible deletes. **Check** destructive actions: either confirm (irreversible) or undo (reversible) - never both. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-20]** Confirm completion only for significant tasks (payment, publish, transfer); skip confirmation noise for routine success.
  **Why** people expect most actions to succeed; confirmation of routine success is clutter. **Applies to** web: all. **Check** count of success toasts per user flow <= 1. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-21]** When a command cannot run, say so and say why in context.
  **Why** silent failure feels broken. **Applies to** web: disabled actions get an explanation (tooltip/helper text). **Check** every disabled control with unmet prerequisite has adjacent explanatory text or `aria-describedby`. **Source** https://developer.apple.com/design/human-interface-guidelines/feedback

- **RULE [AH-MO-22]** Prefer determinate progress (bar with a value) to indeterminate (spinner) whenever the duration or fraction is known; when it becomes known mid-task, switch to determinate.
  **Why** it lets people decide to wait, retry or abandon. **Applies to** web: uploads, exports, imports, multi-step jobs. **Check** `<progress value>` or `role=progressbar aria-valuenow` where size is known. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-23]** Report determinate progress accurately and at an even pace; do not jump to 90% in five seconds then stall for five minutes.
  **Why** uneven progress feels deceptive. **Applies to** web: fake progress bars are a violation. **Check** progress derived from real bytes/steps; monotonic. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-24]** Keep an indicator moving while work continues, and explain a stall with a cause and an action.
  **Why** stationary indicators read as frozen. **Applies to** web: spinners and bars. **Check** spinner animates continuously; timeout state exists after N seconds with retry. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-25]** Do not swap a spinner for a bar (or the reverse) mid-task; the swap changes size and shape.
  **Why** layout and attention disruption. **Applies to** web: loaders. **Check** loader type fixed per operation. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-26]** Add a short, specific description to progress when it helps; avoid vague words like "Loading" or "Authenticating"; show indicators in a consistent location.
  **Why** vague labels add no information; consistent placement is findable. **Applies to** web: long jobs. **Check** progress label not in {Loading, Please wait, Authenticating, Processing}. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-27]** Let people cancel (and, if cancelling loses work, pause) long operations, and warn when cancelling has a negative consequence.
  **Why** control and loss-avoidance. **Applies to** web: uploads, exports, AI generation. **Check** cancel button present on jobs > 5 s `[engine note]`; confirm if progress would be lost. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-28]** Put a spinner inside a button to show a delayed action, and change the label to the in-progress form ("Checkout" becomes "Checking out...").
  **Why** saves space and explains the delay. **Applies to** web: submit buttons. **Check** loading state keeps button width (no layout shift) and sets `aria-busy`. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-MO-29]** Pull-to-refresh is an addition to, not a replacement for, automatic refresh; add a title only if it informs (e.g. last updated).
  **Why** people should not be responsible for every update. **Applies to** web: mobile feeds; native-leaning. **Check** polling or push exists in addition. **Source** https://developer.apple.com/design/human-interface-guidelines/progress-indicators

- **RULE [AH-MO-30]** Show something immediately while content loads (placeholder, skeleton, partial content) instead of a blank screen, and let people do other things while it loads.
  **Why** a blank area reads as a failure. **Applies to** web: all routes. **Check** first meaningful paint contains layout skeleton; no full-page spinner. **Source** https://developer.apple.com/design/human-interface-guidelines/loading

- **RULE [AH-MO-31]** If loading is unavoidably long, show something interesting (tips, hints) sized to the expected wait, and fetch large assets in the background.
  **Why** fills dead time; avoids showing too little or looping. **Applies to** web: heavy apps, AI generation. **Check** visual; lazy-load large assets after first interaction. **Source** https://developer.apple.com/design/human-interface-guidelines/loading

- **RULE [AH-MO-32]** During generative AI waits, show specific progress ("Summarizing key themes from your notes") instead of "Processing...".
  **Why** specific feedback makes waiting purposeful. **Applies to** web: AI features. **Check** string diff against banned vague labels. **Source** https://developer.apple.com/design/human-interface-guidelines/generative-ai

- **RULE [AH-MO-33]** Launch instantly (a couple of seconds at most), restore the previous state (scroll position, windows, selected item), and keep the launch screen almost identical to the first screen: no text, no logo, no advertising.
  **Why** perceived speed; mismatched splash causes a flash. **Applies to** web: PWA/app shell; first paint matches post-hydration layout; no splash page. **Check** LCP < 2.5 s; no layout shift between shell and hydrated UI; last route/scroll restored. **Source** https://developer.apple.com/design/human-interface-guidelines/launching

- **RULE [AH-MO-34]** If you must use a splash, show it briefly at the start of onboarding, not at every launch.
  **Why** splash delays access. **Applies to** web: avoid; if used, session-once. **Check** splash gated by sessionStorage and < 1 s `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/launching

- **RULE [AH-MO-35]** On drag, show a translucent drag image once the pointer moves about 3 px, keep it until drop, show an insertion or highlight only when the target accepts the item, and remove cues when the pointer leaves.
  **Why** clear continuous feedback. **Applies to** web: HTML5 DnD / dnd-kit. **Check** drag-start threshold of 3-4 px (`activationConstraint distance 3`); target highlight toggled on `dragenter/leave`. **Source** https://developer.apple.com/design/human-interface-guidelines/drag-and-drop

- **RULE [AH-MO-36]** On a failed or invalid drop, return the item to its origin or scale it up and fade it out; for slow transfers show a placeholder at the drop position and a progress indicator.
  **Why** tells people the drop did not land and where the content will appear. **Applies to** web: file upload drops, kanban. **Check** visual. **Source** https://developer.apple.com/design/human-interface-guidelines/drag-and-drop

- **RULE [AH-MO-37]** Offer an alternative to every drag-and-drop action (menu command, keyboard move), and make drops undoable.
  **Why** accessibility; accidental drops. **Applies to** web: sortable lists, kanban. **Check** list has move up/down buttons or keyboard reorder (`aria-grabbed` pattern or dnd-kit keyboard sensor); Cmd/Ctrl+Z reverts. **Source** https://developer.apple.com/design/human-interface-guidelines/drag-and-drop

- **RULE [AH-MO-38]** Make undo and redo predictable: label what will be undone ("Undo Typing"), show the result (scroll to the restored item), allow many levels, and offer batch revert; provide dedicated buttons only if necessary, using standard symbols in the toolbar.
  **Why** people press undo repeatedly when nothing visibly changes. **Applies to** web: editors, tables, canvases; destructive actions use undo toast. **Check** undo control has dynamic `aria-label`; stack depth > 1; result scrolled into view. **Source** https://developer.apple.com/design/human-interface-guidelines/undo-and-redo

- **RULE [AH-MO-39]** Do not animate page-control transitions while the user is scrubbing quickly; animate only on discrete taps.
  **Why** lag and flashing. **Applies to** web: carousel dots dragging. **Check** scrub updates position without smooth-scroll animation. **Source** https://developer.apple.com/design/human-interface-guidelines/page-controls

- **RULE [AH-MO-40]** Keep pointer/hover feedback purposeful: highlight (translucent background) for small transparent items, lift (scale + shadow) for small opaque ones, hover (tint/scale/shadow) for large items; scale only if neighbours have room; shadow only together with scale.
  **Why** an unscaled element with a shadow does not appear closer. **Applies to** web: hover states on cards, icon buttons. **Check** hover on rows uses tint only (no scale). **Source** https://developer.apple.com/design/human-interface-guidelines/pointing-devices

- **RULE [AH-MO-41]** Haptics must be consistent (one pattern, one meaning), brief, complementary to visuals and sound, rare, and optional; never the sole signal.
  **Why** overused haptics become tiresome; inconsistent ones confuse. **Applies to** native-only mostly (iOS system haptics); on web `navigator.vibrate` is unsupported in iOS Safari, so rely on visuals. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/playing-haptics

- **RULE [AH-MO-42]** Haptic categories: notification (task outcome), impact (physical metaphor: snap, collide), selection (value changing). Match intensity and sharpness of the haptic to the animation it accompanies.
  **Why** semantic haptic vocabulary. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/playing-haptics

- **RULE [AH-MO-43]** (native-only) Games: sustain 30-60 fps; give graphics-power options. visionOS: avoid motion in the periphery and sustained oscillation near 0.2 Hz, fade-relocate instead of moving, keep a stationary frame of reference, do not rotate the virtual world. watchOS: easing on layout/appearance animations is automatic and cannot be turned off.
  **Why** vestibular comfort and platform behaviour. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/motion

- **RULE [AH-MO-44]** When data in a chart changes, animate to draw attention but also announce the change non-visually (live region) for screen-reader and reduced-motion users.
  **Why** animation alone is invisible to some. **Applies to** web: dashboards. **Check** chart updates trigger `aria-live` text; reduced-motion path swaps instantly. **Source** https://developer.apple.com/design/human-interface-guidelines/charting-data

## 3. Numbers & scales

| Item | Value |
|---|---|
| Game frame rate | 30-60 fps (consistent) |
| visionOS sustained oscillation to avoid | about 0.2 Hz |
| Drag image appears after | about 3 pt of drag |
| Tips display cadence (example) | once every 24 hours |
| Ratings prompt spacing | at least one to two weeks |
| Time Sensitive notification relevance | within about one hour |
| Reduce Motion tactics | 5 (tighter springs, direct gesture tracking, no z-depth animation, fades instead of x/y/z, no blur transitions) |
| Standard gestures | tap, swipe, drag, touch-and-hold, double tap, zoom, rotate |
| iOS extra gestures | three-finger swipe (undo/redo), three-finger pinch (copy/paste), shake (undo/redo), four-finger swipe on iPadOS (switch apps) |
| iOS haptic feedback generator categories | notification, impact, selection |
| macOS trackpad haptic patterns | alignment, level change, generic |
| Durations, easings, springs | not specified |

## 4. Dos and Don'ts
- **Do** replace a slide-and-scale entrance with a short fade when Reduce Motion is on; **Don't** just shorten it.
- **Do** show "Checking out..." with a spinner inside the button; **Don't** swap the whole page for a spinner.
- **Do** put the restored paragraph in view after an undo; **Don't** undo silently off-screen.
- **Do** show an upload progress bar with real percentage; **Don't** run a fake bar to 90% then hang.
- **Do** keep a toast around until it can be reviewed again (or log it); **Don't** use a 2-second auto-dismiss for the only error message.

## 5. Exceptions & judgement calls
- **Blur transitions vs Reduce Motion.** `web/motion-and-animation.md` (Emil's `blur(2px)` crossfade) and `web/motion-a11y-perf-loading.md` (button loading swap with `blur 4px -> 0`) use blur in transitions; Apple lists "avoid animating into and out of blurs" as a Reduce-Motion tactic. Keep blur masks for the default experience; remove them inside `prefers-reduced-motion: reduce`.
- **Auto-dismiss toasts vs time-boxed UI.** `web/courses-and-curricula.md` and Sonner defaults use ~4 s auto-dismiss that pauses on hover; Apple says minimise timed UI and prefer explicit dismissal. Compromise: keep timed toasts for low-importance confirmations; errors and anything with an action stay until dismissed; pause on hover/focus/hidden tab; keep a notification history.
- **Frequency rule agrees.** "Avoid motion on frequent interactions" matches the frequency rule already in `web/motion-and-animation.md`. Apple adds no thresholds.
- **Motion tokens.** Do not source durations from Apple: this page has none. WWDC18 #803 values in `motion-tokens.json` remain the only Apple numeric source.
- **Haptics.** Web haptics are essentially unavailable on iOS Safari (no Vibration API); apply AH-MO-41/42 only to native shells.
- **Confirm vs undo.** Apple says avoid warnings for expected, undoable deletions (Finder trash, Mail delete); this matches the engine's "undo toast over confirm" pattern if present in `web/courses-and-curricula.md` line 268.
- **Spinner vs skeleton.** Apple treats a spinner as the standard indeterminate indicator and also approves placeholder content; the engine prefers skeletons for layout-known content. Both fit "show something at once".

## 6. Figures worth keeping
- None captured as text; the Motion page has no diagrams carrying numbers.

## 7. Open questions
- Whether Apple's `Reduce Motion` list maps to `prefers-reduced-motion: reduce` one-to-one for blur (CSS spec says "motion", blur is borderline; WCAG 2.3.3 errata brought blur in).
- Pages with no extractable rule content: `foundations`, `getting-started` (index pages).
