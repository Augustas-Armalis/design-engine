---
source: web:https://web.dev/learn/accessibility
chapter: web.dev Learn Accessibility (21 modules, Carie Fisher with Alexandra Klepper and Rachel Andrew; modules last updated 2022-05 to 2024-10)
pages: n/a
topic_tags: [accessibility, aria, semantics, keyboard, focus, images, color, contrast, motion, typography, forms, testing, wcag]
status: studied
---

# web.dev Learn Accessibility

Fetched 2026-10-08, raw text in `corpus/web/a11y-components/wda11y-*.txt` (private, gitignored). Licence of the pages: CC BY 4.0 text, Apache-2.0 code, but notes below are paraphrase and the corpus stays private. All 21 modules read: welcome, why, measure, aria-html, structure, more-html (titled "The Document"), focus, javascript, images, color-contrast, motion, typography, video-audio, forms, patterns, design-ux, test-automated, test-manual, test-assistive-technology, conclusion, glossary. The quiz pages carry no extra rule content and were not fetched.

Companion notes: `component-accessible-anatomy.md` (per-component specs), `inclusive-components.md`, `adrian-roselli.md`, `../web/implementation-craft.md` section 2.7 (WCAG 2.2 AA baseline this note extends).

## 1. Core ideas

1. Accessibility is the practice of making products usable in a comparable way by people with visual, motor, hearing, cognitive, speech, seizure and vestibular differences. About 15% of people self-report a disability, and situational or temporary limits (glare, broken wrist, noisy room) widen the group further. This is the justification for treating it as baseline quality, not a niche.
2. WCAG is organised as POUR: Perceivable, Operable, Understandable, Robust. It has three levels A, AA, AAA, each level includes the one below. If no law dictates otherwise, aim for the latest WCAG version at AA.
3. ARIA changes only what assistive technology is told; it never changes behaviour or looks. The module quotes the WebAIM Million finding that home pages that use ARIA average 70% more detected errors than pages without. The practical stance: native HTML first, ARIA to fill genuine gaps, and test.
4. The accessibility tree (built by the browser from the DOM, modified by ARIA) is what screen readers consume. Chrome DevTools can display it; inspect it to verify name, role, state.
5. Structure is navigation. Landmarks, headings, lists and table headers are how screen reader users scan a page, so they must come from real elements, not styled divs.
6. Keyboard support is a large share of the problem: the module cites about 25% of all digital accessibility issues as keyboard-related. Focus order, a visible indicator, and focus management in dynamic UI are the three levers.
7. Three-layer testing is required: automated (fast, partial), manual (keyboard, visual, content), assistive technology (screen reader). Automated tools cannot judge whether alt text is accurate, whether ARIA is on the right element, whether focus order is sensible, or contrast over gradients and images.
8. Motion, colour and contrast each have a user-preference media query (`prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`); honouring them is the cheapest way to give control back.
9. Component libraries and "accessible" patterns are starting points only. Copy-pasted code must still be tested in the target browsers and AT.
10. Design-time accessibility pays off: Deque research cited in the module says up to 67% of accessibility bugs can be avoided when it is part of design. Annotating designs (focus start, tab order, names, states, heading levels, landmarks) is the hand-off mechanism.

## 2. Rules

### 2.1 ARIA and semantics

- **RULE [WDA-01]** Use the native element whenever one exists (button, a, input+label, ul/ol, table, details, dialog, nav, main, headings). Add ARIA only for behaviour HTML cannot express (tabs, tree, live announcements, menus that really are application menus).
  **Why** ARIA adds no behaviour; every role you assign makes you responsible for keyboard handling, focus and state. Correlation data: pages with ARIA show more detected errors.
  **Applies to** all. **Check** static scan: `[role=button]:not(button,[type=button],[type=submit])`, `div[onclick],span[onclick]`, `a:not([href])[onclick]` must be zero unless allow-listed with a keyboard handler; axe `aria-allowed-role`, `aria-valid-attr-value` pass (extends `A1`/`A6` in implementation-craft). **Source** https://web.dev/learn/accessibility/aria-html

- **RULE [WDA-02]** Do not overwrite a native role. Do not put `role=button` on an `<a>`, `role=tab` on a heading, `role=heading` on a link. If a heading must live inside a tab, put the tab role on the wrapper and keep the heading inside it.
  **Why** An ARIA role replaces the element's built-in semantics, so heading navigation, link lists or form behaviour are lost.
  **Applies to** all. **Check** selector: `h1[role],h2[role],h3[role],h4[role],h5[role],h6[role]`, `a[role=button]`, `a[role=heading]` count 0; axe `aria-allowed-role`. **Source** https://web.dev/learn/accessibility/aria-html

