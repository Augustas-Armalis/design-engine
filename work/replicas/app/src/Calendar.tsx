// Calendar product, replicate-first from AlignUI's HR calendar (knowledge/benchmarks/alignui-dashboards/hr-1.png,
// 1600x1200; same frame as finance-1: inset r44 window at 76/146, 276 sidebar). Our product: Cadence, a team calendar.
// Own touches: a live "now" line through today, hatched focus-time blocks that protect deep work, an overlap marked on
// the conflicting pair, and an AI "suggested slot" ghost block. Kargul micro-tokens for edges and shadows. Sample data.
import type { ReactNode } from 'react'
import {
  RiCalendar2Line, RiLayoutGridLine, RiTimeLine, RiFolder3Line, RiTeamLine, RiPlugLine, RiSparkling2Line, RiFileList3Line, RiSettings3Line,
  RiHeadphoneLine, RiArrowRightSLine, RiArrowLeftSLine, RiSearch2Line, RiNotification3Line, RiAddLine, RiArrowDownSLine, RiFilter3Line,
  RiVideoOnLine, RiMapPinLine, RiErrorWarningFill, RiCheckboxCircleFill, RiCloseCircleFill, RiTimeFill, RiVerifiedBadgeFill, RiExpandUpDownLine,
} from '@remixicon/react'

