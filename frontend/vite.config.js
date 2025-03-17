import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // ✅ Allow access from any local network
    proxy: {
      '/api': {
        target: 'http://localhost:5174', // ✅ Local backend
        changeOrigin: true,
        secure: false, // ✅ No need for HTTPS locally
      },
    },
  },
})