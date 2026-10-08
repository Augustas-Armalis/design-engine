---
source: web:https://kargul.studio/
chapter: Marcel Kargul / Kargul Studio profile and quality analysis
pages: n/a (web, measured 2026-10-08)
topic_tags: [benchmark, studio, marketing-site, type, spacing, spec-package, alignui-provenance]
status: studied
---

# Marcel Kargul / Kargul Studio: who, what, and what the quality is made of

Measured 2026-10-08 with Playwright (chromium) at 1440x900 and 390x844 against https://kargul.studio/. Screenshots in `knowledge/benchmarks/kargul-shots/` (6 PNGs). Companion note: `fully-specced-bar.md`.

## 1. Core ideas

1. **Marcel Kargul is real and findable, but as a studio founder, not as a visibly hands-on designer.** Every public trace says "Founder" (X, studio site). The named designers on the studio team are other people. Treat "the quality of Marcel Kargul" as "the quality of the Kargul Studio team and pipeline", unless the founder says otherwise.
2. **AlignUI link is indirect, not authorship.** AlignUI's own About page lists four people and does not mention Marcel or Kargul Studio. Three of those four first names also appear on the Kargul Studio team page. No public source says Marcel created AlignUI. See section 2.
3. **The studio's quality has two layers**: a deliberately neutral, grayscale, one-typeface studio shell (kargul.studio itself), and a portfolio in which every client gets a visibly different identity (dark network-graph security, warm amber crypto, light teal editorial AI, photographic VC). The shell is restrained; the work is distinctive.
4. **The spec is the product.** The studio's public starter repos (`kargulstudio/sales-crm`, `kanban`, `workflow-editor`) ship a "Kargul Starter" whose README says one file, `CONVENTIONS.md`, is "the whole spec for how this repo is built". Its summary (in `CLAUDE.md`) reveals what they write down before building pages (section 5). The file itself is not published (404), so its rules are known only from the summary.
5. **Measured craft is consistent and unfussy**: one family (Geist, variable 100-900), one tracking rule on all headings (-0.03em), one easing curve on almost every interactive, one radius family, grayscale tokens named with shadcn conventions, section padding as tokens.

## 2. Verified facts, claims and unverified items

### Verified (direct fetch or measurement, 2026-10-08)

| Fact | How verified |
|---|---|
| kargul.studio exists; calls itself "a design and engineering partner for scale-ups and enterprise products"; "Accepting 3 more projects this quarter" | WebFetch + Playwright of live page |
| Marcel is listed as "Founder" on the team grid of 14 people (Jeremiah Head of Sales, Deniz PM, Erşad / Emre / Halil / Choirul product designers, Pawel / Darius illustration, Ruben head of branding, Vipul / Kerem engineers, Aneta ops, Kacper motion) | Live page + screenshot (`home` team section) |
| No Marcel bio, location or founding year on the site | Live page (nothing present) |
| Services: branding, product UI/UX, full-stack engineering, landing pages, full websites. Tools listed incl. Figma, Paper, Framer, Webflow, Next.js, Tailwind, Rive, After Effects, Lottie, Pixi.js | Live page |
| Trial week priced at $2,500 on the page; contact email is a sales address (jeremiah@), not Marcel's | Live page |
| 30 case studies listed at /work (categories: B2B SaaS, AI, fintech, crypto, cybersecurity, dev tools, healthcare, VC, ecommerce) | Live page `/work` |
| /swipe-file exists: "a raw look at recent design work", filter All / Product / Web / Brand, 340+ numbered thumbnails, no commentary | WebFetch |
| X account @marcelkargul exists with bio "Founder @kargulstudio"; studio account @kargulstudio | Search result snippets only (x.com returns HTTP 402 to our fetcher, so profile and posts were NOT read directly) |
| GitHub user `kargulstudio` exists, blog link kargul.studio, 3 public repos: sales-crm (1,650 stars), workflow-editor (415), kanban (222), pushed 2026-10-03 to 10-06, MIT licence | GitHub REST API + repo page |
| Repos are one boilerplate ("Kargul Starter": Next.js 16, React 19, Tailwind 4, Rive, Lottie, motion, swiper, photoswipe, cva, radix-ui, zustand) with `.builderrules`, `CLAUDE.md`, `AGENTS.md`, 13 agent skills (mostly from github.com/jakubkrehel/skills, i.e. a third party) and shadcn `components.json` (new-york, neutral, lucide) | raw.githubusercontent.com + repo tree page |
| kargul.studio's CSS variables match that starter: shadcn token names plus `--padding-global`, `--padding-section-sm/md/lg/page` | Measured `:root` vars (section 3) |
| AlignUI About page lists: Erşad Başbağ (Founder & Designer), Deniz Onat Yanık (Product Manager), Tolunay Dönmez (Engineer), Emre Seçer (Staff Designer). No mention of Marcel or Kargul Studio. "Over 10 years of experience", one-time lifetime payment. | WebFetch of alignui.com/about (twice) |
| Footer of alignui.com reads "AlignUI Design System"; GitHub org `alignui` (MIT CLI + Next.js/Remix starters), blog alignui.com, X @alignui | WebFetch + GitHub API |
| Kargul Studio team page lists Erşad, Deniz and Emre (first names only) as Product Designer / PM | Live page |

