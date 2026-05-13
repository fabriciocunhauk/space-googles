/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0B0D17',
        'deep-space': '#0B0D17',
        'nebula-blue': '#D0D6F9',
        'stardust': '#FFFFFF',
        'accent-gold': '#FFD700', // Adding a gold accent for success/highlights
      },
      fontFamily: {
        'Bellefair': ['Bellefair', 'sans-serif'],
        'Barlow': ['Barlow', 'sans-serif'],
        'Barlow-Condensed': ['Barlow Condensed', 'sans-serif']
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
