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
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  runtimeConfig: {
    mailgun_key: process.env.MAILGUN_KEY,
    mailgun_domain: process.env.MAILGUN_DOMAIN,
    mailgun_to: process.env.MAILGUN_TO,
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  colorMode: {
    preference: "dracula",
    dataValue: 'theme',
    classSuffix: '',
  },
});
