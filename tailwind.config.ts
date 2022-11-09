import { Config } from "tailwindcss";

export default <Config>{
  content: [
    // Add all files that contain Tailwind classes
    // e.g. './modules/**/*.{vue,js,ts}',
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
