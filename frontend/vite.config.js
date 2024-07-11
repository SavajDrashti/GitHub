import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy: {
      "/api" : {
        target:"http://localhost:5000",     //whenver we call this api just prefix it with this http
      }
    }
  }
})
