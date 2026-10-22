---
source: knowledge/x/caption-patterns.md (CP-01..16: 1,375 design captions of @marcelkargul, @_heyrico, @basit_designs, @uisabor, @kargulstudio, @flohoeller, @mrncst, @oguzyagizkara, @pacocoursey, @raunofreiberg, @steveschoger, @d__raptis and @augustasdesign, via the public FixTweet mirror, no login) + @augustasdesign's own posts (358 originals, Jul 2025 - Oct 2026) + knowledge/larpo/larpo-brand-and-constraints.md (LBC-04, 07, 27, 40-46) + founder verdicts ledger x-engine-posts r1 and x-captions r1 (2026-10-22). The @rokasrem, @faulkner_Design and @marius_vanagas timelines are X-engine output and appear here only as negative evidence
chapter: Caption voice for the founders' X accounts: one studio register for every account, lanes by pattern rotation, the house rules, and Augustas's own captions
pages: n/a (web; captured 2026-10-22; evidence in knowledge/benchmarks/x-strategy-2026-10/)
topic_tags: [x, captions, copywriting, voice, lowercase, studio-register, founders, larpo, augustasdesign, concept-disclosure, negative-evidence]
status: studied
---

# Caption voice: one studio register, four accounts, house rules

Credits: the captions quoted here are Augustas's own posts on his own account, plus our own rejected drafts and the X engine's rejected titles as negative examples. Benchmark captions are quoted only in `caption-patterns.md`, briefly and attributed. The templates live in `caption-patterns.md` section 5 and `system/x/captions.json`. Strategy: `x-strategy.md` (XS-20..24, XS-28).

"rel" = likes divided by the account's median likes on media posts in the same era.

## 0. The one-paragraph answer

Every founder account writes in **one register: the studio register of Marcel, rico and Basit, in Augustas's all-lowercase voice**. A caption is one measured move in 5-9 words (a superlative about a named part, a "this {part} ..." callout, a first-person reaction, a view label, a standard line, a comparative follow-up, a plain label; `caption-patterns.md`), names the UI part, and never explains the design. **Accounts do not have explanatory "voices"**: the old reaction / decision / detail / contrast split produced copywriter lines that explain what the design does or gave up, and the founder rejected them ("you didn't study like normal marcel rico basit", ledger `x-captions` r1). Accounts now differ only by **which patterns they rotate and which subjects they post**: @augustasdesign leads with superlatives, callouts and reactions and may end with one emoji; @rokasrem (scheduled by the X engine, emoji off) posts plain labels, view labels and pair labels with no verdict words; @faulkner_Design and @marius_vanagas are not scheduled for now. **The posts the X engine generated on the co-founder accounts, their titles and their formats are negative evidence** (ledger `x-engine-posts` r1, XS-28): never a source for a template, a title or a format. House rules that still hold: lowercase, no questions, no links, @mentions or hashtags in the post, "concept" and larpo.studio in the first reply, no fictional brand names, no banned words, no shared three-word run between same-day captions.

## 1. Method and limits

- Patterns, numbers and templates: `caption-patterns.md` (script `benchmarks/x-strategy-2026-10/_scripts/captions.mjs`, data `data/_captions.json`).
- Augustas's account is the only founder account with reach to rank captions: era 1 (19 Jul 2025 - 5 Mar 2026, 301 design posts, median 121 likes, sentence case with growth hooks) and the current era (20 Aug - 20 Oct 2026, 22 design posts, median 46.5 likes, lowercase).
- The co-founder accounts (4 followers, medians 1-3 likes) never had performance signal, and their posts are X-engine output. Nothing in this note is learned from them.

## 2. Core ideas

1. **One register, not four voices.** Design X has no "decision" or "contrast" voice among the accounts that grow; Marcel, rico and Basit each write one move per post (`caption-patterns.md` CP-01). Explanation is what sinks: long describing statements 0.91x and the top bottom-20% pattern alongside work-log fillers. [D]
2. **Augustas already writes the register.** Current era: 100% lowercase, median 4 words, emoji on 27% (all at the end), no hashtags; his best design captions are a superlative (17.61x), a callout (1.74x) and a judged label in a sentence-like rhythm (3.38x). What to add from the benchmarks: 5-9 words instead of 3-4 (his 3-4 word captions 0.84x, 7-9 words 1.21x), a comparative on follow-ups, a view label on close-ups. [D]
3. **Lanes keep the network from sounding like a ring.** Four accounts calling the same work "the cleanest" read as coordinated (XP section 6.2); so only @augustasdesign carries verdict words, @rokasrem labels the thing, and the same project never gets two judgement captions in a day. [D][XP]
4. **The X engine's output is the anti-example.** Its titles ("landing page concept for a ...", "a or b? same hero, different color field", "{domain} hero, light or dark?", "if {technical thing} had a landing page") break CP-01, CP-14 and CP-15 at once; its format (two variants side by side in one 16:9 image) reads small at 514 px (XS-10). [F]

