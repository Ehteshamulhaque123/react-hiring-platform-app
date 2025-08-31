// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-hiring-platform-app/',  // 👈 matches your repo name
  server: { port: 5173, open: true },
})
