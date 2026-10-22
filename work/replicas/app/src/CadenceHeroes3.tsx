// Cadence heroes, round 3: built from the founder's own library (lunor.design, LN-01..36) and Marcel's 55 heroes (KH-01..33).
// Shared founder tuple: h1 54/450-500/-0.03em lh 1.15 (2 lines), sub 18/28 <= 440 wide, gaps h1->sub 14, sub->CTA 40, CTA->visual
// ~90, CTAs 40 tall r10 9 apart, nav links 15 + a 36-tall Log in / Sign up pair, one grid edge (GX). Each hero is a different
// family with a signature visual that makes Cadence's idea literal (KH-01), one accent in <= 3 places (KH-14). Sample data.
//  A  F6 prompt-first, dark (Geist): the ask is the CTA; three answers rest on a horizon of light (light from the visual).
//  B  F10 data-shaped dot field, cream (Manrope): every dot is a 15-min slot of three calendars; the one shared slot glows.
//  C  F3 split, light (Inter Tight): copy left, the real app in a glass frame on a colour field rising from the corner.
import '@fontsource-variable/geist'
import '@fontsource-variable/manrope'
import '@fontsource-variable/inter-tight'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, CornerDownLeft, Sparkles, Check } from 'lucide-react'
import { RiGoogleFill, RiMicrosoftFill, RiSlackFill, RiVideoChatFill } from '@remixicon/react'
import Calendar from './Calendar'

const GX = 117, W = 1440, H = 900
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const h1: CSSProperties = { margin: 0, fontSize: 54, fontWeight: 450, letterSpacing: '-0.03em', lineHeight: 1.15 }
const sub: CSSProperties = { margin: '14px 0 0', maxWidth: 440, fontSize: 18, lineHeight: '28px', textWrap: 'balance' } as CSSProperties
const VIOLET = '#6e3ff3'

