// Gridline hero (1440x900), Kestrel floor (accepted): centred Title Case headline, 2-line subtitle, 44px ink + white
// buttons, the real product in a double-bezel frame 72px under the CTAs. Signature visual: the live Europe grid map
// inside the product (GridMap). AlignUI/affectUI material: hairline rings, one control shadow, soft radii 8/12/16/24.
// Fictional company and sample grid data.
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { RiFlashlightFill, RiArrowRightUpLine, RiArrowRightSLine, RiAlertFill, RiSearch2Line, RiLayoutGridLine, RiMapPin2Line, RiLineChartLine, RiFlashlightLine, RiNotification3Line, RiSettings3Line } from '@remixicon/react'
import GridMap from './GridMap'

const E = [0.16, 1, 0.3, 1] as const
const T = { nav: 0.05, h1: 0.12, sub: 0.3, cta: 0.4, frame: 0.5, map: 0.9 }
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 0.9, ease: E }}>{children}</motion.div>
)
const ink = '#171717', sub = '#5c5c5c', soft = '#a3a3a3', line = '#ececec', AMBER = '#e8890c'
const ring = `0 0 0 1px ${line}`, ctl = `0 0 0 1px ${line}, 0 1px 2px rgb(0 0 0 / 0.045)`

function Logo() {
  return (
    <span className="flex items-center gap-2 text-[20px] font-[600] tracking-[-0.03em]" style={{ color: ink }}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="1" y="1" width="22" height="22" rx="7" fill="#171717" /><path d="M6 12h3l2-4 2.5 8 2-4H18" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Gridline
    </span>
  )
}

const LINES: [string, string, number, string][] = [['FR → ES', 'Baixas–Santa Llogaia', 98, '2,940 / 3,000 MW'], ['FR → IT', 'Piossasco', 81, '2,100 / 2,600 MW'], ['NO → DE', 'NordLink', 70, '1,400 / 2,000 MW'], ['FR → GB', 'IFA', 66, '1,980 / 3,000 MW'], ['DE → PL', 'Krajnik', 52, '820 / 1,600 MW']]

