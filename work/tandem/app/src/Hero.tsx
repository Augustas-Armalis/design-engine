// Tandem hero in Flo Hoeller's affectUI grammar: a calm centred headline (Inter 500, small and tight) inside a depth-of-field
// collage of real Tandem UI fragments. Each fragment sits on its own tilted plane at its own focus distance (blur + opacity),
// lands out of a deeper blur on load, then drifts a few px. The live Approval card is the one sharp fragment beside the copy.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, CalendarBlank, ChartLineUp, Check, CreditCard, Cursor, Database, Envelope, Globe, Kanban, Lightning, MagnifyingGlass, Microphone, Package, Paperclip, ArrowUp, Storefront, Tray } from '@phosphor-icons/react'
import { Reveal } from './kit'
import Approval from './Approval'
import { AppTile, Avatar, Chip } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
type Frag = { x: number; y: number; rx: number; ry: number; rz: number; blur: number; o: number; s?: number; d: number; children: ReactNode; w?: number }

function Plane({ f, i }: { f: Frag; i: number }) {
  const still = useReducedMotion()
  return (
    <motion.div aria-hidden className="pointer-events-none absolute" style={{ left: f.x, top: f.y, width: f.w, perspective: 1100 }}
      initial={still ? false : { opacity: 0, filter: `blur(${f.blur + 10}px)`, y: 24 }} animate={{ opacity: f.o, filter: `blur(${f.blur}px)`, y: 0 }}
      transition={{ delay: f.d, duration: 1.4, ease }}>
      <motion.div style={{ transform: `rotateX(${f.rx}deg) rotateY(${f.ry}deg) rotateZ(${f.rz}deg) scale(${f.s ?? 1})`, transformOrigin: '50% 50%' }}
        animate={still ? undefined : { y: [0, i % 2 ? -6 : 6, 0] }} transition={{ duration: 9 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: f.d + 1.4 }}>
        {f.children}
      </motion.div>
    </motion.div>
  )
}

const card = 'rounded-[14px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04),0_14px_34px_-16px_rgba(0,0,0,0.2)]'

