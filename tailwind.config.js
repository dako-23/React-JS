/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "url('/home1.webp')",
        'page-pattern': "url('/dot.png')"
      },
    },
  },
  plugins: [],
};

