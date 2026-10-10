# Larpo Engine V1

A design brain for Larpo-style work: SaaS and AI-SaaS marketing sites, heroes, landing pages and product UI.
You give it a brief in Claude Code; it designs, builds, measures, checks itself against everything the founders have
ever approved or rejected, and hands back 4K screenshots and 4K 60fps load-in videos.

```
Larpo Engine V1/
├── START-HERE.md      this file
├── setup.sh           one-time setup (engine + Reel)
├── engine/            the design brain: rules, knowledge, systems, kit, tools, every past build
└── reel/              Reel, the frame-exact load-in recorder (4K, 60/120 fps)
```

## 1. Set up (once, ~5 minutes)

You need macOS or Linux, **Node 22.18+** (`node -v`), Python 3, and [Claude Code](https://claude.com/claude-code).

```bash
cd "Larpo Engine V1"
./setup.sh
```

It installs the engine's render-and-check tools (Playwright + Chromium), a Python venv for the rule index,
and Reel (pnpm via corepack, its headless Chromium, ffmpeg comes bundled).

## 2. Generate something

Open Claude Code **inside `engine/`** (it reads `engine/CLAUDE.md`, the operating manual, automatically) and give a brief:

> Hero for an AI invoicing tool for freelancers. One action: start free. Dark.
> Split hero, product cut off on the right, live product story, light mode.
> Review this page against the engine and fix it: http://localhost:3000

What happens (you don't have to drive it):
1. It restates the brief, reads the founder's verdicts (`knowledge/founder/founder-taste.md` outranks everything) and the ledger of past accepts/rejects.
2. It picks a fresh combination from the **variety system** (button grammar, nav construction, type voice, radius ladder, dark palette) that recent builds have not used: `node tools/variety.mjs pick`.
3. It writes `work/<name>/DIRECTION.md`, scaffolds the build (`node tools/new_build.mjs <name> --system <slug>`), builds with the product-hero kit, runs the checker, looks at its own screenshots and fixes them.
4. It delivers screenshots and asks for your verdict.

Then **say accept or reject, with a reason in your own words**. That verdict is recorded and the engine changes because of it.
This loop is the whole point: every round of feedback becomes a written rule in `knowledge/founder/founder-taste.md`.

## 3. Screenshots and videos

```bash
cd engine
node tools/shot.mjs http://localhost:4326 work/my-hero/hero-4k.png --scale 2.6666667 --wait 6000   # 3840x2400 still
node tools/record.mjs http://localhost:4326 --name my-hero                                       # 4K 60fps load-in, 8 s, MP4
node tools/record.mjs http://localhost:4326 --name my-hero --fps 120 --duration 6 --preset prores4444   # editing master
node tools/record.mjs http://localhost:4326 --name my-hero --preset x                            # X/Twitter-ready MP4
```

Reel renders frame by frame on a virtual clock (no screen recording, no dropped frames). Every recording keeps a
lossless master in `work/<name>/reel-4k60/`, so you can re-export without re-rendering:
`cd ../reel && node apps/cli/bin/reel.js export <recording-dir> --preset gif --in 0.5 --to 4`.
Reel also has a web UI: `cd reel && corepack pnpm dev`, then open http://localhost:4300. See `reel/README.md`.

To preview any past build: `cd engine/work/<name>/app && npm install && npm run build && npx vite preview`.

## 3b. New in this package (2026-10-10)

- **Five deep studies** in `engine/knowledge/web/`: `logo-drawing.md` (how marks are drawn), `product-ui-deep.md` (premium app UI in numbers, the 11-point template audit), `bento.md` (layouts by claim count, 28 tile visuals), `section-anatomy.md` + `footers.md` (every marketing section, variants and frequencies), `effects-materials.md` (smooth corners, measured shadow tiers, textures).
- **Code you can drop in:** `system/effects/squircle.ts`, `shadows.css`, `textures.css`; `system/product-ui/tokens.json`; `system/sections/*.json`.
- **Logo tools:** `tools/logo_drawkit.cjs`, `tools/logo_curves.mjs`, `tools/logo_measure.mjs`, `tools/logo.mjs present`.
- **Reference build:** `work/halyard/` (dark, Marcel Kargul grid + Rico product window, full landing page, drawn logo in `work/halyard/brand/`).

## 4. What is inside `engine/`

| Path | What |
|---|---|
| `CLAUDE.md` | The operating manual Claude follows. Start here if you want to know how it thinks. |
| `docs/context/` | Context notes: what the engine is for, the quality bar, how the founder gives feedback. |
| `docs/coss-ui.md` | Rules for product apps built with coss ui (Base UI + Tailwind v4). |
| `knowledge/founder/` | Every founder verdict as a rule, plus how the founder gives feedback. Highest authority. |
| `knowledge/web/` | Studied research: product heroes, Rico/Kargul/Attio product UI, dark mode, buttons, navs, type voices, motion, bento, CSS craft. |
| `knowledge/benchmarks/` | Reference screenshots of the best sites, measured. |
| `system/systems/` | 18 house design systems (type, colour, radius, depth, motion), light + dark, contrast-checked. |
| `system/variety/` | The variety system: button grammars, nav grammars, type voices, dark palettes, specimens. |
| `system/kits/product-hero/` | The craft kit every hero starts from (motion tokens, frame, rolling numbers, reveals). |
| `ledger/` | Every accept/reject with the founder's words and a visual fingerprint (used to stop repetition). |
| `work/` | Every build so far (source + screenshots + videos): Kestrel, Ferry, Margin, Strata, and the V1 set. |
| `tools/` | `check.mjs` (render + measure + accessibility + consistency probes), `shot.mjs`, `record.mjs`, `compare.mjs` (side-by-side with a reference), `ledger.mjs`, `variety.mjs`, `new_build.mjs`, rule index tools. |

## 5. Ground rules (from the founders)

- The bar is the work they ship and love (Kaching, Capto, Kestrel), not the rulebook. Passing checks is not quality.
- Never invent proof: no fake customers, logos, testimonials or results presented as real. Sample data is labelled.
- Real icon sets only (Phosphor, Lucide) for icons. Logos are never freehand and never an icon glyph: draw them with the logo method (`system/logo/drawing-method.md`: concepts, a 30+ sketch sweep, 3-4 routes, one drawn contour, `node tools/logo.mjs present`), or use supplied artwork.
- Range is mandatory: no two builds in a row share a skeleton, button grammar, nav or type voice.
- Product UI must feel alive: it builds in on a stagger, numbers roll digit by digit, something real happens.
- Nothing gets published or sent anywhere from the engine.

Not included (on purpose): `node_modules` and the Python venv (setup reinstalls them), git history, raw web captures and
third-party source code that was only studied (licences), and multi-GB lossless video masters (the MP4s are included).
