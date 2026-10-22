// Replica study (never published): Rico / Ace Studio, Aster "Companies / Database" table.
// Reference: knowledge/benchmarks/heyrico-x/live/work-aster/cdn/04-j7ppicbkvDTp99s211DT9AmBUU.png (acedesign.io case-page
// CDN original, 6400x4000 palette PNG = a 1600x1000 frame at 4x; the 1px hairlines are exactly 4 image px). Same screen
// was posted on X (2099121946437071193, 653 likes, "Every B2B SaaS product design should look like this").
// Type: SF Pro (system-ui on macOS) 500, solved from 13 ink widths: 13px nav/labels at -0.15, 14px table body at -0.2.
// Company logos, the avatar and the founder faces are neutral placeholders of the same size, not his assets.
import type { CSSProperties, ReactNode } from 'react'
import {
  ChevronDown, PanelLeft, Inbox, Network, Sparkles, CalendarDays, Contact, Building2, Mail, ChartNoAxesColumn, Shapes,
  Plus, ArrowDownWideNarrow, SlidersHorizontal, Search, Columns3, Rocket, type LucideIcon,
} from 'lucide-react'

const C = {
  canvas: '#ffffff', frame: '#e5e5e5', side: '#fbfbfb', line: '#eeeff2', ink: '#262626', sub: '#737373', head: '#404040',
  icon: '#737373', mute: '#a1a1a1', active: '#f0f0f0', chip: '#f5f5f5', thead: '#fafafa', link: '#1f8aff', foot: '#fcfcfc',
}
const FONT = 'system-ui, -apple-system, "SF Pro Text", "Inter Variable", sans-serif'
// SF Pro metrics: ascender .952, descender .241, cap .705 -> box top for a cap top
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.3495 * fs - 0.25

function Tx({ x, cap, fs = 13, c = C.ink, w = 500, ls = -0.15, r, children, style }: { x?: number; r?: number; cap: number; fs?: number; c?: string; w?: number; ls?: number; children: ReactNode; style?: CSSProperties }) {
  const L = Math.round(fs * 1.25)
  const pos: CSSProperties = r !== undefined ? { right: 1600 - r } : { left: (x ?? 0) - 0.5 }
  return <div style={{ position: 'absolute', ...pos, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, letterSpacing: ls, whiteSpace: 'pre', ...style }}>{children}</div>
}
function Ic({ I, cx, cy, s = 16, sw = 1.3, c = C.icon }: { I: LucideIcon; cx: number; cy: number; s?: number; sw?: number; c?: string }) {
  return <I size={s} strokeWidth={sw} color={c} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} />
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>
const ring = (c: string, w = 1) => `0 0 0 ${w}px ${c}`

// eight-ray asterisk used for the workspace mark, Coworker and Ask AI
function Star({ cx, cy, s, c, sw = 1.3 }: { cx: number; cy: number; s: number; c: string; sw?: number }) {
  const r = s / 2 - sw / 2
  return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} stroke={c} strokeWidth={sw} strokeLinecap="round">
    {[0, 45, 90, 135].map((a) => { const t = (a * Math.PI) / 180, dx = Math.cos(t) * r, dy = Math.sin(t) * r; return <line key={a} x1={s / 2 - dx} y1={s / 2 - dy} x2={s / 2 + dx} y2={s / 2 + dy} /> })}
  </svg>
}

/* ---------------- sidebar ---------------- */
const NAV1: [LucideIcon | 'avatar' | 'star', string, number, string?][] = [[Inbox, 'Inboxes', 145.4, '99+'], ['avatar', 'Assigned to me', 174.4, '12'], ['star', 'Coworker', 203.4], [Network, 'Escalations', 232.4]]
const NAV2: [LucideIcon, string, number][] = [[Sparkles, 'Agents', 305], [CalendarDays, 'Schedule', 334], [Contact, 'Customers', 363], [Building2, 'Companies', 392], [Mail, 'Emails', 421], [ChartNoAxesColumn, 'Report', 450], [Shapes, 'Apps', 479]]
const FAV: [string, string, string][] = [['Apple', 'Company', '#111'], ['Google', 'Company', '#4285f4'], ['ClickUp', 'Company', '#7b68ee'], ['Rico', 'Investor', '#3b82f6'], ['Mehdi', 'Investor', '#222']]

