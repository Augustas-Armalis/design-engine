---
source: web:multi (fetched 2026-10-08)
chapter: Reference sources for the examples/ library - galleries, assets, fonts, licences, programmatic access
pages: n/a
topic_tags: [references, galleries, licences, tos, fonts, icons, textures, mcp, api, ingestion]
status: studied
---

# Reference sources: what to learn from, and what we may do with it

Written 2026-10-08. Companion: `reference-library-spec.md` (schema, capture tool, retrieval, guardrails).

**This is not legal advice.** It records what each site's own terms, robots.txt and docs said on the date above. Terms change; re-read before any bulk step. Evidence tags: **[fetched]** read from the primary page/API during this research; **[secondary]** from a search snippet or third party; **[memory]** from prior knowledge, verify before relying.

## 0. The one decision that shapes everything

Most excellent-site galleries are commercial products whose terms forbid scraping, caching, archiving, or using content to "train, test, evaluate, benchmark" AI. The engine uses references as *study material that steers a model at design time*, which is allowed by some and ambiguous at others. So the library is built on three data classes, and only the first two are stored:

| Class | What | Stored? | Why it is safe(r) |
|---|---|---|---|
| A. Pointer | URL of the real site, gallery name + gallery ID, title, studio, date seen, our tags | Yes, in git | Facts. Siteinspire states index data (titles, URLs, categories) may be used for non-commercial research and AI training with attribution [fetched]; Land-book asks only that you link and credit [fetched]. |
| B. Own measurement | Computed styles, palette values, font names, section structure, motion flags, tech stack, measured by us from one ordinary page load of the original public site | Yes, in git (JSON only) | Facts about a public page, produced by our own tooling (same method as `check.mjs` and `knowledge/web/teardowns.md`). The target site's own ToS and robots.txt govern the page load, so the capture tool enforces them (spec section 7). |
| C. Gallery expression | The gallery's screenshots, cropped section images, descriptions, curation text, MCP payloads | **No.** Live lookup at design time only | Gallery copyright. Mobbin, Savee and Refero explicitly forbid caching/archiving/building a repository/ML evaluation. Treat as read-through. |

Our own screenshots of original sites (taken by `capture.mjs`) are kept **locally, gitignored, never republished**: private study, the same footing as the 38-site teardown.

Rule of thumb: the gallery tells us *which* sites are worth studying (curation is the value we cannot replicate); the site itself is what we measure.

## 1. Ranked digest: galleries and libraries

Rank = usefulness to a Larpo-style SaaS/AI-SaaS engine x taste level x how legitimately we can use it programmatically. Counts are as the site claimed on the fetch date.

### Tier 1: use now

