import { type CollectionEntry } from 'astro:content';

export function sortItemsByDateDesc(itemA: CollectionEntry<'postCollection' | 'pageCollection'>, itemB: CollectionEntry<'postCollection' | 'pageCollection'>) {
    return new Date(itemB.data.date).valueOf() - new Date(itemA.data.date).valueOf();
}