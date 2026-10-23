// Ask Tempra as a standalone component post (#/xask still, #/xaskv video; 1200x1200). Founder 2026-10-23: "the closeup should be
// way bigger or make entire right side into a component with that chat and let it speak smoothly as a standalone component in
// affectUI alignUI style". affectUI container grammar: a grey tray (r34, 6px inset) holding one white card (r28, concentric), a
// footer strip on the tray for what is connected. The component is built at 1x (420 wide) and zoomed 1.55x (~650 of 1200,
// post canon 50-70%). Video (chat mode, timeline C): the ask lands, Tempra reads five calendars (chips land), the answer streams
// word by word with its citations, the options rise, Book is pressed. Hidden words keep their space, so nothing below jumps.
import type { CSSProperties, ReactNode } from 'react'
import { RiArrowDownSLine, RiCheckboxCircleLine, RiCalendarCheckLine, RiCheckLine, RiArrowUpLine, RiAddLine, RiMicLine } from '@remixicon/react'
import { Mark } from './TempraLogo'
import { useAnim, prog, bump, C } from './TempraMotion'

const T = { ink: '#0E121B', sub: '#525866', mute: '#6B7180', line: '#ECEDF1', hair: '#F1F2F5', weak: '#F4F5F7', tray: '#EEEFF2',
  v: '#7D52F4', vInk: '#4B2A9E', vFill: '#F1EDFE', vRing: '#E2D9FD', green: '#11743F', greenFill: '#E6F8EE' }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const RING = `inset 0 0 0 1px ${T.line}`
