// Tempra hero r7 (#/h4a): r3 rejected the bezel and the busy product; the hero now holds the r3 product window alone.
// r6 notes: r2 verdict: rounder product, "the background visual needs better polishing", the violet bottom glow
// was "stupid and vibrant, either blur fade out or none", "nav bar ugly", "title too", the grid and chips were distracting,
// "I liked the points or bubbles... sth cleaner". So: a neutral page, a fine dot field (points) that lives only at the sides
// and fades away from the copy, a handful of availability points lit in violet, a calmer h1, a nav on the frame's edges with a
// 36px Log in / Sign up pair, and the product leaving the fold through a progressive blur into the page colour (no colour).
import type { CSSProperties } from 'react'
import { RiArrowRightLine } from '@remixicon/react'
import TempraLockup from './TempraLogo'
import { TempraApp, APP_W } from './CadenceProductB'
import { useAnim, rise, H as HT } from './TempraMotion'

const W = 1440, H = 1035, INK = '#0E121B', PAGE = '#FAFAFB', EDGE = 80
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })

// ---- the points: a 20px dot lattice kept to the sides (clear around the copy, gone before the product) ----
const DOTS_MASK = 'radial-gradient(460px 310px at 50% 250px, transparent 58%, #000 100%), linear-gradient(transparent 0, #000 18%, #000 52%, transparent 86%)'
const LIT: [number, number][] = []
function Points() {
  return (
    <div aria-hidden style={abs(0, 72, { width: W, height: 520 })}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(14,18,27,0.16) 1px, transparent 1.5px)', backgroundSize: '20px 20px', backgroundPosition: '10px 8px', WebkitMaskImage: DOTS_MASK, WebkitMaskComposite: 'source-in', maskImage: DOTS_MASK, maskComposite: 'intersect' }} />
      {/* six lit points, each on the lattice: the free slots Tempra found, the only colour in the background */}
      {LIT.map(([x, y]) => (
        <span key={x + y} className="round" style={abs(x - 3, y - 72 - 3 + 8, { width: 6, height: 6, borderRadius: 999, background: '#7D52F4', boxShadow: '0 0 0 4px rgba(125,82,244,0.10)' })} />
      ))}
    </div>
  )
}

const ink: CSSProperties = { background: 'linear-gradient(#2f2f33, #1a1a1d)', boxShadow: '0 0 0 1px #0d0d0f, 0 1px 2px rgb(8 8 8 / .22), 0 4px 8px -2px rgb(8 8 8 / .12), inset 0 1px 0 rgb(255 255 255 / .12)', color: '#fff' }
const white: CSSProperties = { background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: INK, boxShadow: '0 0 0 1px #E6E7EB, 0 1px 2px rgb(14 18 27 / .06), 0 3px 6px -2px rgb(14 18 27 / .05)' }
const TINT: Record<string, [string, string]> = { L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'] }

function NewsPill() {
  const a = useAnim()
  // r6: the avatar pill read "too AI", yet the fold felt empty without an element above the h1. A plain announcement is a
  // fact about the product: a soft "New" tag (4px inset, concentric with the pill), one line, an arrow. No avatars.
  return (
    <div style={abs(0, 128, { ...rise(a, 'hero', HT.pill, 10), width: W, display: 'flex', justifyContent: 'center' })}>
      <a href="#/h4a" className="round" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32, padding: '0 12px 0 4px', borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px #E9E9EE, 0 1px 2px rgb(14 18 27 / .05)', fontSize: 13.5, fontWeight: 500, color: '#2E3038', textDecoration: 'none', whiteSpace: 'nowrap' }}>
        <span className="round" style={{ height: 24, padding: '0 9px 1px', borderRadius: 999, background: '#F1EDFE', boxShadow: 'inset 0 0 0 1px #E2D9FD', color: '#4B2A9E', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center' }}>New</span>
        <span style={{ paddingBottom: 1 }}>Booking across time zones is live</span>
        <RiArrowRightLine size={15} color="#62636B" />
      </a>
    </div>
  )
}

// ---- progressive blur: four backdrop-blur bands, each masked to start lower, then a fade to the page colour ----
function BlurOut({ top }: { top: number }) {
  const h = H - top
  const bands = [[2, 0], [4, 0.2], [8, 0.42], [14, 0.64]]
  return (
    <div aria-hidden style={abs(0, top, { width: W, height: h, pointerEvents: 'none' })}>
      {bands.map(([b, from]) => {
        const m = `linear-gradient(transparent ${from * 100}%, #000 ${Math.min(100, from * 100 + 28)}%)`
        return <div key={b} style={{ position: 'absolute', inset: 0, backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, WebkitMaskImage: m, maskImage: m }} />
      })}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(rgba(250,250,251,0) 10%, rgba(250,250,251,0.55) 55%, ${PAGE} 96%)` }} />
    </div>
  )
}

export default function CadenceHeroD() {
  const a = useAnim()
  return (
    <main style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: PAGE, fontFamily: '"Inter Variable", Inter, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: INK }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 420px at 50% -80px, #FFFFFF, rgba(255,255,255,0) 70%)' }} />
      <Points />

      {/* nav on the product frame's edges (48 / 1392), one 72px band, a 36px Log in / Sign up pair */}
      <header style={abs(EDGE, 0, { ...rise(a, 'hero', HT.nav, 6, 0.8), width: W - 2 * EDGE, height: 72, display: 'flex', alignItems: 'center' })}>
        <TempraLockup size={21} style={{ color: INK }} />
        <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 32, fontSize: 15, fontWeight: 450, color: '#55565E' }}>
          {['Product', 'How it works', 'Pricing', 'Changelog'].map((t) => <a key={t} href="#/h4a" style={{ color: 'inherit', textDecoration: 'none' }}>{t}</a>)}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <a href="#/h4a" style={{ height: 36, padding: '0 14px 1px', borderRadius: 13, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, color: INK, textDecoration: 'none' }}>Log in</a>
          <a href="#/h4a" style={{ height: 36, padding: '0 14px 1px', borderRadius: 13, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, textDecoration: 'none', ...white }}>Sign up</a>
        </div>
      </header>

      <NewsPill />
      <h1 style={{ ...rise(a, 'hero', HT.h1, 14), margin: 0, position: 'absolute', left: 0, top: 176, width: W, textAlign: 'center', fontSize: 56, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '64px' }}>Every Meeting Finds<br />Its Own Hour</h1>
      <p style={{ ...rise(a, 'hero', HT.sub, 12), margin: 0, position: 'absolute', left: (W - 640) / 2, top: 322, width: 640, textAlign: 'center', fontSize: 18, lineHeight: '27px', color: '#62636B' }}>Tempra reads your team's calendars, guards focus time<br />and books the one slot that works for everyone.</p>
      <div style={abs(0, 414, { ...rise(a, 'hero', HT.cta, 12), width: W, display: 'flex', justifyContent: 'center', gap: 12 })}>
        <a href="#/h4a" style={{ height: 46, padding: '0 20px 1px 22px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...ink }}>Start free<RiArrowRightLine size={17} /></a>
        <a href="#/h4a" style={{ height: 46, padding: '0 22px 1px', borderRadius: 16, display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', textDecoration: 'none', ...white }}>See how it works</a>
      </div>

      {/* product: the app window alone, one hairline + one soft drop, on the same 80px edges as the nav (r3 verdict: no bezel) */}
      <div style={abs(EDGE, 546, { width: APP_W, height: 820 })}>
        <TempraApp inHero />
      </div>
      <BlurOut top={928} />
    </main>
  )
}
