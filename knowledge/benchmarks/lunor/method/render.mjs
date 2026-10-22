// node render.mjs texts.json cands.json outdir  -> outdir/<cand>-<chunk>.png + .json (bboxes)
import { chromium } from '/Users/augustas/Documents/Larpo front-end engine/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const [tf, cf, out] = process.argv.slice(2)
const texts = JSON.parse(readFileSync(tf)); const cands = JSON.parse(readFileSync(cf))
const F='/Users/augustas/Library/Fonts/'
const css = `
@font-face{font-family:'L-Satoshi';src:url('file://${F}Satoshi-Regular.otf');font-weight:400}
@font-face{font-family:'L-Satoshi';src:url('file://${F}Satoshi-Medium.otf');font-weight:500}
@font-face{font-family:'L-Satoshi';src:url('file://${F}Satoshi-Bold.otf');font-weight:700}
@font-face{font-family:'L-Clash';src:url('file://${F}ClashDisplay-Regular.otf');font-weight:400}
@font-face{font-family:'L-Clash';src:url('file://${F}ClashDisplay-Medium.otf');font-weight:500}
@font-face{font-family:'L-Clash';src:url('file://${F}ClashDisplay-Semibold.otf');font-weight:600}
@font-face{font-family:'L-Modernist';src:url('file://${F}Sk-Modernist-Regular.otf');font-weight:400}
@font-face{font-family:'L-Modernist';src:url('file://${F}Sk-Modernist-Bold.otf');font-weight:700}
${[400,450,500,550,600,650,700].map(w=>`@font-face{font-family:'L-Aspekta';src:url('file://${F}Aspekta-${w}.otf');font-weight:${w}}`).join('\n')}
@font-face{font-family:'L-InterLocal';src:url('file://${F}InterVariable.ttf');font-weight:100 900}
`
const gf = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Geist:wght@100..900&family=DM+Sans:opsz,wght@9..40,100..1000&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:wght@200..800&family=Instrument+Sans:wght@400..700&family=Figtree:wght@300..900&family=Onest:wght@100..900&family=Outfit:wght@100..900&family=Urbanist:wght@100..900&family=Poppins:wght@400;500;600;700&family=Hanken+Grotesk:wght@100..900&family=Inter+Tight:wght@100..900&family=Sora:wght@100..800&family=Space+Grotesk:wght@300..700&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Funnel+Display:wght@300..800&display=block'
const fs2='https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=switzer@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=block'
const htmlPath = out + '/page.html'
writeFileSync(htmlPath, `<!doctype html><html><head><link rel=stylesheet href="${gf}"><link rel=stylesheet href="${fs2}"><style>${css} body{margin:0;background:#fff} .r{position:absolute;left:20px;white-space:nowrap;color:#000;font-size:64px;line-height:100px;font-kerning:normal}</style></head><body><div id=root></div></body></html>`)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 2800, height: 1000 }, deviceScaleFactor: 1 })
await p.goto('file://' + htmlPath, { waitUntil: 'networkidle' })
const CH = 120
for (const c of cands) {
  for (let i = 0; i < texts.length; i += CH) {
    const name = `${out}/${c.id}-${i / CH}`
    if (existsSync(name + '.json')) continue
    const chunk = texts.slice(i, i + CH)
    const boxes = await p.evaluate(async ({ chunk, c }) => {
      const root = document.getElementById('root'); root.innerHTML = ''
      chunk.forEach((t, j) => { const d = document.createElement('div'); d.className = 'r'; d.style.top = (j * 100) + 'px'; d.style.fontFamily = `'${c.fam}'`; d.style.fontWeight = c.w; if (c.fvs) d.style.fontVariationSettings = c.fvs; if (c.opsz) d.style.fontOpticalSizing = c.opsz; d.textContent = t; root.appendChild(d) })
      document.body.style.height = (chunk.length * 100 + 40) + 'px'
      await document.fonts.ready
      const ok = document.fonts.check(`${c.w} 64px '${c.fam}'`)
      return { ok, b: [...root.children].map(e => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height] }) }
    }, { chunk, c })
    await p.waitForTimeout(150)
    await p.screenshot({ path: name + '.png', fullPage: true })
    writeFileSync(name + '.json', JSON.stringify(boxes))
  }
  process.stdout.write(c.id + ' ')
}
await b.close()