### Reported by search snippets only (not independently opened)

- Erşad's X profile bio reportedly reads "building @alignui / Product designer @kargulstudio", and an @alignui X post reportedly credits "Erşad" with kargul.studio. Plausible given the team-page overlap, but we could not open x.com.
- A third-party directory (agencylister.com) lists the studio as US-based, 70+ projects. Page content did not load for us.
- Marcel's posts reportedly include: a tool-stack post for "a $100k/mo design studio" (earlier "$150K/mo"), "built the CRM dashboard in around 2 days with AI assistance", "finally made it open-source" (matches the sales-crm repo). These are self-reported revenue claims. Unverified.
- profitableskills.com reportedly features him as a student quoting "$60-100K+" months. Promotional material. Unverified.

### Unverified / not found

- That Marcel Kargul designed AlignUI: **no evidence found**; AlignUI's own pages credit Erşad Başbağ as founder. Best reading: AlignUI designers overlap with Kargul Studio staff. Whether the studio owns, funds or hosts AlignUI: **unverified**.
- That the studio's polish is Marcel's personal design hand: **unverified** (he is "Founder"; other people are titled designers).
- Marcel's background, location, founding date, prior employers: **not found**. No interview, podcast, talk, course, Dribbble, Behance, Figma Community or Framer-template profile found in several searches. No Medium/Substack writing found.
- Any personal portfolio beyond kargul.studio: **not found**.
- Client claims on the site ($1B+ raised by clients, 210M+ users reached, 75+ projects, 95% trial-to-project conversion): **self-reported, unverified**.
- Testimonials (10 named people) are curated on the studio's own site, not checked against the clients' pages.
- Name confusion warning: searches for "Marcel Kargul designer" return Marcel Wanders and unrelated Kargul people (Polish jewellery designer Tomasz Kargul, etc.). None is this person.

## 3. Measured numbers

Source: Playwright computed styles on https://kargul.studio/ , 2026-10-08.

### Page and shell

| Metric | 1440 | 390 |
|---|---|---|
| Document height | 8238px | 10642px (1.29x) |
| Horizontal overflow | none (scrollWidth 1440) | none (390) |
| Body | Geist 16/24, weight 500, colour #232323 on #efefef | same |
| h1 count, `<main>`, lang | 1, yes, en | same |
| Page gutter | content blocks centred; dark panels inset 18px from viewport edges | `--padding-global` 1.1875rem = 19px; content width 352 |
| Section heights (1440) | hero 1140, services 1147, stats 261, spotlights 1828, team 801, then 595 / 345 / 513 / 854 / 654 | |

### Type (all Geist, variable axis 100-900)

| Role | 1440 | 390 | Tracking | Line height |
|---|---|---|---|---|
| h1 | 52px / 700, max-width 626px (= 12em) | 28.47px (fluid, 0.55x of desktop) | -0.03em (-1.56px) | 55.64px (1.07) |
| h2 | 36px / 700 | 28.47px | -0.03em (-1.08px) | 41.76 (1.16) |
| h3 (card / project / person) | 18px / 700 | 18px | -0.03em (-0.54px) | 24px (1.33) |
| Lede | 16/24, 500, #707070 | 16/24 | normal | 1.5 |
| Card body | 14/22, 500, #9d9d9d on dark | 14/22 | normal | 1.57 |
| Stat numerals | 72/72 weight 700, tabular-nums, -0.03em | 70.2/70.2 | -2.16px | 1.0 |
| Chips | 10.5px uppercase, 57 text nodes use it | same | | |
| Button label | 15px / 700 (primary), 600 (secondary); 14px/600 in cards | 15px | -0.12px | 18px |

Distinct font sizes in use at 1440: 10.5, 13, 14, 15, 16, 18, 24, 28.8, 36, 52, 64, 72 (12 sizes). Heading ratio h3:h2:h1 = 18:36:52 (2.0x then 1.44x). Heading weight 700 against body 500: weight contrast is 200, not the usual 300-400 vs 700.

