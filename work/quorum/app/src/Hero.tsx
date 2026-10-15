// Quorum hero v3 (v2 + founder: "visual and the little cards not professional": engraved sound landscape + one crisp interview window)
// Quorum hero v2 ("highlighted transcript"). Breaks the house grammar on purpose (founder 2026-10-15: "something new...
// different layouts, textures, shaders, nicer buttons"): editorial 45/55 split instead of a centred stack; copy on warm paper
// with film grain; the right side is a paper-shader stage bleeding off two edges with a live halftone waveform of one
// interview whose highlighted moments carry their tag colour; a tilted transcript sheet and an insight card float on it.
// Text-only nav with tag-colour dots, a lamp-lit ink key with an arrow block, a serif-italic highlighted word.
import type { ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight, ArrowUpRight, AudioLines, ChevronRight, Pause, ShieldCheck, Video } from 'lucide-react'
import { ease } from './motion'
import { Avatar, TAG, type TagKey } from './Product'
import QuorumLogo, { QuorumMark } from './QuorumLogo'
import Engraving from './Engraving'

const FONTS: Record<string, string> = {
  tight: '"Inter Tight Variable", system-ui, sans-serif',
  inter: '"Inter Variable", system-ui, sans-serif',
  geist: '"Geist Variable", system-ui, sans-serif',
}
const font = FONTS[new URLSearchParams(location.search).get('font') || 'tight'] || FONTS.tight

const T = { nav: 0.1, h1: 0.22, hl: 1.05, sub: 0.62, cta: 0.74, specs: 0.9, stage: 0.3, field: 0.75, sheet: 0.95, marks: 1.55, card: 1.9, flags: 2.2 }
const INK = '#1b1a17', SUB = '#64615a', PAPER = '#f6f5f1'
const STAGE = { x: 704, y: 104, w: 760, h: 820 }

const Up = ({ at, y = 18, className = '', children }: { at: number; y?: number; className?: string; children: ReactNode }) => (
  <motion.div className={className} initial={{ opacity: 0.01, y, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: at, duration: 1.2, ease: ease.reveal }, opacity: { delay: at, duration: 0.9, ease: ease.outQuint }, filter: { delay: at, duration: 0.9, ease: ease.outQuint } }}>{children}</motion.div>
)
const W = ({ i, children }: { i: number; children: ReactNode }) => (
  <motion.span className="inline-block" initial={{ opacity: 0.01, y: 34, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: T.h1 + i * 0.08, duration: 1.25, ease: ease.reveal }, opacity: { delay: T.h1 + i * 0.08, duration: 0.9, ease: ease.outQuint }, filter: { delay: T.h1 + i * 0.08, duration: 0.9 } }}>{children}</motion.span>
)

