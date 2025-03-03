/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030712', // Deepest slate
          900: '#0F172A', // Rich navy black
          800: '#1E293B', // Deep blue-gray
          700: '#334155', // Medium blue-gray
          600: '#475569', // Light blue-gray
          500: '#64748B', // Softer blue-gray
        },
        accent: {
          blue: {
            DEFAULT: '#3B82F6',
            hover: '#2563EB',
            light: '#60A5FA',
          },
          purple: {
            DEFAULT: '#8B5CF6',
            hover: '#7C3AED',
            light: '#A78BFA',
          },
          magenta: {
            DEFAULT: '#EC4899',
            hover: '#DB2777',
            light: '#F472B6',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            hover: '#0891B2',
            light: '#22D3EE',
          },
        },
        gradient: {
          start: '#8B5CF6',
          mid: '#6366F1',
          end: '#3B82F6',
          glow: '#7C3AED',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.accent.purple.DEFAULT), 0 0 20px theme(colors.gradient.glow)',
        'neon-blue': '0 0 5px theme(colors.accent.blue.DEFAULT), 0 0 20px rgba(37, 99, 235, 0.3)',
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};