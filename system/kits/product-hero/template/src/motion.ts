// Motion tokens, taken from Kaching's shipped system (knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md, "Motion defaults").
// One place to tune the feel of the whole page.
export const ease = {
  outExpo: [0.16, 1, 0.3, 1], // hero load-ins
  outQuint: [0.22, 1, 0.36, 1], // controls, micro-interactions
  reveal: [0.26, 0.32, 0.14, 1], // soft start, long settle (critically damped spring fit)
  link: [0.33, 1, 0.68, 1], // count-up, underlines
  inOut: [0.65, 0, 0.35, 1], // drawing lines
} as const

export const dur = { micro: 0.22, reveal: 1.2, revealFade: 0.9 }
export const STAGGER = 0.07 // Kaching hero children, 70ms apart
export const spring = { type: 'spring', stiffness: 420, damping: 36 } as const

// Kaching reveal: travel 1.2s on ease.reveal, fade 0.9s, optional 6px blur on text-sized blocks only.
export const reveal = (delay: number, { y = 28, blur = false }: { y?: number; blur?: boolean } = {}) => ({
  initial: { opacity: 0.01, y, ...(blur ? { filter: 'blur(6px)' } : {}) }, // 0.01 not 0: LCP lands at first paint (measured: 0 delays LCP to delay + duration)
  animate: { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) },
  transition: {
    y: { delay, duration: dur.reveal, ease: ease.reveal },
    opacity: { delay, duration: dur.revealFade, ease: ease.outQuint },
    filter: { delay, duration: dur.revealFade, ease: ease.outQuint },
  },
})