- **RULE [WDA-03]** Every interactive control, native or ARIA, must be reachable and operable by keyboard. Use `tabindex="0"` to add something to tab order, `tabindex="-1"` for script-only focus, never a positive value. Do not add tab stops to headings or paragraphs.
  **Why** Positive tabindex rewrites document order and strands keyboard and AT users; stops on inert text look like broken controls.
  **Applies to** all. **Check** `[tabindex]:not([tabindex="0"]):not([tabindex="-1"])` count 0 (axe `tabindex`); for each `[tabindex="0"]` that is not natively interactive, assert a role plus a key handler exists or it is a scroll container. **Source** https://web.dev/learn/accessibility/aria-html

- **RULE [WDA-04]** Never hide something focusable from assistive technology: no `aria-hidden="true"` or `role=presentation|none` on a focusable element or on an ancestor that contains focusable descendants.
  **Why** The element stays in tab order but is silent to screen readers, producing "ghost" focus.
  **Applies to** all (modals, off-canvas menus, carousels in particular). **Check** `[aria-hidden="true"] :is(a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"]))` count 0; axe `aria-hidden-focus`. **Source** https://web.dev/learn/accessibility/aria-html

- **RULE [WDA-05]** Every interactive element has an accessible name before any other attribute is considered: link text, button text, `alt` on a linked image, an associated `<label>`. Verify in the accessibility tree.
  **Why** Without a name a screen reader announces just "button" or "link" and the control is unusable.
  **Applies to** all. **Check** axe `button-name`, `link-name`, `input-button-name`, `label`, `image-alt`, `select-name`, `aria-input-field-name`; Playwright `locator.ariaSnapshot()` shows a name for every `button`/`link`/`textbox`. **Source** https://web.dev/learn/accessibility/aria-html

- **RULE [WDA-06]** Avoid redundant or conflicting ARIA on elements that already carry the role (`ul role=list`, `summary role=button`, `nav role=navigation`, `form role=form`).
  **Why** Redundant roles add noise; on `summary` the override can break native expand/collapse announcement.
  **Applies to** all. **Check** `summary[role],nav[role=navigation],main[role=main],header[role=banner],footer[role=contentinfo],form[role=form]` count 0. **Source** https://web.dev/learn/accessibility/aria-html. [engine note] Exception: `ul[role=list]` is sometimes added deliberately when `list-style:none` makes Safari/VoiceOver drop list semantics; allow-list that one case only.

- **RULE [WDA-07]** Use HTML landmark elements; `section` and `form` become landmarks only when they have an accessible name, so name them or do not count on them. Have at least one landmark, one `main`.
  **Why** Landmark lists are a primary screen-reader navigation method.
  **Applies to** all. **Check** `main` count 1; `header,nav,main,footer,aside` present; `nav` siblings each have a distinct `aria-label`/`aria-labelledby`; axe `landmark-one-main`, `landmark-unique`, `region`. **Source** https://web.dev/learn/accessibility/structure

- **RULE [WDA-08]** Headings come from `h1-h6` elements in order, with no skipped levels; style the heading with classes independent of its level; never fake a heading with a styled div or `p`.
  **Why** AT users navigate by heading level; faked headings do not exist in the tree.
  **Applies to** all. **Check** axe `heading-order`, `empty-heading`; script: no element whose class matches `/\bh[1-6]\b|heading/` is a non-heading tag without `role=heading`; consecutive heading levels never jump by more than 1 descending (`A9`). **Source** https://web.dev/learn/accessibility/structure

- **RULE [WDA-09]** Group parallel items in real lists (`ul`, `ol`, `dl`) and never place `li` outside `ul/ol/menu`. A list-looking stack of divs or paragraphs is not a list.
  **Why** Lists announce count and position; it also helps users with attention or reading difficulties scan.
  **Applies to** nav, cards, features, footers. **Check** axe `list`, `listitem`, `definition-list`; selector `div.ul,li:not(ul>li,ol>li,menu>li)` count 0. **Source** https://web.dev/learn/accessibility/structure

- **RULE [WDA-10]** Data tables: header cells are `th`, tables get a `caption` (or a heading immediately before), complex tables add `scope`, row groups, `colgroup`. Layout tables must have no `th`/`caption` and be hidden from AT with `role=presentation`; prefer CSS grid or flex over layout tables.
  **Why** Header/cell relationships are what screen readers read while navigating cells.
  **Applies to** pricing comparisons, specs, dashboards. **Check** for each `table:not([role=presentation],[role=none])`: `th` count >= 1 and (`caption` or accessible name) present; axe `th-has-data-cells`, `td-headers-attr`, `scope-attr-valid`. **Source** https://web.dev/learn/accessibility/structure

