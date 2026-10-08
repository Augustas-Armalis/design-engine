---
source: web:https://adrianroselli.com
chapter: Adrian Roselli - 32 selected posts on buttons vs links, cards, toasts, disabled controls, menus, disclosure, toggles, target size, tables, dialogs, field errors, labels, focus, ARIA pitfalls
pages: n/a
topic_tags: [accessibility, buttons, links, cards, tables, dialogs, forms, focus, tooltips, aria, touch-targets, disclosure, toggles, toast, navigation]
status: studied
---

# Adrian Roselli: selected posts

Fetched 2026-10-08, raw text in `corpus/web/a11y-components/ar-*.txt` (private, comments stripped when summarising). Posts were chosen from the site's sitemap (843 posts) by topic. `robots.txt` allows generic crawlers; requests were spaced at 2 s. Roselli's posts are living documents with many dated updates, some from as late as 2026-10-07; the rules below use the latest state of each post. Paraphrased; none of the long CodePen demos are reproduced.

Read (33 pages, 32 with prose): links-buttons-submits-divs (2016), block-links-cards-clickable-regions (2020), defining-toast-messages (2020), dont-disable-form-controls (2024), dont-use-aria-menu-roles-for-site-nav (2017), link-disclosure-widget-navigation (2019), disclosure-widgets (2020), under-engineered-toggles (2019), target-size-and-2-5-5 (2019), 2-5-8-adversarial-conformance (2023), a-responsive-accessible-table (2017), under-engineered-responsive-tables (2020), sortable-table-columns (2021), dialog-focus-in-screen-readers (2020), where-to-put-focus-when-opening-a-modal-dialog (2025), should-a-dialog-close-when-clicked-outside (2026), exposing-field-errors (2023), avoid-default-field-validation (2019), my-priority-of-methods-for-labeling-a-control (2020), avoid-default-browser-focus-styles (2017), where-to-put-focus-when-deleting-a-thing (2023), styling-links-and-buttons (2023, an embedded tutorial with no prose), aria-vs-html (2023), aria-grid-as-an-anti-pattern (2020), dont-turn-a-table-into-an-aria-grid-just-for-a-clickable-row (2023), be-careful-using-menu (2023), brief-note-on-buttons-enter-and-space (2022), barriers-from-links-with-aria (2026), progressively-enhanced-html-accordion (2023), brief-note-on-popovers-with-dialogs (2023), using-abbr-element-with-title-attribute (2024), 2-4-11-adversarial-conformance (2023), support-for-marking-radio-buttons-required-invalid (2022).

Not readable: `/2019/02/tooltips-in-the-time-of-wcag-2-1.html` returned HTTP 404 and no tooltip post appears in the site's sitemap, so the "tooltips" topic is covered here only through the abbr/title test and through `inclusive-components.md` IC-14..IC-19. Also not read (referenced in posts): Link + Popover Navigation (2026-07), Keyboard-Only Scrolling Areas, Avoid Read-only Controls, Under-Engineered Text Boxen.

Companions: `component-accessible-anatomy.md`, `inclusive-components.md`, `webdev-learn-accessibility.md`.

## 1. Core ideas

1. Use the native element for the job. A link goes to a URL, a button changes something on the current page, a submit sends form data. Everything else (div with role) re-implements behaviour you will get subtly wrong.
2. Every ARIA role is a promise of a keyboard model and a set of constraints. Menu roles, grid roles and `aria-haspopup` change how screen readers behave and what keys users try. Use them only when you replicate an application widget and will implement the whole contract.
3. Context beats universal rules: where focus goes in a dialog, whether to close on outside click, how to label something, all depend on intent, user familiarity and consequence of error. Write down who the user is and what is least destructive.
4. Test what users hear, with the pairings real users have. Many "obviously accessible" patterns (aria-errormessage, aria-describedby live behaviour, title tooltips, error bubbles) behave differently across NVDA/JAWS/VoiceOver/TalkBack.
5. Avoid techniques that reduce user control: disabled controls with no explanation, default browser validation bubbles that disappear, timed toasts, tiny close buttons that technically conform ("adversarial conformance").
6. Don't mutate table semantics with CSS `display`; keep tables as tables and let the wrapper scroll.
7. Names matter: prefer native label, then `aria-labelledby` pointing at visible text, then hidden text, then `aria-label`; `aria-label` is invisible to voice-control and unreliably translated.
8. Target size: larger is better and uses the evidence of platform guidelines (about 44 px), even though WCAG AA minimum is 24 px.
9. Say exactly what you mean in specs: "menu", "dropdown", "popover", "accordion" each map to different patterns and expectations.
10. Dates matter: Roselli updates posts when browsers change (Safari 17 fixed table display bugs; Chrome 120 supports exclusive `details name`; AGWG ruling on focusable regions in October 2026).

## 2. Rules

### 2.1 Buttons, links, keyboard

