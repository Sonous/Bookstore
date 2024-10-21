/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          fontFamily: {
              body: ['Nunito'],
          },
          colors: { 'primary-color': '#C92127', 'main-bg-color': '#f0f0f0', 'outside-menu-bg': 'rgba(0, 0, 0, 0.7)' },
          maxWidth: { 'main-width': '1300px' },
      },
  },
  plugins: [],
};
