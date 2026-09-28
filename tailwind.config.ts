import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#8052ff", // Electric Iris
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#15846e", // Deep Verdant
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#121216",
          foreground: "#9a9a9a", // Ash Gray
        },
        accent: {
          DEFAULT: "#ffb829", // Saffron Spark
          foreground: "#000000",
        },
        border: "rgba(255, 255, 255, 0.08)",
        void: "#000000",
        iris: "#8052ff",
        saffron: "#ffb829",
        verdant: "#15846e",
        ash: "#9a9a9a",
        silver: "#bdbdbd",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
