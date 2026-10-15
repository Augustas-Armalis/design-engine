// Quorum screenshots: fold at 1440x900 (@2x and 4K for X), plus a full page after scrolling every in-view reveal.
// node work/quorum/shot.mjs [url] [outdir]
import { chromium } from 'playwright'
const url = process.argv[2] || 'http://localhost:4370', out = process.argv[3] || 'work/quorum/shots'
const b = await chromium.launch()
for (const [name, dpr] of [['fold-2x', 2], ['fold-4k', 2.6667]]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dpr })
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(3600)
  await p.screenshot({ path: `${out}/quorum-${name}.png` }); await p.close()
}
for (const [name, w, h] of [['full-1440', 1440, 900], ['mobile', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(800)
  const H = await p.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < H; y += 300) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120) }
  await p.waitForTimeout(2600); await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300)
  await p.screenshot({ path: `${out}/quorum-${name}.png`, fullPage: true }); await p.close()
}
await b.close(); console.log('shots ->', out)
