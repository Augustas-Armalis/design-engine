#!/usr/bin/env node
// Asset library (docs/LIBRARY.md): final renders of finished work, one folder per asset, with a manifest the X planner reads.
//
//   node tools/library.mjs render <project>/<asset> [--base http://localhost:4396] [--only <role>] [--no-preflight]
//       (an asset whose app runs elsewhere sets source.base, e.g. Quorum http://localhost:4391/)
//       renders every recipe in the manifest (a route at a viewport and scale, optionally clipped, or a crop through
//       #/xframe), writes w/h/bytes/sha256 back, runs tools/preflight.mjs per `checks` entry and stores the result
//   node tools/library.mjs snap --src <route> --vw <w> --vh <h> --rect x,y,w,h [--edges l,t,r,b] [--range 40] [--base ...]
//       moves the named crop edges to the nearest gutter (no text line, chip, avatar, button or icon crossing it) and
//       prints the snapped rect (designers-eye DE-02/DE-07: "re-cut at a gutter")
//   node tools/library.mjs index      rebuilds library/index.json from every library/<project>/<asset>/manifest.json
//   node tools/library.mjs check      validates manifests (fields, files, sizes, series references)
// Renders run one browser at a time; prefix with nice -n 19.
import { chromium } from 'playwright'
import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const lib = path.join(root, 'library')
const [cmd, ...rest] = process.argv.slice(2)
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 && rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[i + 1] : d }
const has = (n) => rest.includes(`--${n}`)
const base = flag('base', process.env.LIBRARY_BASE || 'http://localhost:4396/')
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n')
const pngSize = (p) => { const b = fs.readFileSync(p); return b.slice(1, 4).toString() === 'PNG' ? [b.readUInt32BE(16), b.readUInt32BE(20)] : [null, null] }
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')
const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8' }).stdout.trim()
const manifests = () => fs.existsSync(lib) ? fs.readdirSync(lib).filter((p) => fs.statSync(path.join(lib, p)).isDirectory()).flatMap((p) => fs.readdirSync(path.join(lib, p)).filter((a) => fs.existsSync(path.join(lib, p, a, 'manifest.json'))).map((a) => path.join(lib, p, a))) : []
const urlOf = (route, b = base) => new URL(route.startsWith('#') ? `/${route}` : route, b).href

async function render() {
  const dir = path.join(lib, rest[0] || '')
  const mp = path.join(dir, 'manifest.json')
  if (!rest[0] || !fs.existsSync(mp)) { console.error('usage: node tools/library.mjs render <project>/<asset>'); process.exit(2) }
  const m = readJSON(mp)
  fs.mkdirSync(path.join(dir, 'renders'), { recursive: true })
  const commit = git('rev-parse', '--short', 'HEAD'), dirty = !!git('status', '--porcelain', '--', m.source?.component || '.')
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
  for (const r of m.renders) {
    if (flag('only') && r.role !== flag('only')) continue
    if (!r.recipe) {
      // migrated as is: copy from its source file when missing, record size and hash
      const out = path.join(dir, r.file)
      if (!fs.existsSync(out) && r.from) fs.copyFileSync(path.join(root, r.from), out)
      const [pw, ph] = pngSize(out)
      Object.assign(r, { w: pw, h: ph, bytes: fs.statSync(out).size, sha256: sha(out) })
      console.log(`kept ${path.relative(root, out)} ${pw}x${ph} (migrated as is from ${r.from})`)
      continue
    }
    const { route, viewport: [w, h], scale, clip, wait = 3500 } = r.recipe
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale })
    await page.goto(urlOf(route, m.source?.base || base), { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {})
    await page.waitForTimeout(wait); await page.evaluate(() => document.fonts.ready)
    const out = path.join(dir, r.file)
    await page.screenshot({ path: out, clip: clip ? { x: clip[0], y: clip[1], width: clip[2], height: clip[3] } : undefined, timeout: 90000 })
    await page.close()
    const [pw, ph] = pngSize(out)
    Object.assign(r, { w: pw, h: ph, bytes: fs.statSync(out).size, sha256: sha(out), rendered: new Date().toISOString(), commit: dirty ? `${commit}+dirty` : commit })
    console.log(`rendered ${path.relative(root, out)} ${pw}x${ph} ${(r.bytes / 1048576).toFixed(2)}MB`)
  }
  await browser.close()
  // preflight per check entry (one browser at a time, inside preflight.mjs)
  if (!has('no-preflight') && Array.isArray(m.checks)) {
    const results = []
    for (const [i, c] of m.checks.entries()) {
      const name = `lib-${m.id}-${i + 1}`
      const args = ['tools/preflight.mjs', urlOf(c.route, m.source?.base || base), '--kind', c.kind, '--name', name, '--w', String(c.w), '--h', String(c.h), '--artboard']
      if (c.anchor) args.push('--anchor', c.anchor)
      if (c.seams) args.push('--seams', c.seams.join(','))
      if (c.format) args.push('--format', c.format)
      if (c.renders?.length) args.push('--png', c.renders.map((f) => path.relative(root, path.join(dir, f))).join(','))
      if (c.direction) args.push('--direction', c.direction)
      const run = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
      const rep = JSON.parse(fs.readFileSync(path.join(root, 'reports', name, 'preflight.json'), 'utf8'))
      fs.mkdirSync(path.join(dir, 'preflight'), { recursive: true })
      fs.copyFileSync(path.join(root, 'reports', name, 'preflight.md'), path.join(dir, 'preflight', `${i + 1}-${c.label || c.kind}.md`))
      results.push({ label: c.label || c.kind, route: c.route, size: `${c.w}x${c.h}`, ...rep.summary, report: `preflight/${i + 1}-${c.label || c.kind}.md`, ran: rep.generated })
      console.log(run.stdout.trim().split('\n').at(-1))
    }
    m.preflight = { ran: new Date().toISOString(), fail: results.reduce((s, r) => s + r.fail, 0), warn: results.reduce((s, r) => s + r.warn, 0), results }
  }
  m.dates = { ...(m.dates || {}), rendered: new Date().toISOString().slice(0, 10) }
  writeJSON(mp, m)
  index()
  if (m.preflight?.fail) { console.log(`FAIL ${m.id}: ${m.preflight.fail} preflight fail(s); not postable until 0`); process.exit(1) }
}

