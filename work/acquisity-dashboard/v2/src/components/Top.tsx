// Page header (AlignUI templates): ringed icon circle + title + one-line description; quiet icon buttons, one stroke, one primary.
import { RiAddLine, RiArrowDownSLine, RiCalendarLine, RiDashboard3Line, RiDownload2Line, RiNotification3Line, RiSearch2Line, RiEqualizerLine } from '@remixicon/react'
import { Button, IconCircle, Segmented } from '../ui'

export function PageHeader() {
  return (
    <header className="flex items-center gap-4 border-b border-stroke-soft pb-5">
      <IconCircle icon={RiDashboard3Line} size={48} />
      <div className="min-w-0 flex-1">
        <h1 className="label-lg text-text-strong">Good afternoon, Daniel</h1>
        <p className="mt-1 para-sm text-text-sub">Here is how outreach went in the last 30 days. Your AI SDR is working through 14 new replies.</p>
      </div>
      <Button size="lg" variant="ghost" icon={RiSearch2Line} label="Search" />
      <div className="relative">
        <Button size="lg" variant="ghost" icon={RiNotification3Line} label="Notifications" />
        <span className="pointer-events-none absolute right-2.5 top-2.5 size-2 rounded-full bg-error shadow-[0_0_0_2px_#fff]" />
      </div>
      <Button size="lg" variant="stroke" icon={RiDownload2Line}>Export</Button>
      <Button size="lg" variant="primary" icon={RiAddLine}>New campaign</Button>
    </header>
  )
}

/** Filter row: range control + date button group on the left, customise on the right. */
export function Filters({ range, setRange }: { range: string; setRange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <Segmented id="range" options={['7d', '30d', '90d']} value={range} onChange={setRange} />
      <div className="inline-flex h-9 items-stretch rounded-[10px] bg-white shadow-[var(--ring),var(--shadow-xs)]">
        <button type="button" className="press flex items-center gap-1.5 rounded-l-[10px] px-3 label-sm leading-none text-text-sub hover:bg-bg-weak">All campaigns<RiArrowDownSLine size={16} /></button>
        <span className="w-px bg-stroke-soft" />
        <button type="button" className="press flex items-center gap-2 rounded-r-[10px] px-3 label-sm leading-none text-text-sub hover:bg-bg-weak"><RiCalendarLine size={16} />Aug 18 – Sep 15</button>
      </div>
      <div className="ml-auto"><Button size="md" variant="stroke" icon={RiEqualizerLine}>Customize</Button></div>
    </div>
  )
}
