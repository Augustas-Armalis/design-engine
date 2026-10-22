// Panelry product r1 (#/panelry): a fictional hiring tool, the first never-posted project for @rokasrem's daily X series
// (founder 2026-10-22: "for Rokas do and design completely new and not used designs for him"). One job view in three regions:
// an icon rail, the candidate pipeline (joined funnel strip + table), and a candidate drawer whose decision moment is the
// panel debrief: four interviewers' scorecards summed into one call and the one open question. Floor: our own accepted
// product grammar (cprodb materials and neutrals, Quorum's joined strip); new layout family (table + drawer), new accent
// (orange), new icon set (Phosphor). One ink primary (Move to onsite). Canvas 1392x932 with 56px margins (thirds of 464).
// Sample data: invented company, people and numbers.
import type { CSSProperties, ReactNode } from 'react'
import {
  House, Briefcase, UsersThree, CalendarCheck, Handshake, ChartBar, Gear, MagnifyingGlass, Funnel, Sparkle, ArrowRight, Check,
  CaretDown, CaretUp, DotsThree, X, ArrowsOutSimple, ShareNetwork, Rows, SquaresFour, ArrowUpRight, Paperclip, Clock, ChatCircleText,
} from '@phosphor-icons/react'

export const APP_W = 1280, APP_H = 820
const T = {
  ink: '#0E121B', sub: '#525866', mute: '#6B7180', faint: '#A3A9B6', line: '#ECEDF1', hair: '#F1F2F5', side: '#FAFAFB', weak: '#F4F5F7',
  o: '#F2601B', oInk: '#A8400B', oFill: '#FFF2EA', oRing: '#FFDCC6',
  green: '#178C4E', greenFill: '#E6F8EE', greenRing: '#C6EED8', amber: '#B26B00', amberFill: '#FFF6E0', amberRing: '#FBE3AE',
  blue: '#2F5BD8', blueFill: '#EEF3FF', blueRing: '#D5E1FE', violet: '#6A44D8', violetFill: '#F3EFFE', violetRing: '#E2D9FD',
}
const font: CSSProperties = { fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', fontOpticalSizing: 'auto', WebkitFontSmoothing: 'antialiased', color: T.ink }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const tnum: CSSProperties = { fontVariantNumeric: 'tabular-nums' }
const RING = `inset 0 0 0 1px ${T.line}`
const OPTICAL: CSSProperties = { paddingBottom: 1 }
const ink: CSSProperties = { ...OPTICAL, background: 'linear-gradient(#2f2f33, #1a1a1d)', color: '#fff', boxShadow: '0 0 0 1px #0d0d0f, inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(14,18,27,0.2)' }
const stroke: CSSProperties = { ...OPTICAL, background: 'linear-gradient(#FFFFFF, #FBFBFC)', color: T.ink, boxShadow: `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` }
const TINT: Record<string, [string, string]> = {
  CN: ['#C2F5DA', '#0B4627'], HK: ['#FFD9C7', '#7A2E0B'], AO: ['#C0D5FF', '#122368'], RM: ['#FFECC0', '#624C18'], LV: ['#CAC0FF', '#351A75'],
  NH: ['#FFC0DF', '#71133E'], MR: ['#C2F5EE', '#0B463E'], YT: ['#E2E4E9', '#3B404B'], OB: ['#D9E6FF', '#1B3A80'],
  IM: ['#FFE0C2', '#6B3A0B'], MB: ['#C2F5DA', '#0B4627'], DC: ['#CAC0FF', '#351A75'], FH: ['#C0D5FF', '#122368'],
}
const Av = ({ i, s = 24 }: { i: string; s?: number }) => (
  <span className="round" style={{ width: s, height: s, borderRadius: 999, background: TINT[i][0], color: TINT[i][1], boxShadow: '0 0 0 1.5px #fff', display: 'grid', placeItems: 'center', fontSize: Math.max(10, s * 0.38), fontWeight: 500, letterSpacing: '-0.01em', flex: 'none' }}>{i}</span>
)
const Stack = ({ ids, s = 22 }: { ids: string[]; s?: number }) => <span style={{ ...row }}>{ids.map((i, k) => <span key={i} style={{ marginLeft: k ? -Math.round(s * 0.2) : 0, display: 'flex' }}><Av i={i} s={s} /></span>)}</span>

// the mark: two panels, the front one cut on a diagonal where it overlaps the back one (drawn, white on the ink tile)
const Mark = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden><rect x="1" y="1" width="8" height="8" rx="2.4" fill="#fff" opacity=".5" /><path d="M7.4 5H11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7.4Z" fill="#fff" /></svg>
)

