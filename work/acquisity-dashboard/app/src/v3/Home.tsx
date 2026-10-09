// Home as a work surface (Kargul: one primary view to full detail; Attio: attribute types render one way everywhere).
// Toolbars in 48px bands; KPI strip with micro sparks; the "Replies to handle" grid; the selected reply opens in a side panel;
// a daily trend with the previous period dotted underneath (Rico analytics); campaigns with Kargul's segmented meter.
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowUpRight, ArrowsDownUp, CalendarBlank, CaretDown, ChartLineUp, Check, DotsThree, FunnelSimple, House, PaperPlaneTilt, PencilSimple, Plus, Sparkle, Tray, X,
} from '@phosphor-icons/react'
import { AiStatus, Avatar, Btn, CardHead, Checkbox, Chip, Ghost, Logo, Meter, Person, Spark } from './ui'
import { CAMPAIGNS, DAILY, DAYS, INTENT_HUE, PREV, REPLIES, short } from './data'

const money = (n: number) => (n ? `$${n.toLocaleString('en-US')}` : '–')
const TABS = [{ k: 'Overview' }, { k: 'Replies', n: 12 }, { k: 'Meetings', n: 3 }, { k: 'Tasks', n: 8 }]
const KPI = [
  { label: 'Replies', value: '720', delta: '+14.6%', up: true, spark: [96, 104, 118, 112, 131, 149, 166, 190] },
  { label: 'Meetings booked', value: '27', delta: '+6', up: true, spark: [3, 2, 4, 3, 5, 4, 6, 7] },
  { label: 'Pipeline', value: '$184,300', delta: '+8.1%', up: true, spark: [120, 128, 131, 140, 152, 160, 170, 184] },
  { label: 'Reply rate', value: '2.58%', delta: '−0.2 pts', up: false, spark: [2.9, 2.8, 3.0, 2.9, 2.85, 2.8, 2.7, 2.58] },
]
const card = 'rounded-[12px] border border-[var(--line)] bg-white'

function Bands() {
  const [tab, setTab] = useState('Overview')
  return (
    <>
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--line)] px-5">
        <House size={16} className="text-[var(--soft)]" /><h1 className="t14 font-[600] text-[var(--ink)]">Home</h1>
        <span className="t14 text-[var(--soft)]">· Last 30 days</span>
        <div className="ml-auto flex items-center gap-2"><Btn icon={ArrowUpRight}>Share</Btn><Btn primary icon={Plus}>New campaign</Btn></div>
      </div>
      <div className="flex h-12 shrink-0 items-center gap-1 border-b border-[var(--line)] px-3">
        {TABS.map((t) => (
          <button key={t.k} type="button" onClick={() => setTab(t.k)} aria-pressed={tab === t.k} className={`relative flex h-12 items-center gap-1.5 px-2 t14 leading-none transition-colors ${tab === t.k ? 'text-[var(--ink)]' : 'text-[var(--sub)] hover:text-[var(--ink)]'}`}>
            {t.k}{t.n != null && <span className="tnum t12 text-[var(--soft)]">{t.n}</span>}
            {tab === t.k && <motion.span layoutId="tab-line" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} className="absolute inset-x-2 -bottom-px h-[1.5px] rounded-full bg-[var(--ink)]" />}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 pr-2"><Ghost icon={CalendarBlank}>Aug 18 – Sep 15</Ghost><Ghost dashed icon={ArrowsDownUp}>Sort</Ghost><Ghost dashed icon={FunnelSimple}>Filter</Ghost></div>
      </div>
    </>
  )
}

function Kpis() {
  return (
    <div className={`grid grid-cols-4 overflow-hidden ${card}`}>
      {KPI.map((k, i) => (
        <div key={k.label} className={`flex items-end gap-3 px-4 py-3.5 ${i ? 'border-l border-[var(--line)]' : ''}`}>
          <div className="min-w-0">
            <div className="t13 text-[var(--sub)]"><span className="underline decoration-[#c9ccd1] decoration-dotted decoration-1 underline-offset-[3px]">{k.label}</span></div>
            <div className="mt-1.5 flex items-baseline gap-2"><span className="num text-[var(--ink)]">{k.value}</span>
              <span className={`tnum t12 ${k.up ? 'text-[#0a7a43]' : 'text-[#c2262f]'}`}>{k.delta}</span></div>
          </div>
          <span className="mb-1 ml-auto"><Spark values={k.spark} down={!k.up} /></span>
        </div>
      ))}
    </div>
  )
}

