---
source: web:jessicahische.is (MailChimp, RetailMeNot refreshes), pentagram.com (Slack, Mastercard), creativereview.co.uk (Deliveroo/DesignStudio, OpenAI, Wise, Monzo), johnsonbanks.co.uk + blog.mozilla.org/opendesign (Mozilla routes), underconsideration.com/brandnew (Koto Bolt podcast transcript ep. 064), paulrand.design (NeXT), designobserver.com (Bierut, H), logodesignlove.com (Geismar, Haviv interviews), atlassian.com/blog (2011 redesign), design.google (Google identity 2015), glyphsapp.com/learn/drawing-good-paths, help.fontlab.com (Curve Tension; Briem curve module), ohnotype.co/blog/drawing-vectors, scannerlicker.net (Bezier OCD; Art of Eyeballing IV), figma.com/blog (Desperately seeking squircles; The story of Figma Sans), spencermortensen.com (Bezier circle), slate.com (Frere-Jones, Typeface Mechanics), emails.typography.com (Hoefler&Co), cms.myfonts.com (de Rozario, optical illusions), logogeek.uk, m2.material.io (product icon keylines), abcdinamo.com/custom (Discord, Tumblr, Patreon, IOC), typotheque.com (Mozilla), replit.com/blog/new-logo, granola.ai/blog, review.firstround.com (Lovable), linear.app/docs/brand-guidelines, cursor.com/brand, velvetshark.com, thedrum.com (Rob Pratt), logosystem.co (25 close reads), github.com/pheralb/svgl (61 SVGs measured)
chapter: Logo drawing: how studio-grade marks are explored, drawn with Bezier curves, optically corrected and refined, and what separates a brand mark from a pictogram
pages: n/a (captured 2026-10-10; process screenshots in knowledge/benchmarks/logos/process/ with CREDITS.md; curve data in knowledge/benchmarks/logos/process/curves-measured.json from tools/logo_curves.mjs)
topic_tags: [logo, mark, wordmark, drawing, bezier, curve-tension, curvature, G2, extrema, superellipse, taper, ink-trap, overshoot, optical-correction, refinement, exploration, signage, pictogram, brand-mark, small-size]
status: studied
---

# Logo drawing

Why this note exists: the founder rejected the Tandem finalists ("pretty awful"): a disc cut by a T of slits, two half discs, circles in a row (`work/tandem/brand/finalists.png`). They passed every measured check in `logo-craft.md` (LG-01..28) and `logo-anatomy-measured.md` (LA-01..20) and still read as road signs or clip art. Those notes covered taxonomy and numbers. This one is about how good marks are drawn: the process studios follow, the Bezier discipline type designers teach, the optical corrections, and what a brand mark has that a pictogram lacks. The method that turns it into steps is `system/logo/drawing-method.md`; the tools are `tools/logo_curves.mjs` (curve anatomy, dependency-free) and `tools/logo_drawkit.cjs` (paper.js drawing kit).

Evidence grades: **[measured]** = from `tools/logo_curves.mjs` on shipped SVGs; **[source]** = what a studio, designer or tool vendor wrote or showed; **[eye]** = my reading of the captured images; **[engine note]** = interpretation.

## 1. Core ideas

