// Two sub-sections under the chart: reply intent (segmented tick meter) and reply sources (compact table).
import { RiArrowRightUpLine } from '@remixicon/react'
import { CHANNELS, INTENT } from '../data'
import { Button, Change, SectionHead } from '../ui'

export function Intent() {
  const total = INTENT.reduce((a, b) => a + b.n, 0)
  const ticks = 28
  let k = 0
  const cells = INTENT.flatMap((c) => { const n = Math.round((c.n / total) * ticks); return Array.from({ length: n }, () => ({ cls: c.cls, key: k++ })) }).slice(0, ticks)
  return (
    <section aria-label="Reply intent (sample)">
      <SectionHead title="Reply intent" sub="Latest 14 replies, sorted by the AI SDR"><Button size="sm" variant="stroke">Details</Button></SectionHead>
      <div className="mt-4 flex items-baseline gap-2"><span className="num-lg text-text-strong">29%</span><span className="para-sm text-text-sub">interested</span><Change v="+4 pts" up ctx="vs last batch" /></div>
      <div className="mt-4 flex h-6 gap-[3px]" role="img" aria-label="Interested 4, Not now 6, Out of office 3, Unsubscribe 1">
        {cells.map((c) => <span key={c.key} className={`flex-1 rounded-[2px] ${c.cls}`} />)}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
        {INTENT.map((c) => (
          <div key={c.label} className="flex items-center gap-2 leading-none"><span className={`size-2 rounded-full ${c.cls}`} /><span className="para-sm text-text-sub">{c.label}</span><span className="tnum ml-auto label-sm text-text-strong">{c.n}</span></div>
        ))}
      </div>
    </section>
  )
}

export function Sources() {
  return (
    <section aria-label="Reply sources (sample)">
      <SectionHead title="Reply sources" sub="Where the 720 replies came from"><Button size="sm" variant="stroke" icon={RiArrowRightUpLine} label="Open sources" /></SectionHead>
      <table className="mt-4 w-full border-separate border-spacing-0">
        <thead><tr className="para-xs text-text-soft">
          <th scope="col" className="pb-2 text-left font-[400]">Channel</th><th scope="col" className="pb-2 text-right font-[400]">Replies</th>
          <th scope="col" className="pb-2 text-right font-[400]">Rate</th><th scope="col" className="pb-2 text-right font-[400]">Trend</th>
        </tr></thead>
        <tbody>
          {CHANNELS.map((c) => (
            <tr key={c.label}>
              <td className="h-10 border-t border-stroke-soft label-sm text-text-strong">{c.label}</td>
              <td className="tnum h-10 border-t border-stroke-soft text-right para-sm text-text-strong">{c.replies}</td>
              <td className="tnum h-10 border-t border-stroke-soft text-right para-sm text-text-sub">{c.rate}</td>
              <td className="h-10 border-t border-stroke-soft text-right"><Change v={c.trend} up={c.up} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
