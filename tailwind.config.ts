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
        bg: {
          base: '#1a1410',
          surface: '#231c16',
          'surface-hover': '#2d2318',
        },
        border: { DEFAULT: '#3d3028' },
        text: {
          primary: '#f0e6d3',
          secondary: '#a89880',
          muted: '#6b5c4e',
        },
        accent: {
          gold: '#c9933a',
          'gold-hover': '#e0a84a',
          'warm-white': '#fdf6ec',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        lora: ['var(--font-lora)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,147,58,0.06)',
        md: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,147,58,0.08)',
      },
      maxWidth: { reading: '680px' },
    },
  },
  plugins: [],
}
export default config
