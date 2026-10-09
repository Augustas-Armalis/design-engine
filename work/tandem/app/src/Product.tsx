// Tandem workspace, round 2 (founder: "use lucide icons, a better sidebar, properly placed stuff").
// Grid: sidebar rows are 32px with the icon at x=12 and the label at x=38 on every row; counts sit in one right column;
// section labels share the rows' left edge. Lucide 16px at stroke 1.75 everywhere. The thread anchors to the newest message,
// the agent shows its work, the approval sits inline and the run panel follows it. Sample data, fictional company.
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUp, BookOpen, ChevronDown, CircleCheck, Clock, CreditCard, Ellipsis, House, Inbox, Lock, Mail, MessageCircle, Mic,
  PanelLeft, Paperclip, Play, Search, Settings, ShieldCheck, SquarePen, TriangleAlert, Package, Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Approval, { type ApprovalPhase } from './Approval'
import { AppTile, Avatar, Chip } from './ui'
import { AgentMark } from './Logo'

const ease = [0.22, 1, 0.36, 1] as const
const SW = 1.75
const STEPS = ['Read 14 new support tickets', 'Matched 3 to the 30-day refund policy', 'Flagged ORD-4655 as a likely duplicate', 'Drafted replies for all three customers']

function useClock() {
  const still = useReducedMotion()
  const [s, setS] = useState(still ? 99 : 0)
  useEffect(() => { if (still) return; const t0 = performance.now(); const id = setInterval(() => setS((performance.now() - t0) / 1000), 100); return () => clearInterval(id) }, [still])
  return s
}

function Row({ icon: I, children, right, active }: { icon?: LucideIcon; children: ReactNode; right?: ReactNode; active?: boolean }) {
  return (
    <a href="#" className={`flex h-8 items-center rounded-[8px] pl-3 pr-2.5 text-[13.5px] transition-colors ${active ? 'bg-white text-[var(--ink)] shadow-[0_0_0_1px_var(--line),0_1px_2px_rgba(0,0,0,0.04)]' : 'text-[#4b4b4b] hover:bg-[rgba(0,0,0,0.04)]'}`}>
      {I && <I size={16} strokeWidth={SW} className={`mr-2.5 shrink-0 ${active ? 'text-[var(--ink)]' : 'text-[#7a7a7a]'}`} />}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {right != null && <span className="ml-2 tnum text-[12px] text-[var(--soft)]">{right}</span>}
    </a>
  )
}
const Label = ({ children }: { children: ReactNode }) => <div className="mb-1 mt-5 flex h-6 items-center pl-3 text-[12px] font-[500] text-[var(--soft)]">{children}</div>

