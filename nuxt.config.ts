// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt3-leaflet", "nuxt-highcharts"],
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
  },
});
