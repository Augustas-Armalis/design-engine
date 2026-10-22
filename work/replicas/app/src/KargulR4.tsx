// Kargul replica R4 (study only, never published): CopeCart creator "Overview", navy dark.
// Reference: knowledge/benchmarks/kargul-studio-2026-10/copecart/copecart-00.png (sanity.io original, 2880x2070 =
// 1440x1035 CSS, exact 2x). Measured: one surface #0e121b for rail, sidebar, page and cards; every edge a 1px #222530
// rule; raised fills (active nav, footer strip, segmented track) #181b25; no drop shadow anywhere; text #ffffff /
// #99a0ae / #717784 (AlignUI gray 0/400/500); one line colour #405bfb; chart lines traced column by column from the
// original and simplified (RDP, 1-2px). Coordinates are 2x reference pixels halved by d().
import type { CSSProperties, ReactNode } from 'react'
import { RiHome5Line, RiFileChartLine, RiBarChartBoxLine, RiShoppingBag3Line, RiSparkling2Line, RiSearchLine, RiNotification3Line, RiLayoutGridLine, RiPieChart2Line, RiHistoryLine, RiContactsBook3Line, RiArrowRightSLine, RiArrowDownSLine, RiCalendarScheduleLine, RiMoneyDollarBoxLine, RiGroupLine, RiHandCoinLine, RiCoupon3Line, RiWallet3Line, RiCalendar2Line } from '@remixicon/react'

const d = (v: number) => v / 2
const BG = '#0e121b', LINE = '#222530', RAISED = '#181b25', W = '#ffffff', S4 = '#99a0ae', S5 = '#717784', BLUE = '#405bfb', GREEN = '#1daf61', RED = '#fb3748'
const font: CSSProperties = { fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', WebkitFontSmoothing: 'antialiased' }
const box = (x: number, y: number, w: number, h: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: d(x), top: d(y), width: d(w), height: d(h), ...s })
const T = (x: number, y: number, size: number, weight: number, color: string, children: ReactNode, extra: CSSProperties = {}) => (
  <div style={{ position: 'absolute', left: d(x) - size * 0.05, top: d(y) - size * 0.36, fontSize: size, lineHeight: `${size * 1.4}px`, fontWeight: weight, color, whiteSpace: 'nowrap', ...extra }}>{children}</div>
)
const Ico = ({ I, x, y, s = 16, c = S4 }: { I: typeof RiHome5Line; x: number; y: number; s?: number; c?: string }) => <I size={s} color={c} style={{ position: 'absolute', left: d(x), top: d(y) }} />
const Delta = ({ v, up = true }: { v: string; up?: boolean }) => <><span style={{ color: up ? GREEN : RED, fontSize: 12 }}>{v}</span><span style={{ color: S4, fontSize: 13, marginLeft: 4 }}>vs prev</span></>
const Rule = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => <div style={box(x, y, w, h, { background: LINE })} />

