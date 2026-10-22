// usage: node tools/clipscan.cjs <url> <width> <height>   (founder 2026-10-22: "little things that are cut off")
// finds things that are cut off: text wider than its clipping box, svg shapes outside their viewBox, children outside an overflow:hidden parent
const { chromium } = require('playwright')
;(async () => {
  const [url, w, h] = [process.argv[2], +process.argv[3], +process.argv[4]]
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: h } })
  await p.goto(url); await p.waitForTimeout(1500)
  const out = await p.evaluate(() => {
    const res = []
    const root = document.querySelector('[data-product]') || document.body
    const name = (el) => (el.textContent || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40) || el.tagName
    for (const el of root.querySelectorAll('*')) {
      const cs = getComputedStyle(el)
      if (el instanceof HTMLElement && (cs.overflow === 'hidden' || cs.overflow === 'clip' || cs.textOverflow === 'ellipsis') && el.children.length === 0 && el.scrollWidth > el.clientWidth + 1) res.push(['text cut', name(el), el.scrollWidth - el.clientWidth])
      if (el.tagName === 'svg' && cs.overflow !== 'visible') {
        const vb = el.viewBox.baseVal; if (!vb || !vb.width) continue
        for (const c of el.querySelectorAll('path,circle,rect,line,polyline')) {
          const bb = c.getBBox(); const ccs = getComputedStyle(c); const sw = ccs.stroke && ccs.stroke !== 'none' ? parseFloat(ccs.strokeWidth) || 0 : 0
          if (bb.x - sw / 2 < vb.x - 0.01 || bb.y - sw / 2 < vb.y - 0.01 || bb.x + bb.width + sw / 2 > vb.x + vb.width + 0.01 || bb.y + bb.height + sw / 2 > vb.y + vb.height + 0.01) res.push(['svg cut', el.parentElement ? name(el.parentElement) : 'svg', c.tagName, `bbox ${bb.x.toFixed(1)},${bb.y.toFixed(1)} ${bb.width.toFixed(1)}x${bb.height.toFixed(1)} sw ${sw} vb ${vb.x},${vb.y} ${vb.width}x${vb.height}`])
        }
      }
    }
    // children leaving a clipping ancestor (skip the deliberate crops: the week card's own bottom and the window)
    for (const el of root.querySelectorAll('*')) {
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue
      let a = el.parentElement
      while (a && a !== root.parentElement) {
        const cs = getComputedStyle(a)
        if (cs.overflow === 'hidden' || cs.overflow === 'clip') {
          const q = a.getBoundingClientRect()
          const cut = Math.max(q.left - r.left, r.right - q.right, q.top - r.top, r.bottom - q.bottom)
          if (cut > 0.5 && el.textContent.trim()) res.push(['box cut', name(el), Math.round(cut)])
          break
        }
        a = a.parentElement
      }
    }
    return res
  })
  const seen = new Set(); for (const r of out) { const k = r.join('|'); if (!seen.has(k)) { seen.add(k); console.log(r.join('  ')) } }
  console.log(`${seen.size} issue(s)`); await b.close()
})()
