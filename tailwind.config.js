/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./static/scripts.min.js",
  ],
  theme: {
    extend: {
      fontSize: {
        // 'xxs': '.5rem',
      },

      colors: {
        primary: "#ff5128",
        secondary: "#1C212D",
        tertiary: "#f5bcf4",
      },

      boxShadow: {
        "spread-lg": "0px 0px 23px rgba(208, 208, 208, 0.25)",
        "spread-md": "0px 0px 17px rgba(208, 208, 208, 0.25)",
        "spread-sm": "0px 0px 8px rgba(208, 208, 208, 0.25)",
      },
    },

    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
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
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
