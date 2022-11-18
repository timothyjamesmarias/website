// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  plugins: ['~/plugins/fontawesome.js'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
        Prompt: [400],
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
  content: {
      highlight: {
          theme: "nord",
            preload: [
                "c", "python", "javascript", "typescript", "rust", "php", 
                "ruby", "vue", "html", "css"
            ],
      },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
});
