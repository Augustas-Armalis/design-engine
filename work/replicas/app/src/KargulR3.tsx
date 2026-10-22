// Kargul replica R3 (study only, never published): the calendar event popover post, his most-liked recent post
// ("i'm in love with this UI", 716 likes, 68k views). Reference: knowledge/benchmarks/kargul-x/latest/
// kxl-014-1-2111515571179122856.jpg, 960x2048 = 480x1024 CSS at an exact 2x (every grid line is 2 device px).
// All geometry below is written in the reference's 2x pixels and halved by d(), so each number is a probe reading.
import type { CSSProperties, ReactNode } from 'react'

const d = (v: number) => v / 2
const INK = '#171717', SUB = '#6f6f6f', LINE = '#e8e8e8', NOW = '#e0735a'
const font: CSSProperties = { fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', WebkitFontSmoothing: 'antialiased' }

// event palette: tint fill + deep same-hue ink (KMD-08); time line is the ink at lower alpha
const EV = {
  blue: { bg: '#c5e3ff', fg: '#1d3b57', sub: 'rgba(29,59,87,.72)' },
  purple: { bg: '#dcc8fd', fg: '#3d2862', sub: 'rgba(61,40,98,.72)' },
  pink: { bg: '#ffcadd', fg: '#62243f', sub: 'rgba(98,36,63,.72)' },
  green: { bg: '#bfeed9', fg: '#174a37', sub: 'rgba(23,74,55,.72)' },
  peach: { bg: '#ffdfcc', fg: '#6a3418', sub: 'rgba(106,52,24,.72)' },
  yellow: { bg: '#ffe7a2', fg: '#5f4c16', sub: 'rgba(95,76,22,.8)' },
}
type Tone = keyof typeof EV
// hour line y (2x) for hour h: 9:00 sits at 748, 128 per hour
const hy = (h: number) => 748 + (h - 9) * 128

function Ev({ x0, x1, h0, h1, tone, title, time, extra, sel, tx = 17, ra }: { x0: number; x1: number; h0: number; h1: number; tone: Tone; title: string; time?: string; extra?: string; sel?: boolean; tx?: number; ra?: [number, number] }) {
  // tx: text inset in 2x px (8.5 css in Thu, 7 in Wed, 7.5 in Fri: his columns are not one component); ra: right ink edges
  // for the cut-off events on the left edge. Short (30 min) events centre their one line; the selected one insets by its 1.5px ring.
  const c = EV[tone], top = hy(h0) + 8, hgt = (h1 - h0) * 128 - 4, short = h1 - h0 < 1, inset = sel ? 2 : 0
  const pos = (i: number): CSSProperties => ra ? { right: d(x1 - ra[i]) - 0.5 } : { left: d(tx) + inset }
  return (
    <div style={{ position: 'absolute', left: d(x0), top: d(top), width: d(x1 - x0), height: d(hgt), background: c.bg, borderRadius: 8, overflow: 'hidden', boxShadow: sel ? `inset 0 0 0 1.5px #66531b` : undefined }}>
      <div style={{ position: 'absolute', ...pos(0), top: (short ? 5.6 : 7.6) + inset, maxWidth: ra ? undefined : d(x1 - x0) - 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14, lineHeight: '18px', fontWeight: 480, color: c.fg, letterSpacing: '-0.005em' }}>{title}</div>
      {time && <div style={{ position: 'absolute', ...pos(1), top: 26.7 + inset, whiteSpace: 'nowrap', fontSize: 13, lineHeight: '18px', letterSpacing: '-0.03em', color: c.sub }}>{time}</div>}
      {extra && <div style={{ position: 'absolute', ...pos(1), top: 44.7, whiteSpace: 'nowrap', fontSize: 13, lineHeight: '18px', letterSpacing: '-0.03em', color: c.sub }}>{extra}</div>}
    </div>
  )
}

const Ico = ({ children, x, y, s = 15 }: { children: ReactNode; x: number; y: number; s?: number }) => (
  <svg style={{ position: 'absolute', left: x, top: y }} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
)

export default function KargulR3() {
  const colX = [123.5, 374.8, 626.2, 877.5] // vertical grid lines (2x), pitch 251.33
  return (
    <div style={{ ...font, position: 'relative', width: 480, height: 1024, overflow: 'hidden', background: '#ffffff', color: INK }}>
      <style>{'.kr3, .kr3 * { corner-shape: round; }'}</style>
      <div className="kr3" style={{ position: 'absolute', inset: 0 }}>
        {/* window top edge + grey app bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 480, height: 52, background: '#f8f8f7', boxShadow: 'inset 0 1px 0 #dcdcda, inset 0 -1px 0 #e8e8e8' }} />
        {/* weekend column tint (Sat) */}
        <div style={{ position: 'absolute', left: d(878.5), top: d(254), width: 60, height: 900, background: '#fafaf8' }} />
        {/* header row divider */}
        <div style={{ position: 'absolute', left: 0, top: d(252), width: 480, height: 1, background: '#e6e6e6' }} />
        {/* hour lines */}
        {Array.from({ length: 13 }, (_, i) => <div key={i} style={{ position: 'absolute', left: 0, top: d(364 + i * 128), width: 480, height: 1, background: LINE }} />)}
        {/* column lines (run through the header row) */}
        {colX.map((x) => <div key={x} style={{ position: 'absolute', left: d(x) - 0.5, top: d(254), width: 1, height: 900, background: LINE }} />)}

        {/* toolbar */}
        <div style={{ position: 'absolute', left: d(342), top: d(147), width: 65, height: 32, borderRadius: 8, boxShadow: 'inset 0 0 0 1px #dcdcda', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>Today</div>
        <div style={{ position: 'absolute', left: d(488), top: d(147), width: 67, height: 32, borderRadius: 8, boxShadow: 'inset 0 0 0 1px #dcdcda' }}>
          <svg style={{ position: 'absolute', left: d(510 - 488), top: d(168 - 147) }} width={9} height={14} viewBox="0 0 9 14" aria-hidden><path d="M6.8 2.2 2.2 7l4.6 4.8" fill="none" stroke="#1c1c1c" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" /></svg>
          <div style={{ position: 'absolute', left: d(554 - 488), top: 8, width: 1, height: 16, background: '#dcdcda' }} />
          <svg style={{ position: 'absolute', left: d(576 - 488), top: d(168 - 147) }} width={9} height={14} viewBox="0 0 9 14" aria-hidden><path d="M2.2 2.2 6.8 7l-4.6 4.8" fill="none" stroke="#1c1c1c" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ position: 'absolute', left: d(638), top: d(147), width: 200, height: 32, borderRadius: 9, background: '#ededed' }}>
          <span style={{ position: 'absolute', left: d(668 - 638), top: 0, lineHeight: '32px', fontSize: 14, color: SUB }}>Day</span>
          <div style={{ position: 'absolute', left: d(748 - 638), top: 3, width: 62, height: 26, borderRadius: 6.5, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 500 }}>Week</div>
          <span style={{ position: 'absolute', left: d(904 - 638), top: 0, lineHeight: '32px', fontSize: 14, color: SUB }}>Month</span>
        </div>

        {/* day header */}
        {([['Wed', 150, '14', 234], ['Thu', 400, '15', 473], ['Fri', 654, '16', 710]] as const).map(([w, x, n, nx]) => (
          <div key={w}>
            <div style={{ position: 'absolute', left: d(x), top: d(290), fontSize: 14, lineHeight: '20px', color: SUB }}>{w}</div>
            <div style={{ position: 'absolute', left: d(nx), top: d(290), fontSize: 14, lineHeight: '20px', fontWeight: 500 }}>{n}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', left: d(904), top: d(290), fontSize: 14, lineHeight: '20px', fontWeight: 500 }}>Sat</div>

        {/* now line: hairline across, a 2px bar through today, 9px dot on the day line */}
        <div style={{ position: 'absolute', left: 0, top: d(937), width: 480, height: 1, background: NOW }} />
        <div style={{ position: 'absolute', left: d(626), top: d(936), width: d(888 - 626), height: 2, background: NOW }} />
        <div style={{ position: 'absolute', left: d(625.5) - 4.5, top: d(937.5) - 4.5, width: 9, height: 9, borderRadius: 99, background: NOW }} />

        {/* events */}
        <Ev x0={-120} x1={141} h0={9.5} h1={10.5} tone="blue" title="Design Review" time="09:30 – 10:30" ra={[100, 63]} />
        <Ev x0={-120} x1={141} h0={11} h1={12} tone="purple" title="Client Meeting" time="11:00 – 12:00" ra={[97, 64]} />
        <Ev x0={-120} x1={141} h0={15} h1={16} tone="blue" title="Sprint Planning" time="15:00 – 16:00" ra={[121, 59]} />
        <Ev tx={14} x0={159} x1={405} h0={10} h1={11} tone="purple" title="Team Standup" time="10:00 – 11:00" />
        <Ev tx={14} x0={159} x1={405} h0={13} h1={14} tone="blue" title="Research Revie..." time="13:00 – 14:00" />
        <Ev tx={14} x0={159} x1={405} h0={15} h1={16.5} tone="green" title="Deep Work" time="15:00 – 16:30" extra="Focus room" />
        <Ev x0={420} x1={668} h0={9} h1={10} tone="blue" title="Sprint Planning" time="09:00 – 10:00" />
        <Ev x0={420} x1={668} h0={11.5} h1={12} tone="pink" title="Quick Catch-up" />
        <Ev x0={420} x1={668} h0={14} h1={15} tone="blue" title="Design Handoff" time="14:00 – 15:00" />
        <Ev tx={15} x0={686} x1={932} h0={9.5} h1={10} tone="purple" title="Weekly Check-..." />
        <Ev tx={15} x0={686} x1={932} h0={11} h1={12} tone="blue" title="Project Review" time="11:00 – 12:00" />
        <Ev tx={15} x0={686} x1={932} h0={14} h1={15} tone="pink" title="Weekly Wrap-up" time="14:00 – 15:00" />
        <Ev x0={948} x1={1200} h0={10} h1={11} tone="peach" title="Lunch" />
        <Ev x0={886} x1={1200} h0={16} h1={17} tone="yellow" title="Plan Next Week" time="16:00 – 17:00" sel />

        {/* popover: ring + one soft layer (KMD-05 L2), r12 */}
        <div style={{ position: 'absolute', left: d(262), top: d(1462), width: d(870 - 262), height: d(1974 - 1462), borderRadius: 12, background: '#fff', boxShadow: '0 0 0 1px #e6e6e6, 0 4px 14px rgba(0,0,0,.05)' }}>
          {(() => { const ox = 262, oy = 1462, P = (x: number) => d(x - ox), Q = (y: number) => d(y - oy); return (<>
            <div style={{ position: 'absolute', left: P(296), top: Q(1509), width: 10.5, height: 10.5, borderRadius: 2.5, background: '#e8c66e' }} />
            <div style={{ position: 'absolute', left: P(333), top: Q(1500), fontSize: 14, lineHeight: '20px', color: SUB, whiteSpace: 'nowrap' }}>Reminders</div>
            <span style={{ color: '#6f6f6f' }}>
              <Ico x={P(659)} y={Q(1504)}><path d="M16.9 3.6a2.1 2.1 0 0 1 3 3L8 18.5l-4 1 1-4Z" /></Ico>
              <Ico x={P(724)} y={Q(1504)}><path d="M4 6.5h16M9.5 6.5V4.8c0-.6.4-1 1-1h3c.6 0 1 .4 1 1v1.7M6 6.5l.8 12.2c.1 1 .9 1.8 1.9 1.8h6.6c1 0 1.8-.8 1.9-1.8L18 6.5" /></Ico>
              <Ico x={P(791)} y={Q(1507)} s={13}><path d="M5 5l14 14M19 5 5 19" /></Ico>
            </span>
            <div style={{ position: 'absolute', left: P(297), top: Q(1582), fontSize: 14, lineHeight: '20px', fontWeight: 500, whiteSpace: 'nowrap' }}>Plan Next Week</div>
            {([[1655, 'Sun, Oct 18 · 16:00 – 17:00', <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>], [1715, 'Home office', <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>], [1775, '10 minutes before', <><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15Z" /><path d="M10.2 20.5h3.6" /></>]] as const).map(([y, t, ic]) => (
              <div key={y}>
                <span style={{ color: '#8a8a8a' }}><Ico x={P(297)} y={Q(y)}>{ic}</Ico></span>
                <div style={{ position: 'absolute', left: P(353), top: Q(y) - 0.5, fontSize: 14, lineHeight: '16px', letterSpacing: '-0.012em', whiteSpace: 'nowrap' }}>{t}</div>
              </div>
            ))}
            <span style={{ color: '#8a8a8a' }}><Ico x={P(297)} y={Q(1836)}><path d="M4 7h16M4 12h16M4 17h10" /></Ico></span>
            <div style={{ position: 'absolute', left: P(353), top: Q(1830), width: 240, fontSize: 14, lineHeight: '18px', color: SUB }}>Review priorities, check upcoming deadlines, and block focus time for the week ahead.</div>
          </>) })()}
        </div>
      </div>
    </div>
  )
}
