// Cadence bento v4: Kargul's services-bento grammar drawn with the engine's iso kit (system/iso, rules ISO-01..18 in
// knowledge/web/isometric-line-art.md): true 30deg isometric, every point projected in code so strokes stay exact,
// one stroke ladder (focal / primary / secondary / detail / guide), hatched shade faces, grain lit faces, diamond
// nodes, dotted leaders with mono-caps pills, guides fading to the cell edge. One violet fill per cell, on the answer.
import type { ReactNode } from 'react'
import { IsoScene, IsoGrid, GuideLines, Plate, Stack, Tower, Node, Callout, Connector, Card, Texture, useIso, useStroke, topPlane, planeRoundRect, planeCircle, polyPath, type Plane } from './iso'

const INK = '#171717', V = '#6e3ff3'

/** event rows on a calendar face: grain title bar + n hairline rows, one row optionally violet */
function CalFace({ pl, w, d, cols = 5, accentCol }: { pl: Plane; w: number; d: number; cols?: number; accentCol?: number }) {
  const { P, T } = useIso()
  const s = useStroke('detail')
  const cw = (w - 16) / cols
  const out: ReactNode[] = []
  out.push(<Texture key="bar" d={planeRoundRect(P, pl, 8, 8, w * 0.4, 6, 0)} kind="grain" opacity={0.6} />)
  for (let c = 0; c <= cols; c++) out.push(<path key={'v' + c} d={polyPath(P, [[pl.o[0] + 8 + c * cw, pl.o[1] + 20, pl.o[2]], [pl.o[0] + 8 + c * cw, pl.o[1] + d - 8, pl.o[2]]])} {...s} />)
  // busy blocks: deterministic pattern
  const busy = [[0, 0, 2], [1, 2, 3], [2, 1, 2], [3, 0, 1], [3, 3, 2], [4, 1, 3]]
  busy.forEach(([c, r, len], i) => {
    if (c === accentCol) return
    out.push(<path key={'b' + i} d={planeRoundRect(P, pl, 8 + c * cw + 2.5, 24 + r * 14, cw - 5, len * 12, 2.5)} {...s} fill={T.top} />)
  })
  if (accentCol !== undefined) out.push(<path key="acc" d={planeRoundRect(P, pl, 8 + accentCol * cw + 2, 22, cw - 4, d - 32, 3)} fill={V} fillOpacity={0.14} stroke={V} strokeWidth={1.25} />)
  return <g>{out}</g>
}

function ArtFind() {
  return (
    <IsoScene width={392} height={262} mode="shaded-light" accent={V} origin={{ x: 196, y: 140 }} edgeFade={0}>
      <IsoGrid cells={10} step={30} style="dotted" />
      <GuideLines through={[[-75, -55, 0], [75, 55, 0]]} reach={170} />
      <Stack at={[-75, -55, 0]} w={150} d={110} layers={3} gap={26} thickness={0} connectors
        content={(i) => (i === 2 ? <CalFace pl={topPlane(-75, -55, 52)} w={150} d={110} accentCol={3} /> : null)} />
      <Callout at={[75, -10, 52]} dx={40} dy={60} label="WED 2 PM" tone="accent" />
    </IsoScene>
  )
}

function Lock({ at }: { at: [number, number, number] }) {
  const { P } = useIso()
  const [x, y, z] = at
  return (
    <g>
      <path d={planeRoundRect(P, topPlane(x - 14, y - 11, z), 0, 0, 28, 22, 4)} fill={V} />
      <path d={planeCircle(P, topPlane(x, y + 3, z), 0, 0, 3)} fill="#fff" />
    </g>
  )
}
function ArtFocus() {
  return (
    <IsoScene width={392} height={262} mode="shaded-light" accent={V} origin={{ x: 196, y: 128 }} edgeFade={0}>
      <IsoGrid cells={10} step={30} style="dotted" />
      <GuideLines through={[[-60, -45, 0], [60, 45, 0]]} reach={170} />
      <Connector points={[[60, -10, 0], [120, -10, 0]]} level="secondary" endNodes />
      <Connector points={[[-10, 45, 0], [-10, 105, 0]]} level="secondary" endNodes />
      <Plate at={[122, -30, 0]} w={46} d={40} h={4} r={6} level="secondary" />
      <Plate at={[-32, 107, 0]} w={46} d={40} h={4} r={6} level="secondary" />
      <Plate at={[-60, -45, 0]} w={120} d={90} h={26} r={10} level="focal" sides="shaded" edgeHighlight tone="tint" glow={0.1}>
        <FocusFace />
      </Plate>
      <Callout at={[60, 45, 26]} dx={30} dy={48} label="9–11 AM" />
    </IsoScene>
  )
}
function FocusFace() {
  const { P } = useIso()
  const pl = topPlane(-60, -45, 26)
  return (
    <g>
      <path d={planeRoundRect(P, pl, 12, 12, 96, 66, 6)} fill={V} fillOpacity={0.1} stroke={V} strokeWidth={1.25} />
      <Lock at={[0, 0, 26]} />
    </g>
  )
}

