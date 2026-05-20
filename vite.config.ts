import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  server: {
    port: 5175,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3003',
        changeOrigin: true,
      },
    },
  },
})
