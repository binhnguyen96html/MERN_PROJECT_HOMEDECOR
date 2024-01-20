/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    // "./src/components/**/*.{js, jsx}"
  ],
  theme: {
    extend: {
      maxHeight: {
        '100': '30rem',
      },
      maxWidth: {
        '56': '14rem'
      },
      height: {
        '96': '28rem'
      },
      width: {
        '110': '35rem'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
}

