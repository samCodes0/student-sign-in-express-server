import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {  // making sure than any requests sent to /api uses the express server
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
