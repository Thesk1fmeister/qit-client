import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    // container: {
    //   center: true,
    //   padding: '2rem',
    // },
    screens: {
      sm: { max: '640px', min: '0px' },
      md: { max: '1023px', min: '640px' },
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      outline: {
        none: ['focus'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          red: '#F54848',
          black: '#000000',
        },
        secondary: {
          yellow: '#FAE19D',
          lightYellow: '#FDF3D8',
          lightRed: '#FDF1EA',
          red: '#F9DCCB',
          black: '#232323',
          blue: '#DCDCF9',
          white: '#F5F5F5',
          lightGreen: '#E6F3E6',
          darkGreen: '#307E3E',
          whiteBackground: '#FDFDFD',
          dark: '#25262B',
          'light-grey': '#CBCBCB',
          'site-grey': '#ADAFB3',
          'black-blue': '#2C3539',
        },
        system: {
          error: '#EE5555',
          submit: '#CCEDD2',
          primary: '#1865C3',
        },
        gray: {
          50: '#1865C3',
          100: '#D9D9D9',
          150: '#E9ECEF',
          200: '#BCBCBC',
          250: '#EFEFEF',
          300: '#8B8B8B',
          350: '#FAFAFA',
          400: '#707070',
          500: '#6B6B6B',
          600: '#353535',
          700: '#4D4D4E',
        },
      },
      borderRadius: {
        md: '4px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