- **RULE [WDA-11]** Each page (and each SPA route) gets a unique, descriptive `<title>` that puts the page-specific part first and the site name last, kept to roughly 55-60 characters.
  **Why** The title is the first thing announced; front-loading avoids repeating the site name every time; search engines truncate near 55-60 characters.
  **Applies to** all. **Check** `document.title` length <= 60, does not start with the site name unless it is the home page, differs between routes; in SPAs assert `document.title` changes after client-side navigation. **Source** https://web.dev/learn/accessibility/more-html

- **RULE [WDA-12]** Set `lang` on `<html>` to the page's primary language using a short code; mark foreign phrases with `lang` on a wrapper; never list multiple languages in the root `lang`.
  **Why** Screen readers pick pronunciation rules from it; a missing value reads text with the user's default voice.
  **Applies to** all. **Check** `html[lang]` matches `/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/`; axe `html-has-lang`, `html-lang-valid`, `valid-lang`. **Source** https://web.dev/learn/accessibility/more-html

- **RULE [WDA-13]** Every `iframe` that carries distinct content gets a `title` describing it (video embeds, maps, widgets).
  **Why** Frames are announced by title; untitled frames are unlabeled regions.
  **Applies to** embeds. **Check** `iframe:not([title])` count 0 (axe `frame-title`). **Source** https://web.dev/learn/accessibility/more-html. [engine note] The module also tells you to set `scrolling="auto"`; that attribute is obsolete HTML, skip it and rely on CSS `overflow`.

### 2.2 Keyboard and focus

- **RULE [WDA-14]** Provide a skip link as the first focusable element, with text that says where it goes ("Skip to main content"), visible (or revealed) on focus, targeting the `main` id.
  **Why** Repeated header navigation is expensive to tab through.
  **Applies to** any page with a header nav. **Check** `A4`: first Tab stop is `a[href^="#"]`; after Enter, `document.activeElement` or the scroll target is inside `main`; skip link is visible when focused. **Source** https://web.dev/learn/accessibility/focus

- **RULE [WDA-15]** Focus order must match the visual and reading order. Be careful with CSS `order`, `flex-direction: *-reverse`, grid placement and absolute positioning that detach visual order from DOM order.
  **Why** Jumping focus is disorienting for keyboard and screen magnifier users. The module also notes that RTL pages invert the expected direction.
  **Applies to** all. **Check** Playwright: press Tab N times, record `getBoundingClientRect()` of each focused element, assert the sequence is monotonic in reading order for the page direction (rows top to bottom, within row inline-start to inline-end), allow documented exceptions; no positive `tabindex`. **Source** https://web.dev/learn/accessibility/focus

- **RULE [WDA-16]** Never remove the focus indicator (`outline: 0|none`) without a visible replacement. Custom indicators can be any shape (outline, border, underline, background shift) but must not depend on colour alone and need 3:1 contrast against what they sit on.
  **Why** A sighted keyboard user otherwise cannot tell where they are.
  **Applies to** all. **Check** `A3`; CSS scan: any rule `:focus{outline:none|0}` without `box-shadow`, `border`, `background` or `text-decoration` in the same rule is a failure; computed focus style differs from unfocused. **Source** https://web.dev/learn/accessibility/focus. [engine note] The module calls the 3:1 target "Focus Appearance (Minimum)"; in WCAG 2.2 final that name does not exist, the 3:1 figure is from 1.4.11 Non-text Contrast, see section 5.

- **RULE [WDA-17]** Use a small number of focus-indicator styles, chosen per element type (for example dotted underline for in-text links, rounded outline for buttons), and keep them consistent across the page.
  **Why** Predictability; many competing focus looks cause confusion.
  **Applies to** design systems. **Check** count distinct computed focus signatures (`outline-style/width/color`, `box-shadow`) across focusables, expect <= 4. **Source** https://web.dev/learn/accessibility/focus

- **RULE [WDA-18]** Attach click behaviour to native `button`/`a` elements. If a non-semantic element must trigger an action, it needs role, `tabindex=0`, and both Enter and Space handling (keydown/keyup).
  **Why** Click handlers on divs work for mouse only; the keyboard activation comes free only with native controls.
  **Applies to** all interactive widgets. **Check** find elements with listeners/`onclick` that are not `a[href],button,input,select,textarea,summary,[role]` (DevTools `getEventListeners` in a Playwright evaluate) and fail; `A1`. **Source** https://web.dev/learn/accessibility/javascript

