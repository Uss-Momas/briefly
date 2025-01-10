/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zircon': {
          '50': '#f2f7ff',
          '100': '#dbe8fe',
          '200': '#bfd8fe',
          '300': '#93bffd',
          '400': '#609dfa',
          '500': '#3b78f6',
          '600': '#2559eb',
          '700': '#1d44d8',
          '800': '#1e38af',
          '900': '#1e348a',
          '950': '#172254',
        },
      },
    },
  },
  plugins: [],
}