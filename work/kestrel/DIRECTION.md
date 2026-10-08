# Kestrel: direction

**Brief (random SaaS, founder round after the Vigil reject):** Kestrel, AI product analytics. Product teams ask questions in plain English and get the chart, the cohort and the reason. Audience: PMs and growth leads at B2B SaaS. One action: start free. Proof needed: the product answering a real question on real-looking data (labelled sample).

## Hero class
Product proof. Founder rule (Vigil round 2): centred copy over a full dashboard, AlignUI-clean, light. The dashboard is the visual.

## Concept
Your analytics, but it talks back: a question goes in, the dashboard flags the dip, and the AI panel names the cause and the cohort to act on.

## Reference triad
- Structure: AlignUI Pro hero (`knowledge/benchmarks/alignui-shots/pro-1440.png`). Rule taken: centred stack, then a framed product window that runs off the fold.
- Type and identity: AlignUI marketing layer (`alignui-method.md` section 1, item 11). Rule taken: Inter at 550, tight tracking, one accent, greys with half-steps, layered brand-tinted shadows.
- Proof and motion: Commslayer (`commslayer-shots/home-1440.png`). Rule taken: an inline icon tile inside the headline, and channel tiles around the hero that say where the data comes from.

## Divergence (vs Tideline accept and Vigil reject)
| axis | Tideline | Vigil v2 | Kestrel |
|---|---|---|---|
| structure | split copy-left, globe right | split, lens field right | centred stack over a full-width dashboard |
| type voice | Geist 600 | Geist Mono poster | Inter Variable (opsz) 550, -4.5% |
| palette | warm white, orange badge | near-black, lime | neutral grey canvas #f7f7f7, blue #335cff |
| CTA grammar | ink 14px radius, press 0.98 | Comeau 3D push | AlignUI "fancy" dark button: inner top highlight, 1px inner ring, muted second segment |
| nav grammar | Kaching pill | hairline bar, sliding underlines | segmented link track (sunken grey track, white active segment) |
| motion signature | comet arcs to cities | lens orbit | data-source tiles feeding flowing gradient routes into the dashboard; the chart draws in; the AI answer streams |
| icon set | Phosphor | Phosphor | Remix Icon (AlignUI's own set) |

## Bound system
`system/systems/kestrel` (contract met): pure neutral greys, blue hue 264, soft depth, calm motion.

## Moves and recipes used
- Double-bezel product frame (outer translucent shell + inner app surface), `implementation-craft` concentric radius rule (outer 20 = inner 14 + 6 padding).
- Founder flowing routes (gradient + comet) re-used as the data-source story: sources -> Kestrel.
- Inline headline icon tile (Commslayer move).
- Rails with registration nodes (M15, quiet).

## Overrides
- override: LHS-07 because the founder's newest verdict (Vigil round 2) asks for exactly copy-above / dashboard-below; the older rule targeted a lazy photo crop, here the dashboard is a real workflow.
- override: systems-research.magic-ui#1 (one ambient effect): the routes are the only effect and carry product meaning (data sources), no glow, grid or aurora.

## Sample data
Workspace "Northwind (sample)". All numbers are sample and internally consistent: activation 41.8% after a 3.1 pt drop; 412 affected trials.

## Round 1 build
- Check: 0 fail, 0 warn (muted grey darkened #8f8f8f -> #737373 for 4.7:1).
- Gate: max 3/10 (Tideline: headline size, section rhythm, hero layout; Vigil: headline size, content width, hero layout). Passes.
- Engine pieces used: compiled system `kestrel` (contract met), rule slate (60, founder rules 28-30 lead), AlignUI method (brand layer of greys + one blue, fancy-button grammar), Commslayer inline headline tile, founder flowing routes as the data-source story, double-bezel frame.

## Round 2 (founder: "fucking awesome" with fixes)
Nav 44px track / 36px links / 40px buttons; chip removed, h1 at 150px; dot grid inside the rails only, faded behind the headline; founder flower mark traced (brand/kestrel-mark.svg) in the nav and the Ask Kestrel tile; CTAs 44px at 14px radius; sidebar radius 6; no accent ring on KPI cards. Check 0 fail 0 warn. Ledger: accept.

## Round 3 (founder: "fucking amazing, love it")
Secondary CTA text-only. Dashboard radius ladder 4 / 6 / 10 / 14 / 20, every 32px control at 6, segmented control 32px with equal 40px slots, labels centred.
