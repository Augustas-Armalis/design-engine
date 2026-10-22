// Cadence product screen r2 (#/cproda), in the AlignUI + affectUI grammar after cprodk r1 was rejected
// ("too similar to marcel... too little rounded... too little small details or shadows... lacks proper dashboard sidebar and components").
// AlignUI: slate role tokens, Inter, label-sm 14/500 + paragraph 14/400 + 12 meta, 36px controls at r10, double-bezel app frame,
// stroke status badges with a dot, avatar tints (200 fill / 950 ink), Remix icons. affectUI: the decision tray (grey r20, white card r16,
// tactile ink buttons). Rounder than Kargul by design: frame 36, panel 28, tray 20, cards 16, controls 10, chips 6. Sample data.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiHome5Fill, RiCalendarLine, RiLinksLine, RiFocus3Line, RiBarChartBoxLine, RiInboxLine, RiSearch2Line, RiNotification3Line,
  RiSparkling2Fill, RiExpandUpDownLine, RiVerifiedBadgeFill, RiArrowRightSLine, RiMore2Line, RiCheckLine, RiVideoOnLine, RiLockLine,
  RiErrorWarningFill, RiShieldCheckLine, RiFileCopyLine, RiArrowDownSLine, RiGlobalLine, RiSunLine, RiCalendarCheckLine,
  RiArrowGoForwardLine, RiSettings3Line, RiQuestionLine, RiTimeLine, RiFlashlightLine,
} from '@remixicon/react'

// ---- role tokens (AlignUI slate, light) ----
const T = {
  canvas: '#E9EAEC', frame: '#F5F7FA', white: '#FFFFFF', weak: '#F5F7FA', soft: '#E1E4EA', line: '#EBEDF1',
  strong: '#0E121B', sub: '#525866', soft6: '#646B79', faint: '#99A0AE',
  v: '#7D52F4', v25: '#F7F5FF', v50: '#EFEBFF', v300: '#B9A6FB', v100: '#DCD5FF', v200: '#CAC0FF', vInk: '#5B2CC9',
  green: '#1FC16B', greenInk: '#147A43', green50: '#E0FAEC',
  red: '#FB3748', redInk: '#C2202E', orange: '#FA7319', orangeInk: '#A84A0E',
}
const XS = '0 1px 2px 0 rgba(10,13,20,0.03)'
const ringXs = (c = T.soft) => `inset 0 0 0 1px ${c}, ${XS}`
const CARD = `inset 0 0 0 1px ${T.line}, 0 1px 2px 0 rgba(10,13,20,0.03), 0 2px 6px -2px rgba(10,13,20,0.03)`
const FLOAT = '0 0 0 1px rgba(14,18,27,0.06), 0 16px 32px -12px rgba(14,18,27,0.14), 0 4px 10px -4px rgba(14,18,27,0.06)'
const font: CSSProperties = { fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.strong }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }

// ---- avatars: AlignUI tints, 200 fill + 950 ink ----
const TINT: Record<string, [string, string]> = {
  L: ['#C0D5FF', '#122368'], A: ['#FFC0DF', '#71133E'], M: ['#C2F5DA', '#0B4627'], S: ['#FFECC0', '#624C18'],
  J: ['#C2F5EE', '#0B463E'], T: ['#CAC0FF', '#351A75'], R: ['#FFD9C0', '#71330A'],
}
function Avatar({ i, s = 24, ring = T.white }: { i: string; s?: number; ring?: string }) {
  const [bg, ink] = TINT[i] ?? TINT.L
  return <span className="round" style={{ display: 'grid', placeItems: 'center', width: s, height: s, borderRadius: 999, background: bg, color: ink, fontSize: Math.max(10.5, s * 0.42), fontWeight: 500, lineHeight: 1, boxShadow: `0 0 0 2px ${ring}`, flex: 'none' }}>{i}</span>
}
function Stack({ ids, s = 22, more }: { ids: string[]; s?: number; more?: number }) {
  return (
    <span style={{ ...row }}>
      {ids.map((i, k) => <span key={i} style={{ marginLeft: k ? -6 : 0, display: 'flex' }}><Avatar i={i} s={s} /></span>)}
      {more ? <span className="round" style={{ marginLeft: -6, height: s, minWidth: s, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: T.weak, boxShadow: `0 0 0 2px ${T.white}, inset 0 0 0 1px ${T.soft}`, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 500, color: T.sub }}>+{more}</span> : null}
    </span>
  )
}

