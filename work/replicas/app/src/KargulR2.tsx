// Kargul replica R2 (study only, never published): ListKit "People" table with a contact hover card.
// Reference: knowledge/benchmarks/kargul-studio-2026-10/listkit/listkit-00.png (sanity.io original, 2880x2070 =
// 1440x1035 CSS, exact 2x: every rule is 2 device px). Measured: one navy ink #0d2a4c for all text, secondary #536880,
// sidebar #f8fafb, rules #e2e4e9 / #ebecf0, accent #288dff, 38px rows, 42px header band, and every status colour is a
// stock Tailwind v4 palette triple (50 fill / 100 ring / 500-600 text: emerald, orange, indigo, yellow, red, lime, sky, rose).
// Type solved from widths: SF (system-ui) 13.5 body, 13/500 headers, 11/500 labels and chips. Coordinates are 2x px / 2.
import type { CSSProperties, ReactNode } from 'react'
import { RiSearchLine, RiNotification3Line, RiRobot2Line, RiCheckboxMultipleLine, RiArrowUpSLine, RiArrowDownSLine, RiUser3Line, RiBuilding2Line, RiStackLine, RiMailLine, RiFlowChart, RiUserFollowLine, RiStackedView, RiSidebarFoldLine, RiFilter3Line, RiBookmarkLine, RiBookmarkFill, RiSettings3Line, RiLayoutGridFill, RiArrowRightSLine, RiTwitterXLine, RiFacebookCircleFill, RiLinkedinBoxFill, RiUserLine, RiShareBoxLine, RiFileTextLine, RiApps2Line, RiVipCrownLine, RiCompass3Line, RiBookOpenLine, RiBankCardLine, RiPagesLine } from '@remixicon/react'

const d = (v: number) => v / 2
const INK = '#0d2a4c', SUB = '#536880', ACC = '#288dff', RULE = '#e2e4e9', ROWRULE = '#ebecf0'
const SF: CSSProperties = { fontFamily: 'system-ui, -apple-system, sans-serif', WebkitFontSmoothing: 'antialiased' }
const box = (x: number, y: number, w: number, h: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: d(x), top: d(y), width: d(w), height: d(h), ...s })
// x = ink left, y = cap top (2x px). SF cap top sits ~0.25em under a 1.3 line box top
const T = (x: number, y: number, size: number, weight: number, color: string, children: ReactNode, extra: CSSProperties = {}) => (
  <div style={{ position: 'absolute', left: d(x) - size * 0.05, top: d(y) - size * 0.33, fontSize: size, lineHeight: `${size * 1.3}px`, fontWeight: weight, color, whiteSpace: 'nowrap', ...extra }}>{children}</div>
)
const Ico = ({ I, x, y, s = 16, c = INK }: { I: typeof RiUserLine; x: number; y: number; s?: number; c?: string }) => <I size={s} color={c} style={{ position: 'absolute', left: d(x), top: d(y) }} />