function Sidebar() {
  return <>
    <Box x={81} y={51} w={238} h={898} style={{ background: C.side }} />
    {/* workspace header */}
    <Box x={93} y={61} w={18} h={18.5} style={{ background: '#161616', borderRadius: 5 }} />
    <Star cx={102} cy={70.25} s={10} c="#fff" sw={1.4} />
    <Tx x={118} cap={65.6}>Acme Labs</Tx>
    <Ic I={ChevronDown} cx={201} cy={70} s={18} sw={1.3} c="#545353" />
    <Ic I={PanelLeft} cx={297} cy={70} s={16} sw={1.25} c="#989b9b" />
    <Box x={81} y={89} w={238} h={1} style={{ background: C.line }} />
    {/* quick actions */}
    <Box x={92} y={100} w={216} h={28} style={{ background: '#fff', borderRadius: 8, boxShadow: `${ring('#e9e9e9')}, 0 1px 1px rgba(0,0,0,.04)` }} />
    <Tx x={100.5} cap={109.85} ls={-0.27} c={C.sub}>Quick Actions</Tx>
    <Box x={284} y={106} w={16} h={16} style={{ background: C.chip, borderRadius: 4 }} />
    <Tx x={289.3} cap={109.3} fs={12} c={C.sub}>J</Tx>
    {NAV1.map(([I, t, cap, n]) => <div key={t}>
      {I === 'avatar' ? <Box x={96} y={cap - 2} w={14} h={14} style={{ borderRadius: 7, background: 'radial-gradient(circle at 50% 40%, #fff 0 22%, #3b82f6 23%)' }} />
        : I === 'star' ? <Star cx={103} cy={cap + 4.6} s={13} c="#121314" sw={1.35} />
          : <Ic I={I} cx={103} cy={cap + 4.7} s={15} sw={1.25} />}
      <Tx x={118.6} cap={cap}>{t}</Tx>
      {n && <Tx r={303.3} cap={cap + 1.85} fs={10.5} w={400} ls={-0.1} c={C.sub}>{n}</Tx>}
    </div>)}
    <Tx x={96.3} cap={277.6} fs={11} c={C.sub}>General</Tx>
    <Box x={88} y={383} w={224} h={28} style={{ background: C.active, borderRadius: 8 }} />
    {NAV2.map(([I, t, cap]) => <div key={t}>
      <Ic I={I} cx={103} cy={cap + 4.7} s={15} sw={1.25} />
      <Tx x={118.6} cap={cap}>{t}</Tx>
    </div>)}
    <Tx x={96.5} cap={524} fs={11} c={C.sub}>Favorites</Tx>
    {FAV.map(([t, k, col], i) => { const cap = 552.4 + i * 28.9; return <div key={t}>
      <Box x={97.5} y={cap - 0.5} w={11} h={11} style={{ borderRadius: 3, background: col }} />
      <Tx x={118.6} cap={cap} c="#3b3b3b">{t}</Tx>
      <Tx r={303.8} cap={cap + 1.5} fs={11} w={400} ls={-0.15} c={C.mute}>{k}</Tx>
    </div> })}
    {/* footer */}
    <Box x={81} y={912} w={238} h={1} style={{ background: C.line }} />
    <Box x={81} y={913} w={238} h={36} style={{ background: C.foot }} />
    <Box x={93} y={922} w={18} h={18.5} style={{ background: '#161616', borderRadius: 5 }} />
    <Ic I={Rocket} cx={102} cy={931.2} s={11} sw={1.6} c="#fff" />
    <Tx x={118.6} cap={927} c="#121314">Upgrade to Pro</Tx>
    <Box x={249} y={922} w={58} h={18} style={{ background: C.link, borderRadius: 4, boxShadow: ring('#1977e2') }} />
    <Tx x={254.6} cap={926.5} fs={12} ls={-0.35} c="#fff">Upgrade</Tx>
    <Box x={319} y={51} w={1} h={898} style={{ background: C.line }} />
  </>
}

