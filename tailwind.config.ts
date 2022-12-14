import { Config } from "tailwindcss";

export default <Config>{
  content: [
    // Add all files that contain Tailwind classes
    // e.g. './modules/**/*.{vue,js,ts}',
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#16171E",
        "white": "#FEFFFF",
        "main": "#c7c7c7",
        "black": "#000000",
        "red": "#E68E8E",
        "green": "#83AC8E",
        "yellow": "#F5B78A",
        "blue": "#9BB8DC",
        "magenta": "#BAACE2",
        "cyan": "#00C5C7",
      },
      fontFamily: {
          "ubuntu":["Ubuntu"],
          "prompt":["Prompt"],
      }
    },
  },
  plugins: [],
};
