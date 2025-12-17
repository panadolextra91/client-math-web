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
        // Neo-brutalism palette (max 4 colors)
        beige: {
          50: "#f9f4e6",  // background
          100: "#f1e6cc", // card
          200: "#e2d3a7", // border
          300: "#e2d3a7", // alias to stay within 4 colors
          400: "#f1e6cc", // alias to stay within 4 colors
          500: "#1b1b1b", // primary text / outlines
          900: "#0c0c0c", // strong text
        },
        green: {
          50: "#e0f2ff",  // subtle accent bg
          300: "#9ad7ff", // hover
          500: "#4fb3ff", // primary accent
          700: "#005fa3", // dark accent
          900: "#003462", // deep accent
        },
        accent: {
          light: "#ffb3c1", // soft pink accent
          DEFAULT: "#ff7b9c", // pink accent
          dark: "#d9436a", // deep pink
        },
        yellow: {
          500: "#ffd447", // highlight
        },
      },
      fontFamily: {
        sans: ["var(--font-bbh)", "system-ui", "sans-serif"],
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

