/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
      },
      colors: {
        primary: "#f9975d",
        secondary: "#fcf8e8",
        accent: "#a31743",
        green: "#A5D6A7",
      },
    },
  },
  plugins: [],
};
