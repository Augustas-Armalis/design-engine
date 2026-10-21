// Pixel replica (study only, never shipped) of Kargul Studio's Chatsheet hero, rebuilt 2026-10-21 against the design
// original knowledge/benchmarks/chatsheet-live/hero-fold-1440@2x.png (2880x2070 = 1440x1035 CSS), not the 0.88x video.
// Every number below is CSS px at 1440, measured with tools/probe.mjs + scratch edge scans (see KARGUL-HERO-NOTES.md).
// Fonts: Lora Variable stands in for the unknown text serif (x/cap 0.71, CSL-07), Inter Variable for the sans.
// Scene: one iso plan frame (screen x = (u-v)*sqrt3/2, y = (u+v)/2 - z) for tiles, cards and pills; the coin is a
// screen ellipse with ry/rx 0.575 (true iso). Brand glyphs are rough study approximations drawn here.
import '@fontsource-variable/lora/wght.css'
import type { ReactNode } from 'react'

type P = [number, number]
const S3 = Math.sqrt(3) / 2
const INK = '#0c1833', GREY = '#525b6e', BLUE = '#3d79fe', GROUND = '#f5f6f7', HAIR = '#dee0e3'
const SERIF = '"Lora Variable", Georgia, serif', SANS = '"Inter Variable", system-ui, sans-serif'

/* ---------- projection ---------- */
/** plan (u, v) at height z -> screen. u runs down-right, v down-left; both at unit screen length (true iso). */
const iso = (u: number, v: number, z = 0): P => [S3 * (u - v), (u + v) / 2 - z]
/** local frame lying in the plan, origin at screen (x, y): local x reads up-right (-v), local y runs down-right (+u) */
const inPlane = (x: number, y: number) => `matrix(${S3} -0.5 ${S3} 0.5 ${x} ${y})`
const toLocal = (lx: number, ly: number, x: number, y: number): P => [x + S3 * (lx + ly), y + 0.5 * (ly - lx)]

/* ---------- geometry helpers ---------- */
/** rounded rect outline (local coords, centred), sampled */
function rrect(w: number, h: number, r: number, n = 10): P[] {
  const pts: P[] = []
  const cs: [number, number, number][] = [[w / 2 - r, -h / 2 + r, -90], [w / 2 - r, h / 2 - r, 0], [-w / 2 + r, h / 2 - r, 90], [-w / 2 + r, -h / 2 + r, 180]]
  for (const [cx, cy, a0] of cs) for (let i = 0; i <= n; i++) { const a = ((a0 + (90 * i) / n) * Math.PI) / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]) }
  return pts
}
function hull(ps: P[]): P[] {
  const p = [...ps].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cr = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lo: P[] = [], up: P[] = []
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q) }
  for (const q of [...p].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q) }
  return [...lo.slice(0, -1), ...up.slice(0, -1)]
}
const d = (pts: P[]) => 'M' + pts.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join('L') + 'Z'
const shift = (pts: P[], dx: number, dy: number): P[] => pts.map(([x, y]) => [x + dx, y + dy])

/** extruded convex slab: top outline (screen), extrusion vector (dx, dy); silhouette carries the side + outer contour */
function Slab({ top, dx = 0, dy, side, face, stroke = BLUE, sw = 1, children, clipId }: { top: P[]; dx?: number; dy: number; side: string; face: string; stroke?: string; sw?: number; children?: ReactNode; clipId?: string }) {
  const sil = hull([...top, ...shift(top, dx, dy)])
  return (
    <g>
      <path d={d(sil)} fill={side} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <path d={d(top)} fill={face} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      {clipId && <clipPath id={clipId}><path d={d(top)} /></clipPath>}
      {children && <g clipPath={clipId ? `url(#${clipId})` : undefined}>{children}</g>}
    </g>
  )
}

