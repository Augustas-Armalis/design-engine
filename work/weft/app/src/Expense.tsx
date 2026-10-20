// Component post in Flo Hoeller's grammar (founder: component posts follow Flo; knowledge/web/affectui-product-kit.md
// AK-02..33, flohoeller-craft.md): a light grey tray (r20, inset 4) holding one white card (r16), title and footer
// strips on the grey, one radius ladder 20/16/12/10/8/6, Inter 450/500 at 12/14/18, rings not borders, Flo's lit dark
// primary. It plays as an 8s loop (XP-02, the format X rewards): the cursor travels to Approve and presses, the button
// works then morphs into "Approved", the strip's status chip rolls to the new state, then everything resets.
// Square 1000x1000 at 1.5x, export at 2x. Fictional people and merchants (sample). ?still=1 freezes the idle state.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { Receipt, Plane, BedDouble, UtensilsCrossed, CarTaxiFront, Check, TriangleAlert, FileQuestion, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
// founder: "grays a bit dark" -> tray #f6f6f6 (was #f0f0f0), rings 6.5% (was 8.5%), tiles #f8f8f8
const T = { ink: '#171717', ink2: '#5c5c5c', ink3: '#6f6f6f', tray: '#f6f6f6', tile: '#f8f8f8', ring: 'rgb(23 23 23 / 0.065)', edge: 'rgb(23 23 23 / 0.12)', amber: '#c2410c', green: '#2f9e5b' }
const card = `0 0 0 1px ${T.ring}, 0 1px 2px rgb(0 0 0 / 0.03)`
type Phase = 'idle' | 'move' | 'press' | 'work' | 'done'
const SCRIPT: [Phase, number][] = [['idle', 0], ['move', 1100], ['press', 2050], ['work', 2200], ['done', 3300], ['idle', 7200]]
const LOOP = 8000

type Line = { icon: typeof Plane; name: string; cat: string; amount: string; flag?: 'over' | 'missing' }
const LINES: Line[] = [
  { icon: Plane, name: 'Lufthansa', cat: 'Flights · BER → LIS · 12 Sep', amount: '€1,214.00' },
  { icon: BedDouble, name: 'Casa do Alfama', cat: 'Lodging · 3 nights · 12 Sep', amount: '€960.00' },
  { icon: UtensilsCrossed, name: 'Taberna da Rua', cat: 'Team dinner · 12 people · 13 Sep', amount: '€402.40', flag: 'over' },
  { icon: CarTaxiFront, name: 'Bolt', cat: 'Taxi · airport · 15 Sep', amount: '€38.00', flag: 'missing' },
]

function usePhase(still: boolean) {
  const [p, setP] = useState<Phase>('idle')
  useEffect(() => {
    if (still) return
    let ids: number[] = []
    const run = () => { ids = SCRIPT.map(([ph, t]) => window.setTimeout(() => setP(ph), t)); ids.push(window.setTimeout(run, LOOP)) }
    run()
    return () => ids.forEach(clearTimeout)
  }, [still])
  return p
}

const Swap = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.span key={k} className="flex items-center gap-1.5" initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }} transition={{ duration: 0.32, ease }}>{children}</motion.span>
  </AnimatePresence>
)

function Approve({ p }: { p: Phase }) {
  const done = p === 'done', work = p === 'work', hover = p === 'move' || p === 'press'
  const fill = done ? 'linear-gradient(#36a866, #2a8e55)' : hover ? 'linear-gradient(#3b3a40, #29272e)' : 'linear-gradient(#323137, #201e25)'
  const bevel = done ? 'linear-gradient(#5cc58a, #36a866, #1f7a46)' : 'linear-gradient(#4b4951, #31303a, #18171b)'
  return (
    <motion.span layout className="flex h-9 items-center overflow-hidden whitespace-nowrap rounded-[12px] border border-transparent px-4 text-[14px] font-[500] text-[#fafafa]"
      style={{ background: `${fill} padding-box, ${bevel} border-box`, boxShadow: `0 0 0 1px ${done ? '#1c6b3d' : '#0d0d0d'}, 0 2px 4px rgb(0 0 0 / 0.10)` }}
      animate={{ scale: p === 'press' ? 0.97 : 1 }} transition={{ layout: { duration: 0.4, ease }, scale: { duration: 0.14, ease } }}>
      <Swap k={done ? 'done' : work ? 'work' : 'idle'}>
        {done ? <><Check size={15} strokeWidth={2.5} />Approved</>
          : work ? <><svg className="spin" width="14" height="14" viewBox="0 0 16 16" aria-hidden><circle cx="8" cy="8" r="6" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="2" /><path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>Approving</>
          : <>Approve €2,614.40</>}
      </Swap>
    </motion.span>
  )
}

