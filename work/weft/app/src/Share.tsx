// Component post: a Share dialog caught mid-invite (autocomplete open over the access list).
// Grammar: Kuleszo AKZ-27 (flat canvas, 1:1, component 55-75% wide), AKZ-09 (three depth tiers), AKZ-03 (tinted ink
// with alpha steps), AKZ-22 (rows carry typed data), XP-08/09/12 (solid canvas, close crop, no headline in media).
// Square 1000x1000, export at 2x. Fictional people (sample).
import { motion, MotionConfig } from 'motion/react'
import { Link2, X, ChevronDown, Globe, Check, CornerDownLeft, Lock, Users } from 'lucide-react'

const INK = '11 18 32' // tinted near-black #0b1220 as rgb triplet for alpha steps
const ease = [0.22, 1, 0.36, 1] as const
const ink = (a: number) => `rgb(${INK} / ${a})`

function Face({ n, hue, size = 32 }: { n: string; hue: number; size?: number }) {
  return (
    <span aria-hidden className="grid shrink-0 place-items-center rounded-full font-[600]"
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.38), color: `oklch(0.4 0.09 ${hue})`, background: `oklch(0.93 0.045 ${hue})`, boxShadow: `inset 0 0 0 1px oklch(0.4 0.09 ${hue} / 0.1)` }}>
      {n.split(' ').map((w) => w[0]).join('')}
    </span>
  )
}

const Role = ({ v, muted = false }: { v: string; muted?: boolean }) => (
  <span className="flex h-8 items-center gap-1 rounded-[9px] px-2.5 text-[14px] font-[500]" style={{ color: muted ? ink(0.55) : ink(0.75) }}>
    {v}{!muted && <ChevronDown size={15} strokeWidth={2} style={{ color: ink(0.45) }} />}
  </span>
)

const PEOPLE = [
  { n: 'Maya Chen', e: 'maya@northwind.co', hue: 250, role: 'Owner', you: true },
  { n: 'Theo Park', e: 'theo@northwind.co', hue: 150, role: 'Can edit' },
  { n: 'Ana Ruiz', e: 'ana@northwind.co', hue: 25, role: 'Can view' },
  { n: 'Sam Okoro', e: 'sam.okoro@gmail.com', hue: 300, role: 'Can view', pending: true },
]

