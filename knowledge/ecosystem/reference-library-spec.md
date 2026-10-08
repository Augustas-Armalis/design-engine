---
source: engine-note (design spec; builds on tools/check.mjs, knowledge/web/teardown-measure.js, system/directions/axes.json)
chapter: Reference library spec - schema, capture tool, retrieval, legal guardrails
pages: n/a
topic_tags: [references, examples, capture, playwright, schema, retrieval, dealer, legal]
status: proposal
---

# Reference library: spec

Written 2026-10-08. Nothing here is built yet. Sources and their terms: `reference-sources.md` (read its section 0 first: three data classes A pointer / B own measurement / C gallery expression; only A and B are stored).

Goal: grow `examples/` from "293 book figures" to also hold **what excellent looks like in shipped SaaS/AI-SaaS sites**, as records the pipeline can retrieve by brief (type, mood, structure) and the checker can calibrate against.

## 1. Layout

```
examples/
  ui-pedia/<topic>/p-NNNN.jpg          existing book figures (unchanged)
  web/
    index.json                         built; compact search index (committed)
    queue.md                           candidate URLs, who picked them, status (committed)
    <slug>/
      record.json                      class A + B + annotation (committed, no images)
      assets/                          GITIGNORED: screenshots, crops, optional video, raw dumps
        desktop-fold.png  desktop-full.jpg  mobile-fold.png  mobile-full.jpg
        sec-01-hero.jpg ... sec-NN-<kind>.jpg
        motion/frames-*.jpg  scroll.webm   (only with --video)
        raw.json                       full measurement dump (palette clusters, fonts, network)
tools/
  capture.mjs                          URL -> record.json + assets
  refs.mjs                             build | find | coverage | purge | review | annotate
  lib/measure.mjs                      the in-page measure() extracted from check.mjs (shared)
knowledge/ecosystem/permissions.md     written replies from sites (date, who, scope)
```

Add to `.gitignore`: `examples/web/*/assets/`. Slug = lowercase registrable domain + optional path hint (`linear.app`, `stripe.com--pricing`). One record per (site, page) pair; revisits add `history[]` entries rather than new folders.

## 2. Record schema (`examples/web/<slug>/record.json`)

Enumerations reuse `system/directions/axes.json` ids so records line up with what the dealer deals. Section kinds reuse the ids in `knowledge/web/landing-page-anatomy.md` section 2A.

