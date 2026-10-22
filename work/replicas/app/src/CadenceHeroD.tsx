// Cadence hero r4 (#/h4a): replicate first, then own. Structure from the KargulHeroD study replica ("F1 product on a rising
// colour field", registered within ~1px): centred 2-line h1, 2-line grey subtitle, ink + white CTAs, a disc row, the product
// in a white glass frame on a field that rises from the sides (the measured mesh, recoloured). Nothing of the reference's
// words, name or marks is used. Owned: a faint week grid with events parked inside its cells (the name made literal),
// the disc row as the team converging on the Cadence mark with free/out dots, and our AlignUI Cadence dashboard as the
// product. Numbers from the founder canon: h1 60/500 -0.035em, sub 18, CTAs 46 r13, gaps 16 / 40 / 88.
import type { CSSProperties } from 'react'
import { RiCalendarCheckLine, RiArrowRightLine } from '@remixicon/react'
import { MESH } from './KargulHeroD'
import { CadenceAppFrame } from './CadenceProductA'

const W = 1440, H = 1035, INK = '#0E121B', V = '#7D52F4'
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })

// the measured field, re-tinted: amount = how far a sample left the page grey, then mixed toward Cadence lavender
const LAV = [176, 154, 252], PAGE = 250, SHIFT = -84
const tint = (c: number[]) => {
  const k = Math.min(1, Math.max(0, (PAGE - c[0]) / (PAGE - 94))) ** 1.1
  return `rgb(${Math.round(PAGE + (LAV[0] - PAGE) * k)} ${Math.round(PAGE + (LAV[1] - PAGE) * k)} ${Math.round(PAGE + (LAV[2] - PAGE) * k)})`
}
function Field() {
  const { xs, grid } = MESH
  const g = grid.map(([y, row]) => [y + SHIFT, row] as [number, number[][]])
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden>
      <defs>
        {g.map(([, row], i) => (
          <linearGradient key={i} id={`cm${i}`} x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            {row.map((c, k) => <stop key={k} offset={xs[k] / W} stopColor={tint(c)} />)}
          </linearGradient>
        ))}
        {g.slice(0, -1).map((_, i) => (
          <linearGradient key={i} id={`cv${i}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity="1" /></linearGradient>
        ))}
        {g.slice(0, -1).map((_, i) => <mask key={i} id={`ck${i}`}><rect x={0} y={g[i][0]} width={W} height={g[i + 1][0] - g[i][0] + 0.5} fill={`url(#cv${i})`} /></mask>)}
      </defs>
      {g.slice(0, -1).map(([y], i) => (
        <g key={i}>
          <rect x={0} y={y} width={W} height={g[i + 1][0] - y + 0.5} fill={`url(#cm${i})`} />
          <rect x={0} y={y} width={W} height={g[i + 1][0] - y + 0.5} fill={`url(#cm${i + 1})`} mask={`url(#ck${i})`} />
        </g>
      ))}
      <rect x={0} y={g[g.length - 1][0]} width={W} height={H - g[g.length - 1][0]} fill={`url(#cm${g.length - 1})`} />
    </svg>
  )
}

// ---- the week grid: dashed day columns every 144, hour rules every 72; events sit inside cells, never on a line ----
const COLS = Array.from({ length: 11 }, (_, i) => i * 144)
const ROWS = Array.from({ length: 6 }, (_, i) => 110 + i * 72)
const EVENTS: [number, number, string, string][] = [
  [0, 0, 'Standup', '09:00'], [1, 2, 'Design crit', '10:30'], [0, 3, '1:1 Maya', '13:00'], [1, 4, 'Focus', '14:00'],
  [8, 1, 'Roadmap', '09:30'], [9, 3, 'Hiring sync', '11:00'], [8, 4, 'Interview', '13:00'], [9, 0, 'Retro', '08:30'],
]
const MASK = 'radial-gradient(600px 300px at 50% 210px, transparent 62%, #000 100%), linear-gradient(#000 62%, transparent 92%)'
function Grid() {
  return (
    <div aria-hidden style={{ position: 'absolute', left: 0, top: 74, width: W, height: 560, WebkitMaskImage: MASK, WebkitMaskComposite: 'source-in', maskImage: MASK, maskComposite: 'intersect' }}>
      {COLS.slice(1).map((x) => <span key={x} style={abs(x, 0, { width: 1, height: 560, background: 'linear-gradient(rgba(14,18,27,0.08) 0 3px, transparent 3px 7px) 0 0 / 1px 7px' })} />)}
      {ROWS.map((y) => <span key={y} style={abs(0, y - 74, { width: W, height: 1, background: 'rgba(14,18,27,0.055)' })} />)}
      {EVENTS.map(([c, r, t, time]) => (
        <span key={t} style={abs(COLS[c] + 16, ROWS[r] - 74 + 20, { width: 120, height: 32, boxSizing: 'border-box', borderRadius: 10, background: '#F4F1FE', boxShadow: 'inset 0 0 0 1px #E6DEFD', padding: '0 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, whiteSpace: 'nowrap' })}>
          <span style={{ fontWeight: 500, color: '#4B2A9E' }}>{t}</span><span style={{ color: '#6E5BAF', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
        </span>
      ))}
    </div>
  )
}

const ink: CSSProperties = { background: 'linear-gradient(#2f2f33, #1a1a1d)', boxShadow: '0 0 0 1px #0d0d0f, 0 1px 2px rgb(8 8 8 / .22), 0 4px 8px -2px rgb(8 8 8 / .12), inset 0 1px 0 rgb(255 255 255 / .12)', color: '#fff' }
const white: CSSProperties = { background: '#fff', color: INK, boxShadow: '0 0 0 1px #ececef, 0 1px 2px rgb(14 18 27 / .12), 0 3px 6px -2px rgb(14 18 27 / .05)' }
const TINT: Record<string, [string, string]> = { L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], S: ['#FFECC0', '#624C18'], J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'] }

function FoundPill() {
  // a fact, not a decoration: the slot Cadence found in the sample week (the same slot the product's decision tray offers)
  const ids = ['L', 'A', 'M', 'J', 'T']
  return (
    <div style={abs(0, 128, { width: W, display: 'flex', justifyContent: 'center' })}>
      <span className="round" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 14px 0 5px', borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px #ECE8F8, 0 1px 2px rgb(77 36 196 / .08)', fontSize: 14, whiteSpace: 'nowrap' }}>
        <span style={{ display: 'flex' }}>{ids.map((i, k) => (
          <span key={i} className="round" style={{ marginLeft: k ? -6 : 0, width: 24, height: 24, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 2px #fff', display: 'grid', placeItems: 'center', fontSize: 10.5, fontWeight: 500 }}>{i}</span>
        ))}</span>
        <span style={{ fontWeight: 500 }}>Fri 11:00 works for all five</span>
        <span style={{ width: 1, height: 14, background: '#E6E2F2' }} />
        <span style={{ color: '#5B2CC9', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>Book it<RiArrowRightLine size={15} /></span>
      </span>
    </div>
  )
}

export default function CadenceHeroD() {
  const S = (1344 - 20) / 1472
  return (
    <main style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#fafafa', fontFamily: '"Inter Variable", Inter, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: INK }}>
      <Field />
      <Grid />
      <div style={abs(0, 73, { width: W, height: 1, background: '#efeff1' })} />

      <header>
        <span style={abs(40, 20, { width: 32, height: 32, borderRadius: 9, background: `linear-gradient(160deg, #9B7BFF, ${V} 55%, #5B2CC9)`, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), 0 1px 2px rgba(77,36,196,0.3)', color: '#fff', display: 'grid', placeItems: 'center' })}><RiCalendarCheckLine size={18} /></span>
        <span style={abs(82, 19, { fontSize: 22, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '34px' })}>Cadence</span>
        <nav style={abs(236, 26, { display: 'flex', gap: 30, fontSize: 15, color: '#5d5e66', lineHeight: '22px' })}>{['Product', 'How it works', 'Pricing', 'Changelog'].map((t) => <a key={t} href="#/h4a" style={{ color: 'inherit', textDecoration: 'none' }}>{t}</a>)}</nav>
        <a href="#/h4a" style={abs(1194, 26, { fontSize: 15, fontWeight: 500, lineHeight: '22px', color: INK, textDecoration: 'none' })}>Sign in</a>
        <a href="#/h4a" style={abs(1272, 17, { width: 128, height: 40, borderRadius: 11, display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 500, textDecoration: 'none', ...white })}>Get started</a>
      </header>

      <FoundPill />
      <h1 style={{ margin: 0, position: 'absolute', left: 0, top: 178, width: W, textAlign: 'center', fontSize: 60, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: '66px' }}>Every Meeting Finds<br />Its Own Hour</h1>
      <p style={{ margin: 0, position: 'absolute', left: (W - 640) / 2, top: 326, width: 640, textAlign: 'center', fontSize: 18, lineHeight: '27px', color: '#64656d' }}>Cadence reads your team's calendars, guards focus time<br />and books the one slot that works for everyone.</p>
      <div style={abs(0, 420, { width: W, display: 'flex', justifyContent: 'center', gap: 12 })}>
        <a href="#/h4a" style={{ height: 46, padding: '0 20px 0 22px', borderRadius: 13, display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...ink }}>Start free<RiArrowRightLine size={17} /></a>
        <a href="#/h4a" style={{ height: 46, padding: '0 22px', borderRadius: 13, display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...white }}>See how it works</a>
      </div>

      {/* product: white glass frame (r42) holding the app at a 10px inset; the app's own bezel is r36 x 0.9 = 32 (concentric) */}
      <div style={abs(48, 552, { width: 1344, height: 500, borderRadius: 42, background: 'rgb(255 255 255 / .22)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .9), 0 10px 30px -10px rgb(77 36 196 / .18)' })} />
      <div style={abs(58, 562, { width: 1472, height: 1072, transform: `scale(${S})`, transformOrigin: '0 0' })}>
        <CadenceAppFrame inHero />
      </div>
    </main>
  )
}
