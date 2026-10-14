import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Landing from './Landing'

// #/landing -> the marketing page; anything else -> the dashboard
const page = location.hash.startsWith('#/landing') ? <Landing /> : <App />
createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
