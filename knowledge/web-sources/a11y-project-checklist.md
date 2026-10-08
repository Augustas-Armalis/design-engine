---
source: web:https://www.a11yproject.com/checklist/
chapter: The A11Y Project Checklist (WCAG 2.2 A and AA mapped to checks) plus linked posts (skip nav links, what is color contrast, OS and browser display modes)
pages: n/a (web source, fetched 2026-10-08)
topic_tags: [accessibility, wcag, keyboard, focus, forms, headings, images, contrast, motion, touch, media, tables, color-scheme, reduced-motion, forced-colors]
status: studied
---

# The A11Y Project Checklist

Raw text: `corpus/web/a11yproject/` (checklist.html/.txt/clean.txt plus three linked posts; private, gitignored). Fetched 2026-10-08 with a polite 2 s gap. Pages read: `https://www.a11yproject.com/checklist/`, `/posts/skip-nav-links/` (Cameron Cundiff, 2013), `/posts/what-is-color-contrast/` (Rachel Vasquez, 2015, last updated 2018), `/posts/operating-system-and-browser-accessibility-display-modes/` (Eric Bailey, 2020). The site repo `a11yproject/a11yproject.com` reports an Apache-2.0 licence via the GitHub API (content licence of the prose may differ [unverified]); all notes below are my own wording.

The checklist states it targets "many, but not all" WCAG A and AA concerns; each item is tagged with one WCAG success criterion (SC), and the site says it strives for AA. Items below carry the SC number the checklist assigns. Where the checklist's SC mapping looks loose I say so in section 5.

## 1. Core ideas

1. Each checklist item is a single testable statement mapped to one WCAG success criterion, which makes it directly convertible to a selector check.
2. Semantics do most of the work: `a` with `href` for links, `button` for actions, real headings, lists, tables, landmarks, labels.
3. Never rely on colour alone (links, errors, success, charts); underline links.
4. Keyboard users need visible focus, a sensible order, and no invisible focus traps (hidden menus and off-screen navs must not be focusable).
5. Forms: every input has an associated label, groups use `fieldset`/`legend`, errors are listed with links and tied to inputs via `aria-describedby`.
6. Motion: respect `prefers-reduced-motion`, no flashing, a pause mechanism for background video, no autoplay media.
7. Contrast AA numbers: 4.5:1 normal text, 3:1 large text, 3:1 icons and input borders.
8. Zoom and reflow: do not disable viewport zoom, content must work at 200% text size, with no horizontal scrolling.
9. Test OS display modes (dark, high contrast or forced colours, inverted colours, reduced motion, increased contrast), which can be active in combination.
10. Plain language: write at about an 8th-grade reading level, avoid idioms; left-align LTR text.

## 2. Rules

### 2.1 Content
- **RULE [A11Y-01]** Write content in plain language at about an 8th-grade reading level and avoid figures of speech, idioms and complicated metaphors.
  **Why** Reading-level support (WCAG 3.1.5, AAA in WCAG itself though listed on the checklist). **Applies to** all. **Check** run a readability formula (Flesch-Kincaid) on body copy blocks; flag grade > 9. **Source** a11yproject.com/checklist/ > Content ("Use plain language...").
- **RULE [A11Y-02]** Link, button and label text is unique and descriptive within a page; no "click here" or "read more" alone.
  **Why** Screen-reader users navigate by lists of links and buttons, where the text must stand alone. **Applies to** all. **Check** collect accessible names of `a, button, label`; flag names in {click here, read more, learn more, here, more} and groups of identical names pointing at different hrefs. **Source** a11yproject.com/checklist/ > Content ("Make sure that button, a, and label element content is unique and descriptive"), WCAG 1.3.1.
- **RULE [A11Y-03]** Left-align running text for left-to-right languages (right-align for RTL); do not centre or justify long text.
  **Why** Centred and justified text is harder to read (WCAG 1.4.8). **Applies to** all. **Check** computed `text-align` of paragraphs longer than 200 characters is `start`/`left`/`right` (not `center`, `justify`). **Source** a11yproject.com/checklist/ > Content ("Use left-aligned text...").

