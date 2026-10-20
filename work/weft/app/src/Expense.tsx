// Component post in Flo Hoeller's grammar (founder: component posts follow Flo; knowledge/web/affectui-product-kit.md
// AK-02..33, flohoeller-craft.md): a grey tray (r20, inset 4) holding one white card (r16), the title strip and the
// footer strip on the grey, one radius ladder 20/16/12/10/8/6, Inter 450/500 at 12/14/18, rings not borders, the lit
// dark primary (gradient fill + 3-stop bevel edge + #0d0d0d ring), a real cursor on the decision. #fafafa canvas, 1.5x.
// Square 1000x1000, export at 2x. Fictional people and merchants (sample).
import { motion, MotionConfig } from 'motion/react'
import { Receipt, Plane, BedDouble, UtensilsCrossed, CarTaxiFront, Check, TriangleAlert, FileQuestion, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const T = { ink: '#171717', ink2: '#5e5e5e', ink3: '#737373', tray: '#f0f0f0', ring: 'rgb(23 23 23 / 0.085)', edge: 'rgb(23 23 23 / 0.14)', amber: '#c2410c', green: '#2f9e5b' }
const card = `0 0 0 1px ${T.ring}, 0 1px 2px rgb(0 0 0 / 0.04)`

type Line = { icon: typeof Plane; name: string; cat: string; date: string; amount: string; flag?: 'over' | 'missing' }
const LINES: Line[] = [
  { icon: Plane, name: 'Lufthansa', cat: 'Flights · BER → LIS', date: '12 Sep', amount: '€1,214.00' },
  { icon: BedDouble, name: 'Casa do Alfama', cat: 'Lodging · 3 nights', date: '12 Sep', amount: '€960.00' },
  { icon: UtensilsCrossed, name: 'Taberna da Rua', cat: 'Team dinner · 12 people', date: '13 Sep', amount: '€402.40', flag: 'over' },
  { icon: CarTaxiFront, name: 'Bolt', cat: 'Taxi · airport', date: '15 Sep', amount: '€38.00', flag: 'missing' },
]

/** Flo's lit dark button: gradient fill on the padding box, a 3-stop bevel on the border box, dark ring + contact shadow */
const Primary = ({ children, hover = false }: { children: React.ReactNode; hover?: boolean }) => (
  <span className="flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[12px] border border-transparent px-4 text-[14px] font-[500] text-[#fafafa]"
    style={{ background: `linear-gradient(${hover ? '#3b3a40, #29272e' : '#323137, #201e25'}) padding-box, linear-gradient(#4b4951, #31303a, #18171b) border-box`, boxShadow: '0 0 0 1px #0d0d0d, 0 2px 4px rgb(0 0 0 / 0.10)' }}>{children}</span>
)
const Secondary = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[12px] bg-white px-4 text-[14px] font-[500]" style={{ color: T.ink, boxShadow: `0 0 0 1px ${T.edge}, 0 1px 2px rgb(0 0 0 / 0.04)` }}>{children}</span>
)

