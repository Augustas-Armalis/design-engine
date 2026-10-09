import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MEETINGS, REPLIES, WEEKS } from '../data'
import { Card } from '../ui'

const W = 640, H = 324, PAD_L = 36, PAD_R = 32, PAD_T = 12, PAD_B = 28
const RMAX = 300, MMAX = 12
const cw = (W - PAD_L - PAD_R) / WEEKS.length
const cx = (i: number) => PAD_L + cw * i + cw / 2
const ry = (v: number) => PAD_T + (H - PAD_T - PAD_B) * (1 - v / RMAX)
const my = (v: number) => PAD_T + (H - PAD_T - PAD_B) * (1 - v / MMAX)

function smooth(pts: number[][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
  }
  return d
}
const line = smooth(REPLIES.map((v, i) => [cx(i), ry(v)]))

export default function Chart() {
  const [hover, setHover] = useState<number | null>(null)
  const i = hover ?? WEEKS.length - 1
  return (
    <Card title="Replies and meetings" sub="Weekly, last six weeks · sample data"
      action={
        <div className="flex items-center gap-5">
          <div className="leading-none"><div className="flex items-center gap-1.5 label-xs text-text-sub"><span className="h-0.5 w-3 rounded-full bg-primary" />Replies</div><div className="tnum mt-1.5 label-md text-text-strong">720</div></div>
          <div className="leading-none"><div className="flex items-center gap-1.5 label-xs text-text-sub"><span className="size-2 rounded-[2px] bg-[#c2d6ff]" />Meetings</div><div className="tnum mt-1.5 label-md text-text-strong">27</div></div>
        </div>
      }>
      <div className="relative" onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Weekly replies and meetings, last six weeks (sample)">
          <defs><linearGradient id="ar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#335cff" stopOpacity="0.14" /><stop offset="1" stopColor="#335cff" stopOpacity="0" /></linearGradient></defs>
          {[0, 75, 150, 225, 300].map((v) => (
            <g key={v}>
              <line x1={PAD_L} x2={W - PAD_R} y1={ry(v)} y2={ry(v)} stroke="#ebebeb" strokeDasharray={v ? '3 4' : undefined} />
              <text x={PAD_L - 10} y={ry(v) + 4} textAnchor="end" className="tnum fill-[#737373] text-[11px]">{v}</text>
              <text x={W - PAD_R + 10} y={ry(v) + 4} className="tnum fill-[#737373] text-[11px]">{(v / RMAX) * MMAX}</text>
            </g>
          ))}
          {hover != null && <rect x={cx(i) - cw / 2 + 6} y={PAD_T} width={cw - 12} height={H - PAD_T - PAD_B} rx={8} fill="#f7f7f7" />}
          {MEETINGS.map((m, k) => (
            <rect key={k} x={cx(k) - 11} y={my(m)} width={22} height={H - PAD_B - my(m)} rx={5} fill={k === i ? '#335cff' : '#c2d6ff'} opacity={k === i ? 0.9 : 1}
              style={{ transition: 'fill 150ms cubic-bezier(.25,1,.5,1)' }} />
          ))}
          <path d={`${line} L${cx(WEEKS.length - 1)} ${H - PAD_B} L${cx(0)} ${H - PAD_B} Z`} fill="url(#ar)" />
          <path d={line} fill="none" stroke="#335cff" strokeWidth={2} strokeLinecap="round" />
          <circle cx={cx(i)} cy={ry(REPLIES[i])} r={4.5} fill="#fff" stroke="#335cff" strokeWidth={2} />
          {WEEKS.map((w, k) => <text key={w} x={cx(k)} y={H - 8} textAnchor="middle" className={`text-[11px] ${k === i ? 'fill-[#171717]' : 'fill-[#737373]'}`}>{w}</text>)}
          {WEEKS.map((_, k) => <rect key={k} x={cx(k) - cw / 2} y={0} width={cw} height={H} fill="transparent" onMouseEnter={() => setHover(k)} />)}
        </svg>
        <AnimatePresence>
          <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-none absolute top-0 w-[148px] rounded-[12px] bg-white p-3 shadow-[var(--ring),var(--shadow-md)]"
            style={{ left: `calc(${(cx(i) / W) * 100}% ${i > 3 ? '- 160px' : '+ 16px'})` }}>
            <div className="label-xs text-text-sub">Week of {WEEKS[i]}</div>
            <div className="mt-2 flex items-center leading-none"><span className="para-xs text-text-sub">Replies</span><span className="tnum ml-auto label-sm text-text-strong">{REPLIES[i]}</span></div>
            <div className="mt-1.5 flex items-center leading-none"><span className="para-xs text-text-sub">Meetings</span><span className="tnum ml-auto label-sm text-text-strong">{MEETINGS[i]}</span></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
