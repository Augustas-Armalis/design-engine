<!--
TEMPLATE. The gate to pass BEFORE any page is built (and re-checked before delivery).
Items marked [M] can be checked mechanically (script, grep or tools/check.mjs); [V] need an eye; [P] = proposed check not yet in tools/check.mjs.
Numeric limits in brackets are EXAMPLE defaults taken from the benchmark (knowledge/benchmarks/alignui-method.md); change them per project and record the change in meta.overrides.
Copy this file to work/<project>/spec/COMPLETENESS.md and tick it. A box without evidence (a number, a path, a screenshot) is not ticked.
-->

# Spec completeness checklist

project: ______  spec version: ______  date: ______  signed off by: ______

## A. Brief and personality (layer 0)

- [ ] A1 [V] The brief is one line each for product, audience, the one action, and the proof (`meta.brief`). Proof is real or labelled sample.
- [ ] A2 [M] `meta.personality` has all 7 knobs set (brand hue, neutral temperature, type voice, radius preset, depth style, density, motion personality).
- [ ] A3 [V] `meta.signature` names 1-3 owned moves that a stranger would recognise (the difference from a neutral kit).
- [ ] A4 [M] Divergence row filled against the last 8 ledger entries (`node tools/ledger.mjs similar` passes).
- [ ] A5 [M] Every deliberate rule break is written as `override: <rule-id> because <reason>`.

## B. Primitives (layer 1): ramps exist and are complete

- [ ] B1 [M] Neutral ramp has all 12 steps (0, 50-950), brand ramp all 11 (50-950), each of danger / warning / success / info all 11. [schema validates]
- [ ] B2 [M] Alpha stops declared (e.g. 8 / 16 / 32 percent); no other opacity appears in component CSS. [P grep `rgba(` and `/ \d+%`]
- [ ] B3 [M] Spacing: one base unit (4 px) and a named scale of >= 8 steps; the sub-unit (2 px) is declared and limited to component internals.
- [ ] B4 [M] One control height ladder (3-4 values) and one icon ladder; hit targets stated (24 min, 44 touch).
- [ ] B5 [M] Radius ramp >= 4 steps and a written concentric rule (inner = outer - gap).
- [ ] B6 [M] Type scale is a closed list of >= 8 named composites (size + line-height + weight + tracking); mobile overrides for display styles; line-heights on the 4 px grid. [P computed tuples on page are all in the list]
- [ ] B7 [M] <= 3 font families, each with a stated job; fallback metrics set (`size-adjust`) to prevent layout shift.
- [ ] B8 [M] Shadows: >= 3 named elevations as layered lists; each has a job.
- [ ] B9 [M] Motion: >= 3 durations, >= 2 easings, reduced-motion policy chosen. [limit: <= 6 durations, <= 3 easings]
- [ ] B10 [M] z-index scale with >= 4 named layers (no `z-index: 9999`).
- [ ] B11 [M] Breakpoints and container widths (content, text measure 45-75 ch) declared.

## C. Semantic roles (layer 2)

- [ ] C1 [M] Role groups present for both themes: surface (canvas, sunken, raised, inverse), text (strong, body, muted, subtle, disabled, inverse, link), border (hairline, control, strong), accent (solid, solidHover, solidActive, onSolid, tint, text), state x 4 families (solid, solidHover, onSolid, tint, text, border), overlay.
- [ ] C2 [M] Role names identical in light and dark; dark changes assignments only; zero per-component dark overrides. [P grep `dark:` in components = 0]
- [ ] C3 [M] Contrast contract set (example: strong 12, body 7, muted 4.5, subtle 4.5, onSolid 4.5, control border 3, focus ring 3) and `contrastReport` is computed, not typed, for both themes. All pairs pass.
- [ ] C4 [M] State families all share the same tone names; the four statuses are not distinguished by colour alone (icon or text accompanies).
- [ ] C5 [M] Focus recipe defined once (width, offset, colour role) and reaches >= 3:1 against the surface it sits on (not a 10 percent alpha halo).
- [ ] C6 [V] Brand ramp tested against the neutral: accent solid with `onSolid` text >= 4.5, accent text on tint >= 4.5.
- [ ] C7 [M] Naming: every role key matches the declared pattern; no numeric colour names outside primitives; no component-specific colour tokens.

