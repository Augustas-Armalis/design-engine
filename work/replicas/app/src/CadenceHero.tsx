// Cadence hero on the founder-approved light canon, centred alternate (Kestrel floor; knowledge/founder/canon/hero-light.md):
// #f7f7f7 canvas with a 16px dot grid inside the rails faded behind the headline, plain text nav, h1 72/550/-0.045em Inter
// display Title Case with nothing above it, 18/28 two-line sub, tactile ink CTA + raised white text-only (Quorum b6 recipe),
// and the real product (the AlignUI-grammar Cadence calendar, founder: "product not bad") as a >= 1000 wide frame cut by
// the fold. One accent (violet, the product's own). Owned: the calendar's now-line, hatched focus time, suggested slot.
// No motion. Sample data.
import { ArrowRight } from 'lucide-react'
import Calendar from './Calendar'

const INK = '#111214', SUB = '#5d6168'
const Z = 0.76 // product scale: the 1448-wide app window renders 1100 wide

export default function CadenceHero() {
  return (
    <div style={{ position: 'relative', width: 1440, height: 900, overflow: 'hidden', background: '#f7f7f7', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', fontOpticalSizing: 'auto', color: INK }}>
      <style>{`
        .ch-ink { background: linear-gradient(180deg, #2b2c31 0%, #111214 100%); box-shadow: inset 0 1px 0 rgb(255 255 255 / .16), 0 0 0 1px #0c0d0f, 0 1px 2px rgb(17 18 20 / .24), 0 8px 18px -8px rgb(17 18 20 / .5); color: #fff; }
        .ch-ghost { background: #fff; color: ${INK}; box-shadow: 0 0 0 1px rgb(17 18 20 / .1), 0 1px 2px rgb(17 18 20 / .06); }
      `}</style>
      <div aria-hidden style={{ position: 'absolute', left: 120, right: 120, top: 0, bottom: 0, boxShadow: 'inset 1px 0 0 rgb(17 18 20 / .06), inset -1px 0 0 rgb(17 18 20 / .06)' }} />
      <div aria-hidden style={{ position: 'absolute', left: 121, right: 121, top: 0, bottom: 0, backgroundImage: 'radial-gradient(rgb(17 18 20 / .11) 1px, transparent 1.2px)', backgroundSize: '16px 16px', backgroundPosition: '8px 8px',
        WebkitMaskImage: 'radial-gradient(52% 38% at 50% 30%, transparent 0%, #000 78%)', maskImage: 'radial-gradient(52% 38% at 50% 30%, transparent 0%, #000 78%)' }} />

      <header style={{ position: 'absolute', left: 64, right: 64, top: 0, height: 80, display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em' }}>
          <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden><g fill={INK}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill="#6e3ff3" /></svg>Cadence
        </span>
        <nav style={{ display: 'flex', gap: 32, marginLeft: 48, fontSize: 14, fontWeight: 500, color: SUB }}>
          {['Product', 'Teams', 'Integrations', 'Pricing', 'Changelog'].map((l) => <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}
        </nav>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
          <a href="#" style={{ color: SUB, textDecoration: 'none' }}>Sign in</a>
          <a href="#" style={{ color: INK, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>Start free<ArrowRight size={14} strokeWidth={2} /></a>
        </span>
      </header>

      <main>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 72, fontWeight: 550, lineHeight: 1.04, letterSpacing: '-0.045em' }}>Your Week,<br />Already Arranged</h1>
          <p style={{ margin: '20px 0 0', maxWidth: 620, fontSize: 18, lineHeight: '28px', letterSpacing: '-0.01em', color: SUB }}>Cadence reads every calendar on the invite, protects deep work<br />and settles conflicts before anyone has to ask.</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 10, fontSize: 15, fontWeight: 550 }}>
            <a href="#" className="ch-ink" style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px 0 20px', borderRadius: 12, textDecoration: 'none' }}>Start for free<ArrowRight size={16} strokeWidth={2} style={{ opacity: 0.8 }} /></a>
            <a href="#" className="ch-ghost" style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 20px', borderRadius: 12, textDecoration: 'none' }}>Book a demo</a>
          </div>
        </div>

        <div data-product style={{ position: 'absolute', left: (1440 - 1448 * Z) / 2, top: 520, width: 1448 * Z, height: 900 - 520 + 40, borderRadius: 24, overflow: 'hidden', background: '#fff',
          boxShadow: '0 0 0 1px rgb(17 18 20 / .07), 0 2px 4px rgb(17 18 20 / .04), 0 24px 56px -20px rgb(17 18 20 / .18)' }}>
          <div style={{ zoom: Z, marginLeft: -76, marginTop: -146, width: 1600, height: 1200, pointerEvents: 'none' }}><Calendar /></div>
        </div>
      </main>
    </div>
  )
}
