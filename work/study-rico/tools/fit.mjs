#!/usr/bin/env node
// Solve for font-size/weight/tracking given measured ink widths in a reference image.
//   node fit.mjs <scale> "<text>|<inkWidthPx>|<inkCapPx?>" ...
// For each string prints the ink width (actualBoundingBox) of Inter at sizes 11-26, weights 400/500/600, tracking 0/-0.15/-0.31,
// and the best matches for ref inkWidth/scale.
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const scale = Number(process.argv[2]);
const items = process.argv.slice(3).map((s) => { const [t, w] = s.split('|'); return { t, w: Number(w) / scale }; });
const font = path.join(here, '../app/node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const b = await chromium.launch(); const p = await b.newPage();
await p.setContent(`<style>@font-face{font-family:I;src:url(data:font/woff2;base64,${fs.readFileSync(font).toString('base64')}) format('woff2');font-weight:100 900}</style><div style="font-family:I">x</div>`);
await p.evaluate(() => document.fonts.ready);
const res = await p.evaluate(async (items) => {
  await document.fonts.load('500 16px I'); if(!document.fonts.check('500 16px I')) return [{t:'FONT NOT LOADED',target:0,best:''}];
  const c = document.createElement('canvas').getContext('2d'); const out = [];
  for (const it of items) {
    const cands = [];
    for (let size = 10; size <= 28; size += 0.5) for (const wt of [400, 500, 600]) for (const ls of [0, -0.15, -0.31, -0.5]) {
      c.font = `${wt} ${size}px I`; c.letterSpacing = `${ls}px`;
      const m = c.measureText(it.t); const ink = m.actualBoundingBoxRight + m.actualBoundingBoxLeft;
      cands.push({ size, wt, ls, ink: +ink.toFixed(2), err: Math.abs(ink - it.w) });
    }
    cands.sort((a, b) => a.err - b.err);
    out.push({ t: it.t, target: +it.w.toFixed(2), best: cands.slice(0, 8).map((x) => `${x.size}/${x.wt}/${x.ls}=${x.ink}`).join('  ') });
  }
  return out;
}, items);
for (const r of res) console.log(`${r.t} -> ${r.target}\n   ${r.best}`);
await b.close();
