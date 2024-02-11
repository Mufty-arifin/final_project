import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          10: '#f1f3f4'
        },
        green: {
          50: "#30Af5B",
          90: "#292C27"
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#787878",
          50: "#585858",
          90: "#141414",
        }
      },
      backgroundImage: {
        hero: "url('/bg-hero.jpg')",
        about: "url('/bg-about.jpg')",
        activity: "url('/bg-activity.jpg')",
        contact: "url('/bg-contact.jpg')",
        promo: "url('/bg-promo.jpg')",
        promo_potrait: "url('/bg-promo-potrait.jpg')",

      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px'
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      }
    },
  },
  plugins: [],
};

