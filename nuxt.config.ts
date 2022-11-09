// https://v3.nuxtjs.org/api/configuration/nuxt.config
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()],
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Open Sans": true,
      Raleway: true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  content: {},
});
