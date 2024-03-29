
import { getCollection } from "astro:content";
import { makeSlug } from "@/utils/textConverter";

// get all pages from collection
export const getSinglePage = async (collection: any) => {
  const allPage = await getCollection(collection);
  const removeIndex = allPage.filter((data: any) => data.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((data: any) => data.data.status === 'publish');
  return removeDrafts;
};

// get taxonomy from frontmatter
export const getTaxonomy = async (collection: string, name: string) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page: any) => page.data[name]);
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(makeSlug(categoryArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  return taxonomy;
};

// get all taxonomies from frontmatter
export const getAllTaxonomy = async (collection: string, name: string) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page: any) => page.data[name]);
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(makeSlug(categoryArray[j]));
    }
  }
  return taxonomies;
};

