---
source: web:https://github.com/vercel-labs/web-interface-guidelines
chapter: Vercel Web Interface Guidelines (AGENTS.md + README.md + command.md)
pages: n/a (web source, fetched 2026-10-08)
topic_tags: [interaction, forms, keyboard, focus, touch-targets, animation, layout, content, accessibility, performance, dark-mode, hydration, shadows, contrast, copywriting, lint]
status: studied
---

# Vercel Web Interface Guidelines

Raw text: `corpus/web/vercel-wig/{AGENTS,README,command}.md` (private, gitignored). Licence: MIT (repo `vercel-labs/web-interface-guidelines`). Fetched 2026-10-08 from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/{AGENTS,README,command}.md` (the queued URLs resolved; no search needed). Notes below are my own wording; numbers are exact.

Source shape: `AGENTS.md` is the terse MUST / SHOULD / NEVER version (about 8 KB). `README.md` is the long version with the reasoning, extra items that AGENTS.md omits (loading-state timing, locale-aware shortcuts, `Accept-Language`, Web Workers, font subsetting, Vercel copywriting), and a "Vercel-specific" part that the authors say is brand preference, not universal. `command.md` is the agent review command (not studied for rules). Severity vocabulary used below: MUST = hard, SHOULD = soft.

## 1. Core ideas

1. Quality is the sum of hundreds of small, checkable choices; the list is deliberately non-exhaustive and living.
2. Keyboard and focus come first: everything is operable by keyboard following the WAI-ARIA Authoring Practices patterns, focus is always visible and never covered by sticky UI.
3. Forms must forgive: never block paste or typing, never pre-disable submit, validate after input, put errors next to the field and move focus to the first one.
4. Hit areas are a separate property from the visual size: visual targets below 24 px get an expanded hit area, 44 px is the mobile floor.
5. Motion is opt-in and cheap: only `transform` and `opacity`, never `transition: all`, always interruptible, always reduced-motion aware.
6. State lives in the URL (filters, tabs, pagination, expanded panels) so share, refresh, Back and Forward all work.
7. Every screen has all its states designed (empty, sparse, dense, error) and survives short, average, and very long user content.
8. Perceptual details carry polish: optical alignment within +/-1 px, concentric radii, layered shadows, hue-tinted borders, tabular numerals.
9. Prefer native semantics, then ARIA; names exist even when visuals omit labels.
10. Performance is a design input: mutations under 500 ms, no CLS from images, virtualise past 50 list items, preload only above-the-fold assets.

## 2. Rules

### 2.1 Interactions: keyboard and focus
- **RULE [VWI-01]** Make every flow fully keyboard operable and follow the WAI-ARIA APG pattern for each widget (tabs, menu, dialog, combobox and so on).
  **Why** Keyboard, switch, and screen-reader users depend on the standard key contracts. **Applies to** all. **Check** Tab and arrow through each widget; every control reachable and operable without a pointer; compare keys to the APG pattern page. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Interactions > Keyboard; README "Keyboard works everywhere".
- **RULE [VWI-02]** Every focusable element shows a visible, unobscured focus indicator; use `:focus-visible` (not bare `:focus`) and add `:focus-within` for grouped controls; sticky headers, footers, banners and overlays must never cover the focused element.
  **Why** Visible focus is the keyboard user's cursor; `:focus-visible` avoids distracting pointer users. **Applies to** all. **Check** Tab through the page at 375 and 1440 px; for each stop, computed outline or box-shadow is non-empty, and `document.elementsFromPoint(centre)[0]` is the element or a descendant. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Keyboard; README "Clear focus".
- **RULE [VWI-03]** Manage focus for overlays and dynamic UI: trap focus inside modals, move focus in when something opens, return it to the trigger on close, as the APG pattern prescribes.
  **Why** Without it focus is lost behind the overlay. **Applies to** SaaS app UI | all. **Check** open a dialog, press Tab 20 times, focus stays inside; close, `document.activeElement` is the trigger. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Keyboard; README "Manage focus".
- **RULE [VWI-04]** Never write `outline: none` (or `outline: 0`) unless a visible replacement focus style is present on the same selector.
  **Why** It silently removes the only focus cue. **Applies to** all. **Check** scan stylesheets for `outline: none|0|transparent-only` without a `:focus-visible` rule giving `box-shadow`, `outline`, or `border` change. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Keyboard.

### 2.2 Interactions: targets and input
- **RULE [VWI-05]** Hit target at least 24 px in both axes; on mobile (coarse pointer) at least 44 px. If the visual element is smaller than 24 px, expand the hit area with padding or a pseudo-element rather than enlarging the visual.
  **Why** Small targets cause mis-taps and fail motor-impaired users; hit area and visual size are independent. **Applies to** all | mobile. **Check** `getBoundingClientRect()` (plus pseudo-element hit area) of buttons, links, inputs, icon buttons: width and height >= 24; under `pointer: coarse` emulation >= 44. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Targets & Input; README "Match visual & hit targets".
- **RULE [VWI-06]** On mobile, `<input>`, `<select>` and `<textarea>` font-size must be at least 16 px (alternative the README gives: a viewport meta with `maximum-scale=1`, which conflicts with VWI-07, so prefer the 16 px fix).
  **Why** iOS Safari auto-zooms and pans the page on focus when the font is smaller. **Applies to** forms | mobile. **Check** computed `font-size` of every form control at 375 px viewport >= 16px. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Targets & Input; README "Mobile input size".
- **RULE [VWI-07]** Never disable browser zoom: no `user-scalable=no`, no `maximum-scale=1` in the viewport meta.
  **Why** Low-vision users rely on pinch-zoom (WCAG 1.4.4). **Applies to** all. **Check** `meta[name=viewport]` content does not match `/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Targets & Input; README "Respect zoom".
