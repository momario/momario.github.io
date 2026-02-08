import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './',   // build directly to current folder
    emptyOutDir: false, // don’t delete src/ or public/
  },
  base: './',       // relative paths for assets
})