function Cursor() {
  // Lucide MousePointer2 geometry, filled, with a soft contact shadow
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden style={{ filter: 'drop-shadow(0 1.5px 2px rgb(0 0 0 / 0.3))' }}>
      <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" fill="#171717" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export default function Expense() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative grid place-items-center overflow-hidden" style={{ width: 1000, height: 1000, background: '#fafafa', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', color: T.ink }}>
        <div style={{ zoom: 1.5 }} className="relative">
          <motion.section data-subject aria-label="Expense approval, sample content" className="w-[440px] rounded-[20px] p-1" style={{ background: T.tray, boxShadow: `inset 0 0 0 1px ${T.ring}` }}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease }}>
            {/* title strip on the grey */}
            <div className="flex min-h-[44px] items-center gap-2 pb-1.5 pl-4 pr-1 pt-1">
              <Receipt size={16} style={{ color: T.ink3 }} />
              <span className="whitespace-nowrap text-[14px] font-[500] leading-5">Expense report</span>
              <span className="truncate text-[14px] leading-5" style={{ color: T.ink3 }}>Lisbon offsite</span>
              <span className="ml-auto flex h-6 items-center gap-1.5 rounded-[8px] bg-white px-2 text-[12px] font-[500]" style={{ color: T.ink2, boxShadow: `0 0 0 1px ${T.edge}` }}>
                <span className="size-1.5 rounded-full" style={{ background: '#f59e0b' }} />Needs approval
              </span>
            </div>

            {/* the white card */}
            <div className="rounded-[16px] bg-white" style={{ boxShadow: card }}>
              <div className="flex items-center gap-3 px-4 pb-3 pt-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full text-[13px] font-[500]" style={{ background: 'oklch(0.94 0.03 250)', color: 'oklch(0.42 0.08 250)' }}>JW</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-[500] leading-5">Jonas Weber</div>
                  <div className="text-[12px] leading-4" style={{ color: T.ink3 }}>Submitted 2h ago · 4 receipts</div>
                </div>
                <div className="text-right">
                  <div className="text-[18px] font-[500] leading-6 tracking-[-0.02em] tabular-nums">€2,614.40</div>
                  <div className="text-[12px] leading-4" style={{ color: T.ink3 }}>Budget €3,200</div>
                </div>
              </div>

              {/* receipts: full-bleed rows with inset dividers */}
              <div>
                {LINES.map((l, i) => (
                  <motion.div key={l.name} className="flex min-h-[52px] items-center gap-3 px-4" style={{ boxShadow: `inset 0 1px 0 ${T.ring}` }}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.24, ease }}>
                    <span className="grid size-8 shrink-0 place-items-center rounded-[10px]" style={{ background: T.tray, boxShadow: `inset 0 0 0 1px ${T.ring}`, color: '#525252' }}><l.icon size={16} strokeWidth={1.75} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[14px] font-[500] leading-5">{l.name}
                        {l.flag === 'over' && <span className="flex h-5 items-center gap-1 rounded-[6px] px-1.5 text-[12px] font-[500]" style={{ background: '#fff4ed', color: T.amber }}><TriangleAlert size={12} />€42 over policy</span>}
                        {l.flag === 'missing' && <span className="flex h-5 items-center gap-1 rounded-[6px] px-1.5 text-[12px] font-[500]" style={{ background: '#f5f5f5', color: T.ink2 }}><FileQuestion size={12} />No receipt</span>}
                      </div>
                      <div className="truncate text-[12px] leading-4" style={{ color: T.ink3 }}>{l.cat} · {l.date}</div>
                    </div>
                    <span className="text-[14px] font-[500] tabular-nums">{l.amount}</span>
                  </motion.div>
                ))}
              </div>

              {/* AI policy check: the segmented bar carries the data (4 clear, 1 over, 1 missing) */}
              <div className="rounded-b-[16px] px-4 py-3" style={{ background: '#fafafa', boxShadow: `inset 0 1px 0 ${T.ring}` }}>
                <div className="flex items-center gap-1.5 text-[12px] font-[500] leading-4">
                  <Sparkles size={13} style={{ color: '#2f6bff' }} /><span>Policy check</span>
                  <span className="ml-auto tabular-nums" style={{ color: T.ink3 }}>2 of 4 clear</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {['ok', 'ok', 'over', 'miss'].map((s, i) => (
                    <motion.span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: s === 'ok' ? T.green : s === 'over' ? '#f59e0b' : '#d4d4d4', transformOrigin: 'left' }}
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45 + i * 0.05, duration: 0.6, ease }} />
                  ))}
                </div>
                <div className="mt-2 text-[12px] leading-[17px]" style={{ color: T.ink2 }}>Dinner is €42 over the €30 per head limit. Ask Jonas for the Bolt receipt, or approve and it lands in his queue.</div>
              </div>
            </div>

            {/* footer strip on the grey */}
            <div className="flex min-h-[44px] items-center gap-3 pb-0 pl-4 pr-1 pt-1">
              <span className="flex items-center gap-1.5 text-[12px]" style={{ color: T.ink3 }}><Check size={13} />Policy v3</span>
              <span className="ml-auto flex items-center gap-1.5"><Secondary>Request changes</Secondary><Primary hover>Approve €2,614.40</Primary></span>
            </div>
          </motion.section>
          <motion.div className="pointer-events-none absolute" style={{ right: 6, bottom: -4 }} initial={{ opacity: 0, x: 24, y: 18 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }}>
            <Cursor />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  )
}
