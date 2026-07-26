// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';

import { mermaidPlugin } from './src/plugins/mermaid.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://timothymarias.com',
  markdown: {
    // Sätteri is the default processor; naming it explicitly is what allows
    // mdast plugins to be added. Mermaid blocks become SVG at build time.
    processor: satteri({ mdastPlugins: [mermaidPlugin()] }),
    shikiConfig: {
      // Both themes ship as CSS variables; Prose.astro picks one per palette.
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});