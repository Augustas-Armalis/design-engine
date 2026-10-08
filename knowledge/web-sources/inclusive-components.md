---
source: web:https://inclusive-components.design/
chapter: Inclusive Components by Heydon Pickering - all 11 free case studies (toggle buttons, todo list, menus and menu buttons, tooltips and toggletips, theme switcher, tabbed interfaces, collapsible sections, content slider, notifications, data tables, cards)
pages: n/a
topic_tags: [components, aria, keyboard, focus, toggle, card, tooltip, tabs, accordion, disclosure, menu, notification, table, carousel, theme-switch, forms, progressive-enhancement]
status: studied
---

# Inclusive Components (Heydon Pickering)

Fetched 2026-10-08, raw text in `corpus/web/a11y-components/ic-*.txt` (private). The site is a free blog of 11 case studies (2017-2018); the book version has revised content and more chapters (modal dialog, pagination, others), which are not free and not read. Index page lists exactly: Cards, Data Tables, Notifications, A Content Slider, Collapsible Sections, Tabbed Interfaces, A Theme Switcher, Tooltips and Toggletips, Menus and Menu Buttons, A Todo List, Toggle Buttons. All 11 read in full. Code samples are 2017-2018 era (keyCode, IE/Edge workarounds, polyfills); the principles hold, implementation details need modernising.

Companions: `component-accessible-anatomy.md` (consolidated per-component specs), `adrian-roselli.md` (later corrections and disagreements), `webdev-learn-accessibility.md`.

## 1. Core ideas

1. Start from structured, working HTML and enhance. A collapsible section is a heading and prose; tabs are a table of contents; a menu button is a list of links. Add JavaScript and ARIA only for what the baseline cannot do, and only if users benefit.
2. Material honesty: do not style one thing so it looks like another, then fail to give it that thing's behaviour. A list of same-page links styled as tabs, or site navigation styled as an app menu, sets expectations the semantics do not meet.
3. Semantics and behaviour are one decision. Choosing `role=tab` promises arrow-key navigation; choosing `role=menu` promises the application-menu keyboard model; so use roles only when you will deliver the interaction.
4. Preserve native behaviour (button activation by Enter/Space, label click areas, form submit on Enter, scrolling by arrows when a region is focusable). Rebuilding these is where most bugs come from.
5. Equivalent, not identical, experiences: a visual move of an item into a list and a polite live-region "added" message are equivalent; the same message shown twice is noise.
6. State is carried by attributes that CSS and AT both read (`aria-pressed`, `aria-expanded`, `aria-sort`, `:checked`, `:empty`). Drive visuals off the attribute so the two cannot drift apart.
7. Label everything once, uniquely, and in visible text where possible. Redundant "read more" links, unlabeled inputs and unnamed icon buttons are the commonest failures.
8. Never move focus into a message unless the user has something to do there. FYI information belongs in a polite live region; decisions belong in a dialog.
9. Components should tolerate content: long and short titles, missing images, odd aspect ratios, translation, zoom, high contrast, touch. Robustness is inclusion.
10. Fewer tab stops is better; every added stop must justify itself. Hidden/offscreen content must not be focusable.

## 2. Rules

### 2.1 Toggle buttons

- **RULE [IC-01]** Pick the control by what the toggle means. A checkbox suits on/off data that is submitted with a form and not mistaken for a choice; a `button` with `aria-pressed` (or `role=switch` with `aria-checked`) suits an immediate-effect toggle; radio pair inside `fieldset`/`legend` suits an explicit on/off choice. Do not use links for toggles.
  **Why** Checkboxes and radios read as data inputs; buttons are the expected element for in-interface state changes.
  **Applies to** settings, filters, theme switches. **Check** `a[aria-pressed],a[role=switch],a[aria-checked]` count 0; `[aria-pressed]` and `[role=switch]` only on `button` elements. **Source** https://inclusive-components.design/toggle-button/

- **RULE [IC-02]** A toggle button is `<button type="button">` with `aria-pressed` set to an explicit `"true"` or `"false"` at all times; the absence of the attribute means "not a toggle". `type="button"` stops accidental form submission.
  **Why** ARIA state attributes are strings; a missing attribute loses the state announcement.
  **Applies to** toggles. **Check** `button[aria-pressed]` value in {`true`,`false`}; `form button:not([type])` count 0 for toggle buttons; clicking flips the value. **Source** https://inclusive-components.design/toggle-button/

- **RULE [IC-03]** Never change the label and the pressed state at the same time. Either keep a fixed label ("Notify by email") and flip `aria-pressed`, or flip the label (Play/Pause) with no pressed state.
  **Why** A pressed "Pause" or an unpressed "Play" creates a double negative, and voice users speak what they see.
  **Applies to** toggles, play/pause. **Check** Playwright: click, record `textContent` and `aria-pressed` before/after; assert not both changed. **Source** https://inclusive-components.design/toggle-button/

- **RULE [IC-04]** Show toggle state with more than colour (inset/outset shadow, icon, text "on/off", position), draw the pressed look from the attribute selector `[aria-pressed="true"]`, and give it a focus style that does not shift layout (outline or box-shadow).
  **Why** WCAG 1.4.1 Use of Color; coupling style to the attribute guarantees the visual and exposed states agree.
  **Applies to** toggles. **Check** computed style difference between `aria-pressed=true/false` in at least one non-colour property (border, shadow, text, icon, transform); focus does not change element's `getBoundingClientRect()`. **Source** https://inclusive-components.design/toggle-button/