function Mark({ ink, s = 22 }: { ink: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 22 22" aria-hidden><g fill={ink}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill="#8b6cff" /></svg>
}
function Nav({ dark }: { dark?: boolean }) {
  const ink = dark ? '#f2f2f3' : '#111214', sub = dark ? 'rgb(242 242 243 / .68)' : '#5b5f66'
  return (
    <header style={{ position: 'absolute', left: GX, right: GX, top: 0, height: 80, ...row, color: ink }}>
      <span style={{ ...row, gap: 10, fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}><Mark ink={ink} />Cadence</span>
      <nav style={{ ...row, gap: 32, position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 15, fontWeight: 500, color: sub }}>
        {['Product', 'Teams', 'Integrations', 'Pricing', 'Changelog'].map((l) => <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}
      </nav>
      <span style={{ marginLeft: 'auto', ...row, gap: 8, fontSize: 14, fontWeight: 500 }}>
        <a href="#" style={{ ...row, height: 36, padding: '0 14px', borderRadius: 10, color: ink, textDecoration: 'none', boxShadow: `inset 0 0 0 1px ${dark ? 'rgb(255 255 255 / .14)' : 'rgb(17 18 20 / .12)'}` }}>Log in</a>
        <a href="#" style={{ ...row, height: 36, padding: '0 14px', borderRadius: 10, textDecoration: 'none', color: dark ? '#0b0b0d' : '#fff', background: dark ? '#f2f2f3' : '#111214' }}>Sign up</a>
      </span>
    </header>
  )
}
function Ctas({ dark }: { dark?: boolean }) {
  const ink: CSSProperties = dark ? { background: '#f2f2f3', color: '#0b0b0d', boxShadow: '0 1px 2px rgb(0 0 0 / .4)' }
    : { background: 'linear-gradient(180deg, #2b2c31 0%, #111214 100%)', color: '#fff', boxShadow: 'inset 0 1px 0 rgb(255 255 255 / .16), 0 0 0 1px #0c0d0f, 0 1px 2px rgb(17 18 20 / .24), 0 8px 18px -8px rgb(17 18 20 / .5)' }
  const ghost: CSSProperties = dark ? { color: '#f2f2f3', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .16)' } : { background: '#fff', color: '#111214', boxShadow: '0 0 0 1px rgb(17 18 20 / .1), 0 1px 2px rgb(17 18 20 / .06)' }
  return (
    <div style={{ ...row, gap: 9, fontSize: 15, fontWeight: 500 }}>
      <a href="#" style={{ ...row, gap: 8, height: 40, padding: '0 14px 0 16px', borderRadius: 10, textDecoration: 'none', ...ink }}>Start for free<ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.75 }} /></a>
      <a href="#" style={{ ...row, height: 40, padding: '0 16px', borderRadius: 10, textDecoration: 'none', ...ghost }}>Book a demo</a>
    </div>
  )
}

/* ================= A: prompt-first, dark, answers resting on a horizon ================= */
export function CadenceHeroA() {
  const F = '"Geist Variable", system-ui, sans-serif'
  const answers: [string, string, string, boolean][] = [['Tue 21', '10:00 – 10:45', 'Maya in a 1:1 until 9:50', false], ['Wed 22', '14:30 – 15:15', 'Everyone free, focus kept', true], ['Thu 23', '09:15 – 10:00', 'Theo travels after 11:00', false]]
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#08080a', fontFamily: F, color: '#f2f2f3' }}>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <defs>
          <radialGradient id="ha-glow" cx="0.5" cy="1" r="0.6"><stop offset="0" stopColor="#7c5cff" stopOpacity="0.55" /><stop offset="0.45" stopColor="#4b2fb8" stopOpacity="0.18" /><stop offset="1" stopColor="#08080a" stopOpacity="0" /></radialGradient>
          <linearGradient id="ha-rim" x1="0" x2="1"><stop offset="0.12" stopColor="#b9a8ff" stopOpacity="0" /><stop offset="0.5" stopColor="#efe9ff" /><stop offset="0.88" stopColor="#b9a8ff" stopOpacity="0" /></linearGradient>
          <filter id="ha-b"><feGaussianBlur stdDeviation="10" /></filter>
        </defs>
        <ellipse cx={720} cy={1040} rx={980} ry={420} fill="url(#ha-glow)" />
        <ellipse cx={720} cy={1700} rx={1200} ry={900} fill="#0a0910" />
        <ellipse cx={720} cy={1700} rx={1200} ry={900} fill="none" stroke="url(#ha-rim)" strokeWidth="1.5" />
        <ellipse cx={720} cy={1700} rx={1200} ry={900} fill="none" stroke="url(#ha-rim)" strokeWidth="10" opacity="0.35" filter="url(#ha-b)" />
      </svg>
      <Nav dark />
      <main>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 168, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ ...h1, color: '#f2f2f3' }}>Ask for an hour,<br />get the right one</h1>
          <p style={{ ...sub, color: 'rgb(242 242 243 / .66)' }}>Cadence reads every calendar on the invite and answers with the slot that keeps focus intact.</p>
          <div style={{ marginTop: 40, width: 520, padding: 6, boxSizing: 'border-box', borderRadius: 16, background: 'rgb(255 255 255 / .06)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .12), inset 0 1px 0 rgb(255 255 255 / .08)' }}>
            <div style={{ ...row, gap: 10, height: 44, padding: '0 6px 0 12px', borderRadius: 10, background: '#111114', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .08)' }}>
              <Sparkles size={16} strokeWidth={2} color="#b9a8ff" />
              <span style={{ fontSize: 15, color: '#f2f2f3' }}>Find 45 min with Maya and Theo next week</span>
              <a href="#" aria-label="Ask Cadence" style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 8, background: '#f2f2f3', color: '#0b0b0d' }}><CornerDownLeft size={15} strokeWidth={2} /></a>
            </div>
          </div>
          <a href="#" style={{ ...row, gap: 6, marginTop: 16, fontSize: 14, color: 'rgb(242 242 243 / .7)', textDecoration: 'none' }}>or book a 20-minute demo<ArrowRight size={14} strokeWidth={2} /></a>
        </div>
        <div data-product style={{ position: 'absolute', left: 0, right: 0, top: 604, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16 }}>
          {answers.map(([d, t, why, best]) => (
            <div key={d} style={{ width: 268, height: best ? 120 : 104, boxSizing: 'border-box', padding: '16px 18px', borderRadius: 16, background: best ? 'linear-gradient(180deg, #1d1830, #121019)' : '#111114', boxShadow: best ? 'inset 0 0 0 1px rgb(185 168 255 / .5), inset 0 1px 0 rgb(255 255 255 / .14), 0 20px 50px -20px rgb(124 92 255 / .6)' : 'inset 0 0 0 1px rgb(255 255 255 / .09), inset 0 1px 0 rgb(255 255 255 / .06)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...row, gap: 8, fontSize: 13, color: best ? '#d9cfff' : 'rgb(242 242 243 / .62)' }}>{d}{best && <span style={{ ...row, gap: 4, height: 20, padding: '0 7px', borderRadius: 999, background: 'rgb(185 168 255 / .16)', color: '#e6dfff', fontSize: 11.5 }}><Check size={11} strokeWidth={2.4} />Best</span>}</span>
              <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{t}</span>
              <span style={{ fontSize: 13, color: 'rgb(242 242 243 / .62)' }}>{why}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

/* ================= B: data-shaped dot field, cream ================= */
const DAYS = ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24']
const GUESTS = ['Maya', 'Theo', 'Ana']
const BUSY: [number, number, number][][] = [
  [[0, 4, 4], [0, 12, 8], [1, 2, 6], [1, 20, 4], [2, 0, 4], [2, 8, 4], [2, 30, 6], [3, 4, 10], [3, 22, 4], [4, 6, 6], [4, 16, 8]],
  [[0, 0, 4], [0, 20, 6], [1, 8, 8], [1, 28, 6], [2, 4, 4], [2, 14, 6], [3, 12, 12], [4, 0, 4], [4, 24, 8]],
  [[0, 8, 6], [0, 26, 6], [1, 0, 4], [1, 14, 6], [2, 10, 8], [2, 31, 5], [3, 0, 6], [3, 26, 6], [4, 10, 6], [4, 28, 4]],
]
const SHARED = { day: 2, from: 26, len: 3 }
export function CadenceHeroB() {
  const F = '"Manrope Variable", system-ui, sans-serif'
  const P = 6, COLS = 36, ROWS = 6, DAY_W = COLS * P, DAY_GAP = 26, BAND_GAP = 14
  const FW = DAYS.length * DAY_W + (DAYS.length - 1) * DAY_GAP, X0 = (W - FW) / 2, Y0 = 640
  const busy = (g: number, d: number, c: number) => BUSY[g].some(([bd, s, l]) => bd === d && c >= s && c < s + l)
  const shared = (d: number, c: number) => d === SHARED.day && c >= SHARED.from && c < SHARED.from + SHARED.len
  const dots: ReactNode[] = []
  GUESTS.forEach((_, g) => DAYS.forEach((_, d) => { for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    const x = X0 + d * (DAY_W + DAY_GAP) + c * P + P / 2, y = Y0 + g * (ROWS * P + BAND_GAP) + r * P + P / 2
    const sh = shared(d, c), b = busy(g, d, c)
    dots.push(<circle key={`${g}-${d}-${c}-${r}`} cx={x} cy={y} r={sh ? 2.1 : 1.6} fill={sh ? VIOLET : '#2a2723'} fillOpacity={sh ? 1 : b ? 0.62 : 0.1} />)
  } }))
  const sx = X0 + SHARED.day * (DAY_W + DAY_GAP) + SHARED.from * P, bandH = GUESTS.length * ROWS * P + (GUESTS.length - 1) * BAND_GAP
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#f5f2ec', fontFamily: F, color: '#16140f' }}>
      <Nav />
      <main>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 196, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ ...h1, fontWeight: 500, letterSpacing: '-0.035em' }}>Three calendars, one week<br />Cadence finds the hour</h1>
          <p style={{ ...sub, color: '#5d5850' }}>Each dot is fifteen minutes of someone’s week. Cadence lights up the slot that works.</p>
          <div style={{ marginTop: 40 }}><Ctas /></div>
        </div>
        <svg data-product width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-label="Three guests' weeks as a dot field; Wednesday 14:30 is free for all">
          <rect x={sx - 7} y={Y0 - 10} width={SHARED.len * P + 14} height={bandH + 20} rx={10} fill={VIOLET} fillOpacity={0.08} stroke={VIOLET} strokeOpacity={0.35} />
          {dots}
          {GUESTS.map((n, g) => <text key={n} x={X0 - 14} y={Y0 + g * (ROWS * P + BAND_GAP) + (ROWS * P) / 2 + 4} textAnchor="end" fontSize="12" fontWeight="500" fill="#5d5850" fontFamily={F}>{n}</text>)}
          {DAYS.map((d, i) => <text key={d} x={X0 + i * (DAY_W + DAY_GAP)} y={Y0 + bandH + 26} fontSize="12" fontWeight="500" fill={i === SHARED.day ? VIOLET : '#5d5850'} fontFamily={F}>{d}</text>)}
        </svg>
        <div style={{ position: 'absolute', left: sx + (SHARED.len * P) / 2, top: Y0 - 54, transform: 'translateX(-50%)', ...row, gap: 8, height: 32, padding: '0 12px 0 6px', borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px rgb(22 20 15 / .08), 0 6px 16px -6px rgb(22 20 15 / .18)', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 22, height: 22, borderRadius: 999, background: VIOLET, color: '#fff' }}><Check size={12} strokeWidth={2.6} /></span>Wed 14:30 · everyone free
        </div>
      </main>
    </div>
  )
}

/* ================= C: split, real app in a glass frame on a rising colour field ================= */
export function CadenceHeroC() {
  const F = '"Inter Tight Variable", system-ui, sans-serif'
  const Z = 0.77 // window (908 tall) must fill the frame to the fold: 694 / 908
  const tools: [ReactNode, string][] = [[<RiGoogleFill size={15} />, 'Google Calendar'], [<RiMicrosoftFill size={15} />, 'Outlook'], [<RiVideoChatFill size={15} />, 'Zoom and Meet'], [<RiSlackFill size={15} />, 'Slack']]
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#fbfbfc', fontFamily: F, color: '#111214' }}>
      <div aria-hidden style={{ position: 'absolute', left: 660, top: 128, right: 0, bottom: 0, borderTopLeftRadius: 32, overflow: 'hidden', background: 'radial-gradient(90% 80% at 100% 100%, #b9a6ff 0%, #d9ceff 36%, #f1edff 62%, #f6f5fb 82%)', boxShadow: 'inset 0 0 0 1px rgb(17 18 20 / .05)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgb(17 18 20 / .07) 1px, transparent 1.2px)', backgroundSize: '18px 18px', WebkitMaskImage: 'linear-gradient(180deg, #000, transparent 70%)', maskImage: 'linear-gradient(180deg, #000, transparent 70%)' }} />
      </div>
      <Nav />
      <main>
        <div style={{ position: 'absolute', left: GX, top: 236, width: 480 }}>
          <h1 style={{ ...h1, fontWeight: 500, letterSpacing: '-0.035em' }}>The calendar that<br />schedules itself</h1>
          <p style={{ ...sub, color: '#5b5f66' }}>Cadence reads every calendar on the invite, protects deep work and settles conflicts before anyone asks.</p>
          <div style={{ marginTop: 40 }}><Ctas /></div>
          <div style={{ marginTop: 90, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#5b5f66' }}>Works with the tools your team already uses</span>
            <div style={{ ...row, gap: 8, flexWrap: 'wrap' }}>
              {tools.map(([ic, n]) => <span key={n} style={{ ...row, gap: 7, height: 32, padding: '0 12px', borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px rgb(17 18 20 / .08)', fontSize: 13, color: '#2b2d31' }}><span style={{ display: 'grid', placeItems: 'center', color: '#3c3f45' }}>{ic}</span>{n}</span>)}
            </div>
          </div>
        </div>
        <div data-product style={{ position: 'absolute', left: 724, top: 196, width: 860, height: 760, padding: 10, boxSizing: 'border-box', borderRadius: 24, background: 'rgb(255 255 255 / .5)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .8), 0 0 0 1px rgb(17 18 20 / .06), 0 30px 70px -30px rgb(60 40 160 / .35)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 0 0 1px rgb(17 18 20 / .06)' }}>
            <div style={{ zoom: Z, marginLeft: -76, marginTop: -146, width: 1600, height: 1200, pointerEvents: 'none' }}><Calendar font={F} windowRadius={0} /></div>
          </div>
        </div>
      </main>
    </div>
  )
}
