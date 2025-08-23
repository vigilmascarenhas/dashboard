/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#006EBB',    // Primary blue
          'light': '#C7E0F0',      // Light blue
          'medium': '#8BC0DE',     // Medium blue
          'dark': '#4398CB',       // Darker blue
          'darkest': '#1E35C1',    // Darkest blue/purple
        }
      }
    },
  },
  plugins: [],
}
