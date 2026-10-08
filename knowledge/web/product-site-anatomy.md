---
source: web:linear.app + vercel.com + stripe.com + raycast.com + resend.com + clerk.com + attio.com + cal.com + mercury.com + ramp.com + supabase.com + dub.co + cursor.com + granola.ai + plain.com + commslayer.com + alignui.com + mintlify.com (posthog.com attempted, capture failed)
chapter: Product-site anatomy: full homepages of premium product-led SaaS (below the hero), measured at 1440x900
pages: n/a (web, rendered and measured 2026-10-08; raw data in knowledge/benchmarks/product-sites/)
topic_tags: [landing-page, product-site, homepage, section-sequence, rhythm, bento, cards, product-ui, rails, logo-wall, testimonials, final-cta, footer, nav, saas]
status: studied
---

# Product-site anatomy: how premium SaaS homepages are built below the hero

Companion to `landing-page-anatomy.md` (generic section library with [E] geometry) and `alignui-method.md` (founder's favourite aesthetic). That note said its section geometry was an [E] synthesis to be validated by measuring live sites. This note is the validation: 18 live homepages rendered at 1440x900 with Playwright, every section measured, every page read as screenshots. Where this note and the [E] numbers in `landing-page-anatomy.md` 2A disagree, this note wins.

Evidence files (all under `knowledge/benchmarks/product-sites/`):
- `<site>-full.png` full-page screenshots; `slices/<site>-NN.png` 1440x1800 reading slices.
- `sections.json` the aggregated dataset (per-site sequence, nav, headings, seams, card clusters, footer; cross-site summary).
- `raw/` (section blocks, footer), `raw2/` (heading-anchored rhythm and card clusters, `_targeted.json` for sites whose headings are not h1-h3).
- `capture.mjs`, `measure2.mjs`, `measure3-targeted.mjs`, `build-sections.mjs` regenerate everything (run from repo root).

How to read the numbers. "Measured" = computed styles and bounding boxes in the live DOM after scrolling the whole page once. "Read" = counted by me from the screenshots (section order, which pages have rails, eyebrows, logo walls). Counts are out of 18 sites unless stated. Medians are across sites (or across all samples where stated). Nothing here is a conversion claim; it is how top studios build and finish pages.

## 1. Core ideas

1. **A product homepage is a stack of 8-10 sections that all obey one skeleton.** After the hero, the sites that feel most finished repeat one chapter template (heading block, one product visual, optional proof line) with changes of scale and background only. Linear's four product chapters are 1,220-1,232px tall each with identical 128px padding, a 48px/510 heading in a 542px left column, body copy in the right column and a full-width media block below. Variety comes from the visual, not from the grid. (read + measured)
2. **The visual in every section is product UI, cropped.** Not illustration, not stock. Sites crop the real interface to the one or two regions that prove the sentence above it, bleed it off an edge or fade it out, and often float one secondary surface (an AI panel, a chat chip, a phone card) over it. Abstract art is reserved for statement bands and hero backdrops.
3. **Section headings are short, light and tight.** Median section heading: 45px, mode 48px (7 of 18 pages), weight 400-600 (8 of 18 at 450 or lighter), tracking about -0.01 to -0.02em at 40px and up, line-height 1.0-1.15, median 5 words / 33 characters, one or two lines at 1440. The heaviest pages (Cal, Clerk, Supabase) sit at 600; none at 700 for section headings.
4. **The most common copy device is the two-tone lead.** One block, one size, first sentence in ink and the continuation in muted grey (about 55-60% ink): Stripe on every section, Linear, Attio, Mintlify, Cursor, Ramp, Vercel, Supabase, Raycast, Commslayer (bold lead). 10 of 18. It lets a statement carry a claim and its explanation without a subtitle element.
5. **Rhythm is generous and regular.** Median distance from the last content of one section to the top of the next heading group is 206px (IQR 141-273, n=90 seams). That is two section paddings of 96-128px. Explicit CSS paddings I could read: Linear 128/128, Stripe 96/96 (80/80 on bands), Resend 96/96, Supabase about 96, Granola 112/112 and 128/128, Cal 101 top, Dub 80 top, Commslayer 81 top.
6. **Containers are narrower than the viewport and constant.** Content width median 1,200px (range 998-1,392). The six rail-based pages (Cal, Dub, Mintlify, AlignUI, Supabase, Mercury) hold 1,000-1,090px of content. Every section heading on a page shares one left edge (Linear x=78/80 for all six chapter headings; Supabase x=176 for all six).
7. **Separation is by structure, not shadow.** 9 of 18 use vertical rails plus horizontal hairlines (Stripe, Cal, Dub, Mintlify, Commslayer, AlignUI, Attio, Plain dashed, Supabase partial). Most of the others separate by a background-band change with a shaped edge (Clerk 45-degree chamfer, Dub concave notch, Plain and AlignUI rounded panel corners, Granola colour blocks, Stripe navy bands). Almost none rely on drop shadows between sections.
8. **Proof is a row, a tile grid or a strip, placed right under the hero.** Logo walls exist on 13 of 18 pages and sit at y=690-1,470 (median about 1,190) at 1440x900, i.e. the first or second section. 10 of 13 walls I read are single-colour (ink, white or grey), 2 are full colour (Stripe, Mintlify), 1 mixed (Commslayer). Testimonials come later as 2-card colour fills, a carousel with faded edges, a single large quote, or quote-plus-metric strips.
9. **Pricing and FAQ are not on the homepage.** Pricing teaser: 0 of 18. FAQ: 3 of 18 (Cal, Commslayer, AlignUI). Everything else defers to the nav "Pricing" link. This overrides the older assumption in `landing-page-anatomy.md` 2A that a pricing teaser and FAQ are default sections.
10. **Velocity is shown with a changelog module.** 7 of 18 carry a "what we shipped" strip (Linear, Cursor, Stripe news, Mintlify, Attio, Dub, Raycast): four entries in a row, mono or muted dates, 1-2 line titles. It is honest proof for a company with no customer logos yet.
11. **Every page closes the same way.** A dedicated closing block exists on 16 of 18 (Clerk ends on a post wall, Mercury on two product cards). Heading either large and centred (56-88px: Linear 72, Cursor 72, Resend 76.8, Granola 88, Vercel 56, Attio 56) or section-scale inside a panel (32-48px), 1-2 buttons, and frequently an echo of the hero line (Ramp and Supabase repeat it verbatim). Then a footer with a median of 6 link columns and a median height of 701px.

## 2. Rules

Format per SCHEMA. Grouped; strongest first inside each group. "Source" lists the sites where the number was measured or the pattern read.

### 2.1 Sequence and page shape

- **RULE** Build the homepage as hero, then proof strip, then 3-5 product chapters, then 1-2 breather sections, then a closing CTA, then the footer: 8-10 distinct sections between hero and footer (typical page 8-10, extremes 6 and 14).
  **Why** Visitors who scroll past the fold need one reason to trust, several demonstrations, and one place to act; fewer than 6 sections reads as thin, more than 12 dilutes (Commslayer at 13 sections needs five stat and quote strips to hold the pace).
  **Applies to** landing page. **Check** count top-level sections between the hero and `footer`; expect 6-13. **Source** all 18 (read).

- **RULE** Size the page to 9,000-14,000px at 1440 wide (about 10-16 viewports of 900px) for a full product site; under 7,500px only for a single-product utility.
  **Why** Median measured page height is 11,933px (IQR about 8,500-14,100, range 5,930-17,977). Shorter pages (Vercel 5,930, Clerk 7,187, Supabase 7,691) have 3-6 chapters but each is dense.
  **Applies to** landing page. **Check** `document.documentElement.scrollHeight` at 1440x900 after a full scroll. **Source** all 18 (measured).

- **RULE** Put the first proof element (logo row, logo tile grid, or a one-line stat claim) directly under the hero, with its top between y=700 and y=1,500 at 1440x900.
  **Why** It answers "is this legit" before the first feature chapter; 13 of 18 pages do it and the top edge clusters at 690-1,470.
  **Applies to** landing page. **Check** first section after the hero contains a logo row/grid or a numeric claim; its top y in [700, 1500]. **Source** Linear 1,340, Vercel 800, Stripe 690 (attached to hero bottom), Cal 812, Cursor 1,180, Mintlify 1,058, Dub 1,128, Commslayer 1,304, Attio 1,323.

- **RULE** Give each product chapter its own product visual; never ship a chapter whose only visual is an icon, a gradient or a stock photo.
  **Why** The visual is the proof for the sentence; 15 of 18 sites show UI in at least 80% of their feature chapters (exceptions are art-led by design: Raycast hero shards, Mercury art panels, Granola photography).
  **Applies to** landing page. **Check** each chapter container holds an `img`/`canvas`/`video` or a built UI component at least 400x240px. **Source** Linear, Vercel, Cal, Dub, Resend, Mintlify, Attio, Cursor.

- **RULE** Insert a text-only breather after every 2-3 media-heavy sections: a statement of at most 3 lines at 36-48px, a 3-4 number stat row, or a quote-plus-metric strip 280-390px tall with 60-65px vertical padding.
  **Why** Alternating dense and quiet bands is what makes a long page scannable; Commslayer's five strips (two stat headlines, three quote strips) measure 282-385px tall with 61-65px padding each side, Linear's statement is 48px/510 over 3 lines, Mintlify's stat row has 3 numbers.
  **Applies to** landing page. **Check** no run of more than 3 consecutive sections taller than 700px that contain large media. **Source** Commslayer, Linear, Mintlify, Stripe, Cursor, Dub.

- **RULE** Leave pricing and FAQ off the homepage by default; link "Pricing" in the nav and the closing CTA. Add a FAQ only when buying objections are the main blocker, as an accordion with 6 rows of about 69px and hairline dividers beside a 346px heading column.
  **Why** 0 of 18 carry a pricing teaser and 3 of 18 a FAQ; pricing work belongs to a funnel page (`funnels-and-conversion.md`).
  **Applies to** landing page. **Check** homepage section list has no pricing grid; if FAQ is present it uses the split layout with <= 8 rows. **Source** Cal, Commslayer, AlignUI (FAQ); absent on the other 15.

- **RULE** Add a changelog/"shipped" strip when proof is thin: 4 entries in one row, a mono or muted date, a 14-16px title, one-line excerpt, and a single "View all" link.
  **Why** Shows velocity without naming customers; 7 of 18 do it.
  **Applies to** landing page. **Check** a section with 3-4 dated entries and a link to the changelog page. **Source** Linear (4 entries on a dotted timeline, mono dates), Cursor (4 tiles), Stripe, Mintlify, Attio, Dub ("We ship fast"), Raycast.

### 2.2 Section rhythm and container

- **RULE** Use one section padding from the 80-128px band and keep it on every section of the page; 96px is the modal value, 128px for the airiest sites.
  **Why** Explicit padding found: Linear 128/128, Stripe 96/96, Resend 96/96, Supabase about 96, Granola 112 and 128, Cal 101, Dub 80, Commslayer 81 top. A single value is what makes the page feel engineered.
  **Applies to** landing page. **Check** computed padding-block of every section is in 80-128px and at most 2 distinct values (plus the closing CTA). **Source** Linear, Stripe, Resend, Supabase, Granola, Cal, Dub, Commslayer.

- **RULE** Keep the distance from the last content of a section to the next section's heading group between 140 and 280px (target about 205).
  **Why** Measured median 206px, IQR 141-273 over 90 seams; less than 140 makes sections bleed together, more than 300 makes the page read as empty.
  **Applies to** landing page. **Check** (next heading group top, eyebrow included) minus (previous content bottom) in [140, 280] for at least 80% of seams. **Source** Linear 270, Resend 207, Ramp 229, Mintlify 224, Supabase 179, Stripe 166, Cursor 152, Granola 145, Commslayer 141, Dub 138 (per-site medians).

- **RULE** Fix one content container between 1,000 and 1,320px and align every section heading to its left edge (or centre them all).
  **Why** Median content width 1,200px (998-1,392). Heading left edges match exactly across sections on Linear (78/80), Supabase (176), Resend (104), Commslayer (121), Clerk (120).
  **Applies to** landing page. **Check** left x of all section headings equal within 1px (left-aligned pages) or all centred on x=720; max-width of the container in [1000, 1320]. **Source** Linear 1,280, Resend 1,232, Stripe 1,232, Clerk 1,200, Plain 1,200, Cursor 1,300, Ramp 1,312, Supabase 1,088, Cal 1,048.

- **RULE** On rail-based pages, set the inner content 16-45px inside the rails and the rails 1,000-1,280px apart.
  **Why** Measured rails: Stripe x=88/1,352 with content at 104; Cal 120/1,320; Dub 180/1,260 with content at 221; Mintlify 170/1,256 with content at 215; Commslayer 80/1,360 with content at 121; AlignUI 112/1,328; Attio 24/1,416. The inset keeps text off the line.
  **Applies to** landing page with rails. **Check** (content left x) minus (rail x) in [16, 45]. **Source** Stripe, Cal, Dub, Mintlify, Commslayer, AlignUI, Attio.

- **RULE** Pick one heading alignment and keep at least 70% of section headings on it: centred for plate-and-rail light pages (Cal 6 of 7, AlignUI 5 of 6, Ramp 4 of 5), left for editorial or dark pages (Linear 6 of 6, Mintlify 7 of 7, Commslayer 5 of 5).
  **Why** Mixed alignment reads as unplanned; the few mixed pages (Attio, Granola, Clerk) alternate on purpose with a left sticky nav or alternating media sides.
  **Applies to** landing page. **Check** share of section h2/h3 with the same text-align >= 70%. **Source** Cal, AlignUI, Ramp, Linear, Mintlify, Commslayer.

- **RULE** Stack chapters with the same 2-column skeleton: heading in a 380-560px left column, 18-20px body (or two-tone paragraph) in the right column or under the heading, then the media at full container width with 32-64px (heading only) or 110-160px (heading plus body and button) between text and media.
  **Why** Linear uses 542px headings with right-column body and 137-241px to the media; Supabase and Vercel use 44-102px when there is no body. The constant skeleton is the identity.
  **Applies to** landing page. **Check** heading width in [380, 700] on left-aligned pages; first media top minus heading bottom in [32, 64] or [110, 250]. **Source** Linear, Supabase, Vercel, Mintlify, Cal, Resend, Granola.

### 2.3 Headings, subtitles, eyebrows, copy

- **RULE** Set section headings at 36-56px (default 48px), weight 400-600 (default 500), tracking -0.02em for 48px and up, line-height 1.0-1.15, maximum two lines at 1440.
  **Why** 12 of 18 pages sit in 40-56px; 7 use 48px exactly; tight tracking appears at -0.02 to -0.06em on 7 pages (Vercel -0.06, Resend -0.05, AlignUI -0.028, Linear -0.022, Plain -0.02, Mintlify -0.02, Stripe -0.02); heavier than 600 appears on none.
  **Applies to** landing page. **Check** computed font-size/weight/letter-spacing/line-height of section h2; lines = height / line-height <= 2. **Source** AlignUI 48/550/-0.028, Linear 48/510/-0.022, Resend 56/400/-0.05, Vercel 56/450/-0.06, Dub 48/500, Cal 48/600, Supabase 34/600, Mintlify 36/500/-0.02.

- **RULE** Write section headings of 3-6 words (median 5 words, 33 characters; hard limit 13 words including a two-tone continuation).
  **Why** Short headings hold at 48px on one or two lines; Linear's chapter headings are 2-3 words ("Intake and integrations", "Planning and monitoring"), Resend's 3-4 ("Integrate tonight", "Go beyond editing"), Dub's median 3.
  **Applies to** landing page. **Check** word count of each section h2 <= 6 (or <= 13 for two-tone statements). **Source** Linear, Resend, Dub, Plain, Cal, Granola.

- **RULE** For statements and chapter intros use the two-tone lead: one paragraph at one size (22-48px), first sentence in ink, continuation at about 55-60% ink.
  **Why** 10 of 18 do it; it replaces a separate subtitle, keeps the type scale small and makes the first sentence the scannable claim.
  **Applies to** landing page. **Check** a single element with two spans of different `color` and equal `font-size`; muted span contrast still >= 4.5:1 on its surface. **Source** Stripe (every section, 32/300), Linear (48/510 statement), Attio (40/500), Mintlify (36/500, 3 lines), Cursor (22/400), Ramp (28 and 48/400), Vercel (20px lines), Supabase, Raycast.

- **RULE** Under a section heading, run a muted subtitle of 16-18px (default 18), about 100 characters, two lines, in a 540-680px measure; omit it when the heading is already a full sentence.
  **Why** Measured: 18px is the mode (about 40 samples) with 16px next; median 105 characters, median 2 lines; widths Cal 640, Dub 576, AlignUI 515-590, Ramp 540, Plain 678.
  **Applies to** landing page. **Check** subtitle font-size in [16, 18], width in [500, 700], lines <= 2. **Source** Cal, Dub, AlignUI, Resend, Ramp, Plain.

- **RULE** Use an eyebrow only to name something the heading does not (a product line, a category), 11-14px, 12-16px above the heading; if you use one, use it on every chapter.
  **Why** 7 of 18 pages use per-section eyebrows consistently (Cal, AlignUI, Attio, Plain, Dub, Clerk, Granola), 1 uses it once (Raycast "AI AGENT"), 10 use none. Consistent use works; scattered use looks accidental.
  **Applies to** landing page sections (not the hero; see founder rule). **Check** either every chapter has an eyebrow or none does; eyebrow height 20-28px; eyebrow-to-heading gap 12-16px. **Source** Cal (icon pill), AlignUI (white pill with icon, 1px border), Attio (pill), Plain (mono uppercase chip with dotted border), Dub (icon plus product name), Clerk (13px coloured label), Granola (serif label).

- **RULE** Prefer outcome or verb headings over feature nouns; never title a chapter "Features", "Benefits" or "Why us" as the heading itself (use them as eyebrows if at all).
  **Why** The studied headings are claims or actions ("Integrate tonight", "Reach humans, not spam folders", "Catch changes to the deal"). Cal's "Benefits" is an eyebrow above "Your all-purpose scheduling app".
  **Applies to** landing page. **Check** section h2 text not in the banlist {Features, Benefits, Why us, Overview, Solutions}. **Source** Resend, Cal, Attio, Linear.

### 2.4 Proof: logo walls, testimonials, metrics

- **RULE** Render a logo row or grid in a single colour (ink, white or 40% grey) at a uniform optical height; never mix full-colour logos with mono ones.
  **Why** 10 of 13 walls are single-colour; the two full-colour walls (Stripe, Mintlify) sit in tiles or a bar that carries the structure. Mono walls read as one object instead of seven brands.
  **Applies to** landing page. **Check** all wall images share a `filter`/fill colour; heights within 4px of each other. **Source** Linear (white), Vercel (ink), Cal (ink, marquee with edge fade), Supabase (grey), Dub (ink tiles), Cursor (dark tiles), Plain (ink), Ramp (grey), Attio (ink, 5x2 hairline cells), Clerk (ink, rotating set with fade).

- **RULE** Choose one wall form: a marquee row on the page canvas (Cal 106px band between rails, Vercel, Plain, Commslayer), or a tile grid with tiles 3-5% darker than the canvas (Cursor 8 tiles of 154x100, Dub 4x2 tiles 251x80, Mintlify 4x2 tiles, Ramp 6x2) or hairline-divided cells (Attio 5x2 cells of about 278x97).
  **Why** Tiles make a hairline-free structure and double as a rhythm element; rows are quieter. Both appear immediately after the hero.
  **Applies to** landing page. **Check** wall uses either a single row (height <= 120px) or a grid of equal tiles (equal width and height, gap 8-12px). **Source** Cal, Vercel, Cursor, Dub, Mintlify, Ramp, Attio.

- **RULE** Introduce the wall with at most one line: either 14px muted ("Trusted by fast-growing companies") or a stat sentence at 24-28px ("3000+ ... run their support on X"); never a 48px heading.
  **Why** The wall is evidence, not a section. Commslayer, Ramp and Mintlify use a number-led sentence; Supabase and Cal use a small muted caption.
  **Applies to** landing page. **Check** caption font-size <= 28px and one or two lines. **Source** Commslayer, Ramp, Mintlify, Supabase, Cal, Cursor.

- **RULE** Never invent proof. When the brand has no customers, replace the wall with a labelled sample stat, a changelog strip, or the product's own live counter; mark sample data as sample.
  **Why** 5 of 18 pages have no logo wall at all (Raycast, Mercury, Granola, AlignUI, Resend's is a later 30-card customer wall) and still feel finished; fabricated logos, quotes or counts break engine principle 4.
  **Applies to** landing page. **Check** every logo, quote, name and metric traces to a real source or carries a "sample" label. **Source** Raycast, Mercury, Granola, AlignUI (no wall); Mintlify "Agents at work today" counters; Stripe and Ramp live counters.

- **RULE** Show testimonials in one of four forms and keep quote text at 24-36px: (a) two colour-filled quote cards at 880x480 and 432x480 (Linear), (b) a 3-up carousel of 476x250 cards with the centre card emphasised and the edges faded, 48px apart (Cal), (c) one centred quote at 28px with no card (Mercury), (d) a quote-plus-metric strip (Commslayer).
  **Why** Quotes at body size read as footnotes; at 24-36px they carry the page. Named person, role and company logo are present on every instance.
  **Applies to** landing page. **Check** quote font-size in [24, 36]; each quote has name and role; carousel edges use a mask. **Source** Linear (32px/400, -0.022em), Cal, Mercury (28px/360), Commslayer (24px/400), Granola (36px/400), Attio, Dub.

- **RULE** Pair a quote with one metric when you have a real one: number 36-65px at weight 400-480, caption 16-18px beneath, placed in the strip's right column behind a 1px divider.
  **Why** Commslayer's strips ("56% AI resolution rate", "49%") turn a quote into evidence; Mintlify's stats are 36px/400 with 16px captions; Mercury's "1 in 3" is 65px/480 with an 18px caption.
  **Applies to** landing page. **Check** numeral font-size in [36, 66], caption in [14, 18], at most one numeral per quote strip. **Source** Commslayer, Mintlify, Mercury, Stripe (4-up stats band on a dark gradient: numerals light weight 300-480, captions 14-16px).

### 2.5 Bento and feature-card craft

- **RULE** Build the first bento with 3-7 tiles on a 12-column grid: one lead tile at 1.5-2x the width of the others, gaps 8-16px (card-gap median 18px across all clusters, mode 12 and 16), tile heights 400-560px.
  **Why** Supabase: one 538x400 lead plus 3 plus 4 small 263x400 tiles. Linear: 3 tiles of 400x560 beside a 672x632 lead. Cal: 2x2 of 516x450. Resend: 2 tiles of 600x526. A dominant tile gives the grid a point of view.
  **Applies to** landing page. **Check** tile count in [3, 7]; largest tile width / median width in [1.5, 2.2]; gap in [8, 24]. **Source** Supabase, Linear, Cal, Resend, Plain (387x220 tiles, 20px gap).

- **RULE** Reserve an 11-13 tile catalogue grid for one "everything" section, with 8px gaps and text-first tiles (title 16px/500, 2-line body, small visual); do not use it as the primary feature section.
  **Why** Clerk's dark security grid (11 tiles of 395px, 8px gaps) and Stripe's solutions bento (13 tinted tiles) work because they follow a 3-5 tile hero section and are visibly a catalogue.
  **Applies to** landing page. **Check** at most one section with more than 8 tiles; tile gap in [8, 16]. **Source** Clerk, Stripe, Cal ("and so much more": 8 icon tiles of 178x178, 12px gap, heading 4 words, no body).

- **RULE** Set card radius to 12 or 16px (median 12; 16 is the second mode), keep at most 4 distinct card radii on a page, and nest inner media at the card radius minus the padding.
  **Why** Across 58 card clusters the median radius is 12px; 16px appears in 15 clusters; 24-28px is used only for large plates and AlignUI/Granola panels. Raycast (5 radii) and Supabase (4) show the limit of variety before it reads as noise.
  **Applies to** landing page. **Check** collect `border-radius` of outermost cards: distinct values <= 4 and median in [10, 16]. **Source** Cal 16, Attio 12, Mercury 12, Ramp 12, Linear 12, Commslayer 12/16/24, AlignUI 16/24/28, Mintlify 6/12, Stripe 6.

- **RULE** Pick one of three card surfaces and use it for the whole page: (a) white, 1px hairline, whisper shadow on a grey canvas; (b) flat tinted fill with no border and no shadow; (c) dark surface with a 1px rgba(255,255,255,0.08-0.12) hairline.
  **Why** (a) Cal, Attio, Supabase, AlignUI, Mintlify, Dub; (b) Plain (#f9f6f1), Stripe tiles, Ramp, Cursor (#f2f1ed plates), Granola, Mercury; (c) Linear, Resend, Clerk, Raycast. Mixing surfaces within a page is what looks assembled.
  **Applies to** landing page. **Check** outermost cards on the page share one of the three recipes. **Source** see Why; recipe values in section 3.

- **RULE** On a light AlignUI-style page use recipe (a) with a hairline ring plus a faint lift: for example 0 1px 5px -4px rgba(36,36,36,0.7), 0 4px 8px rgba(36,36,36,0.05) and a 1px ring at about 8% ink; keep floating-card blur at or below 24px and alpha at or below 0.16.
  **Why** Cal and Attio use exactly this level (Attio: 1px rgba(56,62,71,0.1) border plus 0 4px 12px -1px rgba(0,22,62,0.04)); it matches the founder's shadow rule.
  **Applies to** landing page cards. **Check** card box-shadow blur <= 24px, alpha <= 0.16 on feature cards. **Source** Cal, Attio, Supabase (1px rgba(16,16,16,0.08), no shadow), Mintlify (1px at 4-7% ink, no shadow).

- **RULE** Give large app windows (hero scale or a chapter's main window) deeper depth than cards, but still layered: two shadows such as 0 28px 70px rgba(0,0,0,0.14) with 0 14px 32px rgba(0,0,0,0.10), on a tinted plate.
  **Why** Cursor's windows float on painted plates with that pair; Stripe's app cards use 0 15px 35px rgba(23,23,23,0.08) plus 0 3px 6px rgba(23,23,23,0.06). The founder cap of 24px blur applies to cards and chips, not to a whole app window on a plate; if the cap must hold, move depth into the plate.
  **Applies to** landing page product windows. **Check** shadow only on windows >= 700px wide; cards stay within the 24px cap. **Source** Cursor, Stripe.

- **RULE** Build a card as title (16-20px/500), body (14-16px, muted, at most 3 lines, about 60-140 characters) and a visual, with 24-32px padding; let the visual bleed into the card edge or be cut by it.
  **Why** Cal pads 24px with copy on top and a cropped form fragment cut at the card bottom; Supabase pads 24px (40px vertical on lead tiles); AlignUI and Mercury use 32px; Mintlify 16px (32px on lead). The cut makes the UI feel bigger than the card.
  **Applies to** landing page. **Check** card padding in [16, 32]; title <= 6 words; body <= 3 lines; media overflow hidden at at least one card edge. **Source** Cal, Supabase, AlignUI, Mercury, Mintlify, Clerk.

### 2.6 Product UI inside sections

- **RULE** Show the product window at 1,000-1,320px wide (aspect 1.6-2.2, median about 1.8) in the first chapter after the hero; later chapters may use 600-1,100px crops.
  **Why** Measured main windows: Linear 1,320x720, Cursor 1,300x720, Ramp 1,312x586, Plain 1,224x677, Attio 1,080x619, AlignUI 1,152x620, Resend 1,232x700, Supabase 1,088x644, Vercel 921x486, Dub 908x580. Text in the UI stays legible (>= 12px effective) at those sizes.
  **Applies to** landing page. **Check** main product media width in [900, 1320]; rendered UI text >= 12px; aspect in [1.5, 2.3]. **Source** all listed.

- **RULE** Crop UI to the 1-2 regions that prove the sentence and cut or fade it at an edge: bottom fade over the last 15-25%, right-edge bleed, or a card-edge cut. Do not show a whole app shrunk to illegibility.
  **Why** Vercel fades its customer-site screenshots at the bottom; AlignUI fades the template preview; Cal cuts forms at the card bottom; Mintlify and Granola bleed windows off the right edge. The cut implies "there is more".
  **Applies to** landing page. **Check** media has `mask-image`/gradient overlay on one edge or overflows its container; no UI text below 11px. **Source** Vercel, AlignUI, Cal, Mintlify, Granola, Clerk, Commslayer.

- **RULE** Float one secondary surface over each hero-scale window (an AI panel, a chat chip, a phone card, a video chip), offset by 10-15% of the window width and overlapping by 8-20%.
  **Why** Linear overlays an AI panel on an issue view; Cursor overlays a CLI window on the app; Ramp overlays a Bills phone card and a ticker; Mintlify overlays an "Ask assistant" chip; Commslayer overlays a "See Commslayer in action" video chip. It shows the second layer of the product (AI or mobile) without a second screenshot.
  **Applies to** landing page product windows. **Check** a child surface with its own shadow overlaps the main window by 8-20% of its width. **Source** Linear, Cursor, Ramp, Mintlify, Commslayer.

- **RULE** Put chrome around product UI only when the frame is part of the brand: macOS three-dot windows on a painted plate (Cursor), browser chrome (AlignUI), a pale branded frame (Plain's green frame, Ramp's grey plate); otherwise place bare UI on a tinted plate.
  **Why** Frames of different families side by side look assembled; one frame family per site keeps the product looking like one thing.
  **Applies to** landing page. **Check** all product windows on the page share a frame recipe (chrome yes/no, plate colour, radius). **Source** Cursor, AlignUI, Plain, Ramp, Linear (frame with glow base).

- **RULE** Use a tab or accordion showcase for 3-5 features that share one panel: fixed panel size so nothing shifts, first tab active, tabs as 32-40px pills with a 16-20px coloured icon tile, and a 1px progress rule or underline.
  **Why** Dub: 3 tabs over a 908x580 window with a dark caption bar; Mercury: a 3-row accordion with a 1px top rule and dot marker beside a product panel; Commslayer: 5 pill tabs; Clerk: 4 hero tabs (User Authentication, Multi-tenancy, Enterprise Authentication, Agent Authentication) over a component demo with a 3-pill sub-switcher; Resend: 12 language icons above a 1,024px code window. Fixed size avoids layout shift.
  **Applies to** landing page. **Check** tab count in [3, 5] (language pickers excepted); panel height constant across tabs; keyboard arrows move focus. **Source** Dub, Mercury, Commslayer, Clerk, Resend.

- **RULE** Use a sticky-scroll story only for 5 or more steps sharing one large visual, at about 1,200-1,300px of scroll per step; otherwise stack chapters.
  **Why** Attio's sticky 5-item list ("Build pipeline", "Convert leads", "Run sales motions", "Forecast revenue", "Retain and expand") occupies 6,479px (about 1,296px per step); Ramp's single scroll story is 2,700px. Linear stacks four chapters of 1,220-1,232px instead and stays simpler.
  **Applies to** landing page. **Check** sticky container with >= 5 steps; each step height in [1,000, 1,400]; static fallback exists. **Source** Attio, Ramp, Linear (stacked alternative).

- **RULE** Prefer a live-built component over a video for one or two moments per page: typed text and keycaps (Raycast), code-to-preview (AlignUI), log lines and event timeline (Resend), toggles and radios (Commslayer).
  **Why** Real DOM renders crisp at every size, loads cheaply and can be reduced-motion safe; four of the best-regarded sites do it.
  **Applies to** landing page. **Check** at most 2 animated components per page; all have a static end state; `prefers-reduced-motion` shows the end state. **Source** Raycast, AlignUI, Resend, Commslayer.

- **RULE** Use photography only when people are the product's subject, and treat it (halftone, desaturation, colour wash, painted plate); never stock.
  **Why** 6 of 18 pages use photos: Cursor team photo, Mintlify event photo, Granola halftone portraits, Stripe aerial case image, Ramp portrait tile, Mercury hero landscape. All are tied to a named story or a brand world.
  **Applies to** landing page. **Check** every photo is attributable to a customer, team or place in the story. **Source** Cursor, Mintlify, Granola, Stripe, Ramp, Mercury.

### 2.7 Separation: rails, hairlines, bands

- **RULE** On a light grey canvas, draw 1px full-height rails at the container edges plus full-bleed horizontal hairlines at section seams; end the rail structure at the footer.
  **Why** Nine pages use it; light ones with the closest taste match are Cal, Dub, AlignUI, Mintlify, Commslayer and Attio. Rails plus hairlines replace shadows and cards as structure and match the founder rails rule.
  **Applies to** landing page. **Check** rail elements span the full page height between hero and footer; hairline colour about 8% ink; hairlines extend past the rails to the viewport edges. **Source** Stripe (rails 88/1,352, dashed row dividers), Cal (120/1,320), Dub (180/1,260), Mintlify (170/1,256), Commslayer (80/1,360), AlignUI (112/1,328), Attio (24/1,416).

- **RULE** Break the canvas with one or two contrasting bands (dark band in a light page), entered and exited with a shaped edge: 24-30px rounded panel corners, a 45-degree chamfer of about 44px, or a concave notch.
  **Why** Stripe's navy developer section, Clerk's dark bento (45-degree chamfer), Dub's dark closing panel (notch), Plain's dark-green comparison (rounded bottom), AlignUI's dark 3x2 feature panel, Commslayer's dark integrations block. A hard rectangle band looks like a different site.
  **Applies to** landing page. **Check** a band with a different background than its neighbours has a non-rectangular edge or radius >= 24px; at most 2 bands per page. **Source** Stripe, Clerk, Dub, Plain, AlignUI, Commslayer.

- **RULE** Use a near-white or near-black canvas, grey in the 244-250 range for light pages, with cards and plates one step lighter or darker.
  **Why** Measured canvases: Cal #f4f4f4, Clerk #f7f7f8, AlignUI #f7f7f7, Vercel/Dub/Commslayer #fafafa, Cursor warm #f7f7f4 with #f2f1ed plates; white pages (Stripe, Granola, Plain, Ramp, Mintlify) separate with tinted plates. Dark pages are #08090a (Linear), #07080a (Raycast), #000 (Resend).
  **Applies to** landing page. **Check** body background lightness in [95, 100] or [0, 6] (OKLCH L x 100); no mid-grey canvases. **Source** Cal, Clerk, AlignUI, Vercel, Dub, Cursor, Linear, Raycast, Resend.

### 2.8 Closing CTA, footer, nav

- **RULE** End with one closing CTA block of 340-620px: a centred heading (56-88px for a bare band, 32-48px inside a panel), one primary and one secondary button, and reassurance microcopy 12-24px under the buttons.
  **Why** Measured block heights: Cursor 346, Ramp 370, Stripe 380 (bar), Attio 417, Commslayer 599 (card with checklist and a product fragment), Dub 608 (dark panel with review badges); slim variant Mintlify 139 (headline left, two buttons right). Every one has exactly one primary action.
  **Applies to** landing page. **Check** one section before the footer with h2, one filled button and at most one secondary; height in [340, 620] (or 120-180 for a slim bar). **Source** Linear 72px, Cursor 72px, Resend 76.8px, Attio 56px, Vercel 56px, Granola 88px, Dub 48px, Cal 48px.

- **RULE** Echo the hero promise in the closing heading, or repeat it verbatim, and repeat one proof item beside the buttons (rating badges, award laurels, or a three-item checklist).
  **Why** Ramp repeats "Time is money. Save both." and Supabase repeats its hero line; Dub shows G2/Product Hunt star badges, Cal shows award laurels plus stars, Commslayer lists "Free plan / 14 day trial / Cancel anytime" with three badges.
  **Applies to** landing page. **Check** closing h2 shares >= 50% of its words with the hero h1 or a stated reassurance row sits within 48px of the buttons. **Source** Ramp, Supabase, Dub, Cal, Commslayer.

- **RULE** Build the footer with 4-8 link columns plus a brand column: heading 14px/500 in ink, links 14px (13-16) at about 60% ink, top padding 52-81px, total height 400-1,100px (median 701), a bottom row with copyright and legal links.
  **Why** Measured: median height 701px (402-1,493); link size 14px in 9 of 15 measured footers (13px in 2, 16px in 4); Linear links are rgb(138,143,152) on rgb(8,9,10); effective top padding Linear 57, Cursor 67, Commslayer 65, Stripe 64, Vercel 52, Attio 81.
  **Applies to** landing page. **Check** footer link font-size in [13, 16]; column count in [4, 8]; footer height in [400, 1,100] unless the site has 70+ links. **Source** Linear, Cursor, Commslayer, Stripe, Vercel, Attio, Mintlify, Resend.

- **RULE** Include only trust utilities that are true for the product in the footer bottom row: system status pill, theme switch, social icons, compliance line, language select.
  **Why** Status pill (Vercel "ALL SYSTEMS NORMAL", Dub, Mintlify, Cal); theme switch (Vercel, Cursor, Mintlify, Supabase); compliance (Cal ISO/SOC 2/HIPAA badges, Cursor "SOC 2 | ISO27001..." line, Dub SOC 2); language (Cursor, Cal, Stripe). A utility that is not real (an invented compliance badge) breaks the honesty rule.
  **Applies to** landing page. **Check** each utility links to a real page or state; no certification badge without a trust-centre link. **Source** Vercel, Dub, Mintlify, Cal, Cursor, Supabase.

- **RULE** Keep the nav sticky (16 of 18 pages), 52-76px tall (median 65px), with logo left, 4-6 links, and Log in (secondary) plus the primary action on the right; when it floats as a pill (Cal, Granola, Raycast, Clerk, Commslayer, AlignUI) inset it 8-16px from the viewport edge.
  **Why** Measured heights 42-76px (Clerk's floating pill 42, Linear 73 fixed with blur(20px), Supabase 65, Cursor 52 fixed, Stripe 76 non-sticky, Raycast pill 92 including its margin). Only Stripe and AlignUI scroll the nav away.
  **Applies to** landing page. **Check** nav `position: sticky|fixed`; height in [52, 76] (pill: 42-56 excluding margin). **Source** Linear, Vercel, Cursor, Supabase, Mintlify, Resend, Cal, Raycast, Clerk, Commslayer.

### 2.9 Motion and finish on the long page

- **RULE** Limit ambient motion to three types on a page (for example a logo marquee, a carousel with arrows, one scroll-lit paragraph) and stop all of them under `prefers-reduced-motion`.
  **Why** Observed: logo marquees (Cal, Commslayer, Plain), card carousels with arrows (Raycast, Mintlify, Supabase), post marquees (Supabase, Cal), scroll-lit text (Raycast), ticking counters (Stripe, Ramp, Mintlify). Pages that stack all of them (Raycast, Commslayer) pay for it in length.
  **Applies to** landing page. **Check** count distinct looping or scroll-linked effects <= 3; reduced-motion media query disables each. **Source** Cal, Commslayer, Plain, Raycast, Mintlify, Supabase, Stripe, Ramp.

- **RULE** Ship every section with a no-JS, fully-revealed static state; do not rely on scroll-reveal to make the first paint complete.
  **Why** In full-page captures several sites showed empty or half-drawn components (Commslayer's first app plate, Clerk's "Fraudulent sign-ups detected" card, Raycast's scroll-lit text) because reveal state is scroll-driven; a screenshot, a crawler or a slow device sees the same.
  **Applies to** landing page. **Check** render with JS disabled and reduced motion: no container has `opacity: 0` or empty media. **Source** Commslayer, Clerk, Raycast (observed in capture).

## 3. Numbers & scales

### 3.1 Cross-site summary (measured unless marked read)

| Quantity | Median | Range / IQR | n | Note |
|---|---|---|---|---|
| Page height at 1440 wide | 11,933px | 5,930-17,977; IQR about 8,500-14,100 | 18 | after one full scroll |
| Distinct sections between hero and footer | about 9 | 6-14 | 18 | read |
| Section heading size | 45px | 20-56; mode 48 (7 pages) | 18 | per-site median of section h2 |
| Section heading weight | about 490 | 300-600; 8 of 18 at <= 450 | 18 | |
| Section heading tracking | -0.01em | -0.06 to +0.01; 7 of 18 at <= -0.02 | 18 | |
| Section heading line-height | 1.1 | 1.0-1.3; 7 of 18 at <= 1.05 | 18 | |
| Section heading length | 5 words / 33 chars | 3-13 words | 18 | |
| Subtitle size / length / lines | 18px / 105 chars / 2 | 14-24px | about 70 | 16px second most common |
| Seam (content end to next heading group) | 206px | IQR 141-273 (n=90) | 90 | outliers over 700px dropped (sticky stories) |
| Section padding (explicit) | 96px | 80-152 | 9 | Linear 128, Stripe 96, Resend 96, Supabase about 96, Granola 112/128, Cal 101, Dub 80, Commslayer 81, Attio 152 |
| Content width | 1,200px | 998-1,392 | 18 | rails pages 1,000-1,090 |
| Card radius | 12px | 6-28 (+44 phone bezel) | 58 clusters | 16 is the second mode |
| Card gap | 18px | 8-32; carousels 48-56 | 34 | mode 12 and 16 |
| Nav height | 65px | 42-116 incl. announcement bars | 15 | sticky/fixed on 16 of 18 (read) |
| Footer height | 701px | 402-1,493 | 15 | median 6 link columns, link text 14px |
| Final CTA block height | about 400px | 139 (slim bar) to 608 | 9 | |
| Logo-wall tiles | 154x100 (Cursor), 251x80 (Dub), 166x160 (Mintlify), about 164x164 (Ramp), about 278x97 (Attio) | | 5 | |
| Quote text size | 28-32px | 24-36 | 8 | |
| Stat numerals | 36-65px | weight 300-480 | 5 | captions 14-18px |

### 3.2 Per-site table (1440x900)

n/m = not measured or not applicable.

| Site | Page px | Canvas | Content w | Rails | Section h2 (px/weight/tracking) | Seam median | Section padding | Card radius / gap | Nav | Footer h / cols |
|---|---|---|---|---|---|---|---|---|---|---|
| Linear | 9,960 | #08090a dark | 1,280 | horizontal hairlines | 48/510/-0.022em | 270 | 128/128 | 12 / 12 | fixed 73, blur 20px | 494 / 5 |
| Vercel | 5,930 | #fafafa | 1,392 | none | 56/450/-0.06em | 248 | n/m | 6 / 20 | sticky 64 | 846 / 12 groups |
| Stripe | 14,631 | white + navy bands | 1,232 | 88/1,352 + dashed | 32/300/-0.02em (56 statements) | 166 | 96/96 | 6 / 16 | static 76 | 1,102 / 6 |
| Raycast | 15,983 | #07080a dark | 1,204 | none | 20/500/+0.01em (32 AI, 56 dev) | 446 | n/m | 11-20 / about 40 | fixed pill 92 | n/m / 6 |
| Resend | 12,320 | #000 | 1,232 | none | 56/400/-0.05em | 207 | 96/96 | 16-24 / 12 | sticky 58 | 596 / 6 |
| Clerk | 7,187 | #f7f7f8, dark bento band | 1,200 | none | 32/600/-0.015em | 127 | 128 top | 16 / 8 | sticky pill 42 | 413 / 5 |
| Attio | 17,599 | white + dark end | about 1,000 | 24/1,416 | 40/500/-0.01em | 233 | 152 top | 12 / 16-24 | static 116 incl. bar | 685 / 4-5 |
| Cal | 8,593 | #f4f4f4 + white plates | 1,048 | 120/1,320 + plus marks | 48/600/0 | 258 | 101 top | 16 / 12 | sticky pill about 60 | n/m / 4 + brand |
| Mercury | 11,661 | photo, dark, cream | 1,024 | none | 42/480/+0.01em | 260 | 97-152 top | 12 / 32 | sticky 72 | 701 / 8 |
| Ramp | 13,905 | white | 1,312 | none | 48/400/0 (28 sub-chapters) | 229 | 128 (CTA) | 12-16 / n/m | sticky 102 incl. bar | 1,493 / 8 |
| Supabase | 7,691 | #fcfcfc | 1,088 | hairlines | 34/600/0 | 179 | about 96 | 8-21 / 12 | sticky 65 | 1,097 / 7 |
| Dub | 12,205 | #fafafa | 998 | 180/1,260 + grid | 48/500/0 | 138 | 80 top | 12-16 / n/m | sticky 56 | 402 / 4 + brand |
| Cursor | 8,175 | #f7f7f4 + #f2f1ed plates | 1,300 | none | 22/400/-0.005em (36, 72) | 152 | 67 / 67-85 | 8-10 / n/m | fixed 52 | 526 / 5 |
| Granola | 14,310 | colour blocks | 1,280 | none | 108/400 chapters, 32 feature h3 | 145 | 112-128 | 16 (28) / n/m | fixed pill 56 | 828 / 4 + wordmark |
| Plain | 13,060 | white + deep green | 1,200 | dashed | 48/400/-0.02em | 329 | n/m | 9 / 20 | sticky 70 + bar | about 430 / 5 + brand |
| Commslayer | 17,977 | #fafafa + dark | 1,198 | 80/1,360 + hairlines | 48/400/0 | 141 | 81 top | 12-24 / 20-24 | fixed pill 84 | 695 / 4 + brand |
| AlignUI | 10,728 | #f7f7f7 | 1,004 | 112/1,328 + nodes | 48/550/-0.028em | 99 | n/m | 16-28 / 24 | static pill 72 | 1,074 / 5 + wordmark |
| Mintlify | 8,457 | white | 1,010 | 170/1,256 + ticks | 36/500/-0.02em | 224 | 40 top in rails | 6-12 / 16 | sticky 65 | 721 / 5 + brand |

### 3.3 Card surface recipes (measured computed styles)

| Recipe | Values | Sites |
|---|---|---|
| White card, ring plus whisper lift | 16px radius; 0 1px 5px -4px rgba(36,36,36,0.7), 0 4px 8px rgba(36,36,36,0.05); 1px ring about rgba(34,42,53,0.08) | Cal |
| Hairline card, near-no shadow | 12px; 1px rgba(56,62,71,0.10); 0 4px 12px -1px rgba(0,22,62,0.04); padding 8-13px | Attio |
| Hairline only | 16-21px; 1px rgba(16,16,16,0.08); no shadow; padding 24/40px | Supabase |
| Hairline only | 6-12px; 1px at 4-7% ink; no shadow; padding 16/32px | Mintlify |
| Flat tinted | 9px; fill #f9f6f1, no border, no shadow | Plain |
| Flat tinted plate | 10px; fill #f2f1ed on #f7f7f4; window inside 0 28px 70px rgba(0,0,0,0.14) + 0 14px 32px rgba(0,0,0,0.10) | Cursor |
| Dark, hairline | 12px; 1px rgba(255,255,255,0.12); 0 2px 32px rgba(0,0,0,0.25); fill #0f1011 | Linear |
| Dark, inset ring | 24px; inset 1px rgba(255,255,255,0.09); 0 24px 48px -24px rgba(0,0,0,0.55) | Commslayer |
| App card on gradient | 6px; 0 15px 35px rgba(23,23,23,0.08); small card 0 3px 6px rgba(23,23,23,0.06) | Stripe |

### 3.4 Heading and quote type samples

| Element | Size/weight/tracking/line-height | Site |
|---|---|---|
| Chapter h2, 2 lines, 542px wide | 48/510/-0.022em/1.0 | Linear |
| Section h2, 2 lines | 56/450/-0.06em/1.0 | Vercel |
| Section h2, centred | 48/600/0/1.1 | Cal |
| Section h2, centred, 2 lines | 48/550/-0.028em/1.17 | AlignUI |
| Section h2, left, 3 lines two-tone | 36/500/-0.02em/1.11 | Mintlify |
| Section statement, two-tone | 32/300/-0.02em/1.1 | Stripe |
| Chapter lead, two-tone | 22/400/-0.005em/1.3 | Cursor |
| Quote card text | 32/400/-0.022em | Linear |
| Quote, no card | 28/360 | Mercury |
| Closing CTA, centred, 2 lines | 72/510/-0.022em | Linear |
| Closing CTA, centred | 72/400/-0.03em/1.1 | Cursor |

## 4. Dos and Don'ts

Observed pairs, described so they can be reproduced.

- **Do** repeat one chapter skeleton with only the media changing (Linear: 48px heading left, 20px body right, full-width media, same 128px padding). **Don't** change grid, heading size and alignment on every section; the six-chapter Granola page works because each chapter pairs a 32px h3 with a 1,280x527 media block at equal spacing (141px).
- **Do** crop UI and let it bleed or fade (Vercel's bottom fade, Mintlify's right bleed). **Don't** show a full application shrunk to unreadable text in a box.
- **Do** float one AI or mobile surface over the main window (Linear, Cursor, Ramp). **Don't** scatter five floating cards around a screenshot.
- **Do** use a single-colour logo row under the hero (Linear white, Vercel ink). **Don't** mix full-colour logos with mono ones, and never invent customers.
- **Do** write 3-6 word chapter headings with an outcome or verb ("Integrate tonight", "Reach humans, not spam folders"). **Don't** title chapters "Features" or "Benefits"; use those as eyebrows only.
- **Do** keep rails 16-45px outside content with full-bleed hairlines at seams (Cal, Dub, Mintlify). **Don't** end a rail early or cross a visual with it (founder rails rules).
- **Do** use a flat, quiet card surface and hold it for the whole page. **Don't** mix hairline-white cards, tinted flat cards and dark cards in one flow.
- **Do** end with one closing block that echoes the hero line and carries one proof item (Ramp, Dub). **Don't** end on a second pricing table or a wall of equal-weight links.
- **Do** put a text-only breather between media-heavy sections (Commslayer's 282-385px strips). **Don't** stack five tall visual sections in a row.
- **Do** make the page complete without scroll-reveal JS. **Don't** leave components empty until scrolled (seen in captures on Commslayer, Clerk, Raycast).

## 5. Exceptions & judgement calls

- **Founder rule vs live-counter eyebrows.** Stripe ("Global GDP running on Stripe"), Ramp and Mintlify put a small live counter above the hero headline, and Cal, Dub and Resend use an announcement chip. The founder's Kestrel verdict is no small text above the headline. This note's eyebrow rules apply to sections, not to the hero. Counters can move into a stats band or the logo-wall caption.
- **Shadow cap.** The founder's cap (blur at most 24px, alpha at most 0.16) governs cards and chips. Large app windows on plates (Cursor 70px blur, Stripe 35px) exceed it; either put depth into the plate (tint and a 1px ring) or accept one deeper shadow on windows over 700px wide and keep cards inside the cap. [engine note]
- **Light vs dark.** 4 of 18 are dark-first (Linear, Raycast, Resend, Mercury's lower half) and 3 more use a dark band or hero inside a light page (Clerk, Commslayer, Stripe), the rest light or mixed. The founder's default is light AlignUI-style, so the best structural analogues are Cal (rails, plates, pill eyebrows, 3-up numbered cards, bento), Dub (tabbed showcase, rails, tile logo grid), AlignUI (pill eyebrow plus 48/550 plus framed demo), Mintlify (rails with ticks, stat row, slim CTA bar), Attio (sticky story) and Supabase (hero-tile bento). Linear and Vercel are the type and rhythm references; Resend and Raycast are motion references. [engine note]
- **Dense vs simple product UI.** The founder prefers simpler product UI when both are believable. Linear, Raycast and Attio show dense UI; they get away with it by cropping to 1-2 regions per chapter. Keep chapter crops to one data region plus one floating surface. [engine note]
- **Heading weight.** Light weights (300-450) dominate editorial pages (Stripe 300, Vercel 450, Resend 400, Granola 400); rail-and-plate pages (AlignUI 550, Cal 600) are heavier. Kestrel's Inter at 550 sits with AlignUI and is correct for its family; use 500-550, not 400, with a grotesk at 48px.
- **Centred vs left headings.** Centred suits plate-and-rail pages (Cal, AlignUI); left suits long editorial chapters (Linear, Mintlify). Do not mix without a structural reason (Attio's sticky left nav; Granola's alternating sides).
- **Sticky-scroll stories** (Attio 6,479px) are the most expensive pattern here; only 2 of 18 use one. Prefer stacked chapters unless there are 5 or more steps on one visual.
- **Long pages.** Commslayer (17,977px) and Attio (17,599px) win on specificity, not length; their sections carry real stats and flows. Padding a thin product to 15 sections would be worse than a 7,500px page like Supabase.
- **Section counts are hand-read** and sticky stories, tabs and carousels make "section" ambiguous; treat 6-13 as the band, not a hard limit.

## 6. Figures worth keeping

Reading slices in `knowledge/benchmarks/product-sites/slices/` that teach something text cannot (copy into `examples/` when building the library):

- `linear-00.png`: hero window plus mono-white logo row plus 48px two-tone statement in one scroll; `linear-05.png` closing CTA and footer anatomy.
- `cal-00.png`, `cal-01.png`: white plate on grey canvas with rails and plus marks, numbered 3-card steps, 2x2 bento, 8 icon tiles, floating nav pill.
- `dub-00.png`, `dub-02.png`, `dub-06.png`: tab showcase with caption bar, tile logo grid, feature columns with left hairlines, concave-notch dark closing panel, footer with status pill.
- `alignui-01.png`, `alignui-02.png`: pill eyebrow plus 48/550 plus keyword-bold subtitle plus framed demo; dark rounded 3x2 feature panel with ruler ticks.
- `commslayer-01.png`, `commslayer-04.png`, `commslayer-09.png`: hairline feature grid, quote-plus-metric strips, gradient-rimmed UI cards, FAQ split, closing card with product fragment, footer footnote row.
- `mintlify-00.png`, `mintlify-04.png`: rails with tick marks, logo box with live counters, slim CTA bar between rails.
- `supabase-00.png`: hero-tile bento (538x400 plus 263x400 tiles) and rail-framed logo band.
- `stripe-02.png`, `stripe-05.png`: stats band over particle art; dark developer section with diagram.
- `cursor-00.png`, `cursor-01.png`: painted plates with macOS windows and floating CLI window; plates with two-tone 22px leads.
- `vercel-00.png`, `vercel-01.png`: customer-site screenshot with bottom fade beside a side two-tone line and feature list.
- `attio-02.png`: sticky left step list with workflow graph and kanban crop.
- `ramp-00.png`: product plate with ticker strip and logo/photo mosaic.
- `granola-03.png`, `granola-07.png`: colour-block sequence (green, dark, white), outlined quote cards, footer with giant wordmark.
- `plain-02.png`, `plain-04.png`: mono-caps chip eyebrows, flat tinted tiles, dark comparison section.
- `resend-01.png`: language icon row plus code window tabs.
- `clerk-01.png`, `clerk-03.png`: dark 11-card catalogue grid, chamfer transition, post wall.

## 7. Open questions

- **PostHog not captured.** `posthog.com` returned a 900px shell at 1440 (likely a JS gate or bot wall); excluded from every figure. Retry with a headed browser if needed.
- **Heading detection is heuristic.** Sections whose headings are not `h1-h3` (Vercel, Clerk, Cursor, Raycast, Resend) were re-measured with `measure3-targeted.mjs` by visible text; Vercel's last three headings were not matched. Per-site medians for those sites rest on 1-10 headings.
- **Seam values include sticky and scroll stories.** Outliers over 700px (Attio, Cal, Ramp) were dropped from the cross-site seam statistic; per-site medians for those three are less reliable.
- **Padding is partial.** Explicit CSS padding was readable for 9 sites; for the rest the seam value stands in. A second pass should read the section wrappers' `padding-block` directly.
- **Eyebrow and rail counts are read, not measured.** Treat 7 of 18 (eyebrows) and 9 of 18 (rails) as counts of visible pattern, not DOM facts.
- **Scroll-reveal states.** Some components captured empty or mid-animation (Commslayer, Clerk, Raycast). Their final states may differ; layout measurements are unaffected, visual descriptions of those components are from partial states.
- **Scope.** Desktop 1440 only; no mobile, no dark-mode toggles, no hover states, no pricing or product subpages. Hero details are out of scope except where the hero sets up the first section.
- **Fonts and licences.** Many sites use licensed or custom families (Stripe sohne-var, Cursor CursorGothic, Granola melange, Mercury arcadia, Ramp Lausanne, Cal custom). The numbers transfer; the families do not. Inter, Geist and Instrument-class grotesks are the usable stand-ins.
- **No conversion data.** Nothing here shows that these structures convert better; they are what high-craft product sites ship. Pair with `funnels-and-conversion.md` before making claims.
