import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      screens: {
        xs: "414px",
      },
      colors: {
        main: {
          DEFAULT: "#1b4965",
          "50": "#f2f9fd",
          "100": "#e4f1fa",
          "200": "#c3e2f4",
          "300": "#8fccea",
          "400": "#53b1dd",
          "500": "#2d97ca",
          "600": "#1e79ab",
          "700": "#19628b",
          "800": "#195373",
          "900": "#1b4965",
          "950": "#112c40",
        },
        acent: {
          DEFAULT:"#e63f66",
          "50": "#fef2f4",
          "100": "#fde6e9",
          "200": "#fbd0d9",
          "300": "#f7aab9",
          "400": "#f27a93",
          "500": "#e63f66",
          "600": "#d42a5b",
          "700": "#b21e4b",
          "800": "#951c45",
          "900": "#801b40",
          "950": "#470a1f",
        },
      },
    },
  },
};
