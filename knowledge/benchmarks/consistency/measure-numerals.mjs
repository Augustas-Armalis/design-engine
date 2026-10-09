// Do public product/marketing pages set tabular numerals on numeric text? usage: node measure-numerals.mjs <slug> <url>
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const [slug, url] = process.argv.slice(2);
setTimeout(() => { console.log('TIMEOUT', slug); process.exit(2); }, 100000);
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }); } catch {}
await p.waitForTimeout(4000);
const r = await p.evaluate(() => {
  const out = { numeric: 0, tabular: 0, samples: [], fonts: {} };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (!/^[$€£]?\s?\d[\d,.\s]*(%|k|M|x|ms|s)?$/.test(t) || t.length < 2) continue; const el = n.parentElement; const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    out.numeric++; const fvn = cs.fontVariantNumeric, ffs = cs.fontFeatureSettings; const tab = /tabular/.test(fvn) || /tnum/.test(ffs) || /mono|courier|menlo/i.test(cs.fontFamily);
    if (tab) out.tabular++; if (out.samples.length < 6) out.samples.push([t.slice(0, 12), cs.fontFamily.split(',')[0], fvn, ffs]); out.fonts[cs.fontFamily.split(',')[0]] = (out.fonts[cs.fontFamily.split(',')[0]] || 0) + 1; }
  return out; });
fs.mkdirSync(new URL('./raw-numerals/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL(`./raw-numerals/${slug}.json`, import.meta.url), JSON.stringify(r));
console.log(slug, r.numeric, r.tabular);
await b.close();