### 2.2 Global code
- **RULE [A11Y-04]** Validate HTML (no parsing errors such as duplicate ids, broken nesting).
  **Why** Consistent AT behaviour; the checklist cites 4.1.1 (note: WCAG 2.2 removed 4.1.1 as obsolete [unverified, from my knowledge of WCAG 2.2]). **Applies to** all. **Check** W3C Nu validator run: zero errors; duplicate `id` count 0. **Source** a11yproject.com/checklist/ > Global code ("Validate your HTML").
- **RULE [A11Y-05]** Set `lang` on `<html>`.
  **Why** Screen readers pick the right pronunciation (WCAG 3.1.1). **Applies to** all. **Check** `document.documentElement.lang` matches `^[a-z]{2,3}(-[A-Za-z0-9]+)*$`. **Source** a11yproject.com/checklist/ > Global code.
- **RULE [A11Y-06]** Give every page or view a unique `<title>`.
  **Why** It is often the first thing announced (WCAG 2.4.2). **Applies to** all. **Check** `document.title` non-empty; across crawled routes titles are unique. **Source** a11yproject.com/checklist/ > Global code.
- **RULE [A11Y-07]** Do not disable viewport zoom, even in app-like web apps.
  **Why** Text resize support (WCAG 1.4.4); native apps also respect OS text-size. **Applies to** all. **Check** viewport meta has no `user-scalable=no` and no `maximum-scale` below 5. **Source** a11yproject.com/checklist/ > Global code ("Ensure that viewport zoom is not disabled"). The "below 5" threshold is mine [unverified].
- **RULE [A11Y-08]** Use landmark elements for the main regions: `header`, `nav`, `main`, `footer` (and `aside`, `form`/`section` with names where needed).
  **Why** Landmarks give screen-reader users quick region jumps (WCAG 4.1.2 per the checklist). **Applies to** all. **Check** exactly one `main`; each `nav` has distinct `aria-label` if more than one; `header`/`footer` present at page level. **Source** a11yproject.com/checklist/ > Global code ("Use landmark elements...").
- **RULE [A11Y-09]** Keep a linear content flow: remove any `tabindex` value other than `0` or `-1`, and do not put tabindex on natively focusable elements.
  **Why** Positive tabindex breaks natural order (WCAG 2.4.3). **Applies to** all. **Check** `[tabindex]` whose value > 0: count 0; `a[href][tabindex], button[tabindex="0"]` count 0. **Source** a11yproject.com/checklist/ > Global code ("Ensure a linear content flow").
- **RULE [A11Y-10]** Avoid the `autofocus` attribute.
  **Why** Moving focus without permission disorients blind and low-vision users and burdens motor-impaired users (WCAG 2.4.3). **Applies to** all. **Check** `[autofocus]` count 0 outside single-purpose input screens. **Source** a11yproject.com/checklist/ > Global code ("Avoid using the autofocus attribute"). Conflicts with Vercel AGENTS.md; see section 5.
- **RULE [A11Y-11]** Let users extend, adjust, or turn off session timeouts well before they expire.
  **Why** WCAG 2.2.1 Timing Adjustable. **Applies to** SaaS app UI. **Check** if a session timeout exists: a warning dialog with an extend action appears before expiry. **Source** a11yproject.com/checklist/ > Global code ("Allow extending session timeouts").
- **RULE [A11Y-12]** Remove `title` attribute tooltips as carriers of important information; legitimate use is naming an `iframe`.
  **Why** `title` has poor keyboard, touch and AT support. **Applies to** all. **Check** `[title]` on elements other than `iframe`, `abbr`, SVG `<title>`: count 0 where the text is not duplicated visibly. **Source** a11yproject.com/checklist/ > Global code ("Remove title attribute tooltips").

