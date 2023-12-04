import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr",
      },
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          hover: "var(--destructive-hover)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
    },

    fontSize: {
      xl: [
        "1.5rem",
        {
          fontWeight: "700",
          lineHeight: "normal",
        },
      ],
      lg: [
        "1.125rem",
        {
          fontWeight: "700",
          lineHeight: "normal",
        },
      ],
      md: [
        "0.9375rem",
        {
          fontWeight: "700",
          lineHeight: "normal",
        },
      ],
      sm: [
        "0.75rem",
        {
          fontWeight: "700",
          letterSpacing: "2.4px",
          lineHeight: "normal",
        },
      ],
      base: [
        "0.8125rem",
        {
          lineHeight: "1.4375rem",
          fontWeight: "500",
        },
      ],
      xs: [
        "0.75rem",
        {
          fontWeight: "700",
          lineHeight: "normal",
        },
      ],
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;

//  colors: {
//   purple: {
//     dark: "#635FC7",
//     100: "#EFEFF9",
//     light: "#A8A4FF",
//   },
//   black: "#000112",
//   grey: {
//     darkest: "#20212c",
//     dark: "#2B2B37",
//     medium: "#828FA3",
//     light: "#FAF7FD",
//   },
//   lines: {
//     light: "#E4EBFA",
//     dark: "#3E3F4E",
//   },

//   white: "#FFFFFF",
//   transparent: "transparent",
//   red: {
//     dark: "#EA5555",
//     light: "#FF9898",
//   },
// },
