// Tandem workspace, full screen. Flo Hoeller's product grammar: grey sidebar with a setup-guide card, a calm thread where the
// agent shows its work (live thinking timer, sources searched, steps landing one by one), the approval inline, a composer,
// and a run panel that follows the approval's state. Sample data, fictional company.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUp, Books, CaretDown, ChatCircleDots, Check, CheckCircle, CreditCard, DotsThree, Envelope, Gear, House, Lightning, Lock,
  MagnifyingGlass, Microphone, Package, Paperclip, Play, Plus, Robot, ShieldCheck, Tray, Warning,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import Approval, { type ApprovalPhase } from './Approval'
import { AppTile, Avatar, Chip } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const STEPS = ['Read 14 new support tickets', 'Matched 3 to the 30-day refund policy', 'Flagged ORD-4655 as a likely duplicate', 'Drafted replies for all three customers']

function useClock() {
  const still = useReducedMotion()
  const [s, setS] = useState(still ? 99 : 0)
  useEffect(() => { if (still) return; const t0 = performance.now(); const id = setInterval(() => setS((performance.now() - t0) / 1000), 100); return () => clearInterval(id) }, [still])
  return s
}

function NavItem({ icon: I, label, count, active }: { icon: Icon; label: string; count?: number; active?: boolean }) {
  return (
    <a href="#" className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2 text-[13.5px] ${active ? 'bg-white text-[var(--ink)] shadow-[0_0_0_1px_var(--line),0_1px_2px_rgba(0,0,0,0.04)]' : 'text-[#525252] hover:bg-[rgba(0,0,0,0.035)]'}`}>
      <I size={16} weight={active ? 'fill' : 'regular'} className={active ? 'text-[var(--ink)]' : 'text-[var(--soft)]'} />{label}
      {count != null && <span className={`ml-auto tnum text-[12px] ${active ? 'text-[var(--sub)]' : 'text-[var(--soft)]'}`}>{count}</span>}
    </a>
  )
}

export default function Product() {
  const still = useReducedMotion()
  const s = useClock()
  const [ap, setAp] = useState<ApprovalPhase>('idle')
  const think = still ? 7 : Math.min(7, Math.max(0, s - 0.4))
  const stepsShown = still ? STEPS.length : Math.max(0, Math.min(STEPS.length, Math.floor((s - 0.9) / 0.6)))
  const answered = still || s > 3.6
  const done = ap === 'done'

  return (
    <div className="relative mx-auto flex h-[900px] w-[1440px] overflow-hidden bg-white text-[14px]">
      {/* sidebar */}
      <aside className="flex w-[252px] shrink-0 flex-col border-r border-[var(--line)] bg-[#fafafa] px-3 pb-3">
        <div className="flex h-14 items-center gap-2 px-1">
          <span className="relative block size-[22px]"><span className="absolute left-0 top-0 size-[14px] rounded-[4px] bg-[var(--ink)]" /><span className="absolute bottom-0 right-0 size-[14px] rounded-[4px] bg-[var(--blue)] mix-blend-multiply" /></span>
          <span className="text-[14px] font-[600] tracking-[-0.01em]">Northwind Ops</span><CaretDown size={12} className="text-[var(--soft)]" />
          <span className="ml-auto grid size-7 place-items-center rounded-[8px] text-[var(--soft)] hover:bg-[rgba(0,0,0,0.04)]"><Plus size={15} /></span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-[8px] bg-white px-2 text-[13px] text-[var(--soft)] shadow-[0_0_0_1px_var(--line)]"><MagnifyingGlass size={14} />Search<span className="ml-auto rounded-[5px] px-1 font-mono text-[11px] shadow-[inset_0_0_0_1px_var(--line-2)]">⌘K</span></div>
        <nav className="mt-3 space-y-0.5" aria-label="Workspace">
          <NavItem icon={House} label="Home" /><NavItem icon={Tray} label="Inbox" count={4} /><NavItem icon={Play} label="Runs" active />
          <NavItem icon={ShieldCheck} label="Approvals" count={done ? 0 : 1} /><NavItem icon={Robot} label="Agents" /><NavItem icon={Books} label="Knowledge" />
        </nav>
        <div className="mt-5 px-2 text-[12px] font-[500] text-[var(--soft)]">Agents</div>
        <div className="mt-1 space-y-0.5">
          {[['Ops agent', 'Running', 'var(--blue)'], ['Support agent', 'Idle', '#a3a3a3'], ['Finance agent', 'Idle', '#a3a3a3']].map(([n, st, c]) => (
            <a key={n} href="#" className="flex h-8 items-center gap-2.5 rounded-[8px] px-2 text-[13.5px] text-[#525252] hover:bg-[rgba(0,0,0,0.035)]">
              <span className="grid size-5 place-items-center rounded-full bg-[var(--ink)]"><Robot size={11} weight="fill" color="#fff" /></span>{n}
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-[var(--soft)]"><span className="size-1.5 rounded-full" style={{ background: c }} />{st}</span>
            </a>
          ))}
        </div>
        <div className="mt-auto rounded-[14px] bg-white p-3 shadow-[0_0_0_1px_var(--line),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center text-[13px] font-[500]">Setup guide<span className="ml-auto tnum text-[12px] text-[var(--soft)]">3/5</span></div>
          <div className="mt-2 flex gap-1">{[1, 1, 1, 0, 0].map((v, i) => <span key={i} className={`h-1 flex-1 rounded-full ${v ? 'bg-[var(--ink)]' : 'bg-[rgba(0,0,0,0.08)]'}`} />)}</div>
          <div className="mt-2.5 text-[12.5px] text-[var(--sub)]">Next: connect your email</div>
        </div>
        <div className="mt-2 flex items-center gap-2 px-1 pt-2 text-[13px]"><Avatar i="SL" size={24} /><span>Sara Lindgren</span><Gear size={15} className="ml-auto text-[var(--soft)]" /></div>
      </aside>

      {/* thread */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--line)] px-6">
          <h1 className="text-[14px] font-[500]">Morning refunds</h1>
          <Chip tone={done ? 'green' : 'blue'}>{done ? <><Check size={11} weight="bold" />Done</> : <><span className="size-1.5 animate-pulse rounded-full bg-[var(--blue)]" />Ops agent is working</>}</Chip>
          <span className="ml-auto flex items-center gap-1 text-[13px] text-[var(--sub)]"><Lock size={13} />Only you</span>
          <span className="grid size-8 place-items-center rounded-full text-[var(--soft)] hover:bg-[rgba(0,0,0,0.04)]"><DotsThree size={18} weight="bold" /></span>
        </header>
        {/* a real thread anchors to the newest message; older content slides up under a soft top fade */}
        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,#000_72px)]">
          <div className="mx-auto w-[640px] pb-6 pt-7">
            <div className="ml-auto w-fit max-w-[440px] rounded-[16px] bg-[#f4f4f4] px-4 py-2.5 text-[14.5px] leading-[22px]">Process this morning's refund requests and flag anything that looks off.</div>
            <div className="mt-6 flex gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[var(--ink)]"><Robot size={14} weight="fill" color="#fff" /></span>
              <div className="min-w-0 flex-1">
                {/* thinking state: live timer, sources, steps landing one by one */}
                <div className="flex items-center gap-2 text-[13px]">
                  <span className={answered ? 'text-[var(--sub)]' : 'shimmer font-[500]'}>{answered ? 'Worked for' : 'Working'}</span>
                  <span className="tnum text-[var(--soft)]">{think.toFixed(0)}s</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[[Tray, '#f59e0b', 'Support inbox'], [Package, '#10b981', 'Orders'], [CreditCard, '#635bff', 'Payments'], [Books, '#64748b', 'Refund policy']].map(([I, h, t], i) => (
                    <motion.span key={t as string} initial={still ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.35, ease }}><Chip tone="white"><AppTile icon={I as Icon} hue={h as string} size={13} />{t as string}</Chip></motion.span>
                  ))}
                </div>
                <ol className="relative mt-3 space-y-1.5 border-l border-[var(--line-2)] pl-4">
                  {STEPS.slice(0, stepsShown).map((t, i) => (
                    <motion.li key={t} initial={still ? false : { opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }} className="relative flex items-center gap-2 text-[13.5px] text-[#404040]">
                      <span className="absolute -left-[21px] grid size-2.5 place-items-center rounded-full bg-white shadow-[0_0_0_1px_var(--line-2)]"><span className={`size-1 rounded-full ${i === 2 ? 'bg-[var(--amber)]' : 'bg-[var(--green)]'}`} /></span>{t}
                    </motion.li>
                  ))}
                </ol>
                <AnimatePresence>
                  {answered && (
                    <motion.div initial={still ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                      <p className="mt-4 text-[14.5px] leading-[23px] text-[var(--ink)]">Three refunds qualify under the 30-day policy, $147 in total. <span className="rounded-[4px] bg-[var(--amber-tint)] px-1 text-[var(--amber)]">ORD-4655</span> looks like a duplicate of a claim refunded last week, so I left it for you to check.</p>
                      <div className="mt-4"><Approval demo delay={0.6} onPhase={setAp} /></div>
                      <div className="mt-4 flex flex-wrap gap-2">{['Show the duplicate claim', 'Draft a policy reminder', 'Refund ORD-4655 anyway'].map((t) => <span key={t} className="pill-ghost rounded-full px-3 py-1.5 text-[13px]">{t}</span>)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        {/* composer */}
        <div className="px-6 pb-5">
          <div className="mx-auto w-[640px] rounded-[18px] bg-white p-2 shadow-[0_0_0_1px_var(--line-2),0_4px_16px_-8px_rgba(0,0,0,0.12)]">
            <div className="px-2.5 pt-1.5 text-[14px] text-[var(--soft)]">Ask the Ops agent to do something…</div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="grid size-8 place-items-center rounded-full text-[var(--sub)] hover:bg-[rgba(0,0,0,0.04)]"><Paperclip size={16} /></span>
              <span className="pill-ghost flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-[500] text-[#404040]"><ShieldCheck size={14} />Ask before acting</span>
              <span className="ml-auto flex items-center gap-1 px-2 text-[12.5px] text-[var(--sub)]">Auto<CaretDown size={11} /></span>
              <span className="grid size-8 place-items-center rounded-full text-[var(--sub)]"><Microphone size={16} /></span>
              <span className="grid size-8 place-items-center rounded-full bg-[#e5e5e5] text-white"><ArrowUp size={15} weight="bold" /></span>
            </div>
          </div>
        </div>
      </main>

      {/* run panel follows the approval */}
      <aside className="w-[320px] shrink-0 border-l border-[var(--line)] px-5 pt-4">
        <div className="flex h-10 items-center text-[14px] font-[500]">Run details</div>
        <dl className="mt-2 grid grid-cols-[96px_1fr] gap-y-2.5 text-[13px]">
          <dt className="text-[var(--sub)]">Status</dt>
          <dd><AnimatePresence mode="wait" initial={false}><motion.span key={ap} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.2 }} className="inline-flex">
            {done ? <Chip tone="green"><CheckCircle size={12} weight="fill" />Completed</Chip> : ap === 'running' ? <Chip tone="blue">Refunding</Chip> : answered ? <Chip tone="amber"><Warning size={12} weight="fill" />Waiting for you</Chip> : <Chip tone="blue">Working</Chip>}
          </motion.span></AnimatePresence></dd>
          <dt className="text-[var(--sub)]">Agent</dt><dd className="flex items-center gap-1.5"><Robot size={13} />Ops agent</dd>
          <dt className="text-[var(--sub)]">Started</dt><dd className="tnum">09:12 today</dd>
          <dt className="text-[var(--sub)]">Cost</dt><dd className="tnum">$0.04</dd>
        </dl>
        <div className="mt-6 text-[12.5px] font-[500] text-[var(--soft)]">Permissions</div>
        <div className="mt-2 space-y-1.5 text-[13px]">
          {[[Package, 'Read orders', 'Allowed'], [CreditCard, 'Issue refunds', 'Ask first'], [Envelope, 'Email customers', 'Allowed'], [ChatCircleDots, 'Reply in support', 'Ask first']].map(([I, t, v]) => {
            const C = I as Icon
            return <div key={t as string} className="flex h-9 items-center gap-2.5 rounded-[9px] px-2.5 shadow-[inset_0_0_0_1px_var(--line)]"><C size={15} className="text-[var(--sub)]" />{t as string}<span className={`ml-auto text-[12px] ${v === 'Ask first' ? 'text-[var(--amber)]' : 'text-[var(--soft)]'}`}>{v as string}</span></div>
          })}
        </div>
        <div className="mt-6 text-[12.5px] font-[500] text-[var(--soft)]">Activity</div>
        <ol className="relative mt-2 space-y-3 pl-4 text-[13px]">
          <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px bg-[var(--line-2)]" />
          {[
            ['Run started from a message', '09:12', true],
            ['Read 14 tickets, 3 orders matched', '09:12', s > 2 || still],
            ['Asked Sara to approve $147.00', '09:13', answered],
            ['Refunded 3 orders, customers emailed', '09:13', done],
          ].map(([t, w, on]) => (
            <li key={t as string} className="relative flex items-start gap-2">
              {/* pending steps read as pending (hollow dot, muted text), not as faded-out content */}
              <span className={`absolute -left-4 top-[7px] size-[7px] rounded-full transition-colors duration-500 ${on ? 'bg-[var(--ink)]' : 'bg-white shadow-[inset_0_0_0_1.5px_#c4c4c4]'}`} />
              <span className={`flex-1 transition-colors duration-500 ${on ? 'text-[#404040]' : 'text-[var(--soft)]'}`}>{t as string}</span><span className="tnum text-[12px] text-[var(--soft)]">{on ? (w as string) : '·'}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-[12px] bg-[var(--panel)] p-3 text-[12.5px] leading-[19px] text-[var(--sub)]"><Lightning size={13} weight="fill" className="mb-1 text-[var(--ink)]" />Refunds above $500 or more than 5 orders always need two approvers.</div>
      </aside>
    </div>
  )
}