### 2.3 Keyboard
- **RULE [A11Y-13]** Every interactive element shows a visible focus style when reached by keyboard.
  **Why** Keyboard, switch, voice and screen-reader users must see where they are (WCAG 2.4.7). **Applies to** all. **Check** Tab through the page; for each focused element, computed `outline-style != none` or `box-shadow != none` or border/background changes versus unfocused; screenshot diff of the element. **Source** a11yproject.com/checklist/ > Keyboard and > Controls ("Ensure that controls have :focus states").
- **RULE [A11Y-14]** Keyboard focus order matches the visual order.
  **Why** Meaningful sequence (WCAG 1.3.2). **Applies to** all. **Check** list focused elements in Tab order with `getBoundingClientRect`; sorted by top then left, they should be mostly monotonic (flag reversals greater than 1 row). **Source** a11yproject.com/checklist/ > Keyboard.
- **RULE [A11Y-15]** Elements not currently discoverable (closed dropdowns, off-screen navigation, inactive modals) are not focusable (`display:none`, `hidden`, `inert`, or `visibility:hidden`).
  **Why** Invisible focus stops confuse keyboard users (WCAG 2.4.3). **Applies to** all. **Check** during a full Tab traversal, every stop has a non-zero visible rect within the viewport (after scrolling) and `elementFromPoint` hits it. **Source** a11yproject.com/checklist/ > Keyboard ("Remove invisible focusable elements").

### 2.4 Images
- **RULE [A11Y-16]** Every `img` has an `alt` attribute.
  **Why** Without it a screen reader may read the file name (WCAG 1.1.1). **Applies to** all. **Check** `img:not([alt])` count 0. **Source** a11yproject.com/checklist/ > Images.
- **RULE [A11Y-17]** Decorative images use a null `alt=""`.
  **Why** Hides noise from AT. **Applies to** all. **Check** images inside buttons or links with adjacent text, or purely visual flourishes, have `alt=""` (and `role` not set). **Source** a11yproject.com/checklist/ > Images.
- **RULE [A11Y-18]** Complex images (charts, graphs, maps) have a text alternative that describes axes, data points, labels and the overall point.
  **Why** The whole visible message must exist as text. **Applies to** SaaS app UI | landing page. **Check** each chart `svg`/`canvas`/`img` has an adjacent table, `aria-describedby`, or long description; non-empty. **Source** a11yproject.com/checklist/ > Images.
- **RULE [A11Y-19]** For images that contain text, the `alt` includes that text (for example a logo with the word FedEx has `alt="FedEx"`).
  **Why** Text content must not be trapped in pixels. **Applies to** all. **Check** compare OCR or known logo text to `alt`; visual. **Source** a11yproject.com/checklist/ > Images.

### 2.5 Headings and lists
- **RULE [A11Y-20]** Use heading elements to introduce content, not for visual styling.
  **Why** Headings build the document outline (WCAG 2.4.6). **Applies to** all. **Check** every `h1-h6` is followed by content of the section it introduces; no heading used for large decorative text. **Source** a11yproject.com/checklist/ > Headings.
- **RULE [A11Y-21]** Use exactly one `h1` per page or view, describing the page's purpose; do not use `h1` for a fixed site name that does not change across pages.
  **Why** Orientation. **Applies to** all. **Check** `document.querySelectorAll('h1').length === 1` and its text differs from the site name on inner pages. **Source** a11yproject.com/checklist/ > Headings.
- **RULE [A11Y-22]** Headings follow a logical, descending sequence and never skip a level (no `h2` straight to `h4`); if a visual size is wanted, use a CSS class, not a different level.
  **Why** Outline integrity. **Applies to** all. **Check** iterate headings in DOM order: `level[i] - level[i-1] <= 1`. **Source** a11yproject.com/checklist/ > Headings.
