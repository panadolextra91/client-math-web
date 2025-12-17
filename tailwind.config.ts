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
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

