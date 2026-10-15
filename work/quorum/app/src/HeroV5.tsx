// Quorum hero v5 (founder 2026-10-15: "wtf even is this hero... what it's about... just design a SaaS product as clean
// as you can"). Lightfield split grammar: plain light canvas, copy column left, the real product (Insights: interviews
// turned into ranked answers with evidence) bleeding off the right and bottom, one agent bar above it. No art, no texture.
import type { ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight, Bell, ChevronDown, ChevronsLeft, Folder, Highlighter, Inbox, Lightbulb, ListFilter, MessageCircle, Mic, Plus, Search, SquarePen, Tag, ArrowUpDown, Table2 } from 'lucide-react'
import { ease } from './motion'
import QuorumLogo, { QuorumMark } from './QuorumLogo'

const T = { nav: 0.1, h1: 0.25, sub: 0.55, cta: 0.65, app: 0.6, rows: 1.0, bar: 1.5 }
const INK = '#111214', SUB = '#5f636a', LINE = '#ececee'

const Up = ({ at, y = 14, className = '', children }: { at: number; y?: number; className?: string; children: ReactNode }) => (
  <motion.div className={className} initial={{ opacity: 0.01, y, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: at, duration: 1.1, ease: ease.reveal }, opacity: { delay: at, duration: 0.8, ease: ease.outQuint }, filter: { delay: at, duration: 0.8 } }}>{children}</motion.div>
)

/* tinted-initial avatars (pale hue, same-hue letters) */
const HUES: Record<string, [string, string]> = { MC: ['#fdf0dc', '#9a5b00'], JR: ['#e6effe', '#2d55b5'], LS: ['#e5f5ec', '#1c7a49'], AK: ['#f6e8fb', '#8131a3'], TB: ['#fde8e6', '#b4372b'], DP: ['#e4f4f6', '#18727e'], RW: ['#eeeef0', '#4b4f56'] }
const Av = ({ i }: { i: string }) => <span className="grid size-[22px] shrink-0 place-items-center rounded-full text-[8.5px] font-[650] tracking-[-0.02em] shadow-[0_0_0_1.5px_#fff]" style={{ background: HUES[i][0], color: HUES[i][1] }}>{i}</span>

type Status = 'On roadmap' | 'Investigating' | 'Shared' | 'New'
const ST: Record<Status, [string, string]> = { 'On roadmap': ['#e9f6ef', '#1c7a49'], Investigating: ['#fdf3e2', '#9a5b00'], Shared: ['#f0f0f2', '#4b4f56'], New: ['#e8f0fe', '#2d55b5'] }
const TAGC: Record<string, string> = { Import: '#e7a21d', Pricing: '#4d7bff', Delight: '#2fb174', Onboarding: '#9b6bf2', Security: '#e5484d', Mobile: '#16a3b5', Alerts: '#f07d2b', Reports: '#8b8f96', Search: '#8b8f96' }
const ROWS: [string, number, string, string[], Status][] = [
  ['Teams stall at the CSV import', 9, 'Import', ['JR', 'LS', 'AK', 'DP'], 'On roadmap'],
  ['Seat billing is unclear at checkout', 7, 'Pricing', ['TB', 'RW', 'MC'], 'Investigating'],
  ['The weekly report convinces managers', 6, 'Delight', ['MC', 'LS'], 'Shared'],
  ['Welcome emails arrive a day too late', 5, 'Onboarding', ['AK', 'JR', 'TB'], 'New'],
  ['Column mapping needs saved presets', 5, 'Import', ['DP', 'LS'], 'On roadmap'],
  ['Admins want SSO before a wider rollout', 4, 'Security', ['RW', 'AK'], 'New'],
  ['The mobile app is only used for review', 3, 'Mobile', ['MC'], 'New'],
  ['Slack alerts get muted within a week', 3, 'Alerts', ['JR', 'TB'], 'Investigating'],
  ['Exports need a PDF option for execs', 2, 'Reports', ['LS'], 'New'],
  ['Search misses calls older than 90 days', 2, 'Search', ['DP'], 'New'],
  ['Tag names drift between researchers', 2, 'Onboarding', ['AK'], 'New'],
]

function Dashes({ n }: { n: number }) {
  const on = Math.round((n / 12) * 5), col = n >= 7 ? '#2fb174' : n >= 4 ? '#e7a21d' : '#d6d7da'
  return <span className="flex gap-[3px]">{Array.from({ length: 5 }, (_, i) => <span key={i} className="h-[3px] w-[11px] rounded-full" style={{ background: i < on ? col : '#e6e7e9' }} />)}</span>
}

