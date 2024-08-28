/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';
import svgLoader from 'vite-svg-loader'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    svgLoader({
      defaultImport: 'url'
    }),
    aspectRatio,
    function ({ addUtilities }) {
      const newUtilities = {
        '.sidebar-item': {
          '@apply flex items-center justify-center p-3 cursor-pointer relative transition-all duration-300': {},
        },
        '.sidebar-item:hover': {
          '@apply bg-[#6947BF] bg-opacity-10 rounded-2xl': {},
        },
        '.sidebar-item-title': {
          '@apply hidden absolute left-full ml-4 bg-white p-2 rounded-md shadow-md whitespace-nowrap': {},
        },
        '.sidebar-item:hover .sidebar-item-title': {
          '@apply block': {},
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};