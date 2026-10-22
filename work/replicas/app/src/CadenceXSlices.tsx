// X post, remade from scratch (cadence-xpost r2: "remake completely new"): Cadence week calendar in Marcel Kargul's measured
// calendar grammar (replica KargulR3, his 716-like post kxl-014) and in his post FORMAT: one 1440x1024 CSS calendar sliced into
// three 480x1024 strips (960x2048 @2x), posted as a 3-image carousel. Events: pastel tint + deep same-hue ink, r8, title 14/480,
// time 13 at -0.03em, 4px below the hour line and 2px short; hairline grid #e8e8e8; now-line hairline across the week with a 2px
// bar through today and a 9px dot; one popover. Cadence owns: the suggested slot (violet, dashed), focus blocks (green, lock),
// a moved meeting with its reason. Sample data.
import type { CSSProperties, ReactNode } from 'react'
import { Calendar, CalendarCheck, Clock3, ListChecks, Sparkles, Settings, MoreHorizontal, X, Lock, Users, ShieldCheck, Check } from 'lucide-react'

const INK = '#171717', SUB = '#666666', LINE = '#e8e8e8', NOW = '#e0735a', NOW_INK = '#c4513a' // today label/badge ink darkened from Marcel's #e0735a to clear AA
const F: CSSProperties = { fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', WebkitFontSmoothing: 'antialiased' }
const EV = {
  blue: { bg: '#c5e3ff', fg: '#1d3b57', sub: 'rgba(29,59,87,.82)' },
  purple: { bg: '#dcc8fd', fg: '#3d2862', sub: 'rgba(61,40,98,.82)' },
  pink: { bg: '#ffcadd', fg: '#62243f', sub: 'rgba(98,36,63,.82)' },
  green: { bg: '#bfeed9', fg: '#174a37', sub: 'rgba(23,74,55,.86)' },
  peach: { bg: '#ffdfcc', fg: '#6a3418', sub: 'rgba(106,52,24,.86)' },
  yellow: { bg: '#ffe7a2', fg: '#5f4c16', sub: 'rgba(95,76,22,.82)' },
}
type Tone = keyof typeof EV
const SB = 215, GUT = 286, PITCH = (1440 - GUT) / 7, Y7 = 222, HP = 64, TODAY = 3
const hy = (h: number) => Y7 + (h - 7) * HP
const cx = (d: number) => GUT + d * PITCH
const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`

function Ev({ d, h0, h1, tone, title, extra, icon, moved }: { d: number; h0: number; h1: number; tone: Tone; title: string; extra?: string; icon?: ReactNode; moved?: string }) {
  const c = EV[tone], short = h1 - h0 < 1
  return (
    <div style={{ position: 'absolute', left: cx(d) + 4, top: hy(h0) + 4, width: PITCH - 8, height: (h1 - h0) * HP - 6, background: c.bg, borderRadius: 8, overflow: 'hidden', padding: short ? '0 8.5px' : '7px 8.5px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: short ? 'center' : 'flex-start' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, lineHeight: '18px', fontWeight: 480, color: c.fg, whiteSpace: 'nowrap', overflow: 'hidden' }}>{icon}<span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span></span>
      {!short && <span style={{ marginTop: 1, fontSize: 13, lineHeight: '18px', letterSpacing: '-0.03em', color: c.sub, whiteSpace: 'nowrap' }}>{fmt(h0)} – {fmt(h1)}</span>}
      {extra && <span style={{ fontSize: 13, lineHeight: '18px', letterSpacing: '-0.03em', color: c.sub, whiteSpace: 'nowrap' }}>{extra}</span>}
      {moved && <span style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, lineHeight: '16px', color: c.fg }}><Sparkles size={11} strokeWidth={2} />{moved}</span>}
    </div>
  )
}

const lock = <Lock size={12} strokeWidth={2.2} style={{ flex: 'none' }} />
const EVENTS: Parameters<typeof Ev>[0][] = [
  { d: 0, h0: 9, h1: 9.5, tone: 'blue', title: 'Weekly Planning' }, { d: 0, h0: 10, h1: 12, tone: 'green', title: 'Focus Time', icon: lock }, { d: 0, h0: 13, h1: 14, tone: 'purple', title: 'Product Sync' }, { d: 0, h0: 15.5, h1: 16.5, tone: 'blue', title: 'Design Review' },
  { d: 1, h0: 9, h1: 10, tone: 'purple', title: 'Client Call' }, { d: 1, h0: 11, h1: 12, tone: 'blue', title: 'Sprint Planning' }, { d: 1, h0: 13.5, h1: 15, tone: 'peach', title: 'Hiring Sync', moved: 'Moved from Thu' }, { d: 1, h0: 10.5, h1: 11, tone: 'pink', title: 'Quick Catch-up' },
  { d: 2, h0: 8.5, h1: 9, tone: 'blue', title: 'Standup' }, { d: 2, h0: 9.5, h1: 11.5, tone: 'green', title: 'Focus Time', icon: lock }, { d: 2, h0: 12, h1: 13, tone: 'pink', title: 'Lunch with Ana' }, { d: 2, h0: 13.5, h1: 14.5, tone: 'purple', title: 'Roadmap Review' },
  { d: 3, h0: 9, h1: 10, tone: 'blue', title: 'Project Review' }, { d: 3, h0: 11, h1: 12, tone: 'purple', title: 'Team Standup' }, { d: 3, h0: 16, h1: 18, tone: 'green', title: 'Focus Time', icon: lock },
  { d: 4, h0: 9.5, h1: 10.5, tone: 'blue', title: 'Research Review' }, { d: 4, h0: 11, h1: 11.5, tone: 'pink', title: 'Quick Sync' }, { d: 4, h0: 13, h1: 15, tone: 'green', title: 'Deep Work', icon: lock }, { d: 4, h0: 16, h1: 17, tone: 'pink', title: 'Weekly Wrap-up' },
  { d: 5, h0: 10, h1: 11, tone: 'yellow', title: 'Plan Next Week' }, { d: 6, h0: 11, h1: 12.5, tone: 'peach', title: 'Brunch' },
]

function Popover() {
  const row = (icon: ReactNode, children: ReactNode) => <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, lineHeight: '20px', color: INK }}><span style={{ display: 'grid', placeItems: 'center', width: 18, height: 20, color: '#8a8a8a', flex: 'none' }}>{icon}</span>{children}</div>
  return (
    <div style={{ position: 'absolute', left: 494, top: hy(14.5) + 54, width: 280, borderRadius: 14, background: '#fff', boxShadow: '0 0 0 1px #e4e4e2, 0 4.5px 13px rgba(0,0,0,.055), 0 24px 40px -20px rgba(0,0,0,.12)', padding: '16px 16px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: SUB }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, background: '#8b6cff' }} />Suggested by Cadence
        <span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 22, height: 22, color: '#8a8a8a' }}><X size={16} strokeWidth={1.75} /></span>
      </div>
      <div style={{ margin: '14px 0 14px', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>Design Review</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {row(<Clock3 size={16} strokeWidth={1.75} />, 'Thu, Oct 23 · 14:30 – 15:15')}
        {row(<Users size={16} strokeWidth={1.75} />, <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex' }}>{([['M', 270], ['T', 160], ['A', 40]] as const).map(([l, h], i) => <span key={l} style={{ display: 'grid', placeItems: 'center', width: 20, height: 20, marginLeft: i ? -5 : 0, borderRadius: 99, background: `oklch(0.9 0.05 ${h})`, color: `oklch(0.38 0.09 ${h})`, fontSize: 10, fontWeight: 600, boxShadow: '0 0 0 1.5px #fff' }}>{l}</span>)}</span>
          All three free</span>)}
        {row(<ShieldCheck size={16} strokeWidth={1.75} />, 'Focus time stays intact')}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <span style={{ flex: 1, height: 36, borderRadius: 10, background: INK, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 500 }}>Send invite</span>
        <span style={{ height: 36, padding: '0 14px', borderRadius: 10, boxShadow: 'inset 0 0 0 1px #dcdcda', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 500 }}>Other times</span>
      </div>
    </div>
  )
}

export default function CadenceXSlices() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const now = 10.5
  const cals: [string, string][] = [['Work', '#7fb6ef'], ['Meetings', '#b294f3'], ['Focus time', '#6fcfa3'], ['Personal', '#f2a98a'], ['Social', '#f19ab9'], ['Reminders', '#e8c45a']]
  return (
    <div data-subject data-product style={{ ...F, position: 'relative', width: 1440, height: 1024, overflow: 'hidden', background: '#fff', color: INK }}>
      <style>{'.cxs, .cxs * { corner-shape: round; }'}</style>
      <div className="cxs" style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: SB, height: 1024, background: '#f7f7f6', boxShadow: `inset -1px 0 0 ${LINE}` }} />
        <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ display: 'flex', gap: 8 }}>{['#ee5d55', '#f4bd4f', '#5fc454'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: 99, background: c }} />)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 500 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: INK, display: 'grid', placeItems: 'center' }}><span style={{ width: 6, height: 6, borderRadius: 2, background: '#b4a2ff' }} /></span>Cadence</span>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 51, height: 1, background: LINE }} />
        <div style={{ position: 'absolute', left: 16, top: 68, width: SB - 32, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {([[<Calendar size={16} strokeWidth={1.75} />, 'Calendar', null, true], [<CalendarCheck size={16} strokeWidth={1.75} />, 'Today', null, false], [<Sparkles size={16} strokeWidth={1.75} />, 'Find a time', '2', false], [<ListChecks size={16} strokeWidth={1.75} />, 'Tasks', '3', false]] as const).map(([ic, l, n, on]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32, padding: '0 10px', borderRadius: 8, background: on ? '#ececea' : undefined, fontSize: 14.5 }}>
              <span style={{ display: 'grid', placeItems: 'center', color: on ? INK : '#5d5d5d' }}>{ic}</span>{l}{n && <span style={{ marginLeft: 'auto', fontSize: 13.5, color: SUB }}>{n}</span>}
            </div>
          ))}
          <div style={{ height: 22 }} />
          <div style={{ padding: '0 10px', fontSize: 13.5, color: SUB, height: 24 }}>My calendars</div>
          {cals.map(([n, c]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32, padding: '0 10px', fontSize: 14.5 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 16, height: 16, borderRadius: 4.5, background: c, color: '#fff' }}><Check size={11} strokeWidth={3} /></span>{n}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 16, width: SB - 32, bottom: 72, height: 1, background: LINE }} />
        <div style={{ position: 'absolute', left: 26, bottom: 84, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5 }}><Settings size={16} strokeWidth={1.75} color="#5d5d5d" />Settings</div>
        <div style={{ position: 'absolute', left: 20, bottom: 18, width: SB - 40, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 99, background: 'oklch(0.9 0.05 270)', color: 'oklch(0.38 0.09 270)', fontSize: 13, fontWeight: 600 }}>M</span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '17px' }}><span style={{ fontSize: 14, fontWeight: 500 }}>Maya Chen</span><span style={{ fontSize: 13, color: SUB }}>Design team</span></span>
          <MoreHorizontal size={16} color="#8a8a8a" style={{ marginLeft: 'auto' }} />
        </div>

        <div style={{ position: 'absolute', left: SB, right: 0, top: 0, height: 52, background: '#f8f8f7', boxShadow: `inset 0 -1px 0 ${LINE}` }} />
        <div style={{ position: 'absolute', left: SB + 16, top: 66, lineHeight: '20px' }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>October 2026</div>
          <div style={{ fontSize: 14, color: SUB }}>Week 43 · Oct 20 – 26</div>
        </div>
        <div style={{ position: 'absolute', right: 20, top: 70, display: 'flex', gap: 8, fontSize: 14, fontWeight: 500 }}>
          <span style={{ height: 32, padding: '0 14px', borderRadius: 8, boxShadow: 'inset 0 0 0 1px #dcdcda', display: 'grid', placeItems: 'center' }}>Today</span>
          <span style={{ display: 'flex', padding: 3, borderRadius: 8, background: '#efefee' }}>{['Day', 'Week', 'Month'].map((v) => <span key={v} style={{ height: 26, padding: '0 12px', borderRadius: 6, display: 'grid', placeItems: 'center', background: v === 'Week' ? '#fff' : undefined, boxShadow: v === 'Week' ? '0 0 0 1px #e4e4e2, 0 1px 2px rgba(0,0,0,.05)' : undefined, color: v === 'Week' ? INK : SUB }}>{v}</span>)}</span>
        </div>
        <div style={{ position: 'absolute', left: SB, right: 0, top: 124, height: 1, background: LINE }} />
        <div style={{ position: 'absolute', left: SB, width: GUT - SB, top: 125, height: 50, display: 'grid', placeItems: 'center', fontSize: 13.5, color: SUB }}>GMT+1</div>
        {days.map((d, i) => (
          <div key={d} style={{ position: 'absolute', left: cx(i) + 12, top: 125, height: 50, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5 }}>
            <span style={{ color: i === TODAY ? NOW_INK : SUB }}>{d}</span>
            <span style={{ display: 'grid', placeItems: 'center', minWidth: 26, height: 26, padding: '0 4px', boxSizing: 'border-box', borderRadius: 99, fontWeight: 500, background: i === TODAY ? NOW_INK : undefined, color: i === TODAY ? '#fff' : INK }}>{20 + i}</span>
          </div>
        ))}
        <div style={{ position: 'absolute', left: SB, right: 0, top: 175, height: 1, background: LINE }} />
        <div style={{ position: 'absolute', left: cx(5), top: 176, width: PITCH * 2, height: 900, background: '#fafaf8' }} />
        {Array.from({ length: 13 }, (_, i) => <div key={i} style={{ position: 'absolute', left: GUT, right: 0, top: hy(7 + i), height: 1, background: LINE }} />)}
        {Array.from({ length: 13 }, (_, i) => <div key={i} style={{ position: 'absolute', left: SB, width: GUT - SB - 14, top: hy(7 + i) - 9, textAlign: 'right', fontSize: 13.5, lineHeight: '18px', color: SUB, fontVariantNumeric: 'tabular-nums' }}>{fmt(7 + i)}</div>)}
        {days.map((_, i) => <div key={i} style={{ position: 'absolute', left: cx(i), top: 125, width: 1, height: 900, background: LINE }} />)}
        {EVENTS.map((e, i) => <Ev key={i} {...e} />)}
        <div style={{ position: 'absolute', left: cx(TODAY) + 4, top: hy(14.5) + 4, width: PITCH - 8, height: 0.75 * HP - 6, borderRadius: 8, background: '#efe9ff', border: '1.5px dashed #8b6cff', boxSizing: 'border-box', padding: '0 8px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 480, color: '#4a2fb0' }}><Sparkles size={13} strokeWidth={2} />Design Review</div>
        <div style={{ position: 'absolute', left: GUT, right: 0, top: hy(now), height: 1, background: NOW, opacity: 0.55 }} />
        <div style={{ position: 'absolute', left: cx(TODAY), width: PITCH, top: hy(now) - 0.5, height: 2, background: NOW }} />
        <div style={{ position: 'absolute', left: cx(TODAY) - 4.5, top: hy(now) - 4, width: 9, height: 9, borderRadius: 99, background: NOW }} />
        <div style={{ position: 'absolute', left: GUT - 62, top: hy(now) - 11, height: 22, padding: '0 7px', borderRadius: 6, background: NOW_INK, color: '#fff', fontSize: 13, fontWeight: 500, display: 'grid', placeItems: 'center', fontVariantNumeric: 'tabular-nums' }}>10:30</div>
        <Popover />
      </div>
    </div>
  )
}
