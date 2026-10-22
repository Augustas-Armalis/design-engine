// Cadence week calendar, own design in Tanjim's POST system (measured off his 414-like kanban post by pixel replica,
// work/replicas/TANJIM-KANBAN-NOTES.md; his app code uses a different, denser system): Manrope 400 only (hierarchy by size
// and ink vs grey), 0.5px hairline rings drawn as box-shadow on whole-pixel boxes, 34px r8 controls, sidebar 232 with
// 34px rows on a 38 pitch and 18px icons, h1 40/400 over a 16px breadcrumb, one 16px gutter, the warm well ladder
// (frame #f3f2f0 -> white panel -> #fafaf8 well -> white card), radius nesting 16 > 12 > 8 > 7 > 6 > 5.
// Owned: the suggested slot in the accent (dashed), protected focus blocks (violet + lock), the ranked "Find a time" rail.
// Sample data. Revision loop: work/cadence-app/REVISIONS.md + gate.mjs (incl. centring) + check.mjs.
import '@fontsource-variable/manrope'
import type { CSSProperties, ReactNode } from 'react'
import { Home, CalendarDays, Link2, Focus, BarChart3, Users, Settings, Search, Bell, CircleHelp, ChevronLeft, ChevronRight, Plus, SlidersHorizontal, Lock, Check, PanelLeftClose, Clock3, Sparkles, Video } from 'lucide-react'

const C = {
  canvas: '#f5f5f5', frame: '#f3f2f0', panel: '#ffffff', well: '#fafaf8', sunken: '#e7e6e4', seg: '#efeeec',
  ring: '#d5d4d2', ringCtl: '#cdcdcd', ringNav: '#cccbc9', wellRing: '#f2f2f0', cardRing: '#e7e7e5', hair: '#ececea',
  ink: '#1d1c1a', grey: '#5f5c57', soft: '#6e6b65', accent: '#4b5bd6', red: '#b23c30', // grey/soft darkened a step from the post's (3.2:1 on the frame) to clear AA
}
const CAL = { product: '#5A67D8', design: '#8662C9', hiring: '#C48A1E', personal: '#3D8E5F', people: '#3B82C4' }
const mix = (hex: string, p: number) => `color-mix(in oklab, ${hex} ${p}%, transparent)`
const ink = (hex: string) => `color-mix(in oklab, ${hex} 62%, ${C.ink})`
const F = '"Manrope Variable", ui-sans-serif, system-ui, sans-serif'
const hair = (c: string) => `0 0 0 0.5px ${c}`
const drop = '0 1px 2px rgba(28,25,20,.04)'
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const i18 = { size: 18, strokeWidth: 1.5 }

/* ---------- controls: 34 tall, r8, 0.5 ring ---------- */
function Btn({ children, kind = 'secondary', icon, style }: { children?: ReactNode; kind?: 'primary' | 'secondary' | 'ghost'; icon?: ReactNode; style?: CSSProperties }) {
  const k: CSSProperties = kind === 'primary' ? { background: C.accent, color: '#fff', boxShadow: `${hair('color-mix(in oklab, #4b5bd6 70%, black)')}, ${drop}` }
    : kind === 'secondary' ? { background: C.panel, color: C.ink, boxShadow: `${hair(C.ringCtl)}, ${drop}` } : { color: C.grey }
  return <span style={{ ...row, justifyContent: 'center', gap: 7, height: 34, padding: children ? '0 12px' : 0, width: children ? undefined : 34, borderRadius: 8, fontSize: 14, whiteSpace: 'nowrap', ...k, ...style }}>{icon}{children}</span>
}
const Kbd = ({ children }: { children: ReactNode }) => <span style={{ fontSize: 14, color: '#5f5c57' }}>{children}</span>
const Face = ({ l, hue, s = 22 }: { l: string; hue: number; s?: number }) => <span style={{ display: 'grid', placeItems: 'center', width: s, height: s, borderRadius: 999, background: `oklch(0.93 0.035 ${hue})`, color: `oklch(0.36 0.08 ${hue})`, fontSize: Math.max(10, s * 0.46), lineHeight: 1, boxShadow: `0 0 0 1.5px ${C.panel}` }}>{l}</span>

