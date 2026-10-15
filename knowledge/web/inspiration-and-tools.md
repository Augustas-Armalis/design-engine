---
source: web:multi (robots.txt, llms.txt, homepages and category URLs of 35 galleries and 45 tool sites fetched 2026-10-15 with curl and WebFetch; X handles resolved through api.fxtwitter.com; MCP/API docs of Mobbin, Refero, Savee, Curated, Landing.Gallery, One Page Love, Fontsource, Fontshare, tints.dev; earlier ToS reads in knowledge/ecosystem/reference-sources.md, 2026-10-08)
chapter: Where to find inspiration, which tools pros use, and how the engine can use each one
pages: n/a (web)
topic_tags: [inspiration, galleries, references, tools, figma-plugins, browser-extensions, mac-apps, ai-design-tools, fonts, colour, textures, people, automation, robots, tos]
status: studied
---

# Inspiration and tools: the map

Machine-readable twin: `system/inspiration-sources.json` (35 galleries, 9 font sources/tools, 13 colour/texture tools, 32 designer/AI tools, 34 X handles, each with `automatable`). Legal and licence depth lives in `knowledge/ecosystem/reference-sources.md` (2026-10-08, data classes A pointer / B own measurement / C gallery expression); this note is the working map and the routine, and it records what changed since.

Evidence tags: **[F]** fetched 2026-10-15 (page, API or llms.txt answered); **[R]** robots.txt read 2026-10-15; **[P]** prior note 2026-10-08; **[S]** secondary (search snippet, third party); **[M]** memory, verify before relying. Not legal advice; re-read terms before any bulk step.

## 1. Core ideas

1. **Galleries tell you which sites to study; the original site is what you measure.** A gallery screenshot is a compressed, cropped, dated copy owned by the gallery. The engine opens the original URL, renders it, and measures computed styles (`check.mjs`, `teardown-measure.js`, `compare.mjs`). This is also the only legally clean thing to store (class B) [P].
2. **Pros run four verbs: collect, deconstruct, measure, recombine.** Collect 6-12 candidates fast and wide; deconstruct each into named decisions (layout, type tuple, CTA grammar, light source, proof device, motion); measure the 2-3 that matter; recombine by taking at most one decision per reference (the DIRECTION.md reference triad). Copying is taking many decisions from one source; design is taking one decision each from many.
3. **Match the gallery to the surface.** Section galleries (SaaSFrame, Navbar Gallery, Footer, CTA Gallery, Hero Gallery, Curated, Mobbin sections) beat whole-site galleries when the brief is a pricing page or a nav; whole-site galleries (Recent, Land-book, Siteinspire, Minimal Gallery, Dark) are for the fold, the brand world and the rhythm; product-UI libraries (Mobbin, Refero, Page Flows, SaaSFrame product categories) are for app screens and flows.
4. **Templates and AI showcases are the floor, not the bar.** Framer marketplace, v0 and Lovable templates show what a $0-79 default already does. If our build could be listed there, it has not diverged. Study them as anti-references (founder taste: "same font, button styling, roundness, nav and ideas every time").
5. **People beat galleries for craft details.** The micro-decisions (stagger, focus ring, progressive blur, row pitch, grain only in the light) are posted by named designers on X (Kargul, Rico, Basit, Flo, Emil, Rauno, Paco, Jhey), usually as 9-16 s videos (`x-design-posts.md`). Galleries show results; people show how.
6. **Agent channels exist now and are the polite path.** Mobbin, Refero, Savee, Curated, Landing.Gallery and Siteinspire ship MCP servers; One Page Love opened its API; Land-book, Mobbin, Refero, Navbar Gallery, Footer, Savee, Cosmos, Framer and One Page Love publish `llms.txt` [F]. Use the channel the owner built; never parse HTML the owner asked agents not to parse.
7. **Robots and bot walls are instructions, not obstacles.** Behance blocks Claude agents outright; Lapa Ninja, Saaspo, maxibestof.one, uncut.wtf and Land-book's HTML served Cloudflare challenges; Siteinspire and gradient.page served a Vercel checkpoint (429) [F,R]. The engine stops there and hands the URL to a human. It never solves a challenge, rotates user agents or uses a login it was not given.
8. **Several signals moved in a week.** SaaSFrame now sends `Content-Signal: ai-train=no, search=yes, ai-input=yes` and only blocks GPTBot (was `Disallow: /*?` for all other agents) [R]; One Page Love's API went from waitlist to "key in seconds" with a free tier [F]; Godly is now Recent (godly.website 301 -> recent.design) with launch videos, OG images, tools and skills [F]; curated.design launched a Pro MCP with `plan_page` and `get_design_system` [F]. Re-check `robots.txt` before each automated use; the JSON's `notes` carry the date.
9. **Tools are a spec for what the engine should replicate in code.** Screen Studio (auto-zoom cursor video), Rotato (3D device moves), Pika/Shots (screenshot on a styled canvas), xScope (overlay rulers), VisBug/CSS Peeper/WhatFont (inspect) each map to an engine script that already exists or is small to write (section 3.3). The engine does not need the apps; it needs their output grammar.
10. **Licences decide what ships, not what inspires.** Fontshare's ITF FFL allows commercial use but not redistribution [S]; Pangram Pangram trials are personal-use only [S]; fffuel graphics are commercial-OK but not redistributable [F]; Realtime Colors' repo is CC BY-NC-ND [P]. Pick by taste, then check the licence column before the font or asset enters a client build.