- **RULE [WDA-19]** In single-page apps, on route change update `document.title` and move focus deliberately: to the main container (with an `aria-live` announcement), to the skip link, or to the new top-level heading.
  **Why** Without a reload nothing tells a screen reader that the page changed.
  **Applies to** SPAs, Next/React routers. **Check** Playwright: click an internal link, assert `document.title` changed and `document.activeElement` is the new `h1[tabindex="-1"]`, `main[tabindex="-1"]` or skip link, or a live region received text. **Source** https://web.dev/learn/accessibility/javascript

- **RULE [WDA-20]** A modal must contain focus (Tab and Shift+Tab cycle inside) until dismissed, and focus returns to the trigger on close. Test that keyboard users can neither leave nor get trapped without a dismiss path.
  **Why** Background content must not be reachable while the modal is the only task; but no keyboard trap on non-modal UI.
  **Applies to** modal dialogs, drawers, lightboxes. **Check** `A15`. **Source** https://web.dev/learn/accessibility/javascript and https://web.dev/learn/accessibility/test-manual (keyboard checklist). [engine note] The module says JavaScript is essential for the trap; with native `dialog.showModal()` the browser does it, see `adrian-roselli.md` AR-21.

- **RULE [WDA-21]** Announce dynamic changes with a live region (`role=status`/`aria-live=polite` for FYI, `alert` for urgent). The region must be present in the DOM when the page loads and then have its text swapped; creating the region at the same moment as the message often fails. Framework "announcer" utilities exist for React, Angular and Vue.
  **Why** Assistive tech watches regions it already knows about.
  **Applies to** toasts, form status, filters, cart updates. **Check** `[role=status],[role=alert],[aria-live]` exist in server-rendered HTML for each place the app announces; Playwright sets text and reads the accessibility tree/mutation. **Source** https://web.dev/learn/accessibility/javascript

- **RULE [WDA-22]** Be selective with state attributes. Use `aria-expanded` for disclosure and `aria-pressed` for toggle buttons where the information changes what a user must do; do not sprinkle state attributes everywhere.
  **Why** Each exposed state is read aloud; unnecessary states are noise.
  **Applies to** widgets. **Check** `[aria-expanded]` only on button/summary-like controls; `[aria-pressed]` only on buttons (`:not(button,[role=button])` count 0). **Source** https://web.dev/learn/accessibility/javascript

### 2.3 Images, SVG, media

- **RULE [WDA-23]** Classify each image before coding it: decorative (hide it: `alt=""`, CSS background, or `role=presentation|none`), informative (describe what it conveys), functional (describe the action, e.g. "Search", "Home"), complex (short alt plus a long description elsewhere via a link, `aria-describedby`, or `figure`/`figcaption`).
  **Why** The right alternative depends on purpose, not on pixels. Hiding images and re-reading the page is a quick test: if the page still makes sense, they were decorative.
  **Applies to** all. **Check** `img:not([alt])` count 0 (`I1`); decorative has `alt=""`; `a > img[alt=""]` with no other link text fails; charts and infographics have an adjacent long description link. **Source** https://web.dev/learn/accessibility/images

- **RULE [WDA-24]** Keep alt text short and meaningful: aim under about 150 characters, no "image of / photo of" prefix, no keyword stuffing, proper punctuation, descriptive file names as a fallback. When in doubt about a decorative-vs-informative call, add the description because users can skip it but cannot invent it.
  **Why** Long alt text causes fatigue; screen readers already announce "image".
  **Applies to** all. **Check** `img[alt]` with `alt.length > 150` or `/^(image|photo|picture|graphic) of/i` flagged; `alt` equal to file name flagged (`I1`). **Source** https://web.dev/learn/accessibility/images (150 is the module's guideline, not a WCAG number, treat as soft).

- **RULE [WDA-25]** Inline SVG is silent by default. Informative SVG: `role="img"` plus an accessible name (`<title>` inside, or `aria-labelledby`). Decorative SVG: hide it. SVG inside a link needs the name on the link, via visually hidden text or `aria-label`/`aria-labelledby` on the link, not on the path.
  **Why** SVGs have no `alt`; without a role some AT skip them, and inside links they leave the link nameless.
  **Applies to** icons, logos, social links. **Check** `svg:not([aria-hidden="true"]):not([role="img"])` inside `a,button` with no text sibling fails; `a:has(> svg)` and `button:has(> svg)` have a non-empty accessible name (axe `link-name`/`button-name`). **Source** https://web.dev/learn/accessibility/images and https://web.dev/learn/accessibility/test-automated. [engine note] The module sometimes uses `role=presentation` on decorative SVG; `aria-hidden="true" focusable="false"` is the stricter option the existing rules use.