function Sidebar() {
  const Item = ({ icon: Ic, label, on = false, badge }: { icon: typeof Inbox; label: string; on?: boolean; badge?: string }) => (
    <span className={`flex h-[30px] items-center gap-2.5 rounded-[8px] px-2 text-[13px] ${on ? 'bg-[#efeff1] font-[550] text-[#111214]' : 'text-[#3d4046]'}`}>
      <Ic size={15} strokeWidth={1.7} className={`shrink-0 ${on ? 'text-[#111214]' : 'text-[#6b6f76]'}`} /><span className="truncate">{label}</span>
      {badge && <span className="ml-auto rounded-[5px] bg-[#e8f0fe] px-1.5 text-[10px] font-[600] leading-[16px] text-[#2d55b5]">{badge}</span>}
    </span>
  )
  return (
    <aside className="flex w-[244px] shrink-0 flex-col gap-0.5 border-r px-3 py-3" style={{ borderColor: LINE }}>
      <div className="mb-2 flex h-9 items-center gap-2 px-1">
        <span className="grid size-6 place-items-center rounded-[7px] bg-[#111214] text-white"><QuorumMark width={14} /></span>
        <span className="text-[13px] font-[600]">Northwind</span>
        <span className="ml-auto flex items-center gap-2.5 text-[#6b6f76]"><Bell size={15} strokeWidth={1.7} /><Search size={15} strokeWidth={1.7} /><ChevronsLeft size={15} strokeWidth={1.7} /></span>
      </div>
      <Item icon={Inbox} label="Inbox" badge="3" />
      <Item icon={Mic} label="Interviews" />
      <Item icon={Highlighter} label="Highlights" />
      <Item icon={Lightbulb} label="Insights" on />
      <Item icon={Tag} label="Tags" />
      <div className="mt-3 px-2 pb-1 text-[11px] font-[550] text-[#8b8f96]">Ask Quorum</div>
      <Item icon={SquarePen} label="New question" />
      {['Why do trials stall in week one?', 'Pricing confusion by segment', 'What convinces managers?', 'Churn reasons this quarter'].map((q) => <Item key={q} icon={MessageCircle} label={q} />)}
      <div className="mt-3 px-2 pb-1 text-[11px] font-[550] text-[#8b8f96]">Studies</div>
      {['Onboarding v3', 'Pricing page', 'Churn interviews'].map((q) => <Item key={q} icon={Folder} label={q} />)}
    </aside>
  )
}

