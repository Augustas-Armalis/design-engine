---
source: web:https://developer.apple.com/design/human-interface-guidelines/components (pages: buttons, text-fields, toggles, menus, pop-up-buttons, pull-down-buttons, context-menus, segmented-controls, sliders, steppers, pickers, alerts, action-sheets, tab-bars, tab-views, sidebars, toolbars, lists-and-tables, search-fields, token-fields, disclosure-controls, labels, text-views, charts, gauges, virtual-keyboards, notifications; fetched 2026-10-08)
chapter: Apple HIG - Controls and components (web-relevant guidance, native specifics flagged)
pages: n/a (web source)
topic_tags: [components, buttons, forms, text-fields, toggles, menus, select, segmented-control, slider, stepper, alerts, dialogs, tabs, navigation, toolbar, tables, search, apple-hig]
status: studied
---

# Apple HIG - Controls and Components

Raw text: `corpus/web/apple-hig/{buttons,text-fields,toggles,menus,pop-up-buttons,pull-down-buttons,context-menus,segmented-controls,sliders,steppers,pickers,alerts,action-sheets,tab-bars,tab-views,sidebars,toolbars,lists-and-tables,search-fields,token-fields,disclosure-controls,labels,text-views,virtual-keyboards,charts,gauges,notifications}.txt` (private). Written in my own words. Mapping used for web: Apple "pop-up button" = single-select `<select>`/listbox; "pull-down button" = action menu button; "segmented control" = radio-group segmented / tabs; "toggle switch" = `role=switch`; "sheet" = modal dialog or drawer; "alert" = alertdialog; "action sheet" = confirmation dialog with choices; "tab bar" = bottom/top app navigation; "toolbar" = action bar. Placement words follow reading direction (leading = left in LTR).

Where a rule already lives in another note (touch target size, popover/sheet containers, scroll, tracking) it is cross-referenced rather than repeated.

## 1. Core ideas
1. A button does an instantaneous action. Style, content and role are separate decisions; role (primary, cancel, destructive, normal) drives appearance.
2. Emphasis comes from style, not size: sibling buttons stay equal size and the likely action gets the prominent style; only one or two prominent buttons per view.
3. Pick the control by the data: two opposing states = toggle; one of several = segmented/radio/pop-up; many items = picker/list; an action list = pull-down menu; a number = stepper/slider (+ field).
4. Switches belong in list rows with their own context label; outside lists use an icon button with a visible on state.
5. Menus: verbs, ellipsis when more input is needed, grouped by use, short; submenu one level; unavailable items dimmed (but hidden in context menus); important/frequent first.
6. Dialogs: use alerts sparingly (critical, actionable); action sheets for choices about an intentional action; destructive style only for actions not deliberately chosen; Cancel always available; never "OK" as default except informational.
7. Navigation: tab bar = navigate, toolbar = act; keep tab bar visible; do not hide or disable tabs; sidebar for complex structures; two hierarchy levels.
8. Data entry: label, hint, validate as you go, right keyboard, secure fields, offer choices over typing.
9. Search: placeholder shows scope; live results; suggestions; scope bars default broad; tokens for filters.
10. Charts: simple, consistent, accessible, descriptive; hierarchy puts data first.

## 2. Rules

### Buttons

- **RULE [AH-CP-01]** Provide a pressed/active state on every custom button.
  **Why** without it the button feels unresponsive. **Applies to** web: all. **Check** `:active` differs from rest state. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-02]** Use a prominent (filled, accent) button style for the most likely action and keep it to one or two per view; secondary actions use less prominent styles at the same size.
  **Why** many prominent buttons raise cognitive load; equal sizes signal a coherent set. **Applies to** web: all. **Check** count of filled-accent buttons per viewport <= 2; sibling buttons share height. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-03]** Distinguish the preferred option by style, never by making it bigger.
  **Why** different-size neighbours look inconsistent. **Applies to** web: dialogs, forms, pricing cards. **Check** within a button group, computed height and padding identical. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-04]** Assign the primary role to the most likely non-destructive action (Enter submits it); never mark a destructive action as primary even if it is the likeliest.
  **Why** prominent buttons get clicked without reading. **Applies to** web: dialogs, forms. **Check** destructive button uses the destructive style, not the default primary fill; `Enter` binds to non-destructive default. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-05]** Make each button communicate its purpose: familiar icons for familiar actions, or a short verb-led label ("Add to Cart"); use text when an icon is ambiguous.
  **Why** unclear icon-only buttons force guessing. **Applies to** web: all. **Check** icon-only buttons are from a standard set and have an accessible name/tooltip. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-06]** Show an in-button activity indicator for slow actions and swap the label to the progressive form (see motion note AH-MO-28).
  **Why** saves space and explains the wait. **Applies to** web: submit buttons. **Check** button width stable; `aria-busy`. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-07]** Append an ellipsis to labels of actions that open another view or need more input ("Rename...").
  **Why** signals more input follows. **Applies to** web: menu items and buttons that open dialogs. **Check** menu items that open a dialog end with "…" (U+2026). **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

