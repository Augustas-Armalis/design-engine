// Sidebar (Attio grammar): #fbfbfb on a hairline; workspace switcher in a 48px header; quick actions; workspace pages with one
// refined outline icon family (Phosphor regular, 16px); records as solid colour tiles with white filled glyphs; favourites,
// lists and agents as their own groups; sentence-case group headers with a hover "+". Active = grey fill + ink, icon goes fill.
import { useState } from 'react'
import { motion } from 'motion/react'
import {
  House, Tray, CheckSquare, NotePencil, PhoneCall, ChartBar, Lightning, Gear, Question, UserPlus, Users, Buildings, Handshake,
  PaperPlaneTilt, Robot, EnvelopeSimple, Star, MagnifyingGlass, Sparkle, SidebarSimple, CaretDown, Plus, Sailboat, Hash, Waveform,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

type Row = { label: string; icon?: Icon; tile?: string; glyph?: Icon; count?: number; dot?: string }
const PAGES: Row[] = [
  { label: 'Home', icon: House }, { label: 'Inbox', icon: Tray, count: 12 }, { label: 'Tasks', icon: CheckSquare, count: 8 },
  { label: 'Notes', icon: NotePencil }, { label: 'Calls', icon: PhoneCall }, { label: 'Reports', icon: ChartBar }, { label: 'Automations', icon: Lightning },
]
const GROUPS: { title: string; rows: Row[] }[] = [
  { title: 'Favorites', rows: [{ label: 'Hot replies this week', icon: Star }, { label: 'Q4 pipeline', icon: Hash }] },
  { title: 'Records', rows: [
    { label: 'People', tile: '#266df0', glyph: Users, count: 24 }, { label: 'Companies', tile: '#5b5fe6', glyph: Buildings, count: 16 },
    { label: 'Deals', tile: '#ea7a1f', glyph: Handshake, count: 11 }, { label: 'Campaigns', tile: '#0f9d6b', glyph: PaperPlaneTilt, count: 4 },
  ] },
  { title: 'Lists', rows: [{ label: 'Logistics ICP', dot: '#0f9d6b' }, { label: 'UK recruiters', dot: '#266df0' }, { label: 'Accounting founders', dot: '#8b5cf6' }] },
  { title: 'Agents', rows: [{ label: 'AI SDR', icon: Robot }, { label: 'Cold email', icon: EnvelopeSimple }, { label: 'Call analyzer', icon: Waveform }] },
]

function NavRow({ r, active, hover, onHover }: { r: Row; active?: boolean; hover: boolean; onHover: () => void }) {
  return (
    <a href="#" aria-current={active ? 'page' : undefined} onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover() }}
      className="relative flex h-7 items-center gap-2 rounded-[7px] px-2 leading-none">
      {active && <span className="absolute inset-0 rounded-[7px] bg-[#efeff1]" />}
      {hover && !active && <motion.span layoutId="nav-hover" transition={{ type: 'spring', duration: 0.25, bounce: 0 }} className="absolute inset-0 rounded-[7px] bg-[var(--hover)]" />}
      <span className="relative grid size-4 shrink-0 place-items-center">
        {r.tile && r.glyph ? <span className="grid size-4 place-items-center rounded-[4.5px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" style={{ background: r.tile }}><r.glyph size={10} weight="fill" color="#fff" /></span>
          : r.dot ? <span className="size-2 rounded-[2.5px]" style={{ background: r.dot }} />
          : r.icon && <r.icon size={16} weight={active ? 'fill' : 'regular'} className={active ? 'text-[var(--ink)]' : 'text-[#7c7f85]'} />}
      </span>
      <span className={`relative flex-1 truncate t14 ${active ? 'text-[var(--ink)]' : 'text-[#45474c]'}`}>{r.label}</span>
      {r.count != null && <span className="tnum relative t12 text-[var(--soft)]">{r.count}</span>}
    </a>
  )
}

export function Sidebar() {
  const [hover, setHover] = useState<string | null>(null)
  const row = (r: Row, active = false) => <NavRow key={r.label} r={r} active={active} hover={hover === r.label} onHover={() => setHover(r.label)} />
  return (
    <aside onMouseLeave={() => setHover(null)} className="flex h-full w-[248px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--side)]" aria-label="Main navigation">
      <div className="flex h-12 shrink-0 items-center gap-2 px-3">
        <button type="button" className="press -ml-1 flex h-8 items-center gap-2 rounded-[8px] pl-1 pr-1.5 hover:bg-[var(--hover)]">
          <span className="grid size-6 place-items-center rounded-[7px] bg-[linear-gradient(180deg,#2f7bff,#1d5fe0)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(29,95,224,0.35)]"><Sailboat size={14} weight="fill" /></span>
          <span className="t14 font-[600] text-[var(--ink)]">Ferry</span><CaretDown size={12} weight="bold" className="text-[var(--soft)]" />
        </button>
        <button type="button" aria-label="Collapse sidebar" className="press ml-auto grid size-7 place-items-center rounded-[7px] text-[#7c7f85] hover:bg-[var(--hover)]"><SidebarSimple size={16} /></button>
      </div>
      <div className="flex shrink-0 gap-1.5 px-3 pb-3">
        <button type="button" className="btn-white press flex h-7 flex-1 items-center gap-2 rounded-[8px] px-2 t14 leading-none text-[var(--sub)]">
          <MagnifyingGlass size={15} className="text-[#7c7f85]" />Search<kbd className="ml-auto flex h-[18px] items-center rounded-[5px] px-1 font-sans text-[11px] leading-none text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--grid)]">⌘K</kbd>
        </button>
        <button type="button" aria-label="Ask AI" className="btn-white press grid size-7 place-items-center rounded-[8px] text-[var(--blue)]"><Sparkle size={15} weight="fill" /></button>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-6 [mask-image:linear-gradient(to_bottom,#000_calc(100%-28px),transparent)]">
        <div className="space-y-px">{PAGES.map((r) => row(r, r.label === 'Home'))}</div>
        {GROUPS.map((g) => (
          <div key={g.title} className="group/g mt-3.5">
            <div className="flex h-6 items-center justify-between px-2 t12 text-[var(--soft)]">{g.title}<Plus size={12} weight="bold" className="opacity-0 transition-opacity group-hover/g:opacity-100" /></div>
            <div className="space-y-px">{g.rows.map((r) => row(r))}</div>
          </div>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-1 border-t border-[var(--line)] px-3 py-2.5">
        <span className="mr-1 grid size-6 shrink-0 place-items-center rounded-full bg-[#e5eeff] text-[10px] font-[600] text-[#183c81]">DW</span>
        <div className="min-w-0 flex-1 leading-none"><div className="t13 text-[var(--ink)]">Daniel Ward</div><div className="mt-1 truncate t12 font-[400] text-[var(--soft)]">Ward Growth</div></div>
        <button type="button" aria-label="Invite teammates" className="press grid size-7 place-items-center rounded-[7px] text-[#7c7f85] hover:bg-[var(--hover)]"><UserPlus size={16} /></button>
        <button type="button" aria-label="Help and docs" className="press grid size-7 place-items-center rounded-[7px] text-[#7c7f85] hover:bg-[var(--hover)]"><Question size={16} /></button>
        <button type="button" aria-label="Settings" className="press grid size-7 place-items-center rounded-[7px] text-[#7c7f85] hover:bg-[var(--hover)]"><Gear size={16} /></button>
      </div>
    </aside>
  )
}