// Tailwind v4 palette triples: [50 fill, 100 ring, text]
const TW: Record<string, [string, string, string]> = {
  CRM: ['#eef2ff', '#e0e7ff', '#4f39f6'], Productivity: ['#ecfdf5', '#d0fae5', '#00bc7d'], 'Social media': ['#fff7ed', '#ffedd4', '#ff6900'],
  Travel: ['#f7fee7', '#ecfcca', '#7ccf00'], Media: ['#f0f9ff', '#dff2fe', '#00a6f4'], Tech: ['#fefce8', '#fef9c2', '#d08700'],
  'E-commerce': ['#fef2f2', '#ffe2e2', '#fb2c36'], Transportation: ['#fff1f2', '#ffe4e6', '#ff2056'],
}
const ROWS: [string, string, string, string, string, string][] = [
  ['Emma Rivers', 'Mailchimp', '#ffe01b', 'User Research Director', 'Nisi ut aliquip ex ea commodo consequat.', 'CRM'],
  ['Noah Kingsley', 'Notion', '#111', 'Product Strategy Director', 'Duis aute irure dolor in reprehenderit in voluptate ve...', 'Productivity'],
  ['Ava Sinclair', 'Slack', '#e01e5a', 'Product Design Manager', 'Cillum dolore eu fugiat nulla pariatur.', 'Productivity'],
  ['Lucas Fairchild', 'Twitch', '#9146ff', 'Experience Director', 'Aenean faucibus nibh et justo cursus id rutrum.', 'Social media'],
  ['Oliver Greenfield', 'Meta', '#0866ff', 'Product Design Lead', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', 'Social media'],
  ['Ethan Blackwood', 'Airbnb', '#ff5a5f', 'User Interface Director', 'Curabitur pretium tincidunt lacus.', 'Travel'],
  ['Mia Westbrook', 'Medium', '#111', 'Service Design Lead', 'Nullam varius, turpis et commodo pharetra, est eros...', 'Media'],
  ['Mason Caldwell', 'Zoom', '#2d8cff', 'Customer Experience Director', 'Excepteur sint occaecat cupidatat non proident.', 'Productivity'],
  ['Sophia Brightman', 'Apple', '#111', 'User Experience Manager', 'Sed do eiusmod tempor incididunt ut labore et dolo...', 'Tech'],
  ['Isabella Hartman', 'Tinder', '#fd5068', 'Design Operations Manager', 'Sunt in culpa qui officia deserunt mollit anim id est l...', 'Social media'],
  ['Charlotte Winslow', 'Shopify', '#5e8e3e', 'Design Thinking Facilitator', 'Sed lectus. Praesent elementum facilisis leo.', 'E-commerce'],
  ['Amelia Stone', 'Lyft', '#ff00bf', 'Visual Design Director', 'Donec lacinia congue felis in faucibus.', 'Transportation'],
  ['Benjamin Cross', 'Snapchat', '#fffc00', 'Human-Centered Design Lead', 'Morbi tincidunt, nisi et bibendum tincidunt, nisi elit.', 'Social media'],
  ['Liam Hawthorne', 'Discord', '#5865f2', 'Interaction Design Specialist', 'Ut enim ad minim veniam, quis nostrud exercitation...', 'Productivity'],
  ['Harper Lane', 'Pinterest', '#e60023', 'Experience Innovation Director', 'Vestibulum ante ipsum primis in faucibus orci luctus...', 'Social media'],
  ['Jameson Pierce', 'Safari', '#1b8cf5', 'User Experience Strategist', 'Aenean go to the next level.', 'Tech'],
  ['Harper Lane', 'Pinterest', '#e60023', 'Experience Innovation Director', 'Vestibulum ante ipsum primis in faucibus orci luctus...', 'Social media'],
  ['Benjamin Cross', 'Snapchat', '#fffc00', 'Human-Centered Design Lead', 'Morbi tincidunt, nisi et bibendum tincidunt, nisi elit.', 'Social media'],
  ['Liam Hawthorne', 'Discord', '#5865f2', 'Interaction Design Specialist', 'Ut enim ad minim veniam, quis nostrud exercitation...', 'Productivity'],
  ['Liam Hawthorne', 'Discord', '#5865f2', 'Interaction Design Specialist', 'Ut enim ad minim veniam, quis nostrud exercitation...', 'Productivity'],
]
const NAV: [typeof RiUserLine, string, number, number, number][] = [
  // icon, label, cap-top y, icon x, label x
  [RiNotification3Line, 'Notifications', 284, 105, 153], [RiRobot2Line, 'AI Assistants', 358, 105, 153], [RiCheckboxMultipleLine, 'Leads', 428, 105, 154],
  [RiBuilding2Line, 'Companies', 557, 157, 205], [RiStackLine, 'Enrichment', 621, 157, 206], [RiMailLine, 'Email', 687, 105, 154],
  [RiFlowChart, 'Workflow', 755, 105, 153], [RiUserFollowLine, 'Web Visitors', 823, 105, 153], [RiStackedView, 'Integrations', 894, 105, 154],
  [RiCompass3Line, 'Getting Started', 1718, 105, 153], [RiBookOpenLine, 'Education', 1789, 105, 154], [RiSettings3Line, 'Settings', 1861, 105, 153],
]

export default function KargulR2() {
  return (
    <div style={{ ...SF, position: 'relative', width: 1440, height: 1035, overflow: 'hidden', background: '#2e2e2e', color: INK }}>
      <style>{'.kr2, .kr2 * { corner-shape: round; }'}</style>
      <div className="kr2" style={{ position: 'absolute', inset: 0 }}>
        {/* window: sidebar surface, main white panel inset with its own ring */}
        <div style={box(68, 76, 2900, 1920, { borderRadius: 22, background: '#f8fafb' })} />
        <div style={box(548, 92, 2400, 1904, { borderRadius: '16px 0 0 0', background: '#fff', boxShadow: `0 0 0 1px #e5e7eb` })} />

        {/* sidebar */}
        <div style={box(104, 116, 30, 30, {})}>{[0, 1, 2].map((r) => [0, 1].map((c) => <div key={`${r}${c}`} style={{ position: 'absolute', left: c * 8, top: r * 5.5, width: c ? 7 : 5, height: 4, borderRadius: 1, background: ACC }} />))}</div>
        {T(139, 116, 17.5, 700, INK, 'listkit', { letterSpacing: '-0.03em' })}
        <Ico I={RiSidebarFoldLine} x={487} y={113} s={16} />
        <div style={box(88, 188, 442, 60, { borderRadius: 8, background: '#fff', boxShadow: `0 0 0 1px ${RULE}, 0 1.5px 3px rgba(13,42,76,.055)` })} />
        <Ico I={RiSearchLine} x={104} y={203} s={15} />{T(153, 210, 13.5, 400, INK, 'Quick search')}
        <div style={box(470, 204, 42, 30, { borderRadius: 4.5, background: '#f3f4f6', fontSize: 10.5, color: INK, display: 'grid', placeItems: 'center' })}>⌘K</div>
        <div style={box(476, 281, 36, 36, { borderRadius: 99, background: '#ff2056', color: '#fff', fontSize: 10.5, display: 'grid', placeItems: 'center' })}>12</div>
        <Ico I={RiArrowUpSLine} x={481} y={424} s={16} /><Ico I={RiArrowDownSLine} x={481} y={684} s={16} />
        <div style={box(140, 476, 388, 60, { borderRadius: 6, background: '#e5f2ff' })} />
        <Ico I={RiUser3Line} x={158} y={491} s={15} c={ACC} />{T(206, 495, 13.5, 400, ACC, 'People')}
        {NAV.map(([I, l, y, ix, lx]) => (<div key={l}><Ico I={I} x={ix} y={y - 3} s={15} />{T(lx, y + (ix === 157 ? 1 : 4.5), 13.5, 400, INK, l)}</div>))}
        {T(106, 1491, 13.5, 600, INK, 'Free Plan')}
        {T(105, 1538, 11.5, 400, INK, 'Upgrade to unlock unlimited', { letterSpacing: '-0.01em' })}
        {T(105, 1573, 11.5, 400, INK, 'Contacts, Leads and Emails', { letterSpacing: '-0.01em' })}
        <div style={box(102, 1614, 190, 64, { borderRadius: 6, background: ACC, boxShadow: 'inset 0 -1px 0 #2375d3, 0 1px 2px rgba(13,42,76,.1)' })} />
        <Ico I={RiVipCrownLine} x={124} y={1633} s={14} c="#fff" />{T(170, 1636, 12.5, 500, '#fff', 'Upgrade')}
        <div style={box(104, 1930, 32, 32, { borderRadius: 6, background: '#ff2056', color: '#fff', fontSize: 10, display: 'grid', placeItems: 'center' })}>J</div>
        {T(153, 1939, 13.5, 400, INK, 'James Douglas')}

        {/* header */}
        {T(598, 138, 18, 600, INK, 'People')}
        <div style={box(774, 122, 222, 56, { borderRadius: 8, background: '#ebf5ff', boxShadow: 'inset 0 0 0 1px #e5f2ff' })} />
        <div style={box(774, 204, 222, 4, { background: ACC })} />
        <Ico I={RiLayoutGridFill} x={791} y={139} s={13} c={ACC} />{T(830, 140, 13.5, 400, ACC, 'Total')}{T(905, 142, 11, 400, ACC, '212.212')}
        <Ico I={RiPagesLine} x={1028} y={139} s={13} c={SUB} />{T(1070, 140, 13.5, 400, SUB, 'Net new')}{T(1180, 142, 11, 400, SUB, '11.231')}
        <Ico I={RiBookmarkLine} x={1291} y={139} s={13} c={SUB} />{T(1331, 140, 13.5, 400, SUB, 'Saved')}{T(1420, 142, 11, 400, SUB, '123')}
        <div style={box(548, 206, 2400, 2, { background: '#e5e7eb' })} />
        <div style={box(2692, 118, 400, 64, { borderRadius: 7, background: ACC, boxShadow: 'inset 0 -1px 0 #2375d3' })} />
        <Ico I={RiBankCardLine} x={2715} y={135} s={14} c="#fff" />{T(2760, 140, 13.5, 500, '#fff', 'Checkout')}

        {/* filter row */}
        <div style={box(596, 236, 156, 60, { borderRadius: 7, boxShadow: `inset 0 0 0 1px ${RULE}` })} />
        <Ico I={RiFilter3Line} x={620} y={251} s={15} />{T(666, 256, 13.5, 400, INK, 'Filter')}
        <div style={box(770, 236, 284, 60, { borderRadius: 7, boxShadow: `inset 0 0 0 1px ${RULE}` })} />
        <Ico I={RiBookmarkLine} x={790} y={251} s={14} />{T(837, 256, 13.5, 500, INK, 'Saved filter')}<Ico I={RiArrowDownSLine} x={998} y={250} s={15} />
        <div style={box(2704, 236, 300, 60, { borderRadius: 7, boxShadow: `inset 0 0 0 1px ${RULE}` })} />
        <Ico I={RiApps2Line} x={2729} y={251} s={15} />{T(2773, 256, 13.5, 400, INK, 'Settings')}

        {/* table: frame, header band, 38px rows */}
        <div style={box(596, 328, 2400, 1650, { borderRadius: 10, boxShadow: `inset 0 0 0 1px ${RULE}` })} />
        <div style={box(598, 330, 2400, 84, { background: '#f8fafb', borderRadius: '9px 0 0 0' })} />
        <div style={box(598, 414, 2400, 2, { background: ROWRULE })} />
        {([[RiUserLine, 'Full name', 632, 674], [RiBuilding2Line, 'Company', 950, 992], [RiFileTextLine, 'Job title', 1229, 1271], [RiShareBoxLine, 'Channel', 1668, 1713], [RiFileTextLine, 'Description', 1909, 1954], [RiApps2Line, 'Industry', 2629, 2674]] as const).map(([I, l, ix, lx]) => (
          <div key={l}><Ico I={I} x={ix} y={354} s={14} />{T(lx, 361, 13, 500, INK, l)}</div>
        ))}
        {ROWS.map(([n, co, cc, job, desc, ind], i) => {
          const y = 416 + i * 76, c = TW[ind]
          return (
            <div key={i}>
              <div style={box(598, y + 74, 2400, 2, { background: ROWRULE })} />
              {T(630, y + 30, 13.5, 400, INK, n)}
              <div style={box(950, y + 25, 28, 28, { borderRadius: 7, background: cc })} />
              {T(997, y + 30, 13.5, 400, INK, co, { textDecoration: 'underline', textDecorationColor: '#d5dae1', textUnderlineOffset: 3 })}
              {T(1229, y + 30, 12.4, 400, INK, job)}
              <Ico I={RiTwitterXLine} x={1678} y={y + 24} s={14} c="#8a96a5" /><Ico I={RiFacebookCircleFill} x={1727} y={y + 24} s={13} c="#8a96a5" /><Ico I={RiLinkedinBoxFill} x={1775} y={y + 24} s={13} c="#8a96a5" />
              {T(1910, y + 30, 13.5, 400, INK, desc.replace('...', ''), { width: 308, overflow: 'hidden', textOverflow: 'ellipsis' })}
              <Ico I={RiArrowRightSLine} x={2536} y={y + 22} s={15} />
              <div style={{ ...box(2628, y + 14, 0, 44), width: 'auto', paddingInline: 6.5, borderRadius: 6, background: c[0], boxShadow: `inset 0 0 0 1px ${c[1]}`, color: c[2], fontSize: 11, fontWeight: 500, lineHeight: '22px' }}>{ind}</div>
            </div>
          )
        })}

        {/* contact hover card (KMD-05 L3: ring + 2px/1 + 10px/8, nothing above the top edge) */}
        <div style={box(830, 296, 604, 456, { borderRadius: 11.5, background: '#fff', boxShadow: '0 0 0 1px #e8e8e8, 0 2px 1px rgba(0,0,0,.05), 0 10px 8px rgba(0,0,0,.07)' })} />
        <div style={box(856, 332, 64, 64, { borderRadius: 99, background: '#fdeac1', color: '#7a5600', fontSize: 13, fontWeight: 500, display: 'grid', placeItems: 'center' })}>ER</div>
        {T(937, 337, 14, 500, INK, 'Emma Rivers')}{T(937, 375, 11.2, 400, INK, 'User Research Director')}
        <Ico I={RiLinkedinBoxFill} x={1371} y={340} s={12.5} c="#9aa5b2" />
        {T(857, 445, 11, 500, SUB, 'Email')}{T(1133, 445, 11, 500, SUB, 'Direct number')}
        {T(857, 494, 13.5, 500, INK, 'emma@rives.com')}{T(1133, 494, 13.5, 500, INK, '+62 813 1620 0235', { letterSpacing: '-0.045em' })}
        {T(857, 564, 11, 500, SUB, 'Company')}{T(1133, 564, 11, 500, SUB, 'Website')}
        {T(858, 612, 13.5, 500, INK, 'Mailchimp')}{T(1134, 612, 13.5, 500, INK, 'mailchimp.com')}
        <div style={box(856, 670, 552, 56, { borderRadius: 6, boxShadow: 'inset 0 0 0 1px #ebecf0' })} />
        <Ico I={RiBookmarkFill} x={1081} y={686} s={11} />{T(1117, 685, 11, 600, INK, 'Saved')}
      </div>
    </div>
  )
}
