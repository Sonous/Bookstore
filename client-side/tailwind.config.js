/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                body: ['Nunito'],
            },
            colors: { 'primary-color': '#C92127' },
        },
    },
    plugins: [],
};
