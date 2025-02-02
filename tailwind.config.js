/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecf1f3",
          100: "#d8e3e8",
          200: "#b1c7d1",
          300: "#8babb9",
          400: "#648fa2",
          500: "#3d738b",
          600: "#315c6f",
          700: "#2b5161",
          800: "#1f3a46",
          900: "#12232a",
          950: "#0c171c",
        },
        accent: {
          50: "#f8ede7",
          100: "#f1dbcf",
          200: "#e3b89e",
          300: "#d4946e",
          400: "#c6713d",
          500: "#b84d0d",
          600: "#933e0a",
          700: "#813609",
          800: "#5c2707",
          900: "#371704",
          950: "#250f03",
        },
      },
    },
  },
  plugins: [],
};
