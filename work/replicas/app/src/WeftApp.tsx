// The Weft app shown behind the search modal: a real workflows screen in the AlignUI / affectUI grammar (inset white
// panel on a soft grey shell, 36px nav rows, a KPI strip in one card with hairline dividers, a workflows table with
// typed rows). Sample data.
import { RiHome5Line, RiFlowChart, RiPlayCircleLine, RiCheckboxCircleLine, RiRobot2Line, RiPlugLine, RiBarChart2Line, RiFileShield2Line, RiTeamLine, RiSettings3Line, RiSearch2Line, RiAddLine, RiArrowDownSLine, RiMore2Fill, RiRefund2Line, RiTruckLine, RiCustomerService2Line, RiShieldCheckLine, RiMailSendLine, RiFileTextLine } from '@remixicon/react'

const ink = '#171717', sub = '#5c5c5c', soft = '#a3a3a3', line = '#ececec'
const NAV: [typeof RiHome5Line, string, string?][] = [[RiHome5Line, 'Home'], [RiFlowChart, 'Workflows', '12'], [RiPlayCircleLine, 'Runs'], [RiCheckboxCircleLine, 'Approvals', '3'], [RiRobot2Line, 'Agents'], [RiPlugLine, 'Integrations'], [RiBarChart2Line, 'Analytics']]
const ROWS: [typeof RiHome5Line, string, string, string, string, string, string][] = [
  [RiRefund2Line, '#346eda', 'Refund triage', 'Zendesk → Stripe', '4,182', '98.2%', 'Waiting'],
  [RiTruckLine, '#f08a24', 'Late delivery follow-up', 'Shopify → Gmail', '1,906', '99.6%', 'Live'],
  [RiCustomerService2Line, '#7c5cf0', 'Ticket routing', 'Zendesk → Linear', '12,440', '97.4%', 'Live'],
  [RiShieldCheckLine, '#e5484d', 'Refund fraud check', 'Stripe → Slack', '611', '100%', 'Live'],
  [RiMailSendLine, '#2f9e5b', 'Weekly ops digest', 'Weft → Slack', '42', '100%', 'Paused'],
  [RiFileTextLine, '#0ea5a4', 'Policy Q&A', 'Notion → Intercom', '3,318', '96.1%', 'Live'],
  [RiRefund2Line, '#346eda', 'Chargeback evidence', 'Stripe → Drive', '208', '94.7%', 'Draft'],
  [RiCustomerService2Line, '#7c5cf0', 'VIP escalation', 'Intercom → Slack', '96', '100%', 'Live'],
  [RiTruckLine, '#f08a24', 'Address correction', 'Shopify → Zendesk', '1,204', '98.9%', 'Live'],
  [RiMailSendLine, '#2f9e5b', 'Renewal reminders', 'Stripe → Gmail', '2,870', '99.8%', 'Live'],
  [RiShieldCheckLine, '#e5484d', 'Account takeover alert', 'Auth0 → PagerDuty', '18', '100%', 'Waiting'],
]
const STATE: Record<string, [string, string]> = { Waiting: ['#fff4e5', '#b45309'], Live: ['#e9f8ef', '#15803d'], Paused: ['#f2f2f2', '#5c5c5c'], Draft: ['#f2f2f2', '#5c5c5c'] }

