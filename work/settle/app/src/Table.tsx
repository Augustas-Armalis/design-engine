// The one object, listed well (Kargul CRM grammar): 44px rows, 12px headers, real objects in every cell, every control wired.
import { useMemo, useState } from 'react'
import { Menu } from '@base-ui/react/menu'
import { ArrowDown, ArrowUp, CalendarDays, Check, Copy, Ellipsis, ExternalLink, Stamp, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { categoryHue, me, statusMeta, type Bill } from './data'
import { approve, selectAll, toast, toggle, useStore } from './store'
import { Avatar, Button, Checkbox, cx, I, Kbd, Match, Money, Tag, VendorTile } from './ui'

export type Col = 'vendor' | 'invoice' | 'category' | 'owner' | 'chain' | 'match' | 'due' | 'amount' | 'status'
const W: Record<Col, string> = { vendor: 'minmax(220px,1fr)', invoice: '150px', category: '128px', owner: '168px', chain: '104px', match: '76px', due: '148px', amount: '128px', status: '144px' }
const LABEL: Record<Col, string> = { vendor: 'Vendor', invoice: 'Invoice', category: 'Category', owner: 'Budget owner', chain: 'Approvals', match: 'Match', due: 'Due', amount: 'Amount', status: 'Status' }
type SortKey = 'due' | 'amount' | 'vendor'

export function Due({ b }: { b: Bill }) {
  const late = b.dueIn < 0 && b.status !== 'paid' && b.status !== 'scheduled'
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <CalendarDays {...I} className="text-[var(--faint)]" />
      <span className="tnum">{b.due}</span>
      <span className="h-3 w-px bg-[var(--line-2)]" />
      <span className={cx('tnum text-[12px]', late ? 'font-[500] text-[var(--red)]' : 'text-[var(--soft)]')}>{b.status === 'paid' ? 'paid' : late ? `${-b.dueIn}d late` : b.dueIn === 0 ? 'today' : `in ${b.dueIn}d`}</span>
    </span>
  )
}

export function Chain({ b }: { b: Bill }) {
  const done = b.chain.filter((s) => s.state === 'done').length
  return (
    <span className="flex items-center gap-2">
      <span className="flex items-center">
        {b.chain.map((s, i) => (
          <span key={s.who.id} className={cx('relative', i && '-ml-1.5', s.state === 'todo' && 'opacity-40 grayscale')}>
            <Avatar p={s.who} size={20} ring />
            {s.state === 'waiting' && <span className="absolute -bottom-px -right-px size-[7px] rounded-full bg-[var(--amber)] shadow-[0_0_0_1.5px_var(--card)]" />}
          </span>
        ))}
      </span>
      <span className="tnum text-[12px] text-[var(--soft)]">{done}/{b.chain.length}</span>
    </span>
  )
}

export function StatusTag({ b }: { b: Bill }) { const m = statusMeta[b.status]; return <Tag hue={m.tone} dot>{m.label}</Tag> }

