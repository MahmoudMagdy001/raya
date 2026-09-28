import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/')
          if (normalized.includes('/node_modules/')) {
            if (normalized.includes('/@tiptap/') || normalized.includes('/prosemirror')) {
              return 'vendor-tiptap'
            }
            if (normalized.includes('/@supabase/')) {
              return 'vendor-supabase'
            }
            if (normalized.includes('/lucide-react/')) {
              return 'vendor-lucide'
            }
            if (
              normalized.includes('/react/') ||
              normalized.includes('/react-dom/') ||
              normalized.includes('/react-router/') ||
              normalized.includes('/react-router-dom/')
            ) {
              return 'vendor-react'
            }
          }
        }
      }
    }
  }
})
