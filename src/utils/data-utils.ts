import { type CollectionEntry } from 'astro:content';

export function sortItemsByDateDesc(itemA: CollectionEntry<'post' | 'page'>, itemB: CollectionEntry<'post' | 'page'>) {
    return new Date(itemB.data.date).valueOf() - new Date(itemA.data.date).valueOf();
}