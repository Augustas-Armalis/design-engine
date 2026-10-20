// Replica 1: AlignUI "Transactions" (knowledge/benchmarks/alignui-dashboards/finance-1.png, 1600x1200), rebuilt to its
// geometry with our own brand and data. Own touch: Harbor's deep green accent instead of AlignUI blue, money in and out
// coloured by direction, and an "On hold" status on one transfer. Fictional data (sample).
import type { ReactNode } from 'react'
import {
  RiLayoutGridLine, RiBankCardLine, RiArrowLeftRightLine, RiHistoryLine, RiFileList3Line, RiExchangeDollarLine, RiSettings3Line,
  RiHeadphoneLine, RiSearch2Line, RiNotification3Line, RiShareBoxLine, RiAddLine, RiArrowDownSLine, RiDownload2Line, RiFilter3Line,
  RiSortDesc, RiExpandUpDownLine, RiMore2Fill, RiGlobalLine, RiArrowRightUpLine, RiBankLine, RiLineChartLine,
  RiBuilding2Line, RiComputerLine, RiFlashlightLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowLeftDoubleLine, RiArrowRightDoubleLine, RiVerifiedBadgeFill,
} from '@remixicon/react'

const C = { ink: '#0e121b', sub: '#525866', soft: '#717784', line: '#ebebeb', weak: '#f5f7fa', accent: '#0d7a55', accentHover: '#0a6747' }
const ring = `0 0 0 1px ${C.line}`
const btn = `0 0 0 1px ${C.line}, 0 1px 2px rgb(10 13 20 / 0.03)`

const Face = ({ n, hue }: { n: string; hue: number }) => (
  <span className="grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-[500]" style={{ background: `oklch(0.94 0.035 ${hue})`, color: `oklch(0.42 0.09 ${hue})` }}>{n.split(' ').map((w) => w[0]).join('')}</span>
)
const IconDot = ({ icon: I }: { icon: typeof RiLineChartLine }) => (
  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white" style={{ boxShadow: ring, color: C.sub }}><I size={16} /></span>
)
const Btn = ({ children, primary = false, h = 36 }: { children: ReactNode; primary?: boolean; h?: number }) => (
  <span className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 text-[14px] font-[500]"
    style={primary ? { height: h, background: C.accent, color: '#fff', boxShadow: `0 0 0 1px ${C.accentHover}, inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 2px rgb(14 18 27 / 0.24)` } : { height: h, background: '#fff', color: C.sub, boxShadow: btn }}>{children}</span>
)
const Check = () => <span className="size-4 shrink-0 rounded-[4px] bg-white" style={{ boxShadow: `inset 0 0 0 1px #d1d5db` }} />

const NAV: [typeof RiLayoutGridLine, string, boolean?][] = [[RiLayoutGridLine, 'Dashboard'], [RiBankCardLine, 'My Cards'], [RiArrowLeftRightLine, 'Transfer'], [RiHistoryLine, 'Transactions', true], [RiFileList3Line, 'Payments'], [RiExchangeDollarLine, 'Exchange']]
type Row = { who: ReactNode; name: string; amount: string; in: boolean; account: string; date: string; method: [typeof RiGlobalLine, string]; hold?: boolean }
const ROWS: Row[] = [
  { who: <IconDot icon={RiBuilding2Line} />, name: 'Northwind, invoice 1042', amount: '+$4,800.00', in: true, account: 'Operating', date: '14 Oct, 09:12', method: [RiGlobalLine, 'Wire'] },
  { who: <Face n="Lena Park" hue={25} />, name: 'Lena Park', amount: '−$1,250.00', in: false, account: 'Payroll', date: '14 Oct, 08:40', method: [RiArrowRightUpLine, 'Money Transfer'] },
  { who: <IconDot icon={RiLineChartLine} />, name: 'Treasury yield', amount: '+$312.18', in: true, account: 'Reserve', date: '13 Oct, 23:59', method: [RiBankLine, 'ACH'] },
  { who: <Face n="Ravi Mehta" hue={150} />, name: 'Ravi Mehta', amount: '+$650.00', in: true, account: 'Operating', date: '13 Oct, 16:05', method: [RiBankLine, 'ACH'], hold: true },
  { who: <IconDot icon={RiComputerLine} />, name: 'Studio hardware', amount: '−$2,399.00', in: false, account: 'Operating', date: '12 Oct, 11:30', method: [RiBankCardLine, 'Card ·· 4821'] },
  { who: <Face n="Emma Wright" hue={250} />, name: 'Emma Wright', amount: '−$86.40', in: false, account: 'Expenses', date: '12 Oct, 10:02', method: [RiGlobalLine, 'Wire'] },
  { who: <IconDot icon={RiFlashlightLine} />, name: 'Office power, Kreuzberg', amount: '−$163.75', in: false, account: 'Expenses', date: '11 Oct, 07:15', method: [RiBankLine, 'ACH'] },
  { who: <Face n="Matteo Rossi" hue={300} />, name: 'Matteo Rossi', amount: '−$45.00', in: false, account: 'Expenses', date: '10 Oct, 19:48', method: [RiArrowRightUpLine, 'Money Transfer'] },
]
const COLS = 'grid grid-cols-[36px_minmax(0,300px)_148px_188px_188px_1fr_32px] items-center'

