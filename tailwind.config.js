/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors:{
        background:'#ffffff',
        primary:'#E1251B',
        secondary:'#007580',
        tertiary:'#171616'
      },
      fontFamily:{
        // pnova:['Proxima Nova']
        sans: ['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}
