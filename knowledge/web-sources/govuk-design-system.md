---
source: web:https://design-system.service.gov.uk/
chapter: GOV.UK Design System (forms, validation, error messages, components, styles, patterns) plus Government Design Principles
pages: n/a (web source, fetched 2026-10-08)
topic_tags: [forms, validation, error-messages, buttons, inputs, radios, checkboxes, select, date-input, summary-list, accordion, tabs, notification-banner, cookie-banner, header, footer, typography, spacing, layout, colour, links, accessibility, principles, patterns]
status: studied
---

# GOV.UK Design System and Government Design Principles

Raw text: `corpus/web/govuk/` (about 50 component, style and pattern pages as `.html`/`.txt`, plus `principles.*`, plus `src/` with a few GOV.UK Frontend SCSS files; private, gitignored). Fetched 2026-10-08, 2 s apart, with a plain browser-like User-Agent. Licence: OGL v3 for content, MIT for govuk-frontend code. Everything below is my own wording; numbers are exact from the pages unless tagged otherwise.

Pages read from `https://design-system.service.gov.uk/`: components (button, text-input, textarea, character-count, error-message, error-summary, radios, checkboxes, select, date-input, fieldset, summary-list, accordion, tabs, details, notification-banner, cookie-banner, header, footer, service-navigation, skip-link, back-link, inset-text, warning-text, phase-banner, table, pagination, file-upload, password-input), styles (typeface, type-scale, headings, paragraphs, links, lists, spacing, layout, colour, page-template, images, section-break, font-override-classes), patterns (question-pages, validation, check-answers, confirmation-pages, cookies-page, dates, names, email-addresses, addresses, passwords, page-not-found, problem-with-the-service, interruption-pages, navigate-a-service, start-using-a-service, create-accounts, exit-a-page-quickly, complete-multiple-tasks, service-navigation) and `https://www.gov.uk/guidance/government-design-principles` (B9, 11 principles, updated 2 April 2025). `components/label` and `components/hint` return 404 (they live inside text-input and fieldset pages); `styles/typography` 404 (replaced by typeface, type-scale, headings, paragraphs). I did not read: addresses, names, phone-numbers, national-insurance, bank-details, payment-card, equality-information, complete-multiple-tasks, step-by-step-navigation beyond their intros (not needed for marketing/app UI).

Context to remember: these rules are for transactional government services (forms first, one question per page, no marketing). Many transfer cleanly to SaaS forms and onboarding; some (hide-by-default, no decoration) are deliberately austere. GOV.UK Frontend v6.0.0 (Feb 2026) refreshed the brand, enlarged small-screen type and changed some colours; the page values below are the current ones on 2026-10-08.

## 1. Core ideas

1. Start with user needs, do the hard work to make it simple, and accept that accessibility can cost elegance (principles 1, 4, 6).
2. One thing per page: one question, one heading (the label or legend can be the `<h1>`), one primary action.
3. Validation is a conversation: accept messy input, strip noise, validate only on submit, keep the user's answers, never use browser validation.
4. Every error appears three times, in identical words: error summary at the top (focused), message beside the field, and "Error:" prefix in the page title.
5. Error copy is specific to the failure: "Enter your first name", "Date of birth must include a month", never "This field is required".
6. Controls are chosen conservatively: radios over select, checkboxes over multi-select, text inputs over `type=number`, no placeholders as labels, no disabled buttons, no pre-selected options.
7. Hidden-content components (accordion, tabs, details, notification banner, inset text) need evidence of benefit and must be used sparingly because many users miss them.
8. Consistency beats novelty (principle 9: consistent, not uniform): same patterns and words everywhere.
9. Layout is narrow and calm: main content in a two-thirds column, lines of no more than about 75 characters, a 5 px spacing scale.
10. Colour carries meaning only with a second cue; focus is a loud yellow with a dark underline so it is never missed.

## 2. Rules

### 2.1 Principles (B9)
- **RULE [GOV-01]** Start with user needs: research, analyse data, talk to users; do not assume, and remember that what users ask for is not always what they need.
  **Why** Building without needs means building the wrong thing. **Applies to** all. **Check** process: brief states the user need and evidence before visual design. **Source** gov.uk/guidance/government-design-principles > 1 "Start with user needs".
- **RULE [GOV-02]** Do the hard work to make it simple: simplicity of use matters more than the look of simplicity; reject "it has always been that way".
  **Why** Making something look simple is easy; making it simple to use means removing underlying complexity. **Applies to** all. **Check** count of steps, fields, and decisions per task versus the previous version (should go down). **Source** gov.uk/guidance/government-design-principles > 4.
- **RULE [GOV-03]** Iterate: release small, test with real users, add what works, delete what does not, and be willing to scrap a failing prototype.
  **Why** Iteration reduces risk and turns failures into lessons. **Applies to** all. **Check** process: at least one tested iteration recorded in evals. **Source** gov.uk/guidance/government-design-principles > 5.
- **RULE [GOV-04]** Treat accessibility as part of good design: be inclusive, legible and readable even if it costs elegance; design for needs, not audiences.
  **Why** Those who most need a service often find it hardest to use. **Applies to** all. **Check** run the a11y checklist (A11Y-xx) on every page. **Source** gov.uk/guidance/government-design-principles > 6 "This is for everyone".
- **RULE [GOV-05]** Understand the context of use (library, phone, first-time web user) and design for people, not for a screen; build services, not just pages.
  **Why** Context drives constraints (small screen, bad connection, stress). **Applies to** all. **Check** brief names the usage context and device; test at 375 px with throttled network. **Source** gov.uk/guidance/government-design-principles > 7, 8.
- **RULE [GOV-06]** Be consistent, not uniform: reuse the same language and patterns; deviate only when research says it is better, then share why.
  **Why** Familiarity lowers effort, but a rule book must not freeze improvement. **Applies to** all. **Check** the same action has the same label and component across the product (grep repeated verbs: "Continue" vs "Next"). **Source** gov.uk/guidance/government-design-principles > 9.
- **RULE [GOV-07]** Do less: reuse and link rather than rebuilding; keep to the irreducible core; and minimise environmental impact (principle 11, added 2 April 2025).
  **Why** Less to build, run, and carry. **Applies to** all. **Check** page weight and request counts versus budget; remove features without evidence. **Source** gov.uk/guidance/government-design-principles > 2, 11.

