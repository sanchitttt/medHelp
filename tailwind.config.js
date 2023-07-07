/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        main : 'Inter'
      },
      colors: {
        'green': '#199A8E',
        'black': '#101623',
        'grey': '#717784',
        'lightGrey': '#E5E7EB',
        'whiteGrey': '#F9FAFB',
        'red':'#C82F31'
      },
      boxShadow : {
        'v1' : 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
      }
    },
  },
  plugins: [],
}
