// Arcwise product: a revenue dashboard that answers questions. One story clock: the ARR line draws, then a question is asked
// (in the floating Ask bar outside the window); the August band lights up with a pin and the answer card fills.
// Sample data, fictional companies.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChartLine, ChartPolar, Gear, House, Lightning, MagnifyingGlass, Sparkle, Stack, Target, Users } from '@phosphor-icons/react'
import { RollingNumber } from './kit'

const ease = [0.22, 1, 0.36, 1] as const
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const ARR = [3.62, 3.71, 3.8, 3.86, 3.95, 4.03, 4.12, 4.2, 4.31, 4.42, 4.66, 4.82] // $M, sample
const ACCOUNTS = [
  { name: 'Northbeam Freight', v: 42 }, { name: 'Cartwheel Logistics', v: 31 }, { name: 'Tidewater Freight', v: 27 }, { name: 'Harbourline', v: 19 },
]
export const ANSWER = 'August expansion came from 14 logistics accounts moving to the Scale plan. They drove 61% of Q3 growth.'

const LO = 3.4, HI = 5.0
const px = (i: number) => (i / (ARR.length - 1)) * 100
const py = (v: number) => 100 - ((v - LO) / (HI - LO)) * 100
const line = ARR.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(2)},${py(v).toFixed(2)}`).join('')

/** phase: 0 build, 1 asked (typing), 2 answered */
export default function Dash({ intro, phase }: { intro: number; phase: number }) {
  const still = useReducedMotion()
  const b = (d: number) => (still ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: intro + d, duration: 0.5, ease } })
  const [n, setN] = useState(still ? ANSWER.length : 0)
  useEffect(() => {
    if (still || phase < 2) return
    const t0 = performance.now()
    const id = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / 1300); setN(Math.round(k * ANSWER.length)); if (k >= 1) clearInterval(id) }, 24)
    return () => clearInterval(id)
  }, [phase, still])
  const KPI = [
    { l: 'ARR', v: '$4.82M', d: '+24.1%' }, { l: 'Net revenue retention', v: '118%', d: '+4 pts' },
    { l: 'Expansion (Q3)', v: '$312K', d: '+61%' }, { l: 'Logo churn', v: '1.9%', d: '−0.3 pts' },
  ]
  return (
    <div className="flex h-full bg-[var(--s1)] text-[13px]">
      <motion.div {...b(0)} className="flex w-[60px] shrink-0 flex-col items-center gap-1.5 border-r border-[var(--line)] py-4">
        <span className="mb-3 grid size-8 place-items-center rounded-[9px] bg-[var(--accent-deep)] shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]"><ChartPolar size={17} weight="fill" className="text-white" /></span>
        {[House, ChartLine, Users, Target, Stack, Lightning].map((I, i) => (
          <span key={i} className={`grid size-9 place-items-center rounded-[9px] ${i === 1 ? 'bg-[rgb(243_245_250/0.07)] text-[var(--ink)]' : 'text-[var(--soft)]'}`}><I size={18} weight={i === 1 ? 'fill' : 'regular'} /></span>
        ))}
        <span className="mt-auto grid size-9 place-items-center text-[var(--soft)]"><Gear size={18} /></span>
      </motion.div>
      <div className="min-w-0 flex-1 p-5">
        <motion.div {...b(0.05)} className="flex h-9 items-center gap-3">
          <span className="font-[family-name:var(--font-display)] text-[17px] font-[600] tracking-[-0.02em]">Revenue</span>
          <span className="text-[var(--soft)]">· All segments</span>
          <div className="ml-auto flex h-8 items-center gap-0.5 rounded-full bg-[rgb(243_245_250/0.04)] p-0.5 shadow-[inset_0_0_0_1px_var(--line)]">
            {['30d', '90d', '12m'].map((p) => <span key={p} className={`flex h-7 w-11 items-center justify-center rounded-full text-[12px] ${p === '12m' ? 'bg-[rgb(243_245_250/0.09)] text-[var(--ink)] shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]' : 'text-[var(--sub)]'}`}>{p}</span>)}
          </div>
          <span className="flex h-8 items-center gap-2 rounded-full px-3 text-[12px] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line)]"><MagnifyingGlass size={13} />Search accounts</span>
        </motion.div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {KPI.map((k, i) => (
            <motion.div key={k.l} {...b(0.1 + i * 0.06)} className="rounded-[12px] bg-[var(--s2)] px-4 py-3 shadow-[inset_0_0_0_1px_var(--line),inset_0_1px_0_rgb(255_255_255/0.04)]">
              <div className="text-[12px] text-[var(--sub)]">{k.l}</div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-display)] text-[22px] font-[600] tracking-[-0.02em]"><RollingNumber value={k.v} at={intro + 0.2 + i * 0.06} /></span>
                <span className="font-mono text-[11px] text-[var(--ok)]">{k.d}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_330px] gap-3">
          <motion.div {...b(0.35)} className="rounded-[12px] bg-[var(--s2)] p-4 shadow-[inset_0_0_0_1px_var(--line),inset_0_1px_0_rgb(255_255_255/0.04)]">
            <div className="flex items-center gap-2"><span className="font-[550]">ARR over time</span><span className="text-[var(--soft)]">· sample</span>
              <span className="ml-auto flex items-center gap-3 text-[11px] text-[var(--sub)]"><span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[var(--accent)]" />ARR</span><span className="flex items-center gap-1.5"><span className="w-3 border-t border-dashed border-[var(--soft)]" />Plan</span></span>
            </div>
            <div className="relative mt-4 h-[200px]">
              {[0, 25, 50, 75, 100].map((g) => <div key={g} className="absolute inset-x-0 border-t border-[rgb(243_245_250/0.05)]" style={{ top: `${g}%` }} />)}
              {/* August band: lights up when the answer lands */}
              <motion.div initial={false} animate={{ opacity: phase >= 2 ? 1 : 0 }} transition={{ duration: 0.5, ease }}
                className="absolute inset-y-0 rounded-[6px] bg-[linear-gradient(180deg,rgb(140_155_255/0.18),rgb(140_155_255/0.03))] shadow-[inset_0_0_0_1px_rgb(140_155_255/0.22)]" style={{ left: `${px(9.5)}%`, width: `${px(1)}%` }} />
              {/* the line draws left to right with a clip reveal (pathLength miscounts on a stretched, non-scaling-stroke SVG) */}
              <motion.div className="absolute inset-0" initial={still ? false : { clipPath: 'inset(-10% 100% -10% 0)' }} animate={{ clipPath: 'inset(-10% 0% -10% 0)' }}
                transition={{ delay: intro + 0.45, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
                <defs><linearGradient id="aw-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8c9bff" stopOpacity="0.22" /><stop offset="1" stopColor="#8c9bff" stopOpacity="0" /></linearGradient></defs>
                <path d={`${line}L100,100L0,100Z`} fill="url(#aw-fill)" />
                <path d="M0,58 L100,22" stroke="#6b717e" strokeWidth="1" strokeDasharray="3 4" fill="none" vectorEffect="non-scaling-stroke" />
                <path d={line} stroke="#8c9bff" strokeWidth="2" fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              </motion.div>
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease }}
                    className="absolute -translate-x-[88%] -translate-y-full whitespace-nowrap rounded-[8px] bg-[var(--s3)] px-2 py-1 font-mono text-[11px] text-[var(--ink)] shadow-[0_0_0_1px_var(--line-2),0_8px_16px_-6px_rgb(0_0_0/0.6)]"
                    style={{ left: `${px(10)}%`, top: `calc(${py(ARR[10])}% - 10px)` }}>+$184K expansion</motion.div>
                )}
              </AnimatePresence>
              <span className="absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--s2)] bg-[var(--accent)]" style={{ left: `${px(11)}%`, top: `${py(ARR[11])}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10.5px] text-[var(--soft)]">{MONTHS.map((m) => <span key={m}>{m}</span>)}</div>
          </motion.div>
          <motion.div {...b(0.42)} className="flex flex-col rounded-[12px] bg-[var(--s2)] p-4 shadow-[inset_0_0_0_1px_var(--line),inset_0_1px_0_rgb(255_255_255/0.04)]">
            <div className="flex items-center gap-2"><Sparkle size={15} weight="fill" className="text-[var(--accent)]" /><span className="font-[550]">Ask Arcwise</span></div>
            {phase >= 2 ? (
              <>
                <p className="mt-3 min-h-[60px] leading-[20px] text-[#d9dce4]">{ANSWER.slice(0, n)}{n < ANSWER.length && <span className="ml-px inline-block h-[13px] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--accent)]" />}</p>
                <div className="mt-3 space-y-2">
                  {ACCOUNTS.map((a, i) => (
                    <motion.div key={a.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease }} className="flex items-center gap-2 text-[12px]">
                      <span className="w-[128px] truncate text-[var(--ink)]">{a.name}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgb(243_245_250/0.06)]"><motion.span className="block h-full rounded-full bg-[var(--accent)]" initial={{ width: 0 }} animate={{ width: `${(a.v / 42) * 100}%` }} transition={{ delay: 1 + i * 0.08, duration: 0.7, ease }} /></span>
                      <span className="w-12 text-right font-mono text-[11px] text-[var(--sub)]">+${a.v}K</span>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-3 text-[var(--soft)]">{phase === 1 ? 'Reading 12 months of invoices…' : 'Ask why any number moved.'}</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
