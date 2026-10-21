// Cadence feature article in Attio's measured bento grammar (AttioBento.tsx replica, AB-01..15 in
// work/replicas/ATTIO-BENTO-NOTES.md): a ruled sheet, no gaps or card shadows; heading band whose h3 carries its subhead;
// one full-width product cell marked only by one value step (#f3f4f6); real product density at real size, cropped by a
// mask; exactly one lifted object (navy three-layer whisper shadow); two half cells with centred contained proofs;
// signal colour only in small tinted chips. Same geometry and primitives as the replica; all content is Cadence's
// own sample data. Corners are plain arcs here (squircle reset), as in the reference.
import type { CSSProperties, ReactNode } from 'react'
import { Info, MessageCircle, EllipsisVertical, CalendarDays, Users, Plus, Video, Clock, MapPin, AlignLeft } from 'lucide-react'

const F = '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
const INK = '#1c1d1f'     // lab(10.72) h3/h4
const SUB = '#687180'     // Attio #6f7988, nudged to clear 4.5:1
const DESC = '#687180'    // Attio's #8f99a8 measured 2.8:1 on #fafafb; darkened to pass AA (owned fix)
const UI = '#242629'      // product UI text
const MUT = 'rgba(0,0,0,0.55)'
const FAINT = 'rgba(0,0,0,0.56)' // Attio uses .4 (2.85:1); raised to clear AA
const LINE = '#e4e7ec'    // lab(91.52) section rules
const RULE = '#eeeff1'    // product rules
const BLUE = '#266df0'
const BTN_BLUE_SH = '0 2px 4px -2px rgba(15,107,233,0.12), 0 3px 6px -2px rgba(15,107,233,0.08)'
const FIELD_SH = '0 1px 3px 0 rgba(0,0,0,0.04), 0 0 2px 0 rgba(28,40,64,0.18)'
const CARD_SH = '0 0 1px 1px rgba(0,22,62,0.01), 0 4px 12px -1px rgba(0,22,62,0.04), 0 1px 3px -1px rgba(0,22,62,0.18)'
const COMPOSER_SH = '0 0 1px 1px rgba(0,22,62,0.02), 0 2px 6px -1px rgba(0,22,62,0.06), 0 1px 2px -1px rgba(0,22,62,0.24)'

const abs = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left, top, ...extra })
const txt = (size: number, weight: number, lh: number, ls: number, color: string, opsz = 14): CSSProperties =>
  ({ fontSize: size, fontWeight: weight, lineHeight: `${lh}px`, letterSpacing: ls, color, fontFamily: F, fontFeatureSettings: '"ss03"', fontVariationSettings: `"opsz" ${opsz}`, whiteSpace: 'nowrap', translate: `-0.5px ${DROP.has(size) ? 1 : 0}px` })
// Measured metric drift: Inter Variable sets 10/13/14px glyphs 1px higher and ~0.5px further right than Attio's
// "inter" at the same box (12/16/18px land exact), so text is nudged by its measured offset instead of moving the boxes.
const DROP = new Set([10, 13, 14])

/* ---------- primitives ---------- */

function Chevron({ left, top }: { left: number; top: number }) {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" style={abs(left, top)} aria-hidden>
      <path d="M0.6 0.6 4 4 7.4 0.6" fill="none" stroke={MUT} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}



function Btn({ left, top, width, children, kind }: { left: number; top: number; width: number; children: ReactNode; kind: 'blue' | 'white' | 'ghost' }) {
  const s: CSSProperties = kind === 'blue'
    ? { background: BLUE, border: '1px solid rgba(0,0,0,0.1)', boxShadow: BTN_BLUE_SH }
    : kind === 'white' ? { background: '#fff', boxShadow: FIELD_SH } : {}
  return <div style={abs(left, top, { width, height: 28, boxSizing: 'border-box', borderRadius: 8, ...s })}>{children}</div>
}

/* ---------- stage: week calendar + lifted "New meeting" card ---------- */

