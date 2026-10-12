# Product UI benchmark credits

Study evidence only. Every screenshot in this folder belongs to the company that ships the product or the site. They exist so the engine can measure product-UI construction (heights, radii, type tuples, surfaces, shadows, density). Never copy, trace or present any of them as engine or Larpo work.

- Top-level files (`<site>.png`, `<site>-frameN.png`, `raster-*.png`, `measurements.json`) come from the 2026-10-08 study and are documented in `knowledge/web/product-ui-in-marketing.md`.
- `deep/` comes from the 2026-10-10 study for `knowledge/web/product-ui-deep.md`, `system/product-ui/tokens.json` and `system/product-ui/screens.md`.

## How `deep/` was captured (2026-10-10)

Headless Chromium (Playwright from the repo), 1440x900 at DPR 2, light and (where noted) `prefers-color-scheme: dark`. Public pages only: marketing sites, public docs, open-source demo/example pages and public booking pages. No account, no login, nothing submitted; cookie banners were refused with "Reject all"/"Decline" where offered, otherwise hidden with CSS. Computed styles were read with an in-page probe (`getComputedStyle` on every visible descendant: text tuples, control ladder, rows, icons, radii, shadows, borders, surfaces, floating layers); the compact result is `deep/measurements.json`. Raster product shots (`deep/raster-*.png`) were rendered at the image's natural resolution and measured with a pixel script (hairline and text-band detection). Large screenshots were downscaled to <= 1600 px wide after measuring; numbers in the note come from the full-resolution captures.

## Files in `deep/` and their sources

| Prefix | Source URL | What it is |
|---|---|---|
| `shadcn-dashboard01-*`, `shadcn-dashboard01-rowmenu` | https://ui.shadcn.com/view/new-york-v4/dashboard-01 | open-source dashboard block (light, dark, row menu open) |
| `shadcn-sidebar07-fold` | https://ui.shadcn.com/view/new-york-v4/sidebar-07 | open-source sidebar block |
| `shadcn-tasks-*` | https://ui.shadcn.com/examples/tasks | open-source tasks table example, faceted filter open |
| `shadcn-examples-dashboard-fold` | https://ui.shadcn.com/examples/dashboard | dashboard example |
| `shadcn-command` | https://ui.shadcn.com/examples/tasks (Cmd+K attempt) | page state after the shortcut |
| `geist-<component>[-open][-dark]` | https://vercel.com/geist/<component> | Vercel Geist design-system docs: button, input, select, menu, toast, command-menu, modal, table, tabs, badge, keyboard-input, tooltip, empty-state, skeleton, switch, toggle, avatar, context-menu, combobox, drawer, calendar, status-dot, gauge, pagination, checkbox, textarea, choicebox, materials, colors, typography, entity, split-button, note, progress |
| `linear-home-win0..3` | https://linear.app | DOM product windows on the homepage (issue list + code, app window with agent panel, kanban + thread) |
| `linear-plan-*`, `linear-build-*`, `linear-insights-*`, `linear-asks-*`, `linear-agents-*`, `linear-intake-*`, `linear-coding-sessions-*` | https://linear.app/plan, /build, /insights, /asks, /agents, /intake, /coding-sessions | folds and product images |
| `linear-changelog-*`, `raster-linear-changelog-0,1,3,5,6` | https://linear.app/changelog | changelog product images (Diffs, AI credit usage chart, team settings, docs callout, Inbox dark) |
| `cursor-fold`, `cursor-frame0..4` | https://cursor.com | DOM product mocks (agent window, CLI) |
| `dub-*`, `dub-analytics-*` | https://dub.co, https://dub.co/analytics | DOM analytics mock (KPI cards, events table) |
| `cal-booking-*` | https://cal.com/rick | public Cal.com booking page |
| `stripe-docs-fold` | https://docs.stripe.com/payments/quickstart | Stripe docs UI |
| `supabase-*`, `raster-supabase-1` | https://supabase.com, https://supabase.com/ui | site, code frame, table editor shot |
| `campsite-fold`, `raster-campsite-0` | https://www.campsite.com | feed product shot |
| `plain-*` | https://www.plain.com | fold and video stills |
| `clay-img2`, `raster-clay-2,4` | https://www.clay.com | email preview and table product images |
| `granola-fold` | https://www.granola.ai | notes window in the hero |
| `notion-calendar-*`, `raster-notion-calendar-1,6`, `notion-mail-fold` | https://www.notion.com/product/calendar, https://www.notion.com/product/mail | calendar product images |
| `superhuman-fold`, `raster-superhuman-1,3` | https://superhuman.com | Docs AI panel and inline suggestions images |
| `arc-fold` | https://arc.net | fold |
| `mercury-invoicing-*`, `raster-mercury-invoicing-2,3` | https://mercury.com/invoicing | invoicing UI images |
| `ramp-bills-fold`, `raster-ramp-bills-2` | https://ramp.com/accounts-payable | bill approval image |
| `alignui-pro-*`, `raster-alignui-pro-0,1` | https://pro.alignui.com | AI chat and analytics template previews |
| `tremor-blocks-fold`, `raster-tremor-blocks-0,1` | https://www.tremor.so/blocks | dashboard template previews |
| `untitledui-components-fold` | https://www.untitledui.com/react/components | component index |
| `acme-dashboard-fold` | https://next-learn-dashboard.vercel.sh/dashboard | Next.js Learn demo dashboard |
| `vercel-templates-fold` | https://vercel.com/templates/dashboard | template gallery |

Not captured: height.app no longer resolves (the product shut down); Attio, Kargul CRM, Rico and Flo Hoeller were measured in earlier studies (`knowledge/benchmarks/attio/`, `kargul-crm/`, `heyrico/`, `flohoeller/`) and are cited from those notes, not re-captured.
