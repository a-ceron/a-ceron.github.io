import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const issues = (await getCollection('newsletter')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: 'Newsletter',
		description: 'Publicaciones del newsletter.',
		site: context.site,
		items: issues.map((issue) => ({
			...issue.data,
			link: `/newsletter/${issue.id}/`,
		})),
	});
}