1. **The Tandem marks failed on idea and drawing, not on numbers.** A letter centred in a disc, mirror-symmetric, built from untouched circle arcs and rectangles with one stroke weight, is exactly how transit and road signs are built (a letter or pictogram in a circle or square, one reading, no motion) [engine note]. Measured: every Tandem finalist is 100% circle arc (tension ratio 1.00, `drawnShare` 0) with 4-8 nodes [measured].
2. **Studios explore wide, then converge, then refine for a long time.** Bierut's team "explored dozens of symbols" for the H (designobserver.com). Pentagram drew 28 octothorpe variants for Slack at one size (`process/08`). DesignStudio filled a wall with kangaroo sketches (`process/07`). Johnson Banks went from 7 routes to 4 to 1 for Mozilla in about 7 months (`process/10`). Koto showed Bolt 4 directions in a first deck of about 150 pages, then a 90-page refinement deck where the client saw what happens when an angle changes 2% (Brand New podcast ep. 064 transcript). BankerWessel's process book holds 1,500+ annotated sketches across 14 projects (counter-print.co.uk) [source]. The engine drew 6-8 candidates and shipped variants of one idea.
3. **The idea is sketched; the curve is drawn; the two are different jobs.** Geismar sketches on paper because a computer "leads very quickly to a sharply defined object" (logodesignlove.com); Haviv answers "always" to pencil first [source]. Hische vectorises over the sketch and then rebuilds every stroke (`process/05`). The engine's equivalent of the pencil is a cheap parametric thumbnail sweep (30+ silhouettes, judged black at 64px); its equivalent of the vector stage is node-by-node Bezier drawing with measured tension.
4. **Type designers' Bezier discipline is the drawing standard.** Nodes on extrema with horizontal or vertical handles, explicit nodes at inflections, the fewest nodes possible, no zero-length handles, handles that never cross (Glyphs' "magic triangle"), balanced handles within a segment, inner contours at higher tension than outer (glyphsapp.com, help.fontlab.com, ohnotype.co, scannerlicker.net) [source]. A circle is 55.2% handle tension; type curves usually sit from just under 60% to above 70% (Glyphs) [source].
5. **Curve tension is the measurable difference between drawn and compassed.** Of 76 shipped tech marks, 16 are straight-only, 26 are compass-built (curved length <= 15% non-circular: Linear, Slack, Figma, Clerk, OpenAI, Supabase, Mastercard, Cursor, Lovable, PostHog, Replit), 19 are drawn (>= 50% of curved length at custom tension: Apple, Notion, Granola, Ramp, Railway, Webflow, Tailwind, Warp, Resend, Runway, Deno, Astro, Threads, Instagram) and 15 mixed. Drawn marks run a median tension ratio of 1.05 against the circle (about 58% Tunni), p90 1.03-1.56 [measured]. So geometry alone does not doom a mark: a third of shipped marks are compass-built. When a mark is compass-built, the idea has to live in the composition (Linear's offset bands, Slack's rotated capsule-and-dot module, Mastercard's overlap colour).
6. **Curvature continuity is what makes a corner feel expensive.** A rounded rectangle's curvature jumps from 0 to 1/r at the tangent point; the iOS squircle ramps it up and down (Figma blog, `process/21-22`) [source]. Measured: compass-built marks have a curvature jump at a median 66% of their smooth curve joins. In the drawkit, `filletOuter(..., { mode: 'continuous' })` puts both handles on the corner vertex so curvature is zero where the curve meets each straight; `logo_curves` then reports 0 jumps, against 8 of 8 joins for a circular fillet on the same square [measured].
7. **Optical correction is done by eye after the geometry.** Rounds overshoot flats, points overshoot more, gentle curves less (Frere-Jones). Horizontals are thinner than verticals (about 1% for Scannerlicker, about 7% in the *Vision* study Hoefler reports). An O is "fractionally narrower and taller" than a circle and a true equilateral A looks too wide (de Rozario, MyFonts, `process/23-25`). Material's product icon keylines make a square 152dp where a circle is 176dp so they look the same size. A Google G forced onto perfect guides looks worse than the shipped one (Logo Geek, `process/26`) [source].
8. **Joins are thinned, not just overlapped.** Hische's MailChimp refresh marks every overlap where strokes were thinned (`process/02`); RetailMeNot removes "unnecessary roundness at stroke connections" and unifies stroke angles (`process/04`). Type Drawers posters prefer tapering incoming strokes to carving ink traps at display size [source].
9. **Refinement is its own phase with its own outputs.** Hische's MailChimp went through seven numbered passes: lighter weight and cleaner vector, opened counters, fixed connections, straighter baseline, tapered joins, a narrower C and a disconnected l, no inky spots (jessicahische.is). Google refined the G against an "overbite" and added weight for small sizes (design.google). Pentagram's Mastercard went through "hundreds of tests" on hue [source]. The engine has no refinement phase; it goes from candidate to verdict.
10. **A brand mark carries at least two readings or signals; a pictogram carries one.** In the 25 close reads below, every strong mark has a double reading (Pengdeck's P is a keyhole, Ballstar's b holds a star, Jinxed's disc becomes a swoosh), a tilt or offset that implies motion (Bonia, Swell, Sybil), weight contrast (Jinxed, Sybil), or a custom curve with visible tension (Multiple, Gobji, Granola). None is a letter centred in a container [eye].
11. **Premium SaaS in 2024-26 leads with the wordmark and keeps the symbol earned.** Linear's brand guidelines treat the wordmark as more recognisable than the mark; Cursor prefers the cube-plus-wordmark lockup; OpenAI's 2025 refresh made the wordmark more prominent in a bespoke face (OpenAI Sans, with ABC Dinamo) and redrew the blossom with even strokes. Figma kept its wordmark close to Figma Sans after stylised versions "all felt wrong" (figma.com/blog). Symbols that work are taken from something the product already owns: Replit's prompt, Perplexity's citation asterisk, OpenAI's cursor dot, Stripe's i-dot slash [source].
12. **The 2025-26 premium signal is controlled imperfection on top of precise optics.** Granola's G is drawn loose and "slightly imperfect" on purpose (Ragged Edge, 2026); OpenAI's O is a perfect circle outside with an irregular inside; commentary (VelvetShark 2025, Rob Pratt in The Drum 2026) names the round gradient blob with radial symmetry as the AI cliché [source]. Measured: Granola's mark has 56 inflections and 14 near-tangent kinks, a hand-drawn signature, while Claude's asterisk is 100% straight segments with 44 small angle changes, hand-cut [measured].

## 2. Rules (LD-01 to LD-30)

### Process

- **RULE** LD-01 Before drawing, write 8-12 one-sentence concepts drawn from at least 4 different sources: a letterform, a product-owned primitive (something the product already shows: a cursor, a prompt, a footnote, a status dot), a verb or motion, the name's meaning, and a negative-space double reading.
  **Why** Studios explore "dozens" of symbols (Bierut) and 4-7 routes (Koto, Johnson Banks) before converging; the engine started from one idea and drew variants of it. **Applies to** all marks. **Check** `work/<name>/brand/CONCEPTS.md` lists >= 8 concepts tagged with their source type, >= 4 types. **Source** designobserver.com (H); Brand New ep. 064 (Koto Bolt); johnsonbanks.co.uk (Mozilla).
- **RULE** LD-02 Sketch at least 30 silhouette thumbnails across at least 4 generator families (superellipse cut, stroke sweep, letter skeleton, radial module, mass with a bite) before refining anything, and judge them black on white at 64px plus 2px-blurred at 32px.
  **Why** Volume finds the idea; refinement only polishes it. Detail at 256px hides that a silhouette is generic. **Applies to** all marks. **Check** `work/<name>/brand/sweep.png` exists with >= 30 cells, rendered by `renderSheet()` in `tools/logo_drawkit.cjs`. **Source** process/07, 08, 13 (Deliveroo wall, Slack octothorpes, Atlassian sheet); BankerWessel 1,500 sketches / 14 projects.
- **RULE** LD-03 Converge to 3-4 routes that are different ideas, not variants of one. Merging two routes is allowed and common.
  **Why** Koto presented 4 directions, Johnson Banks 7 then 4, Slack 8 route boards; Atlassian's final merged two options. **Applies to** presentation. **Check** the routes in `present.png` come from >= 3 different concept sources (LD-01 tags). **Source** process/09, 10; atlassian.com/blog 2011.
- **RULE** LD-04 Run a documented refinement phase on the chosen route: a refinement sheet with 6-12 side-by-side variants in small steps (angle +-2-5 deg, tension ratio +-0.03-0.05, stroke +-3-5%, cut position +-2% H), judged at 256, 32 and 16px.
  **Why** Koto's Bolt refinement deck was 90 pages and showed the client a 2% angle change; Hische's MailChimp took 7 named passes. **Applies to** the chosen mark. **Check** `work/<name>/brand/refine-*.png` exists; DIRECTION.md says which step won and why. **Source** Brand New ep. 064; jessicahische.is/monkeyingaround.

### Drawing

- **RULE** LD-05 Draw strokes and masses, then outline them; never assemble the final silhouette from untouched circles and rectangles. A stroke = spine + width profile; a mass = superellipse or polygon with designed corners.
  **Why** "Trace the strokes, not the perimeter" (OH no); the Tandem marks were assembled primitives and read as signage. **Applies to** all marks. **Check** the mark source in `marks.mjs` uses `sweep()`, `superellipse()` or drawn paths from `tools/logo_drawkit.cjs`, not only `<circle>`/`<rect>`; `logo_curves` `drawnShare` > 0 on curved marks, or LD-22 applies. **Source** ohnotype.co/blog/drawing-vectors; founder 2026-10-10.
- **RULE** LD-06 Default curve tension for drawn outer contours: tension ratio 1.05-1.27 against a circular arc (about 58-70% Tunni handle); counters and inner contours 0.03-0.05 higher than the outer contour around them.
  **Why** Circles sit at 55.2%; type curves run just under 60% to above 70%; drawn shipped marks median 1.05, p90 up to 1.2-1.5. Inner contours need more tension or the stroke bulges thick on the diagonals. **Applies to** drawn marks. **Check** `logo_curves` `tension.median` in 1.03-1.30; for marks with counters, the counter's tension is higher (inspect `--json`). **Source** glyphsapp.com; help.fontlab.com Curve Tension; curves-measured.json.
- **RULE** LD-07 Nodes on extrema with horizontal or vertical handles; an explicit node at every inflection; corners only where a corner is meant; no zero-length handles; handles never cross (each segment inside its handle triangle); the fewest nodes that hold the shape.
  **Why** Extrema nodes make curves predictable to edit, rasterise cleanly and keep tension readable; extra nodes cause wobble. **Applies to** engine-drawn marks (exported shipped SVGs do not keep this: measured median 46% of smooth curve nodes on extrema, because exporters rebuild paths). **Check** `logo_curves`: `extremaOnNodes` >= 0.9 and `missingExtrema` = 0 after `addExtrema()`. **Source** glyphsapp.com/learn/drawing-good-paths; scannerlicker.net Bezier OCD; process/15-17.
- **RULE** LD-08 No kinks: every join is either a deliberate corner (turn > 12 deg) or smooth (<= 1.5 deg).
  **Why** A near-tangent join reads as a mistake at large size and a bump in the outline. Shipped kinks exist (Airbnb 20, Granola 14) mostly as export or hand-drawing artefacts. **Applies to** engine-drawn marks unless DIRECTION.md declares a hand-drawn texture (LD-29). **Check** `logo_curves` `joins.kink` = 0. **Source** Glyphs; curves-measured.json.
- **RULE** LD-09 Keep handles balanced within a segment unless the tension is meant to shift along the curve; use unbalanced handles deliberately to move the "shoulder" of a curve.
  **Why** Unbalanced handles are FontLab's example of an uneven curve (process/18); Apple's leaf and bite are the counter-example where imbalance is the drawing (balance 0.525). **Applies to** drawn marks. **Check** `logo_curves` `balance` <= 0.15, or DIRECTION.md says which curve is shifted and why. **Source** help.fontlab.com; ohnotype.co; curves-measured.json (apple).
- **RULE** LD-10 Where a straight edge runs into a curve on a visible corner, blend it with a continuous corner (`filletOuter(..., { mode: 'continuous', spread: 1.4-2.0 })`), not a circular fillet.
  **Why** A circular fillet's curvature jumps from 0 to 1/r, which reads as "rounded rectangle"; the squircle ramp reads as drawn (iOS icons, process/21-22). **Applies to** rounded corners >= 0.25 stroke radius. **Check** `logo_curves` `g2.curvatureJumps` / `g2.smoothCurveJoins` <= 0.3. **Source** figma.com/blog/desperately-seeking-squircles.
- **RULE** LD-11 Use superellipse bowls for letter-derived and organic forms: n 2.1-2.6 (handle tension 0.58-0.70, the type range) for bowls and counters, up to n 3.2 (0.81) for squarish slabs; use a true circle (n 2) only when the circle itself is the idea (Mastercard, Spotify, a dot).
  **Why** A circle next to straights looks small and mechanical; drawn bowls are fuller at the shoulders (O narrower and taller than a circle). **Applies to** bowls, counters, rounded masses. **Check** `superellipse()` used with n != 2, or a written reason for a circle. **Source** cms.myfonts.com (de Rozario); tension measurements.
- **RULE** LD-12 Give a drawn mark controlled weight modulation: taper 20-60% toward free terminals, or pinch 10-25% where strokes join; keep monoline only as a deliberate voice.
  **Why** Weight contrast is the calligraphic signal that separates a drawn mark from a pictogram (Jinxed thick-to-thin ring, Sybil's curls); Hische thins strokes at every overlap. **Applies to** stroke-built marks. **Check** the `sweep()` width profile in `marks.mjs` is not constant, or DIRECTION.md declares monoline. **Source** process/02; close reads Jinxed, Sybil, Gobji.
- **RULE** LD-13 Cut terminals on the mark's angle system, not automatically perpendicular to the stroke, and use one terminal rule for the whole mark.
  **Why** Angled cuts carry direction (Beron and Gobji end on oblique cuts; Multiple ends flat on the baseline); mixed terminal rules look assembled. **Applies to** stroke ends. **Check** every terminal angle in the spec is 0, 90 or the declared tilt. **Source** close reads Beron, Gobji, Multiple, Bonia.
- **RULE** LD-14 At junctions, thin the incoming strokes first (`profiles.pinch`); add ink traps (`inkTrap()`, depth 0.15-0.3 stroke, width 0.08-0.15 stroke) only for marks that must work at 24px and below with crotches tighter than 0.6 stroke, and place them at computed crotch points.
  **Why** Display-size traps read as flaws to type designers; tapering keeps joins even. Guessed coordinates leave slivers (verified in the drawkit test). **Applies to** joins of two strokes. **Check** crotches come from `crotches(a, b)`; no ink trap on a mark whose smallest use is >= 32px unless styled on purpose. **Source** Type Drawers via high-logic.com; process/02, 04.

### Optical correction

- **RULE** LD-15 Overshoot rounds 1-3% of height beyond the flats they sit with and points 3-5%; gentle curves overshoot less than tight ones.
  **Why** Rounds and points touch the line over less length and look short. **Applies to** all marks with mixed round and flat parts, and their wordmark. **Check** spec lists the overshoot; bbox of round parts exceeds the flat reference by 1-3%. **Source** Frere-Jones (Slate); Monotype support on overshoots; Karow via logo-craft LG-17.
- **RULE** LD-16 Make horizontal strokes 3-7% thinner than vertical ones and diagonals in between; curves slightly heavier than straights at their thickest point.
  **Why** Equal measured strokes make horizontals look heavy (*Vision* study: about 7%; Scannerlicker: about 1% in type; process/28). **Applies to** stroke and bar marks. **Check** spec gives separate H/V stroke values. **Source** emails.typography.com 2019-01; scannerlicker.net Art of Eyeballing IV.
- **RULE** LD-17 Equalise different primitives by eye, not by bbox: a square beside a circle is about 0.86 of the circle's diameter; centre the mark on its optical centre (slightly above the geometric centre) inside favicons and avatars.
  **Why** Material's product icon keylines use a 176dp circle and a 152dp square to look equal. The optical-centre offset is real but no reliable percentage was found. **Applies to** multi-primitive marks, app icons, avatars. **Check** spec states the equalisation; centre offset 0-3% H [engine note]. **Source** m2.material.io/design/iconography; typedrawers.com.
- **RULE** LD-18 After construction, correct by eye and record what changed: any construction value may move if the 256px and 32px renders look better, and the "perfect" version is kept only if it wins side by side.
  **Why** A G forced onto perfect guides looks worse than the optically drawn one; Google corrected a visible overbite where the bar meets the bowl. **Applies to** all marks. **Check** the refinement sheet (LD-04) includes the as-constructed version beside the corrected one. **Source** logogeek.uk (process/26); design.google/library/evolving-google-identity.
- **RULE** LD-19 Draw the inverse (white on dark) separately, thinned 2-4% of stroke, and check it on the build's dark canvas.
  **Why** Irradiation makes white on black look bolder (process/27). **Applies to** dark builds, app icons. **Check** a `-inverse` variant exists or the spec states the thinning. **Source** logogeek.uk; logo-craft LG-18.

### Brand mark, not signage

- **RULE** LD-20 Fail the "signage test" and redraw if the mark is any of: a letter or pictogram centred in a circle, square or shield; mirror-symmetric with every edge at 0/90 deg and every part static; built only from circle arcs and rectangles at one uniform stroke; readable in only one way.
  **Why** That is the construction of transit and road signs (a letter in a disc) and of the rejected Tandem T-cut and Halves [engine note]. **Applies to** all marks. **Check** visual + `logo_curves` (`drawnShare` = 0 and one stroke value trigger a review); DIRECTION.md answers the four questions. **Source** founder 2026-10-10 (Tandem round 1); close reads below.
- **RULE** LD-21 Every mark carries at least two brand-mark signals: a double reading (letter + object, figure + ground), asymmetry with balance, implied motion (a tilt of 8-25 deg, a taper, an offset repeat), weight contrast, a custom curve with visible tension, a cut at a non-obvious angle, or a product-owned primitive.
  **Why** Each of the 25 strong marks below has two or more of these; the Tandem marks had at most one. **Applies to** all marks. **Check** DIRECTION.md names the two signals and where they are in the drawing. **Source** close reads (section 3).
- **RULE** LD-22 A compass-built mark (circle arcs and straights only) is allowed when the composition is the idea: state the exact relationships (one radius ratio, one angle, one gap) and still meet LD-21 through asymmetry, motion or a double reading.
  **Why** 26 of 60 curved shipped marks are compass-built (Linear, Slack, Figma, Mastercard, Clerk, OpenAI, Supabase); they carry offset bands, rotation, colour overlap or a lettered reading. **Applies to** geometric marks. **Check** `override: LD-05 because <composition idea>` in DIRECTION.md plus the stated relationships. **Source** curves-measured.json; logo-anatomy-measured.md pattern 10.
- **RULE** LD-23 Take the symbol from something the product owns (an interface element, a behaviour, a word in the name), never from the category's picture (sparkle, brain, chat bubble, shield, round gradient blob).
  **Why** Replit's prompt, Perplexity's footnote asterisk, OpenAI's cursor dot and Stripe's i-dot slash all come from the product; the round gradient blob with a central opening is the named 2025-26 AI cliché. **Applies to** symbols. **Check** CONCEPTS.md tags the winning concept with its product source. **Source** replit.com/blog/new-logo; ebaqdesign.com (Perplexity); creativereview.co.uk (OpenAI); velvetshark.com; thedrum.com (Rob Pratt).

### Wordmark and lockup

- **RULE** LD-24 Lead with a wordmark unless the brief needs a symbol (app icon, avatar, a product primitive worth owning); when a symbol ships, it must pass at 16px as a favicon.
  **Why** Linear and Cursor's guidelines favour the wordmark or lockup; OpenAI promoted its wordmark; Lovable's first 3D heart failed as a favicon. **Applies to** brand decisions. **Check** DIRECTION.md states the reason for a symbol; favicon render passes LG-25. **Source** linear.app/docs/brand-guidelines; cursor.com/brand; review.firstround.com (Lovable).
- **RULE** LD-25 Build a custom wordmark from a characterful base face plus 1-3 surgical edits (one letter's width, an ascender cut to cap height, a severed join, a recut letter, a negative-space cut, a custom weight between instances, a ligature), outlined with `setWord()` and edited as paths.
  **Why** That is how Figma, Discord, Lyft, Bolt, Dropbox, Mozilla and Tumblr were made (section 5); more than three edits turn a wordmark into a display face. **Applies to** wordmarks. **Check** DIRECTION.md names the base face and lists <= 3 edits; the wordmark SVG is outlines, not live text. **Source** abcdinamo.com/custom; figma.com/blog/the-story-of-creating-figma-sans; typotheque.com.
- **RULE** LD-26 Space the wordmark optically: kern pairs by area, tighten tracking 1-3% at display size, review it upside down and at 16-24px, and set the mark-to-first-letter gap separately.
  **Why** Mackey Saturday flips logotypes upside down to judge spacing; metric spacing leaves holes around round and diagonal letters. **Applies to** wordmarks, lockups. **Check** per-pair spacing values in the spec; render upside down in the refinement sheet. **Source** skillshare.com/en/blog/designing-a-logotype-with-mackey-saturday (search summary); logo-craft LG-23.
- **RULE** LD-27 Draw a small-size cut for 16-24px: open counters, heavier strokes (+10-20%), wider gaps and spacing, fewer parts; it is the same mark, redrawn, not a different one.
  **Why** Hische's RetailMeNot has a separate small version (wider spacing, larger x-height, open counters); Google added weight for small sizes; Firefox 2013 was rebuilt for small screens. **Applies to** favicons, nav, avatars. **Check** `<name>-mark-small.svg` exists when the main mark fails LA-04/LA-05 at 16px. **Source** jessicahische.is/ashopaholic; design.google; blog.mozilla.org/creative 2013.

### Presentation and measurement

- **RULE** LD-28 Measure every engine-drawn mark with `node tools/logo_curves.mjs` and record nodes, kinks, extrema discipline, tension median and `drawnShare`, and curvature jumps in DIRECTION.md next to the `logo_measure` numbers.
  **Why** The silhouette checks (LA-*) cannot see how a curve is drawn; the founder's rejection was about drawing. **Applies to** all engine marks. **Check** DIRECTION.md has a `curves:` line. **Source** this note, section 2.
- **RULE** LD-29 Imperfection is allowed only as a declared voice applied consistently (a hand-drawn wobble, an irregular counter, a pixel step); random irregularity is a defect.
  **Why** Granola's deliberately imperfect G and OpenAI's irregular O interior are designed; uneven nodes from a careless trace are not. **Applies to** hand-drawn or "human" marks. **Check** DIRECTION.md declares the voice; the irregularity repeats with one logic. **Source** granola.ai/blog/a-new-look-for-granola; creativereview.co.uk (OpenAI refresh).
- **RULE** LD-30 Show the chosen mark the way studios do: the route board, the refinement sheet, the mark on a brand field with real context (colour field, product, photograph), the lockup and the scale ladder, next to 6 logosystem references on the same field.
  **Why** Every studio case study captured shows process and context; a mark alone on white at 256px hides both pictogram-ness and small-size failure. **Applies to** founder reviews. **Check** `present.png`, `refine-*.png` and a reference comparison sheet exist before asking for a verdict. **Source** process/08-10, 14; founder-taste (logo presentation rule).

## 3. Close reads: 25 marks that look drawn, and why they do not read as signage

Images: `knowledge/benchmarks/logos/process/closeread-logosystem-sheet.png` (21 of them) and `knowledge/benchmarks/logos/logosystem-gobji.png`, `-beron.png`, `-granola.png`, `-daimon.png`. Credits in the CREDITS files. Most are designer concepts, not shipped brands; they show drawing craft, not adoption. All readings are [eye] from 1000px detail images.

| Mark (designer) | Silhouette idea | Where it is geometric / where it has tension | The one owned detail | Why it is not signage |
|---|---|---|---|---|
| Multiple (Landscape) | An m as two domed shoulders whose middle stroke is an S-wave | Baseline and stems cut flat; the domes are fuller than circle arcs (squarer shoulders); one inflected S-curve between them | The wave in the middle stroke makes the m read as motion | Asymmetric, two readings (m + wave), no container |
| Apoxy (Jdreeves) | An A as a stepped slab mass | Outer corners softened at one small radius, inner junction sharp | The step on the right turns the A into a skyline/stair | Mass with directional asymmetry; the soft-outside/sharp-inside rule is drawn |
| Bonia (Sipouquillium) | A b as a tilted elliptical ring pierced by an oblique stem | Ring is an ellipse at about -15 deg, not a circle; stem off-vertical | The stem crossing the ring like a thrown hoop | Tilt and perspective imply motion; no axis-aligned edge |
| Swell (Nezs) | An S of two parallel bands offset like a wake | Tight continuous corners; bands keep one width | The offset second band (speed lines) | Repetition with offset = motion; reads S and wave |
| Sybil (Fabian Arbor) | Two parallel 60 deg slabs, each ending in a curled terminal | Straight slabs, but curls are teardrop terminals with taper | The curls turn a slash pair into an S and a % | Weight contrast and calligraphic terminals; rotational, not mirror, symmetry |
| Pengdeck (Dominic Marizu) | A P whose counter is a keyhole | Superelliptic bowl, soft corners | The keyhole counter | Double reading (P + lock) |
| Framed (Amprako) | A disc out of which an r/n arch and its offset echo are cut | Disc and concentric arches (compass-built) | The doubled arch reads as a frame and depth | Compass-built but the cut is an asymmetric letter running off the disc's edge (LD-22) |
| One Stack (RD Farhad) | Two blocks tumbling, in pseudo-3D | Rounded outer corners, mitred joins, off-axis tilt | The top block caught mid-fall | Implied motion and depth; no symmetry |
| Opera concept (Vadim Carazan) | A torus with an offset inner opening | Ellipse counter offset from centre, gradient shading | The offset hole that makes the ring turn | Offset counter = rotation; works flat as a crescent ring |
| Amina (Studio Oker) | A square with a D-shaped counter offset right | Pure primitives | The counter is half disc + rectangle, reading as an eye or "a" | Figure/ground double reading; the offset breaks symmetry |
| Ambiance Creators (Inkmate) | An A of two slanted slabs, one cut by a diagonal | Parallelogram slabs, rounded outer corners | The cut separates the crossbar side into its own shard | Diagonal energy and an asymmetric cut |
| Ballstar (Deividas Bielskis) | A b whose bowl is a ball with a star knocked out | Disc bowl and star (geometric) | The star in negative space | Triple reading (b, ball, star); stem cut at an angle |
| Softrry (Rakibul Hasan) | An S carved from a parallelogram by two wedges | Straight cuts, rounded outer corners | The two triangular bites | Mass + cut at a non-obvious angle |
| Ringback (Maxim Chesky) | An R drawn as one looping line (a returning call) | Monoline loop with custom curvature into a straight leg | The loop that closes back on itself | One gesture with motion; letter + "call back" reading |
| Rollright (Victor Murea) | A chevron pushing a disc | Compass-built | The narrative: the disc is being rolled right | Motion by arrangement (LD-22) |
| Merge (Elbu Studio) | Two blocks whose facing edges leave a diamond of air | Straight geometry | The diamond in the negative space | Figure/ground; meaning comes from the gap |
| Pienso (Pentagram) | A hexagon broken into three hooked pieces | Rounded outer corners, sharp inner cuts, rotational | Each piece is a hook that grips the next | Rotation + interlock; the hexagon is owned because it is broken |
| VM (Matt Vancoillie) | Five metaball nodes forming V and M | Circles joined by tangent fillets | The pinched necks with shading | Metaball tension; a lettered reading |
| Jinxed (Goldfizh) | A ring that turns into a solid swoosh, cut horizontally | Outer contour a tilted ellipse; counter offset up-right | Thick-to-thin weight around the ring; the tail tapers to a point | Weight contrast + motion + an asymmetric cut |
| Boltra (Rafall Design) | A square split by a lightning Z | Straight cuts | The bolt as negative space | Figure/ground; name-derived |
| Intersekt (Kristian Designs) | Four chevrons converging on a centre | Straight, 45 deg | Arrows meeting as an X | Radial with a direction (convergence), not decoration |
| Gobji (Sipouquillium) | A G as one spiral turn | Monoline, but the outer end is cut obliquely and the inner end hooks tight | The tight inner hook | One gesture; spiral = G; no container |
| Beron (Sipouquillium) | A b as one curled stroke | Monoline about 0.17 H, oblique cuts at both ends | The loop that crosses the stem | Calligraphic gesture; letter + flourish |
| Granola (Ragged Edge) | A G as a loose hand-drawn spiral | Deliberately uneven stroke and curvature (56 inflections measured on the shipped SVG) | The imperfection itself | Human hand as the voice (LD-29) |
| Daimon (Sublimio) | A square with a circular counter pushed right = D | Pure primitives | The offset counter | Lettered figure/ground; offset breaks symmetry |

Patterns across the 25 [eye]:
- 0 of 25 put a letter centred inside a container shape. Where a container exists (Framed, Amina, Daimon, Boltra) the letter is cut out of it, runs off its edge, or is the container.
- 17 of 25 are asymmetric. Of the 8 symmetric ones, 5 use rotation (Swell, Sybil, Softrry, Pienso, Boltra) and only 3 mirror symmetry (Merge, VM, Intersekt), and those 3 carry a negative-space or lettered reading.
- 12 of 25 use a tilt, a diagonal or an offset repeat (Bonia, Swell, Sybil, One Stack, Opera, Ambiance Creators, Softrry, Jinxed, Framed, Rollright, Boltra, Intersekt).
- 5 of 25 vary stroke weight (Jinxed, Sybil, Granola, VM, Multiple); 4 are monoline gestures with designed terminals (Gobji, Beron, Ringback, Bonia).
- 7 are built only from circles and straight lines (Framed, Rollright, Amina, Daimon, Ballstar, Merge, Boltra); all earn it with a double reading or a narrative arrangement (LD-22).

### Shipped tech marks, measured (76 SVGs, `curves-measured.json`)

| Group | Count | Examples | Typical numbers |
|---|---|---|---|
| Straight-only | 16 | Vercel (3 nodes), Stripe, Framer, Raycast, Mistral, Anthropic, Claude, Perplexity, Dropbox, Sanity, X | Claude: 158 nodes, 44 small angle changes (hand-cut); Vercel 3 |
| Compass-built (drawn share <= 15%) | 26 | Linear, Slack 2019, Figma, Clerk, OpenAI, Supabase, Cursor, Lovable, Replit, PostHog, Mastercard, Loom, Turborepo, Zed, Arc | tension ratio 1.00; curvature jumps at a median 66% of smooth curve joins (line-to-arc) |
| Drawn (>= 50%) | 19 | Apple, Notion, Granola, Ramp, Railway, Webflow, Tailwind, Warp, Resend, Runway, Deno, Astro, Threads, Instagram, Groq | tension median 1.05; Notion 1.23, Tailwind 1.14, Ramp 1.11, Railway 1.08, Webflow 1.04; Apple balance 0.53 (shifted handles) |
| Mixed | 15 | Airbnb, Twitter, Spotify, Nike, Pinterest, Discord, Firefox, Bun, Convex, Mercury | Twitter and Discord drawn on circles but blended (g2 0.97-0.98) |

The Tandem finalists measure 100% compass-built with 4-8 nodes. The drawkit test marks (superellipse b, tapered hook, bitten superellipse) measure 29-81% drawn with tension medians 1.00-1.11 and 0 kinks [measured].

## 4. Numbers & scales

| Quantity | Value | Source |
|---|---|---|
| Circle handle ratio (4 cubics) | kappa = 4(sqrt2 - 1)/3 = 0.5523; min-max optimum about 0.5519 | spencermortensen.com |
| Superellipse quadrant handle ratio | t(n) = (8 * 2^(-1/n) - 4) / 3: n 2 = 0.552, 2.1 = 0.584, 2.5 = 0.688, 2.6 = 0.709, 3 = 0.783, 4 = 0.909. The type range 58-70% is n 2.1-2.6 | derived here (midpoint fit), drawkit `tension()` |
| Type curve tension | just under 60% to above 70%; inner contours higher than outer | glyphsapp.com |
| Drawn shipped marks, tension vs circle | median 1.05 (about 58%), p90 per mark 1.03-1.56 | curves-measured.json |
| Share of shipped marks by build | straight 21%, compass 34%, drawn 25%, mixed 20% (n 76) | curves-measured.json |
| Exploration breadth | "dozens" of symbols (H), 28 octothorpes (Slack), 7 routes -> 4 -> 1 (Mozilla), 4 directions in about 150 pages (Bolt), 1,500+ sketches / 14 projects (BankerWessel) | designobserver.com; process/08; johnsonbanks.co.uk; Brand New ep. 064; counter-print.co.uk |
| Refinement granularity | angle steps of 2% shown to the client; 90-page refinement deck (Bolt) | Brand New ep. 064 |
| Refinement passes | 7 named passes (MailChimp) | jessicahische.is |
| Horizontal vs vertical stroke | horizontals about 1% (type) to about 7% (*Vision* study) thinner | scannerlicker.net; emails.typography.com |
| Square vs circle for equal look | square 152 / circle 176 on a 192 grid = 0.86 | m2.material.io |
| Overshoot | rounds 1-3% H, points 3-5% H | logo-craft LG-17; Frere-Jones |
| Inverse thinning | 2-4% of stroke [engine note, by eye per Logo Geek] | logogeek.uk |
| Taper / pinch (engine defaults) | taper to 0.25-0.6 of base width; pinch 10-25% at joins | [engine note] from close reads |
| Ink trap (if used) | depth 0.15-0.3 stroke, width 0.08-0.15 stroke | [engine note]; high-logic.com |
| Continuous corner | `filletOuter` mode 'continuous' (handles to the vertex, curvature 0 at the edges), spread 1.4-2.0; Figma's smoothing 0.6 approximates iOS | figma.com/blog; drawkit test |
| Curvature jump threshold | > 2x change across a smooth join = G1 only | tools/logo_curves.mjs |

## 5. Wordmarks: 15 made from a base typeface (what was changed)

| Brand (year) | Base | Edit | Who | Source |
|---|---|---|---|---|
| Discord (2021) | Ginto Nord | i bar dips into a "valley", j matches, d ascender cut to cap height | Koto + AKQA; Dinamo | abcdinamo.com/custom/discord |
| Tumblr (2018) | ABC Favorit | t and r recut, curved joins removed for small sizes, period dropped | Dinamo | abcdinamo.com/custom/typeface-tumblr-favorit-new-york |
| Patreon (2023) | Oracle | variable uppercase wordmark, soft forms echo the P mark | Dinamo; Wolff Olins | abcdinamo.com/custom/patreon |
| Figma (2024) | Figma Sans | m narrowed so the word spaces evenly; stylised versions rejected | Figma Brand Studio; Grilli Type | figma.com/blog/the-story-of-creating-figma-sans |
| IOC (2020) | Olympic Sans | cap height adjusted to the rings | Hulse & Durrell; Dinamo | abcdinamo.com/custom/international-olympic-committee |
| Lyft (2025) | Rebel Sans | the f-t join severed | Koto | fastcompany.com/91373576 |
| Bolt (2023) | Agrandir | key letters customised; a bolt in the negative space between l and t | Koto | pangrampangram.com/blogs/journal/koto |
| Dropbox (2017) | Sharp Grotesk | a custom weight between Medium 20 and Semibold 20 | Collins; Sharp Type | techcrunch.com (2017-10-03); sharptype.co/case-studies/dropbox (not loaded) |
| Mozilla (2017) | Tesla Slab | every letter modified; "illa" becomes :// | Johnson Banks; Typotheque | typotheque.com/blog/new-wordmark-and-typeface-for-mozilla |
| MailChimp (2013) | Hische's own script | lighter, small-size fixes, M joined to a, more letter space, thinned overlaps | Jessica Hische | jessicahische.is/monkeyingaround |
| Mailchimp (2018) | Cooper Light (customised; sources differ) | lowercase, customised | Collins | creativebloq.com |
| Flexe | TWK Lausanne | custom x where two industries meet | n/a | fontsinuse.com/uses/43019/flexe |
| Twitch (2019) | blocky lettering, refreshed | letters straightened | Collins | creativebloq.com/news/twitch-rebrand |
| Replit (2022) | monospace | softened corners | Mackey Saturday | replit.com/blog/new-logo |
| Tinder (2026) | n/a | lowercase to caps to balance a new serif; flame refined | Porto Rocha | creativereview.co.uk |

The pattern: a face with character plus one to three edits, each tied to the product (Discord's toggle valley, Bolt's bolt, Mozilla's ://, Lyft's cleaner join). The edit is visible at nav size but never makes the word harder to read [source + engine note].

## 6. Dos and Don'ts

- **Do** (process/02, 04): thin strokes where they overlap or join, and unify stroke angles across the word; circles mark each join that was corrected.
- **Do** (process/08): draw 20-30 variants of the chosen idea at the same size before picking one.
- **Do** (process/18-20): balance tension within a segment and give the inner contour more tension than the outer.
- **Do** (process/21-22): use a continuous corner where a straight meets a curve.
- **Do** (process/23-25): overshoot the circle, narrow the A, make the O taller than wide when it sits with straight letters.
- **Don't** (`work/tandem/brand/finalists.png`): a letter centred in a disc, cut by slits of one width, symmetric, 100% circle arcs. It reads as a metro sign.
- **Don't** (process/26): force a drawn letter onto perfect geometric guides.
- **Don't**: present 6 variants of one idea as 6 options (the engine's Tandem sheet); present 3-4 routes (process/09, 10).

## 7. Exceptions & judgement calls

- **Geometric marks are not banned.** Linear, Slack, Figma and Mastercard are compass-built; Vercel is three nodes. They work because the composition carries an idea (motion, rotation, overlap) and the brand has years of use behind it. A new brand drawing pure geometry needs LD-22's stated relationships and LD-21's signals. [engine note]
- **Hand-drawn wobble vs kinks.** `logo_curves` flags Granola's and Airbnb's near-tangent joins as kinks. For a declared hand-drawn voice (LD-29) that is the texture; for a geometric or "precise" voice it is a defect.
- **Extrema discipline is a drawing rule, not an export rule.** Shipped SVGs keep nodes on extrema only 46% of the time (median), because Figma, Illustrator and SVGO rebuild paths. Enforce LD-07 on the engine's source geometry; do not mark shipped references down for it.
- **Ink traps** at display size are a style (some studios use them as a visible detail); default to pinching joins instead.
- **Founder rule tension.** founder-taste says never hand-draw icons or logos as freehand SVG paths. The drawkit is constructed drawing: spines, width profiles, superellipses and booleans with stated parameters, which is how type designers draw. It is not freehand path typing. Present marks drawn this way with their spec and test sheets, and ask the founder to confirm this reading of the rule. [engine note]
- **Imperfection vs polish.** 2025-26 commentary asks for human imperfection; the founder's bar is studio polish. The two meet when imperfection is one deliberate, repeated decision on top of optically correct drawing.

## 8. Figures worth keeping

- `process/01-06`: Hische's annotated refinement boards (overlaps thinned, joins de-rounded, stroke angles unified, sketch overlay).
- `process/07-10, 13`: exploration volume (Deliveroo wall, 28 Slack octothorpes, Slack route boards, Mozilla's seven routes, Atlassian thumbnails).
- `process/15-22`: drawing discipline (Glyphs nodes and inflections, OH no inflection points, FontLab tension, Figma curvature plots).
- `process/23-28`: optical corrections (overshoot, HOA, equilateral A, Google G guides, irradiation, TH stroke compensation).
- `process/closeread-logosystem-sheet.png`: 25 marks that look drawn.

## 9. Open questions

- Optical-centre offset: widely asserted, no reliable percentage found (0-3% used as an engine default).
- "About 300 icons tested" for Instagram 2016 and "hundreds of sketches" for Atlassian appear only in secondary coverage; not used as numbers.
- Brand New reviews are paywalled; only the free podcast transcripts were read (Koto Bolt ep. 064, Wise ep. 067).
- The Mackey Saturday spacing method (upside-down check) comes from a Skillshare summary that returned 403; the claim is from search results.
- Linear, Vercel, Notion, Stripe, Spotify, Uber 2018 and Dropbox 2017 have no curve-level public write-up.
- No direct essay by Geissbuhler on "mark vs pictogram" was found; the signage distinction in LD-20 is an engine synthesis tested against the close reads, not a quoted rule.
- Whether the founder accepts drawkit-constructed curves under the "never hand-draw logos in SVG paths" rule needs a verdict (section 7).

## Sources

- Hische: https://jessicahische.is/monkeyingaround ; https://www.jessicahische.is/ashopaholic
- Pentagram: https://www.pentagram.com/work/slack ; https://www.pentagram.com/work/mastercard ; Slack: https://slack.com/blog/news/say-hello-new-logo
- DesignStudio Deliveroo: https://www.creativereview.co.uk/deliveroorebrand/
- Johnson Banks Mozilla: https://www.johnsonbanks.co.uk/templates/news/our-first-design-routes-for-mozilla ; https://blog.mozilla.org/opendesign/route-one-protocol/
- Koto Bolt (Brand New podcast transcript ep. 064): https://www.underconsideration.com/brandnew/wp/wp-content/uploads/2023/02/BN_Podcast_Transcript_Ep_064.pdf
- Rand NeXT: https://www.paulrand.design/life/books-articles/articles/print/1997-design-literacy-next.html
- Bierut H: https://designobserver.com/im-with-her/
- Geismar: https://www.logodesignlove.com/tom-geismar-interview ; Haviv: https://www.logodesignlove.com/sagi-haviv-interview
- Atlassian 2011: https://www.atlassian.com/blog/2011/10/behind-the-scenes-of-the-atlassian-logo-redesign
- Google: https://design.google/library/evolving-google-identity
- Sketch collection: https://www.vistaprint.com/hub/famous-logo-process-sketches
- BankerWessel: https://counter-print.co.uk/products/process-visual-journeys-in-graphic-design-second-edition
- Glyphs: https://glyphsapp.com/learn/drawing-good-paths/
- FontLab: https://help.fontlab.com/fontlab/8/tutorials/calfonts/2.%20Honing/2c-1%20Curve%20Tension ; https://help.fontlab.com/fontlab/8/tutorials/briem/4-0-modules/briem-4-03-curve/
- OH no: https://ohnotype.co/blog/drawing-vectors
- Scannerlicker: https://scannerlicker.net/writings/2014/10/01/bezier-ocd-or-why-you-should-know-about-point-placement/ ; https://scannerlicker.net/writings/2014/10/25/the-art-of-eyeballing-iv-the-stroke-optics/
- Figma squircles: https://www.figma.com/blog/desperately-seeking-squircles/ ; Figma Sans: https://www.figma.com/blog/the-story-of-creating-figma-sans/
- Bezier circle: https://spencermortensen.com/articles/bezier-circle/
- Frere-Jones (Slate): https://www.slate.com/blogs/the_eye/2015/04/09/tobias_frere_jones_explains_the_optical_illusion_that_tricks_our_brains.html
- Hoefler&Co: https://emails.typography.com/2019_01/index.html
- MyFonts: https://cms.myfonts.com/content/optical-illusions-and-eye-trickery-in-geometric-font-design
- Logo Geek: https://logogeek.uk/?p=2617
- Material keylines: https://m2.material.io/design/iconography
- Ink traps: https://www.high-logic.com/font-editor/fontcreator/tutorials/create-ink-traps
- Dinamo: https://abcdinamo.com/custom/discord ; https://abcdinamo.com/custom/typeface-tumblr-favorit-new-york ; https://abcdinamo.com/custom/patreon ; https://abcdinamo.com/custom/international-olympic-committee
- Typotheque Mozilla: https://www.typotheque.com/blog/new-wordmark-and-typeface-for-mozilla
- Lyft: https://www.fastcompany.com/91373576/lyft-new-logo-can-you-spot-the-difference ; Bolt: https://pangrampangram.com/blogs/journal/koto
- Replit: https://replit.com/blog/new-logo ; Granola: https://www.granola.ai/blog/a-new-look-for-granola ; Lovable: https://review.firstround.com/firsthand-lovable/
- OpenAI refresh: https://www.creativereview.co.uk/openai-brand-refresh/ ; https://www.fastcompany.com/91273217/open-ai-rebrand-chat-gpt-logo
- Perplexity: https://ebaqdesign.com/news/perplexity-rebrand
- Linear brand: https://linear.app/docs/brand-guidelines ; Cursor brand: https://cursor.com/brand
- AI logo sameness: https://velvetshark.com/ai-company-logos-that-look-like-buttholes ; https://www.thedrum.com/opinion/rob-pratt-why-do-so-many-ai-brands-look-exactly-the-same
- Galleries: https://www.logosystem.co ; https://github.com/pheralb/svgl