| # | Source | What it holds | Taste | Programmatic access | Licence / ToS (what is and is not allowed) |
|---|---|---|---|---|---|
| 1 | **Siteinspire** `siteinspire.com` | 10,000+ hand-picked sites since 2008; designer/studio profiles; categories, expertise tags [fetched] | High, editorial/typographic; light on SaaS, strong on type/layout/identity | **Official and open**: REST `GET /api/websites`, `/api/websites/:id`, `/api/websites/explore?categories=a,b&scope=recent` (max 10 pages), `/api/websites/feed`; tRPC query API; read-only **MCP** at `https://www.siteinspire.com/api/mcp` (card `/.well-known/mcp.json`); no auth. Full reference `/llms-full.txt`. Rate limits not stated: stay under 1 req/s. | Screenshots and descriptions are "copyright Siteinspire". Index data (titles, URLs, categories) "may be used for non-commercial research and AI training with attribution". **Allowed:** pointers + our own measurements of the original sites, with attribution line. **Not allowed:** storing/republishing their screenshots or descriptions. **Caveat:** "non-commercial" - Larpo is a company. Treat our use as internal study of pointers, and ask Siteinspire in writing (email) before anything beyond pointers. robots.txt welcomes agent user-agents (Claude-User, ChatGPT-User, etc.) on `/` but disallows training crawlers (ClaudeBot, GPTBot, CCBot...) site-wide: use the API/MCP, never crawl pages. |
| 2 | **Land-book** `land-book.com` | Large curated gallery; sitemap lists designs, sections, templates, experts [fetched]; SaaS/software weighting and size are from memory, verify | Medium-high, volume-driven, current | **Public, intended for machines**: `sitemap.xml` (index: core, designs, sections, templates, experts), `rss.xml` (latest 50: title, link, pubDate, `<img>` URL inside `description`, no licence element), `llms.txt`. robots.txt *explicitly welcomes* GPTBot, ClaudeBot, Claude-User, PerplexityBot, CCBot etc.; disallows `/api/`, `/admin/`, login, filter/sort/search query params. No official API. | No terms page found; no licence stated. Their guidance: link to `https://land-book.com/websites/{urlname}` and credit the designer/studio on the page [fetched]. **Allowed:** read sitemap + RSS, fetch individual public pages at a polite rate, store pointers (their page URL + target URL + designer) and credit them. **Not stated, so assume not allowed:** storing their CDN images. Template links are affiliate links (ignore). Use the filters by hand; automated filter URLs are disallowed. |
| 3 | **Landing Gallery** `landing.gallery` | 500+ (MCP) / "1804+" (homepage claim) landing pages, with page type, builder (Framer/Webflow...), framework, device screenshots, Verified date [fetched] | High, tidy, SaaS-friendly; has pricing/about/404 page types | **Official MCP for coding agents**: `https://www.landing.gallery/api/mcp`, tools `search_inspiration` (text, page type, device, builder, framework; max 4 results) and `get_website(slug)`; no account or token; "edge rate limits". robots.txt: only `/api/` disallowed (the MCP is the sanctioned route). | ToS [fetched]: screenshots remain the property of the site owners; browsing and referencing for inspiration is allowed (personal or commercial); **"may not scrape, reproduce, or systematically download gallery content in bulk"; automated tools need prior written consent.** MCP is their own agent channel, so use it interactively (one brief, a few queries); do not loop it to mirror the library. Store the original site URL only. Ask for written consent if we ever want a bulk pointer export. |
| 4 | **Refero** `refero.design` | 120,000+ product screens, flows, sites/apps, and a "styles" layer (type, colour, layout) [secondary count] | High, product UI and marketing; strongest "real product" corpus | **Official MCP** `https://api.refero.design/mcp` (OAuth or Bearer), paid Pro/Team/Lifetime plan, 8,000 tool calls per month per user, tools over sites, apps, styles, screens, images, similar screens, flows [fetched]. Also a Refero Skill and Figma plugin. | Terms of Use (doc.refero.design/legal/terms-of-use) [fetched]: internal design research and ordinary product work, including commercial, is allowed within plan; you may put Refero content in presentations, moodboards, Figma files and client/internal work. **Forbidden:** scrape/bulk extract; use content "to train, fine-tune, evaluate, or improve machine learning models or datasets", **including via MCP/API unless agreed in writing**; publish as a standalone library or dataset; resell. **Consequence for us:** live lookup only, never copy results into `examples/` or `evals/`, never use as eval ground truth. Our annotation in our own words, with the Refero URL as a pointer, is fine. Ask Refero in writing if we want anything stored. |
| 5 | **Mobbin** `mobbin.com` | Largest curated library of shipped product screens, flows, and **website sections** (heroes, pricing, footers) [fetched] | High, the reference standard for patterns | **Official MCP** `https://api.mobbin.com/mcp`, OAuth, **Pro/Team/Enterprise**, 60 req per 60 s, tools `search_screens`, `search_flows`, `search_sections` [fetched]. | Terms [fetched]: no scrapers/bots outside authorised use; crawlers must use a descriptive UA and obey robots; **no aggregating, mirroring, caching, archiving or re-hosting content (3.2); no using content to "train, test, index, benchmark, or improve" any AI/ML model (3.5); no standalone repository from API/MCP content (3.6)**. MCP guidance says: preserve product name + Mobbin URL, treat examples as what a product did, not proof it works, do not copy designs, text or assets verbatim. **Live lookup only.** Best for "show me 6 pricing sections from devtools" at design time. |
| 6 | **SaaSFrame** `saasframe.io` | SaaS-only. Websites (landing 292, pricing 211, blog feed 97...), products (onboarding, settings...), patterns (100+), sections (features 122, pricing 93...) [fetched] | High for SaaS marketing sections, the best category fit | **No API/MCP found.** `sitemap.xml` exists. robots.txt allows only Googlebot, Bingbot, OAI-SearchBot; **all other agents: `Disallow: /*?`** (query-string URLs). Paid Pro ($18/mo, $180/yr) unlocks full browse and Figma files. | Terms (updated 2020) say nothing about scraping, content use or AI [fetched]. Silent is not permission. **Use as human curation:** a founder browses, picks sites, and we store the original-site URL + SaaSFrame category as a pointer. No automated crawling; the robots entry plainly expresses that. Email them if we want a pointer export. |
| 7 | **One Page Love API** `onepagelove.com/api` | 9,000-20,000+ curated one-page sites, archive back to 2008, **section crops** (pricing, hero, testimonials), taxonomy (genre, style, typeface, colour, sections), trends [fetched] | Medium-high, broad, good taxonomy | **Private beta waitlist**, clean JSON, Retina screenshots, LLM-friendly docs; free tier planned, key issued at beta [fetched]. robots.txt itself says "scraping this site is the hard way... use the API". | Terms not yet published. **Action: join the waitlist now.** It is the one source that is built for exactly this job (sections + taxonomy + JSON). Do not scrape it meanwhile. |

