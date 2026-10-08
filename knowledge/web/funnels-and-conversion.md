---
source: web:baymard.com/blog/checkout-flow-average-form-fields + unbounce.com/conversion-benchmark-report/saas-conversion-rate + userpilot.com (activation benchmarks) + on24.com (webinar benchmarks) + prefinery.com/viral-loops/tim.blog (Harry's Prelaunchr) + web.dev/case-studies + portent.com + blog.hubspot.com + wingify.com + spiegel.medill.northwestern.edu + Ariely decoy (Predictably Irrational via secondary) + First Page Sage / OpenView / ChartMogul trial benchmarks (via secondary) + nngroup.com/articles/trustworthy-design
chapter: Funnels, pricing mechanics, and the conversion evidence ledger
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [funnel, lead-gen, demo-request, webinar, waitlist, checkout, onboarding, pricing, trial, forms, ab-testing, social-proof, speed]
status: studied
---

# Funnels, pricing mechanics and the conversion evidence ledger

Companion to `landing-page-anatomy.md` (section library, hero, nav, CTA, social proof rules). Same evidence grades:

**[P]** primary study with method, **[V]** vendor/practitioner test (self-reported), **[S]** secondary/not verified at source, **[U]** unverified or contradicted (do not cite), **[E]** engine note (own judgement/standard).

## 1. Core ideas

1. **Every funnel page has one job and one next step.** Landing page -> offer capture -> confirmation -> next best action. A page that tries two jobs loses on both (Shapiro: stick to the template; deviation confuses). HubSpot's nav test: the more committed the traffic (MOFU), the bigger the gain from removing exits (+16%, +28% vs 0-4% on TOFU). [V]
2. **Match the funnel's friction to the commitment asked.** Newsletter/waitlist: 1 field. Content download: 2-3. Demo: 3-5 and ideally instant scheduling. Checkout: Baymard says ~8 fields suffice (average 11.3). [P]
3. **Payment-stage failure is mostly about surprise and trust, not UI polish.** Baymard-sourced reasons (2024, via Statista): extra costs 48%, forced account creation 26%, distrust with card info 25%; 17% abandon because checkout is too complex. A 2025 secondary article shows 39% / 19% / 19%. Direction stable: show total cost early, offer guest checkout, display trust cues. [P/S]
4. **Speed to lead is part of the funnel.** HBR 2011 audit of 2,241 firms: average first response 42 hours; contacting within 1 hour made decision-maker conversations ~7x likelier. The popular "5 minutes" multipliers (100x connect, 21x qualify) come from the 2007 MIT/InsideSales study, not HBR. Instant scheduling (Chili Piper et al.) claims 2-3x more qualified meetings, vendor-reported only. [P (HBR), V (Chili Piper)]
5. **Free-trial mechanics change the number more than the design does.** Card-required (opt-out) trials convert far better trial-to-paid than no-card (opt-in) trials across sources (First Page Sage: 48.8% vs 18.2%; Visionary Marketing: 60.4% vs 25.2%; Adapty in-app: 31.4% vs 8.9%) but produce fewer signups. Judge by revenue per visitor, not signup rate. [S/V]
6. **Activation is the funnel's real bottom.** Userpilot 2025: average SaaS activation 37.5% (AI/ML tools 54.8%, FinTech 5%); checklist completion mean 19.2% (median ~10%); product-tour median completion 15%; average time-to-value ~1 day 12 hours. Short time-to-value and progressive profiling beat long setup. [V/S, vendor data]
7. **Pre-launch funnels are two pages and a mechanism.** Harry's Prelaunchr: page 1 captured email (also the referral identifier); page 2 gave a unique share link plus email/Facebook/Twitter buttons and a milestone tracker with 4 prize tiers; ~100,000 emails in one week. The oft-quoted 77% is a share of signups attributed to referrals (one source), not a referral conversion rate. [S]
8. **Most test lifts you read are overstated.** Typical sources omit sample size, duration or significance (Yuppiechef, Performable, Highrise ~4000 views). Treat as hypothesis generators; GoodUI's own database reports 644 tests with 169 winners and 43 losers, i.e. most tests are flat. [P/V]

## 2. Rules

### 2.1 Funnel structure (all funnels)

- **RULE** Define for every funnel page: the single conversion event, the single primary CTA, the entry sources, the message-match line from the ad/link, and the next page.
  **Why** One job per page; message mismatch is a bounce cause. **Applies to** funnels. **Check** page spec lists exactly one event and one primary CTA; H1 shares key noun/verb with the ad/link copy (string overlap >= 50% of H1 content words). **Source** [V] julian.com; [E].
- **RULE** Dedicated paid-traffic pages: no global nav, no footer link maze; keep logo (non-linking or home), privacy, terms. Organic/evergreen pages keep nav.
  **Why** HubSpot nav-removal test: TOFU +0-4%, MOFU +16%/+28%; Yuppiechef signup page 3% to 6% (no sample size). **Applies to** lead-gen, webinar, waitlist. **Check** external/outbound link count in funnel page <= 3. **Source** [V] HubSpot, Wingify.
- **RULE** Thank-you/confirmation page is part of the funnel: restate what happens next with a time ("Check your inbox, link valid 24 h"), offer exactly one next action (book call, watch 2-min tour, share), and fire conversion tracking once.
  **Why** Highest-intent moment; the share/referral mechanism of Prelaunchr lived on the second page. **Applies to** lead-gen, waitlist, webinar. **Check** confirmation page exists; has <= 1 primary next CTA; no raw "Thank you" only. **Source** [S] Harry's; [E].
- **RULE** Preserve the visitor's input across steps and on error; autosave multi-step forms; allow back navigation.
  **Why** Losing input is a top abandonment trigger; multi-step guidance (design systems, Baymard inline validation). **Applies to** forms. **Check** back button restores values; error response retains fields. **Source** [S]; [P] Baymard inline validation.

### 2.2 Lead-gen / content-offer landing page

- **RULE** Two-column offer layout: left = benefits (3 bullets, outcome-first) + a visual of the asset (cover/preview); right = form card with 1-3 fields (email first). Mobile: headline, bullets (<= 3), then the form immediately; asset preview below.
  **Why** 250-725 words best (Unbounce); form must stay near the top on mobile since 79% of SaaS landing visits are mobile. **Applies to** lead-gen. **Check** form top edge y < viewport height at 390x844; word count 150-500 on pure lead-gen. **Source** [P/V] Unbounce; [E] layout.
- **RULE** Request only email (+ name if needed) for ungated-value content; use progressive profiling for the rest. Phone number only if sales will actually call.
  **Why** HubSpot 40k-page analysis (via secondary): phone-number field dropped conversion 19% to 13%; Imagescape 11 to 4 fields = +120% (2007-8). Counter: removing the wrong fields lost 14% (Aagaard), and relabeling won +19.2%. **Applies to** forms. **Check** field count <= 3 for content; no phone unless justified in spec. **Source** [S]/[V] as cited.
- **RULE** Preview the asset (3-5 page thumbnails, table of contents, a sample page) and state length/time ("12 pages, 8-minute read").
  **Why** Removes uncertainty about what is behind the gate; NN/g trust: avoid gating without showing value. **Applies to** lead-gen. **Check** asset preview image present; length/time text present. **Source** [P] NN/g trust.
- **RULE** Under the submit button, state what happens and privacy: "We'll email the PDF. No spam, unsubscribe anytime."
  **Why** Disclosure of data use builds trust. **Applies to** forms. **Check** microcopy within 24 px of submit. **Source** [P] NN/g trust.

### 2.3 Demo request / contact sales

- **RULE** Form: work email, name, company; add company size/role only if routing needs them. Show the next step on the same page ("A product specialist replies within 1 business day" or instant calendar). Prefer instant scheduling after submit for qualified leads.
  **Why** Response speed drives outcomes: HBR 2011 (1 hour = ~7x more likely to reach decision makers); vendor claims 2-3x more meetings with instant booking. **Applies to** demo. **Check** post-submit state shows calendar or explicit SLA; response SLA stated; routing rules documented. **Source** [P] HBR (via secondary); [V] Chili Piper.
- **RULE** Put proof beside the form: one named quote (outcome) + 4-6 logos + a short "what happens in the demo" list (3 bullets, 20-30 minutes). Add a secondary "Prefer to try it? Start free" path if self-serve exists.
  **Why** Reduces fear of a sales ambush; offers an alternative for the self-serve buyer. **Applies to** demo. **Check** right or left rail has quote + logos; bullets <= 3. **Source** [E] with NN/g trust principle.
- **RULE** Layout geometry: desktop 2 columns (cols 1-6 proposition and proof, cols 7-12 form card, 32-40 px padding, field height 48 px, 16 px between fields); mobile: H1, 2-3 bullets, form, then proof.
  **Why** Keeps form in the first viewport on mobile. **Applies to** demo. **Check** at 390x844 first form field visible without scrolling or within one swipe. **Source** [E].

### 2.4 Webinar / event registration

- **RULE** Registration page contains: title that states the outcome, date/time with timezone auto-detected and a "add to calendar" link, speakers (photo, role, company), 3-5 learning bullets, one form (name, work email; company optional), and a replay line ("can't make it live? register for the recording").
  **Why** ON24 2024 data: ~57% of B2B registrations become attendees; 56% watched live, ~45% on-demand (overlap); other panels report 38% (Visionary Marketing, 412 webinars) to ~60% (ON24 2026 via secondary), so the replay line captures a large share of value. Landing-page conversion benchmarks in the 35-45% range are blog-level [U]. **Applies to** webinar. **Check** page has date+tz, speakers, bullets, form, replay mention. **Source** [P] ON24 2024 (via marketingprofs summary); [S] others.
- **RULE** Reminder cadence is part of the design: confirmation email with calendar file immediately, reminders 24 h and 1 h before, "starting now" at T-0, replay email same day.
  **Why** Attendance is the biggest drop-off after registration; definitions vary by vendor, so track live-attendee uniques and replay viewers separately. **Applies to** webinar. **Check** email sequence exists; calendar `.ics` link present. **Source** [S] ON24 definitions; [E].
- **RULE** Live-event page after registration swaps to a "You're in" state with the join link, countdown, and add-to-calendar; never a dead end.
  **Why** Confirmation as funnel step. **Applies to** webinar. **Check** confirmation shows date, link, calendar. **Source** [E].

### 2.5 Waitlist / pre-launch

- **RULE** Page 1: one-sentence promise, one email field + button, proof of demand ("14,200 on the list") if true, a visual of the product or its teaser. Page 2 (post-submit): unique referral link + copy button + share buttons + milestone tracker with 3-4 rewards + position in line.
  **Why** Harry's Prelaunchr structure; ~100,000 emails in a week; referral programs commonly provide 10-40% of waitlist signups (GrowSurf), while 77% referral share is [U] single-source. **Applies to** waitlist. **Check** post-submit view contains unique link, share controls, progress tracker. **Source** [S] Prefinery/Viral Loops/Tim Ferriss; GrowSurf [S].
- **RULE** Be honest about scarcity and dates: state launch window and what the user gets for joining; avoid fake countdowns.
  **Why** Trust. **Applies to** waitlist. **Check** `visual` + no countdown without a real date. **Source** [P] NN/g trust (qualitative); [E].
- **RULE** For AI/product waitlists, add a single qualifying question after email (role or use case) as a second step, not on step one.
  **Why** Keeps step one 1 field; gives segmentation data. **Applies to** waitlist. **Check** field count on step 1 = 1. **Source** [E].

### 2.6 Free trial / signup

- **RULE** Signup form: email (or SSO buttons: Google/Microsoft/GitHub) and password at most; defer name/company/role to in-product progressive profiling. Offer "Skip for now" on optional steps.
  **Why** Userpilot guidance: minimal signup requires email and password; collect rest progressively; activation average is 37.5%. **Applies to** trial. **Check** fields on signup page <= 3 plus SSO; optional steps have skip. **Source** [V/S] Userpilot.
- **RULE** Decide card-required vs no-card as a business trade-off, and state it in the CTA microcopy (e.g. "No credit card required" or "Cancel any time before day 14").
  **Why** Card-required trials show 2.5-3.5x higher trial-to-paid across sources but fewer signups; removing card can bring 3-5x more registrations at similar net revenue (one low-confidence source). OpenView 2023 (via Boldstart): website-to-signup 5% for free trials, 9% for freemium. **Applies to** trial. **Check** CTA microcopy states card policy. **Source** [S] First Page Sage, Visionary Marketing, Adapty, OpenView via Boldstart.
- **RULE** Show the trial length and what's included on the signup screen; show a minimal progress indicator if multi-step.
  **Why** Disclosure and reduced anxiety. **Applies to** trial. **Check** text "14-day"/equivalent present. **Source** [P] NN/g trust principle; [E].

### 2.7 Onboarding (after signup)

- **RULE** First screen after signup leads to the first valuable action in <= 3 steps (sample data, one-click import, template, prompt). Aim time-to-first-value in minutes, not days.
  **Why** Average TTV ~1d 12h (Userpilot); AI/ML products show higher activation (54.8%), which suggests immediate value moves activation. **Applies to** product onboarding. **Check** count clicks from signup to first core action <= 3; time measured in analytics. **Source** [V/S] Userpilot.
- **RULE** Checklist: 3-5 items, first item pre-completed ("Account created"), each item deep-links to the action, progress ring visible, dismissible and recoverable.
  **Why** Mean checklist completion is just 19.2% (median ~10%), so make it short and actionable; the pre-completed first item exploits goal-gradient [E]. **Applies to** SaaS app. **Check** item count 3-5; each has link; dismiss persists. **Source** [V/S] Userpilot; [E].
- **RULE** Empty states teach: illustration or sample data, one primary action, and a "see example" link. Never an empty table with a lonely "No data".
  **Why** Empty state is the highest-risk screen in a new account. **Applies to** SaaS app. **Check** each empty view has CTA and example. **Source** [E].
- **RULE** Product tours: max 3-5 steps, skippable, anchored to real UI, launched on user intent not on load.
  **Why** Median tour completion is 15% (Userpilot); long tours are skipped. **Applies to** SaaS app. **Check** tour steps <= 5; Skip control on every step. **Source** [V/S] Userpilot.

### 2.8 Checkout and payment

- **RULE** Total cost (taxes, shipping, fees) visible before the payment step; no surprise line items at the end.
  **Why** Extra costs is the top abandonment reason (48% in Baymard 2024 via Statista; 39% in the 2025 secondary version). **Applies to** checkout. **Check** order summary shows total with all fees on first checkout screen. **Source** [P] Baymard (via Statista) [S].
- **RULE** Guest checkout / delay account creation until after order; collect password after payment ("Save your details?").
  **Why** Forced account creation caused abandonment for 26% (2024) / 19% (2025); 84% of benchmarked sites do not delay account creation. **Applies to** checkout. **Check** purchase possible without account. **Source** [P] Baymard.
- **RULE** Minimal fields: single Full name, hide Address line 2 and coupon behind links, billing = shipping by default, autofill attributes (`autocomplete="name|email|cc-number|cc-exp|cc-csc"`), numeric keyboards (`inputmode`) on mobile, expiry formatted like the card (MM / YY).
  **Why** Baymard: ~8 fields suffice (avg 11.3); 42% type full name in First; 30% stall at Address 2; 72% of sites mishandle the expiry field; 17% abandon for complexity. **Applies to** checkout. **Check** field count <= 8-10; `autocomplete` set on every field; `inputmode` numeric on card fields. **Source** [P] Baymard.
- **RULE** Show trust at the payment field, not as decoration: accepted payment logos, "Secure checkout" with a plain-language line (what's encrypted), refund/guarantee link, support contact, order summary persistent (sticky on desktop, collapsible on mobile).
  **Why** Distrust of card handling is a leading abandonment reason (25% in 2024 data); NN/g: upfront costs, policies and contact build trust. **Applies to** checkout. **Check** guarantee and contact link within the payment step; summary visible. **Source** [P] NN/g; Baymard via Statista [S].
- **RULE** One column, single page or 3-5 steps with a visible progress indicator; mobile uses wallet buttons (Apple Pay/Google Pay) at top.
  **Why** Average checkout is 5.1 steps and fields matter more than step count; steps beyond ~8 hurt. **Applies to** checkout. **Check** step count <= 5-6; wallet button present on mobile. **Source** [P] Baymard; [E] wallet.

### 2.9 Pricing page (mechanics and evidence)

- **RULE** 3 public tiers (sometimes 4) plus an enterprise/custom option is the modal pattern. Fewer than 3 gives no anchor; more than 4 raises decision load. Reported ranges: 64% of enterprise SaaS use three published tiers, 18% two, 13% four, 5% five+ (vendor panel of 1,200 pages); an industry average of 3.2 public tiers plus custom appears in another vendor report. Cutting from 5+ tiers to 3-4 is credited with +15-25% conversion (Price Intelligently, unlinked).
  **Why** Decision load, anchoring. **Applies to** pricing. **Check** tier cards 3-4 + enterprise; one emphasised. **Source** [S] vendor panels; [U] for the +15-25%.
- **RULE** Emphasise one plan (border, "Most popular" label, filled CTA; others outline). Name who it is for under each plan name.
  **Why** Decoy/asymmetric dominance: Ariely's Economist example (web $59 / print $125 / web+print $125): with the dominated print option 16% / 0% / 84%; without it 68% / 32%, so the decoy shifted most buyers to the bundle (small student sample, popular-book source). "Most popular" highlight lifts of 16-30% are attributed to ProfitWell with no linked test [U]. **Applies to** pricing. **Check** exactly one emphasised plan; CTA hierarchy. **Source** [S] Ariely via secondary.
- **RULE** Monthly/annual toggle: show annual as per-month price with "billed annually" and a savings figure; choose the default deliberately and measure revenue per visitor and retention, not only conversion.
  **Why** Evidence conflicts: Baremetrics-attributed +20-30% annual plan adoption from annual default [S]; a 2026 vendor benchmark reports annual default +27% annual signups but -6% overall conversion [S, unverified method]; practitioners report annual-selection lifts offset by lower retention (23% lower annual cohorts) or monthly-driven churn. Sticker shock if monthly looks like a penalty (Chargebee). **Applies to** pricing. **Check** toggle updates price + period + savings text; analytics tracks RPV and 90-day retention by default state. **Source** [S]/[U] as cited.
- **RULE** Enterprise tier: show "Custom" with 4-6 enterprise-only capabilities (SSO/SAML, SCIM, audit logs, SLA, dedicated support, data residency) and a "Talk to sales" CTA; list a starting-price hint or "from" if possible.
  **Why** NN/g B2B research: prospects want representative prices for early research; B2B sites often show no prices or overly complex structures. **Applies to** pricing. **Check** enterprise card exists with capability list. **Source** [S] NN/g via secondary (B2B study, 55 business users, ~200 sites).
- **RULE** Below the cards: feature-comparison table (grouped, collapsible), FAQ (billing, refunds, switching, data), social proof near the plans, and a guarantee line.
  **Why** Pricing pages are where objections concentrate (security, cancellation, hidden costs). **Applies to** pricing. **Check** presence of table, FAQ, guarantee. **Source** [E] with NN/g trust principles.

### 2.10 Experiment hygiene (evidence ledger discipline)

- **RULE** Change one variable per test; pre-register the primary metric (revenue per visitor or downstream activation beats click-through); run at least two full business cycles (1-2 weeks min, 2-4 typical) and until the pre-computed sample is reached; do not peek and stop.
  **Why** Many published lifts omit sample sizes; the Highrise headline test stopped moving after ~3000 of ~4000 views; false positives from peeking. **Applies to** all. **Check** test brief states metric, MDE, sample size, duration. **Source** [V] 37signals; [E] methodology.
- **RULE** Measure the full funnel, not the step: a lift in trial signups with a drop in annual selection and revenue per visitor (-18%) is a loss.
  **Why** Practitioner reports of trial +31% with annual selection -52%. **Applies to** pricing/signup. **Check** guardrail metrics (RPV, activation, 90-day retention) defined. **Source** [S].
- **RULE** Low traffic (<~10k sessions/month on the page): test bold, big changes (offer, headline, layout) and qualitative methods (5-second tests, message testing) instead of colour/microcopy.
  **Why** Statistical power; button-colour tests rarely reach significance and the Performable result was confounded by contrast. **Applies to** all. **Check** n/a. **Source** [E]; [V] Performable critique.

## 3. Numbers & scales

### 3.1 Benchmark ledger (use as priors, not promises)

| Metric | Value | Grade | Source |
|---|---|---|---|
| SaaS landing page median conversion | 3.8% (all industries 6.6%); top-quartile floor ~11.4% | P/V | Unbounce 2024 |
| SaaS by channel (median) | email 16.9%, Google search ads 5.1%, paid search 4.1%, paid social 2.9%, Instagram 9.2%, Facebook 3.5%, Bing 1.9%, display 0.3% | P/V | Unbounce |
| Website visitor to signup | free trial 5%, freemium 9% | S | OpenView 2023 via Boldstart |
| Free trial conv. (opt-in, no card) | 18.2% (FPS), 25.2% (Visionary), 8.9% (Adapty in-app) | S/V | secondary |
| Free trial conv. (opt-out, card) | 48.8% (FPS), 60.4% (Visionary), 31.4% (Adapty) | S/V | secondary |
| Trial-to-paid, B2B median | ~8% in one 200-product analysis (bimodal: ~20% of products <2.5%, ~23% >25%); other sources 14.7-15% | S | Userpilot, glossaries |
| Freemium conversion | self-serve 3-5% (top 6-8%); sales-assisted 5-7% (top 10-15%) | S | CrazyEgg citing Poyar |
| Activation | avg 37.5%; AI/ML 54.8%; FinTech 5% | V | Userpilot 2025 |
| Checklist completion | mean 19.2%, median ~10.1% | V | Userpilot |
| Product tour completion | median 15% | V | Userpilot |
| Time to value (avg) | 1 d 12 h 23 min (median 1 d 1 h 54 min) | V | Userpilot |
| Webinar registrant to attendee | 57% (ON24 2024); 38.4% (412 B2B webinars, Visionary); 55-60% (ON24 2025/2026 via secondary) | P/S | ON24 |
| Webinar live vs on-demand | 56% live / 45% on-demand (attendees, overlap) | P | ON24 2024 |
| Checkout fields | avg 11.3; ~8 needed; 17% abandon for complexity | P | Baymard 2024 |
| Checkout steps | 5.1 average | P | Baymard 2024 |
| Checkout abandonment reasons (2024) | extra costs 48%, forced account 26%, card distrust 25% | S | Statista citing Baymard |
| Cart abandonment (documented avg) | 70.19% | S | Baymard list (updated 2023) |
| Speed to lead | within 1 h = ~7x more decision-maker conversations; avg response 42 h | P | HBR 2011 via secondary |
| Waitlist referral | 100,000 emails/week (Harry's); 10-40% of waitlist from referrals typical | S | Prefinery, GrowSurf |

### 3.2 Effect-size ledger (A/B and observational)

| Change | Reported effect | Context / caveat | Grade |
|---|---|---|---|
| Remove nav (TOFU free-content pages) | +0-4% | HubSpot, 3 pages | V |
| Remove nav (MOFU demo/software pages) | +16%, +28% | HubSpot, 2 pages | V |
| Remove nav on registry LP | 3% to 6% (+100%) | Yuppiechef, no n or p, ~2011 | V |
| Headline: plain offer (30-day trial) vs action | ~+30% (runner-up ~+27%) | Highrise, 5 variants, ~4000 views, old | V/S |
| Red vs green CTA | +21% | Performable, few days, ~2000 visitors, confounded by contrast | V/S |
| "My" vs "your" CTA | +90% (one page) / -24.95% (payment page) | Aagaard; attribution conflicts | U |
| Fewer fields 11 to 4 | +120% | Imagescape 2007-8 | V/S |
| Remove 3 fields | -14% | Aagaard / Unbounce client | V |
| 9 to 6 fields lowered; relabel won | +19.2% for relabel | Aagaard | V |
| Phone number required | 19% to 13% | HubSpot 40k-page analysis | S |
| Landing-page video (embedded / lightbox) | 6.5% to 11% (+69%) / 13% (+100%) | Vidyard in Unbounce | V |
| Dropbox homepage video | ~+10% | Blogs only | U |
| LCP -31% | +8% sales | Vodafone Italy A/B | P |
| LCP -55% (3.78 s to 1.72 s) | +23% session duration | Tokopedia | P (association) |
| LCP 3x faster | +16.9% mobile conversion | Lazada | P (association) |
| CLS 1.65 to 0, TTI 8 s to 4 s | +80-100% mobile conversion | Redbus | P (association) |
| Mobile speed -0.1 s | +8.4% retail, +10.1% travel conversion | Deloitte/Google, 37 brands | P |
| Reviews present (5) vs none | +270% purchase likelihood (+190% low price, +380% high price) | Spiegel, retail | P |
| Verified-buyer reviews | +15% | Spiegel via secondary | S |
| Decoy option | bundle share 84% vs 32% | Ariely/Economist, student sample | S |
| Highlight "most popular" | +16-30% | Attributed to ProfitWell, no test link | U |
| Fewer tiers (5+ to 3-4) | +15-25% | Attributed to Price Intelligently | U |
| Annual default | annual signups +27%, overall conv -6% | 2026 vendor benchmark | S |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Lead-gen page: headline matches ad; 3 bullets; asset preview; email-only form above the fold on mobile | Generic homepage as ad destination | Message match; MOFU nav removal gain |
| Demo page: form + named quote + 4-6 logos + "what happens in the demo" + instant scheduling | "Contact us" form with 10 fields and no SLA | Speed to lead; fear of ambush |
| Webinar page: outcome title, date+tz, speakers, bullets, replay option | Title that's a topic, no time zone, no speakers | Registration clarity; attendance gap |
| Waitlist: 1 field -> share page with unique link and milestones | Dead "Thanks, we'll be in touch" page | Referral loop requires the second page |
| Checkout: total visible, guest checkout, wallets, autofill | Surprise fees at the end, forced account, 15 fields | Top abandonment reasons |
| Signup: SSO + email, defer profile questions | 8-field signup before value | Activation 37.5% average; more friction lowers |
| Onboarding: first valuable action within 3 clicks; short skippable checklist | 12-step tour on first load | Tour median completion 15% |
| Pricing: 3 cards + emphasised middle + enterprise strip + comparison table + FAQ | 5 equal cards, "Contact" for everything | Decision load and anchoring lost |

## 5. Exceptions & judgement calls

- **Funnel nav**: nav-free pages suit paid/committed traffic; SEO landing pages should keep nav and internal links because discoverability and crawl paths matter. [E]
- **Gated vs ungated**: NN/g warns against login walls before value; B2B lead-gen still needs capture. Gate high-value assets (benchmarks, templates), ungate explainers, and show a meaningful preview. [P/E]
- **Card-required trials** maximise conversion-to-paid but may hurt brand trust and signup volume, especially for unknown vendors; pick per ICP. [S/E]
- **Annual default** is a revenue/retention gamble, not a pure win; test by RPV and cohort retention. [S]
- **Instant scheduling** fits SMB/mid-market high-intent; enterprise buyers may prefer a named human and a research-friendly page with security docs. [E]
- **Scarcity and countdowns**: effective for real deadlines (webinar, cohort start), harmful when fake (trust). [P/E]
- **Heavier funnels (multi-step quizzes, conditional forms)** can raise completion by creating commitment, but only if each step is single-question and fast; keep the first step trivial. [E, no sourced numbers]
- **Social proof in funnels**: place it directly adjacent to the point of anxiety (beside the form, beside the card field), not in a separate section far below. [E]

## 6. Figures worth keeping

- Baymard checkout benchmark charts (field count by site) https://baymard.com/blog/checkout-flow-average-form-fields
- Portent conversion-vs-load-time curves https://www.portent.com/blog/analytics/research-site-speed-hurting-everyone.htm
- web.dev business-impact table https://web.dev/case-studies/vitals-business-impact
- Harry's Prelaunchr two-page flow (founders' account on tim.blog) https://tim.blog/2014/07/21/harrys-prelaunchr-email/
- HubSpot nav-removal results table (image in article) https://blog.hubspot.com/marketing/landing-page-navigation-ht
- Capture screenshots at 1440 and 390 of live funnels as `examples/` when tooling is available: Calendly/Chili Piper booking confirmation, Stripe Checkout, Linear/Notion signup, Loom/Notion onboarding checklists, Superhuman waitlist/referral, ON24/HubSpot webinar registration. (Named from [E] knowledge, not fetched.)

## 7. Open questions

- **Unverified at source**: First Page Sage, Visionary Marketing, Adapty, ChartMogul, OpenView/Boldstart, Poyar (freemium) figures are all secondhand and conflict on definitions (trial-to-paid vs visitor-to-signup; in-app vs B2B). Re-fetch originals before using in a client deliverable.
- **Pricing evidence** is thin: no primary ProfitWell/Price Intelligently/Paddle report found for toggles, "most popular" or tier counts. The Economist decoy is from a popular-book summary with conflicting sample details (MIT students vs 100 people). Treat as theory.
- **Baymard abandonment reasons**: 2024 (48/26/25, via Statista) vs 2025 (39/19/19, via Redstag) differ; confirm on Baymard's live page. Cart abandonment 70.19% last updated July 2023.
- **HBR vs MIT**: ensure the "5 minutes" claim is attributed to the 2007 MIT/InsideSales Lead Response Management study, and the 1-hour/7x claim to HBR 2011. Many blogs conflate them.
- **NN/g B2B and pricing guidance** reached only via secondary summaries; NN/g pricing and B2B report pages 404'd.
- **Missing**: Reforge/Lenny's/OpenView pricing-page teardown articles, Julian Shapiro's pricing/onboarding chapters (only the landing-pages guide was read), real checkout A/B data beyond Baymard's usability research, mobile-specific funnel studies (e.g. wallet adoption). Do a second research pass with direct fetches or manual reading.
- **Geometry for funnel pages** (column spans, paddings) is [E] synthesis; validate by measuring live pages with the render tools.
