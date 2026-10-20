import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Finance from './Finance'
import Clokora from './Clokora'
import Decision from './Decision'
import Search from './Search'
import Calendar from './Calendar'
import EventCard from './EventCard'
import Bento from './Bento'

// replicas: #/finance (AlignUI Transactions); more references are added as routes
const ROUTES: Record<string, () => React.JSX.Element> = { '#/finance': Finance, '#/clokora': Clokora, '#/decision': Decision, '#/search': Search, '#/calendar': Calendar, '#/event': EventCard, '#/bento': Bento }
const View = ROUTES[location.hash] ?? Finance
createRoot(document.getElementById('root')!).render(<StrictMode><View /></StrictMode>)
