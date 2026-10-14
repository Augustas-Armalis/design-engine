// Kite wordmark (placeholder until the founder supplies a mark): "kite" in wide Mona Sans, the i's tittle drawn as a
// small diamond, the one kite in the logo.
export default function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="relative inline-flex items-baseline font-[640] leading-none tracking-[-0.03em] text-[var(--ink)]" style={{ fontSize: size, fontVariationSettings: '"wdth" 112' }} role="img" aria-label="Kite">
      <span aria-hidden>k</span>
      <span aria-hidden className="relative">ı<span className="absolute left-1/2 -translate-x-1/2 rotate-45 rounded-[1px] bg-[var(--ink)]" style={{ top: -size * 0.02, width: size * 0.2, height: size * 0.2 }} /></span>
      <span aria-hidden>te</span>
    </span>
  )
}