## 2. Rules

- **RULE IR-01** Before any brief, pull references from at least three sources of different kinds: one section gallery, one whole-site gallery, one people/product source (X handle or Mobbin/Refero). Never from one gallery only.
  **Why** One gallery has one curator's taste and one crop style; the recurring failure is one grammar for every brand. **Applies to** all. **Check** DIRECTION.md reference log lists >= 3 distinct `source` values. **Source** [engine note]; CLAUDE.md principle 2.
- **RULE IR-02** Pricing page: start from SaaSFrame `/categories/pricing-page` and `/categories/comparison-page`, Landing.Gallery MCP `search_inspiration` with page type pricing, and (founder account) Mobbin `search_sections "pricing"`; then render 2-3 originals and measure plan-card width, toggle, ruled grid, CTA placement against `section-anatomy.md` pricing numbers.
  **Why** Pricing is a section problem; section galleries hold 93-211 pricing crops [P] while site galleries mostly show folds. **Applies to** landing page. **Check** DIRECTION.md cites >= 2 measured originals with values. **Source** [F] SaaSFrame categories, Landing.Gallery `/inspiration/pricing_page`; [P].
- **RULE IR-03** Hero / fold: start from Recent `/websites`, Dark (if dark) or Minimal Gallery (if light editorial), Hero Gallery tags (SaaS, Fintech, Productivity) and Supahero; finish with the founder's references in `knowledge/larpo-shipped/` and `engine-accepted/kestrel/`. Measure h1 size/weight/tracking, product-window edge, light source.
  **Why** Folds carry the identity; the shipped bar outranks any gallery. **Applies to** landing page. **Check** `compare.mjs` side-by-side with one accepted reference before delivery. **Source** [F]; CLAUDE.md quality bar.
- **RULE IR-04** Product UI / dashboard: Refero and Mobbin (founder accounts) for screens and flows, SaaSFrame `/categories/dashboard`, `/table`, `/settings`, plus Kargul, Rico and Flo on X; measure against `product-ui-deep.md` (sidebar width, row pitch, icon size, KPI size) with `compare.mjs`.
  **Why** Product screens are judged against a reference, not by eye (founder: "too noobish"). **Applies to** SaaS app UI. **Check** onion-skin overlay exists in `work/<name>/`. **Source** [F,P]; CLAUDE.md craft reminders.
- **RULE IR-05** Dark builds: Dark (`dark.design`, ~247 picks, AI and Software filters), Navbar Gallery `/style/dark`, Footer `/styles/dark`, then the measured dark set in `knowledge/benchmarks/dark/`. Reject any reference whose colour budget exceeds ~3% of the fold.
  **Why** Dark galleries are full of glow blobs; `dark-mode-premium.md` sets the bar. **Applies to** landing page. **Check** colour-pixel share on the chosen reference fold. **Source** [F]; `dark-mode-premium.md`.
- **RULE IR-06** Nav, footer, CTA: open the dedicated gallery first (Navbar Gallery 450+ with 118 style tags, Footer by style, CTA Gallery by category), pick a grammar by name from `nav-grammars.md` / `footers.md`, and only then look at examples.
  **Why** Naming the grammar first stops "the nav from the last build". **Applies to** landing page. **Check** DIRECTION.md variety row names the grammar. **Source** [F].
- **RULE IR-07** Deconstruct every kept reference into one row: URL, gallery, date seen, the single decision taken, the decision explicitly not taken. Take at most one decision per reference.
  **Why** One decision per source is recombination; several from one source is a copy. **Applies to** all. **Check** reference log rows each have exactly one `taken`. **Source** [engine note].
- **RULE IR-08** Measure the original site, never the gallery image. Store only class A (pointer) and class B (own measurement) data; gallery screenshots are viewed live, never committed, never in `examples/` or `evals/`.
  **Why** Gallery images are compressed copies under the gallery's copyright; Mobbin 3.5, Refero and Savee 5b forbid using their content for evaluation [P]. **Applies to** all. **Check** `git ls-files` contains no gallery CDN images. **Source** [P].
- **RULE IR-09** Before automated access, read the source's `automatable` value in `system/inspiration-sources.json` and its live `robots.txt`; on 403, 429, a challenge page ("Just a moment", "Checking your browser", "Vercel Security Checkpoint") or a login wall, stop and list the URL for the founder.
  **Why** Bot walls and robots rules express the owner's wish; bypassing them is out of bounds. **Applies to** all. **Check** no request logs with challenge responses followed by retries. **Source** [F,R].
- **RULE IR-10** Prefer the owner's agent channel: MCP > official API > RSS/sitemap > one polite page fetch. Use MCPs interactively (a few queries per brief), never in a loop to mirror a library.
  **Why** Landing.Gallery and Mobbin expose MCPs precisely so agents stop scraping, with rate limits (Mobbin 60 req/60 s) and no-mirroring terms. **Applies to** all. **Check** query count per brief <= ~15 per source. **Source** [F,P].