```jsonc
{
  "schema": 1,
  "id": "linear.app",
  "url": "https://linear.app/",
  "finalUrl": "https://linear.app/",
  "pageType": "home",                       // home | pricing | product | feature | about | funnel | docs | other
  "capturedAt": "2026-10-08T14:03:11Z",
  "tool": { "name": "capture.mjs", "version": "0.1.0", "playwright": "1.64.0", "ua": "...design-engine-study/0.1" },

  // ---- CLASS A: pointer + provenance ----
  "curation": {
    "source": "siteinspire",                // siteinspire | land-book | landing-gallery | saasframe | mobbin | refero | savee | founder | teardown | other
    "sourceRef": "https://www.siteinspire.com/websites/12345",   // pointer only
    "sourceId": "12345",
    "credit": "Studio X (designer named by the gallery)",
    "pickedBy": "augustas",                 // who decided this is worth studying
    "pickedAt": "2026-10-08"
  },
  "rights": {
    "robots": { "checked": true, "allowed": true, "ua": "design-engine-study", "at": "2026-10-08T14:02:58Z" },
    "tosNote": "public marketing page; private study only",
    "storage": "record-only; assets local+gitignored",
    "permissionRef": null                    // path/anchor in knowledge/ecosystem/permissions.md if someone replied
  },

  // ---- Classification (human or model-assisted; each field says who set it) ----
  "tags": {
    "productType": ["ai", "devtool"],        // dealer types: devtool|fintech|ai|creative|consumer|b2b (+ free tags: crm, analytics, auth, infra)
    "audience": "engineers and PMs",
    "stage": "growth",                        // seed | growth | scale | enterprise
    "heroClass": "product-proof",             // axes.hero_class
    "structure": "product-window-as-canvas",  // axes.structure
    "typeVoice": "neo-grotesque-large",       // axes.type_voice
    "paletteTemperature": "nocturnal-low-chroma", // axes.palette_temperature
    "ctaGrammar": "solid-conventional",       // axes.cta_grammar
    "navGrammar": "top-bar-conventional",     // axes.nav_grammar
    "motionSignature": "stagger-cascade",     // axes.motion_signature
    "proofArtifact": "workflow-ui",           // axes.proof_artifact
    "mood": ["precise", "calm", "dense", "technical"],   // free list, from a controlled vocabulary in refs.mjs
    "setBy": { "heroClass": "human", "structure": "claude-draft", "typeVoice": "heuristic", "motionSignature": "heuristic" }
  },

  // ---- CLASS B: own measurements (all numbers dated, desktop 1440 unless stated) ----
  "fingerprint": { /* identical shape to report.fingerprint in check.mjs so ledger.mjs similarity works unchanged */
    "h1": { "px": 64, "weight": "510", "lh": "64px", "ls": "-1.4px", "family": "Inter Variable", "text": "..." },
    "fonts": ["Inter Variable", "Berkeley Mono"],
    "accentHues": [255],
    "radii": [4, 8, 12, "pill"],
    "navHeight": 64, "contentWidth": 1200, "sectionPad": 96, "sectionCount": 9
  },
  "palette": {
    "colorSpace": "oklch",
    "bg":      { "oklch": "oklch(0.16 0.01 270)", "hex": "#0f1011", "areaPct": 61.2 },
    "surface": { "oklch": "oklch(0.21 0.01 270)", "hex": "#1a1b1e", "areaPct": 18.4 },
    "text":    { "oklch": "oklch(0.96 0.00 270)", "hex": "#f4f5f8", "weightPct": 70.1 },
    "muted":   { "oklch": "oklch(0.70 0.01 270)", "hex": "#9a9ca6", "weightPct": 21.0 },
    "accent":  { "oklch": "oklch(0.62 0.19 265)", "hex": "#5e6ad2", "areaPct": 0.8 },
    "clusters": [ { "oklch": "...", "hex": "...", "areaPct": 0.0, "role": "bg|surface|text|muted|accent|border|other" } ],
    "scheme": "dark",                        // light | dark | both (prefers-color-scheme probe)
    "meanChroma": 0.021, "accentCount": 1, "temperatureHint": "cool",
    "cssVars": { "--color-bg-primary": "#08090a" }   // only :root custom props whose names look like tokens, max 60
  },
  "type": {
    "roles": {
      "h1":   { "family": "Inter Variable", "rendered": "Inter", "isCustom": true, "px": 64, "weight": 510, "lh": 1.0, "lsEm": -0.022 },
      "h2":   { "...": "..." },
      "body": { "...": "..." },
      "button": { "...": "..." },
      "mono": { "...": "..." }
    },
    "faces": [ { "family": "Inter Variable", "weight": "100 900", "style": "normal", "host": "linear.app", "format": "woff2", "source": "self-hosted" } ],
    "source": ["self-hosted"],               // google | adobe | fontshare | self-hosted | foundry
    "catalogueMatch": [ { "family": "Inter", "catalogueId": "inter", "class": "neo-grotesque" } ],
    "scale": { "distinctSizes": 9, "h1ToBody": 4.0, "ratioHint": 1.25 }
  },
  "layout": {
    "grid": { "container": 1200, "columns": 12, "gutter": 24 },
    "sections": [
      {
        "i": 1, "kind": "hero", "anatomy": "2A.1", "y": 0, "h": 860,
        "bg": "oklch(0.16 0.01 270)", "headline": "<=80 chars, study-only>",
        "layoutHint": "2-col asymmetric; text left 45%, product window right bleeding off-canvas",
        "media": ["svg", "img"], "words": 38, "cta": ["primary", "secondary"],
        "crop": "assets/sec-01-hero.jpg"
      }
      // ... one per detected section (cap 16)
    ],
    "rhythm": { "paddingMedian": 96, "heights": [860, 640, 720] },
    "nav": { "height": 64, "sticky": true, "structure": "wordmark | 5 links | 2 actions", "pill": false }
  },
  "motion": {
    "static": { "keyframes": 14, "transitions": { "medianMs": 160, "easings": ["cubic-bezier(.25,.1,.25,1)"] }, "scrollDrivenCss": false, "viewTransitions": false, "startingStyle": false, "backdropFilter": 3, "sticky": 2 },
    "live": { "animationsAtLoad": 6, "ambientLoops": 1, "revealOnScroll": true, "pinnedSections": 0, "parallax": false, "cursorReactive": false, "videoAutoplay": 0 },
    "libs": ["framer-motion"],               // gsap, scrolltrigger, lenis, locomotive, three, lottie, rive, spline, framer-motion, motion
    "canvas": { "count": 0, "contexts": [] }, // 2d | webgl | webgl2 | webgpu
    "reducedMotionHonoured": true,           // probe: emulate reduce, compare animations count
    "signatureHint": "stagger-cascade",       // heuristic guess; tags.motionSignature is the decision
    "videoRef": null
  },
  "stack": {
    "framework": ["Next.js"], "builder": null, "css": ["Tailwind"], "hosting": ["Vercel"],
    "analytics": ["PostHog"], "cms": [], "motionLibs": ["framer-motion"],
    "evidence": ["x-vercel-id header", "/_next/ script", "--tw- custom props"]
  },
  "craft": {                                  // run the engine's own checker on the reference
    "summary": { "fail": 1, "warn": 4, "pass": 17 },
    "checks": { "color.contrast": "pass", "type.body-size": "pass", "ai.pill-nav": "pass" },
    "notes": "disagreements with our rules are data: see section 6"
  },

  // ---- Human-written annotation (the part that makes it a lesson, not a screenshot) ----
  "annotation": {
    "status": "draft",                        // captured | draft | reviewed | canon
    "by": "claude-draft",                     // human name when reviewed
    "reviewedAt": null,
    "whyItWorks": [
      { "claim": "One dominant element per viewport: the product window carries the hero.", "evidence": "layout.sections[0].media, fingerprint.h1.px=64", "kind": "structure" },
      { "claim": "Colour is nearly monochrome; the single accent appears only on the primary action.", "evidence": "palette.accentCount=1, palette.accent.areaPct=0.8", "kind": "colour" }
    ],
    "theOneRule": "Let the product window be the hero; the headline serves it.",   // maps to 'single rule taken from each' in DIRECTION.md
    "whatNotToCopy": "The 510 weight depends on Inter Variable; it falls apart with a static face.",
    "bestFor": ["devtool", "workflow-heavy product"],
    "avoidFor": ["consumer brand-led launches"],
    "caveats": "Cookie banner present at capture; copy changes weekly."
  },

  "history": [ { "capturedAt": "2026-10-08", "fingerprintHash": "sha1..." } ]
}
```

