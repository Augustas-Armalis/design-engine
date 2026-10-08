---
source: web:https://alignui.com (docs v1.2, open-source starters and CLI, marketing pages, blog) + this project's measurements and checker run, 2026-10-08
chapter: How AlignUI achieves consistency, what it deliberately does not specify, and a spec-first method for the engine
pages: n/a (web)
topic_tags: [benchmark, quality-bar, design-system, spec-first, consistency, tokens, variant-matrix, naming, gap-analysis, distinctiveness, process]
status: studied
---

# AlignUI as a method: why it is consistent, what it leaves out, how we copy the rigor

Evidence for every number is in `alignui-system.md` (tokens, typography, matrices, measurements). Reusable files: `system/spec-template/` (`tokens.schema.json`, `tokens.example.json`, `component-spec.template.md`, `spec-completeness-checklist.md`). Tags: **[S]** source repo (MIT), **[D]** docs, **[M]** measured here, **[E]** engine note (our inference).

## 1. Core ideas

The founder's bar is "fully specced, consistent, beautiful". AlignUI's consistency is not taste applied page by page; it is a small set of mechanisms. In order of how much each contributes:

1. **A written, closed vocabulary comes first, code second.** Colours are 12 named families on a fixed step scale, type is 22 named styles, sizes are a short word list, radii 8 steps, shadows 17 names, durations 2, easing 1, layers 3. A designer or an agent chooses from lists; there is no place to type a free number. The founders spent about 250 days, after studying Polaris, Ant, Spectrum and Material and cataloguing real products (Component Gallery, Refero), organising findings in FigJam and Notion checklists before building [D blog]; later releases kept adding to the vocabulary (1.0 widened ramps to 11 steps with alpha stops; 2.0 added landing sections and shadow presets) [D changelog]. The vocabulary is the product.
2. **Three token layers with a one-way dependency.** Raw palette -> role tokens -> component recipes. Components may only use roles: 619 role references vs 17 raw-step references in 51 components [S, counted]. Re-theming and dark mode work because there is exactly one layer to re-point.
3. **Roles are named so the name predicts the value.** `bg-weak-50`, `text-sub-600`, `stroke-soft-200`: an intensity word plus the neutral step it takes in light mode. Intensity words (weak, soft, sub, strong) are shared by fills, text and strokes, so "soft" means the same lightness everywhere.
4. **Variants are orthogonal axes written out as a complete cross product.** Role (primary/neutral/error) x fill-style (filled/stroke/lighter/ghost) x size: the 12 role-by-style cells each have default, hover and focus declared; disabled is one shared recipe. The same style words (filled, light, lighter, stroke) recur in Badge, Alert, Banner, Button. About 350 enumerated variant cells across the 16 variant-driven components, before states [S, counted from the variant tables].
5. **State grammar is shared, not re-invented.** Hover changes fill and border along the same two channels everywhere (stroke gains a tint and loses its border; lighter gains a border and loses its tint). Focus is one halo recipe reused 24 times across 6 component files; error is one recipe reused by every field. So "hover on an input" and "hover on a tag" feel like one language.
6. **A shared ladder of sizes, heights and radii** (40/36/32/28; radius 10 then 8 then 6) makes unrelated components align when placed together. Padding, gap and icon size are tabled per size, so the optical logic (icon margin -4 px so the glyph, not the box, sits at the padding edge) is applied identically.
7. **Mechanical enforcement in code.** Typed variant props make illegal combinations a compile error; the class-merge utility is told every custom type, shadow and radius name so overrides resolve; the Root component passes its role/size to every sub-part so a Root and its Icon cannot disagree [S]. The system defends itself.
8. **Design-to-code parity is documented, not hoped for.** Each docs page has a "Coming from Figma" note mapping Figma props to code props (including honest name drift: Figma 2X-Small = code `xsmall`) and a fixed anatomy: Installation, one Example per axis value, Composition, API table with defaults [D]. The rendered default Button measures exactly the specced numbers (71 x 40, radius 10, padding 14, gap 12, 14/20/500) [M].
9. **Copy-paste distribution removes drift.** The source is owned, not an abstraction; one `utils` folder (cn, tv, polymorphic, clone-children) is the entire plumbing [D].
10. **Governance is visible.** Releases are numbered (1.0 Apr 2024, 1.1 Mar 2025, 2.0 Nov 2025); the changelog lists token additions with values (radii 0/2/28, spacing 24/32/40), palette changes (neutral 9 -> 11 tones, vibrant 5 -> 11), renames (Toggle -> Switch) and the open roadmap shows status per item [D]. A system you can diff is a system teams trust.
11. **A thin brand layer sits beside the kit, with the same grammar.** The marketing site is not the blue kit: it uses a second prefixed namespace `ln-` (own grey ramp with half-steps, an orange `#f05023`, weight 550, tighter tracking, 80/88 display, brand-tinted layered shadows) [S compiled CSS, M]. This is the key to "distinctive and rigorous": change values and a few signature moves, keep the structure.

