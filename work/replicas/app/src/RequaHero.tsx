// Requa hero r1 (#/requahero): light split hero for the Requa purchase-approvals tool, @rokasrem's X batch (founder 2026-10-22).
// Canon hero-light default (Quorum split; the last light hero, Tempra h4a, was centred): plain text nav, an announcement pill,
// h1 56/500/-0.035em in two lines, a two-line subtitle, tactile ink + raised white CTAs, one real product element under the
// CTAs (a new-request composer), and the app on a smooth stage that fits it exactly (no text crosses the stage edge; Quorum
// fails today's half-faded check for that). The fold ends on the progressive blur of the accepted Tempra hero. Sample data.
import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUp, Sparkles } from 'lucide-react'
import { RequaApp, RequaMark } from './RequaProduct'

const W = 1440, H = 900, PAGE = '#FFFFFF', INK = '#0E121B', SUB = '#5D6168', MUTE = '#6B7180', LINE = '#ECEDF1'
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const ink: CSSProperties = { background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 2px rgba(14,18,27,0.2), 0 6px 14px -6px rgba(14,18,27,0.35)' }
const white: CSSProperties = { background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: INK, boxShadow: `inset 0 0 0 1px ${LINE}, 0 1px 2px rgba(14,18,27,0.06)` }

// ---- progressive blur: four backdrop-blur bands, each masked to start lower, then a fade to the page colour ----
function BlurOut({ top }: { top: number }) {
  const bands = [[2, 0], [4, 0.2], [8, 0.42], [14, 0.64]]
  return (
    <div aria-hidden style={abs(0, top, { width: W, height: H - top, pointerEvents: 'none' })}>
      {bands.map(([b, from]) => {
        const m = `linear-gradient(transparent ${from * 100}%, #000 ${Math.min(100, from * 100 + 28)}%)`
        return <div key={b} style={{ position: 'absolute', inset: 0, backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, WebkitMaskImage: m, maskImage: m }} />
      })}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(rgba(255,255,255,0) 10%, rgba(255,255,255,0.6) 58%, ${PAGE} 96%)` }} />
    </div>
  )
}

export default function RequaHero() {
  const SX = 560, SY = 112, SW = 856
  return (
    <main style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: PAGE, fontFamily: '"Inter Variable", Inter, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: INK }}>
      {/* nav: wordmark, five plain links, text-only right side */}
      <header style={abs(64, 0, { width: W - 128, height: 80, ...row })}>
        <span style={{ ...row, gap: 9 }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, borderRadius: 8, ...ink, boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.14)' }}><RequaMark size={13} /></span>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em' }}>Requa</span>
        </span>
        <nav style={{ ...row, gap: 32, marginLeft: 48 }}>
          {['Product', 'Approvals', 'Cards', 'Pricing', 'Changelog'].map((l) => <a key={l} href="#/requahero" style={{ fontSize: 14, fontWeight: 500, color: SUB, textDecoration: 'none' }}>{l}</a>)}
        </nav>
        <span style={{ marginLeft: 'auto', ...row, gap: 24 }}>
          <a href="#/requahero" style={{ fontSize: 14, fontWeight: 500, color: SUB, textDecoration: 'none' }}>Sign in</a>
          <a href="#/requahero" style={{ ...row, gap: 5, fontSize: 14, fontWeight: 500, color: INK, textDecoration: 'none' }}>Start free<ArrowRight size={14} /></a>
        </span>
      </header>

      {/* copy column */}
      <div style={abs(64, 158, { width: 470 })}>
        <span style={{ ...row, gap: 8, height: 30, padding: '0 12px 0 4px', borderRadius: 999, background: '#fff', boxShadow: `0 0 0 1px ${LINE}, 0 1px 2px rgba(14,18,27,0.05)`, width: 'fit-content', whiteSpace: 'nowrap' }} className="round">
          <span className="round" style={{ ...row, height: 22, padding: '0 8px', borderRadius: 999, background: '#EEF2FF', color: '#1E3FA8', fontSize: 12, fontWeight: 500 }}>New</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: INK, paddingBottom: 1 }}>Card spend lands in approvals</span>
        </span>
        <h1 style={{ margin: '22px 0 0', fontSize: 56, lineHeight: 1.04, fontWeight: 500, letterSpacing: '-0.035em' }}>Spend, Approved<br />Before Noon</h1>
        <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: '27px', color: SUB }}>Requa checks each request against budget and contract,<br />routes it to the right approver and pays the vendor.</p>
        <div style={{ ...row, gap: 10, marginTop: 32 }}>
          <a href="#/requahero" style={{ ...row, height: 46, padding: '0 20px 1px', borderRadius: 14, fontSize: 15.5, fontWeight: 500, textDecoration: 'none', ...ink }}>Start free</a>
          <a href="#/requahero" style={{ ...row, height: 46, padding: '0 20px 1px', borderRadius: 14, fontSize: 15.5, fontWeight: 500, textDecoration: 'none', ...white }}>Book a demo</a>
        </div>
        {/* the one product element on the copy side: a request being written, already priced and routed */}
        <div style={{ marginTop: 72, borderRadius: 20, background: '#F4F5F7', boxShadow: `inset 0 0 0 1px ${LINE}`, padding: 4 }}>
          <div style={{ borderRadius: 16, background: '#fff', boxShadow: `0 0 0 1px ${LINE}, 0 1px 2px rgba(14,18,27,0.04)`, padding: '13px 12px 10px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: MUTE }}>New request</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>12 monitors for the Kaunas office</div>
            <div style={{ ...row, gap: 6, marginTop: 12 }}>
              {['€3,240', 'IT · Q4', 'Pixelbay contract'].map((c) => <span key={c} style={{ ...row, height: 24, padding: '0 8px', borderRadius: 8, background: '#F4F5F7', boxShadow: `inset 0 0 0 1px ${LINE}`, fontSize: 12, color: SUB, fontVariantNumeric: 'tabular-nums' }}>{c}</span>)}
              <span className="round" style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 30, height: 30, borderRadius: 99, ...ink }}><ArrowUp size={15} /></span>
            </div>
          </div>
          <div style={{ ...row, gap: 6, height: 28, padding: '0 10px', fontSize: 12, color: SUB }}><span style={{ display: 'flex', color: '#2F5BEA' }}><Sparkles size={12} /></span>Goes to Tomas, then finance. Fits the IT budget.</div>
        </div>
      </div>

      {/* the stage: one smooth field behind the product only, the app inset 44 on every side it shows */}
      <div style={abs(SX, SY, { width: SW, height: H - SY + 120, borderRadius: 24, overflow: 'hidden', background: '#EEF1FB' })}>
        <div aria-hidden style={{ position: 'absolute', inset: -40, filter: 'blur(26px)', background: 'radial-gradient(60% 55% at 18% 8%, #DCE4FF 0%, rgba(220,228,255,0) 70%), radial-gradient(55% 50% at 92% 30%, #E9E3FF 0%, rgba(233,227,255,0) 70%), radial-gradient(70% 60% at 60% 100%, #F6EEE6 0%, rgba(246,238,230,0) 70%)' }} />
        <RequaApp compact style={{ position: 'absolute', left: 44, top: 44 }} />
      </div>

      <BlurOut top={760} />
    </main>
  )
}
