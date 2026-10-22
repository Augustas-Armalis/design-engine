// Tempra hero r5 (#/h4a). h4a r1 verdict: "finally sth new" but "don't copy too close marcel", rename the brand, a Pinterest logo,
// "no fade bottom or proper cut off". So: our own field (one lavender horizon rising behind the product from the bottom
// centre, a fine grain over it) instead of the reference's side-rising mesh; the Tempra mark; the product dissolves into the
// field at the fold; event chips only in inner columns, never against the page edge. Kept as ours: the week grid with events
// parked in its cells, a fact pill above the h1, the AlignUI dashboard as the product.
import type { CSSProperties } from 'react'
import { RiCalendarCheckLine, RiArrowRightLine } from '@remixicon/react'
import TempraLockup from './TempraLogo'
import { CadenceAppFrame } from './CadenceProductA'

const W = 1440, H = 1035, INK = '#0E121B', V = '#7D52F4'
// the product fades out over the last 190px of the fold, so the fold ends on the field, never on a hard crop
const FADE = 'linear-gradient(#000 0, #000 845px, transparent 1035px)'
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })

// one light source: a lavender horizon behind the product, brightest at the bottom centre, gone by the copy; grain keeps it from banding
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
function Field() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1300px 560px at 50% 112%, #B9A5FF 0%, #D3C6FF 34%, #EAE3FF 58%, rgba(250,250,251,0) 82%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(520px 260px at 50% 100%, rgba(125,82,244,0.30), rgba(125,82,244,0) 80%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.07, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(transparent 45%, #000 85%)', maskImage: 'linear-gradient(transparent 45%, #000 85%)' }} />
    </div>
  )
}

// ---- the week grid: dashed day columns every 144, hour rules every 72; events sit inside cells, never on a line ----
const COLS = Array.from({ length: 11 }, (_, i) => i * 144)
const ROWS = Array.from({ length: 6 }, (_, i) => 110 + i * 72)
const EVENTS: [number, number, string, string][] = [
  [1, 0, 'Standup', '09:00'], [1, 2, 'Design crit', '10:30'],
  [8, 1, 'Roadmap', '09:30'], [8, 3, 'Interview', '13:00'],
]
const MASK = 'radial-gradient(600px 300px at 50% 210px, transparent 62%, #000 100%), linear-gradient(#000 62%, transparent 92%)'
function Grid() {
  // the lines fade around the copy and toward the product; the chips sit on top, unmasked, so none is ever half-visible
  return (
    <div aria-hidden style={{ position: 'absolute', left: 0, top: 74, width: W, height: 560 }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: MASK, WebkitMaskComposite: 'source-in', maskImage: MASK, maskComposite: 'intersect' }}>
        {COLS.slice(1).map((x) => <span key={x} style={abs(x, 0, { width: 1, height: 560, background: 'linear-gradient(rgba(14,18,27,0.08) 0 3px, transparent 3px 7px) 0 0 / 1px 7px' })} />)}
        {ROWS.map((y) => <span key={y} style={abs(0, y - 74, { width: W, height: 1, background: 'rgba(14,18,27,0.055)' })} />)}
      </div>
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
  // a fact, not a decoration: the slot Tempra found in the sample week (the same slot the product's decision tray offers)
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
        <TempraLockup size={22} style={abs(40, 25, { color: INK })} />
        <nav style={abs(236, 26, { display: 'flex', gap: 30, fontSize: 15, color: '#5d5e66', lineHeight: '22px' })}>{['Product', 'How it works', 'Pricing', 'Changelog'].map((t) => <a key={t} href="#/h4a" style={{ color: 'inherit', textDecoration: 'none' }}>{t}</a>)}</nav>
        <a href="#/h4a" style={abs(1194, 26, { fontSize: 15, fontWeight: 500, lineHeight: '22px', color: INK, textDecoration: 'none' })}>Sign in</a>
        <a href="#/h4a" style={abs(1272, 17, { width: 128, height: 40, borderRadius: 11, display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 500, textDecoration: 'none', ...white })}>Get started</a>
      </header>

      <FoundPill />
      <h1 style={{ margin: 0, position: 'absolute', left: 0, top: 178, width: W, textAlign: 'center', fontSize: 60, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: '66px' }}>Every Meeting Finds<br />Its Own Hour</h1>
      <p style={{ margin: 0, position: 'absolute', left: (W - 640) / 2, top: 326, width: 640, textAlign: 'center', fontSize: 18, lineHeight: '27px', color: '#64656d' }}>Tempra reads your team's calendars, guards focus time<br />and books the one slot that works for everyone.</p>
      <div style={abs(0, 420, { width: W, display: 'flex', justifyContent: 'center', gap: 12 })}>
        <a href="#/h4a" style={{ height: 46, padding: '0 20px 0 22px', borderRadius: 13, display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...ink }}>Start free<RiArrowRightLine size={17} /></a>
        <a href="#/h4a" style={{ height: 46, padding: '0 22px', borderRadius: 13, display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...white }}>See how it works</a>
      </div>

      <div style={abs(0, 0, { width: W, height: H, WebkitMaskImage: FADE, maskImage: FADE })}>
        {/* product: white glass frame (r42) holding the app at a 10px inset; the app's own bezel is r36 x 0.9 = 32 (concentric) */}
        <div style={abs(48, 552, { width: 1344, height: 500, borderRadius: 42, background: 'rgb(255 255 255 / .22)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .9), 0 10px 30px -10px rgb(77 36 196 / .18)' })} />
        <div style={abs(58, 562, { width: 1472, height: 1072, transform: `scale(${S})`, transformOrigin: '0 0' })}>
          <CadenceAppFrame inHero />
        </div>
      </div>
    </main>
  )
}