- **RULE [A11Y-23]** Use list elements (`ul`, `ol`, `dl`) for list-like content, including card grids and sibling link groups.
  **Why** Announces item count and relationship (WCAG 1.3.1). **Applies to** all. **Check** runs of >= 3 sibling `a` or `li`-like elements outside a `ul/ol` flagged (nav link rows, card grids). **Source** a11yproject.com/checklist/ > Lists.

### 2.6 Controls
- **RULE [A11Y-24]** Use `a` with an `href` for links (including in SPAs); use `button` for actions (add `type="button"` where it must not submit a form).
  **Why** Correct role and keyboard behaviour (WCAG 1.3.1). **Applies to** all. **Check** `a:not([href])` count 0; `[onclick]` on `div/span` without role/tabindex count 0; `button` in a form without `type` flagged. **Source** a11yproject.com/checklist/ > Controls.
- **RULE [A11Y-25]** Links are recognisable as links without colour alone; underlines are the common, understood signal.
  **Why** WCAG 1.4.1 Use of Color. **Applies to** all. **Check** in-text `a` computed `text-decoration-line: underline`, or non-colour cue plus 3:1 contrast against surrounding text. **Source** a11yproject.com/checklist/ > Controls ("Ensure that links are recognizable as links") and > Appearance ("Make sure color isn't the only way information is conveyed").
- **RULE [A11Y-26]** Provide a skip link as the first focusable element, hidden until focused, that moves to the `main` content.
  **Why** Bypass repeated navigation (WCAG 2.4.1). **Applies to** all. **Check** first Tab stop is `a[href^="#"]` whose target exists and is `main` or contained in it; it is visible (non-zero rect, not clipped) when focused. **Source** a11yproject.com/checklist/ > Controls; /posts/skip-nav-links/ (example: `<a href="#main">Skip to main content</a>` before `nav`, with `<main id="main">`).
- **RULE [A11Y-27]** Skip links work in Webkit: if the target is not natively focusable, add `tabindex="-1"` to it (older Webkit builds failed to move focus).
  **Why** Focus must actually land at the target. **Applies to** all. **Check** after activating the skip link, `document.activeElement` is or is within `main`. **Source** /posts/skip-nav-links/ Notes (a 2013 browser-bug note; current relevance [unverified]).
- **RULE [A11Y-28]** Identify links that open in a new tab or window in the link text or an accessible label; ideally avoid them.
  **Why** Advance warning of context change (technique G201; not strictly required for conformance). **Applies to** all. **Check** `a[target=_blank]` has text or visually hidden text matching /new (tab|window)/i and `rel` includes `noopener`. **Source** a11yproject.com/checklist/ > Controls.

### 2.7 Tables
- **RULE [A11Y-29]** Use `table` for tabular data, `th` for headers (with `scope="col"` or `scope="row"` as complexity requires), and `caption` as the table's title.
  **Why** AT relies on header associations and a caption (WCAG 1.3.1, 2.4.6). **Applies to** SaaS app UI | landing page (pricing tables). **Check** each `table` has `caption` (or `aria-label`), `th` cells in header row/column, `scope` on `th`; no layout tables (`table` without any `th`). **Source** a11yproject.com/checklist/ > Tables.

### 2.8 Forms
- **RULE [A11Y-30]** Associate every input with a `label` using a `for`/`id` pair (highest support).
  **Why** Name and larger click target (the checklist maps this to 3.2.2; 1.3.1 and 4.1.2 are the usual criteria [unverified mapping]). **Applies to** forms. **Check** each `input, select, textarea` (excluding hidden/submit) has `labels.length > 0` or `aria-label`/`aria-labelledby`; `label[for]` ids resolve. **Source** a11yproject.com/checklist/ > Forms.
- **RULE [A11Y-31]** Group related inputs in `fieldset` with a `legend` (radio groups, address blocks).
  **Why** Group name is announced for each control. **Applies to** forms. **Check** radio/checkbox groups with the same `name` sit inside `fieldset > legend`. **Source** a11yproject.com/checklist/ > Forms.