- **RULE IR-11** Prefer references seen or shipped in the last 12 months; check the gallery date or the site's footer year. Use older classics only for a named reason.
  **Why** SaaS marketing grammar turns over yearly (bento, product-led heroes, agent UI); old folds teach dated moves. **Applies to** landing page. **Check** reference log `date` within 12 months or an override line. **Source** [engine note].
- **RULE IR-12** Open two Framer marketplace SaaS/AI templates and one v0 or Lovable template at the start of a brief as the commodity baseline; list the three moves they all share and avoid at least two of them.
  **Why** Templates over-index on giant wordmarks, CTA-merged footers and chip badges (`footers.md`: 2 of 6 templates vs 5 of 43 real sites); divergence must be measured against the default. **Applies to** landing page. **Check** DIRECTION.md "commodity moves avoided" line. **Source** [F]; `footers.md`.
- **RULE IR-13** Use Dribbble and Behance for illustration, iconography and brand mood only, never as evidence that a UI pattern ships or converts.
  **Why** Concept shots ignore content, states and responsiveness. **Applies to** all. **Check** no Dribbble/Behance URL cited as a structural reference. **Source** [P].
- **RULE IR-14** Read the X timelines of 8-12 core handles (section 3.2) weekly through the public FixTweet API (`knowledge/benchmarks/x-posts/scripts/harvest.mjs`), and credit any detail borrowed as "{detail} from {person}" in DIRECTION.md.
  **Why** Craft details surface on X weeks before galleries; credit is XP-27. **Applies to** all. **Check** credit line present when a person is cited. **Source** `x-design-posts.md` XP-27.
- **RULE IR-15** Fonts: shortlist from `system/variety/type-voices.json`, then confirm licence and features through the Fontsource API (`/v1/fonts?family=`) or the Fontshare API (`/v2/fonts`, lists OpenType tags); never ship Pangram Pangram trial files, never commit ITF FFL files to a public repo.
  **Why** A beautiful face with the wrong licence cannot ship; feature tags decide whether `tnum`/`ss01` exist. **Applies to** all. **Check** licence field recorded in DIRECTION.md. **Source** [F,S].
- **RULE IR-16** Colour: generate ramps in code (tints.dev API returns 50-950 in oklch, Radix 12-step roles, culori for gamut), then contrast-check; use Coolors, UI Colors and Realtime Colors only by hand for exploration.
  **Why** Programmatic ramps are reproducible and token-ready; hand tools have no API or forbid reuse. **Applies to** all. **Check** palette tokens trace to a generator call or a measured site. **Source** [F,P].
- **RULE IR-17** Textures and fields: build them in code (Paper Shaders with pinned version and `speed: 0` when static, SVG `feTurbulence` grain, CSS gradients in oklab) rather than shipping downloaded PNGs from Grainient, fffuel or Haikei; if a downloaded asset ships, record its licence.
  **Why** Code fields scale, theme and animate; fffuel forbids redistribution and Grainient is a subscription [F,S]. **Applies to** landing page. **Check** no unlicensed bitmap backgrounds in `work/<name>/public`. **Source** [F]; `effects-materials.md`.
- **RULE IR-18** Before using any OpenType feature or axis in CSS, confirm it exists in the font (Fontshare API `features`, opentype.js, or Wakamai Fondue by hand).
  **Why** `font-feature-settings` on a missing feature fails silently. **Applies to** all. **Check** feature list saved beside the font choice. **Source** [F].
- **RULE IR-19** Founder-account sources (Mobbin, Refero, Curated Pro, Savee, Cosmos boards, x.com behind login) are reached only through the founder's own OAuth or browser; the engine prepares the exact query list and receives URLs back.
  **Why** Paid seats are single-user and ToS-bound; agents must not reuse credentials. **Applies to** all. **Check** no credentials in repo or logs. **Source** [F,P].
- **RULE IR-20** Video and post assets follow the tool grammar, made in code: Screen Studio-style zoom = scripted cursor path + CSS scale on click keyed to the `T` timeline, recorded with `tools/record.mjs`; Pika-style post = an HTML frame at an X crop ratio from `system/variety/x-post-formats.json`, exported with `tools/shot.mjs`; Rotato-style device move = CSS 3D transform rig.
  **Why** Owning the pipeline keeps output frame-exact and reproducible without paid apps. **Applies to** landing page, X posts. **Check** asset has a script, not a manual export. **Source** [F] tool sites; `x-design-posts.md`.
- **RULE IR-21** Write a `## References` block in DIRECTION.md: `source | gallery URL | original URL | date | taken | measured values`.
  **Why** Credit, takedown path and ledger learning all need the pointer. **Applies to** all. **Check** block present before build. **Source** [P].

## 3. Numbers and tables

### 3.1 Inspiration galleries (35 checked 2026-10-15)

