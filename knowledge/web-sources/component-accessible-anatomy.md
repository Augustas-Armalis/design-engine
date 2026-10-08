---
source: web:https://web.dev/learn/accessibility + https://inclusive-components.design/ + https://adrianroselli.com (synthesis of the three notes written 2026-10-08)
chapter: Accessible anatomy of 12 components - button, link, card, tabs, accordion, dialog, menu, toggle, tooltip, table, form field, notification
pages: n/a
topic_tags: [components, anatomy, aria, keyboard, focus, states, button, link, card, tabs, accordion, dialog, menu, toggle, tooltip, table, form, notification]
status: studied
---

# Component accessible anatomy

One short spec per component: required markup, ARIA, keyboard map, focus behaviour, states, and one mechanical contract rule. Built from `webdev-learn-accessibility.md` (WDA), `webdev-learn-design.md` (WDD), `inclusive-components.md` (IC) and `adrian-roselli.md` (AR). Where those sources disagree, the spec states the engine's choice and points to the conflict. Intended use: the build step copies the matching block into the component's spec; the check step runs the contract script and the linked per-rule checks. Every spec also inherits the global rules (visible focus `A3`, contrast `A2`, targets `L7`/`L7b`, reduced motion `A11`, forced colours `A18`).

Playwright helper names used below (to be implemented in `tools/`): `tabTo(sel)` presses Tab until `sel` is focused; `focused()` returns `document.activeElement`; `name(sel)` returns the accessible name from `locator.ariaSnapshot()` or `page.accessibility`.

## 1. Core ideas

1. A component is its element, its accessible name/role/state, its keyboard map and its focus plan. If any of the four is implicit you have a bug waiting.
2. States are a closed list per component (default, hover, focus-visible, active, disabled or unavailable, loading, error, selected/expanded/pressed). The brief's state coverage (`S1`) should map one-to-one to this list.
3. Prefer native elements: `button`, `a`, `details`, `dialog`, `table`, `input`+`label`, `nav`. Choose ARIA widgets only where the native one is missing (tabs, tooltip, toggletip, live region, application menu).
4. Visual state is driven from the attribute that carries the semantic state (`[aria-expanded]`, `[aria-pressed]`, `[aria-selected]`, `[aria-sort]`, `:checked`, `[open]`, `[aria-current]`), so what users see and what AT announces cannot diverge.
5. The names of patterns matter (AR-32): do not call a disclosure a "menu" or an expandable list a "tab".

## 2. Rules

Each rule is the contract for one component; details live in the per-rule IDs referenced under "Sources".

- **RULE [CA-01]** Button contract. `<button type="button|submit">` with visible text (or `aria-label`/hidden text for icon-only; icon is `aria-hidden`). Enter and Space activate; no focus change on activation unless it opens something; never `disabled` when it submits a form. States: default, hover, `:focus-visible` ring >= 3:1, active, loading (`aria-busy` or label change plus `aria-disabled`, still focusable), pressed (`aria-pressed`) only for toggles. Target >= 24 px (44 px on coarse pointers).
  **Why** Native buttons give role, name, focus and both activation keys; custom ones regress.
  **Applies to** all. **Check** for every `button,[role=button]`: element is `<button>` (or listed exception), accessible name non-empty, `type` set inside forms, `Enter` and `Space` both fire a click once (hold Enter repeats; Space fires on keyup), computed focus ring differs from default, target size passes `L7`, no `disabled` on `form [type=submit]`. **Source** https://adrianroselli.com/2016/01/links-buttons-submits-and-divs-oh-hell.html, https://adrianroselli.com/2024/02/dont-disable-form-controls.html, https://web.dev/learn/accessibility/javascript

- **RULE [CA-02]** Link contract. `<a href="real-url">` with descriptive text unique in its context; Enter activates (Space scrolls); opens in same tab by default (`target=_blank` only with a visible indication and `rel="noopener"`); visited/current state via `aria-current="page"`; in-text links keep underline or 3:1 contrast against surrounding text; icon-only links get a name on the link. Skip link is a link.
  **Why** Links navigate; button-looking links are fine visually but must stay `a`.
  **Applies to** all. **Check** `a:not([href])` and `a[href="#"]` count 0; link text not in `{click here, here, more, read more}` unless extended by `aria-describedby` context; `a[aria-label]` text contains visible text; `a[aria-expanded]` count 0; `a[target=_blank]` has `rel` including `noopener` (soft). **Source** https://web.dev/learn/design/accessibility, https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html, https://adrianroselli.com/2019/06/link-disclosure-widget-navigation.html

