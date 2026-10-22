// Tempra product r3 (#/cprodb). cproda r2 was rejected: "too information heavy and unpolished and not clear... everything is a
// little mess". The floor is our own accepted product grammar (Kestrel: sidebar + one view + one AI answer; Quorum: one joined
// KPI strip): one white window with one hairline, a quiet sidebar, ONE primary view (the week, with the slot Tempra found), a
// slim 3-number strip, and an Ask Tempra rail that answers and offers one action. Rounded per the founder: window 20,
// cards 14, controls and events 10. One ink primary (Book). Solid pre-blended event fills so no gridline shows through. Sample data.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiCalendarLine, RiInboxLine, RiLinksLine, RiFocus3Line, RiSearch2Line, RiExpandUpDownLine, RiLockLine, RiSparkling2Fill,
  RiArrowUpLine, RiMore2Line, RiSunLine, RiCheckboxCircleLine, RiArrowDownSLine, RiAddLine, RiMicLine, RiCalendarCheckLine,
  RiArrowLeftSLine, RiArrowRightSLine, RiVideoOnLine, RiArrowGoForwardLine, RiShieldCheckLine,
} from '@remixicon/react'
import { Mark } from './TempraLogo'

export const APP_W = 1280, APP_H = 820
const T = {
  ink: '#0E121B', sub: '#525866', mute: '#6B7180', faint: '#A3A9B6', line: '#ECEDF1', hair: '#F1F2F5', side: '#FAFAFB', weak: '#F4F5F7',
  v: '#7D52F4', vInk: '#4B2A9E', vFill: '#F1EDFE', vRing: '#E2D9FD', pFill: '#FDEDF4', pRing: '#F7D5E4', pInk: '#8A1D4C',
  green: '#178C4E', greenFill: '#E6F8EE', red: '#E5484D',
}
const font: CSSProperties = { fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.ink }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const abs = (x: number, y: number, w?: number, h?: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h, ...s })
const RING = `inset 0 0 0 1px ${T.line}`
const OPTICAL: CSSProperties = { paddingBottom: 1 }
const ink: CSSProperties = { ...OPTICAL, background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(14,18,27,0.2)' }
const stroke: CSSProperties = { ...OPTICAL, background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: T.ink, boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` }
const TINT: Record<string, [string, string]> = { L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'], S: ['#FFECC0', '#624C18'] }
const Av = ({ i, s = 18 }: { i: string; s?: number }) => <span className="round" style={{ width: s, height: s, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center', fontSize: Math.max(10, s * 0.46), fontWeight: 500, flex: 'none' }}>{i}</span>
const Stack = ({ ids, s = 18 }: { ids: string[]; s?: number }) => <span style={{ ...row }}>{ids.map((i, k) => <span key={i} style={{ marginLeft: k ? -Math.round(s * 0.17) : 0, display: 'flex' }}><Av i={i} s={s} /></span>)}</span>

// ================= sidebar =================
const TEAM_IDS: Record<string, string[]> = { Design: ['A', 'M'], Product: ['J', 'S'], Engineering: ['T', 'L'] }
function Item({ icon, label, active, count }: { icon: ReactNode; label: string; active?: boolean; count?: string }) {
  return (
    <div style={{ ...row, gap: 9, height: 32, padding: '0 10px', borderRadius: 12, background: active ? '#fff' : 'transparent', boxShadow: active ? `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)` : 'none', fontSize: 13.5, fontWeight: active ? 500 : 450, color: active ? T.ink : T.sub }}>
      <span style={{ display: 'flex', color: active ? T.v : T.mute }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {count && <span className="round" style={{ height: 18, minWidth: 18, padding: '0 5px', boxSizing: 'border-box', borderRadius: 999, background: T.vFill, color: T.vInk, fontSize: 11.5, fontWeight: 600, display: 'grid', placeItems: 'center', ...tnum }}>{count}</span>}
    </div>
  )
}
const Group = ({ children }: { children: ReactNode }) => <div style={{ height: 28, padding: '0 10px', display: 'flex', alignItems: 'flex-end', paddingBottom: 6, boxSizing: 'border-box', fontSize: 12, fontWeight: 500, color: T.mute }}>{children}</div>
function Sidebar() {
  return (
    <aside style={{ width: 232, flex: 'none', background: T.side, boxShadow: `inset -1px 0 0 ${T.line}`, padding: '14px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, gap: 10, height: 40, padding: '0 6px' }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, ...ink }}><Mark size={14} /></span>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, lineHeight: '18px', letterSpacing: '-0.01em' }}>Fernhill</span>
          <span style={{ fontSize: 12, lineHeight: '16px', color: T.mute }}>Team plan</span>
        </span>
        <RiExpandUpDownLine size={16} color={T.faint} />
      </div>
      <div style={{ ...row, gap: 8, height: 32, marginTop: 12, padding: '0 6px 0 10px', borderRadius: 12, background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 13, color: T.mute }}>
        <RiSearch2Line size={15} /><span style={{ flex: 1 }}>Search</span>
        <span style={{ height: 20, padding: '0 5px', borderRadius: 8, background: T.weak, display: 'grid', placeItems: 'center', fontSize: 11.5, color: T.mute }}>⌘K</span>
      </div>
      <div style={{ marginTop: 14 }}><Group>Schedule</Group></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Item icon={<RiSunLine size={16} />} label="Today" />
        <Item icon={<RiCalendarLine size={16} />} label="Week" active />
        <Item icon={<RiInboxLine size={16} />} label="Requests" count="2" />
        <Item icon={<RiLinksLine size={16} />} label="Booking links" />
        <Item icon={<RiFocus3Line size={16} />} label="Focus time" />
      </div>
      <div style={{ marginTop: 14 }}><Group>Teams</Group></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {([['Design', T.v, '6'], ['Product', '#F2994A', '4'], ['Engineering', '#22B8A6', '9']] as const).map(([n, c, k]) => (
          <div key={n} style={{ ...row, gap: 10, height: 32, padding: '0 10px 0 14px', fontSize: 13.5, color: T.sub }}>
            <span className="round" style={{ width: 7, height: 7, borderRadius: 999, background: c }} /><span style={{ flex: 1 }}>{n}</span><Stack ids={TEAM_IDS[n]} s={16} /><span style={{ fontSize: 11.5, color: T.mute, marginLeft: 2, ...tnum }}>{k}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 12, borderRadius: 18, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 3 }}>
        <div style={{ ...row, height: 26, padding: '0 9px', gap: 6, fontSize: 11.5, fontWeight: 500, color: T.mute }}><span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: T.red }} />Next up · in 8 min</div>
        <div style={{ borderRadius: 15, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)`, padding: '10px 10px 10px 12px' }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Design crit · v2.4</div>
          <div style={{ fontSize: 12, color: T.mute, marginTop: 2, ...tnum }}>10:15 – 11:15 · Meet</div>
          <div style={{ ...row, marginTop: 10 }}>
            <Stack ids={['A', 'M', 'T']} s={20} />
            <span style={{ marginLeft: 'auto', ...row, gap: 5, height: 28, padding: '1px 10px 0 8px', borderRadius: 11, fontSize: 12.5, fontWeight: 500, ...stroke }}><RiVideoOnLine size={14} />Join</span>
          </div>
        </div>
      </div>
      <div style={{ ...row, gap: 10, height: 44, padding: '0 6px', borderTop: `1px solid ${T.line}`, paddingTop: 10 }}>
        <Av i="L" s={28} />
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 500, lineHeight: '17px' }}>Leo Park</span>
          <span style={{ ...row, gap: 5, fontSize: 12, lineHeight: '16px', color: T.mute }}><span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: '#1FC16B' }} />Free until 10:15</span>
        </span>
        <RiMore2Line size={16} color={T.faint} />
      </div>
    </aside>
  )
}