/* ---------- brand-like glyphs (study approximations), drawn in a 40x40 local box centred on 0 ---------- */
const G = {
  youtube: <g><rect x="-13" y="-9" width="26" height="18" rx="5.5" fill="#ed1d24" /><path d="M-3.6 -4.6v9.2l8 -4.6z" fill="#fff" /></g>,
  gmail: (
    <g transform="scale(1.05)">
      <path d="M-15 -7l7 -3v17h-7z" fill="#4285f4" transform="translate(0 2)" />
      <path d="M-15 -5 0 6 15 -5V-9l-15 11-15 -11z" fill="#ea4335" />
      <path d="M8 -9l7 -3v19h-7z" fill="#34a853" transform="translate(0 4)" />
      <path d="M8 -6l7 -5v2l-7 5z" fill="#fbbc04" />
      <path d="M-15 -9l7 5v2l-7 -5z" fill="#c5221f" />
    </g>
  ),
  drive: (
    <g transform="scale(1.05)">
      <path d="M-5 -12h10l10 17h-10z" fill="#ffba00" />
      <path d="M-5 -12l-10 17 5 8 10 -17z" fill="#00ac47" />
      <path d="M-10 13h20l5 -8h-20z" fill="#2684fc" />
      <path d="M5 5h10l-5 8z" fill="#ea4335" />
    </g>
  ),
  sheets: <g><path d="M-9 -12h12l6 6v18h-18z" fill="#34a853" /><path d="M3 -12l6 6h-6z" fill="#188038" /><rect x="-5.5" y="-1" width="11" height="8" fill="#fff" /><path d="M-5.5 3h11M0 -1v8" stroke="#34a853" strokeWidth="1.5" /></g>,
  excel: (
    <g transform="scale(1.1)">
      <rect x="-12" y="-11" width="24" height="22" rx="2" fill="#21a366" />
      <rect x="0" y="-11" width="12" height="11" fill="#33c481" />
      <rect x="0" y="0" width="12" height="11" fill="#107c41" />
      <rect x="-16" y="-5" width="13" height="13" rx="1.5" fill="#185c37" />
      <path d="M-12.7 -1.8l6.4 8.6M-6.3 -1.8l-6.4 8.6" stroke="#fff" strokeWidth="1.9" />
    </g>
  ),
  pdf: (
    <g fill="none" stroke="#ec4b52" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M-11 -13h15l7 7v19h-22z" /><path d="M4 -13v7h7" />
      <path d="M-5 7c3 -5 5 -10 5 -14 0 -2 -2 -2 -2 0 0 4 4 9 9 11 2 1 2 -1 0 -1 -5 0 -10 2 -13 5 -1 2 1 2 2 0z" strokeWidth="1.1" />
    </g>
  ),
  linkedin: (
    <g transform="scale(1.3)"><rect x="-11" y="-11" width="22" height="22" rx="3.5" fill="#0a66c2" /><rect x="-7.4" y="-2.4" width="3.4" height="9.6" fill="#fff" /><circle cx="-5.7" cy="-5.9" r="2" fill="#fff" /><path d="M-1.6 -2.4h3.2v1.4c.7-1.1 1.9-1.7 3.2-1.7 2.6 0 3.3 1.6 3.3 4.2v5.7H4.8V2.2c0-1.3-.2-2.2-1.5-2.2s-1.7 1-1.7 2.2v5H-1.6z" fill="#fff" /></g>
  ),
  aws: (
    <g>
      <text x="0" y="3" textAnchor="middle" fontFamily={SANS} fontWeight="600" fontSize="17" fill="#232f3e" letterSpacing="-0.02em">aws</text>
      <path d="M-13 7c8 5 18 5 25 0" stroke="#ff9900" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M9 4.5l4 2.3-3 3" stroke="#ff9900" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  ),
  slack: (
    <g transform="scale(1.25)">
      {([[0, '#36c5f0'], [90, '#2eb67d'], [180, '#ecb22e'], [270, '#e01e5a']] as const).map(([r, c]) => (
        <g key={r} transform={`rotate(${r})`}><rect x="-4.4" y="-14" width="4.6" height="11.4" rx="2.3" fill={c} /><rect x="1.8" y="-14" width="4.6" height="4.6" rx="2.3" fill={c} /></g>
      ))}
    </g>
  ),
}

/* ---------- floor tile: iso rounded square, top-face centre (cx, cy), side t ---------- */
function Tile({ c, s, r, t, glyph, gs = 1, id }: { c: P; s: number; r: number; t: number; glyph: ReactNode; gs?: number; id: string }) {
  const top = rrect(s, s, r).map(([x, y]) => toLocal(x, y, c[0], c[1]))
  return (
    <g>
      <path d={d(shift(top, 7, 7))} fill="#e6eaf7" opacity="0.55" filter="url(#kblur3)" />
      <Slab top={top} dy={t} side={`url(#kside)`} face="#fff" clipId={id}>
        <rect x={c[0] - s} y={c[1] - s} width={2 * s} height={2 * s} fill="url(#kgrain)" />
      </Slab>
      <g transform={inPlane(c[0], c[1])}><g transform={`scale(${gs})`}>{glyph}</g></g>
    </g>
  )
}

/* ---------- workflow card: plan rect u0..u1 x v0..v1 (v0 far end), radius r, side 3 ---------- */
function Card({ u0, u1, v0, v1, r, id, children, fade, face = 'url(#kcard)', stroke = '#5f90fd' }: { u0: number; u1: number; v0: number; v1: number; r: number; id: string; children?: ReactNode; fade?: string; face?: string; stroke?: string }) {
  const cu = (u0 + u1) / 2, cv = (v0 + v1) / 2
  const [cx, cy] = iso(cu, cv)
  // local frame: lx = -(v - cv), ly = u - cu  -> rect width along v, height along u
  const top = rrect(v1 - v0, u1 - u0, r, 14).map(([x, y]) => toLocal(x, y, cx, cy))
  return (
    <g mask={fade}>
      <Slab top={top} dy={3} side="url(#kcardside)" face={face} stroke={stroke} clipId={id}>
        <g transform={inPlane(cx, cy)}>{children}</g>
      </Slab>
    </g>
  )
}
/** grid + icons inside a card, in card-local coords (x along -v from centre, y along +u from centre) */
function Sheet({ L, W, icons, glyph, op = 1 }: { L: number; W: number; icons: number; glyph: ReactNode; op?: number }) {
  const rows = [-W / 2 + 34.5, -W / 2 + 59.5, -W / 2 + 84.5, -W / 2 + 109.5, -W / 2 + 134.5]
  const near = -L / 2 // near end at local x = -L/2
  const cols = [near + 49, near + 109, near + 169]
  return (
    <g>
      {rows.map((y) => <line key={y} x1={near} x2={L / 2} y1={y} y2={y} stroke="#dde7ff" strokeWidth="0.6" />)}
      {cols.map((x) => <line key={x} x1={x} x2={x} y1={-W / 2} y2={W / 2} stroke="#dde7ff" strokeWidth="0.6" />)}
      {Array.from({ length: icons }, (_, i) => (
        <g key={i} opacity={op} transform={`translate(${near + 28.5} ${-W / 2 + 23 + 25.2 * i}) scale(0.5)`}>{glyph}</g>
      ))}
    </g>
  )
}
/** raised pill label: stadium along v, centre (uc, vm), cap-centre span len, half width h, text in plane */
function Pill({ uc, va, vb, h, label, fill = BLUE, plate = '#e1eaff', fs = 13.3, tx = 6.5 }: { uc: number; va: number; vb: number; h: number; label: string; fill?: string; plate?: string; fs?: number; tx?: number }) {
  const vm = (va + vb) / 2, len = vb - va
  const [cx, cy] = iso(uc, vm)
  const top = rrect(len + 2 * h, 2 * h, h, 14).map(([x, y]) => toLocal(x, y, cx, cy))
  return (
    <g>
      <path d={d(shift(top, 0, 11))} fill={plate} filter="url(#kblur1)" />
      <Slab top={top} dy={2} side={fill} face={fill} stroke="none" />
      <g transform={inPlane(cx, cy)}>
        <text x={tx} y={fs * 0.36 + 2.5} textAnchor="middle" fontFamily={SANS} fontWeight="500" fontSize={fs} fill="#fff" letterSpacing="0.01em">{label}</text>
      </g>
    </g>
  )
}

/* ---------- coin ---------- */
const CX = 722.25, CY = 633.25, RX = 121.75, K = 0.575, RY = RX * K, HF = 29.75, HT = 9, HB = 25.25
const ell = (a: number, z = 0): P => [CX + RX * Math.cos((a * Math.PI) / 180), CY + RY * Math.sin((a * Math.PI) / 180) + z]
const sideBand = (a0: number, a1: number, h: number) => {
  const [p0, p1, q1, q0] = [ell(a0), ell(a1), ell(a1, h), ell(a0, h)]
  return `M${p0}A${RX} ${RY} 0 0 1 ${p1}L${q1}A${RX} ${RY} 0 0 0 ${q0}Z`
}
const A1 = 164.4, A2 = 115.4 // notch: only the top plate exists between these angles (front-left)
const arc = (r: number, a0: number, a1: number) => {
  const p = (a: number) => `${(r * Math.cos((a * Math.PI) / 180)).toFixed(3)} ${(r * Math.sin((a * Math.PI) / 180)).toFixed(3)}`
  return `M${p(a0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`
}
function Grooves({ color, dy = 0 }: { color: string; dy?: number }) {
  // groove 1: r 76.5..97 (mid 86.75), bridge at the back (top); groove 2: r 39.5..60.5 (mid 50), bridge at the front
  const g1 = (Math.asin(14.75 / 86.75) * 180) / Math.PI, g2 = (Math.asin(14.75 / 50) * 180) / Math.PI
  return (
    <g transform={`translate(0 ${dy / K})`}>
      <path d={arc(86.75, -90 + g1, 270 - g1)} stroke={color} strokeWidth="20.5" strokeLinecap="round" fill="none" />
      <path d={arc(50, 90 + g2, 450 - g2)} stroke={color} strokeWidth="21" strokeLinecap="round" fill="none" />
      <circle r="22.5" fill={color} />
    </g>
  )
}
const SPARK: P[] = [[657, 555], [720, 551], [762, 551], [690, 571], [655, 586], [733, 576], [767, 584], [820, 591], [638, 605], [679, 616], [709, 606], [759, 622], [801, 619], [682, 631], [722, 640], [754, 647], [646, 660], [770, 659], [608, 575], [800, 572], [701, 667]]
function Coin() {
  const [pa1] = [ell(A1)]
  return (
    <g>
      {/* cut face at the notch start, lit brand blue */}
      <path d={`M${pa1[0]} ${pa1[1] + HT}L${pa1[0]} ${pa1[1] + HB}L${CX} ${CY + HB}L${CX} ${CY + HT}Z`} fill={BLUE} />
      <path d={sideBand(0, A2, HF)} fill={INK} />
      <path d={sideBand(A1, 180, HF)} fill={INK} />
      <path d={sideBand(0, 180, HT)} fill={INK} />
      <g transform={`matrix(1 0 0 ${K} ${CX} ${CY})`}>
        <circle r={RX} fill="url(#krim)" />
        <circle r="97" fill="url(#kring)" />
        <mask id="kgroove" maskUnits="userSpaceOnUse" x="-130" y="-130" width="260" height="260"><Grooves color="#fff" /></mask>
        <Grooves color="#3972ef" />
        <g mask="url(#kgroove)"><Grooves color={BLUE} dy={4.5} /></g>
        <circle r={RX} fill="none" stroke={BLUE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </g>
      {SPARK.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.15 : 0.85} fill="#fff" opacity={i % 4 === 1 ? 0.6 : 0.95} />)}
    </g>
  )
}

