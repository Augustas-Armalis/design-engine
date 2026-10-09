// Tracewell product, round 2: a live trace explorer in premium dark (Linear grammar: monochrome surfaces stepped by lightness,
// hairlines, colour only for state). One motion value (trace ms) drives the playhead, the bars (the running span glows lime,
// the failure turns coral), the counters and the event log; a floating AI panel explains the failure and proposes the fix.
// Sample data, fictional agent.
import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { Brain, CheckCircle, GitPullRequest, MagnifyingGlass, PaperPlaneTilt, ShieldCheck, Sparkle, Wrench, X, XCircle, TreeStructure } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { RollingNumber } from './kit'

type Kind = 'root' | 'llm' | 'tool' | 'guard' | 'io'
type Span = { id: string; name: string; kind: Kind; start: number; end: number; meta: string; err?: boolean; tokens?: number; cost?: number }
const TOTAL = 4200
const SPANS: Span[] = [
  { id: 's0', name: 'agent.run', kind: 'root', start: 0, end: 4200, meta: '' },
  { id: 's1', name: 'plan', kind: 'llm', start: 80, end: 720, meta: '1,204 tok', tokens: 1204, cost: 0.0048 },
  { id: 's2', name: 'search_orders', kind: 'tool', start: 760, end: 1180, meta: '3 rows' },
  { id: 's3', name: 'refund_api', kind: 'tool', start: 1220, end: 1660, meta: '500', err: true },
  { id: 's4', name: 'refund_api', kind: 'tool', start: 1900, end: 2380, meta: 'retry · 200' },
  { id: 's5', name: 'draft_reply', kind: 'llm', start: 2420, end: 3460, meta: '2,316 tok', tokens: 2316, cost: 0.0093 },
  { id: 's6', name: 'pii_check', kind: 'guard', start: 3480, end: 3720, meta: 'pass' },
  { id: 's7', name: 'send_email', kind: 'io', start: 3760, end: 4120, meta: 'sent' },
]
const ICON: Record<Kind, Icon> = { root: TreeStructure, llm: Brain, tool: Wrench, guard: ShieldCheck, io: PaperPlaneTilt }
const RUNS = [
  { name: 'Refund request #4821', agent: 'support-agent', d: 'live', live: true },
  { name: 'Address change #4819', agent: 'support-agent', d: '3.1s' },
  { name: 'Invoice dispute #4816', agent: 'billing-agent', d: '12.4s', err: true },
  { name: 'Refund request #4811', agent: 'support-agent', d: '4.0s' },
  { name: 'Plan upgrade #4808', agent: 'billing-agent', d: '2.2s' },
  { name: 'Lost parcel #4802', agent: 'support-agent', d: '5.6s' },
  { name: 'Refund request #4797', agent: 'support-agent', d: '3.8s' },
  { name: 'Account merge #4793', agent: 'ops-agent', d: '7.1s' },
  { name: 'Refund request #4790', agent: 'support-agent', d: '2.9s' },
]
const ease = [0.22, 1, 0.36, 1] as const
const W = 420 // timeline width: leaves the right side for the AI panel, so no span runs underneath it
const x = (ms: number) => (ms / TOTAL) * W

export function useTraceClock(at: number, dur = 3.8) {
  const still = useReducedMotion()
  const t = useMotionValue(still ? TOTAL : 0)
  useEffect(() => {
    if (still) return
    const c = animate(t, TOTAL, { delay: at, duration: dur, ease: 'linear' })
    return () => c.stop()
  }, [t, at, dur, still])
  return t
}