function Table({ sel, setSel }: { sel: number; setSel: (n: number) => void }) {
  const total = REPLIES.reduce((a, r) => a + r.value, 0)
  const th = 'h-8 border-y border-[var(--grid)] px-3 text-left t13 font-[500] text-[var(--sub)]'
  const td = 'h-9 border-b border-[var(--grid)] px-3 align-middle'
  return (
    <section aria-label="Replies to handle (sample)" className={`min-w-0 overflow-hidden ${card}`}>
      <CardHead icon={Tray} hue="#ea7a1f" title="Replies to handle" meta={8}>
        <span className="btn-white inline-flex h-7 items-center gap-1.5 rounded-[8px] pl-2 pr-1 t14 leading-none"><FunnelSimple size={16} className="text-[var(--soft)]" /><span className="text-[var(--sub)]">Intent is</span><span className="text-[var(--ink)]">Interested</span><button type="button" aria-label="Remove filter" className="grid size-5 place-items-center rounded-[6px] text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--ink)]"><X size={12} weight="bold" /></button></span>
        <Btn icon={Sparkle}>Draft all</Btn>
      </CardHead>
      <table className="w-full border-separate border-spacing-0">
        <thead><tr>
          <th className={`${th} w-10 pl-4 pr-0`}><span className="flex"><Checkbox label="Select all replies" /></span></th>
          <th className={th}>Lead</th><th className={th}>Company</th><th className={th}>Intent</th>
          <th className={`${th} text-right`}>Deal size</th><th className={th}>Received</th><th className={`${th} pr-4`}>AI</th>
        </tr></thead>
        <tbody>
          {REPLIES.map((r) => (
            <tr key={r.id} onClick={() => setSel(r.id)} aria-selected={sel === r.id} className={`cursor-pointer transition-colors duration-100 ${sel === r.id ? 'bg-[var(--sel)]' : 'hover:bg-[#fafafb]'}`}>
              <td className={`${td} pl-4 pr-0`}><span className="flex"><Checkbox label={`Select ${r.lead}`} /></span></td>
              <td className={td}><div className="flex h-9 items-center"><Person name={r.lead} /></div></td>
              <td className={td}><div className="flex h-9 items-center gap-2 t14 leading-none text-[var(--ink)]"><Logo name={r.company} hue={r.logo} /><span className="whitespace-nowrap underline decoration-[#e3e4e7] decoration-1 underline-offset-[4px]">{r.company}</span></div></td>
              <td className={td}><div className="flex h-9 items-center"><Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip></div></td>
              <td className={`${td} tnum text-right t14 text-[var(--ink)]`}>{money(r.value)}</td>
              <td className={`${td} tnum whitespace-nowrap t14 text-[var(--sub)]`}>{short(r.received)}</td>
              <td className={`${td} pr-4`}><div className="flex h-9 items-center"><AiStatus s={r.ai} /></div></td>
            </tr>
          ))}
          <tr>
            <td /><td className="h-9 px-3 t13 text-[var(--soft)]">8 replies</td><td /><td />
            <td className="tnum h-9 whitespace-nowrap px-3 text-right t13 text-[var(--sub)]"><span className="text-[var(--soft)]">Sum </span>{money(total)}</td><td /><td />
          </tr>
        </tbody>
      </table>
    </section>
  )
}

