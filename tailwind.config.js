/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cool Blue Theme 🌊
        primary: {
          light: "#60a5fa",   // light blue for hover
          DEFAULT: "#3b82f6", // main blue (buttons, navbar)
          dark: "#1e40af",    // deep navy for emphasis
        },
        background: {
          light: "#f1f5f9",   // soft bluish-gray background
          DEFAULT: "#e2e8f0", // page background
        },
        success: {
          DEFAULT: "#22c55e", // green for completed tasks
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
