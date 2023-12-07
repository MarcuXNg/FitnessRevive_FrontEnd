/* eslint-disable linebreak-style */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // change to false if you want to disable darkmode
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
