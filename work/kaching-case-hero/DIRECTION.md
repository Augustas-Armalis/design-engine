# Kaching merchant-story hero: direction (round 30, 2026-10-12)

**Brief (founder, translated):** "The case study hero is a bit cramped, no? How could we do it better or more premium?"
**One line:** Kaching (Shopify app suite) merchant story page; audience is a merchant deciding whether the app works; the one action is "Explore Kaching Bundles"; the proof is two or three real results (+58% AOV, €1.95M+), which already count up.
**Code:** `Kaching-Website-Export-2026-10-05/wt/r30-case-hero` (branch `fb/r30-case-hero`), `EditorialArticlePage.tsx` + `editorial.css`. The concepts switch with `?hero=a` / `?hero=b`. The live hero is unchanged without the query.

## Diagnosis (measured, current hero at 1440)
- The title gets a 0.9fr column (~500px), so "How IntegroPet Turned €38 Orders Into €60 Orders" runs to 3 lines. That breaks founder-taste "hero headlines two lines max at desktop".
- The cover is 590px at 16:9 (330px tall), with the copy block centred beside it. The results card starts 56px under the CTA row and spans both columns, so three bands stack inside ~680px with no dominant element.
- The dither covers the right 55% at full height, behind the cover and the card. Brand material sits behind everything, so nothing is anchored.
- At 390px the results become full-width rows with the label pushed right and wrapping ("Cumulative / bundle revenue"). The 28px figures dominate the phone.

## Hero class
Editorial: a story, not a product. The visual is the merchant's own photo, and the proof is the results the founder likes as the "main" count-up figures.

## Reference triad (refs in scratchpad `case-hero/refs/`)
- **Structural:** Notion customers (`notion-1440-tall.png`). The white stat card overlaps the hero's bottom edge, so the results belong to the image instead of floating. This is the rule for Concept A.
- **Type and identity:** Linear customers (`linear-1440.png`). A centred two-line 48px title, then a full-width media frame ~55px below, with nothing beside the title. Rule taken: give the title the full measure so it sets in two lines.
- **Proof and material:** Ramp customers (`ramp-1440.png`). The stats sit on the photo itself. Attio (`attio-1440.png`) uses a near-square media card beside a narrower title column. Rule for Concept B: put the figures inside the cover, as part of the picture.
- Also opened: Stripe (stats as a column beside a video), Vercel (article-style), Shopify (2:1 full-width cover, square corners), Resend (no cover).

## Concepts
- **A, editorial stacked.**
  - The title spans up to 900px, balanced, so every story sets in 1-2 lines at 1440.
  - Subtitle and CTA sit under the title. Then comes a full-width 21:9 cover at r24.
  - The results card rides the cover's bottom edge (-64px overlap, 48px inset) on a dither band that starts behind the cover's middle and runs off the hero's bottom, with the rails dissolving into it.
  - Phone: a 16:10 cover with a 2-up results card overlapping it.
- **B, refined split.**
  - The copy column is wider (~688px at 1440; the cover is 400px), so titles set in 2 lines.
  - A tall 4:5 cover sits at r24. The back link is level with the cover top, and the copy is centred in the remaining height.
  - Results sit inside the cover's bottom edge as a concentric card (12px inset, r12 = 24 - 12).
  - The dither is kept low behind the cover only, and the copy side is plain canvas (founder rule: split hero copy side stays clean).
  - Phone: copy, then a tall cover with the 2-up card inside.
- **Both.**
  - Geist and the site hero scale are unchanged: `--page-title-size` 48/42/32, Title Case, no full stop, the same `page-hero-*` entrance classes.
  - The back link, the app-icon CTA and the MetricValue count-ups are kept.
  - A third result spans the row as the lead in 2-up grids.
  - A figure binds to the following capitalised word ("€38 Orders"), so a balanced title never splits a figure from its noun.

## Divergence row
This is not a new brand: it is a revision inside the Kaching system. Family: editorial story hero (the last two engine builds were Murmur and Quillwork, both product heroes). Nav, buttons, type and palette are the shipped Kaching ones by design (founder-taste "one hero scale across secondary pages", "revise one by one").

## Bound system
Kaching shipped system (`knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md`). Tokens: `--chrome-radius-card` 18, `--chrome-shadow-float`, `--chrome-line`. The cover is r24 at hero scale (the outer tier); nested cards are concentric.

## Overrides
- `override: founder "hero card anchors bottom-left"`. In B the proof card sits inside the cover's bottom edge because the results describe the photo's story. In A it anchors to the cover's bottom edge, which is still the bottom of the composition.
- B at 1024px: the two longest titles ("Clearer Bulk Pricing Helped Flush Packaging Lift AOV by 23%", "How Pouchdaddy Generated $4.35M Through Quantity Offers") set in 3 lines. The two-line rule is "at desktop"; at 1440 every title is 2 lines. A holds 1-2 lines at 1024 too.
- B crops covers to 4:5. Covers with baked-in lettering (Meat For More) lose the lettering at that crop. A's 21:9 desktop / 16:10 phone crop keeps it. If B wins, stories need a per-story focal point or portrait art.

## Rules trimmed from RULES.md
I kept the founder hero rules: 2-line title, Title Case, no full stop, subtitle ≤ 2 lines, quiet card depth, consistent radii, nested radius = outer - inset, dither as signature field with calm placement, and one hero scale across secondary pages. I also kept the core focus and semantics rules. I dropped the product-dashboard, nav-construction, logo, button-effect-variety and announcement-pill rules (not in scope: the shipped Kaching components stay), and kargul-deep-study #30 (a 626px single column is a portfolio template, not this site's grid).

## Status
Concept stills delivered; awaiting founder pick. No ledger entry until the founder gives a verdict.
