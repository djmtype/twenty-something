import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

const slugify = (post: CollectionEntry<"postCollection">) =>
  post.slug ? slugger(post.slug) : slugger(post.data.title);



export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;