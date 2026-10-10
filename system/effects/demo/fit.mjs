// Raster fit: which CSS `corner-shape: superellipse(K)` + border-radius matches a Figma-smoothed corner, how close
// Figma 60% is to Apple's continuous corner (UIBezierPath roundedRect, constants from PaintCode's reverse-engineering),
// and what plain border-radius best stands in for each (for shadows and fallbacks).
// usage: node --import ./system/effects/demo/react-resolve.mjs system/effects/demo/fit.mjs
// Writes system/effects/demo/fit.json. Renders in Playwright Chromium (corner-shape needs Chromium >= 139).
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSquirclePath } from '../squircle.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const R = 96, BOX = 400, CELL = 180, COLS = 24, DPR = 1;

// Apple continuous corner (top-left), distances from the vertex in units of R (PaintCode, "Code for iOS 7 rounded rectangles").
function applePath(r) {
  const P = (x, y) => `${(x * r).toFixed(4)} ${(y * r).toFixed(4)}`;
  return `M${P(1.52866483, 0)} C${P(1.08849323, 0)} ${P(0.86840689, 0)} ${P(0.66993427, 0.06549600)} L${P(0.63149399, 0.07491100)} ` +
    `C${P(0.37282392, 0.16905899)} ${P(0.16906013, 0.37282401)} ${P(0.07491176, 0.63149399)} L${P(0.06549600, 0.66993427)} ` +
    `C${P(0, 0.86840689)} ${P(0, 1.08849323)} ${P(0, 1.52866483)} L0 ${BOX} L${BOX} ${BOX} L${BOX} 0 Z`;
}

// Render a batch of cells on one page; return a coverage getter per cell index.
async function renderCells(browser, cells) {
  const rows = Math.ceil(cells.length / COLS);
  const html = `<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:#fff}.g{display:grid;grid-template-columns:repeat(${COLS},${CELL}px);grid-auto-rows:${CELL}px}.c{overflow:hidden;position:relative}.c>*{position:absolute;left:0;top:0;width:${BOX}px;height:${BOX}px;display:block}.b{background:#000}</style>
<div class=g>${cells.map(c => c.kind === 'svg'
    ? `<div class=c><svg viewBox="0 0 ${BOX} ${BOX}"><path d="${c.d}" fill="#000"/></svg></div>`
    : `<div class=c><div class=b style="border-radius:${c.r}px;corner-shape:superellipse(${c.k})"></div></div>`).join('')}</div>`;
  const page = await browser.newPage({ viewport: { width: COLS * CELL, height: rows * CELL }, deviceScaleFactor: DPR });
  await page.setContent(html);
  const supported = await page.evaluate(() => CSS.supports('corner-shape', 'superellipse(2)'));
  const png = PNG.sync.read(await page.screenshot({ fullPage: true }));
  await page.close();
  const cellPx = CELL * DPR, cache = new Map();
  const get = (i) => {
    if (cache.has(i)) return cache.get(i);
    const cx = (i % COLS) * cellPx, cy = Math.floor(i / COLS) * cellPx, out = new Float32Array(cellPx * cellPx);
    for (let y = 0; y < cellPx; y++) for (let x = 0; x < cellPx; x++) { const o = ((cy + y) * png.width + cx + x) * 4; out[y * cellPx + x] = 1 - png.data[o] / 255; }
    cache.set(i, out); return out;
  };
  return { get, supported };
}
const xorOf = (A, B) => { let s = 0; for (let j = 0; j < A.length; j++) s += Math.abs(A[j] - B[j]); return s / (DPR * DPR); }; // css px^2

const refDefs = {};
for (const s of [0, 0.2, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 1]) refDefs['figma' + s] = { kind: 'svg', d: getSquirclePath({ width: BOX, height: BOX, radius: R, smoothing: s }) };
refDefs.apple = { kind: 'svg', d: applePath(R) };
refDefs.framer15 = { kind: 'css', k: 1.5, r: R };
refDefs.css2 = { kind: 'css', k: 2, r: R };
refDefs.nat132 = { kind: 'css', k: 1.32, r: +(R * 1.2).toFixed(3) };