- **RULE [CA-03]** Card contract. `li` in `ul`; heading (level by outline depth) containing the one primary `a`; whole-card click via the link's `::after` (card `position: relative`); media decorative (`alt=""`) or informative with DOM order heading-before-image; at most one secondary control, raised above the stretch layer with its own >= 24 px target and spacing; focus state on the card with `:focus-within`; hover cursor/shadow if clickable; no heading/list inside a `button` card. Equal-height layout with content tolerance.
  **Why** One name, one tab stop, predictable layout; keyboard users see the same affordance.
  **Applies to** card grids and tiles. **Check** per card: exactly one `h2-h4 a`; focusables <= 2; `getComputedStyle(a,'::after').position === 'absolute'`; hit-test at card corners returns the primary link; `.card:focus-within` style differs; link text unique across the list; `S7` stress passes. **Source** `inclusive-components.md` IC-06..IC-13, `adrian-roselli.md` AR-03..AR-05

- **RULE [CA-04]** Tabs contract (use only when tabs are truly needed; else table of contents or accordion). `role=tablist` > `role=tab` (button), `aria-selected`, `aria-controls` optional; panels `role=tabpanel` with `aria-labelledby` the tab; roving `tabindex` (selected 0, others -1); Left/Right (Up/Down for vertical) move and activate; Home/End first/last; Tab moves into the active panel; Shift+Tab returns to the selected tab; panel focusable (`tabindex=-1`) with a visible focus style only if it has no focusable content or Down arrow targets it. Hidden panels use `hidden`.
  **Why** Tabs promise a composite-widget keyboard model.
  **Applies to** in-page view switchers. **Check** key script: `tabTo('[role=tab]')` lands on the selected tab only; ArrowRight changes `aria-selected`, shows the right panel, others `hidden`; Tab enters panel; Shift+Tab back to selected tab; panel name equals tab name; counts of tabs and panels equal. **Source** `inclusive-components.md` IC-20..IC-23

- **RULE [CA-05]** Accordion/disclosure contract. Disclosure: `<button aria-expanded>` inside a heading (`h2 > button`), controlled content immediately follows and is `hidden` when collapsed; Enter/Space toggles; focus stays on the button; native `<details><summary>` allowed for simple content. Accordion: group of disclosures in a labelled wrapper, one open at a time (`<details name>` or script), one open on load; optional expand/collapse all as two buttons. Icons `aria-hidden` and from `currentColor`, driven by `[aria-expanded]`.
  **Why** Predictable state; heading outline preserved.
  **Applies to** FAQs, filters, settings. **Check** for each `[aria-expanded]` button: parent is a heading (or `summary`), `hidden` iff `false`, content is next sibling, Enter and Space toggle, focus unchanged; `details[name]` group closes siblings; hash link to a closed panel opens it. **Source** `inclusive-components.md` IC-24..IC-30, `adrian-roselli.md` AR-12/AR-13

- **RULE [CA-06]** Dialog contract. Native `<dialog>` opened with `showModal()` (modal) or `show()` (non-modal), `aria-labelledby` its heading (and `aria-describedby` only for short plain text); visible close button >= 44 px; initial focus by context: dialog/heading for long, unexpected or legal content; least destructive control for action-required; first field only for short, expected forms; Tab/Shift+Tab stay inside; Esc closes unless action-required; background inert; focus returns to the trigger; scroll lock without layout jump; no popover stacked over a non-native modal; stacked above sticky UI.
  **Why** Modal focus and dismissal decide whether users can recover; native dialog gets most of it free.
  **Applies to** modals, drawers, lightboxes, consent. **Check** `A15` suite: after `showModal()` the active element is inside; N Tab presses never leave; `Esc` closes (informational) and `document.activeElement === trigger`; elements outside have `inert` or are unreachable; `dialog` has accessible name; `dialog:not([open])` is not rendered; `[role=dialog]:not(dialog)` count 0. **Source** `adrian-roselli.md` AR-21..AR-24, `webdev-learn-accessibility.md` WDA-20

- **RULE [CA-07]** Menu contract (two kinds). Site navigation: `nav` (labelled when more than one) > `ul` > `li` > `a`; sub-lists revealed by an adjacent `button[aria-expanded]` named from the link text; Esc closes; outside click closes; `aria-current=page`; mobile "Menu" button lives inside the `nav` with the list next in DOM; no `role=menu*`, no `aria-haspopup`. Application menu (commands/options only): `button[aria-haspopup][aria-expanded]` + `role=menu` with `menuitem|menuitemradio|menuitemcheckbox` (`tabindex=-1`); Enter/Space/Down open and focus first enabled (or checked) item; Down/Up wrap; Home/End; Esc closes and refocuses button; choosing closes and refocuses; typeahead optional.
  **Why** Roles imply keyboard models; site nav is links.
  **Applies to** headers, footers, command menus. **Check** `A15` item 8 for nav (`nav [role^=menu]` = 0); for app menus the key script above; `button[aria-expanded]` toggles `hidden` of the next list; `aria-controls` optional. **Source** `inclusive-components.md` IC-31..IC-36, `adrian-roselli.md` AR-10..AR-11, AR-32

