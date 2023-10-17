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
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7dd3fc',

          secondary: '#d926a9',

          accent: '#1fb2a6',

          neutral: '#2a323c',

          'base-100': '#1d232a',

          info: '#3abff8',

          success: '#36d399',

          warning: '#fbbd23',

          error: '#f87272',
        },
      },
    ],
  },
};
