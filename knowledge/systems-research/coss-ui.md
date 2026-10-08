---
source: web:https://coss.com/ui/llms.txt ; https://coss.com/ui/docs/get-started.md ; https://coss.com/ui/docs/styling.md ; https://coss.com/ui/r/*.json ; https://github.com/cosscom/coss (README licensing)
chapter: coss ui (Base UI + Tailwind v4, incl. Origin UI) system profile and API conventions
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, coss-ui, base-ui, tokens, density, borders, depth, api-conventions, founder-stack]
status: studied
---

# coss ui (founder's preferred component library)

Machine profile: `system/systems-research/coss-ui.json`. Raw fetches: `corpus/web/systems/coss-ui/` (llms.txt, docs .md, registry JSON for style, colors-neutral, button, input, dialog, menu, card, badge, select, tooltip).

Licence: MIT for `apps/ui` and `apps/origin` (Origin UI now lives in the coss monorepo); the rest of github.com/cosscom/coss is AGPL-3.0.

## 1. Core ideas

1. **Base UI, not Radix.** Built on Base UI primitives from scratch, "not as an adaptation or port from Radix UI". Copy-paste owned like shadcn; installed via `npx shadcn@latest add @coss/<name>`; `init @coss/style` sets up everything.
2. **Three layers:** primitives (56 components + 2 hooks), particles (pre-assembled patterns), atoms (Cal.com API-connected particles).
3. **Tuned for dense production UI** (Cal.com). "Thoughtful defaults optimized for modern, dense UIs."
4. **shadcn variable names, recipe values.** Same names (background, primary, muted, border, input, ring, card, popover, sidebar-*) plus `destructive-foreground`, `info`, `success`, `warning` (+ `-foreground`), `code`, `code-highlight`, `chart-1..5`. Values are recipes: `--alpha(var(--color-black) / 8%)`, `color-mix(in srgb, neutral-500 90%, black)`.
5. **Alpha borders + lips = depth.** Vendor: "opaque borders instead of solid ones to ensure crisp, contrasted borders even when backgrounds lack sufficient contrast. These opaque borders mix with bottom shadows." Outline controls get a 1px `black/4%` bottom lip in light mode and a `white/6%` top lip in dark mode; solid buttons get an inset 1px `white/16%` top highlight and a primary-tinted `shadow-xs`; on press the highlight flips to `black/8%` and the outer shadow drops.
6. **Near-black primary.** Light primary is neutral-800 on neutral-50; dark inverts. Brand colour is yours to add.
7. **Status fill vs status text.** `--success` = emerald-500 (fills, dots); `--success-foreground` = emerald-700 light / emerald-400 dark (text). Same for info (blue), warning (amber), destructive (red).
8. **Pointer-aware density.** Every control has a mobile size and a >=640px size one step smaller (button 36 -> 32px). On coarse pointers an invisible `::after` with `min-h-11 min-w-11` (44px) enlarges the hit area without enlarging the control.
9. **Border-aware padding.** Paddings are `calc(--spacing(3) - 1px)` so text inside a 1px-bordered control sits on the 4px grid.
10. **Fonts by role:** `--font-sans` (Inter), `--font-heading` (aliases sans; used by Dialog/AlertDialog/Sheet/Empty titles with font-semibold), `--font-mono` (Geist Mono). coss.com uses Cal Sans 2.0 for both.

## 2. Rules

- **RULE** In coss projects, size components with the `size` prop (xs, sm, default, lg, xl, icon-*) and never add padding/height classes to coss components.
  **Why** Heights, paddings, icon sizes and inner radii are computed together per size; ad-hoc padding breaks the -1px border maths and icon scaling.
  **Applies to** SaaS app UI, forms. **Check** grep coss component usages for `className` containing `p[xy]?-|h-\d` . **Source** founder CLAUDE.md core rules 1, 8; r/button.json

- **RULE** Use `render={<Component />}` for polymorphism, `onClick` on menu/select items, object values for Select items (`items={items}` + `value={item}`), `toastManager.add()` for toasts, and `variant="ghost"` for Cancel.
  **Why** These are Base UI / coss API contracts; Radix habits (`asChild`, `onSelect`, string values, `<Toast>`) silently fail or mis-type.
  **Applies to** SaaS app UI. **Check** grep for `asChild|onSelect=|<Toast\b|<SelectItem value="` in coss projects = 0. **Source** founder CLAUDE.md; coss.com/ui/docs/components/select.md, toast.md

- **RULE** Structure dialogs as `DialogPopup > DialogHeader + DialogPanel + DialogFooter`; with forms, wrap only Panel + Footer in `<Form className="contents">` and keep the header outside.
  **Why** Panel is the scroll region; the header must stay fixed and outside the form so titles do not scroll away and submit semantics stay scoped.
  **Applies to** SaaS app UI, forms. **Check** DOM order inside `[data-slot=dialog-popup]`. **Source** coss.com/ui/docs/components/dialog.md; founder CLAUDE.md

- **RULE** Draw borders and quiet fills as alpha of black (light: border 8%, input 10%, muted/accent 4%) or white (dark: border 6%, input 8%, muted 4%).
  **Why** Alpha keeps contrast stable on white, cards, sidebars and tinted surfaces without per-surface border tokens.
  **Applies to** all. **Check** computed `--border` resolves to rgba with alpha 0.06-0.1. **Source** coss.com/ui/r/colors-neutral.json; styling.md