Automatable: **mcp / api / rss** = official channel; **polite** = robots allows agents, no ToS clause found against it, one human-picked page per brief at <= 1 req/s with a descriptive UA, pointers only; **manual** = human browses; **founder** = founder's paid login.

| Source | Content | Quality for SaaS | Free | Login | Category URL pattern (verified 200 where shown) | Automatable |
|---|---|---|---|---|---|---|
| Recent (ex-Godly) `recent.design` | Sites, launch videos, OG images, app icons, app-store shots, tools, skills | Highest motion/craft taste; few SaaS filters | yes | no | `/websites`, `/launch-videos`, `/og-images`, `/tools`, `/skills`; item `/i/<id>-<slug>` | polite (robots Allow /, no terms found) [F,R] |
| Land-book | Large current gallery, sections, templates | Medium-high, volume | freemium | partial | item `/websites/<id>-<slug>`; filters are `?industry= ?style= ?color=` (disallowed) | rss (`/rss.xml` 200); HTML behind Cloudflare challenge on 2026-10-15 [F,R] |
| SaaSFrame | SaaS pages, product screens, emails, patterns | Best SaaS category fit | freemium (~$18/mo Pro [P]) | partial | `/categories/pricing-page`, `/landing-page`, `/features-page`, `/comparison-page`, `/ai-page`, `/dashboard`; `/patterns/bento-grid`, `/ai-chat`, `/ai-generation-state` | polite (Content-Signal ai-input=yes, ai-train=no) [F,R] |
| Mobbin | Web/mobile screens, flows, UI elements, website sections | Reference standard for patterns | freemium (Pro $10/mo yearly) | yes | `/explore/web/screens`, `/flows`, `/ui-elements`, `/explore/sites`; MCP `search_sections` (hero, pricing, nav, footer) | founder (MCP OAuth Pro, 60 req/60 s) [F,P] |
| Refero | 120k+ screens, flows, styles | High, product and marketing | paid | yes | `/search?order=trending`, `/search/flows`, `/pagetypes`, `/patterns`, `/elements` | founder (paid MCP `api.refero.design/mcp`, Skill on GitHub) [F,P] |
| Page Flows | Recorded web/iOS/Android flows | High for funnels/onboarding | freemium | partial | `/web/`, `/<platform>/flows/<flow>/`, `/<platform>/elements/<el>/` | manual (most paid; robots allows /) [F,R] |
| Lapa Ninja | 5-7k landing pages | Medium | yes | no | `/category/saas/` [P] | manual (Cloudflare 403; Browser pane blocked) [F] |
| Awwwards | SOTD/SOTM, scored | Top creative; studio bias | yes | no | `/websites/saas/`, `/websites/web-interactive/`, `/websites/data-visualization/` (200) | manual (no commercial use w/o authorisation [S]; `/websites/?` filters disallowed) [F,R] |
| Siteinspire | 10k+ editorial picks | High type/layout | yes | no | `/websites/category/technology`; MCP `/api/mcp` | mcp (robots allows Claude-User + MCP, blocks ClaudeBot; HTML gave 429) [F,R,P] |
| Minimal Gallery | Whitespace-led sites | High for light editorial | yes | no | `/tag/saas/`, `/platform/framer/`, `/platform/tailwind/` | polite [F,R] |
| Dark `dark.design` | ~247 dark sites | High for dark folds | yes | no | `/site/<slug>`; filters AI, Software, Agency, Hardware (client-side) | polite [F,R] |
| Dark Mode Design | Older dark gallery | Medium | yes | no | Webflow pagination only | polite [F,R] |
| Layers `layers.to` | Designer posts, portfolios, jobs | Variable, current | yes | partial | `/explore` (Hot, All) | manual (client-rendered) [F] |
| Cosmos | Moodboards, colour/visual search | Brand mood, not UI | freemium ($8 Premium) | partial | `/explore`, `/search/elements/<q>` | manual / founder board [F,R] |
| Savee | Curated moodboards | Founder taste channel | freemium | yes | MCP `mcp.savee.com/mcp`, REST `api.savee.com/v1` | founder (OAuth, read-only; no AI training) [F,P] |
| Footer `footer.design` | Footers by style | Good, studio-run | yes | no | `/styles/dark`, `/styles/large-type`, `/styles/typographic` | polite [F,R] |
| Navbar Gallery | 450+ navs, 118 style tags | Good | yes | no | `/type/mega-menu`, `/type/static`, `/style/saas`, `/style/blurred` | polite [F,R] |
| CTA Gallery | Closing CTAs by category | Template-heavy | yes | no | `/categories/pricing`, `/categories/form`, `/categories/newsletter` | polite [F,R] |
| Supahero | Hero sections (part of screensdesign.com) | Good breadth | freemium | no | `/hero/<slug>`; search only | manual (Browser pane blocked; no robots) [F] |
| Hero Gallery `hero.gallery` | Tagged, audited heroes with opinions | Good for hero copy/CTA | yes | no | `/hero-gallery/<brand>`; tags SaaS, Fintech, Productivity | polite [F,R] |
| herosection.design | (redirects to `/lander`, looks parked) | n/a | n/a | n/a | n/a | skip [F] |
| Landing.Gallery | Landing pages by page type, builder, framework | High, tidy | yes | no | `/inspiration/pricing_page`, `/about_page`, `/careers_page`; `/website-builder/framer`; `/framework/next-js` | mcp (public, no auth, max 4 results) [F,P] |
| Curated `curated.design` | Section library + design systems of sites | High, agent-oriented | freemium (Pro $9/mo) | partial | `/sections/`, `/sites/s/<id>/`; MCP `plan_page`, `search_sections`, `get_design_system` | founder (Pro MCP; terms forbid wholesale scraping) [F,R] |
| One Page Love | 9,000+ one-pagers, section crops | Medium-high, taxonomy | yes | no | `/inspiration/saas`, `/inspiration/app`, `/inspiration/landing-page`, `/sections` | api (free tier, key in seconds; robots says use the API) [F,R] |
| maxibestof.one | (not verified) | ? | ? | ? | ? | manual (Cloudflare 403) [F,R] |
| Httpster | ~3,100 type-led sites | High identity | yes | no | `/type/application-or-software/`, `/style/typographic/`, `/style/dark/` | polite (no robots file) [F] |
| SaaS Landing Page | SaaS section crops | Medium | yes | no | `/pricing/`, `/faq/`, `/testimonials/`, `/features/` | polite [F,R] |
| Saaspo | SaaS sites | ? | ? | ? | ? | manual (403 challenge) [F] |
| Framer Marketplace | Templates with live previews | Commodity baseline | freemium | no | `/marketplace/templates/categories/saas/`, `/ai/`, `/startup/`, `/agents/` | polite (Content-Signal ai-input=yes) [F,R] |
| Dribbble | Concept shots | Low for shipped UI | yes | no | `/tags/saas_landing_page`, `/search/<q>` | manual (202 challenge) [F,R] |
| Behance | Case studies | Brand mood | yes | no | `/search/projects/<q>` | manual (robots blocks Claude agents) [F,R] |
| v0 templates | Community shadcn templates | AI-default baseline | yes | partial | `/templates/landing-pages`, `/templates/<id>` | polite [F,R] |
| Lovable templates | AI-built sites/apps | AI-default baseline | yes | partial | `/templates/websites`, `/templates/apps` | polite (Claude-User allowed) [F,R] |
| Fonts In Use | Type in real work | High for type | yes | no | `/typefaces/<id>` [M] | manual (blocks several AI agents) [F,R] |
| Typewolf | Type trends, pairings | High for type | yes | no | `/site-of-the-day` [M] | manual [F,R] |

