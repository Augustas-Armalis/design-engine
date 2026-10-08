#!/usr/bin/env node
// Scaffold a new hero/site build from the product-hero kit.
//   node tools/new_build.mjs <name> [--system <slug>] [--port 4330] [--no-install]
// Creates work/<name>/app (Vite + React + motion + Tailwind v4 + kit primitives), binds the house system's theme.css if given,
// writes a DIRECTION.md stub, installs deps, and prints the next pipeline steps.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const [name, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
if (!name || !/^[a-z0-9-]+$/.test(name)) { console.error('usage: node tools/new_build.mjs <kebab-name> [--system <slug>] [--port N] [--no-install]'); process.exit(2); }

const tpl = path.join(root, 'system/kits/product-hero/template');
const dir = path.join(root, 'work', name);
const app = path.join(dir, 'app');
if (fs.existsSync(app)) { console.error(`work/${name}/app already exists`); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
fs.cpSync(tpl, app, { recursive: true, filter: (p) => !/node_modules|dist/.test(path.relative(tpl, p)) });

const title = name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
for (const f of ['index.html', 'src/App.tsx']) {
  const p = path.join(app, f); fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replaceAll('__NAME__', title));
}
const pkg = JSON.parse(fs.readFileSync(path.join(app, 'package.json'), 'utf8')); pkg.name = name; fs.writeFileSync(path.join(app, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');

const system = flag('system');
if (system) {
  const theme = path.join(root, 'system/systems', system, 'theme.css');
  if (!fs.existsSync(theme)) { console.error(`no compiled system at ${theme} (run node tools/compile_system.mjs ${system})`); process.exit(1); }
  fs.copyFileSync(theme, path.join(app, 'src/theme.css'));
  const css = path.join(app, 'src/index.css'); fs.writeFileSync(css, fs.readFileSync(css, 'utf8').replace('/* @import "./theme.css"; */', '@import "./theme.css";'));
}

const direction = path.join(dir, 'DIRECTION.md');
if (!fs.existsSync(direction)) fs.writeFileSync(direction, `# ${title}: direction

**Brief:** <product, audience, the one action, the proof needed>

## Hero class
<product proof | brand campaign | editorial | interactive> and why. Default SaaS: centred copy over a full product dashboard (founder rule).

## Concept
<one sentence: what world is this product in?>

## Reference triad
- Structure: <ref> -> rule taken
- Type and identity: <ref> -> rule taken
- Proof, material, motion: <ref> -> rule taken

## Divergence (vs last accepted: Kestrel, and the last 8 ledger entries)
| axis | Kestrel | ${title} |
|---|---|---|
| structure | centred over dashboard | |
| type voice | Inter 550 -4.5% | |
| palette | grey #f7f7f7, blue #335cff | |
| CTA grammar | fancy ink + white, 44px r14 | |
| nav grammar | grey track + sliding white pill | |
| motion signature | tiles + routes landing dots | |
| product world | analytics dashboard + AI panel | |

## Bound system
${system ? `system/systems/${system}` : '<slug>'} (contract met)

## Kit primitives used (system/kits/product-hero/GUIDE.md)
<Word, Stage, Frame, PillNav, Segmented, CountUp, Route, FloatTile, Rails: which, and which were replaced by a brand-specific construction>

## Overrides
- override: <rule-id> because <reason>
`);

if (!rest.includes('--no-install')) execSync('npm ci --silent', { cwd: app, stdio: 'inherit' });
const port = flag('port', String(4330 + Math.floor(Math.random() * 60)));
console.log(`\nscaffolded work/${name}/app${system ? ` (bound to ${system})` : ''}
next:
  1. .venv/bin/python tools/select_rules.py --name ${name} --type hero --brief "<one line>"   then read work/${name}/RULES.md
  2. fill work/${name}/DIRECTION.md (divergence row vs Kestrel is mandatory)
  3. build in work/${name}/app/src (kit.tsx primitives + one T timeline)
  4. cd work/${name}/app && npm run build && npx vite preview --port ${port} --strictPort
  5. node tools/check.mjs http://localhost:${port} --name ${name}   and   node tools/ledger.mjs similar reports/${name}
  6. node tools/shot.mjs http://localhost:${port} work/${name}/hero-1440x900@2x.png --scale 2 --wait 5500`);
