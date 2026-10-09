// Hero product: a workflow canvas mid-run. Sample data only (fictional "northwind" ops team).
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  RiCheckLine, RiCursorFill, RiDatabase2Line, RiFileTextLine, RiFlowChart, RiFolder3Line, RiGitBranchLine, RiMailLine,
  RiPlayFill, RiShareLine, RiSparkling2Fill, RiStackFill, RiTimeLine, RiBankCardLine,
} from '@remixicon/react'
import { ease } from '../motion'

type NodeProps = { x: number; y: number; w: number; at: number; icon: typeof RiMailLine; kind: string; title: string; selected?: boolean; children: ReactNode }
function Node({ x, y, w, at, icon: Icon, kind, title, selected, children }: NodeProps) {
  return (
    <motion.div className="absolute" style={{ left: x, top: y, width: w }}
      initial={{ opacity: 0.01, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: at, duration: 0.8, ease: ease.outExpo }}>
      <div className={`rounded-[8px] bg-white p-3 ${selected ? 'shadow-[0_0_0_1.5px_#0f1729,0_10px_24px_-12px_rgba(15,23,41,0.35)]' : 'shadow-[var(--shadow-tile)]'}`}>
        <div className="flex items-center gap-2">
          <span className={`grid size-6 place-items-center rounded-[5px] ${kind === 'AI step' ? 'bg-[#eef1f8] text-blue' : 'bg-[#f1f3f6] text-sub'}`}><Icon size={14} /></span>
          <div className="leading-[15px]">
            <div className="text-[13px] font-[600] text-ink">{title}</div>
            <div className="mono-ui text-[10px] text-soft">{kind}</div>
          </div>
          {kind === 'AI step' && <span className="mono-ui ml-auto flex h-[18px] items-center gap-1 rounded-[4px] bg-[#eef1f8] px-1.5 text-[10px] text-blue"><RiSparkling2Fill size={10} />AI</span>}
        </div>
        <div className="mt-2.5 space-y-1 rounded-[6px] bg-[#f6f7f9] p-2">{children}</div>
      </div>
    </motion.div>
  )
}
const Row = ({ k, v, ok = true }: { k: string; v: string; ok?: boolean }) => (
  <div className="flex items-center gap-2 text-[11.5px]">
    <span className="text-soft">{k}</span><span className="tnum ml-auto truncate font-[550] text-ink">{v}</span>
    {ok && <RiCheckLine size={13} className="shrink-0 text-ok" />}
  </div>
)

// connectors in canvas coordinates; each gets an "OK" chip once drawn
const EDGES = [
  { d: 'M272 92 L332 92', chip: [302, 92] },
  { d: 'M592 92 L652 92', chip: [622, 92] },
  { d: 'M772 168 L772 236', chip: [772, 202] },
  { d: 'M652 290 L592 290', chip: [622, 290] },
]
const PATH = 'M272 92 L332 92 L592 92 L652 92 L772 92 L772 236 L772 290 L652 290 L592 290'

