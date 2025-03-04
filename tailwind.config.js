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
        darkmodeBg: "hsl(240, 88.10%, 13.10%)" ,
        darkmodeShade: "hsl(240, 24.00%, 25.30%)"
      },
    },
  },
  plugins: [],
};