function ArtConflict() {
  return (
    <IsoScene width={392} height={262} mode="shaded-light" accent={V} origin={{ x: 196, y: 134 }} edgeFade={0}>
      <IsoGrid cells={10} step={30} style="dotted" />
      <GuideLines through={[[-70, -10, 0], [70, 40, 0]]} reach={170} />
      <Plate at={[-110, -50, 0]} w={110} d={58} h={6} r={7} level="secondary">
        <SlotLines x={-110} y={-50} z={6} w={110} />
      </Plate>
      {/* the moved one, lifted, dashed drops to its old footprint */}
      <path d="" />
      <Drops />
      <Plate at={[-30, 18, 46]} w={110} d={58} h={6} r={7} level="focal" shadow={0}>
        <SlotLines x={-30} y={18} z={52} w={110} accent />
      </Plate>
      <Node at={[-30, 18, 52]} tone="accent" />
      <Callout at={[80, 76, 52]} dx={24} dy={44} label="1:00 PM" tone="accent" />
    </IsoScene>
  )
}
function Drops() {
  const { P } = useIso()
  const s = useStroke('secondary')
  const c: [number, number][] = [[-30, 18], [80, 18], [80, 76], [-30, 76]]
  return <path d={c.map(([x, y]) => polyPath(P, [[x, y, 0], [x, y, 46]])).join(' ')} {...s} stroke={V} strokeOpacity={0.55} strokeDasharray="2 3" />
}
function SlotLines({ x, y, z, w, accent }: { x: number; y: number; z: number; w: number; accent?: boolean }) {
  const { P } = useIso()
  const s = useStroke('detail')
  const pl = topPlane(x, y, z)
  return (
    <g>
      <path d={planeRoundRect(P, pl, 10, 12, w * 0.45, 7, 3.5)} fill={accent ? V : undefined} fillOpacity={accent ? 0.85 : undefined} {...(accent ? {} : s)} />
      <path d={polyPath(P, [[x + 10, y + 30, z], [x + w * 0.7, y + 30, z]])} {...s} />
      <path d={polyPath(P, [[x + 10, y + 38, z], [x + w * 0.5, y + 38, z]])} {...s} />
    </g>
  )
}

function ArtLink() {
  return (
    <IsoScene width={600} height={240} mode="shaded-light" accent={V} origin={{ x: 300, y: 70 }} edgeFade={0}>
      <IsoGrid cells={14} step={30} style="dotted" />
      <GuideLines through={[[-70, -50, 0], [70, 50, 0]]} reach={230} />
      <Card at={[-70, -50, 0]} w={140} d={110} rows={3} highlight={1} chips={2} />
      <Connector points={[[70, 0, 0], [140, 0, 0], [140, 40, 0]]} radius={8} level="primary" endNodes />
      <Plate at={[120, 40, 0]} w={44} d={44} h={10} r={6} level="primary">
        <CalTile />
      </Plate>
      <Callout at={[-70, 60, 4]} dx={-60} dy={30} label="CADENCE.SO/MAYA" />
    </IsoScene>
  )
}
function CalTile() {
  const { P } = useIso()
  const pl = topPlane(120, 40, 10)
  return <g><path d={planeRoundRect(P, pl, 0, 0, 44, 11, 0)} fill={V} fillOpacity={0.9} /><Texture d={planeRoundRect(P, pl, 10, 18, 24, 18, 3)} kind="dots" /></g>
}

function ArtInsight() {
  const days: [number, number][] = [[50, 0], [70, 0], [96, 0], [58, 0], [104, 1]]
  return (
    <IsoScene width={600} height={240} mode="shaded-light" accent={V} origin={{ x: 300, y: 150 }} edgeFade={0}>
      <IsoGrid cells={14} step={30} style="dotted" />
      <GuideLines through={[[-100, -40, 0], [100, 40, 0]]} reach={230} />
      <Plate at={[-110, -50, 0]} w={220} d={100} h={0} r={8} level="secondary" />
      {days.map(([h, on], i) => <Tower key={i} at={[-90 + i * 40, -12, 0]} size={26} h={h} level={on ? 'focal' : i === 2 ? 'primary' : 'secondary'} tone={on ? 'tint' : 'neutral'} sides="shaded" />)}
      <Callout at={[83, 1, 104]} dx={56} dy={-20} label="FOCUS 15H" tone="accent" />
    </IsoScene>
  )
}

function Cell({ w, h, title, body, chips, art, artTop = 44 }: { w: number; h: number; title: string; body: string; chips: string[]; art: ReactNode; artTop?: number }) {
  return (
    <div className="relative overflow-hidden rounded-[24px]" style={{ width: w, height: h, background: '#f6f6f6', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.05)' }}>
      <div className="absolute left-6 top-6 text-[18px] font-[600] tracking-[-0.02em]">{title}</div>
      <div className="absolute inset-x-0 flex justify-center" style={{ top: artTop }}>{art}</div>
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
          <Cell w={600} h={387} title="Scheduling links" art={<ArtLink />} artTop={40} body="Share one link. People pick from the slots you actually have, and the event lands on both calendars." chips={['BOOKING PAGES', 'ROUND ROBIN', 'BUFFERS', 'ZOOM', 'MEET']} />
          <Cell w={600} h={387} title="Weekly insight" art={<ArtInsight />} artTop={40} body="See how much of the week went to meetings and how much to work, per person and per team." chips={['FOCUS HOURS', 'MEETING LOAD', 'TEAM REPORTS']} />
        </div>
      </div>
    </div>
  )
}
