#!/usr/bin/env node
// Direction dealer: the model cannot be its own random number generator, so deal candidate directions from outside it.
//   node tools/deal.mjs --name acme-hero [--type devtool|fintech|ai|creative|consumer|b2b] [--n 3] [--seed 42]
// Deals N candidate directions that differ on >= 5 axes, avoids values used in the last 5 ledger entries,
// attaches 2 art-direction moves each (filtered by product type), writes work/<name>/direction.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : d; };
const name = flag('name'); if (!name) { console.error('usage: deal.mjs --name <project> [--type x] [--n 3] [--seed n]'); process.exit(2); }
const type = (flag('type', '') || '').toLowerCase(); const N = +flag('n', 3); const seed = +flag('seed', Date.now() % 2147483647);

// mulberry32: tiny seeded PRNG so a deal can be reproduced from its seed
let s = seed >>> 0; const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (a) => a[Math.floor(rnd() * a.length)];

const axes = JSON.parse(fs.readFileSync(path.join(root, 'system/directions/axes.json'), 'utf8'));
delete axes._comment;

// recently used values from the ledger (entries may carry a `direction`)
const ledgerDir = path.join(root, 'ledger', 'entries');
const recent = fs.existsSync(ledgerDir) ? fs.readdirSync(ledgerDir).filter((f) => f.endsWith('.json')).sort().slice(-5).map((f) => JSON.parse(fs.readFileSync(path.join(ledgerDir, f), 'utf8'))) : [];
const used = {}; for (const e of recent) for (const [k, v] of Object.entries(e.direction?.axes || {})) (used[k] ||= new Set()).add(v);

// parse moves: "### M01 Title" blocks with **Suits** / **Kills**
const movesFile = path.join(root, 'knowledge/web/art-direction-moves.md');
const moves = fs.existsSync(movesFile) ? [...fs.readFileSync(movesFile, 'utf8').matchAll(/### (M\d+) ([^\n]+)\n([\s\S]*?)(?=\n### M|\n## |$)/g)].map((m) => ({ id: m[1], title: m[2].trim(), suits: (m[3].match(/\*\*Suits\*\*\s*([^\n]*)/) || [])[1] || '', kills: (m[3].match(/\*\*Kills\*\*\s*([^\n]*)/) || [])[1] || '' })) : [];
const typeWords = { devtool: ['dev', 'tool', 'saas', 'api'], fintech: ['fintech', 'finance', 'regulated', 'bank'], ai: ['ai', 'dev', 'saas', 'tool', 'deep-tech'], creative: ['creative', 'brand', 'studio', 'portfolio', 'launch'], consumer: ['consumer', 'dtc', 'brand'], b2b: ['b2b', 'enterprise', 'saas'] }[type] || [];
const ok = (mv) => !typeWords.some((w) => mv.kills.toLowerCase().includes(w) && !mv.suits.toLowerCase().includes(w));

const candidates = [];
let guard = 0;
while (candidates.length < N && guard++ < 500) {
  const c = {}; for (const [k, opts] of Object.entries(axes)) { const fresh = opts.filter((o) => !used[k]?.has(o.id)); c[k] = pick(fresh.length ? fresh : opts).id; }
  const differs = candidates.every((o) => Object.keys(c).filter((k) => o.axes[k] !== c[k]).length >= 5);
  if (!differs) continue;
  const pool = moves.filter(ok); const mv = []; while (mv.length < 2 && pool.length) { const m = pool.splice(Math.floor(rnd() * pool.length), 1)[0]; mv.push({ id: m.id, title: m.title }); }
  candidates.push({ axes: c, moves: mv });
}
const out = { name, type, seed, dealt: new Date().toISOString(), avoided: Object.fromEntries(Object.entries(used).map(([k, v]) => [k, [...v]])), candidates };
const dir = path.join(root, 'work', name); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'direction.json'), JSON.stringify(out, null, 2));
console.log(`dealt ${candidates.length} directions for ${name} (seed ${seed}${type ? ', type ' + type : ''}) -> work/${name}/direction.json`);
candidates.forEach((c, i) => { console.log(`\n#${i + 1}`); for (const [k, v] of Object.entries(c.axes)) console.log(`  ${k.padEnd(20)} ${v}`); console.log(`  moves                ${c.moves.map((m) => `${m.id} ${m.title}`).join(' | ') || '-'}`); });
