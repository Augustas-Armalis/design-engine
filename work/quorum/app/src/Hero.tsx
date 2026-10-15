// Quorum hero v2 ("highlighted transcript"). Breaks the house grammar on purpose (founder 2026-10-15: "something new...
// different layouts, textures, shaders, nicer buttons"): editorial 45/55 split instead of a centred stack; copy on warm paper
// with film grain; the right side is a paper-shader stage bleeding off two edges with a live halftone waveform of one
// interview whose highlighted moments carry their tag colour; a tilted transcript sheet and an insight card float on it.
// Text-only nav with tag-colour dots, a lamp-lit ink key with an arrow block, a serif-italic highlighted word.
import type { ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { PaperTexture } from '@paper-design/shaders-react'
import { ArrowRight, ArrowUpRight, AudioLines, ShieldCheck, Video } from 'lucide-react'
import { ease } from './motion'
import { Avatar, TAG, TagChip, type TagKey } from './Product'
import QuorumLogo from './QuorumLogo'
import VoiceField, { HIGHLIGHTS } from './VoiceField'

const FONTS: Record<string, string> = {
  tight: '"Inter Tight Variable", system-ui, sans-serif',
  inter: '"Inter Variable", system-ui, sans-serif',
  geist: '"Geist Variable", system-ui, sans-serif',
}
const font = FONTS[new URLSearchParams(location.search).get('font') || 'tight'] || FONTS.tight

const T = { nav: 0.1, h1: 0.22, hl: 1.05, sub: 0.62, cta: 0.74, specs: 0.9, stage: 0.3, field: 0.75, sheet: 0.95, marks: 1.55, card: 1.9, flags: 2.2 }
const INK = '#1b1a17', SUB = '#64615a', PAPER = '#f6f5f1'
const STAGE = { x: 704, y: 104, w: 760, h: 820, cy: 612 }

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
  { t: '05:18', who: 'Maya', parts: ['The product looked great, but ', ['import', 'we got stuck on the CSV import for two days'], '.'] },
  { t: '12:40', who: 'Maya', parts: [['pricing', 'I wasn’t sure the seats we added would be billed'], ' straight away.'] },
  { t: '21:15', who: 'Maya', parts: ['Once the data was in, ', ['delight', 'the weekly report is what sold my manager'], '.'] },
]

