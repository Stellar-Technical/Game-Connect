import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': 'var(--color-midnight-blue)',
        'electric-blue': 'var(--color-electric-blue)',
        'cyber-purple': 'var(--color-cyber-purple)',
        'neon-green': 'var(--color-neon-green)',
        'lunar-gray': 'var(--color-lunar-gray)',
        'galaxy-pink': 'var(--color-galaxy-pink)',
        'starry-yellow': 'var(--color-starry-yellow)',
        'dark-matter-black': 'var(--color-dark-matter-black)',
        'white-smoke': 'var(--color-white-smoke)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(),],
};

export default config;