// ================= the week =================
type Kind = 'v' | 'p' | 'focus'
const EVENTS: [number, number, number, string, Kind][] = [
  [0, 9.5, 10, 'Standup', 'v'], [0, 11, 12.5, 'Focus', 'focus'], [0, 14, 15, 'Design review', 'p'], [0, 16, 17, 'Interview', 'v'],
  [1, 9.5, 10, 'Standup', 'v'], [1, 10.25, 12, 'Focus', 'focus'], [1, 13, 14, 'Customer call', 'p'], [1, 15.5, 16.5, '1:1 Maya', 'v'],
  [2, 9.5, 10, 'Standup', 'v'], [2, 11, 12, 'User research', 'v'], [2, 14, 16, 'Focus', 'focus'],
  [3, 9.5, 10, 'Standup', 'v'], [3, 10.25, 11.25, 'Design crit', 'v'], [3, 13, 14, 'Hiring panel', 'p'], [3, 15, 17, 'Focus', 'focus'],
  [4, 9.5, 10, 'Standup', 'v'], [4, 13, 14, 'Retro', 'p'], [4, 15, 16, 'Plan next week', 'v'],
]
const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`
function Week({ w, h }: { w: number; h: number }) {
  const G = 48, HEAD = 40, H0 = 9, HR = (h - HEAD) / 9, cw = (w - G) / 5
  const y = (t: number) => HEAD + (t - H0) * HR
  const days = ['Mon 19', 'Tue 20', 'Wed 21', 'Thu 22', 'Fri 23']
  return (
    <section aria-label="Sample week" style={{ position: 'relative', width: w, height: h, borderRadius: 16, background: '#fff', boxShadow: RING, overflow: 'hidden' }}>
      {days.map((d, i) => {
        const [dn, num] = d.split(' ')
        return (
          <div key={d} style={abs(G + i * cw, 0, cw, HEAD, { ...row, gap: 6, padding: '0 12px', boxSizing: 'border-box', fontSize: 12.5, color: T.mute })}>
            {dn}
            {i === 3
              ? <span className="round" style={{ width: 22, height: 22, borderRadius: 999, background: T.ink, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 500, ...tnum }}>{num}</span>
              : <span style={{ color: T.ink, fontWeight: 500, ...tnum }}>{num}</span>}
          </div>
        )
      })}
      <div style={abs(0, HEAD - 1, w, 1, { background: T.line })} />
      {Array.from({ length: 9 }, (_, k) => H0 + k).map((t) => (
        <div key={t}>
          {t > H0 && <div style={abs(G, y(t), w - G, 1, { background: T.hair })} />}
          <div style={abs(0, y(t) - 8, G - 10, 16, { textAlign: 'right', fontSize: 11.5, lineHeight: '16px', color: T.mute, ...tnum })}>{t > H0 ? fmt(t) : ''}</div>
        </div>
      ))}
      {[1, 2, 3, 4].map((i) => <div key={i} style={abs(G + i * cw, HEAD, 1, h - HEAD, { background: T.hair })} />)}
      {EVENTS.map(([d, a, b, title, k]) => {
        const top = y(a) + 2, height = (b - a) * HR - 4, short = height < 40
        const look: CSSProperties = k === 'v' ? { background: T.vFill, boxShadow: `inset 0 0 0 1px ${T.vRing}`, color: T.vInk }
          : k === 'p' ? { background: T.pFill, boxShadow: `inset 0 0 0 1px ${T.pRing}`, color: T.pInk }
          : { background: `repeating-linear-gradient(135deg, #F6F7F9 0 6px, #EFF1F4 6px 7px)`, boxShadow: `inset 0 0 0 1px #E7E9EE`, color: T.sub }
        return (
          <div key={`${d}${a}`} style={abs(G + d * cw + 4, top, cw - 8, height, { borderRadius: 12, boxSizing: 'border-box', padding: short ? '0 9px' : '7px 9px', display: 'flex', flexDirection: short ? 'row' : 'column', alignItems: short ? 'center' : 'stretch', gap: short ? 6 : 1, overflow: 'hidden', ...look })}>
            <span style={{ ...row, gap: 4, fontSize: 12.5, fontWeight: 500, lineHeight: '16px', whiteSpace: 'nowrap' }}>{k === 'focus' && <RiLockLine size={12} />}{title}</span>
            <span style={{ fontSize: 11.5, lineHeight: '15px', opacity: 0.85, whiteSpace: 'nowrap', ...tnum }}>{fmt(a)}{short ? '' : ` – ${fmt(b)}`}</span>
          </div>
        )
      })}
      {/* the slot Tempra found: Fri 11:00-11:45, free for all five */}
      <div style={abs(G + 4 * cw + 4, y(11) + 2, cw - 8, 0.75 * HR - 4, { borderRadius: 12, boxSizing: 'border-box', padding: '6px 9px', background: '#fff', border: `1.5px dashed ${T.v}`, boxShadow: '0 4px 12px -4px rgba(125,82,244,0.28)', color: T.vInk, display: 'flex', flexDirection: 'column', gap: 1 })}>
        <span style={{ ...row, gap: 4, fontSize: 12.5, fontWeight: 600, lineHeight: '16px', whiteSpace: 'nowrap' }}><RiSparkling2Fill size={12} />Design sync</span>
        <span style={{ fontSize: 11.5, lineHeight: '15px', whiteSpace: 'nowrap', ...tnum }}>11:00 · all 5 free</span>
      </div>
      {/* now (10:07): Thursday column only, in the free gap before Design crit, so it crosses no event */}
      <div style={abs(G + 3 * cw, y(10.12), cw, 2, { background: T.red, borderRadius: 1 })} />
      <span className="round" style={abs(G + 3 * cw - 4, y(10.12) - 3, 8, 8, { borderRadius: 999, background: T.red })} />
    </section>
  )
}

