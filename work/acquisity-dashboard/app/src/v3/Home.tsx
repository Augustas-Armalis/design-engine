// Home as a work surface (Kargul: one primary view to full detail; Attio: attribute types render one way everywhere).
// Toolbars in 48px bands; KPI strip; the "Replies to handle" grid; the selected reply opens in a side panel with the AI draft.
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Filter, Home as HomeIcon, ListFilter, Pencil, Plus, Sparkles, X, ArrowDownUp } from 'lucide-react'
import { Btn, Chip, Ghost, ICON, Logo, Person, Avatar } from './ui'
import { AI_HUE, CAMPAIGNS, INTENT_HUE, REPLIES, WEEKS } from './data'

const money = (n: number) => (n ? `$${n.toLocaleString('en-US')}` : '–')
const TABS = [{ k: 'Overview' }, { k: 'Replies', n: 12 }, { k: 'Meetings', n: 3 }, { k: 'Tasks', n: 8 }]
const KPI = [
  { label: 'Replies', value: '720', delta: '+14.6%', up: true },
  { label: 'Meetings booked', value: '27', delta: '+6', up: true },
  { label: 'Pipeline', value: '$184,300', delta: '+8.1%', up: true },
  { label: 'Reply rate', value: '2.58%', delta: '−0.2 pts', up: false },
]

