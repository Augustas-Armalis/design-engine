// Cadence product screen in Marcel Kargul's product grammar (own design, sample data).
// Floor: KargulR1 (UniOps chrome, sidebar, label-value pills, primary recipe) + KargulR3 (716-like calendar post: 64px hour,
// event = slot + 4 / duration x 64 - 2, title 14/480 at 7.6, time 13/-0.03em, half-hour events centre one line, the
// three-part now marker, popover anatomy with 30px detail rows). KMD-24..49. Inter, weight 400 body.
// Owned (Cadence) states, drawn in his tint + ring + text language:
//   1. suggested slot: accent tint, 1.5px dashed accent edge (tentative), selected = content shifted 2px, popover open
//   2. protected focus: neutral tint + ring + a fine hatch + lock glyph ("held, nothing books here")
//   3. resolved conflict: the moved meeting keeps its colour; an accent-triple note hangs under it saying what moved and why
// Colour: one accent (#4785ff, everything Cadence did), two meeting tints (R3 purple/pink), neutrals. Radii by box size at
// squircle scale (founder L373: x1.2 of his circular values): events 9.5, controls 12, popover 14.5, card 27, window 30.
// Frame: 1600x1200 post, pale canvas, the window centred and cropped at the bottom edge (UniOps crop).
import type { CSSProperties, ReactNode } from 'react'
import {
  RiCalendar2Line, RiSparkling2Line, RiFocus3Line, RiLinkM, RiBarChartBoxLine, RiSettings3Line, RiQuestionLine,
  RiArrowRightSLine, RiArrowLeftSLine, RiSidebarFoldLine, RiGroupLine, RiGlobalLine, RiArrowDownSLine, RiAddLine,
  RiRestartLine, RiNotification3Line, RiSearchLine, RiSunLine, RiMoonLine, RiLock2Line, RiTimeLine, RiVideoOnLine,
  RiShieldCheckLine, RiAlignLeft, RiRefreshLine, RiMoreLine, RiCloseLine, RiArrowGoForwardLine, RiUserLine, RiDownload2Line,
} from '@remixicon/react'

