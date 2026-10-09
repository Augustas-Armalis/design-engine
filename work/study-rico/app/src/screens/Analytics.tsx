// Recreation of rico's (@_heyrico) light analytics crop (knowledge/benchmarks/heyrico/analytics-light-cropped-window.jpg).
// Private study. Coordinates are page CSS px measured from the reference at scale 1.7578 (832x1024 frame).
import type { CSSProperties, ReactNode } from 'react'
import {
  ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, CirclePlus, Command, Megaphone,
  MessageCirclePlus, Rocket, Workflow,
} from 'lucide-react'
import { RiGlobalLine, RiApps2Line, RiApps2AddLine, RiLockFill, RiMoneyDollarCircleFill, RiStackFill, RiSideBarLine } from '@remixicon/react'
import { ChartBar, Sidebar, CalendarBlank } from '@phosphor-icons/react'
import { mainDotted, mainSolid, sessDotted, sessSolid } from '../data/chart'

const C = {
  canvas: '#fafafa', page: '#fafafa', white: '#ffffff', line: '#ededed', hair: '#efefef',
  strong: '#262626', sub: '#6e6e6e', muted: '#9b9b9b', active: '#ededed', blue: '#0077e6', chart: '#519dfa',
  pos: '#30934f', neg: '#d2434b',
}
const abs = (x: number, y: number, w?: number, h?: number): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h })
const ICON = { size: 14, strokeWidth: 1.5, color: C.sub }

function Row({ y, icon, label, active, x = 68 }: { y: number; icon?: ReactNode; label: string; active?: boolean; x?: number }) {
  return (
    <div style={{ ...abs(x, y, 236, 28), background: active ? C.active : undefined, borderRadius: 8 }} className="flex items-center gap-[10px] px-[8px]">
      {icon && <span className="flex size-[14px] items-center justify-center">{icon}</span>}
      <span className="text-[13px] leading-[16px] font-[500]" style={{ color: active ? C.strong : C.sub, paddingLeft: icon ? 0 : 24 }}>{label}</span>
    </div>
  )
}
function Label({ y, children }: { y: number; children: string }) {
  return <div style={{ ...abs(76, y, 200, 16), color: C.sub }} className="text-[12px] leading-[16px] font-[400] tracking-[-0.3px]">{children}</div>
}
function Glass({ hue }: { hue: [string, string] }) {
  return <span className="block size-[17px] shrink-0 rounded-[5px]" style={{ background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,.85), transparent 45%), linear-gradient(135deg, ${hue[0]}, ${hue[1]})`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,.08)' }} />
}
function Chip({ x, w, icon, label }: { x: number; w: number; icon: ReactNode; label: string }) {
  return (
    <div style={{ ...abs(x, 156, w, 28), border: `1px solid ${C.line}`, borderRadius: 6, background: C.white, color: C.strong }} className="flex items-center gap-[6px] whitespace-nowrap pl-[6px] pr-[7px]">
      <span className="flex size-[14px] -translate-y-[1px] items-center justify-center" style={{ color: C.sub }}>{icon}</span>
      <span className="text-[13px] leading-[16px] font-[500]">{label}</span>
      <ChevronsUpDown size={14} strokeWidth={1.75} className="ml-auto" color={C.strong} />
    </div>
  )
}
function CardLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <div style={{ ...abs(x, y), color: C.sub, borderBottom: '1px dashed #dedede', paddingBottom: 1 }} className="flex items-center gap-[2.7px] whitespace-nowrap">
      <RiGlobalLine size={13} />
      <span className="text-[12px] leading-[16px] font-[500]">{children}</span>
    </div>
  )
}
function Spark({ x, y, hs }: { x: number; y: number; hs: number[] }) {
  return (
    <div style={{ ...abs(x, y - 30, 70, 30) }} className="flex items-end gap-[2px]">
      {hs.map((h, i) => <span key={i} className="block w-[8px] rounded-[2px]" style={{ height: h, background: '#ededed' }} />)}
    </div>
  )
}
const path = (pts: [number, number][], ox: number, oy: number) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${(x - ox).toFixed(1)} ${(y - oy).toFixed(1)}`).join(' ')

