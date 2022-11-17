// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  vite: {
    plugins: [],
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  buildModules: ["@nuxtjs/google-fonts", "@nuxtjs/fontawesome"],
  googleFonts: {
    families: {
        Teko: [300],
    },
    display: "swap",
    download: true,
    base64: true,
    inject: true,
    overwrite: false,
    stylePath: 'assets/css/fonts.css',
    prefetch: false,
    preconnect: true,
    preload: false,
    useStyleSheet: false,
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  fontawesome: {
    icons: [
        "faGithub",
        "faMagnifyingGlass",
    ],
  }
});
