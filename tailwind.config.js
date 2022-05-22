module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'main-orange': '#f5ce32',
        'main-blue': '#92DCE5',
      },
      backgroundImage: {
        'hero-pattern': "url('/public/background.png')",
      },
    },
  },
  plugins: [],
};
