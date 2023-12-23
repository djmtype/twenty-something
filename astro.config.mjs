import { defineConfig } from "astro/config";
import remarkUnwrapImages from "remark-unwrap-images";
import mdx from "@astrojs/mdx";
import { site } from "./src/data/config.json";
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
  integrations: [mdx({
    remarkPlugins: [remarkUnwrapImages],
  }), sitemap()],
  // experimental: {
  //   optimizeHoistedScript: true,
  // },
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