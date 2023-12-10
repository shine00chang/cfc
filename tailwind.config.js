/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {},
  },
  daisyui: { 
    themes: [ "cupcake" ]
  },
  plugins: [require("daisyui")],
}
