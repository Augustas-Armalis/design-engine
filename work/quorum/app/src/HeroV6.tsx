// Quorum hero v6 (founder on v5: "good idea... too simple and bad executed: buttons, colors, bg too empty, layout, the
// product itself, everything better done"). Same product-first split, raised to Basit/Kargul finish: an inset stage with a
// rendered grain light field (one indigo hue, lit from the top right), the Insights app framed inside it and bleeding out,
// a peek card with the source quote and clip straddling the stage edge, quiet substance under the CTAs, tactile buttons.
import { type ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { GrainGradient } from '@paper-design/shaders-react'
import { ArrowRight, ArrowUp, BarChart3, Check, ChevronsUpDown, Highlighter, Inbox, Lightbulb, Mic, MessageCircle, Search, Sparkles, Tag, Users, Folder, LayoutList, Columns3 } from 'lucide-react'
import { ease } from './motion'
import { TAG, type TagKey } from './Product'
import QuorumLogo, { QuorumMark } from './QuorumLogo'

const T = { nav: 0.1, h1: 0.25, sub: 0.55, cta: 0.66, feats: 0.8, stage: 0.2, app: 0.55, rows: 0.95, bar: 1.4, peek: 1.7 }
const INK = '#111214', SUB = '#5d6168', IND = '#5056f0'
const STAGE = { x: 572, y: 124, w: 856, h: 820 }
// the product dissolves into the page: fades over its last ~200px at the bottom and ~140px at the right
const FADE = 'linear-gradient(180deg, #000 74%, transparent 96%), linear-gradient(90deg, #000 84%, transparent 100%)'

const Up = ({ at, y = 14, className = '', children }: { at: number; y?: number; className?: string; children: ReactNode }) => (
  <motion.div className={className} initial={{ opacity: 0.01, y, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: at, duration: 1.1, ease: ease.reveal }, opacity: { delay: at, duration: 0.8, ease: ease.outQuint }, filter: { delay: at, duration: 0.8 } }}>{children}</motion.div>
)

const HUES: Record<string, [string, string]> = { MC: ['#fdf0dc', '#9a5b00'], JR: ['#e6effe', '#2d55b5'], LS: ['#e5f5ec', '#1c7a49'], AK: ['#f6e8fb', '#8131a3'], TB: ['#fde8e6', '#b4372b'], DP: ['#e4f4f6', '#18727e'], RW: ['#eeeef0', '#4b4f56'] }
const Av = ({ i, s = 22 }: { i: string; s?: number }) => <span className="grid shrink-0 place-items-center rounded-full font-[650] tracking-[-0.02em] shadow-[0_0_0_1.5px_#fff]" style={{ width: s, height: s, fontSize: s * 0.38, background: HUES[i][0], color: HUES[i][1] }}>{i}</span>

type TagLook = { label: string; bg: string; ink: string; dot: string }
const XTAG: Record<string, TagLook> = { onboarding: { label: 'Onboarding', bg: 'rgba(130, 90, 240, 0.12)', ink: '#6538d1', dot: '#8b5cf6' }, security: { label: 'Security', bg: 'rgba(229, 72, 77, 0.11)', ink: '#b4372b', dot: '#e5484d' }, alerts: { label: 'Alerts', bg: 'rgba(240, 125, 43, 0.13)', ink: '#a8521a', dot: '#f07d2b' } }
const tagOf = (k: string): TagLook => (TAG as Record<string, TagLook>)[k] ?? XTAG[k]
const ROWS: [string, number, TagKey | keyof typeof XTAG, string[]][] = [
  ['Teams stall at the CSV import', 9, 'import', ['JR', 'LS', 'AK', 'DP']],
  ['Seat billing is unclear at checkout', 7, 'pricing', ['TB', 'RW', 'MC']],
  ['Weekly report convinces managers', 6, 'delight', ['MC', 'LS']],
  ['Welcome emails arrive a day too late', 5, 'onboarding', ['AK', 'JR', 'TB']],
  ['Column mapping needs saved presets', 5, 'import', ['DP', 'LS']],
  ['Admins want SSO before rollout', 4, 'security', ['RW', 'AK']],
  ['Slack alerts get muted within a week', 3, 'alerts', ['JR', 'TB']],
  ['Exports need a PDF option for execs', 2, 'delight', ['LS']],
  ['Search misses calls older than 90 days', 2, 'pricing', ['DP']],
  ['Tag names drift between researchers', 2, 'onboarding', ['AK', 'RW']],
  ['Mobile app is only used for reviews', 2, 'delight', ['MC']],
  ['Invoices lack a cost-centre field', 1, 'pricing', ['TB']],
  ['Calendar sync misses recurring calls', 1, 'alerts', ['JR']],
]

