// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
    app: {
        head: {
            title: "Timothy Marias",
            meta: [{
                name: "description",
                content: "Web dev"
            }],
        },
    },
  plugins: ['~/plugins/fontawesome.js'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ["@nuxtjs/tailwindcss"],
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
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
});
