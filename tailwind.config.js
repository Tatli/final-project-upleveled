/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // backgroundImage: {
      //   'bg-hero-image': "url('/image/home/hero/hero_cropped.jpg')",
      // },
      maxWidth: {
        '1/4': '25%',
        '1/2': '240px',
        '3/4': '75%',
      },
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
      sm: '320px',
      // => @media (min-width: 320px) { ... }

      md: '640px',
      // => @media (min-width: 640px) { ... }

      lg: '960px',
      // => @media (min-width: 960px) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }

      '2xl': '1888px',
      // => @media (min-width: 1888px) { ... }
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
