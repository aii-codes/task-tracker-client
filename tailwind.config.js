/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🌙 Enables manual dark mode toggling

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // 🌤 Light Theme
        primary: {
          light: "#60a5fa",   // light blue
          DEFAULT: "#3b82f6", // main blue
          dark: "#1e40af",    // deep navy
        },
        background: {
          light: "#f1f5f9",   // light bluish-gray
          DEFAULT: "#e2e8f0", // slightly darker background
          dark: "#0f172a",    // 🌙 dark mode background (slate-900)
        },
        surface: {
          light: "#ffffff",   // card background (light)
          dark: "#1e293b",    // card background (dark)
        },
        text: {
          light: "#111827",   // dark gray (light mode)
          dark: "#f9fafb",    // white-ish (dark mode)
        },
        success: {
          DEFAULT: "#22c55e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },

  plugins: [],
};