### 2.2 Question pages and form structure
- **RULE [GOV-08]** Ask one question per page by default; put the question in the `<label>` or `<legend>` and make that the page heading (`<h1>`) so screen readers hear it once. When asking several related things, use a statement heading instead and style each label or legend for scanning.
  **Why** Focus on the specific question and one hearing for screen-reader users. **Applies to** forms. **Check** on single-question pages: `h1` is inside `label` or `legend`; on multi-question pages `h1` is a statement and not inside a label or legend. **Source** design-system.service.gov.uk/patterns/question-pages/ > Page headings; components/text-input, radios, checkboxes.
- **RULE [GOV-09]** Every question page has a back link, a page heading and a "Continue" button; the button is labelled "Continue" (not "Next") and aligned to the left edge of the form.
  **Why** Users do not trust browser back; the left-aligned primary action is not missed. **Applies to** forms. **Check** page has `a.back-link` before `main`, one `h1`, and a `button` with text "Continue" whose left edge equals the form column's left edge. **Source** patterns/question-pages/ > How it works, Back link, Continue button; components/button.
- **RULE [GOV-10]** Do not break the browser Back button: Back returns to the previous page in the state the user saw. Exception: after one-time actions such as payment, show a sensible message instead of letting the action repeat.
  **Why** Predictability and safety. **Applies to** forms. **Check** step through a flow, press Back: values restored, no duplicate submit. **Source** patterns/question-pages/ > Back link.
- **RULE [GOV-11]** Only ask for information you need and only once per journey; pre-populate or offer carried-forward answers instead of re-asking. Allow "I do not know" where valid.
  **Why** Each field costs completion. **Applies to** forms. **Check** audit duplicate field names across steps (same `autocomplete` token twice in one journey = flag). **Source** patterns/question-pages/ > When to use, How it works.
- **RULE [GOV-12]** Mark optional fields with "(optional)" in the label (or legend for radios and checkboxes); never mark mandatory fields with asterisks.
  **Why** Most fields are required, so flagging the exceptions is quieter and clearer. **Applies to** forms. **Check** no `*` in label text; optional inputs have "(optional)" in the label. **Source** patterns/question-pages/ > When to use this pattern.
- **RULE [GOV-13]** Use a progress indicator only if testing shows the form is still hard without one; use a simple "Question X of Y" style and only include the total if it is reliable. Avoid the stepper that shows all steps, lets you jump back, and marks the current one.
  **Why** That stepper is often unnoticed, takes space, scales poorly on mobile and is hard to label (one team removed a 12-step indicator with no effect on completion). **Applies to** forms. **Check** step-indicator element lists <= 1 step label (current) or a "Step X of Y" text. **Source** patterns/question-pages/ > Using progress indicators.
- **RULE [GOV-14]** Avoid range sliders; if used, provide a non-drag way to choose a value.
  **Why** Hard to use for some people; WCAG 2.5.1 Pointer Gestures. **Applies to** forms. **Check** every `input[type=range]` has an accompanying number input or buttons. **Source** patterns/question-pages/ > Using range sliders.

### 2.3 Labels, hints, text inputs
- **RULE [GOV-15]** Every text input has a visible label placed above the input, short and direct, in sentence case, without a trailing colon.
  **Why** A persistent label is read reliably by all users. **Applies to** forms. **Check** `label` is a block above its `input` (label bottom <= input top); label text does not end in `:`. **Source** components/text-input > How it works.
- **RULE [GOV-16]** Do not use placeholder text for labels, hints or examples.
  **Why** It vanishes when typing (a problem for memory conditions and review), some screen readers skip it, and default placeholder colours often fail contrast. **Applies to** forms. **Check** `input[placeholder]` count 0 where the label is missing; if a placeholder is present, contrast >= 4.5:1. **Source** components/text-input > Avoid placeholder text; components/textarea > How it works.
- **RULE [GOV-17]** Hint text is a single short sentence without a full stop, for help most users need, contains no links, and is attached to the input via `aria-describedby`. For long explanation use body content above a specific question label instead of a hint.
  **Why** Screen readers read the whole hint on every focus; links in hints are not announced as links. **Applies to** forms. **Check** `.hint` length < 100 characters, does not end with `.`, contains no `a`; has an id referenced by the input's `aria-describedby`. **Source** components/text-input > Hint text; patterns/question-pages/ > Hint text and Asking complex questions.
- **RULE [GOV-18]** Size inputs to the expected content: fixed-width inputs for known lengths (postcode, phone) and fluid-width classes (full, three-quarters, two-thirds, half, third, quarter) otherwise; fixed widths are sized for 20, 10, 5, 4, 3 and 2 characters.
  **Why** Width signals the expected answer length. **Applies to** forms. **Check** postcode and similar fixed-length fields have `max-width` within ~1 ch of expected; no full-width input for a 4-digit answer. **Source** components/text-input > Use appropriately-sized text inputs.
- **RULE [GOV-19]** For whole numbers use `type="text"` with `inputmode="numeric"`; for decimals use `inputmode="decimal"`; avoid `input type="number"`; for negative numbers use plain text input without `inputmode`.
  **Why** `type=number` allows scroll-wheel increments and gives no feedback on bad input; some mobile keypads cannot enter negatives. **Applies to** forms. **Check** `input[type=number]` count 0; numeric answers have `inputmode`. **Source** components/text-input > Numbers.
- **RULE [GOV-20]** For long codes or sequences the user will not have memorised, style the text to separate characters (letter spacing); not needed for phone numbers or postcodes.
  **Why** Helps visual checking. **Applies to** forms. **Check** code inputs have `letter-spacing` > 0 and often `font-variant-numeric: tabular-nums`. **Source** components/text-input > Codes and sequences.
- **RULE [GOV-21]** Prefixes and suffixes (such as "£", "kg") sit outside the input, are never the only description (the label or hint must state the unit too), and validation must tolerate users typing the symbol themselves.
  **Why** Screen readers do not announce prefixes; users double-type symbols; browser icons can overlap inner content. **Applies to** forms. **Check** prefix element is a sibling of the input with `aria-hidden=true`; label names the unit. **Source** components/text-input > Prefixes and suffixes.
- **RULE [GOV-22]** Use `autocomplete` tokens (for example `postal-code`, `bday-day`, `bday-month`, `bday-year`) on inputs that match an input purpose.
  **Why** WCAG 1.3.5 Identify input purpose, AA. **Applies to** forms. **Check** inputs for name, email, address, DOB, tel have the right token. **Source** components/text-input > Use the autocomplete attribute; components/date-input.
