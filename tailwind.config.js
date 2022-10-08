/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {colors: {
      'brand': '#05b851',
      'brand-dark': '#2C974B',
      'faraday-night': '#333B47',
      'night-secondary': '#6C757D',
      'outline': '#ECECF0',
      'secondary': '#7494cf',
      'background': '#f8f9fa',
      'background2': '#f1f2f6',
      'secondary-text': '#a2abb3',
      'records': '#8b3745',
      'text2-black': '#536471',
      'danger': "#F91880",

      'brand-highlight': '#F1FBEF',
      'danger-highlight': '#FBEFF5',
      'hover': '#FAFAFA',

      'shadow': '#9ba5a02c',
  
    },},
  },
  plugins: [],
}