/* ---------- sidebar (232) ---------- */
function NavRow({ icon, label, active, count }: { icon: ReactNode; label: string; active?: boolean; count?: number }) {
  return (
    <div style={{ ...row, height: 34, gap: 10, padding: '0 10px', borderRadius: 8, fontSize: 14, color: active ? C.ink : '#4a4843', background: active ? C.panel : undefined, boxShadow: active ? hair(C.ringNav) : undefined }}>
      <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18, color: active ? C.ink : C.soft }}>{icon}</span>{label}
      {count != null && <span style={{ marginLeft: 'auto', fontSize: 13, color: C.soft, fontVariantNumeric: 'tabular-nums' }}>{count}</span>}
    </div>
  )
}
const Group = ({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{ ...row, height: 28, padding: '0 10px', fontSize: 14, color: C.ink }}>{title}<span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', color: C.soft }}>{right}</span></div>
    {children}
  </div>
)
function Sidebar() {
  const cals: [string, string, boolean][] = [['Product', CAL.product, true], ['Design', CAL.design, true], ['Hiring', CAL.hiring, true], ['People', CAL.people, true], ['Personal', CAL.personal, false]]
  return (
    <aside style={{ width: 232, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ ...row, gap: 10, height: 48, padding: '0 8px', borderRadius: 8, background: C.panel, boxShadow: hair(C.ringNav) }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 8, background: C.ink }}>
            <svg width="15" height="15" viewBox="0 0 22 22" aria-hidden><g fill="#fff"><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill="#a5adf0" /></svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
            <span style={{ fontSize: 14, color: C.ink }}>Cadence</span>
            <span style={{ fontSize: 12, color: C.grey }}>Design team</span>
          </span>
          <span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 28, height: 28, color: C.soft }}><PanelLeftClose size={18} strokeWidth={1.5} /></span>
        </div>
        <div style={{ ...row, gap: 10, height: 34, padding: '0 10px', borderRadius: 8, background: C.sunken, boxShadow: hair('#d2d1cf'), fontSize: 14, color: C.grey }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18 }}><Search {...i18} /></span>Search<span style={{ marginLeft: 'auto' }}><Kbd>⌘ K</Kbd></span>
        </div>
      </div>
      <Group title="Workspace">
        <NavRow icon={<Home {...i18} />} label="Home" />
        <NavRow icon={<CalendarDays {...i18} />} label="Calendar" active />
        <NavRow icon={<Link2 {...i18} />} label="Scheduling links" count={4} />
        <NavRow icon={<Focus {...i18} />} label="Focus time" />
        <NavRow icon={<BarChart3 {...i18} />} label="Insights" />
        <NavRow icon={<Users {...i18} />} label="Team" count={12} />
      </Group>
      <div style={{ height: 0, boxShadow: `0 0 0 0.5px ${C.ring}`, margin: '0 10px' }} />
      <Group title="Calendars" right={<Plus size={18} strokeWidth={1.5} />}>
        {cals.map(([n, c, on]) => (
          <div key={n} style={{ ...row, height: 34, gap: 10, padding: '0 10px', fontSize: 14, color: on ? '#4a4843' : C.soft }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: on ? c : 'transparent', boxShadow: on ? undefined : `inset 0 0 0 1.5px ${C.ring}` }} /></span>{n}
          </div>
        ))}
      </Group>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <NavRow icon={<Settings {...i18} />} label="Settings" />
        <div style={{ ...row, gap: 10, height: 48, padding: '0 8px', borderRadius: 8, background: C.panel, boxShadow: hair(C.ringNav) }}>
          <Face l="M" hue={250} s={32} /><span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}><span style={{ fontSize: 14, color: C.ink }}>Maya Chen</span><span style={{ fontSize: 12, color: C.grey }}>maya@cadence.so</span></span>
        </div>
      </div>
    </aside>
  )
}