export default function Finance() {
  return (
    <div className="relative" style={{ width: 1600, height: 1200, background: '#e8e8e8', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div data-subject className="absolute flex overflow-hidden rounded-[44px] bg-white" style={{ left: 76, top: 146, width: 1448, height: 908, boxShadow: '0 0 0 1px rgb(14 18 27 / 0.04), 0 16px 40px -16px rgb(14 18 27 / 0.12)' }}>
        {/* sidebar */}
        <aside className="flex w-[276px] shrink-0 flex-col px-6 pb-6 pt-7" style={{ boxShadow: `inset -1px 0 0 ${C.line}` }}>
          <div className="flex items-center gap-3 pb-6" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: `linear-gradient(140deg, #19a476, ${C.accent})`, boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.25)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M4 13.5c2.2-1.6 4.4-1.6 6 0s3.8 1.6 6 0M4 9c2.2-1.6 4.4-1.6 6 0s3.8 1.6 6 0" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </span>
            <div className="min-w-0 flex-1 leading-tight"><div className="text-[14px] font-[500]">Harbor</div><div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>Treasury & Banking</div></div>
            <span className="grid size-6 place-items-center rounded-[6px] bg-white" style={{ boxShadow: btn, color: C.sub }}><RiExpandUpDownLine size={16} /></span>
          </div>
          <div className="pt-6 text-[12px] font-[500] uppercase tracking-[0.04em]" style={{ color: '#99a0ae' }}>Main</div>
          <nav className="mt-2 flex flex-col gap-1">
            {NAV.map(([I, l, on]) => (
              <div key={l} className="relative flex h-9 items-center gap-2 rounded-[8px] px-3 text-[14px] font-[500]" style={{ background: on ? C.weak : undefined, color: on ? C.ink : C.sub }}>
                {on && <span className="absolute -left-6 top-2 h-5 w-1 rounded-r-[4px]" style={{ background: C.accent }} />}
                <I size={20} style={{ color: on ? C.accent : C.soft }} />{l}{on && <RiArrowRightSLine size={18} className="ml-auto" style={{ color: C.soft }} />}
              </div>
            ))}
          </nav>
          <div className="pt-6 text-[12px] font-[500] uppercase tracking-[0.04em]" style={{ color: '#99a0ae' }}>Others</div>
          <nav className="mt-2 flex flex-col gap-1">
            {([[RiSettings3Line, 'Settings'], [RiHeadphoneLine, 'Support']] as const).map(([I, l]) => <div key={l} className="flex h-9 items-center gap-2 rounded-[8px] px-3 text-[14px] font-[500]" style={{ color: C.sub }}><I size={20} style={{ color: C.soft }} />{l}</div>)}
          </nav>
          <div className="mt-auto flex items-center gap-3 pt-6" style={{ boxShadow: `inset 0 1px 0 ${C.line}` }}>
            <span className="grid size-10 place-items-center rounded-full text-[14px] font-[500]" style={{ background: 'oklch(0.93 0.04 60)', color: 'oklch(0.42 0.09 60)' }}>AT</span>
            <div className="min-w-0 flex-1 leading-tight"><div className="flex items-center gap-1 text-[14px] font-[500]">Ava Torres<RiVerifiedBadgeFill size={16} style={{ color: '#47c2ff' }} /></div><div className="mt-0.5 truncate text-[12px]" style={{ color: C.sub }}>ava@harbor.finance</div></div>
            <RiArrowRightSLine size={20} style={{ color: C.soft }} />
          </div>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 px-8 pt-6">
          <div className="flex items-center gap-3.5 pb-5" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            <span className="grid size-12 place-items-center rounded-full bg-white" style={{ boxShadow: ring, color: C.sub }}><RiHistoryLine size={24} /></span>
            <div className="min-w-0 flex-1 leading-tight"><div className="text-[18px] font-[500] tracking-[-0.015em]">Transactions</div><div className="mt-1 text-[14px]" style={{ color: C.sub }}>Every payment in and out of your Harbor accounts, cleared and pending.</div></div>
            <span className="grid size-10 place-items-center" style={{ color: C.sub }}><RiSearch2Line size={20} /></span>
            <span className="relative grid size-10 place-items-center" style={{ color: C.sub }}><RiNotification3Line size={20} /><span className="absolute right-2.5 top-2.5 size-1.5 rounded-full ring-2 ring-white" style={{ background: '#fb3748' }} /></span>
            <Btn h={40}><RiShareBoxLine size={18} />Export</Btn>
            <Btn h={40} primary><RiAddLine size={18} />New Payment</Btn>
          </div>
          <div className="flex items-center gap-3 py-5" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1 text-[16px] font-[500]">All Accounts<span className="grid size-5 place-items-center rounded-full" style={{ boxShadow: ring, color: C.sub }}><RiArrowDownSLine size={14} /></span></div>
              <div className="mt-1 text-[14px]" style={{ color: C.sub }}>Operating, Payroll, Reserve and Expenses · $182,406.22 available</div>
            </div>
            <Btn h={40}><RiDownload2Line size={18} />Export As</Btn>
          </div>
          {/* toolbar */}
          <div className="flex items-center gap-3 py-5">
            <div className="flex h-9 w-[318px] items-center gap-1 rounded-[10px] p-1" style={{ background: C.weak }}>
              {['All', 'Income', 'Expenses'].map((t, i) => <span key={t} className="flex h-7 flex-1 items-center justify-center rounded-[6px] text-[14px] font-[500]" style={i === 0 ? { background: '#fff', color: C.ink, boxShadow: '0 1px 3px rgb(14 18 27 / 0.12), 0 0 0 1px rgb(14 18 27 / 0.02)' } : { color: '#99a0ae' }}>{t}</span>)}
            </div>
            <div className="ml-auto flex h-9 w-[300px] items-center gap-2 rounded-[10px] bg-white px-2.5 text-[14px]" style={{ boxShadow: btn, color: '#99a0ae' }}><RiSearch2Line size={18} />Search transactions<span className="ml-auto rounded-[4px] px-1.5 text-[12px]" style={{ boxShadow: ring }}>⌘K</span></div>
            <Btn><RiFilter3Line size={18} />Filter</Btn>
            <Btn><RiSortDesc size={18} />Sort by<RiArrowDownSLine size={18} /></Btn>
          </div>
          {/* table */}
          <div className={`${COLS} h-9 rounded-[8px] px-3 text-[14px]`} style={{ background: C.weak, color: C.sub }}>
            <Check />{['To / From', 'Amount', 'Account', 'Date & Time', 'Status & Method'].map((h) => <span key={h} className="flex items-center gap-0.5">{h}<RiExpandUpDownLine size={16} style={{ color: '#99a0ae' }} /></span>)}<span />
          </div>
          {ROWS.map((r) => { const M = r.method[0]; return (
            <div key={r.name} className={`${COLS} h-[60px] px-3 text-[14px]`} style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
              <Check />
              <span className="flex min-w-0 items-center gap-3 font-[500]">{r.who}<span className="truncate">{r.name}</span></span>
              <span className="tabular-nums font-[500]" style={{ color: r.in ? C.accent : C.ink }}>{r.amount}</span>
              <span style={{ color: C.sub }}>{r.account}</span>
              <span className="tabular-nums" style={{ color: C.sub }}>{r.date}</span>
              <span className="flex items-center gap-3 whitespace-nowrap" style={{ color: C.sub }}>
                <span className="grid size-8 place-items-center rounded-full bg-white" style={{ boxShadow: ring }}><M size={16} /></span>{r.method[1]}
                {r.hold && <span className="flex h-6 items-center gap-1 rounded-[6px] px-2 text-[12px] font-[500]" style={{ background: '#fff3eb', color: '#c2410c' }}><span className="size-1.5 rounded-full bg-[#fa7319]" />On hold</span>}
              </span>
              <RiMore2Fill size={18} style={{ color: C.soft }} />
            </div>
          ) })}
          {/* pagination */}
          <div className="flex items-center pt-[82px] text-[14px]" style={{ color: C.sub }}>
            <span>Page 2 of 16</span>
            <div className="mx-auto flex items-center gap-2">
              <span className="grid size-8 place-items-center"><RiArrowLeftDoubleLine size={18} /></span><span className="grid size-8 place-items-center"><RiArrowLeftSLine size={18} /></span>
              {['1', '2', '3', '4', '5', '…', '16'].map((n) => <span key={n} className="grid h-8 min-w-8 place-items-center rounded-[8px] px-2 tabular-nums" style={n === '2' ? { background: C.weak, color: C.ink } : { boxShadow: btn, background: '#fff' }}>{n}</span>)}
              <span className="grid size-8 place-items-center"><RiArrowRightSLine size={18} /></span><span className="grid size-8 place-items-center"><RiArrowRightDoubleLine size={18} /></span>
            </div>
            <Btn h={32}>8 / page<RiArrowDownSLine size={18} /></Btn>
          </div>
        </main>
      </div>
    </div>
  )
}