function Dashboard() {
  return (
    <div className="flex h-[700px] w-[1164px] overflow-hidden rounded-[16px] bg-white" style={{ color: ink, boxShadow: ring }}>
      {/* rail */}
      <div className="flex w-[56px] shrink-0 flex-col items-center gap-1.5 pt-3.5" style={{ background: '#fafafa', boxShadow: `inset -1px 0 0 ${line}` }}>
        <span className="mb-2 grid size-8 place-items-center rounded-[9px] bg-[#171717] text-white"><RiFlashlightFill size={16} /></span>
        {[RiLayoutGridLine, RiMapPin2Line, RiLineChartLine, RiFlashlightLine, RiNotification3Line, RiSettings3Line].map((I, i) => (
          <span key={i} className="grid size-9 place-items-center rounded-[10px]" style={i === 1 ? { background: '#fff', color: ink, boxShadow: ctl } : { color: soft }}><I size={18} /></span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        {/* header */}
        <div className="flex h-[54px] items-center gap-3 px-5" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>
          <span className="text-[14px] font-[500]">Grid overview</span>
          <span className="flex h-6 items-center gap-1.5 rounded-full px-2 text-[12px] font-[500]" style={{ background: '#e9f8ef', color: '#15803d' }}><span className="size-1.5 rounded-full bg-[#22a35a]" />Live · 14:32 CET</span>
          <div className="ml-auto flex h-8 items-center rounded-[10px] p-[3px] text-[13px] font-[500]" style={{ background: '#f5f5f5' }}>
            {['Live', '24h', '7d', '30d'].map((t, i) => <span key={t} className="flex h-full items-center rounded-[7px] px-3" style={i === 0 ? { background: '#fff', boxShadow: ctl } : { color: sub }}>{t}</span>)}
          </div>
          <span className="flex h-8 w-[200px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-white px-2.5 text-[13px]" style={{ boxShadow: ctl, color: soft }}><RiSearch2Line size={15} />Search nodes<span className="ml-auto text-[11px]">⌘K</span></span>
        </div>
        <div className="flex gap-4 p-4">
          {/* map card */}
          <div className="w-[700px] shrink-0 overflow-hidden rounded-[16px] bg-white" style={{ boxShadow: ring }}>
            <div className="flex h-[52px] items-center gap-3 px-4" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>
              <span className="text-[14px] font-[500]">Cross-border flows</span><span className="text-[13px]" style={{ color: soft }}>14 nodes · 13 lines</span>
              <span className="ml-auto flex items-center gap-3 text-[12px]" style={{ color: sub }}>
                <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[#171717]" />Flow</span>
                <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full" style={{ background: AMBER }} />At limit</span>
              </span>
            </div>
            <div className="relative" style={{ background: 'radial-gradient(120% 90% at 40% 50%, #fff, #fafafa)' }}>
              <GridMap w={700} h={430} at={T.map} />
              {/* the one narrating chip: what Gridline suggests */}
              <motion.div className="absolute left-4 top-[16px] flex w-[236px] items-start gap-2.5 rounded-[14px] bg-white p-3" style={{ boxShadow: `0 0 0 1px ${line}, 0 4.5px 13px rgb(0 0 0 / 0.055)` }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.map + 1.4, duration: 0.8, ease: E }}>
                <span className="grid size-7 shrink-0 place-items-center rounded-[8px]" style={{ background: '#fff4e5', color: AMBER }}><RiAlertFill size={15} /></span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[13px] font-[500]">FR → ES at 98% of capacity</div>
                  <div className="mt-1 text-[12px] leading-[17px]" style={{ color: sub }}>Route 420 MW through Portugal before 15:00 to stay under limit.</div>
                </div>
                <span className="flex h-7 items-center rounded-[8px] bg-[#171717] px-2.5 text-[12px] font-[500] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]">Apply</span>
              </motion.div>
            </div>
          </div>
          {/* right column */}
          <div className="min-w-0 flex-1 space-y-4">
            <div className="grid grid-cols-2 rounded-[16px]" style={{ boxShadow: ring }}>
              {[['Demand', '412.6', 'GW', '+2.1% vs forecast'], ['Renewables', '58.4', '%', 'Wind 31 · Solar 19']].map(([l, v, u, d], i) => (
                <div key={l} className="px-4 py-3.5" style={{ boxShadow: i ? `inset 1px 0 0 ${line}` : undefined }}>
                  <div className="text-[12px]" style={{ color: sub }}>{l}</div>
                  <div className="mt-1 text-[24px] tracking-[-0.02em] tabular-nums">{v}<span className="ml-1 text-[13px]" style={{ color: soft }}>{u}</span></div>
                  <div className="mt-0.5 text-[12px]" style={{ color: soft }}>{d}</div>
                </div>
              ))}
            </div>
            <div className="rounded-[16px]" style={{ boxShadow: ring }}>
              <div className="flex h-[46px] items-center px-4 text-[14px] font-[500]" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>Interconnectors<span className="ml-auto text-[12px] font-[400]" style={{ color: soft }}>by load</span></div>
              {LINES.map(([code, name, pct, mw]) => (
                <div key={code} className="px-4 py-[11px]" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>
                  <div className="flex items-center text-[13px]"><span className="font-[500] tabular-nums">{code}</span><span className="ml-2 truncate" style={{ color: soft }}>{name}</span><span className="ml-auto font-[500] tabular-nums" style={{ color: pct > 95 ? AMBER : ink }}>{pct}%</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: '#f2f2f2' }}><motion.div className="h-full rounded-full" style={{ background: pct > 95 ? AMBER : '#171717', opacity: pct > 95 ? 1 : 0.75 }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: T.map + 0.3, duration: 1.2, ease: E }} /></div>
                  <div className="mt-1.5 text-[11.5px] tabular-nums" style={{ color: soft }}>{mw}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: '#f7f7f7', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: ink }}>
        {/* quiet structure: a fine dot grid between the rails, faded behind the copy */}
        <div aria-hidden className="absolute inset-y-0 left-[120px] right-[120px]" style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.07) 1px, transparent 1.3px)', backgroundSize: '20px 20px', maskImage: 'radial-gradient(60% 50% at 50% 28%, transparent 30%, #000 100%)' }} />
        {[120, 1320].map((x) => <div key={x} aria-hidden className="absolute inset-y-0 w-px" style={{ left: x, background: 'rgb(0 0 0 / 0.06)' }} />)}

        <header className="absolute inset-x-[144px] top-0 z-20 flex h-[72px] items-center">
          <Up at={T.nav}><a href="#" aria-label="Gridline home"><Logo /></a></Up>
          <Up at={T.nav + 0.04} className="absolute left-1/2 -translate-x-1/2">
            <nav aria-label="Main"><ul className="flex h-11 items-center gap-0.5 rounded-[14px] bg-white p-1 text-[14px] font-[500]" style={{ boxShadow: ctl, color: sub }}>
              {['Platform', 'Flexibility', 'Forecasts', 'Customers', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 hover:bg-[#f5f5f5] hover:text-[#171717]">{l}</a></li>)}
            </ul></nav>
          </Up>
          <Up at={T.nav + 0.08} className="ml-auto flex items-center gap-2 text-[14px] font-[500]">
            <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5" style={{ color: sub }}>Sign in</a>
            <a href="#" className="btn-ink press flex h-10 items-center rounded-[12px] px-4">Book a demo</a>
          </Up>
        </header>

        <main className="absolute inset-x-0 top-[136px] z-10 flex flex-col items-center text-center">
          <h1 className="text-[58px] font-[550] leading-[1.04] tracking-[-0.045em]">
            <Up at={T.h1}>See Every Megawatt</Up>
            <Up at={T.h1 + 0.07}>Before It Moves</Up>
          </h1>
          <Up at={T.sub} className="mt-[18px]"><p className="text-[18px] leading-[28px] tracking-[-0.01em]" style={{ color: sub }}>Gridline watches every cross-border line in Europe and tells<br />your control room which flow to move before it hits the limit.</p></Up>
          <Up at={T.cta} className="mt-8 flex items-center gap-3 text-[15px] font-[500]">
            <a href="#" className="btn-ink press flex h-11 items-center gap-1.5 rounded-[14px] px-5">Book a demo<RiArrowRightUpLine size={16} /></a>
            <a href="#" className="btn-white press flex h-11 items-center gap-1 rounded-[14px] px-5">See a live grid<RiArrowRightSLine size={16} /></a>
          </Up>
        </main>

        <motion.div data-product role="img" aria-label="Gridline dashboard: live cross-border flows across Europe with one line at its limit (sample data)"
          className="absolute left-[130px] top-[472px] z-10 rounded-[24px] p-[8px]" style={{ background: 'linear-gradient(180deg, #fff, rgb(255 255 255 / 0.6))', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.05), 0 24px 56px -24px rgb(0 0 0 / 0.16)' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.frame, duration: 1.2, ease: E, opacity: { delay: T.frame, duration: 0.5 } }}>
          <Dashboard />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px]" style={{ background: 'linear-gradient(180deg, transparent, #f7f7f7)' }} />
      </div>
    </MotionConfig>
  )
}