Validation (`refs.mjs build` fails on violation): `id`/`url` present; every `tags.*` axis value exists in `axes.json`; `annotation.status` in the enum; `reviewed|canon` requires non-empty `theOneRule` and at least two `whyItWorks` entries, each with `evidence`; `rights.robots.allowed === true`; no keys named `screenshot`, `image` or `html` outside `assets/` paths (guards against accidentally committing gallery expression).

Evidence rule for `whyItWorks`: every claim cites a measured field or a visible region, in the same style as `Check: visual | measurement` in `knowledge/SCHEMA.md`. A claim with no evidence is allowed only with `kind: "taste"` and is down-weighted.

## 3. Capture tool: `tools/capture.mjs`

CLI:

```
node tools/capture.mjs <url> [--slug x] [--page-type home|pricing|...]
        [--source siteinspire --source-ref <url> --source-id <id>] [--picked-by augustas]
        [--video] [--no-shots] [--out examples/web] [--force]
node tools/refs.mjs annotate <slug>      # model drafts annotation from crops + measurements, status=draft
node tools/refs.mjs review <slug>        # human sets reviewed|canon (writes by + reviewedAt)
```

One URL per invocation. No `--list` or `--crawl` flag exists, on purpose (see section 7). A batch of 5 is five commands issued by a human or by Claude with a human-approved queue.

### 3.1 Reuse of check.mjs

`check.mjs` has an in-page `measure(cfg)` that computes typography, contrast, spacing, radii, accent hues, nav height, content width, section padding, AI tells. Extract it unchanged to `tools/lib/measure.mjs` (`export const measure`, plus `export function fingerprintFrom(m)` that builds the object currently assembled at the end of the desktop loop). Both tools import it, so a reference record's `fingerprint` is byte-compatible with ledger entries and `ledger.mjs similar` can compare *references to our work*. Same viewports as `thresholds.json` (1440x900 and 390x844), same settle sequence (networkidle cap, `fonts.ready`, scroll in 0.8 viewport steps, finish finite animations, scroll to top).

### 3.2 Pipeline

```js
// tools/capture.mjs (pseudo-code; ESM, Node 20+, playwright 1.64)
import { chromium } from 'playwright';
import { measure, fingerprintFrom } from './lib/measure.mjs';
import { preflight, politeWait } from './lib/guard.mjs';          // robots + throttle + SSRF (section 7)
import { detectStack } from './lib/stack.mjs';
import { paletteFrom, toOklch } from './lib/color.mjs';           // inline OKLab maths, no dependency
import { segmentSections } from './lib/sections.mjs';
import { probeMotion } from './lib/motion.mjs';

const UA_TOKEN = 'design-engine-study/0.1 (private research; contact: <team email>)';

const url = parseArgs();
const g = await preflight(url);          // throws if: not http(s), private/loopback/link-local IP after DNS, robots.txt Disallow for UA token or '*', origin throttled
await politeWait(g.origin);              // >= 10 s since last capture on this origin (state in .capture-state.json)

const browser = await chromium.launch();
const net = { responses: [], fonts: [], thirdParty: new Set() };
const result = { viewports: {} };

for (const vp of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844, mobile: true }]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1,
    isMobile: !!vp.mobile, hasTouch: !!vp.mobile,
    userAgent: (await defaultUA(browser)) + ' ' + UA_TOKEN,    // honest suffix; do not spoof
    reducedMotion: 'no-preference', colorScheme: 'light',
  });
  await ctx.addInitScript(motionHooks);          // section 3.7: wrap Element.animate, HTMLCanvasElement.getContext, IntersectionObserver, rAF counters
  const page = await ctx.newPage();
  page.on('response', r => record(net, r));      // url, status, headers (server, x-powered-by, x-vercel-id, cf-ray...), resourceType, size
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await settle(page);                            // same routine as check.mjs
  result.finalUrl = page.url(); result.status = resp?.status();

  const m = await page.evaluate(measure, THRESHOLDS);        // existing measurement
  result.viewports[vp.name] = { m };

  if (vp.name === 'desktop') {
    result.palette  = await page.evaluate(collectColours);   // 3.4 (+ screenshot quantisation cross-check)
    result.type     = await collectType(page);               // 3.5 (uses CDP)
    result.sections = await page.evaluate(segmentSections);  // 3.6
    result.motion   = await probeMotion(page, ctx);          // 3.7
    result.stack    = await detectStack(page, net);          // 3.8
    result.schemeProbe = await probeColourScheme(browser, url);   // second context with colorScheme: 'dark'
    result.reducedProbe = await probeReducedMotion(browser, url); // third context with reducedMotion: 'reduce'
  }
  if (!flags.noShots) await shoot(page, vp, outAssets, result);  // 3.3
  await ctx.close();
}
await browser.close();

const record = assemble(result, flags);   // fills class A/B; annotation = { status: 'captured', whyItWorks: [], theOneRule: '' }
validate(record);
writeJsonAtomic(`${out}/${slug}/record.json`, record);
writeJson(`${out}/${slug}/assets/raw.json`, result.rawDump);
console.log(`captured ${slug}: ${record.layout.sections.length} sections, ${record.motion.libs.join(',') || 'no libs'}; needs annotation`);
```

### 3.3 Screenshots

