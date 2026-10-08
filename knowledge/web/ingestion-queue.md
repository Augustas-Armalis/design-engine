---
source: web:multi
chapter: Prioritised ingestion queue and agent-training curriculum order
pages: n/a
topic_tags: [curriculum, ingestion, corpus]
status: studied
---

# Ingestion queue and ranked curriculum

Companion to `courses-and-curricula.md` (S-numbers refer to its section 8). Written 2026-10-08.

How to use. "Free full text" means the complete text is legally readable online for free. It does not mean redistributable: unless the licence column says open (MIT, Apache-2.0, OGL, CC), ingest into `corpus/` for private study and store our own notes, not the text, in anything shared. Licences marked "verify" are from memory.

## 1. Ranked learning order for the agent curriculum

Ranking criteria: (1) numeric/checkable rules density, (2) agreement across sources, (3) fit to brief -> render -> measure loop, (4) free full text. Do them in this order; each stage unlocks checks in `tools/`.

| Rank | Item | Why now | Stage it feeds |
|---|---|---|---|
| 1 | Vercel Web Interface Guidelines (S3) | Most checkable rule set; MIT; already skill-shaped | measure/lint step |
| 2 | Practical Typography (S5) | Numeric type rules; free to read | system/ type scales |
| 3 | Apple HIG foundations JSON: typography, color, layout, motion, accessibility, materials (S14) | Authority + tables of numbers | system/ + a11y checks |
| 4 | A11Y Project checklist + web.dev Learn Accessibility (S6, S10) | WCAG mapped to selectors | a11y measure step |
| 5 | Emil Kowalski essays (S13) | Motion numbers + the "taste as strict rules" method | motion tokens |
| 6 | Josh Comeau blog: shadows, transitions, reset, linear() (S8) | Depth + easing + CSS mechanics | depth/motion tokens |
| 7 | Rauno: Invisible Details, Designing Depth, interfaces.rauno.me (S16) | Interaction principles, checklist | critique step |
| 8 | Material 3 motion tokens (S21) | Open duration/easing ladder | motion tokens |
| 9 | NN/g core articles: heuristics, response times, visual hierarchy, F-pattern (S1) | Research-backed, short | critique rubric |
| 10 | Laws of UX (S4) | Fast vocabulary for critique | critique rubric |
| 11 | Every Layout free chapters (S11) | Layout primitives and measure axiom | system/ section patterns |
| 12 | web.dev Learn CSS + Learn Design (S10) | Mechanics, current APIs | engineering reference |
| 13 | WWDC18 Designing Fluid Interfaces (S15) | Spring/gesture model | gesture/motion rules |
| 14 | GOV.UK Design System + principles (S12) | Form/error patterns, OGL | forms patterns |
| 15 | Benji "Family Values" + Emil building posts (Sonner, Vaul) (S18, S13) | Craft case studies | examples/ |
| 16 | Inclusive Components + Adrian Roselli (S17) | Accessible component patterns | components |
| 17 | Shape Up (S20) | Brief-to-direction process | pipeline front end |
| 18 | Learn UI Design blog (S7) | Practical colour/space tips | system/ palettes |
| 19 | Resilient Web Design (S17) | Philosophy, CC BY-SA | background |
| 20 | Heckel blog shaders, Codrops, Awwwards case studies (S22) | Creative-dev ambition; later phase | examples/ (creative) |
| 21 | Mobbin (S24) | Pattern retrieval, not rules | examples/ |
| P | Paid books, only if founders own copies: Refactoring UI (S2), Don't Make Me Think, Design of Everyday Things, About Face, Design Systems (S19, S25) | Highest conceptual value, no free text | knowledge/ via own notes |
| P | Paid courses, with founder licence only: animations.dev (enrolment closed), CSS for JS Devs, Whimsical Animations, Devouring Details, Three.js Journey | Deep but expensive; see prices in digest | optional |

## 2. Free full text we can ingest, with exact URLs

Format key: R = raw/JSON/API (easy), H = HTML (use readability extraction), B = needs real browser (JS-rendered or bot-walled).

### Tier A: ingest first