- **RULE [VWI-08]** Set `touch-action: manipulation` on controls to prevent double-tap zoom delay.
  **Why** Removes the legacy tap-delay ambiguity on touch screens. **Applies to** mobile. **Check** computed `touch-action` on `button, a, [role=button], input` equals `manipulation` (or `auto` with zoom still enabled and no 300 ms delay measured). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Targets & Input.
- **RULE [VWI-09]** Set `-webkit-tap-highlight-color` deliberately so the tap flash matches the design (soft).
  **Why** The default grey flash on iOS/Android clashes with custom surfaces. **Applies to** mobile. **Check** computed `-webkit-tap-highlight-color` on interactive elements is not the UA default on custom-styled controls. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Targets & Input.

### 2.3 Interactions: forms
- **RULE [VWI-10]** Inputs must be hydration-safe: they never lose focus or typed value when the framework hydrates; an input with `value` must have `onChange` (or use `defaultValue`).
  **Why** Typing before hydration is common on slow devices; losing it is data loss. **Applies to** forms. **Check** type into an input immediately after load on a throttled CPU; value and focus remain after hydration; no React "value without onChange" warning in console. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms and > Hydration.
- **RULE [VWI-11]** Never block paste in `<input>` or `<textarea>` (no `onpaste` preventDefault).
  **Why** Blocks password managers, 2FA codes and accessibility tools. **Applies to** forms. **Check** grep for `onpaste` handlers calling `preventDefault`; programmatic paste event is not cancelled. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Don't block paste".
- **RULE [VWI-12]** A loading button shows a spinner and keeps its original label (no label swap to "Loading").
  **Why** Layout and meaning stay stable. **Applies to** forms | SaaS app UI. **Check** while loading, button text node still equals the idle label and width is unchanged. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Loading buttons".
- **RULE [VWI-13]** Enter submits when a text input has focus (if many controls, treat the last control as the submitter); in `<textarea>` Enter inserts a newline and Cmd/Ctrl+Enter submits.
  **Why** Matches platform expectations. **Applies to** forms. **Check** focus the input, press Enter, submit event fires; in textarea Enter does not submit, Ctrl+Enter does. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Enter submits", "Textarea behavior".
- **RULE [VWI-14]** Keep the submit button enabled until the request starts; then disable it, show a spinner, and send an idempotency key.
  **Why** Prevents double submits without hiding validation feedback. **Applies to** forms. **Check** submit button has no `disabled` before first submit on an empty form; `disabled` becomes true only after the request begins. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Submission rule".
- **RULE [VWI-15]** Do not pre-disable submit on an incomplete form; let the user submit so validation surfaces.
  **Why** A dead button gives no hint what is missing. **Applies to** forms. **Check** on a pristine form, `button[type=submit]:disabled` count is 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Don't pre-disable submit".
- **RULE [VWI-16]** Accept free text and validate afterwards; never block keystrokes (for example, do not drop non-digits in a numeric field without explanation).
  **Why** A swallowed keystroke gives no feedback. **Applies to** forms. **Check** type a letter into a numeric field: the character appears and a message explains, or input is accepted and trimmed visibly. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Don't block typing".
- **RULE [VWI-17]** Show errors inline next to their field; on submit, move focus to the first field in error.
  **Why** Proximity ties the message to the control; focus move tells keyboard and screen-reader users where to go. **Applies to** forms. **Check** submit invalid form: `document.activeElement` is the first `[aria-invalid=true]`; each error element is a sibling or `aria-describedby` target within 1 field-gap of its input. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Error placement".
- **RULE [VWI-18]** Give every field a meaningful `name`, an `autocomplete` token, the right `type`, and the right `inputmode`.
  **Why** Enables autofill and the correct on-screen keyboard. **Applies to** forms. **Check** every `input` has non-empty `name`, `autocomplete` (not `off` for identity/address/payment) and `type` consistent with the label (email, tel, url, number, search). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Autocomplete & names", "Correct types & input modes".
- **RULE [VWI-19]** Disable spellcheck on emails, codes, usernames and similar fields (`spellcheck="false"`).
  **Why** Red squiggles on non-prose values are noise. **Applies to** forms. **Check** `input[type=email], input[name*=user], input[name*=code]` have `spellcheck=false`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms.
- **RULE [VWI-20]** Placeholders end with an ellipsis character and show an example value or pattern (for example `+1 (123) 456-7890`, `sk-012345679…`).
  **Why** Signals that the field is empty and shows format. **Applies to** forms. **Check** `placeholder` of text inputs ends with `…` (U+2026) and is not a label substitute. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Placeholders signal emptiness", "Placeholder value".
- **RULE [VWI-21]** Warn before navigation when unsaved changes would be lost.
  **Why** Prevents silent data loss. **Applies to** SaaS app UI | forms. **Check** edit a field then trigger route change or reload; a `beforeunload` or in-app confirm appears. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Unsaved changes".