- Fold (viewport) PNG and full-page JPEG (quality 80) at 1440 and 390. If `scrollHeight > 16000`, capture in 4000 px tiles and stitch in the page (canvas) rather than add an image dependency.
- Before capture: do not click consent banners (same as the teardown precedent), do not log in. If a cookie banner covers the fold, set `record.annotation.caveats` automatically from a detector (`[class*=cookie],[id*=cookie],[aria-label*=cookie]` fixed element covering >10% of the viewport).
- Per-section crops via `elementHandle.screenshot()` using the segmentation boxes (desktop; hero also at mobile), max 16.
- Freeze animations only after the settle routine has scrolled the page (so reveal-on-scroll content exists). `page.screenshot({ animations: 'disabled' })` on the final shot makes captures comparable.
- Everything lands in `assets/` (gitignored).

### 3.4 Palette extraction (OKLCH)

Two independent estimates, then reconcile.

1. **DOM, area-weighted.** In page: for each visible element with a non-transparent background colour (`getComputedStyle().backgroundColor`, parse via the canvas trick already in `check.mjs`), area = its rect clipped to the document minus the area of children that paint their own opaque background. Sum area by colour. For text, weight = characters x `fontSize^2`. Borders and shadows are collected separately with low weight.
2. **Pixels.** Draw the 1440 full-page JPEG downscaled to ~320 px wide into a canvas in a blank page (no new dependency) and run k-means (k=10) in OKLab, which catches gradients/images the DOM view treats as `unknown` (the same blind spot noted for contrast in `check.mjs`).

Convert sRGB -> OKLab -> OKLCH with the Ottosson matrices (about 15 lines, no library). Merge clusters closer than ΔE_ok 0.03. Role assignment:

| Role | Rule |
|---|---|
| `bg` | largest area colour with chroma < 0.04 (else largest overall) |
| `surface` | second-largest area, lightness within 0.02-0.12 of bg |
| `text` | highest text weight; `muted` = second text colour with L between text and bg |
| `accent` | highest `chroma x (areaPct + interactiveBoost)`; interactive colours (buttons, links) get a boost so a 0.8 percent CTA still wins |
| `border` | colour of 1 px borders by count |

Also output `scheme` (probe a second context with `colorScheme:'dark'`, compare body background lightness), `meanChroma`, `accentCount` (clusters with chroma > 0.08), and `temperatureHint` mapped to `palette_temperature` ids (e.g. neutrals hue 40-90 and bg L > 0.9 -> `paper-and-ink`; bg L < 0.2 and chroma < 0.03 -> `nocturnal-low-chroma`; mean chroma > 0.15 -> `high-chroma-signal`). The hint is `setBy: "heuristic"`; a human confirms.

Custom properties: walk `document.styleSheets` (try/catch per sheet, cross-origin sheets throw) and read `:root` / `html` / `[data-theme]` rules whose names match `/(color|bg|background|surface|text|border|accent|primary|radius|space|font)/i`, cap 60. Token names are a strong signal of the site's own system.

### 3.5 Font detection

Three layers, because `font-family` lists lie (fallbacks, unloaded faces).

1. **Computed per role.** For `h1`, first `h2`, a paragraph over 90 chars, the primary button, `code/pre`, nav link: family stack, size, weight, line-height, letter-spacing (same as `check.mjs` headline code).
2. **Actually rendered.** Open a CDP session (`ctx.newCDPSession(page)`), `DOM.getDocument` + `DOM.querySelector` for each role element, then `CSS.getPlatformFontsForNode({nodeId})`. It returns `familyName`, `isCustomFont`, `glyphCount`. This tells you "Inter" vs "Helvetica Neue (fallback)".
3. **Loaded faces + origin.** `await document.fonts.ready; [...document.fonts].filter(f => f.status === 'loaded')` for family/weight/style, matched to the font requests captured from `page.on('response')` (`resourceType === 'font'`) for the URL host and format. Classify source: `fonts.gstatic.com`/`fonts.googleapis.com` = google; `use.typekit.net`/`p.typekit.net` = adobe; `cdn.fontshare.com` = fontshare; same registrable domain = self-hosted; paid-foundry hosts (`fonts.net`, `cloud.typography.com`, `typography.com`) = foundry.

Then fuzzy-match each rendered family to `system/fonts/catalogue.json` (`id`, `class`, `personality`) and fill `type.catalogueMatch`; unmatched families become candidates for the catalogue (queued, not auto-added, and only if the Fontsource API reports an open licence). For commercial faces the record keeps the *name* and a free analogue suggestion; no files are stored.

### 3.6 Section segmentation

Heuristic first, model-assisted second.

```js
function segmentSections() {
  const vw = innerWidth;
  const root = pickRoot();                       // <main> else the descendant of body with >=4 block children and the largest height
  let nodes = [...root.children].filter(visible);
  nodes = nodes.flatMap(unwrapIfSingleChildSpansSameBox);   // descend through wrapper divs
  nodes = nodes.filter(n => rect(n).height >= 120 && rect(n).width >= vw * 0.8);
  nodes = mergeAdjacent(nodes, (a, b) => sameBg(a, b) && !hasHeading(b) && rect(b).height < 200);
  return nodes.slice(0, 16).map((n, i) => describe(n, i + 1));
}
function describe(n, i) {
  const r = rect(n), cs = getComputedStyle(n), t = n.innerText || '';
  const kind = classify(n, i);                    // below
  return { i, kind, anatomy: ANATOMY[kind], y: Math.round(r.top + scrollY), h: Math.round(r.height),
    bg: effectiveBg(n), headline: (n.querySelector('h1,h2,h3')?.innerText || '').slice(0, 80),
    layoutHint: layoutHint(n),                    // grid-template-columns count / flex children / media position left|right|bg
    media: mediaKinds(n), words: t.split(/\s+/).length, cta: ctaKinds(n) };
}
```

