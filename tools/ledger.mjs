#!/usr/bin/env node
// Ledger + diversity check.
//   node tools/ledger.mjs add <reports/name> --verdict accept|reject --why "reason"   record a founder verdict
//   node tools/ledger.mjs similar <reports/name> [--recent 8]                        compare against ledger
//   node tools/ledger.mjs list                                                       show the ledger
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'ledger', 'entries');
fs.mkdirSync(dir, { recursive: true });

const [cmd, target, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
const load = (p) => JSON.parse(fs.readFileSync(path.join(p, 'report.json'), 'utf8'));
const entries = () => fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));

// Two fingerprints "collapse" on an axis when they are close enough to read as the same choice.
const axes = {
  'headline size': (a, b) => a.h1 && b.h1 && Math.abs(a.h1.px - b.h1.px) <= 6,
  'headline font': (a, b) => a.h1 && b.h1 && a.h1.family === b.h1.family,
  'body font': (a, b) => a.fonts?.[0] && a.fonts[0] === b.fonts?.[0],
  'nav height': (a, b) => a.navHeight != null && b.navHeight != null && Math.abs(a.navHeight - b.navHeight) <= 6,
  'content width': (a, b) => a.contentWidth && b.contentWidth && Math.abs(a.contentWidth - b.contentWidth) <= 40,
  'section rhythm': (a, b) => a.sectionPad != null && b.sectionPad != null && Math.abs(a.sectionPad - b.sectionPad) <= 12,
  'radius system': (a, b) => JSON.stringify([...(a.radii || [])].sort()) === JSON.stringify([...(b.radii || [])].sort()),
  'accent hue': (a, b) => (a.accentHues || []).some((h) => (b.accentHues || []).some((k) => Math.min(Math.abs(h - k), 360 - Math.abs(h - k)) <= 30)),
};
const collapsed = (a, b) => Object.entries(axes).filter(([, f]) => f(a, b)).map(([k]) => k);

if (cmd === 'add') {
  const r = load(target); const verdict = flag('verdict'); const why = flag('why', '');
  if (!['accept', 'reject'].includes(verdict)) { console.error('--verdict accept|reject required'); process.exit(2); }
  const date = new Date().toISOString().slice(0, 10);
  const shotDir = path.join(root, 'ledger', 'shots'); fs.mkdirSync(shotDir, { recursive: true });
  const shot = `${date}-${r.name}-fold.png`;
  const src = r.viewports[0].screenshots.fold; if (fs.existsSync(src)) fs.copyFileSync(src, path.join(shotDir, shot));
  // if the dealer was used, keep the chosen candidate (direction.json: set "chosen": 1..N) so future deals avoid it
  let direction;
  const dp = path.join(root, 'work', r.name, 'direction.json');
  if (fs.existsSync(dp)) { const d = JSON.parse(fs.readFileSync(dp, 'utf8')); if (d.chosen && d.candidates?.[d.chosen - 1]) direction = d.candidates[d.chosen - 1]; }
  const entry = { name: r.name, date, verdict, why, summary: r.summary, fingerprint: r.fingerprint, direction, screenshot: `ledger/shots/${shot}` };
  fs.writeFileSync(path.join(dir, `${date}-${r.name}.json`), JSON.stringify(entry, null, 2));
  console.log(`ledger: ${verdict} ${r.name} (${why || 'no reason given'})`);
} else if (cmd === 'similar') {
  const r = load(target); const recent = +flag('recent', 8);
  const prior = entries().filter((e) => e.name !== r.name).slice(-recent);
  if (!prior.length) { console.log('ledger empty: nothing to compare against'); process.exit(0); }
  let worst = 0;
  for (const e of prior) {
    const hit = collapsed(r.fingerprint, e.fingerprint); worst = Math.max(worst, hit.length);
    console.log(`${hit.length >= 4 ? 'TOO SIMILAR' : 'ok'.padEnd(11)} vs ${e.name} [${e.verdict}] shares ${hit.length}/${Object.keys(axes).length}: ${hit.join(', ') || '-'}`);
  }
  // divergence contract: no two outputs may match on more than 3 axes
  if (worst >= 4) { console.log('\nDiverge before delivering: change structure/type/palette/rhythm, not just copy.'); process.exit(1); }
} else if (cmd === 'list' || !cmd) {
  for (const e of entries()) console.log(`${e.date} ${e.verdict.padEnd(6)} ${e.name} — ${e.why}`);
} else { console.error('unknown command'); process.exit(2); }
