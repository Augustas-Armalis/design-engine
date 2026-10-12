// Bill detail: a floating sheet inset 8px inside the panel (radius concentric with the panel: 16 - 8 = 8 would pinch, so the
// sheet keeps the card radius 14 and floats on its own shadow). Everything the approver needs to decide sits on one screen.
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, Bell, Check, CircleDashed, Clock3, FileText, Link2, X } from 'lucide-react'
import { me, type Bill } from './data'
import { approve, toast, useStore } from './store'
import { Due, StatusTag } from './Table'
import { Avatar, Button, cx, I, Kbd, Money, Tip, VendorTile } from './ui'

const ease = [0.215, 0.61, 0.355, 1] as const

function Fact({ k, children }: { k: string; children: React.ReactNode }) {
  return <div className="flex h-8 items-center"><span className="w-[120px] shrink-0 text-[14px] text-[var(--soft)]">{k}</span><span className="flex min-w-0 items-center gap-2 text-[14px]">{children}</span></div>
}

function Body({ b }: { b: Bill }) {
  const mine = b.chain.some((s) => s.who.id === me.id && s.state === 'waiting')
  const holder = b.chain.find((s) => s.state === 'waiting')?.who
  const when = ['Oct 9, 14:02', 'Oct 10, 09:41', 'Oct 11, 16:20']
  const match = b.match ?? [false, false, true]
  const docs = [`PO-${1100 + Number(b.id.slice(1)) * 7}`, `GRN-${4400 + Number(b.id.slice(1)) * 13}`, b.invoice]
  return (
    <>
      <div className="flex h-[60px] shrink-0 items-center gap-3 px-4 shadow-[inset_0_-1px_0_var(--div)]">
        <VendorTile v={b.vendor} size={32} />
        <div className="min-w-0 flex-1 leading-[18px]"><div id="sheet-title" className="truncate text-[16px] font-[550] tracking-[-0.01em]">{b.vendor.name}</div><div className="mono text-[var(--soft)]">{b.invoice}</div></div>
        <Tip label="Copy link"><Button variant="ghost" size="icon" aria-label="Copy link" onClick={() => toast({ title: 'Link copied' })}><Link2 {...I} /></Button></Tip>
        <Tip label={<span className="flex items-center gap-1.5">Close <Kbd className="!text-white/70 !shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">Esc</Kbd></span>}><Button variant="ghost" size="icon" aria-label="Close" onClick={() => (location.hash = '#/bills')}><X {...I} /></Button></Tip>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-end justify-between pb-4 pt-5">
          <div><div className="text-[12px] font-[500] text-[var(--soft)]">Amount due</div><div className="mt-1 text-[28px] font-[600] leading-[32px] tracking-[-0.03em]"><Money n={b.amount} /></div></div>
          <StatusTag b={b} />
        </div>

        <div className="flex flex-col py-1">
          <Fact k="Due"><Due b={b} /></Fact>
          <Fact k="Pay run">{b.run ? <span className="tnum">Thu, {b.run}</span> : <span className="text-[var(--soft)]">Not scheduled</span>}<span className="text-[var(--faint)]">·</span><span className="text-[var(--sub)]">{b.method}</span></Fact>
          <Fact k="Category">{b.category}</Fact>
          <Fact k="Budget owner"><Avatar p={b.owner} size={20} />{b.owner.name}</Fact>
          <Fact k="Memo"><span className="truncate text-[var(--sub)]">{b.memo}</span></Fact>
          {b.discount && <Fact k="Discount"><span>{b.discount.terms}</span><span className="text-[var(--sub)]">· Save <Money n={b.discount.save} /> by {b.discount.by}</span></Fact>}
        </div>

        <h3 className="mt-5 text-[12px] font-[500] text-[var(--soft)]">Approvals</h3>
        <ol className="mt-2 rounded-[12px] p-1 shadow-[var(--sh-ring)]">
          {b.chain.map((s, i) => (
            <li key={s.who.id} className={cx('relative flex h-12 items-center gap-3 rounded-[8px] px-2.5', s.state === 'waiting' && 'bg-[var(--hover)]')}>
              {i < b.chain.length - 1 && <span aria-hidden className="absolute left-[21px] top-[34px] h-[28px] w-px bg-[var(--line-2)]" />}
              <span className={cx(s.state === 'todo' && 'opacity-40 grayscale')}><Avatar p={s.who} size={24} /></span>
              <span className="min-w-0 flex-1 leading-[16px]"><span className="block text-[14px] font-[500]">{s.who.id === me.id ? 'You' : s.who.name}</span><span className="block text-[12px] text-[var(--soft)]">{s.who.role}</span></span>
              {s.state === 'done' && <span className="flex items-center gap-1.5 text-[12px] text-[var(--sub)]"><Check size={12} strokeWidth={2.5} className="text-[var(--ink)]" />Approved {when[i]}</span>}
              {s.state === 'waiting' && <span className="flex items-center gap-1.5 text-[12px] font-[500] text-[var(--amber)]"><Clock3 size={12} strokeWidth={2.25} />Waiting · 2d</span>}
              {s.state === 'todo' && <span className="text-[12px] text-[var(--soft)]">Next</span>}
            </li>
          ))}
        </ol>

        <h3 className="mt-5 text-[12px] font-[500] text-[var(--soft)]">3-way match</h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {['Purchase order', 'Goods receipt', 'Invoice'].map((l, i) => (
            <div key={l} className="rounded-[12px] p-3 shadow-[var(--sh-ring)]">
              <div className="flex items-center gap-1.5 text-[12px] font-[500]">{match[i] ? <Check size={12} strokeWidth={2.5} className="text-[var(--ink)]" /> : b.match ? <AlertTriangle size={12} strokeWidth={2.25} className="text-[var(--amber)]" /> : <CircleDashed size={12} strokeWidth={2} className="text-[var(--faint)]" />}<span className={match[i] ? 'text-[var(--ink)]' : 'text-[var(--soft)]'}>{l}</span></div>
              <div className={cx('mono mt-1.5', match[i] ? 'text-[var(--sub)]' : 'text-[var(--soft)]')}>{match[i] ? docs[i] : b.match ? 'Missing' : 'No PO'}</div>
            </div>
          ))}
        </div>

        <h3 className="mt-5 text-[12px] font-[500] text-[var(--soft)]">Document</h3>
        <a href="#" onClick={(e) => e.preventDefault()} className="st mt-2 flex items-center gap-3 rounded-[12px] p-2 pr-3 shadow-[var(--sh-ring)] hover:bg-[var(--hover)]">
          <span className="relative h-[60px] w-[48px] shrink-0 overflow-hidden rounded-[6px] bg-white p-1.5 shadow-[0_0_0_1px_rgba(20,20,18,0.1),0_2px_4px_rgba(20,20,18,0.08)]">
            <span className="block h-1 w-4 rounded-full bg-[#1e1e1e]" /><span className="mt-1.5 block h-[3px] w-6 rounded-full bg-[#d6d6d2]" /><span className="mt-1 block h-[3px] w-5 rounded-full bg-[#d6d6d2]" />
            <span className="mt-2.5 block h-[3px] w-full rounded-full bg-[#e6e6e2]" /><span className="mt-1 block h-[3px] w-full rounded-full bg-[#e6e6e2]" /><span className="mt-1 block h-[3px] w-3/4 rounded-full bg-[#e6e6e2]" />
            <span className="mt-2 ml-auto block h-1 w-3 rounded-full bg-[#1e1e1e]" />
          </span>
          <span className="min-w-0 flex-1 leading-[18px]"><span className="block truncate text-[14px] font-[500]">{b.invoice.toLowerCase()}.pdf</span><span className="block text-[12px] text-[var(--soft)]">2 pages · received by email Oct 2</span></span>
          <FileText {...I} className="text-[var(--faint)]" />
        </a>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-3 py-3 shadow-[inset_0_1px_0_var(--div)]">
        <Button variant="ghost" className="!text-[var(--red)]" onClick={() => toast({ title: `Rejected ${b.vendor.name}` })}>Reject</Button>
        <span className="flex-1" />
        <Button onClick={() => toast({ title: `Asked ${b.owner.name.split(' ')[0]} for changes` })}>Request changes</Button>
        {mine || !holder ? <Button variant="primary" disabled={!mine} onClick={() => approve([b.id])}><Check {...I} />Approve</Button>
          : <Button variant="primary" onClick={() => toast({ title: `Nudged ${holder.name.split(' ')[0]}`, detail: `${b.vendor.name} · due ${b.due}` })}><Bell {...I} />Nudge {holder.name.split(' ')[0]}</Button>}
      </div>
    </>
  )
}

export default function Sheet({ id }: { id: string | null }) {
  const { bills } = useStore()
  const b = bills.find((x) => x.id === id)
  useEffect(() => {
    const f = (e: KeyboardEvent) => { if (e.key === 'Escape' && id) location.hash = '#/bills' }
    addEventListener('keydown', f); return () => removeEventListener('keydown', f)
  }, [id])
  return (
    <AnimatePresence>
      {b && (
        <>
          <motion.div key="bd" className="absolute inset-0 z-30 bg-[rgba(20,20,18,0.06)] dark:bg-[rgba(0,0,0,0.35)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => (location.hash = '#/bills')} />
          <motion.aside key="sh" role="dialog" aria-modal="true" aria-labelledby="sheet-title" className="absolute bottom-2 right-2 top-2 z-40 flex w-[468px] flex-col rounded-[14px] bg-[var(--card)] shadow-[var(--sh-pop)]"
            initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 24, opacity: 0 }} transition={{ duration: 0.25, ease }}>
            <Body b={b} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
