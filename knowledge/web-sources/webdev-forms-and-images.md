---
source: web:https://web.dev/learn/forms + https://web.dev/learn/images (+ web.dev lazy-loading, iframe lazy-loading, preload-responsive-images, replace-gifs-with-videos, image CDNs articles)
chapter: web.dev Learn Forms (24 modules) and Learn Images (17 modules), plus supporting image articles
pages: n/a
topic_tags: [forms, validation, autofill, autocomplete, inputmode, mobile, password, security, privacy, i18n, testing, images, srcset, sizes, picture, avif, webp, jpeg, png, svg, lazy-loading, fetchpriority, cdn, video]
status: studied
---

# web.dev Learn Forms and Learn Images

Fetched 2026-10-08; raw text in `corpus/web/webdev-css/` (private, gitignored). Text CC BY 4.0, code Apache 2.0; notes are paraphrase.

Forms modules read (24): welcome, form-element ("Use forms to get data"), form-fields, auto (avoid re-entering data), validation, design-basics, accessibility, internationalization, security-privacy, autofill, usability-testing, cross-platform-testing, data (gathering), form (element in depth), fields, attributes, styling, styling-form-controls, javascript, identity, payment, address, testing, conclusion. `forms/card` is a 404 nav stub.
Images modules read (17): welcome, history, performance-issues, vector-images, raster-images, gif, png, jpeg, webp, avif, responsive-images, descriptive, prescriptive, automating, cms, cdn, conclusion. `images/card` 404 stub. Extra articles read for images: browser-level lazy loading (web.dev/articles/browser-level-image-lazy-loading), iframe lazy loading, preload responsive images, replace GIFs with video, image CDNs.

