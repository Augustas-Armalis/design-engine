// Tandem hero, round 2 (founder: v1 collage was "badly designed for this minimalism"). Calm and symmetric: a centred
// headline, then the product moment as the single focal object (the live Approval card, sharp, centred) with two ghost
// siblings angled in from each side at one depth and two fainter ones further out, all fading into white. One focus logic:
// the nearer to the centre, the sharper. Lucide icons.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, BookOpen, Check, CreditCard, Inbox, Package, Zap } from 'lucide-react'
import { Reveal } from './kit'
import Approval from './Approval'
import { AppTile, Avatar, Chip } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const card = 'rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04),0_14px_34px_-16px_rgba(0,0,0,0.18)]'

/** a ghost sibling: mirrored by side, one tilt per depth, one blur and opacity per depth */
function Ghost({ side, depth, x, y, w, children, at }: { side: 'l' | 'r'; depth: 1 | 2; x: number; y: number; w: number; children: ReactNode; at: number }) {
  const still = useReducedMotion()
  const k = side === 'l' ? 1 : -1
  const look = depth === 1 ? { blur: 1.5, o: 0.7, ry: 24, s: 0.92 } : { blur: 6, o: 0.32, ry: 34, s: 0.84 }
  return (
    <motion.div aria-hidden className="pointer-events-none absolute" style={{ left: x, top: y, width: w, perspective: 1200 }}
      initial={still ? false : { opacity: 0, x: -k * 40, filter: `blur(${look.blur + 8}px)` }} animate={{ opacity: look.o, x: 0, filter: `blur(${look.blur}px)` }}
      transition={{ delay: at, duration: 1.3, ease }}>
      <div style={{ transform: `rotateY(${k * look.ry}deg) scale(${look.s})`, transformOrigin: side === 'l' ? '100% 50%' : '0% 50%' }}>{children}</div>
    </motion.div>
  )
}

export default function Hero() {
  const still = useReducedMotion()
  return (
    <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-white">
      <Reveal at={0.02} y={-4} className="absolute inset-x-0 top-0 z-40">
        <a href="#" className="flex h-[30px] items-center justify-center gap-1.5 border-b border-[rgba(201,26,116,0.08)] bg-[#fdf6f9] text-[12.5px] text-[var(--pink)]"><Zap size={13} fill="currentColor" strokeWidth={0} />New · hold-to-approve for refunds and payouts<span className="underline underline-offset-2">See what changed</span><ArrowRight size={12} strokeWidth={2} /></a>
        <header className="mx-auto flex h-[64px] w-[1200px] items-center">
          <a href="#" aria-label="Tandem home" className="flex items-center gap-2"><span className="relative block size-[22px]"><span className="absolute left-0 top-0 size-[14px] rounded-[4px] bg-[var(--ink)]" /><span className="absolute bottom-0 right-0 size-[14px] rounded-[4px] bg-[var(--blue)] mix-blend-multiply" /></span><span className="text-[19px] font-[600] tracking-[-0.03em]">Tandem</span></a>
          <nav aria-label="Main" className="ml-10"><ul className="flex">{['Product', 'Agents', 'Docs', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-full px-3.5 text-[13.5px] font-[500] text-[var(--sub)] transition-colors hover:bg-[rgba(0,0,0,0.04)] hover:text-[var(--ink)]">{l}</a></li>)}</ul></nav>
          <a href="#" className="pill-ghost press ml-auto flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Log in</a>
          <a href="#" className="pill-dark press ml-2 flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Start free</a>
        </header>
      </Reveal>

      <main className="pointer-events-none absolute inset-x-0 top-[150px] z-20 flex flex-col items-center text-center [&>*]:pointer-events-auto">
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

      {/* stage: mirrored ghosts, sharp centre */}
      <Ghost side="l" depth={2} x={-30} y={520} w={300} at={0.55}>
        <div className={`${card} p-4`}><div className="text-[12px] text-[var(--sub)]">Hours saved this month</div><div className="mt-1 text-[24px] font-[550] tracking-[-0.02em]">312h</div><div className="mt-3 h-[48px] rounded-[8px] bg-[linear-gradient(180deg,rgba(47,107,255,0.14),rgba(47,107,255,0))]" /></div>
      </Ghost>
      <Ghost side="r" depth={2} x={1170} y={520} w={300} at={0.55}>
        <div className={`${card} p-4`}><div className="mb-2 flex items-center gap-2 text-[12px] font-[500]"><Inbox size={14} strokeWidth={1.75} />Inbox</div>{[['MR', 'Refund for ORD-4821'], ['JW', 'Wrong size, can I swap?']].map(([a, t]) => <div key={t} className="flex items-center gap-2 py-1.5 text-[12px]"><Avatar i={a} size={18} /><span className="truncate text-[#404040]">{t}</span></div>)}</div>
      </Ghost>
      <Ghost side="l" depth={1} x={232} y={486} w={316} at={0.45}>
        <div className={`${card} p-4`}>
          <div className="flex items-center gap-2 text-[12px] text-[var(--sub)]"><span className="size-1.5 rounded-full bg-[var(--blue)]" />Worked for <span className="tnum">7s</span></div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">{([[Inbox, '#f59e0b', 'Support inbox'], [Package, '#10b981', 'Orders'], [CreditCard, '#635bff', 'Payments'], [BookOpen, '#64748b', 'Policy']] as const).map(([I, h, t]) => <Chip key={t} tone="white"><AppTile icon={I} hue={h} size={13} />{t}</Chip>)}</div>
          <div className="mt-3 space-y-1.5 text-[12.5px]">{['Read 14 new tickets', 'Matched 3 to the refund policy', 'Flagged 1 duplicate claim'].map((t, i) => <div key={t} className="flex items-center gap-2"><Check size={12} strokeWidth={2.5} className={i < 2 ? 'text-[var(--green)]' : 'text-[var(--amber)]'} /><span className="text-[#404040]">{t}</span></div>)}</div>
        </div>
      </Ghost>
      <Ghost side="r" depth={1} x={892} y={486} w={316} at={0.45}>
        <div className={`${card} p-4`}>
          <div className="flex items-center gap-2 text-[12px] text-[var(--sub)]"><span className="size-1.5 rounded-full bg-[var(--green)]" />Earlier today</div>
          {[['Refunded $98.00', '2 orders · undo expired'], ['Paused a $2,400 payout', 'needs a second approver'], ['Replied to 9 tickets', 'all within policy']].map(([a, b]) => <div key={a} className="mt-2.5 flex items-start gap-2.5 text-[12.5px]"><span className="mt-[3px] grid size-4 place-items-center rounded-full bg-[var(--green-tint)]"><Check size={10} strokeWidth={3} className="text-[var(--green)]" /></span><div><div className="text-[var(--ink)]">{a}</div><div className="text-[var(--sub)]">{b}</div></div></div>)}
        </div>
      </Ghost>

      <motion.div className="absolute left-1/2 top-[452px] z-10 -translate-x-1/2" initial={still ? false : { opacity: 0, y: 36, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.35, duration: 1.2, ease }} role="img" aria-label="Tandem approval request, sample: the Ops agent asks to refund 3 orders; it is held to approve and completes with an undo receipt">
        <div inert><Approval demo delay={0.9} /></div>
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),#fff)]" />
    </div>
  )
}
