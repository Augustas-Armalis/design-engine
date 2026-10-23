// X teaching card (#/xoptical, 1080x1350), v2. Founder 2026-10-23 on v1: the "equal ink gaps" button was wrong ("it has equal
// top and bottom gaps... the correct way to be centre like depending on the font somehow... cleaner but good educational").
// The lesson: flex centring centres the line box, which carries each font's own ascender and descender space, so the same CSS
// lands the capitals in different places per font (measured on this card: Geist 1.3px high, Manrope 0.7px low, opposite ways).
// The fix that always works: centre the capitals (cap top to baseline) and nudge the label once per font, in the button token.
// CSS text-box trim fixed Manrope but not Geist in our probe, so the card does not sell it. Every number is probed from this render.
import type { CSSProperties } from 'react'
import '@fontsource-variable/geist'
import '@fontsource-variable/manrope'

const INK = '#0E121B', MUTE = '#6B7180', V = '#7D52F4'
const FONTS = { inter: '"Inter Variable", Inter, sans-serif', geist: '"Geist Variable", Geist, sans-serif', manrope: '"Manrope Variable", Manrope, sans-serif' } as const
// the per-font nudge, in the card's px (half the measured cap drift): Geist sits high, so down; Manrope sits low, so up
const NUDGE: Record<string, number> = { geist: 1.33, manrope: -0.67 }
type F = keyof typeof FONTS
const ink: CSSProperties = { background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 2px #0d0d0f, inset 0 2px 0 rgba(255,255,255,0.12), 0 4px 10px rgba(14,18,27,0.16), 0 16px 30px -14px rgba(14,18,27,0.26)' }
const BH = 132, BW = 292
// measured on this render at 3x, [cap gap, baseline gap] in the card's px (probe recipe in work/tempra-x/DIRECTION.md)
export const GAPS: Record<string, [number, number]> = { 'line-geist': [48.0, 50.67], 'line-manrope': [49.67, 48.33], 'cap-geist': [49.33, 49.33], 'cap-manrope': [49.0, 49.0] }

function Bracket({ y, h, v }: { y: number; h: number; v: number }) {
  return (
    <div style={{ position: 'absolute', left: 0, top: y, height: h, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: 12, height: h }}>
        <div style={{ position: 'absolute', left: 5, top: 0, bottom: 0, width: 2, background: V, borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 2, background: V, borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: 12, height: 2, background: V, borderRadius: 1 }} />
      </div>
      <span style={{ fontFamily: FONTS.inter, fontSize: 24, fontWeight: 500, color: V, fontVariantNumeric: 'tabular-nums' }}>{v ? v.toFixed(1) : ''}</span>
    </div>
  )
}

function Btn({ f, mode }: { f: F; mode: 'line' | 'cap' }) {
  const [top, bot] = GAPS[`${mode}-${f}`]
  const label: CSSProperties = mode === 'cap' ? { transform: `translateY(${NUDGE[f]}px)` } : {}
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 22 }}>
      <span data-btn={`${mode}-${f}`} style={{ width: BW, height: BH, borderRadius: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS[f], fontSize: 46, fontWeight: 500, letterSpacing: f === 'geist' ? '-0.02em' : '-0.01em', boxSizing: 'border-box', ...ink }}>
        <span style={{ display: 'block', ...label }}>Sign up</span>
      </span>
      <div style={{ position: 'relative', width: 70, height: BH }}>
        <Bracket y={0} h={top} v={top} />
        <Bracket y={BH - bot} h={bot} v={bot} />
      </div>
      {/* short leaders from the button's edge to the brackets: the cap line and the baseline, never across the letters */}
      {top > 0 && <div style={{ position: 'absolute', left: BW + 4, width: 16, top: top - 0.75, height: 1.5, background: `linear-gradient(90deg, ${V} 0 4px, transparent 4px 7px) 0 0 / 7px 1.5px` }} />}
      {bot > 0 && <div style={{ position: 'absolute', left: BW + 4, width: 16, top: BH - bot - 0.75, height: 1.5, background: `linear-gradient(90deg, ${V} 0 4px, transparent 4px 7px) 0 0 / 7px 1.5px` }} />}
    </div>
  )
}

function Row({ mode, title, note }: { mode: 'line' | 'cap'; title: string; note: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontSize: 26, fontWeight: 500, color: INK, letterSpacing: '-0.01em' }}>{title}</span>
        <span style={{ fontSize: 22, color: MUTE }}>{note}</span>
      </div>
      {mode === 'line' && (
        <div style={{ display: 'flex', gap: 40, fontSize: 22, color: MUTE, marginBottom: -12 }}>
          <span style={{ width: BW + 92, fontFamily: FONTS.geist }}>Geist</span>
          <span style={{ width: BW + 92, fontFamily: FONTS.manrope }}>Manrope</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 40 }}>
        <Btn f="geist" mode={mode} />
        <Btn f="manrope" mode={mode} />
      </div>
    </div>
  )
}

export default function TeachOptical() {
  return (
    <main aria-label="Optical centring of a button label" style={{ width: 1080, height: 1350, background: 'radial-gradient(900px 700px at 50% 20%, #FFFFFF, #F1F1F4)', fontFamily: FONTS.inter, fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: INK, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 104 }}>
        <div data-subject style={{ display: 'flex', flexDirection: 'column', gap: 92 }}>
          <Row mode="line" title="Flex centred" note="same CSS, the capitals land differently" />
          <Row mode="cap" title="Nudged per font" note="the gaps around the capitals match" />
        </div>
        <div style={{ textAlign: 'center', fontSize: 26, lineHeight: '38px', color: MUTE }}>
          <h1 style={{ margin: 0, font: 'inherit', color: 'inherit' }}>Centre the capitals, not the line box.</h1>
          <p style={{ margin: 0 }}>Measure each font once and keep the nudge in your button token.</p>
        </div>
      </div>
    </main>
  )
}
