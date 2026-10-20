// Replica 4: Marcel Kargul's two-part search modal (knowledge/benchmarks/kargul-x/latest/kxl-020-0-2111131955404128683.jpg,
// 2880x2048 at 2x = 1440x1024), measured in knowledge/web/kargul-micro-details.md (replication set #8, KMD rules):
// bar and results as two surfaces 17px apart, r16, ring + soft 6px shadow, 22% scrim + blur over the app, mono caps
// section labels, 56px result rows with 17px colour tiles, chip filters, checkbox columns, a hint footer strip.
// Our content: Weft (AI workflows). Own touch: the matched query letters are highlighted in each result title.
import type { ReactNode } from 'react'
import { RiSearch2Line, RiFlowChart, RiFileTextLine, RiArrowRightUpLine, RiArrowUpLine, RiArrowDownLine, RiCornerDownLeftLine, RiCustomerService2Line, RiRefund2Line, RiTruckLine, RiShieldCheckLine, RiMailSendLine } from '@remixicon/react'

const ink = '#0c0c0c', sub = '#626262', mute = '#919191'
const ring = '0 0 0 1px rgb(0 0 0 / 0.07)'
const surface = `${ring}, 0 0 6px rgb(0 0 0 / 0.06), 0 12px 32px -12px rgb(0 0 0 / 0.10)`
const Caps = ({ children, className = '' }: { children: ReactNode; className?: string }) => <div className={`font-mono text-[12px] uppercase tracking-[0.02em] ${className}`} style={{ color: '#666' }}>{children}</div>
const Tile = ({ c, icon: I }: { c: string; icon: typeof RiFlowChart }) => <span className="grid size-[17px] shrink-0 place-items-center rounded-[4px] text-white" style={{ background: c, boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.2)' }}><I size={11} /></span>
const Box = () => <span className="size-4 shrink-0 rounded-[4px] bg-white" style={{ boxShadow: '0 0 0 1px rgb(0 0 0 / 0.14), 0 1px 1px rgb(0 0 0 / 0.04)' }} />
const Key = ({ children }: { children: ReactNode }) => <span className="grid h-5 min-w-5 place-items-center rounded-[5px] bg-white px-1 text-[11px]" style={{ color: sub, boxShadow: '0 0 0 1px rgb(0 0 0 / 0.08), 0 1px 0 rgb(0 0 0 / 0.06)' }}>{children}</span>
const Hit = ({ t, q }: { t: string; q: string }) => { const i = t.toLowerCase().indexOf(q); return i < 0 ? <>{t}</> : <>{t.slice(0, i)}<span style={{ color: '#346eda' }}>{t.slice(i, i + q.length)}</span>{t.slice(i + q.length)}</> }

const RECENT: [string, typeof RiFlowChart, string, string][] = [
  ['#346eda', RiRefund2Line, 'Refund triage', 'Run #4,182 is waiting on Maya Chen to approve a $248.00 refund'],
  ['#f08a24', RiTruckLine, 'Late delivery follow-up', 'Emails customers when a parcel is two days past its window'],
  ['#7c5cf0', RiCustomerService2Line, 'Ticket routing', 'Sends billing tickets to finance and bugs to the on-call engineer'],
  ['#e5484d', RiShieldCheckLine, 'Refund fraud check', 'Flags refunds over $500 from accounts younger than 30 days'],
  ['#2f9e5b', RiMailSendLine, 'Weekly ops digest', 'Posts runs, approvals and failures to #ops every Monday at 9:00'],
]
const AGENTS: [typeof RiFlowChart, string][] = [[RiCustomerService2Line, 'Support Triage Agent'], [RiRefund2Line, 'Refunds & Credits Agent'], [RiTruckLine, 'Shipping Status Agent'], [RiFileTextLine, 'Policy Q&A Agent']]

export default function Search() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1440, height: 1024, background: '#f4f4f4', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"', color: ink }}>
      {/* the app behind, blurred */}
      <div aria-hidden className="absolute inset-0" style={{ filter: 'blur(3px)' }}>
        <div className="absolute left-0 top-0 h-full w-[256px] px-6 pt-7 text-[14px] font-[500]" style={{ color: '#7a7a7a' }}>
          <div className="mb-10 text-[19px] font-[600] text-[#222]">Weft</div>
          {['Home', 'Workflows', 'Runs', 'Approvals', 'Agents', 'Integrations', 'Analytics', 'Audit log', 'Policies', 'Members'].map((l, i) => <div key={l} className={`mb-[22px] ${i === 1 ? 'text-[#222]' : ''}`}>{l}</div>)}
        </div>
        <div className="absolute left-[256px] top-[10px] h-[1004px] w-[1174px] rounded-[16px] bg-white">
          <div className="h-[60px] border-b border-[#ececec] px-6 pt-5 text-[14px] text-[#999]">Search</div>
          <div className="px-6 pt-8 text-[16px] font-[600] text-[#333]">Workflows</div>
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="mx-6 mt-6 h-[56px] rounded-[12px] bg-[#f6f6f6]" />)}
        </div>
      </div>
      <div className="absolute inset-0" style={{ background: 'rgb(0 0 0 / 0.22)' }} />

      {/* bar */}
      <div data-subject className="absolute" style={{ left: 350, top: 156, width: 779 }}>
        <div className="flex h-[55px] items-center gap-3 rounded-[16px] bg-white px-[18px] text-[16px]" style={{ boxShadow: surface }}>
          <RiSearch2Line size={18} style={{ color: mute }} />
          <span>ref<span className="ml-px inline-block h-[19px] w-[1.5px] translate-y-[3px] bg-[#346eda]" /></span>
          <span style={{ color: '#a8a8a8' }}>Search runs, agents, policies, or ask anything…</span>
        </div>

        {/* results */}
        <div className="mt-[17px] overflow-hidden rounded-[16px] bg-white" style={{ boxShadow: surface }}>
          <div className="px-5 pt-[19px]">
            <div className="inline-flex h-[30px] items-center rounded-[9px] p-[2px]" style={{ background: '#f4f4f4', boxShadow: 'inset 0 0 0 1px #ededed' }}>
              {['All', 'Runs', 'Agents', 'Policies'].map((t, i) => <span key={t} className="flex h-[26px] items-center rounded-[7px] px-[11px] text-[14px]" style={i === 0 ? { background: '#fff', color: '#060606', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.06), 0 1px 1px rgb(0 0 0 / 0.06)' } : { color: sub }}>{t}</span>)}
            </div>
          </div>
          <div className="flex px-5">
            <div className="w-[496px] pb-[12px]">
              <Caps className="pt-[30px]">Recent runs</Caps>
              <div className="pt-[14px]">
                {RECENT.map(([c, I, t, s]) => (
                  <div key={t} className="flex h-[56px] gap-2.5">
                    <span className="pt-[2px]"><Tile c={c} icon={I} /></span>
                    <div className="leading-[20px]"><div className="text-[14px] font-[500]"><Hit t={t} q="ref" /></div><div className="text-[14px]" style={{ color: sub }}>{s}</div></div>
                  </div>
                ))}
              </div>
              <Caps className="pt-[20px]">Suggested agents</Caps>
              <div className="grid grid-cols-2 gap-[9px] pt-[18px]">
                {AGENTS.map(([I, t]) => (
                  <div key={t} className="flex h-[56px] items-center gap-3 rounded-[12px] px-3" style={{ background: '#f7f7f7' }}>
                    <span className="grid size-[34px] place-items-center rounded-[8px]" style={{ background: '#e8f0fd', color: '#346eda', boxShadow: 'inset 0 0 0 1px rgb(52 110 218 / 0.08)' }}><I size={17} /></span>
                    <span className="flex-1 text-[14px] font-[500] leading-[18px]"><Hit t={t} q="ref" /></span>
                    <RiArrowRightUpLine size={16} style={{ color: mute }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-auto w-[223px] pb-6">
              <Caps className="pt-[30px]">Last run</Caps>
              <div className="flex flex-wrap gap-x-[9px] gap-y-[10px] pt-[24px] text-[14px]">
                {['Any time', 'Today', 'Yesterday', 'Past 7 days', 'Past 30 days', 'Past year'].map((c, i) => <span key={c} className="flex h-[32px] items-center rounded-[10px] px-3" style={i === 0 ? { background: '#e8f0fd', color: '#346eda' } : { background: '#f4f4f4', color: sub }}>{c}</span>)}
              </div>
              {[['Type', ['Runs', 'Agents', 'Policies', 'Docs']], ['Status', ['Waiting', 'Failed', 'Done']], ['Owner', ['Created by me']]].map(([h, items]) => (
                <div key={h as string}>
                  <Caps className={h === 'Type' ? 'pt-[22px]' : 'pt-[26px]'}>{h as string}</Caps>
                  <div className="grid grid-cols-2 gap-y-[14px] pt-[12px] text-[14px] leading-5">{(items as string[]).map((it) => <span key={it} className="flex items-center gap-2 whitespace-nowrap"><Box />{it}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
          {/* hint footer */}
          <div className="flex h-[60px] items-center gap-2 px-5 text-[14px]" style={{ background: '#fafafa', boxShadow: 'inset 0 1px 0 #f0f0f0', color: sub }}>
            <Key><RiArrowUpLine size={12} /></Key><Key><RiArrowDownLine size={12} /></Key><span className="mr-3">Navigate</span>
            <Key><RiCornerDownLeftLine size={12} /></Key><span>Open</span>
            <span className="ml-auto flex items-center gap-2"><Key>esc</Key>Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}
