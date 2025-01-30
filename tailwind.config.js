/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        lemon: "#E1C994",
        tomato: "#BF0200",
        grout: "#E4E3E4",
        beige: "#F5F5DC",
        gold: "#FFD700",
        green: "#A5D6A7",
      },
    },
  },
  plugins: [],
};
