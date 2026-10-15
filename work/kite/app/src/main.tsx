import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Landing from './Landing'
import Showcase from './Showcase'

// #/landing -> the marketing page; anything else -> the dashboard
const page = location.hash.startsWith('#/landing') ? <Landing /> : location.hash.startsWith('#/showcase') ? <Showcase /> : <App />
createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
