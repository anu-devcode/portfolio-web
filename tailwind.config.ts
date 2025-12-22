import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Space-tech inspired palette matching the image
        bg: 'var(--bg-primary)',
        surface: 'var(--surface)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        
        // Deep space background
        space: {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#141425',
          600: '#1a1a30',
        },
        
        // Vibrant tech colors from the image
        cyber: {
          cyan: '#00f0ff',
          blue: '#0099ff', 
          purple: '#8b5cf6',
          magenta: '#d946ef',
          orange: '#ff6b35',
          green: '#10b981',
        },
        
        // Glass morphism
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-grid': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
        'neural-network': 'radial-gradient(circle at 20% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        'tech-gradient': 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 153, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-magenta': '0 0 20px rgba(217, 70, 239, 0.5)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glow-soft': '0 0 40px rgba(0, 240, 255, 0.1)',
        'inner-glow': 'inset 0 0 20px rgba(0, 240, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'tech-card': '0 4px 20px rgba(0, 240, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'floating': '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 240, 255, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'neural-pulse': 'neuralPulse 3s ease-in-out infinite',
        'data-flow': 'dataFlow 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        neuralPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transform: {
        '3d': 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      },
    },
  },
  plugins: [],
}
export default config

