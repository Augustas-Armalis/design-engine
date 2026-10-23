// Ask Tempra as a standalone component post (#/xask still, #/xaskv video; 1200x1200). r2, founder 2026-10-23 on r1: "way
// smoother... the input field the same design as on the dashboard... where is the load in of it, like scale... and then a
// conversation: after you click booked another thing you type and another thing happens... ultra clean".
// One card (r28) at the dashboard rail's grammar, the composer copied from the rail (tray, white card, connected strip), built at
// 1x (420 wide) and zoomed 1.4x. Video (chat mode, timeline C in TempraMotion): the card scales in, the ask is typed into the
// composer and sent, Tempra reads five calendars, the answer streams word by word (fade + 4px blur + 4px rise), the options rise,
// a cursor books Friday, the other options fold away, a second ask sets a reminder and its switch turns on. The thread is a
// fixed viewport that glides to its newest line (exponential follow), so the card never changes size.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { RiArrowDownSLine, RiCheckboxCircleLine, RiCalendarCheckLine, RiCheckLine, RiArrowUpLine, RiAddLine, RiMicLine, RiNotification3Line } from '@remixicon/react'
import { Mark } from './TempraLogo'
import { useAnim, prog, bump, C } from './TempraMotion'

const T = { ink: '#0E121B', sub: '#525866', mute: '#6B7180', line: '#ECEDF1', hair: '#F1F2F5', weak: '#F4F5F7',
  v: '#7D52F4', vInk: '#4B2A9E', vFill: '#F1EDFE', vRing: '#E2D9FD', green: '#11743F', greenFill: '#E6F8EE', off: '#E1E3E8' }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const RING = `inset 0 0 0 1px ${T.line}`
