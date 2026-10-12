# Settle: direction

**Brief:** SaaS app with a dashboard at Marcel Kargul's quality (founder 2026-10-12), applying the new borders rules (BN-01..12) and Apple squircles everywhere. Settle is accounts payable for finance teams at 50-500 person companies (fictional; all data is sample). Audience: controllers and finance leads. The one action: approve and schedule bills without running out of cash. Proof the screen must carry: what is due, what waits on whom, and what that does to the cash balance.

## Mode and class
Operate (app UI). No marketing hero: the product itself at 1:1. The overview dashboard at 1440x900, plus Bills list, bill detail sheet and command palette as real states. Light primary, dark theme from the same roles.

## Concept
A finance desk where every number is an object you can act on: the cash line drops at every pay run, and the approvals that move it sit right beside it.

## Reference triad
- Structure: Kargul kanban overview + workflow overview (`knowledge/benchmarks/kargul-src/kb-13-overview.png`, `wf-08-overview.png`) -> an overview reads top-down like a report: 24/600 title, 14 subline, content capped ~1200, 16px grid gaps, one signature chart with real interaction (kargul-source-study #48, 2.9).
- Type and identity: Kargul sales-crm (`crm-01-companies.png`) -> three text sizes (12/14/16) + one numeral size, one control height (30px), 14px icons beside 14px text, real objects in every row (vendor logo, tinted tags, illustrated face, meter, date + context word).
- Proof, material, motion: Rico / Linear inset-panel shell -> sidebar on a warm grey canvas, the work area one white panel with a 1px ring (BN-03) and squircle corners (BN-12); 150ms state, 200ms popovers, 250ms dialog/sheet, no idle loops.

## Divergence (vs last 8 ledger entries)
| axis | recent (Tandem, Halyard, Murmur, Weekline, Quillwork, Acquisity) | Settle |
|---|---|---|
| structure | marketing heroes, centred copy over a product window | full working app at 1:1: inset-panel shell, report overview, list page, overlays |
| type voice | Inter/Geist display 64-84px | Geist 12/14/16 + 28px tabular numerals, no display type |
| palette | periwinkle, graphite, cinematic dark | warm grey canvas #f4f4f2, white panel, ink primary, one deep-teal money accent #0b7a5c; dark theme from the same roles |
| CTA grammar | glossy pills 44-52px | 30px ink pill primary + white ring secondary; 24px row actions |
| nav grammar | top pill nav | 248px sidebar: workspace switcher, sections, saved views, cash-runway footer |
| motion signature | orchestrated hero load-ins | state motion only (approve, sheet, palette, chart hover) |
| product world | agents, ops, meetings, calendars | money out: bills, approvals, pay runs, runway |

<!-- variety: layout=band nav=G08 button=key type=condensed-statement palette=light system=strata -->
- override: variety layout/nav/type/system are marketing-site axes; app UI follows the Kargul floor (3 sizes, 1 control height, sidebar shell). Kept: palette=light, button=key (keycaps on ⌘K and shortcut hints).

## Bound system
- override: house-system binding. `system/systems/*` are marketing systems; the app uses its own role tokens in `src/index.css` (light + dark), derived from kargul-source-study 3.2 (kanban light, CRM dark) and BN-02.

## Shape and edges (BN-01..12)
1px alpha rings drawn as box-shadows (light ink 7-9%, dark white 8-10%), one edge treatment per box, squircle corners via `squircle.css`. Authored radii: panel 16, card 14, popover 12, 30px control 9, 24px tile 7, tags/avatars/primary button pill. Nested corners concentric. Inside < outside: card padding 16-20, card gap 16, section gap 32.

## Overrides
- override: kargul "no KPI card grid on a list page" -> the overview is a report page; KPIs live in one joined strip with dividers (BN-05), not four floating cards.
- override: house system binding (above).

## Check (tools/check.mjs, overview light + dark + bills): 0 fail
Justified warns: `type.body-size` 14px (app UI base is 14/20, web.design-systems#6); `type.line-height` 14/20 card titles (single-line UI labels); `targets.size` Base UI's visually hidden 1x1 checkbox inputs (the visible checkbox is the target). `shape.squircle` 34/34, `shape.inset-tile` pass, `shape.icon-centring` pass.

## Applied from the Marcel playbook (knowledge/web/kargul-saas-playbook.md)
L1 analytics overview (KPI strip as one card split by hairlines -> chart 2/3 + list 1/3 -> table); 28/600/-3% KPI numerals with muted units at the value's size; list card `Title + count` with `View all ->`; chart compares against something (the buffer); 30px controls, 14px icons, 44px rows; floating bulk bar; every control wired (approve, undo, nudge, move, sort, filter tabs, menus, ⌘K, theme).
