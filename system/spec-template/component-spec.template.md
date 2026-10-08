<!--
TEMPLATE. Copy to work/<project>/spec/<component>.md, one file per component, and fill every cell.
All numbers and token names below are EXAMPLES (from the fictional "Fieldnote" system in tokens.example.json), not recommendations. Replace per project.
Rule of the template: an empty cell is a defect. If a cell is genuinely not applicable, write `n/a: <reason>`; never leave it blank.
Method and reasons: knowledge/benchmarks/alignui-method.md. Checklist: spec-completeness-checklist.md.
-->

# Component spec: {Component} (example: Button)

status: draft | reviewed | built | verified
tokens file: `tokens.json` (every value below is a token name, not a raw number, unless marked `literal`)

## 0. Purpose and anatomy

| field | value |
|---|---|
| job | one sentence: what the user does with it (example: triggers an action in place) |
| use when / do not use when | (example: use for actions; for navigation use Link) |
| element | semantic HTML element (example: `<button>`; `<a>` only via `render`/polymorphic) |
| parts | Root, Icon (leading/trailing), Label, Spinner (loading) |
| composition | which parts accept which parent props (parent `size` and `tone` must flow to every part) |
| density | does the compact density mode change heights? (example: no, handled by size) |

## 1. Axes (the closed vocabulary)

Every axis is orthogonal. List every value, the default, and the Figma/design name if it differs.

| axis | values (closed list) | default | design name (if different) |
|---|---|---|---|
| tone | accent, neutral, danger | accent | |
| emphasis | solid, outline, soft, ghost | solid | |
| size | sm, md, lg | md | |
| (runtime) invalid / loading / disabled | boolean each | false | not variants; states |

Cross product to specify: tone x emphasis = 3 x 4 = **12 cells**; each cell x size = **36 sized cells**. Cell count must be stated and matched by section 4.

## 2. Size ladder (one row per size; every column required)

| size | height | padding-x | gap | icon box | icon glyph offset | radius | text style | min target |
|---|---|---|---|---|---|---|---|---|
| sm | `size.control.sm` (32) | 12 | 6 | `size.icon.sm` (16) | -2 | `radius.sm` | `label-sm` | 24 min / 44 touch |
| md | `size.control.md` (40) | 16 | 8 | `size.icon.md` (20) | -2 | `radius.md` | `label-md` | |
| lg | `size.control.lg` (48) | 20 | 8 | `size.icon.md` (20) | -2 | `radius.md` | `label-md` | |

Required checks: heights equal the shared control ladder; radius follows the radius-by-size rule; icon-side padding minus glyph offset equals text-side optical padding (1 px tolerance).

## 3. States (required list; every state has a visual definition for every tone x emphasis cell or an explicit shared recipe)

| state | trigger | which channels change | shared recipe? |
|---|---|---|---|
| default | none | base fill, text, border | per cell (section 4) |
| hover | pointer over | fill step (one step darker) or tint/border swap | per cell |
| focus-visible | keyboard focus | focus ring (width, offset, colour role, contrast >= contract) | **shared**: `semantic.focus` |
| active / pressed | pointer down | fill one more step or scale .98 | shared |
| disabled | `disabled` or `aria-disabled` | fill `surface.sunken`, text `text.disabled`, no border, no pointer events | **shared** (identical across all cells) |
| loading | `loading` | spinner replaces icon, label stays, width locked, `aria-busy` | shared |
| invalid | `aria-invalid` (form controls) | border `state.danger.border`, ring `state.danger.solid` | shared |
| selected / checked (if toggleable) | `aria-pressed` / `aria-checked` | accent fill | per cell |
| read-only / empty / error (data controls) | content state | placeholder, error message slot | shared |

State rules: at most two channels change per transition (fill and border); transitions use `motion.duration.fast` with `motion.easing.standard`; every transition is removed or cross-faded under `prefers-reduced-motion`.

## 4. The matrix (one row per tone x emphasis cell; columns = states; all cells filled with TOKEN NAMES)

