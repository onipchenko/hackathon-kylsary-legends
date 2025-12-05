import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative paths so built assets work when opening dist/index.html directly
  base: './',
  plugins: [react()],
})
