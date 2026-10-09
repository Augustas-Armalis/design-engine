// The Approval Request as Flo posts a component on X: one component, large and alone on the #fafafa preview canvas, in his
// grey tray (the strip carries status), with a real cursor that travels to the button, presses, holds, lets go and drifts off.
// Everything is driven by the component's own phases, so the cursor and the card can never drift out of sync.
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, LoaderCircle, MousePointer2, TriangleAlert } from 'lucide-react'
import Approval, { type ApprovalPhase } from './Approval'

const ease = [0.22, 1, 0.36, 1] as const
const ZOOM = 1.55
const DELAY = 0.8 // the card's demo waits DELAY + 1.6 s in idle before the hold starts

function Strip({ phase }: { phase: ApprovalPhase }) {
  const s = phase === 'done' ? { k: 'done', icon: <Check size={14} strokeWidth={2.5} className="text-[var(--green)]" />, t: 'Done · logged to the audit trail', c: 'text-[#404040]' }
    : phase === 'running' ? { k: 'run', icon: <LoaderCircle size={14} strokeWidth={2.25} className="animate-spin text-[var(--blue)]" />, t: 'Refunding 3 orders', c: 'text-[#404040]' }
    : { k: 'ask', icon: <TriangleAlert size={14} strokeWidth={2.25} className="text-[#ea580c]" />, t: '1 needs your approval', c: 'text-[#c2410c]' }
  return (
    <div className="relative h-9 overflow-hidden px-3">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div key={s.k} className={`absolute inset-x-3 inset-y-0 flex items-center gap-2 text-[12.5px] font-[500] ${s.c}`}
          initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }} transition={{ duration: 0.36, ease }}>
          {s.icon}{s.t}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Post() {
  const still = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<ApprovalPhase>('idle')
  const [cycle, setCycle] = useState(0)
  const [btn, setBtn] = useState({ x: 0, y: 0 })

  // measure the button once the card has finished its entrance lift (measuring mid-lift puts the cursor low)
  useLayoutEffect(() => {
    const id = setTimeout(() => {
      const b = stage.current?.querySelector('[aria-label="Hold to approve refunds"]') as HTMLElement | null
      const r = stage.current?.getBoundingClientRect()
      if (!b || !r) return
      const q = b.getBoundingClientRect()
      setBtn({ x: q.left - r.left + q.width * 0.8, y: q.top - r.top + q.height * 0.5 })
    }, 950)
    return () => clearTimeout(id)
  }, [])
  const onPhase = useCallback((p: ApprovalPhase) => { setPhase(p); if (p === 'idle') setCycle((c) => c + 1) }, [])

  // cursor: rests off to the lower right, glides in shortly before the hold, presses while holding, drifts off after
  const rest = { x: btn.x + 190, y: btn.y + 150 }
  const at = phase === 'holding' ? btn : phase === 'running' ? { x: btn.x + 24, y: btn.y + 46 } : phase === 'done' ? rest : null

  return (
    <main className="relative mx-auto grid h-[900px] w-[1440px] place-items-center overflow-hidden bg-[#fafafa]">
      <h1 className="sr-only">Approval Request, a Tandem component (sample data)</h1>
      <div ref={stage} className="relative">
        <motion.div style={{ zoom: ZOOM }} initial={still ? false : { opacity: 0, y: 14, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, ease }}>
          <div className="rounded-[20px] bg-[#f0f0f0] p-1 shadow-[0_0_0_1px_rgba(0,0,0,0.035)]">
            <Strip phase={phase} />
            <Approval demo flat delay={DELAY} onPhase={onPhase} />
          </div>
        </motion.div>

        {!still && btn.x > 0 && (
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }}>
            <motion.div key={cycle} initial={{ x: rest.x, y: rest.y }}
              animate={at ?? { x: [rest.x, rest.x, btn.x], y: [rest.y, rest.y, btn.y] }}
              transition={at ? { duration: phase === 'done' ? 1.1 : 0.5, ease } : cycle === 1 ? { duration: DELAY + 0.6, times: [0, 0.15, 1], ease } : { duration: DELAY + 1.55, times: [0, 0.45, 1], ease }}>
              <motion.div animate={{ scale: phase === 'holding' ? 0.86 : 1 }} transition={{ duration: 0.18, ease }} style={{ transformOrigin: '4px 3px' }}>
                <MousePointer2 size={34} strokeWidth={1.5} fill="#0a0a0a" color="#fff" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" style={{ marginLeft: -4, marginTop: -3 }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