## 2. Rules

- **RULE [ALM-01]** Write the mini design-system spec (tokens + component matrices + naming + checklist) before any page code; building starts only after the checklist items A-E pass.
  **Why** AlignUI's consistency comes from decisions made once in a spec and then looked up; projects that decide per page drift in type, spacing, radius and state treatment.
  **Applies to** all (scale the spec to scope, see ALM-14). **Check** `work/<name>/spec/tokens.json` validates against `system/spec-template/tokens.schema.json` and `COMPLETENESS.md` sections A-E are ticked with evidence before the first commit of page source. **Source** [D] [S] system structure; blog on the 250-day research phase.

- **RULE [ALM-02]** Keep three layers: primitive ramps, semantic roles (both themes), component recipes; allow components and pages to reference roles only, with raw values limited to named one-offs (< 5% of colour references).
  **Why** One re-pointing layer gives dark mode, re-branding and consistency; direct raw values create unreachable exceptions.
  **Applies to** all. **Check** grep source for raw hex, `rgb(`, numeric colour classes and font-size/line-height literals outside the tokens file: expect 0; or list each exception in the spec. **Source** [S] 619 vs 17 counted.

- **RULE [ALM-03]** Close every vocabulary the page uses before building: colour roles, type styles (>= 8 named composites), spacing steps, control heights, icon sizes, radii, shadows, durations, easings, z-layers, breakpoints, size words.
  **Why** A closed list turns "choose a number" into "choose a name", which is where consistency and review speed come from.
  **Applies to** all. **Check** computed-style audit of the rendered page: every font tuple, radius, shadow, gap, colour and duration maps to a spec token; report unmapped values (target: 0, or each justified). AlignUI's own marketing page does not hold this (23 type tuples, 14 radii at 1440): the component layer is tight, the page layer is looser; we hold both. **Source** [S] [M].

- **RULE [ALM-04]** Specify each component as orthogonal axes with a closed value list and fill every cell of the cross product (axis cells x sizes x states) with token names; state the cell count and make the matrix row count equal it.
  **Why** An unwritten cell is where inconsistency and missing hover/disabled states hide. Counting cells makes omissions visible.
  **Applies to** SaaS app UI | landing page | forms. **Check** `component-spec` files: no blank cell; `cells declared == rows present`. **Source** [S] Button 3 x 4 x 4 sizes = 48; Badge 4 x 10 x 2 = 80; Alert 4 x 5 x 3 = 60; Avatar 9 x 6 = 54.

- **RULE [ALM-05]** Define states as shared recipes wherever possible (focus, disabled, invalid, loading) and as per-cell rules only for default, hover, active; require two channels at most to change per transition.
  **Why** Shared recipes guarantee identical focus and disabled behaviour across every component; limiting channels keeps hover subtle and consistent.
  **Applies to** all interactive components. **Check** compute `:focus-visible`, `:disabled`, `[aria-invalid]` styles for 5 different components: identical recipe. **Source** [S] one disabled recipe over 12 button cells; one focus halo reused 24 times across 6 component files.

- **RULE [ALM-06]** Publish one naming document: role format, a closed size-word list used identically in design and code, the variant axis names, the CSS variable pattern, and forbidden patterns; where design and code names differ, write the mapping.
  **Why** Naming discipline is the cheapest consistency lever; AlignUI documents even its own Figma/code name drift.
  **Applies to** all. **Check** `naming` block in tokens.json filled; grep component props against `sizeWords` (no stray `tiny`, `big`). **Source** [D] "Coming from Figma" notes; [S] size words `xxsmall, xsmall, small, medium` vs Figma.