const DAYS = ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24']
const HOURS = ['9', '10', '11', '12', '1', '2', '3', '4', '5']
const T0 = 56, DW = 140, RH = 36 // time gutter, day width, hour height
type Ev = { d: number; s: number; e: number; t: string; k: 'green' | 'yellow' | 'blue' | 'violet' | 'grey'; who?: string }
const TONE = {
  green: { fill: '#e0fced', stroke: '#cbf7e1', ink: '#007d53' }, yellow: { fill: '#fdf7c4', stroke: '#fcef7e', ink: '#665a00' },
  blue: { fill: '#e5eeff', stroke: '#d6e5ff', ink: '#215bc4' }, violet: { fill: '#f5f0ff', stroke: '#e8ddfe', ink: '#6238b5' },
  grey: { fill: '#f4f5f6', stroke: '#e8e9ec', ink: '#505155' },
}
const EVENTS: Ev[] = [
  { d: 0, s: 0, e: 1, t: 'Standup', k: 'grey' }, { d: 0, s: 1.5, e: 3.5, t: 'Focus: roadmap', k: 'violet' }, { d: 0, s: 5, e: 6, t: 'Hiring sync', k: 'yellow' },
  { d: 1, s: 0, e: 1, t: 'Standup', k: 'grey' }, { d: 1, s: 1, e: 2, t: 'Maya 1:1', k: 'blue' }, { d: 1, s: 4, e: 6.5, t: 'Focus: specs', k: 'violet' },
  { d: 2, s: 0, e: 1, t: 'Standup', k: 'grey' }, { d: 2, s: 2, e: 3, t: 'Vendor call', k: 'yellow' },
  { d: 3, s: 0, e: 1, t: 'Standup', k: 'grey' }, { d: 3, s: 1, e: 4, t: 'Focus: research', k: 'violet' }, { d: 3, s: 5, e: 6, t: 'Board prep', k: 'green' },
  { d: 4, s: 0, e: 1, t: 'Standup', k: 'grey' }, { d: 4, s: 3, e: 4, t: 'Team lunch', k: 'green' },
]