`classify` (first match wins; each rule is cheap DOM/regex, ids map to landing-page-anatomy 2A):

| kind | Rule |
|---|---|
| `nav` | `header, nav` fixed/sticky at top (excluded from sections, recorded under `layout.nav`) |
| `hero` | contains the `h1`, or is first section with y < 200 |
| `logo-strip` | height < 220 and >= 5 `img/svg` of similar height in a row, little text |
| `metrics` | >= 3 siblings whose leading text is number-like (`/^[\d.,$%+kKmMbB x]+$/`) at >= 28 px |
| `pricing` | >= 2 sibling cards containing `/(\$\|€\|£)\s?\d/` or "per month/mo/seat/user" |
| `faq` | >= 4 `details/summary` or `[aria-expanded]` items with `?` in text |
| `testimonial` | `blockquote`, or quote glyphs with person/title lines, avatars |
| `integrations` | grid of >= 8 small logos with labels |
| `security` | text matches `/SOC ?2\|GDPR\|ISO 27001\|HIPAA\|encrypt/i` |
| `feature-grid` | >= 3 repeated sibling cards each with heading + text (+ icon) |
| `product-proof` | large `img/video/canvas/svg` (>40% of section) with UI-like content or `figure` |
| `final-cta` | last section before footer, <= 60 words, has primary action |
| `footer` | `footer` element or last block with >= 8 links |
| `other` | else |

Model-assisted pass (in `refs.mjs annotate`): Claude reads the section crops and corrects `kind` where wrong, writing `setBy: "claude-draft"`. Human review confirms. Reason for the two stages: the heuristics will misclassify 15-25 percent of sections (unusual layouts), and the crops make corrections cheap.

### 3.7 Motion detection

Install hooks with `ctx.addInitScript` *before* navigation so pre-load behaviour is seen:

```js
// init script (runs in every frame before page scripts)
window.__cap = { animate: 0, canvases: [], rafCount: 0, io: 0, libs: new Set() };
const _anim = Element.prototype.animate;
Element.prototype.animate = function (...a) { __cap.animate++; return _anim.apply(this, a); };
const _gc = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function (type, ...a) { __cap.canvases.push(type); return _gc.call(this, type, ...a); };
const _IO = window.IntersectionObserver;
window.IntersectionObserver = class extends _IO { constructor(...a) { super(...a); __cap.io++; } };
const _raf = window.requestAnimationFrame;
window.requestAnimationFrame = function (cb) { __cap.rafCount++; return _raf.call(window, cb); };
```

Static pass (CSS): iterate stylesheets (try/catch cross-origin), counting `CSSKeyframesRule`, rules with `animation-timeline`, `scroll-timeline`, `view-timeline`, `@starting-style`, `view-transition-name`, `@view-transition`; histogram of `transition-duration` and `transition-timing-function` computed on interactive elements (feeds `motion-tokens.json` comparison); counts of `backdrop-filter`, `position: sticky`, `will-change`, `mix-blend-mode`.

Live pass (behavioural):

1. `document.getAnimations()` at load, and after each scroll step. Classify with `instanceof CSSAnimation | CSSTransition`, `effect.getComputedTiming().iterations === Infinity` for **ambient loops**, and `animation.timeline instanceof ScrollTimeline` (or `ViewTimeline`) for **scroll-driven CSS**.
2. **Reveal on scroll:** for the first 6 sections, read opacity/transform of the heading before and after scrolling it into view (a delta means a reveal); count of IntersectionObserver instances corroborates.
3. **Pinned / scrubbed:** scroll in 10 steps across a section taller than 1.5 viewports; if a descendant's `getBoundingClientRect().top` stays constant while `scrollY` changes by >1 viewport, mark `pinned`; if media `currentTime`/transform changes monotonically with scroll, mark `scrubbed` (the `scroll-scrubbed-product` signature).
4. **Parallax:** element rect velocity vs scroll velocity ratio not equal to 1 and not sticky.
5. **Cursor reactive:** hash the hero region (`element.screenshot` -> downscale), wait 1 s (baseline for ambient motion), move the mouse across 5 points, hash again; difference above the baseline noise = cursor-reactive.
6. **Canvas/WebGL:** from `__cap.canvases` (`2d | webgl | webgl2 | webgpu`) and `<canvas>` elements with area > 25 percent of the viewport.
7. **Video:** `video[autoplay]`, loops, muted, sources (mp4/webm host); also `lottie-player`, `.lottie`/`.json` Lottie fetches, `.riv` requests (Rive), `spline-viewer` or `prod.spline.design` (Spline).
8. **Reduced-motion honoured:** reload in a context with `reducedMotion: 'reduce'`, compare ambient-loop count and reveal deltas; fewer means honoured.
9. Optional `--video`: Playwright `recordVideo` of one slow scripted scroll, plus 6 frames per section transition. For private study of motion feel; large, gitignored.

