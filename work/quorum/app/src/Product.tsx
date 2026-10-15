// Quorum product view (sample data): one study, one interview transcript with its quotes highlighted and tagged, and the
// insight those quotes add up to. affectUI/AlignUI light grammar: grey tray holding white cards, 1px rings, concentric radii,
// Inter 500, 13px UI base, one ink accent; colour only on tags (it carries meaning).
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, AudioLines, ChevronsUpDown, Folder, Highlighter, LayoutGrid, Lightbulb, Play, Search, Share2, Sparkles, Tag, Users } from 'lucide-react'
import { ease } from './motion'

export const TAG = {
  import: { label: 'Import', bg: 'rgba(245, 180, 40, 0.22)', ink: '#8a5a00', dot: '#e7a21d' },
  pricing: { label: 'Pricing', bg: 'rgba(80, 130, 255, 0.16)', ink: '#2b52c9', dot: '#4d7bff' },
  delight: { label: 'Delight', bg: 'rgba(40, 175, 110, 0.16)', ink: '#1b7a4c', dot: '#2fb174' },
} as const
export type TagKey = keyof typeof TAG

const ring = '0 0 0 1px rgba(23,23,23,0.07)'
const I = { size: 15, strokeWidth: 1.75 } as const

function Mark({ t, children, at }: { t: TagKey; children: ReactNode; at: number }) {
  return (
    <motion.mark className="relative rounded-[4px] px-[2px] text-inherit" initial={{ backgroundSize: '0% 100%' }} animate={{ backgroundSize: '100% 100%' }} transition={{ delay: at, duration: 0.7, ease: ease.outQuint }}
      style={{ backgroundImage: `linear-gradient(${TAG[t].bg}, ${TAG[t].bg})`, backgroundRepeat: 'no-repeat', backgroundColor: 'transparent', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{children}</motion.mark>
  )
}
export function TagChip({ t }: { t: TagKey }) {
  return <span className="inline-flex h-[22px] items-center gap-1.5 rounded-full px-2 text-[12px] font-[500]" style={{ background: TAG[t].bg, color: TAG[t].ink }}><span className="size-1.5 rounded-full" style={{ background: TAG[t].dot }} />{TAG[t].label}</span>
}
export function Avatar({ i, size = 24 }: { i: string; size?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-full bg-[#ececec] font-[600] text-[#525252] shadow-[0_0_0_2px_#fff]" style={{ width: size, height: size, fontSize: Math.round(size * 0.36), letterSpacing: '-0.02em' }}>{i}</span>
}

function Sidebar() {
  const nav = [[LayoutGrid, 'Overview'], [Folder, 'Studies', true], [AudioLines, 'Interviews'], [Highlighter, 'Highlights'], [Lightbulb, 'Insights'], [Tag, 'Tags']] as const
  return (
    <aside className="flex w-[228px] shrink-0 flex-col gap-1 bg-[#fafafa] p-3 shadow-[inset_-1px_0_0_rgba(23,23,23,0.06)]">
      <div className="flex h-11 items-center gap-2.5 rounded-[12px] px-2">
        <span className="grid size-7 place-items-center rounded-[8px] bg-[#171717] text-[12px] font-[600] text-white">N</span>
        <span className="flex-1 leading-tight"><span className="block text-[13px] font-[550]">Northwind</span><span className="block text-[12px] text-[#8f8f8f]">Research · sample</span></span>
        <ChevronsUpDown size={14} className="text-[#a3a3a3]" />
      </div>
      <div className="mt-1 flex h-8 items-center gap-2 rounded-[9px] bg-white px-2.5 text-[13px] text-[#8f8f8f]" style={{ boxShadow: ring }}><Search size={14} />Search<span className="ml-auto rounded-[5px] px-1 text-[11px] shadow-[0_0_0_1px_rgba(23,23,23,0.08)]">⌘K</span></div>
      <nav className="mt-2 flex flex-col gap-0.5">
        {nav.map(([Ic, l, on]) => (
          <span key={l} className={`flex h-8 items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] font-[500] ${on ? 'bg-white text-[#171717]' : 'text-[#5c5c5c]'}`} style={on ? { boxShadow: ring } : undefined}><Ic {...I} className={on ? 'text-[#171717]' : 'text-[#8f8f8f]'} />{l}</span>
        ))}
      </nav>
      <div className="mt-4 px-2.5 text-[12px] font-[500] text-[#8f8f8f]">Studies</div>
      {[['Onboarding v3', 12, true], ['Pricing page', 8], ['Churn interviews', 15], ['Mobile beta', 6]].map(([n, c, on]) => (
        <span key={n as string} className={`flex h-8 items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] font-[500] ${on ? 'text-[#171717]' : 'text-[#5c5c5c]'}`}>
          <span className={`size-1.5 rounded-full ${on ? 'bg-[#171717]' : 'bg-[#d4d4d4]'}`} /><span className="flex-1">{n as string}</span><span className="tnum text-[12px] text-[#a3a3a3]">{c as number}</span>
        </span>
      ))}
    </aside>
  )
}

const LINES: { who: 'M' | 'R'; t: number; parts: (string | [TagKey, string])[] }[] = [
  { who: 'R', t: 312, parts: ['Walk me through the first day after you signed up.'] },
  { who: 'M', t: 318, parts: ['Honestly the product looked great, but ', ['import', 'we got stuck on the CSV import for two days'], '. Our columns never matched what it expected.'] },
  { who: 'R', t: 341, parts: ['What did you do then?'] },
  { who: 'M', t: 344, parts: ['I almost gave up. ', ['pricing', 'I also wasn’t sure if the seats we added would be billed'], ' straight away.'] },
  { who: 'M', t: 371, parts: ['Once the data was in though, ', ['delight', 'the weekly report was the moment it clicked for the team'], '.'] },
]
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function Product({ at = 0, h = 640 }: { at?: number; h?: number }) {
  let n = 0
  return (
    <div className="flex text-[#171717]" style={{ height: h, fontFeatureSettings: '"cv11","ss01"' }}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <div className="flex h-14 items-center gap-3 px-6 shadow-[inset_0_-1px_0_rgba(23,23,23,0.06)]">
          <span className="text-[13px] text-[#8f8f8f]">Studies /</span>
          <span className="text-[15px] font-[550] tracking-[-0.01em]">Onboarding v3</span>
          <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-[#f2f2f2] px-2 text-[12px] font-[500] text-[#5c5c5c]"><span className="size-1.5 rounded-full bg-[#2fb174]" />12 interviews · 148 highlights</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="flex -space-x-1"><Avatar i="AK" /><Avatar i="JR" /><Avatar i="LS" /></span>
            <span className="flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-[13px] font-[500]" style={{ boxShadow: ring }}><Share2 size={14} />Share</span>
          </div>
        </div>
        {/* body: tray holding two white cards */}
        <div className="flex flex-1 gap-3 bg-[#f5f5f5] p-3">
          {/* transcript */}
          <section className="flex min-w-0 flex-[1.35] flex-col rounded-[16px] bg-white" style={{ boxShadow: ring }}>
            <div className="flex h-[60px] items-center gap-3 px-5 shadow-[inset_0_-1px_0_rgba(23,23,23,0.06)]">
              <Avatar i="MC" size={32} />
              <span className="leading-tight"><span className="block text-[14px] font-[550]">Maya Chen</span><span className="block text-[12px] text-[#8f8f8f]">Product lead, Lumio · 32 min</span></span>
              <span className="ml-auto flex h-8 items-center gap-2 rounded-full bg-[#171717] pl-1 pr-3 text-[12px] font-[500] text-white"><span className="grid size-6 place-items-center rounded-full bg-white/15"><Play size={11} fill="#fff" /></span>05:18</span>
            </div>
            <div className="flex-1 space-y-4 px-5 py-4">
              {LINES.map((l, i) => (
                <motion.div key={i} className="grid grid-cols-[44px_1fr] gap-3" initial={{ opacity: 0.01, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at + 0.2 + i * 0.08, duration: 0.6, ease: ease.outQuint }}>
                  <span className="pt-[3px] font-mono text-[11px] text-[#a3a3a3]">{mmss(l.t)}</span>
                  <p className="text-[14px] leading-[23px] text-[#404040]"><span className="mr-1.5 font-[550] text-[#171717]">{l.who === 'M' ? 'Maya' : 'You'}</span>
                    {l.parts.map((p, j) => typeof p === 'string' ? <span key={j}>{p}</span> : <Mark key={j} t={p[0]} at={at + 0.9 + (n++) * 0.25}>{p[1]}</Mark>)}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="flex h-12 items-center gap-2 px-5 shadow-[inset_0_1px_0_rgba(23,23,23,0.06)]">
              <TagChip t="import" /><TagChip t="pricing" /><TagChip t="delight" />
              <span className="ml-auto text-[12px] text-[#8f8f8f]">3 highlights in this interview</span>
            </div>
          </section>
          {/* insight */}
          <section className="flex w-[360px] shrink-0 flex-col rounded-[16px] bg-white" style={{ boxShadow: ring }}>
            <div className="flex h-[60px] items-center gap-2.5 px-5 shadow-[inset_0_-1px_0_rgba(23,23,23,0.06)]">
              <span className="grid size-7 place-items-center rounded-[8px] bg-[#f5f5f5] text-[#525252]" style={{ boxShadow: ring }}><Lightbulb size={14} strokeWidth={1.9} /></span>
              <span className="text-[14px] font-[550]">Insight</span>
              <span className="ml-auto"><TagChip t="import" /></span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <div className="text-[17px] font-[550] leading-[23px] tracking-[-0.015em]">Teams stall at the CSV import before they see any value</div>
                <div className="mt-2 flex items-center gap-2 text-[12px] text-[#8f8f8f]"><Users size={13} />9 of 12 participants · 14 quotes</div>
              </div>
              <div>
                <div className="flex justify-between text-[12px] text-[#5c5c5c]"><span>Mentioned by</span><span className="tnum font-[550] text-[#171717]">75%</span></div>
                <div className="mt-2 flex gap-[3px]">{Array.from({ length: 12 }, (_, i) => <motion.span key={i} className="h-2 flex-1 rounded-[3px]" style={{ background: i < 9 ? '#e7a21d' : '#ededed' }} initial={{ opacity: 0, scaleY: 0.3 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: at + 1.6 + i * 0.04, duration: 0.4 }} />)}</div>
              </div>
              <div className="space-y-2">
                {[['JR', 'The import errors told us nothing.'], ['LS', 'We gave up and pasted rows by hand.'], ['AK', 'Mapping columns took a whole afternoon.']].map(([a, q], i) => (
                  <motion.div key={a} className="flex items-start gap-2.5 rounded-[12px] bg-[#fafafa] p-2.5" style={{ boxShadow: ring }} initial={{ opacity: 0.01, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at + 1.9 + i * 0.1, duration: 0.6, ease: ease.outQuint }}>
                    <Avatar i={a} size={22} /><span className="text-[13px] leading-[19px] text-[#404040]">“{q}”</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-2 rounded-[12px] bg-[#f5f5f5] p-1.5 pl-3">
                <Sparkles size={14} className="text-[#525252]" /><span className="flex-1 text-[12px] text-[#5c5c5c]">Suggested: simplify column mapping</span>
                <span className="flex h-7 items-center gap-1 rounded-full bg-[#171717] px-3 text-[12px] font-[500] text-white">Add to roadmap<ArrowUpRight size={12} /></span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
