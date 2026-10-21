// Cadence feature section v5, replicate-first from Linear's figure triptych
// (knowledge/benchmarks/bento/linear-fig-triptych.png): a two-tone statement headline, then columns split by 1px
// hairlines, each with a mono FIG label, ONE quiet object drawn in 2:1 dimetric with a single hairline weight and white
// faces shaded by the measured ramp (ISO-19..30), the answer in a violet tint family with a soft glow, and a small title + muted line at the bottom. The idea is carried by
// the geometry alone: the raised piece is the answer. Light mode. Sample content.
import type { ReactNode } from 'react'
import { IsoScene, Plate, useIso, useStroke, topPlane, planeRoundRect, polyPath } from './iso'

const INK = '#171717'
const Scene = ({ children, y = 150 }: { children: ReactNode; y?: number }) => (
  <IsoScene width={400} height={360} mode="shaded-light" kind="dimetric" scale={1.3} accent="#6e3ff3" origin={{ x: 200, y: y * 1.25 }}>{children}</IsoScene>
)

function Lines({ x, y, z, w, n = 2 }: { x: number; y: number; z: number; w: number; n?: number }) {
  const { P } = useIso(); const s = useStroke('detail')
  const pl = topPlane(x, y, z)
  return <g><path d={planeRoundRect(P, pl, 10, 10, w * 0.4, 6, 3)} {...s} />{Array.from({ length: n }, (_, i) => <path key={i} d={polyPath(P, [[x + 10, y + 26 + i * 8, z], [x + 10 + w * (i ? 0.45 : 0.65), y + 26 + i * 8, z]])} {...s} />)}</g>
}

function FigFind() {
  const W = 120, D = 120
  return (
    <Scene y={140}>
      {[0, 1, 2, 3, 4].map((i) => <Plate key={i} at={[-W / 2, -D / 2, i * 9]} w={W} d={D} h={6} r={10} level={i === 4 ? 'primary' : 'secondary'} sides="shaded" edgeHighlight />)}
      <WeekGrid z={42} />
      <Plate at={[-6, -48, 62]} w={20} d={44} h={6} r={5} level="focal" sides="shaded" edgeHighlight tone="tint" />
    </Scene>
  )
}
function WeekGrid({ z }: { z: number }) {
  const { P } = useIso(); const s = useStroke('detail')
  return <g>{[1, 2, 3, 4].map((c) => <path key={c} d={polyPath(P, [[-60 + c * 24, -48, z], [-60 + c * 24, 48, z]])} {...s} />)}</g>
}

function FigFocus() {
  return (
    <Scene y={150}>
      <Plate at={[-70, -70, 0]} w={140} d={140} h={10} r={14} level="secondary" sides="shaded" edgeHighlight />
      {[[-70, -70, 140, 8], [-70, 62, 140, 8], [-70, -62, 8, 124], [62, -62, 8, 124]].map(([x, y, w, d], i) => <Plate key={i} at={[x, y, 10]} w={w} d={d} h={22} r={3} level="secondary" sides="shaded" edgeHighlight />)}
      <Plate at={[-34, -34, 10]} w={68} d={68} h={48} r={8} level="focal" sides="shaded" edgeHighlight tone="tint" glow={0.25} />
    </Scene>
  )
}

function FigConflict() {
  return (
    <Scene y={150}>
      <Plate at={[-90, -60, 0]} w={180} d={120} h={8} r={12} level="secondary" sides="shaded" edgeHighlight />
      <Plate at={[-70, -40, 8]} w={60} d={80} h={10} r={8} level="primary" sides="shaded" edgeHighlight />
      <Ghost />
      <Plate at={[10, -40, 38]} w={60} d={80} h={10} r={8} level="focal" sides="shaded" edgeHighlight tone="tint" glow={0.25}><Lines x={10} y={-40} z={48} w={60} n={2} /></Plate>
    </Scene>
  )
}
function Ghost() {
  const { P } = useIso()
  return <path d={planeRoundRect(P, topPlane(10, -40, 8), 0, 0, 60, 80, 8)} fill="none" stroke="rgba(17,17,17,0.22)" strokeDasharray="2 3" />
}

