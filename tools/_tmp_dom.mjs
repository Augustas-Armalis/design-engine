import { chromium } from 'playwright'
import fs from 'node:fs'
const [url, out, H] = process.argv.slice(2)
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(()=>{}); await p.waitForTimeout(3000)
const rows = await p.evaluate((H) => {
  const R = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1 || r.top > H || r.bottom < 0) continue
    const cs = getComputedStyle(el)
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ')
    const deco = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderTopStyle !== 'none' || cs.boxShadow !== 'none' || own || el.tagName === 'IMG' || el.tagName === 'svg' || el.tagName==='CANVAS'
    if (!deco) continue
    R.push([el.tagName, [r.x, r.y, r.width, r.height].map(v => +v.toFixed(2)).join(','), own.slice(0, 60), own ? `${cs.fontFamily.split(',')[0]} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls${cs.letterSpacing} ${cs.color} ${cs.textTransform}` : '', `bg ${cs.backgroundColor} bd ${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}/${cs.borderLeftWidth} r ${cs.borderRadius} sh ${cs.boxShadow} op ${cs.opacity}`, el.tagName==='IMG'?el.src.slice(0,90):''].join(' | '))
  }
  return R
}, +(H || 900))
fs.writeFileSync(out, rows.join('\n')); console.log(rows.length)
await b.close()
