// Tandem mark, constructed (work/tandem/brand/finalists.mjs, tested by `node tools/logo.mjs present`). Two finalists:
//   t  T-cut: a disc cut into three by a T of slits; the letter lives in the space between the parts (default)
//   h  Halves: two half discs side by side, stepping down past each other; leader and follower
// ?mark=h on the URL switches the whole build so both can be judged in place. The agent avatar in the product is the mark.
import { useId } from 'react'
import { Bot } from 'lucide-react'

export type MarkVariant = 't' | 'h'
export const markVariant = (): MarkVariant => (new URLSearchParams(location.search).get('mark') === 'h' ? 'h' : 't')

export function Mark({ size = 21, variant = markVariant(), className = '' }: { size?: number; variant?: MarkVariant; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="currentColor" overflow="visible" aria-hidden className={`shrink-0 ${className}`}>
      {variant === 't' ? (
        <>
          <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
            <rect x="-10" y="-10" width="120" height="120" fill="#fff" />
            <rect x="-5" y="30" width="110" height="8.5" fill="#000" /><rect x="45.5" y="30" width="9" height="75" fill="#000" />
          </mask>
          <circle cx="50" cy="50" r="51" mask={`url(#${id})`} />
        </>
      ) : (
        <><path d="M46 7 A33 33 0 0 0 46 73 Z" /><path d="M54 27 A33 33 0 0 1 54 93 Z" /></>
      )}
    </svg>
  )
}

/** the agent's avatar (founder: "replace with some icon in square box gray, just nicer"): a soft grey rounded tile with a
 *  Lucide glyph, a hairline ring and a lit top edge; radius scales with the tile so 14px and 28px read the same */
export function AgentMark({ size = 22 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center bg-[linear-gradient(180deg,#f7f7f7,#ececec)] text-[#3f3f3f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]"
      style={{ width: size, height: size, borderRadius: Math.max(4, Math.round(size * 0.28)) }}>
      <Bot size={Math.round(size * 0.6)} strokeWidth={size < 18 ? 2 : 1.75} />
    </span>
  )
}

/** nav lockup measured to the logo-craft pairing spec: 20px wordmark (cap ~14.5px), mark 1.43x cap = 21px, gap 0.28x = 6px */
export function Lockup() {
  return (
    <span className="flex items-center gap-[6px]">
      <Mark size={21} />
      <span className="text-[20px] font-[600] leading-none tracking-[-0.03em]">Tandem</span>
    </span>
  )
}
