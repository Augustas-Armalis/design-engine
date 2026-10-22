// FxR4 (study only, never published): a dithered grain ribbon. Reference crop: work/replicas/fx/refs/fxr4-ref.png
// (1320x470 CSS at 2x). Generative: no traced bitmap, only strand parameters read off the reference.
// Measured construction (CSS px in the 1320x470 frame):
//  - two lobes, each a FAN OF CONVERGING TRANSLUCENT STRANDS: 16 cubic strokes per lobe start spread along one frame
//    edge and converge on a round tip; each adds ~9% warm white, so brightness accumulates toward the tips by itself
//    (L* 9.7 bg -> 60 mid -> 81-86 at the tips) and the fan edges read as stepped translucent sheets
//  - background #131d18 (green-black), light #e2e0d8 (warm paper white); every pixel is a mix of the two
//  - the tone is then ordered-dithered (4x4 Bayer, 1 CSS px cells = 2x2 device px, 7 levels): that is the grain
//  - constellation: 1px dashed white lines at 35-60% and rotated-square nodes (3-6px), two 22px dashed diamond frames
import { useEffect, useRef } from 'react'

const W = 1320, H = 470
const BG = [19, 29, 24], FG = [226, 224, 216]
type P = [number, number]
type Strand = { s: P; c1: P; c2: P; e: P; w: number; a: number }

function lobe(start0: P, start1: P, tip0: P, tip1: P, pull: number, bendTop: number, bendBot: number, n: number, w0: number, w1: number, a: number): Strand[] {
  const out: Strand[] = []
  for (let k = 0; k < n; k++) {
    const f = k / (n - 1)
    const s: P = [start0[0] + (start1[0] - start0[0]) * f, start0[1] + (start1[1] - start0[1]) * f]
    const e: P = [tip0[0] + (tip1[0] - tip0[0]) * f, tip0[1] + (tip1[1] - tip0[1]) * f]
    const dir = Math.sign(e[0] - s[0])
    const bend = bendTop + (bendBot - bendTop) * f
    out.push({ s, c1: [s[0] + dir * pull, s[1] + bend], c2: [e[0] - dir * pull * 0.9, e[1]], e, w: w0 + (w1 - w0) * Math.abs(f - 0.5) * 2, a })
  }
  return out
}
const LEFT = lobe([-60, 40], [120, 640], [700, 236], [700, 292], 280, 30, -260, 26, 34, 60, 0.055)
const RIGHT = lobe([1400, -70], [1400, 330], [675, 92], [675, 150], 320, 40, 30, 16, 40, 70, 0.035)
// stacked sheets: the same centreline stroked at decreasing widths; the round caps of the wide outer sheets overshoot
// the tip and make the layered rounded ends (the "hump" past each tip)
type Sheet = { c: [P, P, P, P]; widths: number[]; ext: number[]; a: number }
const SHEETS: Sheet[] = [
  { c: [[-60, 520], [200, 130], [450, 250], [700, 264]], widths: [150, 124, 100, 80, 66, 54], ext: [110, 60, 25, 0, 0, 0], a: 0.075 },
  { c: [[1410, 30], [1150, 170], [900, 140], [675, 121]], widths: [210, 168, 134, 106, 84, 66], ext: [150, 90, 45, 15, 0, 0], a: 0.07 },
]
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

function Ribbon() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const off = new OffscreenCanvas(W, H); const g = off.getContext('2d')!
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H)
    g.lineCap = 'round'
    for (const sh of SHEETS) sh.widths.forEach((w, i) => {
      // outer sheets run on past the tip along its tangent before their round cap
      const [p2, p3] = [sh.c[2], sh.c[3]]; const dx = p3[0] - p2[0], dy = p3[1] - p2[1], l = Math.hypot(dx, dy)
      g.strokeStyle = `rgba(255,255,255,${sh.a})`; g.lineWidth = w
      g.beginPath(); g.moveTo(...sh.c[0]); g.bezierCurveTo(...sh.c[1], ...sh.c[2], ...sh.c[3])
      g.lineTo(p3[0] + (dx / l) * sh.ext[i], p3[1] + (dy / l) * sh.ext[i]); g.stroke()
    })
    for (const st of [...LEFT, ...RIGHT]) {
      g.strokeStyle = `rgba(255,255,255,${st.a})`; g.lineWidth = st.w
      g.beginPath(); g.moveTo(...st.s); g.bezierCurveTo(...st.c1, ...st.c2, ...st.e); g.stroke()
    }
    const src = g.getImageData(0, 0, W, H).data
    const cv = ref.current!; cv.width = W; cv.height = H
    const o = cv.getContext('2d')!; const img = o.createImageData(W, H); const L = 7
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4; const v = src[i] / 255
      const q = Math.min(L, Math.floor(v * L + BAYER[(y & 3) * 4 + (x & 3)])) / L
      for (let c = 0; c < 3; c++) img.data[i + c] = BG[c] + (FG[c] - BG[c]) * q
      img.data[i + 3] = 255
    }
    o.putImageData(img, 0, 0)
  }, [])
  // 1 CSS px per dither cell: draw the CSS-resolution canvas scaled up without smoothing
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: W, height: H, imageRendering: 'pixelated' }} />
}

const NODES: [number, number, number, number][] = [
  [193, 82, 4.5, 0.85], [552, 272, 5, 0.9], [940, 178, 5.5, 0.9], [1100, 325, 4.5, 0.75], [1230, 335, 3, 0.7], [345, 35, 4, 0.45],
  [240, 365, 3, 0.7], [347, 393, 3, 0.4], [1135, 55, 3, 0.75], [1145, 73, 3, 0.75], [1222, 124, 4, 0.55], [1197, 193, 3, 0.45],
  [82, 285, 4, 0.5], [285, 243, 3, 0.7], [48, 155, 3, 0.45], [67, 130, 3, 0.5], [985, 282, 3, 0.45], [430, 128, 3, 0.35],
]
const DASH: [number, number, number, number, number][] = [
  [628, 52, 752, 328, 0.75], [34, 365, 130, 205, 0.35], [275, 205, 295, 280, 0.4], [50, 108, 85, 155, 0.3], [48, 125, 48, 180, 0.3],
  [1165, 152, 1320, 165, 0.3], [1170, 152, 1215, 238, 0.3], [978, 240, 968, 330, 0.3],
]

export default function FxR4() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#131d18', cornerShape: 'round' } as React.CSSProperties}>
      <Ribbon />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {DASH.map(([x1, y1, x2, y2, a], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8e6de" strokeOpacity={a} strokeWidth="1" strokeDasharray="2 2" />)}
        {[[628, 52], [752, 328]].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y}) rotate(45)`}>
            <rect x={-16} y={-16} width={32} height={32} fill="#131d18" fillOpacity="0.35" stroke="#e8e6de" strokeOpacity="0.6" strokeDasharray="2 2" />
            <rect x={-3.2} y={-3.2} width={6.4} height={6.4} rx="1.2" fill="#f2f1ea" />
          </g>
        ))}
        {NODES.map(([x, y, s, a], i) => <rect key={i} x={-s / 2} y={-s / 2} width={s} height={s} rx={s / 5} fill="#ecebe4" fillOpacity={a} transform={`translate(${x} ${y}) rotate(45)`} />)}
      </svg>
    </div>
  )
}