Library signatures (from globals, class names, script URLs, requests): `window.gsap`, `ScrollTrigger`, `window.Lenis`/`.lenis` class, `.locomotive-scroll`, `window.THREE`/`three` chunk, `[data-framer-name]` plus `framerusercontent.com` (Framer), `data-wf-page` (Webflow), `motion`/`framer-motion` (data attrs `data-projection-id`), `window.lottie`/`bodymovin`, Rive `.riv`. Output `motion.libs[]`.

`signatureHint` mapping to `axes.motion_signature`: no animations + no libs = `still-with-craft`; ambient loops present = `ambient-loop`; pinned or scrubbed media = `scroll-scrubbed-product`; cursor delta = `cursor-reactive`; reveal on scroll with staggered delays (child delay increments in `animation-delay`/Web Animations timing) = `stagger-cascade`; split-text spans on the h1 with transforms = `type-reveal`; layoutId / FLIP-like size changes = `layout-morph`. A human decides.

### 3.8 Tech stack

Start with our own ~40 rules (tiny, auditable, no licence question), evaluated on headers, HTML, script URLs and globals:

| Signal | Detects |
|---|---|
| `x-vercel-id`, `server: Vercel` | Vercel hosting |
| `cf-ray`, `server: cloudflare` | Cloudflare |
| `x-nf-request-id` | Netlify |
| `/_next/`, `#__next`, `__NEXT_DATA__`, `self.__next_f` | Next.js |
| `/_nuxt/`, `__NUXT__` | Nuxt |
| `/_astro/`, `astro-island` | Astro |
| `framerusercontent.com`, `data-framer-*` | Framer |
| `data-wf-page`, `assets.website-files.com` | Webflow |
| `wp-content`, `generator=WordPress` | WordPress |
| `--tw-` custom properties in computed styles or dominant utility classnames | Tailwind |
| `data-radix-*` | Radix UI |
| `data-base-ui`, `[data-base-ui-*]` | Base UI |
| `gtag`, `posthog`, `segment`, `plausible` scripts | analytics |
| `meta[name=generator]` | CMS/builder |

Optional later: load the community Wappalyzer fingerprint set (the `enthec/webappanalyzer` fork, which continued the project after it went private in Aug 2023; its licence needs a check because upstream was GPL-3.0 [secondary]) as a local JSON data file for private use; never call the hosted Wappalyzer API. Evidence strings are stored with each hit (`stack.evidence`) so a human can audit.

### 3.9 Craft cross-check

Run the existing evaluation on the reference (`evaluate(m, vp, axe)` from `check.mjs`, also moved to `lib/`). Store only pass/warn/fail counts and per-check status. This gives two things: (1) a sanity test of our checker on admired work; (2) threshold calibration: if >= 70 percent of reviewed references fail a rule (e.g. 12 px minimum text, 24 px targets, h1 count), the rule is mis-tuned or the references justify an override. Log disagreements to `knowledge/ecosystem/threshold-disagreements.md` and decide per rule; never auto-edit `thresholds.json`.

### 3.10 Annotation slot

`capture.mjs` ends with `annotation.status: "captured"` and prints the next step. Two ways to fill it:

- **Human:** edit `record.json` or run `refs.mjs annotate <slug> --interactive` (prompts: why it works x3 with evidence field names, the one rule, what not to copy, best/avoid for).
- **Model-drafted, human-reviewed:** `refs.mjs annotate <slug>` assembles a prompt from the crops, the measurements and the checklist in `CLAUDE.md` (focal point, rhythm, type, colour, "could another company reuse this skeleton by swapping the logo?"). Claude writes a draft with `by: "claude-draft"`, `status: "draft"`. Retrieval ignores drafts by default. `refs.mjs review <slug>` records the founder's decision (`reviewed` or `canon`, or `reject` = delete record). An accepted draft counts as reviewed only when someone with taste said so; same rule as the ledger ("never invent verdicts").

Quality bar: a reviewed record has at least two evidence-linked reasons and one transferable rule. `canon` is reserved for references the founders say they want the engine to emulate.

## 4. `tools/refs.mjs` commands

```
refs.mjs build                      # validate all records, write examples/web/index.json
refs.mjs find --brief work/<name>/brief.json [--section hero] [--n 3] [--include-drafts]
refs.mjs find --type ai --mood calm,technical --structure left-rail --section pricing
refs.mjs coverage                   # matrix: axes x productType, shows empty cells => what to capture next
refs.mjs similar <slug|reports/name>   # nearest references to a fingerprint (reuses ledger axes + colour distance)
refs.mjs annotate|review|purge <slug|host>
```

`index.json` holds per-record: id, url, curation.source, tags, fingerprint, palette summary (bg/accent OKLCH), section kinds list, motion signature + libs, stack framework, annotation status, one-line `theOneRule`, and a short BM25 text field (`whyItWorks.claim` + `bestFor` + `mood`). It is small (about 3 KB per record), so 1,000 records is about 3 MB and loads instantly.

## 5. Retrieval: how the dealer and pipeline use it

### 5.1 Brief profile

Pipeline step 1 ("Understand") already produces a one-line restatement. Add a structured side file `work/<name>/brief.json` written by Claude at that step:

```json
{ "productType": ["ai", "devtool"], "audience": "backend engineers", "oneAction": "install the CLI",
  "mood": ["precise", "calm"], "heroClassCandidates": ["product-proof", "interactive-utility"],
  "needSections": ["hero", "pricing", "feature-grid"], "constraints": ["dark-first"], "avoid": ["pill-nav"] }
```