async function snap() {
  const src = flag('src'), vw = +flag('vw'), vh = +flag('vh'), range = +flag('range', 40)
  const [x, y, w, h] = (flag('rect') || '').split(',').map(Number)
  const edges = flag('edges', 'l,t,r,b').split(',')
  if (!src || !vw || !vh || [x, y, w, h].some(Number.isNaN)) { console.error('usage: node tools/library.mjs snap --src cprodb --vw 1392 --vh 932 --rect x,y,w,h [--edges l,t,r,b] [--range 40]'); process.exit(2) }
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: vw, height: vh } })
  await page.goto(urlOf(`#/${src}`), { waitUntil: 'networkidle' }).catch(() => {}); await page.waitForTimeout(2500)
  // blockers: every text line box, and every small painted box (short side < 120): a crop edge must not cross one
  const blockers = await page.evaluate(() => {
    const out = [], rng = document.createRange(), w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n
    while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; rng.selectNodeContents(n); for (const q of rng.getClientRects()) if (q.width > 0.5) out.push([q.left, q.top, q.right, q.bottom]) }
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
      if (r.width < 1 || Math.min(r.width, r.height) >= 120 || (el.closest('svg') && !el.matches('svg'))) continue
      if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || /0px 0px 0px (0\.5|1|1\.5)px/.test(cs.boxShadow) || el.matches('svg, img')) out.push([r.left, r.top, r.right, r.bottom])
    }
    return out
  })
  await browser.close()
  const crossesV = (X, y0, y1) => blockers.some(([l, t, r, b]) => l < X - 0.5 && r > X + 0.5 && b > y0 && t < y1)
  const crossesH = (Y, x0, x1) => blockers.some(([l, t, r, b]) => t < Y - 0.5 && b > Y + 0.5 && r > x0 && l < x1)
  const near = (v0, test) => { for (let d = 0; d <= range; d++) for (const v of [v0 - d, v0 + d]) if (!test(v)) return v; return null }
  const res = { l: x, t: y, r: x + w, b: y + h }
  for (const e of edges) {
    const v = e === 'l' || e === 'r' ? near(res[e], (X) => crossesV(X, res.t, res.b)) : near(res[e], (Y) => crossesH(Y, res.l, res.r))
    if (v == null) console.log(`edge ${e}: no gutter within ${range}px of ${res[e]}`); else res[e] = v
  }
  console.log(JSON.stringify({ rect: [res.l, res.t, res.r - res.l, res.b - res.t], moved: { l: res.l - x, t: res.t - y, r: res.r - (x + w), b: res.b - (y + h) } }))
}

