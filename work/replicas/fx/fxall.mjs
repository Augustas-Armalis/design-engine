#!/usr/bin/env node
// Final pass for all effect replicas, one browser at a time: fxrun (render + measure) then tools/compare.mjs
// (official side-by-side + 50% onion overlay) and fxside.py (reference | ours | dE heat).
//   nice -n 19 node work/replicas/fx/fxall.mjs [n ...]
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../../..')
const py = path.join(root, '.venv/bin/python')
// per-replica measure region: the effect layer only (CSS px in the crop), so placeholder copy does not count
const ONLY = {
  1: [], 2: [], 3: ['50,22.5,1040,6', '33.5,40,5.5,215', '1102,40,5,215'], 4: [], 5: [],
  6: ['0,40,1240,420'], 7: [], 8: ['19,18,470,69'],
}
const BLUR = { 4: 6, 6: 6 }
const ns = process.argv.slice(2).length ? process.argv.slice(2) : ['1', '2', '3', '4', '5', '6', '7', '8']
const out = []
for (const n of ns) {
  const extra = (ONLY[n] || []).flatMap((r) => ['--only', r]).concat(BLUR[n] ? ['--blur', String(BLUR[n])] : [])
  const r = execFileSync('node', [path.join(here, 'fxrun.mjs'), n, '--wait', '2500', '--', ...extra], { encoding: 'utf8' })
  out.push(r)
  const ref = path.join(here, 'refs', `fxr${n}-ref.png`), buf = fs.readFileSync(ref)
  const W = buf.readUInt32BE(16) / 2, H = buf.readUInt32BE(20) / 2
  execFileSync('node', [path.join(root, 'tools/compare.mjs'), `http://localhost:4410/#/fxr${n}`, ref, path.join(here, `cmp-fxr${n}`), '--w', String(W), '--h', String(H), '--scale', '2', '--wait', '2500'], { encoding: 'utf8' })
  execFileSync(py, [path.join(here, 'fxside.py'), n, '--heat', '--half'], { encoding: 'utf8' })
  console.log(r)
}
fs.writeFileSync(path.join(here, 'MEASURES.txt'), out.join('\n'))
