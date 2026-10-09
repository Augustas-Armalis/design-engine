// Key numbers as plain columns divided by hairlines (no cards): label, number in regular weight, quiet change.
import { KPIS } from '../data'
import { Change } from '../ui'

export default function Kpis() {
  return (
    <section aria-label="Key numbers (sample)" className="grid grid-cols-4">
      {KPIS.map((k, i) => (
        <div key={k.label} className={`${i ? 'border-l border-stroke-soft pl-8' : ''} pr-8`}>
          <div className="para-sm text-text-sub">{k.label}</div>
          <div className="mt-2 flex items-baseline gap-2"><span className="num-lg text-text-strong">{k.value}</span><Change v={k.delta} up={k.up} /></div>
          <div className="mt-1 para-xs text-text-soft">{k.note}</div>
        </div>
      ))}
    </section>
  )
}
