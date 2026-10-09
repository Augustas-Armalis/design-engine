// The hero's one conceptual reveal: a reply crosses to a meeting. One clock (useStory) drives the product window,
// the floating draft card, the cursor and the "how it works" steps, so all three tell the same moment.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CalendarBlank, CalendarCheck, Check, CircleNotch, Cursor, FunnelSimple, House, PencilSimple, Plus, Sparkle, Tray } from '@phosphor-icons/react'
import { Sidebar } from '../ferry/Shell'
import { AiStatus, Avatar, Btn, CardHead, Checkbox, Chip, Logo, Person, Spark } from '../ferry/ui'
import { INTENT_HUE, REPLIES } from '../ferry/data'

/** Story beats in seconds from load. Every delay in the hero derives from here or from App's T. */
export const BEAT = { row: 1.7, card: 2.3, type: 2.6, ready: 4.15, cursor: 4.3, press: 5.0, booked: 5.15, leave: 6.2 }
const ORDER = ['row', 'card', 'type', 'ready', 'cursor', 'press', 'booked', 'leave'] as const
export type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export function useStory(): Phase {
  const still = useReducedMotion()
  const [p, setP] = useState<Phase>(still ? 7 : 0)
  useEffect(() => {
    if (still) { setP(7); return }
    const ids = ORDER.map((k, i) => setTimeout(() => setP((i + 1) as Phase), BEAT[k] * 1000))
    return () => ids.forEach(clearTimeout)
  }, [still])
  return p
}
// phase index: 1 row, 2 card, 3 typing, 4 ready, 5 cursor, 6 press, 7 booked, 8 cursor gone
const at = (p: Phase, k: (typeof ORDER)[number]) => p >= ORDER.indexOf(k) + 1

const LEAD = { lead: 'Ines Carvalho', title: 'Head of Operations', company: 'Tidewater Freight', logo: '#0e7490', value: 16000 }
const THEIRS = 'Thursday at 15:00 works for us. Can you send an invite?'
const DRAFT = 'Done, Ines. The invite is in your inbox for Thursday 15:00, with a short agenda for the Lisbon pilot.'
const ease = [0.22, 1, 0.36, 1] as const

/* ---------- product window ---------- */

function Odometer({ value }: { value: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-90%', opacity: 0 }} transition={{ duration: 0.5, ease }}>{value}</motion.span>
      </AnimatePresence>
    </span>
  )
}

function AiCell({ p }: { p: Phase }) {
  const s = at(p, 'booked') ? 'booked' : at(p, 'ready') ? 'ready' : 'drafting'
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={s} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="inline-flex">
        {s === 'drafting'
          ? <span className="inline-flex items-center gap-1.5 whitespace-nowrap t14 leading-none text-[var(--sub)]"><CircleNotch size={16} weight="bold" className="animate-spin text-[var(--blue)]" />Drafting</span>
          : <AiStatus s={s === 'booked' ? 'Booked' : 'Draft ready'} />}
      </motion.span>
    </AnimatePresence>
  )
}

