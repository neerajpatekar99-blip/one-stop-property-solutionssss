/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#C5A880", // Royal Champagne Gold
          dark: "#A38558",
          darker: "#7E6438",
          light: "#F7F3EB",
          lighter: "#FDFBF7",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB",
          dark: "#AA820A",
        },
        navy: {
          DEFAULT: "#0A1128", // Deep Royal Midnight Navy
          950: "#050814",
          900: "#0A1128",
          800: "#121D3D",
          700: "#1D2B56",
          600: "#32447A",
          500: "#5065A1",
          400: "#8699C9",
          300: "#B8C5E4",
          200: "#CCD6ED",
          100: "#E2E8F5",
          50: "#F0F4FA",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          dark: "#F0ECE1",
        },
      },
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        pulse_slow: "pulse 3s infinite",
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
      },
    },
  },
  plugins: [],
};
