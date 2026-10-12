---
source: web:x.com (29 design accounts read through api.fxtwitter.com/2/profile/<handle>/statuses, the public FixTweet API, no login; 1,161 original posts, 630 with media) + platform.twitter.com/embed (40 public embeds rendered and measured with Playwright) + docs.x.com/x-api/media/quickstart/best-practices + github.com/xai-org/x-algorithm (README, home-mixer/params/param.rs, pushed 2026-10-09) + spaces.is/loversmagazine/interviews/jakub-krehel + guochen.substack.com/p/who-are-my-design-heroes
chapter: How design posts on X work: who posts, what they post, how the work is displayed, how posts are written, what gets engagement
pages: n/a (web; timelines fetched and embeds measured 2026-10-12)
topic_tags: [x, twitter, social, design-twitter, post-formats, aspect-ratio, image-grid, crop, video, loop, captions, copywriting, engagement, algorithm, components, micro-interactions, landing-pages, product-ui, presentation, benchmark]
status: studied
---

# Design posts on X: what the best designers post, how they show it, how they write it

Credit: every post studied belongs to its author (handles below). We study the grammar of presentation and captioning; we never repost, trace or reuse their work or words. Evidence: `knowledge/benchmarks/x-posts/` (40 embed screenshots, `CREDITS.md`, raw timelines in `data/`, crop measurements in `embed-measure.json`, scripts in `scripts/`). Machine-readable formats: `system/variety/x-post-formats.json`.

Evidence tags: **[D]** counted from the harvested timelines (`data/_summary.json`, `data/_captions.json`); **[M]** measured in X's public embed; **[V]** read by eye from contact sheets of each account's top 24 media posts; **[S]** stated in a primary source (X docs, X's algorithm repo, an interview). "Relative engagement" = a post's likes divided by its author's median likes on media posts, so big and small accounts compare fairly.

## 0. The one-paragraph answer

Design X is a feed of **single artifacts, shown alone, named in a few words**. The craft accounts (Flo, Mariana Castilho, Paco Coursey, rauno, Raphael Salaja, lochie, Emil Kowalski, Jakub Krehel) post one component or one interaction as a **short silent video loop (median 9-16 s)** on a **plain near-white or near-black canvas**, with no device frame, no browser chrome, no gradient blob, a real cursor doing the interaction, and a caption that just names the thing ("Project card component", "Exclusion tabs from Stripe"). The product-UI studios (Marcel Kargul, rico, uisabor, Basit) post **stills at 2x-4x resolution**, often as **2-up or 4-up sets**, and the best of them size each image to X's tile (Flo exports 1760x1996, exactly the 7:8 tile X uses for a 2-image post). Captions are **sentence case, short, no hashtags (1%)**, at most one trailing emoji, links pushed to the **first self-reply**. Teaching posts (Emil, Jakub, jhey) lead with the principle and show a before/after; they earn the most bookmarks. What travels: **launches of useful things, before/after proof, named components, and lessons**; what sinks: **questions as hooks (0.5x), bare "WIP/exploring" captions (0.84x), single stills of whole pages, and 4-up grids of images that X crops badly**. X's own 2026 ranking weights favour shares by copy link (20) and DM (5), replies and quotes (5), over likes (0.5): a design post wins when a designer sends it to a teammate.

## 1. Sources and method

| Surface | What | Evidence |
|---|---|---|
| 29 timelines via api.fxtwitter.com | last 20-100 posts per account (most Jul-Oct 2026; quiet accounts go back further: Paco to 2021, Mariana to 2023): text, timestamps, likes, reposts, replies, quotes, bookmarks, views, media type, pixel size, video duration | `data/<handle>.json`, `_summary.json`, `_captions.json` [D] |
| X public embed (platform.twitter.com) | 40 posts rendered at 560 px, DPR 2; media tile boxes measured | `*.png`, `embed-measure.json` [M] |
| Contact sheets | each account's top 24 media posts by likes, thumbnails + counts + caption, read by eye to classify content | scratch only (not saved: composites of others' work) [V] |
| docs.x.com media best practices | upload limits, video specs | [S] |
| xai-org/x-algorithm on GitHub | For You ranking action weights, author diversity, out-of-network discount | [S] |
| Jakub Krehel interview (Lovers Magazine), Guo Chen "design heroes" essay | how designers found and built their audience on X | [S] |

Limits: x.com itself was never opened (login wall); searches and replies by other people were not read; follower counts are at capture time; 11 handles returned 404 through the mirror and are missing (Anthony Hobday, Aakib, Aaron Iker, Mike (mikelikesdesign), Olivier Larose, Michal Malewicz, Jordan Hughes, AlignUI, 10x_design, Ahmedcreatives, Lucas Fields).

## 2. The designers

Followers at 2026-10-12. "Fmt" = dominant display format measured from their uploads. One short verbatim caption per designer.

