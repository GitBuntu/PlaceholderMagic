import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'PLACEHOLDER_MAGIC_',
  resolve: {
    alias: {
      '@config': '/config'
    }
  },
  json: {
    stringify: true
  }
})
