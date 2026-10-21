#!/usr/bin/env node
// Variety picker, rebuilt as "divergence on top of the floor" (audit 3.4 / 5.4).
// It deals ONLY approved options (system/variety/approved.json, each with the founder verdict that approved it), never a
// blocked one (approved.json `blocked`, plus `blocked` on type-voices.json voices and dark-recipes.json recipes), and it
// never randomises the type voice for SaaS heroes and landings: Inter display (or the brand's own face) is the floor.
// Among approved options it proposes the least recently used per axis, from measured accept-time history first
// (system/variety/history.json, written by `record`), then `<!-- variety: ... -->` rows in work/<name>/DIRECTION.md.
//
//   node tools/variety.mjs status
//   node tools/variety.mjs pick [--mode dark|light] [--seed acme] [--window 6] [--kind hero|landing|section|...] [--brand-face "Family"]
//                               [--playful] [--imagery] [--prompt]
//   node tools/variety.mjs record --name <n> --from reports/<name> [--layout id --nav id --button id --type id --palette id --system id] [--dry-run]
//
// Paste the printed `<!-- variety: ... -->` line into DIRECTION.md. Record the shipped row at accept time with `record`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readEvidence } from './ledger.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const rj = (p) => JSON.parse(rd(p));
const [cmd = 'status', ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
const has = (n) => rest.includes(`--${n}`);

const APPROVED = rj('system/variety/approved.json');
const VOICES = rj('system/variety/type-voices.json').voices;
const RECIPES = rj('system/variety/dark-recipes.json').recipes;
const HISTORY_FILE = path.join(root, 'system/variety/history.json');
const FLOOR = APPROVED.floor.type;
const AXIS_NAMES = ['layout', 'nav', 'button', 'type', 'palette', 'system'];

// every known option per axis (registries), so status can show what is approved, blocked or unrated
const KNOWN = {
  layout: ['centred-over-product', 'left-over-product', 'band', 'split-bleed', 'bento', 'tilted-3d', 'annotated-document', 'art-led', 'split-object', 'altrina-panel', 'cinematic-stage'],
  nav: [...rd('knowledge/web/nav-grammars.md').matchAll(/^### (G\d\d) /gm)].map((m) => m[1]),
  button: [...[...rd('knowledge/web/button-grammars.md').matchAll(/\(`btn-g-([a-z]+)`\)/g)].map((m) => m[1]),
    ...[...rd('system/variety/buttons-2/GUIDE.md').matchAll(/`(b2-[a-z]+)`/g)].map((m) => m[1])].filter((v, i, a) => a.indexOf(v) === i),
  type: VOICES.map((v) => v.slug),
  palette: ['light', ...RECIPES.map((r) => r.slug)],
  system: fs.readdirSync(path.join(root, 'system/systems')).filter((d) => fs.existsSync(path.join(root, 'system/systems', d, 'GUIDE.md'))),
};
const SRC = {
  layout: 'knowledge/web/product-heroes.md, light-hero-grammars.md', nav: 'knowledge/web/nav-grammars.md',
  button: 'system/variety/buttons-2/GUIDE.md + knowledge/web/button-grammars.md', type: 'system/variety/type-voices.json',
  palette: 'system/variety/dark-recipes.json (+ light)', system: 'system/systems/<slug>/GUIDE.md',
};

// blocked: approved.json + the registries' own `blocked` fields
const blocked = (axis) => {
  const b = { ...(APPROVED.axes[axis]?.blocked || {}) };
  if (axis === 'type') for (const v of VOICES) if (v.blocked) b[v.slug] = v.blocked;
  if (axis === 'palette') for (const r of RECIPES) if (r.blocked) b[r.slug] = r.blocked;
  return b;
};
// approved: approved.json, plus type voices that carry `floor`; never a blocked one; must exist in a registry
const approved = (axis) => {
  const a = { ...(APPROVED.axes[axis]?.approved || {}) };
  if (axis === 'type') for (const v of VOICES) if (v.floor) a[v.slug] = { evidence: v.evidence || 'floor voice' };
  const b = blocked(axis);
  return Object.fromEntries(Object.entries(a).filter(([k]) => !b[k] && KNOWN[axis].includes(k)));
};
// research gates on v1 button grammars that only work in a narrow situation
const GATED = { push: 'playful', spot: 'playful', edge: 'playful', glass: 'imagery', chip: 'prompt', stack: 'never-hero' };
const gateOk = (axis, o) => axis !== 'button' || !GATED[o] || has(GATED[o]);

// ---------- history ----------
const readHistory = () => (fs.existsSync(HISTORY_FILE) ? JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')) : { doc: '', rows: [] });
const builds = () => {
  const hist = readHistory().rows;
  const latest = new Map();
  for (const r of hist) latest.set(r.name, r); // later rows win
  const out = [...latest.values()].map((r) => ({ name: r.name, t: Date.parse(r.recorded) || 0, row: r.row, src: 'history' }));
  for (const name of fs.readdirSync(path.join(root, 'work'))) {
    if (latest.has(name)) continue; // the measured accept-time row replaces the round-1 DIRECTION row
    const f = path.join(root, 'work', name, 'DIRECTION.md');
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, 'utf8').match(/<!--\s*variety:([^>]*)-->/);
    if (!m) continue;
    out.push({ name, t: fs.statSync(f).mtimeMs, row: Object.fromEntries([...m[1].matchAll(/(\w+)=([\w.:-]+)/g)].map((x) => [x[1], x[2]])), src: 'direction' });
  }
  return out.sort((a, b) => b.t - a.t);
};

// ---------- canon narrowing (system/canon/<kind>.json -> variety: {axis: [ids]}) ----------
const canonKind = (kind, mode) => (['hero', 'landing', 'saas'].includes(kind) ? `hero-${mode}` : kind);
const canonPools = (kind, mode) => {
  const f = path.join(root, 'system/canon', `${canonKind(kind, mode)}.json`);
  if (!fs.existsSync(f)) return {};
  try { return JSON.parse(fs.readFileSync(f, 'utf8')).variety || {}; } catch { return {}; }
};

if (cmd === 'status') {
  const bs = builds();
  console.log(`builds with a variety row: ${bs.length} (history = measured at accept; direction = DIRECTION.md row, may be round 1)\n`);
  for (const b of bs) console.log(`  ${b.name.padEnd(22)} [${b.src.padEnd(9)}] ${Object.entries(b.row).map(([k, v]) => `${k}=${v}`).join('  ')}`);
  console.log('');
  for (const axis of AXIS_NAMES) {
    const ok = approved(axis), bl = blocked(axis);
    const used = (o) => bs.filter((b) => b.row[axis] === o).length;
    console.log(`${axis.padEnd(8)} approved: ${Object.keys(ok).map((o) => `${o}x${used(o)}`).join(', ') || '-'}`);
    console.log(`${''.padEnd(8)} blocked:  ${Object.keys(bl).join(', ') || '-'}`);
    console.log(`${''.padEnd(8)} unrated (never dealt): ${KNOWN[axis].filter((o) => !ok[o] && !bl[o]).join(', ') || '-'}`);
  }
  process.exit(0);
}

if (cmd === 'pick') {
  const window = Number(flag('window', 6));
  const mode = flag('mode', 'dark');
  const kind = flag('kind', 'hero');
  const brandFace = flag('brand-face');
  const seed = [...(flag('seed', String(Date.now())))].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const bs = builds(); const recent = bs.slice(0, window);
  const canon = canonPools(kind, mode);
  const pick = {}, why = {};
  for (const axis of AXIS_NAMES) {
    if (axis === 'type' && FLOOR.kinds.includes(kind)) {
      pick.type = brandFace ? `brand:${brandFace.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : FLOOR.voice;
      why.type = brandFace ? `the brand's own face (${brandFace}); floor rule` : 'floor, not randomised for SaaS heroes/landings';
      continue;
    }
    const ok = approved(axis);
    let pool = Object.keys(ok).filter((o) => gateOk(axis, o) && (!ok[o].modes || ok[o].modes.includes(mode)));
    if (axis === 'palette') pool = pool.filter((o) => (mode === 'light' ? o === 'light' : o !== 'light'));
    if (Array.isArray(canon[axis])) { const narrowed = pool.filter((o) => canon[axis].includes(o)); if (narrowed.length) pool = narrowed; }
    if (!pool.length) { pick[axis] = '(none approved)'; why[axis] = `no approved ${axis} for mode=${mode}; add one with its founder verdict to system/variety/approved.json`; continue; }
    const lastUse = (o) => { const i = bs.findIndex((b) => b.row[axis] === o); return i < 0 ? Infinity : i; };
    const fresh = pool.filter((o) => !recent.some((b) => b.row[axis] === o));
    const cand = (fresh.length ? fresh : pool).sort((a, b) => lastUse(b) - lastUse(a) || rnd() - 0.5);
    const top = cand.filter((o) => lastUse(o) === lastUse(cand[0]));
    pick[axis] = top[Math.floor(rnd() * top.length)];
    why[axis] = ok[pick[axis]]?.evidence || '';
  }
  console.log(`Approved combination for kind=${kind} mode=${mode} (least recently used among approved options; blocked options are never dealt):\n`);
  for (const axis of AXIS_NAMES) console.log(`  ${axis.padEnd(8)} ${String(pick[axis]).padEnd(22)} ${why[axis]}`);
  console.log(`\nRead the matching sections (${AXIS_NAMES.map((a) => SRC[a]).join('; ')}), then paste into work/<name>/DIRECTION.md:\n`);
  console.log(`<!-- variety: ${AXIS_NAMES.map((k) => `${k}=${pick[k]}`).join(' ')} -->`);
  console.log(`\nOverride an axis only on purpose (brief, brand, founder ask) and say why in DIRECTION.md. At accept, run: node tools/variety.mjs record --name <name> --from reports/<name>`);
  process.exit(0);
}

if (cmd === 'record') {
  const name = flag('name'); const from = flag('from'); const dryRun = has('dry-run');
  if (!name || !from) { console.error('usage: node tools/variety.mjs record --name <n> --from reports/<name> [--layout id --nav id --button id --type id --palette id --system id] [--dry-run]'); process.exit(2); }
  const dir = path.resolve(root, from);
  if (!fs.existsSync(dir)) { console.error(`variety: ${from} does not exist`); process.exit(2); }
  const j = (f) => (fs.existsSync(path.join(dir, f)) ? JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) : null);
  let ev; try { ev = readEvidence(from); } catch (e) { console.error(`variety: ${e.message}`); process.exit(2); }
  const dv = j('design-view.json') || (fs.existsSync(path.join(root, 'reports', `dv-${name}`, 'design-view.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'reports', `dv-${name}`, 'design-view.json'), 'utf8')) : null);
  const fp = ev.fingerprint || {}; // same fingerprint the ledger stores (check/gate report.json, gate.json or design-view.json)
  const h1 = fp.h1 || (dv?.dom?.h1 ? { px: dv.dom.h1.size, weight: String(dv.dom.h1.weight), family: dv.dom.h1.family?.split(',')[0].replace(/["']/g, '').trim() } : null);
  // DIRECTION row and bound system, for the axes a computed style cannot name (nav and button grammar, recipe, system)
  const dpath = path.join(root, 'work', name, 'DIRECTION.md');
  const dtext = fs.existsSync(dpath) ? fs.readFileSync(dpath, 'utf8') : '';
  const drow = Object.fromEntries([...(dtext.match(/<!--\s*variety:([^>]*)-->/)?.[1] || '').matchAll(/(\w+)=([\w.:-]+)/g)].map((x) => [x[1], x[2]]));
  const dsys = dtext.match(/system\/systems\/([a-z0-9-]+)/)?.[1];
  const row = {}, prov = {};
  const set = (axis, v, p) => { if (v != null && row[axis] == null) { row[axis] = v; prov[axis] = p; } };
  for (const axis of AXIS_NAMES) set(axis, flag(axis), 'flag');
  // measured
  if (h1?.family) {
    const f = h1.family.toLowerCase().replace(/\s+variable\b/, '').trim();
    const voice = f === 'inter' ? 'inter-display' : VOICES.find((v) => v.display.family.toLowerCase() === f)?.slug;
    set('type', voice || `brand:${f.replace(/[^a-z0-9]+/g, '-')}`, `measured h1 ${h1.family} ${h1.px}px/${h1.weight}`);
  }
  if (/^split-(left|right)-copy$/.test(fp.heroLayout || '')) set('layout', 'split-bleed', `measured heroLayout=${fp.heroLayout}`);
  if (dv?.kind === 'hero-light' || (dv?.px?.bandMeanL ?? 0) > 180) set('palette', 'light', `measured design-view ${dv.kind || ''} bandMeanL=${dv.px?.bandMeanL}`.trim());
  // declared fallbacks
  set('system', dsys, 'direction bound system (not measured)');
  for (const axis of AXIS_NAMES) set(axis, drow[axis], 'direction row (not measured)');
  const missing = AXIS_NAMES.filter((a) => row[a] == null);
  const warns = [];
  const declared = AXIS_NAMES.filter((a) => prov[a]?.startsWith('direction'));
  if (declared.length) warns.push(`${declared.join(', ')} came from the DIRECTION row, which may describe round 1 rather than the shipped build; pass --${declared[0]} <id> etc. for what shipped`);
  for (const a of AXIS_NAMES) if (row[a] && blocked(a)[row[a]]) warns.push(`${a}=${row[a]} is BLOCKED (${blocked(a)[row[a]]}); recorded as shipped, but check the build`);
  const entry = {
    name, recorded: new Date().toISOString(), from: path.relative(root, dir), row, provenance: prov,
    measured: { h1: h1 || null, heroLayout: fp.heroLayout ?? null, navHeight: fp.navHeight ?? null, fonts: fp.fonts || null, button: fp.button || null, dvKind: dv?.kind || null },
  };
  // the latest ledger verdict should be an accept: the row is written at accept time
  const lp = path.join(root, 'ledger/entries', `${name}.json`);
  const last = fs.existsSync(lp) ? JSON.parse(fs.readFileSync(lp, 'utf8')).rounds?.slice(-1)[0] : null;
  if (!last || last.verdict !== 'accept') warns.push(`ledger has no accept as the latest round for ${name} (record the verdict first: node tools/verdict.mjs ...)`);
  console.log(JSON.stringify(entry, null, 2));
  for (const w of warns) console.log(`warning: ${w}`);
  if (missing.length) console.log(`warning: no value for ${missing.join(', ')}; pass --${missing[0]} <id> etc. to set them`);
  const hist = readHistory();
  if (!hist.doc) hist.doc = 'Accept-time variety rows, measured from the shipped build (tools/variety.mjs record). Latest row per name wins over the DIRECTION.md row.';
  hist.rows.push(entry);
  if (dryRun) console.log(`[dry-run] would append this row to ${path.relative(root, HISTORY_FILE)} (${hist.rows.length} rows)`);
  else { fs.writeFileSync(HISTORY_FILE, JSON.stringify(hist, null, 2) + '\n'); console.log(`variety: recorded ${name} -> ${path.relative(root, HISTORY_FILE)}`); }
  process.exit(0);
}

console.error('usage: node tools/variety.mjs status | pick [--mode dark|light] [--seed name] [--window 6] [--kind hero|landing|...] [--brand-face "Family"] [--playful] [--imagery] [--prompt] | record --name <n> --from reports/<name> [--dry-run]');
process.exit(2);