- **RULE [A11Y-32]** Use `autocomplete` tokens on inputs asking for common personal data.
  **Why** WCAG 1.3.5 Identify Input Purpose. **Applies to** forms. **Check** fields for name, email, tel, address, card have valid `autocomplete` tokens. **Source** a11yproject.com/checklist/ > Forms.
- **RULE [A11Y-33]** After submit, list all errors in a block above the form with a link to each invalid field.
  **Why** Quick overview, especially for long forms (WCAG 3.3.1). **Applies to** forms. **Check** submit invalid form: container with a list of `a[href^="#"]` exists, count equals invalid fields, each target id resolves. **Source** a11yproject.com/checklist/ > Forms.
- **RULE [A11Y-34]** Connect each error message to its input with `aria-describedby` (and set `aria-invalid`).
  **Why** AT users hear the error with the field. **Applies to** forms. **Check** invalid inputs have `aria-describedby` that resolves to an element with the error text. **Source** a11yproject.com/checklist/ > Forms.
- **RULE [A11Y-35]** Error, warning and success states are not communicated by colour alone (add icon plus text).
  **Why** Colour-blind and low-vision users (WCAG 1.4.1). **Applies to** forms | SaaS app UI. **Check** each state style (`.error`, `.success`) includes visible text or icon, not only border or background colour change. **Source** a11yproject.com/checklist/ > Forms.

### 2.9 Media, video, audio
- **RULE [A11Y-36]** Media does not autoplay.
  **Why** Distracting for ADHD, can trigger vestibular and seizure disorders (WCAG 1.4.2). **Applies to** all. **Check** `video[autoplay], audio[autoplay]` count 0, or muted, decorative and with a pause control. **Source** a11yproject.com/checklist/ > Media.
- **RULE [A11Y-37]** Media controls use appropriate markup: a mute button exposes a pressed state (`aria-pressed`), a volume control is `input type=range`.
  **Why** Roles and states (WCAG 1.3.1). **Applies to** all. **Check** toggle buttons have `aria-pressed`; volume slider is an `input[type=range]`. **Source** a11yproject.com/checklist/ > Media.
- **RULE [A11Y-38]** All media can be paused, with Space toggling playback when the player has focus, without breaking Space-scroll elsewhere.
  **Why** WCAG 2.1.1 Keyboard. **Applies to** all. **Check** focus the player, press Space: playback toggles; focus body and press Space: page scrolls. **Source** a11yproject.com/checklist/ > Media.
- **RULE [A11Y-39]** Videos have captions; audio has transcripts.
  **Why** WCAG 1.2.2 Captions; transcripts for audio content (listed under 1.1.1 by the checklist). **Applies to** all. **Check** `video` contains `track[kind="captions"]`; audio players have an adjacent transcript link. **Source** a11yproject.com/checklist/ > Video, > Audio.
- **RULE [A11Y-40]** Remove seizure triggers: nothing flashes more than three times per second.
  **Why** WCAG 2.3.1 Three Flashes or Below Threshold. **Applies to** all. **Check** animation review for high-contrast flicker; `animation-duration` under 333 ms with infinite iteration on large areas flagged. **Source** a11yproject.com/checklist/ > Video, > Animation. The 333 ms heuristic is mine [unverified].

### 2.10 Appearance
- **RULE [A11Y-41]** Content stays legible and complete at 200% text size, with no overlap.
  **Why** WCAG 1.4.4 Resize text. **Applies to** all. **Check** set root font-size to 200% (or browser zoom 200%) at 1280 px width: no clipped text, no overlapping boxes (`scrollWidth > clientWidth + 1` on text elements flagged). **Source** a11yproject.com/checklist/ > Appearance ("Increase text size to 200%").
