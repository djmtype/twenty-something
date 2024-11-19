import { defineConfig } from "astro/config";
import type { Site } from "./src/types/configuration";
import config from "./src/data/config.json";
import remarkCallout from "remark-callout";
import remarkToc from "remark-toc";
import rehypeUnwrapImages from 'rehype-unwrap-images';
// import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import pageInsight from "astro-page-insight";
// const { url: siteUrl }: Site = config.site;


const siteConfig: Site = config.site;
// const { url: siteUrl } = siteConfig;
const siteUrl = typeof siteConfig.url === 'string' ? siteConfig.url : siteConfig.url.toString();


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  prefetch: false,
  experimental: {
    contentLayer: true,
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      // theme: "houston",
      wrap: true,
    },
    remarkPlugins: [
      remarkCallout,
      [
        remarkToc,
        {
          maxDepth: 2,
        },
      ],
    ],
  },
  integrations: [
    // AutoImport({
    //   imports: [
    //     // { "astro-icon/components": ["Icon"] },
    //     // "./src/components/ButtonLink.astro",
    //     // "./src/components/Card.astro",
    //     // "./src/components/Grid.astro",
    //     // "./src/components/Group.astro",
    //     // "./src/components/Container.astro",

    //     // "./src/components/Title.astro",

    //     // "./src/components/Figure.astro",

    //     // "./src/components/Column.astro",
    //     // "./src/components/Heading.astro",

    //     // "./src/components/List.astro",
    //     // "./src/components/Testimonial.astro",
    //     // "./src/components/PostList.astro",
    //     // "./src/components/NewsletterSignup.astro",
    //     // "./src/components/Hero.astro",
    //     // "./src/components/Callout.astro",
    //   ],
    // }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "css-variables",
        // wrap: true,
      },
      rehypePlugins: [
        rehypeUnwrapImages
      ]
    }),
    sitemap(),
    icon({
      include: {
        lucide: ["*"],
      },
    }),
    pageInsight(),
  ],
  output: "static",
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