### Tier 2: use by hand, pointers only

| # | Source | What | Notes |
|---|---|---|---|
| 8 | **Savee** `savee.com` | General visual moodboards | API/MCP for *your own saves* only. Terms [fetched]: no scraping/crawling; Section 5b forbids using Savee content to "train, fine-tune, distill, or evaluate" AI (an assistant reading to answer you is fine); no copy/store/archive/mirror/index, with exceptions: keep Savee IDs + links, cache ≤24 h for a specific request, personal export of your own saves. **Use:** Augustas saves taste references into a private board; Claude reads it through his MCP at design time; we store only the IDs/links. A good "founder taste signal" channel. |
| 9 | **Page Flows** `pageflows.com` (`screenlane.com` now 301-redirects here) | 100,000+ recorded flows/screens [fetched] | Strong for funnels/onboarding. robots.txt allows `/` (disallows search and some query params), plus image sitemap. Terms mention only fair use; "does not claim ownership of any of the contents" [fetched]; silent on automation. Paid for most. Use by hand for flow *structure* notes; pointer + our annotation. |
| 10 | **Godly -> recent.design** `godly.website` | Web design inspiration with motion/interaction, categories incl. Web Interface, OG images, App Screenshots, App Icons; Tools, Skills pages [fetched] | `godly.website` returned a 301 to `recent.design` on 2026-10-08 (unverified why). Robots fetch returned the HTML app (no clear rules). No API/terms found. Highest taste for motion and craft among free sites. By hand; pointer only. |
| 11 | **Curated.design** | Section-level (locked-section images, published collections) | robots.txt allows `/`, disallows `/api/` except `/api/sections/`; sitemaps for submissions/collections; no llms.txt (404). Terms not read. Pointers by hand; verify terms first. |
| 12 | **The Component Gallery** `component.gallery` | 60 component types, 95 design systems, 2,671 examples by Iain Bean [fetched] | Not full sites; component naming and cross-design-system variants. Links go to the design systems' own docs (best primary sources). Licence not stated; use as an index to open design-system docs. |
| 13 | **Awwwards** `awwwards.com` | Sites of the Day/Month/Year with scores | Taste: top end of creative/motion; skews studios and experimental, not SaaS. Terms (`/terms/`) [secondary]: all rights reserved; no commercial use without authorisation; featured sites remain their creators'. robots.txt disallows `/gallery`, `/submission`, `/tag/`, `/search-websites`, `/websites/?` (filter URLs), `/feed`, votes/likes. **By hand only.** Their public evaluation criteria page (design 40 / usability 30 / creativity 20 / content 10) is already captured in the web notes. |
| 14 | **CSS Design Awards (CSSDA)** | WOTD winners scored on UI, UX, Innovation by judges [fetched] | robots.txt blocks only DotBot [fetched]; no feed/API on the home page; `/terms` not read. By hand; pointers. |
| 15 | **FWA** `thefwa.com` | Long-running awards for digital creativity | robots.txt disallows only `/admin/` [fetched]. Terms unread. Creative-dev benchmark, not SaaS. By hand. |
| 16 | **Httpster** `httpster.net` | 3,116 hand-selected sites, minimal/typographic/brutalist tilt, curated by two named people [fetched] | Hard to get a robots result (my fetch returned a 404 page); no terms on the About page. Taste is excellent for type-led identity. By hand. |
| 17 | **Lapa Ninja** `lapa.ninja` | Roughly 5,000-7,000 landing pages [secondary, counts disagree] | Scripted requests got a Cloudflare "Attention Required" block (403). **Do not try to bypass bot protection.** Browse by hand only. |
| 18 | **Muzli** `muz.li` | Aggregator of design news, websites, trends | robots.txt allows everything and names AI agents. Terms [fetched]: personal use only, no republishing/copying/redistribution, all rights reserved. Aggregated third-party work, mixed quality; low signal per minute. Read for trend scouting; no ingestion. |
| 19 | **Dribbble / Behance** | Concept shots / project showcases | **Low signal for this engine** (concepts and case-study images, not shipped pages). Behance robots.txt disallows AI crawlers entirely [fetched]. Dribbble API v2 needs OAuth and is oriented to a user's own shots; rate limits cited 60/min, 10,000/day [secondary, verify]. Use by hand for illustration/type mood only. |
| 20 | **ScreensDesign** (`uisources.com` 301-redirects here) | 2,700+ iOS apps: onboarding, paywalls, recordings; MCP page exists [fetched] | Mobile iOS; out of scope except subscription/paywall patterns. Terms page exists, unread. |
| 21 | **Design Spiration, Lovely UI, Saaspo, Minimal Gallery, Landingfolio, etc.** | Assorted | Designspiration's robots.txt blocks many bots with a 1 s crawl-delay; Lovely UI's robots disallows ClaudeBot/anthropic-ai and sets crawl-delay 1; Saaspo is behind a Cloudflare challenge. All three say "leave to humans". |

