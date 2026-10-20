// Cadence bento v2 in the Clerk/Raycast object-scene grammar (knowledge/benchmarks/bento/clerk-bento-a.png,
// raycast-bento.png), carried to light mode: each cell is a lit scene (spotlight from above on a faint dot grid) holding
// ONE tactile object built from the product (gradient fills, inner top highlight, layered contact + drop shadows),
// lists fade by staggered opacity, copy sits small at the bottom (15/500 title + 14 muted). One violet accent. Sample data.
import type { ReactNode } from 'react'
import { RiSparkling2Fill, RiLockFill, RiArrowRightLine, RiLink, RiCheckLine, RiTimeFill, RiCalendar2Line } from '@remixicon/react'

const C = { ink: '#171717', sub: '#5c5c5c', soft: '#a3a3a3', line: '#ebebeb', v: '#6e3ff3' }
// tactile white object: ring, top highlight, contact shadow, soft drop
const obj = '0 0 0 1px rgb(0 0 0 / 0.06), inset 0 1px 0 #fff, 0 1px 2px rgb(0 0 0 / 0.06), 0 10px 24px -10px rgb(0 0 0 / 0.16)'
const raised = '0 0 0 1px #5b2fd9, inset 0 1px 0 rgb(255 255 255 / 0.28), inset 0 -2px 4px rgb(40 0 120 / 0.25), 0 2px 4px rgb(68 27 180 / 0.25), 0 14px 28px -10px rgb(110 63 243 / 0.55)'
const Face = ({ n, hue, s = 30 }: { n: string; hue: number; s?: number }) => <span className="grid shrink-0 place-items-center rounded-full font-[500]" style={{ width: s, height: s, fontSize: s * 0.36, background: `linear-gradient(180deg, oklch(0.95 0.035 ${hue}), oklch(0.9 0.05 ${hue}))`, color: `oklch(0.4 0.09 ${hue})`, boxShadow: '0 0 0 2px #fff, 0 2px 6px -2px rgb(0 0 0 / 0.2)' }}>{n}</span>

