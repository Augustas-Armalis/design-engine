// X post: Cadence "Find a time" screen in Rico's best-performing post format (heyrico-deep-2026-10.md "what performs on X":
// his #1 post, 1,768 likes / 317k views, img 2079628240944263565-0): a portrait 13:16 crop of ONE calm screen at large scale,
// browser window bleeding off the right edge on a pale canvas with a faint dot band; the tokens go in the tweet text, not the
// image. UI in his measured grammar (SF Pro, 1px size steps, four greys, #EEEFF2 hairlines, radius by height, one blue).
// Rendered at 1040x1280 CSS @3x -> 3120x3840. Sample data.
import type { CSSProperties, ReactNode } from 'react'
import { PanelLeft, ChevronLeft, ChevronRight, Lock, PlusCircle, Plus, CalendarDays, Link2, Focus, Sparkles, Search, Check, Clock3, Plane, UtensilsCrossed, BarChart3 } from 'lucide-react'

const SF = '-apple-system, "SF Pro Text", "SF Pro", system-ui, sans-serif'
const G = { ink: '#262626', g2: '#4a4a4a', g3: '#6b6b6b', line: '#EEEFF2', soft: '#F4F4F5', blue: '#1F63D6' }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const ic = { size: 16, strokeWidth: 1.35 }

const Nav = ({ icon, label, active, dot }: { icon?: ReactNode; label: string; active?: boolean; dot?: 'blue' | 'ring' }) => (
  <div style={{ ...row, gap: 10, height: 30, padding: '0 10px', borderRadius: 8, fontSize: 14, color: G.ink, background: active ? G.soft : undefined }}>
    <span style={{ display: 'grid', placeItems: 'center', width: 16, height: 16, color: active ? G.ink : G.g3 }}>
      {icon ?? <span style={{ width: 6, height: 6, borderRadius: 99, background: dot === 'blue' ? '#0A84FF' : 'transparent', boxShadow: dot === 'ring' ? `inset 0 0 0 1.2px ${G.g3}` : undefined }} />}
    </span>
    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{label}</span>
  </div>
)
const Label = ({ children }: { children: ReactNode }) => <div style={{ height: 28, padding: '0 10px', display: 'flex', alignItems: 'flex-end', paddingBottom: 6, fontSize: 13, color: G.g3 }}>{children}</div>

const FACES: [string, string][] = [['M', '#8B5CF6'], ['T', '#22A06B'], ['Y', '#E8A23A']]
const Face = ({ l, c, s = 22, i = 0 }: { l: string; c: string; s?: number; i?: number }) => (
  <span style={{ display: 'grid', placeItems: 'center', width: s, height: s, marginLeft: i ? -8 : 0, borderRadius: 999, background: `color-mix(in oklab, ${c} 18%, white)`, color: `color-mix(in oklab, ${c} 75%, black)`, fontSize: Math.max(11, s * 0.42), fontWeight: 600, boxShadow: '0 0 0 2px #fff' }}>{l}</span>
)
// week preview blocks per day: [calendar colour, height, is the chosen slot]
const WEEK: [string, number, boolean][][] = [
  [['#2F74E8', 22, false], ['#8B5CF6', 44, false], ['#E8A23A', 30, false], ['#22A06B', 26, false]],
  [['#2F74E8', 22, false], ['#22A06B', 34, false], ['#8B5CF6', 52, false], ['#E8A23A', 24, false]],
  [['#2F74E8', 22, false], ['#8B5CF6', 30, false], ['#1F63D6', 40, true], ['#22A06B', 28, false]],
  [['#2F74E8', 22, false], ['#E8A23A', 48, false], ['#8B5CF6', 26, false], ['#2F74E8', 30, false]],
  [['#2F74E8', 22, false], ['#22A06B', 28, false], ['#E8A23A', 36, false], ['#8B5CF6', 40, false]],
]

