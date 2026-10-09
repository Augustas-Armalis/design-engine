// Campaigns table (AlignUI grammar): grey head row r8, 60px rows on hairlines, ringed icon circles, stroke status badges.
import { RiArrowRightUpLine, RiMailSendLine, RiMore2Line, RiSparkling2Line } from '@remixicon/react'
import { CAMPAIGNS } from '../data'
import { Button, IconCircle, SectionHead } from '../ui'

const DOT = { Active: 'bg-success', Paused: 'bg-warning', Draft: 'bg-text-disabled' } as const
const fmt = (n: number) => (n ? n.toLocaleString('en-US') : '–')

export function Campaigns() {
  return (
    <section aria-label="Campaigns (sample)">
      <SectionHead title="Campaigns" sub="4 campaigns, 2 sending">
        <Button size="md" variant="stroke" trailing={RiArrowRightUpLine}>View all</Button>
      </SectionHead>
      <table className="mt-5 w-full border-separate border-spacing-0">
        <thead>
          <tr className="para-sm text-text-sub">
            {['Campaign', 'Status', 'Sent', 'Replies', 'Reply rate', 'Meetings', 'Actions'].map((h, i) => (
              <th key={h} scope="col" className={`h-9 bg-bg-weak px-3 font-[400] ${i === 0 ? 'rounded-l-[8px] text-left' : i === 6 ? 'w-12 rounded-r-[8px]' : i === 1 ? 'text-left' : 'text-right'}`}>
                {i === 6 ? <span className="sr-only">{h}</span> : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAMPAIGNS.map((c, r) => {
            const rate = c.sent ? `${((c.replies / c.sent) * 100).toFixed(1)}%` : '–'
            const td = `h-[60px] px-3 ${r ? 'border-t border-stroke-soft' : ''}`
            return (
              <tr key={c.name} className="hover:bg-bg-weak/60">
                <td className={td}>
                  <div className="flex items-center gap-3">
                    <IconCircle icon={c.owner === 'AI' ? RiSparkling2Line : RiMailSendLine} size={32} />
                    <div className="leading-none"><div className="whitespace-nowrap label-sm text-text-strong">{c.name}</div><div className="mt-1 para-xs text-text-sub">{c.owner === 'AI' ? 'Run by AI SDR' : 'Daniel Ward'}</div></div>
                  </div>
                </td>
                <td className={td}>
                  <span className="inline-flex h-6 items-center gap-1.5 rounded-[6px] bg-white px-2 label-xs leading-none text-text-sub shadow-[var(--ring)]"><span className={`size-1.5 rounded-full ${DOT[c.status]}`} />{c.status}</span>
                </td>
                <td className={`${td} tnum text-right para-sm text-text-strong`}>{fmt(c.sent)}</td>
                <td className={`${td} tnum text-right para-sm text-text-strong`}>{fmt(c.replies)}</td>
                <td className={`${td} tnum text-right para-sm text-text-strong`}>{rate}</td>
                <td className={`${td} tnum text-right para-sm text-text-strong`}>{c.meetings || '–'}</td>
                <td className={`${td} text-right`}><Button size="sm" variant="ghost" icon={RiMore2Line} label={`More for ${c.name}`} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
