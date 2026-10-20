import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Hero'
import Post from './Post'

// #/post -> the square post, anything else -> the hero
const View = location.hash === '#/post' ? Post : Hero
createRoot(document.getElementById('root')!).render(<StrictMode><View /></StrictMode>)
