// Right rail (AlignUI marketing template): a vertical hairline, then the live AI SDR run as a timeline, then what needs you.
// The run is the one moving thing on the page.
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  RiArrowRightLine, RiCalendarScheduleLine, RiCheckLine, RiDraftLine, RiInbox2Line, RiLoader4Line, RiMailForbidLine, RiPriceTag3Line, RiSendPlaneLine,
} from '@remixicon/react'
import type { RemixiconComponentType } from '@remixicon/react'
import { Button, SectionHead } from '../ui'

const STEPS: { icon: RemixiconComponentType; title: string; sub: string; time: string }[] = [
  { icon: RiInbox2Line, title: 'Read 14 new replies', sub: 'From Logistics growth leads', time: '14:02' },
  { icon: RiPriceTag3Line, title: 'Classified intent', sub: '4 interested, 6 not now, 3 away, 1 unsubscribe', time: '14:02' },
  { icon: RiDraftLine, title: 'Drafting follow-ups', sub: '4 drafts for interested leads', time: '14:03' },
  { icon: RiCalendarScheduleLine, title: 'Finding calendar slots', sub: 'Next 5 working days', time: '' },
  { icon: RiSendPlaneLine, title: 'Queue for your review', sub: 'Nothing sends without you', time: '' },
]

function Dot({ state, icon: Icon }: { state: 'done' | 'run' | 'todo'; icon: RemixiconComponentType }) {
  if (state === 'run') return <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_0_0_1px_#335cff,0_0_0_4px_rgba(51,92,255,0.12)]"><RiLoader4Line size={16} className="animate-spin [animation-duration:1.2s]" /></span>
  if (state === 'done') return (
    <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-white text-text-sub shadow-[var(--ring),var(--shadow-xs)]">
      <Icon size={16} /><span className="absolute -bottom-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full bg-success text-white shadow-[0_0_0_2px_#fff]"><RiCheckLine size={10} /></span>
    </span>
  )
  return <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-bg-weak text-text-disabled"><Icon size={16} /></span>
}

export function Run() {
  const still = !!useReducedMotion()
  const [done, setDone] = useState(2)
  useEffect(() => {
    if (still) return
    const id = setInterval(() => setDone((d) => (d >= STEPS.length ? 2 : d + 1)), 4200)
    return () => clearInterval(id)
  }, [still])
  return (
    <section aria-label="AI SDR run (sample)">
      <SectionHead title="AI SDR" sub="Live run on Logistics growth leads"><Button size="sm" variant="stroke">Open</Button></SectionHead>
      <div className="mt-4 flex items-center gap-2 leading-none">
        <span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-primary/40" /><span className="size-1.5 rounded-full bg-primary" /></span>
        <span className="label-xs text-text-strong">{done >= STEPS.length ? 'Ready for review' : 'Working'}</span>
        <span className="tnum ml-auto para-xs text-text-sub">{Math.min(done, STEPS.length)} of {STEPS.length} steps</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-bg-weak"><motion.div className="h-full rounded-full bg-primary" animate={{ width: `${(done / STEPS.length) * 100}%` }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} /></div>
      <ol className="relative mt-5">
        <span aria-hidden className="absolute bottom-4 left-4 top-4 w-px -translate-x-1/2 bg-stroke-soft" />
        {STEPS.map((s, k) => {
          const state = k < done ? 'done' : k === done ? 'run' : 'todo'
          return (
            <li key={s.title} className="relative flex gap-3 pb-5 last:pb-0">
              <Dot state={state} icon={s.icon} />
              <div className="min-w-0 flex-1 pt-1.5">
                <div className="flex items-baseline gap-2"><span className={`label-sm ${state === 'todo' ? 'text-text-soft' : 'text-text-strong'}`}>{s.title}</span>{state !== 'todo' && s.time && <span className="tnum ml-auto para-xs text-text-soft">{s.time}</span>}</div>
                <p className={`mt-0.5 para-xs ${state === 'todo' ? 'text-text-soft' : 'text-text-sub'}`}>{s.sub}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

const ITEMS = [
  { icon: RiMailForbidLine, title: '2 mailboxes hit their bounce limit', body: 'Sending from them is paused until you review the list.', cta: 'Review list' },
  { icon: RiInbox2Line, title: '12 replies in the AI SDR inbox', body: '4 are interested and have a suggested reply ready.', cta: 'Open inbox' },
  { icon: RiDraftLine, title: 'Legal partners, EU is a draft', body: 'Copy was approved 3 days ago but it has no leads yet.', cta: 'Add leads' },
]

export function Attention() {
  return (
    <section aria-label="Needs attention (sample)">
      <SectionHead title="Needs attention" sub="3 things waiting on you" />
      <ul className="mt-4 space-y-5">
        {ITEMS.map((it) => (
          <li key={it.title} className="flex gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-text-sub shadow-[var(--ring),var(--shadow-xs)]"><it.icon size={16} /></span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="label-sm text-text-strong">{it.title}</div>
              <p className="mt-0.5 para-xs text-text-sub">{it.body}</p>
              <a href="#" className="group mt-2 inline-flex items-center gap-1 label-xs text-primary-dark">{it.cta}<RiArrowRightLine size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" /></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
