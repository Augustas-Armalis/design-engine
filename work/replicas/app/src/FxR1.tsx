// FxR1 (study only, never published): a single-hue light shaft with striations, rim-lit glass nodes casting long
// shadows, and crackling fibre wires. Reference crop: work/replicas/fx/refs/fxr1-ref.png (700x560 CSS at 2x).
// Labels are neutral placeholders; integration glyphs are generic shapes.
// Measured construction (CSS px in the 700x560 frame):
//  - ONE hue. Every pixel is the orange #fe6e2f scaled toward black (R:G:B stays ~255:96:42), so the field is a
//    scalar intensity I(x,y) pushed through a measured tone ramp (LUT below), not a mix of colours.
//  - shaft: a band between x+y=490 and x+y=750 (45 deg, ~184px wide), plateau then ~40px soft edges; intensity falls
//    along the band: L 61-64 at the top-right corner (clipped #fd5d27..#fe6e2f), L 35 at row 150, ~0 by row 300
//  - a second, weaker warm wash from the top-left (#511d0d, L 18.7 at 75,20) and a dark gap between the two (L 8)
//  - streaks: thin lines parallel to the shaft, +-6% intensity, random offsets and lengths
//  - nodes block the light: per-pixel ray march toward the light (+1,-1) gives soft long shadows to the lower-left
//  - node: 159x159 r22, glass fill shows the field at ~45% with a 10px dark grid; 1.5px rim #ffd98a at the top-right
//    corner fading to orange down the right side and left along the top; a blurred orange bloom (~14px) behind the rim
//  - fibres: 1.2px #ff6a2a jagged polylines (2px jitter at ~3px steps over a slow wander) + a 3px blurred copy
import { useEffect, useRef } from 'react'
import '@fontsource-variable/geist'

const W = 700, H = 560
const NODES = [{ x: 88, y: 219.5, w: 159.5, h: 159, r: 22 }, { x: 291, y: 219.5, w: 159.5, h: 159, r: 22 }]
// tone ramp measured on the reference: intensity -> colour (one hue)
const RAMP: [number, [number, number, number]][] = [
  [0, [5, 2, 1]], [0.06, [13, 5, 2]], [0.12, [26, 9, 4]], [0.2, [45, 16, 7]], [0.3, [78, 28, 12]], [0.42, [114, 41, 17]],
  [0.52, [140, 50, 21]], [0.64, [174, 63, 26]], [0.76, [214, 78, 33]], [0.86, [248, 88, 37]], [0.93, [253, 96, 41]], [1, [254, 110, 47]],
]
function lut(i: number): [number, number, number] {
  if (i <= 0) return RAMP[0][1]
  for (let k = 1; k < RAMP.length; k++) if (i <= RAMP[k][0]) {
    const [a, ca] = RAMP[k - 1], [b, cb] = RAMP[k]; const t = (i - a) / (b - a)
    return [ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t]
  }
  return RAMP[RAMP.length - 1][1]
}
const sstep = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
function rng(seed: number) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }
function nodeAt(x: number, y: number) {
  for (let i = 0; i < NODES.length; i++) { const n = NODES[i]; if (x > n.x && x < n.x + n.w && y > n.y && y < n.y + n.h) return i }
  return -1
}

