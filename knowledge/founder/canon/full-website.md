# Canon: full website / multi-section landing

Decided defaults, 2026-10-21. Build a full site only when sections are named in the request; "landing page" after a hero round means the hero (L424). Evidence: `founder-taste L<n>`, Kaching (shipped, "the shipped standard") and Capto ("that was fucking awesome", ledger `2026-10-08-larpo-shipped-capto`). Gate numbers: `system/canon/full-website.json` (site-wide census); the hero fold of the site is gated by `hero-light.json` or `hero-dark.json`.

## Floor references
- **Kaching homepage:** `knowledge/larpo-shipped/kaching-full.png` + `kaching-DESIGN-SYSTEM.md` (rails, divider ownership, footer, motion, responsive tiers).
- **Capto:** `knowledge/larpo-shipped/capto-full.png` (dark Geist, real editor UI with a real photo, purple pixel-dither band).
- Section-level floors: `canon/section-bento.md` (feature bento), `canon/hero-light.md` / `hero-dark.md` (the fold).

## Reading set (5 files)
1. this page
2. `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md` ("Layout and responsive behavior", "Component contracts", "Footer")
3. the hero canon for the mode (`hero-light.md` or `hero-dark.md`)
4. the bound system's `system/systems/<slug>/GUIDE.md`
5. the last 5 ledger rounds

## Decided numbers

| Part | Default | Source |
|---|---|---|
| One system | one bound house system (or the client's own) across every section and page; role tokens only | CLAUDE.md pipeline step 3 |
| Rail | centred 1200px content rail (`min(1200px, 100% - 48px)`) with 1px side rules; inner gutters 32-36px; full-width section colour on the outer section, content and rules inside | Kaching |
| Dividers | each divider has one owner: the rail owns the verticals; adjacent sections share ONE horizontal 1px rule; the last section owns the rule above the footer; rails dissolve before artwork, never cross it | Kaching; L46, L74 |
| Section padding | 96-150px vertical at 1440 (Kaching ~151, Capto 128, designer median 96) | ledger fingerprints; HC 3.2 |
| Section heads | one scale site-wide: our Inter builds 44 / 550 / -0.04em, Title Case, 2-line hand-set sub at 17/26 sub grey; on Kaching its own 36 / 600 / -0.06em Geist | Cadence v3; Kaching tokens |
| Page h1 | identical size on every secondary page per breakpoint; no one-off giant h1 | L223 |
| Copy case | Title Case on headlines only; body, buttons, labels in sentence case | L306 |
| Nav | the hero canon's nav, identical on every page; one shared header component with focus return, Escape, scroll lock | hero canon; Kaching |
| Buttons | one primary recipe and one secondary recipe site-wide (the hero's); text links use one arrow-link with one sliding underline | L154, L367; Kaching ArrowLink |
| Visual language | every product visual on the site shares one edge treatment, one radius ladder, <= 3 shadow recipes, type at 500/600, one accent rule | L199 |
| Sibling pages | pages from one template keep identical bento rects, sizes and padding at every breakpoint; only content differs | L203 |
| Dark sections | dark visuals inside (dark panels, faint white ring, light text, accent only on the selected thing); never a white UI window on a black band | L246 |
| Product imagery | real UI captures or rights-cleared photos; never grey bars; wide boxes get wide cinematic compositions | L384, L403 |
| Closing CTA | its own section, separated from the footer by one full-width divider; the brand's field on one side, dissolving toward the copy | Kaching |
| Footer | brand column + up to 5 link columns, a slim utility row, then full-width artwork (brand wordmark or symbol); no "Back to top" | Kaching |
| Mobile | its own composition: one switch at 767/768; equal-height bento cells; touch targets >= 40px via invisible hit areas; balanced heading lines | L242; Kaching |
| Motion | none unless asked; if asked: scroll reveals on meaningful blocks only (Kaching `Reveal`: <= 28px travel, 80ms stagger, LCP text never at opacity 0), each product visual its own build-in | L207, L512; Kaching |
| Revisions | one visual at a time, side-by-side with its approved original | L250 |

## Contradictions resolved
- **Rhythm vs density:** a site follows the shipped rhythm (Kaching rails and dividers) and the section canons; the hero density rules apply to the fold only.
- **Reference use (audit 4.1):** a friend brand's signature section (Commslayer founders' letter) is never reproduced identically; take the idea and change structure, material and copy rhythm (L219). Replication is calibration only, see `INDEX.md`.

## Never (rejected, with evidence)
- Building a full page when the hero was asked (Quorum v1, Kite landing: L253, L424).
- Three visual styles of colour, effect and roundness across one site's visuals (Kaching round 2, L199).
- A mirrored or resized bento on one sibling page (L203).
- A section that is identical to a friend brand's (Kaching founders' letter, L219).
- Small centred node diagrams in wide boxes (Kaching MCP, L384).
- Double dividers (bottom border + next top border); rails drawn over artwork (Kaching; L74).

## Pre-delivery checklist
1. Scope: sections built == sections named.
2. Hero fold passes its hero canon gate; every bento passes `section-bento.md`.
3. Site-wide census: shadow strings <= 3, radii on one ladder, one sans family (+ mono), one primary and one secondary button recipe, h1 sizes identical across secondary pages.
4. Divider audit: no doubled horizontal rules; rails stop before artwork.
5. Sibling page rects identical at 1440 / 768 / 375.
6. 320, 390, 540, 768, 900, 1024, 1440: no horizontal overflow, no clipped labels, touch >= 40px.
7. Dark sections contain only dark visuals.

## Open
- No full multi-section site of our own (non-Kaching) has been accepted; section padding and section-head scale for new brands come from Kaching, Capto and Cadence v3 only.
- Footer grammar for brands without a wordmark artwork: no verdict.
