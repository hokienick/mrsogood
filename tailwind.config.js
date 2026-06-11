/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#1A1410',
        chalk:  '#F7F6F3',
        navy:   '#2B3A52',
        sand:   '#8B6F47',
        coral:  '#E86B3A',
        'coral-dark': '#C4552A',
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        body:    ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        'fluid-xl':  ['clamp(3.5rem, 8vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'fluid-lg':  ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'fluid-md':  ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