- **RULE [IC-05]** For list-of-settings switches that display "on/off" text, give each switch a unique accessible name from the setting text (`aria-labelledby` pointing at the setting's span), put them in a list, and use `role="switch"` with `aria-checked`. Visible "on/off" spans do not form the name.
  **Why** Identical "on / off" names are meaningless in isolation and unusable for voice control; lists give grouping and counts.
  **Applies to** settings pages. **Check** all `[role=switch]` accessible names unique and not "on"/"off"; `aria-checked` explicit. **Source** https://inclusive-components.design/toggle-button/. [engine note] Switch role support was uneven in 2017; see `adrian-roselli.md` AR-14 for the later checkbox-versus-button decision.

### 2.2 Cards

- **RULE [IC-06]** Structure a card as a list item (`li` in a `ul`) containing a heading whose text is a link to the destination; make the whole card clickable by stretching the link with `a::after { content:""; position:absolute; inset:0 }` on a `position: relative` card. Do not wrap the whole card (heading, text, image) in one `<a>`.
  **Why** One link with a concise unique name; the list gives count; wrapping everything creates a verbose accessible name and block-in-inline markup problems.
  **Applies to** blog, product, feature, pricing cards. **Check** `.card :is(h1,h2,h3,h4) a` exists; `a:has(h2, h3, p)` count 0 inside cards; computed `::after` of card link is `position:absolute` with all four insets 0 and the card is `position:relative`. **Source** https://inclusive-components.design/cards/

- **RULE [IC-07]** Card link text must be unique and descriptive (use the card's title). Visible "Read more" calls to action should be decorative and linked to the real link with `aria-describedby` (the decorative element can be `aria-hidden="true"` and still serve as a description), not additional links.
  **Why** Link lists and voice commands need distinct names; extra links add tab stops.
  **Applies to** card grids. **Check** in each `ul` of cards, `a` text values are unique; no card contains two links to the same URL. **Source** https://inclusive-components.design/cards/

- **RULE [IC-08]** Keep tab stops per card to the minimum. A secondary link (author) may exist, raised above the stretched link with `position: relative` (no `z-index` needed if later in source) and given extra padding so its hit area is not tiny. Do not turn cards into miniature pages.
  **Why** Keyboard users pay for every stop; mis-clicks on overlapped targets trigger the wrong action.
  **Applies to** cards. **Check** focusable elements per `.card` <= 2; secondary link target >= 24x24 (`L7`) and sits on top via hit-test at its centre. **Source** https://inclusive-components.design/cards/

- **RULE [IC-09]** Give the whole clickable card a visible focus state with `.card:focus-within` (box-shadow or outline) that matches its hover state, and remove the fallback link underline only inside the `:focus-within` block. Keep `:hover` out of the same selector list as `:focus-within` so an unsupported selector does not drop the hover style.
  **Why** A keyboard user should see the same card-sized affordance a mouse user sees.
  **Applies to** cards. **Check** `A3`: focus the card link, assert `.card` computed outline/box-shadow changes. **Source** https://inclusive-components.design/cards/

- **RULE [IC-10]** If the card is clickable, show it: pointer cursor and a hover style. If clickability depends on JavaScript, add the cursor and hover with JavaScript so they never lie when script fails. When enhancing with a JS click proxy, ignore clicks that take longer than about 200 ms between mousedown and mouseup so text can still be selected; the pseudo-element stretch trade-off is that text becomes unselectable.
  **Why** Perceived affordance must match function; selection vs click is an accessibility trade-off.
  **Applies to** cards. **Check** `getComputedStyle(card).cursor === 'pointer'` for clickable cards (`S2`); for JS proxy variants no card has the cursor with JS disabled. **Source** https://inclusive-components.design/cards/

- **RULE [IC-11]** Make cards tolerate content: flex-column cards with `flex-grow: 1` on the text, `margin-top: auto` on the last text element to pin attribution to the bottom, a consistent margin between children, equal heights via grid, `object-fit: cover` on the image box (accepting crops, curate images so the centre is the subject), text container capped near 60ch, minimum column about 15rem.
  **Why** Interfaces that break with long or short content restrict what editors can write.
  **Applies to** cards. **Check** `S7`/`L12`: render with 1-word and 200-char titles, missing image: bottoms align, no overflow. **Source** https://inclusive-components.design/cards/

- **RULE [IC-12]** If the card image is informative and should visually precede the heading, put the text (starting with the heading) before the image in the DOM and use flex `order` to place the image on top. Decorative images keep `alt=""` and can stay first.
  **Why** Headings start sections; an informative image before the heading belongs to nobody for heading navigation.
  **Applies to** product cards. **Check** for cards with `img[alt]:not([alt=""])` the heading precedes the image in DOM order. **Source** https://inclusive-components.design/cards/

- **RULE [IC-13]** When generating `id`s for `aria-describedby`/`aria-labelledby` in loops, make them unique and stable (slug of the title), not random, so snapshots stay deterministic. Add extra vertical gap between single-column cards on narrow screens so scrolling does not trigger cards (the example uses 4.5rem).
  **Why** Duplicated ids break references; random ids break snapshot tests; larger gaps reduce accidental taps.
  **Applies to** generated lists. **Check** axe `duplicate-id-aria`; `aria-describedby`/`aria-labelledby` ids all resolve. **Source** https://inclusive-components.design/cards/

### 2.3 Tooltips and toggletips

- **RULE [IC-14]** Prefer visible text labels and clear body copy to tooltips. Use a tooltip only when space really is scarce (dense toolbars) and a toggletip only when the help cannot sit inline.
  **Why** Tooltips hide information from touch and keyboard users and from anyone who never hovers.
  **Applies to** icon toolbars, forms. **Check** count of `[role=tooltip]` per page (soft <= 3); icon-only buttons have an accessible name regardless of tooltip. **Source** https://inclusive-components.design/tooltips-toggletips/

- **RULE [IC-15]** Do not rely on the `title` attribute for information. It is not shown for keyboard or touch users and is unevenly announced.
  **Why** Reliable only on a few form elements in some screen readers.
  **Applies to** all. **Check** `button[title]:not([aria-label]):not(:has(*))`, `a[title]` where title differs from text, `abbr[title]` flagged for review; `title` that repeats the link text removed. **Source** https://inclusive-components.design/tooltips-toggletips/

- **RULE [IC-16]** A real tooltip follows hover and focus: place a `role="tooltip"` element next to the trigger, show it on `:hover` and `:focus`, hide on Esc, and connect it by role: `aria-labelledby` when it is the control's name, `aria-describedby` when it is extra detail (then provide a separate accessible name such as visually hidden text). `aria-labelledby` can list several ids to include a notification count.
  **Why** Name vs description determines what is announced first and what is optional.
  **Applies to** icon buttons. **Check** focus the trigger: tooltip visible; press Esc: hidden; pointer can move onto tooltip without it vanishing; trigger has `aria-labelledby` or `aria-describedby` pointing to an existing id. **Source** https://inclusive-components.design/tooltips-toggletips/

- **RULE [IC-17]** A toggletip (click-triggered info bubble, usually an "i") is a `<button type="button">` plus an empty live region (`role="status"`) in the DOM beforehand. On click, clear the region, then after a short delay (about 100 ms) insert the bubble text; close on Esc, blur or outside click. Do not use `aria-describedby` for the bubble content.
  **Why** If screen readers already have the description, activating the button seems to do nothing; the live region announces on demand. The delay makes repeated clicks re-announce.
  **Applies to** help bubbles. **Check** `[data-toggletip]` (or equivalent) is a `button`; sibling `[role=status]` exists with empty text at load; click inserts text and `aria-describedby` is absent. **Source** https://inclusive-components.design/tooltips-toggletips/

- **RULE [IC-18]** No interactive content (close buttons, links, confirm buttons) inside tooltips or toggletips. Use a dialog or popover with focus management for that.
  **Why** Hover/focus-triggered content disappears before it can be reached.
  **Applies to** all. **Check** `[role=tooltip] :is(a,button,input,select,textarea)` count 0 and the toggletip bubble likewise. **Source** https://inclusive-components.design/tooltips-toggletips/

- **RULE [IC-19]** Treat tooltips as unreliable on touch (focus and press happen together so the tip shows only while pressed). Offer inline text for newcomers, a toggletip, or a first-tap-explains mode instead.
  **Why** Touch has no hover.
  **Applies to** mobile UI. **Check** `S4`. **Source** https://inclusive-components.design/tooltips-toggletips/

### 2.4 Tabbed interfaces

- **RULE [IC-20]** Do not build tabs unless the use case benefits. A table of contents with same-page links, or an accordion, is simpler and more robust. Do not style a link list as tabs, and never use tab styling or tab semantics for site-wide navigation or router views.
  **Why** Users who see tabs expect arrow-key behaviour and in-page switching; a link navigates and moves focus.
  **Applies to** all. **Check** if `[role=tablist]` exists, a justification note in the spec; `nav [role=tab]` count 0. **Source** https://inclusive-components.design/tabbed-interfaces/

- **RULE [IC-21]** A real tab interface: container `role="tablist"`; each tab `role="tab"` with `aria-selected`; each panel `role="tabpanel"` with `aria-labelledby` pointing at its tab; inactive panels hidden; selected tab has `tabindex` default (0) while others have `tabindex="-1"`; Left/Right arrows move and activate tabs; Tab moves into the active panel; Shift+Tab returns to the selected tab. Optionally Down arrow focuses the panel (give the panel `tabindex="-1"` and a focus style) so screen-reader users do not skip it. If the tab list is `ul`, wrap with `role="presentation"` on `li`.
  **Why** Tabs are a composite widget; roving tabindex keeps one tab stop for the tablist.
  **Applies to** tabs. **Check** keyboard script: Tab to tablist (one stop), ArrowRight selects next and shows its panel, Tab goes into the panel, Shift+Tab returns to selected tab; `[role=tab]` count equals `[role=tabpanel]` count; exactly one `aria-selected=true`. **Source** https://inclusive-components.design/tabbed-interfaces/. [engine note] The article builds tabs from `<a>` links (progressive enhancement from a table of contents). For new JS-first work use `<button role="tab">`; the keyboard model is unchanged.

- **RULE [IC-22]** For single-page-app views use real links, then move focus to the new view's heading (`tabindex="-1"`) or labelled region and update `<title>` to `App | View`. Do not mark views as tabpanels.
  **Why** Views are page-like; a link and focus move tell users the context changed.
  **Applies to** SPAs. **Check** after click, `document.activeElement` is the new heading/region and `document.title` changed (see `WDA-19`). **Source** https://inclusive-components.design/tabbed-interfaces/

- **RULE [IC-23]** When tabs do not fit, collapse the tab list into a single column of options (selected one clearly marked) rather than converting to an accordion; if the number of tabs is unknown or large, use an accordion at all widths.
  **Why** Tab-to-accordion hybrids are complex and use different ARIA and keys.
  **Applies to** responsive tabs. **Check** at 320 px the tablist has no horizontal overflow (`L1`) and still has one stop. **Source** https://inclusive-components.design/tabbed-interfaces/

### 2.5 Collapsible sections (disclosure)

- **RULE [IC-24]** Put a real `<button>` inside the heading (`<h2><button>Title</button></h2>`), not `role=button` on the heading, and not a click handler on the heading. Reset button styles with `all: inherit` and restore a focus style.
  **Why** The button supplies focus, Enter/Space activation, and the heading remains in the outline (the screen reader announces both).
  **Applies to** accordions, FAQs, filters. **Check** `:is(h1,h2,h3,h4,h5,h6)[role=button]` count 0; `[aria-expanded]` elements are `button` or `summary`; each is inside a heading when used for sections. **Source** https://inclusive-components.design/collapsible-sections/

- **RULE [IC-25]** Set `aria-expanded` on the control (button), not on the controlled content, initially `"false"` when collapsed, and hide collapsed content with the `hidden` attribute (or equivalent `display:none`). `aria-haspopup` does not apply to disclosures.
  **Why** State belongs to the control the user is on; hidden content is not focusable.
  **Applies to** disclosures. **Check** `[aria-expanded]:not(button,summary,[role=button],[role=tab],[role=combobox])` count 0; for each button, the controlled element is `hidden` iff `aria-expanded=false`. **Source** https://inclusive-components.design/collapsible-sections/

- **RULE [IC-26]** Do not rely on `aria-controls` (supported mainly by JAWS). Place the revealed content immediately after the control in the DOM so screen reader and keyboard users meet it next; if you add `aria-controls` it is harmless but verbose.
  **Why** Source order is the universal association.
  **Applies to** disclosures, nav buttons. **Check** controlled region is `nextElementSibling` (or immediate following sibling of the heading) of the control's container. **Source** https://inclusive-components.design/collapsible-sections/ and https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-27]** Use SVG plus/minus (or chevron) icons that are `aria-hidden="true" focusable="false"`, drawn with `currentColor` (so forced-colors/high contrast change them), and driven by `[aria-expanded]` selectors. The icon or label should reflect the action the button will perform.
  **Why** State is already conveyed to AT; the icon is for sighted users and must survive high contrast.
  **Applies to** accordions. **Check** `svg` inside disclosure buttons has `aria-hidden="true"`; `fill` / `stroke` computed to `currentColor`; `A18`. **Source** https://inclusive-components.design/collapsible-sections/

- **RULE [IC-28]** Offer expand-all and collapse-all as two separate buttons inside a labelled list (`ul aria-label`), never one toggle, because sections can be in mixed states.
  **Why** A single toggle cannot describe mixed state.
  **Applies to** long FAQs. **Check** two buttons present when > 5 sections. **Source** https://inclusive-components.design/collapsible-sections/

- **RULE [IC-29]** If a URL hash targets a collapsed section, open it and focus its button on load, and update the hash when the user opens a section so links are shareable.
  **Why** Deep links must work when content is hidden.
  **Applies to** FAQ, docs. **Check** load `/page#section-id` and assert the section is expanded and `document.activeElement` is its button. **Source** https://inclusive-components.design/collapsible-sections/

- **RULE [IC-30]** Make the baseline readable without script: headings and prose are visible; script (or a web component with `open` attribute that mirrors `aria-expanded`) adds the button and hides content. Prefer not to ship interactive-looking buttons that do nothing when script fails.
  **Why** Robustness; editors write plain prose.
  **Applies to** content pages. **Check** with JS disabled content is visible and no dead buttons exist. **Source** https://inclusive-components.design/collapsible-sections/. [engine note] Modern alternative: native `<details>`/`<summary>` (with `name` for exclusive groups) fulfils this; see `adrian-roselli.md` AR-12/AR-13.

### 2.6 Menus and menu buttons

- **RULE [IC-31]** Site navigation is `nav > ul > li > a`, with nested lists for sub-navigation. Do not apply `role=menu|menubar|menuitem` or `aria-haspopup` to it.
  **Why** ARIA menus are for application commands and demand the desktop keyboard model; links in a menu lose their link role.
  **Applies to** all site nav. **Check** `nav [role=menu],nav [role=menubar],nav [role=menuitem],nav [aria-haspopup]` count 0 (`A15` item 8). **Source** https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-32]** Avoid hover/focus-reveal dropdown submenus as the only route to sub-pages; on touch, the first tap both opens and follows the link. Provide a table-of-contents `nav` on each top-level page (list of links with a heading and `aria-labelledby`), consistent in position, as the robust alternative; if everything fits on one page, link to section ids (target `tabindex="-1"`).
  **Why** Works for every input, and exposes structure instead of hiding it; helps users with cognitive load.
  **Applies to** content-heavy sites. **Check** `S4` (no content reachable only via hover); each top-level page has a sub-nav list. **Source** https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-33]** A small-screen navigation menu button lives inside the `nav` as a `button` with `aria-expanded` and the link list immediately after it (hidden when collapsed); without JavaScript the nav is simply visible. Add `[hidden]{display:none}` as safety for older browsers.
  **Why** Screen reader users jumping to the nav landmark must find the button inside it; first link next in focus order replaces unreliable `aria-controls`.
  **Applies to** header nav at narrow widths. **Check** `nav > button[aria-expanded]` and the `ul` is its next sibling; toggling flips `hidden`; button outside `nav` fails. **Source** https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-34]** An application menu button (true menu): `button[aria-haspopup][aria-expanded]` opens `role="menu"` containing `menuitem` (or `menuitemradio`/`menuitemcheckbox` with `aria-checked`), items `tabindex="-1"`. Keys: Enter, Space or Down on the button opens and focuses first enabled item (or the checked item); Down/Up move with wrap; Up on the button closes; Esc closes and returns focus to the button; choosing an item closes, returns focus to the button and may announce the result in a live region.
  **Why** This mimics native menus; arrow keys keep Tab free to leave.
  **Applies to** command menus in apps (not site nav). **Check** `A15` keyboard script for menus; `menuitem` count > 0 inside `[role=menu]` only; focus after Esc equals the trigger. **Source** https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-35]** Do not turn a `<select>` into navigation (change event that navigates).
  **Why** Unexpected change of context on input fails WCAG 3.2.2.
  **Applies to** mobile nav hacks. **Check** `select` change listeners that set `location` flagged. **Source** https://inclusive-components.design/menus-menu-buttons/

