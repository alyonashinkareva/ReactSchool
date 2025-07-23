import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // чтобы Vite слушал не только localhost
    host: '0.0.0.0',
    // разрешаем запросы с вашего домена
    allowedHosts: ['reactschool.site', 'localhost']
  }
  // ...остальная конфигурация
})
