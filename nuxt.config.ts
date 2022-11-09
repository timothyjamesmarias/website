// https://v3.nuxtjs.org/api/configuration/nuxt.config
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()],
  },
  modules: ["@nuxtjs/tailwindcss", "@intlify/nuxt3"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  intlify: {
    localeDir: "lang",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
    },
  },
});