- **RULE [ALM-07]** Make the system distinctive through 7 personality knobs and 1-3 signature moves, applied to the same structure; never by dropping layers, ladders or states.
  **Why** AlignUI is neutral by design (Inter, blue, grey, 10 px radius); its marketing layer proves a second palette, weight and shadow set rides on the identical grammar. Distinct values + rigorous structure is the target.
  **Applies to** all. **Check** `meta.personality` and `meta.signature` filled; token values differ from the last 8 ledger entries' fingerprints; the structural checks (ALM-03/04) still pass. **Source** [M] marketing layer vs kit; [E].

- **RULE [ALM-08]** Add to every spec what the kit omits: a computed contrast contract for both themes, a focus ring that reaches >= 3:1, a reduced-motion branch, pressed/loading/invalid/empty states, logical (RTL-safe) spacing where the product needs it, and touch-target sizes.
  **Why** Consistency is not accessibility. Measured on AlignUI: white text on its green/orange/yellow/teal/sky 500 fills is 2.36 / 2.79 / 1.82 / 1.89 / 2.01 : 1 (blue 5.1, purple 4.79, red 3.66); placeholder `text-soft-400` on white 2.52; 1 px `stroke-soft-200` border on white 1.19; 10% alpha focus halo 1.14; no reduced-motion rule; no loading or skeleton state; 86 physical (pl/pr/ml/mr/left/right) vs 1 logical (start/end) spacing utilities.
  **Applies to** all. **Check** `semantic.contrastReport` computed and all pairs >= contract; `prefers-reduced-motion` present; states listed in D4 present. **Source** [E] computed 2026-10-08 from [S] values.

- **RULE [ALM-09]** Tune the checker to separate craft from defects: accept a declared 2 px sub-grid inside components (6/10/14), accept uppercase micro-labels at 11-12 px only with tracking >= +2% and contrast >= 4.5, and treat decorative text (rulers, numerals) as exempt via `aria-hidden`; keep the 4 px grid for layout gaps and section padding.
  **Why** `check.mjs` on alignui.com reports 6 FAIL / 16 WARN: much of it is intentional craft (half-steps, 11 px caps) and decorative ruler numerals at 1.5:1. A checker that fails the benchmark erodes trust; one that ignores real defects (contrast, axe) is worse.
  **Applies to** engine tooling. **Check** run `node tools/check.mjs https://alignui.com --name alignui-benchmark` after the change: structure/craft warnings drop, a11y findings that are real remain. **Source** [M] checker run.

- **RULE [ALM-10]** Keep a brand layer small and namespaced: <= 20 colour tokens, <= 10 type styles, <= 6 shadows per project, each named by job, on top of the shared grammar; do not add a one-off style for a section.
  **Why** AlignUI's marketing layer is about 15 greys, 1 accent, 8 type styles and a handful of shadow recipes; scale comes from the kit underneath, not from improvisation.
  **Applies to** landing page. **Check** count distinct styles in the rendered page against the spec budget. **Source** [S] `ln-` token set.

- **RULE [ALM-11]** Make each component's documentation page mirror its matrix: one example per axis value plus Disabled, With icon, Loading, Composition, an API table with defaults, and a design-to-code mapping paragraph.
  **Why** The page becomes the completeness checklist; a missing example reveals a missing cell. Design-to-code mapping prevents Figma/code drift.
  **Applies to** all. **Check** example list == axis values + required extras. **Source** [D] 49 component pages share this anatomy.

- **RULE [ALM-12]** Verify with the rendered page: measure computed styles against the spec, screenshot the matrix (light and dark, each size, each state), and read the numbers before judging by eye.
  **Why** AlignUI's docs preview matches its spec to the pixel (71 x 40, radius 10); that parity is the evidence of rigor. Numbers catch craft errors, eyes catch bad ideas.
  **Applies to** all. **Check** `tools/check.mjs` plus a (proposed) token-membership audit; screenshots indexed by matrix row. **Source** [M] docs button measured.

