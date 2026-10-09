import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// base './' so dist/index.html renders from file:// (no dev server to leave running)
export default defineConfig({ base: './', plugins: [react()] })
