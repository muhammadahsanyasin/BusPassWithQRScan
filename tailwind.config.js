// tailwind.config.js

module.exports = {
  prefix: 'tw-', // Prefix for Tailwind CSS classes
  content: [
   './src/**/*.{js,ts,jsx,tsx}',
   'node_modules/flowbite-react/**/*.{js,ts,js,tsx}'
  ],
  theme: {
    // Extend or customize the default Tailwind CSS theme here
    extend: {},
  },
  plugins: [
    // Include any Tailwind CSS plugins here
    require('flowbite/plugin'),
    // Add more plugins as needed
  ],
};
