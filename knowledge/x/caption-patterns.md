---
source: web:x.com via api.fxtwitter.com (public FixTweet mirror, no login): the design-post captions of @marcelkargul, @_heyrico, @basit_designs, @uisabor, @kargulstudio, @flohoeller, @mrncst, @oguzyagizkara, @pacocoursey, @raunofreiberg, @steveschoger, @d__raptis and @augustasdesign (era 1 and the current era); 1,527 original media posts, 1,375 of them design posts. Excluded on purpose: @rokasrem, @faulkner_Design, @marius_vanagas (X-engine output, negative evidence, XS-28)
chapter: Caption patterns on design X: what the studio accounts actually write under each format, measured, and 41 templates in the founders' lowercase register
pages: n/a (web; captures 2026-10-12 to 2026-10-22, Basit re-harvested 2026-10-22; evidence in knowledge/benchmarks/x-strategy-2026-10/data/_captions.json, script _scripts/captions.mjs)
topic_tags: [x, captions, copywriting, patterns, lowercase, studio-register, marcelkargul, heyrico, basit, flohoeller, augustasdesign, templates, close-up, vertical-thirds, bento, hero, motion, re-show, founders, larpo]
status: studied
---

# Caption patterns: how the studio accounts caption design posts, and what we write

Credits: every caption studied belongs to its author (Marcel Kargul, rico, Basit, uisabor, Kargul Studio, Flo Höller, Mariana Castilho, Oğuz Yağız Kara, Paco Coursey, rauno, Steve Schoger, Jim Raptis) or to Augustas. Other people's captions appear here only as short attributed quotes (10 words or fewer) used as evidence. Every template in section 5 is our own phrasing of a measured pattern, never a copied caption. Capture method: `knowledge/benchmarks/x-strategy-2026-10/CREDITS.md`.

"rel" = a post's likes divided by its author's median likes on media posts in the same window (relV views, relB bookmarks), so a 60k account and a 10k account compare fairly. "Pooled" = all 1,375 design posts of the 11 captioned benchmark accounts plus Augustas (@kargulstudio, 38 of 39 posts uncaptioned, is reported on its own). "Short studio" = the register the founder asked for: Marcel, rico and Augustas (both eras), captions of 12 words or fewer (n=671).

## 0. The one-paragraph answer

The studio accounts never explain the design. Marcel, rico and Basit caption a design post with **one move in 5-9 words**: a superlative about a named part ("the most detailed dashboard I've ever built", Augustas, 17.6x), a "this {part} is ..." callout ("This sidebar is too clean", Augustas, 3.76x), a first-person reaction ("i'm in love with this UI", Marcel on a thirds post, 4.97x), a standard line ("should be normalised", Basit, 11.07x; standard lines pool at 2.14x), a view label ("Closer look 👀", Augustas, 2.21x) or a plain label of the thing ("Project card component", Flo, 4.43x). Measured over 1,375 design captions: **7-9 words 1.19x, 1-2 words 0.95x, no caption 0.71x; standard lines 2.14x, principles 2.06x, callouts 1.83x, superlatives 1.07x (1.36x in the short studio register), labels 1.03x, work-log fillers 0.94x, judgement stacked into a label ("minimal card design") 0.82x, long explanatory statements 0.91x** and the most common pattern in the bottom 20%. Emoji are a signature, not a lift (1.00x vs 1.03x). One blank line splitting a label from a second beat helps (1.17x); three beats sink (0.70x). Follow-ups win with a comparative ("animated it's even cooler 🔥" 7.72x) and lose as a bare label ("animated 👀" 0.47x). Thirds posts are captioned as the whole work, never the cut. So we write every caption as one of those moves, in Augustas's all-lowercase voice, naming the UI part, never the fictional brand, never "concept" in the post, never a question, never a sentence about what the design does.

## 1. Method and limits

| Step | What | File |
|---|---|---|
| Captures | Marcel 7 Sep - 22 Oct 2026 (175 media originals), rico 16 May - 22 Oct (310), Basit 17 Dec 2025 - 22 Oct 2026 (392, re-harvested 2026-10-22 through the same public mirror, 536 statuses), @kargulstudio (39), Augustas era 1 (19 Jul 2025 - 5 Mar 2026, 321) and now (20 Aug - 20 Oct 2026, 24); Flo, Mariana, Oguz, uisabor, Paco, rauno, Steve Schoger, Jim Raptis from the 29-account study (14-59 media originals each) | `benchmarks/x-strategy-2026-10/data/*.json`, `benchmarks/x-posts/data/*.json`, `kargul-x/posts*.json`, `heyrico-x/posts.json` |
| Loader | de-duplicates by status id across captures, newest counts win; reposts of others dropped | `_scripts/captions-load.mjs` |
| Tags | per post: words, characters, casing, emoji (which, where), end punctuation, line breaks (beats), link, @mention, quote of own post; topic (design, business, life/meta, promo); subject (dashboard, calendar, hero/landing, bento ...; rico's image kinds from `heyrico-x/img-classification.tsv`); format (single landscape/portrait/square, 2-up pair, 3-up thirds, 4-up, video loop/long); role (full screen, close-up, thirds, pair, hero, bento/section, component, motion follow-up, re-show from rico's image clusters); one primary pattern (priority order in the script) plus every pattern present; question tails classified (binary choice, verdict ask, open) and stripped before the pattern is read | `_scripts/captions.mjs` |
| Output | per author, pooled (studio, craft, benchmarks, Augustas, all), short studio register, top 10% vs bottom 20% per author, per role with best examples, rico's re-shows, label suffixes | `data/_captions.json` |

