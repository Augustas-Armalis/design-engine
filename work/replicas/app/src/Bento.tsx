// Cadence landing: the bento section (1440 wide). Each cell = muted kicker (13) + 2-line statement (20/500) + a real
// mini-UI built from the calendar's own components, fading toward the cell edge (Kuleszo AKZ-17, Kargul micro-tokens:
// cells are ring-only, r24; inner UI ring + control shadow). One violet accent; tones only where they carry meaning.
// Sample data.
import type { ReactNode } from 'react'
import { RiTimeFill, RiSparkling2Fill, RiErrorWarningFill, RiArrowRightLine, RiCheckLine, RiLink, RiCalendar2Line, RiVideoOnLine } from '@remixicon/react'

const C = { ink: '#171717', sub: '#5c5c5c', soft: '#a3a3a3', line: '#ebebeb', violet: '#6e3ff3' }
const ring = `0 0 0 1px ${C.line}`, lift = `0 0 0 1px ${C.line}, 0 4.5px 13px rgb(0 0 0 / 0.055)`
const Face = ({ n, hue, s = 24 }: { n: string; hue: number; s?: number }) => <span className="grid shrink-0 place-items-center rounded-full font-[500] ring-2 ring-white" style={{ width: s, height: s, fontSize: s * 0.4, background: `oklch(0.93 0.04 ${hue})`, color: `oklch(0.4 0.09 ${hue})` }}>{n}</span>

