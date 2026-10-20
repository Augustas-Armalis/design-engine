// Gridline product, rebuilt in the AlignUI grammar (knowledge/benchmarks/alignui-dashboards/hr-1.png): a labelled
// sidebar with favourites and user, an icon-circle page header with subline and actions, tabs with icons and counts,
// and card-in-card corridor cards whose tinted status strip states the decision. Kargul micro-tokens for edges and
// shadows. Separate components so each can be posted or reused. Sample data.
import type { ReactNode } from 'react'
import {
  RiFlashlightFill, RiExpandUpDownLine, RiLayoutGridLine, RiMapPin2Line, RiArrowLeftRightLine, RiLineChartLine, RiAlarmWarningLine, RiFileChartLine,
  RiSettings3Line, RiHeadphoneLine, RiArrowRightSLine, RiSearch2Line, RiNotification3Line, RiDownload2Line, RiAddLine, RiVerifiedBadgeFill,
  RiAlertFill, RiArrowUpLine, RiCheckboxCircleFill, RiToolsLine, RiCalendarLine, RiArrowDownSLine, RiEqualizer2Line,
} from '@remixicon/react'
import GridMap from './GridMap'

export const C = { ink: '#171717', sub: '#5c5c5c', soft: '#a3a3a3', line: '#ececec', weak: '#f7f7f7', amber: '#e8890c' }
const ring = `0 0 0 1px ${C.line}`, ctl = `0 0 0 1px ${C.line}, 0 1px 2px rgb(0 0 0 / 0.045)`

