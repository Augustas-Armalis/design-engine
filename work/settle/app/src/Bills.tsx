// Bills list page (Kargul list grammar): one title row, segmented status tabs with counts, split "label | value" pills,
// then the table full-bleed inside the panel. Rows open the detail sheet.
import { useState } from 'react'
import { Menu } from '@base-ui/react/menu'
import { motion } from 'motion/react'
import { Check, ChevronDown, Download, Plus } from 'lucide-react'
import { me, people, type Bill } from './data'
import Table from './Table'
import { toast, useStore } from './store'
import { Button, cx, I } from './ui'

const TABS: { k: string; l: string; f: (b: Bill) => boolean }[] = [
  { k: 'all', l: 'All', f: (b) => b.status !== 'paid' },
  { k: 'mine', l: 'Waiting on you', f: (b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting') },
  { k: 'approval', l: 'In approval', f: (b) => b.status === 'approval' || b.status === 'review' },
  { k: 'scheduled', l: 'Scheduled', f: (b) => b.status === 'scheduled' || b.status === 'approved' },
  { k: 'paid', l: 'Paid', f: (b) => b.status === 'paid' },
]

function Split({ label, value, options, onPick }: { label: string; value: string; options: string[]; onPick: (v: string) => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger render={<button className="st flex h-[30px] items-center rounded-[9px] bg-[var(--card)] text-[14px] font-[500] shadow-[var(--sh-control)] hover:bg-[var(--sunk)]" />}>
        <span className="flex h-full items-center px-2.5 text-[var(--soft)] shadow-[inset_-1px_0_0_var(--line)]">{label}</span>
        <span className="flex items-center gap-1.5 pl-2.5 pr-2">{value}<ChevronDown size={12} strokeWidth={2} className="text-[var(--faint)]" /></span>
      </Menu.Trigger>
      <Menu.Portal><Menu.Positioner align="start" sideOffset={6}><Menu.Popup className="pop min-w-[180px] rounded-[12px] bg-[var(--card)] p-1 text-[14px] shadow-[var(--sh-pop)] outline-none">
        {options.map((o) => <Menu.Item key={o} onClick={() => onPick(o)} className="flex h-[30px] items-center gap-2 rounded-[8px] px-2 font-[500] outline-none data-[highlighted]:bg-[var(--hover)]">{o}{o === value && <Check {...I} className="ml-auto text-[var(--sub)]" />}</Menu.Item>)}
      </Menu.Popup></Menu.Positioner></Menu.Portal>
    </Menu.Root>
  )
}

export default function Bills() {
  const { bills } = useStore()
  const [tab, setTab] = useState('all')
  const [owner, setOwner] = useState('Anyone')
  const [method, setMethod] = useState('Any')
  const t = TABS.find((x) => x.k === tab)!
  const rows = bills.filter(t.f).filter((b) => owner === 'Anyone' || b.owner.name === owner).filter((b) => method === 'Any' || b.method === method)
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-5 pb-3 pt-5">
        <h1 className="text-[16px] font-[550] tracking-[-0.01em]">Bills</h1>
        <div role="tablist" aria-label="Status" className="ml-2 flex h-[30px] items-center rounded-[10px] bg-[var(--sunk)] p-[2px] shadow-[inset_0_0_0_1px_var(--line)]">
          {TABS.map((x) => {
            const on = x.k === tab
            return (
              <button key={x.k} role="tab" aria-selected={on} onClick={() => setTab(x.k)} className={cx('st relative flex h-[26px] items-center gap-1.5 rounded-[8px] px-2.5 text-[14px] font-[500]', on ? 'text-[var(--ink)]' : 'text-[var(--soft)] hover:text-[var(--ink)]')}>
                {on && <motion.span layoutId="tab" className="absolute inset-0 rounded-[8px] bg-[var(--card)] shadow-[var(--sh-control)]" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} />}
                <span className="relative">{x.l}</span><span className="tnum relative text-[12px] text-[var(--soft)]">{bills.filter(x.f).length}</span>
              </button>
            )
          })}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => toast({ title: 'Export started', detail: `${rows.length} bills · CSV` })}><Download {...I} className="text-[var(--faint)]" />Export</Button>
          <Button variant="primary"><Plus {...I} />New bill</Button>
        </div>
      </div>
      <div className="flex items-center gap-2 px-5 pb-4">
        <Split label="Sort by" value="Due date" options={['Due date', 'Amount', 'Vendor']} onPick={() => {}} />
        <Split label="Owner" value={owner} options={['Anyone', ...Object.values(people).map((p) => p.name)]} onPick={setOwner} />
        <Split label="Method" value={method} options={['Any', 'ACH', 'Wire', 'Card']} onPick={setMethod} />
        <Split label="Entity" value="All" options={['All', 'Arcline Inc. (US)', 'Arcline GmbH (DE)']} onPick={() => {}} />
      </div>
      <div className="shadow-[inset_0_1px_0_var(--div)]">
        <Table rows={rows} cols={['vendor', 'invoice', 'category', 'chain', 'match', 'due', 'amount', 'status']} />
      </div>
    </div>
  )
}