// ================= Ask Tempra (affectUI AI-answer grammar: thought row + sources, cited answer, date-tile options, tray composer) =================
const Cite = ({ children }: { children: ReactNode }) => <span style={{ display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 6px', margin: '0 2px', borderRadius: 8, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 11.5, fontWeight: 500, color: T.sub, verticalAlign: 1 }}>{children}</span>
function Rail({ compact }: { compact?: boolean }) {
  // compact (in the hero): no source chips and two options, so the answer and Book end above the fold's blur
  const opts: [string, string, string, string, string[], boolean][] = [
    ['FRI', '23', '11:00 – 11:45', 'All five free', ['L', 'A', 'M', 'J', 'T'], true],
    ['THU', '22', '15:30 – 16:15', 'Maya runs late', ['L', 'A', 'J', 'T'], false],
    ['TUE', '27', '16:00 – 16:45', "Moves Theo's focus", ['L', 'A', 'M', 'J'], false],
  ]
  const people: [string, string][] = [['A', 'Ana'], ['M', 'Maya'], ['J', 'Jon'], ['T', 'Theo']]
  return (
    <aside aria-label="Ask Tempra, sample answer" style={{ width: 320, flex: 'none', boxShadow: `inset 1px 0 0 ${T.line}`, display: 'flex', flexDirection: 'column', padding: '0 16px 16px', boxSizing: 'border-box' }}>
      <div style={{ ...row, gap: 9, height: 56 }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 24, height: 24, borderRadius: 9, ...ink }}><Mark size={12} /></span>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>Ask Tempra</span>
        <span style={{ marginLeft: 'auto', ...row, gap: 2, height: 24, padding: '0 6px 0 8px', borderRadius: 10, fontSize: 12, fontWeight: 500, color: T.sub, boxShadow: `inset 0 0 0 1px ${T.line}` }}>This week<RiArrowDownSLine size={14} /></span>
      </div>
      <div style={{ alignSelf: 'flex-end', maxWidth: 236, padding: '9px 12px', borderRadius: 16, borderBottomRightRadius: 8, background: T.weak, fontSize: 13.5, lineHeight: '20px' }}>Find 45 min with the design team next week, not Monday.</div>
      {/* the thought, settled: what Tempra read, as source chips */}
      <div style={{ marginTop: 14, ...row, gap: 6, fontSize: 12.5, color: T.mute }}><RiCheckboxCircleLine size={14} color={T.green} />Checked 5 calendars in 4s<RiArrowDownSLine size={14} /></div>
      {!compact && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8, paddingLeft: 20 }}>
        {people.map(([i, n]) => (
          <span key={i} style={{ ...row, gap: 5, height: 24, padding: '0 8px 0 3px', borderRadius: 10, background: '#fff', boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 1px rgba(14,18,27,0.03)`, fontSize: 12, color: T.sub }}><Av i={i} s={18} />{n}</span>
        ))}
      </div>}
      <p style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: '22px', color: T.sub }}><b style={{ color: T.ink, fontWeight: 600 }}>Friday 11:00</b> works for all five<Cite>5 calendars</Cite>. No focus block moves<Cite>Focus · 4</Cite> and Sam is back by then<Cite>Sam · OOO</Cite>.</p>
      <div style={{ marginTop: 12, borderRadius: 16, background: '#fff', boxShadow: `${RING}, 0 1px 2px rgba(14,18,27,0.04)` }}>
        {(compact ? opts.slice(0, 2) : opts).map(([dw, dn, when, why, ids, best], k) => (
          <div key={dn} style={{ ...row, gap: 10, height: 58, padding: '0 12px', borderTop: k ? `1px solid ${T.hair}` : 'none' }}>
            <span style={{ width: 36, height: 38, borderRadius: 11, flex: 'none', boxShadow: `inset 0 0 0 1px ${best ? T.vRing : T.line}`, background: best ? T.vFill : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', color: best ? T.vInk : T.mute, lineHeight: '12px' }}>{dw}</span>
              <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '17px', color: best ? T.vInk : T.ink, ...tnum }}>{dn}</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', ...tnum }}>{when}</span>
              <span style={{ ...row, gap: 6, fontSize: 12, color: best ? T.green : T.mute, whiteSpace: 'nowrap' }}>{why}{best && <span style={{ height: 18, padding: '0 6px', borderRadius: 8, background: T.greenFill, color: T.green, fontSize: 11.5, fontWeight: 500, display: 'grid', placeItems: 'center' }}>Best</span>}</span>
            </span>
            <Stack ids={ids} s={18} />
          </div>
        ))}
      </div>
      <div style={{ ...row, gap: 8, marginTop: 12 }}>
        <span style={{ ...row, gap: 6, height: 34, padding: '0 14px 0 12px', borderRadius: 13, fontSize: 13.5, fontWeight: 500, ...ink }}><RiCalendarCheckLine size={15} />Book Fri 11:00</span>
        <span style={{ ...row, height: 34, padding: '0 14px', borderRadius: 13, fontSize: 13.5, fontWeight: 500, ...stroke }}>Other times</span>
      </div>
      <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${T.hair}` }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: T.mute, marginBottom: 2 }}>Handled this week</div>
        {([[<RiArrowGoForwardLine size={14} />, 'Moved Roadmap review to Wed', "Clashed with Ana's focus"], [<RiShieldCheckLine size={14} />, 'Protected 4 focus blocks', 'Mornings, Mon to Thu']] as const).map(([ic, t, d]) => (
          <div key={t} style={{ ...row, gap: 10, height: 46 }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 11, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, color: T.sub, flex: 'none' }}>{ic}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{t}</span>
              <span style={{ fontSize: 12, color: T.mute }}>{d}</span>
            </span>
          </div>
        ))}
      </div>
      {/* composer in a tray: the card holds the input, the tray's strip says what is connected */}
      <div style={{ marginTop: 'auto', borderRadius: 20, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 4 }}>
        <div style={{ borderRadius: 16, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)`, padding: '11px 8px 8px 12px' }}>
          <div style={{ fontSize: 13.5, color: T.mute }}>Ask about your week…</div>
          <div style={{ ...row, gap: 6, marginTop: 12 }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, borderRadius: 10, boxShadow: `inset 0 0 0 1px ${T.line}`, color: T.sub }}><RiAddLine size={15} /></span>
            <span style={{ ...row, gap: 2, height: 26, padding: '0 6px 0 8px', borderRadius: 10, boxShadow: `inset 0 0 0 1px ${T.line}`, fontSize: 12, fontWeight: 500, color: T.sub }}>Design team<RiArrowDownSLine size={14} /></span>
            <span style={{ marginLeft: 'auto', display: 'flex', color: T.mute }}><RiMicLine size={16} /></span>
            <span className="round" style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', ...ink }}><RiArrowUpLine size={15} /></span>
          </div>
        </div>
        <div style={{ ...row, gap: 6, height: 28, padding: '0 10px', fontSize: 11.5, color: T.mute }}><span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: '#1FC16B' }} />5 calendars synced · 2 time zones</div>
      </div>
    </aside>
  )
}


// one small visual per number: meeting bars by day, a focus line, settled-conflict dots
const SPARK: ReactNode[] = [
  <svg key="b" width={52} height={22} viewBox="0 0 52 22" aria-hidden>{[14, 20, 9, 17, 12].map((h, i) => <rect key={i} x={i * 11} y={22 - h} width={7} height={h} rx={2} fill={i === 3 ? T.v : T.vRing} />)}</svg>,
  <svg key="l" width={60} height={22} viewBox="-1 -2 60 26" aria-hidden><path d="M1 17 L12 15 L23 16 L34 10 L45 8 L55 4" fill="none" stroke={T.v} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" /><circle cx={55} cy={4} r={2.4} fill="#fff" stroke={T.v} strokeWidth={1.5} /></svg>,
  <svg key="d" width={52} height={22} viewBox="0 0 52 22" aria-hidden>{Array.from({ length: 7 }, (_, i) => <circle key={i} cx={4 + i * 7.4} cy={11} r={3} fill={T.v} opacity={0.35 + i * 0.1} />)}</svg>,
]

// ================= the window =================
export function TempraApp({ inHero, style }: { inHero?: boolean; style?: CSSProperties }) {
  const H1 = inHero ? 'p' : 'h1'
  const Main = inHero ? 'div' : 'main'
  const kpis: [string, string, string][] = [['Meetings', '18', '−3'], ['Focus kept', '11h 30m', '+2h'], ['Conflicts settled', '7', 'all by Tempra']]
  return (
    <div data-product style={{ ...font, position: 'relative', width: APP_W, height: APP_H, borderRadius: 22, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 0 0 1px rgba(14,18,27,0.08), 0 1px 2px rgba(14,18,27,0.04), 0 24px 60px -24px rgba(14,18,27,0.22)', ...style }}>
      <Sidebar />
      <Main aria-label="Tempra week, sample data" style={{ flex: 1, padding: '0 24px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...row, height: 68 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <H1 style={{ margin: 0, fontSize: 17, lineHeight: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>This week</H1>
            <span style={{ fontSize: 12.5, color: T.mute, ...tnum }}>Oct 19 – 23 · Berlin</span>
          </div>
          <div style={{ marginLeft: 'auto', ...row, gap: 8 }}>
            <span style={{ ...row, height: 32, padding: '0 8px 0 4px', borderRadius: 13, boxShadow: `inset 0 0 0 1px ${T.line}`, gap: 6 }}><Stack ids={['L', 'A', 'M', 'J', 'T']} s={22} /><span style={{ fontSize: 12, fontWeight: 500, color: T.sub }}>Design</span></span>
            <span style={{ ...row, height: 32, borderRadius: 13, ...stroke }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 30, height: 32, color: T.sub }}><RiArrowLeftSLine size={16} /></span>
              <span style={{ width: 1, height: 16, background: T.line }} />
              <span style={{ padding: '0 10px', fontSize: 13, fontWeight: 500 }}>Today</span>
              <span style={{ width: 1, height: 16, background: T.line }} />
              <span style={{ display: 'grid', placeItems: 'center', width: 30, height: 32, color: T.sub }}><RiArrowRightSLine size={16} /></span>
            </span>
          <div style={{ ...row, height: 32, padding: 2, boxSizing: 'border-box', borderRadius: 13, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            {['Day', 'Week'].map((o) => (
              <span key={o} style={{ height: 28, padding: '0 12px', borderRadius: 11, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 500, color: o === 'Week' ? T.ink : T.mute, background: o === 'Week' ? '#fff' : 'transparent', boxShadow: o === 'Week' ? `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.06)` : 'none' }}>{o}</span>
            ))}
          </div>
          </div>
        </div>
        <div style={{ display: 'flex', borderRadius: 16, boxShadow: RING, height: 72, flex: 'none' }}>
          {kpis.map(([l, v, d], k) => (
            <div key={l} style={{ position: 'relative', flex: 1, padding: '12px 16px', boxShadow: k ? `inset 1px 0 0 ${T.line}` : 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12.5, color: T.mute }}>{l}</span>
              <span style={{ ...row, gap: 8 }}>
                <span style={{ fontSize: 20, lineHeight: '26px', fontWeight: 600, letterSpacing: '-0.02em', ...tnum }}>{v}</span>
                <span style={{ height: 20, padding: '0 6px', borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 11.5, fontWeight: 500, background: k === 2 ? T.vFill : T.greenFill, color: k === 2 ? T.vInk : T.green, ...tnum }}>{d}</span>
              </span>
              <span style={{ position: 'absolute', right: 16, bottom: 14, display: 'flex' }}>{SPARK[k]}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}><Week w={APP_W - 232 - 320 - 48} h={APP_H - 68 - 72 - 16 - 24} /></div>
      </Main>
      <Rail compact={inHero} />
    </div>
  )
}

export default function CadenceProductB() {
  return (
    // 56px of canvas on every side (founder: "a tiny bit smaller" than 80); 1392 wide splits into three 464px strips
    <div style={{ width: APP_W + 112, height: APP_H + 112, background: 'radial-gradient(1000px 600px at 50% 0%, #F7F7F9, #ECEDF0)', position: 'relative', overflow: 'hidden' }}>
      <TempraApp style={{ position: 'absolute', left: 56, top: 56 }} />
    </div>
  )
}