- **RULE [AR-01]** Choose the element by outcome: navigation to a URL (including an in-page anchor) is `<a href="real-url">`; changing something on the current page is `<button type="button">`; sending form data is `<button type="submit">` or `<input type="submit">` inside a `form`. A link with `href="#"` or no `href` is almost always a button in disguise.
  **Why** Each element has different keyboard activation, context menu (open in new tab) and AT semantics; mixing breaks expectations (a quick test: would it make sense to open it in a new tab?).
  **Applies to** all. **Check** `a:not([href])`, `a[href="#"]`, `a[href^="javascript:"]`, `a[role=button]`, `div[role=button]`, `span[onclick]` count 0 (`H5`); `button` used to navigate (`location=` in click handler) flagged for review. **Source** https://adrianroselli.com/2016/01/links-buttons-submits-and-divs-oh-hell.html

- **RULE [AR-02]** Do not build a button from `div`/`span`/`a` plus `role="button"`. If you must, reproduce the native contract: focusable (`tabindex=0`), Enter fires on key down and repeats, Space fires on key up and cancels if focus leaves, Space must not scroll the page. Mixed native and custom controls on one page will feel inconsistent and may also look different in forced-colors.
  **Why** Native buttons carry all those behaviours and platform styling for free; screen readers vary in how they synthesise Enter/Space.
  **Applies to** all interactive widgets. **Check** `[role=button]:not(button,input)` count 0; if > 0 a keyboard test (Enter, Space press/release, hold) passes for each. **Source** https://adrianroselli.com/2016/01/links-buttons-submits-and-divs-oh-hell.html, https://adrianroselli.com/2022/04/brief-note-on-buttons-enter-and-space.html, https://adrianroselli.com/2023/02/aria-vs-html.html

- **RULE [AR-30]** Treat ARIA as technical debt unless needed. Static roles (a `div role=heading aria-level`) are equivalent to HTML and low-risk; replacing interactive HTML (button, select, date input) with ARIA widgets requires knowing every interaction, platform gesture and high-contrast behaviour. Native `<select>` is easier and safer than an ARIA listbox; native date inputs have problems but most ARIA date pickers are worse.
  **Why** E.g. dismissing a native select on mobile with a gesture, forced-colors styling, and keyboard repeat rules are all free in HTML.
  **Applies to** component choice. **Check** `[role=listbox],[role=combobox],[role=slider]` presence is justified in the spec; `A1`. **Source** https://adrianroselli.com/2023/02/aria-vs-html.html

- **RULE [AR-32]** Specs use precise pattern names. "Menu" may mean an ARIA application menu, `select`, listbox, combobox, datalist, disclosure widget, accordion, fly-out navigation, tree, popover or custom selector. Deprecated `<menu>`/`<menuitem>` should not be used. Ask what is meant and map it to one pattern.
  **Why** Wrong vocabulary leads to the wrong element and keyboard model.
  **Applies to** briefs and component specs. **Check** process: component spec names one of the patterns in `component-accessible-anatomy.md`; no `menuitem` element in markup. **Source** https://adrianroselli.com/2023/05/be-careful-using-menu.html

### 2.2 Cards and clickable regions

- **RULE [AR-03]** For clickable cards/block links, do not wrap all content in one link. Link a concise element (the heading or the "Read more"), and extend the hit area with a positioned `::after` covering the card; leave a gap where extra controls (a second link or button) sit and give that control its own stacking. Accept that text selection is blocked in the card, or add a click-duration guard. For voice users the link name must be what they can see.
  **Why** A whole-card link is announced as a long string (about 25 s in the demo), is announced as a link only after its name finishes, and when arrowing every fragment sounds like a separate link.
  **Applies to** cards, tiles. **Check** `a:has(h2,h3,p,img)` count 0; `::after` on card link covers the card; extra control hit-test returns itself. **Source** https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html

- **RULE [AR-04]** Reordering a visual image above the heading with `order: -1` while keeping heading first in the DOM is one of the few justified uses of CSS reordering, because the image belongs to the heading's section. Always check with a reading-order tool.
  **Why** Keeps heading structure meaningful.
  **Applies to** cards. **Check** `visual` + DOM order check (heading precedes image) for informative images. **Source** https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html

- **RULE [AR-05]** Do not put headings, lists or other structured content inside a `<button>`; the structure is flattened. Dashboard cards that are buttons should contain short text only.
  **Why** Button content is presented as a single string; the heading stops being a heading.
  **Applies to** button-cards. **Check** `button :is(h1,h2,h3,h4,h5,h6,ul,ol,table,p)` count 0. **Source** https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html

- **RULE [AR-06]** Make table rows selectable or clickable through real controls in the row (a checkbox with `label`, a link, a button) and stretch its hit area with a `::after` positioned on the `tr`, not with a `click` handler on `tr` and not by converting the table to ARIA `grid`. As of 2026-10-07 the working form is `tr { position: relative }` with `th > label::after { position:absolute; inset:0 }` and no width hack in Chrome, Firefox and Safari 27.
  **Why** Row click handlers make everything in the row announce as clickable and exclude keyboard users.
  **Applies to** admin tables, lists with row actions. **Check** `tr[onclick],tr[role=button]` count 0; a checkbox/link exists per clickable row; hit-test centre of row cell returns the label/link. **Source** https://adrianroselli.com/2023/11/dont-turn-a-table-into-an-aria-grid-just-for-a-clickable-row.html and https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html

