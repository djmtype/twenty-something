import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueCategories = (posts: CollectionEntry<"postCollection">[]) => {
  const filteredCategories = posts.filter(({ data }) => data.status === 'publish');
  const categories: string[] = filteredCategories
    .flatMap(post => post.data.categories)
    .map(category => slugifyStr(category))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((categoryA: string, categoryB: string) => categoryA.localeCompare(categoryB));
  return categories;
};

export default getUniqueCategories;