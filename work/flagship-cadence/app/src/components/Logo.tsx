// Cadence mark: a forecast line that keeps rising, ending in the live point.
export function Logo() {
  return (
    <a href="#" aria-label="Cadence, home" className="inline-flex min-h-10 items-center gap-2 text-ink no-underline">
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0b0d0c" />
        <path d="M7 21l5-5 4 3 9-9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="10" r="3" fill="#3ad18b" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.04em]">Cadence</span>
    </a>
  )
}