- **RULE [IC-36]** Do not sacrifice expected focus behaviour to avoid JavaScript (the checkbox hack cannot manage focus, keyboard model or announce expansion state properly). A JS-free nav menu is acceptable only because the content is plain links.
  **Why** Vanity JS-free builds that break usability are net negative.
  **Applies to** menus. **Check** `input[type=checkbox]` used as menu toggles flagged in review. **Source** https://inclusive-components.design/menus-menu-buttons/

### 2.7 Notifications

- **RULE [IC-37]** Split messages into two kinds: requests for action (dialog or inline disclosure, with focus moved to the controls) and FYI messages (polite live region, focus not moved). Never move focus to a status message.
  **Why** Focus means "something to operate here"; stealing it interrupts the user's task.
  **Applies to** toasts, flash messages, chat events. **Check** Playwright: trigger a toast, assert `document.activeElement` unchanged and a `role=status`/`aria-live=polite` region received text. **Source** https://inclusive-components.design/notifications/

- **RULE [IC-38]** Live regions must exist before you add content; use `role="status"` (with `aria-live="polite"`) for most messages, `alert` only for urgent ones; avoid `aria-atomic="true"` unless the whole region should be re-read; for streams use `aria-relevant="additions"`; silence regions in hidden tabs (set `aria-live="off"` / `role="none"` when `document.hidden`).
  **Why** Announcement behaviour depends on the region being primed; hidden tabs otherwise chatter.
  **Applies to** apps with background updates. **Check** `[role=status]` present in initial HTML; on `visibilitychange` regions toggle. **Source** https://inclusive-components.design/notifications/