function index() {
  const assets = manifests().map((d) => {
    const m = readJSON(path.join(d, 'manifest.json'))
    return {
      id: m.id, project: m.project, title: m.title, kind: m.kind, status: m.status, postable: m.postable !== false && !['rejected', 'reference'].includes(m.status) && !m.preflight?.fail,
      verdict: m.verdict?.latest ?? null, formats: [...new Set(m.renders.map((r) => r.format).filter(Boolean))], series: m.series || [],
      sampleDay: m.sampleDay ?? null, reservedFor: m.reservedFor ?? null, preflightFail: m.preflight?.fail ?? null, dir: path.relative(root, d),
      renders: m.renders.map((r) => ({ file: path.relative(root, path.join(d, r.file)), role: r.role, format: r.format, w: r.w, h: r.h })),
    }
  })
  const projects = fs.existsSync(lib) ? fs.readdirSync(lib).filter((p) => fs.existsSync(path.join(lib, p, 'project.json'))).map((p) => readJSON(path.join(lib, p, 'project.json'))) : []
  writeJSON(path.join(lib, 'index.json'), { schema: 'design-engine.library-index/v1', generated: new Date().toISOString(), projects: projects.map((p) => ({ id: p.id, name: p.name, fictional: p.fictional, series: p.series || [] })), assets })
  console.log(`library/index.json: ${assets.length} assets in ${projects.length} projects`)
}

function check() {
  const REQ = ['schema', 'id', 'project', 'title', 'kind', 'status', 'renders', 'source']
  const STATUS = ['accepted', 'final', 'awaiting-verdict', 'rejected', 'reference']
  const fmts = readJSON(path.join(root, 'system/x/formats.json')).formats.map((f) => f.id)
  const ids = new Set(); let bad = 0
  const err = (id, msg) => { bad++; console.log(`  FAIL ${id}: ${msg}`) }
  for (const d of manifests()) {
    const m = readJSON(path.join(d, 'manifest.json'))
    for (const k of REQ) if (m[k] == null) err(m.id || d, `missing ${k}`)
    if (!/^[a-z0-9][a-z0-9-]{2,63}$/.test(m.id || '')) err(m.id, 'id must match ^[a-z0-9][a-z0-9-]{2,63}$ (the X hand-off assetId)')
    if (ids.has(m.id)) err(m.id, 'duplicate id'); ids.add(m.id)
    if (!STATUS.includes(m.status)) err(m.id, `status ${m.status} not in ${STATUS.join('|')}`)
    if (path.basename(path.dirname(d)) !== m.project) err(m.id, `project ${m.project} != folder ${path.basename(path.dirname(d))}`)
    if (!fs.existsSync(path.join(d, 'caption.md')) && m.postable !== false && m.status !== 'reference') err(m.id, 'no caption.md')
    for (const r of m.renders || []) {
      const f = path.join(d, r.file)
      if (!fs.existsSync(f)) { err(m.id, `missing ${r.file}`); continue }
      if (r.format && !fmts.includes(r.format)) err(m.id, `${r.file}: format ${r.format} not in system/x/formats.json`)
      if (/\.png$/.test(f)) { const [w, h] = pngSize(f); if (r.w && (w !== r.w || h !== r.h)) err(m.id, `${r.file}: manifest ${r.w}x${r.h}, file ${w}x${h}`) }
    }
    if (m.postable !== false && !['rejected', 'reference'].includes(m.status) && m.preflight && m.preflight.fail) err(m.id, `postable with ${m.preflight.fail} preflight FAIL`)
  }
  for (const p of fs.existsSync(lib) ? fs.readdirSync(lib).filter((x) => fs.existsSync(path.join(lib, x, 'project.json'))) : []) {
    for (const s of readJSON(path.join(lib, p, 'project.json')).series || []) for (const [stage, id] of Object.entries(s.assets || {})) if (id && !ids.has(id)) err(s.id, `stage ${stage} -> unknown asset ${id}`)
  }
  console.log(bad ? `library check: ${bad} problem(s)` : `library check: ${ids.size} manifests ok`)
  process.exit(bad ? 1 : 0)
}

if (cmd === 'render') await render()
else if (cmd === 'snap') await snap()
else if (cmd === 'index') index()
else if (cmd === 'check') check()
else { console.error('usage: node tools/library.mjs render <project>/<asset> | snap ... | index | check'); process.exit(2) }
