// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr: true,

  runtimeConfig: {

    public: {}
  },

  css: [
    "@/assets/scss/public/public.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/public/_imports.scss" as *;'
        }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "fa",
        dir: "rtl",
      },
      title: "نام سایت",
      meta: [
        {charset: "utf-8"},
        {"http-equiv": "X-UA-Compatible", content: "IE=edge"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {name: "author", content: ""},
        {name: "robots", content: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"},
        {hid: "description", name: "description", content: ""},
        {
          hid: "keywords",
          name: "keywords",
          content: "",
        },
        {name: "theme-color", content: "#fafafa"},
      ],
      link: [],
      script: [],
      bodyAttrs: {},
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icons',
    'nuxt-simple-robots',
    ['@funken-studio/sitemap-nuxt-3', {generateOnBuild: true}],
  ],

  // sitemap: {
  //   hostname: 'https://amadast.com',
  //   cacheTime: 1,
  //   defaults: {
  //     changefreq: 'daily',
  //     priority: 1,
  //     lastmod: new Date().toISOString(),
  //   },
  // },
})
