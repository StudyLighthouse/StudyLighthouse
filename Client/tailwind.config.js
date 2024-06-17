/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This will include all js, jsx, ts, and tsx files in the src directory and its subdirectories
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '640px',
      'lg': '850px',
      'xl': '1280px',
    },
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          /* Hide scrollbar for Webkit-based browsers */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
