/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        display: ['Zen Kaku Gothic New', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
