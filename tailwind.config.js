/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/home1.webp')",
        'home-blur': "url('/public/dot.png')"
      },
    },
  },
  plugins: [],
};

