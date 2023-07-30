import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/static/',
  base: '/static/',
  build: {
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
})
