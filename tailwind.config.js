/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        display: ['Zen Kaku Gothic New', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          dark: '#000000',
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'marquee': 'marquee 60s linear infinite',
        'marquee2': 'marquee2 60s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'slide-right': 'slide-right 1s ease-out forwards',
        'text-reveal': 'text-reveal 1s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee2': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-right': {
          'from': { 
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'text-reveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
    },
  },
  plugins: [],
};