const ink: CSSProperties = { paddingBottom: 0.6, background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(14,18,27,0.2)' }
const stroke: CSSProperties = { paddingBottom: 0.6, background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: T.ink, boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` }
const TINT: Record<string, [string, string]> = { L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'] }
// initials sit ~0.6px low in a centred circle (optical probe), so the content box is lifted by a 1px bottom pad
const Av = ({ i, s = 18 }: { i: string; s?: number }) => <span className="round" style={{ width: s, height: s, boxSizing: 'border-box', paddingBottom: 1, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center', fontSize: Math.max(10, s * 0.46), fontWeight: 500, flex: 'none' }}>{i}</span>
const Stack = ({ ids, s = 18 }: { ids: string[]; s?: number }) => <span style={{ ...row }}>{ids.map((i, k) => <span key={i} style={{ marginLeft: k ? -Math.round(s * 0.17) : 0, display: 'flex' }}><Av i={i} s={s} /></span>)}</span>

// the answer as tokens: words stream, a citation lands whole when the stream reaches it
type Tok = { w: string; b?: boolean } | { cite: string }
const ANSWER: Tok[] = [{ w: 'Friday', b: true }, { w: '11:00', b: true }, { w: 'works' }, { w: 'for' }, { w: 'all' }, { w: 'five.' }, { cite: '5 calendars' },
  { w: 'Nobody’s' }, { w: 'focus' }, { w: 'block' }, { w: 'moves' }, { cite: 'Focus · 4' }, { w: 'and' }, { w: 'Sam' }, { w: 'is' }, { w: 'back' }, { w: 'by' }, { w: 'then.' }, { cite: 'Sam · OOO' }]

export function AskCard() {
  const a = useAnim()
  const live = a?.mode === 'chat', t = a?.t ?? 1e9
  // each beat's progress (1 when there is no clock: the still shows the settled answer, before booking)
  const p = (d: number, dur = 0.7) => (live ? prog(t, d, dur) : 1)
  const show = (d: number, y = 8, dur = 0.7): CSSProperties => { const k = p(d, dur); return live ? { opacity: Math.min(1, k * 1.2), transform: `translateY(${((1 - k) * y).toFixed(2)}px)` } : {} }
  const checking = live ? 1 - prog(t, C.checked, 0.35) : 0
  const booked = live ? prog(t, C.booked, 0.45) : 0
  const press = live ? bump(t, C.press, 0.16) : 0
  const spin = (t * 420) % 360
  const opts: [string, string, string, string, string[], boolean][] = [
    ['FRI', '23', '11:00 – 11:45', 'All five free', ['L', 'A', 'M', 'J', 'T'], true],
    ['THU', '22', '15:30 – 16:15', 'Maya runs late', ['L', 'A', 'J', 'T'], false],
    ['TUE', '27', '16:00 – 16:45', 'Moves Theo’s focus', ['L', 'A', 'M', 'J'], false],
  ]
  let wi = 0
  const word = (node: ReactNode, key: number) => {
    const i = wi++, d = C.ans + i / C.wordRate
    return <span key={key} style={{ opacity: live ? prog(t, d, 0.18) : 1 }}>{node}</span>
  }
  return (
    <div data-product style={{ width: 420, borderRadius: 28, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04), 0 12px 32px -16px rgba(14,18,27,0.14)`, overflow: 'hidden' }}>
      <div style={{ ...row, gap: 10, height: 58, padding: '0 16px 0 18px', boxShadow: `inset 0 -1px 0 ${T.hair}` }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, ...ink, paddingBottom: 0 }}><Mark size={13} /></span>
        <h1 style={{ margin: 0, fontSize: 15, lineHeight: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>Ask Tempra</h1>
        <span style={{ marginLeft: 'auto', ...row, gap: 2, height: 28, padding: '0 8px 0 10px', borderRadius: 10, fontSize: 12.5, fontWeight: 500, color: T.sub, boxShadow: RING }}>This week<RiArrowDownSLine size={15} /></span>
      </div>
      <div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...show(C.bubble, 10), alignSelf: 'flex-end', maxWidth: 270, padding: '10px 14px', borderRadius: 18, borderBottomRightRadius: 8, background: T.weak, fontSize: 14, lineHeight: '21px' }}>Find 45 min with the design team next week, not Monday.</div>
        <div style={{ ...show(C.check, 6), marginTop: 16, display: 'grid' }}>
          <div style={{ gridArea: '1 / 1', ...row, gap: 6, fontSize: 13, color: T.mute, opacity: 1 - checking }}><RiCheckboxCircleLine size={15} color={T.green} />Checked 5 calendars in 4s<RiArrowDownSLine size={15} /></div>
          {live && <div style={{ gridArea: '1 / 1', ...row, gap: 6, fontSize: 13, color: T.mute, opacity: checking }}>
            <svg width={15} height={15} viewBox="0 0 14 14" style={{ transform: `rotate(${spin}deg)` }} aria-hidden><circle cx={7} cy={7} r={5.5} fill="none" stroke={T.line} strokeWidth={1.6} /><path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" fill="none" stroke={T.v} strokeWidth={1.6} strokeLinecap="round" /></svg>
            Checking 5 calendars…</div>}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 9, paddingLeft: 21 }}>
          {([['A', 'Ana'], ['M', 'Maya'], ['J', 'Jon'], ['T', 'Theo']] as const).map(([i, n], k) => (
            <span key={i} style={{ ...show(C.chips + k * 0.12, 6, 0.5), ...row, gap: 5, height: 26, padding: '0 9px 0 4px', borderRadius: 10, background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 1px rgba(14,18,27,0.03)`, fontSize: 12.5, color: T.sub }}><Av i={i} s={18} />{n}</span>
          ))}
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: '23px', color: T.sub }}>
          {ANSWER.map((tok, k) => 'cite' in tok
            ? word(<span style={{ display: 'inline-flex', alignItems: 'center', height: 19, padding: '0 6px', margin: '0 1px 0 5px', borderRadius: 8, background: T.weak, boxShadow: RING, fontSize: 11.5, fontWeight: 500, color: T.sub, verticalAlign: 1 }}>{tok.cite}</span>, k)
            : word(<>{k === 0 ? '' : ' '}{tok.b ? <b style={{ color: T.ink, fontWeight: 600 }}>{tok.w}</b> : tok.w}</>, k))}
        </p>
        <div style={{ ...show(C.opt, 8), marginTop: 14, borderRadius: 18, background: '#fff', boxShadow: `${RING}, 0 1px 2px rgba(14,18,27,0.04)` }}>
          {opts.map(([dw, dn, when, why, ids, best], k) => (
            <div key={dn} style={{ ...show(C.opt + 0.08 * k, 6), ...row, gap: 11, height: 60, padding: '0 13px', borderTop: k ? `1px solid ${T.hair}` : 'none' }}>
              <span style={{ width: 38, height: 40, borderRadius: 12, flex: 'none', boxShadow: `inset 0 0 0 1px ${best ? T.vRing : T.line}`, background: best ? T.vFill : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', color: best ? T.vInk : T.mute, lineHeight: '12px' }}>{dw}</span>
                <span style={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', color: best ? T.vInk : T.ink, ...tnum }}>{dn}</span>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', ...tnum }}>{when}</span>
                <span style={{ ...row, gap: 6, fontSize: 12.5, color: best ? T.green : T.mute, whiteSpace: 'nowrap' }}>{why}{best && <span style={{ height: 19, padding: '0 6px', borderRadius: 8, background: T.greenFill, color: T.green, fontSize: 11.5, fontWeight: 500, display: 'grid', placeItems: 'center' }}>Best</span>}</span>
              </span>
              <Stack ids={ids} s={19} />
            </div>
          ))}
        </div>
        <div style={{ ...show(C.btn, 8), ...row, gap: 8, marginTop: 14 }}>
          <span style={{ display: 'grid', height: 38, padding: '0 16px 0 14px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...ink, transform: `scale(${(1 - 0.03 * press).toFixed(4)})` }}>
            <span style={{ gridArea: '1 / 1', ...row, gap: 7, opacity: 1 - booked }}><RiCalendarCheckLine size={16} />Book Fri 11:00</span>
            {live && <span style={{ gridArea: '1 / 1', ...row, gap: 7, justifyContent: 'center', opacity: booked }}><RiCheckLine size={16} />Booked</span>}
          </span>
          <span style={{ ...row, height: 38, padding: '0 16px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...stroke, opacity: 1 - 0.4 * booked }}>Other times</span>
        </div>
      </div>
      <div style={{ margin: '0 12px 12px', borderRadius: 18, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)`, padding: '11px 8px 8px 13px' }}>
        <div style={{ fontSize: 14, color: T.mute }}>Ask about your week…</div>
        <div style={{ ...row, gap: 6, marginTop: 12 }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, boxShadow: RING, color: T.sub }}><RiAddLine size={15} /></span>
          <span style={{ ...row, gap: 2, height: 28, padding: '0 6px 0 9px', borderRadius: 10, boxShadow: RING, fontSize: 12.5, fontWeight: 500, color: T.sub }}>Design team<RiArrowDownSLine size={14} /></span>
          <span style={{ marginLeft: 'auto', display: 'flex', color: T.mute }}><RiMicLine size={16} /></span>
          <span className="round" style={{ width: 30, height: 30, borderRadius: 999, display: 'grid', placeItems: 'center', ...ink, paddingBottom: 0 }}><RiArrowUpLine size={15} /></span>
        </div>
      </div>
    </div>
  )
}

export default function AskTempraCard() {
  const S = 1.55
  return (
    <main aria-label="Ask Tempra, a sample answer" style={{ width: 1200, height: 1200, background: 'radial-gradient(900px 800px at 50% 30%, #FBFBFC, #EDEEF1)', fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.ink, display: 'grid', placeItems: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{ zoom: S }}>
        {/* the tray: affectUI grey container, the card inset 6px (radius 34 = 28 + 6), the connection strip at its foot */}
        <div data-subject style={{ borderRadius: 34, background: T.tray, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 6 }}>
          <AskCard />
          <div style={{ ...row, gap: 7, height: 32, padding: '0 14px', fontSize: 12, color: '#596070' }}><span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: '#1FC16B' }} />5 calendars synced · 2 time zones</div>
        </div>
      </div>
    </main>
  )
}
