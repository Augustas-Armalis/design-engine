// Replica: AlignUI PRO "Features 04" bento (pro.alignui.com/block-preview/default/features-04, captured 2026-10-21 at
// 1440 wide @2x -> knowledge/benchmarks/bento/alignui-live-bento@2x.png, 2880x2090 = 1440x1045 CSS).
// Outer layer from the live DOM's computed styles; the three inner cards are raster images on the live page, so they are
// rebuilt from pixel probes (positions in CSS px from each inner card's origin). Sample data, study only.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiBarChartFill, RiDiscussFill, RiMacFill, RiFolderChart2Fill, RiPieChartFill, RiUserFill, RiInformationFill,
  RiUser3Line, RiTimeLine, RiFocus3Line, RiArrowUpLine, RiArrowDownLine, RiArrowLeftDownLine, RiArrowRightUpLine,
} from '@remixicon/react'

const ink = '#171717', sub = '#5c5c5c', soft = '#a3a3a3', blue = '#335cff'
const font = '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
// AlignUI elevation recipes (computed on the live page)
const xsLift = 'rgba(23,23,23,0.04) 0px 3px 3px -1.5px, rgba(23,23,23,0.04) 0px 1px 1px -0.5px'
const tabShadow = `${xsLift}, #ebebeb 0px 0px 0px 1px`
const tileShadow = `${xsLift}, rgba(23,23,23,0.02) 0px 0px 0px 1px`
const P = (s: CSSProperties): CSSProperties => ({ position: 'absolute', whiteSpace: 'nowrap', ...s })

// type tuples (size / line-height / weight / tracking)
const t14: CSSProperties = { fontSize: 14, lineHeight: '20px', fontWeight: 400, letterSpacing: -0.084 }
const t12: CSSProperties = { fontSize: 12, lineHeight: '16px', fontWeight: 400 }

function Tab({ icon, children, active }: { icon: ReactNode; children: ReactNode; active?: boolean }) {
  return (
    <span className="flex items-center" style={{ height: 40, padding: '8px 14px', gap: 8, borderRadius: 12, fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: -0.176,
      background: active ? 'rgba(71,108,255,0.1)' : '#fff', color: active ? blue : sub, boxShadow: active ? 'none' : tabShadow }}>
      <span className="flex" style={{ color: active ? blue : soft, transform: 'scale(0.9)' }}>{icon}</span>{children}
    </span>
  )
}

// small stroke button inside the inner cards (AlignUI neutral stroke, xxsmall: 28 high, radius 8)
const MiniBtn = ({ x, w, children }: { x: number; w: number; children: ReactNode }) => (
  <span className="flex items-center justify-center" style={P({ left: x, top: 21, width: w, height: 27.5, borderRadius: 8, background: '#fff', color: sub, ...t14, letterSpacing: 0,
    boxShadow: 'inset 0 0 0 1px #ebebeb, 0 1px 2px rgba(10,13,20,0.03)' })}>{children}</span>
)

// the white inner card: ring outside the white, a 2-layer lift underneath (concentric: 32 outer - 10 padding = 22)
const Inner = ({ children }: { children: ReactNode }) => (
  <div className="relative" style={{ width: 372, height: 326.9 }}>
    <div style={P({ left: 1, top: 1, width: 369, height: 321.5, borderRadius: 23.5, background: '#fff', transform: 'translateX(0.5px)',
      boxShadow: '0 0 0 1px rgba(23,23,23,0.022), 0 1px 1px -0.5px rgba(23,23,23,0.045), 0 3px 3px -1.5px rgba(23,23,23,0.045)' })} />
    <div style={P({ inset: 0 })}>{children}</div>
  </div>
)

const Big = ({ x, children }: { x: number; children: ReactNode }) => (
  <span style={P({ left: x, top: 44.5, fontSize: 23.8, lineHeight: '32px', fontWeight: 400, color: ink })}>{children}</span>
)
const Pill = ({ x, w, bg, fg, children }: { x: number; w: number; bg: string; fg: string; children: ReactNode }) => (
  <span className="flex items-center justify-center" style={P({ left: x, top: 50.5, width: w, height: 20, borderRadius: 999, background: bg, color: fg, fontSize: 12, lineHeight: '16px', fontWeight: 500 })}>{children}</span>
)

