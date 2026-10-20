# Kargul Studio case studies, 2026-10-20: credits and capture notes

Study evidence only. Every page, image and product screen here belongs to Kargul Studio (kargul.studio, Marcel Kargul) and, for client work, to the named clients. Nothing is to be reposted, traced, presented as engine or Larpo work, or shown to clients as ours. Client names and logos in the images stay theirs. The note that uses this evidence: `knowledge/web/kargul-micro-details.md` (KMD-01..23) and `system/product-ui/kargul-micro-tokens.json`.

## How it was captured

- Public pages only, no login, nothing liked, followed, submitted or posted; the cookie banner was declined where shown.
- Playwright Chromium (repo `node_modules`), 1440x900 at DPR 2: home (`home/page-full.png`), `/work` (`work/page-full.png`) and every case study linked from `/work` (32 cases, `<case>/page-full.png`). The case gallery is a horizontal carousel, so a full-page capture shows only the first three gallery images; the files below are the originals.
- Images: the `<img>` sources point to Next.js image URLs wrapping `cdn.sanity.io/images/bd8i35vk/production/<id>-2880x2070.png`; the original 2880x2070 files were downloaded directly (`<case>/<case>-NN.png`, NN = order in the case gallery; note the earlier `kargul-deep/gallery/` numbering starts at 01, so new `-00` = old `-01`).
- De-duplication against `kargul-deep/gallery/` (1800x1294 copies) by a 32x24 luminance signature (mean abs diff <= 3 = same image). Of 299 originals, 281 matched an existing gallery image; 18 are new (AM Trades 12, Rork 6) and 1 is a re-ordered Stardust image (`stardust-06`, diff 3.7). Kept: all new images plus every original whose gallery match is classed product UI in `kargul-x/gallery-classification.tsv` (dashboard, table, settings, detail, form, modal, empty-state, canvas, onboarding, mobile): 118 files. Brand, landing and bento originals (181) were not kept because their 1800px copies already exist.
- `cases.json`: per case the URL, client, categories, every gallery image (source URL, kept or skipped, class, gallery match).
- `_scripts/probe.mjs` (canvas pixel reads, edge scans, ink boxes, corner-arc fit, crops) and `_scripts/shadowfit.py` (1-2 layer box-shadow fit) reproduce every measurement in the note.

## Cases (client, categories, gallery images, kept, new)

| Client | Categories | Gallery | Kept | New to the engine |
|---|---|---|---|---|
| 43.io | Venture Capital, B2B, Website | 9 | 2 | - |
| Agent Arcade | Fintech, B2C, Landing Page, Product Ui/Ux | 18 | 9 | - |
| Altrina | Healthcare, B2B Saas, Website, Branding | 9 | 0 | - |
| AM Trades | Education, B2C, Product Ui/Ux, Product Eng, Motion, Landing Page | 12 | 12 | am-trades-00.png, am-trades-01.png, am-trades-02.png, am-trades-03.png, am-trades-04.png, am-trades-05.png, am-trades-06.png, am-trades-07.png, am-trades-08.png, am-trades-09.png, am-trades-10.png, am-trades-11.png |
| Boomtax | Fintech, B2B Saas, Landing Page | 4 | 0 | - |
| Breez | Voice Ai, B2B Saas, Landing Page, Branding | 5 | 0 | - |
| Chatsheet | Ai, B2B Saas, Landing Page | 5 | 0 | - |
| Clokora | Productivity, B2B, Branding, Product Ui/Ux, Product Eng | 7 | 6 | - |
| CopeCart | Fintech, B2B Saas, Product Ui/Ux | 10 | 10 | - |
| Defendlab | Cybersecurity, B2B Saas, Landing Page, Branding | 11 | 1 | - |
| Ecom Jobs | Ecommerce, B2C, Branding, Product Ui/Ux | 13 | 11 | - |
| Folk | Ai, B2C, Branding | 13 | 0 | - |
| Gopher | Crypto, Fintech, Landing Page, Branding | 9 | 0 | - |
| Hunt | Cybersecurity, B2B Saas, Landing Page | 5 | 0 | - |
| Lemon | Ai, B2C Saas, Product Ui/Ux, Landing Page | 10 | 8 | - |
| ListKit | Sales Tools, B2B Saas, Product Ui/Ux | 9 | 9 | - |
| Mobile First Company | Ai, B2B Saas, Landing Page, Branding | 9 | 0 | - |
| Opero Labs | Ai, B2B Saas, Landing Page, Branding | 6 | 0 | - |
| Opsis Partners | Professional Services, B2B, Landing Page, Branding | 9 | 2 | - |
| Ostium | Crypto, B2C, Website, Branding | 8 | 0 | - |
| Plunio | Video Tools, B2B, Branding, Product Ui/Ux | 6 | 5 | - |
| Rork | Ai, B2C Saas, Landing Page | 6 | 6 | rork-00.png, rork-01.png, rork-02.png, rork-03.png, rork-04.png, rork-05.png |
| RunInfra | Developer Tools, B2B Saas, Landing Page | 5 | 1 | - |
| SF Tensor | Developer Tools, B2B Saas, Product Ui/Ux | 4 | 4 | - |
| SideShift | Creator Economy, B2C, Mobile App Design, Product Ui/Ux | 14 | 8 | - |
| Stardust | Ai, B2B Saas, Landing Page, Launch Video | 9 | 1 | stardust-06.png |
| Supermetal | Data Infrastructure, B2B Saas, Landing Page, Branding | 9 | 0 | - |
| TxtCart | Ecommerce, B2B Saas, Website, Branding, Product Ui/Ux | 21 | 10 | - |
| UniOps | Cybersecurity, B2B, Website, Product Ui/Ux | 9 | 5 | - |
| Uplinq | Fintech, B2B Saas, Website, Branding | 18 | 0 | - |
| Volcano | Developer Tools, B2B Saas, Landing Page | 5 | 0 | - |
| ZeroLeaks | Cybersecurity, B2B Saas, Landing Page, Product Ui/Ux, Product Eng | 12 | 8 | - |