Limits:
- Pattern tags are regexes; they were checked by reading every Marcel and Augustas tag and the catch-all "statement" bucket of every account, but a caption can still land in a neighbour pattern. Primary-pattern cells under n=10 are direction, not law.
- Engagement follows the image first. A caption pattern's multiplier is what posts carrying it earned, not what the words alone caused. The spread inside a pattern (labels run from 0.28x to 4.43x) is mostly the work.
- Basit's posts are 70% video, his captions 15 words in sentence case; the craft accounts are small samples (rauno 14, Steve 11). Pooled numbers lean on Marcel, rico, Basit and Augustas.
- Life, business-story and promo posts (Marcel's 28 life posts, Basit's founder lectures, Augustas's giveaways) are kept out of the design tables (`topic` field).
- The three co-founder accounts are excluded from every number: their posts were generated by the X engine and the founder rejected them and their titles (XS-28).

## 2. Core ideas

1. **One move, not a description.** 1,375 design captions resolve to about 20 moves; the studio accounts pick one per post and stop. Long statements that describe the design (median 14 words) earn 0.91x and are 14% of the bottom 20% against 9% of the top 10%. Flo's three explanatory captions ran 0.36-0.65x while his plain labels ran 1.07x, and his top five posts are all labels. [D]
2. **The strong moves carry a claim about the work, in a sentence.** Standard lines 2.14x (n=25), principles 2.06x (n=35), callouts 1.83x (n=10), superlatives 1.36x in the short studio register (n=54) and 1.21x on Augustas's account (n=42, bookmarks 1.50x). The same judgement stacked into a label ("minimal card design") runs 0.82x (n=28; Augustas 0.77x). [D]
3. **Name the part.** Captions naming a UI part earn 1.10x vs 0.95x without; generic "product design" labels 0.90x (n=93), 8% of the bottom 20% and 1% of the top 10%. [D]
4. **5-9 words.** 7-9 words is the best band everywhere (pooled 1.19x n=222, short studio 1.20x n=137, Augustas 1.21x n=71); 1-2 words 0.95x pooled and 0.50x on Augustas's account (n=29); no caption 0.71x (n=34; @kargulstudio posts uncaptioned stills at 25 median likes). Over 15 words drifts below 1x except for spec lists and resources. [D]
5. **Lowercase is a voice choice, not a lift.** Marcel writes 88% lowercase (UI and names keep caps), rico 69%, Augustas now 100%; Basit, Flo, Paco and uisabor write sentence case. Casing has no measurable effect (lowercase 1.01x, sentence 1.05x). The founder asked for lowercase; Larpo's acronyms are lowercase too. [D][LBC]
6. **Emoji is a signature, not a lift.** With 1.00x vs without 1.03x pooled (short studio 1.02x vs 0.99x). When used it sits at the end (Marcel 76 of 90, rico 144 of 155) and each account owns a small set (Marcel 😍 😁 🤩 😶‍🌫️; rico ✨ 🧑‍🍳 🤌 🚀 🦙; Augustas 👀 ✨ 🤌 then, 👀 🥹 🫠 😍 🔥 now). [D]
7. **Two beats, never three.** A label, a blank line, one short second beat: 1.17x (n=249; Marcel 1.42x, n=39). Three or more beats 0.70x (n=119). [D]
8. **Follow-ups need a comparative.** Augustas: "animated it's even cooler 🔥" 7.72x; "animated 👀" 0.47x, "always animating my heroes 😍" 0.47x; era 1 "Workflow animated 👀" 0.27x. Marcel's comparatives: "here is what the pdf version looks like" 3.67x, "the footer is even better" 1.54x. Flo's "Dark mode version" 0.77x. [D]
9. **Thirds and multi-image posts are captioned as the whole work.** None of the 10 thirds captions names the cut; they are reactions and superlatives ("i'm in love with this UI" 4.97x; "designing the cleanest product ever" 2.76x; Augustas 17.6x). [D]
10. **Fillers sink.** Work-log captions ("recent work", "current project", "another day, another ...") are the single largest pattern in the bottom 20% (15% vs 9% of the top 10%); Basit's work-log captions run 0.63x (n=61). They hold up only on 4-image collections (1.01x; uisabor "A few landing pages I've been working on lately." 3.29x). [D]
11. **Questions add nothing measurable and binary ones cost.** Binary-choice questions 0.83x (n=32), open questions 0.93x (n=103). Verdict tails ("clean?") pool at 1.56x (n=75), but that comes from Augustas's sentence-case era 1 (1.71x, n=24) and Basit (1.23x, n=41); in the current era they ran 0.61x (n=2). The house rule stays no questions (CP-14). [D][LBC]
12. **Credits and process are reply material.** "made in @figma", "built with Claude", "spent 5 hours" run 0.90x likes and 0.71x bookmarks (n=50); Augustas 0.62x (n=13); Marcel's "made from scratch with @figma and @paper" 0.28x. [D]

## 3. Numbers

### 3.1 Pattern table (primary pattern per design post)

| Pattern | What it is (our wording) | Pooled n | rel / relV / relB | Short studio rel (n) | Augustas rel (n) | Evidence (author, rel) |
|---|---|---|---|---|---|---|
| resource-launch | a usable thing shipped: open source, free file, collection | 29 | 2.62 / 2.76 / 7.73 | 5.36 (4) | 1.44 (2) | Marcel "finally made it open-source!" 39.76x |
| normalise-standard | the work as the standard the category should meet | 25 | 2.14 / 2.83 / 3.46 | 2.11 (17) | 2.91 (2) | Basit "Design like this minimal should be normalised." 11.07x; Marcel "most companies never reach this level of design" 2.30x; rico's standard line re-used five times 3.89x, 3.18x, 2.77x, 2.38x, 0.82x |
| principle | one design truth in one line | 35 | 2.06 / 2.44 / 2.30 | 2.18 (7) | 4.67 (1) | Basit "when design looks this sharp, investors assume ..." 32.69x; Marcel "when the data is complex, the design has to ..." 2.60x; rico "slow is smooth, smooth is fast" 2.97x; uisabor "AI is moving fast. The design is faster." 0.26x |
| callout | "this {part} is ...", "the {part} ..." with a verdict | 10 | 1.83 / 1.19 / 1.86 | 1.38 (6) | 1.74 (5) | Augustas "This sidebar is too clean" 3.76x, "this hero is too clean" 1.74x; Marcel "the rive animations are just next-level" 4.45x; uisabor "The guy in the clouds definitely steals the show." 2.80x |
| spec-list | values list: type, sizes, radius, greys | 33 | 1.48 / 2.40 / 2.11 | 0.46 (2) | 0.77 (6) | rico "Steal this clean UI blueprint:" 10.52x (benchmarks only: 2.28x, bookmarks 3.89x) |
| before-after | wireframe -> final, old -> new | 16 | 1.39 / 1.02 / 1.17 | 1.60 (11) | 0.54 (5) | Marcel "how it started vs how its going" 10.13x, "wireframe -> final design" 0.35x |
| money-brag | prices, revenue, client money | 17 | 1.36 / 1.10 / 1.10 | 2.44 (8) | 1.75 (9) | off-limits on concept work (LBC-45) |
| vibe-craft | mood words: craft, taste, vibes | 37 | 1.16 / 1.14 / 1.14 | 1.15 (34) | | rico only: "product design craft" 3.04x |
| reaction | first-person feeling about the work | 81 | 1.15 / 1.17 / 1.14 | 1.13 (40) | 1.07 (14) | Marcel "i'm in love with this UI" 4.97x; rico "i just love clean design" 2.96x; Basit "I am falling in love with this design aesthetics." 10.93x |
| client-tag | "{deliverable} for {client or category}" | 42 | 1.15 / 1.24 / 1.30 | 1.01 (20) | 1.75 (6) | Augustas "Dashboard design for a client" 2.55x (real clients only; a category tag on concepts runs ~1.0x: rico "product design for AI Company" 1.15x) |
| view-label | closer view, close-up, details, dark mode | 32 | 1.14 / 1.05 / 1.13 | 1.14 (26) | 1.22 (16) | Augustas "Details in my product designs 🤌" 3.18x, "Closer look 👀" 2.21x; Flo "Component details" 2.33x; rico "closer view" 0.68x |
| series-follow | the relation to an earlier post | 43 | 1.11 / 1.25 / 1.27 | 0.90 (16) | 0.47 (7) | comparative: Augustas "animated it's even cooler" 7.72x, Marcel "here is what the pdf version looks like" 3.67x; bare: Augustas "animated" 0.47x, Flo "Dark mode version" 0.77x |
| superlative | cleanest, most detailed, my favorite, ever | 105 | 1.07 / 1.18 / 1.24 | 1.36 (54) | 1.21 (42) | Augustas "the most detailed dashboard I've ever built" 17.61x, "Just built the cleanest dashboard ever" 10.74x; rico "One of the best email designs you'll ever see" 9.72x; Marcel's repeated "cleanest {x} you'll ever see" 1.44x -> 0.94x -> 0.88x |
| imagine | "imagine if your {x} looked this good" | 10 | 1.05 / 1.14 / 1.52 | 1.21 (7) | 2.93 (2) | Marcel "imagine if your code editor looked this good" 2.81x, "imagine if every app looked this good" 0.63x |
| named-thing | the plain label of the part | 155 | 1.03 / 0.94 / 1.06 | 1.00 (99) | 0.97 (43) | Flo "Project card component" 4.43x; Paco "Reading environment" 3.84x; Marcel "banking mobile UI" 3.26x vs "inbox UI" 0.37x; Augustas "light dashboard design" 2.28x vs "hero section design" 0.28x |
| this-is-what | "this is what {x} looks like" | 19 | 1.01 / 0.73 / 0.73 | 0.79 (11) | 1.11 (4) | Marcel "calendar design / this is what UI perfection looks like." 3.03x; rico "What agentic design looks like" 0.55x |
| category-judged | judgement + "product design" | 35 | 1.00 / 0.86 / 0.92 | 1.00 (34) | 1.00 (9) | rico "clean and white product design" 2.45x |
| teaching | one tip line without a list | 9 | 0.97 / 1.38 / 1.49 | 1.28 (4) | 1.15 (4) | Marcel "if you're still rendering videos as .mp4 ..." 2.45x |
| work-log | recent work, current project, wip, recap | 178 | 0.94 / 0.95 / 0.95 | 1.01 (59) | 1.18 (33) | uisabor "A few landing pages I've been working on lately." 3.29x (4-up); Basit "Some more shots from the current website design project ..." 0.13x |
| another-daily | "another day, another {x}" | 37 | 0.94 / 0.97 / 1.03 | 0.97 (28) | 0.97 (18) | Augustas "another day, another hero design" 1.53x, "daily hero design inspiration" 0.52x |
| statement | a sentence that describes or explains | 164 | 0.91 / 1.05 / 0.88 | 0.85 (35) | 0.85 (27) | Flo "Settings show a one-line summary, not the full config." 0.65x; "Outreach tools split the conversation from the context." 0.50x |
| category-label | "{adjective} product design", "interface design" | 93 | 0.90 / 0.84 / 0.81 | 0.92 (62) | 0.78 (26) | rico "dark product design" 0.73x-1.40x |
| process-claim | made in, built with, hours spent | 50 | 0.90 / 1.00 / 0.71 | 0.84 (18) | 0.62 (13) | Marcel "neo-brutalist brand posters. made from scratch with @figma ..." 0.28x |
| named-judged | judgement stacked into a label | 28 | 0.82 / 0.66 / 0.69 | 0.77 (20) | 0.77 (13) | Augustas "minimal card design" 0.45x, "cute component design" 0.80x; outlier "incredibly detailed hero design" 3.38x |
| twist | "{x}, but {y}" | 6 | 0.69 / 0.84 / 0.66 | 0.66 (2) | | Oguz "Workflows but shadermaxxing." 5.46x; uisabor "SaaS design, but with a little more character." 0.59x |
| bare | no words (emoji or nothing) | 34 | 0.71 / 0.77 / 0.64 | 0.75 (22) | | @kargulstudio's 38 uncaptioned stills |
| question-only | the whole caption is a question | 52 | 0.98 / 1.05 / 0.78 | 0.79 (25) | 0.75 (16) | rico "which one is better?" 0.34x; Augustas "Top or bottom table?" 2.76x (era 1) |

Question tails (on any pattern): binary choice 0.83x (n=32), open 0.93x (n=103), verdict ask 1.56x (n=75; Augustas era 1 1.71x n=24, Basit 1.23x n=41, Augustas now 0.61x n=2).

### 3.2 Mechanics per author (design posts)

| Account | n | Words median (p25-p75) | Chars | Lowercase voice | Emoji share; at the end | Their emoji | Two beats | Questions | Quotes own post |
|---|---|---|---|---|---|---|---|---|---|
| @marcelkargul | 135 | 7 (5-10) | 44 | 88% (70% all lower, 18% with UI/names) | 67%; 76 of 90 | 😍 😁 🤩 😶‍🌫️ 😉 | 37% | 6% | 52% |
| @_heyrico | 306 | 4 (3-6) | 27 | 69% | 51%; 144 of 155 | ✨ 🧑‍🍳 🤌 🚀 🦙 💫 | 12% | 8% | 54% |
| @basit_designs | 358 | 15 (11-20) | 91 | 0% (98% sentence) | 21%; 63 of 75 | 🤝 ✌️ 🫶 🔥 🥂 | 30% | 28% | 33% |
| @uisabor | 32 | 9 (8-9) | 48 | 0% | 6% | 👀 | 13% | 9% | 0% |
| @kargulstudio | 38 | 0 | 0 | none (38 of 39 uncaptioned) | 0% | | | | |
| @flohoeller | 51 | 3 (3-3) | 26 | 4% (92% sentence) | 0% | | 4% | 2% | 16% |
| @mrncst | 52 | 20.5 (12-36) | 126 | 6% | 40% | 😌 🤝 👀 | 67% | 6% | 2% |
| @oguzyagizkara | 40 | 2.5 (1-4) | 22 | 0% (18% no text) | 55% | ♥︎ 🤝 ✨ 🤍 | 18% | 0% | 0% |
| @pacocoursey | 32 | 4 (2-7) | 26 | 0% (16% no text) | 0% | | 6% | 3% | 0% |
| @raunofreiberg | 14 | 7 (5-12.5) | 46 | 50% | 0% | | 29% | 14% | 7% |
| @steveschoger | 11 | 21 (14.5-27.5) | 115 | 0% | 82% | 🔥 | 55% | 9% | 0% |
| @d__raptis | 21 | 25 (19-34) | 161 | 24% | 24% | ✨ | 76% | 0% | 10% |
| @augustasdesign era 1 | 301 | 6 (4-8) | 33 | 3% (95% sentence) | 35%; 101 of 106 | 👀 ✨ 🤌 😍 💀 | 32% | 20% | 4% |
| @augustasdesign now | 22 | 4 (3-5) | 28.5 | 100% | 27%; all at the end | 👀 🥹 🫠 😍 🔥 | 23% | 14% | 14% |

Hashtags: 1% of design captions (Basit, rico); links in the post 9%; @mentions 8% (Mariana 56%, credits).

Label endings (labels of 8 words or fewer): "{x} design" 1.08x (n=134, rico 76, Augustas 44), "{x} ui" 0.85x (n=13, Marcel 11), "{x} component" 0.93x (n=11, Flo 7), "{x} page/section/screen/view" 0.84x (n=18), anything else 1.00x (n=584).

### 3.3 How each format is captioned (benchmark accounts, role tags)

| Format | n | rel | Median words | Patterns that work (rel, n) | Patterns that sink | Best evidence |
|---|---|---|---|---|---|---|
| Full screen (single landscape product screen) | 108 | 0.93 | 4.5 | standard 2.10 (6), superlative 1.44 (6), work-log 1.24 (9), label 1.01 (25) | mood words 0.55 (7), statements 0.58 (9), category labels 0.67 (6), bare 0.64 (5) | Marcel "calendar design / this is what UI perfection looks like." 3.03x; "workflow editor UI" 2.98x |
| Close-up / detail | 27 | 0.90 | 5 | view label 1.00 (10); Augustas's view labels 1.22 (16) | spec lists on a crop 0.32 (2) | Augustas "Details in my product designs 🤌" 3.18x, "Closer look 👀" 2.21x; Flo "Component details" 2.33x |
| Vertical thirds (3 tall slices) | 9 (+1 Augustas) | 0.96 | 6 | reaction 3.13 (2), superlative 1.85 (2) | "imagine your product looks this great" 0.48 | Marcel "i'm in love with this UI" 4.97x; Augustas 17.61x; no caption names the cut |
| 2-up pair | 125 | 1.17 | 5 | before-after 1.56 (8), label 1.32 (21), reaction 1.21 (10) | work-log 0.69 (13) | rico "One of the best email designs you'll ever see" 9.72x; Augustas "light dashboard design" 2.28x |
| Hero / landing | 173 | 1.05 | 15 | principle 1.93 (14) | work-log 0.78 (35), label 0.61 (7) | Augustas now: "incredibly detailed hero design" 3.38x, "this hero is too clean" 1.74x vs "hero section design" 0.28x, "clean dark hero / thoughts?" 0.32x |
| Bento / section / footer | 58 | 0.94 | 12 | principle 2.33 (5), label 1.94 (4) | statements 0.69 (10), question-only 0.49 (4) | Augustas era 1 "This footer is perfection" 5.08x, "Footer as good as hero" 2.06x; Basit "the website section feels more good than the Hero ..." 3.41x; uisabor "This footer hits different." 1.91x |
| Component (still or loop) | 152 | 1.07 | 6 | mood 2.10 (6), client tag 1.34 (8), label 1.03 (43) | statements 0.78 (18), series labels 0.84 (8) | Flo's top five are "{thing} component" labels at 2.7-4.4x |
| 4-up collection | 166 | 1.12 | 5 | superlative 1.65 (11), mood 1.13 (16), work-log 1.01 (31) | bare 0.89 (11) | uisabor "One of my favourite landing page layouts lately." 4.48x |
| Motion follow-up (video quoting own still) | 121 | 0.94 (views 1.15) | 13 | principle 1.52 (13), series cue 1.39 (12) | work-log 0.45 (18) | Augustas comparative 7.72x vs bare 0.47x; Basit "And that's how this landing page works with the mobile ..." 11.58x |
| Re-show (rico's re-shown images) | 89 | 1.00 | 4 | standard 2.38 (5), principle 2.12 (4) | category label 0.58 (9) | 84% of re-shows get new words; Augustas era 1 "Still one of my best hero designs" 2.41x vs "Old banger 🔥" 0.37x |

### 3.4 Top 10% vs bottom 20% (per author, then pooled; n=137 / 273)

| Signal | Top 10% | Bottom 20% |
|---|---|---|
| Median words | 9 | 6 |
| Names a UI part | 66% | 52% |
| Carries a judgement word | 45% | 32% |
| Two beats | 37% | 28% |
| Emoji | 27% | 36% |
| Quotes the author's own earlier post | 18% | 34% |
| Single landscape still | 20% | 43% |
| Primary patterns | label 12%, superlative 10%, resource 9%, spec list 9%, standard 6%, principle 6% | work-log 15%, statement 14%, label 11%, category label 8%, superlative 7%, question only 5%, bare 4%, stacked judgement 3% |

Per author: Marcel's top 10% are resources (36%) plus a reaction on a thirds post; his bottom are made-with credits and promo of his own studio. rico's top are spec cheatsheets (35%) and standard or principle lines; his bottom are short category labels, bare posts and labels (41% together). Basit's top are one-line principles over a video; his bottom are work-log reports (32%) and long founder lectures. Augustas's top are superlatives about a named part (19%); his bottom are plain labels (17%), stacked judgements (8%) and question-only captions (6%).

## 4. Rules

- **RULE CP-01** Write each caption as one studied move from section 5 (superlative, callout, reaction, view label, standard line, principle, comparative follow-up, plain label); never write explanatory product copy (what the design does, decided, chose or gave up, how it is read, what each part shows).
  **Why** Long describing statements run 0.91x (n=164) and are 14% of the bottom 20% vs 9% of the top 10%; Flo's three explanatory captions ran 0.36-0.65x against 1.07x for his labels; the founder rejected our explanatory drafts ("each cell shows one thing the product does. no filler cells.": ledger `x-captions` r1).
  **Applies to** every caption. **Check** the caption maps to a template id (T01-T41); none of `system/x/captions.json.rejectedPhrasings.markers` appears. **Source** `data/_captions.json` patternsPrimary, extremes; ledger/entries/x-captions.json r1.

- **RULE CP-02** Lead @augustasdesign's posts with a superlative about a named part or a "this {part} ..." callout; first person is fine ("i've made", "i've designed").
  **Why** Augustas's superlatives 1.21x (n=42, bookmarks 1.50x) with his best design post ever at 17.61x; callouts 1.74x on his account (n=5) and 1.83x pooled (n=10); superlatives 1.36x in the short studio register (n=54).
  **Applies to** @augustasdesign. **Check** template pattern superlative or callout on at least half of his posts in a week. **Source** `data/_captions.json` authors.augustasdesign-*, shortStudio.

- **RULE CP-03** Name the UI part (dashboard, week view, panel, bento, hero, footer, sidebar); never caption with only "product design", "design" or "ui".
  **Why** UI noun 1.10x vs 0.95x pooled (n=745 / 630); generic category labels 0.90x (n=93), 8% of the bottom 20% vs 1% of the top 10%.
  **Applies to** every caption except standard lines and principles. **Check** the caption contains a noun from `captions.mjs` UI_NOUN or a {ui}/{detail} var. **Source** pools.all.uiNoun; extremes.

- **RULE CP-04** Put the judgement in a sentence ("this bento turned out way too clean"), never stack it as an adjective in front of a label ("clean dark bento design").
  **Why** Stacked judgement labels 0.82x pooled (n=28), 0.77x short studio (n=20) and 0.77x on Augustas's account (n=13: "minimal card design" 0.45x); the same words as a callout 1.83x, as a reaction 1.15x.
  **Applies to** captions with a judgement word. **Check** no judgement word directly before a UI noun in a caption of 5 words or fewer. **Source** patternsPrimary named-judged, callout, reaction.

- **RULE CP-05** Write 5-9 words; 3-10 is the hard band; never 1-2 words, never an empty caption, never more than 12 words outside a spec list.
  **Why** 7-9 words 1.19x pooled (n=222), 1.20x short studio (n=137), 1.21x Augustas (n=71); 5-6 words 1.04-1.07x; 1-2 words 0.95x pooled and 0.50x on Augustas's account (n=29); no caption 0.71x (n=34); 16-40 words 0.95x.
  **Applies to** every caption. **Check** word count (emoji excluded) in `captions.json.voices.<voice>.words`. **Source** byWords tables.

- **RULE CP-06** Use emoji as a signature only: at most one, at the end, on @augustasdesign only, picked by role (👀 reveal or close-up, 🔥 motion or dark, 😍 reaction, 🫠 small detail, 🥹 older work); leave it off half the time.
  **Why** No lift either way (pooled 1.00x vs 1.03x; short studio 1.02x vs 0.99x; Augustas now 0.86x vs 1.00x); every studio account places it at the end (Marcel 76 of 90, rico 144 of 155) and keeps a small personal set; Rokas's X engine profile has emoji off.
  **Applies to** every caption. **Check** emoji count <= 1, last character, from the set; 0 on other accounts. **Source** emoji tables per author.

- **RULE CP-07** Allow one blank line to split a label from one short second beat; never three beats, never a list outside a spec post.
  **Why** Two beats 1.17x (n=249), Marcel 1.42x (n=39), short studio 1.14x (n=107); three or more 0.70x (n=119).
  **Applies to** every caption. **Check** at most one "\n\n"; no "- " lines unless the template is T41. **Source** lineBreaks.byBeats.

- **RULE CP-08** Use a standard line or principle at most twice a week per account, only over the strongest asset, with new words each time; never self-promotion ("no one designs {x} cleaner than {studio}").
  **Why** Standard lines 2.14x (n=25) and principles 2.06x (n=35) are the strongest caption moves that need no resource; rico's verbatim standard line decayed from 3.89x to 0.82x over five uses; Marcel's "no one designs apps cleaner than ..." with his studio link 0.37x.
  **Applies to** every account. **Check** pattern count per account per 7 days <= 2; no studio name or url in the line. **Source** patternsPrimary normalise-standard, principle; repeats.

- **RULE CP-09** Caption a follow-up with a comparative and the relation ("moving, it's even better", "the full week view is even better"), never a bare relation label ("animated", "dark mode version").
  **Why** Augustas "animated it's even cooler 🔥" 7.72x vs "animated 👀" 0.47x and "always animating my heroes 😍" 0.47x; his series labels overall 0.47x (n=7); Marcel's comparatives 1.54x and 3.67x; Flo's "Dark mode version" 0.77x.
  **Applies to** series steps 2+ (XS-15, XS-16). **Check** follow captions contain "even", "better", "full" or "whole" plus the relation. **Source** patternsPrimary series-follow; roleExamples motion-followup.

- **RULE CP-10** Caption thirds and other multi-image posts as the whole work (a reaction or superlative), never by the cut ("in thirds", "three panels", "left to right").
  **Why** All 10 thirds captions studied name the work, not the cut: Marcel "i'm in love with this UI" 4.97x, "designing the cleanest product ever" 2.76x; Augustas 17.61x; benchmark thirds 0.96x overall.
  **Applies to** 3-up and 4-up posts. **Check** no "third", "panel by panel", "left to right", "cut in" in the caption. **Source** roleExamples vertical-thirds.

- **RULE CP-11** Caption a close-up with a view label (and 👀 on Augustas) or a callout naming the detail.
  **Why** View labels 1.14x pooled (n=32) and 1.22x on Augustas's account (n=16: "Closer look 👀" 2.21x, "Close up 👀" 2.16x); Flo "Component details" 2.33x; callouts 1.83x.
  **Applies to** close-ups and bento cells. **Check** template T01-T05. **Source** roleExamples closeup-detail.

- **RULE CP-12** Keep work-log and daily fillers ("recent work", "current project", "another day, another {x}", "daily {x} inspiration") off single stills; use them only on a 4-image collection.
  **Why** Work-log 0.94x pooled and the largest pattern in the bottom 20% (15% vs 9%); Basit 0.63x (n=61); "another day" 0.94x (n=37), Augustas "daily hero design inspiration" 0.52x; on 4-ups work-log holds 1.01x (n=31; uisabor 3.29x).
  **Applies to** every caption. **Check** work-log words only with format grid-4. **Source** patternsPrimary work-log, another-daily; roleExamples four-up.

- **RULE CP-13** Keep tools, credits and effort out of the caption ("made in figma", "built with claude", "spent 5 hours"); they go in the first reply if anywhere.
  **Why** Process claims 0.90x likes, 0.71x bookmarks (n=50); Augustas 0.62x (n=13); Marcel's made-with credit 0.28x; @mentions in Augustas's era-1 captions 0.53x (XS-22).
  **Applies to** every caption. **Check** no "made in", "built with", "designed in", "hours", "@". **Source** patternsPrimary process-claim.

- **RULE CP-14** Never end with a question, and never offer a choice ("a or b", "light or dark", "which one"); say the thing.
  **Why** Binary-choice questions 0.83x (n=32), open questions 0.93x (n=103), question-only captions 0.79x in the short studio register (n=25); verdict tails ("clean?") pool at 1.56x but only in sentence-case growth voices (Augustas era 1, Basit) and ran 0.61x in Augustas's current era (n=2); Larpo's own reach data puts binary questions at 0.2-0.26x (LBC-44); the X engine's "a or b?" titles were rejected (XS-28).
  **Applies to** every caption. **Check** no "?". **Source** questions tables; LBC-44; XS-21.

- **RULE CP-15** Never name the fictional brand, never tag a client or a price on concept work, and never put "concept" in the post; the first reply says "concept, made at larpo.studio".
  **Why** Client tags (1.15x pooled, Augustas "for a client" 1.75x, n=6) and money (1.36x) are exactly the hooks that are off-limits on fiction (LBC-41, LBC-45); disclosure is required (LBC-27) and lives in the reply so the caption keeps its one move; the founder rejected "concept." tacked onto titles (XS-28).
  **Applies to** concept work. **Check** the X engine gate's concept-name check passes with `conceptNames`; "concept" is in `captions.json.banned` for the post and present in the reply. **Source** patternsPrimary client-tag, money-brag; LBC-27, LBC-41, LBC-45.

- **RULE CP-16** Never reuse a caption verbatim on one account within 30 days; bring a winning pattern back with new words, and give a re-show a new caption with the same or a stronger pattern.
  **Why** rico re-uses 12% of captions verbatim (1.05x) and his top standard line decayed 3.89x -> 0.82x; Marcel's "cleanest {x} you'll ever see" ran 1.44x -> 0.94x -> 0.88x; 84% of rico's re-shown images got new words, and re-shows carrying a standard line or principle earned 2.38x and 2.12x vs 0.58x for a category label.
  **Applies to** every account. **Check** planner "caption used in the last 30 days"; re-show caption differs from the first showing. **Source** repeats; ricoReshows.

## 5. Templates (our phrasing; lowercase; one per post)

Placeholders come from the asset manifest's `captionVars`: `{ui}` the part (dashboard, week view, bento, hero, panel), `{detail}` one element (answer panel, focus chart), `{domain}` the plain product domain (team calendar, product analytics), `{category}` the kind of site (calendar, analytics). Lane: **A** = @augustasdesign (emoji allowed, verdict words allowed), **R** = @rokasrem (no emoji, no verdict words; @faulkner_Design and @marius_vanagas share this lane when active). Multipliers are the measured pattern values from section 3 (pooled / short studio / Augustas where present), not forecasts. Every template passes the X engine's `checkCaption` and the planner's caption checks with Tempra's vars (checked 2026-10-22). Templates never put `{domain}` and `{ui}` side by side, so a manifest with domain "team calendar" and ui "calendar" cannot produce "team calendar calendar".

### 5.1 Close-up (dashboard-closeup, bento-cell)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T01 | A | `closer look at the {detail} 👀` | view label | 1.14x pooled, 1.22x Augustas (n=16) |
| T02 | A | `the detail in this {detail} is unreal` | callout | 1.83x pooled, 1.74x Augustas |
| T03 | A | `my favorite little {detail} in the whole app 🫠` | superlative | 1.36x short studio |
| T04 | R | `{detail}, up close` | view label | 1.14x |
| T05 | R | `{detail} from a {domain} app` | label + category tag | 1.03x label; Flo's labels 2.7-4.4x at the top |

### 5.2 Full screen (dashboard-full, first)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T06 | A | `the most detailed {ui} i've designed so far 👀` | superlative | 1.21x Augustas (n=42), his best 17.61x |
| T07 | A | `this {ui} turned out way too clean` | callout | 1.83x |
| T08 | A | `{domain} software can look like this` | standard line (CP-08) | 2.14x pooled, 2.11x short studio; full screens 2.10x |
| T09 | R | `{domain} dashboard, full view` | label + view | 1.03x / 1.14x |
| T10 | R | `the whole {domain} workspace on one screen` | label | 1.03x |

### 5.3 Full view after a close-up (dashboard-full, follow)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T11 | A | `and the full {ui} is even better 👀` | comparative follow-up (CP-09) | 7.72x vs 0.47x bare on Augustas; Marcel 1.54x, 3.67x |
| T12 | R | `zoomed out: the whole {ui}` | view / series | 1.14x / 1.11x |

### 5.4 Vertical thirds and full plus thirds (dashboard-strips-3, full-plus-strips)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T13 | A | `could look at this {ui} all day 😍` | reaction, whole work (CP-10) | 1.15x pooled; 3.13x on thirds (n=2) |
| T14 | A | `my favorite {ui} i've built this year` | superlative | 1.36x short studio; 1.85x on thirds (n=2) |
| T15 | R | `{domain} dashboard in light mode` | label + view | 1.03x / 1.14x |

### 5.5 Hero (hero-still)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T16 | A | `probably the cleanest {domain} hero i've made 👀` | superlative | 1.21x Augustas |
| T17 | A | `the product shot in this hero is unreal` | callout | 1.83x; Augustas "this hero is too clean" 1.74x |
| T18 | A | `{category} sites can look this good` | standard line | 2.14x pooled; heroes with a principle 1.93x |
| T19 | R | `hero for a {domain} app` | category tag | ~1.0x (short studio client tag 1.01x) |
| T20 | R | `{domain} landing page, product first` | label | 1.03x |

### 5.6 Light and dark pair (pair-7x8)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T21 | A | `honestly can't pick a mode on this {ui} 😍` | reaction | 1.21x on pairs |
| T22 | A | `dark mode might be even better on this one 😍` | comparative callout | callout 1.83x |
| T23 | R | `the {ui}, dark mode and light mode` | pair label | 1.32x on pairs (n=21) |

### 5.7 Bento and sections (bento-still, section-still)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T24 | A | `this bento turned out way too clean 🔥` | callout | 1.83x; bento labels 1.94x (n=4) |
| T25 | A | `the {ui} might be better than the hero` | comparative callout | Augustas era 1 "Footer as good as hero" 2.06x; Basit 3.41x |
| T26 | A | `feature sections deserve this much detail` | standard line | 2.14x; sections with a principle 2.33x |
| T27 | R | `feature bento for a {domain} app` | label + category tag | 1.03x |
| T28 | R | `{ui} section for a {domain} app` | label + category tag | 1.03x |

### 5.8 Component (component-still, component-loop)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T29 | A | `tiny {ui}, way too much detail 🫠` | callout | 1.83x |
| T29m | A | `this little {ui} interaction feels way too smooth 🫠` | callout (loop) | 1.83x |
| T30 | R | `{ui} component for a {domain} app` | label | 1.03x; components 1.07x |
| T30m | R | `{ui} interaction for a {domain} app` | label (loop) | 1.03x |

### 5.9 Four-image collection (grid-4-16x9)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T31 | A | `my favorite screens from this {domain} build 😍` | superlative | 1.65x on 4-ups (n=11) |
| T32 | R | `a few {domain} screens from this week` | work-log (allowed on 4-ups only, CP-12) | 1.01x on 4-ups (n=31) |

### 5.10 Motion (hero-reel, component-loop)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T33 | A | `moving, it's even better 🔥` (follow) | comparative follow-up | 7.72x vs 0.47x on Augustas |
| T33b | A | `even better once it moves 🔥` (follow) | comparative follow-up | same |
| T34 | A | `the load-in might be my favorite part 🔥` (first) | superlative | 1.36x short studio |
| T35 | R | `same {ui}, now moving` (follow) | series relation | 1.11x pooled |
| T36 | R | `the {ui}, with its load-in` (first) | label | 1.03x |

### 5.11 Second showing (_second, 7-60 days later)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T37 | A | `still my favorite {ui} from this year 🥹` | superlative re-show | Augustas era 1 "Still one of my best hero designs" 2.41x |
| T38 | A | `this {ui} still holds up 🥹` | callout re-show | 1.83x |
| T39 | R | `coming back to this {ui}` | label re-show | rico re-shown labels 0.99x |
| T40 | any | `{domain} apps still rarely look like this` | standard line re-show | rico re-shows with a standard line 2.38x (n=5) |

### 5.12 Spec post (text over one screen; only with real values)

| # | Lane | Template | Pattern | Measured |
|---|---|---|---|---|
| T41 | A | `the numbers behind this {ui}:` + blank line + 3-5 lines `- type {font} {sizes}`, `- radius {r}`, `- rows {h}px`, `- greys {hex}` | spec list | 1.48x pooled, 2.28x benchmarks, bookmarks 2.11-3.89x |

Replies (first self-reply, 30-150 min later, CV-07): @augustasdesign "concept, made at larpo.studio"; @rokasrem "concept work for a {domain} app. made at larpo.studio". Credits and tools, when wanted, go in the same reply (CP-13).

## 6. Dos and Don'ts

- **Do** "the most detailed {ui} i've designed so far 👀" (superlative about a named part). **Don't** "detailed hero for a team calendar 👀" (stacked judgement + category tag: 0.82x and ~1.0x patterns, and it reads as a label).
- **Do** "this bento turned out way too clean 🔥". **Don't** "each cell shows one thing the product does. no filler cells." (explanatory; rejected, ledger `x-captions` r1).
- **Do** "and the full {ui} is even better 👀" on the day after the close-up. **Don't** "the whole calendar behind yesterday's close-up" (relation without a comparative) or "animated 👀" (0.47x).
- **Do** caption a thirds post as the whole work ("could look at this {ui} all day 😍"). **Don't** "one calendar dashboard, in thirds" (names the cut; no studied account does).
- **Do** put "concept, made at larpo.studio" in the first reply. **Don't** "team calendar hero, light version. concept." or any X-engine title ("landing page concept for a ...", "a or b? same hero, different color field": XS-28).
- **Do** keep a standard line for the strongest asset of the week. **Don't** run the same standard line every day (rico 3.89x -> 0.82x).

## 7. Exceptions & judgement calls

- **Labels are a coin flip carried by the image.** Plain labels average 1.03x but span 0.28x-4.43x; they are the right move for the craft lane (R) and for components, and the wrong move for Augustas's lead post, where the superlative or callout carries more (CP-02). [D]
- **Verdict tails.** "clean?" tails measured well in sentence-case growth voices (Augustas era 1 1.71x, Basit 1.23x). The house rule (CP-14) is taste plus the binary and open-question numbers, not proof that a verdict tail hurts; revisit only if the founder asks. [D]
- **Two-beat captions** may carry a standard line as the second beat ("{ui}\n\n{domain} software can look like this"); count both beats toward the 10-word cap. [engine note]
- **Real client work** may use a true client tag or "for a client" on Augustas's account (1.75x, n=6) once the client approved it (LBC-23); never on concepts. [D][LBC]
- **Resources beat every caption.** Open-source drops, free files and real spec lists run 2.6-5.4x; when Larpo ships one, lead with it ("made it free" is a resource post, not a caption trick). [D]
- **Casing** has no measured effect; lowercase is the founder's voice and Larpo's acronym rule, so "ui", "ai", "saas" stay lowercase in the post. [D][LBC]
- **Canon conflict**: `knowledge/founder/canon/post-component.md` says captions are 3-8 words in sentence case (from XP-13). The founder asked for lowercase and this study supports 5-9 words; the canon page is owned by another helper and is left unchanged here, to be reconciled there.

## 8. Open questions

- Whether the patterns rank the same on a 10k account in the current era: Augustas has 22 current-era design posts; re-run `captions.mjs` after 30 more (XS-26).
- Whether callouts keep 1.83x at volume (n=10 pooled) or decay like Marcel's repeated superlatives.
- Whether a standard line in the first reply (instead of the caption) helps or hurts; not observed.
- Views and bookmarks for Paco's older posts are missing in the mirror (rel views null).