### Better primary sources than any gallery (programmatic, clean licence)

These should carry most of the library's growth:

1. **The 38 sites already measured** in `knowledge/web/teardowns.md` (Linear, Vercel, Stripe, Raycast, Resend, Clerk, Cursor, Arc, Attio, Granola, Anthropic, OpenAI, Perplexity, Mercury, Ramp, Loom, Descript, Lovable, v0, Supabase, PostHog, Figma, Rive, Pitch, Replicate, Neon, Railway, Mintlify, Dub, Notion, Superhuman, Cal.com, Framer + studios). Backfill them first with `capture.mjs` (it supersedes `teardown-measure.js`).
2. **Open-source product sites** [memory, verify licence per repo]: marketing sites of open-source companies (Cal.com is AGPL, Dub, Supabase, PostHog, Documenso, Formbricks and similar) are public code. You can read their actual component code and tokens. Licence decides reuse: MIT is reusable with notice; AGPL means study only, never copy.
3. **Design systems with open docs**: Vercel Geist, GitHub Primer (MIT), Radix Themes/Colors (MIT), Atlassian, Shopify Polaris, Stripe's published design write-ups, GOV.UK (OGL). Linked from the Component Gallery. These already appear in `knowledge/web/design-systems.md`; add pointer records for their marketing counterparts.
4. **Population statistics**: HTTP Archive (BigQuery public dataset, includes Wappalyzer technology detections, CSS usage, Core Web Vitals) answers "how common is X" with no scraping at all [memory, verify terms]. Use for calibrating `tools/thresholds.json`.
5. **Wayback Machine**: how a site looked before a redesign (evolution as signal). Respect Internet Archive terms and rate limits [memory].
6. **Founder taste channel**: Augustas's accepts/rejects (ledger) and a private Savee board. This is the only source of *Larpo's* taste; it should outweigh every public gallery in retrieval ranking (spec section 5).