- **RULE [WDA-26]** Use real text rather than text baked into images (low-vision magnification pixelates it and AT cannot read it).
  **Why** Accessibility and translation.
  **Applies to** hero banners, badges, pricing screenshots. **Check** `visual`: OCR or manual scan of `img` heroes; flag any `img` whose natural alt equals long marketing copy. **Source** https://web.dev/learn/accessibility/typography

- **RULE [WDA-27]** Pre-recorded video needs captions (closed, so users can toggle and style them), a transcript (in-page, a linked accessible PDF, or a linked page), and an audio description where the visuals carry information. Audio-only needs a transcript. Do not rely on auto-captions for deaf users.
  **Why** Captions are for deaf and hard-of-hearing users; transcripts cover deafblind and slow readers; descriptions cover blind users.
  **Applies to** hero or product videos, tutorials. **Check** `video` has `track[kind="captions"]` (or captions on the hosted player) and a nearby link/section labelled "Transcript"; background video without audio: confirm `muted` and decorative. **Source** https://web.dev/learn/accessibility/video-audio

### 2.4 Colour, contrast, motion, type

- **RULE [WDA-28]** Contrast: 4.5:1 for normal text, 3:1 for large text and essential icons. The module's "large" threshold is 24px (18pt) or 18.5px bold (14pt); logos and decorative elements are exempt. Test over solid colours with tools, over gradients and images manually.
  **Why** Low contrast is the most common failure; automation cannot measure it over images.
  **Applies to** all. **Check** `A2`. **Source** https://web.dev/learn/accessibility/color-contrast. [engine note] Exact WCAG large-bold threshold is 14pt = 18.66px; the module rounds to 18.5, use 18.66.

- **RULE [WDA-29]** Do not communicate with colour alone: add text, icon, pattern or underline. Review the interface in grayscale as a quick check. Links inside text need a non-colour cue (underline is the default) or 3:1 contrast against the surrounding text plus an extra cue on hover and focus.
  **Why** Roughly 1 in 12 men and 1 in 200 women have colour vision deficiency; low-light and glare do the same temporarily.
  **Applies to** links, status badges, charts, form states. **Check** links within paragraphs: `text-decoration-line` underline OR contrast(link, parent text) >= 3 AND focus/hover adds a non-colour change; status chips contain text or icon, not only a coloured dot; grayscale screenshot comparison `visual`. **Source** https://web.dev/learn/accessibility/color-contrast and https://web.dev/learn/accessibility/test-manual

- **RULE [WDA-30]** Honour user colour preferences: `prefers-color-scheme` for light/dark and `prefers-contrast` for high contrast; layers of media queries may be combined. Dark mode helps light-sensitive and migraine users.
  **Why** Control for people with photophobia or contrast needs.
  **Applies to** all. **Check** CSS has both queries (or `light-dark()` and a `prefers-contrast: more` block); Playwright `emulateMedia({colorScheme:'dark'})` and `contrast:'more'` re-run `A2`. **Source** https://web.dev/learn/accessibility/color-contrast

- **RULE [WDA-31]** Never flash more than three times per second or below the general/red flash thresholds; test intense flashing or rapid light-dark transitions with PEAT. Non-essential moving, blinking or scrolling content that starts automatically and lasts over five seconds needs a pause/stop/hide control.
  **Why** Seizure risk (photosensitive epilepsy) and distraction (ADHD).
  **Applies to** hero animation, carousels, tickers, autoplay video. **Check** `A11`/`A12`. **Source** https://web.dev/learn/accessibility/motion

- **RULE [WDA-32]** Respect `prefers-reduced-motion`. The module goes further than "remove motion on request": consider defaulting to the reduced state and enabling animation only on `no-preference`, and offer an in-page toggle (default off) because OS settings are phrased inconsistently (Windows: "Show animations").
  **Why** You cannot predict which amount of motion triggers vestibular symptoms.
  **Applies to** all animation. **Check** with `reducedMotion:'reduce'` no running CSS animation/transition other than opacity or colour; `document.getAnimations()` filtered by transform/translate is empty. **Source** https://web.dev/learn/accessibility/motion

- **RULE [WDA-33]** Set font sizes in relative units (rem, em, %) so browser text-size preferences work, limit the stack of emphasis styles (colour, bold, caps, italic), use headings and lists to chunk text, keep line length under about 80 characters (40 for logographic scripts), and avoid justified text.
  **Why** Low vision, dyslexia and ADHD users lose their place in long lines and rivers of whitespace.
  **Applies to** all long-form text. **Check** `html`/`body` font-size not a px value below user default; `getComputedStyle(p).textAlign !== 'justify'`; paragraph measure <= 80ch (`L5`). **Source** https://web.dev/learn/accessibility/typography

