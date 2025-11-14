import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'GET' && !req.url?.includes('.') && !req.url?.startsWith('/api')) {
            req.url = '/index.html'
          }
          next()
        })
      },
    },
  ],
})
