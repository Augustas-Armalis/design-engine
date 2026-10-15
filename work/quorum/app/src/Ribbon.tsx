// Quorum hero v4 art (Marcel Kargul's Altrina grammar, our own story): ~70 hairline strands, one per voice, arrive loose
// and out of phase from the left, converge through the Quorum node and leave as one calm bundle: the answer. Three strands
// are amber (the highlighted quotes) and stay visible through the knot. Labels hang off the ribbon on elbow leaders.
// Canvas 2D at device pixel ratio; draws in left to right on load, then breathes slowly. Reduced motion: one still frame.
import { useEffect, useRef } from 'react'

export const W = 1408, H = 560
export const NODE = { x: 930, y: 300 }
const N = 120, HOT = new Set([38, 81])
const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

/* one twisted sheet of hairlines: centre curve + width envelope + twist; s in [-.5,.5] picks the strand */
const centre = (x: number, t: number) => NODE.y + 64 * Math.sin(x * 0.0042 + 0.5 - t * 0.12) * (1 - Math.exp(-Math.pow((x - NODE.x) / 260, 2)))
const width = (x: number) => x < NODE.x ? 210 * Math.pow(1 - sm(120, NODE.x - 20, x), 0.85) : 112 * sm(NODE.x + 10, NODE.x + 300, x)
const twist = (x: number, t: number) => (x < NODE.x ? x * 0.0105 : x * 0.0075 + 2.4) - t * 0.22
export function strandY(i: number, x: number, t: number, echo = 0) {
  const s = i / (N - 1) - 0.5
  const tw = twist(x, t) + s * 0.55 + echo * 1.3
  return centre(x, t) + echo * 34 * (width(x) / 210) + s * width(x) * (1 + echo * 0.15) * Math.cos(tw)
}
const shade = (i: number, x: number, t: number) => { const s = i / (N - 1) - 0.5; return Math.pow(0.5 + 0.5 * Math.sin(twist(x, t) + s * 0.55), 1.6) }

export default function Ribbon({ at = 0.4, labels }: { at?: number; labels: { i: number; x: number; lx: number; ly: number }[] }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!, dpr = window.devicePixelRatio || 1
    cv.width = W * dpr; cv.height = H * dpr
    const g = cv.getContext('2d')!
    g.scale(dpr, dpr)
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now(); let raf = 0
    const draw = (now: number) => {
      const s = (now - t0) / 1000, t = still ? 2 : s
      const k = still ? 1 : Math.min(1, Math.max(0, (s - at) / 2.0)), reveal = 40 + (1 - Math.pow(1 - k, 3)) * (W + 40)
      g.clearRect(0, 0, W, H)
      const end = Math.min(reveal, W - 20)
      // faint echo sheet behind, then the main sheet; each strand drawn in short runs so its alpha follows the twist (3D shading)
      for (const echo of [1, 0]) {
        for (let i = 0; i < N; i += echo ? 2 : 1) {
          const hot = !echo && HOT.has(i)
          let px = 40, py = strandY(i, 40, t, echo)
          for (let x = 48; x <= end; x += 8) {
            const y = strandY(i, x, t, echo)
            const a = hot ? 0.85 : (echo ? 0.04 + 0.08 * shade(i, x, t) : 0.06 + 0.36 * shade(i, x, t))
            g.beginPath(); g.moveTo(px, py); g.lineTo(x, y)
            g.lineWidth = hot ? 1.1 : 0.6
            g.strokeStyle = hot ? `rgba(226, 150, 22, ${a})` : `rgba(18, 20, 23, ${a})`
            g.stroke(); px = x; py = y
          }
        }
      }
      g.save(); g.globalCompositeOperation = 'destination-out'
      const lg = g.createLinearGradient(40, 0, 260, 0); lg.addColorStop(0, 'rgba(0,0,0,1)'); lg.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = lg; g.fillRect(0, 0, 260, H)
      const rg = g.createLinearGradient(W - 220, 0, W - 20, 0); rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,1)')
      g.fillStyle = rg; g.fillRect(W - 220, 0, 220, H)
      g.restore()
      const la = still ? 1 : Math.min(1, Math.max(0, (s - at - 1.6) / 0.6))
      if (la > 0) {
        g.save(); g.globalAlpha = la; g.strokeStyle = 'rgba(16,17,19,0.55)'; g.fillStyle = '#101113'; g.lineWidth = 1
        for (const l of labels) {
          const py = strandY(l.i, l.x, t), ex = l.lx + (l.x > l.lx ? 26 : -26)
          g.beginPath(); g.moveTo(l.lx, l.ly); g.lineTo(ex, l.ly); g.lineTo(l.x, py); g.stroke()
          g.beginPath(); g.arc(l.x, py, 2.6, 0, Math.PI * 2); g.fill()
        }
        g.restore()
      }
      if (!still) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [at, labels])
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0" style={{ width: W, height: H }} />
}
