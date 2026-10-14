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

## v2 (founder: "map not polished, don't do it so blue, effects better, Marcel / Rico style")
- **Palette:** graphite neutral (#0a0a0b canvas, #121213 to #141415 card gradient). White carries the data, and red is the only hue (the incident).
- **Material:** tactile cards: 1px ring, inner top light and a deep soft drop (Marcel tactile dark). Each card has a header band with a raised icon tile and a hairline. Controls are tactile gradients, the segmented control is recessed, and the primary action is a white bevelled pill.
- **Map:** a 4.3px dot field with an Equal Earth projection, heat-shaded by region traffic and warming to red around sin1, with a radial edge fade. Nodes are white cores with soft light; labels are chips showing req/s. Origin-pull arcs carry travelling lights, the reroute arc runs red to white, and the read-out is tactile with sin1's own p95 sparkline.
- **KPIs:** Rico-style mini bars (16 bars, the latest four lit, anomalies in red).
- **Latency:** the p95 line has a glow, and its stroke gradient turns red through the incident window.
- **Check:** 0 fail.
