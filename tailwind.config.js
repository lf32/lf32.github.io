/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.blue.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            'code::before, code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              color: theme('colors.gray.700'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            'thead th': {
              color: theme('colors.gray.900'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 