### Colour (token dump from `:root`)

`--background #efefef`, `--foreground #232323`, `--card #fff`, `--muted-foreground #707070`, `--border #e5e5e5`, `--dark #232323`, `--dark-surface #313131`, `--dark-card #2e2e2e`, `--dark-muted #9d9d9d`, `--logo #b4b4b4`, `--success #1daf61`, `--destructive #e40014`, `--radius .625rem`. Chart tokens (orange, teal, navy, yellow) exist but are not used on the page. Most-used text colours by node count: #232323 (606), #efefef (104), #707070 (75), #b4b4b4 (43), #9d9d9d (27). Only chromatic pixels in the shell: the 8px green "accepting projects" dot, and client logos/screenshots. Section token set: `--padding-section-sm 2rem`, `-md 3.5rem`, `-lg 3.5rem`, `-page 7.375rem`, `--max-width-global none`.

### Components, radius, depth

- Buttons: 54px tall hero CTAs (pad 18x24, pill radius), nav pill 42px (pad 10x15), card CTA 48px (pad 15x24), status pill 32px. Primary = #232323 fill / #efefef text; secondary = white fill / black text. No borders, no box-shadows measured on buttons (`box-shadow: none`); depth comes from fill contrast (#efefef page, #fff cards/pills, #232323 panels, #313131 cards on dark).
- Radii (counts): pill (90 elements), 18px (8), 24px (7), 28.8px (7), 36px (4), 38px (3), 20px (3), ~27px (14, scales with viewport). Service cards: 18px radius, 24px gap, padding 18x24, widths 392 (3-up) and 600 (2-up) at 1440; 3-up/2-up asymmetric grid in 1224px.
- Dark panels (services, spotlights) are rounded 36-38px slabs inset 18px from the viewport, alternating with the light background. This is the page's rhythm device.
- Motion: most interactive elements use `all 0.3s cubic-bezier(0.76, 0, 0.24, 1)` (easeInOutQuart); colour/background/shadow use `0.5s cubic-bezier(0.7, 0, 0, 1)`. 2 running animations on load. 171 images (SVG logos plus studio imagery), 20 inline SVG, 0 canvas, 0 video on home. Services cards carry custom isometric line-art illustrations in one stroke weight and one grey ramp.
- Team grid: 14 hand-drawn monochrome avatar tiles, rounded-square, same line weight, pink cheek accent only. Consistent set, a recognisable detail.
- Mobile: hero CTAs go full-width (352x54), logo strip becomes a horizontal marquee, 50+ More pill appears, h1 drops to 28.5px (still 3 lines), nothing overflows.

## 4. What makes it good (concrete)

1. **One family, one tracking rule.** Geist at -0.03em on every heading, weight 700, body 500. A single typographic voice with real contrast of size, not of family. [engine note] Tight tracking at 52px plus 1.07 leading gives the compact, confident headline block in the fold screenshot.
2. **Restraint as a palette.** Page chroma is zero; colour arrives only through client work. Because the shell is neutral, every screenshot of client work becomes the colour in the page. Spotlights and the /work grid (cards with title tab cut into the image corner) are the visuals.
3. **Fill-contrast depth, not shadows.** Four neutral fills carry all elevation. No glass, no gradients, no shadow stacks on the shell.
4. **A radius family that nests.** 18px cards inside 36-38px slabs (inner = outer / 2 at 18/36), pill for every action. Nested radii are consistent.
5. **Section rhythm by alternation.** Light, dark slab, light stats row, dark slab, light team, white testimonial slab: the page is paced by background alternation, not by decorative dividers.
6. **Proof is concrete and ordered.** Status pill -> headline -> one-line promise -> 2 CTAs -> logo strip (6 logos then "50+ more") -> services -> 4 stat numerals -> 3 case-study spotlights -> team -> testimonials -> FAQ -> CTA. Case-study pages show Outcome / Gallery / Testimonial / Tools used in a 626px column (same measure as the h1 max-width).
7. **Type scale is a build artifact, not a design file artifact.** The starter says to reconcile the design's h1/h2/h3/p, mobile and desktop, against global `@layer base` before building anything. Styles live on tags, components do not restyle text (rules 1 and 3 in `.builderrules`).
8. **Assets are engineered.** Every image, video, Rive and Lottie goes through one `Asset` component; AVIF conversion and inline-cost reporting scripts; Rive loading gated behind LCP; navbar and hero assets inlined so the first screen paints instantly (from README/CLAUDE.md summaries).
9. **Motion is a single curve.** One easing token family shared between Tailwind and Framer Motion (GSAP "power" easings per CLAUDE.md summary). Measured: easeInOutQuart 300ms on interactives.
10. **Design-to-code handoff syntax.** Figma layer-name directives (`[[hover]]`, `[[export]]`, `[[lightbox-image]]`), icons exported from Figma instead of an icon library. A written handoff protocol.

