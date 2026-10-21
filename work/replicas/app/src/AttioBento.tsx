// Pixel replica (internal study, never published) of one Attio home-page feature article: "Your team, amplified"
// (heading band + full-width product stage + two half cells). Reference: knowledge/benchmarks/attio/bento-ref@2x.png,
// captured live 2026-10-21 at 1440 wide @2x with prefers-reduced-motion (final, static state), 1043x1413 CSS.
// Every position comes from the live DOM (getBoundingClientRect relative to the <article>) and reference pixel probes.
// Substitutions: interDisplay -> Inter Variable opsz 32, inter -> Inter Variable opsz 14, ss03 on everywhere.
// Marketing copy (h3, h4, p) kept verbatim ONLY so the overlay can register; all product data (companies, owners,
// research notes, email, list, chips) is our own sample data. Logos, avatars and the radial mark are neutral placeholders.
// Icons are lucide or hand-drawn primitives at Attio's measured boxes, not Attio's icon set.
// Override: squircle.css corner-shape reset to round inside this page (Attio corners are plain arcs).
import type { CSSProperties, ReactNode } from 'react'
import { Info, MessageCircle, CircleHelp, EllipsisVertical, Columns2, BadgeCheck, Sparkles, User, ScanSearch, Plus } from 'lucide-react'

const F = '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
const INK = '#1c1d1f'     // lab(10.72) h3/h4
const SUB = '#6f7988'     // lab(50.38) h3 second sentence
const DESC = '#8f99a8'    // lab(62.78) cell descriptions
const UI = '#242629'      // product UI text
const MUT = 'rgba(0,0,0,0.55)'
const FAINT = 'rgba(0,0,0,0.4)'
const LINE = '#e4e7ec'    // lab(91.52) section rules
const RULE = '#eeeff1'    // product rules
const BLUE = '#266df0'
const BTN_BLUE_SH = '0 2px 4px -2px rgba(15,107,233,0.12), 0 3px 6px -2px rgba(15,107,233,0.08)'
const FIELD_SH = '0 1px 3px 0 rgba(0,0,0,0.04), 0 0 2px 0 rgba(28,40,64,0.18)'
const CARD_SH = '0 0 1px 1px rgba(0,22,62,0.01), 0 4px 12px -1px rgba(0,22,62,0.04), 0 1px 3px -1px rgba(0,22,62,0.18)'
const COMPOSER_SH = '0 0 1px 1px rgba(0,22,62,0.02), 0 2px 6px -1px rgba(0,22,62,0.06), 0 1px 2px -1px rgba(0,22,62,0.24)'

const abs = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left, top, ...extra })
const txt = (size: number, weight: number, lh: number, ls: number, color: string, opsz = 14): CSSProperties =>
  ({ fontSize: size, fontWeight: weight, lineHeight: `${lh}px`, letterSpacing: ls, color, fontFamily: F, fontFeatureSettings: '"ss03"', fontVariationSettings: `"opsz" ${opsz}`, whiteSpace: 'nowrap', translate: `-0.5px ${DROP.has(size) ? 1 : 0}px` })
// Measured metric drift: Inter Variable sets 10/13/14px glyphs 1px higher and ~0.5px further right than Attio's
// "inter" at the same box (12/16/18px land exact), so text is nudged by its measured offset instead of moving the boxes.
const DROP = new Set([10, 13, 14])

/* ---------- primitives ---------- */

