// Cadence bento, founder (lunor) grammar: dark Plasma/Inkflow product-fragment bento (LN-23..29), rounder per the
// founder's 2026-10-22 note (large r24, small r20). Fragments reuse Marcel's measured primitives: R3 calendar geometry
// (event = slot + 2, height - 3, r8, flex-column text at a 6/8 inset, popover detail rows at a 28 pitch) and R4 dark
// surfaces (one surface, one lighter step, one 1px rule colour, no blur except the floating layer).
// Sample data only: names, times and hours are illustrative and labelled sample.
import '@fontsource-variable/geist'
import type { CSSProperties, ReactNode } from 'react'
import {
  RiArrowLeftSLine, RiArrowRightSLine, RiArrowUpLine, RiCloseLine, RiTimeLine, RiGroupLine, RiShieldCheckLine,
  RiSparkling2Fill, RiLockLine, RiBriefcase4Line, RiHome4Line, RiTeamLine, RiFocus3Line,
} from '@remixicon/react'

// ---- tokens (LN-25 dark cell: +3 L over the page, ring about +12 L; R4: one raised step, one rule) ----
const PAGE = '#0c0c0d', CELL = '#131315', CELL_RING = '#222226'
const PANEL = '#18181b', PANEL_RING = '#27272c', STEP = '#202024', STEP2 = '#2a2a2f', RULE = '#232327'
const INK = '#f4f4f5', SUB = '#a3a3ab', MUTE = '#8f8f97'
// V_FILL is the 14% violet tint pre-blended onto PANEL, so gridlines never show through a selected event
const V = '#8b8cf0', V_FILL = '#282839', V_RING = 'rgba(139,140,240,0.62)', V_INK = '#dedeff', V_SUB = '#b9baf6'
const font: CSSProperties = { fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif', WebkitFontSmoothing: 'antialiased', fontFeatureSettings: '"tnum" 1' }

const abs = (x: number, y: number, w?: number, h?: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h, ...s })
const ring = (c = PANEL_RING) => `0 0 0 1px ${c}`

// ---- cell: copy pinned top-left at 24 in every cell (LN-26), one ring drawn on top so cropped fragments never cover it ----
function Cell({ x, y, w, h, r, title, desc, label, children, fade = 56 }: { x: number; y: number; w: number; h: number; r: number; title: string; desc: string; label: string; children: ReactNode; fade?: number }) {
  return (
    <article style={abs(x, y, w, h, { borderRadius: r, background: CELL, overflow: 'hidden', isolation: 'isolate' })}>
      <div role="img" aria-label={label} style={{ position: 'absolute', inset: 0 }}>{children}</div>
      {fade > 0 && <div style={abs(0, h - fade, w, fade, { background: `linear-gradient(180deg, rgba(19,19,21,0) 0%, ${CELL} 100%)`, pointerEvents: 'none' })} />}
      <div style={abs(24, 24, w - 48, undefined, { zIndex: 2 })}>
        <h3 style={{ margin: 0, fontSize: 20, lineHeight: '26px', fontWeight: 500, letterSpacing: '-0.015em', color: INK }}>{title}</h3>
        <p style={{ margin: '6px 0 0', maxWidth: 330, fontSize: 15, lineHeight: '22px', fontWeight: 400, color: SUB, textWrap: 'balance' }}>{desc}</p>
      </div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: r, boxShadow: `inset 0 0 0 1px ${CELL_RING}`, pointerEvents: 'none', zIndex: 3 }} />
    </article>
  )
}