- **RULE [CA-08]** Toggle contract. Immediate-effect toggle: `<button type="button" aria-pressed="true|false">` with a stable label (or `role=switch` with `aria-checked` and a unique name from the setting text); submit-time or tri-state toggle: `<input type=checkbox>` + `label`. State shown by more than colour; label and state do not change together; Space/Enter toggle; focus ring visible on the control and its visual track; honour `forced-colors` and reduced motion for the thumb transition.
  **Why** Prevents "pressed Pause" confusion and keeps native semantics where they fit.
  **Applies to** theme switch, settings, filters. **Check** click flips `aria-pressed`/`aria-checked`; text and state do not both change; computed non-colour difference between states; contrast of track 3:1 (`A2`); name unique per switch. **Source** `inclusive-components.md` IC-01..IC-05, `adrian-roselli.md` AR-14..AR-15

- **RULE [CA-09]** Tooltip/toggletip contract. Prefer visible text. Tooltip: element with `role=tooltip` adjacent to the trigger, shown on hover and focus, hidden by Esc, pointer can enter it; `aria-labelledby` when it is the name, `aria-describedby` when it is extra detail (then the trigger needs its own name). Toggletip: `button[type=button]` with a live region sibling (`role=status`, present and empty at load); click injects text after about 100 ms; closes on Esc/blur/outside click; no `aria-describedby`. No interactive content in either. Never rely on `title`.
  **Why** Hover-only help excludes keyboard, touch and screen reader users.
  **Applies to** icon toolbars, field help. **Check** focus trigger -> tooltip visible, Esc -> hidden, hover over tooltip keeps it (WCAG 1.4.13); toggletip: status region empty at load and text after click; `[role=tooltip] :is(a,button,input)` count 0; `[title]` not the only source of a name. **Source** `inclusive-components.md` IC-14..IC-19, `adrian-roselli.md` AR-33

- **RULE [CA-10]** Table contract. `table` > `caption` (or labelled by heading), `thead` > `tr` > `th scope=col`, row headers `th scope=row`, no layout tables, no `display` changes on table parts; wide tables sit in a scrolling wrapper with `overflow-x:auto` that is `tabindex=0` only when it actually overflows and shows a focus ring (name and role optional); sortable headers contain `button`, `th[aria-sort]` only on the sorted column, live-region announcement of sort; clickable rows use a checkbox/link/button in the row with a stretched label, never `tr` handlers or `grid` role; numeric columns right-aligned; no scroll-snap.
  **Why** Table semantics make cell navigation work for screen readers; wrappers keep reflow.
  **Applies to** pricing, comparison, admin tables. **Check** `table:has(td)` has `th` and `caption`; computed `display` of parts is table-*; at 320 px wrapper scrollable => `tabindex="0"`; after sort exactly one `th[aria-sort]`; `[role=grid]` count 0; `tr[onclick]` count 0. **Source** `inclusive-components.md` IC-42..IC-47, `adrian-roselli.md` AR-06, AR-17..AR-20

- **RULE [CA-11]** Form field contract. `label[for]` (visible, persistent) + `input` with `id`, `name`, correct `type`, `autocomplete`, `inputmode` where numeric; hint text via `aria-describedby`; required marked in text (plus `required`); groups in `fieldset`/`legend` (required radio group: `role=radiogroup` + `aria-required`); error: text message (not colour-only) with an icon, `aria-invalid="true"` only after interaction/submit, message referenced by `aria-describedby`, on submit failure focus moves to the first invalid field or an error summary that links to fields; success state confirmed; no placeholder as label; no disabled submit; paste allowed; input font-size >= 16 px.
  **Why** Name, instructions and error text are how users complete forms.
  **Applies to** every form. **Check** `A10` suite plus: each `[aria-invalid=true]` has described-by text visible; `form:not([novalidate])` with custom messages flagged; `input[placeholder]` without label count 0; submit buttons never `disabled`; label text includes "required" or marker with text alternative. **Source** `webdev-learn-accessibility.md` WDA-35..WDA-39, `adrian-roselli.md` AR-09, AR-25..AR-27, AR-31

