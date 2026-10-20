// Weft product pieces (sample data): the workflow canvas, its nodes and edges, and the live run inspector.
// The run is coherent: ticket #48211 asks for a refund of $248.00, the AI step reads it as Refund (92%),
// the branch takes "over $200", so the run now waits on Maya's approval and "Issue refund" is skipped.
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Check, CreditCard, GitBranch, Inbox, Sparkles, UserCheck, ChevronDown, Play, Search, Plus, Minus, MessageSquare } from 'lucide-react'

export const ease = { out: [0.16, 1, 0.3, 1] } as const
export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export function Logo({ size = 24 }: { size?: number }) {
  // woven W: two V strokes, the second passes under the first (gap in the crossing)
  return (
    <span className="grid place-items-center rounded-[7px] bg-[var(--ink)] shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]" style={{ width: size, height: size }}>
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M1.5 3.5 5 12.5 8 6" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6 11 12.5 14.5 3.5" stroke="#b9a6ff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function Face({ name, hue, size = 22 }: { name: string; hue: number; size?: number }) {
  return (
    <span aria-hidden className="inline-grid shrink-0 place-items-center rounded-full font-[600]"
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.4), color: `oklch(0.42 0.1 ${hue})`, background: `oklch(0.94 0.04 ${hue})`, boxShadow: `inset 0 0 0 1px oklch(0.42 0.1 ${hue} / 0.12)` }}>
      {name.split(' ').map((w) => w[0]).join('')}
    </span>
  )
}

const TILE: Record<string, string> = {
  trigger: 'bg-[#f1f2f4] text-[#3f424a]', ai: 'bg-[var(--accent-soft)] text-[var(--accent)]', branch: 'bg-[#fff4e5] text-[#b45309]',
  human: 'bg-[#e9f3ff] text-[#1d63c9]', action: 'bg-[#e9f8ef] text-[#15803d]',
}
export const Tile = ({ kind, icon: Ic, size = 26 }: { kind: string; icon: typeof Inbox; size?: number }) => (
  <span className={cx('grid shrink-0 place-items-center rounded-[8px] shadow-[inset_0_0_0_1px_rgb(15_16_19/0.05)]', TILE[kind])} style={{ width: size, height: size }}><Ic size={size * 0.56} strokeWidth={2} /></span>
)

type NodeSpec = { id: string; x: number; y: number; kind: string; icon: typeof Inbox; type: string; title: string; body: ReactNode; state?: 'done' | 'wait' | 'skip'; selected?: boolean }
export const NODES: NodeSpec[] = [
  { id: 'in', x: 24, y: 104, kind: 'trigger', icon: Inbox, type: 'Trigger', title: 'Ticket received', body: <>Support inbox · <span className="mono">#48211</span></>, state: 'done' },
  { id: 'ai', x: 248, y: 104, kind: 'ai', icon: Sparkles, type: 'AI step', title: 'Classify intent', body: 'Reads the thread and the order', state: 'done', selected: true },
  { id: 'br', x: 472, y: 104, kind: 'branch', icon: GitBranch, type: 'Branch', title: 'Amount over $200?', body: <>Yes · <span className="text-[var(--ink)]">$248.00</span></>, state: 'done' },
  { id: 'ok', x: 732, y: 22, kind: 'human', icon: UserCheck, type: 'Approval', title: 'Ask for approval', body: 'Waiting on Maya Chen', state: 'wait' },
  { id: 'rf', x: 732, y: 196, kind: 'action', icon: CreditCard, type: 'Action', title: 'Issue refund', body: 'Skipped this run', state: 'skip' },
]
export const NW = 196, NH = 86
const port = (n: NodeSpec, side: 'l' | 'r') => [n.x + (side === 'r' ? NW : 0), n.y + NH / 2] as const
const curve = ([x1, y1]: readonly [number, number], [x2, y2]: readonly [number, number]) => { const m = (x2 - x1) / 2; return `M${x1} ${y1} C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}` }
const EDGES: [string, string, 'live' | 'done' | 'skip', string?][] = [['in', 'ai', 'done'], ['ai', 'br', 'done'], ['br', 'ok', 'live', 'Yes'], ['br', 'rf', 'skip', 'No']]

function Node({ n, at }: { n: NodeSpec; at: number }) {
  return (
    <motion.div className="absolute rounded-[14px] bg-white p-3" style={{ left: n.x, top: n.y, width: NW, height: NH,
      boxShadow: n.selected ? '0 0 0 1.5px var(--accent), 0 0 0 5px rgb(98 54 255 / 0.12), 0 8px 18px -8px rgb(15 16 19 / 0.14)' : 'var(--shadow-node)' }}
      initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: n.state === 'skip' ? 0.6 : 1, y: 0, scale: 1 }} transition={{ delay: at, duration: 0.9, ease: ease.out }}>
      <div className="flex items-center gap-2">
        <Tile kind={n.kind} icon={n.icon} size={24} />
        <span className="text-[11.5px] font-[500] text-[var(--soft)]">{n.type}</span>
        <span className="ml-auto">
          {n.state === 'done' && <span className="grid size-[18px] place-items-center rounded-full bg-[var(--ok-soft)] text-[var(--ok)]"><Check size={11} strokeWidth={3} /></span>}
          {n.state === 'wait' && <span className="relative grid size-[18px] place-items-center"><span className="ping absolute size-2 rounded-full bg-[var(--wait)]" /><span className="size-2 rounded-full bg-[var(--wait)]" /></span>}
        </span>
      </div>
      <div className="mt-2 text-[13.5px] font-[600] leading-[18px] tracking-[-0.01em]">{n.title}</div>
      <div className="mt-0.5 truncate text-[12px] leading-[16px] text-[var(--soft)]">{n.body}</div>
    </motion.div>
  )
}

