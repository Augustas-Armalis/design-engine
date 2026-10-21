#!/usr/bin/env node
// Ledger: founder verdicts, one file per project with a `rounds` array, plus the diversity check.
// Run `node tools/ledger.mjs --help` for the commands. Every write command takes --dry-run.
//
// File format (ledger/entries/<name>.json):
//   { "name": "quorum", "format": "rounds/1", "rounds": [ { round, date, verdict, why, source, summary, fingerprint, screenshot, ... } ] }
// Older single-entry files (ledger/entries/<date>-<name>.json, no `rounds`) are still read as one round each, with every
// original field kept. `migrate` folds them into the per-project file; the originals move to ledger/.bak/<stamp>/
// (ignored by git), never deleted.
//
// Evidence a round can be recorded from (first match wins):
//   reports/<name>/report.json       check.mjs report, or the gate report written by tools/gate.mjs (same shape)
//   reports/<name>/gate.json         gate report, if report.json is missing
//   reports/<name>/design-view.json  design_view.mjs report (fingerprint: h1 tuple, family, CTA height)
//   --png <path>                     a bare screenshot (no fingerprint: the round is recorded, diversity is not measured)
//
// Fingerprint fields read by `similar` (all optional): h1 {px, weight, family}, fonts[], navHeight, contentWidth, sectionPad,
// radii[], heroLayout, navNumbered, accentHues[], button {grammar, height, radius | radii[], background, shadow}.
// gate.mjs should write fingerprint.button from the primary CTA's computed style; for a check.mjs report the button axis
// falls back to the radii of the 37-48px control band (shape.radius-ladder).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ENTRIES = path.join(ROOT, 'ledger', 'entries');
export const SHOTS = path.join(ROOT, 'ledger', 'shots');
export const BAK = path.join(ROOT, 'ledger', '.bak');
export const VERDICTS = ['accept', 'reject', 'partial'];
const FORMAT = 'rounds/1';
const rel = (p) => path.relative(ROOT, p);
const today = () => new Date().toISOString().slice(0, 10);
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const isProjectFile = (d) => d && Array.isArray(d.rounds);
const when = (r) => r.recorded || r.date || ''; // recorded (ISO time) orders same-day rounds; legacy rounds only have a date

// ---------- reading ----------

// All projects, merged from per-project files and legacy single-entry files. Rounds sorted by date (stable).
export function loadProjects() {
  const projects = new Map();
  const get = (name) => {
    if (!projects.has(name)) projects.set(name, { name, file: null, rounds: [], legacyFiles: [] });
    return projects.get(name);
  };
  if (!fs.existsSync(ENTRIES)) return projects;
  const files = fs.readdirSync(ENTRIES).filter((f) => f.endsWith('.json')).sort();
  for (const f of files) {
    const d = readJson(path.join(ENTRIES, f));
    if (isProjectFile(d)) {
      const p = get(d.name); p.file = f; p.data = d;
      p.rounds.push(...d.rounds);
    }
  }
  for (const f of files) {
    const d = readJson(path.join(ENTRIES, f));
    if (isProjectFile(d)) continue;
    const p = get(d.name);
    p.legacyFiles.push(f);
    if (!p.rounds.some((r) => r.legacyFile === f)) p.rounds.push({ round: d.round ?? null, ...d, legacyFile: f });
  }
  for (const p of projects.values()) {
    p.rounds = p.rounds.map((r, i) => [r, i]).sort((a, b) => when(a[0]).localeCompare(when(b[0])) || a[1] - b[1]).map(([r]) => r);
    for (const r of p.rounds) delete r.name; // name lives on the project
  }
  return projects;
}

// Every round as a flat row { name, ...round }, oldest first.
export function allRounds() {
  const rows = [];
  for (const p of loadProjects().values()) for (const r of p.rounds) rows.push({ name: p.name, ...r });
  return rows.map((r, i) => [r, i]).sort((a, b) => when(a[0]).localeCompare(when(b[0])) || a[1] - b[1]).map(([r]) => r);
}

// ---------- evidence ----------

const ladderButton = (report) => {
  const vp = (report.viewports || []).find((v) => v.name === 'desktop') || report.viewports?.[0];
  const c = vp?.checks?.find((x) => x.id === 'shape.radius-ladder');
  const m = c?.detail?.match(/37-48px:\s*([^|]+)/);
  if (!m) return null;
  const radii = m[1].trim().split('/').map((s) => (s.trim() === 'pill' ? 'pill' : Number(s))).filter((x) => x === 'pill' || Number.isFinite(x));
  return radii.length ? { radii, band: '37-48px', from: 'check shape.radius-ladder' } : null;
};