- **RULE [IC-39]** Give users control over notification verbosity in a settings screen (per type, using standard checkboxes/radios, headings allowed inside `legend`), and do not announce everything that changes. Only announce what the user is engaged with.
  **Why** Aural noise cannot be averted like visual noise.
  **Applies to** chat, dashboards. **Check** settings page lists each notification type with a control. **Source** https://inclusive-components.design/notifications/

- **RULE [IC-40]** Differentiate message types with content (a text prefix such as "Error:" or "Info:") and optionally icons; never by style, colour, shape or position alone. Icons need alternative text (visually hidden text, since `aria-label` and SVG `<title>` do not auto-translate) and `currentColor` fills for high contrast.
  **Why** WCAG 1.4.1; translation tools ignore aria-label.
  **Applies to** alerts, banners, toasts. **Check** each message container contains text identifying its type; svg icons `aria-hidden` plus adjacent `.visually-hidden` text. **Source** https://inclusive-components.design/notifications/

- **RULE [IC-41]** Prefer self-dismissing (about 5-10 s) over per-message close buttons for FYI notifications, but only when the information remains discoverable elsewhere (list of online users, awards on the profile). (opinion)
  **Why** A dismiss button adds an element to find, operate and manage focus for.
  **Applies to** toasts. **Check** each toast references a persistent location or the message log. **Source** https://inclusive-components.design/notifications/. [engine note] Conflicts with WCAG 2.2.1 Timing Adjustable and Roselli's advice; see section 5 and `adrian-roselli.md` AR-07/AR-08.

