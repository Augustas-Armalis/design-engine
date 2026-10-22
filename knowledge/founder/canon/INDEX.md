# Founder canon: index

The canon is the settled answer per kind of work. `knowledge/founder/founder-taste.md` stays the evidence log (verbatim verdicts, append-only); the canon pages are the decided defaults built from it and from the accepted builds. When a canon page and an older founder-taste line disagree, the canon page wins, because each page lists the lines it supersedes. Machine-readable numbers live in `system/canon/<kind>.json` (same basenames), and the gate reads those, so the docs and the checks cannot drift.

## Pages

| Page | Kind of work | Floor reference(s) | JSON |
|---|---|---|---|
| `hero-light.md` | light SaaS hero (one 1440x900 fold) | Quorum v6.6 (split, default), Kestrel (centred, alternate) | `system/canon/hero-light.json` |
| `hero-dark.md` | dark SaaS hero | Kite final hero | `system/canon/hero-dark.json` |
| `section-bento.md` | feature section / bento | Cadence bento v3 (`git show 1c22c95`), Kargul services-bento replica, Kaching bento | `system/canon/section-bento.json` |
| `product-ui.md` | our own app screens and hero dashboards | Ferry v3, Quorum app, Kestrel dashboard, Kite dashboard, Kargul replicas | `system/canon/product-ui.json` |
| `client-app.md` | UI inside an existing client app (Sellify) | Sellify Video Ad Creator studio kit | `system/canon/client-app.json` |
| `post-component.md` | X / social component post | Tandem approval-request component; Flo / Marcel / Kuleszo refs | `system/canon/post-component.json` |
| `logo.md` | logo mark and lockup | traced Quorum, Kestrel, Kite marks | `system/canon/logo.json` |
| `audit.md` | review and fix of existing work | Kaching r29 `REVIEW.md`, consistency contract K0-K18 | `system/canon/audit.json` |
| `motion.md` | motion, only when asked | Kite showcase wave, Kite dashboard load-in, Kestrel | `system/canon/motion.json` |
| `full-website.md` | multi-section landing or site | Kaching homepage, Capto | `system/canon/full-website.json` |
| `branding.md` | brand system: mark, palette, type pair, voice, application sheet | Kaching identity; traced fictional brands | `system/canon/branding.json` |
| `designers-eye.md` | every kind, before delivery: the hunt list for half-faded, clipped, crossed and leaking things (DE-01..10) | the eight FX effect replicas (FX-16), Tempra h4a | gate checks `align/crop.text-crossing`, `align/crop.text-half-faded` |

Every page has the same shape: floor references, a 5-file reading set, decided numbers, contradictions resolved (with superseded lines), a never list, a pre-delivery checklist, and an "Open" list for questions the founder has not settled. Open questions are left out of the JSON on purpose.

## The rule that keeps it settled

**When a new verdict reverses a canon value, edit the canon value in place (page and JSON in the same commit) and append the verdict to `founder-taste.md` with `supersedes: L<n>` (or `supersedes: canon/<page> <value>`).** Never stack a second, contradicting rule. A verdict that adds something new (no reversal) goes into founder-taste as usual and into the matching canon page's table or never list in the same session. A canon value with no founder line or accepted build behind it is a bug: cite it or delete it.

## Citation conventions
- `L<n>` = the line of the RULE bullet in `knowledge/founder/founder-taste.md` as of 2026-10-21 (530 lines). Lines are stable because the log is append-only; if it is ever reflowed, re-map the citations in the same commit.
- `SDP L<n>` = `knowledge/founder/sellify-design-pass.md`. `playbook` = `knowledge/founder/feedback-playbook.md`.
- Ledger ids are file names in `ledger/entries/` without `.json` (e.g. `2026-10-15-quorum`).
- HC-, KMD-, BN-, ISO-, XP-, K- ids are rules in the studied notes named on each page.

