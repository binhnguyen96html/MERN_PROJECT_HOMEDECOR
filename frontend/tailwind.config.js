/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
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
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
}