export function Canvas({ at = 0 }: { at?: number }) {
  const by = Object.fromEntries(NODES.map((n) => [n.id, n]))
  return (
    <div className="dots relative h-full overflow-hidden">
      <svg className="absolute inset-0 overflow-visible" width="100%" height="100%" aria-hidden>
        {EDGES.map(([a, b, s, label], i) => {
          const p = curve(port(by[a], 'r'), port(by[b], 'l'))
          const [x2, y2] = port(by[b], 'l')
          return (
            <g key={a + b}>
              <motion.path d={p} fill="none" stroke={s === 'skip' ? '#d6d6dc' : s === 'live' ? 'var(--accent)' : '#b9bac2'} strokeWidth="1.5" strokeDasharray={s === 'skip' ? '3 4' : undefined}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: at + 0.25 + i * 0.12, duration: 0.7, ease: ease.out }} />
              {s === 'live' && <path d={p} fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.5" className="flowing" />}
              <circle cx={x2} cy={y2} r="3.5" fill="#fff" stroke={s === 'live' ? 'var(--accent)' : '#b9bac2'} strokeWidth="1.5" />
              {label && <foreignObject x={(port(by[a], 'r')[0] + x2) / 2 - 18} y={(port(by[a], 'r')[1] + y2) / 2 - 10} width="36" height="20">
                <div className={cx('grid h-5 place-items-center rounded-full bg-white text-[10.5px] font-[600] shadow-[var(--shadow-ring)]', s === 'live' ? 'text-[var(--accent)]' : 'text-[var(--mute)]')}>{label}</div>
              </foreignObject>}
            </g>
          )
        })}
        {NODES.slice(0, 3).map((n) => <circle key={n.id} cx={n.x + NW} cy={n.y + NH / 2} r="3.5" fill="#fff" stroke="#b9bac2" strokeWidth="1.5" />)}
      </svg>
      {NODES.map((n, i) => <Node key={n.id} n={n} at={at + i * 0.08} />)}
      {/* the AI step's output, docked under the selected node */}
      <motion.div className="absolute rounded-[14px] bg-white p-3 shadow-[var(--shadow-node)]" style={{ left: 248, top: 104 + NH + 14, width: 420 }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at + 0.6, duration: 0.9, ease: ease.out }}>
        <div className="flex items-center gap-1.5 text-[11.5px] font-[600] text-[var(--accent)]"><Sparkles size={12} strokeWidth={2.2} />Output · 1.2s</div>
        <div className="mono mt-2 grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 text-[11.5px] leading-[16px]">
          <span className="text-[var(--mute)]">intent</span><span>refund</span><span className="flex items-center gap-1.5 text-[var(--accent)]"><span className="h-1 w-12 overflow-hidden rounded-full bg-[var(--accent-soft)]"><span className="block h-full w-[92%] rounded-full bg-[var(--accent)]" /></span>0.92</span>
          <span className="text-[var(--mute)]">order</span><span>#A-20931 · Jordan Lee</span><span />
          <span className="text-[var(--mute)]">amount</span><span>$248.00</span><span className="text-[var(--mute)]">USD</span>
        </div>
      </motion.div>
      {/* canvas controls */}
      <div className="absolute left-4 top-4 flex h-8 items-center rounded-[10px] bg-white px-1 text-[var(--soft)] shadow-[var(--shadow-ring)]">
        <span className="grid size-6 place-items-center"><Minus size={13} /></span><span className="mono px-1 text-[11.5px] text-[var(--sub)]">100%</span><span className="grid size-6 place-items-center"><Plus size={13} /></span>
      </div>
    </div>
  )
}

