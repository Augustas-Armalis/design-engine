// Replica study (never published): Tanjim / gr8r studio "Tasks" kanban post (X 2074140966265725057, 1600x1200 @2x).
// Measured with tools/probe.mjs; colours, rings and the warm-neutral surface ladder follow his gr8r-studio tokens.css
// (--text #1d1c1a, --bg-side #f4f3f0, --surface #fff, --border #e9e7e2, --border-strong #dad7d0).
// The POST is set in Manrope 400 (solved from 13 line widths: every string lands on an integer size, spread < 0.2px),
// while his open-source app uses Geist. Every element is placed absolutely at its measured position (CSS px).
// Avatars are our own neutral line-face placeholders, not traces of his illustrations.
import '@fontsource-variable/manrope/wght.css'
import type { CSSProperties, ReactNode } from 'react'
import {
  House, ClipboardList, CalendarDays, UsersRound, NotepadText, Bot, ChartColumnBig, ChevronUp, ChevronDown, Plus,
  Settings, Workflow, Search, ArrowLeftToLine, Ellipsis, CircleDashed, type LucideIcon,
} from 'lucide-react'

const C = {
  canvas: '#f5f5f5', frame: '#f3f2f0', panel: '#ffffff', ink: '#1d1c1a', sub: '#5a5e5d', mute: '#7f7e7c',
  ring: '#cccbc9', panelRing: '#d5d4d2', ctrlRing: '#cdcdcd', divider: '#dedddb', well: '#fafaf8', wellRing: '#f2f2f0',
  card: '#e7e7e5', hair: '#e6e6e6', chipBg: '#f8f8f6', chipRing: '#e4e4e2', soft: '#f7f7f6',
}
// 0.5px hairlines as outset box-shadow rings: Chrome snaps sub-pixel border widths to a whole CSS px, spreads are not snapped
const ring = (c: string) => `0 0 0 .5px ${c}`
const FONT = '"Manrope Variable", Manrope, ui-sans-serif, system-ui, sans-serif'

// Manrope metrics: ascent 1.07, descent .30, cap .72  ->  box top for a given cap top
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.335 * fs

function Tx({ x, cap, fs, c = C.ink, lh, w = 400, children, style }: { x: number; cap: number; fs: number; c?: string; lh?: number; w?: number; children: ReactNode; style?: CSSProperties }) {
  const L = lh ?? Math.round(fs * 1.4)
  return <div style={{ position: 'absolute', left: x, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, whiteSpace: 'pre', ...style }}>{children}</div>
}
function Ic({ I, cx, cy, s = 18, sw = 1.6, c = C.sub }: { I: LucideIcon; cx: number; cy: number; s?: number; sw?: number; c?: string }) {
  return <I size={s} strokeWidth={sw} color={c} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} />
}
function Svg({ cx, cy, s, children, c = C.sub, sw = 1.2 }: { cx: number; cy: number; s: number; children: ReactNode; c?: string; sw?: number }) {
  return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }}>{children}</svg>
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>

/* ---------- sidebar ---------- */
const NAV: [LucideIcon, string, number][] = [[House, 'Home', 277], [ClipboardList, 'Tasks', 315], [CalendarDays, 'Calendar', 353], [UsersRound, 'Team', 391], [NotepadText, 'Docs', 429], [Bot, 'Automations', 467], [ChartColumnBig, 'Reporting', 505]]
const PROJECTS: [string, string, number][] = [['#7fcf21', 'Atlas CRM Revamp', 613], ['#f6732c', 'Nimbus Dashboard', 651], ['#3188e7', 'Orion API Gateway', 689], ['#f64e6f', 'Helio Task System', 727]]

