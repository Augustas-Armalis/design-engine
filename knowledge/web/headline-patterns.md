---
source: web:julian.com/guide/growth/landing-pages + marketingexamples.com (via digests) + schwartz/dunford summaries + live homepage fetches 2026-10-08 (linear.app, stripe.com, notion.com, vercel.com, ramp.com, cursor.com, attio.com, mercury.com, apple.com/iphone) + nngroup.com
chapter: Headline pattern library (38 templates) for SaaS / AI-SaaS marketing sites
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [headlines, copy, patterns, awareness, positioning, cta]
status: studied
companion: copy-and-ux-writing.md (rules CW-01..CW-33, lint scripts, evidence grades)
---

# Headline pattern library

Use with `copy-and-ux-writing.md`. Evidence grades: `[A]` fetched primary, `[B]` secondary, `[C]` vendor/opinion, `[E]` engine note. Live examples were extracted from homepages on 2026-10-08 by a summarising model; re-verify with a screenshot before quoting. Constructed examples are marked `[E]` and use generic descriptors, never real brands. Every `{slot}` must be filled from the brief; if the brief has no number, use a pattern that does not need one.

## 1. Core ideas

1. A headline is a compression of: buyer + job + outcome (+ the bad alternative). Pick the pattern for the job it must do at the page's awareness level; do not pick by sound. `[B]` Schwartz, `[B]` Dunford
2. The default winning shape is plain and descriptive with one hook (Shapiro): "Visually design and develop sites from scratch. No coding." `[A]`
3. Short is normal: median SaaS H1 about 6 words / 38 characters `[C]`; the live set spans 2-9 words `[A]`.
4. Convergence is the enemy: in Oct 2026 five of eight fetched heroes lead with "agents/agentic" `[A]`. The pattern that survives is the one that says what the product does with a verb and an object.
5. Brand awareness licenses abstraction (Apple, Ramp "Time is money. Save both."); a new product has no such licence, so it must pass the reads-alone test (CW-04).
6. Every pattern has a failure mode. The pitfall column is part of the rule: if you cannot avoid the pitfall with the facts at hand, choose another pattern.

## 2. Rules (how to select and apply)

- **HP-01 RULE** Pick the awareness level first, then choose from the candidate patterns in the matrix (Section 4). Record `awareness` and `pattern_id` in the handoff.
  **Why** Mismatched headline/awareness gets indifference. **Applies to** landing page. **Check** handoff fields present. **Source** `[B]` Schwartz.
- **HP-02 RULE** Generate at least 6 candidates across at least 3 different pattern ids; run `copy_lint.py` (exit 0) and the blind-reader test (copy-and-ux-writing.md 8.5) on the top 3; ship the one that scores highest on "what does it do / who for" with the fewest words.
  **Why** One-shot headlines are the model's modal output. **Check** candidates file with ids and lint results. **Source** `[E]`.
- **HP-03 RULE** A headline pattern that needs a number (P04, P05, P13, P14, P24, P34) is allowed only when the number is in the brief with source and date.
  **Why** Falsifiable claims persuade only if true; fabricated stats are deceptive (FTC Act s.5; fake testimonials rule covers testimonials). **Check** every digit in H1/subhead appears in the brief. **Source** `[A]` FTC Q&A; `[E]`.
- **HP-04 RULE** Pair every headline with its subhead job: the subhead explains the mechanism (Shapiro). Do not let the subhead repeat the headline in other words.
  **Check** subhead has >=1 noun/feature absent from the H1. **Source** `[A]`.
- **HP-05 RULE** Vary pattern ids across sections of one page. Hero P02 + section P06 + proof P14 + closer P25 reads as a page; six "X. Y." two-beats read as a template.
  **Check** no pattern id used >2 times per page; no two adjacent H2s share an opening word. **Source** `[E]`.
- **HP-06 RULE** Use lowercase pattern ids in the build manifest: `hero.pattern = "P05"`. A lint can then verify band and slot constraints per pattern.
  **Source** `[E]`.

## 3. Pattern library

Format: **ID name** - template - fits - example - words - pitfall.

### 3A. Say what it is (solution / product aware, cold traffic)

