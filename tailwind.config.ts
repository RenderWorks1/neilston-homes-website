import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: '#C47A2A',
          dark: '#A8651F',
          light: '#D49A54',
        },
        charcoal: '#4A4A4A',
        'grey-dark': '#333333',
        'grey-mid': '#808080',
        'grey-light': '#F5F5F5',
        'border-grey': '#D9D9D9',
        status: {
          available: '#4CAF50',
          'under-offer': '#FF9800',
          sold: '#F44336',
        },
        'red-placeholder': '#E53935',
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
      letterSpacing: {
        nav: '0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
