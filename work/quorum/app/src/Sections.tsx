// Quorum site sections below the hero. Every visual is a fragment of the product itself (same tray + white card grammar,
// same tags, same people), never an illustration. Sample data throughout; no customers, logos or metrics presented as real.
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, CornerDownRight, EyeOff, Link2, Lock, Mic, Play, Plus, Scissors, Sparkles } from 'lucide-react'
import { InView } from './kit'
import { ease } from './motion'
import { Avatar, TAG, TagChip, type TagKey } from './Product'
import QuorumLogo, { QuorumMark } from './QuorumLogo'
import { Fit, Head, Nodes, Section } from './ui'

const tile = 'var(--shadow-tile)'
const RING = 'shadow-[0_0_0_1px_rgba(23,23,23,0.07),0_1px_2px_rgba(10,13,20,0.04)]'
const once = { once: true, margin: '0px 0px -20% 0px' } as const

/* highlight that sweeps in when scrolled into view */
function Hl({ t, children, i = 0 }: { t: TagKey; children: ReactNode; i?: number }) {
  return (
    <motion.mark className="rounded-[4px] px-[2px] text-inherit" initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} viewport={once}
      transition={{ delay: 0.35 + i * 0.25, duration: 0.7, ease: ease.outQuint }}
      style={{ backgroundImage: `linear-gradient(${TAG[t].bg}, ${TAG[t].bg})`, backgroundRepeat: 'no-repeat', backgroundColor: 'transparent', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{children}</motion.mark>
  )
}

/* card shell: white 20px card, 6px padding, a 14px grey tray for the visual (concentric: 14 + 6 = 20) */
function Card({ visual, h = 260, title, children, className = '', i = 0 }: { visual: ReactNode; h?: number; title: string; children: ReactNode; className?: string; i?: number }) {
  return (
    <InView i={i} className={`flex flex-col rounded-[20px] bg-white p-1.5 ${RING} ${className}`}>
      <div className="relative overflow-hidden rounded-[14px] bg-[#f5f5f5]" style={{ height: h }}>{visual}</div>
      <div className="px-4 pb-4 pt-4">
        <h3 className="text-[17px] font-[550] tracking-[-0.02em]">{title}</h3>
        <p className="mt-1.5 text-[14px] leading-[22px] text-[var(--sub)]">{children}</p>
      </div>
    </InView>
  )
}

/* ---------- 1. Steps: record, highlight, decide ---------- */
const BARS = Array.from({ length: 54 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31 + 1)))

