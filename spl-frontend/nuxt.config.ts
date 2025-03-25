// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  debug: true,
  css: ["~/assets/css/main.css" , "~/assets/css/tailwind.css"],
  pages: true,
  extensions: ['js', 'ts', 'vue'],
  extends: [
    "./layers/admin",
    "./layers/user"
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    "@pinia/nuxt",
    "@prisma/nuxt"
  ],
})