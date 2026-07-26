// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://timothymarias.com',
  markdown: {
    shikiConfig: {
      // Both themes ship as CSS variables; Prose.astro picks one per palette.
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});