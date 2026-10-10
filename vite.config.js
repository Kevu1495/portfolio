import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For a project site at username.github.io/repository-name/, set BASE_PATH
// in GitHub Actions to /repository-name/. Root user sites should use '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