// ================= rail =================
function RailIcon({ icon, active, badge }: { icon: ReactNode; active?: boolean; badge?: string }) {
  return (
    <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 14, color: active ? T.ink : T.mute, background: active ? '#fff' : 'transparent', boxShadow: active ? `inset 0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.05)` : 'none' }}>
      {icon}
      {badge && <span className="round" style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 99, background: T.o, boxShadow: '0 0 0 2px #FAFAFB' }} role="img" aria-label={badge} />}
    </span>
  )
}
function Rail() {
  return (
    <nav aria-label="Panelry" style={{ width: 64, flex: 'none', background: T.side, boxShadow: `inset -1px 0 0 ${T.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', boxSizing: 'border-box', gap: 6 }}>
      <span style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 13, ...ink, paddingBottom: 0, marginBottom: 10 }}><Mark size={16} /></span>
      <RailIcon icon={<House size={19} />} />
      <RailIcon icon={<Briefcase size={19} weight="fill" />} active />
      <RailIcon icon={<UsersThree size={19} />} />
      <RailIcon icon={<CalendarCheck size={19} />} badge="3 new" />
      <RailIcon icon={<Handshake size={19} />} />
      <RailIcon icon={<ChartBar size={19} />} />
      <span style={{ marginTop: 'auto' }}><RailIcon icon={<Gear size={19} />} /></span>
      <span style={{ marginTop: 6 }}><Av i="IM" s={30} /></span>
    </nav>
  )
}

// ================= pipeline =================
type Stage = 'Applied' | 'Screen' | 'Interview' | 'Onsite' | 'Offer'
const STAGE: Record<Stage, [string, string, string]> = {
  Applied: [T.weak, T.line, T.sub], Screen: [T.blueFill, T.blueRing, T.blue], Interview: [T.oFill, T.oRing, T.oInk],
  Onsite: [T.violetFill, T.violetRing, T.violet], Offer: [T.greenFill, T.greenRing, T.green],
}
const StageChip = ({ s }: { s: Stage }) => (
  <span style={{ ...row, gap: 6, height: 24, padding: '0 9px 0 8px', borderRadius: 9, background: STAGE[s][0], boxShadow: `inset 0 0 0 1px ${STAGE[s][1]}`, color: STAGE[s][2], fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', ...OPTICAL }}>
    <span className="round" style={{ width: 6, height: 6, borderRadius: 99, background: 'currentColor', opacity: 0.85 }} />{s}
  </span>
)
const Score = ({ v }: { v: number | null }) => v == null
  ? <span style={{ fontSize: 12.5, color: T.faint }}>Not scored</span>
  : (
    <span style={{ ...row, gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 500, width: 24, ...tnum }}>{v.toFixed(1)}</span>
      <span style={{ ...row, gap: 2 }}>{[1, 2, 3, 4, 5].map((k) => <span key={k} className="round" style={{ width: 9, height: 4, borderRadius: 99, background: v >= k - 0.25 ? (v >= 4.3 ? T.o : '#C9CDD6') : T.hair }} />)}</span>
    </span>
  )
type Cand = [string, string, string, Stage, number | null, string, string, string, string]
const CANDS: Cand[] = [
  ['CN', 'Clara Nilsen', 'Oslo · 8 yrs', 'Offer', 4.6, 'Referral', 'Offer out', 'since Mon', 'IM'],
  ['HK', 'Hana Kowalczyk', 'Gdańsk · 6 yrs', 'Interview', 4.4, 'Referral', 'Debrief ready', '4 of 4 in', 'IM'],
  ['AO', 'Ade Okafor', 'Lagos · 7 yrs', 'Interview', 4.1, 'Sourced', 'Panel', 'Thu 14:00', 'MB'],
  ['RM', 'Ravi Menon', 'Bengaluru · 5 yrs', 'Interview', 3.9, 'Inbound', 'Portfolio review', 'Fri 10:30', 'MB'],
  ['LV', 'Lena Vogel', 'Berlin · 4 yrs', 'Screen', 3.8, 'Inbound', 'Screen call', 'today 16:00', 'IM'],
  ['NH', 'Nora Haddad', 'Paris · 6 yrs', 'Screen', 3.7, 'Agency', 'Waiting on reply', '2 days', 'IM'],
  ['MR', 'Mateo Ruiz', 'Madrid · 3 yrs', 'Screen', 3.5, 'Inbound', 'Screen call', 'Fri 15:00', 'MB'],
  ['YT', 'Yuki Tanaka', 'Lisbon · 5 yrs', 'Applied', null, 'Inbound', 'Review CV', 'new today', 'MB'],
  ['OB', 'Owen Brady', 'Dublin · 9 yrs', 'Applied', null, 'Referral', 'Review CV', 'new today', 'IM'],
]
const COLS = [36, 214, 118, 112, 96, 160, 40] // checkbox, candidate, stage, score, source, next step, owner = 776
const Check0 = ({ on }: { on?: boolean }) => (
  <span style={{ display: 'grid', placeItems: 'center', width: 16, height: 16, borderRadius: 6, background: on ? T.ink : '#fff', boxShadow: on ? '0 0 0 1px #0d0d0f' : `inset 0 0 0 1px #DDE0E6`, color: '#fff' }}>{on && <Check size={11} weight="bold" />}</span>
)
function Table() {
  const head = ['', 'Candidate', 'Stage', 'Score', 'Source', 'Next step', '']
  return (
    <section aria-label="Sample candidates" style={{ borderRadius: 16, background: '#fff', boxShadow: RING, overflow: 'hidden' }}>
      <div style={{ ...row, height: 36, background: T.side, boxShadow: `inset 0 -1px 0 ${T.line}`, fontSize: 12, fontWeight: 500, color: T.mute }}>
        {head.map((h, k) => <span key={k} style={{ width: COLS[k], flex: 'none', padding: k ? '0 10px' : '0 0 0 12px', boxSizing: 'border-box', ...row, gap: 4 }}>{k === 0 ? <Check0 /> : h}{h === 'Score' && <CaretDown size={11} weight="bold" />}</span>)}
      </div>
      {CANDS.map(([id, name, where, stage, score, src, next, when, owner], r) => {
        const sel = r === 1
        return (
          <div key={id} style={{ ...row, height: 46, background: sel ? T.oFill : '#fff', boxShadow: r ? `inset 0 1px 0 ${sel ? T.oRing : T.hair}${sel ? `, inset 0 -1px 0 ${T.oRing}` : ''}` : sel ? `inset 0 -1px 0 ${T.oRing}` : 'none', position: 'relative' }}>
            {sel && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: '0 3px 3px 0', background: T.o }} />}
            <span style={{ width: COLS[0], flex: 'none', paddingLeft: 12, boxSizing: 'border-box', display: 'flex' }}><Check0 on={sel} /></span>
            <span style={{ width: COLS[1], flex: 'none', padding: '0 10px', boxSizing: 'border-box', ...row, gap: 10 }}>
              <Av i={id} s={28} />
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: '18px', whiteSpace: 'nowrap' }}>{name}</span>
                <span style={{ fontSize: 12, lineHeight: '16px', color: T.mute, whiteSpace: 'nowrap' }}>{where}</span>
              </span>
            </span>
            <span style={{ width: COLS[2], flex: 'none', padding: '0 10px', boxSizing: 'border-box', display: 'flex' }}><StageChip s={stage} /></span>
            <span style={{ width: COLS[3], flex: 'none', padding: '0 10px', boxSizing: 'border-box', display: 'flex' }}><Score v={score} /></span>
            <span style={{ width: COLS[4], flex: 'none', padding: '0 10px', boxSizing: 'border-box', fontSize: 13, color: T.sub }}>{src}</span>
            <span style={{ width: COLS[5], flex: 'none', padding: '0 10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <span style={{ ...row, gap: 5, fontSize: 13, fontWeight: sel ? 500 : 400, color: sel ? T.oInk : T.ink, lineHeight: '18px', whiteSpace: 'nowrap' }}>{sel && <Sparkle size={12} weight="fill" />}{next}</span>
              <span style={{ fontSize: 12, color: T.mute, lineHeight: '16px', whiteSpace: 'nowrap', ...tnum }}>{when}</span>
            </span>
            <span style={{ width: COLS[6], flex: 'none', display: 'flex', justifyContent: 'center' }}><Av i={owner} s={22} /></span>
          </div>
        )
      })}
    </section>
  )
}

// joined funnel strip: one ring, five cells, the stage the debrief belongs to is marked in the accent
const FUNNEL: [Stage, string, string, number][] = [['Applied', '148', 'this month', 1], ['Screen', '36', '24% of applied', 0.24], ['Interview', '14', '39% of screened', 0.39], ['Onsite', '5', '36% of interviewed', 0.36], ['Offer', '2', '1 accepted', 0.4]]
function FunnelStrip() {
  return (
    <div style={{ display: 'flex', borderRadius: 16, boxShadow: RING, height: 76, flex: 'none', overflow: 'hidden' }}>
      {FUNNEL.map(([s, n, note, share], k) => (
        <div key={s} style={{ position: 'relative', flex: 1, padding: '11px 14px 0', boxShadow: k ? `inset 1px 0 0 ${T.line}` : 'none', display: 'flex', flexDirection: 'column', gap: 3, background: s === 'Interview' ? 'linear-gradient(#FFF8F3, #FFFFFF)' : '#fff' }}>
          <span style={{ ...row, gap: 6, fontSize: 12.5, color: s === 'Interview' ? T.oInk : T.mute, fontWeight: s === 'Interview' ? 500 : 400 }}>
            <span className="round" style={{ width: 6, height: 6, borderRadius: 99, background: STAGE[s][2], opacity: s === 'Applied' ? 0.5 : 0.9 }} />{s}
          </span>
          <span style={{ ...row, gap: 8 }}>
            <span style={{ fontSize: 20, lineHeight: '26px', fontWeight: 600, letterSpacing: '-0.02em', ...tnum }}>{n}</span>
            <span style={{ fontSize: 11.5, color: T.mute, whiteSpace: 'nowrap', ...tnum }}>{note}</span>
          </span>
          <span style={{ position: 'absolute', left: 14, right: 14, bottom: 10, height: 4, borderRadius: 99, background: T.hair }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.round(share * 100)}%`, borderRadius: 99, background: s === 'Interview' ? T.o : '#D3D7DE' }} />
          </span>
        </div>
      ))}
    </div>
  )
}

function Pipeline() {
  return (
    <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: '0 24px', boxSizing: 'border-box' }}>
      <div style={{ ...row, height: 56, gap: 8, fontSize: 13, color: T.mute }}>
        <span>Jobs</span><span style={{ color: T.faint }}>/</span><span style={{ color: T.ink, fontWeight: 500 }}>Senior Product Designer</span>
        <span style={{ marginLeft: 'auto', ...row, gap: 10 }}>
          <Stack ids={['IM', 'MB', 'DC', 'FH']} s={24} />
          <span style={{ ...row, gap: 6, height: 32, padding: '0 12px 0 10px', borderRadius: 12, fontSize: 13, fontWeight: 500, ...stroke, paddingBottom: 0 }}><ShareNetwork size={15} />Share</span>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 12, ...stroke, paddingBottom: 0, color: T.sub }} role="img" aria-label="More"><DotsThree size={18} weight="bold" /></span>
        </span>
      </div>
      <div style={{ ...row, gap: 10, marginTop: 4 }}>
        <h1 style={{ margin: 0, fontSize: 20, lineHeight: '26px', fontWeight: 600, letterSpacing: '-0.02em' }}>Senior Product Designer</h1>
        <span style={{ ...row, gap: 6, height: 24, padding: '0 9px 0 8px', borderRadius: 9, background: T.greenFill, boxShadow: `inset 0 0 0 1px ${T.greenRing}`, color: T.green, fontSize: 12, fontWeight: 500, ...OPTICAL }}><span className="round" style={{ width: 6, height: 6, borderRadius: 99, background: T.green }} />Open · day 18</span>
      </div>
      <div style={{ fontSize: 12.5, color: T.mute, marginTop: 4 }}>Design · Remote, EU · Hiring manager Ines Moreau · Orchard Health</div>
      <div style={{ marginTop: 16 }}><FunnelStrip /></div>
      <div style={{ ...row, gap: 8, marginTop: 16, height: 32 }}>
        <div style={{ ...row, height: 32, padding: 2, boxSizing: 'border-box', borderRadius: 13, background: T.weak, boxShadow: RING }}>
          {([['All', '205'], ['Interview', '14'], ['Needs feedback', '3']] as const).map(([l, n]) => (
            <span key={l} style={{ ...row, gap: 6, height: 28, padding: '0 11px', borderRadius: 11, fontSize: 13, fontWeight: 500, color: l === 'All' ? T.ink : T.mute, background: l === 'All' ? '#fff' : 'transparent', boxShadow: l === 'All' ? `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.06)` : 'none' }}>{l}<span style={{ fontSize: 12, color: T.mute, fontWeight: 400, ...tnum }}>{n}</span></span>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', ...row, gap: 8, width: 196, height: 32, padding: '0 10px', boxSizing: 'border-box', borderRadius: 12, background: '#fff', boxShadow: RING, fontSize: 13, color: T.mute }}><MagnifyingGlass size={15} />Search candidates</span>
        <span style={{ ...row, gap: 6, height: 32, padding: '0 12px 0 10px', borderRadius: 12, fontSize: 13, fontWeight: 500, ...stroke, paddingBottom: 0 }}><Funnel size={15} />Filter</span>
        <span style={{ ...row, height: 32, padding: 2, boxSizing: 'border-box', borderRadius: 12, background: T.weak, boxShadow: RING }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.06)` }} role="img" aria-label="Table view"><Rows size={15} /></span>
          <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, color: T.mute }} role="img" aria-label="Board view"><SquaresFour size={15} /></span>
        </span>
      </div>
      <div style={{ marginTop: 12 }}><Table /></div>
      <div style={{ ...row, height: 40, fontSize: 12, color: T.mute, ...tnum }}>Showing 9 of 205 · sorted by score<span style={{ marginLeft: 'auto' }}>Sample data</span></div>
    </main>
  )
}

