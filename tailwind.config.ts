import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        ink: {
          950: "#05070d",
          900: "#0a0e17",
          850: "#0d1220",
          800: "#111827",
          700: "#1c2333",
          600: "#2a3245",
          500: "#4b5468",
        },
        paper: {
          50: "#fbfbfd",
          100: "#f4f5f8",
          200: "#e9ebf1",
        },
        accent: {
          DEFAULT: "#4f7cff",
          light: "#7c9dff",
          dark: "#3a5fe0",
          teal: "#22d3c9",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, #e9ebf1 1px, transparent 1px), linear-gradient(to bottom, #e9ebf1 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, #ffffff0d 1px, transparent 1px), linear-gradient(to bottom, #ffffff0d 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(79,124,255,0.16) 0%, rgba(79,124,255,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(79,124,255,0.15), 0 8px 30px -8px rgba(79,124,255,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
