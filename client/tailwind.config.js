/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 🌲 레시피 숲 컬러 팔레트
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        nature: {
          green: '#16a34a',
          lime: '#84cc16',
          emerald: '#059669',
          amber: '#f59e0b',
          orange: '#fb923c',
        },
        // 기존 오렌지 색상 유지 (호환성)
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif'
        ],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'grow': 'grow 0.5s ease-out',
        'leaf-fall': 'leafFall 10s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 24px 48px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(5, 150, 105, 0.1)',
        'nature': '0 8px 24px rgba(5, 150, 105, 0.15), 0 4px 12px rgba(34, 197, 94, 0.1)',
        'nature-lg': '0 12px 32px rgba(5, 150, 105, 0.2), 0 6px 16px rgba(34, 197, 94, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-nature': 'linear-gradient(135deg, #059669 0%, #16a34a 50%, #84cc16 100%)',
        'gradient-forest': 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
