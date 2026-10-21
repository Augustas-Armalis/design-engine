// Cadence feature section in AlignUI's measured PRO "Features 04" grammar (replica AlignBento.tsx, spec
// work/replicas/ALIGN-AFFECT-BENTO-NOTES.md): chip + 48/550 h2 + sub, tab row, three 392px grey wells (#f7f7f7, r32,
// padding 10, gap 32), 48px icon tile, 20/500 title, 16/500 description, a white inner card r22 (concentric 32 - 10) with
// a 28px stroke button, a 24px headline number, a tinted pill and a chart from y 96. Same primitives and recipes as the
// replica; all content is Cadence sample data.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiCalendarScheduleFill, RiFocus2Fill, RiTeamFill, RiCalendarCheckFill, RiTimerFlashFill, RiGroupFill, RiInformationFill,
  RiCheckLine, RiCloseLine, RiArrowLeftDownLine, RiArrowRightUpLine,
} from '@remixicon/react'

const ink = '#171717', sub = '#5c5c5c', soft = '#6b6b6b', blue = '#335cff' // AlignUI soft #a3a3a3 is 2.35:1 on white; ours clears AA
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
      background: active ? 'rgba(71,108,255,0.1)' : '#fff', color: active ? '#2a4ee6' : sub, boxShadow: active ? 'none' : tabShadow }}>
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

function FindTime() {
  const guests: [string, string, string, boolean, string][] = [
    ['M', '#3f51c9', 'Maya Chen', true, 'Free'],
    ['T', '#1f7a52', 'Theo Park', true, 'Free'],
    ['A', '#9a5a33', 'Ana Ruiz', false, 'Moves 1:1'],
  ]
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>Best slot for 3 guests</span>
      <span style={P({ left: 168, top: 23.8, color: '#d1d1d1', display: 'flex' })}><RiInformationFill size={14} /></span>
      <MiniBtn x={285} w={65.5}>Invite</MiniBtn>
      <Big x={21}>Wed 14:30</Big>
      <span style={P({ left: 140, top: 50, ...t14, letterSpacing: 0, color: sub })}><span style={{ color: '#128a4e' }}>45 min</span> fits everyone</span>
      {[[21, 150, '#335cff'], [175, 104, '#9db1ff'], [283, 68, '#ced8ff']].map(([x, w, c]) => (
        <span key={c as string} style={P({ left: x as number, top: 96, width: w as number, height: 12.5, borderRadius: 4, background: c as string })} />
      ))}
      {[[21, 'Meetings', '#335cff'], [117, 'Focus', '#9db1ff'], [190, 'Free time', '#ced8ff']].map(([x, l, c]) => (
        <span key={l as string} className="flex items-center" style={P({ left: x as number, top: 124, gap: 4, ...t12, color: sub })}>
          <span className="grid place-items-center" style={{ width: 16, height: 16 }}><i style={{ width: 8, height: 8, borderRadius: 99, background: c as string }} /></span>{l}
        </span>
      ))}
      <span style={P({ left: 21, top: 161, width: 330, height: 1, backgroundImage: 'linear-gradient(90deg, #ebebeb 0 5px, transparent 5px 8px)', backgroundSize: '8px 1px' })} />
      {[[21, 'Guest'], [200, 'Status'], [287, 'Fit']].map(([x, l]) => (
        <span key={l as string} style={P({ left: x as number, top: 183, ...t12, color: soft })}>{l}</span>
      ))}
      {guests.map(([ini, c, name, ok, st], i) => (
        <div key={name}>
          <span className="grid place-items-center" style={P({ left: 21, top: 216 + i * 35.75, width: 20, height: 20, borderRadius: 99, background: c, color: '#fff', fontSize: 10, lineHeight: '12px', fontWeight: 500 })}>{ini}</span>
          <span style={P({ left: 49, top: 215 + i * 35.75, ...t14, letterSpacing: 0, color: sub })}>{name}</span>
          <span style={P({ left: 202, top: 215.25 + i * 35.75, ...t14, letterSpacing: 0, color: sub })}>{st}</span>
          <span style={P({ left: 286.5, top: 216.5 + i * 35.75, color: ok ? '#1fc16b' : '#fa7319', display: 'flex' })}>{ok ? <RiCheckLine size={17.5} /> : <RiCloseLine size={17.5} />}</span>
          <span style={P({ left: 307, top: 215 + i * 35.75, ...t14, letterSpacing: -0.3, color: sub })}>{ok ? '100%' : '80%'}</span>
        </div>
      ))}
    </Inner>
  )
}