| # | Source | Exact URL(s) | Fmt | Licence | Notes |
|---|---|---|---|---|---|
| A1 | Vercel Web Interface Guidelines | https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/AGENTS.md ; https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md (inferred, test) | R | MIT | Already agent-formatted. Verify README path exists. |
| A2 | Practical Typography | https://practicaltypography.com/summary-of-key-rules.html ; index https://practicaltypography.com/table-of-contents.html (verify) | H | Copyright, free to read | Crawl TOC, ~80 pages. Store own notes. |
| A3 | Apple HIG JSON | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json ; .../color.json ; .../layout.json ; .../motion.json ; .../accessibility.json ; .../materials.json ; .../foundations.json ; also dark-mode, icons, writing, inclusion, right-to-left, spatial-layout, images, branding, privacy, sf-symbols, app-icons, immersive-experiences (same pattern) | R | Apple copyright | Extract `primaryContentSections` text recursively (script worked this session). Private study only. |
| A4 | A11Y Project checklist | https://www.a11yproject.com/checklist/ | H | Verify (believed MIT/CC) | Maps to WCAG levels. Repo: github.com/a11yproject/a11yproject.com (check). |
| A5 | Emil Kowalski essays | https://emilkowal.ski/ui/you-dont-need-animations ; /7-practical-animation-tips ; /developing-taste ; /agents-with-taste ; /building-a-toast-component ; /building-a-drawer-component ; /the-magic-of-clip-path ; /train-your-judgement ; /friction-as-a-feature ; /building-an-animation-course | H | Copyright | All fetched OK except clip-path, train-your-judgement, friction, animation-course (not read yet). |
| A6 | Rauno craft | https://rauno.me/craft/invisible-details-of-interaction-design ; https://rauno.me/craft/designing-depth ; https://interfaces.rauno.me/ ; other titles at https://rauno.me/craft | H | Copyright | Interfaces checklist is the highest density. |
| A7 | Josh Comeau articles | https://www.joshwcomeau.com/css/designing-shadows/ ; /animation/css-transitions/ ; /css/custom-css-reset/ ; /animation/linear-timing-function/ ; /css/interactive-guide-to-flexbox/ ; /css/interactive-guide-to-grid/ ; /css/header-blockers/ ; /css/starting-style/ ; /animation/squash-and-stretch/ ; /animation/scroll-driven-animations/ ; /animation/color-shifting/ ; /css/subgrid/ ; /css/anchor-positioning/ ; /svg/interactive-guide-to-paths/ | H | Copyright | Interactive widgets are lost in text; keep the URL for screenshots. |
| A8 | Material 3 motion tokens | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss ; also sibling `_md-sys-typescale.scss`, `_md-sys-shape.scss`, `_md-sys-color.scss` in the same folder (verify names) | R | Apache-2.0 | Fetched and verified numbers. |
| A9 | NN/g core articles | https://www.nngroup.com/articles/ten-usability-heuristics/ ; /response-times-3-important-limits/ ; /visual-hierarchy-ux-definition/ ; /f-shaped-pattern-reading-web-content/ ; /usability-101-introduction-to-usability/ ; /how-to-conduct-a-heuristic-evaluation/ | H | Copyright | Paraphrase only. Pick more via https://www.nngroup.com/articles/ . |
| A10 | Laws of UX | https://lawsofux.com/ ; each law page at https://lawsofux.com/<law-slug>/ ; https://lawsofux.com/llms.txt | H | Verify | One page per law. |

### Tier B