function AgentRow({ name, live }: { name: string; live?: boolean }) {
  return (
    <a href="#" className="flex h-8 items-center rounded-[8px] pl-2.5 pr-2.5 text-[13.5px] text-[#4b4b4b] hover:bg-[rgba(0,0,0,0.04)]">
      <span className="relative mr-2 grid size-5 shrink-0 place-items-center">
        <AgentMark size={20} />
        <span className={`absolute -bottom-px -right-px size-[7px] rounded-full ring-2 ring-[#fafafa] ${live ? 'bg-[var(--blue)]' : 'bg-[#c7c7c7]'}`} />
      </span>
      <span className="flex-1 truncate">{name}</span>
      {live && <span className="text-[12px] text-[var(--soft)]">1 run</span>}
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
      <aside className="flex w-[256px] shrink-0 flex-col border-r border-[var(--line)] bg-[#fafafa] px-2.5 pb-2.5">
        {/* workspace switcher: one tile, name, chevron; collapse on the right */}
        <div className="flex h-14 items-center pl-2 pr-1">
          <span className="mr-2.5 grid size-6 shrink-0 place-items-center rounded-[7px] bg-[linear-gradient(180deg,#3b77ff,#2559e6)] text-[12px] font-[600] text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]">N</span>
          <span className="truncate text-[14px] font-[600] tracking-[-0.01em]">Northwind Ops</span><ChevronDown size={14} strokeWidth={SW} className="ml-1 shrink-0 text-[var(--soft)]" />
          <button type="button" aria-label="Collapse sidebar" className="ml-auto grid size-8 place-items-center rounded-[8px] text-[#7a7a7a] hover:bg-[rgba(0,0,0,0.04)]"><PanelLeft size={16} strokeWidth={SW} /></button>
        </div>
        {/* search as a quiet field, the same left edge as every row below */}
        <button type="button" className="flex h-8 w-full items-center rounded-[8px] bg-white pl-3 pr-1.5 text-[13.5px] text-[var(--soft)] shadow-[0_0_0_1px_var(--line),0_1px_2px_rgba(0,0,0,0.03)]">
          <Search size={15} strokeWidth={SW} className="mr-2.5" />Search<span className="ml-auto rounded-[5px] px-1.5 py-0.5 font-mono text-[11px] text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line-2)]">⌘K</span>
        </button>
        <nav className="mt-3 space-y-px" aria-label="Workspace">
          <Row icon={SquarePen}>New run</Row>
          <Row icon={House}>Home</Row>
          <Row icon={Inbox} right={4}>Inbox</Row>
          <Row icon={Play} active right={1}>Runs</Row>
          <Row icon={ShieldCheck} right={done ? undefined : 1}>Approvals</Row>
          <Row icon={BookOpen}>Knowledge</Row>
        </nav>
        <Label>Agents</Label>
        <div className="space-y-px"><AgentRow name="Ops agent" live /><AgentRow name="Support agent" /><AgentRow name="Finance agent" /></div>
        <Label>Recent runs</Label>
        <div className="space-y-px">
          <Row icon={done ? CircleCheck : Clock} active={false}>Morning refunds</Row>
          <Row icon={CircleCheck}>Weekly churn digest</Row>
          <Row icon={CircleCheck}>Reconcile Stripe payouts</Row>
          <Row icon={CircleCheck}>Tag new support tickets</Row>
        </div>
        <div className="mt-auto rounded-[12px] bg-white p-3 shadow-[0_0_0_1px_var(--line),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center text-[13px] font-[500]">Setup guide<span className="ml-auto tnum text-[12px] font-[400] text-[var(--soft)]">3 of 5</span></div>
          <div className="mt-2 flex gap-1">{[1, 1, 1, 0, 0].map((v, i) => <span key={i} className={`h-1 flex-1 rounded-full ${v ? 'bg-[var(--ink)]' : 'bg-[rgba(0,0,0,0.08)]'}`} />)}</div>
          <div className="mt-2.5 text-[12.5px] text-[var(--sub)]">Next: connect your email</div>
        </div>
        <div className="mt-2 flex h-10 items-center gap-2.5 pl-2.5 pr-1 text-[13px]"><Avatar i="SL" size={22} /><span className="flex-1">Sara Lindgren</span><button type="button" aria-label="Settings" className="grid size-8 place-items-center rounded-[8px] text-[#7a7a7a] hover:bg-[rgba(0,0,0,0.04)]"><Settings size={16} strokeWidth={SW} /></button></div>
      </aside>

      {/* thread */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--line)] px-6">
          <h1 className="text-[14px] font-[500]">Morning refunds</h1>
          <Chip tone={done ? 'green' : 'blue'}>{done ? <><CircleCheck size={12} strokeWidth={2} />Done</> : <><span className="size-1.5 animate-pulse rounded-full bg-[var(--blue)]" />Ops agent is working</>}</Chip>
          <span className="ml-auto flex items-center gap-1.5 text-[13px] text-[var(--sub)]"><Lock size={13} strokeWidth={SW} />Only you</span>
          <button type="button" aria-label="More" className="grid size-8 place-items-center rounded-[8px] text-[#7a7a7a] hover:bg-[rgba(0,0,0,0.04)]"><Ellipsis size={17} strokeWidth={SW} /></button>
        </header>
        {/* a real thread anchors to the newest message; older content slides up under a soft top fade */}
        <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,#000_72px)]">
          <div className="mx-auto w-[640px] pb-6 pt-7">
            <div className="ml-auto w-fit max-w-[440px] rounded-[16px] bg-[#f4f4f4] px-4 py-2.5 text-[14.5px] leading-[22px]">Process this morning's refund requests and flag anything that looks off.</div>
            <div className="mt-6 grid grid-cols-[28px_1fr] gap-x-3">
              <span className="mt-[1px] grid size-7 place-items-center"><AgentMark size={28} /></span>
              <div className="min-w-0">
                <div className="flex h-7 items-center gap-2 text-[13px]">
                  <span className={answered ? 'text-[var(--sub)]' : 'shimmer font-[500]'}>{answered ? 'Worked for' : 'Working'}</span>
                  <span className="tnum text-[var(--soft)]">{think.toFixed(0)}s</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {([[Inbox, '#f59e0b', 'Support inbox'], [Package, '#10b981', 'Orders'], [CreditCard, '#635bff', 'Payments'], [BookOpen, '#64748b', 'Refund policy']] as [LucideIcon, string, string][]).map(([I, h, t], i) => (
                    <motion.span key={t} initial={still ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.35, ease }}><Chip tone="white"><AppTile icon={I} hue={h} size={14} />{t}</Chip></motion.span>
                  ))}
                </div>
                <ol className="relative mt-3 space-y-1.5 border-l border-[var(--line-2)] pl-4">
                  {STEPS.slice(0, stepsShown).map((t, i) => (
                    <motion.li key={t} initial={still ? false : { opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }} className="relative flex h-[22px] items-center text-[13.5px] text-[#404040]">
                      <span className="absolute -left-[20.5px] grid size-2 place-items-center rounded-full bg-white shadow-[0_0_0_1px_var(--line-2)]"><span className={`size-1 rounded-full ${i === 2 ? 'bg-[var(--amber)]' : 'bg-[var(--green)]'}`} /></span>{t}
                    </motion.li>
                  ))}
                </ol>
                <AnimatePresence>
                  {answered && (
                    <motion.div initial={still ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                      <p className="mt-4 text-[14.5px] leading-[23px] text-[var(--ink)]">Three refunds qualify under the 30-day policy, $147 in total. <span className="rounded-[4px] bg-[var(--amber-tint)] px-1 text-[var(--amber)]">ORD-4655</span> looks like a duplicate of a claim refunded last week, so I left it for you to check.</p>
                      <div className="mt-4"><Approval demo delay={0.6} onPhase={setAp} /></div>
                      <div className="mt-4 flex flex-wrap gap-2">{['Show the duplicate claim', 'Draft a policy reminder', 'Refund ORD-4655 anyway'].map((t) => <span key={t} className="pill-ghost flex h-8 items-center rounded-full px-3 text-[13px]">{t}</span>)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pb-5">
          <div className="mx-auto w-[640px] rounded-[18px] bg-white p-2 shadow-[0_0_0_1px_var(--line-2),0_4px_16px_-8px_rgba(0,0,0,0.12)]">
            <div className="px-2.5 pt-1.5 text-[14px] text-[var(--soft)]">Ask the Ops agent to do something…</div>
            <div className="mt-3 flex items-center gap-1">
              <button type="button" aria-label="Attach" className="grid size-8 place-items-center rounded-full text-[#6b6b6b] hover:bg-[rgba(0,0,0,0.04)]"><Paperclip size={16} strokeWidth={SW} /></button>
              <span className="pill-ghost flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-[500] text-[#404040]"><ShieldCheck size={14} strokeWidth={SW} />Ask before acting</span>
              <span className="ml-auto flex h-8 items-center gap-1 px-2 text-[12.5px] text-[var(--sub)]">Auto<ChevronDown size={13} strokeWidth={SW} /></span>
              <button type="button" aria-label="Dictate" className="grid size-8 place-items-center rounded-full text-[#6b6b6b] hover:bg-[rgba(0,0,0,0.04)]"><Mic size={16} strokeWidth={SW} /></button>
              <span className="grid size-8 place-items-center rounded-full bg-[#e5e5e5] text-white"><ArrowUp size={15} strokeWidth={2.25} /></span>
            </div>
          </div>
        </div>
      </main>

      {/* run panel */}
      <aside className="w-[320px] shrink-0 border-l border-[var(--line)] px-5">
        <div className="flex h-14 items-center text-[14px] font-[500]">Run details</div>
        <dl className="grid grid-cols-[88px_1fr] items-center gap-y-3 text-[13px]">
          <dt className="text-[var(--sub)]">Status</dt>
          <dd className="flex"><AnimatePresence mode="wait" initial={false}><motion.span key={ap + String(answered)} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.2 }} className="inline-flex">
            {done ? <Chip tone="green"><CircleCheck size={12} strokeWidth={2} />Completed</Chip> : ap === 'running' ? <Chip tone="blue">Refunding</Chip> : answered ? <Chip tone="amber"><TriangleAlert size={12} strokeWidth={2} />Waiting for you</Chip> : <Chip tone="blue">Working</Chip>}
          </motion.span></AnimatePresence></dd>
          <dt className="text-[var(--sub)]">Agent</dt><dd className="flex items-center gap-1.5"><AgentMark size={14} />Ops agent</dd>
          <dt className="text-[var(--sub)]">Started</dt><dd className="tnum">09:12 today</dd>
          <dt className="text-[var(--sub)]">Cost</dt><dd className="tnum">$0.04</dd>
        </dl>
        <div className="mb-2 mt-7 text-[12px] font-[500] text-[var(--soft)]">Permissions</div>
        <div className="overflow-hidden rounded-[12px] text-[13px] shadow-[inset_0_0_0_1px_var(--line)]">
          {([[Package, 'Read orders', 'Allowed'], [CreditCard, 'Issue refunds', 'Ask first'], [Mail, 'Email customers', 'Allowed'], [MessageCircle, 'Reply in support', 'Ask first']] as [LucideIcon, string, string][]).map(([I, t, v], i) => (
            <div key={t} className={`flex h-10 items-center gap-2.5 px-3 ${i ? 'border-t border-[var(--line)]' : ''}`}><I size={15} strokeWidth={SW} className="text-[#6b6b6b]" />{t}<span className={`ml-auto text-[12px] ${v === 'Ask first' ? 'text-[var(--amber)]' : 'text-[var(--soft)]'}`}>{v}</span></div>
          ))}
        </div>
        <div className="mb-2 mt-7 text-[12px] font-[500] text-[var(--soft)]">Activity</div>
        <ol className="relative space-y-3 pl-4 text-[13px]">
          <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px bg-[var(--line-2)]" />
          {[
            ['Run started from a message', '09:12', true],
            ['Read 14 tickets, matched 3 orders', '09:12', s > 2 || still],
            ['Asked Sara to approve $147.00', '09:13', answered],
            ['Refunded 3 orders, emailed customers', '09:13', done],
          ].map(([t, w, on]) => (
            <li key={t as string} className="relative flex items-start gap-2">
              <span className={`absolute -left-4 top-[7px] size-[7px] rounded-full transition-colors duration-500 ${on ? 'bg-[var(--ink)]' : 'bg-white shadow-[inset_0_0_0_1.5px_#c4c4c4]'}`} />
              <span className={`flex-1 transition-colors duration-500 ${on ? 'text-[#404040]' : 'text-[var(--soft)]'}`}>{t as string}</span><span className="tnum text-[12px] text-[var(--soft)]">{on ? (w as string) : ''}</span>
            </li>
          ))}
        </ol>
        <div className="mt-7 flex gap-2.5 rounded-[12px] bg-[var(--panel)] p-3 text-[12.5px] leading-[19px] text-[var(--sub)]"><Zap size={14} strokeWidth={SW} className="mt-[2px] shrink-0 text-[#404040]" />Refunds above $500, or more than 5 orders, always need two approvers.</div>
      </aside>
    </div>
  )
}