### Recommended mix and ongoing cadence

- Seed: 38 backfill + 40 from Siteinspire (MCP), Land-book (RSS/sitemap), Landing Gallery (MCP), SaaSFrame (hand-picked) = ~120 records in the first two weeks.
- Weekly: Land-book RSS (50 newest) scanned by Claude for candidates; Augustas picks 5; capture; annotate; review.
- At design time: Mobbin/Refero/Landing Gallery MCPs as live lookups to find a structural analogue; the one chosen analogue is then captured from its original URL (class B) if it earns a place.

## 2. Fonts, palettes, icons, illustration, 3D, textures, photos

Priority is clear licence plus an API we can call. "Store" means copy the files into our repo or a build.

### 2.1 Fonts

| Source | Licence | Programmatic access | Usage notes |
|---|---|---|---|
| **Google Fonts** | Per family, mostly SIL OFL 1.1; some Apache 2.0, Ubuntu Font Licence. Source repo `github.com/google/fonts` has a licence dir per family | **Developer API** `https://www.googleapis.com/webfonts/v1/webfonts?key=...` (key required, free); params `family`, `subset`, `category`, `capability` (`VF`, `FAMILY_TAGS`), `sort=popularity`; fields: category, subsets, axes (VF), files, lastModified, tags [fetched]. Docs CC BY 4.0, sample code Apache 2.0. | Safe to self-host OFL files in products and to catalogue. Quotas not documented on the page. |
| **Fontsource** | Whatever the upstream licence is; the API exposes it. Verified live: Inter reports `"license":"OFL-1.1"`, `"type":"google"` [fetched via curl, no key] | `https://api.fontsource.org/v1/fonts` (list with family, subsets, weights, styles, variable, category, license, type, lastModified); `/v1/fonts/<id>` adds version, unicodeRange, npm version, source repo [fetched]. Self-host via npm `@fontsource/<id>` and `@fontsource-variable/<id>`. | **Best single metadata source: no key, licence per font.** Use it to validate and extend `system/fonts/catalogue.json`. Also covers non-Google open fonts. |
| **Fontshare** (Indian Type Foundry) | Two kinds: closed-source families under the **ITF Free Font License** (secondary sources: free for commercial use, web use via self-hosted files or their CSS API, embedding in read-only PDFs, **no redistribution of the font files, no font serving, no modification**); some open families under OFL [secondary: licence page itself did not load] | CSS API for use in pages; download kits; no formal data API found. | Open question already in HOWTO ("Fontshare self-hosting licence"): answer is probably self-hosting allowed, **but do not commit ITF-FFL font files to a public repo**. Check the licence file inside each kit. Fine as a design-time pick (Satoshi, General Sans, Clash Display...). |
| **Open Foundry** `open-foundry.com` | Curated open-source fonts; licence not stated on the page [fetched, thin] | None found | Per-font licence verification needed. Treat as a lead list. |
| **Velvetyne** `velvetyne.fr` | Libre fonts, typically OFL, individual repos on GitHub [memory]; site root returned an unrelated statement during the fetch [fetched] | GitHub org repos | Verify per font. Distinctive, non-default display faces: strong anti-"default grotesk" candidates. |
| **Adobe Fonts / Typekit, commercial foundries** | Paid/subscription | None | Never store. Record the family name and that it was detected on a reference; pick a free analogue for the build. |

