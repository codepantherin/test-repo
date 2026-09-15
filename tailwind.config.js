/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#05060a", soft: "#0b0e17", line: "#1b2030" },
        cream: "#f7f7f5",
        accent: { DEFAULT: "#7c5cff", hover: "#9d86ff" },
        glow: { DEFAULT: "#38f0c0", alt: "#ff5c8a" },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: { prose: "68ch" },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(28px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(-8px)" },
          "50%": { transform: "translateY(8px)" },
        },
        aurora: {
          "0%,100%": { transform: "translate3d(-6%,0,0) scale(1)" },
          "50%": { transform: "translate3d(6%,-4%,0) scale(1.15)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        fadeUp: "fadeUp .7s cubic-bezier(.22,1,.36,1) forwards",
        floatY: "floatY 6s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        spinSlow: "spinSlow 22s linear infinite",
      },
    },
  },
  plugins: [],
};