- **RULE [GOV-23]** Never disable copy and paste in text inputs or textareas.
  **Why** People paste from other sources. **Applies to** forms. **Check** no `onpaste` preventDefault (same check as VWI-11). **Source** components/text-input; components/textarea > Do not disable copy and paste.
- **RULE [GOV-24]** Avoid `maxlength`: it truncates silently (including pasted text), blocks usual formatting such as spaces in postcodes, and confuses assistive technology and voice control. If a limit is technical, state it in the hint and only error after normalising the value; for long text use the character count component.
  **Why** Silent truncation loses data. **Applies to** forms. **Check** `[maxlength]` on free-text inputs count 0 (allowed on fields whose limit is physically fixed like a 6-digit code). **Source** components/text-input > Avoid restricting the length of a user's input.
- **RULE [GOV-25]** Disable spellcheck (`spellcheck="false"`) on names, emails, reference numbers and NI-style numbers.
  **Why** Red lines on non-words mislead. **Applies to** forms. **Check** matching inputs have `spellcheck=false`. **Source** components/text-input > How and when to spellcheck.

### 2.4 Validation and errors
- **RULE [GOV-26]** Do not use HTML5 validation: add `novalidate` to forms and do not put `required` on inputs; implement server-side validation always, and add client-side validation only when research shows a need.
  **Why** Browser bubbles cannot be styled or placed consistently or proven accessible; client rules can be bypassed or fail. **Applies to** forms. **Check** `form[novalidate]`; `input[required]` count 0; server returns the same errors without JS. **Source** patterns/validation > Turn off HTML5 validation, Client side and server side validation. Note the tension with the A11Y/engine practice of `aria-required`; see section 5.
- **RULE [GOV-27]** Validate when the user submits or moves to the next step, not when they leave a field. Avoid validating before they finish typing unless research shows net benefit (the character-count component is the exception).
  **Why** Early validation punishes slow typists and screen-reader users. **Applies to** forms. **Check** blur an empty required field: no error appears; click Continue: errors appear. **Source** patterns/validation > When to tell the user about validation errors.
- **RULE [GOV-28]** Accept input in different unambiguous formats and strip noise before validating (spaces, hyphens, brackets, dashes, full stops, invisible characters, characters from dictation or accidental copy-paste padding); reject only what cannot be correct or is too ambiguous (for example month "13").
  **Why** Format errors are hard to see and fix. **Applies to** forms. **Check** submit a postcode with and without space, a phone number with brackets and dashes, a value with trailing spaces: all accepted. **Source** patterns/validation > When to use, How it works.
- **RULE [GOV-29]** On a failed validation redisplay the form with all fields as the user filled them (both valid and invalid answers), prefix the page `<title>` with "Error: ", show an error summary at the top and move keyboard focus to it, and show error messages beside the fields.
  **Why** Users can see, edit and avoid retyping. **Applies to** forms. **Check** after invalid submit: `document.title` starts with "Error: "; `document.activeElement` is the summary; field values preserved. **Source** patterns/validation > How to tell the user about validation errors; components/error-message.
- **RULE [GOV-30]** The error summary is shown whenever there is any validation error (even one), is the first thing in the main container (below breadcrumbs or back link, above `h1`), has the heading "There is a problem", and links each error to its answer: to the field for single inputs; to the first field in error for date inputs (or the first field if unknown); to the first radio or checkbox for groups.
  **Why** Orientation and quick navigation for keyboard and screen-reader users. **Applies to** forms. **Check** summary `h2` text equals "There is a problem"; each `a[href^="#"]` target resolves to an input id; summary precedes the `h1` in DOM order. **Source** components/error-summary > When to use, How it works, Where to put the error summary.
- **RULE [GOV-31]** Error summary messages use the same words as the messages next to the fields.
  **Why** Consistency lowers cognitive effort and makes sense out of context. **Applies to** forms. **Check** text of each summary link equals text of its field error (minus the hidden "Error:" prefix). **Source** components/error-summary > How it works; components/error-message > Be consistent.