- **P01 Plain category statement** - `{Product category} for {specific buyer}` / `The {adjective} {category} for {buyer}`. Fits: solution-aware, new product, split hero. Example: "The product development system for teams and agents" (Linear) `[A]`; "Resend is the email API for developers" `[A]`. 5-10 words. Pitfall: generic category + generic buyer ("platform for modern teams") fails reads-alone.
- **P02 Verb + object imperative** - `{Verb} {object}{, with/without {x}}.` Fits: solution-aware, tools with one clear job. Example: "Build your own website." (Webflow, per Shapiro) `[A]`; `[E]` "Send invoices that get paid on time." 3-8 words. Pitfall: invites the objection Shapiro warns about (can't code, no time); follow with P10.
- **P03 Product-as-subject sentence** - `{Product} is {your/the} {what} for {outcome}.` Fits: product-aware, strong brand, no subhead. Example: "Cursor is your coding agent for building ambitious software." `[A]`. 7-11 words. Pitfall: "ambitious/world-class/modern" adjectives are filler; swap for the specific job.
- **P04 Outcome + time** - `{Outcome} in {time}.` Fits: logistics, setup-speed, onboarding-led products. Example: "Groceries delivered in 1 hour." (Shapiro) `[A]`; Mercury subhead "Apply online in 10 minutes" `[A]`. 3-7 words. Pitfall: time must be true at P50 and stated at the condition (e.g., "after approval").
- **P05 Outcome + number + method** - `{Verb} {n} {unit} {period} with {mechanism}.` Fits: problem/solution-aware with proof. Example `[E]`: "Cut month-end close from 9 days to 3 with automated reconciliation." 8-14 words. Pitfall: invented numbers; two numbers dilute (keep one).
- **P06 Capability stack** - `{Verb 1}. {Verb 2}. {Verb 3}.` is the Apple/tricolon trap; use ONLY two beats: `{Verb 1} {object}. {Verb 2} {object}.` Fits: product-aware. Example: "Scale the team. Shrink the paperwork." (Ramp) `[A]`. 5-8 words. Pitfall: tricolon of abstractions ("Faster. Smarter. Simpler.").

### 3B. Contrast with the alternative (Dunford: competitive alternatives)

- **P07 Stop/start** - `Stop {bad alternative}. Start {better outcome}.` Fits: problem-aware, strong pain. Example: "Stop losing money to fees. Start using it to fuel your growth." (Mercury section) `[A]`. 8-12 words. Pitfall: negative parallelism cousin; do not use twice per page.
- **P08 Division of labour** - `{Agents/Product} {does X}. You {do Y}.` Fits: AI/automation products with a clear human step. Example: "Agents dig. You close." (Attio) `[A]`; "Keep your finance team focused on strategy. Let agents handle the busywork." (Ramp) `[A]`. 4-12 words. Pitfall: "AI does the boring bit" is now common; name the exact boring bit.
- **P09 Replace the stack** - `Replace {tool A}, {tool B} and {tool C} with {one thing}.` Fits: consolidation products; solution-aware. Example `[E]`: "Replace three spreadsheets and a shared inbox with one claims queue." 8-14 words. Pitfall: naming competitors needs legal review; name the category ("spreadsheets"), not the brand.
- **P10 Outcome + objection killer** - `{Outcome}. No {objection}.` Fits: solution-aware where the top objection is known. Example: "Visually design and develop sites from scratch. No coding." (Shapiro) `[A]`. 6-12 words. Pitfall: "No credit card" style claims must be true; one objection per headline.
- **P11 Pain mirror** - `{Pain in buyer's words}? {Product} {fixes it}.` or statement `{Pain in buyer's words}, solved.` Fits: problem-aware; message-mined phrase. Example: "Banking's been a headache. Now, it's a head start." (Mercury section) `[A]` (note the contrast shape; use sparingly). 5-12 words. Pitfall: invented pain; use the research phrase (Wiebe `[B]`).
- **P12 Category creation** - `Welcome to {new category}.` / `The {new} {category}.` Fits: New Game positioning, high-awareness funding stage. Example: "Welcome to agentic revenue." (Attio) `[A]`. 3-6 words. Pitfall: undefined jargon; the subhead must define it in plain words ("the CRM that builds pipeline, advances deals...").

### 3C. Scope, proof and scale

- **P13 Proof as headline** - `{n}{+} {who} {verb}.` Fits: product/most-aware, strip sections. Example: "70,000 teams and counting" (Ramp) `[A]`; "Trusted by 30,000+ customers." (Attio) `[A]`. 3-6 words. Pitfall: "Trusted by thousands" with no number; unsourced counts.
- **P14 Metric + scope** - `{Number} {unit} {what}, {scope}.` Fits: infra/finance with big numbers. Example: "Global GDP running on Stripe:" as proof eyebrow `[A]`; "$1M+ saved on global spend" `[A]`. 3-8 words. Pitfall: precision theatre (0.9191334% is credible only when computed and sourced).
- **P15 Scope claim** - `Everything {you do with X}. All in one place.` Fits: broad suites, product-aware. Example: "Everything you do with money. All in one place." (Mercury) `[A]`; "One platform for all of finance." (Ramp) `[A]`. 4-9 words. Pitfall: "all-in-one" is unfalsifiable; list the 2-3 jobs in the subhead.
- **P16 From-to range with real endpoints** - `From {first real step} to {last real step}.` Fits: lifecycle products. Example: "from your first transaction to your billionth" (Stripe subhead) `[A]`. 5-12 words. Pitfall: false ranges ("from innovation to transformation") are a listed AI trope `[A]`.
- **P17 Scale promise** - `Scales from {small} to {large}.` Fits: infra. Example: "Ship apps that scale from zero to millions instantly" (Vercel section) `[A]`. 6-10 words. Pitfall: "instantly" must be defensible.

### 3D. Audience, role and job

- **P18 Named buyer** - `For {specific role} who {job}.` Fits: niche tools; section headers. Example: "For the people who own the number." (Attio section) `[A]`. 4-9 words. Pitfall: "for teams of all sizes".
- **P19 Job-to-be-done verbs** - `{Verb} {noun}` x3 as three feature headers, not as a hero. Example: "Capture knowledge / Find answers / Automate busywork" (Notion) `[A]`. 2-3 words each. Pitfall: if all three share the same grammatical shape and size it is a tricolon; it is acceptable in a feature row because each carries a distinct object.
- **P20 Role-specific use cases** - `{Verb} {object} {in tool/context}` as cards. Example: "Resolve support tickets in Slack", "Triage product feedback", "Automate weekly reporting" (Notion cards) `[A]`. 3-6 words. Pitfall: generic verbs; each card must name a real object.
- **P21 Short blunt feature header** - `{Verb phrase}` or `No {thing}`. Example: "Cooks and sears", "No clean up" (Shapiro) `[A]`; Attio "It logs itself." `[A]`. 2-4 words. Pitfall: more than one negation header in a row.

### 3E. Offer, risk and action (most-aware / closers)

- **P22 Offer-led** - `{Offer} {terms}.` Fits: most-aware, pricing, returning visitors. Example: "30-day Free Trial on All Accounts" (Highrise, winner vs "Start a Highrise Account", reported +30%) `[B]`. 4-8 words. Pitfall: terms must be real.
- **P23 Guarantee / falsifiable promise** - `{Result} or {remedy}.` Example (Dry's falsifiability) `[B]`: "Returned within 365 days if you're not satisfied." 5-10 words. Pitfall: guarantee must exist in policy.
- **P24 Time compression** - `Switch in {days}, not {months}.` Fits: replacement/migration products. Example: "Switch in days, not months" (Ramp CTA) `[A]`. 4-7 words. Pitfall: unsupported; add migration facts in body.
- **P25 Closing imperative** - `{Verb} {object} {now/today}.` Fits: final CTA band. Example: "Try Cursor now." `[A]`; `[E]` "Send your first invoice today." 3-6 words. Pitfall: "Ready to transform your business?" is a banned shape.
- **P26 Closing contrast** - `{Weak state}. {Strong state}.` Fits: final CTA, product-aware. Example: "Built for the future. Available today." (Linear) `[A]` - note: reads generic; works only because Linear is product-aware. 4-8 words. Pitfall: promise with no object.
- **P27 Risk reversal beside CTA** - microcopy, not a headline: "Free for 14 days. No credit card." Only if true. 3-8 words. `[E]`

### 3F. Feeling, voice and reframe (use only at product/most-aware or with a descriptive subhead)

- **P28 Apple fragment** - `{Noun phrase}.` / `{Adjective}. {Adjective}.` Fits: hardware, strong consumer brands. Example: "Pro further.", "Power. Fully. Fast.", "Out of range. Not out of reach." (iPhone) `[A]`. 2-6 words; body sentences 15-30 words `[A]`. Pitfall: unknown brand + fragment = fails reads-alone; stacked tricolons.
- **P29 Aphorism** - `{Familiar saying}. {Twist}.` Example: "Time is money. Save both." (Ramp) `[A]`. 4-6 words. Pitfall: aphorism must be literally true of the product; otherwise pull-quote filler (tropes.fyi "quotable one-liners").
- **P30 Place/togetherness metaphor** - `Where {actors} {verb} together.` Example: "Where teams and agents Think together." (Notion) `[A]`. 5-7 words. Pitfall: vague; pair with a concrete subhead (Notion does: "Capture context, find answers, and automate tasks...").
- **P31 Radical-difference claim** - `{Radically different} {category}`. Example: "Radically different banking" (Mercury) `[A]`. 3-4 words. Pitfall: unfalsifiable adjective; the subhead must be specific ("Apply online in 10 minutes").
- **P32 Naming the surface** - 2-3 noun hero where each noun is a concrete interface. Example: Vercel subhead lines name "API, CLI, MCP, and Skills" and "Sandboxed VMs" `[A]`; headline "Agentic Infrastructure" is the weak half, the nouns are the strong half `[C]`. Pitfall: leading with the category word.

### 3G. Content, launches, microcopy, pricing

- **P33 How-to with promise** - `How to {outcome} without {pain}.` or `How to {verb} {n} {unit} a {period} {using method}`. Fits: blog, guides. Example `[B]`: "How to Save 10 Hours a Week Using These 5 Simple Productivity Hacks" (Dry's specificity rewrite; shorten for UI). 8-14 words. Pitfall: clickbait promise (NN/g).
- **P34 Number + list** - `{n} {things} {for/to} {outcome}`. Example: "17 tips for great copywriting" (Marketing Examples) `[A]`. 4-9 words. Pitfall: arbitrary numbers; counts must match content.
- **P35 Case-study headline** - `How {real customer} {verb} {metric} {period}.` Fits: customer stories. Example `[E]`: "How a 12-person support team cut first replies from 6 hours to 40 minutes". Pitfall: requires a real, consenting customer and real data (FTC).
- **P36 Launch / announcement** - `Introducing {Name}: {what it does in a verb phrase}`. Example: Ramp banner "New: AI Token Spend Management - see, understand, and control your AI bill." `[A]`. 6-14 words. Pitfall: name-first with no function.
- **P37 Pricing headline** - `Pay for {unit}, not {waste}.` / `{Free plan fact}. Upgrade when {trigger}.` Fits: pricing. Example `[E]`: "Pay per seat that sends, not per seat that exists." 5-10 words. Pitfall: "Simple, transparent pricing" is a generic filler; state the model.
- **P38 Empty-state / onboarding headline** - `{Verb} your first {noun}.` Fits: app UI first run. Example `[E]`: "Create your first invoice." 3-5 words. Pitfall: pair with a one-line benefit and a button that does it (NN/g empty-state guidance `[A]`).

## 4. Numbers & scales: pattern fit matrices

### 4.1 Awareness -> candidate patterns -> CTA

| Awareness (Schwartz `[B]`) | Hero job | Candidate patterns | CTA type |
|---|---|---|---|
| Unaware | Echo an emotion/attitude they recognise; do not lead with product | P11 (pain mirror), P29 (only if true) | content CTA ("See the 2-minute tour") |
| Problem-aware | Name the pain and the cost | P07, P11, P05, P10 | "See how it works" |
| Solution-aware | Define the need, prove it is possible, show how this product does it | P01, P02, P05, P08, P09, P10, P12 | "Start free" / "Book a demo" |
| Product-aware | Differentiate vs the one you are comparing against | P03, P06, P08, P15, P16, P17, P24, P31 | "Start free" + "Compare plans" |
| Most-aware | Lead with the offer or the next step | P13, P22, P23, P24, P25, P26 | "Start free", "Buy now" |

### 4.2 Pattern -> slot and band

| Slot | Patterns that fit | Words |
|---|---|---|
| Hero H1, centered | P02, P03, P04, P06, P10, P12, P15, P28, P29, P31 | 3-9 |
| Hero H1, split / left | P01, P03, P05, P07, P08, P09, P11 | 5-12 |
| Section H2 | P08, P15, P16, P17, P18, P19, P24 | 2-10 |
| Feature H3 / card | P19, P20, P21 | 1-6 |
| Proof strip | P13, P14 | 3-8 |
| Closing band | P25, P26 (+P27 microcopy) | 3-8 |
| Pricing | P22, P23, P37 | 4-10 |
| Blog / content | P33, P34, P35, P36 | 4-14 |
| App empty state | P38 | 3-5 |

### 4.3 Page-level assembly recipes `[E]`

| Page type | Hero | Subhead | Proof | Features | Closer |
|---|---|---|---|---|---|
| Cold-traffic SaaS (solution-aware) | P01 or P02 + P10 | mechanism sentence (HP-04) | P13 strip | P19/P21 x3-6 | P25 |
| AI-SaaS | P08 (division of labour) or P05 | names the exact task the agent does and the human step | P14 metric, sourced | P20 use-case cards | P25 |
| Brand-aware product | P03 or P29 + descriptive subhead | one factual line | P13 | P19 | P26 |
| Dev tool | P01 (category for developers) | names API/CLI/SDK surfaces (P32 nouns) | P14 | P21 | P25 ("Deploy now") |
| Fintech | P04/P24 | rate/fee/time facts | P13 + regulatory line from brief | P20 | P25 |

## 5. Dos and Don'ts

| Don't | Why | Do |
|---|---|---|
| "Unlock the future of work." | banned verb + no object | P02: "Turn meeting notes into assigned tasks." `[E]` |
| "AI-powered insights for modern teams" | category claim + abstract noun + generic buyer | P08: "The agent flags overdue invoices. You call the three that matter." `[E]` |
| "Faster. Smarter. Better." | tricolon, zero information | one measurable claim (P04/P05) |
| "It's not just a spreadsheet, it's a workspace." | negative parallelism | P09: "Replace the shared spreadsheet with one claims queue." `[E]` |
| "Welcome to the future of {category}" | stock opener | P12 only if you define the category in the subhead |
| Every section opens with "Why..." | anaphora/template | vary ids (HP-05) |
| H1 "Hello, hello." on a new product | Apple fragment without Apple's awareness | P01/P02 with descriptive subhead |
| "Join 10,000+ teams" with no source | fabricated proof | P13 with the brief's number and date, or omit |

## 6. Exceptions & judgement calls

- **Fragments and aphorisms (P28, P29) work only above a threshold of awareness**; they are the pattern an agent over-uses because it looks premium. Gate them behind `awareness >= product`. `[E]`
- **P06 and P07 are close to tricolon/negative-parallelism tells.** They are allowed as two-beat forms with distinct concrete objects (Ramp "Scale the team. Shrink the paperwork."); three beats or abstract objects fail the lint.
- **Mercury's "Banking's been a headache. Now, it's a head start."** shows a leader using a contrast shape our lint would flag as a negative-parallelism cousin. Treat the lint as a prompt for a human decision, not a veto, only in brand-aware contexts. `[A]`/`[E]`
- **Headline with a number vs without.** Highrise's winner put the offer in the headline (+30% reported) but changed subhead too, so attribution is shaky `[B]`.
- **Questions** (P11 variant) can underperform statements for scanners (Wynter sample report `[C]`); statements are the default.
- **Do not copy patterns from this table verbatim.** The live examples are brand-specific; they are here to show shape, not to be reused. Reuse is a plagiarism and sameness risk. `[E]`

## 7. Open questions

- Live examples were summarised by a small model on 2026-10-08. Some outputs (Notion's capitalised "Think", Apple's "iPhone Duo / iPhone 18 Pro" product names) look unusual and need screenshot confirmation before any quotation.
- No A/B data comparing patterns against each other on SaaS heroes; ordering in Section 4 is judgement `[E]`.
- The "agents" convergence is an observation from 8 sites; sample is small. Re-sample quarterly.
- Linear's, Stripe's, Notion's internal content style guides were not found publicly; patterns are inferred from outputs only.
