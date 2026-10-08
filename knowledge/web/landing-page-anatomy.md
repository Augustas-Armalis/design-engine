---
source: web:nngroup.com/articles/scrolling-and-attention + nngroup.com/articles/how-long-do-users-stay-on-web-pages + nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered + nngroup.com/articles/hamburger-menus + nngroup.com/articles/mega-menus-work-well + nngroup.com/articles/trustworthy-design + baymard.com/blog/checkout-flow-average-form-fields + baymard.com/research-articles/homepage-carousel + unbounce.com/conversion-benchmark-report/saas-conversion-rate + julian.com/guide/growth/landing-pages + web.dev/articles/vitals + web.dev/case-studies/vitals-business-impact + portent.com (site-speed study) + blog.hubspot.com/marketing/landing-page-navigation-ht + wingify.com (Yuppiechef) + spiegel.medill.northwestern.edu (reviews)
chapter: Landing page and SaaS marketing site anatomy (section library)
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [landing-page, saas, hero, cta, social-proof, pricing, navigation, footer, forms, trust, performance, mobile, attention, ab-tests]
status: studied
---

# Landing page and SaaS marketing site anatomy

Companion file: `funnels-and-conversion.md` (lead-gen, demo, webinar, waitlist, checkout, onboarding funnels; A/B evidence ledger; pricing mechanics).

## 0. Evidence grading (read first)

Web CRO numbers are mostly weak. Every number below carries a grade. **Never present a [V], [S] or [U] number as a law; use them as priors to test.**

| Grade | Meaning |
|---|---|
| **[P]** | Primary: first-party study with stated method (NN/g eyetracking, Baymard usability tests, web.dev/Google data, Unbounce/Portent datasets with stated sample) |
| **[V]** | Vendor or practitioner test: real test but self-reported, no sample/significance published (Yuppiechef, Performable, HubSpot nav test, Vidyard video) |
| **[S]** | Secondary: repeated by blogs, original not located |
| **[U]** | Unverified or contradicted across sources: do not cite |
| **[E]** | Engine note: my own design judgement or standard (WCAG, common practice), not from the fetched sources |

Search tools returned summaries, not full text. Where I could not open the original the grade is [S]. Things I could not confirm are in section 7.

## 1. Core ideas

1. **The page has ~10 seconds and a quarter of the words.** Average page visit is slightly under 60 s; users read about a quarter of the text; the first 10 s decide stay/leave; people who last ~30 s tend to stay 2+ min. Value proposition must land inside 10 s. [P: NN/g "How long do users stay on web pages"]
2. **Attention decays steeply with depth but pages still get scrolled.** 2018 eyetracking (120 participants, 130k+ fixations, 1920x1080): 57% of viewing time above the fold (80% in 2010), 74% in the first two screenfuls (to 2160 px), 81% in three; top 20% of page length gets >42% of time, top 40% >65%. Caveat: long pages were excluded. [P: NN/g "Scrolling and Attention"]
3. **"Illusion of completeness" is the real fold risk.** If the above-fold view looks finished (full-bleed hero, hard colour edge), users stop. NN/g: add cut-off cues so the next section peeks. [P]
4. **People scan in layers.** F-pattern is the fallback when structure is weak (232 users, thousands of pages; confirmed 11 years later). The efficient pattern is "layer-cake": scan headings, then dive into chosen sections. So: meaningful headings, front-loaded first two words per line/bullet, key content in first paragraph. [P: NN/g]
5. **Plain language converts.** Unbounce SaaS data: copy at 5th-7th grade level converted 12.9% vs 2.1% for professional-level copy; best pages had 250-725 words. Correlational, but direction is consistent with NN/g. [P/V: Unbounce, gated report; stated sample not fetched]
6. **Clarity beats cleverness; the first claim people challenge is the unexplained stat.** Wynter's AI-persona critique runs flagged that unexplained headline stats ("73% conversion") get challenged first and that a logo set of one category makes buyers outside it conclude the page is not for them. Directional only: these runs used AI role-play, not human buyers, and scores varied run to run (relevance 4/15 to 15/15 on the same page). [S]
7. **Speed is a conversion feature, correlationally.** Portent (100M+ page views, 20 sites, 14 B2B lead-gen): B2B converted ~40% at 1 s, 34% at 2 s, 29% at 3 s; a 1 s site converts 3x a 5 s site. Google/Deloitte: 0.1 s mobile speed gain = +8.4% retail, +10.1% travel conversion (37 brands, only when every page in journey improved). Vodafone Italy: LCP -31% = +8% sales via A/B. [P for method stated, causation not proven]
8. **Navigation removal helps in proportion to funnel stage.** HubSpot (5 high-traffic pages): TOFU free-content pages +0-4%; MOFU (demo/sales) pages +16% and +28%. Yuppiechef 3% to 6% (doubled) on a single registry page, no sample published. So strip nav on paid-traffic dedicated pages, keep it on the evergreen homepage. [V]
9. **Hidden navigation costs usage.** NN/g: visible nav used in 48% of desktop tasks, combo 50%, hidden (hamburger) only 27%; mobile hidden 57% vs combo 86%; hidden = >20% drop in content discoverability, 39% slower desktop tasks. [P]
10. **Trust is built by disclosure, not badges.** NN/g's trust study: upfront costs/fees, visible contact, return/guarantee links, no login walls before value, third-party reviews trusted over on-site testimonials, typos and broken links read as carelessness. Small qualitative samples. [P, qualitative]
11. **Forms: remove fields users have to think about, not just count.** Baymard: average checkout 11.3 fields, ~8 sufficient; 17% abandoned for complexity. But Unbounce/Aagaard: removing the three most-engaged fields cut conversions 14%; relabeling instead of removing gave +19.2%. [P + V]
12. **Proof volume saturates and perfection hurts.** Spiegel Research Center (retail): 5 reviews = +270% purchase likelihood vs none; +380% for high-priced vs +190% low-priced; diminishing after ~5; peak at 4.0-4.7 stars, falling toward 5.0. Retail context; use as direction for B2B proof. [P, retail]

## 2. Rules

Format per SCHEMA. Rules are ordered strongest-first within groups. Section-specific rules live in 2A with each section.

### 2.1 Above the fold and hero

- **RULE** In the first viewport (1440x900 desktop and 390x844 mobile) the visitor must be able to answer: what is it, who is it for, what do I do next. H1 + one subhead + one primary CTA + one proof/product visual. No more than one primary and one secondary CTA.
  **Why** 10 s decision window; ~25% of words read. **Applies to** landing page. **Check** render at both viewports; assert `h1`, a button/link with primary style, and a product/visual element all intersect the viewport; count of primary-styled CTAs in viewport = 1. **Source** [P] NN/g first-10-seconds/time-on-page; [E] viewport sizes.
- **RULE** H1 must be fully descriptive: a reader who reads only the H1 knows what you sell. Name the category noun or the outcome plus the mechanism. No slogans, no self-congratulation.
  **Why** Shapiro: "a visitor who reads only the header should know exactly what you sell"; Highrise: moving the plain offer (30-day free trial) into the headline beat the action-named headline by ~30% (5 variants, ~4000 page views, 37signals, old). **Applies to** landing page. **Check** H1 contains a concrete noun from the product category or a verb+object; fails if H1 matches a slogan blocklist (e.g. "reimagine", "the future of", "supercharge", "unlock", "seamless", "next-generation"). **Source** [V] julian.com; Highrise write-up [S].
- **RULE** Subhead: 1-2 sentences, explains how the H1 claim is possible (the mechanism / the feature that makes it believable). Max ~28 words, max 2-3 lines at 60-ch measure.
  **Why** Shapiro structure: header claim, subheader mechanism. Prevents the "claim without belief" failure. **Applies to** landing page. **Check** word count <=30; line count <=3 at desktop width; `max-width` 52-64ch. **Source** [V] julian.com; [E] numbers.