function Cell({ kicker, title, children, className = '', fade = true }: { kicker: string; title: ReactNode; children: ReactNode; className?: string; fade?: boolean }) {
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-[24px] bg-white ${className}`} style={{ boxShadow: ring }}>
      <div className="px-7 pt-7"><div className="text-[13px]" style={{ color: C.soft }}>{kicker}</div><div className="mt-2 text-[20px] font-[500] leading-[26px] tracking-[-0.02em]">{title}</div></div>
      <div className="relative mt-6 flex-1" style={fade ? { maskImage: 'linear-gradient(180deg, #000 72%, transparent)' } : undefined}>{children}</div>
    </div>
  )
}

function FindTime() {
  const P: [string, number, [number, number][]][] = [['MC', 250, [[0, 2], [6, 8]]], ['TP', 150, [[1, 3], [7, 9]]], ['AR', 25, [[0, 1], [3, 4], [8, 9]]], ['JW', 200, [[2, 4]]], ['LV', 60, [[0, 2], [7, 10]]]]
  const col = (i: number) => `${(i / 10) * 100}%`
  return (
    <div className="mx-7 rounded-[16px] bg-[#fafafa] p-4" style={{ boxShadow: `inset 0 0 0 1px ${C.line}` }}>
      <div className="relative mb-3 ml-9 h-4 text-[11px] tabular-nums" style={{ color: C.soft }}>{['9', '10', '11', '12', '1', '2', '3', '4', '5', '6'].map((h, i) => <span key={h} className="absolute" style={{ left: col(i) }}>{h}</span>)}</div>
      <div className="relative space-y-2">
        <div className="absolute bottom-[-6px] top-[-6px] z-10 rounded-[10px]" style={{ left: `calc(36px + (100% - 36px) * 0.5)`, width: `calc((100% - 36px) * 0.1)`, boxShadow: `inset 0 0 0 1.5px ${C.violet}`, background: 'rgb(110 63 243 / 0.06)' }} />
        {P.map(([n, hue, busy]) => (
          <div key={n} className="flex items-center gap-3">
            <Face n={n} hue={hue} />
            <div className="relative h-6 flex-1 rounded-[7px]" style={{ background: '#fff', boxShadow: `inset 0 0 0 1px ${C.line}` }}>
              {busy.map(([a, b], i) => <span key={i} className="absolute inset-y-[3px] rounded-[5px]" style={{ left: `calc(${col(a)} + 2px)`, width: `calc(${col(b - a)} - 4px)`, background: '#ececec' }} />)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-white px-3 py-2.5" style={{ boxShadow: lift }}>
        <span className="grid size-7 place-items-center rounded-[8px]" style={{ background: '#f1edff', color: C.violet }}><RiSparkling2Fill size={15} /></span>
        <span className="text-[13px] font-[500]">Wed 2:00 – 3:00 PM</span><span className="text-[12.5px]" style={{ color: C.sub }}>· all 5 free, no focus time touched</span>
        <span className="ml-auto flex h-8 items-center gap-1 rounded-[9px] px-3 text-[13px] font-[500] text-white" style={{ background: C.violet, boxShadow: '0 0 0 1px #5b2fd9, inset 0 1px 0 rgb(255 255 255 / 0.18)' }}>Book<RiArrowRightLine size={14} /></span>
      </div>
    </div>
  )
}

function Focus() {
  return (
    <div className="mx-7 space-y-2">
      <div className="rounded-[14px] px-4 py-3.5" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgb(110 63 243 / 0.08) 0 1px, transparent 1px 7px)', boxShadow: 'inset 0 0 0 1px rgb(110 63 243 / 0.2)' }}>
        <div className="flex items-center gap-1.5 text-[13px] font-[500]" style={{ color: C.violet }}><RiTimeFill size={15} />Focus time · 9:00 – 11:00</div>
        <div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>Protected for 3 weeks running</div>
      </div>
      {[['Vendor call: Halo', 'Declined · offered Thu 4 PM'], ['Quick sync?', 'Declined · moved to async thread'], ['Design review', 'Moved to 2:00 PM']].map(([t, s]) => (
        <div key={t} className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-2.5" style={{ boxShadow: lift }}>
          <span className="grid size-6 place-items-center rounded-full" style={{ background: '#f5f5f5', color: C.sub }}><RiCheckLine size={13} /></span>
          <div className="leading-tight"><div className="text-[13px] font-[500]">{t}</div><div className="mt-0.5 text-[12px]" style={{ color: C.soft }}>{s}</div></div>
        </div>
      ))}
    </div>
  )
}

function Conflict() {
  return (
    <div className="mx-7">
      <div className="relative h-[112px]">
        <div className="absolute left-0 top-0 h-[76px] w-[64%] rounded-[12px] px-3 py-2.5" style={{ background: '#f4f0ff', boxShadow: 'inset 0 0 0 1px #e6dcff' }}><div className="text-[12.5px] font-[500]">Onboarding kickoff</div><div className="text-[11.5px]" style={{ color: '#5b2fd9' }}>10:00 – 11:30</div></div>
        <div className="absolute right-0 top-[36px] h-[60px] w-[54%] rounded-[12px] px-3 py-2.5" style={{ background: '#eef4ff', boxShadow: 'inset 0 0 0 1px #dce8ff, 0 4px 10px -4px rgb(0 0 0 / 0.08)' }}><div className="text-[12.5px] font-[500]">Hiring sync</div><div className="text-[11.5px]" style={{ color: '#1d4fb8' }}>10:30 – 11:00</div></div>
        <span className="absolute left-[46%] top-[24px] grid size-6 -translate-x-1/2 place-items-center rounded-full bg-white" style={{ boxShadow: lift, color: '#e8742b' }}><RiErrorWarningFill size={15} /></span>
      </div>
      <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-2.5" style={{ boxShadow: lift }}>
        <span className="grid size-7 place-items-center rounded-[8px]" style={{ background: '#f1edff', color: C.violet }}><RiSparkling2Fill size={14} /></span>
        <div className="leading-tight"><div className="text-[13px] font-[500]">Move kickoff to 1:00 PM</div><div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>All 9 guests free</div></div>
      </div>
    </div>
  )
}

function Booking() {
  return (
    <div className="mx-7 rounded-[16px] bg-white p-4" style={{ boxShadow: lift }}>
      <div className="flex items-center gap-2.5"><Face n="MC" hue={250} s={30} /><div className="leading-tight"><div className="text-[13px] font-[500]">Intro with Maya</div><div className="mt-0.5 flex items-center gap-1 text-[12px]" style={{ color: C.soft }}><RiVideoOnLine size={13} />30 min · Meet</div></div></div>
      <div className="mt-3.5 text-[12px] font-[500]" style={{ color: C.sub }}>Thu, Oct 22</div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">{['9:30', '10:00', '1:30', '2:00', '3:30', '4:00'].map((t, i) => <span key={t} className="grid h-8 place-items-center rounded-[9px] text-[12.5px] font-[500] tabular-nums" style={i === 3 ? { background: C.violet, color: '#fff', boxShadow: '0 0 0 1px #5b2fd9' } : { boxShadow: ring, color: C.ink }}>{t}</span>)}</div>
      <div className="mt-3 flex items-center gap-1.5 text-[12px]" style={{ color: C.soft }}><RiLink size={13} />cadence.so/maya/intro</div>
    </div>
  )
}

function Insight() {
  const D: [string, number, number][] = [['Mon', 4.5, 2], ['Tue', 3, 3.5], ['Wed', 5, 1], ['Thu', 2, 4], ['Fri', 1.5, 4.5]]
  return (
    <div className="mx-7">
      <div className="flex items-baseline gap-2"><span className="text-[28px] tracking-[-0.02em] tabular-nums" style={{ color: C.violet }}>15h</span><span className="text-[13px]" style={{ color: C.sub }}>focus time · +4h vs last week</span></div>
      <div className="mt-4 flex items-end gap-3" style={{ height: 150 }}>
        {D.map(([d, m, f]) => (
          <div key={d} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-col gap-1">
              <span className="w-full rounded-[6px]" style={{ height: f * 15, backgroundImage: 'repeating-linear-gradient(135deg, rgb(110 63 243 / 0.22) 0 1px, rgb(110 63 243 / 0.08) 1px 6px)', boxShadow: 'inset 0 0 0 1px rgb(110 63 243 / 0.25)' }} />
              <span className="w-full rounded-[6px] bg-[#171717]" style={{ height: m * 15, opacity: 0.85 }} />
            </div>
            <span className="text-[11.5px]" style={{ color: C.soft }}>{d}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[12px]" style={{ color: C.sub }}>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-[#171717] opacity-85" />Meetings</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-[2px]" style={{ background: 'rgb(110 63 243 / 0.35)' }} />Focus</span>
      </div>
    </div>
  )
}

export default function Bento() {
  return (
    <div className="relative" style={{ width: 1440, height: 1180, background: '#f7f7f7', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div className="absolute inset-x-[120px] top-[112px]">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex h-7 w-fit items-center gap-1.5 rounded-full bg-white px-2.5 text-[12.5px] font-[500]" style={{ boxShadow: ring, color: C.sub }}><RiCalendar2Line size={14} style={{ color: C.violet }} />How Cadence works</div>
            <h2 className="mt-5 text-[44px] font-[550] leading-[1.06] tracking-[-0.04em]">Every Hour, Accounted For</h2>
          </div>
          <p className="w-[400px] pb-1 text-[16px] leading-[25px]" style={{ color: C.sub }}>Cadence finds the time, guards the focus and settles the conflicts, so your week arrives already arranged.</p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4" style={{ gridTemplateRows: '430px 400px' }}>
          <Cell className="col-span-2" kicker="Find a time" title={<>One hour that works for everyone,<br />found across every calendar</>}><FindTime /></Cell>
          <Cell kicker="Focus time" title={<>Deep work that stays<br />on the calendar</>}><Focus /></Cell>
          <Cell kicker="Conflicts" title={<>Double bookings settle<br />before you see them</>}><Conflict /></Cell>
          <Cell kicker="Scheduling links" title={<>Let people book you<br />on your terms</>}><Booking /></Cell>
          <Cell kicker="Weekly insight" title={<>See where<br />the week went</>} fade={false}><Insight /></Cell>
        </div>
      </div>
    </div>
  )
}
