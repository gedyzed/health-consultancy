// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://healthconsultationapplicaton-backend-production-362c.up.railway.app',
        changeOrigin: true,
        // No rewrite needed since backend expects /api/signUp
      }
    }
  }
});