// Kargul replica R1 (study only, never published): UniOps admin dashboard in a browser window.
// Reference: knowledge/benchmarks/kargul-studio-2026-10/uniops/uniops-02.png (sanity.io original, 2880x2070 = 1440x1035).
// Scale settled at exactly 2.0 (the open question in kargul-micro-details §6): 8 sidebar labels fit Inter 14/450 to
// within 0.5px each, so the traffic lights are 11.5px, not a 1.81x clue. Coordinates are 2x reference pixels halved by d().
import type { CSSProperties, ReactNode } from 'react'
import { RiLayoutGridLine, RiMacbookLine, RiGroupLine, RiPulseLine, RiFileList2Line, RiBillLine, RiGiftLine, RiSettings3Line, RiQuestionLine, RiArrowRightSLine, RiCalendarLine, RiFilter3Line, RiContactsBook2Line, RiArrowDownSLine, RiRefreshLine, RiAddLine, RiPlayCircleLine, RiComputerLine, RiArmchairLine, RiErrorWarningLine, RiTimeLine, RiArrowRightUpLine, RiCheckLine, RiArrowUpSLine, RiSidebarFoldLine, RiArrowLeftSLine, RiRestartLine, RiSunLine, RiMoonLine, RiNotification3Line, RiSearchLine, RiDownload2Line, RiDraggable } from '@remixicon/react'

const d = (v: number) => v / 2
const INK = '#2f2f2f', SUB = '#8b8b8b', LINE = '#e6e6e6', BG = '#f7f7f7'
const font: CSSProperties = { fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', WebkitFontSmoothing: 'antialiased' }
const box = (x: number, y: number, w: number, h: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: d(x), top: d(y), width: d(w), height: d(h), ...s })
// text by ink box: x = ink left, y = cap/ascender top (2x px); Inter cap top sits ~0.27em below the line top at lh 1.2
const T = (x: number, y: number, size: number, weight: number, color: string, children: ReactNode, extra: CSSProperties = {}) => (
  <div style={{ position: 'absolute', left: d(x) - size * 0.05, top: d(y) - size * 0.36, fontSize: size, lineHeight: `${size * 1.4}px`, fontWeight: weight, color, whiteSpace: 'nowrap', ...extra }}>{children}</div>
)
const Ico = ({ I, x, y, s = 16, c = '#666' }: { I: typeof RiAddLine; x: number; y: number; s?: number; c?: string }) => <I size={s} color={c} style={{ position: 'absolute', left: d(x), top: d(y) }} />

const NAV: [typeof RiAddLine, string, number][] = [[RiMacbookLine, 'Tools', 617], [RiGroupLine, 'Team', 694], [RiPulseLine, 'Sessions', 773], [RiFileList2Line, 'Audit', 852], [RiBillLine, 'Billing', 1009], [RiGiftLine, 'Referrals', 1088], [RiSettings3Line, 'Settings', 1167], [RiQuestionLine, 'Support', 1245]]

