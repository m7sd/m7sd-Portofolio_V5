import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/m7sd-Portofolio_V5/',   // 👈 MUST match your GitHub repo name exactly
})
