/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Techware Brand Colors
        'tw-blue': '#1D4ED8',
        'tw-blue-dark': '#1a3fc4',
        'tw-blue-light': '#3B6FEA',
        'tw-navy': '#0B1B3F',
        'tw-navy-light': '#112354',
        'tw-green': '#22C55E',
        'tw-green-dark': '#16A34A',
        'tw-green-light': '#4ADE80',
        'tw-grey': '#F3F4F6',
        'tw-grey-dark': '#E5E7EB',
        'tw-text': '#111827',
        'tw-text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B1B3F 0%, #1D4ED8 60%, #1a3fc4 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(11, 27, 63, 0) 0%, rgba(11, 27, 63, 0.9) 100%)',
        'green-glow': 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(11, 27, 63, 0.1)',
        'card-hover': '0 8px 40px rgba(29, 78, 216, 0.2)',
        'green': '0 4px 24px rgba(34, 197, 94, 0.3)',
        'blue': '0 4px 24px rgba(29, 78, 216, 0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(34, 197, 94, 0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