- **RULE** Give raised controls a 1px lip: bottom `0 1px black/4%` in light mode, top `0 -1px white/6%` in dark mode; remove it on press, disabled and focus.
  **Why** Light comes from above: in light mode the lip reads as a bottom edge, in dark mode as a lit top edge; removing it on press sells the press.
  **Applies to** SaaS app UI. **Check** visual; `::before` box-shadow present on outline buttons/inputs at rest only. **Source** r/button.json, r/input.json

- **RULE** Separate status colour for fills (500) from status colour for text (700 light / 400 dark) and use the text token for any status words.
  **Why** 500-level hues fail AA as text on white; 700 passes, and 400 passes on dark.
  **Applies to** all. **Check** text using success/warning/info/destructive colour has contrast >= 4.5. **Source** colors-neutral.json

- **RULE** Step every control one size smaller at >=640px (button 36 -> 32, input 36 -> 32, sm 32 -> 28) and keep a 44px invisible hit area on `pointer: coarse`.
  **Why** Density for mouse users, target size for touch, without two component sets.
  **Applies to** SaaS app UI, mobile. **Check** heights at 375 vs 1280px; `@media (pointer: coarse)` ::after >= 44px. **Source** r/button.json

- **RULE** Write paddings of bordered controls as spacing step minus the border width (`calc(--spacing(3) - 1px)`).
  **Why** Content then aligns to the 4px grid with neighbouring unbordered content.
  **Applies to** all. **Check** content-box left edge of a bordered button aligns with adjacent text on a 4px multiple. **Source** r/button.json, r/input.json

- **RULE** Disable with opacity 64% (not 50%) and `pointer-events-none`.
  **Why** 50% on alpha-bordered, near-black UI makes labels illegible; 64% still reads as unavailable.
  **Applies to** SaaS app UI. **Check** computed opacity of `:disabled` controls 0.64. **Source** r/button.json, r/input.json (opinion: vendor value)

## 3. Numbers & scales

| Item | Value |
|---|---|
| Button heights (mobile / >=640px) | xs 28/24, sm 32/28, default 36/32, lg 40/36, xl 44/40; icon sizes same; icon-xs uses rounded-md |
| Input heights | sm 32/28, default 36/32, lg 40/36 (inner h-8.5/7.5 + 2px border) |
| Text in controls | 16px -> 14px at sm; xs 14 -> 12; xl 18 -> 16; weight 500 |
| Icons in buttons | 18px -> 16px, opacity 80% |
| Radius | buttons/inputs/selects/menus 8px (rounded-lg), card/dialog 16px (rounded-2xl), card sections 12px, tooltip 6px, badge 4px; `--radius: 0.625rem` declared but not mapped to `--radius-*` in the styling docs' `@theme inline` |
| Focus | buttons `ring-2 ring-ring ring-offset-1`; inputs `ring-[3px] ring-ring/24`, border-ring |
| Invalid | border destructive/36, focus ring destructive/16 (dark /24) |
| Disabled | opacity 0.64 |
| Dialog | max-w-lg, p-6, title text-xl semibold font-heading, backdrop black/32 + backdrop-blur-sm, shadow-lg/5, 200ms ease-in-out, scale-98 entry, nested dialogs scale 1 - 0.1 x depth |
| Popups | shadow-lg/5 (menus, select), tooltip shadow-md/5, text-xs, duration-0 |
| Skeleton | 2s -1s infinite linear background sweep |
| Neutrals (light) | background white, foreground neutral-800, muted-foreground neutral-500 90% + black, ring neutral-400, sidebar neutral-50 |
| Neutrals (dark) | background neutral-950 95% + white, card background 98% + white, border white 6%, input white 8% |
| Status | destructive red-500 / red-700 (dark red-400); info blue-500 / blue-700 (400); success emerald-500 / -700 (400); warning amber-500 / -700 (400) |
| Charts light | orange-600, teal-600, cyan-900, amber-400, amber-500; dark blue-700, emerald-500, amber-500, purple-500, rose-500 |

## 4. Dos and Don'ts

- Do: `<Button render={<Link href="/x" />}>`. Don't: `<Button asChild><Link/></Button>`.
- Do: `<Button loading>`; the label goes transparent and a spinner overlays it so width does not jump. Don't: swap label text for "Loading..." (width shift).
- Don't: give coss components custom `px-4 py-2`; use `size="lg"`.

## 5. Exceptions & judgement calls

- [engine note] coss out of the box is near-monochrome; for any brand build set `--primary` to the brand hue and re-check `--primary-foreground` contrast. Keep neutrals alpha-based.
- [engine note] The 16 -> 14px text step is right for app UI; marketing forms (lead capture) may keep 16px at all sizes for legibility.
- The `--radius` vs Tailwind radius discrepancy is inferred from the registry JSON and styling.md, not verified in a build; if a project's globals map `--radius-lg: var(--radius)`, controls become 10px.

## 6. Figures worth keeping

- coss.com/ui/docs/styling: the explanation of alpha borders + bottom shadows (text only).

## 7. Open questions

- `radix-shadcn-migration.md` returned `{"error":"File not found"}` via the llms.txt URL on 2026-10-08; conventions above come from the founder's CLAUDE.md and component docs.
- Particles count and Origin UI's former component catalogue not inventoried.
