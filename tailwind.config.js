// ❌ remove this line
// import type { Config } from 'tailwindcss'

module.exports = {
    content: [
      './src/app/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            DEFAULT: '#0F766E',
            dark: '#115E59',
            light: '#14B8A6'
          }
        },
        boxShadow: {
          soft: '0 10px 30px rgba(0,0,0,0.08)'
        }
      }
    },
    plugins: []
  }
  