function Focus() {
  const cols: [number, string, string, string, boolean, string][] = [
    [21, 'Deep work', '52%', '+6.0%', true, '#7d52f4'],
    [142, 'Meetings', '31%', '-4.5%', false, '#335cff'],
    [262, 'Admin', '17%', '-1.5%', false, '#47c2ff'],
  ]
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>Focus this week</span>
      <MiniBtn x={286} w={65}>Report</MiniBtn>
      <Big x={21}>14h 30m</Big>
      <Pill x={122} w={50} bg="#c2f5da" fg="#0b4627">+2.5h</Pill>
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

// team meeting load: 7 people x 12 hours (8:00-19:00); d = in meetings, m = partly, l = free
const LOAD = ['llddmlllmdll', 'lmddllmmllll', 'lldmllldddml', 'llmmlllmmlll', 'ldddmlllmmll', 'llmllldddlll', 'lmmlllmmllll']
const LC: Record<string, string> = { d: '#335cff', m: '#9db1ff', l: '#ced8ff' }
function Load() {
  return (
    <Inner>
      <span style={P({ left: 21, top: 20.5, ...t14, letterSpacing: 0, color: sub })}>Team meeting load</span>
      <MiniBtn x={285} w={65.5}>Details</MiniBtn>
      <Big x={21}>31%</Big>
      <Pill x={79} w={51.5} bg="#c2f5da" fg="#0b4627">-4.0%</Pill>
      {LOAD.map((row, r) => row.split('').map((k, c) => (
        <span key={`${r}-${c}`} style={P({ left: 21 + c * 27.64, top: 96 + r * 27.2, width: 26, height: 25.6, borderRadius: 3, background: LC[k] })} />
      )))}
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="text-center" style={P({ left: 21 + i * 27.64, top: 297, width: 26, ...t12, color: soft })}>{i + 8}</span>
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
      <div data-product>{children}</div>
    </article>
  )
}

export default function CadenceAlign() {
  return (
    <div className="ab-root" style={{ width: 1440, height: 1045, background: '#fff', fontFamily: font, color: '#2e2e2e', fontSize: 16, lineHeight: '24px' }}>
      <style>{`.ab-root, .ab-root * { corner-shape: round; }`}</style>
      <section data-subject style={{ width: 1280, margin: '0 auto', padding: '96px 28px' }}>
        <div className="flex flex-col items-center text-center">
          <span className="flex items-center" style={{ height: 28, padding: '0 10px 0 7px', gap: 4, borderRadius: 9, background: '#f7f7f7', fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: -0.084, color: sub }}>
            <span className="grid place-items-center" style={{ width: 16, height: 16 }}><i style={{ width: 6, height: 6, borderRadius: 99, background: blue }} /></span>Smart scheduling
          </span>
          <h2 style={{ margin: '12px 0 0', fontSize: 48, lineHeight: '56px', fontWeight: 550, letterSpacing: -0.48, color: ink }}>Every meeting, already arranged</h2>
          <p style={{ margin: '16px 0 0', width: 528, fontSize: 16, lineHeight: '24px', fontWeight: 400, letterSpacing: -0.176, color: sub }}>
            Cadence finds the time, protects deep work and balances the load, <span style={{ fontWeight: 500 }}>so your team stays on its real work.</span>
          </p>
        </div>
        <div className="flex flex-col" style={{ marginTop: 40, gap: 40 }}>
          <div className="flex justify-center" style={{ gap: 12 }}>
            <Tab active icon={<RiCalendarScheduleFill size={22} />}>This week</Tab>
            <Tab icon={<RiTimerFlashFill size={22} />}>Focus trends</Tab>
            <Tab icon={<RiGroupFill size={22} />}>Team balance</Tab>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 392px)', gap: 24 }}>
            <Card icon={<RiCalendarCheckFill size={28} />} title="Find a time" body="Reads every guest's calendar and proposes the one slot that works."><FindTime /></Card>
            <Card icon={<RiFocus2Fill size={28} />} title="Focus time" body="Deep work is a real block. See how much of the week it kept."><Focus /></Card>
            <Card icon={<RiTeamFill size={28} />} title="Team load" body="Spot the hours where meetings pile up, and move them before anyone burns out."><Load /></Card>
          </div>
        </div>
      </section>
    </div>
  )
}
