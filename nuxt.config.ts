export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},  
    },
  },
  pages: true,
  devtools: { enabled: true },
  compatibilityDate: "2025-03-07"
})