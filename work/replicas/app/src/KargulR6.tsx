// Kargul replica R6 (study only, never published): Rork landing "features" bento, five cells of flat grey
// illustrations. Reference: knowledge/benchmarks/kargul-studio-2026-10/rork/rork-00.png (sanity.io original,
// 2880x2070 = 1440x1035 CSS). Every coordinate is the reference's 2x pixel reading, halved by d(), so the code is the
// measurement log. Construction measured: page #202020, card #2b2b2b r35 (circular, rms 0.6px), well #202020 r29 inset
// 10.5 sides / 13 top, a 4-step grey ladder for every illustration (#303030 #383838 #504e4e #656262) plus white for the
// one focal object per cell, and one colour in the whole section (Android green). Titles Helvetica Neue 500 36/-0.02em.
import type { CSSProperties, ReactNode } from 'react'

const d = (v: number) => v / 2
const G0 = '#202020', CARD = '#2b2b2b', G1 = '#303030', G2 = '#383838', G3 = '#504e4e', G4 = '#656262', DARK = '#252525'
const abs = (x: number, y: number, w: number, h: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: d(x), top: d(y), width: d(w), height: d(h), ...s })

// card: outer box + well; children are drawn in a full-page SVG clipped to the well
function Card({ x, y, w, title, center, children, id, nudge = 0 }: { x: number; y: number; w: number; title: string; center?: boolean; children: ReactNode; id: string; nudge?: number }) {
  const H = 866, wx = x + 21, wy = y + 26, ww = w - 42, wh = 656
  return (
    <>
      <div style={abs(x, y, w, H, { background: CARD, borderRadius: 35 })} />
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1440} height={1035} viewBox="0 0 2880 2070" aria-hidden>
        <defs><clipPath id={id}><rect x={wx} y={wy} width={ww} height={wh} rx={58} /></clipPath></defs>
        <rect x={wx} y={wy} width={ww} height={wh} rx={58} fill={G0} />
        <g clipPath={`url(#${id})`}>{children}</g>
      </svg>
      <div style={{ position: 'absolute', top: d(y + 727), left: (center ? d(x) : d(x + 81)) + nudge, width: center ? d(w) - 4 : undefined, textAlign: center ? 'center' : 'left', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 36, lineHeight: '44px', letterSpacing: '-0.02em', color: '#fff', whiteSpace: 'nowrap' }}>{title}</div>
    </>
  )
}

// "</" glyph: chevron + slash, 12px (2x) round strokes
const Code = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <g fill="none" stroke={c} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
    <path d={`M${x + 17} ${y - 18} L${x + 6} ${y} L${x + 17} ${y + 18}`} />
    <path d={`M${x + 59} ${y - 18} L${x + 49} ${y + 18}`} />
  </g>
)
const Pill = ({ x, y, w, h = 45, c }: { x: number; y: number; w: number; h?: number; c: string }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />
// phone body: 12px #504e4e stroke drawn inside the outer box, fill #303030
const Phone = ({ x, y, w, h, r }: { x: number; y: number; w: number; h: number; r: number }) => (
  <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx={r - 6} fill={G1} stroke={G3} strokeWidth={12} />
)

// smooth closed path through points (Catmull-Rom -> cubic)
const smooth = (pts: [number, number][]) => {
  let s = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length], p1 = pts[i], p2 = pts[(i + 1) % pts.length], p3 = pts[(i + 2) % pts.length]
    s += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
  }
  return s + 'Z'
}
// eye (cell 2): measured half-heights from the left tip (dx, h), tip rounded r~51, mirrored about x and y
const EYE: [number, number][] = [[0, 0], [5, 22], [18, 43], [41, 68], [76, 99], [106, 120], [136, 134], [166, 143], [191.5, 146]]
const eyePath = (cx: number, cy: number) => {
  const a = 191.5, n = EYE.length
  const tl = EYE.map(([dx, h]) => [cx - a + dx, cy - h] as [number, number])
  const tr = EYE.slice(0, n - 1).reverse().map(([dx, h]) => [cx + a - dx, cy - h] as [number, number])
  const br = EYE.slice(1).map(([dx, h]) => [cx + a - dx, cy + h] as [number, number])
  const bl = EYE.slice(1, n - 1).reverse().map(([dx, h]) => [cx - a + dx, cy + h] as [number, number])
  return smooth([...tl, ...tr, ...br, ...bl])
}

