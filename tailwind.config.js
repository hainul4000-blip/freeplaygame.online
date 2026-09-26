/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#090714',
          surface: '#120c2b',
          deep: '#0d0820',
          border: '#1e1640',
        },
        neon: {
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(139,92,246,0.3), 0 0 24px rgba(139,92,246,0.1)' },
          '50%': { boxShadow: '0 0 16px rgba(139,92,246,0.6), 0 0 48px rgba(139,92,246,0.25)' },
        },
        neonPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        greenPulse: {
          '0%, 100%': { boxShadow: '0 0 6px rgba(34,197,94,0.6)' },
          '50%': { boxShadow: '0 0 14px rgba(34,197,94,1), 0 0 28px rgba(34,197,94,0.4)' },
        },
        cardLift: {
          '0%': { transform: 'translateY(0) rotateX(0)' },
          '100%': { transform: 'translateY(-8px) rotateX(2deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-120%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-120%)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalIn: {
          '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        overlayIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowGold: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(245,158,11,0.3), 0 0 24px rgba(245,158,11,0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        neonPulse: 'neonPulse 1.5s ease-in-out infinite',
        greenPulse: 'greenPulse 1.5s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 4s ease-in-out infinite',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideOutLeft: 'slideOutLeft 0.4s ease-in forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        modalIn: 'modalIn 0.3s ease-out forwards',
        overlayIn: 'overlayIn 0.3s ease-out forwards',
        glowGold: 'glowGold 2s ease-in-out infinite',
        scanline: 'scanline 3s linear infinite',
        gradientShift: 'gradientShift 6s ease infinite',
      },
    },
  },
  plugins: [],
};
