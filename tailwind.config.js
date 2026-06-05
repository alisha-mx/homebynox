/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F5F0E8',
        limestone: '#E8E0D0',
        travertine: '#D4C9B5',
        linen: '#FAF6EF',
        primary: '#5C6B3A',      // olive green
        secondary: '#B85C38',    // terracotta
        ink: '#1C1C1A',
        surface: '#EFEBE1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
