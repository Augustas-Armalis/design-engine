// Showcase frame on #0c0c0d: equal 56px gaps left, top and bottom (150px at 4K), the dashboard's full height, cut only
// at the right (~92% visible). Native render inside a scale(<1) so 4K captures stay intact. The frame rises in first,
// then the dashboard assembles from the map outward (SHOWCASE_T).
import { motion } from 'motion/react'
import App from './App'
import { ease, SHOWCASE_T, T } from './anim'

Object.assign(T, SHOWCASE_T)
export const SHOW = { w: 1220, h: 900 }
const G = 56, Z = (SHOW.h - 2 * G) / 900, W = 1440 * Z

export default function Showcase() {
  return (
    <div className="relative overflow-hidden bg-[#0c0c0d]" style={{ width: SHOW.w, height: SHOW.h }}>
      <motion.div className="absolute overflow-hidden rounded-[22px]" style={{ left: G, top: G, width: W, height: 900 * Z, transformOrigin: '30% 40%', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.07), 0 18px 40px -24px rgb(0 0 0 / 0.45)' }}
        initial={{ opacity: 0, y: 28, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.05, duration: 1.4, ease: ease.out, opacity: { delay: 0.05, duration: 0.6, ease: ease.out } }}>
        <div style={{ width: 1440, height: 900, transform: `scale(${Z})`, transformOrigin: '0 0' }}><App embedded /></div>
      </motion.div>
    </div>
  )
}
