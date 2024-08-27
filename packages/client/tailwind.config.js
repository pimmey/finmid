/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        commissioner: ['Commissioner', 'sans-serif'],
      },
      boxShadow: {
        input: '1px 2px 4px 0px #26323829 inset',
      },
      colors: {
        text: {
          neutral: '#2C2E36',
          info: '#004050',
          weak: '#3D404A',
          danger: '#A21646',
        },
        ducky: {
          strong: '#00718D',
          weak: '#C5C7CF',
          light: '#CCEBEE',
          DEFAULT: '#008290',
          dark: '#004050',
          danger: '#FCDAD7',
        },
      },
    },
  },
  plugins: [],
};
