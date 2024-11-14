import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode based on 'dark' class
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Enable desired themes here
  },
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        dark: '#232A3C',   // Custom dark color
        medium: '#293245', // Custom medium color
      },
    },
  },
  plugins: [daisyui],
};

export default config;