function Mark({ t, i, children }: { t: TagKey; i: number; children: ReactNode }) {
  return (
    <motion.mark className="rounded-[3px] px-[2px] text-inherit" initial={{ backgroundSize: '0% 100%' }} animate={{ backgroundSize: '100% 100%' }} transition={{ delay: T.marks + i * 0.3, duration: 0.75, ease: ease.outQuint }}
      style={{ backgroundImage: `linear-gradient(${TAG[t].bg}, ${TAG[t].bg})`, backgroundRepeat: 'no-repeat', backgroundColor: 'transparent', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{children}</motion.mark>
  )
}

function Nav() {
  const links: [string, string][] = [['Product', TAG.import.dot], ['Method', TAG.pricing.dot], ['Research', TAG.delight.dot], ['Pricing', '#c9c6bd'], ['Docs', '#c9c6bd']]
  return (
    <header className="absolute inset-x-[96px] top-0 z-30 flex h-[88px] items-center">
      <Up at={T.nav} y={-8}><a href="#" aria-label="Quorum home" className="flex h-10 items-center"><QuorumLogo /></a></Up>
      <Up at={T.nav + 0.06} y={-8} className="absolute left-1/2 -translate-x-1/2">
        <nav aria-label="Main"><ul className="flex items-center gap-8 text-[14px] font-[500] tracking-[-0.005em]">
          {links.map(([l, c], i) => <li key={l}><a href="#" className={`group flex h-10 items-center gap-2 transition-colors duration-200 ${i === 0 ? 'text-[#1b1a17]' : 'text-[#64615a] hover:text-[#1b1a17]'}`}><span className="size-[6px] rounded-full transition-transform duration-200 group-hover:scale-125" style={{ background: c }} />{l}</a></li>)}
        </ul></nav>
      </Up>
      <Up at={T.nav + 0.12} y={-8} className="ml-auto flex items-center gap-7 text-[14px] font-[500]">
        <a href="#" className="flex h-10 items-center text-[#64615a] transition-colors duration-200 hover:text-[#1b1a17]">Sign in</a>
        <a href="#" className="link-draw flex h-10 items-center gap-1.5 text-[#1b1a17]">Start free<ArrowUpRight size={15} strokeWidth={2} /></a>
      </Up>
    </header>
  )
}

function Copy() {
  return (
    <section className="absolute left-[96px] top-[236px] z-20 w-[580px]">
      <h1 className="text-[86px] font-[450] leading-[0.98] tracking-[-0.04em]" style={{ color: INK }}>
        <W i={0}>Turn</W> <W i={1}>Interviews</W><br />
        <W i={2}>Into</W>{' '}
        <span className="relative inline-block">
          <motion.span aria-hidden className="absolute -left-[6px] -right-[10px] bottom-[10px] top-[38%] origin-left -skew-x-6 rounded-[4px]" style={{ background: 'rgba(245, 188, 54, 0.42)' }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: T.hl, duration: 0.85, ease: ease.outExpo }} />
          <span className="relative"><W i={3}><span className="font-serif-it text-[98px] tracking-[-0.015em]">Answers</span></W></span>
        </span>
      </h1>
      <Up at={T.sub} className="mt-7"><p className="text-[18px] font-[400] leading-[29px] tracking-[-0.008em]" style={{ color: SUB }}>Quorum transcribes every customer call, highlights<br />what matters and groups it into insights you can ship.</p></Up>
      <Up at={T.cta} className="mt-10 flex items-center gap-7">
        <a href="#" className="k-ink press group flex h-12 items-center gap-3 rounded-[14px] py-1.5 pl-5 pr-1.5 text-[15px] font-[550] text-white">
          Start free
          <span className="relative grid size-9 place-items-center overflow-hidden rounded-[10px] bg-white/[0.13] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
            <ArrowRight size={16} strokeWidth={2.1} className="arrow-cycle" />
          </span>
        </a>
        <a href="#" className="link-draw flex h-12 items-center gap-2 text-[15px] font-[550]" style={{ color: INK }}>See a sample study<ArrowRight size={15} strokeWidth={2} className="opacity-60" /></a>
      </Up>
    </section>
  )
}

function Specs() {
  const s: [typeof Video, string, string][] = [[Video, 'Calls', 'Zoom, Meet, Teams'], [AudioLines, 'Transcripts', 'Speaker-aware'], [ShieldCheck, 'Privacy', 'PII redacted']]
  return (
    <Up at={T.specs} className="absolute left-[96px] top-[760px] z-20 w-[540px]">
      <div className="grid grid-cols-3 border-t border-[#e2dfd6] pt-5">
        {s.map(([Ic, k, v], i) => (
          <div key={k} className={`flex flex-col gap-1.5 ${i ? 'border-l border-[#e2dfd6] pl-5' : ''}`}>
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#9a968c]"><Ic size={12} strokeWidth={1.9} />{k}</span>
            <span className="text-[14px] font-[500]" style={{ color: INK }}>{v}</span>
          </div>
        ))}
      </div>
    </Up>
  )
}

const LINES: { t: string; who: string; parts: (string | [TagKey, string])[] }[] = [
  { t: '05:18', who: 'Maya', parts: ['The product looked great, but ', ['import', 'we got stuck on the CSV import for two days'], '. Our columns never matched.'] },
  { t: '12:40', who: 'Maya', parts: [['pricing', 'I wasn’t sure the seats we added would be billed'], ' straight away.'] },
  { t: '21:15', who: 'Maya', parts: ['Once the data was in, ', ['delight', 'the weekly report is what sold my manager'], '.'] },
]

/* scrubber: 152 bars at 4px pitch; highlight spans sit at their real timestamps (32:10 call) */
const N = 152, DUR = 32 * 60 + 10, PLAY = 6 * 60 + 40
const at = (s: number) => Math.round((s / DUR) * N)
const SPANS: { t: TagKey; a: number; b: number }[] = [{ t: 'import', a: at(318), b: at(318) + 11 }, { t: 'pricing', a: at(760), b: at(760) + 9 }, { t: 'delight', a: at(1275), b: at(1275) + 13 }]
const BAR = Array.from({ length: N }, (_, i) => {
  const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.11 + 1.3) * Math.cos(i * 0.037))
  const jit = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.7) * Math.sin(i * 0.53 + 2))
  return Math.max(0.12, env * jit)
})

