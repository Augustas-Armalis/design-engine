#!/usr/bin/env node
// Targeted heading metrics for sites whose headings are not h1-h3 (found by visible text start).
// usage (repo root): node knowledge/benchmarks/product-sites/measure3-targeted.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const SITES = {
  vercel: ['https://vercel.com', ['Agentic Infrastructure', 'Build agents on infrastructure', 'Ship apps that scale', 'Host platforms that serve', 'Recently shipped', 'Built by you, or your agents']],
  clerk: ['https://clerk.com', ['Everything you need for authentication', 'Auth that keeps evolving', 'Everything your B2B SaaS needs', 'Subscription billing', 'Build with SDKs', 'Integrate with', 'Trusted around the world']],
  cursor: ['https://cursor.com', ['Cursor is your coding agent', 'Agents turn ideas into code', 'Works autonomously', 'In every tool, at every step', 'The new way to build software', 'Stay on the frontier', 'Changelog', 'Cursor is an applied research team', 'Recent highlights', 'Try Cursor now']],
  raycast: ['https://www.raycast.com', ['Your shortcut to everything', 'Take shortcuts, not detours', 'It’s not about saving time', 'There’s an extension for that', 'Meet your new virtual assistant', 'Built for professionals like you', 'Don\'t repeat yourself', 'What else can Raycast do', 'Stay in the loop', 'Build the perfect tools', 'Take the short way']],
  resend: ['https://resend.com', ['Email for developers', 'Integrate tonight', 'First-class developer experience', 'Write using a delightful editor', 'Go beyond editing', 'Develop emails using React', 'Reach humans, not spam folders', 'Everything in your control', 'Beyond expectations', 'Email reimagined']],
};
function run(snips) {
  const cs = e => getComputedStyle(e);
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, b: r.bottom + scrollY }; };
  const vis = e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const txt = e => (e.innerText || '').trim().replace(/\s+/g, ' ');
  const MEDIA = ['IMG', 'VIDEO', 'CANVAS', 'svg', 'PICTURE', 'IFRAME'];
  const all = [...document.body.querySelectorAll('*')].filter(vis);
  const leaves = all.filter(e => { const r = R(e); if (MEDIA.includes(e.tagName)) return r.w >= 24 && r.h >= 12 && r.w < innerWidth - 4; return [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0); });
  const out = [];
  snips.forEach(sn => {
    const cands = leaves.filter(e => txt(e).startsWith(sn) && txt(e).length < sn.length + 140).sort((a, b) => txt(a).length - txt(b).length);
    const e = cands[0]; if (!e) { out.push({ snip: sn, found: false }); return; }
    // climb to the element whose text equals the heading block (largest ancestor with same font size and text start)
    let h = e; while (h.parentElement && h.parentElement !== document.body && cs(h.parentElement).fontSize === cs(h).fontSize && txt(h.parentElement).startsWith(sn) && txt(h.parentElement).length < sn.length + 140) h = h.parentElement;
    const r = R(h), s = cs(h), fsz = parseFloat(s.fontSize), lh = parseFloat(s.lineHeight) || fsz * 1.2;
    const eb = leaves.filter(l => { const q = R(l); return q.b <= r.y + 3 && q.b > r.y - 70 && Math.abs(q.x - r.x) < 700 && txt(l).length > 0 && txt(l).length <= 40 && parseFloat(cs(l).fontSize) <= 16 && !MEDIA.includes(l.tagName); }).sort((x, y) => R(y).b - R(x).b)[0];
    let gt = r.y; if (eb) gt = Math.min(gt, R(eb).y);
    let prevB = 0; leaves.forEach(l => { const q = R(l); if (q.b <= gt + 2 && q.b > prevB && !h.contains(l)) prevB = q.b; });
    out.push({ snip: sn, found: true, text: txt(h).slice(0, 100), tag: h.tagName.toLowerCase(), size: fsz, weight: s.fontWeight, lsEm: s.letterSpacing === 'normal' ? 0 : +(parseFloat(s.letterSpacing) / fsz).toFixed(3), lhRatio: +(lh / fsz).toFixed(2), lines: Math.round(r.h / lh), w: Math.round(r.w), x: Math.round(r.x), align: s.textAlign, y: Math.round(r.y), gapAbove: Math.round(gt - prevB), eyebrow: eb ? txt(eb) : null, fam: s.fontFamily.split(',')[0].replace(/["']/g, '') });
  });
  return out;
}
const b = await chromium.launch();
const res = {};
for (const [slug, [url, snips]] of Object.entries(SITES)) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  try { await p.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
  await p.waitForTimeout(3000);
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(150); }
  await p.waitForTimeout(800); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1000);
  res[slug] = await p.evaluate(run, snips);
  console.log(slug, res[slug].filter(r => r.found).length + '/' + snips.length);
  await ctx.close();
}
fs.writeFileSync(path.join(dir, 'raw2', '_targeted.json'), JSON.stringify(res, null, 1));
await b.close();
