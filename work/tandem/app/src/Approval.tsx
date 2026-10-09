// Approval Request: an agent action that waits for a human. Scoped preview -> hold-to-approve (the ring fills while held,
// releasing early cancels) -> the button morphs into live progress -> a receipt with an undo window. Works by hand (pointer or
// Space/Enter hold) and plays itself in demo mode. Sample data, fictional orders.
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, CreditCard, Package, RotateCcw, ShieldCheck } from 'lucide-react'
import { AppTile, Chip } from './ui'
import { AgentMark } from './Logo'

const ease = [0.22, 1, 0.36, 1] as const
const HOLD = 1100
const ORDERS = [
  { id: 'ORD-4821', who: 'Maya Lindqvist', why: 'Arrived damaged', amt: 49 },
  { id: 'ORD-4790', who: 'Jonas Weber', why: 'Wrong size', amt: 49 },
  { id: 'ORD-4702', who: 'Amara Okoye', why: 'Never arrived', amt: 49 },
]
type Phase = 'idle' | 'holding' | 'running' | 'done'

export type ApprovalPhase = 'idle' | 'holding' | 'running' | 'done'
export default function Approval({ demo = false, delay = 0, onPhase, flat = false }: { demo?: boolean; delay?: number; onPhase?: (p: ApprovalPhase) => void; flat?: boolean }) {
  const still = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [held, setHeld] = useState(0) // 0..1
  const [done, setDone] = useState(0) // orders refunded
  const raf = useRef(0), t0 = useRef(0)
  const [left, setLeft] = useState(10) // undo window, seconds
  useEffect(() => { onPhase?.(phase) }, [phase, onPhase])

  const startHold = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('holding'); t0.current = performance.now()
    const tick = () => {
      const k = Math.min(1, (performance.now() - t0.current) / HOLD); setHeld(k)
      if (k >= 1) { setPhase('running'); return }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [phase])
  const endHold = useCallback(() => {
    if (phase !== 'holding') return
    cancelAnimationFrame(raf.current); setPhase('idle'); setHeld(0)
  }, [phase])

  // running: refund one order every ~520 ms, then the receipt
  useEffect(() => {
    if (phase !== 'running') return
    if (done >= ORDERS.length) { const id = setTimeout(() => setPhase('done'), 350); return () => clearTimeout(id) }
    const id = setTimeout(() => setDone((d) => d + 1), 520)
    return () => clearTimeout(id)
  }, [phase, done])

  // demo: wait, hold, run, rest on the receipt, reset, repeat
  useEffect(() => {
    if (!demo) return
    if (still) { setPhase('done'); setDone(ORDERS.length); setHeld(1); return }
    const ids: number[] = []
    if (phase === 'idle') ids.push(window.setTimeout(() => startHold(), delay * 1000 + 1600))
    if (phase === 'done') ids.push(window.setTimeout(() => { setPhase('idle'); setHeld(0); setDone(0) }, 4200))
    return () => ids.forEach(clearTimeout)
  }, [demo, phase, startHold, delay, still])

  // the undo window really counts down
  useEffect(() => {
    if (phase !== 'done') { setLeft(10); return }
    if (still || left <= 0) return
    const id = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(id)
  }, [phase, left, still])

  const total = ORDERS.reduce((a, o) => a + o.amt, 0)
  return (
    <div className={`w-[364px] overflow-hidden rounded-[16px] bg-white text-left ${flat ? 'shadow-[0_0_0_1px_#ececec,0_1px_2px_rgba(0,0,0,0.04)]' : 'shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-14px_rgba(0,0,0,0.18)]'}`}>
      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <AgentMark size={22} />
        <span className="text-[13px] text-[var(--sub)]"><span className="font-[500] text-[var(--ink)]">Ops agent</span> wants to</span>
        <span className="ml-auto"><Chip tone={phase === 'done' ? 'green' : 'amber'}>{phase === 'done' ? 'Approved' : 'Needs approval'}</Chip></span>
      </div>
      <div className="px-4 pt-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[17px] font-[550] tracking-[-0.015em]">Refund 3 orders</span>
          <span className="tnum text-[17px] font-[550] tracking-[-0.015em] text-[var(--sub)]">${total.toFixed(2)}</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-[10px] shadow-[inset_0_0_0_1px_var(--line)]">
          {ORDERS.map((o, i) => {
            const ok = done > i
            return (
              <div key={o.id} className={`flex h-[40px] items-center gap-2.5 px-3 text-[13px] ${i ? 'border-t border-[var(--line)]' : ''}`}>
                <span className="grid size-[18px] shrink-0 place-items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {ok ? (
                      <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease }} className="grid size-[18px] place-items-center rounded-full bg-[var(--green)]"><Check size={11} strokeWidth={3} color="#fff" /></motion.span>
                    ) : (
                      <motion.span key="box" exit={{ opacity: 0 }}><Package size={16} strokeWidth={1.5} className="text-[var(--soft)]" /></motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="font-mono text-[12px] text-[var(--sub)]">{o.id}</span>
                <span className="truncate text-[var(--ink)]">{o.who}</span>
                <span className="ml-auto whitespace-nowrap text-[var(--soft)]">{o.why}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Chip tone="white"><AppTile icon={CreditCard} hue="#635bff" size={14} />Payments</Chip>
          <Chip tone="white"><ShieldCheck size={12} strokeWidth={2} className="text-[var(--green)]" />Refunds only</Chip>
          <Chip tone="white">Once · 10 min</Chip>
        </div>
      </div>

      <div className="mt-4 flex h-[60px] items-center gap-2 border-t border-[var(--line)] bg-[#fcfcfc] px-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {phase === 'done' ? (
            <motion.div key="receipt" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="flex flex-1 items-center gap-2.5 pl-1">
              <span className="grid size-6 place-items-center rounded-full bg-[var(--green-tint)]"><Check size={13} strokeWidth={2.5} className="text-[var(--green)]" /></span>
              <span className="text-[13px]"><span className="font-[500]">Refunded ${total.toFixed(2)}</span><span className="text-[var(--sub)]"> · 3 notified</span></span>
              <button type="button" className="pill-ghost press ml-auto flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-[500]"><RotateCcw size={13} strokeWidth={1.75} />Undo <span className="tnum text-[var(--soft)]">0:{String(left).padStart(2, '0')}</span></button>
            </motion.div>
          ) : (
            <motion.div key="actions" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="flex flex-1 items-center gap-2">
              <button type="button" className="pill-ghost press h-9 rounded-full px-4 text-[13.5px] font-[500]" disabled={phase === 'running'}>Deny</button>
              {/* hold-to-approve: dark pill; held progress fills it from the left, the ring tracks it */}
              <motion.button type="button" layout onPointerDown={startHold} onPointerUp={endHold} onPointerLeave={endHold}
                onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold() } }} onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') endHold() }}
                aria-label="Hold to approve refunds" className="pill-dark relative ml-auto flex h-9 flex-1 select-none items-center justify-center gap-2 overflow-hidden rounded-full px-4 text-[13.5px] font-[500]">
                <span aria-hidden className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.10),rgba(255,255,255,0.22))]" style={{ width: `${(phase === 'running' ? 1 : held) * 100}%` }} />
                {phase === 'running' ? (
                  <span className="relative flex items-center gap-2"><span className="tnum">Refunding {Math.min(done + 1, 3)} of 3</span>
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-white/15"><motion.span className="block h-full rounded-full bg-white" animate={{ width: `${(done / 3) * 100}%` }} transition={{ duration: 0.45, ease }} /></span></span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    <svg viewBox="0 0 20 20" className="size-4 -rotate-90" aria-hidden><circle cx="10" cy="10" r="7.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" /><circle cx="10" cy="10" r="7.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray={`${held} 1`} /></svg>
                    {phase === 'holding' ? 'Keep holding…' : 'Hold to approve'}
                  </span>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
