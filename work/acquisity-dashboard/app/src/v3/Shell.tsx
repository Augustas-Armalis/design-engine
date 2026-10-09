// Shell (Attio/Rico): grey #fbfbfb sidebar on a hairline, 48px header, sentence-case groups, 32px rows, solid record-type tiles
// for data you own, outline icons for tools. Active = grey fill + ink text.
import { useState } from 'react'
import { motion } from 'motion/react'
import { Bot, ChevronDown, CheckSquare, Home, Inbox, PanelLeft, Search, Settings, Sparkles, Workflow, Globe, Mail, Plus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Btn, ICON } from './ui'

type Row = { label: string; icon?: LucideIcon; tile?: string; count?: number }
const TOP: Row[] = [{ label: 'Home', icon: Home }, { label: 'Inbox', icon: Inbox, count: 12 }, { label: 'Tasks', icon: CheckSquare, count: 8 }]
const GROUPS: { title: string; rows: Row[] }[] = [
  { title: 'Records', rows: [{ label: 'People', tile: '#266df0', count: 24 }, { label: 'Companies', tile: '#266df0', count: 16 }, { label: 'Deals', tile: '#fd9038', count: 11 }, { label: 'Campaigns', tile: '#0eb472', count: 4 }] },
  { title: 'Agents', rows: [{ label: 'AI SDR', icon: Bot }, { label: 'Cold email', icon: Mail }] },
  { title: 'Build', rows: [{ label: 'Workflows', icon: Workflow }, { label: 'Sites', icon: Globe }] },
]

function NavRow({ r, active, hover, onHover }: { r: Row; active?: boolean; hover: boolean; onHover: () => void }) {
  return (
    <a href="#" aria-current={active ? 'page' : undefined} onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover() }} className="relative flex h-8 items-center gap-2 rounded-[8px] px-2 leading-none">
      {(active || hover) && <motion.span layoutId={active ? undefined : 'nav-hover'} transition={{ type: 'spring', duration: 0.25, bounce: 0 }} className={`absolute inset-0 rounded-[8px] ${active ? 'bg-[#efeff1]' : 'bg-[var(--hover)]'}`} />}
      {r.tile ? <span className="relative grid size-4 place-items-center"><span className="size-3.5 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" style={{ background: r.tile }} /></span>
        : r.icon && <r.icon {...ICON} className={`relative shrink-0 ${active ? 'text-[var(--ink)]' : 'text-[var(--soft)]'}`} />}
      <span className={`relative flex-1 t14 ${active ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}`}>{r.label}</span>
      {r.count != null && <span className="tnum relative t12 text-[var(--soft)]">{r.count}</span>}
    </a>
  )
}

export function Sidebar() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <aside onMouseLeave={() => setHover(null)} className="flex h-screen w-[248px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--side)]" aria-label="Main navigation">
      <div className="flex h-12 items-center gap-2 px-3.5">
        <span className="grid size-6 place-items-center rounded-[7px] bg-[var(--ink)] text-[12px] font-[700] leading-none text-white">A</span>
        <span className="t16 text-[var(--ink)]">Acquisity</span><ChevronDown {...ICON} className="text-[var(--soft)]" />
        <button type="button" aria-label="Collapse sidebar" className="press ml-auto grid size-7 place-items-center rounded-[8px] text-[var(--soft)] hover:bg-[var(--hover)]"><PanelLeft {...ICON} /></button>
      </div>
      <div className="flex gap-1.5 px-3 pb-3">
        <Btn icon={Search} kbd="⌘K" className="flex-1 justify-start gap-2">Search</Btn>
        <Btn icon={Sparkles} label="Ask AI" />
      </div>
      <nav className="flex-1 overflow-y-auto px-2">
        <div className="space-y-0.5">{TOP.map((r) => <NavRow key={r.label} r={r} active={r.label === 'Home'} hover={hover === r.label} onHover={() => setHover(r.label)} />)}</div>
        {GROUPS.map((g) => (
          <div key={g.title} className="mt-5">
            <div className="flex h-7 items-center justify-between px-2 t13 text-[var(--soft)]">{g.title}<Plus size={14} strokeWidth={1.5} /></div>
            <div className="space-y-0.5">{g.rows.map((r) => <NavRow key={r.label} r={r} hover={hover === r.label} onHover={() => setHover(r.label)} />)}</div>
          </div>
        ))}
      </nav>
      <div className="border-t border-[var(--line)] p-3">
        <div className="flex items-center justify-between t13 text-[var(--sub)]"><span>Credits</span><span className="tnum">21,758 left</span></div>
        <div className="mt-2 flex h-2 gap-[2px]" role="img" aria-label="72% of credits left">{Array.from({ length: 30 }, (_, i) => <span key={i} className={`flex-1 rounded-[1px] ${i < 22 ? 'bg-[var(--blue)]' : 'bg-[var(--grid)]'}`} />)}</div>
        <div className="mt-3 flex items-center gap-2"><span className="grid size-6 place-items-center rounded-full bg-[#e5eeff] text-[10px] font-[600] text-[#183c81]">DW</span><span className="t14 flex-1 text-[var(--ink)]">Daniel Ward</span><Settings {...ICON} className="text-[var(--soft)]" /></div>
      </div>
    </aside>
  )
}
