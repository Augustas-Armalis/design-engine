// Requa product r1 (#/requa): a fictional purchase-approvals tool for @rokasrem's daily X batch (founder 2026-10-22: "replace
// with new batch of latest and best"). Layout family: sidebar + request inbox + request detail (mail-like three columns),
// unlike Panelry (rail + table + drawer) and Tempra (sidebar + week grid + rail). Decision moment: Requa's review of one
// request (three checks, the budget it lands in, the approval chain) and one ink primary, Approve. Icons sparingly (founder
// x-closeups r1): navigation, search, the one AI mark, the check marks. `compact` is the same app at 768 wide for the hero
// stage (no sidebar, narrower inbox), so no text crosses the stage edge. Sample data: invented company, vendors and people.
import type { CSSProperties, ReactNode } from 'react'
import { Inbox, FileText, Store, PiggyBank, CreditCard, ChartColumn, Search, Sparkles, Check, Info, ChevronDown } from 'lucide-react'

export const APP_W = 1280, APP_H = 820
const T = {
  ink: '#0E121B', sub: '#525866', mute: '#6B7180', faint: '#A3A9B6', line: '#ECEDF1', hair: '#F1F2F5', side: '#FAFAFB', weak: '#F4F5F7',
  a: '#2F5BEA', aInk: '#1E3FA8', aFill: '#EEF2FF', aRing: '#D7E0FD',
  green: '#178C4E', greenFill: '#E6F8EE', greenRing: '#C6EED8', amber: '#A35F00', amberFill: '#FFF5DE', amberRing: '#F8E1AD',
}
const font: CSSProperties = { fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.ink }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const RING = `inset 0 0 0 1px ${T.line}`
const ink: CSSProperties = { paddingBottom: 1, background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(14,18,27,0.2)' }
const stroke: CSSProperties = { paddingBottom: 1, background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: T.ink, boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` }
const TINT: Record<string, [string, string]> = {
  MN: ['#C0D5FF', '#122368'], TP: ['#C2F5DA', '#0B4627'], RK: ['#FFC0DF', '#71133E'], EL: ['#FFECC0', '#624C18'], DS: ['#CAC0FF', '#351A75'],
  AV: ['#C2F5EE', '#0B463E'],
}
const Av = ({ i, s = 24 }: { i: string; s?: number }) => (
  <span className="round" style={{ width: s, height: s, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center', fontSize: Math.max(10, s * 0.4), fontWeight: 500, flex: 'none' }}>{i}</span>
)
// vendor monogram tiles: one letter on a soft tint, the vendor's own colour
const VT: Record<string, [string, string]> = { S: ['#EAF0FF', '#2F5BEA'], P: ['#F1ECFE', '#6A44D8'], L: ['#E6F6F1', '#137A5C'], F: ['#FFF0E6', '#B5520F'], K: ['#F4F1EA', '#7A5A26'], N: ['#EEF0F4', '#3B404B'], B: ['#FDECEF', '#B4234A'] }
const Tile = ({ v, s = 32 }: { v: string; s?: number }) => (
  <span style={{ width: s, height: s, borderRadius: s * 0.32, flex: 'none', display: 'grid', placeItems: 'center', background: VT[v][0], color: VT[v][1], boxShadow: 'inset 0 0 0 1px rgba(14,18,27,0.05)', fontSize: s * 0.42, fontWeight: 600 }}>{v}</span>
)
// the mark: an open check inside a quarter round (drawn, white on the ink tile)
const Mark = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden><path d="M2 12V6.5A4.5 4.5 0 0 1 6.5 2H12v4.5A5.5 5.5 0 0 1 6.5 12H2Z" fill="#fff" opacity=".35" /><path d="M4.6 7.2 6.3 8.9 9.6 5.4" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export { Mark as RequaMark }

// ================= sidebar =================
function Nav({ icon, label, count, active }: { icon: ReactNode; label: string; count?: string; active?: boolean }) {
  return (
    <div style={{ ...row, gap: 10, height: 32, padding: '0 10px', borderRadius: 11, flexShrink: 0, background: active ? '#fff' : 'transparent', boxShadow: active ? `${RING}, 0 1px 2px rgba(14,18,27,0.04)` : 'none', fontSize: 13.5, fontWeight: active ? 500 : 450, color: active ? T.ink : T.sub }}>
      <span style={{ display: 'flex', color: active ? T.a : T.mute }}>{icon}</span><span style={{ flex: 1 }}>{label}</span>
      {count && <span style={{ fontSize: 12, color: active ? T.aInk : T.mute, fontWeight: 500, ...tnum }}>{count}</span>}
    </div>
  )
}
function Sidebar() {
  const teams: [string, number][] = [['Operations', 0.58], ['IT', 0.71], ['People', 0.34], ['Marketing', 0.82]]
  return (
    <aside style={{ width: 216, flexShrink: 0, background: T.side, boxShadow: `inset -1px 0 0 ${T.line}`, padding: '14px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ ...row, gap: 10, height: 40, padding: '0 6px', flexShrink: 0 }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, ...ink, paddingBottom: 0 }}><Mark /></span>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, lineHeight: '18px' }}>Fieldhouse Co.</span>
          <span style={{ fontSize: 12, color: T.mute, lineHeight: '16px' }}>Finance</span>
        </span>
        <ChevronDown size={15} color={T.faint} />
      </div>
      <div style={{ ...row, gap: 8, height: 32, margin: '12px 0 10px', padding: '0 10px', borderRadius: 11, background: '#fff', boxShadow: RING, fontSize: 13, color: T.mute, flexShrink: 0 }}><Search size={14} />Search</div>
      <Nav icon={<Inbox size={16} />} label="Approvals" count="7" active />
      <Nav icon={<FileText size={16} />} label="Requests" />
      <Nav icon={<Store size={16} />} label="Vendors" />
      <Nav icon={<PiggyBank size={16} />} label="Budgets" />
      <Nav icon={<CreditCard size={16} />} label="Cards" />
      <Nav icon={<ChartColumn size={16} />} label="Reports" />
      <div style={{ fontSize: 12, fontWeight: 500, color: T.mute, padding: '18px 10px 6px', flexShrink: 0 }}>Q4 budgets</div>
      {teams.map(([t, used]) => (
        <div key={t} style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <span style={{ ...row, fontSize: 13, color: T.sub }}>{t}<span style={{ marginLeft: 'auto', fontSize: 12, color: T.mute, ...tnum }}>{Math.round(used * 100)}%</span></span>
          <span style={{ position: 'relative', height: 4, borderRadius: 99, background: T.hair }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${used * 100}%`, borderRadius: 99, background: used > 0.8 ? '#E2A23B' : '#C9CDD6' }} /></span>
        </div>
      ))}
      <div style={{ marginTop: 'auto', ...row, gap: 10, height: 44, padding: '10px 6px 0', borderTop: `1px solid ${T.line}`, flexShrink: 0 }}>
        <Av i="EL" s={28} />
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13, fontWeight: 500, lineHeight: '17px' }}>Elena Lind</span>
          <span style={{ fontSize: 12, color: T.mute, lineHeight: '16px' }}>Finance lead</span>
        </span>
      </div>
    </aside>
  )
}

