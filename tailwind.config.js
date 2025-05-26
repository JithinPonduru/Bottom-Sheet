/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spring-up': 'spring-up 0.5s ease-out forwards',
        'spring-down': 'spring-down 0.5s ease-out forwards',
      },
      keyframes: {
        'spring-up': {
          '0%': { transform: 'translateY(100%)' },
          '60%': { transform: 'translateY(-10%)' },
          '80%': { transform: 'translateY(5%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'spring-down': {
          '0%': { transform: 'translateY(0%)' },
          '60%': { transform: 'translateY(110%)' },
          '80%': { transform: 'translateY(95%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};