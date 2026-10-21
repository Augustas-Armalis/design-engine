#!/usr/bin/env node
// One command for a founder verdict (audit 5.5). It
//   1. appends the round to ledger/entries/<name>.json (tools/ledger.mjs logic: report dir, gate/design-view report or bare png);
//   2. appends one dated verbatim line to knowledge/founder/founder-taste.md under "## Verdict log" (created at the end if
//      missing). The line holds only the words passed with --why, quoted; nothing is paraphrased or invented;
//   3. prints the canon page to edit, knowledge/founder/canon/<kind>.md (edit the decided value in place, same turn);
//   4. rebuilds the rule index (.venv/bin/python tools/build_index.py);
//   5. on accept, copies the fold into knowledge/engine-accepted/<name>/fold.png with a stub spec.md (never overwrites).
//
//   node tools/verdict.mjs <name> --round N --verdict accept|reject|partial --why "<founder's exact words>"
//        [--png <screenshot>] [--report reports/<name>] [--kind <canon kind>] [--supersedes "L<n>"] [--dry-run]
//
// Only run it with words the founder actually said. --dry-run prints every write and changes nothing.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT, VERDICTS, readEvidence, addRound } from './ledger.mjs';

const HELP = `verdict.mjs: record one founder verdict everywhere it has to land.

  node tools/verdict.mjs <name> --round N --verdict ${VERDICTS.join('|')} --why "<founder's exact words>"
       [--png <screenshot>] [--report reports/<name>] [--kind <canon kind>] [--supersedes "L<n>"] [--dry-run]

  Evidence: --report (default reports/<name>, else reports/dv-<name>, when --png is not given) and/or --png (the crop the founder reacted to).
  Writes: ledger/entries/<name>.json (round appended), knowledge/founder/founder-taste.md ("## Verdict log", verbatim line),
  system/rules/index.json (rebuilt), and on accept knowledge/engine-accepted/<name>/fold.png + spec.md (stub, if absent).
  Prints: knowledge/founder/canon/<kind>.md, the page to edit in the same turn.`;

const argv = process.argv.slice(2);
if (!argv.length || argv.some((a) => ['--help', '-h', 'help'].includes(a))) { console.log(HELP); process.exit(argv.length ? 0 : 2); }
const name = argv[0];
const rest = argv.slice(1);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
const dryRun = rest.includes('--dry-run');
const fail = (m) => { console.error(`verdict: ${m}`); process.exit(2); };
const rel = (p) => path.relative(ROOT, p);
const say = (m) => console.log(dryRun ? `[dry-run] ${m}` : m);

const round = flag('round'), verdict = flag('verdict'), why = flag('why');
const png = flag('png'), kindFlag = flag('kind'), supersedes = flag('supersedes');
if (name.startsWith('--')) fail('first argument must be the project name');
if (!round || !/^\d+$/.test(round)) fail('--round N is required (the round the founder is judging)');
if (!VERDICTS.includes(verdict)) fail(`--verdict ${VERDICTS.join('|')} is required`);
if (!why || !why.trim()) fail('--why "<founder\'s exact words>" is required');

// ---- 1. ledger
let report = flag('report');
if (!report && !png) report = ['', 'dv-'].map((pre) => `reports/${pre}${name}`).find((r) => fs.existsSync(path.join(ROOT, r))); // check/gate report, else design view
let evidence;
try { evidence = readEvidence(report || null, { png }); } catch (e) { fail(e.message); }
const kind = kindFlag || evidence.kind || null;
let res;
try { res = addRound(name, { verdict, why, round, evidence, canonKind: kind || undefined, dryRun, log: console.log }); } catch (e) { fail(e.message); }
say(`ledger: ${verdict} ${name} r${round} from ${evidence.source.type} (${evidence.source.path}) -> ${res.file}`);

// ---- 2. founder-taste verdict log (verbatim)
const tasteFile = path.join(ROOT, 'knowledge/founder/founder-taste.md');
const date = new Date().toISOString().slice(0, 10);
const quote = why.trim().replace(/\s*\n\s*/g, ' ');
const line = `- ${date} · ${name} r${round} · ${verdict}: "${quote}"` +
  ` (ledger: ledger/entries/${name}.json r${round}${kind ? `; canon: ${kind}` : ''}${res.round.screenshot ? `; shot: ${res.round.screenshot}` : ''})` +
  (supersedes ? ` supersedes: ${supersedes}` : '');