Action: a tiny `tools/fonts-sync.mjs` that pulls Fontsource metadata, diffs against `system/fonts/catalogue.json`, and flags any font whose licence is not OFL/Apache/MIT. Stored fields stay as in the catalogue; add `license` and `licenseCheckedAt`.

### 2.2 Palettes and colour

| Source | Licence / access | Use |
|---|---|---|
| **Coolors** | No public API or developer terms found [secondary]. Third-party "Coolors scrapers" exist; do not use. | Founder uses it by hand; export values manually. Do not ingest its trending feed. |
| **Realtime Colors** | Repo licence **CC BY-NC-ND 4.0** (no commercial use, no derivatives); repo says it will no longer be updated; no API [fetched] | Human tool only. **Never fork, embed or ingest.** |
| **Radix Colors, Tailwind palette, Open Color, ColorBrewer** | Permissive (MIT / Apache) [memory, verify] | Safe open scales to adapt. |
| **Palettes measured from reference sites** | Colour values are facts (class B) | The best palette source: `capture.mjs` outputs OKLCH values by area weight, so we learn real production palettes. Already matches `knowledge/web/palette-recipes.md` format. |
| Generators with HTTP APIs (Colormind, TheColorAPI, Huemint) | [memory] free/public-ish; terms unverified | Optional exploration only; not a source of truth. |

### 2.3 Icons

All three fetched via `https://api.iconify.design/collections?prefixes=ph,lucide,tabler` (JSON, no key):

| Set | Icons | Licence |
|---|---|---|
| **Phosphor** (`ph`) | 9,072 (six weights incl. duotone) | MIT |
| **Lucide** (`lucide`) | 1,869 | ISC |
| **Tabler** (`tabler`) | 6,238 | MIT |

All free for commercial use and modification. Iconify's API serves SVG per icon and exposes each set's licence field, so a build can assert licences. Use Lucide as the shadcn/coss default; pick Phosphor when you need weights (thin/duotone) to differentiate from "Lucide look" (an AI tell by sameness).

### 2.4 Illustration

| Source | Licence | Verdict |
|---|---|---|
| **Open Peeps** (and Open Doodles) by Pablo Stanley | **CC0**, copy/modify/redistribute for commercial use without asking [fetched] | Safe to use and to catalogue. Hand-drawn character style, so use deliberately, not by reflex. |
| **unDraw** | Free for commercial and non-commercial; no credit needed; but **prohibits training generative AI, redistributing as packs, building a competing library, integrations/automated downloading without consent** [fetched] | Use manually for a build; **never ingest into the engine, never bulk-download, never script**. |
| Humaaans, Blush, Storyset etc. | Per site [memory] | Not reviewed; check before use. |

### 2.5 3D, textures, HDRI

| Source | Licence | Access |
|---|---|---|
| **Poly Haven** | **CC0**. API free for any purpose incl. commercial [fetched] | `https://api.polyhaven.com/assets?t=textures|hdris|models` (verified live: returns tags, categories, dimensions, authors); `/files/{id}` gives URLs, sizes, MD5. Requires a **unique User-Agent** per app (e.g. `design-engine/0.1`); asks for a visible credit when an end-user app lists their assets; the page names bulk download for research/AI training as a use case. Endpoints may change without notice. |
| **ambientCG** | CC0 [memory; the API page did not restate it, check the License page] | `https://ambientcg.com/api/v2/full_json?type=Material&sort=Popular&limit=50&include=downloadData,previewData` (params q, type, method, sort, id, date, limit 1-250, offset) [fetched]. |
| **Three.js examples / Spline** | MIT (three.js) [memory]; Spline scenes per author | Detection only (see capture tool). |

### 2.6 Photography