- **RULE** Show the product (real UI, real output) in the first viewport or peeking within it. Abstract gradients, stock photos or 3D blobs do not count.
  **Why** Software feature imagery should "show the product in action" (Shapiro); proof beats description. **Applies to** B2B/AI SaaS. **Check** hero visual contains rendered UI (screenshot/video/live component), not decorative-only; alt text names UI. **Source** [V] julian.com.
- **RULE** The next section must peek above the fold (>= 40-80 px of the next section's content or a strong edge cue visible at 900 px viewport height), or the hero must not be a closed 100vh block.
  **Why** Illusion of completeness / false floor. **Applies to** landing page. **Check** at 1440x900 and 1280x720, element at y in [viewport-120, viewport] belongs to the next section or hero visual is cropped by viewport. **Source** [P] NN/g.
- **RULE** No auto-rotating hero carousel. If a carousel exists: desktop auto-rotate 5-7 s (up to 10 s for text-heavy slides), pause on hover, stop permanently after first manual change; mobile no auto-rotation; real HTML text; all slide content also reachable elsewhere on the page.
  **Why** Baymard: 46% of homepage carousels have implementation problems and static sections perform equally; NN/g: banner blindness, first-slide offers missed even in large type. **Applies to** landing page. **Check** DOM has no `swiper/slick/embla` autoplay on hero; if present, autoplay interval >=5000 ms and `pauseOnHover`. **Source** [P] Baymard; NN/g via secondary [S].

### 2.2 CTA design, copy, placement

- **RULE** One primary action per page, repeated, not varied. Same label and destination at hero, mid-page and final CTA. Secondary action (watch demo, view pricing) is visually weaker (ghost/outline/link).
  **Why** Choice overload; Shapiro structure repeats the same CTA after features; HubSpot MOFU result shows removing competing exits helps most where the goal is a demo/sales action. **Applies to** landing page. **Check** distinct primary CTA destinations on page = 1 (excluding nav login); at least 3 occurrences on pages > 3 viewports. **Source** [V] HubSpot; julian.com.
- **RULE** CTA label = verb + what they get (+ cost/risk reducer adjacent): "Start free trial", "Book a 20-min demo", "Get the benchmark report". Avoid "Submit", "Learn more" as primary. Put the friction reducer ("No credit card", "Free for 14 days", "Takes 2 min") within 16-24 px under/beside the button, 13-14 px text.
  **Why** Vague CTA copy that does not clarify the product is weak (Shapiro). The first-person ("Start my…") wording test shows +90% on one page and -25% on a payment page: effect is context-dependent, so it is a test hypothesis, not a rule. **Applies to** landing page. **Check** label regex `^(Submit|Click here|Learn more|Continue)$` is a fail for primary; microcopy element within 24 px of primary CTA when a trial/demo CTA. **Source** [V] julian.com; first-person test [U] (attributions to ContentVerve/Unbounce conflict; 90% vs -24.95% reported).
- **RULE** Button colour does not matter; contrast against its surroundings does. Primary CTA must be the highest-contrast, only-saturated-accent element in its viewport.
  **Why** Performable's red beat green by 21% (few days, ~2k visitors) but green was the dominant colour of that page so the green button blended in; red was the only red thing. **Applies to** all. **Check** CTA background vs adjacent background contrast >= 3:1 (WCAG non-text), label contrast >= 4.5:1; accent colour used on <= 1 other element type in viewport. **Source** [V] Performable via secondary [S]; [E] thresholds (WCAG 2.2 1.4.3/1.4.11).
- **RULE** Touch/click target >= 44x44 CSS px for the primary CTA on mobile (button height 48-56 recommended); >= 8 px gap between adjacent targets.
  **Why** Mis-taps; WCAG 2.5.8 min is 24 px, 44 is the AAA / platform norm. **Applies to** mobile. **Check** bounding box of every `a, button` >= 44 px high on `<=480` px viewport. **Source** [E].
- **RULE** On mobile pages longer than ~3 screens, use a sticky bottom CTA bar that appears after the hero CTA scrolls out of view, hides while the on-page form is in view, and respects `env(safe-area-inset-bottom)`.
  **Why** Keeps the one action reachable (thumb zone) after the first CTA is gone; GoodUI lists Sticky Call To Action as a tested pattern (644 tests in database; effect sizes paywalled). **Applies to** mobile. **Check** `position: sticky/fixed; bottom:0` element containing primary CTA; height <= 72 px; not overlapping cookie banner. **Source** [E]; goodui.org pattern #41 [S].
- **RULE** Repeat the CTA at every decision point: hero, after the first proof block, after pricing/feature block, final CTA. Not more than one per ~1.5 viewport heights.
  **Why** Different visitors reach conviction at different depths; the first two screenfuls get 74% of attention but the remaining 26% is where late-deciders are. **Applies to** landing page. **Check** count CTA occurrences vs page height; gap between CTAs 0.8-2.5 viewports. **Source** [P] NN/g for distribution; [E] spacing.

### 2.3 Social proof

- **RULE** Place the first proof within or directly under the hero (logo strip or one metric + name). Proof must be specific: person name, role, company, number, and the baseline; anonymous "Join 10,000 teams" with no verifiable detail is weak.
  **Why** Logos without context are easy to fake and cautious buyers discount them; unexplained stats are the first claim challenged (Wynter runs, AI persona, directional). Customer-supplied third-party reviews are trusted more than on-site testimonials (NN/g). **Applies to** landing page. **Check** each testimonial has name + role + company (+ photo/logo); each stat has a denominator or period. **Source** [S] Wynter AI runs; [P] NN/g trust.
- **RULE** Logo strip: 5-8 logos in one row (desktop), single colour (monochrome at ~60-70% opacity or foreground colour), equal optical height (24-32 px tall), 40-64 px gaps; mobile 2 rows of 3 or a slow marquee that pauses on `prefers-reduced-motion`. Make logos match the ICP of the page: a mixed-vertical audience needs mixed-vertical logos.
  **Why** Single-category logos tell other categories "not for me" (Wynter note). Row of >8 logos dilutes. **Applies to** B2B SaaS. **Check** logo `img` heights within +/-4 px of each other; count 5-8 visible; colour channel variance low (monochrome). **Source** [S] Wynter; [E] geometry. The "comScore ~70% lift from logos" is [U].
- **RULE** Review/rating proof saturates at ~5 recent, verified reviews; show a rating of 4.0-4.8 with a count and source (G2, Capterra, Trustpilot), not a flat 5.0.
  **Why** Spiegel: purchase likelihood peaks at 4.0-4.7 and drops toward 5.0; verified reviews +15% (secondary); marginal gain falls after ~5 reviews. Retail data; transferable direction. **Applies to** landing/pricing. **Check** rating widget has count and platform; value < 5.0 is fine. **Source** [P] spiegel.medill.northwestern.edu; verified +15% [S].
- **RULE** Place proof next to the objection it answers (security quote beside the security section; ROI quote beside pricing; migration quote beside integrations). Case-study quote leads with the outcome number.
  **Why** Proof is an answer to a doubt, so it works when adjacent to the doubt. **Applies to** landing page. **Check** `visual`; each quote's topic keyword matches its section heading. **Source** [E] with Shapiro's "address objections within features".
- **RULE** Prefer real video/photo of the named person over stock; attribute every number.
  **Why** NN/g trust: show real people and process; typos/fakes read as untrustworthy. **Applies to** all. **Check** reverse image search stock; `visual`. **Source** [P] NN/g.

### 2.4 Navigation and footer

- **RULE** Marketing-site header: logo left; 3-6 primary links; login as text link; one primary CTA button on the right; height 56-72 px; sticky with solid or blurred opaque-enough background (contrast >= 4.5:1 for links over the blur).
  **Why** Visible nav is used ~48-50% vs 27% hidden on desktop. **Applies to** SaaS site. **Check** nav links visible (not behind a hamburger) at >=1024 px; top-level link count 3-6; nav height 56-72 px. **Source** [P] NN/g hamburger study; [E] sizes.
- **RULE** Use a hidden (hamburger) menu only below ~768 px, and pair it with the primary CTA visible outside the drawer.
  **Why** Mobile hidden nav still gets used (57%) but combo 86%; hidden = 15% slower on mobile. **Applies to** mobile. **Check** at 390 px: CTA button present in header outside the drawer, or a sticky bar. **Source** [P] NN/g.
- **RULE** Mega menus: show on hover after ~0.5 s dwell, display within ~0.1 s, close after ~0.5 s outside both trigger and panel; allow diagonal pointer travel; group options into medium chunks with concise labels, most-important group top-left, each item listed once, panels open without scrolling; keyboard- and screen-reader-operable; also make the top-level item a real link to an index page.
  **Why** Prevent flicker and accidental close; recognition over recall. **Applies to** SaaS site. **Check** hover-intent delays 400-600 ms open / 400-600 ms close; panel height <= viewport; Tab opens/arrow-keys navigates; top-level `href` exists. **Source** [P] NN/g mega menus.
- **RULE** Dedicated campaign/ad landing pages (single goal): remove top nav and footer links except logo (non-clickable or to home), privacy/terms. Evergreen homepage and pricing keep full nav.
  **Why** HubSpot: removing all external links gave 0-4% on TOFU and 16%/28% on MOFU pages; Yuppiechef doubled signups on a registry page. Effect scales with how committed the traffic is. **Applies to** paid/campaign pages. **Check** link count on page <= 3 outside the conversion path. **Source** [V] HubSpot (n=5 pages), Wingify/Yuppiechef (no sample).
- **RULE** Footer: 4-6 columns (Product, Solutions/Use cases, Resources, Company, Legal, Compare/Integrations optional), each 4-8 links; left cell has logo + one-line positioning + social; bottom row has copyright, Privacy, Terms, Security/Status, and region/language. Place a final CTA or newsletter above the footer, not inside.
  **Why** Footer is the "I could not find it" catch-all and the trust-link location (contact, policies are trust signals: contact info prominent, links to policies). **Applies to** SaaS site. **Check** presence of privacy, terms, contact, status/security links; no link to a 404. **Source** [P] NN/g trust (contact, policies); [E] structure.

### 2.5 Forms (on-page)

- **RULE** Ask only for what the next step needs. Lead capture: email only; demo request: name/work email/company (+ optional role), qualify later (progressive profiling) unless routing needs them; if a field is removed, test it, because removing the fields people engage with can hurt.
  **Why** Imagescape 11 to 4 fields = +120% (2007-8, old); Aagaard removed 3 fields = -14%, and relabeling instead gave +19.2%; HubSpot 40k pages: phone number request dropped conversion 19% to 13%, multi-line text boxes hurt most while single-line fields barely hurt. **Applies to** forms. **Check** count `input,select,textarea` visible; flag phone/multiline as friction; flag fields not used downstream. **Source** [V]/[S] as cited; Baymard [P] for checkout fields.
- **RULE** Visible label above every field (not placeholder-only), format hints as separate helper text, mark both required and optional or just avoid optional fields, validate on blur (email/password strength can validate live), keep the typed text on error, error text next to the field with the fix.
  **Why** Placeholder-only fields get skipped (empty fields attract attention more) and vanish when typing; Baymard: error-on-submit misses a chance to prevent the error; inline validation resolves most. **Applies to** forms. **Check** every input has `<label for>` or `aria-label`; `placeholder` not the only label; `aria-describedby` on error. **Source** [P] Baymard inline validation; NN/g placeholder via secondary [S].
- **RULE** Single "Full name" field instead of First/Last unless the system needs it; hide Address line 2 and coupon behind a link; collect billing address only if different from shipping; delay account creation until after the order.
  **Why** Baymard: 42% of participants typed full name in first-name field at least once; 30% stalled at Address line 2; 89%/75%/84% of benchmark sites do not follow these tactics. **Applies to** checkout/forms. **Check** form field inventory. **Source** [P] Baymard.
- **RULE** Form submit button label states the outcome ("Book demo", "Get the guide"), full width on mobile, 48+ px tall, with privacy/consent micro-line under it.
  **Why** Trust disclosure: say how data is used. NN/g B2B study (via secondary): sites commonly force registration without explaining data use. **Applies to** forms. **Check** button text not "Submit"; consent copy within the form. **Source** [S] NN/g B2B via cio.de; [P] NN/g trust.

### 2.6 Performance and mobile

- **RULE** Landing pages must pass Core Web Vitals at the 75th percentile, per device class: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. Treat <= 1.5-2 s LCP as the design target for paid-traffic pages.
  **Why** Vodafone LCP -31% = +8% sales (A/B); Redbus CLS 1.65 to 0 plus TTI 8 s to 4 s reported +80-100% mobile conversion (association); Portent B2B 1 s vs 5 s = 3x; Google: 53% of mobile visits abandoned beyond 3 s (2016), bounce probability +32% from 1 s to 3 s. **Applies to** all. **Check** Lighthouse/CrUX or lab: LCP, INP (TBT proxy < 200 ms), CLS; hero image has `fetchpriority="high"`, explicit width/height, no lazy-load on LCP image. **Source** [P] web.dev vitals; web.dev case studies [P, correlational]; Portent [P]; Think with Google [S].
- **RULE** Reserve space for everything that loads late (images, embeds, cookie banners, fonts via `size-adjust`/fallback metrics) so CLS stays <= 0.1; no layout-shifting sticky banners above the fold.
  **Why** Redbus and AliExpress/Yahoo Japan case data link CLS fixes to conversion/bounce improvements. **Applies to** all. **Check** CLS < 0.1 in lab; every `img`/`video`/`iframe` has width+height or aspect-ratio. **Source** [P] web.dev case studies.
- **RULE** Hero video/animation must not block LCP: poster image is the LCP, video loads after, respects `prefers-reduced-motion` and data-saver; no autoplay with sound. Lightbox (click-to-play) rather than inline autoplay for explainer videos.
  **Why** Vidyard-in-Unbounce test: no video 6.5%, embedded video 11% (+69%), lightbox 13% (+100%) is a vendor test but the performance and attention logic agree. **Applies to** landing page. **Check** `video` has `poster`, `preload="none"|"metadata"`; LCP element = poster/img. **Source** [V] Vidyard/Unbounce via secondary [S]; [E].
- **RULE** Mobile-first: design the 390 px layout first. Single column, section padding 56-80 px, H1 36-44 px, tap targets >= 44 px, hero visual below or cropped (not hidden if it is the proof), comparison tables and pricing become stacked cards or horizontal snap-scroll with visible peek of next card.
  **Why** 79% of SaaS landing page visits are from mobile (Unbounce), conversion on mobile (6.4%) roughly equals desktop (6.2%) in that dataset. **Applies to** mobile. **Check** no horizontal page scroll at 320/375/390/430; body text >= 16 px; no element < 44 px tap height. **Source** [P/V] Unbounce; [E] sizes. (Unbounce does not state the dataset for the mobile/desktop pair; treat as directional.)

### 2.7 Page length, copy and scanning

- **RULE** Length follows commitment: low-friction offers (free trial, newsletter, waitlist) can be short (hero, proof, 3 benefits, CTA); high-commitment (demo, enterprise, annual price) needs the full section stack. Target 250-725 words on lead-gen pages; long product homepages can exceed that if each section is scannable.
  **Why** Unbounce SaaS best-converting range 250-725 words; NN/g 74% of attention in the first two screens means the top must carry the argument, and the rest answers objections. **Applies to** landing page. **Check** word count of visible text per page type; heading every 1-1.5 viewports. **Source** [P/V] Unbounce; NN/g.
- **RULE** Write at grade 5-7 reading level, short sentences, plain nouns, few 3+ syllable words (best pages used 50-140 such words, which is not "none"). Check with Flesch-Kincaid.
  **Why** 12.9% vs 2.1% conversion for grade 5-7 vs professional-level copy in the Unbounce SaaS dataset. **Applies to** landing page. **Check** FK grade of H1+subhead+section headings <= 8; sentence length avg <= 18 words. **Source** [P/V] Unbounce.
- **RULE** Front-load. Each heading, bullet and paragraph starts with the information-carrying word(s); users read the first two words of a line far more than the third. Bold or heading emphasis consistent so new sections are recognisable.
  **Why** F-pattern/layer-cake behaviour. **Applies to** all. **Check** first 2 words of each H2/H3/bullet are not stopwords ("The", "A", "With our", "We"). **Source** [P] NN/g F-pattern.
- **RULE** Section headings carry the argument as a sentence, not a topic label ("Ship a review in 5 minutes", not "Features").
  **Why** Layer-cake readers decide which section to read from headings only. **Applies to** landing page. **Check** H2 length 4-12 words; avoid H2 equal to nav label. **Source** [P] NN/g layer-cake; [E].
- **RULE** Purchase rate = Desire - (Labor + Confusion). Every element either raises desire, reduces reading labor, or removes confusion about the next step; delete anything doing none of these.
  **Why** Shapiro's operating model for landing pages. **Applies to** landing page. **Check** `visual` + section audit (each section has a stated job). **Source** [V] julian.com (opinion/framework).

## 2A. Section library

Page order for a B2B/AI SaaS home or product landing page (Shapiro baseline: nav, hero, social proof, CTA, features/objections, CTA, footer; extended below). Not every page needs every section; the "job" column says when to cut.

| # | Section | Job (one sentence) | Cut when |
|---|---|---|---|
| 0 | Nav | Orientation, CTA always reachable | Campaign page |
| 1 | Hero | State what/who/next step in 10 s | Never |
| 2 | Logo strip / proof bar | Remove "is this legit" doubt within first 2 screens | No credible logos: use a metric or press quote |
| 3 | Problem / contrast | Make the pain and the old way concrete | Product category is already obvious and simple |
| 4 | Product proof / how it works | Show the product doing the thing, in 3 steps or one demo | Never for SaaS |
| 5 | Feature / benefit blocks | Each = value prop + objection handling + image (3-6 blocks) | Single-purpose micro-tool |
| 6 | Use cases / personas | Route different buyers to their story | One persona |
| 7 | Integrations | Remove "does it fit my stack" objection | Standalone product |
| 8 | Security / compliance | Remove "can I get this past IT/legal" objection | Consumer/SMB-only freebie |
| 9 | Testimonials / case studies | Peer proof of outcome | Never; shrink instead |
| 10 | Metrics band | Compress credibility into 3-4 numbers | No attributable numbers |
| 11 | Pricing (or pricing teaser) | Show cost model; anchor value | Sales-led with no public price: show "how pricing works" |
| 12 | FAQ | Answer last objections, capture long-tail search | Very short page |
| 13 | Final CTA | Give a convinced scroller the action without scrolling up | Never |
| 14 | Footer | Catch-all nav, trust links | Never |

Spacing scale used below [E] (not from sources; consistent with 8 px grid): container max 1200-1280 px, 12 columns, gutter 24-32 px desktop, 16-20 px mobile; section vertical padding 96-144 px desktop, 56-80 px mobile; intra-section gap heading to content 40-64 px desktop, 28-40 px mobile; card padding 24-32 px; card radius consistent system-wide. The **check** for spacing is always: every section's vertical padding is from the page's scale (max 3 distinct values), and no section's content is wider than the container unless explicitly full-bleed.

---

### 2A.0 Header / Nav bar (see 2.4)

**Purpose** Orientation and one always-available action.
**Slots** Logo, 3-6 links (Product, Solutions, Pricing, Resources, Docs), Login (text link), CTA button.
**Layouts**
- **NAV-A Classic bar**: 64 px high, logo left (24-28 px tall), links centred or left-adjacent, login + CTA right. Full-width bottom hairline appears after scroll. Most common, safest.
- **NAV-B Floating pill**: container-detached pill, max width ~960 px, centred, top offset 12-16 px, radius 999 px (or 16 px), blur background + 1 px border; collapses to a logo + menu button on mobile. Distinctive, but verify link contrast over blur.
- **NAV-C Mega-menu bar**: NAV-A plus hover panels (see 2.4 timing); panel 2-4 columns, each column a group label (12-13 px uppercase or semibold) + 3-6 items with 1-line descriptions; featured card at right (case study or product image).
- **NAV-D Announcement + bar**: 36-40 px slim banner above NAV-A for a launch/event; dismissible; must not shift layout after load (reserve space).
**Spacing** Link gap 24-32 px; link text 14-16 px; no more than 6 top-level items.
**Do/Don't** Do keep CTA label equal to hero CTA. Don't use hamburger on desktop. Don't use two filled buttons (CTA + Login) side by side.
**Measurable checks** link count 3-6; height 56-72; tab order logical; focus rings visible; sticky header height + `scroll-padding-top` equal so anchor links are not hidden.

### 2A.1 Hero

**Purpose** State category, outcome and next step inside 10 s; establish tone.
**Slots** Eyebrow (optional: category or news tag, <= 4 words), H1, subhead, primary CTA (+ friction reducer), secondary CTA/link, hero visual or product, micro-proof (rating, logo mini-row, "used by X"), optional announcement chip.
**Hero pattern selection (which fits when)**

| Pattern | Fits when | Proof mechanism | Risk |
|---|---|---|---|
| Product-proof | B2B/AI SaaS where the UI is the argument; buyer wants to see before they believe | Real UI visible in first 900 px | UI too small/dense to read; fake dashboards |
| Brand-campaign | Known brand, category creation, emotional purchase, high-visual brand | Mood and distinctiveness | Fails the "what is it in 10 s" test for unknown brands |
| Interactive | The product can be tried in 10 s (prompt box, calculator, playground, URL input) | The visitor makes the proof | Heavy JS hurts LCP/INP; empty-state if user does nothing |
| Editorial | Thought-leadership, research, developer/AI labs, content-first | Authority and writing quality | Low scannability; weak CTA |
| Offer-led (campaign) | Paid traffic to one offer (trial, report, webinar) | Message match with ad + offer | Mismatch to ad = bounce |
| Video-led | Complex or physical-like product needing narrative | Motion demonstrates | LCP and mute-by-default; use poster + lightbox |

**Layouts**
- **HERO-A Split product** (default): 12-col; text column spans cols 1-6 (left aligned), product visual cols 7-12 bleeding to the viewport right edge or cropped by container. H1 48-64 px (clamp(2.5rem, 5vw, 4rem)), line-height 1.05-1.12, max 2-3 lines, measure <= 14-18 words; subhead 18-20 px, line-height 1.5, max-width 52 ch; CTA row 16-24 px below subhead; micro-proof row 24-32 px below CTA. Mobile: text first, visual below, same CTA order.
- **HERO-B Centered stack + product slab**: single centred column max 760-880 px for eyebrow, H1 (3 lines max), subhead, CTA row; below it a full-container product screenshot (aspect ~16:10 to 16:9) with the top 40-60% visible in the first 900 px viewport and the rest peeking (this is the fold-peek cue). Add a soft top gradient or border to anchor the slab. Mobile: slab full-width, crop to the interesting region, not a shrunken full screenshot.
- **HERO-C Interactive prompt/input**: centred H1 + a 56-64 px tall input (prompt, URL, email) with the CTA button attached (input-group: 1 control, radius shared), example chips (3-5, 36 px tall) below, result area that expands below on use; static fallback preview when idle. Use for AI products where "type something" is the product. Pre-fill with a working example so the first interaction yields value without typing.
- **HERO-D Editorial / headline-led**: large type-dominant, H1 64-96 px, left aligned across cols 1-9, subhead in cols 1-6, one CTA and an optional text link; no product visual in first viewport but a meaningful proof line (a metric or logo) is present; next section starts within 120 px of fold. Needs exceptional copy; never for an unknown category.
- **HERO-E Offer/campaign (message match)**: left 5-6 cols text (H1 matches the ad promise verbatim, 3 bullets with outcomes, trust line), right 5-6 cols form card (white/elevated, 32 px padding, <= 4 fields), no nav. Mobile: H1 + bullets, then form directly under (do not push the form below the fold on 844 px height).
- **HERO-F Video-led**: 16:9 poster frame in cols 2-11 under H1/subhead; play button 64-80 px centred; lightbox opens; captions on; transcript link. Static poster is LCP.
- **HERO-G Logo-wall proof hero** (enterprise): H1 + CTA centred, directly beneath a row of 5-6 logos with a stat, product image secondary. Use when buyer trust is the bottleneck.

**Spacing** Top padding below nav 64-120 px desktop (not a full 100vh void), 40-64 px mobile; hero bottom padding such that the next section's heading/edge appears within the 900 px viewport. Don't centre vertically in 100vh.
**Do** One H1, one primary action, real product, specific claim, a proof element within 120 px of CTA. **Don't** Rotating carousels, three equal-weight CTAs, abstract 3D blobs as the only visual, headline that needs the image to make sense, stock photo of people at a laptop, text over busy imagery (contrast < 4.5:1).
**Copy** H1 formulas that map to the evidence: (1) outcome + mechanism ("Ship … faster with …"), (2) category + differentiator ("The CRM for …"), (3) the plain offer including the free trial/time/price (Highrise-style, ~+30% vs action headline in an old test). Subhead explains how it's possible. Test message with Wynter-style or 5-second tests before design.
**Measurable checks** H1 text <= ~14 words, 2-3 lines at 1440 and 390; LCP element is hero image/poster and loads <= 2.5 s; CLS = 0 for hero; primary CTA above 800 px y at 1440x900; next-section peek; contrast >= 4.5:1 for text over any media; no autoplay audio.

### 2A.2 Logo strip / proof bar

**Purpose** Cheap, fast "others trust this" within 1-2 screens.
**Slots** Lead-in line ("Trusted by teams at"), 5-8 logos, optional metric chip.
**Layouts**
- **LOGO-A Static row**: one row of 5-6 logos, container width, equal gaps, vertically centred, 24-32 px logo height, row padding 32-48 px; lead-in text 13-14 px muted, centred above.
- **LOGO-B Marquee**: infinite slow scroll (30-60 s/loop), edge fade masks 64-96 px, pause on hover, off when `prefers-reduced-motion`; allows 12-20 logos, but logos aren't individually readable: only use when quantity is the message.
- **LOGO-C Grid card**: 2x3 or 3x3 grid inside one bordered container with hairline dividers, logos in cells ~160x80 px; mobile 2 columns. Feels like "enterprise".
- **LOGO-D Proof+quote**: left 2-3 logos with a single quote and attribution, right a headline metric; use when logos alone are generic.
**Spacing** Directly under hero with 32-64 px separation; no extra heavy dividers.
**Do** Match logos to the ICP of this page; monochrome; link logos to case studies if they exist. **Don't** Include logos of customers that haven't agreed; use varied colours; show 20+ static logos.
**Copy** "Trusted by 2,000+ teams including", "Used at" or a number with context ("12,400 teams ran 3.1M reviews in 2025").
**Checks** logos 5-8 visible (static); equal heights +/-4 px; contrast of monochrome logos vs bg >= 3:1; marquee has pause + reduced-motion; alt text = company name.

### 2A.3 Problem / contrast

**Purpose** Make the pain recognisable, justify why the status quo fails, create desire for the solution.
**Slots** Section heading (sentence), 2-4 pain points or an old-vs-new comparison, optional stat with source, bridging line ("There's a better way").
**Layouts**
- **PROB-A Three pain cards**: 3 columns, each card: icon/number 24-32 px, bold pain statement (2 lines), 1-2 line elaboration; card padding 24-32 px; equal height; mobile stacked.
- **PROB-B Before/after split**: 2 columns, left "Without X" (muted, struck or desaturated, painful screenshot or mess of tools), right "With X" (accent border, clean); mid arrow or divider; works for tool-sprawl stories.
- **PROB-C Big statement + proof stat**: single column max 780 px, 32-44 px statement type, one large stat (96-160 px numeral) with a source line; generous 120-160 px padding; sets rhythm break.
- **PROB-D Chat/scenario**: a short realistic scenario (message thread, ticket, spreadsheet screenshot) illustrating the pain; right column shows the same scenario solved.
**Do** Quote customers' own words; cite stat source/date. **Don't** Fear-mongering with unsourced stats; stretch beyond 3 viewport-heights of problem before showing the product.
**Copy** Name the bad alternative people currently use (Shapiro: "what bad alternative do people use without your product?"), then the better outcome.
**Checks** contains <= 4 pain items; each stat has source; section height <= 1.5 viewports; transition into product within the next section.

### 2A.4 Product proof / how it works

**Purpose** Show the product doing the job; replace belief with observation.
**Slots** Heading, 3-4 step labels, product visuals (screens, short loops, live component), outcome line per step, CTA.
**Layouts**
- **PROOF-A Three-step row**: 3 columns, numbered 01/02/03, each with a 4:3 visual (top) and 1-sentence step text; connector line between visuals; mobile: vertical with connector at left.
- **PROOF-B Sticky scroll-story**: left column (cols 1-5) sticky with step headings and active highlight; right column (cols 6-12) swaps the product visual as each text block scrolls; each step ~70-100 vh; keep a static, non-JS fallback and a short-mobile version (visual inline under each step). Beware INP/jank and motion sensitivity.
- **PROOF-C Tabbed product tour**: tab list (3-5 tabs, 44 px high) above a single large visual panel (aspect ~16:10, rounded 12-16 px, soft shadow or 1 px border); tab change crossfade 150-250 ms, keyboard arrow-key navigation; default tab = strongest.
- **PROOF-D Interactive demo embed** (Arcade/Storylane-style or real component sandbox): fixed-aspect frame in a device-less container; "Skip tour" link; fallback video. Heavy: lazy-load below the fold, no CLS.
- **PROOF-E Output showcase (AI)**: input on left, generated output on right, with 3-4 example switchers; shows actual model outputs, not mocked polish; include an honesty line about review/limits if relevant.
**Do** Use real data; zoom into the relevant UI region; label what to look at (callouts). **Don't** Shrink a full-app screenshot to illegibility; use lorem ipsum or "John Doe"; use abstract illustrations in place of UI.
**Copy** Verb-led steps ("Connect your repo", "Review the diff", "Merge with confidence").
**Checks** each visual text legible at 1x (rendered UI text >= 12 px effective); visuals have explicit dimensions (CLS); lazy-loaded below fold; reduced-motion respected.

### 2A.5 Feature / benefit blocks

**Purpose** Each block states one value prop, handles the key objection, shows it. 3-6 blocks total; each ties to the hero's dominant promise (Shapiro).
**Slots** Block heading (benefit, blunt), paragraph (1-3 sentences), visual, optional "learn more" reveal, optional customer stat.
**Layouts**
- **FEAT-A Alternating zig-zag**: 12-col rows, text cols 1-5, visual cols 7-12, then mirrored; row gap 96-128 px; visual aspect 4:3 or 16:10; best for 3-5 deep features; mobile: always text above visual.
- **FEAT-B Bento grid**: 12-col grid with 5-7 tiles of mixed spans (e.g., 7+5, 4+4+4, 12), tile radius 20-28 px, tile padding 24-32 px, 12-24 px gaps; one hero tile (span 7 x 2 rows), others support; each tile = mini-visual + 1 line + optional 1 sentence; keep visual hierarchy: biggest tile = biggest benefit. Mobile: single column, tile order by priority.
- **FEAT-C Icon cards (3 or 6)**: 3-col grid (or 2x3), icon 24-32 px in a 40-48 px container, heading 18-20 px, text 15-16 px; flat, scannable; use for secondary feature lists, not primary proof.
- **FEAT-D Tabs/accordion with visual**: left list of features (expandable, one open), right visual follows selection; good for 5-8 features without scroll length; open first by default.
- **FEAT-E Comparison/benefit table**: rows = outcomes, columns = "Manual", "Competitor type", "Us"; check marks; 5-8 rows; sticky header row on scroll; mobile: horizontal scroll with first column sticky or stacked cards.
**Spacing** Block text max 5 columns / 45-52 ch; heading to paragraph 12-16 px.
**Do** Benefit-first headings ("Catch bugs before customers do") rather than feature names; show product in action; tie to hero promise. **Don't** More than 6 blocks; same-size 12 icon-cards wall; decorative stock imagery.
**Copy** Header = short blunt value prop with no vague words; paragraph addresses only important objections; complex feature uses expand-in-place rather than another page (Shapiro).
**Checks** blocks count 3-6; each has a visual; no heading containing only a noun from a product-feature list ("Analytics"); body text 15-18 px; alternating layout collapses to single column at <768 px.

### 2A.6 Use cases / personas

**Purpose** Let different buyers self-identify and see their story; also feeds SEO landing paths.
**Slots** Persona/role/industry label, pain, outcome, product slice, link or mini-CTA.
**Layouts**
- **USE-A Tabbed personas**: horizontal pill tabs (Marketing, Sales, Support, Engineering), content panel with headline, 3 bullets, product screenshot specific to that role.
- **USE-B Card grid**: 3-4 cards with role icon/photo, 1-line pain, 1-line outcome, "See how" link; hover lifts 2-4 px; mobile stacks.
- **USE-C Choose-your-path router**: in hero or immediately after, "I'm a ___" selector that scrolls or navigates to the tailored section/page (Shapiro: for multiple major personas, "choose your own adventure" at the top).
- **USE-D Case-study carousel by segment**: logo + outcome stat + 1-line, 3 visible, manual arrows (no autoplay).
**Do** Use role/industry words buyers use. **Don't** List 12 use cases; every persona shows same screenshot.
**Checks** persona count 3-5; each links to a distinct page or panel; tab semantics (`role=tablist`) and arrow-key support.

### 2A.7 Integrations

**Purpose** Answer "does it fit my stack" and borrow trust from familiar brands.
**Slots** Heading, logo cluster/grid, category filter, "request integration" link, API/docs link.
**Layouts**
- **INT-A Logo grid**: 4x3 / 6x2 tiles 96-120 px square, hairline borders, logos colour on hover; "+ 150 more" tile; mobile 3 columns.
- **INT-B Orbit/hub**: product logo centre, 6-10 integration logos on 1-2 rings; static SVG preferred; animate only if reduced-motion respected. Pure decoration unless it names real connections; label top 6.
- **INT-C Category tabs**: tabs (CRM, Data, Comms, Dev) over grid; search box for >30 integrations; links to docs.
- **INT-D Workflow example**: a concrete "when X in Slack, then Y here" card row (3 cards), more persuasive than logos.
**Do** Prioritise the integrations ICP actually uses; deep link to docs. **Don't** Show logos you don't support; stuff 80 logos without search.
**Checks** each logo links to integration page/doc; count shown matches actual count; alt text; logos equal optical size.

### 2A.8 Security / compliance / trust

**Purpose** Pass the IT/legal/procurement veto; for AI, address data use and model training.
**Slots** Heading, certifications (SOC 2 Type II, ISO 27001, GDPR, HIPAA where true), data handling bullets (encryption at rest/in transit, SSO/SAML, SCIM, audit logs, data residency, no training on customer data), link to Trust Center, DPA, status page, pen-test summary.
**Layouts**
- **SEC-A Badge row + 3 bullets**: compact; 4-6 badge icons (48-64 px) in a row, 3 columns of short claims; link "Visit Trust Center".
- **SEC-B Dark panel**: full-bleed dark (or inverted) band to signal gravity; left heading + body; right 2x3 grid of capabilities with icons; subtle border grid.
- **SEC-C Table of controls**: 2 columns (control / status) for enterprise pages; links to docs; downloadable security pack behind light form or none.
- **SEC-D FAQ-style security**: accordion with questions procurement actually asks (Where is data stored? Is customer data used to train models? Do you support SSO?).
**Do** State real, current certifications with dates and auditor/Trust Center link; show uptime/status page; for AI, state data retention and training policy plainly. **Don't** Use padlock-and-shield stock icons as proof; claim compliance you lack; hide behind "contact sales" for basics.
**Copy** Concrete nouns: "SOC 2 Type II, audited annually by ___", "Data encrypted with AES-256 at rest, TLS 1.2+ in transit", "Your data is never used to train models."
**Evidence** NN/g trust: upfront disclosure, link to policies, avoid gating basic information; contact info visible. [P qualitative]
**Checks** each claim has a link or date; Trust Center URL resolves; no claim without backing; badge images have alt text and are not the only content.

### 2A.9 Testimonials and case studies

**Purpose** Peer proof of outcomes; remove the "will it work for me" doubt.
**Slots** Quote (outcome-led), name, role, company + logo, photo/video, metric, link to full case study.
**Layouts**
- **TEST-A Featured quote**: single large quote (28-40 px, max 20 words highlighted), portrait 56-96 px left or right, logo, metric chip beneath; section padding generous. Highest credibility per pixel.
- **TEST-B Three-card row**: 3 equal cards, quote 16-18 px, attribution with avatar 40 px, logo; card padding 24-32 px; mobile horizontal snap-scroll with a visible peek of the next card.
- **TEST-C Masonry wall of love**: 3-4 columns of varying-height cards (tweets/reviews), 16 px gaps; limit initial render to 9-12 + "Show more" (performance); good for consumer/dev-tool love; weaker for enterprise.
- **TEST-D Case-study cards with metrics**: card = customer logo + big metric (48-64 px: "-43% support time") + 1-line description + "Read story →"; 3 cards. Best B2B enterprise proof.
- **TEST-E Video testimonials**: poster + play (lightbox), 3 up; captions mandatory; 30-60 s clips.
**Do** Lead with the outcome and baseline; use real names/photos; mix roles (user, buyer, exec); show rating with count + source. **Don't** Anonymous "– Happy customer"; all 5.0 ratings; testimonials praising generic things ("great tool!").
**Evidence** Spiegel: volume saturates after ~5; peak star 4.0-4.7; NN/g: third-party reviews trusted more than on-site testimonials, so link to G2/Capterra. Wynter-run: unexplained stats challenged first (add baseline, asset, period, sample). A "+34%" lift from adding testimonials is [U] (vendor claim, no test).
**Checks** each has name+role+company; 3-6 quotes visible; metric has baseline; if carousel, no autoplay; avatars have alt; text contrast >= 4.5:1.

### 2A.10 Metrics band

**Purpose** Compress credibility to 3-4 numbers.
**Layouts**
- **MET-A Four-up**: 4 columns, number 48-72 px tabular-nums, label 14-16 px, optional source footnote; dividers 1 px; mobile 2x2.
- **MET-B Inline in hero/logo bar**: 2-3 numbers beside logos.
- **MET-C Big single stat**: one 120-200 px number + sentence (see PROB-C).
**Do** Use tabular figures; animate count-up only once and respect reduced-motion; source and date each number. **Don't** Invent round numbers; mix incomparable units.
**Checks** `font-variant-numeric: tabular-nums`; each number has footnote/source; <= 4 numbers.

### 2A.11 Pricing (full page and on-home teaser)

**Purpose** Make cost model legible, anchor value, route self-serve vs sales. See `funnels-and-conversion.md` section "Pricing page" for mechanics and evidence.
**Slots** Billing toggle, 3 (sometimes 4) plan cards + enterprise, price, "for who" line, 4-8 differentiating features, CTA per plan, feature-comparison table, FAQ, guarantee, logos.
**Layouts**
- **PRICE-A Three cards + highlighted middle**: 3 equal cards (max 1100-1200 px container, 24 px gap); middle card elevated (border in accent, "Most popular" chip, slightly taller by 8-16 px, filled CTA vs outline CTAs on others); price 40-56 px, period 14-16 px muted; feature list 5-8 ticks.
- **PRICE-B Three cards + enterprise strip**: PRICE-A with a full-width enterprise bar below (custom pricing, SSO, SLAs, "Talk to sales"), keeps "Contact" out of the main decision.
- **PRICE-C Single slider / calculator**: usage input (seats, volume) with live price; one primary CTA; show formula ("$X per seat + $Y per 1k"); best for usage-based; include a "what you'll pay at 3 sizes" preset row.
- **PRICE-D Comparison table first**: long table with sticky plan header (name+price+CTA), grouped rows (collapsible), checkmarks/values; used for complex enterprise suites; mobile = plan picker + single-column value list.
- **PRICE-E Good-better-best with anchor**: highest-priced plan first/left or visually first, to anchor (evidence weak, see funnels file).
**Spacing** Cards equal height, CTA aligned on one baseline across cards (flex column, CTA pinned bottom); toggle centred above, 32-48 px above cards.
**Do** Plain plan names; "for whom" under each; show annual price per month with "billed annually" and savings badge; default toggle should match what you want to learn from (see funnels file). **Don't** Hide the price entirely for self-serve products; 5+ columns; identical emphasis on every plan.
**Checks** exactly one plan emphasised; CTA label per plan; prices use tabular nums; toggle changes both price and period text; table header sticky; no price-less plan except labelled Enterprise.

### 2A.12 FAQ

**Purpose** Answer last objections; capture long-tail queries; reduce sales/support load.
**Slots** 6-10 questions chosen from sales calls and support, answers 1-4 sentences, "Still stuck? Talk to us".
**Layouts**
- **FAQ-A Single-column accordion**: max width 720-800 px, rows 56-72 px closed, hairline dividers, plus/chevron icon right, first item open by default; one-open-at-a-time optional; answer text 16 px.
- **FAQ-B Two-column**: left heading + contact CTA (sticky), right accordion.
- **FAQ-C Grouped tabs**: categories (Pricing, Security, Setup) for >10 questions.
- **FAQ-D Open Q&A grid**: all answers visible in 2 columns (best for SEO/no-JS and short answers).
**Do** Put real objections ("Does it work with X?", "What happens to my data?", "Can I cancel?"); mark up with FAQPage JSON-LD only if content is visible; keyboard accessible (`button`, `aria-expanded`). **Don't** Use FAQ to hide key pricing info; marketing fluff questions.
**Checks** 6-10 items; accordion buttons are `<button aria-expanded aria-controls>`; answers in DOM (not lazy-fetched) for crawlers; question text 16-20 px.

### 2A.13 Final CTA

**Purpose** Catch the convinced scroller; restate the offer; reduce risk.
**Slots** Heading (restates the outcome), 1 sentence, primary CTA, secondary CTA, friction reducer, optional proof snippet.
**Layouts**
- **CTA-A Contrast band**: full-bleed band in brand/dark colour, centred text, one button inverted for contrast; padding 96-128 px desktop, 64-80 px mobile.
- **CTA-B Card inside container**: rounded 24-32 px card with subtle gradient/pattern, left text + right CTA group.
- **CTA-C Split with form**: left proposition, right inline email field + button (input-group); for newsletter/trial.
- **CTA-D Minimal line**: one heading + button, no decoration; for low-key brands.
**Do** Same CTA label as hero; add risk reducer; include a short reassurance (no card, cancel anytime) if true. **Don't** Introduce a new offer; more than 2 buttons.
**Checks** primary label equals hero primary label; distance from last content section 64-128 px; contrast >= 4.5:1 for label on band.

### 2A.14 Footer (see 2.4)

**Layouts**
- **FOOT-A Multi-column**: 5-6 col grid, brand column 2 spans, link columns 1 span each; bottom bar with legal.
- **FOOT-B Compact**: single row of links + logo, for campaign/microsite.
- **FOOT-C Mega footer + CTA/newsletter band**: includes sitemap depth for SEO; badge row (SOC 2, G2).
**Checks** presence of Privacy, Terms, Contact; link density 20-40 links max; text >= 14 px; contrast >= 4.5:1; all links valid.

## 3. Numbers & scales

| Quantity | Value | Grade/source |
|---|---|---|
| Average page visit | slightly under 60 s | [P] NN/g |
| Share of text read in a visit | ~25% | [P] NN/g |
| Critical decision window | first 10 s; leave-rate drops after ~30 s | [P] NN/g |
| Attention above the fold (2018, 1920x1080) | 57% (2010: 80%) | [P] NN/g |
| Attention in first 2 screenfuls (to 2160 px) | 74% (second screenful ~17%) | [P] NN/g |
| Attention in first 3 screenfuls | 81% | [P] NN/g |
| Attention in top 20% / 40% of page length | >42% / >65% | [P] NN/g |
| F-pattern sample | 232 users, thousands of pages | [P] NN/g |
| Visible vs hidden nav usage (desktop) | 48% / 27% (combo 50%) | [P] NN/g |
| Visible vs hidden nav usage (mobile) | 57% hidden / 86% combo | [P] NN/g |
| Hidden nav task-time penalty | >=39% desktop, 15% mobile; discoverability -20%+ | [P] NN/g |
| Mega-menu hover delay | ~0.5 s open, ~0.1 s show; 0.5 s close grace | [P] NN/g |
| Carousel auto-rotate | 5-7 s; up to 10 s text-heavy; none on mobile | [P] Baymard |
| Carousels with usability issues | 46% of ecommerce implementations | [P] Baymard |
| SaaS landing page median conversion | 3.8% (all industries 6.6%); top-quartile floor ~11.4% | [P/V] Unbounce 2024 |
| Copy reading level effect | grade 5-7 = 12.9% vs professional 2.1% | [P/V] Unbounce |
| Best word count | 250-725 words | [P/V] Unbounce |
| SaaS visit share on mobile | 79% | [P/V] Unbounce |
| Conversion by channel (SaaS median) | email 16.9%, Google search 5.1%, Instagram 9.2%, Facebook 3.5%, Bing 1.9%, display 0.3% | [P/V] Unbounce |
| Checkout form fields | avg 11.3 (2024); ~8 sufficient; 17% abandon for complexity; 5.1 steps | [P] Baymard |
| Name field: full name typed in First | 42% | [P] Baymard |
| Address line 2 stalls | 30% | [P] Baymard |
| LCP / INP / CLS good | <=2.5 s / <=200 ms / <=0.1 at p75 | [P] web.dev |
| Speed to B2B conversion | 1 s ~40%, 2 s 34%, 3 s 29%; 1 s = 3x 5 s | [P] Portent |
| Speed (Deloitte/Google) | 0.1 s = +8.4% retail, +10.1% travel conv | [P] web.dev |
| Vodafone | LCP -31% = +8% sales | [P] web.dev |
| Mobile abandon > 3 s | 53% | [S] Google 2016 |
| Reviews effect | 5 reviews = +270% purchase likelihood; 4.0-4.7 optimal | [P] Spiegel |
| Nav removal | TOFU 0-4%, MOFU +16%/+28%; Yuppiechef 3% to 6% | [V] HubSpot / Wingify |
| Video on landing page | 6.5% to 11% embedded; 13% lightbox (Vidyard test) | [V]/[S] |
| Form fields | 11 to 4 = +120% (Imagescape 2007-8); -3 fields = -14% (Aagaard); relabel +19.2% | [V]/[S] |
| Phone field penalty | 19% to 13% | [S] HubSpot 40k-page analysis |

Layout scale [E]: container 1200-1280; gutters 24-32 / 16-20; section padding 96-144 / 56-80; hero H1 clamp(2.25rem, 5vw+1rem, 4rem); H2 clamp(1.75rem, 3vw+1rem, 2.75rem); body 16-18 px; line-height H1 1.05-1.15, body 1.5-1.65; measure 45-75 ch; CTA height 44/48/56; card radius 12-24 px.

## 4. Dos and Don'ts

| Do (good) | Don't (bad) | Why |
|---|---|---|
| H1 "Review pull requests in minutes, not hours" + subhead naming the mechanism + product UI right | H1 "Reimagine the future of work" + gradient blob | Slogan fails 10-second test; abstract art isn't proof |
| Hero product slab cropped at fold so next section's top shows | 100vh hero with hard colour edge and nothing below | False floor / illusion of completeness |
| One filled CTA + one text link, same label repeated | Three filled buttons ("Start", "Demo", "Contact") in hero | Choice overload |
| Logos monochrome, 6 in a row, matched to ICP | 24 coloured logos of varied sizes | Dilution; reads as noise |
| Testimonial: "Cut onboarding from 14 to 5 days" - Name, VP Ops, Company + photo | "Great product!" - Anonymous | No outcome, no accountability |
| Pricing with one emphasised plan, enterprise strip below | Four equal cards, "Contact us" on the one most want | Decoy/anchor lost, friction at most-wanted tier |
| Mobile: sticky bottom CTA appearing after hero CTA leaves | Tiny inline CTA only, header hamburger without CTA | CTA unreachable after scroll |
| Hero video behind poster, click-to-play lightbox | Autoplay background video as LCP | LCP/CLS and attention cost |
| Label above field + helper text; validate on blur | Placeholder-only labels | Placeholders get skipped, vanish |
| Footer with Privacy, Terms, Security, Status, Contact | Footer of only social icons | Missing trust links |

## 5. Exceptions & judgement calls

- **Fold rules vs brand-campaign pages.** Brand-led heroes (Apple-style) can withstand not stating the product in words because the brand is known. For unknown brands the 10-second rule wins. [E]
- **Nav on or off.** HubSpot and Yuppiechef data support removing nav on committed-traffic pages, but the evergreen homepage needs nav for self-directed research (visible nav is used 48-50% vs 27% hidden). Choose per page role. [V]/[P]
- **Shorter vs longer.** Short wins for low-commitment, long wins for high-commitment. But the NN/g attention curve means long pages should front-load the strongest argument and make later sections skimmable. CXpartners (secondary) reported less above-fold content encouraged below-fold looking, i.e. whitespace and peek cues beat packed heroes. [S]
- **Perfect reviews.** Spiegel's finding that 5.0 underperforms 4.0-4.7 is retail; for B2B some buyers expect 4.5+. Show the count and the source. [P/E]
- **Monthly/annual toggle default.** Evidence conflicts (see funnels file): annual default raises annual mix but may lower overall conversion; decide on revenue per visitor and retention, not click-through.
- **Interactive heroes** have the best "show don't tell" but risk LCP/INP and empty-state failure. Ship with a pre-filled example and a static fallback. [E]
- **Sticky scroll storytelling** (PROOF-B) is attention-grabbing but increases INP risk, fails with reduced-motion, and needs a mobile alternative. Use only where the narrative genuinely needs sequencing. [E]
- **Dark mode / dark bands** can signal gravity (security) or developer affinity; verify contrast on every token. [E]
- **AI SaaS specifics** [E]: buyers' top fears are data use, accuracy and cost surprise; put a "how your data is handled" line near the hero CTA or in the trust strip, show real outputs, and show pricing units (tokens/credits/seats) in plain terms. Userpilot lists AI/ML tools at the highest average activation (54.8%), implying fast time-to-value matters: let people try before signup where possible (HERO-C).

## 6. Figures worth keeping

No page images (web sources). Capture these as `examples/` references when building the library (screenshots at 1440 and 390, from live sites):
- NN/g scrolling-attention heatmap/graph (https://www.nngroup.com/articles/scrolling-and-attention/): attention vs page depth.
- NN/g hidden-vs-visible navigation figures (https://www.nngroup.com/articles/hamburger-menus/).
- Baymard checkout field-count benchmark chart (https://baymard.com/blog/checkout-flow-average-form-fields).
- Portent load-time vs conversion curves (https://www.portent.com/blog/analytics/research-site-speed-hurting-everyone.htm).
- web.dev Vitals business-impact table (https://web.dev/case-studies/vitals-business-impact).
- Live references to screenshot for pattern IDs (not fetched, from [E] knowledge, verify before use): Stripe, Linear, Vercel, Notion, Ramp, Attio, Intercom (HERO-A/B), Perplexity/ChatGPT-style prompt boxes (HERO-C), Anthropic/OpenAI research pages (HERO-D), HubSpot/Unbounce campaign pages (HERO-E).

## 7. Open questions

- **Not verified against originals** (search returned summaries; sites 403/404'd): NN/g carousel/banner-blindness articles, NN/g pricing guidelines, NN/g B2B usability report (cited only via cio.de/secondary), Unbounce first-person CTA article, CXL reduce-form-fields and CXL testimonial tests, Google "53% >3 s" PDF, Imagescape 11-to-4 report, Aagaard test posts, Performable raw data, HubSpot 40k-form analysis, GoodUI effect sizes (paywalled; page showed only 141 patterns / 644 tests / 169 winners / 43 losers).
- **Unverified claims to avoid:** comScore ~70% from logos; 34% lift from testimonials; "CXL 1,200 landing pages +34% for case studies"; first-person CTA 90% (conflicting attribution and a -25% counter result); "77% referral conversion" for Harry's (actually a share of signups, one source); "80% from explainer video" (generic claim; best documented is Vidyard 69-100% in one vendor test); "Dropbox +10% from video" (blogs only).
- **Unbounce SaaS numbers**: dataset gated; the mobile 6.4% vs desktop 6.2% and word-count claims are summarised; confirm in the full report before citing in a client deliverable.
- **Baymard abandonment reasons**: 2024 figures (extra costs 48%, forced account creation 26%, security distrust 25%) come via Statista; a 2025 secondary article gives different splits (39%/19%/19%). Years differ; use the Baymard page for current values.
- **Wynter**: only AI-persona "grader" runs were found; no human-panel study was located. Do not cite as human buyer research.
- **Missing sources**: Lenny's Newsletter / Reforge / OpenView teardown articles on homepage anatomy were not retrievable via the tools used; Harry Dry's published homepage rules were not found beyond the paid teardown listing. Revisit with direct fetches or manual reading.
- **Layout geometry in 2A is an [E] synthesis** of common patterns, not measured from these sources. Validate by measuring live reference sites with the render tooling before treating dimensions as canon.
