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
      xl: [
        '1.5rem',
        {
          fontWeight: '700',
        },
      ],
      lg: [
        '1.125rem',
        {
          fontWeight: '700',
        },
      ],
      md: [
        '0.9375rem',
        {
          fontWeight: '700',
        },
      ],
      sm: [
        '0.75rem',
        {
          fontWeight: '700',
          letterSpacing: '2.4px',
        },
      ],
      base: [
        '0.8125rem',
        {
          lineHeight: '1.4375rem',
          fontWeight: '500',
        },
      ],
      xs: [
        '0.75rem',
        {
          fontWeight: '700',
        },
      ],
    },
  },
  plugins: [],
};
export default config;
