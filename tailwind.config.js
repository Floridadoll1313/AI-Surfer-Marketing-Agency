/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-cyan": "#00faff",
        "neon-pink": "#ff4dff",
        "neon-green": "#4dff88",
      },
    },
  },
  plugins: [],
};