function Bands() {
  const [tab, setTab] = useState('Overview')
  return (
    <>
      <div className="flex h-12 items-center gap-2 border-b border-[var(--line)] px-5">
        <HomeIcon {...ICON} className="text-[var(--soft)]" /><h1 className="t14 font-[600] text-[var(--ink)]">Home</h1>
        <span className="t14 text-[var(--soft)]">· Last 30 days</span>
        <div className="ml-auto flex items-center gap-2"><Btn icon={ArrowUpRight}>Share</Btn><Btn primary icon={Plus} kbd="N">New campaign</Btn></div>
      </div>
      <div className="flex h-12 items-center gap-1 border-b border-[var(--line)] px-4">
        {TABS.map((t) => (
          <button key={t.k} type="button" onClick={() => setTab(t.k)} aria-pressed={tab === t.k} className={`relative flex h-12 items-center gap-1.5 px-2 t14 leading-none ${tab === t.k ? 'text-[var(--ink)]' : 'text-[var(--sub)] hover:text-[var(--ink)]'}`}>
            {t.k}{t.n != null && <span className="tnum t12 text-[var(--soft)]">{t.n}</span>}
            {tab === t.k && <motion.span layoutId="tab-line" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} className="absolute inset-x-2 -bottom-px h-[1.5px] rounded-full bg-[var(--ink)]" />}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5"><Ghost icon={CalendarDays}>Aug 18 – Sep 15</Ghost><Ghost dashed icon={ArrowDownUp}>Sort</Ghost><Ghost dashed icon={ListFilter}>Filter</Ghost></div>
      </div>
    </>
  )
}

function Kpis() {
  return (
    <div className="grid grid-cols-4 overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
      {KPI.map((k, i) => (
        <div key={k.label} className={`px-4 py-3.5 ${i ? 'border-l border-[var(--line)]' : ''}`}>
          <div className="t13 text-[var(--sub)]">{k.label}</div>
          <div className="mt-1.5 flex items-baseline gap-2"><span className="num text-[var(--ink)]">{k.value}</span>
            <span className={`tnum t12 ${k.up ? 'text-[#0a7a43]' : 'text-[#c2262f]'}`}>{k.delta}</span></div>
        </div>
      ))}
    </div>
  )
}

function Table({ sel, setSel }: { sel: number; setSel: (n: number) => void }) {
  const total = REPLIES.reduce((a, r) => a + r.value, 0)
  const th = 'h-8 border-b border-[var(--grid)] px-3 text-left t13 font-[500] text-[var(--sub)]'
  const td = 'h-9 border-b border-[var(--grid)] px-3'
  return (
    <section aria-label="Replies to handle (sample)" className="min-w-0 overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
      <div className="flex h-11 items-center gap-2 px-3.5">
        <span className="grid size-4 place-items-center rounded-[4px] bg-[#fd9038]"><Inbox12 /></span>
        <h2 className="t14 font-[600] text-[var(--ink)]">Replies to handle</h2><span className="tnum t13 text-[var(--soft)]">8</span>
        <div className="ml-auto flex items-center gap-1.5"><Ghost icon={Filter}>Interested</Ghost><Btn icon={Sparkles}>Draft all</Btn></div>
      </div>
      <table className="w-full border-separate border-spacing-0">
        <thead><tr>
          <th className={`${th} border-t`}>Lead</th><th className={`${th} border-t`}>Company</th><th className={`${th} border-t`}>Intent</th>
          <th className={`${th} border-t text-right`}>Deal size</th><th className={`${th} border-t`}>Received</th><th className={`${th} border-t`}>AI</th>
        </tr></thead>
        <tbody>
          {REPLIES.map((r) => (
            <tr key={r.id} onClick={() => setSel(r.id)} className={`cursor-pointer ${sel === r.id ? 'bg-[var(--sel)]' : 'hover:bg-[#fafafb]'}`}>
              <td className={td}><Person name={r.lead} /></td>
              <td className={td}><span className="inline-flex items-center gap-2 t14 text-[var(--ink)]"><Logo name={r.company} hue={r.logo} /><span className="whitespace-nowrap underline decoration-[#e7e7e7] underline-offset-[3px]">{r.company}</span></span></td>
              <td className={td}><Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip></td>
              <td className={`${td} tnum text-right t14 text-[var(--ink)]`}>{money(r.value)}</td>
              <td className={`${td} whitespace-nowrap t14 text-[var(--sub)]`}>{r.received}</td>
              <td className={td}><Chip hue={AI_HUE[r.ai]}>{r.ai}</Chip></td>
            </tr>
          ))}
          <tr>
            <td className="h-9 px-3 t13 text-[var(--soft)]">8 replies</td><td /><td />
            <td className="tnum h-9 whitespace-nowrap px-3 text-right t13 text-[var(--sub)]"><span className="text-[var(--soft)]">Sum </span>{money(total)}</td><td /><td />
          </tr>
        </tbody>
      </table>
    </section>
  )
}
function Inbox12() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M3 13h5l1.5 3h5L16 13h5v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Zm2-9h14l2 7h-6l-1.5 3h-3L9 11H3l2-7Z" /></svg> }

function Panel({ id }: { id: number }) {
  const r = REPLIES.find((x) => x.id === id)!
  const [state, setState] = useState<'idle' | 'sent'>('idle')
  return (
    <aside aria-label="Selected reply (sample)" className="flex w-[352px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-[var(--line)] bg-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }} className="flex flex-1 flex-col">
          <div className="flex items-start gap-3 border-b border-[var(--line)] p-4">
            <Avatar name={r.lead} size={32} />
            <div className="min-w-0 flex-1">
              <div className="t14 font-[600] text-[var(--ink)]">{r.lead}</div>
              <div className="mt-0.5 flex items-center gap-1.5 t13 text-[var(--sub)]"><Logo name={r.company} hue={r.logo} />{r.title}, {r.company}</div>
            </div>
            <button type="button" aria-label="Close" className="press grid size-7 place-items-center rounded-[8px] text-[var(--soft)] hover:bg-[var(--hover)]"><X {...ICON} /></button>
          </div>
          <div className="flex flex-wrap gap-1.5 border-b border-[var(--line)] px-4 py-3">
            <Chip hue={INTENT_HUE[r.intent]}>{r.intent}</Chip><Chip>{r.campaign}</Chip>{r.value > 0 && <Chip hue="cyan">{money(r.value)}</Chip>}
          </div>
          <div className="space-y-4 p-4">
            <div>
              <div className="t13 text-[var(--soft)]">Their reply · {r.received}</div>
              <p className="mt-1.5 t14 font-[400] text-[var(--ink)]">{r.message}</p>
            </div>
            <div className="rounded-[10px] border border-[var(--line)] bg-[var(--side)] p-3">
              <div className="flex items-center gap-1.5 t13 text-[var(--sub)]"><Sparkles size={14} strokeWidth={1.5} className="text-[var(--blue)]" />Suggested reply</div>
              <p className="mt-2 t14 font-[400] text-[var(--ink)]">{r.draft}</p>
            </div>
            <div>
              <div className="t13 text-[var(--soft)]">Activity</div>
              <ol className="relative mt-2">
                <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--grid)]" />
                {[['Replied to step 2', r.received], ['Opened the email 3 times', 'Yesterday'], ['Step 1 sent by AI SDR', 'Sep 9'], ['Added from ' + r.campaign, 'Sep 2']].map(([t, w], k) => (
                  <li key={t} className="relative flex items-center gap-3 py-1.5">
                    <span className={`relative z-10 size-[11px] rounded-full border-2 border-white ${k === 0 ? 'bg-[var(--blue)]' : 'bg-[#c9ccd1]'}`} />
                    <span className="flex-1 t13 text-[var(--ink)]">{t}</span><span className="t12 text-[var(--soft)]">{w}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-[var(--line)] p-3">
            <button type="button" className="press h-7 rounded-[8px] px-2.5 t14 text-[var(--sub)] hover:bg-[var(--hover)]">Dismiss</button>
            <Btn icon={Pencil} className="ml-auto">Edit</Btn>
            <button type="button" onClick={() => setState('sent')} className="press inline-flex h-7 items-center gap-1.5 rounded-[8px] bg-[var(--blue)] px-2.5 t14 leading-none text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(38,109,240,0.3)] hover:bg-[#1f5fd9]">
              <Check {...ICON} />{state === 'sent' ? 'Sent' : 'Approve and send'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}

function Weekly() {
  const max = 240
  return (
    <section aria-label="Replies per week (sample)" className="rounded-[12px] border border-[var(--line)] bg-white p-4">
      <div className="flex items-center"><h2 className="t14 font-[600] text-[var(--ink)]">Replies per week</h2><Ghost>Weekly<ChevronDown size={14} strokeWidth={1.5} /></Ghost></div>
      <div className="mt-4 flex h-[120px] items-end gap-3">
        {WEEKS.map((w, i) => (
          <div key={w.w} className="flex flex-1 flex-col items-center gap-2">
            <span className="tnum t12 text-[var(--sub)]">{w.r}</span>
            <div className={`w-full rounded-[4px] ${i === WEEKS.length - 1 ? 'bg-[var(--blue)]' : 'bg-[#d6e5ff]'}`} style={{ height: (w.r / max) * 84 }} />
            <span className="t12 text-[var(--soft)]">{w.w}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Campaigns() {
  return (
    <section aria-label="Campaigns (sample)" className="rounded-[12px] border border-[var(--line)] bg-white p-4">
      <div className="flex items-center"><h2 className="t14 font-[600] text-[var(--ink)]">Campaigns</h2><span className="ml-1.5 tnum t13 text-[var(--soft)]">3 running</span><a href="#" className="-my-1 ml-auto py-1 t13 text-[var(--sub)] hover:text-[var(--ink)]">View all</a></div>
      <div className="mt-3">
        {CAMPAIGNS.map((c, i) => (
          <div key={c.name} className={`flex h-10 items-center gap-3 ${i ? 'border-t border-[var(--line)]' : ''}`}>
            <span className="size-2 rounded-full" style={{ background: c.hue }} />
            <span className="flex-1 truncate t14 text-[var(--ink)]">{c.name}</span>
            <span className="tnum w-12 text-right t13 text-[var(--ink)]">{c.rate}%</span>
            <Chip hue={c.status === 'Sending' ? 'green' : 'yellow'}>{c.status}</Chip>
          </div>
        ))}
      </div>
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
            <div className="min-w-0 flex-1 space-y-4">
              <Table sel={sel} setSel={setSel} />
              <div className="grid grid-cols-2 gap-4"><Weekly /><Campaigns /></div>
            </div>
            <Panel id={sel} />
          </div>
        </div>
      </div>
    </main>
  )
}
