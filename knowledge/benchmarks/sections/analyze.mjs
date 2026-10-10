#!/usr/bin/env node
// Auto-classify measured blocks into section types (first pass; corrected by eye in labels.json), print per-site sequences and aggregate stats.
// usage: node knowledge/benchmarks/sections/analyze.mjs [--table] [--kind home] [--json out.json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const kindF = args.includes('--kind') ? args[args.indexOf('--kind') + 1] : null;
const labelsPath = path.join(dir, 'labels.json');
const labels = fs.existsSync(labelsPath) ? JSON.parse(fs.readFileSync(labelsPath, 'utf8')) : {};
const files = fs.readdirSync(path.join(dir, 'raw')).filter(f => f.endsWith('.json'));

function classify(b, i, n, d) {
  const f = b.f || {}; const t = (b.snippet || '').toLowerCase(); const hd = (b.heading && b.heading.text || '').toLowerCase();
  const hs = b.heading ? b.heading.size : 0;
  if (b.h < 90 && i <= 1) return 'announce-or-nav';
  if (i === 0 || (b.heading && b.heading.tag === 'h1' && b.top < 1200)) return 'hero';
  if (f.details >= 3 || (f.faq && f.expanded >= 3) || /frequently asked|faq/.test(hd)) return 'faq';
  if (f.prices >= 3) return 'pricing';
  if (f.tables && f.tr >= 6) return 'comparison';
  if (f.email >= 1 && b.words < 90) return 'newsletter';
  if (f.logoish >= 5 && b.words < 70) return 'logos';
  if (/testimonial|wall of love|what (our )?(customers|people|users)|loved by|hear from|don.t take our word|customers say|reviews/.test(hd + ' ' + (b.eyebrow ? b.eyebrow.text.toLowerCase() : ''))) return 'testimonials';
  if (f.quotes >= 1.5 && f.avatars >= 1 && b.words < 400) return 'testimonials';
  if (f.compliance >= 2) return 'security';
  if (/integrat|connect|works with|your stack|apps/.test(hd) && (f.squareIcons >= 5 || f.logoish >= 5)) return 'integrations';
  if (f.dates >= 3) return /changelog|shipped|what.s new|updates/.test(t) ? 'changelog' : 'blog';
  if (/changelog|what.s new|we ship/.test(hd)) return 'changelog';
  if (/customer|case stud|stories/.test(hd)) return 'case-studies';
  if (f.steps >= 3 || /how it works|get started in|steps/.test(hd + ' ' + (b.eyebrow ? b.eyebrow.text.toLowerCase() : ''))) return 'how-it-works';
  if (f.tabs >= 3) return 'feature-tabs';
  if (f.bigNums && f.bigNums.length >= 2 && b.words < 160) return 'metrics';
  if (i >= n - 2 && f.buttons >= 1 && b.words < 60 && hs >= 28) return 'cta';
  if (b.cards && b.cards.n >= 3 && b.cards.rows >= 1 && new Set(b.cards.sizes).size >= 2 && b.cards.n <= 9) return 'bento-or-grid';
  if (b.cards && b.cards.n >= 3) return 'card-grid';
  if (hs >= 28 && b.words < 50 && !f.bigMedia) return 'statement';
  return 'feature';
}

const out = {};
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, 'raw', f), 'utf8'));
  if (kindF && d.kind !== kindF) continue;
  if (d.kind === 'gallery') continue;
  // drop overlapping headless blocks
  const bl = d.blocks.filter((b, i) => !(d.blocks.some((o, j) => j !== i && o.top <= b.top && o.top + o.h >= b.top + b.h && o.h > b.h && b.heading && o.heading) && !b.heading));
  const L = labels[d.slug] || {};
  const seq = bl.map((b, i) => ({ i: b.idx, type: L[b.idx] || classify(b, i, bl.length, d), top: b.top, h: b.h, head: b.heading ? `${b.heading.size}/${b.heading.weight}` : '', text: (b.heading && b.heading.text || b.snippet || '').slice(0, 48) }));
  out[d.slug] = { kind: d.kind, H: d.pageHeight, seq, footer: d.footer ? { h: d.footer.h, cols: d.footer.colCount } : null };
}
if (args.includes('--table')) for (const [s, v] of Object.entries(out)) { console.log(`\n# ${s} (${v.kind}) H=${v.H} footer=${v.footer ? v.footer.h + 'px/' + v.footer.cols + 'col' : '-'}`); v.seq.forEach(x => console.log(`  ${String(x.i).padStart(2)} ${x.type.padEnd(16)} y${String(x.top).padStart(6)} h${String(x.h).padStart(5)} ${x.head.padEnd(9)} ${x.text}`)); }
if (args.includes('--json')) fs.writeFileSync(args[args.indexOf('--json') + 1], JSON.stringify(out, null, 1));
