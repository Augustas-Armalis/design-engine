---
source: web:npm registry (npm view, 2026-10-15) ; GitHub repos + licence files (gh api) ; esbuild bundle builds (scratchpad, gzip -9) ; ui.shadcn.com/docs/changelog ; base-ui.com/react/overview/releases ; coss.com/ui/docs (+ cosscom/ui LICENSING.md) ; gsap.com/standard-license ; motion.dev/plus ; react.dev/blog/2026/09/09/react-19-3 ; shaders.paper.design ; fontshare ITF FFL 2.0 (licence file inside the Switzer download) ; secondary: pkgpulse, designrevision, devtoolpicks, infoq, hugeicons.com/pricing, skiper-ui.com
chapter: Online libraries for SaaS / AI-SaaS marketing sites and product UI: what to reach for, what to avoid
pages: n/a (web + registry, fetched 2026-10-15)
topic_tags: [libraries, components, primitives, base-ui, coss, shadcn, motion, gsap, shaders, webgl, charts, dataviz, icons, fonts, licences, bundle-size]
status: studied
---

# Libraries catalogue (2026-10-15)

Machine-readable twin: `system/libraries.json` (79 entries: family, npm, pinned version + date, latest, licence, verdict, bestFor, pitfalls, install, measured gzip size, evidence). Related: `motion-library-react.md` (Motion/GSAP APIs), `effects-materials.md` (shaders, grain), `font-catalogue.md` + `type-voices.md` (fonts), `product-ui-deep.md` (what the components must look like), `docs/coss-ui.md` (product-app rules).

**Evidence marks.** **[M]** verified this session: npm registry data, a licence file read in the repo, a bundle I built and measured, or a primary docs page. **[V]** believed: secondary sources, pricing pages that disagree, or memory. Measured sizes are esbuild 0.25 minified + gzip -9 of the named import, React external, `.wasm` excluded (wasm sizes listed separately). They are the cost of the library code, not of your scene/asset files.

**Pin rule used here.** "Pin" = newest stable version released on or before 2026-10-01 (14 days before today). Install exact versions (`npm i pkg@x.y.z`, `"pkg": "x.y.z"`), never `^`, in client builds. One standing override: Motion (see LIB-07).

## 1. Core ideas

1. **The premium bar is set by restraint, not by library count.** Of 15 measured benchmark sites (Linear, Attio, Stripe, Vercel, Raycast, Resend, Dub, Clerk, Granola, Cursor, AlignUI, PostHog, Plain, Framer, Commslayer), **0** load GSAP, ScrollTrigger, Lenis, Locomotive, Lottie or Rive; **8** run a WebGL canvas; **6** use CSS scroll-driven animation; only the 2 Framer-built sites ship Framer Motion. [M] (`knowledge/benchmarks/motion/harness/mx_libs.json`). The engine's kit (React + motion + Paper Shaders + hand-built product UI) already matches what the best sites do.
2. **Primitives decide behaviour, the skin decides taste.** Base UI / Radix / React Aria all give accessible behaviour; none of them gives the Kestrel look. Any styled kit (shadcn, coss, HeroUI, Untitled) is a starting skin that must be re-tokenised to the bound system, or it reads as that kit.
3. **The ecosystem consolidated on Base UI in 2026.** Base UI 1.0 shipped 2025-12-11; shadcn made Base UI the default base in July 2026 (Radix and React Aria remain options); coss ui is Base UI-native; Base UI now has Drawer (stable since 1.3), OTPField (stable 1.6), Toast, Combobox, NumberField. [M] Libraries that existed to fill Radix gaps (Vaul, input-otp, cmdk) are now optional or obsolete.
4. **Copy-owned registries beat packages for anything visible.** shadcn CLI 4 installs from any registry (`@coss`, `@skiper-ui`, ReUI, Magic UI, Motion Primitives, GitHub repos). Owned source can be re-tokenised; a package (HeroUI, Tremor npm) cannot without fighting it. [M]
5. **Effect collections are idea mines, not parts bins.** Magic UI, Aceternity, React Bits and friends are where the "AI landing page" look comes from: border beams, spotlights, aurora backgrounds, shiny text. Their value is a mechanism to rebuild once, with our motion tokens and one looping effect per fold (EF rules). [V] (founder rejects; anti-ai-slop.md)
6. **Rendered visuals are priced in kilobytes and GPU time.** Measured gzip: Paper MeshGradient 8 kB, OGL 13 kB, cobe 6 kB, three 186 kB, R3F 244 kB, Unicorn wrapper 226 kB, Rive 67 kB + ~800 kB wasm, dotLottie 14 kB + ~485 kB wasm, Spline 1,063 kB. [M] A signature visual that costs a megabyte before its scene loads is not premium on a phone.
7. **Top-tier product mockups do not use chart libraries.** Kargul's sparklines, meters and step charts are hand-built DOM/SVG sized to the type (`kargul-source-study.md` idea 7). Chart libraries belong in real apps, where tooltips, axes and data volume justify them. [M]
8. **Licences are not uniform "MIT".** coss ui registry components are MIT but the cosscom/ui repo default is AGPL-3.0; React Bits and Animate UI are MIT + Commons Clause; GSAP is a free proprietary licence with a Webflow-competitor clause; Remix Icon moved to a custom licence in 2026-01; Fontshare's FFL 2.0 forbids handing fonts to contractors and subsetting. [M] For an agency that ships client code, this matters more than bundle size.
9. **Staleness is a quality signal.** Vaul ("This repo is unmaintained", last release 2024-12), Theatre.js (2024-05), Vanta (2022-09), lottie-web (2025-05), Heroicons (2024-11), Tremor npm (2025-01), uiverse repo (2024-09). [M] Do not start new work on them.
10. **Tailwind's commercial side is in flux.** Tailwind Labs joined Shopify on 2026-09-09; the framework stays MIT; new Tailwind Plus sign-ups reportedly closed and tailwindcss.com/plus now shows a login wall. [M for the login wall; V for the rest]

