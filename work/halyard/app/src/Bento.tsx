// Section 03: what Halyard does, as a bento built to knowledge/web/bento.md. Five claims -> 2 over 3 (BE-01). Marcel's grid
// means the box is dropped: tiles are hairline cells with a mono FIG label (Linear's hairline-grid layout), one tile
// material, titles are one two-tone sentence (claim in ink, the rest grey), visuals bleed to the cell edge, the hero tiles
// are a surface plus an overlay doing the action (Notion / Ramp / Stripe), hover moves the visual, never the tile.
// Loops run on one clock and only after the section is in view. All data is sample data.
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Activity, Check, GitCommitHorizontal, RotateCcw, ScrollText, Waypoints } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

/** seconds since the section came into view (frozen at `still` for reduced motion) */
function useClock(active: boolean, still = 6) {
  const reduce = useReducedMotion()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (reduce) { setT(still); return }
    if (!active) return
    const t0 = performance.now()
    const id = setInterval(() => setT((performance.now() - t0) / 1000), 100)
    return () => clearInterval(id)
  }, [active, reduce, still])
  return t
}

function Cell({ fig, claim, rest, alt, children, className = '', i, shown }: { fig: string; claim: string; rest: string; alt: string; children: ReactNode; className?: string; i: number; shown: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.article className={`group relative flex flex-col overflow-hidden ${className}`} initial={reduce ? false : { opacity: 0.01, y: 16 }} animate={shown ? { opacity: 1, y: 0 } : undefined} transition={{ delay: i * 0.08, duration: 0.8, ease }}>
      <div className="px-7 pt-6">
        <div className="mono text-[11px] tracking-[0.04em] text-[var(--sub)]">FIG {fig}</div>
        <h3 className="mt-3 max-w-[460px] text-[19px] font-[500] leading-[1.3] tracking-[-0.01em]"><span className="text-[var(--ink)]">{claim}</span> <span className="text-[var(--soft)]">{rest}</span></h3>
      </div>
      <div className="relative mt-6 flex-1" role="img" aria-label={alt}><div aria-hidden className="contents">{children}</div></div>
    </motion.article>
  )
}

const Mono = ({ children, className = '' }: { children: ReactNode; className?: string }) => <span className={`mono text-[11.5px] ${className}`}>{children}</span>

/* FIG 03.1: four signal lanes stream in, converge, and an overlay states the cause */
function Signals({ t }: { t: number }) {
  const lanes = [
    { icon: Activity, name: 'metrics', lines: ['p99 182ms', 'p99 1.92s', 'p99 2.41s', 'err 0.02%'] },
    { icon: ScrollText, name: 'logs', lines: ['GET /cart 200', 'slow query 412x', 'GET /cart 200', 'pool wait 38ms'] },
    { icon: Waypoints, name: 'traces', lines: ['CartSummary.load', 'db.query x412', 'render 18ms', 'CartSummary.load'] },
    { icon: GitCommitHorizontal, name: 'deploys', lines: ['#4820 13:31', '#4821 13:53', 'no new deploy', '#4821 13:53'] },
  ]
  const found = (t % 7) > 3.2
  return (
    <div className="absolute inset-0 px-7 pb-7">
      <div className="space-y-2">
        {lanes.map((l, i) => {
          const k = Math.floor(t * 1.4 + i * 0.7) % l.lines.length
          const I = l.icon
          const hot = found && /412|2\.41|#4821/.test(l.lines[k])
          return (
            <div key={l.name} className="flex h-9 items-center gap-3 rounded-[8px] bg-white/[0.025] pl-2 pr-3 shadow-[inset_0_0_0_1px_var(--rule)]">
              <span className="grid size-5 place-items-center rounded-[5px] bg-white/[0.06] text-[#cfcfcf]"><I size={12} strokeWidth={2} /></span>
              <Mono className="w-[58px] text-[var(--sub)]">{l.name}</Mono>
              <div className="relative flex h-[18px] flex-1 items-center overflow-hidden">
                <motion.div key={k} className="leading-[18px]" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, ease }}>
                  <Mono className={hot ? 'text-[var(--amber-ink)]' : 'text-[#cfcfcf]'}>{l.lines[k]}</Mono>
                </motion.div>
              </div>
              <span className={`size-1.5 rounded-full transition-colors duration-500 ${found ? 'bg-[var(--amber)]' : 'bg-[#4a4a4a]'}`} />
            </div>
          )
        })}
      </div>
      <motion.div className="sh-3 absolute bottom-6 right-7 w-[300px] rounded-[12px] bg-[var(--win-raised)] p-3.5" animate={{ opacity: found ? 1 : 0, y: found ? 0 : 10 }} transition={{ duration: 0.45, ease }}>
        <div className="flex items-center justify-between"><Mono className="text-[var(--amber-ink)]">cause found</Mono><Mono className="text-[var(--sub)]">2m 14s</Mono></div>
        <div className="mt-2 text-[13.5px] leading-[20px] text-[#e5e5e5]">N+1 query in <span className="mono text-[12.5px]">CartSummary.load</span>, shipped in <span className="mono text-[12.5px]">#4821</span>.</div>
      </motion.div>
    </div>
  )
}

