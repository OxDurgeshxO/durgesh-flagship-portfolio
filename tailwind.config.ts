import type { Config } from 'tailwindcss'

/**
 * Resolve a token declared in styles/globals.css as an alpha-capable colour.
 * Bare RGB channels + <alpha-value> is what lets opacity modifiers such as
 * `border-border/80`, `bg-primary/10` and `bg-card/50` compile correctly.
 */
const token = (channel: string) => `rgb(var(${channel}) / <alpha-value>)`

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0b0914',
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          DEFAULT: '#a855f7',
          dark: '#9333ea',
        },
        cyan: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          DEFAULT: '#f43f5e',
          dark: '#e11d48',
        },
        glass: 'rgba(255,255,255,0.05)',

        /* --- Semantic tokens (declared in styles/globals.css) -------------
           These back the bg-card / border-border / text-muted-foreground /
           text-foreground / bg-primary / ring-primary utilities that ~200
           component usages already reference. They previously resolved to
           nothing, which is why dark routes rendered browser-default white
           form controls. Values stay bound to the existing palette. */
        background: token('--background-rgb'),
        foreground: token('--foreground-rgb'),
        card: { DEFAULT: token('--card-rgb'), foreground: token('--card-foreground-rgb') },
        popover: { DEFAULT: token('--popover-rgb'), foreground: token('--popover-foreground-rgb') },
        primary: { DEFAULT: token('--primary-rgb'), foreground: token('--primary-foreground-rgb') },
        secondary: { DEFAULT: token('--secondary-rgb'), foreground: token('--secondary-foreground-rgb') },
        muted: { DEFAULT: token('--muted-rgb'), foreground: token('--muted-foreground-rgb') },
        accent: { DEFAULT: token('--accent-rgb'), foreground: token('--accent-foreground-rgb') },
        destructive: { DEFAULT: token('--destructive-rgb'), foreground: token('--destructive-foreground-rgb') },
        border: token('--border-rgb'),
        input: token('--input-rgb'),
        ring: token('--ring-rgb'),
        chart: {
          1: token('--chart-1-rgb'),
          2: token('--chart-2-rgb'),
          3: token('--chart-3-rgb'),
          4: token('--chart-4-rgb'),
          5: token('--chart-5-rgb'),
        },
        sidebar: {
          DEFAULT: token('--sidebar-rgb'),
          foreground: token('--sidebar-foreground-rgb'),
          primary: { DEFAULT: token('--sidebar-primary-rgb'), foreground: token('--sidebar-primary-foreground-rgb') },
          accent: { DEFAULT: token('--sidebar-accent-rgb'), foreground: token('--sidebar-accent-foreground-rgb') },
          border: token('--sidebar-border-rgb'),
          ring: token('--sidebar-ring-rgb'),
        },

        /* slate.500 is this project's muted body/meta text token (22 usages).
           Tailwind's default #64748b measures 3.86-4.17 against these dark
           surfaces — under the 4.5 AA threshold, and the single largest source
           of measured axe violations. #7b8a9e measures ~5.3:1 while staying
           visibly dimmer than slate.400 (#94a3b8), preserving the hierarchy.
           Only this shade is overridden; extend deep-merges the rest. */
        slate: {
          500: '#7b8a9e',
        },
      },
      borderRadius: {
        /* Wired to --radius. Numerically identical to Tailwind's defaults. */
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
          '0%,100%': { boxShadow: '0 0 20px #a855f755' },
          '50%': { boxShadow: '0 0 50px #a855f7aa, 0 0 100px #f43f5e44' },
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
