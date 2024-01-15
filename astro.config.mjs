import { defineConfig } from "astro/config";

import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { site } from "./src/data/config.json";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  // markdown: {
  //   extendMarkdownConfig: true,
  //   syntaxHighlight: "shiki",
  //   shikiConfig: {
  //     theme: "css-variables",
  //     // wrap: true,
  //   },
  // },
  integrations: [
    AutoImport({
      imports: [
        "./src/components/Title.astro",
        "./src/components/ButtonLink.astro",
        "./src/components/Figure.astro",
        "./src/components/Group.astro",
        "./src/components/Container.astro",
        "./src/components/Column.astro",
        "./src/components/Heading.astro",
        "./src/components/Card.astro",
        "./src/components/LayoutGrid.astro",
        "./src/components/List.astro",
        "./src/components/Testimonial.astro",
        "./src/components/PostList.astro",
        "./src/components/NewsletterSignup.astro",
        "./src/components/Hero.astro",
        "./src/components/Callout.astro",
      ],
    }),
    mdx({
        syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      // wrap: true,
    },
    }),
    sitemap(),
    icon({
      include: {
        lucide: ['*']
      },
    }),
  ],


  output: "static",
  vite: {
    server: {},
    plugins: [],
    ssr: {},
    css: {
      devSourcemap: true,
    },
  },
});
