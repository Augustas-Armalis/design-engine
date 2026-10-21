// Cadence feature section in Linear's FIG-triptych style, drawn only with the measured construction (lineart.tsx,
// LA-01..15). Layout tokens are Linear's measured ones: statement 48/510/-1.056 two-tone, three 426.67 columns across
// 80-1360 with 1px white .08 dividers, mono FIG labels 12 at 40%, title 15/510 + body 15/400 pinned to the column
// bottom, keyline black + white .08. Owned: Cadence subjects (weekday plates with the found hour, a focus tower among
// low meetings, cards settled into one ramp) and one accent: the lit dots are Cadence violet, the only colour.
import { BG, INK, slab, topFrontEdge, topPlane, HaloDefs, DotLabel, rpath, add, sub, f, type P } from './lineart'

const SANS = '"Inter Variable", system-ui, sans-serif'
const MONO = '"Geist Mono Variable", ui-monospace, monospace'
const VIOLET = '#a990ff'
const ns = { vectorEffect: 'non-scaling-stroke' as const }
const lit = (ids: number[], o = 0.95) => Object.fromEntries(ids.map((i) => [i, o]))

// FIG 0.1: five weekday plates, the lifted plate carries the week, the found hour is a lit dot grid in its plane
function FigTime() {
  const hw = 120, h = 20.54, cx = 132.25, ty = 7.44
  const top = slab(cx, ty, hw, h, 6.86, 3.43, 10.29)
  const stackTy = [0, 1, 2, 3, 4].map((k) => 55.41 + k * 16.3015).reverse()
  const U: P = [hw / 100, hw / 200], V: P = [-hw / 100, hw / 200]
  const at = (u: number, v: number): P => add(add([cx, ty], [U[0] * u, U[1] * u]), [V[0] * v, V[1] * v])
  return (
    <svg width={265} height={262} viewBox="0 0 265 262" fill="none" style={{ position: 'absolute', left: 144.328, top: 382.797, overflow: 'visible' }}>
      <defs><HaloDefs id="cf-f1" x={0} y={0} w={264.5} h={156.2} kind="plate" /></defs>
      {stackTy.map((t, i) => {
        const s = slab(cx, t, hw, h, 6.86, 3.43, 10.29)
        return (
          <g key={t}>
            <path fill={BG} d={s.fill} />
            <path stroke={INK.hi} strokeWidth={0.5} d={s.top} />
            <path stroke={i === 0 ? INK.hi : INK.lo} strokeWidth={0.5} d={s.front} />
            <path stroke={INK.lo} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(cx, t, hw, 6.857, 0.86, 10.29)} />
          </g>
        )
      })}
      <path fill={BG} filter="url(#cf-f1)" d={top.fill} />
      <path fill={BG} d={top.fill} />
      <path stroke={INK.hi} strokeWidth={0.5} d={top.top} />
      <path stroke={INK.hi} strokeWidth={0.5} d={top.front} />
      <path stroke={INK.lo} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(cx, ty, hw, 6.857, 0.86, 10.29)} />
      {/* the week laid in the top plane: four day dividers, meetings as dim outlines, the found hour outlined */}
      <g transform={topPlane(cx, ty, hw)} stroke={INK.lo} strokeWidth={0.5}>
        {[30, 44, 56, 70].map((u) => <path key={u} d={`M${u} 26V74`} strokeLinecap="round" {...ns} />)}
        <rect x={45.2} y={44} width={9.6} height={14} rx={1.6} fill="none" stroke={INK.mid} {...ns} />
      </g>
      <DotLabel c={at(50, 51)} u={[1.9, 0.95]} v={[-1.9, 0.95]} lit={lit([6, 7, 8, 11, 12, 13, 16, 17, 18])} fill={VIOLET} />
      <path stroke={INK.lo} strokeWidth={1} strokeDasharray="1 3" strokeLinecap="round" d={`M${f(cx - hw + 0.429)} 69.56V140M${f(cx + hw - 0.429)} 69.56V140M${cx} 129.379V190`} />
    </svg>
  )
}

// FIG 0.2: the focus tower, with the day's meetings kept low around it
const CUBES: { cx: number; ty: number; h: number; ink: string; halo: boolean }[] = [
  { cx: 152, ty: -0.665, h: 129.691, ink: INK.hi, halo: false },
  { cx: 88, ty: 101.336, h: 23.692, ink: INK.lo, halo: true },
  { cx: 216, ty: 101.336, h: 23.692, ink: INK.lo, halo: true },
  { cx: 216, ty: 60.336, h: 11.692, ink: INK.lo, halo: true },
  { cx: 152, ty: 143.335, h: 23.692, ink: INK.hi, halo: true },
]
function FigFocus() {
  const hw = 55.75
  return (
    <svg width={304} height={281} viewBox="0 0 304 281" fill="none" style={{ position: 'absolute', left: 567.484, top: 373.297, overflow: 'visible' }}>
      <defs><HaloDefs id="cf-f2" x={-40} y={-40} w={384} h={361} kind="cube" /></defs>
      {CUBES.map((c, i) => {
        const s = slab(c.cx, c.ty, hw, c.h, 7.75, 3.75, 7.75)
        return (
          <g key={i}>
            {c.halo && <path fill={BG} filter="url(#cf-f2)" d={s.fill} />}
            <path fill={BG} stroke={c.ink} strokeWidth={0.5} d={s.fill} />
            <path stroke={INK.inner} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(c.cx, c.ty, hw, 5.75, 0, 8)} />
          </g>
        )
      })}
      <DotLabel c={[152, 27.2]} u={[2.17, 1.1]} v={[-2.17, 1.1]} lit={lit([0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24], 0.9)} fill={VIOLET} />
      <DotLabel c={[152, 171]} u={[2.17, 1.1]} v={[-2.17, 1.1]} lit={{}} />
    </svg>
  )
}

