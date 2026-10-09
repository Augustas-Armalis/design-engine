// The hero product is live (Lightfield grammar): replies keep arriving, the AI drafts them, a cursor approves inline and
// rows flip to Booked while the KPIs tick. One status pill above the window narrates the current action.
// One script (SCRIPT) is the clock for all of it; reduced motion applies the whole script at once.
import { useEffect, useReducer } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CalendarCheck, Check, CircleNotch, Cursor, FunnelSimple, House, Plus, Sparkle, Tray } from '@phosphor-icons/react'
import { Sidebar } from '../ferry/Shell'
import { RollingNumber } from '../kit'
import { AiStatus, Btn, CardHead, Checkbox, Chip, Logo, Person, Spark } from '../ferry/ui'
import { INTENT_HUE, REPLIES, type Reply } from '../ferry/data'

type Ai = 'drafting' | 'ready' | 'approving' | 'booked' | 'needs'
type Row = { id: string; lead: string; company: string; logo: string; intent: Reply['intent']; value: number; received: string; ai: Ai; when?: string; fresh?: boolean }
type Pill = { kind: 'idle' | 'read' | 'draft' | 'wait' | 'book'; text: string }
type State = { rows: Row[]; arrived: number; booked: number; won: number; pill: Pill }

const short = (r: string) => r.replace(/ min ago$/, 'm').replace(/ h ago$/, 'h').replace(/^Yesterday$/, '1d')
const BASE: Row[] = REPLIES.map((r) => ({ id: `r${r.id}`, lead: r.lead, company: r.company, logo: r.logo, intent: r.intent, value: r.value, received: short(r.received), ai: r.ai === 'Booked' ? 'booked' : r.ai === 'Needs you' ? 'needs' : 'ready' }))
// sample leads that arrive during the hero (fictional)
const IN: Record<string, Omit<Row, 'ai' | 'received'>> = {
  n1: { id: 'n1', lead: 'Ines Carvalho', company: 'Tidewater Freight', logo: '#0e7490', intent: 'Interested', value: 16000, when: 'Thu 15:00' },
  n2: { id: 'n2', lead: 'Jonas Weber', company: 'Weber & Lang', logo: '#be185d', intent: 'Interested', value: 11500, when: 'Fri 10:30' },
  n3: { id: 'n3', lead: 'Amara Okoye', company: 'Harbourline', logo: '#15803d', intent: 'Question', value: 9000 },
  n4: { id: 'n4', lead: 'Lukas Brandt', company: 'Brandt Search', logo: '#1d4ed8', intent: 'Interested', value: 13000 },
}
type Act = { t: number; k: 'arrive' | 'ready' | 'approve' | 'book'; id: string }
export const SCRIPT: Act[] = [
  { t: 2.0, k: 'arrive', id: 'n1' }, { t: 2.9, k: 'ready', id: 'n1' }, { t: 3.8, k: 'approve', id: 'n1' }, { t: 4.8, k: 'book', id: 'n1' },
  { t: 5.7, k: 'arrive', id: 'n2' }, { t: 6.6, k: 'ready', id: 'n2' }, { t: 7.4, k: 'arrive', id: 'n3' }, { t: 8.3, k: 'ready', id: 'n3' },
  { t: 9.1, k: 'approve', id: 'n2' }, { t: 10.1, k: 'book', id: 'n2' }, { t: 11.0, k: 'arrive', id: 'n4' }, { t: 11.9, k: 'ready', id: 'n4' },
]
const first = (n: string) => n.split(' ')[0]

