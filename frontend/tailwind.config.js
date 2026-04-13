/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AI / Modern Palette
        aiBlue: '#0080ff',
        aiCyan: '#00d4ff',
        aiGold: '#ffd700',
        aiPurple: '#8b5cf6',
        cyberBlue: '#0080ff',
        cyberCyan: '#00d4ff',
        jarvisBlue: '#0080ff',
        jarvisCyan: '#00d4ff',
        starkGold: '#ffd700',
        holographicBlue: '#001a33',
        deepSpace: '#000814',
        neonCyan: '#00ffff',
        electricBlue: '#0099ff',
        glassBg: 'rgba(0, 26, 51, 0.75)',
        glassBorder: 'rgba(0, 212, 255, 0.2)',
        darkBg: '#000814',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        marvel: ['Orbitron', 'sans-serif'],
        stark: ['Rajdhani', 'sans-serif'],
        sci: ['Exo 2', 'sans-serif'],
        scifi: ['Exo 2', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'soft-glow': 'soft-glow 3s ease-in-out infinite',
        'float': 'float-up 4s ease-in-out infinite',
        'float-slow': 'float-down 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #0080ff' },
          '100%': { boxShadow: '0 0 20px #00ffff, 0 0 40px #0099ff' },
        },
        'soft-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(0, 212, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'hud-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'hex-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 212, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 128, 255, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(0, 212, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
