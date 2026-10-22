---
source: web:x.com/_heyrico (575 posts, 700 photos, 12 Jun - 21 Oct 2026, via api.fxtwitter.com) + acedesign.io (home, notes, 6 case pages live at 1440@2x, 92 case CDN originals)
chapter: Rico deep study 2026-10: his measured product-UI system, six pixel replicas, what performs on X
pages: n/a (web; evidence in knowledge/benchmarks/heyrico-x/, replicas in work/replicas/app/src/RicoR1..6.tsx)
topic_tags: [product-ui, saas-app, table, sidebar, composer, chart, onboarding, pricing, marketing, dark-mode, typography, sf-pro, inter, radius, hairline, export-scale, x-performance, heyrico, replica]
status: studied
---

# Rico deep study (2026-10): his system measured from originals, six registered replicas

**Credits first.** Everything studied here is by **rico (@_heyrico)**, founder of **Ace Studio** (acedesign.io, "agentic product design agency"; clients named in his bio: ClickUp, Langdock, Blackbox AI, Twin). Client screens belong to his clients (Alpaca, Aster, Scout, Langdock, Twin, Marketer). This is a private study: no image, copy, logo or layout here may be published or presented as engine or Larpo work. Capture method and file map: `knowledge/benchmarks/heyrico-x/CREDITS.md`. Replica notes: `work/replicas/RICO-REPLICAS-NOTES.md`.

Evidence tags: **[R1..R6]** = measured on a pixel replica registered against a case-page original (ink boxes within about 1 CSS px, see the notes); **[CDN]** = read from a Framer CDN original; **[DOM]** = computed style on acedesign.io; **[T]** = a number he states in a post; **[X]** = timeline statistics from `posts.json` / `img-classification.tsv`.

## 1. Core ideas

