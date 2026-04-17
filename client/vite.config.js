import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurace Vite – build nástroj pro React aplikaci
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
