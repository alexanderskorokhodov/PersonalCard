import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // maplibre-gl ships as a single large module. Keep the warning threshold
    // above its bundle size instead of forcing manual splits that can create
    // cyclic runtime chunks with react-map-gl under Rolldown.
    chunkSizeWarningLimit: 1100,
  },
})
