// Strata homepage below the hero. Greyscale, mono for machine language, sharp controls. Sample data only.
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  RiArrowRightLine, RiBankCardLine, RiChat3Line, RiDatabase2Line, RiFileTextLine, RiGitBranchLine, RiMailLine, RiStackFill,
  RiUserLine, RiCursorFill, RiCheckLine, RiTeamLine, RiFolder3Line,
} from '@remixicon/react'
import { InView } from '../kit'
import { ease } from '../motion'
import Engraving from './Engraving'

const W = 'mx-auto w-[1216px]'

function Head({ title, line }: { title: ReactNode; line: string }) {
  return (
    <div className="grid grid-cols-[1fr_420px] items-end gap-12">
      <InView><h2 className="text-balance text-[46px] font-[500] leading-[1.06] tracking-[-0.03em]">{title}</h2></InView>
      <InView i={1}><p className="text-[17px] leading-[26px] text-soft">{line}</p></InView>
    </div>
  )
}

// ---------------------------------------------------------------- tools grid (categories + hatched gaps; no invented logos)
const TOOLS = [
  { i: RiMailLine, l: 'Email' }, null, { i: RiChat3Line, l: 'Chat' }, null,
  null, { i: RiFileTextLine, l: 'Docs' }, null, { i: RiBankCardLine, l: 'Billing' },
  { i: RiDatabase2Line, l: 'Databases' }, null, { i: RiUserLine, l: 'CRM' }, null,
]
export function Tools() {
  return (
    <section className={`${W} grid grid-cols-[1fr_640px] items-center gap-16 py-32`}>
      <div>
        <InView><h2 className="text-[46px] font-[500] leading-[1.06] tracking-[-0.03em]">Works across the<br />tools you already run</h2></InView>
        <InView i={1}><p className="mt-5 max-w-[400px] text-[17px] leading-[26px] text-soft">Strata reads from and writes to the places your team already works. No new inbox, no copy and paste.</p></InView>
      </div>
      <div className="relative grid grid-cols-4 gap-2.5">
        {TOOLS.map((t, k) => (
          <InView key={k} i={k * 0.35} y={10}>
            {t ? (
              <div className="flex h-[76px] items-center justify-center gap-2 rounded-[8px] bg-white shadow-[var(--shadow-tile)]">
                <t.i size={18} className="text-ink" /><span className="mono-ui text-[12px] text-ink">{t.l}</span>
              </div>
            ) : <div className="hatch h-[76px] rounded-[8px] shadow-[inset_0_0_0_1px_rgba(15,23,41,0.06)]" />}
          </InView>
        ))}
        {/* one live connection, drawn when the grid arrives */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width="100%" height="100%">
          <motion.path d="M80 76 C 80 120, 240 100, 240 120" fill="none" stroke="#0f1729" strokeWidth={1.5} strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '0px 0px -24% 0px' }} transition={{ delay: 0.9, duration: 0.8, ease: ease.inOut }} />
        </svg>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- use-case bento (greyscale, one motif per tile)
function Tile({ i, className = '', title, line, children }: { i: number; className?: string; title: string; line: string; children: ReactNode }) {
  return (
    <InView i={i} className={className}>
      <div className="flex h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[var(--shadow-ring)]">
        <div className="dots relative flex-1 overflow-hidden bg-[#fafbfc]">{children}</div>
        <div className="px-6 pb-6 pt-5 text-center">
          <div className="text-[19px] font-[550] tracking-[-0.015em]">{title}</div>
          <p className="mx-auto mt-1.5 max-w-[380px] text-[14.5px] leading-[22px] text-soft">{line}</p>
        </div>
      </div>
    </InView>
  )
}
const Chip = ({ icon: I, t, active }: { icon: typeof RiMailLine; t: string; active?: boolean }) => (
  <div className={`flex h-12 items-center gap-2 rounded-[8px] bg-white px-3 text-[13px] font-[550] ${active ? 'shadow-[0_0_0_1.5px_#0f1729]' : 'shadow-[var(--shadow-tile)]'}`}><I size={15} className="text-sub" />{t}</div>
)
export function UseCases() {
  return (
    <section className={`${W} py-28`}>
      <Head title={<>Automation for<br />every desk</>} line="The same canvas runs finance, operations, sales and IT. Each flow reads like a checklist your team already trusts." />
      <div className="mt-14 grid grid-cols-[1.45fr_1fr] grid-rows-[300px_300px] gap-3">
        <Tile i={1} title="Finance" line="Read invoices, match them to orders and schedule payment without retyping a number.">
          <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 items-center gap-6">
            <Chip icon={RiMailLine} t="Invoice in" />
            <span className="h-px flex-1 bg-[#0f1729]/30" />
            <Chip icon={RiFileTextLine} t="Read fields" active />
            <span className="h-px flex-1 bg-[#0f1729]/30" />
            <Chip icon={RiCheckLine} t="Matched" />
          </div>
          <RiCursorFill size={18} className="absolute left-[54%] top-[62%] text-ink" />
        </Tile>
        <Tile i={2} title="Operations" line="Route requests to the right queue the moment they arrive.">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[220, 170, 120].map((d, k) => <span key={d} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0f1729]/[0.12]" style={{ width: d, height: d, opacity: 1 - k * 0.15 }} />)}
            <span className="relative grid size-16 place-items-center rounded-full bg-ink text-white shadow-[0_10px_24px_-8px_rgba(15,23,41,0.6)]"><RiGitBranchLine size={24} /></span>
          </div>
        </Tile>
        <Tile i={3} title="Sales" line="Qualify new leads the same hour and hand the warm ones to a person.">
          <svg aria-hidden className="absolute inset-0" width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="none">
            <defs><linearGradient id="sg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0f1729" stopOpacity="0.10" /><stop offset="1" stopColor="#0f1729" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 170 C 120 168, 220 160, 330 140 S 520 70, 600 52 L600 220 L0 220 Z" fill="url(#sg)" />
            <motion.path d="M0 170 C 120 168, 220 160, 330 140 S 520 70, 600 52" fill="none" stroke="#0f1729" strokeWidth={1.75}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1.4, ease: ease.inOut }} />
            <line x1="430" x2="430" y1="104" y2="220" stroke="#0f1729" strokeOpacity="0.3" strokeDasharray="3 4" />
            <circle cx="430" cy="104" r="5" fill="#0f1729" />
          </svg>
          <span className="tnum absolute left-[64%] top-[22%] flex h-7 items-center rounded-full bg-ink px-2.5 text-[12px] font-[550] text-white">124 leads · sample</span>
        </Tile>
        <Tile i={4} title="IT" line="Grant access when a rule passes, alert an admin when it does not.">
          <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 space-y-2 rounded-[10px] bg-white p-3 shadow-[var(--shadow-tile)]">
            <div className="mono-ui flex items-center gap-1.5 text-[10.5px] text-soft"><RiGitBranchLine size={13} />If / else</div>
            <div className="flex h-9 items-center gap-2 rounded-[6px] bg-ok-tint px-2.5 text-[12.5px]"><span className="mono-ui text-[10px] text-ok">True</span>Provision system access</div>
            <div className="flex h-9 items-center gap-2 rounded-[6px] bg-[#f6f2ea] px-2.5 text-[12.5px]"><span className="mono-ui text-[10px] text-warn">False</span>Alert the IT admin</div>
          </div>
        </Tile>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------- run log: the contrast beat (ink panel, machine language)
const LOG = [
  ['09:41:02', 'START', 'New invoice email from invoices@northwind'],
  ['09:41:03', 'READ', 'Acme Freight · €4,280.00 · due 31 Oct · confidence 0.97'],
  ['09:41:03', 'MATCH', 'PO-2291 · exact match'],
  ['09:41:04', 'RULE', '€4,280.00 is under €5,000 → approve'],
  ['09:41:04', 'PAY', 'Scheduled for 31 Oct · ref STR-4821'],
]
export function RunLog() {
  return (
    <section className={`${W} pb-28`}>
      <InView>
        <div className="grid grid-cols-[400px_1fr] gap-14 overflow-hidden rounded-[14px] bg-ink p-14 text-white">
          <div>
            <h2 className="text-[42px] font-[500] leading-[1.06] tracking-[-0.03em]">Every run reads<br />like a receipt</h2>
            <p className="mt-5 text-[16.5px] leading-[25px] text-white/70">Each step writes what it saw, what it decided and why. When something looks off, anyone on the team can follow it back.</p>
            <a href="#" className="mono-ui mt-8 inline-flex h-11 items-center gap-2 rounded-[4px] bg-white px-5 text-[12.5px] text-ink">Read the docs<RiArrowRightLine size={15} /></a>
          </div>
          <div className="rounded-[8px] bg-white/[0.04] p-6 font-mono text-[13px] leading-[30px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <div className="mono-ui mb-3 flex text-[11px] text-white/60">Run 4821 · Invoice intake<span className="ml-auto">Sample run</span></div>
            {LOG.map(([ts, k, msg], i) => (
              <motion.div key={i} className="flex gap-5" initial={{ opacity: 0.01, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ delay: 0.3 + i * 0.22, duration: 0.5, ease: ease.outQuint }}>
                <span className="tnum text-white/50">{ts}</span>
                <span className="w-14 text-[#9fd4b6]">{k}</span>
                <span className="text-white/90">{msg}</span>
              </motion.div>
            ))}
            <motion.div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[#9fd4b6]" initial={{ opacity: 0.01 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 + LOG.length * 0.22, duration: 0.5 }}>
              <RiCheckLine size={16} />DONE · 5 steps · 2.1s
            </motion.div>
          </div>
        </div>
      </InView>
    </section>
  )
}

// ---------------------------------------------------------------- closing: a second engraving with the sun
export function Closing() {
  return (
    <section className={`${W} pb-28`}>
      <InView>
        <div className="relative h-[460px] overflow-hidden rounded-[14px] shadow-[var(--shadow-ring)]">
          <div className="absolute inset-0"><Engraving seed={4.2} sun hero /></div>
          <div className="relative p-14">
            <h2 className="text-[52px] font-[500] leading-[1.04] tracking-[-0.035em] text-ink">Build your first flow<br />this afternoon</h2>
            <p className="mt-5 max-w-[440px] text-[17px] leading-[26px] text-sub">Start from a template, connect two tools and watch the first run come back with a receipt.</p>
            <div className="mt-8 flex items-center gap-3">
              <motion.a whileTap={{ scale: 0.98 }} href="#" className="btn-ink mono-ui flex h-11 items-center gap-2 px-5 text-[12.5px]">Start building<RiArrowRightLine size={15} /></motion.a>
              <a href="#" className="btn-paper mono-ui flex h-11 items-center px-5 text-[12.5px]">Talk to us</a>
            </div>
          </div>
        </div>
      </InView>
    </section>
  )
}

// ---------------------------------------------------------------- statement footer: engraved wordmark, cropped by the sheet
const COLS: [string, string[]][] = [
  ['Product', ['Canvas', 'Runs', 'Templates', 'Changelog']],
  ['Teams', ['Finance', 'Operations', 'Sales', 'IT']],
  ['Company', ['About', 'Careers', 'Contact']],
  ['Legal', ['Privacy', 'Terms', 'Security']],
]
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className={`${W} grid grid-cols-[1.5fr_repeat(4,1fr)] gap-8 pt-20`}>
        <div>
          <div className="flex items-center gap-2"><RiStackFill size={22} /><span className="text-[20px] font-[600] tracking-[-0.02em]">Strata</span></div>
          <p className="mt-3 max-w-[260px] text-[14px] leading-[21px] text-white/65">Automations your whole team can read. Concept site; all product data shown is sample data.</p>
          <div className="mt-6 flex items-center gap-3 text-white/60"><RiTeamLine size={18} /><RiFolder3Line size={18} /></div>
        </div>
        {COLS.map(([h, ls]) => (
          <div key={h}>
            <div className="mono-ui text-[11px] text-white/55">{h}</div>
            <ul className="mt-4 space-y-2.5">{ls.map((l) => <li key={l}><a href="#" className="text-[14.5px] text-white/85 transition-colors duration-200 hover:text-white">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div aria-hidden className="engraved-text mt-10 select-none text-center text-[300px] font-[600] leading-[0.78] tracking-[-0.05em]" style={{ marginBottom: -46 }}>Strata</div>
    </footer>
  )
}
