/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      colors: {
        primary: "#EB9934",
        secondary: {
          100: "#001220",
          150: "#f89e30",
          200: "#D49824",
          300: "#D46B24",
          400: "#F65F2A",
        },
        button: {
          100: "#844F0E",
        },
        table: {
          100: "#D9D9D9",
          200: "#B1B1B1",
        },
        boxShadow: {
          custom: "11px 7px 4px 0px rgba(255,255,255,0.17)",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
