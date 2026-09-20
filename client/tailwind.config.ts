import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f8',
          500: '#6b7280',
          700: '#374151',
          900: '#111827',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f9fafb',
        },
        accent: {
          DEFAULT: '#ff6b35',
          50: '#fff3ee',
          100: '#ffe4d6',
          500: '#ff6b35',
          600: '#e85a24',
          700: '#c44a1c',
        },
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        '2xl': '1rem',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
};

export default config;
