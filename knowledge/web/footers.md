---
source: web:43 live homepages (linear.app, vercel.com, stripe.com, attio.com, raycast.com, resend.com, clerk.com, supabase.com, framer.com, arc.net, cursor.com, mercury.com, ramp.com, notion.com, lovable.dev, granola.ai, dub.co, cal.com, plain.com, lindy.ai, retool.com, webflow.com, loom.com, superhuman.com, perplexity.ai, anthropic.com, mistral.ai, elevenlabs.io, runwayml.com, pitch.com, rippling.com, deel.com, brex.com, vanta.com, clay.com, campsite.com, liveblocks.io, neon.com, railway.com, fly.io, radiant/salient/pocket.tailwindui.com) + 6 Framer marketplace SaaS templates (Verity, Platform, Grovia, Coorda, Optivio, Strand)
chapter: Footers: variants, construction and measured standards of premium SaaS footers
pages: n/a (web, rendered and measured 2026-10-10 with Playwright at 1440x900; crops in knowledge/benchmarks/sections/footers/, data in raw/<slug>.json "footer")
topic_tags: [footer, sitemap, wordmark, newsletter, status, legal, social, cta, dark-mode, illustration, measured]
status: studied
---

# Footers: the last 8% of the page

Companion to `section-anatomy.md` (all other sections). Extends `product-site-anatomy.md` 2.8 (footer rule from 18 sites) and `landing-page-anatomy.md` 2A.14 (FOOT-A/B/C) with 43 sites, 49 footer crops at 2x and a per-footer DOM measurement: height, padding, column count and x positions, link and heading type, link pitch, brand block, giant wordmark size, legal row, socials, status, newsletter, theme and language controls, app badges, compliance lines, animation.

Evidence: `knowledge/benchmarks/sections/footers/<site>.jpg` (2x, footer plus the 40px above it; `template-fr_*.jpg` for Framer templates); measurements in `raw/<site>.json` under `footer`; method in `capture.mjs`. Counts are out of 43 homepages unless stated; templates are reported separately because they are sold as feature checklists.

## 1. Core ideas

