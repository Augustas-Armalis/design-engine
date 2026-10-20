import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Finance from './Finance'

// replicas: #/finance (AlignUI Transactions); more references are added as routes
const ROUTES: Record<string, () => React.JSX.Element> = { '#/finance': Finance }
const View = ROUTES[location.hash] ?? Finance
createRoot(document.getElementById('root')!).render(<StrictMode><View /></StrictMode>)
