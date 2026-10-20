// Cadence bento v3, replicate-first from Kargul Studio's services bento (knowledge/benchmarks/bento/kargul-services-bento.png,
// 1440 css: 3 cells 392x434 over 2 cells 600x387, gap 24, r24). One grammar across every cell: a monochrome isometric
// line drawing of the product's own object on a faint perspective grid, title top-left, a short body, a caps chip row.
// Carried to light mode for Cadence; the violet appears once per cell, on the answer. Sample content.
import type { ReactNode } from 'react'

const INK = '#171717', V = '#6e3ff3'
const L = 'rgb(23 23 23 / 0.55)', F = 'rgb(23 23 23 / 0.2)'
// isometric plane: maps flat (x,y) onto the iso floor
const ISO = (x: number, y: number) => `matrix(0.866 0.5 -0.866 0.5 ${x} ${y})`

function Defs() {
  return (
    <defs>
      <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke={F} strokeWidth="1" /></pattern>
      <pattern id="hatchv" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="rgb(110 63 243 / 0.45)" strokeWidth="1" /></pattern>
      <pattern id="fine" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.55" fill="rgb(23 23 23 / 0.35)" /></pattern>
    </defs>
  )
}
const Node = ({ x, y, c = INK }: { x: number; y: number; c?: string }) => <rect x={x - 3.5} y={y - 3.5} width="7" height="7" transform={`rotate(45 ${x} ${y})`} fill="#fff" stroke={c} strokeWidth="1.2" />
const Guide = ({ d }: { d: string }) => <path d={d} fill="none" stroke="rgb(23 23 23 / 0.18)" strokeWidth="1" strokeDasharray="3 4" />

function ArtFind() {
  return (
    <svg width="360" height="240" viewBox="0 0 360 240"><Defs />
      <Guide d="M0 210 L180 110 L360 210" /><Guide d="M40 40 L180 120" />
      <g transform={ISO(180, 40)}>
        <rect x="0" y="0" width="200" height="150" rx="10" fill="#fff" stroke={L} />
        {[0, 1, 2, 3, 4].map((r) => <g key={r}>
          <line x1="10" y1={20 + r * 26} x2="190" y2={20 + r * 26} stroke={F} />
          {[[14, 40], [70, 30], [130, 44]].map(([a, w], k) => (r + k) % 2 === 0 && <rect key={k} x={a} y={26 + r * 26} width={w} height="14" rx="4" fill="url(#hatch)" stroke={F} />)}
        </g>)}
        <rect x="104" y="12" width="22" height="134" rx="6" fill="rgb(110 63 243 / 0.08)" stroke={V} strokeWidth="1.4" />
      </g>
      <Node x={180} y={40} /><Node x={353} y={140} /><Node x={50} y={115} />
      <g transform="translate(220 22)"><rect width="104" height="26" rx="13" fill="#fff" stroke={L} /><circle cx="14" cy="13" r="4" fill={V} /><text x="24" y="17" fontSize="11" fontFamily="Inter Variable" fill={INK}>Wed 2:00 PM</text></g>
      <path d="M272 48 L272 84" stroke={V} strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  )
}

function ArtFocus() {
  return (
    <svg width="360" height="240" viewBox="0 0 360 240"><Defs />
      <Guide d="M20 200 L180 110 L340 200" />
      {[2, 1].map((i) => <g key={i} transform={ISO(180, 44 + i * 30)}><rect width="140" height="110" rx="12" fill={i === 2 ? 'url(#fine)' : '#fff'} stroke={L} /></g>)}
      <g transform={ISO(180, 44)}>
        <rect width="140" height="110" rx="12" fill="#fff" stroke={INK} strokeOpacity="0.7" />
        <rect x="14" y="14" width="112" height="82" rx="8" fill="url(#hatchv)" stroke={V} strokeWidth="1.3" />
      </g>
      <g transform="translate(166 86)"><rect width="28" height="22" rx="6" fill="#fff" stroke={V} strokeWidth="1.4" /><path d="M8 0 V-6 a6 6 0 0 1 12 0 V0" fill="none" stroke={V} strokeWidth="1.4" /><circle cx="14" cy="11" r="2.4" fill={V} /></g>
      <Node x={301} y={114} /><Node x={59} y={114} />
    </svg>
  )
}

