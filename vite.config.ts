import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: "/spin_the_wheel/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/styles.css";`,
      },
    },
  },
})