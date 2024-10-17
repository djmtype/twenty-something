import rss from '@astrojs/rss';
import type { ConfigObj } from "@/types/config"
import config from "@/data/config.json"
import { getCollection } from 'astro:content';

const {
	title: siteTitle,
	url: siteUrl,
	description: siteDescription,
	language: siteLanguage,
	country: siteCountry
  }: ConfigObj["site"] = config.site



export async function GET() {
	const posts = await getCollection("post", ({ data }) => {
		return data.status === "publish";
	  });

	const customData = siteLanguage && siteCountry
        ? `<language>${siteLanguage}-${siteCountry}</language>`
        : `<language>en-us</language>`;

	return rss({
		stylesheet: "/rss/styles.xsl",
		title: `Blog | ${siteTitle}`,
		description: siteDescription,
		site: siteUrl,
		items: posts.map((post) => ({
			// ...post.data,
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: `/${post.slug}/`,
		})),
		customData,
	});
}