- **RULE [VWI-22]** Be compatible with password managers and 2FA: allow pasting one-time codes, use `autocomplete="one-time-code"` on OTP fields, and avoid auth-like names (such as `password`) on non-auth fields like Search (use `autocomplete="off"` there).
  **Why** Wrong tokens cause managers to pop up on the wrong fields or fail on the right ones. **Applies to** forms. **Check** OTP input has `autocomplete=one-time-code` and accepts paste; search input has no `name` containing `pass` or `user`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Password managers & 2FA", "Don't trigger password managers for non-auth fields".
- **RULE [VWI-23]** Trim input values before validating, to survive trailing whitespace from text-replacement and expansion input methods.
  **Why** An invisible trailing space produces a baffling error. **Applies to** forms. **Check** submit `"a@b.co "` (trailing space): accepted. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "Text replacements & expansions".
- **RULE [VWI-24]** Checkboxes and radios have no dead zones: the label and the control form one continuous hit target, and clicking a `<label>` focuses or toggles its control; every control has a `<label>` or equivalent association.
  **Why** Gaps between the box and the text make people miss. **Applies to** forms. **Check** `label[for]` or wrapping label exists for each control; hit area of label+control has no gap (`elementFromPoint` at the midpoint between box and text returns label or input). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Forms; README "No dead zones on controls", "Labels everywhere", "Label activation".

### 2.4 State, navigation, feedback
- **RULE [VWI-25]** Persist UI state in the URL (filters, tabs, pagination, expanded panels, anywhere `useState` stands for shareable state), so share, refresh, Back and Forward all work.
  **Why** Deep links and restore. **Applies to** SaaS app UI. **Check** change a filter or tab, reload: same state; copy URL into a new tab: same state. **Source** vercel-labs/web-interface-guidelines AGENTS.md > State & Navigation; README "URL as state", "Deep-link everything".
- **RULE [VWI-26]** Back and Forward restore the previous scroll position.
  **Why** Prevents losing place in long lists. **Applies to** all. **Check** scroll 2000 px, navigate away, go Back: `scrollY` within 50 px of before. **Source** vercel-labs/web-interface-guidelines AGENTS.md > State & Navigation; README "Scroll positions persist".
- **RULE [VWI-27]** Navigation uses `<a href>` or the framework `<Link>`, never `<div onClick>` or `<button>` for navigational links, so Cmd/Ctrl-click, middle-click and context menu work.
  **Why** Preserves browser behaviours and semantics. **Applies to** all. **Check** elements with navigational click handlers and no `href`: count 0; `a:not([href])` count 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > State & Navigation; README "Links are links".
- **RULE [VWI-28]** Use optimistic UI when success is likely: update immediately, reconcile with the server response, and on failure show an error and roll back or offer Undo.
  **Why** Perceived speed. **Applies to** SaaS app UI. **Check** with the network blocked, the action reverts with an error and/or an Undo control. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Feedback; README "Optimistic updates".
- **RULE [VWI-29]** Destructive actions require a confirmation step or provide an Undo window.
  **Why** Irreversible actions need a safety net. **Applies to** SaaS app UI. **Check** trigger each delete or remove control: a confirm dialog or an Undo toast appears before data is gone. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Feedback; README "Confirm destructive actions".
- **RULE [VWI-30]** Announce async updates (toasts, inline validation) through a polite `aria-live` region.
  **Why** Screen-reader users otherwise miss them. **Applies to** all. **Check** toast container or validation message has `aria-live="polite"` or `role=status` (not `assertive` for routine info). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Feedback; README "Announce async updates".
- **RULE [VWI-31]** Menu options that open a follow-up step and loading states end with an ellipsis character ("Rename…", "Loading…", "Saving…", "Generating…").
  **Why** The ellipsis signals more input or work in progress. **Applies to** SaaS app UI. **Check** menu items that open dialogs end with `…` (U+2026); busy labels end with `…`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Feedback; README "Ellipsis for further input & loading states".
- **RULE [VWI-32]** Spinners and skeletons use a show-delay of roughly 150-300 ms and a minimum visible time of roughly 300-500 ms, so fast responses do not flicker (React `Suspense` does this automatically).
  **Why** A 80 ms flash of a spinner reads as a glitch. **Applies to** SaaS app UI. **Check** throttle a mocked request to 100 ms: no spinner appears; to 400 ms: spinner shows for at least 300 ms. **Source** vercel-labs/web-interface-guidelines README > Interactions "Minimum loading-state duration" (not in AGENTS.md).

### 2.5 Touch, drag, autofocus
- **RULE [VWI-33]** Delay the first tooltip in a group; show subsequent peer tooltips instantly.
  **Why** Avoids tooltip spam while scanning, but keeps scanning fast. **Applies to** SaaS app UI. **Check** hover first icon: tooltip appears after a delay (typically 300-700 ms); move to neighbour within 300 ms: appears with 0 delay. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "Tooltip timing". Exact delays not given [unverified].
- **RULE [VWI-34]** Use `overscroll-behavior: contain` inside modals and drawers.
  **Why** Stops scroll chaining to the page behind. **Applies to** all. **Check** computed `overscroll-behavior` of dialog or drawer scroll containers is `contain` or `none`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "Overscroll behavior".
- **RULE [VWI-35]** To suppress desktop rubber-band bounce, set `overscroll-behavior: none` on `<html>` only inside `@media (pointer: fine)`; keep coarse-pointer defaults so mobile pull-to-refresh survives; test hybrid touch devices because `pointer` reports the primary input and `none` also disables scroll chaining and native swipe navigation.
  **Why** Avoids breaking mobile gestures. **Applies to** SaaS app UI. **Check** `html` computed `overscroll-behavior` is `none` only when `matchMedia('(pointer: fine)')`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "Desktop rubber-banding".