function Sidebar() {
  const Item = ({ icon: Ic, label, on = false, n }: { icon: typeof Inbox; label: string; on?: boolean; n?: string }) => (
    <span className={`flex h-[30px] items-center gap-2.5 rounded-[8px] px-2 text-[13px] ${on ? 'bg-white font-[550] text-[#111214] shadow-[0_0_0_1px_rgba(17,18,20,0.07),0_1px_2px_rgba(17,18,20,0.06)]' : 'text-[#3d4046]'}`}>
      <Ic size={15} strokeWidth={1.75} className="shrink-0" style={{ color: on ? IND : '#73777e' }} /><span className="truncate">{label}</span>
      {n && <span className="tnum ml-auto text-[11px] text-[#9a9ea5]">{n}</span>}
    </span>
  )
  return (
    <aside className="flex w-[212px] shrink-0 flex-col gap-0.5 bg-[#fafafb] px-2.5 py-3 shadow-[inset_-1px_0_0_#ededf0]">
      <div className="mb-1.5 flex h-9 items-center gap-2 px-1.5">
        <span className="grid size-[22px] place-items-center rounded-[6px] bg-[#111214] text-white"><QuorumMark width={12} /></span>
        <span className="text-[13px] font-[600]">Northwind</span><ChevronsUpDown size={13} className="ml-auto text-[#9a9ea5]" />
      </div>
      <div className="mb-2 flex h-[30px] items-center gap-2 rounded-[8px] bg-white px-2 text-[12px] text-[#9a9ea5] shadow-[0_0_0_1px_rgba(17,18,20,0.08)]"><Search size={13} />Search<span className="ml-auto rounded-[4px] px-1 text-[10px] shadow-[0_0_0_1px_rgba(17,18,20,0.08)]">⌘K</span></div>
      <Item icon={Inbox} label="Inbox" n="3" />
      <Item icon={Mic} label="Interviews" n="12" />
      <Item icon={Highlighter} label="Highlights" n="148" />
      <Item icon={Lightbulb} label="Insights" on />
      <Item icon={Tag} label="Tags" />
      <div className="mt-3 px-2 pb-1 text-[11px] font-[550] text-[#9a9ea5]">Ask Quorum</div>
      {['Why do trials stall?', 'Pricing by segment', 'What sells managers?'].map((q) => <Item key={q} icon={MessageCircle} label={q} />)}
      <div className="mt-3 px-2 pb-1 text-[11px] font-[550] text-[#9a9ea5]">Studies</div>
      {[['Onboarding v3', '12'], ['Pricing page', '8'], ['Churn interviews', '15']].map(([q, n]) => <Item key={q} icon={Folder} label={q} n={n} />)}
    </aside>
  )
}

