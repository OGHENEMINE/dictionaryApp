/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        vollkorn:[ 'Vollkorn', 'serif'],
        alkatra:['Alkatra', 'cursive'],
        poppins: [  'Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}