### 2.8 Data tables

- **RULE [IC-42]** Only tabular data goes in `table`. Header cells are `th` (`scope="col"` or `scope="row"` for row headers), every table has a `caption` (headings may sit inside it) or an immediately preceding heading, and avoid the deprecated `summary`. Within a `figure` a `figcaption` serves.
  **Why** Screen readers read column/row headers while moving across cells; the caption is announced on table navigation.
  **Applies to** pricing/spec/feature tables. **Check** each data table: `th` count >= 1, `caption` or `figcaption` or `aria-label[ledby]`; `td`-only header rows fail; `table[summary]` count 0. **Source** https://inclusive-components.design/data-tables/

- **RULE [IC-43]** Remove table semantics from layout tables with `role="presentation"` (or `none`) and prefer CSS layout in new work. Visual tables need clear cell divisions, highlighted headers, left-aligned text; zebra striping is optional.
  **Why** A layout table read as data is confusing.
  **Applies to** legacy layout, email. **Check** `table` without `th` and without `role=presentation|none` flagged. **Source** https://inclusive-components.design/data-tables/

- **RULE [IC-44]** Make wide tables responsive by letting the wrapper scroll horizontally (`overflow-x:auto`), never by changing `display` on table parts. If the wrapper actually overflows, give it `tabindex="0"` and a name (the article uses `role="group"` and `aria-labelledby` the caption id); only add the tab stop when `scrollWidth > clientWidth`; add a visible "(scroll to see more)" hint in the caption when scrollable.
  **Why** Keyboard users cannot scroll an unfocusable region; a tab stop on a non-scrolling region does nothing.
  **Applies to** wide tables. **Check** for each `.table-container`: if `scrollWidth > clientWidth` then `tabindex="0"` and an accessible name; else no `tabindex`; computed `display` of `table`, `tr`, `td` unchanged at 320 px. **Source** https://inclusive-components.design/data-tables/. [engine note] Role/name requirement was revised in 2026; see section 5 and `adrian-roselli.md` AR-17.

