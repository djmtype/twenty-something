import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { site } from './src/data/config.json';
import remarkUnwrapImages from "remark-unwrap-images";
import sitemap from '@astrojs/sitemap';

// import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  integrations: [mdx(), sitemap(), 
    // alpinejs()
  ],
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkUnwrapImages]
  },
  vite: {
    server: {
      watch: {
        ignored: ['_backup/**']
      }
    },
    plugins: [],
    ssr: {},
    css: {
      devSourcemap: true
    }
  }
});