## 2. Rules

### Choosing a library

- **RULE LIB-01** Product apps: Base UI primitives through coss ui (shadcn CLI, `@coss/*`), re-tokenised to the bound system. Use Radix only when reviewing/fixing a client codebase that is already on Radix; use React Aria Components only when the brief is a11y- or i18n-critical (date-heavy, audited).
  **Why** One primitive layer per app keeps focus, portal and dismissal behaviour consistent; coss is the engine's documented layer. **Applies to** SaaS app UI. **Check** `package.json` contains exactly one of `@base-ui/react`, `radix-ui`/`@radix-ui/*`, `react-aria-components`. **Source** docs/coss-ui.md; shadcn changelog 2026-07 [M]
- **RULE LIB-02** Install coss ui only through the shadcn registry (`npx shadcn@4.21.1 add @coss/<name>`); never copy files from `packages/ui` of github.com/cosscom/ui or cosscom/coss.
  **Why** Registry sources live in `apps/ui/registry` (MIT); the repo default and `@coss/ui` package.json are AGPL-3.0, which a client's closed product cannot carry. **Applies to** all. **Check** no `AGPL` header or `@coss/ui` workspace import in client code. **Source** cosscom/ui LICENSING.md, packages/ui/package.json `"license": "AGPL-3.0-or-later"` [M]
- **RULE LIB-03** Never ship a styled kit's default skin. After adding any shadcn/coss/ReUI/Untitled component, re-map radius, row pitch, type tuple, shadow tier and icon size to the bound system before the first screenshot.
  **Why** Unskinned shadcn is the measured "template baseline" (30 px KPIs, 36 px rows, 16 px Lucide at stroke 2). **Applies to** SaaS app UI | hero product windows. **Check** `check.mjs` radius ladder + PU-39 audit. **Source** product-ui-deep.md PU-27, PU-39 [M]
- **RULE LIB-04** Effect collections (Magic UI, Aceternity, React Bits, Cult, Kokonut, Skiper, Fancy, Animate UI, uiverse) are reference only: read the mechanism, rebuild it in our components with `motion-tokens.json` values; never paste a background effect (beams, spotlight, aurora, meteors, silk, iridescence) into a hero.
  **Why** These are the most-copied effects on 2024-26 SaaS sites, so they read as template on sight; many skip reduced-motion handling. **Applies to** landing page. **Check** grep for `BorderBeam|Spotlight|Aurora|Meteors|BackgroundBeams|ShinyText|Iridescence|Silk` in `work/*/src`. **Source** anti-ai-slop.md; founder verdicts in ledger [V]
- **RULE LIB-05** Allowed pulls from effect collections: Motion Primitives (MIT) single files such as TextEffect, TextMorph, TransitionPanel, ProgressiveBlur, SlidingNumber; Fancy Components only for brand-campaign heroes. Strip their transition values and use ours.
  **Why** They are built on Motion and restrained enough to sit at the Kestrel bar once re-timed. **Applies to** landing page. **Check** pulled file imports `motion/react` and references a motion token. **Source** github.com/ibelick/motion-primitives (MIT, pushed 2026-09-28) [M]
- **RULE LIB-06** Never redistribute Commons Clause components (React Bits, Animate UI) as a kit, template or engine package; using them inside one client product is allowed.
  **Why** Both licences permit use "as part of an application, website, or product" but forbid selling or redistributing the components themselves. **Applies to** all, especially `system/kits/*`. **Check** no React Bits / Animate UI code under `system/`. **Source** LICENSE files of DavidHDev/react-bits and imskyleen/animate-ui [M]

### Motion