- **RULE [ALM-13]** Study before specifying: for each component class used, read three reference systems and record the one rule taken from each, and write the content/placeholder set (names, avatars, labelled sample data) used in states and empty views.
  **Why** AlignUI's founders benchmarked Polaris, Ant, Spectrum, Material and real products first and wrote placeholder content systematically (personas, companies, avatars); the quality of states and empties comes from that prep.
  **Applies to** all. **Check** DIRECTION.md reference triad present; sample-data file exists and is labelled sample. **Source** [D] blog posts (2023).

- **RULE [ALM-14]** Scale the spec to scope: S (one section or hero concept) = layers 0-2 + the components used; M (landing page or funnel) = S + page-level spec (section rhythm, grid, hero class, nav/footer/CTA matrices); L (product UI) = M + full component set, density, empty/error states, docs pages.
  **Why** A 49-component kit is the ceiling, not the entry ticket; rigor is the same, volume differs.
  **Applies to** all. **Check** `meta.status` and a `tier` note in DIRECTION.md; checklist sections required per tier are ticked. **Source** [E].

- **RULE [ALM-15]** Add the page-level layer kits do not have: section vertical padding tokens (compact/default/spacious on the 4 px grid), container and text measure, grid and gutters, hero class, and mobile type overrides for display styles.
  **Why** The open-source layer specifies components, not pages; its marketing page needs 23 type tuples and 14 radii because page rhythm is improvised. The vendor's own 2.0 release (Nov 2025) added exactly this layer for the paid product: 150+ landing sections in 16 categories (desktop and mobile), 80 navigation variants, six landing title styles. Page rhythm is where our work shows its quality.
  **Applies to** landing page. **Check** page spacing between sections takes values from the section tokens only; display styles have a `mobile` override. **Source** [M] page measured; [S] only 9 `sm:` utilities in all components; [D] Figma changelog 2.0.

- **RULE [ALM-16]** Version the spec and keep a changelog that records every token addition (with its value), palette change and rename; run a roadmap with status per item for anything still open.
  **Why** AlignUI's 1.0 -> 1.1 -> 2.0 changelog is how users learn that radii 0/2/28 were added or that Toggle became Switch; undocumented token drift silently breaks consistency.
  **Applies to** all. **Check** `meta.version` bumps with each spec change; `CHANGELOG` entry exists per bump. **Source** [D] figma.alignui.com/changelog; alignui.com/roadmap (11 completed, 4 in progress, 1 not planned as of the page).

## 3. Numbers & scales

### 3.1 AlignUI's size as a reference ceiling, vs a mini spec for our projects

| layer | AlignUI [S counted] | mini spec target (tier M) |
|---|---|---|
| raw colour | 177 variables: 12 families (3 neutral aliases), 11-12 steps + 3 alpha each | neutral 12 + brand 11 + 4 states x 11 = 67 hex values + 3 alpha stops (generate in OKLCH) |
| role colour | 73 (+65 dark overrides) | about 45 per theme (surface 4, text 7, border 3, accent 6, state 4 x 6, overlay 1) |
| type | 22 named styles (11 used by components) | 10-14 named styles incl. display, mono, eyebrow; mobile overrides |
| spacing | Tailwind 4 px scale + 2 px half-steps | 4 px unit, 12-16 named steps, 2 px sub-unit scoped to components |
| sizes | control 28/32/36/40; icon 20 (16/12) | control ladder of 3-4; icon ladder of 3; hit targets 24/44 |
| radius | 8 steps in use (incl. 10 and 20 custom) | 5-6 steps + concentric rule |
| shadows | 17 named | 3-5 named elevations + 1 focus recipe |
| motion | 2 durations, 1 easing | 3-4 durations, 2 easings, reduced-motion policy |
| z-index | 3 levels | 6-7 named layers |
| components | 49 documented, 51 files; ~350 enumerated variant cells | the 8-14 components the pages use, each fully filled |
| process | ~250 days, 2 designers + engineer | 1-2 hours of generation + review per brief (generated ramps, schema validation) |

### 3.2 What a filled mini spec contains (and where it lives)

