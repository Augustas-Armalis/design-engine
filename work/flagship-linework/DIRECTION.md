# Flagship · Linework — DIRECTION

**Brief (self-set, for the engine showcase / X post).** A SaaS hero at 1440×900, React + Motion + Tailwind v4, fully specced, with its own logo. Fictional product: Linework, AI that turns a hand-drawn floor-plan sketch into a measured plan. Audience: architects, interior studios, renovators. One action: upload a sketch. All data sample.

**Hero class.** Product proof with a before/after boundary.

**Concept.** The whole hero is one architectural drawing sheet. The plan is the sculptural centre; a vermilion red-pencil line divides the pencil sketch you drew from the measured plan Linework returns, and sweeps across on load. The headline lives in the sheet's title block, so the copy belongs to the product world instead of sitting beside it.

**Dealt direction.** Seed 8, candidate 1 (asymmetric crop, editorial serif, material monochrome, oversized-block CTA, before/after boundary), adapted: index-list nav dropped because numbered nav is now a flagged convergence tic.

**Bound system.** `system/systems/linework` (new, compiled; contract met; showcase 0 fail / 0 warn): Libre Caslon Display, Mona Sans, Red Hat Mono; graphite on drafting paper; one vermilion accent #c02d14 with white text; sharp, hairline depth, comfortable density, calm motion.

**Founders' signals used.** Accepted: whole frame belongs to a product world (Take, Mise); sculptural central object with information placed around it (Nacre); refined serif display (Borne). Avoided: left-copy/right-dashboard, floating card on a photo, pill nav, eyebrow caps, decorative dashboards, glow.

**Overrides.** None.

**Outcome.** check.mjs 0 fail / 0 warn / 45 pass; diversity gate clear (max 2/10 shared with any rejected reference); hero layout reads split-right-copy (title block), not the rejected pattern. Three critique passes fixed: boundary handle rendering in CSS px instead of user units, faint sketch strokes, grid references colliding with content, clipped disclaimer, chip overflow, footer collision. Tool fix found on the way: SVG <text> no longer judged for line-height.

**Weakest point.** The sketch half shows only two rooms, so the "before" carries less of the story than the "after"; a second iteration could show a messier, fuller sketch.
