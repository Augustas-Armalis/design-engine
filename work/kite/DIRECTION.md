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

## Load-in (founder: "make insanely cool load-in animations, fully animated and working")
One timeline, T in `src/anim.tsx`, on Kaching easing:
- **0.05-0.6s:** the sidebar slides in and its items stagger; the top bar drops; the title row blurs in.
- **0.36s:** the KPI card rises; the numbers count up from 0, keeping their decimals; the mini bars spring up one by one.
- **0.52s:** the map card rises. A light beam sweeps west to east and lights the dot field behind it; nodes spring in as it passes; chips slide in. At about 2.1s the routes draw themselves, then their travelling lights start.
- **About 2.6s:** sin1 flares. Its node and heat dots turn red outward from Singapore, the pulse starts, the reroute arc draws, the regions alert drops in (the rows reflow), and the read-out springs up with its sparkline drawing.
- **Latency:** the p50 and p95 lines draw left to right; the incident band, deploy ticks and time labels appear as the line reaches them.
- **Verification:** checked frame by frame with Reel (virtual clock) in `loadin/strip.png`. Reduced motion shows the final state.

## Hero, by the rules (founder: "you forgot all of the rules... use our knowledge")
Each founder rule applied, with its measured value at 1440x900:
- **Title Case, no full stop, 2 lines:** "Every Region, Live / Every Fix, One Click".
- **One colour, bold:** h1 64px / 600 / -2.56px, #f4f4f5.
- **No chip:** the h1 starts at 156px, 84px under the nav rule (rule: 80-90).
- **Subtitle:** one line at 18/28 (rule: 2 lines max).
- **Buttons:** 44px tall, radius 14. The primary is the product's white bevel; the secondary is tactile, text only, with no icon.
- **Nav:** a 44px track with 36px links and 14px padding; Sign in is text, the primary is 40px at radius 12.
- **CTA to product:** 64px from the CTAs to the frame (rule: >= 64, measured).
- **Rails:** at 120/1320 with + marks on the nav rule. The dot grid sits only between the rails and fades behind the headline (Kestrel/Commslayer rule).
- **Product:** the full dashboard in a double-bezel frame (r22 outer, 6px pad, r16 inner = concentric), dissolving at the fold. Squircles via squircle.css.
- **Load-in:** one Kaching-token timeline (reveal ease 1.2s, 70ms word stagger, 6px blur on text only, frame lifts from 97%).
- **Logo:** the supplied K-star, traced to SVG, as mark + wordmark (no container).
- **Palette:** dark only, graphite neutral, no glows.

## Kite hero: current spec (2026-10-14/15, after ~20 founder rounds; latest feedback: "now we're talking")
- **Canvas:** #0a0a0b, dark only. Rails at x 120/1320 with + marks on the 72px nav rule.
- **Nav:**
  - Supplied K-star logo (traced SVG, mark 26px) + "Kite" 23/600, then a 20px hairline divider.
  - Plain text links 15/500 #a1a1a6 with 28px gaps.
  - Right side: "Sign in" as text, plus a 36px white pill CTA.
- **Headline:** Inter display cut (opsz.css, cv11 + ss01) 68/550/-0.045em, one colour, Title Case, no full stop: "Every Region, Live / Every Fix, One Click". Top at 156px.
- **Subtitle:** 18/28/450 #a1a1a6, two hand-set balanced lines.
- **CTAs:** 44px full pills, built from the dashboard's own buttons (white Deploy pill + dark tactile pill). No arrow tile.
- **Background:** the dashboard's dot-matrix map, soft (dots 0.10 + heat 0.34, max 0.5), enlarged (fitExtent -250..W+170), with a long soft cut-out behind the copy. All white, no comets, no red. Frosted-glass labels ("sfo1 | 34 ms") sit on their own layer, auto-placed outside the reading zone.
- **Product:** full dashboard in a double-bezel frame (9px pad, r25 outer / r16 inner), 64px under the CTAs, dissolving at the fold.
- **Edges:** one light ring per box everywhere (no ring + inset highlight doubles).
- **Motion:** one Kaching-token load-in (~2.5s, expo-out).
