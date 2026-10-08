#!/usr/bin/env node
// Exact-size export (e.g. X post): node tools/shot.mjs <url|file> <out.png> [--w 1440] [--h 900] [--scale 2] [--wait 3200] [--full] [--reduced]
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const a = process.argv.slice(2);
const f = (n, d) => { const i = a.indexOf(`--${n}`); return i > -1 ? a[i + 1] : d; };
const [target, out] = a.filter((x, i) => !x.startsWith('--') && !(a[i - 1] || '').match(/^--(w|h|scale|wait)$/));
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(path.resolve(target)).href;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +f('w', 1440), height: +f('h', 900) }, deviceScaleFactor: +f('scale', 2), reducedMotion: a.includes('--reduced') ? 'reduce' : 'no-preference' });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(+f('wait', 3200));
await p.screenshot({ path: out, fullPage: a.includes('--full') });
await b.close();
console.log('saved', out);