function Marketing() {
  const rows: [ReactNode, string, string, boolean, string][] = [
    [<RiUser3Line size={18} />, 'Acquisition', '$38.25', true, '+5.2%'],
    [<RiTimeLine size={18} />, 'Conversion', '4.2 days', false, '+3.8%'],
    [<RiFocus3Line size={18} />, 'ROI', '324%', true, '+4.5%'],
  ]
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>Marketing Channels</span>
      <span style={P({ left: 156.3, top: 23.8, color: '#d1d1d1', display: 'flex' })}><RiInformationFill size={14} /></span>
      <MiniBtn x={285} w={65.5}>Details</MiniBtn>
      <Big x={21}>82%</Big>
      <span style={P({ left: 79.3, top: 50, ...t14, letterSpacing: 0, color: sub })}><span style={{ color: '#1fc16b', letterSpacing: -0.55 }}>+2.1%</span> vs last week</span>
      {[[21, 127.5, '#fa7319'], [153, 145.5, '#f6b51e'], [303, 48, '#22d3bb']].map(([x, w, c]) => (
        <span key={c as string} style={P({ left: x as number, top: 96, width: w as number, height: 12.5, borderRadius: 4, background: c as string })} />
      ))}
      {[[21, 'Organic Search', '#fa7319'], [144, 'Social Media', '#f6b51e'], [252, 'Direct', '#22d3bb']].map(([x, l, c]) => (
        <span key={l as string} className="flex items-center" style={P({ left: x as number, top: 124, gap: 4, ...t12, color: sub })}>
          <span className="grid place-items-center" style={{ width: 16, height: 16 }}><i style={{ width: 8, height: 8, borderRadius: 99, background: c as string }} /></span>{l}
        </span>
      ))}
      <span style={P({ left: 21, top: 161, width: 330, height: 1, backgroundImage: 'linear-gradient(90deg, #ebebeb 0 5px, transparent 5px 8px)', backgroundSize: '8px 1px' })} />
      {[[21, 'Channels'], [200, 'Metric'], [287, 'Total']].map(([x, l]) => (
        <span key={l as string} style={P({ left: x as number, top: 183, ...t12, color: soft })}>{l}</span>
      ))}
      {rows.map(([ic, l, m, up, d], i) => (
        <div key={l}>
          <span style={P({ left: 23, top: 215.75 + i * 35.75, color: soft, display: 'flex' })}>{ic}</span>
          <span style={P({ left: 47, top: 215 + i * 35.75, ...t14, letterSpacing: 0, color: sub })}>{l}</span>
          <span style={P({ left: 202, top: 215.25 + i * 35.75, ...t14, letterSpacing: 0, color: sub })}>{m}</span>
          <span style={P({ left: 286.5, top: 216.5 + i * 35.75, color: up ? '#1fc16b' : '#fb3748', display: 'flex' })}>{up ? <RiArrowUpLine size={17.5} /> : <RiArrowDownLine size={17.5} />}</span>
          <span style={P({ left: 307, top: 215 + i * 35.75, ...t14, letterSpacing: -0.55, color: sub })}>{d}</span>
        </div>
      ))}
    </Inner>
  )
}

function Traffic() {
  const cols: [number, string, string, string, boolean, string][] = [
    [21, 'Desktop', '27%', '-3.2%', false, '#f6b51e'],
    [142, 'Tablet', '12%', '-6.4%', false, '#47c2ff'],
    [262, 'Mobile', '61%', '+0.8%', true, '#7d52f4'],
  ]
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>Total Visitors</span>
      <MiniBtn x={286} w={65}>Report</MiniBtn>
      <Big x={21}>237,456</Big>
      <Pill x={115.5} w={47.5} bg="#ffc0c5" fg="#681219">-1.4%</Pill>
      <span style={P({ left: 21, top: 97.5, width: 330, height: 1, background: '#ebebeb' })} />
      {[126.5, 246.5].map((x) => <span key={x} style={P({ left: x, top: 120, width: 1, height: 183, background: '#ebebeb' })} />)}
      {cols.map(([x, l, v, d, up, c]) => (
        <div key={l}>
          <span style={P({ left: x, top: 120, ...t14, letterSpacing: 0, color: soft })}>{l}</span>
          <span style={P({ left: x, top: 143.7, fontSize: 19.8, lineHeight: '28px', fontWeight: 400, color: ink })}>{v}</span>
          <span className="flex items-center" style={P({ left: x, top: 259, gap: 3, ...t14, letterSpacing: -0.5, color: sub })}>{d}
            <span className="flex" style={{ color: up ? '#1fc16b' : '#fb3748' }}>{up ? <RiArrowRightUpLine size={20} /> : <RiArrowLeftDownLine size={20} />}</span></span>
          <span style={P({ left: x, top: 294.5, width: 89, height: 8.5, borderRadius: 2, background: c })} />
        </div>
      ))}
    </Inner>
  )
}