| Handle | Who | Followers | What they post | How it is displayed | A real caption |
|---|---|---|---|---|---|
| @flohoeller | Flo (Florian Hoeller), adfects, affectUI | 5.3k | AI-agent product components (meters, composers, dropzones, data tables), product screens | video 1670-1968 px wide, about 3:2, median 13 s; component alone inside its grey tray on #fafafa with a cursor; stills exported at **1760x1996 (7:8)** for 2/3/4-up | "Project card component" |
| @marcelkargul | Marcel, Kargul Studio | 60.3k | full product screens, banking/mobile UI, type opinions, resource lists, client-roast redesigns | stills, 1-4 per post, 1.4:1 screens and 1027x2040 phone screens, 3244x4096 type posters; about 9 posts a day | "no one else designs products this damn clean 😍" |
| @_heyrico | rico, Ace Studio | 27.1k | light and dark agentic product UI, CRMs, dashboards | very large stills (3456x3920 = 7:8 pairs, 5160x3300, 4800x4800), screens edge to edge, no frame | "Cleanest CRM design, in fullview" |
| @basit_designs | Basit A. Khan, Inspirux, Grainient | 24.8k | landing pages and hero sections, shader/gradient cards, UI illustrations | scroll and load-in videos 2400-3840 px wide (about 4:3), median 14 s, site on a soft neutral margin | "Design like this minimal should be normalised." |
| @emilkowalski | Emil Kowalski, Linear | 108k | animation lessons, details shipped at Linear, Base UI | videos 1.4-1.8:1, median 11 s, real product or a two-up comparison; 45-word teaching captions; 65% of posts are text or quote only | "Don’t forget to stagger your animations if you animate a lot of elements." |
| @raunofreiberg | rauno, Vercel | 95.4k | interaction details, design system work, type posters | 16:9 video (often 3840x2160) on light grey, centred; lowercase | "Not boring focus rings" |
| @pacocoursey | Paco Coursey, Linear | 41.4k | micro-interactions, recreated details, cmdk | **wide strips**: 1200x400 (3:1), 1768x856 (2:1); white or #111 canvas; 3-6 word captions | "Exclusion tabs from Stripe" |
| @jakubkrehel | Jakub Krehel, Interfere, interfaces.dev | 24.0k | before/after demos of his agent skills, components, product details, magazine | 3:2 video 2424x1604 with a "Before / After" chip in frame, median 16 s | "A couple of before / after examples of the skills I've added last week." |
| @raphaelsalaja | Raphael Salaja, Warp, userinterface.wiki | 14.4k | text-animation components, tools, talks | 3840x2160 video, near-empty off-white canvas; lowercase | "a super lightweight text animation component" |
| @mrncst | Mariana Castilho, Profound (ex Vercel, Pierre) | 18.7k | components and interactions, onboarding flows, personal site | 3840x2160 video, **tiny component (12-20% of width) dead centre on white**, real cursor, median 9 s | "New component in the making." |
| @joshpuckett | Josh Puckett, Graphical, interfacecraft.dev | 44.1k | launch and feature drops of his tool | recorded product UI 16:9 and 3:2, long launch captions | "Introducing Graphical." |
| @lochieaxon | lochie, Aave/Family | 12.7k | text-morph library (torph), motion details | 16:9 and square video on black; lowercase | "markdown editing can be fun actually" |
| @jh3yy | jhey, Shopify | 148k | CSS techniques | **2160x2160 square** video + code in the post + "↓" | "progressive blur > masked blur 🧑‍🍳" |
| @oguzyagizkara | Oğuz Yağız Kara, Lue Studio | 80.7k | shader and generative visuals, product-page sections, feature illustrations | square and 16:9 video, 2-4 video grids, 2-4 word captions with ♥︎ | "Workflows but shadermaxxing." |
| @uisabor | Abdul Saboor | 0.9k | AI/SaaS landing pages | **4-up of full-page 3033x4096 screenshots**; trend-contrast hooks; 2.7 posts a day | "One of my favourite landing page layouts lately." |
| @FonsMans | Fons Mans, Offgrid | 232k | brand identity, pictograms, illustration, posters | 2-up and 4-up portrait posters (2380x3368, 1500x2000); "Client — deliverable" captions | "Pictogram explorations for Ramp" |
| @Gavmn | Gavin Nelson, OpenAI | 147k | app icons, iOS concepts, prototypes | 2048x1152 stills (icon centred on a soft gradient), 9:16 phone-in-hand prototype videos | "what about... small icons, no labels" |
| @steveschoger | Steve Schoger, Shopify (Refactoring UI) | 128k | dashboards and landing pages designed in Claude Code, colour/type explorations | 4096-wide stills, native long-form video (up to an hour) | "Exploring a bunch of new grays for @tailwindcss 🕵️" |
| @MengTo | Meng To, Design+Code, Aura | 189k | AI-generated three.js sites and games, tutorials | 2880x2160 (4:3) screen recordings 30-130 s with a face-cam, 80-word hooks naming the model | "Opus 5.5 is next level." |
| @d__raptis | Jim Raptis | 31.7k | feature demos of his own SaaS (BrandBird, SuperMotion) | app demo video on a vivid gradient, 16:9-ish | "love designing a good faq section" |
| @alex_barashkov | Alex Barashkov, Pixel Point | 31.0k | 3D brand reels, AI design workflow | 4K video | "every pixel is handcrafted" |
| @PixelJanitor | Derek Briggs, Shopify | 10.7k | resizable-UI demos, life | 1440x1440 square video | (life-heavy feed) |
| @shadcn | shadcn, Vercel | 245k | library news, UI opinions | text first, single explainer images | "Why horizontal tabs?" |
| @benjitaylor | Benji Taylor, head of design at X | 225k | X/Grok feature launches | 16:9 product videos, launch captions | (launch voice) |
| @jsngr | Jordan Singer, Mainframe | 181k | company and life photos | 3:4 phone photos | (life voice) |
| @ryolu_ | Ryo Lu | 98.6k | ryOS apps, life | photos 3:4, longer videos; 97% lowercase | (life voice) |
| @pablostanley | Pablo Stanley, Anthropic | 103k | hand-drawn worlds, small tools, family | 16:9 video, photos | (life voice) |
| @rogie | rogie, Figma | 198k | Figma Draw/Shaders | mostly text and quotes | (text voice) |
| @samselikoff | Sam Selikoff, Vercel | 33.5k | Next.js, motion | quotes | (text voice) |

Two groups matter for us. **Craft posters** (Flo, Mariana, Paco, rauno, Raphael, lochie, Emil, Jakub, jhey, Oğuz) set the display grammar. **Studio and product-UI posters** (Marcel, rico, Basit, uisabor, Steve, Fons) are the closest to what the engine makes (SaaS screens, heroes, landing pages). Leaders with big followings (Benji, Jordan, Ryo, Pablo, rogie) mostly post company news and life, which is not a model for client work.

