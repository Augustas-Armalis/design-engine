// Overview: a report page read top-down (Kargul #48): title + subline, one KPI strip, the cash chart with the decision it
// implies, the approvals that move it, then the upcoming bills. Numbers are derived from the bills in the store.
import { AnimatePresence, motion } from 'motion/react'
import { Menu } from '@base-ui/react/menu'
import { ArrowRight, Check, ChevronDown, Download, Plus, Sparkles, Undo2 } from 'lucide-react'
import { BUFFER, me, type Bill } from './data'
import Chart, { series } from './Chart'
import Table from './Table'
import { approve, setMoved, toast, useStore } from './store'
import { Avatar, Button, cx, I, Kbd, Money, Stack, VendorTile } from './ui'

const ease = [0.215, 0.61, 0.355, 1] as const

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cx('rounded-[14px] bg-[var(--card)] shadow-[var(--sh-card)]', className)}>{children}</section>
}
function CardHead({ title, meta, right }: { title: string; meta?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex h-[52px] items-center gap-2 px-4">
      <h2 className="text-[14px] font-[550]">{title}</h2>
      {meta}
      <div className="ml-auto flex items-center gap-2">{right}</div>
    </div>
  )
}

function Kpis({ bills }: { bills: Bill[] }) {
  const open = bills.filter((b) => b.status !== 'paid' && b.dueIn <= 30)
  const due = open.reduce((a, b) => a + b.amount, 0)
  const parts = (['approval', 'review', 'approved', 'scheduled'] as const).map((s) => ({ s, v: open.filter((b) => b.status === s).reduce((a, b) => a + b.amount, 0) }))
  const tone = { approval: 'var(--amber)', review: 'var(--faint)', approved: 'var(--blue)', scheduled: 'var(--accent)' }
  const mine = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting'))
  const run = bills.filter((b) => b.run === 'Oct 15')
  const disc = bills.filter((b) => b.discount && b.status !== 'paid')
  const cells = [
    { k: 'Due in 30 days', v: <Money n={due} />, foot: (
      <div className="flex w-full items-center gap-3">
        <div className="flex h-1.5 flex-1 gap-[2px] overflow-hidden rounded-full">{parts.map((p) => <span key={p.s} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${(p.v / due) * 100}%`, background: tone[p.s] }} />)}</div>
        <span className="tnum">{open.length} bills</span>
      </div>) },
    { k: 'Waiting on you', v: <Money n={mine.reduce((a, b) => a + b.amount, 0)} />, foot: <><Stack people={mine.map((b) => b.owner).filter((p, i, a) => a.findIndex((q) => q.id === p.id) === i)} size={18} /><span>{mine.length} bills · {mine.filter((b) => b.dueIn < 0).length ? <span className="text-[var(--red)]">1 overdue</span> : 'none late'}</span></> },
    { k: 'Next pay run · Thu, Oct 15', v: <Money n={run.reduce((a, b) => a + b.amount, 0)} />, foot: <><span className="flex items-center">{run.map((b, i) => <span key={b.id} className={cx('rounded-[6px] shadow-[0_0_0_2px_var(--card)]', i && '-ml-1')}><VendorTile v={b.vendor} size={18} /></span>)}</span><span>{run.length} bills · ACH, wire, card</span></> },
    { k: 'Early-pay discounts', v: <span className="text-[var(--accent)]"><Money n={disc.reduce((a, b) => a + (b.discount?.save ?? 0), 0)} className="[&>span]:text-current [&>span]:opacity-75" /></span>, foot: <span>{disc.length} available · take the first by {disc.map((b) => b.discount!.by).sort()[0]}</span> },
  ]
  return (
    <Card className="grid grid-cols-4">
      {cells.map((c, i) => (
        <div key={c.k} className={cx('flex flex-col px-5 pb-4 pt-4', i && 'shadow-[inset_1px_0_0_var(--div)]')}>
          <span className="text-[12px] font-[500] text-[var(--soft)]">{c.k}</span>
          <span className="mt-2 text-[28px] font-[600] leading-[32px] tracking-[-0.03em]">{c.v}</span>
          <div className="mt-3 flex h-5 items-center gap-2 text-[12px] text-[var(--soft)]">{c.foot}</div>
        </div>
      ))}
    </Card>
  )
}

function Insight({ moved }: { moved: boolean }) {
  const d = series(moved)[3]
  return (
    <div className="m-1 mt-0 flex min-h-[44px] items-center gap-3 rounded-[10px] bg-[var(--sunk)] py-1.5 pl-3 pr-1.5 dark:bg-[rgba(255,255,255,0.03)]">
      <AnimatePresence mode="popLayout" initial={false}>
        {!moved ? (
          <motion.div key="a" className="flex flex-1 items-center gap-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
            <Sparkles {...I} className="shrink-0 text-[var(--accent)]" />
            <p className="flex-1 text-[14px] text-[var(--sub)]"><span className="font-[500] text-[var(--ink)]">Payroll and Thursday's pay run clear on the same day.</span> Hartwell's lease has a 5‑day grace period: wiring rent on Oct 16 keeps Oct 15 above your buffer.</p>
            <Button onClick={() => setMoved(true)}>Move to Oct 16<ArrowRight {...I} /></Button>
          </motion.div>
        ) : (
          <motion.div key="b" className="flex flex-1 items-center gap-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
            <span className="grid size-[14px] place-items-center rounded-full bg-[var(--green)] text-white"><Check size={9} strokeWidth={3.5} /></span>
            <p className="flex-1 text-[14px] text-[var(--sub)]"><span className="font-[500] text-[var(--ink)]">Oct 15 clears <Money n={d.balance - BUFFER} cents={false} className="[&>span]:text-current" /> above buffer.</span> The Hartwell wire goes out Oct 16, inside its grace period.</p>
            <Button variant="ghost" onClick={() => setMoved(false)}><Undo2 {...I} />Undo</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Waiting({ bills }: { bills: Bill[] }) {
  const mine = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting')).sort((a, b) => a.dueIn - b.dueIn)
  const total = mine.reduce((a, b) => a + b.amount, 0)
  return (
    <Card className="flex flex-col">
      <CardHead title="Waiting on you" meta={<span className="tnum grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sunk)] px-1.5 text-[12px] font-[500] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line)]">{mine.length}</span>}
        right={<a href="#/bills" className="st flex h-6 min-h-6 items-center gap-1 rounded-[7px] px-1.5 text-[12px] font-[500] text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--ink)]">View all<ArrowRight size={12} strokeWidth={2} /></a>} />
      <div className="flex-1 px-1">
        <AnimatePresence initial={false}>
          {mine.map((b) => (
            <motion.div key={b.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, transition: { duration: 0.25, ease } }} className="overflow-hidden">
              <div className="st group flex h-[60px] items-center gap-3 rounded-[10px] px-3 hover:bg-[var(--hover)]">
                <VendorTile v={b.vendor} size={32} />
                <a href={`#/bills/${b.id}`} className="min-w-0 flex-1 outline-none">
                  <span className="flex items-center gap-1.5"><span className="truncate text-[14px] font-[500]">{b.vendor.name}</span></span>
                  <span className="flex items-center gap-1.5 text-[12px] text-[var(--soft)]"><Avatar p={b.owner} size={14} /><span className="truncate">{b.owner.name.split(' ')[0]} · {b.memo}</span></span>
                </a>
                <span className="flex flex-col items-end">
                  <Money n={b.amount} className="text-[14px] font-[500]" />
                  <span className={cx('tnum text-[12px]', b.dueIn < 0 ? 'font-[500] text-[var(--red)]' : 'text-[var(--soft)]')}>{b.dueIn < 0 ? `${-b.dueIn}d late` : `Due ${b.due}`}</span>
                </span>
                <Button size="icon" aria-label={`Approve ${b.vendor.name}`} onClick={() => approve([b.id])} className="hover:!bg-[var(--accent)] hover:!text-[var(--accent-ink)] hover:!shadow-[0_0_0_1px_var(--accent)]"><Check {...I} /></Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!mine.length && <div className="grid h-[240px] place-items-center text-center text-[14px] text-[var(--soft)]"><div><Check size={18} className="mx-auto mb-2 text-[var(--green)]" />You're clear. Nothing waits on you.</div></div>}
      </div>
      {mine.length > 0 && (
        <div className="m-1 mt-1 flex items-center gap-2 rounded-[10px] bg-[var(--sunk)] p-1.5 pl-3 dark:bg-[rgba(255,255,255,0.03)]">
          <span className="flex-1 text-[12px] text-[var(--soft)]">All {mine.length} · <Money n={total} className="text-[var(--ink)]" /></span>
          <Button variant="primary" onClick={() => approve(mine.map((b) => b.id))}>Approve all</Button>
        </div>
      )}
    </Card>
  )
}

export default function Overview() {
  const { bills, moved } = useStore()
  const open = bills.filter((b) => b.status !== 'paid')
  return (
    <div className="mx-auto max-w-[1160px] px-8 pb-12 pt-7">
      <header className="flex items-end gap-4">
        <div className="flex-1">
          <h1 className="text-[24px] font-[600] leading-[30px] tracking-[-0.02em]">Overview</h1>
          <p className="mt-1 text-[14px] text-[var(--soft)]">Monday, Oct 12 · {open.length} open bills · amounts in USD</p>
        </div>
        <Menu.Root>
          <Menu.Trigger render={<Button />}>All entities<ChevronDown {...I} className="text-[var(--faint)]" /></Menu.Trigger>
          <Menu.Portal><Menu.Positioner align="end" sideOffset={6}><Menu.Popup className="pop min-w-[200px] rounded-[12px] bg-[var(--card)] p-1 text-[14px] shadow-[var(--sh-pop)] outline-none">
            {['All entities', 'Arcline Inc. (US)', 'Arcline GmbH (DE)'].map((e, i) => (
              <Menu.Item key={e} className="flex h-[30px] items-center gap-2 rounded-[8px] px-2 font-[500] outline-none data-[highlighted]:bg-[var(--hover)]">{e}{i === 0 && <Check {...I} className="ml-auto text-[var(--sub)]" />}</Menu.Item>
            ))}
          </Menu.Popup></Menu.Positioner></Menu.Portal>
        </Menu.Root>
        <Button onClick={() => toast({ title: 'Export started', detail: 'bills-2026-10-12.csv' })}><Download {...I} className="text-[var(--faint)]" />Export</Button>
        <Button variant="primary"><Plus {...I} />New bill</Button>
      </header>

      <div className="mt-6 flex flex-col gap-4">
        <Kpis bills={bills} />
        <div className="grid grid-cols-[minmax(0,1fr)_372px] gap-4">
          <Card className="flex flex-col">
            <CardHead title="Cash position" meta={<span className="text-[12px] text-[var(--soft)]">Operating ··4821 · next 30 days</span>}
              right={<div className="flex items-center gap-3 text-[12px] text-[var(--soft)]">
                <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[var(--accent)]" />Balance</span>
                <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full shadow-[inset_0_0_0_1.75px_var(--accent)]" />Pay run</span>
                <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full shadow-[inset_0_0_0_1.75px_var(--violet)]" />Payroll</span>
              </div>} />
            <div className="px-4 pb-3 pt-1"><Chart moved={moved} /></div>
            <Insight moved={moved} />
          </Card>
          <Waiting bills={bills} />
        </div>
        <Card>
          <CardHead title="Upcoming bills" meta={<span className="text-[12px] text-[var(--soft)]">sorted by due date</span>}
            right={<><span className="hidden items-center gap-1 text-[12px] text-[var(--soft)] xl:flex">Select with <Kbd>X</Kbd></span><a href="#/bills" className="st flex h-6 min-h-6 items-center gap-1 rounded-[7px] px-1.5 text-[12px] font-[500] text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--ink)]">Open Bills<ArrowRight size={12} strokeWidth={2} /></a></>} />
          <Table rows={open.filter((b) => b.dueIn <= 14)} cols={['vendor', 'owner', 'chain', 'match', 'due', 'amount', 'status']} limit={8} />
        </Card>
      </div>
    </div>
  )
}