// the scalar light field
function field(x: number, y: number, streak: (s: number) => number) {
  const s = x + y, v = x - y
  // across the shaft: wide soft upper edge (s 250..560), plateau, lower edge s 690..860; a faint second band at s~380
  const across = sstep(250, 560, s) * (1 - sstep(690, 860, s)) + 0.28 * Math.exp(-(((s - 380) / 60) ** 2))
    + (s > 760 ? 0.16 * Math.exp(-(s - 760) / 95) : 0)   // exponential tail under the lower edge
  // along the shaft (measured on the axis s=620): v 620 .97, 520 .86, 420 .66, 320 .50, 220 .40, 160 .30, -80 .06
  // plus a long low tail: the shaft keeps spilling past the nodes to the lower-left (L 5-8 at v -100..-280)
  const along = Math.pow(Math.min(1, Math.max(0, (v + 200) / 820)), 1.4) + 0.11 * Math.exp(-(((v + 170) / 190) ** 2))
  let I = across * along * (1 + streak(s))
  // top-left warm wash (elliptical, falls off by y~150)
  const d = Math.hypot((x - 80) / 1.6, (y + 40))
  I += 0.4 * Math.max(0, 1 - d / 200) ** 1.2
  // shadows: march toward the light (+1,-1); nearer occluders give darker, sharper shadow
  // (glass nodes transmit: a point inside a node is not shadowed by that node)
  let sh = 1; const own = nodeAt(x, y)
  for (let t = 4; t < 260; t += 4) {
    const k = nodeAt(x + t * 0.72, y - t * 0.72)
    if (k >= 0 && k !== own) { sh = Math.min(sh, 0.12 + 0.88 * sstep(40, 260, t)); break }
  }
  return I * sh
}

function Field() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!; const d = 2; cv.width = W * d; cv.height = H * d
    const g = cv.getContext('2d')!
    const R = rng(11)
    const lines = Array.from({ length: 70 }, () => ({ s: 470 + R() * 300, w: 0.6 + R() * 1.6, a: (R() - 0.5) * 0.16 }))
    const streak = (s: number) => { let k = 0; for (const l of lines) { const q = Math.abs(s - l.s); if (q < l.w) k += l.a * (1 - q / l.w) } return k }
    const img = g.createImageData(W * d, H * d)
    for (let py = 0; py < H * d; py++) for (let px = 0; px < W * d; px++) {
      const x = px / d, y = py / d
      const [r, gg, b] = lut(field(x, y, streak))
      const o = (py * W * d + px) * 4
      img.data[o] = r; img.data[o + 1] = gg; img.data[o + 2] = b; img.data[o + 3] = 255
    }
    g.putImageData(img, 0, 0)
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: W, height: H }} />
}

// jagged fibre path through waypoints
function fibre(pts: [number, number][], seed: number, amp = 1.6, step = 2.6) {
  const R = rng(seed); const out: string[] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; const len = Math.hypot(x1 - x0, y1 - y0); const n = Math.max(2, Math.round(len / step))
    const nx = -(y1 - y0) / len, ny = (x1 - x0) / len
    for (let k = i === 0 ? 0 : 1; k <= n; k++) {
      const t = k / n; const j = k === 0 || (k === n && i === pts.length - 2) ? 0 : (R() - 0.5) * 2 * amp
      out.push(`${(x0 + (x1 - x0) * t + nx * j).toFixed(2)} ${(y0 + (y1 - y0) * t + ny * j).toFixed(2)}`)
    }
  }
  return 'M' + out.join(' L')
}
const FIBRES: [number, number][][] = [
  [[0, 300], [40, 299], [85, 299]],
  [[251, 300], [258, 300], [264, 294], [270, 304], [279, 296], [288, 299]],
  [[487, 276], [520, 270], [560, 262], [590, 247], [620, 214], [650, 182], [700, 160]],
  [[487, 318], [520, 326], [560, 345], [600, 376], [626, 396], [652, 412], [700, 430]],
  [[131, 392], [129, 405], [110, 412], [60, 413], [55, 413]],
  [[165, 392], [165, 420], [162, 445], [150, 465], [95, 470], [90, 473]],
  [[199, 392], [199, 440], [200, 480], [190, 505], [152, 512]],
]