- **RULE [A11Y-42]** Check the page in specialised modes (Windows high contrast or forced colours, inverted colours): foreground still separable from background, and icons, borders, links and form fields still present.
  **Why** WCAG 1.4.1. **Applies to** all. **Check** emulate `forced-colors: active` (Playwright `forcedColors: 'active'`); buttons, inputs, focus rings and icons remain visible. **Source** a11yproject.com/checklist/ > Appearance; /posts/operating-system-and-browser-accessibility-display-modes/.
- **RULE [A11Y-43]** Keep related content close together so zoomed and magnified users can find everything (the "straw test").
  **Why** WCAG 1.3.3. **Applies to** all. **Check** visual at 400% zoom: labels remain adjacent to their controls. **Source** a11yproject.com/checklist/ > Appearance ("Double-check that good proximity...").
- **RULE [A11Y-44]** Instructions never rely on sensory characteristics alone (position such as "on the right", or sound such as "after the tone"); name the element.
  **Why** WCAG 1.3.3. **Applies to** all. **Check** grep copy for /\b(on the (left|right)|above|below|after the tone|the (red|green) button)\b/. **Source** a11yproject.com/checklist/ > Appearance.
- **RULE [A11Y-45]** Use a simple, consistent layout that reflows without a complicated structure.
  **Why** WCAG 1.4.10 Reflow. **Applies to** all. **Check** at 320 CSS px width there is no horizontal scroll (`scrollWidth <= clientWidth`). **Source** a11yproject.com/checklist/ > Appearance ("Use a simple, straightforward, and consistent layout") and > Mobile and touch ("Remove horizontal scrolling"). The 320 px figure is WCAG's, not stated on the page [unverified on page].

### 2.11 Animation
- **RULE [A11Y-46]** Keep animations subtle and non-flashing.
  **Why** WCAG 2.3.1. **Applies to** all. **Check** see A11Y-40. **Source** a11yproject.com/checklist/ > Animation.
- **RULE [A11Y-47]** Provide a way to pause background video.
  **Why** WCAG 2.2.2 Pause, Stop, Hide. **Applies to** landing page. **Check** hero or background `video` has a visible pause button reachable by keyboard. **Source** a11yproject.com/checklist/ > Animation.
- **RULE [A11Y-48]** All animation obeys `prefers-reduced-motion`; remove it when reduce is on, and if motion is essential to meaning, slow its duration down.
  **Why** WCAG 2.3.3 Animation from Interactions. **Applies to** all. **Check** with `prefers-reduced-motion: reduce` emulated, computed `animation-name` is `none` and `transition-duration` is 0s (or longer-slower variant) on animated elements. **Source** a11yproject.com/checklist/ > Animation; /posts/operating-system-and-browser-accessibility-display-modes/ (example uses `animation: none` inside `@media (prefers-reduced-motion: reduce)`).

### 2.12 Colour contrast
- **RULE [A11Y-49]** Normal-size text contrast is at least 4.5:1 (AA); the AAA level is 7:1.
  **Why** WCAG 1.4.3. **Applies to** all. **Check** compute luminance ratio per text node against its effective background (including images and gradients); fail < 4.5. **Source** a11yproject.com/checklist/ > Color contrast; /posts/what-is-color-contrast/ (4.5:1 minimum, AAA 7:1).
- **RULE [A11Y-50]** Large text contrast is at least 3:1; large means 18pt regular or 14pt bold and above.
  **Why** Larger and heavier strokes stay legible at lower contrast. **Applies to** all. **Check** font-size >= 24 CSS px (18pt), or >= 18.66 CSS px (14pt) with weight >= 700: threshold 3:1; otherwise 4.5. **Source** a11yproject.com/checklist/ > Color contrast; /posts/what-is-color-contrast/ (18pt regular or 14pt bold).
- **RULE [A11Y-51]** Icons and input borders (text inputs, radios, checkboxes) have at least 3:1 contrast against adjacent colours.
  **Why** WCAG 1.4.11 Non-text Contrast. **Applies to** all. **Check** compute ratio of input border colour versus surface, and meaningful icon fill versus surface: >= 3. **Source** a11yproject.com/checklist/ > Color contrast.
