/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#040814",
        electric: "#4cc9f0",
        neon: "#7b61ff",
        pulse: "#00f5d4",
      },
      boxShadow: {
        glow: "0 0 25px rgba(76, 201, 240, 0.25)",
        neon: "0 0 30px rgba(123, 97, 255, 0.25)",
      },
      animation: {
        "gradient-shift": "gradient-shift 14s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
