// Replica 2: Marcel Kargul's Clokora overview (knowledge/benchmarks/kargul-deep/gallery/clokora-01.jpg, 1800x1294),
// rebuilt to its geometry with our own brand and data. Own touches: weekend bars take the legend's grey (the original
// draws every bar black), today's bar carries a live cap, and the unbilled dot is the only warm colour. Sample data.
import type { ReactNode } from 'react'
import { RiLayoutGridLine, RiPlayLine, RiFolderLine, RiFileTextLine, RiChat3Line, RiSettings3Line, RiArrowRightUpLine, RiArrowDownSLine, RiStopFill } from '@remixicon/react'

const C = { ink: '#141414', sub: '#6b6b6b', soft: '#8a8a8a', line: '#e9e9e9', green: '#0f8a5f', live: '#3ecf8e' }
const card = `0 0 0 1px ${C.line}`
const DAYS = [['THU', '01', 4.1], ['FRI', '02', 3.6], ['SAT', '03', 8.2, 1], ['SUN', '04', 4.3, 1], ['MON', '05', 0.7], ['TUE', '06', 0.7], ['WED', '07', 4.1], ['THU', '08', 6.1], ['FRI', '09', 8.2], ['SAT', '10', 4.1, 1], ['SUN', '11', 0.7, 1], ['MON', '12', 6.1], ['TUE', '13', 10.2], ['WED', '14', 0.7]] as const

const Kpi = ({ label, dot, value, foot }: { label: string; dot?: string; value: string; foot: ReactNode }) => (
  <div className="rounded-[8px] bg-white px-[30px] pt-[26px]" style={{ height: 166, boxShadow: card }}>
    <div className="flex items-center gap-2 text-[17px]" style={{ color: C.sub }}>{label}{dot && <span className="size-[5px] rounded-full" style={{ background: dot }} />}</div>
    <div className="mt-[10px] text-[34px] leading-[44px] tracking-[-0.03em] tabular-nums">{value}</div>
    <div className="mt-[10px] flex items-center gap-2 text-[15px]" style={{ color: C.sub }}>{foot}</div>
  </div>
)

