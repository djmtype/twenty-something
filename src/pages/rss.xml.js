import rss from '@astrojs/rss';
import config from "@/data/config.json"
import { getCollection } from 'astro:content';

const {
	title: siteTitle,
	description: siteDescription,
	language: siteLanguage,
	country: siteCountry
  } = config.site

export async function GET(context) {
	const posts = await getCollection("postCollection", ({ data }) => {
		return data.status === "publish";
	  });

	// const posts = await getCollection("postCollection");
	const customData = siteLanguage && siteCountry
        ? `<language>${siteLanguage}-${siteCountry}</language>`
        : `<language>en-us</language>`;

	return rss({
		stylesheet: "/rss/styles.xsl",
		title: `Blog | ${siteTitle}`,
		description: siteDescription,
		site: context.site,
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