function Bar({ s, t }: { s: Span; t: MotionValue<number> }) {
  const w = useTransform(t, [s.start, s.end], [0, x(s.end - s.start)], { clamp: true })
  const o = useTransform(t, [s.start, s.start + 30], [0, 1], { clamp: true })
  const done = useTransform(t, [s.end - 1, s.end], [0, 1], { clamp: true })
  const rest = s.err ? '#ff7a6b' : s.kind === 'llm' ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.17)'
  const bg = useTransform(t, [s.start, s.end - 1, s.end], ['#c8f169', '#c8f169', rest]) // the running span is the only lime thing
  const glow = useTransform(t, [s.start, s.end - 1, s.end], ['0 0 12px rgba(200,241,105,0.45)', '0 0 12px rgba(200,241,105,0.45)', '0 0 0px rgba(0,0,0,0)'])
  if (s.kind === 'root') return <div className="absolute inset-y-0 flex items-center" style={{ left: 0 }}><motion.span className="block h-[3px] rounded-full bg-[rgba(255,255,255,0.12)]" style={{ width: w, opacity: o }} /></div>
  return (
    <div className="absolute inset-y-0 flex items-center" style={{ left: x(s.start) }}>
      <motion.span className="block h-[12px] rounded-[3px]" style={{ width: w, opacity: o, background: bg, boxShadow: glow }} />
      <motion.span style={{ opacity: done }} className={`ml-2 whitespace-nowrap font-mono text-[11px] ${s.err ? 'text-[var(--coral)]' : 'text-[var(--soft)]'}`}>
        {s.err ? <span className="inline-flex items-center gap-1"><XCircle size={12} weight="fill" />500 · retrying</span> : s.meta}
      </motion.span>
    </div>
  )
}

export function useStep(t: MotionValue<number>) {
  const still = useReducedMotion()
  const [step, setStep] = useState(still ? SPANS.length : 0)
  useMotionValueEvent(t, 'change', (v) => { const n = SPANS.filter((s) => s.end <= v).length; setStep((p) => (p === n ? p : n)) })
  return step
}

