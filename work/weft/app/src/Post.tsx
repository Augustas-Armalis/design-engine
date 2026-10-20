// Weft post (square 1000x1000, export at 2x): the live run card, big and pin-sharp, over an out-of-focus glass field (Basit), caught mid-decision
// with the cursor on Approve. Same product pieces as the hero (sample data).
import { motion, MotionConfig } from 'motion/react'
import { Sparkles } from 'lucide-react'
import Field from './Field'
import { Approval, ease, Logo, STEPS, StepRow } from './flow'

const S = 1000

function Cursor() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden style={{ filter: 'drop-shadow(0 2px 3px rgb(0 0 0 / 0.25))' }}>
      <path d="M9 2.5c-1.2 0-2 .9-2 2v12.3l-1.7-1.6c-.9-.8-2.3-.8-3.1.1-.8.8-.8 2.1 0 3l6.2 7.2c1.2 1.5 3 2.3 5 2.3h3.8c3.5 0 6.3-2.8 6.3-6.3v-6.2c0-1.1-.9-2-2-2s-2 .9-2 2v-.8c0-1.1-.9-2-2-2s-2 .9-2 2v-.8c0-1.1-.9-2-2-2-.6 0-1.1.2-1.5.6V4.5c0-1.1-.8-2-2-2Z" fill="#fff" stroke="#0f1013" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export default function Post() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-hidden bg-[#eef0f4]" style={{ width: S, height: S }}>
        <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: ease.out, opacity: { duration: 1 } }}>
          <div className="absolute -left-[260px] -top-[100px] h-[1200px] w-[760px]" style={{ maskImage: 'linear-gradient(90deg, #000 50%, transparent 95%)' }}><Field w={760} h={1200} colors={['#6f5bff', '#ff6fae', '#4cb3ff', '#ffb36b']} blur={8} scale={1.2} rotation={100} density={1.5} frame={2400} /></div>
          <div className="absolute -right-[260px] -top-[60px] h-[1200px] w-[760px]" style={{ maskImage: 'linear-gradient(270deg, #000 50%, transparent 95%)' }}><Field w={760} h={1200} colors={['#4cb3ff', '#8a6cff', '#ff6fae', '#ffc46b']} blur={9} scale={1.2} rotation={124} density={1.5} frame={5200} /></div>
        </motion.div>
        <motion.section aria-label="Weft run card, sample data" className="absolute left-1/2 top-1/2 w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[26px] bg-white p-2 shadow-[0_0_0_1px_rgb(15_16_19/0.06),0_2px_4px_rgb(15_16_19/0.04),0_50px_100px_-30px_rgb(40_14_120/0.45)]"
          initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.3, ease: ease.out, opacity: { duration: 0.5 } }}>
          <div className="px-4 pb-3 pt-4">
            <div className="flex items-center gap-3">
              <Logo size={34} />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[17px] font-[600] tracking-[-0.015em]">Refund triage</div>
                <div className="mt-0.5 text-[13px] text-[var(--soft)]"><span className="tnum">Run #4,182</span> · started <span className="mono tnum">13:52:08</span></div>
              </div>
              <span className="flex h-7 items-center gap-1.5 rounded-full bg-[var(--wait-soft)] px-2.5 text-[12.5px] font-[600] text-[var(--wait)]"><span className="size-1.5 rounded-full bg-[var(--wait)]" />Waiting on approval</span>
            </div>
          </div>
          <div className="rounded-[18px] bg-[var(--weak)] px-4 py-2 shadow-[inset_0_0_0_1px_rgb(15_16_19/0.04)]">
            {STEPS.slice(0, 2).map((s, i) => <StepRow key={s.name} s={s} at={0.3 + i * 0.08} big />)}
            {/* what the AI step read, inline under its row */}
            <motion.div className="mb-1.5 ml-[38px] rounded-[12px] bg-white p-3 shadow-[var(--shadow-ring)]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: ease.out }}>
              <div className="flex items-center gap-1.5 text-[12px] font-[600] text-[var(--accent)]"><Sparkles size={12} strokeWidth={2.2} />Read the thread and order #A-20931</div>
              <div className="mono mt-2 grid grid-cols-[72px_1fr_auto] gap-y-1.5 text-[12.5px] leading-[16px]">
                <span className="text-[var(--mute)]">intent</span><span>refund</span><span className="flex items-center gap-2 text-[var(--accent)]"><span className="h-1 w-16 overflow-hidden rounded-full bg-[var(--accent-soft)]"><span className="block h-full w-[92%] rounded-full bg-[var(--accent)]" /></span>0.92</span>
                <span className="text-[var(--mute)]">amount</span><span>$248.00</span><span className="text-[var(--mute)]">over limit</span>
              </div>
            </motion.div>
            {STEPS.slice(2).map((s, i) => <StepRow key={s.name} s={s} at={0.5 + i * 0.08} big />)}
          </div>
          <motion.div className="mt-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease: ease.out }}>
            <Approval big hover />
          </motion.div>
        </motion.section>
        <motion.div className="pointer-events-none absolute" style={{ left: 716, top: 716 }} initial={{ opacity: 0, x: 40, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.1, duration: 1.0, ease: ease.out }}>
          <Cursor />
        </motion.div>
      </div>
    </MotionConfig>
  )
}
