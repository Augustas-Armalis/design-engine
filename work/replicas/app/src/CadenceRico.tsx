// Cadence feature bento in Rico's measured grammar (knowledge/web/heyrico-deep-2026-10.md RD-01..38, replicas RicoR1..R6):
// SF Pro, 1px size steps (11/12/13/14, titles 19), one weight per surface, four greys from one ramp, near-white surfaces
// split by one #EEEFF2 hairline, radius by height (8 at 24-28, 16 cards, 19.5 composer), blue as the only accent. Cells
// reuse his exact composer (R3) and bar-chart card (R4) specs with Cadence content. Greys kept at 4.5:1 (his are ~3:1). Sample data.
import type { CSSProperties, ReactNode } from 'react'
import { Paperclip, Mic, ArrowUp, CalendarClock, Users, Clock3, Video, Check, Sparkles } from 'lucide-react'

const SF = '-apple-system, "SF Pro Text", "SF Pro", system-ui, sans-serif'
const G = { ink: '#292929', g2: '#5D5D5D', g3: '#6F6F6F', g4: '#6B6B6B', line: '#EEEFF2', soft: '#F6F6F7', page: '#FAFAFA', blue: '#1F63D6' }
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const ring = (a = '#E4E4E5', w = 0.7) => `0 0 0 ${w}px ${a}`

