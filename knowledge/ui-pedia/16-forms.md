---
source: ui-pedia
chapter: Forms (Design Basics)
pages: 390-432
topic_tags: [forms, conversion, validation, labels, placeholders, masks, input-controls, checkboxes, buttons, microcopy, error-messages, progress, multi-step, perception-of-complexity, interaction-cost, autofill, accessibility]
status: studied
---

# Forms

Book-wide note: this chapter is almost entirely qualitative. It gives **no pixel sizes, spacing values, font sizes or contrast ratios**. The only numbers are structural (20 fields as a scary example, 2-3 fields as the "short" case, 3 dropdowns for a date, 3-4 step progress bars). Everything about measurable layout must come from other chapters or from [engine note] items. Page numbers below are PDF pages (printed = PDF - 1).

## 1. Core ideas

1. **A form's job is to collect data, and the data must be trustworthy.** "If the data integrity is compromised, the form has failed to achieve its primary goal" (p.395 pull quote, p.394). Data integrity = precise and consistent, no ambiguous questions that allow multiple interpretations (p.394).
2. **Ask only what you need.** Superfluous questions burden the designer (design + processing) and the user. "Less is more" (p.394). Know the problem you are solving before choosing fields (p.393).
3. **Conversion rate is the success metric**: people who finished / people who started (p.396). It tells you whether the form asks too much. Validate design changes with A/B tests: two copies of the identical form that differ in exactly one thing (p.397).
4. **Perception of complexity** is judged in the first seconds. A wall of fields "jumbled together and in no particular order" makes users abandon before starting (p.398, p.423). Reduce it by trimming fields, chunking, splitting across screens (p.399, p.424).
5. **Interaction cost** = mental + physical effort (typing, scrolling, waiting, re-entering after errors, hunting for information). Lower it by removing ambiguity, splitting across screens, showing progress (p.399-401). Walking users through in small groups beats one long list; a simple question the user cannot answer confidently is worse than a long form (p.401).
6. **A form is a conversation with nobody to ask.** Users cannot ask for clarification, so labels, placeholders, masks, ordering, grouping, microcopy and messages must carry all the context (p.405-406, p.417-418).
7. **Communicate both ways, immediately**: validate inline as they go, confirm success, explain failure with a fix, show that a click registered, show where they are in the flow (p.407-408, p.411, p.414, p.428-432).
8. **Controls affect data quality, not just looks.** Pre-checked checkboxes produce unusable consent data and are unlawful for consent in the EU (p.408-410).
9. **Copy is part of the form UI.** Button text, labels, placeholders, errors all count; specific wording ("Name on card", "Full name as on card") reduces wrong attempts (p.414-415, p.420-421).
10. **Small details compound**: field focus, persistent labels, button states, success screen, microcopy (p.427-428).

## 2. Rules

### A. Scope and data