| # | Source | Exact URL(s) | Fmt | Licence | Notes |
|---|---|---|---|---|---|
| B1 | web.dev Learn CSS | https://web.dev/learn/css (39 articles; each at /learn/css/<slug>) | H | Verify (CC BY 4.0 believed) | Includes anchor positioning, popover, container queries, view transitions. |
| B2 | web.dev Learn Accessibility | https://web.dev/learn/accessibility (21 modules) | H | Verify | Color, motion, typography, forms, patterns. |
| B3 | web.dev Learn Design (responsive) | https://web.dev/learn/design (17 modules) | H | Verify | Macro/micro layout, typography, theming. |
| B4 | web.dev Learn Forms / Images | https://web.dev/learn/forms ; https://web.dev/learn/images | H | Verify | Not yet read. |
| B5 | Chrome CSS/UI docs | https://developer.chrome.com/docs/css-ui | H | Verify | New CSS APIs reference. |
| B6 | Every Layout free chapters | https://every-layout.dev/rudiments/axioms/ ; layout pages for Stack, Sidebar, Switcher under https://every-layout.dev/layouts/ (verify slugs) | H | Copyright | Paid for the rest. |
| B7 | WWDC18 803 Designing Fluid Interfaces | https://developer.apple.com/videos/play/wwdc2018/803/ | H | Apple copyright | Pull transcript. |
| B8 | GOV.UK Design System | https://design-system.service.gov.uk/ ; repo https://github.com/alphagov/govuk-design-system (raw markdown per component) | H/R | OGL v3 | Best for forms/error summary patterns. |
| B9 | GOV.UK design principles | https://www.gov.uk/guidance/government-design-principles | H | OGL v3 | 11 principles. |
| B10 | Inclusive Components | https://inclusive-components.design/ (11 case studies) | H | Copyright | Pattern-by-pattern. |
| B11 | Adrian Roselli | https://adrianroselli.com (tags: /tag/html/ , /tag/ux/ , search for tables, buttons, links, cards) | H | Copyright | Large; select 20-30 posts. |
| B12 | Benji | https://benji.org/family-values ; https://benji.org/ | H | Copyright | Other titles (Agentation, Annotating for agents) not read. |
| B13 | Shape Up | https://basecamp.com/shapeup | H | Verify | Chapters under /shapeup/1.1-chapter-02 etc. |
| B14 | Learn UI Design blog | https://www.learnui.design/blog/ ; https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html | H | Copyright | Part 2 exists per title; fetch it. |
| B15 | Resilient Web Design | https://resilientwebdesign.com/ | H | CC BY-SA 4.0 | Background reading; also PDF/EPUB links on page. |
| B16 | Heckel blog | https://blog.maximeheckel.com/ ; https://blog.maximeheckel.com/rss.xml | H | Copyright | RSS is the quickest index. |
| B17 | Brian Lovin | https://brianlovin.com/writing ; https://brianlovin.com/writing/rss.xml ; https://brianlovin.com/sites ; https://brianlovin.com/app-dissection | H | Copyright | Titles not yet seen; `/sites` and `/app-dissection` are examples/ gold. |
| B18 | Paco Coursey | https://paco.me/ ; "Redesign 2021" and "React Hook Getter Pattern" are the only titles seen | H | Copyright | Low volume. |
| B19 | Smashing Magazine design | https://www.smashingmagazine.com/category/design ; Design Systems sample PDF via https://www.smashingmagazine.com/design-systems-book/ | H | Copyright | Curate; high variance. |
| B20 | Figma resource library | https://www.figma.com/resource-library/ui-ux-design-principles/ ; /typography/ ; /design-token-architecture/ ; /color-theory/ | H | Copyright | Vendor content; rate low. |
| B21 | Awwwards criteria | https://www.awwwards.com/about-evaluation/ | H | Copyright | One page; weights table already captured. |
| B22 | Creative-dev case studies | https://www.hontran.dev/blog/tag/awwwards (examples) ; Codrops https://tympanus.net/codrops/ (needs browser) | H/B | Copyright | Secondary accounts; flag source quality. |

### Tier C: browser-only or paywalled (do not ingest until access plan exists)

| Source | URL | Why blocked |
|---|---|---|
| Codrops | https://tympanus.net/codrops/ | 403 to plain fetch; use Playwright (tools/) |
| Kevin Powell videos | https://www.kevinpowell.co/ ; YouTube channel | YouTube consent wall; use transcript API or yt-dlp subtitles with licence check |
| Material 3 guideline prose | https://m3.material.io/foundations | JS-rendered; use Playwright snapshot |
| Mobbin | https://mobbin.com/ | Paywall + terms; use only manual references |
| Refactoring UI | https://www.refactoringui.com/ | Paid book; free tips only |
| animations.dev | https://animations.dev/ | Paid; enrolment closed until ~2027 |
| CSS for JS Devs | https://css-for-js.dev/ | Paid |
| Whimsical Animations | https://whimsy.joshwcomeau.com | Paid |
| Devouring Details | https://devouringdetails.com/ | Paid ($249 listed) except two free chapters |
| Three.js Journey | https://threejs-journey.com/ | Paid, some free previews |
| Don't Make Me Think / Design of Everyday Things / About Face | publisher pages | Paid books |

## 3. Suggested ingestion mechanics

- **Apple HIG:** loop the JSON URLs with `curl`, walk `primaryContentSections` collecting `type == "text"` nodes. Save to `corpus/apple-hig/<page>.txt`. A working script shape is in the scratch run of this session (recursive text collector).
- **GitHub raw/MIT sources:** `curl -sL <raw>` straight into `corpus/vercel-wig/AGENTS.md`.
- **HTML sources:** use `tools/extract_*` once an HTML extractor exists; otherwise Playwright + readability. Respect robots.txt and rate limit (1 request per 2 s).
- **Notes first, corpus second:** for copyrighted sources keep `corpus/` private/gitignored (as README already says) and commit only `knowledge/` notes in our own words.
- **Provenance:** each note's `source: web:<url>` and the fetch date; flag any claim carried from search snippets (marked "verify") so a later pass can promote or drop it.

## 4. Gaps to fill next

1. Re-search Julian Shapiro, Dan Hollick, Brian Lovin (individual essays), Paco Coursey essays with exact titles.
2. Read the unread Emil essays (clip-path, train-your-judgement, friction-as-a-feature, building-an-animation-course).
3. Pull Material 3 colour/type/shape tokens plus window size-class values to replace the [engine note] breakpoints.
4. Pull Linear and Stripe design write-ups listed on Designer Fund (Craft and Practice).
5. Verify licences for web.dev, a11yproject, Laws of UX before bulk ingest.
6. Settle the 0.8 vs 0.9-0.95 entering-scale conflict with a rendered test in `evals/`.
