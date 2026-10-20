---
source: web:x.com/adriankuleszo (288 statuses via api.fxtwitter.com/2/profile/adriankuleszo/statuses, 21 Aug - 19 Oct 2026; 56 images + 12 video frames read) + designme.agency (home, about-us, pricing, our-process, projects/ballogy) + ballogy.com + seamless.ai, measured with Playwright 2026-10-20
chapter: Adrian Kuleszo / DesignMe craft: what makes a 150-site startup studio look premium, as measured rules (type, buttons, radii, shadows, rhythm, motion, hero patterns, product-UI detail, X post framing)
pages: n/a (web; measured 2026-10-20)
topic_tags: [landing-page, hero, saas-app-ui, product-ui, mobile, pricing, bento, testimonials, dark-mode, type, buttons, radius, shadows, motion, x-posts, presentation, benchmark, kuleszo, designme]
status: studied
evidence: knowledge/benchmarks/kuleszo-x/ (posts.json, media-urls.txt, kz-*.jpg/png, measure/*.json, measure/*-fold.png, CREDITS.md)
tokens: system/variety/kuleszo-tokens.json
---

# Adrian Kuleszo (DesignMe): the craft behind 150+ startup sites

**The answer in one paragraph.** Kuleszo's work looks premium because nothing in it is generic. Every client gets its own type voice (a serif for Zeal, 21 Oaks and Seamless; a grotesk for Bounty, Atlas and Ballogy), its own world (a photo, a painted scene, a pixel map, real app screens) and dense, believable product content. All of it sits on a very quiet skeleton. On his own site that skeleton measures as one display face at 600 with -0.02em tracking on every heading (77.76/72/56/42/32/24), Inter 16 body at 75% ink, a 1280 container, 128px section padding, 1px borders at 10% ink, near-zero shadows, and flat 36-40px buttons with **2px** corners [M]. Restraint goes into the frame and richness into the content. On X he shows one component or one flow at a time, centred on a flat neutral canvas, with a 2-7 word caption that names the client. A third of the media posts are motion. He posts what got rejected next to what shipped ("didn't make it", "first vs final"). The engine's recent rejects do the opposite. Their loud, generic frames (blurred rainbow fields, triple black pill nav, 54px pill buttons) hold thin content (a timeline of near-empty bars).

**Evidence codes.** **[M]** measured with getComputedStyle / getAnimations on the live sites (`measure/*.json`); **[P]** pixel-sampled from his X images (`measure/pixel-samples.json`); **[V]** eyeballed from his images (X exports are 1.4-2.5x crops, so V sizes are +/-15%); **[T]** counted from `posts.json`. File names below are in `knowledge/benchmarks/kuleszo-x/`.

**Rule prefix.** `AK-` is already taken by `affectui-product-kit.md` (AK-01..33), so these rules use **AKZ-**. That keeps the IDs in `system/rules/index.json` unique.

## 1. Core ideas

1. **Divergent skins on a constant skeleton.** Across 40+ client pieces no two heroes share a type voice + nav + background combination. Zeal is a serif headline with a grey second line (kz-095). Seamless is PS Times 80/400 [M]. 21 Oaks moved from a heavy grotesk to a serif in the final ("First vs final", kz-282). Bounty uses a black grotesk with a floating pill nav (kz-216). Atlas has a centred logo and a selection box around one word (kz-135). Ballogy is a black-and-white gym photo with a centred logo (ballogy-fold) [M/V]. What stays constant: centred or left-column stacks, h1-sub-CTA gaps of about 16/32, two CTAs (filled + quiet), and one proof object under or beside the copy.
2. **His own frame is deliberately plain.** On designme.agency every heading is Saans 600 at -0.02em: 77.76/1.0, 72/1.1, 56/1.15, 42/1.15, 32, 24 [M]. Body is Inter 16/400-500, labels 11/500 uppercase, and ink is navy-black `#03111c` with 75% and 62% steps [M]. Controls are flat blue `#116ff8` or `#f5f5f5`, radius 2px, 36px (nav) / 40px (hero), padding 0 16 / 0 24, no shadow [M]. The radius ladder is 2 (controls, 39 uses on pricing), 12 (cards, 44 on home), 999 (chips), 50% (avatars) [M]. Shadows are almost absent: `0 1px 2px rgb(0 0 0/.04)` on chips, `0 4px 16px rgb(3 17 28/.08)` on cards, `0 28px 70px rgb(0 0 0/.16)` only on the floating "Ask" sheet [M]. The work is the colour.
3. **Content density is the premium signal.** His product crops carry 4-6 data types per row: a name with a red unread dot, a "No messages" chip, a preview line, a tinted stage chip, an agent with a spark glyph, channel icons (kz-129). Tabs carry counts ("All 16, Unread 8") (kz-129, kz-137). KPI cells carry `Previous 30 | Baseline 14 ↑7%` (kz-009). Charts get a plain-English line of explanation and a "Show as a table" link (kz-009). Empty states are designed: dashed "Connect device +" tiles, `00:00 min` with a muted unit (kz-274). Nothing is lorem except deliberate template drafts (kz-257 is labelled WIP).
4. **One world per brand, and it explains the product.** GrowthSync is a painted hill under a sky with a retro TV and chat chips ("[Paid Ad Comment] Does this come in blue?") (kz-146). Key Carbon is blue pixel-dithered aerial land plus a dot globe (kz-002, kz-025). Atlas is a world route map with plane glyphs (kz-135-1). The security client is a dot world map with orange incident squares (kz-100). The music distributor is rack-hardware UI and isometric line icons (kz-000). The visual is never an abstract blob. It is the product's subject drawn in one medium.
5. **Two-tone and inline-object headlines.** Several heroes carry a second line in grey: Zeal "from the ground up to cost 10x less." (kz-095-1), Quotient "Let AI [object] do it for you." (kz-163), Cluely "Try Cluely Today" (kz-225), Kinetiq "Pricing that grows with" (kz-284). He puts an object inside the line: a selected frame icon (Quotient), a Figma-style selection box around "China" (Atlas), a glyph tile. This is the art-directed headline the engine's founder bar asks for.
6. **Light comes from a source.** His dark heroes are lit by a light shaft from the top (Quotient kz-143-0), a glow anchored to one corner or edge (Atlas kz-135, the bottom-right violet), a particle gradient band (Quotient footer kz-188) or a lit object such as the teal-filled Pro card (Ballogy kz-208). Most of each fold stays at the base: Quotient's top colours are `#000008` 25% and `#000010` 16%, with chroma 6-12% of pixels [P].
7. **Motion is part of the deliverable.** 62 of 195 media posts are video [T]. "Motion should now become a part of product design" (post 86, 41.6k views). The site load-in is one staggered timeline: eyebrow rise 640ms at 540ms, headline lines glide 760ms at 610/680, sub 680, CTAs 750, the aside card 820, proof 890, the logo roll 960. The steps are 70ms apart, with transitions on `cubic-bezier(0.22,1,0.36,1)` [M]. His advice on launch videos is "Slow tf down" (post 107).
8. **Process is content.** He posts explorations "that didn't make it" (6 posts), "first vs final", wireframe -> final (kz-249) and 4-up exploration grids (27 posts) [T]. Showing range signals judgment. The hero study (kz-143) shows the same Quotient copy in two compositions.
9. **Mobile and component craft are half the feed.** Badges, streaks, leaderboards, paywalls, App Store screenshots, map pins, timers, widgets: Ballogy alone has about 30 posts [T]. Components are shown as a family (badge sets, icon matrices kz-161) or as one state change ("Empty state -> active state", posts 92 and 210).
10. **The site is engineered as part of the craft.** He moved DesignMe from Framer to Astro (posts 30, 50: 815 and 796 likes). PageSpeed is 99/100/100/100 (kz-016). LCP is 0.6s [M from his post]. A dark-mode toggle and a sound toggle sit in the nav [M]. Premium for him includes speed.

## 2. Rules

### 2.1 Frame and type

- **RULE AKZ-01** Pick one display face per brand and set every heading in it at one weight and one tracking ratio: his house setting is 600 at -0.02em on 77.76/72/56/42/32/24/20 with line-height 1.0 for the hero, 1.1 at 72, 1.15 at 56 and below; body stays in a neutral text face (Inter 16/400-500, 18/27 for the hero sub).
  **Why** One weight and one tracking ratio across all sizes is what makes a page read as one typographic system. The variety lives between brands, not between headings.
  **Applies to** landing page. **Check** all `h1,h2,h3` share font-family and font-weight; letter-spacing / font-size within 0.005 of each other; hero line-height <= 1.05. **Source** [M] designme-home/about/pricing/process.json (Saans 600, ls -1.5552/77.76, -1.44/72, -1.12/56, -0.84/42)

- **RULE AKZ-02** Choose the headline voice from the brand, not from the last build: serif (400-500, normal tracking) for finance, payroll, property and editorial-trust brands; grotesk 600 at -0.02em for software and agencies; a geometric or rounded grotesk for consumer apps. Never reuse the previous client's voice.
  **Why** His shipped set spans PS Times 80/400 (Seamless), a serif two-tone (Zeal), a serif final over a grotesk draft (21 Oaks), Instrument Sans 72/600 (Ballogy) and Saans 600 (DesignMe). Voice is the first divergence lever.
  **Applies to** landing page. **Check** DIRECTION.md names the voice and the brand reason; `variety.mjs` type axis differs from the last 6 builds. **Source** [M] seamless.json, ballogy.json; [V] kz-095-0/1, kz-282-0/1

- **RULE AKZ-03** Write ink as a tinted near-black with alpha steps, not as greys: ink `#03111c`, secondary text 75% of ink, tertiary 62%, borders 10% (structure) and 20% (controls/emphasis); on dark, `#f5f5f5` text with 62%/75% steps and 12% / 24% borders.
  **Why** Alpha steps of one tinted ink keep every grey in the same hue family, so text, rules and fills harmonise on any background.
  **Applies to** all. **Check** text colours resolve to one rgb with alpha in {1, .75, .62}; border colours in {.10, .20} of the same ink. **Source** [M] designme-home colors/borders histograms (rgba(3,17,28,.75) 237 uses, .62 59; borders .1 104, .2 20)

- **RULE AKZ-04** Use a two-tone headline when the second clause is the payoff: line 1 at full ink, line 2 at 45-55% ink (or a lighter tint of the brand), same size and weight; or put one small object inside the line (a 1-cap-height tile, a selection box, an icon) at the key word.
  **Why** The tonal step reads the sentence as setup and payoff without a second size, and the inline object makes the headline art-directed instead of templated.
  **Applies to** landing page heroes. **Check** at most one tonal step and at most one inline object per h1; contrast of the grey line >= 3:1 (large text). **Source** [V] kz-095-1 (Zeal), kz-163 (Quotient inline frame), kz-135 (Atlas selection box), kz-225 (Cluely), kz-284 (Kinetiq)

- **RULE AKZ-05** Hold hero gaps at about 16 (h1 to sub) and 32 (sub to CTAs), the sub at 18/27 at 75% ink, max 2 lines; the eyebrow is 11-14px/500 uppercase muted, 24-32 above the h1.
  **Why** It matches the 51-hero study (17/32). His live hero measures 16 and 32 exactly.
  **Applies to** landing page heroes. **Check** h1.bottom -> sub.top 12-20; sub.bottom -> CTA.top 28-36. **Source** [M] designme-home (h1 bottom 399, sub 415-469, CTAs 501)

### 2.2 Controls, radii, depth

- **RULE AKZ-06** Size buttons to the context and keep them compact: 36px in the nav (padding 0 16, 14/500), 40px in the hero (padding 0 24, 16/500), 32px chips (0 14, 13/500); one filled primary and one quiet secondary (`#f5f5f5` fill or text link); no resting shadow, no glow.
  **Why** His live controls never exceed 48px (Ballogy app CTA), and the DesignMe ones are 36/40. Compact, flat controls make the headline and the work the focal point.
  **Applies to** landing page. **Check** hero CTA height 36-48; nav CTA height 32-40; resting `box-shadow` none or <= 0 1px 2px .06. **Source** [M] designme-home btns; ballogy.json (40/48 pills); seamless.json (40/50, r4)

- **RULE AKZ-07** Choose the corner grammar per brand and use it on every control: sharp (2-4px: DesignMe, Seamless) for agency, enterprise and editorial brands; full pill (999) for consumer apps (Ballogy, Bounty, Cluely); never mix sharp and pill CTAs on one page; cards take 12 (sharp systems) or 16-20 (pill systems).
  **Why** One corner grammar per system is visible at a glance. The sharp 2px button is his own studio's signature and reads "built", not "template".
  **Applies to** all. **Check** computed border-radius of all `a,button` with a fill share one value (excluding 50% avatars); card radius in {12} for 2-4px systems, {16,20} for pill systems. **Source** [M] designme-* (2px x39, 12px x44), ballogy (999 buttons, 20px x49 / 16px x29 cards), seamless (4px x66)

- **RULE AKZ-08** Darken on hover; never add glow: primary hover moves the fill about 12% darker in the same hue (`#116ff8` -> `#0f62da`; Seamless `#c2008b` -> `#880763`), secondary hover moves the border or fill one step; ease `cubic-bezier(0.22,1,0.36,1)` at 150-320ms.
  **Why** A lightness-only hover keeps the palette fixed and reads as a physical press, not a light effect.
  **Applies to** all. **Check** hover diff touches only background/border lightness (and maybe colour); no new box-shadow; transition easing matches. **Source** [M] designme-home.hover, seamless.hover, transitions in btns

- **RULE AKZ-09** Keep depth to three tiers: hairline objects (1px border at 10% ink, no shadow), lifted chips (`0 1px 2px rgb(0 0 0/.04)`), floating layers (popover or sheet `0 4px 16px rgb(ink/.08)`, modal or ask sheet `0 28px 70px rgb(0 0 0/.16)`). Nothing else casts a shadow.
  **Why** With this little shadow, the one floating element reads as truly above the page.
  **Applies to** landing page, SaaS app UI. **Check** distinct box-shadow values (excluding inset 0 rings) <= 5 per page. **Source** [M] designme-home/about/process shadows histograms

### 2.3 Layout and rhythm

- **RULE AKZ-10** Use one container (1280 max, 120 side gutter at 1440) and one section padding (128 top and bottom) everywhere; reserve a single closing band at double padding (about 252) on black before the footer.
  **Why** One rhythm makes a 10-16k px page feel calm. The single oversized dark band gives the page an ending.
  **Applies to** landing page. **Check** section padding-top/bottom values on the page <= 3 distinct; the container max-width is one value. **Source** [M] designme-home/pricing/process sections (128/128 x8, closing 251.99/251.99), containers 1280

- **RULE AKZ-11** Put one proof object beside or under the hero copy and make it real work: a "Now playing" case card (video, client name, services, three progress ticks, "View case study ->"), a live order card, a product window or a stat strip. Then a logo roll in a hairline grid with a star rating.
  **Why** The hero proves the claim in the first fold without a second headline.
  **Applies to** landing page heroes. **Check** the first viewport contains exactly one media/product object besides logos; logo cells share 1px dividers. **Source** [M/V] designme-home-fold (case card, 5/5 on Clutch, logo grid); kz-135-0; kz-146

- **RULE AKZ-12** Draw section structure with hairline grids, not cards, when the page is technical: full-height 1px vertical rails at the container edges, logo cells and stat cells divided by 1px lines, numbered mono labels (`01 SIGNAL DISCIPLINE`) in small boxed chips.
  **Why** Rails and cells give a dark or technical page structure without adding surfaces (kz-100, kz-095-1, kz-196-0).
  **Applies to** landing page. **Check** rails are 1px at <= 12% ink; label chips 10-11px mono. **Source** [V] kz-100-0/1, kz-095-1, kz-196-0

### 2.4 Hero patterns

- **RULE AKZ-13** Hero pattern A, the centred stack over the product: eyebrow chip, two-line h1, two-line sub, two CTAs; then a tab row (3-4 tabs with icons, the active one underlined) directly above a product window that bleeds off the fold, on a field lit from one source.
  **Why** The tabs turn the product shot into "pick a capability", so one hero proves several workflows.
  **Applies to** landing page heroes. **Check** product window top within the first 900px; tabs sit 16-32 above it; the window is cropped by the fold. **Source** [V] kz-143-1 (Quotient), kz-163, kz-054 (RecruitU), kz-287-0 (NexaLab)

- **RULE AKZ-14** Hero pattern B, the split editorial: a left copy column (h1 72-78px, 784px max) and a right proof card at about 34% width (a case video, an order or status card), top-aligned with the eyebrow, with whitespace below; no background effect.
  **Why** Asymmetry plus one real object reads like an editorial page, not a SaaS template (designme home, Atlas v1).
  **Applies to** landing page heroes. **Check** copy column <= 0.6 of the container; proof card top within 24px of the eyebrow top. **Source** [M] designme-home (h1 x120 w784; card x ~930-1270); [V] kz-135-0

- **RULE AKZ-15** Hero pattern C, the world scene: a full-bleed photo or painted illustration of the product's subject (gym, apartment interior, sky and hill with a retro device, ocean), the h1 in white bottom-left or centred over the calm part, one or two pill CTAs, and 2-3 product chips floating in the scene that quote real product events.
  **Why** The scene supplies the emotion and the chips keep it about the product. This is how a consumer or vertical brand gets "cinematic" without abstract blobs.
  **Applies to** landing page heroes (consumer, vertical, property, AI with a story). **Check** the scene is a photo or illustration of the subject (not a gradient); >= 1 product chip with concrete text; text contrast >= 4.5:1 on its local background. **Source** [V] kz-146 (GrowthSync), kz-282 (21 Oaks), ballogy-fold, kz-025 (Key Carbon)

- **RULE AKZ-16** Light a dark hero from one physical source (a top light shaft, a corner glow, a lit card, a particle band), keep at least 60% of the fold at the base colour, and let the glow touch the product, not the headline.
  **Why** Sourced light reads as a scene. Centred colour blobs behind type read as a template (the Weft reject).
  **Applies to** dark landing heroes. **Check** pixel share of base colour >= 60%; the brightest chroma region does not overlap the h1 box. **Source** [P] kz-143-0/1 (base `#000008`/`#000010` 41-47%), kz-135-1; [V] kz-188, kz-208

### 2.5 Sections and components

- **RULE AKZ-17** Bento cells: a small muted kicker (13px, 55% ink: "Acts, doesn't just answer."), a 20px statement in two lines, then a floating mini-UI from the product (chip list, model picker, mention list, calendar flip clock) that fades out toward the cell edge; dark bentos are monochrome (one neutral hue, colour only in logos and one accent).
  **Why** Each cell proves one claim with real UI. Monochrome keeps a six-cell grid calm.
  **Applies to** landing page. **Check** each cell has kicker + statement + one UI object; saturated hues per bento <= 1 plus brand logos. **Source** [V] kz-196-0/1, kz-283, kz-180, kz-205

- **RULE AKZ-18** Feature lists inside bentos stagger in opacity: the active row at full, its neighbours at 70%, the far rows at 40%, with a spinner or check on the active row, so the list reads as "working now".
  **Why** Stepped opacity makes a static list feel live and directs the eye to one row.
  **Applies to** landing page. **Check** list rows have >= 2 opacity levels; one row carries a state glyph. **Source** [V] kz-196 ("Scheduled founder thread for Tuesday" active), kz-283

- **RULE AKZ-19** Pricing: 2-3 plans, the recommended one lit (a brand gradient rising from the card bottom, or a full accent column) rather than only outlined; a centred `INCLUDES` / `EVERYTHING IN X, PLUS` label between two hairlines; a segmented Monthly/Annual toggle with a `-20%` chip inside; one handwritten annotation allowed (Caveat 20) pointing at the saving; a trust row of 4-5 icon + text items under the cards.
  **Why** Light marks the choice without a badge war. The divider label and the trust row answer the two pricing questions (what's included, is it safe).
  **Applies to** pricing. **Check** exactly one lit plan; toggle contains a discount chip; trust row present. **Source** [V] kz-208 (Ballogy), kz-284 (Kinetiq), kz-171 (annotation); [M] designme-home fonts (Caveat 20px/400 x1)

- **RULE AKZ-20** Testimonials as a masonry: plain white quote cards (quote 16-18, avatar 28 + name + role) alternating with tall photo cards whose bottom 40% fades into the brand accent with the quote in white; or a carousel of cards with a brand-tinted shader in the hero card and two metrics (`300K+ Users`, `$17.2M Raised`).
  **Why** The photo cards bring people into a text section, and the accent fade ties them to the brand.
  **Applies to** landing page. **Check** at most 1 photo card per 3; each quote names a person and role (only if real; otherwise label it sample). **Source** [V] kz-040 (N3XT), kz-028-v1 (designme testimonials)

- **RULE AKZ-21** End client sites with a lit CTA band (particle or gradient field, centred 2-line h2, two pills) flowing into a footer that sets the wordmark at full container width, filled with the hero's material.
  **Why** The giant wordmark is the brand's last frame. Reusing the hero material closes the loop.
  **Applies to** landing page. **Check** footer wordmark width >= 80% of the container; its fill reuses a hero asset. **Source** [V] kz-188 (Quotient)

### 2.6 Product UI micro-details

- **RULE AKZ-22** Every list row carries 4+ typed data: a name (with a red 6px unread dot when unread), a one-line muted preview truncated with an ellipsis, a tinted status chip (pastel fill + darker text: Qualifying green, New lead blue; Connected as an outline chip), an owner with a glyph, a channel icon group (phone, chat, mail) and a kebab; headers 14 muted, rows about 78px (two-line) or 40px (single-line).
  **Why** Typed data makes the UI believable at a glance, which is his main product-UI signal.
  **Applies to** SaaS app UI, product heroes. **Check** >= 4 distinct cell types per row; chips use 15-25% tint backgrounds. **Source** [V] kz-129, kz-137

- **RULE AKZ-23** Put counts in tabs (`All 16`, `Unread 8`, in a 1px boxed 11px count), a filter row of outline dropdown buttons (`Columns ⌄ Stage ⌄ Channels ⌄`), `Sort by: Newest last response ⌄` right, and footer pagination `Rows per page 10 ⌄ · Showing 1 - 11 of 73` with numbered square pages, the current one filled accent.
  **Why** The list chrome states scale (73 records) and control, which is what an operator looks for.
  **Applies to** SaaS app UI. **Check** tabs show counts; a "Showing a - b of n" string is present and consistent. **Source** [V] kz-129, kz-137

- **RULE AKZ-24** Selection reveals a floating dark bulk-action bar centred at the bottom of the table (r10-12, icon + label actions: Assign user, Close, Open, Mute, Assign agent, More), with menus opening upward as dark popovers; selected rows tint the accent at about 6%.
  **Why** The bar keeps bulk actions out of the header until they are needed. Dark on light marks it as a temporary mode.
  **Applies to** SaaS app UI. **Check** bar appears only with >= 1 row selected; selected row bg is accent at 4-8%. **Source** [V] kz-137

- **RULE AKZ-25** Write metrics with their comparison and their source: the value 32-40px, a coloured arrow + % next to it, then a muted footer `Previous 30 | Baseline 14 ↑ 7%`; each chart has a one-sentence plain-English caption of what it counts and a `Show as a table` disclosure; legends are tinted pills with the series total (`Bookings 15`).
  **Why** Comparison plus provenance make a dashboard trustworthy. The caption teaches the chart.
  **Applies to** SaaS app UI, dashboards. **Check** each KPI has a comparison line; each chart has a caption and a table fallback. **Source** [V] kz-009-0/1

- **RULE AKZ-26** Mute units and empty values instead of hiding them: `0 hr 00 min`, `00:00 min`, `0 steps` with the unit at 70% size and 55% ink; empty slots become dashed-outline tiles with a `+` circle ("Connect device"); empty canvases get one centred line plus a hint ("No social posts yet / Ask the agent to draft a social post").
  **Why** A designed zero state shows the product's shape before data arrives.
  **Applies to** SaaS app UI, mobile. **Check** empty states have copy and an action; unit spans are smaller and muted. **Source** [V] kz-274, kz-143-1

### 2.7 Posting work on X

- **RULE AKZ-27** Frame a single component on a flat neutral canvas at 1:1 or 16:10, at least 1800px wide, with the component at 55-75% of the frame width and centred; the light canvas is `#eeeeee`-`#fafafa` or a 2% tint of the brand (`#f7f6fb`), the dark canvas `#161616`-`#1c1c1c`, and the component's own surface one step off the canvas.
  **Why** Flat, slightly-off canvases make the component the only object and survive X's centre crop.
  **Applies to** X posts, case-study images. **Check** corner pixels uniform; the component bbox is 0.55-0.75 of the width. **Source** [P] kz-172 (`#f7f6fb`, 64%), kz-274 (`#1c1c1c`, 57%), kz-219 (`#d6d6d6`, 74%), kz-000-1 (`#eeeeee`), kz-001-0 (`#161616`); [T] median photo width 2305

- **RULE AKZ-28** Frame app screens as a bleed crop: the app window starts at a 6-7% inset top-left with a rounded corner (r about 24 at export scale) and runs off the right and bottom edges; the canvas is mid-grey (`#d0d0d0`) for light UI and `#3d3d3d` for dark UI; crop to the sidebar + the first 6 rows so the type renders at about 2x.
  **Why** The bleed says "this continues". The mid-grey canvas separates a white app from X's white feed.
  **Applies to** X posts, case-study images. **Check** window touches 2 frame edges; canvas L* 25-85; body text >= 16px at export. **Source** [P] kz-129 (`#d0d0d0`, white app 76%), kz-132 (`#3d3d3d`, app `#202020`), kz-137

- **RULE AKZ-29** Post flows, not just screens: 3 phones in a row on a pale canvas, the same screen in 3 states, or a 4-up grid of explorations; 33% of posts should be motion (a 10-25s screen recording or an animated flow, slow pacing); captions 2-7 words naming the thing and the client ("Pricing pages for Ballogy"), with a longer line only when it teaches.
  **Why** In his feed 4-up grids get a median of 155 likes against 144 for single images. Explorations and motion show judgment and behaviour.
  **Applies to** X posts. **Check** caption word count <= 12 for showcase posts; the set mixes stills, flows and video. **Source** [T] posts.json (141 single / 27 four-up / 24 two-up; 62 video of 195; caption median 7 words, 126 with an emoji); [V] kz-159, kz-225, kz-002

- **RULE AKZ-30** Show the decision: pair "first vs final", "wireframe -> final" or "explorations that didn't make it" with the shipped version, the same copy across compositions, so the viewer sees the reasoning.
  **Why** He posts the process as often as the result, and it is what brings him inbound work ("The projects you attract are a reflection of your work", post 236).
  **Applies to** X posts, case studies, founder reviews. **Check** a showcase set contains >= 1 alternative or before state. **Source** [T] posts 58, 135, 143, 231, 249, 282; [V] kz-282-0/1, kz-249, kz-143-0/1

## 3. Numbers & scales

| Token | Value | Evidence |
|---|---|---|
| Display face (studio) | Saans 600, -0.02em at every size | [M] |
| Heading sizes / line-height | 77.76/1.0, 72/1.1, 56/1.15, 42/1.15, 32, 24/-0.01em, 20, 18 | [M] |
| Body | Inter 16/400 and 16/500 (300+ uses), 14/500 nav, 13/400 meta, 11/500 uppercase labels | [M] |
| Hero sub | 18/27, rgba(ink,.75), 2 lines, 784 wide | [M] |
| Hero gaps | eyebrow -> h1 about 30, h1 -> sub 16, sub -> CTA 32 | [M] |
| Ink | `#03111c`; text .75 / .62; borders .10 / .20; dark text `#f5f5f5` .75/.62, borders .12/.24 | [M] |
| Accent | `#116ff8`, hover about `#0f62da`; link `#004fe6` | [M] |
| Surfaces light | `#ffffff`, `#fafafa`, `#f5f5f5`, `rgba(ink,.05)` | [M] |
| Surfaces dark (Ballogy case) | `#0f0f0f` -> `#181818` -> `#1a1a1a` -> `#242424` -> `#383838` | [M] |
| Buttons | nav 36 (0 16, 14/500), hero 40 (0 24, 16/500), chip 32 (0 14, 13/500, r999), ask pill 44 | [M] |
| Radius ladder | 2 controls / 4 small / 12 cards / 24 sheet / 999 chips / 50% avatars | [M] |
| Shadows | `0 1px 2px rgb(0 0 0/.04)`, `0 1px 2px rgb(ink/.06)`, `0 4px 16px rgb(ink/.08)`, `0 8px 28px rgb(0 0 0/.1)`, `0 28px 70px rgb(0 0 0/.16)` | [M] |
| Borders | 1px only; 104 at .10, 20 at .20 on the home page | [M] |
| Container / gutter | 1280 / 120 at 1440 | [M] |
| Section padding | 128/128; closing band 252/252; case chapters 128/80 | [M] |
| Nav | sticky, 107 total = 32 announcement bar + 75 bar, transparent bg, 6 links 14/500 with + disclosure icons, sound + theme toggles, one blue CTA | [M] |
| Load-in timeline | preloader mark 260 in / 260 out at 380, lift 480 at 380; eyebrow 640@540; h1 lines 760@610, @680; sub 640@680; CTAs 640@750; aside 760@820; proof 640@890; logos 640@960 | [M] |
| Easing | transitions `cubic-bezier(0.22,1,0.36,1)` 150-320ms | [M] |
| Loops | announcement flow 26s, glint and shine 6s at 1.4s delay, stack-float 3s | [M] |
| Ballogy (Framer) | Instrument Sans 72/600 normal tracking, 16/500 sub, pill CTAs 40/48 `#f4f4f4`, cards r20/r16, ring `0 0 0 1px rgb(255 255 255/.08)` | [M] |
| Seamless | PS Times 80/400 lh 1.0, FT System 14-18, r4 controls 40-50, magenta `#c2008b` -> hover `#880763` | [M] |
| X canvas | light `#eeeeee`-`#fafafa`, lilac `#f7f6fb`, mid `#d0d0d0`/`#d6d6d6`; dark `#161616`-`#1c1c1c`, `#3d3d3d` | [P] |
| X media | ratios 16:9 (70), 16:10 (42), 1:1 (38), 4:3 (21), 9:16 (19); median width 2305px | [T] |
| X captions | median 7 words; 65% contain an emoji (often ✨ 🏀 🔥) | [T] |

## 4. Dos and Don'ts

- **Do** give each brand its own headline face; DesignMe's own grotesk is not the default for clients (kz-095 serif vs kz-216 grotesk). **Don't** ship the same grotesk + pill nav + rounded CTA for every brief (the founder's standing complaint).
- **Do** make the background the product's subject (route map, dither land, painted hill). **Don't** put a blurred rainbow or glass field behind the type with no meaning (Weft v2: "so bad, the bg").
- **Do** fill product rows with typed data and real-looking names, counts and timestamps (kz-129). **Don't** show a product whose rows are mostly empty bars and hatching (Overlap: "too hollow").
- **Do** keep controls compact and flat (36/40, r2 or one pill system). **Don't** use 54px pill buttons and three black pills as a nav (Weft).
- **Do** light a dark hero from one source at an edge (kz-143). **Don't** centre a glow behind the h1.
- **Do** post one component per frame on a flat off-white or off-black canvas (kz-172, kz-274). **Don't** export busy multi-section collages as a single X image.
- **Do** keep the second headline line as the payoff in grey (Zeal). **Don't** grey the first line and darken the second when the first carries the claim. Weft greyed "Workflows that think," and so weakened the noun.

## 5. Exceptions & judgement calls

- His own studio site is intentionally less "designed" than his client work: flat blue buttons, a 2px radius, no hero visual beyond a case video. It is a sales tool tuned for speed (99 performance) and conversion ("5 new leads today, 3 from AEO", post 4). The plain frame is a choice for an agency, not a rule for a SaaS hero. [engine note]
- Several client heroes use effects the engine's rules treat with caution: grain rainbow (kz-001-1), glow headline (kz-143-1 "that does the marketing." with a violet glow), glossy gradient icons (kz-161), a light shaft. He gets away with them because each is one effect, anchored to the product or brand, at a shipped finish. Keep the "at most two looping effects" rule.
- Some explorations use placeholder logos (Google repeated in Zeal's logo row, "Glossy/hues" in Atlas) and lorem (kz-257). These are concept stages, not shipped claims; the engine must still never invent proof (Principle 4).
- Weight: his grotesk headings sit at 600, heavier than the engine's measured 400-550 default (`type-voices.md`). It works because tracking is only -0.02em (not crushed) and sizes are moderate (72-78). Heavy + crushed is the template tell, not heavy alone. [engine note]
- Dark surfaces: his neutral darks (`#0f0f0f`-`#383838`) are hue-free, unlike the engine's six tinted dark recipes. Brand-tinted dark appears only where the brand is indigo or navy (Quotient `#02000e`, security client `#080e1c`, Kinetiq `#030619`) [P].

## 6. Honest comparison with the engine's builds

| | Kuleszo | Weft v2 (reject) | Overlap (reject) | Kestrel / Quorum (accept) |
|---|---|---|---|---|
| Background | the product's subject or flat | blurred rainbow glass at both edges, unrelated to workflows | flat warm grey, nothing | dotted grid + rails (Kestrel), smooth gradient stage (Quorum) |
| Headline | brand voice; two-tone = payoff line grey | grey line 1, ink line 2 (inverted emphasis), crushed -0.05em | 64px Title Case left, sub pushed to a far right column, hollow middle | centred 2-line with inline AI tile (Kestrel), 58/550 (Quorum) |
| Buttons | 36-40 flat, one grammar | 54px black + white pills; nav as 3 black pills | ink 48 + text link (fine) | 46-48 ink gradient + white |
| Product content | 4-6 typed cells per row, counts, comparisons | dense nodes, but the field fights it | 6 rows of near-identical empty bars; one blue slot repeated | Kargul-level tables, KPI cells, Ask panel |
| What it proves in 3s | the product's world + a real screen | "a workflow tool" only after scrolling past the blur | "time zones", but no decision visible | the product answers questions |

What the rejects get wrong compared with him:
1. **Decoration where he puts subject matter.** Weft's field is pretty colour with no meaning. Kuleszo's fields are maps, scenes or photos of the product's world (AKZ-15, AKZ-16).
2. **Hollowness where he puts density.** Overlap's timeline shows mostly empty containers. His product crops are full of typed data (AKZ-22..26).
3. **Oversized, repeated control grammar.** Weft uses huge pills and a pill nav. He uses compact flat controls in one corner grammar (AKZ-06, AKZ-07).
4. **One house voice.** Both rejects use the engine's default grotesk at heavy weight and crushed tracking. He changes the voice per brand (AKZ-02) and tracks only -0.02em (AKZ-01).
5. **Composition gaps.** Overlap splits copy into two columns with an empty middle. His splits always put a real object in the second column (AKZ-14).

Where the accepted builds already match him: Kestrel and Quorum share his product-proof hero and his believable data. To reach his class they still need a brand-specific type voice, a world visual that is the subject, and flatter controls.

## 7. Figures worth keeping

- `kz-129-0` and `kz-137-0`: best light product-UI density and list chrome (inbox and contacts).
- `kz-132-0`: dark agent analytics with a gradient funnel and a 100%/25% pill on a dashed midline.
- `kz-143-0/1`: one hero copy in two compositions (perspective planes vs tabs over the window).
- `kz-146-0`, `kz-257-0`: illustrated-world heroes and sections (GrowthSync).
- `kz-095-0/1`: serif two-tone hero with a grid and a giant brand shape (Zeal).
- `kz-135-0/1`: Atlas split vs centred, selection-box word, route map.
- `kz-196-0/1`, `kz-283-0`: monochrome dark bentos.
- `kz-208-0`, `kz-284-0`, `kz-171-0`: pricing.
- `kz-172-0`, `kz-274-0`, `kz-219-0`: single-component X frames.
- `kz-282-0/1`: grotesk draft vs serif final (voice decision).
- `measure/designme-home-fold.png`: his own frame (2px buttons, 128 rhythm).

## 8. Open questions

- The live Quotient domain did not resolve (`quotientai.co`), and the current lightdash.com is not confirmed as DesignMe's build; their numbers come from X images only [V].
- Hover states and motion of the client sites (other than Ballogy's 400ms opacity reveals at 2.0-2.4s and Seamless's 60s scroll loop) are not measured. The X videos show them but frame timing was not extracted.
- Saans is a commercial face (Displaay). Its metrics behind the -0.02em choice are not documented; Inter Display or Geist at -0.02em is the nearest free stand-in, unverified.
- The X image canvas sizes are post exports; whether he uses one fixed artboard (for example 1800x1800 or 2048x1152) is not documented. Both appear repeatedly.
- Not documented: his Figma file structure, spacing variables, or the cohort material (paid, not accessed).