export const Btn = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 text-[13.5px] font-[500] ${dark ? 'btn-ink' : 'bg-white'}`} style={dark ? undefined : { boxShadow: ctl, color: C.sub }}>{children}</span>
)

export function Sidebar() {
  const main: [typeof RiMapPin2Line, string, string?][] = [[RiLayoutGridLine, 'Overview'], [RiMapPin2Line, 'Grid map'], [RiArrowLeftRightLine, 'Flows'], [RiLineChartLine, 'Forecasts'], [RiAlarmWarningLine, 'Alerts', '3'], [RiFileChartLine, 'Reports']]
  const favs: [string, string, string][] = [['#e8890c', 'Iberia corridor', '⌘1'], ['#346eda', 'Nordic links', '⌘2'], ['#7c5cf0', 'Alpine ring', '⌘3']]
  return (
    <aside className="flex w-[232px] shrink-0 flex-col px-4 pb-4 pt-5" style={{ boxShadow: `inset -1px 0 0 ${C.line}` }}>
      <div className="flex items-center gap-2.5 pb-4" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
        <span className="grid size-9 place-items-center rounded-full bg-[#171717] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]"><RiFlashlightFill size={17} /></span>
        <div className="min-w-0 flex-1 leading-tight"><div className="text-[13.5px] font-[500]">Gridline</div><div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>Central Europe desk</div></div>
        <span className="grid size-6 place-items-center rounded-[7px] bg-white" style={{ boxShadow: ctl, color: C.sub }}><RiExpandUpDownLine size={14} /></span>
      </div>
      <div className="pt-4 text-[11px] font-[500] tracking-[0.04em]" style={{ color: C.soft }}>MAIN</div>
      <nav className="mt-1.5 flex flex-col gap-0.5">
        {main.map(([I, l, n]) => {
          const on = l === 'Grid map'
          return (
            <div key={l} className="relative flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] font-[500]" style={{ background: on ? C.weak : undefined, color: on ? C.ink : C.sub }}>
              {on && <span className="absolute -left-4 top-2 h-5 w-[3px] rounded-r-full bg-[#171717]" />}
              <I size={18} style={{ color: on ? C.ink : C.soft }} />{l}
              {n && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-[500]" style={{ background: '#fff4e5', color: '#b45309' }}>{n}</span>}
              {on && <RiArrowRightSLine size={16} className="ml-auto" style={{ color: C.soft }} />}
            </div>
          )
        })}
      </nav>
      <div className="pt-5 text-[11px] font-[500] tracking-[0.04em]" style={{ color: C.soft }}>FAVS</div>
      <nav className="mt-1.5 flex flex-col gap-0.5">
        {favs.map(([c, l, k]) => (
          <div key={l} className="flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] font-[500]" style={{ color: C.sub }}>
            <span className="grid size-[18px] place-items-center"><span className="size-1.5 rounded-full" style={{ background: c }} /></span>{l}
            <span className="ml-auto rounded-[5px] px-1 text-[11px]" style={{ color: C.soft, boxShadow: ring }}>{k}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-0.5">
        {([[RiSettings3Line, 'Settings'], [RiHeadphoneLine, 'Support']] as const).map(([I, l]) => <div key={l} className="flex h-9 items-center gap-2.5 px-2.5 text-[13.5px] font-[500]" style={{ color: C.sub }}><I size={18} style={{ color: C.soft }} />{l}</div>)}
        <div className="mt-3 flex items-center gap-2.5 pt-3" style={{ boxShadow: `inset 0 1px 0 ${C.line}` }}>
          <span className="grid size-9 place-items-center rounded-full text-[12px] font-[500]" style={{ background: 'oklch(0.93 0.04 60)', color: 'oklch(0.42 0.09 60)' }}>LV</span>
          <div className="min-w-0 flex-1 leading-tight"><div className="flex items-center gap-1 text-[13px] font-[500]">Lena Vogt<RiVerifiedBadgeFill size={14} style={{ color: '#47c2ff' }} /></div><div className="mt-0.5 truncate text-[11.5px]" style={{ color: C.sub }}>Shift lead · 14:00–22:00</div></div>
        </div>
      </div>
    </aside>
  )
}

export function PageHeader() {
  return (
    <div className="flex items-center gap-3 pb-4" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
      <span className="grid size-11 place-items-center rounded-full bg-white" style={{ boxShadow: ring, color: C.sub }}><RiMapPin2Line size={20} /></span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="text-[16px] font-[500] tracking-[-0.01em]">Grid map</div>
        <div className="mt-1 flex items-center gap-1.5 text-[13px]" style={{ color: C.sub }}><span className="size-1.5 rounded-full bg-[#22a35a]" />14 nodes live · updated 14:32:08 CET</div>
      </div>
      <span className="grid size-9 place-items-center" style={{ color: C.sub }}><RiSearch2Line size={18} /></span>
      <span className="relative grid size-9 place-items-center" style={{ color: C.sub }}><RiNotification3Line size={18} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#fb3748] ring-2 ring-white" /></span>
      <Btn><RiDownload2Line size={16} />Export</Btn>
      <Btn dark><RiAddLine size={16} />New scenario</Btn>
    </div>
  )
}

export function Tabs() {
  const t: [typeof RiMapPin2Line, string, string, boolean?][] = [[RiLayoutGridLine, 'All lines', '13', true], [RiAlertFill, 'At limit', '1'], [RiArrowUpLine, 'Above 80%', '2'], [RiToolsLine, 'Planned outages', '2']]
  return (
    <div className="flex items-center gap-5 text-[13.5px]" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
      {t.map(([I, l, n, on]) => (
        <span key={l} className="relative flex h-11 items-center gap-1.5 font-[500]" style={{ color: on ? C.ink : C.sub }}>
          <I size={16} style={{ color: on ? C.ink : C.soft }} />{l}<span style={{ color: C.soft }}>({n})</span>
          {on && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#171717]" />}
        </span>
      ))}
      <span className="ml-auto flex items-center gap-2">
        <span className="flex h-8 items-center gap-1.5 rounded-[9px] bg-white px-2.5 text-[13px] font-[500]" style={{ boxShadow: ctl, color: C.sub }}><RiCalendarLine size={15} />Today, 14:00–20:00<RiArrowDownSLine size={15} /></span>
        <span className="grid size-8 place-items-center rounded-[9px] bg-white" style={{ boxShadow: ctl, color: C.sub }}><RiEqualizer2Line size={15} /></span>
      </span>
    </div>
  )
}

type Tone = 'amber' | 'neutral' | 'green' | 'grey'
const TONE: Record<Tone, [string, string, typeof RiAlertFill]> = { amber: ['#fff4e5', '#b45309', RiAlertFill], neutral: ['#f5f5f5', '#5c5c5c', RiArrowUpLine], green: ['#ecf8f1', '#15803d', RiCheckboxCircleFill], grey: ['#f5f5f5', '#5c5c5c', RiToolsLine] }
export function CorridorCard({ code, name, mw, pct, tone, status, action }: { code: string; name: string; mw: string; pct: number; tone: Tone; status: string; action?: string }) {
  const [bg, fg, I] = TONE[tone]
  return (
    <div className="rounded-[14px] bg-white p-1" style={{ boxShadow: ring }}>
      <div className="px-3 pb-2.5 pt-2.5">
        <div className="flex items-center text-[13.5px] font-[500]"><span className="tabular-nums">{code}</span><span className="ml-1.5 truncate font-[400]" style={{ color: C.soft }}>{name}</span><span className="ml-auto tabular-nums" style={{ color: tone === 'amber' ? C.amber : C.ink }}>{pct}%</span></div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: '#f1f1f1' }}><div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone === 'amber' ? C.amber : '#171717', opacity: tone === 'amber' ? 1 : 0.7 }} /></div>
          <span className="text-[11.5px] tabular-nums" style={{ color: C.soft }}>{mw}</span>
        </div>
      </div>
      <div className="flex h-8 items-center gap-1.5 rounded-[10px] px-2.5 text-[12px] font-[500]" style={{ background: bg, color: fg }}>
        <I size={13} />{status}{action && <span className="ml-auto underline underline-offset-2">{action}</span>}
      </div>
    </div>
  )
}

export function MapCard() {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-[16px] bg-white" style={{ boxShadow: ring }}>
      <div className="flex h-11 items-center gap-2 px-4" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
        <span className="text-[13.5px] font-[500]">Cross-border flows</span><span className="text-[12.5px]" style={{ color: C.soft }}>· 418 GW moving</span>
        <span className="ml-auto flex items-center gap-3 text-[11.5px]" style={{ color: C.sub }}>
          <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[#171717] opacity-50" />Flow</span>
          <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full" style={{ background: C.amber }} />At limit</span>
        </span>
      </div>
      <div style={{ background: 'radial-gradient(110% 90% at 40% 45%, #fff, #fbfbfb)' }}><GridMap w={560} h={430} /></div>
    </div>
  )
}

export default function Product() {
  return (
    <div className="flex h-[720px] w-[1164px] overflow-hidden rounded-[16px] bg-white" style={{ color: C.ink, boxShadow: ring }}>
      <Sidebar />
      <div className="min-w-0 flex-1 px-6 pt-5">
        <PageHeader />
        <Tabs />
        <div className="flex gap-4 pt-4">
          <MapCard />
          <div className="flex w-[300px] shrink-0 flex-col gap-2.5">
            <CorridorCard code="FR → ES" name="Baixas" mw="2,940 / 3,000 MW" pct={98} tone="amber" status="At limit · reroute 420 MW via PT" action="Apply" />
            <CorridorCard code="FR → IT" name="Piossasco" mw="2,100 / 2,600" pct={81} tone="neutral" status="Rising · +6% in the last hour" />
            <CorridorCard code="NO → DE" name="NordLink" mw="1,400 / 2,000" pct={70} tone="green" status="Stable · hydro surplus" />
            <CorridorCard code="FR → GB" name="IFA" mw="1,980 / 3,000" pct={66} tone="grey" status="Outage 18:00–20:00" action="Plan" />
          </div>
        </div>
      </div>
    </div>
  )
}
