// Sidebar in the AlignUI template grammar: white, 272px, uppercase section labels, 36px rows on a 40px pitch,
// active row = soft grey fill + chevron + accent bar on the outer edge. Icons 20, stroke grey; counts as quiet tabular text.
import { useState } from 'react'
import { motion } from 'motion/react'
import {
  RiArrowRightSLine, RiBuilding2Line, RiCalendarLine, RiChat3Line, RiCheckboxLine, RiDashboard3Line, RiExpandUpDownLine,
  RiGlobalLine, RiGroupLine, RiHandCoinLine, RiMailSendLine, RiMegaphoneLine, RiPhoneLine, RiQuestionLine, RiSettings2Line,
  RiSparkling2Line, RiSunLine, RiFlowChart, RiInbox2Line,
} from '@remixicon/react'
import type { RemixiconComponentType } from '@remixicon/react'

type Item = { icon: RemixiconComponentType; label: string; count?: number }
const GROUPS: { title: string; items: Item[] }[] = [
  { title: 'Main', items: [{ icon: RiDashboard3Line, label: 'Dashboard' }, { icon: RiSunLine, label: 'My Day' }, { icon: RiSparkling2Line, label: 'Ask Acquisity' }] },
  { title: 'CRM', items: [
    { icon: RiChat3Line, label: 'Conversations', count: 3 }, { icon: RiHandCoinLine, label: 'Deals', count: 11 }, { icon: RiGroupLine, label: 'People', count: 24 },
    { icon: RiBuilding2Line, label: 'Companies', count: 16 }, { icon: RiCalendarLine, label: 'Meetings' }, { icon: RiCheckboxLine, label: 'Tasks', count: 8 },
  ] },
  { title: 'Outreach', items: [{ icon: RiMailSendLine, label: 'Cold Email Agent' }, { icon: RiInbox2Line, label: 'AI SDR Inbox', count: 12 }, { icon: RiPhoneLine, label: 'Call Analyzer' }] },
  { title: 'Build', items: [{ icon: RiFlowChart, label: 'Workflows' }, { icon: RiGlobalLine, label: 'Sites' }, { icon: RiMegaphoneLine, label: 'Ads' }] },
]

function NavItem({ item, active, hovered, onHover }: { item: Item; active?: boolean; hovered: boolean; onHover: () => void }) {
  return (
    <a href="#" onPointerEnter={(e) => { if (e.pointerType === 'mouse') onHover() }} aria-current={active ? 'page' : undefined}
      className="relative flex h-9 items-center gap-2 rounded-[8px] px-3 leading-none">
      {active && <><span className="absolute inset-0 rounded-[8px] bg-bg-hover" /><span className="absolute -left-6 top-2 h-5 w-1 rounded-r-[4px] bg-primary" /></>}
      {hovered && !active && <motion.span layoutId="side-hover" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} className="absolute inset-0 rounded-[8px] bg-bg-hover" />}
      <item.icon size={20} className={`relative shrink-0 ${active ? 'text-primary' : 'text-text-sub'}`} />
      <span className={`relative flex-1 label-sm leading-none ${active ? 'text-text-strong' : 'text-text-sub'}`}>{item.label}</span>
      {item.count != null && <span className="tnum relative para-xs leading-none text-text-soft">{item.count}</span>}
      {active && <RiArrowRightSLine size={20} className="relative text-text-sub" />}
    </a>
  )
}

export default function Sidebar() {
  const [hover, setHover] = useState<string | null>(null)
  const used = 21758, total = 30000, ticks = 24, on = Math.round((used / total) * ticks)
  return (
    <aside onMouseLeave={() => setHover(null)} className="flex h-screen w-[272px] shrink-0 flex-col border-r border-stroke-soft bg-white px-5 py-6" aria-label="Main navigation">
      <div className="flex items-center gap-3 px-1">
        <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(160deg,#5b7cff,#2547d0)] label-md text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(37,71,208,0.35)]">A</span>
        <div className="min-w-0 flex-1 leading-none">
          <div className="label-sm text-text-strong">Acquisity</div>
          <div className="mt-1 para-xs text-text-sub">Ward Growth · sample</div>
        </div>
        <button type="button" aria-label="Switch workspace" className="press grid size-6 place-items-center rounded-[6px] bg-white text-text-sub shadow-[var(--ring),var(--shadow-xs)]"><RiExpandUpDownLine size={16} /></button>
      </div>
      <div className="mx-1 mt-6 h-px bg-stroke-soft" />

      <nav className="-mx-1 mt-5 flex-1 overflow-y-auto px-1 [mask-image:linear-gradient(to_bottom,#000_calc(100%-32px),transparent)]">
        {GROUPS.map((g, gi) => (
          <div key={g.title} className={gi ? 'mt-5' : ''}>
            <div className="px-3 pb-2 sub-xs text-text-soft">{g.title}</div>
            <div className="space-y-1">
              {g.items.map((it) => <NavItem key={it.label} item={it} active={it.label === 'Dashboard'} hovered={hover === it.label} onHover={() => setHover(it.label)} />)}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-4 rounded-[12px] bg-bg-weak p-3.5">
        <div className="flex items-baseline leading-none"><span className="label-sm text-text-strong">Credits</span><span className="tnum ml-auto para-xs text-text-sub">21,758 / 30,000</span></div>
        <div className="mt-3 flex h-3.5 gap-[3px]" role="img" aria-label="72% of credits left">
          {Array.from({ length: ticks }, (_, i) => <span key={i} className={`flex-1 rounded-[1.5px] ${i < on ? 'bg-primary' : 'bg-[#e1e4ea]'}`} />)}
        </div>
        <a href="#" className="mt-3 inline-flex label-xs text-primary-dark hover:underline">Add credits</a>
      </div>
      <div className="mt-3 space-y-1">
        <NavItem item={{ icon: RiSettings2Line, label: 'Settings' }} hovered={hover === 'set'} onHover={() => setHover('set')} />
        <NavItem item={{ icon: RiQuestionLine, label: 'Support' }} hovered={hover === 'sup'} onHover={() => setHover('sup')} />
      </div>
      <div className="mx-1 mt-4 h-px bg-stroke-soft" />
      <div className="mt-4 flex items-center gap-3 px-1">
        <span className="grid size-10 place-items-center rounded-full bg-[#c2d6ff] label-sm text-[#122368]">DW</span>
        <div className="min-w-0 flex-1 leading-none"><div className="label-sm text-text-strong">Daniel Ward</div><div className="mt-1 truncate para-xs text-text-sub">daniel@wardgrowth.example</div></div>
        <RiArrowRightSLine size={20} className="text-text-sub" />
      </div>
    </aside>
  )
}