export default function Analytics() {
  return (
    <div className="relative overflow-hidden" style={{ width: 832, height: 1024, background: C.canvas }}>
      {/* faint dot-matrix fade along the top edge */}
      <div style={{ ...abs(0, 0, 832, 34), backgroundImage: 'radial-gradient(#e9e9e9 0.6px, transparent 0.7px)', backgroundSize: '4px 4px', maskImage: 'linear-gradient(180deg, rgba(0,0,0,.6), transparent)', WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,.6), transparent)' }} />
      <div style={{ ...abs(55, 35, 1000, 953), border: '1px solid #ececec', borderRadius: 16, background: C.white, overflow: 'hidden' }}>
        <div style={abs(-56, -36, 1100, 1024)}>
          {/* bezel */}
          <div style={{ ...abs(56, 86, 1000, 1), background: '#f2f2f2' }} />
          {[['#ee6a5f', 76], ['#f5bf4f', 97], ['#61c554', 117]].map(([c, x]) => (
            <span key={x as number} style={{ ...abs(x as number, 56, 12, 12), background: c as string, borderRadius: 99, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,.12)' }} />
          ))}
          <span style={{ ...abs(155, 54.3, 20, 15), border: '1.5px solid #6b6b6b', borderRadius: 3.5 }}>
            <span style={{ ...abs(6, 0, 1.5, 12), background: '#6b6b6b' }} />
            {[2.5, 5, 7.5].map((t) => <span key={t} style={{ ...abs(1.5, t, 3, 1), background: '#6b6b6b' }} />)}
          </span>
          <span style={{ ...abs(193, 48.3, 26, 26), color: '#6b6b6b' }}><ChevronLeft size={26} strokeWidth={1.5} /></span>
          <span style={{ ...abs(227.2, 48.3, 26, 26), color: '#b5b5b5' }}><ChevronRight size={26} strokeWidth={1.5} /></span>
          <div style={{ ...abs(497, 48, 600, 27), background: '#f2f2f2', borderRadius: 14 }}>
            <span style={{ ...abs(6.7, 6.3, 15.5, 15.5), color: '#737373' }}><CirclePlus size={15} strokeWidth={1.2} /></span>
            <span style={{ ...abs(208.4, 8.1, 11, 11), color: '#999999' }}><RiLockFill size={11} /></span>
            <span style={{ ...abs(224, 5, 200, 17), color: '#3d3d3d' }} className="text-[13px] leading-[17px] tracking-[-0.15px]">acmelabs.com</span>
          </div>

          {/* sidebar */}
          <div style={{ ...abs(56, 87, 259, 901), background: C.page }} />
          <div style={{ ...abs(315, 87, 1, 901), background: C.hair }} />
          <span style={{ ...abs(76, 106, 16, 16), background: '#d1f306', borderRadius: 4 }} className="flex items-center justify-center">
            <span className="block size-[11.5px] rounded-full" style={{ border: '1.5px solid #141414', background: 'linear-gradient(90deg, #141414 50%, transparent 50%)' }} />
          </span>
          <span style={{ ...abs(102, 106, 120, 16), color: C.strong }} className="text-[13px] leading-[16px] font-[500]">Ace Studio</span>
          <span style={{ ...abs(176, 106, 16, 16), color: C.strong }}><ChevronDown size={16} strokeWidth={1.5} /></span>
          <span style={{ ...abs(279, 104, 18, 18), color: C.sub }}><Sidebar size={18} /></span>

          <div style={{ ...abs(68, 138, 236, 28), background: C.white, border: `1px solid ${C.line}`, borderRadius: 8 }} className="flex items-center gap-[10px] px-[7px]">
            <Command {...ICON} />
            <span className="text-[13px] leading-[16px] font-[500]" style={{ color: C.sub }}>Quick actions</span>
            <span className="ml-auto text-[13px] leading-[16px] font-[500]" style={{ color: C.sub }}>K</span>
          </div>

          <Row y={176} icon={<RiApps2Line size={14} color={C.sub} />} label="Home" />
          <Row y={206} icon={<ChartBar size={15} color={C.strong} />} label="Analytics" active />
          <Row y={234} label="Reports" />
          <Row y={262} label="Live view" />
          <Row y={292} icon={<Workflow size={15} strokeWidth={1.4} color={C.sub} />} label="Plan" />
          <Row y={322} icon={<RiApps2AddLine size={14} color={C.sub} />} label="Apps" />

          <Label y={373}>Tools</Label>
          <Row y={396} icon={<Glass hue={['#ff8a3d', '#e9344a']} />} label="Campaign" />
          <Row y={426} icon={<Glass hue={['#4aa8ff', '#9b6bff']} />} label="Creatives" />
          <Row y={456} icon={<Glass hue={['#16b07a', '#53d6c7']} />} label="Briefs" />
          <Row y={486} icon={<Glass hue={['#7b4dff', '#e04df0']} />} label="Workflows" />

          <Label y={536}>Pinned</Label>
          <Row y={560} icon={<MessageCirclePlus {...ICON} />} label="Make a new creative for t..." />
          <Row y={590} icon={<Megaphone {...ICON} />} label="Campaign here" />

          <Label y={640}>Chat</Label>
          {['Launch a marketing campaig...', 'Design a new user interface f...', 'Conduct a user research ses...', 'Create a presentation for sta...'].map((t, i) => (
            <div key={t} style={{ ...abs(68, 664 + i * 30, 236, 28), color: C.sub }} className="flex items-center pl-[10.5px] text-[13px] leading-[16px] font-[500]">{t}</div>
          ))}

          <div style={{ ...abs(68, 901, 236, 35), background: C.white, borderRadius: 10, boxShadow: '0 0 0 1px rgba(0,0,0,.045), 0 2px 5px rgba(0,0,0,.09)' }} className="flex items-center gap-[5px] pl-[13.3px] pr-[15px]">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="-translate-y-[1px]">
              <circle cx="8" cy="8" r="6.25" fill="none" stroke="#d6e6fb" strokeWidth="2" />
              <path d="M8 1.75 A6.25 6.25 0 0 1 12.4 12.4" fill="none" stroke="#1f6fce" strokeWidth="2" strokeLinecap="round" transform="rotate(100 8 8)" />
            </svg>
            <span className="text-[14px] leading-[20px] font-[500] tracking-[-0.31px]" style={{ color: C.strong }}>Getting started</span>
            <span className="ml-auto -translate-y-[1px] text-[13px] leading-[16px] font-[500] tracking-[-0.31px]" style={{ color: '#757575' }}>1 of 5</span>
          </div>
          <div style={{ ...abs(56, 948, 259, 1), background: C.hair }} />
          <span style={{ ...abs(75, 959, 18, 18), background: '#161616', borderRadius: 5 }} className="flex items-center justify-center"><Rocket size={11} color="#fff" strokeWidth={2} /></span>
          <span style={{ ...abs(102, 960, 120, 16), color: C.strong }} className="text-[14px] leading-[16px] font-[500] tracking-[-0.31px]">14 days left</span>
          <span style={{ ...abs(226, 956, 70, 24), background: '#1a1a1a', borderRadius: 7 }} className="flex items-center justify-center text-[13px] font-[500] text-white">Upgrade</span>

          {/* main */}
          <div style={{ ...abs(316, 87, 800, 901), background: C.page }} />
          <span style={{ ...abs(339.5, 116.5, 17, 17), color: C.strong }}><ChartBar size={17} /></span>
          <span style={{ ...abs(361.7, 116, 200, 20), color: C.strong }} className="text-[16px] leading-[20px] font-[500]">Analytics</span>

          <Chip x={341} w={134.5} icon={<CalendarBlank size={15} weight="duotone" />} label="Last 30 days" />
          <Chip x={486} w={112} icon={<CalendarBlank size={15} weight="duotone" />} label="Compare" />
          <Chip x={609} w={83.5} icon={<RiMoneyDollarCircleFill size={14} />} label="USD" />
          <Chip x={703} w={140} icon={<RiStackFill size={14} />} label="All channels" />

          {/* KPI cards */}
          {[{ x: 340, label: 'Gross Sales', value: '$168,920', d: '+47%', pos: true }, { x: 628, label: 'Returning customer rate', value: '27%', d: '-23%', pos: false }].map((k) => (
            <div key={k.x} style={{ ...abs(k.x, 208, 268, 94), background: C.white, border: `1px solid ${C.line}`, borderRadius: 14 }}>
              <CardLabel x={15} y={13}>{k.label}</CardLabel>
              <div style={abs(15, 56)} className="flex items-baseline gap-[7px] whitespace-nowrap">
                <span className="text-[18px] leading-[24px] font-[600]" style={{ color: C.strong, marginRight: k.pos ? 0 : -1, letterSpacing: k.pos ? 0 : -0.7 }}>{k.value}</span>
                <span className="text-[11px] leading-[16px] font-[500]" style={{ color: k.pos ? C.pos : C.neg }}>{k.d}</span>
              </div>
              <Spark x={183} y={80} hs={[20, 23, 26, 17, 19, 16, 20]} />
            </div>
          ))}

          {/* chart card */}
          <div style={{ ...abs(340, 322, 556, 376), background: C.white, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <CardLabel x={15} y={15}>Total sales over time</CardLabel>
            <span style={{ ...abs(15, 43), color: C.strong }} className="text-[18px] leading-[24px] font-[600]">$168,920</span>
            {['20k', '15k', '10k', '5k', '0'].map((t, i) => (
              <span key={t} style={{ ...abs(15, 89 + i * 44, 40, 16), color: C.sub }} className="text-[12px] leading-[16px]">{t}</span>
            ))}
            {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ ...abs(65, 96 + i * 44, 600, 1), background: '#f0f0f0' }} />)}
            <svg style={abs(0, 0, 556, 376)} viewBox="0 0 556 376" fill="none" aria-hidden>
              <path d={path(mainDotted, 341, 323)} stroke={C.chart} strokeWidth="1" strokeDasharray="1.5 1.5" opacity=".9" />
              <path d={path(mainSolid, 341, 323)} stroke={C.chart} strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            {[['Jul 1', 100], ['Jul 7', 237], ['Jul 14', 373]].map(([t, x]) => (
              <span key={t as string} style={{ ...abs(x as number, 295, 60, 16), color: '#757575' }} className="text-[12px] leading-[16px]">{t}</span>
            ))}
            <div style={abs(294, 336)} className="flex items-center gap-[21px] whitespace-nowrap text-[12px] leading-[16px] font-[500]">
              <span className="flex items-center gap-[6px]" style={{ color: C.sub }}><i className="block size-[6px] rounded-full" style={{ background: C.blue }} />Jul 24, 2026</span>
              <span className="flex items-center gap-[6px]" style={{ color: C.sub }}><i className="block size-[6px] rounded-full" style={{ background: C.chart }} />Jul 23, 2026</span>
            </div>
          </div>

          {/* top products */}
          <div style={{ ...abs(340, 718, 364, 300), background: C.white, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <CardLabel x={15} y={15}>Top products</CardLabel>
            {[
              { n: 'Vitamin C serum', v: '$74,300', u: '400', w: 332, t: ['#f7b733', '#fc4a1a'] },
              { n: 'Hydrating face mask', v: '$58,200', u: '300', w: 245, t: ['#a0705a', '#3b2a22'] },
              { n: 'Retinol night cream', v: '$67,500', u: '210', w: 199, t: ['#f1f1f1', '#9a9a9a'] },
              { n: 'SPF 50 sunscreen', v: '$61,400', u: '120', w: 164, t: ['#f9c74f', '#f3722c'] },
            ].map((p, i) => (
              <div key={p.n} style={{ ...abs(15, 54 + i * 54, 333, 40), filter: i === 3 ? 'blur(2.5px)' : undefined, opacity: i === 3 ? 0.8 : 1 }}>
                <div className="flex h-[16px] items-center text-[12px] leading-[16px]" style={{ color: C.sub }}>
                  <span className="mr-[7px] block size-[15px] rounded-[4px]" style={{ background: `linear-gradient(135deg, ${p.t[0]}, ${p.t[1]})` }} />
                  <span className="font-[500]">{p.n}</span>
                  <span className="ml-auto w-[60px] translate-y-[0.6px] text-right tracking-[-0.31px]">{p.v}</span>
                  <span className="w-[52px] text-right tracking-[-0.31px]">{p.u}</span>
                </div>
                <div style={{ ...abs(0, 23, p.w, 10), background: C.blue, borderRadius: 3 }} />
              </div>
            ))}
          </div>

          {/* session card (cropped) */}
          <div style={{ ...abs(724, 718, 300, 300), background: C.white, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <CardLabel x={15} y={15}>Session over time</CardLabel>
            <span style={{ ...abs(15, 42), color: C.strong }} className="text-[18px] leading-[24px] font-[600]">2</span>
            {['15k', '10k', '5k', '0'].map((t, i) => (
              <span key={t} style={{ ...abs(15, 81 + i * 44, 40, 16), color: C.sub, filter: i === 3 ? 'blur(2px)' : undefined }} className="text-[12px] leading-[16px]">{t}</span>
            ))}
            {[0, 1, 2, 3].map((i) => <span key={i} style={{ ...abs(65, 89 + i * 44, 300, 1), background: '#f0f0f0' }} />)}
            <svg style={abs(0, 0, 300, 300)} viewBox="0 0 300 300" fill="none" aria-hidden>
              <path d={path(sessDotted, 725, 719)} stroke={C.chart} strokeWidth="1" strokeDasharray="1.5 1.5" />
              <path d={path(sessSolid, 725, 719)} stroke={C.chart} strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          {/* bottom blur band (the reference fades the last row) */}
          <div style={{ ...abs(316, 922, 800, 66), backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', maskImage: 'linear-gradient(180deg, transparent, #000 40%)', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 40%)' }} />
        </div>
      </div>
    </div>
  )
}