const MAIN = '757,1037 792,967.5 825,1016.5 828,1016 863,908.5 898,923 933,809 966,1084.5 970,1098 1005,927.5 1039,963 1075,858 1110,890 1146,738.5 1182,938.5 1217,941 1251,1016 1255,1010.5 1287,909.5 1290,908 1322,924 1352,840 1390,790 1425,860 1445,888.5 1464,948 1479,892 1556,744.5 1571,668.5 1606,823.5 1609,825.5 1614,817.5 1629,817.5 1677,952 1712,909 1744,976 1748,978 1783,828.5 1785,827 1818,839 1853,692 1889,955 1893,947.5 1925,805 1960,874.5 1995,804 2030,902.5 2034,899.5 2066,829 2102,892'
const SMALL = '742,1988 757,1950 760,1952 771,1974 774,1974 790,1913.5 791,1912 804,1920.5 806,1918.5 821,1858 825,1879.5 835,1994.5 837,2006.5 841,2008.5 855,1926.5 858,1927 868,1942 871,1942.5 887,1883.5 889,1883 899,1896.5 903,1898 919,1816 922,1824.5 937,1931 951,1931 967,1973.5 971,1967.5 985,1913 1000,1920 1018,1850 1034,1870.5 1046,1864 1049,1865 1062,1923 1066,1931 1082,1853 1094,1882 1097,1886.5 1098,1885 1114,1774 1118,1785.5 1131,1860.5 1140,1857.5 1141,1859 1163,1936 1179,1914 1195,1951 1211,1867.5 1213,1863.5 1227,1869.5 1243,1789 1247,1807 1260,1932 1264,1922.5 1277,1853 1292,1889 1309,1852 1325,1906 1341,1866 1358,1901.5'
const STEP = '2230,1893 2291,1893 2291,1753.5 2414,1753.5 2414,1833 2538,1833 2538,2025.5 2661,2025.5 2661,1866 2784,1866 2784,1807 2845,1807'
const BARS: [number, number][] = [[1886, 1986], [1770, 1872], [1836, 1950], [1996, 1882], [1864, 1940], [1858, 1930]]

