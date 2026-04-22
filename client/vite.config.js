import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurace Vite – build nástroj pro React aplikaci
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist", // ✅ To se bude nahrávat na Render
  },
  base: "/",   // ✅ Důležité pro Render
  rollupOptions: {
    output: {
      // ✅ Důležité pro Render (zachová hashované názvy souborů)
      assetFileNames: (assetInfo) => {
        if (assetInfo.name === 'style.css') {
          return 'assets/main.[hash].css';
        }
        return 'assets/[name].[hash][extname]';
      },
      chunkFileNames: 'assets/chunk.[hash].js',
      entryFileNames: 'assets/entry.[hash].js',
    },
  },
})