const browser = await chromium.launch();
// stage 1: references + coarse grid shared by all refs
const coarse = [];
for (let k = 1; k <= 2.6001; k += 0.1) for (let sc = 0.7; sc <= 2.2001; sc += 0.05) coarse.push({ k: +k.toFixed(2), sc: +sc.toFixed(3) });
const refKeys = Object.keys(refDefs);
const c1 = [...refKeys.map(k => refDefs[k]), ...coarse.map(g => ({ kind: 'css', k: g.k, r: +(R * g.sc).toFixed(3) }))];
const s1 = await renderCells(browser, c1);
const refInk = Object.fromEntries(refKeys.map((k, i) => [k, s1.get(i)]));
const coarseBest = (key, filter = () => true) => coarse.map((g, j) => ({ ...g, x: xorOf(refInk[key], s1.get(refKeys.length + j)) })).filter(filter).sort((a, b) => a.x - b.x)[0];
// stage 2: fine grid around each target's coarse optimum
const targets = ['figma0', 'figma0.2', 'figma0.4', 'figma0.6', 'figma0.8', 'figma1', 'apple'];
const fine = [];
for (const t of targets) {
  const b = coarseBest(t);
  for (let k = Math.max(1, b.k - 0.12); k <= b.k + 0.1201; k += 0.02) for (let sc = b.sc - 0.06; sc <= b.sc + 0.0601; sc += 0.01) fine.push({ t, k: +k.toFixed(2), sc: +sc.toFixed(3) });
}
for (const t of ['figma0', 'figma0.2', 'figma0.4', 'figma0.6', 'figma0.8', 'figma1', 'apple', 'framer15', 'css2']) for (let sc = 0.6; sc <= 2.2001; sc += 0.01) fine.push({ t: t + ':plain', k: 1, sc: +sc.toFixed(3) });
const s2 = await renderCells(browser, fine.map(g => ({ kind: 'css', k: g.k, r: +(R * g.sc).toFixed(3) })));
await browser.close();
const fineBest = (t) => { const r = fine.map((g, j) => ({ ...g, j })).filter(g => g.t === t).map(g => ({ k: g.k, scale: g.sc, xorPx2: +xorOf(refInk[t.split(':')[0]], s2.get(g.j)).toFixed(2) })).sort((a, b) => a.xorPx2 - b.xorPx2)[0]; return r; };

const result = { measured: new Date().toISOString(), radius: R, box: BOX, dpr: DPR, cssCornerShapeSupported: s1.supported,
  note: 'xorPx2 = summed |coverage difference| over a CELLxCELL css px window holding one corner; 0 = identical. For scale: a uniform 1px offset along one corner contour of this radius is about 2.6*R px^2.',
  native: [], plainRadius: [], apple: {}, framerCheck: {}, squircleKeyword: {} };
for (const s of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
  result.native.push({ smoothing: s, ...fineBest('figma' + s) });
  result.plainRadius.push({ smoothing: s, ...fineBest('figma' + s + ':plain'), sameRadiusXorPx2: +xorOf(refInk['figma' + s], refInk.figma0).toFixed(2) });
}
const sweep = [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8].map(s => ({ smoothing: s, xorPx2: +xorOf(refInk.apple, refInk['figma' + s]).toFixed(2) }));
result.apple = { vsFigmaAtSameRadius: sweep, bestFigmaSmoothing: sweep.slice().sort((a, b) => a.xorPx2 - b.xorPx2)[0], bestNative: fineBest('apple'), bestPlainRadius: fineBest('apple:plain'), vsPlainSameRadius: +xorOf(refInk.apple, refInk.figma0).toFixed(2) };
const fr = fineBest('framer15:plain');
result.framerCheck = { what: 'plain border-radius that best matches corner-shape: superellipse(1.5) at the same radius (Framer ships radius * 0.752 as its fallback)', bestScale: fr.scale, xorPx2: fr.xorPx2, framerFallbackScale: 0.752 };
const sq = fineBest('css2:plain');
result.squircleKeyword = { what: 'plain border-radius that best matches corner-shape: squircle (superellipse(2)) at the same radius', bestScale: sq.scale, xorPx2: sq.xorPx2 };
// Corner profile: how far the corner pulls in along the 45deg diagonal, and where the edge starts to bend
// (boundary 0.25px off the straight edge), both in px from the corner vertex. Column sums give a sub-pixel boundary.
const profile = (A) => {
  const n = CELL * DPR; let bend = 0, diag = 0;
  for (let x = n - 1; x >= 0; x--) { let col = 0; for (let y = 0; y < n; y++) col += A[y * n + x]; const yb = (n - col) / DPR; if (yb > 0.25) { bend = (x + 1) / DPR; break; } }
  for (let i = 0; i < n; i++) { if (A[i * n + i] >= 0.5) { const prev = i ? A[(i - 1) * n + i - 1] : 0; const t = i - 0.5 + (0.5 - prev) / Math.max(1e-6, A[i * n + i] - prev) + 0.5; diag = (t / DPR) * Math.SQRT2; break; } }
  return { bendStartPx: +bend.toFixed(1), bendStartR: +(bend / R).toFixed(3), diagDepthPx: +diag.toFixed(1), diagDepthR: +(diag / R).toFixed(3) };
};
result.profiles = {
  'border-radius R (circular)': profile(refInk.figma0),
  'figma smoothing 0.6 at R': profile(refInk['figma0.6']),
  'figma smoothing 1.0 at R': profile(refInk.figma1),
  'apple continuous (UIBezierPath) at R': profile(refInk.apple),
  'corner-shape superellipse(1.5) at R (Framer)': profile(refInk.framer15),
  'corner-shape squircle = superellipse(2) at R': profile(refInk.css2),
  'corner-shape superellipse(1.32) at 1.2R (fitted iOS match)': profile(refInk.nat132),
};
fs.writeFileSync(path.join(HERE, 'fit.json'), JSON.stringify(result, null, 1));
console.log(JSON.stringify(result, null, 1));