- **RULE LIB-07** Motion (`motion/react`) is the only animation runtime in a React build; pin `motion@14.0.0` (the version every work/* app runs). Use `LazyMotion` + `m` + `domAnimation` on pages that do not need layout/drag.
  **Why** One timing language (the `T` timeline, Kaching tokens); measured 41 kB gz for `motion` vs 27 kB for LazyMotion + m. **Applies to** all React. **Check** `package.json` has `motion` and no `gsap`, `react-spring`, `@react-spring/*`, `animejs`. **Source** esbuild measurement [M]; product-hero kit. Override noted: the 14-day rule alone would pick 13.5.0; 14.0.0 (2026-10-02) passes on 2026-10-16.
- **RULE LIB-08** Add GSAP only for a pinned, scroll-scrubbed storytelling section, SVG draw/morph, or SplitText line masks Motion cannot do; write `override: LIB-07 because <reason>` in DIRECTION.md. Never in a product the client sells as a no-code visual animation builder.
  **Why** 47 kB gz for core + ScrollTrigger + SplitText; GSAP's standard licence prohibits use in tools that compete with Webflow's visual animation building. **Applies to** landing page. **Check** DIRECTION.md override present when `gsap` is a dependency. **Source** gsap.com/standard-license; webflow.com/blog/gsap-becomes-free [M]
- **RULE LIB-09** No Lenis (or any smooth-scroll hijack) on SaaS marketing sites unless the page is a scroll-scrubbed campaign piece and reduced motion disables it.
  **Why** 0 of 15 benchmark SaaS sites use it; it changes native scroll feel and breaks anchor/sticky expectations. **Applies to** landing page. **Check** no `lenis` dependency or `html.lenis` class. **Source** mx_libs.json [M]
- **RULE LIB-10** For route or list transitions in React 19.3+, try `<ViewTransition>` before Motion `layoutId`; trigger it with `startTransition`.
  **Why** Stable since React 19.3 (2026-09-09), browser-composited, no measurement cost. The kit is on React 19.2, so this needs a React bump first. **Applies to** SaaS app UI | multi-page sites. **Check** react >= 19.3.0. **Source** react.dev/blog/2026/09/09/react-19-3 [M]

### Rendered visuals

- **RULE LIB-11** First choice for a signature visual field is Paper Shaders (`@paper-design/shaders-react@0.0.81`, exact pin); second is a hand-written fragment shader on OGL; R3F/three only when the concept is truly 3D.
  **Why** 8-30 kB gz vs 186-244 kB; Paper already carries the accepted Quorum stage (GrainGradient, noise 0, blurred). Paper is 0.0.x so props can change between releases. **Applies to** landing page. **Check** exact version string; one looping shader per fold; paused when offscreen. **Source** esbuild measurement; work/quorum/app/src/HeroV6.tsx [M]
- **RULE LIB-12** Never embed Spline runtime scenes on a production marketing page; render the scene to video (AV1/H.264 + poster) or a PNG/WebP sequence instead.
  **Why** 1,063 kB gz of JS before the scene file (measured). **Applies to** landing page. **Check** no `@splinetool/*` in dependencies. **Source** esbuild measurement [M]
- **RULE LIB-13** Rive and dotLottie load lazily (IntersectionObserver or `requestIdleCallback`) and never sit in the first fold's critical path; Lottie never in the hero.
  **Why** Their wasm runtimes are ~800 kB and ~485 kB gz. **Applies to** landing page. **Check** dynamic `import()` for `@rive-app/*`, `@lottiefiles/*`. **Source** wasm files gzip-measured [M]
- **RULE LIB-14** Unicorn Studio scenes need the paid Legend plan for commercial use without the watermark; the React wrapper is a community package.
  **Why** Free plan: up to 8 publishes, branding, non-commercial. **Applies to** client work. **Check** client owns a Legend account before a Unicorn scene ships. **Source** unicorn.studio/docs/pricing [V]; npm `unicornstudio-react` maintainer diegopeixoto [M]

### Data viz

- **RULE LIB-15** Charts inside hero, bento and product-window mockups are hand-built SVG/DOM (d3-shape + d3-scale for paths, or visx primitives), sized to the surrounding type; no Recharts/Nivo/Chart.js defaults in marketing mockups.
  **Why** That is how Kargul's micro-visuals are built and why they read as a real product; library defaults read as a template dashboard. **Applies to** landing page | hero dashboards. **Check** no `recharts|@nivo|chart.js` import under hero/bento components. **Source** kargul-source-study.md 2.9 [M]
- **RULE LIB-16** In real product apps use Recharts (through the coss/shadcn chart wrapper) and restyle it: 11-12 px tabular tick labels in the muted ink, no vertical grid, dashed or no horizontal grid, custom tooltip using the overlay shadow tier. Switch to uPlot for > 10k points per series, ECharts (tree-shaken, SVGRenderer) only for maps/candlesticks/sankey.
  **Why** Recharts is 106 kB gz but complete and React-native; uPlot 23 kB canvas scales; ECharts is 171 kB even tree-shaken. **Applies to** SaaS app UI. **Check** bundle analyser; one chart library per app. **Source** esbuild measurement [M]

### Micro-UI, icons, fonts

- **RULE LIB-17** In coss/Base UI apps use the built-in Drawer, OTPField, Toast (`toastManager.add`) and Command; do not add Vaul (unmaintained), input-otp, Sonner or cmdk on top.
  **Why** Duplicate primitives fight over focus and stacking; Vaul's README says it is unmaintained. **Applies to** SaaS app UI. **Check** none of `vaul|input-otp|sonner|cmdk` alongside `@base-ui/react`. **Source** base-ui releases (Drawer stable 1.3, OTPField stable 1.6); github.com/emilkowalski/vaul [M]
- **RULE LIB-18** Use NumberFlow for any number that changes on screen (KPI, price toggle, live counter), with `font-variant-numeric: tabular-nums`; never hand-roll count-ups with setInterval.
  **Why** 6 kB gz, Intl-correct formatting, digit-roll that respects reduced motion. **Applies to** all. **Check** `@number-flow/react` present when a counter animates. **Source** esbuild measurement; npm 0.6.2 [M]
- **RULE LIB-19** One icon family per product, set at the system's stroke and size (product-ui-deep.md); Lucide by default, Phosphor or Remix for a different voice, Central Icons when the client pays for a premium set whose corner radius matches the radius ladder.
  **Why** Mixed families show as uneven stroke and corner logic. **Applies to** all. **Check** count distinct icon imports per app <= 1 (plus Simple Icons for brand marks). **Source** product-ui-deep.md [M]
- **RULE LIB-20** Fontshare fonts (Switzer, Satoshi, General Sans, Sentient, Cabinet Grotesk) may be self-hosted on the client's own site, but the client must download its own copy from fontshare.com; never subset, convert or rename the files, never commit them to a public repo, never offer them as selectable fonts in a SaaS/template editor.
  **Why** ITF Free Font License 2.0 (2026-08-17) clause 01 allows self-hosting; clause 02 forbids modification incl. "subsetting, format conversion", providing the files to "agencies, contractors", and serving them to third-party users. **Applies to** all client work. **Check** font files arrive from the client; woff2 byte-identical to the Fontshare zip. **Source** FFL.txt inside the Switzer download [M]. This supersedes the "needs checking" in font-catalogue.md C-08.

## 3. Numbers & scales

### 3.1 Measured bundle cost (gzip, kB) [M]

| Import | gz | | Import | gz |
|---|---|---|---|---|
| `motion` component | 41 | | Paper `MeshGradient` | 8 |
| `LazyMotion` + `m` + `domAnimation` | 27 | | Paper `GrainGradient` + `Dithering` | 30 |
| `animate` (vanilla motion) | 20 | | OGL Renderer/Program/Mesh | 13 |
| gsap core | 27 | | cobe globe | 6 |
| gsap + ScrollTrigger + SplitText | 47 | | three (namespace import) | 186 |
| lenis | 5 | | three + R3F Canvas | 244 |
| @formkit/auto-animate | 3 | | unicornstudio-react | 226 |
| @react-spring/web | 17 | | Spline react + runtime | 1,063 |
| Base UI Dialog / +Menu+Select+Tooltip | 23 / 68 | | Rive react-canvas JS (+ wasm ~800) | 67 |
| radix-ui Dialog / +DropdownMenu+Select+Tooltip | 13 / 47 | | dotLottie react JS (+ wasm ~485) | 14 |
| react-aria-components Dialog / +Menu+Select+Tooltip | 21 / 57 | | lottie-web (full) | 77 |
| @ark-ui/react Dialog | 19 | | recharts AreaChart set | 106 |
| @number-flow/react | 6 | | visx shape + scale | 20 |
| sonner | 9 | | @nivo/line | 94 |
| vaul | 23 | | echarts full / core+line+grid+tooltip (SVG) | 375 / 171 |
| cmdk | 19 | | uplot | 23 |
| input-otp | 4 | | chart.js/auto | 69 |
| embla-carousel-react | 8 | | react-day-picker | 20 |
| react-resizable-panels | 19 | | date-fns format+addDays | 6 |
| @tanstack/react-table (v9 useTable) | 11 | | @tanstack/react-virtual | 8 |
| lucide 1 icon | 2 | | phosphor 1 icon (ssr) / tabler 1 icon | 1 / 1 |

Base UI costs more per component than Radix (23 vs 13 kB for Dialog) because it ships floating-ui and its own utilities once; the gap narrows as you add components (68 vs 47 for four). Not a reason to leave Base UI; a reason to import per-component subpaths.

### 3.2 Family tables

Verdicts: **core** default stack · **reach** first choice for a named job · **situational** only when the job needs it · **reference** study and rebuild, do not paste · **avoid**. Versions are the pinned version (release date); latest in brackets when newer.

**1. Primitives and styled component libraries**

| Library | Pin | Licence | Verdict | Would Kargul/Basit/Rico ship it? | Best for / pitfall |
|---|---|---|---|---|---|
| Base UI `@base-ui/react` | 1.8.0 (2026-09-04) [1.9.0 10-09] | MIT [M] | core | Yes, underneath their own skin | Drawer, OTP, Toast, Combobox built in. `@base-ui-components/react` is deprecated [M] |
| coss ui (`@coss/*` registry) | via `shadcn@4.21.1` | MIT registry / AGPL repo [M] | core | Yes once re-skinned (Cal.com quality) | 53 primitives + particles + chat UI; LIB-02 licence trap |
| shadcn/ui CLI `shadcn` | 4.21.1 (2026-10-01) [4.21.5] | MIT [M] | core | The CLI yes, the default skin no | Bases: Base UI (default since 2026-07), Radix, React Aria; 2026-10 added Trace, Code Block, AI Elements [M] |
| Radix `radix-ui` | 1.6.7 (2026-07-24) [1.8.1] | MIT [M] | situational | Many did (Linear-era), now legacy | Lightest per component; many rc tags, pin stable |
| React Aria Components | 1.21.1 (2026-09-04) [1.22.1] | Apache-2.0 [M] | situational | Rico-grade a11y yes; idiom differs | Best a11y/i18n, dates, DnD, virtualised collections |
| Ark UI | 5.39.2 (2026-09-13) | MIT [M] | avoid | No | Zag machines, multi-framework; Panda ecosystem |
| Park UI | 1.0.1 CLI (2025-11-20) | MIT [M] | avoid | No | Joined Chakra org 2025-11; repo quiet since 2026-04 [M] |
| HeroUI | 3.2.6 (2026-09-17) | Apache-2.0 [M] | avoid | No (reads HeroUI) | v3 rewrite on React Aria + TW4 (2026-03) [V]; package lock-in |
| Origin UI | coss.com/origin | MIT [M] | reference | Pieces | 600+ legacy components, evolving into coss particles [M] |
| ReUI | registry | MIT [V] | reach | With re-skin | Data Grid, Kanban, Filters, File Upload, Gantt; Radix + Base UI flavours [V] |
| AlignUI | paid | commercial [V] | reference | It is the bar for light product UI | Already studied (affectui-product-kit.md); pricing pages disagree [V] |
| Untitled UI React | CLI | MIT open / PRO commercial [M] | reference | Rarely (strong house look) | React Aria + TW4; good state coverage |
| Tailwind Plus + Catalyst | closed to new buyers [V] | commercial | reference | Catalyst proportions yes | Headless UI underneath (2.2.10, 2026-04) |

**2. Effect / animated component collections**

| Library | Licence | Verdict | Quality for our bar | Mine for |
|---|---|---|---|---|
| Motion Primitives | MIT [M] | reach | Restrained, Motion-native | TextEffect, TextMorph, TransitionPanel, ProgressiveBlur, SlidingNumber, MorphingDialog |
| Magic UI | MIT free / paid Pro [M/V] | reference | Recognisable everywhere | Marquee, NumberTicker, AnimatedBeam (integration diagrams) mechanics |
| Skiper UI | free + $129/$549 [V] | reference | Highest craft of the set (Devouring-Details lineage) | Image reveal, Vercel-style tooltip, dynamic island; read terms before shipping paid items |
| Fancy Components | MIT [M] | reference | Inventive type play | Variable-font hover, text-along-path, gravity; campaign heroes only |
| Animate UI | MIT + Commons Clause [M] | reference | Good animated primitives | Tab highlight, animated icons |
| Cult UI | MIT / paid Pro [M] | reference | Mixed | Dynamic island, expandable card |
| React Bits | MIT + Commons Clause [M] | reference | Popular = template tell | Split/blur/decrypt text; OGL backgrounds only as shader study |
| Aceternity UI | free + Pro licence [V] | avoid | The 2024 AI-landing look | Concepts only (sticky scroll reveal) |
| Kokonut UI | MIT / Pro [M] | avoid | Dribbble gradients | AI input ideas |
| uiverse | MIT [M] | avoid | Uneven community CSS | Nothing |

**3. Motion**

| Library | Pin | Licence | Verdict | Use / pitfall |
|---|---|---|---|---|
| Motion `motion` | 14.0.0 (override; rule pin 13.5.0) [latest 14.3.0, 2026-10-15] | MIT [M] | core | Everything React; Motion+ $399 solo one-time, private repo [V] |
| GSAP `gsap` + `@gsap/react` | 3.15.0 (2026-04-13) + 2.1.2 | GSAP Standard no-charge [M] | situational | ScrollTrigger pin/scrub, SplitText, DrawSVG/MorphSVG; LIB-08 |
| AutoAnimate | 0.10.0 (2026-07-10) | MIT [M] | situational | One-line list transitions in internal tools |
| react-spring | 10.1.2 (2026-06-24) | MIT [M] | avoid | Duplicates Motion |
| Theatre.js | 0.7.2 (2024-05-19) | Apache / AGPL studio [M] | avoid | Stale |
| Lenis | 1.3.26 (2026-08-05) [1.3.27] | MIT [M] | situational | Campaign scroll pieces only (LIB-09); `lenis/react` export exists [M] |
| React `<ViewTransition>` | react 19.3.0 (2026-09-09) | MIT [M] | reach | Stable VT API in React (LIB-10) |

**4. Shaders, 3D, rendered visuals**

| Library | Pin | Licence | Verdict | Quality verdict |
|---|---|---|---|---|
| Paper Shaders `@paper-design/shaders-react` | 0.0.81 (2026-09-17) | Apache-2.0 [M] | core | Studio-grade; Mesh/Grain gradient, Dithering, Halftone dots/CMYK, Paper texture, Fluted glass, Liquid metal, God rays, Heatmap [M] |
| OGL | 1.0.11 (2025-01-27) | Unlicense [M] | reach | Best weight for custom GLSL fields |
| Unicorn Studio `unicornstudio-react` | 2.2.13 (2026-09-11) [2.4.0] | wrapper MIT; plan-gated [M/V] | situational | Rich designer scenes; heavy and paid |
| Rive `@rive-app/react-canvas` | 4.36.0 (2026-09-30) | MIT runtime [M] | situational | Best for interactive illustration; needs an artist |
| dotLottie `@lottiefiles/dotlottie-react` | 0.19.16 (2026-08-28) [0.20.0] | MIT [M] | situational | Small loops only |
| three.js | 0.186.1 (2026-09-24) | MIT [M] | situational | Real 3D only |
| R3F + drei (+ postprocessing) | 9.8.1 / 10.7.9 / 3.1.3 | MIT [M] | situational | Premium only with a 3D designer and a poster fallback |
| cobe | 2.0.1 (2026-03-19) | MIT [M] | situational | The dotted globe; very recognisable |
| Spline | react-spline 4.1.0 / runtime 2.0.65 | proprietary runtime [M] | avoid | Pretty in the editor, 1 MB on the wire |
| ShaderGradient | 2.4.20 (2025-12-08) | MIT [M] | avoid | Colour-blob gradients = forbidden dark-mode look |
| Vanta.js | 0.5.24 (2022-09-16) | MIT [M] | avoid | Dated, stale |
| lottie-web | 5.13.0 (2025-05-21) | MIT [M] | avoid | Use dotLottie |

**5. Data viz** (closest to Kargul/Attio-grade: hand-built SVG > visx > restyled Recharts > everything else)

| Library | Pin | Licence | Verdict | Notes |
|---|---|---|---|---|
| Hand-built SVG + `d3-shape` / `d3-scale` | 3.2.0 / 4.0.2 | ISC [M] | core (mockups) | Kargul sparkline: 14 bars, 4 px wide, 1 px gap, two tones of one hue |
| visx | 4.0.0 (2026-06-11) | MIT [M] | reach | React SVG primitives; full control of axes and gradients |
| Recharts | 3.10.1 (2026-07-25) | MIT [M] | reach (apps) | Under shadcn/coss charts; restyle per LIB-16 |
| Tremor | npm 3.18.7 (2025-01-13, frozen) | Apache-2.0 [M] | reference | Vercel-owned, copy-paste site + free blocks [V] |
| ECharts | 6.1.0 (2026-05-19) | Apache-2.0 [M] | situational | Heavy analytics only; `echarts-for-react` latest tag 3.0.6 while 3.2.7 is published [M] |
| uPlot | 1.6.32 (2025-03-14) | MIT [M] | situational | Big time series |
| Nivo | 0.99.0 (2025-05-23) | MIT [M] | avoid | Heavy per chart, slow cadence |
| Chart.js | 4.5.1 (2025-10-13) | MIT [M] | avoid | Canvas text never matches the page |

**6. Micro-UI**

| Library | Pin | Verdict | Notes |
|---|---|---|---|
| NumberFlow `@number-flow/react` | 0.6.2 (2026-07-18) | core | LIB-18 |
| date-fns | 4.4.0 (2026-05-29) | core | Sample data dates; DayPicker 10 peer |
| react-resizable-panels | 4.14.1 (2026-09-27) [4.14.5] | reach | v4 exports `Group`, `Panel`, `Separator` [M] |
| Embla Carousel | 8.6.0 (2025-04-04) | reach | No autoplay |
| TanStack Table | 9.2.4 (2026-08-28) [9.3.1] | reach | v9 API `useTable` (v8 examples break) [M] |
| TanStack Virtual | 3.14.13 (2026-09-14) | reach | Long lists |
| React DayPicker | 10.0.2 (2026-09-30) | reach | Peers date-fns 4 + @date-fns/tz [M] |
| Sonner | 2.0.8 (2026-08-09) | situational | Non-coss apps only |
| cmdk | 1.1.1 (2025-03-14) | situational | Radix apps only |
| input-otp | 1.5.0 (2026-08-18) | situational | Non-Base UI apps only |
| Vaul | 1.1.2 (2024-12-14) | avoid | Unmaintained per README [M] |

All MIT [M].

**7. Icons and fonts**

| Package | Pin | Licence | Verdict | Voice |
|---|---|---|---|---|
| `lucide-react` | 1.49.0 (2026-09-29) [1.57.0, near-daily releases] | ISC [M] | core | Neutral 2 px; set 1.5 at 16 px |
| `@phosphor-icons/react` | 2.1.10 (2025-05-22) | MIT [M] | core | Six weights incl. duotone |
| `@remixicon/react` | 4.9.0 (2026-01-29) | Remix Icon License 1.0 [M] | core | Line/fill pairs; no icon-pack resale |
| Central Icons `@central-icons-react/<shape>-<fill>-radius-<r>-stroke-<w>` | 1.2.1 (2026-09-24) [1.2.15] | commercial, licence key [M] | reach | Premium; radius/stroke matched to the system |
| `@tabler/icons-react` | 3.48.0 (2026-09-22) | MIT [M] | situational | Breadth for admin UI |
| `@hugeicons/react` + `core-free-icons` | 1.1.10 + 4.3.5 | MIT free set; Pro $99/yr [M/V] | situational | Soft rounded |
| `@untitledui/icons` | 0.0.23 (2026-09-22) | MIT [M] | situational | Untitled look |
| `simple-icons` | 16.33.0 (2026-09-27) | CC0 (marks are trademarks) [M] | situational | Integration tiles only |
| `@heroicons/react` | 2.2.0 (2024-11-18) | MIT [M] | avoid | Small, stale |

Fontsource variable packages worth having, all OFL-1.1, all 5.3.x (2026-07-19 unless noted) [M]: `inter`, `inter-tight`, `geist`, `geist-mono`, `geist-pixel` (5.3.1), `newsreader`, `fraunces`, `jetbrains-mono`, `instrument-sans`, `mona-sans`, `hubot-sans`, `hanken-grotesk`, `host-grotesk`, `schibsted-grotesk`, `bricolage-grotesque`, `onest` (5.3.1), `source-serif-4` (5.3.1), `ibm-plex-sans`. Instrument Serif is static only: `@fontsource/instrument-serif@5.3.0` (no variable package) [M]. Switzer, Satoshi and General Sans are **not** on npm/Fontsource [M]; follow LIB-20.

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `npx shadcn@4.21.1 add @coss/dialog`, then re-map tokens | Copy `packages/ui/src/components/dialog.tsx` from GitHub | AGPL vs MIT (LIB-02) |
| `import { Dialog } from "@base-ui/react/dialog"` | `import * as Base from "@base-ui/react"` | Per-component subpath keeps 23 kB per component honest |
| `<GrainGradient ... speed={0.25} />` behind a blurred stage, paused offscreen | Paper shader + React Bits Silk + Magic UI beams on one fold | One looping effect per fold (effects-materials.md) |
| Hand-built 14-bar sparkline in a hero KPI | `<ResponsiveContainer><AreaChart>` with default grid in the hero | Kargul vs template dashboard (LIB-15) |
| `<NumberFlow value={price} format={{ style: "currency", currency: "USD" }} />` | `useEffect` + `setInterval` count-up | Intl, reduced motion, 6 kB |
| Spline scene exported to a 6 s AV1 loop + poster | `<Spline scene="...splinecode" />` in the hero | 1 MB JS before the scene |
| Client downloads Switzer from Fontshare, we self-host the untouched woff2 | We download, subset and commit Switzer | FFL 2.0 clauses 02 and 05 |

## 5. Exceptions & judgement calls

- **GSAP vs Motion** [engine note]. Motion covers 95% of SaaS hero choreography. GSAP wins for a long pinned scroll narrative with scrubbed SVG draws (campaign pages, launch microsites). If you add it, use it for that section only and keep Motion everywhere else, so the override stays local.
- **Radix in client repos** [engine note]. Review-and-fix work on a Radix codebase stays Radix. Migrating to Base UI is a separate job with its own estimate (asChild -> render, Overlay -> Backdrop, onSelect -> onClick).
- **When a template-tell effect is right** [engine note]. A marquee of integration logos or an animated beam diagram is acceptable when it carries a real claim (integrations exist) and is rebuilt with our tokens; it is the default skin and the decorative use that read as template.
- **Unicorn vs Paper** [engine note]. If the designer wants interactive multi-layer scenes and the client pays for Legend, Unicorn is fine below the fold or as the only visual on a campaign page; for the product-hero kit, Paper.
- **Base UI weight** [engine note]. Base UI is 1.4-1.8x Radix per component in measured gzip. It is still the right base (maintained, default in shadcn and coss); on marketing pages, do not import primitives at all unless a control needs them.
- **Central Icons** [engine note]. It is the set many top product designers use, but it is paid per licence. Use it when a client buys it; otherwise Phosphor/Remix give enough variety.

## 6. Default stacks

**Marketing hero / landing (Vite + React, product-hero kit)**

```bash
npm i react@19.2.8 react-dom@19.2.8 motion@14.0.0 @paper-design/shaders-react@0.0.81 \
  @number-flow/react@0.6.2 lucide-react@1.49.0 @phosphor-icons/react@2.1.10 @remixicon/react@4.9.0 \
  @fontsource-variable/inter@5.3.0 @fontsource-variable/inter-tight@5.3.0 \
  @fontsource-variable/geist@5.3.0 @fontsource-variable/geist-mono@5.3.0 \
  d3-shape@3.2.0 d3-scale@4.0.2 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
# optional by job: ogl@1.0.11 (custom GLSL) · embla-carousel-react@8.6.0 · @fontsource/instrument-serif@5.3.0 · d3-geo (already in kit)
# by override only: gsap@3.15.0 + @gsap/react@2.1.2 · lenis@1.3.26 · @rive-app/react-canvas@4.36.0
```
No component library on the marketing page; controls are hand-built to the bound system (buttons.css, navs).

**Product app (Next.js + coss ui)**

```bash
npx shadcn@4.21.1 init && npx shadcn@4.21.1 add @coss/ui @coss/style   # Base UI 1.8.x underneath
npm i motion@14.0.0 @number-flow/react@0.6.2 recharts@3.10.1 @tanstack/react-table@9.2.4 \
  @tanstack/react-virtual@3.14.13 react-resizable-panels@4.14.1 react-day-picker@10.0.2 date-fns@4.4.0 \
  lucide-react@1.49.0 @fontsource-variable/inter@5.3.0 @fontsource-variable/geist-mono@5.3.0
# by job: ReUI data grid / kanban / filters via shadcn registry · uplot@1.6.32 for big time series
```

Usage snippets:

```tsx
import { LazyMotion, domAnimation, m } from "motion/react"           // 27 kB gz instead of 41
<LazyMotion features={domAnimation} strict><m.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} /></LazyMotion>

import { MeshGradient } from "@paper-design/shaders-react"
<MeshGradient colors={["#0b0d12", "#1b2440", "#3a4fd8"]} distortion={0.6} swirl={0.1} speed={0.2} style={{ position: "absolute", inset: 0 }} />

import NumberFlow from "@number-flow/react"
<NumberFlow value={mrr} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} className="tabular-nums" />
```

## 7. Never use (new work)

Vaul · Theatre.js · Vanta.js · lottie-web · ShaderGradient · Spline runtime on production pages · uiverse snippets · Aceternity backgrounds (spotlight, aurora, lamp, beams, meteors) · Kokonut gradient components · HeroUI as a skin · Park UI / Ark UI in this React-only engine · Heroicons outside Tailwind Plus code · Chart.js and Nivo for product mockups · `@base-ui-components/react` and `@nextui-org/react` (deprecated) [M] · `motion-plus` npm package (deprecated; Motion+ is a private repo) [M] · AGPL code from cosscom repos in client products · a second animation runtime next to Motion without a DIRECTION.md override.

## 8. Open questions

- AlignUI current pricing and per-seat terms: pricing pages disagree (Figma ~$119.99, code $299.99-399.99, bundle up to $599.99 per a 2025-03 changelog) [V].
- Tailwind Plus: is it still sold to new buyers after the 2026-09-09 Shopify move? tailwindcss.com/plus returned only a login wall [M]; "sign-ups closed" comes from secondary sources [V].
- Skiper UI licence terms for free vs Premium items not read.
- Aceternity free-tier licence text not read (only the Pro licence summary).
- Central Icons pricing and the exact licence-key environment variable name; packages are private and key-gated [M], terms unread.
- Unicorn Studio pricing (Legend $168/yr) from a secondary read; confirm on unicorn.studio before quoting a client.
- Motion+ price ($399 solo, team per seat) from page structured data [V].
- HeroUI v3 release history from secondary sources; npm 3.2.6 (2026-09-17) [M].
- Wasm sizes for Rive/dotLottie assume the default full runtime; Rive's `-lite` builds and CDN-hosted wasm were not measured.
- Firefox status of cross-document View Transitions in 2026 not checked.
- echarts-for-react: why `latest` tag (3.0.6) lags published 3.2.7 (2026-05-19); treat 3.2.x as unsupported until the tag moves.
- Bundle sizes were measured with esbuild, not Vite/Rollup; expect +/- 10%.
