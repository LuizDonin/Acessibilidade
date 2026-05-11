/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'hwtArtz': ['hwt-artz', 'sans-serif'],
        // Corpo do livro: respeita --book-font-body (acessibilidade)
        'ubuntu': [
          'var(--book-font-body)',
          'Ubuntu',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