const fromCheckLike = (r, dir, type, file) => {
  const fingerprint = r.fingerprint && Object.keys(r.fingerprint).length ? { ...r.fingerprint } : null;
  if (fingerprint && !fingerprint.button) { const b = ladderButton(r); if (b) fingerprint.button = b; }
  const shot = r.viewports?.[0]?.screenshots?.fold || r.screenshots?.fold || r.screenshot || null;
  return { name: r.name || path.basename(dir), source: { type, path: rel(path.join(dir, file)) }, summary: r.summary || null, fingerprint, screenshotSrc: shot ? path.resolve(ROOT, shot) : null, kind: r.kind || null };
};

const fromDesignView = (d, dir) => {
  const h = d.dom?.h1;
  const fam = h?.family ? h.family.split(',')[0].replace(/["']/g, '').trim() : null;
  const fingerprint = h ? {
    h1: { px: h.size, weight: String(h.weight), ls: h.track != null ? `${h.track}em` : undefined, family: fam, text: h.text },
    fonts: fam ? [fam] : [],
    ...(d.dom?.ctas?.length ? { button: { height: d.dom.ctas[0], from: 'design-view cta.height' } } : {}),
    from: 'design-view',
  } : null;
  const checks = d.checks || [];
  const summary = { pass: checks.filter((c) => c.status === 'pass').length, warn: checks.filter((c) => c.status === 'warn').length, fail: d.fails ?? checks.filter((c) => c.status === 'fail').length };
  const shot = path.join(dir, 'design-view-candidate.png');
  return { name: path.basename(dir), source: { type: 'design-view', path: rel(path.join(dir, 'design-view.json')) }, summary, fingerprint, screenshotSrc: fs.existsSync(shot) ? shot : null, kind: d.kind || null };
};

// Resolve a target (reports dir, project name, or nothing) plus an optional --png into evidence for one round.
export function readEvidence(target, { png } = {}) {
  let ev = null;
  if (target) {
    let dir = path.resolve(ROOT, target);
    if (!fs.existsSync(dir) && fs.existsSync(path.join(ROOT, 'reports', target))) dir = path.join(ROOT, 'reports', target);
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      const has = (f) => fs.existsSync(path.join(dir, f));
      if (has('report.json')) { const r = readJson(path.join(dir, 'report.json')); ev = fromCheckLike(r, dir, r.tool === 'gate' || r.gate ? 'gate' : 'check', 'report.json'); }
      else if (has('gate.json')) ev = fromCheckLike(readJson(path.join(dir, 'gate.json')), dir, 'gate', 'gate.json');
      else if (has('design-view.json')) ev = fromDesignView(readJson(path.join(dir, 'design-view.json')), dir);
      else if (!png) throw new Error(`${rel(dir)} has no report.json, gate.json or design-view.json; pass --png <screenshot> to record from a bare screenshot`);
    } else if (!png) {
      throw new Error(`no report directory at ${target} or reports/${target}; pass --png <screenshot> to record from a bare screenshot`);
    }
  }
  if (png) {
    const p = path.resolve(ROOT, png);
    if (!fs.existsSync(p)) throw new Error(`--png ${png} does not exist`);
    if (ev) ev.screenshotSrc = p; // the crop the founder reacted to wins over the report's fold
    else ev = { name: null, source: { type: 'png', path: rel(p) }, summary: null, fingerprint: null, screenshotSrc: p, kind: null };
  }
  if (!ev) throw new Error('no evidence: give a reports directory (or project name with reports/<name>) or --png <screenshot>');
  return ev;
}

// ---------- writing ----------

const writeOrSay = (dryRun, file, content, log) => {
  if (dryRun) { log(`[dry-run] would write ${rel(file)}`); return; }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

const backupLegacy = (files, dryRun, log, stamp = new Date().toISOString().replace(/[:.]/g, '-')) => {
  const dest = path.join(BAK, stamp);
  for (const f of files) {
    if (dryRun) { log(`[dry-run] would move ledger/entries/${f} -> ${rel(path.join(dest, f))}`); continue; }
    fs.mkdirSync(dest, { recursive: true });
    const ign = path.join(BAK, '.gitignore'); if (!fs.existsSync(ign)) fs.writeFileSync(ign, '*\n');
    fs.copyFileSync(path.join(ENTRIES, f), path.join(dest, f));
    fs.unlinkSync(path.join(ENTRIES, f));
  }
};

const projectDoc = (p) => ({ name: p.name, format: FORMAT, ...(p.data ? Object.fromEntries(Object.entries(p.data).filter(([k]) => !['name', 'format', 'rounds'].includes(k))) : {}), rounds: p.rounds });

// Append one round. Returns { file, round, project }. Throws on bad input. Writes nothing with dryRun.
export function addRound(name, { verdict, why = '', round, evidence, canonKind, dryRun = false, log = console.log } = {}) {
  if (!name) throw new Error('a project name is required (--name, or a report that carries one)');
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) throw new Error(`bad project name "${name}"`);
  if (!VERDICTS.includes(verdict)) throw new Error(`--verdict ${VERDICTS.join('|')} required`);
  const projects = loadProjects();
  const p = projects.get(name) || { name, file: null, rounds: [], legacyFiles: [] };
  const n = round != null ? Number(round) : p.rounds.length + 1;
  if (!Number.isInteger(n) || n < 1) throw new Error(`--round must be a positive integer (got ${round})`);
  if (p.rounds.some((r) => r.round === n)) throw new Error(`${name} round ${n} is already recorded; rounds are append-only (pick the next number)`);
  const date = today();
  let screenshot = null;
  if (evidence?.screenshotSrc && fs.existsSync(evidence.screenshotSrc)) {
    const shot = path.join(SHOTS, `${date}-${name}-r${n}-fold.png`);
    screenshot = rel(shot);
    if (dryRun) log(`[dry-run] would copy ${rel(evidence.screenshotSrc)} -> ${screenshot}`);
    else { fs.mkdirSync(SHOTS, { recursive: true }); fs.copyFileSync(evidence.screenshotSrc, shot); }
  } else log(`warning: no screenshot found for ${name} r${n}; the round is recorded without one`);
  // if the dealer was used, keep the chosen candidate (direction.json: "chosen": 1..N) so future deals avoid it
  let direction;
  const dp = path.join(ROOT, 'work', name, 'direction.json');
  if (fs.existsSync(dp)) { const d = readJson(dp); if (d.chosen && d.candidates?.[d.chosen - 1]) direction = d.candidates[d.chosen - 1]; }
  const entry = {
    round: n, date, recorded: new Date().toISOString(), verdict, why,
    ...(canonKind ? { canonKind } : {}),
    source: evidence?.source || null,
    summary: evidence?.summary || null,
    fingerprint: evidence?.fingerprint || null,
    ...(direction ? { direction } : {}),
    screenshot,
  };
  p.rounds.push(entry);
  const file = path.join(ENTRIES, `${name}.json`);
  writeOrSay(dryRun, file, JSON.stringify(projectDoc(p), null, 2) + '\n', log);
  if (p.legacyFiles.length) backupLegacy(p.legacyFiles, dryRun, log); // their rounds now live in <name>.json
  return { file: rel(file), round: entry, project: p };
}

export function migrate({ dryRun = false, log = console.log } = {}) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  let moved = 0, written = 0;
  for (const p of loadProjects().values()) {
    if (!p.legacyFiles.length) continue;
    const file = path.join(ENTRIES, `${p.name}.json`);
    log(`${p.name}: ${p.legacyFiles.length} legacy file(s) -> ${rel(file)} (${p.rounds.length} round(s))`);
    writeOrSay(dryRun, file, JSON.stringify(projectDoc(p), null, 2) + '\n', log);
    backupLegacy(p.legacyFiles, dryRun, log, stamp);
    moved += p.legacyFiles.length; written++;
  }
  log(`${dryRun ? '[dry-run] ' : ''}migrate: ${moved} legacy file(s) into ${written} project file(s)${moved ? `; originals ${dryRun ? 'would move' : 'moved'} to ledger/.bak/${stamp}/` : ''}`);
}