export default function KargulR4() {
  return (
    <div style={{ ...font, position: 'relative', width: 1440, height: 1035, overflow: 'hidden', background: '#2e2e2e', color: W }}>
      <style>{'.kr4, .kr4 * { corner-shape: round; }'}</style>
      <div className="kr4" style={{ position: 'absolute', inset: 0 }}>
        <div style={box(70, 102, 2900, 2000, { borderRadius: '24px 0 0 0', background: BG })} />
        {/* rail */}
        <Rule x={196} y={102} w={2} h={2000} /><Rule x={70} y={228} w={582} h={2} /><Rule x={70} y={708} w={127} h={2} />
        <svg style={box(112, 144, 44, 44)} viewBox="0 0 44 44" aria-hidden><path d="M33 13.5A14 14 0 1 0 33 30.5" fill="none" stroke={BLUE} strokeWidth={7.5} strokeLinecap="round" /><path d="M27 18.5A6.5 6.5 0 1 0 27 25.5" fill="none" stroke={BLUE} strokeWidth={5} strokeLinecap="round" /></svg>
        {([[RiHome5Line, 277], [RiFileChartLine, 365], [RiShoppingBag3Line, 541], [RiSparkling2Line, 629], [RiSearchLine, 759], [RiNotification3Line, 845]] as const).map(([I, y]) => <Ico key={y} I={I} x={118} y={y} s={16} c={S4} />)}
        <div style={box(102, 444, 64, 52, { borderRadius: 8, background: '#141b36' })} />
        <Ico I={RiBarChartBoxLine} x={118} y={454} s={16} c={BLUE} />
        <div style={box(70, 444, 6, 52, { borderRadius: '0 3px 3px 0', background: BLUE })} />
        {/* sidebar */}
        <Rule x={652} y={102} w={2} h={2000} />
        <div style={box(230, 134, 388, 64, { borderRadius: 9, background: RAISED, boxShadow: `inset 0 0 0 1px ${LINE}` })} />
        <div style={box(430, 138, 184, 56, { borderRadius: 7, background: BG, boxShadow: `0 0 0 1px ${LINE}` })} />
        {T(259, 158, 13.5, 400, S5, 'Community')}{T(477, 158, 13.5, 450, W, 'Creator')}
        <div style={box(230, 262, 388, 64, { borderRadius: 8.6, background: RAISED })} />
        <Ico I={RiLayoutGridLine} x={251} y={282} s={14} c={BLUE} />{T(299, 283, 13.5, 450, W, 'Overview')}<Ico I={RiArrowRightSLine} x={580} y={281} s={14} c={S4} />
        {([[RiPieChart2Line, 'Cope-track', 357], [RiHistoryLine, 'Transactions', 435], [RiContactsBook3Line, 'Orders', 510]] as const).map(([I, l, y]) => (<div key={l}><Ico I={I} x={251} y={y} s={15} c={S5} />{T(299, y + 3, 13.5, 400, S4, l)}</div>))}

        {/* main header */}
        <div style={box(652, 116, 2400, 2000, { borderRadius: '16px 0 0 0', boxShadow: `inset 1px 1px 0 ${LINE}` })} />
        {T(704, 180, 17.5, 500, W, 'Overview')}
        {T(703, 233, 14, 400, S4, 'A comprehensive view of your statistics')}
        {([[700, 249, 'All products', 727], [976, 255, 'Last 7 days', 1002], [1238, 498, 'Jan 20, 2026 - Feb 09, 2026', 1317], [1944, 302, 'Previous period', 1972]] as const).map(([x, w, l, tx]) => (
          <div key={l}><div style={box(x, 308, w, 68, { borderRadius: 9, boxShadow: `inset 0 0 0 1px ${LINE}` })} />{T(tx, 330, 14, 400, l.startsWith('Jan') ? W : W, l)}</div>
        ))}
        <Ico I={RiArrowDownSLine} x={899} y={331} s={14} /><Ico I={RiArrowDownSLine} x={1163} y={331} s={14} /><Ico I={RiCalendarScheduleLine} x={1266} y={327} s={15} /><Ico I={RiArrowDownSLine} x={2191} y={331} s={14} />
        {T(1751, 331, 14, 400, S5, 'compared to')}

        {/* revenue card + report column + footer strip */}
        <div style={box(700, 422, 2400, 916, { borderRadius: 20, background: RAISED })} />
        <div style={box(700, 422, 2400, 812, { borderRadius: '20px 0 20px 20px', background: BG, boxShadow: `inset 0 0 0 1px ${LINE}` })} />
        <Rule x={2156} y={424} w={2} h={808} />
        {T(751, 481, 14, 400, S4, 'Total revenue')}{T(2015, 488, 13.5, 400, S4, 'Share')}
        {T(752, 535, 24, 500, W, '$496,590')}
        <div style={{ position: 'absolute', left: d(988), top: d(531) }}><Delta v="+7.1%" /></div>
        {/* grid: solid horizontals #181b25, dashed verticals #222530 4/4 */}
        {[628, 715, 802, 890, 977, 1065, 1152].map((y) => <div key={y} style={box(750, y, 1360, 2, { background: RAISED })} />)}
        <svg style={box(0, 0, 2880, 2070)} viewBox="0 0 2880 2070" aria-hidden>
          {[859, 1049, 1240, 1430, 1621, 1812, 2003].map((x) => <path key={x} d={`M${x} 628 V1152`} stroke={LINE} strokeWidth={2} strokeDasharray="8 8" />)}
          <polyline points={MAIN} fill="none" stroke={BLUE} strokeWidth={2.6} strokeLinejoin="miter" />
          <circle cx={1622} cy={817.5} r={8} fill={BLUE} />
          <polyline points={SMALL} fill="none" stroke={BLUE} strokeWidth={2.6} />
          <polyline points={STEP} fill="none" stroke={BLUE} strokeWidth={2.6} />
        </svg>
        {([['Monday', 813], ['Tuesday', 1001], ['Wednesday', 1172], ['Thursday', 1377], ['Friday', 1587], ['Saturday', 1762], ['Sunday', 1961]] as const).map(([l, x]) => <div key={l}>{T(x, 1176, 13, 400, S5, l)}</div>)}
        {/* tooltip: #0e121b, 1px #222530, faint second edge 2px lower */}
        <div style={box(1248, 748, 336, 140, { borderRadius: 10, background: BG, boxShadow: `0 0 0 1px ${LINE}, 0 3px 0 ${RAISED}` })}>
          {T(1283 - 1248, 782 - 748, 12, 400, S5, 'Thu, Jan 8')}
          {T(1283 - 1248, 829 - 748, 17.5, 500, W, '3,484')}
          <div style={{ position: 'absolute', left: d(1395 - 1248), top: d(816 - 748) }}><Delta v="+7.1%" /></div>
        </div>
        {/* report */}
        {T(2208, 485, 15, 500, W, 'Report')}{T(2207, 537, 14, 400, S4, 'Weekly activity')}
        {([[RiMoneyDollarBoxLine, 'Income', '$496,590', '+7.1%', true, 625], [RiGroupLine, 'Affiliates', '$86,242', '-2.1%', false, 768], [RiHandCoinLine, 'Payouts', '$24,960', '+2.3%', true, 913]] as const).map(([I, l, v, dv, up, y]) => (
          <div key={l}>
            <div style={box(2207, y - 6, 88, 88, { borderRadius: 99, background: RAISED })}><Ico I={I} x={24} y={24} s={20} c={BLUE} /></div>
            {T(2324, y, 13.5, 400, S4, l)}{T(2324, y + 50, 17.5, 500, W, v)}
            <div style={{ position: 'absolute', left: d(v.length > 7 ? 2502 : 2478), top: d(y + 42) }}><Delta v={dv} up={up} /></div>
          </div>
        ))}
        {T(2207, 1104, 14, 400, S5, 'See the complete performance overview')}
        {T(2207, 1157, 14, 400, S4, 'View more details')}<Ico I={RiArrowRightSLine} x={2452} y={1154} s={13} />
        <Ico I={RiCoupon3Line} x={1092} y={1268} s={18} c={S5} />{T(1147, 1272, 14, 400, S4, <>Cope-fee: <span style={{ color: W }}>$5.5% +$1</span></>)}
        <Ico I={RiWallet3Line} x={1504} y={1268} s={18} c={S5} />{T(1560, 1272, 14, 400, S4, <>Next payout amount: <span style={{ color: W }}>$340.00</span></>)}
        <Ico I={RiCalendar2Line} x={2030} y={1268} s={17} c={S5} />{T(2084, 1272, 14, 400, S4, <>Next payout date: <span style={{ color: W }}>Nov 16, 2026</span></>)}

        {/* key metrics */}
        {T(704, 1415, 17.5, 500, W, 'Key metrics')}{T(703, 1468, 14, 400, S4, 'See key metrics of your products')}
        {([[702, 'Conversation rate', '16.9%', '+2.4%', true, 892], [1446, 'Churn rate', '2.3%', '-1.8%', false, 1616], [2190, 'MMR', '$12,450', '+5.2%', true, 2426]] as const).map(([x, l, v, dv, up, cx]) => (
          <div key={l}>
            <div style={box(x, 1538, 696, 800, { borderRadius: 20, boxShadow: `inset 0 0 0 1px ${LINE}` })} />
            {T(x + 41, 1590, 14, 400, S4, l)}
            <div style={box(x + 542, 1578, 114, 56, { borderRadius: 8, boxShadow: `inset 0 0 0 1px ${LINE}`, display: 'grid', placeItems: 'center', fontSize: 13.5, color: S4 })}>Share</div>
            {T(x + 41, 1644, 24, 500, W, v)}
            <div style={box(cx, 1636, 98, 40, { borderRadius: 5, background: up ? '#123c2e' : '#471b26', color: up ? '#1fc16b' : '#fb3748', fontSize: 12, display: 'grid', placeItems: 'center' })}>{dv}</div>
            {[1728, 1784, 1840, 1896, 1952, 2008].map((y) => <div key={y} style={box(x + 41, y, 614, 2, { background: RAISED })} />)}
            <div style={box(x + 41, 1672 + 0, 0, 0)} />
          </div>
        ))}
        {BARS.map(([p, yl], i) => (<div key={i}>
          <div style={box(1510 + i * 100, p, 30, 2066 - p, { borderRadius: '3px 3px 0 0', background: '#7d52f4' })} />
          <div style={box(1548 + i * 100, yl, 30, 2066 - yl, { borderRadius: '3px 3px 0 0', background: '#f6b51e' })} />
        </div>))}
      </div>
    </div>
  )
}