Audience note [S]: Jakub Krehel says his last three jobs and the first conversations about Interfere came through X; he started by lurking in small Twitter communities before sharing. The craft accounts are followed by other designers and engineers, so the bar is set by peers, not clients.

## 3. What gets posted, ranked by frequency

All 1,161 original posts [D]: **text or quote-text 46%**, **video 30%**, **images 24%**. Of the 630 media posts: video 55%, images 45%; image posts are 1-up 72%, 2-up 11%, 3-up 5%, 4-up 12% (the 4-up share is inflated by uisabor, 20 of 35).

Content of the top media posts [V] (24 accounts, about 430 posts classified by eye from contact sheets; shares are approximate):

| Rank | Post type | Share | Who does it best |
|---|---|---|---|
| 1 | **Single component or micro-interaction, looping video** | ~21% | Flo, Mariana, Paco, rauno, Raphael, lochie, Emil, jhey |
| 2 | **Life / team / milestone** (photos, job changes) | ~14% | Ryo, Jordan, Pablo, Benji (skip for client work) |
| 3 | **Full product screens / dashboards** (stills, 1-4 up) | ~13% | rico, Marcel, Flo, Steve |
| 4 | **Launch or feature demo of a tool they built** | ~13% | Josh (Graphical), Jakub (Loading, skills), Raphael, Paco (cmdk), lochie (torph), Jim Raptis |
| 5 | **Landing page / hero / site section** | ~12% | uisabor, Basit, Oğuz, Steve |
| 6 | **Brand, logo, icon, illustration** | ~11% | Fons, Gavin, Oğuz, Basit (cards) |
| 7 | **AI-made showcase or AI workflow** ("I asked X to make Y") | ~7% | Meng To, Steve, Alex Barashkov, Flo ("made w/ Claude") |
| 8 | **Lesson / before-after / spec opinion** | ~3% (but the top relative engagement) | Jakub, Emil, Marcel (tracking), jhey, shadcn |
| 9 | **Mobile / iOS concept or prototype** | ~3% | Gavin, Marcel |
| 10 | **Shader / 3D / generative** | ~2% | Oğuz, Alex, Meng |

Nobody in the sample posts Dribbble-style "concept shots" with device mockups, floating perspective phones or decorative backgrounds. WIP is posted, but labelled as a finished-looking artifact, not a wireframe.

## 4. Display standards (numbers)

### 4.1 X platform limits [S]
- Up to **4 photos, or 1 GIF, or 1 video** per post through the API; the web composer also mixes video and photos (2-4 video posts seen from Oğuz and Flo) [D].
- Images: JPG, PNG, GIF, WEBP; **5 MB** via the API. Animated GIF: **15 MB**, 1280x1080 max, 350 frames max.
- Video: 0.5 s to **20 min / 8 GB** for a normal account, up to 125 min / 16 GB for Premium; **60 fps max**, H.264 High, AAC LC, aspect **1:3 to 3:1**; recommended 1280x720, 720x1280 or 720x720 at 30/60 fps, min 5,000 kbps; **1080p playback only for subscribers who upload 1080p**, 720p otherwise.
- In practice designers upload far above the recommendation [D]: median media width **2,160 px**; 3840x2160 video (Mariana, Raphael, rauno), 4096-wide stills (Marcel, Steve), 5160x3300 (rico). X serves stills re-encoded as JPEG (411 of 444 served stills were .jpg).

### 4.2 How X shows 1, 2, 3, 4 images [M]
Measured in the public embed; the media column is 514 CSS px wide.

