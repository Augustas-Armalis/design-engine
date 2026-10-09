import { RiArrowRightUpLine, RiMailForbidLine, RiInbox2Line, RiDraftLine, RiMore2Line } from '@remixicon/react'
import { CAMPAIGNS } from '../data'
import { Badge, Button, Card, IconTile } from '../ui'

const STATUS = { Active: 'success', Paused: 'warning', Draft: 'neutral' } as const
const fmt = (n: number) => (n ? n.toLocaleString('en-US') : '–')

export function Campaigns() {
  return (
    <Card title="Campaigns" sub="4 campaigns · 2 active · sample data" action={<Button size="sm" variant="ghost" trailing={RiArrowRightUpLine}>View all</Button>} bodyClass="px-3 pb-3">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="para-xs text-text-sub">
            {['Campaign', 'Status', 'Sent', 'Replies', 'Reply rate', 'Meetings', 'Actions'].map((h, i) => (
              <th key={i} scope="col" className={`h-9 bg-bg-weak px-3 font-[400] ${i === 0 ? 'rounded-l-[8px] text-left' : i === 6 ? 'w-10 rounded-r-[8px]' : i === 1 ? 'text-left' : 'text-right'}`}>{i === 6 ? <span className="sr-only">{h}</span> : h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAMPAIGNS.map((c) => {
            const rate = c.sent ? (c.replies / c.sent) * 100 : 0
            return (
              <tr key={c.name} className="group">
                <td className="h-14 rounded-l-[8px] px-3 group-hover:bg-bg-weak">
                  <div className="flex items-center gap-2.5 leading-none">
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full label-xs ${c.owner === 'AI' ? 'bg-primary-alpha text-primary-dark' : 'bg-[#c2d6ff] text-[#122368]'}`}>{c.owner}</span>
                    <span className="whitespace-nowrap label-sm text-text-strong">{c.name}</span>
                  </div>
                </td>
                <td className="px-3 group-hover:bg-bg-weak"><Badge tone={STATUS[c.status]} dot>{c.status}</Badge></td>
                <td className="tnum px-3 text-right para-sm text-text-strong group-hover:bg-bg-weak">{fmt(c.sent)}</td>
                <td className="tnum px-3 text-right para-sm text-text-strong group-hover:bg-bg-weak">{fmt(c.replies)}</td>
                <td className="px-3 group-hover:bg-bg-weak">
                  <div className="flex items-center justify-end gap-2.5">
                    <span className="h-1.5 w-10 overflow-hidden rounded-full bg-bg-weak group-hover:bg-white"><span className="block h-full rounded-full bg-primary" style={{ width: `${(rate / 4) * 100}%` }} /></span>
                    <span className="tnum w-11 text-right para-sm text-text-strong">{c.sent ? `${rate.toFixed(1)}%` : '–'}</span>
                  </div>
                </td>
                <td className="tnum px-3 text-right para-sm text-text-strong group-hover:bg-bg-weak">{c.meetings || '–'}</td>
                <td className="rounded-r-[8px] px-1 group-hover:bg-bg-weak"><Button size="xs" variant="ghost" icon={RiMore2Line} label={`More for ${c.name}`} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}

const ITEMS = [
  { icon: RiMailForbidLine, tone: 'error', title: '2 mailboxes hit their bounce limit', body: 'Sending from them is paused until you review the list.', cta: 'Review' },
  { icon: RiInbox2Line, tone: 'primary', title: '12 replies in the AI SDR inbox', body: '4 are interested and have a suggested reply ready.', cta: 'Open inbox' },
  { icon: RiDraftLine, tone: 'warning', title: 'Legal partners, EU is still a draft', body: 'Copy was approved 3 days ago but it has no leads yet.', cta: 'Add leads' },
] as const

export function Attention() {
  return (
    <Card title="Needs attention" sub="3 things waiting on you" bodyClass="px-3 pb-3">
      <ul className="space-y-1">
        {ITEMS.map((it) => (
          <li key={it.title} className="flex items-start gap-3 rounded-[12px] p-2 hover:bg-bg-weak">
            <IconTile icon={it.icon} tone={it.tone} />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="label-sm text-text-strong">{it.title}</div>
              <p className="mt-0.5 para-xs text-text-sub">{it.body}</p>
              <Button size="xs" variant="stroke" className="mt-2.5">{it.cta}</Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