Related: `webdev-learn-css.md` (form control typography WCSS-55; custom validation CSS), `webdev-learn-accessibility.md` (the other agent's note on the Learn Accessibility forms module), `webdev-performance-for-marketing.md` (LCP/CLS mechanics), `../web/implementation-craft.md` sections 2.4, 2.7.

Evidence: **[verified-C156]** = executed in Chromium 156.0.8078.4 with Playwright on 2026-10-08 (`corpus/web/webdev-css/_tests/verify.mjs`, 25/25 pass). **[source]** stated by the page. **[engine note]** mine.

---

## 1. Core ideas

1. **Forms are the conversion event; a `<form>` is the cheapest accessible, validated, submit-on-Enter machinery you have.** Use the native element and native controls; replace only the pieces you can prove.
2. **Every control has a visible, persistent `<label>`.** The label is also a bigger tap target. Placeholder text is a hint about format, never the name. Add the label first, then the input; short labels scan faster ("Email address").
3. **Help the browser help the user.** `type`, `inputmode`, `name`/`id`, `autocomplete` tokens and `enterkeyhint` drive on-screen keyboards, autofill, password managers and OTP suggestions. These are free conversion wins.
4. **Ask for less.** Each field removed lowers abandonment, risk and liability. One name field, one card-number field, one street-address field, an optional postal code.
5. **Do not disable submit to enforce validity.** Show errors next to fields and move focus to the first invalid one; disable the button only after a valid submission to block double posts.
6. **Colour never carries state alone.** Pair red/green with text and an icon.
7. **Test forms with people and with a keyboard, a phone, a screen reader, slow networks and bright sunlight.** Automated tools (Lighthouse, WAVE, axe, a form troubleshooter extension) find common issues, not all.
8. **Images are the largest share of bytes and the likely LCP element.** The single most effective level: serve the right pixels in the right format, reserve their space, load only what is near the viewport, and never lazy-load the LCP image.
9. **`srcset` and `sizes` describe, they do not command.** `srcset` lists candidates and their intrinsic widths; `sizes` says how wide the slot will be; the browser picks using DPR, viewport and its own heuristics. `<picture>` is for explicit control: art direction and format negotiation.
10. **Automate encoding.** Master files stay as canonical PNG/TIFF; a build step or image CDN produces AVIF/WebP/JPEG at several widths; `sizes` is the one thing tools cannot know without rendering.

---

## 2. Rules: forms (`WFRM-nn`)

### 2.1 Structure, labels, hints

- **RULE [WFRM-01]** Every `input`, `select`, `textarea` has a visible `<label for>` (or wrapping label), placed above the control; keep label text short ("Email address" over "Enter your email address").
  **Why** Screen readers announce it, tap/click on it focuses the control, and research cited by the course favours top labels for scan speed.
  **Applies to** forms. **Check** axe `label`; Playwright: for each control `label.getBoundingClientRect().bottom <= control.top + 2` at 390 px width; no control with only `placeholder` or `aria-label` (`A10`). **Source** https://web.dev/learn/forms/design-basics

- **RULE [WFRM-02]** Never use `placeholder` as the label or to explain the field; put format help in an element beneath the control and link it with `aria-describedby`.
  **Why** Placeholder vanishes on typing, looks prefilled, defaults to low contrast and makes it hard to see which fields remain.
  **Applies to** forms. **Check** static: `[placeholder]` controls all have a label; computed placeholder colour contrast >= 4.5 if kept (`::placeholder`). **Source** https://web.dev/learn/forms/attributes

- **RULE [WFRM-03]** Group related controls (radios, checkboxes, address blocks) in `<fieldset>` with a `<legend>` as its first child.
  **Why** The legend names the group for assistive tech, just as the label names a control.
  **Applies to** forms. **Check** axe `radiogroup`; Playwright: every radio group sits inside a fieldset with a non-empty legend. **Source** https://web.dev/learn/forms/form-fields

- **RULE [WFRM-04]** State the rules and requirements in text before the user trips on them ("Password (required)", "Enter at least eight characters") and mark required fields in text; if most fields are required, mark the optional ones instead.
  **Why** Surprise constraints cause failed submits; colour or asterisks alone are weak signals.
  **Applies to** forms. **Check** Playwright: each `[required]` control's label text or description contains "required" (or the form marks optional ones); `aria-describedby` target exists. **Source** https://web.dev/learn/forms/design-basics

- **RULE [WFRM-05]** Use one column. Make the DOM order the visual order.
  **Why** One direction to follow; research cited by the course; reordering by CSS breaks keyboard and screen-reader order.
  **Applies to** forms, mobile. **Check** Playwright: x-centres of all controls differ by <= 2 px inside a form at 390 px and 1280 px; tab sequence equals top-to-bottom order (`A4`). **Source** https://web.dev/learn/forms/design-basics

### 2.2 Types, keyboards, autofill

- **RULE [WFRM-06]** Pick the most specific control: `type=email|tel|url|date|search|password`, `<textarea>` for multi-line, radios or `<select>` for single choice, checkboxes or `<select multiple>` for multiple; use `<datalist>` for text-plus-suggestions.
  **Why** The type decides the keyboard, validation rule and widget.
  **Applies to** forms, mobile. **Check** static: `input[name*=email]` has `type=email`; `input[name*=phone],[name*=tel]` has `type=tel` (`A10`). **Source** https://web.dev/learn/forms/fields

- **RULE [WFRM-07]** Use `type="number"` only for incremental quantities; for card numbers, phone numbers, ZIP and security codes use `type="text"` (or `tel`) with `inputmode="numeric"`.
  **Why** Number inputs add spinner arrows, strip leading zeros, and break autofill and pasting of spaced numbers.
  **Applies to** forms, payment. **Check** static: `input[type=number]` name does not match `/card|cc|phone|tel|zip|postal|cvv|code/i`. **Source** https://web.dev/learn/forms/attributes

- **RULE [WFRM-08]** Add the right `autocomplete` token on every identity, address, credential and payment field: `name`, `email`, `tel`, `street-address`, `postal-code`, `country` (for a select with ISO codes) or `country-name`, `new-password`, `current-password`, `one-time-code`, `cc-name`, `cc-number`, `cc-exp`, `shipping`/`billing` prefix. Use `autocomplete="off"` only for one-time codes and honeypots.
  **Why** Browsers use `name`, `id`, `type` and `autocomplete` heuristics to autofill; `autocomplete` also serves WCAG 1.3.5. Password managers ignore `off` on password fields on purpose.
  **Applies to** forms. **Check** Playwright: `[...document.querySelectorAll('input,select,textarea')].filter(e=>!e.autocomplete || e.autocomplete==='').length` is 0 for identity/address/payment controls; no `autocomplete="off"` on password. **Source** https://web.dev/learn/forms/autofill

- **RULE [WFRM-09]** Add `enterkeyhint` (`next` on intermediate fields, `done`/`go`/`search` on the last) and do **not** add `autofocus`.
  **Why** The hint relabels the Enter key; `autofocus` confuses screen-reader and cognitively impaired users.
  **Applies to** forms, mobile. **Check** `document.querySelectorAll('[autofocus]').length === 0`. **Source** https://web.dev/learn/forms/attributes

- **RULE [WFRM-10]** Style autofilled fields with `:autofill` (and `:-webkit-autofill`) so autofill colours do not destroy contrast.
  **Why** Browsers paint autofilled fields in their own colours.
  **Applies to** forms. **Check** Playwright with Chrome autofill is not scriptable; static: stylesheet contains `:autofill` or `:-webkit-autofill` for dark themes [engine note]. **Source** https://web.dev/learn/forms/autofill

### 2.3 Fields to design for real people

- **RULE [WFRM-11]** Use a single field for full name, a single field for the card number, and a single field for street address; allow any Unicode in names; make postal code optional and label it "ZIP or postal code".
  **Why** Not everyone has a surname or two name parts; not all addresses have a number or postcode; split fields break autofill and typing flow.
  **Applies to** forms, address, payment. **Check** static: fields named `first_name`/`last_name`/`address2` flagged for review; no `pattern` restricting names to `[A-Za-z]`. **Source** https://web.dev/learn/forms/address

- **RULE [WFRM-12]** Hide "Address line 2" behind a reveal button or use one `<textarea>` for the whole address.
  **Why** Research cited by the course: line 2 confuses users.
  **Applies to** address. **Check** static review. **Source** https://web.dev/learn/forms/address

- **RULE [WFRM-13]** Payment forms: show only required fields, use plain labels ("Security code", not "CVV"), put the amount on the submit button ("Pay $300.00"), use `inputmode="numeric"`, `autocomplete="cc-*"`, `required`, `pattern="[0-9 ]+"` (allow spaces), `minlength=3`/`maxlength=4` for the security code, and never ask for card type (derive it from the number).
  **Why** Fewer decisions, correct keyboard, autofill and format tolerance.
  **Applies to** payment. **Check** Playwright: submit button text contains a currency amount; card input `inputmode=numeric` and `autocomplete=cc-number`. **Source** https://web.dev/learn/forms/payment

- **RULE [WFRM-14]** Sign-up: ask the minimum, do not double up fields to "confirm", send a confirmation email instead; offer guest checkout by default; prefer a third-party identity provider; offer multi-factor auth; do not force periodic password changes.
  **Why** Each added field loses people; complex custom auth is a security liability.
  **Applies to** forms, SaaS app UI. **Check** count of required fields at first step <= 3 for marketing sign-ups [engine note]; no duplicate-email or duplicate-password inputs. **Source** https://web.dev/learn/forms/identity

- **RULE [WFRM-15]** Allow pasting into every field including passwords; offer a reveal-password `<button type="button">` wired with `aria-controls` and a visually hidden `aria-live="polite"` status; use `autocomplete="new-password"`/`current-password`; hide Edge's native reveal (`::-ms-reveal{display:none}`) if you add your own.
  **Why** Blocking paste pushes people toward memorable (weak) passwords; a second reveal icon is confusing.
  **Applies to** forms. **Check** Playwright: paste into the password field works (dispatch a paste event, value changes); reveal button has `type=button` and toggles `input.type`. **Source** https://web.dev/learn/forms/identity and https://web.dev/learn/forms/javascript

### 2.4 Validation and errors

- **RULE [WFRM-16]** Use native validation attributes first (`required`, `type`, `minlength`/`maxlength`, `min`/`max`, `pattern`); show the browser or custom message beside the field; on submit with errors, move focus to the first invalid control.
  **Why** Built-in validation is free, localised and accessible; custom wording is optional polish. Browser messages differ per browser and language.
  **Applies to** forms. **Check** Playwright: submit empty form, `document.activeElement` is the first `:invalid` control and `validationMessage` is non-empty (`A10`). **Source** https://web.dev/learn/forms/validation

- **RULE [WFRM-17]** When you override messages with `setCustomValidity()`, clear it with `setCustomValidity('')` as soon as the value changes or the field becomes valid.
  **Why** The course snippet sets the message inside the `invalid` handler and never resets it, so the field stays invalid forever. [verified-C156: after fixing the value, `checkValidity()` stayed false until `setCustomValidity('')` was called.]
  **Applies to** forms. **Check** Playwright: type an invalid value, then a valid one, `checkValidity()` must be true; static: every `setCustomValidity(` with non-empty argument is paired with a `setCustomValidity('')` path. **Source** https://web.dev/learn/forms/validation (bug), https://web.dev/learn/forms/javascript

- **RULE [WFRM-18]** Style invalid state with `:user-invalid` (after interaction), not `:invalid`; show errors as text plus icon, connect with `aria-describedby`, optionally announce with `aria-live`; for several errors concatenate into one live message or announce a count then per-field text.
  **Why** `:invalid` matches an untouched required field on load; `aria-live` often announces only the first of many changes. [verified-C156: `.f:has(input:user-invalid) .err` stayed hidden on load and showed after real typing plus Tab; programmatic value assignment did not trigger `:user-invalid`.]
  **Applies to** forms. **Check** Playwright: no error text visible on load; after interaction, the error element is visible, contains text, and the control has `aria-describedby` pointing at it. **Source** https://web.dev/learn/forms/validation and https://web.dev/learn/forms/accessibility

- **RULE [WFRM-19]** Do not disable the submit button while waiting for valid input; use an action label ("Proceed to payment", "Save changes"); disable (or set `aria-busy`) only after a valid submit to prevent double requests; do not add form timeouts.
  **Why** A disabled button hides why nothing happens; timeouts cause data loss.
  **Applies to** forms. **Check** Playwright: `form.querySelector('[type=submit],button:not([type])').disabled === false` on load with empty fields. **Source** https://web.dev/learn/forms/attributes and https://web.dev/learn/forms/form

- **RULE [WFRM-20]** Buttons inside a `<form>` default to `type=submit`; give toggles and helpers `type="button"`.
  **Why** A reveal-password or "add address line" button without a type submits the form. [verified-C156: `button.type` is `submit` by default.]
  **Applies to** forms. **Check** static: `form button:not([type])` count equals the number of intended submit buttons (1). **Source** https://web.dev/learn/forms/form-fields

- **RULE [WFRM-21]** When showing or hiding dependent fields, keep them out of the tab order while hidden and wire `aria-controls`/`aria-expanded` on the trigger; do not rely on `aria-expanded` on a radio (not announced by every reader).
  **Why** Hidden fields in tab order trap keyboard users; support for `aria-expanded` on radios is inconsistent.
  **Applies to** forms. **Check** Playwright: hidden fields are `display:none` or `hidden` (not just `opacity:0`) so Tab skips them. **Source** https://web.dev/learn/forms/javascript

### 2.5 Mobile ergonomics and styling

- **RULE [WFRM-22]** Controls and buttons are at least 48 px tall on touch; form font-size at least `1rem` (16 px), the sign-in module suggests about 20 px on mobile with `padding` of at least 15 px; leave space between controls; enlarge checkboxes with `@media (pointer: coarse)` (the course shows 15 px fine vs 30 px coarse).
  **Why** Accidental taps; iOS Safari zooms the page when a focused control's font is below 16 px.
  **Applies to** mobile, forms. **Check** Playwright at 390 px with `hasTouch`: every `input, select, textarea, button` height >= 44 (hard) / 48 (soft); computed font-size >= 16 (`A10`, `L7b`). **Source** https://web.dev/learn/forms/design-basics, https://web.dev/learn/forms/identity

- **RULE [WFRM-23]** Do not remove `textarea` resizing; use `resize: vertical`. Use `field-sizing: content` as an enhancement only (see `chrome-css-ui-new-apis.md`).
  **Why** Disabling resize is a bad UX; vertical keeps the layout.
  **Applies to** forms. **Check** computed `resize` on textarea is `vertical` (or `both`), not `none`. **Source** https://web.dev/learn/forms/fields

- **RULE [WFRM-24]** Style controls so they look like controls: a visible solid 1 px border (default borders are too light), readable `font-size`/`line-height`, a clear `:focus-visible` outline (the course uses `outline: 4px solid`), `accent-color` for simple checkbox/radio/range tinting.
  **Why** Controls must be recognisable; border contrast must reach 3:1 (WCAG 1.4.11).
  **Applies to** forms. **Check** Playwright: border colour vs background >= 3:1 (`A2`); focus ring visible (`A3`). **Source** https://web.dev/learn/forms/styling, https://web.dev/learn/forms/styling-form-controls

- **RULE [WFRM-25]** Custom checkbox/radio: hide the real input visually with `position:absolute; opacity:0` (never `display:none` or `visibility:hidden`), keep it overlaid on the custom visual, and draw the visual from `input + label::before` with `:checked` and `:focus-visible` states.
  **Why** `display:none` removes it from the accessibility tree and keyboard.
  **Applies to** forms. **Check** Playwright: `getComputedStyle(input).display !== 'none'` and it is focusable; checked state toggles on click and Space. **Source** https://web.dev/learn/forms/styling-form-controls

- **RULE [WFRM-26]** Select styling: `appearance: none` plus your own arrow background and padding; keep `font-size >= 1rem`; `<option>` cannot be styled in the course (today `appearance: base-select` customisation exists; see the Chrome note). Do not trap users with custom comboboxes you have not tested.
  **Why** Cross-browser consistency vs. native affordances.
  **Applies to** forms. **Check** visual; Playwright: select remains keyboard operable. **Source** https://web.dev/learn/forms/styling-form-controls

### 2.6 Security, privacy, i18n, testing

- **RULE [WFRM-27]** Serve pages with forms over HTTPS only (redirect HTTP), submit with `POST` for anything personal, never send secrets in a query string, validate and sanitise again on the server, and use an accessible spam defence (visually hidden honeypot with `autocomplete="off"`, or an accessible CAPTCHA; test with keyboard and screen reader).
  **Why** `GET` data lands in history and logs; client validation can be bypassed.
  **Applies to** forms. **Check** Playwright: `form.action` starts with `https:`; `form.method === 'post'` if it holds `type=password|email|tel`; request to the action URL has no personal data in the URL. **Source** https://web.dev/learn/forms/security-privacy

- **RULE [WFRM-28]** Collect the minimum, say what you do with it, link the privacy policy on every page with a form, and let users edit, export and delete their data.
  **Why** GDPR/CCPA/PDPA; trust.
  **Applies to** forms. **Check** `a[href*=privacy]` present within the form's section; consent checkbox is not pre-checked [engine note]. **Source** https://web.dev/learn/forms/security-privacy

- **RULE [WFRM-29]** Prepare forms for translation and other scripts: `lang` on `<html>`, `hreflang` alternates, visible text in HTML (not `aria-label` for visible labels; translators often skip it), logical CSS properties, single name field, flexible address formats; test with `dir="rtl"` and a translation pass.
  **Why** Translation tools and RTL users otherwise lose labels or layout.
  **Applies to** forms. **Check** `S7` RTL run passes `L1`; `html[lang]` valid (`A9`). **Source** https://web.dev/learn/forms/internationalization

- **RULE [WFRM-30]** Keep fixed bottom submit bars visible with `env(safe-area-inset-bottom)` (and `viewport-fit=cover`), not hidden behind browser toolbars.
  **Why** The primary action can be off-screen on phones.
  **Applies to** mobile. **Check** Playwright mobile emulation: submit button rect inside `window.innerHeight` after focus. **Source** https://web.dev/learn/forms/cross-platform-testing

- **RULE [WFRM-31]** Test every form with: keyboard only, a phone, 200% zoom, a screen reader (NVDA, VoiceOver), slow network emulation, and outdoors/bright light for contrast; also run Lighthouse, axe/WAVE and the form-troubleshooter extension; then add analytics events and a goal funnel for abandonment, with alerts for sudden drops.
  **Why** Tools find only common issues; real people find the rest. Use one to five real testers.
  **Applies to** forms. **Check** CI: axe plus the keyboard script; manual gate documented in release checklist. **Source** https://web.dev/learn/forms/testing, https://web.dev/learn/forms/usability-testing, https://web.dev/learn/forms/data

---

## 2. Rules: images (`WIMG-nn`)

- **RULE [WIMG-01]** Choose format by content: photographs get AVIF (best), WebP (safe modern), progressive JPEG (universal fallback); icons, logos and line art get SVG; PNG only for simple semi-transparent artwork or as the archived master; never GIF for animation (use MP4/WebM).
  **Why** Lossy block/prediction codecs describe gradients cheaply; PNG and GIF are lossless/palette formats that balloon on photos. AVIF support per the course: Chrome and Opera 2020, Firefox 2021, Safari 2022.
  **Applies to** all. **Check** `I6`: no `<img>` photo > 100 KB served as PNG or JPEG without a modern alternative; Playwright response content-types for images. **Source** https://web.dev/learn/images/jpeg, /png, /webp, /avif, /gif

- **RULE [WIMG-02]** Always put `width` and `height` on `<img>` (and on `<source>` when ratios differ) equal to the intrinsic size, and keep `max-width:100%; height:auto` in CSS.
  **Why** Since 2019 browsers derive `aspect-ratio: auto w / h` from the attributes and reserve space before load; no downside. [source]
  **Applies to** all. **Check** `I2`: every `img` has both attributes or CSS `aspect-ratio`; layout-shift entries during load from images = 0. **Source** https://web.dev/learn/images/performance-issues, https://web.dev/learn/images/prescriptive

- **RULE [WIMG-03]** Never `loading="lazy"` above the fold; lazy-load everything else; put `fetchpriority="high"` on the LCP image only (one or two images), `fetchpriority="low"` on visually hidden early images (carousel slides 2+).
  **Why** Lazy loading defers the request until layout confirms the image is near the viewport; Chrome's thresholds are about 1250 px (4G) and 2500 px (3G), reduced in 2020 from 3000/4000 px, and carousels use the same thresholds since Chrome 121. Experiments: on 4G 97.5% of lazy images were loaded within 10 ms of becoming visible.
  **Applies to** all. **Check** `I3`/`I4`: LCP image has no `loading=lazy` and has `fetchpriority=high`; below-fold images lazy. **Source** https://web.dev/learn/images/performance-issues and https://web.dev/articles/browser-level-image-lazy-loading

- **RULE [WIMG-04]** `loading="lazy"` images still need `width` and `height` (or CSS size).
  **Why** Without dimensions all lazy images collapse to 0x0 and fall inside the lazy-load window, so they all load immediately and shift layout.
  **Applies to** all. **Check** Playwright: every `[loading=lazy]` image has non-zero rendered size before it loads (route blocked). **Source** https://web.dev/articles/browser-level-image-lazy-loading

- **RULE [WIMG-05]** Use `srcset` with `w` descriptors plus an accurate `sizes` for fluid images; use `x` descriptors only for fixed-width images; all candidates share one aspect ratio; supply a real `src` fallback.
  **Why** The browser divides each candidate width by the slot width to get an effective DPR; with a missing `sizes` it assumes `100vw`. Candidates are descriptions of the file, not instructions; the browser may pick a smaller one on slow data and will not refetch smaller than a cached one. Overloading `srcset` is harmless.
  **Applies to** all. **Check** `I5`, `I7`: `img[srcset*=" "w]` has `sizes`; chosen `currentSrc` width >= slot width x min(DPR,2) x 0.9. **Source** https://web.dev/learn/images/descriptive

- **RULE [WIMG-06]** `sizes` is first-match: list the largest-breakpoint condition first for `min-width`, and write `calc()` with spaces around `+`/`-`.
  **Why** `calc(100vw-2em)` is invalid, the whole attribute is ignored and the browser assumes `100vw`. [verified-C156: with `sizes="calc(50vw - 2em)"` at a 1000 px viewport the 600w candidate was chosen; with `calc(50vw-2em)` the 1200w candidate was chosen. The course's own sample has the typo.]
  **Applies to** all. **Check** Playwright: `CSS.supports('width', calcExpression)` for each `sizes` entry; static regex for `calc\([^)]*[a-z%0-9]-[0-9a-z]`. **Source** https://web.dev/learn/images/descriptive
  **Note** respImageLint is a bookmarklet that suggests correct `sizes` from the rendered layout; `sizes="auto"` is only valid with lazy-loaded images and is Chrome 126+/Firefox 150+/Safari 27 per `implementation-craft.md`.

- **RULE [WIMG-07]** Use `<picture>` for (a) art direction (different crop or ratio via `media`) and (b) format negotiation via `type`; put the `<img>` last as the default; with `min-width` queries put the largest first, with `max-width` put the smallest first; use `prefers-color-scheme` sources for light/dark art.
  **Why** The first matching `<source>` wins; unsupported `type` sources are discarded without a request, unlike the old `onerror` fallback. [verified-C156: `type=image/avif` was chosen; an unknown type and a following `image/webp` source resolved to the WebP; `type=image/jxl` was selected by Chromium 156, which contradicts the course statement that no browser supports JPEG XL.]
  **Applies to** landing page. **Check** Playwright: `currentSrc` extension matches the first supported source; no request for an unsupported format. **Source** https://web.dev/learn/images/prescriptive

- **RULE [WIMG-08]** If the LCP image is a CSS background or injected by JS, preload it: `<link rel="preload" as="image" href="..." fetchpriority="high">`; for responsive images use `imagesrcset` and `imagesizes` on the link, do not preload several formats, and do not use an HTTP `Link` header for responsive preloads. If the `<img>` is in the HTML, skip preload.
  **Why** Preload competes for early bandwidth; images default to low priority; header preloads cannot know the viewport. In the course's sample test the image preload improved load by about 1.2 s on throttled Fast 3G.
  **Applies to** landing page. **Check** `I3`: LCP `<img>` visible in raw HTML; if CSS background, a preload with `fetchpriority=high` exists. **Source** https://web.dev/articles/preload-responsive-images (and perf note)

- **RULE [WIMG-09]** Encode with quality tuned by eye at the display size, then nudge lower; use progressive JPEG as default; strip nothing you need. Example: Squoosh JPEG quality 60 cut an example by 79% with no visible change at normal viewing.
  **Why** Block codecs quantise detail we mostly cannot see; hunting artifacts at zoom makes you over-spend bytes. WebP adds block prediction and adaptive quantisation (up to four segments) to avoid JPEG's flat-gradient artifacts at the same bytes.
  **Applies to** all. **Check** `I6`: hero <= 150 KB mobile / 250 KB desktop [engine note budget from craft note]. **Source** https://web.dev/learn/images/jpeg, /webp

- **RULE [WIMG-10]** Automate: generate AVIF + WebP + JPEG at three or more widths (for example 400/800/1000, up to 1600-2400 for heroes) from non-destructive masters with `sharp`-class tooling (11ty Image, gulp-responsive, responsive-loader) or an image CDN with `w_`, `q_auto`, `f_auto` URL parameters; keep masters in the repo.
  **Why** In the course example a 3.3 MB PNG became about 150 KB (largest JPEG) and 32 KB (smallest WebP); `q_auto` on a CDN cut 250 KB to 134 KB; image CDNs report 40-80% savings. Content negotiation uses the request `Accept` header.
  **Applies to** all. **Check** Playwright: response `content-type` is `image/avif|webp` in Chromium for photos; CI check that originals are not referenced in markup. **Source** https://web.dev/learn/images/automating, /cdn, /cms

- **RULE [WIMG-11]** Serve images from your own origin (or proxy the CDN through it) when the image is the LCP resource; otherwise preconnect to the CDN.
  **Why** A third-party origin costs a DNS/TCP/TLS handshake before the first byte.
  **Applies to** landing page. **Check** `new URL(lcpEl.currentSrc).origin === location.origin`, or `<link rel=preconnect>` present. **Source** https://web.dev/articles/optimize-lcp (cited in the performance note)

- **RULE [WIMG-12]** CMS defaults are not safe defaults: WordPress emits `sizes` that mean "100% of viewport up to the largest source"; set the quality filter (the course uses 70) and override `sizes` with `wp_calculate_image_sizes()`; for Shopify and others use the theme's image hooks.
  **Why** A wrong `sizes` makes every user download the largest candidate.
  **Applies to** landing page (CMS-driven). **Check** `I7` on the rendered page. **Source** https://web.dev/learn/images/cms

- **RULE [WIMG-13]** Replace animated GIFs with `<video autoplay loop muted playsinline>` offering WebM (VP9) before MP4 (H.264); for ffmpeg the course uses `-crf 25 -pix_fmt yuv420p` for MP4 and `-c vp9 -crf 41` for WebM; the example fell from 3.7 MB (GIF) to 551 KB (MP4) and 341 KB (WebM). Source order matters: the first supported `<source>` wins.
  **Why** GIF is lossless but limited to 256 colours per frame, so files are huge.
  **Applies to** landing page. **Check** `I9`; no `img[src$=".gif"]` (>100 KB). **Source** https://web.dev/articles/replace-gifs-with-videos
  **Note** A `<video>` without a `poster` is not an LCP candidate, and adding a poster that the video then hides wastes bytes; the course recommends accepting that the next-largest element becomes the LCP.

- **RULE [WIMG-14]** Lazy-load below-fold iframes and embeds with `loading="lazy"` plus explicit `width`/`height`; prefer a click-to-load facade for heavy embeds.
  **Why** YouTube embeds cost about 500 KB, Spotify about 514 KB, Facebook like plugin about 215 KB (of which 197 KB script) up front; reports show 2-3% median data savings and 1-2% FCP gains from iframe lazy loading.
  **Applies to** landing page. **Check** Playwright: `iframe` below the fold has `loading=lazy`; network log shows no embed requests until scrolled. **Source** https://web.dev/articles/iframe-lazy-loading

- **RULE [WIMG-15]** Do not upscale rasters; target an intrinsic width of 1x-2x the rendered CSS width (cap DPR at 2) and use SVG for UI icons and line art.
  **Why** Upscaled images look blurry; about 18% of GOV.UK sessions in Nov 2022 still reported DPR 1, so over-large sources waste their bandwidth.
  **Applies to** all. **Check** `I5`: `naturalWidth >= clientWidth*min(DPR,2)*0.9` and `<= clientWidth*3`. **Source** https://web.dev/learn/images/history and /descriptive

---

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Tap target recommended | >= 48 px | forms design-basics, identity |
| Mobile form font | >= 1rem (16 px); identity module: about 20 px | forms |
| Mobile input padding | >= 15 px | forms identity |
| Checkbox sizes example | fine pointer 15 px, coarse pointer 30 px | forms design-basics |
| Security code length | `minlength=3`, `maxlength=4` | forms payment |
| Card number pattern | `[0-9 ]+` | forms payment |
| Lazy-load distance (Chrome) | 1250 px (4G) / 2500 px (3G); formerly 3000/4000 | lazy loading article |
| Lazy image load within 10 ms | 97.5% (4G), 92.6% (slow 2G) | lazy loading article |
| Lazy loading: share of WP sites using it | 84% of adopters were WordPress (2021) | lazy-loading article |
| Disabling lazy load on WP archive pages | LCP -13% desktop, -15% mobile; single pages +4%/+2% (noise) | lazy-loading article |
| Image quality example | JPEG q60 = -79% size | jpeg |
| Median page weight in 2022 | roughly 2 MB, images near half (older than craft note's 2025 figures) | performance-issues |
| Vodafone case | LCP -31% gave +8% sales, +15% visitor-to-lead, +11% cart visits | performance-issues |
| Share of pages whose LCP is an image | > 70% | performance-issues |
| GIF to MP4 to WebM | 3.7 MB, 551 KB, 341 KB | gif video article |
| Gulp example | 3.3 MB PNG, largest JPEG ~150 KB, smallest WebP 32 KB | automating |
| Image CDN `q_auto` | 250 KB to 134 KB | cdn |
| Preconnect saves | 100-500 ms per important third-party origin; unused connection closed after 10 s | resource-hints |
| JPEG decode structure | 8x8 blocks; chroma subsampling; WebP luma 16x16, chroma 8x8, 4x4 sub-blocks | jpeg, webp |
| PNG/GIF | PNG 256-colour indexed or truecolor up to 16M, alpha 0-255; GIF 256 colours per frame, 1-bit transparency | png, gif |

Verified in Chromium 156 (2026-10-08): `sizes` invalid calc picks 1200w vs 600w for the valid form; `<picture type>` negotiation chose `avif`, skipped unknown type, accepted `webp` and `jxl`; `setCustomValidity` never resets itself; `button` default type is `submit`.

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `<label for=email>Email address</label><input id=email type=email autocomplete=email>` | `<input placeholder="Email">` | labels persist, placeholders don't |
| `inputmode="numeric"` on card number text input | `type="number"` for card, phone | spinner arrows, lost zeros |
| Validate in HTML; `setCustomValidity('')` on input | set custom message once and forget | field stays invalid |
| Disable submit after a valid submit | disable until valid | hides the reason |
| `position:absolute;opacity:0` on the native radio | `display:none` | removes it from keyboard and a11y tree |
| `<img width=1200 height=800 style="max-width:100%;height:auto">` | `<img>` without dimensions | CLS |
| `srcset="a-400.jpg 400w, a-800.jpg 800w" sizes="(min-width:64em) 50vw, 100vw"` | `srcset` without `sizes` on fluid images | defaults to `100vw` |
| LCP image: `fetchpriority=high`, no `loading` | `loading=lazy` on the hero | delays LCP |
| `<picture><source type="image/avif" ...><source type="image/webp" ...><img ...></picture>` | `onerror` swap scripts | wasted request |

### Copy-ready snippets (status tags as before)

**Accessible text field with live-region-free error and rule hint [untested HTML, behaviour parts verified-C156]**
```html
<div class="field">
  <label for="pw">Password (required)</label>
  <input id="pw" name="pw" type="password" required minlength="8"
         autocomplete="new-password" aria-describedby="pw-hint pw-err">
  <p id="pw-hint">Enter at least eight characters.</p>
  <p id="pw-err" class="err"><svg aria-hidden="true" ...></svg> <strong>Error:</strong> Use at least eight characters.</p>
</div>
```
```css
.field:has(input:user-invalid) .err { display: block; }
.err { display: none; color: var(--danger); }
input { font: inherit; min-block-size: 3rem; padding: .75rem 1rem; border: 1px solid var(--border-strong); }
@media (pointer: coarse) { input[type=checkbox], input[type=radio] { inline-size: 1.75rem; block-size: 1.75rem; } }
```
```js
// reset custom messages whenever the value changes
input.addEventListener('input', () => input.setCustomValidity(''));
```

**Hero image with modern formats and reserved space [untested markup; negotiation verified-C156]**
```html
<picture>
  <source type="image/avif" srcset="hero-640.avif 640w, hero-1280.avif 1280w, hero-1920.avif 1920w" sizes="100vw">
  <source type="image/webp" srcset="hero-640.webp 640w, hero-1280.webp 1280w, hero-1920.webp 1920w" sizes="100vw">
  <img src="hero-1280.jpg" srcset="hero-640.jpg 640w, hero-1280.jpg 1280w, hero-1920.jpg 1920w"
       sizes="100vw" width="1920" height="1080" fetchpriority="high" alt="">
</picture>
```

**Below-fold card image**
```html
<img src="card-800.jpg" srcset="card-400.jpg 400w, card-800.jpg 800w" sizes="(min-width: 64em) 33vw, 100vw"
     width="800" height="600" loading="lazy" decoding="async" alt="…">
```

**GIF replacement [untested]**
```html
<video autoplay loop muted playsinline width="640" height="360" aria-label="…">
  <source src="demo.webm" type="video/webm"><source src="demo.mp4" type="video/mp4">
</video>
```

---

## 5. Exceptions & judgement calls

Conflicts and nuances against `../web/implementation-craft.md`:

1. **Touch target size.** web.dev forms says 48 px; the craft note says 24 px AA hard and 44 px soft. Keep the craft thresholds as gates; treat 48 as the form-specific soft target.
2. **Input font-size.** craft note: >= 16 px. web.dev identity: about 20 px on mobile. Both hold; 16 px is the zoom-suppression floor.
3. **`aria-label` and translation.** web.dev internationalization says many translation tools skip `aria-label`; craft note recommends `aria-label` for icon-only buttons. Use visible text or visually hidden text where possible; use `aria-label` where there is no visible text alternative.
4. **`:focus` vs `:focus-visible`.** The forms CSS examples use `:focus` with a 4 px outline; the craft note requires `:focus-visible`. Prefer `:focus-visible`.
5. **`-webkit-appearance` / `-moz-appearance` prefixes** in the select example are legacy; unprefixed `appearance` is enough on current engines (Baseline for years). [engine note, verify in BCD]
6. **`accent-color`.** The course says only Chrome, Firefox, Edge (old). Treat as supported in all engines now; verify in BCD.
7. **JPEG XL.** The images course says no browser supports it; Chromium 156 accepted `image/jxl` in `<picture>` in my run (so the course statement is outdated for Chromium). Other engines' JXL status was not checked here [verify]. Do not ship JXL as the only modern format.
8. **"The median page is ~2 MB"** (2022) vs the craft note's 2.56 MB (2025); use the craft note figure.
9. **Self-hosted vs CDN images** and **image CDN cost**: the course admits cost; for a marketing site, same-origin proxying beats a third-party host for the LCP image.
10. **Honeypot fields** can be autofilled by browsers (course note), so give them `autocomplete="off"` and hide them without `display:none`/`type=hidden` [engine note: visually hidden, `tabindex=-1`, `aria-hidden=true`].
11. **Placeholder as pattern hint.** web.dev says avoid; many marketing designs use floating labels. If a floating label is used, the label must be a real `<label>` and must not be placeholder-only.
12. **Source bugs found and flagged:** `setCustomValidity` snippet never resets (WFRM-17); `sizes="calc(100vw-2em)"` (WIMG-06); `//` comments inside CSS in the forms design-basics sample; `checkbox { accent-color }` selector in styling-form-controls should be `input[type=checkbox]`; the video article's conversions assume H.264/VP9 availability.

## 6. Figures worth keeping

No images saved. Candidates: the srcset/sizes selection walkthrough numbers (80vw slot, 0.75/1.5/2.5 effective DPR) for a diagram; LCP element highlighted in console (images/performance-issues); the Squoosh settings panel with quality slider.

## 7. Open questions

- Firefox and WebKit not installed, so `<picture>`/`sizes` negotiation and `:user-invalid` are Chromium-only verified.
- The course's "Chrome lazy-load thresholds" are from 2020-2021 articles (with an update for Chrome 121); the current numbers may have moved. [verify]
- `forms/identity` and `forms/payment` do not give dates; the card-number `pattern="[0-9 ]+"` allows any mix of digits and spaces, so server-side Luhn validation is still required [engine note].
- Pages with no extractable rule content: `forms/welcome`, `forms/conclusion`, `images/welcome`, `images/conclusion`, `images/history` (history, no rules beyond WIMG-02/15).
