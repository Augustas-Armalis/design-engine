// Settle screenshot set (1440x900 @2x). node shots.mjs <outdir>
import { chromium } from 'playwright'
const out = process.argv[2], U = 'http://localhost:4340/'
const b = await chromium.launch()
const page = async (theme = 'light') => { const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); await p.emulateMedia({ reducedMotion: 'no-preference' }); return p }
const go = async (p, hash, theme) => { await p.goto(`${U}${theme === 'dark' ? '?theme=dark' : ''}${hash}`); await p.waitForTimeout(900) }
for (const theme of ['light', 'dark']) {
  const p = await page(theme)
  await go(p, '#/', theme); await p.screenshot({ path: `${out}/01-overview-${theme}.png` })
  // full page: let the panel grow to its content
  await p.addStyleTag({ content: '.h-screen{height:auto!important;overflow:visible!important} .h-screen>div{overflow:visible!important} main{overflow:visible!important}' })
  await p.waitForTimeout(300); await p.screenshot({ path: `${out}/02-overview-full-${theme}.png`, fullPage: true })
  await go(p, '#/bills', theme); await p.reload(); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/03-bills-${theme}.png` })
  await go(p, '#/bills/b3', theme); await p.waitForTimeout(500); await p.screenshot({ path: `${out}/04-bill-sheet-${theme}.png` })
  await go(p, '#/k', theme); await p.reload(); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/05-command-${theme}.png` })
  await p.keyboard.press('Escape'); await go(p, '#/', theme); await p.reload(); await p.waitForTimeout(900)
  const chart = await p.$('[aria-label^="Projected operating balance"]'); const bb = await chart.boundingBox()
  await p.mouse.move(bb.x + bb.width * 0.105, bb.y + bb.height * 0.6); await p.waitForTimeout(300)
  await p.screenshot({ path: `${out}/06-chart-hover-${theme}.png` })
  await p.mouse.move(5, 5); await p.getByRole('button', { name: 'Move to Oct 16' }).click(); await p.waitForTimeout(900)
  await p.screenshot({ path: `${out}/07-after-fix-${theme}.png` })
  await p.close()
}
await b.close(); console.log('ok')
