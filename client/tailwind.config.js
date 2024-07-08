/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   mainBg: "rgb(var(--mainBg) / <alpha-value)",
    //   mainBlog: "rgb(var(--mainBlog) / <alpha-value)",
    //   prim: "rgb(var(--prim) / <alpha-value)",
    //   darkText: "rgb(var(--darkText) / <alpha-value)",
    //   lightText: "rgb(var(--lightText) / <alpha-value)",
    // },

    extend: {
      colors: {
        // mainBg: "rgb(var(--mainBg) / <alpha-value)",
        // mainBlog: "rgb(var(--mainBlog) / <alpha-value)",
        // prim: "rgb(var(--prim) / <alpha-value)",
        // darkText: "rgb(var(--darkText) / <alpha-value)",
        // lightText: "rgb(var(--lightText) / <alpha-value)",
        prim: "rgb(14, 165, 233)",
        dark: {
          light: "#5A7184",
          hard: "#0D2436",
          soft: "#183856",
        },
      },
      fontFamily: {
        opensans: ["'Open Sans'", "sans-serif"],
        roboto: ["Roboto Mono", "monospace"],
        nunito: ["Nunito", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true,
  },
};
