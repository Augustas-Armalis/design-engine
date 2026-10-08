import { ArrowRight, ChevronDown } from 'lucide-react'
import { Dither } from './components/Dither'
import { Logo } from './components/Logo'
import { ProductWindow } from './components/ProductWindow'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-page">
      {/* 1200px rail with hairline side rules */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[min(1200px,100%-48px)] -translate-x-1/2 border-x border-line lg:block" />

      <header className="relative z-20 mx-auto flex w-[min(1200px,100%-24px)] items-center justify-between pt-4">
        <nav aria-label="Primary" className="flex items-center gap-1 rounded-[14px] bg-white py-1.5 pr-2 pl-3 shadow-[0_0_0_1px_var(--color-line)]">
          <Logo />
          <ul className="ml-4 hidden items-center text-[14.5px] font-medium tracking-[-0.02em] md:flex">
            {['Product', 'Customers', 'Pricing', 'Changelog'].map((l, i) => (
              <li key={l}><a href="#" className="inline-flex h-9 items-center gap-1 rounded-[9px] px-3 text-ink no-underline hover:bg-page">{l}{i === 0 && <ChevronDown className="size-3.5 text-muted" />}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden h-10 items-center px-3 text-[14.5px] font-medium tracking-[-0.02em] text-ink no-underline sm:inline-flex">Sign in</a>
          <a href="#" className="btn-dark inline-flex h-10 items-center rounded-[12px] bg-ink px-4 text-[14.5px] font-medium tracking-[-0.02em] text-white no-underline transition-colors">Book a demo</a>
        </div>
      </header>

      <main className="relative">
        <section className="relative z-10 mx-auto w-[min(1200px,100%-24px)] pt-12 text-center sm:pt-14">
          <a href="#" className="chip rise inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white py-1 pr-3 pl-1 text-[13px] font-medium tracking-[-0.02em] text-ink no-underline transition-colors">
            <span className="rounded-full bg-ink px-2 py-0.5 text-[11.5px] font-semibold text-white">New</span>
            <span className="truncate">Every forecast change now comes with a reason</span>
            <ArrowRight className="size-3.5 text-muted" />
          </a>
          <h1 className="rise mx-auto mt-5 max-w-[15ch] text-[44px] leading-[1.02] font-semibold tracking-[-0.055em] text-balance text-ink sm:text-[60px] lg:text-[70px]" style={{ animationDelay: '60ms' }}>
            Know the number{' '}
            <span className="bg-[linear-gradient(180deg,#5c5c59_0%,#9a9a96_100%)] bg-clip-text text-transparent">before the quarter does.</span>
          </h1>
          <p className="rise mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.45] font-medium tracking-[-0.025em] text-muted sm:text-[18px]" style={{ animationDelay: '120ms' }}>
            Cadence reads every deal in your CRM, forecasts the quarter with an honest range, and tells you in plain English what moved it.
          </p>
          <div className="rise mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row" style={{ animationDelay: '180ms' }}>
            <a href="#" className="btn-dark inline-flex h-12 items-center gap-2 rounded-[13px] bg-ink px-5 text-[16px] font-medium tracking-[-0.03em] text-white no-underline transition-colors">Start free trial <ArrowRight className="size-4" /></a>
            <a href="#" className="btn-light inline-flex h-12 items-center rounded-[13px] bg-white px-5 text-[16px] font-medium tracking-[-0.03em] text-ink no-underline shadow-[0_0_0_1px_var(--color-line)] transition-colors">Book a demo</a>
          </div>
          <p className="rise mt-4 font-mono text-[12px] tracking-[-0.01em] text-muted" style={{ animationDelay: '220ms' }}>Salesforce and HubSpot · 14-day trial · No card</p>
        </section>

        {/* signature field + product */}
        <section className="relative mt-10">
          <div className="absolute inset-x-0 top-0 -bottom-24 z-0"><Dither palette={['#f6f6f4', '#c3eed5', '#4fc189', '#0d6340']} top={1.0} /></div>
          <div className="rise relative z-10 mx-auto mt-12 w-[min(1136px,100%-24px)] pb-24" style={{ animationDelay: '260ms' }}>
            <ProductWindow />
          </div>
        </section>
      </main>
      <p className="sr-only">Cadence is a fictional product; every name and figure on this page is sample data.</p>
    </div>
  )
}
