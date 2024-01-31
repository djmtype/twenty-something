import { makeSlug } from "@/utils/textConverter";

const taxonomyFilter = (posts: any[], name: string, key: string) =>
  posts.filter((post) =>
    post.data[name].map((name: string) => makeSlug(name)).includes(key),
  );

export default taxonomyFilter;
