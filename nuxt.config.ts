// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          hid: 'og:site_name', name: 'og:site_name', content: 'ExRide'
        },
        {
            hid: 'og:description', name: 'og:description', content: 'We Help Buy and Sell Cars Privately.'
        },
        {
            hid: 'og:type', name: 'og:type', content: 'website'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/exride_favicon.png' }
      ],
    }
  },

  modules: ['@pinia/nuxt'],

  // scripts: [
  //   {
  //     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYXPwtGgKz81VY8xCcE8JXnkfkSnAOMzU&libraries=places"
  //   }
  // ]
  build: {
    transpile: ["@fawmi/vue-google-maps"],
  },

  compatibilityDate: '2024-10-01'
})