export default function WeftApp() {
  return (
    <div className="absolute inset-0 flex" style={{ background: '#f5f5f5', color: ink }}>
      <aside className="flex w-[256px] shrink-0 flex-col px-3 pt-4">
        <div className="flex h-12 items-center gap-2.5 px-2">
          <span className="grid size-8 place-items-center rounded-[10px] bg-[#171717] text-[13px] font-[600] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]">W</span>
          <div className="leading-tight"><div className="text-[14px] font-[500]">Weft</div><div className="text-[12px]" style={{ color: soft }}>Northwind ops</div></div>
          <RiArrowDownSLine size={16} className="ml-auto" style={{ color: soft }} />
        </div>
        <div className="mx-2 mt-3 flex h-9 items-center gap-2 rounded-[12px] bg-white px-3 text-[14px]" style={{ color: soft, boxShadow: `0 0 0 1px ${line}, 0 1px 2px rgb(0 0 0 / 0.04)` }}><RiSearch2Line size={16} />Search<span className="ml-auto text-[12px]">⌘K</span></div>
        <nav className="mt-4 flex flex-col gap-0.5 px-1">
          {NAV.map(([I, l, n]) => (
            <div key={l} className="flex h-9 items-center gap-2.5 rounded-[12px] px-3 text-[14px] font-[500]" style={l === 'Workflows' ? { background: '#fff', color: ink, boxShadow: `0 0 0 1px ${line}, 0 1px 2px rgb(0 0 0 / 0.04)` } : { color: sub }}>
              <I size={18} style={{ color: l === 'Workflows' ? ink : soft }} />{l}{n && <span className="ml-auto rounded-full px-1.5 text-[12px]" style={{ color: sub, background: l === 'Workflows' ? '#f2f2f2' : 'transparent' }}>{n}</span>}
            </div>
          ))}
        </nav>
        <div className="mt-6 px-4 text-[12px] font-[500]" style={{ color: soft }}>Workspace</div>
        <nav className="mt-2 flex flex-col gap-0.5 px-1">
          {([[RiFileShield2Line, 'Policies'], [RiTeamLine, 'Members'], [RiSettings3Line, 'Settings']] as const).map(([I, l]) => <div key={l} className="flex h-9 items-center gap-2.5 rounded-[12px] px-3 text-[14px] font-[500]" style={{ color: sub }}><I size={18} style={{ color: soft }} />{l}</div>)}
        </nav>
      </aside>
      <main className="my-2 mr-2 flex-1 overflow-hidden rounded-[20px] bg-white" style={{ boxShadow: `0 0 0 1px ${line}, 0 1px 2px rgb(0 0 0 / 0.03)` }}>
        <div className="flex h-[60px] items-center px-7" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>
          <span className="text-[16px] font-[500]">Workflows</span><span className="ml-2 text-[14px]" style={{ color: soft }}>· 12 live</span>
          <span className="ml-auto flex h-9 items-center gap-1.5 rounded-[12px] bg-[#171717] px-3.5 text-[14px] font-[500] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.2)]"><RiAddLine size={16} />New workflow</span>
        </div>
        <div className="px-7 pt-6">
          <div className="grid grid-cols-4 rounded-[18px]" style={{ boxShadow: `0 0 0 1px ${line}` }}>
            {[['Runs today', '2,418', '+12% vs yesterday'], ['Success rate', '98.4%', '+0.6 pts'], ['Waiting on people', '3', 'Oldest 2m 14s'], ['Time saved', '41h', 'This week']].map(([l, v, d], i) => (
              <div key={l} className="px-5 py-4" style={{ boxShadow: i ? `inset 1px 0 0 ${line}` : undefined }}>
                <div className="text-[13px]" style={{ color: sub }}>{l}</div><div className="mt-1 text-[24px] tracking-[-0.02em] tabular-nums">{v}</div><div className="mt-0.5 text-[12px]" style={{ color: soft }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 overflow-hidden rounded-[18px]" style={{ boxShadow: `0 0 0 1px ${line}` }}>
            <div className="grid h-10 grid-cols-[1fr_200px_120px_120px_120px_40px] items-center px-5 text-[12px]" style={{ background: '#fbfbfb', color: soft, boxShadow: `inset 0 -1px 0 ${line}` }}>
              <span>Workflow</span><span>Apps</span><span>Runs</span><span>Success</span><span>Status</span><span />
            </div>
            {ROWS.map(([I, c, n, apps, runs, ok, st]) => (
              <div key={n} className="grid h-[60px] grid-cols-[1fr_200px_120px_120px_120px_40px] items-center px-5 text-[14px]" style={{ boxShadow: `inset 0 -1px 0 ${line}` }}>
                <span className="flex items-center gap-3 font-[500]"><span className="grid size-8 place-items-center rounded-[10px] text-white" style={{ background: c }}><I size={16} /></span>{n}</span>
                <span style={{ color: sub }}>{apps}</span><span className="tabular-nums" style={{ color: sub }}>{runs}</span><span className="tabular-nums" style={{ color: sub }}>{ok}</span>
                <span><span className="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-[500]" style={{ background: STATE[st][0], color: STATE[st][1] }}><span className="size-1.5 rounded-full" style={{ background: STATE[st][1] }} />{st}</span></span>
                <RiMore2Fill size={16} style={{ color: soft }} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