function RowMenu({ b }: { b: Bill }) {
  const mine = b.chain.some((s) => s.who.id === me.id && s.state === 'waiting')
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="ghost" size="xs" aria-label={`Actions for ${b.vendor.name}`} onClick={(e) => e.stopPropagation()} />}><Ellipsis {...I} /></Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={4}>
          <Menu.Popup className="pop min-w-[188px] rounded-[12px] bg-[var(--card)] p-1 text-[14px] shadow-[var(--sh-pop)] outline-none">
            {[
              { l: 'Approve', i: Check, k: 'A', on: () => approve([b.id]), off: !mine },
              { l: 'Open bill', i: ExternalLink, k: '↵', on: () => (location.hash = `#/bills/${b.id}`) },
              { l: 'Copy invoice number', i: Copy, k: 'C', on: () => toast({ title: 'Copied', detail: b.invoice }) },
              { l: 'Request changes', i: Stamp, on: () => toast({ title: `Asked ${b.owner.name.split(' ')[0]} for changes` }) },
            ].map((it) => (
              <Menu.Item key={it.l} disabled={it.off} onClick={it.on} className="st flex h-[30px] items-center gap-2 rounded-[8px] px-2 font-[500] text-[var(--ink)] outline-none data-[highlighted]:bg-[var(--hover)] data-[disabled]:opacity-40">
                <it.i {...I} className="text-[var(--faint)]" /><span className="flex-1">{it.l}</span>{it.k && <Kbd>{it.k}</Kbd>}
              </Menu.Item>
            ))}
            <Menu.Separator className="mx-1 my-1 h-px bg-[var(--div)]" />
            <Menu.Item onClick={() => toast({ title: `Rejected ${b.vendor.name}` })} className="st flex h-[30px] items-center gap-2 rounded-[8px] px-2 font-[500] text-[var(--red)] outline-none data-[highlighted]:bg-[var(--hover)]">
              <X {...I} />Reject
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default function Table({ rows, cols, limit }: { rows: Bill[]; cols: Col[]; limit?: number }) {
  const { selected } = useStore()
  const [sort, setSort] = useState<{ k: SortKey; dir: 1 | -1 }>({ k: 'due', dir: 1 })
  const sorted = useMemo(() => {
    const r = [...rows].sort((a, b) => (sort.k === 'due' ? a.dueIn - b.dueIn : sort.k === 'amount' ? a.amount - b.amount : a.vendor.name.localeCompare(b.vendor.name)) * sort.dir)
    return limit ? r.slice(0, limit) : r
  }, [rows, sort, limit])
  const grid = `40px ${cols.map((c) => W[c]).join(' ')} 44px`
  const ids = sorted.map((b) => b.id)
  const nSel = ids.filter((i) => selected.has(i)).length
  const total = rows.reduce((a, b) => a + b.amount, 0)

  const head = (c: Col) => {
    const k = (c === 'due' || c === 'amount' || c === 'vendor') ? (c as SortKey) : null
    const on = k && sort.k === k
    const inner = <>{LABEL[c]}{on && (sort.dir === 1 ? <ArrowUp size={12} strokeWidth={2} /> : <ArrowDown size={12} strokeWidth={2} />)}</>
    return (
      <div key={c} role="columnheader" aria-sort={on ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined} className={cx('flex items-center px-3', c === 'amount' && 'justify-end')}>
        {k ? <button onClick={() => setSort((s) => ({ k, dir: s.k === k ? (-s.dir as 1 | -1) : 1 }))} className={cx('st -mx-1 flex h-6 items-center gap-1 rounded-[6px] px-1 hover:text-[var(--ink)]', on && 'text-[var(--ink)]')}>{inner}</button> : inner}
      </div>
    )
  }

  return (
    <div role="table" aria-label="Bills, sample data" className="relative text-[14px]">
      <div role="row" className="grid h-9 items-center text-[12px] font-[500] text-[var(--soft)] shadow-[inset_0_-1px_0_var(--div)]" style={{ gridTemplateColumns: grid }}>
        <div role="columnheader" className="flex items-center justify-center"><Checkbox label="Select all bills" checked={nSel === ids.length && nSel > 0} indeterminate={nSel > 0 && nSel < ids.length} onChange={(v) => selectAll(ids, v)} /></div>
        {cols.map(head)}
        <div role="columnheader"><span className="sr-only">Actions</span></div>
      </div>
      <AnimatePresence initial={false}>
        {sorted.map((b) => {
          const sel = selected.has(b.id)
          return (
            <motion.div layout="position" key={b.id} role="row" onClick={() => (location.hash = `#/bills/${b.id}`)}
              className={cx('st group grid h-11 items-center shadow-[inset_0_-1px_0_var(--div)]', sel ? 'bg-[var(--select)]' : 'hover:bg-[var(--hover)]')} style={{ gridTemplateColumns: grid }}>
              <div role="cell" className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}><Checkbox label={`Select ${b.vendor.name}`} checked={sel} onChange={(v) => toggle(b.id, v)} /></div>
              {cols.map((c) => (
                <div key={c} role="cell" className={cx('flex min-w-0 items-center px-3', c === 'amount' && 'justify-end')}>
                  {c === 'vendor' && <span className="flex min-w-0 items-center gap-2.5"><VendorCell b={b} /></span>}
                  {c === 'invoice' && <span className="mono truncate text-[var(--sub)]">{b.invoice}</span>}
                  {c === 'category' && <Tag hue={categoryHue[b.category]}>{b.category}</Tag>}
                  {c === 'owner' && <span className="flex min-w-0 items-center gap-2"><Avatar p={b.owner} size={20} /><span className="truncate">{b.owner.name}</span></span>}
                  {c === 'chain' && <Chain b={b} />}
                  {c === 'match' && <Match m={b.match} />}
                  {c === 'due' && <Due b={b} />}
                  {c === 'amount' && <Money n={b.amount} className="font-[500]" />}
                  {c === 'status' && <StatusTag b={b} />}
                </div>
              ))}
              <div role="cell" className="flex items-center justify-center opacity-60 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}><RowMenu b={b} /></div>
            </motion.div>
          )
        })}
      </AnimatePresence>
      <div className="grid h-10 items-center text-[12px] text-[var(--soft)]" style={{ gridTemplateColumns: grid }}>
        <div />
        <div className="px-3" style={{ gridColumn: `span ${cols.indexOf('amount')}` }}><span className="tnum text-[var(--ink)]">{rows.length}</span> bills{limit && rows.length > limit ? <> · showing {limit}</> : null}</div>
        <div className="flex items-center justify-end gap-1.5 px-3"><span>Total</span><Money n={total} className="text-[12px] font-[500] text-[var(--ink)]" /></div>
      </div>

      {/* bulk bar */}
      <AnimatePresence>
        {nSel > 0 && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed bottom-6 left-[calc(50%+124px)] z-40 flex h-11 -translate-x-1/2 items-center gap-1 rounded-[14px] bg-[var(--card)] p-1.5 pl-3 shadow-[var(--sh-pop)]">
            <span className="tnum pr-2 text-[14px] font-[500]">{nSel} selected</span>
            <span className="tnum pr-2 text-[12px] text-[var(--soft)]"><Money n={sorted.filter((b) => selected.has(b.id)).reduce((a, b) => a + b.amount, 0)} /></span>
            <Button variant="secondary" onClick={() => approve([...selected].filter((i) => ids.includes(i)))}><Check {...I} />Approve<Kbd>A</Kbd></Button>
            <Button variant="ghost" onClick={() => selectAll(ids, false)} aria-label="Clear selection" size="icon"><X {...I} /></Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function VendorCell({ b }: { b: Bill }) {
  return <><VendorTile v={b.vendor} /><span className="truncate font-[500]">{b.vendor.name}</span></>
}
