import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // Alur interaksi panjang (10 soal kuis, 4 langkah wizard) dengan komponen
    // React Aria/HeroUI bisa melewati 5 dtk saat semua file jalan paralel.
    testTimeout: 20000,
  },
})