function App() {
  const cols = 'grid-cols-[22px_258px_118px_112px_96px]'
  const H = ({ icon: Ic, children }: { icon?: typeof Lightbulb; children: ReactNode }) => <span className="flex items-center gap-1.5">{Ic && <Ic size={13} strokeWidth={1.8} />}{children}</span>
  return (
    <div className="flex h-full text-[#111214]">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="flex h-[50px] items-center gap-3 px-5 shadow-[inset_0_-1px_0_#ededf0]">
          <span className="text-[14px] font-[600]">Insights</span>
          <span className="flex h-7 items-center gap-0.5 rounded-[8px] bg-[#f3f3f5] p-0.5 text-[12px] font-[500]">
            <span className="flex h-6 items-center gap-1.5 rounded-[6px] bg-white px-2 shadow-[0_0_0_1px_rgba(17,18,20,0.06),0_1px_2px_rgba(17,18,20,0.06)]"><LayoutList size={12} />Table</span>
            <span className="flex h-6 items-center gap-1.5 px-2 text-[#73777e]"><Columns3 size={12} />Board</span>
          </span>
          <span className="text-[12px] text-[#9a9ea5]">All studies · sample data</span>
        </div>
        <div className="mx-5 mt-4 grid grid-cols-4 rounded-[12px] bg-white shadow-[0_0_0_1px_rgba(17,18,20,0.07),0_1px_2px_rgba(17,18,20,0.04)]">
          {[['Interviews', '12', '+3 today'], ['Highlights', '148', '+21'], ['Insights', '11', '2 new'], ['On roadmap', '3', 'QRM-142']].map(([k, v, d], i) => (
            <div key={k} className={`px-4 py-3 ${i ? 'shadow-[inset_1px_0_0_#ededf0]' : ''}`}>
              <div className="text-[11px] font-[500] text-[#8b8f96]">{k}</div>
              <div className="mt-1 flex items-baseline gap-2"><span className="tnum text-[20px] font-[600] tracking-[-0.02em]">{v}</span><span className="text-[11px] text-[#9a9ea5]">{d}</span></div>
            </div>
          ))}
        </div>
        <div className={`mt-4 grid ${cols} h-9 items-center px-5 text-[12px] font-[500] text-[#8b8f96] shadow-[inset_0_-1px_0_#ededf0,inset_0_1px_0_#ededf0]`}>
          <span className="size-[14px] rounded-[4px] shadow-[inset_0_0_0_1px_#d6d7db]" /><H icon={Lightbulb}>Insight</H><H icon={BarChart3}>Mentions</H><H icon={Tag}>Tag</H><H icon={Users}>Sources</H>
        </div>
        {ROWS.map(([title, n, tag, src], i) => {
          const tg = tagOf(tag), sel = i === 0
          return (
            <motion.div key={title} className={`grid ${cols} h-10 items-center px-5 text-[13px] shadow-[inset_0_-1px_0_#f2f2f4] ${sel ? 'bg-[#f5f5ff]' : ''}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.rows + i * 0.045, duration: 0.6, ease: ease.outQuint }}>
              {sel ? <span className="grid size-[14px] place-items-center rounded-[4px] text-white" style={{ background: IND }}><Check size={10} strokeWidth={3} /></span> : <span className="size-[14px] rounded-[4px] shadow-[inset_0_0_0_1px_#d6d7db]" />}
              <span className={`truncate pr-4 ${sel ? 'font-[600]' : 'font-[500]'}`}>{title}</span>
              <span className="flex items-center gap-2.5"><span className="h-[6px] w-[60px] overflow-hidden rounded-full bg-[#eeeff2]"><span className="block h-full rounded-full" style={{ width: `${(n / 12) * 100}%`, background: n >= 7 ? IND : '#a9adf7' }} /></span><span className="tnum text-[12px] text-[#5d6168]">{n}/12</span></span>
              <span><span className="inline-flex h-[22px] items-center gap-1.5 rounded-[6px] px-1.5 text-[12px] font-[500]" style={{ background: tg.bg, color: tg.ink }}><span className="size-1.5 rounded-full" style={{ background: tg.dot }} />{tg.label}</span></span>
              <span className="flex -space-x-[3px]">{src.map((a) => <Av key={a} i={a} />)}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* agent stack: what Quorum is doing right now, as a minimal toast stack that cycles (two ghost cards behind the front one) */
const EVENTS: [string, string][] = [['Grouping new highlights', '3 calls added to Onboarding v3'], ['Tagged 21 quotes', 'Import · Pricing · Delight'], ['New insight found', 'Seat billing is unclear at checkout']]
function AgentStack() {
  const [k, setK] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setK((v) => (v + 1) % EVENTS.length), 2600)
    return () => window.clearInterval(id)
  }, [])
  return (
    <motion.div className="absolute left-[44px] top-[40px] h-11 w-[420px]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.bar, duration: 0.7, ease: ease.outQuint }}>
      <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-white/90 backdrop-blur-md" style={{ boxShadow: '0 0 0 1px rgba(17,18,20,0.06), 0 6px 16px -8px rgba(40,44,120,0.25)' }}>
        <AnimatePresence initial={false}>
          <motion.div key={k} className="absolute inset-0 flex items-center gap-2.5 pl-2.5 pr-3.5 text-[13px]" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.5, ease: ease.outQuint }}>
            <span className="grid size-6 place-items-center rounded-[7px] text-white" style={{ background: IND }}><Sparkles size={13} /></span>
            <span className="font-[600]">{EVENTS[k][0]}</span><span className="truncate text-[#8b8f96]">{EVENTS[k][1]}</span>
            <motion.span className="ml-auto size-3.5 shrink-0 rounded-full border-[1.5px] border-[#d8daf0] border-t-[#5056f0]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* Ask Quorum composer: the question types itself, then the answer streams in with a highlighted finding and citations */
const Q = 'Why do trials stall in the first week?'
const A = 'Most teams stall at the CSV import: 9 of 12 hit it before they saw a single report, and 4 gave up.'
function AskBox() {
  const [n, setN] = useState(0)
  const [m, setM] = useState(0)
  const done = n >= Q.length, answered = m >= A.length
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(Q.length); setM(A.length); return }
    let id = 0, id2 = 0
    const start = window.setTimeout(() => {
      id = window.setInterval(() => setN((v) => {
        if (v >= Q.length) {
          window.clearInterval(id)
          window.setTimeout(() => { id2 = window.setInterval(() => setM((w) => (w >= A.length ? (window.clearInterval(id2), w) : w + 2)), 22) }, 450)
          return v
        }
        return v + 1
      }), 34)
    }, (T.feats + 0.5) * 1000)
    return () => { window.clearTimeout(start); window.clearInterval(id); window.clearInterval(id2) }
  }, [])
  const cut = 'stall at the CSV import'
  const a0 = A.indexOf(cut), shown = A.slice(0, m)
  const answer = m <= a0 ? shown : <>{A.slice(0, a0)}<mark className="rounded-[3px] px-[2px] text-inherit" style={{ background: TAG.import.bg }}>{shown.slice(a0, a0 + cut.length)}</mark>{shown.slice(a0 + cut.length)}</>
  return (
    <div className="w-[470px] rounded-[19px] p-px shadow-[0_1px_2px_rgba(17,18,20,0.04),0_10px_24px_-18px_rgba(30,34,90,0.16)]" style={{ background: 'linear-gradient(140deg, rgba(80,86,240,0.2), rgba(17,18,20,0.08) 40%, rgba(17,18,20,0.08))' }}>
      <div className="rounded-[18px] bg-white p-2">
        <div className="rounded-[12px] bg-[#fafafb] px-4 pb-4 pt-3.5 shadow-[inset_0_0_0_1px_rgba(17,18,20,0.05)]">
          <div className="flex items-center gap-2 text-[12px] font-[600]"><span className="grid size-5 place-items-center rounded-[6px] text-white" style={{ background: IND }}><Sparkles size={11} /></span>Ask Quorum<span className="ml-auto font-[500] text-[#9a9ea5]">Across 12 interviews</span></div>
          <div className="mt-3 flex items-center gap-3">
            <span className="min-h-[26px] flex-1 text-[17px] font-[550] tracking-[-0.015em]">{Q.slice(0, n)}{!done && <span className="caret ml-[1px] inline-block h-[18px] w-[1.5px] translate-y-[3px] bg-[#5056f0]" />}</span>
            <span className="b6-ink grid size-9 shrink-0 place-items-center rounded-[10px] text-white"><ArrowUp size={16} strokeWidth={2.2} /></span>
          </div>
        </div>
        <div className="relative min-h-[112px] px-3 pb-2 pt-3">
          <motion.div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5" animate={{ opacity: done ? 0 : 1, y: done ? -6 : 0 }} transition={{ duration: 0.35 }}>
            {['Top pricing objections', 'What do admins ask for?', 'Compare Q2 vs Q3', 'Why do teams churn?'].map((c) => <span key={c} className="flex h-8 items-center rounded-[9px] bg-[#f3f3f5] px-3 text-[13px] font-[500] text-[#4b4f56]">{c}</span>)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: done ? 1 : 0 }} transition={{ duration: 0.3 }}>
            <p className="min-h-[46px] text-[14px] leading-[23px] text-[#3d4046]">{answer}{done && !answered && <span className="caret ml-[1px] inline-block h-[15px] w-[1.5px] translate-y-[2px] bg-[#5056f0]" />}</p>
            <motion.div className="mt-3 flex items-center gap-1.5" animate={{ opacity: answered ? 1 : 0, y: answered ? 0 : 4 }} transition={{ duration: 0.4 }}>
              {[['MC', '05:18'], ['JR', '12:40'], ['LS', '03:02']].map(([a, t]) => <span key={a} className="flex h-7 items-center gap-1.5 rounded-full bg-[#f3f3f5] pl-0.5 pr-2.5 text-[12px] text-[#4b4f56]"><Av i={a} s={24} /><span className="tnum">{t}</span></span>)}
              <span className="ml-1 text-[12px] text-[#9a9ea5]">+11 sources</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <header className="absolute inset-x-[64px] top-0 z-30 flex h-[88px] items-center">
      <Up at={T.nav} y={-8}><a href="#" aria-label="Quorum home" className="flex h-10 items-center"><QuorumLogo /></a></Up>
      <Up at={T.nav + 0.05} y={-8} className="ml-12">
        <nav aria-label="Main"><ul className="flex items-center gap-8 text-[14px] font-[500] text-[#5d6168]">
          {['Product', 'Method', 'Pricing', 'Docs', 'Changelog'].map((l, i) => <li key={l}><a href="#" className={`flex h-10 items-center transition-colors duration-200 hover:text-[#111214] ${i === 0 ? 'text-[#111214]' : ''}`}>{l}</a></li>)}
        </ul></nav>
      </Up>
      <Up at={T.nav + 0.1} y={-8} className="ml-auto flex items-center gap-3 text-[14px] font-[550]">
        <a href="#" className="b6-ghost press flex h-10 items-center rounded-[11px] px-4">Sign in</a>
        <a href="#" className="b6-ink press flex h-10 items-center rounded-[11px] px-4 text-white">Start free</a>
      </Up>
    </header>
  )
}

export default function HeroV6() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-white" style={{ color: INK, fontFamily: '"Inter Variable", system-ui, sans-serif', fontOpticalSizing: 'auto', fontFeatureSettings: '"cv11", "ss01"' }}>
        <Nav />
        <section className="absolute left-[64px] top-[207px] z-20 w-[470px]">
          <h1 className="text-[58px] font-[550] leading-[1.03] tracking-[-0.045em]">
            {['Turn Interviews', 'Into Answers'].map((l, i) => (
              <motion.span key={l} className="block" initial={{ opacity: 0.01, y: 30, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ y: { delay: T.h1 + i * 0.08, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.h1 + i * 0.08, duration: 0.8 }, filter: { delay: T.h1 + i * 0.08, duration: 0.8 } }}>{l}</motion.span>
            ))}
          </h1>
          <Up at={T.sub} className="mt-5"><p className="text-[17px] leading-[27px] tracking-[-0.01em]" style={{ color: SUB }}>Quorum records customer calls, highlights what<br />matters and turns every quote into an answer.</p></Up>
          <Up at={T.cta} className="mt-8 flex items-center gap-2.5 text-[15px] font-[550]">
            <a href="#" className="b6-ink press group flex h-12 items-center gap-2 rounded-[12px] pl-5 pr-4 text-white">Start for free<ArrowRight size={16} strokeWidth={2} className="opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" /></a>
            <a href="#" className="b6-ghost press flex h-12 items-center rounded-[12px] px-5">Book a demo</a>
          </Up>
          <Up at={T.feats} className="mt-24"><AskBox /></Up>
        </section>

        <motion.div className="absolute z-10 overflow-hidden rounded-[24px]" style={{ left: STAGE.x, top: STAGE.y, width: STAGE.w, height: STAGE.h }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.stage, duration: 1.0 }}>
          <GrainGradient style={{ position: 'absolute', inset: -40, width: STAGE.w + 80, height: STAGE.h + 80, filter: 'blur(26px)' }} colorBack="#eef0fb" colors={['#aeb4ff', '#d4d7ff', '#f3e9ff', '#ffe9dc']} shape="corners" softness={0.85} intensity={0.22} noise={0} speed={0.25} />
          <div aria-hidden className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgba(17,18,20,0.06)]" />
          <AgentStack />
          <motion.div className="absolute left-[44px] top-[96px] h-[760px] w-[900px] overflow-hidden rounded-[14px] bg-white" style={{ boxShadow: '0 0 0 1px rgba(17,18,20,0.08), 0 2px 6px rgba(17,18,20,0.04), 0 30px 60px -24px rgba(17,18,20,0.18)', WebkitMaskImage: FADE, maskImage: FADE, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.app, duration: 1.3, ease: ease.reveal, opacity: { delay: T.app, duration: 0.6 } }}>
            <App />
          </motion.div>
        </motion.div>
        {/* progressive blur over the dissolving bottom of the product only (three stacked backdrop blurs, deeper bands blur more) */}
        {([[2, '60%'], [4, '80%'], [8, '98%']] as const).map(([b, to]) => (
          <div key={b} aria-hidden className="pointer-events-none absolute bottom-0 right-0 z-20 h-[140px]" style={{ left: STAGE.x, backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, WebkitMaskImage: `linear-gradient(180deg, transparent, #000 ${to})`, maskImage: `linear-gradient(180deg, transparent, #000 ${to})` }} />
        ))}
      </div>
    </MotionConfig>
  )
}
