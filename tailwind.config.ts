import { Config } from "tailwindcss";

export default <Config>{
  content: [
    // Add all files that contain Tailwind classes
    // e.g. './modules/**/*.{vue,js,ts}',
    "./pages/**/*.{html,js, vue}",
    "./components/**/*.{html,js, vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "main": ["Iosevka", "monospace"],
      }
    },
  },
  plugins: [require('daisyui')],
};