function Sheet() {
  let k = 0
  return (
    <motion.div className="absolute left-[56px] top-[58px] w-[528px] rounded-[18px] bg-white" style={{ boxShadow: '0 0 0 1px rgba(27,26,23,0.07), 0 1px 2px rgba(27,26,23,0.05), 0 12px 28px -10px rgba(27,26,23,0.16), 0 40px 70px -30px rgba(27,26,23,0.18)', rotate: -1.6 }}
      initial={{ opacity: 0, y: 40, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -1.6 }} transition={{ delay: T.sheet, duration: 1.3, ease: ease.reveal, opacity: { delay: T.sheet, duration: 0.6 } }}>
      <div className="flex h-[64px] items-center gap-3 border-b border-[#efede7] px-5">
        <Avatar i="MC" size={32} />
        <span className="leading-tight"><span className="block text-[14px] font-[550]">Maya Chen</span><span className="block text-[12px] text-[#8f8b81]">Product lead, Lumio · sample</span></span>
        <span className="ml-auto font-mono text-[11px] text-[#a19d93]">INTERVIEW 04 · 32:10</span>
      </div>
      <div className="space-y-3.5 px-5 py-4">
        {LINES.map((l) => (
          <div key={l.t} className="grid grid-cols-[42px_1fr] gap-2">
            <span className="pt-[3px] font-mono text-[11px] text-[#a19d93]">{l.t}</span>
            <p className="text-[14px] leading-[23px] text-[#3f3d38]"><span className="mr-1.5 font-[600] text-[#1b1a17]">{l.who}</span>
              {l.parts.map((p, j) => typeof p === 'string' ? <span key={j}>{p}</span> : <Mark key={j} t={p[0]} i={k++}>{p[1]}</Mark>)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex h-12 items-center gap-2 border-t border-[#efede7] px-5"><TagChip t="import" /><TagChip t="pricing" /><TagChip t="delight" /></div>
    </motion.div>
  )
}

function Insight() {
  return (
    <motion.div className="absolute left-[404px] top-[296px] w-[296px] rounded-[16px] bg-white p-[18px]" style={{ boxShadow: '0 0 0 1px rgba(27,26,23,0.07), 0 2px 4px rgba(27,26,23,0.04), 0 22px 48px -18px rgba(27,26,23,0.28)' }}
      initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: T.card, duration: 1.1, ease: ease.reveal, opacity: { delay: T.card, duration: 0.5 } }}>
      <div className="flex items-center gap-2"><TagChip t="import" /><span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-[#a19d93]">Insight</span></div>
      <div className="mt-3 text-[16px] font-[550] leading-[22px] tracking-[-0.015em] text-[#1b1a17]">Teams stall at the CSV import before they see any value</div>
      <div className="mt-3.5 flex gap-[3px]">{Array.from({ length: 12 }, (_, i) => <motion.span key={i} className="h-[7px] flex-1 rounded-[2px]" style={{ background: i < 9 ? '#e7a21d' : '#eeece6' }} initial={{ scaleY: 0.3, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: T.card + 0.4 + i * 0.035, duration: 0.4 }} />)}</div>
      <div className="mt-3 flex items-center gap-2 text-[12px] text-[#64615a]"><span className="flex -space-x-1"><Avatar i="JR" size={22} /><Avatar i="LS" size={22} /><Avatar i="AK" size={22} /></span>9 of 12 participants · 14 quotes</div>
    </motion.div>
  )
}

function Flags() {
  const labels: [string, TagKey][] = [['05:18', 'import'], ['12:40', 'pricing'], ['21:15', 'delight']]
  return (
    <>
      {HIGHLIGHTS.map((s, i) => {
        const x = ((s.a + s.b) / 2) * STAGE.w, [t, k] = labels[i]
        return (
          <motion.div key={t} className="absolute flex flex-col items-center" style={{ left: x, top: STAGE.cy + 92, translateX: '-50%' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.flags + i * 0.12, duration: 0.7, ease: ease.outQuint }}>
            <span className="h-[40px] w-px" style={{ background: `linear-gradient(transparent, ${TAG[k].dot})` }} />
            <span className="flex h-[26px] items-center gap-1.5 rounded-full bg-white pl-2 pr-2.5 text-[11px] font-[550] text-[#1b1a17]" style={{ boxShadow: '0 0 0 1px rgba(27,26,23,0.08), 0 4px 10px -4px rgba(27,26,23,0.18)' }}>
              <span className="size-1.5 rounded-full" style={{ background: TAG[k].dot }} /><span className="font-mono font-[500] text-[#8f8b81]">{t}</span>{TAG[k].label}
            </span>
          </motion.div>
        )
      })}
    </>
  )
}

function Stage() {
  return (
    <motion.div className="absolute z-10 overflow-hidden rounded-[28px]" style={{ left: STAGE.x, top: STAGE.y, width: STAGE.w, height: STAGE.h }}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 28px)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 28px)' }} transition={{ delay: T.stage, duration: 1.3, ease: ease.outExpo, opacity: { delay: T.stage, duration: 0.3 } }}>
      <PaperTexture style={{ position: 'absolute', inset: 0, width: STAGE.w, height: STAGE.h }} speed={0} colorBack="#ecebe4" colorPaper="#efede6" colorShadow="#d8d4c7" roughness={0.3} roughnessSize={0.5} fiber={0.35} fiberSize={0.45} crumples={0} folds={0} drops={0} />
      <div aria-hidden className="absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(27,26,23,0.06)]" />
      <VoiceField at={T.field} w={STAGE.w} h={STAGE.h} cy={STAGE.cy} />
      <Flags />
      <Sheet />
      <Insight />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: PAPER, color: INK, fontFamily: font, fontFeatureSettings: '"ss01", "cv11"' }}>
        <div aria-hidden className="grain pointer-events-none absolute inset-0 z-40" />
        <Nav />
        <Copy />
        <Specs />
        <Stage />
      </div>
    </MotionConfig>
  )
}
