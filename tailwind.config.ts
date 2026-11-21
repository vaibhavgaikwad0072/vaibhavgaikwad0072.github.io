import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04050c',
          900: '#070915',
          800: '#0b0e1d',
          700: '#11152a',
          600: '#191f3b',
        },
        electric: {
          100: '#e8eeff',
          200: '#cfdcff',
          300: '#9db6ff',
          400: '#6f8cff',
          500: '#4c6fff',
          600: '#3454e0',
        },
        violet: {
          100: '#f5f3ff',
          200: '#ede9fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(124, 58, 237, 0.45)',
        'glow-sm': '0 0 32px -8px rgba(111, 140, 255, 0.55)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px -24px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 3.2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
