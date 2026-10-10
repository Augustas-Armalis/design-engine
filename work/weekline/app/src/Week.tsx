// Weekline product window: one view (the week), three regions (sidebar, week grid, one AI suggestion), ~9 events, nothing
// under 12.5px (founder: "nobody shows that much"). The one moment: the AI proposes moving a 1:1, you accept, the event
// slides to Thursday and a 2-hour focus block appears where it was. Graphite ladder, blue only for what the AI proposes.
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CalendarDays, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const H = 58, START = 9, DAYS = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16']
type Ev = { d: number; s: number; e: number; t: string; sub?: string; kind?: 'focus' | 'ai' }
const EVENTS: Ev[] = [
  { d: 0, s: 9.5, e: 9.75, t: 'Standup' }, { d: 1, s: 9.5, e: 9.75, t: 'Standup' }, { d: 2, s: 9.5, e: 9.75, t: 'Standup' }, { d: 4, s: 9.5, e: 9.75, t: 'Standup' },
  { d: 0, s: 13, e: 14, t: 'Customer call', sub: 'Northwind · sample' },
  { d: 1, s: 10.5, e: 11.5, t: 'Design review', sub: 'Room 4' },
  { d: 2, s: 13.5, e: 14.25, t: 'Hiring sync' },
  { d: 3, s: 9, e: 12, t: 'Focus', sub: 'Protected', kind: 'focus' },
  { d: 4, s: 10, e: 11.5, t: 'Sprint planning', sub: 'Product team' },
  { d: 4, s: 12.5, e: 13.5, t: 'Lunch and learn' },
]

function Event({ ev, at, animate = true }: { ev: Ev; at: number; animate?: boolean }) {
  const still = useReducedMotion()
  const short = ev.e - ev.s <= 0.3
  return (
    <motion.div className={`absolute left-1 right-1 overflow-hidden rounded-[7px] px-2 ${short ? 'flex items-center' : 'pt-1.5'} ${ev.kind === 'focus' ? 'hatch bg-white/[0.035] shadow-[inset_0_0_0_1px_var(--line-2)]' : ev.kind === 'ai' ? 'bg-[var(--blue-tint)] shadow-[inset_0_0_0_1px_rgba(101,175,255,0.35)]' : 'bg-white/[0.07] shadow-[inset_0_0_0_1px_var(--line)]'}`}
      style={{ top: (ev.s - START) * H + 1, height: (ev.e - ev.s) * H - 2 }}
      initial={still || !animate ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 0.5, ease }}>
      <span aria-hidden className={`absolute inset-y-1.5 left-1 w-[2px] rounded-full ${ev.kind === 'ai' ? 'bg-[var(--blue)]' : ev.kind === 'focus' ? 'bg-white/30' : 'bg-white/45'}`} />
      <div className={`pl-2 text-[12.5px] font-[500] leading-[16px] ${ev.kind === 'ai' ? 'text-[var(--blue-ink)]' : 'text-[#e4e4e7]'}`}>{ev.t}{short && <span className="ml-1.5 font-[400] text-[var(--soft)]">9:30</span>}</div>
      {!short && ev.sub && <div className="pl-2 text-[12.5px] leading-[16px] text-[var(--soft)]">{ev.sub}</div>}
    </motion.div>
  )
}