/* FIG 03.2: the permission policy, with an approval overlay filling its hold ring */
function Policy({ t }: { t: number }) {
  const rows = [['restart pods', 'Auto'], ['scale replicas', 'Auto'], ['roll back a deploy', 'Ask first'], ['run a migration', 'Never']] as const
  const phase = t % 6, held = Math.min(1, Math.max(0, (phase - 1.6) / 1.4)), done = phase > 3.1
  return (
    <div className="absolute inset-0 px-7 pb-7">
      <div className="overflow-hidden rounded-[10px] shadow-[inset_0_0_0_1px_var(--rule)]">
        {rows.map(([a, v], i) => (
          <div key={a} className={`flex h-10 items-center px-3.5 ${i ? 'border-t border-[var(--rule)]' : ''} ${v === 'Ask first' ? 'bg-[rgba(245,165,36,0.05)]' : ''}`}>
            <Mono className="text-[#cfcfcf]">{a}</Mono>
            <span className={`ml-auto rounded-full px-2 py-[3px] text-[12.5px] leading-none ${v === 'Ask first' ? 'bg-[var(--amber-tint)] text-[var(--amber-ink)]' : v === 'Never' ? 'bg-white/[0.04] text-[var(--sub)]' : 'bg-white/[0.07] text-[#d4d4d4]'}`}>{v}</span>
          </div>
        ))}
      </div>
      <div className="sh-3 absolute bottom-6 right-7 flex w-[290px] items-center gap-3 rounded-[12px] bg-[var(--win-raised)] p-3">
        {done ? (
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f2f2f0] text-[#111]"><Check size={17} strokeWidth={2.5} /></span>
        ) : (
          <svg viewBox="0 0 36 36" className="size-9 shrink-0 -rotate-90" aria-hidden>
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#f5a524" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray={`${held} 1`} />
          </svg>
        )}
        <div className="min-w-0"><div className="text-[13.5px] text-[#e5e5e5]">{done ? 'Rollback approved' : 'Roll back to #4820?'}</div><Mono className="text-[var(--sub)]">{done ? 'by Maya L. · 14:07' : 'hold to approve'}</Mono></div>
      </div>
    </div>
  )
}

/* FIG 03.3: the rotation; the agent pages exactly one person */
function Rotation({ t }: { t: number }) {
  const people = [['ML', 'Maya'], ['JW', 'Jonas'], ['AO', 'Amara']] as const
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const paged = (t % 5) > 1.5
  return (
    <div className="absolute inset-x-7 bottom-7 top-0">
      <div className="ml-[74px] grid grid-cols-7 text-center">{days.map((d, i) => <Mono key={i} className={i === 3 ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}>{d}</Mono>)}</div>
      <div className="relative mt-2 space-y-2">
        {people.map(([i, n], r) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`relative grid size-6 shrink-0 place-items-center rounded-full bg-[#2c2c2c] text-[10px] font-[600] text-[#d6d6d6] transition-shadow duration-500 ${r === 0 && paged ? 'shadow-[0_0_0_2px_var(--canvas),0_0_0_3.5px_var(--amber)]' : ''}`}>{i}</span>
            <span className="w-[42px] text-[12.5px] text-[var(--sub)]">{n}</span>
            <div className="relative grid h-6 flex-1 grid-cols-7 gap-px">
              {days.map((_, d) => {
                const on = (r === 0 && d >= 2 && d <= 4) || (r === 1 && d < 2) || (r === 2 && d > 4)
                return <span key={d} className={`rounded-[3px] ${on ? (r === 0 ? 'bg-white/[0.22]' : 'bg-white/[0.1]') : 'bg-white/[0.025]'}`} />
              })}
            </div>
          </div>
        ))}
        <span aria-hidden className="absolute -bottom-1 -top-1 w-px bg-[var(--amber)]" style={{ left: `calc(82px + (100% - 82px) * ${(3 + 0.58) / 7})` }} />
      </div>
      <motion.div className="mt-5 flex items-center gap-2 text-[13.5px]" animate={{ opacity: paged ? 1 : 0.4 }} transition={{ duration: 0.4 }}>
        <span className={`size-1.5 rounded-full ${paged ? 'bg-[var(--amber)]' : 'bg-[#4a4a4a]'}`} /><span className="text-[#e5e5e5]">Paged Maya</span><Mono className="text-[var(--sub)]">1 page · 0 escalations</Mono>
      </motion.div>
    </div>
  )
}