function Cell({ title, body, children, className = '', h }: { title: string; body: string; children: ReactNode; className?: string; h: number }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] ${className}`} style={{ height: h, background: 'linear-gradient(180deg, #fbfbfb, #f4f4f5)', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.05), inset 0 1px 0 #fff' }}>
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.07) 1px, transparent 1.3px)', backgroundSize: '16px 16px', maskImage: 'radial-gradient(70% 60% at 50% 30%, #000, transparent 80%)' }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70%]" style={{ background: 'radial-gradient(50% 70% at 50% 0%, rgb(255 255 255 / 0.95), transparent 70%)' }} />
      <div className="absolute inset-x-0 top-0" style={{ height: h - 118 }}>{children}</div>
      <div className="absolute inset-x-7 bottom-7"><div className="text-[15px] font-[500] tracking-[-0.01em]">{title}</div><div className="mt-1.5 text-[14px] leading-[21px]" style={{ color: C.sub }}>{body}</div></div>
    </div>
  )
}

function FindTime() {
  const H = ['10', '11', '12', '1', '2', '3', '4']
  return (
    <div className="grid h-full place-items-center">
      <div className="relative">
        <div className="flex gap-3">
          {H.map((h) => {
            const on = h === '2', busy = ['11', '3'].includes(h)
            return (
              <div key={h} className="grid h-[86px] w-[72px] place-items-center rounded-[18px] text-[24px] tracking-[-0.02em] tabular-nums" style={on ? { background: 'linear-gradient(180deg, #8a63ff, #6e3ff3)', color: '#fff', boxShadow: raised, transform: 'translateY(-10px)' } : { background: 'linear-gradient(180deg, #fff, #f6f6f6)', color: busy ? '#cfcfcf' : C.ink, boxShadow: obj }}>
                <span className="leading-none">{h}<span className="block pt-1 text-center text-[11px] tracking-normal" style={{ color: on ? 'rgb(255 255 255 / 0.75)' : C.soft }}>{busy ? 'busy' : Number(h) < 9 ? 'PM' : 'AM'}</span></span>
              </div>
            )
          })}
        </div>
        <div className="absolute -top-[74px] left-[372px] flex -translate-x-1/2 -space-x-1.5">{[['M', 250], ['T', 150], ['A', 25], ['J', 200], ['L', 60]].map(([n, h]) => <Face key={n} n={n as string} hue={h as number} />)}</div>
        <svg className="pointer-events-none absolute -top-[42px] left-[336px]" width="72" height="34" aria-hidden><path d="M36 0V30" stroke={C.v} strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" /></svg>
        <div className="absolute -bottom-[62px] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-3 text-[13px] font-[500]" style={{ boxShadow: obj }}>
          <span className="grid size-6 place-items-center rounded-full" style={{ background: '#f1edff', color: C.v }}><RiSparkling2Fill size={13} /></span>Wed 2:00 PM · all 5 free
        </div>
      </div>
    </div>
  )
}

function Focus() {
  return (
    <div className="flex h-full flex-col items-center pt-12">
      <div className="relative grid h-[96px] w-[230px] place-items-center rounded-[22px]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgb(110 63 243 / 0.12) 0 1.2px, rgb(110 63 243 / 0.03) 1.2px 8px)', boxShadow: 'inset 0 0 0 1px rgb(110 63 243 / 0.22), 0 10px 24px -14px rgb(110 63 243 / 0.5)' }}>
        <span className="grid size-[58px] place-items-center rounded-full text-white" style={{ background: 'linear-gradient(180deg, #8a63ff, #6e3ff3)', boxShadow: raised }}><RiLockFill size={24} /></span>
        <span className="absolute -bottom-3 rounded-full bg-white px-2.5 py-1 text-[12px] font-[500] tabular-nums" style={{ color: C.v, boxShadow: obj }}>9:00 – 11:00</span>
      </div>
      <div className="mt-8 w-[250px] space-y-2">
        {[['Vendor call: Halo', 1], ['Quick sync?', 0.55], ['Design review', 0.25]].map(([t, o]) => (
          <div key={t as string} className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-2" style={{ boxShadow: obj, opacity: o as number }}>
            <span className="grid size-5 place-items-center rounded-full" style={{ background: '#f5f5f5', color: C.sub }}><RiCheckLine size={12} /></span>
            <span className="text-[13px] font-[500]">{t as string}</span><span className="ml-auto text-[12px]" style={{ color: C.soft }}>Declined</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Conflict() {
  return (
    <div className="grid h-full place-items-center" style={{ perspective: 900 }}>
      <div className="relative h-[200px] w-[300px]" style={{ transform: 'rotateX(28deg) rotateZ(-10deg)', transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-[20px]" style={{ background: 'linear-gradient(180deg, #fff, #f6f6f6)', boxShadow: obj }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="absolute inset-x-4 h-px" style={{ top: 30 + i * 46, background: C.line }} />)}
        </div>
        <div className="absolute left-5 top-9 h-[70px] w-[150px] rounded-[12px] px-3 py-2" style={{ background: '#f4f0ff', boxShadow: 'inset 0 0 0 1px #e1d6ff' }}><div className="text-[12px] font-[500]">Hiring sync</div><div className="text-[11px]" style={{ color: '#5b2fd9' }}>10:30</div></div>
        <div className="absolute left-[132px] top-[96px] h-[70px] w-[150px] rounded-[12px] px-3 py-2" style={{ background: '#fff', boxShadow: '0 0 0 1.5px #6e3ff3, 0 18px 30px -12px rgb(110 63 243 / 0.5)', transform: 'translateZ(36px)' }}>
          <div className="text-[12px] font-[500]">Kickoff</div><div className="text-[11px]" style={{ color: C.v }}>moved to 1:00 PM</div>
        </div>
        <svg className="absolute left-[110px] top-[60px]" width="80" height="60" aria-hidden><path d="M4 6C30 6 48 20 60 50" fill="none" stroke={C.v} strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" /></svg>
      </div>
    </div>
  )
}

function Booking() {
  return (
    <div className="flex h-full flex-col items-center pt-14">
      <div className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-[14px] font-[500]" style={{ boxShadow: `${obj}, 0 0 0 6px rgb(110 63 243 / 0.06)` }}>
        <span className="grid size-8 place-items-center rounded-full text-white" style={{ background: 'linear-gradient(180deg, #8a63ff, #6e3ff3)', boxShadow: raised }}><RiLink size={15} /></span>cadence.so/maya
      </div>
      <div className="mt-9 flex gap-2">
        {['9:30', '1:30', '2:00', '3:30'].map((t, i) => (
          <span key={t} className="grid h-11 w-[64px] place-items-center rounded-[13px] text-[14px] font-[500] tabular-nums" style={i === 2 ? { background: 'linear-gradient(180deg, #8a63ff, #6e3ff3)', color: '#fff', boxShadow: raised, transform: 'translateY(-6px)' } : { background: 'linear-gradient(180deg, #fff, #f6f6f6)', boxShadow: obj, opacity: [0.5, 0.8, 1, 0.8][i] }}>{t}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-1.5 text-[12.5px]" style={{ color: C.sub }}><RiCalendar2Line size={14} />Thu, Oct 22 · 30 min</div>
    </div>
  )
}

function Insight() {
  const D: [string, number, number][] = [['M', 4.5, 2], ['T', 3, 3.5], ['W', 5, 1], ['T', 2, 4], ['F', 1.5, 4.5]]
  return (
    <div className="flex h-full items-end justify-center gap-3.5 pb-6">
      {D.map(([d, m, f], i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="flex w-[46px] flex-col gap-1">
            <span className="w-full rounded-[10px]" style={{ height: f * 22, backgroundImage: 'repeating-linear-gradient(135deg, rgb(110 63 243 / 0.28) 0 1.2px, rgb(110 63 243 / 0.08) 1.2px 7px)', boxShadow: `inset 0 0 0 1px rgb(110 63 243 / ${i === 4 ? 0.6 : 0.25})${i === 4 ? ', 0 10px 20px -10px rgb(110 63 243 / 0.6)' : ''}` }} />
            <span className="w-full rounded-[10px]" style={{ height: m * 22, background: 'linear-gradient(180deg, #3a3a3d, #1c1c1e)', boxShadow: '0 0 0 1px #111, inset 0 1px 0 rgb(255 255 255 / 0.15), 0 6px 14px -8px rgb(0 0 0 / 0.5)' }} />
          </div>
          <span className="text-[12px] font-[500]" style={{ color: C.soft }}>{d}</span>
        </div>
      ))}
      <div className="absolute left-7 top-7 rounded-[14px] bg-white px-3 py-2" style={{ boxShadow: obj }}>
        <div className="flex items-center gap-1 text-[12px]" style={{ color: C.sub }}><RiTimeFill size={13} style={{ color: C.v }} />Focus</div>
        <div className="text-[22px] tracking-[-0.02em] tabular-nums" style={{ color: C.v }}>15h</div>
      </div>
    </div>
  )
}

export default function Bento() {
  return (
    <div className="relative" style={{ width: 1440, height: 1220, background: '#ffffff', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div className="absolute inset-x-[120px] top-[112px]">
        <div className="text-center">
          <h2 className="text-[44px] font-[550] leading-[1.06] tracking-[-0.04em]">Every Hour, Accounted For</h2>
          <p className="mx-auto mt-4 w-[520px] text-[17px] leading-[26px]" style={{ color: C.sub }}>Cadence finds the time, guards the focus and settles<br />the conflicts, so your week arrives already arranged.</p>
          <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-[500]">See how it works<RiArrowRightLine size={15} /></span>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4">
          <Cell className="col-span-2" h={420} title="Find a time" body="The one hour that works for every guest, found across all their calendars."><FindTime /></Cell>
          <Cell h={420} title="Focus time" body="Deep work stays on the calendar. Cadence declines what would break it."><Focus /></Cell>
          <Cell h={400} title="Conflicts settle themselves" body="Double bookings move to the next slot everyone has free."><Conflict /></Cell>
          <Cell h={400} title="Scheduling links" body="Share a link, let people pick a slot you actually have."><Booking /></Cell>
          <Cell h={400} title="Weekly insight" body="See how much of the week went to meetings and how much to work."><Insight /></Cell>
        </div>
      </div>
    </div>
  )
}