- **RULE [IC-45]** For very narrow viewports it is acceptable to render an equivalent alternative structure (caption as `h2`, row header as `h3`, columns as `dl`) in a separate DOM block shown with CSS at small widths; both blocks derive from the same data.
  **Why** One-column reading beats scrolling a table at 320 px; separate DOM keeps table semantics intact.
  **Applies to** data-heavy mobile views. **Check** at 320 px exactly one of table or list structure is visible (`display:none` hides from AT too). **Source** https://inclusive-components.design/data-tables/

- **RULE [IC-46]** Sortable column headers contain a `button` ("sort by Year"), and the sorted column's `th` carries `aria-sort="ascending|descending"` (works best with explicit `role="columnheader"`); show direction with SVG arrows (`currentColor`), and expose three icon states: sortable, ascending, descending. Do not provide sorting where the data set is tiny.
  **Why** `aria-sort` reports state; the button label teaches the control.
  **Applies to** sortable tables. **Check** `th button` exists in sortable column; exactly one `th[aria-sort]` after sort; click toggles asc/desc. **Source** https://inclusive-components.design/data-tables/. [engine note] Roselli's later guidance removes `aria-sort` from unsorted headers and adds a live announcement (AR-19).

- **RULE [IC-47]** Use ARIA `grid` only when cells must be reached by arrow keys by non-screen-reader users (a date picker), not for ordinary data tables.
  **Why** Grid is an interactive composite widget; tables are static with interactive children allowed.
  **Applies to** tables, calendars. **Check** `[role=grid]` count > 0 requires arrow-key script in the component spec. **Source** https://inclusive-components.design/data-tables/

### 2.9 Content slider (carousel)

- **RULE [IC-48]** A slider should never move without a user action: no auto-advance, no timers. Movement is by scrolling, swipe, arrow keys or buttons only.
  **Why** A pause button returns control only after the harm of unexpected motion; WCAG 2.2.2 merely requires the pause mechanism.
  **Applies to** carousels. **Check** open page, wait 15 s, assert `scrollLeft` unchanged and no `setInterval`-driven transform (Playwright `page.clock`). **Source** https://inclusive-components.design/a-content-slider/. [engine note] Stricter than the existing `A11`/`A12` rules.

- **RULE [IC-49]** Build the base with native horizontal scroll (`overflow-x: scroll` on a list of slides); make it keyboard-operable with `tabindex="0"`, give it `role="region"` plus `aria-label` (so the name is supported), a visible focus style, and instructions revealed for hover, focus and touch (referenced via `aria-describedby` for the focus message). Detect touch by the first `touchstart` event, not by device capability.
  **Why** A scrollable region is focusable only if you make it so; multi-input devices exist.
  **Applies to** carousels, galleries. **Check** scroller has `tabindex=0`, a role and name, `:focus` outline; ArrowRight scrolls it. **Source** https://inclusive-components.design/a-content-slider/. [engine note] 2026 guidance says role/name may be optional; AR-17.

- **RULE [IC-50]** Use a list for slides and `figure`/`figcaption` for media; lazy-load later slides (IntersectionObserver with an empty placeholder `src`, `<noscript>` fallback) because the first slide gets almost all the attention (the cited study: 1% clicked a feature, of which 89% were the first position); keep the scroller height predictable so loading does not shift layout.
  **Why** Performance and honest ranking of content.
  **Applies to** carousels. **Check** `I4`, `P2`; first slide `img` eager, others lazy. **Source** https://inclusive-components.design/a-content-slider/

- **RULE [IC-51]** Previous/next buttons are optional enhancements that build on scrolling: real buttons in a `ul[aria-label]` group, each with its own accessible name, large touch targets, `scroll-snap` where supported; only render them if the enhancement works.
  **Why** They aid affordance and snapping, but must not replace native scroll.
  **Applies to** carousels. **Check** `button` names "previous"/"next" present; target >= 44 px on coarse pointer (`L7b`); scroll position after click aligns to a slide. **Source** https://inclusive-components.design/a-content-slider/

- **RULE [IC-52]** When slides are links, take off-screen slide links out of tab order with `tabindex="-1"` (not `aria-hidden`), restoring them when visible, so keyboard users reach the controls quickly and never focus invisible items.
  **Why** Invisible focusable content is a failure; `aria-hidden` on focusable content breaks the fourth ARIA rule.
  **Applies to** linked carousels. **Check** off-screen links `tabindex=-1`; `[aria-hidden] a` count 0. **Source** https://inclusive-components.design/a-content-slider/