function Scrubber() {
  const head = at(PLAY)
  return (
    <div className="relative h-[60px]">
      {SPANS.map((s) => (
        <motion.span key={s.t} className="absolute inset-y-0 rounded-[6px]" style={{ left: s.a * 4 - 3, width: (s.b - s.a) * 4 + 4, background: TAG[s.t].bg, transformOrigin: 'left' }}
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: T.marks + SPANS.indexOf(s) * 0.18, duration: 0.7, ease: ease.outQuint }} />
      ))}
      <div className="absolute inset-0 flex items-center gap-[2px]">
        {BAR.map((b, i) => {
          const span = SPANS.find((s) => i >= s.a && i < s.b)
          const col = span ? TAG[span.t].dot : i < head ? '#1b1a17' : '#d3d0c8'
          return <motion.span key={i} className="w-[2px] shrink-0 rounded-full" style={{ height: `${b * 82}%`, background: col }}
            initial={{ scaleY: 0.15, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: T.sheet + 0.25 + i * 0.004, duration: 0.6, ease: ease.outQuint }} />
        })}
      </div>
      <motion.span className="absolute -top-1 bottom-[-4px] w-[2px] rounded-full bg-[#1b1a17]" style={{ left: head * 4 - 1 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.card, duration: 0.4 }}>
        <span className="absolute -left-[4px] -top-[3px] size-[10px] rounded-full bg-[#1b1a17] shadow-[0_0_0_2px_#fff]" />
      </motion.span>
    </div>
  )
}