- **RULE [VWI-36]** While dragging, disable text selection and set `inert` on the dragged element so hover and selection do not occur at the same time.
  **Why** Prevents accidental selection and hover flicker. **Applies to** SaaS app UI. **Check** start a drag: `user-select: none` is applied to the body or list and the dragged node has `inert`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "Clean drag interactions".
- **RULE [VWI-37]** Every drag, swipe, pinch or path gesture also has a tap/click and keyboard alternative, unless the gesture is essential.
  **Why** WCAG 2.5.7 Dragging Movements. **Applies to** all. **Check** each gesture-only control has a button or key equivalent reachable by Tab. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "Gestures have alternatives".
- **RULE [VWI-38]** If something looks clickable it must be clickable: no part of an apparently interactive surface is a dead zone, and controls have clear affordances and generous targets.
  **Why** Guessing where to click is a failure. **Applies to** all. **Check** hover cursor is pointer on the entire visual card or row that appears interactive; `elementFromPoint` over its padding returns the interactive element. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Touch & Drag; README "No dead zones", "Design forgiving interactions".
- **RULE [VWI-39]** Autofocus on desktop screens that have a single primary input; rarely on mobile (the keyboard opening causes layout shift).
  **Why** Speed on desktop, stability on mobile. **Applies to** SaaS app UI. **Check** `[autofocus]` present on single-input desktop screens; absent at 375 px. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Autofocus; README "Autofocus for speed". Conflict with a11y checklist: see section 5.
- **RULE [VWI-40]** Internationalise keyboard shortcuts for non-QWERTY layouts and show platform-specific modifier symbols.
  **Why** Shortcuts bound to physical key letters break on other layouts. **Applies to** SaaS app UI. **Check** shortcuts use `event.key` or layout-aware mapping; on macOS UI shows the Cmd symbol, on Windows Ctrl. **Source** vercel-labs/web-interface-guidelines README > Interactions "Locale-aware keyboard shortcuts" (not in AGENTS.md).

### 2.6 Animation
- **RULE [VWI-41]** Honour `prefers-reduced-motion`: ship a reduced variant or disable the animation.
  **Why** Vestibular safety (WCAG 2.3.3). **Applies to** all. **Check** emulate `prefers-reduced-motion: reduce`; transforms, parallax and auto-play motion are removed or replaced by fades; grep CSS for an `@media (prefers-reduced-motion: reduce)` block. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation.
- **RULE [VWI-42]** Implementation preference order: CSS, then Web Animations API, then JS libraries; avoid main-thread JS-driven animation when CSS can do it.
  **Why** Compositor-run CSS stays smooth under main-thread load. **Applies to** all. **Check** review: animation libraries are only used where CSS cannot (gesture-driven, physics). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Implementation preference".
- **RULE [VWI-43]** Animate only compositor-friendly properties (`transform`, `opacity`); never animate layout properties (`top`, `left`, `width`, `height`).
  **Why** Layout properties trigger reflow and repaint every frame. **Applies to** all. **Check** inspect `transition-property` and `@keyframes` for `top|left|right|bottom|width|height|margin|padding`; count 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Compositor-friendly".
- **RULE [VWI-44]** Never use `transition: all`; list the exact properties (typically `opacity`, `transform`).
  **Why** `all` unintentionally animates layout-affecting properties. **Applies to** all. **Check** computed `transition-property` equals `all` on any element: count 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Never `transition: all`".
- **RULE [VWI-45]** Animate only to clarify cause and effect or to add deliberate delight; choose easing to match what changes (size, distance, trigger).
  **Why** Decorative motion without meaning is noise. **Applies to** all. **Check** visual review per animated element: can you name the cause-effect it explains. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Necessity check", "Easing fits the subject".
- **RULE [VWI-46]** Animations are interruptible and input-driven; autoplay is allowed only for muted, non-essential loops; any autoplaying motion longer than 5 seconds that sits beside other content has pause, stop, or hide controls.
  **Why** WCAG 2.2.2 Pause, Stop, Hide. **Applies to** all | landing page. **Check** any `animation-iteration-count: infinite` or autoplay video with duration > 5 s has a reachable control; `video[autoplay]` has `muted`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Interruptible", "Input-driven".
- **RULE [VWI-47]** Set the correct `transform-origin` so motion starts where it physically should (popover grows from its trigger, not from its centre).
  **Why** Origin carries spatial meaning. **Applies to** all. **Check** computed `transform-origin` on popovers and dropdowns matches the anchor side. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Correct transform origin".
- **RULE [VWI-48]** For SVG animation, apply transforms to a `<g>` wrapper and set `transform-box: fill-box; transform-origin: center`.
  **Why** Safari historically miscalculates SVG transform origins. **Applies to** all. **Check** animated SVG children sit inside a `g` with `transform-box: fill-box`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Animation; README "Cross-browser SVG transforms".
- **RULE [VWI-49]** When scaling text, animate a wrapper not the text node; if smoothing artefacts persist add `translateZ(0)` or `will-change: transform` to promote a layer.
  **Why** Text anti-aliasing changes under transforms. **Applies to** all. **Check** visual: no text shimmer during scale. **Source** vercel-labs/web-interface-guidelines README > Design "Text anti-aliasing & transforms" (not in AGENTS.md).