const Avatar = ({ t, bg, s = 20 }: { t: string; bg: string; s?: number }) => (
  <div style={{ width: s, height: s, borderRadius: 999, background: bg, boxShadow: `0 0 0 1.5px ${PANEL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: INK, lineHeight: 1 }}>{t}</div>
)
const Chip = ({ children, h = 24, style }: { children: ReactNode; h?: number; style?: CSSProperties }) => (
  <div style={{ height: h, padding: '0 8px', borderRadius: 8, background: STEP, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: SUB, whiteSpace: 'nowrap', ...style }}>{children}</div>
)

// ================= 1. week grid with the found slot (hero cell) =================
const COL = 160, GUT = 52, HOUR = 52, H0 = 10
const hy = (h: number) => 88 + (h - H0) * HOUR
type Kind = 'busy' | 'focus' | 'found'
function Ev({ day, h0, h1, title, sub, kind = 'busy' }: { day: number; h0: number; h1: number; title: string; sub?: string; kind?: Kind }) {
  const short = h1 - h0 <= 0.5
  const st: CSSProperties = kind === 'found'
    ? { background: V_FILL, boxShadow: `inset 0 0 0 1.5px ${V_RING}` }
    : kind === 'focus'
      ? { background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 6px), ${PANEL}`, boxShadow: `inset 0 0 0 1px ${STEP2}` }
      : { background: STEP, boxShadow: `inset 0 0 0 1px ${STEP2}` }
  const tc = kind === 'found' ? V_INK : kind === 'focus' ? SUB : INK, sc = kind === 'found' ? V_SUB : MUTE
  return (
    <div style={abs(GUT + day * COL + 4, hy(h0) + 2, COL - 8, (h1 - h0) * HOUR - 3, {
      borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: short ? 'row' : 'column', alignItems: short ? 'center' : 'stretch',
      justifyContent: 'flex-start', gap: 1, padding: short ? '0 8px' : `${Math.min(6, Math.floor(((h1 - h0) * HOUR - 3 - 32) / 2))}px 8px`, boxSizing: 'border-box', ...st,
    })}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, lineHeight: '16px', fontWeight: 500, color: tc, whiteSpace: 'nowrap' }}>
        {kind === 'focus' && <RiFocus3Line size={12} color={MUTE} />}{title}
      </div>
      {sub && !short && <div style={{ fontSize: 11.5, lineHeight: '15px', color: sc, whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{sub}</div>}
    </div>
  )
}

function WeekFragment() {
  const days: [string, string][] = [['Mon', '27'], ['Tue', '28'], ['Wed', '29'], ['Thu', '30'], ['Fri', '31']]
  const row = (y: number): CSSProperties => ({ position: 'absolute', left: 0, top: y, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' })
  return (
    <div data-product style={abs(24, 120, 900, 400, { borderRadius: 14, background: PANEL, boxShadow: ring(), overflow: 'hidden' })}>
      {/* toolbar (R3: Today, arrow pair with a divider, segmented Day/Week/Month) */}
      <div style={abs(0, 47, 900, 1, { background: RULE })} />
      <div style={abs(14, 10, 56, 28, { borderRadius: 8, boxShadow: `inset 0 0 0 1px ${STEP2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 500, color: INK })}>Today</div>
      <div style={abs(78, 10, 56, 28, { borderRadius: 8, boxShadow: `inset 0 0 0 1px ${STEP2}`, display: 'flex', alignItems: 'center' })}>
        <div style={{ flex: 1, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RiArrowLeftSLine size={15} color={SUB} /></div>
        <div style={{ width: 1, height: 14, background: STEP2 }} />
        <div style={{ flex: 1, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RiArrowRightSLine size={15} color={SUB} /></div>
      </div>
      <div style={abs(148, 0, 200, 48, { display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' })}>
        <span style={{ fontSize: 14, fontWeight: 500, color: INK, letterSpacing: '-0.01em' }}>Oct 27 – 31</span>
        <span style={{ fontSize: 13, color: MUTE }}>Week 44</span>
      </div>
      <div style={abs(316, 10, undefined, 28, { borderRadius: 999, background: STEP, display: 'flex', alignItems: 'center', gap: 8, padding: '0 11px 0 5px', whiteSpace: 'nowrap' })}>
        <div style={{ display: 'flex' }}>
          {([['M', '#3b3b41'], ['T', '#34343a'], ['A', '#2f2f35'], ['Y', '#45454c']] as const).map(([t, bg], i) => <div key={t} style={{ marginLeft: i ? -5 : 0 }}><Avatar t={t} bg={bg} s={20} /></div>)}
        </div>
        <span style={{ fontSize: 12.5, color: SUB }}>Finding 45 min for 4</span>
      </div>
      <div style={abs(560, 10, 196, 28, { borderRadius: 8, background: STEP, display: 'flex', alignItems: 'center', padding: 2, boxSizing: 'border-box' })}>
        {['Day', 'Week', 'Month'].map((l) => (
          <div key={l} style={{ flex: 1, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: l === 'Week' ? 500 : 400, color: l === 'Week' ? INK : MUTE, background: l === 'Week' ? STEP2 : 'transparent' }}>{l}</div>
        ))}
      </div>

      {/* day header + grid */}
      <div style={abs(0, 87, 900, 1, { background: RULE })} />
      {days.map(([w, n], i) => (
        <div key={w} style={abs(GUT + i * COL + 10, 48, COL - 10, 40, { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5 })}>
          <span style={{ color: MUTE }}>{w}</span><span style={{ color: INK, fontWeight: 500 }}>{n}</span>
        </div>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={abs(GUT + i * COL, 48, 1, 352, { background: RULE })} />)}
      {[11, 12, 13, 14, 15].map((h) => (
        <div key={h}>
          <div style={abs(GUT, hy(h), 848, 1, { background: RULE })} />
          <div style={abs(0, hy(h) - 8, GUT - 8, 16, { fontSize: 11, lineHeight: '16px', color: MUTE, textAlign: 'right' })}>{h}:00</div>
        </div>
      ))}

      <Ev day={0} h0={10} h1={11} title="Sprint planning" sub="10:00 – 11:00" />
      <Ev day={0} h0={11} h1={12.5} title="Focus · Ana" sub="Protected" kind="focus" />
      <Ev day={0} h0={13} h1={14} title="Design crit" sub="13:00 – 14:00" />
      <Ev day={1} h0={14} h1={15} title="Interview" sub="14:00 – 15:00" />
      <Ev day={2} h0={14} h1={15} title="Vendor call" sub="14:00 – 15:00" />
      <Ev day={3} h0={10} h1={11.5} title="Focus · Maya" sub="Protected" kind="focus" />
      <Ev day={3} h0={12} h1={12.5} title="Standup" />
      <Ev day={3} h0={13} h1={13.75} title="Roadmap review" sub="13:00 – 13:45 · all free" kind="found" />
      <Ev day={3} h0={14} h1={15} title="Customer call" sub="14:00 – 15:00" />
      {/* Friday bleeds off the cell edge: 30-min title-only blocks (like Standup) so no time label is cut (designers-eye DE-07) */}
      <Ev day={4} h0={10} h1={10.5} title="Retro" />
      <Ev day={4} h0={12.5} h1={13} title="Lunch" />

      {/* the one accent light: lifts the grid around the answer (LN-28) */}
      <div style={abs(380, 120, 520, 300, { background: 'radial-gradient(50% 50% at 50% 50%, rgba(139,140,240,0.13) 0%, rgba(139,140,240,0) 100%)', pointerEvents: 'none' })} />

      {/* popover (R3: swatch + label header, 14.5/500 title, 28-pitch detail rows with 15px icons a rung lighter) */}
      <div style={abs(GUT + COL + 2, 92, 2 * COL - 4, 200, { borderRadius: 12, background: '#1d1d21', boxShadow: '0 0 0 1px #303036, 0 18px 40px -10px rgba(0,0,0,0.7)' })}>
        <div style={abs(16, 14, 284, 20, { display: 'flex', alignItems: 'center', gap: 8 })}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: V }} />
          <span style={{ fontSize: 12.5, color: SUB, flex: 1 }}>Suggested by Tempra</span>
          <RiCloseLine size={14} color={MUTE} />
        </div>
        <div style={abs(16, 44, 284, 20, { fontSize: 14.5, lineHeight: '20px', fontWeight: 500, color: INK, letterSpacing: '-0.01em' })}>Roadmap review</div>
        <div style={abs(16, 74, 284, 84)}>
          {([[RiTimeLine, 'Thu, Oct 30 · 13:00 – 13:45'], [RiGroupLine, 'Maya, Theo, Ana and you'], [RiShieldCheckLine, 'Keeps both focus blocks']] as const).map(([I, t], i) => (
            <div key={t} style={{ ...row(i * 28), height: 20 }}><I size={15} color={MUTE} /><span style={{ fontSize: 13, lineHeight: '20px', color: i ? SUB : INK }}>{t}</span></div>
          ))}
        </div>
        <div style={abs(16, 158, 284, 28, { display: 'flex', gap: 8 })}>
          <div style={{ height: 28, padding: '0 12px', borderRadius: 999, background: INK, color: '#111113', fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center' }}>Send invite</div>
          <div style={{ height: 28, padding: '0 12px', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${STEP2}`, color: SUB, fontSize: 12.5, display: 'flex', alignItems: 'center' }}>Other times</div>
        </div>
      </div>
    </div>
  )
}

// ================= 2. ask composer with an answer =================
function AskFragment() {
  const opts: [string, string, string, boolean][] = [['Thu 30', '13:00 – 13:45', 'Best', true], ['Tue 28', '16:00 – 16:45', 'Theo ends late', false], ['Wed 29', '09:15 – 10:00', 'Before standup', false]]
  return (
    <div data-product style={abs(24, 120, 344, 360)}>
      <div style={abs(0, 0, 344, 104, { borderRadius: 14, background: PANEL, boxShadow: ring() })}>
        <div style={abs(14, 12, 316, 42, { fontSize: 14, lineHeight: '21px', color: INK, letterSpacing: '-0.005em' })}>
          Find 45 min with Maya, Theo and Ana next week. Not Friday.<span style={{ display: 'inline-block', width: 1.5, height: 16, background: V, verticalAlign: '-3px', marginLeft: 2 }} />
        </div>
        <div style={abs(14, 66, 316, 28, { display: 'flex', alignItems: 'center', gap: 6 })}>
          <Chip><RiGroupLine size={13} color={MUTE} />3 guests</Chip>
          <Chip><RiTimeLine size={13} color={MUTE} />45 min</Chip>
          <div style={{ flex: 1 }} />
          <div style={{ width: 28, height: 28, borderRadius: 999, background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RiArrowUpLine size={15} color="#111113" /></div>
        </div>
      </div>

      <div style={abs(0, 116, 344, 260, { borderRadius: 14, background: PANEL, boxShadow: ring() })}>
        <div style={abs(14, 14, 316, 22, { display: 'flex', alignItems: 'center', gap: 8 })}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: STEP2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RiSparkling2Fill size={12} color={INK} /></div>
          <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Tempra</span>
          <span style={{ fontSize: 12.5, color: MUTE }}>found 3 times</span>
        </div>
        <div style={abs(14, 46, 316, 40, { fontSize: 13.5, lineHeight: '20px', color: SUB })}>Thursday works for all four, and nobody's focus block has to move.</div>
        {/* the third time sits below the cell's cut, not half-visible on it (DE-01) */}
        {opts.slice(0, 2).map(([d, t, note, best], i) => (
          <div key={t} style={abs(12, 98 + i * 46, 320, 40, {
            borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 0 12px', boxSizing: 'border-box',
            background: best ? V_FILL : STEP, boxShadow: best ? `inset 0 0 0 1px ${V_RING}` : 'none',
          })}>
            <span style={{ width: 46, fontSize: 12.5, color: best ? V_SUB : MUTE }}>{d}</span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: best ? V_INK : INK }}>{t}</span>
            {best
              ? <span style={{ height: 20, padding: '0 7px', borderRadius: 6, background: 'rgba(139,140,240,0.22)', color: V_INK, fontSize: 11.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center' }}>{note}</span>
              : <span style={{ fontSize: 12, color: MUTE }}>{note}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ================= 3. focus-time card with a weekly chart =================
function FocusFragment() {
  const meet = [3.5, 4.5, 2, 1.5, 3, 0, 0], focus = [3, 2.5, 4, 4.25, 3.5, 0, 0], S = 18, BASE = 196
  return (
    <div data-product style={abs(24, 114, 420, 228, { borderRadius: 14, background: PANEL, boxShadow: ring(), overflow: 'hidden' })}>
      <div style={abs(16, 14, 200, 18, { fontSize: 12.5, lineHeight: '18px', color: SUB })}>Focus kept this week</div>
      <div style={abs(226, 14, 180, 18, { display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5, color: MUTE })}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: '#4a4a52' }} />Meetings</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: V }} />Focus</span>
      </div>
      <div style={abs(16, 34, 300, 32, { display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' })}>
        <span style={{ fontSize: 24, lineHeight: '32px', fontWeight: 500, color: INK, letterSpacing: '-0.02em' }}>18<span style={{ color: MUTE }}>h</span> 15<span style={{ color: MUTE }}>m</span></span>
        <Chip h={22} style={{ borderRadius: 6, padding: '0 7px', fontSize: 11.5 }}>+2h vs last week</Chip>
      </div>
      {[BASE, BASE - 36, BASE - 72].map((y) => <div key={y} style={abs(16, y, 404, 1, { background: RULE })} />)}
      {meet.map((m, i) => {
        const x = 16 + i * 52, f = focus[i], mh = Math.max(m * S, 4), fh = Math.max(f * S, 4)
        return (
          <div key={i}>
            <div style={abs(x, BASE - mh, 14, mh, { borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #4a4a52 0%, rgba(74,74,82,0.15) 100%)' })} />
            <div style={abs(x + 18, BASE - fh, 14, fh, { borderRadius: '4px 4px 0 0', background: f ? 'linear-gradient(180deg, #8b8cf0 0%, rgba(139,140,240,0.12) 100%)' : '#2a2a2f' })} />
            <div style={abs(x, BASE + 8, 32, 14, { fontSize: 11, lineHeight: '14px', color: i === 3 ? INK : MUTE, textAlign: 'center' })}>{'MTWTFSS'[i]}</div>
          </div>
        )
      })}
      {/* floating white tooltip card on the answer bar (LN-32) */}
      <div style={abs(16 + 3 * 52 + 25 - 52, 70, 104, 40, { borderRadius: 8, background: '#f4f4f5', boxShadow: '0 8px 20px -6px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10px', boxSizing: 'border-box', whiteSpace: 'nowrap' })}>
        <span style={{ fontSize: 10.5, lineHeight: '13px', color: '#5f5f67' }}>Thursday</span>
        <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 500, color: '#111113' }}>4h 15m focus</span>
      </div>
    </div>
  )
}

// ================= 4. a conflict, settled =================
function ConflictFragment() {
  const P = 44, hy2 = (h: number) => 46 + (h - 14) * P
  return (
    <div data-product style={abs(24, 114, 420, 270, { borderRadius: 14, background: PANEL, boxShadow: ring(), overflow: 'hidden' })}>
      <div style={abs(14, 0, 380, 36, { display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' })}>
        <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Tue, Oct 28</span>
        <span style={{ fontSize: 12.5, color: MUTE }}>1 meeting moved</span>
      </div>
      <div style={abs(0, 35, 420, 1, { background: RULE })} />
      {[14, 15, 16, 17].map((h) => (
        <div key={h}>
          <div style={abs(50, hy2(h), 370, 1, { background: RULE })} />
          <div style={abs(0, hy2(h) - 8, 42, 16, { fontSize: 11, lineHeight: '16px', color: MUTE, textAlign: 'right' })}>{h}:00</div>
        </div>
      ))}
      {/* fixed meeting */}
      <div style={abs(56, hy2(14) + 2, 142, P - 3, { borderRadius: 8, background: STEP, boxShadow: `inset 0 0 0 1px ${STEP2}`, display: 'flex', flexDirection: 'column', gap: 1, padding: '5px 8px', boxSizing: 'border-box' })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, lineHeight: '16px', fontWeight: 500, color: INK, whiteSpace: 'nowrap' }}>Hiring sync<RiLockLine size={11} color={MUTE} /></div>
        <div style={{ fontSize: 11.5, lineHeight: '15px', color: MUTE, whiteSpace: 'nowrap' }}>External guest</div>
      </div>
      {/* where the 1:1 was */}
      <div style={abs(204, hy2(14) + 2, 150, P / 2 - 3, { borderRadius: 7, border: '1px dashed #44444b', background: PANEL, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 8px' })}>
        <span style={{ fontSize: 12, lineHeight: '16px', color: MUTE, textDecoration: 'line-through', textDecorationColor: '#5a5a62', whiteSpace: 'nowrap' }}>1:1 Maya / Theo</span>
      </div>
      {/* connector sits on a panel-coloured strip so the 15:00 rule breaks around it instead of crossing it */}
      <svg style={abs(270, hy2(14.5) + 4, 18, 40, { background: PANEL })} viewBox="0 0 18 40" fill="none" aria-hidden>
        <path d="M9 2v30" stroke="#5a5a62" strokeWidth={1.25} strokeDasharray="2 3" strokeLinecap="round" />
        <path d="M5.5 33 9 37l3.5-4" stroke={V} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* where it went */}
      <div style={abs(204, hy2(15.5) + 2, 150, P * 0.75 + 4, { borderRadius: 8, background: V_FILL, boxShadow: `inset 0 0 0 1.5px ${V_RING}`, display: 'flex', flexDirection: 'column', gap: 1, padding: '3px 8px', boxSizing: 'border-box' })}>
        <div style={{ fontSize: 12.5, lineHeight: '16px', fontWeight: 500, color: V_INK, whiteSpace: 'nowrap' }}>1:1 Maya / Theo</div>
        <div style={{ fontSize: 11.5, lineHeight: '15px', color: V_SUB, whiteSpace: 'nowrap' }}>Moved to 15:30</div>
      </div>
      {/* the reason */}
      <div style={abs(56, 160, 298, 66, { borderRadius: 10, background: STEP, boxShadow: `inset 0 0 0 1px ${STEP2}` })}>
        <div style={abs(10, 9, 270, 16, { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, lineHeight: '16px', fontWeight: 500, color: INK })}><RiSparkling2Fill size={11} color={V} />Why Tempra moved it</div>
        <div style={abs(10, 29, 280, 34, { fontSize: 12, lineHeight: '17px', color: SUB })}>Hiring sync has an external guest. 15:30 is free for Maya and Theo.</div>
      </div>
    </div>
  )
}

// ================= 5. calendars and availability, a perspective-tilted list (Inkflow) =================
function AvailabilityFragment() {
  const rows: [typeof RiHome4Line, string, string][] = [
    [RiBriefcase4Line, 'Work calendar', 'Synced'], [RiHome4Line, 'Personal calendar', 'Busy only'], [RiTeamLine, 'Team rota', 'Synced'],
    [RiTimeLine, 'Working hours', '09:00 – 17:30'],
  ] // ends on a whole row: a fifth row was cut diagonally by the cell bottom ("London" 14% visible, DE-01)
  return (
    <div data-product style={abs(34, 118, 318, 300, { transform: 'perspective(900px) rotateX(22deg) rotateZ(9deg)', transformOrigin: '0 0' })}>
      <div style={abs(0, 0, 318, 300, { borderRadius: 14, background: PANEL, boxShadow: ring() })} />
      {rows.map(([I, l, v], i) => (
        <div key={l} style={abs(8, 8 + i * 44, 302, 40, {
          borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px 0 8px', boxSizing: 'border-box',
          background: i === 1 ? STEP : 'transparent', boxShadow: i === 1 ? `inset 0 0 0 1px ${STEP2}` : 'none',
        })}>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: i === 1 ? STEP2 : STEP, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><I size={14} color={i === 1 ? INK : SUB} /></span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: i === 1 ? 500 : 400, color: i === 1 ? INK : SUB, whiteSpace: 'nowrap' }}>{l}</span>
          <span style={{ fontSize: 12.5, color: MUTE, whiteSpace: 'nowrap' }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

// The section alone, for composing into a landing page (the page's hero owns the h1).
export function CadenceBentoSection() {
  const GX = 120, GY = 268
  return (
    <section data-subject aria-labelledby="cbl-h2" style={{ ...font, position: 'relative', width: 1440, height: 1200, background: PAGE, color: INK, overflow: 'hidden' }}>
      <h2 id="cbl-h2" style={abs(GX, 120, 640, undefined, { margin: 0, fontSize: 40, lineHeight: '46px', fontWeight: 500, letterSpacing: '-0.03em', color: INK })}>A Calendar That Finds<br />The Hour For Everyone</h2>

      <Cell x={GX} y={GY} w={796} h={440} r={24} label="Sample week view: Thursday 13:00 to 13:45 is the one slot all four guests have free"
        title="The Hour That Suits Everyone" desc="Tempra reads every guest's calendar and time zone, then holds the one slot free for all.">
        <WeekFragment />
      </Cell>
      <Cell x={GX + 808} y={GY} w={392} h={440} r={20} label="Sample request typed in plain words and Tempra's answer with three ranked times"
        title="Ask In Plain Words" desc="Type who and how long. Tempra answers with a time, not a list of maybes.">
        <AskFragment />
      </Cell>
      <Cell x={GX} y={GY + 452} w={392} h={360} r={20} fade={0} label="Sample focus chart: meetings and protected focus hours for each day of the week"
        title="Focus Time, Protected" desc="Mornings stay blocked. Tempra books around them and shows the hours you kept.">
        <FocusFragment />
      </Cell>
      <Cell x={GX + 404} y={GY + 452} w={392} h={360} r={20} fade={0} label="Sample conflict: a 1:1 clashing with a fixed hiring sync is moved to 15:30, with the reason"
        title="Conflicts Settle Themselves" desc="When two meetings collide, Tempra moves the flexible one and says why.">
        <ConflictFragment />
      </Cell>
      <Cell x={GX + 808} y={GY + 452} w={392} h={360} r={20} fade={72} label="Sample availability settings: work, personal and team calendars merged with working hours and time zone"
        title="Every Calendar, One Answer" desc="Work, personal and team calendars merge, so guests only see free or busy.">
        <AvailabilityFragment />
      </Cell>
    </section>
  )
}

// Standalone route (#/cbentol): a page needs one main landmark and one h1; the h1 is visually hidden so the section renders as designed.
const srOnly: CSSProperties = { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0, color: INK, fontSize: 16, lineHeight: 1.2 }
export default function CadenceBentoL() {
  return (
    <main style={{ background: PAGE, width: 1440 }}>
      <h1 style={srOnly}>Tempra, an AI team calendar (concept, sample data)</h1>
      <CadenceBentoSection />
    </main>
  )
}
