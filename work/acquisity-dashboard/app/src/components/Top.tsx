import { RiAddLine, RiArrowRightSLine, RiBankCardLine, RiNotification3Line, RiSparkling2Line, RiCalendarLine, RiDownload2Line } from '@remixicon/react'
import { Button, Segmented } from '../ui'

export function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-stroke-soft px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 label-sm leading-none text-text-sub">
        <span>Home</span><RiArrowRightSLine size={16} className="text-text-disabled" /><span className="text-text-strong">Dashboard</span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button type="button" className="press flex h-8 items-center gap-2 rounded-[8px] bg-error-light pl-2 pr-2.5 label-sm leading-none text-error-text hover:bg-[#ffdfe1]">
          <RiBankCardLine size={16} />Payment failed<span className="underline decoration-error-text/30 underline-offset-[3px]">Update card</span>
        </button>
        <span className="mx-1 h-5 w-px bg-stroke-soft" />
        <Button size="sm" variant="stroke" icon={RiSparkling2Line}>Ask AI</Button>
        <div className="relative">
          <Button size="sm" variant="stroke" icon={RiNotification3Line} label="Notifications" />
          <span className="pointer-events-none absolute right-1.5 top-1.5 size-2 rounded-full bg-error shadow-[0_0_0_2px_#fff]" />
        </div>
        <Button size="sm" variant="neutral" icon={RiAddLine}>New campaign</Button>
      </div>
    </header>
  )
}

export function PageHead({ range, setRange }: { range: string; setRange: (v: string) => void }) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <h1 className="title-h5 text-text-strong">Good afternoon, Daniel</h1>
        <p className="mt-1 para-sm text-text-sub">Outreach over the last 30 days. Your AI SDR is working through 14 new replies.</p>
      </div>
      <Segmented id="range" options={['7d', '30d', '90d']} value={range} onChange={setRange} />
      <button type="button" className="press flex h-9 items-center gap-2 rounded-[8px] bg-white px-3 label-sm leading-none text-text-sub shadow-[var(--ring),var(--shadow-xs)] hover:bg-bg-weak">
        <RiCalendarLine size={20} className="shrink-0" />Aug 18 – Sep 15
      </button>
      <Button size="md" variant="stroke" icon={RiDownload2Line} label="Export" />
    </div>
  )
}
