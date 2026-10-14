# Kite: direction

**Brief:** founder 2026-10-14: "make me a cool dashboard design, dark mode". Kite (fictional) is an edge network for web apps. Dashboard user: a platform engineer on call. The one job: see traffic, latency and errors by region at a glance, and act on the one region that needs attention. All data is sample.

## Mode and class
Operate (app UI), dark. Signature visual: a live dot-matrix world map with region nodes. The story the fold carries: Singapore (sin1) p95 latency is elevated after a deploy; the dashboard shows it on the map, the chart and the regions list, and offers the fix ("Shift 30% to hkg1").

## Reference triad
- Structure: Marcel's L1 analytics overview (kargul-saas-playbook): KPI strip in one card split by hairlines -> signature visual 2/3 + list 1/3 -> chart + list.
- Type and identity: Linear / Vercel dark: 14/12 UI type, 26px tabular numerals, one accent, hairline rings.
- Proof and material: the Midnight-ink dark recipe (dark-recipes.json `blue-black`): canvas #090b12, surfaces lift by fill step + 1px top highlight, one periwinkle accent #8c9bff.

## Variety
<!-- variety: layout=bento nav=G14 button=glow type=humanist-warm palette=plum-black system=margin -->
- override palette: blue-black instead of plum-black, because this is a developer platform (the recipe's best_for) and the founder rejected palette drift last round.
- override type: Mona Sans + Geist Mono, because humanist-warm is "never for edgy dev tools", and Mona Sans has not appeared in recent builds (Settle Geist, Perch Rubik/Inter).
- override nav/layout/button: these are marketing axes. The app uses a sidebar shell and a report grid; the primary action is the recipe's inverse pill.
- override system binding: app UI, own role tokens from the dark recipe (as Settle).

## Clean rules applied (founder, Settle v1 "dirty")
- Two hue families only: periwinkle accent (live, healthy, primary data) and red (errors, the elevated region). No green, amber or violet.
- One surface step: cards on the canvas; the sidebar is the canvas with a hairline.
- Rings only on cards and controls; rows separate by hairlines.