const FRAGS: Frag[] = [
  { x: 74, y: 128, rx: 18, ry: -16, rz: -8, blur: 0.6, o: 0.95, d: 0.35, w: 300, children: (
    <div className={`${card} p-3.5`}>
      <div className="flex items-center gap-2 text-[12px] text-[var(--sub)]"><span className="size-1.5 rounded-full bg-[var(--blue)]" />Thinking <span className="tnum">4s</span></div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {[[Tray, '#f59e0b', 'Support inbox'], [Package, '#10b981', 'Orders'], [CreditCard, '#635bff', 'Payments']].map(([I, h, t]) => <Chip key={t as string} tone="white"><AppTile icon={I as never} hue={h as string} size={13} />{t as string}</Chip>)}
      </div>
      <div className="mt-3 space-y-1.5 text-[12.5px]">
        {['Read 14 new tickets', 'Matched 3 to the refund policy', 'Flagged 1 duplicate claim'].map((t, i) => <div key={t} className="flex items-center gap-2"><Check size={12} weight="bold" className={i < 2 ? 'text-[var(--green)]' : 'text-[var(--amber)]'} /><span className="text-[#404040]">{t}</span></div>)}
      </div>
    </div>) },
  { x: 150, y: 470, rx: 22, ry: -22, rz: 6, blur: 3.5, o: 0.75, d: 0.5, w: 290, children: (
    <div className={`${card} p-4`}>
      <div className="text-[12px] text-[var(--sub)]">Hours saved this month</div>
      <div className="mt-1 flex items-baseline gap-2"><span className="text-[24px] font-[550] tracking-[-0.02em]">312h</span><Chip tone="green">+38%</Chip></div>
      <svg viewBox="0 0 200 60" className="mt-3 h-[60px] w-full" aria-hidden><path d="M0,52 C30,48 40,40 70,38 S120,22 140,24 S180,8 200,6" fill="none" stroke="#2f6bff" strokeWidth="2" /><path d="M0,52 C30,48 40,40 70,38 S120,22 140,24 S180,8 200,6 L200,60 L0,60Z" fill="url(#g1)" opacity="0.15" /><defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#2f6bff" /><stop offset="1" stopColor="#2f6bff" stopOpacity="0" /></linearGradient></defs></svg>
    </div>) },
  { x: 40, y: 742, rx: 30, ry: -10, rz: -4, blur: 7, o: 0.5, d: 0.6, w: 340, children: (
    <div className={`${card} flex items-center gap-3 px-3 py-2.5`}><Paperclip size={14} className="text-[var(--soft)]" /><span className="flex-1 text-[13px] text-[var(--soft)]">Ask Tandem to handle something…</span><Microphone size={14} className="text-[var(--soft)]" /><span className="grid size-6 place-items-center rounded-full bg-[#e5e5e5]"><ArrowUp size={12} weight="bold" className="text-white" /></span></div>) },
  { x: 1102, y: 120, rx: 22, ry: 20, rz: 10, blur: 2.5, o: 0.85, d: 0.45, w: 280, children: (
    <div className="grid grid-cols-5 gap-2.5 rounded-[18px] bg-[#fbfbfb] p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
      {[[Tray, '#f59e0b'], [Package, '#10b981'], [CreditCard, '#635bff'], [Envelope, '#ef4444'], [CalendarBlank, '#0ea5e9'], [Database, '#64748b'], [Kanban, '#8b5cf6'], [Globe, '#14b8a6'], [Storefront, '#f97316'], [ChartLineUp, '#2f6bff']].map(([I, h], k) => <span key={k} className="grid size-10 place-items-center rounded-[10px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.12)]"><AppTile icon={I as never} hue={h as string} size={22} /></span>)}
    </div>) },
  { x: 1150, y: 600, rx: 26, ry: 18, rz: -6, blur: 5, o: 0.6, d: 0.55, w: 270, children: (
    <div className={`${card} p-3`}>
      <div className="mb-2 flex items-center gap-2 text-[12px] font-[500]"><Tray size={14} />Inbox<span className="ml-auto text-[var(--soft)]">4 new</span></div>
      {[['MR', 'Refund for ORD-4821'], ['JW', 'Wrong size, can I swap?'], ['AK', 'Parcel never arrived']].map(([a, t]) => <div key={t} className="flex items-center gap-2 py-1.5 text-[12px]"><Avatar i={a} size={18} /><span className="truncate text-[#404040]">{t}</span></div>)}
    </div>) },
  { x: 560, y: 92, rx: 34, ry: 0, rz: 2, blur: 9, o: 0.38, d: 0.3, w: 320, children: (
    <div className={`${card} flex items-center gap-2.5 px-3 py-2.5 text-[13px]`}><span className="grid size-6 place-items-center rounded-full bg-[var(--green-tint)]"><Check size={12} weight="bold" className="text-[var(--green)]" /></span>Refunded $147.00<span className="ml-auto text-[var(--soft)]">just now</span></div>) },
  { x: 610, y: 760, rx: 38, ry: 4, rz: -3, blur: 10, o: 0.32, d: 0.4, w: 300, children: (
    <div className={`${card} flex items-center gap-2 px-3 py-2.5 text-[13px] text-[var(--soft)]`}><MagnifyingGlass size={14} />Search runs, agents, approvals<span className="ml-auto rounded-[5px] px-1 font-mono text-[11px] shadow-[inset_0_0_0_1px_var(--line-2)]">⌘K</span></div>) },
]

