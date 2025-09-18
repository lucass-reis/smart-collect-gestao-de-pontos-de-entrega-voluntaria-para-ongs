import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar as funções de teste globais como `describe`, `test`, etc.
    environment: 'jsdom', // Define o ambiente de teste (simula o DOM no Node.js)
    setupFiles: [], // Se precisar de algum arquivo de configuração global
  },
})
