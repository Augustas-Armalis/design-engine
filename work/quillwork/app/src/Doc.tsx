// Quillwork hero object: one lit sheet of paper on a dark desk (founder: show one moment, not a dashboard). A clause in a
// sample contract is struck through, the AI's rewrite types in, and a margin note cites the precedent it came from.
// Smooth corners from system/effects/squircle.ts (Figma 60% = Apple); the drop shadow sits on an unclipped sibling.
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { squircleClipPath } from './squircle'

const ease = [0.22, 1, 0.36, 1] as const
const W = 500, HGT = 620
const OLD = 'in no event shall either party be liable for any indirect damages whatsoever'
const NEW = 'neither party is liable for indirect or consequential losses, except for a breach of Section 9 (Confidentiality)'

export default function Doc({ at = 0 }: { at?: number }) {
  const still = useReducedMotion()
  const [n, setN] = useState(still ? NEW.length : 0) // characters of the insertion typed
  const [struck, setStruck] = useState(!!still)
  const [note, setNote] = useState(!!still)
  useEffect(() => {
    if (still) return
    const ids: number[] = []
    ids.push(window.setTimeout(() => setStruck(true), (at + 1.0) * 1000))
    ids.push(window.setTimeout(() => {
      const t0 = performance.now()
      const iv = window.setInterval(() => { const k = Math.min(NEW.length, Math.floor((performance.now() - t0) / 26)); setN(k); if (k >= NEW.length) window.clearInterval(iv) }, 16)
      ids.push(iv)
    }, (at + 1.6) * 1000))
    ids.push(window.setTimeout(() => setNote(true), (at + 2.4) * 1000))
    return () => ids.forEach((i) => { window.clearTimeout(i); window.clearInterval(i) })
  }, [at, still])
  const clip = squircleClipPath({ width: W, height: HGT, radius: 24, smoothing: 0.6 })
  return (
    <div className="relative" style={{ width: W, height: HGT }}>
      <span className="sr-only">Sample contract: Quillwork strikes a limitation-of-liability clause and proposes a rewrite that carves out confidentiality, citing a 2025 precedent.</span>
      {/* contact shadow + cast shadow away from the lamp (upper right), on an unclipped sibling */}
      <div aria-hidden className="absolute inset-0 translate-x-[-18px] translate-y-[26px] rounded-[28px] bg-black/60 blur-[28px]" />
      <div aria-hidden className="absolute inset-x-6 bottom-[-6px] h-6 rounded-full bg-black/70 blur-[10px]" />
      <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ clipPath: clip, background: 'linear-gradient(200deg, #fbf6ee 0%, #f3ede3 38%, #e3dbcf 100%)' }}>
        <div className="px-10 pt-10 text-[var(--paper-ink)]">
          <div className="flex items-center justify-between text-[12.5px] text-[var(--paper-sub)]"><span>Master Services Agreement</span><span>Northwind · sample</span></div>
          <div className="mt-1 h-px bg-[#1d1813]/10" />
          <div className="serif mt-8 text-[24px] font-[500] tracking-[-0.01em]">7. Limitation of Liability</div>
          <p className="mt-4 text-[14.5px] leading-[24px] text-[#3a332b]">7.1 Each party's total liability under this Agreement is limited to the fees paid in the twelve months before the claim.</p>
          <p className="mt-4 text-[14.5px] leading-[24px] text-[#3a332b]">
            7.2 Except as set out in 7.3,{' '}
            <span className={`line-through decoration-[1.5px] transition-[color,text-decoration-color] duration-500 ${struck ? 'text-[#3a332b]/45 decoration-[var(--ember)]' : 'decoration-transparent'}`}>{OLD}</span>
            {n > 0 && <> <span className="rounded-[3px] bg-[var(--ember-tint)] text-[#9a3c11] decoration-[var(--ember)] underline decoration-[1.5px] underline-offset-[3px]">{NEW.slice(0, n)}</span>{n < NEW.length && <span className="ml-px inline-block h-[17px] w-[1.5px] translate-y-[3px] animate-pulse bg-[var(--ember)]" />}</>}
            .
          </p>
          <p className="mt-4 text-[14.5px] leading-[24px] text-[#3a332b]">7.3 Nothing in this Agreement limits liability for fraud or for death or personal injury caused by negligence.</p>
          <div className="mt-8 space-y-2.5">{[92, 84, 88, 60].map((w, i) => <div key={i} className="h-[7px] rounded-full bg-[#1d1813]/[0.07]" style={{ width: `${w}%` }} />)}</div>
        </div>
      </div>
      {/* the margin note: Quillwork's reasoning, overlapping the sheet's right edge */}
      <motion.div aria-hidden inert className="absolute right-[-104px] top-[468px] w-[264px] rounded-[16px] bg-[#1d1813] p-3.5 text-left shadow-[inset_0_0_0_1px_rgba(243,237,227,0.1),inset_0_1px_0_rgba(243,237,227,0.08),0_0_0_1px_rgba(0,0,0,0.5),0_18px_40px_-14px_rgba(0,0,0,0.7)]"
        initial={still ? false : { opacity: 0, x: 12, filter: 'blur(4px)' }} animate={note ? { opacity: 1, x: 0, filter: 'blur(0px)' } : undefined} transition={{ duration: 0.55, ease }}>
        <div className="flex items-center gap-2 text-[12.5px]"><span className="size-1.5 rounded-full bg-[var(--ember)]" /><span className="font-[500] text-[var(--ink)]">Quillwork</span><span className="text-[var(--soft)]">suggested an edit</span></div>
        <p className="mt-2 text-[13.5px] leading-[20px] text-[#e7dfd2]">Matches your 2025 vendor precedent, clause 7.2. Carves out confidentiality, as legal asked in the review notes.</p>
        <div className="mt-3 flex items-center gap-2">
          <button type="button" className="flex h-7 items-center gap-1.5 rounded-[8px] bg-[var(--ink)] px-2.5 text-[12.5px] font-[600] leading-none text-[var(--paper-ink)]"><Check size={13} strokeWidth={2.5} className="translate-y-[1.3px]" />Accept</button>
          <button type="button" className="flex h-7 items-center gap-1.5 rounded-[8px] px-2.5 text-[12.5px] leading-none text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line-2)]"><X size={13} strokeWidth={2} className="translate-y-[1.2px]" />Reject</button>
        </div>
      </motion.div>
    </div>
  )
}
