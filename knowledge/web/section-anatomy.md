---
source: web:linear.app + vercel.com + stripe.com + attio.com + raycast.com + resend.com + clerk.com + supabase.com + framer.com + arc.net + cursor.com + mercury.com + ramp.com + notion.com + lovable.dev + granola.ai + dub.co + cal.com + plain.com + lindy.ai + retool.com + webflow.com + loom.com + superhuman.com + perplexity.ai + anthropic.com + mistral.ai + elevenlabs.io + runwayml.com + pitch.com + rippling.com + deel.com + brex.com + vanta.com + clay.com + campsite.com + liveblocks.io + neon.com + railway.com + fly.io + tailwindui.com (radiant, salient, pocket) + framer.com/marketplace (6 SaaS templates) + saaslandingpage.com (pricing, testimonials, faq collections)
chapter: Section anatomy: every section of a premium SaaS / AI-SaaS marketing site, its real variants with counts, measured standards and page order
pages: n/a (web, rendered and measured 2026-10-10 with Playwright at 1440x900; evidence in knowledge/benchmarks/sections/)
topic_tags: [landing-page, homepage, section-library, section-order, announcement-bar, logo-cloud, testimonials, metrics, feature-rows, feature-tabs, how-it-works, product-tour, case-studies, integrations, security, pricing, comparison-table, faq, cta, newsletter, changelog, blog, careers, footer, variants, measured]
status: studied
---

# Section anatomy: the sections, their variants, their numbers