- **RULE [AH-CP-08]** Avoid giving button labels a colour similar to a colourful content background; default to monochrome labels on glass.
  **Why** similar hues reduce legibility. **Applies to** web: floating buttons over media. **Check** contrast >= 4.5:1 against worst backdrop. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

### Text input

- **RULE [AH-CP-09]** Use a text field for short input (name, email) and a text area for long input; size the field to the expected length.
  **Why** field size signals expected quantity. **Applies to** web: forms. **Check** `<input>` widths proportional to content (postal code short, address long); long text uses `<textarea>`. **Source** https://developer.apple.com/design/human-interface-guidelines/text-fields

- **RULE [AH-CP-10]** Placeholder text is a hint only; always pair with a persistent label because the placeholder vanishes on input.
  **Why** people forget the field's purpose mid-entry. **Applies to** web: all forms. **Check** each input has a `<label>`; placeholder is not the only label. **Source** https://developer.apple.com/design/human-interface-guidelines/text-fields

- **RULE [AH-CP-11]** Use a secure (password) field for sensitive input and never prefill passwords.
  **Why** obscures input from shoulder-surfing; prefilled passwords are insecure. **Applies to** web: `type=password`, `autocomplete="current-password"`/`new-password`. **Check** password inputs are `type=password`; `value` attribute absent. **Source** https://developer.apple.com/design/human-interface-guidelines/entering-data

- **RULE [AH-CP-12]** Stack multiple fields vertically with consistent spacing and widths that fit the content (first/last name on one width, address/city on another); keep tab order logical.
  **Why** orderly forms are quicker to scan. **Applies to** web: forms. **Check** field stack gap constant within 1 px; tabbing follows visual order. **Source** https://developer.apple.com/design/human-interface-guidelines/text-fields

- **RULE [AH-CP-13]** Validate when sensible: email on blur (switching fields), user names and passwords while typing, numerics via formatter; show feedback as soon as an error is detected, next to the field.
  **Why** fix errors while the context is fresh. **Applies to** web: forms. **Check** error element adjacent to input with `aria-describedby`; validation timing per field type. **Source** https://developer.apple.com/design/human-interface-guidelines/entering-data

- **RULE [AH-CP-14]** Show the appropriate keyboard type for each field (email, number/decimal, phone, URL, search) and Return-key label (search, next, done).
  **Why** fewer taps and fewer errors on touch. **Applies to** web: `type`, `inputmode`, `autocomplete`, `enterkeyhint`. **Check** each input has `inputmode`/`type` matching content; 16 px font size to avoid iOS zoom (engine). **Source** https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards

- **RULE [AH-CP-15]** Include a clear (x) button at the trailing end of text fields on touch; use the leading end for purpose icons and the trailing end for extra features.
  **Why** deleting character by character is slow. **Applies to** web: search and long inputs. **Check** `type=search` or a clear button present on mobile. **Source** https://developer.apple.com/design/human-interface-guidelines/text-fields

- **RULE [AH-CP-16]** Prefer gathering data automatically or via choices (picker, menu, suggestions) over typing; support paste and drag-drop into fields; prefill reasonable defaults.
  **Why** entry is tedious and error-prone. **Applies to** web: forms, checkout (autocomplete tokens, address autofill, passkeys). **Check** inputs carry `autocomplete` tokens; no paste blocking (`onpaste` preventDefault). **Source** https://developer.apple.com/design/human-interface-guidelines/entering-data

- **RULE [AH-CP-17]** Disable "Next/Continue" until required data is valid, and tell people which data is required.
  **Why** prevents dead-end submissions. **Applies to** web: wizards; prefer `aria-disabled` with explanation over silent disable. **Check** required fields marked; button state matches validity. **Source** https://developer.apple.com/design/human-interface-guidelines/entering-data

