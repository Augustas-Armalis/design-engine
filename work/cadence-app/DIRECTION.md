# Cadence app: week calendar (own design, Tanjim system)

scope: one product screen (Cadence week calendar), presented as a 1600x1200 post frame (his best-performing still format, light 4:3)
motion: none
mode: A (scratch), floor = Tanjim's code-true system (system/product-ui/gr8r-tokens.json, TG-01..37) + Kite (founder-approved)
kind: product-ui

- **Brief (founder 2026-10-22):** "try designing yourself and doing revisions from the UI pedia and your own resources... spacing colors effects, cuz you miss that always centering... you dont run the checks".
- **Owned decisions (3):**
  1. The suggested slot is drawn in the accent, with a dashed edge, sitting in the grid.
  2. Focus blocks are protected: violet tint plus a lock glyph.
  3. A "Find a time" rail ranks the slots, saying why each one works.
- **Revision loop:** every pass runs `gate.mjs --kind product-ui` (including centring), `check.mjs`, and a side-by-side with `knowledge/benchmarks/tanjim-x/app/home-light.png`. Every pass also ticks `REVISIONS.md`.

system: gr8r (Tanjim, measured): bound on purpose for this study build
- override: radius.ladder.boxes because the screen is bound to Tanjim's measured radius ladder (6 controls, 8 cards, 10 containers, 3-5 swatches; TG-07, gr8r-tokens.json radius.ladder_by_height), not the Kargul/Ferry product canon
- override: type.sizes.product because his type scale is 11/12/12.5/13.5/14.5/23 (TG-04), six to seven sizes by design
- override: type.weights because his body weight is 400 with 500/600 for emphasis (TG-04)
