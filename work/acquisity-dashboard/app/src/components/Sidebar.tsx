import { useState } from 'react'
import { motion } from 'motion/react'
import {
  RiArrowDownSLine, RiBuilding2Line, RiCalendarLine, RiChat3Line, RiCheckboxLine, RiCompass3Line, RiDashboard3Line, RiExpandUpDownLine,
  RiGlobalLine, RiGroupLine, RiHandCoinLine, RiMailSendLine, RiMegaphoneLine, RiPhoneLine, RiQuestionLine, RiSearch2Line, RiSettings2Line,
  RiSparkling2Line, RiSunLine, RiFlowChart, RiInbox2Line, RiAddLine,
} from '@remixicon/react'
import type { RemixiconComponentType } from '@remixicon/react'
import { Button } from '../ui'

type Item = { icon: RemixiconComponentType; label: string; count?: number }
const GROUPS: { title: string; items: Item[] }[] = [
  { title: 'CRM', items: [
    { icon: RiSunLine, label: 'My Day' }, { icon: RiChat3Line, label: 'Conversations', count: 3 }, { icon: RiHandCoinLine, label: 'Deals', count: 11 },
    { icon: RiGroupLine, label: 'People', count: 24 }, { icon: RiBuilding2Line, label: 'Companies', count: 16 }, { icon: RiCalendarLine, label: 'Meetings' },
    { icon: RiCheckboxLine, label: 'Tasks', count: 8 },
  ] },
  { title: 'Outreach', items: [
    { icon: RiMailSendLine, label: 'Cold Email Agent' }, { icon: RiInbox2Line, label: 'AI SDR Inbox', count: 12 }, { icon: RiPhoneLine, label: 'Sales Call Analyzer' },
  ] },
  { title: 'Build', items: [{ icon: RiFlowChart, label: 'Workflows' }, { icon: RiGlobalLine, label: 'Sites' }, { icon: RiMegaphoneLine, label: 'Ads' }] },
]

/** Nav item: 36px, radius 8, icon 20, label-sm; active = white surface + ring; hover pill slides between rows. */
function NavItem({ item, active, hovered, onHover }: { item: Item; active?: boolean; hovered: boolean; onHover: () => void }) {
  return (
    <a href="#" onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover() }} className="relative flex h-9 items-center gap-2 rounded-[8px] px-2 leading-none">
      {active && <span className="absolute inset-0 rounded-[8px] bg-white shadow-[var(--ring),var(--shadow-xs)]" />}
      {hovered && !active && <motion.span layoutId="side-hover" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} className="absolute inset-0 rounded-[8px] bg-[#f0f0f0]" />}
      <item.icon size={20} className={`relative shrink-0 ${active ? 'text-primary' : 'text-text-sub'}`} />
      <span className={`relative flex-1 label-sm leading-none ${active ? 'text-text-strong' : 'text-text-sub'}`}>{item.label}</span>
      {item.count != null && <span className="tnum relative label-xs leading-none text-text-soft">{item.count}</span>}
    </a>
  )
}

export default function Sidebar() {
  const [hover, setHover] = useState<string | null>(null)
  const used = 21758, total = 30000, ticks = 28, on = Math.round((used / total) * ticks)
  return (
    <aside onMouseLeave={() => setHover(null)} className="flex h-screen w-[272px] shrink-0 flex-col border-r border-stroke-soft bg-bg-weak" aria-label="Main navigation">
      {/* workspace switcher: 40px row, logo tile 32 r8 */}
      <div className="flex h-16 items-center gap-2.5 px-4">
        <span className="grid size-8 place-items-center rounded-[8px] bg-bg-strong text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"><RiCompass3Line size={18} /></span>
        <div className="min-w-0 flex-1 leading-none">
          <div className="label-sm text-text-strong">Ward Growth</div>
          <div className="mt-1 para-xs text-text-sub">Sample workspace</div>
        </div>
        <Button size="xs" variant="ghost" icon={RiExpandUpDownLine} label="Switch workspace" />
      </div>
      <div className="px-3">
        <button type="button" className="press flex h-9 w-full items-center gap-2 rounded-[8px] bg-white px-2.5 text-text-soft shadow-[var(--ring),var(--shadow-xs)]">
          <RiSearch2Line size={16} className="shrink-0" /><span className="flex-1 text-left para-sm leading-none">Search</span>
          <kbd className="flex h-5 items-center rounded-[4px] bg-bg-weak px-1.5 font-sans label-xs leading-none text-text-sub shadow-[var(--ring)]">⌘K</kbd>
        </button>
      </div>

      <nav className="mt-3 flex-1 overflow-y-auto px-3 pb-6 [mask-image:linear-gradient(to_bottom,#000_calc(100%-40px),transparent)]">
        <NavItem item={{ icon: RiDashboard3Line, label: 'Dashboard' }} active hovered={false} onHover={() => setHover(null)} />
        <NavItem item={{ icon: RiSparkling2Line, label: 'Ask Acquisity' }} hovered={hover === 'ask'} onHover={() => setHover('ask')} />
        {GROUPS.map((g) => (
          <div key={g.title} className="mt-4">
            <button type="button" className="flex h-6 w-full items-center gap-1 px-2 text-text-soft"><span className="sub-xs">{g.title}</span><RiArrowDownSLine size={16} /></button>
            <div className="mt-1 space-y-0.5">
              {g.items.map((it) => <NavItem key={it.label} item={it} hovered={hover === it.label} onHover={() => setHover(it.label)} />)}
            </div>
          </div>
        ))}
      </nav>

      {/* credits: segmented tick meter (heyrico), one action */}
      <div className="mx-3 rounded-[12px] bg-white p-3 shadow-[var(--ring),var(--shadow-xs)]">
        <div className="flex items-center leading-none"><span className="label-sm text-text-strong">Credits</span><span className="tnum ml-auto para-xs text-text-sub">21,758 of 30,000</span></div>
        <div role="img" className="mt-3 flex h-4 items-end gap-[3px]" aria-label="72% of credits left">
          {Array.from({ length: ticks }, (_, i) => <span key={i} className={`h-full flex-1 rounded-[2px] ${i < on ? 'bg-primary' : 'bg-bg-soft'}`} />)}
        </div>
        <Button size="sm" variant="stroke" icon={RiAddLine} className="mt-3 w-full">Add credits</Button>
      </div>

      <div className="space-y-0.5 px-3 pt-2">
        <NavItem item={{ icon: RiQuestionLine, label: 'Help Center' }} hovered={hover === 'help'} onHover={() => setHover('help')} />
        <NavItem item={{ icon: RiSettings2Line, label: 'Settings' }} hovered={hover === 'set'} onHover={() => setHover('set')} />
      </div>
      <div className="mt-2 flex h-[68px] items-center gap-3 border-t border-stroke-soft px-4">
        <span className="grid size-9 place-items-center rounded-full bg-[#c2d6ff] label-sm text-[#122368]">DW</span>
        <div className="min-w-0 flex-1 leading-none"><div className="label-sm text-text-strong">Daniel Ward</div><div className="mt-1 truncate para-xs text-text-sub">daniel@wardgrowth.example</div></div>
        <Button size="xs" variant="ghost" icon={RiExpandUpDownLine} label="Account" />
      </div>
    </aside>
  )
}
