import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const version:number=1.0
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash]-'+version+'.js',
        entryFileNames: 'static/js/[name]-[hash]-'+version+'.js',
        assetFileNames: 'static/[ext]/[name]-[hash]-'+version+'.[ext]',
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, 'api')
      },
    }
  }
})