| Images | Tile layout (CSS px) | Tile ratio | What it means |
|---|---|---|---|
| 1 landscape | 514 x native height | native (seen up to 3:1 for video, 1.9:1 for stills) | wide strips are shown whole (Paco's 3:1 tabs = 514x171) |
| 1 portrait | 514 x up to ~612 | **floor about 0.84 (5:6)** | Marcel's 3244x4096 (0.79) rendered 514x612 with the top of "Geist" cut off; a portrait single is the biggest footprint in the feed |
| 2 | two tiles **256 x 289**, 2 px gap | **0.885 (7:8)** | Flo's and rico's pairs are exported at 7:8 (1760x1996, 3456x3920) so nothing is cropped |
| 3 | left **256 x 289** (7:8) + right column of two **256 x 144** | 7:8 + 16:9 + 16:9 | third-party guides that say "4:7" for the right tiles are wrong for the embed; three equal 7:8 images lose most of tiles 2 and 3 |
| 4 | 2x2 grid of **256 x 144** | **16:9 each**, grid about 514x290 | the grid is short: four tiles take the height of one 16:9 image |
| crop anchor | centre | | uisabor's 4-up of 3:4 full-page shots shows each page's middle band, not its hero |

Feed height by format (taller = more dwell and more thumb-stop): portrait single 0.84 → 612 px; square 1:1 → 514; 4:3 → 386; 2-up → 289; 3:2 → 343; 16:9 or 4-up → 289; 3:1 → 171.

Video in the embed shows a poster frame with a play button and a "Watch on X" chip; it does not autoplay there, so **the first frame must be the money frame**.

### 4.3 Video [D]
- Duration across all 349 videos: p10 6.4 s, p25 10 s, **median 14.8 s**, p75 28 s, p90 56 s. Craft posters are tighter: Mariana 9 s, Paco 10, Emil 11, rauno 12, Raphael 12, Oğuz 12, Flo 13, lochie 14, Jakub 16. Long video belongs to educators (Meng To 57 s median with 40-minute tutorials, Steve Schoger's one-hour native video).
- Video aspect ratios: 16:9 (80), 4:3 (56), 3:2 (48), 1:1 (27), 9:16 (15), 5:4 (10), then 2:1 and 3:1 strips. Craft components favour 3:2 and 16:9; lessons and generative visuals favour square; phone prototypes 9:16 (Gavin).
- Silent by default: none of the craft loops relies on sound (exception: Raphael's audio library).

### 4.4 Background, crop distance, framing [V]
- **Canvas**: near-white solid (#f5-#fafafa: Flo, Mariana, rauno, Raphael, Jakub, Emil) is the dominant treatment; near-black solid (#0a-#111: Paco, lochie, rico's dark sets) second; soft brand-tinted gradient only for objects (Gavin's icons) or product demos (Jim Raptis); photographic or painted scenery only inside landing pages (uisabor's hills, clouds; Meng's landscapes behind a browser).
- **No device frames, no browser chrome** on component or screen posts. Phones appear as real photos or renders (Gavin) or as frameless screens (Marcel, rico). Jim Raptis's mockup-in-gradient look is his product's style, not the community's.
- **Crop distance, two schools**: (a) **close**: the component at 1.5-2x scale filling 35-55% of the frame width inside its own tray (Flo; Jakub at about 40%); (b) **far**: the component at 1x filling 12-20% of a 4K frame, dead centre, everything else empty (Mariana, Raphael, rauno). Screens are shown **edge to edge** (rico, Marcel) or **cropped off one edge** (Flo's "Recent product designs"); never a whole browser on a desktop.
- **Cursor**: interaction videos show a real pointer that moves with intent and clicks (Mariana, Flo, Jakub, Emil).
- **Text in the image**: almost never on component or screen posts; the caption carries the words. Exceptions: a launch title card (Raphael's "ui.wiki / skill.md"), a "Before / After" chip (Jakub), a type or spec poster where the specimen is the content (Marcel's Geist tracking, rauno's Arial poster), and studio posters (Fons).
- **Light and dark**: shown as a pair (Flo's "Thinking state – light & dark mode"; rico alternates light and dark sets).

## 5. How posts are written

### 5.1 Tone and form [D]
- **Length**: median 14 words over all posts (p25 6, p75 29, p90 48). Showcase accounts are terse: Flo 4 words, Oğuz 4, Fons 5, Paco 8. Teaching and launch accounts are long: Emil 45, Alex 41, Meng 80.
- **Case**: 25% start lowercase, concentrated in a few personal voices (Ryo 97%, jhey 85%, lochie 86%, Marcel 81%, rauno 67%, Raphael 67%); everyone else writes sentence case. Lowercase is a voice, not a rule.
- **Hashtags: 1%** (essentially never). **Emoji: 17%** of posts, almost always one, at the end. **Questions: 9%**. **Links in the post: 22%**.
- **Threads**: 218 self-replies in the sample; **54% carry a link**, 25% carry more media. The first reply holds the URL, the credits ("Made in @framer", "In collaboration with ..."), a slowed-down or alternative version, the prompt, or process notes. Educators add "This blew up. I'm sharing the full prompt below. 👇".
- **Credit**: collaborators are @-mentioned in the caption or first reply (Basit's "w/ @necatikcl", Flo crediting the library author, Mariana crediting the engineer).
- **Fold**: long posts fold at about 280 characters ("Show more" on Marcel's tracking post), so the claim must sit in the first two lines.

### 5.2 Caption templates abstracted from real posts
Placeholders in braces. Source accounts in brackets.
1. `{Thing} component` [Flo]
2. `{Thing} component design` / `{Thing} exploration` [Flo]
3. `{Thing} – light & dark mode` [Flo]
4. `New {thing} in the making.` [Mariana]
5. `WIP of a {component} animated with {tool}.` [Mariana]
6. `{Detail} from {Brand}` (a recreated detail) [Paco]
7. `{Detail} № {n} — {variant}` (a numbered series) [Paco]
8. `A couple of before / after examples of {X}.` [Jakub]
9. `Made a small {X} improvement at {Company}: {what changed}` [Emil]
10. `Don't forget to {principle}. Here's the difference it makes:` [Emil]
11. `The bigger {X}, the {Y}. Notice how {evidence in the video}.` [Emil]
12. `One of my favorite details of {product}: {how it behaves}` [Emil]
13. `Introducing {Name}. {One line: what it is and who it is for}.` [Jakub, Josh]
14. `{Name} is now {milestone}` / `shipping {feature} to {Name} this week` [lochie]
15. `Recent product designs` / `Product design details` / `details.` [Flo, Marcel]
16. `{Category} but {twist}.` ("Workflows but shadermaxxing.") [Oğuz, uisabor]
17. `the {product} should {change}` (a lowercase product opinion) [Gavin]
18. `what about... {idea}` [Gavin]
19. `Designed it. Built it. Shipped it.` + one line on scope [Basit]
20. `{Style} like this should be normalised.` [Basit]
21. `Spent a little extra time getting {detail} to line up with {Y}. Worth it.` [Basit]
22. `Everyone is talking about {trend}. Meanwhile, I'm {doing the craft}.` [uisabor]
23. `{Client} — {deliverable}` / `{Deliverable} for {Client}` [Fons]
24. `{Opinion}. This is what I use with {tool}: {value list}` [Marcel]
25. `reminder: you can use {feature} to {effect} ↓` + code [jhey]
26. `{A} > {B}` + one-line why [jhey]
27. `I asked {AI tool} to {make X} and it {result}.` [Meng To]
28. `{N} prompts + a little manual fine tuning in {tool}.` [Alex]

### 5.3 Hooks that work, and ones that do not
- **Name the artifact** (template 1-3, 6): component-label captions ran at **1.38x** median relative engagement (n=45) [D].
- **Show proof of change** (before/after, "made a small improvement"): **3.3x** median (n=4; small sample, but the two biggest craft posts in the set, Jakub's before/after videos at 4,517 and 3,921 likes, are this type) [D].
- **"I made / built X"**: 1.2x (n=36). **Lessons / tips**: 1.17x (n=37). **Recreated detail from a known brand**: 1.23x (n=13). **Numbered series** (№, v2, Week 2): 2.95x (n=6, small) [D].
- **Questions as the hook** ("Which one?", "Hero or footer, which wins?"): **0.5x** (n=17). **"WIP / exploring" as the whole caption**: 0.84x (n=52). **No caption**: 0.67x (n=8) [D].
- **Launches of a useful free thing** dominate the absolute top: Josh's "Introducing Graphical." (4,906 likes, 14.9x his median), Jakub's skills (4,517 and 3,921), Raphael's skill file (3,456), Flo's copy-paste component library (1,106, 8x), lochie's torph (2,714, 11x) [D].
- **AI-tool name in the caption**: 1.07x overall (n=103), but the whole of Meng To's and Steve Schoger's reach rides on it; for a studio portfolio post it is neutral [D].

## 6. What gets engagement (data and the algorithm)

### 6.1 Measured in the sample [D]
- Format, relative engagement (median / mean): video **1.03 / 1.76**; 2-up **1.20 / 1.33**; 4-up **1.19 / 1.66**; 3-up 1.00 / 1.13; single image **0.76 / 1.18**; multi-video 1.78 (n=9). Flo's own feed agrees: 2-up median 154 likes, video 152, 3-up 142, 4-up 90 (his 4-ups use 7:8 images that X crops to 16:9), single image 50.
- **Bookmarks per like: median 0.45** (p25 0.25, p75 0.71). Reference posts go above 1: Jakub's before/after 5,290 bookmarks on 4,517 likes, Raphael's skill file 5,889 on 3,456, Marcel's resource list 1,703 on 993. Design X saves what it can reuse.
- **Likes per view: median 1.57%** (p25 1.04%, p75 2.25%) for posts with >1,000 views.
- Follower count does not cap reach for a format that works: uisabor (912 followers) got 1,182 likes and 56k views on a 4-up of landing pages; Flo (5.3k) regularly beats accounts ten times his size on likes per follower.
- Cadence: the craft accounts post visuals 0.1-1.3 times a day; Marcel posts about 9 times a day (most text), uisabor 2.7.

### 6.2 What X's ranking rewards [S]
From `home-mixer/params/param.rs` (xai-org/x-algorithm, pushed 2026-10-09), weights on each viewer's *predicted probability* of the action, not on raw counts:

| Action | Weight |
|---|---|
| share via copy link | **20.0** |
| reply / quote / share via DM | **5.0** each |
| follow author | 4.0 |
| share | 2.0 |
| repost | 1.0 |
| like | 0.5 |
| click 0.3; open link 0.2; video open 0.07; photo expand 0.05; dwell 0.05 | small |
| not interested -47.52; mute -58.8; block -31.2; report -234.0 | negative |

The README adds: each post after an author's first in one feed is multiplied by a **decaying author-diversity factor**; posts from accounts the viewer does not follow get an **out-of-network discount**; directly navigating to a post has no ranking impact. Bookmarks are not a weighted action. Practical reading: make the post something a designer **copies the link of or DMs to a teammate** (a reusable component, a fix, a reference), invite replies with substance rather than polls, and do not flood the feed with several posts in a row.

## 7. Rules

- **RULE** XP-01 One post shows one artifact and one idea: a single component, a single interaction, one screen set or one page; never a collage of unrelated work.
  **Why** The craft accounts' top posts are all single artifacts; the caption can then name it in 3-8 words and the viewer gets it in one glance [V][D].
  **Applies to** every X export. **Check** the media shows one subject; the caption names it in <= 8 words or states one claim. **Source** Flo, Mariana, Paco, rauno timelines; `data/_summary.json`

- **RULE** XP-02 Anything that moves ships as a silent video loop of 8-16 s at 60 fps that plays one complete state cycle and ends where it began.
  **Why** Craft posters' medians are 9-16 s; video runs at 1.03x median engagement vs 0.76x for single images [D].
  **Applies to** components, micro-interactions, product moments. **Check** duration 8-16 s; last frame equals first frame (loop seam invisible); no audio dependency. **Source** `data/_summary.json` (vidDurMedian per account), `_captions.json` byFormat

- **RULE** XP-03 The first frame is the money frame: open the video on the finished, legible state, not a blank canvas or a loading state.
  **Why** X's embed (and link previews) show the poster frame with a play button and do not autoplay [M].
  **Applies to** every video post. **Check** frame 0 contains the full component at rest. **Source** `knowledge/benchmarks/x-posts/*-video-*.png`

- **RULE** XP-04 Export 2-image posts at 7:8 (1760x2000 px or larger at the same ratio) with the subject centred and >= 8% margin.
  **Why** X renders each tile of a 2-up at 256x289 CSS px (0.885); Flo and rico export exactly this ratio and lose nothing [M].
  **Applies to** pairs (light/dark, two states, two screens). **Check** both images 0.87-0.89 w/h. **Source** `embed-measure.json` (2100478630375628922, 2108967996190244979, 2107824471260180607)

- **RULE** XP-05 Export 3-image posts as one 7:8 lead (1760x2000) plus two 16:9 details (2400x1350); never three equal images.
  **Why** X shows the lead at 256x289 and the other two at 256x144 each; equal 7:8 images get their middles cut [M].
  **Applies to** hero + two close-ups. **Check** image 1 at 7:8, images 2-3 at 16:9. **Source** `embed-measure.json` (2095554943218229439)

- **RULE** XP-06 Export 4-image posts as four 16:9 images (2400x1350) that share one canvas tone; crop each to the moment you want seen.
  **Why** X shows a 2x2 of 256x144 tiles and centre-crops; uisabor's full-page shots show only their middle band, and Flo's 4-ups of 7:8 images are his weakest format (median 90 vs 154 for pairs) [M][D].
  **Applies to** sets: landing sections, screens, explorations. **Check** all four at 1.76-1.79 w/h. **Source** `embed-measure.json` (2100871031879847970, 2105700142188007604); `data/flohoeller.json`

- **RULE** XP-07 A single still is landscape 16:9 to 3:2 for UI, or portrait no taller than 0.84 (5:6) for a poster; anything taller loses its top and bottom.
  **Why** A 0.79 image rendered at 514x612 with its headline cut; a 0.84 portrait is the largest single footprint in the feed [M].
  **Applies to** single images. **Check** w/h >= 0.84; nothing important in the outer 6% of a portrait. **Source** `marcelkargul-single-type-argument.png`, `embed-measure.json`

- **RULE** XP-08 Put the work on a solid canvas: #f7-#fafafa for light work, #0a-#111 for dark work; no gradient blobs, wallpapers, device frames or browser chrome behind a component or screen.
  **Why** The craft accounts all use flat near-white or near-black canvases; colour belongs to the artifact [V].
  **Applies to** component, screen and interaction posts (not icons or brand objects, see XP-21). **Check** canvas pixels outside the artifact are one solid colour (delta E < 2). **Source** contact sheets of Flo, Mariana, Paco, rauno, Raphael, Jakub

- **RULE** XP-09 Choose one crop distance per post: close (component at 1.5-2x scale, 35-55% of frame width, in its tray) or far (1x, 12-20% of a 4K frame, dead centre); screens go edge to edge or crop off one edge.
  **Why** Both schools read as intentional; in-between framing (a component floating at 60-80% with uneven margins) reads as a screenshot [V].
  **Applies to** every visual post. **Check** artifact width / frame width in [0.35, 0.55] or [0.12, 0.20]; or the screen touches at least one frame edge. **Source** Flo vs Mariana timelines

- **RULE** XP-10 Interaction videos show a real cursor that travels with intent, presses (scale ~0.9) and releases in sync with the component's state changes.
  **Why** Mariana, Flo, Jakub and Emil all show the pointer; it tells the viewer where to look and proves the interaction is real [V]; matches the founder's component-post rule in founder-taste.
  **Applies to** interaction and component videos. **Check** cursor visible in >= 80% of frames; each state change follows a press. **Source** `mrncst-video-tiny-component.png`, `flohoeller-video-component-context-window.png`; founder-taste (component posts)

- **RULE** XP-11 Export at 2x or more: stills 2000-4096 px wide, video 1800-3840 px wide at 60 fps, H.264; keep the poster frame sharp after JPEG re-encoding (no 1px hairlines on mid-grey).
  **Why** Median uploaded width is 2,160 px; X re-encodes stills to JPEG, and the craft accounts upload 4K so the zoomed view stays crisp [D][S].
  **Applies to** every export. **Check** media width >= 1800; fps 60; file < 512 MB video, stills sized for the 5 MB API limit when scripted. **Source** `data/_summary.json` (widthMedian), docs.x.com media best practices

- **RULE** XP-12 No headline text inside component or screen media; the caption carries the words. Text in media is allowed only for launch title cards, before/after chips, and spec posters where the specimen is the content.
  **Why** Text overlays are absent from every top craft post; the exceptions are named title cards (Raphael), Jakub's Before/After chip and Marcel's type posters [V].
  **Applies to** every visual post. **Check** no text in the media that is not part of the product UI, unless the format is title-card, before-after or spec-poster. **Source** contact sheets

- **RULE** XP-13 Caption a showcase in 3-8 words that name the thing, in sentence case, with no hashtags and at most one emoji at the end.
  **Why** Component-label captions run at 1.38x median; hashtags appear in 1% of 1,161 posts; Flo's median caption is 4 words [D].
  **Applies to** showcase posts. **Check** word count 3-8; `#` count 0; emoji count <= 1 and last. **Source** `_captions.json` byTag, `_summary.json`

- **RULE** XP-14 Never lead with a question or a bare "WIP / exploring" caption; state what it is or what changed.
  **Why** Question captions ran at 0.5x and "WIP/exploring" at 0.84x the author's median [D].
  **Applies to** all posts. **Check** caption does not end in "?" and is not only a WIP label. **Source** `_captions.json` byTag

- **RULE** XP-15 A teaching post opens with the principle in one sentence of <= 15 words, adds one or two sentences of why, and shows the difference in the media; keep the whole claim before the ~280-character fold.
  **Why** Emil's and Jakub's lessons follow this shape (principle, "Here's the difference it makes:", side-by-side) and lessons ran at 1.17x; long posts fold at about 280 characters [D][M].
  **Applies to** lessons and tips. **Check** first sentence <= 15 words; total before fold <= 280 chars. **Source** Emil, Jakub timelines; `marcelkargul-single-type-argument.png`

- **RULE** XP-16 Prove a fix with a before/after in the same frame: same content, a small "Before / After" chip, each state held >= 3 s, the after state last.
  **Why** The two biggest craft posts in the sample are Jakub's before/after videos (4,517 and 3,921 likes, 9.8x his median); the pattern ran at 3.3x (n=4) [D].
  **Applies to** reviews and fixes (the engine's review-and-fix mode). **Check** both states share framing; toggle chip visible; after state is the final frame. **Source** `jakubkrehel-video-before-after.png`

- **RULE** XP-17 Make at least one post in five reference-grade (a spec with numbers, a cheat sheet, a reusable component, a resource list) so people save and share it.
  **Why** Bookmarks run at 0.45 per like and above 1 for reference posts; X weights share-by-link at 20 and DM share at 5, 40x and 10x a like [D][S].
  **Applies to** posting plans. **Check** the post contains reusable values, code or a link to a usable thing. **Source** `_captions.json` bmPerLike; x-algorithm param.rs

- **RULE** XP-18 Keep links, credits, the prompt and process notes out of the showcase post; put them in the first self-reply.
  **Why** 54% of 218 self-replies carry a link; the main post stays a clean artifact; credits go to collaborators by @-mention [D].
  **Applies to** showcase and launch posts. **Check** main post has no URL (except a launch); first reply has the link or credits. **Source** `data/*.json` replying_to self

- **RULE** XP-19 Name recurring formats as a series (№ 1, v2, Week 2, Part 3) and keep the canvas, crop and caption grammar identical across the series.
  **Why** Paco's "Caret № 1", Steve's "Week 2" and similar numbered posts ran at 2.95x (n=6, small) and train followers to recognise the format [D].
  **Applies to** ongoing work (e.g. one series per client build). **Check** series label present; canvas and ratio match the previous entry. **Source** `_captions.json` byTag version/number

- **RULE** XP-20 Fill product UI with believable, coherent content (real-looking names, numbers, sources) and never lorem ipsum or placeholder bars; label sample data as sample if it could be mistaken for a client's.
  **Why** rico's, Flo's and Marcel's screens are judged at 2x zoom by other designers; fake content is the first thing they spot. Engine principle: never invent proof [V].
  **Applies to** product screens and components. **Check** no lorem; numbers internally consistent; no real client logos unless real. **Source** contact sheets; CLAUDE.md principle 4

- **RULE** XP-21 Objects (icons, logos, app tiles) sit centred at 25-35% of frame height on a soft brand-tinted field or white at 16:9 (2048x1152), with their own shadow.
  **Why** Gavin's icon posts ("what about... small icons, no labels", 3,798 likes) and Fons's marks use this framing; it is the one place a gradient field is normal [V][D].
  **Applies to** brand marks and icons. **Check** object height / frame height 0.25-0.35; ratio 16:9. **Source** `gavmn-image-small-icons.png`, `fonsmans-image-pictograms.png`

- **RULE** XP-22 Use a square 1:1 video (2160x2160) for lessons, code tricks and generative visuals; use a 3:1 or 2:1 strip for single-row controls.
  **Why** A square fills 514x514 in the feed (1.78x the height of 16:9; jhey, Oğuz, Derek Briggs); a strip shows a row of tabs or an input at full size with no dead space (Paco's 1200x400) [M].
  **Applies to** lessons, controls. **Check** ratio 1.0 for lessons; 2.0-3.0 for strips. **Source** `jh3yy-video-square-css-tip.png`, `pacocoursey-video-3x1-exclusion-tabs.png`

- **RULE** XP-23 Post a landing page as its hero: a 4:3 or 16:9 video of the load-in or a slow scroll (10-20 s), or a 4-up of four 16:9 section crops; keep full-page tall screenshots for the click-through only.
  **Why** Basit's and Meng's site posts are hero videos at 2452x1802 / 2880x2160; X centre-crops tall page shots in grids [V][M].
  **Applies to** landing pages and site sections. **Check** first frame = fully loaded hero; any grid image is 16:9. **Source** `basit-video-minimal-landing.png`, `uisabor-4up-landing-layout.png`

- **RULE** XP-24 Show dark and light as a 7:8 pair in one post rather than two posts.
  **Why** Flo's "Thinking state – light & dark mode" and rico's paired sets; a pair is the strongest image format in the sample (2-up 1.2x median) [D].
  **Applies to** any component or screen with both modes. **Check** 2 images, same crop, one light one dark. **Source** Flo, rico timelines; `_captions.json` byFormat

- **RULE** XP-25 For an AI-made or AI-assisted piece, say what the tool did and what you did, in one line, and show the result, not the prompt UI.
  **Why** Meng To and Steve Schoger's reach rides on naming the model, but the media is always the finished site or dashboard; Alex Barashkov states the split ("65 prompts + a little manual fine tuning") [V][D].
  **Applies to** posts about engine-made work. **Check** caption names tool and human share; media is the output. **Source** MengTo, steveschoger, alex_barashkov timelines

- **RULE** XP-26 Post at most one or two visual posts a day per account and space them out; do not thread a gallery into ten posts.
  **Why** X multiplies each post after an author's first in a viewer's feed by a decaying author-diversity factor; the craft accounts post visuals 0.1-1.3 times a day [S][D].
  **Applies to** posting plans. **Check** <= 2 media posts per 24 h. **Source** x-algorithm README (Author Diversity); `_summary.json` postsPerDay

- **RULE** XP-27 Credit every collaborator and source by @-mention, and never present someone else's recreated detail as your own idea: "{Detail} from {Brand}" or "h/t @{who}".
  **Why** Paco names the brand he recreated; rauno credits lochie for the inspiration; credit is the norm and its absence is noticed by peers [D].
  **Applies to** all posts. **Check** recreations name the origin; collaborators are tagged. **Source** pacocoursey, raunofreiberg timelines

- **RULE** XP-28 Before posting, render the post the way X will: export at the format's canvas, check the tile crops in `system/variety/x-post-formats.json`, and look at the poster frame at 514 px wide.
  **Why** Most crop failures (tall singles, 7:8 images in a 4-up, a blank first frame) are only visible at feed size [M].
  **Applies to** every X export from the engine. **Check** `node tools/shot.mjs <page> <out.png> --w <canvas w/2> --h <canvas h/2> --scale 2`, videos via `node tools/record.mjs <url> --name <name> --preset x`; view at 514 px. **Source** `embed-measure.json`; CLAUDE.md (record.mjs)

## 8. Numbers & scales

| Item | Value |
|---|---|
| 2-up tile | 256x289 CSS px (0.885); export 1760x2000 |
| 3-up tiles | 256x289 + 2 x 256x144; export 1760x2000 + 2 x 2400x1350 |
| 4-up tiles | 4 x 256x144 (16:9); export 2400x1350 each |
| Single portrait floor | ~0.84 w/h (514x612) |
| Single landscape | native up to 3:1 (514x171) |
| Square video | 2160x2160 → 514x514 |
| Component video canvas | 1800x1200 (Flo-like) or 3840x2160 (Mariana-like) |
| Video duration | craft median 9-16 s; all-post median 14.8 s; p90 56 s |
| Upload width | median 2,160 px; up to 5,160 |
| API limits | image 5 MB; GIF 15 MB, 1280x1080, 350 frames; video <= 60 fps, 1:3 to 3:1, 20 min / 8 GB default |
| Caption length | median 14 words; showcase 3-8; teaching 15-45 |
| Lowercase start | 25% of posts (voice-specific) |
| Hashtags / emoji / question / link | 1% / 17% / 9% / 22% |
| Self-replies with a link | 54% |
| Bookmarks per like | median 0.45 (p25 0.25, p75 0.71) |
| Likes per view | median 1.57% (p25 1.04%, p75 2.25%) |
| Ranking weights | copy-link share 20, reply/quote/DM 5, follow 4, share 2, repost 1, like 0.5 |

## 9. Dos and Don'ts

- **Do** export Flo's 1760x1996 pair for two states (`flohoeller-2up-7x8-chatbox.png`). **Don't** put four 7:8 images in one post (`flohoeller-4up-7x8-settings.png`: every tile cropped to 16:9, 90 likes vs a 154 median for his pairs).
- **Do** crop landing sections to 16:9 yourself. **Don't** upload four 3:4 full pages and hope the hero shows (`uisabor-4up-landing-layout.png`: X shows the middle of each page).
- **Do** keep a portrait poster at >= 0.84. **Don't** post a 0.79 poster with the headline at the top (`marcelkargul-single-type-argument.png`: "Geist" cut off).
- **Do** let a single-row control fill a 3:1 strip (`pacocoursey-video-3x1-exclusion-tabs.png`). **Don't** float a tab bar in the middle of a 16:9 frame with 70% empty space.
- **Do** caption with the name of the thing ("Project card component"). **Don't** caption with "thoughts?" or "Which one, 1 or 2?" (0.5x).
- **Do** put the link in the first reply. **Don't** stack hashtags or a list of tools in the showcase caption.
- **Do** show a before/after in one frame with a toggle chip (`jakubkrehel-video-before-after.png`). **Don't** post the "after" alone and describe the "before" in words.

## 10. Exceptions & judgement calls

- **Launches** may carry a link and a longer caption in the main post ("Introducing X. One line."); the big launch posts (Josh, Jakub, lochie) do, and they are the top performers. [D]
- **Lowercase** is a personal voice: fine for an individual designer's account, wrong for a studio or client account unless the brand writes that way. [D]
- **Gradient or scenic backgrounds** belong to icons, brand objects and landing-page content; for a component or screen they read as decoration (the engine's dark-mode rule against colour blobs applies here too). [V]
- **Long video** works only for education with a face and a voice (Meng To, Steve Schoger); for client work keep loops short. [D]
- **AI-tool name in the caption** lifts reach for creators who sell AI workflows; for a studio presenting client work it is neutral and can undercut the craft claim. Decide per post. [D]
- **Small samples**: before/after (n=4), numbered series (n=6), no caption (n=8) and multi-video (n=9) have strong medians on few posts; treat them as direction, not law. [D]
- **The algorithm weights** are defaults X can change; they scale predicted probabilities per viewer, so a "copy link" post only wins if it is genuinely worth sending. [S]

## 11. Figures worth keeping

Paths under `knowledge/benchmarks/x-posts/` (see `CREDITS.md` for URLs and counts):
- `flohoeller-video-component-context-window.png`: the component-loop format: one component in its tray on #fafafa, 3:2.
- `flohoeller-2up-7x8-chatbox.png`: 7:8 pair exported to X's exact tile.
- `flohoeller-3up-7x8-recent-product.png`: 3-up layout (7:8 lead + two 16:9) with real product screens cropped off an edge.
- `flohoeller-4up-7x8-settings.png`: the failure: 7:8 images forced into 16:9 tiles.
- `mrncst-video-tiny-component.png`: the far crop: tiny component dead centre on a 4K white frame.
- `pacocoursey-video-3x1-exclusion-tabs.png`: 3:1 strip for a single control.
- `jakubkrehel-video-before-after.png`: before/after toggle format.
- `emilkowalski-video-stagger-lesson.png`: lesson caption + comparison video.
- `jh3yy-video-square-css-tip.png`: square lesson video with code in the post.
- `marcelkargul-single-type-argument.png`: spec poster and the portrait crop floor.
- `marcelkargul-3up-portrait-cleanest.png`: phone screens in a 3-up.
- `uisabor-4up-landing-layout.png`: landing pages in a 4-up and the centre crop.
- `basit-video-minimal-landing.png`: hero video post.
- `gavmn-image-small-icons.png`: object on a soft field.
- `fonsmans-2up-portrait-bots.png`, `fonsmans-4up-portrait-allin.png`: brand posters in grids.
- `oguzyagizkara-video-square-shader-workflow.png`: square generative/product video.

## 12. Open questions

- The x.com web timeline (logged in) may crop slightly differently from the embed (the embed's media column is 514 CSS px; the logged-in timeline column is somewhat wider). Tile ratios should match, but the portrait floor was only measured in the embed.
- Whether X autoplays and loops short videos in the logged-in timeline, and from what length it stops looping, could not be observed without a session.
- Views are missing for posts older than X's view counter (Paco's older posts show 0), so view-based rates use recent posts only.
- Eleven accounts returned 404 through the mirror (listed in section 1); their habits (e.g. Anthony Hobday's visual-design rules, Michal Malewicz's tip carousels) are not covered.
- Reply sentiment and who reposted what were not read; "what gets engagement" uses likes, bookmarks and views only, plus X's published weights.
