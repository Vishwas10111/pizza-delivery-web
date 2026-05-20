import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3301,
    // Proxy ALL /api requests to backend — this avoids CORS entirely in development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Rewrite not needed since backend routes start with /api
      }
    }
  }
})