export default function KargulR6() {
  const gx = 2294, gy = 1661 // gauge centre (fitted from three radii; it sits 35px above the well bottom)
  const ray = (deg: number, r: number): [number, number] => [gx + r * Math.sin((deg * Math.PI) / 180), gy - r * Math.cos((deg * Math.PI) / 180)]
  const arc = (r: number, a0: number, a1: number) => { const [x0, y0] = ray(a0, r), [x1, y1] = ray(a1, r); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}` }
  return (
    <div style={{ position: 'relative', width: 1440, height: 1035, overflow: 'hidden', background: G0 }}>
      <style>{'.kr6, .kr6 * { corner-shape: round; }'}</style>
      <div className="kr6" style={{ position: 'absolute', inset: 0 }}>
        {/* 1 Access Device Features: phone, screen card with a 3px sidebar rule, two grey and two white code rows */}
        <Card id="c1" x={152} y={99} w={914} title="Access Device Features" center>
          <Phone x={321} y={194} w={579} h={800} r={93} />
          <rect x={483} y={245} width={252} height={44} rx={22} fill={G3} />
          <rect x={375} y={368} width={468} height={600} rx={34.5} fill={G2} />
          <rect x={433} y={368} width={6} height={600} fill={G1} />
          <Code x={485} y={453.5} c={G4} /><Pill x={567} y={425} w={120} c={G4} />
          <Code x={566} y={526} c="#fff" /><Pill x={651} y={509} w={120} c="#fff" />
          <Code x={485} y={591.5} c={G4} /><Pill x={567} y={569} w={120} c={G4} />
          <Code x={566} y={676} c="#fff" /><Pill x={651} y={653} w={120} c="#fff" />
        </Card>

        {/* 2 Live Preview on Mobile: code panel behind, phone with an eye */}
        <Card id="c2" x={1114} y={99} w={914} title="Live Preview on Mobile" center nudge={-2}>
          <rect x={1100} y={343} width={318} height={600} fill={G3} />
          <Code x={1165} y={453.5} c={DARK} /><Pill x={1247} y={425} w={120} c={DARK} />
          <Code x={1246} y={526} c={G1} /><Pill x={1331} y={509} w={140} c={G1} />
          <Code x={1165} y={591.5} c={DARK} /><Pill x={1247} y={569} w={120} c={DARK} />
          <Code x={1246} y={676} c={G1} /><Pill x={1331} y={653} w={140} c={G1} />
          <Phone x={1418} y={194} w={537} h={800} r={93} />
          <rect x={1568} y={242} width={234} height={42} rx={21} fill={G3} />
          <path d={eyePath(1685, 543)} fill={DARK} />
          <circle cx={1685.5} cy={543} r={88.5} fill={G4} />
        </Card>

        {/* 3 Works Cross-Platform: two app tiles, Android head behind, Apple tile in front */}
        <Card id="c3" x={2076} y={99} w={866} title="Works Cross-Platform" center nudge={2.5}>
          <rect x={2160} y={193} width={465} height={438} rx={36.5} fill={G1} />
          <g stroke="#34a853" strokeWidth={37} strokeLinecap="round"><path d="M2288 321 L2338 405" /><path d="M2499 321 L2449 405" /></g>
          <path d="M2218 507.5 A175.5 157 0 0 1 2569 507.5 Z" fill="#34a853" />
          <ellipse cx={2312} cy={442.5} rx={16} ry={17.5} transform="rotate(20 2312 442.5)" fill="#202124" />
          <rect x={2437} y={392} width={600} height={600} rx={32} fill={G3} />
          {/* apple: body + bite + leaf, fitted to the measured boxes (body 2555..2779 x 530..739, leaf 2668..2725 x 457..522) */}
          <path d="M2667 548 C2690 532 2722 528 2745 538 C2758 544 2768 552 2774 561 C2745 578 2737 612 2742 640 C2747 665 2762 680 2779 688 C2771 708 2760 725 2746 734 C2730 744 2715 740 2701 735 C2687 730 2675 729 2660 734 C2643 740 2627 744 2612 733 C2585 714 2560 670 2556 625 C2552 585 2568 556 2593 543 C2616 531 2640 536 2667 548 Z" fill="#fff" />
          <path d="M2668 522 C2666 494 2690 462 2725 457 C2727 492 2702 520 2668 522 Z" fill="#fff" />
        </Card>

        {/* 4 Fastest Submit to App Store: four tiles climbing on their own columns, the white one is the App Store */}
        <Card id="c4" x={152} y={1014} w={1395} title="Fastest Submit to App Store">
          <rect x={398} y={1600} width={108} height={200} fill={DARK} />
          <rect x={398} y={1523} width={126} height={126} rx={23} fill={G2} />
          <rect x={506} y={1490} width={159} height={300} fill={G1} />
          <rect x={507} y={1397} width={186} height={186} rx={33} fill={G3} />
          <rect x={665} y={1400} width={189} height={400} fill={G2} />
          <rect x={665} y={1283} width={240} height={240} rx={45.5} fill={G4} />
          <rect x={854} y={1300} width={381} height={500} fill={G3} />
          <rect x={854} y={1097} width={381} height={381} rx={74} fill="#fff" />
          <g strokeLinecap="round" fill="none">
            <path d="M922 1334 L1165 1334" stroke={DARK} strokeWidth={34} />
            <path d="M1064 1181 L985 1318" stroke={DARK} strokeWidth={34} />
            <path d="M971 1346 L938 1393" stroke={DARK} strokeWidth={34} />
            <path d="M900 1354.5 L1000 1354.5" stroke="#fff" strokeWidth={7} strokeLinecap="butt" />
            <path d="M1012 1186 L1133 1395" stroke="#fff" strokeWidth={34} transform="translate(-9 5)" strokeLinecap="butt" />
            <path d="M1022 1181 L1143.5 1393" stroke={DARK} strokeWidth={34} />
          </g>
        </Card>

        {/* 5 Prototype Apps in Minutes: speed gauge (3-tone band, 13 ticks at 15deg, white needle) + phone list + cursor */}
        <Card id="c5" x={1595} y={1014} w={1395} title="Prototype Apps in Minutes">
          <g fill="none" strokeWidth={56}>
            <path d={arc(521, -100, -45)} stroke={G1} />
            <path d={arc(521, -45, -23.6)} stroke={G2} />
            <path d={arc(521, -23.6, 0)} stroke={G3} />
          </g>
          <circle cx={gx} cy={gy} r={447} fill={G1} />
          <g stroke="#3e3d3d" strokeWidth={12} strokeLinecap="round">
            {[-90, -75, -60, -45, -30, -15, 15, 30, 45, 60, 75, 90].map((a) => { const [x0, y0] = ray(a, 363), [x1, y1] = ray(a, 408); return <path key={a} d={`M${x0} ${y0} L${x1} ${y1}`} /> })}
          </g>
          <circle cx={gx} cy={1696} r={92} fill={G3} />
          <rect x={2288} y={1130} width={12} height={540} fill="#fff" />
          <circle cx={gx} cy={1696} r={42} fill="#fff" />
          <Phone x={2471} y={1085} w={371} h={586} r={67} />
          <rect x={2577} y={1124} width={161} height={30} rx={15} fill={G3} />
          <rect x={2523} y={1213} width={268} height={53} rx={12} fill={G4} />
          {[1293, 1368, 1442].map((y) => (<g key={y}><circle cx={2548.5} cy={y + 26} r={26} fill={G4} /><rect x={2592} y={y} width={199} height={53} rx={12} fill={G4} /></g>))}
          <path d="M2552 1471 L2447 1513 L2486 1536 L2507 1571 Z" fill="#fff" stroke="#fff" strokeWidth={20} strokeLinejoin="round" />
        </Card>
      </div>
    </div>
  )
}
