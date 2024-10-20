/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Gugi'],
        body: ['Oxanium'],
        numeric: ['Orbitron'],
      },
      screens: {
        xs: '500px',
      },
    },
  },
  plugins: [],
};