### 2.3 Messages and toasts

- **RULE [AR-07]** There is no native toast. Map messages to ARIA live roles: `status` (polite, atomic) for FYI, `log` for ordered additions, `alert` (assertive, interrupts) for urgent, time-sensitive messages. The region must exist at page render. None of these roles supports rich content or interactive children; if a toast needs a button or structure, it is a (non-modal) dialog/alertdialog and needs focus management. Never move focus to a passive toast.
  **Why** Live regions announce raw text; interrupting alerts strand the user mid-sentence.
  **Applies to** toasts, banners, snackbars. **Check** `[role=status],[role=alert],[role=log]` present at load; `.toast :is(a,button,input)` implies `role=dialog|alertdialog` with focus handling; focus unchanged after a status toast appears. **Source** https://adrianroselli.com/2020/01/defining-toast-messages.html

- **RULE [AR-08]** Assume toasts will be missed (magnifier users, distraction, JS errors). Prefer static messages in a persistent region at the top of the page that users can dismiss; if you do use timed toasts, add a message holder (notification centre) or let users adjust or extend the duration, and do not place the container in the middle of the DOM. Reconsider whether the message is needed at all; error and status messages still have to meet 3.3.1, 3.3.3, 4.1.3.
  **Why** Timed messages violate WCAG 2.2.1 Timing Adjustable unless adjustable, and non-persistent messages cannot be reviewed.
  **Applies to** feedback patterns. **Check** each auto-dismiss toast has either `duration` control, hover/focus pause, or a retrievable log (`[role=log]` or inbox); toast container is last in DOM or a landmark; close control, if present, >= 44 px. **Source** https://adrianroselli.com/2020/01/defining-toast-messages.html

### 2.4 Disabled controls

- **RULE [AR-09]** Do not disable submit buttons or form fields in forms. Instead, leave the control enabled, and if input is invalid prevent default and show a polite message that names the problem; still protect against double submission on the server. Other buttons (outside gathering input) may be disabled when you explain why, but test with users. Disabled controls are exempt from contrast and invisible to keyboard and often to AT, so reasons stay hidden.
  **Why** Disabled controls hide the reason, cannot be focused, and styles rarely distinguish them; read-only buttons are not a fix.
  **Applies to** forms, checkout, sign-up. **Check** after page load and after typing invalid data: `form :is(button[type=submit],input[type=submit],input:not([type=hidden]),select,textarea)[disabled]` count 0; `button[disabled]` outside forms each have adjacent explanatory text (soft). **Source** https://adrianroselli.com/2024/02/dont-disable-form-controls.html. [engine note] Conflicts with `S1`'s requirement that disabled states exist; see section 5.

### 2.5 Navigation, disclosure, accordion

- **RULE [AR-10]** Do not use ARIA `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio` or `aria-haspopup` for site navigation. Use `<nav>` with lists of links; add disclosure buttons for sub-lists. ARIA menus are for desktop-application-style command menus and restrict children (no links, headings, images), take over arrow keys and require Esc, Home/End, Shift+F10 support. The ARIA Authoring Practices guide is a note, not a standard, and its navigation menu pattern is disputed.
  **Why** Screen readers switch interaction mode and tell users to expect keys that your page may not support; the top-level link stops being a link.
  **Applies to** all site and footer navigation. **Check** `A15` item 8: `nav [role=menu],nav [role=menubar],nav [role=menuitem]` count 0; `nav [aria-haspopup]` count 0. **Source** https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html

- **RULE [AR-11]** Fly-out navigation pattern: top-level items are real links; an adjacent `<button type="button" aria-expanded aria-controls>` toggles the nested list; name the button from the link's visible text (`aria-labelledby` pointing at the link, not a compound name); mark the current page with `aria-current="page"` (and style from the attribute); Esc closes open sub-lists; clicking outside closes them; no `aria-haspopup`; never put `aria-expanded` on a link; show sub-items on child pages too so script failure does not strand users. For touch, use 44 px buttons.
  **Why** Users tested the link-as-trigger variant as confusing for everyone; sub-pages must remain reachable without script.
  **Applies to** header navigation with sub-sections. **Check** `nav a[aria-expanded]` count 0; each `nav button[aria-expanded]` precedes or follows an `a` and has `aria-labelledby` referencing its text; Esc closes lists; `a[aria-current=page]` exactly one per nav level. **Source** https://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html. A 2026-07 update recommends reading "Link + Popover Navigation" (native `popover` + CSS anchor positioning); not read here.

- **RULE [AR-12]** A disclosure widget is a button with `aria-expanded` (true/false), optional `aria-controls`, and the content immediately after it in the DOM. Enter and Space toggle; do not move focus on open for simple disclosures. Hide with `display:none` only when `aria-expanded="false"` (`button[aria-expanded="false"] + div{display:none}`) so visual and programmatic state cannot disagree. Use native `<details>/<summary>` for simple summary-plus-detail cases. Esc and click-outside are extras for overlay-style disclosures (menu-like, popups), not for inline content.
  **Why** Enforcing the visual off the state attribute keeps them in sync; moving focus on a simple toggle loses the user's place if they hit it by accident.
  **Applies to** FAQs, filters, navigation panels. **Check** `A15` disclosure part; controlled element hidden iff `aria-expanded=false`; `aria-expanded` never on `a`. **Source** https://adrianroselli.com/2020/05/disclosure-widgets.html