- **RULE [AH-CP-18]** Handle overflowing text in fields by clipping or wrapping per field type, and show the full text on hover/expansion when truncated.
  **Why** lost content frustrates. **Applies to** web: `title`/tooltip for truncated values. **Check** truncated fields expose full value (tooltip or focus). **Source** https://developer.apple.com/design/human-interface-guidelines/text-fields

- **RULE [AH-CP-19]** Use a text view (multi-line) for long, editable or specially formatted text; make useful text selectable; keep it legible under accessibility options.
  **Why** field vs view choice. **Applies to** web: `<textarea>`/contenteditable. **Check** see typography notes. **Source** https://developer.apple.com/design/human-interface-guidelines/text-views

### Toggles, selection controls

- **RULE [AH-CP-20]** Use a switch only for a binary setting that takes effect immediately, in a list/settings row where the row text names the setting; no extra label needed.
  **Why** the row supplies context. **Applies to** web: settings pages (`role=switch`, `aria-checked`, label bound). **Check** each switch has an accessible name via the row label; state visible without colour only. **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CP-21]** Outside list rows use a toggle button (icon button whose background changes with state) rather than a switch.
  **Why** switches lack context outside rows. **Applies to** web: toolbars (`aria-pressed`). **Check** `aria-pressed` toggles in toolbars; filled vs outline state. **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CP-22]** Make on/off differences obvious beyond colour: add/remove fill, shape, checkmark or dot.
  **Why** colour-blind users. **Applies to** web: toggles, checkboxes, tags. **Check** grayscale render distinguishes states. **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CP-23]** Prefer a checkbox over a switch for hierarchies of settings and for a single on/off item in a form; show a mixed state (dash) for a parent whose children differ; use radio buttons for 2-5 mutually exclusive choices (more than about 5: use a select).
  **Why** checkboxes align and indent to show dependencies; radios list options with labels. **Applies to** web: forms. **Check** radio groups have 2-5 items; parent checkbox uses `indeterminate`. **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CP-24]** Align radio buttons horizontally with equal spacing sized to the longest label.
  **Why** uneven spacing looks ragged. **Applies to** web: inline radio groups. **Check** equal column widths. **Source** https://developer.apple.com/design/human-interface-guidelines/toggles

- **RULE [AH-CP-25]** Use a segmented control for 2-5 closely related, equal-weight options that affect an object or view (about 5 on a phone, 5-7 on wide layouts); all segments equal width; text OR icons, not both; nouns in title case; never mix selection segments with action segments.
  **Why** grouped selection state at a glance; mixing semantics confuses. **Applies to** web: view switchers (list/grid), filters. **Check** segments <= 5 at 390 px, <= 7 at 1024 px; equal widths; `role=radiogroup`/tablist consistent. **Source** https://developer.apple.com/design/human-interface-guidelines/segmented-controls

- **RULE [AH-CP-26]** Use a segmented control to switch between related subviews in one screen; for separate app sections use tab navigation; use a tab view (not a pop-up) for switching panes in the main area.
  **Why** right control for the scope. **Applies to** web: tabs vs segmented. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/segmented-controls

- **RULE [AH-CP-27]** Use a pop-up (single-select menu) for a flat list of mutually exclusive options when space is tight; provide a useful default; make the choice predictable via a label; include a "Custom" item for rare cases.
  **Why** compact selection. **Applies to** web: `<select>`/combobox. **Check** select has a label and a sensible default option. **Source** https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons

- **RULE [AH-CP-28]** Use a pull-down (action menu) when the list is commands, multi-select, or has submenus; minimum three items; the menu title is optional; put destructive items in red and confirm with an action sheet.
  **Why** distinguishes menus of actions from selection menus. **Applies to** web: dropdown menu buttons. **Check** menu with < 3 items replaced by buttons; destructive items styled and confirmed. **Source** https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons

- **RULE [AH-CP-29]** Do not hide all primary actions of a view inside a single pull-down.
  **Why** discoverability. **Applies to** web: toolbars. **Check** top 1-2 actions are visible buttons. **Source** https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons

- **RULE [AH-CP-30]** A "More" (ellipsis) menu is acceptable for low-priority actions, with the awareness it hurts discoverability.
  **Why** trade space for findability. **Applies to** web: toolbars/cards. **Check** ellipsis menu contents are lowest-frequency actions. **Source** https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons

