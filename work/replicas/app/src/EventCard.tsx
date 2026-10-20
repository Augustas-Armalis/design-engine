// Component post from the Cadence calendar: the event popover for the conflicting kickoff. Grammar from the calendar
// (Kargul popover tier: ring + 0 4.5px 13px .055, r16; AlignUI card-in-card status strip; one violet accent). Shows the
// decision: who is coming, what it overlaps, and the one-click fix Cadence suggests. Square 1000x1000 at 1.5x on a flat
// #f5f5f5 canvas (Kuleszo AKZ-27 / founder: lighter greys, component ~65% of the frame). Sample data.
import { RiCloseLine, RiMore2Fill, RiVideoOnLine, RiMapPinLine, RiNotification3Line, RiRepeatLine, RiErrorWarningFill, RiSparkling2Fill, RiArrowRightLine, RiCheckLine, RiQuestionLine } from '@remixicon/react'

const C = { ink: '#171717', sub: '#5c5c5c', soft: '#a3a3a3', line: '#ebebeb', violet: '#6e3ff3' }
const Face = ({ n, hue, s = 28 }: { n: string; hue: number; s?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-full font-[500]" style={{ width: s, height: s, fontSize: s * 0.38, background: `oklch(0.93 0.04 ${hue})`, color: `oklch(0.4 0.09 ${hue})` }}>{n}</span>
)
const Row = ({ icon: I, children }: { icon: typeof RiVideoOnLine; children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 text-[13px]" style={{ color: C.sub }}><I size={16} style={{ color: C.soft }} />{children}</div>
)
const PEOPLE: [string, string, number, 'yes' | 'maybe' | 'no' | 'org'][] = [['Maya Chen', 'MC', 250, 'org'], ['Theo Park', 'TP', 150, 'yes'], ['Ana Ruiz', 'AR', 25, 'yes'], ['Jonas Weber', 'JW', 200, 'maybe']]

export default function EventCard() {
  return (
    <div className="grid place-items-center overflow-hidden" style={{ width: 1000, height: 1000, background: '#f5f5f5', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: C.ink }}>
      <div style={{ zoom: 1.5 }}>
        <section data-subject aria-label="Event details, sample content" className="w-[420px] rounded-[18px] bg-white" style={{ boxShadow: `0 0 0 1px ${C.line}, 0 4.5px 13px rgb(0 0 0 / 0.055), 0 24px 48px -24px rgb(0 0 0 / 0.12)` }}>
          {/* header */}
          <div className="flex items-start gap-3 px-5 pb-4 pt-5">
            <span className="mt-[5px] size-2.5 shrink-0 rounded-[3px]" style={{ background: C.violet }} />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[16px] font-[500] tracking-[-0.01em]">Onboarding redesign kickoff</div>
              <div className="mt-1.5 text-[13px] tabular-nums" style={{ color: C.sub }}>Tue, Oct 20 · 10:00 – 11:30 AM</div>
            </div>
            <span className="grid size-7 place-items-center rounded-[8px]" style={{ color: C.soft }}><RiMore2Fill size={17} /></span>
            <span className="grid size-7 place-items-center rounded-[8px]" style={{ color: C.soft }}><RiCloseLine size={18} /></span>
          </div>
          <div className="space-y-2.5 px-5 pb-4">
            <Row icon={RiVideoOnLine}><span className="font-[500]" style={{ color: C.ink }}>Google Meet</span><span>· meet.cadence.so/obd-kick</span></Row>
            <Row icon={RiMapPinLine}>Room 4B, 2nd floor</Row>
            <Row icon={RiRepeatLine}>Does not repeat</Row>
            <Row icon={RiNotification3Line}>10 min before</Row>
          </div>
          {/* attendees */}
          <div className="mx-1 rounded-[14px] px-4 pb-3 pt-3" style={{ background: '#fafafa', boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <div className="flex items-center text-[12px] font-[500]" style={{ color: C.sub }}>9 guests<span className="ml-auto tabular-nums" style={{ color: C.soft }}>6 yes · 2 maybe · 1 waiting</span></div>
            <div className="mt-2.5 space-y-2">
              {PEOPLE.map(([n, ini, hue, r]) => (
                <div key={n} className="flex items-center gap-2.5">
                  <span className="relative"><Face n={ini} hue={hue} />
                    {r !== 'org' && <span className="absolute -bottom-1 -right-1.5 grid size-[13px] place-items-center rounded-full ring-2 ring-[#fafafa]" style={{ background: r === 'yes' ? '#22a35a' : r === 'maybe' ? '#e8742b' : C.soft, color: '#fff' }}>{r === 'yes' ? <RiCheckLine size={9} /> : <RiQuestionLine size={9} />}</span>}
                  </span>
                  <span className="text-[13px] font-[500]">{n}</span>
                  {r === 'org' && <span className="rounded-[5px] px-1.5 text-[11px] font-[500] leading-[18px]" style={{ background: '#f1edff', color: '#5b2fd9' }}>Organizer</span>}
                  <span className="ml-auto text-[12px]" style={{ color: C.soft }}>{r === 'yes' ? 'Going' : r === 'maybe' ? 'Maybe' : ''}</span>
                </div>
              ))}
            </div>
          </div>
          {/* conflict + the suggested fix */}
          <div className="p-1 pt-2">
            <div className="rounded-[14px] p-1" style={{ background: '#fff6ee', boxShadow: 'inset 0 0 0 1px #ffe4d1' }}>
              <div className="flex items-center gap-2 px-3 pb-2 pt-2 text-[12.5px] font-[500]" style={{ color: '#b4430f' }}><RiErrorWarningFill size={15} />Overlaps Hiring sync for Theo and Ana</div>
              <div className="flex items-center gap-3 rounded-[11px] bg-white px-3 py-2.5" style={{ boxShadow: `0 0 0 1px #ffe4d1, 0 1px 2px rgb(0 0 0 / 0.04)` }}>
                <span className="grid size-8 shrink-0 place-items-center rounded-[9px]" style={{ background: '#f1edff', color: C.violet }}><RiSparkling2Fill size={16} /></span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[13px] font-[500]">Move to 1:00 – 2:30 PM</div>
                  <div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>All 9 guests are free · keeps focus time</div>
                </div>
                <span className="flex h-8 items-center gap-1 rounded-[9px] px-3 text-[13px] font-[500] text-white" style={{ background: C.violet, boxShadow: '0 0 0 1px #5b2fd9, inset 0 1px 0 rgb(255 255 255 / 0.18)' }}>Move<RiArrowRightLine size={14} /></span>
              </div>
            </div>
          </div>
          {/* RSVP footer */}
          <div className="flex items-center gap-2 px-5 pb-4 pt-3">
            <span className="text-[13px]" style={{ color: C.sub }}>Going?</span>
            <span className="ml-auto flex h-8 items-center rounded-[9px] p-[3px] text-[13px] font-[500]" style={{ background: '#f5f5f5' }}>
              {['Yes', 'Maybe', 'No'].map((t, i) => <span key={t} className="flex h-full items-center rounded-[7px] px-3.5" style={i === 0 ? { background: '#fff', boxShadow: `0 0 0 1px ${C.line}, 0 1px 2px rgb(0 0 0 / 0.05)` } : { color: C.sub }}>{t}</span>)}
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
