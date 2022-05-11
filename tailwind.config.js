module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    colors: {
      burntOrange: '#EE4E34',
      peach: '#fcedda',
    },
    extend: {
      fontFamily: {
        sans: ['Libre Baskerville', 'serif'],
        header: ['Courgette', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