export default function Week({ at = 0 }: { at?: number }) {
  const still = useReducedMotion()
  const [step, setStep] = useState<'ask' | 'press' | 'moved'>(still ? 'moved' : 'ask')
  useEffect(() => {
    if (still) return
    const a = setTimeout(() => setStep('press'), (at + 3.0) * 1000)
    const b = setTimeout(() => setStep('moved'), (at + 3.35) * 1000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [at, still])
  const moved = step === 'moved'
  const colW = (1120 - 220 - 52) / 5
  const s = (k: number) => at + 0.15 + k * 0.05
  return (
    <div className="sh-5 flex h-[560px] w-[1120px] overflow-hidden rounded-[18px] bg-[var(--panel)] text-left">
      {/* sidebar */}
      <aside aria-label="Calendars" className="w-[220px] shrink-0 border-r border-[var(--line)] px-4 pt-4">
        <motion.div initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: s(0), duration: 0.5 }}>
          <div className="flex items-center justify-between"><span className="text-[13.5px] font-[500]">October 2026</span><span className="flex gap-1 text-[var(--soft)]"><ChevronLeft size={15} strokeWidth={1.6} /><ChevronRight size={15} strokeWidth={1.6} /></span></div>
          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[12.5px]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-[var(--soft)]">{d}</span>)}
            {Array.from({ length: 3 }, (_, i) => <span key={`p${i}`} />)}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => {
              const inWeek = n >= 12 && n <= 16
              return <span key={n} className={`mx-auto grid size-[26px] place-items-center rounded-full tabular-nums ${n === 14 ? 'bg-[#f4f4f5] font-[600] text-[#0a0a0b]' : inWeek ? 'bg-white/[0.06] text-[var(--ink)]' : 'text-[var(--sub)]'}`}>{n}</span>
            })}
          </div>
        </motion.div>
        <motion.div initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: s(2), duration: 0.5 }} className="mt-6">
          <div className="text-[12.5px] font-[500] text-[var(--soft)]">My calendars</div>
          {[['Work', 'bg-white/60'], ['Product team', 'bg-white/40'], ['Hiring', 'bg-white/25'], ['Focus time', 'border border-white/40']].map(([n, c]) => (
            <div key={n} className="flex h-8 items-center gap-2.5 text-[13.5px] text-[#d4d4d8]"><span className={`size-2.5 rounded-[3px] ${c}`} />{n}</div>
          ))}
        </motion.div>
        <motion.div initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: s(4), duration: 0.5 }} className="sh-1 mt-6 rounded-[12px] bg-[var(--raised)] p-3">
          <div className="text-[12.5px] text-[var(--soft)]">Focus this week</div>
          <div className="mt-1 flex items-baseline gap-2"><span className="text-[22px] font-[500] tracking-[-0.02em] tabular-nums">{moved ? '5h' : '3h'}</span><span className={`text-[12.5px] transition-colors duration-500 ${moved ? 'text-[var(--blue-ink)]' : 'text-[var(--soft)]'}`}>{moved ? '+2h from one move' : 'of 6h goal'}</span></div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><motion.div className="h-full rounded-full bg-[var(--blue)]" initial={false} animate={{ width: moved ? '83%' : '50%' }} transition={{ duration: 0.8, ease }} /></div>
        </motion.div>
      </aside>

      {/* week */}
      <section aria-label="Week of October 12" className="relative flex min-w-0 flex-1 flex-col">
        <motion.div initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: s(1), duration: 0.5 }} className="flex h-[52px] shrink-0 items-center gap-3 border-b border-[var(--line)] px-4">
          <span className="text-[15px] font-[500] tracking-[-0.01em]">October 12 – 16</span>
          <span className="flex text-[var(--soft)]"><button type="button" aria-label="Previous week" className="grid size-7 place-items-center rounded-[7px] hover:bg-[var(--hover)]"><ChevronLeft size={16} strokeWidth={1.6} /></button><button type="button" aria-label="Next week" className="grid size-7 place-items-center rounded-[7px] hover:bg-[var(--hover)]"><ChevronRight size={16} strokeWidth={1.6} /></button></span>
          <button type="button" className="btn-soft h-7 rounded-[7px] px-2.5 text-[12.5px]">Today</button>
          <div className="ml-auto flex h-8 items-center rounded-[9px] bg-white/[0.05] p-[3px] text-[12.5px]">
            {['Day', 'Week', 'Month'].map((v) => <span key={v} className={`flex h-[26px] items-center rounded-[6px] px-2.5 ${v === 'Week' ? 'bg-[var(--sel)] text-[var(--ink)] shadow-[inset_0_0_0_1px_var(--line-2)]' : 'text-[var(--soft)]'}`}>{v}</span>)}
          </div>
          <button type="button" className="btn-soft flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[12.5px]"><Sparkles size={14} strokeWidth={1.75} className="text-[var(--blue)]" />Ask Weekline</button>
        </motion.div>
        <div className="grid shrink-0 grid-cols-[52px_repeat(5,1fr)] border-b border-[var(--line)] text-[12.5px]">
          <span />
          {DAYS.map((d, i) => <span key={d} className={`flex h-10 items-center border-l border-[var(--line)] px-3 ${i === 2 ? 'text-[var(--ink)]' : 'text-[var(--soft)]'}`}>{d}{i === 2 && <span className="ml-2 size-1.5 rounded-full bg-[var(--ink)]" />}</span>)}
        </div>
        <div className="relative grid flex-1 grid-cols-[52px_repeat(5,1fr)] overflow-hidden">
          <div className="relative">{Array.from({ length: 8 }, (_, i) => <span key={i} className="absolute right-2 -translate-y-1/2 text-[12.5px] tabular-nums text-[var(--soft)]" style={{ top: i * H }}>{i ? `${START + i}:00` : ''}</span>)}</div>
          {DAYS.map((_, d) => (
            <div key={d} className="relative border-l border-[var(--line)]">
              {Array.from({ length: 8 }, (_, i) => <span key={i} aria-hidden className="absolute inset-x-0 h-px bg-[var(--line)]" style={{ top: i * H }} />)}
              {EVENTS.filter((e) => e.d === d).map((e, i) => <Event key={e.t + i} ev={e} at={s(3) + d * 0.08 + i * 0.05} />)}
              {d === 2 && moved && <Event ev={{ d: 2, s: 10, e: 12, t: 'Focus · roadmap draft', sub: 'Proposed by Weekline', kind: 'ai' }} at={0.25} />}
            </div>
          ))}
          {/* the 1:1 slides from Wednesday 11:00 to Thursday 13:00 */}
          <motion.div className="absolute" style={{ width: colW }} initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1, left: 52 + (moved ? 3 : 2) * colW, top: 0 }} transition={{ opacity: { delay: s(5), duration: 0.5 }, left: { duration: 0.75, ease } }}>
            <motion.div className="relative" initial={false} animate={{ y: moved ? (13 - 11) * H : 0 }} transition={{ duration: 0.75, ease }}>
              <Event ev={{ d: 2, s: 11, e: 11.5, t: '1:1 Jonas', sub: moved ? 'Moved by Weekline' : undefined }} at={0} animate={false} />
            </motion.div>
          </motion.div>
          {/* now line on Wednesday */}
          <span aria-hidden className="absolute h-px bg-[#f4f4f5]/70" style={{ top: (10.75 - START) * H, left: 52 + 2 * colW, width: colW }}><span className="absolute -left-1 -top-[3.5px] size-2 rounded-full bg-[#f4f4f5]" /></span>
          {/* the one AI moment */}
          <motion.div className="sh-3 absolute right-5 top-[96px] w-[300px] rounded-[14px] bg-[var(--raised)] p-3.5" initial={still ? false : { opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: at + 1.4, duration: 0.6, ease }}>
            <div className="flex items-center gap-2 text-[12.5px] text-[var(--blue-ink)]"><Sparkles size={14} strokeWidth={1.75} />Weekline</div>
            <p className="mt-1.5 text-[13.5px] leading-[20px] text-[#e4e4e7]">{moved ? 'Moved your 1:1 with Jonas to Thursday at 13:00. Wednesday morning is yours.' : 'Move your 1:1 with Jonas to Thursday at 13:00? You get two quiet hours on Wednesday for the roadmap.'}</p>
            <div className="mt-3 flex h-7 items-center gap-2">
              {moved ? (
                <><span className="flex items-center gap-1.5 text-[12.5px] text-[var(--soft)]"><CalendarDays size={13} strokeWidth={1.75} />Jonas got a note</span><button type="button" className="ml-auto h-7 rounded-[7px] px-2.5 text-[12.5px] text-[var(--sub)] hover:bg-[var(--hover)]">Undo</button></>
              ) : (
                <><button type="button" className="ml-auto h-7 rounded-[7px] px-2.5 text-[12.5px] text-[var(--sub)] hover:bg-[var(--hover)]">Not now</button>
                  <button type="button" className={`h-7 rounded-[7px] bg-[#f4f4f5] px-3 text-[12.5px] font-[600] text-[#0a0a0b] transition-transform duration-150 ${step === 'press' ? 'scale-[0.96]' : ''}`}>Move it</button></>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