function ProjectGlyph({ i, cx, cy }: { i: number; cx: number; cy: number }) {
  const g = [
    <><circle cx="9.5" cy="9.5" r="4.6" /><path d="M9.5 4.9a4.6 4.6 0 0 1 4.6 4.6" stroke="#7fcf21" strokeWidth="2.4" /></>,
    <><circle cx="9.5" cy="9.5" r="5" /><path d="M9.5 6.2 10.5 8.5 12.8 9.5 10.5 10.5 9.5 12.8 8.5 10.5 6.2 9.5 8.5 8.5Z" fill="#fff" stroke="none" /></>,
    <><circle cx="9.5" cy="9.5" r="5" /><path d="m6.2 6.2 6.6 6.6" /></>,
    <><circle cx="9.5" cy="7.4" r="2.2" /><circle cx="9.5" cy="11.6" r="2.2" /><circle cx="7.4" cy="9.5" r="2.2" /><circle cx="11.6" cy="9.5" r="2.2" /></>,
  ][i]
  return <svg width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="#fff" strokeWidth="1.6" style={{ position: 'absolute', left: cx - 9.5, top: cy - 9.5 }}>{g}</svg>
}

function GroupHead({ label, cy, open = true, dim = false }: { label: string; cy: number; open?: boolean; dim?: boolean }) {
  return <>
    <Ic I={open ? ChevronUp : ChevronDown} cx={105} cy={cy} s={18} sw={1.45} c={dim ? C.sub : C.ink} />
    <Tx x={126} cap={cy - 4.7} fs={13} c={dim ? C.sub : C.ink}>{label}</Tx>
    <Ic I={Plus} cx={288.75} cy={cy - 0.25} s={19.5} sw={1.3} c={C.sub} />
    <Svg cx={318.75} cy={cy - 0.25} s={12} sw={0} c={C.sub}>{[[3.3, 1.6], [8.7, 1.6], [3.3, 6], [8.7, 6], [3.3, 10.4], [8.7, 10.4]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={1.15} fill={C.sub} />)}</Svg>
  </>
}
const Divider = ({ y }: { y: number }) => <Box x={96} y={y} w={232} h={0.5} style={{ background: C.divider }} />
const NavRow = ({ icon, label, cy, active = false }: { icon: ReactNode; label: string; cy: number; active?: boolean }) => <>
  {icon}
  <Tx x={130} cap={cy - 5} fs={14} c={active ? C.ink : C.sub}>{label}</Tx>
</>

function Sidebar() {
  return <>
    {/* workspace card */}
    <Box x={96} y={104} w={232} h={48} style={{ background: '#fff', boxShadow: ring(C.ring), borderRadius: 8 }} />
    <Box x={104} y={112} w={32} h={32} style={{ background: '#1e1f21', borderRadius: 8 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ position: 'absolute', inset: 0 }}><circle cx="16" cy="16" r="9" fill="#fff" />{[[16, 11.6], [20.4, 16], [16, 20.4], [11.6, 16]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="2.3" fill="#1e1f21" />)}</svg>
    </Box>
    <Tx x={144} cap={115.7} fs={13}>Courtney Henry</Tx>
    <Tx x={144} cap={134.6} fs={10} c={C.sub}>The Walt Disney Company</Tx>
    <Ic I={ArrowLeftToLine} cx={309.75} cy={127.75} s={18} sw={1.4} c={C.sub} />

    {/* search */}
    <Box x={96} y={176} w={232} h={34} style={{ background: '#e7e6e4', boxShadow: ring('#d2d1cf'), borderRadius: 8 }} />
    <Ic I={Search} cx={112.75} cy={192.75} s={18} sw={1.4} c={C.sub} />
    <Tx x={130} cap={188.7} fs={14} c={C.sub}>Search</Tx>
    <Tx x={297} cap={188.1} fs={14} c="#868583">⌘ F</Tx>

    <Tx x={96} cap={235.5} fs={13}>Essentials</Tx>
    <Box x={96} y={298} w={232} h={34} style={{ background: '#fff', boxShadow: ring(C.ring), borderRadius: 8 }} />
    {NAV.map(([I, l, cy]) => <NavRow key={l} label={l} cy={cy} active={l === 'Tasks'} icon={<Ic I={I} cx={112.75} cy={cy - 0.25} s={18} sw={1.5} c={C.sub} />} />)}

    <Divider y={543.25} />
    <GroupHead label="Projects" cy={575.2} />
    {PROJECTS.map(([col, l, cy], i) => <div key={l}>
      <Box x={103.25} y={cy - 9.5} w={19} h={19} style={{ background: col, borderRadius: 5 }} />
      <ProjectGlyph i={i} cx={112.75} cy={cy} />
      <Tx x={130.2} cap={cy - 4.3} fs={14} c={C.sub}>{l}</Tx>
    </div>)}
    <Divider y={765.25} />
    <GroupHead label="Management" cy={797.2} open={false} dim />
    <Divider y={827.25} />
    <GroupHead label="Support" cy={859.2} />
    <NavRow label="Settings" cy={897} icon={<Ic I={Settings} cx={112.75} cy={897} s={18} sw={1.5} />} />
    <NavRow label="Releases" cy={935} icon={<Ic I={Workflow} cx={112.75} cy={935} s={18} sw={1.5} />} />
    <Divider y={973.25} />
    <GroupHead label="Apps" cy={1005.2} />
    <NavRow label="Trello" cy={1043} icon={<Svg cx={112.75} cy={1043} s={18} sw={1.35}><rect x="2.5" y="2.5" width="13" height="13" rx="3.5" /><rect x="5.3" y="5.3" width="2.8" height="7" rx="1" /><rect x="10" y="5.3" width="2.8" height="4.2" rx="1" /></Svg>} />
    <NavRow label="Figma" cy={1081} icon={<Svg cx={112.75} cy={1081} s={18} sw={1.35}><path d="M9 2.5H6.6a2.2 2.2 0 0 0 0 4.4H9Zm0 0h2.4a2.2 2.2 0 0 1 0 4.4H9Zm0 4.4H6.6a2.2 2.2 0 0 0 0 4.4H9Zm0 0a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 0 0-4.4 0Zm0 4.4H6.6a2.2 2.2 0 1 0 2.4 2.2Z" /></Svg>} />
  </>
}

