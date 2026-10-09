// Tandem: three deliverables in Florian Hoeller's grammar, one product story.
//   #/hero       the landing hero (depth-of-field collage + live approval)    (default)
//   #/component  the Approval Request component in an affectUI-style showcase frame
//   #/product    the full Tandem workspace screen
import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Hero from './Hero'
import Product from './Product'
import Approval from './Approval'
import { Showcase } from './ui'

function ComponentPage() {
  return (
    <div className="relative mx-auto flex h-[900px] w-[1440px] flex-col items-center bg-white pt-[96px]">
      <h1 className="text-center text-[40px] font-[500] leading-[1.15] tracking-[-0.03em]">Approval Request</h1>
      <p className="mt-3 text-center text-[17px] leading-[26px] text-[var(--sub)]">An agent action that waits for a person: scoped preview, hold to approve,<br />live progress and a receipt you can undo.</p>
      <div className="mt-12">
        <Showcase category="Agents" title="Approval Request" desc="Scoped preview, hold-to-approve, live progress, undo">
          <div style={{ transform: 'scale(0.98)' }}><Approval demo delay={0.4} /></div>
        </Showcase>
      </div>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(location.hash)
  useEffect(() => { const f = () => setRoute(location.hash); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return (
    <MotionConfig reducedMotion="user">
      {route === '#/component' ? <ComponentPage /> : route === '#/product' ? <Product /> : <Hero />}
    </MotionConfig>
  )
}