function Panel({ id }: { id: number }) {
  const r = REPLIES.find((x) => x.id === id)!
  const [sent, setSent] = useState<number[]>([])
  return (
    <aside aria-label="Selected reply (sample)" className={`flex w-[352px] shrink-0 flex-col overflow-hidden ${card}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }} className="flex flex-1 flex-col">
          <div className="flex items-start gap-3 border-b border-[var(--line)] p-4">
            <Avatar name={r.lead} size={32} />
            <div className="min-w-0 flex-1">
              <div className="t14 font-[600] text-[var(--ink)]">{r.lead}</div>
              <div className="mt-0.5 flex items-center gap-1.5 t13 text-[var(--sub)]"><Logo name={r.company} hue={r.logo} /><span className="truncate">{r.title}, {r.company}</span></div>
            </div>
            <button type="button" aria-label="Close" className="press -mr-1 -mt-1 grid size-7 place-items-center rounded-[8px] text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--ink)]"><X size={16} /></button>
          </div>
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
            <Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip><AiStatus s={r.ai} />
            <span className="ml-auto t13 text-[var(--sub)]"><span className="tnum text-[var(--ink)]">{money(r.value)}</span> deal</span>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <div className="t13 text-[var(--soft)]">Their reply · {r.received}</div>
              <p className="mt-1.5 t14 font-[400] text-[var(--ink)]">{r.message}</p>
            </div>
            <div className="rounded-[10px] border border-[#e1e9fb] bg-[linear-gradient(180deg,#f6f9ff,#fbfcff)] p-3">
              <div className="flex items-center gap-1.5 t13 text-[var(--blue-ink)]"><Sparkle size={14} weight="fill" className="text-[var(--blue)]" />Suggested reply</div>
              <p className="mt-2 t14 font-[400] text-[var(--ink)]">{r.draft}</p>
            </div>
            <div>
              <div className="t13 text-[var(--soft)]">Activity</div>
              <ol className="relative mt-2">
                <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-[var(--grid)]" />
                {[['Replied to step 2', r.received], ['Opened the email 3 times', 'Yesterday'], ['Step 1 sent by AI SDR', 'Sep 9'], ['Added from ' + r.campaign, 'Sep 2']].map(([t, w], k) => (
                  <li key={t} className="relative flex items-center gap-3 py-1.5">
                    <span className={`relative z-10 size-[11px] shrink-0 rounded-full border-2 border-white ${k === 0 ? 'bg-[var(--blue)]' : 'bg-[#c9ccd1]'}`} />
                    <span className="flex-1 t13 text-[var(--ink)]">{t}</span><span className="t12 text-[var(--soft)]">{w}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-[var(--line)] p-3">
            <button type="button" className="press h-7 rounded-[8px] px-2.5 t14 text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]">Dismiss</button>
            <Btn icon={PencilSimple} className="ml-auto">Edit</Btn>
            <button type="button" onClick={() => setSent((s) => [...s, id])} className="btn-primary press inline-flex h-7 items-center gap-1.5 rounded-[8px] px-2.5 t14 leading-none text-white">
              <Check size={16} weight="bold" />{sent.includes(id) ? 'Sent' : 'Approve and send'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}

/** Daily replies vs the previous period. SVG in a 100x100 box stretched to the plot; strokes stay 1.5px (non-scaling);
 *  labels, crosshair, dot and tooltip are HTML positioned in % so they never stretch. */
function Trend() {
  const [h, setH] = useState<number | null>(null)
  const n = DAILY.length, top = 40
  const X = (i: number) => (i / (n - 1)) * 100, Y = (v: number) => 100 - (v / top) * 100
  // monotone cubic (Fritsch-Carlson): smooth without overshooting a day's real value
  const line = (vs: number[]) => {
    const p = vs.map((v, i) => [X(i), Y(v)]), d = p.slice(1).map((q, i) => (q[1] - p[i][1]) / (q[0] - p[i][0]))
    const m = p.map((_, i) => (i === 0 ? d[0] : i === p.length - 1 ? d[i - 1] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2))
    return p.map((q, i) => {
      if (!i) return `M${q[0].toFixed(2)},${q[1].toFixed(2)}`
      const o = p[i - 1], h3 = (q[0] - o[0]) / 3
      return `C${(o[0] + h3).toFixed(2)},${(o[1] + m[i - 1] * h3).toFixed(2)} ${(q[0] - h3).toFixed(2)},${(q[1] - m[i] * h3).toFixed(2)} ${q[0].toFixed(2)},${q[1].toFixed(2)}`
    }).join('')
  }
  const at = h ?? n - 1
  const day = (d: Date, long = false) => d.toLocaleDateString('en-US', long ? { weekday: 'short', month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric' })
  const ticks = [0, 7, 14, 21, 28]
  return (
    <section aria-label="Replies per day (sample)" className={`flex min-w-0 flex-col ${card}`}>
      <CardHead icon={ChartLineUp} hue="#266df0" title="Replies per day">
        <span className="flex items-center gap-3 t12 text-[var(--sub)]">
          <span className="flex items-center gap-1.5"><span className="h-[2px] w-2.5 rounded-full bg-[var(--blue)]" />This period</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 border-t-[1.5px] border-dotted border-[#a9adb4]" />Previous</span>
        </span>
      </CardHead>
      <div className="flex flex-1 flex-col px-4 pb-3">
        <div className="relative ml-7 min-h-[124px] flex-1">
          {[0, 10, 20, 30, 40].map((v) => (
            <div key={v} className="absolute inset-x-0" style={{ top: `${Y(v)}%` }}>
              <div className={`border-t ${v ? 'border-dashed border-[#eceef0]' : 'border-[var(--grid)]'}`} />
              <span className="tnum absolute -left-7 w-5 -translate-y-1/2 text-right t12 font-[400] text-[var(--soft)]">{v}</span>
            </div>
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs><linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#266df0" stopOpacity="0.14" /><stop offset="1" stopColor="#266df0" stopOpacity="0" /></linearGradient></defs>
            <path d={`${line(DAILY)}L100,100L0,100Z`} fill="url(#trend-fill)" />
            <path d={line(PREV)} fill="none" stroke="#b4b8bf" strokeWidth="1.25" strokeDasharray="1 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d={line(DAILY)} fill="none" stroke="#266df0" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {h != null && <div className="pointer-events-none absolute inset-y-0 w-px bg-[#d4d6da]" style={{ left: `${X(at)}%` }} />}
          <span className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--blue)] shadow-[0_0_0_1px_rgba(38,109,240,0.25)] transition-[left,top] duration-75" style={{ left: `${X(at)}%`, top: `${Y(DAILY[at])}%` }} />
          <AnimatePresence>
            {h != null && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
                className="pointer-events-none absolute top-0 z-10 w-[148px] rounded-[10px] bg-white p-2.5 shadow-[0_0_0_1px_rgba(28,40,64,0.08),0_6px_16px_-4px_rgba(28,40,64,0.14)]"
                style={X(at) > 62 ? { right: `${100 - X(at)}%`, marginRight: 10 } : { left: `${X(at)}%`, marginLeft: 10 }}>
                <div className="t12 text-[var(--soft)]">{day(DAYS[at], true)}</div>
                <div className="mt-1.5 flex items-center gap-1.5 t13 text-[var(--sub)]"><span className="size-1.5 rounded-full bg-[var(--blue)]" />Replies<span className="tnum ml-auto text-[var(--ink)]">{DAILY[at]}</span></div>
                <div className="mt-1 flex items-center gap-1.5 t13 text-[var(--sub)]"><span className="size-1.5 rounded-full bg-[#b4b8bf]" />Previous<span className="tnum ml-auto text-[var(--ink)]">{PREV[at]}</span></div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 cursor-crosshair" onPointerLeave={() => setH(null)}
            onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); setH(Math.max(0, Math.min(n - 1, Math.round(((e.clientX - b.left) / b.width) * (n - 1))))) }} />
        </div>
        <div className="relative ml-7 mt-2 h-4">
          {ticks.map((i, k) => (
            <span key={i} className={`tnum absolute whitespace-nowrap t12 font-[400] text-[var(--soft)] ${k === 0 ? '' : k === ticks.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`} style={{ left: `${X(i)}%` }}>{day(DAYS[i])}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Campaigns() {
  return (
    <section aria-label="Campaigns (sample)" className={`flex min-w-0 flex-col ${card}`}>
      <CardHead icon={PaperPlaneTilt} hue="#0f9d6b" title="Campaigns" meta="3 running">
        <button type="button" aria-label="Campaign options" className="press grid size-7 place-items-center rounded-[8px] text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--ink)]"><DotsThree size={16} weight="bold" /></button>
      </CardHead>
      <div className="flex-1 px-4 pb-2">
        {CAMPAIGNS.map((c, i) => (
          <div key={c.name} className={`flex h-10 items-center gap-3 ${i ? 'border-t border-[var(--line)]' : ''}`}>
            <span className="flex-1 truncate t14 text-[var(--ink)]">{c.name}</span>
            <Meter value={c.rate / 4} hue={c.hue} n={10} />
            <span className="tnum w-10 text-right t13 text-[var(--ink)]">{c.rate ? `${c.rate}%` : '–'}</span>
            <span className="flex w-[68px] justify-end"><Chip hue={c.status === 'Sending' ? 'green' : c.status === 'Paused' ? 'yellow' : 'grey'}>{c.status}</Chip></span>
          </div>
        ))}
      </div>
      <a href="#" className="flex h-10 items-center gap-1 border-t border-[var(--line)] px-4 t13 text-[var(--sub)] hover:text-[var(--ink)]">View all campaigns<CaretDown size={12} className="-rotate-90" /></a>
    </section>
  )
}

export default function HomeView() {
  const [sel, setSel] = useState(1)
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-white">
      <Bands />
      <div className="flex-1 overflow-y-auto bg-[#fafafa] p-5">
        <div className="space-y-4">
          <Kpis />
          <div className="flex items-stretch gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <Table sel={sel} setSel={setSel} />
              <div className="grid flex-1 grid-cols-2 gap-4"><Trend /><Campaigns /></div>
            </div>
            <Panel id={sel} />
          </div>
        </div>
      </div>
    </main>
  )
}