// ================= inbox =================
type Req = [string, string, string, string, string, string, string]
const REQS: Req[] = [
  ['S', 'Seatwell', '12 ergonomic chairs', 'MN', '€4,680', 'Waiting on you', '2h'],
  ['P', 'Pixelbay', '8 monitors for IT', 'TP', '€2,160', 'Waiting on you', '3h'],
  ['L', 'Lakehouse Trakai', 'Team offsite venue', 'RK', '€6,900', 'Over budget', '5h'],
  ['F', 'Framelab', 'Prototype tool, 5 seats', 'DS', '€1,250', 'Waiting on you', 'Tue'],
  ['K', 'Kettle & Co', 'Office coffee, monthly', 'AV', '€340', 'Auto-approved', 'Tue'],
  ['N', 'Northline Print', 'Booth banners', 'DS', '€1,120', 'Waiting on you', 'Mon'],
  ['B', 'Bright Stands', '12 laptop stands', 'TP', '€540', 'Auto-approved', 'Mon'],
  ['P', 'Pixelbay', '6 docking stations', 'TP', '€780', 'Approved', 'Fri'],
  ['L', 'Lakehouse Trakai', 'Q1 kickoff dinner', 'RK', '€1,480', 'Approved', 'Fri'],
]
const Status = ({ s }: { s: string }) => {
  const c = s === 'Over budget' ? [T.amberFill, T.amberRing, T.amber] : [T.greenFill, T.greenRing, T.green]
  return <span style={{ ...row, height: 20, padding: '0 7px', borderRadius: 7, background: c[0], boxShadow: `inset 0 0 0 1px ${c[1]}`, color: c[2], fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{s}</span>
}
function InboxList({ w }: { w: number }) {
  return (
    <section aria-label="Approvals, sample" style={{ width: w, flexShrink: 0, boxShadow: `inset -1px 0 0 ${T.line}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row, height: 56, padding: '0 16px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>Approvals</span>
        <span style={{ marginLeft: 'auto', ...row, height: 28, padding: 2, boxSizing: 'border-box', borderRadius: 11, background: T.weak, boxShadow: RING }}>
          {['Waiting 4', 'All'].map((l, k) => <span key={l} style={{ ...row, height: 24, padding: '0 9px', borderRadius: 9, fontSize: 12.5, fontWeight: 500, color: k ? T.mute : T.ink, background: k ? 'transparent' : '#fff', boxShadow: k ? 'none' : `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.06)` }}>{l}</span>)}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px', gap: 2 }}>
        {REQS.map(([v, vendor, title, who, amt, st, when], k) => {
          const sel = k === 0
          return (
            <div key={title} style={{ ...row, gap: 11, height: 68, padding: '0 10px', borderRadius: 14, flexShrink: 0, background: sel ? T.aFill : 'transparent', boxShadow: sel ? `inset 0 0 0 1px ${T.aRing}` : 'none' }}>
              <Tile v={v} />
              <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ ...row, gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{title}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 500, ...tnum }}>{amt}</span>
                </span>
                <span style={{ ...row, gap: 7 }}>
                  <span style={{ fontSize: 12, color: T.mute, whiteSpace: 'nowrap' }}>{vendor} · {when}</span>
                  <span style={{ marginLeft: 'auto', display: 'flex' }}>{st === 'Waiting on you' ? <Av i={who} s={18} /> : <Status s={st} />}</span>
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ================= request detail: the review =================
const CHECKS: ['ok' | 'info', string, string][] = [
  ['ok', 'Within budget', 'Operations Q4 office keeps €12,320 after this'],
  ['ok', 'Vendor on contract', 'Seatwell contract takes 8% off list'],
  ['info', 'Similar order in July', '6 chairs from Seatwell, delivered on time'],
]
function Detail({ compact }: { compact?: boolean }) {
  return (
    <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: compact ? '0 20px 20px' : '0 28px 24px', boxSizing: 'border-box' }}>
      <div style={{ ...row, height: 56, gap: 8, fontSize: 13, color: T.mute, flexShrink: 0 }}>
        <span>Approvals</span><span style={{ color: T.faint }}>/</span><span style={{ color: T.ink, fontWeight: 500 }}>REQ-2148</span>
        <span style={{ marginLeft: 'auto', ...row, height: 22, padding: '0 8px', borderRadius: 8, background: T.aFill, boxShadow: `inset 0 0 0 1px ${T.aRing}`, color: T.aInk, fontSize: 11.5, fontWeight: 500 }}>Waiting on you</span>
      </div>
      <div style={{ ...row, gap: 12, marginTop: 4, flexShrink: 0 }}>
        <Tile v="S" s={40} />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {compact ? <p style={{ margin: 0, fontSize: 17, lineHeight: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>12 ergonomic chairs</p>
            : <h1 style={{ margin: 0, fontSize: 17, lineHeight: '22px', fontWeight: 600, letterSpacing: '-0.015em' }}>12 ergonomic chairs, Vilnius office</h1>}
          <span style={{ ...row, gap: 6, fontSize: 12.5, color: T.mute, whiteSpace: 'nowrap' }}><Av i="MN" s={16} />Mia Novak · Operations · 2h ago</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 600, letterSpacing: '-0.02em', ...tnum }}>€4,680</span>
          <span style={{ fontSize: 12, color: T.mute }}>incl. VAT</span>
        </span>
      </div>

      {/* the review in a tray: the strip says what Requa read, the card holds the three checks */}
      <div style={{ marginTop: 18, borderRadius: 20, background: T.weak, boxShadow: RING, padding: 4, flexShrink: 0 }}>
        <div style={{ ...row, gap: 6, height: 28, padding: '0 10px 0 9px', fontSize: 12, fontWeight: 500, color: T.sub }}>
          <span style={{ display: 'flex', color: T.a }}><Sparkles size={13} /></span>Requa checked this request
          <span style={{ marginLeft: 'auto', color: T.mute, fontWeight: 400 }}>12s</span>
        </div>
        <div style={{ borderRadius: 16, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)` }}>
          {CHECKS.map(([k, t, d], i) => (
            <div key={t} style={{ ...row, gap: 11, height: 52, padding: '0 14px', boxShadow: i ? `inset 0 1px 0 ${T.hair}` : 'none' }}>
              <span className="round" style={{ width: 22, height: 22, borderRadius: 99, flex: 'none', display: 'grid', placeItems: 'center', background: k === 'ok' ? T.greenFill : T.weak, color: k === 'ok' ? T.green : T.sub, boxShadow: `inset 0 0 0 1px ${k === 'ok' ? T.greenRing : T.line}` }}>{k === 'ok' ? <Check size={13} strokeWidth={2.4} /> : <Info size={13} strokeWidth={2.2} />}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{t}</span>
                <span style={{ fontSize: 12.5, color: T.mute, whiteSpace: 'nowrap' }}>{d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* where the money lands: the Q4 office budget, this request in the accent */}
      <div style={{ marginTop: 18, flexShrink: 0 }}>
        <div style={{ ...row, fontSize: 12.5, color: T.mute }}><span style={{ color: T.ink, fontWeight: 500 }}>Operations · Q4 office</span><span style={{ marginLeft: 'auto', ...tnum }}>€28,000</span></div>
        <div style={{ display: 'flex', gap: 3, height: 10, marginTop: 9 }}>
          <span style={{ flex: 11000, borderRadius: '99px 3px 3px 99px', background: '#C9CDD6' }} />
          <span style={{ flex: 4680, borderRadius: 3, background: T.a }} />
          <span style={{ flex: 12320, borderRadius: '3px 99px 99px 3px', background: T.hair, boxShadow: `inset 0 0 0 1px ${T.line}` }} />
        </div>
        <div style={{ ...row, gap: 14, marginTop: 9, fontSize: 12, color: T.mute, whiteSpace: 'nowrap', ...tnum }}>
          {([['#C9CDD6', 'Spent €11,000'], [T.a, 'This €4,680'], [T.hair, 'Left €12,320']] as const).map(([c, l]) => <span key={l} style={{ ...row, gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: c, boxShadow: `inset 0 0 0 1px ${T.line}` }} />{l}</span>)}
        </div>
      </div>

      {!compact && (
        <div style={{ marginTop: 20, borderRadius: 16, boxShadow: RING, flexShrink: 0 }}>
          {([['Ergonomic chair, mesh, graphite', '12 × €360', '€4,320'], ['Delivery and assembly', '1 × €360', '€360']] as const).map(([d, q, t], i) => (
            <div key={d} style={{ ...row, height: 44, padding: '0 14px', fontSize: 13, boxShadow: i ? `inset 0 1px 0 ${T.hair}` : 'none' }}>
              <span>{d}</span><span style={{ marginLeft: 'auto', color: T.mute, width: 110, textAlign: 'right', ...tnum }}>{q}</span><span style={{ width: 90, textAlign: 'right', fontWeight: 500, ...tnum }}>{t}</span>
            </div>
          ))}
        </div>
      )}

      {/* the approval chain: team lead done, finance is you, payment after */}
      <div style={{ ...row, gap: 8, marginTop: 20, flexShrink: 0 }}>
        {([['DS', 'Team lead', 'Approved 1h ago', 'done'], ['', 'Finance', 'You, now', 'now'], ['EL', 'Pay vendor', 'Friday', 'next']] as const).map(([who, step, note, st], i) => (
          <div key={step} style={{ flex: 1, minWidth: 0, ...row, gap: 9, height: 50, padding: '0 11px', borderRadius: 14, background: st === 'now' ? '#fff' : T.side, boxShadow: st === 'now' ? `inset 0 0 0 1.5px ${T.a}, 0 2px 6px -2px rgba(47,91,234,0.25)` : RING }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: st === 'now' ? T.a : T.faint, width: 8, ...tnum }}>{i + 1}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{step}</span>
              <span style={{ ...row, gap: 4, fontSize: 11.5, color: st === 'done' ? T.green : T.mute, whiteSpace: 'nowrap' }}>{note}</span>
            </span>
            {who && !compact && <span style={{ marginLeft: 'auto', display: 'flex' }}><Av i={who} s={20} /></span>}
          </div>
        ))}
      </div>

      {/* the thread: why it is needed, and the team lead's note */}
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: T.mute }}>Notes</div>
        {([['MN', 'Mia Novak', '2h', 'Two of the current chairs broke this month. The team sits nine hours a day.'], ['DS', 'Dan Sato', '1h', 'In plan. Same model as July, so the desks match.']] as const).map(([who, n, t, msg]) => (
          <div key={n} style={{ display: 'flex', gap: 10 }}>
            <Av i={who} s={24} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span style={{ fontSize: 12.5, color: T.mute }}><b style={{ color: T.ink, fontWeight: 500 }}>{n}</b> · {t}</span>
              <span style={{ fontSize: 13, lineHeight: '19px', color: T.sub }}>{msg}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ ...row, gap: 8, marginTop: 'auto', paddingTop: 16, flexShrink: 0 }}>
        <span style={{ ...row, height: 40, padding: '0 18px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...ink, ...tnum }}>Approve €4,680</span>
        <span style={{ ...row, height: 40, padding: '0 16px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...stroke }}>Ask Mia</span>
        <span style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 500, color: T.mute }}>Reject</span>
      </div>
    </main>
  )
}

export function RequaApp({ compact, style }: { compact?: boolean; style?: CSSProperties }) {
  return (
    <div data-product style={{ ...font, position: 'relative', width: compact ? 768 : APP_W, height: APP_H, borderRadius: 22, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 0 0 1px rgba(14,18,27,0.08), 0 1px 2px rgba(14,18,27,0.04), 0 24px 60px -24px rgba(14,18,27,0.22)', ...style }}>
      {!compact && <Sidebar />}
      <InboxList w={compact ? 288 : 352} />
      <Detail compact={compact} />
    </div>
  )
}

export default function RequaProduct() {
  // the window on a grey canvas with 56px on every side (1392x932 splits into three 464px strips)
  return (
    <div style={{ width: APP_W + 112, height: APP_H + 112, background: 'radial-gradient(1000px 600px at 50% 0%, #F7F7F9, #ECEDF0)', position: 'relative', overflow: 'hidden' }}>
      <RequaApp style={{ position: 'absolute', left: 56, top: 56 }} />
    </div>
  )
}