- **RULE** Before adding any field, justify it against a defined problem; drop every question that is not absolutely necessary. Keep sign-in and newsletter forms to their natural minimum; for others, aim for as few fields as possible (the book's example reduces a 5-field sign-up (name, email, contact number, designation, company) to 3 (name, email, designation)).
  **Why** Every added question lowers conversion and adds processing work. Asking about workout routine to learn about a store's design is pointless.
  **Applies to** forms, all. **Check** field count per step; each field maps to a documented use. **Source** (p.393, p.394, p.402, p.416, p.417)

- **RULE** Word every question so it has one interpretation (specify format and scope).
  **Why** Ambiguous questions yield inconsistent data ("data analysis a nightmare"); integrity means nobody has to second-guess the database.
  **Applies to** forms. **Check** visual/copy review: could two users answer differently while both being "right"? **Source** (p.394, p.421-422)

- **RULE** Where a field's answer has several parts, split it into separate inputs (e.g. name into first and last; birth date into day / month / year, either three small dropdowns or one field with a format placeholder).
  **Why** Forces the user to think of one portion at a time, less brain work, fewer errors, less ambiguity (is day before month? 2- or 4-digit year?).
  **Applies to** forms. **Check** multi-part values (name, date, phone, address) are not one free-text field without a format hint. **Source** (p.421-422, p.425, p.426)

### B. Conversion, first impression, length

- **RULE** Treat form length as inversely related to conversion: "the longer your form will be, lower will be the conversion rate"; every extra question loses some users.
  **Why** Users will not wait or put in effort; they abandon when patience runs out.
  **Applies to** forms. **Check** count visible fields at first paint; measure completion rate. **Source** (p.402, p.416)

- **RULE** Make the form look short and easy at first glance. If it looks too long, complicated or time-consuming, users abandon before starting; the first second is "the first and possibly most significant test".
  **Why** First impression decides whether they bother to try (perception of complexity).
  **Applies to** forms, landing page. **Check** visual: visible field count and density on load; compare variants via A/B. **Source** (p.398, p.423-424)

- **RULE** When a form cannot be short (not every form can have 2-3 fields), reduce perceived complexity by (a) dividing into sections by topic, (b) dividing across multiple screens/pages, (c) saving data frequently on long forms so the user need not restart.
  **Why** Avoids overwhelming at first glance; protects user effort (work is not lost if the connection breaks).
  **Applies to** forms. **Check** step count vs field count; draft persistence exists. **Source** (p.402-403, p.424-425)

- **RULE** Show progress on multi-step forms with a progress bar / step indicator (the book shows 3- and 4-step versions; completed step = filled circle with check, current = hollow ring, upcoming = filled muted circle, joined by a line).
  **Why** Gives a sense of satisfaction per screen and answers "how much is left" ("light at the end of the tunnel"), which otherwise adds mental load from repeatedly checking.
  **Applies to** multi-step forms, checkout, onboarding. **Check** an indicator with current step identified is present on every step. **Source** (p.400, p.403, p.404, p.431)

- **RULE** On segmented forms, use paired navigation: a secondary (outlined) "Previous" and a primary (filled) "Next", questions in small groups per screen; save the data at each new screen.
  **Why** "Paging back and forth" must be possible without loss; small groups are less daunting than a big list.
  **Applies to** multi-step forms. **Check** every step after the first has Previous; state persists on back. **Source** (p.400, p.401, p.403, p.404)

- **RULE** Use a breadcrumb-style navigation (e.g. "1. Review house rules > 2. Who's coming? > 3. Confirm and pay") or progress bar so users know where they are in a longer flow.
  **Why** Tells users where they are and how much time remains; gives sense of success nearing the end.
  **Applies to** checkout, booking, onboarding. **Check** visual. **Source** (p.431, p.432)

### C. Order, grouping, context

- **RULE** Order questions as a face-to-face conversation would: start with easy ones (name, occupation), move later to questions that take minutes (rating a service, suggestions); never open with something personal or heavy.
  **Why** Mirrors natural conversation; easy start builds momentum.
  **Applies to** forms. **Check** visual: first field is the lowest-effort one. **Source** (p.404-405, p.418)

- **RULE** Group questions by topic (and into labelled parts, e.g. "Choose Payment Type" then "Fill Details" in the book's checkout).
  **Why** Surrounding questions give context, so users can infer what they do not fully understand.
  **Applies to** forms. **Check** visual; fields of one topic contiguous under one heading. **Source** (p.405, p.418)

- **RULE** Use a single column. Do not put fields in two side-by-side columns (the book's one flat prohibition: "two columns are a no-no").
  **Why** Usability and responsiveness: users cannot tell which side leads or whether to finish one column first; use a new screen for the second column instead.
  **Applies to** forms, mobile. **Check** DOM/layout: input fields stacked, one per row (see exception for tightly related pairs in section 5). **Source** (p.426, p.427)

### D. Labels, placeholders, masks

- **RULE** Give every field a label: a short, one- or two-word, descriptive description of what to enter that conveys the real question.
  **Why** Users cannot ask for help; the label is the question.
  **Applies to** forms. **Check** every input has an associated visible label. **Source** (p.406)

- **RULE** Make labels specific enough to prevent wrong attempts: "Name on Card" not "Name"; "Full name as on card" in a checkout.
  **Why** Appropriate wording reduces the number of attempts people need; the extra words look unnecessary but add appreciated clarity.
  **Applies to** forms. **Check** copy review, no generic one-word label where the meaning is ambiguous. **Source** (p.415, p.416, p.421)

- **RULE** Use placeholders for short format hints/example content (the book's figures show a card number placeholder and a faded example e-mail in an empty field). Do not make the placeholder the only place help lives.
  **Why** Placeholder = in-field guidance of what to write. The book also warns against "labels that vanish": do not give help only to take it away once typing starts; users may need to return to the label mid-answer.
  **Applies to** forms. **Check** label remains visible when the field has a value (not placeholder-as-label). **Source** (p.405, p.406, p.428)

- **RULE** Use masks for fields with a required format (dates, credit card numbers), e.g. `XXXX XXXX XXXX 9870` with the card-network logo at the end of the field.
  **Why** A mask acts as a foundation so users do not have to guess how to convey information.
  **Applies to** forms: dates, card numbers, phone. **Check** format-bound fields enforce/auto-format their pattern. **Source** (p.405, p.406-407)

### E. Validation and errors

- **RULE** Every form must have validation; do not leave errors for the final submit. Validate inline, next to each field, as the user goes.
  **Why** Nothing is more irritating than completing a form and receiving a confusing error at the last minute; the user gives up. Inline validation also reassures that everything is going fine and avoids being blocked later.
  **Applies to** forms. **Check** per-field valid/invalid state is shown without submit. **Source** (p.407, p.408, p.419)

- **RULE** Do not validate until the user has finished typing (e.g. on blur / pause), never mark a half-typed value invalid.
  **Why** Partial values are flagged invalid and confuse users.
  **Applies to** forms. **Check** invalid state not shown while the field is focused and mid-entry. **Source** (p.420)

- **RULE** Never signal valid/invalid with colour alone. Always add a clearly recognisable symbol (the book uses a check-in-circle for valid and a red x-in-circle for invalid, alongside a red-tinted field), plus text.
  **Why** A red outline alone can be confusing for visually impaired users.
  **Applies to** all, accessibility. **Check** each state has an icon or text in addition to colour change. **Source** (p.408, p.412, p.420)

- **RULE** Error messages must say exactly what is wrong and how to fix it, not merely that something is wrong. Example: "Please insert a full email address, complete with @".
  **Why** Nobody likes errors; a useful one turns a time-waster into help. (Exception: system faults, where there is no user remedy.)
  **Applies to** forms. **Check** message contains cause + remedy; no "Invalid input" strings. **Source** (p.410, p.411, p.412, p.422)

- **RULE** Inline validation can be a check icon, a field colour change, a text message, or a combination; whichever is used must be continuous and consistent across the form.
  **Why** Constant, consistent communication between form and user is what matters ("usability is the name of the game").
  **Applies to** forms. **Check** same pattern for every field. **Source** (p.408)

- **RULE** Where multiple fields fail, a form-level banner at the top may summarise ("One of fields is incorrect or invalid. Please follow the examples in order to continue") while each failing field shows its own icon and short message (e.g. "This mobile number invalid" pointing at the field).
  **Why** Two levels: global notice + local location of the problem (as drawn in the book's figure).
  **Applies to** forms. **Check** visual: banner (red info icon + red text) above title, and per-field markers. **Source** (p.407, p.411, p.419)

### F. Input controls and consent

- **RULE** Choose input controls that are as obvious as possible; the real concern is the integrity of collected data, not just avoiding confusion.
  **Why** Some UI elements produce unclear data.
  **Applies to** forms. **Check** control matches data type (see D, G). **Source** (p.408-409)

- **RULE** Never pre-check a checkbox that records consent, a preference or a decision. Leave it unchecked, or use an explicit Yes / No pair with nothing selected.
  **Why** With a pre-checked box you cannot know whether the user saw it or understood it, so the data is doubtful; pre-checked boxes to obtain consent to personal-data use are unlawful in the EU and can affect a business based elsewhere.
  **Applies to** forms, consent, newsletter, privacy policy. **Check** `input[type=checkbox][checked]` on consent/preference/decision fields = fail. **Source** (p.409, p.410)

- **RULE** Support autofill / use information already stored in the browser so users reach the end faster.
  **Why** A form that does part of the work is appreciated; higher conversion. The book notes there are some security risks but the technique is widely used and accepted.
  **Applies to** forms. **Check** inputs carry proper `autocomplete`/`name` attributes (e.g. email, tel, cc-number, name). **Source** (p.410)

### G. Buttons

- **RULE** One primary button (draws attention; moves to next screen or finishes/submits) and secondary actions styled clearly lower (e.g. "Forgot your password?", "Previous"). Make the order and hierarchy of the buttons unmistakable.
  **Why** Users must not press the secondary action when they meant the primary.
  **Applies to** forms. **Check** one filled primary per form view; secondary styled outline/ghost/link. **Source** (p.412, p.413)

- **RULE** Do not include a "Clear" or "Reset" button.
  **Why** An accidental reset destroys all the user's work.
  **Applies to** forms. **Check** no `button[type=reset]`. **Source** (p.413)

- **RULE** Give button feedback: use a micro-animation after the tap so users know the signal was recognised (no worrying whether it works, no repeat presses).
  **Why** Users who think the form missed their command press the same button repeatedly.
  **Applies to** forms. **Check** pressed/loading state exists. **Source** (p.414, p.431)

- **RULE** Consider keeping the primary button disabled until all required fields are complete, and change its appearance when enabled (e.g. a brighter colour) to draw the eye. The book's figure: disabled = flat grey button with a faded example in the field; enabled = saturated dark button with real value in the field.
  **Why** Signals readiness and draws attention to the next action. (The book says "might also think about": hedged, see section 5.)
  **Applies to** forms. **Check** button has distinct disabled and enabled styles. **Source** (p.414, p.413, p.427)

- **RULE** Replace generic button text ("Submit") with a label that states the user's purpose / outcome (book examples: "Create New Account", "Pay Now", "Get Premium"-style copy on Spotify's payment button, "Sign Up").
  **Why** Keeps the user focused on the goal that made them start the form; a gentle reminder of the end result.
  **Applies to** forms. **Check** no button with text "Submit". **Source** (p.414, p.415, p.427, p.428)

### H. Feedback and detail

- **RULE** Keep users informed about what is happening: show that something is occurring behind the screen, even if only a simple loading animation; provide a success screen on completion.
  **Why** People like to know what is happening; uninformed users second-guess and rewrite correct data, or re-press the same button.
  **Applies to** forms. **Check** loading state on submit; success state exists. **Source** (p.427, p.429, p.431, p.432)

- **RULE** Provide field focus (visible focus state) so users stay focused on the question at hand.
  **Why** Reduces mix-ups.
  **Applies to** forms. **Check** `:focus` style differs visibly from default. **Source** (p.427, p.428)

- **RULE** Plan every piece of microcopy (buttons, placeholders, labels, errors, helper text under the title such as "Login and enjoy the UI Book, read daily").
  **Why** Every detail is an opportunity to communicate; more information on the form means fewer misunderstandings; users do notice.
  **Applies to** forms. **Check** copy review. **Source** (p.414, p.420, p.428)

- **RULE** Prefer reducing a two-purpose login screen to the essentials: for login ask only email and password, a "Remember me" checkbox and "Forgot password?" link, one primary Login button, then a divider ("Or") with social login buttons (Google, Facebook, Apple, as icon-only squares), then "Not a member? Register".
  **Why** The book's "after" version of a login form removes name, mobile number and date of birth from a login (those belong in sign-up) and moves social options below a labelled divider.
  **Applies to** login. **Check** login form has at most the credentials fields. **Source** (p.398, p.417)

### Audit additions (audit 2026-10-15)

- **RULE** Put each label above its field, left-aligned flush with the field's left edge, and place it closer to its own field than to the field above: in the book's figures the label-to-field gap is about 11-15px and the field-to-next-label gap about 18px at page scale (roughly 1:1.3 to 1:1.6), i.e. about a quarter versus two fifths of the field height.
  **Why** Proximity binds each label to the field it names; the "before" login (p.398) with labels to the left of short fields is the version the book replaces.
  **Applies to** forms. **Check** label bottom-to-field top gap < field bottom-to-next-label gap; label x == field x. **Source** (p.393, p.398, p.403, p.404, p.417) (audit 2026-10-15)

- **RULE** On a single-screen form, make the primary button the full width of the fields and about the same height (0.85-1.0x field height: about 49 vs 48px on p.393, 40 vs 45px on p.403, 39 vs 44px on p.413 at page scale), and open a larger gap above it than between fields (about 28-30px vs 18px, roughly 1.5x).
  **Why** The book's improved forms all end in one full-width button aligned to the field column; the extra gap separates "answer" from "act". The "before" login (p.398) uses a small centred button instead.
  **Applies to** forms. **Check** button width == field width; button height / field height 0.85-1.0; gap above button > inter-field gap. **Source** (p.391, p.393, p.398, p.403, p.413, p.417) (audit 2026-10-15)

- **RULE** Place the validation icon inside the field at the trailing edge, vertically centred, about 0.4x field height (about 19-20px in a 45px field at page scale). Show invalid by turning the whole field fill pale red/pink plus a red circle-x; show valid by keeping the field's normal fill and adding a check in a dark brand-colour (navy) circle, not green.
  **Why** The icon sits where the eye ends the entry, the fill change marks the whole field, and the symbol (not the colour) carries the meaning, per the book's no-colour-alone rule.
  **Applies to** forms. **Check** icon right-aligned inside the input, vertical centre == input centre; invalid state changes background, not only border. **Source** (p.403, p.407, p.411, p.419) (audit 2026-10-15)

- **RULE** Write the form-level error banner for the specific case: name the failing fields and the cause (the book's p.411 banner: "Please check ... your mail and mobile number are not registered to Pixsel.com"), shown as a red info-circle icon plus red text above the form title, with no box around it; mark every field it names as invalid.
  **Why** The banner and the field markers must agree so the user can find and fix each problem; generic "one of fields is incorrect" (p.407) is the weaker variant.
  **Applies to** forms. **Check** banner text references the same fields that carry invalid markers. **Source** (p.407, p.411, p.419) (audit 2026-10-15)

- **RULE** Use the placeholder to state the expected value or requirement, not the label (the book's improved form puts "Strong Password" in the password field), and render placeholder/example text visibly lighter (grey) than an entered value (dark).
  **Why** The user must tell "hint" from "my answer" at a glance; on p.413 the faded example e-mail is what tells you the field is still empty.
  **Applies to** forms. **Check** placeholder colour lighter than value colour; placeholder text differs from the label. **Source** (p.413, p.415, p.421, p.423) (audit 2026-10-15)

- **RULE** Give each multi-step screen a small "Step N" eyebrow above a question-style heading ("What's Your Name..?", "Fill The Personal Details"), with the progress indicator at the top of the card.
  **Why** The heading asks the question, so the fields underneath read as one small group (the book's "questions in small groups" annotation).
  **Applies to** multi-step forms, onboarding. **Check** visual: step indicator above heading above fields on every step. **Source** (p.400, p.403, p.404) (audit 2026-10-15)

- **RULE** Draw step navigation in one of the book's two grammars: (a) a compact pair, equal widths (about 108x40px at page scale, about 19px apart), centred or right-aligned under the fields, outlined "< Previous" and filled "Next >" with chevrons pointing the travel direction; or (b) a full-width filled "Next >" with "< Previous" as a centred underlined accent-colour text link below it.
  **Why** Chevrons make direction readable before the label; the filled/outlined (or button/link) contrast keeps the forward action dominant.
  **Applies to** multi-step forms. **Check** Previous carries a left chevron, Next a right chevron; Previous never filled. **Source** (p.400, p.403, p.404) (audit 2026-10-15)

- **RULE** For a stepper, put step labels ("Step 1".."Step 4") above evenly spaced circular nodes joined by a thin line across the form width; for a progress bar, use a thin full-width pill (about 7px at page scale) under the header, accent fill on a pale track of the same hue, growing each screen (about 35% on the first screen, about 62% on the next in the book's two-screen example).
  **Why** The bar's fill answers "how much is left" without reading; even spacing makes steps feel equal-sized.
  **Applies to** multi-step forms, checkout, onboarding. **Check** bar fill width increases monotonically per step; nodes evenly spaced. **Source** (p.400, p.403, p.404) (audit 2026-10-15)

- **RULE** Separate topic groups inside one form with a full-width hairline divider and a small group heading that is larger than the field labels (book: "Choose Payment Type" | divider | "Fill Details" > "Card Number:", "Valid Date:", "CVV:", "Holder Name:").
  **Why** The divider and heading turn a list of fields into two visible packs, which is the book's main tool against perceived complexity.
  **Applies to** forms, checkout. **Check** visual; group headings outrank labels in size/weight; one divider between groups. **Source** (p.405, p.423, p.427) (audit 2026-10-15)

- **RULE** Give typed fields their trailing affordance icon inside the field: calendar icon on date fields, chevron on selects (payment type, expiry, member count), card-network logo on the card number; a counter field can lead with a people icon.
  **Why** The icon tells the user which control they are dealing with (pick vs type) before they touch it.
  **Applies to** forms, booking, checkout. **Check** `select`/date inputs render a trailing icon. **Source** (p.396, p.397, p.405, p.423, p.427) (audit 2026-10-15)

- **RULE** Make the primary button's label echo the screen's headline outcome and change it per step: "Create a New Account" heading > "Create New Account" button (was "Sign Up"); Airbnb's steps end in "Agree and continue", "Continue", "Request to Book".
  **Why** The book's microcopy rule (state the user's purpose) applied per screen; the button is a reminder of what this click does.
  **Applies to** forms, multi-step flows, checkout. **Check** button text on each step is a verb phrase matching that step. **Source** (p.393, p.431) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| "Short by default" forms | sign-in, newsletter subscribe | p.402 |
| Short form target | 2-3 entry fields (not always achievable) | p.402 |
| Terrifying field count | "20 field entries all jumbled together, in no particular order" | p.398 |
| Book's sign-up reduction | 5 fields (name, email, contact number, designation, company) to 3 (name, email, designation) | p.393 |
| Book's login reduction | 5 fields (name, Gmail name, mobile, date of birth, password) to 2 (email, password) | p.398, p.417 |
| Step indicators shown | 4 steps (p.400); 3 steps (p.403); thin progress bars at about 35% (roughly one third) and about 62% (roughly three fifths) filled (p.404) | p.400, 403, 404 |
| Date field split | 3 dropdowns: day, month, year (or one field + format placeholder) | p.426 |
| Time to first impression | "within a second of the user opening the form" | p.423 |
| Stepper node states | complete = filled dark circle + check; current = hollow ring; upcoming = filled muted circle; connector line between | p.400, 403 |
| Validation icons | valid = dark check-in-circle; invalid = red x-in-circle; field tint red/pink when invalid; banner uses red info (i) icon + red text | p.407, 411 |
| Reduce-complexity techniques | 3 listed: topic sections; multiple screens; frequent saving | p.424-425 |

Colours seen in the book's mockups (approximate, from the images, not specified in text): primary buttons slate navy; accent/links periwinkle blue (~#7B8CFF); inputs either outlined with 1px-ish slate border and rounded corners or filled pale blue; invalid fields pale red tint; disabled button flat mid-grey. No pixel dimensions are given.

Figure geometry measured from the page images (audit 2026-10-15). The text gives no sizes; these are measured at page-image scale (1056px-wide page), so use the **ratios**, not the px:

| Item | Measured | Ratio / reading | Source |
|---|---|---|---|
| Outlined field (sign-up) | h ~48, w ~305, radius ~9, text inset ~18 | w:h ~6.3:1; radius ~0.19h; inset ~0.37h | p.393 (audit 2026-10-15) |
| Filled field (stepper form) | h ~45, radius ~8, text inset ~27 | filled fields use a deeper inset than outlined | p.403 (audit 2026-10-15) |
| Label to own field / field to next label | ~11 / ~18 (p.393); ~15 / ~18 (p.403); ~8-10 / ~12-14 (p.404) | label is always nearer its own field | p.393, 403, 404 (audit 2026-10-15) |
| Field pitch (top to top) | ~89 | ~1.85x field height | p.393 (audit 2026-10-15) |
| Primary button vs field height | 49/48 (p.393); 40/45 (p.403); 39/44 (p.413); 38/44 (p.415) | button 0.85-1.0x field height, full field width | p.393, 403, 413, 415 (audit 2026-10-15) |
| Gap last field to primary button | ~30 (p.393); ~28 (p.403); ~27 (p.413) | ~1.5x the inter-field gap | p.393, 403, 413 (audit 2026-10-15) |
| Validation icon | ~19-20 diameter, centre ~26 from field's right edge | ~0.43x field height, vertically centred | p.403, 407 (audit 2026-10-15) |
| Step nav pair | each ~108x40, gap ~19; fields on same screen ~52 tall | nav buttons shorter (~0.75x) than fields | p.404 (audit 2026-10-15) |
| Segmented First/Last name fields | h ~58; nav buttons h ~40; gap between halves ~28 | — | p.400 (audit 2026-10-15) |
| Paired short fields (Valid Date + CVV) | two equal halves, gutter ~42 | 50/50 split | p.405 (audit 2026-10-15) |
| Progress bar | ~7 tall pill, full card width; fill ~35% then ~62% | accent on same-hue pale track | p.404 (audit 2026-10-15) |
| Stepper node | ~30 diameter circles, thin connector, labels above | 3-4 nodes evenly spaced | p.400, 403 (audit 2026-10-15) |
| "Before" login (label-left) | fields ~30 tall, small centred button ~108 wide | the version the book rejects | p.398, 417 (audit 2026-10-15) |
| Social login buttons (after) | ~26px outlined squares with brand glyph, 3 in a row, centred under "Or" hairline divider | — | p.398, 417 (audit 2026-10-15) |

## 4. Dos and Don'ts

**Do (book's "Follow the right path", p.416-423)**
1. Keep it short and sweet: leave out everything not absolutely necessary (p.416-417). Figure p.417 (Before/After): "Before" login has 5 label-left fields (name, email, mobile, DOB, password), centred small Login button, "Or" with text-only Google/Facebook/Apple, "Create a new account" link. "After" has email + password only, Remember me left and Forgot password right, full-width Login button, "Or" rule, three icon buttons, "Not a member? Register".
2. Context is king: logical order, similar questions grouped (p.417-418).
3. Validation is non-negotiable: tell users as soon as possible and say why (p.419). Figure p.419: banner error with red i icon at top of the card; e-mail and mobile fields red-tinted with red x icons; username field valid with check; full-width Next button.
4. Add value to copy: specific labels and errors (p.420-422). Figure p.421: left = empty fields, black labels, grey disabled button; right = coloured labels, filled sample values, "Forgot password?", saturated blue button.

**Don't (book's "Things that can get you wrong", p.422-432)**
1. Set the form up to fail: long/complicated-looking first impression (p.422-425). Figure p.423: left = login-style card, right = a checkout card that is short and clearly sectioned (payment type select, card number with VISA, validity select + CVV side by side, holder name, total + black Pay Now): "Notice how simple the checkout form is, you could check out in mere seconds."
2. Make data entry difficult: don't make users type multi-part answers into one field (p.424-426). Figure p.425: Omada Health "Let's connect" form with name already split into two inputs and tabs for "Sales Support / User Support / Something Else" (screenshot of a third-party site; text unreadable at book resolution).
3. Use two columns (p.426-427).
4. Forget the minute details: field focus, success screen, changeable button states, vanishing labels, unplanned microcopy (p.427-428). Figure p.427: Spotify payment form (left black brand panel "Get Premium with Hulu", right payment type select, card number, valid date + CVV, holder name, "Total amount" + black Pay Now). The book praises Spotify's button microcopy.
5. Do not update the user about the moment: no feedback that anything is happening (p.429-432). Figure p.431: Airbnb three-step booking flow ("Review house rules" > "Who's coming?" > "Confirm and pay") with a step breadcrumb at the top of each screen.

**Other paired examples**
- Checkboxes (p.409): Left (bad) two pre-ticked checkboxes with statements "I want to receive weekly news" and "I accept the privacy policy". Right (better) each statement is a question with a Yes box and a No box (the example shows one box ticked in each pair, purely as illustration). Lesson: capture an active answer rather than a default.
- Button state (p.413): Left: "Confirm" button flat grey, example e-mail in the field is faded (disabled/not yet filled). Right: field has real e-mail, button dark navy (enabled). Lesson: button state follows form completeness.
- Label/Placeholder/Mask annotation (p.405): Label = "Choose Payment Type"; Placeholder = "Debit Card" inside a select; Mask = `XXXX XXXX XXXX 9870` with VISA mark at right; Valid date select + CVV in one row; Holder name below.
- Booking widget A/B (p.396-397): version A is a horizontal bar docked under the hero (Location, Arrival, Leave, Members + black Book Now, offer card floating at right of hero image); version B is a vertical stack of the same four fields + Book Now in a frosted card at the left of the hero, offer strip moved to the bottom. The book only says the two copies differ "with only one difference" and gives no verdict.

**Audit additions (audit 2026-10-15)**
- Sign-up reduction, second change (p.393): besides cutting 2 fields, the "after" card changes the button from "Sign Up" to "Create New Account", matching its two-line heading "Create a New Account", and gives the shorter form more air (larger heading, fields start lower). Lesson: trimming fields and naming the outcome happen together. (audit 2026-10-15)
- Login before/after geometry (p.398, p.417): "before" = labels left of the fields, short fields (~30px at page scale) packed ~14px apart, a small centred Login button, text-only Google/Facebook/Apple; "after" = labels above, taller fields, Remember me (left) and Forget password (right) on one row between the password field and a full-width Login, an "Or" with hairlines both sides, three outlined icon squares, "Your not a member? Register" with Register in the accent colour. What was wrong: label-left rows plus a small button read as a dense table with no clear end. (audit 2026-10-15)
- Booking bar detail (p.396-397): even in the horizontal bar every field keeps its own label above it; date fields carry a trailing calendar icon; Members is a narrower select with a leading people icon and a trailing chevron; the black Book Now matches the field height and aligns with the field row. (audit 2026-10-15)
- Multi-step nav, two variants on adjacent pages: p.403 full-width "Next >" with "< Previous" as a centred underlined accent link below; p.400 and p.404 compact equal-width "< Previous" (outline) + "Next >" (filled) pair. Both keep Previous visually weaker. (audit 2026-10-15)
- Validation states side by side (p.403 vs p.407 vs p.411): p.403 shows icons only (fields stay pale blue, one red x); p.407 adds a pink fill on the invalid field, an annotation "This Mobile Number Invalid" and a generic red banner; p.411 has two invalid fields (pink + red x), one valid (blue + navy check), a banner that names both failing fields, and a helper line under the title ("Login And Enjoy the UI Book, Read Daily"). The p.411 version is the most complete. (audit 2026-10-15)
- Enabled-vs-disabled (p.413): both cards are white on a grey panel; the disabled one has a grey example value in the outlined field and a flat mid-grey Confirm; the enabled one has the dark real value and a navy Confirm. Only the value colour and the button fill change; layout is identical. (audit 2026-10-15)
- Vs pair (p.415, p.421): good side colours the heading and the field labels in the accent periwinkle, fills the e-mail with a value, puts "Strong Password" as the password placeholder, adds "Forget Password...?" right-aligned on the Remember-me row and makes the button a saturated accent; bad side has two empty outlined fields, black labels, no forgot-password link and a grey-blue Login. (audit 2026-10-15)
- Omada Health contact form (p.425), readable on zoom: tabs with icons at the top choose the enquiry type (Sales Support / User Support / Something Else) before any field; labels sit right-aligned to the LEFT of the fields with an asterisk on required ones (Name*, Title*, Company*, Type*, Email*, Phone*; Message optional); Name is split into two inputs ("Jane" / "Doe" placeholders); Type is a 3-way segmented choice (Employer / Consultant / Health Plan); placeholders are realistic examples ("VP of HR Benefits", "Example Company", "jane@example.com", "(123) 456-7890"); a multi-line Message textarea; a pale "GET IN TOUCH" button right-aligned under the fields; contact details sit outside the card on the right. The book only cites the name split; the left-label layout here contradicts the book's own above-label figures and is not endorsed. (audit 2026-10-15)
- Airbnb flow (p.431), readable on zoom: the breadcrumb "1. Review house rules > 2. Who's coming? > 3. Confirm and pay" sits top-centre with completed and current steps darker than upcoming ones; each step ends in one left-aligned primary with a step-specific label ("Agree and continue", "Continue", red "Request to Book"); the pay step uses a selected-card radio ("Pay in full", outlined and filled dot) vs "Pay less upfront", and a booking summary card on the right (listing, dates, guest count, price breakdown, Total). (audit 2026-10-15)
- Checkout ending (p.423, p.427): the last row places "Total Amount: $..." on the left and a black content-width "Pay Now" on the right, so the price is read just before the action. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- **Two columns "no-no" is stated absolutely**, but the book's own figures put short related fields side by side (First Name / Last Name on p.400; Valid Date / CVV on p.404, p.423, p.427) and uses a horizontal booking bar (p.396). [engine note] Treat the rule as: do not run the whole form as two parallel columns of unrelated fields; short, tightly related pairs sharing one row are used by the book itself, and the whole bar must still read in one clear path.
- **Disabled-until-complete button** is hedged ("You might also think about enabling the primary button just once you've completed all the needed forms", p.414). [engine note] A disabled button gives no hint of what is missing; if used, pair it with inline validation so the user can see why. Not a hard rule.
- **Placeholder**: the book's text lists labels and placeholders with identical definitions (p.406, apparent copy error). The figures show a placeholder as in-field sample content; the book also forbids labels that vanish (p.428). Taken together: a visible, persistent label plus optional placeholder example (opinion/inference; flagged in section 7).
- **Autofill** is endorsed despite "certain safety risks" (p.410); no mitigation is given.
- **Progress indicator vs. long single page**: the book recommends breaking forms into screens, but also warns about paging back and forth and about interaction cost from clicking; it resolves it with Previous/Next plus saved data (p.399-403). No threshold for when to split is given (no field count). [engine note] A single-page form with grouped sections is a valid choice for short forms.
- **Validation timing**: "as soon as possible" (p.419) vs. "not until users have finished typing" (p.420): resolve as validate-on-completion of each field (blur/pause), not on every keystroke.
- **Colour-only errors**: the book's own mockups use red tint plus icon, consistent with its rule. Red text on the error banners is small; [engine note] check contrast.
- **Generic button text**: the book's own figures label buttons "Login", "Confirm", "Next", "Pay Now". Per its rule, outcome-specific verbs ("Create workspace", "Pay now") are preferred to "Submit"; "Confirm" and "Login" are shown in the figures without comment.
- **Social login** (p.398, p.417) is shown as icon-only squares under an "Or" divider in the improved version, and as text-only labels in the cluttered version; the book does not state this as a rule. (observation, not rule)
- The book frames A/B testing as the way to settle disputed form choices (p.397); where this chapter is silent on a number (field sizes, spacing), it does not mean there is no right answer.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/forms/`:

- p.393: Sign Up with 5 fields vs Create a New Account with 3 fields (cut contact number and company); arrow shows the reduction.
- p.396: booking bar (Location, Arrival, Leave, Members + Book Now) in horizontal form docked under a hero, conversion context.
- p.397: same booking form as a vertical glass card (A/B variant), plus A/B-test text.
- p.398: Before / After login form (5 fields + text-only social vs email + password + icon social with "Or" divider).
- p.400: annotated multi-step anatomy: progress bar / segmented form, questions in small groups (First/Last name), paging back and forth (Previous outline, Next filled).
- p.403: 3-step stepper + inline validation icons (valid check, invalid x) on filled-pale-blue fields; "Previous" as a link under a full-width Next.
- p.404: two segmented screens with thin progress bars, logical order (login credentials, then personal details), outlined Previous + filled Next.
- p.405: annotated Label / Placeholder / Mask on a payment form (card number mask + VISA, valid-date select, CVV).
- p.407: validation figure: form-level red banner + per-field red x / valid check.
- p.409: pre-checked checkboxes vs explicit Yes/No pairs.
- p.411: actionable error: banner + red-tinted invalid fields + helper subtitle.
- p.413: disabled grey button with empty/faded field vs enabled dark button with real value.
- p.415: empty fields + grey Login vs filled, coloured labels, Forgot password, saturated Confirm button; plus "Name" vs "Name on Card" label lesson.
- p.417: Before/After login (second copy, with clearer small text).
- p.423: complex-looking card vs the short, well-sectioned checkout.
- p.427: Spotify payment form with specific button microcopy.
- p.431: Airbnb 3-step booking flow with step breadcrumb.
- p.425: Omada Health contact form: enquiry-type tabs, asterisk-marked required fields, split name, segmented Type control, example placeholders (legible when zoomed). (audit 2026-10-15)
- p.411: specific error banner that names the failing fields, two invalid + one valid field, helper line under the title, split image/form card. (audit 2026-10-15)

## 7. Open questions

- p.406 vs figure p.405: the OCR text defines Labels and Placeholders with an identical sentence (the book copy-pasted). The intended placeholder definition is not stated in text; inferred from the figure. Do not quote it as a book rule.
- p.413/p.415/p.421/p.423: the book's text on "microcopy" says "Drive attention to the button designs" twice (p.412 and p.414 headings repeat; second is clearly meant as "Microcopy"). The figure pairs on p.415 and p.421 are captioned only "Vs"; which side is the good one is inferred (right = coloured labels + filled button + Forgot password).
- p.409: the pre-checked-box figure's right-hand "better" version shows "No" ticked for the privacy-policy acceptance; this seems an illustrative state, not a recommendation.
- The book's mockups contain typos ("Passward", "Vaild", "Conform", "Invaild", "Brochers", "$ 239.098", "$ 12.098"); do not copy their copy. The Total Amount values appear in the images exactly as printed ($239.098; $12.098), so these are errors in the figures, not OCR errors.
- The "A/B test" on p.396-397 is a layout comparison with no stated winner.
- The chapter gives no field height, input spacing, label position (above vs left), font size, contrast or touch-target values. Not in the source; none invented here. (Figures show labels above fields in the improved versions; the "before" login on p.398 uses labels to the left of fields.)
- Page 425 (Omada Health screenshot) is tiny and illegible in the book image; only the "name split in two" point is readable.
- p.395: pull-quote page (data integrity). No further rule content beyond the quote.
- p.430 is a full-page pull quote ("People like to know what is happening. That can be tough when dealing with a machine or with a mass code - It's not like you can poke it and ask if everything is ok."); no extra rule content.
- p.390: chapter title page with login mock-up (Hello...! Welcome; email, password, Remember me, Forget password, Login + Signup buttons, social icons); no rule content beyond intro. p.391: intro and a clean login form figure (title, email, password, Remember me / Forget password, full-width Login, "Not a member? Register"); no rule content.
- p.392: definition of a form and key principles intro (short forms vs complex forms; designers have freedom but must keep usability criteria): background only, folded into section 1.
- p.432: closing summary ("Points to be noted"); no rule content.

- (audit 2026-10-15) corrected: section 3 progress-bar fill, was "roughly one quarter and roughly three fifths", page shows about 35% (one third) and about 62% (p.404).
- (audit 2026-10-15) corrected: section 4 Do item 4 figure citation, was "Figure p.420", page shows the Vs figure on p.421 (p.420 is text only) (p.421).
- (audit 2026-10-15) The earlier note that p.425 is illegible is too strong: zoomed, the Omada form's labels, placeholders, tabs and button are readable (captured in section 4). Its left-aligned labels with asterisks are a third-party screenshot, not book guidance.
- (audit 2026-10-15) Two-column check: the Airbnb "Confirm and pay" step (p.431) puts a summary card beside the payment form. Together with the Valid Date/CVV and First/Last name pairs this supports the section 5 reading: no two parallel columns of questions, but a read-only summary or a short related pair beside the main column appears in the book's own figures.
- (audit 2026-10-15) All figure geometry in section 3 is measured from the page images at 1056px page width (page scale, not CSS px); the book states no sizes. Use the ratios.
- (audit 2026-10-15) Coverage: p.395 and p.430 are pull-quote pages; p.392, p.394, p.399, p.401, p.402, p.406, p.408, p.410, p.412, p.414, p.416, p.418, p.420, p.422, p.424, p.426, p.428, p.429 and p.432 are text-only (no figure); their text points were already in the note. p.390 and p.391 are intro pages whose login figures repeat the "after" login grammar (labels above, Remember me / Forget password row, full-width button on p.391; p.390 shows Login + Signup side by side, which the later figures drop).

### Page coverage map (390-432)
390 intro/title; 391 intro + login figure; 392 definition, principles; 393 data gathering (+ figure); 394 data integrity, ambiguity; 395 pull quote; 396 conversion (+ booking bar); 397 A/B tests, perception of complexity, interaction cost intro (+ vertical variant); 398 perception of complexity (+ before/after); 399 abandonment, interaction cost; 400 interaction cost anatomy figure + list; 401 lowering interaction cost; 402 short and simple; 403 segmenting (+ figure); 404 logical order (+ figure); 405 order, labels etc. (+ annotated figure); 406 labels, placeholders, masks; 407 validation (+ figure); 408 inline validation, input controls; 409 checkboxes (+ figure); 410 autofill, errors; 411 actionable errors (+ figure); 412 non-colour alerts, buttons; 413 button considerations (+ figure); 414 micro-animation, enable state, microcopy; 415 microcopy, labels (+ figure); 416 do's: short; 417 do's: short (+ before/after), context; 418 context, order; 419 validation do (+ figure); 420 validation details, copy; 421 copy examples (+ figure); 422 error copy, don'ts: set up to fail; 423 first impression (+ figure); 424 perception of complexity fixes; 425 make data entry difficult (+ Omada); 426 split fields, two columns; 427 two columns, details (+ Spotify); 428 details list; 429 update user; 430 pull quote; 431 feedback, navigation (+ Airbnb flow); 432 closing.
