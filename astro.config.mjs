import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { site } from "./src/data/config.json";
import remarkUnwrapImages from "remark-unwrap-images";
import sitemap from "@astrojs/sitemap";



// https://astro.build/config
export default defineConfig({
  site: site.url,
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkUnwrapImages],
    extendMarkdownConfig: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables"
      // wrap: true,
    }
  },
  integrations: [mdx(), sitemap()],
  experimental: {
    optimizeHoistedScript: true,
  },
  output: 'static',

  vite: {
    server: {},
    plugins: [],
    ssr: {},
    css: {
       devSourcemap: true
    }
  }
});