### 3.2 People to follow (34 handles resolved via api.fxtwitter.com)

Followers at capture. Kargul, Rico, Basit, Flo, Emil, Rauno, Paco, Jhey are the core weekly read (IR-14). Full list with `bestAt` in the JSON.

| Handle | Who | Best at |
|---|---|---|
| @marcelkargul | Kargul Studio founder (60.3k) | Full product screens, banking UI, redesign roasts; ~9 posts/day |
| @kargulstudio | Kargul Studio (6.3k) | Studio launches, client work |
| @dariusdan | Illustrator at Kargul (25.9k) | SaaS icon and illustration systems |
| @basit_designs | Basit A. Khan, Grainient (24.8k) | Heroes in a rendered light field, shader cards |
| @_heyrico | Rico, Ace Studio (27.1k) | Agentic product UI, CRMs, fullview dashboards |
| @flohoeller | Flo, affectUI (5.3k) | AI-agent components in grey trays |
| @karrisaarinen | CEO/designer, Linear (93.9k) | Linear's quality philosophy |
| @emilkowalski | Linear (108k) | Animation lessons, easing/stagger |
| @pacocoursey | Linear (41.4k) | Micro-interactions, cmdk |
| @raunofreiberg | Vercel (95.4k) | Interaction details, focus rings |
| @rauchg | CEO Vercel (911k) | What ships in Geist/v0 |
| @glennui | ex Vercel, Poolside (9.0k) | Dark product marketing UI |
| @mrncst | Profound, ex Vercel (18.7k) | Small components centred on white |
| @shadcn | Vercel (245k) | What the default looks like |
| @peduarte | Raycast, ex Radix (39.4k) | Raycast polish, primitives |
| @thomaspaulmann | CEO Raycast (18.8k) | Release craft |
| @benjitaylor | Head of design X, co-founder Family (225k) | Family's fluid-motion lineage |
| @lochieaxon | Aave/Family (12.7k) | Text morphs, motion on black |
| @browsercompany | Arc, Dia (145k) | Launch films, playful brand UI |
| @attio | Attio (17.4k) | CRM UI drops (designers unidentified) |
| @jakubkrehel | Interfere (24.0k) | Before/after detail fixes |
| @raphaelsalaja | Warp, userinterface.wiki (14.4k) | Text-animation components |
| @jh3yy | Shopify (148k) | CSS techniques with code |
| @oguzyagizkara | Lue Studio (80.7k) | Shader/generative product visuals |
| @steveschoger | Refactoring UI (128k) | Dashboards in Claude Code, greys |
| @mds | Shift Nudge (89.5k) | Interface-craft teaching |
| @rsms | Inter designer (93.4k) | UI typography, type engineering |
| @emilwidlund | Polar design lead (13.6k) | Dev-tool product and brand |
| @dannpetty | Quiver AI (176k) | Visual design, AI workflows |
| @Gavmn | OpenAI (147k) | App icons |
| @FonsMans | Offgrid (232k) | Identity, pictograms |
| @MengTo | Design+Code (189k) | AI-generated three.js sites |
| @uisabor | (0.9k) | AI/SaaS landing 4-ups, trend scouting |
| @footrdesign | footer.design (3.6k) | Daily footer picks |

