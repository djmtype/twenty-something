import { defineConfig } from "astro/config";
import type { ConfigObj } from "./src/types/config.types";
import remarkCallout from "remark-callout";
import remarkToc from "remark-toc";
// import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import config from "./src/data/config.json";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const { url: siteUrl }: ConfigObj["site"] = config.site;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
    remarkPlugins: [remarkCallout, [remarkToc, { maxDepth: 2 }]],
  },
  integrations: [
    // AutoImport({
    //   imports: [
    //     { "astro-icon/components": ["Icon"] },
    //     "./src/components/ButtonLink.astro",
    //     "./src/components/Card.astro",
    //     "./src/components/Grid.astro",
    //     "./src/components/Group.astro",
    //     "./src/components/Container.astro",

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
    }),
    sitemap(),
    icon({
      include: {
        lucide: ["*"],
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