// ---- controls (AlignUI 36 / r10; compact 32 / r10) ----
function Btn({ kind = 'stroke', h = 36, icon, children, kbd }: { kind?: 'stroke' | 'primary' | 'ink'; h?: number; icon?: ReactNode; children?: ReactNode; kbd?: string }) {
  const base: CSSProperties = { ...row, gap: 6, height: h, padding: `0 ${h === 36 ? 14 : 12}px 0 ${icon ? (h === 36 ? 10 : 9) : h === 36 ? 14 : 12}px`, borderRadius: 10, fontSize: 14, fontWeight: 500, letterSpacing: '-0.006em', whiteSpace: 'nowrap', boxSizing: 'border-box', flex: 'none' }
  const look: Record<string, CSSProperties> = {
    stroke: { background: T.white, color: T.strong, boxShadow: ringXs() },
    primary: { background: `linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0)) ${T.v}`, color: '#fff', boxShadow: `0 0 0 1px #6B3FE8, inset 0 1px 0 rgba(255,255,255,0.20), 0 1px 2px rgba(77,36,196,0.30), 0 4px 10px -3px rgba(77,36,196,0.28)` },
    ink: { background: 'linear-gradient(#323137, #201e25) padding-box, linear-gradient(#4b4951, #31303a, #18171b) border-box', border: '1px solid transparent', color: '#fafafa', boxShadow: '0 0 0 1px #0d0d0d, 0 2px 4px rgb(0 0 0 / 0.10)' },
  }
  return (
    <span style={{ ...base, ...look[kind] }}>
      {icon && <span style={{ display: 'flex', opacity: kind === 'stroke' ? 0.72 : 1 }}>{icon}</span>}
      {children}
      {kbd && <span style={{ marginLeft: 4, height: 20, padding: '0 6px', borderRadius: 6, background: 'rgba(255,255,255,0.16)', fontSize: 12, fontWeight: 500, display: 'grid', placeItems: 'center' }}>{kbd}</span>}
    </span>
  )
}
const IconBtn = ({ children, dot }: { children: ReactNode; dot?: boolean }) => (
  <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 10, background: T.white, boxShadow: ringXs(), color: T.sub, flex: 'none' }}>
    {children}
    {dot && <span className="round" style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: 999, background: T.red, boxShadow: `0 0 0 2px ${T.white}` }} />}
  </span>
)
const Kbd = ({ children }: { children: ReactNode }) => (
  <span style={{ height: 20, minWidth: 20, padding: '0 5px', boxSizing: 'border-box', borderRadius: 6, background: T.white, boxShadow: `inset 0 0 0 1px ${T.soft}, 0 1px 0 ${T.soft}`, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 500, color: T.soft6 }}>{children}</span>
)
type Tone = 'green' | 'red' | 'violet' | 'grey' | 'orange'
const TONE: Record<Tone, [string, string]> = { green: [T.green, T.greenInk], red: [T.red, T.redInk], violet: [T.v, T.vInk], grey: [T.faint, T.sub], orange: [T.orange, T.orangeInk] }
// AlignUI stroke status badge: 24 tall, r6, a 6px dot and 12/500 text in the tone's ink
const Status = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 8px 0 7px', borderRadius: 6, background: T.white, boxShadow: `inset 0 0 0 1px ${T.soft}`, fontSize: 12, fontWeight: 500, color: TONE[tone][1], whiteSpace: 'nowrap', flex: 'none' }}>
    <span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: TONE[tone][0] }} />{children}
  </span>
)
const Delta = ({ children }: { children: ReactNode }) => (
  <span style={{ ...row, height: 20, padding: '0 6px', borderRadius: 6, background: T.green50, color: T.greenInk, fontSize: 12, fontWeight: 500, ...tnum }}>{children}</span>
)
const Tile = ({ children, s = 32, r = 10 }: { children: ReactNode; s?: number; r?: number }) => (
  <span style={{ display: 'grid', placeItems: 'center', width: s, height: s, borderRadius: r, background: T.white, boxShadow: ringXs(), color: T.v, flex: 'none' }}>{children}</span>
)