Not resolvable through the mirror on 2026-10-15: @evilrabbit_, @aaroniker, @joshm, @alignui, @mxstbr, @michalmalewicz (404 or error); see section 7.

### 3.3 Designer tools and what the engine replicates

| Tool | Kind | Good for | Engine equivalent (exists / to build) |
|---|---|---|---|
| Figma MCP (Dev Mode / remote) | plugin/MCP | Read frames as spec; push code to Figma | In deferred tools (`get_design_context`, `send_code_to_figma`); needs founder auth [F] |
| Autoflow | Figma plugin | Flow arrows between frames | SVG connector page [M] |
| Stark / Contrast | Figma plugin | Contrast, vision sim, focus order | `check.mjs` contrast + targets (exists) [M] |
| Iconify | plugin + API | 200k+ open icons with licence field | `api.iconify.design/<prefix>/<icon>.svg` (exists as practice) [P] |
| Unsplash | plugin + API | Real photos in mockups | API with hotlink + credit; no dataset use [P] |
| Content Reel | Figma plugin | Realistic names/avatars/text | Coherent sample data labelled sample [M] |
| html.to.design, Visual Copilot, Anima, Locofy | converters | Web <-> Figma | Prefer Figma MCP [M] |
| VisBug | extension | Edit spacing/type live | Playwright `evaluate` + `check.mjs` probes [M] |
| CSS Peeper | extension | Colours, fonts, assets of a page | `extract-design-system` skill, `teardown-measure.js` (exists) [F] |
| WhatFont / Fontanello | extension | Font, size, features on hover | `getComputedStyle` + `document.fonts` [M] |
| ColorZilla | extension | Eyedropper, page colour analysis | Area-weighted colour extraction [F] |
| Page Ruler | extension | Pixel distances | `getBoundingClientRect` diffs [M] |
| Responsively / Polypane | browser | Multi-viewport, a11y overlays | `shot.mjs` at 390/768/1440 (exists) [F] |
| CleanShot X | Mac | Scrolling capture, annotation | `shot.mjs --full` (exists) [F] |
| xScope | Mac | Rulers, loupe, overlays | `compare.mjs` onion-skin (exists) [F] |
| ColorSlurp | Mac | Screen picker + contrast | computed colour read [F] |
| Raycast | Mac | Launcher; itself a UI reference | n/a [M] |
| Screen Studio | Mac | Auto-zoom on clicks, smoothed cursor, padded gradient canvas | Scripted cursor + CSS zoom keyed to clicks, recorded by `record.mjs` (to build: `tools/demo_zoom.mjs`) [F] |
| Rotato | Mac | 3D device mockups, camera moves | CSS 3D rig or three.js device frame via `record.mjs` (to build) [F] |
| Pika / Shots | Mac/web | Screenshot on styled background for posts | HTML frame at X crop ratios (`x-post-formats.json`) + `shot.mjs` (to build: `tools/post_frame.mjs`) [F] |

AI design tools (what to learn, not to adopt as the bar):

| Tool | What it does well | Lesson for the engine |
|---|---|---|
| v0 | Prompt-to-React on shadcn; registry blocks | Iterate by diff; the output is the default look to diverge from [F] |
| Lovable | Prompt-to-full-stack app; visual edit | Plan before build; baseline for AI sameness [F] |
| Bolt | In-browser full-stack prototypes | Speed, not taste [F] |
| Google Stitch (ex Galileo AI) | Gemini-powered; up to 5 linked screens, infinite canvas, prototyping since March 2026; free in beta; Figma/HTML export | Multi-screen coherence from one brief; generic without brand control [S] |
| Magic Patterns | Prototypes inside the team's design system | Bind to the house system first (we do: `system/systems/`) [F] |
| Relume | Sitemap -> wireframe -> style guide -> Figma/Webflow | Plan sections before pixels (cf. Curated `plan_page`) [F,M] |
| Framer AI / Wireframer | Prompted responsive layouts | Breakpoints as compositions [M] |
| Subframe | Visual editor emitting React + Tailwind on a component library | One source for design and code [F] |
| Paper `paper.design` | Canvas on real HTML/CSS, shaders, agent access; in Kargul Studio's toolset | Code-native canvas; Paper Shaders as our field engine [F] |

### 3.4 Fonts and type tools

