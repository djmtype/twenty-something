import config from "@/data/config.json";

import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const {
  title: siteTitle,
  url: siteUrl,
  description: siteDescription,
  language: siteLanguage,
  country: siteCountry,
} = config.site;

export async function GET(context) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const posts = await getCollection("post", ({ data }) => {
    return data.status === "publish";
  });

  const items = [];
  for (const post of posts) {
    const { Content } = await post.render();
    const content = await container.renderToString(Content);
    const link = new URL(`/${post.slug}/`, context.url.origin).toString();
    // const link = `/${post.slug}/`;
    const title = post.data.title;
    const description = post.data.description;
    const pubDate = post.data.date;
    items.push({ title, pubDate, description, link, content });
  }

  const customData =
    siteLanguage && siteCountry
      ? `<language>${siteLanguage}-${siteCountry}</language>`
      : `<language>en-us</language>`;

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: `Blog | ${siteTitle}`,
    description: siteDescription,
    site: siteUrl,
    items,
    customData,
  });
}
