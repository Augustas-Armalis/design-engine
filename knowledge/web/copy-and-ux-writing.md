---
source: web:julian.com/guide/growth/landing-pages + nngroup.com (error-message-guidelines, better-link-labels, how-users-read-on-the-web, empty-state, tooltip, ok-cancel) + styleguide.mailchimp.com/voice-and-tone + developers.google.com/tech-writing/error-messages + eui.elastic.co error messages + design-system.service.gov.uk + ftc.gov consumer-reviews rule Q&A + en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing + tropes.fyi + live homepage fetches (2026-10-08) + secondary summaries (Dunford, Schwartz, Harry Dry, Wiebe, Wynter)
chapter: Copy and UX writing for SaaS / AI-SaaS marketing sites and product UI
pages: n/a (web research, fetched 2026-10-08)
topic_tags: [copy, ux-writing, headlines, cta, microcopy, voice, ai-tells, sample-data, proof, positioning]
status: studied
companion: headline-patterns.md (38 headline templates, when each fits)
---

# Copy and UX writing

Layout cannot rescue generic words. An agent's default hero is "Unlock seamless X. Supercharge your workflow." because that string is the statistical middle of every SaaS page it has seen. The cure is not a better adjective; it is (a) deciding what is true and specific before typing, (b) mechanical checks that reject the middle-of-the-distribution phrasing, (c) a believable fictional world for sample data.

**Evidence grades used below.** `[A]` = primary page fetched and read this session. `[B]` = secondary summary or search snippet (treat as directional). `[C]` = vendor claim or single-reviewer opinion, unverified. `[E]` = engine note, my own judgement, not sourced. Where a number is `[B]`/`[C]` it is not a law; test it.

## 1. Core ideas