// ================= candidate drawer: the panel debrief =================
const SIGNALS: [string, number][] = [['Craft', 4.6], ['Communication', 4.5], ['Product sense', 4.3], ['Systems thinking', 3.4]]
const CARDS: [string, string, string, 'Strong yes' | 'Yes' | 'Lean yes', string][] = [
  ['MB', 'Marco Bell', 'Portfolio review', 'Strong yes', '4.8'], ['IM', 'Ines Moreau', 'Hiring manager', 'Yes', '4.5'],
  ['DC', 'Dana Cho', 'Systems interview', 'Lean yes', '3.6'], ['FH', 'Felix Hart', 'Product exercise', 'Yes', '4.4'],
]
const VERDICT: Record<string, [string, string, string]> = { 'Strong yes': [T.greenFill, T.greenRing, T.green], Yes: ['#F2FBF6', '#D4F1E1', T.green], 'Lean yes': [T.amberFill, T.amberRing, T.amber] }
function Drawer() {
  return (
    <aside aria-label="Candidate, sample" style={{ width: 392, flex: 'none', boxShadow: `inset 1px 0 0 ${T.line}`, display: 'flex', flexDirection: 'column', padding: '0 20px 20px', boxSizing: 'border-box' }}>
      <div style={{ ...row, height: 56, gap: 6, color: T.mute }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, boxShadow: RING }} role="img" aria-label="Close"><X size={14} /></span>
        <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 10, boxShadow: RING }} role="img" aria-label="Expand"><ArrowsOutSimple size={14} /></span>
        <span style={{ marginLeft: 'auto', fontSize: 12.5, ...tnum }}>2 of 14</span>
        <span style={{ ...row, height: 28, borderRadius: 10, boxShadow: RING }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 28 }} role="img" aria-label="Previous"><CaretUp size={13} /></span>
          <span style={{ width: 1, height: 14, background: T.line }} />
          <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 28 }} role="img" aria-label="Next"><CaretDown size={13} /></span>
        </span>
      </div>
      <div style={{ ...row, gap: 12, marginTop: 2 }}>
        <Av i="HK" s={46} />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: '22px' }}>Hana Kowalczyk</span>
          <span style={{ fontSize: 12.5, color: T.mute }}>Product designer · Gdańsk · 6 yrs</span>
        </span>
      </div>
      <div style={{ ...row, gap: 6, marginTop: 12 }}>
        {([[<Handshake size={13} />, 'Referral · Ade'], [<Paperclip size={13} />, 'Portfolio'], [<Clock size={13} />, 'Notice 1 month']] as const).map(([ic, l]) => (
          <span key={l} style={{ ...row, gap: 5, height: 24, padding: '0 8px', borderRadius: 9, background: T.weak, boxShadow: RING, fontSize: 12, color: T.sub, whiteSpace: 'nowrap', ...OPTICAL }}>{ic}{l}{l === 'Portfolio' && <ArrowUpRight size={11} />}</span>
        ))}
      </div>
      <div style={{ ...row, gap: 18, marginTop: 14, height: 34, boxShadow: `inset 0 -1px 0 ${T.line}`, fontSize: 13, color: T.mute }}>
        {['Overview', 'Scorecards', 'Activity', 'Files'].map((t) => (
          <span key={t} style={{ position: 'relative', height: 34, ...row, gap: 5, color: t === 'Overview' ? T.ink : T.mute, fontWeight: t === 'Overview' ? 500 : 400 }}>
            {t}{t === 'Scorecards' && <span style={{ fontSize: 11.5, color: T.mute, ...tnum }}>4</span>}
            {t === 'Overview' && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, borderRadius: 2, background: T.ink }} />}
          </span>
        ))}
      </div>

      {/* the debrief in a tray: the strip says what was read, the card holds the call and the one open question */}
      <div style={{ marginTop: 16, borderRadius: 20, background: T.weak, boxShadow: RING, padding: 4 }}>
        <div style={{ ...row, gap: 6, height: 28, padding: '0 10px 0 9px', fontSize: 12, fontWeight: 500, color: T.sub }}>
          <span style={{ display: 'flex', color: T.o }}><Sparkle size={13} weight="fill" /></span>Panel debrief
          <span style={{ color: T.mute, fontWeight: 400 }}>· 4 of 4 scorecards</span>
          <span style={{ marginLeft: 'auto', color: T.mute, fontWeight: 400 }}>2h ago</span>
        </div>
        <div style={{ borderRadius: 16, background: '#fff', boxShadow: `0 0 0 1px ${T.line}, 0 1px 2px rgba(14,18,27,0.04)`, padding: 14 }}>
          <div style={{ ...row, gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>Move her to onsite</span>
            <span style={{ ...row, height: 22, padding: '0 8px', borderRadius: 8, background: T.greenFill, boxShadow: `inset 0 0 0 1px ${T.greenRing}`, color: T.green, fontSize: 11.5, fontWeight: 500 }}>3 of 4 yes</span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: '20px', color: T.sub }}>Craft and communication lead every card. Systems thinking is the one soft spot.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {SIGNALS.map(([l, v]) => {
              const soft = v < 4
              return (
                <div key={l} style={{ ...row, gap: 10, height: 16 }}>
                  <span style={{ width: 112, fontSize: 12.5, color: soft ? T.amber : T.sub, ...row, gap: 5 }}>{soft && <span className="round" style={{ width: 6, height: 6, borderRadius: 99, background: '#E0A100' }} />}{l}</span>
                  <span style={{ position: 'relative', flex: 1, height: 6, borderRadius: 99, background: T.hair }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(v / 5) * 100}%`, borderRadius: 99, background: soft ? '#F2C766' : v >= 4.5 ? T.o : '#F7A877' }} />
                  </span>
                  <span style={{ width: 24, textAlign: 'right', fontSize: 12.5, fontWeight: 500, ...tnum }}>{v.toFixed(1)}</span>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 14, borderRadius: 12, background: T.weak, boxShadow: RING, padding: '10px 12px' }}>
            <div style={{ ...row, gap: 6, fontSize: 12, fontWeight: 500, color: T.mute }}><ChatCircleText size={13} />Ask in the onsite</div>
            <div style={{ fontSize: 13, lineHeight: '19px', marginTop: 4 }}>How would you grow the library past one product?</div>
            <div style={{ ...row, gap: 5, marginTop: 7, fontSize: 11.5, color: T.mute }}><Av i="DC" s={16} />From Dana's systems notes</div>
          </div>
        </div>
      </div>

      <div style={{ ...row, marginTop: 16, fontSize: 12, fontWeight: 500, color: T.mute }}>Scorecards<span style={{ marginLeft: 'auto', fontWeight: 400 }}>avg 4.3</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
        {CARDS.map(([id, n, round, v, s], k) => (
          <div key={id} style={{ ...row, gap: 10, height: 42, boxShadow: k ? `inset 0 1px 0 ${T.hair}` : 'none' }}>
            <Av i={id} s={26} />
            <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: '17px' }}>{n}</span>
              <span style={{ fontSize: 12, color: T.mute, lineHeight: '16px' }}>{round}</span>
            </span>
            <span style={{ ...row, height: 22, padding: '0 8px', borderRadius: 8, background: VERDICT[v][0], boxShadow: `inset 0 0 0 1px ${VERDICT[v][1]}`, color: VERDICT[v][2], fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{v}</span>
            <span style={{ width: 24, textAlign: 'right', fontSize: 13, fontWeight: 500, ...tnum }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ ...row, gap: 8, marginTop: 'auto', paddingTop: 16 }}>
        <span style={{ ...row, gap: 7, height: 38, padding: '0 16px 0 18px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...ink }}>Move to onsite<ArrowRight size={15} /></span>
        <span style={{ ...row, gap: 6, height: 38, padding: '0 14px', borderRadius: 14, fontSize: 14, fontWeight: 500, ...stroke }}><CalendarCheck size={15} />Schedule</span>
        <span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 38, height: 38, borderRadius: 14, ...stroke, paddingBottom: 0, color: T.sub }} role="img" aria-label="More actions"><DotsThree size={18} weight="bold" /></span>
      </div>
    </aside>
  )
}

export function PanelryApp({ style }: { style?: CSSProperties }) {
  return (
    <div data-product style={{ ...font, position: 'relative', width: APP_W, height: APP_H, borderRadius: 22, background: '#fff', overflow: 'hidden', display: 'flex', boxShadow: '0 0 0 1px rgba(14,18,27,0.08), 0 1px 2px rgba(14,18,27,0.04), 0 24px 60px -24px rgba(14,18,27,0.22)', ...style }}>
      <Rail />
      <Pipeline />
      <Drawer />
    </div>
  )
}

export default function PanelryProduct() {
  // the window on a grey canvas with 56px on every side (1392x932 splits into three 464px strips)
  return (
    <div style={{ width: APP_W + 112, height: APP_H + 112, background: 'radial-gradient(1000px 600px at 50% 0%, #F7F7F9, #ECEDF0)', position: 'relative', overflow: 'hidden' }}>
      <PanelryApp style={{ position: 'absolute', left: 56, top: 56 }} />
    </div>
  )
}