function ArtConflict() {
  return (
    <svg width="360" height="240" viewBox="0 0 360 240"><Defs />
      <Guide d="M10 190 L170 100 L350 200" />
      <g transform={ISO(130, 96)}><rect width="120" height="64" rx="10" fill="url(#hatch)" stroke={L} /><rect x="10" y="10" width="60" height="6" rx="3" fill={F} /></g>
      <g transform={ISO(196, 52)}><rect width="120" height="64" rx="10" fill="#fff" stroke={V} strokeWidth="1.4" /><rect x="10" y="10" width="70" height="6" rx="3" fill="rgb(110 63 243 / 0.4)" /><rect x="10" y="24" width="44" height="5" rx="2.5" fill={F} /></g>
      {[[196, 52], [92, 112], [300, 112], [196, 172]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 66} y2={y + 44} stroke={V} strokeOpacity="0.5" strokeDasharray="2 3" />)}
      <Node x={130} y={96} /><Node x={196} y={52} c={V} /><Node x={248} y={182} />
    </svg>
  )
}

function ArtLink() {
  return (
    <svg width="360" height="240" viewBox="0 0 360 240"><Defs />
      <Guide d="M0 200 L170 100 L360 210" />
      <g transform={ISO(150, 50)}>
        <rect width="150" height="120" rx="12" fill="#fff" stroke={L} />
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={14 + c * 42} y={44 + r * 22} width="36" height="16" rx="5" fill={r === 1 && c === 1 ? 'rgb(110 63 243 / 0.12)' : '#fff'} stroke={r === 1 && c === 1 ? V : F} strokeWidth={r === 1 && c === 1 ? 1.4 : 1} />))}
        <circle cx="24" cy="22" r="9" fill="url(#fine)" stroke={L} /><rect x="40" y="16" width="56" height="6" rx="3" fill={F} />
      </g>
      <g transform={ISO(290, 128)}><rect width="44" height="44" rx="10" fill="#fff" stroke={L} /><rect width="44" height="12" rx="6" fill="url(#hatch)" /></g>
      <path d="M232 150 C250 150 262 140 270 128" fill="none" stroke={INK} strokeOpacity="0.45" strokeDasharray="2 3" />
      <Node x={150} y={50} /><Node x={290} y={128} />
    </svg>
  )
}

function ArtInsight() {
  const T = ({ x, y, h, fill, s = L }: { x: number; y: number; h: number; fill: string; s?: string }) => (
    <g><path d={`M${x} ${y} l26 -15 l26 15 l-26 15 z`} fill="#fff" stroke={s} /><path d={`M${x} ${y} v${h} l26 15 v-${h} z`} fill={fill} stroke={s} /><path d={`M${x + 52} ${y} v${h} l-26 15 v-${h} z`} fill="#fff" stroke={s} /></g>
  )
  return (
    <svg width="560" height="240" viewBox="0 0 560 240"><Defs />
      <Guide d="M20 210 L280 80 L540 210" />
      <g transform={ISO(280, 60)}><rect width="300" height="160" rx="14" fill="#fff" stroke={F} /></g>
      {[[150, 150, 60, 'url(#hatch)'], [210, 120, 90, 'url(#hatch)'], [270, 96, 110, 'url(#fine)'], [330, 128, 70, 'url(#hatch)']].map(([x, y, h, f], i) => <T key={i} x={x as number} y={y as number} h={h as number} fill={f as string} />)}
      <T x={390} y={92} h={104} fill="url(#hatchv)" s={V} />
      <g transform="translate(420 30)"><rect width="88" height="26" rx="13" fill="#fff" stroke={L} /><circle cx="14" cy="13" r="4" fill={V} /><text x="24" y="17" fontSize="11" fontFamily="Inter Variable" fill={INK}>Focus 15h</text></g>
      <path d="M440 56 L428 88" stroke={V} strokeDasharray="2 3" />
    </svg>
  )
}