| Source | Rules that matter to us |
|---|---|
| **Unsplash** | Licence [fetched]: free for commercial/non-commercial use, no permission needed; **cannot be sold unmodified, and cannot be compiled to replicate a competing service**; the licence text does not mention AI. **API terms** [fetched]: must hotlink the URLs the API returns, attribute Unsplash and the photographer with a link, report downloads, quota applies, **ML/AI use is not granted by the terms (refers to unsplash.com/data)**. So: use API photos in mockups via hotlinked URLs with credit; **never download into a dataset or use to train/evaluate**. |
| **Pexels** | API [fetched]: key issued instantly; default 200 requests/hour and 20,000/month, can be raised free if terms met; must show a prominent link to Pexels and credit photographers when possible; may not replicate Pexels' core functionality; silent on ML and storage. Re-read their licence page before storing anything. |

Rule: photos in `work/` mockups are fine with credit; photos never enter `examples/` (we do not need them: the library records structure, not pictures).

## 3. Legal and ethical position, short form

- **Private study** of public pages, our own measurements, our own words: the same footing as the existing teardowns. Jurisdiction matters. In the EU the text-and-data-mining exceptions (DSM Directive arts. 3-4) give some room, but article 4 allows rights holders to opt out, and a machine-readable opt-out (robots.txt, ToS) counts. In the US, fair use is case-by-case and contract/ToS claims are separate. Because Larpo is a company, get a lawyer's read before we (a) share the library outside the team, (b) fine-tune any model on it, or (c) build anything customer-facing from it.
- **Never**: bypass bot protection or paywalls, use logins to reach gated content, use residential-proxy or UA-spoofing tricks, hammer a site, republish screenshots, or present a reference's copy/brand as ours. (Hard Stop in `CLAUDE.md` already forbids presenting others' work as ours.)
- **Respect machine-readable signals**: if robots.txt disallows our path or user-agent, skip. Several sites above use per-agent rules that deliberately distinguish agent-in-the-loop use (allowed) from training crawlers (blocked). The engine does not train a model, but it must not be a crawler either: one URL per run, human-picked.
- **Don't use gallery content for evals.** Mobbin 3.5, Refero 10/13 and Savee 5b forbid evaluation/benchmarking with their content. Our eval briefs stay as invented briefs; reference crops from those services never go in `evals/`.
- **Credit**: every record keeps `curation.source` + gallery URL so credit can be given where asked (Land-book, Siteinspire attribution requirement, Mobbin guidance).
- **Takedown path**: `refs.mjs purge <host>` removes a site's record and local assets within a minute (spec section 7).

## 4. Next actions (cheapest first)

1. Join the One Page Love API waitlist; email Siteinspire and Landing Gallery asking whether an internal pointer list for design study is fine (Siteinspire's "non-commercial" wording; Landing Gallery's consent line).
2. Add Landing Gallery and Siteinspire MCP servers to the session (`claude mcp add --transport http ...`); keep Mobbin/Refero for design-time lookups under the founder's own paid accounts.
3. Build `tools/capture.mjs` per the spec; backfill the 38 teardown sites.
4. Write `tools/fonts-sync.mjs` against the Fontsource API to audit licences in the catalogue.
5. Record any ToS replies in `knowledge/ecosystem/permissions.md` (date, who, scope), so the guardrails cite evidence.

## 5. Open questions (could not be settled this pass)

- Awwwards `/terms/` full text beyond the first sections; CSSDA `/terms`; Curated.design, Godly/recent.design and Httpster terms.
- Fontshare licence text itself (only secondary descriptions).
- ambientCG, Pexels licence pages (not fetched), Open Foundry/Velvetyne per-font licences.
- Whether the Wappalyzer-compatible rule data (enthec/webappanalyzer fork; upstream was GPL-3.0 [secondary]) is acceptable to ship; the spec starts with our own ~40 rules to avoid the question.
- Why `godly.website` redirects to `recent.design` (rebrand or acquisition unconfirmed).