export default function Share() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-hidden" style={{ width: 1000, height: 1000, background: '#f4f4f6', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: ink(1) }}>
        {/* the component at 1.14x so its smallest text stays legible in X's 514px feed tile (XP-28); 684px = 68% of the frame */}
        <div className="absolute left-[158px] top-[108px]" style={{ zoom: 1.14 }}>
        <motion.section data-subject aria-label="Share dialog, sample content" className="relative w-[600px] rounded-[20px] bg-white"
          style={{ boxShadow: `0 0 0 1px ${ink(0.08)}, 0 1px 2px ${ink(0.04)}, 0 28px 70px rgb(0 0 0 / 0.10)` }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
          {/* header */}
          <div className="flex items-center gap-3 px-6 pt-5">
            <div className="min-w-0 flex-1">
              <div className="text-[18px] font-[600] tracking-[-0.015em]">Share “Q4 launch plan”</div>
              <div className="mt-0.5 text-[14px]" style={{ color: ink(0.62) }}>Northwind · Marketing</div>
            </div>
            <span className="grid size-8 place-items-center rounded-[9px]" style={{ color: ink(0.5) }}><X size={18} /></span>
          </div>

          {/* invite field: a chip, then a name being typed */}
          <div className="flex gap-2 px-6 pt-5">
            <div className="flex h-12 flex-1 items-center gap-2 rounded-[12px] bg-white pl-1.5 pr-1.5" style={{ boxShadow: `0 0 0 1.5px #2f6bff, 0 0 0 5px rgb(47 107 255 / 0.12)` }}>
              <span className="flex h-8 items-center gap-1.5 rounded-[8px] pl-1 pr-1.5 text-[14px] font-[500]" style={{ background: ink(0.05) }}>
                <Face n="Jordan Lee" hue={200} size={24} />Jordan Lee<X size={14} style={{ color: ink(0.45) }} />
              </span>
              <span className="text-[15px]">pri<span className="ml-px inline-block h-[18px] w-[1.5px] translate-y-[3px] bg-[#2f6bff]" /></span>
              <span className="ml-auto"><Role v="Can edit" /></span>
            </div>
            <span className="flex h-12 items-center rounded-[12px] px-5 text-[15px] font-[600] text-white" style={{ background: ink(1), boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.12)` }}>Invite</span>
          </div>

          {/* people with access */}
          <div className="flex items-center justify-between px-6 pb-1 pt-6 text-[13px] font-[500]" style={{ color: ink(0.62) }}>
            <span>People with access</span><span className="tabular-nums">4 people · 1 team</span>
          </div>
          <div className="px-3">
            {PEOPLE.map((p) => (
              <div key={p.n} className="flex h-[60px] items-center gap-3 rounded-[12px] px-3">
                <Face n={p.n} hue={p.hue} size={36} />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex items-center gap-2 text-[15px] font-[550] tracking-[-0.01em]">{p.n}{p.you && <span className="text-[13px] font-[450]" style={{ color: ink(0.55) }}>(you)</span>}
                    {p.pending && <span className="rounded-[6px] bg-[#fff4e0] px-1.5 py-[2px] text-[12px] font-[600] text-[#a35200]">Invite sent</span>}</div>
                  <div className="mt-0.5 truncate text-[13.5px]" style={{ color: ink(0.62) }}>{p.e}</div>
                </div>
                <Role v={p.role} muted={p.role === 'Owner'} />
              </div>
            ))}
            <div className="flex h-[60px] items-center gap-3 rounded-[12px] px-3">
              <span className="grid size-9 place-items-center rounded-[10px]" style={{ background: '#f1ecff', color: '#5b3fd6' }}><Users size={18} /></span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[15px] font-[550] tracking-[-0.01em]">Design team</div>
                <div className="mt-0.5 text-[13.5px]" style={{ color: ink(0.62) }}>8 members</div>
              </div>
              <Role v="Can comment" />
            </div>
          </div>

          {/* general access */}
          <div className="mx-6 mt-2 h-px" style={{ background: ink(0.08) }} />
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="grid size-9 place-items-center rounded-[10px]" style={{ background: '#eaf1ff', color: '#2459d6' }}><Globe size={18} /></span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1 text-[15px] font-[550] tracking-[-0.01em]">Anyone at Northwind<ChevronDown size={15} style={{ color: ink(0.45) }} /></div>
              <div className="mt-0.5 text-[13.5px]" style={{ color: ink(0.62) }}>Can find and view with the link</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-b-[20px] px-6 py-4" style={{ background: ink(0.025), boxShadow: `inset 0 1px 0 ${ink(0.06)}` }}>
            <span className="flex items-center gap-1.5 text-[13.5px]" style={{ color: ink(0.62) }}><Lock size={14} />Only people at Northwind can open it</span>
            <span className="ml-auto flex h-10 items-center gap-2 rounded-[11px] bg-white px-4 text-[14px] font-[550]" style={{ boxShadow: `0 0 0 1px ${ink(0.12)}, 0 1px 2px ${ink(0.04)}` }}><Link2 size={16} />Copy link</span>
          </div>
        </motion.section>

        {/* the autocomplete, open over the list: the one floating layer */}
        <motion.div className="absolute left-[46px] top-[162px] w-[330px] rounded-[14px] bg-white p-1.5" style={{ boxShadow: `0 0 0 1px ${ink(0.08)}, 0 4px 16px ${ink(0.08)}, 0 16px 32px -12px ${ink(0.12)}` }}
          initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 0.5, ease }}>
          {[
            { n: 'Priya Shah', e: 'priya@northwind.co', hue: 280, on: true },
            { n: 'Priscilla Ortega', e: 'p.ortega@northwind.co', hue: 60 },
            { n: 'Prince Adeyemi', e: 'prince@northwind.co', hue: 170, added: true },
          ].map((s) => (
            <div key={s.n} className="flex h-[52px] items-center gap-2.5 rounded-[10px] px-2.5" style={{ background: s.on ? ink(0.045) : undefined }}>
              <Face n={s.n} hue={s.hue} size={30} />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[14.5px] font-[550]"><span style={{ color: '#2459d6' }}>Pri</span>{s.n.slice(3)}</div>
                <div className="truncate text-[13px]" style={{ color: ink(0.62) }}>{s.e}</div>
              </div>
              {s.on && <span className="grid h-6 min-w-6 place-items-center rounded-[6px] px-1 text-[12px]" style={{ background: 'white', boxShadow: `0 0 0 1px ${ink(0.12)}`, color: ink(0.6) }}><CornerDownLeft size={13} /></span>}
              {s.added && <span className="flex items-center gap-1 text-[12.5px] font-[500]" style={{ color: ink(0.55) }}><Check size={13} />Has access</span>}
            </div>
          ))}
          <div className="mx-1 mt-1 flex h-[32px] items-center gap-1.5 px-1.5 text-[12.5px]" style={{ color: ink(0.6), boxShadow: `inset 0 1px 0 ${ink(0.06)}` }}>
            <span className="grid h-5 min-w-5 place-items-center rounded-[5px] px-1" style={{ boxShadow: `0 0 0 1px ${ink(0.12)}` }}><CornerDownLeft size={11} /></span>to add
            <span className="ml-2 grid h-5 place-items-center rounded-[5px] px-1.5 text-[11.5px] font-[500]" style={{ boxShadow: `0 0 0 1px ${ink(0.12)}` }}>esc</span>to close
          </div>
        </motion.div>
        </div>
      </div>
    </MotionConfig>
  )
}
