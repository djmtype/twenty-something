import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

const slugify = (post: CollectionEntry<"postCollection">) => {
  const data = post.data as CollectionEntry<"postCollection">["data"];
  return post.slug ? slugger(post.slug) : data && data.title ? slugger(data.title) : '';
};



export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;