## 3. Rules

- **RULE CV-01** Write every caption fully lowercase, acronyms included (ui, ai, saas, crm), "i" and "i've" included; proper names of real tools keep their case only in the reply.
  **Why** Larpo copy is lowercase with lowercase acronyms (LBC lowercase decision 2026-08-26) and the X engine gate flags any capital outside its proper-name list; Augustas's current voice is 100% lowercase in design posts; casing itself has no measured effect (lowercase 1.01x, sentence 1.05x, CP numbers).
  **Applies to** all accounts. **Check** caption matches `^[^A-Z]*$`; X engine `checkCaption` passes. **Source** `data/_captions.json` casing; larpo-x-engine shared/gate.mjs.

- **RULE CV-02** Write in the studio register: one move from `caption-patterns.md` section 5 per caption, naming the UI part; never explanatory product copy (what the design does, decided, gave up, how it is read, what each part shows, what "most products" do instead).
  **Why** Explanatory statements 0.91x pooled (n=164) and over-represented in the bottom 20%; Flo's explanatory captions 0.36-0.65x vs 1.07x for his labels; the founder rejected the decision / detail / contrast voices ("it's just ass", ledger `x-captions` r1).
  **Applies to** all accounts. **Check** the caption maps to a template id T01-T41; none of `system/x/captions.json.rejectedPhrasings.markers`. **Source** CP-01; ledger/entries/x-captions.json r1.

- **RULE CV-03** Keep 5-9 words; 3-10 is the hard band for every account (12 for the unscheduled accounts).
  **Why** 7-9 words 1.19x pooled, 1.20x in the short studio register, 1.21x on Augustas's account; 1-2 words 0.50x on his account; no caption 0.71x.
  **Applies to** all accounts. **Check** `captions.json.voices.<voice>.words`. **Source** CP-05.

- **RULE CV-04** Give verdict words (clean, cleanest, best, most, ever, unreal, too clean, my favorite) to @augustasdesign only; @rokasrem and the unscheduled accounts label, frame and relate, and never praise; never two judgement captions on one project in one day.
  **Why** The lead account's superlatives and callouts are its strongest moves (CP-02); a network where every account calls the same work "the cleanest" reads as a ring (XP section 6.2); rico's and Flo's labels show the plain lane works on its own (labels 1.03x, Flo's top five 2.7-4.4x).
  **Applies to** cross-account plans. **Check** planner verdict check (`captions.json.voices.<voice>.judgement` false for non-lead voices); per project per day at most one caption with a word from `judgementWords`. **Source** CP-02, CP-03.

- **RULE CV-05** Never end with a question or offer a choice ("a or b", "light or dark", "which one", "thoughts", "clean?"); state the thing.
  **Why** Binary-choice questions 0.83x, open questions 0.93x, Augustas's current-era questions 0.61-0.69x; LBC-44; the X engine's "a or b?" titles were rejected (XS-28). Verdict tails scored well only in the old sentence-case growth voice (CP-14).
  **Applies to** all accounts. **Check** no "?". **Source** CP-14; XS-21.

- **RULE CV-06** Only @augustasdesign uses emoji: at most one, at the end, chosen by role (👀 reveal or close-up, 🔥 motion or dark, 😍 reaction, 🫠 small detail, 🥹 older work); no hashtags anywhere.
  **Why** Emoji has no lift either way (1.00x vs 1.03x) and is a personal signature on every studio account; Rokas's X engine profile has emoji off; hashtags appear on 1% of design captions.
  **Applies to** all accounts. **Check** emoji count <= 1 and last on Augustas, 0 elsewhere; `#` count 0. **Source** CP-06.

- **RULE CV-07** Keep links, credits, tools and "made with" out of the caption; the first self-reply carries "concept, made at larpo.studio" (and credits if wanted), 30-150 minutes after the post.
  **Why** Link in the post 0.33x vs link in a self-reply 1.02x, @mentions 0.53x (Augustas era 1, XS-22); process and tool credits in the caption 0.90x likes and 0.71x bookmarks (CP-13).
  **Applies to** all accounts. **Check** no url, no "@" in the caption; reply present with "concept" for fictional work. **Source** XS-22; CP-13.