/* ---------- week grid in a sunken well ---------- */
const DAYS = [['Mon', 20], ['Tue', 21], ['Wed', 22], ['Thu', 23], ['Fri', 24]] as const
const H0 = 8, H1 = 18, RH = 75, GUT = 58, TODAY = 2
type Ev = { d: number; s: number; e: number; t: string; cal: keyof typeof CAL | 'focus'; meta?: string }
const EVENTS: Ev[] = [
  { d: 0, s: 9, e: 9.5, t: 'Standup', cal: 'product' }, { d: 0, s: 10, e: 12, t: 'Roadmap draft', cal: 'focus' }, { d: 0, s: 14, e: 15, t: 'Hiring sync', cal: 'hiring', meta: 'Room 4B' }, { d: 0, s: 16, e: 16.75, t: '1:1 with Theo', cal: 'people' },
  { d: 1, s: 9, e: 9.5, t: 'Standup', cal: 'product' }, { d: 1, s: 11, e: 12, t: 'Design critique', cal: 'design', meta: 'Figma' }, { d: 1, s: 13, e: 15.5, t: 'Write specs', cal: 'focus' }, { d: 1, s: 16, e: 17, t: 'Vendor call', cal: 'hiring' },
  { d: 2, s: 9, e: 9.5, t: 'Standup', cal: 'product' }, { d: 2, s: 10, e: 11, t: '1:1 with Maya', cal: 'people' }, { d: 2, s: 12, e: 13, t: 'Lunch with Ana', cal: 'personal' }, { d: 2, s: 16, e: 17.5, t: 'Synthesis', cal: 'focus' },
  { d: 3, s: 9, e: 9.5, t: 'Standup', cal: 'product' }, { d: 3, s: 9.75, e: 12, t: 'Interview notes', cal: 'focus' }, { d: 3, s: 13, e: 14, t: 'Board prep', cal: 'product', meta: 'Meet' }, { d: 3, s: 15, e: 16, t: 'Candidate: Lea', cal: 'hiring' },
  { d: 4, s: 9, e: 9.5, t: 'Standup', cal: 'product' }, { d: 4, s: 11.5, e: 12.5, t: 'Team lunch', cal: 'personal' }, { d: 4, s: 14, e: 16, t: 'Writing block', cal: 'focus' },
]
const fmt = (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`

function Event({ e, x, w }: { e: Ev; x: number; w: number }) {
  const focus = e.cal === 'focus', hue = focus ? CAL.design : CAL[e.cal as keyof typeof CAL]
  const top = (e.s - H0) * RH + 2, h = (e.e - e.s) * RH - 4, short = h < 44
  return (
    <div style={{ position: 'absolute', left: x + 4, top, width: w - 8, height: h, borderRadius: 7, background: mix(hue, focus ? 8 : 11), boxShadow: `inset 0 0 0 1px ${mix(hue, 22)}`, overflow: 'hidden', padding: short ? '0 10px' : '8px 10px', display: 'flex', flexDirection: short ? 'row' : 'column', alignItems: short ? 'center' : 'flex-start', gap: short ? 8 : 3,
      backgroundImage: focus ? `repeating-linear-gradient(135deg, ${mix(hue, 7)} 0 6px, transparent 6px 12px)` : undefined }}>
      <span style={{ ...row, gap: 6, maxWidth: '100%', fontSize: 13, lineHeight: '17px', color: ink(hue), whiteSpace: 'nowrap' }}>{focus && <Lock size={12} strokeWidth={1.8} style={{ flex: 'none' }} />}<span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.t}</span></span>
      <span style={{ maxWidth: '100%', fontSize: 12, lineHeight: '16px', color: C.grey, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{short ? fmt(e.s) : `${fmt(e.s)} – ${fmt(e.e)}${e.meta ? ` · ${e.meta}` : ''}`}</span>
    </div>
  )
}

function WeekGrid({ width }: { width: number }) {
  const DW = (width - GUT) / DAYS.length, gridH = (H1 - H0) * RH, now = 13 + 40 / 60
  return (
    <div style={{ width, borderRadius: 12, background: C.well, boxShadow: `inset 0 0 0 1px ${C.wellRing}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: 59 }}>
        <div style={{ width: GUT, ...row, justifyContent: 'center', fontSize: 12, color: C.soft }}>GMT+1</div>
        {DAYS.map(([d, n], i) => (
          <div key={d} style={{ width: DW, ...row, gap: 8, padding: '0 12px' }}>
            <span style={{ fontSize: 14, color: i === TODAY ? C.accent : C.grey }}>{d}</span>
            <span style={{ display: 'grid', placeItems: 'center', minWidth: 30, height: 30, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, fontSize: 16, fontVariantNumeric: 'tabular-nums', color: i === TODAY ? '#fff' : C.ink, background: i === TODAY ? C.accent : undefined }}>{n}</span>
            {i === TODAY && <span style={{ marginLeft: 'auto', fontSize: 12, color: C.grey }}>Today</span>}
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', height: gridH + 12, margin: '0 6px 6px', borderRadius: 8, background: C.panel, boxShadow: `${hair(C.cardRing)}, ${drop}` }}>
        {Array.from({ length: H1 - H0 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: 6 + i * RH, height: RH, boxShadow: i ? `inset 0 0.5px 0 ${C.hair}` : undefined }}>
            <span style={{ position: 'absolute', left: 0, width: GUT - 16, top: i ? -8 : 2, textAlign: 'right', fontSize: 12, color: C.soft, fontVariantNumeric: 'tabular-nums' }}>{`${H0 + i}:00`}</span>
          </div>
        ))}
        {DAYS.map((_, i) => <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: GUT - 6 + i * DW, width: DW, boxShadow: `inset 0.5px 0 0 ${C.hair}`, background: i === TODAY ? 'color-mix(in oklab, #4b5bd6 2.5%, transparent)' : undefined }} />)}
        <div style={{ position: 'absolute', left: GUT - 6, right: 0, top: 6 }}>
          {EVENTS.map((e, i) => <Event key={i} e={e} x={e.d * DW} w={DW} />)}
          <div style={{ position: 'absolute', left: TODAY * DW + 4, top: (14.5 - H0) * RH + 2, width: DW - 8, height: 0.75 * RH - 4, borderRadius: 7, background: mix(C.accent, 10), border: `1px dashed ${mix(C.accent, 55)}`, boxSizing: 'border-box', padding: '6px 9px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ ...row, gap: 6, fontSize: 13, lineHeight: '17px', color: C.accent, whiteSpace: 'nowrap' }}><Sparkles size={12} strokeWidth={1.8} style={{ flex: 'none' }} />Design review</span>
            <span style={{ fontSize: 12, lineHeight: '16px', color: C.grey, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>14:30 – 15:15</span>
          </div>
          <div style={{ position: 'absolute', left: TODAY * DW - 4, width: DW + 4, top: (now - H0) * RH, height: 0, borderTop: `1.5px solid ${C.red}` }}>
            <span style={{ position: 'absolute', left: 0, top: -4.75, width: 8, height: 8, borderRadius: 99, background: C.red }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- right rail ---------- */
function Rail() {
  const slots: [string, string, string, boolean][] = [['Wed 22', '14:30', 'Everyone free, focus kept', true], ['Thu 23', '16:15', 'After Lea’s interview', false], ['Fri 24', '10:00', 'Before team lunch', false]]
  const card: CSSProperties = { borderRadius: 12, background: C.well, boxShadow: `inset 0 0 0 1px ${C.wellRing}`, padding: 6 }
  const inner: CSSProperties = { borderRadius: 8, background: C.panel, boxShadow: `${hair(C.cardRing)}, ${drop}` }
  return (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={card}>
        <div style={{ ...row, height: 44, padding: '0 10px', fontSize: 16, color: C.ink }}>Find a time<span style={{ marginLeft: 'auto', ...row, gap: 5, height: 22, padding: '0 8px', borderRadius: 999, fontSize: 12, color: C.accent, background: mix(C.accent, 10), boxShadow: hair(mix(C.accent, 30)) }}><Sparkles size={12} strokeWidth={1.8} />3 slots</span></div>
        <div style={{ ...inner, padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, color: C.ink }}>Design review</span>
            <span style={{ fontSize: 12, color: C.grey }}>45 min · this week · 3 guests</span>
          </div>
          <div style={{ ...row, gap: 10 }}>
            <span style={{ ...row, height: 28, padding: '0 4px', borderRadius: 999, background: '#f7f7f6', boxShadow: hair('#ebebe9') }}>{[['M', 250], ['T', 150], ['A', 30]].map(([l, h], i) => <span key={l as string} style={{ marginLeft: i ? -5 : 0 }}><Face l={l as string} hue={h as number} s={20} /></span>)}</span>
            <span style={{ marginLeft: 'auto', display: 'flex', padding: 2, borderRadius: 8, background: C.seg }}>
              {['30', '45', '60'].map((m) => <span key={m} style={{ display: 'grid', placeItems: 'center', height: 26, padding: '0 9px', borderRadius: 6, fontSize: 12, fontVariantNumeric: 'tabular-nums', color: m === '45' ? C.ink : C.grey, background: m === '45' ? C.panel : undefined, boxShadow: m === '45' ? `${hair(C.ringNav)}, ${drop}` : undefined }}>{m}m</span>)}
            </span>
          </div>
          <div style={{ height: 0, boxShadow: `0 0 0 0.5px ${C.hair}` }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {slots.map(([d, t, why, best]) => (
              <div key={d} style={{ ...row, gap: 10, height: 46, padding: '0 8px', borderRadius: 7, background: best ? mix(C.accent, 8) : undefined }}>
                <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18, borderRadius: 99, background: best ? C.accent : undefined, boxShadow: best ? undefined : `inset 0 0 0 1.5px ${C.ring}` }}>{best && <Check size={11} strokeWidth={2.6} color="#fff" />}</span>
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.35 }}>
                  <span style={{ fontSize: 14, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>{d} · {t}</span>
                  <span style={{ fontSize: 12, color: C.grey }}>{why}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="primary" style={{ flex: 1 }}>Send invite</Btn>
            <Btn>Other times</Btn>
          </div>
        </div>
      </div>
      <div style={card}>
        <div style={{ ...row, height: 44, padding: '0 10px', fontSize: 16, color: C.ink }}>Today<span style={{ marginLeft: 'auto', fontSize: 12, color: C.grey }}>Wed, Oct 22</span></div>
        <div style={{ ...inner, padding: '2px 12px' }}>
          {([['9:00', 'Standup', 'done', CAL.product], ['10:00', '1:1 with Maya', 'done', CAL.people], ['12:00', 'Lunch with Ana', 'done', CAL.personal], ['14:30', 'Design review', 'next', C.accent], ['16:00', 'Synthesis', 'later', CAL.design]] as const).map(([t, n, st, c], i, a) => (
            <div key={t} style={{ ...row, gap: 10, height: 42, boxShadow: i < a.length - 1 ? `inset 0 -0.5px 0 ${C.hair}` : undefined }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 18, height: 18, color: st === 'done' ? C.soft : c }}>{st === 'done' ? <Check size={15} strokeWidth={1.8} /> : st === 'next' ? <Clock3 size={15} strokeWidth={1.8} /> : <span style={{ width: 9, height: 9, borderRadius: 3, background: c }} />}</span>
              <span style={{ width: 42, fontSize: 12, color: C.grey, fontVariantNumeric: 'tabular-nums' }}>{t}</span>
              <span style={{ fontSize: 14, color: st === 'done' ? C.soft : C.ink, textDecoration: st === 'done' ? 'line-through' : undefined, textDecorationColor: C.ring }}>{n}</span>
              {st === 'next' && <span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 24, height: 24, color: C.grey }}><Video size={16} strokeWidth={1.5} /></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CadenceApp() {
  const PANEL_W = 1160, GRID_W = PANEL_W - 16 - 16 - 16 - 300
  return (
    <div style={{ position: 'relative', width: 1600, height: 1200, background: C.canvas, fontFamily: F, WebkitFontSmoothing: 'antialiased', color: C.ink, fontWeight: 400 }}>
      <div style={{ position: 'absolute', left: 80, top: 88, width: 1440, height: 1024, boxSizing: 'border-box', display: 'flex', gap: 16, padding: 16, borderRadius: 16, background: C.frame }}>
        <Sidebar />
        <main data-product style={{ width: PANEL_W, borderRadius: 8, background: C.panel, boxShadow: hair(C.ring), padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...row, height: 24, gap: 8, fontSize: 16, color: C.grey }}>
            <span>Calendar</span><ChevronRight size={14} strokeWidth={1.5} color={C.soft} /><span>This week</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <Btn kind="ghost" icon={<Bell {...i18} />} />
              <Btn kind="ghost" icon={<CircleHelp {...i18} />} />
            </span>
          </div>
          <div style={{ ...row, alignItems: 'flex-end', marginTop: 14, marginBottom: 20, gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h1 style={{ margin: 0, fontSize: 40, fontWeight: 400, lineHeight: '48px', letterSpacing: 0 }}>October 20 – 24</h1>
              <span style={{ fontSize: 14, color: C.grey }}>18 meetings · 11h of focus protected · 2 conflicts settled</span>
            </div>
            <div style={{ marginLeft: 'auto', ...row, gap: 16 }}>
              <span style={{ ...row, gap: 8 }}><Btn icon={<ChevronLeft {...i18} />} /><Btn icon={<ChevronRight {...i18} />} /><Btn>Today</Btn></span>
              <span style={{ display: 'flex', padding: 3, borderRadius: 8, background: C.seg }}>
                {['Day', 'Week', 'Month'].map((v) => <span key={v} style={{ display: 'grid', placeItems: 'center', height: 28, padding: '0 12px', borderRadius: 6, fontSize: 14, color: v === 'Week' ? C.ink : C.grey, background: v === 'Week' ? C.panel : undefined, boxShadow: v === 'Week' ? `${hair(C.ringNav)}, ${drop}` : undefined }}>{v}</span>)}
              </span>
              <span style={{ ...row, gap: 8 }}><Btn icon={<SlidersHorizontal size={16} strokeWidth={1.5} />}>Filter</Btn><Btn kind="primary" icon={<Plus size={16} strokeWidth={1.8} />}>New event</Btn></span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
            <WeekGrid width={GRID_W} />
            <Rail />
          </div>
        </main>
      </div>
    </div>
  )
}
