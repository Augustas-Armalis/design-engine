// Halftone field: coloured dots on white, sized by a smooth intensity field (strong in two corners, calm where the
// product sits), coloured along the diagonal violet -> magenta -> apricot. Drawn once to a canvas at device pixels.
import { useEffect, useRef } from 'react'

type Blob = { x: number; y: number; r: number; k: number }
const STOPS: [number, [number, number, number]][] = [[0, [72, 38, 230]], [0.5, [214, 72, 200]], [1, [255, 146, 82]]]
const mix = (t: number) => {
  for (let i = 1; i < STOPS.length; i++) if (t <= STOPS[i][0]) {
    const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i], u = (t - a) / (b - a)
    return ca.map((c, j) => Math.round(c + (cb[j] - c) * u))
  }
  return STOPS[STOPS.length - 1][1]
}

export default function Halftone({ w, h, cell = 7, blobs, calm }: { w: number; h: number; cell?: number; blobs: Blob[]; calm?: { x: number; y: number; w: number; h: number } }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, dpr = window.devicePixelRatio || 1
    c.width = w * dpr; c.height = h * dpr
    const g = c.getContext('2d')!
    g.scale(dpr, dpr)
    g.fillStyle = '#fdfcff'; g.fillRect(0, 0, w, h)
    for (let y = cell / 2; y < h; y += cell) for (let x = cell / 2; x < w; x += cell) {
      let f = 0
      for (const b of blobs) { const d = Math.hypot((x - b.x) / b.r, (y - b.y) / b.r); f += b.k * Math.exp(-d * d * 1.6) }
      if (calm) { // soften the field behind the product so it never fights the UI
        const dx = Math.max(calm.x - x, 0, x - (calm.x + calm.w)), dy = Math.max(calm.y - y, 0, y - (calm.y + calm.h))
        f *= Math.min(1, 0.35 + Math.hypot(dx, dy) / 160)
      }
      f = Math.min(1, f)
      if (f < 0.04) continue
      const t = Math.min(1, Math.max(0, (x / w) * 0.62 + (y / h) * 0.38))
      const [r, gg, b] = mix(t)
      g.fillStyle = `rgb(${r} ${gg} ${b} / ${0.35 + f * 0.65})`
      g.beginPath(); g.arc(x, y, (cell / 2) * Math.sqrt(f) * 0.98, 0, Math.PI * 2); g.fill()
    }
  }, [w, h, cell, blobs, calm])
  return <canvas ref={ref} aria-hidden style={{ width: w, height: h, display: 'block' }} />
}