export default function FxR1() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#050201', cornerShape: 'round' } as React.CSSProperties}>
      <Field />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <filter id="bloom" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="n" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feDisplacementMap in="b" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="fglow" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.2" /></filter>
          {NODES.map((n, i) => (
            <linearGradient key={i} id={`rim${i}`} gradientUnits="userSpaceOnUse" x1={n.x + n.w} y1={n.y} x2={n.x + n.w * 0.2} y2={n.y + n.h}>
              <stop offset="0" stopColor="#ffe09a" />
              <stop offset="0.28" stopColor="#ffb06a" />
              <stop offset="0.55" stopColor="#ff6a2a" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ff6a2a" stopOpacity="0.08" />
            </linearGradient>
          ))}
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#140805" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#0a0402" stopOpacity="0.6" />
            <stop offset="1" stopColor="#070301" stopOpacity="0.8" />
          </linearGradient>
          <pattern id="grid10" width="10" height="10" patternUnits="userSpaceOnUse" x="0.5" y="0.5">
            <path d="M0 0H10M0 0V10" stroke="#0b0402" strokeOpacity="0.75" strokeWidth="1" fill="none" />
          </pattern>
          <radialGradient id="disc" cx="0.62" cy="0.7" r="0.7">
            <stop offset="0" stopColor="#2a1008" />
            <stop offset="1" stopColor="#0c0503" />
          </radialGradient>
        </defs>
        {/* bloom behind the rims (top + right edge, flame-like) */}
        {NODES.map((n, i) => (
          <path key={i} d={`M ${n.x + 10} ${n.y + 2} H ${n.x + n.w - n.r} Q ${n.x + n.w} ${n.y} ${n.x + n.w} ${n.y + n.r} V ${n.y + 80}`} stroke="#ff6a2a" strokeWidth="14" fill="none" opacity="0.75" filter="url(#bloom)" />
        ))}
        {NODES.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.r} fill="url(#glass)" />
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.r} fill="url(#grid10)" />
            <rect x={n.x + 0.75} y={n.y + 0.75} width={n.w - 1.5} height={n.h - 1.5} rx={n.r - 0.75} fill="none" stroke={`url(#rim${i})`} strokeWidth="1.5" />
            <text x={n.x + n.w / 2} y={n.y + 88} textAnchor="middle" fontFamily="Geist Variable, Inter Variable, sans-serif" fontSize="21" fontWeight="500" letterSpacing="0.6" fill="#d9703f" style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.85))' }}>{i ? 'Router' : 'Intake'}</text>
          </g>
        ))}
        {/* pills */}
        {[[418, 263, 'Start'], [418, 305, 'Route']].map(([x, y, t]) => (
          <g key={t as string}>
            <rect x={x as number} y={y as number} width={69} height={29.5} rx={14.75} fill="#120805" stroke="#3b1a0d" />
            <text x={(x as number) + 34.5} y={(y as number) + 19.5} textAnchor="middle" fontFamily="Geist Variable, sans-serif" fontSize="12.5" fill="#e07a45" letterSpacing="0.4">{t}</text>
          </g>
        ))}
        {/* fibres: glow copy then the crisp wire */}
        {FIBRES.map((p, i) => <path key={'g' + i} d={fibre(p, 20 + i)} stroke="#ff5a1e" strokeWidth="2.4" fill="none" opacity="0.35" filter="url(#fglow)" />)}
        {FIBRES.map((p, i) => <path key={i} d={fibre(p, 20 + i)} stroke="#ff6a2a" strokeWidth="1.1" fill="none" strokeLinejoin="round" />)}
        {/* ports */}
        {[[86, 299], [249, 299], [288, 299]].map(([x, y]) => <g key={x}><circle cx={x} cy={y} r={6} fill="#170905" stroke="#5a2410" /><circle cx={x} cy={y} r={3.4} fill="#ff5f28" /></g>)}
        {/* small icon buttons under the first node */}
        {[131, 165, 199].map((x) => <circle key={x} cx={x} cy={379} r={13.5} fill="#120805" stroke="#3a1a0e" />)}
        {/* integration discs: dark, lit from the lower-right by the wire glow */}
        {[[32, 413], [68, 474], [128, 512]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={23.5} fill="url(#disc)" stroke="#7a3016" strokeOpacity="0.8" />
            <rect x={x - 8} y={y - 8} width={16} height={16} rx={4} fill="none" stroke="#b9532a" strokeWidth="1.6" />
          </g>
        ))}
      </svg>
    </div>
  )
}
