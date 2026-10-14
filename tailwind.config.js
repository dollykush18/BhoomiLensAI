/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          700: '#104C3E',
          600: '#176B56',
        },
        sage: {
          100: '#E5F0EA',
        },
      },
    },
  },
  plugins: [],
}

