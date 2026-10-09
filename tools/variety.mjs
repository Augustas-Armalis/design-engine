#!/usr/bin/env node
// Variety picker: stops builds sharing one look. Reads what recent builds used (a `<!-- variety: ... -->` line in each
// work/<name>/DIRECTION.md) and proposes a combination none of the last N builds used, axis by axis.
//   node tools/variety.mjs status                       recent rows + how often each option was used
//   node tools/variety.mjs pick [--mode dark|light] [--seed acme] [--window 6] [--playful] [--imagery] [--prompt]
// Registries (all measured research): button-grammars.md, nav-grammars.md, type-voices.json, dark-recipes.json, system/systems.
// Paste the printed `<!-- variety: ... -->` line into DIRECTION.md so the next pick knows this build used it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const [cmd = 'status', ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
const has = (n) => rest.includes(`--${n}`);

const AXES = {
  layout: { opts: ['centred-over-product', 'left-over-product', 'band', 'split-bleed', 'bento', 'tilted-3d', 'annotated-document', 'art-led'], src: 'knowledge/web/product-heroes.md + V1 set' },
  nav: { opts: [...rd('knowledge/web/nav-grammars.md').matchAll(/^### (G\d\d) /gm)].map((m) => m[1]), src: 'knowledge/web/nav-grammars.md' },
  button: { opts: [...rd('knowledge/web/button-grammars.md').matchAll(/\(`btn-g-([a-z]+)`\)/g)].map((m) => m[1]), src: 'knowledge/web/button-grammars.md + system/variety/buttons.css' },
  type: { opts: JSON.parse(rd('system/variety/type-voices.json')).voices.map((v) => v.slug), src: 'system/variety/type-voices.json' },
  palette: { opts: [...JSON.parse(rd('system/variety/dark-recipes.json')).recipes.map((r) => r.slug), 'light'], src: 'system/variety/dark-recipes.json (+ light)' },
  system: { opts: fs.readdirSync(path.join(root, 'system/systems')).filter((d) => fs.existsSync(path.join(root, 'system/systems', d, 'GUIDE.md'))), src: 'system/systems/*' },
};
// research flags: grammars that only work in a narrow situation stay out of a default pick
const GATED = {
  push: 'playful', spot: 'playful', edge: 'playful', glass: 'imagery', chip: 'prompt', stack: 'never-hero',
};
const allowed = (axis, o) => axis !== 'button' || !GATED[o] || (GATED[o] === 'playful' && has('playful')) || (GATED[o] === 'imagery' && has('imagery')) || (GATED[o] === 'prompt' && has('prompt'));

// recent builds, newest first, with their variety rows
const builds = fs.readdirSync(path.join(root, 'work')).map((name) => {
  const f = path.join(root, 'work', name, 'DIRECTION.md');
  if (!fs.existsSync(f)) return null;
  const m = fs.readFileSync(f, 'utf8').match(/<!--\s*variety:([^>]*)-->/);
  if (!m) return null;
  const row = Object.fromEntries([...m[1].matchAll(/(\w+)=([\w.-]+)/g)].map((x) => [x[1], x[2]]));
  return { name, mtime: fs.statSync(f).mtimeMs, row };
}).filter(Boolean).sort((a, b) => b.mtime - a.mtime);

if (cmd === 'status') {
  console.log(`builds with a variety row: ${builds.length}\n`);
  for (const b of builds) console.log(`  ${b.name.padEnd(22)} ${Object.entries(b.row).map(([k, v]) => `${k}=${v}`).join('  ')}`);
  console.log('');
  for (const [axis, { opts }] of Object.entries(AXES)) {
    const used = Object.fromEntries(opts.map((o) => [o, builds.filter((b) => b.row[axis] === o).length]));
    const never = opts.filter((o) => !used[o]);
    console.log(`${axis.padEnd(8)} used: ${Object.entries(used).filter(([, n]) => n).map(([o, n]) => `${o}x${n}`).join(', ') || '-'}`);
    console.log(`${''.padEnd(8)} never: ${never.join(', ')}`);
  }
  process.exit(0);
}

if (cmd === 'pick') {
  const window = Number(flag('window', 6));
  const mode = flag('mode', 'dark');
  const seed = [...(flag('seed', String(Date.now())))].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const recent = builds.slice(0, window);
  const pick = {};
  for (const [axis, { opts }] of Object.entries(AXES)) {
    let pool = opts.filter((o) => allowed(axis, o));
    if (axis === 'palette') pool = mode === 'light' ? ['light'] : pool.filter((o) => o !== 'light');
    const lastUse = (o) => { const i = builds.findIndex((b) => b.row[axis] === o); return i < 0 ? Infinity : i; };
    const fresh = pool.filter((o) => !recent.some((b) => b.row[axis] === o));
    const cand = (fresh.length ? fresh : pool).sort((a, b) => lastUse(b) - lastUse(a) || rnd() - 0.5);
    const best = lastUse(cand[0]);
    const top = cand.filter((o) => lastUse(o) === best);
    pick[axis] = top[Math.floor(rnd() * top.length)];
  }
  console.log(`Fresh combination (none of the last ${recent.length} builds used these, axis by axis):\n`);
  for (const [axis, v] of Object.entries(pick)) console.log(`  ${axis.padEnd(8)} ${v.padEnd(24)} ${AXES[axis].src}`);
  console.log(`\nRead the matching sections before building, then paste into work/<name>/DIRECTION.md:\n`);
  console.log(`<!-- variety: ${Object.entries(pick).map(([k, v]) => `${k}=${v}`).join(' ')} -->`);
  console.log(`\nOverride any axis on purpose (brief, brand, founder ask) and say why in DIRECTION.md; never by habit.`);
  process.exit(0);
}

console.error('usage: node tools/variety.mjs status | pick [--mode dark|light] [--seed name] [--window 6] [--playful] [--imagery] [--prompt]');
process.exit(2);
