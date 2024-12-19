import { defineCollection, reference, z } from "astro:content";

const page = defineCollection({
  // type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      dateUpdated: z
        .string()
        .or(z.date())
        .transform((str) => (str ? new Date(str) : undefined))
        .optional(),
      thumbnail: image().optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z
        .string(z.enum(["", "passage", "content", "breakout", "full"]))
        .optional(),
      thumbnailCredit: z.string().optional(),
      contentSize: z
        .string(z.enum(["passage", "content", "breakout", "full"]))
        .optional(),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
      headings: z
        .array(
          z.object({
            depth: z.number(),
            text: z.string(),
            slug: z.string(),
          }),
        )
        .optional(),
    }),
});

const post = defineCollection({
  // type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: reference("author"),
      description: z.string(),
      customExcerpt: z.boolean().optional(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      dateUpdated: z
        .string()
        .or(z.date())
        .transform((str) => (str ? new Date(str) : undefined))
        .optional(),
      thumbnail: image().optional(),
      thumbnailAlt: z.string().optional(),
      thumbnailSize: z
        .string(z.enum(["", "passage", "content", "breakout", "full"]))
        .optional(),
      thumbnailCredit: z.string().optional(),
      categories: z.array(z.string()).default(["uncategorized"]),
      tags: z.array(z.string()).default(["others"]),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
    }),
});



const author = defineCollection({
  // type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      website: z.string().url().optional(),
      email: z.string().email().optional(),
      links: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }).refine((data) => data.name && data.url, {
          message: "Each link must have a valid name and url",
        })
      ).optional(),
      
      description: z.string().optional(),
      type: z.string().default("author"),
      thumbnail: image().optional(),
      status: z.string(z.enum(["draft", "publish"]).default("draft")),
    }),
});



export const collections = { page, post, author };