### 2.7 Layout
- **RULE [VWI-50]** Adjust optically by +/-1 px where perception beats geometry (icon next to text, play triangles, rounded shapes).
  **Why** Geometric centre often looks off. **Applies to** all. **Check** visual at 2x zoom. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Optical alignment".
- **RULE [VWI-51]** Every element aligns deliberately to a grid line, baseline, edge or optical centre; no accidental placement.
  **Why** Accidental offsets read as sloppiness. **Applies to** all. **Check** compare `left` / `top` of siblings in a group: deltas are 0 or a deliberate token. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Deliberate alignment".
- **RULE [VWI-52]** Balance icon and text lockups by adjusting weight, size, spacing or colour (a thin icon stroke may need a heavier stroke next to medium text).
  **Why** Mismatched stroke weights fight visually. **Applies to** all. **Check** icon stroke-width relative to adjacent text weight: visual. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Balance contrast in lockups".
- **RULE [VWI-53]** Verify layouts at mobile, laptop and ultra-wide; simulate ultra-wide by browser zoom at 50%.
  **Why** Layouts fail at the extremes. **Applies to** all. **Check** screenshots at 375, 1440 and 2560 px wide. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Responsive coverage".
- **RULE [VWI-54]** Respect safe areas with `env(safe-area-inset-*)` for notches and insets.
  **Why** Content hidden under notches and home indicators. **Applies to** mobile. **Check** fixed header/footer have padding using `env(safe-area-inset-top|bottom)`; viewport meta has `viewport-fit=cover` when used. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Respect safe areas".
- **RULE [VWI-55]** No unwanted scrollbars: fix the overflow rather than hide it. Test on macOS with Show scroll bars set to Always to see the Windows view.
  **Why** Overlay scrollbars on macOS hide overflow bugs. **Applies to** all. **Check** `document.documentElement.scrollWidth <= innerWidth`; list elements with `overflow:auto` that have no overflow. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "No excessive scrollbars".
- **RULE [VWI-56]** Let the browser size things: prefer flex, grid and intrinsic sizing over measuring in JS.
  **Why** Avoids layout thrash. **Applies to** all. **Check** grep for `getBoundingClientRect`/`offsetWidth` driving layout state in render paths. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Layout; README "Let the browser size things".

### 2.8 Content and accessibility
- **RULE [VWI-57]** Prefer inline help; use tooltips only as a last resort.
  **Why** Tooltips are hidden, hover-only, and not touch friendly. **Applies to** all. **Check** count of `[role=tooltip]` / `title` carrying essential info = 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Inline help first".
- **RULE [VWI-58]** Skeletons mirror final content exactly (same dimensions and structure) to avoid layout shift.
  **Why** Prevents CLS on load-in. **Applies to** SaaS app UI. **Check** skeleton block size vs loaded block size delta <= 1 px; CLS 0 across the swap. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Stable skeletons".
- **RULE [VWI-59]** `<title>` reflects the current context (page, state, route).
  **Why** Orientation for tabs, history, and screen readers. **Applies to** all. **Check** `document.title` changes on route change and is unique per page. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Accurate page titles".
- **RULE [VWI-60]** No dead ends: every screen offers a next step or recovery path; design empty, sparse, dense and error states for each.
  **Why** Users stall on blank or error screens. **Applies to** all. **Check** empty-state and error-state screenshots exist; each has a primary action or link. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "No dead ends", "All states designed".
- **RULE [VWI-61]** Use typographic (curly) quotes and avoid widows and orphans (`text-wrap: balance` on headings, `pretty` on paragraphs).
  **Why** Polish and tidy rag. **Applies to** all. **Check** text nodes contain no straight `"` between words; headings have computed `text-wrap: balance`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Typographic quotes", "Avoid widows/orphans".
- **RULE [VWI-62]** Use `font-variant-numeric: tabular-nums` (or a monospace such as Geist Mono) wherever numbers are compared or update in place (tables, prices, counters).
  **Why** Proportional digits make columns jitter. **Applies to** SaaS app UI | landing page. **Check** computed `font-variant-numeric` includes `tabular-nums` on `td`, counters, price cells. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Tabular numbers for comparisons".
- **RULE [VWI-63]** Status is never colour-only: pair with text labels; icons convey the same meaning in text for non-sighted users.
  **Why** WCAG 1.4.1. **Applies to** all. **Check** each status colour element also has visible text or an accessible name. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Redundant status cues", "Icons have labels".
- **RULE [VWI-64]** Accessible names exist even when the visual design omits labels; icon-only buttons have a descriptive `aria-label`; decorative elements are `aria-hidden`; verify in the accessibility tree.
  **Why** Screen readers need names. **Applies to** all. **Check** every `button, a, input` has a non-empty computed accessible name; decorative `svg` has `aria-hidden=true`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Don't ship the schema", "Accessible content", "Icon-only buttons are named".
- **RULE [VWI-65]** Use the real ellipsis character `…`, not three periods.
  **Why** Typographic correctness and single glyph for truncation. **Applies to** all. **Check** regex `\.\.\.` in visible text: count 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Use the ellipsis character".
- **RULE [VWI-66]** Headings: set `scroll-margin-top` so anchored headings clear sticky headers; provide a "Skip to content" link; keep a hierarchical `<h1>`-`<h6>` outline.
  **Why** Anchor jumps otherwise hide under fixed bars; skip link serves keyboard users. **Applies to** all. **Check** `h2[id], h3[id]` computed `scroll-margin-top` >= sticky header height; first focusable is a skip link; heading levels never jump by 2. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Anchored headings", "Headings & skip link".
