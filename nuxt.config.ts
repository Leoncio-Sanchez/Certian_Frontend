import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  dir: {
    pages: 'presentation/pages',
    layouts: 'presentation/layouts',
    middleware: 'presentation/middleware',
  },

  components: [
    { path: '~/presentation/components', pathPrefix: true },
  ],

  imports: {
    dirs: [
      'presentation/composables',
      'data/repositories',
      'core/usecases/**',
    ]
  },

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

  css: ['~/assets/css/index.css'],

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
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    }
  },

  // Nuxt 3 uses the 'server' directory for API routes automatically (Nitro)
  // We'll migrate server.ts logic there.
})