// retention: 12 cohorts x 12 periods, triangle; d = dark (blue-500), m = mid, l = light
const RET = ['dmmmmmllllll', 'mmmmlmmmmll', 'dmlmllmmml', 'ddddldmml', 'dmllmlml', 'dmlmmlm', 'ddmlmm', 'dllll', 'mdll', 'mlm', 'ml', 'd']
const RC: Record<string, string> = { d: '#335cff', m: '#9db1ff', l: '#ced8ff' }
function Retention() {
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>User Retention</span>
      <MiniBtn x={285} w={65.5}>Details</MiniBtn>
      <Big x={21}>24%</Big>
      <Pill x={79} w={51.5} bg="#c2f5da" fg="#0b4627">+2.0%</Pill>
      {RET.map((row, r) => row.split('').map((k, c) => (
        <span key={`${r}-${c}`} style={P({ left: 21 + c * 27.64, top: 96 + r * 15.97, width: 26, height: 15, borderRadius: 2, background: RC[k] })} />
      )))}
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="text-center" style={P({ left: 21 + i * 27.64, top: 297, width: 26, ...t12, color: soft })}>{i + 1}</span>
      ))}
    </Inner>
  )
}

function Card({ icon, title, body, children }: { icon: ReactNode; title: string; body: string; children: ReactNode }) {
  return (
    <article className="flex flex-col" style={{ background: '#f7f7f7', borderRadius: 32, padding: 10, gap: 32 }}>
      <div className="flex flex-col" style={{ padding: '30px 30px 0' }}>
        <span className="grid place-items-center" style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', boxShadow: tileShadow, color: blue }}><span className="flex" style={{ transform: 'scale(0.9)' }}>{icon}</span></span>
        <h3 style={{ margin: '32px 0 0', fontSize: 20, lineHeight: '28px', fontWeight: 500, color: ink }}>{title}</h3>
        <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: '24px', fontWeight: 500, letterSpacing: -0.176, color: sub }}>{body}</p>
      </div>
      {children}
    </article>
  )
}

export default function AlignBento() {
  return (
    <div className="ab-root" style={{ width: 1440, height: 1045, background: '#fff', fontFamily: font, color: '#2e2e2e', fontSize: 16, lineHeight: '24px' }}>
      <style>{`.ab-root, .ab-root * { corner-shape: round; }`}</style>
      <section style={{ width: 1280, margin: '0 auto', padding: '96px 28px' }}>
        <div className="flex flex-col items-center text-center">
          <span className="flex items-center" style={{ height: 28, padding: '0 10px 0 7px', gap: 4, borderRadius: 9, background: '#f7f7f7', fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: -0.084, color: sub }}>
            <span className="grid place-items-center" style={{ width: 16, height: 16 }}><i style={{ width: 6, height: 6, borderRadius: 99, background: blue }} /></span>Smart features
          </span>
          <h2 style={{ margin: '12px 0 0', fontSize: 48, lineHeight: '56px', fontWeight: 550, letterSpacing: -0.48, color: ink }}>Real-time metrics, smarter growth</h2>
          <p style={{ margin: '16px 0 0', width: 528, fontSize: 16, lineHeight: '24px', fontWeight: 400, letterSpacing: -0.176, color: sub }}>
            Track key metrics, automate workflows, and help your team stay <span style={{ fontWeight: 500 }}>focused on closing more deals.</span>
          </p>
        </div>
        <div className="flex flex-col" style={{ marginTop: 40, gap: 40 }}>
          <div className="flex justify-center" style={{ gap: 12 }}>
            <Tab active icon={<RiBarChartFill size={22} />}>Channel performance</Tab>
            <Tab icon={<RiDiscussFill size={22} />}>Engagement trends</Tab>
            <Tab icon={<RiMacFill size={22} />}>Cross-device behavior</Tab>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 392px)', gap: 24 }}>
            <Card icon={<RiFolderChart2Fill size={28} />} title="Marketing insights" body="Understand what's working—and what's not—with live performance data."><Marketing /></Card>
            <Card icon={<RiPieChartFill size={28} />} title="Traffic by device" body="Track visitor trends by platform and spot shifts in real-time usage."><Traffic /></Card>
            <Card icon={<RiUserFill size={28} />} title="Retention overview" body="See how users engage over time with calendar-style retention charts."><Retention /></Card>
          </div>
        </div>
      </section>
    </div>
  )
}
