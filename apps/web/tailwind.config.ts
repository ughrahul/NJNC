import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border, #e2e8f0)",
        input: "var(--input, #e2e8f0)",
        ring: "var(--ring, #1E40AF)",
        background: "var(--background, #ffffff)",
        foreground: "var(--foreground, #020817)",
        // Design system from spec §9.2
        primary: {
          DEFAULT: "#1E40AF", // Himalayan Sky
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        gold: {
          DEFAULT: "#D97706", // Nepali Sunset
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        crimson: {
          DEFAULT: "#DC2626", // Nepal Flag
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        navy: {
          DEFAULT: "#1E1B4B", // Mountain Base
          50: "#EEF2FF",
          100: "#E0E7FF",
          800: "#1E1B4B",
          900: "#18163F",
        },
        forest: {
          DEFAULT: "#16A34A", // Jungle
          50: "#F0FDF4",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        slate: {
          DEFAULT: "#64748B", // Monsoon Cloud
        },
        snow: "#F8F7F2", // Off-White background
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Typography scale from spec §9.3
        "display-1": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-2": ["36px", { lineHeight: "1.25", fontWeight: "700" }],
        "display-3": ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-4": ["22px", { lineHeight: "1.35", fontWeight: "600" }],
        "display-5": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
      },
      spacing: {
        // 8px base unit from spec §9.4
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "30": "7.5rem", // 120px
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