- **RULE [A11Y-52]** Text overlapping images or video stays legible; custom `::selection` colours also meet contrast; form placeholders also meet contrast.
  **Why** WCAG 1.4.3. **Applies to** all. **Check** sample the worst-case background under text at 9 points and compute ratio; check `::selection` pair; placeholder colour >= 4.5 on field background. **Source** a11yproject.com/checklist/ > Color contrast; /posts/what-is-color-contrast/ (placeholders).

### 2.13 Mobile and touch
- **RULE [A11Y-53]** The site works in any orientation (not portrait-locked).
  **Why** WCAG 1.3.4. **Applies to** mobile. **Check** screenshots at 390x844 and 844x390; no orientation lock in the manifest or CSS. **Source** a11yproject.com/checklist/ > Mobile and touch.
- **RULE [A11Y-54]** Icon buttons and links (hamburger menus, social icons, gallery controls) are large enough to activate with ease for a range of hand and stylus sizes.
  **Why** WCAG 2.5.5 Target Size per the checklist (the 2.2 AA criterion is 2.5.8, 24 px minimum). **Applies to** mobile. **Check** target sizes >= 44x44 CSS px comfortable, 24x24 minimum. The page itself gives no pixel number [unverified on page]. **Source** a11yproject.com/checklist/ > Mobile and touch.
- **RULE [A11Y-55]** Leave enough space between adjacent interactive items so users can start a scroll gesture without hitting a control (hand tremors).
  **Why** Zero-gap stacks of controls make scrolling hazardous. **Applies to** mobile. **Check** vertical gap between adjacent tappable rows >= 8 px [unverified threshold, mine]. **Source** a11yproject.com/checklist/ > Mobile and touch.

### 2.14 Display modes (from the linked post)
- **RULE [A11Y-56]** Support dark mode with `@media (prefers-color-scheme: dark)`; support users who set it at the OS.
  **Why** Eye strain and photosensitivity. **Applies to** all. **Check** emulate `prefers-color-scheme: dark`: body background and text computed colours change and pass contrast. **Source** /posts/operating-system-and-browser-accessibility-display-modes/ > Dark Mode.
- **RULE [A11Y-57]** Where images or video are re-inverted for the inverted-colours mode, do it with `@media (inverted-colors: inverted) { img, video { filter: invert(100%) } }`.
  **Why** Keeps photos natural while the UI inverts. **Applies to** all. **Check** emulate or toggle inverted colours: photos look natural (visual). **Source** /posts/operating-system-and-browser-accessibility-display-modes/ > Inverted Colors Mode. Safari already inverts images itself (per the post).
- **RULE [A11Y-58]** Semantic HTML gets High Contrast Mode support automatically; tweak with the `forced-colors` media query (the post names the old `-ms-high-contrast` for IE and notes Chromium Edge uses `forced-colors`).
  **Why** Custom backgrounds and icons vanish under forced colours. **Applies to** all. **Check** `forced-colors: active` emulation: controls keep borders (use `border: 1px solid transparent` or `outline` so something paints), SVG icons use `currentColor`. **Source** /posts/operating-system-and-browser-accessibility-display-modes/ > High Contrast Mode. The post dates from 2020; `forced-colors` is now the standard path [unverified current status].
- **RULE [A11Y-59]** Several modes may be active at once (reduced motion, increased contrast, dark); test combinations.
  **Why** Users configure devices to suit them. **Applies to** all. **Check** run the audit with dark + reduced-motion + forced-colors toggled together. **Source** /posts/operating-system-and-browser-accessibility-display-modes/ > Multiple modes.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Normal text contrast (AA) | 4.5:1 | checklist; contrast post |