- **RULE [AR-13]** Call something an accordion only if it is a group of disclosures with a group label (`role=group`/labelled `section`) in which one panel is open at a time (an "exclusive" accordion); keep one open on load. Use `<details name="group">` (supported in Chrome 120+) with a labelled wrapper. Optional: constrain panel height and scroll inside panels (then ensure keyboard access). A set of independent disclosures is just that, not an accordion. (opinion) The author considers accordions mostly slow for users.
  **Why** Predictable semantics; fewer open panels, less page length.
  **Applies to** FAQ, settings. **Check** `details[name]` groups share the same name; wrapper has accessible name; when one opens, siblings close. **Source** https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html and https://adrianroselli.com/2020/05/disclosure-widgets.html

- **RULE [AR-34]** Check focus visibility fully, not by a sliver: a focused control partly covered by a sticky footer technically passes 2.4.11 if a pixel row shows, but the control must be legible. Aim for the whole control visible, using `scroll-padding` and avoiding fixed overlays near focusable rows. Also apply text-spacing overrides to catch hidden buttons.
  **Why** "Not entirely hidden" is a weak bar; adversarial layouts satisfy it uselessly.
  **Applies to** sticky headers/footers/cookie bars. **Check** `A5`: for each focusable, after `focus()` the bounding rect is entirely within the viewport minus fixed elements (not merely > 0 px). **Source** https://adrianroselli.com/2023/10/2-4-11-adversarial-conformance.html

### 2.6 Toggles

- **RULE [AR-14]** Choose a toggle's element by behaviour: `<button aria-pressed>` when JavaScript is guaranteed, the effect is immediate, and there is no indeterminate state; `<input type="checkbox">` when it should progressively enhance, takes effect on submit, or can be indeterminate. A switch role affects the application immediately and must be explained in plain text; mis-modelling it can be a Level A failure.
  **Why** Checkbox and switch semantics differ (submit vs immediate).
  **Applies to** settings, theme switches. **Check** `[role=switch]` controls change app state on activation (not on submit); checkbox toggles inside forms. **Source** https://adrianroselli.com/2019/03/under-engineered-toggles.html