type Step = { icon: typeof Inbox; kind: string; name: string; meta: string; state: 'done' | 'wait' | 'skip' }
export const STEPS: Step[] = [
  { icon: Inbox, kind: 'trigger', name: 'Ticket received', meta: '0.1s', state: 'done' },
  { icon: Sparkles, kind: 'ai', name: 'Classify intent', meta: '1.2s', state: 'done' },
  { icon: GitBranch, kind: 'branch', name: 'Amount over $200?', meta: '0.0s', state: 'done' },
  { icon: UserCheck, kind: 'human', name: 'Ask for approval', meta: '2m 14s', state: 'wait' },
  { icon: MessageSquare, kind: 'trigger', name: 'Reply to customer', meta: '—', state: 'skip' },
]

export function StepRow({ s, at, big = false }: { s: Step; at: number; big?: boolean }) {
  return (
    <motion.div className={cx('flex items-center gap-2.5', big ? 'h-11' : 'h-9')} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: at, duration: 0.7, ease: ease.out }}>
      <Tile kind={s.kind} icon={s.icon} size={big ? 26 : 22} />
      <span className={cx('flex-1 truncate font-[550] tracking-[-0.01em]', big ? 'text-[14.5px]' : 'text-[13px]', s.state === 'skip' && 'text-[var(--mute)]')}>{s.name}</span>
      <span className={cx('mono tnum', big ? 'text-[12.5px]' : 'text-[11.5px]', s.state === 'wait' ? 'text-[var(--wait)]' : 'text-[var(--mute)]')}>{s.meta}</span>
      <span className="grid w-[18px] place-items-center">
        {s.state === 'done' && <span className="grid size-[18px] place-items-center rounded-full bg-[var(--ok-soft)] text-[var(--ok)]"><Check size={11} strokeWidth={3} /></span>}
        {s.state === 'wait' && <svg className="spin" width="16" height="16" viewBox="0 0 16 16" aria-hidden><circle cx="8" cy="8" r="6" fill="none" stroke="var(--wait-soft)" strokeWidth="2" /><path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="var(--wait)" strokeWidth="2" strokeLinecap="round" /></svg>}
        {s.state === 'skip' && <span className="size-3.5 rounded-full shadow-[inset_0_0_0_1.5px_var(--rail)]" />}
      </span>
    </motion.div>
  )
}

export function Approval({ big = false, hover = false }: { big?: boolean; hover?: boolean }) {
  return (
    <div className={cx('rounded-[14px] bg-[#fffaf1] shadow-[inset_0_0_0_1px_rgb(217_119_6/0.18)]', big ? 'p-4' : 'p-3')}>
      <div className="flex items-center gap-2.5">
        <Face name="Maya Chen" hue={250} size={big ? 30 : 24} />
        <div className="min-w-0 flex-1 leading-tight">
          <div className={cx('font-[600]', big ? 'text-[14.5px]' : 'text-[13px]')}>Maya Chen <span className="font-[450] text-[var(--soft)]">· Billing lead</span></div>
          <div className={cx('text-[var(--sub)]', big ? 'mt-0.5 text-[13.5px]' : 'text-[12px]')}>Refund <span className="font-[600] text-[var(--ink)]">$248.00</span> to Jordan Lee?</div>
        </div>
      </div>
      <div className={cx('flex gap-2', big ? 'mt-4' : 'mt-3')}>
        <span className={cx('btn-white flex flex-1 items-center justify-center rounded-[10px] font-[550]', big ? 'h-10 text-[14px]' : 'h-8 text-[12.5px]')}>Decline</span>
        <span className={cx('btn-ink relative flex flex-1 items-center justify-center gap-1.5 rounded-[10px] font-[550]', big ? 'h-10 text-[14px]' : 'h-8 text-[12.5px]', hover && 'bg-[#26272c]')}><Check size={big ? 15 : 13} strokeWidth={2.4} />Approve</span>
      </div>
    </div>
  )
}