// ---------- diversity ----------

const fam = (s) => (s || '').toLowerCase().replace(/["']/g, '').replace(/\s+variable\b/, '').trim();
const btnRadii = (b) => (b.radius != null ? [b.radius] : b.radii || []).map((r) => (r === 'pill' || r >= 999 ? 'pill' : Number(r)));
export const AXES = {
  'headline size': (a, b) => a.h1?.px && b.h1?.px && Math.abs(a.h1.px - b.h1.px) <= 6,
  'headline font': (a, b) => !!a.h1?.family && fam(a.h1.family) === fam(b.h1?.family),
  'body font': (a, b) => !!a.fonts?.[0] && fam(a.fonts[0]) === fam(b.fonts?.[0]),
  'nav height': (a, b) => a.navHeight != null && b.navHeight != null && Math.abs(a.navHeight - b.navHeight) <= 6,
  'content width': (a, b) => a.contentWidth && b.contentWidth && Math.abs(a.contentWidth - b.contentWidth) <= 40,
  'section rhythm': (a, b) => a.sectionPad != null && b.sectionPad != null && Math.abs(a.sectionPad - b.sectionPad) <= 12,
  'radius system': (a, b) => !!a.radii?.length && JSON.stringify([...a.radii].map(String).sort()) === JSON.stringify([...(b.radii || [])].map(String).sort()),
  'hero layout': (a, b) => !!a.heroLayout && a.heroLayout !== 'unknown' && a.heroLayout === b.heroLayout,
  'nav numbering': (a, b) => !!a.navNumbered && !!b.navNumbered,
  'accent hue': (a, b) => (a.accentHues || []).some((h) => (b.accentHues || []).some((k) => Math.min(Math.abs(h - k), 360 - Math.abs(h - k)) <= 30)),
  // primary CTA: same named grammar, or same height (+-4px) and radius (+-2px, or both pills)
  button: (a, b) => {
    const x = a.button, y = b.button; if (!x || !y) return false;
    if (x.grammar && y.grammar) return x.grammar === y.grammar;
    const h = x.height != null && y.height != null ? Math.abs(x.height - y.height) <= 4 : null;
    const rx = btnRadii(x), ry = btnRadii(y);
    const r = rx.length && ry.length ? rx.some((p) => ry.some((q) => (p === 'pill' || q === 'pill' ? p === q : Math.abs(p - q) <= 2))) : null;
    if (h === null && r === null) return false;
    return (h ?? true) && (r ?? true);
  },
};
// Body font only: the Inter display floor (founder-taste, Kestrel/Quorum) makes a shared body face mandated, and
// 'headline font' already counts the family once. Hero layout, headline font and nav height count again (audit 3.3:
// "same font, button styling, roundness, nav... every time"; Vigil v2's centred-default rule was superseded).
export const LOCKED = new Set(['body font']);
export const collapsed = (a, b) => Object.entries(AXES).filter(([k, f]) => !LOCKED.has(k) && f(a, b)).map(([k]) => k);

// ---------- CLI ----------

const HELP = `ledger.mjs: founder verdicts (one file per project, rounds appended) and the diversity gate.

  node tools/ledger.mjs add <reports/name | name> --verdict accept|reject|partial --why "<founder's words>"
                         [--round N] [--name <project>] [--png <screenshot>] [--kind <canon kind>] [--dry-run]
      Append a round. Evidence: reports/<name>/report.json (check or gate), else gate.json, else design-view.json,
      or a bare screenshot with --png (target may then be just the project name). --round defaults to the next number.
  node tools/ledger.mjs similar <reports/name | name> [--recent 8] [--max 3] [--png <screenshot>]
      Compare a candidate's fingerprint with each project's latest fingerprinted round. Exit 1 when it shares more than
      --max axes with one of them, or matches a rejected pattern. Axes: ${Object.keys(AXES).filter((k) => !LOCKED.has(k)).join(', ')}.
  node tools/ledger.mjs list [--recent N] [<name>]     rounds, oldest first (the last N with --recent)
  node tools/ledger.mjs show <name | legacy id>        one project's rounds as JSON (or one round by its old id, e.g. 2026-10-15-kite-landing)
  node tools/ledger.mjs migrate [--dry-run]            fold legacy <date>-<name>.json files into <name>.json (originals to ledger/.bak/)

Only record verdicts the founder actually gave, in his words. --dry-run prints every write and changes nothing.`;

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  const rest = argv.slice(1);
  const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
  const has = (n) => rest.includes(`--${n}`);
  const positional = rest.filter((x, i) => !x.startsWith('--') && !(i > 0 && rest[i - 1].startsWith('--') && !['--dry-run'].includes(rest[i - 1])));
  const dryRun = has('dry-run');
  const fail = (msg, code = 2) => { console.error(`ledger: ${msg}`); process.exit(code); };
  try {
    if (!cmd || ['--help', '-h', 'help'].includes(cmd) || has('help')) { console.log(HELP); process.exit(0); }
    if (cmd === 'add') {
      const target = positional[0];
      const png = flag('png');
      const isDirLike = target && (fs.existsSync(path.resolve(ROOT, target)) || fs.existsSync(path.join(ROOT, 'reports', target)));
      const ev = readEvidence(isDirLike ? target : null, { png });
      const name = flag('name') || (!isDirLike ? target : null) || ev.name;
      const res = addRound(name, { verdict: flag('verdict'), why: flag('why', ''), round: flag('round'), evidence: ev, canonKind: flag('kind'), dryRun });
      const r = res.round;
      if (dryRun) console.log(`[dry-run] round to append:\n${JSON.stringify(r, null, 2)}`);
      console.log(`${dryRun ? '[dry-run] ' : ''}ledger: ${r.verdict} ${name} r${r.round} from ${r.source?.type || 'nothing'} (${r.why || 'no reason given'}) -> ${res.file}`);
    } else if (cmd === 'similar') {
      const target = positional[0];
      const ev = readEvidence(target, { png: flag('png') });
      const name = flag('name') || ev.name;
      const recent = +flag('recent', 8); const max = +flag('max', 3);
      if (!ev.fingerprint) { console.log(`SKIPPED: ${ev.source.type} evidence has no fingerprint, so diversity cannot be measured. Run check.mjs or gate.mjs on the build.`); process.exit(0); }
      const latest = new Map();
      for (const r of allRounds()) if (r.fingerprint && r.name !== name) latest.set(r.name, r); // later rounds overwrite earlier ones
      const prior = [...latest.values()].sort((a, b) => when(a).localeCompare(when(b))).slice(-recent);
      if (!prior.length) { console.log('ledger empty: nothing to compare against'); process.exit(0); }
      const counted = Object.keys(AXES).filter((k) => !LOCKED.has(k)).length;
      let worst = 0;
      for (const e of prior) {
        const hit = collapsed(ev.fingerprint, e.fingerprint); worst = Math.max(worst, hit.length);
        console.log(`${hit.length > max ? 'TOO SIMILAR' : 'ok'.padEnd(11)} vs ${e.name} r${e.round ?? '-'} [${e.verdict}] shares ${hit.length}/${counted}: ${hit.join(', ') || '-'}`);
      }
      let pattern = false;
      for (const e of allRounds().filter((x) => x.verdict === 'reject' && x.patternMatch)) {
        if (Object.entries(e.patternMatch).every(([k, v]) => ev.fingerprint[k] === v)) { console.log(`MATCHES REJECTED PATTERN: ${e.name} (${(e.why || '').slice(0, 90)})`); pattern = true; }
      }
      if (worst > max || pattern) { console.log(`\nDiverge before delivering (more than ${max} shared axes or a rejected pattern): change structure/type/palette/rhythm/buttons, not just copy.`); process.exit(1); }
    } else if (cmd === 'list') {
      let rows = allRounds();
      if (positional[0]) rows = rows.filter((r) => r.name === positional[0]);
      if (flag('recent')) rows = rows.slice(-Number(flag('recent')));
      for (const r of rows) console.log(`${r.date} ${String(r.verdict).padEnd(7)} ${r.name}${r.round != null ? ` r${r.round}` : ''} — ${r.why}`);
    } else if (cmd === 'show') {
      const id = positional[0];
      const projects = loadProjects();
      const p = projects.get(id);
      // a legacy id such as `2026-10-15-kite-landing` (cited by canon pages and variety blocks) still resolves to its round
      const legacy = !p && [...projects.values()].flatMap((q) => q.rounds.map((r) => ({ name: q.name, ...r }))).find((r) => r.legacyFile === `${id}.json`);
      if (!p && !legacy) fail(`no project or legacy entry "${id}"`, 1);
      console.log(JSON.stringify(p ? { ...projectDoc(p), legacyFiles: p.legacyFiles } : legacy, null, 2));
    } else if (cmd === 'migrate') {
      migrate({ dryRun });
    } else {
      console.error(`ledger: unknown command "${cmd}"\n`); console.log(HELP); process.exit(2);
    }
  } catch (e) { fail(e.message); }
}