const HEAD = '## Verdict log';
let taste = fs.readFileSync(tasteFile, 'utf8');
const lines = taste.split('\n');
const h = lines.findIndex((l) => l.trim() === HEAD);
if (h < 0) {
  taste = taste.replace(/\s*$/, '\n') + `\n${HEAD}\n\nOne line per founder verdict, appended by tools/verdict.mjs. The quoted words are exactly what was passed with --why.\n\n${line}\n`;
} else {
  let end = lines.findIndex((l, i) => i > h && /^#{1,2} /.test(l));
  if (end < 0) end = lines.length;
  while (end > h + 1 && lines[end - 1].trim() === '') end--; // insert after the section's last non-blank line
  lines.splice(end, 0, line);
  taste = lines.join('\n');
}
if (dryRun) say(`would append to ${rel(tasteFile)} under "${HEAD}"${h < 0 ? ' (section created at the end)' : ''}:\n  ${line}`);
else { fs.writeFileSync(tasteFile, taste); console.log(`founder-taste: appended to "${HEAD}"`); }

// ---- 3. canon page to edit
const canonDir = path.join(ROOT, 'knowledge/founder/canon');
if (kind) {
  const page = path.join(canonDir, `${kind}.md`);
  console.log(`canon: edit ${rel(page)}${fs.existsSync(page) ? '' : ' (missing: create it or pick an existing kind)'} now; change the decided value in place and cite ${name} r${round}.`);
} else {
  const pages = fs.existsSync(canonDir) ? fs.readdirSync(canonDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')) : [];
  console.log(`canon: no --kind given; pick the page this verdict changes: ${pages.length ? pages.map((p) => `knowledge/founder/canon/${p}.md`).join(', ') : '(knowledge/founder/canon/ has no pages yet)'}`);
}

// ---- 4. rebuild the index
const py = path.join(ROOT, '.venv/bin/python');
if (dryRun) say(`would run ${rel(py)} tools/build_index.py`);
else {
  const r = spawnSync(fs.existsSync(py) ? py : 'python3', [path.join(ROOT, 'tools/build_index.py')], { cwd: ROOT, stdio: 'inherit' });
  if (r.status !== 0) console.error(`verdict: build_index.py exited ${r.status}; rerun it by hand`);
}

// ---- 5. accept: make it a floor reference
if (verdict === 'accept') {
  const dir = path.join(ROOT, 'knowledge/engine-accepted', name);
  const src = png ? path.resolve(ROOT, png) : evidence.screenshotSrc;
  let dest = path.join(dir, 'fold.png');
  if (fs.existsSync(dest)) dest = path.join(dir, `fold-r${round}.png`);
  if (!src || !fs.existsSync(src)) console.log(`accepted: no screenshot to copy; add ${rel(dir)}/fold.png by hand`);
  else {
    if (fs.existsSync(dest)) console.log(`accepted: ${rel(dest)} already exists; left as is`);
    else if (dryRun) say(`would copy ${rel(src)} -> ${rel(dest)}`);
    else { fs.mkdirSync(dir, { recursive: true }); fs.copyFileSync(src, dest); console.log(`accepted: ${rel(dest)}`); }
  }
  const spec = path.join(dir, 'spec.md');
  if (fs.existsSync(spec)) console.log(`accepted: ${rel(spec)} exists; update its measured values by hand if this round changed them`);
  else {
    const fp = evidence.fingerprint || {};
    const h1 = fp.h1 ? `${fp.h1.family} ${fp.h1.px}px / ${fp.h1.weight}${fp.h1.ls ? ` / ${fp.h1.ls}` : ''}` : 'not measured';
    const body = [
      `# ${name} (accepted r${round}, ${date})`, '',
      `Founder: "${quote}"`, '',
      `- Ledger: \`ledger/entries/${name}.json\` round ${round}`,
      `- Evidence: \`${evidence.source.path}\` (${evidence.source.type})`,
      `- Fold: \`${path.basename(dest)}\``,
      kind ? `- Canon page: \`knowledge/founder/canon/${kind}.md\`` : '- Canon page: (none named)', '',
      '## Measured (from the evidence above; blank means not measured)', '',
      `- h1: ${h1}`,
      `- fonts: ${(fp.fonts || []).join(', ') || 'not measured'}`,
      `- nav height: ${fp.navHeight ?? 'not measured'}`,
      `- hero layout: ${fp.heroLayout ?? 'not measured'}`,
      `- primary button: ${fp.button ? JSON.stringify(fp.button) : 'not measured'}`, '',
      '## Spec (stub)', '',
      'Fill from measurement, not memory: type tuple, grid, gaps, radii by control height, shadow tiers, palette, density counts.', '',
    ].join('\n');
    if (dryRun) say(`would write ${rel(spec)} (stub)`);
    else { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(spec, body); console.log(`accepted: ${rel(spec)} (stub)`); }
  }
}
if (dryRun) console.log('\n[dry-run] nothing was written.');
