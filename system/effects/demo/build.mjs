// Builds system/effects/demo/squircle.html from the real <Squircle> component (server-rendered with fixed sizes) and
// renders it with Playwright to squircle-compare.png (DPR 2). Also renders shadows/textures specimens if present.
// usage: node --import ./system/effects/demo/react-resolve.mjs system/effects/demo/build.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Squircle, getSquirclePath, nativeCornerFor } from '../squircle.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const h = React.createElement;
const ring = { width: 1, color: 'rgb(16 18 24 / .08)' };
const shadow = '0 1px 2px rgb(16 18 24 / .06), 0 8px 24px -8px rgb(16 18 24 / .14)';
const sizes = [
  { label: 'Icon tile 64 x 64, R 14', w: 64, h: 64, r: 14 },
  { label: 'Card 240 x 150, R 24', w: 240, h: 150, r: 24 },
  { label: 'Hero frame 440 x 270, R 48', w: 440, h: 270, r: 48 },
];
const rows = [
  { key: 'radius', title: 'border-radius: R', note: 'circular arc; curvature jumps 0 -> 1/R where edge meets arc' },
  { key: 'svg', title: '<Squircle smoothing={0.6}> (svg clip-path)', note: 'Figma 60% = iOS; same apex, longer run-in' },
  { key: 'native', title: 'corner-shape: superellipse(1.32) at 1.2R', note: 'native fit to Figma 60% / Apple (fit.json)' },
  { key: 'keyword', title: 'corner-shape: squircle at R (common mistake)', note: 'K=2 is far squarer than iOS: reads like R x 0.6' },
];
const tile = (row, s) => {
  if (row === 'svg') return h(Squircle, { width: s.w, height: s.h, radius: s.r, smoothing: 0.6, mode: 'svg', fill: '#fff', ring, shadow });
  if (row === 'native') { const n = nativeCornerFor(s.r, 0.6); return h('div', { style: { width: s.w, height: s.h, background: '#fff', borderRadius: n.radius, cornerShape: n.cornerShape, boxShadow: `0 0 0 1px ${ring.color}, ${shadow}` } }); }
  if (row === 'keyword') return h('div', { style: { width: s.w, height: s.h, background: '#fff', borderRadius: s.r, cornerShape: 'squircle', boxShadow: `0 0 0 1px ${ring.color}, ${shadow}` } });
  return h('div', { style: { width: s.w, height: s.h, background: '#fff', borderRadius: s.r, boxShadow: `0 0 0 1px ${ring.color}, ${shadow}` } });
};

// Corner overlay: the four outlines of one 96px corner, magnified 4x.
const R = 96, B = 260;
const circle = getSquirclePath({ width: B, height: B, radius: R, smoothing: 0 });
const fig60 = getSquirclePath({ width: B, height: B, radius: R, smoothing: 0.6 });
const P = (x, y) => `${(x * R).toFixed(3)} ${(y * R).toFixed(3)}`;
const apple = `M${P(1.52866483, 0)} C${P(1.08849323, 0)} ${P(0.86840689, 0)} ${P(0.66993427, 0.065496)} L${P(0.63149399, 0.074911)} C${P(0.37282392, 0.16905899)} ${P(0.16906013, 0.37282401)} ${P(0.07491176, 0.63149399)} L${P(0.065496, 0.66993427)} C${P(0, 0.86840689)} ${P(0, 1.08849323)} ${P(0, 1.52866483)} L0 ${B} L${B} ${B} L${B} 0 Z`;
const overlay = h('div', { className: 'ov' },
  h('div', { className: 'ovbox' },
    h('div', { className: 'cs', style: { borderRadius: R, cornerShape: 'squircle' } }),
    h('svg', { viewBox: '0 0 112 112', width: 450, height: 450, style: { position: 'absolute', inset: 0, overflow: 'visible' } },
      h('path', { d: circle, fill: 'none', stroke: '#d4453b', strokeWidth: 0.6 }),
      h('path', { d: apple, fill: 'none', stroke: '#111', strokeWidth: 1.6, strokeOpacity: 0.25 }),
      h('path', { d: fig60, fill: 'none', stroke: '#2563eb', strokeWidth: 0.6 }),
      h('line', { x1: 0, y1: 0, x2: 112, y2: 112, stroke: '#999', strokeWidth: 0.3, strokeDasharray: '2 2' }),
      [R * 0.948, R * 1.167].map((x, i) => h('line', { key: i, x1: x, y1: -3, x2: x, y2: 3, stroke: i ? '#2563eb' : '#d4453b', strokeWidth: 0.6 })))),
  h('ul', { className: 'legend' },
    h('li', null, h('i', { style: { background: '#d4453b' } }), 'border-radius 96 (bends at 0.95R)'),
    h('li', null, h('i', { style: { background: '#2563eb' } }), 'Figma smoothing 60% (bends at 1.17R, same apex)'),
    h('li', null, h('i', { style: { background: '#bbb' } }), 'Apple continuous corner, UIBezierPath (bends at 1.12R)'),
    h('li', null, h('i', { style: { background: '#e9e9ee', border: '1px solid #ccc' } }), 'grey fill: corner-shape: squircle at 96 (apex 0.23R: too square)')));

