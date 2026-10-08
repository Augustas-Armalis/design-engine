// Linework mark: a set-square corner (the measured plan) with the red-pencil tick where the measuring starts.
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v15h16" fill="none" stroke="var(--text-strong)" strokeWidth="2.6" strokeLinecap="square" />
      <rect x="2.6" y="15.6" width="4.8" height="4.8" fill="var(--accent-solid)" />
      <path d="M9 14l3-3M9 10l1.5-1.5" stroke="var(--text-strong)" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  )
}

export function Logo() {
  return (
    <a href="#" className="inline-flex min-h-11 items-center gap-2.5 text-text-strong no-underline" aria-label="Linework, home">
      <LogoMark />
      <span className="font-sans text-[19px] font-semibold tracking-[-0.01em]">Linework</span>
    </a>
  )
}
