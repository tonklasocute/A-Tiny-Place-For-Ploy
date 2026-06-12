/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ploy-pink': '#FFB5C8',
        'ploy-pink-light': '#FFD6E4',
        'ploy-pink-deep': '#F593B0',
        'ploy-lavender': '#C8B4E8',
        'ploy-lavender-light': '#E0D4F5',
        'ploy-cream': '#FFF9F0',
        'ploy-cream-warm': '#FFF0E6',
        'ploy-sky': '#B5D8F7',
        'ploy-sky-light': '#D6ECFF',
        'ploy-peach': '#FFD5B5',
        'ploy-peach-light': '#FFE8D2',
        'ploy-mint': '#B5E8D5',
        'ploy-gold': '#FFE066',
      },
      fontFamily: {
        display: ['"Dancing Script"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.7)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        bloom: {
          '0%': { transform: 'scale(0) rotate(-30deg)', opacity: '0' },
          '60%': { transform: 'scale(1.2) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'twinkle-slow': 'twinkle 3s ease-in-out infinite',
        drift: 'drift 20s linear infinite',
        bloom: 'bloom 0.6s ease-out forwards',
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