function step(s: State, a: Act): State {
  const lead = IN[a.id]
  const set = (ai: Ai) => s.rows.map((r) => (r.id === a.id ? { ...r, ai } : r))
  switch (a.k) {
    case 'arrive': return { ...s, arrived: s.arrived + 1, rows: [{ ...lead, ai: 'drafting' as Ai, received: 'now', fresh: true }, ...s.rows].slice(0, 12), pill: { kind: 'read', text: `Reading a reply from ${lead.lead}` } }
    case 'ready': return { ...s, rows: set('ready'), pill: { kind: 'draft', text: `Drafted a reply to ${first(lead.lead)}${lead.when ? ', with an invite' : ''}` } }
    case 'approve': return { ...s, rows: set('approving'), pill: { kind: 'wait', text: `Waiting for your approval on ${first(lead.lead)}` } }
    case 'book': return { ...s, booked: s.booked + 1, won: s.won + lead.value, rows: set('booked'), pill: { kind: 'book', text: `Booked ${lead.lead} for ${lead.when}` } }
  }
}
const INIT: State = { rows: BASE, arrived: 0, booked: 0, won: 0, pill: { kind: 'idle', text: 'Watching replies across 4 campaigns' } }

export function useLive(): State {
  const still = useReducedMotion()
  const [s, dispatch] = useReducer((st: State, a: Act | 'all') => (a === 'all' ? SCRIPT.reduce(step, st) : step(st, a)), INIT)
  useEffect(() => {
    if (still) { dispatch('all'); return }
    const ids = SCRIPT.map((a) => setTimeout(() => dispatch(a), a.t * 1000))
    return () => ids.forEach(clearTimeout)
  }, [still])
  return s
}

const ease = [0.22, 1, 0.36, 1] as const

// numbers roll digit by digit (kit RollingNumber); `at` = when the first roll-up starts
function Odometer({ value, at = 0 }: { value: string; at?: number }) {
  return <RollingNumber value={value} at={at} />
}

/* ---------- status pill above the window ---------- */

