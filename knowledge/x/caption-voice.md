---
source: web:x.com via api.fxtwitter.com (public FixTweet mirror, no login): the four Larpo founders @augustasdesign (358 originals, Jul 2025 - Oct 2026), @faulkner_Design (24), @rokasrem (30), @marius_vanagas (1), with @marcelkargul and @_heyrico as the comparison set + knowledge/larpo/larpo-brand-and-constraints.md (LBC-04, 07, 27, 40-46) + knowledge/web/x-design-posts.md (XP-13, 14, 18, 19)
chapter: Caption voice for the founders' X accounts: one lowercase voice per founder, rules, Augustas's own patterns, and 14 caption templates per format
pages: n/a (web; captured 2026-10-22; evidence in knowledge/benchmarks/x-strategy-2026-10/)
topic_tags: [x, captions, copywriting, voice, lowercase, founders, larpo, augustasdesign, templates, series, concept-disclosure]
status: studied
---

# Caption voice: how each founder writes, and what to write under each format

Credits: the captions quoted here are the founders' own posts on their own accounts (Augustas, Faulkner, Rokas, Marius). Marcel Kargul and rico are the comparison set and are summarised, not quoted. The templates in section 5 are the engine's own phrasing, written from the patterns, not copied from anyone. Data: `knowledge/benchmarks/x-strategy-2026-10/data/`; strategy: `knowledge/x/x-strategy.md` (XS-20..24).

"rel" = likes divided by the account's median likes on media posts in the same era.

## 0. The one-paragraph answer

Every founder account writes **lowercase, short, and concrete**, but each has its own job so the same project never reads the same twice. **@augustasdesign is the maker's reaction**: the UI part plus one feeling, 4-8 words, at most one emoji at the end ("the most detailed dashboard I've ever built 👀", his best design post since August at 17.6x). **@faulkner_Design is the decision**: what the design chose and what it gave up, two short statements, no emoji. **@rokasrem is the detail**: one concrete thing he made, in first person, plus the plain concept label. **@marius_vanagas is the category contrast**: what most products in the category do, and what this one does instead, in one longer line. Shared rules: name the UI part, never the fictional brand; "concept" on fictional work; no questions, links, @mentions or hashtags in the caption; no money or outcome claims on concepts; one line break at most; never the same caption or the same three-word run on two accounts.

## 1. Method and limits

- Every original post of the four founder accounts the mirror returned (Augustas from 19 Jul 2025; the co-founders from their first post of this run), with likes, views and bookmarks. Augustas has two eras: era 1 (19 Jul 2025 - 3 Mar 2026, 333 originals, sentence case with growth hooks and a link reply on every post) and the current era (23 Aug - 20 Oct 2026, 25 originals, lowercase).
- Only Augustas's account has enough reach to rank captions (era 1 n=321 media posts, median 121 likes; now n=24, median 46.5). The co-founders (4 followers, medians 1-3 likes) give voice evidence, not performance evidence.
- Hook classes are regexes (`_scripts/analyze.mjs`, the era-1 cut in `x-strategy.md`); a caption can sit in several classes.

## 2. Core ideas

1. **Augustas already writes the right register now.** Current era: 96% lowercase, median 4 words / 28 characters, 24% with one emoji, 0 hashtags, 4% with a link. Era 1 was the opposite (2% lowercase, 22% questions, a CTA link reply on 239 of 251 replies) and Larpo's doctrine has since moved to plain labels (LBC-40..44). [D][LBC]
2. **Naming the UI part is the strongest caption move on his account.** Era 1: captions naming a UI part 1.22x vs 0.85x without (n=118); dashboard 2.05x (bookmarks 3.58x), sidebar 2.49x, hero 1.21x, footer 0.98x, bento/card 0.73x, pricing 0.36x. [D]
3. **One judgement word helps; a bare label does not.** Superlatives ("cleanest", "most", "ever", "perfection") 1.22x (n=43); 1-3 word captions 0.72x (n=65) and 0.74x now (n=8); 7-10 words 1.16x (n=79) and 1.18x now (n=5); over 20 words 0.60x. [D]
4. **Questions, recaps, mentions and promos cost him reach.** Current-era questions 0.69x (n=6, e.g. "clean dark hero / thoughts?" 0.32x); @mentions 0.53x (n=17); Lunor promos 0.33x (n=14); link in the caption 0.33x (n=14). [D]
5. **Follow-up captions point back.** His animated quote "animated it's even cooler 🔥" (7.7x) works because the quoted still is right under it; the bare "animated 👀" on a weak still did 0.47x. The caption of a follow-up names the relation (now moving, the full view, in thirds), never re-describes the whole thing. [D]
6. **The co-founders already have distinct voices; they drift toward each other.** Faulkner moved from teardown lines to plain labels to sentence-case opinion + one-word question within six weeks; Rokas rotates eight templates, three of them questions. Without a fixed voice each account would collapse into "hero section concept". [D]

