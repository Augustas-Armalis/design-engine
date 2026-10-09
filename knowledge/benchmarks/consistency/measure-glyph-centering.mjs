// Measures where each icon's ink sits relative to its own viewBox: bbox centre offset and mass-centroid offset.
// usage: node knowledge/benchmarks/consistency/measure-glyph-centering.mjs  (run from repo root; needs network + playwright)
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');

const LIBS = {
  lucide:   { base: 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/', ext: '.svg',
    names: { play:'play', 'chevron-right':'chevron-right', 'chevron-down':'chevron-down', plus:'plus', minus:'minus', x:'x', check:'check', 'arrow-right':'arrow-right', 'arrow-up-right':'arrow-up-right', search:'search', menu:'menu', send:'send', download:'download', info:'info', star:'star', heart:'heart', copy:'copy', 'external-link':'external-link', circle:'circle', square:'square' } },
  phosphor: { base: 'https://raw.githubusercontent.com/phosphor-icons/core/main/raw/regular/', ext: '.svg',
    names: { play:'play', 'chevron-right':'caret-right', 'chevron-down':'caret-down', plus:'plus', minus:'minus', x:'x', check:'check', 'arrow-right':'arrow-right', 'arrow-up-right':'arrow-up-right', search:'magnifying-glass', menu:'list', send:'paper-plane-tilt', download:'download-simple', info:'info', star:'star', heart:'heart', copy:'copy', 'external-link':'arrow-square-out', circle:'circle', square:'square' } },
  heroicons:{ base: 'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/src/24/outline/', ext: '.svg',
    names: { play:'play', 'chevron-right':'chevron-right', 'chevron-down':'chevron-down', plus:'plus', minus:'minus', x:'x-mark', check:'check', 'arrow-right':'arrow-right', 'arrow-up-right':'arrow-up-right', search:'magnifying-glass', menu:'bars-3', send:'paper-airplane', download:'arrow-down-tray', info:'information-circle', star:'star', heart:'heart', copy:'document-duplicate', 'external-link':'arrow-top-right-on-square' } },
  radix:    { base: 'https://raw.githubusercontent.com/radix-ui/icons/master/packages/radix-icons/icons/', ext: '.svg',
    names: { play:'play', 'chevron-right':'chevron-right', 'chevron-down':'chevron-down', plus:'plus', minus:'minus', x:'cross-2', check:'check', 'arrow-right':'arrow-right', 'arrow-up-right':'arrow-top-right', search:'magnifying-glass', menu:'hamburger-menu', send:'paper-plane', download:'download', info:'info-circled', star:'star', heart:'heart', copy:'copy', 'external-link':'external-link', circle:'circle', square:'square' } },
};

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<canvas id=c></canvas>');
const rows = [];
for (const [lib, cfg] of Object.entries(LIBS)) {
  for (const [key, file] of Object.entries(cfg.names)) {
    const res = await fetch(cfg.base + file + cfg.ext);
    if (!res.ok) { rows.push({ lib, key, file, error: res.status }); continue; }
    let svg = (await res.text()).replace(/currentColor/g, '#000');
    svg = svg.replace(/<rect[^>]*fill="none"[^>]*\/>/, ''); // phosphor bounding rect
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/); const VB = vb ? +vb[1] : 24;
    const out = await page.evaluate(async ({ svg, VB }) => {
      const S = 512; // raster size
      const s = svg.replace(/<svg([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, '')} width="${S}" height="${S}">`);
      const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
      await img.decode();
      const c = document.getElementById('c'); c.width = S; c.height = S; const x = c.getContext('2d'); x.clearRect(0, 0, S, S); x.drawImage(img, 0, 0, S, S);
      const d = x.getImageData(0, 0, S, S).data;
      let x0 = S, y0 = S, x1 = -1, y1 = -1, m = 0, mx = 0, my = 0;
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) { const a = d[(j * S + i) * 4 + 3]; if (a > 40) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; } m += a; mx += a * i; my += a * j; }
      const u = VB / S;
      return { bboxW: (x1 - x0 + 1) * u, bboxH: (y1 - y0 + 1) * u, bboxDx: ((x0 + x1 + 1) / 2 - S / 2) * u, bboxDy: ((y0 + y1 + 1) / 2 - S / 2) * u, massDx: (mx / m + 0.5 - S / 2) * u, massDy: (my / m + 0.5 - S / 2) * u };
    }, { svg, VB });
    rows.push({ lib, key, file, viewBox: VB, ...Object.fromEntries(Object.entries(out).map(([k, v]) => [k, +v.toFixed(3)])),
      // offsets expressed as % of the viewBox, and px at 16 and 24
      bboxDxPct: +(out.bboxDx / VB * 100).toFixed(2), bboxDyPct: +(out.bboxDy / VB * 100).toFixed(2), massDxPct: +(out.massDx / VB * 100).toFixed(2), massDyPct: +(out.massDy / VB * 100).toFixed(2), inkWPct: +(out.bboxW / VB * 100).toFixed(1), inkHPct: +(out.bboxH / VB * 100).toFixed(1) });
  }
}
await browser.close();
fs.writeFileSync(new URL('./glyph-centering.json', import.meta.url), JSON.stringify(rows, null, 1));
console.log('rows', rows.length);
