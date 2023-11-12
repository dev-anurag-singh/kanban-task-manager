import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
  colors: {
    purple: {
      dark: '#635FC7',
      light: '#A8A4FF',
    },
    black: '#000112',
    grey: {
      darkest: '#20212c',
      dark: '#2B2B37',
      medium: '#828FA3',
      light: '#FAF7FD',
    },
    lines: {
      light: '#E4EBFA',
      dark: '#3E3F4E',
    },
    white: '#FFFFFF',
    transparent: 'transparent',
    red: {
      dark: '#EA5555',
      light: '#FF9898',
    },
  },
};
export default config;
