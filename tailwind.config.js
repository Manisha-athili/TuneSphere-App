/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        primary: '#10b981',
        secondary: '#6b7280',
        background: '#0a0a0a',
        card: '#1f1f1f',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Add this line
}