export default function Hero() {
  const still = useReducedMotion()
  return (
    <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-white">
      {FRAGS.map((f, i) => <Plane key={i} f={f} i={i} />)}
      {/* the one sharp product fragment, live */}
      <motion.div className="absolute left-[1066px] top-[318px] z-10" style={{ perspective: 1200 }}
        initial={still ? false : { opacity: 0, filter: 'blur(12px)', y: 30 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ delay: 0.7, duration: 1.4, ease }}>
        <div style={{ transform: 'rotateX(8deg) rotateY(-16deg) rotateZ(3deg) scale(0.8)', transformOrigin: '0% 50%' }} inert>
          <Approval demo delay={1.4} />
        </div>
        <motion.span aria-hidden className="absolute left-[230px] top-[330px]" initial={{ opacity: 0, x: 40, y: 30 }} animate={{ opacity: [0, 1, 1, 0], x: [40, 0, 0, 10], y: [30, 0, 0, 6] }}
          transition={{ delay: 2.4, duration: 3.2, times: [0, 0.25, 0.8, 1], ease }}>
          <Cursor size={22} weight="fill" className="text-[var(--ink)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] [&_path]:[paint-order:stroke] [&_path]:stroke-white [&_path]:[stroke-width:22px]" />
        </motion.span>
      </motion.div>
      {/* a white bloom behind the copy keeps the type on clean paper */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[230px] h-[520px] w-[860px] -translate-x-1/2 bg-[radial-gradient(closest-side,#fff_55%,rgba(255,255,255,0))]" />

      {/* announcement + nav */}
      <Reveal at={0.02} y={-4} className="absolute inset-x-0 top-0 z-40">
        <a href="#" className="flex h-[30px] items-center justify-center gap-1.5 border-b border-[rgba(201,26,116,0.08)] bg-[#fdf6f9] text-[12.5px] text-[var(--pink)]"><Lightning size={13} weight="fill" />New · hold-to-approve for refunds and payouts<span className="underline underline-offset-2">See what changed</span><ArrowRight size={12} /></a>
        <header className="mx-auto flex h-[64px] w-[1200px] items-center">
          <a href="#" aria-label="Tandem home" className="flex items-center gap-2"><span className="relative block size-[22px]"><span className="absolute left-0 top-0 size-[14px] rounded-[4px] bg-[var(--ink)]" /><span className="absolute bottom-0 right-0 size-[14px] rounded-[4px] bg-[var(--blue)] mix-blend-multiply" /></span><span className="text-[19px] font-[600] tracking-[-0.03em]">Tandem</span></a>
          <nav aria-label="Main" className="ml-10"><ul className="flex">{['Product', 'Agents', 'Docs', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-full px-3.5 text-[13.5px] font-[500] text-[var(--sub)] transition-colors hover:bg-[rgba(0,0,0,0.04)] hover:text-[var(--ink)]">{l}</a></li>)}</ul></nav>
          <a href="#" className="pill-ghost press ml-auto flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Log in</a>
          <a href="#" className="pill-dark press ml-2 flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Start free</a>
        </header>
      </Reveal>

      <main className="pointer-events-none absolute inset-x-0 top-[318px] z-20 flex flex-col items-center text-center [&>*]:pointer-events-auto">
        <Reveal at={0.1} y={12} blur>
          <h1 className="text-[52px] font-[500] leading-[1.08] tracking-[-0.032em]">Agents That Ask<br />Before They Act</h1>
        </Reveal>
        <Reveal at={0.18} y={12} blur>
          <p className="mt-5 text-[17px] leading-[26px] text-[var(--sub)]">Tandem runs the busywork across your tools and checks in when it matters.<br />Every action is scoped, shown to you first, and easy to undo.</p>
        </Reveal>
        <Reveal at={0.26} y={12}>
          <div className="mt-8 flex items-center gap-2.5">
            <a href="#" className="pill-dark press flex h-[42px] items-center rounded-full px-5 text-[14.5px] font-[500]">Start free</a>
            <a href="#" className="pill-ghost press flex h-[42px] items-center rounded-full px-5 text-[14.5px] font-[500]">See an approval</a>
          </div>
        </Reveal>
      </main>
    </div>
  )
}