export default function CadenceXPost() {
  const Z = 1.5
  const slots: [ReactNode, string, string, boolean][] = [
    [<Check size={16} strokeWidth={2.2} />, 'Wed 22 · 14:30 – 15:15', 'Everyone is free, focus time kept', true],
    [<Plane size={16} strokeWidth={1.5} />, 'Thu 23 · 09:15 – 10:00', 'Theo travels after 11:00, so mornings only', false],
    [<UtensilsCrossed size={16} strokeWidth={1.5} />, 'Fri 24 · 16:00 – 16:45', 'After the team lunch, Ana joins remotely', false],
  ]
  return (
    <div style={{ position: 'relative', width: 1040, height: 1280, overflow: 'hidden', background: '#F7F7F8', fontFamily: SF, WebkitFontSmoothing: 'antialiased', color: G.ink }}>
      <div aria-hidden style={{ position: 'absolute', left: 140, right: 0, top: 0, height: 56, backgroundImage: 'radial-gradient(rgb(0 0 0 / .07) 1px, transparent 1.3px)', backgroundSize: '6px 6px', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)' }} />
      <div data-subject style={{ position: 'absolute', left: 56, top: 56, width: 1100, height: 1300, borderRadius: 26, background: '#fff', boxShadow: '0 0 0 1px #E6E6E8, 0 1px 2px rgb(0 0 0 / .03)', overflow: 'hidden' }}>
        <div style={{ zoom: Z, width: 1100 / Z, height: 1300 / Z, display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...row, height: 52, padding: '0 18px', gap: 18, boxShadow: `inset 0 -1px 0 ${G.line}`, flex: 'none' }}>
            <span style={{ display: 'flex', gap: 8 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: 99, background: c }} />)}</span>
            <PanelLeft size={17} strokeWidth={1.3} color={G.g3} />
            <span style={{ display: 'flex', gap: 14, color: G.g3 }}><ChevronLeft size={17} strokeWidth={1.3} /><ChevronRight size={17} strokeWidth={1.3} style={{ opacity: 0.5 }} /></span>
            <span style={{ marginLeft: 'auto', ...row, gap: 8, height: 30, width: 400, padding: '0 12px', borderRadius: 999, background: G.soft, fontSize: 13.5, color: G.ink }}>
              <PlusCircle size={14} strokeWidth={1.3} color={G.g3} /><span style={{ marginLeft: 'auto', ...row, gap: 6 }}><Lock size={11} strokeWidth={2} color={G.g3} />cadence.so</span><span style={{ width: 150 }} />
            </span>
          </div>
          <div style={{ ...row, height: 56, padding: '0 18px', gap: 6, boxShadow: `inset 0 -1px 0 ${G.line}`, flex: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 22 22" style={{ marginRight: 14 }} aria-hidden><g fill={G.ink}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill={G.blue} /></svg>
            {([['Calendar', <CalendarDays {...ic} />], ['Find a time', <Sparkles {...ic} />], ['Focus', <Focus {...ic} />], ['Insights', <BarChart3 {...ic} />]] as const).map(([l, i]) => (
              <span key={l} style={{ ...row, gap: 7, height: 30, padding: '0 10px', borderRadius: 8, fontSize: 14.5, color: l === 'Find a time' ? G.ink : G.g2, background: l === 'Find a time' ? G.soft : undefined }}><span style={{ display: 'grid', placeItems: 'center', color: G.g3 }}>{i}</span>{l}</span>
            ))}
            <span style={{ marginLeft: 'auto', ...row, gap: 8, height: 32, width: 220, padding: '0 12px', borderRadius: 10, boxShadow: `inset 0 0 0 1px ${G.line}`, fontSize: 14, color: G.g3 }}><Search size={14} strokeWidth={1.4} />Search</span>
          </div>
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            <aside style={{ width: 224, flex: 'none', padding: '14px 10px', boxShadow: `inset -1px 0 0 ${G.line}`, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Nav icon={<Plus size={16} strokeWidth={1.35} />} label="New event" />
              <Nav icon={<CalendarDays {...ic} />} label="This week" />
              <Nav icon={<Link2 {...ic} />} label="Scheduling links" />
              <Nav icon={<Focus {...ic} />} label="Focus time" />
              <Nav icon={<Sparkles {...ic} />} label="Find a time" active />
              <div style={{ height: 14 }} />
              <Label>Teams</Label>
              {([['Design', '#8B5CF6'], ['Product', '#2F74E8'], ['Hiring', '#E8A23A'], ['Research', '#22A06B']] as const).map(([t, c]) => <Nav key={t} icon={<span style={{ width: 10, height: 10, borderRadius: 3, background: c }} />} label={t} />)}
              <div style={{ height: 14 }} />
              <Label>Upcoming</Label>
              <Nav label="Standup" dot="ring" />
              <Nav label="1:1 with Maya" dot="ring" />
              <Nav label="Design review" dot="blue" />
              <Nav label="Candidate interview with Lea" dot="ring" />
              <Nav label="Roadmap planning for Q1" dot="blue" />
              <Nav label="Vendor call" dot="ring" />
            </aside>
            <main data-product style={{ flex: 1, padding: '48px 0 0 82px' }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12, background: G.ink, color: '#fff' }}><Sparkles size={20} strokeWidth={1.6} /></span>
              <h1 style={{ margin: '22px 0 0', fontSize: 26, fontWeight: 500, letterSpacing: '-0.4px' }}>Find a time</h1>
              <p style={{ margin: '10px 0 0', fontSize: 15.5, color: G.g2 }}>Design review · 45 min · Maya, Theo and you</p>
              <div style={{ ...row, gap: 16, marginTop: 26 }}>
                <a href="#" style={{ ...row, height: 40, padding: '0 20px', borderRadius: 999, background: '#2C2C2E', color: '#fff', fontSize: 15, textDecoration: 'none' }}>Send invite</a>
                <span style={{ display: 'flex' }}>{FACES.map(([l, c], i) => <Face key={l} l={l} c={c} s={30} i={i} />)}</span>
              </div>
              <div style={{ marginTop: 32, width: 560, borderRadius: 16, boxShadow: `0 0 0 1px ${G.line}`, overflow: 'hidden' }}>
                {slots.map(([i, t, d, best], k) => (
                  <div key={t} style={{ ...row, gap: 18, height: 76, padding: '0 22px', boxShadow: k < slots.length - 1 ? `inset 0 -1px 0 ${G.line}` : undefined }}>
                    <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 999, background: best ? G.blue : G.soft, color: best ? '#fff' : G.g3 }}>{i}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ ...row, gap: 10 }}><span style={{ fontSize: 15, fontWeight: 500, color: G.ink, fontVariantNumeric: 'tabular-nums' }}>{t}</span>{best && <span style={{ ...row, height: 20, padding: '0 7px', borderRadius: 6, background: '#E8F0FD', color: G.blue, fontSize: 12, fontWeight: 500 }}>Best</span>}</span>
                      <span style={{ fontSize: 14, color: G.g2 }}>{d}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, width: 560, borderRadius: 16, boxShadow: `0 0 0 1px ${G.line}`, padding: 14 }}>
                <div style={{ ...row, gap: 8, height: 22, fontSize: 13.5, color: G.g3 }}><Clock3 size={14} strokeWidth={1.4} />Checked 3 calendars and 2 time zones</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginTop: 12 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                    <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 12.5, color: i === 2 ? G.blue : G.g3 }}>{d} {20 + i}</span>
                      {WEEK[i].map(([c, h, me], k) => <span key={k} style={{ height: h, borderRadius: 7, background: me ? G.blue : `color-mix(in oklab, ${c} 16%, white)`, boxShadow: me ? 'none' : `inset 2px 0 0 ${c}`, ...(me ? { display: 'flex', alignItems: 'center', padding: '0 9px', color: '#fff', fontSize: 12.5, fontWeight: 500, fontVariantNumeric: 'tabular-nums' } : {}) }}>{me ? '14:30' : null}</span>)}
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
