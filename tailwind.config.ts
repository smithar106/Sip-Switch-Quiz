import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C8A96E",
          light: "rgba(200,169,110,0.15)",
          subtle: "rgba(200,169,110,0.1)",
          muted: "rgba(200,169,110,0.05)",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          card: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.08)",
        },
        muted: "#999999",
        secondary: "#DDDDDD",
      },
      borderRadius: {
        card: "20px",
        btn: "16px",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