export function Product({ p }: { p: Phase }) {
  const th = 'h-8 border-y border-[var(--grid)] px-3 text-left t13 font-[500] text-[var(--sub)] whitespace-nowrap'
  const td = 'h-9 border-b border-[var(--grid)] px-3 align-middle whitespace-nowrap'
  const rows = REPLIES
  const booked = at(p, 'booked')
  return (
    <div className="flex h-full bg-white text-[var(--ink)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--line)] px-5">
          <House size={16} className="text-[var(--soft)]" /><span className="t14 font-[600]">Home</span><span className="t14 text-[var(--soft)]">· Last 30 days</span>
          <div className="ml-auto flex items-center gap-2"><Btn icon={ArrowUpRight}>Share</Btn><Btn primary icon={Plus}>New campaign</Btn></div>
        </div>
        <div className="flex h-12 shrink-0 items-center gap-1 border-b border-[var(--line)] px-3">
          {([['Overview'], ['Replies', at(p, 'row') ? 13 : 12], ['Meetings', booked ? 4 : 3], ['Tasks', 8]] as [string, number?][]).map(([k, n], i) => (
            <span key={k} className={`relative flex h-12 items-center gap-1.5 px-2 t14 leading-none ${i ? 'text-[var(--sub)]' : 'text-[var(--ink)]'}`}>
              {k}{n != null && <span className="tnum t12 text-[var(--soft)]"><Odometer value={String(n)} /></span>}
              {!i && <span className="absolute inset-x-2 -bottom-px h-[1.5px] rounded-full bg-[var(--ink)]" />}
            </span>
          ))}
        </div>
        <div className="flex-1 space-y-4 bg-[#fafafa] p-5">
          <div className="grid grid-cols-4 overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
            {[
              { l: 'Replies', v: at(p, 'row') ? '721' : '720', d: at(p, 'row') ? '+14.8%' : '+14.6%', s: [96, 104, 118, 112, 131, 149, 166, 190] },
              { l: 'Meetings booked', v: booked ? '28' : '27', d: booked ? '+7' : '+6', s: [3, 2, 4, 3, 5, 4, 6, booked ? 8 : 7] },
              { l: 'Pipeline', v: booked ? '$200,300' : '$184,300', d: booked ? '+17.5%' : '+8.1%', s: [120, 128, 131, 140, 152, 160, 170, booked ? 200 : 184] },
              { l: 'Reply rate', v: '2.58%', d: '−0.2 pts', s: [2.9, 2.8, 3.0, 2.9, 2.85, 2.8, 2.7, 2.58], down: true },
            ].map((k, i) => (
              <div key={k.l} className={`flex items-end gap-3 px-4 py-3.5 ${i ? 'border-l border-[var(--line)]' : ''}`}>
                <div className="min-w-0">
                  <div className="t13 text-[var(--sub)]"><span className="underline decoration-[#c9ccd1] decoration-dotted decoration-1 underline-offset-[3px]">{k.l}</span></div>
                  <div className="mt-1.5 flex items-baseline gap-2"><span className="num"><Odometer value={k.v} /></span>
                    <span className={`tnum t12 ${k.down ? 'text-[#c2262f]' : 'text-[#0a7a43]'}`}><Odometer value={k.d} /></span></div>
                </div>
                <span className="mb-1 ml-auto"><Spark values={k.s} down={k.down} /></span>
              </div>
            ))}
          </div>
          <section aria-label="Replies to handle (sample)" className="overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
            <CardHead icon={Tray} hue="#ea7a1f" title="Replies to handle" meta={<Odometer value={at(p, 'row') ? '9' : '8'} />}>
              <span className="btn-white inline-flex h-7 items-center gap-1.5 rounded-[8px] px-2 t14 leading-none"><FunnelSimple size={16} className="text-[var(--soft)]" /><span className="text-[var(--sub)]">Intent is</span>Interested</span>
            </CardHead>
            <table className="w-full border-separate border-spacing-0">
              <thead><tr>
                <th className={`${th} w-10 pl-4 pr-0`}><span className="flex"><Checkbox label="Select all replies" /></span></th>
                <th className={th}>Lead</th><th className={th}>Intent</th><th className={th}>AI</th><th className={th}>Company</th><th className={`${th} text-right`}>Deal size</th><th className={`${th} pr-4`}>Received</th>
              </tr></thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {at(p, 'row') && (
                    <motion.tr key="new" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease }} className="bg-[var(--sel)]">
                      {[
                        <span className="flex"><Checkbox label={`Select ${LEAD.lead}`} /></span>,
                        <Person name={LEAD.lead} />, <Chip hue="green">Interested</Chip>, <AiCell p={p} />,
                        <span className="flex items-center gap-2 t14 leading-none"><Logo name={LEAD.company} hue={LEAD.logo} /><span className="underline decoration-[#e3e4e7] decoration-1 underline-offset-[4px]">{LEAD.company}</span></span>,
                        <span className="tnum t14">${LEAD.value.toLocaleString('en-US')}</span>, <span className="t14 text-[var(--sub)]">now</span>,
                      ].map((c, i) => (
                        <td key={i} className={`h-auto border-b border-[var(--grid)] align-middle whitespace-nowrap ${i === 0 ? 'pl-4 pr-0' : 'px-3'} ${i === 6 ? 'pr-4' : ''}`}>
                          <motion.div initial={{ height: 0 }} animate={{ height: 36 }} transition={{ duration: 0.45, ease }} className={`flex items-center overflow-hidden ${i === 5 ? 'justify-end' : ''}`}>{c}</motion.div>
                        </td>
                      ))}
                    </motion.tr>
                  )}
                </AnimatePresence>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className={`${td} pl-4 pr-0`}><span className="flex"><Checkbox label={`Select ${r.lead}`} /></span></td>
                    <td className={td}><div className="flex h-9 items-center"><Person name={r.lead} /></div></td>
                    <td className={td}><div className="flex h-9 items-center"><Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip></div></td>
                    <td className={td}><div className="flex h-9 items-center"><AiStatus s={r.ai} /></div></td>
                    <td className={td}><div className="flex h-9 items-center gap-2 t14 leading-none"><Logo name={r.company} hue={r.logo} /><span className="underline decoration-[#e3e4e7] decoration-1 underline-offset-[4px]">{r.company}</span></div></td>
                    <td className={`${td} tnum text-right t14`}>{r.value ? `$${r.value.toLocaleString('en-US')}` : '–'}</td>
                    <td className={`${td} pr-4 t14 text-[var(--sub)]`}>{r.received.replace(/ min ago$/, 'm').replace(/ h ago$/, 'h').replace(/^Yesterday$/, '1d')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ---------- floating draft card ---------- */

export function Draft({ p }: { p: Phase }) {
  const still = useReducedMotion()
  const [n, setN] = useState(still ? DRAFT.length : 0)
  const typing = at(p, 'type')
  // typed length is a function of elapsed time, so a slow frame never leaves the draft unfinished
  useEffect(() => {
    if (still || !typing) return
    const t0 = performance.now(), dur = (BEAT.ready - BEAT.type - 0.15) * 1000
    const id = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / dur); setN(Math.round(k * DRAFT.length)); if (k >= 1) clearInterval(id) }, 24)
    return () => clearInterval(id)
  }, [typing, still])
  const sent = at(p, 'booked')
  return (
    <motion.div initial={{ opacity: 0.01, y: 18, scale: 0.98 }} animate={at(p, 'card') ? { opacity: 1, y: 0, scale: 1 } : undefined} transition={{ duration: 0.7, ease }}
      className="relative w-[376px] rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(28,40,64,0.08),0_2px_4px_rgba(28,40,64,0.04),0_28px_56px_-20px_rgba(28,40,64,0.28)]">
      <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
        <Avatar name={LEAD.lead} size={32} />
        <div className="min-w-0 flex-1">
          <div className="t14 font-[600] text-[var(--ink)]">{LEAD.lead}</div>
          <div className="mt-0.5 flex items-center gap-1.5 t13 text-[var(--sub)]"><Logo name={LEAD.company} hue={LEAD.logo} /><span className="truncate">{LEAD.title}, {LEAD.company}</span></div>
        </div>
        <span className="t12 text-[var(--soft)]">now</span>
      </div>
      <div className="space-y-3 p-4">
        <p className="border-l-2 border-[var(--grid)] pl-3 t14 font-[400] text-[var(--sub)]">{THEIRS}</p>
        <div className="rounded-[10px] border border-[#e1e9fb] bg-[linear-gradient(180deg,#f6f9ff,#fbfcff)] p-3">
          <div className="flex items-center gap-1.5 t13 text-[var(--blue-ink)]"><Sparkle size={14} weight="fill" className="text-[var(--blue)]" />Suggested reply</div>
          <p className="relative mt-2 t14 font-[400] text-[var(--ink)]">
            <span className="invisible">{DRAFT}</span>
            <span className="absolute inset-0">{DRAFT.slice(0, n)}{at(p, 'type') && !at(p, 'ready') && <span className="ml-px inline-block h-[15px] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--blue)]" />}</span>
          </p>
          <span className={`mt-2.5 inline-flex h-7 items-center gap-1.5 rounded-[8px] bg-white px-2 t13 text-[var(--ink)] shadow-[0_0_0_1px_rgba(28,40,64,0.1)] transition-opacity duration-300 ${at(p, 'ready') ? 'opacity-100' : 'opacity-0'}`}>
            <CalendarBlank size={14} className="text-[var(--soft)]" />Thu, Sep 17 · 15:00–15:30
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--line)] px-3 py-3">
        <AnimatePresence>{sent && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }} className="whitespace-nowrap pl-1 t13 text-[#0a7a43]">Invite sent · added to pipeline</motion.span>}</AnimatePresence>
        <Btn icon={PencilSimple} className="ml-auto">Edit</Btn>
        <motion.span animate={{ scale: at(p, 'press') && !sent ? 0.95 : 1 }} transition={{ duration: 0.12 }}
          className={`inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-2.5 t14 leading-none text-white transition-colors duration-200 ${sent ? 'bg-[#087a45] shadow-[inset_0_0_0_1px_rgba(0,40,20,0.15)]' : 'btn-primary'}`}>
          {sent ? <CalendarCheck size={16} weight="fill" /> : <Check size={16} weight="bold" />}{sent ? 'Booked' : 'Approve and send'}
        </motion.span>
      </div>
      {/* cursor: arrives from the lower right, presses Approve, leaves */}
      <motion.span aria-hidden initial={{ opacity: 0, x: 150, y: 120 }}
        animate={at(p, 'leave') ? { opacity: 0, x: 30, y: 40 } : at(p, 'cursor') ? { opacity: 1, x: 0, y: 0 } : undefined}
        transition={{ duration: at(p, 'leave') ? 0.5 : 0.7, ease }} className="pointer-events-none absolute bottom-[6px] right-[58px] z-10">
        <Cursor size={22} weight="fill" className="text-[var(--ink)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] [&_path]:[paint-order:stroke] [&_path]:stroke-white [&_path]:[stroke-width:22px] [&_path]:[stroke-linejoin:round]" />
      </motion.span>
    </motion.div>
  )
}

