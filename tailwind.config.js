module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      colors: {
        primary: '#6b46c1', // Purple
        secondary: '#f6ad55', // Orange
        dark: '#121212',
        darkgray: '#1e1e1e',
        lightgray: '#2d2d2d',
      },
      animation: {
        pulse: 'pulse 2s infinite',
        glow: 'glow 1.5s ease-in-out infinite alternate',
        slideIn: 'slideIn 0.5s ease-out',
        fadeIn: 'fadeIn 0.3s ease-in',
        countdown: 'countdown 0.5s ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        glow: {
          from: { 
            'box-shadow': '0 0 5px #6b46c1, 0 0 10px #6b46c1, 0 0 15px #f6ad55, 0 0 20px #f6ad55' 
          },
          to: { 
            'box-shadow': '0 0 10px #6b46c1, 0 0 20px #6b46c1, 0 0 30px #f6ad55, 0 0 40px #f6ad55' 
          }
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        countdown: {
          '0%': { transform: 'scale(1)', color: '#ffffff' },
          '50%': { transform: 'scale(1.2)', color: '#f6ad55' },
          '100%': { transform: 'scale(1)', color: '#ffffff' },
        }
      },
      boxShadow: {
        glow: '0 0 10px rgba(107, 70, 193, 0.5), 0 0 20px rgba(246, 173, 85, 0.3)',
        'glow-strong': '0 0 15px rgba(107, 70, 193, 0.7), 0 0 30px rgba(246, 173, 85, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['dark'],
      backgroundColor: ['dark', 'hover', 'active'],
      backgroundOpacity: ['active'],
      textColor: ['dark', 'hover', 'active'],
      borderColor: ['dark', 'focus'],
      boxShadow: ['hover', 'focus', 'dark'], 
      transform: ['hover', 'focus'],
      scale: ['hover', 'active'],
    },
  },
  plugins: [],
};