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
  modules: ["@nuxtjs/tailwindcss", "nuxt-mail"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  mail: {
    message: {
      to: "timothyjamesmarias@gmail.com",
    },
    smtp: {
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
      },
    }
  },
});
