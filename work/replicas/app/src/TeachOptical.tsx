// X teaching card (#/xoptical, 1080x1350), v5. Founder 2026-10-23 on v4 (pixel zoom): "looks bad... hard to understand... it's
// about adding padding to font height not to font visible height". So: two buttons, vector, one idea each.
// Wrong: equal padding around the font box (the line box: ascender to descender, dashed) — the letters you see sit low in it.
// Right: equal padding around the letters you see (cap top to descender bottom, dashed) — the word sits in the middle.
// Every number is probed from this render (tools/capgap.cjs: [cap gap, baseline gap, descender gap] of each [data-btn], 3x).
import type { CSSProperties } from 'react'
import '@fontsource-variable/geist'

const GEIST = '"Geist Variable", Geist, sans-serif'
const BW = 640, FS = 112, PAD = 44
// measured on this render: the font box height, and the ink (cap top, descender bottom) inside it
export const M = { box: 146, inkTop: 31.67, inkBot: 131 }
const CASES = {
  font: { label: 'Padding on the font height', line: '#FF6B70', ink: '#C4262E', chip: '#FDECEC' },
  ink: { label: 'Padding on what you see', line: '#3DD68C', ink: '#11743F', chip: '#E3F7EC' },
} as const

// a dimension marker: a thin vertical rule with end ticks and its value beside it
const Dim = ({ top, h, v, c }: { top: number; h: number; v: number; c: string }) => (
  <div style={{ position: 'absolute', left: 60, top, height: h, display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ position: 'relative', width: 14, height: h }}>
      <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: 2, background: c }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 14, height: 2, background: c }} />
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 14, height: 2, background: c }} />
    </div>
    <span style={{ fontSize: 26, fontWeight: 600, color: c, fontVariantNumeric: 'tabular-nums' }}>{Math.round(v)}</span>
  </div>
)

function Case({ kind }: { kind: keyof typeof CASES }) {
  const c = CASES[kind]
  const H = M.box + PAD * 2
  // right: the label moves so the ink gaps match; the dashed box hugs the ink
  const inkH = M.inkBot - M.inkTop
  const shift = kind === 'ink' ? (H - inkH) / 2 - (PAD + M.inkTop) : 0
  const boxTop = kind === 'font' ? PAD : PAD + M.inkTop + shift
  const boxH = kind === 'font' ? M.box : inkH
  const Chip = kind === 'ink' ? 'h1' : 'span'
  const dash: CSSProperties = { position: 'absolute', left: 120, right: 120, top: boxTop, height: boxH, borderRadius: 6, outline: `2px dashed ${c.line}`, outlineOffset: 0 }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
      {/* the right one's chip is the card's one heading */}
      <Chip style={{ margin: 0, height: 44, padding: '0 18px', borderRadius: 999, display: 'flex', alignItems: 'center', background: c.chip, color: c.ink, fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>{c.label}</Chip>
      <div data-btn={kind} style={{ position: 'relative', width: BW, height: H || 'auto', borderRadius: 56, background: 'linear-gradient(#2f2f33, #1a1a1d)', boxShadow: '0 0 0 2px #0d0d0f, inset 0 2px 0 rgba(255,255,255,0.12), 0 6px 14px rgba(14,18,27,0.16), 0 24px 44px -20px rgba(14,18,27,0.28)', color: '#fff', overflow: 'hidden' }}>
        <span data-fontbox style={{ position: 'absolute', left: 0, right: 0, top: PAD + shift, display: 'block', textAlign: 'center', fontFamily: GEIST, fontSize: FS, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 'normal' }}>Sign up</span>
        {M.box > 0 && <>
          <div style={dash} />
          <Dim top={0} h={boxTop} v={boxTop} c={c.line} />
          <Dim top={boxTop + boxH} h={H - boxTop - boxH} v={H - boxTop - boxH} c={c.line} />
        </>}
      </div>
    </div>
  )
}

export default function TeachOptical() {
  return (
    <main aria-label="Padding on the font height versus padding on what you see" style={{ width: 1080, height: 1350, background: 'radial-gradient(900px 700px at 50% 25%, #FFFFFF, #F1F1F4)', fontFamily: GEIST, WebkitFontSmoothing: 'antialiased', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div data-subject style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 100 }}>
        <Case kind="font" />
        <Case kind="ink" />
      </div>
    </main>
  )
}