const INK = '#1c1c1c', SUB = '#6b6b6b', LINE = '#ebebeb', RING = '#e6e6e6', BG = '#f7f7f7', ACC = '#4785ff', NOW = '#e0735a'
const font: CSSProperties = { fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', WebkitFontSmoothing: 'antialiased' }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const abs = (left: number, top: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left, top, ...s })

// meeting tints (R3, measured): tint fill + deep same-hue ink, time line at lower alpha
const TONE = {
  purple: { bg: '#dcc8fd', fg: '#3d2862', sub: 'rgba(61,40,98,.78)' },
  pink: { bg: '#ffcadd', fg: '#62243f', sub: 'rgba(98,36,63,.78)' },
}
// Cadence states as triples
const FOCUS = { bg: '#f4f4f3', ring: '#e0e0de', fg: '#2b2b2b', sub: '#5f5f5f' }
const SUGG = { bg: '#eef4ff', ring: ACC, fg: '#1a47b8', sub: '#3159b8' }
const NOTE = { bg: '#f2f6ff', ring: '#d3e2ff', fg: '#1a47b8', sub: '#4a5f8f' }

/* ---------------- grid geometry (card-relative) ---------------- */
const CARD_W = 1182, GUT = 64, COL = (CARD_W - GUT) / 5, HEAD = 55, ALLDAY = 34
const hy = (h: number) => HEAD + ALLDAY + (h - 8) * 64 // 08:00 sits on the all-day lane's bottom rule
const dx = (d: number) => GUT + d * COL

type Ev = { d: number; h0: number; h1: number; title: string; time?: string; extra?: string; kind: 'purple' | 'pink' | 'focus' | 'sugg' }
const EVENTS: Ev[] = [
  // Mon 19
  { d: 0, h0: 9, h1: 9.5, kind: 'purple', title: 'Weekly kickoff' },
  { d: 0, h0: 10, h1: 12, kind: 'focus', title: 'Focus time', time: '10:00 – 12:00', extra: 'Roadmap draft' },
  { d: 0, h0: 13, h1: 14, kind: 'pink', title: 'Customer call', time: '13:00 – 14:00' },
  { d: 0, h0: 15.5, h1: 16.5, kind: 'purple', title: 'Design review', time: '15:30 – 16:30' },
  // Tue 20
  { d: 1, h0: 9, h1: 11, kind: 'focus', title: 'Focus time', time: '09:00 – 11:00', extra: 'Design system audit' },
  { d: 1, h0: 11, h1: 12, kind: 'purple', title: 'Design sync', time: '11:00 – 12:00' },
  { d: 1, h0: 18.5, h1: 19.5, kind: 'purple', title: '1:1 with Ana', time: '18:30 – 19:30' },
  { d: 1, h0: 19.75, h1: 20.75, kind: 'pink', title: 'Partner demo', time: '19:45 – 20:45', extra: 'Sydney team' },
  { d: 0, h0: 18.5, h1: 19.5, kind: 'pink', title: 'Investor update', time: '18:30 – 19:30' },
  { d: 2, h0: 19, h1: 20, kind: 'purple', title: 'APAC sync', time: '19:00 – 20:00' },
  // Wed 21
  { d: 2, h0: 10, h1: 11, kind: 'purple', title: 'Research readout', time: '10:00 – 11:00' },
  { d: 2, h0: 11.5, h1: 12.5, kind: 'pink', title: 'Team lunch', time: '11:30 – 12:30' },
  // Thu 22 (today)
  { d: 3, h0: 9, h1: 9.5, kind: 'purple', title: 'Standup' },
  { d: 3, h0: 10, h1: 11, kind: 'pink', title: 'Customer call', time: '10:00 – 11:00' },
  { d: 3, h0: 11.5, h1: 12, kind: 'purple', title: 'Quick catch-up' },
  { d: 3, h0: 13, h1: 14, kind: 'purple', title: 'Hiring panel', time: '13:00 – 14:00' },
  { d: 3, h0: 14.5, h1: 15.5, kind: 'sugg', title: 'Design crit · v2.4', time: '14:30 – 15:30' },
  { d: 3, h0: 16, h1: 18, kind: 'focus', title: 'Focus time', time: '16:00 – 18:00', extra: 'Prototype pass' },
  // Fri 23
  { d: 4, h0: 9, h1: 11, kind: 'focus', title: 'Focus time', time: '09:00 – 11:00', extra: 'Spec writing' },
  { d: 4, h0: 13, h1: 14, kind: 'pink', title: 'Weekly wrap-up', time: '13:00 – 14:00' },
  { d: 4, h0: 16, h1: 17, kind: 'purple', title: 'Plan next week', time: '16:00 – 17:00' },
  { d: 4, h0: 18, h1: 19, kind: 'pink', title: 'Office hours', time: '18:00 – 19:00', extra: 'Austin team' },
]

function Event({ e }: { e: Ev }) {
  const short = e.h1 - e.h0 < 1
  const left = dx(e.d) + 4, top = hy(e.h0) + 4, width = COL - 8, height = (e.h1 - e.h0) * 64 - 2
  const t = e.kind === 'focus' ? FOCUS : e.kind === 'sugg' ? SUGG : TONE[e.kind]
  const sel = e.kind === 'sugg'
  const box: CSSProperties = {
    ...abs(left, top), width, height, borderRadius: 9.5, boxSizing: 'border-box', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', justifyContent: short ? 'center' : 'flex-start',
    // selected (popover open): content sits 2px further in, inside the 1.5px edge (KMD-36)
    padding: short ? '0 8px' : sel ? '8.1px 8.5px 0' : '7.6px 8px 0',
    background: t.bg, color: t.fg,
  }
  if (e.kind === 'focus') {
    box.boxShadow = `inset 0 0 0 1px ${FOCUS.ring}`
    box.backgroundImage = 'repeating-linear-gradient(135deg, rgba(0,0,0,.032) 0 1px, transparent 1px 7px)'
  }
  if (sel) box.border = `1.5px dashed ${SUGG.ring}`
  const glyph = e.kind === 'focus' ? <RiLock2Line size={13} color={FOCUS.fg} style={{ flex: 'none' }} /> : sel ? <RiSparkling2Line size={13} color={ACC} style={{ flex: 'none' }} /> : null
  return (
    <div style={box}>
      <div style={{ ...row, gap: 5, fontSize: 14, lineHeight: '18px', fontWeight: 480, letterSpacing: '-0.005em', whiteSpace: 'nowrap' }}>{glyph}{e.title}</div>
      {e.time && <div style={{ marginTop: 1.1, fontSize: 13, lineHeight: '18px', letterSpacing: '-0.03em', color: t.sub, whiteSpace: 'nowrap' }}>{e.time}</div>}
      {e.extra && <div style={{ fontSize: 13, lineHeight: '18px', letterSpacing: '-0.02em', color: t.sub, whiteSpace: 'nowrap' }}>{e.extra}</div>}
    </div>
  )
}

/* ---------------- controls (UniOps grammar) ---------------- */
const ctl: CSSProperties = { ...row, height: 32, borderRadius: 12, background: '#fff', boxShadow: `0 0 0 1px ${RING}, 0 1px 2px rgba(0,0,0,.05)`, fontSize: 14, whiteSpace: 'nowrap', boxSizing: 'border-box', border: 0, color: INK, fontFamily: 'inherit', cursor: 'pointer' }
function Pill({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <button style={{ ...ctl, gap: 9, padding: '0 11px 0 12px' }}>
      {icon}<span><span style={{ color: SUB }}>{label}</span> {value}</span><RiArrowDownSLine size={14} color="#8a8a8a" />
    </button>
  )
}
const primary: CSSProperties = { ...ctl, gap: 7, padding: '0 14px 0 12px', color: '#fff', fontWeight: 450, background: 'linear-gradient(180deg, #4ea9ff 0%, #4b9aff 30%, #4886fd 100%)', boxShadow: 'inset 0 1px 0 #70c7ff, 0 0 0 1px #4682fb, 0 2px 5px rgba(30,100,240,.18)' }

/* ---------------- sidebar ---------------- */
const Caps = ({ y, children }: { y: number; children: ReactNode }) => <div style={abs(26.5, y, { fontSize: 11, lineHeight: '14px', fontWeight: 500, letterSpacing: '0.02em', color: SUB })}>{children}</div>
function Nav({ y, icon, label, active }: { y: number; icon: typeof RiAddLine; label: string; active?: boolean }) {
  const I = icon
  return (
    <a style={{ ...abs(13, y), ...row, width: 200, height: 35, boxSizing: 'border-box', padding: '0 13px 0 13.5px', gap: 10.5, borderRadius: 999, background: active ? '#ebebeb' : undefined, fontSize: 14, fontWeight: 450, color: '#2e2e2e', textDecoration: 'none', cursor: 'pointer' }}>
      <I size={16} color={active ? ACC : '#7a7a7a'} style={{ flex: 'none' }} />{label}
      {active && <RiArrowRightSLine size={15} color="#858585" style={{ marginLeft: 'auto' }} />}
    </a>
  )
}
const Face = ({ t, bg, fg, s = 20, ring }: { t: string; bg: string; fg: string; s?: number; ring?: boolean }) => (
  <span style={{ display: 'grid', placeItems: 'center', flex: 'none', width: s, height: s, borderRadius: 999, background: bg, color: fg, fontSize: Math.max(10, s * 0.5), fontWeight: 500, lineHeight: 1, boxShadow: ring ? '0 0 0 1.5px #fff' : undefined }}>{t}</span>
)
const PEOPLE: [string, string, string, string, string][] = [
  ['Leo Park', 'L', '#c0d5ff', '#122368', 'You'],
  ['Ana Ruiz', 'A', '#ffc0c5', '#681219', 'In a call'],
  ['Mia Chen', 'M', '#cac0ff', '#351a75', 'Focus'],
  ['Sam Okoye', 'S', '#ffe7b3', '#5c3d00', 'Out Fri'],
  ['Jon Weber', 'J', '#c2f5da', '#0b4627', 'Free'],
  ['Iris Holm', 'I', '#e3e3e3', '#2e2e2e', 'Free'],
]

function Sidebar() {
  return (
    <>
      <div style={abs(21.5, 111.5, { width: 31, height: 31, borderRadius: 8.5, background: 'linear-gradient(160deg, #6cc7ff, #2f7bff)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 0 0 1px rgba(30,90,200,.18)', display: 'grid', placeItems: 'center' })}>
        <svg width={15} height={15} viewBox="0 0 22 22" aria-hidden><g fill="#fff"><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill="rgba(255,255,255,.55)" /></svg>
      </div>
      <div style={abs(64, 108, { fontSize: 13, lineHeight: '18px', fontWeight: 500, color: '#2f2f2f' })}>Cadence</div>
      <div style={abs(63.5, 127, { fontSize: 12, lineHeight: '17px', color: SUB })}>Northwind</div>
      <RiSidebarFoldLine size={15} color="#777" style={abs(183, 119.5)} />
      <Caps y={168}>WORKSPACE</Caps>
      <Nav y={193.5} icon={RiCalendar2Line} label="Calendar" active />
      <Nav y={232.5} icon={RiSparkling2Line} label="Find a time" />
      <Nav y={271.5} icon={RiFocus3Line} label="Focus time" />
      <Nav y={310.5} icon={RiLinkM} label="Booking links" />
      <Nav y={349.5} icon={RiBarChartBoxLine} label="Insights" />
      <Caps y={404}>TEAM</Caps>
      {PEOPLE.map(([n, t, bg, fg, st], i) => (
        <div key={n} style={{ ...abs(13, 429 + i * 39), ...row, width: 200, height: 35, boxSizing: 'border-box', padding: '0 13px 0 11.5px', gap: 8.5, fontSize: 14, fontWeight: 450, color: '#2e2e2e' }}>
          <Face t={t} bg={bg} fg={fg} s={20} />{n}
          <span style={{ marginLeft: 'auto', paddingTop: 1, fontSize: 12.5, fontWeight: 400, color: SUB }}>{st}</span>
        </div>
      ))}
      <Caps y={681}>UTILITY</Caps>
      <Nav y={706.5} icon={RiSettings3Line} label="Settings" />
      <Nav y={745.5} icon={RiQuestionLine} label="Support" />
    </>
  )
}

/* ---------------- popover (R3 anatomy, widened for the suggestion) ---------------- */
function Popover({ left, top }: { left: number; top: number }) {
  const W = 320
  const rows: [typeof RiAddLine, ReactNode][] = [
    [RiTimeLine, 'Thu, Oct 22 · 14:30 – 15:30'],
    [RiGroupLine, <span key="p">6 of 6 free</span>],
    [RiVideoOnLine, 'Video call, link sent on booking'],
    [RiShieldCheckLine, 'No focus block moved'],
  ]
  const Act = ({ x, I, s = 15, label }: { x: number; I: typeof RiAddLine; s?: number; label: string }) => (
    <button aria-label={label} style={{ ...abs(x - (24 - s) / 2, 18), width: 24, height: 24, display: 'grid', placeItems: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}><I size={s} color="#6f6f6f" /></button>
  )
  return (
    <div role="dialog" aria-label="Suggested slot" style={{ ...abs(left, top), width: W, height: 316, borderRadius: 14.5, background: '#fff', boxShadow: `0 0 0 1px ${RING}, 0 4px 14px rgba(0,0,0,.05)` }}>
      <div style={abs(17, 23.5, { width: 10.5, height: 10.5, borderRadius: 2.5, background: ACC })} />
      <div style={abs(35.5, 19, { fontSize: 14, lineHeight: '20px', color: SUB, whiteSpace: 'nowrap' })}>Suggested by Cadence</div>
      <Act x={214.5} I={RiRefreshLine} label="Other times" />
      <Act x={247} I={RiMoreLine} label="More" />
      <Act x={281.5} I={RiCloseLine} s={14} label="Close" />
      <div style={abs(17.5, 60, { fontSize: 14, lineHeight: '20px', fontWeight: 500, whiteSpace: 'nowrap' })}>Design crit · v2.4</div>
      {rows.map(([I, t], i) => (
        <div key={i}>
          <I size={15} color="#8a8a8a" style={abs(17.5, 96.5 + i * 30)} />
          <div style={abs(45.5, 96 + i * 30, { fontSize: 14, lineHeight: '16px', letterSpacing: '-0.012em', whiteSpace: 'nowrap' })}>{t}</div>
        </div>
      ))}
      {/* the six people, right-aligned on the people row */}
      <div style={{ ...abs(0, 125.5), right: 18.5, left: 'auto', ...row }}>
        {PEOPLE.map(([n, t, bg, fg], i) => <span key={n} style={{ marginLeft: i ? 1.5 : 0 }}><Face t={t} bg={bg} fg={fg} s={18} ring /></span>)}
      </div>
      <RiAlignLeft size={15} color="#8a8a8a" style={abs(17.5, 217)} />
      <div style={abs(45.5, 214, { width: 256, fontSize: 14, lineHeight: '18px', color: SUB })}>Only hour this week with all six free. Next best: Fri 15:00, Sam is out.</div>
      <div style={{ ...abs(0, 267), right: 17, left: 'auto', ...row, gap: 8 }}>
        <button style={{ ...ctl, padding: '0 12px' }}>Other times</button>
        <button style={{ ...primary, padding: '0 13px' }}>Book this slot</button>
      </div>
    </div>
  )
}

/* ---------------- the week card ---------------- */
function Week() {
  const days: [string, string][] = [['Mon', '19'], ['Tue', '20'], ['Wed', '21'], ['Thu', '22'], ['Fri', '23']]
  const today = 3, nowY = hy(11) + (64 * 20) / 60
  const sugg = EVENTS.find((e) => e.kind === 'sugg')!
  const moved = EVENTS.find((e) => e.title === 'Design sync')!
  const noteTop = hy(moved.h1) + 2 + 4
  return (
    <div style={{ ...abs(26, 112.5), width: CARD_W, height: 990, borderRadius: 25, background: '#fff', boxShadow: `0 0 0 1px ${RING}, 0 1px 0 rgba(0,0,0,.035)`, overflow: 'hidden' }}>
      {/* outside working hours (before 09:00, after 18:00) */}
      <div style={abs(GUT, hy(8), { width: CARD_W - GUT, height: 64, background: '#fafaf9' })} />
      <div style={abs(GUT, hy(18), { width: CARD_W - GUT, height: 400, background: '#fafaf9' })} />
      {/* rules: header, all-day lane, hours, columns */}
      <div style={abs(0, HEAD, { width: CARD_W, height: 1, background: LINE })} />
      <div style={abs(0, HEAD + ALLDAY, { width: GUT, height: 1, background: LINE })} />
      {Array.from({ length: 14 }, (_, i) => <div key={i} style={abs(GUT, hy(8 + i), { width: CARD_W - GUT, height: 1, background: LINE })} />)}
      {[0, 1, 2, 3, 4].map((d) => <div key={d} style={abs(dx(d), 0, { width: 1, height: 990, background: LINE })} />)}
      {/* gutter: zone + hour labels */}
      <div style={abs(0, 0, { width: GUT, height: HEAD, display: 'grid', placeItems: 'center', fontSize: 12, color: SUB })}>CEST</div>
      <div style={abs(0, HEAD, { width: GUT, height: ALLDAY, display: 'grid', placeItems: 'center', fontSize: 12, color: SUB })}>All day</div>
      {Array.from({ length: 13 }, (_, i) => 9 + i).map((h) => (
        <div key={h} style={abs(0, hy(h) - 9, { width: GUT - 12, textAlign: 'right', fontSize: 12, lineHeight: '18px', color: SUB, fontVariantNumeric: 'tabular-nums' })}>{String(h).padStart(2, '0')}:00</div>
      ))}
      {/* day headers */}
      {days.map(([w, n], i) => (
        <div key={w} style={{ ...abs(dx(i) + 13.5, 0), ...row, height: HEAD, gap: 9, fontSize: 14 }}>
          <span style={{ color: SUB }}>{w}</span>
          {i === today
            ? <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, borderRadius: 999, background: INK, color: '#fff', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
            : <span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}
        </div>
      ))}
      {/* all-day lane */}
      <div style={{ ...abs(dx(2) + 4, HEAD + 5), ...row, width: COL - 8, height: 24, boxSizing: 'border-box', padding: '0 8px', borderRadius: 7, background: TONE.purple.bg, color: TONE.purple.fg, fontSize: 13, fontWeight: 480 }}>v2.4 code freeze</div>
      <div style={{ ...abs(dx(4) + 4, HEAD + 5), ...row, gap: 6, width: COL - 8, height: 24, boxSizing: 'border-box', padding: '0 8px', borderRadius: 7, background: '#f4f4f3', boxShadow: `inset 0 0 0 1px ${FOCUS.ring}`, color: '#3a3a3a', fontSize: 13, fontWeight: 480 }}><RiUserLine size={13} color="#5f5f5f" />Sam Okoye · out of office</div>

      {/* now: hairline across the week, 2px bar through today, 9px dot on today's left rule (under the events) */}
      <div style={abs(GUT, nowY, { width: CARD_W - GUT, height: 1, background: NOW })} />
      <div style={abs(dx(today), nowY - 0.5, { width: COL, height: 2, background: NOW })} />
      <div style={abs(dx(today) - 4, nowY - 4, { width: 9, height: 9, borderRadius: 999, background: NOW })} />

      {EVENTS.map((e, i) => <Event key={i} e={e} />)}

      {/* resolved conflict: the note hangs 4px under the moved meeting */}
      <div style={{ ...abs(dx(moved.d) + 4, noteTop), width: COL - 8, height: 44, boxSizing: 'border-box', padding: '0 8px', borderRadius: 9.5, background: NOTE.bg, boxShadow: `inset 0 0 0 1px ${NOTE.ring}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ ...row, gap: 5, fontSize: 12.5, lineHeight: '16px', fontWeight: 500, color: NOTE.fg, whiteSpace: 'nowrap' }}><RiArrowGoForwardLine size={13} color={ACC} />Moved here from 10:00</div>
        <div style={{ fontSize: 12.5, lineHeight: '16px', color: NOTE.sub, whiteSpace: 'nowrap', paddingLeft: 18 }}>Clashed with your focus block</div>
      </div>

      <Popover left={dx(sugg.d) + 4 - 8 - 320} top={420} />
    </div>
  )
}

export default function CadenceProductK() {
  const Ico = ({ I, x, y, s = 16, c = '#555' }: { I: typeof RiAddLine; x: number; y: number; s?: number; c?: string }) => <I size={s} color={c} style={abs(x, y)} />
  const WW = 1456
  return (
    <div style={{ ...font, position: 'relative', width: 1600, height: 1200, overflow: 'hidden', background: '#e9e9e7', color: INK }}>
      <main data-product style={{ ...abs(72, 64), width: WW, height: 1136, borderRadius: '30px 30px 0 0', background: BG, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,.06), 0 24px 60px -12px rgba(0,0,0,.10)' }}>
        {/* chrome: title bar with the URL row (UniOps) */}
        <div style={abs(0, 0, { width: WW, height: 88.5, background: '#eeeeee', boxShadow: 'inset 0 -1px 0 #e2e2e2' })} />
        {[['#ff4b59', 27], ['#ffc600', 44.5], ['#00ca48', 61.75]].map(([c, x]) => <div key={x} style={abs((x as number) - 5.75, 17.75, { width: 11.5, height: 11.5, borderRadius: 999, background: c as string })} />)}
        <div style={abs(WW - 270, 9, { width: 68, height: 30, borderRadius: 999, background: '#e4e4e4' })}>
          <div style={abs(2, 2, { width: 26, height: 26, borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,.07)' })} />
        </div>
        <Ico I={RiSunLine} x={WW - 264.5} y={15} /><Ico I={RiMoonLine} x={WW - 237} y={15} c="#666" />
        <div style={abs(WW - 212, 22, { width: 2.5, height: 2.5, borderRadius: 9, background: '#c8c8c8' })} />
        <Ico I={RiNotification3Line} x={WW - 187} y={13.5} s={18} c="#555" /><div style={abs(WW - 173, 11, { width: 4.5, height: 4.5, borderRadius: 9, background: '#fb3748' })} />
        <Ico I={RiSearchLine} x={WW - 147.5} y={14.5} s={17} />
        <Ico I={RiDownload2Line} x={WW - 108} y={14.5} s={17} />
        <div style={abs(WW - 76, 22, { width: 2.5, height: 2.5, borderRadius: 9, background: '#c8c8c8' })} />
        <div style={abs(WW - 52, 10, {})}><Face t="L" bg="#e8e8e8" fg="#2f2f2f" s={26} /></div>
        <Ico I={RiArrowLeftSLine} x={23} y={68} s={14} /><Ico I={RiArrowRightSLine} x={53.5} y={68} s={14} /><Ico I={RiRestartLine} x={83} y={67} s={15} />
        <div style={{ ...abs(118, 59), ...row, gap: 8, width: WW - 118 - 17, height: 30.5, boxSizing: 'border-box', padding: '0 10px', borderRadius: 8.5, background: '#efefef', boxShadow: 'inset 0 0 0 1px #e8e8e8', fontSize: 13, fontWeight: 450, color: '#6b6b6b' }}>
          <RiAddLine size={13} color="#666" /><span>https://<span style={{ color: '#2f2f2f' }}>cadence.app/northwind/week</span></span>
        </div>

        <aside><Sidebar /></aside>

        {/* main panel */}
        <section style={{ ...abs(216.5, 99.5), width: WW - 216.5 - 5.5, height: 1100, borderRadius: '25px 25px 0 0', background: BG, boxShadow: '0 0 0 1px #e9e9e9' }}>
          <div style={{ ...abs(28, 23.5), ...row, gap: 10, height: 20 }}>
            <h1 style={{ margin: 0, fontSize: 15, lineHeight: '19px', fontWeight: 500, color: '#2f2f2f' }}>Calendar</h1>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: '#c4c4c4' }} />
            <span style={{ fontSize: 14, color: SUB }}>Oct 19 – 23, 2026 · 15 meetings, 8h of focus held</span>
          </div>
          <div style={{ ...abs(26, 60.5), ...row, gap: 9.5 }}>
            <Pill icon={<RiGroupLine size={14} color="#8a8a8a" />} label="Team" value="Product design" />
            <Pill icon={<RiUserLine size={14} color="#8a8a8a" />} label="People" value="All 6" />
            <Pill icon={<RiGlobalLine size={14} color="#8a8a8a" />} label="Zone" value="Berlin" />
          </div>
          <div style={{ ...abs(0, 60.5), right: 26, left: 'auto', ...row, gap: 9.5 }}>
            <button style={{ ...ctl, padding: '0 14px', fontWeight: 450 }}>Today</button>
            <div style={{ ...ctl, width: 66, justifyContent: 'space-between', padding: '0 0' }}>
              <button aria-label="Previous week" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}><RiArrowLeftSLine size={16} color="#1c1c1c" /></button>
              <span style={{ width: 1, height: 16, background: RING }} />
              <button aria-label="Next week" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}><RiArrowRightSLine size={16} color="#1c1c1c" /></button>
            </div>
            <div role="tablist" style={{ ...row, height: 32, boxSizing: 'border-box', padding: 3, borderRadius: 12, background: '#ededed', fontSize: 14 }}>
              <button role="tab" style={{ height: 26, padding: '0 14px', border: 0, background: 'none', color: SUB, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>Day</button>
              <button role="tab" aria-selected style={{ height: 26, padding: '0 14px', border: 0, borderRadius: 8, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)', color: INK, fontWeight: 500, fontSize: 14, fontFamily: 'inherit', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>Week</button>
              <button role="tab" style={{ height: 26, padding: '0 14px', border: 0, background: 'none', color: SUB, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>Month</button>
            </div>
            <button style={primary}><RiSparkling2Line size={16} color="#fff" />Find a time</button>
          </div>
          <Week />
        </section>
      </main>
    </div>
  )
}