| tone | emphasis | default (fill / text / border) | hover | focus-visible (extra) | active | disabled |
|---|---|---|---|---|---|---|
| accent | solid | `accent.solid` / `accent.onSolid` / none | `accent.solidHover` | ring (shared) | `accent.solidActive` | shared |
| accent | outline | `surface.raised` / `accent.text` / `accent.solid` | `accent.tint` fill | ring (shared) | `accent.tint` + border `accent.solidHover` | shared |
| accent | soft | `accent.tint` / `accent.text` / none | `accent.tint` darker step via alpha | ring (shared) | | shared |
| accent | ghost | transparent / `accent.text` / none | `accent.tint` | ring (shared) | | shared |
| neutral | solid | `surface.inverse` / `text.inverse` / none | | ring (shared) | | shared |
| neutral | outline | `surface.raised` / `text.body` / `border.control` | `surface.sunken` | ring (shared) | | shared |
| neutral | soft | `surface.sunken` / `text.body` / none | | ring (shared) | | shared |
| neutral | ghost | transparent / `text.muted` / none | `surface.sunken`, text `text.strong` | ring (shared) | | shared |
| danger | solid | `state.danger.solid` / `state.danger.onSolid` / none | `state.danger.solidHover` | ring (shared) | | shared |
| danger | outline | | | ring (shared) | | shared |
| danger | soft | | | ring (shared) | | shared |
| danger | ghost | | | ring (shared) | | shared |

(The example fills only some cells to show the format. In a real spec all 12 rows x all columns are filled before build.)

Required rows for ANY component: base axes row set from section 1; one row per state in section 3; one row per size in section 2; one **dark theme** confirmation line (`all tokens used are semantic, so dark inherits; contrast verified in tokens.json contrastReport`).

## 5. Layout, content and responsive

| field | value |
|---|---|
| min / max width | (example: min = padding + label min; max none; truncate with ellipsis at 100% of parent) |
| icon-only variant | square, width = height, `aria-label` required, tooltip recommended |
| label rules | sentence case, verb first, <= 3 words; no ALL CAPS unless eyebrow style |
| full-width behaviour | `width: 100%` below `breakpoint.sm` for primary page action |
| mobile | height >= `size.hitTarget.touch` on touch layouts (use lg or add hit-area padding) |
| RTL / long text | wraps? truncates? (example: never wraps; truncates) |

## 6. Accessibility contract

- accessible name source: visible label or `aria-label` (icon-only).
- keyboard: Enter and Space activate; Tab order; no focus trap.
- focus ring: from `semantic.focus`; contrast >= `contract.focusRing` in both themes.
- contrast: label on fill >= `contract.onSolid`; disabled is exempt but must remain distinguishable and is never the only signal.
- target size: >= `size.hitTarget.min` desktop, >= `size.hitTarget.touch` touch.
- announcements: loading uses `aria-busy` and a polite live region for the result.

## 7. Motion

| transition | properties | duration | easing | reduced-motion behaviour |
|---|---|---|---|---|
| hover/focus | background-color, border-color, color | fast | standard | instant (duration 0) |
| press | transform scale(.98) | instant | standard | none |
| loading spinner | rotate | 800ms linear | linear | replace with static "..." text |

## 8. Documentation page (mirror of the matrix; one example per axis value)

Required sections, in order: Installation / usage, Examples (one subsection for each value of tone, emphasis, size; Disabled; With icon; Icon-only; Loading; Full width; Composition with `render`), API table (parts, props, types, defaults), Design-to-code mapping ("In design this is X, in code it is Y"), Accessibility notes.

## 9. Sign-off checklist for this component

- [ ] every cell of section 4 filled with token names; no raw values
- [ ] section 2 numbers come from the shared ladders (no component-private heights)
- [ ] all states in section 3 rendered and screenshotted in light and dark at sizes sm, md, lg
- [ ] contrast pairs verified (numbers recorded)
- [ ] keyboard walkthrough done
- [ ] docs examples match the matrix 1:1
- [ ] changelog line written