// FIG 0.3: fifteen standing cards settled into one even ramp (the week, arranged)
const CARD_H = [128.697, 112, 96.5, 81.373, 67.5, 54.331, 43.5, 34.049, 26.5, 20.529, 15.5, 11.5, 8.698, 7.853, 7.853]
function FigSettle() {
  const run: P = [118.06, 59.03], thick: P = [3.13, -1.565]
  return (
    <svg width={272} height={267} viewBox="0 0 272 267" fill="none" style={{ position: 'absolute', left: 1026.656, top: 380.297, overflow: 'visible' }}>
      {CARD_H.map((H, i) => {
        const Hs = H + 2.825
        const E: P = [134.558 - 8.45 * i, 132.265 + 4.225 * i]
        const F: P = [E[0], E[1] - Hs], A = add(F, thick), B = add(A, run), C: P = [B[0], B[1] + Hs], D = sub(C, thick)
        const G = add(F, run)
        const inner = rpath([add(F, [3.131, 1.535]), G, [G[0], D[1] - 3.1]], [0, 3.38, 0], false)
        return (
          <g key={i} strokeWidth={0.5}>
            <path fill={BG} stroke={i === 0 ? INK.hi : INK.mid} d={rpath([A, B, C, D, E, F], [1.44, 3.13, 1.44, 1.44, 3.13, 1.44], true)} />
            <path stroke={INK.inner} strokeLinecap="round" d={inner} />
          </g>
        )
      })}
    </svg>
  )
}

const COL_W = 1280 / 3
const COLS = [
  { fig: 'Fig 0.1', title: 'Finds the time', body: 'Reads every guest’s calendar and proposes the one hour that works for all of them.' },
  { fig: 'Fig 0.2', title: 'Guards your focus', body: 'Deep work is a real block. Requests that would break it get a polite later slot.' },
  { fig: 'Fig 0.3', title: 'Settles conflicts', body: 'When two meetings collide, the more flexible one moves to the next shared slot.' },
]

export default function CadenceFig() {
  return (
    <div style={{ position: 'relative', width: 1440, height: 1000, overflow: 'hidden', background: BG, fontFamily: SANS, WebkitFontSmoothing: 'antialiased', fontFeatureSettings: '"cv01", "ss03"' }}>
      <h2 style={{ position: 'absolute', left: 46, top: 39.797, width: 1250, boxSizing: 'border-box', padding: '0 32px', margin: 0, fontSize: 48, fontWeight: 510, lineHeight: '48px', letterSpacing: '-1.056px', color: '#8a8f98', textWrap: 'wrap' }}>
        <strong style={{ fontWeight: 510, color: '#f7f8f8' }}>Calendars that keep themselves.</strong>{' '}
        Cadence reads every calendar on the invite, protects the hours that matter and moves what collides, so the week arrives already arranged.
      </h2>
      {COLS.map((b, i) => (
        <div key={b.fig} style={{ position: 'absolute', left: 80 + i * COL_W, top: 319.797, width: COL_W, height: 468, boxSizing: 'border-box', paddingLeft: i === 0 ? 0 : 32, paddingRight: i === 2 ? 0 : 32, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <span style={{ position: 'absolute', top: 0, left: i === 0 ? 0 : 32, fontFamily: MONO, fontSize: 11.65, lineHeight: '16.8px', color: '#8a8f98', opacity: 0.9, textTransform: 'uppercase' }}>{b.fig}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 510, lineHeight: '24px', letterSpacing: '-0.165px', color: '#d0d6e0' }}>{b.title}</span>
            <p style={{ margin: 0, maxWidth: 368, textWrap: 'balance', fontSize: 15, lineHeight: '24px', letterSpacing: '-0.165px', color: '#8a8f98' }}>{b.body}</p>
          </div>
        </div>
      ))}
      <div data-product style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><FigTime /><FigFocus /><FigSettle /></div>
      <div style={{ position: 'absolute', left: 0, top: 947.797, width: 1440, height: 1, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, top: 948.797, width: 1440, height: 1, background: 'rgba(255,255,255,0.08)' }} />
    </div>
  )
}
