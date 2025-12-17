import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral beige palette
        beige: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#ebe7e0",
          300: "#ddd6cc",
          400: "#c9bfb0",
          500: "#b5a894",
          600: "#9d8f78",
          700: "#827562",
          800: "#6b5f50",
          900: "#574d42",
        },
        // Refreshing green palette
        green: {
          50: "#f0f9f4",
          100: "#dcf2e3",
          200: "#bce5cc",
          300: "#8fd1a8",
          400: "#5bb57d",
          500: "#3a9b5f",
          600: "#2b7d4c",
          700: "#24643e",
          800: "#205034",
          900: "#1c422c",
        },
        // Accent colors
        accent: {
          light: "#8fd1a8",
          DEFAULT: "#5bb57d",
          dark: "#3a9b5f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

