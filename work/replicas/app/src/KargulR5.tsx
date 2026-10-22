// Kargul replica R5 (study only, never published): SideShift learning app, three iPhone screens (course list, module path,
// next module). Reference: knowledge/benchmarks/kargul-studio-2026-10/sideshift/sideshift-07.png (sanity.io original,
// 2880x2070 = 1440x1035 CSS; the same frame he posted on X on 2026-10-21 with "430px width, 932px height ... SF pro").
// Measured: each phone is exactly 430x932 CSS (860x1865 device px), r32.5, 32px apart, on #2e2e2e; type is SF Pro
// (system-ui): 24/600 screen title, 20/600 section title, 17/500 card title, 15 tab label, 13.5 body, 13 caption, 17/600
// status time. The 3D illustrations, clouds and tab icons are his raster art: here they are flat placeholders of the
// same box and dominant colour (not registered, by design). Coordinates are 2x reference pixels halved by d().
import type { CSSProperties, ReactNode } from 'react'

const d = (v: number) => v / 2
const SF: CSSProperties = { fontFamily: 'system-ui, -apple-system, sans-serif', WebkitFontSmoothing: 'antialiased' }
const INK = '#202020', SUB = '#8d8d8d', GREEN = '#0bbb46', BLUE = '#1db3fb'
const T = (x: number, y: number, size: number, weight: number, color: string, children: ReactNode, extra: CSSProperties = {}) => (
  // x = ink left, y = cap top (both 2x px); line box placed so SF's cap top lands on y
  <div style={{ position: 'absolute', left: d(x) - size * 0.06, top: d(y) - size * 0.29, fontSize: size, lineHeight: `${Math.round(size * 1.3)}px`, fontWeight: weight, color, whiteSpace: 'nowrap', ...extra }}>{children}</div>
)
const box = (x: number, y: number, w: number, h: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: d(x), top: d(y), width: d(w), height: d(h), ...s })

