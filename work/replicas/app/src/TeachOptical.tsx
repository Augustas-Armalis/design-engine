// X teaching card (#/xoptical, 1080x1350): optical vs geometric centring of a button label. Our own finding, measured on our
// own Sign up button (founder 2026-10-22: "the top padding looks bigger than the bottom"). The numbers are written from a
// pixel probe of this very render (tools/probe.mjs), so the card shows what it measures. Two beats: the two buttons, one line.
import type { CSSProperties } from 'react'

const INK = '#0E121B', MUTE = '#6B7180', V = '#7D52F4'
const ink: CSSProperties = { background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 3px #0d0d0f, inset 0 3px 0 rgba(255,255,255,0.12), 0 4px 10px rgba(14,18,27,0.18), 0 18px 36px -14px rgba(14,18,27,0.28)' }
// the button at 3x its hero size (46 tall, r16, 16px label): 138 tall, r48, 48px label
const BH = 180, BTN_W = 440
// measured on this render at 3x (cap top to the button top, descender bottom to the button bottom), in the card's own px
export const GAPS = { geo: [67.33, 54.0], opt: [61.33, 60.0] } as { geo: [number, number]; opt: [number, number] }

function Guide({ top, bottom, h }: { top: number; bottom: number; h: number }) {
  // violet brackets: the space above the ink and below it, measured
  const L = (y: number, hh: number, v: number) => (
    <div style={{ position: 'absolute', left: 0, top: y, height: hh, width: 136, display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ position: 'relative', width: 14, height: hh }}>
        <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: 2, background: V, borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 14, height: 2, background: V, borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: 14, height: 2, background: V, borderRadius: 1 }} />
      </div>
      <span style={{ fontSize: 32, fontWeight: 500, color: V, fontVariantNumeric: 'tabular-nums' }}>{v.toFixed(1)}</span>
    </div>
  )
  return (
    <div style={{ position: 'relative', width: 136, height: h }}>
      {L(0, top, top)}
      {L(h - bottom, bottom, bottom)}
    </div>
  )
}

function Row({ label, lift, gaps }: { label: string; lift: number; gaps: [number, number] }) {
  // the cap top and the descender bottom, carried out to the brackets by short dashed leaders
  // leaders start at the button's right edge, so no line ever crosses the letters
  const dash = (y: number) => <div style={{ position: 'absolute', left: 176 + BTN_W + 6, width: 28, top: y - 0.75, height: 1.5, backgroundImage: `linear-gradient(90deg, ${V} 0 6px, transparent 6px 11px)`, backgroundSize: '11px 1.5px', opacity: 0.85, pointerEvents: 'none' }} />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <span style={{ fontSize: 30, fontWeight: 500, color: MUTE, letterSpacing: '-0.01em' }}>{label}</span>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 40, paddingLeft: 176 }}>
        <span data-btn={label} style={{ width: BTN_W, justifyContent: 'center', height: BH, padding: `0 0 ${lift}px`, borderRadius: 62, display: 'flex', alignItems: 'center', fontSize: 62, fontWeight: 500, letterSpacing: '-0.01em', boxSizing: 'border-box', ...ink }}>Sign up</span>
        <Guide top={gaps[0]} bottom={gaps[1]} h={BH} />
        {dash(gaps[0])}
        {dash(BH - gaps[1])}
      </div>
    </div>
  )
}

export default function TeachOptical() {
  return (
    <main aria-label="Optical centring of a button label" style={{ width: 1080, height: 1350, background: 'radial-gradient(900px 700px at 50% 20%, #FFFFFF, #F1F1F4)', fontFamily: '"Inter Variable", Inter, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: INK, position: 'relative', overflow: 'hidden' }}>
      {/* one centred block: the two rows, then the rule; the rule's first line is the page's h1 (the caption carries the hook) */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 112 }}>
        <div data-subject style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 92 }}>
          <Row label="Geometric centre" lift={0} gaps={GAPS.geo} />
          <Row label="Ink centred, label up 6px" lift={12} gaps={GAPS.opt} />
        </div>
        <div style={{ textAlign: 'center', fontSize: 26, lineHeight: '38px', color: MUTE, whiteSpace: 'nowrap' }}>
          <h1 style={{ margin: 0, font: 'inherit', color: 'inherit' }}>A line box centres the font, not the letters.</h1>
          <p style={{ margin: 0 }}>Centre the ink, then nudge the label until the gaps match.</p>
        </div>
      </div>
    </main>
  )
}
