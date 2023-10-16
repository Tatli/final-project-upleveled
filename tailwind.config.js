/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: '#E4E4E4',
        solana: '#9945FF',
        nav: 'linear-gradient(90deg, rgba(20, 241, 149, 0.15) 3.86%, rgba(20, 241, 149, 0.39) 58.04%, rgba(20, 241, 149, 0.78) 99.94%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      flexBasis: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