const body = h('main', null,
  h('header', null, h('h1', null, 'Squircle vs border-radius'), h('p', null, 'Same fill, 1px ring and two-layer shadow on every tile. Chromium ', '{CHROMIUM}', ', DPR 2.')),
  h('div', { className: 'grid' },
    h('div', null), ...sizes.map(s => h('div', { key: s.label, className: 'colh' }, s.label)),
    ...rows.flatMap(r => [h('div', { key: r.key + 'h', className: 'rowh' }, h('b', null, r.title), h('span', null, r.note)), ...sizes.map(s => h('div', { key: r.key + s.w, className: 'cell' }, tile(r.key, s)))])),
  overlay);

const css = `*{box-sizing:border-box}html,body{margin:0;background:#f4f4f5;color:#18181b;font:13px/1.45 -apple-system,BlinkMacSystemFont,"Inter","Segoe UI",sans-serif}
main{padding:40px 48px 48px;width:1440px}header h1{font-size:22px;font-weight:550;letter-spacing:-.02em;margin:0 0 4px}header p{margin:0 0 28px;color:#71717a}
.grid{display:grid;grid-template-columns:240px 160px 320px 520px;column-gap:24px;row-gap:28px;align-items:center}
.colh{font-weight:550;color:#3f3f46}.rowh b{display:block;font-weight:550;font-size:13px}.rowh span{color:#71717a;font-size:12px}
.cell{display:flex;align-items:center;min-height:120px}.ov{display:flex;gap:40px;align-items:flex-start;margin-top:44px;padding-top:28px;border-top:1px solid #e4e4e7}
.ovbox{position:relative;width:450px;height:450px;overflow:hidden;background:#fff;border:1px solid #e4e4e7;border-radius:12px}
.cs{position:absolute;left:0;top:0;width:780px;height:780px;background:#ececf1}
.legend{list-style:none;margin:0;padding:0;display:grid;gap:10px}.legend li{display:flex;gap:10px;align-items:center}.legend i{display:inline-block;width:22px;height:4px;border-radius:2px}`;
// the overlay svg draws a 112x112 user-space window at 4x; the grey corner-shape box must be scaled to match
const cssFix = `.cs{transform:scale(4.0179);transform-origin:0 0;width:260px;height:260px}`;

const browser = await chromium.launch();
const version = browser.version();
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1440"><title>Squircle demo</title><style>${css}${cssFix}</style></head><body>${renderToStaticMarkup(body).replace('{CHROMIUM}', version)}</body></html>`;
fs.writeFileSync(path.join(HERE, 'squircle.html'), html);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(HERE, 'squircle.html')).href);
await page.screenshot({ path: path.join(HERE, 'squircle-compare.png'), fullPage: true });
for (const f of ['shadows.html', 'textures.html']) {
  if (!fs.existsSync(path.join(HERE, f))) continue;
  await page.goto(pathToFileURL(path.join(HERE, f)).href);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(HERE, f.replace('.html', '.png')), fullPage: true });
}
await browser.close();
console.log('wrote squircle.html + squircle-compare.png', version);