function Cursor({ p }: { p: Phase }) {
  const at = p === 'move' || p === 'press' || p === 'work' ? { x: 0, y: 0, opacity: 1 } : p === 'done' ? { x: 38, y: 46, opacity: 1 } : { x: 120, y: 150, opacity: 0 }
  return (
    <motion.div className="pointer-events-none absolute" style={{ right: -2, bottom: 7 }} animate={{ ...at, scale: p === 'press' ? 0.88 : 1 }}
      transition={{ duration: p === 'move' ? 0.9 : 0.6, ease: [0.45, 0, 0.2, 1], scale: { duration: 0.14 } }}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden style={{ filter: 'drop-shadow(0 1.5px 2px rgb(0 0 0 / 0.3))' }}>
        <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" fill="#171717" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}

export default function Expense() {
  const still = new URLSearchParams(location.search).has('still')
  const p = usePhase(still)
  const done = p === 'done'
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative grid place-items-center overflow-hidden" style={{ width: 1000, height: 1000, background: '#fbfbfb', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', color: T.ink }}>
        <div style={{ zoom: 1.5 }} className="relative">
          <section data-subject aria-label="Expense approval, sample content" className="w-[440px] rounded-[20px] p-1" style={{ background: T.tray, boxShadow: `inset 0 0 0 1px ${T.ring}` }}>
            {/* title strip on the grey: it narrates the state */}
            <div className="flex min-h-[44px] items-center gap-2 pb-1.5 pl-4 pr-1 pt-1">
              <Receipt size={16} style={{ color: T.ink3 }} />
              <span className="whitespace-nowrap text-[14px] font-[500] leading-5">Expense report</span>
              <span className="truncate text-[14px] leading-5" style={{ color: T.ink3 }}>Lisbon offsite</span>
              <motion.span layout className="ml-auto flex h-6 items-center overflow-hidden rounded-[8px] bg-white px-2 text-[12px] font-[500]" style={{ color: T.ink2, boxShadow: `0 0 0 1px ${T.edge}` }} transition={{ layout: { duration: 0.4, ease } }}>
                <Swap k={done ? 'ok' : 'wait'}>
                  <span className="size-1.5 rounded-full" style={{ background: done ? T.green : '#f59e0b' }} />{done ? 'Approved · pays out Fri' : 'Needs approval'}
                </Swap>
              </motion.span>
            </div>

            <div className="rounded-[16px] bg-white" style={{ boxShadow: card }}>
              <div className="flex items-center gap-3 px-4 pb-3 pt-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full text-[13px] font-[500]" style={{ background: 'oklch(0.95 0.025 250)', color: 'oklch(0.42 0.08 250)' }}>JW</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-[500] leading-5">Jonas Weber</div>
                  <div className="text-[12px] leading-4" style={{ color: T.ink3 }}>Submitted 2h ago · 4 receipts</div>
                </div>
                <div className="text-right">
                  <div className="text-[18px] font-[500] leading-6 tracking-[-0.02em] tabular-nums">€2,614.40</div>
                  <div className="text-[12px] leading-4" style={{ color: T.ink3 }}>of €3,200 budget</div>
                </div>
              </div>
              {LINES.map((l) => (
                <div key={l.name} className="flex min-h-[52px] items-center gap-3 px-4" style={{ boxShadow: `inset 0 1px 0 ${T.ring}` }}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-[10px]" style={{ background: T.tile, boxShadow: `inset 0 0 0 1px ${T.ring}`, color: '#5a5a5a' }}><l.icon size={16} strokeWidth={1.75} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[14px] font-[500] leading-5">{l.name}
                      {l.flag === 'over' && <span className="flex h-5 items-center gap-1 rounded-[6px] px-1.5 text-[12px] font-[500]" style={{ background: '#fff5ee', color: T.amber }}><TriangleAlert size={12} />€42 over</span>}
                      {l.flag === 'missing' && <span className="flex h-5 items-center gap-1 rounded-[6px] px-1.5 text-[12px] font-[500]" style={{ background: '#f6f6f6', color: T.ink2 }}><FileQuestion size={12} />No receipt</span>}
                    </div>
                    <div className="truncate text-[12px] leading-4" style={{ color: T.ink3 }}>{l.cat}</div>
                  </div>
                  <span className="text-[14px] font-[500] tabular-nums">{l.amount}</span>
                </div>
              ))}
              {/* AI policy check: the bar carries the data; one short line, no paragraph */}
              <div className="rounded-b-[16px] px-4 py-3" style={{ background: '#fcfcfc', boxShadow: `inset 0 1px 0 ${T.ring}` }}>
                <div className="flex items-center gap-1.5 text-[12px] font-[500] leading-4">
                  <Sparkles size={13} style={{ color: '#2f6bff' }} /><span>Policy check</span>
                  <span className="ml-auto" style={{ color: T.ink3 }}>Dinner over the €30 per head limit</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {['ok', 'ok', 'over', 'miss'].map((s, i) => <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: s === 'ok' ? T.green : s === 'over' ? '#f59e0b' : '#dcdcdc' }} />)}
                </div>
              </div>
            </div>

            {/* footer strip on the grey */}
            <div className="flex min-h-[44px] items-center gap-3 pl-4 pr-1 pt-1">
              <span className="text-[12px] tabular-nums" style={{ color: T.ink3 }}>2 of 4 clear</span>
              <span className="ml-auto flex items-center gap-1.5">
                <AnimatePresence initial={false}>{!done && (
                  <motion.span key="rc" className="flex h-9 items-center whitespace-nowrap rounded-[12px] bg-white px-4 text-[14px] font-[500]" style={{ boxShadow: `0 0 0 1px ${T.edge}, 0 1px 2px rgb(0 0 0 / 0.03)` }}
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.24, ease }}>Request changes</motion.span>
                )}</AnimatePresence>
                <Approve p={p} />
              </span>
            </div>
          </section>
          <Cursor p={still ? 'move' : p} />
        </div>
      </div>
    </MotionConfig>
  )
}
