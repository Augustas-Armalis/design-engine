// Fold stills for X: node work/quorum/fold.mjs [url] [out] [dpr] [wait-ms]
import { chromium } from 'playwright'
const [url = 'http://localhost:4370', out = 'work/quorum/shots/hero-v2-2x.png', dpr = '2', wait = '4200'] = process.argv.slice(2)
const b = await chromium.launch({ args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist'] })
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: +dpr })
const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)))
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(+wait)
await p.screenshot({ path: out }); await b.close()
console.log('saved', out, errs.length ? 'ERRORS: ' + errs.join(' | ') : 'no console errors')
