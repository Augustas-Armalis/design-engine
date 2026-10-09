// The one live thing on the page: the AI SDR working through replies. Everything else is still (founder: no load-in parade).
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { RiCheckLine, RiLoader4Line, RiSparkling2Fill, RiPauseLine, RiArrowRightUpLine } from '@remixicon/react'
import { INTENT } from '../data'
import { Badge, Button } from '../ui'

const STEPS = [
  { label: 'Read 14 new replies', meta: '14 replies' },
  { label: 'Classified intent', meta: '14 of 14' },
  { label: 'Drafting follow-ups', meta: '4 drafts' },
  { label: 'Finding open calendar slots', meta: '3 calendars' },
  { label: 'Queueing drafts for review', meta: '' },
]

function StepIcon({ state }: { state: 'done' | 'run' | 'todo' }) {
  if (state === 'done') return <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success text-white"><RiCheckLine size={14} /></span>
  if (state === 'run') return <span className="grid size-5 shrink-0 place-items-center text-primary"><RiLoader4Line size={20} className="animate-spin [animation-duration:1.2s]" /></span>
  return <span className="grid size-5 shrink-0 place-items-center"><span className="size-[18px] rounded-full border-[1.5px] border-dashed border-stroke-sub" /></span>
}

export default function Agent() {
  const still = !!useReducedMotion()
  const [done, setDone] = useState(2)
  const [secs, setSecs] = useState(74)
  useEffect(() => {
    if (still) return
    const tick = setInterval(() => setSecs((s) => s + 1), 1000)
    const step = setInterval(() => setDone((d) => (d >= STEPS.length ? 2 : d + 1)), 4200)
    return () => { clearInterval(tick); clearInterval(step) }
  }, [still])
  const total = INTENT.reduce((a, b) => a + b.n, 0)
  const pct = Math.round((done / STEPS.length) * 100)
  return (
    <section className="flex flex-col rounded-[16px] bg-white shadow-[var(--ring),var(--shadow-xs)]" aria-label="AI SDR run (sample)">
      <header className="flex items-center gap-3 px-5 pb-3 pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(51,92,255,0.4)]"><RiSparkling2Fill size={20} /></span>
        <div className="min-w-0 flex-1 leading-none">
          <h2 className="label-md text-text-strong">AI SDR</h2>
          <p className="mt-1 truncate para-xs text-text-sub">Logistics growth leads</p>
        </div>
        <Badge tone={done >= STEPS.length ? 'success' : 'primary'} dot>{done >= STEPS.length ? 'Done' : 'Running'}</Badge>
      </header>
      <div className="px-5">
        <div className="flex items-center leading-none"><span className="tnum para-xs text-text-sub">{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')} elapsed</span><span className="tnum ml-auto label-xs text-text-strong">{Math.min(done, STEPS.length)} of {STEPS.length}</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-weak"><motion.div className="h-full rounded-full bg-primary" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} /></div>
      </div>
      <ol className="mt-3 px-3">
        {STEPS.map((s, k) => {
          const state = k < done ? 'done' : k === done ? 'run' : 'todo'
          return (
            <li key={s.label}>
              <div className={`flex h-10 items-center gap-3 rounded-[8px] px-2 leading-none ${state === 'run' ? 'bg-bg-weak' : ''}`}>
                <StepIcon state={state} />
                <span className={`flex-1 truncate label-sm ${state === 'todo' ? 'text-text-soft' : 'text-text-strong'}`}>{s.label}</span>
                {state !== 'todo' && s.meta && <span className="tnum para-xs text-text-sub">{s.meta}</span>}
              </div>
              <AnimatePresence initial={false}>
                {k === 1 && done > 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }} className="overflow-hidden">
                    <div className="mb-1 ml-10 mr-2 mt-1">
                      <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">{INTENT.map((c) => <span key={c.label} className={`h-full ${c.cls}`} style={{ flex: c.n }} />)}</div>
                      <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
                        {INTENT.map((c) => (
                          <div key={c.label} className="flex items-center gap-2 leading-none"><span className={`size-2 rounded-[2px] ${c.cls}`} /><span className="para-xs text-text-sub">{c.label}</span><span className="tnum ml-auto label-xs text-text-strong">{c.n}</span></div>
                        ))}
                      </div>
                      <div className="sr-only">{total} replies classified</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
      <footer className="mt-auto flex gap-2 border-t border-stroke-soft px-5 py-3.5">
        <Button size="sm" variant="stroke" icon={RiArrowRightUpLine} className="flex-1">Open run</Button>
        <Button size="sm" variant="ghost" icon={RiPauseLine}>Pause</Button>
      </footer>
    </section>
  )
}
