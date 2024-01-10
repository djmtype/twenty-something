import { defineConfig } from "astro/config";

import remarkCallout from "remark-callout";
// import remarkDirective from "remark-directive"
// import remarkCalloutDirectives from "@microflash/remark-callout-directives"

import remarkUnwrapImages from "remark-unwrap-images";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { site } from "./src/data/config.json";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  integrations: [
    AutoImport({
      imports: [
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
    mdx(),
    sitemap(),
    icon({
      include: {
        bxs: [
          "chevron-down",
          "copy",
          "check-circle",
          "error-circle",
          "sun",
          "moon",
          "cog",
          "user",
        ],
        bx: [
          "chevrons-left",
          "chevron-left",
          "chevrons-right",
          "chevron-right",
          "right-arrow-alt",
          "left-arrow-alt",
          "info-circle",
          "pin",
          "error",
          "error-alt",
          "check-circle",
          "bolt-circle",
        ],
      },
    }),
  ],
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [
      remarkCallout,
      // remarkDirective,
      // remarkCalloutDirectives,
      remarkUnwrapImages,
    ],
    // extendMarkdownConfig: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      // wrap: true,
    },
  },
  // experimental: {
  //   optimizeHoistedScript: true,
  // },
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
