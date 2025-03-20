export default defineNuxtConfig({
    ssr: true,
    sourcemap: true,

    runtimeConfig: {
        APP_VERSION: process.env.NUXT_APP_VERSION ?? '1',
        API_BASE_URL: process.env.NUXT_API_BASE_URL ?? 'https://api.taminify.com/api/v1/',
        SITE_URL: process.env.NUXT_SITE_URL ?? 'https://taminify.com',
        PANEL_URL: process.env.NUXT_PANEL_URL ?? 'https://panel.taminify.com',
        public: {
            APP_VERSION: process.env.NUXT_APP_VERSION ?? '1',
            API_BASE_URL: process.env.NUXT_API_BASE_URL ?? 'https://api.taminify.com/api/v1/',
            SITE_URL: process.env.NUXT_SITE_URL ?? 'https://taminify.com',
            PANEL_URL: process.env.NUXT_PANEL_URL ?? 'https://panel.taminify.com',
        }
    },

    experimental: {
        inlineRouteRules: true
    },

    devtools: {
        enabled: false
    },

    css: [
        "@/assets/scss/public/public.scss",
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/public/_imports.scss" as *;',
                    api: 'modern-compiler',
                }
            }
        }
    },

    app: {
        head: {
            htmlAttrs: {
                lang: "fa-IR",
                dir: "rtl",
                translate: "no",
            },
            meta: [
                {charset: "utf-8"},
                {"http-equiv": "X-UA-Compatible", content: "IE=edge"},
                // {"http-equiv": "Content-Security-Policy", content: "default-src 'self'; img-src https://*; child-src 'none';"},
                {name: "author", content: "taminify.com"},
                {
                    name: "robots",
                    content: process.env.NUXT_IS_DEV !== "1" ? "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" : "noindex"
                },
                {
                    name: "description",
                    content: "پلتفرم تخصصی دراپ شیپینگ"
                },
                {
                    name: "keywords",
                    content: "",
                },
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {name: "format-detection", content: "telephone=no"},
                {
                    name: 'apple-mobile-web-app-title',
                    content: 'Taminify'
                }
            ],
            link: [
                {rel: "canonical", href: "https://taminify.com"},
                {
                    "type": "image/png",
                    "href": "/favicon/favicon-96x96.png",
                    "sizes": "96x96"
                },
                {
                    "type": "image/svg+xml",
                    "href": "/favicon/favicon.svg"
                },
                {
                    "href": "/favicon/favicon.ico",
                    "rel": "shortcut icon"
                },
                {
                    "href": '/favicon/site.webmanifest',
                    "rel": 'manifest',
                },
                // {rel: "preload", href: "/_nuxt/assets/fonts/Estedad-FD.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous"},
            ],
            __dangerouslyDisableSanitizers: ["script", "iframe", "noscript"],
            script: [
                {
                    type: "application/ld+json",
                    innerHTML: `
          {
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "تامینیفای",
              "url": "https://taminify.com/",
              "potentialAction": {
                  "@type": "SearchAction",
                  "target": "{search_term_string}",
                  "query-input": "required name=search_term_string"
              }
          }`,
                },
                ...(process.env.NUXT_IS_DEV !== "1" ? [
                    // TODO:
                    // {
                    //   async: true,
                    //   src: "https://www.googletagmanager.com/gtag/js?id=G-TPMGY1FDV3",
                    // },
                    // {
                    //   innerHTML: `
                    //     <!-- Start Google Tag Manager -->
                    //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    //     })(window,document,'script','dataLayer','GTM-P3CTBNN');
                    //     <!-- End Google Tag Manager -->
                    //   `,
                    // },
                    // {
                    // innerHTML: `
                    //   window.dataLayer = window.dataLayer || [];
                    //   function gtag() { dataLayer.push(arguments); }
                    //   gtag('js', new Date());
                    //   gtag('config', 'G-TPMGY1FDV3');
                    // `,
                    // },
                    // {
                    //             innerHTML: `
                    //   !function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-zTNYvT0Y"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/zTNYvT0Y/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
                    // `,
                    // },
                    //         {
                    //             body: true,
                    //             innerHTML: `
                    //   (function(c,l,a,r,i,t,y){
                    //     c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    //     t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    //     y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    //   })(window, document, "clarity", "script", "h17y6r6zto");
                    // `,
                    //         }
                ] : []),
            ],
        },
        pageTransition: process.env.NUXT_IS_DEV !== "1" ? {name: 'page', mode: 'out-in'} : {}
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/sitemap',
        'nuxt-icons',
        'nuxt-simple-robots',
        '@element-plus/nuxt',
    ],

    site: {
        indexable: process.env.NUXT_IS_DEV !== "1",
        url: 'https://taminify.com',
        trailingSlash: false,
    },

    sitemap: {

        sitemaps: {
            pages: {
                includeAppSources: true,
            },
        }
    },

    robots: {
        disallow: [],
    },

    compatibilityDate: "2024-10-14"
})