## How the gate reads `system/canon/*.json`
- Ranges are `[min, max]`, inclusive.
- `radiusLadder` keys are rendered element-height bands in px, `"lo-hi"` = lo <= height < hi. Values are the allowed visible radius range. **Capsules and circles (radius >= height/2) are exempt** (L373). With `corner-shape: superellipse` active, compare `authored radius / 1.2` (L373 "author radii about 1.2x larger").
- `maxFontFamilies` counts every family in the fold, a mono included.
- `maxAccentHues` counts hue families of filled controls, selection, links and data marks; categorical tag chips drawn as tint pairs and photos are excluded (Quorum: "tag colours appear only on tags").
- `canvas.maxChroma` is OKLCH C of the page background (not the product stage).
- `maxColourfulPixelShare` = share of fold pixels with OKLCH C > 0.08 (dark-mode-premium method).
- `hero.ctaProductGapPx` is CTA-row bottom to the next element below it (the product frame when centred, the composer when split).
- `motionDefault: "none"` means a deliverable is a still unless DIRECTION says `motion: asked` with the founder's words.

## The 13 contradictions (audit 4.1), decided

| # | Topic | Default | Alternative only when | Page |
|---|---|---|---|---|
| 1 | Headline tuple | Inter display, 550, -0.045em: 58px split (Quorum), 68-72px centred (Kestrel 72, Kite 68), one colour | 52/500 only on a founder-confirmed "minimal" brief | hero-light, hero-dark |
| 2 | Chip above h1 | off | the brief names an announcement: custom pill, dropped first when tight | hero-light |
| 3 | Hero button | light: tactile ink r12-14 + raised white, 44-48, secondary text-only; dark: the product's own 44px pills | pill in light only when the product's buttons are pills | hero-light, hero-dark |
| 4 | Nav | plain text links, text-only nav CTAs (light); text links + one 36px white pill (dark) | Kaching pill nav on Kaching work or as a declared owned decision | hero-light, hero-dark |
| 5 | Default light hero | Quorum split | Kestrel centred when the previous light build was a split | hero-light |
| 6 | Default dark hero | Kite final (centred, product-element backdrop) | measured-reference replication after two rejects, as calibration | hero-dark |
| 7 | Dark light | no glows or light fields | one rendered field only if named as the signature and approved as a still | hero-dark |
| 8 | Product density | one view at Kargul detail: <= 3 regions, >= 10 data points, >= 8 rows, <= 12 components | none | product-ui |
| 9 | Background | one quiet layer: Quorum stage behind the product / rail dot grid (light); soft monochrome product-element map (dark) | a bespoke field only behind the product, named in DIRECTION | hero-light, hero-dark |
| 10 | Motion | none; screenshots | `motion: asked`: expo-out, settle 2.5s, one reveal + <= 3 groups | motion |
| 11 | Bento | Kargul services-bento grammar in light (Cadence v3 + ISO-31..38), product's own objects, one accent on the answer | Kaching product-visual bento for animated product cells | section-bento |
| 12 | Reference use | replicate a rated reference only as a calibration artefact (overlay until it registers); the deliverable is our content on the canon floor + 1-3 owned touches; structure, material and copy rhythm differ from a friend brand's section | — | all (L219, L506, L512) |
| 13 | Diversity vs floor | the canon floor is fixed (type tuple, spacing, edges, button construction); divergence = layout-family alternation between accepted families + at most 3 owned decisions (button effect, product world, stage material, nav construction); type voice is never randomised for SaaS; rejected options (didone-luxe, warm-black, tilted-3d at rest, offset/brutal buttons, mono poster, 700 headlines) are never dealt | a new layout family once the founder asks for "something completely different", still on the floor | all (L138, L182, L253, L506) |

Superseded lines per decision are listed on each page under "Contradictions resolved".

## Hard rule (founder 2026-10-22): never copy names, logos or copy
"NEVER EVER COPY THE SAME LOGO OR LIKE COPY OR EVEN NAME... that's plagiatory, especially getting stuff from Marcel... that's why it's important to make ur own stuff". Replicas are study only and stay out of deliverables. Every deliverable invents its own:
- brand name and workspace or company names;
- logo mark;
- headline and every line of copy;
- people and sample data.

Names come from nowhere near a reference: no client names from Marcel, Rico or lunor shots, and no stock sample brands (Northwind, Acme, Contoso). Take the structure and numbers from a reference, never its words or marks.
