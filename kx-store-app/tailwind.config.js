/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        novega: ["Novega", "sans-serif"],
        josefin: ["Josefin", "sans-serif"],
        "josefin-italic": ["Josefin-italic", "sans-serif"],
        "josefin-bold": ["Josefin-bold", "sans-serif"],
        "josefin-bolditalic": ["Josefin-boldItalic", "sans-serif"],
        "josefin-thin": ["Josefin-thin", "sans-serif"],
        "josefin-thinitalic": ["Josefin-thinItalic", "sans-serif"],
        "josefin-light": ["Josefin-light", "sans-serif"],
        "josefin-lightitalic": ["Josefin-lightItalic", "sans-serif"],
      },
      colors: {
        "kx-orange": "#D87607",
        "kx-beige": "#FDE9A6",
      },
    },
  },
  plugins: [],
};
