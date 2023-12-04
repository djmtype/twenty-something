import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../src/src/consts';

export async function GET(context) {
	const posts = await getCollection('postCollection');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.slug}/`,
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
		})),
		customData: `<language>en-us</language>`,
	});
}