// ================= sidebar =================
function NavItem({ icon, label, active, badge }: { icon: ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <div style={{ ...row, gap: 10, height: 36, padding: '0 10px', borderRadius: 10, boxSizing: 'border-box', background: active ? T.white : 'transparent', boxShadow: active ? ringXs(T.line) : 'none', color: active ? T.strong : T.sub, fontSize: 14, fontWeight: active ? 500 : 450 }}>
      <span style={{ display: 'flex', color: active ? T.v : T.soft6 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && <span className="round" style={{ height: 20, minWidth: 20, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: T.v, color: '#fff', fontSize: 11, fontWeight: 600, display: 'grid', placeItems: 'center', ...tnum }}>{badge}</span>}
      {active && <RiArrowRightSLine size={18} color={T.faint} />}
    </div>
  )
}
const Label = ({ children }: { children: ReactNode }) => (
  <div style={{ height: 28, padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: T.soft6 }}>{children}</div>
)

function Sidebar() {
  return (
    <aside style={{ width: 264, flex: 'none', boxSizing: 'border-box', padding: '20px 16px 16px', display: 'flex', flexDirection: 'column' }}>
      {/* workspace switcher */}
      <div style={{ ...row, gap: 12, padding: '0 4px 0 6px' }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12, background: `linear-gradient(160deg, #9B7BFF, ${T.v} 55%, #5B2CC9)`, boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.18), 0 1px 2px rgba(77,36,196,0.3), 0 4px 10px -4px rgba(77,36,196,0.4)`, color: '#fff' }}><RiCalendarCheckLine size={20} /></span>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px' }}>Cadence</span>
          <span style={{ fontSize: 12, lineHeight: '16px', color: T.soft6 }}>Fernhill · Team plan</span>
        </span>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 8, background: T.white, boxShadow: ringXs(), color: T.soft6 }}><RiExpandUpDownLine size={16} /></span>
      </div>
      {/* search */}
      <div style={{ ...row, gap: 8, height: 36, marginTop: 20, padding: '0 8px 0 10px', borderRadius: 10, background: T.white, boxShadow: ringXs(), color: T.soft6, fontSize: 14 }}>
        <RiSearch2Line size={18} /><span style={{ flex: 1 }}>Search</span><Kbd>⌘K</Kbd>
      </div>

      <div style={{ height: 1, background: T.soft, margin: '20px 4px 12px' }} />
      <Label>Main</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        <NavItem icon={<RiHome5Fill size={18} />} label="Overview" active />
        <NavItem icon={<RiCalendarLine size={18} />} label="Calendar" />
        <NavItem icon={<RiInboxLine size={18} />} label="Requests" badge="2" />
        <NavItem icon={<RiLinksLine size={18} />} label="Booking links" />
        <NavItem icon={<RiFocus3Line size={18} />} label="Focus time" />
        <NavItem icon={<RiBarChartBoxLine size={18} />} label="Insights" />
      </div>

      <div style={{ marginTop: 20 }}><Label>Teams</Label></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        {([['Product design', T.v, '1'], ['Growth', T.orange, '2'], ['Platform', '#22D3BB', '3']] as const).map(([n, c, k]) => (
          <div key={n} style={{ ...row, gap: 10, height: 36, padding: '0 8px 0 14px', fontSize: 14, color: T.sub }}>
            <span className="round" style={{ width: 8, height: 8, borderRadius: 999, background: c, boxShadow: `0 0 0 3px ${c}22` }} />
            <span style={{ flex: 1, marginLeft: 2 }}>{n}</span><Kbd>⌘{k}</Kbd>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}><Label>Calendars</Label></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        {([['Work', T.v, true], ['Personal', '#FB4BA3', true], ['Team rota', '#22D3BB', false]] as const).map(([n, c, on]) => (
          <div key={n} style={{ ...row, gap: 10, height: 36, padding: '0 10px', fontSize: 14, color: T.sub }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, boxSizing: 'border-box', display: 'grid', placeItems: 'center', background: on ? c : T.white, boxShadow: on ? `inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px ${c}55` : `inset 0 0 0 1.5px ${T.soft}`, color: '#fff' }}>{on && <RiCheckLine size={12} />}</span>
            <span style={{ flex: 1 }}>{n}</span>
            {!on && <span style={{ fontSize: 12, color: T.soft6 }}>Hidden</span>}
          </div>
        ))}
      </div>

      {/* plan card: tray + white card (affectUI container grammar) */}
      <div style={{ marginTop: 'auto', borderRadius: 16, background: T.white, boxShadow: CARD, padding: 14 }}>
        <div style={{ ...row, gap: 8, fontSize: 14, fontWeight: 500 }}><RiFlashlightLine size={16} color={T.v} />Pro trial<span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 450, color: T.soft6, ...tnum }}>9 days left</span></div>
        <div style={{ height: 6, borderRadius: 999, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, marginTop: 12, overflow: 'hidden' }} className="round">
          <div className="round" style={{ width: '70%', height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${T.v300}, ${T.v})` }} />
        </div>
        <div style={{ fontSize: 12, lineHeight: '17px', color: T.soft6, marginTop: 10 }}>Smart rescheduling stays on after the trial with Pro.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12 }}>
        <NavItem icon={<RiSettings3Line size={18} />} label="Settings" />
        <NavItem icon={<RiQuestionLine size={18} />} label="Help" />
      </div>
      <div style={{ height: 1, background: T.soft, margin: '12px 4px 14px' }} />
      <div style={{ ...row, gap: 12, padding: '0 4px' }}>
        <span style={{ position: 'relative', display: 'flex' }}>
          <Avatar i="L" s={40} ring="transparent" />
          <span className="round" style={{ position: 'absolute', right: -1, bottom: -1, width: 11, height: 11, borderRadius: 999, background: T.green, boxShadow: `0 0 0 2px ${T.frame}` }} />
        </span>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ ...row, gap: 4, fontSize: 14, fontWeight: 500, lineHeight: '20px' }}>Leo Park<RiVerifiedBadgeFill size={16} color={T.v} /></span>
          <span style={{ fontSize: 12, lineHeight: '16px', color: T.soft6 }}>leo@fernhill.co</span>
        </span>
        <RiArrowRightSLine size={20} color={T.faint} />
      </div>
    </aside>
  )
}