| Source | Free quality | Licence | Programmatic | Notes |
|---|---|---|---|---|
| Google Fonts | Geist, Inter Tight, Instrument Serif, many | OFL/Apache | Developer API (free key); undocumented `fonts.google.com/metadata/fonts` answered 200 (2.7 MB) | Prefer Fontsource for metadata [F,P] |
| Fontsource | All Google + extra open fonts | Upstream (API returns it: Geist `OFL-1.1`) | `api.fontsource.org/v1/fonts?family=`, no key; npm `@fontsource(-variable)/<id>` | Best metadata source [F] |
| Fontshare (ITF) | Satoshi, General Sans, Switzer, Cabinet Grotesk, Clash Display/Grotesk | ITF FFL: commercial use OK, no file redistribution or modification [S] | `api.fontshare.com/v2/fonts`, no key, returns OpenType feature tags | Never commit files to a public repo [F,S] |
| Pangram Pangram | Neue Montreal, Editorial New, Formula (PP) | Trials personal-use only; paid Desktop/Web/App licences [S] | none | Mockups only unless the client buys [S] |
| Velvetyne | Libre display faces | Mostly OFL, per-font repos [M] | GitHub | Distinctive, anti-default [F] |
| Collletttivo | Italian open-source collective | Per font, mostly OFL [M] | none | robots allows [F,R] |
| Uncut | Catalogue of libre fonts | Links to designers' licences | none (browser check page) | Human only [F,R] |
| Typewolf | Trend names, pairings, site of the day | n/a | none | Read by hand [F,R] |
| Fonts In Use | Type in shipped work | n/a | none (blocks AI agents) | Read by hand [F,R] |
| Wakamai Fondue | Inspect features, axes, coverage | n/a | local; engine uses opentype.js | IR-18 [M] |
| Fontpair / Fontjoy / Typescale | Pairing and scale generators | n/a | none | Low ceiling; `type-voices.json` is ours [F] |

### 3.5 Colour, gradient and texture tools

| Tool | Use | Programmatic | Licence / caution |
|---|---|---|---|
| tints.dev | Tailwind 50-950 ramp from one hex | `GET https://www.tints.dev/api/<name>/<hex>` -> oklch JSON, no key (verified) [F] | Check contrast after |
| Radix Colors | 12-step scales with roles, light + dark | npm `@radix-ui/colors`; `_color-tools/radix.py` | MIT [M] |
| UI Colors | Tailwind palettes in context | none found | By hand [F] |
| oklch.com | Picker with sRGB/P3 gamut | culori in Node | Open source [M] |
| Huetone | LCH/OKLCH palettes with APCA grid | local | Open source [M]; robots allows [F,R] |
| Coolors | Palette exploration | none | No API, crowd taste [F,P] |
| Realtime Colors | 5 colours + font pair on a sample site | none | Repo CC BY-NC-ND: never fork/embed [P] |
| Grainient | 1,000+ grainy/animated gradient backgrounds up to 8K (Basit) | none | Subscription; read licence before shipping [S] |
| gradient.page | (Vercel checkpoint 429) | none | Not verified [F] |
| Paper Shaders | Mesh, grain gradient, paper texture, dithering (28 shaders) | npm `@paper-design/shaders(-react)`; pin exact pre-1.0 version; WebGL2 fallback | Open source [F,S] |
| fffuel | 70+ SVG generators: nnnoise, gggrain, bbblurry, llline, ssscribble | none | Commercial OK, no attribution, no redistribution [F] |
| Haikei | Blobs, waves, layered steps | none | Easy to look dated [F,R] |
| Mesh `meshgradient.com` | Mesh gradients | none | Prefer Paper `MeshGradient` [F] |

## 4. Dos and Don'ts

- **Do** keep a gallery tab, the original site and our build side by side; **don't** design from the gallery thumbnail (cropped, recompressed, often an old version).
- **Do** take the decision (e.g. "pricing grid ruled with 1px hairlines, no card shadows"); **don't** take the content (copy, illustration, logo wall).
- **Do** read `llms.txt` first (Mobbin, Refero, Savee, Navbar Gallery, One Page Love tell agents exactly how to use them); **don't** parse HTML where an MCP or API exists.
- **Do** stop at a challenge page and ask; **don't** retry with a browser UA, headless stealth or a different IP.
- **Do** use Framer/v0/Lovable templates to list the moves to avoid; **don't** start a build from one.
- **Do** credit a borrowed detail to its designer; **don't** post our recreation of someone's detail as our idea.

## 5. Exceptions and judgement calls

- `polite` is a judgement: robots allowing a path is not a licence to reuse content. It only means one human-picked page read for a brief is within the owner's stated wishes. Anything bulk needs written permission (Landing.Gallery and Curated say so explicitly) [P,F].
- Siteinspire's index data is offered "for non-commercial research with attribution" [P]; Larpo is a company. Pointers for internal study are the defensible reading; ask before more.
- SaaSFrame's `Content-Signal: ai-input=yes` is a recent, generous signal; its terms (2020) are silent [P]. Treat it as permission to read for a brief, not to store.
- When the founder sends a screenshot from any source, it outranks every gallery rule here (`founder-taste.md`).
- [engine note] Galleries with heavy template submissions (CTA Gallery, Supahero, Land-book templates) skew toward Framer/Webflow defaults; down-weight entries whose source is a template URL.