- **RULE CV-08** Disclose fictional work in the first reply, never in the post: no "concept." tacked onto the caption, no fictional brand name, no writing from inside the fiction ("we launched", "our users"), no client tag, price or outcome on a concept.
  **Why** LBC-27 (disclosure), LBC-41 (no fictional brand name), LBC-42 (no caption from inside the fiction), LBC-45 (no unevidenced money or client claims); the X engine's "{x} concept" titles were rejected (XS-28); the reply keeps the caption to one move (CP-15).
  **Applies to** concept work on all accounts. **Check** "concept" absent from the caption (`captions.json.banned`) and present in the reply; the X engine gate's concept-name check passes with the project's `conceptNames`. **Source** CP-15; LBC-27, 41, 42, 45.

- **RULE CV-09** On real, approved client work, one true client line a week is allowed on @augustasdesign ("dashboard for a client", a true figure); never on concepts, never on co-founder accounts.
  **Why** Client tags ran 1.75x on Augustas's era 1 (n=6) and money lines 1.36x pooled, which is exactly why they need a true source (LBC-45).
  **Applies to** real client work. **Check** the asset's project is not `fictional`; the client approved the name (LBC-23). **Source** CP-15; LBC-23, LBC-45.

- **RULE CV-10** Never copy a caption between accounts or reuse one on an account within 30 days; two captions posted the same day share no three-word run.
  **Why** Identical captions across a small network read as coordinated (XP section 6.2); verbatim reuse decays (rico 3.89x -> 0.82x, CP-16).
  **Applies to** cross-account plans. **Check** planner trigram check and "caption used in the last 30 days". **Source** CP-16; XS-19.

- **RULE CV-11** Use at most one blank line, splitting a label from one short second beat; no lists except a spec post (T41).
  **Why** Two beats 1.17x, three or more 0.70x (CP-07).
  **Applies to** all accounts. **Check** at most one "\n\n"; list lines only in T41. **Source** CP-07.

- **RULE CV-12** Keep Larpo's banned words and punctuation out: no em dashes, no exclamation marks, no "world-class", "premium", "innovative", "immersive", "seamless", "elevate", "crafted", "product design studio".
  **Why** LBC-04 and LBC-07; the X engine gate blocks the same list (shared/brand-rules.mjs).
  **Applies to** all accounts. **Check** `captions.json.banned`; X engine `checkCaption`. **Source** LBC-04, LBC-07.

- **RULE CV-13** Caption a follow-up with a comparative and the relation ("moving, it's even better", "and the full {ui} is even better"), quoting the earlier post; never a bare relation ("animated", "dark mode version") and never a "part 2".
  **Why** Augustas "animated it's even cooler 🔥" 7.72x vs "animated 👀" 0.47x (CP-09); quotes are the benchmarks' series default (XS-16).
  **Applies to** series steps 2+. **Check** follow templates T11, T12, T33, T35; the post quotes an earlier series post. **Source** CP-09; XS-16.

- **RULE CV-14** Never study, imitate, template or pool the X engine's generated posts on @rokasrem, @faulkner_Design or @marius_vanagas, their titles or their formats.
  **Why** Founder verdict 2026-10-22: "do not study the designs that were made by the engine before ... plus the entire title writing of the post and format" (ledger `x-engine-posts` r1); the captions drafted from them were rejected the same day (ledger `x-captions` r1).
  **Applies to** studies, templates, caption.md lines. **Check** `captions.mjs` and `cadence.mjs` exclude the three handles; no template shares a non-generic three-word run with their posts (check run 2026-10-22: 0 of 163 captions). **Source** XS-28; ledger/entries/x-engine-posts.json r1, x-captions.json r1.

## 4. Lanes (same register, different rotation)

| Account | Status | Lane: patterns it rotates | Words | Emoji | Never |
|---|---|---|---|---|---|
| @augustasdesign | posts by hand; the Tempra, Kestrel and Quorum assets are reserved for him | superlative about a named part, "this {part} ..." callout, first-person reaction, view label on close-ups, comparative follow-up, a standard line at most twice a week | 3-10 (aim 5-9) | <= 1 at the end | questions, explanations, brand names, "concept" in the post |
| @rokasrem | scheduled by the X engine (emoji off) | plain label, view label, pair label, category tag ("for a {domain} app"), plain series relation; work-log only on 4-ups | 3-10 (aim 4-8) | none | verdict words, questions, the X engine's old title formats |
| @faulkner_Design | not scheduled (founder 2026-10-22) | standard lines and view labels when active | 3-12 | none | as above |
| @marius_vanagas | not scheduled | plain labels and series relations when active | 3-12 | none | as above |

### 4.1 Augustas's own posts (his words) and how they did

Current era (lowercase; median 46.5 likes):

