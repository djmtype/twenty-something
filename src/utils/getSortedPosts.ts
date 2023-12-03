import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"postCollection">[]) =>
  posts
    .filter(({ data }) => data.status === 'publish')
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date).getTime() / 1000) -
        Math.floor(new Date(a.data.date).getTime() / 1000)
    );

export default getSortedPosts;