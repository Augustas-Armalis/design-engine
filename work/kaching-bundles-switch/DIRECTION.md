# DIRECTION: kaching-bundles-switch

Brief (one line): replace the Bundles app page's dark migration visual ("Using Another Bundle App? We'll Help You Switch.") with a scene at the bar of the praised sibling `BundlesMcpDeal.jsx`: same card grammar, premium dark, one change at a time, a real phone composition.

Code: `/Users/augustas/Desktop/Kaching-Website-Export-2026-10-05/wt/r32-switch`, branch `fb/r32-switch`, new file `src/components/app-visuals/mcp-scenes/BundlesSwitch.jsx`, lazy host `src/components/app-page/BundlesSwitchLive.tsx`. Cart keeps Barbora's migration scene.

## Class and concept

- Section visual inside an accepted template (not a hero). Product proof: the merchant's own offer, rebuilt.
- Concept in one sentence: **the same offer, twice: your current app's flat grey widget on the left, the real Kaching Bundles widget on the right, and a real person between them checking each row before you switch.**
- Copy it proves, point by point: "A real person to guide the switch" (the support avatar from the section's own button heads the path), "Your current offers, rebuilt in Kaching" (the same three packs, same prices, lighting up in the Bundles widget), "Check everything before going live" (a check draws on between each old row and its rebuilt twin), "same deals from day one" (the guide's final status after the switch).

## Reference triad

| role | reference | rule taken |
|---|---|---|
| structural | Resend /migrate/sendgrid (refs/09): two identical dark frames, old and new, the same content in both | symmetry carries "nothing changes for shoppers": equal cards, rows on shared baselines, so each pair reads as one line |
| type / identity / grammar | `BundlesMcpDeal.jsx` (founder: "way nicer now") + Barbora's style guide sections 3 and 7 | same offer anatomy (product line, 40px rows, light tags, solid tag on the row edge, sliding/fading frame, press-and-confirm), status pill with spinner then a check drawing on, dashed slots handing over to rows, Fit + useLoop at 0.5x |
| proof / motion | Attio workflow canvas (benchmarks/attio/crop-home-workflow.png) + Skio "Validate" step (refs/01) | one path drawn from a status node, the check is its own step with its own mark; the path lands on each check in turn |

Also opened: Omnisend refs 03-05 (dark, "rebuilt by hand", a named person: we use the real support avatar, no invented name), Shopney (old app desaturated beside the new one), concept-B-side-by-side still from the previous round (flat; this build keeps its idea and rebuilds the craft).

## Dark recipe (knowledge/web/dark-mode-premium.md)

- Canvas = the section's box (`rgba(14,15,17,.8)` on `#08090c`), a faint white dot grid (6%) feathered with a radial mask; no colour blobs.
- Cards: one surface step up (`#131417`), 1px white .08 ring + inset top highlight white .05 + a dark drop that only shows as edge (`0 12px 32px -12px rgba(0,0,0,.6)`). Rows one step higher again (`#1A1B1F`) with their own .07 ring. Two surface steps, never three.
- Colour budget: Bundles blue only on Bundles data and marks (rows' tags, the selection frame, the solid tag, the button, the checks and the drawn path). The old widget is greys only. Chromatic area well under 3% of the box.
- Text tiers: `#F4F4F5` / `#8B8F97` / `#5C6068` (card-shell DARK). Weights 500/600.
- Blue lifted for dark: line and tag text are the Bundles blue mixed toward white (30-55%); fills keep `#2454B4` (deep chromatic button with a 1px ring and inset top light, no glow).

## Founder rules applied (founder-taste.md)

dark sections get dark visuals; busy is a defect (one moving element at a time, nesting depth 2: box > card > row); app colour only on Bundles data and marks; even frame (the leading tile's left inset = top = bottom); concentric radii (card 16 > row 12 > tag pill; avatar 20 at r6 in a 28 pill); quiet depth; looping accents invisible until their moment (the spinner lives only inside the "Rebuilding" state layer); numbers never roll (prices are fixed, labels cross-fade as stacked layers); real icons and avatar only (Lucide, the site's support avatar, the Bundles app icon); illustrative data identical to the MCP scene (protein tin, €24.00 / €43.20 / €61.20); phone is its own composition (stacked, the path drops between the cards).

## Overrides

- override: guide 7 "Loop 7.5 to 10.5s on screen" because the accepted sibling BundlesMcpDeal runs 8.7 clock (17.4s on screen) for a two-act story; this scene matches it (8.8 clock) so the two Bundles scenes breathe the same.
- override: founder-taste "wide visual box -> wide cinematic composition" only partly applies: this box is 595x404 (not a wide strip); the composition still spans >= 90% of the box width with real product UI and real marks.
- override: sibling-pages-identical-boxes for the migration box height on tablet split (900-1000px) and phones, where only Bundles grows the box (the brief allows it) so the stacked composition is not scaled below the guide's type sizes.

## Divergence / variety

Not applicable: no new brand. Consistency with the shipped Kaching system and the accepted Bundles MCP scene is the goal.