/* ---------- avatars: neutral line faces (ours) ---------- */
function Face({ v }: { v: number }) {
  const hair = [
    <path d="M4.2 11c-.6-4.6 1.6-7.4 5.8-7.4 3.6 0 5.6 2.2 5.8 5.2-2.6.2-5-1-6.2-2.6-1 2-2.8 3.6-5.4 4.8Z" fill="#111" />,
    <path d="M5 8.6C5.4 5.4 7.4 4 10 4s4.6 1.4 5 4.6c-1.6-.8-3.2-1.6-5-1.6s-3.4.8-5 1.6Z" fill="#111" />,
    <path d="M3.6 12.4C2.4 6.6 5.6 3.4 10 3.4s7.6 3.2 6.4 9c-.8-.8-1-2.6-1.2-4-2.2.2-4.6-.6-5.6-2-1.2 1.6-3.4 2.4-4.6 2.2-.2 1.6-.6 3-1.4 3.8Z" fill="#111" />,
  ][v % 3]
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1a1a1a" strokeWidth=".8" strokeLinecap="round">
    <circle cx="10" cy="10" r="9.6" fill="#fff" stroke="#e2e2e0" strokeWidth=".6" />
    <path d="M6 9.2c0 3.2 1.8 5.2 4 5.2s4-2 4-5.2" />
    {hair}
    {v % 2 === 1 ? <><circle cx="8.1" cy="10" r="1.3" /><circle cx="11.9" cy="10" r="1.3" /><path d="M9.4 10h1.2" /></> : <><path d="M7.6 10.2h.9M11.5 10.2h.9" /></>}
    <path d="M8.8 12.6c.7.4 1.5.4 2.2 0" />
    <path d="M6.6 15.6c-1 .6-1.8 1.4-2.4 2.4M13.4 15.6c1 .6 1.8 1.4 2.4 2.4" />
  </svg>
}
function Avatars({ x, y, n, more }: { x: number; y: number; n: number; more?: string }) {
  const w = 8 + 20 + (n - 1) * 14.6 + (more ? 23 : 0)
  return <Box x={x} y={y} w={w} h={28} style={{ background: C.soft, borderRadius: 14, boxShadow: 'inset 0 0 0 .5px #ebebe9' }}>
    {Array.from({ length: n }, (_, k) => <div key={k} style={{ position: 'absolute', left: 3.5 + k * 14.6, top: 4, width: 20, height: 20 }}><Face v={k} /></div>)}
    {more && <div style={{ position: 'absolute', left: 3.5 + (n - 1) * 14.6 + 23, top: 4, width: 20, height: 20, borderRadius: 10, background: '#e8e7e3', fontSize: 8, lineHeight: '20px', textAlign: 'center', color: C.sub }}>{more}</div>}
  </Box>
}

