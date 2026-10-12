# Basit A. Khan benchmark credits

Study evidence only. Every image in this folder is the work of **Basit A. Khan** (X @basit_designs, Framer creator @basit-a-khan / @basitdesigns, Dribbble BasitAkhan, co-founder of Inspirux Design Studio, founder of Grainient), his studio, or his clients. They exist so the engine can measure his grammar (type tuples, light, buttons, product framing, motion). Never copy, trace, ship or present any of them as engine or Larpo work. Grainient gradients are paid assets: we study how they are used, we do not reuse them. Notes: `knowledge/web/basit-craft.md`; tokens: `system/variety/basit-tokens.json`.

## How it was captured (2026-10-11)

- Headless Chromium (Playwright from the repo), viewport 1440x900. Folds (`*-fold.*`) and section shots (`*-s01..s04.*`, each one viewport further down) at DPR 2. Full pages (`*-full.jpg`) at DPR 1, because Chromium's texture limit corrupts 2x captures taller than about 8,000 px. Large PNGs were converted to JPEG q86 after measuring; grain numbers in `measure/grain-analysis.json` come from the lossless PNGs.
- Load-in frames: `frames/<site>-load-{300,700,1200,2000}.jpg` (ms after navigation).
- Public pages only. No login, no account, nothing submitted, no likes or follows. Cookie banners were refused where a "Reject" button existed; Taxo's banner appears in its full-page capture (nothing was accepted). Most Framer template previews carry Framer's own "Get this template" / "Made in Framer" / "Monarque latest template" badges at the bottom right. Those badges are Framer marketplace chrome, not part of the design.
- Dribbble: the largest original image (`userupload/.../file/<id>.<ext>` without resize params) was downloaded for image shots. For video shots, the frame was captured from the playing `<video>` element at about 4.5 s (`<name>.png`) and about 8.5 s (`<name>-b.png`). Video URLs are listed in `measure/dribbble-shots.json`. Frames heavier than about 0.9 MB were converted to `.jpg`, so a file in the table below may end in `.png` or `.jpg`. `measure/dribbble-shots.json` lists the exact filenames.
- The folder holds 149 files: 20 live sites (fold, full, 1-4 section shots), 6 Grainient collection pages plus the shader tool, 32 Dribbble shots (55 images), 32 load-in frames and the measurement JSON. That is 59 pieces of work.
- Measurements: `measure/<site>.json` (fold probe: texts, buttons, layers, Framer appear JSON, getAnimations, page-wide teardown), `measure/<site>-deep.json` (headline + spans, eyebrow pill, nav shells, painted button layers + hover diff, big visual layers, canvases, appear targets, radius/shadow/backdrop/filter/font/gradient histograms), `measure/grain-analysis.json` (high-pass noise std and 5x4 colour grids from pixels), `measure/dribbble-shots.json`.

## Live sites and template previews

| Prefix | URL | What it is |
|---|---|---|
| `taxo` | https://taxo.ai/ | client site (listed under his Framer "Sites"): agentic AI for healthcare, Unicorn Studio WebGL grain hero, Source Serif 4 |
| `oberion` | https://oberion.framer.ai/ (template https://www.framer.com/marketplace/templates/oberion/) | Oberion AI: AI / fintech SaaS template |
| `fuchsia` | https://fuchsia.framer.ai/ (gallery https://www.framer.com/community/gallery/fuchsia-web3saas-framer-website/) | Fuchsia: dark Web3/SaaS site |
| `greenvest` | https://greenvest.framer.website/ (template /greenvest/) | Greenvest: SaaS / fintech app template |
| `grainient` | https://grainient.supply/ | Grainient, his gradient resource (Unicorn Studio light-wave hero) |
| `grainient-noisy-grainy`, `-hero-gradients-v3`, `-spectral-darks`, `-ecliptic`, `-dither-ii`, `-swiftglow` | https://grainient.supply/noisy-grainy, /collections/hero-gradients-v3, /collections/spectral-gradient-(darks), /collections/ecliptic-gradients, /collections/dither-gradient-ii, /collections/swiftglow-gradients | Grainient collection pages (preview thumbnails) |
| `grainient-shader-tool` | https://shader.grainient.supply/ | Grainient shader tool (defaults read from its inputs) |
| `inspirux` | https://inspirux.com/ | his studio site |
| `hipandflo` | https://hipandflo.com/ | client site (fashion) |
| `eventverse` | https://event-verse.framer.website/ | Eventverse template (community events) |
| `nothing` | https://nothingdesignstudio.framer.website/ | Nothing Studio template |
| `alien` | https://alienstudio.framer.website/ | Alien Studio template |
| `archar` | https://archar.framer.website/ | Archar portfolio template |
| `monarque` | https://monarque.framer.website/ | Monarque real-estate template |
| `bellavista` | https://bellavista.framer.media/ | Bellavista resort template |
| `bellevoire` | https://bellevoire.framer.website/ | Bellevoire resort template |
| `archform` | https://archform.framer.website/ | ArchForm architecture template |
| `troscan` | https://troscan.framer.website/ | Troscan furniture template |
| `gaststatte` | https://gaststatte.framer.website/ | Gaststätte restaurant template |
| `minimaline` | https://minimaline.framer.website/ | Minimuline portfolio template |
| `peter` | https://peterkenworth.framer.website/ | Peter portfolio template |
| `victor` | https://victorr.framer.website/ | Victor portfolio template |

