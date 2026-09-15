/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0f172a", soft: "#1e293b" },
        accent: { DEFAULT: "#6366f1", hover: "#4f46e5" },
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: { prose: "72ch" },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: { fadeUp: "fadeUp .6s ease-out forwards" },
    },
  },
  plugins: [],
};
