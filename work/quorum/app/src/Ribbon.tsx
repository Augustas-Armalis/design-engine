// Quorum hero v4 art (Marcel Kargul's Altrina grammar, our own story): ~70 hairline strands, one per voice, arrive loose
// and out of phase from the left, converge through the Quorum node and leave as one calm bundle: the answer. Three strands
// are amber (the highlighted quotes) and stay visible through the knot. Labels hang off the ribbon on elbow leaders.
// Canvas 2D at device pixel ratio; draws in left to right on load, then breathes slowly. Reduced motion: one still frame.
import { useEffect, useRef } from 'react'

export const W = 1408, H = 560
export const NODE = { x: 930, y: 290 }
const N = 72, HOT = new Set([14, 35, 55])
const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

/** y of strand i at x, time t (also used to anchor the label leaders) */
export function strandY(i: number, x: number, t: number) {
  const s = (i / (N - 1)) - 0.5
  const L = 1 - sm(60, NODE.x, x)
  const R = sm(NODE.x, W - 40, x)
  const shared = Math.sin(x * 0.0062 - t * 0.35) * 54 * (0.35 + 0.65 * L) + Math.sin(x * 0.0021 + 1.2) * 40 * L
  const own = Math.sin(x * (0.009 + (i % 7) * 0.0009) + i * 0.47 + t * 0.6) * 70 * Math.pow(L, 1.1)
  const spread = s * 300 * Math.pow(L, 1.35) + s * (4 + 92 * R) * Math.cos(x * 0.0105 - t * 0.4 - 0.9)
  const tail = Math.sin(x * 0.006 - t * 0.3) * 46 * R
  return NODE.y + shared * (1 - R) + own + spread + tail
}

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
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < N; i++) {
          const hot = HOT.has(i)
          if ((pass === 1) !== hot) continue
          const sp = Math.abs(i / (N - 1) - 0.5) * 2
          g.beginPath()
          for (let x = 40; x <= Math.min(reveal, W - 20); x += 4) {
            const y = strandY(i, x, t)
            x === 40 ? g.moveTo(x, y) : g.lineTo(x, y)
          }
          g.lineWidth = hot ? 1.25 : 0.75
          g.strokeStyle = hot ? 'rgba(226, 150, 22, 0.95)' : `rgba(16, 17, 19, ${0.1 + 0.32 * (1 - sp)})`
          g.stroke()
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