Profiles used for discovery: https://www.framer.com/@basit-a-khan/ (15 templates, 3 sites), https://www.framer.com/@basitdesigns/, https://dribbble.com/BasitAkhan (96 shots listed; 32 SaaS / AI / fintech / dark shots captured).

## Dribbble shots (https://dribbble.com/shots/<id>)

| File prefix `dribbble-` | Shot id | Type |
|---|---|---|
| `gloviseai-website-design(-2,-3)` | 27694225 GloviseAI Website Design | image |
| `lowpro-landing-page-design(-b)` | 27698101 Lowpro Landing page design | video frame |
| `branding-card-designs(-b)` | 27752467 Branding Card designs (liquid glass) | video frame |
| `grainient-dither-collection` | 27636595 Grainient Dither Collection | image |
| `dither-visual-snippets-design` | 27615342 Dither Visual Snippets Design | image |
| `mellerun-landing-page-design(-b)` | 27586764 Mellerun Landing page design | video frame |
| `grainientsupply-landing-page-design(-b)` | 27346934 GrainientSupply Landing page design | video frame |
| `grainient-supply-v2(-b)` | 27339976 Grainient Supply v2 | video frame |
| `catalyst-landing-page-design(-b)` | 26903364 Catalyst landing page design | video frame |
| `landing-page-design-for-saas(-b)` | 26805694 Landing page design for SaaS (Juristyn.ai) | video frame |
| `website-featured-section` | 26334989 Website Featured section | image |
| `ai-based-saas-product-landing-page(-b)` | 26319236 AI Based SaaS product landing page | video frame |
| `fintech-landing-page-design(-b)` | 26302333 Fintech landing page design | video frame |
| `landing-page-design-for-high-yield-usd(-b)` | 26289932 Landing page design for High-yield USD | video frame |
| `ecollide-eco-system-landing-page-design(-b)` | 26248447 Ecollide Eco System Landing page design | video frame |
| `backed-by-usd-landing-page-design` | 26238435 Backed by USD Landing page design | image |
| `landing-page-redesign-for-mpa` | 26131146 Landing page Redesign for MPA | image |
| `pricing-page-for-ai-tool(-2)` | 26037498 Pricing page for AI Tool | image |
| `ai-based-infrastructure-web3-landing-pag(-b)` | 26023695 AI based Infrastructure web3 Landing page design | video frame |
| `logistics-landing-page-design-intro-anim(-b)` | 26010395 Logistics Landing Page design Intro animation | video frame |
| `cardless-banking-landing-page-design(-2)` | 25929623 Cardless banking landing page design | image |
| `landing-page-design-for-digital-banking` | 25828495 Landing page design for Digital Banking | image |
| `landing-page-design-for-ai-app-builder` | 25816144 Landing page design for AI App builder | image |
| `auracard-landing-page-design(-b)` | 25778977 AuraCard landing page design | video frame |
| `tasker-landing-page-design` | 25751915 Tasker Landing page design | image |
| `fintech-landing-page-design-animation(-b)` | 25572577 Fintech Landing page design animation | video frame |
| `q-chat-landing-page-design` | 25476001 Q-Chat Landing page design | image |
| `saas-product-landing-page-redesign` | 25309379 SaaS Product Landing page redesign (Equals) | image |
| `saas-product-framer-website-design(-b)` | 25005277 SaaS Product Framer Website design | video frame |
| `fuchsia-landing-page-design(-2)` | 24965116 Fuchsia Landing page design | image |
| `notegpt-ai-for-meeting-notes(-b)` | 24792626 NoteGPT AI for meeting notes | video frame |
| `orbital-web-application-design(-2,-3)` | 24670081 Orbital Web Application Design | image |
