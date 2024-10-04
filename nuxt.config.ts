// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  components: true,
  runtimeConfig: {
    public: {
      Access_Key: process.env.UNSPLASH_ACCESS_KEY
    }
  },
  css: [
    "~/assets/css/fonts.css",
    "~/assets/css/main.css"
  ]
})