const C = { ink: '#171717', sub: '#5c5c5c', soft: '#a3a3a3', line: '#ebebeb', weak: '#f7f7f7', violet: '#6e3ff3', red: '#e5484d' }
const ring = `0 0 0 1px ${C.line}`, ctl = `0 0 0 1px ${C.line}, 0 1px 2px rgb(0 0 0 / 0.045)`
const Face = ({ n, hue, s = 22 }: { n: string; hue: number; s?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-full font-[500] ring-2 ring-white" style={{ width: s, height: s, fontSize: s * 0.4, background: `oklch(0.92 0.045 ${hue})`, color: `oklch(0.4 0.09 ${hue})` }}>{n}</span>
)
const Stack = ({ p, more }: { p: [string, number][]; more?: number }) => (
  <span className="flex items-center"><span className="flex -space-x-1">{p.map(([n, h]) => <Face key={n} n={n[0]} hue={h} s={22} />)}</span>{more && <span className="ml-1.5 text-[11px] font-[500]" style={{ color: C.sub }}>+{more}</span>}</span>
)
const Btn = ({ children, primary = false }: { children: ReactNode; primary?: boolean }) => (
  <span className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[11px] px-3.5 text-[14px] font-[500]"
    style={primary ? { background: C.violet, color: '#fff', boxShadow: `0 0 0 1px #5b2fd9, inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(68 27 180 / 0.3)` } : { background: '#fff', color: C.sub, boxShadow: ctl }}>{children}</span>
)

const NAV: [typeof RiCalendar2Line, string, string?][] = [[RiLayoutGridLine, 'Home'], [RiCalendar2Line, 'Calendar'], [RiTimeLine, 'Focus time'], [RiFolder3Line, 'Projects'], [RiTeamLine, 'Teams', '12'], [RiPlugLine, 'Integrations'], [RiFileList3Line, 'Scheduling links']]

// week grid geometry (matches the reference): days from x=488, 200 wide; hours from y=562, 120 per hour, 9:00 at top
const X0 = 488, DW = 200, Y0 = 562, HH = 120
const at = (day: number, h: number) => ({ left: X0 + day * DW + 8, top: Y0 + (h - 9) * HH + 4 })
type Ev = { d: number; s: number; e: number; t: string; tone: 'blue' | 'orange' | 'violet' | 'green' | 'grey'; meta?: ReactNode; foot?: ReactNode }
const TONE = { blue: ['#eef4ff', '#dce8ff', '#1d4fb8'], orange: ['#fff3ec', '#ffe2d1', '#b4430f'], violet: ['#f4f0ff', '#e6dcff', '#5b2fd9'], green: ['#edf9f2', '#d5f1e0', '#147a43'], grey: ['#f6f6f6', '#ebebeb', '#5c5c5c'] } as const
const EVENTS: Ev[] = [
  { d: 0, s: 9, e: 9.5, t: 'Design standup', tone: 'grey' },
  { d: 0, s: 9.5, e: 10, t: 'Pricing page review', tone: 'blue' },
  { d: 1, s: 9, e: 9.5, t: 'Design standup', tone: 'grey' },
  { d: 1, s: 10, e: 11.5, t: 'Onboarding redesign kickoff', tone: 'violet', meta: 'Figma file shared', foot: <><Stack p={[['MC', 250], ['TP', 150], ['AR', 25]]} more={6} /><span className="ml-auto flex items-center gap-1"><RiVideoOnLine size={13} />Meet</span></> },
  { d: 2, s: 9.5, e: 10, t: 'Hiring sync', tone: 'blue' },
  { d: 3, s: 9, e: 10, t: 'Customer interview: Lumen', tone: 'orange', foot: <><Stack p={[['LV', 60], ['JW', 200]]} more={2} /><span className="ml-auto flex items-center gap-1"><RiVideoOnLine size={13} />Zoom</span></> },
  { d: 2, s: 11, e: 11.5, t: 'Roadmap Q1 draft', tone: 'violet' },
  { d: 2, s: 11.5, e: 13, t: 'Product crit: Mobile app', tone: 'blue', meta: 'Room 4B · 2nd floor', foot: <><Stack p={[['SO', 300], ['KY', 90], ['RM', 190]]} more={4} /><span className="ml-auto flex items-center gap-1"><RiMapPinLine size={13} />HQ</span></> },
  { d: 0, s: 11.5, e: 13, t: 'Workshop: Design tokens 2.0', tone: 'orange', meta: 'Bring a component to audit', foot: <span className="flex items-center gap-1"><RiMapPinLine size={13} />Studio, 3rd floor</span> },
  { d: 3, s: 11.5, e: 13, t: 'Webinar: Shipping with AI', tone: 'green', meta: '1,240 registered', foot: <span className="flex items-center gap-1"><RiVideoOnLine size={13} />cadence.so/live</span> },
  { d: 1, s: 12, e: 12.5, t: 'Quarterly finance review', tone: 'grey' },
  { d: 1, s: 12.5, e: 13, t: 'Sales enablement', tone: 'grey' },
]

function Event({ v }: { v: Ev }) {
  const [bg, edge, fg] = TONE[v.tone], h = (v.e - v.s) * HH - 8, p = at(v.d, v.s)
  return (
    <div className="absolute overflow-hidden rounded-[12px] px-3 py-2.5" style={{ ...p, width: DW - 16, height: h, background: bg, boxShadow: `inset 0 0 0 1px ${edge}` }}>
      <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full" style={{ background: fg, opacity: 0.85 }} />
      <div className="truncate text-[13px] font-[500] leading-[17px]" style={{ color: C.ink }}>{v.t}</div>
      <div className="mt-0.5 text-[12px] tabular-nums" style={{ color: fg }}>{fmt(v.s)} – {fmt(v.e)}</div>
      {v.meta && h > 90 && <div className="mt-1.5 truncate text-[12px]" style={{ color: C.sub }}>{v.meta}</div>}
      {v.foot && h > 90 && <div className="absolute inset-x-3 bottom-2.5 flex items-center text-[11.5px]" style={{ color: C.sub }}>{v.foot}</div>}
    </div>
  )
}
const fmt = (h: number) => { const H = Math.floor(h), m = Math.round((h % 1) * 60); return `${H > 12 ? H - 12 : H}:${String(m).padStart(2, '0')}` }

const Summary = ({ t, time, tone, icon: I, label, right }: { t: string; time: string; tone: string; icon: typeof RiCheckboxCircleFill; label: string; right: ReactNode }) => (
  <div className="rounded-[14px] bg-white p-1" style={{ boxShadow: ring }}>
    <div className="flex items-start px-3 pb-2.5 pt-2.5">
      <div className="min-w-0 flex-1 leading-tight"><div className="truncate text-[14px] font-[500]">{t}</div><div className="mt-1 text-[12px] tabular-nums" style={{ color: C.sub }}>{time}</div></div>
      <span className="grid size-6 place-items-center rounded-full" style={{ boxShadow: ring, color: C.sub }}><RiArrowDownSLine size={15} /></span>
    </div>
    <div className="flex h-8 items-center gap-1.5 rounded-[10px] px-2.5 text-[12px] font-[500]" style={{ background: tone }}><I size={14} />{label}<span className="ml-auto">{right}</span></div>
  </div>
)

export default function Calendar() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1600, height: 1200, background: '#e8e8e8', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div data-subject className="absolute overflow-hidden rounded-[44px] bg-white" style={{ left: 76, top: 146, width: 1448, height: 908, boxShadow: '0 0 0 1px rgb(0 0 0 / 0.04), 0 16px 40px -16px rgb(0 0 0 / 0.12)' }}>
        {/* sidebar */}
        <aside className="absolute inset-y-0 left-0 flex w-[276px] flex-col px-6 pb-6 pt-7" style={{ boxShadow: `inset -1px 0 0 ${C.line}` }}>
          <div className="flex items-center gap-3 pb-6" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: 'conic-gradient(from 200deg, #8a63ff, #5b2fd9, #8a63ff)', boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.3)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><rect x="3.5" y="4.5" width="13" height="12" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.7" /><path d="M3.5 8.5h13M7 3v3M13 3v3" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /><circle cx="10" cy="12.5" r="1.6" fill="#fff" /></svg>
            </span>
            <div className="min-w-0 flex-1 leading-tight"><div className="text-[14px] font-[500]">Cadence</div><div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>Northwind Design</div></div>
            <span className="grid size-6 place-items-center rounded-[7px] bg-white" style={{ boxShadow: ctl, color: C.sub }}><RiExpandUpDownLine size={15} /></span>
          </div>
          <div className="pt-6 text-[12px] font-[500] tracking-[0.04em]" style={{ color: '#99a0ae' }}>MAIN</div>
          <nav className="mt-2 flex flex-col gap-1">
            {NAV.map(([I, l, n]) => {
              const on = l === 'Calendar'
              return (
                <div key={l} className="relative flex h-9 items-center gap-2.5 rounded-[9px] px-3 text-[14px] font-[500]" style={{ background: on ? C.weak : undefined, color: on ? C.ink : C.sub }}>
                  {on && <span className="absolute -left-6 top-2 h-5 w-1 rounded-r-[4px]" style={{ background: C.violet }} />}
                  <I size={19} style={{ color: on ? C.violet : C.soft }} />{l}
                  {n && <span className="ml-auto text-[12px]" style={{ color: C.soft }}>{n}</span>}{on && <RiArrowRightSLine size={18} className="ml-auto" style={{ color: C.soft }} />}
                </div>
              )
            })}
          </nav>
          <div className="pt-6 text-[12px] font-[500] tracking-[0.04em]" style={{ color: '#99a0ae' }}>CALENDARS</div>
          <nav className="mt-2 flex flex-col gap-1">
            {([['#6e3ff3', 'Product design', true], ['#e8742b', 'Research', true], ['#2f7cf6', 'Engineering', true], ['#22a35a', 'Events', false]] as const).map(([c, l, on]) => (
              <div key={l} className="flex h-9 items-center gap-2.5 px-3 text-[14px] font-[500]" style={{ color: C.sub }}>
                <span className="grid size-[18px] place-items-center rounded-[5px]" style={on ? { background: c, boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.25)' } : { boxShadow: `inset 0 0 0 1.5px ${c}` }}>{on && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5.2 4.1 7.2 8 3" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>{l}
              </div>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1">
            {([[RiSparkling2Line, 'Ask Cadence'], [RiSettings3Line, 'Settings'], [RiHeadphoneLine, 'Support']] as const).map(([I, l]) => <div key={l} className="flex h-9 items-center gap-2.5 px-3 text-[14px] font-[500]" style={{ color: C.sub }}><I size={19} style={{ color: C.soft }} />{l}</div>)}
            <div className="mt-4 flex items-center gap-3 pt-5" style={{ boxShadow: `inset 0 1px 0 ${C.line}` }}>
              <Face n="MC" hue={250} s={40} />
              <div className="min-w-0 flex-1 leading-tight"><div className="flex items-center gap-1 text-[14px] font-[500]">Maya Chen<RiVerifiedBadgeFill size={16} style={{ color: '#47c2ff' }} /></div><div className="mt-0.5 truncate text-[12px]" style={{ color: C.sub }}>maya@northwind.co</div></div>
              <RiArrowRightSLine size={20} style={{ color: C.soft }} />
            </div>
          </div>
        </aside>

        {/* main (coordinates below are page coordinates minus the frame offset) */}
        <div className="absolute" style={{ left: 308, top: 24, width: 1108 }}>
          <div className="flex items-center gap-3.5 pb-5" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            <span className="grid size-12 place-items-center rounded-full bg-white" style={{ boxShadow: ring, color: C.sub }}><RiCalendar2Line size={22} /></span>
            <div className="min-w-0 flex-1 leading-tight"><div className="text-[18px] font-[500] tracking-[-0.015em]">Tuesday, October 20</div><div className="mt-1 text-[14px]" style={{ color: C.sub }}>4 meetings, 1 workshop and 2h of protected focus time today</div></div>
            <span className="grid size-10 place-items-center" style={{ color: C.sub }}><RiSearch2Line size={20} /></span>
            <span className="relative grid size-10 place-items-center" style={{ color: C.sub }}><RiNotification3Line size={20} /><span className="absolute right-2.5 top-2.5 size-1.5 rounded-full ring-2 ring-white" style={{ background: C.red }} /></span>
            <Btn><RiTimeLine size={18} />Find a time</Btn>
            <Btn primary><RiAddLine size={18} />New event</Btn>
          </div>
          {/* filters */}
          <div className="flex items-center gap-2 pt-[14px]">
            <Btn>Today</Btn>
            <div className="flex h-10 items-center rounded-[11px] bg-white text-[14px] font-[500]" style={{ boxShadow: ctl, color: C.sub }}>
              <span className="flex h-full items-center gap-1 px-3.5" style={{ boxShadow: `inset -1px 0 0 ${C.line}` }}>Week<RiArrowDownSLine size={17} /></span>
              <span className="flex h-full items-center gap-2 px-3.5"><RiCalendar2Line size={17} />Oct 19 – Oct 23, 2026</span>
            </div>
            <span className="ml-auto flex h-10 w-[290px] items-center gap-2 rounded-[11px] bg-white px-3 text-[14px]" style={{ boxShadow: ctl, color: C.soft }}><RiSearch2Line size={18} />Search events<span className="ml-auto rounded-[5px] px-1.5 text-[12px]" style={{ boxShadow: ring }}>⌘K</span></span>
            <Btn><RiFilter3Line size={18} />Filter</Btn>
          </div>
          {/* tabs */}
          <div className="mt-[10px] flex items-center gap-7 text-[14px]" style={{ boxShadow: `inset 0 -1px 0 ${C.line}` }}>
            {([[RiLayoutGridLine, 'All scheduled', '', true], [RiTeamLine, 'Meetings', '(8)'], [RiCalendar2Line, 'Events', '(4)'], [RiErrorWarningFill, 'Conflicts', '(1)'], [RiCloseCircleFill, 'Declined', '(1)']] as const).map(([I, l, n, on]) => (
              <span key={l} className="relative flex h-11 items-center gap-2 font-[500]" style={{ color: on ? C.ink : C.sub }}>
                <I size={17} style={{ color: on ? C.violet : C.soft }} />{l} <span style={{ color: C.soft }}>{n}</span>
                {on && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full" style={{ background: C.violet }} />}
              </span>
            ))}
          </div>
          {/* summary cards */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <Summary t="Design standup" time="9:00 – 9:30 AM" tone="#ecf8f1" icon={RiCheckboxCircleFill} label="Now · 12 min left" right={<span className="underline underline-offset-2">Join</span>} />
            <Summary t="Onboarding kickoff" time="10:00 – 11:30 AM" tone="#fff4e8" icon={RiErrorWarningFill} label="Overlaps 1 event" right={<span className="underline underline-offset-2">Resolve</span>} />
            <Summary t="Customer interview" time="Thu, 9:00 – 10:00 AM" tone="#f6f6f6" icon={RiTimeFill} label="In 2 days" right={<span style={{ color: C.sub }}>Lumen</span>} />
            <Summary t="Vendor demo: Halo" time="Fri, 2:00 – 3:00 PM" tone="#fff0f0" icon={RiCloseCircleFill} label="Declined" right={<span style={{ color: C.sub }}>Oct 23</span>} />
          </div>
        </div>

        {/* week grid (absolute in page coords: subtract the frame offset 76/146) */}
        <div className="absolute" style={{ left: X0 - 104 - 76, top: Y0 - 72 - 146, width: 104 + DW * 5, height: 640 }}>
          <div className="absolute inset-0 overflow-hidden rounded-t-[14px]" style={{ boxShadow: ring }}>
            <div className="flex h-[32px]" style={{ background: '#fbfbfb', boxShadow: `inset 0 -1px 0 ${C.line}` }}>
              <div className="flex w-[104px] items-center justify-center gap-4" style={{ boxShadow: `inset -1px 0 0 ${C.line}`, color: C.sub }}><RiArrowLeftSLine size={16} /><RiArrowRightSLine size={16} /></div>
              {['19 MON', '20 TUE', '21 WED', '22 THU', '23 FRI'].map((d, i) => (
                <div key={d} className="flex items-center justify-center gap-1.5 text-[12px] font-[500] tracking-[0.02em]" style={{ width: DW, color: i === 1 ? C.violet : C.soft, boxShadow: i < 4 ? `inset -1px 0 0 ${C.line}` : undefined }}>
                  {i === 1 ? <span className="grid h-5 place-items-center rounded-full px-1.5 text-white" style={{ background: C.violet }}>20</span> : d.slice(0, 2)} {d.slice(3)}
                </div>
              ))}
            </div>
            {/* hour rows */}
            {[9, 10, 11, 12, 13].map((h) => (
              <div key={h} className="absolute left-0 right-0" style={{ top: 72 + (h - 9) * HH, height: HH, boxShadow: `inset 0 1px 0 ${C.line}` }}>
                <span className="absolute left-0 w-[104px] -translate-y-1/2 text-center text-[13px]" style={{ color: C.sub }}>{h > 12 ? h - 12 : h} {h >= 12 ? 'PM' : 'AM'}</span>
              </div>
            ))}
            {[0, 1, 2, 3].map((i) => <div key={i} className="absolute bottom-0 top-[32px] w-px" style={{ left: 104 + DW * (i + 1), background: C.line }} />)}
            <div className="absolute bottom-0 top-[32px] w-px" style={{ left: 104, background: C.line }} />
            {/* focus time (hatched) and the AI suggestion ghost */}
            <div className="absolute rounded-[12px] px-3 py-2.5" style={{ left: 104 + DW * 4 + 8, top: 72 + 4, width: DW - 16, height: HH * 2 - 8, backgroundImage: 'repeating-linear-gradient(135deg, rgb(110 63 243 / 0.07) 0 1px, transparent 1px 7px)', boxShadow: 'inset 0 0 0 1px rgb(110 63 243 / 0.18)' }}>
              <div className="flex items-center gap-1.5 text-[13px] font-[500]" style={{ color: C.violet }}><RiTimeFill size={14} />Focus time</div>
              <div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>Protected · 2 requests declined</div>
            </div>
            <div className="absolute rounded-[12px] px-3 py-2.5" style={{ left: 104 + DW * 2 + 8, top: 72 + HH * 3 + 4, width: DW - 16, height: 52, boxShadow: `inset 0 0 0 1.5px rgb(110 63 243 / 0.5)`, background: 'rgb(255 255 255 / 0.6)' }}>
              <div className="flex items-center gap-1.5 text-[12.5px] font-[500]" style={{ color: C.violet }}><RiSparkling2Line size={14} />Suggested: 1:1 with Theo</div>
            </div>
          </div>
        </div>
        {/* events and now-line, in page coords */}
        <div className="absolute" style={{ left: -76, top: -146 }}>
          <div className="absolute flex -translate-y-1/2 items-center" style={{ left: X0 - 44, top: Y0 + HH * 0.3, width: 44 + DW * 5 }}>
            <span className="rounded-[5px] px-1 text-[11px] font-[600] tabular-nums text-white" style={{ background: C.red }}>9:18</span>
            <span className="h-px flex-1" style={{ background: 'rgb(229 72 77 / 0.25)' }} />
          </div>
          <div className="absolute h-[2px] -translate-y-1/2" style={{ left: X0 + DW, top: Y0 + HH * 0.3, width: DW, background: C.red }}><span className="absolute -left-1 -top-[3px] size-2 rounded-full" style={{ background: C.red }} /></div>
          {EVENTS.map((v, i) => <Event key={i} v={v} />)}
          <span className="absolute grid size-5 place-items-center rounded-full bg-white" style={{ left: X0 + DW * 2 - 12, top: Y0 + HH * 1 + 10, boxShadow: `0 0 0 1px ${C.line}, 0 1px 2px rgb(0 0 0 / 0.08)`, color: '#e8742b' }}><RiErrorWarningFill size={14} /></span>
        </div>
      </div>
    </div>
  )
}