const Status = ({ x }: { x: number }) => (
  <>
    {T(x + 34, 197, 17, 600, '#111', '9:41', { letterSpacing: '-0.01em' })}
    <svg style={box(x + 673, 196, 160, 26)} viewBox="0 0 160 26" aria-hidden>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 10} y={18 - i * 5} width={6.5} height={8 + i * 5} rx={1.5} fill="#111" />)}
      <path d="M58 9a22 22 0 0 1 30 0l-3 3.2a17.6 17.6 0 0 0-24 0Zm5 5.3a14.6 14.6 0 0 1 20 0l-3.2 3.3a10 10 0 0 0-13.6 0Zm5 5.2a7 7 0 0 1 10 0L73 25Z" fill="#111" />
      <rect x={104} y={4} width={44} height={20} rx={6} fill="none" stroke="#111" strokeOpacity={0.4} strokeWidth={2} />
      <rect x={107.5} y={7.5} width={37} height={13} rx={3.5} fill="#111" />
      <rect x={150} y={11} width={3} height={7} rx={1.5} fill="#111" fillOpacity={0.4} />
    </svg>
  </>
)
// flat stand-in for his 3D art: same box, dominant colours
const Art = ({ x, y, s, a, b }: { x: number; y: number; s: number; a: string; b: string }) => (
  <div style={box(x, y, s, s, { borderRadius: d(s) * 0.22, background: `linear-gradient(135deg, ${a}, ${b})` })} />
)
const PlayBtn = ({ x, y, blue }: { x: number; y: number; blue?: boolean }) => (
  <div style={box(x, y, 88, 88, { borderRadius: 99, background: blue ? 'linear-gradient(#5fc8ff, #2aa6f5)' : 'linear-gradient(#4acc76, #15bd4d)', boxShadow: `inset 0 0 0 1px ${blue ? '#1c93d8' : '#2aa957'}, 0 8px 14px rgba(0,0,0,.2)` })}>
    <svg style={{ position: 'absolute', left: 13, top: 12 }} width={20} height={20} viewBox="0 0 20 20" aria-hidden><path d="M6 4.2v11.6c0 .9 1 1.5 1.8 1l9-5.8c.7-.5.7-1.5 0-2l-9-5.8C7 2.7 6 3.3 6 4.2Z" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round" /></svg>
  </div>
)
function Lesson({ y, title, sub, art, blue, last }: { y: number; title: string; sub: string[]; art: [string, string]; blue?: boolean; last?: boolean }) {
  return (
    <>
      <div style={box(116, y, 800, 196, { borderRadius: 12, background: last ? '#fff' : '#f4fcf4', boxShadow: `inset 0 0 0 1px ${last ? '#e6e6e6' : GREEN}` })} />
      <Art x={150} y={y + 33} s={128} a={art[0]} b={art[1]} />
      {T(312, y + 45 + (sub.length === 1 ? 18 : 0), 17, 500, INK, title)}
      {sub.map((l, i) => <div key={i}>{T(311, y + 93 + (sub.length === 1 ? 18 : 0) + i * 36, 13.5, 400, SUB, l, { letterSpacing: '-0.02em' })}</div>)}
      <PlayBtn x={794} y={y + 54} blue={blue} />
    </>
  )
}
const Ring = ({ x, y, n, p, done }: { x: number; y: number; n: string; p: number; done?: boolean }) => (
  <svg style={box(x, y, 88, 88)} viewBox="0 0 44 44" aria-hidden>
    <circle cx={22} cy={22} r={19.5} fill="#fff" stroke="#ededed" strokeWidth={3.5} />
    {p > 0 && <circle cx={22} cy={22} r={19.5} fill="none" stroke={done ? '#25c25a' : '#25c25a'} strokeWidth={3.5} strokeDasharray={`${p * 122.5} 200`} transform="rotate(-90 22 22)" strokeLinecap="round" />}
    <text x={22} y={28} textAnchor="middle" fontSize={17} fontWeight={600} fill={p > 0 ? INK : '#9a9a9a'} fontFamily="system-ui">{n}</text>
  </svg>
)
function Module({ x, y, n, title, art, ring }: { x: number; y: number; n: number; title: string; art: [string, string]; ring: ReactNode }) {
  return (
    <>
      <div style={box(x, y, 800, 196, { borderRadius: 16, background: '#fff', boxShadow: 'inset 0 0 0 1px #e4e4e4, 0 4px 10px rgba(30,60,90,.04)' })} />
      <Art x={x + 34} y={y + 34} s={128} a={art[0]} b={art[1]} />
      {T(x + 196, y + 65, 13, 400, BLUE, `Module ${n}`)}
      {T(x + 195, y + 107, 17, 500, INK, title)}
      {ring}
    </>
  )
}
const Node = ({ cx, cy, kind }: { cx: number; cy: number; kind: 'done' | 'play' | 'idle' }) => {
  const c = kind === 'done' ? ['#0bbb46', '#f0fbf4', '#7fd59c'] : kind === 'play' ? ['#1db3fb', '#eaf7ff', '#7ccdf6'] : ['#d6d6d6', '#fbfbfb', '#cfcfcf']
  return (
    <svg style={box(cx - 70, cy - 60, 140, 140)} viewBox="0 0 140 140" aria-hidden>
      <ellipse cx={70} cy={76} rx={58} ry={54} fill="#000" fillOpacity={0.05} />
      <ellipse cx={70} cy={67} rx={57.5} ry={54} fill={c[2]} stroke={c[0]} strokeWidth={2} />
      <ellipse cx={70} cy={59} rx={57.5} ry={54} fill={c[1]} stroke={c[0]} strokeWidth={2} />
      {kind === 'done' ? <path d="M58 60l9 9 17-18" fill="none" stroke={c[0]} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M62 44v30c0 2 2 3 4 2l22-14c1.6-1 1.6-3 0-4L66 42c-2-1-4 0-4 2Z" fill="none" stroke={kind === 'play' ? c[0] : '#8d8d8d'} strokeWidth={4.5} strokeLinejoin="round" />}
    </svg>
  )
}
const Tip = ({ x, y, w, h, lines }: { x: number; y: number; w: number; h: number; lines: string[] }) => (
  <div style={box(x, y, w, h, { borderRadius: 16, background: 'linear-gradient(180deg, #e9f7ff, #ffffff 70%)', boxShadow: `inset 0 0 0 1.5px ${BLUE}` })}>
    {lines.map((l, i) => <div key={i} style={{ position: 'absolute', left: 16.5, top: 15 + i * 18, fontSize: 13.5, lineHeight: '18px', color: INK, whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>{l}</div>)}
    <div style={{ position: 'absolute', left: 16.5, top: 15 + lines.length * 18 + 12.5, fontSize: 13, lineHeight: '18px', color: BLUE }}>Learn More</div>
  </div>
)
// cloud header (phones 2, 3): sky gradient + soft white puffs, then a close button and an action pill
const Clouds = ({ x }: { x: number }) => (
  <div style={box(x, 141, 860, 360, { overflow: 'hidden' })}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a9bfd 0%, #67b8fd 35%, #a6dbfe 62%, rgba(255,255,255,0) 100%)' }} />
    {[[-20, 120, 160], [110, 105, 120], [240, 112, 150], [380, 100, 130], [520, 112, 150], [650, 100, 130], [780, 110, 150]].map(([cx, cy, r], i) => (
      <div key={i} style={{ position: 'absolute', left: d(cx - r), top: d(cy - r * 0.55 + 70), width: d(r * 2), height: d(r * 1.6), borderRadius: '50%', background: 'radial-gradient(closest-side, #fff 70%, rgba(255,255,255,.0))' }} />
    ))}
    <div style={{ position: 'absolute', left: 0, right: 0, top: d(220), bottom: 0, background: '#fff' }} />
  </div>
)
const CloseAndPill = ({ x }: { x: number }) => (
  <>
    <div style={box(x + 30, 302, 90, 90, { borderRadius: 99, background: '#fff', boxShadow: '0 0 0 1px #ececec, 0 6px 14px rgba(0,0,0,.08)' })}>
      <svg style={{ position: 'absolute', left: 13.5, top: 13.5 }} width={18} height={18} viewBox="0 0 18 18" aria-hidden><path d="M3 3l12 12M15 3 3 15" stroke={INK} strokeWidth={2.4} strokeLinecap="round" /></svg>
    </div>
    <div style={box(x + 662, 302, 168, 90, { borderRadius: 99, background: '#fff', boxShadow: '0 0 0 1px #eaeaea, 0 6px 14px rgba(0,0,0,.08)' })}>
      {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: 13 + i * 7.5, top: 20.5, width: 4.5, height: 4.5, borderRadius: 9, background: INK }} />)}
      <div style={{ position: 'absolute', left: 45, top: 6.5, width: 32, height: 32, borderRadius: 99, background: 'linear-gradient(#5ee47c, #2fc455)', boxShadow: 'inset 0 0 0 1px #3fbe59' }}>
        <svg style={{ position: 'absolute', left: 8, top: 8 }} width={16} height={16} viewBox="0 0 16 16" aria-hidden><path d="M3 8.5l3.3 3.2L13 4.8" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  </>
)
const Phone = ({ x, children, bottom = 2070 }: { x: number; children: ReactNode; bottom?: number }) => (
  <div style={box(x, 141, 860, bottom - 141, { borderRadius: bottom > 2006 ? '32.5px 32.5px 0 0' : 32.5, overflow: 'hidden', background: '#fff' })}>
    <div style={{ position: 'absolute', left: d(-x), top: d(-141), width: 1440, height: 1035 }}>{children}</div>
  </div>
)