### 5.2 Scoring (deterministic, so a run is reproducible like `deal.mjs --seed`)

For each record `r` with `annotation.status ∈ {reviewed, canon}` (drafts only with the flag):

```
score = 3.0 * axisMatch(r.tags.structure, wantStructure)
      + 2.0 * axisMatch(r.tags.heroClass, wantHeroClass)
      + 2.0 * overlap(r.tags.productType, brief.productType)
      + 1.5 * jaccard(r.tags.mood, brief.mood)
      + 3.0 * (sectionWanted && r.layout.sections.some(s => s.kind === sectionWanted))
      + 1.0 * bm25(index.text, brief.oneAction + brief.audience)
      + 2.0 * (r.annotation.status === 'canon') + 1.0 * (r.annotation.status === 'reviewed')
      + 1.0 * founderPicked(r)                       // curation.pickedBy is a founder
      - 2.0 * staleness(r.capturedAt)                // linear 0..1 over 18 months
      - 4.0 * recentCollision(r, ledger.last(8))     // see below
      - 3.0 * avoidHit(r, brief.avoid)
```

`recentCollision` uses the same `axes` collapse function as `ledger.mjs` (headline size, headline font, body font, nav height, content width, section rhythm, radius system, accent hue). A reference that collapses on >= 4 axes with recent work is penalised: the engine's recurring failure is sameness, and a perfect-match reference that looks like last week's reject would pull the build back there. Reject ledger entries add a negative signal: if a `why` mentions a reference's id or its structure tag, subtract further.

Take the top results with **maximal marginal relevance** (`λ = 0.7`): no two results from the same studio, builder or framework unless the brief demands it, and at most one `canon` per tag combination. Return, for each: record path, crops (`sec-NN`), `theOneRule`, `whatNotToCopy`, `why_matched` (which terms scored).

### 5.3 Where it plugs into the existing pipeline

| Step | Change |
|---|---|
| 2 Load context | `refs.mjs find --brief ... --n 6` printed next to the ledger summary. |
| `deal.mjs` | After dealing axes for each candidate, call `find` with that candidate's axes as the wanted tags to attach a **reference triad**: structural (by `structure` + `hero_class`), type/identity (by `type_voice` + `palette_temperature`), proof/motion (by `proof_artifact` + `motion_signature`). Output goes into `direction.json` as `references: [{role, id, theOneRule}]`. This directly feeds DIRECTION.md's "reference triad: single rule taken from each". |
| 3 DIRECTION.md | Triad entries must cite record ids and the rule taken. Lint: a DIRECTION.md whose triad names none of the library records, or only one source, gets a warning. |
| 5 Check | `refs.mjs similar reports/<name>` shows the nearest 3 references to the finished build, as a sanity check: "too close to one reference" (copying) is a failure; "nothing close to any reference of that type" means check that we are not off-category. |
| Design-time lookups | When the library has no good analogue (coverage gap), query Mobbin/Refero/Landing Gallery live, choose one, then `capture.mjs` its **original URL** and annotate; the gallery content itself is never stored. |

### 5.4 Calibration and learning

- `refs.mjs coverage` lists empty cells (e.g. "ai x pricing x light" has 0). The weekly queue is driven by those.
- Founder verdicts in the ledger update reference weights: accepted builds record which reference ids their DIRECTION.md used; references whose triad slots appear in accepted work get `+0.5` per accept (cap 2), those in rejects `-0.5` (cap -2). Stored in `index.json` as `usage`, so scores stay explainable.
- Later (optional): replace BM25 with local embeddings of annotation text. Not needed below ~2,000 records.

## 6. Using references to tune the engine (beyond retrieval)

- **Population medians.** With 100+ reviewed references, compute medians/ranges per page type (h1 size, section padding, nav height, radius sets, accent count) and compare with `knowledge/web/teardown-synthesis.md`. Replaces hand-made tables by measured ones.
- **Rule disagreement log** (3.9): where excellent work breaks our rules, either the rule is wrong or an override pattern is worth documenting.
- **Style atlas**: `type.catalogueMatch` + `palette.temperatureHint` per record gives usage frequency per font/palette family; shows what is overused (feed the `overuse` field in the font catalogue).
- **Negative examples**: rejected builds from the ledger can sit next to the closest reference ("same skeleton, why worse") as good/bad pairs, matching the structure of `examples/ui-pedia`.

## 7. Legal and ethical guardrails (enforced in code where possible)

