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
    function ({ addBase }) {
      addBase({
        'input': {
          '@apply focus:outline-none focus:border-transparent': {},
        },
      });
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.sidebar-item': {
          '@apply flex items-center justify-center p-3 cursor-pointer relative transition-all duration-300': {},
        },
        '.sidebar-item:hover': {
          '@apply bg-[#6947BF] bg-opacity-100 rounded-2xl z-50': {},
        },
        '.sidebar-item-title': {
          '@apply hidden absolute text-black left-full ml-4 bg-white p-2 rounded-md shadow-md whitespace-nowrap z-50': {},
        },
        '.sidebar-item:hover .sidebar-item-title': {
          '@apply block opacity-100': {},
        },
        '.input-border': {
          '@apply focus:outline focus:border': {},
        }
      };


      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};