- **RULE [GOV-32]** Place the field error message in red after the question and hint text, add a red left border to the form group to link message and question, and (for multi-field questions like dates) add a red border to the specific field in error. The error message component includes a visually hidden "Error:" prefix for screen readers.
  **Why** Spatial and non-visual association. **Applies to** forms. **Check** `.error-message` follows `.hint` in DOM order; contains visually hidden "Error:"; has a text colour contrasting >= 4.5:1; form-group has a border-left of 5px in error colour. **Source** components/error-message > How it works; styles/colour (error #ca3535). Border width 5 px from govuk-frontend settings (`$govuk-border-width-form-group-error: 5px`).
- **RULE [GOV-33]** Write errors that say what happened and how to fix it, in plain English, in positive terms, mirroring the label's wording ("How many hours do you work a week?" gives "Enter how many hours you work a week"). Avoid jargon, "forbidden", "illegal", "you forgot", "please", "sorry", "valid/invalid", "oops", and generic text such as "This field is required", "Answer the question", "Select an option", "An error occurred".
  **Why** Specific messages work out of context and recover users. **Applies to** forms. **Check** lint every error string against the banned word list; ensure it contains a word from the label. **Source** components/error-message > Match up error messages to labels, Be clear and concise, Be specific.
- **RULE [GOV-34]** Do not repeat a hint's example inside the error if the example is already on screen. Prefer imperative form for empty fields ("Enter your first name") and a description for limit failures ("First name must be 35 characters or less"), used consistently.
  **Why** Avoids clutter; consistent grammar. **Applies to** forms. **Check** empty errors start with "Enter|Select"; limit errors start with the field name. **Source** components/error-message > Use instructions and descriptions.
- **RULE [GOV-35]** Use template messages per field type. Text input: empty "Enter [x]"; too long "[x] must be [n] characters or less"; too short "[x] must be [n] characters or more"; both "[x] must be between [n] and [n] characters"; banned characters "[x] must not include [chars]"; unknown allowed set "[x] must only include [allowed]"; not a number "[x] must be a number, like 30"; not whole "[x] must be a whole number, like 30"; low "[x] must be [n] or more"; high "[x] must be [n] or fewer"; range "[x] must be between [a] and [b]"; money "[x] must include pence, like 123.45 or 156.00" or "must not include pence, like 123 or 156".
  **Why** Proven wording tested in live services. **Applies to** forms. **Check** string match against the templates. **Source** components/text-input > Error messages; components/textarea; components/character-count.
- **RULE [GOV-36]** Radios: empty yes/no "Select yes if [x]"; two non-yes/no options "Select if [x]"; more than two "Select [x]". Checkboxes: nothing selected with options "Select if [x]" or without options "Select [x]"; none plus another checked "Select [options] or select '[none label]'". Select: tell the user to select an option, named. Date: empty "Enter [x]"; incomplete "[x] must include a [day/month/year]"; impossible "[x] must be a real date"; future/past "[x] must be in the past" and relatives (today or in the past, in the future, today or in the future, same as or after/before, between).
  **Why** Consistent messages per control. **Applies to** forms. **Check** string match. **Source** components/radios, checkboxes, select, date-input > Error messages.
- **RULE [GOV-37]** For multiple date errors, show the highest priority: missing or incomplete first, then information that cannot be correct (month 13), then other failures; highlight only the failing field(s) and name the field in the message.
  **Why** One clear fix at a time. **Applies to** forms. **Check** with two errors, only one message appears per date question. **Source** components/date-input > Error messages.
- **RULE [GOV-38]** Never use an error message to tell users they are ineligible, lack permission, or hit a service problem; take them to an explanatory page with next steps (or the problem-with-the-service, page-not-found, service-unavailable pages).
  **Why** Errors are for fixable input mistakes. **Applies to** forms | SaaS app UI. **Check** error component usage restricted to validation; eligibility failures route to a page with `h1` and next-step links. **Source** components/error-message > When not to use; patterns/validation > When not to use.
- **RULE [GOV-39]** Track how often each error is seen, to improve content, A/B test variants or redesign the journey.
  **Why** Error frequency finds weak questions. **Applies to** forms. **Check** analytics event per error type exists. **Source** components/error-message > Track errors.

### 2.5 Buttons
- **RULE [GOV-40]** Button text is sentence case and describes the action ("Save and continue", "Continue", "Start now", "Sign in", "Pay", "Add another", "Confirm and send" or "Accept and send" when legal text must be agreed, "Sign out"); add words when needed ("Add another address").
  **Why** Specific action labels reduce hesitation. **Applies to** all. **Check** button text matches sentence case regex; no generic "Submit", "OK", "Click here". **Source** components/button > How it works.
- **RULE [GOV-41]** Use one default (primary) button per page; use secondary buttons sparingly; simplify the page or split it rather than adding many calls to action.
  **Why** More than one main call to action weakens all. **Applies to** all. **Check** count of primary-styled `button` per view = 1. **Source** components/button > Default buttons, Secondary buttons.
- **RULE [GOV-42]** Start buttons on a start page are links (`<a>`), not form buttons, and use the primary action wording "Start now"; green start buttons raised click-through in testing.
  **Why** They navigate; evidence from GOV.UK testing. **Applies to** landing page | forms. **Check** `a.start-button` has `href`, `role=button`; computed colour is the success/green button style. **Source** components/button > Start buttons, Research (green improved click-through).
- **RULE [GOV-43]** Warning (red) buttons are only for serious, hard-to-undo destructive actions, used very sparingly; use another button style for the initial action and a warning button for the final confirmation; never rely on red alone (the text and context must make the consequence clear).
  **Why** Frequent red buttons lose meaning; colour alone is not accessible. **Applies to** SaaS app UI. **Check** count of destructive buttons per page <= 1; text names the consequence ("Delete account"). **Source** components/button > Warning buttons.
- **RULE [GOV-44]** Avoid disabled buttons; they have poor contrast and confuse users. Use only if research shows they help.
  **Why** No explanation for being disabled. **Applies to** forms. **Check** `button:disabled` count on idle pages = 0. **Source** components/button > Disabled buttons. Agrees with VWI-15.
- **RULE [GOV-45]** On dark backgrounds use the inverse (white) button and keep white against its background at 4.5:1 or better; group two or more buttons in a button group; align the primary action to the left edge of the form.
  **Why** Legibility, spacing, scan path. **Applies to** all. **Check** contrast white vs background >= 4.5; sibling buttons are wrapped in a flex container with gap. **Source** components/button > Buttons on dark backgrounds, Grouping buttons.
- **RULE [GOV-46]** Prevent accidental double submission: use `data-prevent-double-click="true"` when research shows duplicates, give feedback (spinner or modal) on slow connections, and also protect server-side.
  **Why** Double clicks come from old habits, slow feedback and motor impairments. **Applies to** forms. **Check** double-click the submit button: one request. **Source** components/button > Stop users from accidentally sending information more than once.

### 2.6 Radios, checkboxes, select, date input
- **RULE [GOV-47]** Radios are for one choice from a list; checkboxes for several (or one on/off). Always put the control to the left of its label, and group in a `fieldset` with a `legend` that states the question.
  **Why** Left placement helps magnifier users; groups are announced with the question. **Applies to** forms. **Check** `input[type=radio], input[type=checkbox]` left edge < label left edge; each group inside `fieldset > legend`. **Source** components/radios and checkboxes > How it works.
- **RULE [GOV-48]** Do not pre-select radios or checkboxes in questions; add a hint such as "Select one option" or "Select all that apply" because the visual difference alone is not enough.
  **Why** Pre-selection causes missed questions and wrong answers. **Applies to** forms. **Check** `input:checked` on initial render of a question page: count 0. **Source** components/radios, checkboxes > How it works.
- **RULE [GOV-49]** Order options alphabetically by default; order by popularity only with extreme caution (bias); include "None of the above" or "I do not know" where valid, shown last after a divider ("or"); a "none" checkbox repeats the key part of the question and unchecks the others.
  **Why** Predictable scan order, no bias. **Applies to** forms. **Check** option labels sorted alphabetically (locale-aware) unless justified; "none" option is last. **Source** components/radios > How it works; checkboxes > Add an option for 'none'.
- **RULE [GOV-50]** Use inline radios only for exactly two short options; they still stack on small screens. Do not conditionally reveal questions inside inline radios.
  **Why** Layout and clarity. **Applies to** forms. **Check** inline radio groups have 2 options and each label < ~20 characters. **Source** components/radios > Inline radios, Conditionally revealing.
- **RULE [GOV-51]** Conditionally reveal only a short, simple related question (not other content); if it is complicated or multi-part, move it to the next page.
  **Why** Revealed content may not be announced (a known WCAG 4.1.2 gap); testing showed screen-reader users coped only with simple ones. **Applies to** forms. **Check** revealed region contains one field. **Source** components/radios, checkboxes > Conditionally revealing a related question, Known issues.
- **RULE [GOV-52]** Add per-item hints only as single short sentences without full stops and without links; use the smaller radios/checkboxes only on information-dense screens or filters.
  **Why** Standard size is more noticeable; small ones suit repeat use. **Applies to** forms. **Check** hint length; standard control size otherwise (control box 40 px with 44 px touch target; small 24 px, per govuk-frontend SCSS). **Source** components/radios, checkboxes; govuk-frontend `radios/_mixin.scss` ($govuk-radios-size 40px, touch gutter 4px, small 24px).
- **RULE [GOV-53]** Use a select only as a last resort in public services; first ask questions to reduce options or use radios. Do not pre-select in questions (settings may pre-select), and do not support `select multiple`; use checkboxes instead.
  **Why** Users struggle: cannot close, try to type, confuse focus with selection, pinch-zoom, miss scrolling. **Applies to** forms. **Check** `select` count minimal; `select[multiple]` count 0. **Source** components/select > When to use, How it works, Research.
- **RULE [GOV-54]** Ask for memorable dates with three fields (day, month, year) in a fieldset, accept month names and abbreviations, never auto-tab between fields, use `bday-day/month/year` autocomplete for date of birth, and use valid example dates in the hint.
  **Why** Teacher-training service saw errors fall sharply after accepting month names; auto-tab collides with keyboard control. **Applies to** forms. **Check** date question has 3 `input`s inside `fieldset > legend`; "jan" and "January" accepted; no `keyup` handler that moves focus. **Source** components/date-input > How it works; patterns/dates.
- **RULE [GOV-55]** Do not use the date input when users probably do not know the exact date; do not use a calendar for known dates.
  **Why** Wrong input type for recall. **Applies to** forms. **Check** review. **Source** components/date-input > When not to use.
- **RULE [GOV-56]** Textarea height is proportional to the expected answer via `rows`; use the character count only when there is a real reason (evidence of over-long answers or a legal/technical limit), set the limit above what most users need, optionally show the count only past a threshold (the page's markup example is `data-threshold="75"`, i.e. 75% of the limit; its live demo says the count appears past 850 of 1000), and let users exceed the limit then show an error rather than truncating.
  **Why** Preserves pasted text and avoids stress. **Applies to** forms. **Check** textarea `rows` matches expected length; no `maxlength`; count is below the field and announces on pause. **Source** components/textarea > Use appropriately-sized textareas; components/character-count > How it works, Avoid narrow limits. The 75% and 850-of-1000 figures are demo values, not recommendations [unverified].

### 2.7 Summary lists, check answers, confirmation
- **RULE [GOV-57]** Use a summary list (`dl`) for key-value facts and answers; row actions use "Change" links with visually hidden context ("Change name"), and each row keeps its separating border unless there are no actions; do not use it for tabular data.
  **Why** Borders tie action to row for magnifier users; hidden text gives context. **Applies to** SaaS app UI | forms. **Check** `dl > div > dt + dd`; each action link has accessible name including the key; rows have `border-bottom` when actions exist. **Source** components/summary-list > How it works, Adding actions, Removing the borders.
- **RULE [GOV-58]** Show a check-answers page before final submission: page title says what to do, 'Change' links per answer that return to the check page after editing, unanswered optional questions show 'Not provided', the final button names the action ('Confirm and send' or 'Accept and send'), and it makes clear the transaction is not complete until confirmed.
  **Why** Raises confidence and cuts errors. **Applies to** forms. **Check** summary list exists on penultimate step; change links preserve state. **Source** patterns/check-answers > How it works.
- **RULE [GOV-59]** Confirmation pages confirm completion (green panel with a title and a reference number), say what happens next, link to likely next services, offer a way to save a record, and still work when bookmarked; interactive elements inside the green panel must reach 3:1 contrast.
  **Why** Reassurance and next steps. **Applies to** forms. **Check** page has `h1` in a panel, reference text, and a next-steps section; reload the URL: still useful. **Source** patterns/confirmation-pages > How it works.

### 2.8 Hidden-content components and banners
- **RULE [GOV-60]** Use accordions only with evidence that users benefit from hiding sections; test the content without one first; never hide content all users need, never nest an accordion, tabs or details inside another, and never use one to split a series of questions.
  **Why** Many users miss collapsed content. **Applies to** landing page | SaaS app UI. **Check** `[aria-expanded]` containers nested inside each other count 0; essential copy not collapsed by default. **Source** components/accordion > When to use, When not to use.
- **RULE [GOV-61]** Accordion section headings are buttons in sentence case with short descriptive labels; summary lines only when essential and very short; sections start closed (unless a section must be open), can be remembered open via session storage, and are never disabled.
  **Why** Long names are hard to navigate by screen reader; disabled controls confuse. **Applies to** landing page | SaaS app UI. **Check** `button[aria-expanded]` text length < 60 characters; no `[disabled]`. **Source** components/accordion > How it works.
- **RULE [GOV-62]** Choose among the three reveal patterns by need: accordion for several sections viewed together or many sections; tabs for quick switching between a few, first tab most useful, labels short enough not to wrap, each tab starting with a heading that repeats its label; details for one or two short, low-importance pieces.
  **Why** Right affordance for the content. **Applies to** landing page | SaaS app UI. **Check** tabs list fits on one row at 1440; every panel starts with `h2/h3` matching the tab. **Source** components/accordion, tabs, details > Decide between.
- **RULE [GOV-63]** Tabs are not page navigation and not for content users must compare or read in order; the selected tab is stored in the URL fragment (`#tab_united-kingdom`) so Back moves to the previous tab; without JavaScript (and on small screens) tabs render as a headed list with a table of contents.
  **Why** Hidden content breaks comparison; URL state allows deep links. **Applies to** SaaS app UI. **Check** switching tabs updates `location.hash`; Back restores previous tab. **Source** components/tabs > When not to use, How it works. Matches VWI-25.
- **RULE [GOV-64]** Use a notification banner sparingly, before the page `h1`, same width as the content, with `role="region"` and `aria-labelledby`; at most one per page (combine messages); never for validation errors; blue for service-wide or elsewhere-in-service news, green for outcomes with `role="alert"` and a heading such as "Success" (not colour alone), and remove green banners on the next page.
  **Why** Banners are often missed; overuse worsens that. **Applies to** SaaS app UI. **Check** banner count <= 1; green banner has `role=alert` and a text heading. **Source** components/notification-banner > How it works, Reacting to something the user has done.
- **RULE [GOV-65]** Use inset text sparingly to set apart a quote or aside; use warning text (with a visually hidden "Warning" and an exclamation icon) for legal or important consequences.
  **Why** Inset text is often overlooked. **Applies to** all. **Check** inset blocks per page <= 2; warning text contains hidden "Warning" label. **Source** components/inset-text, warning-text.

### 2.9 Cookies, header, footer, navigation
- **RULE [GOV-66]** Provide a cookie banner (accept or reject) when non-essential cookies are set; show it on every visit until a choice is saved; after a choice show a confirmation with a Hide button; store the preference for 1 year; place it right after the opening `<body>` and before the skip link; do not make it sticky (`position: fixed`) so it cannot obscure focused content (WCAG 2.4.11).
  **Why** Consent and focus visibility. **Applies to** landing page | SaaS app UI. **Check** banner is the first body child; computed `position` != fixed/sticky; cookie `Max-Age` ~ 31536000 s for the preference. **Source** components/cookie-banner > How it works.
- **RULE [GOV-67]** Banner copy names the service, stays short and accurate, and is the same whether or not JavaScript is enabled; with progressive enhancement, ship all possible messages hidden with the `hidden` attribute and focus the confirmation (`tabindex="-1"`, `role="alert"`) when the user chooses. Also publish a cookies page listing each cookie by category (essential, functional, analytics); do not bury it in terms.
  **Why** Transparency and no re-consent loops. **Applies to** all. **Check** banner heading contains the product name; cookies page exists and is linked in the footer. **Source** components/cookie-banner > What to cover; patterns/cookies-page > Preparing, Writing.
- **RULE [GOV-68]** Include a skip link immediately after the opening `<body>` (or after the cookie banner); it is visually hidden until keyboard focus and must not be wrapped in `nav` or moved into the header. Include a back link before `<main>`, use "Back" by default or "Go back to [page]" in complex journeys; never combine a back link with breadcrumbs.
  **Why** Order of bypass; one wayfinding aid at a time. **Applies to** all. **Check** first focusable is the skip link; `a.back-link` precedes `main`; breadcrumbs and back link not both present. **Source** components/skip-link > When to use; components/back-link > How it works.
- **RULE [GOV-69]** Footer: copyright and licence statement, links named "Privacy", "Accessibility", "Cookies" and "Terms and conditions"; place help links consistently across pages (WCAG 3.2.6); only add secondary navigation if you want users to leave the service. Use the GOV.UK header or footer only on GOV.UK domain services; others build their own.
  **Why** Predictable legal and help links. **Applies to** landing page | SaaS app UI. **Check** footer contains the four link texts; help link position equal across pages. **Source** components/footer > Adding links; components/header > When not to use; Brand refresh note.
- **RULE [GOV-70]** Header: keep the header simple and consistent at the top of every page; the service name and navigation live in the Service navigation component, not in the logo bar; avoid navigation links when the service is a linear journey (use a task list instead).
  **Why** Wayfinding for non-linear services only. **Applies to** SaaS app UI. **Check** nav links absent from linear funnels. **Source** components/header > How it works; patterns/navigate-a-service > When not to use.
- **RULE [GOV-71]** Table: use `caption` as the title, `th` with `scope`, right-align number columns, never for layout; reduce data or split tables; paginate only if it helps performance or use, never with infinite scroll, show page number in `<title>` ("Search results (page 1 of 4)") and hide previous on page 1 and next on last.
  **Why** Comparison, accessibility, keyboard behaviour. **Applies to** SaaS app UI. **Check** `td` numeric columns `text-align: right`; table has caption. **Source** components/table > How it works; components/pagination > How it works.

### 2.10 Page-level patterns
- **RULE [GOV-72]** Page not found: title "Page not found - [service] - GOV.UK" style, neutral non-blaming content (check typed address, check pasted address, contact option); problem-with-the-service (500): title and `h1` "Sorry, there is a problem with the service", say what happened to the user's answers, show contact options; use one page for all unexpected problems and show it only briefly, then switch to a service-unavailable page.
  **Why** Recovery paths, no blame. **Applies to** all. **Check** 404 and 500 templates exist with next-step links. **Source** patterns/page-not-found-pages, problem-with-the-service-pages.
- **RULE [GOV-73]** Interruption pages are rare: use only when there is evidence of need (irreversible action, conflicting answer, or critical information that would be missed), keep the panel short, with a single continue button and a back link; no other components in the panel.
  **Why** They get less effective the more often they appear. **Applies to** SaaS app UI | forms. **Check** interruption count per flow <= 1. **Source** patterns/interruption-pages > When to use, How it works.
- **RULE [GOV-74]** Passwords: be consistent about restrictions everywhere, prefer a second factor over extra complexity, do not force periodic changes, do not reveal whether the username or password was wrong, do not keep a failed attempt's password in the input, allow 5 to 10 attempts before locking or extra checks, and never block paste.
  **Why** Security without user hostility. **Applies to** forms. **Check** login error text identical for bad username and bad password; failed attempt clears the password field. **Source** patterns/passwords > How it works.

### 2.11 Typography, spacing, layout, links, colour
- **RULE [GOV-75]** Body text is 19 px with a 25 px line height on both large and small screens; body-small is 16 px / 20 px (use sparingly; most copy stays at 19 px); lead paragraph 24 px (large screens), one per page. All type-scale line heights are multiples of 5 px; use relative units so type resizes on zoom.
  **Why** Legibility and vertical rhythm. **Applies to** all. **Check** computed body `font-size` >= 16 px (>= 19 px for long reading text on GOV.UK-style pages); `line-height` / `font-size` ~1.3 for 19/25. **Source** styles/type-scale > Responsive behaviour; styles/paragraphs.
- **RULE [GOV-76]** Use headings by structure and style them by class: `h1` as heading-l (36/40 large screens, 27/30 small) on question pages, heading-xl (48/50 large, 32/35 small) for long-form pages; h2 heading-m (24/30 large, 21/25 small); h3 heading-s (19/25); write headings in sentence case; use a caption above a heading for the section name.
  **Why** Consistent hierarchy. **Applies to** all. **Check** computed sizes of `h1-h3` match the scale; heading text is sentence case. **Source** styles/headings; styles/type-scale.
- **RULE [GOV-77]** Spacing uses a 5 px-based scale: 0, 5, 10, 15, then responsive steps (unit 4: 15 small / 20 large; 5: 15 / 25; 6: 20 / 30; 7: 25 / 40; 8: 30 / 50; 9: 40 / 60); units 0 to 3 are identical on all screens; breakpoint for the large scale is wider than 640 px.
  **Why** Predictable rhythm. **Applies to** all. **Check** margins and paddings on components are members of {0,5,10,15,20,25,30,40,50,60}. **Source** styles/spacing > Responsive spacing, Static spacing.
- **RULE [GOV-78]** Design small-screen first, single column; main content sits in a two-thirds column (or two-thirds plus one-third) so lines stay at most about 75 characters; default max page width 1020 px (the page says 1020 px; the frontend SCSS setting reads 960 px, see section 5); gutters 30 px.
  **Why** Readable line length and consistent grid. **Applies to** all. **Check** characters per line of body text <= 75 on desktop; main column width <= 2/3 of container. **Source** styles/layout > Screen size, Using the grid system; govuk-frontend `settings/_measurements.scss` ($govuk-gutter 30px).
- **RULE [GOV-79]** Links are blue and underlined by default; the linked text excludes trailing full stops; remove underlines only when context makes the link obvious (nav bars); external-site links name the organisation instead of using an icon; avoid new tabs, and if used put "opens in new tab" in the link text and add `rel="noreferrer noopener"`; on dark backgrounds use white links with >= 4.5:1.
  **Why** Predictability, security (tabnabbing), a11y. **Applies to** all. **Check** `a[target=_blank]` has `rel` noopener and link text includes "opens in new tab"; in-text links underlined. **Source** styles/links.
- **RULE [GOV-80]** Lists: bulleted lists have a lead-in line ending in a colon, items start lowercase and have no full stops; numbered lists are used when order matters, with full-stop endings; add extra spacing when items wrap over many lines.
  **Why** Consistent scanning. **Applies to** all. **Check** visual and copy lint. **Source** styles/lists.
- **RULE [GOV-81]** Colour: use semantic functional colours (text #0b0c0c, secondary text #484949, link #1a65a6 with hover #0f385c, visited #54319f, active #0b0c0c, border #cecece, input border #0b0c0c, focus #ffdd00 with #0b0c0c text, error #ca3535, success #0f7a52, brand #1d70b8, surface #f4f8fb); text and interactive elements meet WCAG 2.2 AA contrast; reserve the focus yellow for focus only.
  **Why** Predictable meaning across components. **Applies to** all. **Check** compute ratios of each text/link pair above against its background (text, secondary text, link and visited colours should pass 4.5:1 on white; the border grey #cecece is decorative and does not); focus colour not used for decoration. **Source** styles/colour > Functional colours. Hex values as shown on the page on 2026-10-08 (v6 brand refresh).
- **RULE [GOV-82]** Focus style: a 3 px yellow (#ffdd00) outline with a dark (#0b0c0c) underline or ring so the focused element is unmistakable on any background; form inputs get an inset 2px dark border plus the yellow 3px outline; box components use a 4 px yellow ring with an 8 px dark outer ring.
  **Why** High-contrast focus. **Applies to** all. **Check** focused element has outline width >= 3px and an adjacent dark or yellow contrasting ring. **Source** govuk-frontend `helpers/_focused.scss` and `settings/_measurements.scss` ($govuk-focus-width 3px) (code read, not a design-system prose page).
- **RULE [GOV-83]** Form control dimensions: text input height 40 px with a 2 px border (dark), no rounded corners, 19 px text; button text 19 px with a 2 px bottom shadow, padding 8 px / 10 px; radios and checkboxes 40 px with a 44 px touch target; small variants 24 px.
  **Why** Large, predictable controls. **Applies to** forms. **Check** `input` height ~40 px; radios 40 px; button height around 40 px including the shadow. **Source** govuk-frontend `input/_mixin.scss` (height 40px, padding 5px, border 2px), `button/_mixin.scss` (padding 8px 10px, shadow 2px), `radios/_mixin.scss`. Derived from SCSS, not prose [unverified for final computed button height].
- **RULE [GOV-84]** Include the page template basics: a `lang` on `html`, a skip link, the header, a `main` with the page content, a footer, JavaScript loaded at the end of body, and a `govuk-frontend-supported` class set by script so enhanced components only run where supported.
  **Why** Progressive enhancement and a baseline of semantics. **Applies to** all. **Check** `html[lang]`, skip link, `main`, `footer` present; scripts at end of body. **Source** styles/page-template > Blocks and options.

## 3. Numbers & scales

Type scale (CSS px; line height in px). Large screens are wider than the tablet breakpoint of 640 px.

| Point | Used by | Large size / line | Small size / line |
|---|---|---|---|
| 80 | exceptional use only | 80 / 80 | 53 / 55 |
| 48 | heading-xl | 48 / 50 | 32 / 35 |
| 36 | heading-l | 36 / 40 | 27 / 30 |
| 27 | exceptional use only | 27 / 30 | 21 / 25 |
| 24 | heading-m, body-l (lead) | 24 / 30 | 21 / 25 |
| 19 | heading-s, body (default) | 19 / 25 | 19 / 25 |
| 16 | body-s | 16 / 20 | 16 / 20 |

Spacing scale (CSS px):

| Unit | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Small screens | 0 | 5 | 10 | 15 | 15 | 15 | 20 | 25 | 30 | 40 |
| Large screens / static | 0 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 |

| Item | Value | Source |
|---|---|---|
| Line length | no more than about 75 characters per line | styles/layout |
| Default max page width | 1020 px on the layout page; SCSS `$govuk-page-width` reads 960 px [conflict, unverified which is current] | styles/layout; govuk-frontend settings |
| Grid widths | full, three-quarters, two-thirds, one-half, one-third, one-quarter | styles/layout |
| Gutter | 30 px (half 15 px) | govuk-frontend `_measurements.scss` |
| Border widths | form element 2 px; wide 10 px; narrow 4 px; default 5 px | govuk-frontend `_measurements.scss` |
| Focus width | 3 px outline | govuk-frontend `_measurements.scss` |
| Input height | 40 px | govuk-frontend `input/_mixin.scss` |
| Radio/checkbox size | 40 px (touch target 44 px, small 24 px) | govuk-frontend `radios/_mixin.scss` |
| Fixed input widths | 20, 10, 5, 4, 3, 2 characters (about 29.5em max for width-30, 20.5em for 20, 11.5em for 10, 5.5em for 5) | text-input; `input/_mixin.scss` |
| Contrast | text and interactive elements WCAG 2.2 AA; inverse button/link on dark at least 4.5:1; green panel interactive elements 3:1 | colour; button; links; confirmation |
| Cookie preference lifetime | 1 year | cookie-banner |
| Login attempts before lock | 5 to 10 | passwords |
| Word/char count threshold example | `data-threshold="75"` shows count at 75% of limit | character-count |
| Principles | 11 (added "Minimise environmental impact" on 2 April 2025) | principles |

Colours (functional, as shown 2026-10-08): text #0b0c0c; secondary text #484949; inverse text #ffffff; link #1a65a6; link hover #0f385c; visited #54319f; active #0b0c0c; border #cecece; input border #0b0c0c; template background #f4f8fb; body background #ffffff; focus #ffdd00 (focus text #0b0c0c); error #ca3535; success #0f7a52; hover #cecece; brand #1d70b8; surface background #f4f8fb, surface border #8eb8dc.

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Label "What is your date of birth?" as the `h1` inside the `legend`, hint "For example, 31 3 1980" | Placeholder "DD/MM/YYYY" as the only label | persistent label |
| Error "Enter your first name" next to the field and the same words in the summary | "This field is required" / "Please enter a valid value" | specific, no filler |
| Error summary titled "There is a problem" linking to the first field in error | Toast that vanishes | persistent, focusable |
| Radios, not pre-selected, with hint "Select one option" | Pre-checked default answer | avoids wrong answers |
| `inputmode="numeric"` text input | `type="number"` for account numbers | no scroll increments |
| One "Continue" primary button, left-aligned | "Next", "Submit", two primary buttons | one clear action |
| "(optional)" on optional fields | Asterisks on required fields | quieter form |
| Postcode accepted with or without space | Rejecting "SE23 6FH" with a space | normalise input |
| Page title "Error: Enter your name - Service" | Title unchanged after an error | AT hears it first |
| Summary list with "Change name" links (hidden context) | "Change" links with no context | link purpose |
| Cookie banner at top, non-sticky, accept and reject equal prominence | Fixed bottom bar covering focus | WCAG 2.4.11 |
| Button "Save and continue" (sentence case) | "SUBMIT" | action wording |
| Accordion only when evidence supports it | Accordion hiding essential info | missed content |

## 5. Exceptions & judgement calls

- **Context mismatch.** GOV.UK rules assume transactional services with one question per page; a SaaS onboarding form or marketing lead form can group fields, as the pattern itself allows ("Asking multiple questions on a page" when research supports it, and for repeat-use internal tools). Keep the validation, error, label and no-placeholder rules; relax one-question-per-page for short forms (two to four fields).
- **Placeholders.** GOV.UK bans placeholders entirely. Vercel (VWI-20) wants placeholders with an example ending in an ellipsis. Both require a real label; the safest merged rule: label always visible, placeholder (if any) is an example only, never the label, with contrast >= 4.5:1. `knowledge/web/implementation-craft.md` line 266 already says not placeholder-only.
- **Validation timing and `required`.** GOV.UK: validate on submit, no HTML5 validation, no `required`. `ui-pedia/16-forms.md` rule at line 106 says validate after the user has finished typing (on blur/pause) and line 103 argues for inline validation; `implementation-craft.md` uses `aria-invalid` and `:user-invalid`. Judgement call: on-blur validation is a legitimate enhancement for dense forms where research supports it, but never validate half-typed values; always include the summary and server validation. Omitting `required` is a documented GOV.UK choice with an acknowledged open question about screen-reader impact; if you use `aria-required`, keep it without browser bubbles (`novalidate`).
- **Error summary vs inline-only.** Vercel says show errors inline and focus the first error field; GOV.UK says show a summary and focus the summary, with links to the fields. Both are valid; summary + inline is more robust for long forms, inline + focus first error is lighter for short ones (one to three fields).
- **Disabled buttons.** GOV.UK and Vercel agree: avoid; `ui-pedia/16-forms.md` line 222 hedges. Follow GOV.UK/Vercel.
- **Sentence case.** GOV.UK sentence case for buttons, labels and headings; matches `knowledge/web/copy-and-ux-writing.md` CW-10; Vercel's Title Case is house style (see `vercel-web-interface-guidelines.md`).
- **"Continue" not "Next".** GOV.UK mandates "Continue" for question pages; `copy-and-ux-writing.md` CW-17 prefers verb + object CTAs for marketing (for example "Start free trial"). Use verb + object for marketing CTAs and funnel entry, and "Continue" for mid-form steps.
- **Page width.** The layout page text says the default maximum is 1020 px, while the current govuk-frontend settings file I fetched sets `$govuk-page-width: 960px`. Possibly the docs page text is stale or the SCSS file I read differs by version; treat the 960 versus 1020 difference as [unverified] and use the measure rule (about 75 characters) instead of the number. `knowledge/web/measurable-assertions.md` L5 uses 45-75 characters (66 ideal), and L11 caps text columns at 75ch: consistent.
- **Body size.** 19 px body is higher than the 16 px web default; `larpo-design-principles.md` / `typography.md` should be consulted before adopting 19 px for marketing; for forms and reading-heavy flows it is a good floor.
- **Hide/reveal components.** GOV.UK is far more cautious about accordions and tabs than most marketing sites; for FAQ accordions on landing pages, the principle still holds: do not hide essential decision information (price, limits) behind a collapse.
- **Brand refresh caveat.** The June 2025 refresh and v6.0.0 (Feb 2026) changed colours, small-screen type sizes and removed some feature flags; older blog posts and code snippets may show different hex values (for example link #1d70b8, error #d4351c) [unverified for older versions].
- **Conditionally revealed content** has a known WCAG 4.1.2 gap (the page says so itself); if you reveal fields, announce with `aria-expanded` or an `aria-live` region.
- **Rounded corners.** GOV.UK inputs have `border-radius: 0`; this is a brand choice, not an a11y rule.

## 6. Figures worth keeping

Not captured as images (text only fetch). Worth screenshotting later from `https://design-system.service.gov.uk/`: error summary + inline error layout (components/error-summary), summary-list with change links (components/summary-list), cookie banner variants (components/cookie-banner), and the layout exploded view (styles/layout), for `examples/`.

## 7. Open questions

- 960 versus 1020 px page width (see section 5).
- Computed button height: derived 38 px plus the 2 px shadow from SCSS padding; not verified in a browser.
- Exact breakpoints beyond the 640 px tablet breakpoint (desktop) were not on the pages I read.
- Several `patterns/*` pages (addresses, names, phone numbers, national insurance, bank details, payment cards, equality information, complete multiple tasks, step-by-step navigation) were fetched but only skimmed: no rules extracted from them beyond the generic templates.
- Some "Research on this component" claims (for example green start buttons improving click-through) are stated by GOV.UK without figures [unverified magnitude].
- `styles/page-template` mentions a `govukRebrand` flag removed in v6; did not trace all v6 changes.
