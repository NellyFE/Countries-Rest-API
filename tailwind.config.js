/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector' ,
    content: ["./*html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        lightMode: "hsl(24, 100.00%, 98.00%)",
        textColor: "hsl(25, 10.60%, 35.10%)",
      },
    },
  },
  plugins: [],
};
