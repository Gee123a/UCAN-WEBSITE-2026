/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Only enable dark mode via explicit .dark class on <html> — OS dark mode is ignored

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#fceaa9',
          400: '#f9d366',
          500: '#f0b72a',
          600: '#d99216',
        },
        parchment: {
          DEFAULT: '#F4E7CB',
          light: '#F9F1E0',
          dark: '#E8D9B5',
        },
        brand: {
          green: {
            DEFAULT: '#0B3A0A', // Deep forest green
            accent: '#4C7A1A',  // Lighter accent green
          },
          orange: {
            DEFAULT: '#D96A1D', // Original orange
            dark: '#A64D14',    // Darker accessible orange
          },
          red: {
            DEFAULT: '#C93A1D',
            dark: '#8B2815',
          },
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        blackletter: ['UnifrakturMaguntia', 'cursive'],
        'eb-garamond': ['EB Garamond', 'serif'],
        script: ['Mrs Saint Delafield', 'cursive'],
        lora: ['Lora', 'serif'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'meteor': 'meteor 5s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-1000px)", opacity: "0" },
        }
      }
    },
  },
  plugins: [],
}
