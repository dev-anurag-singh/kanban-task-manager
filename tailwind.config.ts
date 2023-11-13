import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    fontSize: {
      base:'[2rem,1.4375rem]',
      xl: '[1.5rem,1.25em]',
      lg: '[1.125rem,1.25em]',
      md: '[0.9375rem,1.25em]',
      sm: '[0.75rem,1.25em]',
    },
  },
  plugins: [],
};
export default config;
