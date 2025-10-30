/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15', // exact yellow for buttons
          text: '#111827',
          subtext: '#6B7280',
          chip: '#E5E7EB'
        }
      },
      boxShadow: {
        card: '0 2px 6px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};
