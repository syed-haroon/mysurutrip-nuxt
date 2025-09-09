import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  ssr: true, // still needed for prerender
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  // Runtime config for access control
  runtimeConfig: {
    public: {
      isProduction: process.env.NODE_ENV === 'production',
      isDevelopment: process.env.NODE_ENV === 'development',
      adminSecret: process.env.ADMIN_SECRET || 'dev-admin-secret-2024',
    },
  },

  compatibilityDate: '2025-07-15',

  // SSG Configuration
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  typescript: {
    shim: false,
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
      },
    },
  },

  shadcn: {
    prefix: 'ui-', // Prefix for all the imported component
    componentDir: './app/components/ui',
  },
});