export default function Flow({ start }: { start: number }) {
  const still = !!useReducedMotion()
  const t = (x: number) => start + x
  const NODE = [t(0.45), t(0.6), t(0.75), t(0.9), t(1.05)]
  const EDGE = (i: number) => t(0.75 + i * 0.18)
  return (
    <div className="grid h-full grid-rows-[48px_1fr]">
      {/* app bar */}
      <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.3), duration: 0.6 }} className="flex items-center gap-3 border-b border-line px-3.5">
        <span className="grid size-7 place-items-center rounded-[6px] bg-ink text-white"><RiStackFill size={15} /></span>
        <span className="text-[14px] font-[600]">Strata</span>
        <span className="h-4 w-px bg-line" />
        <span className="flex items-center gap-1.5 text-[13px] text-sub"><RiFolder3Line size={15} className="text-soft" />Ops</span>
        <span className="text-soft">/</span>
        <span className="text-[13px] font-[550]">Invoice intake</span>
        <span className="mono-ui flex h-[20px] items-center gap-1.5 rounded-[4px] bg-ok-tint px-1.5 text-[10px] text-ok"><span className="size-1.5 rounded-full bg-ok" />Live</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="mono-ui text-[11px] text-soft">Sample workspace</span>
          <span className="tnum mono-ui flex h-8 items-center gap-2 rounded-[4px] px-2 text-[11px] text-sub shadow-[var(--shadow-ring)]">− 100% +</span>
          <span className="btn-paper mono-ui flex h-8 items-center gap-1.5 px-2.5 text-[11px]"><RiShareLine size={13} />Share</span>
          <span className="btn-ink mono-ui flex h-8 items-center px-3 text-[11px]">Publish</span>
        </div>
      </motion.div>

      <div className="grid min-h-0 grid-cols-[52px_1fr_312px]">
        <div className="flex flex-col items-center gap-1.5 border-r border-line pt-3">
          {[RiFlowChart, RiPlayFill, RiDatabase2Line, RiTimeLine].map((I, i) => (
            <span key={i} className={`grid size-9 place-items-center rounded-[6px] ${i === 0 ? 'bg-[#eef1f4] text-ink' : 'text-soft'}`}><I size={17} /></span>
          ))}
        </div>

        {/* canvas */}
        <div className="dots relative overflow-hidden bg-[#fafbfc]" aria-label="Sample workflow">
          <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width="100%" height="100%">
            {EDGES.map((e, i) => (
              <motion.path key={i} d={e.d} fill="none" stroke="#0f1729" strokeOpacity={0.35} strokeWidth={1.25} strokeDasharray="4 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: EDGE(i), duration: 0.45, ease: ease.inOut }} />
            ))}
            {/* a run token travels the flow once everything is in place (starts invisible: founder rule on loops) */}
            {!still && (
              <motion.path d={PATH} fill="none" stroke="#1f3a68" strokeWidth={2.5} strokeLinecap="round"
                initial={{ pathLength: 0.035, pathOffset: 0, opacity: 0 }} animate={{ pathOffset: [0, 0.965], opacity: [0, 1, 1, 0] }}
                transition={{ delay: t(2.4), duration: 3.2, times: [0, 0.06, 0.94, 1], ease: 'linear', repeat: Infinity, repeatDelay: 1.4 }} />
            )}
          </svg>
          {EDGES.map((e, i) => (
            <motion.span key={i} className="mono-ui absolute z-10 flex h-[18px] -translate-x-1/2 -translate-y-1/2 items-center rounded-[4px] bg-white px-1.5 text-[10px] text-ok shadow-[0_0_0_1px_rgba(23,120,74,0.35)]"
              style={{ left: e.chip[0], top: e.chip[1] }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: EDGE(i) + 0.45, duration: 0.5, ease: ease.outExpo }}>
              OK
            </motion.span>
          ))}

          <Node x={32} y={36} w={240} at={NODE[0]} icon={RiMailLine} kind="Trigger" title="New invoice email">
            <Row k="Inbox" v="invoices@northwind" />
            <Row k="Attachment" v="PDF · 1 page" />
          </Node>
          <Node x={332} y={36} w={260} at={NODE[1]} icon={RiFileTextLine} kind="AI step" title="Read the invoice" selected>
            <Row k="Vendor" v="Acme Freight" />
            <Row k="Amount" v="€4,280.00" />
            <Row k="Due" v="31 Oct" />
          </Node>
          <Node x={652} y={36} w={240} at={NODE[2]} icon={RiDatabase2Line} kind="Lookup" title="Match purchase order">
            <Row k="PO-2291" v="€4,280.00" />
            <Row k="Result" v="Exact match" />
          </Node>
          <Node x={652} y={236} w={240} at={NODE[3]} icon={RiGitBranchLine} kind="Rule" title="Over €5,000?">
            <Row k="No" v="Approve" />
            <Row k="Yes" v="Ask finance lead" ok={false} />
          </Node>
          <Node x={332} y={236} w={260} at={NODE[4]} icon={RiBankCardLine} kind="Action" title="Schedule the payment">
            <Row k="Pay on" v="31 Oct" />
            <Row k="Reference" v="STR-4821" />
          </Node>
          <motion.div className="absolute z-20 text-ink" style={{ left: 560, top: 150 }} initial={{ opacity: 0, x: 30, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: t(1.4), duration: 1.1, ease: ease.outExpo }}>
            <RiCursorFill size={18} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
          </motion.div>
        </div>

        {/* inspector */}
        <motion.aside initial={{ opacity: 0.01, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: t(0.7), duration: 0.8, ease: ease.outExpo }}
          className="border-l border-line bg-white p-4" aria-label="Sample step settings">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-[5px] bg-[#eef1f8] text-blue"><RiFileTextLine size={14} /></span>
            <span className="text-[14px] font-[600]">Read the invoice</span>
          </div>
          <div className="mono-ui mt-4 text-[10px] text-soft">Source</div>
          <div className="mt-1.5 flex h-9 items-center rounded-[4px] px-2.5 text-[12.5px] shadow-[var(--shadow-ring)]">Email attachment (PDF)</div>
          <div className="mono-ui mt-4 text-[10px] text-soft">Fields to read</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['Vendor', 'Amount', 'Due date', 'PO number'].map((f) => <span key={f} className="flex h-7 items-center rounded-[4px] bg-[#f1f3f6] px-2 text-[12px] text-ink">{f}</span>)}
          </div>
          <div className="mono-ui mt-4 flex text-[10px] text-soft">Confidence needed<span className="tnum ml-auto text-ink">0.90</span></div>
          <div className="relative mt-2.5 h-1 rounded-full bg-[#e6eaef]">
            <motion.div className="h-full rounded-full bg-ink" initial={{ width: '0%' }} animate={{ width: '90%' }} transition={{ delay: t(1.1), duration: 1, ease: ease.outExpo }} />
            <motion.span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1.5px_#0f1729]" initial={{ left: '0%' }} animate={{ left: '90%' }} transition={{ delay: t(1.1), duration: 1, ease: ease.outExpo }} />
          </div>
          <p className="mt-3 text-[12px] leading-[18px] text-sub">Below 0.90, Strata hands the invoice to a person instead of guessing.</p>
          <span className="btn-paper mono-ui mt-4 flex h-9 items-center justify-center text-[11px]">Test this step</span>
        </motion.aside>
      </div>
    </div>
  )
}