- **RULE [CA-12]** Notification contract. FYI messages go to a persistent `role=status` region (polite) rendered at load; urgent, time-sensitive messages use `role=alert`; messages that need action are dialogs (non-modal or alertdialog) with focus management; focus never moves to a passive message; type conveyed in text (prefix or visually hidden text) plus icon, not colour alone; timed dismissal only with a retrievable log, adjustable duration, or hover/focus pause; dismiss control >= 44 px with a unique name; inline form status above the form or near the control; persistent banners for errors that block progress.
  **Why** Announcements must reach users without stealing focus and must not disappear before they are read.
  **Applies to** toasts, alerts, banners, inline status. **Check** trigger each message type: `document.activeElement` unchanged for status/alert; live region text updates; toast with interactive child has `role=dialog|alertdialog`; auto-dismiss time >= 5 s with log or pause (`WCAG 2.2.1`); message contains a type word. **Source** `inclusive-components.md` IC-37..IC-41, `adrian-roselli.md` AR-07..AR-08

## 3. Numbers & scales (per component)

| Component | Key values |
|---|---|
| Button / link / target | >= 24x24 CSS px AA (spacing exception), 44x44 recommended; hit gap 8 px (Android guidance); icon-only buttons need 44 px on touch |
| Focus indicator | >= 3:1 vs adjacent colours; >= 2 px recommended thickness (existing rule) |
| Card | min column 15rem (rem); text max about 60ch; mobile row gap larger than desktop (4.5rem example); click-vs-select threshold 200 ms |
| Tabs | roving tabindex; one tab stop for the tablist |
| Accordion | one panel open at a time; `details name` in Chrome 120+ |
| Dialog | close button 44 px; backdrop dims; initial focus per context; Esc closes informational |
| Menu | app menu: Enter/Space/Down open; Down/Up wrap; Esc closes; nav: list of links only |
| Toggle | non-text contrast 3:1; label constant |
| Toggletip | 100 ms re-announce delay |
| Table | wrapper scroll only if `scrollWidth > clientWidth`; sort live region cleared after 1 s |
| Form field | input font >= 16 px (iOS zoom); `autocomplete` tokens; error text contrast >= 4.5:1 |
| Notification | auto-dismiss 5-10 s only with a log; status polite, alert assertive |

## 4. Dos and Don'ts

- Do copy the block for a component into the build spec and run its contract script; do not mix patterns (a "tab" that is a link to a new page, a "menu" that is a list of links).
- Don't build a component from `div` + role when the element exists.
- Don't hide state in a class only; carry it in the attribute and style from the attribute.
- Do define the closed state list (default/hover/focus/active/disabled/loading/error/selected) for each component before visual design (`S1`).
- Don't disable the submit button; don't hide controls behind hover; don't move focus for FYI messages.
- Do move focus on dialog open and on delete; return it to the trigger or the previous control.

## 5. Exceptions & judgement calls

Conflicts between sources and with existing rules, resolved here as engine choices (flag if you disagree):

1. **Tab element**: Heydon's article builds tabs from `<a>`; the engine spec uses `<button role=tab>` (APG). Keyboard model identical.
2. **Scroll wrapper name/role**: required by Heydon (2018) and Roselli (2017-2020); relaxed by Roselli in October 2026 after an AGWG decision. Engine: `tabindex=0` HARD, name+role SOFT.
3. **Dialog initial focus**: existing rule (first control or heading) refined into the context table in CA-06.
4. **Disabled controls**: `S1` expects a disabled style; CA-01/CA-11 prohibit disabling submits. Keep a disabled style only for non-form actions and use `aria-disabled` when a control must stay focusable.
5. **Toast timing**: IC-41 vs AR-08; CA-12 chooses the retrievable-log rule.
6. **Accordion single open**: Roselli's strict definition (exclusive) vs common design-system accordions that allow multiple. Engine: both allowed; name the multi-open variant "disclosure group" (AR-32).
7. **`aria-controls`**: optional everywhere; do not depend on it.
8. **Tooltip pattern**: no Roselli post read (404); the spec rests on Heydon plus WCAG 1.4.13 (Content on Hover or Focus: dismissible, hoverable, persistent). [engine note]
9. **Native alternatives**: `popover`, `<details name>` and `dialog` reduce custom code but have stacking and support quirks (AR-22); verify with the browser matrix in `implementation-craft.md` section 3.1.

## 6. Figures worth keeping

None captured. Suggested fixtures: one HTML page per component in `examples/a11y/` that satisfies its contract, and a "broken" twin that fails each contract line, to calibrate the checks.

## 7. Open questions

- Combobox/listbox/autocomplete, date pickers, pagination and carousel controls are not specced here (not in this source set beyond slider notes); add from APG and GOV.UK later.
- Contract scripts are described, not yet implemented; add to `tools/check.mjs` and `measurable-assertions.md` as `A20..A31` once approved.
- `p.NN: no rule content`: none; all sections contain content.