export default function KargulR5() {
  return (
    <div style={{ ...SF, position: 'relative', width: 1440, height: 1035, overflow: 'hidden', background: '#2e2e2e', color: INK }}>
      <style>{'.kr5, .kr5 * { corner-shape: round; }'}</style>
      <div className="kr5" style={{ position: 'absolute', inset: 0 }}>
        {/* phone 1: course list */}
        <Phone x={86}>
          <div style={box(86, 141, 860, 640, { background: 'linear-gradient(180deg, #3999fd 0%, #7cc4fe 18%, #b2e2fe 32%, #e6f6ff 50%, #fbfeff 72%, #fff 100%)' })} />
          <Status x={86} />
          <Art x={182} y={302} s={89} a="#e9f6ff" b="#bfe6fb" />
          <Art x={459} y={302} s={89} a="#eef1ff" b="#c9d3ff" />
          <Art x={719} y={302} s={89} a="#fff0ef" b="#ffcfcb" />
          {T(118, 437, 15, 500, INK, 'The Foundation')}
          {T(400, 437, 15, 400, '#6b6b6b', 'Content Basics')}
          {T(673, 437, 15, 400, '#6b6b6b', 'Landing Gigs')}
          {T(919, 437, 15, 400, '#6b6b6b', 'Growth')}
          <div style={box(86, 500, 860, 2, { background: '#d9e6ee' })} />
          <div style={box(115, 498, 222, 6, { borderRadius: 3, background: '#2a9df4' })} />
          {T(118, 576, 20, 600, INK, 'The Foundation')}
          {T(120, 632, 13.5, 400, '#6b6b6b', 'Build your UGC knowledge base', { letterSpacing: '-0.02em' })}
          <div style={box(211, 680, 6, 720, { background: GREEN })} /><div style={box(211, 1760, 6, 80, { background: GREEN })} />
          <Lesson y={704} title="UGC Overview" sub={['learn what UGC is and why it’s', 'transforming the creator economy']} art={['#dff3ff', '#8fd0f7']} />
          <Lesson y={944} title="Getting Started" sub={['Set up your device, equipment, and', 'portfolio']} art={['#ffe79a', '#ff9b45']} />
          <Lesson y={1184} title="Mindset & Expectations" sub={['Develop the mindset of a top 1% UGC', 'creator']} art={['#bff0c4', '#6fd27c']} />
          {T(120, 1452, 20, 600, INK, 'Content Basics')}
          {T(120, 1508, 13.5, 400, '#6b6b6b', 'Master scripting, formats, and filming', { letterSpacing: '-0.02em' })}
          <Lesson y={1580} title="Scripting" sub={['Write hooks and scripts that convert']} art={['#eef0ff', '#aab6ff']} />
          <Lesson y={1820} title="Content Formats" sub={['Learn the most effective UGC', 'formats']} art={['#dfe6ff', '#8ca2f2']} blue last />
          <div style={box(150, 2016, 731, 30, { borderRadius: 99, background: '#f1f1f1', boxShadow: 'inset 0 0 0 1px #e6e6e6' })} />
          <div style={box(150, 2016, 590, 30, { borderRadius: 99, background: 'linear-gradient(#30cf64, #11b948)' })} />
        </Phone>

        {/* phone 2: module path */}
        <Phone x={1010}>
          <div style={box(1010, 141, 860, 1930, { background: 'radial-gradient(circle at 15% 52%, #e6f5ff 0 22%, transparent 22.2%), radial-gradient(circle at 55% 58%, #f4faff 0 40%, transparent 40.2%)' })} />
          <Clouds x={1010} />
          <Status x={1010} />
          <CloseAndPill x={1010} />
          {T(1270, 436, 24, 600, INK, 'The Foundation')}
          <Module x={1040} y={546} n={1} title="UGC Overview" art={['#dff3ff', '#8fd0f7']} ring={<Ring x={1718} y={599} n="3" p={0.75} />} />
          <Node cx={1578} cy={835} kind="done" />
          {T(1493, 932, 13, 500, INK, 'What is UGC?')}
          <Node cx={1696} cy={1090} kind="done" />
          <div style={{ position: 'absolute', left: d(1606), top: d(1176), width: 89, textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 500, whiteSpace: 'normal' }}>Why UGC is Exploding</div>
          <Node cx={1696} cy={1345} kind="done" />
          <div style={{ position: 'absolute', left: d(1570), top: d(1428), width: 126, textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 500 }}>UGC vs Influencer Content</div>
          <Node cx={1578} cy={1597} kind="play" />
          <div style={{ position: 'absolute', left: d(1452), top: d(1682), width: 126, textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 500 }}>UGC vs Influencer Content</div>
          <Tip x={1041} y={1133} w={386} h={196} lines={['Master the basic before', 'moving forward.']} />
          <Module x={1040} y={1788} n={2} title="Getting Started" art={['#ffe79a', '#ff9b45']} ring={<Ring x={1718} y={1842} n="0" p={0} />} />
          <Node cx={1311} cy={2070} kind="idle" />
        </Phone>

        {/* phone 3: next module */}
        <Phone x={1934} bottom={2006}>
          <div style={box(1934, 141, 860, 1930, { background: 'radial-gradient(circle at 95% 62%, #e3f5ff 0 22%, transparent 22.2%), radial-gradient(circle at 60% 66%, #f2faff 0 42%, transparent 42.2%)' })} />
          <Clouds x={1934} />
          <Status x={1934} />
          <CloseAndPill x={1934} />
          {T(2194, 436, 24, 600, INK, 'The Foundation')}
          <Module x={1964} y={546} n={1} title="UGC Overview" art={['#dff3ff', '#8fd0f7']} ring={<Ring x={2642} y={599} n="4" p={1} done />} />
          <Module x={1964} y={770} n={2} title="Getting Started" art={['#ffe79a', '#ff9b45']} ring={<Ring x={2642} y={826} n="0" p={0} />} />
          <Node cx={2235} cy={1060} kind="idle" />
          <div style={{ position: 'absolute', left: d(2135), top: d(1146), width: 100, textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 500, color: '#5a5a5a' }}>Setting Up Your Device</div>
          <Node cx={2108} cy={1314} kind="idle" />
          {T(1982, 1410, 13, 500, '#5a5a5a', 'Essential Equipment')}
          <Node cx={2108} cy={1568} kind="idle" />
          {T(1989, 1664, 13, 500, '#5a5a5a', 'Creating a Portfolio')}
          <Tip x={2376} y={1349} w={386} h={196} lines={['Each lesson builds on the', 'last.']} />
          <Node cx={2235} cy={1835} kind="idle" />
          <div style={{ position: 'absolute', left: d(2083), top: d(1924), width: 152, textAlign: 'center', fontSize: 13, lineHeight: '18px', fontWeight: 500, color: '#5a5a5a' }}>Set Up Your SideShift Profile</div>
          <div style={box(2222, 1980, 286, 10, { borderRadius: 9, background: '#000' })} />
        </Phone>
      </div>
    </div>
  )
}