1. **The footer is a sitemap first.** Median 49 links (p25-p75 30-72, range 5-108) in 4-5 visible columns (column x positions: 4 on 15 sites, 5 on 13, 6 on 7), with 11 of 43 (26%) running a mega-sitemap of 70+ links (Rippling 108, Framer 101, Anthropic 95, Stripe 86, Vanta 85, Vercel 81). The extras (wordmark, art, newsletter) sit around that sitemap, never instead of it.
2. **It is tall and calm.** Median height 833px (526-1,097; range 337-1,970), about 8% of the page (6-13%). Top padding median 64px (40-80), bottom 48px (32-80). Content width median 1,280 (1,200-1,376), i.e. the page container.
3. **Type is small, regular and on a 30px pitch.** Links 14px on 17 sites and 16px on 13 (median 14), weight 400 on 30 of 43, at roughly 55-70% ink (Linear #8a8f98 on #08090a, Vercel #4d4d4d on #fafafa, Dub #737373). Column heads 13-15px (median 14) at weight 500 (13 sites) or 400 (10), in full ink; uppercase on only 5 of 32 and always at 12-12.6px. Link pitch median 30px (28-36), head-to-first-link 16px (10-21).
4. **Two layouts carry 35 of 43 footers.** Brand column on the left plus 3-6 link columns (19), or a full-width column grid with the brand in the bottom row or absent (16). The rest are CTA-merged (4), an inset panel (1) and minimal one-row footers (3).
5. **Dark footers are the norm on dark pages and common on light ones.** 18 dark, 20 light, 5 brand-coloured. Every dark homepage has a dark footer (9 of 9); 9 of 34 light homepages switch to a dark footer (Anthropic, Attio, Brex, Deel, Fly.io, Perplexity, Ramp, Rippling, Runway), which works as the page's final band.
6. **Signature footers are rarer than galleries suggest.** Giant wordmark 5 of 43 (12%: Granola, Retool, Superhuman, Webflow, Pitch), illustrated or animated art 8 (19%: Clay, Mistral, Raycast, Lovable, Perplexity, Rippling, Radiant, Railway), CTA merged into the footer 7 (16%). Templates over-index: 2 of 6 giant wordmarks, 3 of 6 CTA-merged.
7. **The bottom row is trust plumbing.** Legal row on 31 of 43 (72%) at 12-14px (median 13); socials on 39 (91%); a "Status" link on 29 (67%) and a live status pill on 8 (19%); language selector 10 (23%); compliance badges or line 11 (26%); app-store badges 6 (14%); theme switch 2 (Cursor, Vercel); regulatory disclosures on all 4 fintechs (Brex, Mercury, Ramp, Rippling).
8. **Newsletter is a footer row, not a footer.** 5 of 43 (12%) carry an email field (Deel, Fly.io, Raycast, Supabase, Pocket), always as one row below or beside the sitemap; 3 of 6 templates do.

## 2. Variants

### 2.1 Layout (mutually exclusive, 43 sites)

| Variant | Count | Construction | Examples | Crop |
|---|---|---|---|---|
| A. Brand column + link columns | 19 (44%) | Logo (and tagline, socials, status or badges) in a 300-430px left column; 3-6 link columns start at x 420-560; legal row below | Linear, Attio, Clerk, Dub, Cal, Supabase, Resend, Lindy, Neon, Notion, ElevenLabs, Fly.io, Railway, Superhuman, Plain, Liveblocks (mirrored: brand right), Brex, Deel, Anthropic | footers/dub.jpg |
| B. Full-width column grid | 16 (37%) | 4-12 groups across the container, no brand column; logo in the bottom row, as a giant wordmark, or absent | Vercel (6x2 groups), Stripe, Framer, Cursor, Loom, Mercury, Ramp, Raycast, Retool, Rippling, Runway, Vanta, Webflow, Granola, Mistral, Perplexity | footers/vercel.jpg |
| C. CTA-merged | 4 (9%) | The closing CTA (heading + button or form) opens the footer on the same surface; links below | Arc, Clay, Pitch, Radiant | footers/arc.jpg |
| D. Inset panel | 1 (2%) | The footer is a rounded panel (r16-48) inset from a coloured or illustrated frame | Lovable (also Clay, Pitch, Radiant inside C) | footers/lovable.jpg |
| E. Minimal | 3 (7%) | Logo + 3-5 links + legal on one or two rows; for single-product sites and templates | Campsite, Salient, Pocket | footers/tw_salient.jpg |

### 2.2 Features (non-exclusive, 43 sites)

| Feature | Count | Examples (measured detail) | Crop |
|---|---|---|---|
| Mega sitemap (>= 70 links) | 11 (26%) | Rippling 108, Framer 101 at 12px, Anthropic 95 (9 groups stacked in 4 columns), Stripe 86, Vanta 85, Vercel 81, Ramp 77, Webflow 76, Liveblocks 75, ElevenLabs 73, Cal 72 | footers/anthropic.jpg |
| Dark footer | 18 (42%) | Linear #08090a, Resend #000, Raycast #07080a with red 3D art, Retool #151515, Mercury #171721 | footers/linear.jpg |
| Brand-colour footer | 5 (12%) | Arc blue #3139fb, Superhuman maroon #421d24, Vanta purple #260048, Plain mint, Loom pale blue #e9f2fe | footers/superhuman.jpg |
| Giant wordmark / logomark | 5 (12%) | Granola SVG 1,200x253 (83% of viewport) 48px from the bottom; Retool 960x188 bottom-left; Superhuman 1,376x132 faded watermark; Pitch "Let's Pitch" 1,503x228 faded, bleeding both edges; Webflow logomark 806x502 bleeding the bottom-right corner | footers/granola.jpg |
| Illustrated / animated art | 8 (19%) | Clay 3D ball-pit video 1,440x1,294 behind an r48 panel; Mistral pixel-art band 1,440x256; Raycast 3D shards 867x867; Lovable gradient frame; Perplexity painted strip on the top edge; Rippling magenta strip; Radiant gradient frame; Railway line illustration | footers/clay.jpg |
| CTA merged (any layout) | 7 (16%) | Arc ("Enter your new home on the internet" + download), Clay, Pitch, Radiant, Rippling ("Request a demo" + email), Ramp (email + "Get started"), Plain ("Join the teams" panel) | footers/rippling.jpg |
| Inset rounded panel | 4 (9%) | Clay r48 1,280x910, Pitch r24 1,392x1,011, Lovable, Radiant | footers/pitch.jpg |
| Newsletter row | 5 (12%) | Deel (brand + "Get the latest insights" + pill input), Fly.io (name + email + Subscribe), Raycast, Supabase (input under the brand), Pocket | footers/deel.jpg |
| Live status pill | 8 (19%) | Vercel mono "ALL SYSTEMS NORMAL." with blue dot, Dub, Liveblocks, Neon, Railway, Resend "All systems operational" green dot, Cal, Framer "All services online" | footers/resend.jpg |
| Status link | 29 (67%) | - | - |
| Socials (>= 2 icons) | 39 (91%) | 16-20px monochrome icons in the brand column or bottom row | - |
| Legal row (copyright) | 31 (72%) | 12-14px (median 13), 13-120px from the bottom | - |
| Language selector | 10 (23%) | Anthropic, Cursor, ElevenLabs, Framer, Mistral, Notion, Runway, Stripe, Supabase, Cal | footers/cursor.jpg |
| Compliance badges / line | 11 (26%) | Cal (round badges), Dub, Lindy, Liveblocks, Vanta (SOC 2, ISO 27001, GDPR seals), Neon (compliance column), Supabase (strip above), Cursor (text line), Resend, Pitch, Framer | footers/vanta.jpg |
| App-store / download badges | 6 (14%) | Brex, Mistral, Perplexity, Rippling, Cal (download chips per platform), Pocket (QR) | footers/perplexity.jpg |
| Regulatory disclosures | 4 (9%) | Brex, Mercury, Ramp, Rippling: 11-12px paragraphs, 400-1,000px tall | footers/brex.jpg |
| Theme switch | 2 (5%) | Vercel (system/light/dark segmented), Cursor | footers/vercel.jpg |
| Parent brand line | 2 | Loom (Atlassian), Neon (Databricks) | footers/neon.jpg |
| Featured content inside | 2 | Railway (two announcement cards in the first column), Notion (a customer quote under the logo) | footers/railway.jpg |

### 2.3 Templates (6 Framer SaaS templates)

| Template | Variant | Notes | Crop |
|---|---|---|---|
| Platform | C + giant marquee wordmark + newsletter + contact | "plat-form" wordmark 913x234 in brand orange, contact form | footers/template-fr_platform.jpg |
| Strand | C + giant faded wordmark + newsletter + status pill | particle-field CTA "Your data, finally connected", wordmark 1,232x317 | footers/template-fr_strand.jpg |
| Coorda | C (photo CTA) | full-bleed photo behind "Ready to coordinate your community?" | footers/template-fr_coorda.jpg |
| Optivio | D (dark inset panel) | rounded dark panel on white | footers/template-fr_optivio.jpg |
| Grovia | contact-led + newsletter | 30px newsletter heading, email address set as display type | footers/template-fr_grovia.jpg |
| Verity | E-ish compact | brand + 3 columns, 13 links | footers/template-fr_verity.jpg |

## 3. Rules

Format per `../SCHEMA.md`. IDs FT-01..FT-20.

- **FT-01 RULE** Build the footer around a sitemap of 25-75 links (target ~50) in 4-5 columns of 4-8 links; go to a mega-sitemap (70+, groups stacked inside columns) only when the product has that many real pages.
  **Why** Median 49 links (30-72); columns at 4 or 5 x positions on 28 of 43; mega sitemaps (11) belong to multi-product companies.
  **Applies to** marketing site. **Check** `footer a` count in [25, 75] (or > 75 with a documented page inventory); distinct column x in [3, 6]. **Source** raw/*.json footer.linkCount, cols (measured).

- **FT-02 RULE** Choose layout A (brand column + link columns) or B (full-width grid) by brand weight: A when the logo, a one-line tagline, socials and a status pill need a home; B when the sitemap is large or a giant wordmark will carry the brand.
  **Why** A on 19, B on 16 of 43; every giant wordmark footer is B (Granola, Retool, Webflow) or C (Pitch) except Superhuman.
  **Applies to** marketing site. **Check** DIRECTION.md names the footer layout and differs from the last build's. **Source** footers/ crops (read).

- **FT-03 RULE** In layout A, make the brand column 300-430px and start link columns at x 420-560 (1440 viewport), each 160-240px wide on a 165-240px pitch; align the brand column and the first column top to one line.
  **Why** Measured: Dub columns at 560/724/904/1068 with brand at 208; Clerk 422/605/788/970/1153 with brand at 122; Supabase brand 176, columns from 491 on a 131px pitch; column width median 198 (161-239), column pitch median 232 (204-262).
  **Applies to** marketing site. **Check** first link column x in [420, 560]; column pitch in [160, 260]; brand.top == first head top +/- 4px. **Source** raw/*.json footer.cols, brand (measured).

- **FT-04 RULE** Set footer links at 14px (16px for 16px-body brands) weight 400, at ~55-70% ink, on a 28-36px pitch; column heads 13-15px weight 500 in full ink (or the reverse, muted heads over ink links, as Clerk does), 10-20px above the first link; uppercase heads only at 12px with +0.02-0.06em tracking.
  **Why** Link size 14 on 17 sites, 16 on 13; weight 400 on 30; pitch median 30 (28-36); heads median 14 at 500 (13) or 400 (10); 5 of 32 uppercase, all 12-12.6px (Loom, Clay, Fly.io, Retool, Neon).
  **Applies to** marketing site. **Check** footer link font-size in {14, 16}; link pitch in [28, 36]; head-to-link gap in [10, 20]. **Source** raw/*.json footer (measured).

- **FT-05 RULE** Give the footer 56-80px top padding and 32-64px bottom padding inside the page container (1,200-1,376px), separated from the last section by a hairline, a surface change, or the CTA band, never by a shadow.
  **Why** Top padding median 64 (40-80), bottom 48 (32-80); content width median 1,280 (1,200-1,376). Separation read: hairline (Linear 1px #23252a, Clerk), surface change (dark footers on light pages), or the CTA band.
  **Applies to** marketing site. **Check** footer first content top - footer top in [56, 80]; content width equals the page container. **Source** raw/*.json footer.effPadT/effPadB, contentL/R (measured).

- **FT-06 RULE** Expect the footer to be 400-1,100px tall (median ~830) and about 6-13% of the page; anything taller must be earning it (disclosures, art, a merged CTA).
  **Why** Height median 833 (526-1,097); the tall ones are Rippling 1,970 (licenses + demo CTA), Brex 1,561 (disclosures), Clay 1,520 (3D scene), Ramp 1,493 (disclosures), Webflow 1,421 (logomark).
  **Applies to** marketing site. **Check** footer height in [400, 1100] or DIRECTION.md justifies it. **Source** raw/*.json footer.h (measured).

- **FT-07 RULE** End with a bottom row: copyright and legal links at 12-14px muted on the left, socials (16-20px icons) and utility controls (status, language, theme) on the right, 24-48px from the page bottom.
  **Why** Legal row on 31 of 43 at median 13px; socials on 39; utilities cluster bottom-right on Cursor (theme + language), Vercel (status left, theme right), Framer (language, socials, status), Neon (status left, legal links right).
  **Applies to** marketing site. **Check** the last row contains `©` text at 12-14px and the social links. **Source** raw/*.json footer.legal, social (measured); footers/cursor.jpg, vercel.jpg.

- **FT-08 RULE** Add a live status pill (6-8px green dot + "All systems operational", 12-13px, mono optional) only if a real status page exists, and link it there; otherwise a plain "Status" link in the sitemap.
  **Why** 8 of 43 show a live pill (developer-facing products: Vercel, Dub, Liveblocks, Neon, Railway, Resend, Cal, Framer); 29 link a status page.
  **Applies to** marketing site. **Check** the pill links to a status domain; the text comes from the status API, not a hard-coded string, on a real build. **Source** raw/*.json footer.status (measured); CLAUDE.md principle 4.

- **FT-09 RULE** Put a dark footer on a light page only as a deliberate final band (CTA above it on the light canvas, or the CTA merged into the dark footer); on dark pages keep the footer on the page canvas or one step lighter, never a lighter grey slab.
  **Why** 9 of 34 light pages use a dark footer; 9 of 9 dark pages keep it dark; founder dark-mode rule: surfaces step in lightness from one hue.
  **Applies to** marketing site. **Check** dark-footer-on-light pages have a CTA directly above or inside; dark-page footer bg luminance within 4% of the canvas. **Source** footers/ crops (read); dark-mode-premium.md.

- **FT-10 RULE** A giant wordmark is set in the logo artwork (SVG, not live type), 65-100% of the viewport width, 130-320px tall, in one flat colour (ink, brand, or 4-8% faded), sitting 0-48px from the page bottom or bleeding off it; the sitemap still sits above it at normal size.
  **Why** Granola 1,200x253 at 48px from the bottom; Retool 960x188; Superhuman 1,376x132 faded watermark; Pitch 1,503x228 faded, bleeding; Webflow mark 806x502 bleeding the corner; templates Platform 913x234, Strand 1,232x317.
  **Applies to** marketing site. **Check** the wordmark is an `svg`/`img` of the brand mark; width >= 0.65 x viewport; sitemap link size unchanged. **Source** raw/*.json footer.big (measured); logo-craft.md.

- **FT-11 RULE** Use the giant wordmark only when the wordmark is good enough to be the last image of the page (founder: logos must be constructed and tested); a weak or placeholder logo at 1,200px exposes every flaw.
  **Why** The five shipped examples all have studio-drawn wordmarks; the engine's marks have been rejected repeatedly at 16-32px.
  **Applies to** marketing site. **Check** the wordmark passed `tools/logo.mjs present` and `logo_measure.mjs`. **Source** founder-taste.md (logo rules).

- **FT-12 RULE** An illustrated or animated footer reuses the page's signature visual (the hero's dither, 3D world, pixel art or painting), confined to one band (a strip on the top edge, a bottom band 200-300px tall, or a full scene behind an inset panel); links stay on a solid surface.
  **Why** 8 of 43: Clay's ball pit continues its 3D hero; Mistral's pixel band and Raycast's red shards repeat their heroes; Perplexity's painted strip and Rippling's magenta strip sit on the top edge; Clay keeps links on an r48 panel.
  **Applies to** marketing site. **Check** the footer art uses the hero's visual system; link text contrast >= 4.5:1 on a solid fill. **Source** footers/clay.jpg, mistral.jpg, raycast.jpg, perplexity.jpg (read); founder-taste.md (signature visual).

- **FT-13 RULE** Merge the closing CTA into the footer only when the page has no separate closing CTA; the merged CTA is a 28-48px heading with one button or an input, then the sitemap below on the same surface.
  **Why** 7 of 43 merge (Arc, Clay, Pitch, Radiant, Rippling, Ramp, Plain), none of which also run a separate closing CTA section.
  **Applies to** marketing site. **Check** exactly one closing CTA per page (section or footer). **Source** sequences.json; footers/ crops (read).

- **FT-14 RULE** Use an inset footer panel (r16-48, 24-80px inset from the frame) only on framed or art-backed pages; its radius matches the page's largest surface radius.
  **Why** Clay r48 inside a 3D scene, Pitch r24, Lovable inside its gradient frame, Radiant inside its gradient frame; all four have framed pages above.
  **Applies to** marketing site. **Check** panel radius == the page's frame/panel radius. **Source** raw/*.json footer.inner (measured).

- **FT-15 RULE** A newsletter in the footer is one row: a 14-16px line saying what is sent and how often, a 36-44px email field and a Subscribe button, below the sitemap or in the brand column; only if the company actually sends one.
  **Why** 5 of 43 (Deel, Fly.io, Raycast, Supabase, Pocket), always one row; none uses a full newsletter section.
  **Applies to** marketing site. **Check** one `input[type=email]` in the footer with a visible label or placeholder and a submit button. **Source** raw/*.json footer.email (measured).

- **FT-16 RULE** Show compliance in the footer as small monochrome seals (24-40px) or one 12-13px text line ("SOC 2 Type II, ISO 27001, GDPR"), only for certifications held; fintech and regulated products add the regulatory disclosures in 11-12px paragraphs under the legal row.
  **Why** 11 of 43 show compliance (Vanta, Cal, Dub, Lindy, Liveblocks seals; Cursor text line); all 4 fintechs carry disclosures.
  **Applies to** marketing site. **Check** each seal maps to a real certificate; disclosure text <= 12px with >= 4.5:1 contrast. **Source** raw/*.json footer.compliance (measured).

- **FT-17 RULE** Name column heads by what the visitor wants (Product, Solutions, Resources, Developers, Company, Legal); 4-7 heads; "Compare" as its own column if comparison pages exist.
  **Why** The heads repeat across sites: Product/Features, Resources, Company, Legal, Connect/Community (Linear, Cursor, Clerk, Dub, Supabase, Resend); Compare columns on Dub, Railway, Webflow, Framer.
  **Applies to** marketing site. **Check** head count in [4, 7]; every head is a noun. **Source** raw/*.json footer.cols heads (measured).

- **FT-18 RULE** Make the footer follow the page's theme and system: same type family, same link hover grammar as the nav, the same radius and line tokens, and a dark footer built from the page's dark recipe, not a default #111.
  **Why** Every measured footer uses the site's body family; footers that read premium keep the canvas hue (Linear #08090a = page, Mercury #171721, Superhuman maroon from the brand palette).
  **Applies to** marketing site. **Check** footer font-family == body font-family; footer bg is a token from the bound system. **Source** raw/*.json (measured); CLAUDE.md bound system.

- **FT-19 RULE** On mobile, collapse link columns into 2 columns (or accordions for mega sitemaps), keep the brand block and the bottom row, scale a giant wordmark to the viewport width, and keep every link target >= 40px tall.
  **Why** [engine note] Not measured at 375 in this study; derived from the desktop structure and the engine's 40px target rule.
  **Applies to** marketing site (mobile). **Check** at 390px: no horizontal scroll; link hit height >= 40px. **Source** [engine note]; landing-page-anatomy.md 2.6.

- **FT-20 RULE** Vary the footer between builds on at least two axes (layout A/B/C/D/E, surface light/dark/brand, signature none/wordmark/art/merged CTA) and record them in DIRECTION.md.
  **Why** The founder's range rule applies to footers too; 13 named variants exist and the default (A + light + none) is the template read.
  **Applies to** every new brand. **Check** DIRECTION.md lists the footer's layout, surface and signature and they differ from the previous build on >= 2 axes. **Source** founder-taste.md (range is mandatory).

## 4. Numbers & scales

| Measure | Value | n |
|---|---|---|
| Height | median 833, 526-1,097, range 337-1,970 | 43 |
| Share of page height | median 8%, 6-13%, range 4-30% | 43 |
| Top / bottom padding | 64 (40-80) / 48 (32-80) | 38 / 41 |
| Content width | median 1,280, 1,200-1,376 | 42 |
| Links | median 49, 30-72, range 5-108 | 43 |
| Link size | 14 (17 sites), 16 (13), 12 (3), 13 (2), 15 (3), other (5) | 43 |
| Link weight | 400 on 30, 500 on 5, 300 on 2 | 43 |
| Column heads | median 14px (12.6-15); 500 on 13, 400 on 10, 600 on 3, 700 on 2; uppercase 5 of 32 | 32 |
| Link pitch | median 30 (28-36), range 23-43 | 41 |
| Head to first link | median 16 (10-21) | 32 |
| Column width / pitch | 198 (161-239) / 232 (204-262) | 41 |
| Visible column positions | 4 (15), 5 (13), 6 (7), 3 (3), 2 (2), 7 (1) | 43 |
| Legal text | median 13px (12-14) on 31 sites | 31 |
| Surface | dark 18, light 20, brand colour 5 | 43 |

Exemplar specs (measured):

| Site | Surface | Heads | Links | Pitch | Columns |
|---|---|---|---|---|---|
| Linear | #08090a, 1px #23252a top | 13/510 #f7f8f8, -0.01em | 13/400 #8a8f98 | 30 | mark at x80, 5 columns from x304, 224 pitch |
| Vercel | #fafafa | 14/500 #171717 | 14/400 #4d4d4d | 28 | 6x2 groups from x24, 236 pitch; mono status + theme switch |
| Stripe | #f8fafd | (link groups) | 16/300 #50617a | 24 | 4 dense columns, 312 pitch |
| Dub | #fff | 14/500 #171717 | 14/400 #737373 | 34 | brand x208, columns from x560 |
| Clerk | #f7f7f8 | 13/450 #9394a1 (muted) | 13/500 #131316 (ink) | 28 | brand x122, columns from x422, 183 pitch |
| Supabase | near-white oklch | 15/600 ink | 16/450 ink | 28 | brand x176 + newsletter, 6 columns from x491 |
| Resend | #000 | 14/400 #f0f0f0 | 14/400 71% white | 40 | address + status left, 5 columns from x436 |
| Retool | #151515 | 12/400 uppercase #b6b8af | 24/380 #e9ebdf | 39 | 5 columns from x40 + 960x188 wordmark |
| Superhuman | #421d24 maroon | 18.7/700 white | 16/460 80% white | 40 | brand + tagline, 4 columns, faded wordmark |
| Neon | #000 | 12/600 uppercase white | 15/400 #afb1b6 | 35 | parent brand left, 4 columns from x552 incl. compliance |

## 5. Dos and Don'ts

- Do: Linear (mark, five calm columns, nothing else). Don't: a footer that repeats the closing CTA, a newsletter, an app badge row, a compliance row and a giant wordmark all at once.
- Do: Granola's wordmark under a normal sitemap. Don't: a giant wordmark replacing the sitemap.
- Do: Vercel's bottom row (status left, theme switch right). Don't: a status pill with hard-coded text and no status page.
- Do: Clay's art scene with links on a solid r48 panel. Don't: links set directly over a busy illustration.
- Do: Brex/Ramp disclosures at 11-12px under the legal row. Don't: drop legally required text to make the footer "clean".

## 6. Exceptions & judgement calls

- Minimal footers (Campsite, Salient, Pocket) are right for one-product sites with fewer than ~10 pages; for a company site they read unfinished.
- Clerk inverts the hierarchy (muted heads, ink links); it works because its links are dense developer docs and the heads are labels. Default to ink heads.
- Footer art competes with the closing CTA; when the CTA is a big art panel (Granola, Neon), keep the footer plain.
- [engine note] Footer motion (Clay video, Raycast shards) must stop under `prefers-reduced-motion`; none of the measured animated footers were checked under reduced motion here.

## 7. Figures worth keeping

`footers/linear.jpg` (calm dark A), `vercel.jpg` (mega B with status + theme), `dub.jpg` (light A with icons and status), `granola.jpg` (giant wordmark), `retool.jpg` (wordmark + large links), `superhuman.jpg` (brand colour + watermark), `clay.jpg` (art scene + inset panel), `mistral.jpg` (pixel band), `pitch.jpg` (faded wordmark + inset CTA panel), `arc.jpg` (brand colour CTA-merged), `rippling.jpg` (mega + demo form), `brex.jpg` (disclosures), `template-fr_platform.jpg` and `template-fr_strand.jpg` (template wordmarks).

## 8. Open questions

- Mobile footers were not captured (desktop 1440 only).
- `footer.status` matched the word "status" anywhere; the live-pill count (8) was verified by eye, the link count (29) was not.
- Vercel's footer only paints after it is scrolled into view; its crop is a viewport screenshot after scrolling (`footers/vercel.jpg`), its measurements come from the DOM.
- Webflow template previews could not be reached without interaction; Framer templates stand in.
