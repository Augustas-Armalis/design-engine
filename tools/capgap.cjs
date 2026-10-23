// measures [cap gap, baseline gap] of every [data-btn] on a page at 3x
const { chromium } = require('playwright')
;(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 3 })
  await p.goto(process.argv[2]); await p.waitForTimeout(1800)
  const out = {}
  for (const el of await p.$$('[data-btn]')) {
    const key = await el.getAttribute('data-btn'); const bb = await el.boundingBox()
    const buf = await p.screenshot({ clip: { x: bb.x, y: bb.y, width: bb.width, height: bb.height } })
    const r = await p.evaluate(async (b64) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode()
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0)
      const d = x.getImageData(0, 0, c.width, c.height).data; const rows = []
      for (let y = 0; y < c.height; y++) { let n = 0; for (let i = Math.round(c.width * 0.12); i < c.width * 0.88; i++) { const k = (y * c.width + i) * 4; if (d[k] > 190 && d[k + 1] > 190 && d[k + 2] > 190) n++ } rows.push(n) }
      const top = rows.findIndex((n) => n > 2); const bot = rows.length - 1 - [...rows].reverse().findIndex((n) => n > 2)
      const body = Math.max(...rows); let base = bot; for (let y = bot; y > top; y--) { if (rows[y] > body * 0.35) { base = y; break } }
      return [+(top / 3).toFixed(2), +((c.height - 1 - base) / 3).toFixed(2)]
    }, buf.toString('base64'))
    out[key] = r
  }
  console.log(JSON.stringify(out)); await b.close()
})()
