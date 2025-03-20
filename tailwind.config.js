/** @type {import("tailwindcss").Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
      1000: "1000",
      "bold": "bold",
      "normal": "normal",
      "thin": "thin",
    },

    extend: {
      fontSize: {
        "xxs": "0.625rem",
      },

      "colors": {
        "primary": {
          "DEFAULT": "#1c49bc",
          "900": "#133177",
          "800": "#173ea3",
          "700": "#1c49bc",
          "600": "#4266d0",
          "500": "#597be3",
          "400": "#7395f3",
          "300": "#92aaf7",
          "200": "#c7d6fc",
          "100": "#e3ebfd",
          "50": "#f2f6ff",
        },
        "secondary": {
          "DEFAULT": "#ff5722",
          "900": "#7a2d17",
          "800": "#a63d21",
          "700": "#ff5722",
          "600": "#ff7043",
          "500": "#ff8a65",
          "400": "#ffa490",
          "300": "#ffc1b0",
          "200": "#ffdcd4",
          "100": "#ffe9e5",
          "50": "#fff4f0",
        },
        "neutral": {
          "DEFAULT": "#333333",
          "900": "#1C1C1C",
          "800": "#252525",
          "700": "#333333",
          "600": "#636363",
          "500": "#636363",
          "400": "#AFAFAF",
          "300": "#CCCCCC",
          "200": "#E2E2E2",
          "100": "#F2F2F2",
        },
        "danger": {
          "DEFAULT": "#e53935",
          "50": "#ffebee",
        },
        "warning": {
          "DEFAULT": "#fbc02d",
          "50": "#fffde7",
        },
        "success": {
          "DEFAULT": "#43a047",
          "50": "#e8f5e9",
        },
        "info": {
          "DEFAULT": "#1e88e5",
          "50": "#e3f2fd",
        },
        "body": {
          "DEFAULT": "#F5F5F8",
          "200": "#DDDDE7",
          "100": "#E9E9F0",
          "50": "#F5F5F8",
        },
        "muted": "#AFAFAF",
      },
    },

    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      phone: "1024px",
      xl: "1280px",
      // '2xl': '1640px',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "1.5rem",
        xl: "5rem",
      },
    },
  },
  variants: {
    space: ["responsive", "direction"],
  },
  safelist: [],
  plugins: [],
};