### 2.10 Theme switcher

- **RULE [IC-53]** An in-page theme toggle is a button with `aria-pressed` and a visible "on/off" text that is `aria-hidden` (so it does not contradict the state), persisted in `localStorage`, placed in a landmark that is not `main` (header or footer) in the same place on every page. Only render it if the technique is supported.
  **Why** Users should find it again; unsupported features should not be offered.
  **Applies to** sites with a manual theme switch. **Check** `button[aria-pressed]` inside `header,footer,nav`; same DOM position across routes; value persists after reload. **Source** https://inclusive-components.design/a-theme-switcher/. [engine note] Pair with system preference: `prefers-color-scheme` first, manual override stored second (existing 2.8 rule).

- **RULE [IC-54]** The article's `filter: invert(100%)` dark theme (root inverted, images/videos re-inverted, `background-color: inherit` fallback) is an economical hack but not a design-quality dark mode; treat it as legacy. Prefer token-based themes (`color-scheme`, custom properties, `light-dark()`).
  **Why** Inversion shifts hues and shadows; tokens give contrast control.
  **Applies to** theming. **Check** `S6`; `filter: invert` on `html` flagged. **Source** https://inclusive-components.design/a-theme-switcher/. [engine note]

- **RULE [IC-55]** Support Windows high contrast / forced colours: no background images for content, inline SVG icons with `currentColor`, test with the forced-colors media query.
  **Why** Backgrounds are stripped; content images must be `<img>` with `alt`.
  **Applies to** all. **Check** `A18`; informative images are `img` not `background-image`. **Source** https://inclusive-components.design/a-theme-switcher/

- **RULE [IC-56]** Only ship nice-to-have features when the performance and complexity cost is small, and feature-detect before showing the control.
  **Why** If it cannot be done efficiently, a net negative.
  **Applies to** optional UI. **Check** control hidden when `CSS.supports` fails. **Source** https://inclusive-components.design/a-theme-switcher/

### 2.11 Todo list (create / check / delete content)

- **RULE [IC-57]** Give each major component a heading whose level reflects belonging (depth in the outline), put it in a `section` labelled by that heading (`aria-labelledby`), use a `ul` for items, and design an empty state (text plus pointer to the input) that appears with CSS (`ul:empty + .empty-state`).
  **Why** Headings and lists provide navigation and counts; empty states teach new users.
  **Applies to** app widgets, dashboards. **Check** heading before list inside the section; empty fixture renders the empty state; axe `region`. **Source** https://inclusive-components.design/a-todo-list/

- **RULE [IC-58]** Every input has a real label. A visually hidden label (or `aria-label`) is acceptable only when something else visible names the input (an adjacent "Add" button); placeholders do not count and must have higher contrast than browser default and a distinguishing style. Keep inputs in a `<form>` so Enter submits.
  **Why** Placeholders vanish and are unreliable; a form element gives submit-on-Enter.
  **Applies to** forms. **Check** `A10`; `::placeholder` contrast >= 4.5:1 (`A2`). **Source** https://inclusive-components.design/a-todo-list/

- **RULE [IC-59]** Confirm user actions that update the page with a visually hidden polite live region message when the visible change is already clear (for example "{name} added."), instead of moving focus or duplicating a visible banner.
  **Why** Equivalent experience for screen reader users without noise for others.
  **Applies to** add/remove/save flows. **Check** `[role=status]` text updates after the action and visible UI also changed. **Source** https://inclusive-components.design/a-todo-list/

- **RULE [IC-60]** Icon-only delete/remove buttons get an accessible name that includes the item (`aria-label="delete Learn Haskell"`); the icon is SVG via `<use>` and `aria-hidden`.
  **Why** Identical "delete" names are not distinguishable.
  **Applies to** lists, tables. **Check** repeated action buttons in a list have unique accessible names. **Source** https://inclusive-components.design/a-todo-list/. [engine note] Roselli prefers visible/hidden text or `aria-labelledby` over `aria-label` for translation (AR-27).

- **RULE [IC-61]** After deleting the focused item, move focus deliberately: to the first remaining item's control, or if the list is empty to the component heading (`tabindex="-1"`), and announce the outcome in a polite status region so it follows the focus announcement (an assertive alert would override it).
  **Why** Browsers drop focus to the document, forcing keyboard users to re-tab from the top.
  **Applies to** delete, dismiss, remove flows. **Check** Playwright: delete item, assert `document.activeElement !== document.body`. **Source** https://inclusive-components.design/a-todo-list/. [engine note] Roselli advises the previous analogous control instead of the first (AR-24).

- **RULE [IC-62]** Provide a confirmation dialog when deletion is critical; casual deletions may be recoverable by trial and error.
  **Why** Cost of error decides friction.
  **Applies to** destructive actions. **Check** destructive buttons trigger `dialog` or provide undo; `visual`. **Source** https://inclusive-components.design/a-todo-list/

## 3. Numbers & scales