function FigLinks() {
  return (
    <Scene y={160}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const on = i === 3
        return <Plate key={i} at={[-110 + i * 38, -18, on ? 18 : 0]} w={30} d={36} h={on ? 14 : 8} r={6} level={on ? 'focal' : 'secondary'} tone={on ? 'tint' : 'neutral'} glow={on ? 0.25 : undefined} sides="shaded" edgeHighlight />
      })}
    </Scene>
  )
}

function FigInsight() {
  const H = [26, 34, 22, 46, 64, 82, 58, 40, 30, 20]
  return (
    <Scene y={190}>
      {H.map((h, i) => <Plate key={i} at={[-100 + i * 18, -40, 0]} w={7} d={80} h={h} r={2.5} level={i === 5 ? 'focal' : 'secondary'} tone={i === 5 ? 'tint' : 'neutral'} sides="shaded" edgeHighlight />)}
    </Scene>
  )
}

function FigZones() {
  return (
    <Scene y={150}>
      {[0, 1, 2, 3, 4].map((i) => <Plate key={i} at={[-80 + (i - 2) * 22, -60 + i * 26, 0]} w={150} d={18} h={10} r={5} level="secondary" sides="shaded" edgeHighlight />)}
      <Plate at={[-6, -64, 10]} w={22} d={136} h={0} r={6} level="focal" sides="shaded" edgeHighlight tone="tint" />
    </Scene>
  )
}

const FIGS: [string, string, string, () => React.JSX.Element][] = [
  ['0.1', 'Find a time', 'Every guest’s calendar, read at once. The free hour lifts out.', FigFind],
  ['0.2', 'Focus time', 'Deep work becomes a walled block nothing else can book.', FigFocus],
  ['0.3', 'Conflicts', 'Double bookings slide to the next slot everyone has free.', FigConflict],
  ['0.4', 'Scheduling links', 'One link, only the slots you actually have.', FigLinks],
  ['0.5', 'Weekly insight', 'See where the week went, day by day.', FigInsight],
  ['0.6', 'Time zones', 'Five cities, one shared hour, lined up for you.', FigZones],
]

export default function Bento() {
  const col = (i: number) => {
    const [n, t, b, F] = FIGS[i]
    return (
      <div key={n} className="relative w-[400px] pt-8" style={{ height: 520 }}>
        <div className="font-mono text-[11px] tracking-[0.06em]" style={{ color: '#a3a3a3' }}>FIG {n}</div>
        <div className="absolute inset-x-0 top-[70px] -ml-5 flex justify-center"><F /></div>
        <div className="absolute bottom-10 left-0 w-[340px]">
          <div className="text-[15px] font-[500] tracking-[-0.01em]">{t}</div>
          <div className="mt-2 text-[15px] leading-[23px]" style={{ color: '#737373' }}>{b}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="relative" style={{ width: 1440, height: 1420, background: '#ffffff', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: INK }}>
      <h2 className="absolute left-[80px] top-[96px] w-[1180px] text-[48px] font-[500] leading-[1.08] tracking-[-0.035em]">
        Every hour, accounted for. <span style={{ color: '#9a9a9a' }}>Cadence reads every calendar on the team, finds the time, guards the focus and settles the conflicts before you open your week.</span>
      </h2>
      {[0, 1].map((r) => (
        <div key={r} className="absolute left-[80px] flex" style={{ top: 360 + r * 520, boxShadow: r ? 'inset 0 1px 0 #ececec' : undefined }}>
          {[0, 1, 2].map((c) => (
            <div key={c} className="flex" style={{ paddingLeft: c ? 40 : 0, boxShadow: c ? 'inset 1px 0 0 #ececec' : undefined }}>
              {col(r * 3 + c)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