/* ---------- card ---------- */
type Card = { pri: 'High' | 'Medium' | 'Low'; tags: string[]; title: string; desc: string; av: number; more?: string; date: string; com: string; att: string }
const PRI = { High: { bg: '#fff1f1', ring: '#f1d9da', c: '#c8385a' }, Medium: { bg: '#fffbe8', ring: '#efe6c6', c: '#cf7c10' }, Low: { bg: '#fff1fe', ring: '#efd8ee', c: '#d24bd0' } }

function Pill({ x, y, h, children, style }: { x: number; y: number; h: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', left: x, top: y, height: h, display: 'flex', alignItems: 'center', boxSizing: 'border-box', borderRadius: 999, whiteSpace: 'pre', ...style }}>{children}</div>
}

function KCard({ x, y, d }: { x: number; y: number; d: Card }) {
  const p = PRI[d.pri]
  const lines = d.title.split('\n').length
  return <Box x={x} y={y} w={257} h={244} style={{ background: '#fff', border: `1px solid ${C.card}`, borderRadius: 7, boxShadow: '0 1px 2px rgba(28,25,20,.04)' }}>
    <div style={{ position: 'absolute', left: -1, top: -1, width: 257, height: 244 }}>
      <Pill x={12.5} y={14.25} h={20} style={{ background: p.bg, boxShadow: `inset 0 0 0 .5px ${p.ring}`, padding: '0 6px', fontSize: 10, color: p.c }}>{d.pri}</Pill>
      <Ic I={Ellipsis} cx={231.75} cy={23.75} s={20} sw={1.5} c={C.ink} />
      <div style={{ position: 'absolute', left: 12.5, top: 44.25, display: 'flex', gap: 4.5 }}>
        {d.tags.map((t) => <Pill key={t} x={0} y={0} h={20} style={{ position: 'relative', background: C.chipBg, boxShadow: `inset 0 0 0 .5px ${C.chipRing}`, padding: '0 6.25px', fontSize: 10, color: C.sub }}>{t}</Pill>)}
      </div>
      <Tx x={13} cap={85} fs={16} lh={20}>{d.title}</Tx>
      <Tx x={13.5} cap={85 + 20 * (lines - 1) + 23.6} fs={10} lh={12} c={C.sub}>{d.desc}</Tx>
      <Box x={0} y={157.5} w={257} h={0.5} style={{ background: C.hair }} />
      <Avatars x={12.5} y={165.5} n={d.av} more={d.more} />
      <Ic I={Plus} cx={235.75} cy={179.75} s={16} sw={1.3} c={C.sub} />
      <Box x={0} y={201.5} w={257} h={0.5} style={{ background: C.hair }} />
      <Pill x={12.5} y={209.5} h={26.5} style={{ background: C.soft, padding: '0 7px 0 8px', fontSize: 12, color: C.sub, gap: 8 }}>
        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke={C.sub} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12.4V.9" /><path d="M1 1.4c3.4.3 6.4 1.6 8.8 3.4C7.4 6.6 4.4 7.9 1 8.3" /></svg>
        <span style={{ marginLeft: 0.5, position: 'relative', top: 1 }}>{d.date}</span>
      </Pill>
      <div style={{ position: 'absolute', right: 11.75, top: 209.5, display: 'flex', gap: 6.25 }}>
        <Pill x={0} y={0} h={26.5} style={{ position: 'relative', background: C.soft, padding: '0 6.75px 0 6px', fontSize: 12, color: C.sub, gap: 6 }}>
          <svg width="14" height="15" viewBox="0 0 13 14" fill="none" stroke={C.sub} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"><path d="M4.4 10.3A5 5 0 1 1 10.9 5.6" /><path d="M4.4 10.3 1.2 11.3l.9-2.6" /><circle cx="9.1" cy="9.9" r="3" /><path d="m11.3 12 .9 1.2" /></svg>
          <span style={{ position: 'relative', top: 1 }}>{d.com}</span>
        </Pill>
        <Pill x={0} y={0} h={26.5} style={{ position: 'relative', background: C.soft, padding: '0 6.75px 0 8.5px', fontSize: 12, color: C.sub, gap: 6.5 }}>
          <svg width="12" height="13.5" viewBox="0 0 11 13" fill="none" stroke={C.sub} strokeWidth="1.1" strokeLinecap="round"><path d="M7.4 4.4v4.4a1.9 1.9 0 0 1-3.8 0V3.4a2.9 2.9 0 0 1 5.8 0v5.8a3.9 3.9 0 0 1-7.8 0V4.6" /></svg>
          <span style={{ position: 'relative', top: 1 }}>{d.att}</span>
        </Pill>
      </div>
    </div>
  </Box>
}

const COLS: { name: string; count: string; cards: Card[] }[] = [
  { name: 'To Do', count: '12 cards', cards: [
    { pri: 'High', tags: ['UI design', 'Interaction'], title: 'Implement drag-and-drop for\ntask cards', desc: 'Enable intuitive drag-and-drop interaction\nbetween Kanban columns using a smooth.', av: 4, more: '+2', date: 'July 2', com: '45', att: '+2' },
    { pri: 'Medium', tags: ['QA', 'Audit'], title: 'Write unit tests for task filters', desc: 'Ensure task filtering logic works correctly across\nstatus, tags, and assignee combinations.', av: 2, date: 'July 5', com: '12', att: '+14' },
    { pri: 'Low', tags: ['UI design', 'Aesthetics'], title: 'Add loading skeletons to task\nview', desc: 'Display animated placeholders while task data is\nloading to improve perceived performance.', av: 3, date: 'July 8', com: '9', att: '+1' },
  ] },
  { name: 'In Progress', count: '1 cards', cards: [
    { pri: 'Medium', tags: ['UI design', 'Interaction'], title: 'Build column reorder\nfunctionality', desc: 'Allow users to drag and rearrange Kanban\ncolumns to customize their workflow layout', av: 3, date: 'July 14', com: '45', att: '+2' },
  ] },
  { name: 'In Review', count: '2 cards', cards: [
    { pri: 'Low', tags: ['Design System', 'Docs'], title: 'Refactor task card component\nfor modularity', desc: 'Break down the task card into smaller, reusable\ncomponents to improve maintainability and\nscalability', av: 1, date: 'July 2', com: '5', att: '+3' },
    { pri: 'Medium', tags: ['Backend', 'Tech'], title: 'Document API endpoints for\ntask CRUD operations', desc: 'Create clear and structured documentation for all\ntask-related Create, Read, Update, and Delete API\n...', av: 2, date: 'July 5', com: '34', att: '+1' },
  ] },
  { name: 'Done', count: '1 cards', cards: [
    { pri: 'High', tags: ['Research', 'Audit'], title: 'Create initial column layout (To\nDo, In Progress, Done)', desc: 'Set up the default Kanban structure with\npredefined columns to support basic task\nworkflow.', av: 4, more: '+2', date: 'July 2', com: '45', att: '+2' },
  ] },
]

function Column({ i }: { i: number }) {
  const col = COLS[i], x = 360 + i * 286
  return <>
    <Box x={x} y={279} w={271} h={800.5} style={{ background: C.well, border: `1px solid ${C.wellRing}`, borderRadius: 12, overflow: 'hidden' }}>
      {/* well content origin is (x+1, 280): cards sit at page x+7, y 387 + 252k */}
      {col.cards.map((d, k) => <KCard key={k} x={6} y={107 + k * 252} d={d} />)}
    </Box>
    <Tx x={x + 7.8} cap={299.6} fs={16}>{col.name}</Tx>
    <Tx x={x + 7.8} cap={321.2} fs={12} c={C.sub}>{col.count}</Tx>
    <Ic I={Ellipsis} cx={x + 250.75} cy={306.75} s={20} sw={2} c={C.ink} />
    <Box x={x + 8} y={345} w={255} h={30} style={{ background: '#f6f6f4', boxShadow: ring(C.chipRing), borderRadius: 6 }} />
    <Ic I={Plus} cx={x + 132} cy={360} s={19} sw={1.2} c={C.sub} />
  </>
}

const ctrl: CSSProperties = { background: '#fff', borderRadius: 8, boxShadow: `${ring(C.ctrlRing)}, 0 1px 1px rgba(28,25,20,.03)` }

export default function TanjimKanban() {
  return <div className="tk" style={{ position: 'relative', width: 1600, height: 1200, background: C.canvas, fontFamily: FONT, color: C.ink, overflow: 'hidden', WebkitFontSmoothing: 'antialiased', fontFeatureSettings: 'normal' }}>
    <style>{'.tk, .tk *{corner-shape: round}'}</style>
    <Box x={80} y={88} w={1440} h={1024} style={{ background: C.frame, borderRadius: 16 }} />
    <Sidebar />
    {/* main panel */}
    <Box x={344} y={104} w={1160} h={992} style={{ background: C.panel, boxShadow: ring(C.panelRing), borderRadius: 8 }} />
    <Tx x={359.8} cap={124.5} fs={16} c={C.sub}>Tasks</Tx>
    <Tx x={360} cap={163} fs={40} lh={48} style={{ letterSpacing: 0 }}>Tasks</Tx>

    {/* toolbar */}
    <Box x={979} y={166} w={231} h={34} style={ctrl} />
    <Ic I={Search} cx={995.75} cy={182.75} s={18} sw={1.4} c={C.ink} />
    <Tx x={1013} cap={178.7} fs={14} c={C.sub}>Search</Tx>
    <Tx x={1179.3} cap={178.1} fs={14} c="#868583">⌘ F</Tx>
    <Box x={1218} y={166} w={108} h={34} style={ctrl} />
    <Tx x={1226} cap={178.7} fs={14} c={C.sub}>Status: <span style={{ color: C.ink }}>All</span></Tx>
    <Ic I={ChevronDown} cx={1308.75} cy={182.75} s={18} sw={1.45} c={C.ink} />
    <Box x={1334} y={166} w={70} h={34} style={ctrl} />
    <Svg cx={1349.5} cy={182.75} s={16} c={C.ink} sw={1.25}><path d="M2.2 1.4h11.6M2.2 6h7M2.2 10.6h4.2M12 6.2v8.4M9.8 12.6l2.2 2 2.2-2" /></Svg>
    <Tx x={1368} cap={178.7} fs={14} c={C.sub}>Sort</Tx>
    <Box x={1412} y={166} w={34} h={34} style={ctrl} />
    <Svg cx={1428.75} cy={182.75} s={18} c={C.ink} sw={1.3}><rect x="1.5" y="1.5" width="15" height="15" rx="4" /><rect x="5" y="5" width="3" height="7.6" rx="1" /><rect x="10" y="5" width="3" height="4.6" rx="1" /></Svg>
    <Box x={1454} y={166} w={34} h={34} style={ctrl} />
    <Ic I={CircleDashed} cx={1470.75} cy={182.75} s={18} sw={1.4} c={C.ink} />

    {/* tabs */}
    {([['Overview', 360.1], ['Lists', 440.4], ['Board', 491], ['Timeline', 548.9], ['Files', 624]] as const).map(([t, x]) => <Tx key={t} x={x} cap={233.8} fs={14} c={t === 'Board' ? C.ink : C.sub}>{t}</Tx>)}
    <Box x={360} y={262} w={1129} h={1} style={{ background: '#e6e6e4' }} />
    <Box x={476} y={262} w={50} h={1} style={{ background: '#1b1b1b' }} />

    {[0, 1, 2, 3].map((i) => <Column key={i} i={i} />)}
  </div>
}