// ================= header + KPIs =================
function Header({ inHero }: { inHero?: boolean }) {
  const H1 = inHero ? 'p' : 'h1'
  return (
    <div style={{ ...row, gap: 14, height: 48 }}>
      <span className="round" style={{ display: 'grid', placeItems: 'center', width: 48, height: 48, borderRadius: 999, background: T.white, boxShadow: ringXs(), color: T.orange }}><RiSunLine size={22} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <H1 style={{ margin: 0, fontSize: 18, lineHeight: '24px', fontWeight: 500, letterSpacing: '-0.015em' }}>Good morning, Leo</H1>
        <span style={{ fontSize: 14, lineHeight: '20px', color: T.sub }}>Thursday, Oct 22 · 6 meetings and 3h 15m of focus today</span>
      </div>
      <div style={{ marginLeft: 'auto', ...row, gap: 10 }}>
        <IconBtn><RiSearch2Line size={18} /></IconBtn>
        <IconBtn dot><RiNotification3Line size={18} /></IconBtn>
        <span style={{ width: 1, height: 20, background: T.soft, margin: '0 4px' }} />
        <Btn icon={<RiLinksLine size={18} />}>Share availability</Btn>
        <Btn kind="ink" icon={<RiSparkling2Fill size={18} />}>Find a time</Btn>
      </div>
    </div>
  )
}

function MiniBars({ v, hi }: { v: number[]; hi: number }) {
  return (
    <svg width={64} height={32} viewBox="0 0 64 32" aria-hidden>
      {v.map((h, i) => <rect key={i} x={i * 9.5} y={32 - h} width={6} height={h} rx={2} fill={i === hi ? T.v : T.v100} />)}
    </svg>
  )
}
function Spark() {
  const p = [22, 20, 21, 16, 17, 12, 13, 9, 10, 6]
  const d = p.map((y, i) => `${i ? 'L' : 'M'}${i * 7.1} ${y}`).join(' ')
  return (
    <svg width={64} height={32} viewBox="0 0 64 32" aria-hidden>
      <defs><linearGradient id="cpa-sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={T.v} stopOpacity="0.18" /><stop offset="1" stopColor={T.v} stopOpacity="0" /></linearGradient></defs>
      <path d={`${d} L63.9 32 L0 32 Z`} fill="url(#cpa-sp)" />
      <path d={d} fill="none" stroke={T.v} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={63.9} cy={6} r={2.6} fill="#fff" stroke={T.v} strokeWidth={1.6} />
    </svg>
  )
}
function Ring({ pct }: { pct: number }) {
  const r = 13, c = 2 * Math.PI * r
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" aria-hidden style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={16} cy={16} r={r} fill="none" stroke={T.v50} strokeWidth={4} />
      <circle cx={16} cy={16} r={r} fill="none" stroke={T.v} strokeWidth={4} strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
    </svg>
  )
}
function Kpi({ icon, label, value, unit, delta, note, viz }: { icon: ReactNode; label: string; value: string; unit?: string; delta: string; note: string; viz: ReactNode }) {
  return (
    <div style={{ flex: 1, height: 128, boxSizing: 'border-box', borderRadius: 16, background: T.white, boxShadow: CARD, padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, gap: 10 }}>
        <Tile>{icon}</Tile>
        <span style={{ fontSize: 14, fontWeight: 500, color: T.sub }}>{label}</span>
        <span style={{ marginLeft: 'auto', color: T.faint, display: 'flex' }}><RiMore2Line size={18} /></span>
      </div>
      <div style={{ marginTop: 'auto', ...row, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 24, lineHeight: '32px', fontWeight: 500, letterSpacing: '-0.02em', ...tnum }}>{value}{unit && <span style={{ color: T.soft6, fontWeight: 450 }}>{unit}</span>}</span>
          <span style={{ ...row, gap: 6, fontSize: 12, color: T.soft6 }}><Delta>{delta}</Delta>{note}</span>
        </div>
        <span style={{ marginLeft: 'auto', display: 'flex' }}>{viz}</span>
      </div>
    </div>
  )
}

