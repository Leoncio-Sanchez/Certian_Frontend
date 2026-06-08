import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  devServer: {
    port: 3000
  },
  
  modules: [
    '@vueuse/motion/nuxt'
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['~/src/index.css'],

  app: {
    head: {
      title: 'Certian | UPeU',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      geminiApiKey: process.env.GEMINI_API_KEY,
      apiUrl: 'http://localhost:5000/api'
    }
  },

  // Nuxt 3 uses the 'server' directory for API routes automatically (Nitro)
  // We'll migrate server.ts logic there.
})
