// Overview: a report page read top-down (Kargul #48): title + subline, one KPI strip, the cash chart with the decision it
// implies, the approvals that move it, then the upcoming bills. Numbers are derived from the bills in the store.
import { AnimatePresence, motion } from 'motion/react'
import { Menu } from '@base-ui/react/menu'
import { ArrowRight, Check, ChevronDown, Download, Plus, Sparkles, Undo2 } from 'lucide-react'
import { BUFFER, me, type Bill } from './data'
import Chart, { series } from './Chart'
import Table from './Table'
import { approve, setMoved, toast, useStore } from './store'
import { Button, cx, I, Money, VendorTile } from './ui'

const ease = [0.215, 0.61, 0.355, 1] as const

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cx('rounded-[14px] bg-[var(--card)] shadow-[var(--sh-card)]', className)}>{children}</section>
}
function CardHead({ title, meta, right }: { title: string; meta?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex h-14 items-center gap-2 px-5">
      <h2 className="text-[14px] font-[550]">{title}</h2>
      {meta}
      <div className="ml-auto flex items-center gap-2">{right}</div>
    </div>
  )
}

function Kpis({ bills, moved }: { bills: Bill[]; moved: boolean }) {
  const open = bills.filter((b) => b.status !== 'paid' && b.dueIn <= 30)
  const late = open.filter((b) => b.dueIn < 0 && b.status !== 'scheduled').length
  const mine = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting'))
  const run = bills.filter((b) => b.run === 'Oct 15')
  const low = series(moved)[3].balance
  const cells = [
    { k: 'Due in 30 days', v: open.reduce((a, b) => a + b.amount, 0), foot: <>{open.length} bills{late ? <> · <span className="text-[var(--red)]">{late} late</span></> : null}</> },
    { k: 'Waiting on you', v: mine.reduce((a, b) => a + b.amount, 0), foot: <>{mine.length} bills · oldest {Math.max(...mine.map((b) => -b.dueIn), 0)}d late</> },
    { k: 'Next pay run', v: run.reduce((a, b) => a + b.amount, 0), foot: <>Thu, Oct 15 · {run.length} bills</> },
    { k: 'Low point, next 30 days', v: low, foot: low < BUFFER ? <span className="text-[var(--red)]"><Money n={BUFFER - low} cents={false} className="[&>span]:text-current" /> under buffer on Oct 15</span> : <>Oct 15 · above buffer</> },
  ]
  return (
    <Card className="grid grid-cols-4">
      {cells.map((c, i) => (
        <div key={c.k} className={cx('flex flex-col px-5 py-5', i && 'shadow-[inset_1px_0_0_var(--div)]')}>
          <span className="text-[12px] font-[500] text-[var(--soft)]">{c.k}</span>
          <span className="mt-2 text-[28px] font-[600] leading-[32px] tracking-[-0.03em]"><Money n={c.v} cents={false} /></span>
          <span className="mt-2 text-[12px] text-[var(--soft)]">{c.foot}</span>
        </div>
      ))}
    </Card>
  )
}