function App() {
  const cols = 'grid-cols-[292px_112px_112px_104px_130px]'
  return (
    <div className="flex h-full text-[#111214]">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="flex h-[52px] items-center gap-2.5 border-b px-5" style={{ borderColor: LINE }}>
          <Lightbulb size={16} strokeWidth={1.8} /><span className="text-[14px] font-[600]">Insights</span>
          <span className="flex h-6 items-center gap-1.5 rounded-[7px] px-2 text-[12px] font-[500] text-[#3d4046] shadow-[0_0_0_1px_#e6e7e9]"><Table2 size={13} strokeWidth={1.8} />All studies</span>
          <Plus size={15} strokeWidth={1.8} className="text-[#6b6f76]" />
        </div>
        <div className="flex h-10 items-center gap-4 border-b px-5 text-[12px] font-[500] text-[#3d4046]" style={{ borderColor: LINE }}>
          <span className="flex items-center gap-1.5"><ListFilter size={13} strokeWidth={1.8} />Filter</span>
          <span className="flex items-center gap-1.5"><ArrowUpDown size={13} strokeWidth={1.8} />Mentions<ChevronDown size={12} /></span>
          <span className="text-[#8b8f96]">12 interviews · 148 highlights · sample data</span>
        </div>
        <div className={`grid ${cols} h-9 items-center border-b px-5 text-[12px] font-[500] text-[#8b8f96]`} style={{ borderColor: LINE }}>
          <span>Insight</span><span>Mentions</span><span>Tag</span><span>Sources</span><span>Status</span>
        </div>
        {ROWS.map(([title, n, tag, src, st], i) => (
          <motion.div key={title} className={`grid ${cols} h-[38px] items-center border-b px-5 text-[13px]`} style={{ borderColor: '#f2f2f4', opacity: 1 - Math.max(0, i - 7) * 0.22 }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1 - Math.max(0, i - 7) * 0.22, y: 0 }} transition={{ delay: T.rows + i * 0.045, duration: 0.6, ease: ease.outQuint }}>
            <span className="truncate pr-4 font-[500]">{title}</span>
            <span className="flex items-center gap-2.5"><Dashes n={n} /><span className="tnum text-[12px] text-[#5f636a]">{n}/12</span></span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#3d4046]"><span className="size-1.5 rounded-full" style={{ background: TAGC[tag] }} />{tag}</span>
            <span className="flex -space-x-[3px]">{src.map((a) => <Av key={a} i={a} />)}</span>
            <span><span className="inline-flex h-[22px] items-center rounded-[6px] px-2 text-[12px] font-[500]" style={{ background: ST[st][0], color: ST[st][1] }}>{st}</span></span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Nav() {
  return (
    <header className="absolute inset-x-[48px] top-0 z-30 flex h-[76px] items-center">
      <Up at={T.nav} y={-8}><a href="#" aria-label="Quorum home" className="flex h-10 items-center"><QuorumLogo /></a></Up>
      <Up at={T.nav + 0.05} y={-8} className="ml-12">
        <nav aria-label="Main"><ul className="flex items-center gap-8 text-[14px] font-[500] text-[#5f636a]">
          {['Product', 'Customers', 'Pricing', 'Docs', 'Changelog'].map((l) => <li key={l}><a href="#" className="flex h-10 items-center transition-colors duration-200 hover:text-[#111214]">{l}</a></li>)}
        </ul></nav>
      </Up>
      <Up at={T.nav + 0.1} y={-8} className="ml-auto flex items-center gap-6 text-[14px] font-[500]">
        <a href="#" className="flex h-10 items-center text-[#5f636a] transition-colors duration-200 hover:text-[#111214]">Sign in</a>
        <a href="#" className="q-ink press flex h-10 items-center rounded-[10px] px-4 text-white">Start free</a>
      </Up>
    </header>
  )
}

export default function HeroV5() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#f6f6f7]" style={{ color: INK, fontFamily: '"Inter Variable", system-ui, sans-serif', fontOpticalSizing: 'auto', fontFeatureSettings: '"cv11", "ss01"' }}>
        <Nav />
        <section className="absolute left-[48px] top-[318px] z-20 w-[480px]">
          <h1 className="text-[52px] font-[500] leading-[1.06] tracking-[-0.04em]">
            {['Turn Interviews', 'Into Answers'].map((l, i) => (
              <motion.span key={l} className="block" initial={{ opacity: 0.01, y: 28, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ y: { delay: T.h1 + i * 0.08, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.h1 + i * 0.08, duration: 0.8 }, filter: { delay: T.h1 + i * 0.08, duration: 0.8 } }}>{l}</motion.span>
            ))}
          </h1>
          <Up at={T.sub} className="mt-5"><p className="text-[17px] leading-[27px] tracking-[-0.01em]" style={{ color: SUB }}>Quorum records customer calls, highlights what matters<br />and turns every quote into insights you can act on.</p></Up>
          <Up at={T.cta} className="mt-8 flex items-center gap-2.5 text-[14px] font-[550]">
            <a href="#" className="q-ink press group flex h-11 items-center gap-2 rounded-[10px] pl-4 pr-3.5 text-white">Start free<ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" /></a>
            <a href="#" className="press flex h-11 items-center rounded-[10px] bg-[#e9e9ec] px-4 text-[#111214] transition-colors duration-200 hover:bg-[#e2e2e6]">Book a demo</a>
          </Up>
        </section>
        <Up at={T.cta + 0.15} className="absolute bottom-[40px] left-[48px] z-20">
          <a href="#" className="flex h-8 items-center gap-2 rounded-[8px] bg-[#ececef] pl-2.5 pr-2 text-[13px] text-[#5f636a]"><span className="size-1.5 rounded-full bg-[#4d7bff]" /><span className="font-[550] text-[#111214]">New</span>Ask Quorum across every call<ArrowRight size={13} /></a>
        </Up>

        {/* agent bar */}
        <motion.div className="absolute left-[560px] top-[132px] z-20 flex h-11 items-center gap-2.5 rounded-[12px] bg-white pl-3 pr-3.5 text-[13px]" style={{ boxShadow: '0 0 0 1px rgba(17,18,20,0.07), 0 4px 12px -6px rgba(17,18,20,0.12)' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.bar, duration: 0.7, ease: ease.outQuint }}>
          <span className="grid size-6 place-items-center rounded-[7px] bg-[#111214] text-white"><QuorumMark width={13} /></span>
          <span className="font-[600]">Grouping new highlights</span><span className="text-[#8b8f96]">Onboarding v3 · 3 calls added today</span>
          <motion.span className="ml-1 size-3.5 rounded-full border-[1.5px] border-[#dcdde0] border-t-[#111214]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
        </motion.div>

        {/* product */}
        <motion.div className="absolute left-[560px] top-[192px] z-10 h-[760px] w-[980px] overflow-hidden rounded-[14px] bg-white" style={{ boxShadow: '0 0 0 1px rgba(17,18,20,0.07), 0 2px 6px rgba(17,18,20,0.04), 0 30px 60px -30px rgba(17,18,20,0.18)' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.app, duration: 1.3, ease: ease.reveal, opacity: { delay: T.app, duration: 0.6 } }}>
          <App />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[90px] bg-[linear-gradient(180deg,rgba(246,246,247,0),#f6f6f7)]" />
      </div>
    </MotionConfig>
  )
}
