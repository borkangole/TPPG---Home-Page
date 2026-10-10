import type { Config } from "tailwindcss";

// Palette matches the TPPG Portal landing page: near-black surfaces + orange accent.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0C", // page background
          800: "#121214", // raised panels
          700: "#18181B", // cards
          600: "#232327", // inputs / hover
        },
        brand: {
          DEFAULT: "#F97316", // Portal orange
          hover: "#EA580C",
          soft: "#FDBA74",
        },
      },
      fontFamily: {
        sans: ['"DM Sans Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Fraunces Variable"', "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        site: "76rem",
      },
      screens: {
        // Short viewports (laptops): used to tighten the full-property overlay so it fits without scrolling.
        short: { raw: "(max-height: 900px)" },
      },
    },
  },
  plugins: [],
};

export default config;