export function Inspector({ at = 0 }: { at?: number }) {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-3.5 shadow-[inset_1px_0_0_var(--line)]">
      <div className="flex items-center gap-2">
        <span className="tnum text-[14px] font-[600] tracking-[-0.01em]">Run #4,182</span>
        <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-[var(--wait-soft)] px-2 text-[11.5px] font-[600] text-[var(--wait)]"><span className="size-1.5 rounded-full bg-[var(--wait)]" />Waiting</span>
        <span className="ml-auto flex h-7 items-center gap-1 rounded-[8px] px-2 text-[12px] font-[500] text-[var(--soft)] shadow-[var(--shadow-ring)]">Today <ChevronDown size={13} /></span>
      </div>
      <div className="mt-1 text-[12px] text-[var(--soft)]">Started <span className="mono tnum">13:52:08</span> · Jordan Lee</div>
      <div className="mt-3">{STEPS.map((s, i) => <StepRow key={s.name} s={s} at={at + 0.2 + i * 0.07} />)}</div>
      <motion.div className="mt-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at + 0.7, duration: 0.9, ease: ease.out }}><Approval /></motion.div>
    </div>
  )
}

export function Window({ at = 0 }: { at?: number }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[var(--shadow-frame)]">
      <div className="relative flex h-[52px] shrink-0 items-center gap-3 px-4 shadow-[inset_0_-1px_0_var(--line)]">
        <Logo size={24} />
        <div className="flex items-center gap-1.5 text-[13.5px]"><span className="text-[var(--soft)]">Workflows</span><span aria-hidden className="text-[var(--mute)]">/</span><span className="font-[600]">Refund triage</span></div>
        <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-[var(--ok-soft)] px-2 text-[11.5px] font-[600] text-[var(--ok)]"><span className="size-1.5 rounded-full bg-[var(--ok)]" />Live</span>
        <div className="absolute left-1/2 flex h-8 -translate-x-1/2 items-center rounded-[10px] bg-[var(--weak)] p-[3px] text-[12.5px] font-[550]">
          <span className="flex h-full items-center rounded-[8px] bg-white px-3 shadow-[var(--shadow-ring)]">Editor</span>
          <span className="flex h-full items-center px-3 text-[var(--soft)]">Runs <span className="tnum ml-1.5 text-[11.5px] text-[var(--mute)]">4,182</span></span>
          <span className="flex h-full items-center px-3 text-[var(--soft)]">Versions</span>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="flex h-8 w-[168px] items-center gap-2 rounded-[10px] bg-[var(--weak)] px-2.5 text-[12.5px] text-[var(--mute)]"><Search size={13} />Search steps<span className="mono ml-auto rounded-[5px] bg-white px-1 text-[10.5px] shadow-[var(--shadow-ring)]">⌘K</span></span>
          <div className="flex -space-x-1"><span className="rounded-full ring-2 ring-white"><Face name="Maya Chen" hue={250} size={24} /></span><span className="rounded-full ring-2 ring-white"><Face name="Theo Park" hue={150} size={24} /></span></div>
          <span className="btn-white flex h-8 items-center gap-1.5 rounded-[10px] px-3 text-[12.5px] font-[550]"><Play size={12} strokeWidth={2.4} />Test run</span>
          <span className="btn-ink flex h-8 items-center rounded-[10px] px-3 text-[12.5px] font-[550]">Publish</span>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1">
        <div className="min-w-0 flex-1"><Canvas at={at} /></div>
        <div className="w-[340px] shrink-0"><Inspector at={at} /></div>
      </div>
    </div>
  )
}