| Item | Value | Component |
|---|---|---|
| Click vs selection threshold | 200 ms mousedown to mouseup | card JS proxy |
| Card minimum column | 15rem; text max about 60ch | cards |
| Card gap on narrow screens | 4.5rem (example), padding 0.5rem on secondary links | cards |
| Live region re-announce delay | 100 ms | toggletip |
| Notification auto-dismiss | 5000-10000 ms (default 10 s) | notifier |
| Carousel click stats | 1% clicked a feature; 89% of those the first slide | slider |
| Slide height example | 50vh; button targets large | slider |
| Slider script size | about 1.7 KB minified (vs 41.9 KB for a popular plugin) | slider |
| Theme CSS | 153 bytes uncompressed for the invert approach | theme |
| Table scroll hint | shown only if scrollWidth > clientWidth | tables |
| Breakpoint for list alternative | 400 px (example) | tables |
| Toggle states | aria-pressed explicit string | toggle |
| Menu button keys | Enter, Space, Down open; Down/Up cycle; Up closes (on button); Esc closes and refocuses | menu button |

## 4. Dos and Don'ts

- Don't: `<h2 role="button" tabindex="0">`. Do: `<h2><button aria-expanded="false">`.
- Don't: card wrapped entirely in `<a>`. Do: link on the heading with a stretched `::after`.
- Don't: multiple "read more" links. Do: unique heading links.
- Don't: `title` for essential help. Do: visible label or toggletip.
- Don't: `aria-describedby` on a toggletip button. Do: live-region injection on click.
- Don't: tabs for site navigation. Do: links and a table of contents.
- Don't: `role=menu` on nav lists. Do: `nav > ul` with `aria-expanded` disclosure buttons.
- Don't: move focus to a toast. Do: polite live region.
- Don't: `display:flex` on a table to make it responsive. Do: scroll wrapper.
- Don't: auto-playing carousel. Do: user-scrolled slider.
- Don't: pressed state and label change together. Do: one or the other.
- Don't: delete a focused item and leave focus on `body`. Do: refocus intentionally.
- Don't: placeholder as label. Do: label (hidden only when a visible button names the task).
- Don't: hide off-screen slide links with `aria-hidden`. Do: `tabindex="-1"` until visible.

## 5. Exceptions & judgement calls

Disagreements with existing notes or with later authors (flagged, not resolved):

1. **Disabled submit button (todo list).** The article disables the submit button and sets `aria-invalid` on the empty input to block invalid entries. Roselli's 2024 guidance (AR-09) says never disable submit buttons or form fields in forms. Engine decision: follow Roselli for forms; Heydon's version is acceptable only for trivial single-field adders and should be replaced by a validation message.
2. **Focus ring.** The toggle article removes the outline and uses `box-shadow` for the focus ring (rounded corners). In forced-colors mode shadows disappear. Existing rule: keep `outline` (transparent outline survives). Use `outline` with `outline-offset` and rounded corners (supported in modern browsers) instead of shadow-only rings.
3. **Auto-dismiss notifications** (IC-41) vs WCAG 2.2.1 Timing Adjustable and Roselli's static-message recommendation (AR-08). If a toast auto-dismisses it needs a place where messages remain (message history) or a duration the user can extend.
4. **`aria-label` for icon buttons.** The articles use `aria-label` widely (carousel buttons, delete buttons); the author later notes it does not auto-translate. Roselli's priority is visible text, then hidden text, then `aria-label` (AR-27). Existing implementation-craft rule allows `aria-label` or hidden text. Keep both, prefer hidden text for i18n-heavy sites.
5. **Tabs from links.** The progressive-enhancement tabs use `<a role="tab">`. Current APG and most libraries use `<button role="tab">`. Treat the keyboard model as normative, the element as flexible.
6. **Scroll container role and name** (IC-44, IC-49): Heydon uses `role="group"`/`region` + `aria-labelledby`; Roselli used `role="region"` + `aria-labelledby` + `tabindex=0` for years and in October 2026 reported that WCAG's working group considers `tabindex=0` alone acceptable (a generic role is not a 4.1.2 failure). Do not require the role or name as HARD; require `tabindex="0"` when scrollable and a visible focus indicator; add name+role as SOFT.
7. **Dark mode by inversion** (IC-54) conflicts with token-based theming in existing 2.8.
8. **Carousel stance.** Heydon's no-auto-motion rule is stricter than existing A11/A12 (pause control for > 5 s). Recommended: marketing carousels may auto-advance only if paused by default under reduced motion and a pause control exists; the engine's default carousel is user-driven. [engine note]
9. **Menu button first-item focus.** Heydon focuses the first enabled item (or the checked one); current APG patterns agree. Roselli warns that most "menu buttons" on marketing sites are really disclosure widgets and should not use `role=menu` at all (AR-10, AR-32).
10. **Corroborates existing:** nav lists not menus (implementation-craft 2.7), `aria-expanded` on disclosure buttons, live regions for status, `prefers-reduced-motion`, skip to content, label-for pattern.
11. **Old-era details.** IE/Edge workarounds, `keyCode`, `-ms-high-contrast`, Modernizr-like feature tests, ES5 compiling and string `ref`s in the samples are obsolete. `:focus-within` is universally supported now.

## 6. Figures worth keeping

Not captured. Worth building as fixtures: the card layout with stretched link (cards), the toggletip with live region, the keyboard-friendly table wrapper, the toggle in list context (settings) and the tabs/ToC progressive enhancement.

## 7. Open questions

- Book-only chapters (Modal Dialog, Pagination, Sortable list, others) are not on the free site; modal dialog behaviour is covered instead via Roselli's posts (AR-21..AR-23) and the existing 2.7 dialog rule.
- No free page for "Inclusive Design Patterns" chapters cited inside articles (icons, lists).
- `p.NN: no rule content`: index page only lists titles.