function Cell({ w, title, desc, children }: { w: number; title: string; desc: string; children: ReactNode }) {
  return (
    <article style={{ width: w, height: 404, boxSizing: 'border-box', padding: 8, borderRadius: 16, background: '#fff', boxShadow: `inset 0 0 0 1px ${G.line}`, display: 'flex', flexDirection: 'column' }}>
      <div data-product style={{ position: 'relative', flex: 1, borderRadius: 8, background: G.page, boxShadow: `inset 0 0 0 1px ${G.line}`, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>{children}</div>
      <div style={{ height: 84, boxSizing: 'border-box', padding: '18px 12px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500, letterSpacing: '-0.2px', color: G.ink }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13, lineHeight: '19px', color: G.g3 }}>{desc}</p>
      </div>
    </article>
  )
}

function Composer() {
  const sq: CSSProperties = { display: 'grid', placeItems: 'center', width: 24, height: 24, borderRadius: 8, boxShadow: ring(), background: '#fff', color: G.g3 }
  const cards: [ReactNode, string, string][] = [[<CalendarClock size={14} strokeWidth={1.35} />, 'Find a time', '45 min, 3 guests'], [<Users size={14} strokeWidth={1.35} />, 'Move my 1:1s', 'Keep Friday free'], [<Clock3 size={14} strokeWidth={1.35} />, 'Protect focus', 'Mornings, Mon to Thu']]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 480, height: 124, boxSizing: 'border-box', borderRadius: 19.5, background: '#fff', boxShadow: `${ring()}, 0 1px 2px rgb(0 0 0 / .05)`, padding: '14px 14px 12px', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 14, color: G.ink }}>Find 45 min with Maya and Theo next week<span style={{ display: 'inline-block', width: 1.5, height: 16, marginLeft: 1, verticalAlign: -3, background: G.blue }} /></span>
        <div style={{ marginTop: 'auto', ...row, gap: 8 }}>
          <span style={sq}><Paperclip size={13} strokeWidth={1.35} /></span>
          <span style={{ ...row, gap: 6, height: 24, padding: '0 8px', borderRadius: 8, background: G.soft, fontSize: 13, color: G.ink }}>Cadence 2<span style={{ fontSize: 11, color: G.blue }}>New</span></span>
          <span style={{ marginLeft: 'auto', ...sq }}><Mic size={13} strokeWidth={1.35} /></span>
          <span style={{ display: 'grid', placeItems: 'center', width: 24, height: 24, borderRadius: 999, background: G.blue, color: '#fff' }}><ArrowUp size={14} strokeWidth={2} /></span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {cards.map(([ic, t, s]) => (
          <div key={t} style={{ width: 152, height: 84, boxSizing: 'border-box', padding: 12, borderRadius: 16, background: '#fff', boxShadow: `inset 0 0 0 1px ${G.soft}`, display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 16, height: 16, color: G.g3 }}>{ic}</span>
            <span style={{ marginTop: 'auto', fontSize: 13, fontWeight: 500, color: G.ink }}>{t}</span>
            <span style={{ fontSize: 12, color: G.g3 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FocusChart() {
  const bars = [8, 9.5, 7, 11, 10, 12.5, 11.5, 13, 12, 14.5, 13.5, 15]
  const H = 120, max = 16
  return (
    <div style={{ width: 340, height: 230, boxSizing: 'border-box', padding: '16px 16px 12px', borderRadius: 8, background: '#fff', boxShadow: `${ring('#DEE0E2', 0.5)}, 0 1px 2px rgb(0 0 0 / .03)`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...row }}><span style={{ fontSize: 13, fontWeight: 500, color: G.g3 }}>Focus hours</span><span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 500, color: G.g4 }}>12 weeks</span></div>
      <div style={{ ...row, gap: 8, marginTop: 4 }}><span style={{ fontSize: 19, fontWeight: 500, color: G.ink, fontVariantNumeric: 'tabular-nums' }}>15h</span><span style={{ fontSize: 12, color: '#067a3a' }}>+1.5h this week</span></div>
      <div style={{ position: 'relative', height: H, marginTop: 'auto', display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        {bars.map((b, i) => <span key={i} style={{ flex: 1, height: (b / max) * H, borderRadius: 3, background: i === bars.length - 1 ? G.blue : '#B9D4FD' }} />)}
      </div>
    </div>
  )
}

function Today() {
  const items: [string, string, string, 'done' | 'moved' | 'later'][] = [['9:00', 'Standup', '15 min', 'done'], ['10:00', '1:1 with Maya', 'Room 4B', 'done'], ['14:30', 'Design review', 'Moved from 11:00', 'moved'], ['16:00', 'Hiring sync', 'Meet', 'later']]
  return (
    <div style={{ width: 316, borderRadius: 16, background: '#fff', boxShadow: `${ring()}, 0 1px 2px rgb(0 0 0 / .04)`, padding: 6 }}>
      <div style={{ ...row, height: 32, padding: '0 10px', fontSize: 13, fontWeight: 500, color: G.ink }}>Today<span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 400, color: G.g4 }}>Wed, Oct 22</span></div>
      {items.map(([t, n, m, st]) => (
        <div key={t} style={{ ...row, gap: 10, height: 44, padding: '0 10px', borderRadius: 10, background: st === 'moved' ? '#F2F7FF' : undefined }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 20, height: 20, borderRadius: 6, background: st === 'moved' ? G.blue : G.soft, color: st === 'moved' ? '#fff' : G.g3 }}>{st === 'done' ? <Check size={12} strokeWidth={2} /> : st === 'moved' ? <Sparkles size={11} strokeWidth={2} /> : <Video size={11} strokeWidth={1.8} />}</span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '17px' }}>
            <span style={{ fontSize: 13, color: st === 'done' ? G.g4 : G.ink }}>{n}</span>
            <span style={{ fontSize: 12, color: st === 'moved' ? G.blue : G.g4 }}>{m}</span>
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: G.g3, fontVariantNumeric: 'tabular-nums' }}>{t}</span>
        </div>
      ))}
    </div>
  )
}

function Overlap() {
  const people: [string, number[]][] = [['Maya', [1, 1, 0, 0, 1, 1, 1, 0, 0, 1]], ['Theo', [0, 1, 1, 0, 0, 0, 1, 1, 0, 1]], ['Ana', [1, 0, 1, 0, 1, 0, 1, 0, 1, 1]]]
  const shared = 3
  return (
    <div style={{ width: 640, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ ...row, paddingLeft: 64, gap: 4, fontSize: 11, color: G.g4 }}>{['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'].map((h) => <span key={h} style={{ flex: 1 }}>{h}:00</span>)}</div>
      {people.map(([n, busy]) => (
        <div key={n} style={{ ...row, gap: 4 }}>
          <span style={{ width: 60, fontSize: 13, color: G.ink }}>{n}</span>
          {busy.map((b, i) => <span key={i} style={{ flex: 1, height: 28, borderRadius: 6, background: i === shared ? '#DCEAFF' : b ? '#EDEDEF' : '#fff', boxShadow: i === shared ? `inset 0 0 0 1px ${G.blue}` : `inset 0 0 0 1px ${G.line}` }} />)}
        </div>
      ))}
      <div style={{ ...row, paddingLeft: 64, gap: 8, marginTop: 4 }}>
        <span style={{ ...row, gap: 6, height: 28, padding: '0 10px', borderRadius: 8, background: '#fff', boxShadow: `${ring()}, 0 1px 2px rgb(0 0 0 / .05)`, fontSize: 13, color: G.ink }}><span style={{ width: 6, height: 6, borderRadius: 99, background: G.blue }} />12:00 to 12:45 works for all three</span>
        <span style={{ ...row, height: 28, padding: '0 12px', borderRadius: 999, background: 'linear-gradient(180deg, #3d3d3f, #1f1f21)', color: '#fff', fontSize: 13 }}>Send invite</span>
      </div>
    </div>
  )
}

export default function CadenceRico() {
  return (
    <div style={{ width: 1440, height: 1140, background: G.page, fontFamily: SF, WebkitFontSmoothing: 'antialiased', color: G.ink }}>
      <section data-subject style={{ width: 1200, margin: '0 auto', padding: '96px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 13, color: G.blue }}>Scheduling</span>
            <h2 style={{ margin: 0, fontSize: 40, fontWeight: 500, letterSpacing: '-0.8px', lineHeight: 1.1 }}>Ask once.<br />Cadence does the rest.</h2>
          </div>
          <p style={{ margin: '0 0 4px auto', width: 380, fontSize: 15, lineHeight: '23px', color: G.g3 }}>Type who and how long. Cadence reads every calendar, keeps focus time intact and puts the invite out.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <Cell w={784} title="Ask in plain words" desc="One line covers who, how long and when. Suggestions cover the requests teams make every week."><Composer /></Cell>
          <Cell w={392} title="Focus, measured" desc="Protected hours per week, so you can see deep work grow instead of hoping it does."><FocusChart /></Cell>
          <Cell w={392} title="A day that settles itself" desc="When a meeting collides, Cadence moves it and tells you why."><Today /></Cell>
          <Cell w={784} title="The slot everyone has" desc="Every guest's calendar on one strip. The overlap is found before anyone opens a tab."><Overlap /></Cell>
        </div>
      </section>
    </div>
  )
}
