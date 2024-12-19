/**import VueGoogleMaps from '@fawmi/vue-google-maps'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCYXPwtGgKz81VY8xCcE8JXnkfkSnAOMzU',
      libraries: 'places' // This is required if you use the Autocomplete plugin
    },
    autobindAllEvents: true
  })
})
 */
