/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        atm: {
          50: "#f1fcfa",
          100: "#bbf2eb",
          200: "#a3ece4",
          300: "#6cdcd4",
          400: "#3ec3bd",
          500: "#25a7a4",
          600: "#1b8686",
          700: "#1a6a6b",
          800: "#195556",
          900: "#194748",
          950: "#08292b",
        },
      },
    },
  },
  plugins: [],
};