function CalendarCard() {
  const iconC = MUT
  return (
    <div style={abs(71.25, 348.8, { width: 756, height: 457, background: '#fff', borderRadius: 12, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, #000 38%, transparent 100%)', maskImage: 'linear-gradient(to right, #000 38%, transparent 100%)' })}>
      <div style={abs(0, 0, { width: 756, height: 48, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
        <div style={abs(16, 17.5, { width: 14, height: 14, boxSizing: 'border-box', borderRadius: 4.2, background: BLUE, border: '1px solid rgba(0,0,0,0.05)', display: 'grid', placeItems: 'center' })}>
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden>{[[0, 0], [4.4, 0], [0, 4.4], [4.4, 4.4]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="3.6" height="3.6" rx="1" fill="#fff" />)}</svg>
        </div>
        <div style={abs(35, 13.5, { display: 'flex', alignItems: 'center', gap: 4.9, height: 20 })}>
          <span style={txt(14, 500, 20, -0.14, UI)}>Design team, this week</span>
          <Info size={13} strokeWidth={1.4} color={FAINT} style={{ marginTop: 1 }} />
        </div>
        {[{ c: BLUE, f: '#5b6ee8', l: 'M' }, { c: '#9b69ff', f: '#2f9e6e', l: 'T' }, { c: '#f97514', f: '#8d7f74', l: 'A' }].map((a, i) => (
          <div key={i} style={abs(410.4 + i * 18, 12.5, { width: 24, height: 24, boxSizing: 'border-box', borderRadius: 999, background: '#fff', border: `1px solid ${a.c}` })}>
            <div style={abs(1, 1, { width: 20, height: 20, boxSizing: 'border-box', borderRadius: 999, background: a.f, border: '1px solid rgba(0,0,0,0.1)', display: 'grid', placeItems: 'center' })}><span style={txt(10, 500, 20, -0.16, '#fff')}>{a.l}</span></div>
          </div>
        ))}
        <div style={abs(464.4, 13.5, { width: 22, height: 22, boxSizing: 'border-box', borderRadius: 999, background: '#f8f9fa', border: '1px solid #e6e7ea', display: 'grid', placeItems: 'center' })}><span style={txt(10, 500, 14, -0.16, MUT)}>+4</span></div>
        <span style={abs(499.4, 13.5, txt(14, 500, 20, -0.14, '#505155'))}>Share</span>
        <div style={abs(551.5, 16.5, { width: 1, height: 14, background: RULE })} />
        <MessageCircle size={13} strokeWidth={1.4} color={iconC} style={abs(568, 17)} />
        <EllipsisVertical size={13} strokeWidth={1.8} color={iconC} style={abs(596, 17)} />
        <Btn left={624.5} top={9.5} width={119.5} kind="white">
          <MessageCircle size={13} strokeWidth={1.5} color={UI} style={abs(7, 7.5)} />
          <span style={abs(25, 3, txt(14, 500, 20, -0.14, UI))}>Ask Cadence</span>
        </Btn>
      </div>
      <div style={abs(0, 48, { width: 756, height: 48, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
        <div style={abs(12, 10.5, { width: 110, height: 28, boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${RULE}` })}>
          <CalendarDays size={13} strokeWidth={1.4} color="#505155" style={abs(6, 6.5)} />
          <span style={abs(24, 2, txt(14, 500, 20, -0.14, UI))}>Week</span>
          <Chevron left={92} top={9.5} />
        </div>
        <div style={abs(130, 10.5, { width: 150, height: 28, boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${RULE}` })}>
          <Users size={13} strokeWidth={1.4} color="#505155" style={abs(6, 6.5)} />
          <span style={abs(24, 2, txt(14, 500, 20, -0.14, UI))}>6 calendars</span>
          <Chevron left={132} top={9.5} />
        </div>
        <Btn left={636.7} top={9.5} width={107.2} kind="blue">
          <Plus size={10} strokeWidth={1.6} color="#fff" style={abs(7, 8)} />
          <span style={abs(22, 3, txt(14, 500, 20, -0.14, '#fff'))}>New event</span>
        </Btn>
      </div>
      <div style={abs(0, 96, { width: 756, height: 361 })}>
        <div style={abs(0, 0, { width: 756, height: 36, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
          {DAYS.map((d, i) => <span key={d} style={abs(T0 + i * DW + 12, 7.5, txt(14, 500, 20, -0.14, i === 2 ? BLUE : UI))}>{d}</span>)}
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={abs(T0 + i * DW - 1, 0, { width: 1, height: 361, background: RULE })} />)}
        {HOURS.map((h, i) => (
          <div key={h} style={abs(0, 37 + i * RH, { width: 756, height: RH, boxSizing: 'border-box', borderBottom: i === HOURS.length - 1 ? 'none' : `1px solid ${RULE}` })}>
            <span style={abs(14, 2, txt(12, 500, 16, -0.16, FAINT))}>{h}</span>
          </div>
        ))}
        {EVENTS.map((e, i) => {
          const c = TONE[e.k], h = (e.e - e.s) * RH - 4
          return (
            <div key={i} style={abs(T0 + e.d * DW + 4, 37 + e.s * RH + 2, { width: DW - 9, height: h, boxSizing: 'border-box', borderRadius: 7, background: c.fill, border: `1px solid ${c.stroke}`, overflow: 'hidden' })}>
              <span style={abs(7, h > 40 ? 5 : (h - 20) / 2 - 1, txt(13, 500, 18, -0.13, c.ink))}>{e.t}</span>
              {h > 60 && <span style={abs(7, 24, txt(12, 500, 16, -0.16, c.ink))}>{e.k === 'violet' ? 'Protected' : ''}</span>}
            </div>
          )
        })}
        {/* the proposed slot: Wed 14:30-15:15, dashed until the invite is sent */}
        <div style={abs(T0 + 2 * DW + 4, 37 + 5.5 * RH + 2, { width: DW - 9, height: 0.75 * RH * 1.0 + 4, boxSizing: 'border-box', borderRadius: 7, background: '#fff', border: `1.5px dashed ${BLUE}` })}>
          <span style={abs(7, 4.5, txt(13, 500, 18, -0.13, BLUE))}>Design review</span>
        </div>
      </div>
    </div>
  )
}

function MeetingCard() {
  const row = (top: number, icon: ReactNode, children: ReactNode, last = false) => (
    <div style={abs(0, top, { width: 318, height: 44, boxSizing: 'border-box', borderBottom: last ? 'none' : `1px solid ${RULE}` })}>
      <span style={abs(12, 15)}>{icon}</span>
      <div style={abs(36, 12, { display: 'flex', alignItems: 'center', gap: 6 })}>{children}</div>
    </div>
  )
  const ic = { size: 14, strokeWidth: 1.4, color: FAINT }
  return (
    <div style={abs(623.25, 385.8, { width: 340, height: 465, background: '#fff', borderRadius: 12, boxShadow: CARD_SH, overflow: 'hidden' })}>
      <p style={abs(12, 12, { margin: 0, ...txt(12, 500, 16, -0.16, MUT) })}>New meeting</p>
      <p style={abs(12, 36, { margin: 0, ...txt(16, 600, 20, -0.16, UI) })}>Design review with Maya and Theo</p>
      <p style={abs(12, 62, { margin: 0, width: 316, ...txt(12, 500, 16, -0.16, MUT), whiteSpace: 'normal' })}>Checked 6 calendars and 2 time zones. Wednesday<br />is the first slot everyone has free.</p>
      <div style={abs(10, 110, { width: 320, height: 303, boxSizing: 'border-box', borderRadius: 14, border: `1px solid ${RULE}`, overflow: 'hidden' })}>
        {row(0, <Clock {...ic} />, <><span style={txt(14, 500, 20, -0.14, UI)}>Wed 22 Oct</span><span style={txt(14, 500, 20, -0.14, FAINT)}>14:30 – 15:15</span></>)}
        {row(44, <Users {...ic} />, <>{[['M', '#5b6ee8'], ['T', '#2f9e6e'], ['A', '#8d7f74']].map(([l, c], i) => <span key={l} style={{ position: 'relative', marginLeft: i ? -8 : 0, width: 18, height: 18, borderRadius: 999, background: c, boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center' }}><span style={txt(9, 600, 9, 0, '#fff')}>{l}</span></span>)}<span style={txt(14, 500, 20, -0.14, UI)}>Maya, Theo, you</span></>)}
        {row(88, <Video {...ic} />, <><span style={txt(14, 500, 20, -0.14, UI)}>Google Meet</span><span style={txt(12, 500, 16, -0.16, FAINT)}>link added on send</span></>)}
        {row(132, <MapPin {...ic} />, <span style={txt(14, 500, 20, -0.14, UI)}>Room 4B, 2nd floor</span>)}
        {row(176, <AlignLeft {...ic} />, <span style={txt(14, 500, 20, -0.14, UI)}>Agenda</span>, true)}
        <p style={abs(36, 212, { margin: 0, width: 270, ...txt(13, 500, 19, -0.13, MUT), whiteSpace: 'normal' })}>Review onboarding flows and agree on the empty states.</p>
        <div style={abs(36, 272, { display: 'flex', gap: 6 })}>
          {[['Keeps focus time', 'green'], ['No conflicts', 'blue']].map(([t, k]) => { const c = TONE[k as 'green']; return <span key={t} style={{ height: 22, boxSizing: 'border-box', padding: '0 6px', borderRadius: 7, background: c.fill, border: `1px solid ${c.stroke}`, display: 'flex', alignItems: 'center' }}><span style={txt(12, 500, 16, -0.16, c.ink)}>{t}</span></span> })}
        </div>
      </div>
      <Btn left={12} top={425} width={92} kind="blue"><span style={abs(7, 3, txt(14, 500, 20, -0.14, '#fff'))}>Send invite</span></Btn>
      <Btn left={112} top={425} width={66.2} kind="ghost"><span style={abs(7, 3, txt(14, 500, 20, -0.14, MUT))}>Discard</span></Btn>
      <Btn left={226.5} top={425} width={101.4} kind="white"><span style={abs(7, 3, txt(14, 500, 20, -0.14, UI))}>Other times</span></Btn>
    </div>
  )
}

/* ---------- lower cells ---------- */

const SLOTS: { d: string; t: string; note: string; best?: boolean }[] = [
  { d: 'Wed 22', t: '14:30', note: 'Everyone free, keeps focus', best: true },
  { d: 'Thu 23', t: '09:15', note: 'Theo travels after 11:00' },
  { d: 'Tue 21', t: '10:00', note: 'Maya in a 1:1 until 9:50' },
  { d: 'Fri 24', t: '15:00', note: 'After the team lunch' },
  { d: 'Mon 27', t: '11:30', note: 'Next week, all free' },
  { d: 'Tue 28', t: '14:00', note: 'Next week, Theo remote' },
]

function Composer() {
  return (
    <>
      <div style={abs(64.1, 1091.3, { width: 392, height: 46, background: '#fff', borderRadius: 12, boxShadow: COMPOSER_SH })}>
        <span style={abs(15, 13, txt(13, 500, 18, -0.13, UI))}>Find 45 min with Maya and Theo next week</span>
        <span style={abs(355, 9, { width: 28, height: 28, boxSizing: 'border-box', borderRadius: 8, background: BLUE, border: '1px solid rgba(0,0,0,0.1)', boxShadow: BTN_BLUE_SH })}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={abs(6, 7)} aria-hidden><path d="M7 10.5V3.5M7 3.5 4 6.5M7 3.5l3 3" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <div style={abs(64.1, 1149.3, { width: 392, height: 217, background: '#fff', borderRadius: 12, boxShadow: CARD_SH, overflow: 'hidden' })}>
        <span style={abs(15, 10, txt(10, 500, 13, -0.16, MUT))}>6 slots work for everyone</span>
        <ul style={abs(7, 29, { margin: 0, padding: 0, listStyle: 'none', width: 378 })}>
          {SLOTS.map((l) => (
            <li key={l.d + l.t} style={{ position: 'relative', height: 30, borderRadius: 10, background: l.best ? '#f4f7ff' : undefined }}>
              <span style={abs(8, 6.5, { width: 46, height: 17, boxSizing: 'border-box', borderRadius: 5, border: `1px solid ${l.best ? '#d6e5ff' : RULE}`, background: l.best ? '#e5eeff' : '#fff', display: 'grid', placeItems: 'center' })}><span style={txt(10, 500, 13, -0.1, l.best ? '#215bc4' : MUT)}>{l.d}</span></span>
              <span style={abs(62, 6, { display: 'flex', alignItems: 'baseline', gap: 4 })}>
                <span style={{ ...txt(13, 500, 18, -0.13, UI), fontVariantNumeric: 'tabular-nums' }}>{l.t}</span>
                <span style={txt(11, 500, 15, -0.16, FAINT)}>{l.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const CHIPS = [
  { x: 39.5, y: 94, w: 86, k: 'violet', t: 'Focus 4h' },
  { x: 222, y: 46, w: 92, k: 'yellow', t: '3 declined' },
  { x: 2.5, y: 255, w: 151, k: 'blue', t: 'Moved to Thu 9:15' },
  { x: 186, y: 268, w: 128, k: 'green', t: 'No calls before 10' },
] as const

function FocusRadar() {
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" style={abs(621.9, 1067.8)} aria-hidden>
      <defs><filter id="cb-drop" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgb(28,40,64)" floodOpacity="0.17" /></filter></defs>
      <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(28,40,64,0.9)" strokeWidth="1" opacity="0.067" />
      <circle cx="160" cy="160" r="100" fill="none" stroke="rgba(28,40,64,0.9)" strokeWidth="1" opacity="0.11" />
      <circle cx="160" cy="160" r="56" fill="#fff" stroke="rgba(28,40,64,0.05)" strokeWidth="1" filter="url(#cb-drop)" />
      {/* Cadence mark: four rounded tiles, the last one a circle */}
      <g transform="translate(143 143)" fill="#111214"><rect width="15" height="15" rx="4.2" /><rect x="19" width="15" height="15" rx="4.2" /><rect y="19" width="15" height="15" rx="4.2" /><rect x="19" y="19" width="15" height="15" rx="7.5" fill={BLUE} /></g>
      {CHIPS.map((c) => { const t = TONE[c.k]; return (
        <g key={c.t}>
          <rect x={c.x} y={c.y} width={c.w} height="26" rx="9" fill={t.fill} stroke={t.stroke} strokeWidth="1.27" />
          <text x={c.x + c.w / 2} y={c.y + 13} textAnchor="middle" dominantBaseline="central" fill={t.ink} style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: -0.13, fontFeatureSettings: '"ss03"', fontVariationSettings: '"opsz" 14' }}>{c.t}</text>
        </g>
      ) })}
    </svg>
  )
}

function CellHead({ x, title, desc }: { x: number; title: string; desc: ReactNode }) {
  return (
    <>
      <h4 style={abs(x, 974.8, { margin: 0, ...txt(18, 500, 22, -0.18, INK) })}>{title}</h4>
      <p style={abs(x, 1000.8, { margin: 0, width: 352, ...txt(16, 500, 22, -0.16, DESC), whiteSpace: 'normal' })}>{desc}</p>
    </>
  )
}

export default function CadenceAttio() {
  return (
    <div className="cad-attio" style={{ position: 'relative', width: 1043, height: 1413, background: '#fafafb', overflow: 'hidden', fontFamily: F, WebkitFontSmoothing: 'antialiased' }}>
      <style>{`.cad-attio, .cad-attio * { corner-shape: round !important; }`}</style>
      <article data-subject style={abs(1, 0.2, { width: 1042.5, height: 1411.8, boxSizing: 'border-box', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` })}>
        <h3 style={abs(57.9, 113, { margin: 0, width: 560, ...txt(24, 500, 27.6, -0.24, INK, 32), whiteSpace: 'normal' })}>
          Meetings, handled. <span style={{ color: SUB }}>Cadence finds the hour,<br />protects focus and moves what collides,<br />before anyone opens a calendar.</span>
        </h3>
        <div style={abs(0, 274.8, { width: 1042.5, height: 655, boxSizing: 'border-box', borderTop: `1px solid ${LINE}`, background: '#f3f4f6', overflow: 'hidden' })} />
        <div data-product style={abs(0, 0, { width: 1042.5, height: 929.8, pointerEvents: 'none' })}><CalendarCard /><MeetingCard /></div>
        <div style={abs(0, 929.8, { width: 1042.5, height: 481, boxSizing: 'border-box', borderTop: `1px solid ${LINE}`, background: '#fafafb' })}>
          <div style={abs(0, 0, { width: 521.25, height: 480, boxSizing: 'border-box', borderRight: `1px solid ${LINE}` })} />
        </div>
        <CellHead x={28.9} title="Ask for a time." desc={<>Type who and how long. Cadence ranks every<br />slot that works and says why.</>} />
        <div data-product style={abs(0, 0, { width: 521, height: 1411, pointerEvents: 'none' })}><Composer /></div>
        <CellHead x={550.2} title="Focus, protected." desc={<>Deep work is a real block. Requests that would<br />break it get a polite later slot.</>} />
        <div data-product style={abs(0, 0, { width: 1042, height: 1411, pointerEvents: 'none' })}><FocusRadar /></div>
      </article>
    </div>
  )
}