// ================= today timeline =================
type Ev = { t: string; dur: string; title: string; meta: string; state: 'done' | 'now' | 'next'; people: string[]; more?: number; chip?: ReactNode; join?: boolean }
const DAY: Ev[] = [
  { t: '09:00', dur: '15 min', title: 'Standup', meta: 'Product design · Meet', state: 'done', people: ['L', 'A', 'M'], more: 3 },
  { t: '10:00', dur: '30 min', title: '1:1 Maya / Leo', meta: 'Room 4B', state: 'done', people: ['M', 'L'] },
  { t: '10:30', dur: '45 min', title: 'Design crit · v2.4', meta: 'Meet · started 12 min ago', state: 'now', people: ['T', 'A', 'J'], more: 2, join: true },
  { t: '13:00', dur: '45 min', title: 'Customer interview', meta: 'Zoom · notes by Cadence', state: 'next', people: ['S', 'L'] },
  { t: '14:30', dur: '1 h', title: 'Roadmap review', meta: 'Room 2A', state: 'next', people: ['R', 'M', 'L'], chip: <Chip icon={<RiArrowGoForwardLine size={13} />}>Moved from 11:00</Chip> },
  { t: '16:00', dur: '2 h', title: 'Prototype pass', meta: 'Focus block · notifications off', state: 'next', people: ['L'], chip: <Chip icon={<RiLockLine size={13} />} grey>Protected</Chip> },
]
function Chip({ icon, children, grey }: { icon: ReactNode; children: ReactNode; grey?: boolean }) {
  return <span style={{ ...row, gap: 4, height: 22, padding: '0 7px 0 6px', borderRadius: 6, background: grey ? T.weak : T.v50, color: grey ? T.sub : T.vInk, boxShadow: `inset 0 0 0 1px ${grey ? T.line : T.v100}`, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>{icon}{children}</span>
}

const ROW_H = 62, DOT_Y = 31
function Rail({ state, first, last }: { state: Ev['state']; first: boolean; last: boolean }) {
  // the rail is drawn in segments that stop 6px short of each marker, so no line ever runs through a dot
  const seg = (top: number, h: number, c: string) => <span style={{ position: 'absolute', left: 11, top, width: 2, height: h, borderRadius: 1, background: c }} />
  const gap = 12
  return (
    <span style={{ position: 'relative', width: 24, height: ROW_H, flex: 'none' }}>
      {!first && seg(0, DOT_Y - gap, state === 'next' ? T.soft : T.v100)}
      {!last && seg(DOT_Y + gap, ROW_H - DOT_Y - gap, state === 'done' ? T.v100 : T.soft)}
      {state === 'done' && <span className="round" style={{ position: 'absolute', left: 4, top: DOT_Y - 8, width: 16, height: 16, borderRadius: 999, background: T.v100, color: T.vInk, display: 'grid', placeItems: 'center' }}><RiCheckLine size={11} /></span>}
      {state === 'now' && <span className="round" style={{ position: 'absolute', left: 5, top: DOT_Y - 7, width: 14, height: 14, borderRadius: 999, background: T.v, boxShadow: `0 0 0 4px ${T.v}29, inset 0 0 0 3px #fff` }} />}
      {state === 'next' && <span className="round" style={{ position: 'absolute', left: 6, top: DOT_Y - 6, width: 12, height: 12, borderRadius: 999, background: T.white, boxShadow: `inset 0 0 0 2px ${T.soft}` }} />}
    </span>
  )
}
function Today() {
  return (
    <section aria-label="Today, sample schedule" style={{ width: 756, height: 446, boxSizing: 'border-box', borderRadius: 16, background: T.white, boxShadow: CARD, display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, gap: 8, height: 60, padding: '0 16px 0 20px', flex: 'none' }}>
        <h2 style={{ margin: 0, fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: '-0.011em' }}>Today</h2>
        <span style={{ height: 22, padding: '0 7px', borderRadius: 6, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 500, color: T.sub, ...tnum }}>6</span>
        <div style={{ marginLeft: 'auto', ...row, gap: 10 }}>
          {/* segmented: track r10 pad 2, options r8 */}
          <div style={{ ...row, height: 32, padding: 2, boxSizing: 'border-box', borderRadius: 10, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            {['Mine', 'Team', 'Rooms'].map((o, i) => (
              <span key={o} style={{ height: 28, padding: '0 12px', borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 500, color: i === 0 ? T.strong : T.soft6, background: i === 0 ? T.white : 'transparent', boxShadow: i === 0 ? `0 0 0 1px ${T.line}, 0 1px 2px rgba(10,13,20,0.06)` : 'none' }}>{o}</span>
            ))}
          </div>
          <Btn h={32} icon={<RiCalendarLine size={16} />}>Open calendar</Btn>
        </div>
      </div>
      <div style={{ height: 1, background: T.line, margin: '0 20px', flex: 'none' }} />
      <div style={{ padding: '8px 12px 0 12px' }}>
        {DAY.map((e, i) => (
          <div key={e.t} style={{ ...row, height: ROW_H }}>
            <div style={{ width: 72, paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 2, flex: 'none' }}>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: e.state === 'done' ? T.soft6 : T.strong, ...tnum }}>{e.t}</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: T.soft6, ...tnum }}>{e.dur}</span>
            </div>
            <Rail state={e.state} first={i === 0} last={i === DAY.length - 1} />
            {/* the highlight covers the content column only, never the rail */}
            <div style={{ flex: 1, height: ROW_H - 8, marginLeft: 10, padding: '0 12px 0 14px', borderRadius: 12, boxSizing: 'border-box', ...row, gap: 12,
              background: e.state === 'now' ? `linear-gradient(90deg, ${T.v50}, ${T.v25})` : 'transparent', boxShadow: e.state === 'now' ? `inset 0 0 0 1px ${T.v100}` : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ ...row, gap: 8, fontSize: 14, lineHeight: '20px', fontWeight: 500, color: e.state === 'done' ? T.sub : T.strong }}>{e.title}{e.chip}</span>
                <span style={{ ...row, gap: 6, fontSize: 12, lineHeight: '16px', color: e.state === 'now' ? T.vInk : T.soft6 }}>
                  {e.state === 'now' && <span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: T.red, boxShadow: `0 0 0 3px ${T.red}26` }} />}
                  {e.meta}
                </span>
              </div>
              <div style={{ marginLeft: 'auto', ...row, gap: 12 }}>
                <Stack ids={e.people} more={e.more} />
                {e.join ? <Btn kind="ink" h={32} icon={<RiVideoOnLine size={16} />}>Join</Btn> : <span style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: T.faint }}><RiMore2Line size={18} /></span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ================= decisions tray (affectUI) + booking link =================
function Decision({ title, sub, due, a, b }: { title: string; sub: string; due?: string; a: string; b: string }) {
  return (
    <div style={{ padding: '16px 16px 16px' }}>
      <div style={{ ...row, gap: 8, fontSize: 14, lineHeight: '20px', fontWeight: 500 }}>{title}{due && <span style={{ height: 20, padding: '0 6px', borderRadius: 6, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 500, color: T.sub }}>{due}</span>}</div>
      <div style={{ fontSize: 13, lineHeight: '18px', color: T.soft6, marginTop: 4 }}>{sub}</div>
      <div style={{ ...row, gap: 8, marginTop: 14 }}><Btn kind="ink" h={32}>{a}</Btn><Btn h={32}>{b}</Btn></div>
    </div>
  )
}
function Side() {
  return (
    <div style={{ width: 372, height: 446, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <section aria-label="Decisions waiting, sample" style={{ borderRadius: 20, background: T.weak, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 4 }}>
        <div style={{ ...row, gap: 8, height: 40, padding: '0 12px', fontSize: 14, fontWeight: 500, color: T.orangeInk }}>
          <RiErrorWarningFill size={18} color={T.orange} />2 need your input
          <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 500, color: T.sub }}>View all</span>
        </div>
        <div style={{ borderRadius: 16, background: T.white, boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(10,13,20,0.04)` }}>
          <Decision title="Move Hiring sync to Friday?" sub="Sam is out Thursday. Friday 11:00 is free for all five." a="Move it" b="Keep Thursday" />
          <div style={{ height: 1, background: T.line }} />
          <Decision title="Ana wants 45 min next week" due="Due Fri" sub="Cadence picked Tue 14:00. No focus block moves." a="Accept" b="Other times" />
        </div>
        <div style={{ ...row, gap: 6, height: 36, padding: '0 12px', fontSize: 12, color: T.soft6 }}><RiShieldCheckLine size={15} />Nothing with an external guest moves without you</div>
      </section>
      <section aria-label="Booking link" style={{ flex: 1, borderRadius: 16, background: T.white, boxShadow: CARD, padding: '0 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ ...row, gap: 12 }}>
          <Tile><RiLinksLine size={18} /></Tile>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px' }}>45 min intro</span>
            <span style={{ fontSize: 12, lineHeight: '16px', color: T.soft6, fontFamily: '"Geist Mono Variable", ui-monospace, monospace' }}>cadence.so/leo/intro</span>
          </div>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 10, background: T.white, boxShadow: ringXs(), color: T.sub }}><RiFileCopyLine size={16} /></span>
        </div>
        <div style={{ height: 1, background: T.line }} />
        <div style={{ ...row, gap: 10, fontSize: 13, color: T.sub }}>
          <span style={{ flex: 1 }}>10 min buffer after each booking</span>
          <span className="round" style={{ position: 'relative', width: 32, height: 18, borderRadius: 999, background: T.v, boxShadow: 'inset 0 1px 2px rgba(40,10,120,0.25)' }}>
            <span className="round" style={{ position: 'absolute', right: 2, top: 2, width: 14, height: 14, borderRadius: 999, background: '#fff', boxShadow: '0 1px 2px rgba(14,18,27,0.2), 0 0 0 0.5px rgba(14,18,27,0.06)' }} />
          </span>
        </div>
      </section>
    </div>
  )
}

// ================= focus chart =================
function FocusChart() {
  const days: [string, number, number][] = [['Mon', 2, 3.5], ['Tue', 2.5, 4], ['Wed', 1.5, 2.5], ['Thu', 3.25, 2], ['Fri', 2.25, 1.5]]
  const H = 132, max = 4.5, bw = 18
  const y = (h: number) => H - (h / max) * H
  return (
    <section aria-label="Focus this week, sample chart" style={{ width: 560, height: 312, boxSizing: 'border-box', borderRadius: 16, background: T.white, boxShadow: CARD, padding: '0 20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, gap: 8, height: 60, flex: 'none' }}>
        <h2 style={{ margin: 0, fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: '-0.011em' }}>Focus this week</h2>
        <span style={{ marginLeft: 'auto', ...row, gap: 14, fontSize: 12, color: T.sub }}>
          <span style={{ ...row, gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: T.v }} />Focus</span>
          <span style={{ ...row, gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: T.soft }} />Meetings</span>
        </span>
        <Btn h={32}>This week<RiArrowDownSLine size={16} color={T.soft6} /></Btn>
      </div>
      <div style={{ ...row, gap: 10 }}>
        <span style={{ fontSize: 24, lineHeight: '32px', fontWeight: 500, letterSpacing: '-0.02em', ...tnum }}>11h 30m</span>
        <span style={{ fontSize: 14, color: T.soft6 }}>of a 15h goal</span>
        <Delta>+2h</Delta>
      </div>
      <div style={{ position: 'relative', height: H, marginTop: 'auto', marginBottom: 40, marginLeft: 28 }}>
        {[0, 2, 4].map((h) => (
          <div key={h}>
            <span style={{ position: 'absolute', left: -28, top: y(h) - 8, width: 20, textAlign: 'right', fontSize: 11, lineHeight: '16px', color: T.soft6, ...tnum }}>{h}h</span>
            <span style={{ position: 'absolute', left: 0, right: 0, top: y(h), height: 1, background: h ? `linear-gradient(90deg, ${T.soft} 0 4px, transparent 4px 8px) 0 0 / 8px 1px` : T.soft }} />
          </div>
        ))}
        <div style={{ position: 'absolute', left: 0, right: 0, top: -6, bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          {days.map(([d, f, m], i) => (
            <div key={d} style={{ position: 'relative', display: 'flex', gap: 4, alignItems: 'flex-end', height: '100%', padding: '0 8px' }}>
              {/* today: an opaque column band sits over the gridlines, so no line runs behind the tooltip or the bars */}
              {i === 3 && <span style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 1, borderRadius: '10px 10px 0 0', background: T.v25 }} />}
              <span style={{ position: 'relative', width: bw, height: (f / max) * H, borderRadius: '6px 6px 2px 2px', background: i === 3 ? T.v : T.v300 }} />
              <span style={{ position: 'relative', width: bw, height: (m / max) * H, borderRadius: '6px 6px 2px 2px', background: T.soft }} />
              <span style={{ position: 'absolute', left: 0, right: 0, top: H + 16, textAlign: 'center', fontSize: 12, fontWeight: i === 3 ? 500 : 400, color: i === 3 ? T.strong : T.soft6 }}>{d}</span>
              {i === 3 && (
                <span style={{ position: 'absolute', left: '50%', bottom: 'calc(100% + 8px)', transform: 'translateX(-50%)', height: 28, padding: '0 10px', borderRadius: 8, background: T.white, boxShadow: FLOAT, whiteSpace: 'nowrap', ...row, gap: 6, fontSize: 12, zIndex: 2, ...tnum }}>
                  <span style={{ color: T.soft6 }}>Today</span><span style={{ fontWeight: 500 }}>3h 15m focus</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================= team today =================
type Person = { i: string; n: string; role: string; tone: Tone; st: string; free: string; busy: number[] }
const TEAM: Person[] = [
  { i: 'L', n: 'Leo Park', role: 'You', tone: 'red', st: 'In a call', free: '11:15', busy: [1, 2, 2, 0, 1, 1, 3, 3, 0] },
  { i: 'A', n: 'Ana Ruiz', role: 'Design lead', tone: 'violet', st: 'Focus', free: '12:00', busy: [1, 3, 3, 0, 1, 0, 1, 0, 0] },
  { i: 'M', n: 'Mia Chen', role: 'Research', tone: 'green', st: 'Free', free: 'Now', busy: [1, 1, 0, 0, 0, 1, 1, 0, 3] },
  { i: 'S', n: 'Sam Okoye', role: 'Engineering', tone: 'grey', st: 'Out today', free: 'Fri', busy: [4, 4, 4, 4, 4, 4, 4, 4, 4] },
  { i: 'J', n: 'Jon Weber', role: 'Product', tone: 'green', st: 'Free', free: 'Now', busy: [1, 0, 0, 1, 1, 0, 0, 1, 0] },
]
function Strip({ busy }: { busy: number[] }) {
  // 09:00-18:00, one cell per hour: 0 free, 1 meeting, 2 meeting now, 3 focus, 4 out
  const fill = (b: number) => b === 1 ? T.v100 : b === 2 ? T.v : b === 3 ? `repeating-linear-gradient(135deg, ${T.v50} 0 3px, ${T.v100} 3px 4.5px)` : b === 4 ? T.weak : T.white
  return (
    <span style={{ ...row, gap: 2 }}>
      {busy.map((b, k) => <span key={k} style={{ width: 10, height: 20, borderRadius: 4, background: fill(b), boxShadow: b === 0 || b === 4 ? `inset 0 0 0 1px ${T.line}` : 'none' }} />)}
    </span>
  )
}
function Team() {
  const cols = '1fr 112px 76px 106px'
  return (
    <section aria-label="Team today, sample" style={{ width: 568, height: 312, boxSizing: 'border-box', borderRadius: 16, background: T.white, boxShadow: CARD, padding: '0 12px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, gap: 8, height: 60, padding: '0 8px', flex: 'none' }}>
        <h2 style={{ margin: 0, fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: '-0.011em' }}>Team today</h2>
        <span style={{ marginLeft: 'auto' }}><Btn h={32} icon={<RiGlobalLine size={16} />}>Berlin · CEST</Btn></span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, columnGap: 0, alignItems: 'center', height: 32, padding: '0 12px', borderRadius: 8, background: T.weak, fontSize: 12, fontWeight: 500, color: T.soft6 }}>
        <span>Person</span><span>Status</span><span>Next free</span><span style={{ ...row, justifyContent: 'space-between', ...tnum }}><span>9</span><span>12</span><span>15</span><span>18</span></span>
      </div>
      {TEAM.map((p, k) => (
        <div key={p.n} style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', height: 42, padding: '0 12px', borderTop: k ? `1px solid ${T.line}` : 'none', marginTop: k ? 0 : 4 }}>
          <span style={{ ...row, gap: 10, minWidth: 0 }}>
            <Avatar i={p.i} s={28} ring="transparent" />
            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '18px' }}>{p.n}</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: T.soft6 }}>{p.role}</span>
            </span>
          </span>
          <span><Status tone={p.tone}>{p.st}</Status></span>
          <span style={{ ...row, gap: 4, fontSize: 13, color: p.free === 'Now' ? T.greenInk : T.sub, fontWeight: p.free === 'Now' ? 500 : 400, ...tnum }}>{p.free !== 'Now' && <RiTimeLine size={13} color={T.faint} />}{p.free}</span>
          <Strip busy={p.busy} />
        </div>
      ))}
    </section>
  )
}

// The app frame alone (1472x1072), reused by the Cadence hero at a smaller scale.
// frame r36, inset 8, main panel r28 (concentric). In a hero the page owns the h1, so the greeting becomes a plain line.
export function CadenceAppFrame({ style, inHero }: { style?: CSSProperties; inHero?: boolean }) {
  const Main = inHero ? 'div' : 'main'
  return (
  <div data-product style={{ position: 'relative', width: 1472, height: 1072, ...style, borderRadius: 36, background: T.frame, boxShadow: '0 0 0 1px rgba(14,18,27,0.07), 0 1px 2px rgba(14,18,27,0.04), 0 24px 56px -16px rgba(14,18,27,0.16), 0 8px 20px -8px rgba(14,18,27,0.06)', display: 'flex' }}>
    <Sidebar />
    <Main aria-label="Cadence overview, sample data" style={{ position: 'relative', margin: '8px 8px 8px 0', flex: 1, borderRadius: 28, background: T.white, boxShadow: `0 0 0 1px ${T.line}, 0 1px 3px rgba(14,18,27,0.04)`, padding: '20px 28px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <Header inHero={inHero} />
      <div style={{ height: 1, background: T.line, margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: 16 }}>
        <Kpi icon={<RiCalendarCheckLine size={18} />} label="Meetings this week" value="18" delta="−3" note="vs last week" viz={<MiniBars v={[18, 24, 14, 28, 20, 10, 6]} hi={3} />} />
        <Kpi icon={<RiFocus3Line size={18} />} label="Focus kept" value="11h 30m" delta="+2h" note="77% of goal" viz={<Ring pct={0.77} />} />
        <Kpi icon={<RiTimeLine size={18} />} label="Time to book" value="4" unit=" min" delta="−6 min" note="median" viz={<Spark />} />
        <Kpi icon={<RiSparkling2Fill size={18} />} label="Conflicts settled" value="7" delta="7 of 7" note="by Cadence" viz={<Stack ids={['A', 'M', 'R']} s={24} more={4} />} />
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}><Today /><Side /></div>
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}><FocusChart /><Team /></div>
    </Main>
  </div>
  )
}

export default function CadenceProductA() {
  return (
    <div style={{ ...font, width: 1600, height: 1200, background: `radial-gradient(1200px 700px at 50% 0%, #F3F3F5, ${T.canvas})`, position: 'relative', overflow: 'hidden' }}>
      <CadenceAppFrame style={{ position: 'absolute', left: 64, top: 64 }} />
    </div>
  )
}

// X carousel cut (#/cprodax): AlignUI's presentation, the whole app frame on a grey canvas with equal 56px margins on all
// four sides (no crop through text), cut into three 480-wide strips. Canvas 1440x1080, frame scaled to 1328 wide.
export function CadenceProductAX() {
  const s = (1440 - 112) / 1472
  return (
    <div style={{ ...font, width: 1440, height: 1080, background: `radial-gradient(1100px 640px at 30% 0%, #F3F3F5, ${T.canvas})`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 56, top: (1080 - 1072 * s) / 2, width: 1472, height: 1072, transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <CadenceAppFrame />
      </div>
    </div>
  )
}