/* ---------- how it works, lit in sync ---------- */

const STEPS = [
  { icon: Tray, t: 'Reads every reply', d: 'and sorts the intent' },
  { icon: Sparkle, t: 'Drafts the answer', d: 'in your voice, with times' },
  { icon: CalendarCheck, t: 'Books the meeting', d: 'when you approve' },
]
export function Steps({ p }: { p: Phase }) {
  const step = at(p, 'booked') ? 2 : at(p, 'card') ? 1 : at(p, 'row') ? 0 : -1
  return (
    <ol aria-label="How Ferry works" className="relative">
      <span aria-hidden className="absolute bottom-[22px] left-[14px] top-[22px] w-px bg-[#dfe3ea]" />
      <motion.span aria-hidden className="absolute left-[14px] top-[22px] w-px origin-top bg-[var(--blue)]" style={{ height: 'calc(100% - 44px)' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: step <= 0 ? 0 : step === 1 ? 0.5 : 1 }} transition={{ duration: 0.6, ease }} />
      {STEPS.map((s, i) => {
        const on = i <= step
        return (
          <li key={s.t} className="relative flex h-11 items-center gap-3.5">
            <span className={`relative grid size-[29px] place-items-center rounded-full transition-[background-color,box-shadow,color] duration-300 ${on ? 'bg-[var(--blue)] text-white shadow-[0_0_0_4px_rgba(38,109,240,0.12)]' : 'bg-white text-[var(--soft)] shadow-[0_0_0_1px_#dfe3ea]'}`}>
              <s.icon size={15} weight={on ? 'fill' : 'regular'} />
            </span>
            <span className={`text-[15px] font-[500] tracking-[-0.01em] transition-colors duration-300 ${on ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}`}>{s.t}</span>
            <span className="text-[15px] tracking-[-0.01em] text-[var(--soft)]">{s.d}</span>
          </li>
        )
      })}
    </ol>
  )
}