function Insight({ moved }: { moved: boolean }) {
  const d = series(moved)[3]
  return (
    <div className="flex min-h-[56px] items-center gap-3 px-5 py-3 shadow-[inset_0_1px_0_var(--div)]">
      <AnimatePresence mode="popLayout" initial={false}>
        {!moved ? (
          <motion.div key="a" className="flex flex-1 items-center gap-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
            <Sparkles {...I} className="shrink-0 text-[var(--ink)]" />
            <p className="flex-1 text-[14px] text-[var(--sub)]"><span className="font-[500] text-[var(--ink)]">Payroll and the pay run both clear on Oct 15.</span> Wiring Hartwell's rent a day later stays inside its grace period.</p>
            <Button onClick={() => setMoved(true)}>Move to Oct 16</Button>
          </motion.div>
        ) : (
          <motion.div key="b" className="flex flex-1 items-center gap-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
            <Check {...I} className="shrink-0 text-[var(--ink)]" />
            <p className="flex-1 text-[14px] text-[var(--sub)]"><span className="font-[500] text-[var(--ink)]">Oct 15 now clears <Money n={d.balance - BUFFER} cents={false} className="[&>span]:text-current" /> above buffer.</span> Hartwell's wire goes out Oct 16.</p>
            <Button variant="ghost" onClick={() => setMoved(false)}><Undo2 {...I} />Undo</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Waiting({ bills }: { bills: Bill[] }) {
  const mine = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting')).sort((a, b) => a.dueIn - b.dueIn)
  return (
    <Card className="flex flex-col">
      <CardHead title="Waiting on you" meta={<span className="tnum text-[14px] text-[var(--soft)]">{mine.length}</span>}
        right={mine.length > 0 && <Button variant="ghost" onClick={() => approve(mine.map((b) => b.id))}>Approve all</Button>} />
      <div className="flex-1 px-2 pb-2">
        <AnimatePresence initial={false}>
          {mine.map((b) => (
            <motion.div key={b.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, transition: { duration: 0.25, ease } }} className="overflow-hidden">
              <div className="st group flex h-16 items-center gap-3 rounded-[10px] px-3 hover:bg-[var(--hover)]">
                <VendorTile v={b.vendor} size={32} />
                <a href={`#/bills/${b.id}`} className="min-w-0 flex-1 leading-[18px] outline-none">
                  <span className="block truncate text-[14px] font-[500]">{b.vendor.name}</span>
                  <span className="block truncate text-[12px] text-[var(--soft)]">{b.owner.name.split(' ')[0]} · {b.dueIn < 0 ? <span className="text-[var(--red)]">{-b.dueIn}d late</span> : `due ${b.due}`}</span>
                </a>
                <Money n={b.amount} cents={false} className="text-[14px] font-[500]" />
                <Button variant="ghost" size="icon" aria-label={`Approve ${b.vendor.name}`} onClick={() => approve([b.id])} className="opacity-60 group-hover:opacity-100"><Check {...I} /></Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!mine.length && <div className="grid h-[240px] place-items-center text-center text-[14px] text-[var(--soft)]"><div><Check size={18} className="mx-auto mb-2 text-[var(--ink)]" />You're clear. Nothing waits on you.</div></div>}
      </div>
      {mine.length > 0 && <p className="mx-5 py-4 text-[12px] leading-[18px] text-[var(--soft)] shadow-[inset_0_1px_0_var(--div)]">Approving all {mine.length} releases <Money n={mine.reduce((a, b) => a + b.amount, 0)} cents={false} className="text-[var(--sub)]" /> into Thursday's run. Each approval can be undone until the run is sent.</p>}
    </Card>
  )
}

export default function Overview() {
  const { bills, moved } = useStore()
  const open = bills.filter((b) => b.status !== 'paid')
  return (
    <div className="mx-auto max-w-[1160px] px-10 pb-14 pt-8">
      <header className="flex items-end gap-2">
        <div className="flex-1">
          <h1 className="text-[24px] font-[600] leading-[30px] tracking-[-0.02em]">Overview</h1>
          <p className="mt-1 text-[14px] text-[var(--soft)]">Monday, Oct 12 · {open.length} open bills</p>
        </div>
        <Menu.Root>
          <Menu.Trigger render={<Button variant="ghost" />}>All entities<ChevronDown {...I} className="text-[var(--faint)]" /></Menu.Trigger>
          <Menu.Portal><Menu.Positioner align="end" sideOffset={6}><Menu.Popup className="pop min-w-[200px] rounded-[12px] bg-[var(--card)] p-1 text-[14px] shadow-[var(--sh-pop)] outline-none">
            {['All entities', 'Arcline Inc. (US)', 'Arcline GmbH (DE)'].map((e, i) => (
              <Menu.Item key={e} className="flex h-[30px] items-center gap-2 rounded-[8px] px-2 font-[500] outline-none data-[highlighted]:bg-[var(--hover)]">{e}{i === 0 && <Check {...I} className="ml-auto text-[var(--sub)]" />}</Menu.Item>
            ))}
          </Menu.Popup></Menu.Positioner></Menu.Portal>
        </Menu.Root>
        <Button onClick={() => toast({ title: 'Export started', detail: 'bills-2026-10-12.csv' })}><Download {...I} className="text-[var(--faint)]" />Export</Button>
        <Button variant="primary"><Plus {...I} />New bill</Button>
      </header>

      <div className="mt-8 flex flex-col gap-5">
        <Kpis bills={bills} moved={moved} />
        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-5">
          <Card className="flex flex-col">
            <CardHead title="Cash position" meta={<span className="text-[14px] text-[var(--soft)]">Next 30 days</span>}
              right={<div className="flex items-center gap-4 text-[12px] text-[var(--soft)]">
                <span className="flex items-center gap-1.5"><span className="h-[1.5px] w-3 rounded-full bg-[var(--ink)]" />Balance</span>
                <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full shadow-[inset_0_0_0_1.5px_var(--ink)]" />Payment out</span>
              </div>} />
            <div className="px-5 pb-4 pt-1"><Chart moved={moved} /></div>
            <Insight moved={moved} />
          </Card>
          <Waiting bills={bills} />
        </div>
        <Card>
          <CardHead title="Upcoming bills" meta={<span className="text-[14px] text-[var(--soft)]">Next 14 days</span>}
            right={<a href="#/bills" className="st flex h-[30px] items-center gap-1 rounded-[9px] px-2.5 text-[14px] font-[500] text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]">All bills<ArrowRight {...I} /></a>} />
          <Table rows={open.filter((b) => b.dueIn <= 14)} cols={['vendor', 'owner', 'due', 'amount', 'status']} limit={6} selectable={false} />
        </Card>
      </div>
    </div>
  )
}
