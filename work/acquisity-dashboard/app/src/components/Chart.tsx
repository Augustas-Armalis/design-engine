// Replies over six weeks: one accent (line + soft meeting bars), dashed grid, crosshair tooltip. No card: it is a page section.
import { useState } from 'react'
import { motion } from 'motion/react'
import { RiArrowDownSLine, RiInformationLine } from '@remixicon/react'
import { MEETINGS, REPLIES, WEEKS } from '../data'
import { Change, SectionHead } from '../ui'

const W = 760, H = 260, L = 8, R = 48, T = 16, B = 30
const RMAX = 300, MMAX = 12
const cw = (W - L - R) / WEEKS.length
const cx = (i: number) => L + cw * i + cw / 2
const ry = (v: number) => T + (H - T - B) * (1 - v / RMAX)
const my = (v: number) => T + (H - T - B) * (1 - v / MMAX)
function smooth(p: number[][]) {
  let d = `M${p[0][0]} ${p[0][1]}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c
    d += ` C${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`
  }
  return d
}
const line = smooth(REPLIES.map((v, i) => [cx(i), ry(v)]))

export default function Chart() {
  const [hover, setHover] = useState<number | null>(null)
  const i = hover ?? WEEKS.length - 1
  return (
    <section aria-label="Replies and meetings (sample)">
      <SectionHead title={<span className="inline-flex items-center gap-1.5">Replies and meetings<RiInformationLine size={16} className="text-text-disabled" /></span>}>
        <button type="button" className="press flex h-9 items-center gap-1.5 rounded-[10px] bg-white px-3 label-sm leading-none text-text-sub shadow-[var(--ring),var(--shadow-xs)] hover:bg-bg-weak">Weekly<RiArrowDownSLine size={16} /></button>
      </SectionHead>
      <div className="mt-2 flex items-baseline gap-2"><span className="num-lg text-text-strong">720</span><span className="para-sm text-text-sub">replies</span><Change v="+14.6%" up ctx="vs last 30 days" /></div>
      <div className="relative mt-5" onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Weekly replies and meetings, last six weeks (sample)">
          <defs><linearGradient id="ar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#335cff" stopOpacity="0.10" /><stop offset="1" stopColor="#335cff" stopOpacity="0" /></linearGradient></defs>
          {[0, 75, 150, 225, 300].map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={ry(v)} y2={ry(v)} stroke="#e1e4ea" strokeDasharray="2 4" />
              <text x={W - R + 12} y={ry(v) + 4} className="tnum fill-[#737373] text-[11px]">{v}</text>
            </g>
          ))}
          {WEEKS.map((_, k) => <line key={k} x1={cx(k)} x2={cx(k)} y1={T} y2={H - B} stroke={k === i ? '#d1d5db' : '#f2f3f5'} strokeDasharray={k === i ? '3 3' : undefined} />)}
          {MEETINGS.map((m, k) => <rect key={k} x={cx(k) - 14} y={my(m)} width={28} height={H - B - my(m)} rx={6} fill="#335cff" fillOpacity={k === i ? 0.22 : 0.1} style={{ transition: 'fill-opacity 150ms cubic-bezier(.25,1,.5,1)' }} />)}
          <path d={`${line} L${cx(WEEKS.length - 1)} ${H - B} L${cx(0)} ${H - B} Z`} fill="url(#ar)" />
          <path d={line} fill="none" stroke="#335cff" strokeWidth={2} strokeLinecap="round" />
          <circle cx={cx(i)} cy={ry(REPLIES[i])} r={5} fill="#335cff" stroke="#fff" strokeWidth={2.5} />
          {WEEKS.map((w, k) => <text key={w} x={cx(k)} y={H - 8} textAnchor="middle" className={`text-[12px] ${k === i ? 'fill-[#171717]' : 'fill-[#737373]'}`}>{w}</text>)}
          {WEEKS.map((_, k) => <rect key={k} x={cx(k) - cw / 2} y={0} width={cw} height={H} fill="transparent" onMouseEnter={() => setHover(k)} />)}
        </svg>
        <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="pointer-events-none absolute w-[168px] rounded-[12px] bg-white p-3 shadow-[var(--ring),var(--shadow-md)]"
          style={{ left: `calc(${(cx(i) / W) * 100}% ${i > 3 ? '- 184px' : '+ 16px'})`, top: ry(REPLIES[i]) / H < 0.45 ? `calc(${(ry(REPLIES[i]) / H) * 100}% + 14px)` : 0 }}>
          <div className="para-xs text-text-sub">Week of {WEEKS[i]}</div>
          <div className="mt-1.5 flex items-baseline gap-1.5"><span className="num-md text-text-strong">{REPLIES[i]}</span><span className="para-xs text-text-sub">replies</span></div>
          <div className="mt-1 para-xs text-text-sub"><span className="tnum text-text-strong">{MEETINGS[i]}</span> meetings booked</div>
        </motion.div>
      </div>
      <div className="mt-3 flex items-center gap-5 para-xs text-text-sub">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-primary" />Replies</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-[3px] bg-primary/15" />Meetings booked</span>
        <span className="ml-auto text-text-soft">Sample data</span>
      </div>
    </section>
  )
}