/* ---------- standing plates (Slack, PDF glass) fitted by axis vectors ---------- */
function Plate({ c, ex, ey, t, glyph, glass = false, gk = 22, id }: { c: P; ex: P; ey: P; t: P; glyph: ReactNode; glass?: boolean; gk?: number; id: string }) {
  const gm = `matrix(${ex[0] / gk} ${ex[1] / gk} ${ey[0] / gk} ${ey[1] / gk} ${c[0]} ${c[1]})`
  const m = (x: number, y: number): P => [c[0] + ex[0] * x + ey[0] * y, c[1] + ex[1] * x + ey[1] * y]
  const top = rrect(2, 2, 0.42, 12).map(([x, y]) => m(x, y))
  const back = shift(top, t[0], t[1])
  const stroke = glass ? '#b3c8fd' : '#a9c1fd'
  return (
    <g>
      <path d={d(hull([...top, ...back]))} fill={glass ? 'rgb(255 255 255 / 0.35)' : '#eef3ff'} stroke={stroke} strokeWidth={glass ? 1.5 : 1.1} />
      <path d={d(top)} fill={glass ? 'rgb(255 255 255 / 0.45)' : '#fff'} stroke={stroke} strokeWidth={glass ? 1.5 : 1.1} />
      <clipPath id={id}><path d={d(top)} /></clipPath>
      {!glass && <g clipPath={`url(#${id})`}><rect x={c[0] - 60} y={c[1] - 60} width="120" height="120" fill="url(#kgrain)" /></g>}
      <g transform={gm}>{glyph}</g>
    </g>
  )
}