| Caption | Format | Likes / views / bookmarks | rel | Pattern |
|---|---|---|---|---|
| "the most detailed dashboard I've ever built 👀" | 3-up vertical thirds | 819 / 37,574 / 706 | 17.6x | superlative |
| "animated it's even cooler 🔥" (quote of the above, 1.5 days later) | 5 s video | 359 / 11,804 / 352 | 7.7x | comparative follow-up |
| "incredibly detailed hero design" | single 16:10 | 157 / 5,187 / 103 | 3.4x | judged label |
| "light dashboard design" | 2-up 4:5 pair | 106 / 5,071 / 98 | 2.3x | pair label |
| "hero section concept" | single | 81 / 2,544 / 23 | 1.7x | label |
| "this hero is too clean" | single | 81 / 2,647 / 40 | 1.7x | callout |
| "another design session / on 5-fig client work" | single portrait | 74 / 2,274 / 26 | 1.6x | money (real client) |
| "the detail in this hero is next level" | single | 47 / 1,451 / 14 | 1.0x | callout |
| "cute component design" | single 1:1 | 37 / 1,033 / 16 | 0.8x | judged label |
| "always animating my heroes 😍" (quote, same hour) | video | 22 / 1,650 / 8 | 0.5x | bare relation |
| "minimal card design" | single | 21 / 953 / 7 | 0.5x | judged label |
| "clean dark hero / thoughts?" | single | 15 / 1,119 / 4 | 0.3x | question tail |
| "hero section design" | single | 13 / 2,106 / 1 | 0.3x | bare label |

Era 1 (sentence case; median 121 likes), the moves that carried: "Just built the cleanest dashboard ever" (10.7x), "The cleanest sidebar design ever!" (5.7x), "The coolest dashboard design I've ever done 👀" (5.4x), "This sidebar is too clean" (3.8x), "Closer look 👀" (2.2x), "Still one of my best hero designs" (2.4x). The ones that sank: Lunor promos and giveaways, @-credits, "Animated" labels on their own (0.27-1.26x), long story posts over 15 words (0.55x).

What to keep from him: the UI noun, "the most ... i've ...", "this {part} is too clean", "closer look 👀", "even cooler" on a follow-up, 👀 for a reveal and 🔥 for motion. What to drop: two-word labels, "daily hero design inspiration", the question tail, the bare "animated".

## 5. Reply templates (first self-reply, 30-150 min later)

- **@augustasdesign**: "concept, made at larpo.studio".
- **@rokasrem**: "concept work for a {domain} app. made at larpo.studio".
- **@faulkner_Design** / **@marius_vanagas** (when active): "concept for a {domain} app, made at larpo.studio" / "concept. larpo.studio".
- Credits, when wanted, join the same reply: "type: {font}. icons: {set}." The only place an @mention goes.

## 6. Dos and Don'ts

- **Do** "the most detailed {ui} i've designed so far 👀". **Don't** "{domain} dashboard, all of it" or "detailed hero for a team calendar 👀" (labels that ask the image to do all the work, CP-02, CP-04).
- **Do** "this bento turned out way too clean 🔥". **Don't** "each cell shows one thing the product does. no filler cells." (our own rejected draft: an explanation, ledger `x-captions` r1).
- **Do** give @rokasrem "{detail}, up close" or "feature bento for a {domain} app". **Don't** give him "i drew the {detail} so it reads at a glance. concept." or "a or b? same hero, different color field" (the X engine's register, XS-28).
- **Do** "and the full {ui} is even better 👀" as the quote the next day. **Don't** "the close-up was one panel. here is the system around it." (explanation) or "animated 👀" (0.47x).
- **Do** put "concept, made at larpo.studio" in the reply. **Don't** end the caption with "concept." or name the fictional brand.

## 7. Exceptions & judgement calls

- **Real client work** may name the client on Augustas's account when the client approved it (LBC-23); co-founder accounts still use the domain.
- **A genuinely odd detail** may lead as a callout ("the {detail} steals the show"), on any account, only when the detail is real and visible in the image.
- **Emoji choice** is Augustas's taste; the set is what he used in the last two months, not a fixed list.
- **Canon conflict**: `knowledge/founder/canon/post-component.md` says captions are 3-8 words in sentence case (from XP-13). The founder asked for lowercase and the caption study supports 5-9 words; the canon page is owned by another helper and is left unchanged here, to be reconciled there.

## 8. Open questions

- Whether @rokasrem's label lane earns anything once the account has an audience; re-rank after 20 posts per template (XS-26).
- Whether the planner should read the `(b)` and `(c)` options in `library/*/*/caption.md` and let the founder pick in the day sheet; today it reads only the first `- <handle>:` line.
- Whether @faulkner_Design and @marius_vanagas return; until then their slots stay empty.