function RecordVisual() {
  return (
    <div className="absolute inset-x-5 top-6 rounded-[12px] bg-white p-4" style={{ boxShadow: tile }}>
      <div className="flex items-center gap-2.5">
        <Avatar i="MC" size={28} />
        <span className="flex-1 leading-tight"><span className="block text-[13px] font-[550]">Call with Maya Chen</span><span className="block text-[12px] text-[#8f8f8f]">Lumio · onboarding</span></span>
        <span className="flex h-6 items-center gap-1.5 rounded-full bg-[#fff1f0] px-2 text-[11px] font-[550] text-[#c8322b]"><span className="size-1.5 animate-pulse rounded-full bg-[#e5484d]" />REC<span className="tnum font-mono font-[500]">18:42</span></span>
      </div>
      <div className="mt-4 flex h-10 items-center gap-[2px]">
        {BARS.map((b, i) => (
          <motion.span key={i} className="flex-1 rounded-full" style={{ background: i < 34 ? '#171717' : '#dcdcdc', height: `${b * 100}%` }}
            initial={{ scaleY: 0.2 }} whileInView={{ scaleY: 1 }} viewport={once} transition={{ delay: 0.2 + i * 0.012, duration: 0.5, ease: ease.outQuint }} />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {([['Maya', 0.72], ['You', 0.38]] as const).map(([n, w]) => (
          <div key={n} className="flex items-center gap-2 text-[11px] text-[#8f8f8f]"><span className="w-9">{n}</span><span className="h-1.5 flex-1 rounded-full bg-[#f0f0f0]"><span className="block h-full rounded-full bg-[#cfcfcf]" style={{ width: `${w * 100}%` }} /></span></div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-[#f0f0f0] pt-3 text-[12px] text-[#5c5c5c]"><Mic size={13} />Transcribing live<span className="ml-auto font-mono text-[11px] text-[#a3a3a3]">EN · 2 speakers</span></div>
    </div>
  )
}

function HighlightVisual() {
  return (
    <>
      <div className="absolute inset-x-5 top-6 rounded-[12px] bg-white px-4 py-3.5 text-[13px] leading-[21px] text-[#404040]" style={{ boxShadow: tile }}>
        <p><span className="mr-1.5 font-[550] text-[#171717]">Maya</span>Honestly the product looked great, but <Hl t="import">we got stuck on the CSV import for two days</Hl>.</p>
      </div>
      <motion.div className="absolute left-[44px] top-[128px] w-[196px] rounded-[12px] bg-white p-1" style={{ boxShadow: tile }}
        initial={{ opacity: 0, y: 8, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={once} transition={{ delay: 0.9, duration: 0.6, ease: ease.outQuint }}>
        {(['import', 'pricing', 'delight'] as TagKey[]).map((t, i) => (
          <div key={t} className={`flex h-8 items-center gap-2 rounded-[8px] px-2 text-[12px] font-[500] ${i === 0 ? 'bg-[#f5f5f5]' : ''}`}>
            <span className="size-2 rounded-full" style={{ background: TAG[t].dot }} />{TAG[t].label}
            {i === 0 && <Check size={13} className="ml-auto" />}
          </div>
        ))}
        <div className="mx-1 my-1 h-px bg-[#f0f0f0]" />
        <div className="flex h-8 items-center gap-2 px-2 text-[12px] text-[#8f8f8f]"><Plus size={13} />New tag</div>
      </motion.div>
    </>
  )
}

function DecideVisual() {
  return (
    <div className="absolute inset-x-5 top-6">
      <div className="rounded-[12px] bg-white p-4" style={{ boxShadow: tile }}>
        <div className="flex items-center gap-2"><TagChip t="import" /><span className="ml-auto text-[11px] text-[#a3a3a3]">Insight</span></div>
        <div className="mt-2.5 text-[14px] font-[550] leading-[20px] tracking-[-0.01em]">Teams stall at the CSV import before they see any value</div>
        <div className="mt-3 flex gap-[3px]">{Array.from({ length: 12 }, (_, i) => <span key={i} className="h-1.5 flex-1 rounded-[2px]" style={{ background: i < 9 ? '#e7a21d' : '#ededed' }} />)}</div>
        <div className="mt-2 text-[11px] text-[#8f8f8f]">9 of 12 participants · 14 quotes</div>
      </div>
      <div className="ml-5 flex h-7 items-center text-[#c4c4c4]"><CornerDownRight size={15} /></div>
      <motion.div className="flex h-11 items-center gap-2.5 rounded-[12px] bg-white px-3 text-[12px]" style={{ boxShadow: tile }}
        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={once} transition={{ delay: 0.7, duration: 0.6, ease: ease.outQuint }}>
        <Link2 size={13} className="shrink-0 text-[#8f8f8f]" /><span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-[#8f8f8f]">QRM-142</span><span className="truncate font-[500]">Column mapping</span>
        <span className="ml-auto flex h-5 shrink-0 items-center gap-1 rounded-full bg-[#eef3ff] px-1.5 text-[11px] font-[500] text-[#2b52c9]"><span className="size-1.5 rounded-full bg-[#4d7bff]" />In progress</span>
      </motion.div>
    </div>
  )
}

export function Steps() {
  return (
    <Section id="method">
      <Head title={<>From Raw Calls<br />To Clear Decisions</>}>Record or upload the call, mark what matters while you listen, and ship the insight with every quote attached.</Head>
      <div className="grid gap-3 px-4 pb-24 pt-14 md:grid-cols-3 md:px-12">
        <Card i={0} visual={<RecordVisual />} title="Record any call">Join from Zoom, Meet or Teams, or drop in a file. Transcripts land with speakers and timestamps.</Card>
        <Card i={1} visual={<HighlightVisual />} title="Highlight as you listen">Select a line and tag it. Every highlight keeps its clip, its speaker and the moment it was said.</Card>
        <Card i={2} visual={<DecideVisual />} title="Turn quotes into decisions">Group highlights into an insight and link it to the roadmap, so the evidence travels with the work.</Card>
      </div>
    </Section>
  )
}

/* ---------- 2. Converge: many quotes, one insight (the signature visual) ---------- */
const QUOTES: { a: string; q: string; t: TagKey | null; e: number; y: number }[] = [
  { a: 'JR', q: 'The import broke on our date column', t: 'import', e: 360, y: 34 },
  { a: 'TB', q: 'Finance asked how seats are billed', t: 'pricing', e: 420, y: 88 },
  { a: 'LS', q: 'We pasted rows by hand for a week', t: 'import', e: 330, y: 142 },
  { a: 'MC', q: 'The weekly report sold my manager', t: 'delight', e: 440, y: 196 },
  { a: 'AK', q: 'Mapping columns took an afternoon', t: 'import', e: 370, y: 250 },
  { a: 'RW', q: 'Not sure what counts as an editor', t: 'pricing', e: 430, y: 304 },
  { a: 'DP', q: 'Import errors told us nothing', t: 'import', e: 340, y: 358 },
  { a: 'EN', q: 'Welcome emails came a day late', t: null, e: 410, y: 412 },
]
const HUB = { x: 620, y: 240 }
const CARD = { x: 748, y: 112, w: 330 }

function ConvergeCanvas() {
  return (
    <div className="relative h-[480px] w-[1104px]">
      <svg className="absolute inset-0" width={1104} height={480} aria-hidden>
        {QUOTES.map((q, i) => {
          const sx = q.e, sy = q.y + 18, on = q.t === 'import'
          return (
            <motion.path key={i} d={`M${sx} ${sy} C ${sx + 130} ${sy}, ${HUB.x - 150} ${HUB.y}, ${HUB.x - 14} ${HUB.y}`} fill="none"
              stroke={on ? '#e7a21d' : '#dcdcdc'} strokeWidth={on ? 1.5 : 1} initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={once}
              transition={{ delay: 0.3 + i * 0.06, duration: 1.1, ease: ease.inOut }} />
          )
        })}
        <motion.path d={`M${HUB.x + 14} ${HUB.y} L ${CARD.x} ${HUB.y}`} stroke="#e7a21d" strokeWidth={1.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={once} transition={{ delay: 1.4, duration: 0.6, ease: ease.inOut }} />
      </svg>
      {QUOTES.map((q, i) => (
        <motion.div key={q.a} className="absolute flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-white pl-1.5 pr-3 text-[13px] text-[#404040]" style={{ right: 1104 - q.e, top: q.y, boxShadow: tile }}
          initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: q.t === 'import' ? 1 : 0.6, x: 0 }} viewport={once} transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: ease.outQuint }}>
          <Avatar i={q.a} size={24} /><span>“{q.q}”</span>
          <span className="ml-1 size-1.5 shrink-0 rounded-full" style={{ background: q.t ? TAG[q.t].dot : '#c4c4c4' }} />
        </motion.div>
      ))}
      <motion.div className="absolute grid size-7 place-items-center rounded-full bg-[#171717] text-white" style={{ left: HUB.x - 14, top: HUB.y - 14, boxShadow: '0 0 0 4px #f7f7f7, 0 0 0 5px rgba(23,23,23,0.08)' }}
        initial={{ scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={once} transition={{ delay: 1.1, duration: 0.6, ease: ease.outExpo }}>
        <Sparkles size={13} />
      </motion.div>
      <motion.div className="absolute rounded-[16px] bg-white p-5" style={{ left: CARD.x, top: CARD.y, width: CARD.w, boxShadow: 'var(--shadow-frame)' }}
        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={once} transition={{ delay: 1.5, duration: 0.9, ease: ease.reveal }}>
        <div className="flex items-center gap-2"><TagChip t="import" /><span className="ml-auto font-mono text-[11px] text-[#a3a3a3]">Onboarding v3</span></div>
        <div className="mt-3 text-[18px] font-[550] leading-[24px] tracking-[-0.02em]">Teams stall at the CSV import before they see any value</div>
        <div className="mt-4 flex justify-between text-[12px] text-[#5c5c5c]"><span>Mentioned by</span><span className="tnum font-[550] text-[#171717]">9 of 12</span></div>
        <div className="mt-2 flex gap-[3px]">{Array.from({ length: 12 }, (_, i) => <span key={i} className="h-2 flex-1 rounded-[3px]" style={{ background: i < 9 ? '#e7a21d' : '#ededed' }} />)}</div>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-[#5c5c5c]"><span className="flex -space-x-1"><Avatar i="JR" size={22} /><Avatar i="LS" size={22} /><Avatar i="AK" size={22} /><Avatar i="DP" size={22} /></span>14 quotes, 4 shown</div>
      </motion.div>
    </div>
  )
}

export function Converge() {
  return (
    <Section>
      <Head title={<>Forty Calls,<br />One Clear Answer</>}>Quorum reads every highlight in a study and groups the ones that say the same thing, with the count and the quotes to back it.</Head>
      <div className="px-4 pb-24 pt-14 md:px-12">
        <InView className={`rounded-[24px] bg-white p-1.5 ${RING}`}>
          <div className="overflow-hidden rounded-[18px] bg-[#f7f7f7]" style={{ backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.08) 1px, transparent 1.3px)', backgroundSize: '16px 16px' }}>
            <Fit w={1104} h={480}><ConvergeCanvas /></Fit>
          </div>
        </InView>
      </div>
    </Section>
  )
}

/* ---------- 3. Bento: the rest of the research loop ---------- */
function AskVisual() {
  return (
    <div className="absolute inset-x-6 top-6 space-y-3">
      <div className="ml-auto w-fit rounded-[14px] rounded-br-[6px] bg-[#171717] px-3.5 py-2 text-[13px] text-white">Why do trials stall in the first week?</div>
      <motion.div className="rounded-[14px] bg-white p-4 text-[13px] leading-[21px] text-[#404040]" style={{ boxShadow: tile }}
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={once} transition={{ delay: 0.4, duration: 0.7, ease: ease.outQuint }}>
        <div className="mb-2 flex items-center gap-2 text-[12px] font-[550] text-[#171717]"><QuorumMark width={18} />Quorum</div>
        Most teams lose the first week to <Hl t="import">getting their data in</Hl>: 9 of 12 participants hit the CSV import, and 4 gave up before seeing a report. A smaller group was <Hl t="pricing" i={1}>unsure how seats are billed</Hl>.
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[['MC', '05:18'], ['JR', '12:40'], ['LS', '03:02'], ['TB', '21:15']].map(([a, t]) => (
            <span key={a} className="flex h-6 items-center gap-1.5 rounded-full bg-[#f5f5f5] pl-0.5 pr-2 text-[11px] text-[#5c5c5c]"><Avatar i={a} size={20} /><span className="font-mono">{t}</span></span>
          ))}
          <span className="flex h-6 items-center rounded-full px-2 text-[11px] text-[#8f8f8f]">+10 sources</span>
        </div>
      </motion.div>
      <div className="flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-1 text-[13px] text-[#a3a3a3]" style={{ boxShadow: tile }}>
        Ask a follow-up<span className="ml-auto grid size-8 place-items-center rounded-full bg-[#171717] text-white"><ArrowUpRight size={14} /></span>
      </div>
    </div>
  )
}

function RedactVisual() {
  const bar = (w: number) => <span className="inline-block h-[13px] translate-y-[2px] rounded-[3px] bg-[#171717]" style={{ width: w }} />
  return (
    <div className="absolute inset-x-5 top-5 space-y-3">
      <div className="flex h-10 items-center gap-2 rounded-[12px] bg-white px-3 text-[12px] font-[500]" style={{ boxShadow: tile }}>
        <EyeOff size={14} className="text-[#5c5c5c]" />Redact personal data
        <span className="ml-auto flex h-5 w-9 items-center justify-end rounded-full bg-[#171717] p-0.5"><span className="size-4 rounded-full bg-white" /></span>
      </div>
      <div className="rounded-[12px] bg-white p-3.5 text-[12px] leading-[22px] text-[#404040]" style={{ boxShadow: tile }}>
        <p>Send the file to {bar(96)}.</p>
        <p>Copy my manager, {bar(64)}, too.</p>
        <p>My number is {bar(78)} if it fails.</p>
      </div>
      <div className="flex items-center gap-2 px-1 text-[12px] text-[#5c5c5c]"><Lock size={12} />3 items hidden · email, name, phone</div>
    </div>
  )
}

function TagsVisual() {
  const rows: [string, number, string][] = [['Import', 41, '#e7a21d'], ['Pricing', 28, '#4d7bff'], ['Onboarding', 22, '#a3a3a3'], ['Delight', 19, '#2fb174'], ['Performance', 11, '#a3a3a3']]
  return (
    <div className="absolute inset-x-5 top-5 rounded-[12px] bg-white px-4 py-3" style={{ boxShadow: tile }}>
      {rows.map(([n, c, col], i) => (
        <div key={n} className="flex h-[30px] items-center gap-3 text-[12px]">
          <span className="w-[78px] text-[#5c5c5c]">{n}</span>
          <span className="h-2 flex-1 rounded-full bg-[#f2f2f2]"><motion.span className="block h-full origin-left rounded-full" style={{ width: `${(c / 41) * 100}%`, background: col }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={once} transition={{ delay: 0.3 + i * 0.07, duration: 0.9, ease: ease.outExpo }} /></span>
          <span className="tnum w-5 text-right font-mono text-[11px] text-[#8f8f8f]">{c}</span>
        </div>
      ))}
    </div>
  )
}

function ClipsVisual() {
  return (
    <div className="absolute inset-x-5 top-5 space-y-3">
      <div className="flex gap-2">
        {[['MC', '0:24'], ['JR', '0:31'], ['LS', '0:18']].map(([a, d], i) => (
          <div key={a} className="relative h-[86px] flex-1 overflow-hidden rounded-[10px] bg-[#1c1c1c]" style={{ boxShadow: '0 0 0 1px rgba(23,23,23,0.12)' }}>
            <div className="absolute inset-x-2.5 bottom-6 flex h-5 items-end gap-[2px]">{BARS.slice(i * 9, i * 9 + 16).map((b, j) => <span key={j} className="flex-1 rounded-full bg-white/35" style={{ height: `${b * 100}%` }} />)}</div>
            <div className="absolute left-2 top-2"><Avatar i={a} size={20} /></div>
            <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-white/70">{d}</span>
            {i === 0 && <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-white/15"><Play size={9} fill="#fff" className="text-white" /></span>}
          </div>
        ))}
      </div>
      <div className="flex h-10 items-center gap-2 rounded-[12px] bg-white px-3 text-[12px]" style={{ boxShadow: tile }}>
        <Scissors size={13} className="text-[#5c5c5c]" /><span className="font-[500]">Highlight reel</span><span className="text-[#8f8f8f]">6 clips · 2:41</span>
        <span className="ml-auto flex h-6 items-center gap-1 rounded-full bg-[#171717] px-2.5 text-[11px] font-[500] text-white">Share<ArrowUpRight size={11} /></span>
      </div>
    </div>
  )
}

function SpeakersVisual() {
  const rows: [string, [number, number][]][] = [['Maya', [[0, 22], [30, 58], [64, 100]]], ['You', [[22, 30], [58, 64]]]]
  return (
    <div className="absolute inset-x-5 top-5 rounded-[12px] bg-white p-4" style={{ boxShadow: tile }}>
      <div className="flex justify-between font-mono text-[10px] text-[#a3a3a3]"><span>00:00</span><span>16:00</span><span>32:00</span></div>
      <div className="mt-3 space-y-2.5">
        {rows.map(([n, segs], r) => (
          <div key={n} className="flex items-center gap-3 text-[12px]">
            <span className="w-10 text-[#5c5c5c]">{n}</span>
            <span className="relative h-5 flex-1 rounded-[6px] bg-[#f5f5f5]">{segs.map(([a, b]) => <span key={a} className="absolute inset-y-0.5 rounded-[4px]" style={{ left: `${a}%`, width: `${b - a}%`, background: r ? '#d4d4d4' : '#171717' }} />)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex items-center gap-2 border-t border-[#f0f0f0] pt-3 text-[12px] text-[#5c5c5c]"><Mic size={12} />Participant talk time 78%</div>
    </div>
  )
}

export function Bento() {
  return (
    <Section id="product">
      <Head title={<>Built For The Whole<br />Research Loop</>}>The parts research teams reach for every week, in one workspace that keeps the quote, the clip and the decision together.</Head>
      <div className="grid gap-3 px-4 pb-24 pt-14 md:grid-cols-6 md:px-12">
        <Card i={0} className="md:col-span-4" h={312} visual={<AskVisual />} title="Ask across every call">Ask a question in plain English and get an answer built only from your interviews, with every source one click away.</Card>
        <Card i={1} className="md:col-span-2" h={312} visual={<RedactVisual />} title="Private by default">Names, emails and phone numbers are redacted before anyone outside the study sees a transcript.</Card>
        <Card i={0} className="md:col-span-2" h={220} visual={<TagsVisual />} title="Tags that count">See which themes come up most, across one study or all of them.</Card>
        <Card i={1} className="md:col-span-2" h={220} visual={<ClipsVisual />} title="Clips and reels">Cut the moments that matter into a reel your team will actually watch.</Card>
        <Card i={2} className="md:col-span-2" h={220} visual={<SpeakersVisual />} title="Speaker-aware">Know who said what, and how much of the call you spent listening.</Card>
      </div>
    </Section>
  )
}

/* ---------- 4. Pricing ---------- */
export function Pricing() {
  const plans = [
    { n: 'Starter', p: '$0', u: 'for one researcher', d: 'Run your first study and see what a tagged interview feels like.', f: ['5 interviews a month', 'Transcripts and highlights', 'Up to 3 tags'], cta: 'Start free', ink: false },
    { n: 'Team', p: '$24', u: 'per editor, per month', d: 'For product teams that talk to customers every week.', f: ['Unlimited interviews', 'Insights and Ask Quorum', 'Clips, reels and roadmap links', 'Viewers always free'], cta: 'Start a 14-day trial', ink: true },
    { n: 'Business', p: 'Custom', u: 'annual agreement', d: 'For research operations across several teams.', f: ['SSO and SCIM', 'Custom retention and redaction', 'Shared research repository'], cta: 'Talk to us', ink: false },
  ]
  return (
    <Section id="pricing">
      <Head title={<>Priced Per Editor,<br />Free For Everyone Else</>}>Pay for the people who run interviews and write insights. Everyone who reads them joins for free.</Head>
      <div className="grid gap-3 px-4 pb-24 pt-14 md:grid-cols-3 md:px-12">
        {plans.map((p, i) => (
          <InView key={p.n} i={i} className={`flex flex-col rounded-[20px] bg-white p-6 ${RING}`}>
            <h3 className="text-[15px] font-[550]">{p.n}</h3>
            <div className="mt-5 flex items-baseline gap-2"><span className="text-[40px] font-[550] leading-none tracking-[-0.04em]">{p.p}</span><span className="text-[13px] text-[#8f8f8f]">{p.u}</span></div>
            <p className="mt-3 min-h-[44px] text-[14px] leading-[22px] text-[var(--sub)]">{p.d}</p>
            <a href="#" className={`press mt-6 flex h-10 items-center justify-center rounded-full text-[14px] font-[550] ${p.ink ? 'btn-ink' : 'btn-white'}`}>{p.cta}</a>
            <ul className="mt-6 space-y-2.5 border-t border-[#f0f0f0] pt-5">
              {p.f.map((f) => <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#404040]"><Check size={15} strokeWidth={2} className="text-[#171717]" />{f}</li>)}
            </ul>
          </InView>
        ))}
      </div>
    </Section>
  )
}

/* ---------- 5. Closing + footer ---------- */
export function Closing() {
  const mask = 'radial-gradient(ellipse 520px 240px at 50% 50%, transparent 35%, #000 90%)'
  return (
    <Section className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.15) 1px, transparent 1.3px)', backgroundSize: '16px 16px', backgroundPosition: '-1px 7px', WebkitMaskImage: mask, maskImage: mask }} />
      <div className="relative flex flex-col items-center px-6 py-28 text-center md:py-36">
        <InView><QuorumMark width={64} className="text-[var(--ink)]" /></InView>
        <InView i={1}><h2 className="mt-8 text-[40px] font-[550] leading-[1.04] tracking-[-0.045em] md:text-[60px]">Hear Every Customer<br />At Once</h2></InView>
        <InView i={2}><p className="mt-5 text-[17px] leading-7 text-[var(--sub)] md:text-[18px]">Bring your next five interviews.<br className="hidden md:block" /> Quorum will show you what they have in common.</p></InView>
        <InView i={3} className="mt-8 flex items-center gap-3 text-[15px]">
          <a href="#" className="btn-ink press flex h-11 items-center gap-2 rounded-full pl-5 pr-4 font-[550]">Start free<ArrowRight size={16} strokeWidth={2} className="opacity-70" /></a>
          <a href="#" className="btn-white press flex h-11 items-center rounded-full px-5 font-[550]">Book a demo</a>
        </InView>
      </div>
    </Section>
  )
}

export function Footer() {
  const cols: [string, string[]][] = [['Product', ['Transcripts', 'Highlights', 'Insights', 'Ask Quorum']], ['Resources', ['Docs', 'Changelog', 'Interview guides']], ['Company', ['About', 'Careers', 'Contact']], ['Legal', ['Privacy', 'Terms', 'DPA']]]
  return (
    <footer className="border-t border-[var(--rail)]">
      <div className="wrap">
        <Nodes />
        <div className="grid gap-10 px-6 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)] md:px-12">
          <div><QuorumLogo width={26} /><p className="mt-4 max-w-[240px] text-[14px] leading-[22px] text-[var(--sub)]">Customer interviews, turned into answers your team can act on.</p></div>
          {cols.map(([h, ls]) => (
            <div key={h}><div className="text-[13px] font-[550]">{h}</div><ul className="mt-4 space-y-2.5">{ls.map((l) => <li key={l}><a href="#" className="text-[14px] text-[var(--sub)] transition-colors duration-[220ms] hover:text-[var(--ink)]">{l}</a></li>)}</ul></div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-[var(--rail)] px-6 py-6 text-[13px] text-[#8f8f8f] md:flex-row md:px-12">
          <span>© 2026 Quorum</span><span className="md:ml-auto">A fictional product. Every name, quote and number shown is sample data.</span>
        </div>
      </div>
    </footer>
  )
}
