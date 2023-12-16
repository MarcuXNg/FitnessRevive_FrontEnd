/* eslint-disable linebreak-style */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        // add more custom colors as needed
      },
    },
  },
  darkMode: 'class', // change to false if you want to disable darkmode
  variants: {},
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // This is needed to make the focus styles work correctly
    }),
    require('flowbite/plugin'),
  ],
};