- **RULE [AH-CP-31]** Use a slider for approximate values on a continuous range; min on the leading/bottom, max on the trailing/top; pair it with a text field and stepper when exact values or wide ranges are needed; show labels at least at both ends; support live feedback.
  **Why** direct manipulation plus precision. **Applies to** web: `<input type=range>` plus `<input type=number>`. **Check** slider has min/max labels and `aria-valuetext`; paired number field for ranges > 100 steps `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/sliders

- **RULE [AH-CP-32]** Use a stepper (decrement/increment pair) for small, incremental changes, always next to a visible value; add a text field if values vary widely; allow a larger step with Shift on desktop.
  **Why** a stepper alone shows no value. **Applies to** web: quantity inputs. **Check** value displayed adjacent; `aria-label` on +/-; Shift+click step x10 optional. **Source** https://developer.apple.com/design/human-interface-guidelines/steppers

- **RULE [AH-CP-33]** Use pickers for medium-to-long lists of predictable, logically ordered values (alphabetical countries); render them in context near the field, not in a new view; for date pickers offer coarser minute steps (interval that divides 60: 5, 10, 15, 30).
  **Why** predictability helps scrubbing; context stays visible. **Applies to** web: date/time and country/state selects. **Check** minute `step` divides 3600 s; list sorted. **Source** https://developer.apple.com/design/human-interface-guidelines/pickers

- **RULE [AH-CP-34]** Use a compact (popup) date picker when space is constrained, an inline calendar when browsing is key.
  **Why** fits the task and space. **Applies to** web: date inputs. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/pickers

- **RULE [AH-CP-35]** Use a disclosure control (triangle/chevron) with a descriptive label to hide advanced options; place frequently needed controls above the fold; at most one disclosure button per view; the chevron points right/leading when collapsed, down when expanded.
  **Why** progressive disclosure. **Applies to** web: accordion, `<details>`. **Check** disclosure has a text label and `aria-expanded`. **Source** https://developer.apple.com/design/human-interface-guidelines/disclosure-controls

### Menus

- **RULE [AH-CP-36]** Write menu item labels as verbs or verb phrases in title style (Apple) or sentence style (engine default), without articles ("View Settings", not "View the Settings").
  **Why** shorter, scannable. **Applies to** web: menus. **Check** items start with a verb; no leading "the/a/an". **Source** https://developer.apple.com/design/human-interface-guidelines/menus

- **RULE [AH-CP-37]** Dim unavailable menu items rather than removing them (so people learn what exists) - but in context menus hide inapplicable items.
  **Why** regular menus teach; context menus show only the relevant. **Applies to** web: app menus vs right-click menus. **Check** `aria-disabled` items rendered in app menus; context menus omit. **Source** https://developer.apple.com/design/human-interface-guidelines/context-menus

- **RULE [AH-CP-38]** Order menu items by importance/frequency; group logically related items with separators; keep related commands in one group even if used less often; cap context menu at about 3 groups.
  **Why** people scan from the top. **Applies to** web: all menus. **Check** separators count <= 3 in context menus; high-frequency items first. **Source** https://developer.apple.com/design/human-interface-guidelines/menus

- **RULE [AH-CP-39]** Keep menus short; split long menus or use one level of submenu when a term repeats in more than two items; submenu holds about 5 items or fewer; never indent items to fake hierarchy.
  **Why** long menus are missed. **Applies to** web: dropdowns. **Check** menu length <= ~12 items; submenu depth 1; submenu item count <= 5. **Source** https://developer.apple.com/design/human-interface-guidelines/menus

- **RULE [AH-CP-40]** Show an icon on menu items sparingly: all or none within a group; use standard symbols for standard actions (copy, share, delete).
  **Why** inconsistency looks messy. **Applies to** web: menus. **Check** per group, icon coverage 0% or 100%. **Source** https://developer.apple.com/design/human-interface-guidelines/menus

- **RULE [AH-CP-41]** For toggled items use one changeable label ("Show Map" / "Hide Map"), add a verb if ambiguous ("Turn HDR On"), use a checkmark for attributes currently in effect, and consider a "Plain/Reset" item to clear many toggles.
  **Why** state or action clarity. **Applies to** web: view menus. **Check** `menuitemcheckbox` with `aria-checked`. **Source** https://developer.apple.com/design/human-interface-guidelines/menus

- **RULE [AH-CP-42]** Put destructive context-menu items last and style them red; make every context-menu action also available in the main UI; keep context menus consistent across the app; show keyboard shortcuts in main menus only.
  **Why** hidden-by-default menus cannot be the only access. **Applies to** web: right-click and long-press menus. **Check** each context action is reachable via visible UI. **Source** https://developer.apple.com/design/human-interface-guidelines/context-menus

- **RULE [AH-CP-43]** Provide a context menu or an edit-selection menu for an item, not both.
  **Why** the system cannot detect the intent. **Applies to** web: text selection toolbars vs context menus. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/context-menus

### Dialogs and alerts

- **RULE [AH-CP-44]** Use an alert dialog sparingly: only for critical, actionable information; not for info-only messages, not for common undoable actions, not at app start.
  **Why** interrupts the task; overuse trains dismissal. **Applies to** web: modals/`alertdialog`. **Check** count of alertdialogs per session; no alert on load. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-45]** Alert anatomy: a title, optional short message, up to three buttons; optional text field only when input is required to resolve the situation.
  **Why** keeps alerts readable. **Applies to** web: alertdialog. **Check** buttons <= 3; message <= 2 sentences. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-46]** Alert titles state what happened and why in a short complete phrase (no bare "Error"), at most two lines; use sentence-style punctuation for full-sentence titles and title style without period for fragments.
  **Why** people decide from the title. **Applies to** web. **Check** title length <= ~80 chars; not in {"Error", "Warning", "Alert"}. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-47]** Name alert buttons with one or two verb words that describe the result ("Delete", "Erase", "Replace"); use "Cancel" for cancelling; avoid "OK" except in purely informational alerts; avoid Yes/No.
  **Why** vague labels hide consequences. **Applies to** web. **Check** button text blacklist (OK, Yes, No, Confirm, Submit) in destructive dialogs. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-48]** Place the default/likeliest button on the trailing side of a row (top of a stack), Cancel on the leading side (bottom of a stack); do not make Cancel the default; a destructive action not deliberately chosen gets the destructive style; a deliberately chosen destructive action (Empty Trash) does not need red.
  **Why** consistent positions; the destructive style is a warning for unintended actions. **Applies to** web: dialog footers (coss `DialogFooter`: Cancel `variant="ghost"` left, action right). **Check** footer order: [Cancel][Primary] in LTR; destructive variant on unexpected-destructive only. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-49]** Provide quick ways to cancel an alert: Escape key, click-away where safe.
  **Why** efficiency and accessibility. **Applies to** web: dialogs (native `<dialog>` handles Esc). **Check** Esc closes alert unless the action is mandatory. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-50]** Avoid alerts that scroll; keep titles short and add messages only when needed; never show more than one alert at once.
  **Why** large type makes alerts overflow. **Applies to** web. **Check** alert height < viewport at 200% zoom. **Source** https://developer.apple.com/design/human-interface-guidelines/alerts

- **RULE [AH-CP-51]** Use an action sheet (a small set of choices about an intentional action, including the destructive one at top and Cancel at bottom) rather than an alert when choices accompany a confirmation; keep titles to a single line, message only if needed, avoid scrolling.
  **Why** an action sheet reads as a choice, an alert as a problem. **Applies to** web: mobile confirm menus, bottom sheets. **Check** destructive first, cancel last. **Source** https://developer.apple.com/design/human-interface-guidelines/action-sheets

- **RULE [AH-CP-52]** Close the sheet loop: a sheet needs Cancel/Close, and Done only with a Cancel or Back alternative; do not show Cancel, Done and Back together; Cancel at leading top, Done at trailing top.
  **Why** Done alone traps the user. **Applies to** web: modal forms. **Check** modal header has at most two of {Cancel, Done, Back}. **Source** https://developer.apple.com/design/human-interface-guidelines/sheets

### Navigation

- **RULE [AH-CP-53]** Use a tab bar for navigating between top-level sections, not for actions; keep it visible on every section; never hide or disable tabs (explain empty sections instead); use single-word labels with icons; avoid "More" overflow tabs.
  **Why** hidden/disabled tabs make the app feel unstable. **Applies to** web: mobile bottom nav / top tabs. **Check** nav items constant across routes; label length <= ~12 chars. **Source** https://developer.apple.com/design/human-interface-guidelines/tab-bars

- **RULE [AH-CP-54]** Keep the number of top-level tabs small (about five; fewer is easier); when structure is larger, offer a sidebar or a tab bar that converts to a sidebar.
  **Why** comfortable reach and recognition. **Applies to** web: app nav (bottom bar <= 5 on phones). **Check** bottom tabs <= 5. **Source** https://developer.apple.com/design/human-interface-guidelines/tab-bars

- **RULE [AH-CP-55]** Use filled icon variants for tab bar icons and outline for toolbars/lists; the selected state changes automatically.
  **Why** filled shapes read at small size and show selection. **Applies to** web: icon sets with fill/outline variants. **Check** active tab uses filled glyph + accent colour. **Source** https://developer.apple.com/design/human-interface-guidelines/sf-symbols

- **RULE [AH-CP-56]** Badge a tab only for critical information; one standard badge style.
  **Why** badge inflation dilutes meaning. **Applies to** web: nav badges. **Check** badge count per nav <= 2. **Source** https://developer.apple.com/design/human-interface-guidelines/tab-bars

- **RULE [AH-CP-57]** A tab view (macOS) holds closely related panes, controls inside a pane affect only that pane, labels are nouns in title style, at most six tabs; use the tabbed control at the top; inset the tab view with a margin.
  **Why** tabs imply enclosure and mutual exclusivity. **Applies to** web: settings tabs, inspector tabs. **Check** tabs <= 6; panel content scoped; `role=tablist`. **Source** https://developer.apple.com/design/human-interface-guidelines/tab-views

- **RULE [AH-CP-58]** Sidebars: let people customise and hide them (but not default hidden), group deep content with disclosure, use familiar icons, at most two levels, succinct group titles, and give icon colours a purpose.
  **Why** scale and discoverability. **Applies to** web: app navigation. **Check** see layout note AH-LA-24. **Source** https://developer.apple.com/design/human-interface-guidelines/sidebars

- **RULE [AH-CP-59]** Toolbar: choose items deliberately; prioritise the main tasks; put key actions (Done/Submit) in one prominent style on the trailing side (only one primary); group by function and frequency (max about three groups); keep text-labelled actions apart with fixed space; keep symbols borderless; use a "More" menu for the rest; titles under about 15 characters and never the app name.
  **Why** crowded bars hide actions; consistent grouping builds familiarity. **Applies to** web: app bars. **Check** action count per bar <= 6 visible + overflow `[engine note: Apple gives no count]`; title length <= 15 chars; one filled button. **Source** https://developer.apple.com/design/human-interface-guidelines/toolbars

- **RULE [AH-CP-60]** Use standard Back and Close affordances (standard symbols, no "Back" text) and keep them in the leading toolbar position.
  **Why** familiar, language-independent. **Applies to** web: mobile headers, modals. **Check** back chevron at leading edge with `aria-label="Back"`. **Source** https://developer.apple.com/design/human-interface-guidelines/toolbars

- **RULE [AH-CP-61]** Use a large title that collapses to a standard title on scroll for orientation on top-level phone screens.
  **Why** shows location without permanent space cost. **Applies to** web: mobile app headers (sticky collapse). **Check** visual. **Source** https://developer.apple.com/design/human-interface-guidelines/toolbars

- **RULE [AH-CP-62]** Every toolbar command must also exist in the main menu or main UI, because toolbars can be customised or hidden.
  **Why** discoverability. **Applies to** web: command palette lists all toolbar commands. **Check** parity of toolbar actions with command palette. **Source** https://developer.apple.com/design/human-interface-guidelines/toolbars

### Lists, tables, search

- **RULE [AH-CP-63]** Prefer text in lists and tables; use collections for images; keep row text succinct; truncate in the middle for identifiers; use noun phrase column headings with no punctuation; let desktop users sort by column header (click again reverses), resize columns, and use alternating row colours in wide tables.
  **Why** rows are for scanning; middle ellipsis keeps both ends. **Applies to** web: data tables. **Check** `aria-sort` on sortable headers; wide tables have zebra or hover row highlight; long IDs use middle truncation. **Source** https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

- **RULE [AH-CP-64]** Show selection feedback appropriate to the table: persistent highlight for navigation hierarchies; brief highlight plus checkmark for option lists.
  **Why** orientation vs choice. **Applies to** web: lists. **Check** `aria-current`/`aria-selected` consistent. **Source** https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

- **RULE [AH-CP-65]** Use a disclosure indicator for drill-down and an info button only for extra details about a row; do not add an alphabetical index next to trailing controls.
  **Why** adjacent trailing controls collide. **Applies to** web: lists with chevrons. **Check** chevron vs info icon semantics. **Source** https://developer.apple.com/design/human-interface-guidelines/lists-and-tables

- **RULE [AH-CP-66]** Search field: placeholder states what can be searched; search as the user types when possible; show recents and suggestions; rank most relevant first and group results; offer scope filter defaulting broad; tokens for common filters; one location for app-wide search; show the current scope; let users clear search history.
  **Why** responsive, scoped search. **Applies to** web: command palette, site search. **Check** `type=search`, placeholder not generic ("Search"), live results debounce 150-300 ms `[engine note]`. **Source** https://developer.apple.com/design/human-interface-guidelines/search-fields

- **RULE [AH-CP-67]** Place search where it fits the task: as a tab or toolbar item at the bottom/top of mobile screens, at the trailing end of desktop toolbars, at the top of sidebars when filtering navigation, inline above a list when filtering only that list; focus the field when entering a dedicated search area (except when it would open a virtual keyboard over content on tablets).
  **Why** placement signals scope. **Applies to** web. **Check** autofocus only on dedicated search routes. **Source** https://developer.apple.com/design/human-interface-guidelines/search-fields

- **RULE [AH-CP-68]** Token fields convert typed terms into selectable tokens on comma (and optionally Enter); tokens can offer a context menu; delay suggestions slightly so they do not interrupt typing.
  **Why** selectable chips for recipients or filters. **Applies to** web: tag inputs. **Check** tokens deletable by keyboard; suggestions delay >= 150 ms. **Source** https://developer.apple.com/design/human-interface-guidelines/token-fields

### Feedback components

- **RULE [AH-CP-69]** Notifications: short title with context, succinct body in complete sentences (sentence case), no app name or icon duplicate, up to four beneficial non-destructive actions with clear verbs; do not repeat the same notification; use alerts (not notifications) for errors; avoid sensitive info; provide generic body text when previews are hidden.
  **Why** notifications are interruptions that people can switch off. **Applies to** web: push and in-app notifications. **Check** copy lint; sensitive data absent; action count <= 4. **Source** https://developer.apple.com/design/human-interface-guidelines/notifications

- **RULE [AH-CP-70]** Use a badge only for an unread-notification count; do not use badges for unrelated numbers; never rely on badges as the sole indicator of important information; keep them current.
  **Why** users can turn badges off; stale badges erode trust. **Applies to** web: favicon/app badge, nav counts. **Check** badge counts clear on view. **Source** https://developer.apple.com/design/human-interface-guidelines/notifications

- **RULE [AH-CP-71]** Charts: use a chart when you want to highlight a point about a dataset; prefer common chart types; keep it simple and reveal detail on demand; add title/subtitle summarising the takeaway; keep data most prominent and axes/labels secondary; bars start at zero, line charts may use a data range; use familiar tick sequences (0, 5, 10); do not rely on colour alone (use shape/pattern and separators between stacked marks); use consistent chart style across a product; maximise plot width on compact screens; make interaction large (whole plot area as hit target); do not require interaction for critical info.
  **Why** Apple's chart design set. **Applies to** web: dashboards, dataviz. **Check** bar y-axis min = 0; charts have summary text; hit target = plot area for tooltips. **Source** https://developer.apple.com/design/human-interface-guidelines/charting-data

- **RULE [AH-CP-72]** Gauge: label current value and both endpoints; a gradient may reinforce meaning (temperature); capacity style fills to the value.
  **Why** value within a range needs context. **Applies to** web: meters/progress with ranges (`<meter>`). **Check** `<meter>` has min, max, low/high/optimum and labels. **Source** https://developer.apple.com/design/human-interface-guidelines/gauges

- **RULE [AH-CP-73]** Tooltips (hover help): describe only the hovered control, start with a verb, do not repeat its name, keep to 60-75 characters, sentence case, vary by state when useful; never hold essential information (touch cannot hover).
  **Why** brief, additive help. **Applies to** web: pointer tooltips on icon buttons. **Check** tooltip text length <= 75; not equal to button label. **Source** https://developer.apple.com/design/human-interface-guidelines/offering-help

- **RULE [AH-CP-74]** Use a tip (one or two sentences, actionable, non-promotional, for features needing three or fewer steps) as a popover or inline hint; show only to eligible people and no more than once every 24 hours.
  **Why** contextual teaching without nagging. **Applies to** web: product tours, feature hints. **Check** tip frequency cap and eligibility rules exist. **Source** https://developer.apple.com/design/human-interface-guidelines/offering-help

- **RULE [AH-CP-75]** (native-only) macOS specifics: push/square/help/image button types, flexible-height push buttons, spring loading; square buttons in views not window frames; one help button per window in a fixed corner; 10 px image-button padding; spring loading on drag-over; menu bar and Dock menus; iOS menu layout sizes (small 4 icons, medium 3, large list); iPadOS pointer effects.
  **Why** recorded to avoid false equivalence. **Applies to** native-only. **Check** n/a. **Source** https://developer.apple.com/design/human-interface-guidelines/buttons

## 3. Numbers & scales

| Component | Count / size rule |
|---|---|
| Prominent buttons per view | 1-2 |
| Alert buttons | up to 3; titles 1-2 words; title <= 2 lines |
| Radio buttons | groups of 2-5 |
| Segmented control | about 5 (phone) to 5-7 (wide) |
| Pull-down menu | min 3 items |
| Submenu | 1 level, about 5 items max |
| Context menu | about 3 groups |
| Tab view (macOS) | max 6 tabs |
| Tab bar (touch) | keep small; customizable list default <= 5 |
| Toolbar | about 3 groups; title < 15 chars |
| Sidebar | 2 hierarchy levels |
| Page-control dots | about 10 |
| Notification actions | up to 4 |
| Tooltip | 60-75 characters |
| Hit region | 44x44 (see layout note) |
| Date picker minute interval | any divisor of 60 (5, 10, 15, 30) |
| Stepper large step | about 10x with Shift |
| Tips cadence | no more than once per 24 h |
| Date-picker modes | date, time, date and time, countdown (max 23 h 59 min) |

## 4. Dos and Don'ts
- **Do** label the dialog's buttons "Delete project" / "Cancel"; **Don't** label them "OK" / "Cancel".
- **Do** put a destructive action at the top of a mobile action sheet and Cancel at the bottom; **Don't** stack three equally styled buttons.
- **Do** keep the same four tabs on every screen; **Don't** hide the bar on one subpage or grey out a tab with no data.
- **Do** write "Choose a password with at least 8 characters"; **Don't** write "Invalid password".
- **Do** switch a 9-item radio group to a select; **Don't** list nine radios.
- **Do** use a stepper beside a number field for quantity; **Don't** show a naked stepper with no value.

## 5. Exceptions & judgement calls
- **Capitalisation conflict.** Apple: title-style for button labels, menu items, segmented labels, column headings, tab labels; sentence-style for alert titles that are sentences, button titles in alerts, tooltips, notification body. `web/copy-and-ux-writing.md` CW-10 and CW-17 default to sentence case. Use sentence case unless the brand style card says title case (consistency over the choice).
- **"Continue"/"Next" labels.** Apple endorses "Continue" and "Next" in multi-step flows (Writing page); CW-17 `copy_lint.py` lists them as generic CTAs (FAIL). Flow-step navigation is not a marketing CTA; add an exception for `[data-flow-step]` buttons.
- **OK and Yes/No.** Apple agrees with CW-23 (avoid OK/Yes/No), except "OK" in purely informational alerts; align the lint to that exception.
- **Cancel styling.** Apple puts Cancel on the leading side and calls for a plain/default style; coss ui uses `variant="ghost"` for Cancel. Same intent (low emphasis, leading), no conflict.
- **Switch vs checkbox.** On the web, checkboxes are the standard for forms that submit; switches for immediate-effect settings. Apple's iOS rule (switch only in a list row) matches that.
- **Segmented control vs tabs.** On the web, use segmented controls for view/filter state and tabs for panel navigation (ARIA roles differ). Apple's counts (5-7 wide, 5 phone) are guidelines, not tested limits.
- **Hiding vs dimming.** Apple dims unavailable items in menus but hides them in context menus. coss ui's `Menu` can disable items; keep that for app menus.
- **Search debounce, token delay** values are not given by Apple; the numbers marked engine note are suggestions.
- **Tab bar count.** Apple's tab-bar page gives only "five or fewer" for the user-customised default list on iPad and says "fewer is easier"; "about five" on phones is common practice.

## 6. Figures worth keeping
- Alerts page: anatomy tabs per platform (images).
- Menus page: small/medium/large iOS menu layouts (images).
- Search fields: search-as-tab, bottom toolbar, inline layouts (images).

## 7. Open questions
- No px sizes for controls other than hit targets (button heights, field heights) in current text; the engine's 32/36/44 control ladder comes from other systems.
- `outline-views`, `column-views`, `panels`, `windows`, `color-wells`, `image-views`, `web-views`, `rating-indicators`, `lockups`, `status-bars` were fetched but are macOS/tvOS-specific or low web relevance; summarised only in native notes.
- Pages with no rule content: `components` (index page).