- **RULE [WDA-34]** When picking type, check for ambiguous glyphs (uppercase I, lowercase l, digit 1; b/d, p/q) and the `rn` vs `m` kerning trap; avoid all-caps-only and ornate or handwritten faces for body copy. Common typefaces read faster for many readers with reading disabilities.
  **Why** Letter confusion reduces comprehension for people with dyslexia and low vision.
  **Applies to** body and UI faces, not necessarily display headlines. **Check** `visual`: render "Il1 O0 rn m" specimen in the UI font; verify tight tracking does not merge r and n. **Source** https://web.dev/learn/accessibility/typography. (opinion) The "choose common typefaces" advice is evidence-based but generic; see section 5.

### 2.5 Forms

- **RULE [WDA-35]** Build forms from native elements (`form`, `input`, `select`, `textarea`, `fieldset`/`legend`), not `div role=form`. Give every field a visible, persistent `<label>` programmatically associated to it, and group related fields with `fieldset`+`legend`.
  **Why** Native fields bring state, validation and keyboard behaviour; labels double as larger hit areas.
  **Applies to** forms. **Check** `A10`; axe `label`, `label-title-only`; `[role=form]` count 0; field groups (radios, address) inside `fieldset`. **Source** https://web.dev/learn/accessibility/forms

- **RULE [WDA-36]** A placeholder is not a label; it disappears and is not consistently exposed. Keep a real label.
  **Why** Used up as soon as typing starts, fails memory, autofill and some AT.
  **Applies to** forms, search, newsletter inputs. **Check** `input[placeholder]:not([type=hidden])` without associated `label[for]`/`aria-labelledby` count 0. **Source** https://web.dev/learn/accessibility/test-assistive-technology

- **RULE [WDA-37]** Add `autocomplete` tokens (name, email, tel, bday, etc.) to fields about the user. Fields must not trigger a change of context (auto-submit, navigation) just by receiving focus or input.
  **Why** Identify-purpose and fewer keystrokes help cognitive, motor and AT users; surprise context changes break expectations.
  **Applies to** contact, checkout, sign-up. **Check** `A10`; `change` event on select does not navigate. **Source** https://web.dev/learn/accessibility/forms

- **RULE [WDA-38]** Give hints and format requirements through `aria-describedby` on the control in addition to the label; do not put them in `aria-labelledby`, which overrides the label text.
  **Why** Description is read after name and role; labelledby replaces the label.
  **Applies to** password rules, date formats. **Check** every id in `aria-describedby` resolves (`[aria-describedby]` targets exist); inputs with a `label[for]` do not also carry `aria-labelledby` unless it includes the label id. **Source** https://web.dev/learn/accessibility/forms

- **RULE [WDA-39]** Errors: mark the field in error, describe the problem in text, suggest how to fix it, and confirm success after resubmission. Place error messages where they can be reached with focus and live-region announcement.
  **Why** WCAG 3.3.1, 3.3.3 and the module's own sequence: make the error known, then help correct it.
  **Applies to** forms. **Check** `A10`. **Source** https://web.dev/learn/accessibility/forms. [engine note] The module suggests `aria-required` as the way to deliver custom error text; that is incorrect usage. Use `required` plus visible text, and `aria-describedby` for messages.

- **RULE [WDA-40]** Link text must stand on its own: "Find out about our offers", not "click here" or bare "more". When a visible link text is not enough, add context without changing the visible words that voice users will speak.
  **Why** Screen reader users list links out of context; voice users say the visible name.
  **Applies to** all links and cards. **Check** link text blacklist `/^(click here|here|more|read more|learn more)$/i` flagged unless `aria-describedby`/`aria-labelledby` includes the visible text; axe `link-name`. **Source** https://web.dev/learn/accessibility/test-manual and https://web.dev/learn/accessibility/test-assistive-technology. [engine note] See section 5 for the module's `aria-label` example that violates label-in-name.

### 2.6 Process and testing

- **RULE [WDA-41]** Run the three test layers in order: automated (axe/Lighthouse), manual (keyboard walk with Tab, Shift+Tab, arrows, Space, Enter, Esc; visual checks including zoom and spacing; content checks), then assistive technology. Never treat a Lighthouse 100 as accessible.
  **Why** Automation covers only a minority of success criteria and flags false positives.
  **Applies to** release gate. **Check** pipeline stages `A1` (axe), keyboard script (`A3`,`A4`,`A15`), manual screen reader pass recorded in the ledger. **Source** https://web.dev/learn/accessibility/test-automated, https://web.dev/learn/accessibility/test-manual, https://web.dev/learn/accessibility/test-assistive-technology