### Weaknesses worth knowing (the studio site is not flawless)

- Muted copy on dark cards (#9d9d9d on #313131) is roughly 4.5:1 by our estimate [engine note, not measured with the tool]; chips at 10.5px are tiny.
- Body weight 500 everywhere flattens secondary hierarchy; reliance on colour value and size only.
- The site shell is a competent shadcn-neutral look; the distinctiveness is in the portfolio, not the shell. Do not copy the shell expecting distinctiveness.
- Hero decorative K mark at low contrast behind the h1 is the only brand device on the shell.

## 5. Rules (SCHEMA format)

- **RULE** Before building any page, reconcile the design's h1/h2/h3/p values (mobile and desktop) against global base styles; style tags once, never per component.
  **Why** One source of type truth stops drift; Kargul Studio's starter makes this "rule 1".
  **Applies to** landing page | marketing site. **Check** computed font-size/line-height/letter-spacing of every `h1-h3,p` equal across all pages within 0px; no `text-[..px]` utilities on headings. **Source** github.com/kargulstudio/sales-crm CLAUDE.md, .builderrules (summary).

- **RULE** Express section vertical padding as 3-4 named tokens (sm/md/lg/page) plus one global gutter token; every section uses a token.
  **Why** Section rhythm becomes auditable; measured kargul.studio has `--padding-section-sm 2rem / md 3.5rem / lg 3.5rem / page 7.375rem`, `--padding-global 1.1875rem`.
  **Applies to** marketing site. **Check** list of distinct section padding-top/bottom values <= 4; gutter identical on every page. **Source** measured :root vars.

- **RULE** Give headings `max-width` in `em`, paragraphs in `em` derived from px/font-size.
  **Why** Line length scales with the type size across breakpoints. Kargul h1 max-width measured 626.08px at 52px = 12.04em.
  **Applies to** all. **Check** `parseFloat(getComputedStyle(h).maxWidth) / parseFloat(fontSize)` is constant per heading level across breakpoints; source CSS has no px max-width on headings. **Source** .builderrules rule 4; measured.

- **RULE** One tracking value for display type (about -0.03em at 18-72px) and one easing family for interactions; record both as tokens.
  **Why** Uniform micro-values read as intent. Measured: heading letter-spacing -0.03em at 18, 36, 52, 72px; easing cubic-bezier(0.76,0,0.24,1) 0.3s.
  **Applies to** all. **Check** set of distinct `letter-spacing/font-size` ratios on h1-h3 has size 1 (+/-0.002); set of transition timing functions <= 3. **Source** measured.

- **RULE** If the shell is neutral, put colour and personality in the work shown (screenshots, illustration, imagery) and make that work per-client distinctive.
  **Why** Neutral frame + distinctive content is how a studio looks consistent and not templated. (This does not make a neutral shell a good brand site for a product with no portfolio; see `fully-specced-bar.md`.)
  **Applies to** studio / portfolio sites. **Check** visual. **Source** kargul.studio screenshots.

## 6. Exceptions and judgement calls

- Kargul Studio sells to startups that value "looks like a premium SaaS" over "owns a brand voice". The neutral Geist/grayscale shell is a deliberate sales choice (fast to trust, never competes with client work). Larpo's goal, per CLAUDE.md principle 2, is divergence; copy the **process** (spec, tokens, assets, handoff), not the **look**.
- Weight 500 body plus 700 headings only works at Geist's optical size and with generous leading; with other families weight contrast needs rechecking.
- Alternating dark slabs is a known pattern; the particular nested-radius ratio is the detail, not the alternation.

## 7. Open questions

- Is the AlignUI team (Erşad, Deniz, Emre) employed by or contracted to Kargul Studio, and does the studio own AlignUI? **Unverified.**
- Founder to confirm which "Marcel Kargul work" he means: kargul.studio client work, AlignUI, or Marcel's X posts. The quality bar should be pinned to named URLs, not a person.
- `CONVENTIONS.md` from the starter is not published (404 on `main`). Ask the founder if he has a copy, or skip: its table of contents is already summarised above.
- X profile and posts could not be fetched (HTTP 402). Anything attributed to Marcel's posts is from search snippets.
- Pages not individually measured: /intro, /work/* case pages other than agent-arcade, /swipe-file.