- **RULE [AR-15]** Styling a checkbox as a toggle: hide the input visually (not `display:none`), draw track and thumb with `::before/::after`, size in `em` so it scales with text, keep colours at 3:1 or better for non-text (grey #767676 on white is 4.5:1, green #36a829 on white is 3:1), show focus and hover with more than colour (outline/shadow plus a dot on the thumb), style disabled and indeterminate states, add `prefers-reduced-motion`, `forced-colors`, dark scheme and RTL variants.
  **Why** Custom toggles routinely lose state cues in high contrast and under zoom.
  **Applies to** custom toggles. **Check** `A2` for track vs background (3:1); `A3`; forced-colors screenshot still shows on/off (`A18`). **Source** https://adrianroselli.com/2019/03/under-engineered-toggles.html

### 2.7 Touch targets

- **RULE [AR-16]** Make interactive targets at least 44x44 CSS px (WCAG 2.5.5 AAA, Apple 44 pt, Android 48 dp with 8 px gaps, BBC 44 px recommended with 32 px minimum, Microsoft Fluent 40 epx, NN/g 1 cm) and leave dead space between neighbours; links inside text are exempt. WCAG 2.2 AA (2.5.8) requires only 24x24 or enough spacing. Test with a 44 px reference square on real devices (physical size varies with density).
  **Why** Fitts's Law, motor and age-related tremors, one-handed use.
  **Applies to** nav, buttons, footers, form controls. **Check** `L7` (24 px hard) and `L7b` (44 px on coarse pointer) with hit-test per control. **Source** https://adrianroselli.com/2019/06/target-size-and-2-5-5.html

- **RULE [AR-35]** Do not use WCAG minimums as a licence to degrade usability: tiny dismiss buttons in a corner of a modal, 24 px close targets or controls hidden under fixed bars are "adversarial conformance". A close button that meets 24 px only by exception (spacing) should still be 44 px for modals and interstitials.
  **Why** Conformance claims can hide user-hostile patterns.
  **Applies to** modals, banners, cookie notices, newsletter overlays. **Check** `L7b` for modal close buttons >= 44 px; the close control sits within the first screenful and in DOM order near the start of the dialog. **Source** https://adrianroselli.com/2023/12/2-5-8-adversarial-conformance.html

### 2.8 Tables

- **RULE [AR-17]** A responsive table is a normal `table` inside a scrolling wrapper: `overflow: auto` on the wrapper, `tabindex="0"` so keyboard users can scroll it, a visible focus outline of at least 3:1, and (traditionally) `role="region"` plus `aria-labelledby` pointing at the caption. In October 2026 Roselli reported that the WCAG working group (AGWG) ruled that a focusable non-interactive element does not need a role or accessible name to pass 2.4.3/4.1.2, so `tabindex="0"` alone can be conformant; whether the role/name help your users is a testing question. Keep the wrapper selector tied to the required markup (`[tabindex]`) so unmarked wrappers do not clip content. Do not use scroll-snap on tables. Avoid nested scrollbars (table scrolling inside a scrolling dialog inside a scrolling page).
  **Why** Prevents two-axis page scroll (1.4.10), keeps semantics, and keeps keyboard access. Snap caused straddling and clipped captions in testing. Android TalkBack once skipped tables inside `tabindex` parents (fixed in Chrome 91).
  **Applies to** wide tables. **Check** wrapper: `overflow-x:auto`, `tabindex=0` only when overflowing, focus outline contrast >= 3:1; `scroll-snap-type` on table wrapper = none; no ancestor scroll container also scrolling. **Source** https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html and https://adrianroselli.com/2017/11/a-responsive-accessible-table.html

- **RULE [AR-18]** Do not change `display` on `table`, `tr`, `th`, `td` (block, flex, grid) to reflow tables; older browsers drop table semantics and adding `role="table"` back does not restore header relationships. Safari 17 stopped breaking tables and description lists, but `display: contents` on buttons still breaks keyboard and VoiceOver. If you reflow (stacked cells with generated column labels), add ARIA roles back (`table`, `row`, `cell`, `columnheader`) and accept lost features such as `headers` for spanning cells; prefer scrolling.
  **Why** Screen readers lose the table; the sorting, headers and navigation commands vanish.
  **Applies to** responsive tables. **Check** computed `display` of `table`, `thead`, `tbody`, `tr`, `th`, `td` at 320, 768, 1280 equals `table`, `table-header-group`, `table-row-group`, `table-row`, `table-cell`; if different then `role` attributes present. **Source** https://adrianroselli.com/2017/11/a-responsive-accessible-table.html

- **RULE [AR-19]** Sortable table headers: `button` inside `th`; `aria-sort="ascending|descending"` only on the one sorted `th` (remove it from others rather than using `none`); communicate sort affordance with arrows that do not rely on colour alone (outline vs filled shapes), and highlight the sorted column (via `col` styling or `:has`); announce the change (a live region reading "sorted up/down" and clearing after about 1 s) because NVDA, TalkBack and macOS VoiceOver say nothing; use caption, visually hidden description or `aria-describedby` text to say the headers sort; avoid `aria-label` and `aria-roledescription` (translation, support). Build announcement strings from translatable content.
  **Why** Announcement behaviour differs per screen reader; hints must survive translation.
  **Applies to** sortable tables. **Check** after click: exactly one `th[aria-sort]`, others have no attribute; a live region receives text; arrows have non-colour difference (`A18`). **Source** https://adrianroselli.com/2021/04/sortable-table-columns.html

- **RULE [AR-20]** Do not use ARIA `grid` for ordinary tables, clickable rows, or lists of links. Grid is an interactive composite widget with one tab stop and arrow-key navigation, and layout-grid pattern examples were judged failing in testing; use `table` + buttons/links, lists with skip links, headings and landmarks for navigation shortcuts. Exception: Excel-like data editors.
  **Why** Hidden keyboard model, brittle responsive behaviour, higher WCAG risk.
  **Applies to** tables, dashboards. **Check** `[role=grid],[role=treegrid]` count 0 unless spec documents spreadsheet-style editing. **Source** https://adrianroselli.com/2020/07/aria-grid-as-an-anti-pattern.html

### 2.9 Dialogs and popovers

- **RULE [AR-21]** Prefer native `<dialog>` with `showModal()` (focus return, inert background, Esc, `aria-modal` equivalent come free). For custom `div role=dialog` you need an `inert` approach and manual focus return. Where initial focus goes is contextual: brief informational message without complexity - the close button is fine; long/complex/unexpected content or legal text - the dialog container or its heading (`tabindex="-1"`), never an "I agree" button; action required - the least destructive control (often Cancel/Close); brief form for a user who just chose to log in - the first field; long or unexpected forms, or on touch devices where a soft keyboard would cover the form - the dialog or heading. Always return focus to the invoker (or a sensible target if it is gone).
  **Why** Focus placement decides what is announced and whether users can accidentally accept something; soft keyboards cover content.
  **Applies to** modals, lightboxes, drawers. **Check** `A15` plus per-type scripted assertion: initial `document.activeElement` is not a destructive action button; dialog has accessible name; `[role=dialog]:not(dialog)` count 0 in new code. **Source** https://adrianroselli.com/2025/06/where-to-put-focus-when-opening-a-modal-dialog.html and https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html

- **RULE [AR-22]** `dialog.showModal()` already gives modal semantics; do not add `aria-modal`. Do not combine the `popover` attribute with `div[role=dialog]` modals; a popover opens above and blocks a non-native modal, and Esc may close the wrong layer. If you use popovers, convert dialogs to `<dialog>` and test overlapping behaviour (top layer and inertness rules were still unsettled in late 2025).
  **Why** Top-layer stacking can bury a time-out dialog behind a tooltip.
  **Applies to** popover + dialog combos. **Check** pages using `[popover]` have zero `[role=dialog]:not(dialog)`; opening a popover then a modal leaves the modal on top and focusable. **Source** https://adrianroselli.com/2023/05/brief-note-on-popovers-with-dialogs.html and https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html

- **RULE [AR-23]** Decide dismissal by consequence. Action-required dialogs (legal agreement, safety acknowledgement, login within a protected page) do not close on outside click or Esc and may have no close button (consider a separate page). Informational and marketing dialogs (newsletter, offers, exit intent, sign-in prompts) must close on outside click, Esc and a large close button. Sheets, drawers and lightboxes: ask whether the user needs the occluded page, loses state on close, and how hard it is to restore. Prefer the least destructive outcome for dismissal.
  **Why** Accidental or forced dismissal either loses work or traps the user.
  **Applies to** modals, drawers. **Check** classify each dialog in spec (required / informational); informational: Esc closes and focus returns; click outside closes; required: `dialog` has no close affordance but has primary action. **Source** https://adrianroselli.com/2026/08/should-a-dialog-close-when-clicked-outside.html

- **RULE [AR-24]** When a focused element is deleted or dismissed, move focus on purpose: to the preceding analogous control (previous delete button) when deleting from a group; to the group container (table wrapper, list, heading with `tabindex="-1"`) if the first item was deleted; to the control that had focus before a dismissed message appeared. Give destructive buttons item-specific names, avoid landing on a Delete button the user might double-activate unless confirmation exists, and do not rely on `:focus-visible` alone for the indicator.
  **Why** Otherwise focus resets to the document and keyboard, magnifier and screen reader users lose position.
  **Applies to** delete, remove, dismiss, pagination edge cases. **Check** Playwright: delete mid-list item - `document.activeElement` is the previous item's action button; delete first - container or heading; never `body`. **Source** https://adrianroselli.com/2023/08/where-to-put-focus-when-deleting-a-thing.html. [engine note] Differs from `inclusive-components.md` IC-61 (first item).

### 2.10 Forms and labels

- **RULE [AR-26]** Avoid the browser's built-in validation bubbles. They show different text per browser, may not be announced, disappear (Chromium bubbles self-dismissed in about 5 s, fixed in 2024), do not scale with zoom, and `required`/`pattern` alone do not tell users the rule in text. Use `novalidate` and your own validation with visible messages, and state the required marker and format in the label or instructions. The author also states a rule against placing error messages under fields (see section 7).
  **Why** WCAG 3.3.1/3.3.2/3.3.3 depend on persistent, accessible text.
  **Applies to** forms. **Check** `form:not([novalidate])` with `[required],[pattern]` flagged; `A10`; each required field's label text or description says it is required. **Source** https://adrianroselli.com/2019/02/avoid-default-field-validation.html

- **RULE [AR-25]** Expose field errors with `aria-invalid="true"` (set only after the user interacted or submitted, remove when valid) and associate the message with `aria-describedby`; a polite live region may announce on blur, an assertive one clips the next field's name. `aria-errormessage` is poorly supported (not announced when focusing or on blur); `aria-describedby` is announced consistently when navigating by field, with Chromium treating it as live (JAWS may read it twice). Expect VoiceOver on macOS and iPadOS to differ. Test with the pairings that matter.
  **Why** Real support tests show `aria-describedby` is the dependable association.
  **Applies to** inline validation. **Check** `[aria-invalid=true]` has `aria-describedby` resolving to visible text; no field is `aria-invalid=true` on first load; no `aria-errormessage` without `aria-describedby`. **Source** https://adrianroselli.com/2023/04/exposing-field-errors.html

- **RULE [AR-31]** A required group of radio buttons: `required` is not valid on `fieldset`; use `role="radiogroup"` with `aria-required="true"` (and `aria-invalid` for errors); also say "required" in the group legend text. Support varies widely (TalkBack conveys nothing), so visible text is the baseline.
  **Why** No native attribute for group required; AT support is inconsistent.
  **Applies to** forms with radio groups. **Check** `fieldset[required]` count 0; `[role=radiogroup][aria-required]` present for required radio groups and the legend says "required". **Source** https://adrianroselli.com/2022/02/support-for-marking-radio-buttons-required-invalid.html

- **RULE [AR-27]** Name controls in this order: native HTML (`<label for>` with a separate `id`, not an implicit wrapping label, because Dragon and Voice Control do not recognise wrapped labels), then `aria-labelledby` pointing at visible text (can join several ids to make unique names, e.g. in table cells), then visibly-hidden text (use the modern `.visually-hidden` clip pattern, not off-screen positioning), and `aria-label` last. `aria-label` is invisible to voice control, does not enlarge the hit area, is poorly auto-translated and overrides visible text in about a third of real-world uses; `aria-labelledby` overrides a `<label>`. Context may justify exceptions.
  **Why** Internationalisation, voice access and consistency.
  **Applies to** all controls. **Check** `[aria-label]` count tracked (soft cap); `[aria-label]` whose text does not contain the visible text fails `label-in-name` (axe); `label` wrapping an input without `for` flagged soft. **Source** https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html

- **RULE [AR-28]** Do not put `aria-label` on links, do not wrap link text in `aria-hidden`, and do not split a word into one element per letter. Browser reader modes and text-to-speech tools ignore `aria-label` and drop `aria-hidden` content, and letter spans break translation and speech.
  **Why** Non-screen-reader assistive tools (read aloud, reader mode, translation) consume visible text and the DOM, not ARIA names.
  **Applies to** links, animated headlines. **Check** `a[aria-label]` count 0 (or each equals its visible text); `a [aria-hidden=true]` containing text count 0; letter-split animations (`span` per char) provide a whole-text alternative that remains in the DOM and are not inside links. **Source** https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html

- **RULE [AR-33]** Do not rely on `<abbr title>` (or `title` in general) to explain abbreviations; exposure differs by browser, screen reader, touch, keyboard and voice access. Expand the term in text on first use, then use the short form.
  **Why** Some users always miss the information.
  **Applies to** copy. **Check** `abbr[title]` flagged; first use of acronyms is expanded (`visual`/lint). **Source** https://adrianroselli.com/2024/01/using-abbr-element-with-title-attribute.html

### 2.11 Focus appearance

- **RULE [AR-29]** Never rely on the browser default focus ring; it vanishes against same-hue backgrounds (measured 1.02:1 to 1.8:1 in real sites) and textured backgrounds. Supply your own focus style with at least 3:1 contrast against the adjacent colours, test it on every surface colour (dark sections, brand blue buttons) and keep it visible in Windows High Contrast.
  **Why** Default rings are tuned for white pages.
  **Applies to** all backgrounds, especially coloured CTAs and dark sections. **Check** `A3`: for each focusable compute contrast of the indicator against both the element and its background >= 3:1, per section background; forced-colors check (`A18`). **Source** https://adrianroselli.com/2017/02/avoid-default-browser-focus-styles.html. [engine note] A 2023 post by the same author warns against relying on `:focus-visible` alone (voice, touch and sighted screen reader users also need position cues); see section 5.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Target size (platform minima) | Apple 44x44 pt; Android 48x48 dp (9 mm) with 8 px gaps; Microsoft Fluent 40x40 epx (7.5 mm; previously 44 and, in 2017, 60 px/11 mm); BBC GEL 44 px recommended, 32 px min, 24 px special case, 7 mm physical (5 mm exclusion); NN/g 1 cm | target-size post |
| WCAG targets | 2.5.5 (AAA) 44x44 CSS px; 2.5.8 (AA) 24x24 with spacing exception | target-size posts |
| Touch reference | 44 px is 8.25 mm on iPad and 6.75 mm on iPad mini | |
| Toggle colours | #767676 on white = 4.5:1; #36a829 on white = 3:1; dark mode border #808080 = 4.8:1 | toggles |
| Toggle sizing | pill 3em wide, 1.5em tall; thumb 1.5em; padding-left 4em | toggles |
| Scroll wrapper focus ring | outline 0.1em, >= 3:1 | tables |
| Responsive table breakpoint | e.g. 37em for a particular table (derived from content) | tables |
| Sort live region reset | 1000 ms | sortable tables |
| Chrome validation bubble | 5 s auto-dismiss (fixed April 2024) | validation |
| Block-link read time | about 25 s for a fully wrapped card | cards |
| `aria-label` real-world stats | 21% missing visible text, 23% starts without visible text, 32% overrides visible text, 4% disallowed | labels |
| Focus ring failure examples | #4d90fe on #4285f4 = 1.14:1; on #5996C9 = 1.02:1; #4E8FFE on #0F64CE = 1.8:1 | focus |
| Keyboard activation | Enter fires on keydown (repeats); Space fires on keyup; link ignores Space (scrolls) | buttons |
| Dialog focus test matrix | JAWS, NVDA, VoiceOver, TalkBack across Chrome/Firefox/Safari/IE | dialogs |

## 4. Dos and Don'ts

- Don't: `<div onclick tabindex=0 role=button>`. Do: `<button type="button">`.
- Don't: `<a href="#" onclick>`. Do: a button, or a real URL.
- Don't: `<a href=...><img><h3>..</h3><p>..</p></a>` as the whole card. Do: heading link plus `::after`.
- Don't: heading inside a button. Do: short text in the button, heading outside.
- Don't: `tr onclick`. Do: checkbox or link in the row with a stretched label.
- Don't: ARIA `menu` for site nav. Do: `nav > ul` plus disclosure buttons.
- Don't: `aria-expanded` on a link. Do: a link plus an adjacent disclosure button.
- Don't: disable a submit button to signal invalid input. Do: allow submit and explain the error.
- Don't: toast that vanishes and cannot be retrieved. Do: static message region or notification history.
- Don't: `display:flex` on a table. Do: scroll wrapper.
- Don't: scroll-snap on tables. Do: free scroll.
- Don't: ARIA grid for clickable rows. Do: row controls.
- Don't: focus the "I agree" button when opening a legal dialog. Do: focus the dialog or heading.
- Don't: close action-required dialogs on outside click. Do: close informational ones.
- Don't: leave focus on `body` after delete. Do: previous control or container.
- Don't: browser validation bubbles. Do: your own messages with `aria-describedby`.
- Don't: `aria-label` on a link. Do: visible link text.
- Don't: `abbr title`. Do: expand on first use.
- Don't: default blue focus ring on blue buttons. Do: designed focus style.
- Don't: a 24 px close button in a modal corner. Do: 44 px.

## 5. Exceptions & judgement calls

Conflicts with existing notes (flagged, not silently resolved):

1. **`:focus-visible`.** Existing implementation-craft 2.7 mandates `:focus-visible` outlines. Roselli (2023) warns that styles only on `:focus-visible` disappear for voice, touch and sighted screen-reader users who also want position cues. Resolution suggestion: use `:focus-visible` for the strong ring but keep a lighter `:focus` indicator on form fields and composite widgets; do not remove the indicator when pointer-focus occurs on text inputs.
2. **Disabled states (`S1`).** `S1` HARD requires distinct disabled computed styles for buttons and inputs. AR-09 recommends not disabling form controls at all. Resolution: keep the disabled state for non-form buttons and design-system completeness, but for forms prefer `aria-disabled` or enabled-with-message. Add a design-system rule that submit buttons are never `disabled` by default.
3. **Dialog focus and Esc.** Existing rule says initial focus on first control or heading and Esc closes. AR-21/AR-23: initial focus is contextual (least destructive control; avoid focusing a form field in an unfamiliar form because of mobile keyboards) and some dialogs must not close on Esc/outside click. Adopt the context table; keep Esc-close as the default for informational dialogs.
4. **Icon-only button names.** Existing rule: `aria-label` or visually hidden text. AR-27: hidden text or `aria-labelledby` first; `aria-label` last; links never. Keep both, prefer hidden text on translated sites; fail `a[aria-label]` unless equal to the visible text.
5. **Scroll wrappers.** Heydon and Roselli earlier required `role` plus accessible name; on 2026-10-05/06 Roselli reports AGWG settled that `tabindex="0"` alone is acceptable. Treat name/role as SOFT and `tabindex=0` plus visible focus as HARD. The post's own caveat: whether naming helps users is a testing question.
6. **Target size.** Existing `L7` (24 px) HARD and `L7b` (44 px on coarse pointer) SOFT. Roselli argues for 44 as the real minimum; consider upgrading `L7b` to HARD for primary CTAs, nav, form controls and modal close buttons.
7. **Toast timing.** Existing notes (and IC-41) allow transient FYI toasts; AR-08 points out WCAG 2.2.1. Resolution: toasts auto-dismiss only if there is a retrievable log, or duration is long/adjustable, or they are confirmations of user-initiated actions already visible elsewhere. [engine note]
8. **Tooltips / title.** Roselli's abbr test confirms `title` is not dependable (and Heydon's rule). Existing notes do not mention tooltips; add IC-14..IC-19 to the component rules.
9. **Native validation.** Existing form rule uses `:user-invalid` for styling and implies native validation. Roselli says avoid the default bubbles. Compatible if you use `novalidate` and show your own messages while still using `required` for semantics and `:user-invalid` for styling hooks.
10. **Table semantics (CSS display).** New rule for implementation-craft (none existing). The web.dev `ui-patterns` module's `scroll-snap` on tables conflicts (see `webdev-learn-design.md` section 5).
11. **Corroborates existing:** nav is not an ARIA menu, native `dialog`, `inert`, `aria-expanded` on disclosure buttons, skip links, visible focus, label-for, 44 px targets.
12. **Source freshness.** Several 2017-2019 posts mention IE11, WHCM `-ms-high-contrast` and `:focus-visible` support; ignore those details and keep the principles. Safari 17+ fixed table/dl `display` bugs; `display:contents` on buttons is still unreliable per the 2023 update.

## 6. Figures worth keeping

Roselli's demos are CodePen embeds, not captured. Worth recreating as test fixtures: the stretched block-link card with a second control (dead space), the responsive table wrapper, the sortable table with live region, the three-way field error comparison table (assertive/polite/none with `aria-errormessage` vs `aria-describedby`), the 2.4.11 and 2.5.8 adversarial examples (sticky footer hiding the focused button; 24 px modal close), and the dialog focus matrix.

## 7. Open questions

- "A rule against displaying error messages under fields" is stated in `avoid-default-field-validation` without the reasoning (it is covered in his "Accessible form validation/inline errors" posts, not read). Until read, do not adopt it as a rule; treat error placement above or beside the field as a hypothesis.
- Link + Popover Navigation (2026-07) and Keyboard-Only Scrolling Areas were not read; the former may supersede AR-11 for modern browsers.
- Roselli's pronouncement of AGWG decisions (October 2026) is secondary; verify against the WCAG understanding documents before encoding it as HARD.
- `p.NN: no rule content`: styling-links-and-buttons (embedded tutorial only).