function Chevron({ left, top }: { left: number; top: number }) {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" style={abs(left, top)} aria-hidden>
      <path d="M0.6 0.6 4 4 7.4 0.6" fill="none" stroke={MUT} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Check({ left, top, on }: { left: number; top: number; on?: boolean }) {
  return (
    <div style={abs(left, top, { width: 16, height: 16, boxSizing: 'border-box', borderRadius: 5, background: on ? BLUE : '#fff', border: `1px solid ${on ? 'rgba(0,0,0,0.1)' : '#e6e7ea'}` })}>
      {on && (
        <svg width="10" height="8" viewBox="0 0 10 8" style={abs(2, 3)} aria-hidden>
          <path d="M1 4.2 3.5 6.7 9 1" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

/** neutral company placeholder: tinted tile + initial (not the real logos) */
function Mark({ left, top, size = 16, tone, letter }: { left: number; top: number; size?: number; tone: string; letter: string }) {
  return (
    <span style={abs(left, top, { width: size, height: size, boxSizing: 'border-box', borderRadius: size === 16 ? 4.8 : 5, border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', display: 'grid', placeItems: 'center', background: tone })}>
      <span style={{ ...txt(size === 16 ? 9 : 8.5, 650, 10, 0, '#fff'), marginTop: 0.5 }}>{letter}</span>
    </span>
  )
}

/** neutral person placeholder: soft circle + initial */
function Face({ left, top, tone, letter }: { left: number; top: number; tone: string; letter: string }) {
  return (
    <span style={abs(left, top, { width: 16, height: 16, boxSizing: 'border-box', borderRadius: 999, border: '1px solid rgba(0,0,0,0.05)', background: tone, display: 'grid', placeItems: 'center' })}>
      <span style={{ ...txt(8.5, 600, 9, 0, '#fff'), marginTop: 0.5 }}>{letter}</span>
    </span>
  )
}

function Btn({ left, top, width, children, kind }: { left: number; top: number; width: number; children: ReactNode; kind: 'blue' | 'white' | 'ghost' }) {
  const s: CSSProperties = kind === 'blue'
    ? { background: BLUE, border: '1px solid rgba(0,0,0,0.1)', boxShadow: BTN_BLUE_SH }
    : kind === 'white' ? { background: '#fff', boxShadow: FIELD_SH } : {}
  return <div style={abs(left, top, { width, height: 28, boxSizing: 'border-box', borderRadius: 8, ...s })}>{children}</div>
}

/* ---------- stage: table card + email card ---------- */

const COLS = [0, 176, 316, 476, 756] // company | icp | owner | research (each incl. 1px right rule)
const ROWS: { co: string; tone: string; score: number; owner: string; face: string; note: string; on?: boolean }[] = [
  { co: 'Halcyon', tone: '#3f4652', score: 98, owner: 'Ines Moreau', face: '#b08a6e', note: 'Opened 30+ sales roles' },
  { co: 'Vesper', tone: '#7a6a58', score: 98, owner: 'Tomas Lindqvist', face: '#8a9bb0', note: 'Hired a new CRO' },
  { co: 'Brightwave', tone: '#e2552b', score: 97, owner: 'Priya Natarajan', face: '#a07c66', note: 'Building its first GTM team' },
  { co: 'Tandem', tone: '#1f2328', score: 96, owner: 'Owen Gallagher', face: '#c29a7a', note: 'Opened 12 AE roles this quarter' },
  { co: 'Lumen', tone: '#2f3136', score: 96, owner: 'Hana Okafor', face: '#6f5848', note: 'Opening a new sales hub' },
  { co: 'Fernhill', tone: '#5f7d2e', score: 92, owner: 'Ines Moreau', face: '#b08a6e', note: 'Raised $80M Series C', on: true },
  { co: 'Quill', tone: '#c9a400', score: 91, owner: 'Felix Brandt', face: '#9d8f84', note: 'Doubling its sales org this year' },
  { co: 'Northgate', tone: '#3a3d44', score: 91, owner: 'Tomas Lindqvist', face: '#8a9bb0', note: 'New VP Sales from fintech' },
  { co: 'Corvid', tone: '#24262b', score: 88, owner: 'Ada Whitfield', face: '#7d6a5d', note: 'Made its first sales hires' },
]

function TableCard() {
  const iconC = MUT
  return (
    <div style={abs(71.25, 348.8, { width: 756, height: 457, background: '#fff', borderRadius: 12, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, #000 38%, transparent 100%)', maskImage: 'linear-gradient(to right, #000 38%, transparent 100%)' })}>
      {/* row 1: title + collaborators + actions */}
      <div style={abs(0, 0, { width: 756, height: 48, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
        <div style={abs(16, 17.5, { width: 14, height: 14, boxSizing: 'border-box', borderRadius: 4.2, background: BLUE, border: '1px solid rgba(0,0,0,0.05)' })}>
          <svg width="7" height="9" viewBox="0 0 7 9" style={abs(2.5, 1.5)} aria-hidden>
            <rect x="0" y="0" width="7" height="9" rx="2" fill="#fff" />
            <rect x="1.6" y="1.8" width="3.8" height="1" rx="0.5" fill={BLUE} /><rect x="1.6" y="3.6" width="3.8" height="1" rx="0.5" fill={BLUE} />
            <rect x="2.6" y="5.7" width="1.8" height="2.2" rx="0.6" fill={BLUE} />
          </svg>
        </div>
        <div style={abs(35, 13.5, { display: 'flex', alignItems: 'center', gap: 4.9, height: 20 })}>
          <span style={txt(14, 500, 20, -0.14, UI)}>Accounts to work</span>
          <Info size={13} strokeWidth={1.4} color={FAINT} style={{ marginTop: 1 }} />
        </div>
        {/* collaborators: 24px rings, 20px faces, 18px pitch */}
        {[{ c: BLUE, f: BLUE, l: 'R' }, { c: '#9b69ff', f: '#f5a300', l: 'K' }, { c: '#f97514', f: '#8d7f74', l: 'J' }].map((a, i) => (
          <div key={i} style={abs(410.4 + i * 18, 12.5, { width: 24, height: 24, boxSizing: 'border-box', borderRadius: 999, background: '#fff', border: `1px solid ${a.c}` })}>
            <div style={abs(1, 1, { width: 20, height: 20, boxSizing: 'border-box', borderRadius: 999, background: a.f, border: '1px solid rgba(0,0,0,0.1)', display: 'grid', placeItems: 'center' })}>
              <span style={txt(10, 500, 20, -0.16, '#fff')}>{a.l}</span>
            </div>
          </div>
        ))}
        <div style={abs(464.4, 13.5, { width: 22, height: 22, boxSizing: 'border-box', borderRadius: 999, background: '#f8f9fa', border: '1px solid #e6e7ea', display: 'grid', placeItems: 'center' })}>
          <span style={txt(10, 500, 14, -0.16, MUT)}>+1</span>
        </div>
        <span style={abs(499.4, 13.5, txt(14, 500, 20, -0.14, '#505155'))}>Share</span>
        <div style={abs(551.5, 16.5, { width: 1, height: 14, background: RULE })} />
        <MessageCircle size={13} strokeWidth={1.4} color={iconC} style={abs(568, 17)} />
        <CircleHelp size={13} strokeWidth={1.4} color={iconC} style={abs(596, 17)} />
        <EllipsisVertical size={13} strokeWidth={1.8} color={iconC} style={abs(624, 17)} />
        <Btn left={652.5} top={9.5} width={91.5} kind="white">
          <MessageCircle size={13} strokeWidth={1.5} color={UI} style={abs(7, 7.5)} />
          <span style={abs(25, 3, txt(14, 500, 20, -0.14, UI))}>Ask Orbit</span>
        </Btn>
      </div>
      {/* row 2: view controls */}
      <div style={abs(0, 48, { width: 756, height: 48, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
        <div style={abs(12, 10.5, { width: 146, height: 28, boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${RULE}` })}>
          <svg width="12" height="12" viewBox="0 0 12 12" style={abs(6, 7)} aria-hidden>
            <rect width="12" height="12" rx="4" fill="#00d17e" />
            {[[2, 2], [7, 2], [2, 7], [7, 7]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="3" height="3" rx="1.1" fill="#fff" />)}
          </svg>
          <span style={abs(23, 2, txt(14, 500, 20, -0.14, UI))}>All Accounts</span>
          <Chevron left={128} top={9.5} />
        </div>
        <div style={abs(166, 10.5, { width: 139, height: 28, boxSizing: 'border-box', borderRadius: 8, border: `1px solid ${RULE}` })}>
          <Columns2 size={13} strokeWidth={1.4} color="#505155" style={abs(6, 6.5)} />
          <span style={abs(24, 2, txt(14, 500, 20, -0.14, UI))}>View settings</span>
          <Chevron left={121} top={9.5} />
        </div>
        <Btn left={632.7} top={9.5} width={111.2} kind="blue">
          <Plus size={10} strokeWidth={1.6} color="#fff" style={abs(7, 8)} />
          <span style={abs(22, 3, txt(14, 500, 20, -0.14, '#fff'))}>New person</span>
        </Btn>
      </div>
      {/* table */}
      <div style={abs(0, 96, { width: 756, height: 361 })}>
        {COLS.slice(0, 4).map((x, i) => (
          <div key={i} style={abs(x, 0, { width: COLS[i + 1] - x, height: 361, boxSizing: 'border-box', borderRight: `1px solid ${RULE}` })} />
        ))}
        <div style={abs(0, 0, { width: 756, height: 36, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
          <Check left={16} top={9.5} />
          <span style={abs(44, 7.5, txt(14, 500, 20, -0.14, UI))}>Company</span>
          <Plus size={12} strokeWidth={1.3} color={MUT} style={abs(150, 12)} />
          <BadgeCheck size={13.5} strokeWidth={1.4} color="#505155" style={abs(188, 11)} />
          <span style={abs(209.5, 7.5, txt(14, 500, 20, -0.14, UI))}>ICP Score</span>
          <Sparkles size={13} strokeWidth={1.4} color={FAINT} style={abs(292, 11)} />
          <User size={12} strokeWidth={1.5} color="#505155" style={abs(327, 11.5)} />
          <span style={abs(346, 7.5, txt(14, 500, 20, -0.14, UI))}>Owner</span>
          <ScanSearch size={13.5} strokeWidth={1.4} color="#505155" style={abs(488, 10.7)} />
          <span style={abs(509.5, 7.5, txt(14, 500, 20, -0.14, UI))}>Research agent</span>
        </div>
        {ROWS.map((r, i) => {
          const y = 37 + i * 36 // data rows start 1px below the 36px header (its rule sits outside the row stack)
          const last = i === ROWS.length - 1
          return (
            <div key={r.co} style={abs(0, y, { width: 756, height: 36, boxSizing: 'border-box', borderBottom: last ? 'none' : `1px solid ${RULE}` })}>
              <Check left={16} top={10.5} on={r.on} />
              <Mark left={40} top={10.5} tone={r.tone} letter={r.co[0]} />
              <span style={abs(61, 7.5, { ...txt(14, 500, 20, -0.14, UI), textDecoration: 'underline', textDecorationColor: UI, textUnderlineOffset: 'auto' })}>{r.co}</span>
              <span style={abs(185, 7.5, { height: 22, boxSizing: 'border-box', padding: '0 4px', borderRadius: 7, background: '#e0fced', border: '1px solid #cbf7e1', display: 'flex' })}><span style={{ ...txt(14, 500, 20, -0.14, '#007d53'), translate: '-0.5px 0px' }}>{r.score}</span></span>
              <Face left={328} top={10.5} tone={r.face} letter={r.owner[0]} />
              <span style={abs(348, 7.5, txt(14, 500, 20, -0.14, UI))}>{r.owner}</span>
              <span style={abs(485, 7.5, txt(14, 500, 20, -0.14, UI))}>{r.note}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EMAIL = `Hi Ines,

Congrats on the new VP Sales seat. With the
Series C closed and 12 AE roles still open,
you've got a big team to hire quickly. We help
revenue leaders find and close senior reps
in weeks, not quarters. Free for a call?

Best,
Ada Whitfield`

function EmailCard() {
  return (
    <div style={abs(623.25, 385.8, { width: 340, height: 465, background: '#fff', borderRadius: 12, boxShadow: CARD_SH, overflow: 'hidden' })}>
      <p style={abs(12, 12, { margin: 0, ...txt(12, 500, 16, -0.16, MUT) })}>Send email</p>
      <p style={abs(12, 36, { margin: 0, ...txt(16, 600, 20, -0.16, UI) })}>Send follow up email to Ines Moreau</p>
      <p style={abs(12, 62, { margin: 0, width: 316, ...txt(12, 500, 16, -0.16, MUT), whiteSpace: 'normal' })}>The intro ties Ines's new VP seat, the Series C,<br />and 12 open AE roles to a faster hiring plan.</p>
      <div style={abs(10, 110, { width: 320, height: 303, boxSizing: 'border-box', borderRadius: 14, border: `1px solid ${RULE}`, overflow: 'hidden' })}>
        <div style={abs(0, 0, { width: 318, height: 41, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
          <span style={abs(12, 9, txt(14, 500, 20, -0.14, FAINT))}>To</span>
          <span style={abs(59, 12, { width: 16, height: 16, boxSizing: 'border-box', borderRadius: 999, background: '#e0529c', border: '1px solid rgba(0,0,0,0.05)', display: 'grid', placeItems: 'center' })}>
            <span style={{ ...txt(9, 600, 9, -0.16, '#fff'), marginTop: 0.5 }}>I</span>
          </span>
          <span style={abs(80, 10, txt(14, 500, 20, -0.14, UI))}>Ines Moreau</span>
          <span style={abs(250.3, 12, txt(12, 500, 16, -0.16, '#505155'))}>CC / BCC</span>
        </div>
        <div style={abs(0, 41, { width: 318, height: 40, boxSizing: 'border-box', borderBottom: `1px solid ${RULE}` })}>
          <span style={abs(12, 9.5, txt(14, 500, 20, -0.14, UI))}>Hiring your 12 AE seats</span>
        </div>
        <p style={abs(12, 90, { margin: 0, width: 294, ...txt(14, 500, 20, -0.14, UI), whiteSpace: 'pre' })}>{EMAIL}</p>
      </div>
      <Btn left={12} top={425} width={90.3} kind="blue"><span style={abs(7, 3, txt(14, 500, 20, -0.14, '#fff'))}>Send email</span></Btn>
      <Btn left={110.3} top={425} width={66.2} kind="ghost"><span style={abs(7, 3, txt(14, 500, 20, -0.14, MUT))}>Discard</span></Btn>
      <Btn left={245.3} top={425} width={82.6} kind="white"><span style={abs(7, 3, txt(14, 500, 20, -0.14, UI))}>Save draft</span></Btn>
    </div>
  )
}

/* ---------- lower cells ---------- */

const LIST: { co: string; tone: string; note: string }[] = [
  { co: 'Fernhill', tone: '#5f7d2e', note: 'Raised $80M Series C' },
  { co: 'Corvid', tone: '#24262b', note: 'Building out its sales team' },
  { co: 'Lumen', tone: '#2f3136', note: 'New VP Sales from fintech' },
  { co: 'Halcyon', tone: '#3f4652', note: 'Scaling faster than it can hire' },
  { co: 'Quill', tone: '#c9a400', note: 'Doubling down on enterprise' },
  { co: 'Tandem', tone: '#1f6fe0', note: 'GTM reset under a new CRO' },
]

function Composer() {
  return (
    <>
      <div style={abs(64.1, 1091.3, { width: 392, height: 46, background: '#fff', borderRadius: 12, boxShadow: COMPOSER_SH })}>
        <span style={abs(15, 13, txt(13, 500, 18, -0.13, FAINT))}>Ask something...</span>
        <span style={abs(355, 9, { width: 28, height: 28, boxSizing: 'border-box', borderRadius: 8, background: BLUE, border: '1px solid rgba(0,0,0,0.1)', boxShadow: BTN_BLUE_SH, opacity: 0.4 })}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={abs(6, 7)} aria-hidden>
            <path d="M7 10.5V3.5M7 3.5 4 6.5M7 3.5l3 3" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div style={abs(64.1, 1149.3, { width: 392, height: 217, background: '#fff', borderRadius: 12, boxShadow: CARD_SH, overflow: 'hidden' })}>
        <span style={abs(15, 10, txt(10, 500, 13, -0.16, MUT))}>9 accounts ready for outreach</span>
        <ul style={abs(7, 29, { margin: 0, padding: 0, listStyle: 'none', width: 378 })}>
          {LIST.map((l) => (
            <li key={l.co} style={{ position: 'relative', height: 30, borderRadius: 10 }}>
              <Mark left={8} top={7.5} size={15} tone={l.tone} letter={l.co[0]} />
              <span style={abs(29, 6, { display: 'flex', alignItems: 'baseline', gap: 4 })}>
                <span style={txt(13, 500, 18, -0.13, UI)}>{l.co}</span>
                <span style={txt(11, 500, 15, -0.16, FAINT)}>{l.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const CHIPS = [
  { x: 39.5, y: 94, w: 71, fill: '#e0fced', stroke: '#cbf7e1', ink: '#007d53', t: 'ICP: 98' },
  { x: 229, y: 46, w: 78, fill: '#fdf7c4', stroke: '#fcef7e', ink: '#665a00', t: 'New CRO' },
  { x: 2.5, y: 255, w: 151, fill: '#e5eeff', stroke: '#d6e5ff', ink: '#215bc4', t: 'Warm intro via Lumen' },
  { x: 194, y: 268, w: 104, fill: '#f5f0ff', stroke: '#e8ddfe', ink: '#6238b5', t: '$80M Series C' },
]

function Radar() {
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" style={abs(621.9, 1067.8)} aria-hidden>
      <defs>
        <filter id="ab-drop" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgb(28,40,64)" floodOpacity="0.17" /></filter>
      </defs>
      <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(28,40,64,0.9)" strokeWidth="1" opacity="0.067" />
      <circle cx="160" cy="160" r="100" fill="none" stroke="rgba(28,40,64,0.9)" strokeWidth="1" opacity="0.11" />
      <circle cx="160" cy="160" r="56" fill="#fff" stroke="rgba(28,40,64,0.05)" strokeWidth="1" filter="url(#ab-drop)" />
      {/* neutral placeholder mark in Attio's 46x43 box: two nested arches over a base arc (ours, not theirs) */}
      <g transform="translate(137 138.5)" fill="none" stroke="#111214" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M4 36 C10 22 17 12 20 3 H26 C29 12 36 22 42 36" />
        <path d="M4 36 Q23 46 42 36" />
        <path d="M13 34 Q23 18 33 34" />
      </g>
      {CHIPS.map((c) => (
        <g key={c.t}>
          <rect x={c.x} y={c.y} width={c.w} height="26" rx="9" fill={c.fill} stroke={c.stroke} strokeWidth="1.27" />
          <text x={c.x + c.w / 2} y={c.y + 13} textAnchor="middle" dominantBaseline="central" fill={c.ink}
            style={{ fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: -0.13, fontFeatureSettings: '"ss03"', fontVariationSettings: '"opsz" 14' }}>{c.t}</text>
        </g>
      ))}
    </svg>
  )
}

function CellHead({ x, title, desc }: { x: number; title: string; desc: ReactNode }) {
  return (
    <>
      <h4 style={abs(x, 974.8, { margin: 0, ...txt(18, 500, 22, -0.18, INK) })}>{title}</h4>
      <p style={abs(x, 1000.8, { margin: 0, width: 352, ...txt(16, 500, 22, -0.16, DESC), whiteSpace: 'normal' })}>{desc}</p>
    </>
  )
}

/* ---------- article ---------- */

export default function AttioBento() {
  return (
    <div className="attio-bento" style={{ position: 'relative', width: 1043, height: 1413, background: '#fafafb', overflow: 'hidden', fontFamily: F, WebkitFontSmoothing: 'antialiased' }}>
      <style>{`.attio-bento, .attio-bento * { corner-shape: round !important; }`}</style>
      {/* previous article's bottom rule, caught by the capture */}
      <div style={abs(0, 0, { width: 1043, height: 1, background: LINE })} />
      <article style={abs(1, 0.2, { width: 1042.5, height: 1411.8, boxSizing: 'border-box', borderBottom: `1px solid ${LINE}` })}>
        {/* heading band: 275 tall, h3 at x = 100%/18 */}
        <h3 style={abs(57.9, 113, { margin: 0, width: 560, ...txt(24, 500, 27.6, -0.24, INK, 32), whiteSpace: 'normal' })}>
          Your team, amplified. <span style={{ color: SUB }}>Agents prospect<br />and reach out when buyers are looking,<br />building a pipeline of deals ready to win.</span>
        </h3>
        {/* stage: full-width cell, #f3f4f6, product composition centred */}
        <div style={abs(0, 274.8, { width: 1042.5, height: 655, boxSizing: 'border-box', borderTop: `1px solid ${LINE}`, background: '#f3f4f6', overflow: 'hidden' })} />
        <TableCard />
        <EmailCard />
        {/* two half cells */}
        <div style={abs(0, 929.8, { width: 1042.5, height: 481, boxSizing: 'border-box', borderTop: `1px solid ${LINE}`, background: '#fafafb' })}>
          <div style={abs(0, 0, { width: 521.25, height: 480, boxSizing: 'border-box', borderRight: `1px solid ${LINE}` })} />
        </div>
        <CellHead x={28.9} title="Free your reps to sell." desc={<>Agents handle the research and busywork.<br />Reps focus their time where deals get won.</>} />
        <Composer />
        <CellHead x={550.2} title="Agents dig. You close." desc={<>Every lead is enriched and qualified, so reps<br />know when and why to engage.</>} />
        <Radar />
      </article>
    </div>
  )
}
