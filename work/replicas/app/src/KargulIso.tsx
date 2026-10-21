// Pixel replica of Kargul Studio's "Branding" services-bento cell (knowledge/benchmarks/bento/kargul-services-bento.png,
// 2880x1920 @2x; cell at css 109,80 391x434 on #232323, cell #313131). Construction measured from the 2x crop:
// - flat zero-thickness sheets (no side faces, no shading); top sheet 133x98 painted darker than the cell so it occludes
// - lower sheet: same footprint 36 below, carries the textures (hatch, letter outline, grain, text rows)
// - satellite sheet behind at plane x 64..137, y -46..0 with a grey copy of the mark
// - diamond nodes (half-width 4.5): light on the top sheet, mid-grey below
// - every sheet edge extended as a faint dashed guide to the cell edges
// - ONE solid white mark: four stadium pills, thickness 10, along the plane x axis
// Study only (his copy kept so the whole cell registers); our scenes swap the mark, title and textures.
const W = 1440, H = 960
const C30 = 0.866, S30 = 0.5
type P = [number, number]
const pr = (o: P, x: number, y: number, z = 0): P => [o[0] + (x - y) * C30, o[1] + (x + y) * S30 - z]
const poly = (pts: P[]) => 'M' + pts.map((p) => p.map((n) => n.toFixed(2)).join(' ')).join('L') + 'Z'
const quad = (o: P, x: number, y: number, z: number, w: number, d: number): P[] => [pr(o, x, y, z), pr(o, x + w, y, z), pr(o, x + w, y + d, z), pr(o, x, y + d, z)]
const node = (p: P, s = 4.5) => poly([[p[0], p[1] - s * 0.58], [p[0] + s, p[1]], [p[0], p[1] + s * 0.58], [p[0] - s, p[1]]])
const seg = (a: P, b: P) => `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`

const O: P = [325, 117] // top sheet's top corner
const TW = 133, TD = 98, LZ = -36
const EDGE = 'rgb(255 255 255 / 0.62)', DIM = 'rgb(255 255 255 / 0.3)', GUIDE = 'rgb(255 255 255 / 0.14)', TEX = 'rgb(255 255 255 / 0.2)'

/** dashed guides: each edge of a sheet extended L beyond both ends */
function Guides({ x, y, z, w, d, L = 420 }: { x: number; y: number; z: number; w: number; d: number; L?: number }) {
  const lines: [number, number, number, number][] = [[x - L, y, x + w + L, y], [x - L, y + d, x + w + L, y + d], [x, y - L, x, y + d + L], [x + w, y - L, x + w, y + d + L]]
  return <>{lines.map(([a, b, c, e], i) => <path key={i} d={seg(pr(O, a, b, z), pr(O, c, e, z))} stroke={GUIDE} strokeDasharray="3 3" />)}</>
}

/** the mark, solved from his crop into plane coords: two short pills on the middle row, a long pill above and below,
 * every pill's long axis on the plane x axis (r 5.5, short 15.4, long 29.4) */
function Mark({ cx, cy, s = 1, z = 0, fill }: { cx: number; cy: number; s?: number; z?: number; fill: string }) {
  const r = 5.5 * s
  const pill = (px: number, py: number, len: number) => {
    const x0 = cx + px * s - (len * s) / 2, y0 = cy + py * s - r, L = len * s, pts: P[] = []
    for (let k = 0; k <= 12; k++) { const a = -Math.PI / 2 + (k / 12) * Math.PI; pts.push(pr(O, x0 + L - r + Math.cos(a) * r, y0 + r + Math.sin(a) * r, z)) }
    for (let k = 0; k <= 12; k++) { const a = Math.PI / 2 + (k / 12) * Math.PI; pts.push(pr(O, x0 + r + Math.cos(a) * r, y0 + r + Math.sin(a) * r, z)) }
    return <path d={poly(pts)} />
  }
  return <g fill={fill}>{pill(-18.2, 0, 15.4)}{pill(0, -11.8, 29.4)}{pill(0, 11.8, 29.4)}{pill(18.2, 0, 15.4)}</g>
}

const TAGS = [['FIGMA', 'ILLUSTRATOR', 'LOGO', 'BRAND PORTAL'], ['TYPOGRAPHY', 'PITCH DECKS', 'COLOR SYSTEMS']]

