import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0a0a0f',
        purple: { DEFAULT: '#6c63ff', dark: '#4f46e5' },
        cyan: { DEFAULT: '#00d4ff', dark: '#0891b2' },
        glass: 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px #6c63ff55' },
          '50%': { boxShadow: '0 0 50px #6c63ffaa, 0 0 100px #00d4ff44' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
