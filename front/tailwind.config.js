module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ".src/Components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#312e81',
        'dark-secondary': '#4f46e5',
        'dark-background': '#111827'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
