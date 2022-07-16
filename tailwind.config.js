/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {colors: {
      'brand': '#05b851',
      'brand-dark': '#23933f',
      'secondary': '#7494cf',
      'background': '#f8f9fa',
      'background2': '#f1f2f6',
      'secondary-text': '#a2abb3',
      'records': '#8b3745',
      'faraday-night': '#333B47',
      'text2-black': '#536471',

      'brand-highlight': '#f2fcf3',
      'danger-highlight': '#F1FBEF',

      'shadow': '#9ba5a02c',
  
    },},
  },
  plugins: [],
}