| artifact | file | proof of completeness |
|---|---|---|
| tokens (layers 0-3) | `work/<name>/spec/tokens.json` (+ generated `tokens.css`) | schema validates; contrast report computed |
| component specs | `work/<name>/spec/<component>.md` | no blank cell; cell count equals rows |
| naming doc | `tokens.json#naming` | pattern lint passes |
| checklist | `work/<name>/spec/COMPLETENESS.md` | all A-E ticked with evidence |
| page spec | section in DIRECTION.md | section tokens used |

## 4. Dos and Don'ts

- **Do** pick a name for every number in the page and look it up (AlignUI: `label-sm` = 14/20/500/-0.6% everywhere). **Don't** let a component carry its own 15 px.
- **Do** write all 12 cells of a 3 x 4 variant grid before building the first button. **Don't** build primary/filled and "do the rest later": the rest never matches.
- **Do** make dark mode a second mapping of the same role names. **Don't** write `dark:` per component.
- **Do** copy the focus recipe's structure (gap in the page colour, then ring) and raise its contrast. **Don't** copy a 10% alpha halo.
- **Do** build a distinctive system by changing hue, type voice, radius preset, depth style and 1-3 signature moves. **Don't** make it distinctive by removing states or by improvising one-off values.
- **Do** keep a brand layer to a handful of tokens with their own prefix (AlignUI `ln-`). **Don't** fork the whole kit per client.

## 5. Exceptions & judgement calls

- `[engine note]` AlignUI is an excellent bar for **structure, naming, completeness and parity**; it is not a bar for **accessibility numbers, page layout or originality**. Adopt it for the first group and exceed it on the other two.
- `[engine note]` "Fully specced" for a single hero concept or one section (tier S) should not become a 49-component exercise. Specify the layers and only the components shown, but spec them completely (all axes, sizes, states).
- `[engine note]` The kit's two-channel hover grammar is a taste choice (soft UI). A brutalist, editorial or glassy brand needs a different grammar (e.g. underline-only, invert, shift) but must still be one grammar, written once, applied to every component.
- `[engine note]` Generated palettes need a human glance. The example ramp in `tokens.example.json` passes its contrast contract by construction; "passes" is not "beautiful".
- Rule conflicts: ALM-03 (closed vocab) vs the engine principle "divergence beats polish": reconcile by closing the vocabulary **per project**, differently each time. The vocabulary is closed within a project and open across projects.
- Tension: AlignUI weight 500 for UI and 550 on marketing; half-steps; 11 px caps. These are craft decisions, not bugs; ALM-09 records how to treat them in the checker.

## 6. Pipeline change (proposal for CLAUDE.md; not applied, out of write scope)

Current: brief -> DIRECTION.md -> build -> check. Proposed: brief -> DIRECTION.md (with personality knobs + signature) -> **spec** (tokens.json validated, component specs, naming doc, checklist A-E) -> build from tokens only -> check (incl. computed-style token audit and matrix coverage) -> diversity gate -> deliver.

Proposed tooling (not built here):
1. `tools/spec-validate.mjs`: validate `tokens.json` against the schema, resolve aliases, compute contrast for each contract pair in both themes, fail on any miss.
2. `tools/spec-build.mjs`: generate `tokens.css` (`@theme` + `:root` + `.dark`) and a Tailwind/merge config listing custom token names.
3. `tools/audit-tokens.mjs`: after render, list computed font tuples, radii, shadows, gaps, colours, durations on the page that do not map to a spec token.
4. `tools/check.mjs` threshold update per ALM-09 (declared 2 px sub-grid; caps micro-label exception; `aria-hidden` decorative exemption).
5. `tools/ledger.mjs`: store the spec fingerprint (knobs + signature) with each verdict so divergence compares systems, not only pixels.

## 7. Open questions

- Whether founders mean "AlignUI's component layer" (open source, fully measurable) or "AlignUI PRO/Figma blocks and sector templates" (paid, not inspected) by "the quality bar": the method here is derived from the open layer and public pages only.
- The relation between AlignUI and Kargul Studio is unverified (see `marcel-kargul-profile.md`); this note makes no claim on authorship.
- Optimal granularity of the mini spec for tier S: is a 2-hour generation budget realistic with the current tools? Needs a trial run on an eval brief (propose `evals/` brief with before/after comparison via `tools/score.mjs`).
- Whether to adopt the kit's two-channel hover grammar as an engine default or only as one of several selectable "interaction grammars" (suggest the latter, as a knob).