## 3. Rules

- **RULE CV-01** Write every caption fully lowercase, acronyms included (saas, ai, ui, crm), "i" included; real proper nouns of tools keep their case only in the reply.
  **Why** Larpo copy is lowercase with acronyms (LBC lowercase rule, 2026-08-26); Augustas's current voice is 96% lowercase and the founder asked for an all-lowercase voice; his two capital "I"s are the only drift.
  **Applies to** all four accounts. **Check** caption matches `^[^A-Z]*$`. **Source** `augustasdesign.json` current era; LBC lowercase-acronyms decision.

- **RULE CV-02** Name the UI part and the plain product domain ("payroll dashboard", "edge hosting hero"); never the fictional brand name, never the client's name unless the work is real and approved.
  **Why** UI-part captions 1.22x vs 0.85x; dashboards 2.05x, sidebars 2.49x; LBC-41 (no fictional brand name).
  **Applies to** all accounts. **Check** caption contains a UI noun from the template list; no proper name from the build's brand. **Source** era-1 caption cut; LBC-41.

- **RULE CV-03** Keep each voice's length: Augustas 4-8 words, Rokas 6-10, Faulkner 6-14 (two statements), Marius 12-25 (one contrast line).
  **Why** Augustas: 7-10 words 1.16-1.18x, 1-3 words 0.72-0.74x, 21+ 0.60x; the co-founders' measured medians are 8 (Rokas), 6.5 (Faulkner) and 28 (Marius) and their roles need the room.
  **Applies to** all accounts. **Check** word count inside the voice's band. **Source** `_analysis.json.*.captions`.

- **RULE CV-04** Allow at most one judgement word per caption, and only on Augustas's account ("clean", "detailed", "cute", "too clean", "next level", "the most ... i've built"); the co-founders state decisions and details, not verdicts.
  **Why** Superlatives 1.22x on Augustas's era 1 (n=43), but a feed where four accounts call the same work "the cleanest" reads as a ring; separate jobs keep the accounts credible.
  **Applies to** all accounts. **Check** co-founder captions contain no word from {clean, cleanest, best, most, perfect, perfection, insane, next level, ever}. **Source** era-1 hook cut; XS-19.

- **RULE CV-05** Never end with a question or offer a choice ("a or b?", "light or dark?", "thoughts?", "overkill?"); state both options as a fact instead ("same hero, two color fields").
  **Why** Current-era questions 0.69x; X-wide 0.5x (XP-14); binary questions and recaps at the bottom of Larpo's reach table (LBC-44).
  **Applies to** all accounts. **Check** no "?" in the caption. **Source** XS-21; XP-14; LBC-44.

- **RULE CV-06** Augustas may end with one emoji from his own set (👀 🔥 😍 🫠 🥹); the co-founders use none; no hashtags anywhere.
  **Why** Emoji is neutral on his account (0.86-1.01x) and part of his voice; the co-founders have used none in 55 posts, which keeps the voices apart.
  **Applies to** all accounts. **Check** emoji count <= 1 and last for Augustas, 0 for the others; `#` count 0. **Source** `_analysis.json.*.captions.emojiFreq`; XS-23.

- **RULE CV-07** Keep links, credits and "made with" out of the caption; the first self-reply carries them, 30-150 minutes later, in the same voice (templates R1-R4 below).
  **Why** Link in the caption 0.33x vs link in a reply 1.02x; @mentions 0.53x (Augustas era 1). XP-18.
  **Applies to** all accounts. **Check** no url, no "@" in the caption; reply present. **Source** XS-22.