/* ---------------- main ---------------- */
type Tag = [string, string, string]
const TAG: Record<string, Tag> = {
  pm: ['Project Management', '#ff8904', '#ffead8'], ai: ['Artificial Intelligence', '#00bba7', '#cbfbf1'], com: ['Communication', '#2b7fff', '#dbeafe'],
  task: ['Task Management', '#00a6f4', '#dff2fe'], vid: ['Video Conferencing', '#8e51ff', '#ede9fe'], db: ['Database', '#f6339a', '#fce7f3'],
  des: ['Design Tool', '#fb2c36', '#ffe2e2'], mkt: ['Online Marketplace', '#2b7fff', '#dbeafe'], str: ['Streaming', '#00bba7', '#cbfbf1'],
}
// [name, logo colour, status, tag, domain, revenue, founder]
const ROWS: [string, string, 'half' | 'dash' | 'sun', keyof typeof TAG, string, string, string][] = [
  ['ClickUp', '#7b68ee', 'half', 'pm', 'clickup.com', '$78,910,111', 'Zeb Evans'],
  ['OpenAI', '#111111', 'dash', 'ai', 'notion.com', '$123,334,234', 'Sam Altman'],
  ['Trello', '#0c66e4', 'sun', 'pm', 'trello.com', '$45,678,910', 'Michael Pryor'],
  ['Slack', '#e01e5a', 'dash', 'com', 'slack.com', '$89,123,456', 'Stewart Butterfield'],
  ['Asana', '#f06a6a', 'dash', 'task', 'asana.com', '$67,890,123', 'Dustin Moskovitz'],
  ['Zoom', '#2d8cff', 'dash', 'vid', 'zoom.us', '$234,567,890', 'Eric Yuan'],
  ['Airtable', '#fcb400', 'sun', 'db', 'airtable.com', '$12,345,678', 'Howie Liu'],
  ['Grammarly', '#15c39a', 'half', 'pm', 'grammarly.com', '$34,567,890', 'Jason Frieden'],
  ['Figma', '#f24e1e', 'dash', 'des', 'figma.com', '$99,999,999', 'Dylan Field'],
  ['Shopify', '#95bf47', 'sun', 'mkt', 'shopify.com', '$1,000,000,000', 'Tobi Lütke'],
  ['Monday.com', '#ff3d57', 'sun', 'pm', 'monday.com', '$56,789,123', 'Roy Mann'],
  ['Airbnb', '#ff5a5f', 'half', 'mkt', 'airbnb.com', '$8,000,000,000', 'Brian Chesky'],
  ['Netflix', '#e50914', 'dash', 'str', 'netflix.com', '$29,800,000,000', 'Reed Hastings'],
  ['Framer', '#111111', 'half', 'des', 'framer.com', '$27,000,000,000', 'Marc Bendig'],
]
// row tops (CSS px): 38px pitch, the Airbnb row is 44 tall in the reference
const ROW_TOP = [174, 212, 250, 288, 326, 364, 402, 440, 478, 516, 554, 592, 636, 674]
const ROW_H = [37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 43, 37, 37]
const COLS = [559, 819, 1019, 1219, 1419]

function Status({ k, cx, cy }: { k: 'half' | 'dash' | 'sun'; cx: number; cy: number }) {
  const S = 12
  return <svg width={S} height={S} viewBox="0 0 12 12" style={{ position: 'absolute', left: cx - 6, top: cy - 6 }}>
    {k === 'half' && <><circle cx="6" cy="6" r="5.25" fill="none" stroke="#ff6900" strokeWidth="1.5" /><path d="M6 .75a5.25 5.25 0 0 1 0 10.5Z" fill="#ff6900" /></>}
    {k === 'dash' && <circle cx="6" cy="6" r="5.25" fill="none" stroke="#a1a1a1" strokeWidth="1.25" strokeDasharray="2.2 1.9" />}
    {k === 'sun' && <><circle cx="6" cy="6" r="5.25" fill="none" stroke="#00a6f4" strokeWidth="1.25" strokeDasharray="1.6 1.15" /><circle cx="6" cy="6" r="3.4" fill="#00a6f4" /></>}
  </svg>
}
function Btn({ x, w, children, dashed }: { x: number; w: number; children?: ReactNode; dashed?: boolean }) {
  return <Box x={x} y={100} w={w} h={28} style={dashed ? { border: '1px dashed #ececec', borderRadius: 8 } : { background: '#fff', borderRadius: 8, boxShadow: `${ring('#e9e9e9')}, 0 1px 1.5px rgba(0,0,0,.05)` }}>{children}</Box>
}