- **RULE [WDA-42]** Pair screen readers with the browsers they were built for: JAWS (Chrome, Firefox, Edge), NVDA (Chrome, Firefox), Narrator (Edge), VoiceOver macOS/iOS (Safari), TalkBack (Chrome, Firefox), Orca (Firefox), ChromeVox (Chrome). Use element-list/rotor commands (landmarks, headings, links, form controls, tables) to verify structure.
  **Why** Mismatched pairs show bugs real users will not meet.
  **Applies to** manual verification. **Check** manual; record pairing in test log. **Source** https://web.dev/learn/accessibility/test-assistive-technology

- **RULE [WDA-43]** Before building a widget, look for an established accessible pattern (Inclusive Components, GOV.UK Design System, USWDS, APG, Deque library, Accessible Components, MagentaA11y) and then still test it. Never paste "accessible" code and assume it fits.
  **Why** Patterns assume particular browsers, AT, markup and content constraints.
  **Applies to** component work. **Check** process: note the reference pattern in the component spec; run the component keyboard contract (`A15`). **Source** https://web.dev/learn/accessibility/patterns

- **RULE [WDA-44]** Attach accessibility annotations to design hand-offs: colour contrast pairs, button/link state set (default, hover, active, focus, disabled), skip link visible/hidden states, alt text for essential images, captions and transcript locations, heading levels, landmarks, tab order and initial focus, form labels/help/errors/success, accessible names.
  **Why** Design-stage decisions prevent late bugs; developers cannot infer intent from pixels.
  **Applies to** Figma/design hand-off, brief-to-render pipeline. **Check** process; spec file has a "states" and "focus order" block per component (see `component-accessible-anatomy.md`). **Source** https://web.dev/learn/accessibility/design-ux

## 3. Numbers & scales

| Item | Value in module | Note |
|---|---|---|
| Contrast, normal text | 4.5:1 | WCAG 1.4.3 AA |
| Contrast, large text and essential icons | 3:1 | large = 18pt/24px, or 14pt/18.5px bold (true value 18.66px) |
| Contrast formula | (L1+0.05)/(L2+0.05), range 1 to 21 | |
| Focus indicator | 3:1 contrast | module attributes this to "Focus Appearance (Minimum)", see section 5 |
| Non-underlined link vs surrounding text | 3:1 | plus non-colour change on hover/focus |
| Flash limit | no more than 3 per second | and below general/red flash thresholds |
| Auto-moving content | pause control if starts automatically and lasts more than 5 s | |
| Alt text length | about 150 characters or less | module guideline |
| Page title length | 55-60 characters shown by search engines | |
| Line length | under 80 characters (40 for logograms) | |
| Touch target | module only says "larger targets" for older users; numbers live in WCAG 2.5.8 (24 px) / 2.5.5 (44 px) | not specified here |
| WCAG counts quoted | 30 A + 20 AA + 28 AAA = 78 | these are WCAG 2.1 counts, see section 5 |
| Color blindness prevalence | 1 in 12 men, 1 in 200 women | |
| Disability prevalence | over 15% of world population, about 1.3 billion | |
| Keyboard issues | about 25% of accessibility issues | |
| Lighthouse demo score | 62 before, 100 after fixes | demonstrates limits of score |
| Demo contrast fixes | #01aa9d on white = 2.9:1; #7c7c7c = 4.2:1; fixes #008576 and #767676 = 4.5:1 | #767676 is the classic lightest grey on white that passes AA |
| Deque stat | up to 67% of bugs avoidable at design stage | |

## 4. Dos and Don'ts

