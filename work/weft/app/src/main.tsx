import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Hero'
import Post from './Post'
import Lab from './Lab'
import Marcel from './Marcel'

// #/post -> the square post, #/lab -> field variants, anything else -> the hero
const View = location.hash === '#/post' ? Post : location.hash === '#/lab' ? Lab : location.hash === '#/marcel' ? Marcel : Hero
createRoot(document.getElementById('root')!).render(<StrictMode><View /></StrictMode>)
