// Tandem hero, round 2 (founder: v1 collage was "badly designed for this minimalism"). Calm and symmetric: a centred
// headline, then the product moment as the single focal object (the live Approval card, sharp, centred) with two ghost
// siblings angled in from each side at one depth and two fainter ones further out, all fading into white. One focus logic:
// the nearer to the centre, the sharper. Lucide icons.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, BookOpen, Check, CreditCard, Inbox, Package, ShieldCheck, Zap } from 'lucide-react'
import { Reveal } from './kit'
import Approval from './Approval'
import { Lockup } from './Logo'
import { AppTile, Avatar, Chip, Switch, Tray } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** a ghost sibling: mirrored by side, one tilt per depth, one blur and opacity per depth */
function Ghost({ side, depth, x, y, w, children, at }: { side: 'l' | 'r'; depth: 1 | 2; x: number; y: number; w: number; children: ReactNode; at: number }) {
  const still = useReducedMotion()
  const k = side === 'l' ? 1 : -1
  const look = depth === 1 ? { blur: 0.6, o: 0.88, ry: 22, s: 0.93 } : { blur: 1.1, o: 0.72, ry: 28, s: 0.87 }
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
          <a href="#" aria-label="Tandem home" className="flex items-center"><Lockup /></a>
          <nav aria-label="Main" className="ml-10"><ul className="flex">{['Product', 'Agents', 'Docs', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-full px-3.5 text-[13.5px] font-[500] text-[var(--sub)] transition-colors hover:bg-[rgba(0,0,0,0.04)] hover:text-[var(--ink)]">{l}</a></li>)}</ul></nav>
          <a href="#" className="pill-ghost press ml-auto flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Log in</a>
          <a href="#" className="pill-dark press ml-2 flex h-9 items-center rounded-full px-4 text-[13.5px] font-[500]">Start free</a>
        </header>
      </Reveal>

      <main className="pointer-events-none absolute inset-x-0 top-[128px] z-20 flex flex-col items-center text-center [&>*]:pointer-events-auto">
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
      {/* far pair: a week of approvals (real bars) and the inbox the agent works from */}
      <Ghost side="l" depth={2} x={-30} y={520} w={300} at={0.55}>
        <Tray head={<><Check size={14} strokeWidth={2.25} className="text-[var(--green)]" />Approvals<span className="ml-auto font-[400] text-[var(--sub)]">This week</span></>}>
          <div className="h-[184px] p-4">
            <div className="flex items-center gap-2"><span className="tnum text-[26px] font-[500] leading-none tracking-[-0.02em]">48</span><Chip tone="green">+12</Chip></div>
            <div className="mt-1.5 text-[12px] text-[var(--sub)]">approved · 2 denied · 0 undone</div>
            <div className="mt-3 flex h-[62px] items-end gap-1.5">{[38, 52, 34, 66, 88, 46, 24].map((h, i) => <span key={i} className={`flex-1 rounded-[4px] ${i === 4 ? 'bg-[var(--blue)]' : 'bg-[#ececec]'}`} style={{ height: `${h}%` }} />)}</div>
            <div className="mt-1.5 flex gap-1.5 text-[10.5px] text-[var(--soft)]">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className={`flex-1 text-center ${i === 4 ? 'font-[500] text-[var(--ink)]' : ''}`}>{d}</span>)}</div>
          </div>
        </Tray>
      </Ghost>
      <Ghost side="r" depth={2} x={1170} y={520} w={300} at={0.55}>
        <Tray head={<><Inbox size={14} strokeWidth={1.75} />Support inbox<span className="ml-auto"><Chip tone="blue">4 new</Chip></span></>}>
          <div className="h-[184px] divide-y divide-[#f0f0f0] px-3.5">
            {([['MR', 'Maya Lindqvist', '2m', 'The box was crushed, photos attached', true], ['JW', 'Jonas Weber', '9m', 'Can I swap for a size up instead?', true], ['AK', 'Amara Okoye', '1h', 'Still nothing after three weeks', false]] as const).map(([a, n, t, m, u]) => (
              <div key={n} className="flex h-[61px] items-center gap-2.5">
                <Avatar i={a} size={26} />
                <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5 text-[12.5px] font-[500]">{n}{u && <span className="size-1.5 rounded-full bg-[var(--blue)]" />}<span className="ml-auto font-[400] text-[var(--soft)]">{t}</span></div><div className="truncate text-[12px] text-[var(--sub)]">{m}</div></div>
              </div>
            ))}
          </div>
        </Tray>
      </Ghost>

      {/* near pair: what the agent did to get here, and what it is allowed to do */}
      <Ghost side="l" depth={1} x={232} y={502} w={316} at={0.45}>
        <Tray head={<><span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[var(--blue)] opacity-40" /><span className="size-1.5 rounded-full bg-[var(--blue)]" /></span>Ops agent<span className="tnum ml-auto font-[400] text-[var(--sub)]">Worked for 7s</span></>}>
          <div className="h-[220px] p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1">{([[Inbox, '#f59e0b'], [Package, '#10b981'], [CreditCard, '#635bff'], [BookOpen, '#64748b']] as const).map(([I, h]) => <span key={h} className="rounded-[7px] ring-2 ring-white"><AppTile icon={I} hue={h} size={22} /></span>)}</div>
              <span className="text-[12.5px] text-[var(--sub)]">Read 4 sources</span>
            </div>
            <div className="mt-3 space-y-0.5">
              {([['Read new tickets', '14', 'ok'], ['Matched to refund policy', '3', 'ok'], ['Flagged a duplicate claim', 'ORD-4655', 'warn'], ['Drafted 3 replies', '3', 'ok']] as const).map(([t, m, k]) => (
                <div key={t} className="flex h-[36px] items-center gap-2.5 text-[12.5px]">
                  <span className={`grid size-[18px] place-items-center rounded-full ${k === 'ok' ? 'bg-[var(--green-tint)] text-[var(--green)]' : 'bg-[var(--amber-tint)] text-[var(--amber)]'}`}>{k === 'ok' ? <Check size={11} strokeWidth={3} /> : <span className="text-[11px] font-[600] leading-none">!</span>}</span>
                  <span className="text-[var(--ink)]">{t}</span><span className={`ml-auto ${k === 'warn' ? 'font-mono text-[11.5px]' : 'tnum'} text-[var(--soft)]`}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </Tray>
      </Ghost>
      <Ghost side="r" depth={1} x={892} y={502} w={316} at={0.45}>
        <Tray head={<><ShieldCheck size={14} strokeWidth={2} className="text-[var(--green)]" />Ops agent can<span className="ml-auto font-[400] text-[var(--sub)]">4 rules</span></>}>
          <div className="h-[220px] divide-y divide-[#f0f0f0] px-3.5">
            {([['Refund up to $100', 'Asks you first', true], ['Reply to customers', 'Within policy', true], ['Change an address', 'Asks you first', true], ['Issue payouts', 'Never', false]] as const).map(([t, d, on]) => (
              <div key={t} className="flex h-[55px] items-center gap-3">
                <div className="min-w-0 flex-1"><div className="text-[12.5px] font-[500]">{t}</div><div className="text-[12px] text-[var(--sub)]">{d}</div></div>
                <Switch on={on} />
              </div>
            ))}
          </div>
        </Tray>
      </Ghost>

      <motion.div className="absolute left-1/2 top-[476px] z-10 -translate-x-1/2" initial={still ? false : { opacity: 0, y: 36, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.35, duration: 1.2, ease }} role="img" aria-label="Tandem approval request, sample: the Ops agent asks to refund 3 orders; it is held to approve and completes with an undo receipt">
        <div inert><Approval demo delay={0.9} /></div>
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),#fff)]" />
    </div>
  )
}