export default function Clokora() {
  const max = 10.2
  return (
    <div className="relative overflow-hidden" style={{ width: 1800, height: 1294, background: '#2f2f2f', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div data-subject className="absolute bg-[#fcfcfc]" style={{ left: 52, top: 62, width: 1800, height: 1300 }}>
        {/* top nav */}
        <div className="relative flex h-[92px] items-center" style={{ boxShadow: `inset 0 -1px 0 ${C.line}`, marginLeft: 16 }}>
          <span className="absolute left-[39px] grid size-9 place-items-center rounded-[6px] bg-[#141414]">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><circle cx="10" cy="10" r="6.2" fill="none" stroke="#c8f169" strokeWidth="2.4" /><path d="M10 6.6V10l2.4 1.6" fill="none" stroke="#c8f169" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </span>
          <nav className="absolute left-[490px] flex items-center gap-[10px] text-[17px]" style={{ color: C.sub }}>
            {([[RiLayoutGridLine, 'Overview', true], [RiPlayLine, 'Tracker'], [RiFolderLine, 'Projects'], [RiFileTextLine, 'Invoices'], [RiChat3Line, 'Earnings'], [RiSettings3Line, 'Settings']] as const).map(([I, l, on]) => (
              <span key={l} className="flex h-[35px] items-center gap-2 rounded-[6px] px-[14px]" style={on ? { background: '#efefef', color: C.ink } : undefined}><I size={19} />{l}</span>
            ))}
          </nav>
          <span className="absolute right-[38px] grid size-[34px] place-items-center rounded-full text-[13px] font-[500]" style={{ background: 'oklch(0.9 0.04 40)', color: 'oklch(0.4 0.09 40)' }}>MK</span>
        </div>

        <div className="absolute" style={{ left: 150, top: 92, width: 1500 }}>
          {/* greeting */}
          <div className="flex items-start justify-between pt-[42px]">
            <div><div className="text-[16px]" style={{ color: C.sub }}>Tuesday, October 20</div><div className="mt-[6px] text-[30px] leading-[38px] tracking-[-0.025em]">Good morning, Maya.</div></div>
            <span className="mt-[11px] flex h-10 items-center gap-2.5 rounded-[4px] bg-[#141414] px-5 text-[17px] text-white"><RiPlayLine size={20} />Start tracking</span>
          </div>
          {/* live timer bar */}
          <div className="mt-[30px] flex h-[89px] items-center rounded-[10px] bg-[#1a1a1a] pl-[26px] pr-[20px]">
            <span className="h-[34px] w-[2px] rounded-full" style={{ background: C.live }} />
            <div className="ml-[20px] leading-tight"><div className="text-[17px] text-white">Checkout redesign review</div><div className="mt-[6px] text-[14px] text-[#9a9a9a]">Northwind · Design QA <span className="mx-1">·</span> started 09:41</div></div>
            <span className="ml-auto text-[30px] tracking-[-0.02em] tabular-nums" style={{ color: C.live }}>01:12</span>
            <span className="ml-3 text-[18px] text-[#8d8d8d] tabular-nums">/ $96.00</span>
            <span className="ml-[50px] flex h-10 items-center gap-2 rounded-[6px] bg-[#3a3a3a] px-[22px] text-[17px] text-white"><RiStopFill size={16} />Stop</span>
          </div>
          {/* KPIs */}
          <div className="mt-[36px] grid grid-cols-4 gap-[18px]">
            <Kpi label="This week" value="31.5h" foot={<><RiArrowRightUpLine size={16} style={{ color: C.green }} /><span style={{ color: C.green }}>6%</span><span className="size-[3px] rounded-full bg-[#c4c4c4]" />vs. last week</>} />
            <Kpi label="Earned" dot={C.green} value="$2,835" foot={<><RiArrowRightUpLine size={16} style={{ color: C.green }} /><span style={{ color: C.green }}>9%</span><span className="size-[3px] rounded-full bg-[#c4c4c4]" />vs. last week</>} />
            <Kpi label="Unbilled" dot="#e8742b" value="$1,410" foot="17.6h ready to invoice" />
            <Kpi label="In flight" dot="#2f7cf6" value="$3,960" foot="3 invoices awaiting" />
          </div>
          {/* activity */}
          <div className="mt-[40px] flex items-center justify-between text-[17px]">
            <div className="flex items-center gap-2.5">Activity<span className="size-[3px] rounded-full bg-[#c4c4c4]" /><span style={{ color: C.soft }}>last 14 days</span></div>
            <div className="flex items-center gap-3" style={{ color: C.sub }}><span className="size-[7px] rounded-[1px] bg-[#141414]" />Hours<span className="size-[3px] rounded-full bg-[#c4c4c4]" /><span className="size-[7px] rounded-[1px] bg-[#cfcfcf]" />Weekend</div>
          </div>
          <div className="mt-[18px] rounded-[8px] bg-white px-[30px]" style={{ height: 420, boxShadow: card }}>
            <div className="flex h-[100px] items-center" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
              <span className="text-[34px] tracking-[-0.03em] tabular-nums">55.4</span><span className="ml-3 text-[17px]" style={{ color: C.soft }}>hours <span className="mx-1.5">·</span> across 11 days</span>
              <span className="ml-auto flex h-[42px] items-center gap-2 rounded-[6px] bg-white px-4 text-[17px]" style={{ boxShadow: card }}>Last 14 days<RiArrowDownSLine size={18} /></span>
            </div>
            <div className="flex h-[320px] items-end justify-between pb-[29px] pt-[30px]">
              {DAYS.map(([d, n, h, wk], i) => (
                <div key={i} className="flex w-[80px] flex-col items-center">
                  <div className="relative w-full rounded-[2px]" style={{ height: Math.max(14, (h / max) * 205), background: wk ? '#cfcfcf' : '#141414' }}>
                    {i === 12 && <span className="absolute -top-[9px] left-1/2 h-[4px] w-[30px] -translate-x-1/2 rounded-full" style={{ background: C.live }} />}
                  </div>
                  <div className="mt-[16px] text-center text-[14px] leading-[20px]" style={{ color: '#9a9a9a' }}>{d}<br />{n}</div>
                </div>
              ))}
            </div>
          </div>
          {/* lists */}
          <div className="mt-[44px] grid grid-cols-2 gap-[30px] text-[17px]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2.5">Recent activity<span className="size-[3px] rounded-full bg-[#c4c4c4]" /><span style={{ color: C.soft }}>today & yesterday</span></span><span className="flex items-center gap-1 underline underline-offset-4" style={{ color: C.sub }}>View all<RiArrowRightUpLine size={16} /></span></div>
            <div className="flex items-center justify-between"><span>Pending invoices</span><span className="flex items-center gap-1 underline underline-offset-4" style={{ color: C.sub }}>View all<RiArrowRightUpLine size={16} /></span></div>
          </div>
          <div className="mt-[20px] grid grid-cols-2 gap-[30px]">
            <div className="flex h-[110px] items-center rounded-t-[8px] bg-white px-[30px]" style={{ boxShadow: card }}>
              <span className="h-[50px] w-[2px] rounded-full" style={{ background: C.green }} />
              <div className="ml-[24px] leading-tight"><div className="text-[19px]">Checkout redesign review</div><div className="mt-[8px] text-[16px]" style={{ color: C.sub }}>Design QA <span className="mx-1">·</span> 08:15 <span className="mx-1">·</span> 09:41</div></div>
              <span className="ml-auto text-[19px] tabular-nums">1:26</span><span className="ml-[60px] text-[19px] tabular-nums" style={{ color: C.green }}>$114.00</span>
            </div>
            <div className="flex h-[110px] items-center rounded-t-[8px] bg-white px-[30px]" style={{ boxShadow: card }}>
              <div className="leading-tight"><div className="text-[14px]" style={{ color: C.soft }}>#INV-058</div><div className="mt-[8px] text-[19px]">Northwind / Checkout</div></div>
              <div className="ml-auto text-right leading-tight"><div className="text-[24px] tabular-nums" style={{ color: C.green }}>$2,280.00</div><div className="mt-[8px] text-[16px]" style={{ color: C.sub }}>19 hours</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
