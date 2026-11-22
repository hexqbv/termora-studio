/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090d',
          900: '#0c0f17',
          850: '#111520',
          800: '#161c2b',
          750: '#1c2436',
          700: '#232d43',
          600: '#33415c',
        },
        term: {
          bg: '#0c0e14',
          border: '#1f2536',
          cyan: '#38bdf8',
          green: '#4ade80',
          yellow: '#facc15',
          magenta: '#f472b6',
          red: '#f87171',
          blue: '#60a5fa',
          dim: '#64748b',
          text: '#f1f5f9'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