- **RULE [VWI-67]** Layouts survive user-generated content of short, average and very long length; text containers use `truncate`, `line-clamp-*` or `break-words`; flex children that must truncate carry `min-w-0`; empty strings and arrays render without broken UI.
  **Why** Real data breaks tidy mockups. **Applies to** SaaS app UI. **Check** inject a 40-character unbroken token and a 400-character string into each text slot: no overflow beyond parent (`scrollWidth <= clientWidth + 1`). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content Handling; README "Resilient to user-generated content".
- **RULE [VWI-68]** Format dates, times, numbers, delimiters and currencies for the user's locale (`Intl.DateTimeFormat`, `Intl.NumberFormat`); detect language from `Accept-Language` and `navigator.languages`, never from IP or GPS.
  **Why** Locale conventions differ; location is not language. **Applies to** all. **Check** grep for hard-coded `toFixed`/`MM/DD` formatting in UI strings; locale detection code does not use geo-IP. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Locale-aware formats", "Prefer language settings over location".
- **RULE [VWI-69]** Mark brand names, product names, code tokens and identifiers with `translate="no"`.
  **Why** Browser auto-translate garbles them. **Applies to** all. **Check** `[translate=no]` on logo text, `code`, API keys. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Shield verbatim content from translation".
- **RULE [VWI-70]** Prefer native elements (`button`, `a`, `label`, `table`) before ARIA.
  **Why** Native semantics are free and robust. **Applies to** all. **Check** `[role=button]` on a `div` count 0 where a `<button>` works. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Semantics before ARIA".
- **RULE [VWI-71]** Media has captions for speech and meaningful sounds, transcripts for audio-only, and descriptions for essential visuals; media controls are keyboard operable; decorative media is hidden from assistive tech.
  **Why** WCAG 1.2.x. **Applies to** all. **Check** `video` has `track[kind=captions]`; decorative video has `aria-hidden=true` and no controls. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Accessible media".
- **RULE [VWI-72]** Glue units, shortcuts and brand names with non-breaking spaces (`10&nbsp;MB`, `⌘&nbsp;K`, `Vercel&nbsp;SDK`).
  **Why** Stops awkward line breaks inside a unit. **Applies to** all. **Check** regex `\d (MB|GB|KB|ms|px|%)` with a normal space in visible text: count 0. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Content & Accessibility; README "Non-breaking spaces for glued terms".

### 2.9 Performance
- **RULE [VWI-73]** Network mutations (POST, PATCH, DELETE) complete in under 500 ms.
  **Why** Above this the UI feels laggy and needs optimistic handling. **Applies to** SaaS app UI. **Check** measure p95 of mutation requests < 500 ms. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Network latency budgets".
- **RULE [VWI-74]** Virtualise large lists (more than 50 items) with a virtual-list library or `content-visibility: auto`.
  **Why** DOM size drives layout cost. **Applies to** SaaS app UI. **Check** any list container with > 50 children has virtualisation or `content-visibility: auto`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Large lists".
- **RULE [VWI-75]** Preload only above-the-fold images; lazy-load the rest; give every image explicit dimensions to prevent CLS.
  **Why** LCP and layout stability. **Applies to** landing page | all. **Check** `img` below the first viewport has `loading=lazy`; every `img` has `width`/`height` or `aspect-ratio`; above-fold hero is not lazy. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Preload wisely", "No image-caused CLS".
- **RULE [VWI-76]** Add `<link rel="preconnect">` (with `crossorigin` when needed) for asset and CDN origins; preload critical fonts with `<link rel="preload" as="font">` and `font-display: swap`; subset fonts via `unicode-range` and limit variable axes to those used.
  **Why** Cuts DNS/TLS latency and font flash, and shrinks font bytes. **Applies to** landing page | all. **Check** head contains preconnect for each third-party origin used above the fold; `@font-face` has `font-display: swap` and `unicode-range`; preloaded font has `crossorigin`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Preconnect to origins", "Preload fonts", "Subset fonts".
- **RULE [VWI-77]** Use `<video autoplay muted loop playsinline>` rather than animated GIF for loops, provide a still or reduced-motion alternative, and for short non-essential loops add an H.264 MP4 `<source>` in `<picture>` (gated by `prefers-reduced-motion`) so Safari treats it as an image.
  **Why** Video is far smaller than GIF; reduced-motion users get a still. **Applies to** landing page. **Check** no `img[src$=".gif"]` with duration > 1 s; `video[autoplay]` has `muted playsinline loop` and a `poster`. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Video over animated GIF", "Safari video-as-image".
- **RULE [VWI-78]** Batch DOM reads and writes to avoid forced reflow; move long tasks to Web Workers; keep controlled inputs cheap per keystroke (prefer uncontrolled).
  **Why** Main-thread blocking harms INP. **Applies to** SaaS app UI. **Check** performance trace: no long tasks > 50 ms on keystroke; no layout thrash pattern (read-write-read loops). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Minimize layout work", "Keystroke cost", "Don't use the main thread for expensive work".
- **RULE [VWI-79]** Profile with CPU and network throttling, with extensions disabled; test iOS Low Power Mode and macOS Safari; track re-renders (React DevTools or React Scan).
  **Why** Fast dev machines hide real costs. **Applies to** all. **Check** process: profile run records throttling settings. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Performance; README "Device/browser matrix", "Measure reliably", "Throttle when profiling", "Track re-renders".

