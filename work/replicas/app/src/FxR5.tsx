// FxR5 (study only, never published): a polar halftone of ring dots lit by one warm-to-cool band.
// Reference crop: work/replicas/fx/refs/fxr5-ref.png (240x420 CSS at 2x). Dots fitted with work/replicas/fx/fxblobs.py.
// Measured construction (CSS px in the 240x420 frame; the lattice belongs to a sphere centred off-frame to the left):
//  - POLAR lattice: columns are concentric arcs about (-384, 287), R_k = 560 - 16.9k; rows are shared angles
//    theta_i = 0.0134 + 0.0290 i (so the row pitch shrinks to the left: 16.2 at R560, 14.2 at R492, 12.8 at R441)
//  - dots are ellipses w x 1.15w with a dark 1.6x3 slot (ring glyphs); band dots 8-8.5px, off-band dots 4x5 grey
//  - one light band with a plateau y 327-359: 260 .30, 277 .58, 294 .84, 311 .96, 375 .87, 391 .64, 407 .32; it rises 3.5px per column leftward
//  - hue walks across the columns, right to left: #f57f46 #ed9653 #bb9970 #73887f #345a6c #1d2a33, then grey
//  - off-band grey: #212121 at y 230 falling to #101010 at y 85; the page is #030303
import { useEffect, useRef } from 'react'

const W = 240, H = 420
const CX = -384, CY = 287
const PEAK = ['#f57f46', '#ed9653', '#bb9970', '#73887f', '#345a6c', '#1d2a33', '#1f1f1f', '#1b1b1b', '#151515', '#121212', '#101010']
const BANDW = [8, 7.8, 7.6, 7.1, 6.6, 5.8, 2.2, 1.4, 1.1, 1, 1]
// the measured light band (red channel / peak, column 0): a plateau with soft shoulders, not a gaussian
const BAND: [number, number][] = [[230, 0], [245, 0.1], [260, 0.3], [277, 0.58], [294, 0.84], [311, 0.96], [327, 1], [343, 1], [359, 0.98], [375, 0.87], [391, 0.64], [407, 0.32], [420, 0.12], [436, 0]]
function band(y: number) {
  if (y <= BAND[0][0] || y >= BAND[BAND.length - 1][0]) return 0
  for (let i = 1; i < BAND.length; i++) if (y <= BAND[i][0]) { const [a, va] = BAND[i - 1], [b, vb] = BAND[i]; return va + ((vb - va) * (y - a)) / (b - a) }
  return 0
}
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

function Halftone() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const d = 2, cv = ref.current!; cv.width = W * d; cv.height = H * d
    const g = cv.getContext('2d')!; g.scale(d, d)
    for (let k = 0; k < PEAK.length; k++) {
      const R = 560 - 16.9 * k
      const [pr, pg, pb] = hex(PEAK[k])
      for (let i = -12; i <= 6; i++) {
        const th = 0.0134 + 0.029 * i - 0.0006 * k
        const x = CX + R * Math.cos(th), y = CY + R * Math.sin(th)
        if (y < -6 || y > H + 6 || x < -6) continue
        const v = band(y + 3.5 * k)
        const grey = Math.max(0x08, Math.min(0x21, 0x10 + (0x11 * (y - 85)) / 145)) * (k < 6 ? 1 : 0.85)
        const inBand = v > 0.08 && k < 6
        const t = inBand ? v : 0
        const col = [0, 1, 2].map((c) => Math.round(grey + ([pr, pg, pb][c] - grey) * t))
        const w = inBand ? BANDW[k] * (0.92 + 0.08 * Math.min(1, v * 3)) : k < 6 ? 4.1 : BANDW[k]
        const h = w * 1.15
        g.fillStyle = `rgb(${col.join(',')})`
        g.beginPath(); g.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2); g.fill()
        if (w > 3.5) { // the ring slot
          g.fillStyle = `rgb(${col.map((c) => Math.round(c * 0.28)).join(',')})`
          g.beginPath(); g.ellipse(x, y, 0.8 * (w / 8.5), 1.5 * (w / 8.5), 0, 0, Math.PI * 2); g.fill()
        }
      }
    }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: W, height: H }} />
}

export default function FxR5() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#030303', cornerShape: 'round' } as React.CSSProperties}>
      <Halftone />
    </div>
  )
}
