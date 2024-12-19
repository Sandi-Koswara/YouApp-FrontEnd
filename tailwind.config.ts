import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "iphone-13-mini": {
          raw: "(max-width: 375px) and (min-height: 812px) and (orientation: portrait)",
        },
      },
      colors: {
        primaryBg: "#09141A",
        secondaryBg: "#0D1D23",
        tertiaryBg: "#1F4247",
      },
      backgroundImage: {
        golden:
          "linear-gradient(90deg, rgba(248,250,229,1) 0%, rgba(213,190,136,1) 50%, rgba(248,250,229,1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