function Main() {
  return <>
    {/* header */}
    <Ic I={Building2} cx={347.5} cy={70} s={15} sw={1.25} />
    <Tx x={360.6} cap={65.3} c={C.sub}>Companies</Tx>
    <Tx x={439.8} cap={65.3} c={C.sub}>/</Tx>
    <Tx x={457.6} cap={65.6}>Database</Tx>
    <Box x={1432} y={56} w={74} h={28} style={{ background: C.chip, borderRadius: 8 }} />
    <Star cx={1447.5} cy={70} s={13} c={C.ink} sw={1.35} />
    <Tx x={1460.3} cap={65.6}>Ask AI</Tx>
    <Box x={320} y={89} w={1199} h={1} style={{ background: C.line }} />
    {/* toolbar */}
    <Btn x={334} w={129.5} />
    <Tx x={342} cap={109.5} fs={14} ls={-0.2}>All companies</Tx>
    <Ic I={ChevronDown} cx={452.5} cy={114} s={16} sw={1.4} c="#545353" />
    <Btn x={477} w={62} dashed />
    <Ic I={ArrowDownWideNarrow} cx={491.5} cy={114} s={15} sw={1.3} />
    <Tx x={504.5} cap={109.5} fs={14} ls={-0.2} c={C.sub}>Sort</Tx>
    <Btn x={553} w={74} dashed />
    <Ic I={SlidersHorizontal} cx={567.5} cy={113.75} s={13.5} sw={1.35} />
    <Tx x={580.3} cap={109.5} fs={14} ls={-0.2} c={C.sub}>Filters</Tx>
    <Btn x={1040} w={28}><Ic I={Search} cx={14} cy={14} s={15} sw={1.3} /></Btn>
    <Btn x={1080.5} w={159} />
    <Ic I={Columns3} cx={1094.5} cy={114} s={15} sw={1.3} />
    <Tx x={1108.6} cap={109.5} fs={14} ls={-0.35}>Column settings</Tx>
    <Ic I={ChevronDown} cx={1225.5} cy={114} s={16} sw={1.4} c="#545353" />
    <Btn x={1252.5} w={111} />
    <Box x={1260} y={106.5} w={15} h={15} style={{ background: '#161616', borderRadius: 4 }} />
    <Tx x={1280.4} cap={109.5} fs={14} ls={-0.35}>Add to Attio</Tx>
    <Box x={1375.5} y={99.5} w={131} h={29.5} style={{ background: 'linear-gradient(#2b2b2b, #1a1a1a)', borderRadius: 8, boxShadow: `${ring('#121212')}, inset 0 1px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.18)` }} />
    <Ic I={Plus} cx={1391} cy={114.25} s={15} sw={1.4} c="#fff" />
    <Tx x={1403} cap={109.5} fs={14} ls={-0.2} c="#fff">New Company</Tx>
    <Box x={320} y={137} w={1199} h={1} style={{ background: C.line }} />
    {/* table head */}
    <Box x={320} y={138} w={1199} h={35} style={{ background: C.thead }} />
    <Box x={339.5} y={150} w={12} h={12} style={{ background: '#fff', borderRadius: 4, boxShadow: ring('#e5e5e5', 0.75) }} />
    <Tx x={354.6} cap={150.9} fs={13} ls={-0.2} c={C.head}>Company</Tx>
    <Ic I={Plus} cx={540} cy={156} s={13} sw={1.3} c="#545353" />
    {[['Category', 572.6], ['Domains', 832.8], ['Annual Revenue', 1032.1], ['Total Funding', 1232.4], ['Founders', 1432.8]].map(([t, x]) =>
      <Tx key={t as string} x={x as number} cap={150.9} fs={13} ls={-0.2} c={C.head}>{t}</Tx>)}
    <Box x={320} y={173} w={1199} h={1} style={{ background: C.line }} />
    {COLS.map((x) => <Box key={x} x={x} y={138} w={1} h={573} style={{ background: C.line }} />)}
    {/* rows */}
    {ROWS.map(([name, logo, st, tag, dom, rev, fo], i) => {
      const top = ROW_TOP[i], h = ROW_H[i], cy = top + h / 2 + 0.5, [label, tc, tb] = TAG[tag]
      return <div key={name}>
        <Box x={339.5} y={cy - 6} w={12} h={12} style={{ background: '#fff', borderRadius: 4, boxShadow: ring('#e5e5e5', 0.75) }} />
        <Box x={356} y={cy - 6} w={12} h={12} style={{ borderRadius: 3, background: logo }} />
        <Tx x={374.6} cap={cy - 5.1} fs={14} ls={-0.2} style={{ textDecoration: 'underline', textDecorationColor: '#e5e5e5', textUnderlineOffset: 3.5 }}>{name}</Tx>
        <Status k={st} cx={539} cy={cy} />
        <Box x={572} y={cy - 11} w={undefined as unknown as number} h={22} style={{ width: 'auto', padding: '0 4.75px 0 6px', borderRadius: 6, background: '#fcfcfc', boxShadow: `inset ${ring(tb)}`, display: 'flex', alignItems: 'center', fontFamily: FONT, fontSize: 12, fontWeight: 500, letterSpacing: -0.25, color: tc, whiteSpace: 'pre' }}>{label}</Box>
        <Tx x={832.6} cap={cy - 5.1} fs={14} ls={-0.2} c={C.link} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{dom}</Tx>
        <Tx r={1206.7} cap={cy - 5.4} fs={14} ls={-0.3}>{rev}</Tx>
        <Tx r={1407.3} cap={cy - 5.0} fs={13} ls={-0.25}>{rev}</Tx>
        <Box x={1432} y={cy - 11} w={160} h={22} style={{ background: C.chip, borderRadius: 6 }} />
        <Box x={1439.5} y={cy - 7} w={14} h={14} style={{ borderRadius: 7, background: 'linear-gradient(#e7c3a8, #9b6952)' }} />
        <Tx x={1458.6} cap={cy - 4.1} fs={14} ls={-0.2} c="#545353">{fo}</Tx>
        <Box x={320} y={top + h} w={1199} h={1} style={{ background: C.line }} />
      </div>
    })}
    {/* footer */}
    <Box x={320} y={912} w={1199} h={1} style={{ background: C.line }} />
    <Box x={320} y={913} w={1199} h={36} style={{ background: C.foot }} />
    {[559, 1019, 1219, 1419].map((x) => <Box key={x} x={x} y={913} w={1} h={36} style={{ background: C.line }} />)}
    <Tx x={470} cap={924.6} fs={12} ls={-0.25} c={C.sub} style={{ textDecoration: 'underline', textDecorationColor: '#e5e5e5', textUnderlineOffset: 5 }}>14 Companies</Tx>
    <Tx r={1207} cap={924.4} fs={13} ls={-0.2} c={C.sub} style={{ textDecoration: 'underline', textDecorationColor: '#e5e5e5', textUnderlineOffset: 3.5 }}>$999,999,999</Tx>
    <Tx r={1407} cap={924.4} fs={13} ls={-0.2} c={C.sub} style={{ textDecoration: 'underline', textDecorationColor: '#e5e5e5', textUnderlineOffset: 3.5 }}>$999,999,999</Tx>
  </>
}

export default function RicoR1() {
  return <div className="rr" data-product style={{ width: 1600, height: 1000, position: 'relative', background: C.canvas, fontFamily: FONT, WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    <div style={{ position: 'absolute', left: 81, top: 51, width: 1438, height: 898, borderRadius: 9, boxShadow: ring(C.frame), background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: -81, top: -51, width: 1600, height: 1000 }}>
        <Sidebar />
        <Main />
      </div>
    </div>
  </div>
}