## 6. Figures worth keeping

None stored (by design, IR-08). Measured evidence for sections already lives in `knowledge/benchmarks/sections/`, `dark/`, `x-posts/`.

## 7. Open questions

- Terms not read this pass: Recent, Dark, Footer, Navbar Gallery, CTA Gallery, Hero Gallery, Supahero/screensdesign, Minimal Gallery `/legal`, Layers, Httpster.
- What maxibestof.one, Saaspo and gradient.page contain (bot walls on 2026-10-15).
- Fontshare ITF FFL and Pangram Pangram licence text from the primary source (only secondary summaries); Grainient's download licence.
- Mobbin, Refero and Curated MCPs not connected in this session; their result quality for SaaS heroes is untested.
- One Page Love API terms and rate limits (docs page not read; only robots/llms.txt).
- Handles not resolved: Evil Rabbit (Vercel), Aaron Iker, Josh Miller (Arc), Michal Malewicz, AlignUI; Attio's individual designers unidentified.
- Figma plugin IDs and current pricing for Stark, Autoflow, Content Reel are [M].

## 8. Daily research routine (before a brief, ~25 minutes)

1. **Read the bar first (2 min).** `founder-taste.md`, last 8 ledger entries, `engine-accepted/kestrel/`, `larpo-shipped/*-fold.png`.
2. **Commodity baseline (3 min).** Open 2 Framer marketplace templates in the brief's category (`/marketplace/templates/categories/<saas|ai|agents>/`) and 1 v0/Lovable template; write the 3 shared moves to avoid (IR-12).
3. **Fresh feed (5 min, automated).** Land-book `rss.xml` (diff against last run), Recent `/websites` first page, One Page Love API newest in the genre (once a key exists), Landing.Gallery MCP x3 queries. Output: 15-25 candidate original URLs.
4. **Surface galleries (5 min).** By surface: pricing -> SaaSFrame + Landing.Gallery pricing; hero -> Hero Gallery + Recent + Dark/Minimal; nav/footer/CTA -> the dedicated gallery; product UI -> SaaSFrame product categories + founder's Mobbin/Refero queries (IR-19, send the query list).
5. **People (3 min).** Latest posts of the 8 core handles via `knowledge/benchmarks/x-posts/scripts/harvest.mjs`; note any new detail with credit.
6. **Pick and measure (5 min).** Choose 6-12; render 2-3 originals with `check.mjs --name ref-<slug>` or `shot.mjs`; record h1 tuple, palette, radius ladder, light source.
7. **Deconstruct and log (2 min).** Fill the `## References` block (IR-21), one decision taken per row; pick the triad.
Weekly: Fontsource/Fontshare new families (`lastModified`), Navbar/Footer/CTA newest, Recent `/launch-videos` for motion, re-check robots of every `polite` source.

## 9. Automation map

| Channel | Sources | How | Limits |
|---|---|---|---|
| MCP, no auth | Landing.Gallery `https://www.landing.gallery/api/mcp` | `claude mcp add --transport http landing-gallery <url>`; `search_inspiration`, `get_website` | Max 4 results; edge rate limits; no bulk |
| MCP, agent UA | Siteinspire `https://www.siteinspire.com/api/mcp` | Same; never crawl HTML (429) | Non-commercial wording [P] |
| MCP, founder OAuth | Mobbin `api.mobbin.com/mcp`, Refero `api.refero.design/mcp`, Savee `mcp.savee.com/mcp`, Curated `curated.design/api/mcp/` | Founder connects; engine supplies queries | Mobbin 60/60 s; Refero 8k/month; no storing results |
| API, no key | Fontsource, Fontshare v2, tints.dev, Iconify | `curl` / fetch in tools | Be polite, cache per session |
| API, free key | One Page Love, Google Fonts Developer, Unsplash, Pexels | Key in `.env`, never committed | Per-provider quotas |
| RSS / sitemap | Land-book `rss.xml`, Recent/Footer/Navbar/CTA sitemaps | Daily diff | Never follow disallowed filter params |
| Polite single fetch | Recent, SaaSFrame, Minimal Gallery, Dark, Dark Mode Design, Footer, Navbar, CTA, Hero Gallery, Httpster, SaaS Landing Page, Framer marketplace, v0, Lovable | One human-picked page per brief, <= 1 req/s, UA `design-engine-research/0.1` | Pointers only; re-check robots |
| Public mirror | X timelines via `api.fxtwitter.com` | `x-posts/scripts/harvest.mjs` | x.com itself is login-walled |
| Packages | Paper Shaders, Radix Colors, culori, opentype.js | npm, pinned | Licences in package |
| Manual (founder or human) | Lapa Ninja, Land-book HTML, Awwwards, Behance, Dribbble, Supahero, Layers, Cosmos, Page Flows, Saaspo, maxibestof.one, Fonts In Use, Typewolf, Uncut, Coolors, Realtime Colors, Grainient, gradient.page, all Mac apps and extensions | Founder browses, pastes URLs or screenshots into the brief | Engine never bypasses walls |