| Large text contrast (AA) | 3:1 | checklist |
| Large text definition | 18pt regular or 14pt bold | contrast post |
| Icon contrast (AA) | 3.0:1 | checklist |
| Input border contrast (AA) | 3.0:1 | checklist |
| AAA contrast | 7:1 | contrast post |
| Reading level | about 8th grade | checklist Content |
| Resize text | 200% | checklist Appearance |
| Tabindex values allowed | 0 and -1 only | checklist Global code |
| h1 per page | exactly 1 | checklist Headings |
| Reduced-motion example animation | 250 ms infinite (the post's example) | display modes post |
| Compliance levels | A essential, AA ideal support (site target), AAA specialised | checklist intro |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `<a href="#main">Skip to main content</a>` first in body, `<main id="main">` | no skip link or skip link hidden when focused | bypass blocks |
| Link text "Download the 2026 pricing guide (PDF)" | "click here" / "read more" | links list navigation |
| h1, h2, h3 in order, styled by class | h2 then h4 for a smaller look | outline |
| `<img alt="">` for flourishes | no `alt` or `alt="image"` | decorative noise |
| Chart with data table or description | chart image with no text alternative | full information |
| Errors in a list above the form, each linking to its field, plus inline `aria-describedby` | single red border only | AT and colour |
| `@media (prefers-reduced-motion: reduce) { .x { animation: none } }` | endless bounce for all users | vestibular |
| `@media (inverted-colors: inverted) { img, video { filter: invert(100%) } }` | leave photos inverted | natural images |

## 5. Exceptions & judgement calls

- **Autofocus conflict.** This checklist says avoid `autofocus`; Vercel AGENTS.md says autofocus on desktop single-input screens. Judgement: permit on dedicated single-input surfaces (search, command palette, login) on desktop only; never on content pages. See `vercel-web-interface-guidelines.md` VWI-39.
- **Contrast metric.** This checklist uses WCAG 2 ratios; Vercel prefers APCA. WCAG is the legal baseline. `knowledge/web/implementation-craft.md` (line 250) matches these numbers (4.5, 3, and 3:1 for UI). No conflict on numbers; see `color-and-surfaces.md` for APCA.
- **Target size.** The checklist's "Target Size" item cites 2.5.5 (AAA, 44 px); the WCAG 2.2 AA criterion is 2.5.8 (24 px). Existing knowledge (implementation-craft line 174) already distinguishes these. No pixel figure is stated on the checklist page.
- **Centred text.** Checklist: centred or justified text is hard to read (SC 1.4.8, which is AAA). Existing `knowledge/web/typography.md` T-ME-03 allows centred text up to 3 lines or about 60ch; consistent in spirit, softer in number.
- **Title attribute.** The checklist says remove `title` tooltips; the tooltip pattern in Vercel guidelines (delay first, instant peers) refers to custom tooltips, not `title`. No conflict.
- **New tab.** Checklist says ideally avoid; GOV.UK Frontend says the same and requires "opens in new tab" in the link text plus `rel="noreferrer noopener"`.
- **Dated sources.** The skip-nav post (2013) and display-modes post (2020) mention Webkit focus bugs, IE and legacy Edge. Treat the browser-specific advice as historical; the principles stand.
- **Checklist breadth.** The checklist leaves out many WCAG 2.2 criteria: focus not obscured (2.4.11), dragging alternatives (2.5.7), redundant entry (3.3.7), accessible authentication (3.3.8). Those live in `implementation-craft.md` and the Vercel and GOV.UK notes.

## 6. Figures worth keeping

None (no figures in the extracted text).

## 7. Open questions

- Licence of the prose content (repo reports Apache-2.0; the site footer was not read) [unverified].
- The checklist's SC mapping for form labels (3.2.2) and parsing (4.1.1) looks off; I used the checklist's number in the "Why" line and flagged. WCAG 2.2 removed 4.1.1.
- Pixel sizes for touch targets and gaps are not in the checklist; thresholds above marked [unverified] are mine.
- The "web.dev Learn Accessibility" companion (queue item B2) is not read here.
