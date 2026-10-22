// FxR6 (study only, never published): a line-wave ribbon. ~30 hairlines read as one twisting sheet that pinches into a
// node. Reference crop: work/replicas/fx/refs/fxr6-ref.png (1240x480 CSS at 2x). Labels and the node glyph are neutral.
// Measured construction (CSS px in the 1240x480 frame):
//  - page #f2f5f6; lines 1px #156975 (L* 40.5), 30 per family, 6px apart where the sheet is flat (x 150: 383.5..437)
//  - each line i (f = i/29) sits at y = mid(x) + half(x) * sin(phi(x) + asin(2f-1)): phi = 0 gives an evenly spaced
//    flat sheet, phi -> +-pi/2 folds it (lines bunch on one side and cross = the twisted mesh); half -> 0 is a pinch
//  - mid/half/phi are splines through knots read off the reference (KNOTS below)
//  - opacity ramps in from the left edge: x 60 .18, 100 .36, 150 .61, 200 .82, 300 .93, 400 1 (and out on the right)
//  - a ghost family (same construction, phase +0.9, lifted ~30px, ~12% opacity) sits behind: depth without shadow
//  - the node: pointy-top hexagon r36 at (830,179), 1px #9cc3c8 edge, #f6f9f9 fill, a soft white halo r~85
import { useEffect, useRef } from 'react'

const W = 1240, H = 480
type K = [number, number, number, number] // x, top, bottom, phi
const LEFT: K[] = [
  [-20, 250, 420, 0], [40, 250, 425, 0], [130, 265, 439, 0], [160, 255, 434, 0], [190, 240, 413, 0], [220, 236, 376, 0.2],
  [250, 214, 324, 0.4], [280, 196, 280, 0.7], [310, 192, 260, 1.0], [340, 205, 252, 1.3], [370, 208, 250, 1.5],
  [400, 210, 250, 1.4], [430, 210, 264, 1.0], [460, 210, 300, 0.6], [490, 202, 322, 0.2], [520, 196, 315, -0.2],
  [550, 204, 289, -0.6], [580, 208, 264, -1.0], [610, 190, 239, -1.3], [640, 189, 215, -1.5], [670, 187, 213, -1.2],
  [700, 184, 226, -0.6], [730, 198, 225, 0], [760, 202, 215, 0.3], [790, 198, 201, 0.2], [797, 197.5, 197.5, 0],
]
const RIGHT: K[] = [
  [862, 160, 160, 0], [880, 148, 159, 0.3], [910, 138, 170, 0.6], [940, 149, 181, 0.2], [970, 148, 182, -0.3],
  [1000, 118, 186, -0.8], [1030, 88, 215, -1.2], [1060, 59, 245, -1.5], [1090, 89, 257, -1.2], [1120, 110, 265, -0.8],
  [1150, 130, 265, -0.5], [1180, 140, 205, -0.3], [1210, 150, 190, 0], [1260, 160, 180, 0],
]
// Catmull-Rom through the knot table, column c
function spline(ks: K[], x: number, c: 1 | 2 | 3) {
  if (x <= ks[0][0]) return ks[0][c]
  if (x >= ks[ks.length - 1][0]) return ks[ks.length - 1][c]
  let i = 0; while (ks[i + 1][0] < x) i++
  const p0 = ks[Math.max(0, i - 1)], p1 = ks[i], p2 = ks[i + 1], p3 = ks[Math.min(ks.length - 1, i + 2)]
  const t = (x - p1[0]) / (p2[0] - p1[0]), t2 = t * t, t3 = t2 * t
  return 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)
}
const ramp = (pts: [number, number][], x: number) => {
  if (x <= pts[0][0]) return pts[0][1]
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + ((vb - va) * (x - a)) / (b - a) }
  return pts[pts.length - 1][1]
}
const A_LEFT: [number, number][] = [[20, 0], [60, 0.18], [100, 0.36], [150, 0.61], [200, 0.82], [300, 0.93], [400, 1]]
const A_RIGHT: [number, number][] = [[862, 1], [1060, 1], [1120, 0.75], [1170, 0.45], [1220, 0.12], [1240, 0]]

function Lines() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const d = 2, cv = ref.current!; cv.width = W * d; cv.height = H * d
    const g = cv.getContext('2d')!; g.scale(d, d); g.lineWidth = 1; g.lineJoin = 'round'
    const N = 30
    const draw = (ks: K[], x0: number, x1: number, alpha: [number, number][], ghost: boolean) => {
      for (let i = 0; i < N; i++) {
        const f = i / (N - 1), base = Math.asin(2 * f - 1)
        // draw in short segments so opacity can ramp along x
        let px = x0, py = 0
        for (let x = x0; x <= x1; x += 2) {
          const top = spline(ks, x, 1), bot = spline(ks, x, 2), phi = spline(ks, x, 3) + (ghost ? 0.9 : 0)
          const lift = ghost ? -30 * Math.sin(Math.min(1, Math.max(0, (x - x0) / (x1 - x0))) * Math.PI) : 0
          const y = (top + bot) / 2 + ((bot - top) / 2) * (ghost ? 1.15 : 1) * Math.sin(phi + base) + lift
          if (x > x0) {
            const a = ramp(alpha, x) * (ghost ? 0.13 : 1)
            g.strokeStyle = `rgba(21,105,117,${a.toFixed(3)})`
            g.beginPath(); g.moveTo(px, py); g.lineTo(x, y); g.stroke()
          }
          px = x; py = y
        }
      }
    }
    draw(LEFT, 140, 760, A_LEFT, true)
    draw(RIGHT, 900, 1240, A_RIGHT, true)
    draw(LEFT, -20, 797, A_LEFT, false)
    draw(RIGHT, 862, 1240, A_RIGHT, false)
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: W, height: H }} />
}

const LABELS: [number, number, number, string][] = [[96, 185, 37, 'Input'], [430, 115, 57, 'Signal'], [1107, 247, 44, 'Output']]
const hex = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k - Math.PI / 2; return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}` }).join(' ')

export default function FxR6() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#f2f5f6', cornerShape: 'round' } as React.CSSProperties}>
      <div style={{ position: 'absolute', left: 830 - 90, top: 179 - 90, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(closest-side, #fbfcfc 0%, rgba(251,252,252,0.85) 45%, rgba(242,245,246,0) 100%)' }} />
      <Lines />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g stroke="#1d5f69" strokeWidth="1" fill="none">
          <polyline points="133,194 168,194 249,274" />
          <polyline points="430,124 397,124 315,205" />
          <polyline points="1107,256 1072,256 992,176" />
        </g>
        {[[249, 274], [315, 205], [992, 176], [797, 197.5], [862, 160]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={2.6} fill="#1d5f69" />)}
        <polygon points={hex(830, 179, 36)} fill="#f6f9f9" stroke="#9cc3c8" strokeWidth="1" />
        <g fill="none" stroke="#1d5f69" strokeWidth="2.2" strokeLinejoin="round">
          <polygon points={hex(830, 179, 15)} />
          <circle cx={830} cy={179} r={4} fill="#1d5f69" />
        </g>
        {LABELS.map(([x, y, w, t]) => (
          <g key={t}>
            <rect x={x + 0.5} y={y + 0.5} width={w} height={18} fill="#ffffff" stroke="#8fb9bf" />
            <text x={x + w / 2 + 0.5} y={y + 13.5} textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontSize="10.5" fill="#1d5f69">{t}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
