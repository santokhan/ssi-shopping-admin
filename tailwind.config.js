/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "",
          100: "",
          200: "",
          300: "",
          400: "",
          500: "",
          600: "",
          700: "",
          800: "",
          900: "",
          950: "",
        },
        secondary: {

        },
        dark: {
          blue: {
            400: "hsl(204, 77%, 16%)",
            500: "hsl(204, 77%, 26%)",
            600: "hsl(204, 77%, 36%)%"
          }
        }
      }
    },
  },
  plugins: [],
}