const ink: CSSProperties = { paddingBottom: 0.4, background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(14,18,27,0.2)' }
const stroke: CSSProperties = { paddingBottom: 0.4, background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: T.ink, boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` }
const TINT: Record<string, [string, string]> = { L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'] }
// initials sit ~0.6px low in a centred circle (optical probe), so the content box is lifted by a 1px bottom pad
const Av = ({ i, s = 18 }: { i: string; s?: number }) => <span className="round" style={{ width: s, height: s, boxSizing: 'border-box', paddingBottom: 1, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center', fontSize: Math.max(11, s * 0.5), fontWeight: 500, flex: 'none' }}>{i}</span>
const Stack = ({ ids, s = 18 }: { ids: string[]; s?: number }) => <span style={{ ...row }}>{ids.map((i, k) => <span key={i} style={{ marginLeft: k ? -Math.round(s * 0.17) : 0, display: 'flex' }}><Av i={i} s={s} /></span>)}</span>
const Spinner = ({ t }: { t: number }) => (
  <svg width={15} height={15} viewBox="0 0 14 14" style={{ transform: `rotate(${(t * 420) % 360}deg)` }} aria-hidden><circle cx={7} cy={7} r={5.5} fill="none" stroke={T.line} strokeWidth={1.6} /><path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" fill="none" stroke={T.v} strokeWidth={1.6} strokeLinecap="round" /></svg>
)

const VIEW = 522
const ASK1 = 'Find 45 min with the design team next week, not Monday.'
const ASK2 = 'Remind everyone an hour before.'
// the answers as tokens: words stream, a citation lands whole when the stream reaches it
type Tok = { w: string; b?: boolean } | { cite: string }
const ANS1: Tok[] = [{ w: 'Friday', b: true }, { w: '11:00', b: true }, { w: 'works' }, { w: 'for' }, { w: 'all' }, { w: 'five.' }, { cite: '5 calendars' },
  { w: 'Nobody’s' }, { w: 'focus' }, { w: 'block' }, { w: 'moves' }, { cite: 'Focus · 4' }, { w: 'and' }, { w: 'Sam' }, { w: 'is' }, { w: 'back' }, { w: 'by' }, { w: 'then.' }, { cite: 'Sam · OOO' }]
const ANS2: Tok[] = [{ w: 'Done.' }, { w: 'Everyone' }, { w: 'gets' }, { w: 'a' }, { w: 'reminder' }, { w: 'at' }, { w: '10:00', b: true }, { w: 'on' }, { w: 'Friday.' }]

// folds a block away (height and opacity to 0) once k > 0; its natural height is read from the inner box every frame
function Fold({ k, children }: { k: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null), inner = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => { const o = outer.current, i = inner.current; if (o && i) o.style.height = k > 0 ? `${(i.offsetHeight * (1 - k)).toFixed(2)}px` : '' })
  return <div ref={outer} style={{ overflow: k > 0 ? 'hidden' : undefined, opacity: 1 - k }}><div ref={inner}>{children}</div></div>
}
// two states in one grid cell, crossfaded, so nothing changes width
const Swap = ({ k, a, b, style }: { k: number; a: ReactNode; b: ReactNode; style?: CSSProperties }) => (
  <span style={{ display: 'grid', ...style }}>
    <span style={{ gridArea: '1 / 1', ...row, gap: 6, opacity: 1 - k }}>{a}</span>
    {k > 0 && <span style={{ gridArea: '1 / 1', ...row, gap: 6, opacity: k }}>{b}</span>}
  </span>
)

export function AskCard() {
  const a = useAnim()
  const live = a?.mode === 'chat', t = a?.t ?? 1e9
  // an entrance: fade, rise and a soft blur that clears, on the shared expo-out curve
  const inn = (d: number, y = 10, dur = 0.8, blur = 6): CSSProperties => {
    if (!live) return {}
    const k = prog(t, d, dur)
    return { opacity: Math.min(1, k * 1.25), transform: `translateY(${((1 - k) * y).toFixed(2)}px)`, filter: k < 0.995 && blur ? `blur(${((1 - k) * blur).toFixed(2)}px)` : undefined }
  }
  // what exists yet: live, a block mounts when its beat starts (it takes no space before); the still shows the first answer, unbooked
  const at = (d: number, still = true) => (live ? t >= d : still)
  const booked = live ? prog(t, C.booked, 0.45) : 0
  const fold = live ? prog(t, C.fold, 0.75) : 0
  const on = live ? prog(t, C.on, 0.5) : 0
  const typed = !live ? '' : t >= C.send2 && t < C.send2 + 0.3 ? ASK2 : t >= C.send1 && t < C.send1 + 0.3 ? ASK1 : t >= C.type2 && t < C.send2 ? ASK2.slice(0, Math.max(0, Math.floor((t - C.type2) * C.typeRate))) : t >= C.type1 && t < C.send1 ? ASK1.slice(0, Math.max(0, Math.floor((t - C.type1) * C.typeRate))) : ''
  const typing = live && ((t >= C.type1 && t < C.send1) || (t >= C.type2 && t < C.send2))
  // the 0.3s after a send: the whole ask lifts out of the input while its bubble rises in the thread; the placeholder returns
  const lastSend = t >= C.send2 ? C.send2 : C.send1
  const leaving = live && t >= lastSend && t < lastSend + 0.3
  const leave = leaving ? prog(t, lastSend, 0.3) : 0
  const placeholder = !live ? 1 : typing || leaving ? 0 : t < C.type1 ? 1 : prog(t, lastSend + 0.15, 0.5)
  const sendPress = live ? Math.max(bump(t, C.send1 - 0.08, 0.18), bump(t, C.send2 - 0.08, 0.18)) : 0
  const opts: [string, string, string, string, string[], boolean][] = [
    ['FRI', '23', '11:00 – 11:45', 'All five free', ['L', 'A', 'M', 'J', 'T'], true],
    ['THU', '22', '15:30 – 16:15', 'Maya runs late', ['L', 'A', 'J', 'T'], false],
    ['TUE', '27', '16:00 – 16:45', 'Moves Theo’s focus', ['L', 'A', 'M', 'J'], false],
  ]

  const words = (toks: Tok[], d: number) => toks.map((tok, i) => {
    const k = live ? prog(t, d + i / C.wordRate, 0.5) : 1
    const st: CSSProperties = live ? { opacity: Math.min(1, k * 1.3), filter: k < 0.995 ? `blur(${((1 - k) * 4).toFixed(2)}px)` : undefined, transform: `translateY(${((1 - k) * 4).toFixed(2)}px)` } : {}
    if ('cite' in tok) return <span key={i} style={{ display: 'inline-flex', alignItems: 'center', height: 19, padding: '0 6px', margin: '0 1px 0 5px', borderRadius: 8, background: T.weak, boxShadow: RING, fontSize: 11.5, fontWeight: 500, color: T.sub, verticalAlign: 1, ...st }}>{tok.cite}</span>
    return <span key={i}>{i === 0 ? '' : ' '}<span style={{ display: 'inline-block', ...st }}>{tok.b ? <b style={{ color: T.ink, fontWeight: 600 }}>{tok.w}</b> : tok.w}</span></span>
  })
  const thought = (d: number, done: number, busy: string, settled: string) => {
    const k = live ? prog(t, done, 0.35) : 1
    return (
      <div style={{ ...inn(d, 6), display: 'grid', fontSize: 13, color: T.mute }}>
        <div style={{ gridArea: '1 / 1', ...row, gap: 6, opacity: k }}><RiCheckboxCircleLine size={15} color={T.green} />{settled}<RiArrowDownSLine size={15} /></div>
        {k < 1 && <div style={{ gridArea: '1 / 1', ...row, gap: 6, opacity: 1 - k }}><Spinner t={t} />{busy}</div>}
      </div>
    )
  }
  const bubble = (text: string, d: number) => (
    <div style={{ ...inn(d, 18, 0.85), alignSelf: 'flex-end', maxWidth: 270, padding: '10px 14px', borderRadius: 18, borderBottomRightRadius: 8, background: T.weak, fontSize: 14, lineHeight: '21px' }}>{text}</div>
  )

  // the thread glides to its newest line: target = overflow, followed exponentially (deterministic under the virtual clock)
  const view = useRef<HTMLDivElement>(null), body = useRef<HTMLDivElement>(null), sc = useRef({ y: 0, h: 0, t: -1 })
  // the cursor: from the lower right to Book on a slight arc, pressed with Book, gone once the options fold
  const wrap = useRef<HTMLDivElement>(null), card = useRef<HTMLDivElement>(null), book = useRef<HTMLSpanElement>(null), cur = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const v = view.current, b = body.current
    if (v && b) {
      // the view's height follows the content (capped at VIEW) and the scroll follows the overflow, both exponentially
      const H = b.offsetHeight, hT = Math.min(H, VIEW), yT = Math.max(0, H - VIEW), s = sc.current
      if (!live || s.t < 0) { s.h = hT; s.y = yT }
      else { const f = 1 - Math.exp(-Math.max(0, t - s.t) * 6); s.h += (hT - s.h) * f; s.y += (yT - s.y) * f }
      s.t = t
      v.style.height = `${s.h.toFixed(2)}px`
      b.style.transform = `translateY(${(-s.y).toFixed(2)}px)`
    }
    const w = wrap.current, c = card.current, bk = book.current, cu = cur.current
    if (!live || !w || !c || !cu) return
    if (!bk || t < C.cur) { cu.style.opacity = '0'; return }
    const wr = w.getBoundingClientRect(), z = wr.width / w.offsetWidth, br = bk.getBoundingClientRect()
    const x1 = (br.left - wr.left) / z + 44, y1 = (br.top - wr.top) / z + 22
    const x0 = c.offsetWidth * 0.9, y0 = c.offsetHeight * 0.74
    const k = prog(t, C.cur, 0.9), x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k - Math.sin(Math.PI * k) * 26
    const press = bump(t, C.press - 0.06, 0.2)
    cu.style.opacity = String(Math.min(prog(t, C.cur, 0.3), 1 - prog(t, C.fold + 0.15, 0.4)))
    cu.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${(1 - 0.14 * press).toFixed(4)})`
  })

  // the load-in: the card flies up out of a blur (48px, 14px blur, 0.97 scale) over a long 1.8s settle, its header and composer follow
  const kIn = live ? prog(t, C.in, 1.8) : 1
  const enterCard: CSSProperties = live ? { opacity: Math.min(1, prog(t, C.in, 1.0) * 1.1), transform: `translateY(${((1 - kIn) * 48).toFixed(2)}px) scale(${(0.97 + 0.03 * kIn).toFixed(4)})`, filter: kIn < 0.995 ? `blur(${((1 - kIn) * 14).toFixed(2)}px)` : undefined } : {}

  return (
    <div ref={wrap} style={{ position: 'relative' }}>
      <div ref={card} data-product style={{ ...enterCard, width: 420, borderRadius: 28, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04), 0 16px 40px -18px rgba(14,18,27,0.18)`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...row, gap: 10, height: 58, padding: '0 16px 0 18px', boxShadow: `inset 0 -1px 0 ${T.hair}`, ...inn(C.in + 0.22, 14, 1.4, 8) }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, ...ink, paddingBottom: 0 }}><Mark size={13} /></span>
          <h1 style={{ margin: 0, fontSize: 15, lineHeight: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>Ask Tempra</h1>
          <span style={{ marginLeft: 'auto', ...row, gap: 2, height: 28, padding: '0 8px 0 10px', borderRadius: 10, fontSize: 12.5, fontWeight: 500, color: T.sub, boxShadow: RING }}>This week<RiArrowDownSLine size={15} /></span>
        </div>

        <div ref={view} style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(transparent, #000 18px)', maskImage: 'linear-gradient(transparent, #000 18px)' }}>
          <div ref={body} style={{ padding: at(C.send1) ? '18px 18px 16px' : 0, display: 'flex', flexDirection: 'column' }}>
            {at(C.send1) && bubble(ASK1, C.send1 + 0.02)}
            {at(C.think1) && <div style={{ marginTop: 16 }}>{thought(C.think1, C.checked1, 'Checking 5 calendars…', 'Checked 5 calendars in 4s')}</div>}
            {at(C.chips) && <div style={{ display: 'flex', gap: 6, marginTop: 9, paddingLeft: 21 }}>
              {([['A', 'Ana'], ['M', 'Maya'], ['J', 'Jon'], ['T', 'Theo']] as const).map(([i, n], k) => (
                <span key={i} style={{ ...inn(C.chips + k * 0.1, 6, 0.6, 3), ...row, gap: 5, height: 26, padding: '0 9px 0 4px', borderRadius: 10, background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 1px rgba(14,18,27,0.03)`, fontSize: 12.5, color: T.sub }}><Av i={i} s={18} />{n}</span>
              ))}
            </div>}
            {at(C.ans1) && <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: '23px', color: T.sub }}>{words(ANS1, C.ans1)}</p>}
            {at(C.opt) && <div style={{ ...inn(C.opt, 10, 0.9), marginTop: 14, borderRadius: 18, background: '#fff', boxShadow: `${RING}, 0 1px 2px rgba(14,18,27,0.04)` }}>
              {opts.map(([dw, dn, when, why, ids, best], k) => {
                const line = (
                  <div style={{ ...inn(C.opt + 0.09 * k, 6, 0.8, 3), ...row, gap: 11, height: 60, padding: '0 13px', borderTop: k ? `1px solid ${T.hair}` : 'none' }}>
                    <span style={{ width: 38, height: 40, boxSizing: 'border-box', paddingTop: 1, borderRadius: 12, flex: 'none', boxShadow: `inset 0 0 0 1px ${best ? T.vRing : T.line}`, background: best ? T.vFill : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', color: best ? T.vInk : T.mute, lineHeight: '12px' }}>{dw}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, lineHeight: '18px', color: best ? T.vInk : T.ink, ...tnum }}>{dn}</span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', ...tnum }}>{when}</span>
                      {best
                        ? <Swap k={fold} style={{ fontSize: 12.5, color: T.green, whiteSpace: 'nowrap' }}
                            a={<>{why}<span style={{ height: 19, padding: '0 6px', borderRadius: 8, background: T.greenFill, fontSize: 11.5, fontWeight: 500, display: 'grid', placeItems: 'center' }}>Best</span></>}
                            b={<>Invites sent to 5<span style={{ ...row, gap: 3, height: 19, padding: '0 6px 0 4px', borderRadius: 8, background: T.greenFill, fontSize: 11.5, fontWeight: 500 }}><RiCheckLine size={12} />Booked</span></>} />
                        : <span style={{ fontSize: 12.5, color: T.mute, whiteSpace: 'nowrap' }}>{why}</span>}
                    </span>
                    <Stack ids={ids} s={19} />
                  </div>
                )
                return k === 0 ? <div key={dn}>{line}</div> : <Fold key={dn} k={fold}>{line}</Fold>
              })}
            </div>}
            {at(C.btn) && <Fold k={fold}>
              <div style={{ ...inn(C.btn, 8), ...row, gap: 8, paddingTop: 14 }}>
                <span ref={book} style={{ display: 'grid', height: 38, padding: '0 16px 0 14px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...ink, transform: `scale(${(1 - 0.035 * (live ? bump(t, C.press - 0.02, 0.2) : 0)).toFixed(4)})` }}>
                  <Swap k={booked} style={{ gap: 7 }} a={<><RiCalendarCheckLine size={16} />Book Fri 11:00</>} b={<span style={{ ...row, gap: 7, margin: '0 auto' }}><RiCheckLine size={16} />Booked</span>} />
                </span>
                <span style={{ ...row, height: 38, padding: '0 16px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...stroke, opacity: 1 - 0.4 * booked }}>Other times</span>
              </div>
            </Fold>}

            {at(C.send2, false) && <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>{bubble(ASK2, C.send2 + 0.02)}</div>}
            {at(C.think2, false) && <div style={{ marginTop: 16 }}>{thought(C.think2, C.checked2, 'Updating the invite…', 'Updated the invite')}</div>}
            {at(C.ans2, false) && <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: '23px', color: T.sub }}>{words(ANS2, C.ans2)}</p>}
            {at(C.rem, false) && <div style={{ ...inn(C.rem, 10, 0.9), ...row, gap: 11, marginTop: 14, height: 62, padding: '0 14px 0 13px', borderRadius: 18, background: '#fff', boxShadow: `${RING}, 0 1px 2px rgba(14,18,27,0.04)` }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 38, height: 40, borderRadius: 12, flex: 'none', background: T.weak, boxShadow: RING, color: T.sub }}><RiNotification3Line size={17} /></span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, ...tnum }}>Reminder · Fri 10:00</span>
                <span style={{ fontSize: 12.5, color: T.mute }}>Five people, an hour before</span>
              </span>
              <Stack ids={['L', 'A', 'M', 'J', 'T']} s={19} />
              {/* the switch turns on: the track fills, the knob slides 14px */}
              <span className="round" style={{ width: 34, height: 20, borderRadius: 999, flex: 'none', marginLeft: 4, background: `color-mix(in srgb, ${T.v} ${(on * 100).toFixed(1)}%, ${T.off})`, boxShadow: 'inset 0 1px 1px rgba(14,18,27,0.08)', position: 'relative' }}>
                <span className="round" style={{ position: 'absolute', top: 2, left: 2, width: 16, height: 16, borderRadius: 999, background: '#fff', boxShadow: '0 1px 2px rgba(14,18,27,0.2), 0 0 0 0.5px rgba(14,18,27,0.06)', transform: `translateX(${(on * 14).toFixed(2)}px)` }} />
              </span>
            </div>}
          </div>
        </div>

        {/* the composer, the dashboard rail's: a grey tray holding the white input card, the connected strip at its foot */}
        <div style={{ ...inn(C.in + 0.34, 14, 1.4, 8), margin: '0 12px 12px', borderRadius: 20, background: T.weak, boxShadow: RING, padding: 4 }}>
          <div style={{ borderRadius: 16, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)`, padding: '11px 8px 8px 12px' }}>
            <div style={{ display: 'grid', fontSize: 14, minHeight: 42, lineHeight: '21px' }}>
              <span style={{ gridArea: '1 / 1', color: T.mute, opacity: placeholder }}>Ask about your week…</span>
              {(typing || leaving) && <span style={{ gridArea: '1 / 1', color: T.ink, opacity: 1 - leave, transform: leaving ? `translateY(${(-8 * leave).toFixed(2)}px)` : undefined, filter: leaving ? `blur(${(3 * leave).toFixed(2)}px)` : undefined }}>
                {typed}{typing && <span style={{ display: 'inline-block', width: 1.5, height: 16, marginLeft: 1, verticalAlign: -3, background: T.v }} />}
              </span>}
            </div>
            <div style={{ ...row, gap: 6, marginTop: 10 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, boxShadow: RING, color: T.sub }}><RiAddLine size={15} /></span>
              <span style={{ ...row, gap: 2, height: 28, padding: '0 6px 0 9px', borderRadius: 10, boxShadow: RING, fontSize: 12.5, fontWeight: 500, color: T.sub }}>Design team<RiArrowDownSLine size={14} /></span>
              <span style={{ marginLeft: 'auto', display: 'flex', color: T.mute }}><RiMicLine size={16} /></span>
              <span className="round" style={{ width: 30, height: 30, borderRadius: 999, display: 'grid', placeItems: 'center', ...ink, paddingBottom: 0, transform: `scale(${(1 - 0.08 * sendPress).toFixed(4)})` }}><RiArrowUpLine size={15} /></span>
            </div>
          </div>
          <div style={{ ...row, gap: 6, height: 30, padding: '0 10px', fontSize: 12, color: '#596070' }}><span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: '#1FC16B' }} />5 calendars synced · 2 time zones</div>
        </div>
      </div>
      {live && (
        <div ref={cur} aria-hidden style={{ position: 'absolute', left: 0, top: 0, width: 22, height: 22, opacity: 0, transformOrigin: '3px 2px', pointerEvents: 'none', filter: 'drop-shadow(0 2px 3px rgba(14,18,27,0.25))' }}>
          <svg width={22} height={22} viewBox="0 0 22 22"><path d="M4 2.5v16.2l4.3-4.1 2.9 6.3 2.6-1.2-2.8-6.1h5.9z" fill={T.ink} stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" /></svg>
        </div>
      )}
    </div>
  )
}

export default function AskTempraCard() {
  return (
    <main aria-label="Ask Tempra, a sample conversation" style={{ width: 1200, height: 1200, background: 'radial-gradient(900px 800px at 50% 30%, #FBFBFC, #EDEEF1)', fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.ink, display: 'grid', placeItems: 'center', overflow: 'hidden', position: 'relative' }}>
      <div data-subject style={{ zoom: 1.4 }}>
        <AskCard />
      </div>
    </main>
  )
}
