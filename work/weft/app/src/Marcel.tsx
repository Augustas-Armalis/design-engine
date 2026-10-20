// Weft component post in Marcel Kargul's dark tactile grammar (system/product-ui/kargul-tokens.json "dark.tactile";
// his X component posts: one component at ~40% of a square, a soft light streak, one item caught mid-drag).
// Square 1000x1000, export at 2x. Sample content.
import { motion, MotionConfig } from 'motion/react'
import { Maximize2, Search, Sparkles, PenLine, ScanText, UserCheck, Users, CreditCard, PackageCheck, LayoutGrid, ChevronRight, GripVertical } from 'lucide-react'
import { Grain } from './Hero'

const ease = [0.16, 1, 0.3, 1] as const
type Row = { icon: typeof Search; label: string; tone: string; ai?: boolean; lifted?: boolean }
const SECTIONS: { title: string; rows: Row[] }[] = [
  { title: 'AI', rows: [
    { icon: Sparkles, label: 'Classify intent', tone: '#a78bfa', ai: true },
    { icon: PenLine, label: 'Draft a reply', tone: '#c4b5fd', ai: true },
    { icon: ScanText, label: 'Extract fields', tone: '#8b9cff', ai: true },
  ] },
  { title: 'People', rows: [
    { icon: UserCheck, label: 'Ask for approval', tone: '#60a5fa', lifted: true },
    { icon: Users, label: 'Assign to teammate', tone: '#38bdf8' },
  ] },
  { title: 'Actions', rows: [
    { icon: CreditCard, label: 'Issue refund', tone: '#34d399' },
    { icon: PackageCheck, label: 'Update order', tone: '#fbbf24' },
  ] },
]

function Cursor() {
  // closed-hand grab cursor
  return (
    <svg width="30" height="30" viewBox="0 0 26 26" aria-hidden style={{ filter: 'drop-shadow(0 2px 4px rgb(0 0 0 / 0.5))' }}>
      <path d="M7.5 10.2V9c0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7v-.6c0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7v.6c0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7v1c0-.9.8-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6v5.2c0 3.6-2.9 6.5-6.5 6.5h-1.4c-1.9 0-3.6-.9-4.8-2.4l-2.7-3.5c-.6-.8-.5-1.9.3-2.5.7-.6 1.8-.5 2.4.2l.5.6v-3.6Z" fill="#fff" stroke="#0c0c0f" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

const RowView = ({ r, ghost = false }: { r: Row; ghost?: boolean }) => (
  <div className="flex h-11 items-center gap-3 px-3">
    <r.icon size={19} strokeWidth={1.8} style={{ color: r.tone, opacity: ghost ? 0.35 : 1 }} />
    <span className={`text-[16px] font-[500] tracking-[-0.01em] ${ghost ? 'text-white/25' : 'text-white/90'}`}>{r.label}</span>
    {r.ai && !ghost && <span className="ml-auto rounded-[6px] bg-[rgb(139_92_246/0.14)] px-1.5 py-0.5 text-[11px] font-[600] tracking-[0.02em] text-[#b9a6ff] shadow-[inset_0_0_0_1px_rgb(167_139_250/0.2)]">AI</span>}
  </div>
)

export default function Marcel() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-hidden bg-[#0c0c0f]" style={{ width: 1000, height: 1000, fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"' }}>
        {/* light streak from the top left, and a faint floor */}
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(128deg, rgb(255 255 255 / 0.15) 0%, rgb(255 255 255 / 0.05) 20%, transparent 42%), radial-gradient(60% 40% at 50% 100%, rgb(80 22 255 / 0.10), transparent 70%)' }} />
        <Grain o={0.35} id="mg" />

        <motion.section aria-label="Add a step, sample content" className="absolute left-1/2 top-[118px] w-[420px] -translate-x-1/2 rounded-[22px] bg-[#141417]"
          style={{ boxShadow: '0 0 0 1px #050506, inset 0 1px 0 rgb(255 255 255 / 0.07), inset 0 0 0 1px rgb(255 255 255 / 0.04), 0 40px 80px -24px rgb(0 0 0 / 0.8)', backgroundImage: 'linear-gradient(140deg, rgb(255 255 255 / 0.05), transparent 30%)' }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
          <div className="flex h-[68px] items-center justify-between px-6 shadow-[inset_0_-1px_0_rgb(255_255_255/0.06)]">
            <span className="text-[19px] font-[550] tracking-[-0.015em] text-white">Add a step</span>
            <Maximize2 size={17} className="text-white/45" />
          </div>
          <div className="px-5 pt-5">
            <div className="flex h-11 items-center gap-2.5 rounded-[12px] bg-white/[0.03] px-3.5 text-[15px] text-white/40 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
              <Search size={16} />Search steps<span className="ml-auto rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 text-[11.5px] text-white/45">⌘K</span>
            </div>
          </div>
          <div className="px-3 pb-3 pt-2">
            {SECTIONS.map((s) => (
              <div key={s.title} className="pt-4">
                <div className="px-3 pb-1.5 text-[12.5px] font-[500] uppercase tracking-[0.06em] text-white/40">{s.title}</div>
                {s.rows.map((r) => r.lifted
                  ? <div key={r.label} className="rounded-[12px] bg-white/[0.02] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)]"><RowView r={r} ghost /></div>
                  : <RowView key={r.label} r={r} />)}
              </div>
            ))}
          </div>
          <div className="flex h-[60px] items-center gap-3 px-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
            <LayoutGrid size={18} className="text-white/55" />
            <span className="text-[16px] font-[500] text-white/85">Browse templates</span>
            <ChevronRight size={18} className="ml-auto text-white/40" />
          </div>
        </motion.section>

        {/* the lifted row, mid-drag, out past the card edge */}
        <motion.div className="absolute flex h-[52px] w-[372px] items-center gap-3 rounded-[14px] px-4"
          style={{ left: 352, top: 500, background: 'linear-gradient(180deg, #27272e, #1b1b20)', boxShadow: '0 0 0 1px #050506, inset 0 1px 0 rgb(255 255 255 / 0.10), inset 0 0 0 1px rgb(255 255 255 / 0.05), 0 24px 48px -12px rgb(0 0 0 / 0.75), 0 8px 16px -8px rgb(0 0 0 / 0.6)', rotate: -1.5 }}
          initial={{ opacity: 0, x: -60, y: 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6, duration: 1.1, ease }}>
          <UserCheck size={20} strokeWidth={1.8} style={{ color: '#60a5fa' }} />
          <span className="text-[17px] font-[550] tracking-[-0.01em] text-white">Ask for approval</span>
          <GripVertical size={18} className="ml-auto text-white/45" />
        </motion.div>
        <motion.div className="pointer-events-none absolute" style={{ left: 654, top: 528 }} initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 1.1, ease }}>
          <Cursor />
        </motion.div>
      </div>
    </MotionConfig>
  )
}