export function StatusPill({ pill }: { pill: Pill }) {
  const icon = {
    idle: <span className="relative grid size-4 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[#22c55e] opacity-40" /><span className="size-2 rounded-full bg-[#16a34a]" /></span>,
    read: <CircleNotch size={16} weight="bold" className="animate-spin text-[var(--blue)]" />,
    draft: <Sparkle size={16} weight="fill" className="text-[var(--blue)]" />,
    wait: <Check size={16} weight="bold" className="text-[var(--sub)]" />,
    book: <CalendarCheck size={16} weight="fill" className="text-[#0a8a4f]" />,
  }[pill.kind]
  return (
    <motion.div layout transition={{ duration: 0.35, ease }} className="inline-flex h-10 items-center gap-2.5 rounded-[12px] bg-white/90 pl-3 pr-3.5 shadow-[0_0_0_1px_rgba(28,40,64,0.08),0_1px_2px_rgba(28,40,64,0.05),0_8px_20px_-12px_rgba(28,40,64,0.25)] backdrop-blur-md">
      <motion.span layout="position" className="t14 font-[600] text-[var(--ink)]">AI SDR</motion.span>
      <motion.span layout="position" className="h-4 w-px bg-[var(--grid)]" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={pill.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}
          className="flex items-center gap-2 whitespace-nowrap t14 text-[var(--sub)]">{icon}{pill.text}</motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------- product ---------- */

function AiCell({ r }: { r: Row }) {
  return (
    <div className="relative flex h-9 items-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={r.ai} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="inline-flex items-center">
          {r.ai === 'drafting' && <span className="inline-flex items-center gap-1.5 whitespace-nowrap t14 leading-none text-[var(--sub)]"><CircleNotch size={16} weight="bold" className="animate-spin text-[var(--blue)]" />Drafting</span>}
          {r.ai === 'ready' && <AiStatus s="Draft ready" />}
          {r.ai === 'needs' && <AiStatus s="Needs you" />}
          {r.ai === 'booked' && <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><AiStatus s="Booked" />{r.when && <span className="t14 text-[var(--soft)]">· {r.when}</span>}</span>}
          {r.ai === 'approving' && (
            <span className="relative inline-flex items-center gap-2">
              <AiStatus s="Draft ready" />
              <motion.span initial={{ scale: 1 }} animate={{ scale: [1, 1, 0.94, 1] }} transition={{ duration: 0.9, times: [0, 0.68, 0.78, 0.9] }}
                className="btn-primary inline-flex h-6 items-center gap-1 rounded-[7px] px-2 t13 leading-none text-white"><Check size={13} weight="bold" />Approve</motion.span>
              <motion.span aria-hidden initial={{ opacity: 0, x: 110, y: 70 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.6, ease }} className="pointer-events-none absolute -right-3 top-3 z-10">
                <Cursor size={22} weight="fill" className="text-[var(--ink)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] [&_path]:[paint-order:stroke] [&_path]:stroke-white [&_path]:[stroke-width:22px] [&_path]:[stroke-linejoin:round]" />
              </motion.span>
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/** intro: when the window has landed (s). The whole product builds once, top to bottom: sidebar items (25ms apart) alongside
 *  the header, tabs, KPI cards (numbers roll up digit by digit, sparks grow), then the table rows (35ms apart). Rows that
 *  arrive later use their own height build. The live SCRIPT starts after this finishes. */
export function Product({ s, intro = 0 }: { s: State; intro?: number }) {
  const still = useReducedMotion()
  const build = (d: number) => (still ? { initial: false as const } : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: intro + d, duration: 0.45, ease } })
  const th = 'h-8 border-y border-[var(--grid)] px-3 text-left t13 font-[500] text-[var(--sub)] whitespace-nowrap'
  const td = 'border-b border-[var(--grid)] px-3 align-middle whitespace-nowrap'
  const pct = (n: number) => `+${(n * 100).toFixed(1)}%`
  const kpis = [
    { l: 'Replies', v: String(720 + s.arrived), d: pct((720 + s.arrived) / 628 - 1), sp: [96, 104, 118, 112, 131, 149, 166, 190 + s.arrived * 4] },
    { l: 'Meetings booked', v: String(27 + s.booked), d: `+${6 + s.booked}`, sp: [3, 2, 4, 3, 5, 4, 6, 7 + s.booked] },
    { l: 'Pipeline', v: `$${(184300 + s.won).toLocaleString('en-US')}`, d: pct((184300 + s.won) / 170490 - 1), sp: [120, 128, 131, 140, 152, 160, 170, 184 + s.won / 1000] },
    { l: 'Reply rate', v: '2.58%', d: '−0.2 pts', sp: [2.9, 2.8, 3.0, 2.9, 2.85, 2.8, 2.7, 2.58], down: true },
  ]
  return (
    <div className="flex h-full bg-white text-[var(--ink)]">
      <Sidebar intro={intro} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--line)] px-5">
          <motion.span {...build(0)} className="flex items-center gap-2"><House size={16} className="text-[var(--soft)]" /><span className="t14 font-[600]">Home</span><span className="t14 text-[var(--soft)]">· Last 30 days</span></motion.span>
          <motion.div {...build(0.05)} className="ml-auto flex items-center gap-2"><Btn icon={ArrowUpRight}>Share</Btn><Btn primary icon={Plus}>New campaign</Btn></motion.div>
        </div>
        <motion.div {...build(0.08)} className="flex h-12 shrink-0 items-center gap-1 border-b border-[var(--line)] px-3">
          {([['Overview'], ['Replies', 12 + s.arrived], ['Meetings', 3 + s.booked], ['Tasks', 8]] as [string, number?][]).map(([k, n], i) => (
            <span key={k} className={`relative flex h-12 items-center gap-1.5 px-2 t14 leading-none ${i ? 'text-[var(--sub)]' : 'text-[var(--ink)]'}`}>
              {k}{n != null && <span className="tnum t12 text-[var(--soft)]"><Odometer value={String(n)} at={intro + 0.12 + i * 0.04} /></span>}
              {!i && <span className="absolute inset-x-2 -bottom-px h-[1.5px] rounded-full bg-[var(--ink)]" />}
            </span>
          ))}
        </motion.div>
        <div className="flex-1 space-y-4 bg-[#fafafa] p-5">
          <div className="grid grid-cols-4 overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
            {kpis.map((k, i) => (
              <motion.div key={k.l} {...build(0.12 + i * 0.06)} className={`flex items-end gap-3 px-4 py-3.5 ${i ? 'border-l border-[var(--line)]' : ''}`}>
                <div className="min-w-0">
                  <div className="t13 text-[var(--sub)]"><span className="underline decoration-[#c9ccd1] decoration-dotted decoration-1 underline-offset-[3px]">{k.l}</span></div>
                  <div className="mt-1.5 flex items-baseline gap-2"><span className="num"><Odometer value={k.v} at={intro + 0.18 + i * 0.06} /></span>
                    <span className={`tnum t12 ${k.down ? 'text-[#c2262f]' : 'text-[#0a7a43]'}`}><Odometer value={k.d} at={intro + 0.4 + i * 0.06} /></span></div>
                </div>
                <motion.span className="mb-1 ml-auto origin-bottom" initial={still ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: intro + 0.3 + i * 0.06, duration: 0.6, ease }}><Spark values={k.sp} down={k.down} /></motion.span>
              </motion.div>
            ))}
          </div>
          <motion.section {...build(0.36)} aria-label="Replies to handle (sample)" className="overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
            <CardHead icon={Tray} hue="#ea7a1f" title="Replies to handle" meta={<Odometer value={String(8 + s.arrived - s.booked)} at={intro + 0.42} />}>
              <span className="btn-white inline-flex h-7 items-center gap-1.5 rounded-[8px] px-2 t14 leading-none"><FunnelSimple size={16} className="text-[var(--soft)]" /><span className="text-[var(--sub)]">Sorted by</span>Newest</span>
            </CardHead>
            <table className="w-full border-separate border-spacing-0">
              <thead><tr>
                <th className={`${th} w-10 pl-4 pr-0`}><span className="flex"><Checkbox label="Select all replies" /></span></th>
                <th className={th}>Lead</th><th className={th}>Intent</th><th className={`${th} w-[200px]`}>AI</th><th className={`${th} text-right`}>Deal size</th><th className={th}>Company</th><th className={`${th} pr-4`}>Received</th>
              </tr></thead>
              <tbody>
                {s.rows.map((r, ri) => {
                  const cells = [
                    <span className="flex"><Checkbox label={`Select ${r.lead}`} /></span>,
                    <Person name={r.lead} />, <Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip>, <AiCell r={r} />,
                    <span className="tnum t14">{r.value ? `$${r.value.toLocaleString('en-US')}` : '–'}</span>,
                    <span className="flex items-center gap-2 t14 leading-none"><Logo name={r.company} hue={r.logo} /><span className="underline decoration-[#e3e4e7] decoration-1 underline-offset-[4px]">{r.company}</span></span>,
                    <span className="tnum t14 text-[var(--sub)]">{r.received}</span>,
                  ]
                  return (
                    <motion.tr key={r.id} {...(r.fresh ? { initial: false as const } : build(0.46 + ri * 0.035))} className={`transition-colors duration-700 ${r.fresh && r.ai !== 'booked' ? 'bg-[var(--sel)]' : ''}`}>
                      {cells.map((c, i) => (
                        <td key={i} className={`${td} ${i === 0 ? 'pl-4 pr-0' : ''} ${i === 6 ? 'pr-4' : ''}`}>
                          <motion.div initial={r.fresh ? { height: 0, opacity: 0 } : false} animate={{ height: 36, opacity: 1 }} transition={{ duration: 0.45, ease }}
                            className={`flex items-center ${i === 3 ? '' : 'overflow-hidden'} ${i === 4 ? 'justify-end' : ''}`}>{c}</motion.div>
                        </td>
                      ))}
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