1. **Get the original, then solve the scale from a hairline.** His case pages serve lossless palette PNGs at 3x to 10x. A 1 CSS px stroke is exactly S image px, so the scale is read, not guessed: Aster grid lines are 4 px (4x), the Alpaca/Scout window border 3 px (3x), the Alpaca suggestion-card stroke 10 px (10x). The Twin zoom has no clean stroke; its rows (196 px on a 210 pitch = his 28/30 spec) give 7x. Every other number in this note sits on that step. [CDN]
2. **Two type families, chosen per product, never mixed in one screen.** The Aster CRM, Twin and the Alpaca app are **SF Pro** (system-ui fits 13 strings at 0.03 px mean error against Inter's 0.06, and 500 weight matches ink density 0.95-1.1 without the "Inter 550" hack). The Scout company page and the Alpaca onboarding are **Inter** (the "cool Inter" and "sign-in" cheatsheets: #434356/#838693, #232323/#646465). [R1-R5][T]
3. **Hierarchy is colour and size, with one weight.** Aster runs everything at SF 500 (13 nav, 14 table, 13 header, 12 tags, 11 group labels); Twin runs everything at 400 except the white card title. Size steps are 1 px (11/12/13/14). Weight changes are rare and deliberate (600 only for a plan name). [R1][R2][R5]
4. **His published colour tokens are exact on the originals.** Aster = Tailwind neutral (#262626 / #737373 / #404040 header / #a1a1a1 meta; #fafafa head row; #eeeff2 grid). Twin and the Alpaca app = his "SF Pro" cheatsheet to the hex (#5D5D5D default, #7F7F7F subtle, #9E9E9E label, #292929/#333 strong, #F3F3F1 selected). The JPEG-based study read #6e6e6e for #737373; the original removes that error. [R1][R2][R3][T]
5. **Surfaces are near-identical greys separated by one hairline.** Aster: white window, #fbfbfb sidebar, #fafafa table head, #fcfcfc footer bar, all split by 1 px #eeeff2. Twin: #fcfcfc sheet on #f8f8f6 canvas. Alpaca onboarding: white window inside a #f0f0f0 canvas with a 0.5 px #d8d8d9 ring. [R1][R2][R5]
6. **Edges are rings, not borders, and shadows are a whisper.** Controls get a 0.7-1 px ring (#e4e4e5 / #e9e9e9) plus `0 1px 1.5-2px` at about 5%; content cards get a 1 px stroke only (#f6f6f7) or a 0.5 px ring plus a 2.5% halo; the only "material" is the dark primary (gradient #2b2b2b -> #1a1a1a with a 12% top highlight). [R1][R3][R5]
7. **Radius scales with height, but every product picks its own ladder.** 12 px checkbox r4, 16 px key r4, 18-20 px tiles r5-6, 20-22 px chips r6, 24 px icon buttons r8, 24 px CTA r12 (pill), 28 px rows and toolbar buttons r8, 40 px CTA r20 (pill), 99-140 px cards r16-16.5, composer (124 tall) r19.5, sidebar sheet r14, app window r9-10. Scout breaks it on purpose: a 275 px card at r6.5. [R1-R5]
8. **Density comes from pitch, not from small type.** Nav rows are 28 tall on a 29 (Aster) or 30 (Twin) pitch, table rows 38, header rows 38-48; text stays 13-14. Fourteen companies, a 3-group sidebar and an 8-control toolbar fit one 1440x900 window. [R1][R2]
9. **Composition: the product is cropped and scaled, never shrunk.** Case images are either a full 1440x900 window on a 80 px/50 px canvas margin (Aster 1600x1000, Alpaca 1720x1000) or a single component at 7-10x (Twin sidebar, Alpaca composer) so 12-13 px type reads in a feed. [CDN]
10. **His own marketing register is the opposite of his product register.** acedesign.io: black, one lime (#E1F435), Anton 40/-1.2 caps headlines with 9 px crop ticks, GT America Lt 14 / Rg 16 at negative tracking, GT America Mono 11-12 caps with +0.1em, square buttons (0-3 px radius), stair-stepped stat boxes on 1 px #1a1a1a lines. [R6][DOM]
11. **On X the spec sells, the screen illustrates it.** 21 "cheatsheet" posts (bulleted token lists over one screen) have median 438 likes and 1.38 bookmarks per like, against 166 likes and 0.79 for everything else; the same images are reposted up to 7 times. [X]

## 2. Rules

### 2.1 Process: measuring a Rico screen

- **RULE RD-01** Measure only on the case-page CDN original (strip the `scale-down-to` query from the framerusercontent URL); use an X image only when no original exists, and note it.
  **Why** X recompression shifted his greys by 5 levels (#737373 read as #6e6e6e) and blurred hairlines into 2-3 px ramps; the originals are lossless palette PNGs.
  **Applies to** all. **Check** reference path is under `knowledge/benchmarks/heyrico-x/live/*/cdn/` or a crop of it. **Source** [CDN] all six replicas; `heyrico-recreation-lessons.md` colours vs R1.

- **RULE RD-02** Solve the export scale from a 1 px stroke (its width in image px is the scale), and confirm it with one structural number from his specs (28 px rows, 24 px CTA) before fitting any font.
  **Why** Fitting fonts first gives 3-8 equally good scales (Alpaca composer: 6.7, 8.7, 10.2); the stroke gave exactly 10.
  **Applies to** all. **Check** a straight 1 px edge measures S px wide; derived row height lands on his ladder (24/28/32/38/40). **Source** [CDN] Aster 4x, Alpaca 3x and 10x, Twin 7x.

- **RULE RD-03** Decide SF Pro vs Inter from ink widths of 8+ strings with both fonts at the solved scale; take the family whose sizes land on whole pixels with one tracking value, and confirm weight by ink density (0.95-1.1).
  **Why** His products split between the two and look similar; the wrong family forces fake weights (Inter 550) and drifting tracking.
  **Applies to** all. **Check** `work/replicas/rico-tools/fit.mjs --fonts SF,Inter`; cmp ink ratio 0.95-1.1. **Source** [R1] SF 0.03 vs Inter 0.06 px; [R4][R5] Inter wins.

- **RULE RD-04** Register text by ink box, not by eye: every label within 1 CSS px in x, y and width, checked at the reference's own device scale.
  **Why** At 2x the render snaps to 0.5 px and hides half-pixel drifts; at 4x the same boxes moved 0.5-1 px and were fixable.
  **Applies to** all. **Check** `rico-tools/cmp.mjs --scale <S>` prints no `<<` on text rows. **Source** [R1] round 3 at 4x.

### 2.2 Type

- **RULE RD-05** In an SF Pro product set the UI at 500 with 13 px nav and labels (-0.15 px), 14 px table body (-0.2 to -0.3 px), 13 px column headers, 12 px tags (-0.25 px), 11 px group labels and meta.
  **Why** One weight and 1 px size steps let colour carry the hierarchy, which keeps a dense CRM calm.
  **Applies to** SaaS app UI. **Check** computed sizes in {11,12,13,14}, weight 500, letter-spacing -0.15 to -0.3. **Source** [R1] Aster table.

- **RULE RD-06** In a sidebar-plus-promo product (Twin register) set nav at SF 13/400 with -0.04 to -0.1 px, group labels 12/400, card title 12/500 at 0, body 12/400 -0.1, CTA label 12/500 -0.1.
  **Why** Regular-weight nav reads quieter than the 500 table register and suits a consumer-ish agent app.
  **Applies to** SaaS app UI. **Check** nav weight 400; card title the only 500 in the frame. **Source** [R2].

- **RULE RD-07** For an AI composer page use SF: title 19/400 -0.2, placeholder 14/400 #7F7F7F at 0 tracking, chip 13/400, "New" 11/400 in blue, suggestion titles 13/500, subtitles 12/400 #5C5C5C.
  **Why** A regular-weight title and a 14 px placeholder keep the composer the focal object, not the heading.
  **Applies to** SaaS app UI. **Check** title weight 400; placeholder 14px. **Source** [R3].

- **RULE RD-08** In an Inter product (Scout, Alpaca onboarding) use 0 tracking at 12-14 px, 18/500-600 for titles and plan names, 17.5/450 for a KPI value, and keep the delta at 12 px in green #08AB4C with a 10.7 px filled arrow dot.
  **Why** Inter is already tight at text sizes; his Inter screens carry no negative tracking below 18 px.
  **Applies to** SaaS app UI. **Check** letter-spacing 0 (+/-0.1) on 12-14 px Inter. **Source** [R4][R5]; contradicts HR-05's uniform -0.15.

- **RULE RD-09** Never mix the two families in one screen; mono appears only as meta (Aster has none).
  **Why** Each product is one voice; mixing SF and Inter shows as uneven x-heights at 13 px.
  **Applies to** SaaS app UI. **Check** one sans family per frame. **Source** [R1-R5].

### 2.3 Colour and surfaces

- **RULE RD-10** Use exactly his neutral ramp per product: Tailwind neutral for CRM tables (#262626 text, #404040 headers, #737373 secondary, #A1A1A1 meta) or his SF ramp (#292929/#333 strong, #5D5D5D default, #7F7F7F subtle, #9E9E9E label).
  **Why** Three or four greys rank strong/default/subtle/meta; more steps blur the ranking.
  **Applies to** SaaS app UI. **Check** distinct text greys <= 4 per frame and equal to one ramp. **Source** [R1][R2][R3][T].

- **RULE RD-11** Separate sidebar, table head, footer bar and content with 1 px hairlines of one colour (#EEEFF2 on Aster) over fills that differ by 1-3 levels (#FFF / #FCFCFC / #FBFBFB / #FAFAFA).
  **Why** Near-equal fills plus one hairline reads as a single sheet; tinted panels would add a second structure.
  **Applies to** SaaS app UI. **Check** surface L* spread <= 2; one divider colour. **Source** [R1].

- **RULE RD-12** Keep colour for data and states: tag text in Tailwind 400 hues with a 100-hue 1 px ring on a near-white fill, blue links (#1F8AFF) underlined, status glyphs (half-filled orange, dashed grey, ringed blue) and one blue count badge (#00A6F4, 14 px).
  **Why** When chrome is grey, every hue means something.
  **Applies to** SaaS app UI. **Check** saturated pixels only in tags, links, glyphs, badges, charts. **Source** [R1][R2].

- **RULE RD-13** Build dark mode on #1A1A1A with #212121 / #1C1C1C surfaces, #282828 / #242424 dividers, #EEEEEE strong and #B1B1B2-#B5B5B5 subtle text, and one blue (#0091FF / #0076E5).
  **Why** Four near-black steps and a 3% divider keep the dark app flat and calm; the accent is the only chroma.
  **Applies to** SaaS app UI. **Check** dark fill histogram dominated by 3-4 greys within L* 9-16. **Source** [CDN] alpaca 20-22, marketer 13-14 histograms; matches [T] status/2063998746757886299.

- **RULE RD-14** Use his chart blue as one flat hue (#4E9BFD bars on Scout, #519DFA lines / #0077E6 bars on Marketer) with no gradient, no gridlines and no y axis on summary cards.
  **Why** A single flat hue and an axis-free card let the bars read as a shape at a glance.
  **Applies to** SaaS app UI. **Check** one series colour; no axis lines in KPI chart cards. **Source** [R4][T].

### 2.4 Geometry

- **RULE RD-15** Ladder radii by height: 12 checkbox r4, 16 key r4, 18-20 tile r5-6, 20-22 chip r6, 24 icon button r8, 28 row/button r8, cards r16-16.5, composer r19.5-20, sheet r14, window r9-10; pills only for CTAs (24 -> r12, 40 -> r20).
  **Why** A per-height ladder makes small controls crisp and large containers soft without a random radius anywhere.
  **Applies to** SaaS app UI. **Check** rendered radius per height band matches the list (+-1). **Source** [R1-R5].

- **RULE RD-16** Render his corners as plain circular arcs (`corner-shape: round`) when replicating; do not apply the engine's superellipse default to his work.
  **Why** His Figma exports fit circular corners (Aster window r~9.5 from two edge offsets); a squircle changes the 4x edge by 1-2 px.
  **Applies to** SaaS app UI. **Check** replica root sets `corner-shape: round`. **Source** [R1] corner fit; engine `squircle.css` is global.

- **RULE RD-17** Use 28 px nav rows on a 29-30 px pitch with the active row a full-width fill (#F0F0F0 on #FBFBFB, #F3F3F1 on #FCFCFC) at r8, inset 7-12 px from the sidebar edge; group gaps about 1.5 rows.
  **Why** A tone-only active state and a dense pitch fit 20 destinations without scrolling.
  **Applies to** SaaS app UI. **Check** row h 28, pitch 29-30, active fill L* within 4 of the sidebar. **Source** [R1][R2].

- **RULE RD-18** Size the app sidebar at 238-240 px with the workspace header in its own 38 px band under a hairline (Aster) or a 20 px logo tile with the wordmark at 18 px serif (Twin).
  **Why** 240 leaves 1,200 px for a 6-column table in a 1440 window.
  **Applies to** SaaS app UI. **Check** sidebar width 236-242. **Source** [R1][R2]; old study said 256-260 for the analytics frame.

- **RULE RD-19** Build data tables at 38 px rows, a 35 px #FAFAFA header row with 13 px #404040 labels, 12 px checkboxes r4 with a 0.75 px ring, 1 px #EEEFF2 row and column lines, money right-aligned 13.5 px from the column edge, and a 36 px aggregate footer bar.
  **Why** These are the exact numbers that make his Attio-class table read as real.
  **Applies to** SaaS app UI. **Check** row pitch 38; header h 35; footer present. **Source** [R1].

- **RULE RD-20** Make the toolbar one 28 px row: ringed white buttons r8 for views and settings, dashed rings for empty Sort/Filters, a 28x28 search square, and one dark primary at the right end.
  **Why** One height and one ring make eight controls read as a single strip; dashed rings mean "not set yet".
  **Applies to** SaaS app UI. **Check** all toolbar controls h 28 (+-1.5 for the primary's ring). **Source** [R1].

### 2.5 Components

- **RULE RD-21** Draw the primary dark button as a gradient (#2B2B2B -> #1A1A1A), a 1 px #121212 ring, a 12% white inset top line and a 1-2 px drop; 14/500 white label with a 15 px plus.
  **Why** The top highlight and ring give a pressed-material look without any colour.
  **Applies to** SaaS app UI. **Check** primary background is a gradient with top lighter than bottom. **Source** [R1]; matches lessons file wallet button.

- **RULE RD-22** Build the AI composer as a 480 px card (r19.5, 0.7 px #E4E4E5 ring, 0 1px 2px 5%), 14 px placeholder at 14.7 px inset, and a bottom row at 14 px from the bottom: two 24 px ringed icon squares r8, a #F6F6F7 model chip r8, a mic, and a 24 px circular send that is pale blue (#B7D8F6) while empty.
  **Why** The pale send says "type first" without a disabled grey; the chip names the agent mode in place.
  **Applies to** SaaS app UI. **Check** send circle 24; empty-state send colour light blue. **Source** [R3].

- **RULE RD-23** Under the composer place three equal suggestion cards (152x99, 12 px gaps, 1 px #F6F6F7 stroke, r16.5, no shadow) with a 15-20 px outline icon, a 13/500 title and a 12/400 subtitle.
  **Why** Stroke-only cards stay secondary to the ringed composer above.
  **Applies to** SaaS app UI. **Check** three cards; no box-shadow; gap 12. **Source** [R3].

- **RULE RD-24** Make a promo card dark (#333, r16, 16 px padding) with a 17.7 px brand mark, a 12/500 white title, a 12/400 #BFBFBF line and a full-width 24 px white pill CTA with a 12/500 #202020 label.
  **Why** One dark object in a light sidebar draws the eye without any colour.
  **Applies to** SaaS app UI. **Check** card is the only dark surface; CTA h 24 pill. **Source** [R2].

- **RULE RD-25** Use chips of 20-22 px with r6: tags with a 100-hue ring, a neutral #F0F0F0 "Free" chip and a #F4F8FC fill / #DBE7FD ring / #0A6EAB text price chip.
  **Why** A tinted ring keeps 12 px chip text legible at low fill contrast.
  **Applies to** SaaS app UI. **Check** chip h 20-22, r6. **Source** [R1][R5].

- **RULE RD-26** Lay plan cards out as two 320x480 cards with a 24 px gap: an 80 px art header, 24 px side padding, an 18 px name with a right-aligned chip, two lines of 14 px description, "What you get:" 12/500, 13 px features on a 28 px pitch with 13.5 px check-circle icons, and a full-width 40 px pill CTA (dark #333 for self-serve, blue #0091FF for sales).
  **Why** Two CTAs with different colours tell the two paths apart at once.
  **Applies to** SaaS app UI. **Check** CTA h 40 r20; feature pitch 28. **Source** [R5].

- **RULE RD-27** Show a KPI chart card as label (13/500 #838693) + period (12/500 right) on one line, value 17.5 + green delta and arrow dot on the next, 12 bars of equal width (25.7) on a 31.75 pitch with r3 tops, and 12.5 px month numbers centred under each bar.
  **Why** Label, value, delta, shape: the card reads top to bottom in one pass.
  **Applies to** SaaS app UI. **Check** bars equal width; numbers centred on bars (+-0.5). **Source** [R4].

- **RULE RD-28** Mark navigation with a 14 px count badge (#00A6F4, white 10/500) or a right-aligned 10.5-12 px grey count, never both on one row.
  **Why** One count style per row keeps the nav scannable.
  **Applies to** SaaS app UI. **Check** <= 1 count element per nav row. **Source** [R1][R2].

- **RULE RD-29** Underline entity names and footer totals with a 1 px #E5E5E5 underline about 3.5-5 px below the baseline; underline links in their own blue.
  **Why** A faint underline says "opens a record" without colouring the name.
  **Applies to** SaaS app UI. **Check** text-decoration-color #e5e5e5 on entity cells. **Source** [R1].

### 2.6 Composition and texture

- **RULE RD-30** Present a full app as a 1440x900 window centred on a canvas 80 px wider on each side (1600x1000) or 140 px (1720x1000), with a 1 px or 0.5 px ring and no shadow.
  **Why** A flat window on a quiet canvas keeps the UI the subject and survives X's crop.
  **Applies to** landing page. **Check** window 1440x900; box-shadow is a ring only. **Source** [R1][R5].

- **RULE RD-31** Present a single component as a 7-10x zoom on a near-white canvas, letting the parent container run off the frame edge (Twin sheet cut at the bottom).
  **Why** A zoom turns 12 px UI into feed-legible detail and the cut edge implies the full app.
  **Applies to** landing page. **Check** frame <= 720 CSS wide at >= 7x; one container clipped. **Source** [R2][R3].

- **RULE RD-32** Use a dithered square-pixel band (2.4 px squares on a 4.75 px pitch, #F1-#F8 greys, faded at the edges) as the only decoration above a centred empty state.
  **Why** A near-invisible texture signs the screen without competing with the composer.
  **Applies to** SaaS app UI. **Check** decoration contrast <= 1.1:1 against white. **Source** [R3][R5].

### 2.7 His marketing register (acedesign.io)

- **RULE RD-33** When a studio brand needs a separate voice, set display lines in Anton 40/42 caps at -1.2 px, alternate one lime phrase with white ones, and close each phrase with a 9 px 2 px-thick crop tick 15.5 px after it.
  **Why** Condensed caps plus ticks read as engineered and editorial, unlike the product register.
  **Applies to** landing page. **Check** h3 font Anton 40px, ls -1.2; ticks 9x9. **Source** [R6][DOM].

- **RULE RD-34** Pair it with GT America Lt 14/21 (-0.14) and Rg 16/22.4 (-0.4) in #BFBFBF, mono labels at 11-12 px with +0.1 em, square CTAs (lime fill, 1 px white outline, white r3), and stats in stair-stepped 1 px #1A1A1A boxes 182 px wide rising 40 px each.
  **Why** Grey body under white display text and square controls keep the black page technical.
  **Applies to** landing page. **Check** body colour #bfbfbf; CTA radius <= 3. **Source** [R6][DOM]. Open-font stand-ins: Libre Franklin and Fragment Mono (RD-03 method).

- **RULE RD-35** Do not import this register into a SaaS client hero: it breaks the engine canon on purpose (10 type sizes, weight 300, 3 px radius on a 32 px button).
  **Why** It is his studio brand, not his product craft; the gate fails it on type sizes, weights and the radius ladder.
  **Applies to** landing page. **Check** `gate.mjs` on `#/ricor6`: 4 FAIL by design. **Source** [R6].

### 2.8 X

- **RULE RD-36** Post a token cheatsheet as text (5-6 bullets: type, sizes, colours as hex, radii, heights, icon set) over one clean screen, and expect it to be bookmarked more than liked.
  **Why** Cheatsheets are his best format: median 438 likes vs 166, bookmarks/likes 1.38 vs 0.79.
  **Applies to** landing page. **Check** post text has >= 3 "- " bullets with numbers. **Source** [X] 21 cheatsheet posts.

- **RULE RD-37** Reuse strong images: repost the same screen under a new caption weeks later.
  **Why** Posts that reuse an image have median 191 likes vs 152 for first uses; one cheatsheet image ran three times at 1308, 830 and 634 likes.
  **Applies to** landing page. **Check** n/a (editorial). **Source** [X] 142 duplicate clusters.

- **RULE RD-38** Prefer 2-4 image carousels of the same product at one canvas over single shots, and portrait or square crops for single components.
  **Why** Median likes: 4 images 185, 2 images 185, 1 image 144; portrait 197 vs landscape 169.
  **Applies to** landing page. **Check** n/a. **Source** [X].

## 3. Numbers & scales

### 3.1 Top system values (measured)

| # | Value | Where |
|---|---|---|
| 1 | Families: SF Pro 500 (Aster, Alpaca app), SF Pro 400 (Twin), Inter (Scout, Alpaca onboarding) | R1-R5 |
| 2 | Sizes: 10.5 / 11 / 12 / 13 / 14 in apps; 17.5-19 titles and values; 40 Anton marketing | R1-R6 |
| 3 | Tracking: SF 13 -0.15, SF 14 -0.2 to -0.3, Twin -0.04 to -0.1, composer and Inter 0 | R1-R5 |
| 4 | Text greys: #262626 / #404040 / #737373 / #A1A1A1 (Aster); #292929 / #5D5D5D / #7F7F7F / #9E9E9E (SF ramp); #434356 / #838693 (Inter cool) | R1-R4 |
| 5 | Light surfaces: #FFF window, #FBFBFB sidebar, #FAFAFA head row, #FCFCFC footer; canvases #FFF, #F8F8F6, #F0F0F0 | R1, R2, R5 |
| 6 | Hairlines: 1 px #EEEFF2 grid; window ring #E5E5E5 (1 px) or #D8D8D9 (0.5 px); control ring #E4E4E5-#E9E9E9 at 0.7-1 px | R1, R3, R5 |
| 7 | Shadows: controls 0 1px 1.5-2px 5%; cards none (stroke) or 0 2px 10px 2.5%; dark primary inset top 12% + 0 1px 2px 18% | R1, R3, R5 |
| 8 | Radii: 4 (12-16 px) / 5-6 (18-22 px) / 8 (24-28 px) / 12 and 20 (pills) / 14 sheet / 16-16.5 cards / 19.5 composer / 9-10 window | R1-R5 |
| 9 | Control heights: 12 checkbox, 14 badge, 16 key, 20 chip/mini button, 22 tag, 24 icon button/pill, 28 row/toolbar, 40 CTA | R1-R5 |
| 10 | Pitches: nav 29 (Aster) / 30 (Twin), table row 38, features 28, bars 31.75 | R1, R2, R4, R5 |
| 11 | Widths: sidebar 238-240, composer 480, suggestion card 152 (gap 12), plan card 320 (gap 24), promo card 240 | R1-R3, R5 |
| 12 | Accent: blue #1F8AFF links, #00A6F4 badge, #0091FF CTA, #4E9BFD bars, #B7D8F6 empty send | R1-R5 |
| 13 | Dark: #1A1A1A canvas, #212121/#1C1C1C surfaces, #282828 dividers, #EEE / #B1B1B2 text | CDN histograms |
| 14 | Icons: 12-15 px ink, 1.0-1.35 stroke at 1x, grey #737373 / #7F7F7F, active rows switch to the strong text colour | R1-R3 |
| 15 | Marketing: #000 page, #E1F435 lime, Anton 40/42 -1.2, #BFBFBF body, 1 px #1A1A1A lines, 9 px ticks | R6 |

### 3.2 States and motion
- Active nav: fill only (#F0F0F0 / #F3F3F1, r8), label from default to strong; hover cue in stills is a pointer cursor on the row (Twin). [R1][R2]
- Empty/disabled: send button pale blue #B7D8F6 rather than grey; dashed toolbar rings for unset Sort/Filters. [R1][R3]
- Motion: his three video posts are listed in `video-urls.tsv` (32.2 s 1440x1440, 6.4 s 1120x800, 19.3 s 2160x2160). The two older ones were frame-read in `heyrico-product-design.md` (HR-58..60: accordion height + fade, edit-mode drag handles); not re-measured here.

## 4. Dos and Don'ts

- **Do** read the scale off a hairline (Aster 4 px lines). **Don't** pick the scale where font sizes look round (Alpaca composer had 8 such scales).
- **Do** use system-ui SF for his SF products when replicating on macOS. **Don't** substitute Inter and push weight to 550 to fake the ink.
- **Do** keep his 5 type sizes in a dense table. **Don't** "fix" a replica to pass the engine's 4-size canon; record the conflict instead (`#/ricor1`, `#/ricor3` FAIL type.sizes.product).
- **Do** keep the plan CTA colours different (dark self-serve, blue sales). **Don't** make two equal dark CTAs.
- **Don't** copy his black/lime studio look into a client SaaS hero (RD-35).

## 5. Exceptions & judgement calls

1. **Contrast.** Several of his greys fail AA on white: #9E9E9E labels (2.5:1), #838693 on white (3.6:1), #A1A1A1 meta. [engine note] Keep them for group labels and meta only; never for body copy.
2. **Scout card radius 6.5** sits far below his own "cards 14-16". Treat it as a product-specific choice (an investment-data tool reads sharper), not a rule.
3. **Airbnb row 43 px** in an otherwise 38 px table is a Figma slip; replicated, not a rule.
4. **Data coherence.** OpenAI's domain reads "notion.com" and the revenue equals the funding in every Aster row; sample data, kept as counter-examples (as the lessons file found for meters).
5. **Fonts that cannot ship.** SF Pro is Apple-only (web fallback system-ui on Apple, Inter elsewhere); GT America and Season Mix are trials. [engine note] For client builds use Inter or Geist with the measured tracking.
6. **Gate artefacts.** `gate.mjs` reads text colour against the nearest ancestor background, so labels on absolutely positioned sibling boxes (white on the lime or dark buttons, the promo card) report 1:1 contrast; the real contrasts are fine.

## 6. Figures worth keeping

| File | Teaches |
|---|---|
| `knowledge/benchmarks/heyrico-x/live/work-aster/cdn/04-*.png` | the table system at 4x (R1) |
| `.../work-twin/cdn/04-*.png` | sidebar + promo card zoom at 7x (R2) |
| `.../work-alpaca/cdn/10-*.png` | composer empty state at 10x (R3) |
| `.../work-scout/crop-04-growth-card-*.png` | KPI bar card at 3x (R4) |
| `.../work-alpaca/cdn/02-*.png` | plan-choice onboarding at 3x (R5) |
| `.../live/home/fold-1440@2x.png` | his studio marketing fold (R6) |
| `knowledge/benchmarks/heyrico-x/sheets/top60-by-likes.jpg` | the 60 best unique posts |
| `work/replicas/cmp-ricor1..6-side.png`, `-overlay.png` | reference vs replica at one zoom |

## 7. What we got wrong before (vs `heyrico-product-design.md` and `heyrico-recreation-lessons.md`)

| Earlier claim | Measured now | Consequence |
|---|---|---|
| HR-05: -0.15 px tracking on all 13-16 px UI text | Only the SF table register uses -0.15 to -0.3; Twin -0.04 to -0.1; composer and Inter screens 0 | Tracking is per product, not global |
| Lessons: Inter is his face; 500 renders light at 1x so use 550 | His SF products fit SF Pro exactly; 500 matches ink 0.95-1.1 | The 550 hack was a wrong-font symptom |
| Lessons: strong #262626, sub #6E6E6E (from JPEG darkest ink) | Originals: #737373 (Tailwind neutral 500); his SF ramp #5D5D5D/#7F7F7F exact | JPEG shifted greys by about 5 levels |
| Lessons: export scale found by fitting fonts (1.7578, 1.125) | Scale read from hairlines: 3x, 4x, 7x, 10x | Font fitting alone is ambiguous at high zoom |
| HR-18 / lessons: cards r14, window r16 | Aster window r9-10, plan/suggestion cards r16-16.5, Scout card r6.5, composer r19.5 | Ladder is per product |
| Lessons: sidebar 256-260, 12 px padding | Aster 238 (rows inset 7), Twin 240 (inset 12) | Narrower sidebar in his CRM work |
| Lessons: nav 28 on 30 pitch | Twin 30, Aster 29 | Both exist |
| HR-24: primary 32 h, r10 | Aster primary about 30 h with ring, r8, gradient; onboarding CTAs 40 pills; promo CTA 24 pill | Primary size follows the context |
| HR-10: three greys | Four in tables (header #404040 added) | Header labels get their own grey |
| Older study measured from X JPEGs at "2-3x" | 92 lossless originals exist on acedesign.io | Always fetch the case originals first |

## 8. What performs on X

- Window: 575 own posts, 326 originals (310 with media), 12 Jun - 21 Oct 2026, median 168.5 likes and 12.2k views per media post; text-only posts median 18.
- **Formats** (median likes): cheatsheet text + one screen 438 (n 21) vs other media posts 166; 4-image carousel 185 (n 103), 2 images 185 (n 72), 3 images 224 (n 6), single 144 (n 126).
- **Kinds** (first image, median likes): illustration 260 (n 4), card grid 214, inbox 207, agent panel 194, onboarding 193, app shell 188, modal 186, composer 180, sidebar 179, settings 178, dashboard 162, menu 153, table 133, component sheet 111, chart 90.
- **Light vs dark**: 256 light posts (median 167) vs 49 dark (186); dark is a minority he uses for contrast in a feed, not his default.
- **Crops**: portrait 197 (n 38), landscape 169 (n 170), square 163 (n 99).
- **Reposts**: 149 posts reuse an image (median 191) vs 158 first uses (152); the top cheatsheet image ran three times (1308, 830, 634 likes).
- **Top posts**: "Steal this clean UI blueprint" 1768 likes / 317k views (SF Pro cheatsheet over the Alpaca mobile pair); "One of the best email designs you'll ever see" 1633 / 262k (inbox with tick usage meter); "Apps design UI Cheatsheet" 1308 / 155k; the pinned "We're redesigning @stripe" 719 likes but 660k views.
- **Captions** are short (median 26 characters) and evaluative ("product craft", "every B2B SaaS product design should look like this").

## 9. Design like Rico: checklist

1. One family per product (SF or Inter), one weight (500 or 400), sizes 11-14 with 1 px steps; title <= 19.
2. Four greys from one ramp; colour only in tags, links, glyphs, badges and charts.
3. Surfaces within 3 levels of white, split by one 1 px hairline colour.
4. Rings on controls (0.7-1 px + 5% 1-2 px drop); stroke-only cards; one gradient dark primary.
5. Radius by height: 4 / 6 / 8 / 16 / 20 and pills only on CTAs.
6. 28 px rows on a 29-30 pitch; 38 px table rows; 28 px toolbar.
7. Active state = fill only; counts right-aligned or one blue badge.
8. Sidebar 238-240; composer 480; cards 152 / 320 with 12 / 24 gaps.
9. Empty states: centred title, ringed composer, three stroke cards, a faint pixel band.
10. Present as a flat 1440x900 window on a quiet canvas or a 7-10x component zoom with one edge cut.
11. Before posting: a 5-6 bullet token cheatsheet in the text, 2-4 frames, portrait for components.

## 10. Open questions

- Exact SF Pro optical-size behaviour in Figma vs Chrome's system-ui: widths match, glyph heights run about 0.5 px taller in a few labels.
- The Twin wordmark serif is unidentified (Source Serif 4 600 at 18 px stands in; Lora fits the width equally).
- GT America / GT America Mono are trials; Libre Franklin and Fragment Mono are width-fitted stand-ins, not matches.
- Posts before 12 Jun 2026 are not reachable through the mirror.
- Shadows were fitted visually against 4x edges, not extracted from Figma.