/* FIG 03.4: the postmortem writes itself, line by line */
function Postmortem({ t }: { t: number }) {
  const lines = ['13:53 deploy #4821 shipped', '13:57 p99 crossed 1.5s', '14:05 cause: N+1 in CartSummary', '14:07 rolled back to #4820', '14:11 p99 back to 180ms']
  const n = Math.min(lines.length, Math.floor((t % 8) / 1.1))
  return (
    <div className="sh-1 absolute inset-x-7 bottom-0 top-0 rounded-t-[12px] bg-[var(--win)] px-4 pt-3.5">
      <div className="flex items-center justify-between"><span className="text-[13.5px] font-[500]">INC-2291 postmortem</span><Mono className="text-[var(--sub)]">draft</Mono></div>
      <div className="mt-1 text-[12.5px] text-[var(--sub)]">Impact: slow checkout for 14 min, no failed orders.</div>
      <div className="mt-3 space-y-2">
        {lines.map((l, i) => i < n ? (
          <motion.div key={l} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="h-[16px]"><Mono className="text-[#cfcfcf]">{l}</Mono></motion.div>
        ) : i === n ? <div key={l} className="flex h-[16px] items-center"><span className="h-[13px] w-[7px] animate-pulse bg-[var(--ink)]" /></div> : <div key={l} className="h-[16px] py-[3px]"><div className="h-full w-[60%] rounded-[3px] bg-white/[0.04]" /></div>)}
      </div>
    </div>
  )
}

/* FIG 03.5: undo for 30 minutes: a live countdown and the revert it would apply */
function Undo({ t }: { t: number }) {
  const left = Math.max(0, 1781 - Math.floor(t))
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
  return (
    <div className="absolute inset-x-7 bottom-7 top-0 flex flex-col">
      <div className="mono text-[48px] font-[500] leading-none tracking-[-0.02em] tabular-nums">{mm}<span className="text-[var(--soft)]">:</span>{ss}</div>
      <Mono className="mt-2 text-[var(--sub)]">undo window left on this rollback</Mono>
      <div className="mt-auto overflow-hidden rounded-[10px] shadow-[inset_0_0_0_1px_var(--rule)]">
        <div className="flex h-9 items-center gap-2 px-3"><Mono className="text-[#f87171]">−</Mono><Mono className="text-[#cfcfcf]">checkout-api #4821</Mono></div>
        <div className="flex h-9 items-center gap-2 border-t border-[var(--rule)] px-3"><Mono className="text-[#86efac]">+</Mono><Mono className="text-[#cfcfcf]">checkout-api #4820</Mono>
          <span className="ml-auto inline-flex items-center gap-1 text-[12.5px] text-[#e5e5e5] transition-transform group-hover:-translate-x-0.5"><RotateCcw size={12} strokeWidth={2} />Undo</span></div>
      </div>
    </div>
  )
}

export default function Bento() {
  const ref = useRef<HTMLElement>(null)
  const shown = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const t = useClock(shown)
  return (
    <section ref={ref} aria-labelledby="what-h">
      <div className="flex border-b border-[var(--rule)]">
        <div className="w-[560px] border-r border-[var(--rule)] px-12 pb-12 pt-14">
          <span className="mono flex items-center gap-2.5 text-[12px] tracking-[0.04em] text-[var(--sub)]"><span className="rounded-[3px] px-1.5 py-[3px] leading-none shadow-[inset_0_0_0_1px_var(--rule-2)]">03</span>What it does</span>
          <h2 id="what-h" className="mt-5 text-[40px] font-[500] leading-[1.08] tracking-[-0.025em]">One Agent For The<br />Whole Incident</h2>
        </div>
        <div className="flex flex-1 items-end px-12 pb-12">
          <p className="max-w-[460px] text-[16px] leading-[26px] text-[var(--sub)]">From the first slow request to the postmortem, Halyard does the reading and the writing. You make the one call that matters.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-[var(--rule)]">
        <Cell i={0} shown={shown} fig="03.1" alt="Sample: metrics, logs, traces and deploys stream in; Halyard reports the cause, an N+1 query shipped in deploy 4821" claim="Reads every signal" rest="before it pages anyone." className="h-[372px] border-r border-[var(--rule)]"><Signals t={t} /></Cell>
        <Cell i={1} shown={shown} fig="03.2" alt="Sample policy: restart pods and scale replicas run automatically, rolling back a deploy asks first, migrations never run; a rollback is approved by Maya" claim="Asks before it touches production," rest="every time you tell it to." className="h-[372px]"><Policy t={t} /></Cell>
      </div>
      <div className="grid grid-cols-3">
        <Cell i={2} shown={shown} fig="03.3" alt="Sample on-call rotation for one week; Halyard pages only Maya, who is on call today" claim="Pages the right person," rest="once." className="h-[330px] border-r border-[var(--rule)]"><Rotation t={t} /></Cell>
        <Cell i={3} shown={shown} fig="03.4" alt="Sample postmortem for incident 2291 drafting its own timeline" claim="Writes the postmortem" rest="while it is still fresh." className="h-[330px] border-r border-[var(--rule)]"><Postmortem t={t} /></Cell>
        <Cell i={4} shown={shown} fig="03.5" alt="Sample rollback with 29 minutes left to undo it" claim="Undo anything" rest="for 30 minutes." className="h-[330px]"><Undo t={t} /></Cell>
      </div>
    </section>
  )
}
