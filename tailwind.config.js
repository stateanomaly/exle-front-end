module.exports = {
  mode: 'jit',
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-blue': '#080321',
        black: '#080321',
        dark: '#131B4D',
        primary: '#3E7DFF',
        'body-color': '#B5B3BC',
        'body-color-2': '#637381',
        'input-color': '#B5B3BC',
        'gradient-1': '#E4F2FE',
        'gradient-2': '#FFEEFE',
        'light-bg': '#F5F8FF'
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monaco', 'Courier', 'monospace']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-font-inter')]
}