- Don't: `<a role="button">Submit</a>`. Do: `<button>Submit</button>`.
- Don't: `<h2 role="tab">`. Do: `<div role="tab"><h2>...</h2></div>`.
- Don't: `<span role="button" tabindex="1">`. Do: a real button, or `tabindex="0"` plus key handling.
- Don't: `<div aria-hidden="true"><button>Submit</button></div>`. Do: expose focusable controls.
- Don't: `<ul role="list">` or `<summary role="button">`. Do: plain native elements.
- Don't: `a:focus { outline: none }`. Do: restore a styled outline or alternative.
- Don't: `<title>Site | Section | Page</title>`. Do: `<title>Page | Section | Site</title>`.
- Don't: `<html>` with no `lang`, or `lang="ar,en,fr"`. Do: one primary language and `lang` on foreign spans.
- Don't: `<iframe src=...>` without `title`. Do: add a `title`.
- Don't: a table of `td` header cells, or a `th` in a layout table. Do: `th` + `caption` for data; `role=presentation` for layout.
- Don't: `<div class="ul"><li>`. Do: real `ul`.
- Don't: `<p class="h1">Join the Club</p>`. Do: `<h1>`.
- Don't: placeholder in place of a label. Do: visible `<label for>`.
- Don't: `h2 { font-size: 16px }`. Do: `1rem`.
- Don't: link text "click here". Do: describe the destination.
- Don't: "photo of a ladybug" or "bugs" as alt. Do: short sentence stating what the image shows.
- Don't: large justified paragraphs. Do: left-aligned, under 80 characters wide.
- Don't: set `aria-hidden` on a decorative paragraph that contains real text (module's bullet-decoration example). Do: `role=none` on a purely decorative wrapper, or fix the CSS bullet.
- Don't: tabindex on the email field plus `aria-hidden` on the same input (demo mistakes). Do: remove both so the field is focusable and announced.

## 5. Exceptions & judgement calls

Conflicts and gaps compared with `../web/implementation-craft.md` section 2.7 and `measurable-assertions.md` (flagged, do not silently overwrite):

1. **Focus indicator naming and numbers.** [engine note] The module cites "Focus Appearance (Minimum)" at 3:1. WCAG 2.2 AA has 2.4.7 Focus Visible and 2.4.11 Focus Not Obscured; 2.4.13 Focus Appearance is AAA. The 3:1 contrast need for indicators comes from 1.4.11. Existing rule (>= 2 px outline, 3:1) is consistent with the numbers, but do not cite the module for the SC name.
2. **WCAG counts.** [engine note] The module says WCAG 2.2 has 78 success criteria (30/20/28). Those are WCAG 2.1 totals. 2.2 added nine and removed 4.1.1 Parsing; verify the 2.2 figures before quoting any count.
3. **Large-text threshold.** Module: 18.5px bold. WCAG precise: 14pt = 18.66px. Existing implementation-craft uses 18.66; keep that.
4. **Automated-module example `aria-label` on a link.** The assistive-technology module fixes link context with `aria-label` whose text does not begin with the visible text, which can fail 2.5.3 Label in Name and does not translate or reach voice users. See `adrian-roselli.md` AR-27/AR-28. Prefer visible context or `aria-describedby`.
5. **Invalid markup in module examples.** `<input type="name">`, `scrolling` on iframe, and "aria-required to share a custom error message" are not good practice. Existing rule A10 (label, `aria-invalid`, `aria-describedby`) stands.
6. **Decorative SVG.** Module uses `role=presentation` in places; existing rule uses `aria-hidden="true" focusable="false"`. Both hide the graphic; `aria-hidden` also removes children (careful if the SVG is inside text). Keep the existing rule.
7. **Typeface advice vs creative direction.** (opinion) "Pick common typefaces such as Arial" is conservative. The engine uses expressive fonts; treat it as a legibility check (ambiguous glyphs, tracking, size) rather than a font ban. Body copy in highly ornate or all-caps-only faces still fails the spirit.
8. **JavaScript focus trap.** Module treats JS as essential for modal focus; with `dialog.showModal()` it is native (existing implementation-craft rule: do not add a second trap).
9. **Motion default.** Module suggests defaulting to reduced motion. Existing rule says reduced-motion removes parallax/zoom/etc. and keeps functional feedback. Compatible; the module is stricter about defaults. For landing pages with brand motion, honour the media query and add a control; do not ship default-off animation unless the brief says so.
10. **Skip link target and landmark rules** corroborate existing rules; no conflict.

## 6. Figures worth keeping

No page images were captured. Demos worth recreating as fixtures: the Medical Mysteries Club inaccessible page (Lighthouse 62 to 100, then manual and screen-reader fixes) is a good seeded-defects test page for `A1`/`A3` evaluators. The accessibility-annotations examples (Indeed Figma kit: action button states, alt text callouts, input label callouts) are good references for the `component-accessible-anatomy.md` "states" blocks.

## 7. Open questions

- Quizzes for each module (not fetched).
- 2.5.8 Target Size and other 2.2 criteria are only mentioned by name in the forms module; use WCAG 2.2 directly for numbers.
- The module's "Learn Forms" accessibility page was not part of this assignment (`web.dev/learn/forms`), queued in `../web/ingestion-queue.md` as B4.
- `p.NN: no rule content`: welcome, conclusion, glossary, why (impact statistics only, captured in section 3 and core ideas).
