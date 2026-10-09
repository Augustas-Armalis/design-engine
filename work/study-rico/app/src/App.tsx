// Recreation study (private): screens by rico (@_heyrico), rebuilt 1:1 to learn his product-UI craft.
import Analytics from './screens/Analytics'
import Wallet from './screens/Wallet'

export default function App() {
  const s = new URLSearchParams(location.search).get('s') ?? 'analytics'
  return s === 'wallet' ? <Wallet /> : <Analytics />
}
