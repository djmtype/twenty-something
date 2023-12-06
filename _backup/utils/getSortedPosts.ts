import type { CollectionEntry } from "astro:content";

const getSortedPosts = (
  posts: CollectionEntry<"postCollection">[],
) =>
  posts
    .filter(({ data, id }) => data.status === "publish" && id !== "-index")
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date).getTime() / 1000) -
        Math.floor(new Date(a.data.date).getTime() / 1000),
    );

export default getSortedPosts;
