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
      colors: {
        "background": "#282a36",
        "secondary": "#44475a",
        "main": "#f8f8f2",
        "highlight": "#6272a4",
        "cyan": "#8be9fd",
        "green": "#50fa7b",
        "orange": "#ffb86c",
        "pink": "#ff79c6",
        "purple": "#bd93f9",
        "red": "#ff5555",
        "yellow": "#f1fa8c",
      },
      fontFamily: {
        "main": ["Iosevka", "monospace"],
      }
    },
  },
  plugins: [],
};
