---
source: web:https://github.com/kargulstudio (sales-crm MIT; workflow-editor and kanban no licence), run locally 2026-10-09
chapter: Kargul Studio product UI, read from source - how the CRM, workflow editor and kanban are actually built
pages: n/a (source code + local renders at 1440x900 @2x)
topic_tags: [saas-app-ui, product-ui, dashboard, design-tokens, components, cva, radix, tailwind-v4, icons, centring, table, sidebar, overlays, canvas, kanban, motion, dark-mode, light-mode, data-viz, benchmark, founder-bar]
status: studied
companion: knowledge/web/kargul-crm-teardown.md (live CRM, measured pixels), knowledge/web/kargul-deep-study.md (studio site + gallery), knowledge/founder/founder-taste.md
---

# Kargul Studio product UI, read from source

**Evidence.** Three public repos cloned (depth 1) into `corpus/kargul-src/` (gitignored), installed with `npm ci` and run with `next dev` on ports 4401 (sales-crm), 4402 (workflow-editor), 4403 (kanban). 52 screenshots at 1440x900 @2x in `knowledge/benchmarks/kargul-src/` (`crm-*`, `wf-*`, `kb-*`), plus `measurements.json` (computed-style census of the default view of all three apps and of the engine's own Acquisity v2 build, served from `work/acquisity-dashboard/app/dist`).

**Licences (checked with `gh api repos/kargulstudio/<repo> --jq .license`).**
- `sales-crm`: MIT (c) kargulstudio. Short code excerpts below are quoted with attribution.
- `workflow-editor`, `kanban`: no licence. Described and measured only; no class strings or code copied. Values given below are measurements (sizes, colours, durations), restated in my own words.

**What the repos are.** All three are Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + `class-variance-authority` + `tailwind-merge` + zustand, from one studio starter (`kargul-starter`: same `globals.css` skeleton, same 13 GSAP-style easing tokens, same `Asset` component for image/video/Rive/Lottie, same `.builderrules`/CLAUDE.md conventions: "always pass an explicit Button variant", "Tailwind only", "icons exported from Figma instead of any icon library", "no comments"). Primitive libraries differ per app: sales-crm uses the `radix-ui` umbrella package + `cmdk`; workflow-editor uses `radix-ui` + `sonner` + hand-built SVG canvas; kanban uses `@dnd-kit/core` + `motion` and hand-rolled overlays (no Radix).

## 1. Core ideas

1. **One object type, executed completely, beats many widgets.** Each app is one object list shown at full fidelity (companies, automations/nodes, issues) with every secondary task in an overlay (sheet, dialog, popover, command palette). The CRM page is literally `Sidebar + Header + Toolbar + Table`, and seven overlays mount beside it (`components/companies/companies.tsx`). There is no "dashboard of cards" in any of the three.
2. **Every control works and every number is derived.** Filters sort and filter the store, Export writes a CSV, New Company validates and inserts a row, the command palette searches name/owner/tags, notifications open the right company, kanban cards drag between columns and persist to localStorage, the workflow runs node by node with logs. Secondary numbers are computed from the base record (`companyHealth`, `companyActivity` in `sales-crm/lib/companies.ts`), so sheets, tables and palette rows never disagree.
3. **Consistency is enforced by construction, not by review.** One `buttonVariants` cva per app holds the base (inline-flex, centre, gap, nowrap, radius, transition list, focus ring); variants change only fill, text colour and shadow; sizes change only padding/height. Type roles live in `@layer base` with `line-height` baked in. Feature code almost never sets a font size.
4. **Three apps, three visual languages, one skeleton.** CRM = flat dark, 30px pills, hairlines, micro-shadows. Workflow = tactile dark ("skeuo-lite"): gradients, 4-7 layer shadows, engraved dividers, text-shadows, glow. Kanban = light, Geist 14/500 at -0.02em everywhere, 30px controls, 16px cards with a 3px halo ring. The polish floor (centring, one height per control, one easing family, real data) is constant; the aesthetic is chosen per product.
5. **Icons are exported artwork on a fixed grid, sized to the text.** CRM and kanban icons are Untitled UI glyphs exported from Figma as 14x14 SVGs (CRM stroke 1.4, kanban 1.167), imported through SVGR as React components, `currentColor`, rendered at 14px next to 14px text and 12px inside 30px buttons. Workflow uses 18px/1.5-stroke glyphs and Material Symbols Rounded Fill for the rail (20px). Icon size roughly equals text size; icons never dominate the label.
6. **Depth is a recipe string, reused verbatim.** CRM has 4 distinct box-shadows in its whole default view; kanban 8 (five named tokens: ring, control, card, card-hover, card-lift, focus, popover); workflow 18 because tactility is its brand, but each recipe (surface, raised, field, overlay) is defined once as a constant and shared.
7. **Micro data-viz is hand-built DOM, sized to the type.** Segment meters, 14-bar sparklines, step charts with gradient strokes are spans or a single SVG, no chart library. They carry the "real product" feel more than any token.
8. **State lives in data attributes and CSS variants.** `data-[state=open]`, `data-active`, `data-run`, `aria-[current=page]`, `group-data-*`, Tailwind `starting:` and `grid-rows-[0fr]` accordions do almost all state styling; JS motion is reserved for layout (kanban) and digit rolls. The CRM ships zero JS animation.
9. **Small engineering tricks are the "premium" details**: an invisible bold copy reserves tab width; negative margins give cell links a hit area without breaking column alignment; inset box-shadows draw section dividers with no layout cost; an absolutely positioned `pointer-events-none` overlay draws the inner bezel highlight above children; sticky column headers fade the content under them with a gradient; the sidebar width is restored by an inline script before paint.
10. **Authorship.** The repos are studio templates with agent conventions (`.builderrules`, CLAUDE.md, Figma layer directives). Treat them as the studio pipeline's output, not as proof of one designer's hand.

## 2. Rules

### 2.1 Architecture and tokens

- **RULE** Build each app on one token file: Tailwind v4 `@theme inline` maps every shadcn-style role (background, foreground, card, popover, primary, secondary, muted, accent, border, input, ring, sidebar-*) to a `:root` variable, then add product roles on top (CRM adds line-strong, subtle, faint, soft, chip, icon, success, warning, danger, trend, trend-muted, track, status and 10 tag triplets; kanban adds card-border, subtle, icon, brand, info, success, warning, danger).
  **Why** Components reference roles, so a palette change never touches component code and feature code cannot invent a colour.
  **Applies to** SaaS app UI. **Check** grep feature components for hex literals; fewer than ~10 one-off hexes per app, the rest `bg-<role>`/`text-<role>`. **Source** sales-crm/app/globals.css; kanban/app/globals.css

- **RULE** Name text greys by role on a 5-step ladder (foreground, soft, muted-foreground, subtle, faint) and drive all hierarchy through those names; never pick a grey per component.
  **Why** With size fixed at 12/14px, colour level is the only hierarchy lever, so it must be a closed set.
  **Applies to** SaaS app UI. **Check** distinct text colours in a view <= 6 greys + status hues. **Source** sales-crm/app/globals.css (`--soft #a4a4a4`, `--muted-foreground #7f7f7f`, `--subtle #676767`, `--faint #454545`)

- **RULE** Put shadow recipes in tokens or module constants (`--shadow-overlay`, kanban's ring/control/card/card-hover/card-lift/focus/popover, workflow's surface/raised/field constants) and reference them by name; keep <= 8 distinct box-shadow strings in a light app and <= 4 in a flat dark app.
  **Why** Measured: CRM 4 distinct shadows across 221 text nodes and all controls; kanban 8; the engine's Kaching failure was three competing shadow recipes in one file.
  **Applies to** SaaS app UI. **Check** `measurements.json > distinctShadows` style census on the default view. **Source** sales-crm/app/globals.css `@theme static`; kanban/app/globals.css `@theme inline`; workflow-editor/components/_ui/button.tsx (measured)

- **RULE** Declare 13 named easings once (power1-4 in/out/in-out + smooth-in-out (.7,0,0,1)) as Tailwind tokens and as a typed JS object, and use only `ease-power3-out` (.25,1,.5,1) for hover/state, `power3-in` (.5,0,.75,0) for exits, `power3-in-out` (.76,0,.24,1) for transforms and `smooth-in-out` for width/height/grid-row changes.
  **Why** CSS and Motion code then share curves by name, so a sidebar collapse and a hover feel like the same product.
  **Applies to** SaaS app UI. **Check** distinct `transition-timing-function` values <= 3 per view (CRM 1, workflow 3, kanban 3-4). **Source** sales-crm/lib/easings.ts, app/globals.css

- **RULE** Give each entity kind its own theme by setting CSS custom properties on the element (`--accent`, `--accent-body`) and write the component once against `var(--accent)` with alpha steps (10% fill, 20% border, 45% selected, 70% targeted, 80% running).
  **Why** Seven node kinds stay one component with one state grammar; only two variables differ.
  **Applies to** SaaS app UI. **Check** node/card component has no per-kind branches for colour; per-kind values live in one map. **Source** workflow-editor/components/home/editor/workflow/workflow-actions.ts, workflow-node.tsx (measured)

- **RULE** Restore persisted layout (sidebar width) with a tiny inline `<head>` script that sets the CSS variable before first paint, then sync it through `useSyncExternalStore`; clamp to 200-400px, default 254, keyboard step 10px, double-click resets.
  **Why** No layout jump on load, and the resizer is a real accessible separator (role=separator, aria-valuenow).
  **Applies to** SaaS app UI. **Check** reload with a stored width: first frame already at that width. **Source** sales-crm/lib/sidebar.ts, components/_common/sidebar/sidebar-resizer.tsx

### 2.2 Type

- **RULE** Run app chrome on 14px and 12px only, with 16px for titles; measured default views: CRM 180 nodes at 14, 40 at 12, 1 at 16; kanban 92 at 14, 3 at 12, 1 at 16; workflow 42 at 14, 8 at 12.
  **Why** Two working sizes make weight and grey carry hierarchy, which reads calmer than a 7-step scale.
  **Applies to** SaaS app UI. **Check** distinct font sizes in the fold <= 4 (hero numerals excepted). **Source** measurements.json; sales-crm/app/globals.css `@layer base`

- **RULE** Pick one line-height regime per app and bake it into the role classes: CRM `leading-none` on every single-line role (213 of 221 text nodes have line-height = font-size; wrapped `p` 1.15); kanban 130% everywhere (92 of 96); workflow 24px boxes on 14px text (`leading-6`) with 20px for wrapped lines.
  **Why** One regime makes every flex-centred row land on the same optical centre; mixing 1.33/1.43/1.5 is what makes rows drift.
  **Applies to** SaaS app UI. **Check** top line-height ratio covers >= 90% of text nodes. **Source** measurements.json > lhRatio

- **RULE** Define type roles as utilities (`lead-style` 14/1, `caption-style` 12/1, `eyebrow-style` 12/1 +1px uppercase, `h1-style` 16/1/500, `h2-style` 16/1/600, `p-style` 14/1.15) and style headings by role, so feature code writes `<h2>` or `caption-style` and never `text-[13px]`.
  **Why** If components cannot set sizes, they cannot drift.
  **Applies to** SaaS app UI. **Check** grep components for `text-[` arbitrary sizes outside `_ui/`; near zero. **Source** sales-crm/app/globals.css `@layer base`

- **RULE** Choose tracking by app voice and apply it globally: CRM `normal` everywhere except brand name -0.01em and eyebrows +1px; kanban -0.02em on all 14px text (body, buttons, inputs) and -0.03em on 16px lead; never mix per component.
  **Why** Uniform tracking is invisible; per-component tracking reads as noise.
  **Applies to** SaaS app UI. **Check** dominant letter-spacing value covers >= 90% of text nodes. **Source** measurements.json > letterSpacing; kanban/app/globals.css

- **RULE** Use weight 400 for content and 500 for labels in a flat UI (CRM: 188 x 400, 33 x 500); in a light Linear-style UI set the whole app at 500 (kanban 95 of 96 nodes); use 550 for titles/labels and 600 for active segments only in a tactile dark UI (workflow).
  **Why** One dominant weight plus one emphasis weight keeps hierarchy legible; 700 never appears in app chrome.
  **Applies to** SaaS app UI. **Check** font-weight set <= 3 values, none >= 700 except brand/IF badges. **Source** measurements.json > fontWeights

- **RULE** Use a mono 12px label style (Geist Mono, -0.03em, line-height 1) for sidebar group labels in a light UI instead of uppercase tracked eyebrows.
  **Why** A different family distinguishes labels without shouting caps and without a new size.
  **Applies to** SaaS app UI. **Check** sidebar group labels use the mono family at 12px. **Source** kanban/app/globals.css `.label-style`; kanban sidebar-content.tsx

- **RULE** Set dashboard hero numerals in a display cut (Inter Display Medium 40px/48px, -0.2px, tabular) with the unit at 24px and 50% white, a muted "from X" context line at 14px beside it, and the delta as a 20px pill at 12/600 on a 20% status tint.
  **Why** Display optical size keeps big digits tight; the dimmed unit leaves the number as the single focal point.
  **Applies to** SaaS app UI. **Check** KPI value font-size 40, unit span <= 0.6x value size and lower contrast. **Source** workflow-editor/components/home/editor/overview/overview-stat-card.tsx (measured)

- **RULE** Right-align numeric columns in header and cell, set them tabular, prefix currency with a separate muted `$` span plus 4px gap, and reserve a fixed `4ch` box for percentages next to their meter.
  **Why** Digits align vertically and the meter never shifts as values change width.
  **Applies to** SaaS app UI. **Check** 49 of 59 numeric nodes in CRM fold are tabular; percentage span width 4ch. **Source** sales-crm/components/companies/table/company-row.tsx, table-columns.ts

### 2.3 Controls and shape

- **RULE** Build every button from one cva with a shared base and size the variants by padding, not height: CRM `sm` = 9px padding + 12px text at line-height 1 = 30px; `md` = 8px + 14px = 30px; `icon` = 30x30 at 0 padding; `icon-sm` = 24x24.
  **Why** Height derived from line box + equal padding centres text and icon by construction (0.00px offsets measured in the CRM teardown).
  **Applies to** SaaS app UI. **Check** 25 of the CRM's interactive controls in the fold are exactly 30px; no 28/32/34 actions. **Source** sales-crm/components/_ui/button.tsx

  Quoted base (sales-crm, MIT, (c) kargulstudio): `"inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium leading-none outline-none select-none transition-[background-color,color,box-shadow] duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50"`

- **RULE** Keep one action height per app (CRM 30, kanban 30 with 24 for icon-xs and 40 for one large CTA, workflow 32 for topbar buttons and 36 for rail/icon buttons) and make adjacent controls in a row identical in height.
  **Why** Measured kanban: 59 of 66 buttons in view are 30px; a toolbar of equal heights reads as machined.
  **Applies to** SaaS app UI. **Check** buttons in any one toolbar/header row share one height. **Source** measurements.json > buttonHeights

- **RULE** Separate shape by role: actions and chips are pills in CRM/kanban chips; fields are 8-10px rectangles (CRM input/select 36px r8; kanban input 34px r10; workflow field 36px r8, textarea r10); tags in the tactile UI are 24px at r8.
  **Why** Shape tells the user "press" versus "type" before they read.
  **Applies to** SaaS app UI. **Check** every `input`/select trigger radius is one value; every button radius is one value per variant family. **Source** sales-crm/components/_ui/input.tsx, select.tsx; kanban/components/_ui/form/input.tsx (measured)

- **RULE** Give a light UI four button variants: primary ink (#121212, r10, 1px self-colour ring, hover #2b2b2b), secondary white with the control shadow (0 1px 2px 8% black + 1px border ring) and muted text that turns foreground on hover, ghost (4% ink hover, 5% active), chip (pill, 1px ring, hover ring #d6d6d6, active ring = foreground).
  **Why** Every state is one step on one axis (fill or ring or text), so the whole board reads quiet.
  **Applies to** SaaS app UI. **Check** hover changes exactly one of background, ring colour, text colour. **Source** kanban/components/_ui/button.tsx (measured)

- **RULE** Give a dark flat UI a primary pill with a five-layer shadow (4px drop at 32% grey, 1px #0e0e0e ring, inset 4px/6px top light at 20% white, 1px inset ring 15% white, inset -8px/14px bottom shade 15% black) and a secondary with a three-layer micro-shadow (1px 40% black ring, inset 1px top 10% white, inset 1px ring 6% white); hover steps the fill one surface lighter.
  **Why** Inset light from above plus a dark ring reads as a lit physical key on dark without any visible blur.
  **Applies to** SaaS app UI (dark). **Check** primary and secondary shadow strings each appear once in the cva. **Source** sales-crm/components/_ui/button.tsx

- **RULE** In a tactile dark UI draw raised controls with a top-lit vertical gradient (from the surface colour at the bottom to ~8% lighter at the top), a 1px black border, a 3-layer soft drop (8/12/16% black at 4/2/1px) and 4% white inset highlights; the accent button adds a 10% white top-to-bottom gradient over violet #5016ff, a violet underglow (22-25% at 2-6px) and a -1px dark text-shadow on the label.
  **Why** Light from above and a coloured underglow make the primary feel lit, not flat.
  **Applies to** SaaS app UI (dark). **Check** visual + computed: accent button has a coloured drop shadow and a text-shadow. **Source** workflow-editor/components/_ui/button.tsx (measured)

- **RULE** Make a filter a split pill: 30px tall, muted 12px label segment (9px side padding), 1px white/8% divider at full height, foreground value segment (9px padding, 6px gap), 12px chevron that rotates 180deg in 200ms when `data-[state=open]`.
  **Why** Label and current value in one control removes a row of labels and shows state without opening the menu.
  **Applies to** SaaS app UI. **Check** pill height 30, divider is a child span `h-full w-px`. **Source** sales-crm/components/_common/filter-menu.tsx

- **RULE** Group related icon buttons into one segmented capsule (white, r10, control shadow, `divide-x` hairlines, children with radius 0) instead of separate floating buttons.
  **Why** One capsule reads as one tool; divide-x hairlines cost no extra spacing.
  **Applies to** SaaS app UI. **Check** grouped icon buttons share one parent with overflow hidden and divide-x. **Source** kanban/components/dashboard/header/header.tsx (measured)

- **RULE** Draw a segmented tab control as a muted track (r10) with a white pill (1px ring) that slides between items via a shared `layoutId`, spring 0.3s bounce 0, duration 0 under reduced motion; items are 30px buttons with transparent hover.
  **Why** The moving pill shows where you came from; zero bounce keeps it precise.
  **Applies to** SaaS app UI. **Check** one indicator element with layoutId; transition spring bounce 0. **Source** kanban/components/dashboard/toolbar/toolbar-tabs.tsx (measured)

- **RULE** Reserve the width of a tab's bold state with an invisible bold copy of the label in the same grid cell (`col-start-1 row-start-1`), so switching tabs never shifts neighbours; the workflow version stacks three copies (invisible semibold sizer, idle label, active label that cross-fades in 200ms).
  **Why** Weight change widens text; without a reserve the row reflows on every click.
  **Applies to** SaaS app UI. **Check** tab trigger width equal in both states. **Source** sales-crm/components/_ui/tabs.tsx; workflow-editor/components/_ui/segmented-tabs.tsx (measured)

- **RULE** Draw the active segment of a tactile tab control as pressed in (dark top-to-bottom gradient, inset shadows top and bottom, 600 weight, faint white text glow) inside a recessed #121215 track (r9, 1px padding, inset 2px/4px shadow), with idle segments raised.
  **Why** In a tactile language the selected state is the depressed key; the inversion explains state without colour.
  **Applies to** SaaS app UI (dark). **Check** visual: active segment darker than idle with inset shadow. **Source** workflow-editor/components/_ui/segmented-tabs.tsx (measured)

- **RULE** Set tags at a fixed 22px height, pill, 1px border, 14px text, padding 8px (md) or 6px (sm/"+N"), colour from a bg/border/text triplet token; cap visible tags per cell by a 20-character budget and at most 2, then show a neutral "+N".
  **Why** A character budget, not a count, keeps every cell inside its column width.
  **Applies to** SaaS app UI. **Check** tag height 22; no cell with more than 2 coloured tags. **Source** sales-crm/components/_ui/tag.tsx; lib/companies.ts `splitTags`

- **RULE** Use a 14px rounded-square status badge (r4, solid status colour, 8px white glyph, 0.5px same-colour ring, 1px 8% drop, inner 16% white glow overlay) as the column/team marker in a light UI.
  **Why** A tiny solid tile is legible at 14px and ties column, card icon and sidebar team to one status colour.
  **Applies to** SaaS app UI. **Check** badge 14x14, radius 4, glyph 8. **Source** kanban/components/_common/status-badge.tsx (measured)

### 2.4 Icons and centring

- **RULE** Export icons from one set as SVG files on the control's grid (14x14 for CRM/kanban), import them through SVGR (`icon: true`) as components with `currentColor`, and never mix in an icon package.
  **Why** One grid and one stroke weight per app is what keeps icons visually even; SVGR keeps them styleable by `text-*`.
  **Applies to** SaaS app UI. **Check** all icon viewBoxes in the app share the grid size; one stroke-width value (CRM 1.4 at 14, kanban 1.167 at 14, workflow 1.5 at 18). **Source** sales-crm/next.config.ts, public/assets/images/**; kanban public/assets/images/_common/icons (measured)

- **RULE** Size icons to the text, not to the control: 14px icon beside 14px text (nav rows, chips, cells, menu items), 12px icon inside 12px-text 30px buttons, 16px only for close (X) and checkboxes, 18-20px only in the tactile UI whose labels are 14px in 32-36px controls.
  **Why** Measured CRM fold: 35 icons at 14, 26 at 12, 17 at 16; kanban 73 of 78 at 14. An icon larger than its label's cap height pulls the eye off the word.
  **Applies to** SaaS app UI. **Check** icon size / adjacent font-size between 0.85 and 1.15 for text+icon controls (1.3 max in tactile UIs). **Source** measurements.json > iconSizes

- **RULE** Centre icon-only buttons by making them exact squares (`size-[30px] p-0`, `size-6 p-0`) with flex centring; centre text+icon by `leading-none` text inside an `items-center` flex row with a 6px gap (kanban 4px).
  **Why** Square plus zero padding removes every asymmetric source of offset; line-height 1 removes half-leading.
  **Applies to** SaaS app UI. **Check** |icon centre - button centre| <= 0.5px. **Source** sales-crm/components/_ui/button.tsx sizes `icon`, `icon-sm`

- **RULE** Put an icon in front of a label in a 36px rail cell (`grid size-9 place-items-center`) and keep that cell identical in collapsed and expanded states, so the icon never moves when the label fades in.
  **Why** The rail can animate its width while icons stay pinned; only label opacity changes.
  **Applies to** SaaS app UI. **Check** icon x position equal in collapsed and expanded screenshots. **Source** workflow-editor/components/home/editor/editor-sidebar.tsx (measured; wf-01 vs wf-07)

### 2.5 Surfaces, borders and depth

- **RULE** Draw dividers inside sheets and dialog fieldsets as `inset 0 -1px 0 var(--line-strong)` box-shadows (last one removed) rather than borders.
  **Why** An inset shadow costs no layout pixel, so section padding stays a clean 20/24.
  **Applies to** SaaS app UI. **Check** section elements have `box-shadow` inset bottom 1px and `border-width 0`. **Source** sales-crm/components/companies/detail/detail-section.tsx, new-company/form-section.tsx

- **RULE** Draw the inner bezel highlight of a dark card, panel, table or app frame as a separate absolutely positioned overlay (`inset-0`, `rounded-[inherit]`, `pointer-events-none`, inset 1px top line at 3.5-4% white + 1px inset ring at 2-4% white), placed last in the DOM.
  **Why** The highlight then sits above images, headers and rows inside the card instead of being covered by them.
  **Applies to** SaaS app UI (dark). **Check** each card has a last child overlay with only an inset box-shadow. **Source** workflow-editor overview-stat-card.tsx, actions-panel.tsx, editor-app.tsx (measured)

- **RULE** In a tactile dark UI separate bars with an engraved 4px groove (surface fill, a 1.5px line at 32% black, a 1px highlight at 6% cool grey below) instead of a 1px border.
  **Why** A groove reads as a cut in one material, which matches raised controls; a flat border would read as a different material.
  **Applies to** SaaS app UI (dark). **Check** visual + computed: divider height 2-4px, two-tone. **Source** workflow-editor/components/_ui/divider.tsx, editor-app.tsx (measured)

- **RULE** Inset the dark app surface into a darker page: page #0c0c0f, rail on the page, app panel #111114 inset 6px on top/right/bottom with r10 and a 1px 40% black ring plus 2px 30% black blur.
  **Why** The inset frame makes the app read as one object and gives the rail its own plane.
  **Applies to** SaaS app UI (dark). **Check** main panel offset 6px from viewport edges, radius 10. **Source** workflow-editor/components/home/editor/editor-app.tsx (measured; wf-01)

- **RULE** Lift light cards with a 3px soft halo ring (205 grey at 12%) plus two tiny drops (2px/4px at 3%, 1px/2px at 4%), r16, white on white; on hover add a 4px/12px 6% drop and raise the ring to 18%.
  **Why** The halo replaces a border with a softer edge that still defines the card on a white page; hover deepens without moving.
  **Applies to** SaaS app UI (light). **Check** card shadow alpha <= 0.12 for every layer; no border on cards. **Source** kanban/app/globals.css `--shadow-card`, `--shadow-card-hover` (measured)

- **RULE** Use one overlay depth per app: dark flat = `0 16px 40px` at 50% black + 1px #0e0e0e ring + 1px #393939 border; dark tactile = four stacked drops (24/48 12%, 10/18 12-16%, 5/8 16%, 2/4 16%) + 1px black ring + 4% white insets, 90% opacity fill with 12px backdrop blur; light = 1px border ring + 4/12 6% + 12/32 8%.
  **Why** One overlay token makes menu, popover, dialog and palette sit on the same plane.
  **Applies to** SaaS app UI. **Check** all overlay elements share one shadow string. **Source** sales-crm/app/globals.css `--shadow-overlay`; workflow-editor/_ui/shadcn/dropdown-menu.tsx, sonner.tsx; kanban `--shadow-popover` (measured)

- **RULE** Scrim modal overlays with 55-60% black and a 3-6px backdrop blur (light app: 40% foreground, no blur).
  **Why** Blur keeps context visible but unreadable, so focus moves to the overlay.
  **Applies to** SaaS app UI. **Check** overlay backdrop-filter blur 3-6px on dark apps. **Source** sales-crm/components/_ui/dialog.tsx, sheet.tsx; workflow-editor dialog (measured)

- **RULE** Give avatars a 1px inner outline at white/10 (outline-offset -1px) and a #f2f2f2 fallback fill; stacked avatar badges get a 2px ring in the popover colour and a 5px radius on a 16px company tile.
  **Why** The inner outline defines light photos on dark surfaces without a visible border.
  **Applies to** SaaS app UI. **Check** avatar outline 1px white/10 inset. **Source** sales-crm/components/_ui/avatar.tsx, notification-item.tsx

- **RULE** Put logos inside neutral tiles at 25% radius with the logo at 60% of the tile (24/r6 with 14px logo; 32/r8 with 16; 50/r12.5 with 32; 56/r14 with 36) and a 1px #232323 ring; large tiles add a 6px/6px 24% drop.
  **Why** A fixed tile proportion makes 18 different brand marks look like one set.
  **Applies to** SaaS app UI. **Check** tile radius / side = 0.25; logo / tile ~0.6. **Source** sales-crm command-table.tsx, profile-account.tsx, company-detail.tsx, logo-upload.tsx

- **RULE** In tactile dark tags, tint the background with the tone at 5-14%, add a faint top-lit gradient (2% to 0% white), set text in the tone at 12/550, and give the text a 4px/6px coloured glow at 30-40% of the tone plus a -1px dark text-shadow.
  **Why** The glow makes the label read as emitted light, matching the node/edge glow language.
  **Applies to** SaaS app UI (dark). **Check** tag text-shadow includes a coloured layer. **Source** workflow-editor/components/_ui/tag.tsx (measured)

### 2.6 Layout shell

- **RULE** Size sidebars 236-272px: CRM 254 (resizable 200-400), kanban 260 (collapses to 60), workflow 70 rail expanding to 236; animate width over 200-300ms on smooth-in-out and fade labels with a 100ms delay on expand.
  **Why** Labels fading after the width opens prevents text clipping mid-animation.
  **Applies to** SaaS app UI. **Check** collapse transition only on `width`; label opacity delayed on expand. **Source** sales-crm/lib/sidebar.ts; kanban sidebar.tsx, sidebar-item.tsx; workflow-editor editor-sidebar.tsx (measured)

- **RULE** Build sidebar rows at 30px with 14px text, 14px icon, 6px gap, 8px side padding, 8-10px radius; sections padded 12px (CRM) or 16px (kanban) with 4px row gap and full-width hairlines between sections.
  **Why** 30px rows at 4px gaps give a 34px pitch that holds 14 items in a 900px viewport without scrolling.
  **Applies to** SaaS app UI. **Check** nav row height 30 (active CRM row 32). **Source** sales-crm/components/_common/sidebar/sidebar-nav-item.tsx, sidebar-section.tsx; kanban sidebar-item.tsx (measured)

- **RULE** Mark the active nav row with a raised fill (dark: #2a2a2a + the 3-layer micro-shadow; light: ink at 5%) and change only text/icon colour on hover; in a rail, show the active item with a 2px x 20px white bar with a 8px glow on the outer edge that translates by `index * 46px` over 300ms.
  **Why** The fill is reserved for "you are here"; a sliding edge bar shows movement between sections.
  **Applies to** SaaS app UI. **Check** inactive hover does not change background (CRM); one indicator element translated by a CSS variable (workflow). **Source** sales-crm/components/_ui/button.tsx `nav`; workflow-editor editor-sidebar.tsx (measured)

- **RULE** Draw sub-navigation as a tree with L-shaped connectors (1px border-left + border-bottom with a 6px bottom-left radius) at 22px indent, and collapse it with a `grid-template-rows: 0fr -> 1fr` transition (200ms smooth-in-out) on an `inert` child.
  **Why** Grid-rows animates height without measuring; `inert` keeps collapsed links out of the tab order.
  **Applies to** SaaS app UI. **Check** collapsible uses grid-rows transition, not max-height. **Source** kanban/components/dashboard/sidebar/sidebar-team.tsx (measured)

- **RULE** Stack the main column as fixed bars with hairlines: CRM header 58 (14/16 padding) + tabs 45 + toolbar 62 (16 padding) + table; kanban header 63 (16 padding, 30px controls, 1px border) + toolbar 63 + board; workflow topbar 64 + 4px groove + tabs 51 + groove.
  **Why** Equal bar heights built from padding + one control height give the page a repeating vertical module.
  **Applies to** SaaS app UI. **Check** each bar height = 2 x padding + control height (+1 border). **Source** sales-crm components/companies/header/header.tsx, toolbar.tsx; kanban header.tsx, toolbar.tsx; workflow editor-topbar.tsx (measured)

- **RULE** Title the page with 14-16px text, not a hero: CRM `h1` 16/500 plus a 20px status pill; kanban breadcrumb (team > file icon > title, 14px) plus a favourite/menu capsule; workflow breadcrumb plus a status tag, with the entity name centred in the bar and editable on double-click.
  **Why** In an app the object is the hero; a 24px greeting header wastes the most valuable 100px.
  **Applies to** SaaS app UI. **Check** page title font-size <= 16px on list/board/canvas views; only overview pages use a 24px title. **Source** sales-crm header.tsx; kanban header.tsx; workflow-editor editor-topbar.tsx, editor-title.tsx (measured)

- **RULE** Use a 24px/600 title with a 14px/400 60% subline and 18px gap only on an overview/analytics page, with content capped at 1200px, 32px top and 32px side padding, 40px between header and content, 16px grid gaps.
  **Why** Overview pages read top-down like a report; list pages read as tools.
  **Applies to** SaaS app UI. **Check** overview container max-width 1200, padding 32. **Source** workflow-editor/components/home/editor/overview/overview.tsx (measured)

- **RULE** Lay kanban columns edge to edge (min 345px, flex-1, 1px right border, no gaps), 16px inner padding, 14px between cards, and a sticky column header whose background fades into transparency over its last 20px.
  **Why** Hairline columns make the board one sheet; the fading header lets cards scroll under it softly.
  **Applies to** SaaS app UI. **Check** column header background is a gradient ending 20px transparent. **Source** kanban/components/dashboard/board/board-column.tsx (measured)

### 2.7 Tables and lists

- **RULE** Lay a data table out on CSS grid + subgrid: the table is `grid grid-cols-[repeat(N,max-content)] justify-between min-w-max`, every row `col-span-full grid grid-cols-subgrid`, header and body `display: contents`; header 38px, rows 42px + 1px border, 12px cell padding.
  **Why** Columns size to content and spread to the full width, while header and cells share one grid so edges align exactly.
  **Applies to** SaaS app UI. **Check** th and first td of each column have equal x and width. **Source** sales-crm/components/companies/table/table-columns.ts, components/_ui/table.tsx

  Quoted (sales-crm, MIT, (c) kargulstudio): `TABLE_GRID_CLASS = "grid min-w-max grid-cols-[repeat(9,max-content)] justify-between"`; `TABLE_ROW_CLASS = "col-span-full grid grid-cols-subgrid"`.

- **RULE** Make the whole row the click target (opens the detail sheet), stop propagation on checkbox, owner link and action cells, and style hover at card/60 and selected/active at solid card with a matching bottom border.
  **Why** One large target is fast; stopped cells keep their own actions.
  **Applies to** SaaS app UI. **Check** row has onClick; nested controls call stopPropagation. **Source** sales-crm/components/companies/table/company-row.tsx

- **RULE** Give links inside cells a ghost hit area with negative horizontal margin equal to their padding (-6px/6px, 4px vertical), so the avatar and name still align with the column header.
  **Why** Comfortable target without breaking the column edge.
  **Applies to** SaaS app UI. **Check** `margin-left == -padding-left` on cell buttons. **Source** sales-crm/components/companies/table/company-row.tsx (owner cell)

- **RULE** Put a 16px checkbox 20px before the first column's text and a tri-state select-all in the header (checked, indeterminate, empty) computed from the visible rows only.
  **Why** Selection acts on what the user sees after filtering.
  **Applies to** SaaS app UI. **Check** header checkbox indeterminate when 0 < selected < visible. **Source** sales-crm/components/companies/table/companies-table.tsx

- **RULE** End the table with an aggregate bar of equal cells (2 columns mobile, 4 desktop) drawn with 1px gaps and `outline` in the border colour: first cell "N Companies in view", the rest ghost "+ Sum of pipeline / + Avg win probability / + Add calculation".
  **Why** Outlines on a gap grid draw shared hairlines without doubling them.
  **Applies to** SaaS app UI. **Check** footer cells use outline, parent gap 1px and padding 1px. **Source** sales-crm/components/companies/table/table-footer.tsx

- **RULE** Show an empty state inside the table grid as one full-width 120px row with a 12px caption ("No companies match the current filters."), and inside a board column as a 130px dashed r16 tile with a caption and a ghost "Add issue" button.
  **Why** Empty states keep the container geometry, so the layout does not collapse when filters exclude everything.
  **Applies to** SaaS app UI. **Check** empty row spans all columns; empty column tile height 130. **Source** sales-crm companies-table.tsx; kanban board-column.tsx (measured)

- **RULE** In a dark tactile table, separate rows with a 2px gap and a 1px top shadow line (no borders), give the header a slightly lighter fill (#16161a vs rows #101014), 44px rows, 16-20px cell padding, a 1px cell divider, hover one step lighter, and a sortable header button whose arrow flips with `-scale-y-100`.
  **Why** Gap-separated rows read as stacked slabs, consistent with the raised control language.
  **Applies to** SaaS app UI (dark). **Check** row height 44; rowgroup gap 2px. **Source** workflow-editor/components/home/editor/automations/automations-table.tsx (measured; wf-14)

- **RULE** Lay out command-palette results as a responsive mini-table that reuses the main table's components (logo tile, tags, avatar, money, meter, date) under a 36px column header that hides when there are no results; rows 44px, r8, 10px padding, 16px column gap.
  **Why** Search results look like the list they come from, so users recognise rows instantly.
  **Applies to** SaaS app UI. **Check** palette row imports the same Tag/SegmentBar/Avatar components as the table. **Source** sales-crm/components/companies/command-menu/command-table.tsx

### 2.8 Overlays, menus and feedback

- **RULE** Open overlays from their trigger (`origin-(--radix-popover-content-transform-origin)`), scale from 0.95-0.97 with fade, 200ms in on power3-out and 150ms out on power3-in; sheets slide 350ms in, 250ms out; command palette scales from 0.98.
  **Why** Exits at ~0.75x the entry duration never hold the user; origin from trigger connects cause and effect.
  **Applies to** SaaS app UI. **Check** `data-[state=closed]:duration` < open duration on every overlay. **Source** sales-crm/components/_ui/popover.tsx, dialog.tsx, sheet.tsx, command.tsx

- **RULE** Build menus with a reserved 24px (dark) or 32px (tactile) left inset for the checked indicator (6px dot in the status colour, or a 16px violet check tile) so item text aligns whether or not it is selected; items 28-32px, r6-8, highlight white/5-6%.
  **Why** A fixed indicator column prevents text jumping between checked and unchecked items.
  **Applies to** SaaS app UI. **Check** radio item `padding-left` constant; indicator absolutely positioned. **Source** sales-crm/components/_ui/dropdown-menu.tsx; workflow-editor _ui/shadcn/dropdown-menu.tsx (measured)

- **RULE** Build dialogs as header (title 16/600 + 12px description, 20/24 padding, bottom hairline) + scrolling fieldsets (20/24 padding, inset-shadow dividers, eyebrow legend, 16px gap, 8px label-to-field) + footer (16/24 padding, quiet Cancel + primary with leading 12px icon); width 560 for forms, 480 default; close button 24px ghost at top-right 16px.
  **Why** The same padding recipe per block makes a long form read as one flat surface.
  **Applies to** SaaS app UI. **Check** dialog header/fieldset/footer padding 20/24, 20/24, 16/24. **Source** sales-crm/components/_ui/dialog.tsx, new-company/new-company-dialog.tsx, form-section.tsx

- **RULE** Build detail sheets 560px (entity) or 480px (person) wide with a 56px header (14px icon + 14px title, 24px close), an identity block (50px logo tile, 16/600 name, tags), sections of 20px padding headed by eyebrows, and a 62px footer with a help link left and Cancel + primary right.
  **Why** Fixed header and footer keep actions reachable while the body scrolls; the list stays visible behind.
  **Applies to** SaaS app UI. **Check** sheet widths 560/480, header 56, footer 62. **Source** sales-crm/components/_ui/sheet.tsx, companies/detail/company-detail.tsx, profile/profile.tsx

- **RULE** Validate on submit, not on type: on an empty required field show a 12px danger line under it (`role=alert`), set `aria-invalid` (border turns danger), focus the field, and clear the error on the next keystroke.
  **Why** No red before the user has tried; immediate recovery once they type.
  **Applies to** SaaS app UI. **Check** form has `noValidate`; error clears on change. **Source** sales-crm/components/companies/new-company/new-company-dialog.tsx

- **RULE** Show focus as a 2px ring at ring/60 on buttons and checkboxes, border colour change on fields (dark flat) or a 1px accent ring + 4px 14-20% accent halo on fields (light and tactile); never the browser outline.
  **Why** Box-shadow rings follow pill radii and never shift layout.
  **Applies to** SaaS app UI. **Check** `:focus-visible` box-shadow present, `outline: none`. **Source** sales-crm/components/_ui/button.tsx, input.tsx; kanban `--shadow-focus`; workflow-editor field.tsx (measured)

- **RULE** Make the notification popover 400px: 56px header (16/600 title + count chip, ghost "Mark all as read" disabled at 0), All/Unread tabs, list inset 6px with 2px gaps, items 12px padding with a 32px avatar + 16px company badge, 14px message with the actor in 500 foreground, an optional quoted reply in a 1px bordered r8 box, 12px meta joined by a 2px dot, unread as a 6px red dot and 2% white fill.
  **Why** Unread is one dot and a whisper of fill, not bold whole rows.
  **Applies to** SaaS app UI. **Check** unread item background white/2; dot 6px top 16 right 12. **Source** sales-crm/components/companies/header/notifications/notification-item.tsx, notifications.tsx

- **RULE** Show an "all caught up" empty state as a 40px circular icon tile, 14/500 title and 12px subtle line, 48px vertical padding; a command palette empty state is a centred 12px "No results for 'query'" with 40px padding.
  **Why** Empty states are designed screens, not blank panels.
  **Applies to** SaaS app UI. **Check** empty view exists for every list and popover. **Source** sales-crm notifications.tsx, _ui/command.tsx

- **RULE** Toast as an ink pill (light: #121212, white 14/500, r12, 14/10 padding, bottom-centre, enter y12 scale .98 in 200ms, layout-animated stack) or a 356px tactile dark card with 90% fill and 12px blur; use toasts for confirmations of instant actions ("Link copied", "Dashboard renamed"), never for errors in forms.
  **Why** Instant actions need acknowledgement without a modal; form errors belong next to the field.
  **Applies to** SaaS app UI. **Check** every copy/rename/hide action triggers a toast. **Source** kanban/components/_ui/toaster.tsx; workflow-editor/_ui/shadcn/sonner.tsx (measured)

### 2.9 Data visualisation

- **RULE** Draw a segmented meter as a flex row of spans: container 14px tall, 2px padding, 2px gap, r2, white/8 track; segments 10px tall, r1, flex-1; filled = round(percent/100 x segments); colour by position in thirds of the filled count (first floor(n/3) danger, next ceil(n/3) warning, rest success); 17 segments at 74px in a table, 60 at 60px in lists, 63 full-width in sheets, 40 under a slider.
  **Why** Quantised segments read at 74px; the thirds rule keeps red-amber-green proportions identical at any value.
  **Applies to** SaaS app UI. **Check** `role=meter` with aria-valuenow; segment count by context. **Source** sales-crm/components/_common/segment-bar.tsx

  Quoted (sales-crm, MIT, (c) kargulstudio): `const red = Math.floor(filled / 3); const amber = Math.ceil(filled / 3); if (index < red) return danger; if (index < red + amber) return warning; return success;`

- **RULE** Draw sparklines as 14 bars, 4px wide, 1px gap, heights 1-14px (integer classes), r1, in a 14px box aligned to the bottom, alternating a strong and a muted tone of one hue from a fixed boolean pattern; scale the same component to 22px beside a 24px numeral.
  **Why** No axes needed for a relative trend; two tones of one hue add rhythm without a legend.
  **Applies to** SaaS app UI. **Check** bar width 4, gap 1, two background colours only. **Source** sales-crm/components/_common/sparkline.tsx, detail/activity-trend.tsx

- **RULE** Draw an analytics line as a step line (H then V segments) with a 3px stroke on a 4-stop gradient (blue #4961fc, violet #7649fc, magenta #bd49fc, cyan #12a8ff), a coloured drop-shadow glow (dy 7, 6.5 blur, 50% violet), an area fill from 16% to 0, faint seeded sparkle dots under the line, 3% white column bands behind, a dashed 10% baseline and right-aligned 12px tick labels at 30% white.
  **Why** Step lines are honest for weekly buckets; the gradient and glow make one chart the signature visual of the page.
  **Applies to** SaaS app UI. **Check** path uses only H/V commands; draw animation 900ms with `pathLength=1` dasharray. **Source** workflow-editor/components/home/editor/overview/overview-growth-chart.tsx (measured; wf-08, wf-09)

- **RULE** On chart hover snap to the bucket under the pointer: dashed 16% vertical guide, 4px ring dot (surface fill, 2px white stroke), and a r8 tooltip 12px above the point with the value at 14/550 tabular and the period at 11px 50%.
  **Why** Snapping to buckets avoids jittery tooltips between data points.
  **Applies to** SaaS app UI. **Check** tooltip value tabular; one guide line. **Source** workflow-editor overview-growth-chart.tsx (measured)

- **RULE** Replay chart and number animations by keying the group on the filter state (`key={seed-tab-range}`), so changing the range redraws the line (900ms) and fades the area (400ms) instead of morphing.
  **Why** A redraw signals new data; morphing implies continuity that does not exist.
  **Applies to** SaaS app UI. **Check** chart group re-mounts on filter change. **Source** workflow-editor overview.tsx, overview-growth-chart.tsx (measured)

- **RULE** Draw distribution bars in a light overview as 6px pill tracks in muted with a status-coloured fill, label 96px left, count 24px right tabular.
  **Why** Thin tracks and a fixed label column make several distributions comparable at a glance.
  **Applies to** SaaS app UI. **Check** track height 6, label width fixed. **Source** kanban/components/dashboard/overview/overview.tsx (measured; kb-13)

### 2.10 Canvas and board

- **RULE** Size workflow nodes at a fixed 400px width with a two-layer construction: outer shell r12, 5px padding, accent tint 10% with a 20% accent border and 16px backdrop blur; a 36px header (18px accent icon, 14/500 accent label, drag handle visible on hover); an inner body r10 in a darker accent-tinted fill with 14px/12px padding, 14/600 title and 14/500 40% description.
  **Why** A fixed width makes routing and snapping deterministic; the tinted shell plus solid body reads as a typed object.
  **Applies to** SaaS app UI. **Check** node width 400; header height 36. **Source** workflow-editor/components/home/editor/workflow/workflow-node.tsx (measured)

- **RULE** Route edges orthogonally: drop straight when the horizontal offset is < 28px, else elbow at min(40px, half the drop), round every corner with an 8px arc, stroke 2px with a gradient from the source accent to the target accent, idle at 40% (70% on hover, 100% selected or traversed), and a 16px transparent hit stroke.
  **Why** Rounded orthogonal routes read as designed wiring; colour continuity shows which node feeds which.
  **Applies to** SaaS app UI. **Check** path arcs radius <= 8; hit path stroke-width 16 transparent. **Source** workflow-editor workflow-geometry.ts, workflow-edges.tsx (measured)

- **RULE** Show open output ports as a stub line to a 12px white endpoint with a 3px white/30 halo that grows to 5px on hover and 7px when a dragged edge snaps; branch labels TRUE/FALSE are 20px pills at 12/700 in the branch accent on a 15% tint with 4px blur, nudged when two labels collide (< 64px x 24px apart).
  **Why** Visible open ports invite the next step; the growing halo confirms the snap.
  **Applies to** SaaS app UI. **Check** endpoint halo spread 3/5/7px across idle/hover/snapped. **Source** workflow-editor workflow-edges.tsx (measured; wf-01)

- **RULE** Render the canvas dot grid on a `<canvas>` with a pattern tile per level: 10.86px base spacing, dot radius 1.15 x sqrt(zoom) (min 0.75), five power-of-two levels faded by smoothstep between 6 and 10px on-screen spacing, a CSS radial-gradient placeholder until the canvas is ready; zoom 0.25-1 around the pointer.
  **Why** LOD fading keeps density constant at every zoom, and the CSS fallback avoids a blank first frame.
  **Applies to** SaaS app UI. **Check** dot density on screen roughly constant at zoom 0.25 and 1. **Source** workflow-editor workflow-grid.tsx, workflow-geometry.ts (measured)

- **RULE** Simulate a run as a timeline: 720ms per node and 420ms per edge; the active node gets an 80% accent border, a 32px 24% accent glow and a ping ring (scale to 1.035 x 1.09, fade, 1.2s), the active edge a white 4/8 dashed overlay flowing at 0.5s linear, finished nodes a 40% border and a "Done" pill; the Run button swaps its play icon for a 12px spinner with a scale+blur cross-fade.
  **Why** A visible run turns a static diagram into proof that the product works.
  **Applies to** SaaS app UI. **Check** `data-run` attribute toggles active/done; reduced motion disables ping and dash flow. **Source** workflow-editor workflow-run.ts, workflow-node.tsx, editor-topbar.tsx (measured; wf-05, wf-06)

- **RULE** Build kanban cards as white r16 tiles with the card shadow: 16px padding body (14px status icon + 14/500 title clamped to 2 lines, 14px subtle meta joined by a 3px #d9d9d9 dot) and a hairline-separated 16px footer of 30px pill chips (priority bars icon in its status colour, assignee, due date; overdue turns the chip text danger and drops its icon).
  **Why** Every chip is a real editor (menu/popover) and the same element as the static view, so the card is both summary and control.
  **Applies to** SaaS app UI. **Check** chip height 30; title line-clamp 2; overdue chip has no icon. **Source** kanban/components/dashboard/board/task-card-view.tsx, task-chips.tsx (measured; kb-01)

- **RULE** While dragging a card, tilt it -4deg with a 200ms lift (accent 1px ring at 24% + 4px at 16% + 12px/16px soft drops), leave a dashed r16 placeholder of the exact card height in the drop slot, and let siblings move with a `layout="position"` spring of 0.3s and zero bounce.
  **Why** Tilt and lift say "in your hand"; the exact-size slot previews the result.
  **Applies to** SaaS app UI. **Check** dragged card rotate -4deg; placeholder height equals card height. **Source** kanban `--shadow-card-lift`, `card-lift` keyframes, drop-slot.tsx, task-card.tsx (measured; kb-12)

- **RULE** Animate a new node or card in with CSS `@starting-style` (scale 0.96 + opacity 0, 200ms power3-out) and a floating "Edit"/"Delete" 24px button that appears 36px above the selection with a 4px rise.
  **Why** Native starting-style needs no JS and only runs on insertion.
  **Applies to** SaaS app UI. **Check** inserted element uses `starting:` variants; no JS animation library for it. **Source** workflow-editor workflow-node.tsx, workflow-edges.tsx (measured)

### 2.11 Motion and state discipline

- **RULE** Transition only named properties (`background-color, color, box-shadow` for buttons, `border-color` for fields, `color, border-color` for tabs, `transform` for chevrons) at 150ms; never `transition: all`.
  **Why** Named properties keep layout properties from animating and keep hover cheap.
  **Applies to** SaaS app UI. **Check** no computed `transition-property: all` on controls (CRM 117 of 117 transitions on one curve). **Source** sales-crm/components/_ui/*; measurements.json > easings

- **RULE** Add press feedback only where the brand is tactile: workflow primary pills scale 0.98 on `:active`, tactile buttons darken one step on active; CRM and kanban have no press transform.
  **Why** Press scale is a brand choice, not a default; flat tools feel precise without it.
  **Applies to** SaaS app UI. **Check** decide per brand and record in DIRECTION.md. **Source** workflow-editor _ui/button.tsx; sales-crm _ui/button.tsx (measured)

- **RULE** Use JS motion only for layout and continuity (card reorder, tab indicator, digit roll, drawer) and wrap the app in `MotionConfig reducedMotion="user"`; everything else is CSS on data attributes.
  **Why** The CRM ships zero JS animation and still feels finished; motion libraries are for what CSS cannot interpolate.
  **Applies to** SaaS app UI. **Check** count `motion.` usages; each one animates layout, position or a value. **Source** kanban/components/dashboard/dashboard.tsx; sales-crm (no motion import outside `sliding-number.tsx`)

- **RULE** Reveal secondary affordances on hover only (drag handle on nodes and action items, chevron on team rows, glow on stat cards fading in over 600ms, label colour 60% to 100% over 400ms) and keep them focusable via `group-focus-visible`.
  **Why** Quiet at rest, rich on intent; focus parity keeps keyboard users equal.
  **Applies to** SaaS app UI. **Check** each hover-only element also has a focus-visible variant. **Source** workflow-editor actions-panel-item.tsx, overview-stat-card.tsx; kanban sidebar-team.tsx (measured)

### 2.12 Data realism and product logic

- **RULE** Seed every demo with a coherent dataset: 18 real-brand companies with logos, 18 owners with face avatars and derived emails/phones, a current user, a fixed TODAY date, values sorted descending by default, and secondary metrics derived from the base record by fixed ratios.
  **Why** Derived numbers cannot contradict each other across table, sheet and palette.
  **Applies to** SaaS app UI. **Check** sheet totals equal the sum of the rows they describe. **Source** sales-crm/data/companies.ts, lib/companies.ts

- **RULE** Make every visible control functional in a demo or remove it: sort, filter, select-all, export CSV, create, search with keywords, mark read, open detail from a notification, drag between columns, rename inline (double-click, Enter, Escape), hide column with a toast, persist state.
  **Why** Founders click; a dead button exposes the whole thing as a picture.
  **Applies to** SaaS app UI. **Check** click every control in the fold; each changes state or opens something. **Source** sales-crm toolbar.tsx, lib/csv.ts; kanban board-column.tsx, header.tsx; workflow-editor editor-title.tsx

- **RULE** Add keyboard shortcuts that match the product (Cmd/Ctrl+K palette; `/` search, `n` new, `?` help, `[` collapse sidebar; arrow keys in tabs; Enter/F2 rename) and ignore them while typing in a field.
  **Why** Shortcuts are part of perceived quality in tools people use daily.
  **Applies to** SaaS app UI. **Check** shortcut handler returns early on input/textarea/contentEditable targets. **Source** kanban/components/dashboard/dashboard.tsx; sales-crm command-menu.tsx

- **RULE** Write microcopy as a person: "You're all caught up", "Need help? Ask us.", "Our team replies in about 5 minutes on weekdays.", "Drop an issue on a column to move it there", "PNG, JPG, WebP or SVG up to 2 MB. You can also drop a file here."
  **Why** Specific, friendly copy is part of the finish; generic copy ("No data") reads as a template.
  **Applies to** SaaS app UI. **Check** no empty state or hint reads "No data" or "Lorem". **Source** sales-crm notifications.tsx, logo-upload.tsx; workflow-editor editor-topbar.tsx; kanban hidden-columns (measured)

## 3. Numbers & scales

### 3.1 Census of the default view (`measurements.json`, 1440x900, computed styles)

| Metric | sales-crm | workflow-editor | kanban | Acquisity v2 (engine) |
|---|---|---|---|---|
| Text nodes in fold | 221 | 51 (canvas view) | 96 | 134 |
| Distinct font sizes | 3 (14/12/16) | 3 (14/12/15) | 3 (14/12/16) | 7 (14/12/11/16/24/18/20) |
| Distinct weights | 2 (400/500) | 5 (400/500/550/600/700) | 2 (500/600) | 3 (400/450/500) |
| Dominant letter-spacing share | 98% `normal` | 75% `normal` | 96% -0.02em | 44% -0.006em, 43% normal (7 values) |
| Dominant line-height ratio share | 96% at 1.00 | 47% 1.43, 35% 1.71 | 96% at 1.30 | 40% 1.43, 40% 1.33, 13% 1.5 |
| Control heights | 30 (25), 24, 28, 16 chips | 32 (12), 36 (14), 24 | 30 (59 of 66), 24 | 24, 28, 32, 36, 40 (one each tier) |
| Icon sizes | 14 (35), 12 (26), 16 (17) | 18 (17), 16, 20 | 14 (73 of 78) | 20 (25), 16 (11) |
| Icon / label size | 1.0 | 1.3 | 1.0 | 1.43 |
| Distinct radii on surfaces | 4 (pill, 8, 2, 1) | 7 | 4 (pill, 16, 10, 4) | 8 |
| Distinct box-shadows | 4 | 18 | 8 | 7 |
| Transition curves | 1 | 3 | 3-4 | 2 |
| Numeric text tabular | 49 / 59 | n/a | 6 / 6 | 34 / 34 |

### 3.2 Token sets

**sales-crm (dark only, `:root`, `color-scheme: dark`).** See the teardown table (kargul-crm-teardown.md 3.6); confirmed in source. Radius base `--radius: 0.5rem` (sm 4, md 6, lg 8, xl 12). Shadow token `--shadow-overlay: 0 16px 40px rgba(0,0,0,.5), 0 0 0 1px #0e0e0e`. Font Geist (next/font). `--sidebar-width: 254px`.

**workflow-editor (dark tactile; measured).** Page #0c0c0f; app surface #111114; panels #131317 / #141417 / #17171c (90% + blur for menus); header strip in cards #18181c; field fill white/2 (hover white/3); raised gradient #1b1b20 -> #27272e; recessed track #121215; tooltip #1f1f25; text white at 90/80/70/60/50/40/32/30% steps; accent violet #5016ff (hover #5b25ff, active #4812e6), focus violet #7f59f0 at 60% / #7445ff ring + 20% halo; node accents violet #9875ff, sky #75caff, green #75ff77, orange #ffb575, pink #ff75e3, red #ff7575, mint #75ffd3, each with a body tint (~#24-#38 range); status green #1fc16b, red #f05959. Fonts Inter + Inter Display Medium (local). Weights 500 default, 550 labels/titles, 600 active/values.

**kanban (light; measured).** Background white; foreground #121212; sidebar #fafafa; secondary #fafafa; muted #f0f0f0; border/input #ededed; card border #e7e7e9; text greys #757575 (muted-fg), #a1a1a1 (subtle), #aaaaaa (icon); info/ring #0d5fea; brand #2575ff; success #47ba39; warning #ff6e00; danger #ef1111. Fonts Geist (body), Geist Mono (labels), Inter Display (unused in fold). Body 14/130%/500/-0.02em. Shadows: ring (1px border), control (1px 2px 8% + ring), card (3px 12% halo + 2 tiny drops), card-hover, card-lift (accent 24% ring + 4px 16% halo + drops), focus (1px info + 4px 14%), popover (ring + 4/12 6% + 12/32 8%).

### 3.3 Shell geometry at 1440x900

| Part | sales-crm | workflow-editor | kanban |
|---|---|---|---|
| Sidebar | 254 (200-400 resizable), header 57 | rail 70 / 236 expanded, 17px side padding, 20px top | 260 / 60 collapsed, header 62 (100 collapsed) |
| Nav row | 30 (active 32), r8, 14/500, icon 14, gap 6 | 36 cell, r10, icon 20 | 30, r8, 14/500, icon 14, gap 6 |
| Top bar | 58 + tabs 45 + toolbar 62 | 64 + groove 4 + tabs 51 + groove | 63 + toolbar 63 |
| Content | table full-bleed, rows 43 pitch | canvas full-bleed, actions panel 320 at 16/16 | columns min 345 edge to edge |
| Overlays | dialog 480/560, sheet 560/480, palette 960, popover 400, menu 168 min | dialog 520 r16, node panel 480 r16, menu 180 min r12, toast 356 | dialog 520 r16, popover 180 min r12, toast bottom-centre |

### 3.4 Motion tokens

| Use | sales-crm | workflow-editor | kanban |
|---|---|---|---|
| Hover/state | 150ms power3-out | 150ms power3-in-out | 150ms power2-out |
| Chevron rotate | 200ms power3-out | 200ms power3-in-out | 200ms power3-in-out |
| Popover/menu in/out | 200/150 scale .97/.95 | 150/100 scale .96 | 160ms scale .96 y -2 (motion) |
| Dialog in/out | 250/200 scale .95 | 200/150 scale .97 | 200ms y 16 scale .98 (motion) |
| Sheet | 350/250 slide | 300 slide (mobile rail) | 240ms x -260 (mobile) |
| Width/collapse | n/a (drag) | 300 smooth-in-out | 200 smooth-in-out |
| Layout | none | none | spring 0.3s bounce 0 |
| Loops | none | ping 1.2s, dash 0.5s linear, spin | none |

### 3.5 Component recipes

Recipes are paraphrased to be reimplemented in the engine's own system. sales-crm values are from MIT source; workflow-editor and kanban values are measurements, described not copied.

**Button (flat, dark; sales-crm `_ui/button.tsx`).** inline-flex centre, gap 6, pill, 500, line-height 1, transitions bg/colour/shadow 150ms power3-out, focus 2px ring/60, disabled 50% + no pointer. Sizes: sm 9px padding 12px text (30h); md 8px padding 14px text (30h); icon 30 square; icon-sm 24 square. Variants: primary (#4124fb + 5-layer key shadow, hover #4b30ff), secondary (#1e1e1e + 3-layer micro shadow, hover #2a2a2a), muted (#2a2a2a, hover #333), subtle (#232323 + 1px #333 ring, footers' Cancel), ghost (subtle text, hover white/6 + foreground), nav (full width, start, r8, active raised), item (multi-line list button, gap 12, hover white/4), link (underline from font, 2px offset).

**Button (light; kanban, measured).** gap 4, 500, -0.02em, 150ms power2-out, focus shadow-focus. Sizes: xs 24 square r6; sm 28h 8px x 13px text; md 30h 8px x 14px; lg 40h 14px x; icon 30 square. Variants: primary ink r10; secondary white r10 control shadow, muted text -> foreground; ghost r8 4%/5% ink; chip pill ring; danger text with 6% tint.

**Button (tactile dark; workflow, measured).** field: r8, #1b1b20 + surface shadow, 14/500 at 80% white, -1px text-shadow, 32h with 6px left / 8px right padding and 8px gap, 18px icon at 60%; accent: same geometry on violet with top gradient and underglow; raised: gradient + black border + raised shadow, used for canvas zoom 32 squares; round: pill raised (rail "+", 36); nav: transparent border, 32% white text, active gets the raised gradient flipped horizontally; tab: r2 raised slab 14px with -0.26px tracking.

**Input / select.** CRM: 36h r8, 1px #393939, #1e1e1e, 12px padding, 14/1, placeholder subtle, focus border ring colour (no shadow), invalid border danger; select trigger identical + 12px chevron #898b8d rotating; content r8, p4, items r6 py8 pr8 pl24 with 6px status dot. Kanban (measured): 34h r10 white, ring shadow, 14/500 -0.02em, focus 1px info + 4px 14% halo. Workflow (measured): 36h r8 white/2 + surface shadow, focus violet 1px inner + 4px 20% halo; label 12/550 at 50% in a 24px row with optional right action.

**Checkbox (CRM).** 16px square r4, three stacked 16px Untitled UI glyphs (square / check-square / minus-square) toggled by `group-data-[state]`, idle #323232 -> hover #393939, checked fill #FFDB4B in the SVG.

**Switch (workflow, measured).** 36x20 pill, #26262d with inset shadow, checked violet; 16px white thumb with 1px/2px drop, slides 16px in 200ms smooth-in-out.

**Tag / badge.** CRM tag 22h pill 1px tinted border 14px text 8px (6px small) padding, triplet tokens. CRM status pill 20h: 3px top/bottom, 3px left, 5px right, 12px green dot icon, 2px gap, #2a2a2a + 1px #363636. CRM count chip 16h. Workflow tag 24h r8 12/550 tinted 5-14% + glow text (measured). Kanban status badge 14px r4 solid (measured). Workflow delta pill 20h pill 12/600 20% tint (measured).

**Avatar.** 20px in tables/pills, 32 in notifications, 50 in sheet identity; pill; #f2f2f2 fallback; 1px white/10 inner outline; 50px variant adds 6.25px/6.25px 24% drop + 1.5px #232323 ring.

**Table / row.** See 2.7. Cell `flex items-center`, 12px x padding, rows 42 + 1px #232323, header 38 at 12px subtle 400; hover card/60; selected card + border card. Cell content: name 14; tags; avatar + name ghost link; numbers right tabular; meter + 4ch %; sparkline centred; calendar 14 icon + date tabular + 1px x 8px white/15 divider + label; 24px dots ghost action.

**Card.** CRM has no page-level card; inside sheets: KPI tile r8 1px #393939 11px padding 12px gap (label 12 soft + icon 12, value 14); score card r8 #1b1d20 16px padding with the key shadow and hover #252525. Workflow stat card (measured): r16 #141417, 2px/4px 16% drop + 1px 12% ring, 20px x 19/18px padding, 20px gap, 40px glass icon badge + 16/550 label, 40px display value, mirrored texture at 4% screen blend, top glow on hover, bezel overlay. Kanban card (measured): r16 white card shadow, 16px padding body + hairline + 16px chip footer.

**Icon badge (workflow, measured).** 40px r11, 1px black border, half-transparent horizontal gradient, 3-layer soft drop, 1.1px top inset at 10% white, 3px backdrop blur; the glyph inside gets a dark drop-shadow and a 25% white glow.

**Sidebar / nav item.** See 2.6. CRM header block: #181818, 12px padding, 32px logo (rect r8 with its own drop shadow inside the SVG), brand 14/500 -0.01em over 12px subtle subtitle, 4px gap. Footer block: trial status ("14 Days / Left on trials") + muted md button with wallet icon.

**Tabs.** CRM underline tabs: 12px, 16px vertical padding, 16px gap between tabs, -1px bottom margin over the list border, active 500 + foreground 1px border, idle subtle, hover soft; width reserve. Kanban segmented with sliding pill (2.3). Workflow tactile segmented (2.3).

**Popover / menu.** CRM popover r12 1px #393939 overlay shadow, sideOffset 8, collision padding 16, align end. CRM dropdown r8 min 168, inner padding 4, 360px max with Radix ScrollArea (8px scrollbar, 2px inset, white/20 thumb), label 12 subtle 8x6 padding, separator 1px #393939 -4px margins. Kanban menu (measured): r12 p4 min 180, items are md ghost buttons with 14px icon column and trailing 6px ink dot for checked, danger items red, mono 12px group labels.

**Dialog / sheet.** See 2.8. Kanban dialog (measured): bottom sheet on mobile (rounded top 16), centred r16 max 520 on desktop, 16px header/body/footer padding with hairlines, 14px close icon, footer: danger text action left, Cancel secondary + primary right.

**Command palette (CRM).** Dialog 12dvh from top, max 960 (default 560), r12; input row 48 (14px search icon, 10px gap, 14px text, Esc kbd right); column header 36; list padding 6, max min(360px, 50dvh); items 40h (44 for company rows) r8 10px padding 12px gap, selected white/6; group heading 12/500 +1px uppercase faint; footer 40 with 20px kbd (r6 #2a2a2a 1px #393939) hints; `loop` keyboard navigation; Cmd/Ctrl+K toggles.

**Toast.** See 2.8.

**Chart.** See 2.9 (segment meter, sparkline, step chart with glow, distribution bars).

**Kanban card, drag, slot.** See 2.10.

**Node / canvas.** See 2.10. Actions panel (measured): 320 wide at 16/16 inset, r12 #131317, 4-level drop, 52px header and footer bars (14/550 title), 4px grooves, collapsible body (grid-rows 300ms), groups with 12/550 50% uppercase labels in 32px rows, items 36h r8 with 18px accent icons, hover white/3 + surface shadow, drag handle on hover. Zoom controls: 32 raised squares stacked with 10px gap at bottom-right 16px.

## 4. Dos and Don'ts

**Do (from the source)**
- One cva per app, one action height, sizes by padding (`_ui/button.tsx` in all three).
- Text roles with line-height baked in; feature code never sets font sizes (sales-crm `globals.css`).
- Icons exported on the text's grid, 14px beside 14px text (`public/assets/images/**`).
- Inset-shadow dividers and outline grids instead of borders where the pixel must not count (detail-section, table-footer).
- Real objects in every row: logo tile, tags, face avatar, meter, sparkline, date + interaction type (company-row.tsx).
- Overlays for every secondary task; the page stays one list (companies.tsx).
- Every control wired to the store; derived metrics (lib/companies.ts).

**Don't (what these builds avoid)**
- No greeting header, no "Good afternoon" hero, no 40px icon circle beside the page title on a working view.
- No icon bigger than its label; no mixing icon sets; no icon package imports.
- No third or fourth control height in a toolbar.
- No card grid of KPIs on a list page; numbers live in the rows, the footer and the sheet.
- No transition `all`, no generic fade-up parade on load, no idle loops except during a run.
- No decorative chart: either micro-viz in rows or one signature chart with real interaction.

### 4.1 What separates this from the engine's Acquisity v2 (one page)

Measured with the same census script on `work/acquisity-dashboard/app/dist` (`measurements.json > acquisity-v2`) and read from `work/acquisity-dashboard/app/src`.

1. **Structure: Acquisity kept the source dashboard's IA; Kargul builds around one object.** Acquisity v2 = greeting header + 4 KPI columns + area chart + intent meter + sources table + AI rail: the same six blocks as the reference, restyled. The CRM page is one table of 18 companies whose rows carry 6 data types each, with the detail, profile, create, search and notifications in overlays. The rejected build changed surfaces; Kargul's quality comes from choosing the one object (for Acquisity: campaigns, leads or replies) and making that list perfect.
2. **Type scale: 7 sizes vs 3.** Acquisity fold uses 11/12/14/16/18/20/24 with 7 tracking values and 3 line-height ratios (1.43/1.33/1.5 split ~40/40/13%). CRM: 14/12/16, tracking `normal` on 98% of nodes, line-height = font-size on 96%. Kanban: 14/12/16, -0.02em on 96%, 1.3 on 96%. Acquisity's AlignUI type list is borrowed from a marketing kit, not tuned to an app.
3. **Control heights: 5 tiers vs 1.** Acquisity has 24, 28, 32, 36 and 40px controls in one fold (segmented 36, Export 40, New campaign 40, Customize 40, Weekly select 36, Details 32, workspace switch 24). Kargul: 30px for every action (CRM 25 controls, kanban 59 of 66), 24 only for row icon actions.
4. **Icons: 20px Remix fills next to 14px text (ratio 1.43) vs 14px exported strokes next to 14px text (ratio 1.0).** Acquisity's sidebar rows, header and buttons are icon-led; Kargul's are word-led with a quiet glyph. This alone makes Acquisity read "kit-like".
5. **Sidebar: 272px, 36px rows, 24px side padding, initials avatar circles, credits card with a 20-segment meter vs 254px, 30px rows, 12px section padding, real logo tile, trial block with one muted button.** Kargul fits 14 nav items plus utilities and a trial block in 900px; Acquisity fits 11 rows plus a credits card and fades the list before its last item.
6. **Header: 96px greeting with a 40px ringed icon circle and an 18px/14px two-line title vs a 58px bar with a 16px title and a 20px status pill.** Acquisity spends ~200px (header + filter row) before any data; CRM shows the first data row at y=205 with tabs and four filter pills already above it.
7. **Data realism: initials (A, DW), no logos, no faces, one hue of blue; numbers only in KPI cells vs real logos, face avatars, 10 tag hues as tinted triplets, meters and sparklines in every row.** Kargul's rows look like a working tool; Acquisity's look like a report.
8. **Radii and shadows: 8 radii and 7 shadows in Acquisity vs 4 and 4 in CRM.** Acquisity mixes 6/8/10/12/16 and pill; the CRM uses pill for actions, 8 for fields and lists, 12 for overlays, 1-2 for meter segments.
9. **Interaction depth: Acquisity has one live element (the AI SDR run) and decorative controls; every Kargul control changes state** (sort, filter, export CSV, create with validation, Cmd+K search, mark read, drag, rename, hide column, persist).
10. **Signature visual: Acquisity's chart is a generic blue area + bar combo with a static tooltip; the workflow overview's step chart (gradient stroke, glow, sparkles, snapped hover) or the CRM's 17-segment meters are owned details.**

What to do next time (engine instruction): pick the product's one object, list it in a subgrid table or board at 14/12px with one 30px control height and 14px exported icons, put 4-6 real data types in each row, move KPIs into the table footer or a detail sheet, wire every control, then add one owned visual (meter, step chart, run simulation). Judge side by side with `crm-01-companies.png` or `kb-01-board.png` at equal zoom.

## 5. Exceptions & judgement calls

- **Three aesthetics are equally "Kargul".** Flat dark (CRM), tactile dark (workflow) and light Linear-like (kanban) share only the floor (one height, one type regime, icons on the text grid, real data, wired controls). Do not pick one as "the Kargul style"; pick per product and keep the floor.
- **Tactile dark breaks the founder's "<= 3 shadows" rule on purpose.** Workflow has 18 distinct shadows, but each is a named recipe (surface, raised, field, overlay, accent, tag, tab). The founder rule is about competing recipes for the same role; it still applies.
- **Founder radius ladder vs Kargul.** The founder approved a soft 8/12/16/22 ladder for hero product UI (Kestrel). Kargul apps are tighter (CRM 8/12 + pills; kanban 10/16 + pills). For in-app work the Kargul ladders are the reference; for hero mock-ups the founder ladder still governs.
- **Accessibility gaps exist in source too.** CRM `#676767` captions (3.2:1) and `#454545` eyebrows (1.9:1); workflow 30-40% white ticks and labels. Copy the structure, lift the contrast to 4.5:1 for 12-14px text.
- **The CRM `nav` row is 32px when active** with a 3px bottom margin hack (sidebar-nav-item.tsx): a deliberate 2px "pop" on the active pill. Optional.
- **Line-height 1 is safe only inside fixed-height flex controls.** Kanban's 1.3 everywhere is the safer choice when text may wrap (card titles clamp to 2 lines).
- **Node inner radius is not concentric** (outer 12, padding 5, inner 10; strict math gives 7). The one-rung step reads right at a 5px inset, matching the teardown's observation for popovers.
- [engine note] The repos are templates with agent rule files; treat class strings as the studio's output pipeline, not proof of a hand-tuned single designer.

## 6. Figures worth keeping

All in `knowledge/benchmarks/kargul-src/` (2880x1800):
- CRM: `crm-01-companies` (default), `crm-02-row-hover`, `crm-03-rows-selected`, `crm-04-tab-deals`, `crm-05-menu-sort`, `crm-06-menu-stage`, `crm-07/08/09-command*` (palette, query, empty), `crm-10/11-notifications*`, `crm-12/13-detail-sheet*`, `crm-14-profile-sheet`, `crm-15/16-new-company*` (with validation), `crm-17-select-open`, `crm-18-focus`.
- Workflow: `wf-01-workflow-canvas`, `wf-02-node-hover`, `wf-03-node-selected`, `wf-04-node-panel`, `wf-05-running`, `wf-06-run-done`, `wf-07-sidebar-expanded`, `wf-08-overview`, `wf-09-overview-chart-hover`, `wf-10-stat-hover`, `wf-11-dropdown`, `wf-12-settings`, `wf-13-export`, `wf-14-automations`, `wf-15-dashboard`, `wf-16-toast`, `wf-17-tooltip`.
- Kanban: `kb-01-board`, `kb-02-card-hover`, `kb-03-priority-menu`, `kb-04-due-popover`, `kb-05-column-menu`, `kb-06-task-dialog`, `kb-07-new-task`, `kb-08-help`, `kb-09-display`, `kb-10-filter`, `kb-11-notifications`, `kb-12-drag` (tilted lift + slot), `kb-13-overview`, `kb-14-updates`, `kb-15-inbox`, `kb-17-sidebar-collapsed`, `kb-18-search`.
- `measurements.json`: census of the three apps and Acquisity v2.

## 7. Open questions

- Not captured: workflow MCP-connect dialog and profile menu (selectors did not resolve in the scripted pass), kanban empty "Projects" view (two buttons share the name). Code was read for all three.
- The live CRM (teardown) and the repo differ slightly: the repo has a sidebar resizer and a mobile filter sheet; the live build measured earlier had neither. Values otherwise match.
- `CONVENTIONS.md` referenced by the repos' CLAUDE.md is not in the public repos; its rules (Figma layer directives such as `[[hover]]`, outline patterns for item borders) are known only from the summary line.
- Light-mode parity: none of the apps ships both themes (workflow defines `.dark` tokens but renders a hard-coded dark palette). How the studio pairs light and dark for one product is still unmeasured.
- Workflow and kanban have no licence: the engine may learn values and patterns from them but must not paste their code into client work.
