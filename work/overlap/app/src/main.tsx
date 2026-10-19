import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Hero'
import Card from './Card'

// #/card -> the post card, anything else -> the hero
const View = location.hash === '#/card' ? Card : Hero
createRoot(document.getElementById('root')!).render(<StrictMode><View /></StrictMode>)
