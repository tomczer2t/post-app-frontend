/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
    corePlugins: {
      preflight: false,
    },
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      transitionProperty: {
        'height': 'height',
      },
      boxShadow: {
        'md-top': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      height: {
        'screen-80px': 'calc(100vh - 80px)',
      },
      padding: {
        'min-80px': '',
      },
      backgroundColor: {},
    },
    plugins: []
  },
};
