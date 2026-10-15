// Quorum hero v4 (founder 2026-10-15: "completely different... clean modern simple, Marcel, Basit style"). Marcel Kargul's
// Altrina grammar: white page, one inset light panel; the art is a fine-line ribbon (many voices -> one answer through
// the Quorum node) across the top with three labelled points; the headline sits bottom-left at regular weight, the
// subtitle and two square buttons bottom-right on the node's axis. One ink, one amber for the highlighted strands.
import type { ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ease } from './motion'
import { TAG } from './Product'
import QuorumLogo, { QuorumMark } from './QuorumLogo'
import Ribbon, { NODE } from './Ribbon'

const T = { nav: 0.1, panel: 0.15, ribbon: 0.35, node: 1.0, h1: 0.45, sub: 0.8, cta: 0.92, chips: 2.0 }
const INK = '#101113', SUB = '#5d6167'
const PANEL = { x: 16, y: 80, w: 1408, h: 804 }
const LABELS = [
  { i: 12, x: 330, lx: 248, ly: 196, side: 'r', text: <>Interviews <b className="font-mono font-[500] text-[#8a8e94]">12</b></> },
  { i: 38, x: 712, lx: 628, ly: 176, side: 'r', text: <><span className="size-1.5 rounded-full" style={{ background: TAG.import.dot }} />Highlights <b className="font-mono font-[500] text-[#8a8e94]">148</b></> },
  { i: 81, x: 1180, lx: 1104, ly: 456, side: 'r', text: <>Answer <b className="font-[500] text-[#8a8e94]">CSV import blocks onboarding</b></> },
]

const Up = ({ at, y = 16, className = '', children }: { at: number; y?: number; className?: string; children: ReactNode }) => (
  <motion.div className={className} initial={{ opacity: 0.01, y, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: at, duration: 1.1, ease: ease.reveal }, opacity: { delay: at, duration: 0.8, ease: ease.outQuint }, filter: { delay: at, duration: 0.8 } }}>{children}</motion.div>
)
const Wd = ({ i, children }: { i: number; children: ReactNode }) => (
  <motion.span className="inline-block" initial={{ opacity: 0.01, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: T.h1 + i * 0.07, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.h1 + i * 0.07, duration: 0.8 }, filter: { delay: T.h1 + i * 0.07, duration: 0.8 } }}>{children}</motion.span>
)

function Nav() {
  const links = ['Product', 'Method', 'Research', 'Pricing', 'Docs']
  return (
    <header className="absolute inset-x-[40px] top-0 z-30 flex h-[80px] items-center">
      <Up at={T.nav} y={-8}><a href="#" aria-label="Quorum home" className="flex h-10 items-center"><QuorumLogo /></a></Up>
      <Up at={T.nav + 0.05} y={-8} className="ml-12">
        <nav aria-label="Main"><ul className="flex items-center gap-8 text-[14px] font-[500]">
          {links.map((l, i) => <li key={l}><a href="#" className={`flex h-10 items-center transition-colors duration-200 ${i === 0 ? 'text-[#101113]' : 'text-[#5d6167] hover:text-[#101113]'}`}>{l}</a></li>)}
        </ul></nav>
      </Up>
      <Up at={T.nav + 0.1} y={-8} className="ml-auto flex items-center gap-6 text-[14px] font-[500]">
        <a href="#" className="flex h-10 items-center text-[#5d6167] transition-colors duration-200 hover:text-[#101113]">Sign in</a>
        <a href="#" className="q-ink press flex h-10 items-center rounded-[10px] px-4 text-white">Start free</a>
      </Up>
    </header>
  )
}

export default function HeroV4() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-white" style={{ color: INK, fontFamily: '"Inter Variable", system-ui, sans-serif', fontOpticalSizing: 'auto', fontFeatureSettings: '"cv11", "ss01"' }}>
        <Nav />
        <motion.section className="absolute overflow-hidden rounded-[20px] bg-[#f3f4f5] shadow-[inset_0_0_0_1px_#e7e8ea]" style={{ left: PANEL.x, top: PANEL.y, width: PANEL.w, height: PANEL.h }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.panel, duration: 0.8 }}>
          <Ribbon at={T.ribbon} labels={LABELS.map(({ i, x, lx, ly }) => ({ i, x, lx, ly }))} />
          {/* node */}
          <motion.div className="absolute grid size-[56px] place-items-center rounded-[16px] bg-white" style={{ left: NODE.x - 28, top: NODE.y - 28, boxShadow: '0 0 0 1px rgba(16,17,19,0.1), 0 0 0 10px rgba(243,244,245,0.9), 0 0 0 11px rgba(16,17,19,0.06), 0 12px 28px -10px rgba(16,17,19,0.25)' }}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: T.node, duration: 0.9, ease: ease.outExpo }}>
            <QuorumMark width={28} />
          </motion.div>
          {/* labels */}
          {LABELS.map((l, i) => (
            <motion.span key={i} className="absolute flex h-[26px] items-center gap-1.5 whitespace-nowrap rounded-[7px] bg-white px-2.5 text-[12px] font-[550]" style={{ left: l.lx, top: l.ly - 13, translateX: l.side === 'r' ? '-100%' : 0, boxShadow: '0 0 0 1px rgba(16,17,19,0.13), 0 1px 2px rgba(16,17,19,0.05)' }}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.chips + i * 0.12, duration: 0.6, ease: ease.outQuint }}>{l.text}</motion.span>
          ))}
          {/* copy */}
          <h1 className="absolute left-[48px] top-[588px] text-[84px] font-[500] leading-[1] tracking-[-0.045em]">
            <Wd i={0}>Turn</Wd> <Wd i={1}>Interviews</Wd><br /><Wd i={2}>Into</Wd> <Wd i={3}>Answers</Wd>
          </h1>
          <div className="absolute top-[598px]" style={{ left: NODE.x - 28 }}>
            <Up at={T.sub}><p className="text-[17px] leading-[27px] tracking-[-0.01em]" style={{ color: SUB }}>Quorum transcribes every customer call, highlights<br />what matters and turns it into answers your team can use.</p></Up>
            <Up at={T.cta} className="mt-7 flex items-center gap-3 text-[15px] font-[550]">
              <a href="#" className="q-ink press group flex h-12 items-center gap-2.5 rounded-[12px] pl-5 pr-4 text-white">Start free<ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" /></a>
              <a href="#" className="q-white press flex h-12 items-center rounded-[12px] px-5">Book a demo</a>
            </Up>
          </div>
        </motion.section>
      </div>
    </MotionConfig>
  )
}
