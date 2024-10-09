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
          hid: 'description', name: 'description', content: 'The questions and photos MintList needs to show your car to 100s of interested and vetted buyers.'
        },
        {
          hid: 'keywords', name: 'keywords', content: 'add, your, keywords, here',
        },
        {
          hid: 'og:site_name', name: 'og:site_name', content: 'MintList'
        },
        {
            hid: 'og:title', name: 'og:title', content: 'MintList - Auction Onboarding Process'
        },
        {
            hid: 'og:description', name: 'og:description', content: 'The questions and photos MintList needs to show your car to 100s of interested and vetted buyers.'
        },
        {
            hid: 'og:image', name: 'og:image', content: 'https://cdn.mintlist.com/consumer/onboarding-thumbnail.png'
        },
        {
            hid: 'og:type', name: 'og:type', content: 'website'
        },
      ],
      // link: [
      //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      // ],
    }
  },

  modules: ['@pinia/nuxt', 'nuxt-auth-utils'],

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