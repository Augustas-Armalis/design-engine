// Murmur hero object (Basit's tilted-device pattern, dribbble-catalyst-landing-page-design.jpg): one phone in CSS 3D with the
// real app on it: a live recording (timer, waveform), the transcript arriving line by line, the AI tagging an action item,
// and the summary card. One object, one moment. Sample data.
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle2, Home, Library, Mic, Search, Sparkles, User } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const LINES = [
  ['Maya', 'Pricing page goes live on Friday, then?'],
  ['Jonas', 'If I get the final copy by Wednesday, yes.'],
  ['Maya', 'I will send it Tuesday night.'],
]

function Wave({ live }: { live: boolean }) {
  const bars = Array.from({ length: 34 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)))
  return (
    <div className="flex h-10 items-center gap-[3px]" aria-hidden>
      {bars.map((h, i) => (
        <span key={i} className="w-[3px] rounded-full bg-white/90" style={{ height: `${Math.round(h * 100)}%`, animation: live ? `wave 1.1s ${(i % 7) * 0.09}s ease-in-out infinite alternate` : undefined, opacity: i > 26 ? 0.35 : 1 }} />
      ))}
    </div>
  )
}

export default function Phone({ at = 0 }: { at?: number }) {
  const still = useReducedMotion()
  const [n, setN] = useState(still ? LINES.length : 0)
  const [tagged, setTagged] = useState(!!still)
  const [sec, setSec] = useState(768)
  useEffect(() => {
    if (still) return
    const ids = LINES.map((_, i) => window.setTimeout(() => setN(i + 1), (at + 1.0 + i * 0.9) * 1000))
    ids.push(window.setTimeout(() => setTagged(true), (at + 3.4) * 1000))
    const t = window.setInterval(() => setSec((s) => s + 1), 1000)
    return () => { ids.forEach(clearTimeout); clearInterval(t) }
  }, [at, still])
  const mm = String(Math.floor(sec / 60)).padStart(2, '0'), ss = String(sec % 60).padStart(2, '0')
  return (
    <div className="relative h-[640px] w-[312px] rounded-[56px] p-[11px]" style={{ background: 'linear-gradient(145deg, #3a3e4a 0%, #15171e 40%, #0a0b10 100%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 1px rgba(255,255,255,0.35), 14px 18px 0 -2px #07080c, 0 60px 90px -30px rgba(0,0,0,0.9)' }}>
      <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-[#f4f6fb]">
        {/* top: the live recording */}
        <div className="relative h-[262px] px-5 pt-3 text-white" style={{ background: 'linear-gradient(170deg, #2a46e6 0%, #1630b8 45%, #0c1a6e 100%)' }}>
          <div className="flex items-center justify-between text-[11.5px] font-[600]"><span>9:41</span><span className="h-[22px] w-[86px] rounded-full bg-black" /><span>100%</span></div>
          <div className="mt-6 flex items-center gap-2 text-[12.5px] font-[500] text-white/80"><span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[#ff6b6b] opacity-70" /><span className="size-1.5 rounded-full bg-[#ff6b6b]" /></span>Recording · Pricing sync</div>
          <div className="mt-1 text-[44px] font-[600] leading-none tracking-[-0.03em] tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>{mm}:{ss}</div>
          <div className="mt-5"><Wave live={!still} /></div>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-8 items-center gap-1.5 rounded-full bg-white/15 px-3 text-[12.5px] font-[500]"><Mic size={13} strokeWidth={2} />3 speakers</span>
            <span className="flex h-8 items-center gap-1.5 rounded-full bg-white/15 px-3 text-[12.5px] font-[500]"><Sparkles size={13} strokeWidth={2} />Notes on</span>
          </div>
        </div>
        {/* sheet: transcript arriving + the AI's tag */}
        <div className="absolute inset-x-0 bottom-0 top-[238px] rounded-t-[26px] bg-[#f4f6fb] px-4 pt-4 text-[#0d1330]">
          <div className="flex items-center justify-between"><span className="text-[14px] font-[600]">Live transcript</span><span className="text-[12px] text-[#6b7392]">auto-saved</span></div>
          <div className="mt-3 space-y-2.5">
            {LINES.slice(0, n).map(([who, t], i) => (
              <motion.div key={i} initial={still ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="flex gap-2.5">
                <span className={`mt-[1px] grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-[700] ${who === 'Maya' ? 'bg-[#dfe6ff] text-[#2a46e6]' : 'bg-[#ffe6d5] text-[#b4500f]'}`}>{who[0]}</span>
                <div className="min-w-0"><div className="text-[11.5px] font-[600] text-[#6b7392]">{who}</div><div className="text-[13px] leading-[18px]">{t}</div></div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-3.5 rounded-[16px] bg-white p-3 shadow-[0_0_0_1px_rgba(13,19,48,0.06),0_8px_20px_-10px_rgba(13,19,48,0.25)]" initial={still ? false : { opacity: 0, y: 10 }} animate={tagged ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, ease }}>
            <div className="flex items-center gap-1.5 text-[12px] font-[600] text-[#2a46e6]"><Sparkles size={13} strokeWidth={2} />Action item added</div>
            <div className="mt-1.5 flex items-start gap-2 text-[13px] leading-[18px]"><CheckCircle2 size={15} strokeWidth={2} className="mt-[1px] shrink-0 text-[#2a46e6]" />Maya sends final pricing copy to Jonas, Tue</div>
          </motion.div>
        </div>
        {/* tab bar */}
        <div className="absolute inset-x-0 bottom-0 flex h-[64px] items-start justify-around border-t border-[#0d1330]/[0.06] bg-white/95 pt-2.5 text-[#9aa2bd]">
          {[Home, Search, Library, User].map((I, i) => <I key={i} size={21} strokeWidth={1.75} className={i === 0 ? 'text-[#2a46e6]' : ''} />)}
        </div>
        {/* glass glare across the screen */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_28%,transparent_42%)]" />
      </div>
    </div>
  )
}