const Pill = ({ x, w, children }: { x: number; w: number; children: ReactNode }) => (
  <div style={box(x, 450, w, 65, { borderRadius: 10, background: '#fff', boxShadow: `0 0 0 1px ${LINE}, 0 1px 2px rgba(0,0,0,.05)` })}>{children}</div>
)
const Av = ({ x, y, s, bg, fg, t, ring }: { x: number; y: number; s: number; bg: string; fg: string; t: string; ring?: boolean }) => (
  <div style={box(x, y, s, s, { borderRadius: 99, background: bg, color: fg, display: 'grid', placeItems: 'center', fontSize: d(s) * 0.5, fontWeight: 500, boxShadow: ring ? '0 0 0 1.5px #fff' : undefined })}>{t}</div>
)
const Tile = ({ x, y, bg, children }: { x: number; y: number; bg: string; children?: ReactNode }) => (
  <div style={box(x, y, 47, 47, { borderRadius: 6, background: bg, display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06)' })}>{children}</div>
)
const Chip = ({ x, y, w, t, bg, fg }: { x: number; y: number; w: number; t: string; bg: string; fg: string }) => (
  <div style={box(x, y, w, 43, { borderRadius: 6, background: bg, color: fg, fontSize: 13, fontWeight: 450, display: 'grid', placeItems: 'center' })}>{t}</div>
)
const Dot = ({ x, y }: { x: number; y: number }) => <div style={box(x, y, 5, 5, { borderRadius: 9, background: '#c8c8c8' })} />

function Card({ x, y, w, h, r, children }: { x: number; y: number; w: number; h: number; r: number; children?: ReactNode }) {
  // resting card: 1px ring #e6e6e6 whose bottom reads ~#dadada (a 1px, 3% drop) and no blur (KMD-03)
  return <div style={box(x, y, w, h, { borderRadius: r, boxShadow: `0 0 0 1px ${LINE}, 0 1px 0 rgba(0,0,0,.035)` })}>{children}</div>
}

export default function KargulR1() {
  const kpi: [typeof RiAddLine, string, string, number][] = [[RiPlayCircleLine, 'Live sessions', 'Active in tools right now', 619], [RiComputerLine, 'Tools connected', '3 ready, 2 waiting', 1134], [RiArmchairLine, 'Seats used', '25% of your pro plan', 1648], [RiErrorWarningLine, 'Needs attention', '2 high, 1 medium', 2162]]
  const rows = [1594, 1710, 1825, 1939, 2053]
  const sepY = [1560, 1674, 1789, 1904, 2018]
  return (
    <div style={{ ...font, position: 'relative', width: 1440, height: 1035, overflow: 'hidden', background: '#2e2e2e', color: INK }}>
      <style>{'.kr1, .kr1 * { corner-shape: round; }'}</style>
      <div className="kr1" style={{ position: 'absolute', inset: 0 }}>
        {/* window */}
        <div style={box(134, 130, 2610, 2000, { borderRadius: '25px 25px 0 0', background: BG, overflow: 'hidden' })}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: d(307 - 130), background: '#eeeeee', boxShadow: 'inset 0 -1px 0 #e2e2e2' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: d(307 - 130), height: d(330 - 307) + 200, background: BG }} />
        </div>
        {[['#ff4b59', 188], ['#ffc600', 223], ['#00ca48', 257.5]].map(([c, x]) => <div key={x} style={box((x as number) - 11.5, 165.5, 23, 23, { borderRadius: 99, background: c as string })} />)}
        {/* title bar right: theme toggle, bell, search, download, avatar */}
        <div style={box(2204, 147, 136, 60, { borderRadius: 99, background: '#e4e4e4' })}>
          <div style={{ position: 'absolute', left: 2, top: 2, width: 26, height: 26, borderRadius: 99, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.12)' }} />
        </div>
        <Ico I={RiSunLine} x={2215} y={161} s={16} c="#555" /><Ico I={RiMoonLine} x={2270} y={161} s={16} c="#666" />
        <Dot x={2327} y={175} />
        <Ico I={RiNotification3Line} x={2370} y={157} s={18} c="#555" /><div style={box(2398, 152, 9, 9, { borderRadius: 9, background: '#fb3748' })} />
        <Ico I={RiSearchLine} x={2449} y={159} s={17} c="#555" />
        <Ico I={RiDownload2Line} x={2528} y={159} s={17} c="#555" />
        <Dot x={2603} y={175} />
        <Av x={2640} y={150} s={52} bg="#e8e8e8" fg="#2f2f2f" t="S" />
        {/* URL row */}
        <Ico I={RiArrowLeftSLine} x={180} y={266} s={14} c="#555" /><Ico I={RiArrowRightSLine} x={241} y={266} s={14} c="#555" /><Ico I={RiRestartLine} x={300} y={264} s={15} c="#555" />
        <div style={box(370, 248, 2340, 61, { borderRadius: 14, background: '#efefef', boxShadow: 'inset 0 0 0 1px #e8e8e8' })} />
        <Ico I={RiAddLine} x={390} y={265} s={13} c="#666" />
        {T(434, 268, 13, 450, '#9a9a9a', <>https://<span style={{ color: '#555' }}>uniops.app/dashboard</span></>)}

        {/* sidebar */}
        <div style={box(177, 353, 62, 62, { borderRadius: 14, background: 'linear-gradient(160deg, #6cc7ff, #2f7bff)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 2px 4px rgba(30,90,200,.25)', display: 'grid', placeItems: 'center' })}>
          <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden><path d="M1.5 9C4 4.5 14 4.5 16.5 9 14 13.5 4 13.5 1.5 9Z" fill="#fff" /><circle cx={9} cy={9} r={3.6} fill="#1f3c88" /><path d="M9 6.8l.7 1.5 1.5.7-1.5.7L9 11.2l-.7-1.5-1.5-.7 1.5-.7Z" fill="#fff" /></svg>
        </div>
        {T(262, 355, 13, 500, INK, 'Uniops')}
        {T(261, 393, 12, 400, '#7d7d7d', '@kargulstudio')}
        <Ico I={RiSidebarFoldLine} x={500} y={369} s={15} c="#777" />
        {T(187, 474, 11, 500, '#979797', 'WORKSPACE', { letterSpacing: '0.02em' })}
        <div style={box(160, 517, 400, 70, { borderRadius: 99, background: '#ebebeb' })} />
        <Ico I={RiLayoutGridLine} x={187} y={536} s={16} c="#4785ff" />
        {T(240, 539, 14, 450, '#2e2e2e', 'Dashboard')}
        <Ico I={RiArrowRightSLine} x={489} y={538} s={15} c="#858585" />
        {NAV.map(([I, l, y]) => (<div key={l}><Ico I={I} x={187} y={y - 1} s={16} c="#7a7a7a" />{T(240, y + 2, 14, 450, '#2e2e2e', l)}</div>))}
        {T(188, 947, 11, 500, '#979797', 'UTILITY', { letterSpacing: '0.02em' })}
        {T(188, 1342, 11, 500, '#979797', 'PINNED TOOLS', { letterSpacing: '0.02em' })}
        <Ico I={RiDraggable} x={190} y={1406} s={13} c="#b0b0b0" /><Ico I={RiDraggable} x={190} y={1485} s={13} c="#b0b0b0" />
        <svg style={box(235, 1410, 24, 18)} viewBox="0 0 24 18" aria-hidden><path d="M2 17V4l10 7 10-7v13" fill="none" stroke="#ea4335" strokeWidth={3} strokeLinejoin="round" /><path d="M2 4l10 7" stroke="#c5221f" strokeWidth={3} /><path d="M22 4l-10 7" stroke="#fbbc04" strokeWidth={3} /></svg>
        {T(275, 1409, 14, 450, '#2e2e2e', 'Gmail')}
        <svg style={box(235, 1486, 24, 24)} viewBox="0 0 24 24" aria-hidden>{Array.from({ length: 8 }, (_, i) => <path key={i} d="M12 12 12 2" stroke="#d97757" strokeWidth={2.6} strokeLinecap="round" transform={`rotate(${i * 45} 12 12)`} />)}</svg>
        {T(275, 1488, 14, 450, '#2e2e2e', 'Claude')}

        {/* main panel */}
        <div style={box(567, 329, 2166, 1800, { borderRadius: '21px 21px 0 0', background: BG, boxShadow: '0 0 0 1px #e9e9e9' })} />
        {T(623, 385, 15, 500, INK, 'Dashboard')}
        <div style={box(797, 397, 6, 6, { borderRadius: 9, background: '#c4c4c4' })} />
        {T(823, 385, 14.5, 400, SUB, 'Lorem ipsum dolor sit amet dummy')}
        <Pill x={619} w={398}><Ico I={RiCalendarLine} x={645 - 619} y={469 - 450} s={14} c="#8a8a8a" />{T(691 - 619, 470 - 450, 14, 400, '#8a8a8a', <>Range <span style={{ color: INK, marginLeft: 1 }}>Last 30 days</span></>)}<Ico I={RiArrowDownSLine} x={964 - 619} y={467 - 450} s={14} c="#8a8a8a" /></Pill>
        <Pill x={1036} w={331}><Ico I={RiFilter3Line} x={1061 - 1036} y={469 - 450} s={14} c="#8a8a8a" />{T(1107 - 1036, 470 - 450, 14, 400, '#8a8a8a', <>Scope <span style={{ color: INK, marginLeft: 1 }}>All tools</span></>)}<Ico I={RiArrowDownSLine} x={1315 - 1036} y={467 - 450} s={14} c="#8a8a8a" /></Pill>
        <Pill x={1387} w={304}><Ico I={RiContactsBook2Line} x={1412 - 1387} y={469 - 450} s={14} c="#8a8a8a" />{T(1459 - 1387, 470 - 450, 14, 400, '#8a8a8a', <>Role <span style={{ color: INK, marginLeft: 1 }}>All roles</span></>)}<Ico I={RiArrowDownSLine} x={1640 - 1387} y={467 - 450} s={14} c="#8a8a8a" /></Pill>
        <Pill x={2170} w={212}><Ico I={RiRefreshLine} x={2201 - 2170} y={467 - 450} s={15} c="#8a8a8a" />{T(2253 - 2170, 470 - 450, 14.5, 400, INK, 'Refresh')}</Pill>
        <div style={box(2404, 449, 277, 67, { borderRadius: 10, background: 'linear-gradient(180deg, #4ea9ff 0%, #4b9aff 30%, #4886fd 100%)', boxShadow: 'inset 0 1px 0 #70c7ff, 0 0 0 1px #4682fb, 0 4px 8px rgba(30,100,240,.18)', color: '#fff' })}>
          <Ico I={RiAddLine} x={2432 - 2404} y={466 - 449} s={16} c="#fff" />
          {T(2477 - 2404, 470 - 449, 14.5, 450, '#fff', 'Connect tool')}
        </div>

        {/* KPI strip: one card, 4 cells split by 1px rules */}
        <Card x={619} y={554} w={2061} h={242} r={22.5} />
        {[1134, 1648, 2162].map((x) => <div key={x} style={box(x, 555, 2, 240, { background: LINE })} />)}
        {kpi.map(([I, t, s, x]) => (<div key={t}><Ico I={I} x={x + 44} y={597} s={16} c="#6f6f6f" />{T(x + 104, 600, 14.5, 400, INK, t)}{T(x + 103, 647, 13.5, 400, SUB, s)}</div>))}
        {T(723, 711, 24, 400, INK, '15')}
        <Av x={787} y={704} s={50} bg="#ffc0c5" fg="#681219" t="S" ring /><Av x={821} y={704} s={50} bg="#c5d8ff" fg="#122368" t="J" ring /><Av x={855} y={704} s={50} bg="#d5c8ff" fg="#2b1468" t="A" ring />
        {T(916, 714, 14.5, 400, SUB, '+12 others')}
        {T(1238, 711, 24, 400, INK, '8')}{T(1283, 714, 14.5, 400, SUB, '+2 this month')}
        {T(1752, 711, 24, 400, INK, <>16<span style={{ color: '#a3a3a3' }}>/50</span></>)}{T(1888, 714, 14.5, 400, SUB, '+24 available')}
        {T(2267, 711, 24, 400, INK, '3')}{T(2312, 714, 14.5, 400, SUB, 'to review')}

        {/* time strip */}
        <Card x={619} y={824} w={2061} h={241} r={22.5} />
        <div style={box(1648, 825, 2, 239, { background: LINE })} />
        <Ico I={RiTimeLine} x={662} y={866} s={16} c="#6f6f6f" />{T(722, 869, 14.5, 400, INK, 'Time in tools')}{T(722, 917, 13.5, 400, SUB, 'Across 96 sessions')}
        <Ico I={RiPlayCircleLine} x={1691} y={866} s={16} c="#6f6f6f" />{T(1751, 869, 14.5, 400, INK, 'Time in UniOps')}{T(1751, 917, 13.5, 400, SUB, 'Shared and personal tools combined')}
        {T(723, 982, 24, 400, INK, <>42 <span style={{ color: '#7b7b7b' }}>hour</span> 18 <span style={{ color: '#7b7b7b' }}>minutes</span></>)}{T(1133, 989, 13, 400, '#a3a3a3', '(last 30 days)')}
        {T(1753, 982, 24, 400, INK, <>36 <span style={{ color: '#7b7b7b' }}>hour</span> 15 <span style={{ color: '#7b7b7b' }}>minutes</span></>)}{T(2162, 989, 13, 400, '#a3a3a3', '(last 30 days)')}

        {/* workspace setup */}
        <Card x={619} y={1094} w={2061} h={316} r={22} />
        <div style={box(619, 1252, 2061, 2, { background: LINE })} />
        {[1134, 1648, 2162].map((x) => <div key={x} style={box(x, 1254, 2, 155, { background: LINE })} />)}
        {T(656, 1143, 14.5, 450, INK, 'Workspace setup')}
        {T(657, 1191, 13.5, 400, SUB, 'Complete the steps below to get the most out of UniOps.')}
        {[2200, 2279].map((x) => <div key={x} style={box(x, 1170, 70, 10, { borderRadius: 9, background: '#1daf61' })} />)}
        {[2357, 2436].map((x) => <div key={x} style={box(x, 1170, 70, 10, { borderRadius: 9, background: '#e6e6e6' })} />)}
        {T(2523, 1157, 13.5, 400, SUB, '2/4')}
        <div style={box(2599, 1151, 47, 47, { borderRadius: 99, boxShadow: `inset 0 0 0 1px ${LINE}` })}><Ico I={RiArrowUpSLine} x={8} y={7} s={15} c="#646464" /></div>
        {[[660, 'Add first tool', '18 tools connected', 'done'], [1175, 'Invite teammate', '18 tools connected', 'done'], [1691, 'Capture login', 'Frame.io is still missing a login', 'on'], [2205, 'Assign access', '3 members have no tools yet', 'off']].map(([x, t, s, st]) => (
          <div key={t as string}>
            {st === 'done' ? <div style={box(x as number, 1293, 34, 34, { borderRadius: 99, background: '#c2f5da', display: 'grid', placeItems: 'center' })}><RiCheckLine size={11} color="#225c3e" /></div>
              : <div style={box(x as number, 1293, 34, 34, { borderRadius: 99, boxShadow: `inset 0 0 0 1.5px ${st === 'on' ? '#4785ff' : '#aeaeae'}` })}>{st === 'on' && <div style={{ position: 'absolute', left: 6.25, top: 6.25, width: 4.5, height: 4.5, borderRadius: 9, background: '#4785ff' }} />}</div>}
            {T((x as number) + 62, 1295, 14.5, 400, INK, t)}{T((x as number) + 62, 1345, 13.5, 400, SUB, s)}
          </div>
        ))}

        {/* three list cards */}
        {[619, 1320, 2020].map((x) => <Card key={x} x={x} y={1446} w={661} h={700} r={18} />)}
        {[656, 1357, 2057].map((x) => sepY.map((y) => <div key={`${x}${y}`} style={box(x, y, 588, 2, { background: '#e9e9e9' })} />))}
        {T(658, 1495, 14.5, 400, INK, 'Usage by tool')}<Dot x={850} y={1505} />{T(874, 1497, 13.5, 400, SUB, 'last 7 days')}
        {T(1358, 1495, 14.5, 400, INK, 'Usage by member')}{T(2059, 1495, 14.5, 400, INK, 'Needs attention')}
        {[1111, 1811, 2512].map((x) => (<div key={x}>{T(x, 1497, 14, 400, '#4785ff', 'View all')}<Ico I={RiArrowRightUpLine} x={x + 106} y={1494} s={14} c="#4785ff" /></div>))}
        {([['Higgsfield', '9 users', '9h 47m', '#d7ff17'], ['Frame.io', '7 users', '7h 36m', '#6e5bff'], ['Claude', '5 users', '5h 12m', '#e9673f'], ['Fal.ai', '3 users', '3h 58m', '#1c1c1c'], ['Kalodata', '2 users', '3h 45m', '#2a93ff']] as const).map(([n, u, t, c], i) => (
          <div key={n}><Tile x={654} y={rows[i]} bg={c} />{T(723, rows[i] + 14, 15, 450, INK, n)}{T(1033, rows[i] + 8, 13.5, 400, SUB, <>{u} <span style={{ color: '#c8c8c8' }}>·</span> {t}</>)}</div>
        ))}
        {([['Sophia Williams', 'S', '#ffc0c5', '#681219', '9h 47m', '18%'], ['James Brown', 'J', '#c5d8ff', '#122368', '7h 36m', '15%'], ['Arthur Taylor', 'A', '#d5c8ff', '#2b1468', '5h 12m', '12%'], ['Emma Wright', 'E', '#ffe7b3', '#5c3d00', '3h 58m', '10%'], ['Liam Brown', 'L', '#c2f5da', '#0b4627', '3h 45m', '9%']] as const).map(([n, a, bg, fg, t, p], i) => (
          <div key={n}><Av x={1354} y={rows[i]} s={49} bg={bg} fg={fg} t={a} />{T(1423, rows[i] + 14, 15, 450, INK, n)}{T(1773, rows[i] + 8, 13.5, 400, SUB, <>{t} <span style={{ color: '#c8c8c8' }}>·</span> {p}</>)}</div>
        ))}
        {([['Fal.ai credentials missing', 'Urgent', '#1c1c1c', 108], ['Higgsfield needs relink', 'Medium', '#d7ff17', 120], ['Frame.io needs relink', 'Medium', '#6e5bff', 120], ['Kalodata needs relink', 'Medium', '#2a93ff', 120], ['Claude needs relink', 'Medium', '#e9673f', 120]] as const).map(([n, c, bg, w], i) => (
          <div key={n}><Tile x={2055} y={rows[i]} bg={bg} />{T(2124, rows[i] + 14, 15, 450, INK, n)}
            <Chip x={i === 0 ? 2497 : 2465 + [0, 0, -16, -16, 0][i]} y={rows[i] + 3} w={w} t={c} bg={c === 'Urgent' ? '#ffebec' : '#fff3eb'} fg={c === 'Urgent' ? '#681219' : '#71330a'} /></div>
        ))}
      </div>
    </div>
  )
}
