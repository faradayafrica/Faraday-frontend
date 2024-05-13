/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-gradient": {
          border:
            "linear-gradient(to right, rgba(19, 5, 184, 1), rgba(14, 131, 75, 1), rgba(9, 201, 91, 1))",
        },
        brand: "#05b851",
        "brand-dark": "#2C974B",
        "faraday-night": "#333B47",
        "faraday-night-hover": "#1F232B",
        "night-secondary": "#6C757D",
        outline: "#ECECF0",
        secondary: "#7494cf",
        background: "#f8f9fa",
        background2: "#f1f2f6",
        "secondary-text": "#a2abb3",
        records: "#8b3745",
        "text2-black": "#536471",
        danger: "#FF5B5B",

        "brand-highlight": "#F1FBEF",
        "danger-highlight": "#FBEFF5",
        hover: "#FAFAFA",

        shadow: "#9ba5a02c",
      },
    },
  },
  plugins: [],
};