### 2.10 Dark mode and theming
- **RULE [VWI-80]** Set `color-scheme: dark` on `<html>` for dark themes so scrollbars and native controls get dark UI; set `<meta name="theme-color">` to match the page background.
  **Why** Native chrome otherwise stays light. **Applies to** all. **Check** `getComputedStyle(document.documentElement).colorScheme` contains `dark` in dark theme; `meta[name=theme-color]` equals body background. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Dark Mode & Theming; README "Set the appropriate color-scheme", "Browser UI matches your background".
- **RULE [VWI-81]** Native `<select>` gets an explicit `background-color` and `color`.
  **Why** Windows renders dark-mode selects with unreadable defaults. **Applies to** forms. **Check** computed `background-color` and `color` on `select` are set tokens in both themes. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Dark Mode & Theming; README "Windows `<select>` background".
- **RULE [VWI-82]** Guard date/time rendering against hydration mismatch (server and client output must agree).
  **Why** Hydration errors cause flashes and lost state. **Applies to** SaaS app UI. **Check** no hydration mismatch warnings in console with timezone set differently from server. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Hydration.

### 2.11 Design details
- **RULE [VWI-83]** Build shadows from at least two layers (ambient plus direct light); combine borders and shadows, with semi-transparent borders for crisper edges.
  **Why** Single-layer shadows look flat; translucent borders adapt to any background. **Applies to** all. **Check** computed `box-shadow` on cards/popovers contains >= 2 comma-separated layers; border colour has alpha < 1. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Layered shadows", "Crisp borders".
- **RULE [VWI-84]** Nested radii: child radius <= parent radius and concentric (child = parent radius minus the gap).
  **Why** Mismatched curves look off. **Applies to** all. **Check** for each rounded child inside a rounded parent: `childRadius <= parentRadius - padding` (approx). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Nested radii".
- **RULE [VWI-85]** On non-neutral backgrounds tint borders, shadows and text toward the background hue.
  **Why** Neutral grey on a tinted surface looks dirty. **Applies to** all. **Check** hue of border colour within about 30 degrees of the surface hue when surface chroma is above ~0.02 (OKLCH). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Hue consistency". The 30 degrees and 0.02 values are my own thresholds [unverified].
- **RULE [VWI-86]** Use colour-blind-friendly palettes in charts.
  **Why** About 8% of men have colour-vision deficiency. **Applies to** SaaS app UI. **Check** simulate protan/deutan/tritan; series remain distinguishable (use shape or label too). **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Accessible charts".
- **RULE [VWI-87]** Check contrast, and prefer APCA over WCAG 2 for perceptual accuracy; hover, active and focus states increase contrast relative to rest.
  **Why** WCAG 2 ratios misjudge dark mode and thin type. **Applies to** all. **Check** compute APCA Lc and WCAG ratio for text pairs (no numeric APCA floor is given in the source); state colours have higher contrast than rest colours. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Minimum contrast", "Interactions increase contrast".
- **RULE [VWI-88]** Avoid banding when fading to dark colours with CSS masks; use background images for such fades.
  **Why** 8-bit gradients band on dark values. **Applies to** all. **Check** visual: no visible steps in a dark gradient fade. **Source** vercel-labs/web-interface-guidelines AGENTS.md > Design; README "Avoid gradient banding".

### 2.12 Copywriting (Vercel-specific, the README says these are brand choices, not universal)
- **RULE [VWI-89]** Use active voice and action-oriented phrasing ("Install the CLI", not "The CLI will be installed"); write in second person; keep nouns consistent; be concise.
  **Why** Faster scanning and clearer ownership. **Applies to** all. **Check** copy lint: passive "will be/is being" phrases flagged; first-person "we/our" flagged in UI strings. **Source** vercel-labs/web-interface-guidelines README > Copywriting "Active voice", "Action-oriented language", "Write in second person", "Keep nouns consistent".
- **RULE [VWI-90]** Use numerals for counts ("8 deployments"); show currency consistently with either 0 or 2 decimals in a given context, never mixing; separate number and unit with a non-breaking space ("10 MB").
  **Why** Scannability and consistency. **Applies to** all. **Check** regex for spelled-out counts; price column has uniform decimal count. **Source** vercel-labs/web-interface-guidelines README > Copywriting "Use numerals for counts", "Consistent currency formatting", "Separate numbers & units".
- **RULE [VWI-91]** Errors are positive and guide the exit: state what to do, not just what failed ("Your API key is incorrect or expired. Generate a new key in your account settings."); labels are specific ("Save API Key", not "Continue").
  **Why** Users need a next action. **Applies to** forms | SaaS app UI. **Check** each error string contains an imperative verb or link; button labels are not generic ("Submit", "Continue") on API forms. **Source** vercel-labs/web-interface-guidelines README > Copywriting "Default to positive language", "Error messages guide the exit", "Avoid ambiguity".
- **RULE [VWI-92]** Use consistent placeholders for sample values (strings `YOUR_API_TOKEN_HERE`, numbers `0123456789`).
  **Why** Familiarity for developers. **Applies to** SaaS app UI. **Check** grep placeholder values for ad-hoc samples. **Source** vercel-labs/web-interface-guidelines README > Copywriting "Use consistent placeholders".
