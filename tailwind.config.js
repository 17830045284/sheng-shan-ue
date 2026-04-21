import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      textShadow: {
        black: '0px 2px 4px #00000080',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
