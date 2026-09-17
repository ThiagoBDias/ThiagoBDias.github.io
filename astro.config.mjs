// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  // Gera um site estático para o GitHub Pages
  output: 'static',

  // URL oficial do portfólio no GitHub Pages
  site: 'https://thiagobdias.github.io',

  integrations: [
    tailwind(),

    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],

  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },

  vite: {
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(
        process.env.SUPABASE_URL
      ),

      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(
        process.env.SUPABASE_ANON_KEY
      ),

      'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify(
        process.env.PUBLIC_SUPABASE_URL
      ),

      'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
        process.env.PUBLIC_SUPABASE_ANON_KEY
      ),
    },

    build: {
      cssMinify: true,
      minify: true,

      rollupOptions: {
        output: {
          manualChunks: {
            supabase: ['@supabase/supabase-js'],
          },
        },
      },
    },

    optimizeDeps: {
      include: ['@supabase/supabase-js', 'marked'],
    },
  },
});