/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-green": "rgba(27, 199, 56, 0.10)",
        "custom-input":"rgba(21, 42, 22, 0.32)",
      },
      colors: {
        primary: "#152A16",
        secondary: "#5C635A",
        accent: "#1BC738",
      },
      screens: {
        // Default Tailwind breakpoints
        sm: "640px", // Small screens
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1280px", // Extra large screens
        "2xl": "1536px", // 2x extra large screens

        // Add custom breakpoints if needed
        "3xl": "1920px", // Custom breakpoint for ultra-wide screens
      },
    },
  },
  plugins: [],
};