1. **Positioning comes before wording.** April Dunford's order: competitive alternatives -> unique attributes -> value (with proof) -> target customer -> market category (+ optional relevant trend). A positioning statement only records the work; it does not replace it. `[B]` (secondary summaries of *Obviously Awesome*; book not read.) A hero headline is the output of this chain compressed to one line: it names the job and, implicitly, what the buyer does today without you.
2. **Header = fully descriptive value prop + one hook.** Julian Shapiro: identify the value prop, then add a hook (a bold, specific claim, or a response to the biggest buying objection). Test: if a visitor reads only the header, do they know exactly what you sell? Slogans fail ("Improve your workflow!", "Supercharge your collaboration!"). `[A]`
3. **Bad alternative -> better -> action.** Shapiro's value-prop recipe: name the bad alternative customers use today, say how you beat it, turn that into an action statement. Examples he gives: "Visually design and develop sites from scratch. No coding." / "Groceries delivered in 1 hour." / "Rent people's homes." `[A]`
4. **Purchase rate = Desire - (Labor + Confusion).** Raise desire with value, cut labor with concision, cut confusion with simple sentences and an obvious next step. `[A]` (Shapiro)
5. **Concrete, visual, falsifiable (Harry Dry).** Abstract -> concrete ("improve productivity" -> "20% gain in 7 days, refund if not"); a sentence that can be proven false stands out. His 12 rules include "any word that isn't working for you is working against you" (Kaplan) and "a great sentence is a good sentence made shorter". `[B]` (via a Substack digest; marketingexamples.com itself 404'd/was nav-only on fetch.)
6. **Concise + scannable + objective beats promotional.** NN/g (re-tested usability of a promotional-writing control): concise text (half the words) +58%, scannable layout +47%, objective (non-boastful) language +27%, all three combined +124%. 79% of users always scanned a new page; 16% read word by word. Authors' reason for objective language: promotional language imposes a cognitive burden because readers must filter exaggeration to find facts. `[A]` This is the strongest hard evidence for banning hype words.
7. **Awareness level decides the headline's job.** Schwartz (*Breakthrough Advertising*, 1966): unaware -> problem-aware -> solution-aware -> product-aware -> most-aware. Lead with an identifiable emotion/attitude (unaware), the pain (problem), the outcome+proof+how (solution), the differentiator (product), the offer (most). Mismatch (offer ad to cold traffic) gets indifference. `[B]`
8. **Customer language beats invented language.** Joanna Wiebe's "message mining": read reviews/comments/survey answers line by line, highlight repeated words and phrases, and reuse the customer's own wording in headline/subhead. Beachway case: copy changes -> +26% conversion (Copyhackers podcast page; not shown to be caused by message mining). `[B]`
9. **Product UI copy serves; it does not persuade.** Clear, useful, friendly, appropriate (Mailchimp TL;DR) `[A]`; clarity beats entertainment, humor only when natural, "when in doubt keep a straight face" `[A]`. Voice is constant; tone flexes with the reader's emotional state `[A]`.
10. **Error copy = problem + cause + fix, no blame, no jokes.** NN/g, Google, Elastic converge: say specifically what failed, offer a constructive remedy, never blame ("invalid", "illegal", "incorrect"), skip "oops/please/sorry" unless the fault is clearly ours. `[A]`
11. **AI-written copy has measurable tells, and they move.** Wikipedia's catalogue notes the tell vocabulary shifts by model era (2023-24: delve, tapestry, pivotal...; mid-2026 onward: leverage, foster, multifaceted, quietly, practical, prioritize, steady, dependable, matters...). Structural tells persist: negative parallelism ("not just X, but Y"), rule of three, copula avoidance ("serves as"), title-case headings, mechanical bold, emoji bullets, stock openers/closers. `[A]` Caveat from the page: these are observations, many occur in human writing; and suppressing one tell (em dash) can just move the tell elsewhere. So check structure and specificity, not only a word list.
12. **Fake proof is a legal risk, not just a style risk.** FTC Consumer Reviews and Testimonials rule (16 CFR Part 465): writing/creating/selling a fake or false consumer review or testimonial is prohibited; a business displaying testimonials on its own site is disseminating them; civil penalties for knowing violations; a business should not supply testimonial text without a reasonable basis to believe it is truthful. `[A]` Invented customer counts are not named in the Q&A but fall under general deception law (FTC Act s.5). `[E]` So mockups must not contain invented customers, quotes, or stats that could ship.

## 2. Rules

Each rule: RULE / Why / Applies to / Check / Source. Checks that are scriptable are implemented in Section 8 (`copy_lint.py`) or Section 9 (`data_lint.py`).

### 2A. Strategy before words

- **CW-01 RULE** Before writing the hero, fill four slots in the brief: (1) what the buyer does today instead (competitive alternative), (2) the one attribute that beats it, (3) the outcome that follows, with a number if one exists, (4) the buyer role. If the brief lacks (3)'s number, write the headline without one; never invent it.
  **Why** Headline specificity can only be as good as the input facts. Dunford orders alternatives first because value is relative to the alternative.
  **Applies to** landing page. **Check** brief file contains the four slots; `visual`/LLM-judge: headline mentions (2) or (3), not neither. **Source** `[B]` Dunford; `[A]` Shapiro.

- **CW-02 RULE** Assign the page an awareness level (default for cold SaaS traffic: problem-aware or solution-aware) and pick the headline pattern from `headline-patterns.md` for that level. Return/branded traffic (product-aware, most-aware) may use shorter, offer-led heroes.
  **Why** A most-aware line ("Get 20% off today") shown to an unaware visitor is ignored; a pain line shown to a most-aware visitor wastes the click.
  **Applies to** landing page, ads. **Check** brief field `awareness: unaware|problem|solution|product|most` present; pattern id recorded. **Source** `[B]` Schwartz summaries.

- **CW-03 RULE** Where customer research exists, quote its words (a repeated phrase from reviews, interviews, support tickets) in the headline or subhead. Where it does not exist, say so in the handoff; do not simulate "customer voice" quotes.
  **Why** Repeated customer phrasing carries the problem's real vocabulary and is not in the model's generic prior. Simulated quotes are fabricated testimonials (CW-24).
  **Applies to** landing page. **Check** handoff lists source of language (`research|brief|none`). **Source** `[B]` Wiebe.

### 2B. Headlines

- **CW-04 RULE** The H1 must pass the "reads-alone" test: a stranger who sees only the H1 (no logo, no nav, no image) can say what the product does or what outcome it produces. If the H1 is a feeling or brand line (Apple-style fragment), the subhead must carry the descriptive load immediately under it, within the same viewport.
  **Why** Visitors scan; Shapiro's header test; NN/g: headlines must be understandable out of context.
  **Applies to** landing page. **Check** LLM-judge or human: give only H1 (+ subhead) to a blind reader and ask "what does this sell, to whom?" Pass if the answer matches the brief within one clause. `visual`/judge. **Source** `[A]` Shapiro, NN/g microcontent.

- **CW-05 RULE** Prefer a concrete noun, number, unit, or timeframe in every headline where the brief supports one. Replace each abstract noun (platform, solution, experience, workflow, productivity, efficiency, collaboration, growth, journey, insights) with the thing it stands for.
  **Why** Dry's three tests (concrete, visual, falsifiable); "Groceries delivered in 1 hour" can be wrong, "Improve your workflow" cannot.
  **Applies to** all headline slots. **Check** `copy_lint.py` warns when H1+subhead contain >=2 abstract nouns or none-digit + abstract noun. **Source** `[A]` Shapiro; `[B]` Dry.

- **CW-06 RULE** Benefit-first, feature-as-proof. Headline states the outcome or job (what changes for the buyer); the subhead names the mechanism/feature that makes the claim believable. Do not invert it.
  **Why** Shapiro: "Subheader: explain what the product is, then how the header's claim is possible, usually by naming the features that make it believable."
  **Applies to** landing page. **Check** `visual`: subhead contains at least one product noun/feature not in the H1. **Source** `[A]`.

- **CW-07 RULE** One idea per headline; front-load the keyword; no puns, no cute wording, no clickbait.
  **Why** NN/g: headlines appear without context; front-loaded words are what scanners see; puns hurt clarity.
  **Applies to** all. **Check** `visual` + sentence count in H1 <= 2 beats. **Source** `[A]` NN/g microcontent.

- **CW-08 RULE** Do not use a category claim as the differentiator. "AI-powered", "agentic", "AI cloud", "the platform for X" are shared by every competitor in 2026; the headline must say what the AI/agent does in a verb + object.
  **Why** A reviewer's teardown of Vercel's 2026 hero argues the "AI Cloud" phrasing is a category claim AWS/Cloudflare can also make and that specificity won the original audience. `[C]` Live data point: Linear ("for teams and agents"), Notion ("Where teams and agents Think together"), Attio ("Welcome to agentic revenue"), Vercel ("Agentic Infrastructure"), Ramp ("Agents for every workflow") all converge on the same noun in Oct 2026 `[A]` - convergence is the warning, not the model.
  **Applies to** AI-SaaS hero. **Check** warn if "AI", "agent(s)", "agentic", "intelligent", "smart", "copilot" appears in H1 without a verb that says what it does; `grep -iE '\b(ai|agentic?|agents?)\b'` on H1. **Source** `[C]`/`[A]` observation; `[E]` rule.

- **CW-09 RULE** Headline length: use the bands in Section 3 (hero H1 3-9 words centered, 5-12 split; section H2 2-10; card H3 1-6). Never let the H1 wrap past 3 lines at 1280 px or 5 lines at 375 px.
  **Why** Median SaaS homepage headline is 6 words / 38 characters (5,000+ SaaS headlines, self-published analysis `[C]`); live heroes fetched: 2-9 words `[A]`. Short lines also fit display type sizes without breaking the layout.
  **Applies to** landing page. **Check** `copy_lint.py` length bands + Playwright line-count snippet (Section 8). **Source** `[C]` bigideasdb; `[A]` live fetch; `[E]` bands.

- **CW-10 RULE** Use sentence case for headings, buttons, and labels by default. Title Case only if the brand style card says so (some brands do: Apple "Designed to Last", Notion "Get Notion free" is sentence case).
  **Why** Title case in headings is a listed AI tell; Atlassian and Carbon default to sentence case for UI.
  **Applies to** all. **Check** `copy_lint.py` title-case-heading warning (>=75% of non-initial words >3 chars capitalized). **Source** `[A]` Wikipedia tells; `[B]` Carbon/Atlassian search snippets.

- **CW-11 RULE** No em dash, no "not X, but Y" / "It's not X, it's Y", and no tricolon in any H1, H2, H3, eyebrow, subhead or CTA. In body copy: <=1 em dash per 100 words, <=2 tricolons per 300 words, and no two consecutive sentences using the same skeleton.
  **Why** These are the highest-signal structural tells (Wikipedia: negative parallelism, rule of three; tropes.fyi: "It's not X, it's Y" and tricolon pairs). A tricolon is not wrong; stacking them is the tell. Real brands do use dashes (Notion "instantly-with citations", Ramp spaced en dashes), so the limit is density and pivot function, not a ban in prose.
  **Applies to** all copy. **Check** `copy_lint.py` (FAIL in short slots, WARN in body). **Source** `[A]`.

### 2C. Eyebrow, subhead, features, proof

- **CW-12 RULE** Eyebrow = a label (category, audience, news badge, or proof stat), 1-3 words, <=24 characters, never a second headline. It must add information the H1 lacks, and appear above at most one or two sections per page, not every section.
  **Why** Live data: Linear ("New"), Ramp ("New: AI Token Spend Management..." and "AGENTS AT WORK TODAY:"), Stripe ("Global GDP running on Stripe:"), Attio (one-word taxonomy labels: Platform, Context, Signals) `[A]`. Cursor, Vercel, Notion have none above headings. Eyebrow above every section is a template tell. `[E]`
  **Applies to** landing page. **Check** count of eyebrows <= 1 + (sections / 3); eyebrow text not a substring of the H1. **Source** `[A]` live; `[E]`.

- **CW-13 RULE** Subhead: 1-2 sentences, 10-24 words, names the mechanism or feature behind the headline claim, ends the thought (no trailing tricolon of benefits).
  **Why** Shapiro "one or two sentences, breezy"; avg subhead ~12 words (process.st `[C]`); 10-20 words converting better than one-liners/paragraphs (Flint `[C]`, no methodology disclosed).
  **Applies to** hero, section intros. **Check** word count; `copy_lint.py` band (8-28 words, <=190 chars). **Source** `[A]` Shapiro; `[C]` others.

- **CW-14 RULE** Feature blocks (3-6): header = short, blunt value prop (2-6 words; verb+object or noun phrase); paragraph = what it does + the objection it removes; every block ties back to the hero claim. No "Empower your...", "Revolutionize your...".
  **Why** Shapiro's own examples: "Cooks and sears", "No clean up", "Cooks more than just meat". Live: Notion "Capture knowledge / Find answers / Automate busywork"; Attio "Agents dig. You close." `[A]`
  **Applies to** landing page. **Check** H3 length band; no banned verb. **Source** `[A]`.

- **CW-15 RULE** A proof statement has five parts: number, unit, period or scope, who it is about, and a source the reader can verify. "[Metric] [unit] [period], [who]". If any part is unknown, do not render the stat; render a visible `[proof needed]` slot in drafts.
  **Why** Falsifiable claims persuade (Dry); Dunford pairs value with proof; unattributed round claims read as AI filler. Live examples: Ramp "70,000 teams and counting", "$1M+ saved on global spend" (precision, not rounding to "thousands"); Attio "Trusted by 30,000+ customers"; Mercury "Loved by 300K+ ...". `[A]`
  **Applies to** landing page. **Check** `copy_lint.py` flags unverified-claim regexes (trusted/used/loved by N, 99.9%, Nx faster, #1, SOC 2/HIPAA/GDPR/ISO claims) so each must trace to the brief. **Source** `[B]` Dunford; `[A]` Shapiro (logos, counts), live.

- **CW-16 RULE** Social proof order: recognizable customer logos or press first (Shapiro), then a quantified claim, then named quotes. Logos and quotes appear only if the user supplied them or they are clearly placeholder (CW-24).
  **Why** Logos build "everyone already knows you"; fabricating them implies endorsement.
  **Applies to** landing page. **Check** every logo/quote element carries `data-source="brief"` or `data-placeholder`. **Source** `[A]` Shapiro, FTC.

### 2D. CTA labels

- **CW-17 RULE** Primary CTA label = verb + object (or verb + outcome), 1-4 words, sentence case, <=28 characters, no period: "Start free trial", "Book a demo", "Find food", "Deploy now", "Open account". "Get started" alone is acceptable only when the surrounding headline makes the object obvious; it is the weakest form.
  **Why** NN/g: labels must be specific, sincere, substantial, succinct; Shapiro: CTA continues the hero narrative ("Find food", "Start learning"); Carbon v9: verbs, <=3 words, sentence case; GOV.UK: wording matches the action.
  **Applies to** all. **Check** `copy_lint.py` generic-CTA FAIL (submit, learn more, click here, ok, yes/no, go, continue, read more, next, send) and weak-CTA WARN (get started, sign up, join now). **Source** `[A]` NN/g, Shapiro, GOV.UK; `[B]` Carbon.

- **CW-18 RULE** Never repeat "Learn more" across a page; replace with the destination: "Read the pricing guide", "See how routing works".
  **Why** NN/g calls "Learn more" the new "Click here": it fails specific, sincere, and substantial. `[A]` (note: Linear's current homepage repeats "Learn more ->" per fetch `[A]`: leaders also break this, but it costs them nothing at their awareness level; yours is lower.)
  **Applies to** landing page. **Check** count of identical CTA labels <= 1 for "Learn more"/"Read more". **Source** `[A]`.

- **CW-19 RULE** One primary action per view; the secondary action differs in intent and has lower visual weight (e.g., "Start free" + "Book a demo"; GOV.UK: for a second CTA use a link, not a second button). Pair by awareness: unaware/problem -> "See how it works"; solution -> "Start free"; product/most -> "Start free" or "Get a quote".
  **Why** Two same-weight CTAs split attention; intent separation lets cold and warm visitors both act.
  **Applies to** hero, final CTA band. **Check** exactly one filled-primary button per viewport. **Source** `[A]` GOV.UK; `[E]`.

- **CW-20 RULE** First-person ("Start my free trial") vs second-person ("Start your free trial") is a test, not a default. Use first-person for low-commitment lead magnets, checkout and forms where the user is claiming something; keep second-person for formal/conservative audiences.
  **Why** The evidence is thin: the cited ~90% lift is reported secondhand for "Get My Free Template" vs "Get Your Free Template" (Aagaard/ContentVerve via Expert Beacon); a "Start my free" 90% figure could not be verified. Clicks also are not revenue. `[B]`
  **Applies to** CTA. **Check** record which variant and why in the handoff. **Source** `[B]`.

- **CW-21 RULE** Friction-reducers beside a CTA ("No credit card required", "Free for 14 days", "Takes 2 minutes") are allowed only when true and sourced from the brief. Put them in 12-14 px muted text under or beside the button, one at most.
  **Why** They address the objection (Shapiro: handle the biggest objection early); invented ones are false claims.
  **Applies to** hero, pricing. **Check** each friction phrase exists in the brief. **Source** `[A]` Shapiro; `[E]`.

### 2E. Microcopy

- **CW-22 RULE** Error message structure: Problem (what failed, no codes) -> Cause (only if useful) -> Recommendation (what to do, or who to contact; say if temporary). Positive and instructive ("Enter a valid postal code"), no blame, no "oops/uh-oh/please", no jokes, apologise only when the fault is ours (outage). Show it next to the field, preserve the user's input, offer a one-click fix when predictable.
  **Why** NN/g, Google (don't over-apologise, avoid humor, don't blame), Elastic (problem/cause/recommendation, grade 9 reading level). `[A]`
  **Applies to** forms, SaaS app UI. **Check** regex on error strings: no `\b(oops|uh-oh|whoops|sorry|please|invalid|illegal|forbidden|you (forgot|failed|entered an? (invalid|incorrect)))\b`, and not equal to "Something went wrong"/"An error occurred"/"Invalid input". **Source** `[A]`.

- **CW-23 RULE** Button/dialog labels name the action and the object; avoid OK/Yes/No. Destructive confirmations: title states the object ("Delete 'Q3 plan'?"), body states the consequence, buttons are "Delete plan" and "Keep plan" (or Cancel). Do not write "Are you sure?".
  **Why** NN/g: name a button to explain what it does; Apple alert guidance (via secondary summary): descriptive multiword titles, no bare "Error", avoid OK as default except informational alerts. `[A]` NN/g; `[B]` Apple.
  **Applies to** app UI. **Check** dialog button text not in {OK, Yes, No, Submit, Confirm}. **Source** `[A]`/`[B]`.

- **CW-24 RULE** Sample data and proof in mockups: see Section 9. Short form: derive every number from one fictional "world", use only reserved identifiers (example.com/.test, 555-0100..0199, RFC 5737 IPs), never invent customers, logos, quotes, or stats that could ship, and tag placeholders so a lint can block shipping.
  **Why** Coherence makes mockups believable; reserved identifiers cannot reach a real person; FTC testimonials rule.
  **Applies to** all mockups and demo UI. **Check** `data_lint.py` + `copy_lint.py` placeholder rules. **Source** `[A]` RFC 2606/5737, NANPA, FTC; `[E]`.

- **CW-25 RULE** Empty states do three jobs, in order: (1) say the status ("No invoices yet" vs loading vs error), (2) teach the feature in one line, (3) give a direct path (a button that performs the first action; optionally "Load sample data" or "Learn how"). Never ship a blank container or a "No data" that shows during loading.
  **Why** NN/g three guidelines (system status, learning cues, direct pathways). `[A]`
  **Applies to** SaaS app UI. **Check** every list/table component has an empty variant with a heading, one sentence, one button. **Source** `[A]`.

- **CW-26 RULE** Tooltips are supplementary: explain an unlabeled icon or why a field is requested; never restate the visible label; never hold task-critical info (password rules, field format) which belongs inline; must be keyboard-focusable.
  **Why** NN/g tooltip guidelines. `[A]`
  **Applies to** app UI. **Check** tooltip text != trigger label; `aria-describedby` present. **Source** `[A]`.

- **CW-27 RULE** Toasts: past-tense result in <=1 line ("Invoice sent to Maya Okafor"), optional single action (Undo), no "Successfully", no exclamation, no emoji. Error toasts that need a decision must not auto-dismiss.
  **Why** Redundant words ("successfully") add nothing; the verb tense already says it. `[E]` (NN/g: minor issues may use toasts/banners; reserve modals for severe errors `[A]`).
  **Applies to** app UI. **Check** regex `successfully|!$` on toast strings; length <= 60 chars title. **Source** `[E]`/`[A]`.

- **CW-28 RULE** Forms: visible label (noun phrase, <=3 words); placeholder = realistic example, not an instruction or the label; helper text states format before the error appears; mark optional fields "(optional)"; validate on blur, not on exit-without-typing.
  **Why** NN/g: don't flag exploratory actions as errors; time errors carefully. `[A]` for timing; `[E]` for optional-marking style.
  **Applies to** forms. **Check** `placeholder` text does not equal `label` text; no "Enter your ..." placeholders. **Source** `[A]`/`[E]`.

- **CW-29 RULE** AI-feature microcopy: label generated output as generated; say what it used ("Drafted from 14 past replies"); show a specific example prompt in empty chat inputs; never "magic", "intelligent", "smart" as a label.
  **Why** Specific provenance builds trust; vague "AI" labels repeat CW-08. `[E]`
  **Applies to** AI-SaaS UI. **Check** `copy_lint.py` soft-words (smart, magic, AI-powered). **Source** `[E]`.

### 2F. Voice and tone

- **CW-30 RULE** Define voice as 3-4 traits, each with "we are / we are not" and one example sentence (Section 11 worksheet). Voice is constant across the site; tone flexes by situation (marketing hero, onboarding, success, error, destructive, outage). Humor is allowed in marketing and success states, never in errors, billing, security, or data loss.
  **Why** Mailchimp: voice constant, tone adjusts to the reader's emotional state; plainspoken, genuine, translator, dry humor; clarity over entertainment. Google error tone: avoid humor. `[A]`
  **Applies to** all. **Check** a `voice.json` card exists (Section 11) and the LLM-judge pass scores sample sentences against it. **Source** `[A]`.

- **CW-31 RULE** One term per concept. Pick a noun (project / workspace / board) and never cycle synonyms ("dashboard ... interface ... portal ... analytics hub").
  **Why** Synonym cycling is a listed AI trope and a usability problem (users think they are different things).
  **Applies to** all. **Check** glossary in voice card; grep for banned synonyms. **Source** `[A]` tropes.fyi; `[E]`.

### 2G. AI-tell avoidance

- **CW-32 RULE** Zero banned words (FAIL list) and zero banned phrases in any copy that ships; soft-word list is reviewed, not banned. Replace by the mapping in Section 8, never by a thesaurus synonym (the next-word tell moves: "leverage" replaced "delve").
  **Why** Wikipedia's era lists show the vocabulary rotates; the durable fix is specificity.
  **Applies to** all. **Check** `copy_lint.py` exit code 0. **Source** `[A]` Wikipedia, tropes.fyi.

- **CW-33 RULE** Delete "stock closers/openers": "In today's...", "Whether you're a... or a...", "It's worth noting", "Let's dive in", "Here's the thing", "Imagine a world where", "In conclusion", "Say goodbye to X", "Welcome to the future of". Delete trailing "-ing" significance clauses ("..., ensuring seamless collaboration").
  **Why** Listed tells; they add no information and pad scannable copy (NN/g concision +58%).
  **Applies to** all. **Check** `copy_lint.py` phrase list. **Source** `[A]`.

## 3. Numbers & scales

### 3.1 Headline and slot length bands (use with `copy_lint.py` BANDS)

| Slot | Words | Max chars | Max lines 1280px / 375px | Basis |
|---|---|---|---|---|
| Hero H1, centered display | 3-9 (ideal 4-8) | 60 | 3 / 5 | median SaaS H1 = 6 words / 38 chars `[C]`; live heroes 2-9 words `[A]`; Apple 2-6 `[A]` |
| Hero H1, split / left column | 5-12 | 80 | 4 / 6 | Shapiro-style descriptive headers run to 9-10 words `[A]`; `[E]` |
| Hero H1, two-beat ("X. Y.") | 4-10 total | 60 | 2 / 4 | Ramp, Attio `[A]`; `[E]` |
| Section H2 | 2-10 | 64 | 2 / 3 | live: Attio, Notion, Cursor `[A]`; `[E]` |
| Feature / card H3 | 1-6 | 40 | 2 / 3 | Shapiro examples 2-3 words `[A]`; `[E]` |
| Eyebrow | 1-3 | 24 | 1 / 1 | live `[A]`; `[E]` |
| Subhead | 10-24 | 190 | 3 / 5 | avg ~12 words `[C]`; 10-20 `[C]` |
| Card / feature body | 12-35 | 220 | - | `[E]` |
| CTA label | 1-4 | 28 | 1 / 1 | Carbon v9 <=3 words `[B]`; live 1-4 `[A]` |
| Final CTA band H2 | 3-8 | 56 | 2 / 3 | Linear "Built for the future. Available today." / Cursor "Try Cursor now." `[A]` |
| Page `<title>` | 6-10 | 40-60 | - | NN/g 40-60 chars `[A]` |
| Meta description | 18-26 | 120-155 | - | `[E]` common practice |
| Error message | problem <=10 words; total <=2 sentences | 140 | - | Elastic "may read only the first line" `[A]`; `[E]` |
| Empty state | heading <=6 words, body 1 sentence | 120 | - | `[E]` |
| Toast | <=8 words | 60 | 1 | `[E]` |
| Tooltip | <=14 words | 100 | 2 | NN/g gives no limit `[A]`; `[E]` |
| Input label / placeholder | <=3 / <=4 words | 24 / 30 | 1 | `[E]` |

CSS aids `[E]`: `text-wrap: balance` on H1/H2/H3 (short blocks only; browsers cap the number of balanced lines), `text-wrap: pretty` on body, `max-width: 18-22ch` for display headings, `hyphens: manual`, avoid single-word last lines on desktop.

### 3.2 Live hero snapshot (fetched 2026-10-08; summarised by a small model, so re-verify with a screenshot before quoting)

| Brand | H1 | Words | Subhead | Primary CTA(s) |
|---|---|---|---|---|
| Linear | The product development system for teams and agents | 8 | Purpose-built for planning and building products. Designed for the AI era. | Get started |
| Stripe | Financial infrastructure to grow your revenue. | 6 | Accept payments, offer financial services and implement custom revenue models - from your first transaction to your billionth. | Get started / Sign up with Google |
| Notion | Where teams and agents Think together. | 6 | Capture context, find answers, and automate tasks with AI built for your team. | Get Notion free / Request a demo |
| Vercel | Agentic Infrastructure | 2 | three lines, each naming a concrete surface (API, CLI, MCP, Skills / Sandboxed VMs / PRs) | Deploy now / Talk to sales |
| Ramp | Time is money. Save both. | 5 | Cards, expenses, bill payments, and banking - in the blink of AI. | Get started for free / See a demo |
| Cursor | Cursor is your coding agent for building ambitious software. | 9 | none | Download for macOS / Get started |
| Attio | Welcome to agentic revenue. | 4 | Attio is the CRM that builds pipeline, advances deals, and grows accounts around the clock. | Start for free / Talk to sales |
| Mercury | Radically different banking | 3 | Apply online in 10 minutes to experience banking unlike anything that's come before. | Open account |
| Apple iPhone | 2-6 word fragments ("Pro further.") | 2-6 | body sentences 15-30 words | - |

Read-across `[E]`: (1) CTA labels are overwhelmingly 2-4 words and verb-led; (2) two heroes use a two-beat contrast, two use a category noun, none uses a tricolon; (3) best subheads are the ones that name the mechanism (Attio, Stripe); (4) "agents" convergence (CW-08) is the live cliché of the cycle; (5) several leaders use patterns this note warns about (Ramp "Time is money. Save both." works because the brand is product-aware; Mercury "Banking's been a headache. Now, it's a head start." is a negative-parallelism cousin) - brand awareness buys licence that a new product does not have.

### 3.3 Evidence ledger (conversion numbers; none is a law)

| Claim | Number | Grade | Caveat |
|---|---|---|---|
| Concise / scannable / objective / combined vs promotional baseline | +58% / +47% / +27% / +124% usability | `[A]` NN/g | Usability measure, not conversion |
| Users who always scan new pages | 79% (16% word-by-word) | `[A]` NN/g | older study |
| Highrise sign-up headline "30-day Free Trial on All Accounts" vs "Start a Highrise Account" | +30% | `[B]` | Headline+subhead changed together; original post not fetched |
| Tulos "Order Men's Clothing easily for bargain prices" vs "Men's Clothing" | +127% | `[C]` VWO case study | Vendor; no sample size seen |
| "Get My Free Template" vs "Get Your Free Template" | ~+90% clicks | `[B]` Expert Beacon citing Aagaard | Clicks not revenue; "Start my free" figure unverified |
| Beachway copy changes | +26% conversion | `[B]` Copyhackers page | Cause not isolated |
| Going CTA "Trial For Free" vs "Sign Up For Free" | +104% | `[C]` Unbounce marketing | vendor |
| Subhead 10-20 words vs 1-liner / paragraph | +14% / +22% | `[C]` Flint | no methodology |
| Wynter "copy has >2x influence of design" | 2x | `[C]` | no source linked |
| Suspected-AI content reduces trust ~half | ~50% | `[C]` Raptive survey (ad company) | conflicting studies show parity in credibility (Mainz, n>600 `[B]`) |

## 4. Dos and Don'ts

Constructed examples `[E]` use generic product descriptors, not real brands.

| # | Don't (and why) | Do |
|---|---|---|
| 1 | "Unlock seamless collaboration and supercharge your workflow." Banned verbs, two abstractions, could be any product. | "Turn customer emails into assigned tickets in 10 seconds." Concrete verb, noun, number (only if true). |
| 2 | "Your all-in-one solution for modern teams." Category claim + audience of everyone. | "Invoicing for freelance designers who bill by the project." Names the buyer and the job. |
| 3 | "It's not just a CRM, it's a growth engine." Negative parallelism + metaphor. | "A CRM that logs every call and email for you." Says what it does. |
| 4 | "Fast. Simple. Powerful." Tricolon of adjectives, zero information. | "Deploys in 40 seconds." Falsifiable. |
| 5 | "Learn more" x6. | "See pricing", "Read the security overview", "Compare plans". |
| 6 | Button "Submit". | "Send invoice", "Save changes", "Create workspace". |
| 7 | Error: "Oops! Something went wrong." | "We couldn't save your dashboard. Our service is unavailable, so try again in a few minutes. Your changes are kept." |
| 8 | Error: "Invalid email." | "Enter an email like name@company.com." |
| 9 | Empty: "No data." | "No invoices yet. Invoices you send appear here with their payment status. [Create invoice]" |
| 10 | Dialog: "Are you sure? [Yes] [No]" | "Delete 'Q3 plan'? This removes its 14 tasks. [Delete plan] [Keep plan]" |
| 11 | Toast: "Successfully saved!" | "Changes saved" |
| 12 | Testimonial: invented "Sarah, CEO at Acme: 'Game changer!'" | Omit the section, or render a visible `[testimonial needed]` slot tagged `data-placeholder`. |
| 13 | Stat: "Trusted by 10,000+ teams" (not in the brief). | Use the brief's number with source/date, or drop the claim. |
| 14 | Eyebrow above every section: "FEATURES", "WHY US", "HOW IT WORKS". | Eyebrow only where it adds a fact (news badge, stat, audience). |
| 15 | Section headings all "Why X / Why Y / Why Z". | Vary structure; name the benefit in each (anaphora lint). |

Source for pairs 5-11: NN/g, Google, Elastic, Apple (secondary). `[A]/[B]`

## 5. Exceptions & judgement calls

- **Brand awareness buys licence.** Apple-style fragments ("Pro further.", "Power. Fully. Fast.") and abstract lines ("Time is money. Save both.") work when the visitor already knows the product. For a new product they fail the reads-alone test (CW-04). Use them only at product-/most-aware levels, and always with a descriptive subhead. `[E]`
- **Leaders break the rules.** Linear repeats "Learn more ->"; Notion and Stripe use dashes; Attio uses "Universal Context(TM)"; Cursor drops the subhead entirely. These are observations `[A]`, not endorsements; their traffic, brand and product-led proof differ from a new site's.
- **Clever vs clear.** Stripe's docs are described as clear-not-clever with a neutral voice `[B]`; Mailchimp allows dry humor but "forced humor is worse than none" `[A]`. Marketing hero may have personality; error, billing and security copy may not.
- **First-person CTAs** (CW-20) have thin, secondhand evidence; the feel can read manipulative to formal audiences `[B]`.
- **Question headlines.** Wynter's sample report favours leading with the conclusion over a question `[C]`. Use questions only for unaware/problem-aware cold traffic or FAQs.
- **Numbers in headlines** help only when true and sourced; an invented "10x" is worse than none (CW-15). When the brief has no number, a concrete noun and verb carries specificity.
- **Banned-word lists rot.** Wikipedia's own era lists show tells rotate every ~12 months, and a source warns that suppressing one tell just relocates it. Treat `copy_lint.py` as a floor; the ceiling is the blind-reader test (CW-04) and a human read.
- **Em dash.** It is a fingerprint (medRxiv study cited by a search summary: share of Discussion sections with an em dash rose 4.23% -> 11.58% after ChatGPT `[B]`), yet real editors use it. Rule is density-based in prose and absolute in short slots (CW-11).
- **Reading level.** Elastic targets grade 9 or lower for errors `[A]`; for B2B dev tools, precise jargon is fine when the audience uses it (Resend: "email API for developers"). Plain words for people, exact terms for experts. `[E]`
- **Conflict: concision vs specificity.** If adding the specific noun makes the H1 exceed its band, move the specific part to the subhead rather than cutting it. `[E]`

## 6. Figures worth keeping

No page images (web source). Worth archiving as `examples/` screenshots: hero + first fold of Linear, Stripe, Notion, Vercel, Ramp, Cursor, Attio, Mercury (2026-10-08) annotated with pattern ids from `headline-patterns.md`; one good and one bad error message from NN/g's article (Amazon inline border+icon+red text; Kohl's non-red shipping notice); Target's same-day-shipping threshold framing as the "don't blame user" model.

## 7. Open questions

- **Not read (fetch failed or login-walled):** Apple HIG "Writing" page (returned title only; Apple claims above are from search snippets of the Alerts page and are `[B]`); Stripe docs style guide (404 at two URLs; no public Stripe voice guide found); Linear (no published copy/voice guide found); Notion voice guide (not found); Marketing Examples primary pages (404/nav only); Atlassian language pages (empty on fetch); Polaris/Shopify content (redirects to API docs); April Dunford's own site (404); Wiebe/Copyhackers primary case studies; Wynter's methodology; bigideasdb dataset (read via search summary; the page itself returned 429).
- Whether the "Mid-2026 onward" tell list on Wikipedia is stable enough to hard-code; kept as WARN rather than FAIL for `quietly`, `matters`, `practical`, `steady`, `dependable`, `prioritize`, `challenge` (they are ordinary words; flag by density, not presence).
- No controlled study found of AI-generated landing copy vs human on conversion; trust studies conflict.
- Need an A/B-validated button-label dataset; all "label X beat Y" numbers here are vendor or secondary.
- The live-hero table was extracted by a summarising model; one example (Apple iPhone naming) shows product names that should be re-verified before citing.

---

## 8. Appendix A: banned-phrase tiers, replacements, and `copy_lint.py`

### 8.1 Replacement map (use this, not a thesaurus)

| Banned / tell | Why it fails | Replace with (pattern) | Example |
|---|---|---|---|
| unlock, unleash, harness the power of | vague metaphor, no object | the concrete verb | "unlock insights" -> "see which accounts churned this week" |
| supercharge, turbocharge, level up, take to the next level | hype with no measure | a number or the thing that gets faster | "supercharge reporting" -> "build a board report in 3 clicks" |
| revolutionize, reimagine, redefine, game-changing, groundbreaking | unfalsifiable | what is different | "revolutionary scheduling" -> "scheduling that reads your calendar rules" |
| seamless(ly), effortless(ly) | claim of zero friction, nobody believes it | name the step you removed | "seamless handoff" -> "no export step; Slack threads become tickets" |
| empower, enable, equip | corporate filler verb | say what they can now do | "empowers teams" -> "lets support agents refund in one click" |
| streamline, optimize, enhance, elevate | vague improvement | the before and after | "streamline onboarding" -> "cut onboarding from 9 steps to 4" |
| leverage, utilize | formal "use" | use | "leverage your data" -> "use your CRM data" |
| robust, powerful, comprehensive, innovative, cutting-edge, state-of-the-art, world-class, best-in-class | adjectives asserting quality | a spec | "robust API" -> "REST API, 99 endpoints, webhooks with retries" |
| intuitive, user-friendly, easy, simple, simply, just | tells the reader it is easy (dismissive when it is not) | show it: "set up in 5 minutes" if true | - |
| all-in-one, one-stop shop, end-to-end | says nothing about which jobs | list the 2-3 jobs | "all-in-one" -> "quotes, contracts and invoices" |
| solution(s), platform, ecosystem, landscape, journey, workflow (soft) | abstract nouns | the actual object | "a platform for teams" -> "a shared inbox for support teams" |
| AI-powered, AI-driven, intelligent, smart, magic | category claim | what the AI does | "AI-powered insights" -> "flags invoices likely to be paid late" |
| delve, tapestry, realm, testament, pivotal, crucial, multifaceted, meticulous, vibrant, intricate | LLM vocabulary | plain word or delete | - |
| In today's fast-paced world; ever-evolving landscape | stock opener | delete; start with the claim | - |
| Whether you're a X or a Y | false inclusivity | pick the main buyer | - |
| Say goodbye to X / Say hello to Y | cliché pair | "Replace X with Y" or just state Y | - |
| Not just X, but Y; It's not X, it's Y; No X. No Y. Just Z. | negative parallelism | state Y only | "It's not a tool, it's a teammate" -> "Assigns, drafts and files tickets for you" |
| X, Y, and Z tricolon of abstractions | rule-of-three filler | keep the one with a number or object | "Faster, smarter, simpler" -> "Replies 4x faster" (if true) |
| The result? / The catch? / The kicker? | rhetorical Q + answer | state it | - |
| Imagine a world where; Think of it as | patronising framing | describe the use case | - |
| Learn more / Click here / Submit / OK | non-specific labels | verb + object | - |
| In conclusion; To sum up; At the end of the day | stock closer | delete | - |
| Trusted by thousands / Join thousands | unspecified, often unsourced | the real number + date, or nothing | - |

### 8.2 Tiers

- **FAIL (block):** FAIL_WORDS, FAIL_PHRASES, negative parallelism in short slots, em dash in short slots, generic CTA labels, placeholders left in (lorem, John Doe, Acme, TODO), repeated "Learn more".
- **WARN (review):** soft words, title-case headings, tricolon in short slots, unverified claims (must trace to brief), rhetorical-Q, exclamation, emoji, abstract-noun density, anaphora across H2s, length outside band, em-dash and tricolon density in body.

### 8.3 `copy_lint.py` (stdlib only; tested)

```python
#!/usr/bin/env python3
"""copy_lint.py - banned-phrase, structure, length and placeholder checks for site copy.
Usage:  python3 copy_lint.py page.html          (HTML)   |   python3 copy_lint.py copy.json  (slots JSON)
JSON shape: {"h1":["..."],"h2":[...],"h3":[...],"eyebrow":[...],"subhead":[...],"p":[...],"cta":[...],"li":[...]}
Exit code 1 if any FAIL. WARN never fails the build but must be reviewed.
"""
import json, re, sys
from html.parser import HTMLParser

# ---------- word / phrase lists (case-insensitive) ----------
FAIL_WORDS = r"""unlock(?:s|ed|ing)?|supercharg\w*|turbocharg\w*|revolutioni[sz]\w*|revolutionary|game[- ]chang\w*|
groundbreaking|cutting[- ]edge|state[- ]of[- ]the[- ]art|next[- ]gen(?:eration)?|world[- ]class|best[- ]in[- ]class|
seamless(?:ly)?|effortless(?:ly)?|delve\w*|tapestry|realm|paradigm|synergy|holistic|unleash\w*|
reimagin\w*|redefin\w*|elevat(?:e|es|ed|ing)|empower(?:s|ed|ing)?|harness(?:es|ed|ing)?|leverag(?:e|es|ed|ing)|
streamlin\w*|embark\w*|testament|pivotal|meticulous\w*|multifaceted|vibrant|bespoke|
one[- ]stop[- ]shop|all[- ]in[- ]one solution|at your fingertips|look no further|
level(?:ing)? up|next level|work smarter|10x"""
FAIL_PHRASES = [
    r"in today'?s (?:fast[- ]paced|digital|ever[- ](?:changing|evolving)|modern)\b[^.]{0,20}",
    r"ever[- ](?:evolving|changing) (?:landscape|world)",
    r"whether you'?re an? [^.]{1,40}\bor an? ",
    r"it'?s (?:worth|important|crucial|critical) (?:noting|to note)",
    r"welcome to the future of", r"say (?:goodbye|hello) to", r"imagine a world where",
    r"here'?s the (?:thing|kicker|catch)", r"let'?s (?:dive|break) (?:in|this down)",
    r"take (?:it|your \w+) to the next level", r"the power of\b", r"your (?:all[- ]in[- ]one|one[- ]stop)",
    r"in conclusion", r"to sum up", r"at the end of the day",
]
WARN_WORDS = r"""powerful|robust|intuitive|innovative|comprehensive|scalable|cutting|lightning[- ]fast|blazing(?:ly)?[- ]fast|
solutions?|ecosystem|landscape|journey|workflows?|end[- ]to[- ]end|mission[- ]critical|crucial|enhanc\w+|foster\w*|
accelerat\w+|optimi[sz]\w+|transform\w*|AI[- ]powered|ai[- ]driven|smart|magic\w*|simply|just|easily|easy|
very|really|truly|quietly|deeply|fundamentally|ultimate|trusted by thousands|thousands of|and more"""
ABSTRACT_NOUNS = ("solution platform experience workflow productivity efficiency collaboration innovation growth "
                  "success potential journey insights capabilities value synergy engagement visibility").split()
GENERIC_CTA = {"submit", "click here", "learn more", "ok", "okay", "yes", "no", "go", "continue", "read more",
               "more", "see more", "next", "send"}
SOFT_CTA = {"get started", "start now", "try it", "try now", "sign up", "join now"}
PLACEHOLDERS = [r"lorem ipsum", r"\bipsum\b", r"john doe", r"jane doe", r"john smith", r"jane smith", r"\bacme\b",
                r"\b123-456-7890\b", r"\b555-1234\b", r"\bcompany name\b", r"\byour (?:name|company|logo)\b",
                r"\bcustomer \d\b", r"\$XX", r"\bTBD\b", r"\bTODO\b", r"\bplaceholder\b", r"\bxxx+\b",
                r"\b(?:user|name|email)@(?:gmail|yahoo|hotmail)\.com\b", r"\btest@test\.com\b"]
UNVERIFIED = [r"\b(?:trusted|used|loved|chosen) by [\d,.]+\s?[kKmM]?\+?", r"\bjoin [\d,.]+\s?[kKmM]?\+?",
              r"\b99\.9+\s?%", r"\b\d{1,3}x (?:faster|more|better)", r"\b#1\b", r"\bnumber one\b",
              r"\b(?:rated|rating) \d(?:\.\d)?/5", r"\b\d+(?:\.\d)?\s?(?:/|out of) ?5 stars?", r"\bSOC ?2\b", r"\bHIPAA\b",
              r"\bGDPR[- ]compliant", r"\bISO ?27001"]
NEG_PARALLEL = [
    r"\bnot (?:just|only|merely|simply)\b[^.!?]{1,80}\b(?:but|it'?s|also)\b",
    r"\b(?:it|this|that)(?:'s| is) not\b[^.!?]{1,60}[,.;:—–-]+\s*(?:it|this|that)(?:'s| is)\b",
    r"\bnot (?:a|an|the)?\s?[\w -]{1,30}[,;—]\s*(?:but|rather)\b",
    r"\bno [\w -]{1,25}[.,]\s*no [\w -]{1,25}[.,]\s*(?:just|only)\b",
    r"\bnot [\w -]{1,25}\.\s*not [\w -]{1,25}\.\s*(?:just|only)?\s?\w+",
    r"\bmore than (?:just )?an? [\w -]{1,30}[,.—]\s*(?:it'?s|it is)\b",
    r"\bisn'?t (?:just )?(?:a|an) [\w -]{1,30}[,.—]\s*(?:it'?s|it is)\b",
]
RHETORICAL_Q = r"\b(?:the (?:result|catch|truth|problem|answer|kicker|difference))\?\s+[A-Z]"
TRICOLON = r"\b[\w'-]+(?: [\w'-]+){0,2}, [\w'-]+(?: [\w'-]+){0,2},? (?:and|or) [\w'-]+"
EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿]")

# ---------- length bands: (min_words, max_words, max_chars) ----------
BANDS = {
    "h1": (3, 12, 80),        # centered display 3-9 words / split hero 5-12 (see note)
    "h2": (2, 10, 64),
    "h3": (1, 6, 40),
    "eyebrow": (1, 3, 24),
    "subhead": (8, 28, 190),
    "cta": (1, 4, 28),
}

def words(s): return re.findall(r"[\w'’-]+", s)

class Extract(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.slots = {k: [] for k in ("h1","h2","h3","p","li","cta","eyebrow","subhead")}
        self.buf = []; self.cur = None; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs); cls = (a.get("class") or "").lower()
        if tag in ("script", "style", "noscript", "svg"): self.skip += 1
        if tag in ("h1","h2","h3","p","li","button") or (tag == "a" and ("btn" in cls or "button" in cls or "cta" in cls)) or a.get("role") == "button":
            self.cur = "cta" if tag in ("button","a") or a.get("role") == "button" else tag
            if "eyebrow" in cls or "kicker" in cls or "overline" in cls: self.cur = "eyebrow"
            if tag == "p" and ("subhead" in cls or "lede" in cls or "sub" == cls): self.cur = "subhead"
            self.buf = []
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg") and self.skip: self.skip -= 1
        if self.cur and tag in ("h1","h2","h3","p","li","button","a"):
            t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            if t: self.slots[self.cur].append(t)
            self.cur = None; self.buf = []
    def handle_data(self, d):
        if self.cur and not self.skip: self.buf.append(d)

def load(path):
    raw = open(path, encoding="utf-8").read()
    if path.endswith(".json"):
        j = json.loads(raw); return {k: (v if isinstance(v, list) else [v]) for k, v in j.items()}
    p = Extract(); p.feed(raw); return p.slots

def lint(slots):
    out = []  # (level, slot, rule, snippet)
    def add(l, slot, rule, s): out.append((l, slot, rule, s[:110]))
    fail_re = re.compile(r"\b(?:%s)\b" % re.sub(r"\s*\n\s*", "", FAIL_WORDS), re.I)
    warn_re = re.compile(r"\b(?:%s)\b" % re.sub(r"\s*\n\s*", "", WARN_WORDS), re.I)
    all_text = []
    for slot, items in slots.items():
        for t in items:
            all_text.append(t)
            for m in fail_re.finditer(t): add("FAIL", slot, "banned-word", m.group(0))
            for ph in FAIL_PHRASES:
                m = re.search(ph, t, re.I)
                if m: add("FAIL", slot, "banned-phrase", m.group(0))
            is_head = slot in ("h1", "h2", "h3", "eyebrow", "subhead", "cta")
            for m in warn_re.finditer(t): add("WARN", slot, "soft-word", m.group(0))
            for rx in NEG_PARALLEL:
                m = re.search(rx, t, re.I)
                if m: add("FAIL" if is_head else "WARN", slot, "negative-parallelism", m.group(0))
            if re.search(RHETORICAL_Q, t, re.I): add("WARN", slot, "rhetorical-Q-then-answer", t)
            if re.search(r"—| -- ", t): add("FAIL" if is_head else "WARN", slot, "em-dash-in-short-slot" if is_head else "em-dash (body: keep <=1 per 100 words)", t)
            if "!" in t and slot in ("h1","h2","h3","cta","subhead"): add("WARN", slot, "exclamation", t)
            if EMOJI.search(t): add("WARN", slot, "emoji", t)
            for rx in PLACEHOLDERS:
                if re.search(rx, t, re.I): add("FAIL", slot, "placeholder-left-in", t)
            for rx in UNVERIFIED:
                m = re.search(rx, t, re.I)
                if m: add("WARN", slot, "unverified-claim: must trace to brief", m.group(0))
            if slot in ("h1","h2","h3","cta","subhead","eyebrow") and re.search(TRICOLON, t): add("WARN", slot, "tricolon-in-short-slot", t)
            if slot in ("h1","h2") and len(words(t)) >= 4:
                ws = [w for w in words(t)[1:] if len(w) > 3]
                if ws and sum(w[0].isupper() for w in ws) / len(ws) >= 0.75: add("WARN", slot, "title-case-heading (use sentence case)", t)
            if slot in BANDS:
                lo, hi, mc = BANDS[slot]; n = len(words(t))
                if n < lo or n > hi or len(t) > mc: add("WARN", slot, f"length {n}w/{len(t)}c outside {lo}-{hi}w/<={mc}c", t)
            if slot == "cta":
                lab = t.lower().strip(" .!→>›»")
                if lab in GENERIC_CTA: add("FAIL", slot, "generic-cta", t)
                elif lab in SOFT_CTA: add("WARN", slot, "weak-cta (verb+object is stronger)", t)
                if t.endswith("."): add("WARN", slot, "cta-ends-with-period", t)
    head = " ".join(slots.get("h1", []) + slots.get("subhead", []))
    n_abs = sum(len(re.findall(r"\b%s\w*\b" % a, head, re.I)) for a in ABSTRACT_NOUNS)
    if n_abs >= 2: add("WARN", "h1+subhead", f"abstract-noun density {n_abs} (specificity)", head)
    if slots.get("h1") and not re.search(r"\d", head) and n_abs >= 1: add("WARN", "h1+subhead", "no digit in hero and abstract noun present", head)
    body = " ".join(slots.get("p", []) + slots.get("li", []))
    nw = max(len(words(body)), 1)
    dashes = len(re.findall(r"—| -- ", body))
    if dashes / nw * 100 > 1: add("WARN", "body", f"em-dash density {dashes}/{nw} words", "")
    tri = len(re.findall(TRICOLON, body))
    if tri / nw * 300 > 2: add("WARN", "body", f"tricolon density {tri} in {nw} words", "")
    h2s = slots.get("h2", [])
    if len(h2s) >= 4:
        starts = [w.split()[0].lower() for w in h2s if w.split()]
        if max(starts.count(s) for s in set(starts)) / len(starts) > 0.4: add("WARN", "h2", "repeated opening word across section headings (anaphora)", ", ".join(h2s[:4]))
    ctas = [c.lower() for c in slots.get("cta", [])]
    if ctas and ctas.count("learn more") >= 2: add("FAIL", "cta", "repeated 'Learn more' (NN/g: name the destination)", "")
    return out

if __name__ == "__main__":
    res = lint(load(sys.argv[1]))
    for lvl, slot, rule, s in res: print(f"{lvl:4} [{slot}] {rule}: {s}")
    fails = sum(1 for r in res if r[0] == "FAIL"); print(f"-- {fails} FAIL, {len(res)-fails} WARN")
    sys.exit(1 if fails else 0)
```

Sample run on a deliberately bad block: 14 FAIL, 12 WARN, exit 1. Sample run on `<h1>Time is money. Save both.</h1>` + eyebrow + button: 0 FAIL, 1 WARN.

### 8.4 Playwright headline measurement (line count, words, chars)

```js
// page.evaluate(() => ...) - returns one row per heading/CTA
(() => {
  const rows = [];
  const lines = (el) => { const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; return Math.round(el.getBoundingClientRect().height / lh); };
  for (const el of document.querySelectorAll('h1,h2,h3,[class*=eyebrow],[class*=kicker],button,a[class*=btn],a[class*=button]')) {
    const t = el.innerText.trim().replace(/\s+/g, ' '); if (!t) continue;
    rows.push({ tag: el.tagName.toLowerCase(), text: t, words: t.split(' ').length, chars: t.length, lines: lines(el),
                vw: innerWidth, fontPx: parseFloat(getComputedStyle(el).fontSize), emDash: /—/.test(t) });
  }
  return rows;
})()
// Fail if: h1.lines > 3 at 1280 or > 5 at 375; h1.words outside band; any h1/h2/button emDash; orphan: last line one word on desktop (compare Range rects).
```

### 8.5 Blind-reader comprehension test (LLM-judge prompt, `[E]`, inspired by Wynter's clarity scoring `[C]`)

Give a fresh model/person only the H1 + subhead + CTA. Ask: (1) What does this product do? (2) Who is it for? (3) What would I use instead? (4) What happens when I click the button? Score 0-2 each. Ship at >=6/8 with (1) and (2) both 2. Re-run the same probe with the logo and nav stripped. Wynter itself is a paid panel service; its published "2x" and sample-size claims could not be verified `[C]`.

---

## 9. Appendix B: believable sample data (product mockups, demo UI)

Goal: numbers, names and dates that stay coherent across KPI cards, charts, tables and toasts, without inventing real customers or claims.

### 9.1 Principles

1. **One world, many views.** Define a `world.json` once; every number on the page is computed from it. Never type a figure into a component.
2. **Anchor date.** Pick `today` (use the system date) and express all timestamps relative to it; derive weekdays by code, never by hand.
3. **Plausible, not pretty.** Real data has long tails, odd numbers (1,284 not 1,000), uneven digits, small deltas (+3.2%, -0.8%), seasonality (weekends dip), and a few awkward rows (long name, missing value, failed status).
4. **Reserved identifiers only.** Emails `@example.com/.org/.net` or `.test/.example/.invalid` (RFC 2606 `[A]`); phone `555-0100` to `555-0199` (NANPA keeps these reserved for entertainment/advertising; other 555 numbers are assignable `[A]`); IPs `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` (RFC 5737 `[A]`); card number: use the payment provider's published test numbers only (e.g., Stripe `4242 4242 4242 4242`, `[E]` from prior knowledge, verify in provider docs).
5. **No real customers.** No real company logos, no real person photos as "customers", no celebrity names. Use invented company names built from two unrelated common words or a coined stem, then sanity-check by a web search; render logos as plain wordmarks in the display font, flagged as placeholders.
6. **No invented claims that could ship.** Hero stats, logo walls, testimonials, review stars, certifications (SOC 2, HIPAA, GDPR, ISO) must come from the brief. If absent, omit, or render `[proof needed]` and set `data-placeholder="true"` so a pre-ship lint fails (FTC: fake or false testimonials are prohibited; a site that displays them is disseminating them `[A]`).
7. **Product-UI numbers are not marketing claims.** A dashboard mockup may show "MRR $48,320"; the headline must not claim "grow revenue 48%". Keep UI sample data visibly mundane and keep it out of copy.

### 9.2 `world.json` template (fill, then generate all views from it)

```json
{
  "today": "2026-10-08",
  "company": { "name": "Fernlight Labs", "domain": "fernlight.example", "founded": 2021, "timezone": "America/New_York" },
  "plans": [ { "id": "team", "price_month": 29 }, { "id": "business", "price_month": 79 } ],
  "accounts": { "total": 1284, "paying": 412, "mix": { "team": 0.68, "business": 0.32 } },
  "mrr": "derive: sum(paying * mix * price)",
  "growth_30d": { "new": 63, "churned": 21, "net_pct": "derive" },
  "people": [
    { "name": "Maya Okafor", "role": "Head of Support", "email": "maya.okafor@example.com" },
    { "name": "Tomasz Kowalczyk", "role": "Engineer", "email": "tomasz.kowalczyk@example.com" },
    { "name": "Linh Nguyen", "role": "Finance Lead", "email": "linh.nguyen@example.com" }
  ],
  "stress_rows": [ "very long customer name that wraps onto two lines in a table cell", "", "Zoë Öztürk" ]
}
```

### 9.3 Coherence rules

| Check | Rule | Example |
|---|---|---|
| Totals | Table row values sum to the KPI shown; chart end-point equals KPI | 3 plan rows sum to MRR |
| Splits | Percentages in a complete split sum to 100 | 68% + 32% |
| Deltas | Sign, arrow, color and period agree; delta% = (now-before)/before | "+4.1% vs last 30 days" |
| Relative time | "2 hours ago" matches the timestamp relative to `today` | - |
| Weekdays | "Tue, Oct 14" is a Tuesday in the stated year | script-checked |
| Currency / locale | One currency and number format per page; `font-variant-numeric: tabular-nums` | $48,320.17 |
| Names | Mix of origins; no stock names; roles match the product's real personas; 1 long, 1 short, 1 non-ASCII | "Zoë Öztürk" |
| IDs | Unpredictable but stable (`INV-20418`), unique, non-sequential gaps | - |
| Status mix | ~70% healthy, 20% pending, 10% failed/overdue; never all green | - |
| Text content | Realistic titles ("Reconcile September card spend"), not "Task 1" | - |
| Volume | Enough rows to show scroll/pagination, not 3 identical rows | - |

### 9.4 Do-not-use list

`John Doe`, `Jane Smith`, `Acme`, `Lorem ipsum`, `Customer 1`, `test@test.com`, `123-456-7890`, `555-1234`, `Company Name`, round `$1,000,000`, `99.9%`, `10x`, `#1`, `Trusted by 10,000+`, real brand logos, stock-photo faces labelled as customers, `@gmail.com` addresses.

### 9.5 `data_lint.py` (stdlib only; tested)

```python
#!/usr/bin/env python3
"""data_lint.py - sample-data coherence checks. Usage: python3 data_lint.py page.html [--year 2026]"""
import re, sys, datetime
txt = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", open(sys.argv[1], encoding="utf-8").read())
txt = re.sub(r"<[^>]+>", " ", txt)
year = int(sys.argv[sys.argv.index("--year") + 1]) if "--year" in sys.argv else datetime.date.today().year
issues = []
MON = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
DOW = "Mon Tue Wed Thu Fri Sat Sun".split()
# 1. weekday/date pairs must agree ("Tue, Oct 14" / "Tuesday, October 14")
for m in re.finditer(r"\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*\.?,?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:,?\s+(\d{4}))?", txt):
    y = int(m.group(4)) if m.group(4) else year
    try: d = datetime.date(y, MON.index(m.group(2)) + 1, int(m.group(3)))
    except ValueError: issues.append(f"impossible date: {m.group(0)}"); continue
    if DOW[d.weekday()] != m.group(1): issues.append(f"weekday mismatch: '{m.group(0)}' is a {DOW[d.weekday()]} in {y}")
# 2. reserved-for-fiction identifiers only
for m in re.finditer(r"[\w.+-]+@([\w-]+\.[a-z.]+)", txt, re.I):
    dom = m.group(1).lower()
    if not (dom in ("example.com", "example.org", "example.net") or dom.endswith((".test", ".example", ".invalid"))): issues.append(f"real-looking email domain: {m.group(0)}")
for m in re.finditer(r"\(?\b(\d{3})\)?[ .-](\d{3})[ .-](\d{4})\b", txt):
    if not (m.group(2) == "555" and m.group(3).startswith(("01"))): issues.append(f"phone not in 555-0100..0199: {m.group(0)}")
for m in re.finditer(r"\b(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\b", txt):
    if ".".join(m.groups()[:3]) not in ("192.0.2", "198.51.100", "203.0.113"): issues.append(f"IP not in RFC 5737 doc ranges: {m.group(0)}")
# 3. suspicious round numbers (real data is rarely round)
nums = [n.replace(",", "") for n in re.findall(r"(?<![\w.])\d{1,3}(?:,\d{3})+(?![\w])|(?<![\w.,])\d{3,}(?![\w,])", txt)]
nums = [n for n in nums if not (1900 <= int(n) <= 2100)]
if len(nums) >= 6:
    rnd = sum(1 for n in nums if n.endswith("00"))
    if rnd / len(nums) > 0.4: issues.append(f"{rnd}/{len(nums)} large numbers end in 00 (looks invented)")
# 4. percentages that claim to be a complete split should sum to 100
pcts = [float(p) for p in re.findall(r"(\d+(?:\.\d+)?)\s?%", txt)]
if 3 <= len(pcts) <= 6 and 97 <= sum(pcts) <= 103 and abs(sum(pcts) - 100) > 0.6: issues.append(f"split percentages sum to {sum(pcts):.1f}, not 100")
# 5. stock names
for pat in (r"John Doe", r"Jane Doe", r"John Smith", r"Jane Smith", r"\bAcme\b", r"Lorem", r"Customer \d", r"User \d", r"\bTest User\b"):
    if re.search(pat, txt): issues.append(f"stock placeholder: {pat}")
print("\n".join(issues) or "ok"); sys.exit(1 if issues else 0)
```

Checks weekday/date pairs, real-looking email domains, phones outside 555-0100..0199, non-documentation IPs, suspiciously round large numbers (>40% ending 00), stock names. Percent-split and relative-time checks need the structured `world.json`; implement alongside the generator.

---

## 10. Appendix C: CTA cheat-sheet

| Context | Label formula | Good | Avoid |
|---|---|---|---|
| Hero primary, self-serve | Start + noun / Get + outcome | "Start free trial", "Get Notion free", "Deploy now" | "Get started" alone (weak), "Submit" |
| Hero secondary, sales-led | Book/See + object | "Book a demo", "See a demo", "Talk to sales" | "Contact us" (vague) |
| Product-aware, return visitor | Offer-led | "Switch in days, not months" (Ramp), "Start free" | long sentences |
| Download | Download for + platform | "Download for macOS" (Cursor) | "Download" if platform varies |
| Pricing plan card | Choose/Start + plan name | "Start Team plan", "Talk to sales" (enterprise) | "Select" |
| Feature section link | Name the destination | "Read the routing guide" | "Learn more", "Read more" |
| Form submit | Verb that completes the form | "Create account", "Send message", "Save changes" | "Submit" |
| Final CTA band | Repeat the hero primary | "Start free trial" | a new label (confuses) |
| Destructive | Verb + object, `destructive` style | "Delete project" | "Yes", "Confirm" |
| Cancel | "Cancel" or "Keep [object]" | "Keep editing" | "No" |
| Government / service start | "Start now" + one button | GOV.UK start page `[A]` | two buttons on one page |
| Lead magnet / claim | first-person test | "Get my free template" `[B]` | testing without a control |

Structure rules: sentence case; 1-4 words (Carbon v9: <=3 `[B]`); no trailing period; no arrow glyph inside the label (use an icon); icon-only buttons need an accessible name and an exposed label on hover/focus (Carbon `[B]`); loading label = progressive verb ("Saving...", "Sending invoice..."); disabled state keeps label, adds reason in helper text.

Pairing by awareness `[E]`: unaware -> content CTA ("See the 2-minute tour"); problem -> "See how it works"; solution -> "Start free"; product -> "Start free" + "Compare plans"; most -> "Start free" / "Buy now" / offer.

## 11. Appendix D: microcopy cheat-sheet

| Element | Formula | Good | Bad |
|---|---|---|---|
| Error, field | Say what is needed, with example | "Enter an email like name@company.com." | "Invalid email." |
| Error, system | Problem -> cause -> fix | "We couldn't save your dashboard. Our service is unavailable. Try again in a few minutes; your changes are kept." | "Oops! Something went wrong." |
| Error, permission | State the rule + who can fix | "Only workspace admins can invite people. Ask Maya Okafor for access." | "Forbidden." |
| Warning | Consequence first | "This removes 14 tasks for everyone." | "Are you sure?" |
| Success toast | Past-tense result | "Invoice sent to Maya Okafor" | "Successfully sent!" |
| Empty, first run | Status + teaching line + action | "No invoices yet. Invoices you send appear here with payment status. [Create invoice]" | "No data" |
| Empty, no results | Echo query + fix | "No results for 'refunds'. Try a shorter word or clear filters. [Clear filters]" | "Nothing found." |
| Loading | Name the work | "Importing 1,284 contacts..." | "Loading..." |
| Tooltip | Why/what, not label | "Hidden from customers" | "Visibility" on the Visibility icon |
| Placeholder | Realistic example | "name@company.com" | "Enter your email" |
| Helper text | Format/limit before error | "8+ characters, one number" | (nothing, then red error) |
| Confirmation dialog | Title = object; body = consequence | "Delete 'Q3 plan'? This removes its 14 tasks." | "Confirm action" |
| Onboarding step | Progress + one task | "Step 2 of 4: Connect your inbox" | "Welcome aboard!!" |
| Destructive undo | Offer undo instead of confirm where reversible | "Task archived. Undo" | blocking dialog |
| Paywall / limit | Plain limit + next step (state caps up front) | "You've used 50 of 50 free exports this month. Upgrade for unlimited." | "Oops, limit reached!" |
| Link | NN/g 4 Ss: specific, sincere, substantial, succinct | "Get 5 tips for improving collaboration" | "Learn more" |
| AI output label | Provenance | "Draft from 14 past replies. Review before sending." | "Magic reply" |
| Outage | Own it, status, ETA | "Exports are delayed. We're working on it; status page has updates." | joke or Fail-Whale-style whimsy (NN/g notes it only works when memorable and rare) |

## 12. Appendix E: voice-definition worksheet

Fill in once per brand; store as `system/voice.json`. Everything downstream (headline picks, microcopy tone, lint thresholds) reads it.

1. **Product truth (1 sentence).** "We help [role] do [job] without [bad alternative]." Alternatives list (min 2).
2. **Audience + awareness.** Role, seniority, expertise level (can I use jargon?), awareness level of the main traffic, reading context (desk, phone, in a hurry).
3. **Voice traits (3-4).** For each: `trait`, `we are`, `we are not`, `sample sentence`. Calibration from Mailchimp: Plainspoken (clarity over hype), Genuine, Translator (simple over jargon), Dry humor (never forced). Write three of your own; avoid empty traits (innovative, passionate, bold).
4. **Slider positions (1-5):** formal <-> casual; serious <-> playful; technical <-> plain; reserved <-> enthusiastic; terse <-> explanatory.
5. **Tone map.** One row per situation: hero, feature, pricing, onboarding, success, error, destructive confirm, security/billing, outage. Columns: reader emotion, tone words, humor yes/no, max length.
6. **Lexicon.** Product nouns (one term per concept, with banned synonyms), verbs for core actions, preferred words ("use", not "leverage"), banned words (start from Section 8), brand-specific no-go claims (legal/compliance).
7. **Mechanics.** Casing (sentence case default); contractions (yes/no); Oxford comma; numerals (digits for 10+ and all UI numbers); dates ("Oct 8, 2026"); times (12h/24h); currency; em-dash policy (zero in short slots); exclamation policy (0 in UI, <=1 per page in marketing); emoji policy.
8. **Rhythm.** Target sentence length 10-18 words; fragments allowed in headlines only; one idea per sentence; one CTA verb vocabulary.
9. **Calibration pass.** Write the same message four ways (hero, error, success toast, empty state). Run: (a) swap-the-logo test - could a competitor print this? (b) blind-reader test (Section 8.5) (c) `copy_lint.py` exit 0.
10. **Sign-off.** Three sample headlines in voice, three out-of-voice rewrites, three CTA labels, one error, one empty state.

```json
{
  "voice": {
    "traits": [
      { "name": "plainspoken", "we_are": "say the thing, with the number", "we_are_not": "hype or metaphor", "sample": "Send invoices in two clicks." },
      { "name": "dry", "we_are": "understated, one wink per page max", "we_are_not": "jokey in errors or billing", "sample": "Your spreadsheet had a good run." },
      { "name": "precise", "we_are": "exact nouns and units", "we_are_not": "vague plurals", "sample": "14 tasks, not 'some items'." }
    ],
    "sliders": { "formal_casual": 3, "serious_playful": 2, "technical_plain": 4, "reserved_enthusiastic": 2, "terse_explanatory": 2 },
    "tone": {
      "hero": { "humor": "light", "max_words": 9 },
      "error": { "humor": "none", "structure": "problem|cause|fix", "apology": "only if our fault" },
      "success": { "humor": "light", "max_words": 8 },
      "destructive": { "humor": "none", "button_pattern": "verb+object" }
    },
    "lexicon": { "use": ["workspace", "project"], "never": ["dashboard", "portal", "solution", "leverage", "seamless"] },
    "mechanics": { "case": "sentence", "contractions": true, "oxford_comma": true, "em_dash_short_slots": 0, "exclamations_ui": 0 }
  }
}
```

---

## Source list (for traceability)

- Julian Shapiro, landing page guide: julian.com/guide/growth/landing-pages `[A]`
- NN/g: error-message-guidelines, better-link-labels, how-users-read-on-the-web, empty-state-interface-design, tooltip-guidelines, ok-cancel-or-cancel-ok, microcontent headline article `[A]`
- Mailchimp Content Style Guide: styleguide.mailchimp.com/voice-and-tone `[A]`
- Google tech-writing error tone; Elastic EUI error messages; GOV.UK start-using-a-service pattern `[A]`
- FTC Consumer Reviews and Testimonials rule Q&A (16 CFR Part 465) `[A]`
- Wikipedia: Signs of AI writing (word lists, structure tells, era lists); tropes.fyi directory (49 tropes) `[A]`
- RFC 2606 (example.com/net/org, .test/.example/.invalid/.localhost) `[A]`; RFC 5737 and NANPA 555-01xx `[B]` (search results)
- Live homepage fetches 2026-10-08: linear.app, stripe.com, notion.com, vercel.com, ramp.com, cursor.com, attio.com, mercury.com, resend.com, apple.com/iphone `[A]` (small-model extraction; re-verify)
- Harry Dry rules via literaryloop.substack.com digest `[B]`; Dunford via secondary summaries `[B]`; Schwartz via secondary summaries `[B]`; Wiebe via Wistia/Weidert/Copyhackers snippets `[B]`; Wynter via vendor pages `[C]`; Landing Doctor teardowns of Cursor/Vercel `[C]`; bigideasdb 5,000-headline analysis, process.st, Flint `[C]`; Highrise 30% via search summaries `[B]`; VWO/Tulos `[C]`
