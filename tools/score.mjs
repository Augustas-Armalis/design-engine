#!/usr/bin/env node
// Aggregate an eval run and compare it with the previous one.
//   node tools/score.mjs <run-label>
// Expects reports named eval-<run-label>-<brief-id>/report.json (use: node tools/check.mjs page.html --name eval-<run>-<id>)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const run = process.argv[2];
if (!run) { console.error('usage: score.mjs <run-label>'); process.exit(2); }
const briefs = JSON.parse(fs.readFileSync(path.join(root, 'evals', 'prompts.json'), 'utf8')).briefs;
const resDir = path.join(root, 'evals', 'results'); fs.mkdirSync(resDir, { recursive: true });

const items = briefs.map((b) => {
  const p = path.join(root, 'reports', `eval-${run}-${b.id}`, 'report.json');
  if (!fs.existsSync(p)) return { id: b.id, missing: true };
  const r = JSON.parse(fs.readFileSync(p, 'utf8'));
  const aiTells = r.viewports.flatMap((v) => v.checks).filter((c) => c.id.startsWith('ai.') && c.status === 'warn').length;
  return { id: b.id, ...r.summary, aiTells, fingerprint: r.fingerprint };
});
const done = items.filter((i) => !i.missing);
const totals = done.reduce((t, i) => ({ fail: t.fail + i.fail, warn: t.warn + i.warn, pass: t.pass + i.pass, aiTells: t.aiTells + i.aiTells }), { fail: 0, warn: 0, pass: 0, aiTells: 0 });
const result = { run, date: new Date().toISOString(), completed: `${done.length}/${briefs.length}`, items, totals };
fs.writeFileSync(path.join(resDir, `${run}.json`), JSON.stringify(result, null, 2));

const prevFile = fs.readdirSync(resDir).filter((f) => f.endsWith('.json') && f !== `${run}.json`).sort().pop();
const prev = prevFile ? JSON.parse(fs.readFileSync(path.join(resDir, prevFile), 'utf8')) : null;
console.log(`run ${run}: ${result.completed} briefs  fail ${totals.fail}  warn ${totals.warn}  pass ${totals.pass}  ai-tells ${totals.aiTells}`);
for (const i of items) console.log(`  ${i.id.padEnd(22)} ${i.missing ? 'MISSING' : `fail ${i.fail} warn ${i.warn} ai ${i.aiTells}`}`);
if (prev) {
  const d = (k) => { const x = totals[k] - prev.totals[k]; return `${x > 0 ? '+' : ''}${x}`; };
  console.log(`vs ${prev.run}: fail ${d('fail')}  warn ${d('warn')}  ai-tells ${d('aiTells')}  (negative = better; compare only runs with equal completed counts)`);
}