function Cell({ w, h, title, body, chips, art, artH = 250 }: { w: number; h: number; title: string; body: string; chips: string[]; art: ReactNode; artH?: number }) {
  return (
    <div className="relative overflow-hidden rounded-[24px]" style={{ width: w, height: h, background: '#f6f6f6', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.05)' }}>
      <svg aria-hidden className="absolute inset-0" width={w} height={h}>
        {Array.from({ length: 14 }, (_, i) => <line key={i} x1={-200 + i * 70} y1={h} x2={w / 2 + (i - 7) * 18} y2={-40} stroke="rgb(0 0 0 / 0.045)" strokeDasharray="2 5" />)}
      </svg>
      <div className="absolute left-6 top-6 text-[18px] font-[600] tracking-[-0.02em]">{title}</div>
      <div className="absolute inset-x-0 top-[36px] flex justify-center" style={{ height: artH }}>{art}</div>
      <div className="absolute inset-x-6 bottom-6">
        <p className="text-[14px] leading-[22px]" style={{ color: '#5c5c5c' }}>{body}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{chips.map((c) => <span key={c} className="flex h-[26px] items-center rounded-full bg-white px-3 text-[11px] font-[600] tracking-[0.02em]" style={{ boxShadow: '0 0 0 1px rgb(0 0 0 / 0.07)', color: '#2a2a2a' }}>{c}</span>)}</div>
      </div>
    </div>
  )
}

export default function Bento() {
  return (
    <div className="relative" style={{ width: 1440, height: 1180, background: '#ffffff', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: INK }}>
      <div className="absolute inset-x-0 top-[96px] text-center">
        <h2 className="text-[44px] font-[550] leading-[1.06] tracking-[-0.04em]">Every Hour, Accounted For</h2>
        <p className="mx-auto mt-4 text-[17px] leading-[26px]" style={{ color: '#5c5c5c' }}>Cadence finds the time, guards the focus and settles the conflicts,<br />so your week arrives already arranged.</p>
      </div>
      <div className="absolute left-[108px] top-[300px] flex flex-col gap-6">
        <div className="flex gap-6">
          <Cell w={392} h={434} title="Find a time" art={<ArtFind />} body="Cadence reads every guest's calendar and puts the one hour that works for all of them on the table." chips={['GOOGLE', 'OUTLOOK', 'TIME ZONES']} />
          <Cell w={392} h={434} title="Focus time" art={<ArtFocus />} body="Deep work is a real block on the calendar. Requests that would break it get a polite later slot." chips={['FOCUS BLOCKS', 'AUTO DECLINE']} />
          <Cell w={392} h={434} title="Conflicts" art={<ArtConflict />} body="When two meetings collide, Cadence moves the one with the most flexible guests to their next shared slot." chips={['OVERLAPS', 'RESCHEDULE', 'NOTIFY']} />
        </div>
        <div className="flex gap-6">
          <Cell w={600} h={387} title="Scheduling links" art={<ArtLink />} artH={230} body="Share one link. People pick from the slots you actually have, and the event lands on both calendars." chips={['BOOKING PAGES', 'ROUND ROBIN', 'BUFFERS', 'ZOOM', 'MEET']} />
          <Cell w={600} h={387} title="Weekly insight" art={<ArtInsight />} artH={230} body="See how much of the week went to meetings and how much to work, per person and per team." chips={['FOCUS HOURS', 'MEETING LOAD', 'TEAM REPORTS']} />
        </div>
      </div>
    </div>
  )
}