export default function KargulIso() {
  const low = quad(O, 0, 0, LZ, TW, TD)
  return (
    <div style={{ width: W, height: H, background: '#232323', position: 'relative', fontFamily: '"Inter Variable", system-ui, sans-serif' }}>
      <div data-subject style={{ position: 'absolute', left: 109, top: 80, width: 391, height: 434, background: '#313131', borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 23.5, top: 17, color: '#f2f2f2', fontSize: 18.5, fontWeight: 650, letterSpacing: '-0.02em' }}>Branding</div>
        <p style={{ position: 'absolute', left: 23.5, top: 223, width: 342, margin: 0, color: '#9b9b9b', fontSize: 14.3, lineHeight: '22px', letterSpacing: '0.005em' }}>
          We build complete brand identities; Logo, color systems, typography, and visual language that stays consistent everywhere, all handed off through a clean brand portal your whole team can access instantly.
        </p>
        {TAGS.map((row, r) => (
          <div key={r} style={{ position: 'absolute', left: 23.5, top: 358.5 + r * 34, display: 'flex', gap: 5 }}>
            {row.map((t) => <span key={t} style={{ height: 25, display: 'flex', alignItems: 'center', padding: '0 12px', borderRadius: 99, background: '#272727', color: '#ececec', fontSize: 10, fontWeight: 650, letterSpacing: '0.01em' }}>{t}</span>)}
          </div>
        ))}
      </div>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <defs>
          <clipPath id="cell"><rect x="109" y="80" width="391" height="434" rx="18" /></clipPath>
          <clipPath id="grain"><path d={poly(quad(O, 70, 52, LZ, 56, 40))} /></clipPath>
          <clipPath id="hatch"><path d={poly(quad(O, 4, 6, LZ, 62, 86))} /></clipPath>
          <filter id="kg" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 -0.32" /></filter>
        </defs>
        <g clipPath="url(#cell)">
          <Guides x={0} y={0} z={LZ} w={TW} d={TD} />
          <Guides x={0} y={0} z={0} w={TW} d={TD} />
          {/* lower sheet + textures */}
          <path d={poly(low)} fill="#303030" stroke={DIM} />
          <g clipPath="url(#hatch)">
            {Array.from({ length: 40 }, (_, i) => <path key={i} d={seg(pr(O, 4, 6 + i * 2.2, LZ), pr(O, 66, 6 + i * 2.2, LZ))} stroke={TEX} strokeWidth="0.8" />)}
          </g>
          {/* outlined letter "G" laid flat */}
          <path d={(() => { const pts: P[] = []; for (let k = 0; k <= 24; k++) { const a = 0.35 * Math.PI + (k / 24) * 1.45 * Math.PI; pts.push(pr(O, 30 + Math.cos(a) * 13, 70 + Math.sin(a) * 13, LZ)) } return 'M' + pts.map((p) => p.join(' ')).join('L') })()} fill="none" stroke="rgb(255 255 255 / 0.32)" strokeWidth="4.5" />
          <path d={poly(quad(O, 32, 68, LZ, 10, 8))} fill="none" stroke="rgb(255 255 255 / 0.4)" />
          <rect x={0} y={0} width={W} height={H} fill="#fff" filter="url(#kg)" clipPath="url(#grain)" opacity="0.55" />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={seg(pr(O, 76, 18 + i * 4, LZ), pr(O, 122, 18 + i * 4, LZ))} stroke={TEX} />)}
          {[0, 1, 2].map((i) => <path key={i} d={seg(pr(O, 30, 74 + i * 5, LZ), pr(O, 62, 74 + i * 5, LZ))} stroke={TEX} />)}
          {low.map((p, i) => <path key={i} d={node(p)} fill="#6b6b6b" />)}
          {/* satellite sheet behind, grey mark */}
          <path d={poly(quad(O, 64, -46, 0, 73, 46))} fill="#2c2c2c" stroke={DIM} />
          <Mark cx={101} cy={-23} s={0.78} fill="rgb(255 255 255 / 0.36)" />
          {/* top sheet with the one solid mark */}
          <path d={poly(quad(O, 0, 0, 0, TW, TD))} fill="#2a2a2a" stroke={EDGE} />
          <Mark cx={43.7} cy={48.6} fill="#ffffff" />
          {quad(O, 0, 0, 0, TW, TD).map((p, i) => <path key={i} d={node(p)} fill="#e2e2e2" />)}
        </g>
      </svg>
    </div>
  )
}
