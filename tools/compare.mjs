#!/usr/bin/env node
// Compare our render with a reference image at the same zoom: side-by-side and 50% onion-skin overlay.
//   node tools/compare.mjs <url> <reference.png> <out-prefix> [--w 1440 --h 900 --scale 1 --wait 2500 --clip x,y,w,h]
// The reference is scaled to the render's width so both sit at one zoom. Founder rule: judge product UI next to a
// reference (Marcel, Rico, Attio) at the same zoom, never by eye alone.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const [url, ref, out, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
if (!url || !ref || !out) { console.error('usage: node tools/compare.mjs <url> <reference.png> <out-prefix> [--w --h --scale --wait --clip x,y,w,h]'); process.exit(2); }
const W = +flag('w', 1440), H = +flag('h', 900), S = +flag('scale', 1), wait = +flag('wait', 2500);
const clip = flag('clip') ? (([x, y, w, h]) => ({ x, y, width: w, height: h }))(flag('clip').split(',').map(Number)) : undefined;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: S });
await p.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
await p.waitForTimeout(wait);
const mine = await p.screenshot({ clip });
const uri = (buf, type = 'png') => `data:image/${type};base64,${buf.toString('base64')}`;
const refType = path.extname(ref).slice(1).replace('jpg', 'jpeg') || 'png';
const refUri = uri(fs.readFileSync(ref), refType), mineUri = uri(mine);
const cw = clip ? clip.width : W, ch = clip ? clip.height : H;

const q = await b.newPage({ viewport: { width: cw * 2 + 72, height: ch + 96 }, deviceScaleFactor: 1 });
const label = 'font:600 18px system-ui;color:#171717;margin:0 0 10px 2px';
await q.setContent(`<body style="margin:0;background:#e9e9e9;padding:24px;display:flex;gap:24px">
  <div><div style="${label}">Reference</div><img src="${refUri}" style="width:${cw}px;height:${ch}px;object-fit:cover;object-position:top left;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,.1)"></div>
  <div><div style="${label}">Ours</div><img src="${mineUri}" style="width:${cw}px;height:${ch}px;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,.1)"></div></body>`);
await q.waitForTimeout(300);
await q.screenshot({ path: `${out}-side.png` });

const o = await b.newPage({ viewport: { width: cw, height: ch }, deviceScaleFactor: 1 });
await o.setContent(`<body style="margin:0;position:relative;width:${cw}px;height:${ch}px;overflow:hidden">
  <img src="${refUri}" style="position:absolute;inset:0;width:${cw}px;height:${ch}px;object-fit:cover;object-position:top left">
  <img src="${mineUri}" style="position:absolute;inset:0;width:${cw}px;height:${ch}px;opacity:.5"></body>`);
await o.waitForTimeout(300);
await o.screenshot({ path: `${out}-overlay.png` });
await b.close();
console.log(`saved ${out}-side.png and ${out}-overlay.png`);
