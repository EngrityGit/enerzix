import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
            gridTemplateRows: {
        '0': '0fr',
        '1': '1fr',
      },
      colors: {
        brand: {
          DEFAULT: '#005FFF',
          dark: '#0047C2',
          light: '#3D82FF',
        },
        ink: '#05070D',
        paper: '#FBFCFE',
        mist: '#EEF2F8',
        slate: '#5B6472',
        foam: '#D8E8FF',
        depth: '#001433',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.28em',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'ripple-out': {
          '0%': { transform: 'scale(0)', opacity: '0.55' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'wave-drift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
                shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'ripple-out': 'ripple-out 0.7s ease-out forwards',
        'wave-drift': 'wave-drift 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [ require('@tailwindcss/typography'),],
};

export default config;
