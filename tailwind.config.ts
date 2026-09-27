/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins_regular: ['Poppins-Regular', 'sans-serif'],
        poppins_medium: ['Poppins-Medium', 'sans-serif'],
        poppins_semibold: ['Poppins-SemiBold', 'sans-serif'],
        poppins_bold: ['Poppins-Bold', 'sans-serif'],
        poppins_black: ['Poppins-Black', 'sans-serif'],

        newsreader_regular: ['Newsreader-Regular', 'sans-serif'],
        newsreader_medium: ['Newsreader-Medium', 'sans-serif'],
        newsreader_semibold: ['Newsreader-SemiBold', 'sans-serif'],
        newsreader_bold: ['Newsreader-Bold', 'sans-serif'],
      },
      colors: {
        background: '#eff6ff',
        text: '#1e3a8a',
        primary: '#3b82f6',
      }
    },
  },
  plugins: [],
};
