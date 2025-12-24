import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 🔥 ОБЯЗАТЕЛЬНО ДЛЯ VERCEL
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