| # | Guardrail | Enforcement |
|---|---|---|
| 1 | **Private study, no republishing.** Assets are local and gitignored; records contain facts and our words. Never publish, share externally, or put references in client deliverables. | `.gitignore` entry; `refs.mjs build` rejects image/HTML keys in `record.json`; `CLAUDE.md` Hard Stops already forbid publishing. |
| 2 | **Respect robots.txt.** Fetch `/robots.txt` for the origin, evaluate the target path for UA `design-engine-study` then `*`. Disallow = abort; no override flag. Cache for 24 h. | `lib/guard.mjs`; `rights.robots` stored in the record. |
| 3 | **Respect ToS and machine-readable opt-outs.** Skip sites whose ToS forbids automated access if the owner has said so (a `permissions.md` "denied" entry blocks the host). Do not capture pages behind login, paywall, or bot challenge. | Host denylist in `knowledge/ecosystem/permissions.md` read by guard; challenge detector (Cloudflare "Just a moment", "Attention Required", captcha iframes) aborts and logs, never retries or bypasses. |
| 4 | **Rate limits.** One URL per invocation, >= 10 s between captures on the same origin, max 2 page loads per viewport (plus 2 probe reloads), global cap 30 captures per day. No parallel contexts to one origin. | `politeWait`, `.capture-state.json` counters. |
| 5 | **Identify honestly.** Append `design-engine-study/0.1 (private research; contact ...)` to the UA; no UA spoofing, no proxies, no stealth plugins. Mobbin's terms, for instance, ask automated tools to use a descriptive UA. A site that blocks the honest UA is a site we leave alone. | Context options. |
| 6 | **No scraping of galleries.** Gallery pages are visited by humans or through their sanctioned API/MCP/RSS. `capture.mjs` refuses gallery hosts as targets (denylist: siteinspire, land-book, landing.gallery, saasframe, mobbin, refero, savee, pageflows, awwwards, cssdesignawards, lapa.ninja, muz.li, godly, recent.design, dribbble, behance). It only captures the *original* site. | `lib/guard.mjs` host check. |
| 7 | **Data class discipline** (reference-sources.md section 0): store pointers + own measurements; live-lookup gallery content; never store Mobbin/Refero/Savee payloads; Savee cache <= 24 h. | `curation.source` in `{mobbin, refero, savee}` records may hold only `sourceRef` and our annotation. Validator checks no `assets/` crop was derived from them (no `fromGallery` flag allowed). |
| 8 | **Not for training or evals.** The library is retrieval context for a model at design time. It is not fine-tuning data. Gallery content (and thereby gallery-derived picks) must not enter `evals/`. | Documented in `evals/` README; `refs.mjs build` rejects `examples/web` paths referenced from `evals/prompts.json`. |
| 9 | **Credit and provenance.** Every record keeps source gallery, ID, designer/studio credit where given, capture date and tool version. Siteinspire index use requires attribution; Land-book asks for credit; Mobbin asks to preserve product name and URL. | Required `curation` fields; `refs.mjs find` prints credit lines. |
| 10 | **Copy is not ours.** `headline` stored for structure study only (<= 80 chars); build outputs run through the existing banned-phrase and similarity checks; never reuse a reference's copy, brand, illustration or code. Open-source reference code: respect licence (AGPL = study only). | Records mark `headline` as study-only; `check.mjs` already refuses invented proof. |
| 11 | **Takedown and deletion.** `refs.mjs purge <host>` deletes `examples/web/<slug>` (record + assets), removes it from `index.json`, appends the host to the denylist if the owner asks. Honour any request within a day. | CLI. |
| 12 | **Ask when in doubt.** For anything that would store gallery expression, change from private use to sharing, or touch a gated source: email the owner, store the reply in `permissions.md`, then proceed within its scope. | Process; `rights.permissionRef`. |
| 13 | **Jurisdiction.** EU DSM Directive art. 4 TDM allows commercial analysis unless the rights holder opts out in a machine-readable way; US fair use is fact-specific; both leave contract (ToS) claims open. Have counsel review before sharing the library outside the team or using it to train. | This note. |

### permissions.md format

```
## 2026-10-08 siteinspire.com
asked: "Can we keep an internal list of site URLs + categories from your MCP for design study?"
replied by: <name>, <date>
scope: ...
allowed: yes|no|conditional
```

## 8. Build plan

| Step | Work | Size |
|---|---|---|
| 1 | Extract `measure()`/`fingerprintFrom()`/`evaluate()` from `check.mjs` to `tools/lib/`; keep `check.mjs` passing | small |
| 2 | `lib/guard.mjs` (robots, SSRF, throttle, gallery denylist, challenge detector) with unit tests (local fixtures only) | small |
| 3 | `capture.mjs` screenshots + fingerprint + type + palette; run on 3 known sites; compare to `teardowns.md` numbers | medium |
| 4 | Sections + motion + stack; run on 5 sites with known traits (Linear = still/craft, Stripe = scroll-driven, Lusion = WebGL, a Framer site, a Webflow site) as a detection test set | medium |
| 5 | `refs.mjs build/find/coverage` + schema validator | small |
| 6 | Backfill 38 teardown sites; Augustas reviews 10 first (30 minutes) | one evening |
| 7 | Wire into `deal.mjs` (triad) and CLAUDE.md step 2/3; re-run eval `t1` and compare | small |
| 8 | Add queue intake from Land-book RSS / Siteinspire API / Landing Gallery MCP into `queue.md` (pointers only) | small |

Acceptance tests for the capture tool (all against local fixtures, no network): robots disallow aborts; private IP aborts; gallery host refused; challenge page detected; fingerprint equals what `check.mjs` reports for the same HTML; palette of a synthetic page with two known colours recovers them within ΔE_ok 0.02; motion probe detects a CSS infinite animation, a scroll-driven `animation-timeline`, a `<canvas>` WebGL context, and a pinned `position: sticky` section from purpose-built fixtures.

## 9. Open questions

- Is Larpo's internal use "non-commercial research" for Siteinspire's index-data clause? (Ask; until answered, store pointers only.)
- Do founders want videos (`--video`) kept at all? Large, but they capture motion feel better than any flag.
- Which controlled `mood` vocabulary? Proposal: derive 24-30 terms from `knowledge/web/creative-direction.md` and the dealer's axis notes so tags stay consistent.
- Mobile as its own composition: should section crops be captured at 390 for every section, or hero only? Default is hero only; revisit after the first 20 records.