- **RULE CV-08** Mark fictional work with the word "concept" in the caption (or, for Augustas's single-word-label posts, in the first reply), and never write from inside the fiction ("we launched", "our users").
  **Why** LBC-27 (concept disclosure), LBC-42 (no caption from inside the fiction); the label did not cost reach: Augustas "hero section concept" 1.74x, Faulkner's concept captions 1.17x vs 1.00x.
  **Applies to** concept work on all accounts. **Check** "concept" in caption or first reply; no first-person-plural product claims. **Source** LBC-27, LBC-42; `faulkner_Design.json`.

- **RULE CV-09** No money, client or outcome claims on concept work; on real client work, one true client line a week at most and only on Augustas's account.
  **Why** Money and client captions scored 1.35x and 1.19x in era 1 (n=22, 20), and they are what Larpo forbids when unevidenced (LBC-45).
  **Applies to** all accounts. **Check** no "$", "€", "k/mo", "client" on concept posts. **Source** era-1 hook cut; LBC-45.

- **RULE CV-10** Never copy a caption between accounts: the same project gets a different template per account, and two captions posted on the same day share no three-word run.
  **Why** Identical captions across a small network read as coordinated and earn "not interested" signals (XP section 6.2); voices exist so the series can travel through four accounts.
  **Applies to** cross-account plans. **Check** no shared word trigram between any two same-day captions; template ids differ per account for one project. **Source** XS-19.

- **RULE CV-11** Use at most one line break, to split the label from a second beat ("another day,\n\nanother clean hero design"); no bullet lists except a spec post (template T14).
  **Why** Augustas's line-broken captions are his own rhythm; list captions are the spec format (rico cheatsheets RD-36), not a showcase caption.
  **Applies to** all accounts. **Check** newline count <= 2 characters (one blank line); lists only in T14. **Source** `augustasdesign.json`.

- **RULE CV-12** Keep Larpo's banned words and punctuation out: no em dashes, no "world-class", "premium", "innovative", "immersive", "full-service", "product design studio".
  **Why** LBC-04 and LBC-07; era 1 used "world-class" and "premium" in its giveaway posts.
  **Applies to** all accounts. **Check** regex for the word list and "—" returns 0. **Source** LBC-04, LBC-07.

- **RULE CV-13** Follow-up captions name the relation to the earlier post in 2-5 words (now moving, the full view, in thirds, up close, two weeks on) and quote it, instead of describing the work again or numbering it "part 2".
  **Why** "animated it's even cooler 🔥" as a quote ran 7.7x; series quotes are the benchmarks' default (XS-16); a numbered series label works on X (XP-19, 2.95x, n=6) but the relation words carry the same cue in the founders' voice.
  **Applies to** series steps 2+. **Check** caption contains a relation phrase from T10-T13 and the post quotes an earlier series post. **Source** `_series.json`; XS-16; XP-19.

## 4. The four voices

### 4.1 Voice table

| Account | Role in a series | Register | Length | Emoji | Never |
|---|---|---|---|---|---|
| @augustasdesign | the reaction: shows the piece and says how it feels | "{judgement} {ui part}" or "this {ui part} is {judgement}" | 4-8 words | <= 1 at the end (👀 🔥 😍 🫠 🥹) | questions, recaps, links, @, brand names |
| @faulkner_Design | the decision: what the design chose and what it gave up | two short statements, first the choice, then the trade | 6-14 words | none | verdict words, questions ("overkill?") |
| @rokasrem | the detail: one concrete thing he made, first person | "i {verb} the {element} {how}" or "{domain} {ui part}, {variant}. concept." | 6-10 words | none | a/b and light-or-dark questions, verdict words |
| @marius_vanagas | the contrast: the category habit vs this design | "most {category} {habit}. this one {difference}." | 12-25 words | none | verdict words, first person |

### 4.2 Augustas's own posts (his words) and how they did

Current era (lowercase; median 46.5 likes):

| Caption | Format | Likes / views / bookmarks | rel |
|---|---|---|---|
| "the most detailed dashboard I've ever built 👀" | 3-up vertical thirds | 819 / 37,574 / 706 | 17.6x |
| "animated it's even cooler 🔥" (quote of the above, 1.5 days later) | 5 s video | 359 / 11,804 / 352 | 7.7x |
| "incredibly detailed hero design" | single 16:10 | 157 / 5,187 / 103 | 3.4x |
| "light dashboard design" | 2-up 4:5 pair | 106 / 5,071 / 98 | 2.3x |
| "hero section concept" | single | 81 / 2,544 / 23 | 1.7x |
| "this hero is too clean" | single | 81 / 2,647 / 40 | 1.7x |
| "another design session / on 5-fig client work" | single portrait | 74 / 2,274 / 26 | 1.6x |
| "the detail in this hero is next level" | single | 47 / 1,451 / 14 | 1.0x |
| "cute component design" | single 1:1 | 37 / 1,033 / 16 | 0.8x |
| "always animating my heroes 😍" (quote, same hour) | video | 22 / 1,650 / 8 | 0.5x |
| "minimal card design" | single | 21 / 953 / 7 | 0.5x |
| "clean dark hero / thoughts?" | single | 15 / 1,119 / 4 | 0.3x |
| "hero section design" | single | 13 / 2,106 / 1 | 0.3x |

Era 1 (sentence case; median 121 likes), the patterns that carried: "Just built the cleanest dashboard ever" (1,299 likes), "The cleanest sidebar design ever!" (693 likes, 384k views), "This sidebar is too clean" (455), "glassmorphic AI chat design / clean?" (814), "The coolest dashboard design I've ever done 👀" (647). The ones that sank: Lunor promos, @-credits in the caption, "Before → After" redesigns of his own old work (0.57x, n=16), long story posts over 20 words (0.60x).

What to keep from him: the UI noun up front; "too clean", "detailed", "the most ... i've built" as the one judgement; 👀 for a reveal, 🔥 for motion; the line break before a second beat. What to drop: the question tail, "another day, another hero design" and "daily hero design inspiration" as daily fillers (1.01x era 1; 0.99x and 0.52x now), bare two-word labels.

### 4.3 The co-founders (their words)

- **@faulkner_Design** (24 posts, median 6.5 words, 75% lowercase, 0 emoji): started with teardown lines ("you can sell a camera without naming a single spec."), moved to plain labels ("hero section concept, ai image search", "landing page concept for a writing tool"), then to sentence-case opinions with a one-word question ("Every claim wired to its source. Overkill?"). Keep the first two moves; drop the question tail and the capitals. His strongest material is the decision: "same product, different structure. concept."
- **@rokasrem** (30 posts, median 8 words, 100% lowercase, 0 emoji, 20% questions): rotates templates on a fixed 15:00 / 21:00 schedule: "landing page concept for a {domain} tool", "if {technical thing} had a landing page. concept.", "our hero, rebuilt as a {object}", "i set the headline as {thing}", "a or b? same hero, different color field", "{domain} hero, light or dark?". Keep the first-person detail ("i hung the cta on the key cabinet as the next tag to review") and the playful "if ... had a landing page"; retire the a/b and light-or-dark questions.
- **@marius_vanagas** (1 post this year, 28 words, lowercase): "most saas heroes open by showing the interface. this one shows nothing of the product at all..." This is the contrast voice; give it to him alone so it does not overlap with Faulkner's decision voice.

## 5. Caption templates (engine phrasing)

Placeholders: `{ui}` the UI part (dashboard, sidebar, inbox, calendar, onboarding, settings, hero, pricing, faq, footer, changelog, testimonials), `{domain}` the plain product domain (payroll, edge hosting, lab results, field ops), `{detail}` one concrete element (the latency chart, the region map, the approval chip), `{n}` a true count from the design. Add "concept" where CV-08 asks. Pick one row per post; one account per column.

| # | Format | @augustasdesign | @faulkner_Design | @rokasrem | @marius_vanagas |
|---|---|---|---|---|---|
| T01 | close-up (component or region, day 0) | "{detail}, up close 👀" | "the {detail} does the work. everything around it stays quiet." | "i drew the {detail} so it reads at a glance. concept." | "most {domain} tools bury the {detail} two clicks deep. this one leaves it in plain sight." |
| T02 | full dashboard (single) | "{domain} dashboard, all of it" | "{n} panels, one question: {question as a statement}." | "{domain} dashboard, full view. concept." | "most {domain} dashboards start with totals. this one starts with what changed since yesterday." |
| T03 | 3-strip carousel (vertical thirds) | "one {domain} dashboard, in thirds 👀" | "left to right: {a}, {b}, {c}. read in that order." | "the {domain} dashboard cut in three. concept." | "split into thirds you can see the order it is read in: {a}, then {b}, then {c}." |
| T04 | hero (single) | "{judgement} {domain} hero" (e.g. "detailed edge hosting hero") | "{layout} hero. the product sits {where}, the headline stays short." | "{domain} hero, {variant} version. concept." | "most {category} heroes open with a slogan. this one opens with the product doing its job." |
| T05 | hero, light and dark pair | "{domain} hero, light and dark" | "two modes, one layout. the {detail} holds in both." | "same hero, two color fields. concept." | "dark mode is usually an afterthought. here both modes were drawn from the same grid." |
| T06 | bento section | "{n} bento cells for a {domain} tool" | "each cell shows one thing the product does. no filler cells." | "i built each bento cell around one object. concept." | "most bento grids repeat the same card {n} times. this one gives every cell its own object." |
| T07 | component (still or loop) | "{ui} component, small details 🫠" | "the {component} has one job: {job}." | "i made the {component} {behaviour}." | "a {component} is usually a form. this one finishes the task in a single step." |
| T08 | pricing section | "{judgement} pricing section" | "{n} plans. the one most teams need sits in the middle." | "pricing for a {domain} tool, set like a {object}. concept." | "most pricing tables make you compare twelve rows. this one answers who each plan is for." |
| T09 | faq, footer, testimonials or changelog section | "{section} for a {domain} site" | "the {section} answers {n} questions before anyone books a call." | "{section}, set like a {object}. concept." | "most {section}s are an afterthought at the bottom of the page. this one carries real product news." |
| T10 | motion follow-up (quote of the still, day 1-2) | "same {ui}, now moving 🔥" | "the motion shows the order: {a} first, then {b}." | "the {detail} now {verb}s in {n} steps." | "a still hides the sequence. moving, you see {a} lead into {b}." |
| T11 | full view after a close-up (quote, day 1) | "the whole {ui} behind yesterday's close-up" | "the close-up was one panel. here is the system around it." | "zoomed out: the full {domain} {ui}. concept." | "the detail makes sense once you see the whole {ui} it lives in." |
| T12 | second showing (same image, 7-14 or 30-60 days later) | "still one of my favorite {ui}s" | "{n} weeks on, the {decision} still holds." | "back to the {domain} {ui}. still the {detail} i like most." | "weeks later the {category} habit is the same. this one still breaks it." |
| T13 | motion as a standalone post (day 5-9, not a quote) | "{domain} {ui}, animated" | "{n} seconds, one state change: {from} to {to}." | "i animated the {detail} from {from} to {to}. concept." | "motion here explains the product, it does not decorate it: {from} becomes {to}." |
| T14 | spec post (text list over one screen) | "{ui} spec:\n- type {font} {sizes}\n- radius {r}\n- rows {h}px\n- greys {hex list}" | the same list, opened with "what this {ui} is built on:" | the same list, opened with "the numbers behind this {ui}:" | (not used) |

Reply templates (first self-reply, 30-150 min later, CV-07):
- **R1 (Augustas)**: "more at larpo.studio" or "made at larpo.studio, concept".
- **R2 (Faulkner)**: "concept for a {domain} tool. made at larpo.studio".
- **R3 (Rokas)**: "built in {tool}. larpo.studio".
- **R4 (any, credits)**: "type: {font}. icons: {set}. inspired by @{who}" (the only place an @mention goes).

## 6. Dos and Don'ts

- **Do** "one payroll dashboard, in thirds 👀" (UI noun, one beat, one emoji). **Don't** "dashboard design" (bare label, 0.72x class) or "which dashboard is better?" (question).
- **Do** give Faulkner "two modes, one layout. the region map holds in both." on the day Augustas posts the dark hero. **Don't** let both accounts say "clean dark hero".
- **Do** "same {ui}, now moving 🔥" as a quote the day after the still. **Don't** "animated 👀" on a still nobody saw (0.47x).
- **Do** keep "concept" on fictional work. **Don't** name the fictional brand or write "our users love it".
- **Do** put "made at larpo.studio" in the reply. **Don't** put the url or "@" in the caption (0.33x, 0.53x).

## 7. Exceptions & judgement calls

- **Real client work** may name the client in Augustas's caption when the client has approved the logo and name (LBC-23); co-founders still use the domain.
- **A genuinely odd detail** (LBC-43, the "name the strange thing" move) is Rokas's lane; on the other accounts use it only when something genuinely strange was made.
- **Emoji choice** is Augustas's taste; the set above is what he used in the last two months, not a fixed list.
- **Canon conflict**: `knowledge/founder/canon/post-component.md` says captions are "3-8 words, sentence case" (from XP-13). For the founders' accounts the founder asked for lowercase and Augustas's current data supports it; the canon page is left unchanged here and should be reconciled by whoever owns canon.

## 8. Open questions

- Whether Faulkner's and Rokas's voices perform, once their accounts have an audience; re-rank after 20 posts per template (XS-26).
- Whether "concept" in Augustas's main caption (rather than the reply) changes his reach; one observation (1.74x) is not enough.
- Whether Marius will post; the plan treats his slot as optional until he does.