export default function Trace({ intro, t, step }: { intro: number; t: MotionValue<number>; step: number }) {
  const still = useReducedMotion()
  const done = SPANS.filter((s) => s.kind !== 'root').slice(0, step) // child spans finish in order; the root ends last
  const tokens = done.reduce((a, s) => a + (s.tokens ?? 0), 0)
  const cost = done.reduce((a, s) => a + (s.cost ?? 0), 0)
  const finished = step >= SPANS.length
  const playX = useTransform(t, (v) => x(v))
  const elapsed = useTransform(t, (v) => `${(v / 1000).toFixed(2)}s`)
  const b = (d: number) => (still ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: intro + d, duration: 0.45, ease } })

  return (
    <div className="relative flex h-full flex-col text-[13px]">
      <motion.div {...b(0)} className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--line)] px-4">
        <span className="font-mono text-[12px] text-[var(--soft)]">support-agent <span>/</span> runs <span>/</span> <span className="text-[var(--ink)]">run_8f2c1a</span></span>
        <span className="flex items-center gap-1.5 text-[12px] text-[var(--sub)]">
          {finished ? <CheckCircle size={14} weight="fill" className="text-[var(--ok)]" /> : <span className="relative grid size-3.5 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[var(--lime)] opacity-50" /><span className="size-1.5 rounded-full bg-[var(--lime)]" /></span>}
          {finished ? 'Succeeded' : 'Running'}
        </span>
        <span className="mx-1 h-4 w-px bg-[var(--line-2)]" />
        <div className="flex items-center gap-5 text-[12px]">
          <span className="flex items-baseline gap-1.5"><span className="text-[var(--soft)]">Tokens</span><span className="font-mono text-[var(--ink)]"><RollingNumber value={tokens.toLocaleString('en-US')} at={intro + 0.2} /></span></span>
          <span className="flex items-baseline gap-1.5"><span className="text-[var(--soft)]">Cost</span><span className="font-mono text-[var(--ink)]"><RollingNumber value={`$${cost.toFixed(4)}`} at={intro + 0.25} /></span></span>
          <span className="flex items-baseline gap-1.5"><span className="text-[var(--soft)]">Duration</span><motion.span className="tnum font-mono text-[var(--ink)]">{elapsed}</motion.span></span>
        </div>
      </motion.div>

      <div className="grid min-h-0 flex-1 grid-cols-[248px_1fr]">
        <div className="border-r border-[var(--line)] bg-[rgba(255,255,255,0.012)] p-1.5">
          <motion.div {...b(0.05)} className="mb-1 flex h-8 items-center gap-2 rounded-[7px] px-2 text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line)]"><MagnifyingGlass size={13} /><span className="text-[12px]">Filter runs</span><span className="ml-auto font-mono text-[11px]">1,284</span></motion.div>
          {RUNS.map((r, i) => (
            <motion.div key={r.name} {...b(0.1 + i * 0.03)} className={`flex h-[44px] items-center gap-2.5 rounded-[7px] px-2 ${i === 0 ? 'bg-[var(--s3)]' : ''}`}>
              <span className={`size-1.5 shrink-0 rounded-full ${r.live ? (finished ? 'bg-[var(--ok)]' : 'bg-[var(--lime)]') : r.err ? 'bg-[var(--coral)]' : 'bg-[var(--soft)]'}`} />
              <div className="min-w-0 flex-1 leading-[17px]">
                <div className={`truncate text-[13px] ${i === 0 ? 'text-[var(--ink)]' : 'text-[#c9ccd1]'}`}>{r.name}</div>
                <div className={`text-[11.5px] ${i === 0 ? 'text-[var(--sub)]' : 'text-[var(--soft)]'}`}>{r.agent}</div>
              </div>
              <span className={`tnum font-mono text-[11px] ${i === 0 ? 'text-[var(--sub)]' : 'text-[var(--soft)]'}`}>{r.live ? (finished ? '4.2s' : 'live') : r.d}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative min-w-0 px-5">
          <motion.div {...b(0.08)} className="relative ml-[220px] flex h-10 items-end pb-2" style={{ width: W }}>
            {[0, 1, 2, 3, 4].map((s) => <span key={s} className="tnum absolute -translate-x-1/2 font-mono text-[11px] text-[var(--soft)]" style={{ left: x(s * 1000) }}>{s}s</span>)}
          </motion.div>
          <div className="relative border-t border-[var(--line)]">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 z-10 ml-[220px]" style={{ width: W }}>
              {[1, 2, 3, 4].map((s) => <span key={s} className="absolute inset-y-0 w-px bg-[rgba(255,255,255,0.04)]" style={{ left: x(s * 1000) }} />)}
              <motion.span className="absolute -top-10 bottom-0 left-0 w-px bg-[var(--lime)] transition-opacity duration-500" style={{ x: playX, opacity: finished ? 0 : 0.9 }}>
                <motion.span className="tnum absolute -left-[22px] top-1.5 rounded-[4px] bg-[var(--lime)] px-1 font-mono text-[10px] font-[600] leading-[16px] text-[var(--lime-ink)]">{elapsed}</motion.span>
              </motion.span>
            </div>
            {SPANS.map((s, i) => {
              const I = ICON[s.kind]
              return (
                <motion.div key={s.id} {...b(0.14 + i * 0.03)} className="relative flex h-[34px] items-center">
                  <div className="flex w-[220px] shrink-0 items-center gap-2" style={{ paddingLeft: s.kind === 'root' ? 0 : 16 }}>
                    <I size={14} className={s.err ? 'text-[var(--coral)]' : 'text-[var(--soft)]'} />
                    <span className={`truncate text-[13px] ${s.kind === 'root' ? 'font-[550] text-[var(--ink)]' : s.err ? 'text-[var(--coral)]' : 'text-[#d7d9dd]'}`}>{s.name}</span>
                    {s.kind === 'llm' && <span className="rounded-[4px] px-1 font-mono text-[10px] text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line-2)]">llm</span>}
                  </div>
                  <div className="relative h-full" style={{ width: W }}><Bar s={s} t={t} /></div>
                </motion.div>
              )
            })}
          </div>
          <motion.div {...b(0.4)} className="mt-3 border-t border-[var(--line)] pt-3">
            <div className="mb-1.5 text-[12px] text-[var(--soft)]">Events</div>
            <div className="h-[130px] space-y-[2px] overflow-hidden font-mono text-[12px] leading-[20px]">
              {done.slice(-6).map((s) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }} className="flex gap-3 whitespace-nowrap">
                  <span className="tnum text-[var(--soft)]">14:02:{String(11 + Math.floor(s.end / 1000)).padStart(2, '0')}.{String(s.end % 1000).padStart(3, '0')}</span>
                  <span className={s.err ? 'text-[var(--coral)]' : 'text-[var(--sub)]'}>{s.err ? 'error' : 'ok   '}</span>
                  <span className="text-[#d7d9dd]">{s.kind}.{s.name}</span>
                  <span className="text-[var(--soft)]">{s.err ? 'upstream_timeout · retry 1/3 in 240ms' : `${s.end - s.start}ms${s.tokens ? ` · ${s.tokens.toLocaleString('en-US')} tok` : ''}`}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const ANSWER = 'refunds-svc timed out at 1,500 ms while its p95 sat at 1.9 s. Tracewell retried with backoff and the call passed in 480 ms, so the run recovered.'

/** Floating AI panel (Linear's agent-panel move): appears when the failure lands, types its read, then proposes the fix. */
export function AiPanel({ step }: { step: number }) {
  const still = useReducedMotion()
  const show = step >= 3, answering = step >= 4, finished = step >= SPANS.length
  const [n, setN] = useState(still ? ANSWER.length : 0)
  useEffect(() => {
    if (still || !answering) return
    const t0 = performance.now(), dur = 1500
    const id = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / dur); setN(Math.round(k * ANSWER.length)); if (k >= 1) clearInterval(id) }, 24)
    return () => clearInterval(id)
  }, [answering, still])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease }}
          className="w-[388px] overflow-hidden rounded-[14px] bg-[rgba(24,25,27,0.92)] text-[13px] shadow-[0_0_0_1px_rgba(255,255,255,0.09),inset_0_1px_0_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="flex h-11 items-center gap-2 border-b border-[var(--line)] px-3.5">
            <Sparkle size={15} weight="fill" className="text-[var(--lime)]" /><span className="font-[550] text-[var(--ink)]">Tracewell AI</span>
            <span className="rounded-[5px] px-1.5 py-px text-[11px] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line-2)]">Root cause</span>
            <X size={14} className="ml-auto text-[var(--soft)]" />
          </div>
          <div className="space-y-3 p-3.5">
            <div className="ml-auto w-fit rounded-[10px] bg-[var(--s3)] px-3 py-2 text-[var(--ink)] shadow-[inset_0_0_0_1px_var(--line)]">Why did refund_api fail?</div>
            <p className="min-h-[60px] leading-[20px] text-[#d7d9dd]">
              {answering ? <>{ANSWER.slice(0, n)}{n < ANSWER.length && <span className="ml-px inline-block h-[14px] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--lime)]" />}</>
                : <span className="bg-[linear-gradient(90deg,var(--soft),var(--ink),var(--soft))] bg-[length:200%_100%] bg-clip-text text-transparent [animation:shimmer_1.6s_linear_infinite]">Reading 7 spans and 2 attempts…</span>}
            </p>
            <AnimatePresence>
              {finished && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="rounded-[10px] bg-[var(--canvas)] shadow-[inset_0_0_0_1px_var(--line)]">
                  <div className="flex h-9 items-center gap-2 border-b border-[var(--line)] px-3 text-[12px] text-[var(--sub)]"><Wrench size={13} />Suggested fix · <span className="font-mono">agents/support.yaml</span></div>
                  <div className="px-3 py-2 font-mono text-[12px] leading-[20px]">
                    <div className="text-[var(--soft)]">  tools.refund_api:</div>
                    <div className="-mx-3 bg-[rgba(255,122,107,0.08)] px-3 text-[var(--coral)]">-   timeout_ms: 1500</div>
                    <div className="-mx-3 bg-[rgba(76,195,138,0.09)] px-3 text-[var(--ok)]">+   timeout_ms: 3000</div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-[var(--line)] px-3 py-2.5">
                    <span className="btn-light flex h-7 items-center gap-1.5 rounded-full px-3 text-[12px] font-[600]"><GitPullRequest size={13} weight="bold" />Open pull request</span>
                    <span className="btn-text px-2 text-[12px]">Dismiss</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