What this file is. A section library measured from 43 live homepages (40 product companies + 3 Tailwind Plus templates; PostHog's desktop-OS page excluded) plus 97 dedicated pages (29 pricing, 12 changelog, 12 blog, 13 careers, 9 security, 8 integrations, 8 customers, 6 comparison) and 6 Framer marketplace SaaS templates. For each section type: the variants that exist, how many sites use each, and the measured standards. Footers have their own deep study in `footers.md`; bento grids are classified here only (the bento study owns them, see `bento-craft.md`); the hero is covered by `product-heroes.md` and the nav by `nav-grammars.md`.

It extends, and does not repeat, `product-site-anatomy.md` (18 sites, rhythm, seams, card surfaces, rails) and `landing-page-anatomy.md` (generic section jobs and CRO evidence). Where a number here disagrees with those files, this file has the larger sample; where they cover something this file does not (card surface recipes, seam distances, rails), they still apply.

Evidence (all under `knowledge/benchmarks/sections/`, credits in `CREDITS.md`):
- `full/<slug>.jpg` 1x full pages; `<section>/*.jpg` 2x crops (one folder per section type, 339 crops).
- `raw/<slug>.json` block-level DOM measurements; `types.json` type-specific measurements (logo glyphs, quote type, stat numerals, FAQ rows, CTA, plan cards, comparison rows); `sequences.json` homepage order read by eye.
- `capture.mjs`, `measure-types.mjs`, `analyze.mjs` regenerate it.

How to read the numbers. "Measured" = computed style or bounding box in the live DOM at 1440 wide after a full scroll. "Read" = counted by eye from the screenshots (variants, order). Counts are "x of 43 homepages" unless stated. Medians are across samples; p25-p75 is written as a range. Nothing here is a conversion claim.

## 1. Core ideas

1. **A premium homepage is short on section types and long on product.** Median 10 sections including the hero (p25-p75 8-11, range 5-14), median page height 9,724px (7,187-12,205). Only 5 section types appear on more than half the homepages: hero (43), logos (38, 88%), closing CTA (33 as a section + 5 merged into the footer = 38, 88%), feature rows/chapters (32, 74%), testimonials (29, 67%). Everything else is optional and appears on 5-37% of pages.
2. **The order is nearly fixed at both ends and free in the middle.** Logos sit directly under the hero on 32 of 43 (74%; 37 of 38 logo walls are in position 2-3). The page ends with a CTA on 28 of 43 as the last section, and the most common last pair is testimonials then CTA (9). The middle is 3-6 product blocks (feature chapters, bento, tabs, catalogue) with one breather and one proof block.
3. **Templates and shipped products disagree about pricing and FAQ.** Shipped homepages carry a pricing section on 4 of 43 (9%) and a FAQ on 6 of 43 (14%); the 6 Framer SaaS templates carry pricing on 5 and FAQ on all 6, plus "how it works" steps on 3. Pricing and FAQ live on the pricing page: 21 of 29 pricing pages end with a FAQ (72%) and about 18 of 29 carry a full comparison table (62%). A homepage that reads like a template checklist is the tell.
4. **Every section type has 4-10 real variants, and one or two dominate.** Testimonials: masonry wall (6) and uniform quote grid (5) lead 11 named variants. Logos: logo row attached to the hero bottom (10), single row (7), two-row grid (7). CTA: bare centred statement (9) leads colour band, art panel, input CTA, split and footer-merged. Picking the dominant variant is safe; picking the second-most-common is how a page stops looking like every other page.
5. **Section headings are 48px, regular-to-medium, tight, five words.** 236 section h2s: median 48px (36-54), mode 48 (55 of 236); weight 400 (68) or 500 (65) dominate, 70% are 500 or lighter; tracking median -0.02em (-0.036 to 0); line-height median 1.10; median 5 words (4-8). Alignment is split: 127 left, 109 centred.
6. **Rhythm is one padding value from 80-128px.** Section padding-top median 96px (80-128); the five modes are 128 (27 blocks), 80 (25), 96 (23), 120 (22), 160 (15). Heading group to first content median 64px (48-95). Subtitle median 18px, 540px wide, 2 lines, 16px under the heading.
7. **Eyebrows are a minority device.** 54 of 291 headed sections carry an eyebrow (19%); only 8 of 42 sites use them on most sections (Attio, Cal, Lindy, Plain, Railway, Deel, Radiant, Granola). When used: 12-14px, sentence case (31 of 54) more than uppercase (23; 11 of those mono), a chip/pill on 20 of 54, about 12-25px above the heading.
8. **Proof is shown in the brand's own grammar, never as a generic block.** The best testimonial sections are built like the product: Linear's two colour-filled quote cards, Brex's logo-tab switcher, Rippling's quote with two metrics, Railway's logo-led quote cards, Lindy's wall with highlighted phrases. Quote type follows the variant: 13-16px inside wall cards, 18-25px in feature quotes, 28-56px for a single quote.
9. **Utility pages have their own stable grammars.** Changelog pages are a date-gutter feed (9 of 12) with a 560-760px entry column; blog indexes are a featured post plus a grid or list with category filters (10 of 12 have filters); careers pages are culture-led (mission, film or photo, values, perks, roles: 8 of 13); integration pages are a searchable directory (6 of 8); security pages are either a trust center or a compliance table.
10. **Footers do more work than any other section** (see `footers.md`): median 833px tall, 49 links in 4-5 columns, 14px links on a 30px pitch, socials on 91%, a status link on 67%.

## 2. Rules

Format per `../SCHEMA.md`. IDs SA-01..SA-48. Strongest first inside each group. Footer rules are FT-01.. in `footers.md`.

### 2.1 Page order and shape

- **SA-01 RULE** Build a product homepage from 8-11 sections including the hero (target 10), between 7,000 and 12,500px tall at 1440; go below 7 sections only for a deliberately short brand page (Vercel 6, Anthropic 5, Notion 6, Runway 6).
  **Why** Median 10 sections (p25 8, p75 11) and 9,724px (7,187-12,205) across 43 homepages; the short pages are companies whose brand already carries the proof.
  **Applies to** landing page. **Check** count of `sequences`-style top-level sections between nav and footer in [7, 10] excluding the hero; `scrollHeight` in [7000, 12500]. **Source** sequences.json, raw/*.json pageHeight (measured).

- **SA-02 RULE** Put the logo wall (or its labelled substitute) directly under the hero: section 2 of the page, or attached to the hero's bottom edge.
  **Why** 32 of 43 pages do exactly this; 37 of 38 walls sit in position 2-3. It answers "is this real" before the first product claim.
  **Applies to** landing page. **Check** the first section after the hero contains the logo row/grid or the hero's last child is the row. **Source** sequences.json (read).

- **SA-03 RULE** End the page with exactly one conversion moment: a closing CTA section (33 of 43) or a CTA merged into the footer (5 of 43). Do not end on a blog strip, a FAQ or a logo wall.
  **Why** 38 of 43 pages finish on a CTA; the 5 that end otherwise (Webflow showcase, Mistral "Go deeper", Anthropic news list, Deel ratings, Railway counter) are brand or utility pages.
  **Applies to** landing page. **Check** the last section before `footer` (or the footer's first block) contains a heading plus a primary button or input. **Source** sequences.json (read).

- **SA-04 RULE** Place testimonials in the last third of the page (median position 0.75 of the stack), most often immediately before the closing CTA; keep at most two testimonial sections per page.
  **Why** testimonials→CTA is the most common final pair (9 of 43); 29 pages have testimonials, only 3 have two (Cal, Mercury, Ramp).
  **Applies to** landing page. **Check** index of testimonial section / section count >= 0.6; count <= 2. **Source** sequences.json (read).

- **SA-05 RULE** Keep pricing and FAQ off the homepage unless the product is self-serve with one simple plan ladder; when they appear, place them last-but-one (pricing then FAQ then CTA).
  **Why** 4 of 43 homepages carry pricing, 6 of 43 a FAQ, against 5 of 6 and 6 of 6 Framer templates. Lindy, Salient and Pocket (self-serve, 3 plans) are the exceptions and all order them pricing→FAQ→CTA.
  **Applies to** landing page. **Check** if a pricing grid or accordion exists on `/`, it sits in the last 3 sections. **Source** sequences.json, `_templates` (read).

- **SA-06 RULE** Choose a page archetype before laying out sections and say which in DIRECTION.md: (a) product-chapter page (hero, logos, statement, 4-6 chapters, changelog or testimonials, CTA: Linear, Resend, Attio, Dub, Plain, Raycast), (b) proof-heavy enterprise page (hero, logos, bento/catalogue, segments, features, metrics, cases, security, awards, blog, CTA: Stripe, Ramp, Brex, Vanta, Rippling, Mercury), (c) short brand page (5-7 sections: Vercel, Anthropic, Notion, Runway, Clerk), (d) self-serve checklist page (features, testimonials, pricing, FAQ: templates, Lindy).
  **Why** These four orders cover every page in the sample; mixing them produces the "everything on one page" template read.
  **Applies to** landing page. **Check** DIRECTION.md names the archetype; the section list matches its pattern. **Source** sequences.json (read).

- **SA-07 RULE** Insert one text-led breather (statement, two-tone lead or stat row) after the logos or after the first two product blocks; never run more than 4 media-heavy sections in a row.
  **Why** 12 of 43 pages use a statement section, typically at position 3 (logos→statement on 6 pages); the long chapter runs (Resend, Brex, Railway) break them with a statement or metric band.
  **Applies to** landing page. **Check** no 5 consecutive sections each containing media >= 400x240px. **Source** sequences.json; statement/ crops.

### 2.2 Section heading system

- **SA-08 RULE** Set section h2s at 48px by default (range 36-56), weight 400-500, tracking -0.02em (-0.01 to -0.04), line-height 1.05-1.15; one size for every section heading on the page.
  **Why** 236 measured h2s: median 48 (36-54), mode 48; weights 400 (68) and 500 (65), 70% at 500 or lighter; tracking median -0.02em; line-height median 1.10 (1.04-1.17). The 700-weight pages (Lindy, Loom, Pitch, Notion) are brand voices, not the norm.
  **Applies to** landing page. **Check** all section h2 computed font-size equal; weight <= 500 unless the type voice says otherwise. **Source** raw/*.json h2 (measured).

- **SA-09 RULE** Write section headings of 3-8 words (target 5), two lines maximum at 1440.
  **Why** Median 5 words (p25 4, p75 8) across 236 headings.
  **Applies to** landing page. **Check** words(h2) <= 8 except two-tone statements; rendered lines <= 2. **Source** raw/*.json h2 (measured).

- **SA-10 RULE** Pick one heading alignment for the whole page and hold it on >= 70% of sections: left for chapter pages and dark pages, centred for plate/bento pages and templates.
  **Why** Across pages 127 h2s are left and 109 centred, but per site one alignment dominates (Linear 6/7 left, Neon 8/8 left, Lindy 8/8 centred, Brex 6/6 centred).
  **Applies to** landing page. **Check** share of section h2 with the dominant text-align >= 0.7. **Source** per-site h2 align (measured).

- **SA-11 RULE** Under a section heading use a muted subtitle of 16-18px in a 440-640px measure, 1-2 lines, 12-24px below the heading; skip it when the heading is a full sentence.
  **Why** 150 subtitles: 18px (61) and 16px (37) dominate; width median 540 (440-640); 2 lines (67) or 1 (39); gap median 16 (12-24).
  **Applies to** landing page. **Check** subtitle font-size in [16, 18], width in [440, 640], gap in [12, 24]. **Source** raw/*.json sub (measured).

- **SA-12 RULE** Leave 48-96px between the heading group (heading, subtitle, CTA) and the section's content (target 64).
  **Why** Heading-group-to-content median 64px (p25 48, p75 95) over 158 sections.
  **Applies to** landing page. **Check** first media/card top minus heading group bottom in [48, 96]. **Source** raw/*.json headToContent (measured).

- **SA-13 RULE** Use eyebrows on all chapter sections or on none; if used, 12-14px, sentence case or mono uppercase, 12-24px above the heading, and they name the product area, never repeat the heading.
  **Why** 19% of headed sections have one; 8 of 42 sites use them consistently, 25 never. Sizes 12 (17), 14 (12), 13 (9); 37% sit in a chip.
  **Applies to** landing page. **Check** eyebrow count is 0 or >= 70% of section headings; size in [12, 14]. **Source** raw/*.json eyebrow (measured).

- **SA-14 RULE** Use one section padding value from 80-128px for the whole page (96 default; 128 for airy chapter pages; 80 for dense enterprise pages).
  **Why** Section padding-top median 96 (80-128) across 167 sections with explicit padding; per-site medians cluster on one value (Linear 128, Neon 128, Brex 48 internal + band spacing, Dub 80).
  **Applies to** landing page. **Check** distinct section padding-top values <= 2. **Source** raw/*.json cssPadT (measured).

### 2.3 Announcement bar

- **SA-15 RULE** If there is news, show it in one full-bleed strip above the nav, 40-48px tall, one line of 14px text with one link; ink or brand-colour fill; never a second strip and never a hero chip as well.
  **Why** 16 of 43 sites have an announcement; heights 36-64, median 46; text 14px on 7 of 16 (range 12-22); fills: ink 8, brand colour 5, quiet canvas tint 3. The founder rule forbids a chip above the hero headline, so the strip is the place for news.
  **Applies to** marketing site. **Check** strip height in [36, 56]; one link; no `.chip` above the h1. **Source** raw/*.json topStrips; announcement/ crops; founder-taste.md.

### 2.4 Logo cloud / social proof

- **SA-16 RULE** Render logos at a 20-40px optical height (median ~30), 1-2 rows, 50-120px apart, one colour; 6-12 logos for a row, up to 16 for a grid.
  **Why** 19 measured walls: glyph height median ~30 (range 20-56), gap median ~75 (40-150), 1 row (7) or 2 rows (9); opacity 1 on 14 (colour set by fill), 0.4-0.85 on 5.
  **Applies to** landing page. **Check** logo img/svg heights within +/-6px of the median; all one fill; gap in [50, 120]. **Source** types.json logos (measured).

- **SA-17 RULE** Choose one of seven wall variants deliberately: hero-attached row (10), single row (7), two-row grid (7), marquee with edge fade (4), headline-led wall (4), tile grid (3), hairline cell grid (3). The engine default is the hero-attached or single row; use the headline-led wall only with a real number.
  **Why** Read on 38 walls. The headline-led walls (Loom 44px "Millions of people across 400,000 companies", Mercury 42px "Loved by 300K+") carry a measured claim; the row variants carry a 14-20px caption.
  **Applies to** landing page. **Check** DIRECTION.md names the variant; caption <= 20px unless the variant is headline-led. **Source** logos/ crops, sequences.json.

- **SA-18 RULE** Never invent logos or counts; with no customers, replace the wall with a real number from the product (stars, deploys, events), a "built with" stack row, or drop the section.
  **Why** Engine principle 4; Supabase (111.2K GitHub stars), Railway (live deploy counter) and Dub (live counters) prove with their own data.
  **Applies to** all. **Check** every logo maps to a sourced customer or the section is labelled sample. **Source** CLAUDE.md principle 4; metrics/ crops.

### 2.5 Statement and problem sections

- **SA-19 RULE** Do the "problem" work in one statement, not a pain section: a two-tone lead (claim in ink, explanation in ~55% ink), a highlighted-phrase statement, or an inline-icon sentence, 28-48px, max 3 lines, centred or on the heading edge.
  **Why** Only 3 of 43 pages run an explicit problem/agitation block (Plain "Tools add [icons] distance", Ramp "Systems that never spoke", Mercury "Banking's been a headache"); 12 use a statement band instead.
  **Applies to** landing page. **Check** no section whose heading is a pain list ("Tired of..."); statement <= 3 lines. **Source** statement/ crops, sequences.json.

### 2.6 Feature rows, chapters, tabs, steps, tours

- **SA-20 RULE** Build the product middle from 3-5 product blocks of one construction family: full-width chapters (heading + two-tone body over one wide media) for chapter pages, alternating text/media rows for enterprise pages, colour-panel rows for illustrated brands.
  **Why** 32 pages have feature rows (97 occurrences; median 3 per page among users). Families read: chapters 10, alternating 9, centred stack 3, colour/card panels 3, numbered/rail chapters 2.
  **Applies to** landing page. **Check** every feature block shares heading size, media width and text column; one family per page. **Source** feature-rows/ crops, sequences.json.

- **SA-21 RULE** In alternating rows keep text 420-520px and media 600-700px, the media top-aligned with the heading, 64-96px between rows; the text side carries heading (28-40px), 2-3 lines of 16-18px body and one text link.
  **Why** Brex, Loom, Mistral and Cursor rows measured 430-490px tall with 16-18px body; the media is never vertically centred against a short text block.
  **Applies to** landing page. **Check** media.top - heading.top in [-8, 24]; row gap in [64, 96]. **Source** feature-rows/brex-alternating, loom-alternating, mistral-alternating (measured + read).

- **SA-22 RULE** Use feature tabs only when 3-6 features share one panel; default to a pill row above a fixed-size panel (7 of 12 tab sections), first tab active, panel size fixed so nothing jumps; if auto-advancing, show progress per founder rule (ring or segmented fill).
  **Why** 12 of 43 pages use tabs: pill row 7 (Dub, Supabase, Lindy, Clay, Perplexity, Superhuman, Raycast), vertical list beside panel 2 (Salient, Runway), icon columns 1, carousel selector 1 (ElevenLabs), timeline tabs 1 (Deel).
  **Applies to** landing page. **Check** panel height identical across tabs; one tab `aria-selected=true` at load. **Source** feature-tabs/ crops; founder-taste.md (auto-advancing tabs).

- **SA-23 RULE** Use a numbered "how it works" only when setup is the objection, as exactly 3 steps: three equal numbered cards (01/02/03 with a mini UI each), time-boxed columns ("5 mins / 15 mins / 29 mins") or a timeline; never in the hero (founder rule).
  **Why** 2 of 43 shipped homepages carry steps (Cal numbered cards, Plain time-boxed columns) plus Deel's timeline tabs; templates carry them on 3 of 6.
  **Applies to** landing page. **Check** step count == 3; each step has a visual, not only an icon. **Source** how-it-works/ crops; founder-taste.md (Ferry hero).

- **SA-24 RULE** Use a sticky-scroll product tour for 4-6 capabilities that share one visual: left column list or text (sticky, 360-480px), right visual that swaps, inactive items at ~40% ink, active at 100%; release the sticky at the end of the section.
  **Why** 4 of 43 pages (Lindy numbered list with greyed steps, Attio sticky nav list, Retool sticky text with stacked visuals, Lovable accordion with visual).
  **Applies to** landing page. **Check** the sticky element's container ends with the section; reduced motion shows all items. **Source** product-tour/ crops.

### 2.7 Metrics

- **SA-25 RULE** Show 3-4 numbers in one row at 48-64px (median 60), weight 400-500, negative tracking (-0.01 to -0.04em), tabular figures, each with a 16-20px caption 4-16px below; separate with hairlines or 260-600px column pitch.
  **Why** 11 measured stat bands: numeral 32-80 (median 60), weights 300-600 with 400-500 most common, captions 16-20px, column pitch 264-637px.
  **Applies to** landing page. **Check** numeral font-size in [48, 64]; caption in [16, 20]; `font-variant-numeric: tabular-nums`. **Source** types.json metrics (measured).

- **SA-26 RULE** Choose the stat construction from five: ruled centred row (Stripe, Mercury, Deel, Pitch), split heading + 2x2 (Fly.io, Brex, Attio), live counter (Railway split-flap, Dub mono, Supabase stars), chart-backed (Attio curve, Lovable), stat cells inside a bento (Neon, Liveblocks). Live and chart-backed only with real data.
  **Why** 12 of 43 pages have a metrics section (14 occurrences); the distinctive ones prove with the product's own telemetry.
  **Applies to** landing page. **Check** each number has a source or a sample label. **Source** metrics/ crops.

### 2.8 Testimonials and case studies

- **SA-27 RULE** Pick one of eleven testimonial variants and match quote type to it: masonry wall (6 sites) or uniform grid (5) at 14-16px quotes in 360-450px cards; marquee row (2) at 14px; portrait/photo cards (4) or carousel (3) at 18-25px; single big quote (3) at 28-56px; plus duo colour cards, video-led, quote+metric, logo-tab switcher.
  **Why** 29 testimonial pages read; measured quote sizes: wall/grid cards 13-16 (median 15), feature quotes 18-25, single quote 28 (Mercury), 36 (Brex, Granola), 56 (Vanta).
  **Applies to** landing page. **Check** quote font-size within the variant's band. **Source** testimonials/ crops; types.json testimonials (measured).

- **SA-28 RULE** Testimonial cards: radius 12-16, padding 20-24, a 1px hairline or tinted fill (not a shadow), avatar 32-40px, name 14px, role 12-14px muted; quotes 100-200 characters.
  **Why** Measured cards: radius median 16 (8-24), padding 20-24 (Resend 24/32, Lindy 20/24, Ramp 20, Supabase 24), avatars 20-64 (median 32-40), names 14px on 15 of 21, quote length median ~130 characters.
  **Applies to** landing page. **Check** card radius in [12, 16]; padding in [20, 32]; quote chars in [80, 220]. **Source** types.json testimonials (measured).

- **SA-29 RULE** Every quote carries a real name, role and company (logo or wordmark); highlight at most one phrase per quote (Lindy marks it with a tint), and never invent people.
  **Why** All 29 sites attribute every quote; the wall variants that read premium (Lindy, Cal, Clerk) add the source platform (X, G2) as a 12px meta line.
  **Applies to** landing page. **Check** each quote node has a sibling name and role; no lorem names. **Source** testimonials/ crops; CLAUDE.md principle 4.

- **SA-30 RULE** Show case studies as stories with a number, not as quote cards: logo tabs over a photo and one metric (Attio, Mistral, Brex), a featured carousel (Supabase, Lovable, Webflow), photo cards (Vanta, Stripe) or an editorial feature (Ramp); the customers page is a featured story plus a filterable grid or list.
  **Why** 12 of 43 homepages have a case-study section; 8 customers pages: logo-tile grid 2 (Resend, Cal), featured + grid/list 4 (Attio, Ramp, Vercel, Retool), filterable card grid 2 (Supabase, Linear with a 3-number stat row).
  **Applies to** landing page, customers page. **Check** each case card has a metric and a "read" link. **Source** case-studies/ crops.

### 2.9 Integrations and security

- **SA-31 RULE** Show integrations as real brand marks in one structure: icon grid beside copy (Cal, Clerk, Dub), orbit around the product mark (Pitch, Campsite), SDK tabs over code (Resend), logo tiles row (Granola) or a systems collage (Ramp); link to a directory page.
  **Why** 10 of 43 homepages have an integrations section; the 8 integration pages are a directory with search and categories (6) or a marketing page with tiles (2).
  **Applies to** landing page, integrations page. **Check** icons are the partners' marks at one size (32-48px); a link to the directory exists. **Source** integrations/ crops.

- **SA-32 RULE** State security with true badges and three to six controls: a 3x2 icon-card grid (Perplexity), three cards with badges (Lindy), visual control cards (Mercury), a framework carousel (Vanta) or one dark panel (Loom); badges only for certifications the product holds.
  **Why** 8 of 43 homepages have a security section, all in the last third (median position 0.82).
  **Applies to** landing page. **Check** each badge maps to a real certification; card count in [3, 6]. **Source** security/ crops; CLAUDE.md principle 4.

- **SA-33 RULE** Build the security page as either a trust center (left nav: overview, compliance, controls, subprocessors, FAQ) or a compliance-at-a-glance table (requirement, status pill, scope, link), opened by a 48-64px heading.
  **Why** 9 security pages: trust center (Attio), compliance table (Clerk), long-form policy (Cursor), section stacks with badges (Linear, Lindy, Resend, Supabase, Ramp, Vercel).
  **Applies to** security page. **Check** certifications listed with status and evidence links. **Source** security/page-* crops.

### 2.10 Pricing and comparison

- **SA-34 RULE** Show 3-4 plans (median 4; 3 for simple products, up to 5 with Enterprise) at 280-390px wide, 500-920px tall, equal height, CTAs on one baseline; price numeral 32-48px (median 36), period and billing note 13-14px muted.
  **Why** 29 pricing pages: plans median 4; card width 253-463 (median ~320); height 500-920 (median ~640); price 24-64 (median 36).
  **Applies to** pricing page. **Check** plan cards equal height; price font-size in [32, 48]; CTA tops equal. **Source** types.json pricing (measured); pricing/ crops.

- **SA-35 RULE** Pick the plan construction on purpose: separate cards with one highlighted (most common), or a ruled grid where plans share 1px rules and no gaps (Vercel, Supabase, Resend, Cursor, Neon, Liveblocks, Mercury, Superhuman, Linear's open columns); highlight the recommended plan one way only (inverted fill, accent ring, raised/taller card, tint or art), and label it.
  **Why** About 9 of 23 measurable pages use a ruled grid (radius 0, gap 0-1); the rest use cards at radius 8-20 (Loom 44). Highlight methods read: inverted dark (Cal, Runway), accent border (Attio, Supabase 2px, Loom), raised taller (Supabase +64px, Raycast +32px), tint (Superhuman, Granola), gradient art (ElevenLabs, Pitch).
  **Applies to** pricing page. **Check** exactly one plan differs in fill/border/height; it carries a 12-13px badge. **Source** types.json pricing (measured); pricing/page-* crops.

- **SA-36 RULE** Put a monthly/annual toggle 30-100px above the cards (median ~57) when there is an annual discount, and show the saving in the toggle label; skip the toggle for usage-based pricing and use a slider or calculator instead.
  **Why** 19 of 29 pricing pages have a billing toggle; usage-based pages use a volume slider (Resend), seat slider (Pitch), team-size input (Loom), resource tables (Fly.io) or a usage chart (Railway).
  **Applies to** pricing page. **Check** toggle-to-cards gap in [30, 100]; toggling changes price and period. **Source** types.json pricing toggle (measured).

- **SA-37 RULE** Follow the plan cards with a full comparison table and then a FAQ: sticky plan header with the plan names, prices and CTAs; grouped rows with 13-16px group labels; 44-64px rows; a 220-450px feature column; check icons 16-20px; dashes for absent features.
  **Why** ~18 of 29 pricing pages carry the table (19 of 23 measured tables have a sticky header); rows 40-104 (median ~57, 44 most common); first column 145-480 (median ~300); checks 12-24 (median 18).
  **Applies to** pricing page. **Check** header `position: sticky`; row height in [44, 64]; one icon set for check/dash. **Source** types.json table (measured); comparison/ crops.

- **SA-38 RULE** A "vs" page is a head-to-head: both marks in the hero, a 2-column table with our column highlighted (Dub, Cal), a migration CTA, quotes from switchers (Plain); a hub page lists every comparison as cards. Claims in the table must be checkable.
  **Why** 6 compare pages found through footers: head-to-head with highlighted column (Dub, Cal), editorial text table (Framer, Railway docs), persuasion page (Webflow), hub with "honest comparison promise" letter (Plain).
  **Applies to** comparison page. **Check** each competitor claim has a dated source or is phrased as our product's capability. **Source** comparison/page-* crops.

### 2.11 FAQ

- **SA-39 RULE** Default FAQ: a centred single-column accordion 700-860px wide, 8-12 questions, rows 56-72px with a 1px hairline, question 16-20px at 500-600, one 16-20px chevron or plus on the right, answers 14-16px, and one "still have questions" link below.
  **Why** 21 pricing-page FAQs + 6 homepage FAQs: rows median ~62 (44-80), pitch ~73, width ~700-860, questions 16 (mode) to 20, weight 400-600, icons 14-24 (mode 20), hairline dividers on most, 8-12 rows (median 11).
  **Applies to** pricing page, landing page. **Check** row height in [56, 72]; `button[aria-expanded]` per row; question count in [6, 12]. **Source** types.json faq (measured); faq/ crops.

- **SA-40 RULE** Use the split FAQ (heading left in a 280-420px column, accordion right) on left-aligned pages and when grouping by category; use filled rows (Loom, Resend) only on tinted or dark pages; use an open 3-column Q&A grid only for 6-9 short answers.
  **Why** Variants read on 33 FAQs: centred accordion (most), split (Cursor, Webflow grouped, ElevenLabs, Clerk, Liveblocks, Neon, Retool, Runway), filled rows (Loom, Resend, Pitch), open grid (Salient, Pocket); gallery FAQ pages add help-center search and category sidebars.
  **Applies to** pricing page, FAQ page. **Check** layout matches the page's heading alignment (SA-10). **Source** faq/ crops; saaslandingpage.com/faq/ (read).

### 2.12 Closing CTA and newsletter

- **SA-41 RULE** Close with a centred 48-72px heading (median 52; up to 96 for an illustrated band), one or two buttons 40-48px tall 24-48px below it, inside a 300-700px tall section; echo the hero promise; add one proof line (ratings, "no credit card") only if true.
  **Why** 27 measured CTAs: heading 24-96 (median 52), centred on 19 (70%), 1 button (11) or 2 (9), button height 36-61 (median 44), heading-to-button gap median ~40; Supabase and Ramp repeat the hero line verbatim; Cal, Dub and Lindy add ratings.
  **Applies to** landing page. **Check** h2 in [48, 72]; buttons <= 2; button height in [40, 48]. **Source** types.json cta (measured).

- **SA-42 RULE** Choose the CTA construction from six: bare centred statement (9: Linear, Cursor, Resend, Supabase, Attio, Mercury, Cal, Liveblocks, Lovable), colour/photo band (6), art panel (4: Granola, Neon, Retool, Vanta), input CTA with a prompt or email (4: Lovable, Framer, Ramp, Retool), split text + product (2: Brex, Loom), or merge it into the footer (5); AI products should consider the input CTA.
  **Why** Read on 33 CTA sections + 5 footer-merged.
  **Applies to** landing page. **Check** DIRECTION.md names the CTA variant and differs from the last build's. **Source** cta/ crops.

- **SA-43 RULE** Offer a newsletter only where people come to read (blog, changelog, footer); never as a homepage section of its own.
  **Why** 2 of 43 homepages have one (Attio under its changelog strip, Raycast), 5 of 43 footers do, and changelog/blog pages carry subscribe controls (Clerk, Neon, Resend).
  **Applies to** marketing site. **Check** email input exists only in footer, blog or changelog. **Source** sequences.json; footers/ crops.

### 2.13 Changelog, blog, careers

- **SA-44 RULE** On the homepage, a changelog strip is 4 entries in one row (date 12-13px mono or muted, title 14-16px, one-line excerpt) with a "View all" link (Linear, Cursor, Attio) or a split timeline beside a heading (Dub).
  **Why** 6 of 43 homepages carry one (Linear, Cursor, Dub, Attio, Rippling, Vercel "Recently shipped"); 4-up rows on 3, split timeline 1, card carousel 1.
  **Applies to** landing page. **Check** entries == 4 in a row, each with a date; one link to `/changelog`. **Source** changelog/home-* crops.

- **SA-45 RULE** Build the changelog page as a date-gutter feed: date in a left gutter (x ~300-470), entries in a 560-760px column, entry title 20-36px (24 default), a cover image or live UI per entry, an RSS/email subscribe control in the header.
  **Why** 9 of 12 changelog pages use the date-gutter feed; entry column 560-763 (median ~650); entry headings 20-36 (24 mode). Variants: weekly card grid (Railway), compact expandable list (Plain), week-number covers (Liveblocks).
  **Applies to** changelog page. **Check** entry column width in [560, 760]; dates machine-readable `<time>`. **Source** raw/*--changelog.json (measured); changelog/page-* crops.

- **SA-46 RULE** Build the blog index as one featured post plus a 3-column card grid or a dense list (date, category, title, author), with category filter tabs and search.
  **Why** 12 blog indexes: featured + grid 7, featured + list/table 3 (Anthropic, Clerk, Supabase), uniform grid 2 (Dub, Vercel text-only); category filters on 10 of 12; search on 8.
  **Applies to** blog page. **Check** filters present; card titles 18-24px; dates on every entry. **Source** blog/page-* crops; raw/*--blog.json.

- **SA-47 RULE** Build careers as culture first, roles second: mission headline, a film or real team photo, values (4-6), perks, then an open-roles list (rows ~60px: role, team, location, arrow) with team/location filters; jobs-board-first only for very small teams.
  **Why** 13 careers pages: culture-led 8 (Anthropic, Attio, Notion, Stripe, Linear, Supabase, Raycast, Resend, Mistral), jobs-board-first 2 (Cursor, Vercel), founder letter 1 (Clerk), type + people cutouts 1 (Ramp).
  **Applies to** careers page. **Check** roles list has filters and each row links to a role. **Source** careers/ crops.

### 2.14 Bento (classification only)

- **SA-48 RULE** When the plan includes a bento, place at most one or two per page in the first half (median position 0.43) and follow `bento-craft.md` and the founder's bento rules for construction.
  **Why** 16 of 43 pages use a bento (20 occurrences: Stripe, Clerk x2, Supabase, Framer, Mercury x2, Ramp, Notion, Cal, Plain, Raycast, Vanta, ElevenLabs x2, Liveblocks, Radiant x2, Vercel); 16 also use a small-icon catalogue grid, often right after it.
  **Applies to** landing page. **Check** bento count <= 2. **Source** sequences.json (read); bento-craft.md.

## 3. The sections, one by one

Each chapter: variant table (name, count, examples, crop), then measured standards. Counts are homepages unless the chapter is a page type.

### 3.1 Announcement bar (16 of 43, 37%)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Ink strip, full bleed above nav | 8 | Attio, Clerk, Ramp, Plain, Retool, Deel, Clay, Neon | announcement/attio-top.jpg |
| Brand-colour strip | 4 | Webflow (blue), Loom (blue), Runway (violet), Pitch (lilac) | announcement/webflow-top.jpg |
| Quiet canvas strip | 2 | Mercury, ElevenLabs | announcement/mercury-top.jpg |
| Floating pill / row under the nav | 2 | Superhuman (pill at top 8), Vercel (row under nav) | announcement/superhuman-top.jpg |

Measured: height 36-64 (median 46); text 12-22px, 14px on 7, weight 400-600; one link or an arrow; the nav docks directly under it (header y = strip height on Clerk 48, Mercury 49, Webflow 46, Neon 36).

### 3.2 Nav and hero (pointers)

Nav: 14 grammars in `nav-grammars.md`; measured header heights here 36-150 (incl. strips). Hero: `product-heroes.md`, `type-voices.md`. Note for order: the hero is followed by logos on 74% of pages, and on 10 of 38 the logo row is part of the hero's bottom edge.

### 3.3 Logo cloud (38 of 43, 88%)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Hero-attached row (bottom edge of hero) | 10 | Vercel, Stripe, Framer, Notion, Plain, Mistral, Pitch, Clay (panel overlap), Salient, Pocket | full/stripe.jpg |
| Single row on canvas | 7 | Linear, Clerk, Webflow (with stat), Runway, Neon, Fly.io, Radiant | logos/runway-single-row.jpg |
| Two-row grid on canvas | 7 | Resend, Supabase, Lovable, Retool, Brex, Vanta, Liveblocks | logos/supabase-two-row.jpg |
| Marquee row with edge fade | 4 | Cal, Lindy, Perplexity, Deel | logos/lindy-marquee.jpg |
| Headline-led wall (claim at 42-160px) | 4 | Mercury, Ramp, Granola (dark band, 160px "For the doers"), Loom | logos/loom-claim-wall.jpg |
| Tile grid (tiles 3-5% off canvas) | 3 | Cursor 8 tiles 154x100 r4, Dub 4x2 tiles 251x80 r12, Railway | logos/cursor-tile-grid.jpg |
| Hairline cell grid | 3 | Attio 5x2 cells with story arrows, ElevenLabs 6x3, Superhuman | logos/attio-hairline-cells.jpg |

Measured (19 walls, types.json): glyph height median ~30 (Linear 23, Runway 20, Webflow 20, Dub 24, Liveblocks 30, Perplexity 30, Resend 32, Deel 32, Brex 36, Cursor 40, Lindy 40, Supabase 48, Mercury 56); gap median ~75 (40-150); caption 14-20px (Cursor 14, Supabase 14, Resend 18, Lindy 20, Clay 20) or headline 42-160.

### 3.4 Statement / problem (statement 12 of 43, 28%; explicit problem 3 of 43, 7%)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Two-tone lead | 4 | Linear, Dub, Stripe, Attio | statement/dub-two-tone.jpg |
| Display/serif statement | 4 | Granola (x2), Fly.io, Vanta (quote as statement) | statement/granola-serif-statement.jpg |
| Highlighted-phrase statement | 1 | Neon (mint highlights) | statement/neon-highlight-statement.jpg |
| Inline-icon sentence | 1 | Plain ("Tools add [icons] distance") | statement/plain-inline-icons.jpg |
| Problem reframe / chaos visual | 3 | Mercury "Banking's been a headache", Ramp "Systems that never spoke", Plain | integrations/home-ramp-systems-collage.jpg |
| Us-vs-them comparison block | templates 2 of 6 | Verity "Everything else falls short", Optivio "vs manual SEO" | full/fr_verity.jpg |

Measured: statements 28-56px, 3 lines max (Linear 32/400, Dub 30/400, Neon 44-52/400, Granola 48/400 serif).

### 3.5 Feature rows and product chapters (32 of 43, 74%; 97 blocks)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Full-width chapter (heading + body, wide media below) | 10 | Linear, Attio, Resend, Raycast, Plain, Dub, Vercel, Framer, ElevenLabs, Granola | feature-rows/linear-chapter.jpg |
| Alternating text/media rows | 9 | Brex (5 rows), Loom, Mistral, Cursor, Rippling, Perplexity, Mercury, Fly.io, Deel | feature-rows/brex-alternating.jpg |
| Centred stack (heading over centred UI) | 3 | Campsite, Arc, Loom intro | feature-rows/campsite-centred-stack.jpg |
| Colour-panel / card rows | 3 | Clay (tinted panels + 3D art), Superhuman (each product in a card with tabs), Granola | feature-rows/clay-colour-panels.jpg |
| Numbered or rail chapters | 2 | Railway (left progress rail), Neon (01/02/03) | feature-rows/railway-rail-chapter.jpg |

Measured: chapter blocks 1,220-1,230px tall on Linear with 128px padding; Brex rows 422-486px; Superhuman rows 676px each; per page 1-5 feature blocks (0: 11 pages, 1: 8, 2: 4, 3: 5, 4: 9, 5: 6).

### 3.6 Feature tabs (12 of 43, 28%)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Pill row above one panel | 7 | Dub, Supabase (x2), Lindy, Clay, Perplexity, Superhuman, Raycast | feature-tabs/lindy-pill-row.jpg |
| Vertical list beside panel | 2 | Salient (blue band), Runway | feature-tabs/runway-vertical-list.jpg |
| Icon columns as tabs | 1 | Salient | feature-tabs/tw_salient-icon-columns.jpg |
| Carousel selector | 1 | ElevenLabs (orbs) | feature-tabs/elevenlabs-carousel-selector.jpg |
| Timeline tabs | 1 | Deel (Today / Hours later / Tomorrow) | how-it-works/deel-timeline-tabs.jpg |

### 3.7 How it works / steps (2 of 43 shipped, 3 of 6 templates)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Three numbered cards with mini UI | 1 (+2 templates) | Cal (01/02/03), Optivio "3 simple steps" | how-it-works/cal-numbered-cards.jpg |
| Time-boxed checklist columns | 1 | Plain "5 mins / 15 mins / 29 mins" | how-it-works/plain-timeboxed-columns.jpg |
| Timeline tabs | 1 | Deel | how-it-works/deel-timeline-tabs.jpg |
| Process slider | template | Platform "Our Process" | full/fr_platform.jpg |

### 3.8 Product tour / scroll story (4 of 43, 9%; video band 3 of 43)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Numbered sticky list + swapping visual | 1 | Lindy (inactive steps greyed) | product-tour/lindy-numbered-sticky.jpg |
| Sticky nav list + content | 1 | Attio | product-tour/attio-sticky-nav.jpg |
| Sticky text + stacked visuals | 1 | Retool | product-tour/retool-sticky-stack.jpg |
| Accordion list + visual | 1 | Lovable (dark band) | product-tour/lovable-accordion-visual.jpg |
| Video band | 3 | Stripe keynote, Raycast, Rippling | full/rippling.jpg |

### 3.9 Bento and catalogue (bento 16 of 43, catalogue 16 of 43) - classification only

Bento constructions are in `bento-craft.md`. Here: bento appears 20 times on 16 pages, median position 0.43; the small-icon catalogue grid ("...and so much more", 6-8 tiles: Cal, Notion, Linear FIG cards, Resend, Rippling app grid, Deel 2x3 products, Brex card row, Fly.io) appears 19 times on 16 pages, often right after a bento.

### 3.10 Metrics (12 of 43, 28%)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Ruled / centred stat row | 4 | Stripe 48/300 sohne, Mercury 65/480, Deel 64/600, Pitch 60/700 | metrics/stripe-ruled-row.jpg |
| Split heading + stat grid | 3 | Fly.io 36/500, Brex 48/500, Perplexity 44-60 serif | metrics/flyio-split-grid.jpg |
| Live counter | 3 | Railway split-flap mono, Dub mono counters, Supabase stars | metrics/railway-live-counter.jpg |
| Chart-backed | 2 | Attio curve 32/500, Lovable | metrics/attio-chart-backed.jpg |
| Stat cells in a bento | 2 | Neon 64-80/400, Liveblocks "99.99% uptime" | metrics/neon-stat-cells.jpg |

Measured: numerals 32-80 (median 60); captions 16-20; column pitch 264-637.

### 3.11 Testimonials (29 of 43, 67%)

| Variant | Count | Examples | Quote type (measured) | Crop |
|---|---|---|---|---|
| Masonry wall | 6 | Clerk, Ramp (staggered), Cal, Lindy (highlighted phrases), Salient, Pocket | 13-16px/400 | testimonials/lindy-masonry-wall.jpg |
| Uniform grid of quote cards | 5 | Cursor 3x2 427x240 r4, Arc (press), Dub, Railway (logo-led), Fly.io | 14-19px | testimonials/cursor-uniform-grid.jpg |
| Portrait / photo cards | 4 | Notion (video portraits), Granola (dark duo, 36px serif), Pitch (mosaic, 20/700), Radiant | 20-36px | testimonials/granola-portrait-duo.jpg |
| Carousel (single or centre-focus) | 3 | Loom 25/700, Rippling 24/500 + 2 metrics, Clay video | 24-25px | testimonials/rippling-quote-metric-carousel.jpg |
| Single big quote, no card | 3 | Mercury 28/360, Vanta 56/300 serif, Neon | 28-56px | testimonials/vanta-single-quote.jpg |
| Marquee row with edge fade | 2 | Resend (30 cards 450x217 r16), Raycast | 14px | testimonials/resend-marquee-row.jpg |
| Quote + metric panel | 2 | Perplexity (bento), Liveblocks (+99.99% uptime) | 16-24px | testimonials/liveblocks-quote-metric-panel.jpg |
| Duo colour feature cards | 1 | Linear (880x480 + 432x480, 32px) | 32px | testimonials/linear-duo-colour-cards.jpg |
| Video-led + quote cards | 1 | Plain | 18px | testimonials/plain-video-plus-quotes.jpg |
| Logo-tab switcher | 1 | Brex (tabs of company names, photo, 36/500) | 36px | testimonials/brex-logo-tab-switcher.jpg |
| Unreadable (lazy media) | 1 | Framer | - | - |
| (Second sections) centre-focus carousel, community wall | +3 | Cal carousel 24/600, Supabase tweets, Webflow photo-metric cards | | testimonials/cal-centre-carousel.jpg |

Gallery check (saaslandingpage /testimonials/, 14 dedicated pages): wall of love (Cursor, Relume), customer list table (Beside), case tiles with metric (Superhuman, Retool, Homerun), illustrated case tiles (Slite), before/after (Basecamp).

### 3.12 Case studies (12 of 43 homepages; 8 customers pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Logo tabs + photo + metric | 3 | Attio, Mistral (industry tabs + red quote card), Brex | case-studies/home-attio-logo-tabs-photo.jpg |
| Featured carousel | 3 | Supabase (gradient featured card), Lovable (metric carousel), Webflow (photo cards with metric) | case-studies/home-supabase-featured-carousel.jpg |
| Photo cards | 2 | Vanta ("Proof? We've got proof."), Stripe colour cards | case-studies/home-vanta-photo-cards.jpg |
| Editorial feature | 2 | Ramp (Stack feature), Retool | case-studies/home-ramp-editorial.jpg |
| Logo-led quote cards | 2 | Railway, Vercel (Zapier card) | case-studies/home-railway-logo-quote.jpg |
| Customers page: featured + grid/list | 4 | Attio, Ramp (editorial collage), Vercel (list rows), Retool (filters) | case-studies/page-ramp.jpg |
| Customers page: logo-tile grid | 2 | Resend (dark logo tiles), Cal | case-studies/page-resend.jpg |
| Customers page: filterable card grid | 2 | Supabase, Linear (+2.0x/3.3x/50% stat row) | case-studies/page-linear.jpg |

### 3.13 Integrations (10 of 43 homepages; 8 pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Icon grid beside copy | 3 | Cal (2x4), Clerk (two grids: SDKs, integrations), Dub (scattered on grid) | integrations/home-cal-split-icon-grid.jpg |
| Orbit / arc around product mark | 2 | Pitch, Campsite | integrations/home-pitch-orbit.jpg |
| Logo tiles row | 2 | Granola, Attio (icon row on dark) | integrations/home-granola-logo-tiles.jpg |
| SDK tabs + code | 1 | Resend | integrations/home-resend-sdk-code.jpg |
| Systems collage | 1 | Ramp | integrations/home-ramp-systems-collage.jpg |
| Directory page (search, categories, cards) | 6 pages | Clay, Lindy, Linear (sidebar), Ramp (chips + list), Vercel (featured carousel), Cal (app store) | integrations/page-lindy.jpg |
| Marketing page with tiles | 2 pages | Plain, Attio | integrations/page-plain.jpg |

### 3.14 Security / compliance (8 of 43 homepages; 9 pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Icon / visual card grid | 4 | Perplexity 3x2, Lindy 3 cards with badges, Mercury 3 visual cards, ElevenLabs 3 line-art cards | security/home-perplexity-icon-card-grid.jpg |
| Badge strip / badge + statement | 2 | Supabase (SOC2/HIPAA/ISO strip above footer), Plain | security/home-plain-badge-statement.jpg |
| Framework carousel | 1 | Vanta | security/home-vanta-framework-carousel.jpg |
| Dark statement panel | 1 | Loom | security/home-loom-dark-panel.jpg |
| Page: compliance-at-a-glance table | 1 | Clerk | security/page-clerk.jpg |
| Page: trust center | 1 | Attio | (raw/attio--security.json) |
| Page: section stack with badges | 6 | Linear, Lindy, Resend, Supabase, Ramp, Vercel | security/page-resend.jpg |
| Page: long-form policy | 1 | Cursor | security/page-cursor.jpg |

### 3.15 Pricing (4 of 43 homepages; 29 pricing pages)

| Variant | Count (pages) | Examples | Crop |
|---|---|---|---|
| Separate cards, one highlighted | ~14 | Attio, Raycast, Clerk, Granola, Dub, Cal, Lovable, Plain, Retool, Pitch, Runway, Clay (5), Lindy, Railway | pricing/page-cal.jpg |
| Ruled grid (shared 1px rules, no gaps) | ~9 | Vercel, Supabase, Resend, Cursor, Neon, Liveblocks, Mercury, Superhuman, Linear (open columns) | pricing/page-supabase.jpg |
| Grouped plan families | 6 | Webflow (site/platform), Notion (Essentials/AI), ElevenLabs (tabs + 2 rows), Superhuman (product chips), Runway (individual/team), Resend (transactional/marketing) | pricing/page-notion.jpg |
| Calculator / slider | 4 | Resend (volume), Pitch (seats), Loom (team size), Vercel (usage) | pricing/page-pitch.jpg |
| Usage tables (pay as you go) | 3 | Fly.io, Railway (chart), Supabase compute | pricing/page-flyio.jpg |

Measured (types.json): page h1 48-80 (median ~60); plans median 4; card 253-463 wide (median ~320), 500-920 tall (median ~640); price 24-64 (median 36), weight 300-700; card radius 0 (ruled) or 8-20 (Loom 44); gaps 0-1 (ruled) or 10-24; features per card ~6-10; CTA 30-58 (median ~40); toggle 30-97px above cards (median ~57) on 19 of 29; badge text "Popular / Most popular / Recommended / Best value". Gallery check (saaslandingpage /pricing/, 15 pages): 3-4 cards with highlighted middle is the majority; table-first (Heron), membership editorial (Medium), seat columns (Figma).

### 3.16 Comparison table (~18 of 29 pricing pages; 6 compare pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Full grid, grouped rows, sticky plan header with CTAs | ~12 | Clerk, Granola, Liveblocks, Loom, Railway, Resend, Retool, Runway, ElevenLabs, Dub, Attio, Linear | comparison/granola-pricing.jpg |
| Collapsible groups | 4 | Mercury, Pitch, Supabase, Superhuman | comparison/mercury-pricing.jpg |
| Head-to-head us vs them (our column highlighted) | 2 | Dub vs Bitly, Cal vs Calendly | comparison/dub-compare.jpg |
| Prose table (text cells) | 2 | Framer vs Webflow, Railway vs Vercel | comparison/framer-compare.jpg |
| Compare hub (cards per competitor) | 1 | Plain | comparison/page-plain-compare.jpg |

Measured: rows 40-104 (median ~57; 44 most common); first column 145-480 (median ~300); 4-5 columns; sticky header on 19 of 23; cell text 12-16; checks 12-24 (median 18).

### 3.17 FAQ (6 of 43 homepages; 21 of 29 pricing pages; 6 of 6 templates)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Centred single-column accordion | ~16 | Cal, Lindy, Perplexity, Dub, Mercury, Raycast, Supabase, Granola, Lovable, Notion, Attio | faq/pricing-supabase-centred-accordion.jpg |
| Split: heading left, accordion right | ~8 | Cursor, Webflow (grouped), ElevenLabs, Clerk, Liveblocks, Neon, Retool, Runway | faq/pricing-cursor-split.jpg |
| Filled rows (pills or cards) | 3 | Loom (blue r42 rows), Resend (dark r16 rows), Pitch | faq/pricing-loom-filled-rows.jpg |
| Open Q&A grid (no accordion) | 2 | Salient, Pocket (3 columns) | faq/tw_salient-open-grid.jpg |

Measured: rows 44-102 (median ~62), pitch ~73; width 650-900; question 15-20 (16 mode, 500-600); icon 14-24 (20 mode); answers 13-18; 8-12 questions (median 11). Gallery check (saaslandingpage /faq/, 14 pages): help-center search hero (Stripe, Sketch, Flighty), category sidebar (Agentation, Oscar, Ko-fi), grouped centred (Bolt, Empathy).

### 3.18 Closing CTA (33 of 43 sections + 5 footer-merged)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Bare centred statement | 9 | Linear 72/510, Cursor 72/400, Resend 76.8/400, Supabase, Attio 56/500, Mercury, Cal, Liveblocks (horizon glow), Lovable | cta/linear-bare-statement.jpg |
| Colour / photo band | 6 | Fly.io, Salient, Superhuman (sky photo), Perplexity (landscape), Rippling, Dub (dark band with notch) | cta/flyio-colour-band.jpg |
| Art panel / illustrated band | 4 | Granola (collage + card), Neon (3D, left), Retool (3D + prompt), Vanta (illustration, 96/300) | cta/granola-art-panel.jpg |
| Input CTA (prompt or email) | 4 | Lovable, Framer (prompt box), Ramp (email), Retool | cta/framer-prompt-input.jpg |
| Split: text + product | 2 | Brex (phone on orange), Loom (pill strip) | cta/brex-split-product.jpg |
| Gradient panel with proof | 2 | Lindy (stars), Cal (badges) | cta/lindy-gradient-panel.jpg |
| Merged into footer | 5 | Arc, Clay, Pitch, Radiant, Rippling | footers/clay.jpg |

### 3.19 Newsletter (2 of 43 homepages; 5 of 43 footers)

Inline row under a changelog strip (Attio "Stay ahead of GTM", 14px + email + Subscribe), footer row (Deel, Fly.io name+email, Raycast, Supabase, Pocket), header control on changelog/blog (Clerk, Neon, Resend). Never a full section on a shipped homepage.

### 3.20 Changelog (6 of 43 homepages; 12 pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Home: 4-entry row (dots, columns or tiles) | 3 | Linear (dotted timeline), Attio (hairline columns + newsletter), Cursor (tiles) | changelog/home-linear-timeline-strip.jpg |
| Home: split timeline beside heading | 1 | Dub "We ship fast" | changelog/home-dub-split-timeline.jpg |
| Home: card carousel | 2 | Rippling "What's new", Vercel "Recently shipped" | changelog/home-rippling-card-carousel.jpg |
| Page: date-gutter feed | 9 | Clerk, Cursor, Dub, Linear, Neon, Raycast, Resend, Supabase, Vercel | changelog/page-resend.jpg |
| Page: weekly card grid | 1 | Railway | changelog/page-railway.jpg |
| Page: compact expandable list | 1 | Plain | changelog/page-plain.jpg |
| Page: week-number covers | 1 | Liveblocks | changelog/page-liveblocks.jpg |

### 3.21 Blog (11 of 43 homepages; 12 index pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Home: 3-4 cards with thumbnails | 5 | Webflow, ElevenLabs, Vanta (text cards), Anthropic (tinted release cards), Brex (carousel) | blog/home-elevenlabs-three-cards.jpg |
| Home: featured + side | 1 | Stripe ("What's happening" + book of the week) | blog/home-stripe-featured-side.jpg |
| Home: 2x2 thumbnail list / text row | 2 | Runway, Cursor | blog/home-runway-thumb-list.jpg |
| Index: featured + 3-col grid | 7 | Attio, Cal, Raycast, Resend, Mistral, Stripe, Supabase | blog/page-resend.jpg |
| Index: featured + dense list/table | 3 | Anthropic (date/category/title table), Clerk, Supabase | blog/page-anthropic.jpg |
| Index: uniform grid | 2 | Dub, Vercel (text-only) | blog/page-vercel.jpg |

### 3.22 Careers (13 pages)

| Variant | Count | Examples | Crop |
|---|---|---|---|
| Culture-led (mission, film/photo, values, perks, roles) | 9 | Anthropic, Attio, Notion, Stripe, Linear, Supabase, Raycast, Resend, Mistral | careers/linear.jpg |
| Jobs board first | 2 | Cursor, Vercel | careers/cursor.jpg |
| Founder letter | 1 | Clerk (signed) | careers/clerk.jpg |
| Type + people cutouts | 1 | Ramp "We only hire builders" | careers/ramp.jpg |

Measured: h1 46-80; roles rows ~60px (Supabase 960x60); stat rows on Mistral (900+, 30+, 50%) and Supabase (350+, 20+, $18...).

### 3.23 Footer (43 of 43)

See `footers.md` (13 variants, FT-01..FT-20).

## 4. Numbers & scales (summary)

| Measure | Value | n |
|---|---|---|
| Sections per homepage (incl. hero) | median 10, p25-p75 8-11, range 5-14 | 43 |
| Homepage height at 1440 | median 9,724, 7,187-12,205, range 3,340-17,599 | 43 |
| Dark homepages | 9 (21%) | 43 |
| Section h2 size | median 48, 36-54, mode 48 (55) | 236 |
| Section h2 weight | 400: 68, 500: 65, 700: 28, 600: 21, 300: 19, 480: 8, 900: 8, 510: 7 | 236 |
| Section h2 tracking | median -0.02em, -0.036 to 0 | 236 |
| Section h2 line-height | median 1.10, 1.04-1.17 | 236 |
| Section h2 words | median 5, 4-8 | 236 |
| Section padding-top | median 96, 80-128; modes 128/80/96/120/160 | 167 |
| Heading group to content | median 64, 48-95 | 158 |
| Subtitle | 18px (61), 16px (37); width median 540; 2 lines (67); gap 16 | 150 |
| Eyebrow use | 54 of 291 headed sections; 8 of 42 sites consistently | 291 |
| Container width | median 1,280, 1,184-1,328 | 262 |
| Card radius (all clusters) | median 12, 8-16; modes 12, 16, 0 | 108 |
| Card gap | median 16, 12-31 | 74 |
| Grid columns | 3 (34), 2 (24), 1 (21), 4 (9) | 100 |
| Announcement height | median 46, 36-64 | 16 |
| Logo glyph height / gap | ~30 / ~75 | 19 |
| Stat numeral | median 60, 32-80 | 11 |
| Quote size | 13-16 wall, 18-25 feature, 28-56 single | 28 |
| FAQ row / width | ~62 / 650-900 | 21 |
| Plan card | ~320x640, price 36 | 23 |
| Comparison row / feature column | ~57 / ~300 | 23 |
| CTA heading / button | 52 / 44 | 27 |
| Changelog entry column | ~650 (560-763) | 12 |

Frequency of section types on 43 homepages (sites using it at least once; median position 0 = top, 1 = bottom): hero 43; logos 38 (0.13); CTA 33 (1.00) + 5 merged; features 32 (0.45); testimonials 29 (0.75); catalogue 16 (0.44); bento 16 (0.43); statement 12 (0.56); cases 12 (0.70); metrics 12 (0.75); tabs 12 (0.33); blog 11 (0.91); integrations 10 (0.70); security 8 (0.82); segments 6 (0.60); FAQ 6 (1.00); changelog 6 (0.80); story 4; showcase 4; launch card 4; pricing 4; video 3; interactive demo 3; awards/ratings 3; newsletter 2; templates 2; community 2; press 2; founder letter 2; how-it-works 2.

Most common adjacent pairs: features>features 51, hero>logos 32, testimonials>cta 10, logos>features 10, features>testimonials 9, logos>statement 6, features>metrics 6, bento>features 6, blog>cta 5.

## 5. Dos and Don'ts

- Do: Linear's close (testimonials as two colour cards, then a 72px two-line CTA, nothing else). Don't: a closing sequence of blog strip, FAQ, newsletter and CTA stacked (templates).
- Do: Cursor's logo tiles (8 tiles 154x100, r4, tiles 3% off canvas) right under a painted-plate hero. Don't: a 48px "Trusted by" heading over 6 logos.
- Do: Lindy's wall with one highlighted phrase per quote. Don't: twelve identical cards with five stars and no source.
- Do: Supabase's raised Pro plan (+64px, 2px border, "Most Popular"). Don't: highlight two plans or highlight by colour and size and badge at once.
- Do: Dub vs Bitly, where Dub's column is a highlighted card inside the table. Don't: a competitor table with unverifiable red crosses.
- Do: Resend's changelog (date gutter, 763px column, cover art per entry). Don't: a changelog as blog cards without dates.

## 6. Exceptions & judgement calls

- The checklist page is right for a self-serve product with one plan ladder (Lindy, Salient, Pocket): pricing and FAQ on the homepage shorten the path. It is wrong for anything sales-led.
- Short brand pages (Vercel 6, Anthropic 5) skip testimonials and metrics on purpose; the brand is the proof. An unknown brand cannot copy this.
- Bold 700 section headings (Lindy, Loom, Pitch, Notion) belong to friendly, consumer-leaning type voices. On a calm AlignUI-style page they read template (founder rule on headline weight).
- [engine note] Announcement strips are counted on 37% of sites; on a client build with no real news, leave it out rather than invent a launch.
- [engine note] Galleries (lapa, land-book, godly/recent, siteinspire) showed hero thumbnails only; their section counts were not used. saaslandingpage's collections confirm the variant names but are not part of the 43-site counts.

## 7. Figures worth keeping

- `testimonials/linear-duo-colour-cards.jpg`, `lindy-masonry-wall.jpg`, `brex-logo-tab-switcher.jpg`, `rippling-quote-metric-carousel.jpg`: four testimonial grammars that are not "3 cards with stars".
- `logos/cursor-tile-grid.jpg`, `attio-hairline-cells.jpg`, `loom-claim-wall.jpg`: tile, cell and claim walls.
- `metrics/railway-live-counter.jpg`, `stripe-ruled-row.jpg`: live proof vs ruled row.
- `pricing/page-supabase.jpg` (raised plan), `pricing/page-cal.jpg` (inverted plan), `comparison/granola-pricing.jpg` (sticky header table).
- `faq/pricing-cursor-split.jpg`, `faq/pricing-supabase-centred-accordion.jpg`, `faq/pricing-loom-filled-rows.jpg`.
- `cta/framer-prompt-input.jpg`, `cta/granola-art-panel.jpg`, `cta/linear-bare-statement.jpg`.
- `changelog/page-resend.jpg`, `changelog/page-railway.jpg`.

## 8. Open questions

- Framer's homepage testimonials and several Framer/Attio media blocks render as empty boxes headless (lazy video); their variants are unread.
- Card padding in the cluster data often reads 0 because padding sits on an inner wrapper; testimonial and pricing padding come from `types.json` instead.
- Plan-card detection missed Dub, Resend, Mercury, Framer, Notion pricing cards (no single card wrapper); their variants are read from the screenshots.
- No Webflow award template could be opened without interaction; Framer templates stand in for "award templates".
- Section padding is CSS padding-top on the measured block; pages that space by margins or inner wrappers (Cal, Clerk, Supabase home) report null.