function Mark({ s = 1 }: { s?: number }) {
  const a = (r: number, a0: number, a1: number) => arc(r, a0, a1)
  return (
    <g transform={`scale(${s})`} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round">
      <path d={a(11.5, -24, 304)} />
      <path d={a(6.5, 150, 470)} />
      <circle r="2.75" fill={BLUE} stroke="none" />
    </g>
  )
}

export default function KargulHero() {
  const c1 = { u0: 992.6, u1: 1143.1, v0: -38.4, v1: 162 }
  const c2 = { u0: 994.2, u1: 1143.1, v0: -256, v1: -54.7 }
  const c3 = { u0: 988.5, u1: 1132.4, v0: -475, v1: -273.5 }
  return (
    <div style={{ width: 1440, height: 1035, position: 'relative', overflow: 'hidden', background: GROUND, fontFamily: SANS }}>
      <svg width="1440" height="1017" viewBox="0 0 1440 1017" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden="true">
        <defs>
          <filter id="kblur1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2" /></filter>
          <filter id="kblur3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="kblur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6" /></filter>
          <radialGradient id="kglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#dbe4f9" /><stop offset="0.55" stopColor="#e6ecf9" stopOpacity="0.7" /><stop offset="1" stopColor="#eef1f8" stopOpacity="0" /></radialGradient>
          <radialGradient id="kglow2" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#d6e2fc" stopOpacity="0.95" /><stop offset="0.6" stopColor="#dfe8fc" stopOpacity="0.55" /><stop offset="1" stopColor="#e6edfc" stopOpacity="0" /></radialGradient>
          <linearGradient id="krim" x1="0.7" y1="0.05" x2="0.3" y2="0.95"><stop offset="0" stopColor="#bfd3ff" /><stop offset="0.45" stopColor="#dde8ff" /><stop offset="1" stopColor="#fdfeff" /></linearGradient>
          <linearGradient id="kring" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#c2d5ff" /><stop offset="1" stopColor="#a9c3fe" /></linearGradient>
          <linearGradient id="kside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#eef3ff" /><stop offset="1" stopColor="#d3e0ff" /></linearGradient>
          <linearGradient id="kcardside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#eef3ff" /><stop offset="1" stopColor="#b3caff" /></linearGradient>
          <linearGradient id="kcard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eaf0ff" /><stop offset="0.55" stopColor="#fff" /></linearGradient>
          <linearGradient id="kbeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity="0.75" /></linearGradient>
          <linearGradient id="kpill2" x1="0" y1="0" x2="1" y2="0"><stop offset="0.25" stopColor="#3d79fe" /><stop offset="1" stopColor="#6e9bfe" /></linearGradient>
          <pattern id="kgrain" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.5" r="0.55" fill="#dfe8ff" /><circle cx="4.6" cy="3.1" r="0.5" fill="#e6edff" /><circle cx="2.8" cy="5.6" r="0.5" fill="#e3ebff" /><circle cx="6.2" cy="6.3" r="0.45" fill="#e9f0ff" />
          </pattern>
          <linearGradient id="kfadeg" x1="1150" y1="430" x2="1290" y2="300" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient>
          <mask id="kfade" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="1017"><rect width="1440" height="1017" fill="url(#kfadeg)" /></mask>
          <linearGradient id="kfadeg2" x1="1150" y1="0" x2="1215" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0.55" /></linearGradient>
        </defs>

        {/* floor light (CSL-14) */}
        <ellipse cx="722.5" cy="677" rx="243.5" ry="139" fill="#f7f8f9" />
        <ellipse cx="722.5" cy="677" rx="186.5" ry="106.5" fill="#fbfbfc" />
        <ellipse cx="712" cy="585" rx="190" ry="125" fill="url(#kglow)" />
        <ellipse cx="722.5" cy="676" rx="129" ry="70" fill="#eaeffc" filter="url(#kblur1)" />

        {/* light columns over the standing plates */}
        <rect x="107.5" y="555" width="65" height="85" fill="url(#kbeam)" />
        <path d="M212 562L287 572V700H212Z" fill="url(#kbeam)" />

        {/* dashed connectors in brand blue (CSL-17) */}
        <g fill="none" stroke={BLUE} strokeWidth="0.9" strokeDasharray="4 4" opacity="0.75">
          <path d="M0 712.5C30 698 75 676 108 660S165 625 190 626S240 640 280 660S360 700 400 720S480 765 525 763S580 748 605 735" />
          <path d="M220 957.5L605 735" />
          <path d="M640 750V895" />
          <path d="M612 940L480 1017" />
          <path d="M615 733L668 707M622 740L672 712" />
        </g>

        {/* blurred far plate */}
        <g filter="url(#kblur6)" opacity="0.85"><Plate id="p-far" c={[202.4, 475]} ex={[15.3, -13.5]} ey={[5.9, 20.9]} t={[3, 1.5]} glyph={<ellipse rx="7" ry="11" fill="#5b8cff" />} gk={16} /></g>

        {/* tiles, back to front */}
        <Tile id="t-aws" c={[34.5, 682.2]} s={44.5} r={9} t={5.6} glyph={G.aws} gs={0.95} />
        <Tile id="t-yt" c={[373.5, 705.2]} s={44.5} r={9} t={5.6} glyph={G.youtube} gs={0.95} />
        <Tile id="t-drive" c={[608, 725.6]} s={52.3} r={10.5} t={6.8} glyph={G.drive} gs={1.22} />
        <Tile id="t-gmail" c={[478, 802.6]} s={52.3} r={10.5} t={6.8} glyph={G.gmail} gs={1.05} />
        <Tile id="t-sheets" c={[646.25, 815.3]} s={44.8} r={9} t={5.4} glyph={G.sheets} gs={0.95} />
        <Tile id="t-excel" c={[370.75, 859]} s={52} r={10.5} t={7} glyph={G.excel} gs={1.05} />
        <Tile id="t-pdf" c={[248, 934.6]} s={52.3} r={10.5} t={6.8} glyph={G.pdf} gs={1.05} />
        <Tile id="t-li" c={[612.5, 919.4]} s={57.6} r={11.5} t={7.7} glyph={G.linkedin} gs={1.15} />

        {/* standing plates */}
        <Plate id="p-slack" c={[140, 677.5]} ex={[27, -15]} ey={[5.5, 37.5]} t={[4, 2]} glyph={G.slack} gk={27} />
        <Plate id="p-pdf" c={[250, 685.5]} ex={[24, 1]} ey={[11.5, 25.5]} t={[3.5, -2.5]} glyph={G.pdf} gk={23} glass />

        {/* workflow cards (CSL-12), far to near */}
        <Card {...c3} r={19} id="c3" fade="url(#kfade)" face="#fafbfb" stroke="#97b6fb">
          <Sheet op={0.5} L={c3.v1 - c3.v0} W={c3.u1 - c3.u0} icons={5} glyph={G.sheets} />
        </Card>
        <g mask="url(#kfade)"><Pill uc={1100} va={-445} vb={-335} h={17} label="Personalize" fill="#b1c9fe" plate="#f0f4ff" /></g>
        <Card {...c2} r={19} id="c2">
          <Sheet L={c2.v1 - c2.v0} W={c2.u1 - c2.u0} icons={0} glyph={G.pdf} />
          {[G.drive, G.youtube, G.pdf, G.linkedin, G.pdf].map((g, i) => (
            <g key={i} transform={`translate(${-(c2.v1 - c2.v0) / 2 + 28.5} ${-(c2.u1 - c2.u0) / 2 + 23 + 25.2 * i}) scale(0.5)`}>{g}</g>
          ))}
        </Card>
        <Pill uc={1106} va={-258.8} vb={-155} h={17.25} label="Strategy Content" fill="url(#kpill2)" />
        <Card {...c1} r={16} id="c1">
          <Sheet L={c1.v1 - c1.v0} W={c1.u1 - c1.u0} icons={0} glyph={G.pdf} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${-(c1.v1 - c1.v0) / 2 + 28.5} ${-(c1.u1 - c1.u0) / 2 + 23 + 25.2 * i}) scale(0.5)`}>{G.pdf}</g>
          ))}
        </Card>
        <Pill uc={1102} va={-47.2} vb={68.25} h={17.25} label="Automation Action" />

        <ellipse cx="735" cy="603" rx="150" ry="72" fill="url(#kglow2)" />
        <Coin />
      </svg>

      {/* frame: rails, nav rule, gutter ticks, section edge (CSL-03/04) */}
      <div style={{ position: 'absolute', left: 39, top: 0, width: 1, height: 1016, background: HAIR }} />
      <div style={{ position: 'absolute', left: 1399.75, top: 0, width: 1, height: 1016, background: HAIR }} />
      <div style={{ position: 'absolute', left: 0, top: 70, width: 1440, height: 1, background: HAIR }} />
      <div style={{ position: 'absolute', left: 0, top: 930, width: 41, height: 1, background: HAIR }} />
      <div style={{ position: 'absolute', left: 1400, top: 930, width: 40, height: 1, background: HAIR }} />
      <div style={{ position: 'absolute', left: 0, top: 1016, width: 1440, height: 19, background: '#fff', borderTop: '1px solid #e7e8eb' }} />

      {/* nav */}
      <nav style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 70 }}>
        <a href="#/khero" style={{ position: 'absolute', left: 201, top: 19.5, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} aria-label="Chatsheet home">
          <svg width="26" height="26" viewBox="-13 -13 26 26"><Mark /></svg>
          <span style={{ fontFamily: SERIF, fontSize: 27.7, lineHeight: '26px', position: 'relative', top: -1, color: INK, letterSpacing: '-0.01em' }}>Chatsheet</span>
        </a>
        {([['How it Works', 500, -0.27], ['Use Cases', 621, -0.44], ['Become a Partner', 723, -0.23], ['Partners', 879, -0.14]] as const).map(([l, x, ls]) => (
          <a key={l} href="#/khero" style={{ position: 'absolute', left: x, top: 22, fontSize: 16, lineHeight: '20px', letterSpacing: ls, color: GREY, textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>
        ))}
        <a href="#/khero" style={{ position: 'absolute', left: 1092, top: 13, width: 147.5, height: 37.5, boxSizing: 'border-box', borderRadius: 999, background: '#fff', border: '1px solid #dcdde0', borderTopColor: '#d0d1d3', borderBottomColor: '#e7e8eb', boxShadow: 'inset 0 1px 0 #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 1.5, fontSize: 16, fontWeight: 500, letterSpacing: -0.17, color: INK, textDecoration: 'none' }}>Book a Free Call</a>
      </nav>

      {/* copy */}
      <h1 style={{ position: 'absolute', left: 0, width: 1445.5, top: 146, margin: 0, textAlign: 'center', fontFamily: SERIF, fontWeight: 400, fontSize: 72, lineHeight: '68px', letterSpacing: '-0.0305em', color: INK }}>
        Turn Manual Tasks<br />into Automations
      </h1>
      <p style={{ position: 'absolute', left: 0, width: 1445, top: 305.75, margin: 0, textAlign: 'center', fontSize: 17, letterSpacing: 0.065, lineHeight: '28px', color: GREY }}>
        Automate documents, emails, approvals, and more, with<br />expert help and enterprise-grade AI integrations.
      </p>
      <div style={{ position: 'absolute', left: 534.5, top: 414, display: 'flex', gap: 13.5 }}>
        <a href="#/khero" style={{ width: 219, height: 47, boxSizing: 'border-box', borderRadius: 999, background: BLUE, border: '1px solid #4a7fee', borderTopColor: '#557ed8', borderBottomColor: '#a5c1fe', boxShadow: 'inset 0 1px 0 #3467d8, inset 0 1.5px 0 #376ce2, inset 0 -1px 0 #588cfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 500, letterSpacing: 0.2, color: '#fff', textDecoration: 'none' }}>Book a Free Discovery</a>
        <a href="#/khero" style={{ width: 144, height: 47, boxSizing: 'border-box', borderRadius: 999, background: '#fff', border: '1px solid #d7d8da', borderTopColor: '#d0d1d3', borderBottomColor: '#e7e8eb', boxShadow: 'inset 0 1px 0 #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 500, letterSpacing: 0.36, color: INK, textDecoration: 'none' }}>Case Studies</a>
      </div>
    </div>
  )
}
