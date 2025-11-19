/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed here, though we might use CSS variables or arbitrary values
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // As per plan
      }
    },
  },
  plugins: [],
}