## D. Components (layer 3)

For each component in the spec scope (minimum: Button, Input, Select, Checkbox, Radio, Switch, Badge, Tag, Tooltip, Menu/Dropdown, Dialog, Tabs, Table, Alert; add what the pages use):

- [ ] D1 [M] A `component-spec` file exists with all sections filled (no blank cell; `n/a: reason` allowed).
- [ ] D2 [M] Axes are a closed list with defaults; cross-product cell count stated and equals the matrix row count.
- [ ] D3 [M] Size ladder row for every size; heights come from the shared ladder; radius follows the radius-by-size rule.
- [ ] D4 [M] States listed: default, hover, focus-visible, active, disabled, loading (if async), invalid (if form), selected (if toggle), empty/error (if data). Each has a definition or shared recipe.
- [ ] D5 [M] Disabled is one shared recipe; invalid and focus are shared recipes (not redefined per cell).
- [ ] D6 [M] Controls that sit side by side (button + input + select) have equal heights at each size. [P computed heights in one row]
- [ ] D7 [V] Light and dark screenshot for each size and each state in the matrix.
- [ ] D8 [M] Parent props (`size`, `tone`) flow to every part (icon, affix, dismiss); changing Root size changes parts.
- [ ] D9 [M] Keyboard model, accessible name rule and target size stated; focus order verified.
- [ ] D10 [M] The docs/example page has one example per axis value plus Disabled, With icon, Loading, Composition, API table, and a "design to code" mapping paragraph.

## E. Naming, structure and enforcement

- [ ] E1 [M] One naming doc: role format, size words (closed list, same words in design and code), variant axes, CSS variable pattern, forbidden patterns.
- [ ] E2 [M] Size words are identical in Figma/design file and code; if they differ, the mapping is written down (e.g. design "2X-Small" = code `xs`).
- [ ] E3 [M] Tokens exist as CSS variables in the project (`tokens.css` generated from `tokens.json`), not only in prose. Components import tokens, never literals. [P grep raw hex/px outside tokens.css]
- [ ] E4 [M] The class-merge / lint config knows the custom token names (e.g. tailwind-merge groups for type, shadow, radius) so overrides resolve.
- [ ] E5 [M] Typed props make an illegal variant combination a compile error (union types, not strings).
- [ ] E6 [M] Version and changelog started (`meta.version`; one line per change).

## F. Page-level spec (marketing/funnel pages, since a kit does not specify this)

- [ ] F1 [M] Section rhythm: vertical padding for section sizes (compact / default / spacious) as tokens on the 4 px grid; one dominant element per viewport.
- [ ] F2 [M] Grid and container: columns, gutters, max widths; text measure 45-75 ch.
- [ ] F3 [M] Hero class chosen (product proof | brand campaign | editorial | interactive) and heading size follows the composition; the h1 tuple is in the type scale.
- [ ] F4 [M] Nav, footer, CTA grammar written as components with the same matrix rigor (states at 390 and 1440).
- [ ] F5 [M] Mobile is its own composition: type overrides for display styles, touch targets >= 44, no horizontal overflow at 390. [`tools/check.mjs`]
- [ ] F6 [V] Imagery, illustration and icon rules (stroke weight, size ladder, treatment) stated.
- [ ] F7 [V] Copy rules: voice, banned phrases (`tools/thresholds.json`), label patterns.

## G. Verification (run after build; evidence required)

- [ ] G1 [M] `node tools/check.mjs <page> --name <project>`: 0 FAIL; each WARN fixed or justified in DIRECTION.md.
- [ ] G2 [M] Computed-style audit: every (font-size, line-height, weight, tracking) tuple is in the type scale; every radius, shadow, gap and colour on the page maps to a token. [P]
- [ ] G3 [M] Matrix coverage report: every spec row has a rendered instance (screenshot index).
- [ ] G4 [M] Contrast re-measured on the rendered page for text, controls and focus ring in light and dark.
- [ ] G5 [V] Eyes pass: focal point, rhythm, "could another company reuse this skeleton by swapping the logo?"
- [ ] G6 [M] `node tools/ledger.mjs similar reports/<project>` passes.

## Sign-off

A spec with any unticked B, C, D or E item must not enter build. F and G items are checked per page. Record exceptions as overrides in `meta.overrides` and in DIRECTION.md.
