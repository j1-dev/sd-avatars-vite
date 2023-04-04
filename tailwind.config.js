/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        14: "14px",
      },
      keyframes: {
        // ...
      },
      animation: {
        // ...
      },
    },
  },
  variants: {
    extend: {
      // ...
      borderWidth: ["group-hover"],
      height: ["group-hover"],
      width: ["group-hover"],
    },
  },
  plugins: [],
};
