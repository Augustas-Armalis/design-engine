#!/usr/bin/env node
// Render one effect replica at 2x and measure it against its reference crop.
//   node work/replicas/fx/fxrun.mjs <n> [--port 4410] [--wait 1200] [-- <extra fxmeasure args>]
// Reads the reference size from work/replicas/fx/refs/fxr<n>-ref.png, renders #/fxr<n> at that CSS size and 2x,
// writes work/replicas/fx/out/fxr<n>-ours.png and a dE heat map, then prints the fxmeasure report.
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../../..')
const argv = process.argv.slice(2)
const dd = argv.indexOf('--'); const extra = dd > -1 ? argv.splice(dd).slice(1) : []
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i > -1 ? argv[i + 1] : d }
const n = argv[0]
const ref = path.join(here, 'refs', `fxr${n}-ref.png`)
const buf = fs.readFileSync(ref)
const W = buf.readUInt32BE(16) / 2, H = buf.readUInt32BE(20) / 2
fs.mkdirSync(path.join(here, 'out'), { recursive: true })
const out = path.join(here, 'out', `fxr${n}-ours.png`)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
await p.goto(`http://localhost:${flag('port', 4410)}/#/fxr${n}`, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(+flag('wait', 1200))
await p.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } })
await b.close()
const py = path.join(root, '.venv/bin/python')
const res = execFileSync(py, [path.join(here, 'fxmeasure.py'), ref, out, '--heat', path.join(here, 'out', `fxr${n}-heat.png`), ...extra], { encoding: 'utf8' })
console.log(`fxr${n} ${W}x${H}\n${res}`)