function Window() {
  let k = 0
  const hl: [TagKey, string, string][] = [['import', 'We got stuck on the CSV import for two days', '05:18'], ['pricing', 'I wasn’t sure the seats would be billed', '12:40'], ['delight', 'The weekly report is what sold my manager', '21:15']]
  return (
    <motion.div className="absolute left-[48px] top-[112px] w-[760px] overflow-hidden rounded-[16px] bg-white"
      style={{ boxShadow: '0 0 0 1px rgba(27,26,23,0.08), 0 1px 2px rgba(27,26,23,0.05), 0 16px 32px -12px rgba(27,26,23,0.14), 0 48px 80px -36px rgba(27,26,23,0.22)' }}
      initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.sheet, duration: 1.3, ease: ease.reveal, opacity: { delay: T.sheet, duration: 0.6 } }}>
      {/* header */}
      <div className="flex h-[52px] items-center gap-2.5 border-b border-[#efede7] px-5 text-[13px]">
        <span className="text-[#8f8b81]">Onboarding v3</span><ChevronRight size={13} className="text-[#c4c0b6]" />
        <Avatar i="MC" size={22} /><span className="font-[550]">Maya Chen</span><span className="text-[#8f8b81]">Product lead, Lumio</span>
        <span className="ml-[96px] flex h-6 items-center rounded-[7px] bg-[#f4f3ef] px-2 font-mono text-[11px] text-[#7d796f]">Interview 04 · sample</span>
      </div>
      {/* player */}
      <div className="border-b border-[#efede7] px-5 pb-5 pt-4" style={{ width: 688 }}>
        <div className="mb-3 flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-[#1b1a17] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16)]"><Pause size={13} fill="#fff" strokeWidth={0} /></span>
          <span className="font-mono text-[12px] text-[#1b1a17]">06:40 <span className="text-[#a19d93]">/ 32:10</span></span>
          <span className="ml-2 flex h-6 items-center gap-1.5 rounded-full px-2 text-[12px] font-[500]" style={{ background: TAG.import.bg, color: TAG.import.ink }}><span className="size-1.5 rounded-full" style={{ background: TAG.import.dot }} />Playing highlight</span>
          <span className="ml-auto flex h-7 items-center rounded-[8px] px-2 font-mono text-[11px] text-[#7d796f] shadow-[0_0_0_1px_rgba(27,26,23,0.08)]">1.0×</span>
        </div>
        <Scrubber />
      </div>
      {/* body: transcript + highlights */}
      <div className="flex" style={{ width: 688 }}>
        <div className="flex-1 space-y-3 px-5 py-4">
          {LINES.map((l) => (
            <div key={l.t} className="grid grid-cols-[40px_1fr] gap-2">
              <span className="pt-[2px] font-mono text-[11px] text-[#a19d93]">{l.t}</span>
              <p className="text-[13px] leading-[21px] text-[#3f3d38]"><span className="mr-1.5 font-[600] text-[#1b1a17]">{l.who}</span>
                {l.parts.map((p, j) => typeof p === 'string' ? <span key={j}>{p}</span> : <Mark key={j} t={p[0]} i={k++}>{p[1]}</Mark>)}
              </p>
            </div>
          ))}
        </div>
        <div className="w-[232px] shrink-0 border-l border-[#efede7] p-3">
          <div className="flex h-7 items-center px-2 text-[12px] font-[550]">Highlights<span className="ml-1.5 text-[#a19d93]">3</span></div>
          {hl.map(([t, q, ts], i) => (
            <motion.div key={t} className={`mt-1 flex gap-2.5 rounded-[10px] p-2 ${i === 0 ? 'bg-[#f6f5f1] shadow-[0_0_0_1px_rgba(27,26,23,0.05)]' : ''}`}
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.card + i * 0.1, duration: 0.6, ease: ease.outQuint }}>
              <span className="mt-[5px] size-1.5 shrink-0 rounded-full" style={{ background: TAG[t].dot }} />
              <span className="min-w-0"><span className="block text-[12px] leading-[17px] text-[#1b1a17]">{q}</span><span className="mt-0.5 block font-mono text-[10px] text-[#a19d93]">{ts} · {TAG[t].label}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* one floating element: what the product is doing right now (Lightfield's agent bar grammar) */
function Status() {
  return (
    <motion.div className="absolute left-[48px] top-[48px] flex h-11 items-center gap-2.5 rounded-[12px] bg-white/90 pl-3 pr-3.5 text-[13px] backdrop-blur-sm"
      style={{ boxShadow: '0 0 0 1px rgba(27,26,23,0.08), 0 6px 16px -8px rgba(27,26,23,0.18)' }}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.flags, duration: 0.8, ease: ease.outQuint }}>
      <span className="grid size-6 place-items-center rounded-[7px] bg-[#1b1a17] text-white"><QuorumMark width={14} /></span>
      <span className="font-[550]">Grouping highlights</span>
      <span className="text-[#8f8b81]">148 quotes across 12 calls</span>
      <motion.span className="ml-1 size-3.5 rounded-full border-[1.5px] border-[#d3d0c8] border-t-[#1b1a17]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
    </motion.div>
  )
}

function Stage() {
  return (
    <motion.div className="absolute z-10 overflow-hidden rounded-[28px] bg-[#f1efe8]" style={{ left: STAGE.x, top: STAGE.y, width: STAGE.w, height: STAGE.h }}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 28px)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 28px)' }} transition={{ delay: T.stage, duration: 1.3, ease: ease.outExpo, opacity: { delay: T.stage, duration: 0.3 } }}>
      <Engraving at={T.field} w={STAGE.w} h={STAGE.h} />
      <div aria-hidden className="absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(27,26,23,0.07)]" />
      <Status />
      <Window />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: PAPER, color: INK, fontFamily: font, fontFeatureSettings: '"ss01", "cv11"' }}>
        <div aria-hidden className="grain pointer-events-none absolute inset-0 z-0" />
        <Nav />
        <Copy />
        <Specs />
        <Stage />
      </div>
    </MotionConfig>
  )
}