- **RULE [VWI-93]** Vercel brand choices (not universal): Title Case (Chicago style) for headings and buttons in product UI, sentence case on marketing pages; `&` instead of "and".
  **Why** House style. **Applies to** SaaS app UI. **Check** decide per brand style card; for Larpo see section 5. **Source** vercel-labs/web-interface-guidelines README > Copywriting "Headings & buttons use Title Case", "Prefer `&` over `and`".

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Min hit target | 24 px (any); 44 px on mobile | AGENTS Targets & Input |
| Mobile input font size | >= 16 px | AGENTS Targets & Input |
| Mutation latency budget | < 500 ms (POST, PATCH, DELETE) | AGENTS Performance |
| Virtualise lists | more than 50 items | AGENTS Performance |
| Autoplay motion needing controls | longer than 5 s | AGENTS Animation |
| Spinner show-delay | about 150-300 ms | README Minimum loading-state duration |
| Spinner minimum visible time | about 300-500 ms | README Minimum loading-state duration |
| Optical alignment tolerance | +/- 1 px | AGENTS Layout |
| Shadow layers | at least 2 | AGENTS Design |
| Ultra-wide simulation | browser zoom 50% | AGENTS Layout |
| Text-wrap | `balance` for headings | AGENTS Content |
| Radius relation | child <= parent, concentric | AGENTS Design |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| "Install the CLI." | "The CLI will be installed." | active voice |
| "Your API key is incorrect or expired. Generate a new key in your account settings." | "Invalid API key" | error guides the exit |
| Button "Save API Key" | Button "Continue" | specific label |
| "8 deployments" | "eight deployments" | numerals |
| `10&nbsp;MB` | `10MB` or `10 MB` with a breakable space | unit glued, spaced |
| `Rename…` (U+2026) | `Rename...` | one glyph, signals follow-up |
| `transition: opacity .2s, transform .2s` | `transition: all .2s` | explicit properties |
| `outline: none` plus a `:focus-visible` ring | `outline: none` alone | focus replacement |
| Mobile input `font-size: 16px` | 14 px input plus `maximum-scale=1` | zoom stays enabled |
| Link as `<a href>` | `<div onClick>` navigation | open-in-new-tab works |
| Layered ambient plus direct shadow with translucent border | single flat shadow | depth and edge clarity |
| `<video autoplay muted loop playsinline>` with poster | animated GIF | size and a11y |
| Autoplay only muted non-essential loops; controls past 5 s | unmuted autoplay | WCAG 2.2.2 |

## 5. Exceptions & judgement calls

- **Viewport zoom lock (README alternative).** README "Mobile input size" offers `maximum-scale=1` as an alternative to the 16 px font; the same document says "never disable zoom". They conflict; take the 16 px route. a11y checklist and implementation-craft both forbid zoom locks.
- **Autofocus.** Vercel says autofocus a single primary input on desktop. The A11Y Project checklist (item "Avoid using the autofocus attribute", WCAG 2.4.3) says avoid autofocus because it disorients screen-reader and motor-impaired users. Judgement: allow only on dedicated single-input screens (search, command palette, login) on desktop, never on marketing pages. See `a11y-project-checklist.md`.
- **Disable submit.** Vercel: keep submit enabled until the request starts, never pre-disable. `ui-pedia/16-forms.md` line 222 hedges for disabled-until-complete [engine note]. GOV.UK button page also says avoid disabled buttons. Three sources lean the same way, so follow Vercel.
- **Title Case vs sentence case.** Vercel product UI uses Title Case with `&`; README says marketing pages use sentence case. `knowledge/web/copy-and-ux-writing.md` CW-10 defaults to sentence case (Atlassian, Carbon) and GOV.UK uses sentence case; Larpo should keep sentence case. Treat VWI-93 as Vercel house style only.
- **Touch target numbers.** Vercel: 24 px minimum, 44 px mobile. `knowledge/web/implementation-craft.md` (line 174) agrees (24 px hard per WCAG 2.5.8, 44 px soft). `ui-pedia/13-buttons.md` gives 48 x 48 dp (Material); consistent with using 44-48 as a mobile comfort target.
- **Contrast metric.** Vercel prefers APCA over WCAG 2 but gives no Lc numbers. `knowledge/web/color-and-surfaces.md` has computed APCA tooling; WCAG 2.2 AA remains the legal baseline (4.5:1 text, 3:1 large and UI). Use both: WCAG for compliance, APCA as a tiebreak for dark mode and thin type.
- **Loading timing.** Show-delay and minimum-visible numbers are marked with a tilde in the README (about); treat as defaults, not specifications.
- **`will-change` / `translateZ(0)`** is offered as a last-resort fix only; overuse costs memory.
- **Tooltip delay.** No numeric values given; Emil Kowalski's linked tweet is the reference [unverified].
- **Scope.** Several rules target React (hydration, `onChange`, Suspense, `min-w-0` Tailwind class names). The principles apply to any stack; the Check selectors still work on rendered DOM.

## 6. Figures worth keeping

None; the repo is text only (links to tweets with demos: prediction cones, tooltip timing, northern lights; not fetched).

## 7. Open questions

- `command.md` (the review command prompt, 8 KB) was fetched but only skimmed; it likely mirrors AGENTS.md and defines the audit output format (file:line findings). Not mined for rules.
- Exact tooltip delay values: not in source [unverified].
- Whether the 24 px target is the visual or hit size under WCAG 2.5.8 spacing exception: the source says "expand hit target"; WCAG also allows spacing instead. Mark as soft when spacing exception applies.
- README link targets (tweets, x.com) were not fetched; claims that depend on them (prediction cones, tooltip peers) are carried as the README states them.
