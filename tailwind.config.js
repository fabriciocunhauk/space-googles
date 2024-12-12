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
      },
      fontFamily: {
      'Bellefair': ['Bellefair', 'sans-serif',],
      'Barlow': ['Barlow', 'sans-serif',],
      'Barlow-Condensed': ['Barlow Condensed', 'sans-serif', ]
    }
    },
  },
  plugins: [],
}
